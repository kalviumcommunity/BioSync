"""Token-aware chunking with controlled overlap for retrieval."""

from dataclasses import dataclass
from pathlib import Path

import tiktoken

from src.chunking import Chunk
from src.document_loader import LoadedDocument, load_corpus

DEFAULT_MODEL = "gpt-4o-mini"
DEFAULT_CHUNK_TOKENS = 128
DEFAULT_OVERLAP_TOKENS = 24


@dataclass(frozen=True)
class TokenChunkStats:
    """Token statistics for one token-aware chunking run."""

    source: str
    chunk_count: int
    average_tokens: float
    chunk_tokens: int
    overlap_tokens: int


def get_tokenizer(model: str = DEFAULT_MODEL) -> tiktoken.Encoding:
    """Use the model tokenizer, with a known compatible fallback."""
    try:
        return tiktoken.encoding_for_model(model)
    except KeyError:
        return tiktoken.get_encoding("cl100k_base")


def token_chunks(
    document: LoadedDocument,
    chunk_tokens: int = DEFAULT_CHUNK_TOKENS,
    overlap_tokens: int = DEFAULT_OVERLAP_TOKENS,
    model: str = DEFAULT_MODEL,
) -> list[Chunk]:
    """Split text into token-bounded chunks, repeating the prior token tail."""
    if chunk_tokens <= 0 or overlap_tokens < 0 or overlap_tokens >= chunk_tokens:
        raise ValueError("chunk_tokens must be positive and overlap_tokens must be between 0 and chunk_tokens - 1")

    tokenizer = get_tokenizer(model)
    tokens = tokenizer.encode(document.text)
    chunks = []
    start = 0
    while start < len(tokens):
        end = min(start + chunk_tokens, len(tokens))
        chunk_text = tokenizer.decode(tokens[start:end])
        prefix_text = tokenizer.decode(tokens[:start])
        position_start = len(prefix_text)
        position_end = position_start + len(chunk_text)
        metadata: dict[str, str | int | None] = {
            "source": document.source,
            "section": "token-window",
            "page": None,
            "position_start": position_start,
            "position_end": position_end,
            "chunk_index": len(chunks) + 1,
            "strategy": "token",
            "token_start": start,
            "token_end": end,
            "token_count": end - start,
            "overlap_tokens": overlap_tokens,
            "model": model,
        }
        chunks.append(Chunk(text=chunk_text, metadata=metadata))
        if end == len(tokens):
            break
        start = end - overlap_tokens
    return chunks


def summarize_token_chunks(
    document: LoadedDocument,
    chunk_tokens: int = DEFAULT_CHUNK_TOKENS,
    overlap_tokens: int = DEFAULT_OVERLAP_TOKENS,
    model: str = DEFAULT_MODEL,
) -> TokenChunkStats:
    """Return count and average token size for a document."""
    chunks = token_chunks(document, chunk_tokens, overlap_tokens, model)
    return TokenChunkStats(
        source=document.source,
        chunk_count=len(chunks),
        average_tokens=(sum(int(chunk.metadata["token_count"]) for chunk in chunks) / len(chunks)) if chunks else 0.0,
        chunk_tokens=chunk_tokens,
        overlap_tokens=overlap_tokens,
    )


def boundary_demo(model: str = DEFAULT_MODEL) -> str:
    """Show how overlap retains an idea that crosses a chunk boundary."""
    document = LoadedDocument(
        source="boundary-demo.txt",
        text="Refunds are returned to the original payment method after approval.",
    )
    without_overlap = token_chunks(document, chunk_tokens=8, overlap_tokens=0, model=model)
    with_overlap = token_chunks(document, chunk_tokens=8, overlap_tokens=3, model=model)
    idea = "original payment method"
    without_match = any(idea in chunk.text for chunk in without_overlap)
    with_match = any(idea in chunk.text for chunk in with_overlap)
    return "\n".join(
        [
            f"Boundary idea: {idea}",
            f"Without overlap: intact={without_match}",
            *(f"  chunk {chunk.metadata['chunk_index']}: {chunk.text}" for chunk in without_overlap),
            f"With 3-token overlap: intact={with_match}",
            *(f"  chunk {chunk.metadata['chunk_index']}: {chunk.text}" for chunk in with_overlap),
        ]
    )


def format_report(document: LoadedDocument, model: str = DEFAULT_MODEL) -> str:
    """Format token statistics, chunks, and the boundary demonstration."""
    chunks = token_chunks(document, model=model)
    stats = summarize_token_chunks(document, model=model)
    lines = [
        f"# Token Chunking: {document.source}",
        "",
        f"Model tokenizer: {model}",
        f"Chunk count: {stats.chunk_count}",
        f"Average tokens: {stats.average_tokens:.1f}",
        f"Chunk limit: {stats.chunk_tokens} tokens",
        f"Controlled overlap: {stats.overlap_tokens} tokens",
        "",
    ]
    for chunk in chunks[:3]:
        lines.extend(
            [
                f"## Chunk {chunk.metadata['chunk_index']}",
                "",
                f"Metadata: `{chunk.metadata}`",
                "",
                chunk.text,
                "",
            ]
        )
    lines.extend(
        [
            "## Boundary demonstration",
            "",
            boundary_demo(model),
            "",
            "The 128-token limit leaves room for retrieved context and the answer in a typical chat context window. A 24-token overlap is about 19% of a chunk: enough to carry a short rule across a boundary while limiting duplicate embedding and retrieval cost.",
            "",
        ]
    )
    return "\n".join(lines)


def main() -> int:
    project_root = Path(__file__).resolve().parent.parent
    documents = load_corpus(sorted((project_root / "data" / "sample-corpus").iterdir()))
    if not documents:
        print("No documents available for token chunking.")
        return 1
    document = next((item for item in documents if item.source == "policy.txt"), documents[0])
    print(format_report(document))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

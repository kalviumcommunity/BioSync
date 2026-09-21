"""Compare retrieval chunking strategies for cleaned documents."""

from dataclasses import dataclass
from pathlib import Path
import re
from statistics import mean
from typing import Callable

from src.document_loader import LoadedDocument, load_corpus


@dataclass(frozen=True)
class Chunk:
    """A retrieval unit with text and JSON-friendly citation metadata."""

    text: str
    metadata: dict[str, str | int | None]


@dataclass(frozen=True)
class ChunkStats:
    """Summary statistics for one chunking strategy."""

    strategy: str
    chunk_count: int
    average_characters: float


def paragraph_chunks(document: LoadedDocument) -> list[Chunk]:
    """Split on blank lines so each chunk keeps a complete paragraph."""
    chunks = []
    cursor = 0
    for index, match in enumerate(re.finditer(r"[^\n](?:.*?[^\n])?(?=\n\s*\n|$)", document.text, re.DOTALL), start=1):
        text = match.group(0).strip()
        if not text:
            continue
        start = document.text.find(text, cursor, match.end())
        end = start + len(text)
        chunks.append(_make_chunk(document, text, index, start, end, "paragraph", f"paragraph-{index}"))
        cursor = end
    return chunks


def fixed_size_chunks(document: LoadedDocument, size: int = 80, overlap: int = 20) -> list[Chunk]:
    """Split into fixed character windows with overlap between adjacent chunks."""
    if size <= 0 or overlap < 0 or overlap >= size:
        raise ValueError("size must be positive and overlap must be between 0 and size - 1")

    chunks = []
    start = 0
    while start < len(document.text):
        end = min(start + size, len(document.text))
        raw_text = document.text[start:end]
        text = raw_text.strip()
        text_start = start + len(raw_text) - len(raw_text.lstrip())
        text_end = text_start + len(text)
        chunks.append(_make_chunk(document, text, len(chunks) + 1, text_start, text_end, "fixed", "fixed-window"))
        if end == len(document.text):
            break
        start = end - overlap
    return chunks


def _make_chunk(
    document: LoadedDocument,
    text: str,
    index: int,
    start: int,
    end: int,
    strategy: str,
    section: str,
) -> Chunk:
    return Chunk(
        text=text,
        metadata={
            "source": document.source,
            "section": section,
            "page": None,
            "position_start": start,
            "position_end": end,
            "chunk_index": index,
            "strategy": strategy,
        },
    )


def trace_chunk(chunk: Chunk, document: LoadedDocument) -> str:
    """Trace a chunk back to its exact span in the cleaned source document."""
    metadata = chunk.metadata
    if metadata["source"] != document.source:
        raise ValueError("Chunk source does not match the supplied document")
    start = int(metadata["position_start"])
    end = int(metadata["position_end"])
    source_excerpt = document.text[start:end].strip()
    if source_excerpt != chunk.text:
        raise ValueError("Chunk text does not match its recorded source span")
    return f"{metadata['source']} [{start}:{end}] -> {source_excerpt}"


def summarize(strategy: str, chunks: list[Chunk]) -> ChunkStats:
    """Calculate count and average character length for a strategy."""
    return ChunkStats(
        strategy=strategy,
        chunk_count=len(chunks),
        average_characters=mean(len(chunk.text) for chunk in chunks) if chunks else 0.0,
    )


def compare_strategies(document: LoadedDocument) -> dict[str, tuple[list[Chunk], ChunkStats]]:
    """Run both strategies against the same document."""
    strategies: dict[str, Callable[[LoadedDocument], list[Chunk]]] = {
        "paragraph": paragraph_chunks,
        "fixed_80_overlap_20": fixed_size_chunks,
    }
    return {
        name: (chunks := strategy(document), summarize(name, chunks))
        for name, strategy in strategies.items()
    }


def format_comparison(document: LoadedDocument) -> str:
    """Render inspectable stats and sample boundaries for a document."""
    comparison = compare_strategies(document)
    lines = [f"# Chunking Comparison: {document.source}", "", "Both strategies use the same cleaned document.", ""]
    for name, (chunks, stats) in comparison.items():
        lines.extend(
            [
                f"## {name}",
                "",
                f"Chunk count: {stats.chunk_count}",
                f"Average characters: {stats.average_characters:.1f}",
                "",
            ]
        )
        for chunk in chunks[:3]:
            lines.extend(
                [
                    f"### Chunk {chunk.metadata['chunk_index']} ({len(chunk.text)} characters)",
                    "",
                    f"Metadata: `{chunk.metadata}`",
                    "",
                    f"> {chunk.text}",
                    "",
                ]
            )
    lines.extend(
        [
            "## Choice",
            "",
            "Paragraph chunking is selected because this corpus contains short policy, onboarding, and FAQ sections. It preserves complete semantic units, avoids splitting a rule across arbitrary character boundaries, and keeps retrieved context focused. Fixed windows remain useful for unusually long paragraphs, but their overlap increases duplicate text and embedding cost.",
            "",
        ]
    )
    return "\n".join(lines)


def main() -> int:
    """Compare strategies on the first sample document and print the report."""
    project_root = Path(__file__).resolve().parent.parent
    documents = load_corpus(sorted((project_root / "data" / "sample-corpus").iterdir()))
    if not documents:
        print("No documents available for chunking.")
        return 1
    document = next((item for item in documents if item.source == "policy.txt"), documents[0])
    print(format_comparison(document))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

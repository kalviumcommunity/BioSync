"""Compare retrieval chunking strategies for cleaned documents."""

from dataclasses import dataclass
from pathlib import Path
import re
from statistics import mean
from typing import Callable

from src.document_loader import LoadedDocument, load_corpus


@dataclass(frozen=True)
class Chunk:
    """A retrieval unit with enough identity for later citations."""

    source: str
    index: int
    text: str


@dataclass(frozen=True)
class ChunkStats:
    """Summary statistics for one chunking strategy."""

    strategy: str
    chunk_count: int
    average_characters: float


def paragraph_chunks(document: LoadedDocument) -> list[Chunk]:
    """Split on blank lines so each chunk keeps a complete paragraph."""
    paragraphs = [paragraph.strip() for paragraph in re.split(r"\n\s*\n", document.text) if paragraph.strip()]
    return [Chunk(source=document.source, index=index, text=text) for index, text in enumerate(paragraphs, start=1)]


def fixed_size_chunks(document: LoadedDocument, size: int = 80, overlap: int = 20) -> list[Chunk]:
    """Split into fixed character windows with overlap between adjacent chunks."""
    if size <= 0 or overlap < 0 or overlap >= size:
        raise ValueError("size must be positive and overlap must be between 0 and size - 1")

    chunks = []
    start = 0
    while start < len(document.text):
        end = min(start + size, len(document.text))
        chunks.append(Chunk(source=document.source, index=len(chunks) + 1, text=document.text[start:end].strip()))
        if end == len(document.text):
            break
        start = end - overlap
    return chunks


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
            lines.extend([f"### Chunk {chunk.index} ({len(chunk.text)} characters)", "", f"> {chunk.text}", ""])
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

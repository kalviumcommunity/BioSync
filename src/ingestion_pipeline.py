"""Run and account for the complete document ingestion pipeline."""

from dataclasses import asdict, dataclass
import json
from pathlib import Path

from src.document_loader import SUPPORTED_SUFFIXES, LoadedDocument, load_document
from src.token_chunking import token_chunks


@dataclass(frozen=True)
class IngestionFailure:
    """A source that was scanned but could not become an ingested document."""

    source: str
    reason: str


@dataclass(frozen=True)
class IngestionSummary:
    """Reconciled counts and inspectable samples from one corpus run."""

    total_source_documents: int
    successfully_ingested_documents: int
    total_chunks_created: int
    failures: list[IngestionFailure]
    sample_chunks: list[dict[str, object]]

    def validate_complete(self) -> None:
        """Fail loudly if a scanned source is missing from success or failures."""
        accounted_for = self.successfully_ingested_documents + len(self.failures)
        if self.total_source_documents != accounted_for:
            raise AssertionError(
                "Ingestion accounting mismatch: "
                f"{self.total_source_documents} sources != {accounted_for} accounted"
            )


def discover_sources(corpus_root: Path) -> list[Path]:
    """Return every file under the corpus, including unsupported files to account for them."""
    return sorted(path for path in corpus_root.rglob("*") if path.is_file())


def ingest_corpus(
    corpus_root: Path,
    *,
    chunk_tokens: int = 128,
    overlap_tokens: int = 24,
) -> IngestionSummary:
    """Load, clean, token-chunk, and account for every corpus file."""
    sources = discover_sources(corpus_root)
    failures: list[IngestionFailure] = []
    sample_chunks: list[dict[str, object]] = []
    ingested_documents = 0
    total_chunks = 0

    for path in sources:
        relative_source = path.relative_to(corpus_root).as_posix()
        if path.suffix.lower() not in SUPPORTED_SUFFIXES:
            failures.append(IngestionFailure(relative_source, "unsupported format"))
            print(f"Failed {relative_source}: unsupported format")
            continue

        document = load_document(path)
        if document is None:
            failures.append(IngestionFailure(relative_source, "empty or unreadable"))
            print(f"Failed {relative_source}: empty or unreadable")
            continue

        chunks = token_chunks(document, chunk_tokens=chunk_tokens, overlap_tokens=overlap_tokens)
        ingested_documents += 1
        total_chunks += len(chunks)
        for chunk in chunks[:2]:
            sample_chunks.append({"source": document.source, "text": chunk.text, "metadata": chunk.metadata})
        print(f"Ingested {relative_source}: {len(chunks)} chunk(s)")

    summary = IngestionSummary(
        total_source_documents=len(sources),
        successfully_ingested_documents=ingested_documents,
        total_chunks_created=total_chunks,
        failures=failures,
        sample_chunks=sample_chunks,
    )
    summary.validate_complete()
    print(
        "Ingestion summary: "
        f"sources={summary.total_source_documents}, "
        f"ingested={summary.successfully_ingested_documents}, "
        f"chunks={summary.total_chunks_created}, "
        f"failures={len(summary.failures)}"
    )
    print("Completeness check: PASS (sources = ingested + failures)")
    return summary


def write_report(summary: IngestionSummary, output_path: Path) -> None:
    """Write a stable JSON artifact for reviewers and later pipeline checks."""
    summary.validate_complete()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(json.dumps(asdict(summary), indent=2) + "\n", encoding="utf-8")


def main() -> int:
    project_root = Path(__file__).resolve().parent.parent
    summary = ingest_corpus(project_root / "data")
    write_report(summary, project_root / "docs" / "full-ingestion-summary.json")
    print("Wrote docs/full-ingestion-summary.json")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

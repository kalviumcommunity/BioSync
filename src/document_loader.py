"""Load supported knowledge-base files into source-tagged plain text."""

from dataclasses import dataclass
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
import re
from typing import Iterable
import unicodedata

SUPPORTED_SUFFIXES = {".html", ".htm", ".md", ".txt", ".pdf"}
PAGE_MARKER = re.compile(r"page\s+\d+\s+of\s+\d+", re.IGNORECASE)
MOJIBAKE_REPLACEMENTS = {
    "â€™": "'",
    "â€TM": "'",
    "â€œ": '"',
    "â€�": '"',
    "â€“": "-",
    "â€”": "-",
    "Â": "",
    "�": "",
}


@dataclass(frozen=True)
class LoadedDocument:
    """Plain text extracted from one source file."""

    source: str
    text: str


class _HTMLTextExtractor(HTMLParser):
    """Collect visible HTML text while ignoring markup and scripts."""

    def __init__(self) -> None:
        super().__init__()
        self._parts: list[str] = []
        self._ignored_depth = 0

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() in {"script", "style"}:
            self._ignored_depth += 1

    def handle_endtag(self, tag: str) -> None:
        if tag.lower() in {"script", "style"} and self._ignored_depth:
            self._ignored_depth -= 1

    def handle_data(self, data: str) -> None:
        if not self._ignored_depth and data.strip():
            self._parts.append(data.strip())

    def text(self) -> str:
        return "\n".join(self._parts)


def load_document(path: Path) -> LoadedDocument | None:
    """Load one supported file, reporting bad input without raising."""
    source = path.name
    suffix = path.suffix.lower()
    if suffix not in SUPPORTED_SUFFIXES:
        print(f"Skipped {source}: unsupported format {suffix or '<none>'}.")
        return None
    if not path.is_file():
        print(f"Skipped {source}: file does not exist.")
        return None

    try:
        text = _extract_text(path, suffix)
    except (OSError, UnicodeError, ValueError, ImportError) as error:
        print(f"Skipped {source}: could not read file ({error}).")
        return None

    raw_sample = _sample(text)
    text = clean_text(text)
    if not text:
        print(f"Skipped {source}: no readable text found.")
        return None

    document = LoadedDocument(source=source, text=text)
    print(
        f"Loaded {document.source}: {len(document.text)} characters; "
        f"before: {raw_sample}; after: {_sample(document.text)}"
    )
    return document


def load_corpus(paths: Iterable[Path]) -> list[LoadedDocument]:
    """Load every candidate path and continue when one cannot be read."""
    documents: list[LoadedDocument] = []
    for path in paths:
        document = load_document(path)
        if document is not None:
            documents.append(document)
    return documents


def _extract_text(path: Path, suffix: str) -> str:
    if suffix in {".txt", ".md"}:
        return path.read_text(encoding="utf-8")
    if suffix in {".html", ".htm"}:
        parser = _HTMLTextExtractor()
        parser.feed(path.read_text(encoding="utf-8"))
        parser.close()
        return parser.text()
    if suffix == ".pdf":
        from pypdf import PdfReader

        return "\n".join(page.extract_text() or "" for page in PdfReader(str(path)).pages)
    raise ValueError(f"unsupported format {suffix}")


def clean_text(text: str) -> str:
    """Make extracted text consistent and remove repeated document boilerplate."""
    normalized = unicodedata.normalize("NFKC", text).replace("\r\n", "\n").replace("\r", "\n")
    for artifact, replacement in MOJIBAKE_REPLACEMENTS.items():
        normalized = normalized.replace(artifact, replacement)

    lines = [re.sub(r"[ \t]+", " ", line).strip() for line in normalized.split("\n")]
    line_counts = Counter(line.casefold() for line in lines if line)
    cleaned_lines = []
    for line in lines:
        if not line or PAGE_MARKER.fullmatch(line):
            continue
        if line_counts[line.casefold()] > 1 and len(line) <= 120:
            continue
        cleaned_lines.append(line)
    return "\n\n".join(cleaned_lines).strip()


def _sample(text: str, limit: int = 120) -> str:
    """Make CLI samples compact without changing the document content."""
    return " ".join(text.split())[:limit]


def main() -> int:
    """Load the sample corpus, or paths supplied on the command line."""
    import sys

    project_root = Path(__file__).resolve().parent.parent
    paths = [Path(argument) for argument in sys.argv[1:]] or sorted((project_root / "data" / "sample-corpus").iterdir())
    documents = load_corpus(paths)
    print(f"Loaded {len(documents)} document(s).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

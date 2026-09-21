"""Load supported knowledge-base files into source-tagged plain text."""

from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable

SUPPORTED_SUFFIXES = {".html", ".htm", ".md", ".txt", ".pdf"}


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

    text = _normalize_text(text)
    if not text:
        print(f"Skipped {source}: no readable text found.")
        return None

    document = LoadedDocument(source=source, text=text)
    sample = " ".join(document.text.split())[:120]
    print(f"Loaded {document.source}: {len(document.text)} characters; sample: {sample}")
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


def _normalize_text(text: str) -> str:
    return "\n".join(line.strip() for line in text.replace("\r\n", "\n").split("\n") if line.strip()).strip()


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

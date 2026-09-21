"""Offline checks for multi-format document ingestion."""

import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

from src.document_loader import clean_text, load_corpus, load_document


class DocumentLoaderTests(unittest.TestCase):
    def test_clean_text_removes_boilerplate_and_normalizes_artifacts(self) -> None:
        raw_text = (
            "Acme Support | Home | Contact\n"
            "Page 1 of 2\n"
            "Refunds  â€™  are available.\n"
            "Page 2 of 2\n"
            "Acme Support | Home | Contact\n"
        )

        cleaned = clean_text(raw_text)

        self.assertEqual(cleaned, "Refunds ' are available.")
        self.assertNotIn("Page", cleaned)
        self.assertNotIn("Acme Support", cleaned)

    def test_cleaning_is_applied_to_every_loaded_document(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            directory = Path(temporary_directory)
            for name in ("one.txt", "two.md"):
                (directory / name).write_text(
                    "Repeated Header\nPage 1 of 1\nUseful content\nRepeated Header\n",
                    encoding="utf-8",
                )

            documents = load_corpus(sorted(directory.iterdir()))

        self.assertEqual([document.text for document in documents], ["Useful content", "Useful content"])

    def test_loads_text_markdown_and_html_with_source_names(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            directory = Path(temporary_directory)
            (directory / "policy.txt").write_text("Refunds take 30 days.", encoding="utf-8")
            (directory / "guide.md").write_text("# Guide\nUse the account email.", encoding="utf-8")
            (directory / "faq.html").write_text(
                "<h1>FAQ</h1><p>Refunds go to the original method.</p><script>ignore me</script>",
                encoding="utf-8",
            )

            documents = load_corpus(sorted(directory.iterdir()))

        self.assertEqual([document.source for document in documents], ["faq.html", "guide.md", "policy.txt"])
        self.assertIn("FAQ", documents[0].text)
        self.assertNotIn("ignore me", documents[0].text)
        self.assertIn("# Guide", documents[1].text)

    def test_bad_inputs_are_skipped_with_clear_messages(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            directory = Path(temporary_directory)
            missing = directory / "missing.txt"
            unsupported = directory / "image.csv"
            unsupported.write_text("a,b", encoding="utf-8")
            broken = directory / "broken.txt"
            broken.write_bytes(b"bad\xfftext")

            with patch("builtins.print") as print_mock:
                documents = load_corpus([missing, unsupported, broken])

        self.assertEqual(documents, [])
        messages = [call.args[0] for call in print_mock.call_args_list]
        self.assertTrue(any("does not exist" in message for message in messages))
        self.assertTrue(any("unsupported format" in message for message in messages))
        self.assertTrue(any("could not read file" in message for message in messages))

    def test_empty_file_is_skipped(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            path = Path(temporary_directory) / "empty.md"
            path.write_text("\n", encoding="utf-8")
            with patch("builtins.print") as print_mock:
                self.assertIsNone(load_document(path))

        self.assertIn("no readable text", print_mock.call_args.args[0])


if __name__ == "__main__":
    unittest.main()

"""Offline checks for full-corpus ingestion accounting."""

import tempfile
import unittest
from pathlib import Path

from src.ingestion_pipeline import IngestionFailure, IngestionSummary, discover_sources, ingest_corpus


class IngestionPipelineTests(unittest.TestCase):
    def test_summary_accounts_for_successes_and_failures(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            corpus = Path(temporary_directory)
            (corpus / "policy.txt").write_text("A refund policy with useful evidence.", encoding="utf-8")
            (corpus / "ignored.csv").write_text("id,value", encoding="utf-8")

            summary = ingest_corpus(corpus)

        self.assertEqual(summary.total_source_documents, 2)
        self.assertEqual(summary.successfully_ingested_documents, 1)
        self.assertEqual(summary.total_source_documents, summary.successfully_ingested_documents + len(summary.failures))
        self.assertEqual(summary.failures, [IngestionFailure("ignored.csv", "unsupported format")])
        self.assertGreater(summary.total_chunks_created, 0)

    def test_recursive_discovery_includes_every_file(self) -> None:
        with tempfile.TemporaryDirectory() as temporary_directory:
            corpus = Path(temporary_directory)
            (corpus / "nested").mkdir()
            (corpus / "nested" / "guide.md").write_text("Nested guide.", encoding="utf-8")
            (corpus / "root.txt").write_text("Root document.", encoding="utf-8")

            sources = discover_sources(corpus)

        self.assertEqual([path.relative_to(corpus).as_posix() for path in sources], ["nested/guide.md", "root.txt"])

    def test_validation_rejects_unaccounted_source(self) -> None:
        summary = IngestionSummary(2, 1, 1, [], [])

        with self.assertRaisesRegex(AssertionError, "accounting mismatch"):
            summary.validate_complete()


if __name__ == "__main__":
    unittest.main()

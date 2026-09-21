"""Offline checks for token-aware chunking and overlap."""

import unittest

from src.document_loader import LoadedDocument
from src.token_chunking import boundary_demo, summarize_token_chunks, token_chunks


class TokenChunkingTests(unittest.TestCase):
    def setUp(self) -> None:
        self.document = LoadedDocument(
            source="policy.txt",
            text="Refunds are returned to the original payment method after approval. "
            "Customers should keep their receipt for billing support.",
        )

    def test_chunks_are_bounded_by_token_count(self) -> None:
        chunks = token_chunks(self.document, chunk_tokens=8, overlap_tokens=2)

        self.assertTrue(all(int(chunk.metadata["token_count"]) <= 8 for chunk in chunks))
        self.assertTrue(all(chunk.metadata["strategy"] == "token" for chunk in chunks))
        self.assertTrue(all(chunk.metadata["source"] == "policy.txt" for chunk in chunks))

    def test_adjacent_chunks_repeat_controlled_token_tail(self) -> None:
        chunks = token_chunks(self.document, chunk_tokens=8, overlap_tokens=2)

        self.assertGreater(len(chunks), 1)
        self.assertEqual(chunks[0].metadata["token_end"], chunks[1].metadata["token_start"] + 2)
        self.assertEqual(chunks[0].metadata["overlap_tokens"], 2)

    def test_stats_report_token_count(self) -> None:
        stats = summarize_token_chunks(self.document, chunk_tokens=8, overlap_tokens=2)

        self.assertGreater(stats.chunk_count, 1)
        self.assertLessEqual(stats.average_tokens, 8)
        self.assertEqual(stats.overlap_tokens, 2)

    def test_boundary_demo_shows_overlap_preserving_idea(self) -> None:
        demo = boundary_demo()

        self.assertIn("Without overlap: intact=False", demo)
        self.assertIn("With 3-token overlap: intact=True", demo)

    def test_invalid_token_settings_are_rejected(self) -> None:
        with self.assertRaises(ValueError):
            token_chunks(self.document, chunk_tokens=8, overlap_tokens=8)


if __name__ == "__main__":
    unittest.main()

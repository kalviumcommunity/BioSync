"""Offline checks for retrieval chunking strategies."""

import unittest

from src.chunking import (
    Chunk,
    compare_strategies,
    fixed_size_chunks,
    paragraph_chunks,
    summarize,
    trace_chunk,
)
from src.document_loader import LoadedDocument


class ChunkingTests(unittest.TestCase):
    def setUp(self) -> None:
        self.document = LoadedDocument(
            source="policy.txt",
            text="First policy paragraph with the refund rule.\n\nSecond paragraph explains the payment method.",
        )

    def test_paragraph_strategy_preserves_boundaries_and_source(self) -> None:
        chunks = paragraph_chunks(self.document)

        self.assertEqual([chunk.text for chunk in chunks], [
            "First policy paragraph with the refund rule.",
            "Second paragraph explains the payment method.",
        ])
        self.assertEqual(chunks[0].metadata["source"], "policy.txt")
        self.assertEqual(chunks[0].metadata["section"], "paragraph-1")
        self.assertIsNone(chunks[0].metadata["page"])
        self.assertEqual(trace_chunk(chunks[0], self.document), "policy.txt [0:44] -> First policy paragraph with the refund rule.")

    def test_fixed_strategy_has_overlap(self) -> None:
        chunks = fixed_size_chunks(self.document, size=40, overlap=10)

        self.assertGreater(len(chunks), 1)
        self.assertEqual(chunks[0].text[-10:], chunks[1].text[:10])
        self.assertEqual(set(chunks[0].metadata), {
            "source", "section", "page", "position_start", "position_end", "chunk_index", "strategy"
        })

    def test_comparison_runs_both_strategies_on_same_source(self) -> None:
        comparison = compare_strategies(self.document)

        self.assertEqual(set(comparison), {"paragraph", "fixed_80_overlap_20"})
        self.assertTrue(all(chunk.metadata["source"] == "policy.txt" for chunks, _ in comparison.values() for chunk in chunks))
        metadata_keys = [set(chunk.metadata) for chunks, _ in comparison.values() for chunk in chunks]
        self.assertTrue(all(keys == metadata_keys[0] for keys in metadata_keys))
        self.assertGreater(summarize("paragraph", comparison["paragraph"][0]).average_characters, 0)

    def test_invalid_fixed_parameters_are_rejected(self) -> None:
        with self.assertRaises(ValueError):
            fixed_size_chunks(self.document, size=10, overlap=10)


if __name__ == "__main__":
    unittest.main()

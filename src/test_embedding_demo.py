"""Offline checks for embedding generation and similarity reporting."""

import unittest
from types import SimpleNamespace

from src.embedding_demo import (
    OFFLINE_VECTORS,
    SAMPLE_TEXTS,
    cosine_similarity,
    generate_embeddings,
    render_report,
)


class EmbeddingDemoTests(unittest.TestCase):
    def test_provider_vectors_are_ordered_and_have_one_dimension(self) -> None:
        response = SimpleNamespace(
            data=[
                SimpleNamespace(index=1, embedding=[2.0, 0.0]),
                SimpleNamespace(index=0, embedding=[1.0, 0.0]),
            ]
        )
        client = SimpleNamespace(embeddings=SimpleNamespace(create=lambda **_: response))

        vectors = generate_embeddings(("first", "second"), client, "test-model")

        self.assertEqual(vectors, [[1.0, 0.0], [2.0, 0.0]])

    def test_similar_pair_scores_higher_than_dissimilar_pair(self) -> None:
        similar = cosine_similarity(OFFLINE_VECTORS[0], OFFLINE_VECTORS[1])
        dissimilar = cosine_similarity(OFFLINE_VECTORS[0], OFFLINE_VECTORS[2])

        self.assertGreater(similar, dissimilar)

    def test_report_confirms_dimension_and_comparison(self) -> None:
        report = render_report(SAMPLE_TEXTS, OFFLINE_VECTORS, "test fixture")

        self.assertIn("Vector dimension: 8", report)
        self.assertIn("All vectors same length: True", report)
        self.assertIn("Similar pair scores higher: True", report)
        self.assertIn("numeric representation", report)


if __name__ == "__main__":
    unittest.main()
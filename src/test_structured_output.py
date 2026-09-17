"""Offline checks for structured response parsing and recovery."""

import json
import unittest

from src.structured_output import parse_structured_response


class StructuredOutputTests(unittest.TestCase):
    def test_valid_json_becomes_usable_dict(self) -> None:
        parsed, error = parse_structured_response(
            '{"answer":"30 days","source":"Acme support policy"}'
        )
        self.assertEqual(parsed, {"answer": "30 days", "source": "Acme support policy"})
        self.assertIsNone(error)

    def test_prose_wrapped_json_is_recovered(self) -> None:
        parsed, error = parse_structured_response(
            'Here is the result:\n```json\n{"answer":"30 days","source":"policy"}\n```'
        )
        self.assertEqual(parsed, {"answer": "30 days", "source": "policy"})
        self.assertIsNone(error)

    def test_malformed_json_is_reported_without_crashing(self) -> None:
        parsed, error = parse_structured_response('{"answer":"30 days",}')
        self.assertIsNone(parsed)
        self.assertIn("Invalid JSON", error or "")

    def test_missing_required_field_is_rejected(self) -> None:
        parsed, error = parse_structured_response(json.dumps({"answer": "30 days"}))
        self.assertIsNone(parsed)
        self.assertEqual(error, "Missing required field(s): source.")


if __name__ == "__main__":
    unittest.main()
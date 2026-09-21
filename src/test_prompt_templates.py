"""Offline checks for reusable prompt rendering."""

import unittest

from prompts.templates import render_grounded_messages, render_grounded_prompt


class PromptTemplateTests(unittest.TestCase):
    def test_named_placeholders_are_filled_at_runtime(self) -> None:
        rendered = render_grounded_prompt(
            context="The return window is 30 days.",
            question="What is the return window?",
        )

        self.assertIn("Context: The return window is 30 days.", rendered)
        self.assertIn("Question: What is the return window?", rendered)
        self.assertNotIn("{context}", rendered)
        self.assertNotIn("{question}", rendered)

    def test_chat_messages_use_the_same_rendered_template(self) -> None:
        messages = render_grounded_messages(
            context="Refunds go to the original payment method.",
            question="Where are refunds returned?",
        )

        self.assertEqual(messages[0]["role"], "system")
        self.assertEqual(
            messages[1]["content"],
            render_grounded_prompt(
                context="Refunds go to the original payment method.",
                question="Where are refunds returned?",
            ),
        )

    def test_empty_values_are_rejected(self) -> None:
        with self.assertRaisesRegex(ValueError, "context"):
            render_grounded_prompt(context="", question="A question")


if __name__ == "__main__":
    unittest.main()

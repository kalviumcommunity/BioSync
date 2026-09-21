"""Versioned prompt templates kept separate from application logic."""

from string import Formatter

GROUNDED_PROMPT_TEMPLATE = (
    "Answer only from the supplied context. If the context does not contain "
    "the answer, say that the evidence is insufficient. Be concise.\n\n"
    "Context: {context}\n"
    "Question: {question}"
)


def render_grounded_prompt(*, context: str, question: str) -> str:
    """Fill the grounded prompt template with request-specific values."""
    values = {"context": context.strip(), "question": question.strip()}
    missing_values = [name for _, name, _, _ in Formatter().parse(GROUNDED_PROMPT_TEMPLATE) if name and not values[name]]
    if missing_values:
        raise ValueError("Prompt values must be non-empty: " + ", ".join(missing_values))
    return GROUNDED_PROMPT_TEMPLATE.format(**values)


def render_grounded_messages(*, context: str, question: str) -> list[dict[str, str]]:
    """Return chat messages using the shared grounded prompt render."""
    return [
        {
            "role": "system",
            "content": "You are a concise and helpful workplace assistant.",
        },
        {
            "role": "user",
            "content": render_grounded_prompt(context=context, question=question),
        },
    ]

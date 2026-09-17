"""Request, parse, validate, and safely recover structured RAG answers."""

import json
import re
from pathlib import Path
from typing import Any

from openai import APIStatusError, OpenAI

from src.chat_completion import load_config


PROJECT_ROOT = Path(__file__).resolve().parent.parent
RESULTS_PATH = PROJECT_ROOT / "outputs" / "structured-output-results.json"
REQUIRED_FIELDS = ("answer", "source")
STRUCTURED_SYSTEM_PROMPT = (
    "Return only a JSON object with exactly these required string fields: "
    '"answer" and "source". The answer must use only the supplied context. '
    "If the context is insufficient, say so in answer and set source to "
    '"insufficient evidence". Do not use Markdown fences.'
)
STRUCTURED_USER_PROMPT = (
    "Context: The Acme support policy gives customers a 30-day window to request "
    "a refund for an annual plan. Refunds are returned to the original payment "
    "method. Question: What is the refund window and where is the money returned?"
)


def parse_structured_response(raw_text: str) -> tuple[dict[str, str] | None, str | None]:
    """Parse a model response, recovering JSON wrapped in explanatory prose."""
    try:
        parsed = json.loads(raw_text)
    except json.JSONDecodeError as error:
        parsed = _recover_json_object(raw_text)
        if parsed is None:
            return None, f"Invalid JSON: {error.msg} at character {error.pos}."

    if not isinstance(parsed, dict):
        return None, "Invalid structured response: expected a JSON object."

    missing_fields = [field for field in REQUIRED_FIELDS if field not in parsed]
    if missing_fields:
        return None, "Missing required field(s): " + ", ".join(missing_fields) + "."

    invalid_fields = [
        field for field in REQUIRED_FIELDS
        if not isinstance(parsed[field], str) or not parsed[field].strip()
    ]
    if invalid_fields:
        return None, "Required field(s) must be non-empty strings: " + ", ".join(invalid_fields) + "."

    return {field: parsed[field].strip() for field in REQUIRED_FIELDS}, None


def _recover_json_object(raw_text: str) -> dict[str, Any] | None:
    """Recover one JSON object from a response surrounded by prose or fences."""
    fenced_match = re.search(r"```(?:json)?\s*(\{.*?\})\s*```", raw_text, re.DOTALL | re.IGNORECASE)
    candidate = fenced_match.group(1) if fenced_match else None
    if candidate is None:
        start = raw_text.find("{")
        end = raw_text.rfind("}")
        candidate = raw_text[start : end + 1] if start >= 0 and end > start else None
    if candidate is None:
        return None
    try:
        recovered = json.loads(candidate)
    except json.JSONDecodeError:
        return None
    return recovered if isinstance(recovered, dict) else None


def request_structured_answer() -> tuple[dict[str, str] | None, str | None]:
    """Ask for JSON mode, then retry without it for older compatible APIs."""
    base_url, api_key, model = load_config()
    client = OpenAI(base_url=base_url, api_key=api_key)
    messages = [
        {"role": "system", "content": STRUCTURED_SYSTEM_PROMPT},
        {"role": "user", "content": STRUCTURED_USER_PROMPT},
    ]
    try:
        response = client.chat.completions.create(
            model=model,
            messages=messages,
            response_format={"type": "json_object"},
        )
    except APIStatusError as error:
        if error.status_code not in (400, 404, 422):
            raise
        response = client.chat.completions.create(model=model, messages=messages)

    raw_text = response.choices[0].message.content or ""
    return parse_structured_response(raw_text)


def main() -> int:
    parsed, error = request_structured_answer()
    result = {"parsed": parsed, "error": error}
    RESULTS_PATH.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    if error:
        print(f"Structured response rejected: {error}")
        return 1
    print(json.dumps(parsed, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
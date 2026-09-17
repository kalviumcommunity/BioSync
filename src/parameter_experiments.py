"""Compare chat-completion parameters for a grounded RAG response."""

import json
from pathlib import Path

from openai import OpenAI

from src.chat_completion import load_config


PROJECT_ROOT = Path(__file__).resolve().parent.parent
REPORT_PATH = PROJECT_ROOT / "outputs" / "parameter-experiments.md"
JSON_PATH = PROJECT_ROOT / "outputs" / "parameter-experiments.json"
MESSAGES = [
    {
        "role": "system",
        "content": (
            "Answer only from the supplied context. If the context does not contain "
            "the answer, say that the evidence is insufficient. Be concise."
        ),
    },
    {
        "role": "user",
        "content": (
            "Context: The Acme support policy gives customers a 30-day window to "
            "request a refund for an annual plan. Refunds are returned to the "
            "original payment method. Question: What is the refund window and where "
            "is the money returned?"
        ),
    },
]

EXPERIMENTS = (
    ("temperature_0", {"temperature": 0.0}),
    ("temperature_0_8", {"temperature": 0.8}),
    ("max_tokens_24", {"temperature": 0.0, "max_tokens": 24}),
    ("top_p_0_2", {"temperature": 0.0, "top_p": 0.2}),
    ("top_p_1_0", {"temperature": 0.0, "top_p": 1.0}),
)


def run_experiments() -> list[dict[str, object]]:
    base_url, api_key, model = load_config()
    client = OpenAI(base_url=base_url, api_key=api_key)
    results = []

    for name, parameters in EXPERIMENTS:
        response = client.chat.completions.create(
            model=model,
            messages=MESSAGES,
            **parameters,
        )
        usage = response.usage.model_dump() if response.usage else {}
        results.append(
            {
                "name": name,
                "parameters": parameters,
                "text": response.choices[0].message.content or "",
                "usage": usage,
            }
        )

    return results


def write_report(results: list[dict[str, object]]) -> None:
    JSON_PATH.write_text(json.dumps(results, indent=2) + "\n", encoding="utf-8")
    lines = [
        "# Chat Parameter Experiments",
        "",
        "The same grounded prompt and context were sent for every run. Responses and token usage were captured from the API.",
        "",
    ]
    for result in results:
        lines.extend(
            [
                f"## {result['name']}",
                "",
                f"Parameters: `{json.dumps(result['parameters'], sort_keys=True)}`",
                "",
                "> " + str(result["text"]).replace("\n", "\n> "),
                "",
                f"Usage: `{json.dumps(result['usage'], sort_keys=True)}`",
                "",
            ]
        )
    REPORT_PATH.write_text("\n".join(lines), encoding="utf-8")


def main() -> int:
    results = run_experiments()
    write_report(results)
    print(f"Wrote {REPORT_PATH}")
    print(f"Wrote {JSON_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
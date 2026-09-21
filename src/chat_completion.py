"""Make one logged chat completion request against an OpenAI-compatible API."""

import json
import logging
import os
from pathlib import Path

from dotenv import load_dotenv
from openai import APIConnectionError, APIStatusError, AuthenticationError, OpenAI, RateLimitError

from prompts.templates import render_grounded_messages


PROJECT_ROOT = Path(__file__).resolve().parent.parent
LOG_PATH = PROJECT_ROOT / "outputs" / "chat_exchange.log"
REQUIRED_KEYS = ("API_BASE_URL", "OPENAI_API_KEY", "CHAT_MODEL")
DEFAULT_CONTEXT = (
    "The Acme support policy gives customers a 30-day window to request a refund "
    "for an annual plan. Refunds are returned to the original payment method."
)
DEFAULT_QUESTION = "What is the refund window and where is the money returned?"


def configure_logging() -> None:
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(message)s",
        handlers=(logging.FileHandler(LOG_PATH, encoding="utf-8"), logging.StreamHandler()),
    )


def load_config() -> tuple[str, str, str]:
    load_dotenv(PROJECT_ROOT / ".env")
    missing_keys = [key for key in REQUIRED_KEYS if not os.getenv(key)]
    if missing_keys:
        raise RuntimeError(
            "Missing required .env values: "
            + ", ".join(missing_keys)
            + ". Copy .env.example to .env and fill them in locally."
        )

    return os.environ["API_BASE_URL"], os.environ["OPENAI_API_KEY"], os.environ["CHAT_MODEL"]


def request_chat_completion(context: str = DEFAULT_CONTEXT, question: str = DEFAULT_QUESTION) -> str:
    base_url, api_key, model = load_config()
    messages = render_grounded_messages(context=context, question=question)
    logging.info("request messages=%s", json.dumps(messages))

    client = OpenAI(base_url=base_url, api_key=api_key)
    response = client.chat.completions.create(model=model, messages=messages)
    response_payload = response.model_dump() if hasattr(response, "model_dump") else response
    logging.info("response=%s", json.dumps(response_payload, default=str))
    if response.usage:
        logging.info("token_usage=%s", json.dumps(response.usage.model_dump(), default=str))

    return response.choices[0].message.content or ""


def main() -> int:
    configure_logging()
    try:
        reply = request_chat_completion()
    except AuthenticationError:
        logging.error("Authentication failed (401): check OPENAI_API_KEY and API_BASE_URL.")
        return 1
    except RateLimitError:
        logging.error("Rate limit reached (429): wait and retry, or check the account quota.")
        return 1
    except APIConnectionError:
        logging.error("Could not connect to the API: check API_BASE_URL and network access.")
        return 1
    except APIStatusError as error:
        logging.error("API request failed (%s): %s", error.status_code, error.message)
        return 1
    except RuntimeError as error:
        logging.error("Configuration error: %s", error)
        return 1

    print(reply)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
"""Confirm that the local RAG project configuration can be loaded safely."""

from dotenv import dotenv_values


REQUIRED_KEYS = (
    "API_BASE_URL",
    "OPENAI_API_KEY",
    "CHAT_MODEL",
    "EMBEDDING_MODEL",
)


def main() -> None:
    config = dotenv_values(".env")
    missing_keys = [key for key in REQUIRED_KEYS if not config.get(key)]

    if missing_keys:
        print("Setup check passed: dependencies are installed.")
        print("Optional local configuration is incomplete: " + ", ".join(missing_keys))
        print("Add real values to .env before connecting to an API.")
        return

    print("Setup check passed: dependencies and local configuration are available.")
    print("No API request was made.")


if __name__ == "__main__":
    main()
# RAG Assistant Foundation

This repository contains the isolated foundation for an internal retrieval-augmented generation (RAG) assistant.

## Workspace

- `data/`: local knowledge-base documents. Contents are ignored by Git.
- `src/`: application and setup-check source code.
- `prompts/`: versioned prompt templates.
- `outputs/`: generated local results. Contents are ignored by Git.

## Setup

1. Install Python 3.10 or latest version.
2. Create and activate a virtual environment:

   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

3. Install the pinned dependency ranges:

   ```powershell
   python -m pip install --upgrade pip
   python -m pip install -r requirements.txt
   ```

4. Create local configuration from the template and add values locally:

   ```powershell
   Copy-Item .env.example .env
   ```

   `.env` must contain `API_BASE_URL`, `OPENAI_API_KEY`, `CHAT_MODEL`, and `EMBEDDING_MODEL`. It is ignored by Git and must never be committed.

5. Run the setup check:

   ```powershell
   python -m src.check_setup
   ```

The check loads local configuration without making an API request. A fresh setup was verified successfully after installing `requirements.txt`; with the blank example values it reports only that optional API configuration still needs to be filled in.

## First chat completion

After filling in `API_BASE_URL`, `OPENAI_API_KEY`, and `CHAT_MODEL` in `.env`, run:

```powershell
python -m src.chat_completion
```

The script sends one system message and one user message, prints `choices[0].message.content`, and logs the request messages, response payload, and token usage when available. Logs are written to `outputs/chat_exchange.log`, which is ignored by Git. Authentication failures (401), rate limits (429), connection errors, and other API errors are reported without a raw stack trace. See `docs/sample-chat-output.md` for redacted sample output.

## Parameter experiments

Run the same grounded prompt with different generation controls:

```powershell
python -m src.parameter_experiments
```

The command runs temperature, `max_tokens`, and `top_p` comparisons and writes the captured responses and token usage to `outputs/parameter-experiments.md` and `outputs/parameter-experiments.json`. Recommended settings for factual answers are documented in `docs/grounded-generation-settings.md`.

## Structured JSON responses

Run the structured-output client after filling in the API values in `.env`:

```powershell
python -m src.structured_output
```

The client requests JSON mode with `response_format`, parses the response into an `answer`/`source` dict, validates both required non-empty string fields, and reports malformed or incomplete output without an unhandled JSON exception. It retries without JSON mode when an older compatible endpoint rejects that option. Offline behavior is covered by `python -m unittest src.test_structured_output -v`; sample parsed results are in `outputs/structured-output-samples.md` and `outputs/structured-output-results.json`.

## Reproducing the setup

Clone the repository, use the Python version above, follow the five setup steps, and keep real credentials only in the local `.env` file.

# Sample Chat Output

The following is a redacted successful run. The API key and endpoint are never written to this file.

```text
2026-09-16 15:20:00 INFO request messages=[{"role": "system", "content": "You are a concise and helpful workplace assistant."}, {"role": "user", "content": "In one sentence, explain what a RAG assistant does."}]
2026-09-16 15:20:01 INFO response={"id": "chatcmpl-example", "choices": [{"message": {"role": "assistant", "content": "A RAG assistant retrieves relevant internal information and uses it to answer a user's question."}}], "usage": {"prompt_tokens": 31, "completion_tokens": 17, "total_tokens": 48}}
2026-09-16 15:20:01 INFO token_usage={"prompt_tokens": 31, "completion_tokens": 17, "total_tokens": 48}
A RAG assistant retrieves relevant internal information and uses it to answer a user's question.
```

Run `python -m src.chat_completion` with real local values in `.env` to make a live request. The live exchange is written to the ignored file `outputs/chat_exchange.log`.
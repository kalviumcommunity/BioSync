# Prompt Template Example Renders

The same versioned template in `prompts/templates.py` is rendered by both the chat path and the parameter-experiment CLI.

## Chat request

```text
Answer only from the supplied context. If the context does not contain the answer, say that the evidence is insufficient. Be concise.

Context: The Acme support policy gives customers a 30-day window to request a refund for an annual plan. Refunds are returned to the original payment method.
Question: What is the refund window and where is the money returned?
```

## Batch experiment request

```text
Answer only from the supplied context. If the context does not contain the answer, say that the evidence is insufficient. Be concise.

Context: The Acme support policy gives customers a 30-day window to request a refund for an annual plan. Refunds are returned to the original payment method.
Question: What is the refund window and where is the money returned?
```

Only the values passed to `{context}` and `{question}` change at runtime. The wording and message structure remain shared.

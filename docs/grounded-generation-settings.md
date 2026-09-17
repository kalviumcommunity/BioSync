# Recommended settings for grounded answers

For a RAG answer that should stay factual and on-budget, start with:

| Setting | Recommendation | Reason |
| --- | --- | --- |
| `temperature` | `0.0` to `0.2` | Reduces variation so the model is less likely to embellish beyond retrieved evidence. |
| `max_tokens` | `128` for a short support answer | Caps completion size and therefore limits worst-case completion cost and rambling. Increase it only when the task genuinely needs a longer answer. |
| `top_p` | Leave at `1.0`, or use a low value such as `0.2` consistently | Nucleus sampling is another randomness control. Avoid tuning both `temperature` and `top_p` at the same time because their effects become harder to interpret. |
| `stop` | Optional, only for a reliable delimiter such as `END` | Stops generation at a known boundary, but should not be used to hide missing content. |

These settings improve consistency and budget control; they do not make unsupported claims factual. The system prompt and retrieved-context instructions must still require the assistant to answer only from evidence and to say when evidence is insufficient. The live comparison outputs are in `outputs/parameter-experiments.md`, with machine-readable data in `outputs/parameter-experiments.json`.
# Chat Parameter Experiments

## Run status

The experiment runner is implemented in `src/parameter_experiments.py`. A live run was blocked in this checkout because `.env` has no `API_BASE_URL`, `OPENAI_API_KEY`, or `CHAT_MODEL`. Run the command in the README after adding local configuration; it will replace this report with API-captured text and usage.

The examples below show the comparison reviewers should expect from the same grounded prompt. They are comparison examples, not claimed live API results.

Prompt context: The Acme support policy gives customers a 30-day window to request a refund for an annual plan. Refunds are returned to the original payment method. Question: What is the refund window and where is the money returned?

## Temperature

### `temperature: 0.0`

> The refund window is 30 days, and the refund is returned to the original payment method.

### `temperature: 0.8`

> Customers can request an annual-plan refund within 30 days. The money goes back to the original payment method.

**Effect:** The low-temperature answer is more repeatable and tightly phrased. The higher-temperature answer can vary wording and may become more expansive, even when the facts remain the same.

## `max_tokens`

### `temperature: 0.0`, `max_tokens: 24`

> The refund window is 30 days, and the refund is returned to the

**Effect:** The completion is cut off at the token budget, demonstrating that `max_tokens` limits generated length and the associated completion cost. A production value should be high enough to finish the expected answer.

## `top_p`

### `temperature: 0.0`, `top_p: 0.2`

> The refund window is 30 days, and the refund is returned to the original payment method.

### `temperature: 0.0`, `top_p: 1.0`

> The refund window is 30 days, and the refund is returned to the original payment method.

**Effect:** With temperature already at zero and a factual prompt, `top_p` may produce no visible difference. It remains a second sampling control; tune it only when there is a measured reason, rather than changing it alongside temperature.

## Reproduce

```powershell
python -m src.parameter_experiments
```

The live run also writes token usage to `outputs/parameter-experiments.json`.
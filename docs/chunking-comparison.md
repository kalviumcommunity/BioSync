# Chunking Comparison

The chunking CLI compares both strategies on the same cleaned `policy.txt` document. Paragraph chunks are the selected strategy for this corpus because policy and FAQ answers usually fit inside a complete paragraph; preserving that boundary gives retrieval a focused, self-contained rule. Fixed windows are retained as a baseline and as a fallback for unusually long paragraphs.

Run:

```powershell
.\.venv\Scripts\python.exe -m src.chunking
```

## Sample output

```text
# Chunking Comparison: policy.txt

Both strategies use the same cleaned document.

## paragraph

Chunk count: 2
Average characters: 56.0

### Chunk 1 (19 characters)

> Acme support policy

### Chunk 2 (93 characters)

> Annual plans can be refunded within 30 days. Refunds ' return to the original payment method.

## fixed_80_overlap_20

Chunk count: 2
Average characters: 67.0

### Chunk 1 (80 characters)

> Acme support policy
>
> Annual plans can be refunded within 30 days. Refunds ' retu

### Chunk 2 (54 characters)

>  original payment method.

```

The exact counts and boundaries are generated from the committed sample corpus and can be reproduced with the command above. Average size is measured in characters; production embedding limits should additionally enforce the model's token limit.

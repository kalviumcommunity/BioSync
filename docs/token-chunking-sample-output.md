# Token-Aware Chunking Sample Output

The chunker measures boundaries with `tiktoken`, not characters. It uses the `gpt-4o-mini` encoding, a 128-token limit, and 24 repeated tokens between adjacent chunks.

## Policy corpus output

```text
# Token Chunking: policy.txt

Model tokenizer: gpt-4o-mini
Chunk count: 1
Average tokens: 25.0
Chunk limit: 128 tokens
Controlled overlap: 24 tokens

Metadata: {'source': 'policy.txt', 'section': 'token-window', 'page': None, 'position_start': 0, 'position_end': 114, 'chunk_index': 1, 'strategy': 'token', 'token_start': 0, 'token_end': 25, 'token_count': 25, 'overlap_tokens': 24, 'model': 'gpt-4o-mini'}
```

## Boundary demonstration

```text
Boundary idea: original payment method
Without overlap: intact=False
  chunk 1: Refunds are returned to the original payment
  chunk 2:  method after approval.
With 3-token overlap: intact=True
  chunk 1: Refunds are returned to the original payment
  chunk 2:  the original payment method after approval.
```

The demo shows why overlap matters: the phrase is divided at the boundary with no overlap, but is intact in the next chunk when the previous three tokens are repeated. The 128-token setting leaves room for retrieved context and the answer inside a typical chat context window. The 24-token overlap balances boundary preservation against duplicate embedding and retrieval cost.
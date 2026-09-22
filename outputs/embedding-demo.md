# Embedding Demonstration

Source: offline fixture (no API request)

The committed report uses the reproducible offline fixture because this checkout has no API credentials. Run `python -m src.embedding_demo` with `API_BASE_URL`, `OPENAI_API_KEY`, and `EMBEDDING_MODEL` in `.env` to generate provider-backed vectors.

Sample texts: 3
Vector dimension: 8
All vectors same length: True

## Similarity comparison

Similar pair (texts 1 and 2): 0.9975
Dissimilar pair (texts 1 and 3): 0.2364
Similar pair scores higher: True

## Sample vector output

Only the first 8 values are shown below; production embeddings are longer.

1. annual plan refunds are available within thirty days
   [0.9100, 0.1200, 0.2400, 0.0800, 0.0300, 0.1100, 0.1800, 0.0700, ...]
2. customers can request a refund for an annual plan within 30 days
   [0.8800, 0.1600, 0.2700, 0.1000, 0.0400, 0.1300, 0.1700, 0.0900, ...]
3. the office cafeteria serves soup on Thursdays
   [0.0500, 0.8200, 0.0900, 0.7100, 0.1800, 0.0300, 0.1200, 0.6600, ...]

## What the vectors represent

An embedding vector is a numeric representation of a piece of text's meaning, learned from language patterns. It is not a random ID and it is not a count of keywords. Texts with related meanings tend to occupy nearby regions in vector space, which lets retrieval find relevant passages even when the query and passage use different words.

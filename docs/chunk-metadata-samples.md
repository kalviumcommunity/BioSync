# Chunk Metadata Samples

Chunks keep their text and citation metadata together. Every strategy emits the same fields, even when a value such as `page` is not available from the source format.

## Paragraph chunk

```text
Text: Acme support policy
Metadata: {
  'source': 'policy.txt',
  'section': 'paragraph-1',
  'page': None,
  'position_start': 0,
  'position_end': 19,
  'chunk_index': 1,
  'strategy': 'paragraph'
}
```

## Fixed-window chunk

```text
Text: Acme support policy\n\nAnnual plans can be refunded within 30 days. Refunds ' retu
Metadata: {
  'source': 'policy.txt',
  'section': 'fixed-window',
  'page': None,
  'position_start': 0,
  'position_end': 80,
  'chunk_index': 1,
  'strategy': 'fixed'
}
```

## Traceback

The retrieved paragraph chunk can be checked against the exact cleaned source span:

```text
trace_chunk(chunk, policy_document)
=> policy.txt [0:19] -> Acme support policy
```

The source filename identifies the document, while the character positions identify the exact passage. A later retriever can filter on `metadata['source']`, `metadata['section']`, or `metadata['page']` without changing the chunk text.
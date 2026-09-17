# Structured Output Samples

These offline samples were produced from the parser tests and show the object the application may use only after validation.

## Valid response

Input:

```json
{"answer":"30 days","source":"Acme support policy"}
```

Parsed object:

```python
{"answer": "30 days", "source": "Acme support policy"}
```

## Malformed wrapper recovered

Input:

````text
Here is the result:
```json
{"answer":"30 days","source":"Acme support policy"}
```
````

The strict parse fails on the surrounding prose, then the recovery path extracts the fenced JSON and validates both required fields. The application receives the same parsed dict as the valid response.

## Malformed JSON rejected

Input: `{"answer":"30 days",}`

Result: `Invalid JSON: Expecting property name enclosed in double quotes at character 20.` The caller receives an error result instead of an unhandled exception.

## Missing field rejected

Input: `{"answer":"30 days"}`

Result: `Missing required field(s): source.`
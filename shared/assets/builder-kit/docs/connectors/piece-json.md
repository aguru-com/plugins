# JSON

Convert JSON to text and vice versa

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-json'
  version: '0.1.14'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `convert_json_to_text`

**Convert Json to Text.** Serialize a JSON object or array into its string form, for downstream steps that need raw text rather than structured data — a request body, a file body, or a plain text field. Use convert_text_to_json for the reverse direction, run_jsonata_query when the data needs reshaping rather than stringifying, and merge_json to fold several objects into one first. Read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `json` | JSON | yes | `{}` | JSON. |

### `convert_text_to_json`

**Convert Text to Json.** Parse a JSON-formatted string into a real object or array so later steps can reference its fields directly instead of handling raw text; the input must be strictly valid JSON, and malformed text throws rather than returning a partial result. Use convert_json_to_text for the reverse direction, or run_jsonata_query when the data is already structured and needs filtering or reshaping. Read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes | `""` | Text. |

### `run_jsonata_query`

**Run JSONata Query.** Evaluate a JSONata expression against a JSON object, array, or JSON string to filter, extract, group, or reshape it in a single step, covering transformations that would otherwise need custom code. Requires a syntactically valid JSONata expression — an invalid one fails the step, while a valid query that matches nothing returns null. Prefer merge_json to fold an array of objects into one, or convert_text_to_json / convert_json_to_text for plain parsing and stringifying. Read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `json` | JSON | yes | `{}` | JSON Data. Map the array or object you want to manipulate. |
| `query` | string | yes |  | JSONata Query. Write a JSONata expression to manipulate your data. You can filter arrays, extract specific fields, group items, or reshape the JSON. (e.g., $[status="active"]) |

### `merge_json`

**Merge JSON Objects.** Reduce an array of JSON objects into one object. For each field choose how conflicting values are resolved — first found, last found, most frequent, minimum, maximum, or concatenate into an array — with a default strategy for any field not listed. Use when stitching together objects extracted from document chunks or paginated results. Pure transform; safe to retry.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jsonArray` | JSON | yes |  | Objects to Merge. An array of JSON objects to merge, e.g. [{"title":"Q1","total":10},{"total":12,"author":"Jane"}]. Map the array output of a previous step here. |
| `defaultStrategy` | string | yes | `"last"` | Default Strategy. How to resolve any field not listed below. "Last found" mirrors a plain object merge where later objects win. One of `"first"`, `"last"`, `"most_frequent"`, `"min"`, `"max"`, `"concat"`. |
| `fieldStrategies` | array | no |  | Field Strategies. Override the default strategy for specific fields. Each row maps one field name to a strategy. Each item: { `field`, `strategy` }. |

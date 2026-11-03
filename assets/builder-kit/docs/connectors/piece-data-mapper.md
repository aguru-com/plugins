# Data Mapper

tools to manipulate data structure

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-data-mapper'
  version: '0.3.21'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `advanced_mapping`

**Advanced Mapping.** Reshapes data already present in the run by returning the Mapping object you define with every template reference inside it resolved (e.g. {{trigger.body.email}}), so you can rename, subset, or nest fields into a clean payload for a later step. Pick it when you only need to restructure or rekey existing values, not transform them - prefer text-helper for string edits, date-helper for date conversion, and the JSON piece to parse or stringify. Requires the Mapping JSON object; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mapping` | JSON | yes | `{"newProperty":"oldProperty"}` | Mapping. The mapping to use. |

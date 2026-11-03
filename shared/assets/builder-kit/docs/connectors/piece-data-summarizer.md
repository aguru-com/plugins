# Data Summarizer

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-data-summarizer'
  version: '0.0.16'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `calculateAverage`

**Calculate Average.** Computes the arithmetic mean of an array of numeric values. Use when you need the average of a collected list; prefer Calculate Sum for a total, Find Min and Max for the extremes, or Count Uniques for distinct-value counts. Every element must be coercible to a number (numeric strings are accepted) or the action throws listing the offending values and their positions, and an empty list yields NaN; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `values` | array | yes |  | Values. |

### `calculateSum`

**Calculate Sum.** Adds up an array of numeric values and returns the total. Use when you need a running total or aggregate of a collected list; prefer Calculate Average for the mean, Find Min and Max for the extremes, or Count Uniques for distinct-value counts. Every element must be coercible to a number (numeric strings are accepted) or the action throws listing the offending values and their positions; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `values` | array | yes |  | Values. |

### `countUniques`

**Count Uniques.** Counts how many distinct entries an array contains, comparing whole entries when Fields is left empty or only the chosen object keys when Fields is supplied. Use for cardinality or de-duplication checks; prefer Calculate Sum, Calculate Average, or Find Min and Max for numeric aggregation. Values need not be numeric, but in field mode any entry that is not an object, or an object holding none of the chosen keys, collapses into one shared bucket; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `values` | array | yes |  | Values. |
| `fields` | array | no |  | Fields. |

### `getMinMax`

**Find Min and Max.** Returns both the smallest and the largest number from an array of numeric values in a single call. Use when you need the range or the extremes of a collected list; prefer Calculate Sum for a total, Calculate Average for the mean, or Count Uniques for distinct-value counts. Every element must be coercible to a number (numeric strings are accepted) or the action throws listing the offending values and their positions, and an empty list returns max -Infinity and min Infinity; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `values` | array | yes |  | Values. |

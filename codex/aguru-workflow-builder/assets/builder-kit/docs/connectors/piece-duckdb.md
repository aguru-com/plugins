# DuckDB

Run SQL queries on an in-memory DuckDB database.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-duckdb'
  version: '0.0.9'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `createAndQueryDB`

**Create and Query DB.** Spins up a throwaway in-memory DuckDB, loads one or more tables from supplied JSON arrays (column names taken from object keys; schema can be given explicitly or autodetected), then runs a SQL query against them and returns the rows. Use to run SQL joins, aggregations, or transforms over JSON data you already have in the flow, without any external database. Use parameterized placeholders ($1, $2, ...) with the args list rather than interpolating values into the query string. Read-only with respect to external systems: the database exists only for this call, so repeating with the same input yields the same result.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tables` | array | yes |  | Tables. List of tables to create in the database. Each item: { `name`, `data`?, `file`?, `schema`?, `keepNestedFields`? }. |
| `query` | string | yes |  | Query. Please use $1, $2, etc. for parameterized queries to avoid SQL injection. |
| `args` | array | no |  | Arguments. Arguments to be used in the query. |

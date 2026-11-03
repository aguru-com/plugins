# SurrealDB

Multi Model Database

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-surrealdb'
  version: '0.1.7'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Connection URL. Connection string, e.g. http://1.2.3.5:8000. |
| `database` | string | yes |  | Database. A string indicating the name of the database to connect to. |
| `namespace` | string | yes |  | Namespace. As string indicating the namespace of the database to connect to. |
| `username` | string | yes |  | Username. As string indicating the username of the database to connect to. |
| `password` | string | yes |  | Password. As string indicating the password of the database to connect to. |

## Actions

### `run-query`

**Run Query.** Executes an arbitrary SurrealQL statement against a SurrealDB database, returning the result body. Use this for any read or write the dedicated actions do not cover (SELECT/CREATE/UPDATE/DELETE/relate/define). Pass parameters via the args object (reference them as $name in the query) rather than interpolating values, to avoid injection. Not idempotent in general: the effect depends entirely on the statement, so write/mutating queries change state on each call while plain SELECTs do not. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Provide a SurrealDB query string to execute. |
| `args` | object | no |  | Arguments. Add all arguments as names here, don't add the $ sign. |
| `query_timeout` | number | no | `30000` | Query Timeout (ms). The maximum time to wait for a query to complete before timing out. |
| `application_name` | string | no |  | Application Name. An identifier for the client application executing the query. |

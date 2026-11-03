# Connections

Read connections dynamically

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-connections'
  version: '0.5.10'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `read_connection`

**Read Connection.** Looks up a stored app connection in the current project by its external ID, so a flow can resolve credentials at runtime instead of binding one fixed connection at build time (for example when the external ID arrives in a webhook payload). When the connection is known up front, configure the target piece action with its own auth instead. Requires the exact external ID and throws if no connection matches; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `connection_name` | string | yes |  | Connection External ID. |

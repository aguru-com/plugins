# AnyHook Websocket

AnyHook Websocket enables real-time communication through AnyHook proxy server by allowing you to subscribe and listen to websocket events

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-anyhook-websocket'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `proxyBaseUrl` | string | yes | `"http://10.0.0.101:3001"` | AnyHook Server URL. The URL of your AnyHook server. |

## Actions

None.

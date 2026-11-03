# GraphQL

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-graphql'
  version: '0.0.20'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `send_request`

**Send Request.** Sends an arbitrary GraphQL query or mutation to any GraphQL endpoint, optionally through an HTTP proxy, with a failsafe mode that returns the error message instead of throwing. Use it for GraphQL APIs that have no dedicated Activepieces piece, and prefer the HTTP piece for plain REST endpoints. The piece carries no auth, so any token must be passed manually in Headers; not idempotent, since the query field can carry a mutation.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `method` | string | yes | `"POST"` | Method. One of `"GET"`, `"POST"`, `"PATCH"`, `"PUT"`, `"DELETE"`, `"HEAD"`. |
| `url` | string | yes |  | URL. |
| `queryParams` | object | yes |  | Query params. |
| `headers` | object | yes |  | Headers. |
| `query` | string | yes |  | Query. |
| `variables` | JSON | no |  | Variables. |
| `use_proxy` | boolean | no | `false` | Use Proxy. Use a proxy for this request. |
| `proxy_settings` | object | no |  | Proxy Settings. An object whose fields depend on other inputs; the product shows them. |
| `timeout` | number | no |  | Timeout(in seconds). |
| `failsafe` | boolean | no |  | No Error on Failure. |

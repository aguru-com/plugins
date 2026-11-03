# Saleor

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-saleor'
  version: '0.1.6'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Saleor

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiUrl` | string | yes |  | Saleor API URL. Your Saleor GraphQL API endpoint. |
| `token` | string | yes |  | Saleor token. Your token. |

## Actions

### `rawGraphqlQuery`

**Raw GraphQL query.** Sends an arbitrary GraphQL operation (query or mutation) to the Saleor GraphQL endpoint with optional variables. Use this as the escape hatch when no dedicated action covers the data or operation you need. Not idempotent in general: it can run mutations, so repeating it may create or change data depending on the operation you supply. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. |
| `variables` | object | no |  | Parameters. |

### `getOrder`

**Get an order.** Fetches a single Saleor order by its order ID, returning core fields such as number, status, total, customer, and line items. Use it to look up the current details of a known order. Requires the order ID and is read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | string | yes |  | The ID of the order. |

### `addOrderNote`

**Add Order Note.** Adds a note to a Saleor order identified by its order ID, appending the given message to that order. Use it to record a comment or annotation on a known order. Requires the order ID and message; not idempotent, since each call appends another note. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orderId` | string | yes |  | Order ID. The ID of the order. |
| `message` | string | yes |  | Note Message. The content of the note. |

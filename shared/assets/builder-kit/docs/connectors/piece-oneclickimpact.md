# 1ClickImpact

Make a positive environmental impact with every transaction.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-oneclickimpact'
  version: '0.1.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> API Key for authenticating with 1ClickImpact

## Actions

### `captureCarbon`

**Capture carbon.** Purchases carbon capture through 1ClickImpact for a given amount (in lbs, 1 to 10,000,000), optionally attributed to a named customer email/name. Use to offset emissions as part of a transaction or fulfillment flow. Not idempotent — each call records a new capture, so repeating it captures additional carbon. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `amount` | number | yes |  | Amount. The amount of carbon to capture in lbs (1 and 10,000,000) |
| `customerEmail` | string | no |  | Customer Email. The email of the customer on whose behalf the carbon is being captured. |
| `customerName` | string | no |  | Customer Name. The name of the customer on whose behalf the carbon is being captured. |
| `notify` | boolean | no |  | Notify. Notification preference. |

### `cleanOcean`

**Clean ocean.** Purchases ocean-waste cleanup through 1ClickImpact for a given amount (in lbs, 1 to 10,000,000), optionally attributed to a named customer email/name. Use to fund cleanup as part of a transaction or fulfillment flow. Not idempotent — each call records a new cleanup, so repeating it cleans additional waste. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `amount` | number | yes |  | Amount. The amount of ocean waste to clean in lbs (1 and 10,000,000) |
| `customerEmail` | string | no |  | Customer Email. The email of the customer on whose behalf the ocean waste is being cleaned. |
| `customerName` | string | no |  | Customer Name. The name of the customer on whose behalf the ocean waste is being cleaned. |
| `notify` | boolean | no |  | Notify. Notification preference. |

### `donateMoney`

**Donate Money.** Makes a monetary donation to environmental causes through 1ClickImpact for an amount in USD (minimum $1.00, converted to cents internally), optionally attributed to a named customer email/name. Use to fund impact as part of a transaction or fulfillment flow. Not idempotent — each call records a new donation, so repeating it donates again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `amount` | number | yes |  | Amount (USD). The amount in USD you wish to donate. Minimum $1.00. |
| `customerEmail` | string | no |  | Customer Email. The email of the customer on whose behalf the donation is being made. |
| `customerName` | string | no |  | Customer Name. The name of the customer on whose behalf the donation is being made. |
| `notify` | boolean | no |  | Notify. Notification preference. |

### `plantTrees`

**Plant Trees.** Purchases tree planting through 1ClickImpact for a given number of trees (1 to 10,000,000), optionally attributed to a named customer email/name. Use to fund reforestation as part of a transaction or fulfillment flow. Not idempotent — each call records a new planting, so repeating it plants additional trees. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `amount` | number | yes |  | Amount. The number of trees to plant (1 and 10,000,000) |
| `customerEmail` | string | no |  | Customer Email. The email of the customer on whose behalf the trees are being planted. |
| `customerName` | string | no |  | Customer Name. The name of the customer on whose behalf the trees are being planted. |
| `notify` | boolean | no |  | Notify. Notification preference. |

### `custom_api_call`

**Custom API Call.** Make a custom API call to a specific endpoint. Needs authentication.

Kind: write.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | object | yes |  | . An object whose fields depend on other inputs; the product shows them. |
| `method` | string | yes | `"GET"` | Method. One of `"GET"`, `"POST"`, `"PATCH"`, `"PUT"`, `"DELETE"`, `"HEAD"`. |
| `headers` | object | no |  | Headers. Authorization headers are injected automatically from your connection. |
| `queryParams` | object | no |  | Query Parameters. Appended to the URL as ?key=value. |
| `body_type` | string | no | `"none"` | Body Type. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | object | no |  | Body. An object whose fields depend on other inputs; the product shows them. |
| `response_is_binary` | boolean | no | `false` | Response is Binary. Enable for files like PDFs, images, etc. |
| `failsafe` | boolean | no |  | Return Error as Output. On a failed request, output the error instead of failing the step. |
| `timeout` | number | no |  | Timeout. Seconds to wait for a response. Empty: up to the flow limit (10 min). |
| `followRedirects` | boolean | no | `false` | Follow redirects. Follow 3xx redirects instead of returning them as the response. |

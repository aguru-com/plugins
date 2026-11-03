# Moonclerk

MoonClerk is an easy-to-use payment form builder for Stripe.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-moonclerk'
  version: '0.1.0'
```

Categories: COMMERCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Moonclerk API Key. You can find it in your Moonclerk account settings. (https://app.moonclerk.com/settings/api-key)

## Actions

### `retrivePlan`

**Retrieve Plan.** Look up a MoonClerk customer by their customer ID and return the subscription plan attached to that customer. Use to fetch plan/pricing details (amount, interval, currency) for a known customer. Requires a valid customer ID; returns nothing if the customer has no subscription. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customerId` | string | yes |  | Customer ID. The ID of the customer to retrieve the plan for. |

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

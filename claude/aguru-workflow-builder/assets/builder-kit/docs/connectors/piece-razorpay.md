# Razorpay

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-razorpay'
  version: '0.2.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Enter your Key ID and Key Secret
>
> Login to your Dashboard with appropriate credentials.
> Select the mode (Test or Live) for which you want to generate the API key
> Navigate to Settings > API Keys > Generate Key to generate keys for the selected mode.
>
> The Key ID and Key Secret appear in a pop-out window.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `keyID` | string | yes |  | Key ID. |
| `keySecret` | string | yes |  | Key Secret. |

## Actions

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

### `create-payment-link`

**Create Payment Link.** Creates a new Razorpay payment link for a given amount and currency, optionally notifying the customer by SMS and/or email. Use to collect a one-off payment from a customer; amount is specified in major currency units (e.g. rupees) and is converted to the smallest unit internally. Not idempotent — each call generates a new payment link. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `amount` | number | yes |  | Amount. |
| `currency` | string | yes | `"INR"` | Currency. |
| `reference_id` | string | no |  | Reference ID. |
| `description` | string | no |  | Description. |
| `customer_name` | string | no |  | Customer Name. |
| `customer_contact` | string | yes | `"+91"` | Customer Contact. |
| `notify_sms` | boolean | no | `true` | Notify via SMS. Send notification via SMS. |
| `customer_email` | string | no |  | Customer Email. |
| `notify_email` | boolean | no | `true` | Notify via Email. Send notification via Email. |
| `metafield_notes` | string | no |  | Notes. |
| `callback_url` | string | no |  | Callback URL. |
| `callback_method` | string | no |  | Callback Method. |

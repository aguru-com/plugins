# Bolna AI

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-bolna'
  version: '0.2.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Bolna AI API Key

> To get your API Key:
>
> 1. Login to the dashboard at https://platform.bolna.ai
> 2. Navigate to Developers tab from the left menu bar after login
> 3. Click the button Generate a new API Key to generate a key
> 4. Get your API Key

## Actions

### `makePhoneCall`

**Make Phone Call.** Place an outbound voice call to a recipient using a Bolna AI agent. Requires an agent ID and a recipient phone number in E.164 format; optionally set a from-number, schedule the call for a future ISO 8601 time (omit to dial immediately), and pass dynamic user variables referenced in the agent prompt. Each call is not idempotent — repeating it places another call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent. Select the Bolna Voice AI agent. A value the product loads from the provider, such as an id; write the value itself. |
| `recipientPhoneNumber` | string | yes |  | Recipient Phone Number. Phone number of the recipient with country code (E.164 format, e.g., +10123456789) |
| `fromPhoneNumber` | string | no |  | From Phone Number. Phone number of the sender with country code (E.164 format, e.g., +19876543007). Optional. |
| `scheduledAt` | string | no |  | Scheduled At. The scheduled date and time in ISO 8601 format with time zone (e.g., 2025-08-21T10:35:00Z). Leave empty to call immediately. |
| `userData` | JSON | no |  | User Data. Additional user dynamic variables as defined in the agent prompt (JSON object) |

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

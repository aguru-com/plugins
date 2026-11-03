# Fliqr AI

Omnichannel AI chatbot enhancing customer interactions across WhatsApp, Facebook, Instagram, Telegram, and 6 other platforms.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-fliqr-ai'
  version: '0.2.1'
```

Categories: COMMUNICATION, CUSTOMER_SUPPORT, MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Fliqr API Access Token

> To obtain your Fliqr API access token, follow these steps:
>
> 1. Log in to your Fliqr account.
> 2. Navigate to Fliqr API Access Token Settings.
> 3. Under the Integrations section, find the Fliqr API Access Token.
> 4. Click on Copy Token to copy your existing token or click on Generate Token to create a new one.
> 5. Copy the token and paste it below in "Fliqr API Access Token".

## Actions

### `get_fliqr_account_details`

**Get Business Account details.** Fetches the basic profile/details of the authenticated Fliqr AI business account (the account that owns the connected API token). Use to retrieve account identity or configuration before acting on the account. Read-only; repeating the call is safe. Needs authentication.

Kind: read, safe to repeat.

No inputs.

### `get_fliqr_account_flows`

**Get Account Flows.** Lists all chatbot flows configured on the authenticated Fliqr AI account. Use to discover the available flows (e.g. to find a flow id or confirm what automations exist) before referencing or triggering one. Read-only; repeating the call is safe. Needs authentication.

Kind: search, safe to repeat.

No inputs.

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

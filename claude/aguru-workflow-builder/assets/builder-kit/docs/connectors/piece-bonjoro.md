# Bonjoro

Send personal video messages to delight customers

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-bonjoro'
  version: '0.2.0'
```

Categories: CUSTOMER_SUPPORT. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Authenticate with your Bonjoro account

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. The API key for your Bonjoro account. |

## Actions

### `add_greet`

**Create a Greet.** Creates a personal-video Greet task in Bonjoro for a recipient identified by email (upserting their profile first), with a note and optional assignee, campaign, and message template. Use to queue a new outreach video for a customer. Not idempotent: each call creates a new Greet, so repeating it produces duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `note` | string | yes |  | Note. Note to send with the greet. |
| `email` | string | yes |  | Email. Email to send the greet to. |
| `first` | string | no |  | First Name. First name of the person to greet. |
| `last` | string | no |  | Last Name. Last name of the person to greet. |
| `assignee` | string | no |  | Assignee. Who to assign the greet to. A value the product loads from the provider, such as an id; write the value itself. |
| `campaign` | string | no |  | Campaign. The campaign to add the greet to. A value the product loads from the provider, such as an id; write the value itself. |
| `template` | string | no |  | Template. The template to use for the greet. A value the product loads from the provider, such as an id; write the value itself. |
| `custom` | JSON | no | `{}` | Custom Attributes. Enter custom attributes to send with the greet. |

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

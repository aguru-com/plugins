# Dashworks

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-dashworks'
  version: '0.2.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain API key from [API Settings](https://web.dashworks.ai/admin/api-keys).

## Actions

### `generate-answer`

**Generate Answer.** Send a question or prompt to a specific Dashworks bot and get back a generated, knowledge-grounded answer. Use when an agent needs Dashworks to answer using its connected company knowledge sources. Requires the target bot ID; optionally toggle inline markdown source citations in the answer. Not idempotent — each call generates a fresh answer. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `botId` | string | yes |  | Bot ID. You can find this by going to Dashworks > Bots, clicking on an existing Bot, and using the 'Copy Bot ID' button on the top right. |
| `message` | string | yes |  | Message. The message (e.g., a question or prompt) that you want a response to. |
| `inlineSources` | boolean | no |  | Inline Sources. When true (default), sources will be cited inline in markdown formatting within the answer text.When false, the answer will not contain inline citations. |

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

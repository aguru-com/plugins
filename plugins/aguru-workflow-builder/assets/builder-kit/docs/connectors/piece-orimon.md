# Orimon

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-orimon'
  version: '0.2.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Orimon API Key

> To get your Orimon API Key:
>
> 1. **Login to your Orimon Dashboard**
> 2. **Click the profile icon** (image icon) in the Top Right corner
> 3. **Select "Profile"** from the menu
> 4. **Click "Generate Your Secret Key"** to create a new API key
> 5. **Click the eye icon** to reveal your key
> 6. **Copy the key** and paste it here
>
> For more details, visit: [Orimon Developer API Docs](https://orimon.gitbook.io/docs/developer-api/getting-started-with-apis)

## Actions

### `sendMessage`

**Send Message.** Send a text message to an Orimon chatbot for a given tenant and return the bot's reply. Use to drive a conversational exchange with the chatbot. Requires the tenant ID (from the bot configuration page URL); each call posts a new message and generates a fresh conversation session, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tenantId` | string | yes |  | Tenant ID. To get it: Login to your dashboard and click on the bot configuration page. At the top in the URL bar, copy the value starting after "tenant/" to the end. |
| `messageText` | string | yes |  | Message. The message to send to the chatbot. |
| `messageId` | string | no |  | Message ID. Unique identifier for this message. |

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

# Qwilr

Create beautiful, interactive sales documents and proposals with Qwilr. Automate page creation, track views, and handle acceptance events.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-qwilr'
  version: '0.2.0'
```

Categories: SALES_AND_CRM, CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> 1. Go to your Qwilr account settings.
> 2. Navigate to API Settings.
> 3. Copy your access token.

## Actions

### `create_page`

**Create Page.** Creates a new Qwilr sales/proposal page from an existing template (template ID required), optionally publishing it live or leaving it as a draft, and applying token substitutions, tags, owner, and accept-block settings. Use to programmatically generate a personalized proposal or quote from a template. Not idempotent: each call creates a separate page. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. ID of the template to use for the page. |
| `name` | string | no |  | Page Name. Title of the page, visible as the browser page title. |
| `published` | boolean | no | `false` | Publish Page. Whether the page is publicly available; false means the page will be in Draft status. |
| `ownerId` | string | no |  | Owner ID. ID of the user that should own the page. If not specified, the owner of the access token will be the owner of the page. |
| `tags` | array | no |  | Tags. The tags for your page. Tags are case-sensitive. |
| `metadata` | JSON | no |  | Metadata. Data you provide, that will be returned as part of all Webhooks. |
| `substitutions` | JSON | no |  | Substitutions. Mapping of token API reference keys to substitution values used throughout the page. |
| `acceptSettings` | object | no |  | Accept Settings. Configures settings for the accept block in the template being used. Only relevant if you have an accept block. |

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

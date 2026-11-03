# Certopus

Your certificates, made simple

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-certopus'
  version: '0.3.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> API key acquired from your Certopus profile

## Actions

### `create_credential`

**Create Credential.** Issues a Certopus certificate/credential for a single recipient under a given organisation, event, and category, supplying the recipient email plus the category-specific data fields. Use to grant a certificate to one person; the generate and publish flags control whether Certopus immediately produces and publishes it. Not idempotent — each call creates a new credential, so repeating it issues duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organisation` | string | yes |  | Organisations. A value the product loads from the provider, such as an id; write the value itself. |
| `event` | string | yes |  | Event. A value the product loads from the provider, such as an id; write the value itself. |
| `category` | string | yes |  | Category. A value the product loads from the provider, such as an id; write the value itself. |
| `generate` | boolean | yes | `false` | Generate. Automatically generate the crentials. |
| `publish` | boolean | yes | `false` | Publish. Automatically publish the crentials. |
| `email` | string | yes |  | Recipient Email. Email address of the recipient. |
| `fields` | object | yes |  | Recipient Data. An object whose fields depend on other inputs; the product shows them. |

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

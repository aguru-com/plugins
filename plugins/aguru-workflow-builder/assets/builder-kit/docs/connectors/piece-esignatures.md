# eSignatures

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-esignatures'
  version: '0.2.1'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Esignatures API Key

## Actions

### `createContract`

**Create Contract.** Creates an eSignatures contract from an existing template and, by default, sends it to the listed signers for signature; set save-as-draft to create it without sending. Use when an agent needs to issue a document for signing. Requires a valid template ID and at least one signer (name plus email and/or mobile). Not idempotent: each call creates and dispatches a new contract. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. The ID of the template to use for the contract. |
| `title` | string | no |  | Contract Title. Unique title for the contract (defaults to template title if not specified) |
| `locale` | string | no |  | Language. Language setting for the signer page and emails. One of `"cz"`, `"da"`, `"de"`, `"el"`, `"en"`, `"en-GB"`, `"es"`, `"fi"`, `"fr"`, `"hr"`, `"hu"`, `"id"`, `"it"`, `"ja"`, `"nl"`, `"no"`, `"pl"`, `"pt"`, `"ro"`, `"rs"`, `"sk"`, `"sl"`, `"sv"`, `"vi"`, `"zh-CN"`. |
| `metadata` | string | no |  | Metadata. Custom data to attach to the contract. |
| `expiresInHours` | number | no |  | Expires In Hours. Sets the expiry time (in hours) for the contract. |
| `customWebhookUrl` | string | no |  | Custom Webhook URL. Custom URL for webhook notifications. |
| `assignedUserEmail` | string | no |  | Assigned User Email. Email to assign management of the contract. |
| `labels` | array | no |  | Labels. Labels to assign to the contract (for grouping) |
| `test` | boolean | no |  | Test Contract. Mark as test/demo contract with no fees charged. |
| `saveAsDraft` | boolean | no |  | Save as Draft. Save as draft instead of sending to signers. |
| `signers` | array | yes |  | Signers. List of individuals required to sign (name, email, and/or mobile) |

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

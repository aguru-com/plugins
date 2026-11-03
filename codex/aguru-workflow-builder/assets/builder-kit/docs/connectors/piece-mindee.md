# Mindee

Document automation API

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mindee'
  version: '0.3.1'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Api Key

> #### To obtain access your Api Key
> 1. Sign up and log in to Mindee
> 2. Go to [API Key page](https://platform.mindee.com/api-keys)
> 3. Copy the Key and paste below.

## Actions

### `mindee_predict_document`

**Extract Document.** Runs OCR extraction on a document via Mindee, returning structured fields parsed from it. Choose the document-type model through the API Name option (receipt, invoice, passport, bank account details, proof of address, or financial document), since each extracts a different field set. The document is supplied as a remote URL, local file path, or Base64 string. Read-only analysis with no stored result, so re-running on the same document is idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_name` | string | yes | `"mindee"` | Account Name. Refers to your username or organization name with which you signed up with. |
| `api_name` | string | yes | `"full"` | API Name. Refers to the name of the API your are using. One of `"bank_account_details/v1"`, `"expense_reports/v4"`, `"passport/v1"`, `"invoices/v3"`, `"proof_of_address/v1"`, `"financial_document/v1"`. |
| `file` | string | yes |  | File URL. Remote file URL or Base64 string. We currently support .pdf (slower), .jpg, .png, .webp, .tiff and .heic formats. |

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

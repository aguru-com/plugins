# Kissflow

Low-code no-code platform

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-kissflow'
  version: '0.2.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> You can generate your Access Key following these instructions:
> https://community.kissflow.com/t/35h4az8/api-authentication#access-keys

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountName` | string | yes |  | Account Name. Your kissflow account name eg. {account_name}.kissflow.com. |
| `accountId` | string | yes |  | Account ID. |
| `domainName` | string | yes |  | Domain. One of `"kissflow.com"`, `"kissflow.eu"`. |
| `accessKeyId` | string | yes |  | Access Key ID. |
| `accessKeySecret` | string | yes |  | Access Key Secret. |

## Actions

### `downloadAttachmentFromFormField`

**Download Attachment from Form Field.** Fetches a single attachment file stored on a form field of a Kissflow process item and returns it as a file. Use this to retrieve a known attachment by its identifiers; it requires the full address of the file (process ID, instance ID, activity instance ID, field ID, and attachment ID). Read-only and idempotent: repeating the call with the same IDs returns the same file without side effects. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `processId` | string | yes |  | Process ID. |
| `instanceId` | string | yes |  | Instance ID. |
| `activityInstanceId` | string | yes |  | Activity Instance ID. |
| `fieldId` | string | yes |  | Field ID. |
| `attachmentId` | string | yes |  | Attachment ID. |

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

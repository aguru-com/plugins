# Formstack

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-formstack'
  version: '0.2.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Connect your Formstack account

## Actions

### `createSubmission`

**Create Submission.** Submits a new entry to a specific Formstack form, populating its fields (which are loaded dynamically from the chosen form) plus optional submission metadata like user agent, IP, and payment status. Use to programmatically record form responses. Not idempotent: each call creates a separate submission. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Forms . A value the product loads from the provider, such as an id; write the value itself. |
| `user_agent` | string | no |  | User Agent. Browser user agent to record. |
| `remote_addr` | string | no |  | IP Address. IP address to record. |
| `payment_status` | string | no |  | Payment Status. Payment integration status. |
| `read` | boolean | no | `false` | Mark as Read. Mark submission as read when created. |
| `encryption_password` | string | no |  | Encryption Password. Password for encrypted forms. |
| `form_fields` | object | yes |  | Form Fields. Fill out the form fields. An object whose fields depend on other inputs; the product shows them. |

### `findFormByNameOrId`

**Find Form by Name or ID.** Looks up Formstack forms by a search query that is interpreted in one of two modes: a purely numeric value fetches that single form directly by ID, while any other value searches forms by name (optionally restricted to exact name matches). Use to resolve a form reference before creating or reading submissions. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_query` | string | yes |  | Form Name or ID. Enter form name or ID to search. |
| `include_folders` | boolean | no | `false` | Group by Folders. Organize results by folders. |
| `exact_match` | boolean | no | `false` | Exact Name Match. Only exact name matches. |

### `getSubmissionDetails`

**Get Submission Details.** Retrieves the field values and timestamp of a single Formstack submission by its submission ID, optionally including technical metadata (IP, user agent, location). Use when you have a submission ID and need its contents. Encrypted forms require the encryption password. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Forms . A value the product loads from the provider, such as an id; write the value itself. |
| `submission_id` | string | yes |  | Submission. A value the product loads from the provider, such as an id; write the value itself. |
| `encryption_password` | string | no |  | Encryption Password. Password for encrypted forms. |
| `include_metadata` | boolean | no | `false` | Include Technical Metadata. Include IP, user agent, and location data. |

### `findSubmissionByFieldValue`

**Find Submission by Field Value.** Searches across all accessible Formstack submissions for ones whose field values match a search string, returning paginated results (sortable, optionally annotated with form names). Use to locate submissions by content rather than by known ID. The search value must be at least 3 characters. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_value` | string | yes |  | Search Value. Value to search for (minimum 3 characters) |
| `per_page` | number | no | `25` | Results Per Page. Number of results per page (1-100) |
| `page` | number | no | `1` | Page Number. Page number to return. |
| `sort_order` | string | no | `"DESC"` | Sort Order. Sort results by submission ID. One of `"DESC"`, `"ASC"`. |
| `include_form_names` | boolean | no | `true` | Include Form Names. Include form names in results. |

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

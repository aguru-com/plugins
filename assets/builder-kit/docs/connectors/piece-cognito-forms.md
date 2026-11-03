# Cognito Forms

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-cognito-forms'
  version: '0.2.2'
```

Categories: PRODUCTIVITY, FORMS_AND_SURVEYS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> 1. Click your organization's name in the top left corner and then click Settings.
> 2. Go to the Integrations section and select + New API Key.
> 3. Make sure to copy and store your API key, as it cannot be retrieved later.

## Actions

### `create_entry`

**Create Entry.** Creates a new entry (form submission) in a specified Cognito Forms form. Choose this to submit data into a form programmatically; the entry field values must match the target form's schema. Not idempotent: each call creates a separate entry. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `entryData` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

### `update_entry`

**Update Entry.** Updates an existing entry in a Cognito Forms form, identified by its entry ID, applying the provided field values. Choose this when you already have the entry ID and want to modify its data rather than create a new one. Idempotent: repeating with the same field values leaves the entry in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `entryId` | string | yes |  | Entry ID. Enter the ID of the entry you want to update. |
| `entryData` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

### `delete_entry`

**Delete Entry.** Permanently deletes a single entry from a Cognito Forms form, identified by its entry ID. Choose this to remove a specific submission you can identify by ID. Idempotent: once the entry is gone, repeating the call converges to the same deleted state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `entryId` | string | yes |  | Entry ID. Enter the ID of the entry to delete. |

### `get_entry`

**Get Entry.** Retrieves a single entry from a Cognito Forms form by its entry ID. Choose this to read back the field values of one known submission. Read-only and idempotent; requires both the form ID and the entry ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `entryId` | string | yes |  | Entry ID. Enter the ID of the entry to retrieve. |

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

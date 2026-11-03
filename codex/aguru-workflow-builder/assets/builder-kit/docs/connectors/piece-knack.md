# Knack

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-knack'
  version: '0.2.1'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. Your Knack API Key available in the Settings section of the Builder. |
| `applicationId` | string | yes |  | Application ID. Your Application ID available in the Settings section of the Builder. |

## Actions

### `create_record`

**Create Record.** Creates a new record in a chosen Knack object (table), with field values supplied as key-value data keyed by Knack field IDs. Use when adding a new row to a Knack database. Not idempotent: each call inserts another record, and a duplicate unique value returns a conflict error. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. A value the product loads from the provider, such as an id; write the value itself. |
| `recordFields` | object | yes |  | Record Fields. An object whose fields depend on other inputs; the product shows them. |

### `delete_record`

**Delete Record.** Permanently deletes a single record from a chosen Knack object (table), identified by its record ID. Use when removing a known row. Requires a valid record ID; a missing ID returns a not-found error. Not idempotent: the record is removed on the first successful call and repeating it fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. The ID of the record to delete. |

### `find_record`

**Find Record.** Looks up a single record in a chosen Knack object (table) by matching one field against a value (exact "is" match), returning the first match or a not-found result. Use to find a record by a known field value rather than its record ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. A value the product loads from the provider, such as an id; write the value itself. |
| `fieldId` | string | yes |  | Field ID. Field to find the record by. A value the product loads from the provider, such as an id; write the value itself. |
| `fieldValue` | string | yes |  | Field Value. The value to search for in the specified field. |

### `update_record`

**Update Record.** Updates an existing record in a chosen Knack object (table), identified by its record ID, applying the supplied field values keyed by Knack field IDs. Use when modifying a known row. Requires a valid record ID; a missing ID returns a not-found error. Idempotent: re-applying the same field values to the same record yields the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. A value the product loads from the provider, such as an id; write the value itself. |
| `recordId` | string | yes |  | Record ID. The ID of the record to update. |
| `recordFields` | object | yes |  | Record Fields. An object whose fields depend on other inputs; the product shows them. |

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

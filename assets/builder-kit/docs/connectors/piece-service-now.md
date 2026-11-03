# ServiceNow

Enterprise IT service management platform for incident, change, and service request management

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-service-now'
  version: '0.3.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `instanceUrl` | string | yes |  | Instance URL. Your ServiceNow instance URL without trailing slash (e.g., https://dev12345.service-now.com) |
| `username` | string | yes |  | Username. Your ServiceNow username (not email) |
| `password` | string | yes |  | Password. Your ServiceNow password (not API token) |

## Actions

### `create_record`

**Create Record.** Inserts a new row into any ServiceNow table (incident, sc_request, problem, change_request, custom tables, etc.) with the field values you supply. Use when you need to open a new record from an automation; for incidents specifically prefer this only when no more specialized action fits. Not idempotent — each call creates a distinct record, so guard against re-running. Requires the target table name and a field map matching that table's columns. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | yes |  | Table. ServiceNow table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Record Fields. Field names and values for the new record. |
| `sysparm_display_value` | string | no | `"false"` | Return Display Values. How to format the response data. One of `"false"`, `"true"`, `"all"`. |
| `sysparm_fields` | array | no |  | Fields to Return. Specific fields to include in response (optional) |
| `sysparm_input_display_value` | boolean | no | `false` | Use Display Values for Input. Treat input values as display names instead of IDs. |
| `sysparm_view` | string | no |  | UI View. View context for returned fields. One of `"desktop"`, `"mobile"`, `"both"`. |

### `update_record`

**Update Record.** Updates field values on an existing record in any ServiceNow table, identified by its sys_id (pick from the record dropdown or pass a raw sys_id manually). Use to change status, reassign, or edit fields on a known record. Idempotent: applying the same field values to the same sys_id repeatedly leaves the record in the same state. Requires the table and the record sys_id plus the fields to set. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | yes |  | Table. ServiceNow table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `record` | string | yes |  | Record. Select a record from the table. A value the product loads from the provider, such as an id; write the value itself. |
| `manual_sys_id` | string | no |  | Or Enter Sys ID Manually. Enter the sys_id directly if not found in dropdown. |
| `fields` | object | yes |  | Fields to Update. Field names and new values to update. |
| `sysparm_display_value` | string | no | `"false"` | Return Display Values. How to format the response data. One of `"false"`, `"true"`, `"all"`. |
| `sysparm_fields` | array | no |  | Fields to Return. Specific fields to include in response (optional) |
| `sysparm_input_display_value` | boolean | no | `false` | Use Display Values for Input. Treat input values as display names instead of IDs. |
| `sysparm_view` | string | no |  | UI View. View context for returned fields. One of `"desktop"`, `"mobile"`, `"both"`. |

### `get_record`

**Get Record.** Fetches a single record from any ServiceNow table by its sys_id (select from the record dropdown or supply a raw sys_id). Use when you already have the record identifier and need its current field values; for searching by criteria instead use Find Records. Read-only and idempotent. Requires the table and the record sys_id. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | yes |  | Table. ServiceNow table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `record` | string | yes |  | Record. Select a record from the table. A value the product loads from the provider, such as an id; write the value itself. |
| `manual_sys_id` | string | no |  | Or Enter Sys ID Manually. Enter the sys_id directly if not found in dropdown. |
| `sysparm_display_value` | string | no | `"false"` | Return Display Values. How to format the response data. One of `"false"`, `"true"`, `"all"`. |
| `sysparm_exclude_reference_link` | boolean | no | `false` | Exclude Reference Links. Exclude API links for reference fields. |
| `sysparm_fields` | array | no |  | Fields to Return. Specific fields to include in response (optional) |
| `sysparm_query_no_domain` | boolean | no | `false` | Query No Domain. Include records from all domains. |
| `sysparm_view` | string | no |  | UI View. View context for returned fields. One of `"desktop"`, `"mobile"`, `"both"`. |

### `find_record`

**Find Records.** Searches a ServiceNow table and returns matching records, filtered by a ServiceNow encoded query string (e.g. state=1^priority=1). Use to look up records by criteria rather than a known sys_id, or to retrieve a list to iterate over. Read-only and idempotent. Requires the table and a non-empty encoded query; result count is bounded by the limit. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | yes |  | Table. ServiceNow table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `query` | string | yes |  | Query. Encoded query string (e.g., state=1^priority=1) |
| `limit` | number | no | `100` | Limit. Maximum records to return. |
| `fields` | array | no |  | Fields to Return. Specific fields to include in response (optional) |
| `sysparm_display_value` | string | no | `"false"` | Return Display Values. How to format the response data. One of `"false"`, `"true"`, `"all"`. |
| `sysparm_exclude_reference_link` | boolean | no | `false` | Exclude Reference Links. Exclude API links for reference fields. |
| `sysparm_query_no_domain` | boolean | no | `false` | Query No Domain. Include records from all domains. |
| `sysparm_view` | string | no |  | UI View. View context for returned fields. One of `"desktop"`, `"mobile"`, `"both"`. |

### `delete_record`

**Delete Record.** Permanently deletes a record from any ServiceNow table, identified by its sys_id (chosen from the record dropdown or passed manually). Use to remove a specific known record; this is destructive and cannot be undone. Requires the table and the record sys_id. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | yes |  | Table. ServiceNow table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `record` | string | yes |  | Record. Select a record from the table. A value the product loads from the provider, such as an id; write the value itself. |
| `manual_sys_id` | string | no |  | Or Enter Sys ID Manually. Enter the sys_id directly if not found in dropdown. |

### `add_comment`

**Add Comment or Work Note.** Appends a journal entry to an existing record on any table, choosing between a customer-visible comment and an internal work note via the Type option. Use to post an update or note on a known record (incident, request, problem, change). Not idempotent — each call adds another entry, so re-running duplicates the note. Requires the table, the record sys_id, the entry type, and the text. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | yes |  | Table. ServiceNow table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `record` | string | yes |  | Record. Select a record from the table. A value the product loads from the provider, such as an id; write the value itself. |
| `manual_sys_id` | string | no |  | Or Enter Sys ID Manually. Enter the sys_id directly if not found in dropdown. |
| `comment_type` | string | yes | `"comments"` | Type. Customer-visible comment or internal work note. One of `"comments"`, `"work_notes"`. |
| `comment` | string | yes |  | Comment. The text to append to the record. |

### `resolve_incident`

**Resolve or Close Incident.** Transitions a specific incident to either the Resolved or the Closed state (selectable), writing the close code and resolution notes. Use this specialized action instead of a raw record update when closing out an incident. Idempotent: re-applying the same resolution to the same incident leaves it in the same state. Requires the incident sys_id, the target resolution, a close code, and resolution notes. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `incident_sys_id` | string | yes |  | Incident sys_id. sys_id of the incident to resolve or close. |
| `resolution` | string | yes | `"resolved"` | Resolution. Resolved keeps the record open for closure later; Closed finalizes it. One of `"resolved"`, `"closed"`. |
| `close_code` | string | yes |  | Close Code. Close code (e.g., "Solved (Permanently)", "Solved Remotely", "Not Solved (Not Reproducible)") |
| `close_notes` | string | yes |  | Resolution Notes. Resolution notes shown to the caller. |
| `resolved_by` | string | no |  | Resolved By (User sys_id). Optional sys_id of the user who resolved the incident. Defaults to the authenticated user. |

### `attach_file_to_record`

**Attach File to Record.** Uploads a file and attaches it to a record on any table, identified by its sys_id. The file content comes from either a base64 string or a local file path (provide exactly one). Not idempotent — each call adds a new attachment, so re-running creates duplicates. Requires the table, the record sys_id, a file name, the content type, and the file source. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | yes |  | Table. ServiceNow table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `record` | string | yes |  | Record. Select a record from the table. A value the product loads from the provider, such as an id; write the value itself. |
| `manual_sys_id` | string | no |  | Or Enter Sys ID Manually. Enter the sys_id directly if not found in dropdown. |
| `file_name` | string | yes |  | File Name. Name for the attachment. |
| `content_type` | string | yes |  | Content Type. File content type. One of `"application/pdf"`, `"application/vnd.openxmlformats-officedocument.wordprocessingml.document"`, `"application/msword"`, `"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"`, `"application/vnd.ms-excel"`, `"application/vnd.openxmlformats-officedocument.presentationml.presentation"`, `"application/vnd.ms-powerpoint"`, `"text/plain"`, `"text/csv"`, `"application/json"`, `"application/xml"`, `"application/zip"`, `"image/png"`, `"image/jpeg"`, `"image/gif"`, `"image/svg+xml"`, `"image/bmp"`, `"image/tiff"`, `"*/*"`, `"application/octet-stream"`. |
| `fileBase64` | string | no |  | File Base64. Base64 encoded file content (use this OR file path) |
| `filePath` | string | no |  | File Path. Path to file on local system (use this OR base64) |
| `encryption_context` | string | no |  | Encryption Context. Encryption context sys_id to restrict file access. |

### `find_file`

**Find File.** Reads file attachments, operating in one of two modes set by Action Type: list the attachments on a record (by table and record sys_id, optionally filtered by filename) or download a single attachment's content by its attachment sys_id. Use list mode to discover attachment sys_ids, then download mode to fetch the bytes. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `action_type` | string | yes |  | Action Type. List attachments or download a file. One of `"list"`, `"download"`. |
| `table` | string | yes |  | Table. ServiceNow table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `record` | string | yes |  | Record. Select a record from the table. A value the product loads from the provider, such as an id; write the value itself. |
| `manual_sys_id` | string | no |  | Or Enter Record Sys ID Manually. Record sys_id (for listing attachments) |
| `filename` | string | no |  | Filename Filter. Filter attachments by filename (optional) |
| `attachment_sys_id` | string | no |  | Attachment Sys ID. Attachment sys_id to download. |
| `accept_type` | string | no | `"*/*"` | Accept Type. File type to accept when downloading. One of `"*/*"`, `"image/*"`, `"image/jpeg"`, `"image/png"`, `"image/gif"`, `"image/svg+xml"`, `"application/pdf"`, `"application/vnd.openxmlformats-officedocument.wordprocessingml.document"`, `"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"`, `"text/plain"`, `"application/json"`, `"application/zip"`. |
| `return_format` | string | no | `"base64"` | Return Format. Format for returned file data. One of `"base64"`, `"buffer"`, `"metadata"`. |

### `delete_attachment`

**Delete Attachment.** Permanently deletes a file attachment identified by its attachment sys_id (look it up with Find File in list mode). Use to remove a specific attachment; this is destructive and cannot be undone. Requires the attachment sys_id. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `attachment_sys_id` | string | yes |  | Attachment Sys ID. The sys_id of the attachment to delete (use Find File to look it up) |

### `get_catalog_item`

**Get Catalog Item.** Fetches the full definition of a service catalog item, including its variable schema, identified by its sys_id (select from the catalog dropdown or pass a raw sys_id). Use this before Submit Catalog Request to discover which variables that item expects. Read-only and idempotent. Requires the catalog item sys_id. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item_sys_id` | string | yes |  | Catalog Item. Select a catalog item to order. A value the product loads from the provider, such as an id; write the value itself. |
| `manual_item_sys_id` | string | no |  | Or Enter Catalog Item Sys ID Manually. Provide the catalog item sys_id directly if it is not in the dropdown. |

### `submit_catalog_item`

**Submit Catalog Request.** Places an order for a service catalog item, creating a new catalog request with the given quantity, requested-for user, and item variables. Use to provision or request something from the catalog; call Get Catalog Item first to learn the expected variables. Not idempotent — each call submits another request. Requires the catalog item sys_id (from the dropdown or a raw sys_id). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item_sys_id` | string | yes |  | Catalog Item. Select a catalog item to order. A value the product loads from the provider, such as an id; write the value itself. |
| `manual_item_sys_id` | string | no |  | Or Enter Catalog Item Sys ID Manually. Provide the catalog item sys_id directly if it is not in the dropdown. |
| `quantity` | number | no | `1` | Quantity. How many of this item to order. |
| `requested_for` | string | no |  | Requested For (User Sys ID). sys_id of the user the request is for. Defaults to the authenticated user. |
| `variables` | object | no |  | Variables. Catalog item variables as a JSON object (variable_name → value) |

### `search_knowledge_articles`

**Search Knowledge Articles.** Searches published knowledge base articles by free text, optionally scoped to a specific knowledge base or language; leaving the search text empty browses articles rather than filtering to matches. Use to find relevant KB articles, then Get Knowledge Article for full content. Read-only and idempotent; results are paged via limit and offset. Requires the Knowledge API plugin to be active on the instance. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Text. Free-text search query. |
| `kb` | string | no |  | Knowledge Base sys_id. Optional. Limit search to a specific knowledge base. |
| `language` | string | no |  | Language. Optional ISO language code (e.g., en, de, fr) |
| `limit` | number | no | `20` | Limit. Maximum number of articles to return (1-100) |
| `offset` | number | no | `0` | Offset. Number of articles to skip for pagination. |
| `fields` | array | no |  | Fields. Optional list of article field names to include in the response. |

### `get_knowledge_article`

**Get Knowledge Article.** Fetches the full content of a single knowledge base article by its sys_id; use Search Knowledge Articles first if you only have a KB number. Effectively a read, and idempotent unless the optional Increment View Count flag is enabled, which bumps the article view counter each call. Requires the article sys_id. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `article_sys_id` | string | yes |  | Article Sys ID. sys_id of the article. Use "Search Knowledge Articles" first if you only have a KB number. |
| `update_view` | boolean | no | `false` | Increment View Count. Whether to increment the article view counter when fetching. |

### `send_email`

**Send Email.** Sends an email through the ServiceNow instance to one or more recipients, with subject, body (HTML supported), and optional from/cc/bcc. Use to notify people via the instance mail server. Not idempotent — each call dispatches another email. Requires at least one valid recipient address, a subject, and a body; the instance must have outbound email configured. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | array | yes |  | To. One or more recipient email addresses. |
| `subject` | string | yes |  | Subject. Email subject line. |
| `body` | string | yes |  | Body. Email body. HTML is supported by ServiceNow. |
| `from` | string | no |  | From. Optional sender address. Defaults to the instance email-from setting. |
| `cc` | array | no |  | CC. Optional CC recipients. |
| `bcc` | array | no |  | BCC. Optional BCC recipients. |

### `count_records`

**Count Records.** Returns the count of records in a ServiceNow table via the Aggregate API; an encoded query filters the count, or leaving it empty counts every record in the table. Use when you only need a tally rather than the records themselves. Read-only and idempotent. Requires the table name. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | yes |  | Table. ServiceNow table to work with. A value the product loads from the provider, such as an id; write the value itself. |
| `query` | string | no |  | Query. Optional encoded query to filter records (e.g., active=true^state=1) |

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

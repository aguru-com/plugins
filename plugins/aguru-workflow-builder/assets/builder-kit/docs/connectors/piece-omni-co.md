# Omni

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-omni-co'
  version: '0.2.0'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Omni API Key

>

## Actions

### `createADocument`

**Create a document.** Creates a new Omni document (workbook) under a given model, optionally seeding it with query presentations. Use to programmatically provision a document for analysis or dashboards. Not idempotent: each call creates a separate document even with identical inputs. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `modelId` | string | yes |  | Model ID. Select the model containing the database. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Document Name. The name of the document. |
| `queryPresentations` | array | no |  | Query Presentations. An array of queryPresentation objects, each representing a query in the document's workbook. |

### `createASchedule`

**Create a schedule.** Creates a scheduled delivery for an Omni dashboard, sending output on a cron-defined cadence to one of three destination types (email, webhook, or SFTP) in a chosen format. Use to automate recurring report delivery. The required destination type determines which optional fields apply (e.g. recipients for email, url for webhook). Not idempotent: each call creates a new schedule even with identical inputs. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | yes |  | Dashboard Identifier. The string after /dashboards is the dashboards ID; for example: https://blobsrus.omniapp.co/dashboards/12db1a0a. |
| `name` | string | yes |  | Schedule Name. The name of the schedule/task. |
| `schedule` | string | yes |  | Schedule (Cron Expression). Cron expression for the schedule (e.g., "0 9 ? * * *" for 9 AM UTC daily) https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-scheduled-rule-pattern.html. |
| `timezone` | string | yes |  | Timezone. Timezone for the schedule (e.g., "UTC", "America/New_York") Refer : https://data.iana.org/time-zones/tzdb-2021a/zone1970.tab. |
| `format` | string | yes |  | Format. Output format for the schedule. One of `"link_only"`, `"pdf"`, `"png"`, `"csv"`, `"xlsx"`, `"json"`. |
| `destinationType` | string | yes |  | Destination Type. Type of destination for the schedule. One of `"email"`, `"webhook"`, `"sftp"`. |
| `url` | string | no |  | URL. Webhook URL (required when destinationType is webhook) |
| `recipients` | array | no |  | Recipients. Email recipients (required when destinationType is email) |
| `subject` | string | no |  | Email Subject. Subject line for email delivery. |
| `paperFormat` | string | no |  | Paper Format. Paper format for PDF output. One of `"letter"`, `"a4"`. |
| `paperOrientation` | string | no |  | Paper Orientation. Paper orientation for PDF output. One of `"portrait"`, `"landscape"`. |

### `deleteADocument`

**Delete a document.** Deletes an Omni document by its ID, moving it to the Trash. Use to remove a document the agent has located. Effectively idempotent: once the document is trashed, repeating the call with the same ID has no further effect (subsequent calls may error if the ID no longer resolves). Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document. Select the document. A value the product loads from the provider, such as an id; write the value itself. |

### `deleteASchedule`

**Delete a schedule.** Deletes an Omni dashboard schedule by its UUID. Use to stop a recurring delivery the agent has identified. Effectively idempotent: once removed, repeating the call with the same UUID has no further effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `scheduleId` | string | yes |  | Schedule. Select the schedule. A value the product loads from the provider, such as an id; write the value itself. |

### `editSchedule`

**Edit schedule.** Updates an existing Omni dashboard schedule, identified by its UUID, replacing its cadence, format, and destination settings. Use to modify a recurring delivery the agent has located rather than recreating it. Idempotent: applying the same values to the same schedule yields the same end state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `scheduleId` | string | yes |  | Schedule. Select the schedule. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Schedule Name. The name of the schedule/task. |
| `schedule` | string | yes |  | Schedule (Cron Expression). Cron expression for the schedule (e.g., "0 9 ? * * *" for 9 AM UTC daily) https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-scheduled-rule-pattern.html. |
| `timezone` | string | yes |  | Timezone. Timezone for the schedule (e.g., "UTC", "America/New_York") Refer : https://data.iana.org/time-zones/tzdb-2021a/zone1970.tab. |
| `format` | string | yes |  | Format. Output format for the schedule. One of `"link_only"`, `"pdf"`, `"png"`, `"csv"`, `"xlsx"`, `"json"`. |
| `destinationType` | string | yes |  | Destination Type. Type of destination for the schedule. One of `"email"`, `"webhook"`, `"sftp"`. |
| `url` | string | no |  | URL. Webhook URL (required when destinationType is webhook) |
| `recipients` | array | no |  | Recipients. Email recipients (required when destinationType is email) |
| `subject` | string | no |  | Email Subject. Subject line for email delivery. |
| `paperFormat` | string | no |  | Paper Format. Paper format for PDF output. One of `"letter"`, `"a4"`. |
| `paperOrientation` | string | no |  | Paper Orientation. Paper orientation for PDF output. One of `"portrait"`, `"landscape"`. |

### `generateQuery`

**Generate query.** Generates a structured Omni query object from a natural-language prompt against a given model, optionally guided by a topic, model branch, or a context query, and can emit a more strictly structured format. Use to translate a plain-English analytics request into a runnable query (then pass the result to Run query). Not idempotent: AI generation may return different output across calls for the same prompt. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `modelId` | string | yes |  | Model ID. Select the model containing the database. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Prompt. The natural language description of the query you want to generate (e.g., "Show me all users who signed up in the last month") |
| `currentTopicName` | string | no |  | Current Topic Name. The name of the topic to use as context for the query generation. |
| `branchId` | string | no |  | Branch ID. The ID of the model branch to use for query generation. If not provided, the main branch will be used. |
| `contextQuery` | JSON | no |  | Context Query. The query object to provide as context. This can be used to reference previous queries or provide additional context for the generation. |
| `structured` | boolean | no | `false` | Structured Output. When enabled, the API will return a more strictly structured query format. |

### `moveDocument`

**Move document.** Moves an Omni document to a target folder path, or to the root level when the path is set to "null". Optionally sets the sharing scope (organization or restricted). Use to reorganize where a document lives. Idempotent: moving a document to the same destination repeatedly yields the same placement. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | yes |  | Document. Select the document. A value the product loads from the provider, such as an id; write the value itself. |
| `folderPath` | string | yes |  | Folder Path. The path of the destination folder. Use null to move the document to the root level (no folder) |
| `scope` | string | no |  | Scope. Optional sharing scope for the document. If not provided, the scope will be computed. One of `"organization"`, `"restricted"`. |

### `runQuery`

**Run query.** Executes an Omni query (passed as a JSON query object) and returns the result rows, in base64 Apache Arrow by default or in CSV/JSON/XLSX when a result type is set; can instead return only the execution plan without running. Use to read data from Omni for analysis or downstream steps. Read-only and idempotent: it fetches data and does not mutate state. Requires a valid query JSON object (obtainable from an Omni workbook Inspector panel). Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | JSON | yes |  | Query. A JSON object representing the query to be run. You can retrieve a query's JSON object from an Omni workbook by opening the Inspector panel (Option + 9 on Mac, Alt + 9 on Windows) and copying the Query structure. |
| `limit` | number | no |  | Limit. Number of rows to be returned (defaults to 1000). Set to null for unlimited results. |
| `cache` | string | no |  | Cache Policy. Optional cache policy to control how query caching behaves. One of `"Standard"`, `"SkipRequery"`, `"SkipCache"`. |
| `formatResults` | boolean | no | `true` | Format Results. Apply formatting to numeric and currency values (currency symbols and thousand separators) |
| `resultType` | string | no |  | Result Type. Specifies the format of query results. If omitted, returns base64 encoded Apache Arrow format. One of `"csv"`, `"json"`, `"xlsx"`. |
| `planOnly` | boolean | no | `false` | Plan Only. If enabled, returns the query execution plan without running the query. |
| `userId` | string | no |  | User ID. Optional UUID to run the query as a specific user. |

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

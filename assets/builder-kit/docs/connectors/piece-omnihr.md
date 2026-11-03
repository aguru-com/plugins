# Omni HR

Smart, all-in-one HR platform for managing employees, time tracking, and HR workflows

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-omnihr'
  version: '0.2.1'
```

Categories: HUMAN_RESOURCES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Enter your OmniHR credentials to authenticate:

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Username. Your OmniHR email address. |
| `password` | string | yes |  | Password. Your OmniHR password. |
| `origin` | string | yes |  | Origin. Your OmniHR origin URL. |

## Actions

### `get_employee_system_id`

**Get Employee System ID by Email.** Looks up an OmniHR employee by exact email address and returns their system ID, user ID, full name, and email. Use this first to resolve an email into the system ID required by the other employee actions. At least one employment status must be selected to scope the search, and the match is case-insensitive but exact on the email. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Employee Email. The email address of the employee to look up. |
| `employmentStatuses` | array | yes |  | Employment Statuses. Select one or more status. Values the product loads from the provider, such as ids; write an array of them. |

### `get_employee_info`

**Get Employee Details by System ID.** Fetches the full profile record for a single OmniHR employee identified by their numeric system ID. Use when you already have the employee's system ID (e.g. resolved via the email lookup action) and need their detailed details. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `system_id` | number | yes |  | System ID. The system ID of the employee. |

### `get_employee_organizational_chart`

**Get Employee Organizational Chart.** Builds the organizational context for one OmniHR employee identified by their numeric system ID: the full management chain up to the top (walked by following each manager's snapshot), direct reports, peers, and career journey. Use when you need where someone sits in the org hierarchy rather than just their profile. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `system_id` | number | yes |  | System ID. The system ID of the employee. |

### `get_direct_reports`

**Get Employee Direct Reports.** Lists the OmniHR employees who report directly to a given employee, identified by that employee's numeric ID. Use to find a manager's immediate team; for the broader hierarchy (management chain and peers) use the organizational chart action instead. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `system_id` | number | yes |  | User ID. The user ID of the employee. |

### `generateReport`

**Generate Report.** Generates the data for an existing OmniHR custom report template and returns the rows as an array of objects. The fields present on each row depend on the columns configured in the selected template. For Snapshot report templates, an optional as-of date (DD/MM/YYYY, must not be in the future) can be provided to generate the report using data as of that date; if omitted, the latest data is used. Optionally, row keys can be mapped from field IDs to their human-readable names as defined in the report template; any field that cannot be mapped keeps its ID, and if two fields share the same name only one will appear in the output. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reportTemplateId` | string | yes |  | Report Template. The custom report template to generate a report from. A value the product loads from the provider, such as an id; write the value itself. |
| `snapshotOptions` | object | no |  | Snapshot Options. An object whose fields depend on other inputs; the product shows them. |
| `mapFieldNames` | boolean | no | `false` | Map Field Names. If enabled, row keys are mapped from field IDs to their human-readable names as defined in the report template. Any field that cannot be mapped keeps its ID. Caveat: if two fields share the same name, only one will appear in the output as the other is overwritten. |

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

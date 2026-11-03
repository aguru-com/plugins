# Harvest

Time Tracking Software with Invoicing

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-harvest'
  version: '0.2.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `get_clients`

**Get Clients.** Lists clients from a Harvest account; with no filters it returns every client, or narrow by active/inactive state or updated-since timestamp. Use to resolve a client name to its ID or enumerate clients. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `is_active` | string | no |  | Is Active. Pass `true` to only return active clients and `false` to return inactive clients. |
| `updated_since` | string | no |  | Updated since. Only return clients that have been updated since the given date and time. |
| `page` | string | no |  | Page. DEPRECATED: The page number to use in pagination. |
| `per_page` | string | no |  | Records per page. The number of records to return per page. (1-2000) |

### `get_estimates`

**Get Estimates.** Lists estimates (quotes) from a Harvest account; with all filters empty it returns every estimate, or narrow by issue-date range, state (draft/open/accepted/declined), client ID, or updated-since timestamp. Use to review or look up quote records. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | no |  | From. Only return estimates with an issue_date on or after the given date. (YYYY-MM-DD) |
| `to` | string | no |  | To. Only return estimates with an issue_date on or before the given date. (YYYY-MM-DD) |
| `state` | string | no |  | State. Only return estimates with a state matching the value provided. Options: draft, open, accepted, or declined. |
| `updated_since` | string | no |  | Updated since. Only return estimates that have been updated since the given date and time. |
| `client_id` | string | no |  | Client Id. Only return estimates belonging to the client with the given ID. |
| `page` | string | no |  | Page. The page number to use in pagination. |
| `per_page` | string | no |  | Records per page. The number of records to return per page. (1-2000) |

### `get_expenses`

**Get Expenses.** Lists expense records from a Harvest account; with all filters empty it returns every expense, or narrow by spent-date range, user ID, client ID, project ID, billed/unbilled status, or updated-since timestamp. Use to review expenses or check what has been invoiced. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | no |  | From. Only return expenses with an spent_date on or after the given date. (YYYY-MM-DD) |
| `to` | string | no |  | To. Only return expenses with an spent_date on or before the given date. (YYYY-MM-DD) |
| `user_id` | string | no |  | User Id. Only return expenses belonging to the user with the given ID. |
| `client_id` | string | no |  | Client Id. Only return expenses belonging to the client with the given ID. |
| `project_id` | string | no |  | Project Id. Only return expenses belonging to the project with the given ID. |
| `is_billed` | string | no |  | Is Billed. Pass `true` to only return expenses that have been invoiced and `false` to return expenses that have not been invoiced. |
| `updated_since` | string | no |  | Updated since. Only return expenses that have been updated since the given date and time. |
| `page` | string | no |  | Page. The page number to use in pagination. |
| `per_page` | string | no |  | Records per page. The number of records to return per page. (1-2000) |

### `get_invoices`

**Get Invoices.** Lists invoices from a Harvest account; with all filters empty it returns every invoice, or narrow by issue-date range, state (draft/open/paid/closed), client ID, project ID, or updated-since timestamp. Use to look up billing/invoice records or check payment status. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | no |  | From. Only return invoices with an issue_date on or after the given date. (YYYY-MM-DD) |
| `to` | string | no |  | To. Only return invoices with an issue_date on or before the given date. (YYYY-MM-DD) |
| `state` | string | no |  | State. Only return invoices with a state matching the value provided. Options: draft, open, paid, or closed. |
| `updated_since` | string | no |  | Updated since. Only return invoices that have been updated since the given date and time. |
| `client_id` | string | no |  | Client Id. Only return invoices belonging to the client with the given ID. |
| `project_id` | string | no |  | Project Id. Only return invoices belonging to the project with the given ID. |
| `page` | string | no |  | Page. The page number to use in pagination. |
| `per_page` | string | no |  | Records per page. The number of records to return per page. (1-2000) |

### `get_projects`

**Get Projects.** Lists projects from a Harvest account; with no filters it returns every project, or narrow by active/inactive state, client ID, or updated-since timestamp. Use to discover project IDs or enumerate a client's projects. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `is_active` | string | no |  | Is Active. Pass `true` to only return active projects and `false` to return inactive projects. |
| `updated_since` | string | no |  | Updated since. Only return projects that have been updated since the given date and time. |
| `client_id` | string | no |  | Client Id. Only return invoices belonging to the client with the given ID. |
| `page` | string | no |  | Page. DEPRECATED: The page number to use in pagination. |
| `per_page` | string | no |  | Records per page. The number of records to return per page. (1-2000) |

### `get_roles`

**Get Roles.** Lists all roles defined in a Harvest account, each with its assigned user IDs. Use to discover role IDs or see which users belong to a role. Takes only pagination options. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | no |  | Page. DEPRECATED: The page number to use in pagination. |
| `per_page` | string | no |  | Records per page. The number of records to return per page. (1-2000) |

### `get_tasks`

**Get Tasks.** Lists the task types defined in a Harvest account (the work categories assignable to projects, not project-specific assignments); with no filters it returns all tasks, or narrow by active/inactive state or updated-since timestamp. Use to discover task IDs. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `is_active` | string | no |  | Is Active. Pass `true` to only return active tasks and `false` to return inactive tasks. |
| `updated_since` | string | no |  | Updated since. Only return tasks that have been updated since the given date and time. |
| `page` | string | no |  | Page. DEPRECATED: The page number to use in pagination. |
| `per_page` | string | no |  | Records per page. The number of records to return per page. (1-2000) |

### `get_time_entries`

**Get Time Entries.** Lists tracked time entries from a Harvest account; with all filters empty it returns every entry, or narrow by spent-date range, user/client/project/task ID, external reference ID, billed status, currently-running status, or updated-since timestamp. Use to pull timesheet data or find a running timer. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | no |  | From. Only return time entries with an spent_date on or after the given date. (YYYY-MM-DD) |
| `to` | string | no |  | To. Only return time entries with an spent_date on or before the given date. (YYYY-MM-DD) |
| `user_id` | string | no |  | User Id. Only return time entries belonging to the user with the given ID. |
| `client_id` | string | no |  | Client Id. Only return time entries belonging to the client with the given ID. |
| `project_id` | string | no |  | Project Id. Only return time entries belonging to the project with the given ID. |
| `task_id` | string | no |  | Task Id. Only return time entries belonging to the task with the given ID. |
| `external_reference_id` | string | no |  | External Reference Id. Only return time entries with the given external reference ID. |
| `is_billed` | string | no |  | Is Billed. Pass `true` to only return time entries that have been invoiced and `false` to return time entries that have not been invoiced. |
| `is_running` | string | no |  | Is Running. Pass `true` to only return running time entries and `false` to return non-running time entries. |
| `updated_since` | string | no |  | Updated since. Only return time entries that have been updated since the given date and time. |
| `page` | string | no |  | Page. The page number to use in pagination. |
| `per_page` | string | no |  | Records per page. The number of records to return per page. (1-2000) |

### `get_users`

**Get Users.** Lists users (team members) in a Harvest account; with no filters it returns every user, or narrow by active/inactive state or updated-since timestamp. Use to resolve a person to their user ID or enumerate the team. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `is_active` | string | no |  | Is Active. Pass `true` to only return active users and `false` to return inactive users. |
| `updated_since` | string | no |  | Updated since. Only return users that have been updated since the given date and time. |
| `page` | string | no |  | Page. DEPRECATED: The page number to use in pagination. |
| `per_page` | string | no |  | Records per page. The number of records to return per page. (1-2000) |

### `reports-uninvoiced`

**Uninvoiced Report.** Returns a report of uninvoiced hours and expenses across all billable projects in a Harvest account for a given date range; optionally include fixed-fee projects. Use to find work that has not yet been billed. Requires both From and To dates (YYYY-MM-DD). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From. Only report on time entries and expenses with a spent_date on or after the given date. (YYYY-MM-DD) |
| `to` | string | yes |  | To. Only report on time entries and expenses with a spent_date on or before the given date. (YYYY-MM-DD) |
| `include_fixed_fee` | string | no |  | Include Fixed Fee. Whether or not to include fixed-fee projects in the response. (Default: true) |
| `page` | string | no |  | Page. The page number to use in pagination. |
| `per_page` | string | no |  | Records per page. The number of records to return per page. (1-2000) |

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

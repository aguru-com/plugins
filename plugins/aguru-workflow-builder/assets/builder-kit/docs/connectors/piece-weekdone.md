# Weekdone

OKR & weekly status reporting tool for teams.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-weekdone'
  version: '0.1.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `create_item`

**Create New Item.** Adds a new report item (a plan, progress note, problem, or plan-on-hold entry) to a Weekdone weekly report. Use to log status update entries for a user/team; the item text and report category are required, and it targets the current week unless a YYYYWW week is supplied. Not idempotent — each call appends a new item. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `description` | string | yes |  | Description. The text content of the report item. |
| `type_id` | string | yes | `2` | Report Category. The category this item belongs to in your weekly report. Custom category IDs (4 and above) are available via the Custom API Call action. One of `2`, `1`, `3`, `0`. |
| `period` | string | no |  | Week. The report week to add this item to, in YYYYWW format (e.g. "202403" for week 3 of 2024). Leave empty to use the current week. |
| `user_id` | string | no |  | Assign To. The user to assign this item to. Leave empty to assign it to yourself. A value the product loads from the provider, such as an id; write the value itself. |
| `team_id` | string | no |  | Team. The team to add this item to. Leave empty to use your primary team. A value the product loads from the provider, such as an id; write the value itself. |
| `priority` | string | no | `0` | Priority. The priority level for this item. One of `0`, `1`, `2`, `3`. |
| `due_on` | string | no |  | Due Date. The due date for this item in YYYY-MM-DD format (e.g. "2024-03-15"). Leave empty for no due date. |
| `is_private` | boolean | no | `false` | Private. If enabled, only you can see this item. If disabled (default), the item is visible to your team. |
| `source_id` | string | no |  | External Source ID. The ID of this item in an external system (e.g. a JIRA ticket number or Asana task ID). Maximum 50 characters. |

### `update_item`

**Update Item.** Updates an existing Weekdone report item identified by its item ID, changing fields such as description, report category, priority, or due date. Use when modifying an item the agent already knows the ID of; only supplied fields change, and moving the item to a different category also requires a target week. Idempotent — re-sending the same field values leaves the item in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_period` | string | no |  | Search Week. Filter the item list by week in YYYYWW format (e.g. "202403" for week 3 of 2024). Leave empty to search the current week. |
| `item_id` | string | yes |  | Item. The report item to update. Change "Search Week" above to find items from other weeks. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. The new text content for the item. Leave empty to keep the current value. |
| `type_id` | string | no |  | Report Category. Move this item to a different report category. If you change this, you must also fill in "Target Week" below. One of `2`, `1`, `3`, `0`. |
| `move_to_period` | string | no |  | Target Week. Required when changing the Report Category. The week to move the item into, in YYYYWW format (e.g. "202403"). |
| `priority` | string | no |  | Priority. The new priority level for this item. Leave empty to keep the current value. One of `0`, `1`, `2`, `3`. |
| `due_on` | string | no |  | Due Date. The new due date in YYYY-MM-DD format (e.g. "2024-03-15"). Leave empty to keep the current value. |

### `create_objective`

**Create New Objective.** Creates a new OKR objective in Weekdone at a chosen level — company, department, team, or personal (user) — which determines the required scoping field (a department ID, team, or team+user). Use to set up a new goal; the objective text and level are required and it targets the current quarter unless a YYYYQ period is supplied. Not idempotent — each call creates a new objective. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `description` | string | yes |  | Description. The text of the objective (e.g. "Grow revenue by 20% this quarter"). |
| `type` | string | yes | `"company"` | Objective Level. The level this objective applies to. Company objectives apply to the whole organisation; Department, Team, and Personal are scoped to a specific group or individual. One of `"company"`, `"department"`, `"team"`, `"user"`. |
| `level_details` | object | yes |  | Level Details. Additional fields required for the selected objective level. An object whose fields depend on other inputs; the product shows them. |
| `period` | string | no |  | Quarter. The quarter this objective belongs to in YYYYQ format (e.g. "2024Q1" for Q1 2024, "2024Q3" for Q3 2024). Leave empty to use the current quarter. |

### `update_objective`

**Update Objective.** Updates the description text of an existing Weekdone OKR objective identified by its objective ID. Use to rename or reword a known objective; the objective ID and new description are required (level/quarter filters only help locate the objective and are not changed). Idempotent — re-sending the same description leaves the objective in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_type` | string | no | `"company"` | Filter by Level. Narrow the objective list by level to make it easier to find the one you want. One of `"company"`, `"department"`, `"team"`, `"user"`. |
| `search_period` | string | no |  | Filter by Quarter. Narrow the objective list by quarter in YYYYQ format (e.g. "2024Q1"). Leave empty to show objectives from all periods. |
| `objective_id` | string | yes |  | Objective. The objective to update. Use "Filter by Level" and "Filter by Quarter" above to narrow the list. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | yes |  | Description. The new text for the objective. |

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

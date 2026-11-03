# Teamhood

Visual project management for boards, tasks, and timelogs in Teamhood.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-teamhood'
  version: '0.1.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect your Teamhood account to use this piece.
>
> **How to get your credentials:**
> 1. Log in to your Teamhood account at https://app.teamhood.com.
> 2. Open **Settings → Integrations → Teamhood API**.
> 3. Copy your  API key.
> 4. Your **API URL** is shown on the same page. It looks like `https://api-YOURTENANT.teamhood.com` — replace `YOURTENANT` with the subdomain from the URL you use to log in.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseUrl` | string | yes |  | API URL. Your tenant-specific Teamhood API URL (e.g. https://api-YOURTENANT.teamhood.com). |
| `apiKey` | string | yes |  | API Key. Teamhood API key generated from Settings → Integrations → Teamhood API in Teamhood. |

## Actions

### `create_item`

**Create Item.** Creates a new task item on a Teamhood board, requiring a workspace, board, and title; optionally set assignee, owner, status, row/swimlane, dates, estimation, budget, progress, tags, and milestone/completed flags. Use to add work into Teamhood. Not idempotent — each call creates a separate item. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace. Select a Teamhood workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `boardId` | string | yes |  | Board. Select a board in the chosen workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. The title of the item. |
| `description` | string | no |  | Description. Optional description for the item. Plain text or HTML. |
| `rowId` | string | no |  | Row. Select a swimlane row on the selected board. Rows group items horizontally on a Kanban board. A value the product loads from the provider, such as an id; write the value itself. |
| `statusId` | string | no |  | Status. The status column on the board (e.g. To Do, In Progress, Done). A value the product loads from the provider, such as an id; write the value itself. |
| `assignedUserId` | string | no |  | Assignee. The user this item is assigned to. A value the product loads from the provider, such as an id; write the value itself. |
| `ownerId` | string | no |  | Owner. The user who owns this item. A value the product loads from the provider, such as an id; write the value itself. |
| `startDate` | ISO date-time string | no |  | Start Date. When work on this item should start. |
| `dueDate` | ISO date-time string | no |  | Due Date. When this item is due. |
| `estimation` | number | no |  | Estimation (hours). Estimated effort to complete the item, in hours. |
| `budget` | number | no |  | Budget. Budget allocated for this item. |
| `progress` | number | no |  | Progress (%). Percentage of work completed, between 0 and 100. Leave empty to track progress automatically. |
| `milestone` | boolean | no | `false` | Is Milestone. Mark this item as a milestone. |
| `completed` | boolean | no | `false` | Mark as Completed. Create the item as already completed. |
| `tags` | array | no |  | Tags. List of tag names to attach to the item. |

### `update_item`

**Update Item.** Updates an existing Teamhood item identified by its item ID; only the fields you supply are changed (title, description, status, row, assignee, dates, estimation, budget, progress, tags, and completed/archived/milestone flags). Use to edit a known item. Note tags REPLACE the existing tag set rather than appending. Idempotent — re-applying the same values to the same item yields the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace. Select a Teamhood workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `boardId` | string | no |  | Board. Select a board in the chosen workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `itemId` | string | yes |  | Item. The Teamhood item (task) to operate on. Select a workspace to load items. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. New title for the item. Leave empty to keep current title. |
| `description` | string | no |  | Description. New description for the item. Leave empty to keep current description. |
| `rowId` | string | no |  | Row. Select a swimlane row on the selected board. Rows group items horizontally on a Kanban board. A value the product loads from the provider, such as an id; write the value itself. |
| `statusId` | string | no |  | Status. The status column on the board (e.g. To Do, In Progress, Done). A value the product loads from the provider, such as an id; write the value itself. |
| `assignedUserId` | string | no |  | Assignee. New assignee for the item. Leave empty to keep current assignee. A value the product loads from the provider, such as an id; write the value itself. |
| `startDate` | ISO date-time string | no |  | Start Date. |
| `dueDate` | ISO date-time string | no |  | Due Date. |
| `estimation` | number | no |  | Estimation (hours). |
| `budget` | number | no |  | Budget. |
| `progress` | number | no |  | Progress (%). Between 0 and 100. |
| `completed` | boolean | no |  | Completed. Mark the item as completed or not. |
| `archived` | boolean | no |  | Archived. Archive or unarchive the item. |
| `milestone` | boolean | no |  | Is Milestone. |
| `tags` | array | no |  | Tags. List of tag names. This REPLACES the current tags on the item. |

### `get_item`

**Get Item.** Fetches a single Teamhood item by its item ID. Use to read the full details of a known item before acting on it. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace. Select a Teamhood workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `boardId` | string | no |  | Board. Select a board in the chosen workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `itemId` | string | yes |  | Item. The Teamhood item (task) to operate on. Select a workspace to load items. A value the product loads from the provider, such as an id; write the value itself. |

### `delete_item`

**Delete Item.** Permanently deletes a Teamhood item by its item ID. Use to remove a task that should no longer exist. Destructive and irreversible; idempotent in that repeating the call leaves the item gone with no additional effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace. Select a Teamhood workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `boardId` | string | no |  | Board. Select a board in the chosen workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `itemId` | string | yes |  | Item. The Teamhood item (task) to operate on. Select a workspace to load items. A value the product loads from the provider, such as an id; write the value itself. |

### `find_items`

**Find Items.** Searches Teamhood items, optionally narrowed by workspace, board, row, status, assignee, owner, completion state, and created/modified/completed-since timestamps; with all filters left empty it returns items broadly. Use to look up or enumerate items matching criteria, or to resolve an item ID before another action. Supports take/skip pagination (defaults to 100). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | no |  | Workspace. Select a Teamhood workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `boardId` | string | no |  | Board. Select a board in the chosen workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `rowId` | string | no |  | Row. Select a swimlane row on the selected board. Rows group items horizontally on a Kanban board. A value the product loads from the provider, such as an id; write the value itself. |
| `statusId` | string | no |  | Status. The status column on the board (e.g. To Do, In Progress, Done). A value the product loads from the provider, such as an id; write the value itself. |
| `assignedUserId` | string | no |  | Assignee. Only return items assigned to this user. A value the product loads from the provider, such as an id; write the value itself. |
| `ownerId` | string | no |  | Owner. Only return items owned by this user. A value the product loads from the provider, such as an id; write the value itself. |
| `completed` | string | no |  | Completion Status. Filter by completion. Leave empty to return both. One of `"true"`, `"false"`. |
| `createdSince` | ISO date-time string | no |  | Created Since. Only return items created after this UTC date/time. |
| `modifiedSince` | ISO date-time string | no |  | Modified Since. Only return items modified after this UTC date/time. |
| `completedSince` | ISO date-time string | no |  | Completed Since. Only return items completed after this UTC date/time. |
| `includeChildItems` | boolean | no | `false` | Include Sub-items. Include child items (sub-tasks) in the results. |
| `take` | number | no | `100` | Max Results. Maximum number of items to return. Defaults to 100. |
| `skip` | number | no | `0` | Skip. Number of items to skip — useful for pagination. |

### `create_row`

**Create Board Row.** Creates a new horizontal swimlane row on a Teamhood board, requiring a workspace, board, and row title; optional start/end dates position it on the timeline view. Use to add a grouping lane that items can be placed into. Not idempotent — each call creates a separate row. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspaceId` | string | yes |  | Workspace. Select a Teamhood workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `boardId` | string | yes |  | Board. Select a board in the chosen workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Row Title. The title for the new swimlane row. |
| `startDate` | ISO date-time string | no |  | Start Date. Optional start date for the row (timeline view). |
| `endDate` | ISO date-time string | no |  | End Date. Optional end date for the row (timeline view). |

### `list_users`

**List Users.** Lists all users in the connected Teamhood account. Use to discover available users or resolve a user ID for assigning an item or filtering a search. Takes no input; read-only and idempotent. Needs authentication.

Kind: safe to repeat.

No inputs.

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

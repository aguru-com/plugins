# Azure DevOps

Track work, code, and ship software with Azure Boards, Repos, and Pipelines.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-azure-devops'
  version: '0.1.2'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To get your Personal Access Token (PAT):
>
> 1. Go to **Azure DevOps** and click your profile icon (top-right)
> 2. Select **Personal access tokens**
> 3. Click **+ New Token**
> 4. Give it a name and set expiration
> 5. Under **Scopes**, select:
> - **Work Items**: Read & Write
> - **Project and Team**: Read
> 6. Click **Create** and copy the token (you won't see it again)
>
> **Organization URL** is your Azure DevOps URL, e.g. `https://dev.azure.com/mycompany`

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organizationUrl` | string | yes |  | Organization URL. Your Azure DevOps organization URL (e.g. https://dev.azure.com/mycompany) |
| `pat` | string | yes |  | Personal Access Token. Your Azure DevOps PAT with Work Items (Read & Write) and Project and Team (Read) scopes. |

## Actions

### `create_work_item`

**Create Work Item.** Creates a new work item of the chosen type (Bug, Task, User Story, etc.) in an Azure DevOps project, optionally setting description, assignee, and priority. Use to file a new tracked item. Requires a project and work item type; not idempotent, as each call creates a separate item with a new ID. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. Select the Azure DevOps project. A value the product loads from the provider, such as an id; write the value itself. |
| `work_item_type` | string | yes |  | Work Item Type. Select the type of work item (e.g. Bug, Task, User Story) A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. The title of the work item. |
| `description` | string | no |  | Description. Detailed description of the work item (supports HTML) |
| `assigned_to` | string | no |  | Assigned To. Select the person to assign this work item to. Only project team members are listed — use the Custom API Call action if you need to assign a user outside your teams. A value the product loads from the provider, such as an id; write the value itself. |
| `priority` | string | no |  | Priority. The priority of the work item. One of `"1"`, `"2"`, `"3"`, `"4"`. |

### `get_work_item`

**Get Work Item.** Fetches a single Azure DevOps work item by its numeric ID, returning its fields (title, state, assignee, etc.). Use to look up details of a known work item; requires the project and the numeric work item ID, not a title. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. Select the Azure DevOps project. A value the product loads from the provider, such as an id; write the value itself. |
| `work_item_id` | number | yes |  | Work Item ID. Numeric ID of the work item (e.g. 123). To pass it dynamically, reference the ID from a previous step (e.g. `{{trigger.id}}`), not the title. |

### `update_work_item`

**Update Work Item.** Updates fields (title, description, state, assignee, priority) on an existing Azure DevOps work item identified by its numeric ID; only the fields you provide are changed. Use to modify a known work item rather than to look it up or create one. Requires the project and numeric work item ID; the work item type prop only loads the matching state list and does not change the item type. Idempotent, since it replaces fields to a fixed target value keyed on a stable ID. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. Select the Azure DevOps project. A value the product loads from the provider, such as an id; write the value itself. |
| `work_item_type` | string | yes |  | Work Item Type. Type of the work item. Used only to load the matching list of states below — it does not change the work item's type. Changing type requires a separate Azure DevOps operation not supported here. A value the product loads from the provider, such as an id; write the value itself. |
| `work_item_id` | number | yes |  | Work Item ID. Numeric ID of the work item (e.g. 123). To pass it dynamically from a previous step, use a reference like `{{trigger.id}}` or the output of a Get/List step — not the title. |
| `title` | string | no |  | Title. New title for the work item. |
| `description` | string | no |  | Description. New description for the work item (supports HTML) |
| `state` | string | no |  | State. New state for the work item. Leave empty to keep the current state. A value the product loads from the provider, such as an id; write the value itself. |
| `assigned_to` | string | no |  | Assigned To. Select the person to assign this work item to. Only project team members are listed — use the Custom API Call action if you need to assign a user outside your teams. A value the product loads from the provider, such as an id; write the value itself. |
| `priority` | string | no |  | Priority. The priority of the work item. One of `"1"`, `"2"`, `"3"`, `"4"`. |

### `list_work_items`

**List Work Items.** Queries work items in an Azure DevOps project and returns their fields. Leave the WIQL query empty to list all work items ordered by most recently changed, or supply a custom WIQL query to filter (by type, state, assignee, etc.). Use to search or enumerate work items; requires a project, and results are capped by the limit (default 50, max 200). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. Select the Azure DevOps project. A value the product loads from the provider, such as an id; write the value itself. |
| `wiql_query` | string | no |  | WIQL Query. The WIQL query to execute. Default: SELECT [System.Id] FROM WorkItems WHERE [System.TeamProject] = @project ORDER BY [System.ChangedDate] DESC. |
| `limit` | number | no | `50` | Limit. Maximum number of work items to return (default: 50, max: 200) |

### `add_comment`

**Add Comment.** Posts a new comment (HTML supported) on an existing Azure DevOps work item identified by its numeric ID. Use to add a note or update to a known work item. Requires the project, numeric work item ID, and comment text; not idempotent, as each call appends a separate comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. Select the Azure DevOps project. A value the product loads from the provider, such as an id; write the value itself. |
| `work_item_id` | number | yes |  | Work Item ID. Numeric ID of the work item (e.g. 123). To pass it dynamically, reference the ID from a previous step (e.g. `{{trigger.id}}`), not the title. |
| `comment` | string | yes |  | Comment. The comment text to add (supports HTML) |

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

# Retable

Turn your spreadsheets into smart database apps

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-retable'
  version: '0.2.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your API key, follow these steps:
>
> 1. Go to Account Overview by clicking your profile-pic (top-right).
> 2. Go to API section and enable API key.
> 3. Copy API key.

## Actions

### `retable_create_record`

**Create Retable Record.** Appends a new row to a Retable table, mapping the supplied column values into a single record. Use to write data into a specific retable; requires the workspace, project, and retable identifiers plus the field values (empty cell values are skipped). Not idempotent — each call inserts another record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `project_id` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |
| `retable_id` | string | yes |  | Retable. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

### `retable_get_workspaces`

**Get Workspaces.** Lists all Retable workspaces accessible with the connected API key. Use as the entry point to discover workspace IDs needed by project, retable, and record actions. Takes no input; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `retable_get_projects`

**Get Projects.** Lists all projects within a given Retable workspace. Use to discover project IDs after selecting a workspace, before fetching retables or records. Requires the workspace ID; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |

### `retable_get_retables`

**Get Retables.** Lists all retables (tables) within a given Retable project. Use to discover retable IDs needed before reading or writing records. Requires the project ID; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `project_id` | string | yes |  | Project. A value the product loads from the provider, such as an id; write the value itself. |

### `retable_create_workspace`

**Create a Workspace.** Creates a new top-level Retable workspace with the given name and optional description. Use when an agent needs a fresh workspace to organize projects under. Not idempotent — each call creates another workspace, even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Workspace Name. |
| `desc` | string | no |  | Workspace Description. |

### `retable_create_project`

**Create a Project.** Creates a new project inside an existing Retable workspace, with a name and optional description and color. Use to set up a project container for retables; requires the target workspace ID. Not idempotent — each call creates another project. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Project Name. |
| `desc` | string | no |  | Project Description. |
| `color` | string | no |  | Project Color. |

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

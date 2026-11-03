# Activepieces Platform

Open source no-code business automation

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-activepieces'
  version: '0.5.2'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Activepieces Platform API is available under the Platform Edition.
> (https://www.activepieces.com/docs/admin-console/overview)
>
> **Note**: The API Key is available in the Platform Dashboard.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseApiUrl` | string | yes | `"https://cloud.activepieces.com/api/v1"` | Base URL. |
| `apiKey` | string | yes |  | API Key. |

## Actions

### `create_project`

**Create Project.** Create a new project on an Activepieces platform (requires a platform-edition API key). Use when provisioning a fresh project workspace; the only input is its display name. Not idempotent — each call creates a separate project even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `display_name` | string | yes |  | Display Name. |

### `update_project`

**Update Project.** Update an existing project on an Activepieces platform, identified by its project id, setting its display name, notification status, and team-member limit. Use when reconfiguring a known project rather than creating one. Requires the target project id; idempotent — repeating with the same values leaves the project in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Id. Id of the project. |
| `display_name` | string | yes |  | Display Name. |
| `notify_status` | string | yes |  | Notify Status. One of `"ALWAYS"`, `"NEVER"`. |
| `team_members` | number | yes |  | Team Members. |

### `list_project`

**List Projects.** List all projects accessible to the authenticated Activepieces platform API key. Use to discover existing projects or resolve a project id before updating one. Takes no input; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

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

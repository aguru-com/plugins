# Manus

AI-powered automation and task execution platform

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-manus'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Manus API key from https://app.manus.ai/settings/api-keys

## Actions

### `create_task`

**Create Task.** Submits a prompt to the Manus AI agent to run as a task, optionally with an agent profile, interaction mode (chat/adaptive/agent), connectors, and attachments. Use to kick off new agent work, or pass an existing task ID to continue that task as a multi-turn conversation. Not idempotent: each call without a task ID creates a new task. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. The task prompt or instruction for the Manus agent. |
| `agentProfile` | string | yes | `"manus-1.5"` | Agent Profile. The AI model profile to use for the task. One of `"manus-1.5"`, `"manus-1.5-lite"`, `"speed"`, `"quality"`. |
| `taskMode` | string | no |  | Task Mode. The interaction mode for the task. One of `"chat"`, `"adaptive"`, `"agent"`. |
| `connectors` | array | no |  | Connectors. List of connector IDs to enable for this task. |
| `hideInTaskList` | boolean | no | `false` | Hide in Task List. Whether to hide this task from the Manus webapp task list. |
| `createShareableLink` | boolean | no | `false` | Create Shareable Link. Whether to make the chat publicly accessible to others on the Manus website. |
| `taskId` | string | no |  | Task ID. For continuing existing tasks (multi-turn conversations) |
| `locale` | string | no |  | Locale. Your default locale that you've set on Manus (e.g., "en-US", "zh-CN") |
| `attachments` | array | no |  | Attachments. Array of file/image attachments (URLs or base64 data) |

### `get_task`

**Get Task.** Fetches the full details and current status of a single Manus task by its ID. Use to check progress or read back the result of a task you created or know the ID of. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task. Select the task to retrieve details for. A value the product loads from the provider, such as an id; write the value itself. |

### `update_task`

**Update Task.** Updates metadata on an existing Manus task identified by its ID — its title, public-sharing toggle, and visibility in the task list. Use to rename a task or change its sharing/visibility, not to alter what the agent does. Idempotent: re-applying the same values leaves the task in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task. Select the task to update. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. New title for the task. |
| `enableShared` | boolean | no | `false` | Enable Sharing. Whether to enable public sharing. |
| `enableVisibleInTaskList` | boolean | no | `true` | Visible in Task List. Whether the task should be visible in the task list. |

### `delete_task`

**Delete Task.** Permanently deletes a Manus task by its ID; this cannot be undone. Use to remove a task entirely. Not idempotent: a repeat call targets an already-deleted task and will fail. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task. Select the task to delete. A value the product loads from the provider, such as an id; write the value itself. |

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

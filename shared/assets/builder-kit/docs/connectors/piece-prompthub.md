# PromptHub

Integrate with PromptHub projects, retrieve heads, and run prompts.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-prompthub'
  version: '0.2.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> PromptHub API token

## Actions

### `list_projects`

**List Projects.** List the prompt projects belonging to a PromptHub team, each with its head revision and group assignments. Use this to discover available projects and their IDs before reading a head or running a prompt; optional group/model/provider filters narrow the results. Read-only and idempotent. Requires the numeric team ID. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | number | yes |  | Team ID. The ID of the team. Can be found in your browser's URL bar when viewing Team Settings, or use current_team_id from /me endpoint. |
| `group` | string | no |  | Group Name. Filter projects from a specific group. Must be URL-encoded if the group name contains spaces. |
| `model` | string | no |  | Model. Filter projects where the head uses a specific model (e.g., gpt-4, claude-2, etc.). |
| `provider` | string | no |  | Provider. Filter projects where the head uses a specific model provider. One of `"OpenAI"`, `"Anthropic"`, `"Azure"`, `"Google"`, `"Amazon"`. |

Output fields:

- `[].id`: Project ID (number)
- `[].name`: Project Name
- `[].description`: Description
- `[].head`: Head
- `[].head.provider`: Provider
- `[].head.model`: Model
- `[].head.prompt`: Prompt
- `[].head.system_message`: System Message
- `[].head.formatted_request`: Formatted Request
- `[].head.formatted_request.model`: Model
- `[].head.formatted_request.messages`: Messages
- `[].head.formatted_request.messages[].role`: Role
- `[].head.formatted_request.messages[].content`: Content
- `[].head.formatted_request.max_tokens`: Max Tokens (number)
- `[].head.formatted_request.temperature`: Temperature (number)
- `[].head.formatted_request.top_p`: Top P (number)
- `[].head.formatted_request.response_format`: Response Format
- `[].head.formatted_request.response_format.type`: Type
- `[].head.hash`: Hash
- `[].head.commit_title`: Commit Title
- `[].head.commit_description`: Commit Description
- `[].head.variables`: Variables
- `[].head.variables.system_message`: System Message Variables
- `[].head.variables.prompt`: Prompt Variables
- `[].head.branch`: Branch
- `[].head.branch.id`: Branch ID (number)
- `[].head.branch.name`: Branch Name
- `[].head.branch.protected`: Protected (boolean)
- `[].head.configuration`: Configuration
- `[].head.configuration.max_tokens`: Max Tokens (number)
- `[].head.configuration.temperature`: Temperature (number)
- `[].head.configuration.top_p`: Top P (number)
- `[].head.configuration.top_k`: Top K (number)
- `[].head.configuration.presence_penalty`: Presence Penalty (number)
- `[].head.configuration.frequency_penalty`: Frequency Penalty (number)
- `[].head.configuration.response_format`: Response Format
- `[].head.configuration.reasoning_effort`: Reasoning Effort
- `[].head.configuration.extended_thinking`: Extended Thinking (boolean)
- `[].groups`: Groups

### `get_project_head`

**Get Project Head.** Fetch the head (production-ready) revision of a PromptHub project, returning its prompt text, system message, model/provider configuration, and variables. Use this to read a project's current prompt without executing it; an optional branch targets a non-default branch and supplied variables can be interpolated into the returned request. Read-only and idempotent. Requires the numeric project ID. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | number | yes |  | Project ID. The ID of the project. Can be found in your browser's URL bar when viewing that project. |
| `branch` | string | no |  | Branch. Use the head of a specific branch. Defaults to your project's master/main branch. Must be URL-encoded if the branch name contains spaces or special characters. |
| `fallback` | boolean | no |  | Use Fallback. When enabled, any placeholders not provided in variables will fall back to your Project/Team defaults. Your variable overrides always take precedence. |
| `variables` | object | no |  | Variables. Key-value pairs to override placeholders in the prompt. Both keys and values will be URL-encoded automatically. |

Output fields:

- `id`: Head ID (number)
- `provider`: Provider
- `model`: Model
- `prompt`: Prompt
- `system_message`: System Message
- `formatted_request`: Formatted Request
- `formatted_request.model`: Model
- `formatted_request.messages`: Messages
- `formatted_request.messages[].role`: Role
- `formatted_request.messages[].content`: Content
- `formatted_request.max_tokens`: Max Tokens (number)
- `formatted_request.temperature`: Temperature (number)
- `formatted_request.top_p`: Top P (number)
- `formatted_request.response_format`: Response Format
- `formatted_request.response_format.type`: Type
- `hash`: Hash
- `commit_title`: Commit Title
- `commit_description`: Commit Description
- `variables`: Variables
- `variables.system_message`: System Message Variables
- `variables.prompt`: Prompt Variables
- `branch`: Branch
- `branch.id`: Branch ID (number)
- `branch.name`: Branch Name
- `branch.protected`: Protected (boolean)
- `configuration`: Configuration
- `configuration.max_tokens`: Max Tokens (number)
- `configuration.temperature`: Temperature (number)
- `configuration.top_p`: Top P (number)
- `configuration.top_k`: Top K (number)
- `configuration.presence_penalty`: Presence Penalty (number)
- `configuration.frequency_penalty`: Frequency Penalty (number)
- `configuration.response_format`: Response Format
- `configuration.reasoning_effort`: Reasoning Effort
- `configuration.extended_thinking`: Extended Thinking (boolean)
- `project`: Project
- `project.id`: Project ID (number)
- `project.type`: Type
- `project.name`: Project Name
- `project.description`: Description

### `run_prompt`

**Run Prompt.** Execute a PromptHub project against its configured LLM and return the model completion. Use this to actually run a managed prompt rather than just read it; you can pin a specific version via branch or hash, supply variables for interpolation, and pass chat messages or an override prompt for the request. Not idempotent — each call invokes the model and incurs a new generation. Requires the numeric project ID. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | number | yes |  | Project ID. The ID of the project to run. |
| `branch` | string | no |  | Branch. The branch name to run from (defaults to main/master). |
| `hash` | string | no |  | Hash. Specific commit hash to run from. |
| `variables` | object | no |  | Variables. Key-value pairs to pass as variables to the prompt. |
| `messages` | array | no |  | Messages. Chat messages for chat-based projects. Each item: { `role`, `content` }. |
| `prompt` | string | no |  | Prompt. Override prompt text for the project. |
| `metadata` | object | no |  | Metadata. Additional metadata to include with the run. |
| `timeoutSeconds` | number | no |  | Timeout Seconds. Request timeout in seconds (max 600). |

Output fields:

- `id`: Run ID (number)
- `transaction_id`: Transaction ID (number)
- `provider`: Provider
- `model`: Model
- `text`: Response Text
- `finish_reason`: Finish Reason
- `prompt_tokens`: Prompt Tokens (number)
- `completion_tokens`: Completion Tokens (number)
- `total_tokens`: Total Tokens (number)
- `cost`: Cost (currency)
- `latency`: Latency (ms) (duration)
- `total_time`: Total Time (ms) (duration)
- `project`: Project
- `project.id`: Project ID (number)
- `project.type`: Type
- `project.name`: Project Name
- `project.description`: Description

### `get_current_account`

**Get Current Account.** Get the PromptHub account authenticated by the current API token, including its current team context. Use this first when you do not already have a team ID: it yields the `current_team_id` that List Team Projects requires, making it the head of the resolution chain (account -> team -> projects -> head/run). Read-only. Needs authentication.

Kind: safe to repeat.

No inputs.

Output fields:

- `id`: Account ID (number)
- `name`: Name
- `email`: Email (email)
- `avatar`: Avatar (image)
- `current_team_id`: Current Team ID (number)
- `current_project_id`: Current Project ID (number)
- `current_prompt_id`: Current Prompt ID (number)
- `created_at`: Created At (datetime)
- `current_team`: Current Team
- `current_team.id`: Team ID (number)
- `current_team.user_id`: Owner User ID (number)
- `current_team.name`: Team Name

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

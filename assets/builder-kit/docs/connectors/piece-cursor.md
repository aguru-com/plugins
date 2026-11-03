# Cursor

AI-powered code editor with cloud agents that can work on your repositories. Launch agents, monitor their status, and automate code-related tasks.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-cursor'
  version: '0.1.7'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> User API Keys provide secure, programmatic access to your Cursor account, including the Cloud Agent API.
>
> To get your API Key:
> 1. Go to cursor.com/dashboard?tab=cloud-agents
> 2. Scroll to the "User API Keys" section
> 3. Click "+ New API Key"
> 4. Copy the generated key (format: key_...)
>
> Treat your API key like a password: keep it secure and never share it publicly.
> Note: The Cloud Agent API is in beta.

## Actions

### `launch_agent`

**Launch Agent.** Launches a new Cursor cloud agent against a GitHub repository, giving it a task prompt (optionally with images) to autonomously make code changes on a branch. Use to kick off automated coding work; optionally auto-create a pull request when the agent finishes and register a webhook for status notifications. Requires a repository URL and prompt text. Each call starts a distinct agent run, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `promptText` | string | yes |  | Task Prompt. The instruction text for the agent. |
| `images` | array | no |  | Images. Optional images to include with the prompt (max 5) Each item: { `image`, `width`, `height` }. |
| `model` | string | no |  | Model. The LLM to use (e.g., claude-4-sonnet). Leave empty to use the default model. |
| `repository` | string | yes |  | Repository URL. GitHub repository URL (e.g., https://github.com/your-org/your-repo) |
| `ref` | string | no |  | Base Branch/Ref. Git ref (branch name, tag, or commit hash) to use as the base branch. |
| `autoCreatePr` | boolean | no | `false` | Auto Create Pull Request. Automatically create a pull request when the agent completes. |
| `openAsCursorGithubApp` | boolean | no | `false` | Open as Cursor GitHub App. Open the pull request as the Cursor GitHub App instead of as the user. Only applies if auto-create PR is enabled. |
| `skipReviewerRequest` | boolean | no | `false` | Skip Reviewer Request. Skip adding the user as a reviewer to the pull request. Only applies if auto-create PR is enabled and opened as Cursor GitHub App. |
| `branchName` | string | no |  | Custom Branch Name. Custom branch name for the agent to create. |
| `webhookUrl` | string | no |  | Webhook URL. URL to receive webhook notifications about agent status changes. |
| `webhookSecret` | string | no |  | Webhook Secret. Secret key for webhook payload verification (minimum 32 characters) |

### `add_followup_instruction`

**Add Followup Instruction to Agent.** Sends an additional instruction (optionally with images) to an existing Cursor cloud agent identified by its agent id, steering or extending its in-progress work. Use to course-correct or add scope after launching an agent. Each call appends a new instruction, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent. Select a cloud agent. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Instruction Text. The follow-up instruction text for the agent. |
| `images` | array | no |  | Images. Optional images to include with the instruction (max 5) Each item: { `image`, `width`, `height` }. |

### `find_agent_status`

**Find Agent Status.** Retrieves the current status, summary, and result details of a single Cursor cloud agent by its agent id. Use to poll or check whether an agent is still running, finished, or failed. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent. Select a cloud agent. A value the product loads from the provider, such as an id; write the value itself. |

### `delete_agent`

**Delete Agent.** Permanently deletes a Cursor cloud agent by its agent id. Use to clean up or stop an agent run; this cannot be undone. The first call removes the agent and subsequent calls for the same id will not find it, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent. Select a cloud agent. A value the product loads from the provider, such as an id; write the value itself. |

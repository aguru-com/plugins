# Comfy.ICU

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-comfyicu'
  version: '0.1.6'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain API key from [Account Settings](https://comfy.icu/account).

## Actions

### `get-run-output`

**Get Run Output.** Fetches the output artifacts (generated images/videos) of a specific Comfy.ICU workflow run, identified by workflow ID and run ID. Use after a run has completed to collect its produced files. Requires a valid run ID; read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflow_id` | string | yes |  | Workflow ID. A value the product loads from the provider, such as an id; write the value itself. |
| `run_id` | string | yes |  | Run ID. |

### `get-run-status`

**Get Run Status.** Returns the current execution status of a specific Comfy.ICU workflow run, identified by workflow ID and run ID. Use to poll or check whether a submitted run is still running, completed, or errored. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflow_id` | string | yes |  | Workflow ID. A value the product loads from the provider, such as an id; write the value itself. |
| `run_id` | string | yes |  | Run ID. |

### `list-workflows`

**List Workflows.** Lists all Comfy.ICU workflows available on the connected account. Use to discover workflow IDs before submitting a run or fetching run details. Takes no input; read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

No inputs.

### `submit-workflow-run`

**Submit Workflow Run.** Submits a new run of a Comfy.ICU workflow, queuing image/video generation with the given prompt graph (the API-format workflow JSON). Use to kick off generation; optionally supply a webhook URL to be notified of run status. Each call starts a new run, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflow_id` | string | yes |  | Workflow ID. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | JSON | yes |  | Prompt. You can get workflow prompt by navigating to History->Select Run -> Copy API Workflow. |
| `webhook` | string | no |  | Webhook. Webhook URL to recieve run status. |

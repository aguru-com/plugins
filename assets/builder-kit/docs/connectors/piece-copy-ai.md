# Copy.ai

AI-powered content generation and copywriting platform

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-copy-ai'
  version: '0.1.6'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To use Copy AI, you need to get an API key:
> 1. Login to your account at https://copy.ai.
> 2. Click on Workflows in the left sidebar.
> 3. Click on any Workflow you have. You need to create a new Workflow, if you don't have one.
> 4. Click on the API tab.
> 5. Click the Copy button below WORKSPACE API KEY.

## Actions

### `run_workflow`

**Run Workflow.** Starts a new execution of a Copy.ai workflow by its workflow ID, passing the supplied inputs as the run's start variables. Use this to kick off content generation or any configured Copy.ai workflow; it returns a run ID you then poll with Get Workflow Run Status and fetch results from with Get Workflow Run Outputs. Not idempotent: each call launches a separate run. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflowId` | string | yes |  | Workflow ID. The ID of the workflow to run. |
| `inputs` | object | yes |  | Workflow Inputs. The input data for the workflow. |

### `get_workflow_run_status`

**Get Workflow Run Status.** Looks up the current status of a single Copy.ai workflow run, identified by its workflow ID and run ID. Use this to poll a run started by Run Workflow until it completes before fetching its outputs. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflowId` | string | yes |  | Workflow ID. |
| `runId` | string | yes |  | Run ID. The ID of the workflow run to check. |

### `get_workflow_run_outputs`

**Get Workflow Run Outputs.** Fetches the generated outputs of a Copy.ai workflow run, identified by its workflow ID and run ID. Use this once a run has completed (confirm via Get Workflow Run Status) to retrieve the produced content. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflowId` | string | yes |  | Workflow ID. |
| `runId` | string | yes |  | Run ID. The ID of the workflow run to get outputs from. |

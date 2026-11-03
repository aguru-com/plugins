# Leap AI

Automate any workflow with AI. Build custom AI automations to scale your marketing, sales, and operations.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-leap-ai'
  version: '0.0.8'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Leap AI API Key

> Provide your Leap AI API key.
>
> **How to get your API key:**
> 1. Go to [app.tryleap.ai](https://app.tryleap.ai)
> 2. Click on **Settings** in the left sidebar (bottom)
> 3. Navigate to the **API** section
> 4. Click **Create API Key** to generate a new key
> 5. Copy and paste the key here

## Actions

### `getAWorkflowRun`

**Get a Workflow Run.** Fetches the current status and results of a single Leap AI workflow run by its run ID. Use to poll a run started by "Run a Workflow" until it completes. Requires the workflow run ID. Read-only and safe to call repeatedly. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflow_run_id` | string | yes |  | Workflow Run ID. The ID of the workflow run to retrieve. |

### `runAWorkflow`

**Run a Workflow.** Starts execution of a Leap AI workflow identified by its workflow ID, optionally passing input variables and a webhook URL to receive results on completion. Returns a run ID to track progress; pair with "Get a Workflow Run" to poll for status and results. Each call launches a new run, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflow_id` | string | yes |  | Workflow ID. The ID of the workflow to run. |
| `webhook_url` | string | no |  | Webhook URL. The URL to which workflow results should be sent on completion (optional) |
| `input` | object | no |  | Input Variables. Variables that the workflow can use globally and their values (optional) |

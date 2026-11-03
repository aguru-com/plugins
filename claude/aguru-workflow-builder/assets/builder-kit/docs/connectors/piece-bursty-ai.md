# BurstyAI

Automate content creation, SEO optimization, email outreach, and influencer partnerships with BurstyAI's no-code AI workflows.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-bursty-ai'
  version: '0.1.8'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> API Key for Bursty-ai

## Actions

### `runWorkflow`

**Run Workflow.** Starts (triggers) a BurstyAI no-code AI workflow by its workflow ID, launching a new asynchronous execution. Use to kick off a BurstyAI content/SEO/outreach automation; enable "Wait for Result" to block and poll until the job completes (returns the result, times out after ~10 minutes), or leave it off to fire-and-return the job handle immediately. Not idempotent: each call starts a separate workflow run. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflow_id` | string | yes |  | Workflow ID. The ID of the Bursty AI workflow to run. |
| `get_result` | boolean | no | `false` | Wait for Result. Wait for the workflow to complete and return the results (default: false) |

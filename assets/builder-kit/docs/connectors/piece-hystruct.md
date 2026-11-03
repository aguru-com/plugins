# Hystruct

AI-powered document structuring and data extraction

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-hystruct'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
> 1. Log in to your Hystruct dashboard
> 2. Click on your profile picture (top right)
> 3. Click **Settings**
> 4. Click **API Keys**
> 5. Copy and paste your API key here

## Actions

### `create_job`

**Create Job.** Queues a new job to execute a Hystruct document-structuring/data-extraction workflow, identified by its workflow ID. Use this to kick off a workflow run on demand. Not idempotent: each call enqueues a separate job run. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflowId` | string | yes |  | Workflow ID. The ID of the workflow to run. |

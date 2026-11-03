# MindStudio

Run MindStudio workflows and get AI results.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mind-studio'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your MindStudio API key (Bearer token).

## Actions

### `run_workflow`

**Run Workflow.** Executes a MindStudio app workflow to get an AI result, identified by App ID (and optionally a specific workflow name within the app). Pass input as key-value variables; optionally supply a callback URL to receive the result asynchronously instead of inline. Use when an agent needs to invoke a prebuilt MindStudio AI app. Not idempotent: each call starts a new thread/execution and may incur billing cost. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `appId` | string | yes |  | App ID. MindStudio app ID to run. |
| `workflow` | string | no |  | Workflow. Workflow name to run (without the .flow extension). |
| `variables` | JSON | no | `{}` | Variables. Key-value variables passed to the app. |
| `callbackUrl` | string | no |  | Callback URL. URL to receive the execution result asynchronously. |
| `includeBillingCost` | boolean | no | `false` | Include Billing Cost. Return the billing cost in the response. |

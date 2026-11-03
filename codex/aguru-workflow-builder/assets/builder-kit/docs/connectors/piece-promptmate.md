# PromptMate

AI-powered automation platform

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-promptmate'
  version: '0.2.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your PromptMate API key

## Actions

### `list_apps`

**List Apps.** Lists all PromptMate apps available to the authenticated account, returning each app id, name, credit estimate, and its data fields. Use it to discover which app to run or to look up an appId before calling run, get-job-status, get-app-details, or get-last-results. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

No inputs.

### `run_app`

**Run PromptMate App.** Submits a job to run a PromptMate app over an array of data objects, where each object must supply the data fields the chosen app expects (look these up via list-apps or get-app-details). Use it to actually execute an app and produce results; the call returns a job that you then poll with get-job-status. Optionally accepts a callback URL for async delivery. Not idempotent — each call starts a new job and consumes credits. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `appId` | string | yes |  | App. Select the PromptMate app to run. A value the product loads from the provider, such as an id; write the value itself. |
| `data` | array | yes |  | Data. Array of data objects to process. Each object must contain the required data fields for the selected app. |
| `callBackUrl` | string | no |  | Callback URL. URL to which the result of the job will be sent (optional) |
| `noMailOnFinish` | boolean | no | `true` | Disable Email Notification. Send an email to the user when the job has finished. |
| `config` | object | no |  | Configuration. Configuration settings for the job (language, country, etc.) |

### `get_job_status`

**Get Job Status and Result.** Looks up the current status and any available results for a single PromptMate app job, given its appId and jobId (the jobId comes from a prior run-app call). Use it to poll a submitted job until it completes and to fetch its output; optionally restrict to the default result fields only. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `appId` | string | yes |  | App. Select the app for which to get job status. A value the product loads from the provider, such as an id; write the value itself. |
| `jobId` | string | yes |  | Job ID. The ID of the job to check. |
| `onlyDefaultResultFields` | boolean | no | `true` | Only Default Result Fields. Return only the default result fields. |

### `get_app_details`

**Get App Details.** Fetches the full configuration and metadata of one PromptMate app by appId. Use it to inspect an app's expected data fields and settings before constructing input for run-app. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `appId` | string | yes |  | App. Select the app to get details for. A value the product loads from the provider, such as an id; write the value itself. |

### `get_last_results`

**Get Last Result Rows.** Retrieves the most recent result rows produced by a given PromptMate app (appId), capped by an optional limit, optionally returning only the default result fields. Use it to sample an app's recent output for examples, testing, or to inspect its result shape without running a new job. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `appId` | string | yes |  | App. Select the app to get last results for. A value the product loads from the provider, such as an id; write the value itself. |
| `onlyDefaultResultFields` | boolean | no | `true` | Only Default Result Fields. Return only the default result fields. |
| `limit` | number | no | `20` | Limit. Maximum number of result rows to return. |

### `use_template`

**Use Template.** Creates a new PromptMate app from a template, identified by its templateId. Use it to provision an app from a prebuilt template before running it. Not idempotent — each call creates a new app. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateId` | string | yes |  | Template ID. The ID of the template to use. |

### `get_user_info`

**Get User Information.** Returns the account/user profile tied to the authenticated PromptMate API key. Use it to identify the current account or verify that credentials are valid. Takes no input; read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

No inputs.

### `list_projects`

**List Projects.** Lists the PromptMate projects available to the authenticated account. Use it to discover which projects exist for organizing apps. Takes no input; read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

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

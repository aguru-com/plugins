# Flipando AI

Autonomous AI Agents Revolutionizing Compliance with Smart, Adaptive Workflows.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-flipando'
  version: '0.1.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Flipando API Key

## Actions

### `getAllApps`

**Get All Apps.** Lists the Flipando AI applications owned by the authenticated account (capped at 20 results). Use it to discover available app IDs before running an app or to enumerate what the account can execute. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

No inputs.

### `runApp`

**Run App.** Starts a Flipando AI application identified by its numeric application ID, kicking off an asynchronous completion job (retrieve the result later via Get Task). Use it to run a known app with optional JSON input variables and an optional document upload. A file_description is required whenever a file is attached. Not idempotent: each call launches a new run. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `application_id` | number | yes |  | Application ID. ID of the application to be completed. |
| `inputs_data` | string | no |  | Inputs Data. JSON string of key-value pairs for application input variables. |
| `file` | file | no |  | File. File to be uploaded, if the application requires documents. Supports PDF, DOCX, images, and other document formats. Files are not supported; an action that needs one fails. |
| `file_description` | string | no |  | File Description. Description of the file being uploaded. Required when uploading a file. |

### `getTask`

**Get Task.** Fetches the current state and result of a Flipando task by its task ID, typically the job returned by Run App or Run App Generator. Use it to poll for or read back the outcome of an asynchronous application run. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `task_id` | string | yes |  | Task ID. ID of the task to be retrieved. |

### `runAppGenerator`

**Run App Generator.** Runs Flipando's Special App Generator to build a new application, starting an asynchronous completion job (retrieve the result later via Get Task). Use it to create a new app from JSON input variables rather than running an existing one; the is_new_app_private flag controls whether the generated app is private or public. Not idempotent: each call generates a new app. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inputs_data` | string | no |  | Inputs Data. JSON string of key-value pairs for application input variables. |
| `is_new_app_private` | boolean | yes | `true` | Is New App Private. Whether the new app to be created should be private or public. |

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

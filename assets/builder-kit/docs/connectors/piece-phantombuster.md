# PhantomBuster

Automate your web scraping and web automation tasks

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-phantombuster'
  version: '0.2.0'
```

Categories: MARKETING, SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> 1. Login to your Pushbullet Dashboard.
> 2. Go to **https://phantombuster.com/workspace-settings**.
> 3. change to the **API Keys** tab and **Add API Key**.
> 4. Copy the API Key to the clipboard and paste it.

## Actions

### `launchPhantom`

**Launch Phantom.** Queues a Phantombuster agent (selected by id) to run, optionally passing a launch argument and a max-retries count. Use this to trigger a scraping or automation phantom. Each call starts a new execution, so it is not idempotent. By default it returns immediately after queuing; enable wait-for-output to block and poll until the run finishes (or errors), returning the run output instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent. Select the Phantombuster agent to use. A value the product loads from the provider, such as an id; write the value itself. |
| `waitForOutput` | boolean | no | `false` | Wait for Output. Wait until the agent execution completes and output is available. |
| `argument` | object | no |  | Argument. Optional argument to pass to the agent. |
| `maxRetries` | number | no |  | Max Retries. Maximum number of retries if the agent fails. |

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

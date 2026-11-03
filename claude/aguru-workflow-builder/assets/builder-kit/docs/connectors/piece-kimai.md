# Kimai

Open-source time tracking software

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-kimai'
  version: '0.3.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To configure API access:
>
> 1. Go to Kimai Web UI;
> 2. Click on your user profile and then go to "API Access";
> 3. Generate an API token.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_url` | string | yes |  | Server URL. Kimai Instance URL (e.g. https://demo.kimai.org) |
| `api_token` | string | yes |  | API Token. Kimai API Token. |

## Actions

### `create_timesheet`

**Create Timesheet.** Logs a new time entry (timesheet record) in Kimai for a given project and activity, with a required begin time and optional end time and description. Use when an agent needs to record tracked work against a Kimai project. Each call appends a new timesheet, so it is not idempotent; repeating it creates duplicate entries. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. Kimai project. A value the product loads from the provider, such as an id; write the value itself. |
| `activity` | string | yes |  | Activity. Kimai activity. A value the product loads from the provider, such as an id; write the value itself. |
| `begin` | ISO date-time string | yes |  | Begin Date. Begin Date of Timesheet. |
| `end` | ISO date-time string | no |  | End Date. End Date of Timesheet. |
| `description` | string | no |  | Description. Description of Timesheet. |

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

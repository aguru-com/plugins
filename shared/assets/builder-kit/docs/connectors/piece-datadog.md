# Datadog

Cloud monitoring and analytics platform

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-datadog'
  version: '0.2.2'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Datadog authentication requires an API key and a site (by default, US1).

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | Datadog API key. |
| `appKey` | string | no |  | Datadog App key (required for some endpoints). |
| `site` | string | yes | `"datadoghq.com"` | Site. One of `"datadoghq.com"`, `"us3.datadoghq.com"`, `"us5.datadoghq.com"`, `"datadoghq.eu"`, `"ap1.datadoghq.com"`, `"ap2.datadoghq.com"`, `"ddog-gov.com"`. |

## Actions

### `sendMultipleLogs`

**Send Multiple logs.** Submits a batch of log entries to Datadog via the Logs intake API. Use to ship multiple application or system logs at once; pass a `logs` key holding an array of objects (each with at least a `message`, plus optional `ddsource`, `ddtags`, `hostname`, `service`, and arbitrary additional properties). Not idempotent — each call appends new log entries, so re-running duplicates them. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `body` | JSON | yes | `{"logs":[{"ddsource":"source","ddtags":"env:test,version:1.0","hostname":"hostname","message":"message","service":"service","additionalProperties":{"status":"info"}}]}` | Logs. Logs to send to Datadog, must contain a `logs` key with an array of objects. Documentation: https://docs.datadoghq.com/api/latest/logs/#send-logs. |

### `sendOneLog`

**Send One log.** Submits a single log entry to Datadog via the Logs intake API. Use to ship one application or system log; requires a `message` and accepts optional `ddsource`, comma-separated `ddtags`, `hostname`, `service`, and additional key-value properties (e.g. status/level). Not idempotent — each call appends a new log entry, so re-running duplicates it. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message` | string | yes |  | Message. The message to send to Datadog. |
| `ddsource` | string | no |  | DD Source. The DD source to send to Datadog. |
| `ddtags` | string | no |  | DD Tags. The DD tags to send to Datadog, comma separated. |
| `hostname` | string | no |  | Hostname. The hostname to send to Datadog. |
| `service` | string | no |  | Service. The service to send to Datadog. |
| `additionalProperties` | JSON | no |  | Additional Properties. Additional properties to send to Datadog, in key-value pairs like status, level, etc. |

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

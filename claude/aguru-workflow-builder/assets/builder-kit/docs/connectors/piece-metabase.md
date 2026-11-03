# Metabase

The simplest way to ask questions and learn from data

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-metabase'
  version: '0.3.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Metabase authentication requires a baseUrl and a password.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseUrl` | string | yes |  | Metabase API base URL. |
| `apiKey` | string | yes |  | API key. Generate one on your Metabase instance (settings -> authentication -> API keys) |

## Actions

### `getQuestion`

**Get question.** Runs a saved Metabase question (card) by its ID and returns the query result rows. Use to pull live data from an existing report rather than writing raw SQL. Optionally pass a parameters object (keyed by parameter slug) to filter the query; slugs not defined on the card are ignored. Read-only and idempotent — re-running with the same inputs re-executes the query without side effects. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `questionId` | string | yes |  | Metabase question ID. |
| `parameters` | object | no |  | Parameters (slug name -> value). |

### `getQuestionPngPreview`

**Get Question PNG Preview.** Fetches a low-resolution PNG preview image of a saved Metabase question (card) by its ID and saves it as a file. Use when an agent needs a quick visual snapshot of a report rather than the underlying data rows. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `questionId` | string | yes |  | Metabase question ID. |

### `getDashboardQuestions`

**Get Dashboard Questions.** Runs every question (card) on a Metabase dashboard, identified by dashboard ID, and returns all of their results plus the dashboard's available parameters in one consolidated response. Use to retrieve data from an entire dashboard at once rather than fetching cards individually. Optionally pass a parameters object (keyed by parameter slug) applied across all cards. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dashboardId` | string | yes |  | Metabase Dashboard ID. |
| `parameters` | object | no |  | Parameters (slug name -> value). Dashboard parameters to apply to all questions. |

### `embedQuestion`

**Embed question.** Updates a Metabase question (card) by its ID to toggle static embedding on or off and set how each parameter is exposed in the embed (disabled, editable, or locked). Use when configuring a question for external embedding. This mutates the card's settings, but is idempotent — re-running with the same inputs leaves the card in the same configured state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `questionId` | string | yes |  | Metabase question ID. |
| `enableEmbedding` | boolean | yes | `true` | Enable embedding. Whether to enable embedding for this question. |
| `parameterSettings` | object | no |  | Parameter settings. Configure how each parameter should be handled in the embed. An object whose fields depend on other inputs; the product shows them. |

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

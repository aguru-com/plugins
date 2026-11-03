# Bocha

Web search API for AI agents, providing real-time web pages, images, and news.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-bocha-search'
  version: '0.1.2'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Follow these steps to obtain your Bocha API Key:
>
> 1. Visit [Bocha AI Open Platform](https://open.bochaai.com) and create an account.
> 2. Navigate to **API KEY Management** in the dashboard.
> 3. Copy your API key.

## Actions

### `web_search`

**Web Search.** Runs a Bocha web search for a query and returns matching web pages, optionally with per-result text summaries. Pick this to look up current information on the public web; results can be narrowed by freshness window, capped result count, and include/exclude domain lists (up to 100 domains each, separated by | or ,). Read-only and idempotent — repeating the same query just fetches results again. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. The search query. |
| `freshness` | string | no | `"noLimit"` | Freshness. Filter results by time range. Defaults to no limit. One of `"noLimit"`, `"oneDay"`, `"oneWeek"`, `"oneMonth"`, `"oneYear"`. |
| `summary` | boolean | no | `true` | Show Summary. Include a text summary for each search result. |
| `include` | string | no |  | Include Domains. Limit search to specific domains. Separate multiple domains with \| or , (max 100). |
| `exclude` | string | no |  | Exclude Domains. Exclude specific domains from search results. Separate multiple domains with \| or , (max 100). |
| `count` | number | no | `10` | Count. Number of results to return (1-50). Defaults to 10. |

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

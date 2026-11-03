# Serpstat

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-serpstat'
  version: '0.2.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> You can obtain your API token from your Serpstat account. Go to your Serpstat dashboard and navigate to API settings to get your token.

## Actions

### `get_keywords`

**Get Keywords.** Look up organic keyword data (search volume, CPC, competition, etc.) that a given seed keyword ranks for on a chosen search engine/region, via Serpstat keyword analysis. Use to research the keyword landscape around a term; supports excluding minus-keywords, sorting, pagination, and an advanced JSON filter for narrowing results. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. The search query to find keywords for. |
| `se` | string | yes | `"g_us"` | Search Engine. Search engine to use for keyword analysis. One of `"g_us"`, `"g_sg"`, `"g_id"`, `"g_my"`, `"g_vn"`, `"g_th"`. |
| `minusKeywords` | array | no |  | Minus Keywords. List of keywords to exclude from the search. |
| `withIntents` | boolean | no |  | With Intents. Include keyword intent (works for g_au and g_us only) |
| `sortField` | string | no | `"region_queries_count"` | Sort Field. Field to sort by (any numeric fields in response data) One of `"region_queries_count"`, `"search_volume"`, `"cpc"`, `"competition"`, `"results_count"`. |
| `sortOrder` | string | no | `"desc"` | Sort Order. Sort direction. One of `"desc"`, `"asc"`. |
| `size` | number | no | `10` | Size. Number of results to return (max 100) |
| `page` | number | no | `1` | Page. Page number for pagination. |
| `filters` | JSON | no |  | Filters. See the docs for syntax - https://api-docs.serpstat.com/docs/serpstat-public-api/w7jh5sk9kc0cm-get-keywords. |

### `get_suggestions`

**Get Suggestions.** Fetch search suggestions related to a given keyword (full-text matches that include the seed term) on a chosen search engine/region, via Serpstat keyword analysis. Use to discover related or long-tail keyword variants for ideation; supports pagination and an advanced JSON filter. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `keyword` | string | yes |  | Keyword. The keyword to get suggestions for. |
| `se` | string | yes | `"g_us"` | Search Engine. Search engine to use for suggestions. One of `"g_us"`, `"g_sg"`, `"g_id"`, `"g_my"`, `"g_vn"`, `"g_th"`. |
| `filters` | JSON | no |  | Filters. See the docs for syntax - https://api-docs.serpstat.com/docs/serpstat-public-api/mmd9zlcqjaoe4-get-suggestions. |
| `page` | number | no | `1` | Page. Page number in response. |
| `size` | number | no | `100` | Size. Number of results per page in response. |

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

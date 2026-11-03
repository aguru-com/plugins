# Sofya

Web tools for AI agents: search the web, fetch pages as clean markdown, extract structured data with AI, and run deep multi-source research.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-sofya'
  version: '0.1.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Follow these steps to obtain your Sofya API Key:
>
> 1. Visit [Sofya](https://sofya.co) and create an account (sign up with GitHub for 1,000 free credits per month on most accounts).
> 2. Open your [dashboard](https://sofya.co/dashboard).
> 3. Copy your API key (it starts with `ay_live_`).

## Actions

### `search`

**Search the Web.** Run a web search through Sofya for a natural-language query and return extracted page content (not just snippets), optionally with an AI-synthesized answer. Narrow scope with a general vs. news topic, a recency window, result count, and domain include/exclude lists. Use to look up current or external information from the web. Read-only and idempotent: the same query returns equivalent results, though live web data may shift over time. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. The search query. |
| `search_depth` | string | no | `"basic"` | Search Depth. "basic" fetches pages and returns extracted content (3 credits). "snippets" returns SERP snippets only, without fetching pages (1 credit). One of `"basic"`, `"snippets"`. |
| `topic` | string | no | `"general"` | Topic. Use "news" for current events, breaking news, or any time-sensitive query. One of `"general"`, `"news"`. |
| `max_results` | number | no | `10` | Maximum Results. Number of results to return (1-20). |
| `include_answer` | boolean | no | `false` | Include Answer. Add an AI-synthesized answer based on the search results (adds 5 credits). |
| `freshness` | string | no |  | Freshness. Filter by recency: "day", "week", "month", "year", or a range "YYYY-MM-DD:YYYY-MM-DD". |
| `include_domains` | array | no |  | Include Domains. Only include results from these domains (max 10). |
| `exclude_domains` | array | no |  | Exclude Domains. Exclude results from these domains (max 10). |

### `fetch`

**Fetch URL Content.** Fetch one or more URLs and return their content as clean markdown (also supports PDFs and documents). Use when you already have exact URLs (e.g. from a prior search) and need their full text rather than running a new query. Costs 1 credit per URL, up to 10 URLs; failed URLs are not charged. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `urls` | array | yes |  | URLs. The URLs to fetch (max 10). |
| `include_raw_html` | boolean | no | `false` | Include Raw HTML. Also include the raw HTML source in each result (null for non-HTML content such as PDFs). |

### `extract`

**Extract Data from Page.** Fetch a single web page and use AI to extract specific information described by a prompt (e.g. pricing tiers, specs, author and date), returning targeted text rather than the full page. If the page has no usable text, the response reports low content instead of fabricating an answer. Costs 5 credits. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The URL to extract information from. |
| `prompt` | string | yes |  | Prompt. What information to extract (e.g. "list all pricing tiers with features"). |

### `research`

**Deep Research.** Perform comprehensive research on a topic: Sofya decomposes the query into sub-queries, searches and reads multiple sources in parallel, then synthesizes a structured report with citations. Best for open-ended or comparative questions that need coverage from many angles; for simple lookups use Search instead. Costs 25 credits. Not idempotent: it selects sources and synthesizes a report at request time, so repeated calls with the same query can differ. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. The research question or topic. |
| `topic` | string | no | `"general"` | Topic. Use "news" to prioritize recent news articles. One of `"general"`, `"news"`. |
| `max_sources` | number | no | `20` | Maximum Sources. Maximum number of sources to use (5-30). |
| `freshness` | string | no |  | Freshness. Filter by recency: "day", "week", "month", "year", or a range "YYYY-MM-DD:YYYY-MM-DD". |

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

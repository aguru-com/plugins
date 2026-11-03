# Valyu

Search the web, research papers, and proprietary datasets with intelligent query processing.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-valyu'
  version: '0.1.0'
```

Categories: ARTIFICIAL_INTELLIGENCE, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Obtain your API key from [Valyu Platform](https://platform.valyu.ai/user/account/apikeys).

## Actions

### `search`

**Search.** Runs a Valyu search over web pages, news, and/or Valyu proprietary datasets and returns ranked content for a free-text query. Use to gather grounding context or sources for a question; set search_type to scope to web, news, or proprietary indices (default searches all), and use url_only to return links without content. Read-only retrieval, so repeating the same query is safe. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. The search query to find relevant content. |
| `max_num_results` | number | no | `10` | Max Results. Maximum number of results to return (1-20 for standard API keys, up to 100 with special API key). |
| `search_type` | string | no | `"all"` | Search Type. Type of search to perform. 'web' searches web content. 'proprietary' uses Valyu's full-text multimodal indices. 'news' returns only news articles. One of `"all"`, `"web"`, `"proprietary"`, `"news"`. |
| `fast_mode` | boolean | no | `false` | Fast Mode. Enable fast mode for reduced latency but shorter results. Best for general purpose queries. |
| `max_price` | number | no |  | Max Price (CPM). Maximum price in dollars for a thousand retrievals (CPM). Only applies when provided. |
| `relevance_threshold` | number | no | `0.5` | Relevance Threshold. Minimum relevance score for results (0.0-1.0). |
| `included_sources` | array | no |  | Included Sources. Specific sources to search (URLs, domains or dataset names). |
| `excluded_sources` | array | no |  | Excluded Sources. Specific sources to exclude from search (URLs, domains, or dataset names). |
| `category` | string | no |  | Category. Natural language category/guide phrase to help guide the search (e.g., "agentic use-cases"). |
| `response_length` | string | no | `"short"` | Response Length. Controls the length of content returned per result. One of `"short"`, `"medium"`, `"large"`, `"max"`. |
| `country_code` | string | no |  | Country Code. 2-letter ISO country code to bias search results (e.g., US, GB, DE). |
| `start_date` | string | no |  | Start Date. Start date for time-filtered searches (YYYY-MM-DD). |
| `end_date` | string | no |  | End Date. End date for time-filtered searches (YYYY-MM-DD). |
| `url_only` | boolean | no | `false` | URL Only. When set to true, only returns URLs for results (no content). Only applies when search_type is web or news. |

### `extract_content`

**Extract Content.** Fetches and extracts clean text content from a list of 1-10 web page URLs you already have. Optionally adds AI processing via the summary mode (none, a default summary, custom summary instructions, or structured JSON extraction against a supplied schema). Use when you have specific URLs to read rather than a query to search; read-only fetch, so repeating the same request is safe. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `urls` | array | yes |  | URLs. URLs to extract content from (1-10 URLs per request). |
| `response_length` | string | no | `"short"` | Response Length. Controls the length of content returned per result. One of `"short"`, `"medium"`, `"large"`, `"max"`. |
| `max_price_dollars` | number | no |  | Max Price. Maximum cost limit in dollars for the entire request. |
| `extract_effort` | string | no | `"normal"` | Extract Effort. Processing effort level. One of `"normal"`, `"high"`, `"auto"`. |
| `screenshot` | boolean | no | `false` | Screenshot. Capture page screenshots. Results will include a screenshot_url field. |
| `enable_summary` | string | no | `"none"` | AI Processing. Enable AI-powered processing of the content. One of `"none"`, `"default"`, `"custom"`, `"structured"`. |
| `summaryOptions` | object | no |  | Summary Options. An object whose fields depend on other inputs; the product shows them. |

### `answer`

**Answer Query.** Answers a question by running a Valyu search and synthesizing the results into an AI-generated response. Use when you want a direct answer rather than raw search hits; output_format can return unstructured text or structured JSON conforming to a supplied schema. Read-only retrieval with no stored side effect, so repeating the same query is safe. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. The question or topic to get an AI-generated answer for. |
| `system_instructions` | string | no |  | System Instructions. Custom instructions for AI processing (up to 2000 characters). |
| `output_format` | string | no | `"unstructured"` | Output Format. Choose the format for the AI response. One of `"unstructured"`, `"structured"`. |
| `structuredOptions` | object | no |  | Structured Output Options. An object whose fields depend on other inputs; the product shows them. |
| `search_type` | string | no | `"all"` | Search Type. Type of search to perform. One of `"all"`, `"web"`, `"proprietary"`, `"news"`. |
| `fast_mode` | boolean | no | `false` | Fast Mode. Enable fast mode for reduced latency but shorter results. |
| `data_max_price` | number | no | `1` | Data Max Price. Maximum price in dollars for data retrieval (search costs only). |
| `included_sources` | array | no |  | Included Sources. Specific sources to search (URLs, domains or dataset names). |
| `excluded_sources` | array | no |  | Excluded Sources. Specific sources to exclude from search. |
| `start_date` | string | no |  | Start Date. Start date filter for search results (YYYY-MM-DD). |
| `end_date` | string | no |  | End Date. End date filter for search results (YYYY-MM-DD). |
| `country_code` | string | no |  | Country Code. 2-letter ISO country code to bias search results (e.g., US, GB). |
| `streaming` | boolean | no | `false` | Streaming. Enable SSE streaming. Returns search results first, then content deltas. |

### `create_deep_research_task`

**Create Deep Research Task.** Starts a long-running, asynchronous deep-research task that searches multiple sources and produces a detailed report; mode trades depth for time (fast, standard, or heavy up to ~90 min). Use for thorough multi-source investigation rather than a quick lookup; the call returns a task to poll or be notified about via webhook, not the finished report. Each call creates a new task, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Research query or task description. |
| `mode` | string | no | `"standard"` | Mode. Research depth and duration. One of `"fast"`, `"standard"`, `"heavy"`. |
| `output_format` | string | no | `"markdown"` | Output Format. Format for the research output. One of `"markdown"`, `"markdown_pdf"`, `"structured"`. |
| `structuredOptions` | object | no |  | Structured Output Options. An object whose fields depend on other inputs; the product shows them. |
| `strategy` | string | no |  | Strategy. Natural language strategy instructions (e.g., "Focus on peer-reviewed sources"). |
| `search_type` | string | no | `"all"` | Search Type. Type of search to perform. One of `"all"`, `"web"`, `"proprietary"`. |
| `included_sources` | array | no |  | Included Sources. Restrict search to specific source types. One of `"web"`, `"academic"`, `"finance"`, `"patent"`, `"transportation"`, `"politics"`, `"legal"`. |
| `excluded_sources` | array | no |  | Excluded Sources. Exclude specific source types from search. One of `"web"`, `"academic"`, `"finance"`, `"patent"`, `"transportation"`, `"politics"`, `"legal"`. |
| `start_date` | string | no |  | Start Date. Filter content published on or after this date (YYYY-MM-DD). |
| `end_date` | string | no |  | End Date. Filter content published on or before this date (YYYY-MM-DD). |
| `urls` | array | no |  | URLs. URLs to extract content from (max 10). |
| `code_execution` | boolean | no | `true` | Code Execution. Enable code execution during research. |
| `previous_reports` | array | no |  | Previous Report IDs. Previous deep research IDs to use as context (max 3). |
| `webhook_url` | string | no |  | Webhook URL. HTTPS URL for completion notifications. |

### `create_batch`

**Create Batch.** Creates a DeepResearch batch container with shared configuration (mode, output format, search scope, webhook) that subsequent deep-research tasks can run under. Use when grouping multiple research tasks that should share settings. Each call creates a new batch, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Batch Name. Optional name for the batch. |
| `mode` | string | no | `"standard"` | Mode. DeepResearch mode for all tasks in this batch. One of `"fast"`, `"standard"`, `"heavy"`. |
| `output_format` | string | no | `"markdown"` | Output Format. Default output format for all tasks. One of `"markdown"`, `"markdown_pdf"`, `"structured"`. |
| `structuredOptions` | object | no |  | Structured Output Options. An object whose fields depend on other inputs; the product shows them. |
| `search_type` | string | no | `"all"` | Search Type. Search type for all tasks. One of `"all"`, `"web"`, `"proprietary"`. |
| `included_sources` | array | no |  | Included Sources. Restrict search to specific source types. One of `"web"`, `"academic"`, `"finance"`, `"patent"`, `"transportation"`, `"politics"`, `"legal"`. |
| `excluded_sources` | array | no |  | Excluded Sources. Exclude specific source types from search. One of `"web"`, `"academic"`, `"finance"`, `"patent"`, `"transportation"`, `"politics"`, `"legal"`. |
| `start_date` | string | no |  | Start Date. Filter content published on or after this date (YYYY-MM-DD). |
| `end_date` | string | no |  | End Date. Filter content published on or before this date (YYYY-MM-DD). |
| `webhook_url` | string | no |  | Webhook URL. HTTPS URL to receive notifications when the batch completes. |

### `list_datasources`

**List Datasources.** Lists the Valyu datasources available to the account, with their metadata, schemas, and pricing, optionally filtered by category. Use to discover which proprietary data sources exist before scoping a search or research task. Read-only listing, so repeating the call is safe. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `category` | string | no |  | Category. Filter datasources by category. One of `""`, `"research"`, `"healthcare"`, `"patents"`, `"markets"`, `"company"`, `"economic"`, `"predictions"`, `"transportation"`, `"legal"`, `"politics"`. |

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

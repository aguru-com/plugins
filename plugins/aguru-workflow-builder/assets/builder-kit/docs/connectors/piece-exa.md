# Exa

AI-powered search and content extraction from the web.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-exa'
  version: '0.3.1'
```

Categories: ARTIFICIAL_INTELLIGENCE, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Obtain your API key from [Dashboard Setting](https://dashboard.exa.ai/api-keys).

## Actions

### `get_contents`

**Get Contents.** Crawls and extracts clean page content (and optionally full text, highlights, a guided summary and outgoing links) from a given list of URLs via Exa. Use when an agent already has specific URLs and needs their on-page content rather than running a web search; optionally fetch matching subpages by keyword and control cache freshness. Requires an array of URLs as input. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `urls` | array | yes |  | URLs. Array of URLs to crawl. |
| `text` | boolean | no | `true` | Return Full Text. If true, returns full page text. If false, disables text return. |
| `livecrawl` | string | no |  | Livecrawl Option. Deprecated by Exa: prefer Max Content Age. Ignored when Max Content Age is set. One of `"never"`, `"fallback"`, `"always"`, `"auto"`. |
| `livecrawlTimeout` | number | no |  | Livecrawl Timeout (ms). Timeout for livecrawling in milliseconds. |
| `subpages` | number | no |  | Number of Subpages. Number of subpages to crawl. |
| `subpageTarget` | string | no |  | Subpage Target. Keyword(s) to find specific subpages. |
| `highlights` | boolean | no | `false` | Include Highlights. Also return the most relevant snippets from each page (billed as an extra content type). |
| `summaryQuery` | string | no |  | Summary Question. Ask for an AI summary of each page focused on this question, e.g. "What does this company sell?" (billed per page). |
| `maxAgeHours` | number | no |  | Max Content Age (hours). Use cached content only if it is newer than this many hours (0 always fetches fresh, -1 always uses cache, up to 720). Replaces Livecrawl Option. |
| `extrasLinks` | number | no |  | Links per Page. Also return up to this many links found on each page, e.g. 10. |

Output fields:

- `[].title`: Title
- `[].url`: URL (url)
- `[].publishedDate`: Published Date (date)
- `[].author`: Author
- `[].image`: Image (image)
- `[].id`: Document ID
- `[].text`: Page Text
- `[].highlights`: Highlights
- `[].summary`: Summary
- `[].extras`: Extras
- `[].extras.links`: Links on Page
- `[].subpages`: Subpages
- `[].subpages[].title`: Title
- `[].subpages[].url`: URL (url)
- `[].subpages[].publishedDate`: Published Date (date)
- `[].subpages[].author`: Author
- `[].subpages[].image`: Image (image)
- `[].subpages[].id`: Document ID
- `[].subpages[].text`: Page Text

### `generate_answer`

**Ask AI.** Asks Exa a natural-language question and returns a synthesized answer grounded in live web search results. Use when an agent wants a direct factual answer rather than a list of links to triage itself; choose the exa, exa-pro or exa-fast model and optionally add instructions or a country. Requires a query string. Read-only lookup; repeating the same query is safe though phrasing and live web data may vary the wording. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Ask a question to get summarized answers from the web. |
| `text` | boolean | no | `false` | Include Text Content. If true, includes full text content from the search results. |
| `model` | string | yes | `"exa"` | Model. Choose the Exa model to use for the answer. One of `"exa"`, `"exa-pro"`, `"exa-fast"`. |
| `systemPrompt` | string | no |  | Instructions. Extra guidance for the answer, such as tone, length or preferred sources, e.g. "Answer in two sentences and prefer official sources.". |
| `userLocation` | string | no |  | User Country. Two-letter country code to localize the search behind the answer, e.g. "US". |

### `perform_search`

**Perform Search.** Runs a web search through Exa and returns matching results with page text. Use when an agent needs to discover relevant URLs/content for a query; the search type ranges from instant and fast to auto and the deep research modes, and results can be narrowed by category, domain include/exclude lists, publish date range, and country, optionally adding highlights. Requires a query string. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Search query to find related articles and data. |
| `type` | string | no | `"auto"` | Search Type. Type of search to perform. Auto suits most searches; Instant and Fast trade depth for speed; Deep Lite, Deep and Deep Reasoning research more and cost more ($0.012 to $0.015 per search). Keyword and Neural are legacy options that Exa no longer documents. One of `"auto"`, `"keyword"`, `"neural"`, `"instant"`, `"fast"`, `"deep-lite"`, `"deep"`, `"deep-reasoning"`. |
| `category` | string | no |  | Category. Category of data to focus the search on. Company and People do not support published-date filters or Exclude Domains. One of `"company"`, `"research paper"`, `"news"`, `"pdf"`, `"github"`, `"tweet"`, `"personal site"`, `"linkedin profile"`, `"financial report"`, `"publication"`, `"people"`. |
| `numResults` | number | no | `10` | Number of Results. Number of results to return (max 100). |
| `includeDomains` | array | no |  | Include Domains. Limit results to only these domains. |
| `excludeDomains` | array | no |  | Exclude Domains. Exclude results from these domains. |
| `startCrawlDate` | ISO date-time string | no |  | Start Crawl Date. Deprecated: Exa now ignores this filter. Use the published date filters instead. |
| `endCrawlDate` | ISO date-time string | no |  | End Crawl Date. Deprecated: Exa now ignores this filter. Use the published date filters instead. |
| `startPublishedDate` | ISO date-time string | no |  | Start Published Date. Only include results published after this ISO date. |
| `endPublishedDate` | ISO date-time string | no |  | End Published Date. Only include results published before this ISO date. |
| `includeText` | array | no |  | Include Text. Deprecated by Exa. Strings that must be present in the text of results. |
| `excludeText` | array | no |  | Exclude Text. Deprecated by Exa. Strings that must not be present in the text of results. |
| `textMaxCharacters` | number | no |  | Max Text Characters. Limit the page text returned per result to this many characters, e.g. 2000. Leave empty for full text. |
| `highlights` | boolean | no | `false` | Include Highlights. Also return the most relevant snippets from each page. |
| `maxAgeHours` | number | no |  | Max Content Age (hours). Use cached page content only if it is newer than this many hours (0 always fetches fresh, -1 always uses cache, up to 720). Leave empty for Exa's default. |
| `userLocation` | string | no |  | User Country. Two-letter country code to localize results, e.g. "US" or "DE". |
| `moderation` | boolean | no | `false` | Filter Unsafe Content. Remove unsafe content from the results. |

Output fields:

- `[].title`: Title
- `[].url`: URL (url)
- `[].publishedDate`: Published Date (date)
- `[].author`: Author
- `[].image`: Image (image)
- `[].id`: Document ID
- `[].text`: Page Text
- `[].highlights`: Highlights
- `[].score`: Relevance Score (number)

### `find_similar_links`

**Find Similar Links.** Finds web pages semantically similar to a single reference URL via Exa. Use when an agent has one example page and wants more of the same kind rather than searching by a text query; results can be narrowed by domain include/exclude lists, crawl/publish date ranges, and required/forbidden text. Requires a reference URL. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. Reference URL to find semantically similar links. |
| `numResults` | number | no |  | Number of Results. Number of results to return (max 100). |
| `includeDomains` | array | no |  | Include Domains. List of domains to include in results. |
| `excludeDomains` | array | no |  | Exclude Domains. List of domains to exclude from results. |
| `startCrawlDate` | ISO date-time string | no |  | Start Crawl Date (ISO). Include links crawled after this date (ISO format). |
| `endCrawlDate` | ISO date-time string | no |  | End Crawl Date (ISO). Include links crawled before this date (ISO format). |
| `startPublishedDate` | ISO date-time string | no |  | Start Published Date (ISO). Only include links published after this date (ISO format). |
| `endPublishedDate` | ISO date-time string | no |  | End Published Date (ISO). Only include links published before this date (ISO format). |
| `includeText` | array | no |  | Include Text. Strings that must be present in the webpage text (max 1 string of up to 5 words). |
| `excludeText` | array | no |  | Exclude Text. Strings that must not be present in the webpage text (max 1 string of up to 5 words). |

Output fields:

- `[].title`: Title
- `[].url`: URL (url)
- `[].publishedDate`: Published Date (date)
- `[].author`: Author
- `[].image`: Image (image)
- `[].id`: Document ID
- `[].score`: Relevance Score (number)

### `exa_create_agent_run`

**Start Agent Run.** Starts an asynchronous Exa Agent run that researches a natural-language task on the web and can return JSON shaped by an optional output schema. Use for multi-step research or list building that a single search cannot answer; it returns right away with the run id and a queued or running status, so poll exa_get_agent_run until status is completed, failed or cancelled. Effort sets the price (minimal $0.012 to xhigh $1.00; auto and ultra are metered up to $5/$20), defaulting to low. Not idempotent: each call starts and bills a new run. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Task. What the agent should research or build, in plain language. Example: "List 10 Series A climate-tech startups in Europe founded after 2022, with their website and lead investor.". |
| `effort` | string | no | `"low"` | Effort. How hard the agent works, which sets the price per run. Minimal to Extra High are fixed prices. Auto and Ultra are metered by usage and can cost up to $5 and $20 per run unless you set Max Cost. Defaults to Low. One of `"minimal"`, `"low"`, `"medium"`, `"high"`, `"xhigh"`, `"auto"`, `"ultra"`. |
| `systemPrompt` | string | no |  | Instructions. Extra guidance for the agent, such as preferred sources or rules like "only use official company websites". |
| `outputSchema` | JSON | no |  | Output Schema. Optional JSON Schema for a structured result, returned in Structured Output. Example: {"type":"object","properties":{"companies":{"type":"array","items":{"type":"object","properties":{"name":{"type":"string"},"website":{"type":"string"}}}}}}. |
| `maxCostDollars` | number | no |  | Max Cost (USD). Spending cap for one run, between 1 and 100. Only applies when Effort is Auto or Ultra; fixed efforts already have a fixed price. |
| `previousRunId` | string | no |  | Previous Run ID. Continue from an earlier run so the agent builds on its findings. Use the ID returned by Start Agent Run, e.g. "agent_run_01k4d9w6y3h7p2m8". |
| `metadata` | object | no |  | Metadata. Optional key-value labels stored with the run, e.g. {"flow": "lead-research"}. |

Output fields:

- `id`: Run ID
- `status`: Status
- `stop_reason`: Stop Reason
- `query`: Task
- `effort`: Effort
- `created_at`: Created At (datetime)
- `completed_at`: Completed At (datetime)
- `cost_total`: Cost (USD) (currency)
- `output_text`: Answer
- `output_structured`: Structured Output
- `citations`: Citations
- `citations[].title`: Title
- `citations[].url`: URL (url)
- `citations[].field`: Supports Field
- `citations[].confidence`: Confidence
- `search_count`: Searches Used (number)
- `agent_compute_units`: Agent Compute Units (number)

### `exa_get_agent_run`

**Get Agent Run.** Reads one Exa Agent run by id and returns its status (queued, running, completed, failed, cancelled), the text answer, the structured output when a schema was given, flattened citations and the cost. Use to poll a run started with exa_create_agent_run; it is a single read, so call it again while status is queued or running. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `runId` | string | yes |  | Run ID. The ID returned by Start Agent Run (or List Agent Runs), e.g. "agent_run_01k4d9w6y3h7p2m8". |

Output fields:

- `id`: Run ID
- `status`: Status
- `stop_reason`: Stop Reason
- `query`: Task
- `effort`: Effort
- `created_at`: Created At (datetime)
- `completed_at`: Completed At (datetime)
- `cost_total`: Cost (USD) (currency)
- `output_text`: Answer
- `output_structured`: Structured Output
- `citations`: Citations
- `citations[].title`: Title
- `citations[].url`: URL (url)
- `citations[].field`: Supports Field
- `citations[].confidence`: Confidence
- `search_count`: Searches Used (number)
- `agent_compute_units`: Agent Compute Units (number)

### `exa_list_agent_runs`

**List Agent Runs.** Lists the team's Exa Agent runs newest first, returning id, status, query, effort and cost per run plus has_more and next_cursor for paging. Use to find an earlier run id when it was not kept; to read one run's full result use exa_get_agent_run. Returns one page only, so pass next_cursor as Cursor to continue. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `20` | Limit. How many runs to return in this page, 1 to 100. Defaults to 20. |
| `cursor` | string | no |  | Cursor. Leave empty for the first page. To get the next page, paste the Next Cursor value from the previous result. |

Output fields:

- `runs`: Runs
- `runs[].id`: Run ID
- `runs[].status`: Status
- `runs[].stop_reason`: Stop Reason
- `runs[].query`: Task
- `runs[].effort`: Effort
- `runs[].created_at`: Created At (datetime)
- `runs[].completed_at`: Completed At (datetime)
- `runs[].cost_total`: Cost (USD) (currency)
- `count`: Runs in This Page (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `exa_cancel_agent_run`

**Cancel Agent Run.** Cancels a queued or running Exa Agent run immediately, discarding its results; usage accrued before the cancel is still billed. Use to stop spend on a run that is no longer needed; to read a finished run use exa_get_agent_run instead. Safe to retry: a run that already finished is returned unchanged. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `runId` | string | yes |  | Run ID. The ID returned by Start Agent Run (or List Agent Runs), e.g. "agent_run_01k4d9w6y3h7p2m8". |

Output fields:

- `id`: Run ID
- `status`: Status
- `stop_reason`: Stop Reason
- `query`: Task
- `effort`: Effort
- `created_at`: Created At (datetime)
- `completed_at`: Completed At (datetime)
- `cost_total`: Cost (USD) (currency)
- `output_text`: Answer
- `output_structured`: Structured Output
- `citations`: Citations
- `citations[].title`: Title
- `citations[].url`: URL (url)
- `citations[].field`: Supports Field
- `citations[].confidence`: Confidence
- `search_count`: Searches Used (number)
- `agent_compute_units`: Agent Compute Units (number)

### `exa_search`

**Search the Web.** Searches the live web with Exa and returns ranked pages with title, URL, date and optionally page text, highlights or a query-guided summary. Use to discover pages for a topic; use exa_get_contents when the URLs are already known and exa_answer for a direct cited answer. Type sets depth and price (instant $0.004, auto/fast $0.007, deep modes $0.012 to $0.015); the company and people categories reject published-date filters and excludeDomains. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. What to search for, in natural language, e.g. "latest research on solid-state batteries". |
| `type` | string | no | `"auto"` | Search Type. One of 'auto' (default), 'fast', 'instant', 'deep-lite', 'deep', 'deep-reasoning'. Deep modes are slower and cost more. One of `"auto"`, `"fast"`, `"instant"`, `"deep-lite"`, `"deep"`, `"deep-reasoning"`. |
| `category` | string | no |  | Category. Optional focus: 'company', 'people', 'news', 'publication', 'personal site' or 'financial report'. One of `"company"`, `"people"`, `"news"`, `"publication"`, `"personal site"`, `"financial report"`. |
| `numResults` | number | no | `10` | Number of Results. How many results to return, 1 to 100. Defaults to 10; each result above 10 costs $0.001. |
| `includeDomains` | array | no |  | Include Domains. Only return results from these domains or paths, e.g. "arxiv.org" or "example.com/blog". |
| `excludeDomains` | array | no |  | Exclude Domains. Never return results from these domains. Not allowed with the company or people category. |
| `startPublishedDate` | ISO date-time string | no |  | Published After. Only results published after this ISO 8601 date, e.g. "2026-01-01T00:00:00Z". Not allowed with the company or people category. |
| `endPublishedDate` | ISO date-time string | no |  | Published Before. Only results published before this ISO 8601 date. Not allowed with the company or people category. |
| `includeText` | boolean | no | `true` | Include Page Text. Return the page text for each result. |
| `textMaxCharacters` | number | no |  | Max Text Characters. Cap the page text per result, e.g. 2000. Only used when page text is included. |
| `includeHighlights` | boolean | no | `false` | Include Highlights. Return the most relevant snippets from each page. |
| `highlightsQuery` | string | no |  | Highlights Focus. Optional question that steers which snippets are picked. Turns highlights on. |
| `summaryQuery` | string | no |  | Summary Question. Return a per-page AI summary focused on this question, e.g. "What does this company sell?" ($0.001 per page). |
| `maxAgeHours` | number | no |  | Max Content Age (hours). Use cached content only if newer than this many hours; 0 always fetches fresh, -1 always uses cache, max 720. |
| `userLocation` | string | no |  | User Country. Two-letter ISO country code to localize results, e.g. "US". |

Output fields:

- `results`: Results
- `results[].title`: Title
- `results[].url`: URL (url)
- `results[].published_date`: Published Date (date)
- `results[].author`: Author
- `results[].text`: Page Text
- `results[].highlights`: Highlights
- `results[].summary`: Summary
- `results[].image`: Image (image)
- `results[].id`: Document ID
- `count`: Result Count (number)
- `cost_total`: Cost (USD) (currency)

### `exa_get_contents`

**Get Page Contents.** Fetches clean page text, and optionally highlights, a question-guided summary, outgoing links and matching subpages, for URLs you already have, and reports a per-URL status so failed fetches are visible (the call still succeeds when some URLs fail). Use after exa_search or when given URLs; use exa_search to discover pages. Billed $0.001 per page per content type. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `urls` | array | yes |  | URLs. Full URLs to fetch, including https://, e.g. "https://exa.ai/docs". Up to 100. |
| `includeText` | boolean | no | `true` | Include Page Text. Return the page text. |
| `textMaxCharacters` | number | no |  | Max Text Characters. Cap the text per page, e.g. 5000. Only used when page text is included. |
| `includeHighlights` | boolean | no | `false` | Include Highlights. Return the most relevant snippets from each page. |
| `highlightsQuery` | string | no |  | Highlights Focus. Optional question that steers which snippets are picked. Turns highlights on. |
| `summaryQuery` | string | no |  | Summary Question. Return a per-page AI summary focused on this question, e.g. "Who are the founders?". |
| `maxAgeHours` | number | no |  | Max Content Age (hours). Use cached content only if newer than this many hours; 0 always fetches fresh, -1 always uses cache, max 720. |
| `subpages` | number | no |  | Subpages. Also fetch up to this many linked subpages per URL, e.g. 3. |
| `subpageTarget` | string | no |  | Subpage Keyword. Prefer subpages matching this keyword, e.g. "pricing" or "about". |
| `linksPerPage` | number | no |  | Links per Page. Also return up to this many links found on each page. |

Output fields:

- `results`: Pages
- `results[].title`: Title
- `results[].url`: URL (url)
- `results[].published_date`: Published Date (date)
- `results[].author`: Author
- `results[].text`: Page Text
- `results[].highlights`: Highlights
- `results[].summary`: Summary
- `results[].image`: Image (image)
- `results[].id`: Document ID
- `results[].links`: Links on Page
- `results[].subpages`: Subpages
- `results[].subpages[].title`: Title
- `results[].subpages[].url`: URL (url)
- `results[].subpages[].published_date`: Published Date (date)
- `results[].subpages[].author`: Author
- `results[].subpages[].text`: Page Text
- `results[].subpages[].highlights`: Highlights
- `results[].subpages[].summary`: Summary
- `results[].subpages[].image`: Image (image)
- `results[].subpages[].id`: Document ID
- `statuses`: Per-URL Status
- `statuses[].url`: URL (url)
- `statuses[].status`: Status
- `statuses[].source`: Source
- `statuses[].error_tag`: Error
- `statuses[].error_http_status`: HTTP Status (number)
- `failed_count`: Failed URLs (number)
- `cost_total`: Cost (USD) (currency)

### `exa_answer`

**Answer a Question.** Answers a natural-language question from a live Exa web search and returns the answer text with the cited source pages. Use for a quick factual answer with sources in one call ($0.005); use exa_search to get the pages themselves or exa_create_agent_run for multi-step research. Read-only and idempotent, though wording can vary between calls as web data changes. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Question. The question to answer, e.g. "What is the latest stable version of Node.js?". |
| `model` | string | no | `"exa"` | Model. 'exa' (default), 'exa-pro' for harder questions, or 'exa-fast' for lower latency. One of `"exa"`, `"exa-pro"`, `"exa-fast"`. |
| `systemPrompt` | string | no |  | Instructions. Optional guidance for the answer, e.g. "Answer in two sentences and cite official sources only.". |
| `userLocation` | string | no |  | User Country. Two-letter ISO country code to localize the search, e.g. "US". |
| `includeSourceText` | boolean | no | `false` | Include Source Text. Also return the full text of each cited page. |

Output fields:

- `answer`: Answer
- `citations`: Citations
- `citations[].title`: Title
- `citations[].url`: URL (url)
- `citations[].published_date`: Published Date (date)
- `citations[].author`: Author
- `citations[].text`: Page Text
- `citations[].id`: Document ID
- `cost_total`: Cost (USD) (currency)

### `custom_api_call`

**Custom API Call.** Sends an authenticated request to any Exa API path on https://api.exa.ai, for endpoints the other Exa actions do not cover. Takes a relative path or a full api.exa.ai URL, a method, headers, query parameters and an optional body, and returns the HTTP status, headers and body. Not idempotent in general: POST and DELETE change Exa state. Needs authentication.

Kind: write, not safe to repeat.

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

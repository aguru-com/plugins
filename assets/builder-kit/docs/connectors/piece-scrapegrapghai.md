# ScrapeGraphAI

AI-powered web scraping and content extraction.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-scrapegrapghai'
  version: '0.3.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Follow these steps to obtain your ScrapeGraphAI API Key:
>
> 1. Visit [ScrapeGraphAI](https://scrapegraphai.com) and create an account.
> 2. Log in and navigate to your dashboard.
> 3. Locate and copy your API key from the dashboard.

## Actions

### `smart_scraper`

**Smart Scraper.** Fetches a live webpage by URL and uses AI to extract the information described in a natural-language prompt; optionally pass an output schema to shape the result into structured fields. Choose this when you have a public URL and want targeted data from it rather than the full raw page. The page is fetched server-side from the given URL; for HTML you already hold, use Local Scraper instead. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `website_url` | string | yes |  | Website URL. The webpage URL to scrape. |
| `user_prompt` | string | yes |  | Extraction Prompt. Describe what information you want to extract in natural language. |
| `output_schema` | JSON | no |  | Output Schema. Optional schema to structure the output data. |

Output fields:

- `id`: Request ID
- `json`: Extracted Data (an object whose keys vary)
- `raw`: Raw Model Output
- `usage`: Token Usage
- `usage.promptTokens`: Prompt Tokens (number)
- `usage.completionTokens`: Completion Tokens (number)

### `local_scraper`

**Local Scraper.** Uses AI to extract information described in a natural-language prompt from raw HTML you supply directly (max 2MB); optionally pass an output schema to shape the result into structured fields. Choose this when you already have the page HTML in hand and do not want the service to fetch a URL — for a live URL use Smart Scraper instead. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `website_html` | string | yes |  | HTML Content. The HTML content to process (max 2MB). |
| `user_prompt` | string | yes |  | Extraction Prompt. Describe what information you want to extract in natural language. |
| `output_schema` | JSON | no |  | Output Schema. Optional schema to structure the output data. |

Output fields:

- `id`: Request ID
- `json`: Extracted Data (an object whose keys vary)
- `raw`: Raw Model Output
- `usage`: Token Usage
- `usage.promptTokens`: Prompt Tokens (number)
- `usage.completionTokens`: Completion Tokens (number)

### `markdownify`

**Convert to Markdown.** Fetches a webpage by URL and returns its content as clean, readable Markdown. Choose this when you need the whole page as text for an LLM or document rather than a targeted extraction — use Smart Scraper instead when you want specific fields described by a prompt. Requires a public URL; read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `website_url` | string | yes |  | Website URL. The webpage URL to convert to Markdown. |

Output fields:

- `id`: Request ID
- `results`: Results
- `results.markdown`: Markdown
- `results.markdown.data`: Content
- `metadata`: Metadata
- `metadata.contentType`: Content Type

### `scrapegrapghai_scrape_page`

**Scrape Page.** Fetches one public URL and returns it in every selected format in a single call: markdown, HTML, links, images, an AI summary, an AI JSON extraction (with JSON Prompt), branding or a screenshot URL. Pick it for the raw page content; use Extract Data when you only need prompt-driven structured fields. Each format costs credits. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. Public page URL including the scheme, e.g. "https://example.com/pricing". Private and internal addresses are rejected. |
| `formats` | array | yes |  | Formats. Output formats to capture for the page: markdown, html, links, images, summary (AI summary), json (AI extraction, needs JSON Prompt), branding (colors, fonts, logos) or screenshot (pre-signed image URL valid for 1 hour). One of `"markdown"`, `"html"`, `"links"`, `"images"`, `"summary"`, `"json"`, `"branding"`, `"screenshot"`. |
| `mode` | string | no |  | Markdown/HTML Mode. Pre-processing for the markdown and html formats: normal (full page), reader (main article only) or prune (strip boilerplate). Defaults to normal. One of `"normal"`, `"reader"`, `"prune"`. |
| `jsonPrompt` | string | no |  | JSON Prompt. Natural-language description of the data to extract. Required when the json format is selected; ignored otherwise. |
| `jsonSchema` | JSON | no |  | JSON Schema. Optional JSON Schema object the json output must match, e.g. {"type":"object","properties":{"title":{"type":"string"}}}. Only used with the json format. |
| `fetchConfig` | JSON | no |  | Fetch Config. Optional fetch options object: mode ("auto" default, "fast" or "js"), stealth (true for residential proxy, +5 credits), headers (object), cookies (object), scrolls (0-100), wait (ms after load, 0-30000), timeout (ms, 1000-60000), country (ISO 3166-1 alpha-2 code), e.g. {"mode":"js","wait":2000}. |

Output fields:

- `id`: Request ID
- `results`: Results
- `results.markdown`: Markdown
- `results.markdown.data`: Content
- `results.html`: HTML
- `results.html.data`: Content
- `results.links`: Links
- `results.links.data`: URLs
- `results.links.metadata`: Metadata
- `results.links.metadata.count`: Count (number)
- `results.images`: Images
- `results.images.data`: URLs
- `results.images.metadata`: Metadata
- `results.images.metadata.count`: Count (number)
- `results.summary`: Summary
- `results.summary.data`: Summary
- `results.json`: JSON
- `results.json.data`: Extracted Data (an object whose keys vary)
- `results.branding`: Branding
- `results.branding.data`: Branding
- `results.branding.data.colorScheme`: Color Scheme
- `results.branding.data.colors`: Colors
- `results.branding.data.colors.primary`: Primary
- `results.branding.data.colors.accent`: Accent
- `results.branding.data.colors.background`: Background
- `results.branding.data.colors.textPrimary`: Text Primary
- `results.branding.data.colors.link`: Link
- `results.branding.data.fonts`: Fonts
- `results.branding.data.fonts[].family`: Family
- `results.branding.data.fonts[].role`: Role
- `results.branding.data.typography`: Typography
- `results.branding.data.typography.fontFamilies`: Font Families
- `results.branding.data.typography.fontStacks`: Font Stacks
- `results.branding.data.typography.fontSizes`: Font Sizes
- `results.branding.data.spacing`: Spacing
- `results.branding.data.spacing.baseUnit`: Base Unit (number)
- `results.branding.data.spacing.borderRadius`: Border Radius
- `results.branding.data.components`: Components
- `results.branding.data.components.input`: Input
- `results.branding.data.components.buttonPrimary`: Primary Button
- `results.branding.data.components.buttonSecondary`: Secondary Button
- `results.branding.data.images`: Images
- `results.branding.data.images.logo`: Logo (image)
- `results.branding.data.images.favicon`: Favicon (image)
- `results.branding.data.images.ogImage`: Open Graph Image (image)
- `results.branding.data.personality`: Personality
- `results.branding.data.personality.tone`: Tone
- `results.branding.data.personality.energy`: Energy
- `results.branding.data.personality.targetAudience`: Target Audience
- `results.branding.data.designSystem`: Design System
- `results.branding.data.designSystem.framework`: Framework
- `results.branding.data.designSystem.componentLibrary`: Component Library
- `results.branding.data.confidence`: Confidence
- `results.branding.data.confidence.overall`: Overall (number)
- `results.branding.metadata`: Page Metadata
- `results.branding.metadata.branding`: Page
- `results.branding.metadata.branding.title`: Title
- `results.branding.metadata.branding.description`: Description
- `results.branding.metadata.branding.favicon`: Favicon (image)
- `results.branding.metadata.branding.language`: Language
- `results.branding.metadata.branding.themeColor`: Theme Color
- `results.branding.metadata.branding.ogTitle`: Open Graph Title
- `results.branding.metadata.branding.ogDescription`: Open Graph Description
- `results.branding.metadata.branding.ogImage`: Open Graph Image (image)
- `results.branding.metadata.branding.ogUrl`: Open Graph URL (url)
- `results.screenshot`: Screenshot
- `results.screenshot.data`: Screenshot
- `results.screenshot.data.url`: Image URL (image)
- `results.screenshot.data.width`: Width (number)
- `results.screenshot.data.height`: Height (number)
- `metadata`: Metadata
- `metadata.contentType`: Content Type

### `scrapegrapghai_extract_data`

**Extract Data.** Uses AI to extract the data described in a prompt from exactly one source: a public URL (fetched server-side), raw HTML or markdown you already have (max 2 MB). Pass a JSON Schema to force the output shape. Returns the result under `json`; use Scrape Page instead for whole-page content. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | no |  | URL. Public page URL to fetch and extract from. Provide exactly one of URL, HTML or Markdown. |
| `html` | string | no |  | HTML. Raw HTML to extract from (max 2 MB). Provide exactly one of URL, HTML or Markdown. |
| `markdown` | string | no |  | Markdown. Markdown text to extract from (max 2 MB). Provide exactly one of URL, HTML or Markdown. |
| `prompt` | string | yes |  | Prompt. Natural-language description of what to extract, e.g. "the product name and price". |
| `schema` | JSON | no |  | Schema. Optional JSON Schema object the output must match. |
| `mode` | string | no |  | HTML Mode. Pre-processing of the source: normal, reader (main article only) or prune (strip boilerplate). Defaults to normal. One of `"normal"`, `"reader"`, `"prune"`. |
| `fetchConfig` | JSON | no |  | Fetch Config. Optional fetch options object: mode ("auto" default, "fast" or "js"), stealth (true for residential proxy, +5 credits), headers (object), cookies (object), scrolls (0-100), wait (ms after load, 0-30000), timeout (ms, 1000-60000), country (ISO 3166-1 alpha-2 code), e.g. {"mode":"js","wait":2000}. |

Output fields:

- `id`: Request ID
- `json`: Extracted Data (an object whose keys vary)
- `raw`: Raw Model Output
- `usage`: Token Usage
- `usage.promptTokens`: Prompt Tokens (number)
- `usage.completionTokens`: Completion Tokens (number)

### `scrapegrapghai_search_web`

**Search the Web.** Runs a web search and returns the top results (1-20, default 3) with each page's content inline. Add a prompt (and optional schema) to also get one AI extraction across all results under `json`. Costs 2 credits per result, or 5 with a prompt. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. The search query, e.g. "scrapegraphai pricing". |
| `numResults` | number | no |  | Number of Results. How many results to fetch, 1-20. Defaults to 3. |
| `prompt` | string | no |  | Prompt. Optional extraction prompt run across all fetched results; the answer is returned under `json`. |
| `schema` | JSON | no |  | Schema. Optional JSON Schema object for the extraction output. Requires Prompt. |
| `format` | string | no |  | Content Format. Format of each result's inline content. Defaults to markdown. One of `"markdown"`, `"html"`. |
| `timeRange` | string | no |  | Time Range. Only return results published within this window. Defaults to any time. One of `"past_hour"`, `"past_24_hours"`, `"past_week"`, `"past_month"`, `"past_year"`. |
| `locationGeoCode` | string | no |  | Country. ISO 3166-1 alpha-2 country code for localized results, e.g. "us" or "it". |
| `fetchConfig` | JSON | no |  | Fetch Config. Optional fetch options object: mode ("auto" default, "fast" or "js"), stealth (true for residential proxy, +5 credits), headers (object), cookies (object), scrolls (0-100), wait (ms after load, 0-30000), timeout (ms, 1000-60000), country (ISO 3166-1 alpha-2 code), e.g. {"mode":"js","wait":2000}. |

Output fields:

- `id`: Request ID
- `results`: Results
- `results[].url`: URL (url)
- `results[].title`: Title
- `results[].content`: Content
- `json`: Extracted Data (an object whose keys vary)
- `raw`: Raw Model Output
- `usage`: Token Usage
- `usage.promptTokens`: Prompt Tokens (number)
- `usage.completionTokens`: Completion Tokens (number)
- `metadata`: Metadata
- `metadata.pages`: Pages
- `metadata.pages.requested`: Requested (number)
- `metadata.pages.scraped`: Scraped (number)

### `scrapegrapghai_start_crawl`

**Start Crawl.** Starts an asynchronous crawl from a URL and returns the job `id` immediately, without waiting. Poll it with Get Crawl until status is completed or failed (a crawl halted with Stop Crawl reads paused), then read content with List Crawl Pages. Uses one of the plan's crawl job slots and 2 credits plus the per-page scrape cost. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. Starting URL of the crawl, including the scheme. |
| `formats` | array | no |  | Formats. Output formats to capture for the page: markdown, html, links, images, summary (AI summary), json (AI extraction, needs JSON Prompt), branding (colors, fonts, logos) or screenshot (pre-signed image URL valid for 1 hour). One of `"markdown"`, `"html"`, `"links"`, `"images"`, `"summary"`, `"json"`, `"branding"`, `"screenshot"`. |
| `mode` | string | no |  | Markdown/HTML Mode. Pre-processing for the markdown and html formats: normal (full page), reader (main article only) or prune (strip boilerplate). Defaults to normal. One of `"normal"`, `"reader"`, `"prune"`. |
| `jsonPrompt` | string | no |  | JSON Prompt. Natural-language description of the data to extract. Required when the json format is selected; ignored otherwise. |
| `jsonSchema` | JSON | no |  | JSON Schema. Optional JSON Schema object the json output must match, e.g. {"type":"object","properties":{"title":{"type":"string"}}}. Only used with the json format. |
| `maxPages` | number | no |  | Max Pages. Maximum number of pages to crawl. |
| `maxDepth` | number | no |  | Max Depth. How many levels of links to follow from the starting URL. |
| `maxLinksPerPage` | number | no |  | Max Links per Page. Cap on links followed from each page. |
| `allowExternal` | boolean | no |  | Allow External Links. Follow links to other domains. Defaults to false. |
| `includePatterns` | array | no |  | Include Patterns. Glob URL patterns to include, e.g. ["/blog/*"]. |
| `excludePatterns` | array | no |  | Exclude Patterns. Glob URL patterns to skip, e.g. ["/admin/*"]. |
| `fetchConfig` | JSON | no |  | Fetch Config. Optional fetch options object: mode ("auto" default, "fast" or "js"), stealth (true for residential proxy, +5 credits), headers (object), cookies (object), scrolls (0-100), wait (ms after load, 0-30000), timeout (ms, 1000-60000), country (ISO 3166-1 alpha-2 code), e.g. {"mode":"js","wait":2000}. |

Output fields:

- `id`: Crawl ID
- `status`: Status
- `total`: Total Pages (number)
- `finished`: Finished Pages (number)
- `pages`: Pages

### `scrapegrapghai_get_crawl`

**Get Crawl.** Reads a crawl job once: status (running, completed, failed, or paused after Stop Crawl), page counters and lightweight per-page metadata with each page's `scrapeRefId`. Call it repeatedly to poll a job from Start Crawl; it never waits. Page content comes from List Crawl Pages. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `crawlId` | string | yes |  | Crawl ID. Crawl job UUID, returned as `id` by Start Crawl. |

Output fields:

- `id`: Crawl ID
- `status`: Status
- `reason`: Reason
- `total`: Total Pages (number)
- `finished`: Finished Pages (number)
- `pages`: Pages
- `pages[].url`: URL (url)
- `pages[].title`: Title
- `pages[].status`: Status
- `pages[].depth`: Depth (number)
- `pages[].parentUrl`: Parent URL (url)
- `pages[].contentType`: Content Type
- `pages[].links`: Links
- `pages[].scrapeRefId`: Scrape Request ID

### `scrapegrapghai_list_crawl_pages`

**List Crawl Pages.** Returns one slice of a crawl job's pages with each page's scraped content resolved under `scrape`. Pass `pagination.nextCursor` from the previous call as Cursor to get the next slice; it is null when there are no more. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `crawlId` | string | yes |  | Crawl ID. Crawl job UUID, returned as `id` by Start Crawl. |
| `limit` | number | no |  | Limit. Pages to return, 1-100. Defaults to 50. |
| `cursor` | number | no |  | Cursor. Zero-based page index to start from, from `pagination.nextCursor`. Defaults to 0. |

Output fields:

- `data`: Pages
- `data[].url`: URL (url)
- `data[].title`: Title
- `data[].status`: Status
- `data[].depth`: Depth (number)
- `data[].parentUrl`: Parent URL (url)
- `data[].contentType`: Content Type
- `data[].links`: Links
- `data[].scrapeRefId`: Scrape Request ID
- `data[].scrape`: Scrape Result
- `data[].scrape.results`: Results by Format (an object whose keys vary)
- `data[].scrape.metadata`: Metadata
- `data[].scrape.metadata.contentType`: Content Type
- `pagination`: Pagination
- `pagination.limit`: Limit (number)
- `pagination.nextCursor`: Next Cursor

### `scrapegrapghai_stop_crawl`

**Stop Crawl.** Stops a running crawl from Start Crawl; its status becomes "paused", pages already fetched stay available and no new URLs are followed. Resume it with Resume Crawl. A crawl that already finished returns a 410 "Crawl session expired" error. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `crawlId` | string | yes |  | Crawl ID. Crawl job UUID, returned as `id` by Start Crawl. |

Output fields:

- `ok`: Success (boolean)

### `scrapegrapghai_resume_crawl`

**Resume Crawl.** Resumes a crawl stopped with Stop Crawl from where it left off. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `crawlId` | string | yes |  | Crawl ID. Crawl job UUID, returned as `id` by Start Crawl. |

Output fields:

- `ok`: Success (boolean)

### `scrapegrapghai_delete_crawl`

**Delete Crawl.** Permanently deletes a crawl job's stored pages; this cannot be undone. Get Crawl then returns the job with status "deleted" and no pages. Use Stop Crawl instead to only halt it. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `crawlId` | string | yes |  | Crawl ID. Crawl job UUID, returned as `id` by Start Crawl. |

Output fields:

- `ok`: Success (boolean)

### `scrapegrapghai_create_monitor`

**Create Monitor.** Creates a monitor that fetches a URL on a cron schedule, captures it in the chosen formats and records what changed between runs, optionally posting each run to a webhook. Returns the monitor with its `cronId`. Uses one of the plan's monitor slots. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. Public page URL to watch, including the scheme. |
| `interval` | string | yes |  | Interval. 5-field cron expression in UTC for how often to fetch, e.g. "*/30 * * * *" (every 30 minutes) or "0 9 * * 1" (Mondays 09:00). |
| `name` | string | no |  | Name. Human-readable monitor name, e.g. "Pricing page watch". |
| `formats` | array | no |  | Formats. Output formats to capture for the page: markdown, html, links, images, summary (AI summary), json (AI extraction, needs JSON Prompt), branding (colors, fonts, logos) or screenshot (pre-signed image URL valid for 1 hour). One of `"markdown"`, `"html"`, `"links"`, `"images"`, `"summary"`, `"json"`, `"branding"`, `"screenshot"`. |
| `mode` | string | no |  | Markdown/HTML Mode. Pre-processing for the markdown and html formats: normal (full page), reader (main article only) or prune (strip boilerplate). Defaults to normal. One of `"normal"`, `"reader"`, `"prune"`. |
| `jsonPrompt` | string | no |  | JSON Prompt. Natural-language description of the data to extract. Required when the json format is selected; ignored otherwise. |
| `jsonSchema` | JSON | no |  | JSON Schema. Optional JSON Schema object the json output must match, e.g. {"type":"object","properties":{"title":{"type":"string"}}}. Only used with the json format. |
| `webhookUrl` | string | no |  | Webhook URL. Optional URL that receives a POST with the captured payload on every tick. |
| `fetchConfig` | JSON | no |  | Fetch Config. Optional fetch options object: mode ("auto" default, "fast" or "js"), stealth (true for residential proxy, +5 credits), headers (object), cookies (object), scrolls (0-100), wait (ms after load, 0-30000), timeout (ms, 1000-60000), country (ISO 3166-1 alpha-2 code), e.g. {"mode":"js","wait":2000}. |

Output fields:

- `cronId`: Monitor ID
- `scheduleId`: Schedule ID
- `status`: Status
- `interval`: Interval
- `reason`: Reason
- `consecutiveFailures`: Consecutive Failures (number)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `scrapegrapghai_list_monitors`

**List Monitors.** Returns every monitor on the account with its `cronId`, status (active or paused), schedule and config. Takes no filters or paging. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `monitors`: Monitors
- `monitors[].cronId`: Monitor ID
- `monitors[].scheduleId`: Schedule ID
- `monitors[].status`: Status
- `monitors[].interval`: Interval
- `monitors[].reason`: Reason
- `monitors[].consecutiveFailures`: Consecutive Failures (number)
- `monitors[].createdAt`: Created At (datetime)
- `monitors[].updatedAt`: Updated At (datetime)
- `count`: Count (number)

### `scrapegrapghai_get_monitor`

**Get Monitor.** Returns one monitor with its status, schedule, failure count and full config. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `monitorId` | string | yes |  | Monitor ID. Monitor UUID, returned as `cronId` by Create Monitor or List Monitors. |

Output fields:

- `cronId`: Monitor ID
- `scheduleId`: Schedule ID
- `status`: Status
- `interval`: Interval
- `reason`: Reason
- `consecutiveFailures`: Consecutive Failures (number)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `scrapegrapghai_update_monitor`

**Update Monitor.** Changes only the fields you set on a monitor: interval, name, formats, webhook URL or fetch options. The watched URL cannot be changed; create a new monitor for a different page. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `monitorId` | string | yes |  | Monitor ID. Monitor UUID, returned as `cronId` by Create Monitor or List Monitors. |
| `interval` | string | no |  | Interval. 5-field cron expression in UTC for how often to fetch, e.g. "*/30 * * * *" (every 30 minutes) or "0 9 * * 1" (Mondays 09:00). |
| `name` | string | no |  | Name. Human-readable monitor name, e.g. "Pricing page watch". |
| `formats` | array | no |  | Formats. Output formats to capture for the page: markdown, html, links, images, summary (AI summary), json (AI extraction, needs JSON Prompt), branding (colors, fonts, logos) or screenshot (pre-signed image URL valid for 1 hour). One of `"markdown"`, `"html"`, `"links"`, `"images"`, `"summary"`, `"json"`, `"branding"`, `"screenshot"`. |
| `mode` | string | no |  | Markdown/HTML Mode. Pre-processing for the markdown and html formats: normal (full page), reader (main article only) or prune (strip boilerplate). Defaults to normal. One of `"normal"`, `"reader"`, `"prune"`. |
| `jsonPrompt` | string | no |  | JSON Prompt. Natural-language description of the data to extract. Required when the json format is selected; ignored otherwise. |
| `jsonSchema` | JSON | no |  | JSON Schema. Optional JSON Schema object the json output must match, e.g. {"type":"object","properties":{"title":{"type":"string"}}}. Only used with the json format. |
| `webhookUrl` | string | no |  | Webhook URL. Optional URL that receives a POST with the captured payload on every tick. |
| `fetchConfig` | JSON | no |  | Fetch Config. Optional fetch options object: mode ("auto" default, "fast" or "js"), stealth (true for residential proxy, +5 credits), headers (object), cookies (object), scrolls (0-100), wait (ms after load, 0-30000), timeout (ms, 1000-60000), country (ISO 3166-1 alpha-2 code), e.g. {"mode":"js","wait":2000}. |

Output fields:

- `cronId`: Monitor ID
- `scheduleId`: Schedule ID
- `status`: Status
- `interval`: Interval
- `reason`: Reason
- `consecutiveFailures`: Consecutive Failures (number)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `scrapegrapghai_pause_monitor`

**Pause Monitor.** Pauses a monitor: future runs stop but the monitor and its history are kept. Undo with Resume Monitor. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `monitorId` | string | yes |  | Monitor ID. Monitor UUID, returned as `cronId` by Create Monitor or List Monitors. |

Output fields:

- `cronId`: Monitor ID
- `scheduleId`: Schedule ID
- `status`: Status
- `interval`: Interval
- `reason`: Reason
- `consecutiveFailures`: Consecutive Failures (number)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `scrapegrapghai_resume_monitor`

**Resume Monitor.** Puts a paused monitor back on its schedule immediately. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `monitorId` | string | yes |  | Monitor ID. Monitor UUID, returned as `cronId` by Create Monitor or List Monitors. |

Output fields:

- `cronId`: Monitor ID
- `scheduleId`: Schedule ID
- `status`: Status
- `interval`: Interval
- `reason`: Reason
- `consecutiveFailures`: Consecutive Failures (number)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `scrapegrapghai_delete_monitor`

**Delete Monitor.** Permanently deletes a monitor and all its run history; this cannot be undone. Use Pause Monitor to only stop it. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `monitorId` | string | yes |  | Monitor ID. Monitor UUID, returned as `cronId` by Create Monitor or List Monitors. |

Output fields:

- `ok`: Success (boolean)

### `scrapegrapghai_list_monitor_activity`

**List Monitor Activity.** Returns a monitor's recent runs, newest first, each with status, duration, whether the page changed and per-format diffs. Each run `id` can be passed to Get History Entry for the captured content. Pass `nextCursor` as Cursor for older runs. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `monitorId` | string | yes |  | Monitor ID. Monitor UUID, returned as `cronId` by Create Monitor or List Monitors. |
| `limit` | number | no |  | Limit. Runs to return, 1-100. Defaults to 20. |
| `cursor` | string | no |  | Cursor. The `nextCursor` timestamp from the previous call, to fetch older runs. |

Output fields:

- `ticks`: Runs
- `ticks[].id`: Run ID
- `ticks[].status`: Status
- `ticks[].changed`: Changed (boolean)
- `ticks[].diffs`: Diffs (an object whose keys vary)
- `ticks[].elapsedMs`: Elapsed (ms) (number)
- `ticks[].createdAt`: Created At (datetime)
- `nextCursor`: Next Cursor

### `scrapegrapghai_list_history`

**List History.** Lists past requests on the account, newest first, with their params, status and full result. Filter by service or by session ID (partial, case-insensitive). Page through with Page; `pagination.total` is the total match count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `service` | string | no |  | Service. Only return requests from this service. Defaults to all. One of `"scrape"`, `"extract"`, `"search"`, `"monitor"`, `"crawl"`. |
| `sessionId` | string | no |  | Session ID. Only return requests whose session ID contains this text (case-insensitive). |
| `page` | number | no |  | Page. Page number, starting at 1. Defaults to 1. |
| `limit` | number | no |  | Limit. Entries per page. Defaults to 20. |

Output fields:

- `data`: Requests
- `data[].id`: Request ID
- `data[].service`: Service
- `data[].status`: Status
- `data[].params`: Request Params (an object whose keys vary)
- `data[].result`: Result (an object whose keys vary)
- `data[].error`: Error
- `data[].elapsedMs`: Elapsed (ms) (number)
- `data[].requestParentId`: Parent Request ID
- `data[].sessionId`: Session ID
- `data[].userId`: User ID
- `data[].workspaceId`: Workspace ID
- `data[].createdAt`: Created At (datetime)
- `pagination`: Pagination
- `pagination.page`: Page (number)
- `pagination.limit`: Limit (number)
- `pagination.total`: Total (number)

### `scrapegrapghai_get_history_entry`

**Get History Entry.** Returns one past request with its params, status and full result. The ID is the `id` returned by Scrape Page, Extract Data or Search the Web, a page `scrapeRefId` from Get Crawl, or a run `id` from List Monitor Activity. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `requestId` | string | yes |  | Request ID. UUID of the request: `id` from Scrape Page, Extract Data or Search the Web, `scrapeRefId` from Get Crawl, or a run `id` from List Monitor Activity. |

Output fields:

- `id`: Request ID
- `service`: Service
- `status`: Status
- `params`: Request Params (an object whose keys vary)
- `result`: Result (an object whose keys vary)
- `error`: Error
- `elapsedMs`: Elapsed (ms) (number)
- `requestParentId`: Parent Request ID
- `sessionId`: Session ID
- `userId`: User ID
- `workspaceId`: Workspace ID
- `createdAt`: Created At (datetime)

### `scrapegrapghai_get_credits`

**Get Credits.** Returns remaining and used credits, the plan name, and crawl and monitor job slots used vs the plan limit. Free to call; use it before a large batch. Takes no inputs. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `remaining`: Remaining Credits (number)
- `used`: Used Credits (number)
- `plan`: Plan
- `jobs`: Job Slots
- `jobs.crawl`: Crawl
- `jobs.crawl.used`: Used (number)
- `jobs.crawl.limit`: Limit (number)
- `jobs.monitor`: Monitor
- `jobs.monitor.used`: Used (number)
- `jobs.monitor.limit`: Limit (number)

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

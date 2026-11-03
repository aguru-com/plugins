# Firecrawl

The context API to search, scrape, and interact with the web at scale.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-firecrawl'
  version: '0.6.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Follow these steps to obtain your Firecrawl API Key:
>
> 1. Sign in or create an account at [Firecrawl](https://www.firecrawl.dev/app/api-keys?utm_source=activepieces&utm_medium=integration).
> 2. Copy your API key from the API Keys page.

## Actions

### `scrape`

**Scrape Website.** Fetches the content of a single web page and returns it in a chosen format (markdown, HTML, links, summary, screenshot, or AI-extracted JSON). Choose this to read one specific URL; for many pages use Crawl, and for a structured data pull across several known URLs use Extract Structured Data. Optionally runs browser actions (click, type, wait, screenshot) before scraping. Read-only against the target, so repeating the same call is safe. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Website URL. The webpage URL to scrape. |
| `timeout` | number | no | `60000` | Timeout (ms). Maximum time to wait for the page to load (in milliseconds). |
| `storeInCache` | boolean | no | `false` | Store In Cache. If enabled, the page will be stored in the Firecrawl index and cache. Disabling this is useful if your scraping activity may have data protection concerns. |
| `useActions` | boolean | no | `false` | Perform Actions Before Scraping. Enable to perform a sequence of actions on the page before scraping (like clicking buttons, filling forms, etc.). See [Firecrawl Actions Documentation](https://docs.firecrawl.dev/api-reference/endpoint/scrape#body-actions) for details on available actions and their parameters. |
| `actionProperties` | object | no |  | Action Properties. Properties for actions that will be performed on the page. An object whose fields depend on other inputs; the product shows them. |
| `formats` | string | yes | `"markdown"` | Output Format. Choose what format you want your output in. A value the product loads from the provider, such as an id; write the value itself. |
| `extractPrompt` | object | no |  | Extraction Prompt. Prompt for extracting data. An object whose fields depend on other inputs; the product shows them. |
| `extractMode` | object | no |  | Schema Mode. Data schema type. An object whose fields depend on other inputs; the product shows them. |
| `extractSchema` | object | no |  | Data Definition. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.markdown`: Markdown
- `data.html`: HTML (html)
- `data.rawHtml`: Raw HTML (html)
- `data.links`: Links
- `data.summary`: Summary
- `data.screenshot`: Screenshot
- `data.screenshot.fileName`: File Name
- `data.screenshot.fileUrl`: File URL (url)
- `data.actions`: Actions
- `data.actions.pdfs`: PDF
- `data.actions.pdfs[].fileName`: File Name
- `data.actions.pdfs[].fileUrl`: File URL (url)
- `data.actions.screenshots`: Screenshots
- `data.actions.screenshots[].fileName`: File Name
- `data.actions.screenshots[].fileUrl`: File URL (url)
- `data.actions.javascriptReturns`: JavaScript Returns
- `data.actions.javascriptReturns[].type`: Type
- `data.actions.javascriptReturns[].value`: Value
- `data.actions.scrapes`: Scrapes
- `data.actions.scrapes[].url`: URL (url)
- `data.actions.scrapes[].html`: HTML (html)
- `data.warning`: Warning
- `data.metadata`: Metadata
- `data.metadata.title`: Title
- `data.metadata.language`: Language
- `data.metadata.sourceURL`: Source URL (url)
- `data.metadata.url`: Final URL (url)
- `data.metadata.statusCode`: Status Code (number)
- `data.metadata.favicon`: Favicon (image)
- `data.metadata.creditsUsed`: Credits Used (number)

### `extract`

**Extract Structured Data.** Pulls structured data from one or more known URLs by running an AI extraction against a natural-language prompt and a field schema (simple field list or advanced JSON Schema). Choose this when you need specific typed values from pages you already have URLs for; use Scrape to read raw page content or Map to discover URLs first. Runs as a polled job bounded by the timeout; read-only against the sites, so repeating the same request is safe. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `urls` | array | yes |  | URLs. Add one or more URLs to extract data from. Each item: { `url` }. |
| `prompt` | string | no | `"Extract the following data from the provided content."` | Extraction Prompt. Describe what information you want to extract. |
| `enableWebSearch` | boolean | no | `false` | Enable Web Search. Enable web search to find additional context. |
| `timeout` | number | no | `300` | Timeout (seconds). Timeout in seconds after which the task will be cancelled. |
| `mode` | string | yes | `"simple"` | Data Schema Type. For complex schema, you can use advanced mode. One of `"simple"`, `"advanced"`. |
| `schema` | object | yes |  | Data Definition. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `status`: Status
- `expiresAt`: Expires At (datetime)
- `tokensUsed`: Tokens Used (number)
- `creditsUsed`: Credits Used (number)
- `warnings`: Warnings

### `crawl`

**Crawl.** Starts from a base URL, discovers and follows links across the site, and returns the content of many pages in a chosen format (markdown, HTML, links, summary, screenshot, or AI-extracted JSON). Choose this to gather content from a whole site or section; use Scrape for a single page or Map to only list URLs without fetching content. Bounded by the page limit and timeout, and can deliver results to a webhook. Read-only against the site, so re-running the same call is safe. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The base URL to start crawling from. |
| `prompt` | string | no | `"Get me all of the blog pages on the website, probably localed in /blog"` | Prompt. Describe what information you want to extract. |
| `limit` | number | no | `10` | Limit. Maximum number of pages to crawl. Default limit is 10. |
| `formats` | string | yes | `"markdown"` | Output Format. Choose what format you want your output in. A value the product loads from the provider, such as an id; write the value itself. |
| `onlyMainContent` | boolean | no | `false` | Only Main Content. Only return the main content of the page, excluding headers, navs, footers, etc. |
| `extractMode` | object | no |  | Schema Mode. Data schema type. An object whose fields depend on other inputs; the product shows them. |
| `extractSchema` | object | no |  | Data Definition. An object whose fields depend on other inputs; the product shows them. |
| `timeout` | number | no | `300` | Timeout (seconds). Timeout in seconds after which the task will be cancelled. |
| `useWebhook` | boolean | no | `false` | Deliver Results to Webhook. Enable to send crawl results to a webhook URL. |
| `webhookProperties` | object | no |  | Webhook Properties. Properties for webhook configuration. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `status`: Status
- `completed`: Completed (number)
- `total`: Total (number)
- `creditsUsed`: Credits Used (number)
- `expiresAt`: Expires At (datetime)
- `next`: Next Page URL (url)
- `data`: Pages
- `data[].markdown`: Markdown
- `data[].html`: HTML (html)
- `data[].rawHtml`: Raw HTML (html)
- `data[].links`: Links
- `data[].summary`: Summary
- `data[].screenshot`: Screenshot
- `data[].screenshot.fileName`: File Name
- `data[].screenshot.fileUrl`: File URL (url)
- `data[].warning`: Warning
- `data[].metadata`: Metadata
- `data[].metadata.title`: Title
- `data[].metadata.language`: Language
- `data[].metadata.sourceURL`: Source URL (url)
- `data[].metadata.url`: Final URL (url)
- `data[].metadata.statusCode`: Status Code (number)
- `data[].metadata.favicon`: Favicon (image)
- `data[].metadata.creditsUsed`: Credits Used (number)
- `data[].screenshotError`: Screenshot Error

### `crawlResults`

**Crawl Results.** Looks up the status and accumulated page results of a previously started crawl job by its crawl ID. Choose this to poll or fetch the output of a Crawl run that delivered an ID rather than waiting inline. Requires a valid crawl ID; it is a read-only lookup, so repeating the call is safe. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `crawlId` | string | yes |  | Crawl ID. The ID of the crawl job to check. |

Output fields:

- `success`: Success (boolean)
- `status`: Status
- `completed`: Completed (number)
- `total`: Total (number)
- `creditsUsed`: Credits Used (number)
- `expiresAt`: Expires At (datetime)
- `next`: Next Page URL (url)
- `data`: Pages
- `data[].markdown`: Markdown
- `data[].html`: HTML (html)
- `data[].rawHtml`: Raw HTML (html)
- `data[].links`: Links
- `data[].summary`: Summary
- `data[].screenshot`: Screenshot
- `data[].screenshot.fileName`: File Name
- `data[].screenshot.fileUrl`: File URL (url)
- `data[].warning`: Warning
- `data[].metadata`: Metadata
- `data[].metadata.title`: Title
- `data[].metadata.language`: Language
- `data[].metadata.sourceURL`: Source URL (url)
- `data[].metadata.url`: Final URL (url)
- `data[].metadata.statusCode`: Status Code (number)
- `data[].metadata.favicon`: Favicon (image)
- `data[].metadata.creditsUsed`: Credits Used (number)

### `map`

**Map Websites.** Discovers and returns the list of URLs reachable from a given website, optionally including subdomains, up to a configurable limit. Choose this for fast site-map / link discovery when you only need the URLs and not page content; follow with Scrape, Crawl, or Extract to fetch the pages. Read-only against the site, so repeating the call is safe. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Main Website URL. The webpage URL to start scraping from. |
| `subdomain` | boolean | no | `false` | Include subdomain. Include and crawl pages from subdomains of the target website (e.g., blog.example.com, shop.example.com) in addition to the main domain. |
| `limit` | number | no | `5000` | Limit. Maximum number of links to return (max: 100,000) |

Output fields:

- `success`: Success (boolean)
- `links`: Links

### `scrape_url`

**Scrape URL.** Fetches one web page and returns its content in the requested format (markdown, html, rawHtml, links, summary, or screenshot). Pick this when you already have the exact URL of a single page; use Crawl Website for a whole site, Batch Scrape for a known list of URLs, Map Website to only enumerate links, or Extract Data when you need typed/structured fields. Read-only against the target, so repeating the call is safe. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The exact web page URL to scrape (e.g. https://example.com/about). Obtain candidate URLs from Search Web or Map Website if you do not already have one. |
| `format` | string | no | `"markdown"` | Output Format. Which representation of the page to return. One of `"markdown"`, `"html"`, `"rawHtml"`, `"links"`, `"summary"`, `"screenshot"`. |
| `onlyMainContent` | boolean | no | `true` | Only Main Content. Return only the main content of the page, excluding headers, navs, footers, etc. |
| `timeout` | number | no | `60000` | Timeout (ms). Maximum time to wait for the page to load, in milliseconds. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.markdown`: Markdown
- `data.html`: HTML (html)
- `data.rawHtml`: Raw HTML (html)
- `data.links`: Links
- `data.summary`: Summary
- `data.screenshot`: Screenshot
- `data.screenshot.fileName`: File Name
- `data.screenshot.fileUrl`: File URL (url)
- `data.warning`: Warning
- `data.metadata`: Metadata
- `data.metadata.title`: Title
- `data.metadata.language`: Language
- `data.metadata.sourceURL`: Source URL (url)
- `data.metadata.url`: Final URL (url)
- `data.metadata.statusCode`: Status Code (number)
- `data.metadata.favicon`: Favicon (image)
- `data.metadata.creditsUsed`: Credits Used (number)

### `crawl_website`

**Crawl Website.** Starts at a base URL, follows links across the site, and returns the content of many pages in one chosen format. Pick this to gather a whole site or section; use Scrape URL for a single page, Map Website to only list URLs without content, or Batch Scrape for a fixed list of known URLs. Runs as a job polled inline up to the timeout (long crawls may hit the action time limit); read-only against the site, so re-running is safe. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The base URL to start crawling from (e.g. https://example.com). Obtain it from Search Web or Map Website if needed. |
| `limit` | number | no | `10` | Page Limit. Maximum number of pages to crawl. |
| `format` | string | no | `"markdown"` | Output Format. Which representation of each page to return. One of `"markdown"`, `"html"`, `"links"`, `"summary"`. |
| `onlyMainContent` | boolean | no | `true` | Only Main Content. Return only the main content of each page, excluding headers, navs, footers, etc. |
| `timeout` | number | no | `300` | Timeout (seconds). Seconds to poll for completion before giving up. Keep well under the action time limit for large crawls; for big jobs prefer Crawl Website with a smaller limit or poll separately via Get Crawl Results. |

Output fields:

- `success`: Success (boolean)
- `status`: Status
- `completed`: Completed (number)
- `total`: Total (number)
- `creditsUsed`: Credits Used (number)
- `expiresAt`: Expires At (datetime)
- `next`: Next Page URL (url)
- `data`: Pages
- `data[].markdown`: Markdown
- `data[].html`: HTML (html)
- `data[].rawHtml`: Raw HTML (html)
- `data[].links`: Links
- `data[].summary`: Summary
- `data[].screenshot`: Screenshot
- `data[].screenshot.fileName`: File Name
- `data[].screenshot.fileUrl`: File URL (url)
- `data[].warning`: Warning
- `data[].metadata`: Metadata
- `data[].metadata.title`: Title
- `data[].metadata.language`: Language
- `data[].metadata.sourceURL`: Source URL (url)
- `data[].metadata.url`: Final URL (url)
- `data[].metadata.statusCode`: Status Code (number)
- `data[].metadata.favicon`: Favicon (image)
- `data[].metadata.creditsUsed`: Credits Used (number)

### `get_crawl_results`

**Get Crawl Results.** Looks up the status and accumulated page results of a previously started crawl job by its crawl ID. Pick this to poll or fetch the output of a crawl that returned an ID instead of waiting inline; use List Active Crawls to discover a crawl ID you do not have, Get Crawl Errors to see which URLs failed, or Cancel Crawl to stop one. Read-only, so repeating the call is safe. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `crawlId` | string | yes |  | Crawl ID. The ID of the crawl job to check. Obtain it from the Crawl Website action result or from List Active Crawls. |

Output fields:

- `success`: Success (boolean)
- `status`: Status
- `completed`: Completed (number)
- `total`: Total (number)
- `creditsUsed`: Credits Used (number)
- `expiresAt`: Expires At (datetime)
- `next`: Next Page URL (url)
- `data`: Pages
- `data[].markdown`: Markdown
- `data[].html`: HTML (html)
- `data[].rawHtml`: Raw HTML (html)
- `data[].links`: Links
- `data[].summary`: Summary
- `data[].screenshot`: Screenshot
- `data[].screenshot.fileName`: File Name
- `data[].screenshot.fileUrl`: File URL (url)
- `data[].warning`: Warning
- `data[].metadata`: Metadata
- `data[].metadata.title`: Title
- `data[].metadata.language`: Language
- `data[].metadata.sourceURL`: Source URL (url)
- `data[].metadata.url`: Final URL (url)
- `data[].metadata.statusCode`: Status Code (number)
- `data[].metadata.favicon`: Favicon (image)
- `data[].metadata.creditsUsed`: Credits Used (number)

### `map_website`

**Map Website.** Enumerates the URLs reachable from a website (via its sitemap and link graph), optionally including subdomains, up to a limit. Pick this for fast link/URL discovery when you only need the addresses and not page content; then follow with Scrape URL, Batch Scrape, or Crawl Website to fetch pages, or Search Web when you have a query instead of a domain. Read-only, so repeating the call is safe. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Website URL. The website URL to map (e.g. https://example.com). |
| `search` | string | no |  | Search Filter. Optional keyword to filter the discovered URLs (e.g. "blog" to return only blog paths). |
| `includeSubdomains` | boolean | no | `false` | Include Subdomains. Include pages from subdomains (e.g. blog.example.com) in addition to the main domain. |
| `limit` | number | no | `5000` | Limit. Maximum number of links to return (max: 100,000). |

Output fields:

- `success`: Success (boolean)
- `links`: Links

### `extract_data`

**Extract Data.** Runs an AI extraction over one or more known URLs against a natural-language prompt and a JSON Schema, returning the typed fields you asked for. Pick this when you need specific structured values from pages whose URLs you already have; use Scrape URL for raw page content, Map Website / Search Web to find URLs first. Runs as a polled job bounded by the timeout; read-only against the sites, so repeating is safe. Note: Firecrawl is deprecating /v2/extract in favor of the agent endpoint. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `urls` | array | yes |  | URLs. One or more page URLs to extract data from. Obtain them from Search Web or Map Website if needed. |
| `prompt` | string | no | `"Extract the following data from the provided content."` | Extraction Prompt. Describe what information to extract from the pages. |
| `schema` | JSON | yes | `{"type":"object","properties":{"title":{"type":"string"}},"required":["title"]}` | JSON Schema. A JSON Schema object describing the structured fields to extract (e.g. {"type":"object","properties":{"title":{"type":"string"}},"required":["title"]}). See https://json-schema.org for the format. |
| `enableWebSearch` | boolean | no | `false` | Enable Web Search. Allow the extraction to use web search for additional context. |
| `timeout` | number | no | `300` | Timeout (seconds). Seconds to poll for completion before giving up. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `status`: Status
- `expiresAt`: Expires At (datetime)
- `tokensUsed`: Tokens Used (number)
- `creditsUsed`: Credits Used (number)
- `warnings`: Warnings

### `batch_scrape`

**Batch Scrape.** Starts an asynchronous job that scrapes a fixed list of known URLs in the same format, and returns the job ID. Pick this when you already have several URLs to fetch at once; use Scrape URL for a single page or Crawl Website to discover-and-fetch a site. This action only STARTS the job (it does not wait, avoiding the action time limit) — then poll Get Batch Scrape Results with the returned ID, inspect Get Batch Scrape Errors, or stop it with Cancel Batch Scrape. Read-only against the targets, so re-running is safe. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `urls` | array | yes |  | URLs. The list of page URLs to scrape (at least one). Obtain them from Search Web or Map Website if needed. |
| `format` | string | no | `"markdown"` | Output Format. Which representation of each page to return. One of `"markdown"`, `"html"`, `"rawHtml"`, `"links"`, `"summary"`. |
| `onlyMainContent` | boolean | no | `true` | Only Main Content. Return only the main content of each page, excluding headers, navs, footers, etc. |
| `maxConcurrency` | number | no |  | Max Concurrency. Maximum number of URLs scraped in parallel. |
| `timeout` | number | no |  | Per-Page Timeout (ms). Maximum time to wait for each page to load, in milliseconds. |

Output fields:

- `success`: Success (boolean)
- `id`: Job ID
- `url`: Status URL (url)
- `invalidURLs`: Invalid URLs

### `get_batch_scrape_results`

**Get Batch Scrape Results.** Looks up the status and accumulated page results of a batch scrape job by its ID. Pick this to poll the job started by Batch Scrape until it completes; use Get Batch Scrape Errors to see which URLs failed, or Cancel Batch Scrape to stop it. Read-only, so repeating the call is safe. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jobId` | string | yes |  | Batch Scrape Job ID. The ID of the batch scrape job to check. Obtain it from the Batch Scrape action result. |

Output fields:

- `success`: Success (boolean)
- `status`: Status
- `completed`: Completed (number)
- `total`: Total (number)
- `creditsUsed`: Credits Used (number)
- `expiresAt`: Expires At (datetime)
- `next`: Next Page URL (url)
- `data`: Pages
- `data[].markdown`: Markdown
- `data[].html`: HTML (html)
- `data[].rawHtml`: Raw HTML (html)
- `data[].links`: Links
- `data[].summary`: Summary
- `data[].screenshot`: Screenshot
- `data[].screenshot.fileName`: File Name
- `data[].screenshot.fileUrl`: File URL (url)
- `data[].warning`: Warning
- `data[].metadata`: Metadata
- `data[].metadata.title`: Title
- `data[].metadata.language`: Language
- `data[].metadata.sourceURL`: Source URL (url)
- `data[].metadata.url`: Final URL (url)
- `data[].metadata.statusCode`: Status Code (number)
- `data[].metadata.favicon`: Favicon (image)
- `data[].metadata.creditsUsed`: Credits Used (number)
- `createdAt`: Created At (datetime)
- `completedAt`: Completed At (datetime)
- `duration`: Duration (ms) (number)

### `get_batch_scrape_errors`

**Get Batch Scrape Errors.** Lists the URLs that failed (and why) within a batch scrape job, so you can decide which ones to re-scrape. Pick this for retry triage after Get Batch Scrape Results shows failures; it complements, not replaces, the results poller. Read-only, so repeating the call is safe. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jobId` | string | yes |  | Batch Scrape Job ID. The ID of the batch scrape job whose errors to list. Obtain it from the Batch Scrape action result. |

Output fields:

- `errors`: Errors
- `errors[].id`: ID
- `errors[].url`: URL (url)
- `errors[].code`: Error Code
- `errors[].error`: Error Message
- `errors[].timestamp`: Timestamp (datetime)
- `robotsBlocked`: Robots-Blocked URLs

### `cancel_batch_scrape`

**Cancel Batch Scrape.** Cancels an in-flight batch scrape job by its ID, stopping further URL fetches. Pick this to abort a running Batch Scrape; use Get Batch Scrape Results to inspect what completed before cancelling. Cancelling an already-finished or unknown job errors, so this is not safe to repeat. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jobId` | string | yes |  | Batch Scrape Job ID. The ID of the batch scrape job to cancel. Obtain it from the Batch Scrape action result. |

Output fields:

- `status`: Status

### `get_crawl_errors`

**Get Crawl Errors.** Lists the URLs that failed or were blocked (e.g. by robots.txt) within a crawl job, for retry triage. Pick this after Get Crawl Results shows the crawl missed pages; it complements the results poller rather than replacing it. Read-only, so repeating the call is safe. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `crawlId` | string | yes |  | Crawl ID. The ID of the crawl job whose errors to list. Obtain it from the Crawl Website action result or List Active Crawls. |

Output fields:

- `errors`: Errors
- `errors[].id`: ID
- `errors[].url`: URL (url)
- `errors[].code`: Error Code
- `errors[].error`: Error Message
- `errors[].timestamp`: Timestamp (datetime)
- `robotsBlocked`: Robots-Blocked URLs

### `cancel_crawl`

**Cancel Crawl.** Cancels an in-flight crawl job by its ID, stopping further page discovery and fetching. Pick this to abort a running Crawl Website (this is also the delete verb — Firecrawl has one DELETE for cancel and delete); use Get Crawl Results to inspect what completed first, or List Active Crawls to find the ID. Cancelling an already-finished or unknown job errors, so this is not safe to repeat. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `crawlId` | string | yes |  | Crawl ID. The ID of the crawl job to cancel. Obtain it from the Crawl Website action result or List Active Crawls. |

Output fields:

- `status`: Status

### `list_active_crawls`

**List Active Crawls.** Lists the in-flight crawl jobs for the account, with their IDs and status. Pick this to discover a crawl ID you did not store so you can then poll it with Get Crawl Results, inspect Get Crawl Errors, or stop it with Cancel Crawl. Takes no input. Read-only, so repeating the call is safe. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `success`: Success (boolean)
- `crawls`: Crawls
- `crawls[].id`: Crawl ID
- `crawls[].teamId`: Team ID
- `crawls[].url`: URL (url)
- `crawls[].created_at`: Created At (datetime)

### `search_web`

**Search Web.** Searches the web, and optionally news and images, for a query; the entry point when you have a query but no URL yet. Set includePageContent to true to also get each result page as markdown in the same call instead of following up with Scrape URL (each page uses scrape credits). Read-only, so repeating the call is safe. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. The search query (keywords, like a Google search). |
| `limit` | number | no | `5` | Limit. Maximum number of results to return for each source (max 100). |
| `lang` | string | no |  | Language. Optional ISO language code to bias results (e.g. "en"). |
| `country` | string | no |  | Country. Optional ISO country code to bias results (e.g. "us"). |
| `timeout` | number | no |  | Timeout (ms). Maximum time to wait for the search, in milliseconds. Allow more time when Include Page Content is on. |
| `sources` | array | no |  | Sources. Where to search: "web", "news" or "images". Defaults to web only. One of `"web"`, `"news"`, `"images"`. |
| `timeFilter` | string | no |  | Time Filter. Only return results from this time range: qdr:h (past hour), qdr:d (past day), qdr:w (past week), qdr:m (past month) or qdr:y (past year). Leave empty for any time. One of `"qdr:h"`, `"qdr:d"`, `"qdr:w"`, `"qdr:m"`, `"qdr:y"`. |
| `location` | string | no |  | Location. Optional location to search from (e.g. "San Francisco,California,United States"). |
| `includePageContent` | boolean | no | `false` | Include Page Content. Also return each result page as markdown (for image results, the page the image is on). Each result with page content uses scrape credits. |

Output fields:

- `success`: Success (boolean)
- `data`: Data
- `data.web`: Web Results
- `data.web[].url`: URL (url)
- `data.web[].title`: Title
- `data.web[].description`: Description
- `data.web[].position`: Position (number)
- `data.web[].markdown`: Markdown
- `data.web[].metadata`: Metadata
- `data.web[].metadata.title`: Title
- `data.web[].metadata.sourceURL`: Source URL (url)
- `data.web[].metadata.url`: Final URL (url)
- `data.web[].metadata.statusCode`: Status Code (number)
- `data.news`: News Results
- `data.news[].url`: URL (url)
- `data.news[].title`: Title
- `data.news[].snippet`: Snippet
- `data.news[].description`: Description
- `data.news[].date`: Date
- `data.news[].imageUrl`: Image URL (image)
- `data.news[].position`: Position (number)
- `data.news[].markdown`: Markdown
- `data.news[].metadata`: Metadata
- `data.news[].metadata.title`: Title
- `data.news[].metadata.sourceURL`: Source URL (url)
- `data.news[].metadata.url`: Final URL (url)
- `data.news[].metadata.statusCode`: Status Code (number)
- `data.images`: Image Results
- `data.images[].title`: Title
- `data.images[].imageUrl`: Image URL (image)
- `data.images[].imageWidth`: Image Width (number)
- `data.images[].imageHeight`: Image Height (number)
- `data.images[].url`: Page URL (url)
- `data.images[].description`: Description
- `data.images[].position`: Position (number)
- `data.images[].markdown`: Markdown
- `data.images[].metadata`: Metadata
- `data.images[].metadata.title`: Title
- `data.images[].metadata.sourceURL`: Source URL (url)
- `data.images[].metadata.url`: Final URL (url)
- `data.images[].metadata.statusCode`: Status Code (number)
- `creditsUsed`: Credits Used (number)
- `id`: Search ID

### `start_agent`

**Start Agent.** Starts an autonomous interactive-browser agent (FIRE-1) that follows a natural-language prompt to gather data, optionally constrained to given URLs and a result schema, and returns a job ID. Pick this for blocked, thin, or JS-heavy pages where Scrape/Crawl/Extract fall short; for ordinary pages prefer those cheaper actions. NOTE: /v2/agent is a beta, plan-gated endpoint that may be unavailable on your key. Read-only against the targets, so re-running is safe; poll progress with Get Agent Status. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. Natural-language instruction describing what the agent should accomplish. |
| `urls` | array | no |  | URLs. Optional starting URLs for the agent. Obtain them from Search Web or Map Website if needed. |
| `schema` | JSON | no |  | Result Schema. Optional JSON Schema describing the structured result to produce. |
| `maxCredits` | number | no |  | Max Credits. Optional credit budget cap for the agent run. |
| `strictConstrainToURLs` | boolean | no | `false` | Strictly Constrain to URLs. If enabled, the agent may only visit the provided URLs and will not navigate elsewhere. |

Output fields:

- `success`: Success (boolean)
- `id`: Agent Job ID

### `get_agent_status`

**Get Agent Status.** Looks up the status and result of a FIRE-1 agent job by its ID. Pick this to poll the job started by Start Agent until it completes. NOTE: /v2/agent is a beta, plan-gated endpoint that may be unavailable on your key. Read-only, so repeating the call is safe. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jobId` | string | yes |  | Agent Job ID. The ID of the agent job to check. Obtain it from the Start Agent action result. |

Output fields:

- `success`: Success (boolean)
- `status`: Status
- `data`: Result
- `model`: Model
- `expiresAt`: Expires At (datetime)
- `creditsUsed`: Credits Used (number)

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

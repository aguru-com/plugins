# Browserless

Browserless is a headless browser automation tool that allows you to scrape websites, take screenshots, and more.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-browserless'
  version: '0.2.1'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To obtain your API credentials:
>
> 1. Sign up for a free Browserless account at https://www.browserless.io
> 2. Navigate to your dashboard
> 3. Find your API Key/Token in the account settings
> 4. Choose your preferred regional endpoint for optimal performance
>
> Regional Endpoints:
> • US West (SFO): https://production-sfo.browserless.io
> • Europe UK (London): https://production-lon.browserless.io
> • Europe (Amsterdam): https://production-ams.browserless.io
>
> For custom/dedicated instances, select "Custom" and enter your specific endpoint URL.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiToken` | string | yes |  | API Token. Your Browserless API token (found in your dashboard) |
| `region` | string | yes |  | Region. Choose the regional endpoint closest to you for optimal performance. One of `"https://production-sfo.browserless.io"`, `"https://production-lon.browserless.io"`, `"https://production-ams.browserless.io"`, `"custom"`. |
| `customBaseUrl` | string | no |  | Custom Base URL. Only for "Custom Endpoint": the address of your dedicated or self-hosted Browserless, for example https://chrome.browserless.io. |

## Actions

### `capture_screenshot`

**Capture Screenshot.** Renders a web page in a headless browser and returns a PNG, JPEG or WebP screenshot as a file. Use to capture the visual state of a public URL; for page text use Get Page Content or Smart Scrape instead. The page URL is required, and options like full-page capture, viewport size, clipping region, and waiting for a CSS selector control what is rendered. Each call renders the live page again and stores a new file (about 1 Browserless unit per 30 s). Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The URL of the page to capture. |
| `imageType` | string | no | `"png"` | Image Type. Format of the screenshot image. One of `"png"`, `"jpeg"`, `"webp"`. |
| `quality` | number | no |  | Quality. Image quality (0-100, only for JPEG and WebP) |
| `fullPage` | boolean | no | `false` | Full Page. Capture the full scrollable page. |
| `width` | number | no |  | Viewport Width. Width of the browser viewport in pixels. |
| `height` | number | no |  | Viewport Height. Height of the browser viewport in pixels. |
| `waitForSelector` | string | no |  | Wait for Selector. CSS selector to wait for before taking screenshot. |
| `delay` | number | no |  | Delay (ms). Delay in milliseconds before taking screenshot. |
| `omitBackground` | boolean | no | `false` | Omit Background. Hide default white background for transparent screenshots. |
| `clipX` | number | no |  | Clip X Position. X coordinate of the top-left corner for clipping. |
| `clipY` | number | no |  | Clip Y Position. Y coordinate of the top-left corner for clipping. |
| `clipWidth` | number | no |  | Clip Width. Width of the clipping area. |
| `clipHeight` | number | no |  | Clip Height. Height of the clipping area. |

Output fields:

- `file`: Screenshot File (url)
- `success`: Success (boolean)
- `metadata`: Details
- `metadata.url`: Page URL (url)
- `metadata.type`: Image Type
- `metadata.fullPage`: Full Page (boolean)
- `metadata.fileName`: File Name
- `metadata.contentType`: Content Type
- `metadata.sizeBytes`: Size (filesize)
- `metadata.siteStatusCode`: Site Status Code (number)
- `metadata.finalUrl`: Final URL (url)
- `metadata.timestamp`: Captured At (datetime)
- `screenshotBase64`: Screenshot (Base64)

### `generate_pdf`

**Generate PDF.** Renders content in a headless browser and returns it as a PDF file. Source the content either from a page URL or from a raw HTML string (provide exactly one, not both). Use to produce a printable PDF of a page or supplied markup, with control over paper format, orientation, margins, and headers/footers. Not idempotent: each call runs a fresh headless-browser render, so repeating it produces a new PDF of the page or markup as it renders at that moment. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | no |  | URL. The URL of the page to convert to PDF. |
| `html` | string | no |  | HTML Content. HTML content to render as PDF (alternative to URL) |
| `format` | string | no | `"A4"` | Paper Format. Paper format for the PDF. One of `"A0"`, `"A1"`, `"A2"`, `"A3"`, `"A4"`, `"A5"`, `"A6"`, `"Letter"`, `"Legal"`, `"Ledger"`, `"Tabloid"`. |
| `landscape` | boolean | no | `false` | Landscape. Use landscape orientation. |
| `printBackground` | boolean | no | `true` | Print Background. Include background graphics. |
| `marginTop` | string | no |  | Top Margin. Top margin (e.g., "10mm", "0.4in") |
| `marginRight` | string | no |  | Right Margin. Right margin (e.g., "10mm", "0.4in") |
| `marginBottom` | string | no |  | Bottom Margin. Bottom margin (e.g., "10mm", "0.4in") |
| `marginLeft` | string | no |  | Left Margin. Left margin (e.g., "10mm", "0.4in") |
| `headerTemplate` | string | no |  | Header Template. HTML template for the print header. |
| `footerTemplate` | string | no |  | Footer Template. HTML template for the print footer. |
| `displayHeaderFooter` | boolean | no | `false` | Display Header/Footer. Display header and footer. |
| `scale` | number | no |  | Scale. Scale of the webpage rendering (0.1 - 2.0) |
| `waitForSelector` | string | no |  | Wait for Selector. CSS selector to wait for before generating PDF. |
| `waitForSelectorTimeout` | number | no |  | Wait for Selector Timeout. Timeout in milliseconds for waiting for selector. |
| `waitForSelectorVisible` | boolean | no | `true` | Wait for Selector Visible. Wait for selector to be visible. |
| `waitForSelectorHidden` | boolean | no | `false` | Wait for Selector Hidden. Wait for selector to be hidden. |
| `preferCSSPageSize` | boolean | no | `false` | Prefer CSS Page Size. Give any CSS @page size declared in the page priority over format. |
| `pageRanges` | string | no |  | Page Ranges. Paper ranges to print, e.g. "1-5, 8, 11-13". |
| `width` | string | no |  | Custom Width. Custom width of paper (e.g., "8.5in", "210mm") |
| `height` | string | no |  | Custom Height. Custom height of paper (e.g., "11in", "297mm") |
| `omitBackground` | boolean | no | `false` | Omit Background. Hide default white background and allow transparent PDFs. |
| `tagged` | boolean | no | `false` | Tagged PDF. Generate tagged (accessible) PDF. |
| `outline` | boolean | no | `false` | Generate Outline. Generate document outline. |
| `timeout` | number | no |  | Timeout (ms). Maximum time in milliseconds to wait for the page to load. |
| `waitForFunction` | string | no |  | Wait for Function. JavaScript function to wait for before generating PDF. |
| `waitForFunctionPolling` | string | no |  | Wait for Function Polling. Polling interval for wait function ("raf", "mutation", or number in ms) |
| `waitForFunctionTimeout` | number | no |  | Wait for Function Timeout. Timeout in milliseconds for wait function (0 to disable) |
| `userAgent` | string | no |  | User Agent. Custom user agent string to use for the request. |
| `waitForTimeout` | number | no |  | Wait Timeout (ms). Timeout in milliseconds to wait before generating PDF. |
| `bestAttempt` | boolean | no | `false` | Best Attempt. Attempt to proceed when awaited events fail or timeout. |

Output fields:

- `file`: PDF File (url)
- `success`: Success (boolean)
- `metadata`: Details
- `metadata.source`: Source (url or html)
- `metadata.url`: Page URL (url)
- `metadata.format`: Paper Format
- `metadata.landscape`: Landscape (boolean)
- `metadata.fileName`: File Name
- `metadata.sizeBytes`: Size (filesize)
- `metadata.siteStatusCode`: Site Status Code (number)
- `metadata.timestamp`: Generated At (datetime)
- `pdfBase64`: PDF (Base64)

### `scrape_url`

**Scrape URL.** Loads a web page in a headless browser and extracts the elements matched by the CSS selectors you supply. Use when you know which CSS selectors hold the data; for a whole page as markdown or text use Smart Scrape, for raw HTML use Get Page Content. The page URL and at least one selector are required. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The URL of the page to scrape. |
| `elements` | array | yes |  | Elements to Extract. CSS selectors for elements to extract. Each item: { `selector`, `timeout`? }. |
| `waitForSelector` | string | no |  | Wait for Selector. CSS selector to wait for before scraping. |
| `waitForSelectorTimeout` | number | no |  | Wait for Selector Timeout. Timeout in milliseconds for waiting for selector. |
| `waitForSelectorVisible` | boolean | no | `true` | Wait for Selector Visible. Wait for selector to be visible. |
| `waitForSelectorHidden` | boolean | no | `false` | Wait for Selector Hidden. Wait for selector to be hidden. |
| `waitForTimeout` | number | no |  | Wait Timeout (ms). Timeout in milliseconds to wait before scraping. |
| `waitForEvent` | string | no |  | Wait for Event. Event name to wait for before scraping. |
| `waitForEventTimeout` | number | no |  | Wait for Event Timeout. Timeout in milliseconds for wait event. |
| `debugConsole` | boolean | no | `false` | Debug Console. Include console logs in debug output. |
| `debugCookies` | boolean | no | `false` | Debug Cookies. Include cookies in debug output. |
| `debugNetwork` | boolean | no | `false` | Debug Network. Include network requests in debug output. |
| `bestAttempt` | boolean | no | `false` | Best Attempt. Attempt to proceed when awaited events fail or timeout. |
| `userAgent` | string | no |  | User Agent. Custom user agent string. |
| `cookies` | array | no |  | Cookies. Cookies to set before scraping. Each item: { `name`, `value`, `domain`? }. |
| `timeout` | number | no | `30000` | Timeout (ms). Maximum time to wait for the page to load. |
| `waitUntil` | string | no | `"networkidle2"` | Wait Until. When to consider navigation complete. One of `"load"`, `"domcontentloaded"`, `"networkidle0"`, `"networkidle2"`. |
| `waitForFunction` | string | no |  | Wait for Function. JavaScript function to wait for before scraping (should return true when ready) |
| `viewportWidth` | number | no | `1920` | Viewport Width. Browser viewport width in pixels. |
| `viewportHeight` | number | no | `1080` | Viewport Height. Browser viewport height in pixels. |

Output fields:

- `data.data`: Elements
- `data.data[].selector`: Selector
- `data.data[].results`: Matches
- `data.data[].results[].text`: Text
- `data.data[].results[].html`: HTML (html)
- `data.data[].results[].attributes`: Attributes
- `data.data[].results[].attributes[].name`: Name
- `data.data[].results[].attributes[].value`: Value
- `data.data[].results[].width`: Width (number)
- `data.data[].results[].height`: Height (number)
- `data.data[].results[].top`: Top (number)
- `data.data[].results[].left`: Left (number)
- `metadata`: Details
- `metadata.url`: Page URL (url)
- `metadata.elementsCount`: Selectors Requested (number)
- `metadata.site_status_code`: Site Status Code (number)
- `metadata.site_status_text`: Site Status Text
- `metadata.final_url`: Final URL (url)
- `metadata.timestamp`: Scraped At (datetime)
- `success`: Success (boolean)

### `run_bql_query`

**Run BQL Query.** Runs a raw Browser Query Language (BQL) GraphQL query against a headless Chromium browser for advanced automation such as navigation, clicking, typing, and multi-step scripted browser flows. Use when the simpler screenshot/scrape/PDF actions cannot express the interaction; requires a valid BQL query string and supports session options like stealth, proxy, and cookies. It fails when the query returns errors and no data; partial results keep their errors in the output. Not idempotent: the query can click, type and submit forms, so a retry can repeat those effects. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | BQL Query. GraphQL-based BQL query for browser automation. Example: mutation { goto(url: "https://example.com") { status } }. |
| `variables` | object | no |  | Query Variables. Variables to pass to the BQL query (JSON object) |
| `operationName` | string | no |  | Operation Name. Name of the GraphQL operation to execute. |
| `timeout` | number | no | `30000` | Timeout (ms). Maximum execution time in milliseconds. |
| `stealth` | boolean | no | `true` | Stealth Mode. Enable stealth mode for bot detection bypass. |
| `headless` | boolean | no | `true` | Headless Mode. Run browser in headless mode (set to false for GUI) |
| `humanlike` | boolean | no | `false` | Human-like Behavior. Enable human-like mouse movement, typing, and delays. |
| `proxy` | string | no |  | Proxy Type. Type of proxy to use. One of `"residential"`, `"none"`. |
| `proxyCountry` | string | no |  | Proxy Country. Country code for residential proxy (e.g., us, gb, de) |
| `proxySticky` | boolean | no | `false` | Sticky Proxy. Maintain same proxy IP across session. |
| `blockAds` | boolean | no | `false` | Block Ads. Enable ad blocker (uBlock Origin) |
| `blockConsentModals` | boolean | no | `false` | Block Consent Modals. Automatically block/dismiss cookie consent banners. |
| `record` | boolean | no | `false` | Record Session. Enable session recording for debugging. |
| `slowMo` | number | no |  | Slow Motion (ms). Add delays between browser actions in milliseconds. |
| `ignoreHTTPSErrors` | boolean | no | `false` | Ignore HTTPS Errors. Ignore HTTPS certificate errors during navigation. |
| `userAgent` | string | no |  | User Agent. Custom user agent string. |
| `viewportWidth` | number | no |  | Viewport Width. Browser viewport width. |
| `viewportHeight` | number | no |  | Viewport Height. Browser viewport height. |
| `cookies` | array | no |  | Cookies. Cookies to set before executing BQL query. Each item: { `name`, `value`, `url`?, `domain`?, `path`?, `secure`?, `httpOnly`?, `sameSite`?, `expires`? }. |

Output fields:

- `data`: Query Data
- `errors`: Errors
- `errors[].message`: Message
- `metadata`: Details
- `metadata.executionTime`: Execution Time
- `metadata.stealth`: Stealth (boolean)
- `metadata.timestamp`: Ran At (datetime)
- `success`: Success (boolean)

### `get_website_performance`

**Get Website Performance.** Runs a Lighthouse audit on a public URL in a headless browser and returns performance, accessibility, best-practices and SEO scores (0-100) plus Core Web Vitals. Use to measure a page's quality; the URL is required, and you can scope the audit to specific categories and simulate a desktop or mobile device with network throttling. Read-only analysis: re-running with the same input re-audits the page without side effects (scores may vary slightly run to run). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The URL of the website to analyze. |
| `categories` | array | no |  | Performance Categories. Categories to audit (Lighthouse 12+ has no PWA category). Each item: { `category` }. |
| `device` | string | no | `"desktop"` | Device Type. Device type for performance analysis. One of `"desktop"`, `"mobile"`. |
| `throttling` | string | no | `"mobileSlow4G"` | Network Throttling. Network throttling simulation. One of `"none"`, `"mobileSlow4G"`, `"mobileRegular4G"`, `"mobileFast4G"`. |
| `onlyCategories` | boolean | no | `false` | Only Category Scores. Return only category scores without detailed audit results. |
| `locale` | string | no | `"en-US"` | Locale. Locale for the analysis (e.g., en-US, de-DE) |
| `userAgent` | string | no |  | User Agent. Custom user agent string. |
| `timeout` | number | no | `60000` | Timeout (ms). Max page load wait in ms during the audit (under 480000). |
| `waitForSelector` | string | no |  | Wait for Selector. Not supported by Lighthouse audits; this setting is ignored. |
| `emulateMediaType` | string | no |  | Emulate Media Type. Not supported by Lighthouse audits; this setting is ignored. One of `"screen"`, `"print"`. |
| `budgets` | array | no |  | Performance Budgets. Lighthouse performance budgets for resource sizes. Each item: { `resourceType`, `budget` }. |
| `stealth` | boolean | no | `false` | Stealth Mode. Enable stealth mode for bot detection bypass. |
| `blockAds` | boolean | no | `false` | Block Ads. Enable ad blocker during performance analysis. |
| `includeFullReport` | boolean | no | `true` | Include Full Report. Also return the full Lighthouse report (often several MB). |

Output fields:

- `summary.scores`: Scores (0-100)
- `summary.scores.performance`: Performance (number)
- `summary.scores.accessibility`: Accessibility (number)
- `summary.scores.bestPractices`: Best Practices (number)
- `summary.scores.seo`: SEO (number)
- `summary.metrics`: Metrics
- `summary.metrics.firstContentfulPaint`: First Contentful Paint
- `summary.metrics.firstContentfulPaint.value`: Value
- `summary.metrics.firstContentfulPaint.numericValue`: Numeric Value (number)
- `summary.metrics.firstContentfulPaint.score`: Score (0-100) (number)
- `summary.metrics.largestContentfulPaint`: Largest Contentful Paint
- `summary.metrics.largestContentfulPaint.value`: Value
- `summary.metrics.largestContentfulPaint.numericValue`: Numeric Value (number)
- `summary.metrics.largestContentfulPaint.score`: Score (0-100) (number)
- `summary.metrics.speedIndex`: Speed Index
- `summary.metrics.speedIndex.value`: Value
- `summary.metrics.speedIndex.numericValue`: Numeric Value (number)
- `summary.metrics.speedIndex.score`: Score (0-100) (number)
- `summary.metrics.timeToInteractive`: Time to Interactive
- `summary.metrics.timeToInteractive.value`: Value
- `summary.metrics.timeToInteractive.numericValue`: Numeric Value (number)
- `summary.metrics.timeToInteractive.score`: Score (0-100) (number)
- `summary.metrics.totalBlockingTime`: Total Blocking Time
- `summary.metrics.totalBlockingTime.value`: Value
- `summary.metrics.totalBlockingTime.numericValue`: Numeric Value (number)
- `summary.metrics.totalBlockingTime.score`: Score (0-100) (number)
- `summary.metrics.cumulativeLayoutShift`: Cumulative Layout Shift
- `summary.metrics.cumulativeLayoutShift.value`: Value
- `summary.metrics.cumulativeLayoutShift.numericValue`: Numeric Value (number)
- `summary.metrics.cumulativeLayoutShift.score`: Score (0-100) (number)
- `summary.opportunities`: Opportunities
- `summary.opportunities[].type`: Type
- `summary.opportunities[].title`: Title
- `summary.opportunities[].potentialSavings`: Potential Savings
- `summary.url`: URL (url)
- `summary.finalUrl`: Final URL (url)
- `summary.formFactor`: Device
- `summary.runtimeError`: Lighthouse Error
- `metadata.lighthouseVersion`: Lighthouse Version
- `summary.timestamp`: Audited At (datetime)
- `success`: Success (boolean)

### `get_page_content`

**Get Page Content.** Loads a URL in a headless browser and returns the final rendered HTML after JavaScript runs, plus the HTTP status the site answered with. Use only when you need the raw HTML of a JavaScript-heavy page; to read or summarise a page prefer Smart Scrape (markdown, much shorter), and use Scrape URL for specific CSS selectors. HTML is cut to Maximum Characters (default 100000) and truncated=true says so. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The page to load, for example https://example.com/pricing. |
| `waitUntil` | string | no |  | Wait Until. When the page counts as loaded. "Network Idle" waits longest and suits pages that load data with JavaScript. One of `"load"`, `"domcontentloaded"`, `"networkidle0"`, `"networkidle2"`. |
| `navigationTimeout` | number | no |  | Page Load Timeout (ms). How long to wait for the page to load before failing (Browserless default 30000). |
| `waitForSelector` | string | no |  | Wait for Selector. A CSS selector (for example `#content` or `.price`) to wait for before reading the page. |
| `waitForTimeout` | number | no |  | Extra Wait (ms). Extra time to wait after the page loads, for animations or late content. |
| `rejectResourceTypes` | array | no |  | Skip Resource Types. Resource types the browser should not download, which makes the page load faster. One of `"image"`, `"stylesheet"`, `"font"`, `"media"`. |
| `bestAttempt` | boolean | no | `false` | Best Attempt. Continue with whatever has loaded when a wait or the page load times out, instead of failing. |
| `blockAds` | boolean | no | `false` | Block Ads. Load the page with an ad blocker, which is usually faster. |
| `maxCharacters` | number | no | `100000` | Maximum Characters. Cut long text fields to this many characters (default 100000, 0 = no limit). |
| `timeout` | number | no |  | Timeout (ms). Maximum time the whole request may take on Browserless. Browser time is billed per 30 seconds, so a lower limit caps cost. Keep it under 540000. |

Output fields:

- `html`: HTML (html)
- `html_length`: Full HTML Length (characters) (number)
- `truncated`: Truncated (boolean)
- `url`: Requested URL (url)
- `site_status_code`: Site Status Code (number)
- `site_status_text`: Site Status Text
- `final_url`: Final URL (url)

### `smart_scrape`

**Smart Scrape.** Reads one web page and returns it as LLM-ready markdown (default), plain text, HTML and/or the list of links, with title and description, escalating from a plain fetch to a stealth browser when the site blocks bots. Use this to read or summarise a page; use Scrape URL for specific CSS selectors and Capture Screenshot for images. Text fields are cut to Maximum Characters (default 100000) and truncated=true says so. Fails when every strategy fails. Asking for a screenshot or PDF stores a new file on each call. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The page to read, for example https://example.com/blog/post. |
| `formats` | array | no | `["markdown"]` | Formats. What to return. Markdown is the best choice for AI steps. One of `"markdown"`, `"rawText"`, `"html"`, `"links"`, `"screenshot"`, `"pdf"`. |
| `onlyMainContent` | boolean | no | `false` | Only Main Content. Drop navigation, headers, footers and sidebars. |
| `includeTags` | array | no |  | Keep Only These Selectors. CSS selectors to keep; cannot be combined with Remove or Only Main Content. |
| `excludeTags` | array | no |  | Remove These Selectors. CSS selectors to remove (for example `.cookie-banner`). |
| `waitFor` | number | no |  | Extra Wait (ms). Wait after load (0-30000 ms); above 0 forces a real browser. |
| `proxy` | string | no |  | Proxy. Proxy network used when a plain fetch is blocked. Browserless uses Residential when empty; Datacenter is cheaper. One of `"datacenter"`, `"residential"`. |
| `maxCharacters` | number | no | `100000` | Maximum Characters. Cut long text fields to this many characters (default 100000, 0 = no limit). |
| `timeout` | number | no |  | Timeout (ms). Maximum time the whole request may take on Browserless. Browser time is billed per 30 seconds, so a lower limit caps cost. Keep it under 540000. |

Output fields:

- `markdown`: Markdown
- `raw_text`: Plain Text
- `html`: HTML (html)
- `content`: Other Content
- `title`: Page Title
- `description`: Page Description
- `language`: Language
- `source_url`: Source URL (url)
- `status_code`: HTTP Status (number)
- `content_type`: Content Type
- `strategy`: Strategy Used
- `attempted_strategies`: Strategies Tried
- `links`: Links
- `links_count`: Links Count (number)
- `truncated`: Truncated (boolean)
- `screenshot_file`: Screenshot File (url)
- `pdf_file`: PDF File (url)
- `url`: Requested URL (url)

### `search_web`

**Search the Web.** Runs a web search and returns ranked results (title, URL, snippet) from web, news and/or image sources, optionally scraping each result page into markdown (each page cut to Maximum Characters, default 100000). Use to find pages about a topic before reading them; to read one known URL use Smart Scrape. The result count per source is capped by the Browserless plan (Free 3, Starter 10, Scale 20). Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. What to search for, for example `best headless browser 2026`. |
| `sources` | array | no | `["web"]` | Sources. Where to search. Web is used when empty. One of `"web"`, `"news"`, `"images"`. |
| `limit` | number | no |  | Results per Source. Results per source (default 10, capped by your plan). |
| `tbs` | string | no |  | Time Range. Only return results from this period. One of `"day"`, `"week"`, `"month"`, `"year"`. |
| `categories` | array | no |  | Categories. Narrow results to GitHub repositories, research papers or PDF documents. One of `"github"`, `"research"`, `"pdf"`. |
| `lang` | string | no |  | Language. Two-letter language code for results, for example `en` or `de` (default `en`). |
| `country` | string | no |  | Country. Two-letter country code for local results, for example `us` or `gb`. |
| `location` | string | no |  | Location. City or region to narrow results, used with Country. |
| `scrapeFormats` | array | no |  | Read Result Pages As. Also read each result page in these formats (slower, costs more). One of `"markdown"`, `"html"`, `"links"`. |
| `onlyMainContent` | boolean | no | `false` | Only Main Content. When reading result pages, drop navigation, headers and footers. |
| `proxy` | string | no |  | Proxy. Proxy network used to read result pages. Browserless uses Residential when empty; Datacenter is cheaper. One of `"datacenter"`, `"residential"`. |
| `maxCharacters` | number | no | `100000` | Maximum Characters. Cut long text fields to this many characters (default 100000, 0 = no limit). |
| `timeout` | number | no |  | Timeout (ms). Maximum time the whole request may take on Browserless. Browser time is billed per 30 seconds, so a lower limit caps cost. Keep it under 540000. |

Output fields:

- `results`: Results
- `results[].title`: Title
- `results[].url`: URL (url)
- `results[].description`: Snippet
- `results[].source`: Source (web, news, images)
- `results[].position`: Position (number)
- `results[].date`: Date
- `results[].image_url`: Image (image)
- `results[].markdown`: Page Markdown
- `results[].html`: Page HTML (html)
- `results[].links`: Page Links
- `results[].page_status_code`: Page HTTP Status (number)
- `results[].page_error`: Page Error
- `results[].truncated`: Page Content Truncated (boolean)
- `result_count`: Results Returned (number)
- `total_results`: Total Results (number)
- `no_results`: No Results (boolean)
- `query`: Query

### `map_website`

**Map Website URLs.** Discovers the URLs of a website from its sitemap plus links found on the page and returns them as a list (500 by default, up to 5000), optionally ranked by a search term. Use to find which pages exist before scraping or crawling them; it does not return page content (use Smart Scrape or Start Crawl for that). Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The website to map, for example https://example.com. |
| `search` | string | no |  | Search Term. Order the URLs by relevance to this term, for example `pricing`. |
| `limit` | number | no |  | Maximum URLs. How many URLs to return (1-5000, default 500). |
| `sitemap` | string | no |  | Sitemap. How to use the site's sitemap. One of `"include"`, `"only"`, `"skip"`. |
| `includeSubdomains` | boolean | no | `true` | Include Subdomains. Also return URLs on subdomains such as blog.example.com. |
| `ignoreQueryParameters` | boolean | no | `true` | Ignore Query Parameters. Skip URLs that only differ by their ?query part. |
| `proxy` | string | no |  | Proxy. Proxy network for fetching the site. Browserless uses Residential when empty; Datacenter is cheaper. One of `"datacenter"`, `"residential"`. |
| `timeout` | number | no |  | Timeout (ms). Maximum time the whole request may take on Browserless. Browser time is billed per 30 seconds, so a lower limit caps cost. Keep it under 540000. |

Output fields:

- `links`: URLs
- `links[].url`: URL (url)
- `links[].title`: Title
- `links[].description`: Description
- `count`: URL Count (number)
- `url`: Website (url)

### `start_crawl`

**Start Crawl.** Starts an asynchronous crawl that follows links from a start URL and scrapes each page (markdown by default), returning a crawl ID right away. Use for many pages of one site; for a single page use Smart Scrape, for just the URL list use Map Website URLs. Poll Get Crawl Results with the ID until status is completed. Each call starts a new billed crawl, so do not retry blindly. Needs authentication.

Kind: search, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. Where the crawl starts, for example https://example.com/docs. |
| `limit` | number | no | `10` | Maximum Pages. Stop after this many pages (capped by your plan); each page costs units. |
| `maxDepth` | number | no |  | Maximum Link Depth. How many links away from the start URL to follow (0-20, default 5). |
| `includePaths` | array | no |  | Only Paths Matching. Regexes; only matching paths are crawled, e.g. `^/docs/`. |
| `excludePaths` | array | no |  | Skip Paths Matching. Regular expressions for paths to skip, for example `^/blog/`. |
| `allowSubdomains` | boolean | no | `false` | Follow Subdomains. Also crawl subdomains such as blog.example.com. |
| `allowExternalLinks` | boolean | no | `false` | Follow External Links. Also follow links to other websites. |
| `sitemap` | string | no |  | Sitemap. How to use the sitemap to find pages. One of `"auto"`, `"force"`, `"skip"`. |
| `formats` | array | no |  | Page Formats. What to store for each page (default markdown). One of `"markdown"`, `"html"`, `"rawText"`. |
| `onlyMainContent` | boolean | no | `true` | Only Main Content. Drop navigation, headers and footers from each page (Browserless default is on). |
| `proxy` | string | no |  | Proxy. Proxy network for fetching pages. Browserless uses Residential when empty; Datacenter is cheaper. One of `"datacenter"`, `"residential"`. |

Output fields:

- `crawl_id`: Crawl ID
- `status`: Status
- `url`: Start URL (url)

### `get_crawl`

**Get Crawl Results.** Returns the status and progress counters of a crawl started with Start Crawl, plus one batch of crawled pages (URL, title, HTTP status and a temporary link to the page content). Call again while status is in-progress; when has_more is true pass next_skip as Skip to read the next batch. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `crawlId` | string | yes |  | Crawl ID. The ID returned by Start Crawl (looks like `crawl_abc123`). List Crawls shows recent IDs. |
| `skip` | number | no |  | Skip. Pages to skip; use Next Skip from the previous run. |

Output fields:

- `status`: Status
- `total`: Pages Found (number)
- `completed`: Pages Completed (number)
- `failed`: Pages Failed (number)
- `pages`: Pages
- `pages[].url`: Page URL (url)
- `pages[].title`: Title
- `pages[].description`: Description
- `pages[].status`: Page Status
- `pages[].status_code`: HTTP Status (number)
- `pages[].language`: Language
- `pages[].scraped_at`: Scraped At (datetime)
- `pages[].error`: Error
- `pages[].content_url`: Content Link (url)
- `page_count`: Pages in This Batch (number)
- `has_more`: Has More (boolean)
- `next_skip`: Next Skip (number)
- `skip`: Skipped Pages (number)
- `expires_at`: Results Expire At (datetime)
- `crawl_id`: Crawl ID

### `list_crawls`

**List Crawls.** Lists crawl jobs on this Browserless account, newest first, with ID, start URL, status and page counts; filter by status and page with the cursor. Use to find a crawl ID when you no longer have it; use Get Crawl Results for the pages of one crawl. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no |  | Status. Only list crawls with this status. One of `"in-progress"`, `"completed"`, `"failed"`, `"cancelled"`. |
| `limit` | number | no |  | Limit. How many crawls to return in this batch. |
| `cursor` | string | no |  | Cursor. Next Cursor from a previous run, to read the next batch. |

Output fields:

- `crawls`: Crawls
- `crawls[].id`: Crawl ID
- `crawls[].url`: Start URL (url)
- `crawls[].status`: Status
- `crawls[].total`: Pages Found (number)
- `crawls[].completed`: Pages Completed (number)
- `crawls[].created_at`: Created At (datetime)
- `crawls[].completed_at`: Completed At (datetime)
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `cancel_crawl`

**Cancel Crawl.** Stops a running crawl by its ID so no more pages are scraped (and billed); pages already finished stay readable with Get Crawl Results. A cancelled crawl cannot be resumed. If the crawl already finished, it reports cancelled=false with the final status instead of failing, so a retry is safe. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `crawlId` | string | yes |  | Crawl ID. The ID returned by Start Crawl (looks like `crawl_abc123`). List Crawls shows recent IDs. |

Output fields:

- `crawl_id`: Crawl ID
- `cancelled`: Cancelled (boolean)
- `status`: Status
- `message`: Message

### `unblock_page`

**Unblock Page.** Opens a bot-protected URL in a stealth browser, solving CAPTCHAs when enabled, and returns the unblocked HTML (cut to Maximum Characters, default 100000), the session cookies and optionally a screenshot file. Use only when Get Page Content or Smart Scrape is blocked, because it is slower and costs more (residential proxy 6 units/MB, 10 units per solved CAPTCHA). Each call stores a new screenshot file. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The blocked page to open, for example https://example.com/products. |
| `returnContent` | boolean | no | `true` | Return HTML. Return the page HTML. |
| `returnCookies` | boolean | no | `true` | Return Cookies. Return the cookies the site set, so later requests can reuse the unblocked session. |
| `returnScreenshot` | boolean | no | `false` | Return Screenshot. Return a full-page screenshot as a file. |
| `solveCaptchas` | boolean | no | `false` | Solve CAPTCHAs. Let Browserless solve CAPTCHAs it meets (10 units per successful solve). |
| `proxy` | string | no |  | Proxy. Proxy network to route the browser through. Residential works best against bot detection. One of `"datacenter"`, `"residential"`. |
| `proxyCountry` | string | no |  | Proxy Country. Two-letter country code for the proxy exit, for example `us` or `de`. |
| `waitUntil` | string | no |  | Wait Until. When the page counts as loaded. "Network Idle" waits longest and suits pages that load data with JavaScript. One of `"load"`, `"domcontentloaded"`, `"networkidle0"`, `"networkidle2"`. |
| `navigationTimeout` | number | no |  | Page Load Timeout (ms). How long to wait for the page to load before failing (Browserless default 30000). |
| `waitForSelector` | string | no |  | Wait for Selector. A CSS selector (for example `#content` or `.price`) to wait for before reading the page. |
| `waitForTimeout` | number | no |  | Extra Wait (ms). Extra time to wait after the page loads, for animations or late content. |
| `bestAttempt` | boolean | no | `false` | Best Attempt. Continue with whatever has loaded when a wait or the page load times out, instead of failing. |
| `maxCharacters` | number | no | `100000` | Maximum Characters. Cut long text fields to this many characters (default 100000, 0 = no limit). |
| `timeout` | number | no |  | Timeout (ms). Maximum time the whole request may take on Browserless. Browser time is billed per 30 seconds, so a lower limit caps cost. Keep it under 540000. |

Output fields:

- `html`: HTML (html)
- `html_length`: Full HTML Length (characters) (number)
- `truncated`: Truncated (boolean)
- `solved`: Challenge Solved (boolean)
- `cookies`: Cookies
- `cookies[].name`: Name
- `cookies[].value`: Value
- `cookies[].domain`: Domain
- `cookies[].path`: Path
- `cookies[].expires`: Expires (Unix seconds) (number)
- `cookies[].http_only`: HTTP Only (boolean)
- `cookies[].secure`: Secure (boolean)
- `cookies[].same_site`: SameSite
- `cookie_count`: Cookie Count (number)
- `cookie_header`: Cookie Header
- `screenshot_file`: Screenshot File (url)
- `url`: URL (url)

### `run_function`

**Run Puppeteer Function.** Runs caller-supplied Puppeteer code (an ES module whose default export receives { page, context }) in a fresh Browserless browser and returns the `data` it returns: JSON or text, or a stored file when `type` is binary (for example application/pdf). Use only when Smart Scrape, Scrape URL, Capture Screenshot or BQL cannot do the job. The code can click, submit forms and change remote state, so it is not safe to retry blindly. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `code` | string | yes |  | Code. The Puppeteer module to run. |
| `context` | object | no |  | Context. Values your function receives as `context`. |
| `timeout` | number | no |  | Timeout (ms). Maximum time the whole request may take on Browserless. Browser time is billed per 30 seconds, so a lower limit caps cost. Keep it under 540000. |

Output fields:

- `result`: Result
- `file`: Result File (url)
- `content_type`: Content Type
- `size_bytes`: Size (filesize)

### `take_screenshot`

**Take Screenshot (File Only).** Renders a URL or raw HTML in a headless browser and stores a PNG, JPEG or WebP screenshot, returning only the file link plus name, size and MIME type (no base64 in the output). Use when you need an image of a page; to read page text use Smart Scrape. Give exactly one of url or html. Each call renders again and stores a new file. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | no |  | URL. The page to capture, for example https://example.com. Leave empty when you pass HTML. |
| `html` | string | no |  | HTML. Raw HTML to render instead of a URL. |
| `imageType` | string | no |  | Image Type. Image format (default PNG). One of `"png"`, `"jpeg"`, `"webp"`. |
| `fullPage` | boolean | no | `false` | Full Page. Capture the whole scrollable page instead of the visible viewport. |
| `quality` | number | no |  | Quality. JPEG/WebP quality 0-100. |
| `width` | number | no |  | Viewport Width. Browser width in pixels (set together with height). |
| `height` | number | no |  | Viewport Height. Browser height in pixels (set together with width). |
| `selector` | string | no |  | Element Selector. Capture only the element matching this CSS selector. |
| `waitForSelector` | string | no |  | Wait for Selector. A CSS selector (for example `#content` or `.price`) to wait for before reading the page. |
| `waitForTimeout` | number | no |  | Extra Wait (ms). Extra time to wait after the page loads, for animations or late content. |
| `timeout` | number | no |  | Timeout (ms). Maximum time the whole request may take on Browserless. Browser time is billed per 30 seconds, so a lower limit caps cost. Keep it under 540000. |

Output fields:

- `file`: File (url)
- `file_name`: File Name
- `size_bytes`: Size (filesize)
- `mime_type`: MIME Type
- `source`: Source (URL or html)
- `site_status_code`: Site Status Code (number)

### `create_pdf`

**Create PDF (File Only).** Renders a URL or raw HTML in a headless browser and stores it as a PDF, returning only the file link plus name, size and MIME type (no base64 in the output). Use to produce a printable document, for example from HTML you wrote; give exactly one of url or html. Each call renders again and stores a new file. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | no |  | URL. The page to convert, for example https://example.com. Leave empty when you pass HTML. |
| `html` | string | no |  | HTML. Raw HTML to render instead of a URL. |
| `format` | string | no |  | Paper Format. Paper size (default A4). One of `"A3"`, `"A4"`, `"A5"`, `"Letter"`, `"Legal"`, `"Tabloid"`. |
| `landscape` | boolean | no | `false` | Landscape. Use landscape orientation. |
| `printBackground` | boolean | no | `true` | Print Background. Include background colours and images (default on). |
| `margin` | string | no |  | Margin. One margin for all sides, for example `10mm` or `0.5in`. |
| `waitForSelector` | string | no |  | Wait for Selector. A CSS selector (for example `#content` or `.price`) to wait for before reading the page. |
| `waitForTimeout` | number | no |  | Extra Wait (ms). Extra time to wait after the page loads, for animations or late content. |
| `timeout` | number | no |  | Timeout (ms). Maximum time the whole request may take on Browserless. Browser time is billed per 30 seconds, so a lower limit caps cost. Keep it under 540000. |

Output fields:

- `file`: File (url)
- `file_name`: File Name
- `size_bytes`: Size (filesize)
- `mime_type`: MIME Type
- `source`: Source (URL or html)
- `site_status_code`: Site Status Code (number)

### `audit_page_performance`

**Audit Page Performance (Summary).** Runs a Google Lighthouse audit on a public URL and returns only a compact summary: 0-100 scores for performance, accessibility, best practices and SEO, Core Web Vitals and the main savings opportunities (never the multi-MB raw report). Use to judge page speed or SEO quality. Takes 20-60 seconds; scores vary slightly between runs, so a retry is safe. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The page to audit, for example https://example.com. |
| `device` | string | no |  | Device. Audit as a desktop (default) or mobile visitor. One of `"desktop"`, `"mobile"`. |
| `categories` | array | no |  | Categories. Which scores to compute (all four when empty). One of `"performance"`, `"accessibility"`, `"best-practices"`, `"seo"`. |
| `timeout` | number | no |  | Page Load Timeout (ms). Max page load wait during the audit (default 45000). |

Output fields:

- `scores`: Scores (0-100)
- `scores.performance`: Performance (number)
- `scores.accessibility`: Accessibility (number)
- `scores.bestPractices`: Best Practices (number)
- `scores.seo`: SEO (number)
- `metrics`: Metrics
- `metrics.firstContentfulPaint`: First Contentful Paint
- `metrics.firstContentfulPaint.value`: Value
- `metrics.firstContentfulPaint.numericValue`: Numeric Value (number)
- `metrics.firstContentfulPaint.score`: Score (0-100) (number)
- `metrics.largestContentfulPaint`: Largest Contentful Paint
- `metrics.largestContentfulPaint.value`: Value
- `metrics.largestContentfulPaint.numericValue`: Numeric Value (number)
- `metrics.largestContentfulPaint.score`: Score (0-100) (number)
- `metrics.speedIndex`: Speed Index
- `metrics.speedIndex.value`: Value
- `metrics.speedIndex.numericValue`: Numeric Value (number)
- `metrics.speedIndex.score`: Score (0-100) (number)
- `metrics.timeToInteractive`: Time to Interactive
- `metrics.timeToInteractive.value`: Value
- `metrics.timeToInteractive.numericValue`: Numeric Value (number)
- `metrics.timeToInteractive.score`: Score (0-100) (number)
- `metrics.totalBlockingTime`: Total Blocking Time
- `metrics.totalBlockingTime.value`: Value
- `metrics.totalBlockingTime.numericValue`: Numeric Value (number)
- `metrics.totalBlockingTime.score`: Score (0-100) (number)
- `metrics.cumulativeLayoutShift`: Cumulative Layout Shift
- `metrics.cumulativeLayoutShift.value`: Value
- `metrics.cumulativeLayoutShift.numericValue`: Numeric Value (number)
- `metrics.cumulativeLayoutShift.score`: Score (0-100) (number)
- `opportunities`: Opportunities
- `opportunities[].type`: Type
- `opportunities[].title`: Title
- `opportunities[].potentialSavings`: Potential Savings
- `url`: URL (url)
- `finalUrl`: Final URL (url)
- `formFactor`: Device
- `runtimeError`: Lighthouse Error
- `lighthouseVersion`: Lighthouse Version
- `timestamp`: Audited At (datetime)

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

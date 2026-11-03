# Dumpling AI

Transform unstructured website content into clean, AI-ready data

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-dumpling-ai'
  version: '0.2.1'
```

Categories: ARTIFICIAL_INTELLIGENCE, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain API key from [API Section](https://app.dumplingai.com/api-keys).

## Actions

### `web_search`

**Web Search.** Runs a live web search on Dumpling AI for a query, with optional country/location/language and date-range filtering. Can operate in two modes: results-only, or with "Scrape Results" enabled it also fetches and returns the page content of the top N results (markdown, HTML, or screenshot). Use to find current web pages or grab their content in one step. Not idempotent: each call is a fresh billed search whose results reflect live web state. Needs authentication.

Kind: search, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. |
| `country` | string | no |  | Country. Two-letter country code for location bias (e.g., "US" for United States). |
| `location` | string | no |  | Location. Specific location to focus the search (e.g., "New York, NY"). |
| `language` | string | no |  | Language. Language code for the search results (e.g., "en" for English). |
| `dateRange` | string | no |  | Date Range. Filter results by date. One of `"anyTime"`, `"pastHour"`, `"pastDay"`, `"pastWeek"`, `"pastMonth"`, `"pastYear"`. |
| `page` | number | no |  | Page Number. Page number for paginated results. |
| `scrapeResults` | boolean | no | `false` | Scrape Results. Whether to scrape top search results. |
| `numResultsToScrape` | number | no | `3` | Number of Results to Scrape. Number of top results to scrape (max: 10). |
| `scrapeFormat` | string | no | `"markdown"` | Scrape Format. Format of scraped content. One of `"markdown"`, `"html"`, `"screenshot"`. |
| `cleanedOutput` | boolean | no | `true` | Clean Output. Whether the scraped output should be cleaned. |

### `search_news`

**Search News.** Searches Google News via Dumpling AI for a query, with optional country/location/language and date-range filtering plus pagination. Choose this over the general web search when the agent needs news articles specifically. Not idempotent: each call is a fresh billed search reflecting live news at request time. Needs authentication.

Kind: search, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. The search query for Google News. |
| `country` | string | no |  | Country. Country code for location bias (e.g., "US" for United States). |
| `location` | string | no |  | Location. Specific location to focus the search (e.g., "New York, NY"). |
| `language` | string | no |  | Language. Language code for the search results (e.g., "en" for English). |
| `dateRange` | string | no |  | Date Range. Filter results by date. One of `"anyTime"`, `"pastHour"`, `"pastDay"`, `"pastWeek"`, `"pastMonth"`, `"pastYear"`. |
| `page` | number | no |  | Page Number. Page number for paginated results. |

### `generate_image`

**Generate Image.** Generates one or more images from a text prompt using a selectable FLUX or recraft model on Dumpling AI, with optional aspect ratio, output format, image count, and seed. Use when the agent needs to create images from a description. Not idempotent: each call is a fresh billed generation; even with a fixed seed it produces new output and consumes credits. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"FLUX.1-schnell"` | Model. The model to use for image generation. One of `"FLUX.1-schnell"`, `"FLUX.1-dev"`, `"FLUX.1-pro"`, `"FLUX.1.1-pro"`, `"recraft-v3"`. |
| `prompt` | string | yes |  | Prompt. The text prompt for image generation. |
| `aspect_ratio` | string | no | `"1:1"` | Aspect Ratio. Aspect ratio of the generated image. One of `"1:1"`, `"16:9"`, `"21:9"`, `"3:2"`, `"4:3"`, `"2:3"`, `"3:4"`, `"4:5"`, `"9:16"`, `"9:21"`. |
| `num_outputs` | number | no | `1` | Number of Images. Number of images to generate (1-4) |
| `seed` | number | no |  | Seed. Seed for reproducible results. |
| `output_format` | string | no | `"webp"` | Output Format. Format of the generated image. One of `"webp"`, `"jpg"`, `"png"`. |

### `scrape_website`

**Scrape Website.** Fetches the content of a single given URL via Dumpling AI and returns it as markdown, HTML, or a screenshot, with optional content cleaning and JavaScript rendering. Use to read one specific page; use Crawl Website instead to follow links across many pages. Not idempotent: each call is a fresh billed fetch reflecting the live page. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. |
| `format` | string | no | `"markdown"` | Output Format. The format of the output. One of `"markdown"`, `"html"`, `"screenshot"`. |
| `cleaned` | boolean | no | `true` | Clean Output ?. Whether the output should be cleaned. |
| `renderJs` | boolean | no | `true` | Render JavaScript ?. Whether to render JavaScript before scraping. |

### `crawl_website`

**Crawl Website.** Crawls a website starting from a given URL via Dumpling AI, following links up to a configurable page limit and depth, and returns each page as markdown, text, or raw content. Use when the agent needs content from many pages of a site at once; use Scrape Website for a single known URL. Not idempotent: each call is a fresh billed crawl reflecting live site state. Needs authentication.

Kind: search, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The website URL to crawl. |
| `limit` | number | no | `5` | Page Limit. Maximum number of pages to crawl. |
| `depth` | number | no | `2` | Crawl Depth. Depth of crawling (distance between base URL path and sub paths). |
| `format` | string | no | `"markdown"` | Output Format. Format of the output content. One of `"markdown"`, `"text"`, `"raw"`. |

### `extract_document`

**Extract Document Data.** Extracts data from an uploaded document (file or base64) using vision-capable AI on Dumpling AI, guided by a free-text extraction prompt, optionally returning the result as JSON. Use to pull fields or content out of PDFs, images, or scanned files. Not idempotent: each call is a fresh billed AI extraction whose output may vary. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. File URL or base64-encoded file. Files are not supported; an action that needs one fails. |
| `prompt` | string | yes |  | Extraction Prompt. The prompt describing what data to extract from the document. |
| `jsonMode` | boolean | no | `false` | JSON Mode. Whether to return the result in JSON format. |

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

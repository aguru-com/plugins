# DataFuel

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-datafuel'
  version: '0.2.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain API key from [Settings](https://app.datafuel.dev/account/api_key).

## Actions

### `crawl-website`

**Crawl Website.** Crawls a website starting from a URL, following links up to a configurable depth and page limit, and returns each page as markdown; optionally extract structured data by supplying a JSON schema (OpenAI function-calling format) and an AI prompt. Use to gather content across many pages of a site, not just one. Submits a new crawl job and polls until it finishes, so each call starts fresh work and is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. |
| `prompt` | string | no |  | AI Prompt. Prompt to crawl data. |
| `depth` | number | yes |  | Depth. The depth of the crawl 1 depth mean only the first level of links will be scraped. |
| `limit` | number | yes |  | Limit. The maximum number of pages to scrape. |
| `jsonSchema` | JSON | no |  | JSON Schema. JSON schema definition for structured data extraction.Format should follow OpenAI's function calling schema format (https://platform.openai.com/docs/guides/structured-outputs) |

### `scrape-website`

**Crawl Website.** Scrapes a single URL and returns its content as markdown; optionally extract structured data by supplying a JSON schema (OpenAI function-calling format) and an AI prompt. Use when you need one page rather than crawling a whole site (use Crawl Website for multi-page traversal). Submits a new scrape job and polls until it finishes, so each call starts fresh work and is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. |
| `prompt` | string | no |  | AI Prompt. Prompt to crawl data. |
| `jsonSchema` | JSON | no |  | JSON Schema. JSON schema definition for structured data extraction.Format should follow OpenAI's function calling schema format (https://platform.openai.com/docs/guides/structured-outputs) |

### `get-scrape`

**Get Scrape Result.** Looks up the result of a previously submitted scrape or crawl job by its job ID, optionally including the markdown content and the AI-extracted JSON result. Use to fetch the output of a job started by Crawl Website or Scrape Website. Requires a valid job ID; this is a read-only lookup and is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jobId` | string | yes |  | Job ID. |
| `aiResponse` | boolean | yes |  | AI JSON Result. |
| `markdownResponse` | boolean | yes |  | Markdown Result. |

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

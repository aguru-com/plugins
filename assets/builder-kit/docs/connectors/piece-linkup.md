# Linkup

Linkup is a web search engine for AI apps. Connect your AI application to the internet and get grounding data to enrich your AI's output.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-linkup'
  version: '0.1.7'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API Key:
>
> 1. Go to your Linkup account dashboard
> 2. Navigate to API settings
> 3. Copy your API key
> 4. Paste it here

## Actions

### `search`

**Search the Web.** Runs a web search through Linkup for a natural-language query and returns grounding data from the live internet. Choose it to retrieve up-to-date facts, sources, or answers to enrich an LLM response. The Output Type selects what comes back: searchResults (raw matches), sourcedAnswer (a synthesized answer with citations), or structured (custom JSON shaped by the schema you supply, which is required in that mode); narrow scope with depth, date range, and include/exclude domain filters. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `q` | string | yes |  | Query. The natural language question or query to search for. |
| `depth` | string | yes | `"standard"` | Search Depth. Standard returns results faster; deep takes longer but yields more comprehensive results. One of `"standard"`, `"deep"`. |
| `outputType` | string | yes | `"searchResults"` | Output Type. Format of the response. Use structured for custom JSON format. One of `"searchResults"`, `"sourcedAnswer"`, `"structured"`. |
| `structuredOutputSchema` | string | no |  | Structured Output Schema. JSON schema (as a string) for the desired response format. Required only when Output Type is "structured". |
| `includeSources` | boolean | no | `false` | Include Sources. Include sources in the response. Only relevant when Output Type is "structured". |
| `includeImages` | boolean | no | `false` | Include Images. Include images in search results. |
| `fromDate` | string | no |  | From Date. Start date for search results in ISO 8601 format (YYYY-MM-DD), e.g., 2025-01-01. |
| `toDate` | string | no |  | To Date. End date for search results in ISO 8601 format (YYYY-MM-DD), e.g., 2025-01-01. |
| `includeDomains` | array | no |  | Include Domains. Domains to search within (up to 100 domains). Leave empty to search all domains. |
| `excludeDomains` | array | no |  | Exclude Domains. Domains to exclude from search results. |
| `includeInlineCitations` | boolean | no | `false` | Include Inline Citations. Include inline citations in the answer. Only relevant when Output Type is "sourcedAnswer". |
| `maxResults` | number | no |  | Max Results. Maximum number of results to return. |

### `fetch`

**Fetch Webpage.** Retrieves a single webpage by URL through Linkup and returns its content as markdown. Use it to read the contents of a specific known page (not to search for pages). Optionally render JavaScript before fetching, include the raw HTML, or extract images. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The URL of the webpage to fetch. |
| `renderJs` | boolean | no | `false` | Render JavaScript. Render JavaScript on the webpage before fetching. |
| `includeRawHtml` | boolean | no | `false` | Include Raw HTML. Include the raw HTML in the response. |
| `extractImages` | boolean | no | `false` | Extract Images. Extract images from the webpage. |

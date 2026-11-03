# Lusha

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-lusha'
  version: '0.2.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Please enter the API Key obtained from Lusha.

## Actions

### `search_companies`

**Search Companies.** Search the Lusha prospecting database for companies matching a JSON filter (industry, size, location, contact countries, etc.), auto-paginating up to a result cap (max 10000). Use to discover company candidates before enriching them; the returned requestId and company IDs feed the Enrich Companies action. Read-only and idempotent for the same filter. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resultLimit` | number | yes | `10000` | Maximum Results. Maximum number of companies to return. The maximum is 10000 results. |
| `requestBody` | JSON | yes | `{"filters":{"contacts":{"include":{"countries":["ES"]}},"companies":{"include":{"sizes":[{"max":50,"min":11}],"locations":[{"country":"Spain"}],"mainIndustriesIds":[17,14]}}}}` | Request Body. The JSON body for the search request. Do not include pagination (pages), it will be added automatically. |

### `enrich_companies`

**Enrich Companies.** Fetch full company profiles from Lusha for the companies returned by a prior Search Companies call, using that search step's requestId and the company IDs in its data. Use after Search Companies when you need detailed company records rather than just match candidates; it requires the raw search-results object and cannot enrich arbitrary company IDs. Read-only lookup and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchResults` | JSON | yes |  | Search Results. The results from the Search Companies step. |

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

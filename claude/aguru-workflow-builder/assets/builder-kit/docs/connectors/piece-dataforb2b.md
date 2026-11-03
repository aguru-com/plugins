# DataForB2B

Power your sales or recruiting AI agent with live B2B data. DataForB2B is a people and company search API with 70+ filters including job title, skills, company size, LinkedIn URL, funding stage, investor, past employers, certifications, years of experience, GitHub repositories, languages and more.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-dataforb2b'
  version: '0.1.2'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your DataForB2B API key. Get it from https://app.dataforb2b.ai

## Actions

### `search_people`

**Search People.** Search the DataForB2B people database with structured filter conditions across 50+ profile fields (current and past title, company, skills, location, education, languages, certifications, experience), combined by AND or OR and optionally merged with a raw advanced-filter JSON group. Use to build prospect or candidate lists by criteria, then pass a returned identifier to Enrich Profile for email and phone; prefer Reasoning Search when the criteria are only expressible in plain language. Requires at least one filter or an advanced filter group; read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `match` | string | no | `"and"` | Filter Logic. How to combine multiple filters. One of `"and"`, `"or"`. |
| `filters` | array | no |  | Filters. Conditions used to filter the search. Each item: { `field`, `operator`, `value`, `value2`? }. |
| `advancedFilters` | JSON | no |  | Advanced Filters (JSON). Optional raw filter group, e.g. {"op":"or","conditions":[{"column":"skill","type":"like","value":"python"}]}. Merged with the filters above. |
| `count` | number | no | `25` | Count. Number of results to return (max 1000) |
| `offset` | number | no | `0` | Offset. Pagination offset - number of results to skip. |
| `enrichLive` | boolean | no | `false` | Enrich Live. Enrich results with fresh live data. |

### `search_companies`

**Search Companies.** Search the DataForB2B company database with structured filter conditions over firmographic fields (name, domain, industry, employee count, location, growth, funding stage, investor), combined by AND or OR and optionally merged with a raw advanced-filter JSON group. Use to discover companies by criteria or to resolve a company to an identifier for Enrich Company; prefer Reasoning Search when the criteria are only expressible in plain language. Requires at least one filter or an advanced filter group; read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `match` | string | no | `"and"` | Filter Logic. How to combine multiple filters. One of `"and"`, `"or"`. |
| `filters` | array | no |  | Filters. Conditions used to filter the search. Each item: { `field`, `operator`, `value`, `value2`? }. |
| `advancedFilters` | JSON | no |  | Advanced Filters (JSON). Optional raw filter group, e.g. {"op":"or","conditions":[{"column":"skill","type":"like","value":"python"}]}. Merged with the filters above. |
| `count` | number | no | `25` | Count. Number of results to return (max 1000) |
| `offset` | number | no | `0` | Offset. Pagination offset - number of results to skip. |
| `enrichLive` | boolean | no | `false` | Enrich Live. Enrich results with fresh live data. |

### `reasoning_search`

**Reasoning Search.** Run a plain-language people or company search in which a DataForB2B agent builds the filters, over two possible turns: a first call carrying the query, or a follow-up call carrying the session ID plus an answers object when a prior turn returned needs_input. Use when the criteria are fuzzy or unstructured; prefer Search People or Search Companies when the criteria map to explicit field filters. Requires either a query or a session ID with answers; read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Query. Plain-language description, e.g. "Heads of Sales at French fintech scale-ups" (max 3000 chars). Required on the first call. |
| `category` | string | no | `"people"` | Category. Whether to search people or companies. One of `"people"`, `"companies"`. |
| `maxResults` | number | no | `25` | Max Results. Number of results for the final search (1-100) |
| `sessionId` | string | no |  | Session ID. Session id returned by a previous call. Send it back to answer questions or refine the same search. |
| `answers` | JSON | no |  | Answers (JSON). Answers to a needs_input turn, e.g. {"company_size":"201-500"}. Requires Session ID. |
| `enrichLive` | boolean | no | `false` | Enrich Live. Enrich results with fresh live data instead of cached data. |

### `typeahead`

**Typeahead.** Autocomplete a partial string against one DataForB2B reference vocabulary selected by the type prop: company (returns org_id), people industry, company industry, category, location, city, region, school, job title, skill, or investor. Use it before Search People or Search Companies to resolve a filter value to the exact stored spelling, or after a search returns few or no matches. Requires a type and a query of 1-100 characters; read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Type. The category to autocomplete. One of `"company"`, `"people_industry"`, `"company_industry"`, `"category"`, `"location"`, `"city"`, `"region"`, `"school"`, `"title"`, `"skill"`, `"investor"`. |
| `q` | string | yes |  | Query. Partial text to autocomplete (1-100 characters), e.g. "pyth". |
| `limit` | number | no | `20` | Limit. Maximum number of results (1-20) |

### `enrich_profile`

**Enrich Profile.** Look up one person in the DataForB2B database by LinkedIn URL, public ID, or encoded ID, with separate toggles selecting which enrichments run: full profile (the default when no toggle is set), work email, personal email, phone, and GitHub. Use when you already hold a person identifier and need their profile or contact details; use Search People instead to find people matching criteria. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `profileIdentifier` | string | yes |  | Profile Identifier. LinkedIn URL, public ID, or encoded ID. |
| `includeProfile` | boolean | no | `true` | Enrich Profile. Retrieve full profile data. |
| `enrichWorkEmail` | boolean | no | `false` | Enrich Work Email. Retrieve professional email. |
| `enrichPersonalEmail` | boolean | no | `false` | Enrich Personal Email. Retrieve personal email. |
| `enrichPhone` | boolean | no | `false` | Enrich Phone. Retrieve phone number. |
| `enrichGithub` | boolean | no | `false` | Enrich GitHub. Retrieve GitHub profile and repositories. |

### `enrich_company`

**Enrich Company.** Look up one company in the DataForB2B database by slug, LinkedIn company URL, or encoded company ID, returning its full firmographic record. Use when you already hold a company identifier; use Search Companies to find companies by criteria, or Typeahead to resolve a company name to its stored identifier first. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyIdentifier` | string | yes |  | Company Identifier. Company slug, LinkedIn URL, or encoded ID. |

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

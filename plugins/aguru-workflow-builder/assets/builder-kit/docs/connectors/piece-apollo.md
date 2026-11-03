# Apollo

AI sales platform for prospecting, lead gen, and deal automation. Close more deals, faster, with smart data.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-apollo'
  version: '0.2.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To create your Apollo API key:
>
> 1. Go to **Settings** > **[Integrations](https://app.apollo.io/#/settings/integrations)** in Apollo
> 2. Click **Connect** beside Apollo API
> 3. Click **API Keys** > **Create new key**
> 4. Enter a name and description, then select the endpoints you need (or toggle **Set as master key** for full access)
> 5. Click **Create API key** and copy it to a secure location
>
> **Note:** Some endpoints require a master API key. Keep your API keys secure and be careful with whom you share access.
>
> [Learn more about creating API keys](https://docs.apollo.io/docs/create-api-key)

## Actions

### `matchPerson`

**Match Person.** Look up and enrich a single person in the Apollo database by their email address, returning their profile data. Use when you have an email and need the matching contact/profile details. Read-only and idempotent; an optional project-store cache may return a previously fetched result for the same email. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The email address of the person to be matched. |
| `cacheResponse` | boolean | no | `true` | Cache Response. Store the response in the project store for future use. |

### `enrichCompany`

**Enrich Company.** Look up and enrich a single company in the Apollo database by its web domain, returning the organization profile. Use when you have a company domain and need firmographic details. Read-only and idempotent; an optional project-store cache may return a previously fetched result for the same domain. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. |
| `cacheResponse` | boolean | no | `true` | Cache Response. Store the response in the project store for future use. |

### `newsArticlesSearch`

**News Articles Search.** Search the Apollo database for news articles about specific companies, filterable by news category and a published-date range. Use to surface recent events (hires, funding, contracts) for given organizations. Requires Apollo organization IDs (obtained from Organization Search). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization_ids` | array | yes |  | Organization IDs. The Apollo IDs for the companies you want to include in your search results. To find IDs, call the Organization Search endpoint. |
| `categories` | array | no |  | Categories. Filter your search to include only certain categories or sub-categories of news (e.g., hires, investment, contract) |
| `published_at_min` | string | no |  | Published Date Min. Lower bound of the date range (YYYY-MM-DD format) |
| `published_at_max` | string | no |  | Published Date Max. Upper bound of the date range (YYYY-MM-DD format) |
| `cacheResponse` | boolean | no | `false` | Cache Response. Store the response in the project store for future use. |

### `organizationJobPostings`

**Organization Job Postings.** Retrieve the current job postings for a single company in the Apollo database, useful for spotting hiring activity and growth areas. Requires the Apollo organization ID (obtained from Organization Search). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization_id` | string | yes |  | Organization ID. The Apollo ID of the organization to get job postings for. |
| `cacheResponse` | boolean | no | `false` | Cache Response. Store the response in the project store for future use. |

### `organizationSearch`

**Organization Search.** Search the Apollo database for companies using filters such as name, location, employee-count range, domain, and industry tags. Use to discover organizations or to resolve a company to its Apollo organization ID for downstream actions. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `q_organization_name` | string | no |  | Organization Name. Search by organization name. |
| `organization_locations` | array | no |  | Organization Locations. Filter by locations (e.g., texas, tokyo) |
| `organization_not_locations` | array | no |  | Exclude Locations. Exclude specific locations (e.g., minnesota) |
| `organization_num_employees_ranges` | array | no |  | Employee Count Ranges. Filter by employee count ranges (e.g., "1,10", "250,500") |
| `organization_ids` | array | no |  | Organization IDs. Filter by specific organization IDs. |
| `q_organization_domains` | array | no |  | Domains. Filter by organization domains. |
| `organization_industry_tag_ids` | array | no |  | Industry Tag IDs. Filter by industry tag IDs. |
| `cacheResponse` | boolean | no | `false` | Cache Response. Store the response in the project store for future use. |

### `peopleSearch`

**People Search.** Search the Apollo database for people using filters such as keywords, job titles, seniority, location, and their organization (domain, location, employee-count range). Use to find prospects matching criteria; note the results do not include email or phone, so use Match Person enrichment for contact details. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `q_keywords` | string | no |  | Keywords. Search keywords for people. |
| `person_titles` | array | no |  | Person Titles. Filter by job titles (e.g., "CEO", "Sales Manager") |
| `person_locations` | array | no |  | Person Locations. Filter by person locations. |
| `person_seniorities` | array | no |  | Person Seniorities. Filter by seniority levels (e.g., "senior", "manager", "director") |
| `organization_ids` | array | no |  | Organization IDs. Filter by specific organization IDs. |
| `organization_num_employees_ranges` | array | no |  | Organization Employee Ranges. Filter by organization employee count ranges (e.g., "1,10", "250,500") |
| `q_organization_domains` | array | no |  | Organization Domains. Filter by organization domains. |
| `organization_locations` | array | no |  | Organization Locations. Filter by organization locations. |
| `cacheResponse` | boolean | no | `false` | Cache Response. Store the response in the project store for future use. |

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

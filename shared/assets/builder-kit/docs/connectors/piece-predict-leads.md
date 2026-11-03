# PredictLeads

Company Intelligence Data Source

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-predict-leads'
  version: '0.2.0'
```

Categories: BUSINESS_INTELLIGENCE, SALES_AND_CRM, MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To obtain your PredictLeads tokens, follow these steps:
>
> 1. Have a PredictLeads account - Create a new user here: https://predictleads.com/sign_up.
> 2. Go to: https://predictleads.com/subscriptions.
> 3. In the subscription page, locate the API Key and Tokens section where you can also find the usage.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. The key of the Predict Leads account. |
| `apiToken` | string | yes |  | API Token. The token of the Predict Leads account. |

## Actions

### `predict-leads_find_companies`

**List Companies.** Discovers companies in the PredictLeads database filtered by location and employee headcount range (e.g. "11-50"). Use to prospect or build a target-account list when you do not yet know specific company domains; both location and size range are required. Read-only and idempotent; supports pagination. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location` | string | yes |  | Location. |
| `minMaxSizes` | string | yes |  | Min Max Size. A min-max size range. Examples: "11-50"". For now, only single range is supported. |
| `page` | number | no |  | Page. Page number of shown items. |
| `limit` | number | no |  | Limit. Limit the number of shown items per page. Max 1000. |

### `predict-leads_find_company_by_domain`

**Retrieve a company.** Looks up a single company profile in PredictLeads by its web domain (e.g. "stripe.com"). Use when you already know the domain and want that company's details. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. The domain of the company to find. |

### `predict-leads_find_job_openings`

**List Job Openings.** Discovers job openings across all companies in PredictLeads, optionally filtered by O*NET occupation codes (e.g. "15-1254.00" for Web Developers). Use to find hiring activity for specific roles without targeting a particular company; for one known company's postings use the company job-openings action instead. Read-only and idempotent; supports pagination. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `onet_codes` | array | no |  | onet_codes. O*NET codes to filter by, such as "17-2071.00" for "Electrical Engineers" or "15-1254.00" for "Web Developers". For full list of possible codes see: https://www.onetonline.org/find/all. |
| `page` | number | no |  | Page. Page number of shown items. |
| `limit` | number | no |  | Limit. Limit the number of shown items per page. Max 1000. |

### `predict-leads_find_company_job_openings`

**List Company's Job Openings.** Lists a specific company's job openings in PredictLeads, keyed by its domain. Optional filters narrow results to active or not-yet-closed postings, date windows, openings that have a description or location, and job categories. Use to gauge a known company's hiring activity as a buying or growth signal; requires the company domain. Read-only and idempotent; supports pagination. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. Company's domain. |
| `active_only` | boolean | no |  | Active Only. Set to true if you'd like to receive JobOpenings that are not closed, have last_seen_at more recent than 5 days and were found in the last year. |
| `not_closed` | boolean | no |  | Not Closed. Similar to active_only, but without considering last_seen_at timestamp. |
| `first_seen_at_from` | string | no |  | First Seen At From. Only return data first seen after given date . Example 2024-09-25. |
| `first_seen_at_until` | string | no |  | First Seen At Until. Only return data first seen before given date . Example 2024-09-25. |
| `last_seen_at_from` | string | no |  | Last Seen At From. Only return data last seen after given date . Example 2024-09-25. |
| `last_seen_at_until` | string | no |  | Last Seen At Until. Only return data last seen before given date . Example 2024-09-25. |
| `with_description_only` | boolean | no |  | With Description Only. Only return JobOpenings that have description. |
| `with_location_only` | boolean | no |  | With Location Only. Only return JobOpenings that have location. |
| `categories` | array | no |  | Categories. Select categories to filter job openings. One of `"administration"`, `"consulting"`, `"data_analysis"`, `"design"`, `"directors"`, `"education"`, `"engineering"`, `"finance"`, `"healthcare_services"`, `"human_resources"`, `"information_technology"`, `"internship"`, `"legal"`, `"management"`, `"marketing"`, `"military_and_protective_services"`, `"operations"`, `"purchasing"`, `"product_management"`, `"quality_assurance"`, `"real_estate"`, `"research"`, `"sales"`, `"software_development"`, `"support"` and 2 more. |
| `page` | number | no |  | Page. Page number of shown items. |
| `limit` | number | no |  | Limit. Limit the number of shown items per page. Max 1000. |

### `predict-leads_get_a_job_opening_by_id`

**Get Job Opening.** Retrieves the full details of one job opening in PredictLeads by its job opening ID. Use when you already have an opening ID (e.g. from a list/discover call) and want its complete record. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `jobOpeningId` | string | yes |  | Job Opening ID. The ID of the job opening to retrieve. |

### `predict-leads_find_technologies_by_domain`

**List Technologies by domain.** Lists the technologies (technology detections) that a specific company uses, keyed by its domain in PredictLeads. Optional first/last-seen date filters scope detections to a time window. Use for technographic profiling of a known company; requires the company domain. Read-only and idempotent; supports pagination. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. The domain of the company to find. |
| `first_seen_at_from` | string | no |  | First Seen At From. Only return data first seen after given date . Example 2024-09-25. |
| `first_seen_at_until` | string | no |  | First Seen At Until. Only return data first seen before given date . Example 2024-09-25. |
| `last_seen_at_from` | string | no |  | Last Seen At From. Only return data last seen after given date . Example 2024-09-25. |
| `last_seen_at_until` | string | no |  | Last Seen At Until. Only return data last seen before given date . Example 2024-09-25. |
| `page` | number | no |  | Page. Page number of shown items. |
| `limit` | number | no |  | Limit. Limit the number of shown items per page. Max 1000. |

### `predict-leads_find_companies_by_technology_id`

**Retrieve companies by technology ID.** Discovers companies that use a given technology, keyed by that technology's ID in PredictLeads. Optional first/last-seen date filters scope results to a time window. Use to build a target list of companies on a specific tool/stack; requires the technology ID (not a name). Read-only and idempotent; supports pagination. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | ID. The ID of the technology to find. |
| `first_seen_at_from` | string | no |  | First Seen At From. Only return data first seen after given date . Example 2024-09-25. |
| `first_seen_at_until` | string | no |  | First Seen At Until. Only return data first seen before given date . Example 2024-09-25. |
| `last_seen_at_from` | string | no |  | Last Seen At From. Only return data last seen after given date . Example 2024-09-25. |
| `last_seen_at_until` | string | no |  | Last Seen At Until. Only return data last seen before given date . Example 2024-09-25. |
| `page` | number | no |  | Page. Page number of shown items. |
| `limit` | number | no |  | Limit. Limit the number of shown items per page. Max 1000. |

### `predict-leads_find_news_by_domain`

**List Company News Events.** Lists news events (buying/intent signals such as funding, acquisitions, leadership changes, office expansions, product launches) for a specific company, keyed by its domain in PredictLeads. Optional found-at date range and event categories narrow the results. Use to surface recent triggers for a known company; requires the company domain. Read-only and idempotent; supports pagination. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. The domain of the company to find. |
| `found_at_from` | string | no |  | Found At From. Only return data first seen after given date . Example 2024-09-25. |
| `found_at_until` | string | no |  | Found At Until. Only return data first seen before given date . Example 2024-09-25. |
| `categories` | array | no |  | Categories. The categories of news to find. One of `"acquires"`, `"merges_with"`, `"sells_assets_to"`, `"signs_new_client"`, `"files_suit_against"`, `"has_issues_with"`, `"closes_offices_in"`, `"decreases_headcount_by"`, `"attends_event"`, `"expands_facilities"`, `"expands_offices_in"`, `"expands_offices_to"`, `"increases_headcount_by"`, `"opens_new_location"`, `"goes_public"`, `"invests_into"`, `"invests_into_assets"`, `"receives_financing"`, `"hires"`, `"leaves"`, `"promotes"`, `"retires_from"`, `"integrates_with"`, `"is_developing"`, `"launches"` and 4 more. |
| `page` | number | no |  | Page. Page number of shown items. |
| `limit` | number | no |  | Limit. Limit the number of shown items per page. Max 1000. |

### `predict-leads_find_news_event_by_id`

**Get News Event.** Retrieves the full details of one news event in PredictLeads by its event ID. Use when you already have a news event ID (e.g. from a list call) and want its complete record. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | ID. The ID of the news event to find. |

### `predict-leads_find_connections`

**List Connections.** Lists all portfolio-company connections available to the authenticated PredictLeads account, across companies (not scoped to a single domain). Use to retrieve the full connection set rather than one company's connections. Read-only and idempotent; supports pagination. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no |  | Page. Page number of shown items. |
| `limit` | number | no |  | Limit. Limit the number of shown items per page. Max 1000. |

### `predict-leads_find_connections_by_domain`

**Get Company Connections.** Lists a company's business connections (related/linked companies) in PredictLeads, keyed by its domain. Use to map a known company's relationship graph; requires the company domain. Read-only and idempotent; supports pagination. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Domain. The domain to find. |
| `page` | number | no |  | Page. Page number of shown items. |
| `limit` | number | no |  | Limit. Limit the number of shown items per page. Max 1000. |

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

# Pubrio

Enrich company and people data, monitor changes, and get notified with Pubrio.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-pubrio'
  version: '0.1.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Go to dashboard.pubrio.com → Settings → API Keys → Create New Key → copy the key here.

## Actions

### `search_companies`

**Search Companies.** Discover B2B companies matching many optional filters: name, domain, location, industry vertical, technology stack, headcount, revenue, founding year, hiring/job signals, news, and ad activity, with pagination (max 25 per page) and optional similarity search. Read-only and repeatable. Pick this for criteria-based prospecting; use Enrich Company when you already have one company identifier or Lookup Lookalike to find peers of a single seed company. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company_name` | string | no |  | Company Name. |
| `domains` | array | no |  | Domains. |
| `linkedin_urls` | array | no |  | LinkedIn URLs. LinkedIn company URLs. |
| `locations` | array | no |  | Locations. Location codes. |
| `exclude_locations` | array | no |  | Exclude Locations. ISO country codes to exclude. |
| `places` | array | no |  | Places. Place names. |
| `exclude_places` | array | no |  | Exclude Places. Place names to exclude. |
| `keywords` | array | no |  | Keywords. |
| `verticals` | array | no |  | Verticals. Industry verticals. |
| `vertical_categories` | array | no |  | Vertical Categories. Vertical category IDs. |
| `vertical_sub_categories` | array | no |  | Vertical Sub-Categories. Vertical sub-category IDs. |
| `technologies` | array | no |  | Technologies. |
| `categories` | array | no |  | Technology Categories. Technology category IDs. |
| `companies` | array | no |  | Companies. Company domain_search_id UUIDs. |
| `employees_min` | number | no |  | Min Employees. |
| `employees_max` | number | no |  | Max Employees. |
| `revenue_min` | number | no |  | Min Revenue. |
| `revenue_max` | number | no |  | Max Revenue. |
| `founded_year_start` | number | no |  | Founded Year Start. Minimum founding year. |
| `founded_year_end` | number | no |  | Founded Year End. Maximum founding year. |
| `is_enable_similarity_search` | boolean | no | `false` | Enable Similarity Search. |
| `similarity_score` | number | no |  | Similarity Score. 0-1. |
| `exclude_fields` | array | no |  | Exclude Fields. Field names to exclude. |
| `job_titles` | array | no |  | Job Titles. |
| `job_locations` | array | no |  | Job Locations. Country codes for job locations. |
| `job_exclude_locations` | array | no |  | Job Exclude Locations. Country codes to exclude. |
| `job_posted_dates` | array | no |  | Job Posted Dates. Date range YYYY-MM-DD. |
| `news_categories` | array | no |  | News Categories. News category slugs. |
| `news_published_dates` | array | no |  | News Published Dates. Date range YYYY-MM-DD. |
| `news_galleries` | array | no |  | News Galleries. News gallery slugs. |
| `news_gallery_ids` | array | no |  | News Gallery IDs. News gallery UUIDs. |
| `advertisement_search_terms` | array | no |  | Advertisement Search Terms. Keywords. |
| `advertisement_target_locations` | array | no |  | Advertisement Target Locations. Country codes. |
| `advertisement_exclude_target_locations` | array | no |  | Advertisement Exclude Target Locations. Country codes. |
| `advertisement_start_dates` | array | no |  | Advertisement Start Dates. Date range YYYY-MM-DD. |
| `advertisement_end_dates` | array | no |  | Advertisement End Dates. Date range YYYY-MM-DD. |
| `page` | number | no | `1` | Page. |
| `per_page` | number | no | `25` | Per Page. Max 25. |

### `lookup_company`

**Lookup Company.** Enrich a single known company and return its firmographic profile, given one identifier selected via lookup_type: domain, LinkedIn URL, domain_search_id, or domain_id (integer). Read-only and repeatable. Use when you already have one company and want its details; to discover companies from criteria use a search action, and for live LinkedIn scraping use Company LinkedIn Lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lookup_type` | string | yes |  | Lookup Type. One of `"domain"`, `"linkedin_url"`, `"domain_search_id"`, `"domain_id"`. |
| `value` | string | yes |  | Value. Domain, LinkedIn URL, Domain Search ID, or Domain ID (integer) |

### `enrich_company`

**Enrich Company.** Enrich a single known company by domain, LinkedIn URL, domain search ID, or numeric domain ID to retrieve full firmographic details. A read-only lookup that is safe to repeat (it consumes credits but does not change data). Pick this when you already have one company identifier; use Search Companies to discover companies by criteria. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lookup_type` | string | yes |  | Lookup Type. One of `"domain"`, `"linkedin_url"`, `"domain_search_id"`, `"domain_id"`. |
| `value` | string | yes |  | Value. Domain, LinkedIn URL, Domain Search ID, or Domain ID (integer) |

### `search_people`

**Search People.** Search the people database for business professionals using filters such as name, job title, management level, department, location, employer company/domain, or LinkedIn URL, with paging (per_page max 25). Read-only and repeatable; results identify people but do not include contact details. Use to discover prospects, then pass a people_search_id to Reveal Contact (credit cost) or Lookup Person. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_term` | string | no |  | Search Term. |
| `people_name` | string | no |  | Person Name. |
| `people_titles` | array | no |  | Job Titles. |
| `peoples` | array | no |  | People IDs. People UUIDs. |
| `management_levels` | array | no |  | Management Levels. |
| `departments` | array | no |  | Departments. |
| `department_functions` | array | no |  | Department Functions. |
| `employees` | array | no |  | Employee Ranges. Employee count ranges. |
| `people_locations` | array | no |  | People Locations. |
| `company_locations` | array | no |  | Company Locations. |
| `company_linkedin_urls` | array | no |  | Company LinkedIn URLs. |
| `linkedin_urls` | array | no |  | People LinkedIn URLs. |
| `companies` | array | no |  | Companies. Company UUIDs. |
| `domains` | array | no |  | Company Domains. |
| `page` | number | no | `1` | Page. |
| `per_page` | number | no | `25` | Per Page. Max 25. |

### `lookup_person`

**Lookup Person.** Enrich a single known person and return their professional profile, identified via lookup_type: LinkedIn URL or people_search_id. Read-only and repeatable; the profile does not include revealed contact details. Use when you already have one person and want their details (use Reveal Contact for email/phone, which costs credits); to discover people from criteria use Search People. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lookup_type` | string | yes |  | Lookup Type. One of `"linkedin_url"`, `"people_search_id"`. |
| `value` | string | yes |  | Value. |

### `reveal_contact`

**Reveal Contact.** Reveal a person's contact details (work/personal email and/or phone) for a single individual identified by people_search_id or LinkedIn URL. This consumes account credits and is not idempotent in cost, so call it only once contacts are actually needed. Use for one person at a time after locating them via Search People or Lookup Person. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lookup_type` | string | yes |  | Lookup Type. One of `"people_search_id"`, `"linkedin_url"`. |
| `value` | string | yes |  | Value. People Search ID or LinkedIn URL. |
| `people_contact_types` | array | no |  | Contact Types. One of `"email-work"`, `"email-personal"`, `"phone"`. |

### `search_jobs`

**Search Jobs.** Search job postings across companies, filtering by keywords, job titles, posted-date ranges, locations (or excluded locations), and target companies/domains/LinkedIn URLs, with paging (per_page max 25). Read-only and repeatable. Use to find hiring signals or open roles, then pass a job_search_id to Lookup Job for full detail. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_term` | string | no |  | Search Term. |
| `search_terms` | array | no |  | Search Terms. |
| `titles` | array | no |  | Job Titles. |
| `posted_dates` | array | no |  | Posted Dates. Date filters. |
| `locations` | array | no |  | Locations. |
| `exclude_locations` | array | no |  | Exclude Locations. Locations to exclude. |
| `company_locations` | array | no |  | Company Locations. |
| `companies` | array | no |  | Companies. Company UUIDs. |
| `domains` | array | no |  | Company Domains. |
| `linkedin_urls` | array | no |  | LinkedIn URLs. |
| `page` | number | no | `1` | Page. |
| `per_page` | number | no | `25` | Per Page. Max 25. |

### `search_news`

**Search News.** Search company news articles and press releases by keyword, company domain, category, location, or publish date, with pagination (max 25 per page). Read-only and repeatable. Pick this for news/PR monitoring of companies; use Search Companies for firmographic discovery instead. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_term` | string | no |  | Search Term. |
| `search_terms` | array | no |  | Search Terms. Keywords. |
| `domains` | array | no |  | Company Domains. |
| `companies` | array | no |  | Companies. Company domain_search_id UUIDs. |
| `categories` | array | no |  | News Categories. |
| `published_dates` | array | no |  | Published Dates. Date filters. |
| `locations` | array | no |  | Locations. |
| `company_locations` | array | no |  | Company Locations. |
| `news_gallery_ids` | array | no |  | News Gallery IDs. Gallery IDs. |
| `news_galleries` | array | no |  | News Galleries. Gallery names. |
| `news_languages` | array | no |  | News Languages. Language codes. |
| `page` | number | no | `1` | Page. |
| `per_page` | number | no | `25` | Per Page. Max 25. |

### `find_similar_companies`

**Find Similar Companies.** Return a paged list of companies that resemble one seed company, identified via lookup_type (domain or LinkedIn URL). Read-only and repeatable (per_page max 25). Use for lookalike prospecting from a known account; to enrich that one seed company instead use Lookup Company. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lookup_type` | string | yes |  | Lookup Type. One of `"domain"`, `"linkedin_url"`. |
| `value` | string | yes |  | Value. |
| `page` | number | no | `1` | Page. |
| `per_page` | number | no | `25` | Per Page. Max 25. |

### `lookup_technology`

**Lookup Technology.** Return the technology stack (technographics) detected for a single company, identified via lookup_type: domain, LinkedIn URL, domain_search_id, or domain_id (integer). Read-only and repeatable. Use to learn what tools/software a known company uses; for general firmographic detail use Lookup Company instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lookup_type` | string | yes |  | Lookup Type. One of `"domain"`, `"linkedin_url"`, `"domain_search_id"`, `"domain_id"`. |
| `value` | string | yes |  | Value. Domain, LinkedIn URL, Domain Search ID, or Domain ID (integer) |

### `linkedin_person_lookup`

**People LinkedIn Lookup.** Resolve a single person profile in real time directly from their LinkedIn profile URL. Read-only and repeatable. Use when you only have a LinkedIn URL and want fresh data; prefer Lookup Person when you have a people_search_id, since this path triggers a live LinkedIn fetch. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `people_linkedin_url` | string | yes |  | LinkedIn URL. Person LinkedIn profile URL. |

### `search_ads`

**Search Advertisements.** Search the advertisement database for company ad campaigns, filtering by keywords, headlines, target/company locations, date ranges, domains, LinkedIn URLs, or company IDs, with paging (per_page max 25). Read-only and repeatable. Use to discover which companies are running ads or to find ad creatives; pass an advertisement_search_id from the results to the Lookup Advertisement action for full detail. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search_terms` | array | no |  | Search Terms. |
| `target_locations` | array | no |  | Target Locations. |
| `exclude_target_locations` | array | no |  | Exclude Target Locations. Locations to exclude. |
| `headlines` | array | no |  | Headlines. Headline keywords. |
| `start_dates` | array | no |  | Start Dates. Start date filters. |
| `end_dates` | array | no |  | End Dates. End date filters. |
| `company_locations` | array | no |  | Company Locations. |
| `domains` | array | no |  | Company Domains. |
| `linkedin_urls` | array | no |  | LinkedIn URLs. |
| `companies` | array | no |  | Companies. Company domain_search_id UUIDs. |
| `page` | number | no | `1` | Page. |
| `per_page` | number | no | `25` | Per Page. Max 25. |

### `linkedin_company_lookup`

**Company LinkedIn Lookup.** Resolve a company profile in real time directly from its LinkedIn company URL. Read-only and repeatable. Use when you only have a LinkedIn URL and want fresh data; prefer Lookup Company when you have a domain or internal ID, since this path triggers a live LinkedIn fetch. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `linkedin_url` | string | yes |  | LinkedIn URL. Company LinkedIn profile URL. |

### `lookup_job`

**Lookup Job.** Fetch the full detail of one job posting given a job_search_id (obtained from the Search Jobs results). Read-only and repeatable. Use after Search Jobs to expand a single result; to discover jobs from criteria use Search Jobs instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_search_id` | string | yes |  | Job Search ID. The job search ID to look up. |

### `lookup_news`

**Lookup News.** Fetch the full detail of one news item given a news_search_id (obtained from a prior news search). Read-only and repeatable. Use to expand a single news result into its complete record. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `news_search_id` | string | yes |  | News Search ID. The news search ID to look up. |

### `lookup_advertisement`

**Lookup Advertisement.** Fetch the full detail of one advertisement given an advertisement_search_id (obtained from Search Advertisements). Read-only and repeatable. Use after Search Advertisements to expand a single ad result. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `advertisement_search_id` | string | yes |  | Advertisement Search ID. The advertisement search ID to look up. |

### `lookup_lookalike`

**Lookup Lookalike Company.** Find companies similar to a given seed company, identified by its domain, LinkedIn URL, or domain search ID. Read-only and repeatable. Pick this for lookalike/competitor discovery from one reference company; use Search Companies for criteria-based discovery and Enrich Company for full details on one firm. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lookup_type` | string | yes |  | Lookup Type. One of `"domain"`, `"linkedin_url"`, `"domain_search_id"`. |
| `value` | string | yes |  | Value. Domain, LinkedIn URL, or Domain Search ID. |

### `batch_redeem_contacts`

**Batch Redeem Contacts.** Reveal contact details (work/personal email or phone) for a batch of people identified by their search IDs. Not idempotent: each call consumes account credits per reveal, so avoid retrying the same IDs unnecessarily. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `peoples` | array | yes |  | People Search IDs. People search IDs. |
| `people_contact_types` | array | no |  | Contact Types. One of `"email-work"`, `"email-personal"`, `"phone"`. |

### `query_batch_redeem`

**Query Batch Redeem.** Poll the status and results of a previously submitted bulk people-redeem (contact reveal) job using its redeem_query_id. Read-only and safe to call repeatedly; it does not start or modify a redeem and consumes no credits itself. Use after a batch redeem has been queued to fetch the resolved emails/phones once ready. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `redeem_query_id` | string | yes |  | Redeem Query ID. The batch redeem query ID. |

### `create_monitor`

**Create Monitor.** Create a new signal monitor that watches selected companies for jobs, news, and/or advertisement signals and delivers matches to a webhook, email, or sequence. Not idempotent: each call creates a separate monitor, so calling twice yields duplicates. Use to set up ongoing monitoring; to change an existing monitor use Update Monitor. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Monitor name. |
| `detection_mode` | string | yes |  | Detection Mode. One of `"company_first"`, `"signal_first"`. |
| `signal_types` | array | yes |  | Signal Types. One of `"jobs"`, `"news"`, `"advertisements"`. |
| `destination_type` | string | yes |  | Destination Type. One of `"webhook"`, `"email"`, `"sequences"`. |
| `webhook_url` | string | no |  | Webhook URL. Required when destination type is webhook. |
| `email` | string | no |  | Email. Required when destination type is email. |
| `sequence_identifier` | string | no |  | Sequence Identifier. Required when destination type is sequences. |
| `record_type` | string | no |  | Record Type. Required when destination type is sequences. |
| `description` | string | no |  | Description. |
| `frequency_minute` | number | no |  | Frequency (minutes). |
| `max_daily_trigger` | number | no |  | Max Daily Triggers. |
| `max_records_per_trigger` | number | no |  | Max Records Per Trigger. |
| `companies` | array | no |  | Companies. Company names. |
| `domains` | array | no |  | Domains. |
| `linkedin_urls` | array | no |  | LinkedIn URLs. |
| `company_filters` | string | no |  | Company Filters. Advanced company filters as JSON string. |
| `signal_filters` | string | no |  | Signal Filters. Signal-specific filters as JSON array string. |
| `people_enrichment_configs` | string | no |  | People Enrichment Configs. People enrichment configs as JSON array string. |
| `is_company_enrichment` | boolean | no | `false` | Company Enrichment. |
| `is_people_enrichment` | boolean | no | `false` | People Enrichment. |
| `max_failure_trigger` | number | no |  | Max Failure Trigger. 1-10. |
| `max_retry_per_trigger` | number | no |  | Max Retry Per Trigger. 0-3. |
| `retry_delay_second` | number | no |  | Retry Delay (seconds). 1-5. |
| `notification_email` | string | no |  | Notification Email. |

### `update_monitor`

**Update Monitor.** Modify the configuration of an existing signal monitor identified by monitor_id, changing only the fields you supply (name, signal types, destination, filters, frequency, active/paused state, etc.). Mutating: it overwrites the named settings on the live monitor, so re-running with the same inputs is safe but changes take effect immediately. Use to edit an already-created monitor; use Create Monitor to make a new one. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `monitor_id` | string | yes |  | Monitor ID. |
| `name` | string | no |  | Name. |
| `detection_mode` | string | no |  | Detection Mode. One of `"company_first"`, `"signal_first"`. |
| `signal_types` | array | no |  | Signal Types. One of `"jobs"`, `"news"`, `"advertisements"`. |
| `destination_type` | string | no |  | Destination Type. One of `"webhook"`, `"email"`, `"sequences"`. |
| `webhook_url` | string | no |  | Webhook URL. |
| `email` | string | no |  | Email. |
| `sequence_identifier` | string | no |  | Sequence Identifier. |
| `record_type` | string | no |  | Record Type. Required when destination type is sequences. |
| `description` | string | no |  | Description. |
| `frequency_minute` | number | no |  | Frequency (minutes). |
| `max_daily_trigger` | number | no |  | Max Daily Triggers. |
| `max_records_per_trigger` | number | no |  | Max Records Per Trigger. |
| `companies` | array | no |  | Companies. Company names. |
| `domains` | array | no |  | Domains. |
| `linkedin_urls` | array | no |  | LinkedIn URLs. |
| `company_filters` | string | no |  | Company Filters. Advanced company filters as JSON string. |
| `signal_filters` | string | no |  | Signal Filters. Signal-specific filters as JSON array string. |
| `people_enrichment_configs` | string | no |  | People Enrichment Configs. People enrichment configs as JSON array string. |
| `is_company_enrichment` | boolean | no | `false` | Company Enrichment. |
| `is_people_enrichment` | boolean | no | `false` | People Enrichment. |
| `is_active` | boolean | no | `false` | Is Active. |
| `is_paused` | boolean | no | `false` | Is Paused. |
| `max_failure_trigger` | number | no |  | Max Failure Trigger. |
| `max_retry_per_trigger` | number | no |  | Max Retry Per Trigger. |
| `retry_delay_second` | number | no |  | Retry Delay (seconds). |
| `notification_email` | string | no |  | Notification Email. |

### `get_monitor`

**Get Monitor.** Fetch a single monitor by its ID, optionally including signature-reveal data. Read-only and repeatable; requires a known monitor ID rather than search criteria. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `monitor_id` | string | yes |  | Monitor ID. |
| `is_signature_reveal` | boolean | no | `false` | Include Signature Reveal. |

### `list_monitors`

**List Monitors.** List the account's signal monitors with paging and ordering (by created_at, updated_at, or name). Read-only and repeatable. Use to enumerate existing monitors or find a monitor_id to pass to Update, Delete, Test Run, or Reveal Monitor Signature. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no | `1` | Page. |
| `per_page` | number | no | `25` | Per Page. |
| `order_by` | string | no |  | Order By. One of `"created_at"`, `"updated_at"`, `"name"`. |
| `is_ascending_order` | boolean | no | `false` | Ascending Order. |

### `delete_monitor`

**Delete Monitor.** Permanently delete the signal monitor identified by monitor_id. Destructive and irreversible; re-running on the same id after deletion has no further effect. Use only when the monitor should be removed entirely rather than paused (pause it via Update Monitor instead). Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `monitor_id` | string | yes |  | Monitor ID. |

### `duplicate_monitor`

**Duplicate Monitor.** Create a copy of an existing monitor (referenced by ID), optionally with a new name. Not idempotent: each call creates a separate new monitor, so repeated calls produce duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `monitor_id` | string | yes |  | Monitor ID. |
| `name` | string | no |  | New Name. Name for the duplicated monitor. |

### `test_run_monitor`

**Test Run Monitor.** Trigger a one-off test execution of an existing monitor (by monitor_id) to verify its configuration and preview matching signals without waiting for the schedule. Not idempotent: each call performs a fresh processing run and may dispatch to the monitor destination. Use for validating a monitor setup, not for routine data retrieval. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `monitor_id` | string | yes |  | Monitor ID. |
| `tried_at` | string | no |  | Tried At. Timestamp for the test run (ISO 8601) |

### `reveal_monitor_signature`

**Reveal Monitor Signature.** Reveal the enriched signature/contact data for a monitor identified by monitor_id. This consumes account credits, so call it only when the revealed data is actually needed rather than to inspect a monitor (use List Monitors for that). Not idempotent in cost. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `monitor_id` | string | yes |  | Monitor ID. |

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

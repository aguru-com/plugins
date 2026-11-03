# Fathom Analytics

Privacy-focused website analytics. Query your site traffic, manage sites and events, and generate custom reports.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-fathom-analytics'
  version: '0.1.2'
```

Categories: MARKETING, BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> To create an API token:
> 1. Go to [https://app.usefathom.com/api](https://app.usefathom.com/api)
> 2. Click **Create new**
> 3. Give your token a name and set permissions (Admin, Read Only, or site-specific)
> 4. Click **Save changes**
> 5. Copy your API token — you won't be able to retrieve it again after navigating away

## Actions

### `list_sites`

**List Sites.** List all Fathom Analytics sites the API key can access, with optional cursor pagination (starting_after / ending_before) and a per-page limit. Use it to discover available site IDs before calling site-, event-, or aggregation-scoped actions. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `10` | Limit. Number of sites to return (1–100). Default is 10. |
| `starting_after` | string | no |  | Starting After (Cursor). Cursor for forward pagination — the last site ID from the previous page. |
| `ending_before` | string | no |  | Ending Before (Cursor). Cursor for backward pagination — the first site ID from the previous page. |

### `get_site`

**Get Site.** Fetch the details of a single Fathom Analytics site by its site ID (e.g. CDBUGS). Use it when you already know the target site ID and need its metadata; call List Sites first if you only have a name. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site ID. The unique identifier for the Fathom site (e.g., CDBUGS). |

### `create_event`

**Create Event.** Create a new custom event (conversion goal) under a Fathom Analytics site, identified by site ID and a goal name. Use it to set up a goal before tracking conversions against it. Not idempotent — each call creates another event, so repeated calls with the same name can produce duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site ID. The unique identifier for the Fathom site. |
| `name` | string | yes |  | Event Name. The name of the event/goal (e.g., "Signup", "Purchase"). |

### `list_events`

**List Events.** List the custom events (conversion goals) defined on a Fathom Analytics site, identified by site ID, with optional cursor pagination and a per-page limit. Use it to discover event IDs and names before aggregating event metrics or creating new goals. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site ID. The unique identifier for the Fathom site. |
| `limit` | number | no | `10` | Limit. Number of events to return (1–100). Default is 10. |
| `starting_after` | string | no |  | Starting After (Cursor). Cursor for forward pagination — the last event ID from the previous page. |
| `ending_before` | string | no |  | Ending Before (Cursor). Cursor for backward pagination — the first event ID from the previous page. |

### `get_aggregation`

**Get Aggregation.** Run a custom analytics aggregation report over a Fathom Analytics site, returning chosen metrics with optional date-range, date/field grouping, filters, sorting, and limit. Operates in two modes set by entity type: "pageview" aggregates page traffic (requires the site ID in entity_id), while "event" aggregates a specific conversion goal (requires both site_id and the event ID in entity_name). Use it to answer traffic or conversion questions; read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entity` | string | yes | `"pageview"` | Entity Type. Whether to aggregate pageviews or events. One of `"pageview"`, `"event"`. |
| `entity_id` | string | no |  | Site ID (for Pageviews). The Fathom site ID to query (e.g., CDBUGS). Required when Entity Type is "Pageview". |
| `site_id` | string | no |  | Site ID (for Events). The Fathom site ID that owns the event. Required when Entity Type is "Event". |
| `entity_name` | string | no |  | Event ID. The ID of the specific event to aggregate. Required when Entity Type is "Event". Find event IDs via the List Events action. |
| `aggregates` | array | yes |  | Aggregates. The metrics to include in the report. One of `"pageviews"`, `"visits"`, `"uniques"`, `"avg_duration"`, `"bounce_rate"`. |
| `date_grouping` | string | no |  | Date Grouping. Group results by this time unit. One of `"hour"`, `"day"`, `"month"`, `"year"`. |
| `field_grouping` | string | no |  | Field Grouping. Group results by this field (e.g., pathname, browser). Makes the report actionable by breaking down totals. One of `"pathname"`, `"hostname"`, `"referrer_hostname"`, `"referrer_pathname"`, `"browser"`, `"browser_version"`, `"device_type"`, `"country_code"`, `"city"`, `"utm_source"`, `"utm_medium"`, `"utm_campaign"`, `"utm_term"`, `"utm_content"`. |
| `date_from` | string | no |  | Date From. Start date for the report in ISO 8601 format (e.g., 2024-01-01T00:00:00.000000Z). |
| `date_to` | string | no |  | Date To. End date for the report in ISO 8601 format (e.g., 2024-12-31T23:59:59.999999Z). |
| `timezone` | string | no |  | Timezone. Timezone for the report (e.g., "America/New_York", "Europe/London"). Defaults to UTC. |
| `sort_by` | string | no |  | Sort By. Field and direction to sort by (e.g., "pageviews:desc" or "uniques:asc"). |
| `limit` | number | no | `20` | Limit. Maximum number of results to return. |
| `filters` | JSON | no |  | Filters. Optional array of filter objects. Example: [{"property": "pathname", "operator": "is", "value": "/blog"}]. |

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

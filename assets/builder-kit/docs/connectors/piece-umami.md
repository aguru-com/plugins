# Umami

Privacy-focused, open-source web analytics.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-umami'
  version: '0.3.1'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Self-hosted (Username & Password)

> Connect to your own Umami instance using the same credentials you use to log in to your dashboard.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseUrl` | string | yes |  | Instance URL. Base URL of your Umami instance (e.g. `https://umami.example.com`). Do not include a trailing slash. |
| `username` | string | yes |  | Username. Your Umami login username. |
| `password` | string | yes |  | Password. Your Umami login password. |

### `SECRET_TEXT`: Umami Cloud (API Key)

> Connect to Umami Cloud using an API key. Create one in **Settings → API Keys**.

## Actions

### `get_website_stats`

**Get Website Stats.** Fetch aggregate analytics for one Umami-tracked website over a date range: total visitors, pageviews, bounce rate, and average visit duration. Use for a high-level traffic summary rather than per-dimension breakdowns or time series. Requires a website ID and a start/end date. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `websiteId` | string | yes |  | Website. Select the website to use. A value the product loads from the provider, such as an id; write the value itself. |
| `startDate` | ISO date-time string | yes |  | Start Date. Beginning of the date range. |
| `endDate` | ISO date-time string | yes |  | End Date. End of the date range. |

### `get_website_metrics`

**Get Website Metrics.** Fetch a ranked breakdown of one Umami-tracked website by a single chosen dimension (the Metric prop selects which, e.g. pages, referrers, browsers, countries, devices, or events) over a date range. Use to answer "top N by X" questions; pick a different metric type per call. Requires a website ID, a start/end date, and the metric type. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `websiteId` | string | yes |  | Website. Select the website to use. A value the product loads from the provider, such as an id; write the value itself. |
| `startDate` | ISO date-time string | yes |  | Start Date. Beginning of the date range. |
| `endDate` | ISO date-time string | yes |  | End Date. End of the date range. |
| `type` | string | yes | `"url"` | Metric. Which metric to rank results by. One of `"url"`, `"referrer"`, `"browser"`, `"os"`, `"device"`, `"country"`, `"region"`, `"city"`, `"language"`, `"screen"`, `"event"`, `"title"`, `"tag"`, `"host"`, `"query"`. |
| `limit` | number | no | `500` | Max Results. Maximum number of results to return. |

### `get_active_visitors`

**Get Active Visitors.** Fetch the current real-time count of active visitors on one Umami-tracked website. Use for "how many people are on the site right now"; for historical totals use Get Website Stats instead. Requires only a website ID. Read-only and idempotent, though the live count naturally changes between calls. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `websiteId` | string | yes |  | Website. Select the website to use. A value the product loads from the provider, such as an id; write the value itself. |

### `get_pageviews`

**Get Pageviews.** Fetch a time series of pageview and session counts for one Umami-tracked website across a date range, bucketed by a configurable unit (hour, day, week, month, or year). Use for trend or charting questions rather than a single aggregate total. Requires a website ID and a start/end date; the grouping unit and timezone are optional. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `websiteId` | string | yes |  | Website. Select the website to use. A value the product loads from the provider, such as an id; write the value itself. |
| `startDate` | ISO date-time string | yes |  | Start Date. Beginning of the date range. |
| `endDate` | ISO date-time string | yes |  | End Date. End of the date range. |
| `unit` | string | no | `"day"` | Group By. How to bucket the results over time. One of `"hour"`, `"day"`, `"week"`, `"month"`, `"year"`. |
| `timezone` | string | no | `"UTC"` | Timezone. Timezone for date grouping, e.g. Europe/Paris or America/New_York. Defaults to UTC. |

### `send_event`

**Send Event.** Send a tracking hit to Umami for one website: with an event name it records a named custom event (optionally with extra event properties), or with the event name left blank it records a plain pageview. Use to push analytics data into Umami, not to read it. Requires a website ID and a page path. Not idempotent — each call appends a new event. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `websiteId` | string | yes |  | Website. Select the website to use. A value the product loads from the provider, such as an id; write the value itself. |
| `url` | string | yes |  | Page Path. Path of the page to record, e.g. /pricing. |
| `eventName` | string | no |  | Event Name. Name of the custom event, e.g. signup-button-click. Leave blank to record a pageview. |
| `eventData` | object | no |  | Event Properties. Extra key-value pairs to attach to the event. |
| `referrer` | string | no |  | Referrer. URL the visitor came from. |
| `title` | string | no |  | Page Title. Title of the page being recorded. |

### `list_websites`

**List Websites.** List all websites tracked in the connected Umami account, returning each website ID, name, and domain. Use this first to discover the website ID that the analytics and event actions require. Takes only an optional result limit. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `100` | Max Results. Maximum number of websites to return. |

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

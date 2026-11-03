# PostHog

Open-source product analytics

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-posthog'
  version: '0.6.1'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect your PostHog account.
>
> **Personal API Key**: Go to PostHog → Settings → Personal API Keys → Create personal API key.
>
> **Project ID**: Found in the URL when viewing your project: `/project/{id}/`
>
> **API Host**: The base URL for private API calls.
> - US Cloud (default): `https://us.posthog.com`
> - EU Cloud: `https://eu.posthog.com`
> - Self-hosted: your instance URL (e.g. `https://posthog.mycompany.com`)
>
> **Ingestion Host**: The base URL for event capture.
> - US Cloud (default): `https://us.i.posthog.com`
> - EU Cloud: `https://eu.i.posthog.com`
> - Self-hosted: same as your API Host

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `personal_api_key` | string | yes |  | Personal API Key. Your PostHog personal API key. |
| `project_id` | string | yes |  | Project ID. Your PostHog project ID (found in project settings URL) |
| `api_host` | string | no | `"https://us.posthog.com"` | API Host. Base URL for private API calls (default: https://us.posthog.com) |
| `ingestion_host` | string | no | `"https://us.i.posthog.com"` | Ingestion Host. Base URL for event capture (default: https://us.i.posthog.com) |

## Actions

### `create_event`

**Capture Event.** Sends a custom analytics event to PostHog attributed to a user via their distinct ID (e.g. user ID or email), with optional event properties. Use to record a product action or behavior in PostHog. Not idempotent: each call appends a new event, so repeating it records duplicate events. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event` | string | yes |  | Event Name. The name of the event to capture. |
| `distinct_id` | string | yes |  | Distinct ID. Unique identifier for the user performing the action (e.g. user ID or email address) |
| `properties` | object | no |  | Properties. Additional event properties as key/value pairs. |

### `create_project`

**Create Project.** Creates a new project within a chosen PostHog organization, optionally anonymizing incoming IP addresses. Use when provisioning a fresh analytics project. Not idempotent: each call creates a separate project even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `organization_id` | string | yes |  | Organization. The organization to create the project in. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Project Name. The name of the new project. |
| `anonymize_ips` | boolean | no |  | Anonymize IPs. Whether to anonymize incoming IP addresses. |

### `get_feature_flags`

**Get Feature Flags.** Retrieves feature flags defined in the connected PostHog project, including each flag key, name, and active state, with an optional result limit. Use to inspect or audit which feature flags exist. Idempotent: a read-only lookup with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `100` | Limit. Maximum number of feature flags to return (default: 100) |

### `list_persons`

**List Persons.** Lists identified users (persons) in the connected PostHog project; with an empty search it returns all persons up to the limit, or pass a search string to filter by email or name. Use to look up users or find a specific person before acting on them. Idempotent: a read-only lookup with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `100` | Limit. Maximum number of persons to return (default: 100) |
| `search` | string | no |  | Search. Filter persons by email or name. |

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

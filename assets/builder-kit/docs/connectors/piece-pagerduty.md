# PagerDuty

Incident management workflows for PagerDuty REST API v2.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-pagerduty'
  version: '0.2.0'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: PagerDuty API Key

> PagerDuty REST API token from Integrations > API Access Keys. Activepieces sends it as Authorization: Token token=<API_KEY>.

## Actions

### `create_incident`

**Create Incident.** Opens a new incident on a PagerDuty service, requiring the requester email (From), the target service ID, and a title. Use to programmatically raise an alert/incident. Not idempotent — each call creates an incident, unless an Incident Key matching an already-open incident on the same service is supplied, in which case PagerDuty rejects the duplicate. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fromEmail` | string | yes |  | From Email. PagerDuty REST write operations require the email address of a valid PagerDuty user on the account. |
| `serviceId` | string | yes |  | Service. The PagerDuty service to associate with the incident. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. Incident title / summary. |
| `urgency` | string | yes | `"high"` | Urgency. The urgency for the incident. One of `"high"`, `"low"`. |
| `details` | string | no |  | Details. Additional incident body text. |
| `incidentKey` | string | no |  | Incident Key. A string that identifies the incident. Duplicate requests with the same key and open incident on the same service will be rejected (de-duplication). |
| `assigneeIds` | array | no |  | Assignee IDs. Comma-separated list of PagerDuty user IDs to assign the incident to. Cannot be used together with Escalation Policy ID. |
| `priorityId` | string | no |  | Priority ID. The ID of the priority to assign to this incident. |
| `conferenceNumber` | string | no |  | Conference Number. Phone number of the conference bridge. |
| `conferenceUrl` | string | no |  | Conference URL. URL for the conference bridge. |

### `list_incidents`

**List Incidents.** Lists PagerDuty incidents, optionally narrowed by status, urgency, and a since/until time window, with limit/offset paging (limit clamped to 1-100). Use to find or enumerate incidents; with no filters it returns the most recent incidents. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `statuses` | array | no |  | Statuses. Optional incident status filters. One of `"triggered"`, `"acknowledged"`, `"resolved"`. |
| `urgency` | string | no |  | Urgency. Optional urgency filter. One of `"high"`, `"low"`. |
| `since` | ISO date-time string | no |  | Since. Optional start of the search window. |
| `until` | ISO date-time string | no |  | Until. Optional end of the search window. |
| `limit` | number | no | `25` | Limit. Maximum number of incidents to return (1–100). |
| `offset` | number | no | `0` | Offset. Pagination offset (number of records to skip). |

### `get_incident`

**Get Incident.** Fetches a single PagerDuty incident by its incident ID. Use when you already have the ID and need the full current details of one incident. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `incidentId` | string | yes |  | Incident ID. The PagerDuty incident ID, for example PABC123. |

### `acknowledge_incident`

**Acknowledge Incident.** Sets an existing PagerDuty incident to the acknowledged status, requiring the incident ID and the acting user email (From). Use to mark that someone is working on an incident. Idempotent — re-acknowledging an already-acknowledged incident leaves it in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `incidentId` | string | yes |  | Incident ID. The PagerDuty incident ID, for example PABC123. |
| `fromEmail` | string | yes |  | From Email. PagerDuty REST write operations require the email address of a valid PagerDuty user on the account. |

### `resolve_incident`

**Resolve Incident.** Sets an existing PagerDuty incident to the resolved status, requiring the incident ID and the acting user email (From); an optional resolution note is added to the resolve log entry. Use to close out an incident. Idempotent on the status — re-resolving leaves the incident resolved. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `incidentId` | string | yes |  | Incident ID. The PagerDuty incident ID, for example PABC123. |
| `fromEmail` | string | yes |  | From Email. PagerDuty REST write operations require the email address of a valid PagerDuty user on the account. |
| `resolution` | string | no |  | Resolution. Optional resolution note. PagerDuty adds this to the resolve log entry. |

### `custom_api_call`

**Custom API Call.** Make a custom API call to PagerDuty REST API v2. Authorization, Accept, and Content-Type headers are injected automatically. For write endpoints that require a From header, add it manually in the headers field. Needs authentication.

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

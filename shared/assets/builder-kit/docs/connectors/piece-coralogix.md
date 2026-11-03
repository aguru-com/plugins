# Coralogix

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-coralogix'
  version: '0.2.3'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Coralogix Credentials

> Management API uses api.coralogix.com. Select ingestion region domain and provide both API keys.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `personalOrTeamApiKey` | string | yes |  | Personal/Team API Key. Used for Coralogix management APIs (for example alert definitions, incidents, dashboards). |
| `sendYourDataApiKey` | string | no |  | Send-Your-Data API Key. Used for Coralogix ingestion APIs (for example /logs/v1/singles). Find it in Settings → API Keys → Send Your Data. |
| `coralogixDomain` | string | yes | `"eu1.coralogix.com"` | Ingestion Region Domain. Select your Coralogix regional domain for ingestion endpoints. One of `"eu1.coralogix.com"`, `"eu2.coralogix.com"`, `"us1.coralogix.com"`, `"us2.coralogix.com"`, `"ap1.coralogix.com"`, `"ap2.coralogix.com"`, `"ap3.coralogix.com"`. |

## Actions

### `sendLogs`

**Send Logs.** Ingests a single log record into Coralogix via the log-ingestion API, tagged with an application and subsystem name and an optional severity. Use to emit a custom log or event from a flow. Not idempotent: each call appends a new log entry. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Log Message. The log message text or a JSON string. |
| `applicationName` | string | yes | `"my-app"` | Application Name. The application name for this log. |
| `subsystemName` | string | yes | `"auth-service"` | Subsystem Name. The subsystem name for this log. |
| `severity` | string | no |  | Severity. One of `1`, `2`, `3`, `4`, `5`, `6`. |
| `category` | string | no |  | Category. |
| `className` | string | no |  | Class Name. |
| `computerName` | string | no |  | Computer Name. |
| `methodName` | string | no |  | Method Name. |
| `threadId` | string | no |  | Thread ID. |
| `timestamp` | number | no |  | Timestamp. UTC milliseconds since 1970. Leave empty to use ingestion time. |
| `hiResTimestamp` | string | no |  | High Resolution Timestamp. UTC nanoseconds since 1970 as a string. Optional alternative to timestamp. |

### `listIncidents`

**List Incidents.** Lists Coralogix incidents, optionally filtered by status, severity, application, and subsystem; leave all filters empty to return every incident. Use to discover incidents and their IDs before acting on them, or to report on current incident state. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | array | no |  | Status. Filter by incident status. Leave empty to return all. One of `"INCIDENT_STATUS_TRIGGERED"`, `"INCIDENT_STATUS_ACKNOWLEDGED"`, `"INCIDENT_STATUS_RESOLVED"`. |
| `severity` | array | no |  | Severity. Filter by incident severity. Leave empty to return all. One of `"INCIDENT_SEVERITY_CRITICAL"`, `"INCIDENT_SEVERITY_ERROR"`, `"INCIDENT_SEVERITY_WARNING"`, `"INCIDENT_SEVERITY_INFO"`, `"INCIDENT_SEVERITY_LOW"`. |
| `applicationName` | array | no | `[]` | Application Names. Filter by application name(s). Leave empty to return all. |
| `subsystemName` | array | no | `[]` | Subsystem Names. Filter by subsystem name(s). Leave empty to return all. |
| `pageSize` | number | no | `20` | Page Size. Maximum number of incidents to return. |

### `acknowledgeIncidents`

**Acknowledge Incidents.** Marks one or more Coralogix incidents as acknowledged, given a list of incident IDs. Use when an operator has seen an incident and is taking ownership. Idempotent: re-acknowledging already-acknowledged incidents leaves them in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `incidentIds` | array | yes | `[]` | Incident IDs. List of incident IDs to acknowledge. |

### `resolveIncidents`

**Resolve Incidents.** Marks one or more Coralogix incidents as resolved by incident ID; choose this for incidents that were actually fixed (use Close Incidents for false positives or noise). Idempotent: re-resolving already-resolved incidents yields the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `incidentIds` | array | yes | `[]` | Incident IDs. List of incident IDs to resolve. Find the ID in Coralogix → Alerts → Incidents → click an incident → copy the ID from the URL. |

### `closeIncidents`

**Close Incidents.** Closes one or more Coralogix incidents by incident ID; choose this for false positives or noise rather than Resolve Incidents (which is for incidents that were genuinely fixed). Idempotent: re-closing already-closed incidents yields the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `incidentIds` | array | yes | `[]` | Incident IDs. List of incident IDs to close. Find the ID in Coralogix → Alerts → Incidents → click an incident → copy the ID from the URL. |

### `assignIncidents`

**Assign Incidents.** Assigns one or more Coralogix incidents to a specific user, given a list of incident IDs and the target Coralogix user ID. Use to route incidents to an on-call owner. Idempotent: reassigning to the same user leaves ownership unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `incidentIds` | array | yes | `[]` | Incident IDs. List of incident IDs to assign. Find IDs via "List Incidents" or the Coralogix Incidents page URL. |
| `assignToUserId` | string | yes |  | Assign To (User ID). The Coralogix user ID to assign the incidents to. |

### `getIncidentById`

**Get Incident By ID.** Fetches a single Coralogix incident by its incident ID. Use to inspect full details of a known incident (e.g. one surfaced by List Incidents or a trigger). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `incidentId` | string | yes |  | Incident ID. The Coralogix incident ID to retrieve. |

### `getIncidentEvents`

**Get Incident Events.** Retrieves the timeline of related events for a single Coralogix incident, given its incident ID. Use to trace how an incident evolved before deciding how to act on it. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `incidentId` | string | yes |  | Incident ID. |

### `setAlertActive`

**Enable / Disable Alert.** Enables or disables a Coralogix alert definition by alert ID, controlled by an enable/disable flag. Use to mute an alert during a maintenance window and re-enable it afterward. Idempotent: setting the alert to a state it is already in has no further effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `alertId` | string | yes |  | Alert ID. The ID of the alert to enable or disable. Use the "List Alert Definitions" action to find IDs. |
| `active` | boolean | yes | `true` | Enable Alert. Turn ON to enable the alert, turn OFF to disable it. |

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

# Jira Service Management Operations

Opsgenie alerts in Jira Service Management: create, acknowledge, close and route on-call alerts, and see who is on call.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-jsm-operations'
  version: '0.0.2'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Atlassian Account

> Use this for every action. It connects with your Atlassian email and an API token.
>
> 1. Open [API tokens](https://id.atlassian.com/manage-profile/security/api-tokens) and click **Create API token** (not "with scopes").
> 2. Copy the token and paste it below with the email you sign in with.
> 3. Enter your site URL, like https://your-company.atlassian.net.
>
> The account needs access to JSM Operations (alerts, teams and schedules) on that site.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `siteUrl` | string | yes |  | Site URL. Your Atlassian Cloud site address. |
| `email` | string | yes |  | Email. The email address of the Atlassian account. |
| `apiToken` | string | yes |  | API Token. An unscoped API token from id.atlassian.com. |
| `cloudId` | string | no |  | Cloud ID. Leave empty to look it up from the site URL. |

### `BASIC_AUTH`: Alert API Key (Opsgenie or JSM integration)

> Use this to create, acknowledge and close alerts or add notes with an integration API key. Other actions and the trigger need an Atlassian Account connection.
>
> - **JSM Operations:** open **Operations > Integrations**, add an **API** integration, copy its API key, and enter `jsm` as the API host.
> - **Opsgenie:** open **Settings > Integrations**, add an **API** integration, and copy its API key. Enter `us` as the API host, or `eu` if your Opsgenie address contains "eu".

## Actions

### `create_alert`

**Create Alert.** Creates a JSM Operations (or Opsgenie) alert and waits up to about 10 seconds for it to be processed, returning the new alert ID. Works with both connection types. Set an alias to deduplicate: a second alert with an open alias only raises its count, so retries with the same alias are safe; without an alias each call creates a new alert. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message` | string | yes |  | Message. Short summary of the problem. Up to 130 characters. |
| `description` | string | no |  | Description. Full details of the alert. Up to 15,000 characters. |
| `priority` | string | no | `"P3"` | Priority. P1 is the most urgent, P5 the least. One of `"P1"`, `"P2"`, `"P3"`, `"P4"`, `"P5"`. |
| `alias` | string | no |  | Alias. Your own unique key for the alert. Open duplicates are merged. |
| `responderTeams` | array | no |  | Responder Teams. Teams to notify. Needs an Atlassian Account connection. Values the product loads from the provider, such as ids; write an array of them. |
| `responderUsers` | array | no |  | Responder Users. Users to notify. Needs an Atlassian Account connection. Values the product loads from the provider, such as ids; write an array of them. |
| `responderSchedules` | array | no |  | Responder Schedules. Schedules whose on-call users are notified. Values the product loads from the provider, such as ids; write an array of them. |
| `responderEscalations` | array | no |  | Responder Escalations. Escalation policies to start for this alert. Values the product loads from the provider, such as ids; write an array of them. |
| `responderNames` | array | no |  | Responders by Name (API Key Connections). For API key connections: responders by team name or user email. Each item: { `type`, `name` }. |
| `tags` | array | no |  | Tags. Labels for searching and grouping alerts. |
| `entity` | string | no |  | Entity. The server, service or app the alert is about. |
| `source` | string | no |  | Source. The tool that raised the alert. |
| `note` | string | no |  | Note. A first note to attach to the alert. |
| `extraProperties` | object | no |  | Extra Properties. Custom key-value details shown on the alert. |
| `actions` | array | no |  | Custom Actions. Names of custom alert actions to show on the alert. |
| `user` | string | no |  | Created By. API key connections only: who is shown as the creator. |

Output fields:

- `alert_id`: Alert ID
- `alias`: Alias
- `processed`: Processed (boolean)
- `success`: Succeeded (boolean)
- `status`: Status Message
- `action`: Action
- `request_id`: Request ID
- `processed_at`: Processed At (datetime)

### `get_alert`

**Get Alert.** Reads a single JSM Operations alert by its alert ID or by its alias and returns its status, priority, owner, tags and timestamps. Use Find Alerts to search by criteria instead. Needs an Atlassian account connection. Safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `alert` | string | yes |  | Alert ID or Alias. The alert ID, or its alias if you pick Alias below. |
| `identifierType` | string | yes | `"id"` | Identify Alert By. Whether the value above is the alert ID or its alias. One of `"id"`, `"alias"`. |

Output fields:

- `id`: Alert ID
- `tiny_id`: Tiny ID
- `message`: Message
- `description`: Description
- `status`: Status
- `priority`: Priority
- `alias`: Alias
- `entity`: Entity
- `source`: Source
- `owner`: Owner
- `acknowledged`: Acknowledged (boolean)
- `seen`: Seen (boolean)
- `snoozed`: Snoozed (boolean)
- `snoozed_until`: Snoozed Until (datetime)
- `count`: Occurrence Count (number)
- `tags`: Tags
- `actions`: Custom Actions
- `responders`: Responders
- `extra_properties`: Extra Properties (an object whose keys vary)
- `integration_name`: Integration Name
- `integration_type`: Integration Type
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `last_occurred_at`: Last Occurred At (datetime)
- `ack_time`: Acknowledged At (datetime)
- `close_time`: Closed At (datetime)

### `find_alerts`

**Find Alerts.** Lists JSM Operations alerts that match an alert search query (for example status: open AND priority: P1), sorted and paged. Returns zero or more alerts. Use Get Alert when you already know the ID or alias. Needs an Atlassian account connection. Safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Alert search syntax. Leave empty to list all alerts. |
| `sort` | string | no | `"createdAt"` | Sort By. One of `"createdAt"`, `"lastOccurredAt"`, `"insertedAt"`, `"priority"`. |
| `order` | string | no | `"desc"` | Order. One of `"desc"`, `"asc"`. |
| `limit` | number | no | `20` | Max Results. How many alerts to return, from 1 to 100. |
| `offset` | number | no | `0` | Skip. How many matching alerts to skip, for paging. |

Output fields:

- `[].id`: Alert ID
- `[].tiny_id`: Tiny ID
- `[].message`: Message
- `[].description`: Description
- `[].status`: Status
- `[].priority`: Priority
- `[].alias`: Alias
- `[].entity`: Entity
- `[].source`: Source
- `[].owner`: Owner
- `[].acknowledged`: Acknowledged (boolean)
- `[].seen`: Seen (boolean)
- `[].snoozed`: Snoozed (boolean)
- `[].snoozed_until`: Snoozed Until (datetime)
- `[].count`: Occurrence Count (number)
- `[].tags`: Tags
- `[].actions`: Custom Actions
- `[].responders`: Responders
- `[].extra_properties`: Extra Properties (an object whose keys vary)
- `[].integration_name`: Integration Name
- `[].integration_type`: Integration Type
- `[].created_at`: Created At (datetime)
- `[].updated_at`: Updated At (datetime)
- `[].last_occurred_at`: Last Occurred At (datetime)
- `[].ack_time`: Acknowledged At (datetime)
- `[].close_time`: Closed At (datetime)

### `acknowledge_alert`

**Acknowledge Alert.** Acknowledges an open JSM Operations or Opsgenie alert by ID or alias, optionally adding a note, and waits briefly for the result. Works with both connection types. Acknowledging an already acknowledged alert has no further effect, so it is safe to retry. If the optional note cannot be added, the alert is still acknowledged and note_added is false with the reason in note_error; retrying would add the note again. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `alert` | string | yes |  | Alert ID or Alias. The alert ID, or its alias if you pick Alias below. |
| `identifierType` | string | yes | `"id"` | Identify Alert By. Whether the value above is the alert ID or its alias. One of `"id"`, `"alias"`. |
| `note` | string | no |  | Note. Optional note to add to the alert at the same time. |
| `user` | string | no |  | Done By. API key connections only: the name shown for this change. |
| `source` | string | no |  | Source. API key connections only: where the change came from. |

Output fields:

- `alert_id`: Alert ID
- `alias`: Alias
- `processed`: Processed (boolean)
- `success`: Succeeded (boolean)
- `status`: Status Message
- `action`: Action
- `request_id`: Request ID
- `processed_at`: Processed At (datetime)
- `note_added`: Note Added (boolean)
- `note_error`: Note Error

### `unacknowledge_alert`

**Unacknowledge Alert.** Reverts an acknowledged JSM Operations alert to unacknowledged so notifications resume. Use Acknowledge Alert for the opposite. Needs an Atlassian account connection. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `alert` | string | yes |  | Alert ID or Alias. The alert ID, or its alias if you pick Alias below. |
| `identifierType` | string | yes | `"id"` | Identify Alert By. Whether the value above is the alert ID or its alias. One of `"id"`, `"alias"`. |

Output fields:

- `alert_id`: Alert ID
- `alias`: Alias
- `processed`: Processed (boolean)
- `success`: Succeeded (boolean)
- `status`: Status Message
- `action`: Action
- `request_id`: Request ID
- `processed_at`: Processed At (datetime)

### `close_alert`

**Close Alert.** Closes a JSM Operations or Opsgenie alert by ID or alias, optionally adding a note, and waits briefly for the result. Works with both connection types. A closed alert cannot be reopened; closing an already closed alert has no further effect, so it is safe to retry. If the optional note cannot be added, the alert is still closed and note_added is false with the reason in note_error; retrying would add the note again. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `alert` | string | yes |  | Alert ID or Alias. The alert ID, or its alias if you pick Alias below. |
| `identifierType` | string | yes | `"id"` | Identify Alert By. Whether the value above is the alert ID or its alias. One of `"id"`, `"alias"`. |
| `note` | string | no |  | Note. Optional note to add to the alert at the same time. |
| `user` | string | no |  | Done By. API key connections only: the name shown for this change. |
| `source` | string | no |  | Source. API key connections only: where the change came from. |

Output fields:

- `alert_id`: Alert ID
- `alias`: Alias
- `processed`: Processed (boolean)
- `success`: Succeeded (boolean)
- `status`: Status Message
- `action`: Action
- `request_id`: Request ID
- `processed_at`: Processed At (datetime)
- `note_added`: Note Added (boolean)
- `note_error`: Note Error

### `add_note`

**Add Note to Alert.** Adds a text note to a JSM Operations or Opsgenie alert by ID or alias, for status updates or findings. Works with both connection types. Each call adds another note, so retries duplicate it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `alert` | string | yes |  | Alert ID or Alias. The alert ID, or its alias if you pick Alias below. |
| `identifierType` | string | yes | `"id"` | Identify Alert By. Whether the value above is the alert ID or its alias. One of `"id"`, `"alias"`. |
| `note` | string | yes |  | Note. The note text. Up to 25,000 characters. |
| `user` | string | no |  | Added By. API key connections only: the name shown on the note. |
| `source` | string | no |  | Source. API key connections only: where the note came from. |

Output fields:

- `alert_id`: Alert ID
- `alias`: Alias
- `processed`: Processed (boolean)
- `success`: Succeeded (boolean)
- `status`: Status Message
- `action`: Action
- `request_id`: Request ID
- `processed_at`: Processed At (datetime)
- `note_id`: Note ID
- `note`: Note

### `add_tags`

**Add Tags to Alert.** Adds tags to a JSM Operations alert by ID or alias, keeping its existing tags. Use Remove Tags from Alert to take tags off. Needs an Atlassian account connection. Adding a tag that is already there has no effect, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `alert` | string | yes |  | Alert ID or Alias. The alert ID, or its alias if you pick Alias below. |
| `identifierType` | string | yes | `"id"` | Identify Alert By. Whether the value above is the alert ID or its alias. One of `"id"`, `"alias"`. |
| `tags` | array | yes |  | Tags. Tags to add to the alert. |

Output fields:

- `alert_id`: Alert ID
- `alias`: Alias
- `processed`: Processed (boolean)
- `success`: Succeeded (boolean)
- `status`: Status Message
- `action`: Action
- `request_id`: Request ID
- `processed_at`: Processed At (datetime)

### `remove_tags`

**Remove Tags from Alert.** Removes the listed tags from a JSM Operations alert by ID or alias; the alert itself is kept. Use Add Tags to Alert to add them back. Needs an Atlassian account connection. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `alert` | string | yes |  | Alert ID or Alias. The alert ID, or its alias if you pick Alias below. |
| `identifierType` | string | yes | `"id"` | Identify Alert By. Whether the value above is the alert ID or its alias. One of `"id"`, `"alias"`. |
| `tags` | array | yes |  | Tags. Tags to remove from the alert. |

Output fields:

- `alert_id`: Alert ID
- `alias`: Alias
- `processed`: Processed (boolean)
- `success`: Succeeded (boolean)
- `status`: Status Message
- `action`: Action
- `request_id`: Request ID
- `processed_at`: Processed At (datetime)

### `assign_alert`

**Assign Alert.** Sets the owner of a JSM Operations alert to one Atlassian user, picked by account. Use Add Responder to Alert to notify more people without changing the owner. Needs an Atlassian account connection and a paid JSM plan (the Free plan rejects assignment). Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `alert` | string | yes |  | Alert ID or Alias. The alert ID, or its alias if you pick Alias below. |
| `identifierType` | string | yes | `"id"` | Identify Alert By. Whether the value above is the alert ID or its alias. One of `"id"`, `"alias"`. |
| `accountId` | string | yes |  | Assignee. The user who will own the alert. Type to search. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `alert_id`: Alert ID
- `alias`: Alias
- `processed`: Processed (boolean)
- `success`: Succeeded (boolean)
- `status`: Status Message
- `action`: Action
- `request_id`: Request ID
- `processed_at`: Processed At (datetime)

### `add_responder`

**Add Responder to Alert.** Adds one responder (team, user, schedule or escalation) to a JSM Operations alert so they are notified. Use Assign Alert to change the owner instead. Needs an Atlassian account connection. Adding an existing responder has no further effect, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `alert` | string | yes |  | Alert ID or Alias. The alert ID, or its alias if you pick Alias below. |
| `identifierType` | string | yes | `"id"` | Identify Alert By. Whether the value above is the alert ID or its alias. One of `"id"`, `"alias"`. |
| `responderType` | string | yes | `"team"` | Responder Type. What kind of responder to add. One of `"team"`, `"user"`, `"schedule"`, `"escalation"`. |
| `responder` | string | yes |  | Responder. The team, user, schedule or escalation to add. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `alert_id`: Alert ID
- `alias`: Alias
- `processed`: Processed (boolean)
- `success`: Succeeded (boolean)
- `status`: Status Message
- `action`: Action
- `request_id`: Request ID
- `processed_at`: Processed At (datetime)

### `escalate_alert`

**Escalate Alert.** Escalates a JSM Operations alert through the chosen escalation policy, notifying its next recipients. Use Add Responder to Alert to notify one specific team or user. Needs an Atlassian account connection. Each call can notify further recipients, so retries are not safe. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `alert` | string | yes |  | Alert ID or Alias. The alert ID, or its alias if you pick Alias below. |
| `identifierType` | string | yes | `"id"` | Identify Alert By. Whether the value above is the alert ID or its alias. One of `"id"`, `"alias"`. |
| `escalationId` | string | yes |  | Escalation. The escalation policy to use, listed with its team. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `alert_id`: Alert ID
- `alias`: Alias
- `processed`: Processed (boolean)
- `success`: Succeeded (boolean)
- `status`: Status Message
- `action`: Action
- `request_id`: Request ID
- `processed_at`: Processed At (datetime)

### `snooze_alert`

**Snooze Alert.** Snoozes a JSM Operations alert until the given end time, pausing its notifications; the alert reopens after that. Needs an Atlassian account connection and a paid JSM plan (the Free plan rejects snoozing). Snoozing again to the same time has the same result, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `alert` | string | yes |  | Alert ID or Alias. The alert ID, or its alias if you pick Alias below. |
| `identifierType` | string | yes | `"id"` | Identify Alert By. Whether the value above is the alert ID or its alias. One of `"id"`, `"alias"`. |
| `endTime` | ISO date-time string | yes |  | Snooze Until. When notifications should start again. Must be in the future. |

Output fields:

- `alert_id`: Alert ID
- `alias`: Alias
- `processed`: Processed (boolean)
- `success`: Succeeded (boolean)
- `status`: Status Message
- `action`: Action
- `request_id`: Request ID
- `processed_at`: Processed At (datetime)

### `update_alert`

**Update Alert.** Updates the message, description and/or priority of an existing JSM Operations alert; only the fields you fill in are changed. Needs an Atlassian account connection. Setting the same values again gives the same result, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `alert` | string | yes |  | Alert ID or Alias. The alert ID, or its alias if you pick Alias below. |
| `identifierType` | string | yes | `"id"` | Identify Alert By. Whether the value above is the alert ID or its alias. One of `"id"`, `"alias"`. |
| `message` | string | no |  | New Message. Leave empty to keep the current message. Up to 130 characters. |
| `description` | string | no |  | New Description. Leave empty to keep the current description. |
| `priority` | string | no |  | Priority. P1 is the most urgent, P5 the least. One of `"P1"`, `"P2"`, `"P3"`, `"P4"`, `"P5"`. |

Output fields:

- `alert_id`: Alert ID
- `updated_fields`: Updated Fields
- `processed`: All Updates Processed (boolean)
- `requests`: Update Requests
- `requests[].field`: Field
- `requests[].alert_id`: Alert ID
- `requests[].alias`: Alias
- `requests[].processed`: Processed (boolean)
- `requests[].success`: Succeeded (boolean)
- `requests[].status`: Status Message
- `requests[].action`: Action
- `requests[].request_id`: Request ID
- `requests[].processed_at`: Processed At (datetime)

### `get_on_call`

**Get Who Is On Call.** Returns the on-call participants of one JSM Operations schedule at the current time or a given date, including users reached through teams or escalations, plus a comma-separated list of on-call user account IDs. Needs an Atlassian account connection. Safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `scheduleId` | string | yes |  | Schedule. The on-call schedule to check. A value the product loads from the provider, such as an id; write the value itself. |
| `date` | ISO date-time string | no |  | At Time. Leave empty to check who is on call right now. |

Output fields:

- `schedule_id`: Schedule ID
- `date`: Checked At (datetime)
- `on_call_user_ids`: On-Call User Account IDs
- `on_call_user_count`: On-Call User Count (number)
- `participants`: On-Call Participants
- `participants[].id`: ID
- `participants[].type`: Type
- `participants[].name`: Name
- `participants[].parent_id`: Reached Through ID
- `participants[].parent_type`: Reached Through Type
- `participants[].forwarded_from_id`: Forwarded From User ID

### `custom_api_call`

**Custom API Call.** Sends a raw HTTP request to the JSM Operations API with the connection credentials: /jsm/ops/api/{cloudId}/v1 for account connections, the /v2 alert API for API keys. Use only when no dedicated action fits. Whether a retry is safe depends on the method and endpoint. Needs authentication.

Kind: write, not safe to repeat.

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

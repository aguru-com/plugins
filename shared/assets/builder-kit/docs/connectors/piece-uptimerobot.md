# UptimeRobot

Monitor your websites, APIs, and servers. Get alerted when things go down.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-uptimerobot'
  version: '0.0.5'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
> 1. Log in to your [UptimeRobot Dashboard](https://dashboard.uptimerobot.com/)
> 2. Click **Integrations & API** in the left sidebar
> 3. Scroll to the **API** section
> 4. Click **Show** next to your Main API Key
> 5. Copy the key and paste it here
>
> The key starts with `u` followed by a long string of numbers and letters.
>
> **Note:** Free plans are limited to 10 API requests per minute. Paid plans support up to 5,000 req/min.

## Actions

### `get_monitors`

**Get Monitors.** Retrieves UptimeRobot monitors, with two modes: leave the monitor ID fields empty to fetch all monitors, or pass specific monitor IDs (and optional type/status filters) to narrow the result. Use this to look up a monitor or check current up/down status before editing, pausing, or deleting one. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `monitor_ids` | array | no |  | Monitors. Filter to specific monitors. Leave empty to include all monitors in your account. Values the product loads from the provider, such as ids; write an array of them. |
| `monitor_ids_csv` | string | no |  | Or Enter Monitor IDs (comma-separated). Use this to pass dynamic Monitor IDs from a previous step (e.g. "123, 456"). Merged with any selections above. |
| `type` | string | no |  | Monitor Type. Only HTTP monitors are supported at the moment. Other UptimeRobot types (Keyword, Ping, Port, Heartbeat) will be added in a future release. Leave empty to return monitors of all types. One of `1`. |
| `status` | string | no |  | Status. Only return monitors with this status. Leave empty for all statuses. One of `2`, `9`, `0`, `8`, `1`. |

### `create_monitor`

**Create HTTP Monitor.** Creates a new HTTP uptime monitor in UptimeRobot for a given URL and friendly name. Use when an agent needs to start monitoring a new website or endpoint. Requires the full URL including protocol; the check interval has plan-dependent minimums (300s on Free). Each call creates a separate monitor, so it is not safe to repeat blindly. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `friendly_name` | string | yes |  | Monitor Name. A name for this monitor (e.g. 'Company Website' or 'API Server') |
| `url` | string | yes |  | URL. The full URL to monitor, including the protocol (e.g. 'https://example.com'). |
| `interval` | number | no | `300` | Check Interval (seconds). How often UptimeRobot checks this URL, in seconds. Minimum 300s (5 min) on the Free plan, 60s on Solo/Team, 30s on Enterprise. |

### `edit_monitor`

**Edit Monitor.** Updates an existing UptimeRobot monitor's name, monitored URL, and/or check interval. The target monitor can be chosen from the dropdown or, to drive it from a prior step, passed as a raw Monitor ID that overrides the dropdown. Only the fields you set are changed; omitted fields keep their current value. Repeating the same call leaves the monitor in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `monitor` | string | no |  | Monitor (optional). Select the monitor to act on, or leave blank and use "Monitor ID" below to pass a dynamic value. A value the product loads from the provider, such as an id; write the value itself. |
| `monitor_id_override` | string | no |  | Or Enter Monitor ID. Use this to pass a dynamic Monitor ID from a previous step (e.g. {{create_monitor.id}}). If set, this overrides the dropdown selection above. |
| `friendly_name` | string | no |  | New Monitor Name. Update the monitor's name. Leave empty to keep the current name. |
| `url` | string | no |  | New URL or IP Address. Update the URL or IP being monitored. Leave empty to keep the current value. |
| `interval` | number | no |  | New Check Interval (seconds). Minimum 300s (5 min) on the Free plan, 60s on Solo/Team, 30s on Enterprise. Values below the plan minimum are rejected by UptimeRobot. Leave empty to keep the current interval. |

### `delete_monitor`

**Delete Monitor.** Permanently deletes a UptimeRobot monitor, identified either by the dropdown selection or by a raw Monitor ID passed from a prior step (the raw ID overrides the dropdown). This is irreversible and destructive, so confirm the target before calling; repeating it on an already-deleted monitor will fail. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `monitor` | string | no |  | Monitor (optional). Select the monitor to act on, or leave blank and use "Monitor ID" below to pass a dynamic value. A value the product loads from the provider, such as an id; write the value itself. |
| `monitor_id_override` | string | no |  | Or Enter Monitor ID. Use this to pass a dynamic Monitor ID from a previous step. If set, this overrides the dropdown selection above. |

### `pause_resume_monitor`

**Pause or Resume Monitor.** Pauses or resumes monitoring for a single UptimeRobot monitor; the Action prop selects which (pause stops all checks and alerts, resume restarts them). The target is chosen from the dropdown or by a raw Monitor ID passed from a prior step, which overrides the dropdown. Sets a fixed paused/active state, so repeating the same call leaves the monitor in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `monitor` | string | no |  | Monitor (optional). Select the monitor to act on, or leave blank and use "Monitor ID" below to pass a dynamic value. A value the product loads from the provider, such as an id; write the value itself. |
| `monitor_id_override` | string | no |  | Or Enter Monitor ID. Use this to pass a dynamic Monitor ID from a previous step. If set, this overrides the dropdown selection above. |
| `action` | string | yes |  | Action. Pause stops all checks and alerts. Resume restarts monitoring. One of `0`, `1`. |

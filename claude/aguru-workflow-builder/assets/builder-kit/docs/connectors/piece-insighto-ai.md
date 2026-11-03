# Insighto.ai

AI-powered platform for capturing forms, conversations, and data sources with automated processing and outbound communications

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-insighto-ai'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE, COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Insighto.ai API key

## Actions

### `add_text_blob`

**Add Text Blob Into Data Source.** Appends a block of raw text content to an existing Insighto.ai data source, identified by its data source ID. Use this to feed knowledge-base material into a data source an assistant can draw from. Not idempotent: each call adds a new text blob entry, so repeating it duplicates the content. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `datasource_id` | string | yes |  | Data Source. Select the data source to add the text blob to. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. Optional name for this text blob entry. |
| `description` | string | no |  | Description. Optional description of what this text blob contains. |
| `org_id` | string | no |  | Organization ID. The UUID of the organization. |
| `text_content` | string | yes |  | Text Content. The text content to add to the data source. |

### `upsert_contact`

**Upsert Contact.** Creates or updates an Insighto.ai contact, matching on the supplied email or phone number. Use when you need a contact to exist before referencing it elsewhere without checking first. At least one of email or phone number is required. Idempotent: the contact is keyed on email/phone, so repeating with the same input converges to the same record rather than creating duplicates. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `email` | string | no |  | Email. Email address of the contact. |
| `phone_number` | string | no |  | Phone Number. Phone number including country code (e.g., 16501111234) |

### `make_outbound_call`

**Make Outbound Call.** Places an outbound phone call to a destination number (E.164 format) through an Insighto.ai widget wired to a telephony provider such as Twilio, Plivo, or Telnyx. Optionally injects dynamic variables into the call prompt. Use when an agent should trigger a real voice call. Not idempotent: each call dials the recipient again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `widget_id` | string | yes |  | Widget. Widget connected to Twilio, Plivo, or Telnyx for making calls. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | Phone Number. Phone number in E.164 format (e.g., 16501234567) |
| `prompt_dynamic_variables` | object | no |  | Dynamic Variables. Variables for call prompts (e.g., {"name": "Bob", "appointment": "tomorrow"}) |

### `create_campaign`

**Create Campaign.** Creates a new scheduled outbound-call campaign in Insighto.ai, configured with a start time, repeat interval, and optional widget, weekday/time-window scheduling, status, and time zone. Use when an agent should set up an automated calling campaign. Not idempotent: each call creates a separate campaign. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Campaign Name. |
| `type` | string | yes |  | Campaign Type. One of `"outbound_call"`. |
| `start_time` | ISO date-time string | yes |  | Start Time. When the campaign should start. |
| `interval` | number | yes |  | Interval (minutes). Time between executions (e.g., 60 for hourly, 1440 for daily) |
| `widget_id` | string | no |  | Widget. Widget to associate with this campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `attributes` | object | no |  | Attributes. Additional campaign attributes as key-value pairs. |
| `status` | string | no |  | Status. One of `"not_started"`, `"to_be_run"`, `"in_progress"`, `"paused"`, `"cancelled"`, `"completed"`. |
| `execution_weekdays` | array | no |  | Execution Weekdays. Weekdays as numbers (e.g., [1, 2, 3] for Mon, Tue, Wed) |
| `time_window_start` | string | no |  | Time Window Start. Start time in HH:MM format. |
| `time_window_end` | string | no |  | Time Window End. End time in HH:MM format. |
| `time_zone` | string | no | `"UTC"` | Time Zone. Time zone (defaults to UTC) |
| `enabled` | boolean | no | `false` | Enabled. |

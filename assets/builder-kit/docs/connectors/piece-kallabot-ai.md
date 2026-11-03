# Kallabot

AI-powered voice agents and conversational interfaces.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-kallabot-ai'
  version: '0.4.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Follow these steps to obtain your Kallbot API Key:
>
> 1. Go to [Kallabot](https://kallabot.com/) and log in to your account.
> 2. Click on your profile picture in the top right corner.
> 3. Select **Settings** from the dropdown menu.
> 4. Navigate to the **API & Integrations** tab.
> 5. Copy the generated API key and paste it here.

## Actions

### `make-call`

**Make Call.** Place a single outbound phone call where a Kallabot AI voice agent talks to the recipient. Use it for one-off calls (not bulk campaigns); requires an agent ID, a recipient number, and one of your account sender numbers, all in E.164 format. Each call placed is a new side effect, so this is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agent_id` | string | yes |  | Agent. Select the AI agent to use for the call. A value the product loads from the provider, such as an id; write the value itself. |
| `recipient_phone_number` | string | yes |  | Recipient Phone Number. The phone number to call in E.164 format (e.g., +1234567890). |
| `sender_phone_number` | string | yes |  | Sender Phone Number. The phone number to make the call from. A value the product loads from the provider, such as an id; write the value itself. |
| `template_variables` | object | no |  | Template Variables. Variables to be used in the agent template (optional). |
| `webhook_url` | string | no |  | Webhook URL. URL to receive call status updates (optional). |

### `get-call-details`

**Get Call Details.** Look up the full record of one past or in-progress call by its call SID, including status, duration, cost, recording URL, and transcription. Use it to inspect or report on a known call. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `call_sid` | string | yes |  | Call SID. The unique identifier of the call. |

### `get-contacts-from-list`

**Get Contacts from List.** List every contact stored in one Kallabot contact list, identified by its list ID. Use it to read or enumerate the members of a list before calling, editing, or campaigning. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Contact List. Select the contact list to retrieve contacts from. A value the product loads from the provider, such as an id; write the value itself. |

### `edit-contact-list`

**Edit Contact List.** Replace the entire contents of an existing contact list (by list ID) with a supplied array of contacts, each requiring a phone_number and optionally a name and template_variables. This is a full overwrite, not an append — contacts not in the array are removed; use Add Contacts to List to append instead. Idempotent: re-sending the same array yields the same resulting list. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Contact List. Select the contact list to edit. A value the product loads from the provider, such as an id; write the value itself. |
| `contacts` | object | yes |  | Contacts. JSON array of contacts to replace the entire list. An object whose fields depend on other inputs; the product shows them. |

### `add-contact-to-list`

**Add Contacts to List.** Append one or more contacts to an existing contact list (by list ID); each contact requires a phone_number and may include a name and template_variables. Use it to grow a list without touching existing members; use Edit Contact List to fully replace the list instead. Not idempotent — repeating the call appends the contacts again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Contact List. Select the contact list to add contacts to. A value the product loads from the provider, such as an id; write the value itself. |
| `contacts` | JSON | yes | `[{"phone_number":"+1234567890","name":"John Smith","template_variables":{"first_name":"John","last_name":"Smith","company":"Acme Corp","custom_field":"value"}},{"phone_number":"+1987654321","name":"Jane Doe","template_variables":{"first_name":"Jane","last_name":"Doe","company":"Tech Solutions","priority":"high"}}]` | Contacts JSON. JSON array of contacts to add to the list. Each contact must have phone_number and can include name and template_variables. |

### `create-contact-list`

**Create Contact List.** Create a new named contact list seeded with an array of contacts, each requiring a phone_number and optionally a name and template_variables; an optional description can be set. Use it to set up a fresh list for calling or campaigns. Not idempotent — each call creates a separate new list even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | List Name. The name of the contact list. |
| `description` | string | no |  | Description. A description of the contact list (optional). |
| `contacts` | JSON | yes | `[{"phone_number":"+1234567890","name":"John Smith","template_variables":{"first_name":"John","last_name":"Smith","company":"Acme Corp","custom_field":"value"}},{"phone_number":"+1987654321","name":"Jane Doe","template_variables":{"first_name":"Jane","last_name":"Doe","company":"Tech Solutions","priority":"high"}}]` | Contacts JSON. JSON array of contacts. Each contact must have phone_number and can include name, template_variables. |

### `create-campaign`

**Create Campaign.** Schedule a bulk outbound calling campaign that dials every contact in a list using a chosen AI agent and one or more sender numbers. Use it for mass calling rather than a single Make Call; requires an agent ID, a contact list ID, sender numbers, and a scheduled start time, with optional pacing controls (delay between calls, number rotation, timezone). Not idempotent — each call creates a separate campaign. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Campaign Name. The name of the campaign. |
| `description` | string | no |  | Description. A description of the campaign (optional). |
| `agent_id` | string | yes |  | Agent. Select the AI agent to use for the campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `list_id` | string | yes |  | Contact List. Select the contact list for the campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `sender_phone_numbers` | array | yes |  | Sender Phone Numbers. Select phone numbers to use for making calls. Values the product loads from the provider, such as ids; write an array of them. |
| `delay_between_calls` | number | no | `10` | Delay Between Calls (seconds). Time to wait between calls in seconds. |
| `scheduled_time` | ISO date-time string | yes | `"2026-08-01T13:15:00"` | Scheduled Time. When to start the campaign (format: YYYY-MM-DDTHH:MM:SS) ISO 8601. |
| `timezone` | string | no | `"UTC"` | Timezone. Timezone for the scheduled time (e.g., America/New_York). |
| `rotate_numbers_after` | number | no | `60` | Rotate Numbers After. Number of contacts to call before rotating to the next phone number. |

### `delete-campaign`

**Delete Campaign.** Permanently delete an outbound campaign by its campaign ID, optionally also deleting its associated contact list. Use it to clean up a campaign that is no longer needed; this is destructive. Idempotent in effect: once the campaign is gone, repeating the call leaves nothing further to delete. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | string | yes |  | Campaign ID. The ID of the campaign to delete. |
| `delete_contact_list` | boolean | no | `false` | Delete Contact List. Also delete the associated contact list (optional). |

# Autocalls

Automate phone calls using our AI calling platform.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-autocalls'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Create an API key in your Autocalls account and paste the value here. Get API key here -> https://app.autocalls.ai.

## Actions

### `addLead`

**Add lead to a campaign.** Enrolls a lead (phone number plus template variables, optionally with secondary contacts) into an Autocalls outbound campaign so its assistant will dial them. Use to queue contacts for a campaign rather than placing a one-off call. Requires a campaign id and phone number; creates a new lead each call (unless duplicates are disallowed), so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign` | string | yes |  | Campaign. Select a campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `phone_number` | string | yes |  | Customer phone number. Enter the phone number of the customer. |
| `variables` | object | yes | `{"customer_name":"John"}` | Variables. Variables to pass to the assistant. |
| `allow_dupplicate` | boolean | yes | `false` | Allow duplicates. Allow the same phone number to be added to the campaign more than once. |
| `num_secondary_contacts` | number | no | `0` | Number of Secondary Contacts. How many secondary contacts do you want to add? |
| `secondary_contacts` | object | no |  | Secondary Contacts. Add secondary contacts for this lead. Each contact can have its own phone number and variables. An object whose fields depend on other inputs; the product shows them. |

### `sendSms`

**Send SMS to Customer.** Sends a single SMS text message to a customer phone number from a selected SMS-capable Autocalls phone number. Use to deliver an outbound text rather than place a call. Requires a sender phone number id, recipient number, and message body (max 300 characters); each call sends a new message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From phone number. Select an SMS capable phone number to send the SMS from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | Customer phone number. Enter the phone number of the customer. |
| `body` | string | yes |  | Text message. Enter the text message to send to the customer (max 300 characters) |

### `campaignControl`

**Start/Stop Campaign.** Sets the run status of an Autocalls outbound campaign, choosing one of two modes via the action input: start (begin dialing leads) or stop (halt dialing). Use to control whether a campaign is actively calling. Requires a campaign id; idempotent since repeating the same start/stop request leaves the campaign in the same state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign` | string | yes |  | Campaign. Select a campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `action` | string | yes |  | Action. Select action to perform on the campaign. One of `"start"`, `"stop"`. |

### `makePhoneCall`

**Make Phone Call.** Places an outbound AI phone call to a single customer phone number using a selected Autocalls outbound assistant, passing template variables (e.g. customer_name) into the conversation. Use to dial one contact on demand rather than enrolling them in a campaign. Requires a valid outbound assistant id and a phone number; each call dials again, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `assistant` | string | yes |  | Assistant. Select an assistant. A value the product loads from the provider, such as an id; write the value itself. |
| `phone_number` | string | yes |  | Customer phone number. Enter the phone number of the customer. |
| `variables` | object | yes | `{"customer_name":"John"}` | Variables. Variables to pass to the assistant. |

### `deleteLead`

**Delete Lead.** Permanently removes a single lead from its Autocalls campaign by lead id, identified by phone number and campaign name. Use to drop a contact so it is no longer dialed. Requires the lead id; not idempotent since the lead no longer exists after the first successful delete. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead` | string | yes |  | Lead. Select a lead to delete. A value the product loads from the provider, such as an id; write the value itself. |

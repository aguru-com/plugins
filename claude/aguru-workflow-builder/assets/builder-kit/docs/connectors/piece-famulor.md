# Famulor AI - Voice Agent

AI-powered calling and SMS platform. Automate outbound campaigns, manage leads, and get real-time call analytics.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-famulor'
  version: '0.2.5'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Create an API key in your Famulor account and paste the value here. Get API key here -> https://app.famulor.de.

## Actions

### `addLead`

**Add Lead to Campaign.** Enqueue a lead (primary phone number plus optional template variables and up to ten secondary contacts) into an existing campaign for the AI assistant to call. Pick when populating a campaign with people to dial. Not idempotent — each call appends a lead unless allow_dupplicate is left off, which can still create repeats across calls. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign` | string | yes |  | Campaign. Select the campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `phone_number` | string | yes |  | Customer Phone Number. Enter the phone number of the customer (E.164 format: +1234567890) |
| `variables` | object | no | `{"customer_name":"John Doe"}` | Variables. Variables to pass to the assistant. |
| `allow_dupplicate` | boolean | no | `false` | Allow Duplicates. Allow the same phone number to be added to the campaign more than once. |
| `num_secondary_contacts` | number | no | `0` | Number of Secondary Contacts. How many secondary contacts do you want to add? (Max: 10) |
| `secondary_contacts` | object | no |  | Secondary Contacts. Add secondary contacts for this lead. Each contact can have its own phone number and variables. An object whose fields depend on other inputs; the product shows them. |

### `listLeads`

**List Leads.** Retrieve all leads in the account. Use to enumerate leads or to find a lead's ID before updating or assigning it. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `listPhoneNumbers`

**List Phone Numbers.** List the phone numbers already owned by / linked to the account. Use to discover which numbers are available to send from or assign; to find new numbers to buy use Search Available Phone Numbers instead. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `searchAvailablePhoneNumbers`

**Search Available Phone Numbers.** Search the catalog of phone numbers available to purchase, filtered by country code and an optional digit/pattern match. Use to find candidate numbers before buying one with Purchase Phone Number. Read-only and idempotent; it browses inventory and does not buy anything. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `country_code` | string | yes | `"DE"` | Country code. ISO 3166-1 alpha-2 country code to search in (supported regions per Famulor docs). One of `"DE"`, `"US"`, `"CA"`, `"GB"`, `"AU"`, `"IL"`, `"PL"`, `"FI"`, `"NL"`, `"DK"`, `"IT"`. |
| `contains` | string | no |  | Contains (digits). Optional. Only return numbers that contain these digits (numeric only, max 10 digits). |

### `purchasePhoneNumber`

**Purchase Phone Number.** Buy a specific phone number (from Search Available Phone Numbers results) and add it to the account. Use after confirming an available number; this incurs a charge and provisions a real number, so it is not idempotent. To browse purchasable numbers first use Search Available Phone Numbers. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number` | string | yes |  | Phone number. Exact E.164 value from Search Available Phone Numbers. Requires a payment method on file; creates a monthly subscription. (E.164 format: +1234567890) |

### `sendSms`

**Send SMS.** Send a single SMS text message from one of the account's purchased numbers to a recipient. Use for plain SMS delivery; for WhatsApp use the WhatsApp send actions instead. Each call delivers a new message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From Phone Number. Select an SMS-capable phone number to send from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | Recipient Phone Number. Enter the recipient's phone number (E.164 format: +1234567890) |
| `bodysuit` | string | yes |  | Message. SMS message content (max 300 characters). Long messages may be split into multiple segments. |

### `createCampaign`

**Create Campaign.** Create a new outbound calling campaign bound to an AI assistant, optionally configuring dialing windows (timezone, allowed hours/days), parallelism, and retry behavior. Pick when setting up a fresh campaign before adding leads to it; this always creates a new campaign (not idempotent — repeated calls make duplicates). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Campaign name. Name of the outbound campaign (max 255 characters) |
| `assistant_id` | string | yes |  | Assistant. Select the AI assistant to use for the call. A value the product loads from the provider, such as an id; write the value itself. |
| `timezone` | string | no |  | Timezone. IANA timezone (e.g. Europe/Berlin, America/New_York). Leave empty for account default. |
| `max_calls_in_parallel` | number | no | `3` | Max calls in parallel. 1–10 simultaneous calls (your plan may limit further) |
| `allowed_hours_start_time` | string | no | `"09:00"` | Allowed hours start. Calling window start (H:i, e.g. 09:00) |
| `allowed_hours_end_time` | string | no | `"17:00"` | Allowed hours end. Calling window end (H:i, e.g. 17:00) |
| `allowed_days` | array | no |  | Allowed weekdays. Leave empty to use API default (all days). Otherwise restrict to selected days. One of `"monday"`, `"tuesday"`, `"wednesday"`, `"thursday"`, `"friday"`, `"saturday"`, `"sunday"`. |
| `max_retries` | number | no | `3` | Max retries. 1–5 retry attempts for failed calls. |
| `retry_interval` | number | no | `60` | Retry interval (minutes). 10–4320 minutes between retries. |
| `retry_on_voicemail` | boolean | no | `false` | Retry on voicemail. Retry when the call reaches voicemail. |
| `retry_on_goal_incomplete` | boolean | no | `false` | Retry on goal incomplete. Retry when the call goal was not completed. |
| `goal_completion_variable` | string | no |  | Goal completion variable. Name of a boolean variable from the assistant post-call schema (max 255 characters) |
| `mark_complete_when_no_leads` | boolean | no | `true` | Mark complete when no leads. Mark the campaign complete when there are no leads left to call. |
| `phone_number_ids` | array | no |  | Outbound phone numbers. Optional. Caller IDs for this campaign (distinct phone number IDs). Values the product loads from the provider, such as ids; write an array of them. |

### `campaignControl`

**Start/Stop Campaign.** Start or stop an outbound calling campaign by campaign ID, choosing the action via the start/stop mode. Use to launch bulk outbound dialing of a campaign's leads or to halt it. Idempotent with respect to end state: starting an already-running campaign or stopping a stopped one converges on the requested state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign` | string | yes |  | Campaign. Select the campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `action` | string | yes |  | Action. Select the action to perform on the campaign. One of `"start"`, `"stop"`. |

### `makePhoneCall`

**Make Phone Call.** Place a single outbound AI-assistant phone call to one customer number, using the chosen assistant and optional template variables. Use for one-off calls; for bulk outbound calling use a campaign (Start/Stop Campaign) instead. Each invocation dials a new call, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `assistant_id` | string | yes |  | Assistant. Select the AI assistant to use for the call. A value the product loads from the provider, such as an id; write the value itself. |
| `phone_number` | string | yes |  | Customer Phone Number. Enter the phone number to call (E.164 format: +1234567890) |
| `variable` | object | no | `{"customer_name":"John Doe","email":"john@example.com"}` | Variables. Variables to pass to the assistant during the call. |

### `updateLead`

**Update Lead.** Update fields on an existing lead identified by lead ID — campaign assignment, phone number, status, and/or custom variables. At least one field must be supplied or the action errors. Idempotent: re-sending the same values leaves the lead in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead_id` | string | yes |  | Lead. Select the lead to delete. A value the product loads from the provider, such as an id; write the value itself. |
| `campaign` | string | no |  | Campaign. Optionally assign the lead to a different campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `phone_number` | string | no |  | Phone Number. New phone number in E.164 format (leave empty to keep unchanged) (E.164 format: +1234567890) |
| `status` | string | no |  | Status. Lead status: created, completed, or reached-max-retries (leave unselected to keep unchanged) One of `"created"`, `"completed"`, `"reached-max-retries"`. |
| `variables` | object | no | `{}` | Variables. Custom fields merged with existing lead variables (leave empty to skip) |

### `deleteLead`

**Delete Lead.** Permanently remove a lead by its ID, aborting any call currently in progress for it. Pick when a lead should be dropped from a campaign entirely; this is destructive and irreversible. Not idempotent in effect — once deleted, a subsequent call targeting the same ID will fail to find it. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead_id` | string | yes |  | Lead. Select the lead to delete. A value the product loads from the provider, such as an id; write the value itself. |

### `getCurrentUser`

**Get User Information.** Get the authenticated user's profile and current account balance for the supplied API credentials. Use to verify the connection or check available balance before placing calls or sending messages. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

### `generateAiReply`

**Generate AI Reply.** Generate (draft) an AI assistant reply to a customer message, identified by assistant and customer identifier, with optional template variables. Use to obtain suggested reply text without it being committed to a conversation; to post a message into a real thread use Send Message. Each call generates fresh output, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `assistant_id` | string | yes |  | Assistant. Select the assistant to generate a response with. A value the product loads from the provider, such as an id; write the value itself. |
| `customer_identifier` | string | yes | `"+1234567890"` | Customer Identifier. A unique identifier for the customer (e.g., phone number, email, CRM contact ID). Maximum length: 255 characters. |
| `message` | string | yes |  | Message. The customer's message to respond to. |
| `variables` | object | no | `{}` | Variables. Optional context variables to pass to the assistant. |

### `createConversation`

**Create Conversation.** Start a brand-new chat conversation with an AI assistant, optionally as a widget or test conversation and with initial variables. Use to open a fresh thread before sending messages; each call creates a new conversation, so it is not idempotent. To continue an existing thread use Send Message instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `assistant_id` | string | yes |  | Assistant UUID. The UUID of the assistant to start the conversation with. |
| `type` | string | no | `"widget"` | Type. The type of conversation. One of `"widget"`, `"test"`. |
| `variables` | object | no | `{}` | Variables. Custom variables to pass to the assistant. |

### `getConversation`

**Get Conversation.** Fetch the complete message history of one conversation by its UUID. Use to read prior turns before deciding how to reply or to inspect a thread's contents. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `uuid` | string | yes |  | Conversation UUID. The unique UUID identifier of the conversation to retrieve. |

### `sendMessage`

**Send Message.** Post a message into an existing Famulor conversation (identified by its UUID) and get back the AI assistant's reply in the same call. Use to continue a chat thread you already created or retrieved; not idempotent, as each call appends a new message and generates a new reply. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `uuid` | string | yes |  | Conversation UUID. The unique UUID identifier of the conversation. |
| `message` | string | yes |  | Message. User message to send (max 2000 characters). The assistant's reply is returned in the action output field `message`. |

### `getWhatsAppSenders`

**Get WhatsApp Senders.** List the WhatsApp Business senders connected to the account, optionally filtered to only online senders versus all. Read-only and idempotent. Pick this to discover a valid sender_id before sending a WhatsApp template message. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no | `"online"` | Status filter. Online only (default API behavior) or all senders including offline. Use sender `id` as sender_id when sending WhatsApp messages. One of `"online"`, `"all"`. |

### `getWhatsAppTemplates`

**Get WhatsApp Templates.** List the WhatsApp message templates registered to a given sender, defaulting to approved templates with an option to return all statuses. Use to discover which templates can be sent (e.g. to start a conversation outside the 24-hour session window). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sender_id` | number | yes |  | Sender ID. WhatsApp sender numeric ID from Get WhatsApp Senders (the sender `id` field) |
| `status` | string | no | `"approved"` | Template approval status. Approved templates only (default API behavior) or all templates including pending/rejected. One of `"approved"`, `"all"`. |

### `sendWhatsAppTemplate`

**Send WhatsApp Template Message.** Send a pre-approved WhatsApp Business template message to a recipient phone number through a specific Famulor sender, filling any template variables. Pick when initiating outbound WhatsApp contact; requires a sender_id and template_id that already exist on the account. Not idempotent — each call dispatches a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sender_id` | number | yes |  | Sender ID. WhatsApp sender ID from Get WhatsApp Senders. |
| `template_id` | number | yes |  | Template ID. Template ID from Get WhatsApp Templates (must be approved) |
| `recipient_phone` | string | yes |  | Recipient phone. Recipient phone number (E.164 format: +1234567890) |
| `recipient_name` | string | no |  | Recipient name. Optional. Used for conversation tracking and CRM (max 255 characters) |
| `variables` | object | no | `{}` | Template variables. Key-value pairs: use "1", "2", … or names from the template `variables` array. Leave empty if the template has no placeholders. |

### `sendWhatsAppFreeform`

**Send WhatsApp Freeform Message.** Send a free-text (non-template) WhatsApp message from a sender to a recipient. This only works while a 24-hour customer-initiated session is open; outside that window a pre-approved template is required instead (see Get WhatsApp Templates). Check the window first with Get WhatsApp Session Status. Each call sends a new message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sender_id` | number | yes |  | Sender ID. WhatsApp sender ID from Get WhatsApp Senders (sender must be online) |
| `recipient_phone` | string | yes |  | Recipient phone. Recipient phone number (E.164 format: +1234567890) |
| `message` | string | yes |  | Message. Free-text content (max 4096 characters). Only works within an active 24-hour messaging window; otherwise send a template first. |

### `getWhatsAppSessionStatus`

**Get WhatsApp Session Status.** Check whether a 24-hour WhatsApp messaging window is currently open between a given sender and recipient. Use before sending a free-text WhatsApp message to decide whether Send WhatsApp Freeform is allowed or a pre-approved template is required. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sender_id` | number | yes |  | Sender ID. WhatsApp sender ID from Get WhatsApp Senders. |
| `recipient_phone` | string | yes |  | Recipient phone. Recipient to check the 24-hour window for (E.164 format: +1234567890) |

### `listConversations`

**List Conversations.** List conversations, optionally filtered by channel type, assistant, customer phone, WhatsApp sender phone, or external identifier, with cursor-based pagination. Use to find a conversation or its UUID; to read one thread's messages use Get Conversation. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | no |  | Conversation type. Filter by channel (optional) One of `"test"`, `"widget"`, `"whatsapp"`, `"api"`. |
| `assistant_id` | number | no |  | Assistant ID. Filter by assistant numeric ID (must belong to your account) |
| `customer_phone` | string | no |  | Customer phone. Exact match (E.164, e.g. +49123456789) |
| `whatsapp_sender_phone` | string | no |  | WhatsApp sender phone. Filter by WhatsApp Business sender number (exact match) |
| `external_identifier` | string | no |  | External identifier. Filter by CRM / external reference. |
| `per_page` | number | no | `15` | Per page. Page size (1–100). Default on the API is 15 if omitted. |
| `cursor` | string | no |  | Cursor. Pagination cursor (paste next_cursor from a previous list response) |

### `listCalls`

**List Calls.** List call records, optionally narrowed by status, direction (inbound/outbound), phone number, assistant, campaign, date range, and paginated. Use to browse or search calls; to fetch one call's full transcript and recording use Get Call instead. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no |  | Status. Filter by call status (optional) One of `"initiated"`, `"ringing"`, `"busy"`, `"in-progress"`, `"ended"`, `"completed"`, `"ended_by_customer"`, `"ended_by_assistant"`, `"no-answer"`, `"failed"`. |
| `type` | string | no |  | Call type. Inbound, outbound, or web (optional) One of `"inbound"`, `"outbound"`, `"web"`. |
| `phone_number` | string | no |  | Client phone number. Filter by client phone number. |
| `assistant_id` | number | no |  | Assistant ID. Filter by assistant ID. |
| `campaign_id` | number | no |  | Campaign ID. Filter by campaign ID. |
| `date_from` | string | no |  | Date from. Start date (YYYY-MM-DD) |
| `date_to` | string | no |  | Date to. End date (YYYY-MM-DD) |
| `per_page` | number | no | `15` | Per page. Results per page (1–100). API default is 15. |
| `page` | number | no | `1` | Page. Page number (default 1) |

### `getCall`

**Get Call.** Fetch the full details of a single call by its numeric ID, including transcript and recording. Use when you already have a call ID and need its content; to discover or filter calls first use List Calls. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `call_id` | number | yes |  | Call ID. Numeric ID of the call (from list calls or Famulor UI) |

### `deleteCall`

**Delete Call.** Permanently delete a single call record (transcript and recording included) by its numeric call ID. Use only when a caller explicitly wants a call purged; this is destructive and cannot be undone. Repeating the call on an already-deleted ID will not restore data, so treat it as non-idempotent. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `call_id` | number | yes |  | Call ID. Numeric ID of the call to delete permanently (transcript, recording, and metadata are removed) |

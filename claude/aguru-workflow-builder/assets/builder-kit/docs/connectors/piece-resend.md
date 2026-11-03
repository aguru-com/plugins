# Resend

The email API for developers

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-resend'
  version: '0.5.2'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
> 1. Log in to your [Resend dashboard](https://resend.com/overview)
> 2. Go to **API Keys** in the left sidebar
> 3. Click **Create API Key**, give it a name, and copy the key

## Actions

### `send_email`

**Send Email.** Sends a single transactional email (plain text or HTML) to one or more recipients via Resend. Use this for one-off messages; the sender address must be on a domain you have verified in Resend. Not idempotent — each call sends a new email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | array | yes |  | To. Emails of the recipients. |
| `from_name` | string | yes |  | Sender Name. Sender name. |
| `from` | string | yes |  | Sender Email (From). Sender email. |
| `bcc` | array | no |  | BCC. List of emails in bcc. |
| `cc` | array | no |  | CC. List of emails in cc. |
| `reply_to` | string | no |  | Reply To. Email to receive replies on (defaults to sender) |
| `subject` | string | yes |  | Subject. |
| `content_type` | string | yes | `"html"` | Content Type. A value the product loads from the provider, such as an id; write the value itself. |
| `content` | string | yes |  | Content. HTML is only allowed if you selected HTML as type. |

Output fields:

- `body.id`: Email ID

### `send_batch_emails`

**Send Batch Emails.** Sends up to 100 distinct emails in one Resend API call, each with its own recipient, subject, and body. Use this instead of Send Email when delivering many independent messages at once. Senders must be on verified domains; pass an idempotency key to guard against duplicate batch sends, otherwise each call sends new emails. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `emails` | array | yes |  | Emails. List of emails to send (max 100). Each email is sent independently with its own recipient, subject, and body. Each item: { `from`, `to`, `subject`, `content_type`, `content`, `reply_to`?, `cc`?, `bcc`? }. |
| `idempotency_key` | string | no |  | Idempotency Key. Optional unique key to prevent duplicate sends. Must be unique per request, expires after 24 hours, max 256 characters. |

Output fields:

- `[].id`: Email ID

### `get_email_status`

**Get Email Status.** Looks up the current delivery status and details of a single previously sent email by its Resend email ID. Use this to check whether a specific email was delivered, bounced, or is still scheduled. Read-only and idempotent; requires the email ID returned when the email was sent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_id` | string | yes |  | Email ID. The ID returned when you sent the email. |

Output fields:

- `id`: Email ID
- `subject`: Subject
- `from`: From
- `to`: To
- `cc`: CC
- `bcc`: BCC
- `reply_to`: Reply To
- `last_event`: Last Event
- `created_at`: Created At (datetime)
- `scheduled_at`: Scheduled At (datetime)
- `message_id`: Message ID
- `text`: Text Body
- `html`: HTML Body (html)

### `list_emails`

**List Sent Emails.** Retrieves the list of emails sent from the connected Resend account, including their IDs, recipients, subjects, and latest delivery event. Use this to discover email IDs (e.g. to feed Get Email Status, Cancel Scheduled Email, or Reschedule Email) or to audit recent sends. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Email ID
- `[].from`: From
- `[].to`: To
- `[].subject`: Subject
- `[].last_event`: Last Event
- `[].created_at`: Created At (datetime)
- `[].scheduled_at`: Scheduled At
- `[].cc`: CC
- `[].bcc`: BCC
- `[].reply_to`: Reply To

### `cancel_scheduled_email`

**Cancel Scheduled Email.** Cancels a previously scheduled email so it will not be delivered, identified by its Resend email ID. Use this to stop a future send before its scheduled time. Effectively idempotent — once an email is cancelled, repeating the call has no further effect; only works while the email is still pending. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_id` | string | yes |  | Email ID. The ID of the scheduled email to cancel. Use "List Sent Emails" to find it. |

Output fields:

- `id`: Email ID

### `reschedule_email`

**Reschedule Email.** Changes the future send time of an already scheduled email, identified by its Resend email ID. Use this to move a pending send to a new time without cancelling and recreating it. Idempotent when called with the same target time; requires an ISO 8601 date-time and only works while the email is still scheduled. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_id` | string | yes |  | Email ID. The ID of the scheduled email to reschedule. Use "List Sent Emails" to find it. |
| `scheduled_at` | string | yes |  | New Send Time. ISO 8601 date-time for when to send the email, e.g. 2024-12-01T10:00:00Z. |

Output fields:

- `id`: Email ID

### `create_contact`

**Create Contact.** Adds a new contact (email plus optional name and subscription status) to a specific Resend audience. Use this to grow a mailing list; requires the target audience ID (use List Audiences to find it). Not idempotent — each call creates a new contact, so guard against re-adding the same email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audience_id` | string | yes |  | Audience. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `unsubscribed` | boolean | no | `false` | Unsubscribed. If true, the contact will be unsubscribed from all broadcasts. |

Output fields:

- `id`: Contact ID

### `update_contact`

**Update Contact.** Updates an existing contact's first name, last name, or subscribed/unsubscribed status within an audience, identified by audience ID and contact ID. Use this to change details or toggle subscription for a known contact. Idempotent — repeating with the same values leaves the contact in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audience_id` | string | yes |  | Audience. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `unsubscribed` | string | no |  | Subscription Status. One of `false`, `true`. |

Output fields:

- `id`: Contact ID

### `delete_contact`

**Delete Contact.** Permanently removes a contact from a Resend audience, identified by audience ID and contact ID. Use this to delete a subscriber from a list. Effectively idempotent — once removed, repeating the call has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audience_id` | string | yes |  | Audience. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `contact`: Contact ID
- `deleted`: Deleted (boolean)

### `list_contacts`

**List Contacts.** Retrieves all contacts in a specific Resend audience, including each contact's ID, email, name, and subscription status. Use this to discover contact IDs (e.g. to feed Update Contact or Delete Contact) or to inspect a mailing list; requires the audience ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audience_id` | string | yes |  | Audience. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `[].id`: Contact ID
- `[].email`: Email (email)
- `[].first_name`: First Name
- `[].last_name`: Last Name
- `[].unsubscribed`: Unsubscribed (boolean)
- `[].created_at`: Created At (datetime)

### `list_domains`

**List Domains.** Retrieves all sending domains configured on the connected Resend account, including each domain's ID, name, verification status, and region. Use this to find a domain ID (e.g. for Verify Domain or Delete Domain) or to check which domains are verified before sending. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Domain ID
- `[].name`: Domain Name
- `[].status`: Status
- `[].region`: Region
- `[].created_at`: Created At (datetime)
- `[].sending`: Sending Capability
- `[].receiving`: Receiving Capability

### `create_domain`

**Create Domain.** Registers a new sending domain on the Resend account and returns the DNS records that must be added to verify it. Use this as the first step in setting up a custom sending domain before triggering verification. Not idempotent — each call attempts to create a new domain entry. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Domain Name. The domain you want to send from, e.g. mail.yourdomain.com. |
| `region` | string | no |  | Region. AWS region for email delivery. Defaults to US East. One of `"us-east-1"`, `"eu-west-1"`, `"ap-northeast-1"`, `"sa-east-1"`. |

Output fields:

- `id`: Domain ID
- `name`: Domain Name
- `status`: Status
- `region`: Region
- `created_at`: Created At (datetime)
- `sending`: Sending Capability
- `receiving`: Receiving Capability
- `dns_records`: DNS Records
- `dns_records[].record`: Record Purpose
- `dns_records[].name`: Host
- `dns_records[].type`: DNS Type
- `dns_records[].value`: Value
- `dns_records[].ttl`: TTL
- `dns_records[].status`: Status
- `dns_records[].priority`: Priority (number)

### `delete_domain`

**Delete Domain.** Permanently removes a sending domain from the Resend account, identified by its domain ID. Use this to decommission a domain you no longer send from. Effectively idempotent — once deleted, repeating the call has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | string | yes |  | Domain. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Domain ID
- `deleted`: Deleted (boolean)

### `verify_domain`

**Verify Domain.** Triggers Resend to re-check the DNS records of a domain and update its verification status, identified by domain ID. Use this after adding the required DNS records (from Create Domain) to confirm the domain is ready to send. Safe to call repeatedly — it only re-runs the check. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain_id` | string | yes |  | Domain. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Domain ID

### `list_audiences`

**List Audiences.** Retrieves all contact audiences (mailing lists) in the connected Resend account, including each audience's ID and name. Use this to discover an audience ID needed by contact and broadcast actions (e.g. Create Contact, List Contacts, Create Broadcast). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Audience ID
- `[].name`: Name
- `[].created_at`: Created At (datetime)

### `create_audience`

**Create Audience.** Creates a new contact audience (mailing list) in Resend with the given name and returns its ID. Use this before adding contacts or sending broadcasts when no suitable audience exists yet. Not idempotent — each call creates a new audience even if the name matches an existing one. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Audience Name. A label for this audience, e.g. "Newsletter Subscribers". |

Output fields:

- `id`: Audience ID
- `name`: Name

### `delete_audience`

**Delete Audience.** Permanently deletes an entire audience and all of its contacts from Resend, identified by audience ID. Use this to remove a whole mailing list; this is destructive and cannot be undone. Effectively idempotent — once deleted, repeating the call has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audience_id` | string | yes |  | Audience. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Audience ID
- `deleted`: Deleted (boolean)

### `list_broadcasts`

**List Broadcasts.** Retrieves all broadcast campaigns in the connected Resend account, including each broadcast's ID, name, audience, subject, and status (draft, scheduled, sent). Use this to find a broadcast ID (e.g. for Send Broadcast or Delete Broadcast) or to check campaign status. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Broadcast ID
- `[].name`: Name
- `[].audience_id`: Audience ID
- `[].status`: Status
- `[].reply_to`: Reply To
- `[].preview_text`: Preview Text
- `[].created_at`: Created At (datetime)
- `[].scheduled_at`: Scheduled At (datetime)
- `[].sent_at`: Sent At (datetime)

### `create_broadcast`

**Create Broadcast.** Creates a draft broadcast email (subject and body) targeting a Resend audience and returns its ID. Use this to prepare a campaign; it only creates the draft and does not deliver anything — pair it with Send Broadcast to actually send. Requires the audience ID and a sender on a verified domain. Not idempotent — each call creates a new broadcast. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audience_id` | string | yes |  | Audience. A value the product loads from the provider, such as an id; write the value itself. |
| `from` | string | yes |  | From. Sender address. Must be from a verified domain. Use "Name <email@yourdomain.com>" for a friendly name. |
| `subject` | string | yes |  | Subject. |
| `name` | string | no |  | Broadcast Name. Internal label for this broadcast. Not visible to recipients. |
| `reply_to` | string | no |  | Reply To. Email address recipients will reply to. |
| `preview_text` | string | no |  | Preview Text. Short summary shown in email clients below the subject line. |
| `content_type` | string | yes |  | Content Type. One of `"html"`, `"text"`. |
| `content` | string | yes |  | Content. Email body. Use HTML markup if Content Type is HTML. |

Output fields:

- `id`: Broadcast ID

### `send_broadcast`

**Send Broadcast.** Sends an existing draft broadcast to its entire audience immediately, or schedules it for a future time, identified by broadcast ID. Use this after Create Broadcast to deliver the campaign. Not idempotent — repeating the call can dispatch the broadcast again; optionally pass an ISO 8601 time to schedule rather than send now. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `broadcast_id` | string | yes |  | Broadcast. A value the product loads from the provider, such as an id; write the value itself. |
| `scheduled_at` | string | no |  | Schedule For. ISO 8601 date-time to schedule the send, e.g. 2024-12-01T10:00:00Z. Leave blank to send immediately. |

Output fields:

- `id`: Broadcast ID

### `delete_broadcast`

**Delete Broadcast.** Permanently deletes a broadcast from the Resend account, identified by broadcast ID. Use this to remove a draft or unwanted campaign; only broadcasts that have not been sent can be deleted. Effectively idempotent — once deleted, repeating the call has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `broadcast_id` | string | yes |  | Broadcast. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Broadcast ID
- `deleted`: Deleted (boolean)

### `get_broadcast`

**Get Broadcast.** Retrieves the full details of a single broadcast (subject, body, status, schedule) by its ID, including whether it has been sent. Use this to inspect a specific broadcast before editing or sending it; use List Broadcasts to find the ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `broadcast_id` | string | yes |  | Broadcast. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Broadcast ID
- `name`: Name
- `segment_id`: Segment ID
- `topic_id`: Topic ID
- `from`: From
- `subject`: Subject
- `reply_to`: Reply To
- `preview_text`: Preview Text
- `html`: HTML Body (html)
- `text`: Text Body
- `status`: Status
- `created_at`: Created At (datetime)
- `scheduled_at`: Scheduled At (datetime)
- `sent_at`: Sent At (datetime)

### `update_broadcast`

**Update Broadcast.** Updates the sender, subject, reply-to, body, name, or audience/topic targeting of an existing broadcast that has not been sent yet, identified by broadcast ID. Only supplied fields change; anything left blank keeps its current value. Not usable once the broadcast has been sent. Idempotent — re-applying the same values leaves the broadcast unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `broadcast_id` | string | yes |  | Broadcast. A value the product loads from the provider, such as an id; write the value itself. |
| `segment_id` | string | no |  | Segment ID. Send to this segment instead of the broadcast's current audience. Obtain from List Segments. |
| `topic_id` | string | no |  | Topic ID. Scope the broadcast to contacts subscribed to this topic. Obtain from List Topics. |
| `from` | string | no |  | From. Sender address. Must be from a verified domain. |
| `subject` | string | no |  | Subject. |
| `reply_to` | string | no |  | Reply To. Email address recipients will reply to. |
| `name` | string | no |  | Broadcast Name. Internal label for this broadcast. Not visible to recipients. |
| `content_type` | string | no |  | Content Type. Leave blank to keep the existing body unchanged. One of `"html"`, `"text"`. |
| `content` | string | no |  | Content. New email body. Requires Content Type to be set. |

Output fields:

- `id`: Broadcast ID

### `get_contact`

**Get Contact.** Looks up a single contact account-wide by Resend contact ID or email address, without needing to know which audience they belong to. Use this to check a contact's subscription status or custom properties before sending or updating. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_identifier` | string | yes |  | Contact ID or Email. The contact's Resend ID, or their email address. |

Output fields:

- `id`: Contact ID
- `email`: Email (email)
- `first_name`: First Name
- `last_name`: Last Name
- `unsubscribed`: Unsubscribed (boolean)
- `created_at`: Created At (datetime)
- `properties`: Custom Properties

### `add_contact_to_segment`

**Add Contact To Segment.** Adds an existing contact (identified by ID or email) to a segment (identified by segment ID), for targeted broadcasts. Use List Segments to find the segment ID. Idempotent — adding a contact already in the segment leaves it unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_identifier` | string | yes |  | Contact ID or Email. The contact's Resend ID, or their email address. |
| `segment_id` | string | yes |  | Segment. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Contact ID
- `audienceId`: Segment ID

### `remove_contact_from_segment`

**Remove Contact From Segment.** Removes a contact (identified by ID or email) from a segment (identified by segment ID). Use List Contact Segments to confirm current membership first. Effectively idempotent — once removed, repeating the call has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_identifier` | string | yes |  | Contact ID or Email. The contact's Resend ID, or their email address. |
| `segment_id` | string | yes |  | Segment. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Contact ID
- `audienceId`: Segment ID
- `deleted`: Deleted (boolean)

### `list_contact_segments`

**List Contact Segments.** Retrieves every segment a contact (identified by ID or email) currently belongs to. Use this to check segment membership before adding or removing a contact from a segment. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_identifier` | string | yes |  | Contact ID or Email. The contact's Resend ID, or their email address. |

Output fields:

- `[].id`: Segment ID
- `[].name`: Name
- `[].created_at`: Created At (datetime)

### `list_contact_topics`

**List Contact Topics.** Retrieves every topic a contact (identified by ID or email) is associated with, along with their opt-in/opt-out status for each. Use this to check a contact's topic preferences before sending topic-scoped broadcasts. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_identifier` | string | yes |  | Contact ID or Email. The contact's Resend ID, or their email address. |

Output fields:

- `[].id`: Topic ID
- `[].name`: Name
- `[].description`: Description
- `[].subscription`: Subscription

### `create_contact_property`

**Create Contact Property.** Creates a new custom contact property (a typed field, e.g. "plan_tier") that can be set per contact account-wide. Use this before referencing the property on a contact or template variable. The key and type are immutable after creation. Not idempotent — each call creates a new property even if the key matches an existing one. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | Key. Property name, up to 50 characters, alphanumeric and underscores only. |
| `type` | string | yes |  | Type. One of `"string"`, `"number"`. |
| `fallback_value` | string | no |  | Fallback Value. Default value used when the property is not set on a contact. Must match the selected type. |

Output fields:

- `id`: Contact Property ID

### `get_contact_property`

**Get Contact Property.** Retrieves the definition (key, type, fallback value) of a single custom contact property by its ID. Use List Contact Properties to find the ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_property_id` | string | yes |  | Contact Property. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Contact Property ID
- `key`: Key
- `type`: Type
- `fallback_value`: Fallback Value
- `created_at`: Created At (datetime)

### `list_contact_properties`

**List Contact Properties.** Retrieves every custom contact property defined on the account, including each one's key, type, and fallback value. Use this to discover a property ID (e.g. for Update or Delete Contact Property) or to check what custom fields exist before creating a new one. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Contact Property ID
- `[].key`: Key
- `[].type`: Type
- `[].fallback_value`: Fallback Value
- `[].created_at`: Created At (datetime)

### `update_contact_property`

**Update Contact Property.** Updates the fallback value of an existing custom contact property, identified by ID. The key and type cannot be changed after creation — create a new property instead if either needs to change. Idempotent — re-applying the same value leaves the property unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_property_id` | string | yes |  | Contact Property. A value the product loads from the provider, such as an id; write the value itself. |
| `fallback_value` | string | yes |  | Fallback Value. New default value, used when the property is not set on a contact. Must match the property's type. |

Output fields:

- `id`: Contact Property ID

### `delete_contact_property`

**Delete Contact Property.** Permanently deletes a custom contact property, identified by ID. Removing it clears its value from every contact that had it set. Effectively idempotent — once deleted, repeating the call has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_property_id` | string | yes |  | Contact Property. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Contact Property ID
- `deleted`: Deleted (boolean)

### `create_segment`

**Create Segment.** Creates a new empty segment (a named group of contacts) and returns its ID. Use this before adding contacts to it with Add Contact To Segment, or before targeting it with a broadcast. Not idempotent — each call creates a new segment even if the name matches an existing one. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. A label for this segment. |

Output fields:

- `id`: Segment ID
- `name`: Name

### `get_segment`

**Get Segment.** Retrieves the name and creation date of a single segment by its ID. Use List Segments to find the ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `segment_id` | string | yes |  | Segment. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Segment ID
- `name`: Name
- `created_at`: Created At (datetime)

### `list_segments`

**List Segments.** Retrieves every segment defined on the account, including each one's ID and name. Use this to discover a segment ID (e.g. for Add Contact To Segment or targeting a broadcast) or to check whether a suitable segment already exists. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Segment ID
- `[].name`: Name
- `[].created_at`: Created At (datetime)

### `delete_segment`

**Delete Segment.** Permanently deletes a segment by its ID; contacts themselves are not deleted, only their membership in this segment. Effectively idempotent — once deleted, repeating the call has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `segment_id` | string | yes |  | Segment. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Segment ID
- `deleted`: Deleted (boolean)

### `create_topic`

**Create Topic.** Creates a new topic (an opt-in/opt-out subscription category shown on the unsubscribe page) and returns its ID. The default subscription state is permanent once set. Not idempotent — each call creates a new topic even if the name matches an existing one. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Topic identifier, up to 50 characters. |
| `default_subscription` | string | yes |  | Default Subscription. Initial preference for new contacts. Cannot be changed after creation. One of `"opt_in"`, `"opt_out"`. |
| `description` | string | no |  | Description. Explanation shown to contacts, up to 200 characters. |
| `visibility` | string | no |  | Visibility. Whether all contacts or only opted-in contacts see this topic on the unsubscribe page. Defaults to private. One of `"public"`, `"private"`. |

Output fields:

- `id`: Topic ID

### `get_topic`

**Get Topic.** Retrieves the full details of a single topic (name, description, default subscription, visibility) by its ID. Use List Topics to find the ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topic_id` | string | yes |  | Topic. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Topic ID
- `name`: Name
- `description`: Description
- `default_subscription`: Default Subscription
- `visibility`: Visibility
- `created_at`: Created At (datetime)

### `list_topics`

**List Topics.** Retrieves every topic defined on the account, including each one's name, description, default subscription, and visibility. Use this to discover a topic ID or to check whether a suitable topic already exists. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Topic ID
- `[].name`: Name
- `[].description`: Description
- `[].default_subscription`: Default Subscription
- `[].visibility`: Visibility
- `[].created_at`: Created At (datetime)

### `update_topic`

**Update Topic.** Updates the name, description, or visibility of an existing topic, identified by ID. Only supplied fields change; the default subscription setting cannot be changed after creation. Idempotent — re-applying the same values leaves the topic unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topic_id` | string | yes |  | Topic. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `visibility` | string | no |  | Visibility. One of `"public"`, `"private"`. |

Output fields:

- `id`: Topic ID

### `delete_topic`

**Delete Topic.** Permanently deletes a topic by its ID, removing every contact's subscription state for it. Effectively idempotent — once deleted, repeating the call has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topic_id` | string | yes |  | Topic. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Topic ID
- `deleted`: Deleted (boolean)

### `create_template`

**Create Template.** Creates a new reusable email template from HTML (and optional plain text), returning its ID. The template starts as an unpublished draft — use Publish Template to make it available for sending. Not idempotent — each call creates a new template even if the name matches an existing one. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `html` | string | yes |  | HTML Body. |
| `alias` | string | no |  | Alias. Optional short alias that can be used instead of the template ID in other calls. |
| `from` | string | no |  | From. Default sender address. Must be from a verified domain. |
| `subject` | string | no |  | Default Subject. |
| `reply_to` | string | no |  | Reply To. |
| `text` | string | no |  | Text Body. Plain text version. Auto-generated from the HTML body if left blank. |

Output fields:

- `id`: Template ID

### `get_template`

**Get Template.** Retrieves the full content and metadata of a single email template, by ID or alias, including its HTML/text body and whether it has unpublished changes. Use List Templates to find the ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | string | yes |  | Template. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Template ID
- `current_version_id`: Current Version ID
- `alias`: Alias
- `name`: Name
- `status`: Status
- `from`: From
- `subject`: Subject
- `reply_to`: Reply To
- `html`: HTML Body (html)
- `text`: Text Body
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `published_at`: Published At (datetime)
- `has_unpublished_versions`: Has Unpublished Versions (boolean)
- `variables`: Variables
- `variables[].key`: Key
- `variables[].type`: Type
- `variables[].fallback_value`: Fallback Value

### `list_templates`

**List Templates.** Retrieves every email template defined on the account, including each one's status (draft or published) and alias. Use this to discover a template ID or check whether a suitable template already exists. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Template ID
- `[].name`: Name
- `[].alias`: Alias
- `[].status`: Status
- `[].published_at`: Published At (datetime)
- `[].created_at`: Created At (datetime)
- `[].updated_at`: Updated At (datetime)

### `update_template`

**Update Template.** Updates the name, alias, sender, subject, reply-to, or body of an existing email template, identified by ID or alias. Only supplied fields change. If the template was already published, changes apply as a new unpublished version until Publish Template is called again. Idempotent — re-applying the same values leaves the template unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | string | yes |  | Template. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `alias` | string | no |  | Alias. |
| `from` | string | no |  | From. |
| `subject` | string | no |  | Default Subject. |
| `reply_to` | string | no |  | Reply To. |
| `html` | string | no |  | HTML Body. |
| `text` | string | no |  | Text Body. |

Output fields:

- `id`: Template ID

### `delete_template`

**Delete Template.** Permanently deletes an email template, identified by ID or alias. Effectively idempotent — once deleted, repeating the call has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | string | yes |  | Template. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Template ID
- `deleted`: Deleted (boolean)

### `publish_template`

**Publish Template.** Publishes the current draft version of a template, identified by ID or alias, making it the version used when the template is referenced elsewhere. Use this after Create Template or Update Template once the content is ready to go live. Idempotent — publishing an already-published version with no pending changes is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | string | yes |  | Template. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Template ID

### `duplicate_template`

**Duplicate Template.** Creates a new template that is a copy of an existing one, identified by ID or alias, and returns the new template's ID. Use this to start a variant of an existing template without modifying the original. Not idempotent — each call creates a new duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | string | yes |  | Template. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Template ID

### `create_webhook`

**Create Webhook.** Creates a webhook that sends real-time notifications to an endpoint URL for the selected Resend event types, returning its ID and a signing secret used to verify payloads. Store the signing secret immediately — it is only returned once, at creation. Not idempotent — each call creates a new webhook. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `endpoint` | string | yes |  | Endpoint URL. The URL Resend will send event payloads to. |
| `events` | array | yes |  | Events. Event types to subscribe to, e.g. email.sent, email.bounced, contact.created. |

Output fields:

- `id`: Webhook ID
- `signing_secret`: Signing Secret

### `get_webhook`

**Get Webhook.** Retrieves the endpoint URL, status, and subscribed event types of a single webhook by its ID. Use List Webhooks to find the ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhook_id` | string | yes |  | Webhook. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Webhook ID
- `endpoint`: Endpoint URL
- `status`: Status
- `events`: Events
- `created_at`: Created At (datetime)

### `list_webhooks`

**List Webhooks.** Retrieves every webhook configured on the account, including each one's endpoint URL, status, and subscribed events. Use this to discover a webhook ID or audit existing subscriptions. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Webhook ID
- `[].endpoint`: Endpoint URL
- `[].status`: Status
- `[].events`: Events
- `[].created_at`: Created At (datetime)

### `update_webhook`

**Update Webhook.** Updates the endpoint URL, subscribed event types, or enabled/disabled status of an existing webhook, identified by ID. Only supplied fields change. Use this to pause a webhook (set status to disabled) without deleting it. Idempotent — re-applying the same values leaves the webhook unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhook_id` | string | yes |  | Webhook. A value the product loads from the provider, such as an id; write the value itself. |
| `endpoint` | string | no |  | Endpoint URL. |
| `events` | array | no |  | Events. Replaces the full set of subscribed event types. Leave blank to keep the current events. |
| `status` | string | no |  | Status. One of `"enabled"`, `"disabled"`. |

Output fields:

- `id`: Webhook ID

### `delete_webhook`

**Delete Webhook.** Permanently deletes a webhook, identified by ID, stopping all further event deliveries to its endpoint. Effectively idempotent — once deleted, repeating the call has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhook_id` | string | yes |  | Webhook. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Webhook ID
- `deleted`: Deleted (boolean)

### `get_email_attachment`

**Get Email Attachment.** Retrieves metadata and a download URL for a single attachment on a previously sent email, identified by email ID and attachment ID. Use List Email Attachments to find the attachment ID. Read-only and idempotent; the download URL expires after a limited time. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_id` | string | yes |  | Email ID. The ID of the sent email. Obtain from Get Email Status or List Sent Emails. |
| `attachment_id` | string | yes |  | Attachment ID. |

Output fields:

- `id`: Attachment ID
- `filename`: Filename
- `size`: Size (bytes) (number)
- `content_type`: Content Type
- `download_url`: Download URL
- `expires_at`: Expires At (datetime)

### `list_email_attachments`

**List Email Attachments.** Retrieves every attachment on a previously sent email, identified by email ID, including each one's filename, size, and a time-limited download URL. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_id` | string | yes |  | Email ID. The ID of the sent email. Obtain from Get Email Status or List Sent Emails. |

Output fields:

- `[].id`: Attachment ID
- `[].filename`: Filename
- `[].size`: Size (bytes) (number)
- `[].content_type`: Content Type
- `[].download_url`: Download URL
- `[].expires_at`: Expires At (datetime)

### `list_received_emails`

**List Received Emails.** Retrieves inbound emails received on a domain configured for receiving, including sender, recipients, and subject. Use this to check for and process incoming mail. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Email ID
- `[].from`: From
- `[].to`: To
- `[].subject`: Subject
- `[].created_at`: Created At (datetime)
- `[].cc`: CC
- `[].bcc`: BCC
- `[].reply_to`: Reply To

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

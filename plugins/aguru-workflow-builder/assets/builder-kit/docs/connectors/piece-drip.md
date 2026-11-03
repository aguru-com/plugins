# Drip

Email and SMS marketing automation for e-commerce

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-drip'
  version: '0.6.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Drip API token. In Drip go to Settings → User Settings → API Token (https://www.getdrip.com/user/edit) and copy the token.

## Actions

### `apply_tag_to_subscriber`

**Apply a tag to subscriber.** Applies a tag to a subscriber in a Drip account, identifying the subscriber by email address; if no subscriber has that email, Drip creates one with the tag. Repeating with the same email and tag has no additional effect, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account. A value the product loads from the provider, such as an id; write the value itself. |
| `subscriber` | string | yes |  | Subscriber Email. Email of the subscriber. |
| `tag` | string | yes |  | Tag. Tag to apply. |

Output fields:

- `status`: HTTP Status (number)

### `add_subscriber_to_campaign`

**Add a subscriber to a campaign.** Subscribes a contact (by email) to a Drip Email Series Campaign picked from the account, optionally attaching tags and custom fields; this starts the sequence, and if the series has double opt-in on, Drip first emails a confirmation. Not idempotent: each call re-subscribes and can restart the series. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account. A value the product loads from the provider, such as an id; write the value itself. |
| `campaign_id` | string | yes |  | Email Series Campaign. A value the product loads from the provider, such as an id; write the value itself. |
| `subscriber` | string | yes |  | Subscriber Email. Email of the subscriber. |
| `tags` | array | no |  | Tags. Tags to apply to subscriber. |
| `custom_fields` | object | no |  | Custom Fields. Custom field data about the subscriber. |

Output fields:

- `status`: HTTP Status (number)
- `body.subscribers`: Subscribers
- `body.subscribers[].id`: Subscriber ID
- `body.subscribers[].email`: Email (email)
- `body.subscribers[].status`: Status
- `body.subscribers[].first_name`: First Name
- `body.subscribers[].last_name`: Last Name
- `body.subscribers[].tags`: Tags
- `body.subscribers[].custom_fields`: Custom Fields (an object whose keys vary)
- `body.subscribers[].deliverable`: Deliverable (boolean)
- `body.subscribers[].address1`: Address Line 1
- `body.subscribers[].address2`: Address Line 2
- `body.subscribers[].city`: City
- `body.subscribers[].state`: State
- `body.subscribers[].zip`: Postal Code
- `body.subscribers[].country`: Country
- `body.subscribers[].phone`: Phone
- `body.subscribers[].sms_number`: SMS Number
- `body.subscribers[].time_zone`: Time Zone
- `body.subscribers[].user_id`: Your User ID
- `body.subscribers[].lifetime_value`: Lifetime Value (cents) (number)
- `body.subscribers[].lead_score`: Lead Score (number)
- `body.subscribers[].prospect`: Prospect (boolean)
- `body.subscribers[].eu_consent`: EU Consent
- `body.subscribers[].created_at`: Created At (datetime)

### `upsert_subscriber`

**Create or Update Subscriber.** Creates a subscriber in a Drip account, or updates the existing one matched by email address, setting tags, custom fields, and contact details (name, address, phone, location). Use to add a new contact or keep an existing contact in sync. Idempotent: matched on the stable email, so repeating with the same input converges to the same record. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account. A value the product loads from the provider, such as an id; write the value itself. |
| `subscriber` | string | yes |  | Subscriber Email. Email of the subscriber. |
| `tags` | array | no |  | Tags. Tags to apply to subscriber. |
| `custom_fields` | object | no |  | Custom Fields. Custom field data about the subscriber. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `zip` | string | no |  | Zip Code. Postal code in which the subscriber resides. |
| `country` | string | no |  | Country. The country in which the subscriber resides. |
| `state` | string | no |  | State. The region in which the subscriber resides. |
| `city` | string | no |  | City. The city in which the subscriber resides. |
| `phone` | string | no |  | Phone. The subscriber's primary phone number. |
| `address` | string | no |  | Address. Address line 1 of the subscriber's mailing address. |

Output fields:

- `status`: HTTP Status (number)
- `body.subscribers`: Subscribers
- `body.subscribers[].id`: Subscriber ID
- `body.subscribers[].email`: Email (email)
- `body.subscribers[].status`: Status
- `body.subscribers[].first_name`: First Name
- `body.subscribers[].last_name`: Last Name
- `body.subscribers[].tags`: Tags
- `body.subscribers[].custom_fields`: Custom Fields (an object whose keys vary)
- `body.subscribers[].deliverable`: Deliverable (boolean)
- `body.subscribers[].address1`: Address Line 1
- `body.subscribers[].address2`: Address Line 2
- `body.subscribers[].city`: City
- `body.subscribers[].state`: State
- `body.subscribers[].zip`: Postal Code
- `body.subscribers[].country`: Country
- `body.subscribers[].phone`: Phone
- `body.subscribers[].sms_number`: SMS Number
- `body.subscribers[].time_zone`: Time Zone
- `body.subscribers[].user_id`: Your User ID
- `body.subscribers[].lifetime_value`: Lifetime Value (cents) (number)
- `body.subscribers[].lead_score`: Lead Score (number)
- `body.subscribers[].prospect`: Prospect (boolean)
- `body.subscribers[].eu_consent`: EU Consent
- `body.subscribers[].created_at`: Created At (datetime)

### `batch_upsert_subscribers`

**Create or Update Subscribers (Batch).** Creates or updates up to 1,000 Drip subscribers in one call; each item is a subscriber object with an email or id plus optional fields such as first_name, tags or custom_fields. Drip processes the batch in the background (changes appear after a delay) and allows only 50 batch calls per hour. Matched on email or id, so repeating the same batch is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `subscribers` | JSON | yes | `[{"email":"jane@example.com","first_name":"Jane","tags":["Customer"]}]` | Subscribers. A JSON array of 1 to 1,000 subscriber objects. Each needs "email" or "id"; other keys use Drip names, e.g. [{"email": "jane@example.com", "first_name": "Jane", "tags": ["Customer"]}]. |

Output fields:

- `submitted`: Subscribers Submitted (number)
- `accepted`: Accepted for Processing (boolean)

### `delete_subscriber`

**Delete Subscriber.** Permanently deletes a subscriber and all their history from Drip, by email or subscriber ID; this cannot be undone. Use only when the user asks to erase a contact; to stop emails use Unsubscribe From All Emails instead. A repeat call finds them gone and reports alreadyDeleted=true, so it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `subscriber` | string | yes |  | Subscriber Email or ID. The subscriber email address or Drip subscriber ID. |

Output fields:

- `subscriber`: Subscriber
- `deleted`: Deleted (boolean)
- `alreadyDeleted`: Already Deleted (boolean)

### `find_subscriber`

**Find Subscriber.** Looks up one Drip subscriber by email address or subscriber ID and returns their profile, status, tags and custom fields, or found=false when there is no such subscriber. Use before updating, tagging or deleting a contact. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `subscriber` | string | yes |  | Subscriber Email or ID. The subscriber email address or Drip subscriber ID. |

Output fields:

- `found`: Found (boolean)
- `subscriber`: Subscriber
- `subscriber.id`: Subscriber ID
- `subscriber.email`: Email (email)
- `subscriber.status`: Status
- `subscriber.first_name`: First Name
- `subscriber.last_name`: Last Name
- `subscriber.tags`: Tags
- `subscriber.custom_fields`: Custom Fields (an object whose keys vary)
- `subscriber.deliverable`: Deliverable (boolean)
- `subscriber.address1`: Address Line 1
- `subscriber.address2`: Address Line 2
- `subscriber.city`: City
- `subscriber.state`: State
- `subscriber.zip`: Postal Code
- `subscriber.country`: Country
- `subscriber.phone`: Phone
- `subscriber.sms_number`: SMS Number
- `subscriber.time_zone`: Time Zone
- `subscriber.user_id`: Your User ID
- `subscriber.lifetime_value`: Lifetime Value (cents) (number)
- `subscriber.lead_score`: Lead Score (number)
- `subscriber.prospect`: Prospect (boolean)
- `subscriber.eu_consent`: EU Consent
- `subscriber.created_at`: Created At (datetime)

### `get_broadcast`

**Get Broadcast.** Returns one Drip Single-Email Campaign (broadcast) by ID with name, status, subject, sender, send time and preview URL. Use after List Broadcasts to inspect one; this cannot send it. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `id` | string | yes |  | Broadcast ID. Single-Email Campaign ID (digits, from List Broadcasts). |

Output fields:

- `id`: Broadcast ID
- `name`: Name
- `status`: Status
- `subject`: Subject
- `from_name`: From Name
- `from_email`: From Email (email)
- `send_at`: Send At (datetime)
- `preview_url`: Preview URL (url)
- `created_at`: Created At (datetime)

### `get_campaign`

**Get Email Series.** Returns one Drip Email Series Campaign by Campaign ID: name, status, sender, sending schedule, double opt-in setting, email count and subscriber counts. Use after List Email Series to inspect a sequence. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `id` | string | yes |  | Campaign ID. Email Series Campaign ID (digits, from List Email Series). |

Output fields:

- `id`: Campaign ID
- `name`: Name
- `status`: Status
- `from_name`: From Name
- `from_email`: From Email (email)
- `email_count`: Email Count (number)
- `active_subscriber_count`: Active Subscribers (number)
- `unsubscribed_subscriber_count`: Unsubscribed Subscribers (number)
- `double_optin`: Double Opt-In (boolean)
- `start_immediately`: Starts Immediately (boolean)
- `created_at`: Created At (datetime)

### `get_conversion`

**Get Conversion.** Returns one Drip conversion (goal) by ID with name, status, URL, default value in cents and counting method. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `id` | string | yes |  | Conversion ID. Conversion ID (digits, from List Conversions). |

Output fields:

- `id`: Conversion ID
- `name`: Name
- `status`: Status
- `url`: URL
- `default_value`: Default Value (cents) (number)
- `counting_method`: Counting Method
- `created_at`: Created At (datetime)

### `get_current_user`

**Get Current User.** Returns the email, name and time zone of the Drip user who owns the connected API token. Use to confirm which Drip login the connection belongs to. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `email`: Email (email)
- `name`: Name
- `time_zone`: Time Zone

### `get_form`

**Get Form.** Returns one Drip opt-in form by Form ID with its headline, description, button text and display settings. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `id` | string | yes |  | Form ID. Form ID (digits, from List Forms). |

Output fields:

- `id`: Form ID
- `headline`: Headline
- `description`: Description
- `button_text`: Button Text
- `is_widget_enabled`: Widget Enabled (boolean)
- `is_embeddable`: Embeddable (boolean)
- `created_at`: Created At (datetime)

### `get_workflow`

**Get Workflow.** Returns one Drip workflow by Workflow ID with its name, status (draft, active, paused) and creation date. Use to check a workflow is active before starting someone on it. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `id` | string | yes |  | Workflow ID. Workflow ID (digits, from List Workflows). |

Output fields:

- `id`: Workflow ID
- `name`: Name
- `status`: Status
- `created_at`: Created At (datetime)

### `list_accounts`

**List Accounts.** Lists every Drip account the connected API token can access, with account ID, name, website and sender details. Use first when another Drip step needs an Account ID and the token may have more than one account. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Accounts
- `items[].id`: Account ID
- `items[].name`: Name
- `items[].url`: Website
- `items[].primary_email`: Primary Email (email)
- `items[].default_from_name`: Default From Name
- `items[].default_from_email`: Default From Email (email)
- `items[].created_at`: Created At (datetime)

### `list_broadcasts`

**List Broadcasts.** Lists Drip Single-Email Campaigns (broadcasts) one page at a time with ID, name, status (draft, scheduled, sending, sent, canceled), subject and send time. Use to report on or look up a broadcast; this cannot create or send one. Pass the next page while hasMore is true. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `status` | string | no |  | Status. Only broadcasts with this status. Defaults to all except deleted. One of `"all"`, `"draft"`, `"scheduled"`, `"sending"`, `"sent"`, `"canceled"`. |
| `page` | number | no | `1` | Page. Page number, starting at 1. Pass the next page while Has More is true. |
| `perPage` | number | no | `100` | Results per Page. How many results per page (1-100). |

Output fields:

- `items`: Broadcasts
- `items[].id`: Broadcast ID
- `items[].name`: Name
- `items[].status`: Status
- `items[].subject`: Subject
- `items[].from_name`: From Name
- `items[].from_email`: From Email (email)
- `items[].send_at`: Send At (datetime)
- `items[].preview_url`: Preview URL (url)
- `items[].created_at`: Created At (datetime)
- `page`: Page (number)
- `totalPages`: Total Pages (number)
- `totalCount`: Total Count (number)
- `hasMore`: Has More (boolean)

### `list_campaign_subscribers`

**List Email Series Subscribers.** Lists the subscribers of one Drip Email Series Campaign by Campaign ID, one page at a time, filtered by subscription status (active by default, unsubscribed or removed). Pass the next page while hasMore is true. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `campaignId` | string | yes |  | Campaign ID. Email Series Campaign ID (digits, from List Email Series). |
| `status` | string | no |  | Subscription Status. Defaults to active. One of `"active"`, `"unsubscribed"`, `"removed"`. |
| `page` | number | no | `1` | Page. Page number, starting at 1. Pass the next page while Has More is true. |
| `perPage` | number | no | `100` | Results per Page. How many results per page (1-1000). |

Output fields:

- `items`: Subscribers
- `items[].id`: Subscriber ID
- `items[].email`: Email (email)
- `items[].status`: Status
- `items[].first_name`: First Name
- `items[].last_name`: Last Name
- `items[].tags`: Tags
- `items[].custom_fields`: Custom Fields (an object whose keys vary)
- `items[].deliverable`: Deliverable (boolean)
- `items[].address1`: Address Line 1
- `items[].address2`: Address Line 2
- `items[].city`: City
- `items[].state`: State
- `items[].zip`: Postal Code
- `items[].country`: Country
- `items[].phone`: Phone
- `items[].sms_number`: SMS Number
- `items[].time_zone`: Time Zone
- `items[].user_id`: Your User ID
- `items[].lifetime_value`: Lifetime Value (cents) (number)
- `items[].lead_score`: Lead Score (number)
- `items[].prospect`: Prospect (boolean)
- `items[].eu_consent`: EU Consent
- `items[].created_at`: Created At (datetime)
- `page`: Page (number)
- `totalPages`: Total Pages (number)
- `totalCount`: Total Count (number)
- `hasMore`: Has More (boolean)

### `list_campaigns`

**List Email Series.** Lists Drip Email Series Campaigns (automated email sequences) one page at a time with ID, name, status (draft, active, paused), sender, email count and subscriber counts. Use to find a Campaign ID for Subscribe to Email Series or Remove Subscriber From Email Series; pass the next page while hasMore is true. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `status` | string | no |  | Status. Only campaigns with this status. Defaults to all. One of `"all"`, `"active"`, `"draft"`, `"paused"`. |
| `page` | number | no | `1` | Page. Page number, starting at 1. Pass the next page while Has More is true. |
| `perPage` | number | no | `100` | Results per Page. How many results per page (1-1000). |

Output fields:

- `items`: Email Series
- `items[].id`: Campaign ID
- `items[].name`: Name
- `items[].status`: Status
- `items[].from_name`: From Name
- `items[].from_email`: From Email (email)
- `items[].email_count`: Email Count (number)
- `items[].active_subscriber_count`: Active Subscribers (number)
- `items[].unsubscribed_subscriber_count`: Unsubscribed Subscribers (number)
- `items[].double_optin`: Double Opt-In (boolean)
- `items[].start_immediately`: Starts Immediately (boolean)
- `items[].created_at`: Created At (datetime)
- `page`: Page (number)
- `totalPages`: Total Pages (number)
- `totalCount`: Total Count (number)
- `hasMore`: Has More (boolean)

### `list_conversions`

**List Conversions.** Lists Drip conversions (goals) one page at a time with ID, name, status, URL, default value in cents and counting method. Use to find a conversion before recording a conversion event. Pass the next page while hasMore is true. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `status` | string | no |  | Status. Only conversions with this status. One of `"all"`, `"active"`, `"disabled"`. |
| `page` | number | no | `1` | Page. Page number, starting at 1. Pass the next page while Has More is true. |
| `perPage` | number | no | `100` | Results per Page. How many results per page (1-1000). |

Output fields:

- `items`: Conversions
- `items[].id`: Conversion ID
- `items[].name`: Name
- `items[].status`: Status
- `items[].url`: URL
- `items[].default_value`: Default Value (cents) (number)
- `items[].counting_method`: Counting Method
- `items[].created_at`: Created At (datetime)
- `page`: Page (number)
- `totalPages`: Total Pages (number)
- `totalCount`: Total Count (number)
- `hasMore`: Has More (boolean)

### `list_custom_fields`

**List Custom Fields.** Lists the custom field identifiers (keys such as shirt_size) used in a Drip account. Use to find the exact key before setting custom fields on a subscriber. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |

Output fields:

- `items`: Items

### `list_event_actions`

**List Custom Event Names.** Lists the custom event action names (e.g. "Logged in") recorded in a Drip account, one page at a time. Use to reuse an existing event name exactly before Record Custom Event; pass the next page while hasMore is true. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `page` | number | no | `1` | Page. Page number, starting at 1. Pass the next page while Has More is true. |
| `perPage` | number | no | `100` | Results per Page. How many results per page (1-1000). |

Output fields:

- `items`: Items
- `page`: Page (number)
- `totalPages`: Total Pages (number)
- `totalCount`: Total Count (number)
- `hasMore`: Has More (boolean)

### `list_forms`

**List Forms.** Lists every Drip opt-in form in an account with ID, headline, description and whether it shows as a widget or can be embedded. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |

Output fields:

- `items`: Forms
- `items[].id`: Form ID
- `items[].headline`: Headline
- `items[].description`: Description
- `items[].button_text`: Button Text
- `items[].is_widget_enabled`: Widget Enabled (boolean)
- `items[].is_embeddable`: Embeddable (boolean)
- `items[].created_at`: Created At (datetime)

### `list_subscriber_campaigns`

**List Subscriber's Email Series.** Lists one subscriber's Drip Email Series Campaign subscriptions (by email or subscriber ID): campaign ID, status, whether the series is complete and the last email sent. Use to check which sequences a contact is in before adding or removing them. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `subscriber` | string | yes |  | Subscriber Email or ID. The subscriber email address or Drip subscriber ID. |
| `page` | number | no | `1` | Page. Page number, starting at 1. Pass the next page while Has More is true. |
| `perPage` | number | no | `100` | Results per Page. How many results per page (1-1000). |

Output fields:

- `items`: Subscriptions
- `items[].id`: Subscription ID
- `items[].campaign_id`: Campaign ID
- `items[].status`: Status
- `items[].is_complete`: Completed (boolean)
- `items[].lap`: Lap (number)
- `items[].last_sent_email_index`: Last Sent Email Index (number)
- `items[].last_sent_email_at`: Last Sent Email At (datetime)
- `page`: Page (number)
- `totalPages`: Total Pages (number)
- `totalCount`: Total Count (number)
- `hasMore`: Has More (boolean)

### `list_subscribers`

**List Subscribers.** Lists subscribers of a Drip account one page at a time, optionally only those with at least one of the given tags, a status (active by default, unsubscribed, undeliverable or all) or created within a date range. Use to find contacts in a segment; pass the next page number while hasMore is true. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `status` | string | no |  | Status. Which subscribers to return. Drip defaults to Active. One of `"active"`, `"unsubscribed"`, `"active_or_unsubscribed"`, `"undeliverable"`, `"all"`. |
| `tags` | array | no |  | Has Any of These Tags. Only return subscribers with at least one of these tags. |
| `subscribedAfter` | ISO date-time string | no |  | Created After. Only subscribers created after this date-time (ISO-8601). |
| `subscribedBefore` | ISO date-time string | no |  | Created Before. Only subscribers created before this date-time (ISO-8601). |
| `page` | number | no | `1` | Page. Page number, starting at 1. Pass the next page while Has More is true. |
| `perPage` | number | no | `100` | Results per Page. How many results per page (1-1000). |

Output fields:

- `items`: Subscribers
- `items[].id`: Subscriber ID
- `items[].email`: Email (email)
- `items[].status`: Status
- `items[].first_name`: First Name
- `items[].last_name`: Last Name
- `items[].tags`: Tags
- `items[].custom_fields`: Custom Fields (an object whose keys vary)
- `items[].deliverable`: Deliverable (boolean)
- `items[].address1`: Address Line 1
- `items[].address2`: Address Line 2
- `items[].city`: City
- `items[].state`: State
- `items[].zip`: Postal Code
- `items[].country`: Country
- `items[].phone`: Phone
- `items[].sms_number`: SMS Number
- `items[].time_zone`: Time Zone
- `items[].user_id`: Your User ID
- `items[].lifetime_value`: Lifetime Value (cents) (number)
- `items[].lead_score`: Lead Score (number)
- `items[].prospect`: Prospect (boolean)
- `items[].eu_consent`: EU Consent
- `items[].created_at`: Created At (datetime)
- `page`: Page (number)
- `totalPages`: Total Pages (number)
- `totalCount`: Total Count (number)
- `hasMore`: Has More (boolean)

### `list_tags`

**List Tags.** Lists every tag name used in a Drip account. Use to check the exact spelling of a tag before tagging, filtering or removing it. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |

Output fields:

- `items`: Items

### `list_workflows`

**List Workflows.** Lists Drip workflows (visual automations) one page at a time with ID, name and status (draft, active, paused). Use to find a Workflow ID for Start Workflow for Subscriber; pass the next page while hasMore is true. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `status` | string | no |  | Status. Only workflows with this status. Defaults to all. One of `"all"`, `"active"`, `"draft"`, `"paused"`. |
| `page` | number | no | `1` | Page. Page number, starting at 1. Pass the next page while Has More is true. |
| `perPage` | number | no | `100` | Results per Page. How many results per page (1-1000). |

Output fields:

- `items`: Workflows
- `items[].id`: Workflow ID
- `items[].name`: Name
- `items[].status`: Status
- `items[].created_at`: Created At (datetime)
- `page`: Page (number)
- `totalPages`: Total Pages (number)
- `totalCount`: Total Count (number)
- `hasMore`: Has More (boolean)

### `record_cart`

**Record Cart Activity.** Sends a shopping cart created or updated event for a customer to Drip Shopper Activity, with the cart link and line items, which powers abandoned-cart workflows; Drip creates the person if needed (subscribed unless New Person Status says otherwise) and workflows listening for cart events may send emails. Drip queues it and returns a request ID. Not idempotent: each call adds a cart event to the person's timeline. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `action` | string | yes |  | Cart Action. One of `"created"`, `"updated"`. |
| `cartId` | string | yes |  | Cart ID. Your unique internal cart ID. |
| `cartUrl` | string | yes |  | Cart URL. Link back to the shopper cart in your store. |
| `email` | string | no |  | Customer Email. Email of the customer. Either this or Drip Person ID is required. |
| `personId` | string | no |  | Drip Person ID. Drip subscriber ID of the customer. Used instead of the email when both are given. |
| `provider` | string | yes | `"activepieces"` | Provider. Lower snake_case name of the store platform, e.g. shopify or my_store. Drip treats provider + ID as the unique key. |
| `initialStatus` | string | no |  | New Person Status. Status for a person Drip creates from this activity. Drip subscribes them (active) when left empty; choose Unsubscribed if they have not consented to marketing. One of `"active"`, `"unsubscribed"`. |
| `occurredAt` | ISO date-time string | no |  | Occurred At. When it happened (ISO-8601). Defaults to now. |
| `cartPublicId` | string | no |  | Public Cart Number. |
| `grandTotal` | number | no |  | Grand Total. Cart total after discounts, e.g. 16.99. |
| `totalDiscounts` | number | no |  | Total Discounts. |
| `currency` | string | no |  | Currency. ISO 4217 code, e.g. USD. |
| `items` | JSON | no |  | Items. Optional JSON array of cart items. Each needs "product_id", "product_variant_id", "name" and "price"; e.g. [{"product_id": "B01", "product_variant_id": "B01", "name": "Water Bottle", "price": 11.16, "quantity": 2}]. |

Output fields:

- `requestId`: Drip Request ID
- `cartId`: Cart ID
- `action`: Cart Action
- `accepted`: Accepted (boolean)

### `record_event`

**Record Custom Event.** Records a custom event (an action name such as "Viewed pricing" plus optional properties) for a Drip subscriber by email or subscriber ID; an unknown email creates the subscriber. Drip workflows and rules listening for that action may run and send emails. Not idempotent: each call records another event. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `subscriber` | string | yes |  | Subscriber Email or ID. The subscriber email address or Drip subscriber ID. |
| `action` | string | yes |  | Event Action. The event name, e.g. Logged in. Reuse names from List Custom Event Names. |
| `properties` | object | no |  | Properties. Optional event properties. For a conversion, add "value" in cents. |
| `occurredAt` | ISO date-time string | no |  | Occurred At. When the event happened (ISO-8601). Defaults to now. |

Output fields:

- `subscriber`: Subscriber
- `action`: Event Action
- `occurredAt`: Occurred At (datetime)
- `recorded`: Recorded (boolean)

### `record_order`

**Record Order Activity.** Sends an e-commerce order event (placed, updated, paid, fulfilled, refunded or canceled) for a customer to Drip Shopper Activity, updating their order history and lifetime value; Drip creates the person if needed (subscribed unless New Person Status says otherwise) and workflows listening for order events may run. Drip queues it and returns a request ID. Not idempotent: each call adds an event to the timeline. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `action` | string | yes |  | Order Action. One of `"placed"`, `"updated"`, `"paid"`, `"fulfilled"`, `"refunded"`, `"canceled"`. |
| `orderId` | string | yes |  | Order ID. Your unique internal order ID. Provider + Order ID identify the order. |
| `email` | string | no |  | Customer Email. Email of the customer. Either this or Drip Person ID is required. |
| `personId` | string | no |  | Drip Person ID. Drip subscriber ID of the customer. Used instead of the email when both are given. |
| `provider` | string | yes | `"activepieces"` | Provider. Lower snake_case name of the store platform, e.g. shopify or my_store. Drip treats provider + ID as the unique key. |
| `initialStatus` | string | no |  | New Person Status. Status for a person Drip creates from this activity. Drip subscribes them (active) when left empty; choose Unsubscribed if they have not consented to marketing. One of `"active"`, `"unsubscribed"`. |
| `occurredAt` | ISO date-time string | no |  | Occurred At. When it happened (ISO-8601). Defaults to now. |
| `orderPublicId` | string | no |  | Public Order Number. Customer-facing order number, e.g. #1001. |
| `grandTotal` | number | no |  | Grand Total. Order total after discounts, e.g. 49.99. |
| `totalDiscounts` | number | no |  | Total Discounts. |
| `totalTaxes` | number | no |  | Total Taxes. |
| `totalShipping` | number | no |  | Total Shipping. |
| `refundAmount` | number | no |  | Refund Amount. For refunded or canceled orders: the amount refunded. Leave Grand Total unchanged. |
| `currency` | string | no |  | Currency. ISO 4217 code, e.g. USD. |
| `orderUrl` | string | no |  | Order URL. |
| `items` | JSON | no |  | Items. Optional JSON array of line items. Each needs "name"; e.g. [{"product_id": "B01", "name": "Water Bottle", "price": 11.16, "quantity": 2}]. |

Output fields:

- `requestId`: Drip Request ID
- `orderId`: Order ID
- `action`: Order Action
- `accepted`: Accepted (boolean)

### `remove_from_campaign`

**Remove Subscriber From Email Series.** Removes a subscriber (by email or ID) from one Drip Email Series Campaign, or from every email series when Campaign ID is empty, so they stop receiving those sequences; they stay subscribed to other mailings. Returns the subscriber. Repeating it changes nothing more, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `subscriber` | string | yes |  | Subscriber Email or ID. The subscriber email address or Drip subscriber ID. |
| `campaignId` | string | no |  | Campaign ID. Email Series Campaign ID (from List Email Series). Leave empty to remove the subscriber from all email series. |

Output fields:

- `id`: Subscriber ID
- `email`: Email (email)
- `status`: Status
- `first_name`: First Name
- `last_name`: Last Name
- `tags`: Tags
- `custom_fields`: Custom Fields (an object whose keys vary)
- `deliverable`: Deliverable (boolean)
- `address1`: Address Line 1
- `address2`: Address Line 2
- `city`: City
- `state`: State
- `zip`: Postal Code
- `country`: Country
- `phone`: Phone
- `sms_number`: SMS Number
- `time_zone`: Time Zone
- `user_id`: Your User ID
- `lifetime_value`: Lifetime Value (cents) (number)
- `lead_score`: Lead Score (number)
- `prospect`: Prospect (boolean)
- `eu_consent`: EU Consent
- `created_at`: Created At (datetime)

### `remove_from_workflow`

**Remove Subscriber From Workflow.** Removes a subscriber (by email or subscriber ID) from a Drip workflow by Workflow ID so it stops acting on them; nothing happens if they are not on it. Repeating it changes nothing more, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `workflowId` | string | yes |  | Workflow ID. Workflow ID (digits, from List Workflows). |
| `subscriber` | string | yes |  | Subscriber Email or ID. The subscriber email address or Drip subscriber ID. |

Output fields:

- `workflowId`: Workflow ID
- `subscriber`: Subscriber
- `removed`: Removed (boolean)

### `remove_tag`

**Remove Tag From Subscriber.** Removes a tag from a Drip subscriber identified by email or subscriber ID and reports whether the tag had been applied; fails if there is no such subscriber. Removing a tag the subscriber does not have changes nothing, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `subscriber` | string | yes |  | Subscriber Email or ID. The subscriber email address or Drip subscriber ID. |
| `tag` | string | yes |  | Tag. The tag to remove. |

Output fields:

- `subscriberId`: Subscriber ID
- `email`: Email (email)
- `tag`: Tag
- `wasApplied`: Tag Was Applied (boolean)
- `removed`: Removed (boolean)

### `start_workflow`

**Start Workflow for Subscriber.** Starts a contact (by email or subscriber ID) on an active Drip workflow by Workflow ID (from List Workflows), creating or updating the subscriber with any fields given; the workflow may then send emails or apply tags. Drip ignores the request when the workflow is not active. Not idempotent: each call can start the subscriber on the workflow again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `workflowId` | string | yes |  | Workflow ID. Workflow ID (digits, from List Workflows). The workflow must be active. |
| `subscriber` | string | yes |  | Subscriber Email or ID. Email address of the person to start, or the Drip subscriber ID of an existing one. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `address1` | string | no |  | Address Line 1. |
| `address2` | string | no |  | Address Line 2. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State / Region. |
| `zip` | string | no |  | Postal Code. |
| `country` | string | no |  | Country. |
| `phone` | string | no |  | Phone. |
| `userId` | string | no |  | Your User ID. Your own ID for this person, e.g. the primary key in your database. |
| `timeZone` | string | no |  | Time Zone. Olson time zone, e.g. America/Los_Angeles. |
| `customFields` | object | no |  | Custom Fields. Custom field values keyed by field identifier, e.g. {"shirt_size": "Medium"}. A new identifier creates the custom field in Drip. |
| `tags` | array | no |  | Tags. Tags to apply to the subscriber. |

Output fields:

- `workflowId`: Workflow ID
- `subscriber`: Subscriber
- `subscriber.id`: Subscriber ID
- `subscriber.email`: Email (email)
- `subscriber.status`: Status
- `subscriber.first_name`: First Name
- `subscriber.last_name`: Last Name
- `subscriber.tags`: Tags
- `subscriber.custom_fields`: Custom Fields (an object whose keys vary)
- `subscriber.deliverable`: Deliverable (boolean)
- `subscriber.address1`: Address Line 1
- `subscriber.address2`: Address Line 2
- `subscriber.city`: City
- `subscriber.state`: State
- `subscriber.zip`: Postal Code
- `subscriber.country`: Country
- `subscriber.phone`: Phone
- `subscriber.sms_number`: SMS Number
- `subscriber.time_zone`: Time Zone
- `subscriber.user_id`: Your User ID
- `subscriber.lifetime_value`: Lifetime Value (cents) (number)
- `subscriber.lead_score`: Lead Score (number)
- `subscriber.prospect`: Prospect (boolean)
- `subscriber.eu_consent`: EU Consent
- `subscriber.created_at`: Created At (datetime)

### `unsubscribe_subscriber`

**Unsubscribe From All Emails.** Unsubscribes a contact (by email or subscriber ID) from all Drip mailings and returns the updated subscriber with status unsubscribed. Use only when the user asks to opt someone out; re-subscribing them later needs their consent. Repeating it leaves them unsubscribed, so it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `subscriber` | string | yes |  | Subscriber Email or ID. The subscriber email address or Drip subscriber ID. |

Output fields:

- `id`: Subscriber ID
- `email`: Email (email)
- `status`: Status
- `first_name`: First Name
- `last_name`: Last Name
- `tags`: Tags
- `custom_fields`: Custom Fields (an object whose keys vary)
- `deliverable`: Deliverable (boolean)
- `address1`: Address Line 1
- `address2`: Address Line 2
- `city`: City
- `state`: State
- `zip`: Postal Code
- `country`: Country
- `phone`: Phone
- `sms_number`: SMS Number
- `time_zone`: Time Zone
- `user_id`: Your User ID
- `lifetime_value`: Lifetime Value (cents) (number)
- `lead_score`: Lead Score (number)
- `prospect`: Prospect (boolean)
- `eu_consent`: EU Consent
- `created_at`: Created At (datetime)

### `apply_tag`

**Apply Tag (by Account ID).** Applies a tag to a Drip subscriber identified by email address. If no subscriber has that email, Drip creates one (active) with the tag. Workflows or rules that start on this tag may run. Applying a tag the subscriber already has changes nothing, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `email` | string | yes |  | Email. The subscriber email address. |
| `tag` | string | yes |  | Tag. The tag to apply, e.g. Customer. |

Output fields:

- `email`: Email (email)
- `tag`: Tag
- `applied`: Applied (boolean)

### `create_or_update_subscriber`

**Create or Update Subscriber (by Account ID).** Creates a Drip subscriber or updates the one with this email (or Drip subscriber ID), setting name, address, phone, time zone, lifetime value and custom fields, adding tags and removing tags; New Email changes their address. Fields you leave out stay unchanged. Matched on email or ID, so repeating the same input is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `subscriber` | string | yes |  | Subscriber Email or ID. Email address of the subscriber to create or update, or the Drip subscriber ID of an existing one. |
| `newEmail` | string | no |  | New Email. Change the subscriber email address to this one. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `address1` | string | no |  | Address Line 1. |
| `address2` | string | no |  | Address Line 2. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State / Region. |
| `zip` | string | no |  | Postal Code. |
| `country` | string | no |  | Country. |
| `phone` | string | no |  | Phone. |
| `userId` | string | no |  | Your User ID. Your own ID for this person, e.g. the primary key in your database. |
| `timeZone` | string | no |  | Time Zone. Olson time zone, e.g. America/Los_Angeles. |
| `smsNumber` | string | no |  | SMS Number. Mobile number in E.164 format, e.g. +16125551212 (US numbers only). |
| `lifetimeValue` | number | no |  | Lifetime Value (cents). Total the customer has spent, in cents (e.g. 2500 = $25.00). |
| `customFields` | object | no |  | Custom Fields. Custom field values keyed by field identifier, e.g. {"shirt_size": "Medium"}. A new identifier creates the custom field in Drip. |
| `tags` | array | no |  | Add Tags. Tags to apply to the subscriber. |
| `removeTags` | array | no |  | Remove Tags. Tags to remove from the subscriber. |

Output fields:

- `id`: Subscriber ID
- `email`: Email (email)
- `status`: Status
- `first_name`: First Name
- `last_name`: Last Name
- `tags`: Tags
- `custom_fields`: Custom Fields (an object whose keys vary)
- `deliverable`: Deliverable (boolean)
- `address1`: Address Line 1
- `address2`: Address Line 2
- `city`: City
- `state`: State
- `zip`: Postal Code
- `country`: Country
- `phone`: Phone
- `sms_number`: SMS Number
- `time_zone`: Time Zone
- `user_id`: Your User ID
- `lifetime_value`: Lifetime Value (cents) (number)
- `lead_score`: Lead Score (number)
- `prospect`: Prospect (boolean)
- `eu_consent`: EU Consent
- `created_at`: Created At (datetime)

### `subscribe_to_campaign`

**Subscribe to Email Series (by Campaign ID).** Subscribes a contact by email to a Drip Email Series Campaign by Campaign ID (from List Email Series), creating the subscriber if needed; this starts sending that email sequence to them. The double opt-in confirmation email is skipped unless Double Opt-In is true. Not idempotent: a repeat call can restart the series for a subscriber who was removed from it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | no |  | Account ID. Drip account ID (digits, from List Accounts or the Drip URL). Leave empty when the API token has only one account. |
| `campaignId` | string | yes |  | Campaign ID. Email Series Campaign ID (digits, from List Email Series). |
| `email` | string | yes |  | Email. The subscriber email address. |
| `doubleOptin` | boolean | no | `false` | Double Opt-In. Send the double opt-in confirmation email first. Off by default. |
| `startingEmailIndex` | number | no |  | Starting Email Index. Zero-based index of the first email to send. Defaults to 0 (the first email). |
| `reactivateIfRemoved` | boolean | no | `true` | Reactivate if Removed. Re-subscribe the contact if they were removed from this series before. When off, Drip rejects such contacts. Drip defaults to on. |
| `timeZone` | string | no |  | Time Zone. The subscriber time zone in Olson format, e.g. America/Los_Angeles. |
| `tags` | array | no |  | Tags. Tags to apply to the subscriber. |
| `customFields` | object | no |  | Custom Fields. Custom field values keyed by field identifier, e.g. {"shirt_size": "Medium"}. A new identifier creates the custom field in Drip. |

Output fields:

- `campaignId`: Campaign ID
- `subscriber`: Subscriber
- `subscriber.id`: Subscriber ID
- `subscriber.email`: Email (email)
- `subscriber.status`: Status
- `subscriber.first_name`: First Name
- `subscriber.last_name`: Last Name
- `subscriber.tags`: Tags
- `subscriber.custom_fields`: Custom Fields (an object whose keys vary)
- `subscriber.deliverable`: Deliverable (boolean)
- `subscriber.address1`: Address Line 1
- `subscriber.address2`: Address Line 2
- `subscriber.city`: City
- `subscriber.state`: State
- `subscriber.zip`: Postal Code
- `subscriber.country`: Country
- `subscriber.phone`: Phone
- `subscriber.sms_number`: SMS Number
- `subscriber.time_zone`: Time Zone
- `subscriber.user_id`: Your User ID
- `subscriber.lifetime_value`: Lifetime Value (cents) (number)
- `subscriber.lead_score`: Lead Score (number)
- `subscriber.prospect`: Prospect (boolean)
- `subscriber.eu_consent`: EU Consent
- `subscriber.created_at`: Created At (datetime)

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

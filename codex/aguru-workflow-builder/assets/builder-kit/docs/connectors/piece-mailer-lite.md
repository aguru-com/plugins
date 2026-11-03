# MailerLite

Email marketing software

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mailer-lite'
  version: '0.9.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your API key, follow these steps:
>
> 1. Log in to your MailerLite account.
> 2. Visit the [API page](https://dashboard.mailerlite.com/integrations/api).
> 3. Click the **Generate new token** button.
> 4. Copy the generated API key.

## Actions

### `add_subscriber_to_group`

**Add Subscriber to a Group.** Assign an existing MailerLite subscriber to a group, given the subscriber ID and group ID. Use this to segment a contact you already have into a list/group. The subscriber must already exist. Idempotent — re-running for a subscriber already in the group leaves membership unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriberId` | string | yes |  | Subscriber ID. A value the product loads from the provider, such as an id; write the value itself. |
| `subscriberGroupId` | string | yes |  | Group ID. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `data`: Data
- `data.id`: Group ID
- `data.name`: Name
- `data.active_count`: Active Subscribers (number)
- `data.sent_count`: Emails Sent (number)
- `data.opens_count`: Opens Count (number)
- `data.open_rate`: Open Rate
- `data.open_rate.float`: Value (number)
- `data.open_rate.string`: Formatted
- `data.clicks_count`: Clicks Count (number)
- `data.click_rate`: Click Rate
- `data.click_rate.float`: Value (number)
- `data.click_rate.string`: Formatted
- `data.unsubscribed_count`: Unsubscribed (number)
- `data.unconfirmed_count`: Unconfirmed (number)
- `data.bounced_count`: Bounced (number)
- `data.junk_count`: Junk (number)
- `data.created_at`: Created At (datetime)

### `add_or_update_subscriber`

**Add or Update subscriber.** Upsert a MailerLite subscriber by email: creates the contact if the email is new, otherwise updates the existing record (status, custom fields, group membership, opt-in metadata). Use this to add or sync a contact when you only have their email. Idempotent — keyed on email, so repeating with the same input converges on the same subscriber state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Email of the new contact. |
| `subscriberFields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |
| `status` | string | no | `"active"` | Status. If empty, status Active is used by default. One of `"active"`, `"unsubscribed"`, `"unconfirmed"`, `"bounced"`, `"junk"`. |
| `subscriberGroupId` | array | no |  | Group IDs. Values the product loads from the provider, such as ids; write an array of them. |
| `subscribed_at` | ISO date-time string | no |  | Subscribed On. |
| `opted_in_at` | ISO date-time string | no |  | Opt-in Date. |
| `ip_address` | string | no |  | Signup IP address. |
| `optin_ip` | string | no |  | Opt-in IP address. |

Output fields:

- `data`: Data
- `data.id`: Subscriber ID
- `data.email`: Email (email)
- `data.status`: Status
- `data.source`: Source
- `data.sent`: Emails Sent (number)
- `data.opens_count`: Opens Count (number)
- `data.clicks_count`: Clicks Count (number)
- `data.open_rate`: Open Rate (number)
- `data.click_rate`: Click Rate (number)
- `data.ip_address`: IP Address
- `data.subscribed_at`: Subscribed At (datetime)
- `data.unsubscribed_at`: Unsubscribed At (datetime)
- `data.created_at`: Created At (datetime)
- `data.updated_at`: Updated At (datetime)
- `data.opted_in_at`: Opted In At (datetime)
- `data.optin_ip`: Opt-in IP
- `data.fields`: Fields (an object whose keys vary)
- `data.groups`: Group IDs

### `find_subscriber`

**Find a Subscriber.** Look up a single MailerLite subscriber by their email address or subscriber ID. Use this to resolve a contact to their record (status, fields, groups) before updating or segmenting them. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchValue` | string | yes |  | Subscriber ID or Email. |

Output fields:

- `data`: Data
- `data.id`: Subscriber ID
- `data.email`: Email (email)
- `data.status`: Status
- `data.source`: Source
- `data.sent`: Emails Sent (number)
- `data.opens_count`: Opens Count (number)
- `data.clicks_count`: Clicks Count (number)
- `data.open_rate`: Open Rate (number)
- `data.click_rate`: Click Rate (number)
- `data.ip_address`: IP Address
- `data.subscribed_at`: Subscribed At (datetime)
- `data.unsubscribed_at`: Unsubscribed At (datetime)
- `data.created_at`: Created At (datetime)
- `data.updated_at`: Updated At (datetime)
- `data.opted_in_at`: Opted In At (datetime)
- `data.optin_ip`: Opt-in IP
- `data.fields`: Fields (an object whose keys vary)
- `data.groups`: Group IDs

### `remove_subscriber_from_group`

**Remove Subscriber from a Group.** Unassign a MailerLite subscriber from a group, given the subscriber ID and group ID. Use this to remove a contact from a specific list/group without deleting the subscriber. Idempotent: removing a subscriber who is no longer in the group succeeds and leaves membership unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriberId` | string | yes |  | Subscriber ID. A value the product loads from the provider, such as an id; write the value itself. |
| `subscriberGroupId` | string | yes |  | Group ID. A value the product loads from the provider, such as an id; write the value itself. |

### `list_subscribers`

**List Subscribers.** List MailerLite subscribers, optionally filtered by status (active, unsubscribed, unconfirmed, bounced, junk). Use this to enumerate contacts for reporting or bulk processing. Returns a page of subscriber records with cursor pagination: pass meta.next_cursor back as cursor to get the next page. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no |  | Status. Only return subscribers with this status. One of `"active"`, `"unsubscribed"`, `"unconfirmed"`, `"bounced"`, `"junk"`. |
| `limit` | number | no | `25` | Limit. Subscribers to return (1-1000, default 25). |
| `cursor` | string | no |  | Cursor. The meta.next_cursor value from the previous page. Leave empty for the first page. |

Output fields:

- `data`: Subscribers
- `data[].id`: Subscriber ID
- `data[].email`: Email (email)
- `data[].status`: Status
- `data[].source`: Source
- `data[].sent`: Emails Sent (number)
- `data[].opens_count`: Opens Count (number)
- `data[].clicks_count`: Clicks Count (number)
- `data[].open_rate`: Open Rate (number)
- `data[].click_rate`: Click Rate (number)
- `data[].ip_address`: IP Address
- `data[].subscribed_at`: Subscribed At (datetime)
- `data[].unsubscribed_at`: Unsubscribed At (datetime)
- `data[].created_at`: Created At (datetime)
- `data[].updated_at`: Updated At (datetime)
- `data[].opted_in_at`: Opted In At (datetime)
- `data[].optin_ip`: Opt-in IP
- `data[].fields`: Fields (an object whose keys vary)
- `links`: Links
- `links.first`: First Page URL (url)
- `links.last`: Last Page URL (url)
- `links.prev`: Previous Page URL (url)
- `links.next`: Next Page URL (url)
- `meta`: Meta
- `meta.path`: Request Path (url)
- `meta.per_page`: Per Page (number)
- `meta.next_cursor`: Next Cursor
- `meta.prev_cursor`: Previous Cursor

### `unsubscribe_subscriber`

**Unsubscribe Subscriber.** Mark a MailerLite subscriber as unsubscribed by email address, so they stop receiving campaigns while their record and history are retained. Use this for opt-out handling; use Delete Subscriber only when the record itself must go. Idempotent: unsubscribing an already-unsubscribed contact leaves them unchanged. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Email address of the subscriber to unsubscribe. |

Output fields:

- `data`: Data
- `data.id`: Subscriber ID
- `data.email`: Email (email)
- `data.status`: Status
- `data.source`: Source
- `data.sent`: Emails Sent (number)
- `data.opens_count`: Opens Count (number)
- `data.clicks_count`: Clicks Count (number)
- `data.open_rate`: Open Rate (number)
- `data.click_rate`: Click Rate (number)
- `data.ip_address`: IP Address
- `data.subscribed_at`: Subscribed At (datetime)
- `data.unsubscribed_at`: Unsubscribed At (datetime)
- `data.created_at`: Created At (datetime)
- `data.updated_at`: Updated At (datetime)
- `data.opted_in_at`: Opted In At (datetime)
- `data.optin_ip`: Opt-in IP
- `data.fields`: Fields (an object whose keys vary)
- `data.groups`: Group IDs
- `data.unsubscribe_reason`: Unsubscribe Reason

### `delete_subscriber`

**Delete Subscriber.** Delete a MailerLite subscriber by ID. MailerLite keeps their data in case they re-subscribe; use forget_subscriber to permanently erase it (GDPR), or unsubscribe_subscriber for an ordinary opt-out. Not idempotent: a repeat call on a deleted subscriber returns a 404 error. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriberId` | string | yes |  | Subscriber ID. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `deleted`: Deleted (boolean)
- `subscriberId`: Subscriber ID

### `list_groups`

**List Groups.** Lists MailerLite groups with their subscriber counts and engagement stats. Use this to discover which groups exist before assigning a subscriber, or to report on list sizes. Returns one page at a time: read `meta.last_page` and `meta.total` from the response and call again with an increased Page to walk an account that has more groups than the chosen Limit. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `100` | Limit. Groups to return per page (1-1000, default 100). |
| `page` | number | no | `1` | Page. Page number to return, starting at 1. Use `meta.last_page` from a previous response to know when to stop. |

Output fields:

- `data`: Groups
- `data[].id`: Group ID
- `data[].name`: Name
- `data[].active_count`: Active Subscribers (number)
- `data[].sent_count`: Emails Sent (number)
- `data[].opens_count`: Opens Count (number)
- `data[].open_rate`: Open Rate
- `data[].open_rate.float`: Value (number)
- `data[].open_rate.string`: Formatted
- `data[].clicks_count`: Clicks Count (number)
- `data[].click_rate`: Click Rate
- `data[].click_rate.float`: Value (number)
- `data[].click_rate.string`: Formatted
- `data[].unsubscribed_count`: Unsubscribed (number)
- `data[].unconfirmed_count`: Unconfirmed (number)
- `data[].bounced_count`: Bounced (number)
- `data[].junk_count`: Junk (number)
- `data[].created_at`: Created At (datetime)
- `links`: Links
- `links.first`: First Page URL (url)
- `links.last`: Last Page URL (url)
- `links.prev`: Previous Page URL (url)
- `links.next`: Next Page URL (url)
- `meta`: Meta
- `meta.current_page`: Current Page (number)
- `meta.from`: From (number)
- `meta.to`: To (number)
- `meta.last_page`: Last Page (number)
- `meta.per_page`: Per Page (number)
- `meta.total`: Total (number)
- `meta.path`: Request Path (url)
- `meta.links`: Page Links
- `meta.links[].url`: URL (url)
- `meta.links[].label`: Label
- `meta.links[].page`: Page (number)
- `meta.links[].active`: Active (boolean)

### `create_group`

**Create Group.** Create a new MailerLite group by name. Use this when a flow needs a segment that does not exist yet, before assigning subscribers to it. Not idempotent: calling twice with the same name creates two groups, since MailerLite does not enforce unique group names. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Group Name. |

Output fields:

- `data`: Data
- `data.id`: Group ID
- `data.name`: Name
- `data.active_count`: Active Subscribers (number)
- `data.sent_count`: Emails Sent (number)
- `data.opens_count`: Opens Count (number)
- `data.open_rate`: Open Rate
- `data.open_rate.float`: Value (number)
- `data.open_rate.string`: Formatted
- `data.clicks_count`: Clicks Count (number)
- `data.click_rate`: Click Rate
- `data.click_rate.float`: Value (number)
- `data.click_rate.string`: Formatted
- `data.unsubscribed_count`: Unsubscribed (number)
- `data.unconfirmed_count`: Unconfirmed (number)
- `data.bounced_count`: Bounced (number)
- `data.junk_count`: Junk (number)
- `data.created_at`: Created At (datetime)

### `list_group_subscribers`

**List Group Subscribers.** List the subscribers that belong to a specific MailerLite group, given the group ID. By default MailerLite returns active subscribers only; set status to list unsubscribed, unconfirmed, bounced or junk members instead. Cursor-paginated: pass meta.next_cursor back as cursor to get the next page. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriberGroupId` | string | yes |  | Group ID. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Status. Only return subscribers with this status. MailerLite defaults to active. One of `"active"`, `"unsubscribed"`, `"unconfirmed"`, `"bounced"`, `"junk"`. |
| `limit` | number | no | `25` | Limit. Subscribers to return (1-1000, default 25). |
| `cursor` | string | no |  | Cursor. The meta.next_cursor value from the previous page. Leave empty for the first page. |

Output fields:

- `data`: Subscribers
- `data[].id`: Subscriber ID
- `data[].email`: Email (email)
- `data[].status`: Status
- `data[].source`: Source
- `data[].sent`: Emails Sent (number)
- `data[].opens_count`: Opens Count (number)
- `data[].clicks_count`: Clicks Count (number)
- `data[].open_rate`: Open Rate (number)
- `data[].click_rate`: Click Rate (number)
- `data[].ip_address`: IP Address
- `data[].subscribed_at`: Subscribed At (datetime)
- `data[].unsubscribed_at`: Unsubscribed At (datetime)
- `data[].created_at`: Created At (datetime)
- `data[].updated_at`: Updated At (datetime)
- `data[].opted_in_at`: Opted In At (datetime)
- `data[].optin_ip`: Opt-in IP
- `data[].fields`: Fields (an object whose keys vary)
- `links`: Links
- `links.first`: First Page URL (url)
- `links.last`: Last Page URL (url)
- `links.prev`: Previous Page URL (url)
- `links.next`: Next Page URL (url)
- `meta`: Meta
- `meta.path`: Request Path (url)
- `meta.per_page`: Per Page (number)
- `meta.next_cursor`: Next Cursor
- `meta.prev_cursor`: Previous Cursor

### `update_subscriber`

**Update Subscriber.** Update an existing MailerLite subscriber by ID, sending only the values you supply: custom or default field values (fields object keyed by field key from list_fields), status, dates and IPs. Group membership is never changed here; use add_subscriber_to_group or remove_subscriber_from_group. The API cannot reactivate unsubscribed, bounced or junk subscribers. Get the ID from find_subscriber. At least one value is required. Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriber_id` | string | yes |  | Subscriber ID. The subscriber ID, from find_subscriber or list_subscribers. |
| `fields` | object | no |  | Fields. Field values to set, keyed by field key (e.g. name, last_name, or a custom field key from list_fields). Fields not listed are left alone. |
| `status` | string | no |  | Status. New subscriber status. Unsubscribed, bounced and junk subscribers cannot be reactivated through the API. One of `"active"`, `"unsubscribed"`, `"unconfirmed"`, `"bounced"`, `"junk"`. |
| `subscribed_at` | ISO date-time string | no |  | Subscribed At. When the subscriber subscribed. |
| `opted_in_at` | ISO date-time string | no |  | Opted In At. When the subscriber confirmed the opt-in. |
| `unsubscribed_at` | ISO date-time string | no |  | Unsubscribed At. When the subscriber unsubscribed. |
| `ip_address` | string | no |  | IP Address. The IP address the subscriber signed up from. |
| `optin_ip` | string | no |  | Opt-in IP. The IP address the subscriber confirmed the opt-in from. |

Output fields:

- `id`: Subscriber ID
- `email`: Email (email)
- `status`: Status
- `source`: Source
- `sent`: Emails Sent (number)
- `opens_count`: Opens Count (number)
- `clicks_count`: Clicks Count (number)
- `open_rate`: Open Rate (number)
- `click_rate`: Click Rate (number)
- `ip_address`: IP Address
- `subscribed_at`: Subscribed At (datetime)
- `unsubscribed_at`: Unsubscribed At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `opted_in_at`: Opted In At (datetime)
- `optin_ip`: Opt-in IP
- `fields`: Fields (an object whose keys vary)
- `location`: Location
- `groups`: Groups
- `groups[].id`: Group ID
- `groups[].name`: Name
- `groups[].active_count`: Active Subscribers (number)
- `groups[].sent_count`: Emails Sent (number)
- `groups[].opens_count`: Opens Count (number)
- `groups[].open_rate`: Open Rate
- `groups[].open_rate.float`: Value (number)
- `groups[].open_rate.string`: Formatted
- `groups[].clicks_count`: Clicks Count (number)
- `groups[].click_rate`: Click Rate
- `groups[].click_rate.float`: Value (number)
- `groups[].click_rate.string`: Formatted
- `groups[].unsubscribed_count`: Unsubscribed (number)
- `groups[].unconfirmed_count`: Unconfirmed (number)
- `groups[].bounced_count`: Bounced (number)
- `groups[].junk_count`: Junk (number)
- `groups[].created_at`: Created At (datetime)

### `forget_subscriber`

**Forget Subscriber (GDPR).** Remove a MailerLite subscriber and permanently erase all of their data within 30 days (GDPR right to be forgotten). This cannot be undone. Lighter options: delete_subscriber removes the subscriber but keeps their data in case they re-subscribe, and unsubscribe_subscriber only opts them out. Get the ID from find_subscriber. Returns the subscriber with forget_at set. Not idempotent: a repeat call on a forgotten subscriber returns an error. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriber_id` | string | yes |  | Subscriber ID. The subscriber ID, from find_subscriber or list_subscribers. |

Output fields:

- `id`: Subscriber ID
- `email`: Email (email)
- `status`: Status
- `source`: Source
- `sent`: Emails Sent (number)
- `opens_count`: Opens Count (number)
- `clicks_count`: Clicks Count (number)
- `open_rate`: Open Rate (number)
- `click_rate`: Click Rate (number)
- `ip_address`: IP Address
- `subscribed_at`: Subscribed At (datetime)
- `unsubscribed_at`: Unsubscribed At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `opted_in_at`: Opted In At (datetime)
- `optin_ip`: Opt-in IP
- `fields`: Fields (an object whose keys vary)
- `deleted_at`: Deleted At (datetime)
- `forget_at`: Forget At (datetime)
- `location`: Location
- `groups`: Group IDs

### `get_subscriber_activity`

**Get Subscriber Activity.** List the activity log of a MailerLite subscriber (campaign sends, opens, clicks, bounces, unsubscribes and more), given the subscriber ID from find_subscriber. Optionally filter by one log type. Page-paginated. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriber_id` | string | yes |  | Subscriber ID. The subscriber ID, from find_subscriber or list_subscribers. |
| `log_name` | string | no |  | Activity Type. Only return this type of activity. One of `"campaign_send"`, `"automation_email_sent"`, `"email_open"`, `"link_click"`, `"email_bounce"`, `"spam_complaint"`, `"unsubscribed"`, `"email_forward"`, `"marketing_preferences_change"`, `"preference_center"`. |
| `limit` | number | no | `100` | Limit. Items to return (1-100, default 100). |
| `page` | number | no |  | Page. Page number to return, starting at 1. |

Output fields:

- `data`: Activity
- `data[].id`: Activity ID
- `data[].log_name`: Activity Type
- `data[].subject_id`: Subject ID
- `data[].subject_type`: Subject Type
- `data[].properties`: Properties
- `data[].properties.group_id`: Group ID
- `data[].properties.group_name`: Group Name
- `data[].created_at`: Created At (datetime)
- `data[].updated_at`: Updated At (datetime)

### `count_subscribers`

**Count Subscribers.** Get the total number of subscribers in the MailerLite account without listing them. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `total`: Total Subscribers (number)

### `import_subscribers_to_group`

**Import Subscribers to Group.** Start a bulk import of subscribers into a MailerLite group. subscribers is a JSON array of objects, each with an email and an optional fields object. Existing subscribers are updated and added to the group. The import runs in the background and this action does not wait: it returns an import_id to pass to get_import_status to check progress. Limited to 5 imports per minute. Not idempotent: each call starts a new import. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_id` | string | yes |  | Group ID. The group ID, from list_groups or find_groups_by_name. |
| `subscribers` | JSON | yes |  | Subscribers. JSON array of subscribers, e.g. [{"email": "a@example.com", "fields": {"name": "Ann"}}]. |

Output fields:

- `import_id`: Import ID
- `import_progress_url`: Import Progress URL (url)

### `get_import_status`

**Get Import Status.** Check the progress of a subscriber import started by import_subscribers_to_group, given its import_id. Makes one read and does not wait: if done is false, call it again later. When done, the report counts imported, updated and errored rows. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `import_id` | string | yes |  | Import ID. The import ID returned by import_subscribers_to_group. |

Output fields:

- `id`: Id
- `account_id`: Account Id
- `total`: Total
- `processed`: Processed
- `imported`: Imported
- `updated`: Updated
- `errored`: Errored
- `percent`: Percent
- `done`: Done
- `invalid`: Invalid
- `invalid_count`: Invalid Count
- `mistyped`: Mistyped
- `mistyped_count`: Mistyped Count
- `changed`: Changed
- `changed_count`: Changed Count
- `unchanged`: Unchanged
- `unchanged_count`: Unchanged Count
- `unsubscribed`: Unsubscribed
- `unsubscribed_count`: Unsubscribed Count
- `role_based`: Role Based
- `role_based_count`: Role Based Count
- `suspicious_format`: Suspicious Format
- `suspicious_format_count`: Suspicious Format Count
- `duplicate`: Duplicate
- `duplicate_count`: Duplicate Count
- `subscriber_limit`: Subscriber Limit
- `subscriber_limit_count`: Subscriber Limit Count
- `banned_import_emails_count`: Banned Import Emails Count
- `updated_at`: Updated At
- `undone_at`: Undone At
- `is_stopped_due_to_free_account_limit_exceeded`: Is Stopped Due To Free Account Limit Exceeded
- `stopped_at`: Stopped At
- `undo_started_at`: Undo Started At
- `finished_at`: Finished At

### `find_groups_by_name`

**Find Groups by Name.** Search MailerLite groups by name (partial, case-insensitive match) and return the matching groups with their IDs and subscriber counts. Use it to resolve a group name to the group ID other actions need. Page-paginated: use meta.last_page and pass page to get more. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name Contains. Text the group name must contain. |
| `sort` | string | no |  | Sort. Sort order; a minus prefix means descending. One of `"name"`, `"-name"`, `"total"`, `"-total"`, `"open_rate"`, `"-open_rate"`, `"click_rate"`, `"-click_rate"`, `"created_at"`, `"-created_at"`. |
| `limit` | number | no | `25` | Limit. Items to return (1-1000, default 25). |
| `page` | number | no |  | Page. Page number to return, starting at 1. |

Output fields:

- `data`: Groups
- `data[].id`: Group ID
- `data[].name`: Name
- `data[].active_count`: Active Subscribers (number)
- `data[].sent_count`: Emails Sent (number)
- `data[].opens_count`: Opens Count (number)
- `data[].open_rate`: Open Rate
- `data[].open_rate.float`: Value (number)
- `data[].open_rate.string`: Formatted
- `data[].clicks_count`: Clicks Count (number)
- `data[].click_rate`: Click Rate
- `data[].click_rate.float`: Value (number)
- `data[].click_rate.string`: Formatted
- `data[].unsubscribed_count`: Unsubscribed (number)
- `data[].unconfirmed_count`: Unconfirmed (number)
- `data[].bounced_count`: Bounced (number)
- `data[].junk_count`: Junk (number)
- `data[].created_at`: Created At (datetime)
- `links`: Links
- `links.first`: First Page URL (url)
- `links.last`: Last Page URL (url)
- `links.prev`: Previous Page URL (url)
- `links.next`: Next Page URL (url)
- `meta`: Meta
- `meta.current_page`: Current Page (number)
- `meta.from`: From (number)
- `meta.to`: To (number)
- `meta.last_page`: Last Page (number)
- `meta.per_page`: Per Page (number)
- `meta.total`: Total (number)
- `meta.path`: Request Path (url)
- `meta.links`: Page Links
- `meta.links[].url`: URL (url)
- `meta.links[].label`: Label
- `meta.links[].page`: Page (number)
- `meta.links[].active`: Active (boolean)

### `rename_group`

**Rename Group.** Rename a MailerLite group by ID. Only the name changes; members are untouched. Get the ID from list_groups or find_groups_by_name. Idempotent: the same name twice leaves the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_id` | string | yes |  | Group ID. The group ID, from list_groups or find_groups_by_name. |
| `name` | string | yes |  | Name. The new group name (max 255 characters). |

Output fields:

- `id`: Group ID
- `name`: Name
- `active_count`: Active Subscribers (number)
- `sent_count`: Emails Sent (number)
- `opens_count`: Opens Count (number)
- `open_rate`: Open Rate
- `open_rate.float`: Value (number)
- `open_rate.string`: Formatted
- `clicks_count`: Clicks Count (number)
- `click_rate`: Click Rate
- `click_rate.float`: Value (number)
- `click_rate.string`: Formatted
- `unsubscribed_count`: Unsubscribed (number)
- `unconfirmed_count`: Unconfirmed (number)
- `bounced_count`: Bounced (number)
- `junk_count`: Junk (number)
- `created_at`: Created At (datetime)

### `delete_group`

**Delete Group.** Permanently delete a MailerLite group by ID. The group membership is removed but the subscribers themselves are kept. Cannot be undone. Get the ID from list_groups or find_groups_by_name. Not idempotent: deleting an already-deleted group returns a 404 error. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `group_id` | string | yes |  | Group ID. The group ID, from list_groups or find_groups_by_name. |

Output fields:

- `deleted`: Deleted (boolean)
- `group_id`: Group ID

### `list_segments`

**List Segments.** List MailerLite segments (saved subscriber filters created in the dashboard) with their IDs and subscriber totals. Segments cannot be created through the API. Page-paginated: pass page for more. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `50` | Limit. Items to return (1-250, default 50). |
| `page` | number | no |  | Page. Page number to return, starting at 1. |

Output fields:

- `data`: Segments
- `data[].id`: Segment ID
- `data[].name`: Name
- `data[].total`: Total Subscribers (number)
- `data[].automations_using_segment_count`: Automations Using Segment (number)
- `data[].open_rate`: Open Rate
- `data[].open_rate.float`: Value (number)
- `data[].open_rate.string`: Formatted
- `data[].click_rate`: Click Rate
- `data[].click_rate.float`: Value (number)
- `data[].click_rate.string`: Formatted
- `data[].created_at`: Created At (datetime)
- `links`: Links
- `links.first`: First Page URL (url)
- `links.last`: Last Page URL (url)
- `links.prev`: Previous Page URL (url)
- `links.next`: Next Page URL (url)
- `meta`: Meta
- `meta.current_page`: Current Page (number)
- `meta.from`: From (number)
- `meta.to`: To (number)
- `meta.last_page`: Last Page (number)
- `meta.per_page`: Per Page (number)
- `meta.total`: Total (number)
- `meta.path`: Request Path (url)
- `meta.links`: Page Links
- `meta.links[].url`: URL (url)
- `meta.links[].label`: Label
- `meta.links[].page`: Page (number)
- `meta.links[].active`: Active (boolean)

### `list_segment_subscribers`

**List Segment Subscribers.** List the subscribers that match a MailerLite segment, given the segment ID from list_segments. By default MailerLite returns active subscribers only; set status to list unsubscribed, unconfirmed, bounced or junk ones instead. Cursor-paginated: pass meta.next_cursor back as cursor to get the next page. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `segment_id` | string | yes |  | Segment ID. The segment ID, from list_segments. |
| `status` | string | no |  | Status. Only return subscribers with this status. MailerLite defaults to active. One of `"active"`, `"unsubscribed"`, `"unconfirmed"`, `"bounced"`, `"junk"`. |
| `limit` | number | no | `50` | Limit. Items to return (1-1000, default 50). |
| `cursor` | string | no |  | Cursor. The meta.next_cursor value from the previous page. Leave empty for the first page. |

Output fields:

- `data`: Subscribers
- `data[].id`: Subscriber ID
- `data[].email`: Email (email)
- `data[].status`: Status
- `data[].source`: Source
- `data[].sent`: Emails Sent (number)
- `data[].opens_count`: Opens Count (number)
- `data[].clicks_count`: Clicks Count (number)
- `data[].open_rate`: Open Rate (number)
- `data[].click_rate`: Click Rate (number)
- `data[].ip_address`: IP Address
- `data[].subscribed_at`: Subscribed At (datetime)
- `data[].unsubscribed_at`: Unsubscribed At (datetime)
- `data[].created_at`: Created At (datetime)
- `data[].updated_at`: Updated At (datetime)
- `data[].opted_in_at`: Opted In At (datetime)
- `data[].optin_ip`: Opt-in IP
- `data[].fields`: Fields (an object whose keys vary)
- `data[].groups`: Groups
- `links`: Links
- `links.first`: First Page URL (url)
- `links.last`: Last Page URL (url)
- `links.prev`: Previous Page URL (url)
- `links.next`: Next Page URL (url)
- `meta`: Meta
- `meta.path`: Request Path (url)
- `meta.per_page`: Per Page (number)
- `meta.next_cursor`: Next Cursor
- `meta.prev_cursor`: Previous Cursor

### `rename_segment`

**Rename Segment.** Rename a MailerLite segment by ID. Only the name changes; the segment rules are untouched. Get the ID from list_segments. Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `segment_id` | string | yes |  | Segment ID. The segment ID, from list_segments. |
| `name` | string | yes |  | Name. The new segment name (max 255 characters). |

Output fields:

- `id`: Segment ID
- `name`: Name
- `total`: Total Subscribers (number)
- `open_rate`: Open Rate
- `open_rate.float`: Value (number)
- `open_rate.string`: Formatted
- `click_rate`: Click Rate
- `click_rate.float`: Value (number)
- `click_rate.string`: Formatted
- `created_at`: Created At (datetime)

### `delete_segment`

**Delete Segment.** Permanently delete a MailerLite segment by ID. Only the segment definition is removed; the subscribers it matched are kept. Cannot be undone, and segments cannot be recreated through the API. Get the ID from list_segments. Not idempotent: a repeat call returns a 404 error. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `segment_id` | string | yes |  | Segment ID. The segment ID, from list_segments. |

Output fields:

- `deleted`: Deleted (boolean)
- `segment_id`: Segment ID

### `list_fields`

**List Fields.** List MailerLite subscriber fields (default and custom) with their IDs, keys and types. The key is what goes into a subscriber's fields object. Optionally filter by keyword or type. Page-paginated. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `keyword` | string | no |  | Keyword. Only return fields whose name contains this text. |
| `type` | string | no |  | Type. Only return fields of this type. One of `"text"`, `"number"`, `"date"`. |
| `limit` | number | no | `100` | Limit. Items to return (1-100, default 100). |
| `page` | number | no |  | Page. Page number to return, starting at 1. |

Output fields:

- `data`: Fields
- `data[].id`: Field ID
- `data[].name`: Name
- `data[].key`: Key
- `data[].type`: Type
- `data[].is_default`: Default Field (boolean)
- `data[].used_in_automations`: Used In Automations (boolean)
- `links`: Links
- `links.first`: First Page URL (url)
- `links.last`: Last Page URL (url)
- `links.prev`: Previous Page URL (url)
- `links.next`: Next Page URL (url)
- `meta`: Meta
- `meta.current_page`: Current Page (number)
- `meta.from`: From (number)
- `meta.to`: To (number)
- `meta.last_page`: Last Page (number)
- `meta.per_page`: Per Page (number)
- `meta.total`: Total (number)
- `meta.path`: Request Path (url)
- `meta.links`: Page Links
- `meta.links[].url`: URL (url)
- `meta.links[].label`: Label
- `meta.links[].page`: Page (number)
- `meta.links[].active`: Active (boolean)

### `create_field`

**Create Field.** Create a MailerLite custom subscriber field with a name and type (text, number or date). The type cannot be changed later. Returns the field with its key, which is what goes into a subscriber's fields object. Check list_fields first: not idempotent, and a duplicate name returns a validation error. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The field name. |
| `type` | string | yes |  | Type. The field type. It cannot be changed later. One of `"text"`, `"number"`, `"date"`. |

Output fields:

- `id`: Field ID
- `name`: Name
- `key`: Key
- `type`: Type
- `is_default`: Default Field (boolean)

### `rename_field`

**Rename Field.** Rename a MailerLite custom field by ID. The field type cannot be changed and subscriber values are kept. Get the ID from list_fields. Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `field_id` | string | yes |  | Field ID. The custom field ID, from list_fields. |
| `name` | string | yes |  | Name. The new field name. |

Output fields:

- `id`: Field ID
- `name`: Name
- `key`: Key
- `type`: Type
- `is_default`: Default Field (boolean)

### `delete_field`

**Delete Field.** Permanently delete a MailerLite custom field by ID. This also removes that field's value from every subscriber. Cannot be undone. Get the ID from list_fields. Not idempotent: a repeat call returns a 404 error. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `field_id` | string | yes |  | Field ID. The custom field ID, from list_fields. |

Output fields:

- `deleted`: Deleted (boolean)
- `field_id`: Field ID

### `list_automations`

**List Automations.** List MailerLite automations with their IDs, enabled state and stats. Optionally filter by enabled state, name, or a group ID from list_groups. Page-paginated. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `enabled` | string | no |  | Enabled. Only return enabled or disabled automations. One of `"true"`, `"false"`. |
| `name` | string | no |  | Name Contains. Only return automations whose name contains this text. |
| `group_id` | string | no |  | Group ID. Only return automations that use this group, from list_groups. |
| `limit` | number | no | `10` | Limit. Items to return (1-100, default 10). |
| `page` | number | no |  | Page. Page number to return, starting at 1. |

Output fields:

- `data`: Automations
- `data[].id`: Automation ID
- `data[].name`: Name
- `data[].enabled`: Enabled (boolean)
- `data[].trigger_data`: Trigger Data
- `data[].trigger_data.track_ecommerce`: Track Ecommerce
- `data[].trigger_data.broken_workflow`: Broken Workflow
- `data[].trigger_data.complete_workflow`: Complete Workflow
- `data[].steps`: Steps
- `data[].triggers`: Triggers
- `data[].complete`: Complete (boolean)
- `data[].broken`: Broken (boolean)
- `data[].warnings`: Warnings
- `data[].emails_count`: Emails Count (number)
- `data[].first_email_screenshot_url`: First Email Screenshot URL (url)
- `data[].stats`: Stats
- `data[].stats.completed_subscribers_count`: Completed Subscribers Count
- `data[].stats.subscribers_in_queue_count`: Subscribers In Queue Count
- `data[].stats.sent`: Sent
- `data[].stats.opens_count`: Opens Count
- `data[].stats.unique_opens_count`: Unique Opens Count
- `data[].stats.clicks_count`: Clicks Count
- `data[].stats.unique_clicks_count`: Unique Clicks Count
- `data[].stats.unsubscribes_count`: Unsubscribes Count
- `data[].stats.spam_count`: Spam Count
- `data[].stats.hard_bounces_count`: Hard Bounces Count
- `data[].stats.soft_bounces_count`: Soft Bounces Count
- `data[].stats.social_interactions_count`: Social Interactions Count
- `data[].stats.bounce_rate`: Bounce Rate
- `data[].stats.bounce_rate.float`: Value (number)
- `data[].stats.bounce_rate.string`: Formatted
- `data[].stats.click_to_open_rate`: Click To Open Rate
- `data[].stats.click_to_open_rate.float`: Value (number)
- `data[].stats.click_to_open_rate.string`: Formatted
- `data[].stats.open_rate`: Open Rate
- `data[].stats.open_rate.float`: Value (number)
- `data[].stats.open_rate.string`: Formatted
- `data[].stats.click_rate`: Click Rate
- `data[].stats.click_rate.float`: Value (number)
- `data[].stats.click_rate.string`: Formatted
- `data[].stats.unsubscribe_rate`: Unsubscribe Rate
- `data[].stats.unsubscribe_rate.float`: Value (number)
- `data[].stats.unsubscribe_rate.string`: Formatted
- `data[].stats.spam_rate`: Spam Rate
- `data[].stats.spam_rate.float`: Value (number)
- `data[].stats.spam_rate.string`: Formatted
- `data[].stats.hard_bounce_rate`: Hard Bounce Rate
- `data[].stats.hard_bounce_rate.float`: Value (number)
- `data[].stats.hard_bounce_rate.string`: Formatted
- `data[].stats.soft_bounce_rate`: Soft Bounce Rate
- `data[].stats.soft_bounce_rate.float`: Value (number)
- `data[].stats.soft_bounce_rate.string`: Formatted
- `data[].stats.forward_rate`: Forward Rate
- `data[].stats.forward_rate.float`: Value (number)
- `data[].stats.forward_rate.string`: Formatted
- `data[].stats.social_interaction_rate`: Social Interaction Rate
- `data[].stats.social_interaction_rate.float`: Value (number)
- `data[].stats.social_interaction_rate.string`: Formatted
- `data[].created_at`: Created At (datetime)
- `data[].has_banned_content`: Has Banned Content (boolean)
- `data[].building_in_progress`: Building In Progress (boolean)
- `data[].automation_template_id`: Template ID
- `data[].automation_template_name`: Template Name
- `data[].classic_sync_in_progress`: Classic Sync In Progress (boolean)
- `data[].classic_sync_activate_after`: Classic Sync Activate After
- `links`: Links
- `links.first`: First Page URL (url)
- `links.last`: Last Page URL (url)
- `links.prev`: Previous Page URL (url)
- `links.next`: Next Page URL (url)
- `meta`: Meta
- `meta.current_page`: Current Page (number)
- `meta.from`: From (number)
- `meta.to`: To (number)
- `meta.last_page`: Last Page (number)
- `meta.per_page`: Per Page (number)
- `meta.total`: Total (number)
- `meta.path`: Request Path (url)
- `meta.links`: Page Links
- `meta.links[].url`: URL (url)
- `meta.links[].label`: Label
- `meta.links[].page`: Page (number)
- `meta.links[].active`: Active (boolean)
- `meta.aggregations`: Aggregations
- `meta.aggregations.workflows`: Workflows
- `meta.aggregations.drafts`: Drafts
- `meta.aggregations.unsync`: Unsync
- `meta.aggregations.all`: All

### `get_automation`

**Get Automation.** Get one MailerLite automation by ID, including its enabled state, trigger configuration, steps and stats. Get the ID from list_automations. Read-only; returns a 404 error if the ID does not exist. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `automation_id` | string | yes |  | Automation ID. The automation ID, from list_automations. |

Output fields:

- `id`: Automation ID
- `name`: Name
- `enabled`: Enabled (boolean)
- `trigger_data`: Trigger Data
- `trigger_data.track_ecommerce`: Track Ecommerce
- `trigger_data.broken_workflow`: Broken Workflow
- `trigger_data.complete_workflow`: Complete Workflow
- `steps`: Steps
- `triggers`: Triggers
- `complete`: Complete (boolean)
- `broken`: Broken (boolean)
- `warnings`: Warnings
- `emails_count`: Emails Count (number)
- `stats`: Stats
- `stats.completed_subscribers_count`: Completed Subscribers Count
- `stats.subscribers_in_queue_count`: Subscribers In Queue Count
- `stats.sent`: Sent
- `stats.opens_count`: Opens Count
- `stats.unique_opens_count`: Unique Opens Count
- `stats.clicks_count`: Clicks Count
- `stats.unique_clicks_count`: Unique Clicks Count
- `stats.unsubscribes_count`: Unsubscribes Count
- `stats.spam_count`: Spam Count
- `stats.hard_bounces_count`: Hard Bounces Count
- `stats.soft_bounces_count`: Soft Bounces Count
- `stats.social_interactions_count`: Social Interactions Count
- `stats.bounce_rate`: Bounce Rate
- `stats.bounce_rate.float`: Value (number)
- `stats.bounce_rate.string`: Formatted
- `stats.click_to_open_rate`: Click To Open Rate
- `stats.click_to_open_rate.float`: Value (number)
- `stats.click_to_open_rate.string`: Formatted
- `stats.open_rate`: Open Rate
- `stats.open_rate.float`: Value (number)
- `stats.open_rate.string`: Formatted
- `stats.click_rate`: Click Rate
- `stats.click_rate.float`: Value (number)
- `stats.click_rate.string`: Formatted
- `stats.unsubscribe_rate`: Unsubscribe Rate
- `stats.unsubscribe_rate.float`: Value (number)
- `stats.unsubscribe_rate.string`: Formatted
- `stats.spam_rate`: Spam Rate
- `stats.spam_rate.float`: Value (number)
- `stats.spam_rate.string`: Formatted
- `stats.hard_bounce_rate`: Hard Bounce Rate
- `stats.hard_bounce_rate.float`: Value (number)
- `stats.hard_bounce_rate.string`: Formatted
- `stats.soft_bounce_rate`: Soft Bounce Rate
- `stats.soft_bounce_rate.float`: Value (number)
- `stats.soft_bounce_rate.string`: Formatted
- `stats.forward_rate`: Forward Rate
- `stats.forward_rate.float`: Value (number)
- `stats.forward_rate.string`: Formatted
- `stats.social_interaction_rate`: Social Interaction Rate
- `stats.social_interaction_rate.float`: Value (number)
- `stats.social_interaction_rate.string`: Formatted
- `created_at`: Created At (datetime)
- `has_banned_content`: Has Banned Content (boolean)
- `building_in_progress`: Building In Progress (boolean)
- `automation_template_id`: Template ID
- `automation_template_name`: Template Name
- `classic_sync_in_progress`: Classic Sync In Progress (boolean)
- `classic_sync_activate_after`: Classic Sync Activate After
- `heylite_inactive_count`: Heylite Inactive Count (number)
- `heylite_recommendation_id`: Heylite Recommendation ID

### `get_automation_activity`

**Get Automation Activity.** List the subscribers who went through a MailerLite automation, given the automation ID from list_automations. status is required: completed, active, canceled or failed. Date filters use YYYY-MM-DD: date_from/date_to apply to finished runs, scheduled_from/scheduled_to to active runs. Page-paginated. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `automation_id` | string | yes |  | Automation ID. The automation ID, from list_automations. |
| `status` | string | yes |  | Status. Which activity to return. One of `"completed"`, `"active"`, `"canceled"`, `"failed"`. |
| `date_from` | string | no |  | Date From. Finished on or after this date (YYYY-MM-DD). |
| `date_to` | string | no |  | Date To. Finished on or before this date (YYYY-MM-DD). |
| `scheduled_from` | string | no |  | Scheduled From. Active runs scheduled on or after this date (YYYY-MM-DD). |
| `scheduled_to` | string | no |  | Scheduled To. Active runs scheduled on or before this date (YYYY-MM-DD). |
| `search` | string | no |  | Subscriber Email. Only return activity for subscribers whose email matches this text. |
| `limit` | number | no | `10` | Limit. Items to return (1-100, default 10). |
| `page` | number | no |  | Page. Page number to return, starting at 1. |

Output fields:

- `data`: Activity
- `data[].id`: Activity ID
- `data[].status`: Status
- `data[].subscriber`: Subscriber
- `data[].date`: Date (datetime)
- `data[].scheduled_for`: Scheduled For (datetime)
- `data[].reason`: Reason
- `data[].reason_description`: Reason Description
- `links`: Links
- `links.first`: First Page URL (url)
- `links.last`: Last Page URL (url)
- `links.prev`: Previous Page URL (url)
- `links.next`: Next Page URL (url)
- `meta`: Meta
- `meta.current_page`: Current Page (number)
- `meta.from`: From (number)
- `meta.to`: To (number)
- `meta.last_page`: Last Page (number)
- `meta.per_page`: Per Page (number)
- `meta.total`: Total (number)
- `meta.path`: Request Path (url)
- `meta.links`: Page Links
- `meta.links[].url`: URL (url)
- `meta.links[].label`: Label
- `meta.links[].page`: Page (number)
- `meta.links[].active`: Active (boolean)

### `create_automation`

**Create Automation Draft.** Create an empty MailerLite automation draft with only a name. It is disabled and has no trigger or steps; those are configured in the MailerLite dashboard. Nothing is sent. Not idempotent: each call creates another draft. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The automation name. |

Output fields:

- `id`: Automation ID
- `name`: Name
- `enabled`: Enabled (boolean)
- `trigger_data`: Trigger Data
- `trigger_data.track_ecommerce`: Track Ecommerce
- `trigger_data.broken_workflow`: Broken Workflow
- `trigger_data.complete_workflow`: Complete Workflow
- `steps`: Steps
- `complete`: Complete (boolean)
- `broken`: Broken (boolean)
- `warnings`: Warnings
- `emails_count`: Emails Count (number)
- `stats`: Stats
- `stats.completed_subscribers_count`: Completed Subscribers Count
- `stats.subscribers_in_queue_count`: Subscribers In Queue Count
- `stats.sent`: Sent
- `stats.opens_count`: Opens Count
- `stats.unique_opens_count`: Unique Opens Count
- `stats.clicks_count`: Clicks Count
- `stats.unique_clicks_count`: Unique Clicks Count
- `stats.unsubscribes_count`: Unsubscribes Count
- `stats.spam_count`: Spam Count
- `stats.hard_bounces_count`: Hard Bounces Count
- `stats.soft_bounces_count`: Soft Bounces Count
- `stats.social_interactions_count`: Social Interactions Count
- `stats.bounce_rate`: Bounce Rate
- `stats.bounce_rate.float`: Value (number)
- `stats.bounce_rate.string`: Formatted
- `stats.click_to_open_rate`: Click To Open Rate
- `stats.click_to_open_rate.float`: Value (number)
- `stats.click_to_open_rate.string`: Formatted
- `stats.open_rate`: Open Rate
- `stats.open_rate.float`: Value (number)
- `stats.open_rate.string`: Formatted
- `stats.click_rate`: Click Rate
- `stats.click_rate.float`: Value (number)
- `stats.click_rate.string`: Formatted
- `stats.unsubscribe_rate`: Unsubscribe Rate
- `stats.unsubscribe_rate.float`: Value (number)
- `stats.unsubscribe_rate.string`: Formatted
- `stats.spam_rate`: Spam Rate
- `stats.spam_rate.float`: Value (number)
- `stats.spam_rate.string`: Formatted
- `stats.hard_bounce_rate`: Hard Bounce Rate
- `stats.hard_bounce_rate.float`: Value (number)
- `stats.hard_bounce_rate.string`: Formatted
- `stats.soft_bounce_rate`: Soft Bounce Rate
- `stats.soft_bounce_rate.float`: Value (number)
- `stats.soft_bounce_rate.string`: Formatted
- `stats.forward_rate`: Forward Rate
- `stats.forward_rate.float`: Value (number)
- `stats.forward_rate.string`: Formatted
- `stats.social_interaction_rate`: Social Interaction Rate
- `stats.social_interaction_rate.float`: Value (number)
- `stats.social_interaction_rate.string`: Formatted
- `created_at`: Created At (datetime)
- `has_banned_content`: Has Banned Content (boolean)
- `building_in_progress`: Building In Progress (boolean)
- `automation_template_id`: Template ID
- `automation_template_name`: Template Name
- `classic_sync_in_progress`: Classic Sync In Progress (boolean)
- `classic_sync_activate_after`: Classic Sync Activate After

### `delete_automation`

**Delete Automation.** Permanently delete a MailerLite automation by ID, including its steps; subscribers currently in it stop receiving its emails. Cannot be undone. Get the ID from list_automations. Not idempotent: a repeat call returns a 404 error. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `automation_id` | string | yes |  | Automation ID. The automation ID, from list_automations. |

Output fields:

- `deleted`: Deleted (boolean)
- `automation_id`: Automation ID

### `list_campaigns`

**List Campaigns.** List MailerLite campaigns with their IDs, status and stats. MailerLite returns only ready (scheduled) campaigns unless status is set, so set status to draft or sent to see those. Page-paginated. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no |  | Status. Only return campaigns with this status. MailerLite defaults to ready. One of `"draft"`, `"ready"`, `"sent"`. |
| `type` | string | no |  | Type. Only return campaigns of this type. One of `"regular"`, `"ab"`, `"resend"`, `"rss"`. |
| `limit` | number | no | `25` | Limit. Items to return (1-100, default 25). |
| `page` | number | no |  | Page. Page number to return, starting at 1. |

Output fields:

- `data`: Campaigns
- `data[].id`: Id
- `data[].account_id`: Account Id
- `data[].name`: Name
- `data[].type`: Type
- `data[].status`: Status
- `data[].missing_data`: Missing Data
- `data[].filter`: Filter
- `data[].filter_for_humans`: Filter For Humans
- `data[].delivery_schedule`: Delivery Schedule
- `data[].language_id`: Language Id
- `data[].created_at`: Created At
- `data[].updated_at`: Updated At
- `data[].scheduled_for`: Scheduled For
- `data[].queued_at`: Queued At
- `data[].started_at`: Started At
- `data[].finished_at`: Finished At
- `data[].stopped_at`: Stopped At
- `data[].default_email_id`: Default Email Id
- `data[].used_in_automations`: Used In Automations
- `data[].type_for_humans`: Type For Humans
- `data[].is_stopped`: Is Stopped
- `data[].has_winner`: Has Winner
- `data[].winner_version_for_human`: Winner Version For Human
- `data[].winner_sending_time_for_humans`: Winner Sending Time For Humans
- `data[].winner_selected_manually_at`: Winner Selected Manually At
- `data[].uses_ecommerce`: Uses Ecommerce
- `data[].ecommerce_stats`: Ecommerce Stats
- `data[].uses_survey`: Uses Survey
- `data[].is_smart_sending_index_option_finished`: Is Smart Sending Index Option Finished
- `data[].is_applied_for_smart_sending_index_option`: Is Applied For Smart Sending Index Option
- `data[].warnings`: Warnings
- `data[].recipients_count`: Recipients Count
- `data[].next_step`: Next Step
- `data[].is_currently_sending_out`: Is Currently Sending Out
- `data[].can_be_copied`: Can Be Copied
- `data[].has_basic_filter`: Has Basic Filter
- `data[].is_eligible_for_sending`: Is Eligible For Sending
- `data[].subscriber_import_limit_exceeded`: Subscriber Import Limit Exceeded
- `data[].needs_repair`: Needs Repair
- `data[].settings`: Settings
- `data[].settings.track_opens`: Track Opens
- `data[].settings.use_google_analytics`: Use Google Analytics
- `data[].settings.ecommerce_tracking`: Ecommerce Tracking
- `data[].language`: Language
- `data[].language.id`: Language ID
- `data[].language.shortcode`: Shortcode
- `data[].language.iso639`: ISO 639
- `data[].language.name`: Name
- `data[].language.direction`: Direction
- `data[].can`: Permissions
- `data[].can.update`: Update
- `data[].can.delete`: Delete
- `data[].can.send`: Send
- `data[].can.copy`: Copy
- `data[].can.resend`: Resend
- `data[].emails`: Emails
- `data[].emails[].id`: Id
- `data[].emails[].account_id`: Account Id
- `data[].emails[].emailable_id`: Emailable Id
- `data[].emails[].emailable_type`: Emailable Type
- `data[].emails[].type`: Type
- `data[].emails[].from`: From
- `data[].emails[].from_name`: From Name
- `data[].emails[].reply_to`: Reply To
- `data[].emails[].name`: Name
- `data[].emails[].subject`: Subject
- `data[].emails[].content`: Content
- `data[].emails[].plain_text`: Plain Text
- `data[].emails[].screenshot_url`: Screenshot Url
- `data[].emails[].uses_new_builder`: Uses New Builder
- `data[].emails[].uses_landscape_screenshot`: Uses Landscape Screenshot
- `data[].emails[].generate_screenshot_timestamp`: Generate Screenshot Timestamp
- `data[].emails[].is_building_content`: Is Building Content
- `data[].emails[].preview_url`: Preview Url
- `data[].emails[].report_preview_url`: Report Preview Url
- `data[].emails[].created_at`: Created At
- `data[].emails[].updated_at`: Updated At
- `data[].emails[].is_designed`: Is Designed
- `data[].emails[].language_id`: Language Id
- `data[].emails[].is_winner`: Is Winner
- `data[].emails[].send_after`: Send After
- `data[].emails[].track_opens`: Track Opens
- `data[].emails[].uses_survey`: Uses Survey
- `data[].emails[].uses_quiz`: Uses Quiz
- `data[].emails[].preheader`: Preheader
- `data[].emails[].language`: Language
- `data[].emails[].language.id`: Language ID
- `data[].emails[].language.shortcode`: Shortcode
- `data[].emails[].language.iso639`: ISO 639
- `data[].emails[].language.name`: Name
- `data[].emails[].language.direction`: Direction
- `data[].emails[].stats`: Stats
- `data[].emails[].stats.sent`: Sent
- `data[].emails[].stats.opens_count`: Opens Count
- `data[].emails[].stats.clicks_count`: Clicks Count
- `data[].emails[].stats.unsubscribes_count`: Unsubscribes Count
- `data[].emails[].stats.spam_count`: Spam Count
- `data[].emails[].stats.hard_bounces_count`: Hard Bounces Count
- `data[].emails[].stats.soft_bounces_count`: Soft Bounces Count
- `data[].emails[].stats.deliveries_count`: Deliveries Count
- `data[].emails[].stats.forwards_count`: Forwards Count
- `data[].emails[].stats.social_interactions_count`: Social Interactions Count
- `data[].emails[].stats.open_rate`: Open Rate
- `data[].emails[].stats.open_rate.float`: Value (number)
- `data[].emails[].stats.open_rate.string`: Formatted
- `data[].emails[].stats.click_rate`: Click Rate
- `data[].emails[].stats.click_rate.float`: Value (number)
- `data[].emails[].stats.click_rate.string`: Formatted
- `data[].emails[].stats.unsubscribe_rate`: Unsubscribe Rate
- `data[].emails[].stats.unsubscribe_rate.float`: Value (number)
- `data[].emails[].stats.unsubscribe_rate.string`: Formatted
- `data[].emails[].stats.spam_rate`: Spam Rate
- `data[].emails[].stats.spam_rate.float`: Value (number)
- `data[].emails[].stats.spam_rate.string`: Formatted
- `data[].emails[].stats.hard_bounce_rate`: Hard Bounce Rate
- `data[].emails[].stats.hard_bounce_rate.float`: Value (number)
- `data[].emails[].stats.hard_bounce_rate.string`: Formatted
- `data[].emails[].stats.soft_bounce_rate`: Soft Bounce Rate
- `data[].emails[].stats.soft_bounce_rate.float`: Value (number)
- `data[].emails[].stats.soft_bounce_rate.string`: Formatted
- `data[].emails[].stats.delivery_rate`: Delivery Rate
- `data[].emails[].stats.delivery_rate.float`: Value (number)
- `data[].emails[].stats.delivery_rate.string`: Formatted
- `data[].emails[].stats.forward_rate`: Forward Rate
- `data[].emails[].stats.forward_rate.float`: Value (number)
- `data[].emails[].stats.forward_rate.string`: Formatted
- `data[].emails[].stats.social_interaction_rate`: Social Interaction Rate
- `data[].emails[].stats.social_interaction_rate.float`: Value (number)
- `data[].emails[].stats.social_interaction_rate.string`: Formatted
- `data[].emails[].stats.click_to_open_rate`: Click To Open Rate
- `data[].emails[].stats.click_to_open_rate.float`: Value (number)
- `data[].emails[].stats.click_to_open_rate.string`: Formatted
- `data[].emails[].click_map`: Click Map
- `data[].basic_filter_for_humans`: Audience
- `data[].basic_filter_for_humans.all_active_subscribers`: All Active Subscribers
- `data[].basic_filter_for_humans.included_groups`: Included Groups
- `data[].basic_filter_for_humans.included_groups[].id`: Group ID
- `data[].basic_filter_for_humans.included_groups[].name`: Name
- `data[].basic_filter_for_humans.included_groups[].active_count`: Active Subscribers (number)
- `data[].basic_filter_for_humans.included_groups[].sent_count`: Emails Sent (number)
- `data[].basic_filter_for_humans.included_groups[].opens_count`: Opens Count (number)
- `data[].basic_filter_for_humans.included_groups[].open_rate`: Open Rate
- `data[].basic_filter_for_humans.included_groups[].clicks_count`: Clicks Count (number)
- `data[].basic_filter_for_humans.included_groups[].click_rate`: Click Rate
- `data[].basic_filter_for_humans.included_groups[].unsubscribed_count`: Unsubscribed (number)
- `data[].basic_filter_for_humans.included_groups[].unconfirmed_count`: Unconfirmed (number)
- `data[].basic_filter_for_humans.included_groups[].bounced_count`: Bounced (number)
- `data[].basic_filter_for_humans.included_groups[].junk_count`: Junk (number)
- `data[].basic_filter_for_humans.included_groups[].created_at`: Created At (datetime)
- `data[].basic_filter_for_humans.included_groups[].account_id`: Account Id
- `data[].basic_filter_for_humans.included_groups[].updated_at`: Updated At
- `data[].basic_filter_for_humans.included_groups[].deleted_at`: Deleted At
- `data[].basic_filter_for_humans.included_groups[].serial_no`: Serial No
- `data[].basic_filter_for_humans.excluded_groups`: Excluded Groups
- `data[].basic_filter_for_humans.included_segments`: Included Segments
- `data[].basic_filter_for_humans.excluded_segments`: Excluded Segments
- `data[].can_be_scheduled`: Can Be Scheduled (boolean)
- `data[].cannot_be_scheduled_reason`: Cannot Be Scheduled Reason
- `links`: Links
- `links.first`: First Page URL (url)
- `links.last`: Last Page URL (url)
- `links.prev`: Previous Page URL (url)
- `links.next`: Next Page URL (url)
- `meta`: Meta
- `meta.current_page`: Current Page (number)
- `meta.from`: From (number)
- `meta.to`: To (number)
- `meta.last_page`: Last Page (number)
- `meta.per_page`: Per Page (number)
- `meta.total`: Total (number)
- `meta.path`: Request Path (url)
- `meta.links`: Page Links
- `meta.links[].url`: URL (url)
- `meta.links[].label`: Label
- `meta.links[].page`: Page (number)
- `meta.links[].active`: Active (boolean)
- `meta.aggregations`: Aggregations
- `meta.aggregations.all`: All
- `meta.aggregations.draft`: Draft
- `meta.aggregations.ready`: Ready
- `meta.aggregations.sent`: Sent

### `get_campaign`

**Get Campaign.** Get one MailerLite campaign by ID, including status (draft, ready, sent), audience, emails and stats. Get the ID from list_campaigns. Read-only; returns a 404 error if the ID does not exist. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | string | yes |  | Campaign ID. The campaign ID, from list_campaigns. |

Output fields:

- `id`: Id
- `account_id`: Account Id
- `name`: Name
- `type`: Type
- `status`: Status
- `missing_data`: Missing Data
- `filter`: Filter
- `filter_for_humans`: Filter For Humans
- `delivery_schedule`: Delivery Schedule
- `language_id`: Language Id
- `created_at`: Created At
- `updated_at`: Updated At
- `scheduled_for`: Scheduled For
- `queued_at`: Queued At
- `started_at`: Started At
- `finished_at`: Finished At
- `stopped_at`: Stopped At
- `default_email_id`: Default Email Id
- `used_in_automations`: Used In Automations
- `type_for_humans`: Type For Humans
- `is_stopped`: Is Stopped
- `has_winner`: Has Winner
- `winner_version_for_human`: Winner Version For Human
- `winner_sending_time_for_humans`: Winner Sending Time For Humans
- `winner_selected_manually_at`: Winner Selected Manually At
- `uses_ecommerce`: Uses Ecommerce
- `ecommerce_stats`: Ecommerce Stats
- `uses_survey`: Uses Survey
- `is_smart_sending_index_option_finished`: Is Smart Sending Index Option Finished
- `is_applied_for_smart_sending_index_option`: Is Applied For Smart Sending Index Option
- `warnings`: Warnings
- `recipients_count`: Recipients Count
- `next_step`: Next Step
- `is_currently_sending_out`: Is Currently Sending Out
- `can_be_copied`: Can Be Copied
- `has_basic_filter`: Has Basic Filter
- `is_eligible_for_sending`: Is Eligible For Sending
- `subscriber_import_limit_exceeded`: Subscriber Import Limit Exceeded
- `needs_repair`: Needs Repair
- `settings`: Settings
- `settings.track_opens`: Track Opens
- `settings.use_google_analytics`: Use Google Analytics
- `settings.ecommerce_tracking`: Ecommerce Tracking
- `language`: Language
- `language.id`: Language ID
- `language.shortcode`: Shortcode
- `language.iso639`: ISO 639
- `language.name`: Name
- `language.direction`: Direction
- `can`: Permissions
- `can.update`: Update
- `can.delete`: Delete
- `can.send`: Send
- `can.copy`: Copy
- `can.resend`: Resend
- `emails`: Emails
- `emails[].id`: Id
- `emails[].account_id`: Account Id
- `emails[].emailable_id`: Emailable Id
- `emails[].emailable_type`: Emailable Type
- `emails[].type`: Type
- `emails[].from`: From
- `emails[].from_name`: From Name
- `emails[].reply_to`: Reply To
- `emails[].name`: Name
- `emails[].subject`: Subject
- `emails[].content`: Content
- `emails[].plain_text`: Plain Text
- `emails[].screenshot_url`: Screenshot Url
- `emails[].uses_new_builder`: Uses New Builder
- `emails[].uses_landscape_screenshot`: Uses Landscape Screenshot
- `emails[].generate_screenshot_timestamp`: Generate Screenshot Timestamp
- `emails[].is_building_content`: Is Building Content
- `emails[].preview_url`: Preview Url
- `emails[].report_preview_url`: Report Preview Url
- `emails[].created_at`: Created At
- `emails[].updated_at`: Updated At
- `emails[].is_designed`: Is Designed
- `emails[].language_id`: Language Id
- `emails[].is_winner`: Is Winner
- `emails[].send_after`: Send After
- `emails[].track_opens`: Track Opens
- `emails[].uses_survey`: Uses Survey
- `emails[].uses_quiz`: Uses Quiz
- `emails[].preheader`: Preheader
- `emails[].language`: Language
- `emails[].language.id`: Language ID
- `emails[].language.shortcode`: Shortcode
- `emails[].language.iso639`: ISO 639
- `emails[].language.name`: Name
- `emails[].language.direction`: Direction
- `emails[].stats`: Stats
- `emails[].stats.sent`: Sent
- `emails[].stats.opens_count`: Opens Count
- `emails[].stats.clicks_count`: Clicks Count
- `emails[].stats.unsubscribes_count`: Unsubscribes Count
- `emails[].stats.spam_count`: Spam Count
- `emails[].stats.hard_bounces_count`: Hard Bounces Count
- `emails[].stats.soft_bounces_count`: Soft Bounces Count
- `emails[].stats.deliveries_count`: Deliveries Count
- `emails[].stats.forwards_count`: Forwards Count
- `emails[].stats.social_interactions_count`: Social Interactions Count
- `emails[].stats.open_rate`: Open Rate
- `emails[].stats.open_rate.float`: Value (number)
- `emails[].stats.open_rate.string`: Formatted
- `emails[].stats.click_rate`: Click Rate
- `emails[].stats.click_rate.float`: Value (number)
- `emails[].stats.click_rate.string`: Formatted
- `emails[].stats.unsubscribe_rate`: Unsubscribe Rate
- `emails[].stats.unsubscribe_rate.float`: Value (number)
- `emails[].stats.unsubscribe_rate.string`: Formatted
- `emails[].stats.spam_rate`: Spam Rate
- `emails[].stats.spam_rate.float`: Value (number)
- `emails[].stats.spam_rate.string`: Formatted
- `emails[].stats.hard_bounce_rate`: Hard Bounce Rate
- `emails[].stats.hard_bounce_rate.float`: Value (number)
- `emails[].stats.hard_bounce_rate.string`: Formatted
- `emails[].stats.soft_bounce_rate`: Soft Bounce Rate
- `emails[].stats.soft_bounce_rate.float`: Value (number)
- `emails[].stats.soft_bounce_rate.string`: Formatted
- `emails[].stats.delivery_rate`: Delivery Rate
- `emails[].stats.delivery_rate.float`: Value (number)
- `emails[].stats.delivery_rate.string`: Formatted
- `emails[].stats.forward_rate`: Forward Rate
- `emails[].stats.forward_rate.float`: Value (number)
- `emails[].stats.forward_rate.string`: Formatted
- `emails[].stats.social_interaction_rate`: Social Interaction Rate
- `emails[].stats.social_interaction_rate.float`: Value (number)
- `emails[].stats.social_interaction_rate.string`: Formatted
- `emails[].stats.click_to_open_rate`: Click To Open Rate
- `emails[].stats.click_to_open_rate.float`: Value (number)
- `emails[].stats.click_to_open_rate.string`: Formatted
- `emails[].click_map`: Click Map
- `basic_filter_for_humans`: Audience
- `basic_filter_for_humans.all_active_subscribers`: All Active Subscribers
- `basic_filter_for_humans.included_groups`: Included Groups
- `basic_filter_for_humans.included_groups[].id`: Group ID
- `basic_filter_for_humans.included_groups[].name`: Name
- `basic_filter_for_humans.included_groups[].active_count`: Active Subscribers (number)
- `basic_filter_for_humans.included_groups[].sent_count`: Emails Sent (number)
- `basic_filter_for_humans.included_groups[].opens_count`: Opens Count (number)
- `basic_filter_for_humans.included_groups[].open_rate`: Open Rate
- `basic_filter_for_humans.included_groups[].clicks_count`: Clicks Count (number)
- `basic_filter_for_humans.included_groups[].click_rate`: Click Rate
- `basic_filter_for_humans.included_groups[].unsubscribed_count`: Unsubscribed (number)
- `basic_filter_for_humans.included_groups[].unconfirmed_count`: Unconfirmed (number)
- `basic_filter_for_humans.included_groups[].bounced_count`: Bounced (number)
- `basic_filter_for_humans.included_groups[].junk_count`: Junk (number)
- `basic_filter_for_humans.included_groups[].created_at`: Created At (datetime)
- `basic_filter_for_humans.included_groups[].account_id`: Account Id
- `basic_filter_for_humans.included_groups[].updated_at`: Updated At
- `basic_filter_for_humans.included_groups[].deleted_at`: Deleted At
- `basic_filter_for_humans.included_groups[].serial_no`: Serial No
- `basic_filter_for_humans.excluded_groups`: Excluded Groups
- `basic_filter_for_humans.included_segments`: Included Segments
- `basic_filter_for_humans.excluded_segments`: Excluded Segments
- `can_be_scheduled`: Can Be Scheduled (boolean)
- `cannot_be_scheduled_reason`: Cannot Be Scheduled Reason

### `create_campaign_draft`

**Create Campaign Draft.** Create a regular MailerLite email campaign as a draft only; it is never sent or scheduled, sending is done in the MailerLite dashboard. from must be a verified sender email on the account. Target it with group_ids (from list_groups) and/or segment_ids (from list_segments); with neither, the draft has no audience yet. language_id comes from list_campaign_languages. content (HTML) works on the Advanced plan only; omit it on other plans. Not idempotent: each call creates another draft. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Campaign Name. Internal campaign name. |
| `subject` | string | yes |  | Subject. Email subject line. |
| `from_name` | string | yes |  | From Name. Sender name shown to recipients. |
| `from` | string | yes |  | From Email. Sender email. Must be a verified sender on the MailerLite account. |
| `reply_to` | string | no |  | Reply-To Email. Reply-to email address. |
| `group_ids` | array | no |  | Group IDs. Groups to send to, from list_groups. |
| `segment_ids` | array | no |  | Segment IDs. Segments to send to, from list_segments. |
| `language_id` | string | no |  | Language ID. Campaign language ID, from list_campaign_languages. |
| `content` | string | no |  | HTML Content. Email HTML. Advanced plan only; omit on other plans. |

Output fields:

- `id`: Id
- `account_id`: Account Id
- `name`: Name
- `type`: Type
- `status`: Status
- `missing_data`: Missing Data
- `filter`: Filter
- `filter_for_humans`: Filter For Humans
- `delivery_schedule`: Delivery Schedule
- `language_id`: Language Id
- `created_at`: Created At
- `updated_at`: Updated At
- `scheduled_for`: Scheduled For
- `queued_at`: Queued At
- `started_at`: Started At
- `finished_at`: Finished At
- `stopped_at`: Stopped At
- `default_email_id`: Default Email Id
- `used_in_automations`: Used In Automations
- `type_for_humans`: Type For Humans
- `is_stopped`: Is Stopped
- `has_winner`: Has Winner
- `winner_version_for_human`: Winner Version For Human
- `winner_sending_time_for_humans`: Winner Sending Time For Humans
- `winner_selected_manually_at`: Winner Selected Manually At
- `uses_ecommerce`: Uses Ecommerce
- `ecommerce_stats`: Ecommerce Stats
- `uses_survey`: Uses Survey
- `is_smart_sending_index_option_finished`: Is Smart Sending Index Option Finished
- `is_applied_for_smart_sending_index_option`: Is Applied For Smart Sending Index Option
- `warnings`: Warnings
- `recipients_count`: Recipients Count
- `next_step`: Next Step
- `is_currently_sending_out`: Is Currently Sending Out
- `can_be_copied`: Can Be Copied
- `has_basic_filter`: Has Basic Filter
- `is_eligible_for_sending`: Is Eligible For Sending
- `subscriber_import_limit_exceeded`: Subscriber Import Limit Exceeded
- `needs_repair`: Needs Repair
- `settings`: Settings
- `settings.track_opens`: Track Opens
- `settings.use_google_analytics`: Use Google Analytics
- `settings.ecommerce_tracking`: Ecommerce Tracking
- `language`: Language
- `language.id`: Language ID
- `language.shortcode`: Shortcode
- `language.iso639`: ISO 639
- `language.name`: Name
- `language.direction`: Direction
- `can`: Permissions
- `can.update`: Update
- `can.delete`: Delete
- `can.send`: Send
- `can.copy`: Copy
- `can.resend`: Resend
- `emails`: Emails
- `emails[].id`: Id
- `emails[].account_id`: Account Id
- `emails[].emailable_id`: Emailable Id
- `emails[].emailable_type`: Emailable Type
- `emails[].type`: Type
- `emails[].from`: From
- `emails[].from_name`: From Name
- `emails[].reply_to`: Reply To
- `emails[].name`: Name
- `emails[].subject`: Subject
- `emails[].content`: Content
- `emails[].plain_text`: Plain Text
- `emails[].screenshot_url`: Screenshot Url
- `emails[].uses_new_builder`: Uses New Builder
- `emails[].uses_landscape_screenshot`: Uses Landscape Screenshot
- `emails[].generate_screenshot_timestamp`: Generate Screenshot Timestamp
- `emails[].is_building_content`: Is Building Content
- `emails[].preview_url`: Preview Url
- `emails[].report_preview_url`: Report Preview Url
- `emails[].created_at`: Created At
- `emails[].updated_at`: Updated At
- `emails[].is_designed`: Is Designed
- `emails[].language_id`: Language Id
- `emails[].is_winner`: Is Winner
- `emails[].send_after`: Send After
- `emails[].track_opens`: Track Opens
- `emails[].uses_survey`: Uses Survey
- `emails[].uses_quiz`: Uses Quiz
- `emails[].preheader`: Preheader
- `emails[].language`: Language
- `emails[].language.id`: Language ID
- `emails[].language.shortcode`: Shortcode
- `emails[].language.iso639`: ISO 639
- `emails[].language.name`: Name
- `emails[].language.direction`: Direction
- `emails[].stats`: Stats
- `emails[].stats.sent`: Sent
- `emails[].stats.opens_count`: Opens Count
- `emails[].stats.clicks_count`: Clicks Count
- `emails[].stats.unsubscribes_count`: Unsubscribes Count
- `emails[].stats.spam_count`: Spam Count
- `emails[].stats.hard_bounces_count`: Hard Bounces Count
- `emails[].stats.soft_bounces_count`: Soft Bounces Count
- `emails[].stats.deliveries_count`: Deliveries Count
- `emails[].stats.forwards_count`: Forwards Count
- `emails[].stats.social_interactions_count`: Social Interactions Count
- `emails[].stats.open_rate`: Open Rate
- `emails[].stats.open_rate.float`: Value (number)
- `emails[].stats.open_rate.string`: Formatted
- `emails[].stats.click_rate`: Click Rate
- `emails[].stats.click_rate.float`: Value (number)
- `emails[].stats.click_rate.string`: Formatted
- `emails[].stats.unsubscribe_rate`: Unsubscribe Rate
- `emails[].stats.unsubscribe_rate.float`: Value (number)
- `emails[].stats.unsubscribe_rate.string`: Formatted
- `emails[].stats.spam_rate`: Spam Rate
- `emails[].stats.spam_rate.float`: Value (number)
- `emails[].stats.spam_rate.string`: Formatted
- `emails[].stats.hard_bounce_rate`: Hard Bounce Rate
- `emails[].stats.hard_bounce_rate.float`: Value (number)
- `emails[].stats.hard_bounce_rate.string`: Formatted
- `emails[].stats.soft_bounce_rate`: Soft Bounce Rate
- `emails[].stats.soft_bounce_rate.float`: Value (number)
- `emails[].stats.soft_bounce_rate.string`: Formatted
- `emails[].stats.delivery_rate`: Delivery Rate
- `emails[].stats.delivery_rate.float`: Value (number)
- `emails[].stats.delivery_rate.string`: Formatted
- `emails[].stats.forward_rate`: Forward Rate
- `emails[].stats.forward_rate.float`: Value (number)
- `emails[].stats.forward_rate.string`: Formatted
- `emails[].stats.social_interaction_rate`: Social Interaction Rate
- `emails[].stats.social_interaction_rate.float`: Value (number)
- `emails[].stats.social_interaction_rate.string`: Formatted
- `emails[].stats.click_to_open_rate`: Click To Open Rate
- `emails[].stats.click_to_open_rate.float`: Value (number)
- `emails[].stats.click_to_open_rate.string`: Formatted
- `basic_filter_for_humans`: Audience
- `basic_filter_for_humans.all_active_subscribers`: All Active Subscribers
- `basic_filter_for_humans.included_groups`: Included Groups
- `basic_filter_for_humans.included_groups[].id`: Group ID
- `basic_filter_for_humans.included_groups[].name`: Name
- `basic_filter_for_humans.included_groups[].active_count`: Active Subscribers (number)
- `basic_filter_for_humans.included_groups[].sent_count`: Emails Sent (number)
- `basic_filter_for_humans.included_groups[].opens_count`: Opens Count (number)
- `basic_filter_for_humans.included_groups[].open_rate`: Open Rate
- `basic_filter_for_humans.included_groups[].clicks_count`: Clicks Count (number)
- `basic_filter_for_humans.included_groups[].click_rate`: Click Rate
- `basic_filter_for_humans.included_groups[].unsubscribed_count`: Unsubscribed (number)
- `basic_filter_for_humans.included_groups[].unconfirmed_count`: Unconfirmed (number)
- `basic_filter_for_humans.included_groups[].bounced_count`: Bounced (number)
- `basic_filter_for_humans.included_groups[].junk_count`: Junk (number)
- `basic_filter_for_humans.included_groups[].created_at`: Created At (datetime)
- `basic_filter_for_humans.included_groups[].account_id`: Account Id
- `basic_filter_for_humans.included_groups[].updated_at`: Updated At
- `basic_filter_for_humans.included_groups[].deleted_at`: Deleted At
- `basic_filter_for_humans.included_groups[].serial_no`: Serial No
- `basic_filter_for_humans.excluded_groups`: Excluded Groups
- `basic_filter_for_humans.included_segments`: Included Segments
- `basic_filter_for_humans.excluded_segments`: Excluded Segments

### `update_campaign_draft`

**Update Campaign Draft.** Update a MailerLite campaign that is still a draft, changing only the values you supply; everything else (name, subject, sender, groups, segments, language) is kept. Fails if the campaign is not a draft. It never sends or schedules. Get the ID from list_campaigns with status draft. Pass group_ids or segment_ids (not both) to replace the audience. Fails without changing anything if the campaign excludes groups or segments, or targets both groups and segments and you pass neither, because the MailerLite API cannot save those rules back. content (HTML) works on the Advanced plan only. At least one value is required. Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | string | yes |  | Campaign ID. The draft campaign ID, from list_campaigns. |
| `name` | string | no |  | Campaign Name. New internal campaign name. |
| `subject` | string | no |  | Subject. New email subject line. |
| `from_name` | string | no |  | From Name. New sender name. |
| `from` | string | no |  | From Email. New sender email. Must be a verified sender on the MailerLite account. |
| `reply_to` | string | no |  | Reply-To Email. New reply-to email address. |
| `group_ids` | array | no |  | Group IDs. Replaces the audience with these groups, from list_groups. Not with Segment IDs. |
| `segment_ids` | array | no |  | Segment IDs. Replaces the audience with these segments, from list_segments. Not with Group IDs. |
| `language_id` | string | no |  | Language ID. Campaign language ID, from list_campaign_languages. |
| `content` | string | no |  | HTML Content. Email HTML. Advanced plan only; omit on other plans. |

Output fields:

- `id`: Id
- `account_id`: Account Id
- `name`: Name
- `type`: Type
- `status`: Status
- `missing_data`: Missing Data
- `filter`: Filter
- `filter_for_humans`: Filter For Humans
- `delivery_schedule`: Delivery Schedule
- `language_id`: Language Id
- `created_at`: Created At
- `updated_at`: Updated At
- `scheduled_for`: Scheduled For
- `queued_at`: Queued At
- `started_at`: Started At
- `finished_at`: Finished At
- `stopped_at`: Stopped At
- `default_email_id`: Default Email Id
- `used_in_automations`: Used In Automations
- `type_for_humans`: Type For Humans
- `is_stopped`: Is Stopped
- `has_winner`: Has Winner
- `winner_version_for_human`: Winner Version For Human
- `winner_sending_time_for_humans`: Winner Sending Time For Humans
- `winner_selected_manually_at`: Winner Selected Manually At
- `uses_ecommerce`: Uses Ecommerce
- `ecommerce_stats`: Ecommerce Stats
- `uses_survey`: Uses Survey
- `is_smart_sending_index_option_finished`: Is Smart Sending Index Option Finished
- `is_applied_for_smart_sending_index_option`: Is Applied For Smart Sending Index Option
- `warnings`: Warnings
- `recipients_count`: Recipients Count
- `next_step`: Next Step
- `is_currently_sending_out`: Is Currently Sending Out
- `can_be_copied`: Can Be Copied
- `has_basic_filter`: Has Basic Filter
- `is_eligible_for_sending`: Is Eligible For Sending
- `subscriber_import_limit_exceeded`: Subscriber Import Limit Exceeded
- `needs_repair`: Needs Repair
- `settings`: Settings
- `settings.track_opens`: Track Opens
- `settings.use_google_analytics`: Use Google Analytics
- `settings.ecommerce_tracking`: Ecommerce Tracking
- `language`: Language
- `language.id`: Language ID
- `language.shortcode`: Shortcode
- `language.iso639`: ISO 639
- `language.name`: Name
- `language.direction`: Direction
- `can`: Permissions
- `can.update`: Update
- `can.delete`: Delete
- `can.send`: Send
- `can.copy`: Copy
- `can.resend`: Resend
- `emails`: Emails
- `emails[].id`: Id
- `emails[].account_id`: Account Id
- `emails[].emailable_id`: Emailable Id
- `emails[].emailable_type`: Emailable Type
- `emails[].type`: Type
- `emails[].from`: From
- `emails[].from_name`: From Name
- `emails[].reply_to`: Reply To
- `emails[].name`: Name
- `emails[].subject`: Subject
- `emails[].content`: Content
- `emails[].plain_text`: Plain Text
- `emails[].screenshot_url`: Screenshot Url
- `emails[].uses_new_builder`: Uses New Builder
- `emails[].uses_landscape_screenshot`: Uses Landscape Screenshot
- `emails[].generate_screenshot_timestamp`: Generate Screenshot Timestamp
- `emails[].is_building_content`: Is Building Content
- `emails[].preview_url`: Preview Url
- `emails[].report_preview_url`: Report Preview Url
- `emails[].created_at`: Created At
- `emails[].updated_at`: Updated At
- `emails[].is_designed`: Is Designed
- `emails[].language_id`: Language Id
- `emails[].is_winner`: Is Winner
- `emails[].send_after`: Send After
- `emails[].track_opens`: Track Opens
- `emails[].uses_survey`: Uses Survey
- `emails[].uses_quiz`: Uses Quiz
- `emails[].preheader`: Preheader
- `emails[].language`: Language
- `emails[].language.id`: Language ID
- `emails[].language.shortcode`: Shortcode
- `emails[].language.iso639`: ISO 639
- `emails[].language.name`: Name
- `emails[].language.direction`: Direction
- `emails[].stats`: Stats
- `emails[].stats.sent`: Sent
- `emails[].stats.opens_count`: Opens Count
- `emails[].stats.clicks_count`: Clicks Count
- `emails[].stats.unsubscribes_count`: Unsubscribes Count
- `emails[].stats.spam_count`: Spam Count
- `emails[].stats.hard_bounces_count`: Hard Bounces Count
- `emails[].stats.soft_bounces_count`: Soft Bounces Count
- `emails[].stats.deliveries_count`: Deliveries Count
- `emails[].stats.forwards_count`: Forwards Count
- `emails[].stats.social_interactions_count`: Social Interactions Count
- `emails[].stats.open_rate`: Open Rate
- `emails[].stats.open_rate.float`: Value (number)
- `emails[].stats.open_rate.string`: Formatted
- `emails[].stats.click_rate`: Click Rate
- `emails[].stats.click_rate.float`: Value (number)
- `emails[].stats.click_rate.string`: Formatted
- `emails[].stats.unsubscribe_rate`: Unsubscribe Rate
- `emails[].stats.unsubscribe_rate.float`: Value (number)
- `emails[].stats.unsubscribe_rate.string`: Formatted
- `emails[].stats.spam_rate`: Spam Rate
- `emails[].stats.spam_rate.float`: Value (number)
- `emails[].stats.spam_rate.string`: Formatted
- `emails[].stats.hard_bounce_rate`: Hard Bounce Rate
- `emails[].stats.hard_bounce_rate.float`: Value (number)
- `emails[].stats.hard_bounce_rate.string`: Formatted
- `emails[].stats.soft_bounce_rate`: Soft Bounce Rate
- `emails[].stats.soft_bounce_rate.float`: Value (number)
- `emails[].stats.soft_bounce_rate.string`: Formatted
- `emails[].stats.delivery_rate`: Delivery Rate
- `emails[].stats.delivery_rate.float`: Value (number)
- `emails[].stats.delivery_rate.string`: Formatted
- `emails[].stats.forward_rate`: Forward Rate
- `emails[].stats.forward_rate.float`: Value (number)
- `emails[].stats.forward_rate.string`: Formatted
- `emails[].stats.social_interaction_rate`: Social Interaction Rate
- `emails[].stats.social_interaction_rate.float`: Value (number)
- `emails[].stats.social_interaction_rate.string`: Formatted
- `emails[].stats.click_to_open_rate`: Click To Open Rate
- `emails[].stats.click_to_open_rate.float`: Value (number)
- `emails[].stats.click_to_open_rate.string`: Formatted
- `basic_filter_for_humans`: Audience
- `basic_filter_for_humans.all_active_subscribers`: All Active Subscribers
- `basic_filter_for_humans.included_groups`: Included Groups
- `basic_filter_for_humans.included_groups[].id`: Group ID
- `basic_filter_for_humans.included_groups[].name`: Name
- `basic_filter_for_humans.included_groups[].active_count`: Active Subscribers (number)
- `basic_filter_for_humans.included_groups[].sent_count`: Emails Sent (number)
- `basic_filter_for_humans.included_groups[].opens_count`: Opens Count (number)
- `basic_filter_for_humans.included_groups[].open_rate`: Open Rate
- `basic_filter_for_humans.included_groups[].clicks_count`: Clicks Count (number)
- `basic_filter_for_humans.included_groups[].click_rate`: Click Rate
- `basic_filter_for_humans.included_groups[].unsubscribed_count`: Unsubscribed (number)
- `basic_filter_for_humans.included_groups[].unconfirmed_count`: Unconfirmed (number)
- `basic_filter_for_humans.included_groups[].bounced_count`: Bounced (number)
- `basic_filter_for_humans.included_groups[].junk_count`: Junk (number)
- `basic_filter_for_humans.included_groups[].created_at`: Created At (datetime)
- `basic_filter_for_humans.included_groups[].account_id`: Account Id
- `basic_filter_for_humans.included_groups[].updated_at`: Updated At
- `basic_filter_for_humans.included_groups[].deleted_at`: Deleted At
- `basic_filter_for_humans.included_groups[].serial_no`: Serial No
- `basic_filter_for_humans.excluded_groups`: Excluded Groups
- `basic_filter_for_humans.included_segments`: Included Segments
- `basic_filter_for_humans.excluded_segments`: Excluded Segments

### `delete_campaign`

**Delete Campaign.** Permanently delete a MailerLite campaign by ID, including its content and, for sent campaigns, its reports. Cannot be undone. Get the ID from list_campaigns. Not idempotent: a repeat call returns a 404 error. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | string | yes |  | Campaign ID. The campaign ID, from list_campaigns. |

Output fields:

- `deleted`: Deleted (boolean)
- `campaign_id`: Campaign ID

### `list_campaign_languages`

**List Campaign Languages.** List the languages MailerLite supports for campaigns, with their IDs. Pass an ID as language_id to create_campaign_draft or update_campaign_draft. Read-only. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `data`: Languages
- `data[].id`: Language ID
- `data[].shortcode`: Shortcode
- `data[].iso639`: ISO 639
- `data[].name`: Name
- `data[].direction`: Direction

### `list_forms`

**List Forms.** List MailerLite signup forms of one type (popup, embedded or promotion) with their IDs and conversion stats. Forms cannot be created through the API. Page-paginated. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Form Type. The type of forms to list. One of `"popup"`, `"embedded"`, `"promotion"`. |
| `name` | string | no |  | Name Contains. Only return forms whose name contains this text. |
| `limit` | number | no | `25` | Limit. Items to return (1-100, default 25). |
| `page` | number | no |  | Page. Page number to return, starting at 1. |

Output fields:

- `data`: Forms
- `data[].id`: Form ID
- `data[].type`: Type
- `data[].slug`: Slug
- `data[].name`: Name
- `data[].created_at`: Created At (datetime)
- `data[].conversions_count`: Conversions (number)
- `data[].conversion_rate`: Conversion Rate
- `data[].conversion_rate.float`: Value (number)
- `data[].conversion_rate.string`: Formatted
- `data[].opens_count`: Opens Count (number)
- `data[].settings`: Settings
- `data[].settings.double_optin`: Double Optin
- `data[].settings.form_type`: Form Type
- `data[].settings.groot_id`: Groot Id
- `data[].settings.automated_content_check_performed`: Automated Content Check Performed
- `data[].settings.is_first_form_with_content`: Is First Form With Content
- `data[].settings.needs_content_refresh`: Needs Content Refresh
- `data[].last_registration_at`: Last Registration At (datetime)
- `data[].active`: Active (boolean)
- `data[].is_broken`: Broken (boolean)
- `data[].has_content`: Has Content (boolean)
- `data[].used_in_automations`: Used In Automations (boolean)
- `data[].warnings`: Warnings
- `data[].double_optin`: Double Opt-in (boolean)
- `data[].screenshot_url`: Screenshot URL (url)
- `data[].share_url`: Share URL (url)
- `data[].groups`: Groups
- `data[].groups[].id`: Group ID
- `data[].groups[].name`: Name
- `data[].groups[].active_count`: Active Subscribers (number)
- `data[].groups[].sent_count`: Emails Sent (number)
- `data[].groups[].opens_count`: Opens Count (number)
- `data[].groups[].open_rate`: Open Rate
- `data[].groups[].open_rate.float`: Value (number)
- `data[].groups[].open_rate.string`: Formatted
- `data[].groups[].clicks_count`: Clicks Count (number)
- `data[].groups[].click_rate`: Click Rate
- `data[].groups[].click_rate.float`: Value (number)
- `data[].groups[].click_rate.string`: Formatted
- `data[].groups[].unsubscribed_count`: Unsubscribed (number)
- `data[].groups[].unconfirmed_count`: Unconfirmed (number)
- `data[].groups[].bounced_count`: Bounced (number)
- `data[].groups[].junk_count`: Junk (number)
- `data[].groups[].created_at`: Created At (datetime)
- `data[].can`: Permissions
- `data[].can.update`: Update
- `data[].conversion_rate_including_children`: Conversion Rate Including Children
- `data[].conversion_rate_including_children.float`: Value (number)
- `data[].conversion_rate_including_children.string`: Formatted
- `data[].account_id`: Account Id
- `data[].original_name`: Original Name
- `data[].parent_id`: Parent Id
- `data[].children`: Children
- `data[].has_missing_groups`: Has Missing Groups
- `data[].split_test_enabled`: Split Test Enabled
- `data[].split_test_finished`: Split Test Finished
- `data[].has_split_tests`: Has Split Tests
- `data[].split_percentage`: Split Percentage
- `data[].warning_messages`: Warning Messages
- `data[].uses_new_builder`: Uses New Builder
- `data[].uses_survey`: Uses Survey
- `data[].can_choose_template`: Can Choose Template
- `data[].is_split_test_winner`: Is Split Test Winner
- `data[].analytics_reset_at`: Analytics Reset At
- `data[].conversions_count_including_children`: Conversions Count Including Children
- `data[].opens_count_including_children`: Opens Count Including Children
- `links`: Links
- `links.first`: First Page URL (url)
- `links.last`: Last Page URL (url)
- `links.prev`: Previous Page URL (url)
- `links.next`: Next Page URL (url)
- `meta`: Meta
- `meta.current_page`: Current Page (number)
- `meta.from`: From (number)
- `meta.to`: To (number)
- `meta.last_page`: Last Page (number)
- `meta.per_page`: Per Page (number)
- `meta.total`: Total (number)
- `meta.path`: Request Path (url)
- `meta.links`: Page Links
- `meta.links[].url`: URL (url)
- `meta.links[].label`: Label
- `meta.links[].page`: Page (number)
- `meta.links[].active`: Active (boolean)
- `meta.aggregations`: Aggregations
- `meta.aggregations.popup`: Popup
- `meta.aggregations.embedded`: Embedded
- `meta.aggregations.promotion`: Promotion

### `get_form`

**Get Form.** Get one MailerLite signup form (popup, embedded or promotion) by ID, including conversions and settings. Get the ID from list_forms. Read-only; returns a 404 error if the ID does not exist. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form ID. The form ID, from list_forms. |

Output fields:

- `id`: Form ID
- `type`: Type
- `slug`: Slug
- `name`: Name
- `created_at`: Created At (datetime)
- `conversions_count`: Conversions (number)
- `conversion_rate`: Conversion Rate
- `conversion_rate.float`: Value (number)
- `conversion_rate.string`: Formatted
- `opens_count`: Opens Count (number)
- `settings`: Settings
- `settings.double_optin`: Double Optin
- `settings.groot_id`: Groot Id
- `settings.automated_content_check_performed`: Automated Content Check Performed
- `last_registration_at`: Last Registration At (datetime)
- `active`: Active (boolean)
- `is_broken`: Broken (boolean)
- `has_content`: Has Content (boolean)
- `used_in_automations`: Used In Automations (boolean)
- `warnings`: Warnings
- `double_optin`: Double Opt-in (boolean)
- `screenshot_url`: Screenshot URL (url)
- `share_url`: Share URL (url)
- `groups`: Groups
- `groups[].id`: Group ID
- `groups[].name`: Name
- `groups[].active_count`: Active Subscribers (number)
- `groups[].sent_count`: Emails Sent (number)
- `groups[].opens_count`: Opens Count (number)
- `groups[].open_rate`: Open Rate
- `groups[].open_rate.float`: Value (number)
- `groups[].open_rate.string`: Formatted
- `groups[].clicks_count`: Clicks Count (number)
- `groups[].click_rate`: Click Rate
- `groups[].click_rate.float`: Value (number)
- `groups[].click_rate.string`: Formatted
- `groups[].unsubscribed_count`: Unsubscribed (number)
- `groups[].unconfirmed_count`: Unconfirmed (number)
- `groups[].bounced_count`: Bounced (number)
- `groups[].junk_count`: Junk (number)
- `groups[].created_at`: Created At (datetime)
- `can`: Permissions
- `can.update`: Update
- `conversion_rate_including_children`: Conversion Rate Including Children
- `conversion_rate_including_children.float`: Value (number)
- `conversion_rate_including_children.string`: Formatted
- `account_id`: Account Id
- `original_name`: Original Name
- `parent_id`: Parent Id
- `children`: Children
- `has_missing_groups`: Has Missing Groups
- `split_test_enabled`: Split Test Enabled
- `split_test_finished`: Split Test Finished
- `has_split_tests`: Has Split Tests
- `split_percentage`: Split Percentage
- `warning_messages`: Warning Messages
- `uses_new_builder`: Uses New Builder
- `uses_survey`: Uses Survey
- `can_choose_template`: Can Choose Template
- `is_split_test_winner`: Is Split Test Winner
- `analytics_reset_at`: Analytics Reset At
- `conversions_count_including_children`: Conversions Count Including Children
- `opens_count_including_children`: Opens Count Including Children

### `list_form_subscribers`

**List Form Subscribers.** List the subscribers who signed up through a MailerLite form, given the form ID from list_forms. By default MailerLite returns active subscribers only; set status to list others. Cursor-paginated: pass meta.next_cursor back as cursor to get the next page. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form ID. The form ID, from list_forms. |
| `status` | string | no |  | Status. Only return subscribers with this status. MailerLite defaults to active. One of `"active"`, `"unsubscribed"`, `"unconfirmed"`, `"bounced"`, `"junk"`. |
| `limit` | number | no | `25` | Limit. Items to return (1-1000, default 25). |
| `cursor` | string | no |  | Cursor. The meta.next_cursor value from the previous page. Leave empty for the first page. |

Output fields:

- `data`: Subscribers
- `data[].id`: Subscriber ID
- `data[].email`: Email (email)
- `data[].status`: Status
- `data[].source`: Source
- `data[].sent`: Emails Sent (number)
- `data[].opens_count`: Opens Count (number)
- `data[].clicks_count`: Clicks Count (number)
- `data[].open_rate`: Open Rate (number)
- `data[].click_rate`: Click Rate (number)
- `data[].ip_address`: IP Address
- `data[].subscribed_at`: Subscribed At (datetime)
- `data[].unsubscribed_at`: Unsubscribed At (datetime)
- `data[].created_at`: Created At (datetime)
- `data[].updated_at`: Updated At (datetime)
- `data[].opted_in_at`: Opted In At (datetime)
- `data[].optin_ip`: Opt-in IP
- `data[].fields`: Fields (an object whose keys vary)
- `links`: Links
- `links.first`: First Page URL (url)
- `links.last`: Last Page URL (url)
- `links.prev`: Previous Page URL (url)
- `links.next`: Next Page URL (url)
- `meta`: Meta
- `meta.path`: Request Path (url)
- `meta.per_page`: Per Page (number)
- `meta.next_cursor`: Next Cursor
- `meta.prev_cursor`: Previous Cursor

### `list_webhooks`

**List Webhooks.** List the MailerLite webhooks in the account with their IDs, URLs, events and enabled state. Signing secrets are never returned. Webhooks created by Activepieces MailerLite triggers appear here too. Read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `data`: Webhooks
- `data[].id`: Webhook ID
- `data[].name`: Name
- `data[].url`: URL (url)
- `data[].events`: Events
- `data[].enabled`: Enabled (boolean)
- `data[].batchable`: Batchable (boolean)
- `data[].is_blocked`: Blocked (boolean)
- `data[].last_fired_at`: Last Fired At (datetime)
- `data[].response_code`: Last Response Code
- `data[].version`: Version
- `data[].created_at`: Created At (datetime)
- `data[].updated_at`: Updated At (datetime)
- `links`: Links
- `links.first`: First Page URL (url)
- `links.last`: Last Page URL (url)
- `links.prev`: Previous Page URL (url)
- `links.next`: Next Page URL (url)
- `meta`: Meta
- `meta.current_page`: Current Page (number)
- `meta.from`: From (number)
- `meta.to`: To (number)
- `meta.last_page`: Last Page (number)
- `meta.per_page`: Per Page (number)
- `meta.total`: Total (number)
- `meta.path`: Request Path (url)
- `meta.links`: Page Links
- `meta.links[].url`: URL (url)
- `meta.links[].label`: Label
- `meta.links[].page`: Page (number)
- `meta.links[].active`: Active (boolean)

### `get_webhook`

**Get Webhook.** Get one MailerLite webhook by ID: name, URL, subscribed events, enabled and batchable flags. The signing secret is never returned. Get the ID from list_webhooks. Read-only; returns a 404 error if the ID does not exist. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhook_id` | string | yes |  | Webhook ID. The webhook ID, from list_webhooks. |

Output fields:

- `id`: Webhook ID
- `name`: Name
- `url`: URL (url)
- `events`: Events
- `enabled`: Enabled (boolean)
- `batchable`: Batchable (boolean)
- `is_blocked`: Blocked (boolean)
- `last_fired_at`: Last Fired At (datetime)
- `response_code`: Last Response Code
- `version`: Version
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `create_webhook`

**Create Webhook.** Create a MailerLite webhook that POSTs the chosen events (for example subscriber.created) to a URL. The signing secret is never returned. Optionally set enabled and batchable. Not idempotent: each call creates another webhook, so check list_webhooks first. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The HTTPS URL MailerLite will POST events to. |
| `events` | array | yes |  | Events. The events that trigger the webhook. One of `"subscriber.created"`, `"subscriber.updated"`, `"subscriber.unsubscribed"`, `"subscriber.added_to_group"`, `"subscriber.removed_from_group"`, `"subscriber.bounced"`, `"subscriber.automation_triggered"`, `"subscriber.automation_completed"`, `"subscriber.spam_reported"`, `"subscriber.deleted"`, `"subscriber.active"`, `"campaign.sent"`, `"campaign.click"`, `"campaign.open"`. |
| `name` | string | no |  | Name. A name for the webhook. |
| `enabled` | string | no |  | Enabled. Whether the webhook is active. MailerLite defaults to enabled. One of `"true"`, `"false"`. |
| `batchable` | string | no |  | Batchable. Whether events are delivered in batches. One of `"true"`, `"false"`. |

Output fields:

- `id`: Webhook ID
- `name`: Name
- `url`: URL (url)
- `events`: Events
- `enabled`: Enabled (boolean)
- `batchable`: Batchable (boolean)
- `is_blocked`: Blocked (boolean)
- `last_fired_at`: Last Fired At (datetime)
- `response_code`: Last Response Code
- `version`: Version
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `update_webhook`

**Update Webhook.** Update a MailerLite webhook by ID, sending only the values you supply (name, URL, events, enabled, batchable); the rest are kept. A supplied events list replaces the current one. The signing secret is never returned. Get the ID from list_webhooks. Webhooks created by Activepieces MailerLite triggers are listed too; changing one can break that flow. At least one value is required. Idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhook_id` | string | yes |  | Webhook ID. The webhook ID, from list_webhooks. |
| `name` | string | no |  | Name. New webhook name. |
| `url` | string | no |  | URL. New HTTPS URL MailerLite will POST events to. |
| `events` | array | no |  | Events. Replaces the events that trigger the webhook. One of `"subscriber.created"`, `"subscriber.updated"`, `"subscriber.unsubscribed"`, `"subscriber.added_to_group"`, `"subscriber.removed_from_group"`, `"subscriber.bounced"`, `"subscriber.automation_triggered"`, `"subscriber.automation_completed"`, `"subscriber.spam_reported"`, `"subscriber.deleted"`, `"subscriber.active"`, `"campaign.sent"`, `"campaign.click"`, `"campaign.open"`. |
| `enabled` | string | no |  | Enabled. Whether the webhook is active. One of `"true"`, `"false"`. |
| `batchable` | string | no |  | Batchable. Whether events are delivered in batches. One of `"true"`, `"false"`. |

Output fields:

- `id`: Webhook ID
- `name`: Name
- `url`: URL (url)
- `events`: Events
- `enabled`: Enabled (boolean)
- `batchable`: Batchable (boolean)
- `is_blocked`: Blocked (boolean)
- `last_fired_at`: Last Fired At (datetime)
- `response_code`: Last Response Code
- `version`: Version
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `delete_webhook`

**Delete Webhook.** Permanently delete a MailerLite webhook by ID. Warning: webhooks created by Activepieces MailerLite triggers are listed too, and deleting one silently breaks that flow. Get the ID from list_webhooks. Not idempotent: a repeat call returns a 404 error. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhook_id` | string | yes |  | Webhook ID. The webhook ID, from list_webhooks. |

Output fields:

- `deleted`: Deleted (boolean)
- `webhook_id`: Webhook ID

### `list_timezones`

**List Timezones.** List the timezones MailerLite supports, with their IDs, names and UTC offsets. Read-only. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `data`: Timezones
- `data[].id`: Timezone ID
- `data[].name`: Name
- `data[].name_for_humans`: Display Name
- `data[].offset_name`: Offset Name
- `data[].offset`: Offset (number)

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

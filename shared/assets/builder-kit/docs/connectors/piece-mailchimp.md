# Mailchimp

All-in-One integrated marketing platform for managing audiences, sending campaigns, tracking engagement, and automating lifecycle communications.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mailchimp'
  version: '0.5.10'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `add_member_to_list`

**Add or Update Subscriber.** Upserts a member into a Mailchimp audience (list) keyed on the email address: creates the subscriber if absent (using the "status if new" value) or updates the existing record otherwise. Use to ensure a contact exists with given status, name, language, or VIP flag without checking first. Requires the target list and email; repeating with the same input is safe and converges to the same member state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Audience. Audience you want to add the contact to. A value the product loads from the provider, such as an id; write the value itself. |
| `email_address` | string | yes |  | Email Address. Email address for the subscriber. |
| `status_if_new` | string | yes |  | Status if New. Status for new subscribers. One of `"subscribed"`, `"unsubscribed"`, `"cleaned"`, `"pending"`, `"transactional"`. |
| `email_type` | string | no |  | Email Type. Type of email this member wants to receive. One of `"html"`, `"text"`. |
| `status` | string | no |  | Status. Current status of subscriber (for updates) One of `"subscribed"`, `"unsubscribed"`, `"cleaned"`, `"pending"`, `"transactional"`. |
| `first_name` | string | no |  | First Name. First name of the subscriber. |
| `last_name` | string | no |  | Last Name. Last name of the subscriber. |
| `language` | string | no |  | Language. Subscriber language (e.g., "en", "es", "fr") |
| `vip` | boolean | no | `false` | VIP. VIP status for subscriber. |
| `skip_merge_validation` | boolean | no | `false` | Skip Merge Validation. Accept member data without merge field values even if required. |

### `add_note_to_subscriber`

**Add Note to Subscriber.** Appends an internal note to a subscriber, identified by email within a given audience (list). Use to record context or annotations on a contact. Not idempotent: each call adds a new note even if the content is identical. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Audience. Audience you want to add the contact to. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email Address. The email address of the subscriber to add a note to. |
| `note` | string | yes |  | Note Content. The note content to add to the subscriber. |

### `add_subscriber_to_tag`

**Add Subscriber to Tag.** Activates a tag on a subscriber, identified by email within a given audience (list); the tag is created if it does not already exist. Use to segment or label a contact. Idempotent: re-applying an already-active tag leaves the member state unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Audience. Audience you want to add the contact to. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email Address. The email address of the subscriber to add to the tag. |
| `tag_name` | string | yes |  | Tag Name. The name of the tag to add the subscriber to. |

### `remove_subscriber_from_tag`

**Remove Subscriber from Tag.** Deactivates a tag on a subscriber, identified by email within a given audience (list). Use to un-segment or un-label a contact. Idempotent: removing a tag the member does not have leaves the state unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Audience. Audience you want to add the contact to. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email Address. The email address of the subscriber to remove from the tag. |
| `tag_name` | string | yes |  | Tag Name. The name of the tag to remove the subscriber from. |

### `update_member_in_list`

**Update Member in an Audience (List).** Updates the subscription status (subscribed, unsubscribed, cleaned, pending, transactional) of an existing member in an audience (list), identified by email. Use to change a known contact's status; the member must already exist, or the call fails. Idempotent: setting the same status repeatedly converges to that state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Email of the new contact. |
| `list_id` | string | yes |  | Audience. Audience you want to add the contact to. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | yes |  | Status. One of `"subscribed"`, `"unsubscribed"`, `"cleaned"`, `"pending"`, `"transactional"`. |

### `create_campaign`

**Create Campaign.** Creates a new draft campaign of a chosen type (regular, plain-text, A/B, RSS, or variate) targeting an audience (list), and optionally sets its content from inline HTML, a hosted URL, or a template depending on the selected content type. Use to set up a campaign for later sending; this does not send it. Not idempotent: each call creates a distinct campaign. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_type` | string | yes |  | Campaign Type. The type of campaign to create. One of `"regular"`, `"plaintext"`, `"ab"`, `"rss"`, `"variate"`. |
| `list_id` | string | yes |  | Audience. Audience you want to add the contact to. A value the product loads from the provider, such as an id; write the value itself. |
| `subject_line` | string | yes |  | Subject Line. The subject line for the campaign. |
| `title` | string | yes |  | Campaign Title. The title of the campaign. |
| `from_name` | string | yes |  | From Name. The name that will appear in the "From" field. |
| `from_email` | string | yes |  | From Email. The email address that will appear in the "From" field. |
| `reply_to` | string | yes |  | Reply To Email. The email address that will receive replies. |
| `to_name` | string | no |  | To Name. The name that will appear in the "To" field (e.g., *\|FNAME\|*) |
| `content_type` | string | yes |  | Content Type. How the campaign content is put together. One of `"template"`, `"html"`, `"url"`, `"multichannel"`. |
| `content_url` | string | no |  | Content URL. The URL where the campaign content is hosted (required if content_type is "url") |
| `template_id` | string | no |  | Template ID. The ID of the template to use (required if content_type is "template") |
| `html_content` | string | no |  | HTML Content. The HTML content for the campaign (required if content_type is "html") |

### `get_campaign_report`

**Get Campaign Report.** Retrieves the analytics report for a single sent campaign by campaign ID, covering opens, clicks, bounces, unsubscribes, and engagement metrics; optional field include/exclude lists narrow the payload. Use to read performance for a campaign that has already been sent. Read-only and idempotent. Returns a not-found result if the campaign has not been sent or the ID is wrong. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | string | yes |  | Campaign. Select the campaign to get information for. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | string | no |  | Include Fields. Comma-separated list of fields to return (e.g., "opens.unique_opens,clicks.click_rate") |
| `exclude_fields` | string | no |  | Exclude Fields. Comma-separated list of fields to exclude (e.g., "timeseries,_links") |

### `create_audience`

**Create Audience.** Creates a new audience (list) in the Mailchimp account, including the required physical contact address, permission reminder, and default campaign sender settings. Use to provision a brand-new list to hold subscribers. Not idempotent: each call creates a separate audience even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | List Name. The name of the list. |
| `company` | string | yes |  | Company. Company name for list contact information. |
| `address1` | string | yes |  | Address Line 1. Street address for list contact information. |
| `address2` | string | no |  | Address Line 2. Additional address information (optional) |
| `city` | string | yes |  | City. City for list contact information. |
| `state` | string | no |  | State/Province. State or province for list contact information. |
| `zip` | string | no |  | ZIP/Postal Code. ZIP or postal code for list contact information. |
| `country` | string | yes |  | Country. Country for list contact information. |
| `phone` | string | no |  | Phone. Phone number for list contact information (optional) |
| `permission_reminder` | string | yes | `"You are receiving this email because you signed up for updates from us."` | Permission Reminder. The permission reminder for the list. |
| `from_name` | string | yes |  | Default From Name. Default from name for campaigns. |
| `from_email` | string | yes |  | Default From Email. Default from email address for campaigns. |
| `subject` | string | yes |  | Default Subject. Default subject line for campaigns. |
| `language` | string | yes | `"en"` | Language. Default language for campaigns (e.g., "en", "es", "fr") |
| `email_type_option` | boolean | no | `true` | Email Type Option. Whether the list supports multiple email formats (HTML/plain text) |
| `use_archive_bar` | boolean | no | `false` | Use Archive Bar. Whether campaigns use the Archive Bar in archives by default. |
| `notify_on_subscribe` | string | no |  | Notify on Subscribe. Email address to send subscribe notifications to (optional) |
| `notify_on_unsubscribe` | string | no |  | Notify on Unsubscribe. Email address to send unsubscribe notifications to (optional) |
| `double_optin` | boolean | no | `false` | Double Opt-in. Whether to require subscriber confirmation via email. |
| `marketing_permissions` | boolean | no | `false` | Marketing Permissions. Whether the list has marketing permissions (GDPR) enabled. |

### `archive_subscriber`

**Archive Subscriber.** Archives a member from an audience (list); the identifier accepts an MD5 hash of the lowercase email, the raw email (auto-hashed), or a contact_id. Use to remove a contact from active sending while preserving their record. Idempotent: archiving an already-archived or absent member converges to the same state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Audience. Audience you want to add the contact to. A value the product loads from the provider, such as an id; write the value itself. |
| `subscriber_hash` | string | yes |  | Subscriber Hash or Email. MD5 hash of the lowercase email address, email address, or contact_id. |

### `unsubscribe_email`

**Unsubscribe Email.** Sets an email address to unsubscribed status within an audience (list) via a batch upsert; with "update existing" on, it changes an existing member, otherwise it can add the address as unsubscribed. Use to opt a contact out of a specific audience. Idempotent: repeating converges to the same unsubscribed state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Audience. Audience you want to add the contact to. A value the product loads from the provider, such as an id; write the value itself. |
| `email_address` | string | yes |  | Email Address. Email address to unsubscribe. |
| `skip_merge_validation` | boolean | no | `false` | Skip Merge Validation. Accept member data without merge field values even if required. |
| `skip_duplicate_check` | boolean | no | `false` | Skip Duplicate Check. Ignore duplicates in the request. |
| `update_existing` | boolean | no | `true` | Update Existing. Change existing members subscription status. |

### `find_campaign`

**Find Campaign.** Searches all campaigns in the account by a free-text query (matching titles, subject lines, and related fields) and returns the matches. Use to locate a campaign by name or wording before reading or acting on it. Read-only and idempotent; a query is required. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Search terms to find campaigns. |
| `fields` | string | no |  | Fields. Comma-separated list of fields to return. |
| `exclude_fields` | string | no |  | Exclude Fields. Comma-separated list of fields to exclude. |

### `find_customer`

**Find Customer.** Looks up e-commerce customers in a specified connected store by email address, with optional pagination and field filtering. Use to retrieve a store customer record before referencing or syncing it. Requires a store and email; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `store_id` | string | yes |  | Store. Select the e-commerce store. A value the product loads from the provider, such as an id; write the value itself. |
| `email_address` | string | yes |  | Email Address. Email address to search for. |
| `fields` | string | no |  | Include Fields. Comma-separated list of fields to return. |
| `exclude_fields` | string | no |  | Exclude Fields. Comma-separated list of fields to exclude. |
| `count` | number | no | `10` | Count. Number of records to return (max 1000) |
| `offset` | number | no | `0` | Offset. Number of records to skip for pagination. |

### `find_tag`

**Find Tag.** Searches the tags defined on an audience (list): an empty tag-name fetches all tags, while a provided name filters to matching tags. Use to discover available tags or confirm a tag exists before tagging contacts. Requires the target list; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Audience. Audience you want to add the contact to. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Tag Name. Search query to filter tags (optional - if empty, returns all tags) |

### `find_subscriber`

**Find Subscriber.** Looks up a subscriber by exact email, returning merge fields, interests, and activity data: when an audience (list) is specified it checks that one list, and when left empty it searches every list in the account. Use to find a contact and inspect their profile or status. Requires the email; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Audience. Audience you want to add the contact to. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email Address. Email address of the subscriber to search for. |
| `include_fields` | array | no |  | Include Fields. Fields to include in the response (leave empty for all fields). Use dot notation for nested fields (e.g., "merge_fields.FNAME") |
| `exclude_fields` | array | no |  | Exclude Fields. Fields to exclude from the response. Use dot notation for nested fields. |

### `create_tag`

**Create Tag.** Creates a new tag on an audience (list) so it can later be applied to subscribers. Use to set up a tag ahead of tagging contacts. Not idempotent: calling again with the same name creates a duplicate tag. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Audience. Audience you want to add the contact to. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Tag Name. The name of the tag to create. |

### `send_campaign`

**Send Campaign.** Sends an existing draft campaign to its configured recipients immediately (RSS campaigns follow their schedule instead). Use once the campaign is fully set up; there is no undo, so confirm the campaign content and audience beforehand. Not idempotent: calling again on an already-sent campaign fails. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | string | yes |  | Campaign. Select the draft campaign to send. A value the product loads from the provider, such as an id; write the value itself. |

### `create_custom_event`

**Create Custom Event.** Records a named event (with optional properties) against an existing subscriber, identified by email, in an audience (list). Use to feed subscriber behavior into automations or segments. Not idempotent: each call logs a new, distinct event occurrence. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | Audience. Audience you want to add the contact to. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email Address. The email address of the subscriber to log the event for. |
| `name` | string | yes |  | Event Name. The name of the event (lowercase letters, numbers, and underscores only, e.g. "purchased_item") |
| `properties` | object | no |  | Properties. Optional key/value data to attach to the event. |

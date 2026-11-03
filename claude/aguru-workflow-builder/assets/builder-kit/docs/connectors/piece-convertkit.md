# ConvertKit

Email marketing for creators

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-convertkit'
  version: '0.4.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Secret

> Enter your API Secret key. In Kit, go to Settings > Developer, open the V3 Key section and copy the API Secret.

## Actions

### `subscribers_get_subscriber_by_id`

**Get Subscriber By Id.** Fetches one subscriber record (email, name, state, custom fields) by numeric subscriber ID. Use Get Subscriber By Email when only an address is known. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriberId` | string | yes |  | Subscriber ID. The subscriber ID. |

Output fields:

- `id`: Subscriber ID (number)
- `first_name`: First Name
- `email_address`: Email Address (email)
- `state`: State
- `created_at`: Created At (datetime)
- `fields`: Custom Fields (an object whose keys vary)

### `subscribers_get_subscriber_by_email`

**Get Subscriber By Email.** Looks up a single subscriber by email address and returns the full record including the numeric subscriber ID. Prefer this over Get Subscriber By Id when the ID is unknown. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_address` | string | yes |  | Email. The email of the subscriber. |

Output fields:

- `id`: Subscriber ID (number)
- `first_name`: First Name
- `email_address`: Email Address (email)
- `state`: State
- `created_at`: Created At (datetime)
- `fields`: Custom Fields (an object whose keys vary)

### `subscribers_list_subscribers`

**List Subscribers.** Lists subscribers with optional filters (created/updated date ranges, email address), paging, and sorting. Use it for bulk audits or fuzzy searches; for one known subscriber prefer the Get Subscriber actions. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no | `1` | Page. Page number. Each page of results will contain up to 50 subscribers. |
| `sortOrder` | string | yes | `"asc"` | Sort Order. Sort order. One of `"asc"`, `"desc"`. |
| `sortField` | string | no |  | Sort Field. Sort field. |
| `from` | ISO date-time string | no |  | From. Return subscribers created after this date. |
| `to` | ISO date-time string | no |  | To. Return subscribers created before this date. |
| `updatedFrom` | ISO date-time string | no |  | Updated From. Return subscribers updated after this date. |
| `updatedTo` | ISO date-time string | no |  | Updated To. Return subscribers updated before this date. |
| `emailAddress` | string | yes |  | Email. The email of the subscriber. |

Output fields:

- `[].id`: Subscriber ID (number)
- `[].first_name`: First Name
- `[].email_address`: Email Address (email)
- `[].state`: State
- `[].created_at`: Created At (datetime)
- `[].fields`: Custom Fields (an object whose keys vary)

### `subscribers_update_subscriber`

**Update Subscriber.** Updates a subscriber email address, first name, or custom field values by numeric subscriber ID. Idempotent — repeating the same update leaves the subscriber in the same state. It cannot change subscription status; use Unsubscribe Subscriber for that. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriberId` | string | yes |  | Subscriber ID. The subscriber ID. |
| `emailAddress` | string | no |  | Email. The email of the subscriber. |
| `firstName` | string | no |  | First Name. The first name of the subscriber. |
| `fields` | object | no |  | Custom Fields. The custom fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Subscriber ID (number)
- `first_name`: First Name
- `email_address`: Email Address (email)
- `state`: State
- `created_at`: Created At (datetime)
- `fields`: Custom Fields (an object whose keys vary)

### `subscribers_unsubscribe_subscriber`

**Unsubscribe Subscriber.** Unsubscribes the given email address from all emails in the account; this is the only removal mechanism, as there is no delete-subscriber action. Treated as non-idempotent — a retry may error once the address is already unsubscribed, though the end state is the same. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The email of the subscriber. |

Output fields:

- `id`: Subscriber ID (number)
- `first_name`: First Name
- `email_address`: Email Address (email)
- `state`: State
- `created_at`: Created At (datetime)
- `fields`: Custom Fields (an object whose keys vary)

### `subscribers_list_tags_by_email`

**List Tags By Email.** Lists all tags applied to a subscriber, looked up by email address (the email is resolved to a subscriber ID internally). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_address` | string | yes |  | Email. The email of the subscriber. |

Output fields:

- `[].id`: Tag ID (number)
- `[].name`: Name
- `[].created_at`: Created At (datetime)

### `subscribers_list_tags_by_subscriber_id`

**List Tags By Subscriber Id.** Lists all tags currently applied to a subscriber, looked up by numeric subscriber ID. Use List Tags By Email when only an address is known. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriberId` | string | yes |  | Subscriber ID. The subscriber ID. |

Output fields:

- `[].id`: Tag ID (number)
- `[].name`: Name
- `[].created_at`: Created At (datetime)

### `create_webhook`

**Add Webhook.** Registers a webhook automation that POSTs to a target URL whenever the chosen ConvertKit event fires (e.g. subscriber activated, tag added); some events also need an event parameter such as a tag or form ID. Not idempotent — each call registers another webhook, so keep the returned rule ID for later deletion. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `targetUrl` | string | yes |  | Target URL. The URL that will be called when the webhook is triggered. |
| `event` | string | yes |  | Event. The event that will trigger the webhook. One of `"subscriber.subscriber_activate"`, `"subscriber.subscriber_unsubscribe"`, `"subscriber.subscriber_bounce"`, `"subscriber.subscriber_complain"`, `"subscriber.form_subscribe"`, `"subscriber.course_subscribe"`, `"subscriber.course_complete"`, `"subscriber.link_click"`, `"subscriber.product_purchase"`, `"subscriber.tag_add"`, `"subscriber.tag_remove"`, `"purchase.purchase_create"`. |
| `eventParameter` | object | no |  | Event Parameter. The required parameter for the event. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Webhook ID (number)
- `target_url`: Target URL (url)
- `event`: Event
- `event.name`: Event Name
- `event.tag_id`: Tag ID (number)
- `event.initiator_value`: Link URL (url)
- `account_id`: Account ID (number)

### `destroy_webhook`

**Delete Webhook.** Deletes a previously registered webhook automation by its webhook rule ID (returned when the webhook was created). Not retry-safe — a repeat call fails once the webhook is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhookId` | number | yes |  | Webhook Id. The webhook rule id. |

### `custom_fields_list_fields`

**List Custom Fields.** Lists every custom field defined on the account, including each field id, key, and label. Use it to discover field keys before setting custom field values on subscribers. Takes no inputs; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Custom Field ID (number)
- `[].key`: Key
- `[].label`: Label
- `[].name`: Internal Name

### `custom_fields_create_field`

**Create Custom Field.** Creates one or more new custom fields from an array of labels (ConvertKit derives each field key from its label). Not idempotent — repeating the call creates duplicate fields, so check List Custom Fields first. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fields` | array | yes |  | Fields. The custom fields. |

Output fields:

- `id`: Custom Field ID (number)
- `key`: Key
- `label`: Label
- `name`: Internal Name

### `custom_fields_update_field`

**Custom Fields: Update Field.** Renames an existing custom field, selected by its current label, to a new label. Not idempotent — once the rename succeeds the old label no longer matches, so a retry with the same inputs fails. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label` | string | yes |  | Custom Label. A value the product loads from the provider, such as an id; write the value itself. |
| `new_label` | string | yes |  | New Label. The new label for the custom field. |

Output fields:

- `success`: Success (boolean)
- `status`: Status Code (number)
- `message`: Message

### `custom_fields_delete_field`

**Custom Fields: Delete Field.** Deletes a custom field by label, removing it and its stored values from all subscribers. Destructive and not retry-safe — a repeat call fails once the field is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label` | string | yes |  | Custom Label. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `status`: Status Code (number)
- `message`: Message

### `broadcasts_list_broadcasts`

**List Broadcasts.** Retrieves a page of broadcasts (one-off emails) in the ConvertKit account, 50 per page. Use it to find a broadcast ID before getting, updating, or deleting one. Read-only and idempotent; pass a page number to fetch beyond the first 50. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no | `1` | Page. Page number. Each page of results will contain up to 50 broadcasts. |

Output fields:

- `[].id`: Broadcast ID (number)
- `[].subject`: Subject
- `[].created_at`: Created At (datetime)

### `broadcasts_create_broadcast`

**Create Broadcast.** Creates a new email broadcast (one-off email), optionally scheduled via the send-at field; without it the broadcast is saved unsent. Not idempotent — every call creates another broadcast, so do not retry blindly. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content` | string | no |  | Content. The broadcast's email content - this can contain text and simple HTML markdown (such as h1, img or p tags) |
| `description` | string | no |  | Description. An internal description of this broadcast. |
| `emailAddress` | string | no |  | Email Address. Sending email address; leave blank to use your account's default sending email address. |
| `emailLayoutTemplate` | string | no |  | Email Layout Template. Name of the email template to use; leave blank to use your account's default email template. |
| `isPublic` | boolean | no | `false` | Public. Specifies whether or not this is a public post. |
| `publishedAt` | ISO date-time string | no |  | Published At. Specifies the time that this post was published (applicable only to public posts) |
| `sendAt` | ISO date-time string | no |  | Send At. Time that this broadcast should be sent; leave blank to create a draft broadcast. If set to a future time, this is the time that the broadcast will be scheduled to send. |
| `subject` | string | no |  | Subject. The broadcast email's subject. |
| `thumbnailAlt` | string | no |  | Thumbnail Alt. Specify the ALT attribute of the public thumbnail image (applicable only to public posts) |
| `thumbnailUrl` | string | no |  | Thumbnail Url. Specify the URL of the thumbnail image to accompany the broadcast post (applicable only to public posts) |

Output fields:

- `id`: Broadcast ID (number)
- `subject`: Subject
- `description`: Description
- `content`: Content (html)
- `public`: Public (boolean)
- `published_at`: Published At (datetime)
- `send_at`: Send At (datetime)
- `email_address`: From Email (email)
- `email_layout_template`: Email Template
- `thumbnail_url`: Thumbnail URL (image)
- `thumbnail_alt`: Thumbnail Alt Text
- `created_at`: Created At (datetime)

### `broadcasts_get_broadcast`

**Get Broadcast.** Fetches a single broadcast by its ID, returning its content and settings. Use when the broadcast ID is already known (e.g. from List Broadcasts); for delivery metrics use Broadcast Stats instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `broadcastId` | string | yes |  | Broadcast Id. The broadcast id. |

Output fields:

- `id`: Broadcast ID (number)
- `subject`: Subject
- `description`: Description
- `content`: Content (html)
- `public`: Public (boolean)
- `published_at`: Published At (datetime)
- `send_at`: Send At (datetime)
- `email_address`: From Email (email)
- `email_layout_template`: Email Template
- `thumbnail_url`: Thumbnail URL (image)
- `thumbnail_alt`: Thumbnail Alt Text
- `created_at`: Created At (datetime)

### `broadcasts_update_broadcast`

**Update Broadcast.** Updates the content, subject, scheduling, or other fields of an existing broadcast by broadcast ID. Idempotent — repeating the same update leaves the broadcast in the same state. Requires a valid broadcast ID from List Broadcasts. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `broadcastId` | string | yes |  | Broadcast Id. The broadcast id. |
| `content` | string | no |  | Content. The broadcast's email content - this can contain text and simple HTML markdown (such as h1, img or p tags) |
| `description` | string | no |  | Description. An internal description of this broadcast. |
| `emailAddress` | string | no |  | Email Address. Sending email address; leave blank to use your account's default sending email address. |
| `emailLayoutTemplate` | string | no |  | Email Layout Template. Name of the email template to use; leave blank to use your account's default email template. |
| `isPublic` | boolean | no | `false` | Public. Specifies whether or not this is a public post. |
| `publishedAt` | ISO date-time string | no |  | Published At. Specifies the time that this post was published (applicable only to public posts) |
| `sendAt` | ISO date-time string | no |  | Send At. Time that this broadcast should be sent; leave blank to create a draft broadcast. If set to a future time, this is the time that the broadcast will be scheduled to send. |
| `subject` | string | no |  | Subject. The broadcast email's subject. |
| `thumbnailAlt` | string | no |  | Thumbnail Alt. Specify the ALT attribute of the public thumbnail image (applicable only to public posts) |
| `thumbnailUrl` | string | no |  | Thumbnail Url. Specify the URL of the thumbnail image to accompany the broadcast post (applicable only to public posts) |

Output fields:

- `id`: Broadcast ID (number)
- `subject`: Subject
- `description`: Description
- `content`: Content (html)
- `public`: Public (boolean)
- `published_at`: Published At (datetime)
- `send_at`: Send At (datetime)
- `email_address`: From Email (email)
- `email_layout_template`: Email Template
- `thumbnail_url`: Thumbnail URL (image)
- `thumbnail_alt`: Thumbnail Alt Text
- `created_at`: Created At (datetime)

### `broadcasts_delete_broadcast`

**Delete Broadcast.** Permanently deletes a broadcast by ID. Destructive and not retry-safe — a repeat call fails once the broadcast is gone, so confirm the ID via List Broadcasts first. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `broadcastId` | string | yes |  | Broadcast Id. The broadcast id. |

Output fields:

- `success`: Success (boolean)
- `status`: Status Code (number)
- `message`: Message

### `broadcasts_broadcast_stats`

**Broadcast Stats.** Retrieves delivery and engagement statistics (recipients, opens, clicks, unsubscribes) for one broadcast by ID. Pick this over Get Broadcast when performance metrics are needed rather than content. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `broadcastId` | string | yes |  | Broadcast Id. The broadcast id. |

Output fields:

- `id`: Broadcast ID (number)
- `stats`: Stats
- `stats.status`: Status
- `stats.recipients`: Recipients (number)
- `stats.emails_opened`: Emails Opened (number)
- `stats.open_rate`: Open Rate (number)
- `stats.emails_clicked`: Emails Clicked (number)
- `stats.total_clicks`: Total Clicks (number)
- `stats.click_rate`: Click Rate (number)
- `stats.unsubscribes`: Unsubscribes (number)
- `stats.unsubscribe_rate`: Unsubscribe Rate (number)
- `stats.progress`: Progress (number)
- `stats.show_total_clicks`: Show Total Clicks (boolean)
- `stats.open_tracking_disabled`: Open Tracking Disabled (boolean)
- `stats.click_tracking_disabled`: Click Tracking Disabled (boolean)

### `forms_list_forms`

**List Forms.** Lists all forms and landing pages in the account with their IDs and names. Use it to find a form ID before adding subscribers to a form or listing form subscriptions. Takes no inputs; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Form ID (number)
- `[].name`: Name
- `[].type`: Type
- `[].format`: Format
- `[].embed_url`: Embed URL (url)
- `[].embed_js`: Embed Script URL (url)
- `[].archived`: Archived (boolean)
- `[].uid`: UID
- `[].created_at`: Created At (datetime)

### `forms_add_subscriber_to_form`

**Add Subscriber To Form.** Subscribes an email address to a specific form, optionally setting first name, tags, and custom field values. This is the standard way to add a new subscriber in ConvertKit. Effectively idempotent — re-subscribing the same email to the same form upserts rather than creating a duplicate. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. The email of the subscriber. |
| `firstName` | string | no |  | First Name. The first name of the subscriber. |
| `tags` | array | no |  | Tags. Choose the Tags. Values the product loads from the provider, such as ids; write an array of them. |
| `fields` | object | no |  | Custom Fields. The custom fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Subscription ID (number)
- `state`: State
- `created_at`: Created At (datetime)
- `source`: Source
- `referrer`: Referrer (url)
- `subscribable_id`: Subscribed To ID (number)
- `subscribable_type`: Subscribed To Type
- `subscriber`: Subscriber
- `subscriber.id`: Subscriber ID (number)
- `subscriber.first_name`: First Name
- `subscriber.email_address`: Email Address (email)
- `subscriber.state`: State
- `subscriber.created_at`: Created At (datetime)
- `subscriber.fields`: Custom Fields (an object whose keys vary)

### `forms_list_form_subscriptions`

**List Form Subscriptions.** Lists the subscriptions for one form by form ID, one entry per subscriber who signed up through it. Use it to audit who joined via a given form. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |

### `sequences_list_sequences`

**List Sequences.** Lists all sequences (automated email courses) in the account with their IDs and names. Use it to find a sequence ID before enrolling subscribers or listing enrollments. Takes no inputs; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Sequence ID (number)
- `[].name`: Name
- `[].active`: Active (boolean)
- `[].available`: Available (boolean)
- `[].hold`: On Hold (boolean)
- `[].repeat`: Repeat (boolean)
- `[].created_at`: Created At (datetime)

### `sequences_add_subscriber_to_sequence`

**Add Subscriber To Sequence.** Enrolls an email address in a sequence so it starts receiving that automated email course, optionally setting first name, tags, and custom field values. Effectively idempotent — re-subscribing the same email to the same sequence upserts instead of duplicating the enrollment. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sequenceId` | string | yes |  | Sequence. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. The email of the subscriber. |
| `firstName` | string | no |  | First Name. The first name of the subscriber. |
| `tags` | array | no |  | Tags. Choose the Tags. Values the product loads from the provider, such as ids; write an array of them. |
| `fields` | object | no |  | Custom Fields. The custom fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Subscription ID (number)
- `state`: State
- `created_at`: Created At (datetime)
- `source`: Source
- `referrer`: Referrer (url)
- `subscribable_id`: Subscribed To ID (number)
- `subscribable_type`: Subscribed To Type
- `subscriber`: Subscriber
- `subscriber.id`: Subscriber ID (number)
- `subscriber.first_name`: First Name
- `subscriber.email_address`: Email Address (email)
- `subscriber.state`: State
- `subscriber.created_at`: Created At (datetime)
- `subscriber.fields`: Custom Fields (an object whose keys vary)

### `sequences_list_subscriptions_to_sequence`

**List Subscriptions To Sequence.** Lists all subscriber enrollments for one sequence by sequence ID. Use List Sequences first to find the ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sequenceId` | string | yes |  | Sequence. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `[].id`: Subscription ID (number)
- `[].state`: State
- `[].created_at`: Created At (datetime)
- `[].source`: Source
- `[].referrer`: Referrer (url)
- `[].subscribable_id`: Subscribed To ID (number)
- `[].subscribable_type`: Subscribed To Type
- `[].subscriber`: Subscriber
- `[].subscriber.id`: Subscriber ID (number)
- `[].subscriber.first_name`: First Name
- `[].subscriber.email_address`: Email Address (email)
- `[].subscriber.state`: State
- `[].subscriber.created_at`: Created At (datetime)
- `[].subscriber.fields`: Custom Fields (an object whose keys vary)

### `tags_list_tags`

**List Tags.** Lists every tag in the account with its ID and name. Use it to find a tag ID before tagging or untagging subscribers, or before listing a tag's subscriptions. Takes no inputs; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Tag ID (number)
- `[].name`: Name
- `[].created_at`: Created At (datetime)

### `tags_create_tag`

**Create Tag.** Creates a new tag with the given name. Not idempotent — calling it again can create a duplicate, so check List Tags for an existing tag first. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The name of the tag. |

Output fields:

- `id`: Tag ID (number)
- `name`: Name
- `created_at`: Created At (datetime)

### `tags_tag_subscriber`

**Tag Subscriber.** Applies one or more existing tags to a subscriber by email address (subscribing the email to the first tag and attaching the rest), optionally setting first name and custom fields; at least one tag is required. Effectively idempotent — re-applying the same tags converges to the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The email of the subscriber. |
| `firstName` | string | no |  | First Name. The first name of the subscriber. |
| `tags` | array | yes |  | Tags. Choose the Tags. Values the product loads from the provider, such as ids; write an array of them. |
| `fields` | object | no |  | Custom Fields. The custom fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Subscription ID (number)
- `state`: State
- `created_at`: Created At (datetime)
- `source`: Source
- `referrer`: Referrer (url)
- `subscribable_id`: Subscribed To ID (number)
- `subscribable_type`: Subscribed To Type
- `subscriber`: Subscriber
- `subscriber.id`: Subscriber ID (number)
- `subscriber.first_name`: First Name
- `subscriber.email_address`: Email Address (email)
- `subscriber.state`: State
- `subscriber.created_at`: Created At (datetime)
- `subscriber.fields`: Custom Fields (an object whose keys vary)

### `tags_remove_tag_from_subscriber_by_email`

**Remove Tag From Subscriber By Email.** Removes a single tag from a subscriber identified by email address. Use the By Id variant when the numeric subscriber ID is already known. Treated as non-idempotent — a retry may error once the tag is already removed, though the end state is the same. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The email of the subscriber. |
| `tagId` | string | yes |  | Tag. The tag to remove. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Tag ID (number)
- `name`: Name
- `created_at`: Created At (datetime)

### `tags_remove_tag_from_subscriber_by_id`

**Remove Tag From Subscriber By Id.** Removes a single tag from a subscriber identified by numeric subscriber ID. Use the By Email variant when only an address is known. Treated as non-idempotent — a retry may error once the tag is already removed. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriberId` | string | yes |  | Subscriber ID. The subscriber ID. |
| `tagId` | string | yes |  | Tag. The tag to remove. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Tag ID (number)
- `name`: Name
- `created_at`: Created At (datetime)

### `tags_list_subscriptions_to_tag`

**List Subscriptions To Tag.** Lists the subscribers subscribed to a specific tag, with paging, sort order, and subscriber-state filtering. Use List Tags first to find the tag ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tagId` | string | yes |  | Tag. Choose a Tag. A value the product loads from the provider, such as an id; write the value itself. |
| `page` | number | no | `1` | Page. Each page of results will contain up to 50 tags. |
| `sortOrder` | string | no |  | Sort Order. Sort order. One of `"asc"`, `"desc"`. |
| `subscriberState` | string | no |  | Subscriber State. Subscriber state. One of `"active"`, `"cancelled"`. |

Output fields:

- `[].id`: Subscription ID (number)
- `[].state`: State
- `[].created_at`: Created At (datetime)
- `[].source`: Source
- `[].referrer`: Referrer (url)
- `[].subscribable_id`: Subscribed To ID (number)
- `[].subscribable_type`: Subscribed To Type
- `[].subscriber`: Subscriber
- `[].subscriber.id`: Subscriber ID (number)
- `[].subscriber.first_name`: First Name
- `[].subscriber.email_address`: Email Address (email)
- `[].subscriber.state`: State
- `[].subscriber.created_at`: Created At (datetime)
- `[].subscriber.fields`: Custom Fields (an object whose keys vary)

### `purchases_list_purchases`

**List Purchases.** Retrieves a paginated list of all purchase records in the account; pass a page number to go beyond the first page. For purchases scoped to one subscriber, product, form, or sequence, prefer the dedicated filtered list actions. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | yes | `1` | Page. Page number. Each page of results will contain up to 50 purchases. |

Output fields:

- `[].id`: Purchase ID (number)
- `[].transaction_id`: Transaction ID
- `[].status`: Status
- `[].email_address`: Email Address (email)
- `[].currency`: Currency
- `[].transaction_time`: Transaction Time (datetime)
- `[].subtotal`: Subtotal (number)
- `[].discount`: Discount (number)
- `[].tax`: Tax (number)
- `[].total`: Total (number)
- `[].products`: Products
- `[].products[].pid`: Product ID
- `[].products[].lid`: Line Item ID
- `[].products[].name`: Name
- `[].products[].sku`: SKU
- `[].products[].unit_price`: Unit Price (number)
- `[].products[].quantity`: Quantity (number)

### `purchases_get_purchase_by_id`

**Get Purchase By Id.** Fetches one purchase record by its ConvertKit purchase ID (not the external transaction ID). Use List Purchases first if only the transaction details are known. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `purchaseId` | string | yes |  | Purchase ID. The purchase ID. |

Output fields:

- `id`: Purchase ID (number)
- `transaction_id`: Transaction ID
- `status`: Status
- `email_address`: Email Address (email)
- `currency`: Currency
- `transaction_time`: Transaction Time (datetime)
- `subtotal`: Subtotal (number)
- `discount`: Discount (number)
- `tax`: Tax (number)
- `total`: Total (number)
- `products`: Products
- `products[].pid`: Product ID
- `products[].lid`: Line Item ID
- `products[].name`: Name
- `products[].sku`: SKU
- `products[].unit_price`: Unit Price (number)
- `products[].quantity`: Quantity (number)

### `purchases_create_purchase`

**Create Purchase.** Records a purchase with a single product line item against a subscriber email, including transaction ID, status, currency, and amounts. Use Create Multiple Purchases instead when an order contains several products. Not idempotent — repeat calls create duplicate purchase records. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transactionId` | number | yes |  | Transaction ID. The transaction ID. |
| `transactionTime` | ISO date-time string | no |  | Transaction Time. The transaction time. |
| `emailAddress` | string | yes |  | Email Address. The email address of the subscriber. |
| `firstName` | string | no |  | First Name. The first name of the subscriber. |
| `status` | string | no |  | Status. The status of the purchase. One of `"paid"`, `"pending"`, `"failed"`. |
| `currency` | string | yes |  | Currency. The currency of the purchase. One of `"USD"`, `"JPY"`, `"GBP"`, `"EUR"`, `"CAD"`, `"AUD"`, `"NZD"`, `"CHF"`, `"HKD"`, `"SGD"`, `"SEK"`, `"DKK"`, `"PLN"`, `"NOK"`, `"HUF"`, `"CZK"`, `"ILS"`, `"MXN"`, `"MYR"`, `"BRL"`, `"PHP"`, `"TWD"`, `"THB"`, `"TRY"`, `"RUB"` and 5 more. |
| `subtotal` | number | no |  | Subtotal. The subtotal. |
| `shipping` | number | no |  | Shipping. The shipping. |
| `discount` | number | no |  | Discount. The discount. |
| `tax` | number | no |  | Tax. The tax. |
| `total` | number | no |  | Total. The total. |
| `pid` | number | yes |  | Product ID. The product ID. |
| `lid` | number | yes |  | Line Item ID. The line item ID. |
| `name` | string | yes |  | Name. The name of the product. |
| `sku` | string | no |  | SKU. The SKU of the product. |
| `unit_price` | number | yes |  | Unit Price. The unit price of the product. |
| `quantity` | number | yes |  | Quantity. The quantity of the product. |

Output fields:

- `id`: Purchase ID (number)
- `transaction_id`: Transaction ID
- `status`: Status
- `email_address`: Email Address (email)
- `currency`: Currency
- `transaction_time`: Transaction Time (datetime)
- `subtotal`: Subtotal (number)
- `discount`: Discount (number)
- `tax`: Tax (number)
- `total`: Total (number)
- `products`: Products
- `products[].pid`: Product ID
- `products[].lid`: Line Item ID
- `products[].name`: Name
- `products[].sku`: SKU
- `products[].unit_price`: Unit Price (number)
- `products[].quantity`: Quantity (number)

### `purchases_create_multiple_purchases`

**Create Multiple Purchases.** Records one purchase transaction containing multiple product line items for a subscriber email. Pick this over Create Purchase for multi-product orders. Not idempotent — repeat calls create duplicate purchase records. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transactionId` | number | yes |  | Transaction ID. The transaction ID. |
| `transactionTime` | ISO date-time string | no |  | Transaction Time. The transaction time. |
| `emailAddress` | string | yes |  | Email Address. The email address of the subscriber. |
| `firstName` | string | no |  | First Name. The first name of the subscriber. |
| `status` | string | no |  | Status. The status of the purchase. One of `"paid"`, `"pending"`, `"failed"`. |
| `currency` | string | yes |  | Currency. The currency of the purchase. One of `"USD"`, `"JPY"`, `"GBP"`, `"EUR"`, `"CAD"`, `"AUD"`, `"NZD"`, `"CHF"`, `"HKD"`, `"SGD"`, `"SEK"`, `"DKK"`, `"PLN"`, `"NOK"`, `"HUF"`, `"CZK"`, `"ILS"`, `"MXN"`, `"MYR"`, `"BRL"`, `"PHP"`, `"TWD"`, `"THB"`, `"TRY"`, `"RUB"` and 5 more. |
| `subtotal` | number | no |  | Subtotal. The subtotal. |
| `shipping` | number | no |  | Shipping. The shipping. |
| `discount` | number | no |  | Discount. The discount. |
| `tax` | number | no |  | Tax. The tax. |
| `total` | number | no |  | Total. The total. |
| `multipleProducts` | JSON | yes | `[{"pid":9999,"lid":7777,"name":"Floppy Disk (512k)","sku":"7890-ijkl","unit_price":5,"quantity":2},{"pid":5555,"lid":7778,"name":"Telephone Cord (data)","sku":"mnop-1234","unit_price":10,"quantity":1}]` | Products. The products. |

Output fields:

- `id`: Purchase ID (number)
- `transaction_id`: Transaction ID
- `status`: Status
- `email_address`: Email Address (email)
- `currency`: Currency
- `transaction_time`: Transaction Time (datetime)
- `subtotal`: Subtotal (number)
- `discount`: Discount (number)
- `tax`: Tax (number)
- `total`: Total (number)
- `products`: Products
- `products[].pid`: Product ID
- `products[].lid`: Line Item ID
- `products[].name`: Name
- `products[].sku`: SKU
- `products[].unit_price`: Unit Price (number)
- `products[].quantity`: Quantity (number)

### `kit_get_account`

**Get Account.** Returns the connected Kit account name and primary email address. Use it to confirm which account the connection points at before making changes. Returns no account ID or timezone. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `name`: Account Name
- `primary_email_address`: Primary Email (email)
- `plan_type`: Plan Type

### `kit_list_subscribers`

**List Subscribers.** Lists subscribers 50 per page with total counts, optionally filtered by exact email address or created/updated date range. This is also the way to find a subscriber ID from an email. Kit returns active subscribers by default; set Sort Field to cancelled_at to list cancelled ones. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_address` | string | no |  | Email Address. Only return the subscriber with this email address. |
| `from` | string | no |  | Created From. Only subscribers added on or after this date. Format yyyy-mm-dd. |
| `to` | string | no |  | Created To. Only subscribers added on or before this date. Format yyyy-mm-dd. |
| `updated_from` | string | no |  | Updated From. Only subscribers updated after this date. Format yyyy-mm-dd. |
| `updated_to` | string | no |  | Updated To. Only subscribers updated before this date. Format yyyy-mm-dd. |
| `page` | number | no | `1` | Page. Page number, 50 subscribers per page. Defaults to 1. |
| `sort_order` | string | no |  | Sort Order. Sort direction. Kit defaults to ascending. One of `"asc"`, `"desc"`. |
| `sort_field` | string | no |  | Sort Field. Set to Cancelled At to list cancelled subscribers, sorted by cancellation date. One of `"cancelled_at"`. |

Output fields:

- `subscribers`: Subscribers
- `subscribers[].id`: Subscriber ID (number)
- `subscribers[].first_name`: First Name
- `subscribers[].email_address`: Email Address (email)
- `subscribers[].state`: State
- `subscribers[].created_at`: Created At (datetime)
- `subscribers[].fields`: Custom Fields (an object whose keys vary)
- `page`: Page (number)
- `total_pages`: Total Pages (number)
- `total_subscribers`: Total Subscribers (number)

### `kit_get_subscriber`

**Get Subscriber.** Returns one subscriber by ID: email, first name, state and custom field values. To look someone up by email, use List Subscribers with the Email Address filter instead. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriber_id` | string | yes |  | Subscriber ID. The subscriber ID, from List Subscribers. |

Output fields:

- `id`: Subscriber ID (number)
- `first_name`: First Name
- `email_address`: Email Address (email)
- `state`: State
- `created_at`: Created At (datetime)
- `fields`: Custom Fields (an object whose keys vary)

### `kit_update_subscriber`

**Update Subscriber.** Updates a subscriber by ID. Only the inputs you supply are sent, so omitted ones keep their stored value; an empty string in Custom Fields clears that field. It cannot change subscription state; use Unsubscribe Subscriber for that. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriber_id` | string | yes |  | Subscriber ID. The subscriber ID, from List Subscribers. |
| `email_address` | string | no |  | New Email Address. Change the subscriber email address. |
| `first_name` | string | no |  | First Name. The first name to store on the subscriber. |
| `fields` | JSON | no |  | Custom Fields. A JSON object of custom field key to value, e.g. {"last_name": "Snow"}. Keys must already exist; get them from List Custom Fields. |

Output fields:

- `id`: Subscriber ID (number)
- `first_name`: First Name
- `email_address`: Email Address (email)
- `state`: State
- `created_at`: Created At (datetime)
- `fields`: Custom Fields (an object whose keys vary)

### `kit_unsubscribe_subscriber`

**Unsubscribe Subscriber.** Unsubscribes an email address from every form, sequence and future email on the account; Kit has no delete-subscriber endpoint, so this is the removal action. Only the subscriber can reliably opt back in. To act on a subscriber ID, get the email with Get Subscriber first. Safe to retry: an already unsubscribed address returns the same cancelled record. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The email address to unsubscribe. |

Output fields:

- `id`: Subscriber ID (number)
- `first_name`: First Name
- `email_address`: Email Address (email)
- `state`: State
- `created_at`: Created At (datetime)
- `fields`: Custom Fields (an object whose keys vary)

### `kit_list_tags`

**List Tags.** Lists every tag with its ID and name. Use it to resolve a tag name to the ID that Tag Subscriber, Remove Tag and List Tag Subscriptions need. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `tags`: Tags
- `tags[].id`: Tag ID (number)
- `tags[].name`: Name
- `tags[].created_at`: Created At (datetime)
- `count`: Count (number)

### `kit_create_tag`

**Create Tag.** Gets or creates a tag by name: if a tag with the same name exists (case-insensitive) it is returned with created false, otherwise a new tag is created with created true. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The tag name. |

Output fields:

- `id`: Tag ID (number)
- `name`: Name
- `created_at`: Created At (datetime)
- `created`: Newly Created (boolean)

### `kit_tag_subscriber`

**Tag Subscriber.** Applies a tag (plus optional extra tags) to a subscriber by email, creating the subscriber if missing and optionally setting first name and custom fields. Re-applying the same tag is a no-op. Tagging can start automations tied to that tag and may reactivate an address that unsubscribed. To act on a subscriber ID, get the email with Get Subscriber first. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag_id` | string | yes |  | Tag ID. The tag to apply, from List Tags or Create Tag. |
| `email` | string | yes |  | Email. The subscriber email address. |
| `additional_tag_ids` | array | no |  | Additional Tag IDs. More tag IDs to apply in the same call. |
| `first_name` | string | no |  | First Name. The first name to store on the subscriber. |
| `fields` | JSON | no |  | Custom Fields. A JSON object of custom field key to value, e.g. {"last_name": "Snow"}. Keys must already exist; get them from List Custom Fields. |

Output fields:

- `id`: Subscription ID (number)
- `state`: State
- `created_at`: Created At (datetime)
- `source`: Source
- `referrer`: Referrer (url)
- `subscribable_id`: Subscribed To ID (number)
- `subscribable_type`: Subscribed To Type
- `subscriber`: Subscriber
- `subscriber.id`: Subscriber ID (number)
- `subscriber.first_name`: First Name
- `subscriber.email_address`: Email Address (email)
- `subscriber.state`: State
- `subscriber.created_at`: Created At (datetime)
- `subscriber.fields`: Custom Fields (an object whose keys vary)

### `kit_remove_tag_by_email`

**Remove Tag By Email.** Removes one tag from the subscriber with the given email; the subscriber stays subscribed. Use Remove Tag From Subscriber when you have the subscriber ID instead. Safe to retry: removing a tag the subscriber no longer has still succeeds. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag_id` | string | yes |  | Tag ID. The tag to remove, from List Tags. |
| `email` | string | yes |  | Email. The subscriber email address. |

Output fields:

- `removed`: Removed (boolean)
- `email`: Email (email)
- `tag_id`: Tag ID (number)
- `tag_name`: Tag Name

### `kit_remove_tag_from_subscriber`

**Remove Tag From Subscriber.** Removes one tag from a subscriber by subscriber ID; the subscriber stays subscribed. Use Remove Tag By Email when you only have the address. Safe to retry: removing a tag the subscriber no longer has still succeeds. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriber_id` | string | yes |  | Subscriber ID. The subscriber ID, from List Subscribers or Get Subscriber. |
| `tag_id` | string | yes |  | Tag ID. The tag to remove, from List Tags. |

Output fields:

- `removed`: Removed (boolean)
- `subscriber_id`: Subscriber ID
- `tag_id`: Tag ID (number)
- `tag_name`: Tag Name

### `kit_list_tag_subscriptions`

**List Tag Subscriptions.** Lists the subscribers who have one tag, each with the subscriber record, 50 per page, with total counts for paging. Filter by active or cancelled state. Get the tag ID from List Tags. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag_id` | string | yes |  | Tag ID. The tag ID, from List Tags. |
| `page` | number | no | `1` | Page. Page number, 50 subscriptions per page. Defaults to 1. |
| `sort_order` | string | no |  | Sort Order. Sort by tagging date. Kit defaults to ascending (oldest first). One of `"asc"`, `"desc"`. |
| `subscriber_state` | string | no |  | Subscriber State. Return only active or only cancelled subscriptions. Leave empty for the Kit default. One of `"active"`, `"cancelled"`. |

Output fields:

- `subscriptions`: Subscriptions
- `subscriptions[].id`: Subscription ID (number)
- `subscriptions[].state`: State
- `subscriptions[].created_at`: Created At (datetime)
- `subscriptions[].source`: Source
- `subscriptions[].referrer`: Referrer (url)
- `subscriptions[].subscribable_id`: Subscribed To ID (number)
- `subscriptions[].subscribable_type`: Subscribed To Type
- `subscriptions[].subscriber`: Subscriber
- `subscriptions[].subscriber.id`: Subscriber ID (number)
- `subscriptions[].subscriber.first_name`: First Name
- `subscriptions[].subscriber.email_address`: Email Address (email)
- `subscriptions[].subscriber.state`: State
- `subscriptions[].subscriber.created_at`: Created At (datetime)
- `subscriptions[].subscriber.fields`: Custom Fields (an object whose keys vary)
- `page`: Page (number)
- `total_pages`: Total Pages (number)
- `total_subscriptions`: Total Subscriptions (number)

### `kit_list_forms`

**List Forms.** Lists all forms and landing pages with their ID, name, type and embed URL. Use it to find a form ID for Add Subscriber To Form or List Form Subscriptions. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `forms`: Forms
- `forms[].id`: Form ID (number)
- `forms[].name`: Name
- `forms[].type`: Type
- `forms[].format`: Format
- `forms[].embed_url`: Embed URL (url)
- `forms[].embed_js`: Embed Script URL (url)
- `forms[].archived`: Archived (boolean)
- `forms[].uid`: UID
- `forms[].created_at`: Created At (datetime)
- `count`: Count (number)

### `kit_add_subscriber_to_form`

**Add Subscriber To Form.** Subscribes an email to a form, creating the subscriber if missing, and can set first name, custom fields and extra tags. This is the main way to add a subscriber. Each call can send the form double opt-in or incentive email and may reactivate an address that unsubscribed, so only use it with consent; retries can resend that email. To act on a subscriber ID, get the email with Get Subscriber first. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form ID. The form ID, from List Forms. |
| `email` | string | yes |  | Email. The email address to subscribe. |
| `first_name` | string | no |  | First Name. The first name to store on the subscriber. |
| `fields` | JSON | no |  | Custom Fields. A JSON object of custom field key to value, e.g. {"last_name": "Snow"}. Keys must already exist; get them from List Custom Fields. |
| `tag_ids` | array | no |  | Tag IDs. Optional tag IDs to apply as well, from List Tags. |

Output fields:

- `id`: Subscription ID (number)
- `state`: State
- `created_at`: Created At (datetime)
- `source`: Source
- `referrer`: Referrer (url)
- `subscribable_id`: Subscribed To ID (number)
- `subscribable_type`: Subscribed To Type
- `subscriber`: Subscriber
- `subscriber.id`: Subscriber ID (number)
- `subscriber.first_name`: First Name
- `subscriber.email_address`: Email Address (email)
- `subscriber.state`: State
- `subscriber.created_at`: Created At (datetime)
- `subscriber.fields`: Custom Fields (an object whose keys vary)

### `kit_list_form_subscriptions`

**List Form Subscriptions.** Lists subscriptions to one form, each with the subscriber record, 50 per page, with total counts for paging. Filter by active or cancelled state. Get the form ID from List Forms. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form ID. The form ID, from List Forms. |
| `page` | number | no | `1` | Page. Page number, 50 subscriptions per page. Defaults to 1. |
| `sort_order` | string | no |  | Sort Order. Sort by subscription date. Kit defaults to ascending (oldest first). One of `"asc"`, `"desc"`. |
| `subscriber_state` | string | no |  | Subscriber State. Return only active or only cancelled subscriptions. Leave empty for the Kit default. One of `"active"`, `"cancelled"`. |

Output fields:

- `subscriptions`: Subscriptions
- `subscriptions[].id`: Subscription ID (number)
- `subscriptions[].state`: State
- `subscriptions[].created_at`: Created At (datetime)
- `subscriptions[].source`: Source
- `subscriptions[].referrer`: Referrer (url)
- `subscriptions[].subscribable_id`: Subscribed To ID (number)
- `subscriptions[].subscribable_type`: Subscribed To Type
- `subscriptions[].subscriber`: Subscriber
- `subscriptions[].subscriber.id`: Subscriber ID (number)
- `subscriptions[].subscriber.first_name`: First Name
- `subscriptions[].subscriber.email_address`: Email Address (email)
- `subscriptions[].subscriber.state`: State
- `subscriptions[].subscriber.created_at`: Created At (datetime)
- `subscriptions[].subscriber.fields`: Custom Fields (an object whose keys vary)
- `page`: Page (number)
- `total_pages`: Total Pages (number)
- `total_subscriptions`: Total Subscriptions (number)

### `kit_list_sequences`

**List Sequences.** Lists all sequences (automated email courses) with their ID and name. Use it to find a sequence ID for a sequence webhook or enrolment. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `sequences`: Sequences
- `sequences[].id`: Sequence ID (number)
- `sequences[].name`: Name
- `sequences[].active`: Active (boolean)
- `sequences[].available`: Available (boolean)
- `sequences[].hold`: On Hold (boolean)
- `sequences[].repeat`: Repeat (boolean)
- `sequences[].created_at`: Created At (datetime)
- `count`: Count (number)

### `kit_list_broadcasts`

**List Broadcasts.** Lists broadcasts with their ID, subject and creation time, 50 per page. Use it to find a broadcast ID for Get Broadcast, Get Broadcast Stats or Delete Broadcast. Increase Page until fewer than 50 are returned to see older ones. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no | `1` | Page. Page number, 50 broadcasts per page. Defaults to 1. |
| `sort_order` | string | no |  | Sort Order. Sort by creation date. Kit defaults to ascending (oldest first). One of `"asc"`, `"desc"`. |

Output fields:

- `broadcasts`: Broadcasts
- `broadcasts[].id`: Broadcast ID (number)
- `broadcasts[].subject`: Subject
- `broadcasts[].created_at`: Created At (datetime)
- `count`: Count (number)
- `page`: Page (number)

### `kit_get_broadcast`

**Get Broadcast.** Returns one broadcast by ID: subject, content, sender, schedule and public-post settings. Use Get Broadcast Stats for opens and clicks instead. Get the ID from List Broadcasts. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `broadcast_id` | string | yes |  | Broadcast ID. The broadcast ID, from List Broadcasts. |

Output fields:

- `id`: Broadcast ID (number)
- `subject`: Subject
- `description`: Description
- `content`: Content (html)
- `public`: Public (boolean)
- `published_at`: Published At (datetime)
- `send_at`: Send At (datetime)
- `email_address`: From Email (email)
- `email_layout_template`: Email Template
- `thumbnail_url`: Thumbnail URL (image)
- `thumbnail_alt`: Thumbnail Alt Text
- `created_at`: Created At (datetime)

### `kit_get_broadcast_stats`

**Get Broadcast Stats.** Returns the stats of one broadcast by ID: recipients, open rate, click rate, unsubscribes, total clicks, status and send progress. Use Get Broadcast for its content instead. A draft that was never sent reports zero counts. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `broadcast_id` | string | yes |  | Broadcast ID. The broadcast ID, from List Broadcasts. |

Output fields:

- `broadcast_id`: Broadcast ID (number)
- `status`: Status
- `recipients`: Recipients (number)
- `emails_opened`: Emails Opened (number)
- `open_rate`: Open Rate (number)
- `emails_clicked`: Emails Clicked (number)
- `total_clicks`: Total Clicks (number)
- `click_rate`: Click Rate (number)
- `unsubscribes`: Unsubscribes (number)
- `unsubscribe_rate`: Unsubscribe Rate (number)
- `progress`: Progress (number)
- `show_total_clicks`: Show Total Clicks (boolean)
- `open_tracking_disabled`: Open Tracking Disabled (boolean)
- `click_tracking_disabled`: Click Tracking Disabled (boolean)

### `kit_create_broadcast`

**Create Broadcast.** Creates a broadcast email. Without Send At it is saved as an unsent draft; setting Send At schedules a real send to the account subscribers at that time, with no segment targeting on this endpoint. Public only publishes it as a web post. Each call creates another broadcast. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subject` | string | no |  | Subject. The email subject line. |
| `content` | string | no |  | Content. The email body. Plain text or simple HTML (p, h1, img, a). |
| `description` | string | no |  | Internal Description. An internal note, not shown to subscribers. |
| `email_address` | string | no |  | From Email Address. Sending address. Leave empty to use the account default. |
| `email_layout_template` | string | no |  | Email Template Name. Name of the email template. Leave empty to use the account default. |
| `send_at` | ISO date-time string | no |  | Send At. When to send, as an ISO 8601 date-time in the future. Leave empty to keep a draft. Setting it schedules a real send. |
| `public` | boolean | no |  | Publish As Web Post. Also publish the broadcast on the Creator Profile web page. |
| `published_at` | ISO date-time string | no |  | Published At. Publication time shown on the web post. Only used when publishing as a web post. |
| `thumbnail_url` | string | no |  | Thumbnail URL. Image URL for the web post thumbnail. |
| `thumbnail_alt` | string | no |  | Thumbnail Alt Text. Alt text for the web post thumbnail. |

Output fields:

- `id`: Broadcast ID (number)
- `subject`: Subject
- `description`: Description
- `content`: Content (html)
- `public`: Public (boolean)
- `published_at`: Published At (datetime)
- `send_at`: Send At (datetime)
- `email_address`: From Email (email)
- `email_layout_template`: Email Template
- `thumbnail_url`: Thumbnail URL (image)
- `thumbnail_alt`: Thumbnail Alt Text
- `created_at`: Created At (datetime)

### `kit_delete_broadcast`

**Delete Broadcast.** Permanently deletes a draft or scheduled broadcast by ID; a scheduled one will not be sent. It cannot be undone, and a repeat call fails once the broadcast is gone. Confirm the ID with Get Broadcast first. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `broadcast_id` | string | yes |  | Broadcast ID. The broadcast ID, from List Broadcasts. |

Output fields:

- `success`: Success (boolean)
- `broadcast_id`: Broadcast ID

### `kit_list_custom_fields`

**List Custom Fields.** Lists every custom field with its ID, label and key. Use the key when setting Custom Fields on subscribers, and the ID for Update or Delete Custom Field. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `custom_fields`: Custom Fields
- `custom_fields[].id`: Custom Field ID (number)
- `custom_fields[].key`: Key
- `custom_fields[].label`: Label
- `custom_fields[].name`: Internal Name
- `count`: Count (number)

### `kit_create_custom_field`

**Create Custom Field.** Creates one custom subscriber field from a label; Kit derives its key (lowercase, underscored) and returns it. Labels must be unique and the account allows at most 140 fields. Check List Custom Fields first, because a retry with an existing label fails. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label` | string | yes |  | Label. The field label, e.g. "Company". Must be unique on the account. |

Output fields:

- `id`: Custom Field ID (number)
- `key`: Key
- `label`: Label
- `name`: Internal Name

### `kit_update_custom_field`

**Update Custom Field.** Renames a custom field by ID and returns the updated field. Only the label changes: the field key used in subscriber fields and liquid tags stays the same, and stored subscriber values are kept. If reading the field back fails after the rename, it still succeeds and returns refreshed: false with the reason. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_field_id` | string | yes |  | Custom Field ID. The field ID, from List Custom Fields. |
| `label` | string | yes |  | New Label. The new label. Must be unique on the account. |

Output fields:

- `id`: Custom Field ID (number)
- `key`: Key
- `label`: Label
- `name`: Internal Name
- `refreshed`: Read Back After Rename (boolean)
- `refresh_error`: Read Back Error

### `kit_delete_custom_field`

**Delete Custom Field.** Permanently deletes a custom field by ID, erasing its stored value on every subscriber. It cannot be undone, and a repeat call fails once the field is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `custom_field_id` | string | yes |  | Custom Field ID. The field ID, from List Custom Fields. |

Output fields:

- `success`: Success (boolean)
- `custom_field_id`: Custom Field ID

### `kit_create_webhook`

**Create Webhook.** Registers a webhook rule that POSTs to a target URL when the chosen event fires. Form, sequence, tag, product and link-click events need their matching parameter (Form ID, Sequence ID, Tag ID, Product ID or Link URL). Each call registers another rule, so check List Webhooks first and keep the returned rule ID for Delete Webhook. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `target_url` | string | yes |  | Target URL. The public https:// URL Kit will POST the event payload to. |
| `event` | string | yes |  | Event. The event that fires the webhook. One of `"subscriber.subscriber_activate"`, `"subscriber.subscriber_unsubscribe"`, `"subscriber.subscriber_bounce"`, `"subscriber.subscriber_complain"`, `"subscriber.form_subscribe"`, `"subscriber.course_subscribe"`, `"subscriber.course_complete"`, `"subscriber.link_click"`, `"subscriber.product_purchase"`, `"subscriber.tag_add"`, `"subscriber.tag_remove"`, `"purchase.purchase_create"`. |
| `form_id` | number | no |  | Form ID. Required for the Form subscribed event. Get it from List Forms. |
| `sequence_id` | number | no |  | Sequence ID. Required for the Sequence subscribed and Sequence completed events. Get it from List Sequences. |
| `tag_id` | number | no |  | Tag ID. Required for the Tag added and Tag removed events. Get it from List Tags. |
| `product_id` | number | no |  | Product ID. Required for the Product purchased event. |
| `initiator_value` | string | no |  | Link URL. Required for the Link clicked event: the link URL to watch. |

Output fields:

- `id`: Webhook ID (number)
- `target_url`: Target URL (url)
- `event`: Event
- `event.name`: Event Name
- `event.tag_id`: Tag ID (number)
- `event.initiator_value`: Link URL (url)
- `account_id`: Account ID (number)

### `kit_delete_webhook`

**Delete Webhook.** Deletes a webhook rule by its rule ID, from Create Webhook or List Webhooks. Kit stops calling the target URL immediately. A repeat call fails once the rule is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `rule_id` | string | yes |  | Rule ID. The webhook rule ID, from Create Webhook or List Webhooks. |

Output fields:

- `success`: Success (boolean)
- `rule_id`: Webhook ID

### `kit_list_webhooks`

**List Webhooks.** Lists the webhook rules registered on the account, each with its rule ID, event and target URL. Use it to find a rule ID before Delete Webhook or to avoid registering a duplicate with Create Webhook. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `rules`: Webhooks
- `rules[].id`: Webhook ID (number)
- `rules[].target_url`: Target URL (url)
- `rules[].event`: Event
- `rules[].event.name`: Event Name
- `rules[].event.tag_id`: Tag ID (number)
- `rules[].event.initiator_value`: Link URL (url)
- `rules[].account_id`: Account ID (number)
- `rules[].status`: Status
- `count`: Count (number)

### `kit_update_broadcast`

**Update Broadcast.** Updates only the fields you pass on an existing broadcast, such as subject or content; everything left empty keeps its current value. Setting Send At schedules a real send to subscribers, and Publish As Web Post changes its web visibility, so only set them when the user asked. Get the broadcast ID from List Broadcasts. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `broadcast_id` | string | yes |  | Broadcast ID. The broadcast ID, from List Broadcasts. |
| `subject` | string | no |  | Subject. New email subject line. |
| `content` | string | no |  | Content. New email body. Plain text or simple HTML (p, h1, img, a). |
| `description` | string | no |  | Internal Description. New internal note, not shown to subscribers. |
| `email_address` | string | no |  | From Email Address. New sending address. It must be a confirmed sender in Kit. |
| `email_layout_template` | string | no |  | Email Template Name. New email template name. |
| `send_at` | ISO date-time string | no |  | Send At. Schedule a real send at this ISO 8601 date-time, which must be in the future. Leave empty to keep the current schedule. |
| `public` | string | no |  | Publish As Web Post. Change web post visibility. Leave empty to keep it as it is. One of `"true"`, `"false"`. |
| `published_at` | ISO date-time string | no |  | Published At. New publication time shown on the web post. |
| `thumbnail_url` | string | no |  | Thumbnail URL. New image URL for the web post thumbnail. |
| `thumbnail_alt` | string | no |  | Thumbnail Alt Text. New alt text for the web post thumbnail. |

Output fields:

- `id`: Broadcast ID (number)
- `subject`: Subject
- `description`: Description
- `content`: Content (html)
- `public`: Public (boolean)
- `published_at`: Published At (datetime)
- `send_at`: Send At (datetime)
- `email_address`: From Email (email)
- `email_layout_template`: Email Template
- `thumbnail_url`: Thumbnail URL (image)
- `thumbnail_alt`: Thumbnail Alt Text
- `created_at`: Created At (datetime)

### `kit_add_subscriber_to_sequence`

**Add Subscriber To Sequence.** Enrolls an email in a sequence, creating the subscriber if missing, and can set first name, custom fields and extra tags. This starts the sequence emails for that person and may reactivate an address that unsubscribed, so only use it with consent. Enrolling the same email again does not create a second enrollment. Get the sequence ID from List Sequences. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sequence_id` | string | yes |  | Sequence ID. The sequence ID, from List Sequences. |
| `email` | string | yes |  | Email. The email address to enroll. |
| `first_name` | string | no |  | First Name. The first name to store on the subscriber. |
| `fields` | JSON | no |  | Custom Fields. A JSON object of custom field key to value, e.g. {"last_name": "Snow"}. Keys must already exist; get them from List Custom Fields. |
| `tag_ids` | array | no |  | Tag IDs. Optional tag IDs to apply as well, from List Tags. |

Output fields:

- `id`: Subscription ID (number)
- `state`: State
- `created_at`: Created At (datetime)
- `source`: Source
- `referrer`: Referrer (url)
- `subscribable_id`: Subscribed To ID (number)
- `subscribable_type`: Subscribed To Type
- `subscriber`: Subscriber
- `subscriber.id`: Subscriber ID (number)
- `subscriber.first_name`: First Name
- `subscriber.email_address`: Email Address (email)
- `subscriber.state`: State
- `subscriber.created_at`: Created At (datetime)
- `subscriber.fields`: Custom Fields (an object whose keys vary)

### `kit_list_sequence_subscriptions`

**List Sequence Subscriptions.** Lists the subscribers enrolled in one sequence, each with the subscriber record, 50 per page, with total counts for paging. Filter by active or cancelled state. Get the sequence ID from List Sequences. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sequence_id` | string | yes |  | Sequence ID. The sequence ID, from List Sequences. |
| `page` | number | no | `1` | Page. Page number, 50 subscriptions per page. Defaults to 1. |
| `sort_order` | string | no |  | Sort Order. Sort by enrollment date. Kit defaults to ascending (oldest first). One of `"asc"`, `"desc"`. |
| `subscriber_state` | string | no |  | Subscriber State. Return only active or only cancelled subscriptions. Leave empty for the Kit default. One of `"active"`, `"cancelled"`. |

Output fields:

- `subscriptions`: Subscriptions
- `subscriptions[].id`: Subscription ID (number)
- `subscriptions[].state`: State
- `subscriptions[].created_at`: Created At (datetime)
- `subscriptions[].source`: Source
- `subscriptions[].referrer`: Referrer (url)
- `subscriptions[].subscribable_id`: Subscribed To ID (number)
- `subscriptions[].subscribable_type`: Subscribed To Type
- `subscriptions[].subscriber`: Subscriber
- `subscriptions[].subscriber.id`: Subscriber ID (number)
- `subscriptions[].subscriber.first_name`: First Name
- `subscriptions[].subscriber.email_address`: Email Address (email)
- `subscriptions[].subscriber.state`: State
- `subscriptions[].subscriber.created_at`: Created At (datetime)
- `subscriptions[].subscriber.fields`: Custom Fields (an object whose keys vary)
- `page`: Page (number)
- `total_pages`: Total Pages (number)
- `total_subscriptions`: Total Subscriptions (number)

### `kit_list_subscriber_tags`

**List Subscriber Tags.** Lists every tag currently applied to one subscriber, by subscriber ID. When only an email is known, find the ID with List Subscribers and its Email Address filter first. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriber_id` | string | yes |  | Subscriber ID. The subscriber ID, from List Subscribers. |

Output fields:

- `tags`: Tags
- `tags[].id`: Tag ID (number)
- `tags[].name`: Name
- `tags[].created_at`: Created At (datetime)
- `count`: Count (number)

### `kit_list_purchases`

**List Purchases.** Lists purchase records in the account, newest pages last, 50 per page, with total counts for paging. Each purchase has its transaction ID, buyer email, currency, totals and products. There is no filter by buyer on this endpoint. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no | `1` | Page. Page number, 50 purchases per page. Defaults to 1. |

Output fields:

- `purchases`: Purchases
- `purchases[].id`: Purchase ID (number)
- `purchases[].transaction_id`: Transaction ID
- `purchases[].status`: Status
- `purchases[].email_address`: Email Address (email)
- `purchases[].currency`: Currency
- `purchases[].transaction_time`: Transaction Time (datetime)
- `purchases[].subtotal`: Subtotal (number)
- `purchases[].discount`: Discount (number)
- `purchases[].tax`: Tax (number)
- `purchases[].total`: Total (number)
- `purchases[].products`: Products
- `purchases[].products[].pid`: Product ID
- `purchases[].products[].lid`: Line Item ID
- `purchases[].products[].name`: Name
- `purchases[].products[].sku`: SKU
- `purchases[].products[].unit_price`: Unit Price (number)
- `purchases[].products[].quantity`: Quantity (number)
- `page`: Page (number)
- `total_pages`: Total Pages (number)
- `total_purchases`: Total Purchases (number)

### `kit_get_purchase`

**Get Purchase.** Returns one purchase record by its Kit purchase ID: transaction ID, buyer email, status, currency, totals and product line items. Find the purchase ID with List Purchases. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `purchase_id` | string | yes |  | Purchase ID. The Kit purchase ID, from List Purchases. |

Output fields:

- `id`: Purchase ID (number)
- `transaction_id`: Transaction ID
- `status`: Status
- `email_address`: Email Address (email)
- `currency`: Currency
- `transaction_time`: Transaction Time (datetime)
- `subtotal`: Subtotal (number)
- `discount`: Discount (number)
- `tax`: Tax (number)
- `total`: Total (number)
- `products`: Products
- `products[].pid`: Product ID
- `products[].lid`: Line Item ID
- `products[].name`: Name
- `products[].sku`: SKU
- `products[].unit_price`: Unit Price (number)
- `products[].quantity`: Quantity (number)

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

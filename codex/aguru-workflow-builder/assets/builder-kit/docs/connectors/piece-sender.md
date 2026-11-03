# Sender

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-sender'
  version: '0.1.7'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> Enter your Sender API Token

## Actions

### `add_update_subscriber`

**Add / Update Subscriber.** Upserts a subscriber in a Sender account by email: creates the contact if the email is new, otherwise updates its name, phone, group membership, and custom fields. Use to ensure a contact exists with given details before campaigns or grouping. Keyed on email, so repeating the same call is idempotent (no duplicate contact); note the optional flag that triggers automation workflows on the subscriber. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Subscriber email address. |
| `firstname` | string | no |  | First Name. Subscriber first name. |
| `lastname` | string | no |  | Last Name. Subscriber last name. |
| `phone` | string | no |  | Phone. Subscriber phone number. |
| `groups` | array | no |  | Groups. Select one or more groups. Values the product loads from the provider, such as ids; write an array of them. |
| `customFields` | JSON | no |  | Custom Fields. JSON object with custom field keys and values. |
| `triggerAutomation` | boolean | no | `false` | Trigger Automation. Whether to trigger automation workflows. |

### `create_campaign`

**Create Campaign.** Creates a new draft email campaign in a Sender account targeting one or more subscriber groups, with subject, sender name, reply-to, and content type. Use to set up a campaign for later sending (it is not sent here). Not idempotent: each call creates a separate draft, so repeating produces duplicates. Content type must be one of "editor", "html", or "text". Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | no |  | Campaign Name. The name of the campaign. |
| `subject` | string | yes |  | Email Subject. The subject line of the email. |
| `from` | string | yes |  | From Name. Sender name. |
| `reply_to` | string | yes |  | Reply To. Reply-to email address. |
| `content_type` | string | yes |  | Content Type. The value must be one of "editor", "html", or "text". |
| `groups` | array | no |  | Groups. Select one or more groups. Values the product loads from the provider, such as ids; write an array of them. |

### `unsubscribe_subscriber`

**Unsubscribe Subscriber.** Marks a subscriber as unsubscribed in a Sender account so they stop receiving campaigns. Use to honor an opt-out or suppress a contact. Identify the subscriber by their Sender subscriber ID. Idempotent: re-running on an already-unsubscribed contact leaves them unsubscribed with no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriber` | string | yes |  | Subscriber. Select a subscriber. A value the product loads from the provider, such as an id; write the value itself. |

### `add_subscriber_to_group`

**Add Subscriber to Group.** Assigns a single subscriber to one or more groups/lists in a Sender account, identified by their subscriber ID. Use to segment a contact for targeted campaigns. Idempotent: adding a contact already in a group leaves membership unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriber` | string | yes |  | Subscriber. Select a subscriber. A value the product loads from the provider, such as an id; write the value itself. |
| `groups` | array | no |  | Groups. Select one or more groups. Values the product loads from the provider, such as ids; write an array of them. |

### `remove_subscriber_from_group`

**Remove Subscriber from Group.** Removes one or more subscribers from a specific group/list in a Sender account, identified by group ID and subscriber IDs. Use to unsegment contacts without unsubscribing them globally. Idempotent: removing contacts no longer in the group leaves the group unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscribers` | array | yes |  | Subscribers. Select one or more subscribers to delete. Values the product loads from the provider, such as ids; write an array of them. |
| `groupId` | string | no |  | Groups. Select one or more groups. A value the product loads from the provider, such as an id; write the value itself. |

### `send_campaign`

**Send Campaign.** Sends an existing draft campaign in a Sender account to its configured recipient groups, identified by campaign ID. Use only after a campaign draft is created and ready to deliver. Not idempotent: this dispatches email to recipients, so re-running may re-send or error; call once. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Campaign. Select a campaign. A value the product loads from the provider, such as an id; write the value itself. |

### `update_subscriber`

**Update Subscriber.** Updates an existing subscriber's name, phone, or custom fields in a Sender account, identified by subscriber ID. Use when the contact already exists and you only need to change attributes; to create-or-update by email use Add / Update Subscriber instead. Idempotent: applying the same values repeatedly yields the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriber` | string | yes |  | Subscriber. Select a subscriber. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. Subscriber email address to update. |
| `firstname` | string | no |  | First Name. New first name. |
| `lastname` | string | no |  | Last Name. New last name. |
| `phone` | string | no |  | Phone. New phone number. |
| `customFields` | JSON | no |  | Custom Fields. JSON object with custom field keys and values to update. |

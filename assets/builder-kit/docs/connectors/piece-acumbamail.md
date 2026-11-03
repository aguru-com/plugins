# Acumbamail

Easily send email and SMS campaigns and boost your business

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-acumbamail'
  version: '0.2.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Auth Token

> To obtain your Auth Token, follow these steps:
> 1. Login to your Acumbamail account.
> 2. Go to **https://acumbamail.com/apidoc/**.
> 3. Under **Customer identifier**, you can find auth token;

## Actions

### `acumbamail_add_update_subscriber`

**Add/Update Subscriber.** Adds a contact to an Acumbamail subscriber list, or updates that contact's merge fields if it already exists when the update-existing option is enabled. Use to enroll or refresh a single contact in a list; requires the target list id and a merge-fields object that must include the email. Optionally sends a double-opt-in confirmation email. Idempotent: the subscriber is keyed on email within the list, so repeating the same input converges on the same membership. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | Subscriber List. A value the product loads from the provider, such as an id; write the value itself. |
| `listMergeFields` | object | yes |  | Merge Fields. An object whose fields depend on other inputs; the product shows them. |
| `update_subscriber` | boolean | no |  | Update Existing Subscriber Data. Updates the merge fields over the existent ones if the subscriber exists on the subscriber list. |
| `double_option` | boolean | no |  | Double Option. Activates the send of a confirmation email when the subscriber is added. |

### `acumbamail_create_subscriber_list`

**Create Subscriber List.** Creates a new Acumbamail subscriber list, requiring a list name and the sender email shown to subscribers when campaigns go out (company name, address, and phone are optional). Use when a contact list does not yet exist and must be provisioned before adding subscribers or sending campaigns. Not idempotent: each call creates a separate list even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listname` | string | yes |  | List Name. |
| `sender_email` | string | yes |  | Sener Email. Sender e-mail shown to the subscribers of the list when e-mail marketing campaigns are sent to them. |
| `company` | string | no |  | Company Name. |
| `address` | string | no |  | Company Address. |
| `phone` | string | no |  | Company Phone. |

### `acumbamail_unsubscribe_subscriber`

**Unsuscribe Subscriber.** Marks an email address as unsubscribed from a specific Acumbamail subscriber list, so the contact stops receiving campaigns for that list while remaining a stored subscriber. Use to honor an opt-out without removing the contact record; requires the list id and the email. Differs from Remove Subscriber, which deletes the membership entirely. Idempotent: re-running leaves the contact in the same unsubscribed state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `listId` | string | yes |  | Subscriber List. A value the product loads from the provider, such as an id; write the value itself. |

### `acumbamail_delete_subscriber_list`

**Delete Subscriber List.** Permanently deletes an entire Acumbamail subscriber list, identified by its list id, removing the list and its subscriber memberships. Use only when the whole list should be discarded, not to remove an individual contact (use Remove Subscriber for that). Idempotent on the stable list id: once deleted, repeating the call leaves the list absent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | Subscriber List. A value the product loads from the provider, such as an id; write the value itself. |

### `acumbamail_duplicate_template`

**Duplicate Template.** Creates a copy of an existing Acumbamail email template under a new name, leaving the original untouched. Use to derive a working template for a campaign from a known good one; requires the source template id and the new template name. Not idempotent: each call produces another duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_name` | string | yes |  | New Template Name. |
| `templateId` | string | yes |  | Origin Template. A value the product loads from the provider, such as an id; write the value itself. |

### `acumbamail_search_subscriber`

**Search Subscriber.** Looks up a single contact by email across the Acumbamail account and returns their detailed subscriber data for every list they belong to. Use to check whether an address is subscribed and retrieve its per-list membership details before adding, updating, or removing it. Requires the subscriber email. Idempotent: read-only lookup with no side effects. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriber` | string | yes |  | Subscriber Email. |

### `acumbamail_remove_subscriber`

**Remove Subscriber.** Deletes a contact's membership from a specific Acumbamail subscriber list by email, fully removing them from that list (unlike Unsubscribe Subscriber, which only marks them opted-out while keeping the record). Use to purge a contact from a list; requires the list id and the email. Idempotent: once removed, repeating the call leaves the contact absent from the list. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `listId` | string | yes |  | Subscriber List. A value the product loads from the provider, such as an id; write the value itself. |

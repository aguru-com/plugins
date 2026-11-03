# VBOUT

Marketing automation platform for agencies

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-vbout'
  version: '0.1.7'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your API key, follow these steps:
>
> 1.Go to **settings** by clicking your profile-pic (top-right).
>
> 2.Navigate to **API Integrations** section.
>
> 3.Under **API USER KEY** ,copy API key.

## Actions

### `vbout_add_contact`

**Add Contact to List.** Adds a new contact (by email) to a specific VBOUT email list, with an initial subscription status and optional custom field values. Use to subscribe or import someone into a list. Requires the target list ID and email; not idempotent, as each call adds the contact again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. |
| `listid` | string | yes |  | List ID. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | yes |  | Contact Status. One of `"0"`, `"1"`, `"2"`, `"3"`. |
| `ipaddress` | string | no |  | IP Address. |
| `fields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

### `vbout_add_tag`

**Add Tag to Contact.** Adds one or more tags to an existing VBOUT contact identified by email. Use to label or segment a contact. Accepts a list of tag names; not idempotent, as it appends tags on each call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. |
| `tagname` | array | yes |  | Tag Name. |

### `vbout_create_email_list`

**Create Email List.** Creates a new VBOUT email list with optional subscription settings (sender, reply-to, confirmation and notification emails/messages). Use to set up a new audience before adding contacts or sending campaigns. Only the list name is required; not idempotent, as each call creates a new list. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The name of the list. |
| `email_subject` | string | no |  | Email Subject. The default subscription subject. |
| `reply_to` | string | no |  | Reply To. The Reply to email of the list. |
| `fromemail` | string | no |  | From Email. The From email of the list. |
| `from_name` | string | no |  | From Name. The From name of the list. |
| `notify_email` | string | no |  | Notify Email. Notification Email. |
| `success_email` | string | no |  | Success Email. Subscription Success Email. |
| `success_message` | string | no |  | Success Message. Subscription Success Message. |
| `error_message` | string | no |  | Error Message. Subscription Error Message. |
| `confirmation_email` | string | no |  | Confirmation Email. Confirmation Email Message. |
| `confirmation_message` | string | no |  | Confirmation Message. |

### `vbout_add_email_marketing_campaign`

**Create Email Marketing Campaign.** Creates a new VBOUT email marketing campaign targeting one or more email lists, either standard or automated type. Use to set up an email send to existing recipients. Requires recipient list(s), name, subject, sender details, and message body; not idempotent, as each call creates a separate campaign. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lists` | array | yes |  | Campaign Recipients List. Values the product loads from the provider, such as ids; write an array of them. |
| `name` | string | yes |  | Campaign Name. |
| `subject` | string | yes |  | Campaign Subject. |
| `type` | string | yes | `"standard"` | Campaign Type. One of `"standard"`, `"automated"`. |
| `fromemail` | string | yes |  | From Email. |
| `from_name` | string | yes |  | From Name. |
| `reply_to` | string | yes |  | Reply To. |
| `body` | string | yes |  | Message Body. |

### `vbout_create_social_media_message`

**Create Social Media Message.** Publishes a message to one connected VBOUT social media account on a chosen channel (Twitter, LinkedIn, or Facebook). Use to post content to social media. Requires the message text, the channel, and the specific account/profile ID on that channel; not idempotent, as each call creates a new post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message` | string | yes |  | Message. |
| `channel` | string | yes |  | Social Media Channel. One of `"twitter"`, `"linkedin"`, `"facebook"`. |
| `channelid` | string | yes |  | Social Media Account. A value the product loads from the provider, such as an id; write the value itself. |

### `vbout_get_contact_by_email`

**Get Contact by Email.** Looks up a VBOUT contact by email address, optionally scoped to a specific email list. Use to fetch a contact record or resolve its ID before updating, tagging, or unsubscribing. The email is required; this is a read-only lookup and is idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listid` | string | no |  | List ID. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. |

### `vbout_get_email_list`

**Get List Details with Custom Fields.** Retrieves details of a specific VBOUT email list, including its configured custom fields. Use to inspect a list or discover its custom field names before adding or updating contacts. Requires the list ID; this is a read-only lookup and is idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listid` | string | yes |  | List ID. A value the product loads from the provider, such as an id; write the value itself. |

### `vbout_remove_tag`

**Remove Tags from Contact.** Removes one or more tags from an existing VBOUT contact identified by email. Use to unlabel or re-segment a contact. Tag names are passed as a comma-separated string; idempotent, since removing already-absent tags yields the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. |
| `tagname` | string | yes |  | Tag Name. use comma for multiple tag e.g. **tag1,tag2**. |

### `vbout_unsubscribe_contact`

**Unsubscribe Contact.** Sets an existing VBOUT contact to unsubscribed status within a given email list, looking the contact up by email first. Use to opt a contact out of a list. Requires the contact email and list ID; idempotent, since re-running leaves the contact in the same unsubscribed state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Contact Email. Contact email for update. |
| `listid` | string | yes |  | List ID. A value the product loads from the provider, such as an id; write the value itself. |

### `vbout_update_contact`

**Update Contact.** Updates an existing VBOUT contact (found by email) with a new status, IP address, and custom field values for a given list. Use to modify an already-subscribed contact rather than add a new one. Requires the contact email and list ID; idempotent, since re-applying the same values yields the same record state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Contact Email. Contact email for update. |
| `listid` | string | yes |  | List ID. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Contact Status. One of `"0"`, `"1"`, `"2"`, `"3"`. |
| `ipaddress` | string | no |  | IP Address. |
| `fields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

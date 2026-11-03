# Inbox

Email marketing and transactional email automation with INBOX (useinbox.com). Manage contacts, lists, campaigns, and react to delivery events.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-useinbox'
  version: '0.1.0'
```

Categories: MARKETING, COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `BASIC_AUTH`: Connection

> Connect your INBOX account by entering the email and password you use to sign in at https://app.useinbox.com.
>
> Each request exchanges these credentials for a short-lived bearer token, so make sure the credentials belong to a user that has access to the API.

## Actions

### `add_contact_to_list`

**Add Contact to List.** Adds a contact (by email) to a specific INBOX contact list, creating the contact if the email is new or updating it if it already exists, and ensuring list membership. Use to subscribe or enroll someone into a list. Requires a target list id and an email address; the upsert is keyed on the email so repeating with the same email and list yields the same membership without creating duplicates. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | Contact List. Select the INBOX contact list. Lists are managed under Contacts > Lists in your dashboard. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. Email address of the contact to add (e.g. jane@example.com). |

### `create_contact_list`

**Create Contact List.** Creates a new, empty contact list in INBOX that contacts can later be added to. Use when a list does not yet exist and one is needed before enrolling contacts; optionally nest it under a group and tag it with a consent legislation basis (GDPR, CASL, CAN-SPAM, or none). Requires a list name. Not idempotent: each call creates a separate list even if the name matches an existing one. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listName` | string | yes |  | List Name. Name of the new contact list (e.g. "Newsletter Subscribers"). |
| `groupId` | string | no |  | Group. Optional. Place the list inside this group to keep things organised. Leave empty to keep it ungrouped. A value the product loads from the provider, such as an id; write the value itself. |
| `legislation` | string | no | `0` | Legislation. Legal basis for collecting these contacts. Pick the regulation your audience is covered by; this affects what consent text INBOX shows. One of `0`, `1`, `2`, `3`. |

### `update_contact`

**Update Contact.** Updates an existing INBOX contact identified by its contact id, setting its tags. Use to modify a known contact rather than create one. Requires the contact id; applying the same tags again leaves the contact in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact. Select the contact to update. Contacts are listed under Contacts in your INBOX dashboard. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | no |  | Tags. Optional. Tags to attach to the contact (e.g. "vip", "newsletter"). Leave empty to keep existing tags. |

### `unsubscribe_contact`

**Mark Contact as Unsubscribed.** Sets an existing INBOX contact's deliverability status, defaulting to Unsubscribed so they stop receiving campaigns; the status can instead be set to Hard Bounce or Spam Reported. Use to suppress a contact or record a deliverability outcome. Requires the contact id; setting the same status again is a no-op. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact. Select the contact to update. Contacts are listed under Contacts in your INBOX dashboard. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | yes | `3` | New Status. The status to apply to the contact. One of `3`, `2`, `4`. |

### `create_campaign`

**Create Campaign.** Creates and schedules an INBOX campaign that sends an existing saved newsletter from a verified sender to one or more contact lists, optionally at a future planned time. Use to broadcast a newsletter to lists. Requires a sender, a newsletter id, and at least one target list; the newsletter must already exist. Not idempotent: each call creates a new campaign. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `senderAccountId` | string | yes |  | Sender. The verified sender the campaign emails are sent from. Add senders under Settings > Senders in INBOX. A value the product loads from the provider, such as an id; write the value itself. |
| `newsletterId` | string | yes |  | Newsletter ID. The ID of the saved newsletter to send in the campaign. You can find newsletter IDs by using the "List Newsletters" action or by looking at the URL when editing a newsletter in INBOX (e.g. https://app.inboxroad.com/newsletters/12345/edit, where 12345 is the newsletter ID). |
| `lists` | array | yes |  | Contact Lists. Select one or more INBOX contact lists. Lists are managed under Contacts > Lists in your dashboard. Values the product loads from the provider, such as ids; write an array of them. |
| `plannedTime` | ISO date-time string | no |  | Scheduled Send Time. Optional. When to send the campaign. Leave empty to use INBOX defaults. Use a future date/time. |
| `notifyWhenStart` | boolean | no | `false` | Notify when campaign starts. If enabled, INBOX emails you when the campaign starts sending. |
| `notifyWhenEnd` | boolean | no | `false` | Notify when campaign ends. If enabled, INBOX emails you when the campaign finishes sending. |

### `send_transactional_email`

**Send Transactional Email.** Sends a single one-off transactional HTML email to one recipient through INBOX Notify, for messages like password resets, receipts, or welcome emails. Use for direct triggered email rather than list campaigns. Requires from name, from email, recipient, subject, and HTML body; the from-email domain must already be authenticated in INBOX Notify. Optional merge-field values replace #key# placeholders in the HTML. Not idempotent: each call sends another email. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fromName` | string | yes |  | From Name. The display name shown to recipients (e.g. "Acme Support"). |
| `fromEmail` | string | yes |  | From Email. Verified sender email. The domain must already be authenticated in INBOX Notify, otherwise the email will be rejected. |
| `toEmail` | string | yes |  | To Email. Email address of the recipient. |
| `subject` | string | yes |  | Subject. Email subject line. |
| `htmlContent` | string | yes |  | HTML Content. The HTML body of the email. You can reference INBOX merge fields with `#fieldName#` and provide values in Custom Fields below. |
| `customFields` | object | no |  | Merge Field Values. Optional. Key-value pairs that replace `#key#` placeholders in your HTML (e.g. `{ "name": "Jane", "code": "12345" }`). |

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

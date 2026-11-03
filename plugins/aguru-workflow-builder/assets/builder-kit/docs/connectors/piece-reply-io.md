# Reply.io

Sales engagement platform for contacts, campaigns, and outbound outreach workflows.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-reply-io'
  version: '0.2.0'
```

Categories: SALES_AND_CRM, MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Reply.io

> Your Reply.io API key. Find it in Reply.io under **Settings → API**.

## Actions

### `get_contact`

**Get Contact.** Fetch a single Reply.io contact and their profile/stats by exact email address. Use to check whether a contact exists or to read their current details before acting on them. Email is required; this is a read-only lookup that is safe to retry. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Contact Email Address. Email address of the contact to look up. |

### `create_or_update_contact`

**Create or Update Contact.** Upsert a contact in Reply.io keyed on email: creates the contact if the email is new, otherwise updates the existing record with the supplied fields. Use to store or refresh contact details without enrolling them in any campaign. Email and first name are required; repeating with the same input converges to the same stored record. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. The contact's email address. Used to identify and deduplicate contacts. |
| `firstName` | string | yes |  | First Name. Contact's first name. |
| `lastName` | string | no |  | Last Name. Contact's last name. |
| `company` | string | no |  | Company. The company or organisation the contact works for. |
| `title` | string | no |  | Job Title. Contact's job title, e.g. "VP of Sales" or "Marketing Manager". |
| `phone` | string | no |  | Phone Number. Contact's phone number. |
| `linkedInProfile` | string | no |  | LinkedIn Profile URL. Full URL to the contact's LinkedIn profile, e.g. https://linkedin.com/in/janedoe. |
| `city` | string | no |  | City. City the contact is based in. |
| `state` | string | no |  | State / Province. State or province the contact is based in. |
| `country` | string | no |  | Country. Country the contact is based in. |
| `timeZoneId` | string | no |  | Time Zone. IANA time zone name used to schedule emails at the right local time, e.g. "America/New_York" or "Europe/London". |

### `delete_contact`

**Delete Contact.** Permanently delete a contact from Reply.io by exact email address; this also removes them from any campaigns and cannot be undone. Use only when the contact record should be erased entirely rather than just stopped (prefer the remove-from-campaign or mark actions to merely halt outreach). Repeating the call leaves the contact deleted, so it is safe to retry. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Contact Email Address. Email address of the contact to permanently delete. |

### `create_and_push_to_campaign`

**Add Contact to Campaign.** Upsert a contact (by email) and in the same call enrol them into the given campaign so outbound outreach begins. Use when adding a brand-new lead to a sequence in one step; if the contact already exists in Reply.io, prefer Push Contact to Campaign instead. Requires a target campaign id plus email and first name. Not idempotent: it enrolls the contact and starts sending outreach on each call. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Campaign. The Reply.io campaign to use. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email Address. The contact's email address. Used to identify and deduplicate contacts. |
| `firstName` | string | yes |  | First Name. Contact's first name. |
| `lastName` | string | no |  | Last Name. Contact's last name. |
| `company` | string | no |  | Company. The company or organisation the contact works for. |
| `title` | string | no |  | Job Title. Contact's job title, e.g. "VP of Sales" or "Marketing Manager". |
| `phone` | string | no |  | Phone Number. Contact's phone number. |
| `linkedInProfile` | string | no |  | LinkedIn Profile URL. Full URL to the contact's LinkedIn profile, e.g. https://linkedin.com/in/janedoe. |
| `notes` | string | no |  | Notes. Internal notes about this contact. Not visible to the contact. |
| `city` | string | no |  | City. City the contact is based in. |
| `state` | string | no |  | State / Province. State or province the contact is based in. |
| `country` | string | no |  | Country. Country the contact is based in. |
| `timeZoneId` | string | no |  | Time Zone. IANA time zone name used to schedule emails at the right local time, e.g. "America/New_York" or "Europe/London". |

### `push_to_campaign`

**Push Contact to Campaign.** Enrol an already-existing Reply.io contact (by email) into a campaign so outbound outreach begins; the optional Force Push flag moves them in even if they are already active in another campaign (otherwise such contacts are skipped). Use when the contact already exists and only needs to be added to a sequence; use Add Contact to Campaign instead if you also need to create the contact. Requires a target campaign id and the contact email. Not idempotent: it enrolls and starts sending outreach on each call. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Campaign. The Reply.io campaign to use. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Contact Email Address. Email address of the contact to add to the campaign. |
| `forcePush` | boolean | no | `false` | Force Push. Move the contact into this campaign even if they are already active in another campaign. Leave off to skip contacts already in an active campaign. |

### `remove_from_campaign`

**Remove Contact from Campaign.** Remove a contact (by email) from one specific campaign so they stop receiving its outreach, while keeping their contact record and any other campaign enrolments intact. Use to pull a contact out of a single sequence; use Remove Contact from All Campaigns to halt every sequence at once. Requires the target campaign id and the contact email. Idempotent: repeating leaves the contact removed from that campaign. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaignId` | string | yes |  | Campaign. The Reply.io campaign to use. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Contact Email Address. Email address of the contact to remove from the campaign. |

### `remove_from_all_campaigns`

**Remove Contact from All Campaigns.** Remove a contact (by email) from every campaign they are enrolled in so no further outreach is sent, while keeping their contact record in Reply.io. Use to fully stop outreach to someone without deleting them; use Remove Contact from Campaign to pull them from just one sequence. Requires only the contact email. Idempotent: repeating leaves the contact out of all campaigns. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Contact Email Address. Email address of the contact to remove from all campaigns. |

### `mark_replied`

**Mark Contact as Replied.** Mark a contact (by email) as having replied, which stops further follow-up emails to them across all active campaigns. Use when a reply has been detected and outreach should pause for that reason specifically (vs. Mark Contact as Finished, which closes them out as fully completed). Requires only the contact email. Idempotent: repeating leaves the contact in the replied state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Contact Email Address. Email address of the contact to mark as replied. |

### `mark_finished`

**Mark Contact as Finished.** Mark a contact (by email) as finished so they no longer receive emails in any campaign, signalling that all outreach to them is complete. Use to close out a contact whose sequence is done (vs. Mark Contact as Replied, which pauses specifically because they responded). Requires only the contact email. Idempotent: repeating leaves the contact in the finished state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Contact Email Address. Email address of the contact to mark as finished. |

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

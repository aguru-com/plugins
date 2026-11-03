# Brevo

Email, SMS and contact marketing platform, formerly Sendinblue.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-sendinblue'
  version: '0.5.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
> 1. Log in to Brevo.
> 2. Open the account menu, go to **SMTP & API** and open the **API Keys** tab.
> 3. Click **Generate a new API key**, name it and copy the key.

## Actions

### `create_or_update_contact`

**Create or Update Contact.** Upserts a Brevo (formerly Sendinblue) contact keyed on its email address, setting attributes, list membership, and email/SMS blacklist flags. Use to add a new subscriber or sync changes to an existing one; because it is keyed on email with update enabled, re-running with the same input is idempotent and does not create duplicates. Email is required, and any attributes referenced must already exist in the Brevo account. Blacklist flags are only sent when explicitly set, so leaving them untouched preserves the contact current subscription state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The contact is matched by this address. |
| `ext_id` | string | no |  | External ID. Your own ID for this contact. |
| `attributes` | object | no |  | Attributes. Use attribute names from your Brevo account, such as FIRSTNAME. |
| `list_ids` | array | no |  | Add to Lists. The contact stays on lists it is already in. Values the product loads from the provider, such as ids; write an array of them. |
| `email_blacklisted` | boolean | no |  | Unsubscribe From Email. Unticked keeps the current setting. |
| `sms_blacklisted` | boolean | no |  | Unsubscribe From SMS. Unticked keeps the current setting. |
| `blocked_sender_addresses` | array | no |  | Blocked Sender Addresses. Senders whose transactional emails this contact will not get. |

Output fields:

- `id`: Contact ID (number)
- `email`: Email (email)
- `attributes`: Attributes (an object whose keys vary)
- `listIds`: List IDs
- `emailBlacklisted`: Email Blacklisted (boolean)
- `smsBlacklisted`: SMS Blacklisted (boolean)
- `whatsappBlacklisted`: WhatsApp Blacklisted (boolean)
- `createdAt`: Created At (datetime)
- `modifiedAt`: Modified At (datetime)
- `statistics`: Statistics

### `find_contact`

**Find Contact.** Looks up a single Brevo contact by email, phone number, contact id, external id, WhatsApp id or landline number, and returns its attributes, list membership and blacklist flags. Returns found:false instead of failing when no contact matches, so it is safe to branch on. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier_type` | string | no | `"email_id"` | Look Up By. What kind of value you are searching with. One of `"email_id"`, `"phone_id"`, `"contact_id"`, `"ext_id"`, `"whatsapp_id"`, `"landline_number_id"`. |
| `identifier` | string | yes |  | Value. The email, number or ID to search for. |

Output fields:

- `found`: Found (boolean)
- `data`: Contact
- `data.id`: Contact ID (number)
- `data.email`: Email (email)
- `data.attributes`: Attributes (an object whose keys vary)
- `data.listIds`: List IDs
- `data.emailBlacklisted`: Email Blacklisted (boolean)
- `data.smsBlacklisted`: SMS Blacklisted (boolean)
- `data.whatsappBlacklisted`: WhatsApp Blacklisted (boolean)
- `data.createdAt`: Created At (datetime)
- `data.modifiedAt`: Modified At (datetime)
- `data.statistics`: Statistics

### `unsubscribe_contact`

**Unsubscribe Contact.** Opts a Brevo contact out by setting its email and optionally SMS blacklist flags, and can additionally remove it from specific lists. Use this to honour an unsubscribe request received elsewhere. Brevo answers with an empty body, so this returns a success flag. Idempotent — unsubscribing an already unsubscribed contact changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The contact is matched by this address. |
| `unsubscribe_email` | boolean | no | `true` | Unsubscribe From Email. Unticked keeps the current setting. |
| `unsubscribe_sms` | boolean | no |  | Unsubscribe From SMS. Unticked keeps the current setting. |
| `unlink_list_ids` | array | no |  | Remove From Lists. Lists to take the contact off. Values the product loads from the provider, such as ids; write an array of them. |

### `send_transactional_email`

**Send Transactional Email.** Sends a one-off transactional email through Brevo, either by supplying subject and HTML content directly or by selecting a saved template and passing its variables. Use for receipts, password resets, notifications and other per-recipient mail; not for bulk marketing campaigns. Requires a verified sender unless a template with its own sender is used. Not idempotent — each call sends a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | array | yes |  | To. Each item: { `email`, `name`? }. |
| `cc` | array | no |  | Cc. Each item: { `email`, `name`? }. |
| `bcc` | array | no |  | Bcc. Each item: { `email`, `name`? }. |
| `reply_to_email` | string | no |  | Reply To. Where replies go. Empty: back to the sender. |
| `sender_email` | string | no |  | Sender. The verified sender the email is sent from. A value the product loads from the provider, such as an id; write the value itself. |
| `sender_name` | string | no |  | Sender Name. Replaces the display name of the selected sender. |
| `template_id` | string | no |  | Template. Send a saved Brevo template instead of supplying subject and content. A value the product loads from the provider, such as an id; write the value itself. |
| `params` | object | no |  | Template Parameters. Values for the template placeholders, by name. |
| `subject` | string | no |  | Subject. Required when no template is picked. |
| `html_content` | string | no |  | HTML Content. Required when no template is picked. |
| `text_content` | string | no |  | Text Content. Plain text version for inboxes that cannot show HTML. |
| `attachments` | array | no |  | Attachments. Files by public URL that Brevo downloads when sending. Each item: { `url`, `name` }. |
| `tags` | array | no |  | Tags. Labels used to filter this message in Brevo reporting. |
| `scheduled_at` | ISO date-time string | no |  | Send At. Leave empty to send right away. |
| `sandbox` | boolean | no |  | Sandbox Mode. Brevo checks the request but delivers nothing. |

Output fields:

- `messageId`: Message ID

### `send_transactional_sms`

**Send Transactional SMS.** Sends a one-off transactional SMS through Brevo to a single mobile number. The recipient must include the country code without a leading plus or zeros, and the sender is limited to 11 alphanumeric or 15 numeric characters. Content longer than 160 characters is split into multiple messages and billed accordingly. Not idempotent — each call sends a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sender` | string | yes |  | Sender. Up to 11 letters and digits, or 15 digits only. |
| `recipient` | string | yes |  | Recipient. Country code first, no + or leading zeros. |
| `content` | string | yes |  | Content. Over 160 characters is sent as several messages. |
| `type` | string | no | `"transactional"` | Message Type. Transactional for order and account notices, Marketing for promotions. One of `"transactional"`, `"marketing"`. |
| `tag` | string | no |  | Tag. Label used to filter this message in Brevo reporting. |
| `web_url` | string | no |  | Webhook URL. Brevo posts delivery reports for this message here. |
| `unicode_enabled` | boolean | no |  | Send as Unicode. Needed for emoji and non-Latin text; 70 characters per part. |
| `organisation_prefix` | string | no |  | Brand Name. Shown before the message so people know who sent it. |

Output fields:

- `messageId`: Message ID (number)

### `create_event`

**Create Event.** Records a custom event against a Brevo contact so automations and segments can react to it. Identify the contact by email, contact id or external id, and attach arbitrary event properties. Brevo answers with an empty body, so this returns a success flag rather than the stored event. Not idempotent — each call records another occurrence. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `event_name` | string | yes |  | Name. How the event is named in Brevo. |
| `event_date` | ISO date-time string | no |  | Date. Leave empty to use the current time. |
| `event_properties` | object | no |  | Details. Event data, such as an order ID and total. |
| `email` | string | yes |  | Email. The contact the event belongs to. |
| `contact_properties` | object | no |  | Attributes. Contact attributes to update, such as FIRSTNAME. |

### `list_contacts`

**List Contacts.** Lists Brevo contacts, optionally filtered by list membership, segment, creation date, or last modification date, with pagination and sort control. Use this to discover contacts matching criteria before acting on them with other contact actions. List and segment filters are mutually exclusive per Brevo. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_ids` | array | no |  | List IDs. Only return contacts belonging to these list IDs. Mutually exclusive with Segment ID. |
| `segment_id` | string | no |  | Segment ID. Only return contacts belonging to this segment. Mutually exclusive with List IDs. |
| `created_since` | ISO date-time string | no |  | Created Since. Only return contacts created on or after this date. |
| `modified_since` | ISO date-time string | no |  | Modified Since. Only return contacts modified on or after this date. |
| `limit` | number | no | `50` | Limit. Number of contacts to return. Maximum 1000. |
| `offset` | number | no | `0` | Offset. Number of contacts to skip, for pagination. |
| `sort` | string | no |  | Sort. Sort contacts on their creation date. One of `"asc"`, `"desc"`. |

Output fields:

- `contacts`: Contacts
- `contacts[].id`: Contact ID (number)
- `contacts[].email`: Email (email)
- `contacts[].attributes`: Attributes (an object whose keys vary)
- `contacts[].listIds`: List IDs
- `contacts[].emailBlacklisted`: Email Blacklisted (boolean)
- `contacts[].smsBlacklisted`: SMS Blacklisted (boolean)
- `contacts[].whatsappBlacklisted`: WhatsApp Blacklisted (boolean)
- `contacts[].createdAt`: Created At (datetime)
- `contacts[].modifiedAt`: Modified At (datetime)
- `contacts[].statistics`: Statistics
- `count`: Count (number)

### `update_contact`

**Update Contact.** Updates an existing Brevo contact identified by email, phone number, contact id, external id, WhatsApp id or landline number, setting attributes, list membership, blacklist flags, or a new external id. This complements create_or_update_contact: use create_or_update_contact when you only have an email and want create-or-update semantics; use update_contact when you need to update by an identifier other than email, or want a hard 404 failure instead of silently creating a new contact. Idempotent — re-applying the same values converges on the same contact state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | yes |  | Identifier. The value to look the contact up by, for example an email address. |
| `identifier_type` | string | no | `"email_id"` | Identifier Type. How the identifier above should be interpreted. One of `"email_id"`, `"phone_id"`, `"contact_id"`, `"ext_id"`, `"whatsapp_id"`, `"landline_number_id"`. |
| `attributes` | object | no |  | Attributes. Pass the set of attributes and their values. Attribute names must already exist in your Brevo account and be passed in capital letters, for eg: {"FNAME":"Elly", "LNAME":"Roger"}. Only the attributes you list are changed; the rest are left as they are. |
| `ext_id` | string | no |  | External ID. Sets a new external id for the contact. |
| `email_blacklisted` | boolean | no |  | Email Blacklisted?. Set this field to blacklist the contact for emails (emailBlacklisted = true). Leave untouched to keep the contact's current setting. |
| `sms_blacklisted` | boolean | no |  | SMS Blacklisted?. Set this field to blacklist the contact for SMS (smsBlacklisted = true). Leave untouched to keep the contact's current setting. |
| `list_ids` | array | no |  | Add to Lists. Lists to add the contact to. Values the product loads from the provider, such as ids; write an array of them. |
| `unlink_list_ids` | array | no |  | Remove from Lists. Lists to remove the contact from. Values the product loads from the provider, such as ids; write an array of them. |
| `blocked_sender_addresses` | array | no |  | Blocked Sender Addresses. Sender email addresses this contact must not receive transactional email from. Leave empty to change nothing. |

Output fields:

- `success`: Success (boolean)

### `delete_contact`

**Delete Contact.** Permanently deletes a Brevo contact identified by email, phone number, contact id, external id, WhatsApp id or landline number. This removes the contact record entirely and cannot be undone; prefer unsubscribe_contact when the intent is only to stop sending, not to erase the record. Not idempotent — retrying after a successful delete returns a 404 for the now-missing contact. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | yes |  | Identifier. The value to look the contact up by, for example an email address. |
| `identifier_type` | string | no | `"email_id"` | Identifier Type. How the identifier above should be interpreted. One of `"email_id"`, `"phone_id"`, `"contact_id"`, `"ext_id"`, `"whatsapp_id"`, `"landline_number_id"`. |

### `import_contacts`

**Import Contacts.** Submits a bulk contact import job to Brevo, from a public file URL or an inline list of email/attribute rows, optionally into an existing or newly created list. Poll the returned process id with Get Import Process, or track completion via the Notify URL webhook. Not idempotent — each call submits a new background import job, even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_url` | string | no |  | File URL. Public URL of a .txt, .csv, or .json file containing the contacts to import. Mutually exclusive with Inline Contacts. |
| `json_body` | array | no |  | Inline Contacts. Contact rows to import directly, without a file. Mutually exclusive with File URL. Each item: { `email`, `attributes`? }. |
| `list_ids` | array | no |  | Lists. Existing lists to import into. Values the product loads from the provider, such as ids; write an array of them. |
| `new_list_name` | string | no |  | New List Name. Creates a new list with this name and imports into it. Requires New List Folder ID. |
| `new_list_folder_id` | number | no |  | New List Folder ID. Folder to create the new list in. Requires New List Name. |
| `notify_url` | string | no |  | Notify URL. A webhook URL Brevo calls once the import finishes. |
| `email_blacklist` | boolean | no | `false` | Blacklist Imported Emails. |
| `sms_blacklist` | boolean | no | `false` | Blacklist Imported SMS Numbers. |
| `update_existing_contacts` | boolean | no | `true` | Update Existing Contacts. |
| `empty_contacts_attributes` | boolean | no | `false` | Reset Attributes on Existing Contacts. Blank out attributes not present in the import for contacts that already exist. |

Output fields:

- `processId`: Process ID (number)

### `get_import_process`

**Get Import Process.** Reads the current status of one Brevo background process by the id that Import Contacts returned. Status is one of queued, in_process, processing, completed, failed or cancelled; a completed import also carries links to CSV files listing invalid emails and duplicate records. This is a single status read, not a wait — call it again after a delay while the status is still queued, in_process or processing. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `process_id` | number | yes |  | Process ID. The process id returned by Import Contacts. |

Output fields:

- `id`: Process ID (number)
- `status`: Status
- `finished`: Finished (boolean)
- `name`: Process Name
- `export_url`: Export URL (url)
- `info`: Details
- `info.import`: Import Report
- `info.import.invalid_emails`: Invalid Emails CSV (url)
- `info.import.duplicate_contact_id`: Duplicate Contact IDs CSV (url)
- `info.import.duplicate_ext_id`: Duplicate External IDs CSV (url)
- `info.import.duplicate_email_id`: Duplicate Emails CSV (url)
- `info.import.duplicate_phone_id`: Duplicate Phone Numbers CSV (url)
- `info.import.duplicate_whatsapp_id`: Duplicate WhatsApp Numbers CSV (url)
- `info.import.duplicate_landline_number_id`: Duplicate Landline Numbers CSV (url)

### `list_contact_attributes`

**List Contact Attributes.** Lists every contact attribute configured in the Brevo account, with its category and type. Use this before calling create_or_update_contact or update_contact to discover valid attribute names, since Brevo rejects attributes that do not already exist. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `attributes`: Attributes
- `attributes[].name`: Name
- `attributes[].category`: Category
- `attributes[].type`: Type

### `get_contact_campaign_stats`

**Get Contact Campaign Stats.** Fetches a Brevo contact's campaign engagement statistics, such as opened, clicked, delivered, and unsubscribed events, optionally restricted to a date range. Start Date and End Date must both be supplied or both omitted, and Brevo caps the range at 90 days. Read-only and idempotent, though results can change over time as new engagement events occur. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifier` | string | yes |  | Identifier. Email address or numeric contact id of the contact. |
| `start_date` | string | no |  | Start Date. YYYY-MM-DD. Must be supplied together with End Date. |
| `end_date` | string | no |  | End Date. YYYY-MM-DD. Must be supplied together with Start Date. Brevo caps the range at 90 days. |

Output fields:

- `opened`: Opened
- `clicked`: Clicked
- `delivered`: Delivered
- `complaints`: Complaints
- `hardBounces`: Hard Bounces
- `softBounces`: Soft Bounces
- `messagesSent`: Messages Sent
- `unsubscriptions`: Unsubscriptions
- `transacAttributes`: Transactional Attributes

### `create_contact_list`

**Create Contact List.** Creates a new Brevo contact list inside a folder and returns its numeric id. Use List Contact Lists first to find a folder id if you do not already know one. Not idempotent — calling this again with the same name creates another list, Brevo does not dedupe by name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `folder_id` | number | yes |  | Folder ID. ID of the folder to create this list in. Use List Contact Lists first if you don't know a folder id; Brevo's default folder for a new account is usually id 1, but this varies. |

Output fields:

- `id`: List ID (number)

### `list_contact_lists`

**List Contact Lists.** Lists Brevo contact lists with their id, name, folder id and subscriber counts. This is the way to resolve a list name to the numeric list id that other actions such as Create Contact List, Get Contact List or contact management actions require. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `10` | Limit. Number of lists to return per page. Maximum 50. Defaults to 10. |
| `offset` | number | no | `0` | Offset. Index of the first list to return. Defaults to 0. |
| `sort` | string | no |  | Sort. Sort order for the results, based on the list creation date. One of `"asc"`, `"desc"`. |

Output fields:

- `lists`: Lists
- `lists[].id`: List ID (number)
- `lists[].name`: Name
- `lists[].folderId`: Folder ID (number)
- `lists[].uniqueSubscribers`: Unique Subscribers (number)
- `lists[].totalSubscribers`: Total Subscribers (number)
- `lists[].totalBlacklisted`: Total Blacklisted (number)
- `count`: Count (number)

### `get_contact_list`

**Get Contact List.** Fetches a single Brevo contact list by its numeric id, including subscriber counts and folder id. Pass start_date and end_date together to also include the list campaign statistics for that window. Returns found:false instead of failing when the list id does not exist, so it is safe to branch on. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | number | yes |  | List ID. |
| `start_date` | string | no |  | Start Date. ISO 8601 date (e.g. 2023-01-01). Must be given together with End Date for campaign statistics to appear in the response. |
| `end_date` | string | no |  | End Date. ISO 8601 date (e.g. 2023-01-31). Must be given together with Start Date for campaign statistics to appear in the response. |

Output fields:

- `found`: Found (boolean)
- `data`: List
- `data.id`: List ID (number)
- `data.name`: Name
- `data.folderId`: Folder ID (number)
- `data.totalSubscribers`: Total Subscribers (number)
- `data.uniqueSubscribers`: Unique Subscribers (number)
- `data.totalBlacklisted`: Total Blacklisted (number)
- `data.createdAt`: Created At (datetime)
- `data.dynamicList`: Dynamic List (boolean)

### `create_company`

**Create Company.** Creates a new Brevo CRM company with a name and optional custom attributes, and can link it to existing contacts and deals in the same call. Each call creates a new company record, so retries duplicate it — look it up first with List Companies if you are unsure whether it already exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Name of the company. |
| `attributes` | object | no |  | Attributes. Custom company attributes such as domain, industry, phone_number, address, city, country. Attribute keys depend on your Brevo account's CRM configuration. |
| `country_code` | number | no |  | Phone Country Code. Country code for any phone number in attributes, e.g. 1 for USA, 44 for UK. Only needed when a phone attribute is set. |
| `linked_contacts_ids` | array | no |  | Linked Contact IDs. Existing Brevo contact IDs to link to this company. |
| `linked_deals_ids` | array | no |  | Linked Deal IDs. Existing Brevo deal IDs to link to this company. |

Output fields:

- `id`: Company ID

### `get_company`

**Get Company.** Looks up a single Brevo CRM company by its id and returns its attributes and linked contacts/deals. Returns found:false instead of failing when no company matches that id, so it is safe to branch on. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company_id` | string | yes |  | Company ID. The Brevo company id, e.g. '61a5cd07ca1347c82306ad06'. |

Output fields:

- `found`: Found (boolean)
- `data`: Company
- `data.id`: Company ID
- `data.attributes`: Attributes (an object whose keys vary)
- `data.linkedContactsIds`: Linked Contact IDs
- `data.linkedDealsIds`: Linked Deal IDs

### `list_companies`

**List Companies.** Lists Brevo CRM companies with pagination, sorting and an optional raw filter string, and can filter by linked contact or deal ids. Use this to find a company id before calling Get Company, Delete Company, or to check whether a company already exists before Create Company. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no |  | Page. 1-based page index. |
| `limit` | number | no | `50` | Limit. Number of companies to return per page. Maximum 100. |
| `sort` | string | no |  | Sort. Sort order for the results. One of `"asc"`, `"desc"`. |
| `sort_by` | string | no |  | Sort By. Field to sort by, e.g. createdAt or name. |
| `filters` | string | no |  | Filters. Raw JSON filter string per Brevo's docs, e.g. {"attributes.name":"Acme"}. |
| `linked_contacts_ids` | array | no |  | Linked Contact IDs. Only return companies linked to any of these Brevo contact ids. |
| `linked_deals_ids` | array | no |  | Linked Deal IDs. Only return companies linked to any of these Brevo deal ids. |

Output fields:

- `items`: Companies
- `items[].id`: Company ID
- `items[].attributes`: Attributes (an object whose keys vary)
- `items[].linkedContactsIds`: Linked Contact IDs
- `items[].linkedDealsIds`: Linked Deal IDs
- `pager`: Pager
- `pager.current`: Current Page (number)
- `pager.limit`: Limit (number)
- `pager.count`: Count (number)
- `pager.total`: Total (number)

### `delete_company`

**Delete Company.** Permanently removes a Brevo CRM company record by id. This cannot be undone, and contacts or deals linked to the company are not themselves deleted. Not idempotent — a retry after the first successful call 404s because the company no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `company_id` | string | yes |  | Company ID. The Brevo company id, e.g. '61a5cd07ca1347c82306ad06'. |

### `list_crm_notes`

**List CRM Notes.** Lists Brevo CRM notes, optionally restricted to notes attached to a company, deal or contact entity and to a date range. Use this to review or audit notes already logged on a CRM record instead of guessing their content. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entity` | string | no |  | Entity Type. Restrict to notes attached to this entity type. One of `"companies"`, `"deals"`, `"contacts"`. |
| `entity_ids` | string | no |  | Entity IDs. Comma-separated entity IDs to filter by, e.g. a specific company or contact id. |
| `date_from` | number | no |  | Date From. Unix timestamp in milliseconds. |
| `date_to` | number | no |  | Date To. Unix timestamp in milliseconds. |
| `limit` | number | no | `50` | Limit. Number of notes to return per page. Defaults to 50. |
| `offset` | number | no | `0` | Offset. Index of the first note to return. Defaults to 0. |
| `sort` | string | no |  | Sort. Sort order for the results, based on the note creation date. One of `"asc"`, `"desc"`. |

Output fields:

- `[].id`: Note ID
- `[].text`: Text
- `[].contactIds`: Contact IDs
- `[].companyIds`: Company IDs
- `[].dealIds`: Deal IDs
- `[].createdAt`: Created At (datetime)
- `[].updatedAt`: Updated At (datetime)

### `list_senders`

**List Senders.** Lists every verified sender configured in the Brevo account, optionally filtered by dedicated IP or sender domain. This is the standalone way to see all senders; the Send Transactional Email action uses this same endpoint internally to populate its sender dropdown. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ip` | string | no |  | IP. Filter by a specific dedicated IP; dedicated-IP accounts only. |
| `domain` | string | no |  | Domain. Filter by sender domain. |

Output fields:

- `senders`: Senders
- `senders[].id`: Sender ID (number)
- `senders[].name`: Name
- `senders[].email`: Email (email)
- `senders[].active`: Active (boolean)

### `list_sender_domains`

**List Sender Domains.** Lists every sender domain configured in the Brevo account along with its authentication and verification status. Use this to check whether a domain is verified before sending from it, rather than guessing its DNS setup state. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `domains`: Domains
- `domains[].id`: Domain ID
- `domains[].domain_name`: Domain Name
- `domains[].authenticated`: Authenticated (boolean)
- `domains[].verified`: Verified (boolean)
- `count`: Count (number)

### `create_or_update_email_template`

**Create or Update Email Template.** Provide template_id for a safe, idempotent update of an existing template; omitting it creates a new template on every call. Creating requires template_name, subject, sender_email and either html_content or html_url. Updating only changes the fields supplied — omitted fields keep their current value. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | number | no |  | Template ID. Provide to update an existing template; omit to create a new one. |
| `template_name` | string | no |  | Template Name. Required when creating a new template. |
| `subject` | string | no |  | Subject. Required when creating a new template. |
| `sender_email` | string | no |  | Sender. The verified sender the email is sent from. A value the product loads from the provider, such as an id; write the value itself. |
| `sender_name` | string | no |  | Sender Name. |
| `html_content` | string | no |  | HTML Content. Required when creating a new template unless HTML URL is given. Must be at least 10 characters. |
| `html_url` | string | no |  | HTML URL. URL Brevo fetches the HTML content from. Mutually exclusive with HTML Content. |
| `reply_to_email` | string | no |  | Reply To. |
| `to_field` | string | no |  | To Field. Personalization used for the display name in the To field, for example {{contact.FIRSTNAME}}. |
| `is_active` | boolean | no |  | Active. Leave untouched to keep the template's current active state. |
| `tag` | string | no |  | Tag. |
| `attachment_url` | string | no |  | Attachment URL. |

Output fields:

- `id`: Template ID (number)
- `success`: Success (boolean)

### `get_email_template`

**Get Email Template.** Looks up a single Brevo email template by its id and returns its full details including subject, sender and HTML content. Returns found:false instead of failing when no template matches, so it is safe to branch on. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | string | yes |  | Template ID. The id of the template to fetch, for example 12. |

Output fields:

- `found`: Found (boolean)
- `data`: Template
- `data.id`: Template ID (number)
- `data.name`: Name
- `data.subject`: Subject
- `data.isActive`: Active (boolean)
- `data.sender`: Sender
- `data.sender.id`: Sender ID
- `data.sender.email`: Email (email)
- `data.sender.name`: Name
- `data.replyTo`: Reply To
- `data.htmlContent`: HTML Content (html)
- `data.tag`: Tag
- `data.createdAt`: Created At (datetime)
- `data.modifiedAt`: Modified At (datetime)

### `list_email_templates`

**List Email Templates.** Lists Brevo email templates, optionally filtered to only active or only inactive ones. Use Get Email Template to fetch the full details of one template once you have its id from this list. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_status` | boolean | no |  | Template Status. Filter to active (checked) or inactive (unchecked) templates; leave unset to return both. |
| `limit` | number | no | `50` | Limit. Maximum number of templates to return. Defaults to 50, max 1000. |
| `offset` | number | no | `0` | Offset. Number of templates to skip before starting to return results. |
| `sort` | string | no |  | Sort. Sort order applied to the results, based on creation date. One of `"asc"`, `"desc"`. |

Output fields:

- `templates`: Templates
- `templates[].id`: Template ID (number)
- `templates[].name`: Name
- `templates[].subject`: Subject
- `templates[].isActive`: Active (boolean)
- `templates[].sender`: Sender
- `templates[].sender.id`: Sender ID
- `templates[].sender.email`: Email (email)
- `templates[].sender.name`: Name
- `templates[].replyTo`: Reply To
- `templates[].htmlContent`: HTML Content (html)
- `templates[].tag`: Tag
- `templates[].createdAt`: Created At (datetime)
- `templates[].modifiedAt`: Modified At (datetime)
- `count`: Count (number)

### `delete_email_template`

**Delete Email Template.** Permanently deletes a Brevo email template by id. Brevo only allows deleting an inactive template — if this fails, deactivate the template first via Create or Update Email Template with is_active unchecked. Not idempotent — a retry after success errors because the template no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | number | yes |  | Template ID. The id of the template to delete. |

### `create_email_campaign`

**Create Email Campaign.** Creates a new Brevo email marketing campaign, either by copying an existing transactional template or by supplying a subject with HTML content, and optionally assigns recipient lists and a send schedule. Use for bulk/marketing sends; use Send Transactional Email for per-recipient transactional mail instead. Provide either a template, or a subject with HTML content/HTML URL — Brevo rejects the request otherwise. Omitting Scheduled At creates an unsent draft. Not idempotent — each call creates a new campaign. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Internal campaign name shown only in the Brevo dashboard, not to recipients. |
| `sender_email` | string | no |  | Sender. The verified sender the email is sent from. A value the product loads from the provider, such as an id; write the value itself. |
| `sender_name` | string | no |  | Sender Name. Overrides the display name of the selected sender. |
| `sender_id` | number | no |  | Sender ID. Alternative to Sender Email/Sender Name: an existing Brevo sender id. Provide one or the other, not both. |
| `subject` | string | no |  | Subject. Subject line shown to recipients. Required unless Template is selected. |
| `template_id` | number | no |  | Template ID. ID of an existing Brevo transactional template whose content is copied into this campaign. Mutually exclusive with HTML Content and HTML URL. |
| `html_content` | string | no |  | HTML Content. Required unless a template is selected. Mutually exclusive with HTML URL. |
| `html_url` | string | no |  | HTML URL. URL Brevo fetches the HTML content from. Mutually exclusive with HTML Content. |
| `list_ids` | array | no |  | Recipient Lists. Contact lists to send this campaign to. Values the product loads from the provider, such as ids; write an array of them. |
| `exclusion_list_ids` | array | no |  | Exclude Lists. Contact lists to exclude from this campaign, even if a contact also belongs to a recipient list. Values the product loads from the provider, such as ids; write an array of them. |
| `scheduled_at` | ISO date-time string | no |  | Scheduled At. Schedule the send; omit to create an unsent draft. |
| `reply_to_email` | string | no |  | Reply To. Email address replies are sent to, if different from the sender. |
| `preview_text` | string | no |  | Preview Text. Preheader text shown next to the subject line in most inboxes. |
| `to_field` | string | no |  | To Field. Overrides how the recipient's name/email appears in the To field, e.g. "{{contact.FIRSTNAME}}". |
| `params` | object | no |  | Template Parameters. Personalization variables available when Template is selected. |
| `footer` | string | no |  | Footer. HTML footer appended to the campaign, typically the unsubscribe link and address. |
| `header` | string | no |  | Header. HTML header prepended to the campaign. |
| `utm_campaign` | string | no |  | UTM Campaign. Value used for the utm_campaign tracking parameter on links in this email. |

Output fields:

- `id`: Campaign ID (number)

### `update_email_campaign`

**Update Email Campaign.** Updates fields on an existing Brevo email campaign such as its name, subject, content, recipient lists or schedule. Only the fields you provide are changed; omitted fields are left untouched. Use before Send Email Campaign Now to adjust a draft. Idempotent — re-applying the same values converges on the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | number | yes |  | Campaign ID. |
| `name` | string | no |  | Name. Internal campaign name shown only in the Brevo dashboard, not to recipients. |
| `sender_email` | string | no |  | Sender. The verified sender the email is sent from. A value the product loads from the provider, such as an id; write the value itself. |
| `sender_name` | string | no |  | Sender Name. Overrides the display name of the selected sender. |
| `sender_id` | number | no |  | Sender ID. Alternative to Sender Email/Sender Name: an existing Brevo sender id. Provide one or the other, not both. |
| `subject` | string | no |  | Subject. Subject line shown to recipients. |
| `html_content` | string | no |  | HTML Content. Mutually exclusive with HTML URL. |
| `html_url` | string | no |  | HTML URL. URL Brevo fetches the HTML content from. Mutually exclusive with HTML Content. |
| `list_ids` | array | no |  | Recipient Lists. Contact lists to send this campaign to. Values the product loads from the provider, such as ids; write an array of them. |
| `exclusion_list_ids` | array | no |  | Exclude Lists. Contact lists to exclude from this campaign, even if a contact also belongs to a recipient list. Values the product loads from the provider, such as ids; write an array of them. |
| `scheduled_at` | ISO date-time string | no |  | Scheduled At. Schedule the send; omit to leave the current schedule untouched. |
| `reply_to_email` | string | no |  | Reply To. Email address replies are sent to, if different from the sender. |
| `preview_text` | string | no |  | Preview Text. Preheader text shown next to the subject line in most inboxes. |
| `to_field` | string | no |  | To Field. Overrides how the recipient's name/email appears in the To field, e.g. "{{contact.FIRSTNAME}}". |
| `params` | object | no |  | Template Parameters. Personalization variables available when the campaign uses a template. |
| `footer` | string | no |  | Footer. HTML footer appended to the campaign, typically the unsubscribe link and address. |
| `header` | string | no |  | Header. HTML header prepended to the campaign. |
| `utm_campaign` | string | no |  | UTM Campaign. Value used for the utm_campaign tracking parameter on links in this email. |

Output fields:

- `success`: Success (boolean)

### `get_email_campaign`

**Get Email Campaign.** Fetches a single Brevo email campaign by its numeric id, including its recipients, content and send statistics. Pass Statistics to limit the returned report to one category (e.g. Global Stats) instead of the full report. Returns found:false instead of failing when the campaign id does not exist, so it is safe to branch on. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | number | yes |  | Campaign ID. |
| `statistics` | string | no |  | Statistics. Limit the returned statistics to one category; omit for the full report. One of `"globalStats"`, `"linksStats"`, `"statsByDomain"`, `"statsByDevice"`, `"statsByBrowser"`. |

Output fields:

- `found`: Found (boolean)
- `data`: Campaign
- `data.id`: Campaign ID (number)
- `data.name`: Name
- `data.subject`: Subject
- `data.type`: Type
- `data.status`: Status
- `data.sender`: Sender
- `data.sender.id`: Sender ID
- `data.sender.email`: Email (email)
- `data.sender.name`: Name
- `data.htmlContent`: HTML Content (html)
- `data.scheduledAt`: Scheduled At (datetime)
- `data.createdAt`: Created At (datetime)
- `data.modifiedAt`: Modified At (datetime)
- `data.recipients`: Recipients
- `data.recipients.lists`: List IDs
- `data.recipients.exclusionLists`: Exclusion List IDs
- `data.statistics`: Statistics
- `data.statistics.globalStats`: Global Stats
- `data.statistics.globalStats.sent`: Sent (number)
- `data.statistics.globalStats.delivered`: Delivered (number)
- `data.statistics.globalStats.viewed`: Viewed (number)
- `data.statistics.globalStats.uniqueViews`: Unique Views (number)
- `data.statistics.globalStats.clickers`: Clickers (number)
- `data.statistics.globalStats.uniqueClicks`: Unique Clicks (number)
- `data.statistics.globalStats.hardBounces`: Hard Bounces (number)
- `data.statistics.globalStats.softBounces`: Soft Bounces (number)
- `data.statistics.globalStats.unsubscriptions`: Unsubscriptions (number)
- `data.statistics.globalStats.complaints`: Complaints (number)
- `data.statistics.globalStats.opensRate`: Opens Rate (number)

### `list_email_campaigns`

**List Email Campaigns.** Lists Brevo email campaigns with optional filters by type, status and date range, returning each campaign id, name, status and subject. Use this to resolve a campaign name to the numeric id that Get Email Campaign, Update Email Campaign and Send Email Campaign Now require. Start Date and End Date only narrow results when Status is "Sent" or left empty. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | no |  | Type. One of `"classic"`, `"trigger"`. |
| `status` | string | no |  | Status. One of `"suspended"`, `"archive"`, `"sent"`, `"queued"`, `"draft"`, `"inProcess"`, `"inReview"`. |
| `start_date` | ISO date-time string | no |  | Start Date. Only applies when Status is "Sent" or left empty. |
| `end_date` | ISO date-time string | no |  | End Date. Only applies when Status is "Sent" or left empty. |
| `limit` | number | no | `50` | Limit. Number of campaigns to return per page. Maximum 100. Defaults to 50. |
| `offset` | number | no | `0` | Offset. Index of the first campaign to return. Defaults to 0. |
| `sort` | string | no |  | Sort. Sort order for the results, based on the campaign creation date. One of `"asc"`, `"desc"`. |
| `exclude_html_content` | boolean | no |  | Exclude HTML Content. Leave the HTML content out of each campaign in the response. |

Output fields:

- `campaigns`: Campaigns
- `campaigns[].id`: Campaign ID (number)
- `campaigns[].name`: Name
- `campaigns[].subject`: Subject
- `campaigns[].type`: Type
- `campaigns[].status`: Status
- `campaigns[].sender`: Sender
- `campaigns[].sender.id`: Sender ID
- `campaigns[].sender.email`: Email (email)
- `campaigns[].sender.name`: Name
- `campaigns[].htmlContent`: HTML Content (html)
- `campaigns[].scheduledAt`: Scheduled At (datetime)
- `campaigns[].createdAt`: Created At (datetime)
- `campaigns[].modifiedAt`: Modified At (datetime)
- `campaigns[].recipients`: Recipients
- `campaigns[].recipients.lists`: List IDs
- `campaigns[].recipients.exclusionLists`: Exclusion List IDs
- `campaigns[].statistics`: Statistics
- `campaigns[].statistics.globalStats`: Global Stats
- `campaigns[].statistics.globalStats.sent`: Sent (number)
- `campaigns[].statistics.globalStats.delivered`: Delivered (number)
- `campaigns[].statistics.globalStats.viewed`: Viewed (number)
- `campaigns[].statistics.globalStats.uniqueViews`: Unique Views (number)
- `campaigns[].statistics.globalStats.clickers`: Clickers (number)
- `campaigns[].statistics.globalStats.uniqueClicks`: Unique Clicks (number)
- `campaigns[].statistics.globalStats.hardBounces`: Hard Bounces (number)
- `campaigns[].statistics.globalStats.softBounces`: Soft Bounces (number)
- `campaigns[].statistics.globalStats.unsubscriptions`: Unsubscriptions (number)
- `campaigns[].statistics.globalStats.complaints`: Complaints (number)
- `campaigns[].statistics.globalStats.opensRate`: Opens Rate (number)
- `count`: Count (number)

### `send_email_campaign_now`

**Send Email Campaign Now.** Immediately sends the given Brevo email campaign to every contact in its recipient lists, with no confirmation step and no way to recall it once sent. The campaign must currently be a draft. Not idempotent — retrying after a successful send fails because the campaign is no longer a draft, and a second successful call would email every recipient twice. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | number | yes |  | Campaign ID. Must currently be a draft campaign. |

### `create_sms_campaign`

**Create SMS Campaign.** Creates a Brevo SMS campaign targeting one or more contact lists, exclusion lists and/or segments. Omit scheduled_at to create an unsent draft that can be reviewed or scheduled later. Not idempotent — calling this again creates another campaign. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Internal campaign name. |
| `sender` | string | yes |  | Sender. Name or number shown as the sender. Limited to 11 alphanumeric characters or 15 numeric characters. |
| `content` | string | yes |  | Content. Message body. Max 160 characters per SMS segment; longer content is split into multiple billed segments. |
| `list_ids` | array | no |  | Recipient Lists. Contact lists to send this campaign to. Values the product loads from the provider, such as ids; write an array of them. |
| `exclusion_list_ids` | array | no |  | Exclude Lists. Contact lists to exclude from this campaign. Values the product loads from the provider, such as ids; write an array of them. |
| `segment_ids` | array | no |  | Segment IDs. Brevo segment IDs to target. |
| `scheduled_at` | ISO date-time string | no |  | Scheduled At. Omit to create an unsent draft. |
| `unicode_enabled` | boolean | no | `false` | Unicode Enabled. |
| `organisation_prefix` | string | no |  | Organisation Prefix. Brand name prepended to the message content. |
| `unsubscribe_instruction` | string | no |  | Unsubscribe Instruction. Must include the word STOP; recommended by US carriers. |

Output fields:

- `id`: Campaign ID (number)

### `get_sms_campaign`

**Get SMS Campaign.** Fetches a single Brevo SMS campaign by its numeric id, including its status, content, recipient targeting and statistics. Returns found:false instead of failing when the campaign id does not exist, so it is safe to branch on. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | number | yes |  | Campaign ID. |

Output fields:

- `found`: Found (boolean)
- `data`: SMS Campaign
- `data.id`: Campaign ID (number)
- `data.name`: Name
- `data.status`: Status
- `data.content`: Content
- `data.sender`: Sender
- `data.scheduledAt`: Scheduled At (datetime)
- `data.createdAt`: Created At (datetime)
- `data.modifiedAt`: Modified At (datetime)
- `data.recipients`: Recipients
- `data.recipients.lists`: List IDs
- `data.recipients.exclusionLists`: Exclusion List IDs
- `data.statistics`: Statistics
- `data.statistics.sent`: Sent (number)
- `data.statistics.delivered`: Delivered (number)
- `data.statistics.softBounces`: Soft Bounces (number)
- `data.statistics.hardBounces`: Hard Bounces (number)
- `data.statistics.unsubscriptions`: Unsubscriptions (number)
- `data.statistics.answered`: Answered (number)

### `list_sms_campaigns`

**List SMS Campaigns.** Lists Brevo SMS campaigns with their id, name, status and statistics, optionally filtered by status or sent date range. Use this to resolve a campaign name to the numeric id that Get SMS Campaign and Delete SMS Campaign require. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no |  | Status. One of `"sent"`, `"draft"`, `"queued"`, `"suspended"`, `"inProcess"`, `"archive"`. |
| `start_date` | ISO date-time string | no |  | Start Date. Only filters sent campaigns; both required together. |
| `end_date` | ISO date-time string | no |  | End Date. Only filters sent campaigns; both required together. |
| `limit` | number | no | `500` | Limit. Number of campaigns to return per page. Maximum 1000. |
| `offset` | number | no | `0` | Offset. Index of the first campaign to return. Defaults to 0. |
| `sort` | string | no |  | Sort. Sort order for the results, based on the campaign creation date. One of `"asc"`, `"desc"`. |

Output fields:

- `campaigns`: SMS Campaigns
- `campaigns[].id`: Campaign ID (number)
- `campaigns[].name`: Name
- `campaigns[].status`: Status
- `campaigns[].content`: Content
- `campaigns[].sender`: Sender
- `campaigns[].scheduledAt`: Scheduled At (datetime)
- `campaigns[].createdAt`: Created At (datetime)
- `campaigns[].modifiedAt`: Modified At (datetime)
- `campaigns[].recipients`: Recipients
- `campaigns[].recipients.lists`: List IDs
- `campaigns[].recipients.exclusionLists`: Exclusion List IDs
- `campaigns[].statistics`: Statistics
- `campaigns[].statistics.sent`: Sent (number)
- `campaigns[].statistics.delivered`: Delivered (number)
- `campaigns[].statistics.softBounces`: Soft Bounces (number)
- `campaigns[].statistics.hardBounces`: Hard Bounces (number)
- `campaigns[].statistics.unsubscriptions`: Unsubscriptions (number)
- `campaigns[].statistics.answered`: Answered (number)
- `count`: Count (number)

### `delete_sms_campaign`

**Delete SMS Campaign.** Permanently deletes a Brevo SMS campaign by id, whether it is a draft or already sent. This cannot be undone. Not idempotent — a retry after the first successful call 404s because the campaign no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `campaign_id` | number | yes |  | Campaign ID. |

### `list_transactional_email_events`

**List Transactional Email Events.** Lists historical transactional email events (delivery, open, click, bounce, spam and similar), optionally filtered by recipient, event type, tags, message id or template. Use this to pull events already recorded by Brevo on demand instead of waiting for the email_delivered/email_opened/email_clicked/email_bounced webhook triggers, for example to audit a specific send or backfill data from before a webhook was configured. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `days` | number | no |  | Days. Number of past days to include, 1-90. Cannot be combined with Start Date/End Date. Brevo defaults to 30 days if none of days, start date or end date are given. |
| `start_date` | string | no |  | Start Date. Start of the date range, format 'YYYY-MM-DD'. Must be given together with End Date, and cannot be combined with Days. The range is capped at 90 days. |
| `end_date` | string | no |  | End Date. End of the date range, format 'YYYY-MM-DD'. Must be given together with Start Date, and cannot be combined with Days. The range is capped at 90 days. |
| `email` | string | no |  | Email. Filter events down to a single recipient email address. |
| `event` | string | no |  | Event. Filter down to a single event type. One of `"bounces"`, `"hardBounces"`, `"softBounces"`, `"delivered"`, `"spam"`, `"requests"`, `"opened"`, `"clicks"`, `"invalid"`, `"deferred"`, `"blocked"`, `"unsubscribed"`, `"error"`, `"loadedByProxy"`. |
| `tags` | string | no |  | Tags. Comma-separated tags to filter events by. |
| `message_id` | string | no |  | Message ID. Filter events down to a single message id. |
| `template_id` | number | no |  | Template ID. Filter events down to emails sent from this template id. |
| `limit` | number | no | `50` | Limit. Number of events to return per page. Defaults to 50, maximum 5000. |
| `offset` | number | no | `0` | Offset. Index of the first event to return. Defaults to 0. |
| `sort` | string | no |  | Sort. Sort order for the results, based on the event date. One of `"asc"`, `"desc"`. |

Output fields:

- `events`: Events
- `events[].email`: Recipient (email)
- `events[].event`: Event Type
- `events[].date`: Date (datetime)
- `events[].subject`: Subject
- `events[].messageId`: Message ID
- `events[].from`: From (email)
- `events[].ip`: IP
- `events[].reason`: Reason
- `events[].link`: Clicked Link (url)
- `events[].templateId`: Template ID (number)

### `get_account_info`

**Get Account Info.** Retrieves the Brevo account holder details, address, plan/credits and transactional-email and marketing-automation configuration for the connected account. Use this to check remaining email or SMS credits, or to verify which Brevo account/plan a connection points to, before running a bulk send. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `email`: Email (email)
- `firstName`: First Name
- `lastName`: Last Name
- `companyName`: Company Name
- `address`: Address
- `address.street`: Street
- `address.city`: City
- `address.zipCode`: Zip Code
- `address.country`: Country
- `plan`: Plan
- `plan[].type`: Type
- `plan[].credits`: Credits (number)
- `plan[].creditsType`: Credits Type
- `plan[].startDate`: Start Date
- `plan[].endDate`: End Date
- `relay`: Relay
- `relay.enabled`: Relay Enabled (boolean)
- `language`: Language

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

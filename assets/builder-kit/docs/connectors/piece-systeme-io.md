# Systeme.io

Systeme.io is a CRM platform that allows you to manage your contacts, sales, and marketing campaigns.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-systeme-io'
  version: '0.2.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Systeme.io API key. In your Systeme.io dashboard open Profile > **MCP & API keys** (systeme.io/dashboard/profile/public-api-settings), create a key and paste it here.

## Actions

### `createContact`

**Create Contact.** Creates a new contact in Systeme.io from an email plus optional locale and contact/custom fields, and can optionally tag it. Tags are controlled by a tag-source mode: none, assign existing tags by id, or create-and-assign new tags by name. Use to add someone to the CRM; each call creates a new contact and is not idempotent (repeating may produce duplicates or re-create tags). Requires an email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Contact email address. |
| `locale` | string | no | `"en"` | Language. Contact preferred language. One of `"en"`, `"fr"`, `"es"`, `"it"`, `"pt"`, `"de"`, `"nl"`, `"ru"`, `"jp"`, `"tr"`, `"ar"`, `"zh"`, `"sv"`, `"ro"`, `"cs"`, `"hu"`, `"sk"`, `"dk"`, `"id"`, `"pl"`, `"el"`, `"sr"`, `"hi"`, `"no"`, `"th"` and 3 more. |
| `dynamicContactFields` | object | no |  | Contact Fields. Set contact fields from your Systeme.io account. An object whose fields depend on other inputs; the product shows them. |
| `customFields` | array | no |  | Custom Contact Fields. Add custom contact field values (e.g., country, company, etc.) Each item: { `field`, `value`? }. |
| `tagSource` | string | no | `"none"` | Tag Source. Choose how to handle tags for this contact. One of `"none"`, `"existing"`, `"new"`. |
| `existingTags` | array | no |  | Existing Tags. Select existing tags to assign. Values the product loads from the provider, such as ids; write an array of them. |
| `newTagNames` | array | no |  | New Tag Names. Enter names for new tags to create and assign (only used when "Create New Tags" is selected) Each item: { `name` }. |

Output fields:

- `contact`: Contact
- `contact.id`: Contact ID
- `contact.email`: Email (email)
- `contact.registeredAt`: Registered At (datetime)
- `contact.locale`: Locale
- `contact.fields`: Contact Fields
- `contact.fields[].fieldName`: Field Name
- `contact.fields[].slug`: Slug
- `contact.fields[].value`: Value
- `contact.unsubscribed`: Unsubscribed (boolean)
- `contact.bounced`: Bounced (boolean)
- `contact.needsConfirmation`: Needs Confirmation (boolean)
- `contact.sourceURL`: Source URL (url)
- `tagResults`: Tag Results
- `tagResults[].tagId`: Tag ID
- `tagResults[].tagName`: Tag Name
- `tagResults[].success`: Attached (boolean)
- `tagResults[].error`: Error
- `totalTagsAssigned`: Tags Assigned (number)
- `newTagsCreated`: New Tags Created (number)
- `tagSource`: Tag Source
- `dynamicFieldsProcessed`: Contact Fields Set (number)
- `customFieldsProcessed`: Custom Fields Set (number)

### `addTagToContact`

**Add Tag to Contact.** Assigns a tag to an existing Systeme.io contact, identified by contact id. Operates in two modes: reference an existing tag by id, or create a brand-new tag by name and then assign it. Use to label or segment a known contact; assigning an existing tag is effectively idempotent, but the create-new-tag mode creates a fresh tag on each call, so this is not idempotent overall. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. Select a contact. Type a name (searches the newest 100), a full email address or a contact id. A value the product loads from the provider, such as an id; write the value itself. |
| `tagSource` | string | yes | `"existing"` | Tag Source. Choose whether to use an existing tag or create a new one. One of `"existing"`, `"new"`. |
| `existingTagId` | string | no |  | Existing Tag. Select an existing tag. A value the product loads from the provider, such as an id; write the value itself. |
| `newTagName` | string | no |  | New Tag Name. Enter the name for the new tag (only used when "Create New Tag" is selected) |

Output fields:

- `success`: Attached (boolean)
- `contactId`: Contact ID
- `tagId`: Tag ID
- `tagCreated`: Tag Was Created (boolean)
- `tagName`: Tag Name
- `message`: Message

### `removeTagFromContact`

**Remove Tag from Contact.** Removes a tag from an existing Systeme.io contact, given the contact id and the tag id to unassign. Use to unlabel or de-segment a contact. Idempotent: once the tag is removed, repeating the call leaves the contact in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. Select a contact. Type a name (searches the newest 100), a full email address or a contact id. A value the product loads from the provider, such as an id; write the value itself. |
| `tagId` | string | yes |  | Tag to Remove. Select a tag currently assigned to this contact. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Removed (boolean)
- `contactId`: Contact ID
- `tagId`: Tag ID
- `tagName`: Tag Name
- `message`: Message

### `findContactByEmail`

**Find Contact by Email.** Looks up a single Systeme.io contact by exact email address (case-insensitive) using the API email filter. Use to resolve an email to a contact record (e.g. to get its id before tagging or updating). Read-only and idempotent; returns a not-found result if no contact matches. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The email address to search for. |

Output fields:

- `success`: Found (boolean)
- `contact`: Contact
- `contact.id`: Contact ID
- `contact.email`: Email (email)
- `contact.registeredAt`: Registered At (datetime)
- `contact.locale`: Locale
- `contact.fields`: Contact Fields
- `contact.fields[].fieldName`: Field Name
- `contact.fields[].slug`: Slug
- `contact.fields[].value`: Value
- `contact.unsubscribed`: Unsubscribed (boolean)
- `contact.bounced`: Bounced (boolean)
- `contact.needsConfirmation`: Needs Confirmation (boolean)
- `contact.sourceURL`: Source URL (url)
- `contact.tags`: Tags
- `contact.tags[].id`: Tag ID
- `contact.tags[].name`: Name
- `message`: Message

### `updateContact`

**Update Contact.** Updates fields of an existing Systeme.io contact, identified by contact id, via a partial merge-patch of standard, account-defined, and manually-keyed custom fields (an empty value clears a field), plus an optional language change. Use to change a known contact's data such as name, phone, or custom attributes. Idempotent: applying the same field values yields the same result; only the provided fields are touched, and a call with no fields makes no change. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. Select a contact. Type a name (searches the newest 100), a full email address or a contact id. A value the product loads from the provider, such as an id; write the value itself. |
| `dynamicContactFields` | object | no |  | Contact Fields. Select which contact fields to update. An object whose fields depend on other inputs; the product shows them. |
| `customFields` | array | no |  | Custom Fields (Manual Entry). Add or update custom fields with manual slug entry (use empty value to clear field) Each item: { `fieldSlug`, `fieldValue`? }. |
| `locale` | string | no |  | Language. Optional. Change the contact's preferred language. Leave empty to keep the current language. One of `"en"`, `"fr"`, `"es"`, `"it"`, `"pt"`, `"de"`, `"nl"`, `"ru"`, `"jp"`, `"tr"`, `"ar"`, `"zh"`, `"sv"`, `"ro"`, `"cs"`, `"hu"`, `"sk"`, `"dk"`, `"id"`, `"pl"`, `"el"`, `"sr"`, `"hi"`, `"no"`, `"th"` and 3 more. |

Output fields:

- `success`: Updated (boolean)
- `contactId`: Contact ID
- `updatedFields`: Updated Fields
- `updatedFields[].slug`: Slug
- `updatedFields[].value`: Value
- `response`: Contact
- `response.id`: Contact ID
- `response.email`: Email (email)
- `response.registeredAt`: Registered At (datetime)
- `response.locale`: Locale
- `response.fields`: Contact Fields
- `response.fields[].fieldName`: Field Name
- `response.fields[].slug`: Slug
- `response.fields[].value`: Value
- `response.unsubscribed`: Unsubscribed (boolean)
- `response.bounced`: Bounced (boolean)
- `response.needsConfirmation`: Needs Confirmation (boolean)
- `response.sourceURL`: Source URL (url)
- `response.tags`: Tags
- `response.tags[].id`: Tag ID
- `response.tags[].name`: Name
- `dynamicFieldsProcessed`: Contact Fields Set (number)
- `customFieldsProcessed`: Custom Fields Set (number)
- `message`: Message

### `find_contacts`

**Find Contacts.** Lists Systeme.io contacts matching optional filters: email (exact, case-insensitive), tag ids (contacts must have all of them), a registration date range, and unsubscribed/bounced/needs-confirmation status; with no filters it lists every contact, newest first (Systeme.io ignores any other order). Use to build a segment or check who matches before tagging or enrolling; use Find Contact by Email for a single lookup. Pages automatically up to Max Results and returns a cursor to continue. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. Optional email address, matched exactly but ignoring case, e.g. "jane@example.com". |
| `tag_ids` | array | no |  | Has All Tags. Optional. Only contacts that have every selected tag. Agents can pass numeric tag ids. Values the product loads from the provider, such as ids; write an array of them. |
| `registered_after` | ISO date-time string | no |  | Registered After. Optional ISO 8601 date-time, e.g. "2026-01-01T00:00:00Z". |
| `registered_before` | ISO date-time string | no |  | Registered Before. Optional ISO 8601 date-time, e.g. "2026-02-01T00:00:00Z". |
| `unsubscribed` | string | no |  | Unsubscribed. Optional. Yes: only contacts unsubscribed from emails. No: only contacts still subscribed to emails. Leave empty for both. One of `"yes"`, `"no"`. |
| `bounced` | string | no |  | Bounced. Optional. Yes: only contacts whose emails bounced. No: only contacts whose emails did not bounce. Leave empty for both. One of `"yes"`, `"no"`. |
| `needs_confirmation` | string | no |  | Needs Confirmation. Optional. Yes: only contacts who still have to confirm their opt-in. No: only contacts who do not need to confirm their opt-in. Leave empty for both. One of `"yes"`, `"no"`. |
| `max_results` | number | no | `100` | Max Results. How many contacts to return at most (1-1000). Default 100. |
| `starting_after` | string | no |  | Continue After (cursor). Optional. The Next Cursor value from a previous run, to fetch the following contacts. |

Output fields:

- `contacts`: Contacts
- `contacts[].id`: Contact ID
- `contacts[].email`: Email (email)
- `contacts[].registeredAt`: Registered At (datetime)
- `contacts[].locale`: Locale
- `contacts[].fields`: Contact Fields
- `contacts[].fields[].fieldName`: Field Name
- `contacts[].fields[].slug`: Slug
- `contacts[].fields[].value`: Value
- `contacts[].unsubscribed`: Unsubscribed (boolean)
- `contacts[].bounced`: Bounced (boolean)
- `contacts[].needsConfirmation`: Needs Confirmation (boolean)
- `contacts[].sourceURL`: Source URL (url)
- `contacts[].tags`: Tags
- `contacts[].tags[].id`: Tag ID
- `contacts[].tags[].name`: Name
- `count`: Returned (number)
- `has_more`: More Available (boolean)
- `next_cursor`: Next Cursor

### `get_contact`

**Get Contact.** Retrieves one Systeme.io contact by its numeric id, including all contact field values and assigned tags. Use when you already have the contact id (from a trigger or a search); use Find Contact by Email when you only have the email. Read-only and idempotent; fails with a not-found error for an unknown id. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | yes |  | Contact. Pick a contact: type a name (searches the newest 100), a full email address or a contact id, or map a contact id. Agents can pass the numeric contact id directly. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Contact ID
- `email`: Email (email)
- `registeredAt`: Registered At (datetime)
- `locale`: Locale
- `fields`: Contact Fields
- `fields[].fieldName`: Field Name
- `fields[].slug`: Slug
- `fields[].value`: Value
- `unsubscribed`: Unsubscribed (boolean)
- `bounced`: Bounced (boolean)
- `needsConfirmation`: Needs Confirmation (boolean)
- `sourceURL`: Source URL (url)
- `tags`: Tags
- `tags[].id`: Tag ID
- `tags[].name`: Name

### `delete_contact`

**Delete Contact.** Permanently deletes a Systeme.io contact by id, including its tags, course enrollments and history; there is no trash or undo. Use only when the user explicitly asks to delete the contact; to stop emailing someone, remove a tag instead. Idempotent: deleting an already-deleted id returns not_found instead of failing. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | yes |  | Contact. Pick a contact: type a name (searches the newest 100), a full email address or a contact id, or map a contact id. Agents can pass the numeric contact id directly. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `deleted`: Deleted (boolean)
- `not_found`: Already Gone (boolean)
- `id`: ID

### `create_tag`

**Create Tag.** Returns the Systeme.io tag with the given name, creating it only if no tag has that name (matched case-insensitively). Use to get a tag id before tagging contacts, without creating duplicates. Idempotent when calls run one after another: a repeat returns the same tag with created=false. Two calls at the same moment can both find no tag and both create one. Names are at most 64 characters. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Tag Name. The tag name, up to 64 characters, e.g. "Webinar 2026 attendee". |

Output fields:

- `id`: Tag ID
- `name`: Name
- `created_at`: Created At (datetime)
- `created`: Was Created (boolean)

### `delete_tag`

**Delete Tag.** Permanently deletes a Systeme.io tag by id, which also removes it from every contact that has it and can break automations that use the tag. Use only when the tag itself should no longer exist; to untag one contact use Remove Tag from Contact. Idempotent: an already-deleted id returns not_found instead of failing. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag_id` | string | yes |  | Tag. Pick a tag (type to search), or map a tag id. Agents can pass the numeric tag id directly. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `deleted`: Deleted (boolean)
- `not_found`: Already Gone (boolean)
- `id`: ID

### `enroll_contact_in_course`

**Enroll Contact in Course.** Enrolls a Systeme.io contact in a course, giving full access, access to selected modules only, or drip-fed access. Use after a purchase or signup to grant course access; partial_access and partial_dripping_access require module ids from the course. Not idempotent: behaviour on a repeat enrollment is undocumented, so check the contact's enrollments first if unsure. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `course_id` | string | yes |  | Course. Pick a course (type to search), or map a course id. Agents can pass the numeric course id directly. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact. Pick a contact: type a name (searches the newest 100), a full email address or a contact id, or map a contact id. Agents can pass the numeric contact id directly. A value the product loads from the provider, such as an id; write the value itself. |
| `access_type` | string | yes | `"full_access"` | Access Type. What the contact can open. 'full_access' = the whole course; 'partial_access' = only the selected modules; 'dripping_content' = lectures unlock on the course's drip schedule; 'partial_dripping_access' = selected modules on the drip schedule. One of `"full_access"`, `"partial_access"`, `"dripping_content"`, `"partial_dripping_access"`. |
| `modules` | array | no |  | Modules. Required for "Partial access" and "Partial dripping access": the modules the contact can open. Ignored for full access and dripping content. Agents can pass module ids. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Enrollment ID
- `access_type`: Access Type
- `active`: Active (boolean)
- `course_id`: Course ID
- `course_name`: Course Name
- `contact_id`: Contact ID
- `contact_email`: Contact Email (email)

### `remove_course_enrollment`

**Remove Course Access.** Removes a Systeme.io contact's access to a course by deleting their enrollment(s) in it; the contact and course stay. Use to revoke access after a refund or cancellation. Idempotent: if the contact is not enrolled it returns not_found=true and changes nothing. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `course_id` | string | yes |  | Course. Pick a course (type to search), or map a course id. Agents can pass the numeric course id directly. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact. Pick a contact: type a name (searches the newest 100), a full email address or a contact id, or map a contact id. Agents can pass the numeric contact id directly. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `removed`: Removed (boolean)
- `removed_count`: Removed Count (number)
- `removed_ids`: Removed IDs
- `not_found`: Nothing to Remove (boolean)

### `add_contact_to_community`

**Add Contact to Community.** Requests membership of a Systeme.io community for a contact. Systeme.io queues the request (HTTP 202), so the membership may take a moment to appear in the community member list. Use to grant community access after a purchase or signup. Not idempotent: repeat behaviour is undocumented. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `community_id` | string | yes |  | Community. Pick a community (type to search), or map a community id. Agents can pass the numeric community id directly. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact. Pick a contact: type a name (searches the newest 100), a full email address or a contact id, or map a contact id. Agents can pass the numeric contact id directly. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `queued`: Queued (boolean)
- `community_id`: Community ID
- `contact_id`: Contact ID

### `remove_contact_from_community`

**Remove Contact from Community.** Removes a Systeme.io contact from a community by deleting their membership; the contact and community stay. Use to revoke community access after a refund or cancellation. Idempotent: if the contact is not a member it returns not_found=true and changes nothing. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `community_id` | string | yes |  | Community. Pick a community (type to search), or map a community id. Agents can pass the numeric community id directly. A value the product loads from the provider, such as an id; write the value itself. |
| `contact_id` | string | yes |  | Contact. Pick a contact: type a name (searches the newest 100), a full email address or a contact id, or map a contact id. Agents can pass the numeric contact id directly. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `removed`: Removed (boolean)
- `removed_count`: Removed Count (number)
- `removed_ids`: Removed IDs
- `not_found`: Nothing to Remove (boolean)

### `cancel_subscription`

**Cancel Subscription.** Cancels a Systeme.io subscription, either immediately or when the current billing period ends (the default and safer choice). Needs the contact id and the subscription id; it first checks that the subscription belongs to that contact and cancels nothing otherwise. With the end-of-period option the subscription stays active until the period ends. Idempotent: a subscription that is already cancelled is reported with already_cancelled=true and not cancelled again; if Systeme.io refuses a repeat end-of-period cancel, the action converges when the subscription is already set to end. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | yes |  | Contact. Pick a contact: type a name (searches the newest 100), a full email address or a contact id, or map a contact id. Agents can pass the numeric contact id directly. A value the product loads from the provider, such as an id; write the value itself. |
| `subscription_id` | string | yes |  | Subscription. Pick one of the contact's subscriptions, or map a subscription id. Agents can pass the numeric subscription id directly. A value the product loads from the provider, such as an id; write the value itself. |
| `cancel` | string | yes | `"WhenBillingPeriodEnds"` | When. 'WhenBillingPeriodEnds' (default) keeps access until the paid period ends; 'Now' cancels immediately. One of `"WhenBillingPeriodEnds"`, `"Now"`. |

Output fields:

- `cancelled`: Cancelled (boolean)
- `already_cancelled`: Was Already Cancelled (boolean)
- `subscription_id`: Subscription ID
- `contact_id`: Contact ID
- `cancel_type`: When

### `systeme_create_contact`

**Create Contact (AI).** Creates a new Systeme.io contact from an email, with optional locale, contact field values (slugs from systeme_list_contact_fields) and existing tag ids (from systeme_list_tags or create_tag). Use to add a new lead; check first with find_contacts when the email may already exist, since a duplicate email fails with a validation error. Not idempotent: each successful call creates a contact. Tag failures are reported per tag instead of failing the call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The contact email address, e.g. "jane@example.com". |
| `locale` | string | no |  | Locale. Optional two-letter language code: en, fr, es, it, pt, de, nl, ru, jp, tr, ar, zh, sv, ro, cs, hu, sk, dk, id, pl, el, sr, hi, no, th, sq, sl or ua. |
| `fields` | array | no |  | Fields. Optional field values, e.g. [{"slug":"first_name","value":"Jane"},{"slug":"country","value":"US"}]. Country takes a 2-letter ISO code. Each item: { `slug`, `value`? }. |
| `tag_ids` | array | no |  | Tag IDs. Optional numeric ids of existing tags to assign, e.g. ["123","456"]. |

Output fields:

- `contact_id`: Contact ID
- `email`: Email (email)
- `tags_assigned`: Tags Assigned (number)
- `tags_failed`: Tags Failed (number)
- `tag_results`: Tag Results
- `tag_results[].tag_id`: Tag ID
- `tag_results[].assigned`: Assigned (boolean)
- `tag_results[].error`: Error
- `contact`: Contact
- `contact.id`: Contact ID
- `contact.email`: Email (email)
- `contact.registeredAt`: Registered At (datetime)
- `contact.locale`: Locale
- `contact.fields`: Contact Fields
- `contact.fields[].fieldName`: Field Name
- `contact.fields[].slug`: Slug
- `contact.fields[].value`: Value
- `contact.unsubscribed`: Unsubscribed (boolean)
- `contact.bounced`: Bounced (boolean)
- `contact.needsConfirmation`: Needs Confirmation (boolean)
- `contact.sourceURL`: Source URL (url)
- `contact.tags`: Tags
- `contact.tags[].id`: Tag ID
- `contact.tags[].name`: Name

### `systeme_update_contact`

**Update Contact (AI).** Partially updates a Systeme.io contact: only the field slugs you pass change, every other field is left as it is, and a field with an empty or null value is cleared. Optionally changes the locale. Use to correct or enrich a known contact (slugs from systeme_list_contact_fields); the email cannot be changed. Idempotent: sending the same values again converges on the same contact. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | yes |  | Contact ID. Numeric contact id, e.g. "12345". |
| `fields` | array | no |  | Fields. Field values to set, e.g. [{"slug":"phone_number","value":"+15551234"}]. Use {"slug":"phone_number","value":null} to clear a field. Slugs you leave out are not touched. Each item: { `slug`, `value`? }. |
| `locale` | string | no |  | Locale. Optional new two-letter language code (en, fr, es, de, jp, dk, ua, ...). Omit to keep the current one. |

Output fields:

- `contact_id`: Contact ID
- `updated_slugs`: Updated Fields
- `cleared_slugs`: Cleared Fields
- `locale_changed`: Locale Changed (boolean)
- `contact`: Contact
- `contact.id`: Contact ID
- `contact.email`: Email (email)
- `contact.registeredAt`: Registered At (datetime)
- `contact.locale`: Locale
- `contact.fields`: Contact Fields
- `contact.fields[].fieldName`: Field Name
- `contact.fields[].slug`: Slug
- `contact.fields[].value`: Value
- `contact.unsubscribed`: Unsubscribed (boolean)
- `contact.bounced`: Bounced (boolean)
- `contact.needsConfirmation`: Needs Confirmation (boolean)
- `contact.sourceURL`: Source URL (url)
- `contact.tags`: Tags
- `contact.tags[].id`: Tag ID
- `contact.tags[].name`: Name

### `systeme_add_tag_to_contact`

**Add Tag to Contact (AI).** Assigns an existing Systeme.io tag to a contact, both given by numeric id; tagging often starts automations in systeme.io. Get the tag id from systeme_list_tags or create_tag (which also creates a missing tag). Idempotent: assigning a tag the contact already has succeeds again and changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | yes |  | Contact ID. Numeric contact id, e.g. "12345". |
| `tag_id` | string | yes |  | Tag ID. Numeric tag id, e.g. "678" (from systeme_list_tags). |

Output fields:

- `assigned`: Assigned (boolean)
- `already_assigned`: Already Had Tag (boolean)
- `contact_id`: Contact ID
- `tag_id`: Tag ID

### `systeme_list_tags`

**List Tags.** Lists Systeme.io tags (id, name, created date), newest first, optionally filtered by a search text. Use to resolve a tag name to the tag_id that the tagging, contact-search and delete actions need; use create_tag to get-or-create a tag by exact name. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search. Optional text to search tag names for, e.g. "webinar". |
| `max_results` | number | no |  | Max Results. Maximum rows to return, 1-1000 (default 100). The action pages automatically. |
| `starting_after` | string | no |  | Starting After. Optional cursor: the next_cursor value from a previous call, to continue listing. |

Output fields:

- `tags`: Tags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].created_at`: Created At (datetime)
- `count`: Returned (number)
- `has_more`: More Available (boolean)
- `next_cursor`: Next Cursor

### `systeme_get_tag`

**Get Tag.** Retrieves one Systeme.io tag (id, name, created date) by its numeric id. Use to confirm a tag id still exists or read its name; use systeme_list_tags to find a tag by name. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag_id` | string | yes |  | Tag ID. Numeric tag id, e.g. "123456" (from systeme_list_tags). |

Output fields:

- `id`: Tag ID
- `name`: Name
- `created_at`: Created At (datetime)

### `systeme_rename_tag`

**Rename Tag.** Renames an existing Systeme.io tag; the tag keeps its id and stays on every contact that has it. Use when a tag should be relabelled rather than replaced. Names are at most 64 characters. Idempotent: renaming to the same name again changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag_id` | string | yes |  | Tag ID. Numeric tag id, e.g. "123456" (from systeme_list_tags). |
| `name` | string | yes |  | New Name. The new tag name, up to 64 characters. |

Output fields:

- `id`: Tag ID
- `name`: Name
- `created_at`: Created At (datetime)

### `systeme_list_contact_fields`

**List Contact Fields.** Lists the contact fields defined in the Systeme.io account (slug and display name), such as first_name, surname, phone_number, country and custom fields. Use before systeme_create_contact or systeme_update_contact to get the exact slugs. Returns every field in one response (this list has no paging). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `fields`: Contact Fields
- `fields[].slug`: Slug
- `fields[].field_name`: Field Name
- `count`: Count (number)
- `has_more`: More Available (boolean)

### `systeme_list_courses`

**List Courses.** Lists Systeme.io courses with their id, name, active state and modules (id and name). Use to find the course_id and module ids needed by enroll_contact_in_course and remove_course_enrollment; the search text also matches module and lecture names. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search. Optional text matched against course, module or lecture names. |
| `active` | string | no |  | Active Filter. Optional. "true" lists active courses only, "false" inactive only; leave empty for all. |
| `max_results` | number | no |  | Max Results. Maximum rows to return, 1-1000 (default 100). The action pages automatically. |
| `starting_after` | string | no |  | Starting After. Optional cursor: the next_cursor value from a previous call, to continue listing. |

Output fields:

- `courses`: Courses
- `courses[].id`: Course ID
- `courses[].name`: Name
- `courses[].active`: Active (boolean)
- `courses[].description`: Description
- `courses[].path`: Path
- `courses[].domain_name`: Domain
- `courses[].locale`: Locale
- `courses[].modules`: Modules
- `courses[].modules[].id`: Module ID
- `courses[].modules[].name`: Name
- `count`: Returned (number)
- `has_more`: More Available (boolean)
- `next_cursor`: Next Cursor

### `systeme_list_enrollments`

**List Course Enrollments.** Lists Systeme.io course enrollments (enrollment id, access type, course and contact), optionally filtered by course_id and/or contact_id. Use to check whether a contact already has access to a course before enrolling or removing them. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `course_id` | string | no |  | Course ID. Optional numeric course id (from systeme_list_courses). |
| `contact_id` | string | no |  | Contact ID. Optional numeric contact id (from find_contacts or a trigger). |
| `max_results` | number | no |  | Max Results. Maximum rows to return, 1-1000 (default 100). The action pages automatically. |
| `starting_after` | string | no |  | Starting After. Optional cursor: the next_cursor value from a previous call, to continue listing. |

Output fields:

- `enrollments`: Enrollments
- `enrollments[].id`: Enrollment ID
- `enrollments[].access_type`: Access Type
- `enrollments[].active`: Active (boolean)
- `enrollments[].course_id`: Course ID
- `enrollments[].course_name`: Course Name
- `enrollments[].contact_id`: Contact ID
- `enrollments[].contact_email`: Contact Email (email)
- `count`: Returned (number)
- `has_more`: More Available (boolean)
- `next_cursor`: Next Cursor

### `systeme_list_communities`

**List Communities.** Lists Systeme.io communities (id, name, path, domain). Use to find the community_id needed by add_contact_to_community and remove_contact_from_community. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search. Optional text to search community names for. |
| `max_results` | number | no |  | Max Results. Maximum rows to return, 1-1000 (default 100). The action pages automatically. |
| `starting_after` | string | no |  | Starting After. Optional cursor: the next_cursor value from a previous call, to continue listing. |

Output fields:

- `communities`: Communities
- `communities[].id`: Community ID
- `communities[].name`: Name
- `communities[].path`: Path
- `communities[].domain_name`: Domain
- `count`: Returned (number)
- `has_more`: More Available (boolean)
- `next_cursor`: Next Cursor

### `systeme_list_community_memberships`

**List Community Memberships.** Lists Systeme.io community memberships (membership id, community and contact id), optionally filtered by community_id and/or contact_id. Use to check whether a contact is already a member; a membership added with add_contact_to_community can take a moment to appear. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `community_id` | string | no |  | Community ID. Optional numeric community id (from systeme_list_communities). |
| `contact_id` | string | no |  | Contact ID. Optional numeric contact id. |
| `max_results` | number | no |  | Max Results. Maximum rows to return, 1-1000 (default 100). The action pages automatically. |
| `starting_after` | string | no |  | Starting After. Optional cursor: the next_cursor value from a previous call, to continue listing. |

Output fields:

- `memberships`: Memberships
- `memberships[].id`: Membership ID
- `memberships[].community_id`: Community ID
- `memberships[].community_name`: Community Name
- `memberships[].contact_id`: Contact ID
- `count`: Returned (number)
- `has_more`: More Available (boolean)
- `next_cursor`: Next Cursor

### `systeme_list_subscriptions`

**List Subscriptions.** Lists one Systeme.io contact's subscriptions with status (active, cancelled, completed, in_charge, incomplete, incomplete_expired), dates and price plan. Use to find the subscription_id for cancel_subscription or to check whether a contact still pays. A contact_id is required. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | yes |  | Contact ID. Numeric contact id, e.g. "12345" (from find_contacts, findContactByEmail or a sale trigger's customer.contactId). |
| `max_results` | number | no |  | Max Results. Maximum rows to return, 1-1000 (default 100). The action pages automatically. |
| `starting_after` | string | no |  | Starting After. Optional cursor: the next_cursor value from a previous call, to continue listing. |

Output fields:

- `subscriptions`: Subscriptions
- `subscriptions[].id`: Subscription ID
- `subscriptions[].status`: Status
- `subscriptions[].created_at`: Created At (datetime)
- `subscriptions[].cancelled_at`: Cancelled At (datetime)
- `subscriptions[].completed_at`: Completed At (datetime)
- `subscriptions[].price_plan_id`: Price Plan ID
- `subscriptions[].price_plan_name`: Price Plan
- `subscriptions[].price_plan_type`: Price Plan Type
- `subscriptions[].amount`: Amount (number)
- `subscriptions[].currency`: Currency
- `subscriptions[].interval`: Billing Interval
- `subscriptions[].interval_count`: Interval Count (number)
- `count`: Returned (number)
- `has_more`: More Available (boolean)
- `next_cursor`: Next Cursor

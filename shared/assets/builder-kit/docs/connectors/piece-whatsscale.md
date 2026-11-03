# WhatsScale

Send WhatsApp messages, manage contacts, and automate conversations via WAHA

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-whatsscale'
  version: '1.1.0'
```

Categories: COMMUNICATION, MARKETING, SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your API key:
>
> 1. Log in to your WhatsScale account at https://whatsscale.com/dashboard
> 2. Navigate to Setting => API Keys section
> 3. Create a new API key if you don't have one already
> 4. Copy your API key and paste it here

## Actions

### `whatsscale_send_text_to_contact`

**Send a Message to a Contact.** Sends a text message to a WhatsApp contact whose chat ID is chosen from the session contact list. Pick this when the recipient is a known direct contact; use the manual-entry text action for a raw phone number, or the group/CRM/channel text variants for other recipient types. Not idempotent: each call sends another message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `contact` | string | yes |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Message. The text message to send. |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_text_to_group`

**Send a Message to a Group.** Sends a text message to a WhatsApp group whose chat ID is chosen from the session group list. Pick this when the recipient is a known group; use the manual-entry text action for a raw group ID, or the contact/CRM/channel text variants for other recipient types. Not idempotent: each call sends another message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `group` | string | yes |  | Group. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Message. The text message to send. |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_text_to_channel`

**Send a Text to a Channel.** Broadcasts a text message to a WhatsApp Channel whose ID is chosen from the session channel list. Pick this for one-to-many channel posts rather than the contact/group/CRM text variants used for direct chats. Not idempotent: each call posts another message to the channel. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `channel` | string | yes |  | Channel. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Message. The text message to send. |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_text_to_crm_contact`

**Send a Message to a CRM Contact.** Sends a text message to a contact stored in the WhatsScale CRM, identified by CRM contact ID chosen from the dropdown. Pick this when the recipient is a managed CRM record; use the plain contact, group, manual-entry, or channel text variants for non-CRM recipients. Not idempotent: each call sends another message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `crmContact` | string | yes |  | CRM Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Message. The text message to send. |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_image_to_contact`

**Send an Image to a Contact.** Sends an image to a WhatsApp contact whose chat ID is chosen from the session contact list, with an optional caption. Pick this when the recipient is a known direct contact; use the manual-entry image action for a raw phone number, or the group/CRM/channel variants for other recipient types. Takes either a directly downloadable image URL or a file from a previous step. Not idempotent: each call delivers another image. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `contact` | string | yes |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `imageUrl` | file | yes |  | Image. A direct URL to the image, or a file from a previous step. Files are not supported; an action that needs one fails. |
| `caption` | string | no |  | Caption. Optional caption for the image (max 1024 characters). |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_image_to_group`

**Send an Image to a Group.** Sends an image to a WhatsApp group whose chat ID is chosen from the session group list, with an optional caption. Pick this when the recipient is a known group; use the manual-entry image action to target a raw group ID, or the contact/CRM/channel variants for other recipient types. Takes either a directly downloadable image URL or a file from a previous step. Not idempotent: each call delivers another image. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `group` | string | yes |  | Group. A value the product loads from the provider, such as an id; write the value itself. |
| `imageUrl` | file | yes |  | Image. A direct URL to the image, or a file from a previous step. Files are not supported; an action that needs one fails. |
| `caption` | string | no |  | Caption. Optional caption for the image (max 1024 characters). |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_image_to_channel`

**Send an Image to a Channel.** Broadcasts an image to a WhatsApp Channel whose ID is chosen from the session channel list, with an optional caption. Pick this for one-to-many channel broadcasts rather than the contact/group/CRM variants used for direct chats. Takes either a directly downloadable image URL or a file from a previous step. Not idempotent: each call posts another image to the channel. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `channel` | string | yes |  | Channel. A value the product loads from the provider, such as an id; write the value itself. |
| `imageUrl` | file | yes |  | Image. A direct URL to the image, or a file from a previous step. Files are not supported; an action that needs one fails. |
| `caption` | string | no |  | Caption. Optional caption for the image (max 1024 characters). |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_image_to_crm_contact`

**Send an Image to a CRM Contact.** Sends an image to a contact stored in the WhatsScale CRM, identified by CRM contact ID chosen from the dropdown, with an optional caption. Pick this when the recipient is a managed CRM record; use the plain contact, group, manual-entry, or channel image variants for non-CRM recipients. Takes either a directly downloadable image URL or a file from a previous step. Not idempotent: each call delivers another image. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `crmContact` | string | yes |  | CRM Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `imageUrl` | file | yes |  | Image. A direct URL to the image, or a file from a previous step. Files are not supported; an action that needs one fails. |
| `caption` | string | no |  | Caption. Optional caption for the image (max 1024 characters). |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_video_to_contact`

**Send a Video to a Contact.** Sends a video to a WhatsApp contact whose chat ID is chosen from the session contact list, with an optional caption. Pick this when the recipient is a known direct contact; use the manual-entry video action for a raw phone number, or the group/CRM/channel variants for other recipient types. Takes either a directly downloadable video URL or a file from a previous step. Not idempotent: each call delivers another video. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `contact` | string | yes |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `videoUrl` | file | yes |  | Video. A direct URL to the video, or a file from a previous step. Files are not supported; an action that needs one fails. |
| `caption` | string | no |  | Caption. Optional caption for the video (max 1024 characters). |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_video_to_group`

**Send a Video to a Group.** Sends a video to a WhatsApp group whose chat ID is chosen from the session group list, with an optional caption. Pick this when the recipient is a known group; use the manual-entry video action instead to target a raw group ID, or the contact/CRM/channel variants for other recipient types. Takes either a directly downloadable video URL or a file from a previous step. Not idempotent: each call delivers another video. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `group` | string | yes |  | Group. A value the product loads from the provider, such as an id; write the value itself. |
| `videoUrl` | file | yes |  | Video. A direct URL to the video, or a file from a previous step. Files are not supported; an action that needs one fails. |
| `caption` | string | no |  | Caption. Optional caption for the video (max 1024 characters). |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_video_to_channel`

**Send a Video to a Channel.** Broadcasts a video to a WhatsApp Channel whose ID is chosen from the session channel list, with an optional caption. Pick this for one-to-many channel broadcasts rather than the contact/group/CRM variants used for direct chats. Takes either a directly downloadable video URL or a file from a previous step. Not idempotent: each call posts another video to the channel. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `channel` | string | yes |  | Channel. A value the product loads from the provider, such as an id; write the value itself. |
| `videoUrl` | file | yes |  | Video. A direct URL to the video, or a file from a previous step. Files are not supported; an action that needs one fails. |
| `caption` | string | no |  | Caption. Optional caption for the video (max 1024 characters). |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_video_to_crm_contact`

**Send a Video to a CRM Contact.** Sends a video to a contact stored in the WhatsScale CRM, identified by CRM contact ID chosen from the dropdown, with an optional caption. Pick this when the recipient is a managed CRM record; use the plain contact, group, manual-entry, or channel video variants for non-CRM recipients. Takes either a directly downloadable video URL or a file from a previous step. Not idempotent: each call delivers another video. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `crmContact` | string | yes |  | CRM Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `videoUrl` | file | yes |  | Video. A direct URL to the video, or a file from a previous step. Files are not supported; an action that needs one fails. |
| `caption` | string | no |  | Caption. Optional caption for the video (max 1024 characters). |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_document_to_contact`

**Send a Document to a Contact.** Sends a document/file to a WhatsApp contact whose chat ID is chosen from the session contact list, with an optional display filename and caption. Pick this when the recipient is a known direct contact; use the manual-entry document action for a raw phone number, or the group/CRM/channel variants for other recipient types. Takes either a directly downloadable document URL or a file from a previous step. Not idempotent: each call delivers another document. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `contact` | string | yes |  | Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `documentUrl` | file | yes |  | Document. A direct URL to the document, or a file from a previous step. Files are not supported; an action that needs one fails. |
| `filename` | string | no |  | Filename. Optional filename shown in WhatsApp (e.g. report.pdf). Auto-detected from the file if not provided. |
| `caption` | string | no |  | Caption. Optional caption for the document (max 1024 characters). |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_document_to_group`

**Send a Document to a Group.** Sends a document/file to a WhatsApp group whose chat ID is chosen from the session group list, with an optional display filename and caption. Pick this when the recipient is a known group; use the manual-entry, contact, CRM-contact, or channel variants for other recipient types. Takes either a directly downloadable document URL or a file from a previous step. Not idempotent: each call delivers another document. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `group` | string | yes |  | Group. A value the product loads from the provider, such as an id; write the value itself. |
| `documentUrl` | file | yes |  | Document. A direct URL to the document, or a file from a previous step. Files are not supported; an action that needs one fails. |
| `filename` | string | no |  | Filename. Optional filename shown in WhatsApp (e.g. report.pdf). Auto-detected from the file if not provided. |
| `caption` | string | no |  | Caption. Optional caption for the document (max 1024 characters). |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_document_to_crm_contact`

**Send a Document to a CRM Contact.** Sends a document/file to a contact stored in the WhatsScale CRM, identified by CRM contact ID chosen from the dropdown, with an optional display filename and caption. Pick this when the recipient is a managed CRM record; use the plain contact, group, manual-entry, or channel document variants for non-CRM recipients. Takes either a directly downloadable document URL or a file from a previous step. Not idempotent: each call delivers another document. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `crmContact` | string | yes |  | CRM Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `documentUrl` | file | yes |  | Document. A direct URL to the document, or a file from a previous step. Files are not supported; an action that needs one fails. |
| `filename` | string | no |  | Filename. Optional filename shown in WhatsApp (e.g. report.pdf). Auto-detected from the file if not provided. |
| `caption` | string | no |  | Caption. Optional caption for the document (max 1024 characters). |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_get_crm_contact`

**Get a CRM Contact.** Fetch a single WhatsScale CRM contact by its contact ID. Read-only; pick this when you already hold the ID (e.g. from List CRM Contacts), versus Find a CRM Contact by Phone when you only have the phone number. Sources the contact from a builder dropdown. Its twin Get a CRM Contact (By ID) makes the identical call with the ID passed as free text, which is the better fit when an ID is already in hand. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | CRM Contact. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Contact ID
- `phone`: Phone Number
- `name`: Name
- `tags`: Tags
- `source`: Source
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `whatsscale_update_crm_contact`

**Update a CRM Contact.** Updates the name and/or tags of an existing WhatsScale CRM contact identified by contact ID. Leave a field empty to keep its current value unchanged; tags are replaced wholesale, not merged. Idempotent: re-running with the same values converges the contact to the same state. Sources the contact from a builder dropdown. Its twin Update a CRM Contact (By ID) makes the identical call with the ID passed as free text, which is the better fit when an ID is already in hand. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | CRM Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. Leave empty to keep the current name unchanged. Clearing the name is not supported. |
| `tags` | array | no |  | Tags. Replaces all existing tags (e.g. vip, lead). Leave untouched to keep current tags unchanged. Clearing every tag is not supported. |

Output fields:

- `id`: Contact ID
- `phone`: Phone Number
- `name`: Name
- `tags`: Tags
- `source`: Source
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `whatsscale_delete_crm_contact`

**Delete a CRM Contact.** Permanently remove a WhatsScale CRM contact by its contact ID. Destructive and irreversible. Not idempotent: deleting an already-deleted contact fails the step with a 404, so a retry after a successful delete will fail. Confirm the ID (via the list or lookup actions) before deleting. Sources the contact from a builder dropdown. Its twin Delete a CRM Contact (By ID) makes the identical call with the ID passed as free text, which is the better fit when an ID is already in hand. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | CRM Contact. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `deleted`: Deleted (boolean)

### `whatsscale_add_crm_contact_tag`

**Add Tags to a CRM Contact.** Attach one or more tags to an existing WhatsScale CRM contact identified by contact ID (tags are lowercased automatically). Existing tags are kept, not replaced — use Update a CRM Contact to replace the whole set, or Remove a Tag from a CRM Contact to detach one. Each tag is sent as its own request, so a mid-way failure can leave earlier tags applied. Requires a valid contact ID, which you can obtain via the list or lookup actions. Sources the contact from a builder dropdown. Its twin Add Tags to a CRM Contact (By ID) makes the identical call with the ID passed as free text, which is the better fit when an ID is already in hand. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | CRM Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | yes |  | Tags. One or more tags to add (e.g. vip, lead). Existing tags are kept; tags are automatically lowercased. |

Output fields:

- `id`: Contact ID
- `phone`: Phone Number
- `name`: Name
- `tags`: Tags
- `source`: Source
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `whatsscale_remove_crm_contact_tag`

**Remove a Tag from a CRM Contact.** Detach one tag from a WhatsScale CRM contact identified by contact ID. Reverses Add a Tag to a CRM Contact; idempotent since the end state is the tag being absent. The contact itself is left intact. Sources the contact from a builder dropdown. Its twin Remove a Tag from a CRM Contact (By ID) makes the identical call with the ID passed as free text, which is the better fit when an ID is already in hand. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | CRM Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `tag` | string | yes |  | Tag. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Contact ID
- `phone`: Phone Number
- `name`: Name
- `tags`: Tags
- `source`: Source
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `whatsscale_create_crm_contact`

**Create a CRM Contact.** Create a new WhatsScale CRM contact from a phone number (with country code), optionally setting a name and a list of tags. Not idempotent: calling it again may produce a duplicate contact, so look the phone up first with Find a CRM Contact by Phone if you need to avoid duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone` | string | yes |  | Phone Number. The phone number in international format, digits only (e.g. 31649931832 — no +, spaces or dashes). |
| `name` | string | no |  | Name. Full name of the contact (e.g. John Smith) |
| `tags` | array | no |  | Tags. e.g. vip, customer, lead. Tags are automatically lowercased. |

Output fields:

- `id`: Contact ID
- `phone`: Phone Number
- `name`: Name
- `tags`: Tags
- `source`: Source
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `whatsscale_find_crm_contact_by_phone`

**Find a CRM Contact by Phone.** Fetch a single WhatsScale CRM contact by exact phone number (include country code). Read-only lookup; pick this when you already have the phone and want that one contact, versus List CRM Contacts for browsing/filtering or searching by name. Fails the step with a 404 if the number is not in the CRM, so it cannot be used as a lookup-then-branch predicate without error handling. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone` | string | yes |  | Phone Number. |

Output fields:

- `id`: Contact ID
- `phone`: Phone Number
- `name`: Name
- `tags`: Tags
- `source`: Source
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `whatsscale_list_crm_contacts`

**List CRM Contacts.** Browse WhatsScale CRM contacts as a paginated list, optionally filtered by tag or a free-text search over name/phone. Read-only; use this to discover or enumerate contacts when you do not have an exact phone (use Find a CRM Contact by Phone) or contact ID (use Get a CRM Contact). Control volume with limit/page. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag` | string | no |  | Filter by Tag. Optional. Filter contacts by tag. A value the product loads from the provider, such as an id; write the value itself. |
| `search` | string | no |  | Search. Optional. Search contacts by name or phone number. |
| `limit` | number | no | `50` | Limit. Max results to return. Default 50. |
| `page` | number | no | `1` | Page. Page number. Default 1. |

Output fields:

- `items`: Contacts
- `items[].id`: Contact ID
- `items[].phone`: Phone Number
- `items[].name`: Name
- `items[].tags`: Tags
- `items[].source`: Source
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `total`: Total (number)
- `page`: Page (number)
- `limit`: Limit (number)
- `has_more`: Has More (boolean)

### `whatsscale_list_crm_tags`

**List CRM Tags.** Lists every unique tag currently in use across WhatsScale CRM contacts. Use to see the existing tag taxonomy before adding a new tag, so you can reuse an existing one instead of creating a near-duplicate. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Tags
- `items[].tag`: Tag
- `items[].count`: Contact Count (number)
- `total`: Total (number)

### `whatsscale_send_audio_manual`

**Send an Audio Message (By ID).** Sends an audio file to a recipient identified directly by ID rather than a builder dropdown. Sends as a native WhatsApp voice note by default; set voice to false to deliver it as a regular file attachment with an optional caption instead. Takes either a directly downloadable audio URL or a file from a previous step. Not idempotent: each call delivers another audio message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `chatType` | string | yes |  | Recipient Type. Who this audio message is being sent to. One of `"contact"`, `"group"`, `"channel"`, `"crm_contact"`. |
| `recipient` | string | yes |  | Recipient ID. Contact: the phone number in international format, digits only (e.g. 31649931832 — no +, spaces or dashes). Group/Channel: the bare ID, no @ suffix needed. CRM Contact: the CRM contact ID. A full chat ID is also accepted and passed through unchanged, so the Chat ID returned by Check WhatsApp Number… |
| `audioUrl` | file | yes |  | Audio. A direct URL to the audio, or a file from a previous step. Files are not supported; an action that needs one fails. |
| `voice` | boolean | no | `true` | Send as Voice Note. On sends a native WhatsApp voice note. Off sends a regular file attachment and allows a caption. |
| `filename` | string | no |  | Filename. Optional filename. Auto-detected from the file if not provided. |
| `caption` | string | no |  | Caption. Optional caption (max 1024 characters). Only applies when Send as Voice Note is off. |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_location_manual`

**Send a Location (By ID).** Sends a GPS location to a recipient identified directly by ID rather than a builder dropdown, with an optional place name. WhatsApp does not support locations in channels, so channel is not offered as a recipient type. Not idempotent: each call sends another location message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `chatType` | string | yes |  | Recipient Type. Who this location is being sent to. One of `"contact"`, `"group"`, `"crm_contact"`. |
| `recipient` | string | yes |  | Recipient ID. Contact: the phone number in international format, digits only (e.g. 31649931832 — no +, spaces or dashes). Group: the bare ID, no @ suffix needed. CRM Contact: the CRM contact ID. A full chat ID is also accepted and passed through unchanged, so the Chat ID returned by Check WhatsApp Number (316499… |
| `latitude` | number | yes |  | Latitude. Between -90 and 90. |
| `longitude` | number | yes |  | Longitude. Between -180 and 180. |
| `title` | string | no |  | Location Name. Optional name shown with the pin (e.g. "Main Office"). |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_poll_manual`

**Send a Poll (By ID).** Sends an interactive poll (2-12 options) to a recipient identified directly by ID rather than a builder dropdown. Set multipleAnswers to allow more than one option to be selected. Not idempotent: each call sends another poll. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `chatType` | string | yes |  | Recipient Type. Who this poll is being sent to. One of `"contact"`, `"group"`, `"channel"`, `"crm_contact"`. |
| `recipient` | string | yes |  | Recipient ID. Contact: the phone number in international format, digits only (e.g. 31649931832 — no +, spaces or dashes). Group/Channel: the bare ID, no @ suffix needed. CRM Contact: the CRM contact ID. A full chat ID is also accepted and passed through unchanged, so the Chat ID returned by Check WhatsApp Number… |
| `question` | string | yes |  | Question. The poll question. |
| `options` | array | yes |  | Options. 2 to 12 unique answer options. |
| `multipleAnswers` | boolean | no | `false` | Allow Multiple Answers. |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_add_participants_to_group`

**Add Participants to a Group.** Adds one or more contacts to a WhatsApp group, with both the group and the contacts chosen from the session lists. Pick this when a human is building the step; use the by-ID variant to add a raw phone number an agent already holds. Not idempotent: a number already in the group may error or no-op depending on how the group responds. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `group` | string | yes |  | Group. A value the product loads from the provider, such as an id; write the value itself. |
| `participants` | array | yes |  | Participants. Pick one or more contacts from this session to add to the group. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `jid`: JID
- `phone_number`: Phone Number
- `is_admin`: Is Admin (boolean)
- `is_super_admin`: Is Super Admin (boolean)
- `display_name`: Display Name
- `error`: Error Code (number)

### `whatsscale_remove_participants_from_group`

**Remove Participants from a Group.** Removes one or more current members from a WhatsApp group, with both the group and the members chosen from dropdowns. Pick this when a human is building the step; use the by-ID variant to remove a raw phone number an agent already holds. Idempotent: removing someone already outside the group converges on the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `group` | string | yes |  | Group. A value the product loads from the provider, such as an id; write the value itself. |
| `participants` | array | yes |  | Participants. Pick one or more current members of the selected group. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `jid`: JID
- `phone_number`: Phone Number
- `is_admin`: Is Admin (boolean)
- `is_super_admin`: Is Super Admin (boolean)
- `display_name`: Display Name
- `error`: Error Code (number)

### `whatsscale_promote_admins_in_group`

**Promote Group Admins.** Grants admin privileges to one or more current members of a WhatsApp group, with both the group and the members chosen from dropdowns. Pick this when a human is building the step; use the by-ID variant for a raw phone number an agent already holds. Idempotent: promoting an existing admin converges on the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `group` | string | yes |  | Group. A value the product loads from the provider, such as an id; write the value itself. |
| `participants` | array | yes |  | Participants. Pick one or more current members of the selected group. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `jid`: JID
- `phone_number`: Phone Number
- `is_admin`: Is Admin (boolean)
- `is_super_admin`: Is Super Admin (boolean)
- `display_name`: Display Name
- `error`: Error Code (number)

### `whatsscale_demote_admins_in_group`

**Demote Group Admins.** Revokes admin privileges from one or more members of a WhatsApp group, dropping them back to regular member, with both the group and the members chosen from dropdowns. Pick this when a human is building the step; use the by-ID variant for a raw phone number an agent already holds. Idempotent: demoting a non-admin converges on the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `group` | string | yes |  | Group. A value the product loads from the provider, such as an id; write the value itself. |
| `participants` | array | yes |  | Participants. Pick one or more current members of the selected group. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `jid`: JID
- `phone_number`: Phone Number
- `is_admin`: Is Admin (boolean)
- `is_super_admin`: Is Super Admin (boolean)
- `display_name`: Display Name
- `error`: Error Code (number)

### `whatsscale_leave_selected_group`

**Leave a Group.** Removes the connected WhatsApp session from a group chosen from the session group list. The session can only rejoin if re-invited or re-added - treat as destructive. Pick this when a human is building the step; use the by-ID variant for a raw group ID an agent already holds. Idempotent: leaving a group you already left converges on the same end state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `group` | string | yes |  | Group. A value the product loads from the provider, such as an id; write the value itself. |

### `whatsscale_list_participants_in_group`

**List Group Participants.** Lists the members of a WhatsApp group chosen from the session group list, including each member phone number (best-effort) and role (participant, admin, or superadmin). Pick this when a human is building the step; use the by-ID variant for a raw group ID an agent already holds. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `group` | string | yes |  | Group. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no | `100` | Limit. Max participants to return. Default 100, max 500. |
| `offset` | number | no | `0` | Offset. Number of participants to skip. Default 0. |

Output fields:

- `id`: ID
- `pn`: Chat ID
- `role`: Role

### `whatsscale_add_group_participants_by_id`

**Add Participants to a Group (By ID).** Adds one or more phone numbers to a WhatsApp group as members, given the raw group ID. Not idempotent: a number already in the group may error or no-op depending on how the group responds, so check List Group Participants first if you need to avoid duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `groupId` | string | yes |  | Group ID. The group ID, with or without the @g.us suffix. |
| `participants` | array | yes |  | Participants. Phone numbers in international format, digits only (e.g. 31649931832 — no +, spaces or dashes). |

Output fields:

- `jid`: JID
- `phone_number`: Phone Number
- `is_admin`: Is Admin (boolean)
- `is_super_admin`: Is Super Admin (boolean)
- `display_name`: Display Name
- `error`: Error Code (number)

### `whatsscale_remove_group_participants_by_id`

**Remove Participants from a Group (By ID).** Removes one or more phone numbers from a WhatsApp group, given the raw group ID. Idempotent: removing someone already outside the group converges on the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `groupId` | string | yes |  | Group ID. The group ID, with or without the @g.us suffix. |
| `participants` | array | yes |  | Participants. Phone numbers in international format, digits only (e.g. 31649931832 — no +, spaces or dashes). |

Output fields:

- `jid`: JID
- `phone_number`: Phone Number
- `is_admin`: Is Admin (boolean)
- `is_super_admin`: Is Super Admin (boolean)
- `display_name`: Display Name
- `error`: Error Code (number)

### `whatsscale_promote_group_admins_by_id`

**Promote Group Admins (By ID).** Grants admin privileges to one or more existing members of a WhatsApp group, given the raw group ID; each must already be a member. Idempotent: promoting an existing admin converges on the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `groupId` | string | yes |  | Group ID. The group ID, with or without the @g.us suffix. |
| `participants` | array | yes |  | Participants. Phone numbers in international format, digits only (e.g. 31649931832 — no +, spaces or dashes). |

Output fields:

- `jid`: JID
- `phone_number`: Phone Number
- `is_admin`: Is Admin (boolean)
- `is_super_admin`: Is Super Admin (boolean)
- `display_name`: Display Name
- `error`: Error Code (number)

### `whatsscale_demote_group_admins_by_id`

**Demote Group Admins (By ID).** Revokes admin privileges from one or more members of a WhatsApp group, given the raw group ID, dropping them back to regular member. Idempotent: demoting a non-admin converges on the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `groupId` | string | yes |  | Group ID. The group ID, with or without the @g.us suffix. |
| `participants` | array | yes |  | Participants. Phone numbers in international format, digits only (e.g. 31649931832 — no +, spaces or dashes). |

Output fields:

- `jid`: JID
- `phone_number`: Phone Number
- `is_admin`: Is Admin (boolean)
- `is_super_admin`: Is Super Admin (boolean)
- `display_name`: Display Name
- `error`: Error Code (number)

### `whatsscale_leave_group_by_id`

**Leave a Group (By ID).** Removes the connected WhatsApp session from a group, given the raw group ID. The session can only rejoin if re-invited or re-added — treat as destructive. Idempotent: leaving a group you already left converges on the same end state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `groupId` | string | yes |  | Group ID. The group ID, with or without the @g.us suffix. |

### `whatsscale_list_group_participants_by_id`

**List Group Participants (By ID).** Lists the members of a WhatsApp group by group ID, including each member's phone number (best-effort) and role (participant, admin, or superadmin). Use before Add/Remove/Promote/Demote Group Participants to confirm current membership. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `groupId` | string | yes |  | Group ID. The group ID, with or without the @g.us suffix. |
| `limit` | number | no | `100` | Limit. Max participants to return. Default 100, max 500. |
| `offset` | number | no | `0` | Offset. Number of participants to skip. Default 0. |

Output fields:

- `id`: ID
- `pn`: Chat ID
- `role`: Role

### `whatsscale_post_text_status`

**Post a Text Status.** Posts a text-only WhatsApp Status update visible to your contacts for 24 hours, with an optional background color (hex, defaults to WhatsApp green). This broadcasts to your status feed, not to a specific recipient; the post completes asynchronously. Not idempotent: each call posts another status. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text. The status text to post. |
| `backgroundColor` | string | no |  | Background Color. Leave empty for the default WhatsApp green. |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_post_image_status`

**Post an Image Status.** Posts an image WhatsApp Status update visible to your contacts for 24 hours, with an optional caption. This broadcasts to your status feed, not to a specific recipient; the post completes asynchronously. Takes either a directly downloadable image URL or a file from a previous step. Not idempotent: each call posts another status. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `imageUrl` | file | yes |  | Image. A direct URL to the image, or a file from a previous step. Files are not supported; an action that needs one fails. |
| `caption` | string | no |  | Caption. Optional caption for the status. |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_post_video_status`

**Post a Video Status.** Posts a video WhatsApp Status update visible to your contacts for 24 hours, with an optional caption. This broadcasts to your status feed, not to a specific recipient. Takes either a directly downloadable video URL or a file from a previous step; the post completes asynchronously. Not idempotent: each call posts another status. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `videoUrl` | file | yes |  | Video. A direct URL to the video, or a file from a previous step. Files are not supported; an action that needs one fails. |
| `caption` | string | no |  | Caption. Optional caption for the status. |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_check_whatsapp`

**Check WhatsApp Number.** Checks whether a given phone number is registered on WhatsApp for the selected session. Use to validate or filter recipients before attempting to send any message; accepts the number in nearly any format with or without a country-code prefix. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `phone` | string | yes |  | Phone Number. Phone number with country code (e.g. +31612345678 or 31612345678). Any format accepted. |

Output fields:

- `numberExists`: Number Exists (boolean)
- `phone`: Phone Number
- `phoneFormatted`: Formatted Phone Number
- `chatId`: Chat ID

### `whatsscale_list_sessions`

**List WhatsApp Sessions.** Lists every WhatsApp session on the account with its connection status and linked phone. Use to discover a session name to pass into other actions when you don't already have one; a "WORKING" status means the session is connected and ready to send. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `session_name`: Session Name
- `status`: Status
- `presence`: Presence
- `phone_number`: Phone Number
- `push_name`: Push Name
- `jid`: JID

### `whatsscale_list_whatsapp_contacts`

**List WhatsApp Contacts.** Lists the WhatsApp contacts synced to a session directly from the phone/device, including each contact's chat ID. This is the raw WhatsApp address book, not the WhatsScale CRM — use List CRM Contacts instead for CRM-managed records. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no |  | Limit. Maximum number of contacts to return. Leave empty for the whole address book, which can run to thousands of entries. |

Output fields:

- `id`: Contact ID
- `name`: Name
- `pushname`: Push Name

### `whatsscale_list_whatsapp_groups`

**List WhatsApp Groups.** Lists the WhatsApp groups the session is a member of, including each group's chat ID, name, member count, and admin count. Use to discover a group ID before sending a message or managing group membership; use List Group Participants for the full member list of one group. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `group_id`: Group ID
- `name`: Name
- `size`: Size (number)
- `admin_count`: Admin Count (number)

### `whatsscale_send_text_manual`

**Send a Text Message (By ID).** Sends a text message to a recipient identified directly by ID rather than a builder dropdown. Set chatType to contact (phone number with country code), group or channel (bare ID, no @ suffix needed), or crm_contact (WhatsScale CRM contact ID). Not idempotent: each call sends another message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `chatType` | string | yes |  | Recipient Type. Who this message is being sent to. One of `"contact"`, `"group"`, `"channel"`, `"crm_contact"`. |
| `recipient` | string | yes |  | Recipient ID. Contact: the phone number in international format, digits only (e.g. 31649931832 — no +, spaces or dashes). Group/Channel: the bare ID, no @ suffix needed. CRM Contact: the CRM contact ID. A full chat ID is also accepted and passed through unchanged, so the Chat ID returned by Check WhatsApp Number… |
| `text` | string | yes |  | Message. The text message to send. |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_image_manual`

**Send an Image (By ID).** Sends an image to a recipient identified directly by ID rather than a builder dropdown, with an optional caption. Set chatType to contact (phone number with country code), group or channel (bare ID, no @ suffix needed), or crm_contact (WhatsScale CRM contact ID). Takes either a directly downloadable image URL or a file from a previous step. Not idempotent: each call delivers another image. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `chatType` | string | yes |  | Recipient Type. Who this image is being sent to. One of `"contact"`, `"group"`, `"channel"`, `"crm_contact"`. |
| `recipient` | string | yes |  | Recipient ID. Contact: the phone number in international format, digits only (e.g. 31649931832 — no +, spaces or dashes). Group/Channel: the bare ID, no @ suffix needed. CRM Contact: the CRM contact ID. A full chat ID is also accepted and passed through unchanged, so the Chat ID returned by Check WhatsApp Number… |
| `imageUrl` | file | yes |  | Image. A direct URL to the image, or a file from a previous step. Files are not supported; an action that needs one fails. |
| `caption` | string | no |  | Caption. Optional caption for the image (max 1024 characters). |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_video_manual`

**Send a Video (By ID).** Sends a video to a recipient identified directly by ID rather than a builder dropdown, with an optional caption. Set chatType to contact (phone number with country code), group or channel (bare ID, no @ suffix needed), or crm_contact (WhatsScale CRM contact ID). Takes either a directly downloadable video URL or a file from a previous step; the send completes asynchronously. Not idempotent: each call delivers another video. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `chatType` | string | yes |  | Recipient Type. Who this video is being sent to. One of `"contact"`, `"group"`, `"channel"`, `"crm_contact"`. |
| `recipient` | string | yes |  | Recipient ID. Contact: the phone number in international format, digits only (e.g. 31649931832 — no +, spaces or dashes). Group/Channel: the bare ID, no @ suffix needed. CRM Contact: the CRM contact ID. A full chat ID is also accepted and passed through unchanged, so the Chat ID returned by Check WhatsApp Number… |
| `videoUrl` | file | yes |  | Video. A direct URL to the video, or a file from a previous step. Files are not supported; an action that needs one fails. |
| `caption` | string | no |  | Caption. Optional caption for the video (max 1024 characters). |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_send_document_manual`

**Send a Document (By ID).** Sends a document/file to a recipient identified directly by ID rather than a builder dropdown, with an optional display filename and caption. Set chatType to contact (phone number with country code), group or channel (bare ID, no @ suffix needed), or crm_contact (WhatsScale CRM contact ID). Takes either a directly downloadable document URL or a file from a previous step; the send completes asynchronously. Not idempotent: each call delivers another document. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | WhatsApp Session. A value the product loads from the provider, such as an id; write the value itself. |
| `chatType` | string | yes |  | Recipient Type. Who this document is being sent to. One of `"contact"`, `"group"`, `"channel"`, `"crm_contact"`. |
| `recipient` | string | yes |  | Recipient ID. Contact: the phone number in international format, digits only (e.g. 31649931832 — no +, spaces or dashes). Group/Channel: the bare ID, no @ suffix needed. CRM Contact: the CRM contact ID. A full chat ID is also accepted and passed through unchanged, so the Chat ID returned by Check WhatsApp Number… |
| `documentUrl` | file | yes |  | Document. A direct URL to the document, or a file from a previous step. Files are not supported; an action that needs one fails. |
| `filename` | string | no |  | Filename. Optional filename shown in WhatsApp (e.g. report.pdf). Auto-detected from the file if not provided. |
| `caption` | string | no |  | Caption. Optional caption for the document (max 1024 characters). |

Output fields:

- `message_id`: Message ID
- `chat_id`: Chat ID
- `sender_id`: Sender ID
- `is_group`: Is Group (boolean)
- `is_from_me`: Is From Me (boolean)
- `sent_at`: Sent At (datetime)

### `whatsscale_get_crm_contact_by_id`

**Get a CRM Contact (By ID).** Fetch a single WhatsScale CRM contact by its contact ID. Read-only; pick this when you already hold the ID (e.g. from List CRM Contacts), versus Find a CRM Contact by Phone when you only have the phone number. Its twin Get a CRM Contact makes the identical call but sources the contact from a builder dropdown instead of a free-text ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. The WhatsScale CRM contact ID (from List CRM Contacts or Find a CRM Contact by Phone). |

Output fields:

- `id`: Contact ID
- `phone`: Phone Number
- `name`: Name
- `tags`: Tags
- `source`: Source
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `whatsscale_update_crm_contact_by_id`

**Update a CRM Contact (By ID).** Updates the name and/or tags of an existing WhatsScale CRM contact identified by contact ID. Leave a field empty to keep its current value unchanged; tags are replaced wholesale, not merged. Idempotent: re-running with the same values converges the contact to the same state. Its twin Update a CRM Contact makes the identical call but sources the contact from a builder dropdown instead of a free-text ID. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. The WhatsScale CRM contact ID (from List CRM Contacts or Find a CRM Contact by Phone). |
| `name` | string | no |  | Name. Leave empty to keep the current name unchanged. Clearing the name is not supported. |
| `tags` | array | no |  | Tags. Replaces all existing tags (e.g. vip, lead). Leave untouched to keep current tags unchanged. Clearing every tag is not supported. |

Output fields:

- `id`: Contact ID
- `phone`: Phone Number
- `name`: Name
- `tags`: Tags
- `source`: Source
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `whatsscale_delete_crm_contact_by_id`

**Delete a CRM Contact (By ID).** Permanently remove a WhatsScale CRM contact by its contact ID. Destructive and irreversible. Not idempotent: deleting an already-deleted contact fails the step with a 404, so a retry after a successful delete will fail. Confirm the ID (via the list or lookup actions) before deleting. Its twin Delete a CRM Contact makes the identical call but sources the contact from a builder dropdown instead of a free-text ID. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. The WhatsScale CRM contact ID (from List CRM Contacts or Find a CRM Contact by Phone). |

Output fields:

- `success`: Success (boolean)
- `deleted`: Deleted (boolean)

### `whatsscale_add_crm_contact_tag_by_id`

**Add Tags to a CRM Contact (By ID).** Attach one or more tags to an existing WhatsScale CRM contact identified by contact ID (tags are lowercased automatically). Existing tags are kept, not replaced — use Update a CRM Contact to replace the whole set, or Remove a Tag from a CRM Contact to detach one. Each tag is sent as its own request, so a mid-way failure can leave earlier tags applied. Requires a valid contact ID, which you can obtain via the list or lookup actions. Its twin Add Tags to a CRM Contact makes the identical call but sources the contact from a builder dropdown instead of a free-text ID. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. The WhatsScale CRM contact ID (from List CRM Contacts or Find a CRM Contact by Phone). |
| `tags` | array | yes |  | Tags. One or more tags to add (e.g. vip, lead). Existing tags are kept; tags are automatically lowercased. |

Output fields:

- `id`: Contact ID
- `phone`: Phone Number
- `name`: Name
- `tags`: Tags
- `source`: Source
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `whatsscale_remove_crm_contact_tag_by_id`

**Remove a Tag from a CRM Contact (By ID).** Detach one tag from a WhatsScale CRM contact identified by contact ID. Reverses Add a Tag to a CRM Contact; idempotent since the end state is the tag being absent. The contact itself is left intact. Its twin Remove a Tag from a CRM Contact makes the identical call but sources the contact from a builder dropdown instead of a free-text ID. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. The WhatsScale CRM contact ID (from List CRM Contacts or Find a CRM Contact by Phone). |
| `tag` | string | yes |  | Tag. The exact tag to remove (e.g. vip). |

Output fields:

- `id`: Contact ID
- `phone`: Phone Number
- `name`: Name
- `tags`: Tags
- `source`: Source
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

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

# WhatsApp Business

Send text, media and template messages from your WhatsApp Business number.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-whatsapp'
  version: '1.0.1'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> You need the WhatsApp Business Account ID and a permanent System User access token from Meta.
>
> 1. Open [Meta for Developers](https://developers.facebook.com/) and create a **Business** app (use case **Other**).
> 2. Add the **WhatsApp** product to the app.
> 3. Go to **WhatsApp > API Setup** and copy the **WhatsApp Business Account ID**.
> 4. In [Meta Business Manager](https://business.facebook.com/) open **Settings > System Users**, add a system user with access to the app, and generate a permanent token with the **whatsapp_business_messaging** and **whatsapp_business_management** permissions.
>
> Optional: to have Activepieces verify that webhook deliveries really come from Meta, also paste your **App Secret** (App settings > Basic > App Secret). Triggers then reject any request that is not signed with it.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `access_token` | string | yes |  | System User Access Token. Permanent token of a System User with access to the app. |
| `businessAccountId` | string | yes |  | Business Account ID. Found under WhatsApp > API Setup in your Meta app. |
| `app_secret` | string | no |  | App Secret. Optional. Your Meta app secret (App settings > Basic). When set, every webhook delivery must carry a valid X-Hub-Signature-256 or it is ignored. |

## Actions

### `sendMessage`

**Send Message.** Sends a plain text WhatsApp message from a business phone number to a single recipient via the WhatsApp Cloud API. Choose this for free-form text replies or notifications when no media or pre-approved template is needed; for media use Send Media and for marketing/utility templates use Send Template Message. Requires the sender phone number ID and the recipient phone number in international format; outside the 24-hour customer service window only template messages are deliverable. Not idempotent — each call delivers a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number_id` | string | yes |  | From Phone Number. The business number the message is sent from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | To. Recipient's phone number in international format. |
| `text` | string | yes |  | Message. Plain text, up to 4096 characters. |

Output fields:

- `messaging_product`: Messaging Product
- `contacts`: Contacts
- `contacts[].input`: Input Number
- `contacts[].wa_id`: WhatsApp ID
- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].message_status`: Message Status

### `sendMedia`

**Send Media.** Sends an image, video, audio, document, or sticker to a WhatsApp recipient by referencing the media via a public URL. Choose this when the message payload is a file rather than plain text; captions are supported for media types that allow them and a filename can be set for documents. Requires the sender phone number ID, recipient phone number, media type, and a reachable media URL; subject to WhatsApp messaging-window rules. Not idempotent — each call delivers a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number_id` | string | yes |  | From Phone Number. The business number the message is sent from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | To. Recipient's phone number in international format. |
| `type` | string | yes |  | Media Type. What kind of file the URL points to. A value the product loads from the provider, such as an id; write the value itself. |
| `media` | string | yes |  | Media URL. Public link WhatsApp downloads when it sends the message. |
| `caption` | string | no |  | Caption. Text shown under the media. Ignored for audio and stickers. |
| `filename` | string | no |  | Filename. Documents only: the file name the recipient sees. |

Output fields:

- `messaging_product`: Messaging Product
- `contacts`: Contacts
- `contacts[].input`: Input Number
- `contacts[].wa_id`: WhatsApp ID
- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].message_status`: Message Status

### `send-template-message`

**Send Template Message.** Sends a pre-approved WhatsApp message template to a recipient, filling its header, body, and button placeholders from the supplied fields. Choose this to initiate conversations outside the 24-hour customer service window or for notifications/marketing where a registered template is required; the template must already be approved in the WhatsApp Business account. Requires the sender phone number ID, recipient phone number, and the template ID (its name and language are resolved automatically). Not idempotent — each call delivers a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number_id` | string | yes |  | From Phone Number. The business number the message is sent from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | To. Recipient's phone number in international format. |
| `message_template_id` | string | yes |  | Template. Only templates approved by WhatsApp are delivered. A value the product loads from the provider, such as an id; write the value itself. |
| `message_template_fields` | object | yes |  | Template Fields. Fill in each placeholder of the selected template. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `messaging_product`: Messaging Product
- `contacts`: Contacts
- `contacts[].input`: Input Number
- `contacts[].wa_id`: WhatsApp ID
- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].message_status`: Message Status

### `send_template`

**Send Template.** Sends a pre-approved WhatsApp message template identified by its name and language code, filling the numbered {{1}}, {{2}} placeholders from plain parameter lists for the header, body and URL button. Use this to start a conversation outside the 24-hour window or for notifications; resolve the template name, language and placeholder count with List Message Templates first. Only text parameters are supported. Not idempotent — each call sends a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number_id` | string | yes |  | From Phone Number. The business number the message is sent from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | To. Recipient phone number in international format, digits only (for example 962791234567). |
| `template_name` | string | yes |  | Template Name. Exact template name, for example hello_world. Get it from List Message Templates. |
| `language_code` | string | yes | `"en_US"` | Language Code. Language and locale of the approved template, for example en_US. |
| `body_parameters` | array | no |  | Body Parameters. Values for the body placeholders, in order: the first entry fills {{1}}, the second {{2}}. |
| `header_parameters` | array | no |  | Header Parameters. Values for text header placeholders, in order. |
| `button_url_parameters` | array | no |  | Button URL Parameters. Values for the dynamic URL suffix of the first URL button, in order. |
| `reply_to_message_id` | string | no |  | Reply To Message ID. Optional WhatsApp message ID (wamid) to send this message as a reply to. |

Output fields:

- `messaging_product`: Messaging Product
- `contacts`: Contacts
- `contacts[].input`: Input Number
- `contacts[].wa_id`: WhatsApp ID
- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].message_status`: Message Status

### `send_interactive_buttons`

**Send Interactive Buttons.** Sends a WhatsApp message with up to three tappable reply buttons; the recipient tap arrives as an incoming interactive message carrying the button id. Choose this over Send Message when you need a structured yes/no or menu-style answer, and over Send Interactive List when there are three options or fewer. Free-form, so it only delivers inside the 24-hour customer service window. Not idempotent — each call sends a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number_id` | string | yes |  | From Phone Number. The business number the message is sent from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | To. Recipient phone number in international format, digits only (for example 962791234567). |
| `body` | string | yes |  | Body. Main message text. |
| `buttons` | array | yes |  | Buttons. Between one and three buttons. Titles must be unique and at most 20 characters. Each item: { `id`, `title` }. |
| `header_type` | string | no | `"none"` | Header Type. Optional header shown above the body: a short text line or a media item from a public URL. One of `"none"`, `"text"`, `"image"`, `"video"`, `"document"`. |
| `header_text` | string | no |  | Header Text. Used when Header Type is Text. Max 60 characters. |
| `header_media_url` | string | no |  | Header Media URL. Public URL of the header image, video or document. Used when Header Type is a media type. |
| `footer` | string | no |  | Footer. Optional footer text, max 60 characters. |
| `reply_to_message_id` | string | no |  | Reply To Message ID. Optional WhatsApp message ID (wamid) to send this message as a reply to. |

Output fields:

- `messaging_product`: Messaging Product
- `contacts`: Contacts
- `contacts[].input`: Input Number
- `contacts[].wa_id`: WhatsApp ID
- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].message_status`: Message Status

### `send_interactive_list`

**Send Interactive List.** Sends a WhatsApp list message: a button that opens a menu of up to ten rows grouped in sections, and the recipient selection arrives as an incoming interactive message carrying the row id. Choose this over Send Interactive Buttons when there are more than three options. Free-form, so it only delivers inside the 24-hour customer service window. Not idempotent — each call sends a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number_id` | string | yes |  | From Phone Number. The business number the message is sent from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | To. Recipient phone number in international format, digits only (for example 962791234567). |
| `body` | string | yes |  | Body. Main message text. |
| `button_text` | string | yes |  | Button Text. Label of the button that opens the list. Max 20 characters. |
| `section_title` | string | yes |  | Section Title. Title shown above the rows. Max 24 characters. |
| `rows` | array | yes |  | Rows. Between one and ten rows. Titles max 24 characters, descriptions max 72. Each item: { `id`, `title`, `description`? }. |
| `header_text` | string | no |  | Header Text. Used when Header Type is Text. Max 60 characters. |
| `footer` | string | no |  | Footer. Optional footer text, max 60 characters. |
| `reply_to_message_id` | string | no |  | Reply To Message ID. Optional WhatsApp message ID (wamid) to send this message as a reply to. |

Output fields:

- `messaging_product`: Messaging Product
- `contacts`: Contacts
- `contacts[].input`: Input Number
- `contacts[].wa_id`: WhatsApp ID
- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].message_status`: Message Status

### `send_interactive_cta_url`

**Send Interactive CTA URL.** Sends a WhatsApp message with one call-to-action button that opens a URL, without needing an approved template. Choose this over Send Message when the recipient should tap through to a page rather than read a raw link. Free-form, so it only delivers inside the 24-hour customer service window. Not idempotent — each call sends a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number_id` | string | yes |  | From Phone Number. The business number the message is sent from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | To. Recipient phone number in international format, digits only (for example 962791234567). |
| `body` | string | yes |  | Body. Main message text. |
| `button_text` | string | yes |  | Button Text. Label of the button. Max 20 characters. |
| `url` | string | yes |  | Button URL. The link the button opens. |
| `header_type` | string | no | `"none"` | Header Type. Optional header shown above the body: a short text line or a media item from a public URL. One of `"none"`, `"text"`, `"image"`, `"video"`, `"document"`. |
| `header_text` | string | no |  | Header Text. Used when Header Type is Text. Max 60 characters. |
| `header_media_url` | string | no |  | Header Media URL. Public URL of the header image, video or document. Used when Header Type is a media type. |
| `footer` | string | no |  | Footer. Optional footer text, max 60 characters. |
| `reply_to_message_id` | string | no |  | Reply To Message ID. Optional WhatsApp message ID (wamid) to send this message as a reply to. |

Output fields:

- `messaging_product`: Messaging Product
- `contacts`: Contacts
- `contacts[].input`: Input Number
- `contacts[].wa_id`: WhatsApp ID
- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].message_status`: Message Status

### `send_location`

**Send Location.** Sends a WhatsApp location message that renders as a map pin, with an optional place name and address. Choose this over Send Message when the payload is a physical place rather than text. Free-form, so it only delivers inside the 24-hour customer service window. Not idempotent — each call sends a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number_id` | string | yes |  | From Phone Number. The business number the message is sent from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | To. Recipient phone number in international format, digits only (for example 962791234567). |
| `latitude` | number | yes |  | Latitude. Decimal degrees, for example 31.9539. |
| `longitude` | number | yes |  | Longitude. Decimal degrees, for example 35.9106. |
| `name` | string | no |  | Location Name. Title shown under the map pin, for example a venue or shop name. |
| `address` | string | no |  | Address. Street address shown under the name. Only displayed when a name is also set. |
| `reply_to_message_id` | string | no |  | Reply To Message ID. Optional WhatsApp message ID (wamid) to send this message as a reply to. |

Output fields:

- `messaging_product`: Messaging Product
- `contacts`: Contacts
- `contacts[].input`: Input Number
- `contacts[].wa_id`: WhatsApp ID
- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].message_status`: Message Status

### `send_contact`

**Send Contact.** Sends a WhatsApp contact card with a name and optional phone numbers, emails, company and website that the recipient can save to their address book. Choose this over Send Message when sharing a person or business as a savable contact. Free-form, so it only delivers inside the 24-hour customer service window. Not idempotent — each call sends a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number_id` | string | yes |  | From Phone Number. The business number the message is sent from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | To. Recipient phone number in international format, digits only (for example 962791234567). |
| `formatted_name` | string | yes |  | Full Name. Display name shown on the card. |
| `first_name` | string | no |  | First Name. |
| `last_name` | string | no |  | Last Name. |
| `phones` | array | no |  | Phone Numbers. One entry per number the recipient can call or message. Each item: { `phone`, `type`? }. |
| `emails` | array | no |  | Emails. One entry per email address. Each item: { `email`, `type`? }. |
| `company` | string | no |  | Company. |
| `job_title` | string | no |  | Job Title. |
| `website` | string | no |  | Website. |
| `reply_to_message_id` | string | no |  | Reply To Message ID. Optional WhatsApp message ID (wamid) to send this message as a reply to. |

Output fields:

- `messaging_product`: Messaging Product
- `contacts`: Contacts
- `contacts[].input`: Input Number
- `contacts[].wa_id`: WhatsApp ID
- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].message_status`: Message Status

### `send_reaction`

**Send Reaction.** Adds an emoji reaction to a specific WhatsApp message, or removes the reaction when the emoji is left empty. Choose this over Send Message to acknowledge a message without sending a new bubble. The target must be a message from the last 30 days that is not itself a reaction. Idempotent — reacting again with the same emoji leaves the same single reaction in place. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number_id` | string | yes |  | From Phone Number. The business number the message is sent from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | To. Recipient phone number in international format, digits only (for example 962791234567). |
| `message_id` | string | yes |  | Message ID. The WhatsApp message ID (wamid), for example from the New Incoming Message trigger. |
| `emoji` | string | no |  | Emoji. A single emoji such as 👍. Leave empty to remove your reaction. |

Output fields:

- `messaging_product`: Messaging Product
- `contacts`: Contacts
- `contacts[].input`: Input Number
- `contacts[].wa_id`: WhatsApp ID
- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].message_status`: Message Status

### `mark_message_as_read`

**Mark Message As Read.** Marks an incoming WhatsApp message as read so the sender sees blue ticks, and can show a typing indicator for up to 25 seconds while you prepare a reply. Use it right after the New Incoming Message trigger, before sending a response. Idempotent — marking an already-read message again is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number_id` | string | yes |  | From Phone Number. The business number the message is sent from. A value the product loads from the provider, such as an id; write the value itself. |
| `message_id` | string | yes |  | Message ID. The WhatsApp message ID (wamid), for example from the New Incoming Message trigger. |
| `show_typing_indicator` | boolean | no | `false` | Show Typing Indicator. Display "typing…" to the sender until you reply or 25 seconds pass. |

Output fields:

- `success`: Success (boolean)

### `upload_media`

**Upload Media.** Uploads a file from a previous step to WhatsApp and returns a media ID that stays valid for 30 days. Use this before Send Media when the file is not reachable at a public URL. Images max 5 MB, audio and video max 16 MB, documents max 100 MB. Not idempotent — each call stores a new copy and returns a new ID. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number_id` | string | yes |  | From Phone Number. The business number the message is sent from. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The file to upload, from a previous step or a URL. Files are not supported; an action that needs one fails. |
| `mime_type` | string | yes |  | File Type. Must match the actual file contents; WhatsApp rejects mismatches. One of `"image/jpeg"`, `"image/png"`, `"image/webp"`, `"video/mp4"`, `"video/3gpp"`, `"audio/aac"`, `"audio/amr"`, `"audio/mpeg"`, `"audio/mp4"`, `"audio/ogg"`, `"application/pdf"`, `"text/plain"`, `"application/vnd.openxmlformats-officedocument.wordprocessingml.document"`, `"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"`, `"application/vnd.openxmlformats-officedocument.presentationml.presentation"`. |

Output fields:

- `id`: Media ID

### `get_media_url`

**Get Media URL.** Resolves a WhatsApp media ID to its temporary download URL, MIME type, size and SHA-256 hash. The URL expires after five minutes and needs the access token to fetch, so prefer Download Media when you want the file itself. Idempotent — a pure read. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `media_id` | string | yes |  | Media ID. The media ID returned by Upload Media or received on an incoming media message. |

Output fields:

- `messaging_product`: Messaging Product
- `url`: Download URL (url)
- `id`: Media ID
- `mime_type`: MIME Type
- `sha256`: SHA-256
- `file_size`: File Size (filesize)

### `download_media`

**Download Media.** Downloads the file behind a WhatsApp media ID, typically one received on the New Incoming Message trigger, and returns it as a file plus its MIME type and size. Use this instead of Get Media URL when you need the content rather than a short-lived link. Idempotent — a pure read. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `media_id` | string | yes |  | Media ID. The media ID returned by Upload Media or received on an incoming media message. |

Output fields:

- `file`: File (url)
- `id`: Media ID
- `mime_type`: MIME Type
- `sha256`: SHA-256
- `file_size`: File Size (filesize)

### `delete_media`

**Delete Media.** Permanently deletes a media file previously stored on WhatsApp by its media ID, so it can no longer be sent or downloaded. Use it to clean up after Upload Media; messages already delivered are unaffected. Not idempotent — a second call for the same ID fails because the media no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `media_id` | string | yes |  | Media ID. The media ID returned by Upload Media or received on an incoming media message. |

Output fields:

- `success`: Success (boolean)

### `list_message_templates`

**List Message Templates.** Lists the message templates registered on the WhatsApp Business Account with their id, name, language, category, status and components. Use it to find a template id or check approval state before Send Template Message. Filter by status (APPROVED, PENDING, REJECTED, PAUSED, DISABLED) to narrow the result. Idempotent — a pure read. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no |  | Status. Only return templates in this review state. Leave empty for all. One of `"APPROVED"`, `"PENDING"`, `"REJECTED"`, `"PAUSED"`, `"DISABLED"`. |
| `limit` | number | no |  | Limit. Maximum number of templates to return. Defaults to 100. |

Output fields:

- `templates`: Templates
- `templates[].id`: Template ID
- `templates[].name`: Name
- `templates[].language`: Language
- `templates[].category`: Category
- `templates[].status`: Status
- `templates[].components`: Components
- `templates[].quality_score`: Quality Score
- `templates[].quality_score.score`: Score
- `templates[].quality_score.date`: Scored At
- `count`: Count (number)

### `create_message_template`

**Create Message Template.** Creates a WhatsApp message template on the business account and submits it for Meta approval; it returns the new template id and a PENDING status, and Template Status Updated fires when review completes. Names must be lowercase letters, digits and underscores, unique per language. Not idempotent — a duplicate name for the same language is rejected rather than reused. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Lowercase letters, digits and underscores only, for example order_update. |
| `language` | string | yes |  | Language. Language and locale code, for example en_US. |
| `category` | string | yes |  | Category. Meta reviews and prices the template by category. Utility for transactional updates, Marketing for promotions, Authentication for one-time passcodes. One of `"MARKETING"`, `"UTILITY"`, `"AUTHENTICATION"`. |
| `components` | JSON | yes |  | Components. Template components array as documented by Meta. Write variables as [[1]] or [[name]] instead of double curly braces, which Activepieces reserves for its own expressions; they are converted before sending. Example: [{"type":"BODY","text":"Hello [[1]]","example":{"body_text":[["Sam"]]}}]. |

Output fields:

- `id`: Template ID
- `status`: Status
- `category`: Category

### `edit_message_template`

**Edit Message Template.** Edits an existing WhatsApp message template by replacing all of its components, optionally changing its category, and resubmits it for Meta review. Only APPROVED, REJECTED or PAUSED templates can be edited, and the whole components array is replaced rather than merged, so pass every component you want to keep. Idempotent — resending the same components converges on the same template. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_template_id` | string | yes |  | Template. Only templates approved by WhatsApp are delivered. A value the product loads from the provider, such as an id; write the value itself. |
| `components` | JSON | yes |  | Components. Template components array as documented by Meta. Write variables as [[1]] or [[name]] instead of double curly braces, which Activepieces reserves for its own expressions; they are converted before sending. Example: [{"type":"BODY","text":"Hello [[1]]","example":{"body_text":[["Sam"]]}}]. |
| `category` | string | no |  | Category. Leave empty to keep the current category. One of `"MARKETING"`, `"UTILITY"`, `"AUTHENTICATION"`. |

Output fields:

- `success`: Success (boolean)
- `id`: Template ID
- `name`: Name
- `category`: Category

### `delete_message_template`

**Delete Message Template.** Deletes one WhatsApp message template, selected by id, from the business account. Deleting an approved template blocks reuse of its name for 30 days, and templates with messages still in flight move to PENDING_DELETION first. Not idempotent — a second call for the same template fails because it no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_template_id` | string | yes |  | Template. Only templates approved by WhatsApp are delivered. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)

### `list_phone_numbers`

**List Phone Numbers.** Lists every phone number on the WhatsApp Business Account with its id, verified display name, formatted number and quality rating. Use it to resolve the phone number id that every send action requires. Idempotent — a pure read. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `phone_numbers`: Phone Numbers
- `phone_numbers[].id`: Phone Number ID
- `phone_numbers[].verified_name`: Verified Name
- `phone_numbers[].display_phone_number`: Display Phone Number
- `phone_numbers[].quality_rating`: Quality Rating
- `phone_numbers[].code_verification_status`: Code Verification Status
- `phone_numbers[].platform_type`: Platform Type
- `count`: Count (number)

### `get_phone_number`

**Get Phone Number.** Returns one WhatsApp business phone number with its verified name, quality rating, messaging throughput level, verification status and name status. Use it to check the sender health before a campaign; use List Phone Numbers to enumerate them. Idempotent — a pure read. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number_id` | string | yes |  | From Phone Number. The business number the message is sent from. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Phone Number ID
- `verified_name`: Verified Name
- `display_phone_number`: Display Phone Number
- `quality_rating`: Quality Rating
- `code_verification_status`: Code Verification Status
- `platform_type`: Platform Type
- `name_status`: Name Status
- `status`: Status
- `throughput`: Throughput
- `throughput.level`: Level

### `get_business_profile`

**Get Business Profile.** Returns the WhatsApp business profile attached to a phone number: about text, address, description, email, websites, vertical and profile picture URL. Use it to read the current values before Update Business Profile. Idempotent — a pure read. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number_id` | string | yes |  | From Phone Number. The business number the message is sent from. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `messaging_product`: Messaging Product
- `about`: About
- `address`: Address
- `description`: Description
- `email`: Email (email)
- `profile_picture_url`: Profile Picture (image)
- `websites`: Websites
- `vertical`: Vertical

### `update_business_profile`

**Update Business Profile.** Updates the WhatsApp business profile of a phone number: about, address, description, email, websites and vertical. Only the fields you fill are sent, so existing values you leave empty are kept. Use Get Business Profile first to see the current values. Idempotent — resending the same values leaves the profile unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number_id` | string | yes |  | From Phone Number. The business number the message is sent from. A value the product loads from the provider, such as an id; write the value itself. |
| `about` | string | no |  | About. Short status line, max 139 characters. |
| `address` | string | no |  | Address. |
| `description` | string | no |  | Description. |
| `email` | string | no |  | Email. |
| `websites` | array | no |  | Websites. Up to two URLs. |
| `vertical` | string | no |  | Vertical. Industry shown on the business profile. One of `"OTHER"`, `"AUTO"`, `"BEAUTY"`, `"APPAREL"`, `"EDU"`, `"ENTERTAIN"`, `"EVENT_PLAN"`, `"FINANCE"`, `"GROCERY"`, `"GOVT"`, `"HOTEL"`, `"HEALTH"`, `"NONPROFIT"`, `"PROF_SERVICES"`, `"RETAIL"`, `"TRAVEL"`, `"RESTAURANT"`, `"ALCOHOL"`, `"ONLINE_GAMBLING"`, `"PHYSICAL_GAMBLING"`, `"OTC_DRUGS"`. |

Output fields:

- `success`: Success (boolean)

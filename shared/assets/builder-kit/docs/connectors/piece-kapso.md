# Kapso

Send and receive WhatsApp messages, media, templates, and more using the Kapso WhatsApp API.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-kapso'
  version: '0.2.0'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Kapso API key. You can obtain it from your [Kapso dashboard](https://app.kapso.ai).

## Actions

### `send_text_message`

**Send Text Message.** Sends a plain text WhatsApp message to a recipient phone number from a connected WhatsApp Business number. Use for free-form text replies; choose Send Template Message instead when initiating a conversation outside the 24-hour customer service window. Requires the recipient number in international format. Each call delivers a new message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `businessAccountId` | string | yes |  | Business Account ID. Your WhatsApp Business Account (WABA) ID. Find it in your [Kapso dashboard](https://app.kapso.ai). |
| `phoneNumberId` | string | yes |  | Phone Number. Select the WhatsApp phone number to send from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | Recipient Phone Number. The recipient's phone number in international format (e.g. 15551234567). |
| `body` | string | yes |  | Message. The text message to send. |
| `previewUrl` | boolean | no | `false` | Preview URL. Whether to show a link preview if the message contains a URL. |

### `send_buttons`

**Send Button Message.** Sends an interactive WhatsApp message with up to 3 reply buttons, each carrying an ID returned when the user taps it. Use when you want the recipient to pick from a small set of quick-reply options rather than typing. Button titles are capped at 20 characters. Each call delivers a new message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `businessAccountId` | string | yes |  | Business Account ID. Your WhatsApp Business Account (WABA) ID. Find it in your [Kapso dashboard](https://app.kapso.ai). |
| `phoneNumberId` | string | yes |  | Phone Number. Select the WhatsApp phone number to send from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | Recipient Phone Number. The recipient's phone number in international format (e.g. 15551234567). |
| `bodyText` | string | yes |  | Body Text. The message body displayed above the buttons. |
| `buttons` | array | yes |  | Buttons. Up to 3 buttons. Each button needs an ID and a title (max 20 characters). Each item: { `id`, `title` }. |
| `footerText` | string | no |  | Footer Text. Optional footer text displayed below the buttons. |

### `send_list_message`

**Send List Message.** Sends an interactive WhatsApp list message: a tap-to-open button reveals selectable rows grouped into sections. Use when the recipient must choose from more options than fit in reply buttons (the 3-button limit). Each row needs an id and title; rows are passed as a JSON array per section. Each call delivers a new message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `businessAccountId` | string | yes |  | Business Account ID. Your WhatsApp Business Account (WABA) ID. Find it in your [Kapso dashboard](https://app.kapso.ai). |
| `phoneNumberId` | string | yes |  | Phone Number. Select the WhatsApp phone number to send from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | Recipient Phone Number. The recipient's phone number in international format (e.g. 15551234567). |
| `bodyText` | string | yes |  | Body Text. The message body displayed above the list. |
| `buttonText` | string | yes |  | Button Text. The text on the button that opens the list (max 20 characters). |
| `sections` | array | yes |  | Sections. List sections. Each section contains a title and rows. Each item: { `title`?, `rows` }. |
| `headerText` | string | no |  | Header Text. Optional header text. |
| `footerText` | string | no |  | Footer Text. Optional footer text. |

### `send_image`

**Send Image.** Sends an image to a WhatsApp recipient, optionally with a caption. Supply the image either as a public URL or as the media ID of a previously uploaded file (use one or the other). Each call delivers a new message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `businessAccountId` | string | yes |  | Business Account ID. Your WhatsApp Business Account (WABA) ID. Find it in your [Kapso dashboard](https://app.kapso.ai). |
| `phoneNumberId` | string | yes |  | Phone Number. Select the WhatsApp phone number to send from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | Recipient Phone Number. The recipient's phone number in international format (e.g. 15551234567). |
| `imageUrl` | string | no |  | Image URL. Public URL of the image to send. |
| `imageId` | string | no |  | Image Media ID. Media ID of a previously uploaded image. Use either URL or Media ID. |
| `caption` | string | no |  | Caption. Optional caption for the image. |

### `send_video`

**Send Video.** Sends a video to a WhatsApp recipient, optionally with a caption. Supply the video either as a public URL or as the media ID of a previously uploaded file (use one or the other). Each call delivers a new message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `businessAccountId` | string | yes |  | Business Account ID. Your WhatsApp Business Account (WABA) ID. Find it in your [Kapso dashboard](https://app.kapso.ai). |
| `phoneNumberId` | string | yes |  | Phone Number. Select the WhatsApp phone number to send from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | Recipient Phone Number. The recipient's phone number in international format (e.g. 15551234567). |
| `videoUrl` | string | no |  | Video URL. Public URL of the video to send. |
| `videoId` | string | no |  | Video Media ID. Media ID of a previously uploaded video. Use either URL or Media ID. |
| `caption` | string | no |  | Caption. Optional caption for the video. |

### `send_audio`

**Send Audio.** Sends an audio file to a WhatsApp recipient. Supply the audio either as a public URL or as the media ID of a previously uploaded file (use one or the other). Each call delivers a new message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `businessAccountId` | string | yes |  | Business Account ID. Your WhatsApp Business Account (WABA) ID. Find it in your [Kapso dashboard](https://app.kapso.ai). |
| `phoneNumberId` | string | yes |  | Phone Number. Select the WhatsApp phone number to send from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | Recipient Phone Number. The recipient's phone number in international format (e.g. 15551234567). |
| `audioUrl` | string | no |  | Audio URL. Public URL of the audio file to send. |
| `audioId` | string | no |  | Audio Media ID. Media ID of a previously uploaded audio. Use either URL or Media ID. |

### `send_document`

**Send Document.** Sends a document (e.g. PDF) to a WhatsApp recipient, optionally with a display filename and caption. Supply the document either as a public URL or as the media ID of a previously uploaded file (use one or the other). Each call delivers a new message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `businessAccountId` | string | yes |  | Business Account ID. Your WhatsApp Business Account (WABA) ID. Find it in your [Kapso dashboard](https://app.kapso.ai). |
| `phoneNumberId` | string | yes |  | Phone Number. Select the WhatsApp phone number to send from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | Recipient Phone Number. The recipient's phone number in international format (e.g. 15551234567). |
| `documentUrl` | string | no |  | Document URL. Public URL of the document to send. |
| `documentId` | string | no |  | Document Media ID. Media ID of a previously uploaded document. Use either URL or Media ID. |
| `filename` | string | no |  | Filename. The filename to display for the document. |
| `caption` | string | no |  | Caption. Optional caption for the document. |

### `send_sticker`

**Send Sticker.** Sends a WebP sticker to a WhatsApp recipient. Supply the sticker either as a public URL or as the media ID of a previously uploaded file (use one or the other). Each call delivers a new message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `businessAccountId` | string | yes |  | Business Account ID. Your WhatsApp Business Account (WABA) ID. Find it in your [Kapso dashboard](https://app.kapso.ai). |
| `phoneNumberId` | string | yes |  | Phone Number. Select the WhatsApp phone number to send from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | Recipient Phone Number. The recipient's phone number in international format (e.g. 15551234567). |
| `stickerUrl` | string | no |  | Sticker URL. Public URL of the sticker (WebP format). |
| `stickerId` | string | no |  | Sticker Media ID. Media ID of a previously uploaded sticker. Use either URL or Media ID. |

### `send_location`

**Send Location.** Sends a geographic location (latitude and longitude, optionally with a name and address) to a WhatsApp recipient as a map pin. Use to share a place; to ask the recipient for their own location instead, use Request User Location. Each call delivers a new message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `businessAccountId` | string | yes |  | Business Account ID. Your WhatsApp Business Account (WABA) ID. Find it in your [Kapso dashboard](https://app.kapso.ai). |
| `phoneNumberId` | string | yes |  | Phone Number. Select the WhatsApp phone number to send from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | Recipient Phone Number. The recipient's phone number in international format (e.g. 15551234567). |
| `latitude` | number | yes |  | Latitude. Latitude of the location. |
| `longitude` | number | yes |  | Longitude. Longitude of the location. |
| `name` | string | no |  | Location Name. Name of the location. |
| `address` | string | no |  | Address. Address of the location. |

### `request_user_location`

**Request User Location.** Sends an interactive prompt asking a WhatsApp user to share their current location, with a body text explaining the request. Use to collect a location from the recipient; to share a location you already have, use Send Location instead. Each call delivers a new request message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `businessAccountId` | string | yes |  | Business Account ID. Your WhatsApp Business Account (WABA) ID. Find it in your [Kapso dashboard](https://app.kapso.ai). |
| `phoneNumberId` | string | yes |  | Phone Number. Select the WhatsApp phone number to send from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | Recipient Phone Number. The recipient's phone number in international format (e.g. 15551234567). |
| `bodyText` | string | yes |  | Body Text. The message body displayed with the location request. |

### `send_contact`

**Send Contact.** Sends a vCard-style contact card to a WhatsApp recipient. Only the contact full name is required; phone, email, and company are optional. Each call delivers a new message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `businessAccountId` | string | yes |  | Business Account ID. Your WhatsApp Business Account (WABA) ID. Find it in your [Kapso dashboard](https://app.kapso.ai). |
| `phoneNumberId` | string | yes |  | Phone Number. Select the WhatsApp phone number to send from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | Recipient Phone Number. The recipient's phone number in international format (e.g. 15551234567). |
| `formattedName` | string | yes |  | Full Name. The contact's formatted full name. |
| `firstName` | string | no |  | First Name. The contact's first name. |
| `lastName` | string | no |  | Last Name. The contact's last name. |
| `phone` | string | no |  | Phone Number. The contact's phone number. |
| `email` | string | no |  | Email. The contact's email address. |
| `company` | string | no |  | Company. The contact's company name. |

### `send_reaction`

**Send Reaction.** Adds an emoji reaction to a specific WhatsApp message identified by its message ID; passing an empty emoji removes the existing reaction. Use to acknowledge or respond to a message without sending a full reply. Requires the target message ID. Mutates the message reaction state on each call, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `businessAccountId` | string | yes |  | Business Account ID. Your WhatsApp Business Account (WABA) ID. Find it in your [Kapso dashboard](https://app.kapso.ai). |
| `phoneNumberId` | string | yes |  | Phone Number. Select the WhatsApp phone number to send from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | Recipient Phone Number. The recipient's phone number in international format (e.g. 15551234567). |
| `messageId` | string | yes |  | Message ID. The ID of the message to react to. |
| `emoji` | string | no |  | Emoji. The emoji to react with (e.g. 👍). Leave empty to remove a reaction. |

### `mark_as_read`

**Mark Message as Read.** Marks a specific incoming WhatsApp message as read (showing blue ticks to the sender), identified by its message ID. Use after processing a received message to update its read receipt. Requires the target message ID. This mutates message state via an API call, so it is treated as not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `businessAccountId` | string | yes |  | Business Account ID. Your WhatsApp Business Account (WABA) ID. Find it in your [Kapso dashboard](https://app.kapso.ai). |
| `phoneNumberId` | string | yes |  | Phone Number. Select the WhatsApp phone number to send from. A value the product loads from the provider, such as an id; write the value itself. |
| `messageId` | string | yes |  | Message ID. The ID of the message to mark as read. |

### `send_template_message`

**Send Template Message.** Sends a pre-approved WhatsApp template message, substituting values into named header, body, and button parameters. Use this to initiate conversations outside the 24-hour customer service window, where free-form text (Send Text Message) is not allowed; the template must already be approved for the business account. Supports text/image/video/document/location headers and quick-reply, URL, OTP, and flow buttons. Each call delivers a new message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `businessAccountId` | string | yes |  | Business Account ID. Your WhatsApp Business Account (WABA) ID. Find it in your [Kapso dashboard](https://app.kapso.ai). |
| `phoneNumberId` | string | yes |  | Phone Number. Select the WhatsApp phone number to send from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | Recipient Phone Number. The recipient's phone number in international format (e.g. 15551234567). |
| `template` | string | yes |  | Template. Select a message template to send. A value the product loads from the provider, such as an id; write the value itself. |
| `headerType` | string | no | `"none"` | Header Type. The type of header your template uses. Leave as None if no header. One of `"none"`, `"text"`, `"image"`, `"video"`, `"document"`, `"location"`. |
| `headerTextParameters` | array | no |  | Header Text Parameters. Text header parameters (only if header type is Text). Each item: { `parameterName`, `text` }. |
| `headerMediaUrl` | string | no |  | Header Media URL. Public URL of the media file for image, video, or document headers. |
| `headerMediaFilename` | string | no |  | Header Document Filename. Filename for document headers (e.g. invoice.pdf). |
| `headerLocationLatitude` | number | no |  | Header Location Latitude. Latitude for location headers. |
| `headerLocationLongitude` | number | no |  | Header Location Longitude. Longitude for location headers. |
| `headerLocationName` | string | no |  | Header Location Name. Name of the location (e.g. Delivery Location). |
| `headerLocationAddress` | string | no |  | Header Location Address. Address of the location. |
| `bodyParameters` | array | no |  | Body Parameters. Template body parameters. Each entry needs a parameter name and value. Each item: { `parameterName`, `text` }. |
| `buttonParameters` | array | no |  | Button Parameters. Template button parameters. Each entry maps to a button by index. Each item: { `subType`, `index`, `value`?, `flowToken`?, `flowActionData`? }. |

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

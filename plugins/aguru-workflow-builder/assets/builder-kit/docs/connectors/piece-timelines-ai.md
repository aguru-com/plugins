# TimelinesAI

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-timelines-ai'
  version: '0.2.2'
```

Categories: MARKETING, COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your TimelinesAI API key.

## Actions

### `sendMessageToExistingChat`

**Send Message to Existing Chat.** Sends a text message into an existing TimelinesAI WhatsApp chat identified by its numeric chat_id, optionally attaching an uploaded file and a label. Use to reply within a conversation you already have the chat_id for; use Send Message to New Chat instead when starting a conversation by phone or JID. Not idempotent: each call posts a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat. Select the chat to send the message to. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Message Text. The text content of the message to be sent. |
| `file` | file | no |  | File. Optional file to send with the message. Files are not supported; an action that needs one fails. |
| `label` | string | no |  | Label. Optional label to categorize or tag the message. |
| `attachment_template_id` | number | no |  | Attachment Template ID. Optional ID of the attachment template to use for the message. |

### `sendUploadedFileToExistingChat`

**Send Uploaded File to Existing Chat.** Sends an already-uploaded file, selected by its file uid, as an attachment into an existing TimelinesAI WhatsApp chat identified by its numeric chat_id. Use when the file is already uploaded (e.g. found via Find Uploaded File); use Send File to Existing Chat to upload and send raw file data in one step. Not idempotent: each call posts a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat. Select the chat to send the message to. A value the product loads from the provider, such as an id; write the value itself. |
| `file_id` | string | yes |  | Uploaded File. Select the uploaded file. A value the product loads from the provider, such as an id; write the value itself. |

### `sendFileToExistingChat`

**Send File to Existing Chat.** Uploads a file and sends it as an attachment into an existing TimelinesAI WhatsApp chat identified by its numeric chat_id. Use when you have raw file data to deliver into a known chat. Not idempotent: each call uploads the file and posts a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat. Select the chat to send the message to. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. The file to be sent in the chat. Files are not supported; an action that needs one fails. |

### `sendMessageToNewChat`

**Send Message to New Chat.** Starts a new TimelinesAI WhatsApp conversation by addressing a contact either by phone number or by WhatsApp JID (selected via Contact Type), then sending an initial text and/or file. Use to message someone you do not yet have a chat_id for; use Send Message to Existing Chat when you already have the chat_id. Not idempotent: each call sends a message and may create a new chat. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactType` | string | yes | `"phone_number"` | Contact Type. Select the type of contact identifier. One of `"phone_number"`, `"jid"`. |
| `contact` | object | yes |  | Contact. Select the contact identifier based on the chosen contact type. An object whose fields depend on other inputs; the product shows them. |
| `whatsapp_account_id` | string | no |  | WhatsApp Account. Select the WhatsApp account. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | no |  | Message. The text message to be sent in the chat. |
| `file` | file | no |  | File. The file to be sent in the chat. Files are not supported; an action that needs one fails. |
| `label` | string | no |  | Label. An optional label to categorize the chat. |
| `chat_name` | string | no |  | Chat Name. An optional name for the chat (useful for group chats). |
| `attachment_template_id` | number | no |  | Attachment Template ID. Optional ID of a predefined attachment template to use when sending files. |

### `closeChat`

**Close Chat.** Marks a TimelinesAI WhatsApp chat as closed, identified by its numeric chat_id. Use to resolve or archive a conversation once handling is done. Idempotent: closing an already-closed chat sets the same end state with no additional effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat. Select the chat to send the message to. A value the product loads from the provider, such as an id; write the value itself. |

### `findChat`

**Find Chat.** Searches TimelinesAI WhatsApp chats, optionally filtered by labels, WhatsApp account, name, group/read/closed/autoresponse flags, responsible user, and creation date range; with no filters supplied it returns all chats (paginated). Use to find a chat or its chat_id before sending or closing. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label` | array | no |  | Labels. Filter by labels assigned to the chat. |
| `whatsapp_account_id` | string | no |  | WhatsApp Account. Select the WhatsApp account. A value the product loads from the provider, such as an id; write the value itself. |
| `group` | boolean | no |  | Is Group. Filter by whether the chat is a group chat. |
| `responsible` | array | no |  | Responsible. Filter by the user responsible for the chat (email) |
| `name` | string | no |  | Chat Name. Filter by the name of the chat. |
| `read` | boolean | no |  | Is Read. Filter by whether the chat is marked as read. |
| `closed` | boolean | no |  | Is Closed. Filter by whether the chat is closed. |
| `chatgpt_autoresponse_enabled` | boolean | no |  | ChatGPT Autoresponse Enabled. Filter by whether ChatGPT autoresponse is enabled for the chat. |
| `created_after` | ISO date-time string | no |  | Created After. Filter chats created after this date. |
| `created_before` | ISO date-time string | no |  | Created Before. Filter chats created before this date. |
| `page` | number | no | `1` | Page. Page number for paginated results. |

### `findMessage`

**Find Message.** Retrieves a single TimelinesAI WhatsApp message by its message UID. Use to fetch the full content and metadata of a known message. Requires the exact message_uid. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_uid` | string | yes |  | Message UID. The unique identifier of the message to find. |

### `findUploadedFile`

**Find Uploaded File.** Lists files previously uploaded to TimelinesAI, optionally filtered by filename; with no filename it returns all uploaded files. Use to find a file and its uid before attaching it to a chat message. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filename` | string | no |  | Filename. The name of the uploaded file to search for. |

### `findMessageStatus`

**Find Message Status.** Returns the delivery status of a TimelinesAI WhatsApp message identified by its message UID. Use to check whether a previously sent message was delivered or read. Requires the exact message_uid. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_uid` | string | yes |  | Message UID. The unique identifier of the message to look up. |

### `findWhatsappAccount`

**Find WhatsApp Account.** Lists the WhatsApp accounts connected to TimelinesAI, optionally narrowed by account ID and/or phone number; with neither supplied it returns all accounts. Use to resolve a whatsapp_account_id before sending a message from a specific number. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | no |  | WhatsApp Account ID. The unique identifier of the WhatsApp account to search for. |
| `phone` | string | no |  | Phone Number. The phone number associated with the WhatsApp account to search for. |

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

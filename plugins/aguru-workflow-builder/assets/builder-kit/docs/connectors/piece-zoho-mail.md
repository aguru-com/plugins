# Zoho Mail

Zoho Mail is a powerful email service that allows you to manage your email, contacts, and calendars efficiently.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-zoho-mail'
  version: '0.2.2'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Authentication for Zoho Desk

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location` | string | yes |  | Location. The location of your Zoho Mail account. One of `"zoho.eu"`, `"zoho.com"`, `"zoho.com.au"`, `"zoho.jp"`, `"zoho.in"`, `"zohocloud.ca"`. |

## Actions

### `get_email_details`

**Get Email Details.** Fetches the full parsed body, headers, and attachments of one Zoho Mail message, identified by account ID and message ID. Use when you need the actual content of a known email rather than just listing or searching messages. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account. A value the product loads from the provider, such as an id; write the value itself. |
| `folderId` | string | yes |  | Folder. A value the product loads from the provider, such as an id; write the value itself. |
| `messageId` | string | yes |  | Message ID. The ID of the email message to retrieve. A value the product loads from the provider, such as an id; write the value itself. |

### `mark_email_as_read`

**Mark Email as Read.** Sets the read flag on one Zoho Mail message identified by account ID and message ID. Use to clear an unread indicator after processing a message. Idempotent: re-running on an already-read message leaves it read. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account. A value the product loads from the provider, such as an id; write the value itself. |
| `folderId` | string | yes |  | Folder. A value the product loads from the provider, such as an id; write the value itself. |
| `messageId` | string | yes |  | Message ID. The ID of the email message to mark as read. A value the product loads from the provider, such as an id; write the value itself. |

### `mark_email_as_unread`

**Mark Emai as Unread.** Clears the read flag on one Zoho Mail message identified by account ID and message ID, returning it to unread state. Use to re-surface a message for later attention. Idempotent: re-running on an already-unread message leaves it unread. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account. A value the product loads from the provider, such as an id; write the value itself. |
| `folderId` | string | yes |  | Folder. A value the product loads from the provider, such as an id; write the value itself. |
| `messageId` | string | yes |  | Message ID. The ID of the email message to mark as unread. A value the product loads from the provider, such as an id; write the value itself. |

### `archive_email`

**Archive Email.** Archives one Zoho Mail message identified by account ID and message ID, removing it from the active folder view. Use to clear a message out of the inbox without deleting it. Idempotent: re-archiving an already-archived message has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account. A value the product loads from the provider, such as an id; write the value itself. |
| `folderId` | string | yes |  | Folder. A value the product loads from the provider, such as an id; write the value itself. |
| `messageId` | string | yes |  | Message ID. The ID of the email message to archive. A value the product loads from the provider, such as an id; write the value itself. |

### `unarchive_email`

**Unarchive Email.** Restores one previously archived Zoho Mail message back to the active folder view, identified by account ID and message ID. Use to reverse an archive. Idempotent: re-running on a non-archived message has no further effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account. A value the product loads from the provider, such as an id; write the value itself. |
| `folderId` | string | yes |  | Folder. A value the product loads from the provider, such as an id; write the value itself. |
| `messageId` | string | yes |  | Message ID. The ID of the email message to unarchive. A value the product loads from the provider, such as an id; write the value itself. |

### `move_email`

**Move Email to Folder.** Moves one Zoho Mail message from its current folder to a destination folder, identified by account ID, message ID, source folder, and destination folder. Use to reorganize or file a message. Idempotent: once the message is in the destination folder, repeating the move has no further effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account. A value the product loads from the provider, such as an id; write the value itself. |
| `folderId` | string | yes |  | Current Folder. A value the product loads from the provider, such as an id; write the value itself. |
| `messageId` | string | yes |  | Message ID. The ID of the email message to move. A value the product loads from the provider, such as an id; write the value itself. |
| `destfolderId` | string | yes |  | Destination Folder. Select the folder to move the email to. A value the product loads from the provider, such as an id; write the value itself. |

### `send_email`

**Send Email.** Sends a new email from a Zoho Mail account to one recipient, with optional CC/BCC, read receipt, and a single file attachment; body is sent as HTML or plain text per the chosen format. Use to dispatch outbound mail. Not idempotent: each call sends a separate message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account. A value the product loads from the provider, such as an id; write the value itself. |
| `fromAddress` | string | yes |  | From Email Address. A value the product loads from the provider, such as an id; write the value itself. |
| `toAddress` | string | yes |  | To Email Address. Recipient's email address. |
| `subject` | string | yes |  | Subject. |
| `mailFormat` | string | yes | `"html"` | Mail Format. One of `"html"`, `"plaintext"`. |
| `content` | string | yes |  | Content. HTML or plain text content of the email. |
| `ccAddress` | string | no |  | CC Email Address. CC recipient's email address. |
| `bccAddress` | string | no |  | BCC Email Address. BCC recipient's email address. |
| `askReceipt` | string | no |  | Ask for Read Receipt. One of `"yes"`, `"no"`. |
| `attachment` | file | no |  | Attachment. Files are not supported; an action that needs one fails. |
| `attachmentName` | string | no |  | Attachment Name. In case you want to change the name of the attachment. |

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

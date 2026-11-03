# Gmail

Email service by Google

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-gmail'
  version: '0.18.1'
```

Categories: COMMUNICATION, BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

### `CUSTOM_AUTH`: Service Account (Advanced)

> Authenticate via service account from https://console.cloud.google.com/ > IAM & Admin > Service Accounts > Create Service Account > Keys > Add key.  <br> <br> You can optionally use domain-wide delegation (https://support.google.com/a/answer/162106?hl=en#zippy=%2Cset-up-domain-wide-delegation-for-a-client) to access Gmail without adding the service account to each mailbox. <br> <br> **Note:** A user email with domain-wide delegation is required for Gmail service account access.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `serviceAccount` | string | yes |  | Service Account JSON Key. |
| `userEmail` | string | yes |  | User Email. Email address of the user to impersonate. Required for Gmail service account access via domain-wide delegation. |

## Actions

### `send_email`

**Send Email.** Composes and sends a new email from the connected Gmail account to one or more recipients, with optional CC/BCC, attachments, and plain-text or HTML body. Use this to originate a fresh message; to answer an existing thread prefer Reply to Email instead, or pass an original Message-ID to send this message into that existing thread. Set the draft flag to save it as a draft instead of sending. Not idempotent: each call sends (or drafts) a separate message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `receiver` | array | yes |  | To. |
| `cc` | array | no |  | Cc. |
| `bcc` | array | no |  | Bcc. |
| `subject` | string | yes |  | Subject. |
| `body_type` | string | yes | `"plain_text"` | Body Type. How the text in Body is interpreted. One of `"plain_text"`, `"html"`. |
| `body` | string | yes |  | Body. |
| `reply_to` | array | no |  | Reply To. Replies go to these addresses instead of the sender. |
| `sender_name` | string | no |  | Sender Name. Name shown in the inbox instead of your address. |
| `from` | string | no |  | From. A send-as address already set up in your Gmail settings. |
| `attachments` | array | no |  | Attachments. Each item: { `file`, `name`? }. |
| `in_reply_to` | string | no |  | In Reply To. Message-ID header of the email to thread this under. |
| `draft` | boolean | no | `false` | Save as Draft. Save to Drafts instead of sending. |

Output fields:

- `data.id`: Message ID
- `data.threadId`: Thread ID
- `data.labelIds`: Labels
- `status`: Status Code
- `statusText`: Status Text

### `request_approval_in_mail`

**Request Approval in Email.** Sends an email, optionally with file attachments, carrying a single link to a confirmation page where the recipient chooses Approve or Disapprove, then pauses the flow until they respond, resuming with their decision. Use this as a human-in-the-loop gate before proceeding with a sensitive action. The flow blocks indefinitely until a response arrives. Not idempotent: each call sends a new approval email and creates a new wait. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `receiver` | string | yes |  | To. Address that receives the approval request. |
| `cc` | array | no |  | Cc. |
| `bcc` | array | no |  | Bcc. |
| `subject` | string | yes |  | Subject. |
| `body_type` | string | yes | `"plain_text"` | Body Type. How the text in Body is interpreted. One of `"plain_text"`, `"html"`. |
| `body` | string | yes |  | Body. Text shown above the Review & Respond button. |
| `reply_to` | array | no |  | Reply To. Replies go to these addresses instead of the sender. |
| `sender_name` | string | no |  | Sender Name. Name shown in the inbox instead of your address. |
| `from` | string | no |  | From. A send-as address already set up in your Gmail settings. |
| `attachments` | array | no |  | Attachments. Each item: { `file`, `name`? }. |
| `in_reply_to` | string | no |  | In Reply To. Message-ID header of the email to thread this under. |

Output fields:

- `approved`: Approved (boolean)

### `reply_to_email`

**Reply to Email.** Sends a reply to an existing email, preserving the thread and subject and addressing the original sender (reply) or all participants (reply all). Use this to respond within a known conversation; requires the Gmail message ID of the email being answered. Not idempotent: each call sends a new reply message into the thread. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message. Pick a recent message, or map its ID from a trigger or Find Email. A value the product loads from the provider, such as an id; write the value itself. |
| `reply_type` | string | yes | `"reply"` | Reply Type. Reply to the sender only, or to everyone on the thread. One of `"reply"`, `"reply_all"`. |
| `body_type` | string | yes | `"plain_text"` | Body Type. How the text in Body is interpreted. One of `"plain_text"`, `"html"`. |
| `body` | string | yes |  | Body. |
| `sender_name` | string | no |  | Sender Name. Name shown in the inbox instead of your address. |
| `attachment` | file | no |  | Attachment. File to attach. Files are not supported; an action that needs one fails. |
| `attachment_name` | string | no |  | Attachment Name. Overrides the uploaded file name. |

Output fields:

- `id`: Message ID
- `threadId`: Thread ID
- `labelIds`: Labels
- `labelIds[]`: Label

### `create_draft_reply`

**Create Draft Reply.** Builds a draft reply to an existing email and saves it (unsent) in the thread, addressing the original sender (reply) or all participants (reply all) and optionally quoting the original message. Use this when a human should review and send the response rather than sending it automatically; requires the Gmail message ID of the email being replied to. Not idempotent: each call creates a new draft. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message. Pick a recent message, or map its ID from a trigger or Find Email. A value the product loads from the provider, such as an id; write the value itself. |
| `reply_type` | string | yes | `"reply"` | Reply Type. Reply to the sender only, or to everyone on the thread. One of `"reply"`, `"reply_all"`. |
| `body_type` | string | yes | `"plain_text"` | Body Type. How the text in Body is interpreted. One of `"plain_text"`, `"html"`. |
| `body` | string | no |  | Body. |
| `include_original_message` | boolean | no | `true` | Include Original Message. Quote the original message below your reply. |
| `sender_name` | string | no |  | Sender Name. Name shown in the inbox instead of your address. |
| `attachment` | file | no |  | Attachment. File to attach. Files are not supported; an action that needs one fails. |
| `attachment_name` | string | no |  | Attachment Name. Overrides the uploaded file name. |

Output fields:

- `id`: Draft ID
- `draftDetails.subject`: Subject
- `draftDetails.replyType`: Reply Type
- `draftDetails.includeOriginal`: Include Original (boolean)
- `draftDetails.recipients.to`: To
- `draftDetails.recipients.cc`: Cc
- `message`: Draft Message
- `message.id`: Message ID
- `message.threadId`: Thread ID
- `message.labelIds`: Label IDs
- `originalMessage`: Original Message
- `originalMessage.subject`: Subject
- `originalMessage.from`: From (email)
- `originalMessage.to`: To (email)
- `originalMessage.date`: Date (datetime)
- `originalMessage.id`: Message ID
- `originalMessage.threadId`: Thread ID

### `gmail_get_mail`

**Get Email.** Fetches a single email by its Gmail message ID and returns its parsed contents, including headers, body, and decoded attachments. Use this to read the full details of a specific known message, typically after a trigger or search yields its ID. Idempotent: a read-only lookup that does not modify the mailbox. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message. Pick a recent message, or map its ID from a trigger or Find Email. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `subject`: Subject
- `from.text`: From
- `to.text`: To
- `date`: Date (datetime)
- `text`: Text Body
- `html`: HTML Body (html)
- `id`: Email ID
- `messageId`: Message ID
- `from.value`: From Addresses
- `from.value[].address`: Address (email)
- `from.value[].name`: Name
- `to.value`: To Addresses
- `to.value[].address`: Address (email)
- `to.value[].name`: Name
- `attachments`: Attachments
- `attachments[].filename`: Filename
- `attachments[].contentType`: Content Type
- `attachments[].size`: Size (filesize)

### `gmail_search_mail`

**Find Email.** Searches the mailbox for emails matching combinable filters (sender, recipient, subject, body text, label, category, date range, attachment presence/name) and returns the matched messages with parsed contents. Use this to locate messages or discover their IDs before reading or replying; with no filters it returns the most recent emails. Bound results with Max Results (1-500, default 10). Idempotent: a read-only search that does not modify the mailbox. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | no | `""` | From. Only emails sent from this address. |
| `to` | string | no | `""` | To. Only emails sent to this address. |
| `subject` | string | no | `""` | Subject. Only emails whose subject contains this text. |
| `content` | string | no |  | Body. Only emails with this text in the body. |
| `has_attachment` | boolean | no | `false` | Has Attachment. Only emails with at least one attachment. |
| `attachment_name` | string | no |  | Attachment Name. Only emails with an attachment of this file name. |
| `label` | string | no | `""` | Label. Only emails carrying this label. A value the product loads from the provider, such as an id; write the value itself. |
| `category` | string | no |  | Category. Only emails in this inbox tab, such as Primary or Promotions. One of `"primary"`, `"social"`, `"promotions"`, `"updates"`, `"forums"`, `"reservations"`, `"purchases"`. |
| `after_date` | ISO date-time string | no |  | After. Only emails received after this date. |
| `before_date` | ISO date-time string | no |  | Before. Only emails received before this date. |
| `include_spam_trash` | boolean | no | `false` | Spam and Trash. Also search the Spam and Trash folders. |
| `max_results` | number | no | `10` | Max Results. Newest first, up to 500. |

Output fields:

- `found`: Found (boolean)
- `results.count`: Count (number)
- `results.messages`: Messages
- `results.messages[].subject`: Subject
- `results.messages[].from.value[0].name`: From Name
- `results.messages[].from.value[0].address`: From Address (email)
- `results.messages[].to.value[0].address`: To Address (email)
- `results.messages[].date`: Date (datetime)
- `results.messages[].text`: Text Body
- `results.messages[].id`: Message ID
- `results.messages[].messageId`: RFC Message-ID
- `results.messages[].replyTo.value[0].address`: Reply-To Address (email)
- `results.messages[].attachments`: Attachments
- `results.messages[].attachments[].fileName`: File Name
- `results.messages[].attachments[].mimeType`: MIME Type
- `results.messages[].attachments[].size`: Size (filesize)
- `results.messages[].attachments[].data`: Download URL (url)

### `gmail_send_email`

**Send Email.** Composes and sends a new email from the connected Gmail account to one or more recipients, with optional CC/BCC, attachments, and a plain-text or HTML body. Use this to originate a fresh message; to answer an existing conversation prefer Reply to Thread, and to save an unsent message use Create Draft. Not idempotent: each call sends a separate message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `receiver` | array | yes |  | To. |
| `cc` | array | no |  | Cc. |
| `bcc` | array | no |  | Bcc. |
| `subject` | string | yes |  | Subject. |
| `body_type` | string | yes | `"plain_text"` | Body Type. How the text in Body is interpreted. One of `"plain_text"`, `"html"`. |
| `body` | string | yes |  | Body. |
| `reply_to` | array | no |  | Reply To. Replies go to these addresses instead of the sender. |
| `sender_name` | string | no |  | Sender Name. Name shown in the inbox instead of your address. |
| `from` | string | no |  | From. A send-as address already set up in your Gmail settings. |
| `attachments` | array | no |  | Attachments. Each item: { `file`, `name`? }. |
| `in_reply_to` | string | no |  | In Reply To. Message-ID header of the email to thread this under. |
| `draft` | boolean | no | `false` | Save as Draft. Save to Drafts instead of sending. |

Output fields:

- `data`: Message
- `data.id`: Message ID
- `data.threadId`: Thread ID
- `data.labelIds`: Labels
- `status`: Status Code (number)
- `statusText`: Status Text

### `gmail_reply_to_thread`

**Reply to Thread.** Sends a reply to an existing email, preserving the thread and subject and addressing the original sender (reply) or all participants (reply all). Use this to respond within a known conversation; requires the Gmail message ID of the email being answered (obtain it from Search Email or Get Thread). Not idempotent: each call sends a new reply into the thread. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message. Pick a recent message, or map its ID from a trigger or Find Email. A value the product loads from the provider, such as an id; write the value itself. |
| `reply_type` | string | yes | `"reply"` | Reply Type. Reply to the sender only, or to everyone on the thread. One of `"reply"`, `"reply_all"`. |
| `body_type` | string | yes | `"plain_text"` | Body Type. How the text in Body is interpreted. One of `"plain_text"`, `"html"`. |
| `body` | string | yes |  | Body. |
| `sender_name` | string | no |  | Sender Name. Name shown in the inbox instead of your address. |
| `attachment` | file | no |  | Attachment. File to attach. Files are not supported; an action that needs one fails. |
| `attachment_name` | string | no |  | Attachment Name. Overrides the uploaded file name. |

Output fields:

- `id`: Message ID
- `threadId`: Thread ID
- `labelIds`: Labels

### `gmail_get_message`

**Get Message.** Fetches a single email by its Gmail message ID and returns its parsed contents, including headers, body, and decoded attachments (each attachment is returned with its downloaded content directly, so a separate Get Attachment call is normally unnecessary). Use this to read the full details of a specific known message; obtain the message ID from Search Email. Idempotent: a read-only lookup that does not modify the mailbox. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message. Message ID from a Find Email step or a Gmail trigger. |

Output fields:

- `id`: Message ID
- `subject`: Subject
- `from`: From
- `from.text`: Text
- `from.value`: Addresses
- `from.value[].address`: Email (email)
- `from.value[].name`: Name
- `to`: To
- `to.text`: Text
- `to.value`: Addresses
- `to.value[].address`: Email (email)
- `to.value[].name`: Name
- `cc`: Cc
- `cc.text`: Text
- `cc.value`: Addresses
- `cc.value[].address`: Email (email)
- `cc.value[].name`: Name
- `date`: Date (datetime)
- `messageId`: RFC Message-ID
- `text`: Text Body
- `html`: HTML Body (html)
- `attachments`: Attachments
- `attachments[].fileName`: File Name
- `attachments[].mimeType`: MIME Type
- `attachments[].size`: Size (filesize)
- `attachments[].data`: Download URL (url)

### `gmail_search_email`

**Search Email.** Searches the mailbox for emails matching combinable filters (sender, recipient, subject, body text, label, category, date range, attachment presence/name) and returns the matched messages with parsed contents and their message IDs. Use this as the primary resolver to locate messages or discover their message IDs before reading or replying to them; with no filters it returns the most recent emails. Bound results with Max Results (1-500, default 10). Idempotent: a read-only search that does not modify the mailbox. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | no | `""` | From. Only emails sent from this address. |
| `to` | string | no | `""` | To. Only emails sent to this address. |
| `subject` | string | no | `""` | Subject. Only emails whose subject contains this text. |
| `content` | string | no |  | Body. Only emails with this text in the body. |
| `has_attachment` | boolean | no | `false` | Has Attachment. Only emails with at least one attachment. |
| `attachment_name` | string | no |  | Attachment Name. Only emails with an attachment of this file name. |
| `label` | string | no | `""` | Label. Only emails carrying this label. A value the product loads from the provider, such as an id; write the value itself. |
| `category` | string | no |  | Category. Only emails in this inbox tab, such as Primary or Promotions. One of `"primary"`, `"social"`, `"promotions"`, `"updates"`, `"forums"`, `"reservations"`, `"purchases"`. |
| `after_date` | ISO date-time string | no |  | After. Only emails received after this date. |
| `before_date` | ISO date-time string | no |  | Before. Only emails received before this date. |
| `include_spam_trash` | boolean | no | `false` | Spam and Trash. Also search the Spam and Trash folders. |
| `max_results` | number | no | `10` | Max Results. Newest first, up to 500. |

Output fields:

- `found`: Found (boolean)
- `results`: Results
- `results.count`: Count (number)
- `results.messages`: Messages
- `results.messages[].id`: Message ID
- `results.messages[].subject`: Subject
- `results.messages[].from`: From
- `results.messages[].from.text`: Text
- `results.messages[].from.value`: Addresses
- `results.messages[].from.value[].address`: Email (email)
- `results.messages[].from.value[].name`: Name
- `results.messages[].to`: To
- `results.messages[].to.text`: Text
- `results.messages[].to.value`: Addresses
- `results.messages[].to.value[].address`: Email (email)
- `results.messages[].to.value[].name`: Name
- `results.messages[].cc`: Cc
- `results.messages[].cc.text`: Text
- `results.messages[].cc.value`: Addresses
- `results.messages[].cc.value[].address`: Email (email)
- `results.messages[].cc.value[].name`: Name
- `results.messages[].date`: Date (datetime)
- `results.messages[].messageId`: RFC Message-ID
- `results.messages[].text`: Text Body
- `results.messages[].html`: HTML Body (html)
- `results.messages[].attachments`: Attachments
- `results.messages[].attachments[].fileName`: File Name
- `results.messages[].attachments[].mimeType`: MIME Type
- `results.messages[].attachments[].size`: Size (filesize)
- `results.messages[].attachments[].data`: Download URL (url)

### `gmail_get_thread`

**Get Thread.** Fetches an entire email conversation by its Gmail thread ID, returning every message in the thread. Use this to read a full conversation or to discover the message IDs within a thread before replying; obtain the thread ID from Search Email or List Threads. Idempotent: a read-only lookup that does not modify the mailbox. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `thread_id` | string | yes |  | Thread ID. The thread Id of the mail to read. |
| `format` | string | no | `"full"` | Format. Format of the mail. One of `"minimal"`, `"full"`, `"raw"`, `"metadata"`. |

Output fields:

- `id`: Thread ID
- `snippet`: Snippet
- `historyId`: History ID
- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].threadId`: Thread ID
- `messages[].labelIds`: Labels
- `messages[].snippet`: Snippet
- `messages[].internalDate`: Internal Date (datetime)
- `messages[].sizeEstimate`: Size Estimate (filesize)

### `gmail_create_draft`

**Create Draft.** Creates an unsent draft email with the given recipients, subject, body, and optional attachments, optionally placing it inside an existing thread. Use this when a message should be saved for later review or sending rather than sent immediately; send it afterwards with Send Draft. To attach the draft to a conversation, pass a thread ID from Search Email or Get Thread. Not idempotent: each call creates a separate draft. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `receiver` | array | no |  | Receiver Email (To). |
| `cc` | array | no |  | CC Email. |
| `bcc` | array | no |  | BCC Email. |
| `subject` | string | yes |  | Subject. |
| `body_type` | string | yes | `"plain_text"` | Body Type. One of `"plain_text"`, `"html"`. |
| `body` | string | yes |  | Body. Body for the draft email. |
| `sender_name` | string | no |  | Sender Name. |
| `from` | string | no |  | Sender Email. The address must be listed in your Gmail account's settings. |
| `thread_id` | string | no |  | Thread ID. Optional thread ID to attach this draft to an existing conversation (obtain from Search Email or Get Thread). |
| `attachments` | array | no |  | Attachments. Each item: { `file`, `name`? }. |

Output fields:

- `id`: Draft ID
- `message`: Message
- `message.id`: Message ID
- `message.threadId`: Thread ID
- `message.labelIds`: Labels

### `gmail_update_draft`

**Update Draft.** Updates an existing draft (subject, body, recipients, attachments) by its draft ID. Subject and body are required and replace the previous values; omitted recipients (To/CC/BCC), attachments, and the thread association are preserved from the existing draft rather than cleared. Obtain the draft ID from List Drafts. Not idempotent in effect: each call rewrites the draft with the supplied content. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draft_id` | string | yes |  | Draft ID. The ID of the draft to update (obtain from List Drafts). |
| `receiver` | array | no |  | Receiver Email (To). |
| `cc` | array | no |  | CC Email. |
| `bcc` | array | no |  | BCC Email. |
| `subject` | string | yes |  | Subject. |
| `body_type` | string | yes | `"plain_text"` | Body Type. One of `"plain_text"`, `"html"`. |
| `body` | string | yes |  | Body. New body for the draft email. |
| `sender_name` | string | no |  | Sender Name. |
| `from` | string | no |  | Sender Email. The address must be listed in your Gmail account's settings. |
| `thread_id` | string | no |  | Thread ID. Optional thread ID to keep this draft attached to a conversation (obtain from Search Email or Get Thread). |
| `attachments` | array | no |  | Attachments. Each item: { `file`, `name`? }. |

Output fields:

- `id`: Draft ID
- `message`: Message
- `message.id`: Message ID
- `message.threadId`: Thread ID
- `message.labelIds`: Labels

### `gmail_send_draft`

**Send Draft.** Sends an existing draft email identified by its draft ID, delivering it to its recipients. Use this after creating or editing a draft with Create Draft / Update Draft; obtain the draft ID from List Drafts. Not idempotent: each call sends the draft as a message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draft_id` | string | yes |  | Draft ID. The ID of the draft to send (obtain from List Drafts). |

Output fields:

- `id`: Message ID
- `threadId`: Thread ID
- `labelIds`: Labels

### `gmail_get_draft`

**Get Draft.** Fetches a single draft email by its draft ID, returning the draft and its underlying message. Use this to inspect a draft before sending or updating it; obtain the draft ID from List Drafts. Idempotent: a read-only lookup that does not modify the mailbox. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draft_id` | string | yes |  | Draft ID. The ID of the draft to read (obtain from List Drafts). |

Output fields:

- `id`: Draft ID
- `message`: Message
- `message.id`: Message ID
- `message.threadId`: Thread ID
- `message.labelIds`: Labels
- `message.snippet`: Snippet
- `message.internalDate`: Internal Date (datetime)
- `message.sizeEstimate`: Size Estimate (filesize)

### `gmail_list_drafts`

**List Drafts.** Lists draft emails in the connected mailbox, returning each draft ID and its associated message. This is the resolver for obtaining draft IDs used by Get Draft, Update Draft, Send Draft, and Delete Draft. Optionally narrow with a Gmail search query and bound with Max Results. Idempotent: a read-only listing that does not modify the mailbox. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Optional Gmail search query to filter drafts (e.g. "subject:invoice"). |
| `max_results` | number | no | `20` | Max Results. Maximum number of drafts to return (1-500). |

Output fields:

- `drafts`: Drafts
- `drafts[].id`: Draft ID
- `drafts[].message`: Message
- `drafts[].message.id`: Message ID
- `drafts[].message.threadId`: Thread ID
- `count`: Count (number)
- `resultSizeEstimate`: Result Size Estimate (number)
- `nextPageToken`: Next Page Token

### `gmail_delete_draft`

**Delete Draft.** Permanently removes a draft email by its draft ID. This only deletes the unsent draft (not a sent message) but the draft itself is not recoverable. Obtain the draft ID from List Drafts. Idempotent: if no draft matches the ID (already removed, or an invalid ID) it returns deleted:false instead of failing — check that flag rather than assuming a delete happened. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `draft_id` | string | yes |  | Draft ID. The ID of the draft to delete (obtain from List Drafts). |

### `gmail_list_threads`

**List Threads.** Lists email conversation threads matching an optional Gmail search query and label filter, returning each thread ID and snippet. This is the resolver for obtaining thread IDs used by Get Thread and Reply to Thread. Resolve label IDs with List Labels. Idempotent: a read-only listing that does not modify the mailbox. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Search Query. Optional Gmail search query to filter threads (e.g. "from:boss@example.com is:unread"). |
| `label_ids` | array | no |  | Label IDs. Optional list of label IDs to filter by (resolve via List Labels; system labels like INBOX, UNREAD are valid). |
| `include_spam_trash` | boolean | no | `false` | Include Spam & Trash. Include threads from Spam and Trash in the results. |
| `max_results` | number | no | `20` | Max Results. Maximum number of threads to return (1-500). |

Output fields:

- `threads`: Threads
- `threads[].id`: Thread ID
- `threads[].snippet`: Snippet
- `threads[].historyId`: History ID
- `count`: Count (number)
- `resultSizeEstimate`: Result Size Estimate (number)
- `nextPageToken`: Next Page Token

### `gmail_get_attachment`

**Get Attachment.** Fetches one email attachment's raw bytes by message ID + attachment ID, returning a stored file plus size. Note: Get Message already returns each attachment's downloaded content directly, so prefer that; use this only when you separately hold a raw Gmail attachment ID (from the message payload parts) and need the bytes on their own. Get the message ID from Search Email. Idempotent: a read-only fetch that does not modify the mailbox. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message ID. The Gmail message ID the attachment belongs to (obtain from Search Email or Get Message). |
| `attachment_id` | string | yes |  | Attachment ID. The raw Gmail attachment ID, taken from the message payload parts (parts[].body.attachmentId of a full-format message). Note: Get Message returns attachment content directly, so this field is only needed for the raw-ID fetch path. |
| `file_name` | string | no |  | File Name. Optional name to give the downloaded file. |

Output fields:

- `fileName`: File Name
- `size`: Size (filesize)
- `data`: File (url)

### `gmail_forward_message`

**Forward Message.** Forwards an existing email to one or more new recipients, quoting the original sender, subject, and body beneath an optional added note. Requires the Gmail message ID of the email to forward (obtain from Search Email or Get Message). Performs two calls: it fetches the original message, then sends the forwarded copy. Not idempotent: each call sends a new forwarded message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message ID. The Gmail message ID to forward (obtain from Search Email or Get Message). |
| `receiver` | array | yes |  | Receiver Email (To). One or more recipients to forward the email to. |
| `cc` | array | no |  | CC Email. |
| `bcc` | array | no |  | BCC Email. |
| `note` | string | no |  | Note. Optional message to add above the forwarded content. |
| `sender_name` | string | no |  | Sender Name. |

Output fields:

- `id`: Message ID
- `threadId`: Thread ID
- `labelIds`: Labels

### `gmail_list_labels`

**List Labels.** Lists every label in the mailbox (both system labels like INBOX/UNREAD/STARRED and user-created labels) with their IDs, names, and types. This is the primary resolver for label IDs — look up a label ID by name here before passing it to Get Label or any label-aware action. Idempotent: a read-only listing that does not modify the mailbox. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `labels`: Labels
- `labels[].id`: Label ID
- `labels[].name`: Name
- `labels[].type`: Type
- `labels[].messageListVisibility`: Message List Visibility
- `labels[].labelListVisibility`: Label List Visibility
- `labels[].color`: Color
- `labels[].color.textColor`: Text Color
- `labels[].color.backgroundColor`: Background Color
- `count`: Count (number)

### `gmail_get_label`

**Get Label.** Fetches a single label by its label ID, returning its name, type, visibility, color, and message/thread counts. Use this to inspect a label or read how many messages carry it; obtain the label ID from List Labels. Idempotent: a read-only lookup that does not modify the mailbox. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label_id` | string | yes |  | Label ID. The ID of the label to read (obtain from List Labels). |

Output fields:

- `id`: Label ID
- `name`: Name
- `type`: Type
- `messageListVisibility`: Message List Visibility
- `labelListVisibility`: Label List Visibility
- `color`: Color
- `color.textColor`: Text Color
- `color.backgroundColor`: Background Color
- `messagesTotal`: Messages Total (number)
- `messagesUnread`: Messages Unread (number)
- `threadsTotal`: Threads Total (number)
- `threadsUnread`: Threads Unread (number)

### `gmail_get_profile`

**Get Profile.** Returns the connected mailbox profile: the account email address, total message and thread counts, and the current history ID. Use this to confirm which account is connected or to obtain the starting history ID for List History. Idempotent: a read-only lookup that does not modify the mailbox. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `emailAddress`: Email Address (email)
- `messagesTotal`: Messages Total (number)
- `threadsTotal`: Threads Total (number)
- `historyId`: History ID

### `gmail_list_history`

**List History.** Returns the incremental change log (messages added, deleted, or relabeled) since a given starting history ID. Use this to detect what changed in the mailbox since a previous checkpoint; obtain the starting history ID from Get Profile (or a prior run). Idempotent: a read-only listing that does not modify the mailbox. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `start_history_id` | string | yes |  | Start History ID. Return changes after this history ID (obtain from Get Profile or a previous history result). |
| `history_types` | array | no |  | History Types. Limit results to these change types (leave empty for all). One of `"messageAdded"`, `"messageDeleted"`, `"labelAdded"`, `"labelRemoved"`. |
| `max_results` | number | no | `100` | Max Results. Maximum number of history records to return (1-500). |

Output fields:

- `historyId`: History ID
- `nextPageToken`: Next Page Token
- `history`: History Records
- `history[].id`: History ID
- `history[].messages`: Messages
- `history[].messages[].id`: Message ID
- `history[].messages[].threadId`: Thread ID
- `history[].messagesAdded`: Messages Added
- `history[].messagesAdded[].message`: Message
- `history[].messagesAdded[].message.id`: Message ID
- `history[].messagesAdded[].message.threadId`: Thread ID
- `history[].messagesAdded[].message.labelIds`: Labels
- `history[].messagesDeleted`: Messages Deleted
- `history[].messagesDeleted[].message`: Message
- `history[].messagesDeleted[].message.id`: Message ID
- `history[].messagesDeleted[].message.threadId`: Thread ID
- `history[].messagesDeleted[].message.labelIds`: Labels
- `history[].labelsAdded`: Labels Added
- `history[].labelsAdded[].message`: Message
- `history[].labelsAdded[].message.id`: Message ID
- `history[].labelsAdded[].message.threadId`: Thread ID
- `history[].labelsAdded[].message.labelIds`: Labels
- `history[].labelsAdded[].labelIds`: Added Label IDs
- `history[].labelsRemoved`: Labels Removed
- `history[].labelsRemoved[].message`: Message
- `history[].labelsRemoved[].message.id`: Message ID
- `history[].labelsRemoved[].message.threadId`: Thread ID
- `history[].labelsRemoved[].message.labelIds`: Labels
- `history[].labelsRemoved[].labelIds`: Removed Label IDs

### `gmail_stop_watch`

**Stop Watch.** Stops any active push (Cloud Pub/Sub) notifications for the connected mailbox. Use this to cancel a previously started watch. Takes no parameters. Idempotent: stopping when no watch is active is a no-op. Needs authentication.

Kind: destructive, safe to repeat.

No inputs.

### `gmail_create_label`

**Create Label.** Create a new label in the mailbox. Needs authentication.

Kind: write.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Label Name. Appears in your Gmail label list. |

Output fields:

- `id`: Label ID
- `name`: Name
- `type`: Type
- `messageListVisibility`: Message List Visibility
- `labelListVisibility`: Label List Visibility
- `color`: Color
- `color.textColor`: Text Color
- `color.backgroundColor`: Background Color

### `gmail_add_label_to_email`

**Add Label to Email.** Apply a label to an email message. Needs authentication.

Kind: write.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message. Pick a recent message, or map its ID from a trigger or Find Email. A value the product loads from the provider, such as an id; write the value itself. |
| `label` | string | yes | `""` | Label. Label to add. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Message ID
- `threadId`: Thread ID
- `labelIds`: Labels
- `snippet`: Snippet
- `internalDate`: Internal Date (datetime)
- `sizeEstimate`: Size Estimate (filesize)

### `gmail_remove_label_from_email`

**Remove Label From Email.** Remove a label from an email message. Needs authentication.

Kind: write.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message. Pick a recent message, or map its ID from a trigger or Find Email. A value the product loads from the provider, such as an id; write the value itself. |
| `label` | string | yes | `""` | Label. Label to remove. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Message ID
- `threadId`: Thread ID
- `labelIds`: Labels
- `snippet`: Snippet
- `internalDate`: Internal Date (datetime)
- `sizeEstimate`: Size Estimate (filesize)

### `gmail_archive_email`

**Archive Email.** Archive an email message by removing it from the inbox. Needs authentication.

Kind: write.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message. Pick a recent message, or map its ID from a trigger or Find Email. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Message ID
- `threadId`: Thread ID
- `labelIds`: Labels
- `snippet`: Snippet
- `internalDate`: Internal Date (datetime)
- `sizeEstimate`: Size Estimate (filesize)

### `gmail_archive_message`

**Archive Message.** Archives a single email message by message ID, removing the INBOX label so it no longer appears in the inbox while remaining searchable and in its thread. Does not delete the message or move it to Trash — use Trash Message for that. Obtain the message ID from Search Email or Get Message. Idempotent: true — archiving an already-archived message has no additional effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message. Message ID from a Find Email step or a Gmail trigger. |

Output fields:

- `id`: Message ID
- `threadId`: Thread ID
- `labelIds`: Labels
- `snippet`: Snippet
- `internalDate`: Internal Date (datetime)
- `sizeEstimate`: Size Estimate (filesize)

### `gmail_get_or_create_label`

**Get or Create Label.** Looks up a label by exact name and returns it; if no label with that name exists yet, creates it first. Use this instead of List Labels + Create Label when the label may or may not already exist, e.g. before applying it via Modify Labels. Idempotent: true — the wrapper checks first, so calling it repeatedly with the same name returns the same label (created:false on every call after the first) instead of erroring on a duplicate. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Label Name. The exact display name of the label, e.g. "Follow Up". Matching is case-sensitive. |

Output fields:

- `id`: Label ID
- `name`: Name
- `type`: Type
- `messageListVisibility`: Message List Visibility
- `labelListVisibility`: Label List Visibility
- `color`: Color
- `color.textColor`: Text Color
- `color.backgroundColor`: Background Color
- `created`: Created (boolean)

### `gmail_modify_labels`

**Modify Labels.** Adds and/or removes label IDs across up to 1000 message IDs at once — the batch way to label, unlabel, mark read/unread (the UNREAD label), or archive (the INBOX label) many messages together. Resolve label IDs with List Labels or Get or Create Label, and message IDs with Search Email. At least one of Add Label IDs or Remove Label IDs must be set. Idempotent: true — re-applying the same add/remove sets converges on the same label state and has no additional effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_ids` | array | yes |  | Message IDs. The Gmail message IDs to modify (obtain from Search Email or Get Message). Up to 1000 per call. |
| `add_label_ids` | array | no |  | Label IDs to Add. Label IDs to add to every message listed above (obtain from List Labels or Get or Create Label). |
| `remove_label_ids` | array | no |  | Label IDs to Remove. Label IDs to remove from every message listed above (obtain from List Labels). |

Output fields:

- `success`: Success (boolean)
- `messageCount`: Message Count (number)
- `messageIds`: Message IDs
- `addedLabelIds`: Added Label IDs
- `removedLabelIds`: Removed Label IDs

### `gmail_trash_message`

**Trash Message.** Moves a single email message to Trash by message ID. This is recoverable (via Untrash Message or from the Trash folder for 30 days) and is not a permanent delete. Obtain the message ID from Search Email or Get Message. Idempotent: true — trashing an already-trashed message has no additional effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message ID. The Gmail message ID to move to Trash (obtain from Search Email or Get Message). |

Output fields:

- `id`: Message ID
- `threadId`: Thread ID
- `labelIds`: Labels
- `snippet`: Snippet
- `internalDate`: Internal Date (datetime)
- `sizeEstimate`: Size Estimate (filesize)

### `gmail_untrash_message`

**Untrash Message.** Removes the TRASH label from a single email message, taking it out of Trash. This does not re-add the INBOX label — the message lands back in All Mail, not necessarily the inbox; use Modify Labels to add INBOX back if it needs to reappear there. Use this to undo Trash Message. Obtain the message ID from Search Email or Get Message. Idempotent: true — untrashing a message that is not in Trash has no additional effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message ID. The Gmail message ID to restore from Trash (obtain from Search Email or Get Message). |

Output fields:

- `id`: Message ID
- `threadId`: Thread ID
- `labelIds`: Labels
- `snippet`: Snippet
- `internalDate`: Internal Date (datetime)
- `sizeEstimate`: Size Estimate (filesize)

### `gmail_update_label`

**Update Label.** Updates a user label (rename, change list visibility, or recolor). Only system labels like INBOX or UNREAD cannot be updated. Any field left unset here is left unchanged on the label. Obtain the label ID from List Labels or Get or Create Label. Idempotent: true — re-applying the same field values converges on the same label state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label_id` | string | yes |  | Label ID. The ID of the user label to update (obtain from List Labels). |
| `name` | string | no |  | New Name. Leave empty to keep the current name. |
| `label_list_visibility` | string | no |  | Label List Visibility. Leave unselected to keep the current setting. One of `"labelShow"`, `"labelShowIfUnread"`, `"labelHide"`. |
| `message_list_visibility` | string | no |  | Message List Visibility. Leave unselected to keep the current setting. One of `"show"`, `"hide"`. |
| `background_color` | string | no |  | Background Color (hex). Leave empty to keep the current background color. |
| `text_color` | string | no |  | Text Color (hex). Leave empty to keep the current text color. |

Output fields:

- `id`: Label ID
- `name`: Name
- `type`: Type
- `messageListVisibility`: Message List Visibility
- `labelListVisibility`: Label List Visibility
- `color`: Color
- `color.textColor`: Text Color
- `color.backgroundColor`: Background Color

### `gmail_modify_thread_labels`

**Modify Thread Labels.** Adds and/or removes label IDs across every message in a single thread — the way to label, unlabel, mark read/unread (the UNREAD label), or archive (the INBOX label) an entire conversation at once by thread ID rather than one message at a time. Use Modify Labels instead when you only have individual message IDs, not a thread ID. Resolve label IDs with List Labels or Get or Create Label, and the thread ID with Search Email or Get Thread. At least one of Add Label IDs or Remove Label IDs must be set. Idempotent: true — re-applying the same add/remove sets converges on the same label state and has no additional effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `thread_id` | string | yes |  | Thread ID. The Gmail thread ID to modify (obtain from Search Email or Get Thread). |
| `add_label_ids` | array | no |  | Label IDs to Add. Label IDs to add to every message in the thread (obtain from List Labels or Get or Create Label). |
| `remove_label_ids` | array | no |  | Label IDs to Remove. Label IDs to remove from every message in the thread (obtain from List Labels). |

Output fields:

- `id`: Thread ID
- `snippet`: Snippet
- `historyId`: History ID
- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].threadId`: Thread ID
- `messages[].labelIds`: Labels
- `messages[].snippet`: Snippet
- `messages[].internalDate`: Internal Date (datetime)
- `messages[].sizeEstimate`: Size Estimate (filesize)

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

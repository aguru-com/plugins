# Microsoft Outlook

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-microsoft-outlook'
  version: '0.7.3'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> This connection supports two access modes. Pick the matching **Grant Type** and **Access Mode** below.
>
> **Delegated (Authorization Code)** — acts as the signed-in user. Keep **Access Mode** on the Delegated option, leave **Mailbox** blank, and keep **Tenant ID** as `common`. If you use your own Azure app, follow the [Azure app creation guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application), set the **Redirect URI** to {{redirectUrl}} and add these **Microsoft Graph (Delegated) permissions**:
> - User.Read
> - Mail.ReadWrite
> - Mail.Send
> - Calendars.Read
> - offline_access
>
> **App-only (Client Credentials)** — acts as the application, with no signed-in user. Choose the **Server-to-Server (Client Credentials)** authentication method when creating the connection. Then set **Access Mode** to the App-only option for your cloud, set **Tenant ID** to your Directory (tenant) ID, and set **Mailbox** to the target user's email/UPN or object ID. You must register your own Azure app (the shared app cannot grant app-only access to your tenant). Add these **Microsoft Graph (Application) permissions** and **grant admin consent**:
> - Mail.ReadWrite
> - Mail.Send
>
> For app-only, Microsoft grants tenant-wide mailbox access by default — scope it to specific mailboxes with an [ApplicationAccessPolicy](https://learn.microsoft.com/en-us/graph/auth-limit-mailbox-access).

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cloud` | string | yes | `"login.microsoftonline.com"` | Cloud Environment. Select your Microsoft cloud environment. One of `"login.microsoftonline.com"`, `"login.microsoftonline.us"`. |
| `accessMode` | string | yes | `"Mail.ReadWrite Mail.Send Calendars.Read offline_access User.Read openid email profile"` | Access Mode. Pick the option matching your Grant Type. Use a Delegated option with the Authorization Code grant (acts as the signed-in user). Use an App-only option with the Client Credentials grant (acts as the application — also set Tenant ID and Mailbox), choosing the one that matches your Cloud Environment. One of `"Mail.ReadWrite Mail.Send Calendars.Read offline_access User.Read openid email profile"`, `"https://graph.microsoft.com/.default"`, `"https://graph.microsoft.us/.default"`. |
| `tenant` | string | yes | `"common"` | Tenant ID. Use "common" for the default delegated multi-tenant flow. For app-only (Client Credentials), set this to your Directory (tenant) ID. |
| `mailbox` | string | no |  | Mailbox (App-only). Email/UPN or user object ID of the mailbox to act on. Required for app-only (Client Credentials). Leave blank for delegated access (acts as the signed-in user). |

## Actions

### `send-email`

**Send Email.** Composes and sends a new email from the authenticated Outlook mailbox to the given recipients, with optional CC/BCC and file attachments. Use this to send a fresh message (not a reply or forward). Not idempotent: each call dispatches a new email and saves a copy to Sent Items. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recipients` | array | yes |  | To. |
| `ccRecipients` | array | no | `[]` | Cc. |
| `bccRecipients` | array | no | `[]` | Bcc. |
| `subject` | string | yes |  | Subject. |
| `bodyFormat` | string | yes | `"text"` | Body Format. How the text in Body is interpreted. One of `"text"`, `"html"`. |
| `body` | string | yes |  | Body. |
| `attachments` | array | no | `[]` | Attachments. Each item: { `file`, `fileName`? }. |

### `downloadAttachment`

**Download Attachment.** Fetches all file attachments from a specific Outlook message (by message ID) and writes them to storage for downstream steps. Use this after locating a message to retrieve its attached files. Requires a valid message ID; idempotent since it only reads. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Map it from a Find Email step or an Outlook trigger. |

Output fields:

- `[].id`: Attachment ID
- `[].name`: File Name
- `[].file`: File (url)
- `[].contentType`: Content Type
- `[].size`: Size (filesize)
- `[].isInline`: Is Inline (boolean)
- `[].lastModifiedDateTime`: Last Modified At (datetime)

### `reply-email`

**Reply to Email.** Replies to an existing Outlook message (identified by message ID), supporting added CC/BCC recipients and attachments. Set the Create Draft flag to stage the reply without sending; otherwise it is sent immediately. Not idempotent when sending: each call creates and dispatches a new reply. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Email. The email to reply to. A value the product loads from the provider, such as an id; write the value itself. |
| `bodyFormat` | string | yes | `"text"` | Body Format. How the text in Body is interpreted. One of `"text"`, `"html"`. |
| `replyBody` | string | yes |  | Body. |
| `ccRecipients` | array | no |  | Cc. |
| `bccRecipients` | array | no |  | Bcc. |
| `attachments` | array | no | `[]` | Attachments. Each item: { `file`, `fileName`? }. |
| `draft` | boolean | no | `false` | Save as Draft. Save the reply to Drafts instead of sending it. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `draftId`: Draft ID
- `draftLink`: Draft Link (url)

### `createDraftEmail`

**Create Draft Email.** Creates a new unsent draft email in the Outlook mailbox with recipients, subject, body, and optional attachments. Use this to stage a message for later review or sending (pair with Send Draft Email). Not idempotent: each call creates a separate draft. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recipients` | array | yes |  | To. |
| `ccRecipients` | array | no | `[]` | Cc. |
| `bccRecipients` | array | no | `[]` | Bcc. |
| `subject` | string | yes |  | Subject. |
| `bodyFormat` | string | yes | `"text"` | Body Format. How the text in Body is interpreted. One of `"text"`, `"html"`. |
| `body` | string | yes |  | Body. |
| `attachments` | array | no | `[]` | Attachments. Each item: { `file`, `fileName`? }. |

Output fields:

- `id`: Message ID
- `subject`: Subject
- `bodyPreview`: Body Preview
- `body`: Body
- `body.contentType`: Content Type
- `body.content`: Content
- `toRecipients`: To Recipients
- `toRecipients[].emailAddress.name`: Name
- `toRecipients[].emailAddress.address`: Email Address (email)
- `ccRecipients`: CC Recipients
- `ccRecipients[].emailAddress.name`: Name
- `ccRecipients[].emailAddress.address`: Email Address (email)
- `bccRecipients`: BCC Recipients
- `bccRecipients[].emailAddress.name`: Name
- `bccRecipients[].emailAddress.address`: Email Address (email)
- `replyTo`: Reply To
- `replyTo[].emailAddress.name`: Name
- `replyTo[].emailAddress.address`: Email Address (email)
- `receivedDateTime`: Received At (datetime)
- `sentDateTime`: Sent At (datetime)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `hasAttachments`: Has Attachments (boolean)
- `isRead`: Is Read (boolean)
- `isDraft`: Is Draft (boolean)
- `importance`: Importance
- `categories`: Categories
- `flag`: Flag
- `flag.flagStatus`: Flag Status
- `webLink`: Web Link (url)
- `parentFolderId`: Parent Folder ID
- `conversationId`: Conversation ID
- `internetMessageId`: Internet Message ID

### `addLabelToEmail`

**Add Label to Email.** Adds one or more Outlook categories (labels) to a specific message, merging them with any categories already present. Use this to tag or classify an email. Idempotent: re-adding the same categories leaves the message unchanged since duplicates are de-duplicated. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Email. The email to tag. A value the product loads from the provider, such as an id; write the value itself. |
| `categories` | array | yes |  | Categories. Category names to add, one per row. |

Output fields:

- `id`: Message ID
- `subject`: Subject
- `bodyPreview`: Body Preview
- `body`: Body
- `body.contentType`: Content Type
- `body.content`: Content
- `from`: From
- `from.emailAddress.name`: Name
- `from.emailAddress.address`: Email Address (email)
- `sender`: Sender
- `sender.emailAddress.name`: Name
- `sender.emailAddress.address`: Email Address (email)
- `toRecipients`: To Recipients
- `toRecipients[].emailAddress.name`: Name
- `toRecipients[].emailAddress.address`: Email Address (email)
- `ccRecipients`: CC Recipients
- `ccRecipients[].emailAddress.name`: Name
- `ccRecipients[].emailAddress.address`: Email Address (email)
- `bccRecipients`: BCC Recipients
- `bccRecipients[].emailAddress.name`: Name
- `bccRecipients[].emailAddress.address`: Email Address (email)
- `replyTo`: Reply To
- `replyTo[].emailAddress.name`: Name
- `replyTo[].emailAddress.address`: Email Address (email)
- `receivedDateTime`: Received At (datetime)
- `sentDateTime`: Sent At (datetime)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `hasAttachments`: Has Attachments (boolean)
- `isRead`: Is Read (boolean)
- `isDraft`: Is Draft (boolean)
- `importance`: Importance
- `categories`: Categories
- `flag`: Flag
- `flag.flagStatus`: Flag Status
- `webLink`: Web Link (url)
- `parentFolderId`: Parent Folder ID
- `conversationId`: Conversation ID
- `internetMessageId`: Internet Message ID

### `removeLabelFromEmail`

**Remove Label from Email.** Removes one or more Outlook categories (labels) from a specific message, leaving any other categories intact. Use this to untag or reclassify an email. Idempotent: re-running with the same categories yields the same final label set. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Email. The email to remove categories from. A value the product loads from the provider, such as an id; write the value itself. |
| `categories` | array | yes |  | Categories. Category names to remove, one per row. |

Output fields:

- `id`: Message ID
- `subject`: Subject
- `bodyPreview`: Body Preview
- `body`: Body
- `body.contentType`: Content Type
- `body.content`: Content
- `from`: From
- `from.emailAddress.name`: Name
- `from.emailAddress.address`: Email Address (email)
- `sender`: Sender
- `sender.emailAddress.name`: Name
- `sender.emailAddress.address`: Email Address (email)
- `toRecipients`: To Recipients
- `toRecipients[].emailAddress.name`: Name
- `toRecipients[].emailAddress.address`: Email Address (email)
- `ccRecipients`: CC Recipients
- `ccRecipients[].emailAddress.name`: Name
- `ccRecipients[].emailAddress.address`: Email Address (email)
- `bccRecipients`: BCC Recipients
- `bccRecipients[].emailAddress.name`: Name
- `bccRecipients[].emailAddress.address`: Email Address (email)
- `replyTo`: Reply To
- `replyTo[].emailAddress.name`: Name
- `replyTo[].emailAddress.address`: Email Address (email)
- `receivedDateTime`: Received At (datetime)
- `sentDateTime`: Sent At (datetime)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `hasAttachments`: Has Attachments (boolean)
- `isRead`: Is Read (boolean)
- `isDraft`: Is Draft (boolean)
- `importance`: Importance
- `categories`: Categories
- `flag`: Flag
- `flag.flagStatus`: Flag Status
- `webLink`: Web Link (url)
- `parentFolderId`: Parent Folder ID
- `conversationId`: Conversation ID
- `internetMessageId`: Internet Message ID

### `request_approval_in_mail`

**Request Approval in Email.** Sends an email with a single link to a confirmation page where the recipient chooses Approve or Disapprove, then pauses the flow until they respond, resuming with the decision. Use this as a human-in-the-loop approval gate before proceeding. Not idempotent: each call sends a new email and creates a new pending waitpoint. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recipients` | string | yes |  | To. Address that receives the approval request. |
| `subject` | string | yes |  | Subject. |
| `body` | string | yes |  | Body. Shown above the Review & Respond button. HTML tags are rendered. |

Output fields:

- `approved`: Approved (boolean)

### `moveEmailToFolder`

**Move Email to Folder.** Moves a specific Outlook message into a chosen mail folder. Use this to organize, archive, or route an email after processing it. Note: the move assigns a new message ID, so re-running with the original ID will fail once moved. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Email. The email to move. A value the product loads from the provider, such as an id; write the value itself. |
| `destinationFolderId` | string | yes |  | Destination Folder. Folder to move the email into. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Message ID
- `subject`: Subject
- `bodyPreview`: Body Preview
- `body`: Body
- `body.contentType`: Content Type
- `body.content`: Content
- `from`: From
- `from.emailAddress.name`: Name
- `from.emailAddress.address`: Email Address (email)
- `sender`: Sender
- `sender.emailAddress.name`: Name
- `sender.emailAddress.address`: Email Address (email)
- `toRecipients`: To Recipients
- `toRecipients[].emailAddress.name`: Name
- `toRecipients[].emailAddress.address`: Email Address (email)
- `ccRecipients`: CC Recipients
- `ccRecipients[].emailAddress.name`: Name
- `ccRecipients[].emailAddress.address`: Email Address (email)
- `bccRecipients`: BCC Recipients
- `bccRecipients[].emailAddress.name`: Name
- `bccRecipients[].emailAddress.address`: Email Address (email)
- `replyTo`: Reply To
- `replyTo[].emailAddress.name`: Name
- `replyTo[].emailAddress.address`: Email Address (email)
- `receivedDateTime`: Received At (datetime)
- `sentDateTime`: Sent At (datetime)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `hasAttachments`: Has Attachments (boolean)
- `isRead`: Is Read (boolean)
- `isDraft`: Is Draft (boolean)
- `importance`: Importance
- `categories`: Categories
- `flag`: Flag
- `flag.flagStatus`: Flag Status
- `webLink`: Web Link (url)
- `parentFolderId`: Parent Folder ID
- `conversationId`: Conversation ID
- `internetMessageId`: Internet Message ID

### `sendDraftEmail`

**Send Draft Email.** Sends an existing draft email (identified by draft message ID) from the Outlook mailbox. Use this to dispatch a draft previously staged by Create Draft Email or a draft reply. Not idempotent: once sent the draft no longer exists, so re-running with the same ID will fail. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Email. Pick a draft from your Drafts folder. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `messageId`: Message ID

### `forwardEmail`

**Forward Email.** Forwards an existing Outlook message (by message ID) to new recipients, preserving the original body and attachments and prepending an optional comment. Use this to pass an existing email along rather than composing a new one. Not idempotent: each call sends a new forwarded email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Email. The email to forward. A value the product loads from the provider, such as an id; write the value itself. |
| `recipients` | array | yes |  | To. One address per row. |
| `comment` | string | no |  | Comment. Added above the forwarded email. HTML tags are rendered. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `messageId`: Message ID

### `findEmail`

**Find Email.** Searches the Outlook mailbox for messages matching a full-text query (supports field syntax like from:, subject:, hasAttachments:), optionally scoped to one folder and capped by a max-results count. Use this to locate emails and obtain their message IDs for follow-up actions. Idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchQuery` | string | yes |  | Search Query. Words to find. Narrow with from:, subject: or hasAttachments:true. |
| `folderId` | string | no |  | Folder. Leave empty to search every folder. A value the product loads from the provider, such as an id; write the value itself. |
| `top` | number | no | `25` | Max Results. How many emails to return, up to 1000. |

Output fields:

- `found`: Found (boolean)
- `totalCount`: Total Count (number)
- `hasMore`: Has More (boolean)
- `nextPageUrl`: Next Page URL (url)
- `result`: Emails
- `result[].id`: Message ID
- `result[].subject`: Subject
- `result[].bodyPreview`: Body Preview
- `result[].body`: Body
- `result[].body.contentType`: Content Type
- `result[].body.content`: Content
- `result[].from`: From
- `result[].from.emailAddress.name`: Name
- `result[].from.emailAddress.address`: Email Address (email)
- `result[].sender`: Sender
- `result[].sender.emailAddress.name`: Name
- `result[].sender.emailAddress.address`: Email Address (email)
- `result[].toRecipients`: To Recipients
- `result[].toRecipients[].emailAddress.name`: Name
- `result[].toRecipients[].emailAddress.address`: Email Address (email)
- `result[].ccRecipients`: CC Recipients
- `result[].ccRecipients[].emailAddress.name`: Name
- `result[].ccRecipients[].emailAddress.address`: Email Address (email)
- `result[].bccRecipients`: BCC Recipients
- `result[].bccRecipients[].emailAddress.name`: Name
- `result[].bccRecipients[].emailAddress.address`: Email Address (email)
- `result[].replyTo`: Reply To
- `result[].replyTo[].emailAddress.name`: Name
- `result[].replyTo[].emailAddress.address`: Email Address (email)
- `result[].receivedDateTime`: Received At (datetime)
- `result[].sentDateTime`: Sent At (datetime)
- `result[].createdDateTime`: Created At (datetime)
- `result[].lastModifiedDateTime`: Last Modified At (datetime)
- `result[].hasAttachments`: Has Attachments (boolean)
- `result[].isRead`: Is Read (boolean)
- `result[].isDraft`: Is Draft (boolean)
- `result[].importance`: Importance
- `result[].categories`: Categories
- `result[].flag`: Flag
- `result[].flag.flagStatus`: Flag Status
- `result[].webLink`: Web Link (url)
- `result[].parentFolderId`: Parent Folder ID
- `result[].conversationId`: Conversation ID
- `result[].internetMessageId`: Internet Message ID

### `outlook_list_messages`

**List Messages.** Enumerates Outlook messages, optionally scoped to one mail folder and narrowed by an OData $filter expression, and returns their IDs and headers. Use this to discover message IDs for other actions; use Search Messages instead when you only have free-text keywords. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | no |  | Folder ID. Limit the listing to one folder. Accepts a mail folder ID or a well-known name such as inbox, drafts, sentitems, deleteditems, archive or junkemail. Leave empty to list the whole mailbox. |
| `filter` | string | no |  | Filter. Optional OData $filter expression, for example: isRead eq false, or receivedDateTime ge 2024-01-01T00:00:00Z. |
| `maxResults` | number | no | `25` | Max Results. Maximum number of messages to return (1-100). |
| `skip` | number | no |  | Skip. Number of messages to skip before returning results, for paging. |

Output fields:

- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].subject`: Subject
- `messages[].bodyPreview`: Body Preview
- `messages[].from`: From
- `messages[].from.emailAddress.name`: Name
- `messages[].from.emailAddress.address`: Email Address (email)
- `messages[].sender`: Sender
- `messages[].sender.emailAddress.name`: Name
- `messages[].sender.emailAddress.address`: Email Address (email)
- `messages[].toRecipients`: To Recipients
- `messages[].toRecipients[].emailAddress.name`: Name
- `messages[].toRecipients[].emailAddress.address`: Email Address (email)
- `messages[].ccRecipients`: CC Recipients
- `messages[].ccRecipients[].emailAddress.name`: Name
- `messages[].ccRecipients[].emailAddress.address`: Email Address (email)
- `messages[].bccRecipients`: BCC Recipients
- `messages[].bccRecipients[].emailAddress.name`: Name
- `messages[].bccRecipients[].emailAddress.address`: Email Address (email)
- `messages[].replyTo`: Reply To
- `messages[].replyTo[].emailAddress.name`: Name
- `messages[].replyTo[].emailAddress.address`: Email Address (email)
- `messages[].receivedDateTime`: Received At (datetime)
- `messages[].sentDateTime`: Sent At (datetime)
- `messages[].createdDateTime`: Created At (datetime)
- `messages[].lastModifiedDateTime`: Last Modified At (datetime)
- `messages[].hasAttachments`: Has Attachments (boolean)
- `messages[].isRead`: Is Read (boolean)
- `messages[].isDraft`: Is Draft (boolean)
- `messages[].importance`: Importance
- `messages[].categories`: Categories
- `messages[].flag`: Flag
- `messages[].flag.flagStatus`: Flag Status
- `messages[].webLink`: Web Link (url)
- `messages[].parentFolderId`: Parent Folder ID
- `messages[].conversationId`: Conversation ID
- `messages[].internetMessageId`: Internet Message ID
- `count`: Count (number)
- `hasMore`: Has More (boolean)
- `nextLink`: Next Page URL (url)

### `outlook_get_message`

**Get Message.** Reads one Outlook message by ID and returns its headers, plain-text body and metadata. Use this after List Messages or Search Messages to inspect a specific email; use Get Message MIME Content when you need the raw RFC-822 source. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |

Output fields:

- `id`: Message ID
- `subject`: Subject
- `bodyPreview`: Body Preview
- `body`: Body
- `body.contentType`: Content Type
- `body.content`: Content
- `from`: From
- `from.emailAddress.name`: Name
- `from.emailAddress.address`: Email Address (email)
- `sender`: Sender
- `sender.emailAddress.name`: Name
- `sender.emailAddress.address`: Email Address (email)
- `toRecipients`: To Recipients
- `toRecipients[].emailAddress.name`: Name
- `toRecipients[].emailAddress.address`: Email Address (email)
- `ccRecipients`: CC Recipients
- `ccRecipients[].emailAddress.name`: Name
- `ccRecipients[].emailAddress.address`: Email Address (email)
- `bccRecipients`: BCC Recipients
- `bccRecipients[].emailAddress.name`: Name
- `bccRecipients[].emailAddress.address`: Email Address (email)
- `replyTo`: Reply To
- `replyTo[].emailAddress.name`: Name
- `replyTo[].emailAddress.address`: Email Address (email)
- `receivedDateTime`: Received At (datetime)
- `sentDateTime`: Sent At (datetime)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `hasAttachments`: Has Attachments (boolean)
- `isRead`: Is Read (boolean)
- `isDraft`: Is Draft (boolean)
- `importance`: Importance
- `categories`: Categories
- `flag`: Flag
- `flag.flagStatus`: Flag Status
- `webLink`: Web Link (url)
- `parentFolderId`: Parent Folder ID
- `conversationId`: Conversation ID
- `internetMessageId`: Internet Message ID
- `inferenceClassification`: Inference Classification
- `isReadReceiptRequested`: Is Read Receipt Requested (boolean)
- `isDeliveryReceiptRequested`: Is Delivery Receipt Requested (boolean)

### `outlook_search_messages`

**Search Messages.** Runs a full-text Outlook search (KQL terms such as from:jane@contoso.com, subject:invoice or hasAttachments:true), optionally inside one folder, and returns matching messages newest first. Pick this when you have keywords; use List Messages when you need an exact OData filter or paging. Search cannot be combined with filters or server-side sorting, and is unreliable on personal Microsoft accounts. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchQuery` | string | yes |  | Search Query. Keywords or KQL terms to match, for example: from:john@example.com, subject:urgent, hasAttachments:true. |
| `folderId` | string | no |  | Folder ID. Search inside one folder only. Accepts a mail folder ID or a well-known name such as inbox, drafts, sentitems, deleteditems, archive or junkemail. Leave empty to search the whole mailbox. |
| `maxResults` | number | no | `25` | Max Results. Maximum number of results to return (1-1000). |

Output fields:

- `found`: Found (boolean)
- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].subject`: Subject
- `messages[].bodyPreview`: Body Preview
- `messages[].body`: Body
- `messages[].body.contentType`: Content Type
- `messages[].body.content`: Content
- `messages[].from`: From
- `messages[].from.emailAddress.name`: Name
- `messages[].from.emailAddress.address`: Email Address (email)
- `messages[].sender`: Sender
- `messages[].sender.emailAddress.name`: Name
- `messages[].sender.emailAddress.address`: Email Address (email)
- `messages[].toRecipients`: To Recipients
- `messages[].toRecipients[].emailAddress.name`: Name
- `messages[].toRecipients[].emailAddress.address`: Email Address (email)
- `messages[].ccRecipients`: CC Recipients
- `messages[].ccRecipients[].emailAddress.name`: Name
- `messages[].ccRecipients[].emailAddress.address`: Email Address (email)
- `messages[].bccRecipients`: BCC Recipients
- `messages[].bccRecipients[].emailAddress.name`: Name
- `messages[].bccRecipients[].emailAddress.address`: Email Address (email)
- `messages[].replyTo`: Reply To
- `messages[].replyTo[].emailAddress.name`: Name
- `messages[].replyTo[].emailAddress.address`: Email Address (email)
- `messages[].receivedDateTime`: Received At (datetime)
- `messages[].sentDateTime`: Sent At (datetime)
- `messages[].createdDateTime`: Created At (datetime)
- `messages[].lastModifiedDateTime`: Last Modified At (datetime)
- `messages[].hasAttachments`: Has Attachments (boolean)
- `messages[].isRead`: Is Read (boolean)
- `messages[].isDraft`: Is Draft (boolean)
- `messages[].importance`: Importance
- `messages[].categories`: Categories
- `messages[].flag`: Flag
- `messages[].flag.flagStatus`: Flag Status
- `messages[].webLink`: Web Link (url)
- `messages[].parentFolderId`: Parent Folder ID
- `messages[].conversationId`: Conversation ID
- `messages[].internetMessageId`: Internet Message ID
- `messages[].inferenceClassification`: Inference Classification
- `messages[].isReadReceiptRequested`: Is Read Receipt Requested (boolean)
- `messages[].isDeliveryReceiptRequested`: Is Delivery Receipt Requested (boolean)
- `count`: Count (number)
- `hasMore`: Has More (boolean)
- `nextLink`: Next Page URL (url)

### `outlook_get_message_mime`

**Get Message MIME Content.** Stores the raw RFC-822 MIME source of one Outlook message, including full internet headers, as a byte-exact .eml file and returns that file plus its size. The content is not returned inline, because MIME can carry 8-bit and non-UTF-8 bytes that no text field round-trips; read the file when you need the headers. Use this for archival or forensic inspection; use Get Message when the parsed fields are enough. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |

Output fields:

- `messageId`: Message ID
- `file`: File (url)
- `fileName`: File Name
- `contentType`: Content Type
- `size`: Size (filesize)

### `outlook_list_messages_delta`

**List Message Changes (Delta).** Returns the messages added, changed or removed in one mail folder since a previous delta link, plus a fresh delta link for the next call. Use this for incremental sync instead of re-listing a folder; a first call without a delta link returns the current contents. The delta link must be one this action returned on the same connection: any other URL is rejected instead of being followed. Each change carries a removed flag: when it is true the item was deleted and only its id and removedReason are meaningful. Delta payloads omit message bodies and attachments, so follow up with Get Message for full content. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | yes | `"inbox"` | Folder ID. Folder to track. Accepts a mail folder ID or a well-known name such as inbox, drafts, sentitems, deleteditems, archive or junkemail. |
| `deltaLink` | string | no |  | Delta Link. The deltaLink returned by a previous run. Leave empty to start a new sync from the current folder state. It must be a delta link returned by this action on this connection; links pointing at another mailbox or endpoint are rejected. |

Output fields:

- `changes`: Changed Messages
- `changes[].id`: Message ID
- `changes[].subject`: Subject
- `changes[].bodyPreview`: Body Preview
- `changes[].from`: From
- `changes[].from.emailAddress.name`: Name
- `changes[].from.emailAddress.address`: Email Address (email)
- `changes[].sender`: Sender
- `changes[].sender.emailAddress.name`: Name
- `changes[].sender.emailAddress.address`: Email Address (email)
- `changes[].toRecipients`: To Recipients
- `changes[].toRecipients[].emailAddress.name`: Name
- `changes[].toRecipients[].emailAddress.address`: Email Address (email)
- `changes[].ccRecipients`: CC Recipients
- `changes[].ccRecipients[].emailAddress.name`: Name
- `changes[].ccRecipients[].emailAddress.address`: Email Address (email)
- `changes[].bccRecipients`: BCC Recipients
- `changes[].bccRecipients[].emailAddress.name`: Name
- `changes[].bccRecipients[].emailAddress.address`: Email Address (email)
- `changes[].replyTo`: Reply To
- `changes[].replyTo[].emailAddress.name`: Name
- `changes[].replyTo[].emailAddress.address`: Email Address (email)
- `changes[].receivedDateTime`: Received At (datetime)
- `changes[].sentDateTime`: Sent At (datetime)
- `changes[].createdDateTime`: Created At (datetime)
- `changes[].lastModifiedDateTime`: Last Modified At (datetime)
- `changes[].hasAttachments`: Has Attachments (boolean)
- `changes[].isRead`: Is Read (boolean)
- `changes[].isDraft`: Is Draft (boolean)
- `changes[].importance`: Importance
- `changes[].categories`: Categories
- `changes[].flag`: Flag
- `changes[].flag.flagStatus`: Flag Status
- `changes[].webLink`: Web Link (url)
- `changes[].parentFolderId`: Parent Folder ID
- `changes[].conversationId`: Conversation ID
- `changes[].internetMessageId`: Internet Message ID
- `changes[].removed`: Removed (boolean)
- `changes[].removedReason`: Removal Reason
- `count`: Count (number)
- `hasMore`: Has More (boolean)
- `nextLink`: Next Page URL (url)
- `deltaLink`: Delta Link (url)

### `outlook_send_email`

**Send Email.** Composes and immediately sends a brand new email from the connected Outlook mailbox, with optional CC, BCC and attachments, and saves a copy in Sent Items. Use Reply to Message or Forward Message instead when responding to existing mail, and Create Draft when the message should be staged rather than sent. Not idempotent: every call dispatches another email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recipients` | array | yes |  | To Email(s). Email addresses of the primary recipients. |
| `ccRecipients` | array | no |  | CC Email(s). |
| `bccRecipients` | array | no |  | BCC Email(s). |
| `subject` | string | yes |  | Subject. |
| `bodyFormat` | string | yes | `"text"` | Body Format. One of `"html"`, `"text"`. |
| `body` | string | yes |  | Body. |
| `attachments` | array | no |  | Attachments. Files to attach. Total message size must stay under 3 MB. Each item: { `file`, `fileName`? }. |

Output fields:

- `success`: Success (boolean)
- `message`: Result Message
- `subject`: Subject
- `recipients`: Recipients

### `outlook_create_draft`

**Create Draft.** Creates an unsent draft email in the mailbox (optionally inside a specific folder) and returns its message ID. Use this to stage a message for review, to attach files with Add Attachment to Draft, or before Send Draft; use Send Email to send in one step. Not idempotent: every call creates another draft. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recipients` | array | no |  | To Email(s). |
| `ccRecipients` | array | no |  | CC Email(s). |
| `bccRecipients` | array | no |  | BCC Email(s). |
| `subject` | string | yes |  | Subject. |
| `bodyFormat` | string | yes | `"text"` | Body Format. One of `"html"`, `"text"`. |
| `body` | string | yes |  | Body. |
| `folderId` | string | no |  | Folder ID. Create the draft inside a specific folder. Accepts a mail folder ID or a well-known name such as inbox, drafts, sentitems, deleteditems, archive or junkemail. Leave empty to use the Drafts folder. |
| `attachments` | array | no |  | Attachments. Files to attach. Total message size must stay under 3 MB. Each item: { `file`, `fileName`? }. |

Output fields:

- `id`: Message ID
- `subject`: Subject
- `bodyPreview`: Body Preview
- `body`: Body
- `body.contentType`: Content Type
- `body.content`: Content
- `toRecipients`: To Recipients
- `toRecipients[].emailAddress.name`: Name
- `toRecipients[].emailAddress.address`: Email Address (email)
- `ccRecipients`: CC Recipients
- `ccRecipients[].emailAddress.name`: Name
- `ccRecipients[].emailAddress.address`: Email Address (email)
- `bccRecipients`: BCC Recipients
- `bccRecipients[].emailAddress.name`: Name
- `bccRecipients[].emailAddress.address`: Email Address (email)
- `replyTo`: Reply To
- `replyTo[].emailAddress.name`: Name
- `replyTo[].emailAddress.address`: Email Address (email)
- `receivedDateTime`: Received At (datetime)
- `sentDateTime`: Sent At (datetime)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `hasAttachments`: Has Attachments (boolean)
- `isRead`: Is Read (boolean)
- `isDraft`: Is Draft (boolean)
- `importance`: Importance
- `categories`: Categories
- `flag`: Flag
- `flag.flagStatus`: Flag Status
- `webLink`: Web Link (url)
- `parentFolderId`: Parent Folder ID
- `conversationId`: Conversation ID
- `internetMessageId`: Internet Message ID
- `inferenceClassification`: Inference Classification
- `isReadReceiptRequested`: Is Read Receipt Requested (boolean)
- `isDeliveryReceiptRequested`: Is Delivery Receipt Requested (boolean)

### `outlook_send_draft`

**Send Draft.** Sends a draft that already exists in the mailbox, identified by its message ID. Use this after Create Draft, Create Reply Draft, Create Reply-All Draft or Create Forward Draft. Not idempotent: the draft stops existing once sent, so a repeat call with the same ID fails. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Draft Message ID. ID of the draft to send. Obtain it from Create Draft or one of the Create ... Draft actions. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `messageId`: Message ID

### `outlook_reply_to_message`

**Reply to Message.** Sends a reply to the sender of an existing message, quoting the original thread. Use Reply All to Message to include every original recipient, or Create Reply Draft when the reply must be reviewed before sending. Not idempotent: each call sends another reply. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |
| `comment` | string | yes |  | Reply Text. Text added above the quoted original message. |
| `ccRecipients` | array | no |  | Additional CC Email(s). |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `messageId`: Message ID

### `outlook_reply_all_to_message`

**Reply All to Message.** Sends a reply to the sender and every other recipient of an existing message. Use Reply to Message to answer the sender only, or Create Reply-All Draft when the reply must be reviewed first. Not idempotent: each call sends another reply to everyone on the thread. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |
| `comment` | string | yes |  | Reply Text. Text added above the quoted original message. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `messageId`: Message ID

### `outlook_forward_message`

**Forward Message.** Forwards an existing message to new recipients, keeping the original body and attachments and prepending an optional comment. Use Create Forward Draft when the forward should be edited before sending. Not idempotent: each call sends another forwarded copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |
| `recipients` | array | yes |  | To Email(s). Email addresses to forward the message to. |
| `comment` | string | no |  | Comment. Optional text added above the forwarded message. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `messageId`: Message ID
- `recipients`: Recipients

### `outlook_create_reply_draft`

**Create Reply Draft.** Creates an unsent draft reply to the sender of an existing message and returns the draft message ID. Use this when the reply needs editing, extra attachments or review before it goes out; use Reply to Message to send in one step, and Send Draft to dispatch the draft afterwards. Not idempotent: each call creates another draft. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |
| `comment` | string | no |  | Reply Text. Optional text added above the quoted original message. |

Output fields:

- `id`: Message ID
- `subject`: Subject
- `bodyPreview`: Body Preview
- `body`: Body
- `body.contentType`: Content Type
- `body.content`: Content
- `toRecipients`: To Recipients
- `toRecipients[].emailAddress.name`: Name
- `toRecipients[].emailAddress.address`: Email Address (email)
- `ccRecipients`: CC Recipients
- `ccRecipients[].emailAddress.name`: Name
- `ccRecipients[].emailAddress.address`: Email Address (email)
- `bccRecipients`: BCC Recipients
- `bccRecipients[].emailAddress.name`: Name
- `bccRecipients[].emailAddress.address`: Email Address (email)
- `replyTo`: Reply To
- `replyTo[].emailAddress.name`: Name
- `replyTo[].emailAddress.address`: Email Address (email)
- `receivedDateTime`: Received At (datetime)
- `sentDateTime`: Sent At (datetime)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `hasAttachments`: Has Attachments (boolean)
- `isRead`: Is Read (boolean)
- `isDraft`: Is Draft (boolean)
- `importance`: Importance
- `categories`: Categories
- `flag`: Flag
- `flag.flagStatus`: Flag Status
- `webLink`: Web Link (url)
- `parentFolderId`: Parent Folder ID
- `conversationId`: Conversation ID
- `internetMessageId`: Internet Message ID
- `inferenceClassification`: Inference Classification
- `isReadReceiptRequested`: Is Read Receipt Requested (boolean)
- `isDeliveryReceiptRequested`: Is Delivery Receipt Requested (boolean)

### `outlook_create_reply_all_draft`

**Create Reply-All Draft.** Creates an unsent draft addressed to the sender and every other recipient of an existing message, and returns the draft message ID. Use Create Reply Draft to answer only the sender, or Reply All to Message to send immediately. Send it later with Send Draft. Not idempotent: each call creates another draft. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |
| `comment` | string | no |  | Reply Text. Optional text added above the quoted original message. |

Output fields:

- `id`: Message ID
- `subject`: Subject
- `bodyPreview`: Body Preview
- `body`: Body
- `body.contentType`: Content Type
- `body.content`: Content
- `toRecipients`: To Recipients
- `toRecipients[].emailAddress.name`: Name
- `toRecipients[].emailAddress.address`: Email Address (email)
- `ccRecipients`: CC Recipients
- `ccRecipients[].emailAddress.name`: Name
- `ccRecipients[].emailAddress.address`: Email Address (email)
- `bccRecipients`: BCC Recipients
- `bccRecipients[].emailAddress.name`: Name
- `bccRecipients[].emailAddress.address`: Email Address (email)
- `replyTo`: Reply To
- `replyTo[].emailAddress.name`: Name
- `replyTo[].emailAddress.address`: Email Address (email)
- `receivedDateTime`: Received At (datetime)
- `sentDateTime`: Sent At (datetime)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `hasAttachments`: Has Attachments (boolean)
- `isRead`: Is Read (boolean)
- `isDraft`: Is Draft (boolean)
- `importance`: Importance
- `categories`: Categories
- `flag`: Flag
- `flag.flagStatus`: Flag Status
- `webLink`: Web Link (url)
- `parentFolderId`: Parent Folder ID
- `conversationId`: Conversation ID
- `internetMessageId`: Internet Message ID
- `inferenceClassification`: Inference Classification
- `isReadReceiptRequested`: Is Read Receipt Requested (boolean)
- `isDeliveryReceiptRequested`: Is Delivery Receipt Requested (boolean)

### `outlook_create_forward_draft`

**Create Forward Draft.** Creates an unsent draft that forwards an existing message to the given recipients, and returns the draft message ID so the forward can be edited before sending. Use Forward Message to send in one step, and Send Draft to dispatch this draft. Not idempotent: each call creates another draft. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |
| `recipients` | array | yes |  | To Email(s). Email addresses the draft will forward the message to. |
| `comment` | string | no |  | Comment. Optional text added above the forwarded message. |

Output fields:

- `id`: Message ID
- `subject`: Subject
- `bodyPreview`: Body Preview
- `body`: Body
- `body.contentType`: Content Type
- `body.content`: Content
- `toRecipients`: To Recipients
- `toRecipients[].emailAddress.name`: Name
- `toRecipients[].emailAddress.address`: Email Address (email)
- `ccRecipients`: CC Recipients
- `ccRecipients[].emailAddress.name`: Name
- `ccRecipients[].emailAddress.address`: Email Address (email)
- `bccRecipients`: BCC Recipients
- `bccRecipients[].emailAddress.name`: Name
- `bccRecipients[].emailAddress.address`: Email Address (email)
- `replyTo`: Reply To
- `replyTo[].emailAddress.name`: Name
- `replyTo[].emailAddress.address`: Email Address (email)
- `receivedDateTime`: Received At (datetime)
- `sentDateTime`: Sent At (datetime)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `hasAttachments`: Has Attachments (boolean)
- `isRead`: Is Read (boolean)
- `isDraft`: Is Draft (boolean)
- `importance`: Importance
- `categories`: Categories
- `flag`: Flag
- `flag.flagStatus`: Flag Status
- `webLink`: Web Link (url)
- `parentFolderId`: Parent Folder ID
- `conversationId`: Conversation ID
- `internetMessageId`: Internet Message ID
- `inferenceClassification`: Inference Classification
- `isReadReceiptRequested`: Is Read Receipt Requested (boolean)
- `isDeliveryReceiptRequested`: Is Delivery Receipt Requested (boolean)

### `outlook_update_message`

**Update Message.** Updates one message in place: read state, flag state, importance and categories on any message, plus subject and body on a draft. Fields left empty are not sent, and categories are merged with the ones already on the message instead of replacing them. Use Mark Message Read / Unread for the read flag alone, or Batch Update Messages for many messages at once. Idempotent: re-applying the same values converges on the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |
| `isRead` | string | no |  | Read State. Leave unset to keep the current read state. One of `"true"`, `"false"`. |
| `flagStatus` | string | no |  | Flag State. Leave unset to keep the current flag. One of `"flagged"`, `"notFlagged"`, `"complete"`. |
| `importance` | string | no |  | Importance. Leave unset to keep the current importance. One of `"low"`, `"normal"`, `"high"`. |
| `categoriesToAdd` | array | no |  | Categories to Add. Category names to add, merged with the categories already on the message. |
| `categoriesToRemove` | array | no |  | Categories to Remove. Category names to remove from the message. |
| `subject` | string | no |  | Subject. Only writable while the message is still a draft. |
| `body` | string | no |  | Body. Only writable while the message is still a draft. |
| `bodyFormat` | string | no | `"text"` | Body Format. Format of the new body. Ignored when no body is supplied. One of `"html"`, `"text"`. |

Output fields:

- `id`: Message ID
- `subject`: Subject
- `bodyPreview`: Body Preview
- `body`: Body
- `body.contentType`: Content Type
- `body.content`: Content
- `from`: From
- `from.emailAddress.name`: Name
- `from.emailAddress.address`: Email Address (email)
- `sender`: Sender
- `sender.emailAddress.name`: Name
- `sender.emailAddress.address`: Email Address (email)
- `toRecipients`: To Recipients
- `toRecipients[].emailAddress.name`: Name
- `toRecipients[].emailAddress.address`: Email Address (email)
- `ccRecipients`: CC Recipients
- `ccRecipients[].emailAddress.name`: Name
- `ccRecipients[].emailAddress.address`: Email Address (email)
- `bccRecipients`: BCC Recipients
- `bccRecipients[].emailAddress.name`: Name
- `bccRecipients[].emailAddress.address`: Email Address (email)
- `replyTo`: Reply To
- `replyTo[].emailAddress.name`: Name
- `replyTo[].emailAddress.address`: Email Address (email)
- `receivedDateTime`: Received At (datetime)
- `sentDateTime`: Sent At (datetime)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `hasAttachments`: Has Attachments (boolean)
- `isRead`: Is Read (boolean)
- `isDraft`: Is Draft (boolean)
- `importance`: Importance
- `categories`: Categories
- `flag`: Flag
- `flag.flagStatus`: Flag Status
- `webLink`: Web Link (url)
- `parentFolderId`: Parent Folder ID
- `conversationId`: Conversation ID
- `internetMessageId`: Internet Message ID
- `inferenceClassification`: Inference Classification
- `isReadReceiptRequested`: Is Read Receipt Requested (boolean)
- `isDeliveryReceiptRequested`: Is Delivery Receipt Requested (boolean)

### `outlook_set_message_read_status`

**Mark Message Read / Unread.** Sets only the read state of one message, leaving every other property untouched. Use this for the common mark-as-read step; use Update Message when other fields change too, or Batch Update Messages for many messages at once. Idempotent: re-applying the same state changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |
| `isRead` | string | yes | `"true"` | Read State. One of `"true"`, `"false"`. |

Output fields:

- `id`: Message ID
- `subject`: Subject
- `bodyPreview`: Body Preview
- `body`: Body
- `body.contentType`: Content Type
- `body.content`: Content
- `from`: From
- `from.emailAddress.name`: Name
- `from.emailAddress.address`: Email Address (email)
- `sender`: Sender
- `sender.emailAddress.name`: Name
- `sender.emailAddress.address`: Email Address (email)
- `toRecipients`: To Recipients
- `toRecipients[].emailAddress.name`: Name
- `toRecipients[].emailAddress.address`: Email Address (email)
- `ccRecipients`: CC Recipients
- `ccRecipients[].emailAddress.name`: Name
- `ccRecipients[].emailAddress.address`: Email Address (email)
- `bccRecipients`: BCC Recipients
- `bccRecipients[].emailAddress.name`: Name
- `bccRecipients[].emailAddress.address`: Email Address (email)
- `replyTo`: Reply To
- `replyTo[].emailAddress.name`: Name
- `replyTo[].emailAddress.address`: Email Address (email)
- `receivedDateTime`: Received At (datetime)
- `sentDateTime`: Sent At (datetime)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `hasAttachments`: Has Attachments (boolean)
- `isRead`: Is Read (boolean)
- `isDraft`: Is Draft (boolean)
- `importance`: Importance
- `categories`: Categories
- `flag`: Flag
- `flag.flagStatus`: Flag Status
- `webLink`: Web Link (url)
- `parentFolderId`: Parent Folder ID
- `conversationId`: Conversation ID
- `internetMessageId`: Internet Message ID
- `inferenceClassification`: Inference Classification
- `isReadReceiptRequested`: Is Read Receipt Requested (boolean)
- `isDeliveryReceiptRequested`: Is Delivery Receipt Requested (boolean)

### `outlook_move_message`

**Move Message.** Moves one message into another mail folder and returns the moved copy. The move mints a NEW message ID: the original ID stops resolving, so use the returned newMessageId for any follow-up step. Use Copy Message to leave the original in place, or Batch Move Messages for many messages. Not idempotent: a retry with the old ID fails. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |
| `destinationFolderId` | string | yes |  | Destination Folder ID. Accepts a mail folder ID or a well-known name such as inbox, drafts, sentitems, deleteditems, archive or junkemail. |

Output fields:

- `success`: Success (boolean)
- `newMessageId`: New Message ID
- `previousMessageId`: Previous Message ID
- `destinationFolderId`: Destination Folder ID
- `message`: Message
- `message.id`: Message ID
- `message.subject`: Subject
- `message.bodyPreview`: Body Preview
- `message.body`: Body
- `message.body.contentType`: Content Type
- `message.body.content`: Content
- `message.from`: From
- `message.from.emailAddress.name`: Name
- `message.from.emailAddress.address`: Email Address (email)
- `message.sender`: Sender
- `message.sender.emailAddress.name`: Name
- `message.sender.emailAddress.address`: Email Address (email)
- `message.toRecipients`: To Recipients
- `message.toRecipients[].emailAddress.name`: Name
- `message.toRecipients[].emailAddress.address`: Email Address (email)
- `message.ccRecipients`: CC Recipients
- `message.ccRecipients[].emailAddress.name`: Name
- `message.ccRecipients[].emailAddress.address`: Email Address (email)
- `message.bccRecipients`: BCC Recipients
- `message.bccRecipients[].emailAddress.name`: Name
- `message.bccRecipients[].emailAddress.address`: Email Address (email)
- `message.replyTo`: Reply To
- `message.replyTo[].emailAddress.name`: Name
- `message.replyTo[].emailAddress.address`: Email Address (email)
- `message.receivedDateTime`: Received At (datetime)
- `message.sentDateTime`: Sent At (datetime)
- `message.createdDateTime`: Created At (datetime)
- `message.lastModifiedDateTime`: Last Modified At (datetime)
- `message.hasAttachments`: Has Attachments (boolean)
- `message.isRead`: Is Read (boolean)
- `message.isDraft`: Is Draft (boolean)
- `message.importance`: Importance
- `message.categories`: Categories
- `message.flag`: Flag
- `message.flag.flagStatus`: Flag Status
- `message.webLink`: Web Link (url)
- `message.parentFolderId`: Parent Folder ID
- `message.conversationId`: Conversation ID
- `message.internetMessageId`: Internet Message ID
- `message.inferenceClassification`: Inference Classification
- `message.isReadReceiptRequested`: Is Read Receipt Requested (boolean)
- `message.isDeliveryReceiptRequested`: Is Delivery Receipt Requested (boolean)

### `outlook_copy_message`

**Copy Message.** Copies one message into another mail folder, leaving the original where it is, and returns the copy. The copy has a NEW message ID, returned as newMessageId. Use Move Message when the original should not stay behind. Not idempotent: each call creates one more copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |
| `destinationFolderId` | string | yes |  | Destination Folder ID. Accepts a mail folder ID or a well-known name such as inbox, drafts, sentitems, deleteditems, archive or junkemail. |

Output fields:

- `success`: Success (boolean)
- `newMessageId`: New Message ID
- `sourceMessageId`: Source Message ID
- `destinationFolderId`: Destination Folder ID
- `message`: Message
- `message.id`: Message ID
- `message.subject`: Subject
- `message.bodyPreview`: Body Preview
- `message.body`: Body
- `message.body.contentType`: Content Type
- `message.body.content`: Content
- `message.from`: From
- `message.from.emailAddress.name`: Name
- `message.from.emailAddress.address`: Email Address (email)
- `message.sender`: Sender
- `message.sender.emailAddress.name`: Name
- `message.sender.emailAddress.address`: Email Address (email)
- `message.toRecipients`: To Recipients
- `message.toRecipients[].emailAddress.name`: Name
- `message.toRecipients[].emailAddress.address`: Email Address (email)
- `message.ccRecipients`: CC Recipients
- `message.ccRecipients[].emailAddress.name`: Name
- `message.ccRecipients[].emailAddress.address`: Email Address (email)
- `message.bccRecipients`: BCC Recipients
- `message.bccRecipients[].emailAddress.name`: Name
- `message.bccRecipients[].emailAddress.address`: Email Address (email)
- `message.replyTo`: Reply To
- `message.replyTo[].emailAddress.name`: Name
- `message.replyTo[].emailAddress.address`: Email Address (email)
- `message.receivedDateTime`: Received At (datetime)
- `message.sentDateTime`: Sent At (datetime)
- `message.createdDateTime`: Created At (datetime)
- `message.lastModifiedDateTime`: Last Modified At (datetime)
- `message.hasAttachments`: Has Attachments (boolean)
- `message.isRead`: Is Read (boolean)
- `message.isDraft`: Is Draft (boolean)
- `message.importance`: Importance
- `message.categories`: Categories
- `message.flag`: Flag
- `message.flag.flagStatus`: Flag Status
- `message.webLink`: Web Link (url)
- `message.parentFolderId`: Parent Folder ID
- `message.conversationId`: Conversation ID
- `message.internetMessageId`: Internet Message ID
- `message.inferenceClassification`: Inference Classification
- `message.isReadReceiptRequested`: Is Read Receipt Requested (boolean)
- `message.isDeliveryReceiptRequested`: Is Delivery Receipt Requested (boolean)

### `outlook_delete_message`

**Delete Message (to Deleted Items).** Deletes one message by moving it to Deleted Items, where it stays recoverable. This is the safe delete to prefer; Permanently Delete Message is unrecoverable. Not idempotent: repeating the call with the same ID fails once the message has moved. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |

Output fields:

- `success`: Success (boolean)
- `message`: Result Message
- `messageId`: Message ID

### `outlook_permanently_delete_message`

**Permanently Delete Message.** Permanently removes one message from the mailbox with no way to recover it, bypassing Deleted Items. Prefer Delete Message (to Deleted Items) in every case where recovery might be wanted; only use this when the caller explicitly asked for unrecoverable deletion. Unavailable on US Government DoD and 21Vianet clouds. Not idempotent: a retry with the same ID fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |
| `confirm` | boolean | yes | `false` | Confirm Permanent Deletion. Must be enabled. The message cannot be recovered afterwards. |

### `outlook_batch_move_messages`

**Batch Move Messages.** Moves many messages into the same destination folder using Microsoft Graph batching, in chunks of 20 sub-requests. Every moved message gets a NEW ID, returned per item, and the original IDs stop resolving. Individual items can fail while others succeed, so always read the failed list. Use Move Message for a single message. Not idempotent: a retry with the old IDs fails. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageIds` | array | yes |  | Message IDs. IDs of the messages to move. Resolve them with List Messages or Search Messages. |
| `destinationFolderId` | string | yes |  | Destination Folder ID. Accepts a mail folder ID or a well-known name such as inbox, drafts, sentitems, deleteditems, archive or junkemail. |

Output fields:

- `success`: Success (boolean)
- `destinationFolderId`: Destination Folder ID
- `requestedCount`: Requested Count (number)
- `succeededCount`: Succeeded Count (number)
- `failedCount`: Failed Count (number)
- `succeeded`: Succeeded
- `succeeded[].messageId`: Previous Message ID
- `succeeded[].newMessageId`: New Message ID
- `failed`: Failed
- `failed[].messageId`: Message ID
- `failed[].status`: HTTP Status (number)
- `failed[].error`: Error

### `outlook_batch_update_messages`

**Batch Update Messages.** Applies the same read state, flag, importance and category changes to many messages through Microsoft Graph batching, in chunks of 20 sub-requests. Fields left empty are never sent, and categories are merged per message against that message current categories, so tags on other messages are not wiped. Individual items can fail while others succeed, so always read the failed list. Idempotent: re-applying the same field values converges on the same state and creates no new entities. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageIds` | array | yes |  | Message IDs. IDs of the messages to update. Resolve them with List Messages or Search Messages. |
| `isRead` | string | no |  | Read State. Leave unset to keep each message current read state. One of `"true"`, `"false"`. |
| `flagStatus` | string | no |  | Flag State. Leave unset to keep each message current flag. One of `"flagged"`, `"notFlagged"`, `"complete"`. |
| `importance` | string | no |  | Importance. Leave unset to keep each message current importance. One of `"low"`, `"normal"`, `"high"`. |
| `categoriesToAdd` | array | no |  | Categories to Add. Category names merged into the categories each message already has. |
| `categoriesToRemove` | array | no |  | Categories to Remove. Category names removed from each message. |

Output fields:

- `success`: Success (boolean)
- `requestedCount`: Requested Count (number)
- `succeededCount`: Succeeded Count (number)
- `failedCount`: Failed Count (number)
- `succeeded`: Succeeded
- `succeeded[].messageId`: Message ID
- `failed`: Failed
- `failed[].messageId`: Message ID
- `failed[].status`: HTTP Status (number)
- `failed[].error`: Error

### `outlook_add_message_categories`

**Add Categories to Message.** Adds one or more Outlook categories to a message, merging them with the categories already on it so nothing is overwritten. Use Remove Categories from Message for the inverse, and Update Message when other fields change too. Idempotent: re-adding the same categories leaves the message unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |
| `categories` | array | yes |  | Categories. Category names to add to the message. |

Output fields:

- `id`: Message ID
- `subject`: Subject
- `bodyPreview`: Body Preview
- `body`: Body
- `body.contentType`: Content Type
- `body.content`: Content
- `from`: From
- `from.emailAddress.name`: Name
- `from.emailAddress.address`: Email Address (email)
- `sender`: Sender
- `sender.emailAddress.name`: Name
- `sender.emailAddress.address`: Email Address (email)
- `toRecipients`: To Recipients
- `toRecipients[].emailAddress.name`: Name
- `toRecipients[].emailAddress.address`: Email Address (email)
- `ccRecipients`: CC Recipients
- `ccRecipients[].emailAddress.name`: Name
- `ccRecipients[].emailAddress.address`: Email Address (email)
- `bccRecipients`: BCC Recipients
- `bccRecipients[].emailAddress.name`: Name
- `bccRecipients[].emailAddress.address`: Email Address (email)
- `replyTo`: Reply To
- `replyTo[].emailAddress.name`: Name
- `replyTo[].emailAddress.address`: Email Address (email)
- `receivedDateTime`: Received At (datetime)
- `sentDateTime`: Sent At (datetime)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `hasAttachments`: Has Attachments (boolean)
- `isRead`: Is Read (boolean)
- `isDraft`: Is Draft (boolean)
- `importance`: Importance
- `categories`: Categories
- `flag`: Flag
- `flag.flagStatus`: Flag Status
- `webLink`: Web Link (url)
- `parentFolderId`: Parent Folder ID
- `conversationId`: Conversation ID
- `internetMessageId`: Internet Message ID
- `inferenceClassification`: Inference Classification
- `isReadReceiptRequested`: Is Read Receipt Requested (boolean)
- `isDeliveryReceiptRequested`: Is Delivery Receipt Requested (boolean)

### `outlook_remove_message_categories`

**Remove Categories from Message.** Removes one or more Outlook categories from a message while leaving its other categories intact. Use Add Categories to Message for the inverse, and Update Message when other fields change too. Idempotent: removing a category the message does not have changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |
| `categories` | array | yes |  | Categories to Remove. Category names to remove from the message. |

Output fields:

- `id`: Message ID
- `subject`: Subject
- `bodyPreview`: Body Preview
- `body`: Body
- `body.contentType`: Content Type
- `body.content`: Content
- `from`: From
- `from.emailAddress.name`: Name
- `from.emailAddress.address`: Email Address (email)
- `sender`: Sender
- `sender.emailAddress.name`: Name
- `sender.emailAddress.address`: Email Address (email)
- `toRecipients`: To Recipients
- `toRecipients[].emailAddress.name`: Name
- `toRecipients[].emailAddress.address`: Email Address (email)
- `ccRecipients`: CC Recipients
- `ccRecipients[].emailAddress.name`: Name
- `ccRecipients[].emailAddress.address`: Email Address (email)
- `bccRecipients`: BCC Recipients
- `bccRecipients[].emailAddress.name`: Name
- `bccRecipients[].emailAddress.address`: Email Address (email)
- `replyTo`: Reply To
- `replyTo[].emailAddress.name`: Name
- `replyTo[].emailAddress.address`: Email Address (email)
- `receivedDateTime`: Received At (datetime)
- `sentDateTime`: Sent At (datetime)
- `createdDateTime`: Created At (datetime)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `hasAttachments`: Has Attachments (boolean)
- `isRead`: Is Read (boolean)
- `isDraft`: Is Draft (boolean)
- `importance`: Importance
- `categories`: Categories
- `flag`: Flag
- `flag.flagStatus`: Flag Status
- `webLink`: Web Link (url)
- `parentFolderId`: Parent Folder ID
- `conversationId`: Conversation ID
- `internetMessageId`: Internet Message ID
- `inferenceClassification`: Inference Classification
- `isReadReceiptRequested`: Is Read Receipt Requested (boolean)
- `isDeliveryReceiptRequested`: Is Delivery Receipt Requested (boolean)

### `outlook_list_message_attachments`

**List Message Attachments.** Lists every attachment on one message with its ID, name, content type, size and kind, without transferring any file bytes. Use this first to pick an attachment ID for Download Message Attachment or Get Message Attachment. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |

Output fields:

- `messageId`: Message ID
- `attachments`: Attachments
- `attachments[].id`: Attachment ID
- `attachments[].name`: File Name
- `attachments[].contentType`: Content Type
- `attachments[].size`: Size (filesize)
- `attachments[].isInline`: Is Inline (boolean)
- `attachments[].lastModifiedDateTime`: Last Modified At (datetime)
- `attachments[].attachmentType`: Attachment Type
- `count`: Count (number)

### `outlook_get_message_attachment`

**Get Message Attachment.** Returns the metadata of a single attachment (name, content type, size, inline flag and attachment kind) without transferring the file bytes. Use Download Message Attachment when the file content itself is needed, and List Message Attachments to discover attachment IDs. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |
| `attachmentId` | string | yes |  | Attachment ID. Attachment ID from List Message Attachments. Attachment IDs are only valid inside their own message. |

Output fields:

- `id`: Attachment ID
- `name`: File Name
- `contentType`: Content Type
- `size`: Size (filesize)
- `isInline`: Is Inline (boolean)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `attachmentType`: Attachment Type
- `messageId`: Message ID

### `outlook_download_message_attachment`

**Download Message Attachment.** Downloads the bytes of a single file attachment and stores it for downstream steps. Only file attachments can be downloaded; item attachments (an attached email or event) and reference attachments (a cloud link) are rejected with an explanatory error, so check the attachment kind with List Message Attachments first. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |
| `attachmentId` | string | yes |  | Attachment ID. Attachment ID from List Message Attachments. Attachment IDs are only valid inside their own message. |

Output fields:

- `file`: File (url)
- `fileName`: File Name
- `contentType`: Content Type
- `size`: Size (filesize)
- `attachmentId`: Attachment ID
- `messageId`: Message ID

### `outlook_add_message_attachment`

**Add Attachment to Draft.** Attaches one file to an existing draft message and returns the created attachment metadata without echoing the file bytes back. Only meaningful on drafts, and only for files under 3 MB; larger files need an upload session, which this piece does not expose yet. Pair it with Create Draft and Send Draft. Not idempotent: each call adds another attachment, even with the same file name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Draft Message ID. ID of the draft to attach the file to. Obtain it from Create Draft. |
| `file` | file | yes |  | File. File to attach. Must be smaller than 3 MB. Files are not supported; an action that needs one fails. |
| `fileName` | string | no |  | File Name. Name shown on the attachment. Defaults to the uploaded file name. |

Output fields:

- `id`: Attachment ID
- `name`: File Name
- `contentType`: Content Type
- `size`: Size (filesize)
- `isInline`: Is Inline (boolean)
- `lastModifiedDateTime`: Last Modified At (datetime)
- `attachmentType`: Attachment Type
- `messageId`: Message ID

### `outlook_delete_message_attachment`

**Delete Message Attachment.** Removes one attachment from a message, typically a draft, and it cannot be restored afterwards. Resolve the attachment ID with List Message Attachments first. Not idempotent: repeating the call with the same ID fails once the attachment is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. Outlook message ID. Resolve one with List Messages, Search Messages or Get Message. |
| `attachmentId` | string | yes |  | Attachment ID. Attachment ID from List Message Attachments. |

Output fields:

- `success`: Success (boolean)
- `message`: Result Message
- `messageId`: Message ID
- `attachmentId`: Attachment ID

### `outlook_list_mail_folders`

**List Mail Folders.** Lists the top-level mail folders with their IDs, display names and item counts, including hidden folders. Use this to resolve a folder ID before moving, copying or listing messages; use List Child Mail Folders to walk deeper into the tree. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `maxResults` | number | no | `50` | Max Results. Maximum number of folders to return (1-100). |

Output fields:

- `folders`: Folders
- `folders[].id`: Folder ID
- `folders[].displayName`: Display Name
- `folders[].parentFolderId`: Parent Folder ID
- `folders[].childFolderCount`: Child Folder Count (number)
- `folders[].unreadItemCount`: Unread Item Count (number)
- `folders[].totalItemCount`: Total Item Count (number)
- `folders[].isHidden`: Is Hidden (boolean)
- `count`: Count (number)
- `hasMore`: Has More (boolean)
- `nextLink`: Next Page URL (url)

### `outlook_list_child_mail_folders`

**List Child Mail Folders.** Lists the direct sub-folders of a given mail folder, including hidden ones, so nested hierarchies can be walked one level at a time. Use List Mail Folders for the top level; a child folder ID works anywhere a folder ID is accepted. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | yes | `"inbox"` | Parent Folder ID. Accepts a mail folder ID or a well-known name such as inbox, drafts, sentitems, deleteditems, archive or junkemail. |
| `maxResults` | number | no | `50` | Max Results. Maximum number of folders to return (1-100). |

Output fields:

- `parentFolderId`: Parent Folder ID
- `folders`: Folders
- `folders[].id`: Folder ID
- `folders[].displayName`: Display Name
- `folders[].parentFolderId`: Parent Folder ID
- `folders[].childFolderCount`: Child Folder Count (number)
- `folders[].unreadItemCount`: Unread Item Count (number)
- `folders[].totalItemCount`: Total Item Count (number)
- `folders[].isHidden`: Is Hidden (boolean)
- `count`: Count (number)
- `hasMore`: Has More (boolean)
- `nextLink`: Next Page URL (url)

### `outlook_get_mail_folder`

**Get Mail Folder.** Reads a single mail folder and returns its display name, parent, child count and unread and total item counts. Accepts either an opaque folder ID or a well-known name such as inbox or drafts, which makes it the cheapest way to resolve a standard folder ID. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | yes | `"inbox"` | Folder ID. Accepts a mail folder ID or a well-known name such as inbox, drafts, sentitems, deleteditems, archive or junkemail. |

Output fields:

- `id`: Folder ID
- `displayName`: Display Name
- `parentFolderId`: Parent Folder ID
- `childFolderCount`: Child Folder Count (number)
- `unreadItemCount`: Unread Item Count (number)
- `totalItemCount`: Total Item Count (number)
- `isHidden`: Is Hidden (boolean)

### `outlook_create_mail_folder`

**Create Mail Folder.** Creates a mail folder at the top level or under a parent folder. It first queries the sibling folders by exact display name and returns the existing folder with created set to false when one already carries the same display name, so no duplicate folder is ever created. Idempotent: repeat calls return the same folder. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `displayName` | string | yes |  | Folder Name. Display name of the folder to create. |
| `parentFolderId` | string | no |  | Parent Folder ID. Create the folder under this parent. Accepts a mail folder ID or a well-known name such as inbox, drafts, sentitems, deleteditems, archive or junkemail. Leave empty to create it at the top level. |

Output fields:

- `created`: Created (boolean)
- `folderId`: Folder ID
- `folder`: Folder
- `folder.id`: Folder ID
- `folder.displayName`: Display Name
- `folder.parentFolderId`: Parent Folder ID
- `folder.childFolderCount`: Child Folder Count (number)
- `folder.unreadItemCount`: Unread Item Count (number)
- `folder.totalItemCount`: Total Item Count (number)
- `folder.isHidden`: Is Hidden (boolean)
- `folder.sizeInBytes`: Size (filesize)
- `folder.wellKnownName`: Well-Known Name

### `outlook_update_mail_folder`

**Rename Mail Folder.** Renames a mail folder. The display name is the only writable property of a folder, so use Move Mail Folder to change its parent and Create Mail Folder to add a new one. Idempotent: applying the same name again changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | yes |  | Folder ID. Accepts a mail folder ID or a well-known name such as inbox, drafts, sentitems, deleteditems, archive or junkemail. |
| `displayName` | string | yes |  | New Folder Name. |

Output fields:

- `id`: Folder ID
- `displayName`: Display Name
- `parentFolderId`: Parent Folder ID
- `childFolderCount`: Child Folder Count (number)
- `unreadItemCount`: Unread Item Count (number)
- `totalItemCount`: Total Item Count (number)
- `isHidden`: Is Hidden (boolean)
- `sizeInBytes`: Size (filesize)
- `wellKnownName`: Well-Known Name

### `outlook_delete_mail_folder`

**Delete Mail Folder.** Deletes a mail folder together with every message and sub-folder it contains. Move messages out with Batch Move Messages first if they must be kept. Not idempotent: repeating the call with the same ID fails once the folder is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | yes |  | Folder ID. Accepts a mail folder ID or a well-known name such as inbox, drafts, sentitems, deleteditems, archive or junkemail. Well-known system folders cannot be deleted. |

Output fields:

- `success`: Success (boolean)
- `message`: Result Message
- `folderId`: Folder ID

### `outlook_copy_mail_folder`

**Copy Mail Folder.** Copies a mail folder, with its messages and sub-folders, under a destination folder and returns the new folder. Use Move Mail Folder when the original should not stay in place. Not idempotent: each call creates another copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | yes |  | Folder ID. Accepts a mail folder ID or a well-known name such as inbox, drafts, sentitems, deleteditems, archive or junkemail. |
| `destinationFolderId` | string | yes |  | Destination Folder ID. Folder that will contain the copy. Accepts a mail folder ID or a well-known name such as inbox, drafts, sentitems, deleteditems, archive or junkemail. |

Output fields:

- `success`: Success (boolean)
- `newFolderId`: New Folder ID
- `sourceFolderId`: Source Folder ID
- `destinationFolderId`: Destination Folder ID
- `folder`: Folder
- `folder.id`: Folder ID
- `folder.displayName`: Display Name
- `folder.parentFolderId`: Parent Folder ID
- `folder.childFolderCount`: Child Folder Count (number)
- `folder.unreadItemCount`: Unread Item Count (number)
- `folder.totalItemCount`: Total Item Count (number)
- `folder.isHidden`: Is Hidden (boolean)
- `folder.sizeInBytes`: Size (filesize)
- `folder.wellKnownName`: Well-Known Name

### `outlook_move_mail_folder`

**Move Mail Folder.** Reparents a mail folder, moving it with its messages and sub-folders under a different destination folder. Use Copy Mail Folder to duplicate instead of relocating, and Rename Mail Folder to change only its name. The move issues the folder a new ID: carry newFolderId forward into later steps, not the folderId that was passed in. Not idempotent: once moved, the same call repeated against the old parent no longer applies. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | yes |  | Folder ID. Accepts a mail folder ID or a well-known name such as inbox, drafts, sentitems, deleteditems, archive or junkemail. |
| `destinationFolderId` | string | yes |  | Destination Folder ID. New parent folder. Accepts a mail folder ID or a well-known name such as inbox, drafts, sentitems, deleteditems, archive or junkemail. |

Output fields:

- `success`: Success (boolean)
- `folderId`: Folder ID
- `newFolderId`: New Folder ID
- `destinationFolderId`: Destination Folder ID
- `folder`: Folder
- `folder.id`: Folder ID
- `folder.displayName`: Display Name
- `folder.parentFolderId`: Parent Folder ID
- `folder.childFolderCount`: Child Folder Count (number)
- `folder.unreadItemCount`: Unread Item Count (number)
- `folder.totalItemCount`: Total Item Count (number)
- `folder.isHidden`: Is Hidden (boolean)
- `folder.sizeInBytes`: Size (filesize)
- `folder.wellKnownName`: Well-Known Name

### `outlook_list_mail_folders_delta`

**List Folder Changes (Delta).** Returns the mail folders created, renamed or removed since a previous delta link, plus a fresh delta link for the next call. Use this to keep a folder tree in sync instead of re-listing it; it pairs with List Message Changes (Delta) for messages. The delta link must be one this action returned on the same connection: any other URL is rejected instead of being followed. Each change carries a removed flag: when it is true the folder was deleted and only its id and removedReason are meaningful. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `deltaLink` | string | no |  | Delta Link. The deltaLink returned by a previous run. Leave empty to start a new sync from the current folder tree. It must be a delta link returned by this action on this connection; links pointing at another mailbox or endpoint are rejected. |

Output fields:

- `changes`: Changed Folders
- `changes[].id`: Folder ID
- `changes[].displayName`: Display Name
- `changes[].parentFolderId`: Parent Folder ID
- `changes[].childFolderCount`: Child Folder Count (number)
- `changes[].unreadItemCount`: Unread Item Count (number)
- `changes[].totalItemCount`: Total Item Count (number)
- `changes[].isHidden`: Is Hidden (boolean)
- `changes[].sizeInBytes`: Size (filesize)
- `changes[].wellKnownName`: Well-Known Name
- `changes[].removed`: Removed (boolean)
- `changes[].removedReason`: Removal Reason
- `count`: Count (number)
- `hasMore`: Has More (boolean)
- `nextLink`: Next Page URL (url)
- `deltaLink`: Delta Link (url)

### `outlook_list_focused_inbox_overrides`

**List Focused Inbox Overrides.** Lists the Focused Inbox overrides that force mail from specific senders into the Focused or Other tab, with the override ID for each sender. Run this first: Update Focused Inbox Override and Delete Focused Inbox Override both need an ID that only this action returns. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `overrides`: Overrides
- `overrides[].id`: Override ID
- `overrides[].classifyAs`: Classify As
- `overrides[].senderEmailAddress`: Sender
- `overrides[].senderEmailAddress.name`: Name
- `overrides[].senderEmailAddress.address`: Email Address (email)
- `count`: Count (number)

### `outlook_create_focused_inbox_override`

**Create Focused Inbox Override.** Pins future mail from one sender address to the Focused or the Other tab. Microsoft upserts by sender address: if an override already exists for that address, its classification is updated instead of a duplicate being created, and the stored display name is left untouched unless Sender Display Name is supplied. Idempotent for that reason. Use Update Focused Inbox Override when you already hold an override ID. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `senderEmailAddress` | string | yes |  | Sender Email Address. SMTP address of the sender the override applies to. |
| `classifyAs` | string | yes | `"focused"` | Classify As. One of `"focused"`, `"other"`. |
| `senderName` | string | no |  | Sender Display Name. Optional display name stored alongside the override. |

Output fields:

- `id`: Override ID
- `classifyAs`: Classify As
- `senderEmailAddress`: Sender
- `senderEmailAddress.name`: Name
- `senderEmailAddress.address`: Email Address (email)

### `outlook_update_focused_inbox_override`

**Update Focused Inbox Override.** Switches an existing Focused Inbox override between the Focused and Other tabs. The classification is the only writable property, and the override ID comes from List Focused Inbox Overrides. Idempotent: applying the same classification again changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `overrideId` | string | yes |  | Override ID. Override ID from List Focused Inbox Overrides. |
| `classifyAs` | string | yes |  | Classify As. One of `"focused"`, `"other"`. |

Output fields:

- `id`: Override ID
- `classifyAs`: Classify As
- `senderEmailAddress`: Sender
- `senderEmailAddress.name`: Name
- `senderEmailAddress.address`: Email Address (email)

### `outlook_delete_focused_inbox_override`

**Delete Focused Inbox Override.** Deletes one Focused Inbox override so mail from that sender is classified by Outlook again. The override ID comes from List Focused Inbox Overrides. Not idempotent: repeating the call with the same ID fails once the override is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `overrideId` | string | yes |  | Override ID. Override ID from List Focused Inbox Overrides. |

Output fields:

- `success`: Success (boolean)
- `message`: Result Message
- `overrideId`: Override ID

### `outlook_get_mail_tips`

**Get Mail Tips.** Checks recipients before sending and reports automatic replies or out-of-office messages, full mailboxes, maximum accepted message size, delivery restrictions, moderation and whether the recipient is external. Use this ahead of Send Email when a message is important or goes outside the organisation. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `emailAddresses` | array | yes |  | Recipient Email Addresses. Addresses to check. Up to 100 recipients per call. |

Output fields:

- `mailTips`: Mail Tips
- `mailTips[].emailAddress`: Email Address
- `mailTips[].emailAddress.name`: Name
- `mailTips[].emailAddress.address`: Email Address (email)
- `mailTips[].mailboxFull`: Mailbox Full (boolean)
- `mailTips[].deliveryRestricted`: Delivery Restricted (boolean)
- `mailTips[].isModerated`: Is Moderated (boolean)
- `mailTips[].recipientScope`: Recipient Scope
- `mailTips[].maxMessageSize`: Max Message Size (filesize)
- `mailTips[].externalMemberCount`: External Member Count (number)
- `mailTips[].totalMemberCount`: Total Member Count (number)
- `mailTips[].automaticReplies`: Automatic Replies
- `count`: Count (number)

### `outlook_get_my_profile`

**Get My Profile.** Returns the identity behind the connection: display name, primary email address and user principal name. Use this to learn your own address before composing mail, filtering a thread or deciding whether a sender is you. On app-only connections it reports the configured mailbox without calling Microsoft Graph, because reading another user profile would need a directory permission this piece does not request. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: User ID
- `displayName`: Display Name
- `mail`: Email Address (email)
- `userPrincipalName`: User Principal Name
- `source`: Source

### `outlook_get_supported_time_zones`

**Get Supported Time Zones.** Lists the time zone names Outlook accepts, so a time zone string can be validated before it is used elsewhere. Works on delegated connections only: Microsoft exposes no application permission for it, so app-only connections are rejected with an explanatory error. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `timeZones`: Time Zones
- `timeZones[].alias`: Alias
- `timeZones[].displayName`: Display Name
- `count`: Count (number)

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

# Front

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-front'
  version: '0.2.2'
```

Categories: CUSTOMER_SUPPORT. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Front API Token

> Your Front API token. You can create one from your Front settings under "Developers". Ensure the token has the necessary scopes.

## Actions

### `addComment`

**Add Comment.** Post an internal comment (private note) on a Front conversation, visible only to teammates and never sent to the customer. Use for team collaboration or context; to send a customer-facing message use "Send Reply" instead. Not idempotent: each call adds another comment. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. Select the conversation. A value the product loads from the provider, such as an id; write the value itself. |
| `author_id` | string | yes |  | Teammate ID. Select the teammate. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | string | yes |  | Comment Body. The content of the comment. |

### `addContactHandle`

**Add Contact Handle.** Add one additional handle (email, phone, social, or custom) of a chosen type to an existing Front contact identified by contact ID. Use to register a new address for someone already in the address book; to create a brand-new contact use "Create Contact". Not idempotent: re-adding the same handle may error or duplicate. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | yes |  | Contact ID. Select the contact. A value the product loads from the provider, such as an id; write the value itself. |
| `handle_type` | string | yes |  | Handle Type. Type of handle to add. One of `"email"`, `"phone"`, `"twitter"`, `"facebook"`, `"intercom"`, `"front_chat"`, `"custom"`. |
| `handle_value` | string | yes |  | Handle Value. The value of the handle (e.g., email address, phone number). |

### `addConversationLinks`

**Add Conversation Links.** Attach existing Front Links (referenced by their link IDs) to a conversation, associating external resources such as tickets or CRM records. Requires links that already exist; create them first with "Create Link". To detach links use "Remove Conversation Links". Not idempotent: attaching an already-attached link may error. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. Select the conversation. A value the product loads from the provider, such as an id; write the value itself. |
| `link_ids` | array | no |  | Link IDs. Select one or more links. Values the product loads from the provider, such as ids; write an array of them. |

### `addConversationTags`

**Add Conversation Tags.** Apply one or more existing tags (by tag ID) to a Front conversation for categorization or routing. Use to label a thread; tags must already exist. Effectively idempotent: re-applying a tag already present leaves the conversation tag set unchanged. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. Select the conversation. A value the product loads from the provider, such as an id; write the value itself. |
| `tag_ids` | array | no |  | Tag IDs. Select one or more tags. Values the product loads from the provider, such as ids; write an array of them. |

### `assignUnassignConversation`

**Assign/Unassign Conversation.** Set or clear the assignee of a Front conversation: provide a teammate ID to assign it, or leave the assignee empty to unassign. Use for routing or ownership changes. Idempotent: assigning to the same teammate (or leaving unassigned) does not change the result. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. Select the conversation. A value the product loads from the provider, such as an id; write the value itself. |
| `assignee_id` | string | yes |  | Teammate ID. Select the teammate. A value the product loads from the provider, such as an id; write the value itself. |

### `createAccount`

**Create Account.** Create a new company account in Front with a name plus optional domains, external ID, description and custom fields. Use to register an organization not yet tracked; to edit an existing one use "Update Account" and to look one up use "Find Account". Not idempotent: repeated calls create duplicate accounts. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Account Name. The name of the account to create. |
| `description` | string | no |  | Description. A description for the account. |
| `domains` | array | no |  | Domains. List of domains associated with the account. Each item: { `domain` }. |
| `external_id` | string | no |  | External ID. An external identifier for the account. |
| `custom_fields` | JSON | no | `{}` | Custom Fields. Custom fields for this account, as a JSON object. |

### `createContact`

**Create Contact.** Create a new contact in Front from one or more handles (email, phone, social) plus optional name, links, groups and custom fields. Use when adding a person who is not yet in the address book; to attach an additional handle to an existing contact use "Add Contact Handle", and to edit fields use "Update Contact". Not idempotent: repeated calls create duplicate contacts. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name. The name of the contact. |
| `description` | string | no |  | Description. A description for the contact. |
| `handles` | array | yes |  | Handles. List of contact handles (e.g., email, phone). Each item: { `handle`, `source` }. |
| `avatar_url` | file | no |  | Avatar URL. URL of the contact’s avatar image. Files are not supported; an action that needs one fails. |
| `links` | array | no |  | Links. List of URLs associated with the contact. Each item: { `link` }. |
| `group_names` | array | no |  | Group Names. List of group names to associate with the contact. Each item: { `group_names` }. |
| `list_names` | array | no |  | Contact Lists. List of contact list names this contact belongs to. Front will create any that do not exist. |
| `custom_fields` | JSON | no | `{}` | Custom Fields. Custom fields for this contact, as a JSON object (e.g., {"CRM ID": "12345"}). |

### `createDraft`

**Create Draft.** Create an unsent draft message on a channel that starts a new conversation, optionally private to the author or shared with the team (Mode). Use when a human should review before sending rather than dispatching immediately ("Send Message" sends right away); to draft a reply within an existing conversation use "Create Draft Reply". Not idempotent: each call creates a new draft. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. Select the channel. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | array | yes |  | To. List of recipient handles (email addresses, etc.). |
| `cc` | array | no |  | CC. List of CC recipient handles. |
| `bcc` | array | no |  | BCC. List of BCC recipient handles. |
| `subject` | string | no |  | Subject. The subject of the draft. |
| `body` | string | yes |  | Body. The body of the draft message. |
| `attachments` | array | no |  | Attachments. Files to attach. Each entry takes a URL, a base64 data URI, or a file from an earlier step. Front allows 25 MB across all attachments on one message. Each item: { `file` }. |
| `mode` | string | yes | `"private"` | Mode. Mode of the draft reply. One of `"private"`, `"shared"`. |
| `signature_id` | string | no |  | Signature ID. The ID of the signature to use for the draft reply (if applicable). |
| `should_add_default_signature` | boolean | no | `false` | Add Default Signature. Whether to append the default signature to the draft reply (if applicable). |

### `createDraftReply`

**Create Draft Reply.** Create an unsent draft reply within an existing conversation (by conversation ID), optionally private to the author or shared (Mode). Use when a human should review before sending; "Send Reply" dispatches immediately, and "Create Draft" drafts a new conversation instead. Not idempotent: each call creates a new draft. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. Select the conversation. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | string | yes |  | Message Body. The content of the draft reply. |
| `subject` | string | no |  | Subject. The subject of the draft reply (for email channels). |
| `author_id` | string | yes |  | Teammate ID. Select the teammate. A value the product loads from the provider, such as an id; write the value itself. |
| `channel_id` | string | yes |  | Channel ID. Select the channel. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | array | no |  | To. List of recipient handles (email addresses, etc.). |
| `cc` | array | no |  | CC. List of CC recipient handles. |
| `bcc` | array | no |  | BCC. List of BCC recipient handles. |
| `attachments` | array | no |  | Attachments. Files to attach. Each entry takes a URL, a base64 data URI, or a file from an earlier step. Front allows 25 MB across all attachments on one message. Each item: { `file` }. |
| `mode` | string | yes | `"private"` | Mode. Mode of the draft reply. One of `"private"`, `"shared"`. |
| `signature_id` | string | no |  | Signature ID. The ID of the signature to use for the draft reply (if applicable). |
| `should_add_default_signature` | boolean | no | `false` | Add Default Signature. Whether to append the default signature to the draft reply (if applicable). |

### `createLink`

**Create Link.** Create a reusable Front Link from a name and external URL (with an optional regex pattern) that can later be attached to conversations. Use this first when you need a link that does not yet exist before calling "Add Conversation Links". Not idempotent: repeated calls create duplicate links. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The name of the link. |
| `external_url` | string | yes |  | External URL. The external URL for the link. |
| `pattern` | string | no |  | Pattern. Optional pattern to match URLs (regex). |

### `findAccount`

**Find Account.** List Front company accounts, optionally narrowing the results by email domain or external ID. Use to look up an account ID before updating it or to enumerate accounts. Read-only and idempotent: it never modifies data. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email_domain` | string | no |  | Email Domain. Filter accounts by email domain. |
| `external_id` | string | no |  | External ID. Filter accounts by external ID. |
| `limit` | number | no |  | Limit. Maximum number of accounts to return (max 100). |
| `page_token` | string | no |  | Page Token. Token for pagination. |
| `sort_by` | string | no |  | Sort By. Field used to sort the accounts. One of `"created_at"`, `"updated_at"`. |
| `sort_order` | string | no |  | Sort Order. Order by which results should be sorted. One of `"asc"`, `"desc"`. |

### `findContact`

**Find Contact.** Search Front contacts by email, phone, or a custom Front query string to find a matching contact before referencing it. Read-only and repeatable; supports pagination via limit and page token. Use this to resolve a contact rather than to create or modify one. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. Email address to search for. |
| `phone` | string | no |  | Phone. Phone number to search for. |
| `custom_query` | string | no |  | Custom Query. Custom Front query string (advanced). |
| `limit` | number | no |  | Limit. Maximum number of contacts to return. |
| `page_token` | string | no |  | Page Token. Token for pagination. |

### `findConversation`

**Find Conversation.** Search Front conversations using a Front query string (e.g. subject, tag_ids, inbox_id, participant) with optional limit and pagination token. Use to locate conversation IDs to feed into reply, comment, tag, or update actions. Read-only and idempotent: the same query returns the same matches without changing data. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `q` | string | yes |  | Query. Front query string (e.g. subject:"Order", tag_ids:tag_123, inbox_id:inb_456, etc.). See https://dev.frontapp.com/docs/search-1. |
| `limit` | number | no |  | Limit. Maximum number of conversations to return. |
| `page_token` | string | no |  | Page Token. Token for pagination. |

### `removeContactHandle`

**Remove Contact Handle.** Remove a specific handle (matched by value and source type) from an existing Front contact, the inverse of "Add Contact Handle". The Force option deletes the whole contact if this is their last handle, so use with care. Effectively idempotent: removing a handle that is already gone leaves the contact unchanged. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | yes |  | Contact ID. Select the contact. A value the product loads from the provider, such as an id; write the value itself. |
| `handle` | string | yes |  | Handle. The handle to remove. |
| `source` | string | yes |  | Source. The type of the handle to remove. One of `"email"`, `"phone"`, `"twitter"`, `"facebook"`, `"intercom"`, `"front_chat"`, `"custom"`. |
| `force` | boolean | no | `false` | Delete Contact if Last Handle. If true, the entire contact will be deleted if this is their last handle. |

### `removeConversationLinks`

**Remove Conversation Links.** Detach external links (by URL) from a Front conversation, the inverse of "Add Conversation Links". Use to clean up associations no longer relevant to the thread. Effectively idempotent: removing a link not present leaves the conversation unchanged. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. Select the conversation. A value the product loads from the provider, such as an id; write the value itself. |
| `links` | array | yes |  | Links. List of external URLs to remove from the conversation. Each item: { `item` }. |

### `sendMessage`

**Send Message.** Send an outbound message through a Front channel, creating a brand-new conversation. Pick this to initiate first contact with recipients (by handle) rather than answering an existing thread; use "Send Reply" to respond within an existing conversation. Not idempotent: each call sends a new message and starts a new conversation. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. Select the channel. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | array | yes |  | To. List of recipient handles (email addresses, etc.). |
| `cc` | array | no |  | CC. List of CC recipient handles. |
| `bcc` | array | no |  | BCC. List of BCC recipient handles. |
| `subject` | string | no |  | Subject. The subject of the message. |
| `body` | string | yes |  | Body. The body of the message. |
| `attachments` | array | no |  | Attachments. Files to attach. Each entry takes a URL, a base64 data URI, or a file from an earlier step. Front allows 25 MB across all attachments on one message. Each item: { `file` }. |
| `tag_ids` | array | no |  | Tag IDs. Select one or more tags. Values the product loads from the provider, such as ids; write an array of them. |

### `sendReply`

**Send Reply.** Send a customer-facing reply within an existing Front conversation identified by conversation ID. Pick this to respond in an ongoing thread; use "Send Message" to start a new conversation and "Add Comment" for an internal note. Not idempotent: each call sends another reply. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. Select the conversation. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | string | yes |  | Message Body. The content of the reply message. |
| `author_id` | string | yes |  | Teammate ID. Select the teammate. A value the product loads from the provider, such as an id; write the value itself. |
| `subject` | string | no |  | Subject. The subject of the reply (for email channels). |
| `to` | array | no |  | To. List of recipient handles (email addresses, etc.). |
| `cc` | array | no |  | CC. List of CC recipient handles. |
| `bcc` | array | no |  | BCC. List of BCC recipient handles. |
| `channel_id` | string | yes |  | Channel ID. Select the channel. A value the product loads from the provider, such as an id; write the value itself. |
| `attachments` | array | no |  | Attachments. Files to attach. Each entry takes a URL, a base64 data URI, or a file from an earlier step. Front allows 25 MB across all attachments on one message. Each item: { `file` }. |

### `updateAccount`

**Update Account.** Update fields (name, description, domains, custom fields) of an existing Front company account identified by account ID; only the fields you supply change. Use to edit an account found via "Find Account"; to create a new one use "Create Account". Idempotent: re-applying the same values yields the same result. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. Select the account. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Account Name. The new name for the account. |
| `description` | string | no |  | Description. The new description for the account. |
| `domains` | array | no |  | Domains. List of domains associated with the account. |
| `custom_fields` | JSON | no |  | Custom Fields. Custom fields to add or update. Existing fields will be preserved. |

### `updateContact`

**Update Contact.** Update fields (name, description, avatar URL, links) of an existing Front contact identified by contact ID; only the fields you supply change, and this does not modify handles. Use to edit core details; manage handles with "Add Contact Handle"/"Remove Contact Handle". Idempotent: re-applying the same values yields the same result. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | yes |  | Contact ID. Select the contact. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. The new name for the contact. |
| `description` | string | no |  | Description. A new description for the contact. |
| `avatar_url` | string | no |  | Avatar URL. URL of the contact’s avatar image. |
| `links` | array | no |  | Links. List of URLs associated with the contact. Each item: { `item` }. |

### `updateConversation`

**Update Conversation.** Update properties of a Front conversation: status (open/archived/deleted), assignee, inbox, and tags; only the fields you supply change. Use for general thread state changes; "Assign/Unassign Conversation" and "Add Conversation Tags" cover those single concerns. Idempotent: re-applying the same values yields the same conversation state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. Select the conversation. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Status. The new status for the conversation. One of `"open"`, `"archived"`, `"deleted"`. |
| `assignee_id` | string | yes |  | Teammate ID. Select the teammate. A value the product loads from the provider, such as an id; write the value itself. |
| `inbox_id` | string | no |  | Inbox ID. Select the inbox. A value the product loads from the provider, such as an id; write the value itself. |
| `tag_ids` | array | no |  | Tag IDs. Select one or more tags. Values the product loads from the provider, such as ids; write an array of them. |

### `updateLink`

**Update Link.** Update the name and/or external URL of an existing Front Link identified by link ID. Use to edit a link already created with "Create Link"; only the fields you supply change. Idempotent: re-applying the same values yields the same result. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `link_id` | string | no |  | Link ID. Select the link. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. The new name for the link. |
| `external_url` | string | no |  | External URL. The new external URL for the link. |

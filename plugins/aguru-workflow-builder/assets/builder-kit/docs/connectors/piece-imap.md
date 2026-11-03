# IMAP

Watch for new emails and copy, move, mark or delete them over IMAP.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-imap'
  version: '0.6.2'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Enter your email provider's IMAP settings. Their help pages list them.
>
> **Gmail**
> 1. Turn on IMAP in [Gmail settings](https://support.google.com/mail/answer/7126229?hl=en).
> 2. Create an [App Password](https://support.google.com/accounts/answer/185833?hl=en) and use it as the password.
> 3. Use host `imap.gmail.com`, port `993`, and turn on **Use TLS**.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `host` | string | yes |  | Host. Your provider's IMAP server address. |
| `username` | string | yes |  | Username. Usually your full email address. |
| `password` | string | yes |  | Password. Your email password, or an App Password for Gmail. |
| `port` | number | yes | `143` | Port. Usually 993 with TLS on, or 143 with TLS off. |
| `tls` | boolean | yes | `false` | Use TLS. Turn on for port 993. Most providers require it. |
| `validateCertificates` | boolean | yes | `false` | Validate TLS Certificates. Reject servers whose certificate is invalid or self-signed. |

## Actions

### `mark_email_read`

**Mark Email as Read/Unread.** Sets the read/unread (\Seen) flag on a specific email in an IMAP mailbox, identified by its message UID. Use to mark a message as read after processing it or to flag one as unread. Requires the exact mailbox folder and UID; this is idempotent since it sets the flag to the chosen target state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mailbox` | string | yes |  | Folder. Folder the email is in. A value the product loads from the provider, such as an id; write the value itself. |
| `uid` | number | yes |  | Message UID. Map uid from the New Email trigger. It's only valid in its folder. |
| `markAsRead` | boolean | no | `true` | Mark as Read. Turn off to mark the email as unread instead. |

Output fields:

- `success`: Success (boolean)

### `copy_email`

**Copy Email.** Copies an email (by message UID) from a source IMAP folder into a target folder, leaving the original in place. Use to duplicate a message into another mailbox without removing it from the source. Requires the source folder, target folder, and the UID; not idempotent since each call appends another copy with a new UID. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceMailbox` | string | yes |  | Source Folder. Folder the email is in. A value the product loads from the provider, such as an id; write the value itself. |
| `uid` | number | yes |  | Message UID. Map uid from the New Email trigger. It's only valid in its folder. |
| `targetMailbox` | string | yes |  | Target Folder. Folder to put the copy in. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `newUid`: New Message UID (number)

### `move_email`

**Move Email.** Moves an email (by message UID) from a source IMAP folder to a target folder, removing it from the source. Use to file, archive, or send a message to a Trash folder. Requires the source folder, target folder, and the UID; not idempotent since after the move the message no longer exists at the source UID and a repeat call cannot find it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceMailbox` | string | yes |  | Source Folder. Folder the email is in. A value the product loads from the provider, such as an id; write the value itself. |
| `uid` | number | yes |  | Message UID. Map uid from the New Email trigger. It's only valid in its folder. |
| `targetMailbox` | string | yes |  | Target Folder. Folder to move the email to. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `newUid`: New Message UID (number)

### `delete_email`

**Delete Email.** Permanently deletes an email (by message UID) from an IMAP folder; this cannot be undone and does not move the message to Trash (use Move Email for that). Use only when irreversible removal is intended. Requires the folder and the UID; destructive and not idempotent since a repeat call cannot find the already-deleted message. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mailbox` | string | yes |  | Folder. Folder the email is in. A value the product loads from the provider, such as an id; write the value itself. |
| `uid` | number | yes |  | Message UID. Map uid from the New Email trigger. It's only valid in its folder. |

Output fields:

- `success`: Success (boolean)

### `list_folders`

**List Folders.** Lists all IMAP folders with their full path, delimiter, parent and detected special-use role (Trash, Drafts, Sent, Junk, Archive, All). Call first to learn exact folder paths for every other IMAP tool. special_use_source "name" means the role was guessed from the folder name. Set include_counts only when counts are needed: it costs one STATUS per folder. Read-only, safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `include_counts` | boolean | no | `false` | Include Message Counts. Also return the total and unread message count of each folder. Slower on accounts with many folders. |

Output fields:

- `folders`: Folders
- `folders[].path`: Path
- `folders[].name`: Name
- `folders[].delimiter`: Delimiter
- `folders[].parent_path`: Parent Path
- `folders[].special_use`: Special Use
- `folders[].special_use_source`: Special-Use Source
- `folders[].flags`: Flags
- `folders[].subscribed`: Subscribed (boolean)
- `folders[].messages`: Messages (number)
- `folders[].unseen`: Unread (number)
- `count`: Count (number)

### `get_folder_status`

**Get Folder Status.** Returns the total, unread and recent message counts plus uid_next and uid_validity of one IMAP folder without opening it. Use for a quick unread count or to check whether UIDs from an earlier search are still valid; use search_emails to list the messages themselves. Read-only, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder` | string | yes | `"INBOX"` | Folder. Folder path from list_folders. |

Output fields:

- `path`: Path
- `messages`: Messages (number)
- `unseen`: Unread (number)
- `recent`: Recent (number)
- `uid_next`: Next UID (number)
- `uid_validity`: UID Validity
- `highest_modseq`: Highest Mod-Sequence

### `create_folder`

**Create Folder.** Creates an IMAP folder, optionally nested under an existing parent path from list_folders. Use before move_emails or copy_emails when the target folder does not exist yet. If the folder already exists it returns created=false instead of failing, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Folder Name. Name of the new folder. Must not contain the server folder separator; use Parent Folder for nesting. |
| `parent_folder` | string | no |  | Parent Folder. Optional existing folder path from list_folders to create the folder inside. |

Output fields:

- `path`: Path
- `created`: Created (boolean)

### `rename_folder`

**Rename Folder.** Renames an IMAP folder, or moves it under another parent, by giving its full new path. INBOX and folders the server flags as special-use (Trash, Sent, Drafts and so on) cannot be renamed. Not idempotent: a repeat call fails because the old path no longer exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder` | string | yes |  | Folder. Current folder path from list_folders. |
| `new_path` | string | yes |  | New Path. Full new path, using the folder separator from list_folders for nesting (for example "Projects/2026"). |

Output fields:

- `path`: Old Path
- `new_path`: New Path

### `delete_folder`

**Delete Folder.** Permanently deletes an IMAP folder. On most servers every message inside is destroyed; on Gmail only the label is removed. Refuses INBOX, folders that have child folders, and any folder with a special-use role (Trash, Sent, Drafts, Junk, Archive, All), including roles guessed from the folder name. Not idempotent: a repeat call fails because the folder is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder` | string | yes |  | Folder. Folder path from list_folders. |

Output fields:

- `path`: Path
- `deleted`: Deleted (boolean)

### `get_quota`

**Get Quota.** Returns the storage (in bytes) and message-count usage and limits of the quota root that applies to a folder, via the IMAP QUOTA extension. Use to check whether the mailbox is near full. has_quota=false means the server reports no quota for that folder. Fails with a clear message when the server lacks QUOTA. Read-only, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder` | string | yes | `"INBOX"` | Folder. Folder path from list_folders. |

Output fields:

- `path`: Path
- `has_quota`: Has Quota (boolean)
- `storage_used_bytes`: Storage Used (filesize)
- `storage_limit_bytes`: Storage Limit (filesize)
- `messages_used`: Messages Used (number)
- `messages_limit`: Messages Limit (number)

### `search_emails`

**Search Emails.** Searches one IMAP folder and returns envelope summaries (uid, subject, from, to, date, flags, size) newest first, without bodies. This is the source of message UIDs for every other IMAP email tool; pass the returned uid_validity along to detect stale UIDs. All filters are combined with AND; with no filters it lists the newest messages. Use get_email to read a full message. Read-only, safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder` | string | yes | `"INBOX"` | Folder. Folder path from list_folders. |
| `from` | string | no |  | From. Text contained in the From header. |
| `to` | string | no |  | To. Text contained in the To header. |
| `subject` | string | no |  | Subject. Text contained in the subject. |
| `body` | string | no |  | Body. Text contained in the message body. |
| `text` | string | no |  | Text. Text contained anywhere in the headers or body. |
| `message_id` | string | no |  | Message-ID. Exact Message-ID header value, for example <abc@example.com>. |
| `since` | ISO date-time string | no |  | Received Since. Only messages received on or after this date. Day granularity on most servers (time of day is ignored). |
| `before` | ISO date-time string | no |  | Received Before. Only messages received before this date. Day granularity on most servers (time of day is ignored). |
| `read_status` | string | no |  | Read Status. Filter by read state. Leave empty for both. One of `"read"`, `"unread"`. |
| `flagged` | string | no |  | Flagged. Filter by the flagged (starred) state. Leave empty for both. One of `"flagged"`, `"unflagged"`. |
| `keyword` | string | no |  | Keyword. Only messages carrying this custom keyword (IMAP flag). |
| `limit` | number | no | `25` | Limit. Maximum number of emails to return (1-100). |

Output fields:

- `folder`: Folder
- `uid_validity`: UID Validity
- `total_matches`: Total Matches (number)
- `count`: Returned (number)
- `emails`: Emails
- `emails[].uid`: Message UID (number)
- `emails[].message_id`: Message-ID
- `emails[].in_reply_to`: In Reply To
- `emails[].subject`: Subject
- `emails[].date`: Date (datetime)
- `emails[].internal_date`: Received At (datetime)
- `emails[].from_name`: From Name
- `emails[].from_address`: From Email (email)
- `emails[].to`: To
- `emails[].to[].address`: Email (email)
- `emails[].to[].name`: Name
- `emails[].cc`: Cc
- `emails[].cc[].address`: Email (email)
- `emails[].cc[].name`: Name
- `emails[].flags`: Flags
- `emails[].seen`: Read (boolean)
- `emails[].flagged`: Flagged (boolean)
- `emails[].answered`: Answered (boolean)
- `emails[].size`: Size (filesize)

### `get_email`

**Get Email.** Fetches and parses one email by UID: headers, text and HTML bodies, flags, and attachments saved as files. Use after search_emails to read a specific message. The message is not marked as read. Pass the uid_validity from the same search_emails call so a stale UID is reported instead of returning an unrelated email. Messages over 25 MB are refused. Read-only, safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder` | string | yes | `"INBOX"` | Folder. Folder path from list_folders that contains the email. |
| `uid` | number | yes |  | Message UID. UID from search_emails in the same folder. |
| `uid_validity` | string | no |  | UID Validity. The uid_validity returned by search_emails. When set and the folder has changed, the call fails instead of reading a stale UID. |

Output fields:

- `folder`: Folder
- `uid`: Message UID (number)
- `uid_validity`: UID Validity
- `message_id`: Message-ID
- `in_reply_to`: In Reply To
- `references`: References
- `subject`: Subject
- `date`: Date (datetime)
- `internal_date`: Received At (datetime)
- `from_name`: From Name
- `from_address`: From Email (email)
- `to`: To
- `to[].address`: Email (email)
- `to[].name`: Name
- `cc`: Cc
- `cc[].address`: Email (email)
- `cc[].name`: Name
- `bcc`: Bcc
- `bcc[].address`: Email (email)
- `bcc[].name`: Name
- `reply_to`: Reply To
- `reply_to[].address`: Email (email)
- `reply_to[].name`: Name
- `text`: Text Body
- `html`: HTML Body (html)
- `flags`: Flags
- `seen`: Read (boolean)
- `flagged`: Flagged (boolean)
- `size`: Size (filesize)
- `attachments`: Attachments
- `attachments[].filename`: File Name
- `attachments[].content_type`: Content Type
- `attachments[].size`: Size (filesize)
- `attachments[].file`: File

### `update_email_flags`

**Update Email Flags.** Changes flags on one or more emails in a folder: read/unread, flagged/unflagged, answered, and custom keywords (labels). Only the options you set are changed; everything else is left untouched. Use trash_emails or delete_emails to remove messages instead. uid_validity is required and must come from the search_emails call that produced these UIDs; a mismatch fails the call so stale UIDs cannot re-flag the wrong emails. Sets a target state, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder` | string | yes | `"INBOX"` | Folder. Folder path from list_folders that contains the emails. |
| `uids` | array | yes |  | Message UIDs. UIDs from search_emails in the same folder (up to 500). UIDs that no longer exist are reported in not_found_uids. |
| `uid_validity` | string | yes |  | UID Validity. The uid_validity returned by the search_emails call that produced these UIDs. If the folder UIDVALIDITY has changed the UIDs are stale and the call fails instead of acting on unrelated emails. |
| `read` | string | no |  | Read Status. Leave empty to keep the current read status. One of `"mark_read"`, `"mark_unread"`. |
| `flagged` | string | no |  | Flagged. Leave empty to keep the current flagged status. One of `"flag"`, `"unflag"`. |
| `answered` | string | no |  | Answered. Leave empty to keep the current answered status. One of `"mark_answered"`, `"unmark_answered"`. |
| `add_keywords` | array | no |  | Add Keywords. Custom keywords to add, for example "invoice". |
| `remove_keywords` | array | no |  | Remove Keywords. Custom keywords to remove. |

Output fields:

- `folder`: Folder
- `uid_validity`: UID Validity
- `emails`: Emails
- `emails[].uid`: Message UID (number)
- `emails[].flags`: Flags
- `emails[].seen`: Read (boolean)
- `emails[].flagged`: Flagged (boolean)
- `emails[].answered`: Answered (boolean)
- `not_found_uids`: UIDs Not Found

### `move_emails`

**Move Emails.** Moves one or more emails by UID from a source folder to an existing target folder. Use trash_emails or archive_emails when the destination is the Trash or Archive folder, and create_folder first if the target does not exist. UIDs that no longer exist are reported, not failed. uid_validity is required and must come from the search_emails call that produced these UIDs; a mismatch fails the call so stale UIDs cannot move the wrong emails. Refuses on servers that support neither MOVE nor UIDPLUS. Not idempotent: moved UIDs are gone from the source. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source_folder` | string | yes | `"INBOX"` | Source Folder. Folder path from list_folders that contains the emails. |
| `uids` | array | yes |  | Message UIDs. UIDs from search_emails in the same folder (up to 500). UIDs that no longer exist are reported in not_found_uids. |
| `target_folder` | string | yes |  | Target Folder. Existing folder path from list_folders to move the emails into. |
| `uid_validity` | string | yes |  | UID Validity. The uid_validity returned by the search_emails call that produced these UIDs. If the folder UIDVALIDITY has changed the UIDs are stale and the call fails instead of acting on unrelated emails. |

Output fields:

- `source_folder`: Source Folder
- `source_uid_validity`: Source UID Validity
- `target_uid_validity`: Target UID Validity
- `results`: Results
- `results[].uid`: Original UID (number)
- `results[].new_uid`: New UID (number)
- `count`: Count (number)
- `not_found_uids`: UIDs Not Found
- `target_folder`: Target Folder

### `copy_emails`

**Copy Emails.** Copies one or more emails by UID from a source folder into an existing target folder, leaving the originals in place. Use move_emails to relocate instead of duplicate. uid_validity is required and must come from the search_emails call that produced these UIDs; a mismatch fails the call so stale UIDs cannot copy the wrong emails. UIDs that no longer exist are reported, not failed. Not idempotent: every call adds another copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `source_folder` | string | yes | `"INBOX"` | Source Folder. Folder path from list_folders that contains the emails. |
| `uids` | array | yes |  | Message UIDs. UIDs from search_emails in the same folder (up to 500). UIDs that no longer exist are reported in not_found_uids. |
| `target_folder` | string | yes |  | Target Folder. Existing folder path from list_folders to copy the emails into. |
| `uid_validity` | string | yes |  | UID Validity. The uid_validity returned by the search_emails call that produced these UIDs. If the folder UIDVALIDITY has changed the UIDs are stale and the call fails instead of acting on unrelated emails. |

Output fields:

- `source_folder`: Source Folder
- `source_uid_validity`: Source UID Validity
- `target_uid_validity`: Target UID Validity
- `results`: Results
- `results[].uid`: Original UID (number)
- `results[].new_uid`: New UID (number)
- `count`: Count (number)
- `not_found_uids`: UIDs Not Found
- `target_folder`: Target Folder

### `trash_emails`

**Move Emails to Trash.** Moves one or more emails by UID to the mailbox Trash folder, found automatically. This is the recoverable way to remove mail; prefer it over delete_emails. When special_use_source is "name", the Trash folder was guessed from its name. Fails, naming move_emails, if no Trash folder exists; use delete_emails for mail already in Trash. uid_validity is required and must come from the search_emails call that produced these UIDs; a mismatch fails the call so stale UIDs cannot trash the wrong emails. Not idempotent: trashed UIDs are gone from the source. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder` | string | yes | `"INBOX"` | Folder. Folder path from list_folders that contains the emails. |
| `uids` | array | yes |  | Message UIDs. UIDs from search_emails in the same folder (up to 500). UIDs that no longer exist are reported in not_found_uids. |
| `uid_validity` | string | yes |  | UID Validity. The uid_validity returned by the search_emails call that produced these UIDs. If the folder UIDVALIDITY has changed the UIDs are stale and the call fails instead of acting on unrelated emails. |

Output fields:

- `source_folder`: Source Folder
- `source_uid_validity`: Source UID Validity
- `target_uid_validity`: Target UID Validity
- `results`: Results
- `results[].uid`: Original UID (number)
- `results[].new_uid`: New UID (number)
- `count`: Count (number)
- `not_found_uids`: UIDs Not Found
- `destination_folder`: Destination Folder
- `special_use_source`: Special-Use Source

### `archive_emails`

**Archive Emails.** Moves one or more emails by UID out of a folder into the mailbox Archive folder, found automatically (on Gmail, All Mail). When special_use_source is "name", the Archive folder was guessed from its name. Fails, naming move_emails, if no Archive folder exists. uid_validity is required and must come from the search_emails call that produced these UIDs; a mismatch fails the call so stale UIDs cannot archive the wrong emails. Not idempotent: archived UIDs are gone from the source. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder` | string | yes | `"INBOX"` | Folder. Folder path from list_folders that contains the emails. |
| `uids` | array | yes |  | Message UIDs. UIDs from search_emails in the same folder (up to 500). UIDs that no longer exist are reported in not_found_uids. |
| `uid_validity` | string | yes |  | UID Validity. The uid_validity returned by the search_emails call that produced these UIDs. If the folder UIDVALIDITY has changed the UIDs are stale and the call fails instead of acting on unrelated emails. |

Output fields:

- `source_folder`: Source Folder
- `source_uid_validity`: Source UID Validity
- `target_uid_validity`: Target UID Validity
- `results`: Results
- `results[].uid`: Original UID (number)
- `results[].new_uid`: New UID (number)
- `count`: Count (number)
- `not_found_uids`: UIDs Not Found
- `destination_folder`: Destination Folder
- `special_use_source`: Special-Use Source

### `delete_emails`

**Delete Emails Permanently.** Permanently deletes (expunges) one or more emails by UID; this cannot be undone. Prefer trash_emails unless permanent removal is explicitly wanted, for example emptying mail that is already in Trash. On Gmail, deleting from a label folder only removes that label. Refuses on servers without UIDPLUS, where it would expunge other messages too. uid_validity is required and must come from the search_emails call that produced these UIDs; a mismatch fails the call so stale UIDs cannot delete the wrong emails. Not idempotent: a repeat call reports the UIDs as not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder` | string | yes | `"INBOX"` | Folder. Folder path from list_folders that contains the emails. |
| `uids` | array | yes |  | Message UIDs. UIDs from search_emails in the same folder (up to 500). UIDs that no longer exist are reported in not_found_uids. |
| `uid_validity` | string | yes |  | UID Validity. The uid_validity returned by the search_emails call that produced these UIDs. If the folder UIDVALIDITY has changed the UIDs are stale and the call fails instead of acting on unrelated emails. |

Output fields:

- `folder`: Folder
- `deleted_uids`: Deleted UIDs
- `not_deleted_uids`: UIDs Not Deleted
- `not_found_uids`: UIDs Not Found

### `create_draft`

**Create Draft.** Saves a new draft (not sent) to the mailbox Drafts folder, found automatically, or to a folder you name. IMAP cannot send mail; use an SMTP or Gmail tool to send. Set in_reply_to to a Message-ID from get_email to thread the draft as a reply (only that one Message-ID is referenced). Not idempotent: every call saves another draft. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | array | yes |  | To. Recipients, each "name@example.com" or "Name <name@example.com>". |
| `cc` | array | no |  | Cc. Cc recipients. |
| `bcc` | array | no |  | Bcc. Bcc recipients. |
| `subject` | string | no |  | Subject. |
| `text` | string | no |  | Text Body. Plain-text body. Provide this, an HTML body, or both. |
| `html` | string | no |  | HTML Body. HTML body. Provide this, a text body, or both. |
| `from` | string | no |  | From. Sender address. Defaults to the connection username when it is an email address. |
| `in_reply_to` | string | no |  | In Reply To. Message-ID of the email being answered, for example <abc@example.com>. |
| `folder` | string | no |  | Drafts Folder. Folder path to save the draft in. Leave empty to use the Drafts folder. |

Output fields:

- `folder`: Folder
- `uid`: Draft UID (number)
- `uid_validity`: UID Validity
- `message_id`: Message-ID

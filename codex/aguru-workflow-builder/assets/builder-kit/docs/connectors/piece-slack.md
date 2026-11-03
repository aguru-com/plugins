# Slack

Channel-based messaging platform

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-slack'
  version: '0.23.1'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Authenticate via a Slack OAuth flow.

### `CUSTOM_AUTH`: Bot Token

> Authenticate using a Slack bot token (and optional user token).

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `botToken` | string | yes |  | Bot Token. The bot token for your Slack app (starts with xoxb-) |
| `userToken` | string | no |  | User Token. Optional user token for actions that require user-level access (starts with xoxp-) |

## Actions

### `slack-add-reaction-to-message`

**Add Reaction to Message.** Add an emoji reaction to a specific message identified by its channel and timestamp, optionally reacting as the authenticated user instead of the bot. Adding the same reaction twice has no extra effect (Slack returns an already-reacted error), so the end state is stable. Provide the emoji name without colons, e.g. thumbsup. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `onlyBotChannels` | boolean | no | `true` | Only Channels the Bot Is In. Show only channels the bot is a member of. |
| `channel` | string | yes |  | Channel. Private channels appear only after the bot is added to them. A value the product loads from the provider, such as an id; write the value itself. |
| `ts` | string | yes |  | Message Timestamp. Timestamp of the target message, from its link or a trigger output. |
| `reaction` | string | yes |  | Emoji. Emoji name without colons. |
| `reactAsUser` | boolean | no | `false` | React as User. Add the reaction as the connected user instead of the bot. |

### `send_direct_message`

**Send Message To A User.** Send a direct message to a single user by user ID, with optional Block Kit blocks, custom username/icon, and link unfurling. Each call posts a new DM, so it is not idempotent. Use this to message one person privately; use Send Message To A Channel to post in a channel. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Search by name or handle. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | no |  | Message. Slack mrkdwn is supported. Empty sends blocks only. |
| `username` | string | no |  | Username. Overrides the bot's display name for this message. |
| `profilePicture` | string | no |  | Profile Picture. Image URL used as the sender's avatar. |
| `iconEmoji` | string | no |  | Icon Emoji. Emoji used as the sender's avatar. |
| `mentionOriginFlow` | boolean | no | `false` | Mention Origin Flow. Append a link to this flow at the end of the message. |
| `blocks` | JSON | no | `[]` | Block Kit Blocks. JSON array of blocks from the Block Kit Builder. |
| `unfurlLinks` | boolean | no | `true` | Unfurl Links. Show link previews in the message. |

Output fields:

- `channel`: Channel ID
- `ts`: Timestamp
- `message`: Message
- `message.ts`: Timestamp
- `message.user`: User ID
- `message.text`: Text
- `message.type`: Type
- `message.subtype`: Subtype
- `message.bot_id`: Bot ID
- `message.team`: Team ID
- `message.thread_ts`: Thread Timestamp
- `message.reply_count`: Reply Count (number)
- `message.reply_users_count`: Reply Users Count (number)
- `message.latest_reply`: Latest Reply Timestamp
- `message.is_locked`: Is Locked (boolean)
- `message.edited`: Edited
- `message.edited.user`: Edited By User ID
- `message.edited.ts`: Edited At (Timestamp)
- `message.reactions`: Reactions
- `message.reactions[].name`: Emoji Name
- `message.reactions[].count`: Count (number)

### `send_message_to_multiple_users`

**Send Message To Multiple Users.** Sends a direct message to many Slack users in parallel and reports which sends succeeded and which failed. Replaces a loop of single Send Message To A User steps. Either one shared message for everyone, or a personal message per user. Each call posts new DMs, so it is not idempotent, and a retry re-sends to everyone. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mode` | string | yes | `"same_message"` | Message Mode. Send everyone the same message, or give each user their own. One of `"same_message"`, `"personal_message"`. |
| `recipients` | object | yes |  | Recipients. An object whose fields depend on other inputs; the product shows them. |
| `username` | string | no |  | Username. Overrides the bot's display name for this message. |
| `profilePicture` | string | no |  | Profile Picture. Image URL used as the sender's avatar. |
| `iconEmoji` | string | no |  | Icon Emoji. Emoji used as the sender's avatar. |
| `mentionOriginFlow` | boolean | no | `false` | Mention Origin Flow. Append a link to this flow at the end of the message. |
| `blocks` | JSON | no | `[]` | Block Kit Blocks. JSON array of blocks from the Block Kit Builder. |
| `unfurlLinks` | boolean | no | `true` | Unfurl Links. Enable link unfurling for these messages. |
| `concurrency` | number | no | `5` | Parallel Sends. Messages sent at once. Allows 16 recipients per send, up to 80. |

Output fields:

- `sent`: Sent
- `sent[].userId`: User ID
- `sent[].channel`: Channel ID
- `sent[].ts`: Timestamp
- `failed`: Failed
- `failed[].userId`: User ID
- `failed[].error`: Error
- `summary`: Summary
- `summary.total`: Total (number)
- `summary.sentCount`: Sent Count (number)
- `summary.failedCount`: Failed Count (number)

### `send_channel_message`

**Send Message To A Channel.** Post a message to a channel, with optional Block Kit blocks, file attachment, custom username/icon, and link unfurling; can post as the bot or as the authenticated user. Provide a thread timestamp to reply within a thread (and optionally broadcast that reply to the channel). Each call posts a new message, so it is not idempotent; requires either message text or blocks. Use Send Message To A User for a private DM. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `onlyBotChannels` | boolean | no | `true` | Only Channels the Bot Is In. Show only channels the bot is a member of. |
| `channel` | string | yes |  | Channel. Private channels appear only after the bot is added to them. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | no |  | Message. Slack mrkdwn is supported. Empty sends blocks only. |
| `sendAsBot` | boolean | no | `true` | Send as Bot. Off posts as the connected user and needs a user token. |
| `threadTs` | string | no |  | Reply to Thread. Timestamp or link of the parent message to reply under. |
| `file` | file | no |  | Attachment. Sent with the message as its comment. Other options are skipped. Files are not supported; an action that needs one fails. |
| `username` | string | no |  | Username. Overrides the bot's display name for this message. |
| `profilePicture` | string | no |  | Profile Picture. Image URL used as the sender's avatar. |
| `iconEmoji` | string | no |  | Icon Emoji. Emoji used as the sender's avatar. |
| `replyBroadcast` | boolean | no | `false` | Also Post to Channel. When replying in a thread, also show the reply in the channel. |
| `mentionOriginFlow` | boolean | no | `false` | Mention Origin Flow. Append a link to this flow at the end of the message. |
| `unfurlLinks` | boolean | no | `true` | Unfurl Links. Show link previews in the message. |
| `blocks` | JSON | no | `[]` | Block Kit Blocks. JSON array of blocks from the Block Kit Builder. |

Output fields:

- `channel`: Channel ID
- `ts`: Timestamp
- `message`: Message
- `message.ts`: Timestamp
- `message.user`: User ID
- `message.text`: Text
- `message.type`: Type
- `message.subtype`: Subtype
- `message.bot_id`: Bot ID
- `message.team`: Team ID
- `message.thread_ts`: Thread Timestamp
- `message.reply_count`: Reply Count (number)
- `message.reply_users_count`: Reply Users Count (number)
- `message.latest_reply`: Latest Reply Timestamp
- `message.is_locked`: Is Locked (boolean)
- `message.edited`: Edited
- `message.edited.user`: Edited By User ID
- `message.edited.ts`: Edited At (Timestamp)
- `message.reactions`: Reactions
- `message.reactions[].name`: Emoji Name
- `message.reactions[].count`: Count (number)

### `request_approval_direct_message`

**Request Approval from A User.** Direct-message one Slack user an approval request with Approve/Disapprove buttons and pause the flow until they respond. Pick this for a private one-to-one approval gate; use Request Action in A Channel to ask a whole channel. Not idempotent: each run sends a new DM and creates a fresh wait. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Search by name or handle. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Message. Slack mrkdwn formatting is supported. |
| `username` | string | no |  | Username. Overrides the bot's display name for this message. |
| `profilePicture` | string | no |  | Profile Picture. Image URL used as the sender's avatar. |
| `mentionOriginFlow` | boolean | no | `false` | Mention Origin Flow. Append a link to this flow at the end of the message. |

Output fields:

- `approved`: Approved (boolean)
- `messageTs`: Message Timestamp

### `request_approval_message`

**Request Approval in a Channel.** Post a message with Approve/Disapprove buttons to a channel and pause the flow until someone clicks one, then resume with the boolean outcome. Use this for a simple approval gate visible to a channel; use Request Action from A User for a private DM with custom action choices. Posts a new message each run, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `onlyBotChannels` | boolean | no | `true` | Only Channels the Bot Is In. Show only channels the bot is a member of. |
| `channel` | string | yes |  | Channel. Private channels appear only after the bot is added to them. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Message. Slack mrkdwn formatting is supported. |
| `username` | string | no |  | Username. Overrides the bot's display name for this message. |
| `profilePicture` | string | no |  | Profile Picture. Image URL used as the sender's avatar. |
| `mentionOriginFlow` | boolean | no | `false` | Mention Origin Flow. Append a link to this flow at the end of the message. |

Output fields:

- `approved`: Approved (boolean)
- `messageTs`: Message Timestamp

### `request_action_direct_message`

**Request Action from A User.** Send a direct message with interactive buttons to a user and pause the flow until that user clicks one of the defined actions, then resume with their choice. Use this for a human-in-the-loop decision via DM; use Request Approval in a Channel for a simple approve/disapprove gate in a channel. Sends a new message each run, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User. Search by name or handle. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Message. Slack mrkdwn formatting is supported. |
| `actions` | array | yes |  | Action Buttons. Each button becomes a choice the recipient can click. Each item: { `label`, `style`? }. |
| `blocks` | JSON | no | `[]` | Blocks. Optional Block Kit blocks rendered above the action buttons, e.g. dropdowns. Give each interactive element a block_id and action_id so its selection appears under payload.state.values when an action is clicked. Do not use the block_id "actions", it is reserved for the action buttons. See https://ap… |
| `username` | string | no |  | Username. Overrides the bot's display name for this message. |
| `profilePicture` | string | no |  | Profile Picture. Image URL used as the sender's avatar. |
| `mentionOriginFlow` | boolean | no | `false` | Mention Origin Flow. Append a link to this flow at the end of the message. |

Output fields:

- `action`: Selected Action
- `payload`: Payload

### `request_action_message`

**Request Action in A Channel.** Post a message with interactive action buttons to a Slack channel and pause the flow until a recipient clicks one, then resume with the chosen action. Pick this for human-in-the-loop branching in a shared channel; use Request Approval from A User for a private approve/disapprove DM. Not idempotent: each run posts a new message and creates a fresh wait. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `onlyBotChannels` | boolean | no | `true` | Only Channels the Bot Is In. Show only channels the bot is a member of. |
| `channel` | string | yes |  | Channel. Private channels appear only after the bot is added to them. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Message. Slack mrkdwn formatting is supported. |
| `actions` | array | yes |  | Action Buttons. Each button becomes a choice the recipient can click. Each item: { `label`, `style`? }. |
| `blocks` | JSON | no | `[]` | Blocks. Optional Block Kit blocks rendered above the action buttons, e.g. dropdowns. Give each interactive element a block_id and action_id so its selection appears under payload.state.values when an action is clicked. Do not use the block_id "actions", it is reserved for the action buttons. See https://ap… |
| `threadTs` | string | no |  | Reply to Thread. Timestamp or link of the parent message to reply under. |
| `username` | string | no |  | Username. Overrides the bot's display name for this message. |
| `profilePicture` | string | no |  | Profile Picture. Image URL used as the sender's avatar. |
| `replyBroadcast` | boolean | no | `false` | Also Post to Channel. When replying in a thread, also show the reply in the channel. |
| `mentionOriginFlow` | boolean | no | `false` | Mention Origin Flow. Append a link to this flow at the end of the message. |

Output fields:

- `action`: Selected Action
- `payload`: Payload

### `uploadFile`

**Upload File.** Upload a file to Slack, optionally sharing it into a channel and setting a title and filename. Each call creates a new file, so it is not idempotent. To attach a file inline with a message instead, use the attachment option on Send Message To A Channel. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. Files are not supported; an action that needs one fails. |
| `title` | string | no |  | Title. Shown as the file's title in Slack. |
| `filename` | string | no |  | Filename. File name including its extension. |
| `onlyBotChannels` | boolean | no | `true` | Only Channels the Bot Is In. Show only channels the bot is a member of. |
| `channel` | string | no |  | Channel. Private channels appear only after the bot is added to them. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `files`: Files
- `files[].id`: File ID
- `files[].name`: Name
- `files[].title`: Title
- `files[].mimetype`: MIME Type
- `files[].filetype`: File Type
- `files[].pretty_type`: Pretty Type
- `files[].size`: Size (filesize)
- `files[].user`: Uploaded By User ID
- `files[].created`: Created (Unix Timestamp) (number)
- `files[].url_private`: Private URL (url)
- `files[].url_private_download`: Download URL (url)
- `files[].permalink`: Permalink (url)
- `files[].permalink_public`: Public Permalink (url)
- `files[].is_public`: Is Public (boolean)
- `files[].is_external`: Is External (boolean)

### `get-file`

**Get File.** Look up metadata for a single Slack file by its file ID and download its contents. Pick this when you have a file ID (e.g. from a message trigger payload) and need the file details or bytes. Read-only and idempotent; fails if the file has no accessible download URL. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileId` | string | yes |  | File ID. Found in trigger output or the file link. |

Output fields:

- `id`: File ID
- `name`: Name
- `title`: Title
- `mimetype`: MIME Type
- `filetype`: File Type
- `pretty_type`: Pretty Type
- `size`: Size (filesize)
- `user`: Uploaded By User ID
- `created`: Created (Unix Timestamp) (number)
- `url_private`: Private URL (url)
- `url_private_download`: Download URL (url)
- `permalink`: Permalink (url)
- `permalink_public`: Public Permalink (url)
- `is_public`: Is Public (boolean)
- `is_external`: Is External (boolean)
- `data`: File Data URL (url)

### `searchMessages`

**Search Messages.** Search across the workspace for messages matching a query string and return all matching messages, paging through every result; read-only and repeatable. Requires a user token (search is not available to bot tokens). Use this to find messages anywhere by content; use Get channel history or Get Message by Timestamp when you already know the channel. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Slack search syntax works, e.g. from:@jane in:#general. |

Output fields:

- `[].ts`: Timestamp
- `[].text`: Text
- `[].user`: User ID
- `[].username`: Username
- `[].type`: Type
- `[].channel`: Channel
- `[].channel.id`: Channel ID
- `[].channel.name`: Name
- `[].channel.is_private`: Is Private (boolean)
- `[].channel.is_archived`: Is Archived (boolean)
- `[].permalink`: Permalink (url)
- `[].score`: Relevance Score (number)

### `slack-find-user-by-email`

**Find User by Email.** Look up a single Slack user by their exact email address, returning their profile and user ID. Pick this to resolve an email into a Slack user ID before messaging or referencing that user. Read-only and idempotent; errors if no workspace member matches the email. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Must match the email on the Slack profile. |

Output fields:

- `user`: User
- `user.id`: User ID
- `user.name`: Username
- `user.real_name`: Real Name
- `user.deleted`: Deleted (boolean)
- `user.is_admin`: Is Admin (boolean)
- `user.is_owner`: Is Owner (boolean)
- `user.is_bot`: Is Bot (boolean)
- `user.is_restricted`: Is Restricted (boolean)
- `user.tz`: Timezone
- `user.profile`: Profile
- `user.profile.email`: Email (email)
- `user.profile.real_name`: Real Name
- `user.profile.display_name`: Display Name
- `user.profile.title`: Title
- `user.profile.phone`: Phone
- `user.profile.image_192`: Avatar (image)
- `user.profile.status_text`: Status Text
- `user.profile.status_emoji`: Status Emoji
- `user.profile.first_name`: First Name
- `user.profile.last_name`: Last Name

### `slack-find-user-by-handle`

**Find User by Handle.** Look up a workspace member by their Slack handle (display name without the leading @) and return that member; read-only and repeatable. Pick this when you only know the handle and need the user object or ID; use Find User by ID when you already have the user ID. Scans the full member list and errors if no exact display-name match is found. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `handle` | string | yes |  | Handle. Display name without the leading @. |

Output fields:

- `id`: User ID
- `name`: Username
- `real_name`: Real Name
- `deleted`: Deleted (boolean)
- `is_admin`: Is Admin (boolean)
- `is_owner`: Is Owner (boolean)
- `is_bot`: Is Bot (boolean)
- `is_restricted`: Is Restricted (boolean)
- `tz`: Timezone
- `profile`: Profile
- `profile.email`: Email (email)
- `profile.real_name`: Real Name
- `profile.display_name`: Display Name
- `profile.title`: Title
- `profile.phone`: Phone
- `profile.image_192`: Avatar (image)
- `profile.status_text`: Status Text
- `profile.status_emoji`: Status Emoji
- `profile.first_name`: First Name
- `profile.last_name`: Last Name

### `find-user-by-id`

**Find User by ID.** Fetch a user profile directly by their Slack user ID; read-only and repeatable. Pick this when you already have the user ID (the fastest, exact lookup); use Find User by Handle when you only know the display-name handle. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | User ID. Starts with U or W. |

Output fields:

- `profile`: Profile
- `profile.real_name`: Real Name
- `profile.display_name`: Display Name
- `profile.email`: Email (email)
- `profile.first_name`: First Name
- `profile.last_name`: Last Name
- `profile.title`: Title
- `profile.phone`: Phone
- `profile.status_text`: Status Text
- `profile.status_emoji`: Status Emoji
- `profile.image_192`: Avatar (image)
- `profile.team`: Team ID

### `listUsers`

**List Users.** List every member of the workspace, paging through all results, with toggles to include bots and disabled/deactivated users; read-only and repeatable. Use this to enumerate or scan all users; use Find User by ID or Find User by Handle when you already know which single user you want. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `includeBots` | boolean | no | `false` | Include Bots. Also return bot users. |
| `includeDisabled` | boolean | no | `false` | Include Deactivated Users. Also return deactivated accounts. |

Output fields:

- `[].id`: User ID
- `[].name`: Username
- `[].real_name`: Real Name
- `[].deleted`: Deleted (boolean)
- `[].is_admin`: Is Admin (boolean)
- `[].is_owner`: Is Owner (boolean)
- `[].is_bot`: Is Bot (boolean)
- `[].is_restricted`: Is Restricted (boolean)
- `[].tz`: Timezone
- `[].profile`: Profile
- `[].profile.email`: Email (email)
- `[].profile.real_name`: Real Name
- `[].profile.display_name`: Display Name
- `[].profile.title`: Title
- `[].profile.phone`: Phone
- `[].profile.image_192`: Avatar (image)
- `[].profile.status_text`: Status Text
- `[].profile.status_emoji`: Status Emoji
- `[].profile.first_name`: First Name
- `[].profile.last_name`: Last Name

### `updateMessage`

**Update Message.** Edit an already-posted Slack message in place, replacing its text and blocks, identified by channel and message timestamp (ts). Pick this to revise content the flow previously sent rather than posting a new one; use Delete Message to remove it instead. Idempotent: re-running with the same inputs leaves the message in the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `onlyBotChannels` | boolean | no | `true` | Only Channels the Bot Is In. Show only channels the bot is a member of. |
| `channel` | string | yes |  | Channel. Private channels appear only after the bot is added to them. A value the product loads from the provider, such as an id; write the value itself. |
| `ts` | string | yes |  | Message Timestamp. Timestamp of the target message, from its link or a trigger output. |
| `text` | string | no |  | Message. Slack mrkdwn is supported. Empty updates blocks only. |
| `mentionOriginFlow` | boolean | no | `false` | Mention Origin Flow. Append a link to this flow at the end of the message. |
| `blocks` | JSON | no | `[]` | Block Kit Blocks. JSON array of blocks from the Block Kit Builder. |

Output fields:

- `channel`: Channel ID
- `ts`: Timestamp
- `text`: Text
- `message`: Message
- `message.ts`: Timestamp
- `message.user`: User ID
- `message.text`: Text
- `message.type`: Type
- `message.subtype`: Subtype
- `message.bot_id`: Bot ID
- `message.team`: Team ID
- `message.thread_ts`: Thread Timestamp
- `message.reply_count`: Reply Count (number)
- `message.reply_users_count`: Reply Users Count (number)
- `message.latest_reply`: Latest Reply Timestamp
- `message.is_locked`: Is Locked (boolean)
- `message.edited`: Edited
- `message.edited.user`: Edited By User ID
- `message.edited.ts`: Edited At (Timestamp)
- `message.reactions`: Reactions
- `message.reactions[].name`: Emoji Name
- `message.reactions[].count`: Count (number)

### `delete-message`

**Delete Message.** Permanently delete one Slack message from a channel, identified by its timestamp (ts) and channel. Pick this to remove a previously posted message; to instead edit its content use Update Message. Not idempotent in effect though re-deleting an already-gone message errors, and deletion requires a user token with rights to remove that message. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `onlyBotChannels` | boolean | no | `true` | Only Channels the Bot Is In. Show only channels the bot is a member of. |
| `channel` | string | yes |  | Channel. Private channels appear only after the bot is added to them. A value the product loads from the provider, such as an id; write the value itself. |
| `ts` | string | yes |  | Message Timestamp. Timestamp of the target message, from its link or a trigger output. |

### `slack-create-channel`

**Create Channel.** Create a new public or private channel with the given name. Not idempotent: calling again with a name that already exists fails with a name-taken error rather than reusing the existing channel. Channel names are normalized by Slack (lowercased, spaces to hyphens). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channelName` | string | yes |  | Channel Name. Lowercase letters, numbers, dashes and underscores only. |
| `isPrivate` | boolean | no | `false` | Private Channel. Only invited members can see and join it. |

Output fields:

- `channel`: Channel
- `channel.id`: Channel ID
- `channel.name`: Name
- `channel.is_channel`: Is Channel (boolean)
- `channel.is_group`: Is Group (boolean)
- `channel.is_private`: Is Private (boolean)
- `channel.is_archived`: Is Archived (boolean)
- `channel.is_general`: Is General (boolean)
- `channel.is_member`: Is Member (boolean)
- `channel.is_shared`: Is Shared (boolean)
- `channel.created`: Created (Unix Timestamp) (number)
- `channel.creator`: Creator User ID
- `channel.num_members`: Member Count (number)
- `channel.topic`: Topic
- `channel.topic.value`: Value
- `channel.topic.creator`: Set By User ID
- `channel.topic.last_set`: Last Set (Unix Timestamp) (number)
- `channel.purpose`: Purpose
- `channel.purpose.value`: Value
- `channel.purpose.creator`: Set By User ID
- `channel.purpose.last_set`: Last Set (Unix Timestamp) (number)
- `channel.previous_names`: Previous Names

### `slack-update-profile`

**Update Profile.** Update basic profile fields (first name, last name, email) for the authenticated user, or for another user when an admin specifies a user ID; requires a user token. Setting the same values again is idempotent. Note that changing the email triggers Slack notification emails to both addresses, and editing another user is admin-only on paid teams. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `email` | string | no |  | Email. Slack notifies both the old and new address. |
| `userId` | string | no |  | User ID. Admins on paid plans only. Empty updates the connected user. |

Output fields:

- `profile`: Profile
- `profile.real_name`: Real Name
- `profile.display_name`: Display Name
- `profile.email`: Email (email)
- `profile.first_name`: First Name
- `profile.last_name`: Last Name
- `profile.title`: Title
- `profile.phone`: Phone
- `profile.status_text`: Status Text
- `profile.status_emoji`: Status Emoji
- `profile.image_192`: Avatar (image)
- `profile.team`: Team ID

### `getChannelHistory`

**Get Channel History.** Retrieve top-level messages from a known channel, paging through the full range and optionally bounded by oldest/latest timestamps; read-only and repeatable. Use this to read a channel you already have the ID for; use Search messages to find messages by content across the workspace, or Retrieve Thread Messages to read replies within a thread. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `onlyBotChannels` | boolean | no | `true` | Only Channels the Bot Is In. Show only channels the bot is a member of. |
| `channel` | string | yes |  | Channel. Private channels appear only after the bot is added to them. A value the product loads from the provider, such as an id; write the value itself. |
| `oldest` | number | no |  | Oldest. Unix timestamp; only later messages are returned. |
| `latest` | number | no |  | Latest. Unix timestamp; only earlier messages are returned. |
| `inclusive` | boolean | no | `false` | Inclusive. Include messages exactly at the oldest and latest timestamps. |
| `includeAllMetadata` | boolean | no | `false` | Include All Metadata. Return every metadata field Slack attaches to a message. |

Output fields:

- `[].ts`: Timestamp
- `[].user`: User ID
- `[].text`: Text
- `[].type`: Type
- `[].subtype`: Subtype
- `[].bot_id`: Bot ID
- `[].team`: Team ID
- `[].thread_ts`: Thread Timestamp
- `[].reply_count`: Reply Count (number)
- `[].reply_users_count`: Reply Users Count (number)
- `[].latest_reply`: Latest Reply Timestamp
- `[].is_locked`: Is Locked (boolean)
- `[].edited`: Edited
- `[].edited.user`: Edited By User ID
- `[].edited.ts`: Edited At (Timestamp)
- `[].reactions`: Reactions
- `[].reactions[].name`: Emoji Name
- `[].reactions[].count`: Count (number)

### `slack-set-user-status`

**Set User Status.** Set the authenticated user's custom status text and optional emoji, optionally with a Unix-timestamp expiration; requires a user token, not a bot token. This overwrites any existing status, so re-running with the same input is idempotent. Status text is capped at 100 characters. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Status Text. Up to 100 characters. |
| `emoji` | string | no |  | Emoji. Emoji name with colons. |
| `expiration` | number | no |  | Expires At. Unix timestamp in seconds. Empty keeps the status until cleared. |

Output fields:

- `profile`: Profile
- `profile.real_name`: Real Name
- `profile.display_name`: Display Name
- `profile.email`: Email (email)
- `profile.first_name`: First Name
- `profile.last_name`: Last Name
- `profile.title`: Title
- `profile.phone`: Phone
- `profile.status_text`: Status Text
- `profile.status_emoji`: Status Emoji
- `profile.image_192`: Avatar (image)
- `profile.team`: Team ID

### `markdownToSlackFormat`

**Markdown to Slack Format.** Convert standard Markdown into Slack's mrkdwn dialect so links, bold, and lists render correctly in messages; a pure local text transform that needs no auth and is fully repeatable for the same input. Use this to prepare text before sending it through a Slack message action.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `markdown` | string | yes |  | Markdown Text. Converted to Slack mrkdwn for use in a message. |

### `retrieveThreadMessages`

**Retrieve Thread Messages.** Retrieve the replies in a thread given the channel and the parent message timestamp; read-only and repeatable. Returns up to 10,000 replies per call; when has_more is true, pass response_metadata.next_cursor as the cursor to continue. The timestamp must be that of the parent message, not a reply. Use this to read a conversation thread; use Get channel history for top-level channel messages. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `onlyBotChannels` | boolean | no | `true` | Only Channels the Bot Is In. Show only channels the bot is a member of. |
| `channel` | string | yes |  | Channel. Private channels appear only after the bot is added to them. A value the product loads from the provider, such as an id; write the value itself. |
| `threadTs` | string | yes |  | Thread Timestamp. Timestamp or link of the thread's parent message. |
| `cursor` | string | no |  | Continue From Cursor. Next Cursor from a previous run whose Has More was true. |

Output fields:

- `messages`: Messages
- `messages[].ts`: Timestamp
- `messages[].user`: User ID
- `messages[].text`: Text
- `messages[].type`: Type
- `messages[].subtype`: Subtype
- `messages[].bot_id`: Bot ID
- `messages[].team`: Team ID
- `messages[].thread_ts`: Thread Timestamp
- `messages[].reply_count`: Reply Count (number)
- `messages[].reply_users_count`: Reply Users Count (number)
- `messages[].latest_reply`: Latest Reply Timestamp
- `messages[].is_locked`: Is Locked (boolean)
- `messages[].edited`: Edited
- `messages[].edited.user`: Edited By User ID
- `messages[].edited.ts`: Edited At (Timestamp)
- `messages[].reactions`: Reactions
- `messages[].reactions[].name`: Emoji Name
- `messages[].reactions[].count`: Count (number)
- `has_more`: Has More (boolean)
- `response_metadata`: Response Metadata
- `response_metadata.next_cursor`: Next Cursor

### `set-channel-topic`

**Set Channel Topic.** Set (overwrite) the topic of a selected channel. Idempotent: re-running with the same topic leaves the channel in the same state. The bot must be a member of the channel. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `onlyBotChannels` | boolean | no | `true` | Only Channels the Bot Is In. Show only channels the bot is a member of. |
| `channel` | string | yes |  | Channel. Private channels appear only after the bot is added to them. A value the product loads from the provider, such as an id; write the value itself. |
| `topic` | string | yes |  | Topic. Shown under the channel name. |

Output fields:

- `channel`: Channel
- `channel.id`: Channel ID
- `channel.name`: Name
- `channel.is_channel`: Is Channel (boolean)
- `channel.is_group`: Is Group (boolean)
- `channel.is_private`: Is Private (boolean)
- `channel.is_archived`: Is Archived (boolean)
- `channel.is_general`: Is General (boolean)
- `channel.is_member`: Is Member (boolean)
- `channel.is_shared`: Is Shared (boolean)
- `channel.created`: Created (Unix Timestamp) (number)
- `channel.creator`: Creator User ID
- `channel.num_members`: Member Count (number)
- `channel.topic`: Topic
- `channel.topic.value`: Value
- `channel.topic.creator`: Set By User ID
- `channel.topic.last_set`: Last Set (Unix Timestamp) (number)
- `channel.purpose`: Purpose
- `channel.purpose.value`: Value
- `channel.purpose.creator`: Set By User ID
- `channel.purpose.last_set`: Last Set (Unix Timestamp) (number)
- `channel.previous_names`: Previous Names

### `get-message`

**Get Message by Timestamp.** Fetch a single message from a channel by its exact timestamp; read-only and repeatable. Use this when you already have the message ts and channel; use Get channel history to read a range of messages or Search messages to find one by content. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `onlyBotChannels` | boolean | no | `true` | Only Channels the Bot Is In. Show only channels the bot is a member of. |
| `channel` | string | yes |  | Channel. Private channels appear only after the bot is added to them. A value the product loads from the provider, such as an id; write the value itself. |
| `ts` | string | yes |  | Message Timestamp. Timestamp of the target message, from its link or a trigger output. |

Output fields:

- `messages`: Messages
- `messages[].ts`: Timestamp
- `messages[].user`: User ID
- `messages[].text`: Text
- `messages[].type`: Type
- `messages[].subtype`: Subtype
- `messages[].bot_id`: Bot ID
- `messages[].team`: Team ID
- `messages[].thread_ts`: Thread Timestamp
- `messages[].reply_count`: Reply Count (number)
- `messages[].reply_users_count`: Reply Users Count (number)
- `messages[].latest_reply`: Latest Reply Timestamp
- `messages[].is_locked`: Is Locked (boolean)
- `messages[].edited`: Edited
- `messages[].edited.user`: Edited By User ID
- `messages[].edited.ts`: Edited At (Timestamp)
- `messages[].reactions`: Reactions
- `messages[].reactions[].name`: Emoji Name
- `messages[].reactions[].count`: Count (number)
- `has_more`: Has More (boolean)

### `invite-user-to-channel`

**Invite User to Channel.** Add an existing workspace user to an existing channel as a member. Both the channel and the user must already exist. Effectively idempotent in result since a user already in the channel stays a member, though Slack returns an error if they are already present. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `onlyBotChannels` | boolean | no | `true` | Only Channels the Bot Is In. Show only channels the bot is a member of. |
| `channel` | string | yes |  | Channel. Private channels appear only after the bot is added to them. A value the product loads from the provider, such as an id; write the value itself. |
| `userId` | string | yes |  | User. Search by name or handle. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `channel`: Channel
- `channel.id`: Channel ID
- `channel.name`: Name
- `channel.is_channel`: Is Channel (boolean)
- `channel.is_group`: Is Group (boolean)
- `channel.is_private`: Is Private (boolean)
- `channel.is_archived`: Is Archived (boolean)
- `channel.is_general`: Is General (boolean)
- `channel.is_member`: Is Member (boolean)
- `channel.is_shared`: Is Shared (boolean)
- `channel.created`: Created (Unix Timestamp) (number)
- `channel.creator`: Creator User ID
- `channel.num_members`: Member Count (number)
- `channel.topic`: Topic
- `channel.topic.value`: Value
- `channel.topic.creator`: Set By User ID
- `channel.topic.last_set`: Last Set (Unix Timestamp) (number)
- `channel.purpose`: Purpose
- `channel.purpose.value`: Value
- `channel.purpose.creator`: Set By User ID
- `channel.purpose.last_set`: Last Set (Unix Timestamp) (number)
- `channel.previous_names`: Previous Names

### `get_group_by_handle`

**Get User Group by Handle.** Look up a Slack user group (subteam) by its handle and return the group, including its ID for building an <!subteam^ID> mention; read-only and repeatable. Use this for groups, not individuals (use Find User by Handle/ID for people). Matches case-insensitively on the handle and errors if no group has that handle. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `handle` | string | yes |  | Group Handle. Handle without the leading @. |

Output fields:

- `id`: Group ID
- `team_id`: Team ID
- `name`: Name
- `description`: Description
- `handle`: Handle
- `is_external`: Is External (boolean)
- `date_create`: Created (Unix Timestamp) (number)
- `date_update`: Updated (Unix Timestamp) (number)
- `date_delete`: Deleted (Unix Timestamp) (number)
- `created_by`: Created By User ID
- `updated_by`: Updated By User ID
- `user_count`: Member Count (number)
- `users`: Member User IDs

### `update_group_users`

**Update User Group Members.** Set the membership of a Slack user group, found by its handle, to a given list of user IDs. Defaults to appending the IDs to current members; with "Append" off it replaces the entire member list (clearing it if no IDs are given), which is idempotent. Append mode is not idempotent. Requires a user token and errors if the handle is not found. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `handle` | string | yes |  | Group Handle. Handle without the leading @. |
| `userIds` | array | no |  | User IDs. Slack user IDs to add. Empty with append off clears the group. |
| `appendUsers` | boolean | no | `true` | Append to Existing Members. Off replaces the member list with the users above. |

Output fields:

- `usergroup`: User Group
- `usergroup.id`: Group ID
- `usergroup.team_id`: Team ID
- `usergroup.name`: Name
- `usergroup.description`: Description
- `usergroup.handle`: Handle
- `usergroup.is_external`: Is External (boolean)
- `usergroup.date_create`: Created (Unix Timestamp) (number)
- `usergroup.date_update`: Updated (Unix Timestamp) (number)
- `usergroup.date_delete`: Deleted (Unix Timestamp) (number)
- `usergroup.created_by`: Created By User ID
- `usergroup.updated_by`: Updated By User ID
- `usergroup.user_count`: Member Count (number)
- `usergroup.users`: Member User IDs

### `slack_post_message`

**Post Message.** Post a message to a channel, optionally as a threaded reply or with Block Kit blocks. Pass a channel ID (e.g. C0123ABCD); resolve a #name first with Find Channel. Use Send Direct Message to message one person privately, or Schedule Message to send at a future time. Each call posts a new message, so it is not idempotent; provide either text or blocks. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID to post to (e.g. C0123ABCD). Resolve a #name to an ID first with Find Channel. |
| `text` | string | no |  | Message. The text of the message. When using blocks, this is used as fallback text for notifications. |
| `threadTs` | string | no |  | Thread Timestamp. Timestamp (ts) of a parent message to reply within its thread, e.g. 1710304378.475129. Use the parent ts, not a reply ts. |
| `replyBroadcast` | boolean | no | `false` | Broadcast Reply to Channel. When replying in a thread, also make the reply visible to everyone in the channel. |
| `sendAsUser` | boolean | no | `false` | Send as User. Post as the authenticated user instead of the bot (requires a user token). |
| `unfurlLinks` | boolean | no | `true` | Unfurl Links. Enable link unfurling for this message. |
| `blocks` | JSON | no |  | Block Kit Blocks. Optional Block Kit blocks array. See https://api.slack.com/block-kit. |

Output fields:

- `channel`: Channel ID
- `ts`: Timestamp
- `message`: Message
- `message.ts`: Timestamp
- `message.user`: User ID
- `message.text`: Text
- `message.type`: Type
- `message.subtype`: Subtype
- `message.bot_id`: Bot ID
- `message.team`: Team ID
- `message.thread_ts`: Thread Timestamp
- `message.reply_count`: Reply Count (number)
- `message.reply_users_count`: Reply Users Count (number)
- `message.latest_reply`: Latest Reply Timestamp
- `message.is_locked`: Is Locked (boolean)
- `message.edited`: Edited
- `message.edited.user`: Edited By User ID
- `message.edited.ts`: Edited At (Timestamp)
- `message.reactions`: Reactions
- `message.reactions[].name`: Emoji Name
- `message.reactions[].count`: Count (number)

### `slack_send_direct_message`

**Send Direct Message.** Open a DM with one user (by user ID, e.g. U0123ABCD) and post a message to them privately, optionally with Block Kit blocks. Resolve a handle or email to a user ID first with Find User by Email or Find User by Handle. Use Post Message to send to a channel instead. Each call posts a new DM, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User ID. The Slack user ID to DM (e.g. U0123ABCD). Resolve a handle/email to an ID first with Find User by Handle / Find User by Email. |
| `text` | string | no |  | Message. The text of the direct message. Renders as a section above any blocks, and is used as the notification fallback. Leave empty to send blocks only. |
| `unfurlLinks` | boolean | no | `true` | Unfurl Links. Enable link unfurling for this message. |
| `blocks` | JSON | no |  | Block Kit Blocks. Optional Block Kit blocks array. See https://api.slack.com/block-kit. |

Output fields:

- `channel`: Channel ID
- `ts`: Timestamp
- `message`: Message
- `message.ts`: Timestamp
- `message.user`: User ID
- `message.text`: Text
- `message.type`: Type
- `message.subtype`: Subtype
- `message.bot_id`: Bot ID
- `message.team`: Team ID
- `message.thread_ts`: Thread Timestamp
- `message.reply_count`: Reply Count (number)
- `message.reply_users_count`: Reply Users Count (number)
- `message.latest_reply`: Latest Reply Timestamp
- `message.is_locked`: Is Locked (boolean)
- `message.edited`: Edited
- `message.edited.user`: Edited By User ID
- `message.edited.ts`: Edited At (Timestamp)
- `message.reactions`: Reactions
- `message.reactions[].name`: Emoji Name
- `message.reactions[].count`: Count (number)

### `slack_schedule_message`

**Schedule Message.** Queue a message to be posted to a channel at a future Unix timestamp (post_at, in seconds, must be in the future and within 120 days). Pass a channel ID (e.g. C0123ABCD); resolve a #name with Find Channel. Returns a scheduled_message_id you can later cancel with Delete Scheduled Message or review with List Scheduled Messages. Use Post Message to send immediately. Each call queues a new send, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID to post to (e.g. C0123ABCD). Resolve a #name with Find Channel. |
| `postAt` | number | yes |  | Post At (Unix Seconds). Unix epoch timestamp in seconds for when to send, e.g. 1893456000. Must be in the future and within 120 days. |
| `text` | string | no |  | Message. The text of the message. When using blocks, this is used as fallback text for notifications. |
| `threadTs` | string | no |  | Thread Timestamp. Optional parent message ts to schedule this as a threaded reply, e.g. 1710304378.475129. |
| `blocks` | JSON | no |  | Block Kit Blocks. Optional Block Kit blocks array. See https://api.slack.com/block-kit. |

Output fields:

- `scheduled_message_id`: Scheduled Message ID
- `channel`: Channel ID
- `post_at`: Post At (Unix Timestamp) (number)
- `message`: Message
- `message.ts`: Timestamp
- `message.user`: User ID
- `message.text`: Text
- `message.type`: Type
- `message.subtype`: Subtype
- `message.bot_id`: Bot ID
- `message.team`: Team ID
- `message.thread_ts`: Thread Timestamp
- `message.reply_count`: Reply Count (number)
- `message.reply_users_count`: Reply Users Count (number)
- `message.latest_reply`: Latest Reply Timestamp
- `message.is_locked`: Is Locked (boolean)
- `message.edited`: Edited
- `message.edited.user`: Edited By User ID
- `message.edited.ts`: Edited At (Timestamp)
- `message.reactions`: Reactions
- `message.reactions[].name`: Emoji Name
- `message.reactions[].count`: Count (number)

### `slack_list_scheduled_messages`

**List Scheduled Messages.** List messages that have been scheduled but not yet sent, optionally filtered by channel and a time window; read-only and repeatable. Use this to obtain a scheduled_message_id before cancelling one with Delete Scheduled Message. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | no |  | Channel. Optional channel ID to filter by (e.g. C0123ABCD). Leave blank for all channels. |
| `oldest` | number | no |  | Oldest. Only scheduled messages after this Unix timestamp. |
| `latest` | number | no |  | Latest. Only scheduled messages before this Unix timestamp. |

Output fields:

- `[].id`: Scheduled Message ID
- `[].channel_id`: Channel ID
- `[].post_at`: Post At (Unix Timestamp) (number)
- `[].date_created`: Created (Unix Timestamp) (number)
- `[].text`: Text

### `slack_delete_scheduled_message`

**Delete Scheduled Message.** Cancel a queued (not-yet-sent) scheduled message by its channel ID and scheduled_message_id. Obtain the scheduled_message_id from Schedule Message or List Scheduled Messages. Not idempotent: re-deleting an already-cancelled or already-sent message errors. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID the message was scheduled to (e.g. C0123ABCD). |
| `scheduledMessageId` | string | yes |  | Scheduled Message ID. The scheduled_message_id from Schedule Message or List Scheduled Messages (e.g. Q1234ABCD). |

### `slack_update_message`

**Update Message.** Edit a previously posted message in place, replacing its text (and optionally blocks), identified by channel ID and message timestamp (ts). Obtain the ts from the result of Post Message, Search Messages, or Get Channel History. Use Delete Message to remove it instead. Idempotent: re-running with the same inputs leaves the message in the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID containing the message (e.g. C0123ABCD). Resolve a #name with Find Channel. |
| `ts` | string | yes |  | Message Timestamp. Timestamp (ts) of the message to update, e.g. 1710304378.475129. Obtain it from Post Message / Search Messages / Get Channel History. |
| `text` | string | no |  | Message. The new text of the message. Renders as a section above any blocks, and is used as the notification fallback. Leave empty for a blocks-only update. |
| `blocks` | JSON | no |  | Block Kit Blocks. Optional Block Kit blocks array to replace the message blocks. See https://api.slack.com/block-kit. |

Output fields:

- `channel`: Channel ID
- `ts`: Timestamp
- `text`: Text
- `message`: Message
- `message.ts`: Timestamp
- `message.user`: User ID
- `message.text`: Text
- `message.type`: Type
- `message.subtype`: Subtype
- `message.bot_id`: Bot ID
- `message.team`: Team ID
- `message.thread_ts`: Thread Timestamp
- `message.reply_count`: Reply Count (number)
- `message.reply_users_count`: Reply Users Count (number)
- `message.latest_reply`: Latest Reply Timestamp
- `message.is_locked`: Is Locked (boolean)
- `message.edited`: Edited
- `message.edited.user`: Edited By User ID
- `message.edited.ts`: Edited At (Timestamp)
- `message.reactions`: Reactions
- `message.reactions[].name`: Emoji Name
- `message.reactions[].count`: Count (number)

### `slack_delete_message`

**Delete Message.** Permanently delete one message from a channel, identified by channel ID and the message timestamp (ts). Obtain the ts from Post Message, Search Messages, or Get Channel History. To revise the content instead of removing it, use Update Message. Requires a user token with rights to remove the message; not idempotent (re-deleting an already-gone message errors). Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID containing the message (e.g. C0123ABCD). Resolve a #name with Find Channel. |
| `ts` | string | yes |  | Message Timestamp. Timestamp (ts) of the message to delete, e.g. 1710304378.475129. Obtain it from Post Message / Search Messages / Get Channel History. |

### `slack_send_ephemeral_message`

**Send Ephemeral Message.** Post an ephemeral message that is visible only to one specified user inside a channel and is not stored in the channel history. Pass a channel ID and the target user ID; the user must be a member of that channel and the bot must be in it. Use Post Message for a normal message everyone sees, or Send Direct Message for a private DM. Each call posts a new ephemeral message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID where the ephemeral message appears (e.g. C0123ABCD). Resolve a #name with Find Channel. |
| `user` | string | yes |  | User ID. The user ID who will see the message (e.g. U0123ABCD). Must be a member of the channel. |
| `text` | string | no |  | Message. The text of the message. When using blocks, this is used as fallback text for notifications. |
| `blocks` | JSON | no |  | Block Kit Blocks. Optional Block Kit blocks array. See https://api.slack.com/block-kit. |

Output fields:

- `message_ts`: Message Timestamp

### `slack_get_message_permalink`

**Get Message Permalink.** Return a stable, shareable permalink URL for one message identified by channel ID and message timestamp (ts); read-only and repeatable. Obtain the ts from Post Message, Search Messages, or Get Channel History. Use this when you need a link to reference a message elsewhere. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID containing the message (e.g. C0123ABCD). Resolve a #name with Find Channel. |
| `messageTs` | string | yes |  | Message Timestamp. Timestamp (ts) of the message, e.g. 1710304378.475129. Obtain it from Post Message / Search Messages / Get Channel History. |

Output fields:

- `channel`: Channel ID
- `permalink`: Permalink (url)

### `slack_get_channel_history`

**Get Channel History.** Retrieve top-level (non-thread) messages from a channel you already have the ID for, paging through the full range and optionally bounded by oldest/latest timestamps; read-only and repeatable. Pass a channel ID (e.g. C0123ABCD); resolve a #name with Find Channel. Use Search Messages to find messages by content across the workspace, or Get Thread Replies to read replies within a thread. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID to read (e.g. C0123ABCD). Resolve a #name with Find Channel. |
| `oldest` | number | no |  | Oldest. Only messages after this Unix timestamp are included. |
| `latest` | number | no |  | Latest. Only messages before this Unix timestamp are included. Defaults to now. |
| `inclusive` | boolean | no | `false` | Inclusive. Include messages with the oldest/latest timestamps. Ignored unless a timestamp is set. |

Output fields:

- `[].ts`: Timestamp
- `[].user`: User ID
- `[].text`: Text
- `[].type`: Type
- `[].subtype`: Subtype
- `[].bot_id`: Bot ID
- `[].team`: Team ID
- `[].thread_ts`: Thread Timestamp
- `[].reply_count`: Reply Count (number)
- `[].reply_users_count`: Reply Users Count (number)
- `[].latest_reply`: Latest Reply Timestamp
- `[].is_locked`: Is Locked (boolean)
- `[].edited`: Edited
- `[].edited.user`: Edited By User ID
- `[].edited.ts`: Edited At (Timestamp)
- `[].reactions`: Reactions
- `[].reactions[].name`: Emoji Name
- `[].reactions[].count`: Count (number)

### `slack_get_thread_replies`

**Get Thread Replies.** Retrieve the replies in a thread given the channel ID and the parent message timestamp; read-only and repeatable. Returns up to 10,000 replies per call; when has_more is true, pass response_metadata.next_cursor as the cursor to continue. The timestamp must be the parent message ts, not a reply ts. Use Get Channel History for top-level channel messages, or Search Messages to find a message by content. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID containing the thread (e.g. C0123ABCD). Resolve a #name with Find Channel. |
| `threadTs` | string | yes |  | Thread Timestamp. Timestamp (ts) of the parent message, e.g. 1710304378.475129. Use the parent ts, not a reply ts. |
| `cursor` | string | no |  | Continue From Cursor. Next Cursor from a previous run whose Has More was true. |

Output fields:

- `messages`: Messages
- `messages[].ts`: Timestamp
- `messages[].user`: User ID
- `messages[].text`: Text
- `messages[].type`: Type
- `messages[].subtype`: Subtype
- `messages[].bot_id`: Bot ID
- `messages[].team`: Team ID
- `messages[].thread_ts`: Thread Timestamp
- `messages[].reply_count`: Reply Count (number)
- `messages[].reply_users_count`: Reply Users Count (number)
- `messages[].latest_reply`: Latest Reply Timestamp
- `messages[].is_locked`: Is Locked (boolean)
- `messages[].edited`: Edited
- `messages[].edited.user`: Edited By User ID
- `messages[].edited.ts`: Edited At (Timestamp)
- `messages[].reactions`: Reactions
- `messages[].reactions[].name`: Emoji Name
- `messages[].reactions[].count`: Count (number)
- `has_more`: Has More (boolean)
- `response_metadata`: Response Metadata
- `response_metadata.next_cursor`: Next Cursor

### `slack_search_messages`

**Search Messages.** Search across the workspace for messages matching a query string, paging through every match; read-only and repeatable. Requires a user token (search is unavailable to bot tokens). Use this to find messages anywhere by content; use Get Channel History when you already know the channel, or Search All to also include files. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Search query, supporting Slack search operators (e.g. "in:#general from:@jane budget"). |

Output fields:

- `[].ts`: Timestamp
- `[].text`: Text
- `[].user`: User ID
- `[].username`: Username
- `[].type`: Type
- `[].channel`: Channel
- `[].channel.id`: Channel ID
- `[].channel.name`: Name
- `[].channel.is_private`: Is Private (boolean)
- `[].channel.is_archived`: Is Archived (boolean)
- `[].permalink`: Permalink (url)
- `[].score`: Relevance Score (number)

### `slack_search_all`

**Search All.** Search across the workspace for both messages and files matching a query string; read-only and repeatable. Requires a user token (search is unavailable to bot tokens). Use this when results may be either messages or files; use Search Messages when you only want messages. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Search query, supporting Slack search operators (e.g. "in:#general budget"). |

Output fields:

- `messages`: Messages
- `messages[].ts`: Timestamp
- `messages[].text`: Text
- `messages[].user`: User ID
- `messages[].username`: Username
- `messages[].type`: Type
- `messages[].channel`: Channel
- `messages[].channel.id`: Channel ID
- `messages[].channel.name`: Name
- `messages[].channel.is_private`: Is Private (boolean)
- `messages[].channel.is_archived`: Is Archived (boolean)
- `messages[].permalink`: Permalink (url)
- `messages[].score`: Relevance Score (number)
- `files`: Files
- `files[].id`: File ID
- `files[].name`: Name
- `files[].title`: Title
- `files[].mimetype`: MIME Type
- `files[].filetype`: File Type
- `files[].pretty_type`: Pretty Type
- `files[].size`: Size (filesize)
- `files[].user`: Uploaded By User ID
- `files[].created`: Created (Unix Timestamp) (number)
- `files[].url_private`: Private URL (url)
- `files[].url_private_download`: Download URL (url)
- `files[].permalink`: Permalink (url)
- `files[].permalink_public`: Public Permalink (url)
- `files[].is_public`: Is Public (boolean)
- `files[].is_external`: Is External (boolean)
- `message_count`: Message Count (number)
- `file_count`: File Count (number)

### `slack_mark_conversation_read`

**Mark Conversation Read.** Set the read cursor in a channel so messages up to and including a given timestamp (ts) are marked read, identified by channel ID. Obtain the ts from Get Channel History or Post Message. Setting the same cursor again leaves the same state, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID to mark read (e.g. C0123ABCD). Resolve a #name with Find Channel. |
| `ts` | string | yes |  | Timestamp. Mark the channel read up to this message ts, e.g. 1710304378.475129. |

### `find_user_by_email`

**Find User by Email.** Looks up a single workspace member by their exact email address and returns that user (including their user ID). Pick this to turn an email into a Slack user ID before messaging or referencing the person; use Find User by Handle when you only know the @handle, or Get User when you already have the ID. Read-only and idempotent; errors if no member matches the email. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Must match the email on the Slack profile. |

Output fields:

- `user`: User
- `user.id`: User ID
- `user.name`: Username
- `user.real_name`: Real Name
- `user.deleted`: Deleted (boolean)
- `user.is_admin`: Is Admin (boolean)
- `user.is_owner`: Is Owner (boolean)
- `user.is_bot`: Is Bot (boolean)
- `user.is_restricted`: Is Restricted (boolean)
- `user.tz`: Timezone
- `user.profile`: Profile
- `user.profile.email`: Email (email)
- `user.profile.real_name`: Real Name
- `user.profile.display_name`: Display Name
- `user.profile.title`: Title
- `user.profile.phone`: Phone
- `user.profile.image_192`: Avatar (image)
- `user.profile.status_text`: Status Text
- `user.profile.status_emoji`: Status Emoji
- `user.profile.first_name`: First Name
- `user.profile.last_name`: Last Name

### `get_user`

**Get User.** Fetches a user profile directly by their Slack user ID. Pick this when you already have the user ID (the fastest, exact lookup); use Find User by Email or Find User by Handle to resolve an email or @handle into an ID first. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | User ID. Starts with U or W. |

Output fields:

- `profile`: Profile
- `profile.real_name`: Real Name
- `profile.display_name`: Display Name
- `profile.email`: Email (email)
- `profile.first_name`: First Name
- `profile.last_name`: Last Name
- `profile.title`: Title
- `profile.phone`: Phone
- `profile.status_text`: Status Text
- `profile.status_emoji`: Status Emoji
- `profile.image_192`: Avatar (image)
- `profile.team`: Team ID

### `list_users`

**List Users.** Enumerates every member of the workspace, paging through all results, with toggles to include bots and disabled/deactivated users. Pick this to scan or enumerate users; use Get User, Find User by Email, or Find User by Handle when you already know the single user you want. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `includeBots` | boolean | no | `false` | Include Bots. Also return bot users. |
| `includeDisabled` | boolean | no | `false` | Include Deactivated Users. Also return deactivated accounts. |

Output fields:

- `[].id`: User ID
- `[].name`: Username
- `[].real_name`: Real Name
- `[].deleted`: Deleted (boolean)
- `[].is_admin`: Is Admin (boolean)
- `[].is_owner`: Is Owner (boolean)
- `[].is_bot`: Is Bot (boolean)
- `[].is_restricted`: Is Restricted (boolean)
- `[].tz`: Timezone
- `[].profile`: Profile
- `[].profile.email`: Email (email)
- `[].profile.real_name`: Real Name
- `[].profile.display_name`: Display Name
- `[].profile.title`: Title
- `[].profile.phone`: Phone
- `[].profile.image_192`: Avatar (image)
- `[].profile.status_text`: Status Text
- `[].profile.status_emoji`: Status Emoji
- `[].profile.first_name`: First Name
- `[].profile.last_name`: Last Name

### `find_user_by_handle`

**Find User by Handle.** Looks up a workspace member by their Slack handle (display name without the leading @) and returns that user. Pick this when you only know the handle and need the user object or ID; use Find User by Email when you have an email, or Get User when you already have the ID. Scans the full member list and errors if no exact display-name match is found; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `handle` | string | yes |  | Handle. Display name without the leading @. |

Output fields:

- `id`: User ID
- `name`: Username
- `real_name`: Real Name
- `deleted`: Deleted (boolean)
- `is_admin`: Is Admin (boolean)
- `is_owner`: Is Owner (boolean)
- `is_bot`: Is Bot (boolean)
- `is_restricted`: Is Restricted (boolean)
- `tz`: Timezone
- `profile`: Profile
- `profile.email`: Email (email)
- `profile.real_name`: Real Name
- `profile.display_name`: Display Name
- `profile.title`: Title
- `profile.phone`: Phone
- `profile.image_192`: Avatar (image)
- `profile.status_text`: Status Text
- `profile.status_emoji`: Status Emoji
- `profile.first_name`: First Name
- `profile.last_name`: Last Name

### `slack_add_reaction`

**Add Reaction.** Adds an emoji reaction to a specific message identified by its channel and message timestamp (obtain the timestamp from a posted message, search, or channel history; pass a channel ID, or resolve a #name first with Find Channel). Use Remove Reaction for the inverse. Provide the emoji name without colons, e.g. thumbsup. Not idempotent: re-adding the same reaction fails with an already_reacted error rather than succeeding as a no-op (the end state is the same, but a retry surfaces an error). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `onlyBotChannels` | boolean | no | `true` | Only Channels the Bot Is In. Show only channels the bot is a member of. |
| `channel` | string | yes |  | Channel. Private channels appear only after the bot is added to them. A value the product loads from the provider, such as an id; write the value itself. |
| `ts` | string | yes |  | Message Timestamp. Timestamp of the target message, from its link or a trigger output. |
| `reaction` | string | yes |  | Emoji. Emoji name without colons. |
| `reactAsUser` | boolean | no | `false` | React as User. Add the reaction as the connected user instead of the bot. |

### `slack_archive_channel`

**Archive Channel.** Archive a channel, closing it to new activity while preserving its history. Not idempotent: archiving an already-archived channel returns an "already_archived" error rather than a silent no-op, so do not retry blindly. Use Unarchive Channel to reverse this. The bot must be a member with permission to archive. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID (e.g. 'C0123456789'). Pass a channel ID, or resolve a #name to an ID first with Find Channel. |

### `slack_close_dm`

**Close Direct Message.** Close a direct message (IM) or group DM (MPIM) conversation view. Idempotent: closing an already-closed conversation succeeds without changing anything. This only hides the conversation from the sidebar; it does not delete any messages. Use the conversation ID returned when the DM was opened. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Conversation. Direct message conversation ID to close, e.g. 'D0123456789' (IM) or 'G0123456789' (group DM). This is the conversation ID returned when the DM was opened, not a user ID. |

### `slack_create_channel`

**Create Channel.** Create a new public or private Slack channel with the given name. Not idempotent: if a channel with that name already exists Slack returns a name-taken error rather than reusing it, so do not retry blindly. Slack normalizes names (lowercased, spaces become hyphens). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channelName` | string | yes |  | Channel Name. Name for the new channel, without the leading '#'. Slack lowercases it and replaces spaces with hyphens, e.g. 'project-updates'. Max 80 characters. |
| `isPrivate` | boolean | no | `false` | Is Private?. Create the channel as private (invite-only) instead of public. |

Output fields:

- `channel`: Channel
- `channel.id`: Channel ID
- `channel.name`: Name
- `channel.is_channel`: Is Channel (boolean)
- `channel.is_group`: Is Group (boolean)
- `channel.is_private`: Is Private (boolean)
- `channel.is_archived`: Is Archived (boolean)
- `channel.is_general`: Is General (boolean)
- `channel.is_member`: Is Member (boolean)
- `channel.is_shared`: Is Shared (boolean)
- `channel.created`: Created (Unix Timestamp) (number)
- `channel.creator`: Creator User ID
- `channel.num_members`: Member Count (number)
- `channel.topic`: Topic
- `channel.topic.value`: Value
- `channel.topic.creator`: Set By User ID
- `channel.topic.last_set`: Last Set (Unix Timestamp) (number)
- `channel.purpose`: Purpose
- `channel.purpose.value`: Value
- `channel.purpose.creator`: Set By User ID
- `channel.purpose.last_set`: Last Set (Unix Timestamp) (number)
- `channel.previous_names`: Previous Names

### `slack_find_channel`

**Find Channel.** Resolve a channel #name to its channel ID by scanning public and private channels. This is the channel name-to-ID resolver every other channel action needs, since they take a channel ID. Use List Channels to enumerate all channels instead of matching one. Only public and private channels have names; direct messages cannot be matched here. Read-only and repeatable. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Channel Name. The channel name to find, with or without the leading '#', e.g. 'general'. Matched case-insensitively after Slack's normalization (lowercase, spaces to hyphens). |
| `excludeArchived` | boolean | no | `true` | Exclude Archived. Skip archived channels when searching. |

Output fields:

- `id`: Channel ID
- `name`: Name
- `is_channel`: Is Channel (boolean)
- `is_group`: Is Group (boolean)
- `is_private`: Is Private (boolean)
- `is_archived`: Is Archived (boolean)
- `is_general`: Is General (boolean)
- `is_member`: Is Member (boolean)
- `is_shared`: Is Shared (boolean)
- `created`: Created (Unix Timestamp) (number)
- `creator`: Creator User ID
- `num_members`: Member Count (number)
- `topic`: Topic
- `topic.value`: Value
- `topic.creator`: Set By User ID
- `topic.last_set`: Last Set (Unix Timestamp) (number)
- `purpose`: Purpose
- `purpose.value`: Value
- `purpose.creator`: Set By User ID
- `purpose.last_set`: Last Set (Unix Timestamp) (number)
- `previous_names`: Previous Names

### `slack_get_channel_info`

**Get Channel Info.** Get the full detail of one channel by its ID — topic, purpose, privacy, archived state, creator and optionally the member count. Use this when you already have a channel ID and need its metadata; use Find Channel to resolve a name to an ID first, or List Channel Members to get the member list. Read-only and repeatable. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID (e.g. 'C0123456789'). Pass a channel ID, or resolve a #name to an ID first with Find Channel. |
| `includeNumMembers` | boolean | no | `false` | Include Member Count. Include the number of members in the channel in the result. |

Output fields:

- `channel`: Channel
- `channel.id`: Channel ID
- `channel.name`: Name
- `channel.is_channel`: Is Channel (boolean)
- `channel.is_group`: Is Group (boolean)
- `channel.is_private`: Is Private (boolean)
- `channel.is_archived`: Is Archived (boolean)
- `channel.is_general`: Is General (boolean)
- `channel.is_member`: Is Member (boolean)
- `channel.is_shared`: Is Shared (boolean)
- `channel.created`: Created (Unix Timestamp) (number)
- `channel.creator`: Creator User ID
- `channel.num_members`: Member Count (number)
- `channel.topic`: Topic
- `channel.topic.value`: Value
- `channel.topic.creator`: Set By User ID
- `channel.topic.last_set`: Last Set (Unix Timestamp) (number)
- `channel.purpose`: Purpose
- `channel.purpose.value`: Value
- `channel.purpose.creator`: Set By User ID
- `channel.purpose.last_set`: Last Set (Unix Timestamp) (number)
- `channel.previous_names`: Previous Names

### `slack_get_file`

**Get File.** Looks up metadata for a single Slack file by its file ID and downloads its contents. Pick this when you have a file ID (e.g. from a message trigger or List Files) and need the file details or bytes. Use List Files to discover file IDs. Read-only and idempotent; fails if the file has no accessible download URL. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileId` | string | yes |  | File ID. Found in trigger output or the file link. |

Output fields:

- `id`: File ID
- `name`: Name
- `title`: Title
- `mimetype`: MIME Type
- `filetype`: File Type
- `pretty_type`: Pretty Type
- `size`: Size (filesize)
- `user`: Uploaded By User ID
- `created`: Created (Unix Timestamp) (number)
- `url_private`: Private URL (url)
- `url_private_download`: Download URL (url)
- `permalink`: Permalink (url)
- `permalink_public`: Public Permalink (url)
- `is_public`: Is Public (boolean)
- `is_external`: Is External (boolean)
- `data`: File Data URL (url)

### `slack_get_reactions`

**Get Reactions.** Fetches all emoji reactions on a single message (by channel and message timestamp) or file (by file ID). Use this to inspect who reacted with what to one specific item; use List User Reactions to enumerate everything a user reacted to. Pass a channel ID, or resolve a #name first with Find Channel; obtain the message timestamp from a posted message, search, or channel history. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | no |  | Channel ID. Channel ID of the message (e.g. C0123ABCD). Required when targeting a message; leave empty when targeting a file. |
| `ts` | string | no |  | Message Timestamp. Timestamp of the message, e.g. 1710304378.475129. Required (with Channel ID) when targeting a message. |
| `file` | string | no |  | File ID. File ID to get reactions for (e.g. F0123ABCD). Provide this instead of Channel ID + Timestamp when targeting a file. |
| `full` | boolean | no | `true` | Full reaction list?. If enabled, returns the complete list of reactions (not truncated). |

Output fields:

- `type`: Item Type
- `channel`: Channel ID
- `message`: Message
- `message.ts`: Timestamp
- `message.user`: User ID
- `message.text`: Text
- `message.permalink`: Permalink (url)
- `message.reactions`: Reactions
- `message.reactions[].name`: Emoji Name
- `message.reactions[].count`: Count (number)
- `file`: File
- `file.id`: File ID
- `file.name`: Name
- `file.reactions`: Reactions
- `file.reactions[].name`: Emoji Name
- `file.reactions[].count`: Count (number)

### `slack_invite_users_to_channel`

**Invite Users to Channel.** Add one or more existing workspace users to an existing channel as members. Not idempotent: Slack returns an error if a user is already in the channel (the end state is the same, but a retry is not silent). Use Remove User from Channel to reverse. The bot must be a member of the channel. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID (e.g. 'C0123456789'). Pass a channel ID, or resolve a #name to an ID first with Find Channel. |
| `userIds` | array | yes |  | User IDs. Slack user IDs to invite, e.g. 'U0123456789'. Resolve handles/emails to IDs first with Find User by Handle / Find User by Email. Up to 1000 users per call. |

Output fields:

- `channel`: Channel
- `channel.id`: Channel ID
- `channel.name`: Name
- `channel.is_channel`: Is Channel (boolean)
- `channel.is_group`: Is Group (boolean)
- `channel.is_private`: Is Private (boolean)
- `channel.is_archived`: Is Archived (boolean)
- `channel.is_general`: Is General (boolean)
- `channel.is_member`: Is Member (boolean)
- `channel.is_shared`: Is Shared (boolean)
- `channel.created`: Created (Unix Timestamp) (number)
- `channel.creator`: Creator User ID
- `channel.num_members`: Member Count (number)
- `channel.topic`: Topic
- `channel.topic.value`: Value
- `channel.topic.creator`: Set By User ID
- `channel.topic.last_set`: Last Set (Unix Timestamp) (number)
- `channel.purpose`: Purpose
- `channel.purpose.value`: Value
- `channel.purpose.creator`: Set By User ID
- `channel.purpose.last_set`: Last Set (Unix Timestamp) (number)
- `channel.previous_names`: Previous Names

### `slack_join_channel`

**Join Channel.** Join an existing public channel so the bot becomes a member, which many channel and message actions require. Idempotent: joining a channel the bot is already in succeeds without changing anything. Only works for public channels; to join a private channel the bot must be invited. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID (e.g. 'C0123456789'). Pass a channel ID, or resolve a #name to an ID first with Find Channel. |

Output fields:

- `channel`: Channel
- `channel.id`: Channel ID
- `channel.name`: Name
- `channel.is_channel`: Is Channel (boolean)
- `channel.is_group`: Is Group (boolean)
- `channel.is_private`: Is Private (boolean)
- `channel.is_archived`: Is Archived (boolean)
- `channel.is_general`: Is General (boolean)
- `channel.is_member`: Is Member (boolean)
- `channel.is_shared`: Is Shared (boolean)
- `channel.created`: Created (Unix Timestamp) (number)
- `channel.creator`: Creator User ID
- `channel.num_members`: Member Count (number)
- `channel.topic`: Topic
- `channel.topic.value`: Value
- `channel.topic.creator`: Set By User ID
- `channel.topic.last_set`: Last Set (Unix Timestamp) (number)
- `channel.purpose`: Purpose
- `channel.purpose.value`: Value
- `channel.purpose.creator`: Set By User ID
- `channel.purpose.last_set`: Last Set (Unix Timestamp) (number)
- `channel.previous_names`: Previous Names
- `warning`: Warning

### `slack_leave_channel`

**Leave Channel.** Leave a channel so the bot is no longer a member, the counterpart to Join Channel. Idempotent: leaving a channel the bot is not in succeeds without changing anything. After leaving, the bot can no longer read or post in the channel until it rejoins. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID (e.g. 'C0123456789'). Pass a channel ID, or resolve a #name to an ID first with Find Channel. |

### `slack_list_channel_members`

**List Channel Members.** List the user IDs of every member of a channel, paging through all results. Use this to enumerate who is in a channel; resolve each returned ID to a user with Get User. Use Get Channel Info for channel metadata instead. Read-only and repeatable. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID (e.g. 'C0123456789'). Pass a channel ID, or resolve a #name to an ID first with Find Channel. |

Output fields:

- `members`: Member User IDs
- `count`: Count (number)

### `slack_list_channels`

**List Channels.** Enumerate the channels in the workspace, paging through all results and returning each id, name, privacy and archived state. Use this to browse or list channels; use Find Channel when you already know the name and just need its ID, or List User Conversations to list only the channels a specific user belongs to. Read-only and repeatable. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `types` | string | no | `"public_channel,private_channel"` | Types. Comma-separated conversation types to include. One or more of 'public_channel', 'private_channel', 'mpim', 'im'. Defaults to public and private channels. |
| `excludeArchived` | boolean | no | `true` | Exclude Archived. Omit archived channels from the results. |

Output fields:

- `channels`: Channels
- `channels[].id`: Channel ID
- `channels[].name`: Name
- `channels[].is_private`: Is Private (boolean)
- `channels[].is_archived`: Is Archived (boolean)
- `channels[].is_member`: Is Member (boolean)
- `channels[].num_members`: Member Count (number)
- `count`: Count (number)

### `slack_list_custom_emoji`

**List Custom Emoji.** Lists the workspace's custom emoji as a name-to-image-URL map (aliases point to their target with an 'alias:' value). Use this to discover available custom emoji names, e.g. before adding a reaction. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `emoji`: Custom Emoji
- `count`: Count (number)

### `slack_list_files`

**List Files.** Lists files in the workspace, optionally filtered by channel, uploading user, file type, or a created-time window. Use this to discover file IDs to then pass to Get File, Make File Public, or Revoke File Public URL; use Get File when you already have a specific file ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | no |  | Channel ID. Only return files shared in this channel (e.g. C0123ABCD). Pass a channel ID, or resolve a #name first with Find Channel. Leave empty for all channels. |
| `user` | string | no |  | User ID. Only return files uploaded by this user ID (e.g. U0123ABCD). Leave empty for all users. |
| `types` | string | no |  | File Types. Comma-separated file types to filter by. One or more of: 'all', 'spaces', 'snippets', 'images', 'gdocs', 'zips', 'pdfs'. Defaults to 'all'. |
| `ts_from` | string | no |  | Created After (timestamp). Only return files created at or after this Unix timestamp (e.g. 1710304378). |
| `ts_to` | string | no |  | Created Before (timestamp). Only return files created at or before this Unix timestamp (e.g. 1710304378). |
| `limit` | number | no |  | Limit. Maximum number of files to return per page (1-1000). Defaults to 100. |

Output fields:

- `files`: Files
- `files[].id`: File ID
- `files[].name`: Name
- `files[].title`: Title
- `files[].mimetype`: MIME Type
- `files[].filetype`: File Type
- `files[].pretty_type`: Pretty Type
- `files[].size`: Size (filesize)
- `files[].user`: Uploaded By User ID
- `files[].created`: Created (Unix Timestamp) (number)
- `files[].url_private`: Private URL (url)
- `files[].url_private_download`: Download URL (url)
- `files[].permalink`: Permalink (url)
- `files[].permalink_public`: Public Permalink (url)
- `files[].is_public`: Is Public (boolean)
- `files[].is_external`: Is External (boolean)
- `count`: Count (number)

### `slack_list_user_conversations`

**List User Conversations.** List the channels and conversations a specific user (or the authenticated user if none is given) is a member of, paging through all results. Use this instead of List Channels when you only want the conversations one user belongs to. Read-only and repeatable. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | string | no |  | User ID. Slack user ID to list conversations for, e.g. 'U0123456789'. Leave blank to use the authenticated user. Resolve a handle/email to an ID first with Find User by Handle / Find User by Email. |
| `types` | string | no | `"public_channel,private_channel"` | Types. Comma-separated conversation types to include. One or more of 'public_channel', 'private_channel', 'mpim', 'im'. Defaults to public and private channels. |
| `excludeArchived` | boolean | no | `true` | Exclude Archived. Omit archived channels from the results. |

Output fields:

- `channels`: Channels
- `channels[].id`: Channel ID
- `channels[].name`: Name
- `channels[].is_private`: Is Private (boolean)
- `channels[].is_archived`: Is Archived (boolean)
- `channels[].is_im`: Is Direct Message (boolean)
- `count`: Count (number)

### `list_user_groups`

**List User Groups.** Lists all user groups (subteams) in the workspace, with optional toggles to include disabled groups and each group's member user IDs. Use this to enumerate groups or to discover a group ID; use Find User Group by Handle when you already know the handle of a single group. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `includeDisabled` | boolean | no | `false` | Include disabled groups?. Include disabled user groups in the results. |
| `includeUsers` | boolean | no | `false` | Include members?. Include the list of member user IDs for each user group. |

Output fields:

- `usergroups`: User Groups
- `usergroups[].id`: Group ID
- `usergroups[].team_id`: Team ID
- `usergroups[].name`: Name
- `usergroups[].description`: Description
- `usergroups[].handle`: Handle
- `usergroups[].is_external`: Is External (boolean)
- `usergroups[].date_create`: Created (Unix Timestamp) (number)
- `usergroups[].date_update`: Updated (Unix Timestamp) (number)
- `usergroups[].date_delete`: Deleted (Unix Timestamp) (number)
- `usergroups[].created_by`: Created By User ID
- `usergroups[].updated_by`: Updated By User ID
- `usergroups[].user_count`: Member Count (number)
- `usergroups[].users`: Member User IDs

### `slack_list_user_reactions`

**List User Reactions.** Lists all items (messages and files) a user has reacted to, paging through every result; defaults to the authenticated user when no user is given. Use this to enumerate everything a user reacted to; use Get Reactions to inspect the reactions on one specific message or file. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | string | no |  | User ID. Show reactions made by this user ID (e.g. U0123ABCD). Leave empty to use the authenticated user. |
| `limit` | number | no |  | Limit. Maximum number of items to return per page (1-1000). Defaults to 100. |

Output fields:

- `items`: Items
- `items[].type`: Item Type
- `items[].channel`: Channel ID
- `items[].message`: Message
- `items[].message.ts`: Timestamp
- `items[].message.user`: User ID
- `items[].message.text`: Text
- `items[].file`: File
- `items[].file.id`: File ID
- `items[].file.name`: Name
- `count`: Count (number)

### `slack_remove_reaction`

**Remove Reaction.** Removes an emoji reaction from a message (by channel and message timestamp) or from a file (by file ID). This is the inverse of Add Reaction. Pass a channel ID, or resolve a #name first with Find Channel; obtain the message timestamp from a posted message, search, or channel history. Provide the emoji name without colons, e.g. thumbsup. Not idempotent: removing an absent reaction fails with a no_reaction error rather than succeeding as a no-op (the end state is the same, but a retry surfaces an error). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reaction` | string | yes |  | Reaction (emoji) name. The emoji name without colons, e.g. thumbsup. |
| `channel` | string | no |  | Channel ID. Channel ID of the message to remove the reaction from (e.g. C0123ABCD). Required when targeting a message; leave empty when targeting a file. |
| `ts` | string | no |  | Message Timestamp. Timestamp of the message to remove the reaction from, e.g. 1710304378.475129. Required (with Channel ID) when targeting a message. |
| `file` | string | no |  | File ID. File ID to remove the reaction from (e.g. F0123ABCD). Provide this instead of Channel ID + Timestamp when targeting a file. |
| `reactAsUser` | boolean | no | `false` | React as user?. If enabled, the reaction is removed as the authenticated user instead of the bot. |

### `slack_remove_user_from_channel`

**Remove User from Channel.** Remove (kick) a user from a channel, the counterpart to Invite Users to Channel. Not idempotent: removing a user who is not in the channel returns a "not_in_channel" error rather than a silent no-op, so do not retry blindly. The bot must have permission to remove members. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID (e.g. 'C0123456789'). Pass a channel ID, or resolve a #name to an ID first with Find Channel. |
| `user` | string | yes |  | User ID. Slack user ID to remove, e.g. 'U0123456789'. Resolve a handle/email to an ID first with Find User by Handle / Find User by Email. |

### `slack_rename_channel`

**Rename Channel.** Rename a channel to a new name. Idempotent: re-running with the same name leaves the channel in the same final state. Slack normalizes the name (lowercased, spaces become hyphens). The bot must have permission to manage the channel. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID (e.g. 'C0123456789'). Pass a channel ID, or resolve a #name to an ID first with Find Channel. |
| `name` | string | yes |  | New Name. New name for the channel, without the leading '#'. Slack lowercases it and replaces spaces with hyphens, e.g. 'project-updates'. Max 80 characters. |

Output fields:

- `channel`: Channel
- `channel.id`: Channel ID
- `channel.name`: Name
- `channel.is_channel`: Is Channel (boolean)
- `channel.is_group`: Is Group (boolean)
- `channel.is_private`: Is Private (boolean)
- `channel.is_archived`: Is Archived (boolean)
- `channel.is_general`: Is General (boolean)
- `channel.is_member`: Is Member (boolean)
- `channel.is_shared`: Is Shared (boolean)
- `channel.created`: Created (Unix Timestamp) (number)
- `channel.creator`: Creator User ID
- `channel.num_members`: Member Count (number)
- `channel.topic`: Topic
- `channel.topic.value`: Value
- `channel.topic.creator`: Set By User ID
- `channel.topic.last_set`: Last Set (Unix Timestamp) (number)
- `channel.purpose`: Purpose
- `channel.purpose.value`: Value
- `channel.purpose.creator`: Set By User ID
- `channel.purpose.last_set`: Last Set (Unix Timestamp) (number)
- `channel.previous_names`: Previous Names

### `slack_set_channel_purpose`

**Set Channel Purpose.** Set (overwrite) the purpose of a channel, the longer "what this channel is for" description. Idempotent: re-running with the same purpose leaves the channel in the same state. Use Set Channel Topic for the short topic shown in the channel header instead. The bot must be a member of the channel. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID (e.g. 'C0123456789'). Pass a channel ID, or resolve a #name to an ID first with Find Channel. |
| `purpose` | string | yes |  | Purpose. The new purpose text. Pass an empty string to clear the purpose. |

Output fields:

- `channel`: Channel
- `channel.id`: Channel ID
- `channel.name`: Name
- `channel.is_channel`: Is Channel (boolean)
- `channel.is_group`: Is Group (boolean)
- `channel.is_private`: Is Private (boolean)
- `channel.is_archived`: Is Archived (boolean)
- `channel.is_general`: Is General (boolean)
- `channel.is_member`: Is Member (boolean)
- `channel.is_shared`: Is Shared (boolean)
- `channel.created`: Created (Unix Timestamp) (number)
- `channel.creator`: Creator User ID
- `channel.num_members`: Member Count (number)
- `channel.topic`: Topic
- `channel.topic.value`: Value
- `channel.topic.creator`: Set By User ID
- `channel.topic.last_set`: Last Set (Unix Timestamp) (number)
- `channel.purpose`: Purpose
- `channel.purpose.value`: Value
- `channel.purpose.creator`: Set By User ID
- `channel.purpose.last_set`: Last Set (Unix Timestamp) (number)
- `channel.previous_names`: Previous Names

### `slack_set_channel_topic`

**Set Channel Topic.** Set (overwrite) the topic shown in a channel header. Idempotent: re-running with the same topic leaves the channel in the same state. Use Set Channel Purpose for the longer "what this channel is for" description instead. The bot must be a member of the channel. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID (e.g. 'C0123456789'). Pass a channel ID, or resolve a #name to an ID first with Find Channel. |
| `topic` | string | yes |  | Topic. The new topic text. Pass an empty string to clear the topic. |

Output fields:

- `channel`: Channel
- `channel.id`: Channel ID
- `channel.name`: Name
- `channel.is_channel`: Is Channel (boolean)
- `channel.is_group`: Is Group (boolean)
- `channel.is_private`: Is Private (boolean)
- `channel.is_archived`: Is Archived (boolean)
- `channel.is_general`: Is General (boolean)
- `channel.is_member`: Is Member (boolean)
- `channel.is_shared`: Is Shared (boolean)
- `channel.created`: Created (Unix Timestamp) (number)
- `channel.creator`: Creator User ID
- `channel.num_members`: Member Count (number)
- `channel.topic`: Topic
- `channel.topic.value`: Value
- `channel.topic.creator`: Set By User ID
- `channel.topic.last_set`: Last Set (Unix Timestamp) (number)
- `channel.purpose`: Purpose
- `channel.purpose.value`: Value
- `channel.purpose.creator`: Set By User ID
- `channel.purpose.last_set`: Last Set (Unix Timestamp) (number)
- `channel.previous_names`: Previous Names

### `set_user_status`

**Set User Status.** Sets the authenticated user's custom status text and optional emoji, with an optional Unix-timestamp expiration. Pick this to change only the status; use Update Profile to change name or email fields. Requires a user token (not a bot token); this overwrites any existing status so re-running with the same input is idempotent. Status text is capped at 100 characters. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Status Text. Up to 100 characters. |
| `emoji` | string | no |  | Emoji. Emoji name with colons. |
| `expiration` | number | no |  | Expires At. Unix timestamp in seconds. Empty keeps the status until cleared. |

Output fields:

- `profile`: Profile
- `profile.real_name`: Real Name
- `profile.display_name`: Display Name
- `profile.email`: Email (email)
- `profile.first_name`: First Name
- `profile.last_name`: Last Name
- `profile.title`: Title
- `profile.phone`: Phone
- `profile.status_text`: Status Text
- `profile.status_emoji`: Status Emoji
- `profile.image_192`: Avatar (image)
- `profile.team`: Team ID

### `update_profile`

**Update Profile.** Updates basic profile fields (first name, last name, email) for the authenticated user, or for another user when an admin supplies a user ID. Use Set User Status instead to change only the custom status text/emoji. Requires a user token; setting the same values again is idempotent. Changing the email sends Slack notification emails to both addresses, and editing another user is admin-only on paid teams. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `email` | string | no |  | Email. Slack notifies both the old and new address. |
| `userId` | string | no |  | User ID. Admins on paid plans only. Empty updates the connected user. |

Output fields:

- `profile`: Profile
- `profile.real_name`: Real Name
- `profile.display_name`: Display Name
- `profile.email`: Email (email)
- `profile.first_name`: First Name
- `profile.last_name`: Last Name
- `profile.title`: Title
- `profile.phone`: Phone
- `profile.status_text`: Status Text
- `profile.status_emoji`: Status Emoji
- `profile.image_192`: Avatar (image)
- `profile.team`: Team ID

### `slack_unarchive_channel`

**Unarchive Channel.** Reopen an archived channel, the counterpart to Archive Channel. Not idempotent: unarchiving a channel that is not archived returns a "not_archived" error rather than a silent no-op, so do not retry blindly. Uses the authorizing user's token (Slack only allows a member/admin to unarchive, not a bot token). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channel ID (e.g. 'C0123456789'). Pass a channel ID, or resolve a #name to an ID first with Find Channel. |

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
| `useUserToken` | boolean | no | `false` | Use User Token. Authenticate with the user token instead of the bot token. |

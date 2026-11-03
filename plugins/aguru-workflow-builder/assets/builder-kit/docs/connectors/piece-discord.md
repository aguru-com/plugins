# Discord

Instant messaging and VoIP social platform

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-discord'
  version: '0.7.2'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Bot Token

> 1. Open https://discord.com/developers/applications and select or create an application.
> 2. In **Bot**, click **Reset Token** and copy the token.
> 3. Still in **Bot**, enable **Server Members Intent** and **Message Content Intent**.
> 4. In **OAuth2 → URL Generator**, pick the **bot** scope and the permissions you need, open the URL and add the bot to your server.

## Actions

### `sendMessageWithBot`

**Send Message with Bot.** Posts a new message (optionally with file attachments) to a Discord channel or thread using a bot token. Use when an agent needs to send bot-authored content to a known channel ID. Requires the bot to have access to that channel; each call posts a separate message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel. Channels from every server the bot has joined. A value the product loads from the provider, such as an id; write the value itself. |
| `message` | string | no |  | Message. Text of the message. Leave empty to send only files. |
| `files` | array | no | `[]` | Attachments. Files uploaded with the message. Each item: { `file`? }. |

Output fields:

- `id`: Message ID
- `channel_id`: Channel ID
- `content`: Content
- `timestamp`: Sent At (datetime)
- `edited_timestamp`: Edited At (datetime)
- `pinned`: Pinned (boolean)
- `tts`: Text To Speech (boolean)
- `mention_everyone`: Mentions Everyone (boolean)
- `author`: Author
- `author.id`: User ID
- `author.username`: Username
- `author.global_name`: Display Name
- `author.bot`: Is Bot (boolean)
- `attachments`: Attachments
- `attachments[].id`: Attachment ID
- `attachments[].filename`: File Name
- `attachments[].size`: Size (filesize)
- `attachments[].url`: URL (url)
- `attachments[].content_type`: Content Type

### `send_message_webhook`

**Send Message via Webhook.** Posts a message to a Discord channel through an incoming webhook URL, with optional custom username, avatar, and rich embeds. Use when you have a webhook URL rather than a bot connection; no Discord auth is needed. Each call posts a new message, so it is not idempotent.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhook_url` | string | yes |  | Webhook URL. Server Settings, Integrations, Webhooks, then Copy Webhook URL. |
| `content` | string | yes |  | Message. |
| `username` | string | no |  | Display Name. Shown instead of the webhook name for this message. |
| `avatar_url` | string | no |  | Avatar URL. Shown instead of the webhook avatar for this message. |
| `embeds` | JSON | no | `[]` | Embeds. JSON array of Discord embed objects. |
| `tts` | boolean | no |  | Text to Speech. Discord reads the message aloud in the channel. |

### `request_approval_message`

**Request Approval in a Channel.** Posts a message with a single button linking to a confirmation page where a human chooses Approve or Disapprove to a Discord channel, then pauses the flow until they respond and resumes with the decision. Use as a human-in-the-loop approval gate before an agent proceeds with a consequential step. Blocks until a response arrives; each call posts a new approval message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel. Channels from every server the bot has joined. A value the product loads from the provider, such as an id; write the value itself. |
| `content` | string | yes |  | Message. Say what needs approval; a Review & Respond button is added below. |

Output fields:

- `approved`: Approved (boolean)

### `add_role_to_member`

**Add Role to Member.** Assigns a role to a guild member, identified by guild ID, user ID, and role ID. Use to grant permissions or tag a user. Requires the bot to have Manage Roles and a higher role than the target; idempotent, since re-adding an already-assigned role leaves the member unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Server. Only servers the bot has been added to are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `user_id` | string | yes |  | User ID. Right-click the member and choose Copy User ID in Developer Mode. |
| `role_id` | string | yes |  | Role. Roles of the selected server. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)

### `remove_role_from_member`

**Remove Role from Member.** Removes a role from a guild member, identified by guild ID, user ID, and role ID. Use to revoke permissions or untag a user. Requires the bot to have Manage Roles and a higher role than the target; idempotent, since removing a role the member does not have leaves them unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Server. Only servers the bot has been added to are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `user_id` | string | yes |  | User ID. Right-click the member and choose Copy User ID in Developer Mode. |
| `role_id` | string | yes |  | Role. Roles of the selected server. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)

### `remove_member_from_guild`

**Remove Member from Server.** Kicks a member from a guild, identified by guild ID and user ID; the user may rejoin later via an invite. Use to remove someone without a permanent ban. Requires the bot to have Kick Members permission; idempotent, since removing an absent member yields the same end state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Server. Only servers the bot has been added to are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `user_id` | string | yes |  | User ID. Right-click the member and choose Copy User ID in Developer Mode. |

Output fields:

- `success`: Success (boolean)

### `list_guild_members`

**List Members.** Lists members of a guild, returning their user IDs and usernames for the given guild ID. Use to look up a member ID before role, kick, or ban actions, or to enumerate who is in a server. Read-only and idempotent; requires the Server Members privileged intent to be enabled for the bot. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Server. Only servers the bot has been added to are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `shortText` | string | no |  | Search. Only members whose username or nickname contains this text. |

Output fields:

- `options`: Members
- `options[].value`: User ID
- `options[].label`: Username

### `rename_channel`

**Rename Channel.** Renames an existing channel, identified by channel ID, to a new name. Use to update a channel title. Requires the bot to have Manage Channels permission; idempotent, since setting the same name repeatedly yields the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel. Channels from every server the bot has joined. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. Discord lowercases the name and turns spaces into dashes. |

Output fields:

- `success`: Success (boolean)

### `create_channel`

**Create Channel.** Creates a new channel in a guild with the given name and optional topic, identified by guild ID. Use to provision a channel before posting to it. Requires the bot to have Manage Channels permission; not idempotent, since each call creates a separate channel even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Server. Only servers the bot has been added to are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. Discord lowercases the name and turns spaces into dashes. |
| `topic` | string | no |  | Topic. Shown at the top of the channel. |

Output fields:

- `success`: Success (boolean)
- `channel`: Channel
- `channel.id`: Channel ID
- `channel.name`: Name

### `delete_channel`

**Delete Channel.** Permanently deletes a channel, identified by channel ID. Use to remove a channel and its messages; this is destructive and cannot be undone. Requires the bot to have Manage Channels permission; idempotent in end state, since deleting an already-removed channel leaves it gone. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel. Channels from every server the bot has joined. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Channel ID
- `name`: Name
- `type`: Type (number)
- `guild_id`: Guild ID
- `parent_id`: Parent Category ID
- `topic`: Topic
- `nsfw`: NSFW (boolean)

### `find_channel`

**Find Channel.** Looks up a channel in a guild by its exact name and returns its channel ID, given the guild ID. Use to resolve a channel name into the ID required by message, rename, or delete actions. Read-only and idempotent; matching is exact and returns the first match. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Server. Only servers the bot has been added to are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. Exact name without the leading #, case-sensitive. |

Output fields:

- `success`: Success (boolean)
- `channel_id`: Channel ID

### `remove_ban_from_user`

**Remove Ban from User.** Lifts a guild ban for a user, identified by guild ID and user ID, with an optional audit-log reason; the user may rejoin afterward. Use to reverse a previous ban. Requires the bot to have Ban Members permission; idempotent, since unbanning a user who is not banned yields the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Server. Only servers the bot has been added to are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `user_id` | string | yes |  | User ID. Right-click the member and choose Copy User ID in Developer Mode. |
| `unban_reason` | string | no |  | Reason. Recorded in the server audit log. |

Output fields:

- `success`: Success (boolean)

### `createGuildRole`

**Create Role.** Creates a new role in a guild with the given name and optional color, hoist, and mentionable settings, identified by guild ID. Use to provision a role before assigning it to members. Requires the bot to have Manage Roles permission; not idempotent, since each call creates a separate role even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Server. Only servers the bot has been added to are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `role_name` | string | yes |  | Name. |
| `role_color` | string | no |  | Color. Hex like #5865F2 or a decimal RGB number. |
| `display_separated` | boolean | no |  | Show Separately. Lists members with this role in their own sidebar group. |
| `role_mentionable` | boolean | no |  | Mentionable. Lets anyone @mention this role. |
| `creation_reason` | string | no |  | Reason. Recorded in the server audit log. |

Output fields:

- `success`: Success (boolean)
- `role`: Role
- `role.id`: Role ID
- `role.name`: Name

### `deleteGuildRole`

**Delete Role.** Permanently deletes a role from a guild, identified by guild ID and role ID, with an optional audit-log reason; the role is removed from all members. Use to remove an unwanted role. Requires the bot to have Manage Roles permission; idempotent in end state, since deleting an already-removed role leaves it gone. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Server. Only servers the bot has been added to are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `role_id` | string | yes |  | Role. Roles of the selected server. A value the product loads from the provider, such as an id; write the value itself. |
| `deletion_reason` | string | no |  | Reason. Recorded in the server audit log. |

Output fields:

- `success`: Success (boolean)
- `alreadyAbsent`: Already Absent (boolean)

### `ban_guild_member`

**Ban Member.** Bans a user from a guild, identified by guild ID and user ID, with an optional audit-log reason; this removes them and blocks rejoining until unbanned. Use to permanently remove a disruptive user. Requires the bot to have Ban Members permission; idempotent, since re-banning an already-banned user yields the same end state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Server. Only servers the bot has been added to are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `user_id` | string | yes |  | User ID. Right-click the member and choose Copy User ID in Developer Mode. |
| `ban_reason` | string | no |  | Reason. Recorded in the server audit log. |

Output fields:

- `success`: Success (boolean)

### `discord_send_message`

**Send Message.** Posts a message to a Discord channel or thread by channel ID (POST /channels/{channel_id}/messages). Resolve a channel name to its ID with Find Channel or List Channels first. Each call creates a new message, so it is not idempotent. Requires the bot to have Send Messages access to the channel. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric Discord channel or thread ID (e.g. "1080123456789012345"). Resolve a name to an ID with Find Channel or List Channels. |
| `content` | string | no |  | Message. The text content of the message. Up to 2000 characters. |
| `files` | array | no | `[]` | Attachments. Optional files to attach to the message. Each item: { `file`? }. |

Output fields:

- `id`: Message ID
- `channel_id`: Channel ID
- `content`: Content
- `timestamp`: Sent At (datetime)
- `edited_timestamp`: Edited At (datetime)
- `pinned`: Pinned (boolean)
- `tts`: Text To Speech (boolean)
- `mention_everyone`: Mentions Everyone (boolean)
- `author`: Author
- `author.id`: User ID
- `author.username`: Username
- `author.global_name`: Display Name
- `author.bot`: Is Bot (boolean)
- `attachments`: Attachments
- `attachments[].id`: Attachment ID
- `attachments[].filename`: File Name
- `attachments[].size`: Size (filesize)
- `attachments[].url`: URL (url)
- `attachments[].content_type`: Content Type

### `discord_create_channel`

**Create Channel.** Creates a new channel in a guild by guild ID (POST /guilds/{guild_id}/channels). Each call creates a separate channel even with the same name, so it is not idempotent. Requires the bot to have Manage Channels permission in the guild. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID (e.g. "974519864045756446"). Find it in Discord server settings or via Get Guild / List ... actions. |
| `name` | string | yes |  | Name. The name of the new channel (e.g. "support"). |
| `topic` | string | no |  | Topic. Optional channel topic / description. |

Output fields:

- `success`: Success (boolean)
- `channel`: Channel
- `channel.id`: Channel ID
- `channel.name`: Name

### `discord_delete_channel`

**Delete Channel.** Permanently deletes a channel by channel ID (DELETE /channels/{channel_id}). This is destructive and removes the channel and its messages. Idempotent: deleting an already-removed channel returns success (alreadyAbsent). Requires the bot to have Manage Channels permission. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric channel ID to delete (e.g. "1080123456789012345"). Resolve a name with Find Channel or List Channels. |

Output fields:

- `id`: Channel ID
- `name`: Name
- `type`: Type (number)
- `guild_id`: Guild ID
- `parent_id`: Parent Category ID
- `topic`: Topic
- `nsfw`: NSFW (boolean)

### `discord_rename_channel`

**Rename Channel.** Renames a channel by channel ID (PATCH /channels/{channel_id} with the name field only). Idempotent: setting the same name repeatedly yields the same result. Requires the bot to have Manage Channels permission. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric channel ID to rename (e.g. "1080123456789012345"). Resolve a name with Find Channel or List Channels. |
| `name` | string | yes |  | New Name. The new channel name. |

Output fields:

- `success`: Success (boolean)

### `discord_find_channel`

**Find Channel.** Looks up a channel in a guild by exact name and returns its channel ID (GET /guilds/{guild_id}/channels, client-side match). Use this resolver before any channel-scoped action (Send Message, Rename Channel, Delete Channel). Read-only and idempotent; returns the first exact-name match. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID (e.g. "974519864045756446"). |
| `name` | string | yes |  | Channel Name. The exact channel name to find (e.g. "general"). |

Output fields:

- `found`: Found (boolean)
- `channel_id`: Channel ID
- `name`: Name

### `discord_add_role`

**Add Role to Member.** Assigns a role to a guild member by guild ID, user ID, and role ID (PUT /guilds/{guild_id}/members/{user_id}/roles/{role_id}). Resolve role IDs with List Roles and user IDs with Find Member. Idempotent: re-adding an already-assigned role is a no-op. Requires Manage Roles and the bot role positioned above the target role. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID. |
| `user_id` | string | yes |  | User ID. The numeric user ID of the member. Resolve from a username with Find Member. |
| `role_id` | string | yes |  | Role ID. The numeric role ID. Resolve from a name with List Roles. |

Output fields:

- `success`: Success (boolean)

### `discord_remove_role`

**Remove Role from Member.** Removes a role from a guild member by guild ID, user ID, and role ID (DELETE /guilds/{guild_id}/members/{user_id}/roles/{role_id}). Resolve role IDs with List Roles and user IDs with Find Member. Idempotent: removing a role the member does not have is a no-op. Requires Manage Roles and the bot role above the target role. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID. |
| `user_id` | string | yes |  | User ID. The numeric user ID of the member. Resolve from a username with Find Member. |
| `role_id` | string | yes |  | Role ID. The numeric role ID. Resolve from a name with List Roles. |

Output fields:

- `success`: Success (boolean)
- `alreadyAbsent`: Already Absent (boolean)

### `discord_create_role`

**Create Role.** Creates a new role in a guild by guild ID (POST /guilds/{guild_id}/roles) with name and optional color, hoist, and mentionable settings. Each call creates a separate role even with the same name, so it is not idempotent. Requires the bot to have Manage Roles permission. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID. |
| `name` | string | yes |  | Role Name. The name of the new role. |
| `color` | number | no |  | Color. Optional role color as an integer RGB value (e.g. 3447003 for blue). Omit for the default color. |
| `hoist` | boolean | no |  | Display Separately. Whether members with this role show separately in the sidebar. |
| `mentionable` | boolean | no |  | Mentionable. Whether the role can be mentioned by other members. |
| `reason` | string | no |  | Reason. Optional audit-log reason. |

Output fields:

- `success`: Success (boolean)
- `role`: Role
- `role.id`: Role ID
- `role.name`: Name

### `discord_delete_role`

**Delete Role.** Permanently deletes a role from a guild by guild ID and role ID (DELETE /guilds/{guild_id}/roles/{role_id}); the role is removed from all members. Resolve role IDs with List Roles. Idempotent: deleting an already-removed role returns success (alreadyAbsent). Requires Manage Roles permission. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID. |
| `role_id` | string | yes |  | Role ID. The numeric role ID to delete. Resolve from a name with List Roles. |
| `reason` | string | no |  | Reason. Optional audit-log reason. |

Output fields:

- `success`: Success (boolean)
- `alreadyAbsent`: Already Absent (boolean)

### `discord_find_member`

**Find Member.** Searches guild members by a username or nickname prefix (GET /guilds/{guild_id}/members/search?query=&limit=) and returns matching user IDs. Use to resolve a name into the user ID needed by role, kick, ban, or timeout actions. This server-side prefix search does NOT require the privileged Server Members intent. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID. |
| `query` | string | yes |  | Query. Username or nickname prefix to match (e.g. "jane"). Matched against the start of the name. |
| `limit` | number | no | `10` | Limit. Max members to return, 1-1000. Defaults to 10. |

Output fields:

- `count`: Count (number)
- `members`: Members
- `members[].user_id`: User ID
- `members[].username`: Username
- `members[].global_name`: Display Name
- `members[].nick`: Nickname
- `members[].joined_at`: Joined At (datetime)
- `members[].roles`: Role IDs

### `discord_list_messages`

**List Messages.** Reads messages from a channel by channel ID (GET /channels/{channel_id}/messages?limit=&before=&after=&around=). The before, after, and around cursors are MUTUALLY EXCLUSIVE — supply at most one. Read-only and idempotent. Requires Read Message History access to the channel. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric channel ID. Resolve a name with Find Channel. |
| `limit` | number | no | `50` | Limit. Max messages to return, 1-100. Defaults to 50. |
| `before` | string | no |  | Before Message ID. Return messages before this message ID. Mutually exclusive with After and Around. |
| `after` | string | no |  | After Message ID. Return messages after this message ID. Mutually exclusive with Before and Around. |
| `around` | string | no |  | Around Message ID. Return messages around this message ID. Mutually exclusive with Before and After. |

Output fields:

- `count`: Count (number)
- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].content`: Content
- `messages[].author_id`: Author ID
- `messages[].author_username`: Author Username
- `messages[].pinned`: Pinned (boolean)
- `messages[].timestamp`: Sent At (datetime)
- `messages[].edited_timestamp`: Edited At (datetime)

### `discord_edit_message`

**Edit Message.** Edits the text content of an existing message by channel ID and message ID (PATCH /channels/{channel_id}/messages/{message_id}). Only the bot's OWN messages can be edited (editing another author's message returns 403). Idempotent: re-applying the same content yields the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric channel ID containing the message. |
| `message_id` | string | yes |  | Message ID. The numeric message ID to edit. Obtain from List Messages or the trigger payload. |
| `content` | string | yes |  | New Content. The new message text. Up to 2000 characters. |

Output fields:

- `success`: Success (boolean)
- `id`: Message ID
- `content`: Content
- `edited_timestamp`: Edited At (datetime)

### `discord_delete_message`

**Delete Message.** Deletes a single message by channel ID and message ID (DELETE /channels/{channel_id}/messages/{message_id}). Idempotent: deleting an already-removed message returns success (alreadyAbsent). Deleting another author's message requires the bot to have Manage Messages permission. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric channel ID containing the message. |
| `message_id` | string | yes |  | Message ID. The numeric message ID to delete. Obtain from List Messages. |
| `reason` | string | no |  | Reason. Optional audit-log reason. |

Output fields:

- `success`: Success (boolean)
- `alreadyAbsent`: Already Absent (boolean)

### `discord_bulk_delete_messages`

**Bulk Delete Messages.** Deletes 2-100 messages in one batch by channel ID (POST /channels/{channel_id}/messages/bulk-delete). All target messages must be newer than 14 days. Not idempotent: a re-run with the same IDs fails because the messages are already gone. Requires the bot to have Manage Messages permission. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric channel ID. |
| `message_ids` | array | yes |  | Message IDs. A list of 2-100 message IDs to delete, all less than 14 days old. Obtain from List Messages. |

Output fields:

- `success`: Success (boolean)
- `deleted_count`: Deleted Count (number)

### `discord_pin_message`

**Pin Message.** Pins a message in a channel by channel ID and message ID (PUT /channels/{channel_id}/pins/{message_id}). Idempotent: re-pinning an already-pinned message is a no-op. A channel holds at most 50 pins. Requires the bot to have Manage Messages permission. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric channel ID. |
| `message_id` | string | yes |  | Message ID. The numeric message ID to pin. Obtain from List Messages. |

Output fields:

- `success`: Success (boolean)

### `discord_unpin_message`

**Unpin Message.** Unpins a message in a channel by channel ID and message ID (DELETE /channels/{channel_id}/pins/{message_id}). Idempotent: unpinning a message that is not pinned returns success (alreadyAbsent). Requires the bot to have Manage Messages permission. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric channel ID. |
| `message_id` | string | yes |  | Message ID. The numeric message ID to unpin. |

Output fields:

- `success`: Success (boolean)
- `alreadyAbsent`: Already Absent (boolean)

### `discord_list_pinned_messages`

**List Pinned Messages.** Lists the pinned messages in a channel by channel ID (GET /channels/{channel_id}/pins). Read-only and idempotent. Requires Read Message History access to the channel. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric channel ID. |

Output fields:

- `count`: Count (number)
- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].content`: Content
- `messages[].author_id`: Author ID
- `messages[].author_username`: Author Username
- `messages[].timestamp`: Sent At (datetime)

### `discord_add_reaction`

**Add Reaction.** Adds the bot's reaction to a message by channel ID, message ID, and emoji (PUT /channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me). For a standard emoji pass the unicode character (e.g. "👍"); for a custom emoji pass name:id (e.g. "partyblob:12345"), resolved via List Emojis. Idempotent: re-adding the same reaction is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric channel ID. |
| `message_id` | string | yes |  | Message ID. The numeric message ID to react to. |
| `emoji` | string | yes |  | Emoji. Standard emoji as a unicode character (e.g. "🔥"), or a custom emoji as name:id (e.g. "partyblob:123456789"). Resolve custom emoji IDs with List Emojis. |

Output fields:

- `success`: Success (boolean)

### `discord_remove_reaction`

**Remove Own Reaction.** Removes the bot's OWN reaction from a message by channel ID, message ID, and emoji (DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji}/@me). Emoji format: unicode char for standard, name:id for custom (resolve via List Emojis). Idempotent: removing a reaction that is not present returns success (alreadyAbsent). Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric channel ID. |
| `message_id` | string | yes |  | Message ID. The numeric message ID. |
| `emoji` | string | yes |  | Emoji. Standard emoji as a unicode character (e.g. "🔥"), or a custom emoji as name:id. Resolve custom emoji IDs with List Emojis. |

Output fields:

- `success`: Success (boolean)
- `alreadyAbsent`: Already Absent (boolean)

### `discord_remove_user_reaction`

**Remove User Reaction.** Removes a specific user's reaction from a message by channel ID, message ID, emoji, and user ID (DELETE /channels/{channel_id}/messages/{message_id}/reactions/{emoji}/{user_id}). Use for moderation. Emoji format: unicode char for standard, name:id for custom (resolve via List Emojis). Idempotent: removing an absent reaction returns success (alreadyAbsent). Requires Manage Messages permission. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric channel ID. |
| `message_id` | string | yes |  | Message ID. The numeric message ID. |
| `emoji` | string | yes |  | Emoji. Standard emoji as a unicode character, or a custom emoji as name:id. Resolve custom emoji IDs with List Emojis. |
| `user_id` | string | yes |  | User ID. The numeric user ID whose reaction to remove. |

Output fields:

- `success`: Success (boolean)
- `alreadyAbsent`: Already Absent (boolean)

### `discord_list_reactions`

**List Reactions.** Lists the users who reacted to a message with a given emoji by channel ID, message ID, and emoji (GET /channels/{channel_id}/messages/{message_id}/reactions/{emoji}). Emoji format: unicode char for standard, name:id for custom (resolve via List Emojis). Paginated by after/limit. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric channel ID. |
| `message_id` | string | yes |  | Message ID. The numeric message ID. |
| `emoji` | string | yes |  | Emoji. Standard emoji as a unicode character, or a custom emoji as name:id. Resolve custom emoji IDs with List Emojis. |
| `after` | string | no |  | After User ID. Return users after this user ID for pagination. |
| `limit` | number | no | `25` | Limit. Max users to return, 1-100. Defaults to 25. |

Output fields:

- `count`: Count (number)
- `users`: Users
- `users[].user_id`: User ID
- `users[].username`: Username
- `users[].global_name`: Display Name

### `discord_clear_reactions`

**Clear All Reactions.** Removes ALL reactions from a message by channel ID and message ID (DELETE /channels/{channel_id}/messages/{message_id}/reactions). This is a destructive bulk operation. Not idempotent: it is not a stable single-target set-by-key. Requires the bot to have Manage Messages permission. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric channel ID. |
| `message_id` | string | yes |  | Message ID. The numeric message ID to clear reactions from. |

Output fields:

- `success`: Success (boolean)

### `discord_create_thread_from_message`

**Create Thread from Message.** Creates a thread anchored to an existing message by channel ID and message ID (POST /channels/{channel_id}/messages/{message_id}/threads). Each call creates a new thread, so it is not idempotent. Requires Create Public Threads permission (usually a default). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric channel ID containing the message. |
| `message_id` | string | yes |  | Message ID. The numeric message ID to anchor the thread to. |
| `name` | string | yes |  | Thread Name. The name of the new thread. Up to 100 characters. |
| `auto_archive_duration` | string | no | `1440` | Auto Archive Duration. Minutes of inactivity before the thread auto-archives. One of `60`, `1440`, `4320`, `10080`. |

Output fields:

- `success`: Success (boolean)
- `thread`: Thread
- `thread.id`: Thread ID
- `thread.name`: Name

### `discord_create_thread`

**Create Thread.** Creates a standalone thread or forum post in a channel by channel ID (POST /channels/{channel_id}/threads). Use Create Thread from Message instead to anchor a thread to a specific message. Each call creates a new thread, so it is not idempotent. Requires Create Threads permission. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric parent channel ID. |
| `name` | string | yes |  | Thread Name. The name of the new thread. Up to 100 characters. |
| `type` | string | no | `11` | Thread Type. The channel type of the thread. One of `11`, `12`, `10`. |
| `auto_archive_duration` | string | no | `1440` | Auto Archive Duration. Minutes of inactivity before the thread auto-archives. One of `60`, `1440`, `4320`, `10080`. |
| `message` | string | no |  | Starter Message. Required when the parent is a Forum or Media channel: the content of the initial post that starts the thread. Leave empty for text/announcement channel threads. |

Output fields:

- `success`: Success (boolean)
- `thread`: Thread
- `thread.id`: Thread ID
- `thread.name`: Name

### `discord_list_active_threads`

**List Active Threads.** Lists all active (non-archived) threads in a guild by guild ID (GET /guilds/{guild_id}/threads/active). Read-only and idempotent. Requires the bot to be able to view the parent channels. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID. |

Output fields:

- `count`: Count (number)
- `threads`: Threads
- `threads[].id`: Thread ID
- `threads[].name`: Name
- `threads[].parent_id`: Parent Channel ID
- `threads[].owner_id`: Owner ID
- `threads[].archived`: Archived (boolean)

### `discord_list_archived_threads`

**List Archived Threads.** Lists PUBLIC archived threads in a channel by channel ID (GET /channels/{channel_id}/threads/archived/public). Read-only and idempotent. Requires Read Message History access to the channel. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric parent channel ID. |

Output fields:

- `count`: Count (number)
- `threads`: Threads
- `threads[].id`: Thread ID
- `threads[].name`: Name
- `threads[].parent_id`: Parent Channel ID
- `threads[].owner_id`: Owner ID
- `threads[].archive_timestamp`: Archived At (datetime)

### `discord_join_thread`

**Join Thread.** Adds the bot itself to a thread by channel (thread) ID (PUT /channels/{channel_id}/thread-members/@me). Idempotent: re-joining a thread the bot is already in is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Thread ID. The numeric thread (channel) ID to join. |

Output fields:

- `success`: Success (boolean)

### `discord_leave_thread`

**Leave Thread.** Removes the bot itself from a thread by channel (thread) ID (DELETE /channels/{channel_id}/thread-members/@me). Idempotent: leaving a thread the bot is not in returns success (alreadyAbsent). Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Thread ID. The numeric thread (channel) ID to leave. |

Output fields:

- `success`: Success (boolean)
- `alreadyAbsent`: Already Absent (boolean)

### `discord_add_thread_member`

**Add Thread Member.** Adds a user to a thread by thread (channel) ID and user ID (PUT /channels/{channel_id}/thread-members/{user_id}). Idempotent: re-adding a user already in the thread is a no-op. Requires the bot to be in the thread and have Send Messages in it. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Thread ID. The numeric thread (channel) ID. |
| `user_id` | string | yes |  | User ID. The numeric user ID to add. Resolve from a username with Find Member. |

Output fields:

- `success`: Success (boolean)

### `discord_list_channels`

**List Channels.** Lists all channels in a guild by guild ID (GET /guilds/{guild_id}/channels), returning IDs, names, and types. Use to enumerate channels or to resolve a name to an ID (use Find Channel for a single exact-name lookup). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID. |

Output fields:

- `count`: Count (number)
- `channels`: Channels
- `channels[].id`: Channel ID
- `channels[].name`: Name
- `channels[].type`: Type (number)
- `channels[].parent_id`: Parent Category ID
- `channels[].position`: Position (number)
- `channels[].topic`: Topic

### `discord_get_channel`

**Get Channel.** Fetches a single channel by channel ID (GET /channels/{channel_id}), returning its name, type, topic, and parent. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel_id` | string | yes |  | Channel ID. The numeric channel ID. |

Output fields:

- `id`: Channel ID
- `name`: Name
- `type`: Type (number)
- `guild_id`: Guild ID
- `parent_id`: Parent Category ID
- `topic`: Topic
- `nsfw`: NSFW (boolean)

### `discord_get_member`

**Get Member.** Fetches a single guild member by guild ID and user ID (GET /guilds/{guild_id}/members/{user_id}), returning their nickname, roles, and join date. A single-member GET does NOT require the privileged Server Members intent. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID. |
| `user_id` | string | yes |  | User ID. The numeric user ID. Resolve from a username with Find Member. |

Output fields:

- `user_id`: User ID
- `username`: Username
- `global_name`: Display Name
- `nick`: Nickname
- `roles`: Role IDs
- `joined_at`: Joined At (datetime)
- `communication_disabled_until`: Timed Out Until (datetime)

### `discord_list_bans`

**List Bans.** Lists the banned users of a guild by guild ID (GET /guilds/{guild_id}/bans?limit=&before=&after=), returning user IDs and ban reasons. Paginated. Read-only and idempotent. Requires the bot to have Ban Members permission. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID. |
| `limit` | number | no | `100` | Limit. Max bans to return, 1-1000. Defaults to 100. |
| `before` | string | no |  | Before User ID. Return bans before this user ID for pagination. |
| `after` | string | no |  | After User ID. Return bans after this user ID for pagination. |

Output fields:

- `count`: Count (number)
- `bans`: Bans
- `bans[].user_id`: User ID
- `bans[].username`: Username
- `bans[].reason`: Reason

### `discord_list_roles`

**List Roles.** Lists the roles of a guild by guild ID (GET /guilds/{guild_id}/roles), returning role IDs and names. Use this resolver to turn a role name into the ID needed by Add Role, Remove Role, Update Role, or Delete Role. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID. |

Output fields:

- `count`: Count (number)
- `roles`: Roles
- `roles[].id`: Role ID
- `roles[].name`: Name
- `roles[].color`: Color (number)
- `roles[].hoist`: Display Separately (boolean)
- `roles[].position`: Position (number)
- `roles[].mentionable`: Mentionable (boolean)

### `discord_update_role`

**Update Role.** Updates a role by guild ID and role ID (PATCH /guilds/{guild_id}/roles/{role_id}) — name, color, hoist, and mentionable only; it deliberately does NOT touch the permissions bitfield. Resolve role IDs with List Roles. Idempotent: setting the same values yields the same state. Requires Manage Roles permission. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID. |
| `role_id` | string | yes |  | Role ID. The numeric role ID to update. Resolve from a name with List Roles. |
| `name` | string | no |  | Name. New role name. Leave empty to keep the current name. |
| `color` | number | no |  | Color. New role color as an integer RGB value (e.g. 3447003). Leave empty to keep the current color. |
| `hoist` | boolean | no |  | Display Separately. Whether members with this role show separately in the sidebar. |
| `mentionable` | boolean | no |  | Mentionable. Whether the role can be mentioned by other members. |
| `reason` | string | no |  | Reason. Optional audit-log reason. |

Output fields:

- `success`: Success (boolean)
- `role`: Role
- `role.id`: Role ID
- `role.name`: Name

### `discord_get_guild`

**Get Guild.** Fetches metadata about a guild by guild ID (GET /guilds/{guild_id}?with_counts=), returning its name, owner, and optional member counts. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID. |
| `with_counts` | boolean | no | `false` | Include Member Counts. Whether to include approximate member and presence counts. |

Output fields:

- `id`: Guild ID
- `name`: Name
- `owner_id`: Owner ID
- `description`: Description
- `approximate_member_count`: Approximate Member Count (number)
- `approximate_presence_count`: Approximate Presence Count (number)

### `discord_list_emojis`

**List Emojis.** Lists a guild's custom emojis by guild ID (GET /guilds/{guild_id}/emojis), returning each emoji's id and name. Use this to build the name:id string required by Add Reaction / Remove Reaction for custom emojis. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID. |

Output fields:

- `count`: Count (number)
- `emojis`: Emojis
- `emojis[].id`: Emoji ID
- `emojis[].name`: Name
- `emojis[].animated`: Animated (boolean)
- `emojis[].reaction_string`: Reaction String

### `discord_create_scheduled_event`

**Create Scheduled Event.** Creates a scheduled event in a guild by guild ID (POST /guilds/{guild_id}/scheduled-events). Required fields depend on Entity Type: EXTERNAL needs both a Location and a Scheduled End Time; STAGE_INSTANCE and VOICE need a Channel ID. Each call creates a new event, so it is not idempotent. Requires the bot to have Manage Events permission. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID. |
| `name` | string | yes |  | Name. The event name. |
| `scheduled_start_time` | string | yes |  | Scheduled Start Time. ISO 8601 start time (e.g. "2026-07-01T18:00:00Z"). |
| `entity_type` | string | yes | `3` | Entity Type. Where the event happens. EXTERNAL requires Location + Scheduled End Time; STAGE/VOICE require a Channel ID. One of `1`, `2`, `3`. |
| `channel_id` | string | no |  | Channel ID. Required for STAGE_INSTANCE and VOICE entity types. The numeric voice/stage channel ID. |
| `location` | string | no |  | Location. Required for the EXTERNAL entity type. A free-text location (e.g. "https://zoom.us/..." or "Main Hall"). |
| `scheduled_end_time` | string | no |  | Scheduled End Time. ISO 8601 end time. Required for the EXTERNAL entity type (e.g. "2026-07-01T20:00:00Z"). |
| `description` | string | no |  | Description. Optional event description. |

Output fields:

- `success`: Success (boolean)
- `event`: Event
- `event.id`: Event ID
- `event.name`: Name

### `discord_list_scheduled_events`

**List Scheduled Events.** Lists the scheduled events of a guild by guild ID (GET /guilds/{guild_id}/scheduled-events?with_user_count=). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID. |
| `with_user_count` | boolean | no | `false` | Include User Count. Whether to include the subscriber count for each event. |

Output fields:

- `count`: Count (number)
- `events`: Events
- `events[].id`: Event ID
- `events[].name`: Name
- `events[].scheduled_start_time`: Start Time (datetime)
- `events[].scheduled_end_time`: End Time (datetime)
- `events[].status`: Status (number)
- `events[].entity_type`: Entity Type (number)
- `events[].user_count`: User Count (number)

### `discord_update_scheduled_event`

**Update Scheduled Event.** Updates a scheduled event by guild ID and event ID (PATCH /guilds/{guild_id}/scheduled-events/{event_id}) — edit fields or change status to start (ACTIVE) or cancel (CANCELED) it. Idempotent: setting the same values yields the same state. Requires the bot to have Manage Events permission. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID. |
| `event_id` | string | yes |  | Event ID. The numeric scheduled event ID. Obtain from List Scheduled Events. |
| `name` | string | no |  | Name. New event name. Leave empty to keep the current name. |
| `description` | string | no |  | Description. New description. Leave empty to keep the current one. |
| `scheduled_start_time` | string | no |  | Scheduled Start Time. New ISO 8601 start time. Leave empty to keep the current one. |
| `status` | string | no |  | Status. Optionally change the event status. One of `1`, `2`, `3`, `4`. |

Output fields:

- `success`: Success (boolean)
- `event`: Event
- `event.id`: Event ID
- `event.name`: Name
- `event.status`: Status (number)

### `discord_delete_scheduled_event`

**Delete Scheduled Event.** Deletes a scheduled event by guild ID and event ID (DELETE /guilds/{guild_id}/scheduled-events/{event_id}). Idempotent: deleting an already-removed event returns success (alreadyAbsent). Requires the bot to have Manage Events permission. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID. |
| `event_id` | string | yes |  | Event ID. The numeric scheduled event ID. Obtain from List Scheduled Events. |

Output fields:

- `success`: Success (boolean)
- `alreadyAbsent`: Already Absent (boolean)

### `discord_list_invites`

**List Invites.** Lists the active invites of a guild by guild ID (GET /guilds/{guild_id}/invites), returning invite codes and their usage. Read-only and idempotent. Requires the bot to have Manage Guild permission. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `guild_id` | string | yes |  | Guild ID. The numeric guild (server) ID. |

Output fields:

- `count`: Count (number)
- `invites`: Invites
- `invites[].code`: Invite Code
- `invites[].uses`: Uses (number)
- `invites[].max_uses`: Max Uses (number)
- `invites[].channel_id`: Channel ID
- `invites[].channel_name`: Channel Name
- `invites[].inviter_id`: Inviter ID
- `invites[].expires_at`: Expires At (datetime)

### `discord_revoke_invite`

**Revoke Invite.** Revokes an invite by its code (DELETE /invites/{invite_code}). Obtain codes from List Invites. Revoking a live invite is a state change, so this is not idempotent (a missing invite returns success, but the meaningful effect happens once). Requires Manage Channels or Manage Guild permission. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invite_code` | string | yes |  | Invite Code. The invite code (the part after discord.gg/, e.g. "aBcDeF"). Obtain from List Invites. |

Output fields:

- `success`: Success (boolean)
- `code`: Invite Code

### `discord_create_dm`

**Create DM Channel.** Opens a direct-message channel with a user by user ID (POST /users/@me/channels) and returns the DM channel ID. Discord returns the existing DM channel if one is already open, so this is idempotent. Pair the returned channel_id with Send Message to DM the user. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. The numeric user ID to DM. Resolve from a username with Find Member. |

Output fields:

- `success`: Success (boolean)
- `channel_id`: Channel ID

### `discord_get_user`

**Get User.** Fetches a global Discord user by user ID (GET /users/{user_id}), returning username, global name, and avatar. This is the account-wide user object, distinct from the guild-scoped Get Member. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. The numeric user ID. |

Output fields:

- `id`: User ID
- `username`: Username
- `global_name`: Display Name
- `bot`: Is Bot (boolean)
- `avatar`: Avatar Hash

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

# Google Chat

Google Chat is a messaging app that allows you to send and receive messages, create spaces, and more.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-googlechat'
  version: '0.1.8'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `sendAMessage`

**Send a Message.** Posts a new message to a Google Chat space or direct conversation. Reply within a thread by supplying a thread, or send to a specific person privately by enabling the private option and naming the viewer. Use to push a notification or chat reply. Each call posts a new message; supply a custom message ID to deduplicate retries, otherwise repeated calls create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. Select a Space. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Message. The message content to send. Supports basic formatting like *bold*, _italic_, and @mentions. |
| `thread` | string | no |  | Thread. Select a thread to reply to, leave empty for new thread. A value the product loads from the provider, such as an id; write the value itself. |
| `messageReplyOption` | string | no |  | Reply Behavior. How to handle replies when thread ID is provided. One of `"REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD"`, `"REPLY_MESSAGE_OR_FAIL"`. |
| `customMessageId` | string | no |  | Custom Message ID. Optional unique ID for this message (auto-generated if empty). Useful for deduplication. |
| `isPrivate` | boolean | no |  | Send as Private Message. Send this message privately to a specific user. Requires app authentication. |
| `privateMessageViewer` | string | no |  | Private Message Recipient. Select the user who can view this private message. A value the product loads from the provider, such as an id; write the value itself. |

### `getDirectMessageDetails`

**Get Direct Message Details.** Fetches the details of a direct-message space in Google Chat by its space/DM ID. Use to look up a one-on-one conversation. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `directMessageId` | string | yes |  | Direct Message. Select a Direct Message. A value the product loads from the provider, such as an id; write the value itself. |

### `addASpaceMember`

**Add a Space Member.** Adds a user as a member of a Google Chat space, identified by the space ID and the person to add. Use to grant someone access to a space. Not idempotent in effect—creating the membership again for an existing member fails or errors. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. Select a Space. A value the product loads from the provider, such as an id; write the value itself. |
| `personId` | string | yes |  | Select A Person. Select a person. A value the product loads from the provider, such as an id; write the value itself. |

### `getMessageDetails`

**Get Message Details.** Fetches a single Google Chat message by its full resource name (spaces/{space}/messages/{message}); accepts either a system-generated or a custom message ID. Use when you already know the message identifier and need its content or metadata. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Message Resource Name. The full resource name of the message. Format: spaces/{space}/messages/{message}. |

### `searchMessages`

**Search Messages.** Lists recent messages in a given Google Chat space and returns those whose text contains the supplied keyword (case-insensitive substring match), capped by an optional result limit. Use to find messages mentioning a term within one space; note it scans only the latest messages fetched, not the full space history. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. Select a Space. A value the product loads from the provider, such as an id; write the value itself. |
| `keyword` | string | yes |  | Keyword. Search for messages containing this text. |
| `limit` | number | no | `50` | Max Results. Maximum number of messages to return. |

### `findMember`

**Find Member.** Looks up a member of a given Google Chat space by their email address, returning the matching membership or an error message if the email is not found or the person is not in that space. Use to resolve an email to a space member before acting on them. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. Select a Space. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Member Email. The email address of the member to find. |

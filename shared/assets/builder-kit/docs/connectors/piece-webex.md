# Cisco Webex Meetings

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-webex'
  version: '0.1.1'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Connect your Webex account

## Actions

### `createMessage`

**Create Message.** Sends a message via Webex, in one of two modes selected by the message type: post to a room (by room ID) or send a direct message to a person (by person ID or email). Use it to deliver notifications, replies, or rich-text/markdown content with an optional file attachment. Each call posts a new message, so it is not idempotent; for direct messages either a person ID or email is required. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageType` | string | yes |  | Message Type. Choose between sending to a room or a direct message to a person. One of `"room"`, `"direct"`. |
| `destination` | object | yes |  | Destination. An object whose fields depend on other inputs; the product shows them. |
| `text` | string | yes |  | Message Text. The message to send. |
| `markdown` | string | no |  | Message Markdown. The message in Markdown format for rich text. If provided, text will be used as alternate text. |
| `parentId` | string | no |  | Parent Message ID. The parent message ID to reply to (optional) |
| `files` | array | no |  | File URLs. Public URLs to files to attach (only one file per message) Each item: { `url` }. |

### `createRoom`

**Create Room.** Creates a new Webex room (space) with the given title, optionally associating it with a team and configuring public/discoverable, locked/moderated, or announcement-only modes. Use it to provision a fresh space for messaging. Each call creates a distinct room, so it is not idempotent; a description is required when making the room public, and announcement-only mode requires the room to be locked. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Room Title. A user-friendly name for the room. |
| `description` | string | no |  | Description. The description of the room. Required if isPublic is true. |
| `teamId` | string | no |  | Team ID. The ID for the team with which this room is associated (optional) |
| `classificationId` | string | no |  | Classification ID. The classificationId for the room (optional) |
| `isPublic` | boolean | no |  | Public Room. Make the room public and discoverable within the org. Note: description is required if this is true. |
| `isLocked` | boolean | no |  | Locked/Moderated. Set the space as locked/moderated. The creator becomes a moderator. |
| `isAnnouncementOnly` | boolean | no |  | Announcement Only. Sets the space into announcement mode. Only moderators can post messages. Note: space must be locked (moderated) to enable this. |

### `createTeam`

**Create Team.** Creates a new Webex team with the given name and an optional description. Use it to set up a team that can group multiple rooms. Each call creates a distinct team, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Team Name. A user-friendly name for the team. |
| `description` | string | no |  | Description. The description of the team (optional) |

### `findMessage`

**Find Message.** Retrieves the details of a single Webex message by its message ID. Use it to look up the content and metadata of a known message. Read-only and idempotent; requires the exact message ID (this is not a search across messages). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. The unique identifier for the message. |

### `findRoom`

**Find room.** Retrieves the details of a single Webex room (space) by its room ID. Use it to look up a known room's metadata. Read-only and idempotent; requires the exact room ID (this is not a search across rooms). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roomId` | string | yes |  | Room Id. |

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

# Microsoft Teams

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-microsoft-teams'
  version: '0.7.3'
```

Categories: BUSINESS_INTELLIGENCE, COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> When you connect, Activepieces shows a **permissions** selector. Tick only the
> scopes for the actions you plan to use — narrower connections request less
> access. **Keep `openid`, `email`, `profile`, `offline_access` and `User.Read`
> selected**: the connection needs them to sign in, refresh its token, and be
> validated. The scopes group roughly as:
> - **Channel read** — `Channel.ReadBasic.All`, `Team.ReadBasic.All`, `ChannelMessage.Read.All`
> - **Channel management** — adds `Channel.Create`, `ChannelMessage.Send`
> - **Chat (read & manage)** — `Chat.ReadWrite`
> - **Members & presence** — `TeamMember.Read.All`, `User.ReadBasic.All`, `Presence.Read.All`
> - **Meetings** — `OnlineMeetingTranscript.Read.All`, `OnlineMeetingRecording.Read.All`
>
> If you'd like to use your own custom Azure app instead of the default app, follow the [Azure app creation guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application),
> set the **Redirect URI** to {{redirectUrl}} and expose the full set of **Microsoft Graph (Delegated) permissions** above under **API permissions** (the connector must be able to request any scope the user selects).
>
> Leave **Tenant ID** as `common` for the default multi-tenant flow, or set it to your Directory (tenant) ID (a GUID) / `<name>.onmicrosoft.com` domain if your app registration is single-tenant.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cloud` | string | yes | `"login.microsoftonline.com"` | Cloud Environment. Select your Microsoft cloud environment. One of `"login.microsoftonline.com"`, `"login.microsoftonline.us"`. |
| `tenantId` | string | yes | `"common"` | Tenant ID. Use "common" for the default multi-tenant flow, or your Directory (tenant) ID (a GUID) / "<name>.onmicrosoft.com" domain for a single-tenant app registration. |

## Actions

### `microsoft_teams_create_channel`

**Create Channel.** Creates a new standard channel inside a Microsoft Teams team, identified by team ID, with a display name and optional description. Use to provision a shared channel; for a members-restricted channel use Create Private Channel instead. Not idempotent — each call adds another channel even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team ID. A value the product loads from the provider, such as an id; write the value itself. |
| `channelDisplayName` | string | yes |  | Channel Name. |
| `channelDescription` | string | no |  | Channel Description. |

### `microsoft_teams_send_channel_message`

**Send Channel Message.** Posts a new top-level message to a Microsoft Teams channel, identified by team ID and channel ID. Use to broadcast to a channel rather than a private chat; to answer an existing thread use Reply to Channel Message instead. Supports @username mentions, which are resolved to team members before posting. Not idempotent — each call posts another message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team ID. A value the product loads from the provider, such as an id; write the value itself. |
| `channelId` | string | yes |  | Channel ID. A value the product loads from the provider, such as an id; write the value itself. |
| `contentType` | string | yes | `"text"` | Content Type. One of `"text"`, `"html"`. |
| `content` | string | yes |  | Message. Use @username to mention team members in the message. |

### `microsoft_teams_send_chat_message`

**Send Chat Message.** Sends a message into an existing one-on-one or group chat in Microsoft Teams, identified by chat ID, as plain text or HTML. Use when the target chat already exists; to start a fresh chat use Create Chat & Send Message instead. Not idempotent — each call posts another message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatId` | string | yes |  | Chat ID. A value the product loads from the provider, such as an id; write the value itself. |
| `contentType` | string | yes | `"text"` | Content Type. One of `"text"`, `"html"`. |
| `content` | string | yes |  | Message. |

### `microsoft_teams_reply_to_channel_message`

**Reply to Channel Message.** Posts a reply under an existing channel message thread in Microsoft Teams, identified by team ID, channel ID, and the parent message ID. Use to respond within a thread rather than start a new top-level message. Not idempotent — each call adds another reply. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team ID. A value the product loads from the provider, such as an id; write the value itself. |
| `channelId` | string | yes |  | Channel ID. A value the product loads from the provider, such as an id; write the value itself. |
| `messageId` | string | yes |  | Message ID. ID of the parent message to reply to. |
| `contentType` | string | yes | `"text"` | Content Type. One of `"text"`, `"html"`. |
| `content` | string | yes |  | Message. |

### `microsoft_teams_create_chat_and_send_message`

**Create Chat & Send Message.** Creates a new Microsoft Teams chat with one or more other members (one-on-one when a single member is given, otherwise a group chat) and posts an initial message into it; the current user is automatically added. Use to open a brand-new conversation; to message an existing chat use Send Chat Message instead. Not idempotent — each call may create another chat and posts another message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team ID. A value the product loads from the provider, such as an id; write the value itself. |
| `members` | array | yes |  | Member. Values the product loads from the provider, such as ids; write an array of them. |
| `contentType` | string | yes | `"text"` | Message Content Type. One of `"text"`, `"html"`. |
| `content` | string | yes |  | Initial Message. |

### `microsoft_teams_create_private_channel`

**Create Private Channel.** Creates a new private (membership-restricted) channel inside a Microsoft Teams team, identified by team ID, with a display name and optional description. Use when access should be limited to specific members; for a standard open channel use Create Channel instead. Not idempotent — each call adds another channel. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team ID. A value the product loads from the provider, such as an id; write the value itself. |
| `channelDisplayName` | string | yes |  | Channel Name. |
| `channelDescription` | string | no |  | Channel Description. |

### `microsoft_teams_get_chat_message`

**Get Chat Message.** Retrieves a single message from a Microsoft Teams chat by chat ID and message ID. Use to read the content or metadata of a known chat message. Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatId` | string | yes |  | Chat ID. A value the product loads from the provider, such as an id; write the value itself. |
| `messageId` | string | yes |  | Message ID. The ID of the message to retrieve. |

### `microsoft_teams_delete_chat_message`

**Delete Chat Message.** Soft-deletes a message in a Microsoft Teams chat, identified by chat ID and message ID, on behalf of the authenticated user. Only messages the current user sent can be deleted. Effectively idempotent — re-running on an already-deleted message leaves it deleted. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatId` | string | yes |  | Chat ID. A value the product loads from the provider, such as an id; write the value itself. |
| `messageId` | string | yes |  | Message ID. The ID of the message to delete. |

### `microsoft_teams_get_channel_message`

**Get Channel Message.** Retrieves a single channel message from Microsoft Teams by team ID, channel ID, and message ID; supply an optional reply ID to fetch a specific reply under that message instead. Use to read the content or metadata of a known channel post. Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team ID. A value the product loads from the provider, such as an id; write the value itself. |
| `channelId` | string | yes |  | Channel ID. A value the product loads from the provider, such as an id; write the value itself. |
| `messageId` | string | yes |  | Message ID. The ID of the channel message to retrieve. |
| `replyId` | string | no |  | Reply ID (optional). Provide to fetch a specific reply under the message. |

### `microsoft_teams_find_channel`

**Find Channel.** Searches the channels of a Microsoft Teams team (by team ID) for ones whose display name exactly matches the given name. Use to resolve a channel name to its ID before posting or reading. Idempotent read-only lookup; match is exact, not a substring search. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team ID. A value the product loads from the provider, such as an id; write the value itself. |
| `channelName` | string | yes |  | Channel Name. |

### `microsoft_teams_find_team_member`

**Find Team Member.** Searches the members of a Microsoft Teams team (by team ID) for those matching a given email or display name, depending on the selected search mode. Use to resolve a person to their member record/ID before mentioning or messaging them. Idempotent read-only lookup; match is exact on the chosen field. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team ID. A value the product loads from the provider, such as an id; write the value itself. |
| `searchBy` | string | yes | `"email"` | Search By. One of `"email"`, `"name"`. |
| `searchValue` | string | yes |  | searchValue. Email address or name to search for. |

### `microsoft_teams_get_meeting_transcript`

**Get Meeting Transcript.** Retrieves transcripts for a Microsoft Teams online meeting belonging to the authenticated user, resolved from a meeting identifier (join URL or ID). Operates in two modes: with a transcript ID it fetches that transcript's text content (VTT); without one it lists all available transcripts for the meeting. Idempotent read-only operation. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meetingIdentifierType` | string | yes | `"meetingId"` | Meeting Identifier Type. Choose how to identify the meeting. One of `"meetingId"`, `"joinWebUrl"`, `"joinMeetingId"`. |
| `meetingIdentifierValue` | string | yes |  | Meeting Identifier Value. |
| `transcriptId` | string | no |  | Transcript. A value the product loads from the provider, such as an id; write the value itself. |

### `microsoft_teams_get_meeting_recording`

**Get Meeting Recording.** Retrieves recordings for a Microsoft Teams online meeting belonging to the authenticated user, resolved from a meeting identifier (join URL or ID). Operates in two modes: with a recording ID it fetches that recording's metadata; without one it lists all available recordings for the meeting. Idempotent read-only operation. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `meetingIdentifierType` | string | yes | `"meetingId"` | Meeting Identifier Type. Choose how to identify the meeting. One of `"meetingId"`, `"joinWebUrl"`, `"joinMeetingId"`. |
| `meetingIdentifierValue` | string | yes |  | Meeting Identifier Value. |
| `recordingId` | string | no |  | Recording. A value the product loads from the provider, such as an id; write the value itself. |

### `request_approval_in_channel`

**Request Approval in Channel.** Posts an adaptive card with a single button linking to a confirmation page (where the recipient chooses Approve or Disapprove) into a Microsoft Teams channel (by team ID and channel ID) and pauses the flow until they respond, then resumes reporting whether it was approved. Use as a human-in-the-loop gate where channel members decide; for a direct-message gate use Request Approval from a User instead. Not idempotent — each call posts another approval message and creates a new wait. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team ID. A value the product loads from the provider, such as an id; write the value itself. |
| `channelId` | string | yes |  | Channel ID. A value the product loads from the provider, such as an id; write the value itself. |
| `message` | string | yes |  | Message. |

### `request_approval_direct_message`

**Request Approval from a User.** Posts an adaptive card with a single button linking to a confirmation page (where the recipient chooses Approve or Disapprove) into a Microsoft Teams chat (by chat ID) and pauses the flow until they respond, then resumes reporting whether it was approved. Use as a human-in-the-loop gate targeting a specific person via direct chat; for a channel-wide gate use Request Approval in Channel instead. Not idempotent — each call posts another approval message and creates a new wait. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatId` | string | yes |  | Chat ID. A value the product loads from the provider, such as an id; write the value itself. |
| `message` | string | yes |  | Message. |

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

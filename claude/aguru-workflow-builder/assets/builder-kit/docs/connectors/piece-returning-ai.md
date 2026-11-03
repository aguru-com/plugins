# Returning AI

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-returning-ai'
  version: '0.2.5'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Add api key from returning.ai

## Actions

### `sendMessage`

**Send Channel Message.** Posts a new message to a Returning.ai channel on behalf of a given user (identified by username or email), so the message appears as if that user sent it. Use to broadcast or announce content in a channel; supply message text, image URLs, or both (at least one is required), and for forum-type channels a topic ID is also required. Not idempotent: each call posts a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | string | yes |  | Sender (Username or email). The user account that will send the message. |
| `channel` | string | yes |  | Channel. The channel where the message will be posted. A value the product loads from the provider, such as an id; write the value itself. |
| `dynamicFields` | object | yes |  | Channel Fields. Additional fields based on channel type. An object whose fields depend on other inputs; the product shows them. |
| `message` | string | no |  | Message. The message to be posted (optional if images are provided) |
| `images` | array | no |  | Images. Add one image URL per entry (e.g., https://example.com/image1.png) |

### `replyMessage`

**Reply Message.** Posts a threaded reply to an existing Returning.ai message on behalf of a given user (identified by username or email), so the reply appears as if that user sent it. Use to respond in-thread to a known message; requires the target message ID and the reply text. Not idempotent: each call adds a new reply. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | string | yes |  | Sender (Username or email). The user account that will send the message. |
| `messageId` | string | yes |  | Reply to (Message ID). The ID of the message to reply to. |
| `message` | string | yes |  | Message. The content of the reply to be posted. |

### `reactMessage`

**React to Message.** Adds an emoji reaction to an existing Returning.ai message on behalf of a given user (identified by username or email), so the reaction appears as if that user added it. Use to acknowledge or react to a known message; requires the target message ID and an emoji shortcode (e.g. :sparkling_heart:). Not idempotent: the API is called on each invocation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | string | yes |  | Sender (Username or email). The user account that will add the reaction. |
| `messageId` | string | yes |  | React to (Message ID). The ID of the message to react to. |
| `emoji` | string | yes |  | Reaction emoji. The emoji to react with (e.g. :sparkling_heart:) |

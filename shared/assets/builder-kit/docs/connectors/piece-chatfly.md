# Chatfly

ChatFly allows you to build AI chatbots trained on your data.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-chatfly'
  version: '0.1.8'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Enter your ChatFly API key

## Actions

### `send_message`

**Send Message.** Send a user message to a ChatFly AI chatbot and get back its streaming chat response. Choose this to query or converse with a deployed ChatFly bot. Requires the target bot ID and a session ID that ties the message to a conversation thread; each call posts a new message, so it is not idempotent. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bot_id` | string | yes |  | Bot ID. The ID of your bot. |
| `message` | string | yes |  | Message. The message to send. |
| `session_id` | string | yes |  | Session ID. The ID of the session. |

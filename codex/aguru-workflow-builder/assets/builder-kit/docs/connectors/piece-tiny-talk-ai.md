# Tiny Talk AI

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-tiny-talk-ai'
  version: '0.1.8'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain API key from [Dashboard Settings](https://dashboard.tinytalk.ai/).

## Actions

### `ask-bot`

**Ask Bot.** Sends a user message to a specific TinyTalk AI bot and returns the bot's generated reply as text. Choose this to query a configured conversational bot; requires the target bot's ID (from the bot's Details page) and the question prompt. Not idempotent: each call produces a fresh generation. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `botId` | string | yes |  | Bot ID. You can find this in your Bot Details page in the dashboard. |
| `prompt` | string | yes |  | Question. |

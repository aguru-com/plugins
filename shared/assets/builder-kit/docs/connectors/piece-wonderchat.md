# Wonderchat

Wonderchat is a no-code chatbot platform that lets you deploy AI-powered chatbots for websites quickly.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-wonderchat'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> 1. Log in to your Wonderchat account.
> 2. Click on your **Profile card**.
> 2. Go to your **User settings**.
> 3. Click on the the **API keys** tab.
> 3. If you already have a key, copy it, if not generate one.

## Actions

### `askQuestion`

**Ask Question.** Sends a question to a specific Wonderchat chatbot (identified by chatbotId) and returns the bot’s generated answer. Use to query a deployed knowledge-base chatbot programmatically. Optionally pass a chatlogId to continue an existing chat session plus custom context/contextUrl to ground the answer. Not idempotent: each call posts a new message and produces a fresh AI-generated reply. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatbotId` | string | yes |  | Chatbot Id. The ID of your chatbot (can be found in the URL when viewing your bot: /bot/YOUR_BOT_ID) |
| `question` | string | yes |  | Question. The question you wish to ask your chatbot. |
| `chatlogId` | string | no |  | Chatlog Id. The ID of your chat session (can be found under Chatlog Details section, labeled as "ID") |
| `context` | string | no |  | Custom context. Additional custom context about the chat session (e.g., user information) |
| `contextUrl` | string | no |  | Context URL. URL of the page the user is on to provide additional context. |

### `addPage`

**Add Page.** Adds one or more webpage URLs to a specific Wonderchat chatbot’s knowledge base (identified by chatbotId), triggering Wonderchat to crawl and ingest them. Use when an agent needs to expand or update what a bot can answer from. Optionally provide a session cookie to crawl pages behind a login. Not idempotent: each call appends/re-ingests pages into the knowledge base. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatbotId` | string | yes |  | Chatbot Id. The ID of your chatbot (can be found in the URL when viewing your bot: /bot/YOUR_BOT_ID) |
| `urls` | array | no |  | URLs. List of webpage URLs to add to your chatbot's knowledge base (e.g., "https://wonderchat.io") |
| `sessionCookie` | string | no |  | Session cookie. Session cookie for crawling sites behind login. |

### `addTag`

**Add Tag.** Adds one or more custom tags to a specific Wonderchat chatlog (chat session identified by chatlogId). Use to label or categorize a conversation. Idempotent: tags are applied as a set, so re-adding the same tags leaves the chatlog’s tag set unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatlogId` | string | yes |  | Chatlog Id. The ID of your chat session (can be found under Chatlog Details section, labeled as "ID") |
| `tags` | array | yes |  | Tags. List of URLs to add to your chatbot. |

### `removeTag`

**Remove Tag.** Removes one or more tags from a specific Wonderchat chatlog (chat session identified by chatlogId). Use to clear or correct labels on a conversation. Idempotent: re-running with the same tags leaves the chatlog’s tag set unchanged once those tags are already absent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatlogId` | string | yes |  | Chatlog Id. The ID of your chat session (can be found under Chatlog Details section, labeled as "ID") |
| `tags` | array | yes |  | Tags. List of tags to remove. |

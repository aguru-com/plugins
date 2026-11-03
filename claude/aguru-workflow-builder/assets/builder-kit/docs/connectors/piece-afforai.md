# Afforai

Helps you search, summarize, and translate knowledge from hundreds of documents to help you produce trustworthy research.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-afforai'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your API Key, follow these steps:
> 1. Log in to your Afforai account.
> 2. Navigate to **API** section on left panel.
> 3. On the top-right, you can find you API key.

## Actions

### `afforai_ask_chatbot`

**Ask Chatbot.** Sends a conversation history to a specific Afforai chatbot (identified by its Chatbot/session ID) and returns an AI-generated reply grounded in that chatbot's documents. Choose this to query an existing knowledge base rather than to manage documents. Optionally enable deeper document search and/or live Google search to broaden sources. Not idempotent: each call produces a fresh, potentially different completion. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sessionID` | string | yes |  | Chatbot ID. You can find Chatbot ID by clicking settings button under **Actions** for given chatbot. |
| `history` | array | yes |  | Chat History. Each item: { `role`, `content` }. |
| `powerful` | boolean | yes |  | AI should search more deeply for information in the given files ?. |
| `google` | boolean | yes |  | AI to search for information on Google?. |

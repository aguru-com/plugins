# SiteSpeakAI

Integrate with Sitespeakai to leverage AI-powered chatbots and enhance user interactions on your website.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-sitespeakai'
  version: '0.1.6'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: SiteSpeakAI API Key

> **Enter your SiteSpeakAI API Key.**
> ---
> ### How to obtain your API key
> 1. Sign up / log in at [SiteSpeakAI](https://sitespeak.ai/).
> 2. Go to **Dashboard → Settings → API Keys**.
> 3. Generate or copy an API key.
> 4. Paste it here.

## Actions

### `sendQuery`

**Send Query.** Asks a SiteSpeakAI chatbot a question and returns its AI-generated answer. Use to query a knowledge-base bot for a single prompt; optionally continue a prior thread by passing a conversation ID, and choose markdown or HTML response format. Not idempotent: each call generates a fresh answer and adds a turn to the conversation. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatbotId` | string | no |  | chatbotId. Chat bot ID. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Prompt. The question or query text you want the chatbot to answer. |
| `conversationId` | string | no |  | Conversation. Pick a conversation for context, or leave empty to start a new one. A value the product loads from the provider, such as an id; write the value itself. |
| `format` | string | no | `"markdown"` | Response Format. Format of the returned response; markdown or html. One of `"markdown"`, `"html"`. |

### `create_finetune`

**Create Finetune.** Creates a fine-tune entry on a SiteSpeakAI chatbot, pairing a question with a suggested answer so the bot responds that way in future. Use to teach a bot a specific Q&A. Not idempotent: each call appends a new fine-tune even if the same question already exists. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatbotId` | string | no |  | chatbotId. Chat bot ID. A value the product loads from the provider, such as an id; write the value itself. |
| `question` | string | yes |  | Question. The question text you want the chatbot to be able to answer. |
| `suggestedAnswer` | string | yes |  | Suggested Answer. The answer you suggest the chatbot use for that question. |

### `delete_finetune`

**Delete Finetune.** Removes a specific fine-tune entry from a SiteSpeakAI chatbot, identified by chatbot ID and fine-tune ID. Use to undo or clean up a previously added Q&A. Idempotent in effect: once the entry is gone, repeating the call leaves it absent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatbotId` | string | no |  | chatbotId. Chat bot ID. A value the product loads from the provider, such as an id; write the value itself. |
| `finetuneId` | string | yes |  | Finetune Entry. Select the finetune entry to delete. A value the product loads from the provider, such as an id; write the value itself. |

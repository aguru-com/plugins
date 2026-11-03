# Denser.ai

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-denser-ai'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatbotId` | string | yes |  | Chatbot ID. The Chatbot ID is available on the [main dashboard of Denser Chatbot](https://denser.ai/u/chatbots). Simply choose the ID of the chatbot you want. |
| `apiKey` | string | yes |  | API key. |

## Actions

### `processInputText`

**Process input text.** Sends a question to a configured Denser.ai chatbot and returns its generated answer, optionally steered by a custom prompt, a chosen LLM model, and inline citations. Use it to query a Denser.ai knowledge-base chatbot for a natural-language response. Requires a question and the chatbot connection; not idempotent, since each call produces a freshly generated answer. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `question` | string | yes |  | Question. The question to be processed by the chatbot. |
| `prompt` | string | no |  | Prompt. The prompt to be used by the chatbot e.g., "Please provide your answer in the following format: ...". |
| `model` | string | no | `" gpt-4o-mini"` | Model. The model to be used by the chatbot (e.g., gpt-3.5, gpt-4) One of `"gpt-3.5"`, `"gpt-4o-mini"`, `"gpt-4"`, `"gpt-4o"`, `"claude-3-5-sonnet"`, `"claude-3-5-haiku"`, `"claude-3-7-sonnet"`. |
| `citation` | boolean | no | `false` | Citations. Whether to include citations in the response. |

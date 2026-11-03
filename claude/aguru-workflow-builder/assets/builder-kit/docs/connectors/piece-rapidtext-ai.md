# RapidText AI

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-rapidtext-ai'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain your API key from Dashboard Settings.

## Actions

### `generate-article`

**Generate Article.** Generates a long-form article from a text prompt using a selected RapidTextAI model. Choose this for full article/blog drafting rather than short freeform chat completions (use Send Prompt for that). Requires a prompt and a model selection; each call produces fresh non-deterministic output, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. One of `"gemini-2.0-flash"`, `"gpt-4o-mini"`, `"gpt-4"`, `"deepseek-chat"`, `"gpt-4o"`, `"grok-2"`, `"gemini-1.5-pro"`, `"gemini-2.0-pro"`, `"deepseek-reasoner"`. |
| `prompt` | string | yes |  | Prompt. |

### `create-prompt`

**Send Prompt.** Sends a freeform prompt to a selected RapidTextAI model and returns the completion, with optional sampling controls (max tokens, temperature, top-p, frequency/presence penalties). Choose this for general chat-style or short text generation; use Generate Article for full article drafting. Requires a prompt and a model; each call produces fresh non-deterministic output, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. One of `"gemini-2.0-flash"`, `"gpt-4o-mini"`, `"gpt-4"`, `"deepseek-chat"`, `"gpt-4o"`, `"grok-2"`, `"gemini-1.5-pro"`, `"gemini-2.0-pro"`, `"deepseek-reasoner"`. |
| `prompt` | string | yes |  | Prompt. |
| `max_tokens` | number | no | `2048` | Max Tokens. |
| `temperature` | number | no | `1` | Temperature. Sampling temperature between 0 and 2. |
| `top_p` | number | no | `1` | Top N. Nucleus sampling parameter. |
| `frequency_penalty` | number | no |  | Frequency Penalty. Penalty for new tokens based on frequency. |
| `presence_penalty` | number | no |  | Presence Penalty. Penalty for new tokens based on presence. |

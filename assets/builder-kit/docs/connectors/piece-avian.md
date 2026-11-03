# Avian

Integrate with Avian to leverage its powerful language models for generating human-like text based on your prompts.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-avian'
  version: '0.0.8'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Follow these instructions to get your Avian API Key:
>
> 1. Visit https://avian.io and sign up for an account.
> 2. Navigate to the API Keys section of your dashboard.
> 3. Create a new API key and copy it.

## Actions

### `ask_avian`

**Ask Avian.** Generate a text (or JSON) completion from an Avian language model for a given prompt, choosing the model and sampling parameters (temperature, top_p, penalties, max tokens). Use it for free-form LLM generation, Q&A, or rewriting against Avian. Optionally pass a memory key to persist and continue a conversation across runs. Not idempotent: each call produces a fresh generation and, when a memory key is set, appends to stored chat history. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. The model which will generate the completion. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Question. |
| `frequencyPenalty` | number | no | `0` | Frequency penalty. Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim. |
| `maxTokens` | number | yes | `4096` | Maximum Tokens. The maximum number of tokens to generate. |
| `presencePenalty` | number | no | `0` | Presence penalty. Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the mode's likelihood to talk about new topics. |
| `responseFormat` | string | yes | `"text"` | Response Format. The format of the response. IMPORTANT: When using JSON Output, you must also instruct the model to produce JSON yourself. One of `"text"`, `"json_object"`. |
| `temperature` | number | no | `1` | Temperature. Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive. Between 0 and 2. We generally recommend altering this or top_p but not both. |
| `topP` | number | no | `1` | Top P. An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. Values <=1. We generally recommend altering this or temperature… |
| `memoryKey` | string | no |  | Memory Key. A memory key that will keep the chat history shared across runs and flows. Keep it empty to leave Avian without memory of previous messages. |
| `roles` | JSON | no | `[{"role":"system","content":"You are a helpful assistant."}]` | Roles. Array of roles to specify more accurate response. |

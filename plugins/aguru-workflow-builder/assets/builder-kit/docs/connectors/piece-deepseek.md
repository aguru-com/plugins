# DeepSeek

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-deepseek'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Follow these instructions to get your DeepSeek API Key:
>
> 1. Visit the following website: https://platform.deepseek.com/api_keys.
> 2. Once on the website, locate and click on the option to obtain your DeepSeek API Key.

## Actions

### `ask_deepseek`

**Ask Deepseek.** Sends a question to a DeepSeek chat model and returns the generated text, with optional sampling controls and a text-or-JSON response format (JSON mode also requires instructing the model to emit JSON in the prompt); it runs stateless by default, or keeps conversation history across runs and flows when a memory key is set. It is the only action this piece exposes, so use it for any DeepSeek completion and pick a different vendor piece when the model must not be DeepSeek. Requires a model, a question, and a maximum token count; not idempotent: each call produces a fresh completion and, when a memory key is set, appends to the stored history. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"deepseek-chat"` | Model. The model which will generate the completion. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Question. |
| `frequencyPenalty` | number | no | `0` | Frequency penalty. Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim. |
| `maxTokens` | number | yes | `4096` | Maximum Tokens. The maximum number of tokens to generate. Possible values are between 1 and 8192. |
| `presencePenalty` | number | no | `0` | Presence penalty. Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the mode's likelihood to talk about new topics. |
| `responseFormat` | string | yes | `"text"` | Response Format. The format of the response. IMPORTANT: When using JSON Output, you must also instruct the model to produce JSON yourself. One of `"text"`, `"json_object"`. |
| `temperature` | number | no | `1` | Temperature. Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive. Between 0 and 2. We generally recommend altering this or top_p but not both. |
| `topP` | number | no | `1` | Top P. An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. Values <=1. We generally recommend altering this or temperature… |
| `memoryKey` | string | no |  | Memory Key. A memory key that will keep the chat history shared across runs and flows. Keep it empty to leave Deepseek without memory of previous messages. |
| `roles` | JSON | no | `[{"role":"system","content":"You are a helpful assistant."}]` | Roles. Array of roles to specify more accurate response. |

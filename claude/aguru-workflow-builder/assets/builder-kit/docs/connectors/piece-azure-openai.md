# Azure OpenAI

Powerful AI tools from Microsoft

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-azure-openai'
  version: '0.2.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `endpoint` | string | yes |  | Endpoint. https://<resource name>.openai.azure.com/. |
| `apiKey` | string | yes |  | API Key. Use the Azure Portal to browse to your OpenAI resource and retrieve an API key. |

## Actions

### `ask_gpt`

**Ask GPT.** Sends a prompt to a chat model deployed on your own Azure OpenAI resource and returns the generated answer text; leave the memory key empty for a stateless one-off question, or set one to share a conversation history across runs and flows so follow-up turns keep context. Requires the Azure deployment name (your own deployment, not a public model id) and a max-tokens value, so pick this only when the workflow must run through Azure OpenAI rather than the vendor-hosted OpenAI, Anthropic, or Google Gemini pieces. Not idempotent: every call is a fresh non-deterministic billed completion, and it appends to the stored history whenever a memory key is set. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `deploymentId` | string | yes |  | Deployment Name. The name of your model deployment. |
| `prompt` | string | yes |  | Question. |
| `temperature` | number | no | `0.9` | Temperature. Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive. |
| `maxTokens` | number | yes | `2048` | Maximum Tokens. The maximum number of tokens to generate. Requests can use up to 2,048 or 4,096 tokens shared between prompt and completion depending on the model. Don't set the value to maximum and leave some tokens for the input. (One token is roughly 4 characters for normal English text) |
| `topP` | number | no | `1` | Top P. An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. |
| `frequencyPenalty` | number | no | `0` | Frequency penalty. Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim. |
| `presencePenalty` | number | no | `0.6` | Presence penalty. Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the mode's likelihood to talk about new topics. |
| `memoryKey` | string | no |  | Memory Key. A memory key that will keep the chat history shared across runs and flows. Keep it empty to leave ChatGPT without memory of previous messages. |
| `roles` | JSON | no | `[{"role":"system","content":"You are a helpful assistant."}]` | Roles. Array of roles to specify more accurate response. |

### `custom_api_call`

**Custom API Call.** Make a custom API call to a specific endpoint. Needs authentication.

Kind: write.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | object | yes |  | . An object whose fields depend on other inputs; the product shows them. |
| `method` | string | yes | `"GET"` | Method. One of `"GET"`, `"POST"`, `"PATCH"`, `"PUT"`, `"DELETE"`, `"HEAD"`. |
| `headers` | object | no |  | Headers. Authorization headers are injected automatically from your connection. |
| `queryParams` | object | no |  | Query Parameters. Appended to the URL as ?key=value. |
| `body_type` | string | no | `"none"` | Body Type. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | object | no |  | Body. An object whose fields depend on other inputs; the product shows them. |
| `response_is_binary` | boolean | no | `false` | Response is Binary. Enable for files like PDFs, images, etc. |
| `failsafe` | boolean | no |  | Return Error as Output. On a failed request, output the error instead of failing the step. |
| `timeout` | number | no |  | Timeout. Seconds to wait for a response. Empty: up to the flow limit (10 min). |
| `followRedirects` | boolean | no | `false` | Follow redirects. Follow 3xx redirects instead of returning them as the response. |

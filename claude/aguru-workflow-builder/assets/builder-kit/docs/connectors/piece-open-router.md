# OpenRouter

Use any AI model to generate code, text, or images via OpenRouter.ai.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-open-router'
  version: '0.3.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Api Key

> Follow these instructions to get your OpenAI API Key:
>
> 1. Visit the following website: https://openrouter.ai/keys.
> 2. Once on the website, click on create a key.
> 3. Once you have created a key, copy it and use it for the Api key field on the site.

## Actions

### `ask-lmm`

**Ask LLM.** Sends a single prompt to any model in the OpenRouter catalog through one unified completions endpoint and returns the generated text, with optional temperature, top-p, and max-token controls. It is the only first-class action in the piece and is single-turn - no conversation memory, no system-role array, and no image or audio input - so use the sibling Custom API Call for any other OpenRouter endpoint, and prefer a vendor-specific piece such as OpenAI, Anthropic, or Groq when the model must come from one provider. Requires a model id from the OpenRouter model list and a prompt; not idempotent: each call bills a fresh generation and may return different text for the same input. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"pygmalionai/mythalion-13b"` | Model. The model which will generate the completion. Some models are suitable for natural language tasks, others specialize in code. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Prompt. The prompt to send to the model. |
| `temperature` | number | no |  | Temperature. Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive. |
| `maxTokens` | number | no |  | Maximum Tokens. The maximum number of tokens to generate. Requests can use up to 2,048 or 4,096 tokens shared between prompt and completion, don't set the value to maximum and leave some tokens for the input. The exact limit varies by model. (One token is roughly 4 characters for normal English text) |
| `topP` | number | no |  | Top P. An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. |

### `list_models`

**List Models.** Lists every model in the OpenRouter catalog, with context length, per-token pricing, and supported parameters. Use this to discover a valid model id before calling Ask LLM or Chat Completion, or to compare pricing and context limits across providers. Optionally filter by category. Safe to retry: read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `category` | string | no |  | Category. Only return models tagged for this use case. One of `"programming"`, `"roleplay"`, `"marketing"`, `"marketing/seo"`, `"technology"`, `"science"`, `"translation"`, `"legal"`, `"finance"`, `"health"`, `"trivia"`, `"academia"`. |

Output fields:

- `[].id`: Model ID
- `[].name`: Name
- `[].description`: Description
- `[].contextLength`: Context Length (number)
- `[].promptPrice`: Prompt Price (per token)
- `[].completionPrice`: Completion Price (per token)
- `[].supportedParameters`: Supported Parameters

### `list_embedding_models`

**List Embedding Models.** Lists only the models in the OpenRouter catalog whose output is an embedding vector, for use as the model id in a raw call to the embeddings endpoint. Pick List Models instead when the target is a text or chat generation model. Safe to retry: read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Model ID
- `[].name`: Name
- `[].description`: Description
- `[].contextLength`: Context Length (number)
- `[].promptPrice`: Prompt Price (per token)
- `[].completionPrice`: Completion Price (per token)
- `[].supportedParameters`: Supported Parameters

### `list_user_models`

**List My Available Models.** Lists the OpenRouter models this account can actually use once its provider preferences, privacy settings, and guardrails are applied - narrower than List Models when the account has restrictions configured. Use it to confirm a model is reachable before calling it. Safe to retry: read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].id`: Model ID
- `[].name`: Name
- `[].description`: Description
- `[].contextLength`: Context Length (number)
- `[].promptPrice`: Prompt Price (per token)
- `[].completionPrice`: Completion Price (per token)
- `[].supportedParameters`: Supported Parameters

### `list_model_endpoints`

**List Providers for a Model.** Lists every provider serving one model on OpenRouter, each with its own pricing, quantization, context length, and uptime. Use it to compare providers for a model discovered with List Models before pinning a request to one. Safe to retry: read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. The model to list providers for. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Model ID
- `name`: Model Name
- `[].name`: Endpoint Name
- `[].modelId`: Model ID
- `[].modelName`: Model Name
- `[].providerName`: Provider
- `[].contextLength`: Context Length (number)
- `[].promptPrice`: Prompt Price (per token)
- `[].completionPrice`: Completion Price (per token)
- `[].quantization`: Quantization
- `[].maxCompletionTokens`: Max Completion Tokens (number)
- `[].uptimeLast30m`: Uptime (last 30m %) (number)

### `list_providers`

**List Providers.** Lists every upstream provider OpenRouter can route requests to (e.g. Azure, CoreWeave, Cerebras), with headquarters and policy links. Use it to see which providers exist before restricting a model to specific providers with provider routing options. Safe to retry: read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].name`: Name
- `[].slug`: Slug
- `[].headquarters`: Headquarters
- `[].privacy_policy_url`: Privacy Policy URL (url)
- `[].terms_of_service_url`: Terms of Service URL (url)
- `[].status_page_url`: Status Page URL (url)

### `get_credits`

**Get Credits.** Returns the total credits purchased and total credits used on this OpenRouter account. Call it before a large or batched job to confirm there is enough balance left; a low or exhausted balance makes every paid model generation fail. Safe to retry: read-only. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `totalCredits`: Total Credits (number)
- `totalUsage`: Total Usage (number)

### `get_current_key`

**Get API Key Usage.** Returns metadata for the connected OpenRouter API key: its label, usage so far, spend limit if one is set, whether it is free-tier, and its rate limit. Use it to check remaining headroom before a batch of generations. Safe to retry: read-only. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `label`: Key Label
- `usage`: Usage (number)
- `limit`: Limit (number)
- `isFreeTier`: Is Free Tier (boolean)
- `rateLimit`: Rate Limit
- `rateLimit.requests`: Requests (number)
- `rateLimit.interval`: Interval

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

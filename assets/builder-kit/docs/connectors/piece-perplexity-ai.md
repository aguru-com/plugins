# Perplexity AI

AI powered search engine

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-perplexity-ai'
  version: '0.4.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
> 1. Open [API Keys](https://console.perplexity.ai/project/keys) in the Perplexity API Console.
> 2. Create a new key.
> 3. Copy the key and paste it here.

## Actions

### `ask-ai`

**Ask AI.** Sends a question to a Perplexity Sonar model, which answers from a live web search with source citations rather than model memory alone, choosing between the plain sonar models for fast grounded answers and the sonar-reasoning models for step-by-step reasoning. It is the only action in this piece; pick it when the reply must reflect current web content, and prefer a general LLM vendor piece such as OpenAI or Google Gemini when no web lookup is needed. Runs stateless - earlier turns must be supplied in the optional roles array, which alternates user and assistant after any system message; requires a model and a question, and is not idempotent: each call runs a new search and produces a fresh completion. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"sonar-pro"` | Model. Pro models dig deeper and Reasoning models think before answering. One of `"sonar"`, `"sonar-pro"`, `"sonar-reasoning"`, `"sonar-reasoning-pro"`. |
| `prompt` | string | yes |  | Question. What you want the model to answer or do. |
| `temperature` | number | no | `0.2` | Temperature. From 0 to 2. Lower is more focused, higher is more varied. |
| `max_tokens` | number | no |  | Maximum Tokens. Longest reply in tokens, about 4 characters each. |
| `top_p` | number | no | `0.9` | Top P. From 0 to 1. Adjust this or Temperature, not both. |
| `presence_penalty` | number | no | `0` | Presence Penalty. Higher values push the model toward new topics. |
| `frequency_penalty` | number | no | `1` | Frequency Penalty. Higher values make the model repeat itself less. |
| `roles` | JSON | no | `[{"role":"system","content":"You are a helpful assistant."}]` | Roles. Messages sent before the question, such as a system instruction. |

# AI

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-ai'
  version: '0.11.0'
```

Categories: ARTIFICIAL_INTELLIGENCE, UNIVERSAL_AI. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `askAi`

**Ask AI.** Sends a free-form prompt to a text model and returns its answer, optionally continuing a multi-turn thread via a Conversation Key or grounding the reply with web search. Pick it for open-ended reasoning, drafting, or judgement over flow data; prefer summarizeText to condense text, classifyText for a fixed label set, extractStructuredData for typed fields, or run_agent when the task needs tools and multiple steps. Requires a provider/model plus a prompt; not idempotent, since each call generates a fresh answer and a Conversation Key appends the exchange to stored history.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provider` | string | yes |  | Provider. A value the product loads from the provider, such as an id; write the value itself. |
| `model` | string | yes |  | Model. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Prompt. |
| `conversationKey` | string | no |  | Conversation Key. |
| `creativity` | number | no |  | Creativity. Controls the creativity of the AI response. A higher value will make the AI more creative and a lower value will make it more deterministic. |
| `maxOutputTokens` | number | no | `2000` | Max Tokens. |
| `webSearch` | boolean | no | `false` | Web Search. Whether to use web search to find information for the AI to use in its response. |
| `webSearchOptions` | object | no |  | Web Search Options. An object whose fields depend on other inputs; the product shows them. |

### `summarizeText`

**Summarize Text.** Condenses one block of supplied text into a shorter summary using a chosen text model. Pick it when the goal is a shorter version of text you already have; use extractStructuredData for specific typed fields, classifyText for a label, or askAi for open-ended questions. Requires a provider/model, the text inline (it fetches no URLs and reads no files) and the Prompt prop, which carries a default guide instruction but is still required; not idempotent, as generation is non-deterministic, so identical text returns differently worded summaries.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provider` | string | yes |  | Provider. A value the product loads from the provider, such as an id; write the value itself. |
| `model` | string | yes |  | Model. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text. |
| `prompt` | string | yes | `"Summarize the following text in a clear and concise manner, capturing the key points and main ideas while keeping the summary brief and informative."` | Prompt. |
| `maxOutputTokens` | number | no | `2000` | Max Tokens. |

### `generateImage`

**Generate Image.** Generates an image from a text prompt with an image-capable model and writes it out as a flow file; when Input Images are attached and the model supports editing, it edits, varies, or merges those images instead of generating from scratch. Pick it for any image creation or edit step; use askAi or run_agent when you need text output. Requires a prompt plus an image-capable provider/model, and input images fail on a model that cannot accept them; not idempotent, as each call generates and stores a new image file.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provider` | string | yes |  | Provider. A value the product loads from the provider, such as an id; write the value itself. |
| `model` | string | yes |  | Model. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Prompt. |
| `inputImages` | array | no |  | Input Images. Provide images for editing, variation, or merging. Support depends on the selected model. Each item: { `file` }. |
| `advancedOptions` | object | no |  | Advanced Options. An object whose fields depend on other inputs; the product shows them. |

### `classifyText`

**Classify Text.** Assigns exactly one label from a caller-supplied Categories list to a block of text using a text model, and errors if the model answers with anything outside that list. Pick it for routing or branching where the outcomes are known up front; use extractStructuredData for multiple typed fields, summarizeText to shorten text, or askAi when the answer is not one of a fixed set. Requires the text plus a non-empty Categories array matched by exact string, so keep labels short; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provider` | string | yes |  | Provider. A value the product loads from the provider, such as an id; write the value itself. |
| `model` | string | yes |  | Model. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text to Classify. |
| `categories` | array | yes |  | Categories. Categories to classify text into. |

### `extractStructuredData`

**Extract Structured Data.** Pulls typed fields out of unstructured input (text, images or PDFs) against a schema supplied either in simple mode, a list of field definitions, or advanced mode, a raw JSON Schema. Pick it when you need specific named values from documents such as invoices, receipts or emails; use classifyText for a single label, summarizeText for prose condensation, or askAi for open-ended analysis. At least one of Text or Files is required or the step throws; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provider` | string | yes |  | Provider. A value the product loads from the provider, such as an id; write the value itself. |
| `model` | string | yes |  | Model. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | no |  | Text. Text to extract structured data from. |
| `files` | array | no |  | Files. Each item: { `file`? }. |
| `prompt` | string | no | `"Extract the following data from the provided data."` | Guide Prompt. Prompt to guide the AI. |
| `mode` | string | yes | `"simple"` | Data Schema Type. For complex schema, you can use advanced mode. One of `"simple"`, `"advanced"`. |
| `schema` | object | yes |  | Data Definition. An object whose fields depend on other inputs; the product shows them. |
| `maxOutputTokens` | number | no | `2000` | Max Tokens. |

### `run_agent`

**Run Agent.** Runs an agent that reasons over your prompt and calls the piece actions you attach to this step, iterating until the task is done. Pick it when the work needs tool use or an unknown number of steps; prefer askAi for a single prompt-in/answer-out call, or classifyText and extractStructuredData for one narrow analysis. Sub-flow, MCP and knowledge-base tools are not supported on this step. Requires a prompt and an AI Model; not idempotent, as the agent performs side effects through its tools.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | no |  | Agent. Run a saved agent. Its instructions, tools and model come from the agent itself, so improving it improves every flow that uses it. |
| `prompt` | string | yes |  | Prompt. Describe what you want the assistant to do. |
| `aiProviderModel` | object | no |  | AI Model. Leave empty when the step runs a saved agent: the model comes from the agent. |
| `agentTools` | array | no |  | Agent Tools. Each item: { `type`, `toolName`, `pieceMetadata`?, `externalFlowId`?, `serverUrl`?, `protocol`?, `auth`?, `sourceType`?, `sourceId`?, `sourceName`? }. |
| `maxSteps` | number | no | `20` | Max steps. The number of iterations the agent can do. Comes from the agent when the step runs a saved one. |
| `structuredOutput` | array | no |  | Structured Output. Each item: { `displayName`, `description`?, `type` }. |

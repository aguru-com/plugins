# Parallel

Web research APIs for AI: search, extract, multi-hop research tasks, entity discovery (FindAll), and web monitoring.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-parallel'
  version: '0.1.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> **Get your Parallel API key:**
>
> 1. Sign in at https://platform.parallel.ai
> 2. Navigate to **API Keys**
> 3. Create a new key and paste it here.

## Actions

### `search`

**Search the Web.** Run a web search via Parallel's research API and return ranked, citation-backed text excerpts for a natural-language objective plus one or more keyword queries. Use it to gather fresh web evidence on a topic; choose between a fast Basic mode and a deeper Advanced mode, and optionally restrict or exclude specific domains. At least one search query is required. Read-only and idempotent: re-running the same query has no side effect, though live web results may vary over time. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objective` | string | no |  | Objective. Natural-language description of the underlying question or goal driving the search. Should be self-contained with enough context to understand the intent. |
| `search_queries` | array | yes |  | Search Queries. Concise keyword search queries (3-6 words each). At least one query is required; 2-3 is best. |
| `mode` | string | no | `"advanced"` | Mode. Basic: low latency with 2-3 high-quality queries. Advanced: higher quality with deeper retrieval. One of `"basic"`, `"advanced"`. |
| `max_chars_total` | number | no |  | Max Total Characters. Upper bound on total characters across excerpts from all results. |
| `include_domains` | array | no |  | Include Domains. Optional list of domains to restrict results to (e.g. wikipedia.org, .gov). |
| `exclude_domains` | array | no |  | Exclude Domains. Optional list of domains to exclude from results. |
| `session_id` | string | no |  | Session ID. Optional session identifier to share context across search/extract calls. |

### `extract`

**Extract Web Content.** Fetch and extract clean, citation-aware content from a known list of web URLs (up to 20 per request) via Parallel's research API. Use it when you already have the pages and want their readable content rather than searching for them; an optional objective and queries focus the returned excerpts, and full-page markdown can be requested at the cost of higher latency. Requires at least one URL. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `urls` | array | yes |  | URLs. List of URLs to extract content from (max 20). |
| `objective` | string | no |  | Objective. Natural-language description of the goal driving the extraction. Used to focus excerpts on the most relevant content. |
| `search_queries` | array | no |  | Search Queries. Optional keyword search queries used together with the objective to focus excerpts. |
| `full_content` | boolean | no | `false` | Include Full Content. When enabled, requests full markdown of each page in addition to excerpts. May increase latency. |
| `max_chars_total` | number | no |  | Max Total Characters. Upper bound on total characters across excerpts from all results. |
| `session_id` | string | no |  | Session ID. Optional session identifier to share context across search/extract calls. |

### `create_task_run`

**Create Task Run.** Start an asynchronous multi-hop research task on Parallel for a free-text or JSON input, selecting a speed/depth processor tier and optionally constraining output to plain text or a JSON Schema. Use it to kick off deeper research than a single search; it returns immediately with a queued run id that you then poll with Get Task Run Status or block on with Get Task Run Result. Not idempotent: each call queues a new run. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `input` | string | yes |  | Input. Input to the task (free text or a JSON string). Example: "What was the GDP of France in 2023?". |
| `processor` | string | yes | `"base"` | Processor. Speed/depth tier for the task. One of `"lite"`, `"base"`, `"core"`, `"pro"`, `"ultra"`. |
| `output_schema_type` | string | no | `"auto"` | Output Schema Type. How the task should structure its output. One of `"auto"`, `"text"`, `"json"`. |
| `output_text_description` | string | no |  | Output Description (Text). Used when Output Schema Type is "Text". Plain-language description of the desired output. |
| `output_json_schema` | JSON | no |  | Output JSON Schema. Used when Output Schema Type is "JSON Schema". A JSON Schema object describing the desired structured output. |
| `include_domains` | array | no |  | Include Domains. Optional source policy: only return results from these domains. |
| `exclude_domains` | array | no |  | Exclude Domains. Optional source policy: exclude results from these domains. |
| `metadata` | object | no |  | Metadata. Optional key/value metadata stored with the run (keys ≤16 chars, values ≤512 chars). |

### `get_task_run`

**Get Task Run Status.** Look up the current status of a previously created Parallel research task by its run id, without blocking. Use it to poll whether a task started with Create Task Run is still queued or running before fetching its result. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `run_id` | string | yes |  | Run ID. The task run ID, e.g. `trun_e0083b6aac0544eb8686e8d2a76533d2`. |

### `get_task_run_result`

**Get Task Run Result.** Fetch the final result of a Parallel research task by its run id, blocking until the run completes or the configured timeout (default 600s) is reached. Use it after Create Task Run to wait for and collect the task output. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `run_id` | string | yes |  | Run ID. The task run ID returned from Create Task Run. |
| `timeout` | number | no | `600` | Timeout (seconds). How long to wait for the run to complete. Defaults to 600 seconds. |

### `create_findall_run`

**Create FindAll Run.** Start a Parallel FindAll run that discovers and verifies a list of entities (e.g. companies or people) matching a plain-language objective. Match conditions can be supplied explicitly or, when left empty, are auto-generated from the objective via an extra ingest call. Use it to build verified entity lists rather than answering a single question; pick a generator tier and a match limit (5-1000). Not idempotent: each call queues a new run whose id is then read with Get FindAll Result. Needs authentication.

Kind: search, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objective` | string | yes |  | Objective. Natural-language description of the target entities. e.g. "AI companies that raised Series A funding in 2024". |
| `entity_type` | string | yes |  | Entity Type. Type of entities to find (e.g. "company", "people"). |
| `match_conditions` | JSON | no | `[]` | Match Conditions. Array of `{ "name": "...", "description": "..." }` objects describing the criteria each match must satisfy. Leave empty to auto-generate from the objective. |
| `generator` | string | yes | `"core"` | Generator. Generator tier — higher tiers use deeper search at higher cost. One of `"base"`, `"core"`, `"pro"`, `"preview"`. |
| `match_limit` | number | yes | `100` | Match Limit. Maximum number of matches to find (5–1000). Defaults to 100. |
| `metadata` | object | no |  | Metadata. Optional key/value metadata stored with the run. |

### `get_findall_result`

**Get FindAll Result.** Read the current snapshot of matched candidates and enrichment fields for a Parallel FindAll run by its id. Use it to poll or collect the entities discovered by Create FindAll Run; the run may still be in progress, so results can grow across calls. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `findall_id` | string | yes |  | FindAll ID. The FindAll run ID returned from Create FindAll Run. |

### `chat_completion`

**Chat Completion.** Generate a chat completion from Parallel's web-grounded research models through an OpenAI-compatible interface, sending a user message plus an optional system message. Use it for a one-shot answer backed by Parallel's research rather than starting a tracked task run; choose a processor tier via the model name (speed, base, core, pro, ultra) and optionally force free text, a JSON object, or a named JSON Schema response. Not idempotent: each call generates a fresh completion. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"speed"` | Model / Processor. Model name to use (e.g. `speed`, `base`, `core`, `pro`, `ultra`). |
| `system` | string | no |  | System Message. Optional system message to set the assistant behaviour. |
| `user_message` | string | yes |  | User Message. The user prompt to send. |
| `response_format` | string | no | `"text"` | Response Format. Whether the model should return free text or a JSON object. One of `"text"`, `"json_object"`, `"json_schema"`. |
| `json_schema` | JSON | no |  | JSON Schema. Used when Response Format is "JSON Schema". Provide a JSON Schema object. |
| `json_schema_name` | string | no |  | JSON Schema Name. Name for the JSON schema (required when Response Format is JSON Schema). |

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

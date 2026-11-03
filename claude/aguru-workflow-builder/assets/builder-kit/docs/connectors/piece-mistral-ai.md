# Mistral AI

Mistral AI provides state-of-the-art open-weight and hosted language models for text generation, embeddings, and reasoning tasks.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mistral-ai'
  version: '0.4.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain your API key from the Mistral AI dashboard. Go to https://console.mistral.ai, generate an API key, and paste it here.

### `CUSTOM_AUTH`: Cloudflare AI Gateway

> Route Mistral calls through your Cloudflare AI Gateway. Provide a Mistral API key (key-in-request mode) or leave it blank if your gateway has Mistral configured as a stored key (BYOK).

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Cloudflare Account ID. Your Cloudflare account ID (visible on the AI Gateway dashboard). |
| `gatewayId` | string | yes |  | Gateway ID. The slug of your AI Gateway (visible on the gateway settings page). |
| `gatewayAuthToken` | string | no |  | Gateway Auth Token. Optional. Required only if your gateway has authentication enabled. Sent as cf-aig-authorization. |
| `mistralApiKey` | string | no |  | Mistral API Key. Optional. Provide your Mistral key for key-in-request mode. Leave blank if Cloudflare injects the key via stored credentials (BYOK). |

## Actions

### `create_chat_completion`

**Ask Mistral.** Sends one user prompt to a Mistral chat model through the chat-completions endpoint and returns only the assistant text of the first choice, with optional temperature, top-p, max-token and random-seed controls; it is stateless, with no conversation memory or system message. This is the piece's only text-generation action - prefer Create Embeddings when you need vectors rather than prose, and Run OCR when the text must be pulled out of a PDF or image instead of generated. Requires a model id from the account's live model list and a question; not idempotent: each call bills a fresh completion and the wording varies unless a random seed is pinned. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes |  | Model. Select a Mistral model. List is fetched live from your account. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Question. |
| `temperature` | number | no | `1` | Temperature. Controls randomness: Lowering results in less random completions. As the temperature approaches zero, the model will become deterministic and repetitive. |
| `top_p` | number | no | `1` | Top P. An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. |
| `max_tokens` | number | no |  | Max Tokens. |
| `random_seed` | number | no |  | Random Seed. |
| `timeout` | number | no | `30000` | Timeout (ms). |

### `create_embeddings`

**Create Embeddings.** Converts an array of text strings into numeric embedding vectors using Mistral's fixed mistral-embed model; the model is not selectable here, unlike the sibling Ask Mistral action, and a whole batch of strings is embedded in one call. Use it for semantic search, similarity, or clustering pipelines, and pick Ask Mistral when you need generated prose rather than numbers. Requires a non-empty array of input strings; idempotent: nothing is created server-side and the same input yields the same vectors. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `input` | array | yes |  | Input. The input text for which to create an embedding. |
| `timeout` | number | no | `30000` | Timeout (ms). |

Output fields:

- `id`: Request ID
- `model`: Model
- `data`: Embeddings
- `data[].index`: Index (number)
- `data[].embedding`: Vector
- `usage`: Usage
- `usage.prompt_tokens`: Prompt Tokens (number)
- `usage.total_tokens`: Total Tokens (number)

### `upload_file`

**Upload File.** Stores a file in the connected Mistral account and returns its file id, tagged with a purpose of fine-tune, batch, or ocr that decides what the id may later be used for. Run it before Run OCR whenever the document is a step attachment rather than a public URL: upload with purpose=ocr and feed the returned id into that action. Rejects files above 512MB or with an extension outside jsonl, txt, csv, pdf, docx, png, jpg, jpeg, mp3, mp4; not idempotent: each call stores another copy and returns a new id. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The file to upload (max 512MB).For fine tuning purspose provide .jsonl file. Files are not supported; an action that needs one fails. |
| `purpose` | string | yes |  | Purpose. Purpose of the file. One of `"fine-tune"`, `"batch"`, `"ocr"`. |

Output fields:

- `id`: File ID
- `filename`: File Name
- `purpose`: Purpose
- `bytes`: Size (filesize)
- `mimetype`: MIME Type
- `source`: Source
- `created_at`: Created At (Unix seconds) (number)

### `run_ocr`

**Run OCR.** Extracts the text of a PDF or image as Markdown with a Mistral OCR model, taking the document either from a public URL or from a Mistral file id (that mode first resolves a short-lived signed URL); optional zero-based page indices narrow the run and embedded images can come back as base64. Pick this to read text out of a document that already exists, and Ask Mistral when the answer has to be generated or reasoned about rather than transcribed. The file-id mode only works for a file that Upload File stored with purpose=ocr, and the document type must be set to PDF or image to match the source. Read-only extraction that stores nothing, so repeat calls are idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"mistral-ocr-latest"` | Model. One of `"mistral-ocr-latest"`, `"mistral-ocr-2505"`. |
| `documentSource` | string | yes | `"url"` | Document Source. Where the document or image to OCR comes from. One of `"url"`, `"fileId"`. |
| `sourceFields` | object | yes |  | Document. An object whose fields depend on other inputs; the product shows them. |
| `pages` | array | no |  | Pages. Optional zero-based page indices to process. Leave empty for all pages. |
| `includeImageBase64` | boolean | no | `false` | Include Image Base64. Return embedded images encoded as base64 alongside the Markdown. |
| `timeout` | number | no | `120000` | Timeout (ms). |

### `list_models`

**List Models.** Returns every model the connected Mistral key can access, chat, embedding and OCR ids alike, exactly as the models endpoint reports them. Use it to discover a valid model id before calling Ask Mistral or Run OCR, both of which require one; it is the only discovery action here and takes no inputs, so it cannot filter or search. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `data`: Models
- `data[].id`: Model ID
- `data[].name`: Name
- `data[].description`: Description
- `data[].type`: Type
- `data[].owned_by`: Owned By
- `data[].max_context_length`: Max Context Length (number)
- `data[].aliases`: Aliases
- `data[].deprecation`: Deprecation Date (datetime)
- `data[].default_model_temperature`: Default Temperature (number)
- `data[].capabilities`: Capabilities (an object whose keys vary)

### `generate_chat_completion`

**Generate Chat Completion.** Generates one assistant reply from a Mistral chat model for a multi-turn message list, with an optional system prompt and JSON output mode, and returns the reply text plus finish reason and token usage. Pick this for stateless text generation where you supply the whole history; use Start Conversation instead when Mistral should store the thread or run a Mistral agent. Model ids come from List Models. Not idempotent: each call bills a new completion and the wording varies unless a random seed is set. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"mistral-small-latest"` | Model. Chat model id, e.g. mistral-large-latest or mistral-small-latest. Use List Models to see what your key can access. |
| `system_prompt` | string | no |  | System Prompt. Optional instructions that set the model behaviour for the whole reply. |
| `messages` | array | yes |  | Messages. The conversation so far, oldest first. The last message is usually from the user. Each item: { `role`, `content` }. |
| `response_format` | string | no | `"text"` | Response Format. Choose JSON to force the model to return a valid JSON object. Also ask for JSON in the prompt. One of `"text"`, `"json_object"`. |
| `temperature` | number | no |  | Temperature. Sampling temperature between 0 and 1.5. Mistral recommends 0 to 0.7. |
| `max_tokens` | number | no |  | Max Tokens. Maximum number of tokens to generate. |
| `random_seed` | number | no |  | Random Seed. Set a seed to make repeated calls return the same output. |

Output fields:

- `id`: Completion ID
- `model`: Model
- `content`: Reply
- `finish_reason`: Finish Reason
- `prompt_tokens`: Prompt Tokens (number)
- `completion_tokens`: Completion Tokens (number)
- `total_tokens`: Total Tokens (number)

### `complete_code_fim`

**Complete Code (Fill-in-the-Middle).** Fills in code between a prefix (prompt) and an optional suffix using a Codestral fill-in-the-middle model, returning only the generated middle text. Pick this for code insertion or completion inside an existing file; use Generate Chat Completion for explaining or writing code from an instruction. Only Codestral models support this endpoint. Not idempotent: each call bills a new completion. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"codestral-latest"` | Model. A Codestral model id. Fill-in-the-middle only works with Codestral models. |
| `prompt` | string | yes |  | Code Before (Prompt). The code that comes before the part to generate. |
| `suffix` | string | no |  | Code After (Suffix). Optional code that comes after the part to generate. |
| `max_tokens` | number | no |  | Max Tokens. |
| `temperature` | number | no |  | Temperature. |
| `stop` | array | no |  | Stop Sequences. Stop generating when any of these strings is produced. |

Output fields:

- `id`: Completion ID
- `model`: Model
- `completion`: Completion
- `finish_reason`: Finish Reason
- `prompt_tokens`: Prompt Tokens (number)
- `completion_tokens`: Completion Tokens (number)
- `total_tokens`: Total Tokens (number)

### `transcribe_audio`

**Transcribe Audio.** Transcribes speech to text with a Mistral Voxtral model and returns the full text, detected language and optional timestamped segments. Provide exactly one source: an audio file, a public audio URL, or the id of a file already uploaded to Mistral. Setting the language improves accuracy; diarization labels speakers. Read-only, stores nothing; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"voxtral-mini-latest"` | Model. One of `"voxtral-mini-latest"`, `"voxtral-mini-2507"`. |
| `file` | file | no |  | Audio File. The audio file to transcribe. Leave empty if you use Audio URL or File ID. Files are not supported; an action that needs one fails. |
| `file_url` | string | no |  | Audio URL. Public URL of the audio file. |
| `file_id` | string | no |  | File ID. UUID of an audio file already uploaded to Mistral (see List Files). |
| `language` | string | no |  | Language. Two-letter language code of the audio, e.g. en or fr. Leave empty to auto-detect. |
| `diarize` | boolean | no | `false` | Identify Speakers. Label which speaker said each segment. |
| `timestamp_granularity` | string | no |  | Timestamps. One of `"segment"`, `"word"`. |

Output fields:

- `text`: Transcript
- `language`: Language
- `model`: Model
- `segments`: Segments
- `segments[].text`: Text
- `segments[].start`: Start (s) (number)
- `segments[].end`: End (s) (number)
- `segments[].speaker_id`: Speaker
- `prompt_audio_seconds`: Audio Seconds (number)
- `total_tokens`: Total Tokens (number)

### `generate_speech`

**Generate Speech.** Converts text into spoken audio with Mistral text-to-speech and returns it as a file in the chosen format (mp3 by default). A voice is required: a preset slug (default en_paul_neutral) or a custom voice UUID. Use Transcribe Audio for the reverse direction. Not idempotent: each call bills a new generation and produces a new file. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `input` | string | yes |  | Text. The text to speak. |
| `model` | string | yes | `"voxtral-mini-tts-latest"` | Model. Text-to-speech model id. |
| `voice_id` | string | yes | `"en_paul_neutral"` | Voice. A preset voice slug such as en_paul_neutral, en_paul_happy or en_paul_sad, or the UUID of a custom voice. |
| `response_format` | string | no | `"mp3"` | Audio Format. One of `"mp3"`, `"wav"`, `"flac"`, `"opus"`, `"pcm"`. |
| `file_name` | string | no | `"speech"` | File Name. Name for the audio file, without extension. |

Output fields:

- `file`: File (url)
- `file_name`: File Name
- `size_bytes`: Size (filesize)
- `format`: Audio Format

### `moderate_text`

**Moderate Text.** Classifies one or more plain texts against Mistral’s moderation categories (sexual, hate, violence, self-harm, PII and more) and returns per-text flags and scores plus the list of flagged categories. Use this for standalone text; use Moderate Chat when the content is a conversation so the assistant turn is judged in context. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `texts` | array | yes |  | Texts. One or more texts to check. Each is scored separately. |
| `model` | string | yes | `"mistral-moderation-latest"` | Model. |

Output fields:

- `id`: Moderation ID
- `model`: Model
- `any_flagged`: Any Flagged (boolean)
- `results`: Results
- `results[].input`: Input
- `results[].flagged`: Flagged (boolean)
- `results[].flagged_categories`: Flagged Categories
- `results[].categories`: Categories (an object whose keys vary)
- `results[].category_scores`: Category Scores (an object whose keys vary)

### `moderate_chat`

**Moderate Chat.** Classifies a conversation (user and assistant turns) against Mistral’s moderation categories, judging the last turn in the context of the earlier ones, and returns flags, scores and the flagged categories. Use this for chat transcripts; use Moderate Text for standalone strings. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messages` | array | yes |  | Messages. The conversation to check, oldest first. Each item: { `role`, `content` }. |
| `model` | string | yes | `"mistral-moderation-latest"` | Model. |

Output fields:

- `id`: Moderation ID
- `model`: Model
- `any_flagged`: Any Flagged (boolean)
- `results`: Results
- `results[].input`: Input
- `results[].flagged`: Flagged (boolean)
- `results[].flagged_categories`: Flagged Categories
- `results[].categories`: Categories (an object whose keys vary)
- `results[].category_scores`: Category Scores (an object whose keys vary)

### `get_model`

**Get Model.** Returns one model’s details by id: capabilities (chat, function calling, vision, fine-tuning, OCR, audio), context length, aliases, owner and deprecation date. Use it to check what a model supports before calling it; use List Models to discover ids. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model_id` | string | yes |  | Model ID. The model id, e.g. mistral-large-latest or a fine-tuned id starting with ft:. |

Output fields:

- `id`: Model ID
- `name`: Name
- `description`: Description
- `type`: Type
- `owned_by`: Owned By
- `max_context_length`: Max Context Length (number)
- `aliases`: Aliases
- `deprecation`: Deprecation Date (datetime)
- `default_model_temperature`: Default Temperature (number)
- `capabilities`: Capabilities (an object whose keys vary)

### `list_files`

**List Files.** Lists files stored in the Mistral account with their UUIDs, names, purpose, size and creation time, optionally filtered by purpose or a filename search, one page at a time. Use it to find a file id for Get File, Delete File, Download File, OCR, transcription or a batch job. Read-only; safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `purpose` | string | no |  | Purpose. Only return files uploaded for this purpose. One of `"ocr"`, `"batch"`, `"fine-tune"`. |
| `search` | string | no |  | Search. Only return files whose name contains this text. |
| `page` | number | no | `0` | Page. Zero-based page number. |
| `page_size` | number | no | `100` | Page Size. |

Output fields:

- `files`: Files
- `files[].id`: File ID
- `files[].filename`: File Name
- `files[].purpose`: Purpose
- `files[].bytes`: Size (filesize)
- `files[].mimetype`: MIME Type
- `files[].source`: Source
- `files[].sample_type`: Sample Type
- `files[].num_lines`: Number of Lines (number)
- `files[].created_at`: Created At (datetime)
- `files[].expires_at`: Expires At (datetime)
- `count`: Count (number)
- `total`: Total (number)

### `get_file`

**Get File.** Returns the metadata of one uploaded file by UUID: name, purpose, size, MIME type, source and creation time. It does not return the content; use Download File for that. Get file ids from List Files or Upload File. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The file UUID, from List Files or Upload File. |

Output fields:

- `id`: File ID
- `filename`: File Name
- `purpose`: Purpose
- `bytes`: Size (filesize)
- `mimetype`: MIME Type
- `source`: Source
- `sample_type`: Sample Type
- `num_lines`: Number of Lines (number)
- `created_at`: Created At (datetime)
- `expires_at`: Expires At (datetime)

### `delete_file`

**Delete File.** Permanently deletes one uploaded file and its metadata by UUID; this cannot be undone and breaks any batch job or OCR call that still references it. Confirm the id with List Files or Get File first. Not idempotent: a repeat call fails because the file is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The file UUID, from List Files. |

Output fields:

- `id`: File ID
- `deleted`: Deleted (boolean)

### `get_file_signed_url`

**Get File Download URL.** Creates a time-limited signed URL (1 to 168 hours, default 24) that downloads one uploaded file without an API key. Use it to hand a file to another service by link; use Download File when the flow itself needs the bytes. Each call issues a new URL, but nothing is changed in the account. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The file UUID, from List Files. |
| `expiry_hours` | number | no | `24` | Expiry (hours). How long the link stays valid, between 1 and 168 hours. |

Output fields:

- `file_id`: File ID
- `url`: Download URL (url)
- `expires_at`: Expires At (datetime)

### `download_file`

**Download File.** Downloads the content of one Mistral file by UUID and returns it as a file the flow can pass on, together with its name and size. Use it to fetch batch results or error files (their ids come from Get Batch Job) or anything else in List Files. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The file UUID, from List Files or a batch job’s output file. |

Output fields:

- `file`: File (url)
- `file_name`: File Name
- `size_bytes`: Size (filesize)
- `file_id`: File ID
- `mimetype`: MIME Type

### `create_agent`

**Create Agent.** Creates a reusable Mistral agent (Beta) from a model, a name, optional instructions, built-in tools (web search, code interpreter, image generation) and document libraries, and returns its agent id. Run the agent with Start Conversation using that id; change it later with Update Agent. Not idempotent: each call creates another agent, even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `model` | string | yes | `"mistral-medium-latest"` | Model. Chat model id the agent runs on, e.g. mistral-medium-latest. |
| `instructions` | string | no |  | Instructions. The system prompt the agent follows in every conversation. |
| `description` | string | no |  | Description. |
| `built_in_tools` | array | no |  | Built-in Tools. Mistral-hosted tools the agent may use. One of `"web_search"`, `"web_search_premium"`, `"code_interpreter"`, `"image_generation"`. |
| `library_ids` | array | no |  | Document Library IDs. Library UUIDs (from List Libraries) the agent can search for answers. |
| `temperature` | number | no |  | Temperature. |

Output fields:

- `id`: Agent ID
- `name`: Name
- `description`: Description
- `model`: Model
- `instructions`: Instructions
- `tools`: Tools
- `library_ids`: Library IDs
- `temperature`: Temperature (number)
- `version`: Version (number)
- `source`: Source
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `list_agents`

**List Agents.** Lists Mistral agents (Beta) with their ids, names, models, instructions and tools, optionally filtered by a name or id search, one page at a time. Use it to find the agent id for Start Conversation, Get Agent, Update Agent or Delete Agent. Pass the returned next page token to get the next page. Read-only; safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Only return agents whose name or id contains this text. |
| `page_size` | number | no | `20` | Page Size. |
| `page_token` | string | no |  | Page Token. The next page token from a previous call. |

Output fields:

- `agents`: Agents
- `agents[].id`: Agent ID
- `agents[].name`: Name
- `agents[].description`: Description
- `agents[].model`: Model
- `agents[].instructions`: Instructions
- `agents[].tools`: Tools
- `agents[].library_ids`: Library IDs
- `agents[].temperature`: Temperature (number)
- `agents[].version`: Version (number)
- `agents[].source`: Source
- `agents[].created_at`: Created At (datetime)
- `agents[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `next_page_token`: Next Page Token

### `get_agent`

**Get Agent.** Returns one Mistral agent’s configuration (Beta) by agent id: model, instructions, tools, libraries and version numbers, optionally at a specific version. Get agent ids from List Agents or Create Agent. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agent_id` | string | yes |  | Agent ID. The agent id (usually starts with ag_), from List Agents. |
| `agent_version` | number | no |  | Version. Return this version instead of the current one. |

Output fields:

- `id`: Agent ID
- `name`: Name
- `description`: Description
- `model`: Model
- `instructions`: Instructions
- `tools`: Tools
- `library_ids`: Library IDs
- `temperature`: Temperature (number)
- `version`: Version (number)
- `source`: Source
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `update_agent`

**Update Agent.** Updates a Mistral agent (Beta) by agent id; only the fields you pass change and the rest are kept. Built-in tools and document libraries are replaced independently: passing one keeps the other as it was. Tools cannot be cleared here. Each update creates a new agent version. Get the id from List Agents. Idempotent: sending the same values again leaves the same configuration. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agent_id` | string | yes |  | Agent ID. The agent id (usually starts with ag_), from List Agents. |
| `name` | string | no |  | Name. |
| `model` | string | no |  | Model. |
| `instructions` | string | no |  | Instructions. |
| `description` | string | no |  | Description. |
| `built_in_tools` | array | no |  | Built-in Tools. Mistral-hosted tools the agent may use. One of `"web_search"`, `"web_search_premium"`, `"code_interpreter"`, `"image_generation"`. |
| `library_ids` | array | no |  | Document Library IDs. Library UUIDs (from List Libraries) the agent can search for answers. |
| `temperature` | number | no |  | Temperature. |

Output fields:

- `id`: Agent ID
- `name`: Name
- `description`: Description
- `model`: Model
- `instructions`: Instructions
- `tools`: Tools
- `library_ids`: Library IDs
- `temperature`: Temperature (number)
- `version`: Version (number)
- `source`: Source
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `delete_agent`

**Delete Agent.** Permanently deletes a Mistral agent (Beta) and all its versions by agent id; conversations can no longer be started with it. Confirm the id with Get Agent or List Agents first. Not idempotent: a repeat call fails because the agent is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agent_id` | string | yes |  | Agent ID. The agent id (usually starts with ag_), from List Agents. |

Output fields:

- `agent_id`: Agent ID
- `deleted`: Deleted (boolean)

### `start_conversation`

**Start Conversation.** Starts a new server-side conversation (Beta) with either a Mistral agent (agent id) or a plain model, sends the first message and returns the reply text, all output entries (including tool calls) and the conversation id. This is how you run a Mistral agent; continue with Append to Conversation. Use Generate Chat Completion instead for one-off stateless replies. Not idempotent: each call creates a new conversation and bills a new reply. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message` | string | yes |  | Message. The first user message. |
| `agent_id` | string | no |  | Agent ID. Run this agent (from List Agents). Leave empty to talk to a model directly. |
| `model` | string | no |  | Model. Model id to use when no agent is given, e.g. mistral-medium-latest. |
| `instructions` | string | no |  | Instructions. System instructions, only used when talking to a model directly. |
| `name` | string | no |  | Conversation Name. |
| `store` | boolean | no | `true` | Store Conversation. Keep the conversation on Mistral so it can be continued later. |

Output fields:

- `conversation_id`: Conversation ID
- `reply`: Reply
- `outputs`: Outputs
- `outputs[].id`: Entry ID
- `outputs[].type`: Type
- `outputs[].role`: Role
- `outputs[].content`: Content
- `outputs[].chunks`: Files & References
- `outputs[].name`: Tool Name
- `outputs[].arguments`: Tool Arguments
- `outputs[].agent_id`: Agent ID
- `outputs[].model`: Model
- `outputs[].created_at`: Created At (datetime)
- `prompt_tokens`: Prompt Tokens (number)
- `completion_tokens`: Completion Tokens (number)
- `total_tokens`: Total Tokens (number)

### `append_to_conversation`

**Append to Conversation.** Sends a follow-up user message to an existing stored conversation (Beta) and returns the new reply and output entries; Mistral keeps the earlier turns, so only send the new message. Needs a conversation id from Start Conversation or List Conversations. Use Restart Conversation to branch from an earlier entry instead. Not idempotent: each call adds a turn and bills a new reply. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. The conversation id (usually starts with conv_), from Start Conversation or List Conversations. |
| `message` | string | yes |  | Message. The next user message. |

Output fields:

- `conversation_id`: Conversation ID
- `reply`: Reply
- `outputs`: Outputs
- `outputs[].id`: Entry ID
- `outputs[].type`: Type
- `outputs[].role`: Role
- `outputs[].content`: Content
- `outputs[].chunks`: Files & References
- `outputs[].name`: Tool Name
- `outputs[].arguments`: Tool Arguments
- `outputs[].agent_id`: Agent ID
- `outputs[].model`: Model
- `outputs[].created_at`: Created At (datetime)
- `prompt_tokens`: Prompt Tokens (number)
- `completion_tokens`: Completion Tokens (number)
- `total_tokens`: Total Tokens (number)

### `restart_conversation`

**Restart Conversation.** Creates a new conversation branch (Beta) that keeps the original history up to a chosen entry, then sends a new message from that point and returns the reply and the new conversation id; the original conversation is left unchanged. The entry id is required; get it from Get Conversation History. Use Append to Conversation to simply continue. Not idempotent: each call creates a new branch. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. The conversation id (usually starts with conv_), from Start Conversation or List Conversations. |
| `from_entry_id` | string | yes |  | From Entry ID. The entry to restart from, from Get Conversation History. |
| `message` | string | yes |  | Message. The new user message to send from that point. |

Output fields:

- `conversation_id`: Conversation ID
- `reply`: Reply
- `outputs`: Outputs
- `outputs[].id`: Entry ID
- `outputs[].type`: Type
- `outputs[].role`: Role
- `outputs[].content`: Content
- `outputs[].chunks`: Files & References
- `outputs[].name`: Tool Name
- `outputs[].arguments`: Tool Arguments
- `outputs[].agent_id`: Agent ID
- `outputs[].model`: Model
- `outputs[].created_at`: Created At (datetime)
- `prompt_tokens`: Prompt Tokens (number)
- `completion_tokens`: Completion Tokens (number)
- `total_tokens`: Total Tokens (number)

### `list_conversations`

**List Conversations.** Lists stored Mistral conversations (Beta) with their ids, names, agent or model, and timestamps, one page at a time. Use it to find a conversation id for Append, Restart, History, Messages or Delete. Read-only; safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no | `0` | Page. Zero-based page number. |
| `page_size` | number | no | `100` | Page Size. |

Output fields:

- `conversations`: Conversations
- `conversations[].id`: Conversation ID
- `conversations[].name`: Name
- `conversations[].description`: Description
- `conversations[].agent_id`: Agent ID
- `conversations[].agent_version`: Agent Version
- `conversations[].model`: Model
- `conversations[].instructions`: Instructions
- `conversations[].created_at`: Created At (datetime)
- `conversations[].updated_at`: Updated At (datetime)
- `count`: Count (number)

### `get_conversation`

**Get Conversation.** Returns one stored conversation’s metadata (Beta): name, agent or model, instructions and timestamps. It does not include the messages; use Get Conversation Messages or Get Conversation History for those. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. The conversation id (usually starts with conv_), from Start Conversation or List Conversations. |

Output fields:

- `id`: Conversation ID
- `name`: Name
- `description`: Description
- `agent_id`: Agent ID
- `agent_version`: Agent Version
- `model`: Model
- `instructions`: Instructions
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `get_conversation_history`

**Get Conversation History.** Returns every entry of a stored conversation (Beta) in order: user and assistant messages plus tool executions, function calls and agent handoffs, each with its entry id. Use it to find the entry id Restart Conversation needs, or to audit what tools an agent ran; use Get Conversation Messages when you only need the messages. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. The conversation id (usually starts with conv_), from Start Conversation or List Conversations. |

Output fields:

- `conversation_id`: Conversation ID
- `entries`: Entries
- `entries[].id`: Entry ID
- `entries[].type`: Type
- `entries[].role`: Role
- `entries[].content`: Content
- `entries[].chunks`: Files & References
- `entries[].name`: Tool Name
- `entries[].arguments`: Tool Arguments
- `entries[].agent_id`: Agent ID
- `entries[].model`: Model
- `entries[].created_at`: Created At (datetime)
- `count`: Count (number)

### `get_conversation_messages`

**Get Conversation Messages.** Returns only the user and assistant messages of a stored conversation (Beta), in order, as role and text. Use it to read the transcript; use Get Conversation History when you also need tool calls or entry ids. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. The conversation id (usually starts with conv_), from Start Conversation or List Conversations. |

Output fields:

- `conversation_id`: Conversation ID
- `messages`: Messages
- `messages[].id`: Entry ID
- `messages[].type`: Type
- `messages[].role`: Role
- `messages[].content`: Content
- `messages[].chunks`: Files & References
- `messages[].name`: Tool Name
- `messages[].arguments`: Tool Arguments
- `messages[].agent_id`: Agent ID
- `messages[].model`: Model
- `messages[].created_at`: Created At (datetime)
- `count`: Count (number)

### `delete_conversation`

**Delete Conversation.** Permanently deletes a stored conversation (Beta) and its history by conversation id; it can no longer be appended to or restarted. Confirm the id with List Conversations first. Not idempotent: a repeat call fails because the conversation is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. The conversation id (usually starts with conv_), from Start Conversation or List Conversations. |

Output fields:

- `conversation_id`: Conversation ID
- `deleted`: Deleted (boolean)

### `create_library`

**Create Library.** Creates an empty Mistral document library (Beta) and returns its UUID; add files with Upload Library Document and attach the library to an agent through Create Agent or Update Agent. Owner type User makes it private, Workspace shares it with the workspace. Not idempotent: each call creates another library, even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. |
| `owner_type` | string | no |  | Owner. User keeps the library private; Workspace shares it with your workspace. One of `"User"`, `"Workspace"`. |
| `chunk_size` | number | no |  | Chunk Size. Characters per chunk when splitting documents, between 256 and 32768. Leave empty for the default. |

Output fields:

- `id`: Library ID
- `name`: Name
- `description`: Description
- `generated_description`: Generated Description
- `owner_type`: Owner Type
- `owner_id`: Owner ID
- `nb_documents`: Number of Documents (number)
- `total_size`: Total Size (filesize)
- `chunk_size`: Chunk Size (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `list_libraries`

**List Libraries.** Lists Mistral document libraries (Beta) with their UUIDs, names, document counts and sizes, optionally filtered by a name search, one page at a time. Use it to find a library id for the document actions or for an agent’s document library tool. Pass the returned next page token to get the next page. Read-only; safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Only return libraries whose name contains this text. |
| `page_size` | number | no | `100` | Page Size. |
| `page_token` | string | no |  | Page Token. The next page token from a previous call. |

Output fields:

- `libraries`: Libraries
- `libraries[].id`: Library ID
- `libraries[].name`: Name
- `libraries[].description`: Description
- `libraries[].generated_description`: Generated Description
- `libraries[].owner_type`: Owner Type
- `libraries[].owner_id`: Owner ID
- `libraries[].nb_documents`: Number of Documents (number)
- `libraries[].total_size`: Total Size (filesize)
- `libraries[].chunk_size`: Chunk Size (number)
- `libraries[].created_at`: Created At (datetime)
- `libraries[].updated_at`: Updated At (datetime)
- `count`: Count (number)
- `next_page_token`: Next Page Token

### `get_library`

**Get Library.** Returns one document library’s details (Beta) by UUID: name, description, owner, document count, total size and chunk size. Use List Library Documents to see its documents. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `library_id` | string | yes |  | Library ID. The library UUID, from List Libraries or Create Library. |

Output fields:

- `id`: Library ID
- `name`: Name
- `description`: Description
- `generated_description`: Generated Description
- `owner_type`: Owner Type
- `owner_id`: Owner ID
- `nb_documents`: Number of Documents (number)
- `total_size`: Total Size (filesize)
- `chunk_size`: Chunk Size (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `update_library`

**Update Library.** Updates a document library’s name and/or description (Beta) by UUID; a field you leave empty keeps its current value. Idempotent: sending the same values again leaves the same library. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `library_id` | string | yes |  | Library ID. The library UUID, from List Libraries or Create Library. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |

Output fields:

- `id`: Library ID
- `name`: Name
- `description`: Description
- `generated_description`: Generated Description
- `owner_type`: Owner Type
- `owner_id`: Owner ID
- `nb_documents`: Number of Documents (number)
- `total_size`: Total Size (filesize)
- `chunk_size`: Chunk Size (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `delete_library`

**Delete Library.** Permanently deletes a document library (Beta) and every document in it by UUID; agents that use it lose access. Use Delete Library Document to remove a single document instead. Not idempotent: a repeat call fails because the library is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `library_id` | string | yes |  | Library ID. The library UUID, from List Libraries or Create Library. |

Output fields:

- `id`: Library ID
- `name`: Name
- `description`: Description
- `generated_description`: Generated Description
- `owner_type`: Owner Type
- `owner_id`: Owner ID
- `nb_documents`: Number of Documents (number)
- `total_size`: Total Size (filesize)
- `chunk_size`: Chunk Size (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `deleted`: Deleted (boolean)

### `upload_library_document`

**Upload Library Document.** Uploads a file into a Mistral document library (Beta) and returns the new document’s UUID and processing status. Processing is asynchronous: poll Get Document Status until it is done before relying on it in an agent or reading Get Document Text Content. Not idempotent: each call adds another document. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `library_id` | string | yes |  | Library ID. The library UUID, from List Libraries or Create Library. |
| `file` | file | yes |  | File. The document to add, e.g. a PDF, DOCX or text file. Files are not supported; an action that needs one fails. |

Output fields:

- `id`: Document ID
- `library_id`: Library ID
- `name`: Name
- `mime_type`: MIME Type
- `extension`: Extension
- `size`: Size (filesize)
- `number_of_pages`: Number of Pages (number)
- `summary`: Summary
- `process_status`: Processing Status
- `attributes`: Attributes (an object whose keys vary)
- `expires_at`: Delete After (datetime)
- `created_at`: Created At (datetime)
- `last_processed_at`: Last Processed At (datetime)

### `list_library_documents`

**List Library Documents.** Lists the documents in one library (Beta) with their UUIDs, names, sizes, summaries and processing status, optionally filtered by a name search, one page at a time. Use it to find a document id for the other document actions. Read-only; safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `library_id` | string | yes |  | Library ID. The library UUID, from List Libraries or Create Library. |
| `search` | string | no |  | Search. Only return documents whose name contains this text. |
| `page` | number | no | `0` | Page. Zero-based page number. |
| `page_size` | number | no | `100` | Page Size. |

Output fields:

- `documents`: Documents
- `documents[].id`: Document ID
- `documents[].library_id`: Library ID
- `documents[].name`: Name
- `documents[].mime_type`: MIME Type
- `documents[].extension`: Extension
- `documents[].size`: Size (filesize)
- `documents[].number_of_pages`: Number of Pages (number)
- `documents[].summary`: Summary
- `documents[].process_status`: Processing Status
- `documents[].attributes`: Attributes (an object whose keys vary)
- `documents[].expires_at`: Delete After (datetime)
- `documents[].created_at`: Created At (datetime)
- `documents[].last_processed_at`: Last Processed At (datetime)
- `count`: Count (number)
- `total`: Total (number)
- `has_more`: Has More (boolean)

### `get_library_document`

**Get Library Document.** Returns one library document’s metadata (Beta): name, type, size, page count, summary, attributes and processing status. Use Get Document Text Content for the text itself. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `library_id` | string | yes |  | Library ID. The library UUID, from List Libraries or Create Library. |
| `document_id` | string | yes |  | Document ID. The document UUID, from List Library Documents or Upload Library Document. |

Output fields:

- `id`: Document ID
- `library_id`: Library ID
- `name`: Name
- `mime_type`: MIME Type
- `extension`: Extension
- `size`: Size (filesize)
- `number_of_pages`: Number of Pages (number)
- `summary`: Summary
- `process_status`: Processing Status
- `attributes`: Attributes (an object whose keys vary)
- `expires_at`: Delete After (datetime)
- `created_at`: Created At (datetime)
- `last_processed_at`: Last Processed At (datetime)

### `update_library_document`

**Update Library Document.** Updates a library document’s name, custom attributes and/or automatic-deletion date (Beta); a field you leave empty keeps its current value, but passing attributes replaces the whole attribute set. It does not change the file content. Idempotent: sending the same values again leaves the same document. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `library_id` | string | yes |  | Library ID. The library UUID, from List Libraries or Create Library. |
| `document_id` | string | yes |  | Document ID. The document UUID, from List Library Documents or Upload Library Document. |
| `name` | string | no |  | Name. |
| `attributes` | JSON | no |  | Attributes. Custom key-value attributes as a JSON object. Replaces the existing attributes. |
| `expires_at` | ISO date-time string | no |  | Delete After. The document is deleted automatically after this date. |

Output fields:

- `id`: Document ID
- `library_id`: Library ID
- `name`: Name
- `mime_type`: MIME Type
- `extension`: Extension
- `size`: Size (filesize)
- `number_of_pages`: Number of Pages (number)
- `summary`: Summary
- `process_status`: Processing Status
- `attributes`: Attributes (an object whose keys vary)
- `expires_at`: Delete After (datetime)
- `created_at`: Created At (datetime)
- `last_processed_at`: Last Processed At (datetime)

### `delete_library_document`

**Delete Library Document.** Permanently removes one document from a library (Beta) by library and document UUID; agents using the library stop finding it. Use Delete Library to remove the whole library. Not idempotent: a repeat call fails because the document is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `library_id` | string | yes |  | Library ID. The library UUID, from List Libraries or Create Library. |
| `document_id` | string | yes |  | Document ID. The document UUID, from List Library Documents or Upload Library Document. |

Output fields:

- `library_id`: Library ID
- `document_id`: Document ID
- `deleted`: Deleted (boolean)

### `get_document_status`

**Get Document Status.** Returns the processing status of one library document (Beta), e.g. todo, in_progress, done or error, with an is_done flag. Poll it after Upload Library Document or Reprocess Document; one call is a single check, not a wait. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `library_id` | string | yes |  | Library ID. The library UUID, from List Libraries or Create Library. |
| `document_id` | string | yes |  | Document ID. The document UUID, from List Library Documents or Upload Library Document. |

Output fields:

- `document_id`: Document ID
- `process_status`: Processing Status
- `is_done`: Done (boolean)
- `is_error`: Error (boolean)

### `get_document_text_content`

**Get Document Text Content.** Returns the text Mistral extracted from a processed library document (Beta), optionally limited to a page range. The document must have finished processing; check Get Document Status first. Use OCR instead for files that are not in a library. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `library_id` | string | yes |  | Library ID. The library UUID, from List Libraries or Create Library. |
| `document_id` | string | yes |  | Document ID. The document UUID, from List Library Documents or Upload Library Document. |
| `page_start` | number | no |  | First Page. |
| `page_end` | number | no |  | Last Page. |

Output fields:

- `document_id`: Document ID
- `text`: Text
- `length`: Length (number)

### `reprocess_document`

**Reprocess Document.** Queues a library document (Beta) to be processed again, re-extracting and re-indexing its text, for example after a processing error. It returns once queued; poll Get Document Status for the result. Not idempotent: each call starts a new processing run. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `library_id` | string | yes |  | Library ID. The library UUID, from List Libraries or Create Library. |
| `document_id` | string | yes |  | Document ID. The document UUID, from List Library Documents or Upload Library Document. |

Output fields:

- `library_id`: Library ID
- `document_id`: Document ID
- `reprocessing`: Reprocessing (boolean)

### `list_batch_jobs`

**List Batch Jobs.** Lists batch inference jobs with their UUIDs, status, endpoint, model and request counts, newest first, optionally filtered by status or model, one page at a time. Use it to find a job id for Get Batch Job or Cancel Batch Job. Read-only; safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no |  | Status. One of `"QUEUED"`, `"RUNNING"`, `"SUCCESS"`, `"FAILED"`, `"TIMEOUT_EXCEEDED"`, `"CANCELLATION_REQUESTED"`, `"CANCELLED"`. |
| `model` | string | no |  | Model. |
| `page` | number | no | `0` | Page. Zero-based page number. |
| `page_size` | number | no | `100` | Page Size. |

Output fields:

- `jobs`: Batch Jobs
- `jobs[].id`: Batch Job ID
- `jobs[].status`: Status
- `jobs[].endpoint`: Endpoint
- `jobs[].model`: Model
- `jobs[].agent_id`: Agent ID
- `jobs[].input_files`: Input File IDs
- `jobs[].output_file`: Output File ID
- `jobs[].error_file`: Error File ID
- `jobs[].total_requests`: Total Requests (number)
- `jobs[].completed_requests`: Completed Requests (number)
- `jobs[].succeeded_requests`: Succeeded Requests (number)
- `jobs[].failed_requests`: Failed Requests (number)
- `jobs[].errors`: Errors
- `jobs[].errors[].message`: Message
- `jobs[].errors[].count`: Count (number)
- `jobs[].metadata`: Metadata (an object whose keys vary)
- `jobs[].outputs`: Inline Outputs
- `jobs[].created_at`: Created At (datetime)
- `jobs[].started_at`: Started At (datetime)
- `jobs[].completed_at`: Completed At (datetime)
- `count`: Count (number)
- `total`: Total (number)

### `create_batch_job`

**Create Batch Job.** Starts an asynchronous batch inference job that runs many requests against one endpoint and model at reduced cost, and returns the job id and initial status (not the results). Give either uploaded .jsonl input file ids (Upload File with purpose batch) or inline requests. Poll Get Batch Job until the status is SUCCESS, then fetch the output file with Download File. Not idempotent: each call starts and bills a new job. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `endpoint` | string | yes | `"/v1/chat/completions"` | Endpoint. One of `"/v1/chat/completions"`, `"/v1/embeddings"`, `"/v1/fim/completions"`, `"/v1/moderations"`, `"/v1/chat/moderations"`, `"/v1/ocr"`, `"/v1/classifications"`, `"/v1/chat/classifications"`, `"/v1/conversations"`, `"/v1/audio/transcriptions"`. |
| `model` | string | no |  | Model. Model id to run every request with, e.g. mistral-small-latest. |
| `input_files` | array | no |  | Input File IDs. UUIDs of .jsonl files uploaded with purpose batch. Each line needs a custom_id and a body. |
| `requests` | JSON | no |  | Inline Requests. Instead of files, a JSON array of requests, each {"custom_id": "...", "body": {...}}. |
| `metadata` | JSON | no |  | Metadata. Optional JSON object stored with the job. |
| `timeout_hours` | number | no | `24` | Timeout (hours). |

Output fields:

- `id`: Batch Job ID
- `status`: Status
- `endpoint`: Endpoint
- `model`: Model
- `agent_id`: Agent ID
- `input_files`: Input File IDs
- `output_file`: Output File ID
- `error_file`: Error File ID
- `total_requests`: Total Requests (number)
- `completed_requests`: Completed Requests (number)
- `succeeded_requests`: Succeeded Requests (number)
- `failed_requests`: Failed Requests (number)
- `errors`: Errors
- `errors[].message`: Message
- `errors[].count`: Count (number)
- `metadata`: Metadata (an object whose keys vary)
- `outputs`: Inline Outputs
- `created_at`: Created At (datetime)
- `started_at`: Started At (datetime)
- `completed_at`: Completed At (datetime)

### `get_batch_job`

**Get Batch Job.** Returns one batch job’s current status and request counts, plus the output and error file ids once it finishes; this is a single check, so call it again until the status is SUCCESS, FAILED, TIMEOUT_EXCEEDED or CANCELLED. Download results with Download File using the output file id, or enable Inline Results for small jobs. Read-only; safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Batch Job ID. The batch job UUID, from Create Batch Job or List Batch Jobs. |
| `inline` | boolean | no | `false` | Inline Results. Include the results in the response instead of only an output file id. Only for small jobs. |

Output fields:

- `id`: Batch Job ID
- `status`: Status
- `endpoint`: Endpoint
- `model`: Model
- `agent_id`: Agent ID
- `input_files`: Input File IDs
- `output_file`: Output File ID
- `error_file`: Error File ID
- `total_requests`: Total Requests (number)
- `completed_requests`: Completed Requests (number)
- `succeeded_requests`: Succeeded Requests (number)
- `failed_requests`: Failed Requests (number)
- `errors`: Errors
- `errors[].message`: Message
- `errors[].count`: Count (number)
- `metadata`: Metadata (an object whose keys vary)
- `outputs`: Inline Outputs
- `created_at`: Created At (datetime)
- `started_at`: Started At (datetime)
- `completed_at`: Completed At (datetime)

### `cancel_batch_job`

**Cancel Batch Job.** Requests cancellation of a queued or running batch job and returns its updated status (usually CANCELLATION_REQUESTED, then CANCELLED); requests already completed stay billed and their results are kept. Get the job id from List Batch Jobs. Cancelling an already-cancelled job leaves it cancelled, so a retry is harmless. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Batch Job ID. The batch job UUID, from Create Batch Job or List Batch Jobs. |

Output fields:

- `id`: Batch Job ID
- `status`: Status
- `endpoint`: Endpoint
- `model`: Model
- `agent_id`: Agent ID
- `input_files`: Input File IDs
- `output_file`: Output File ID
- `error_file`: Error File ID
- `total_requests`: Total Requests (number)
- `completed_requests`: Completed Requests (number)
- `succeeded_requests`: Succeeded Requests (number)
- `failed_requests`: Failed Requests (number)
- `errors`: Errors
- `errors[].message`: Message
- `errors[].count`: Count (number)
- `metadata`: Metadata (an object whose keys vary)
- `outputs`: Inline Outputs
- `created_at`: Created At (datetime)
- `started_at`: Started At (datetime)
- `completed_at`: Completed At (datetime)

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

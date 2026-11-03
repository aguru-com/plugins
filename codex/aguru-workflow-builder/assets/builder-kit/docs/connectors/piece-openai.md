# OpenAI

Chat, images, audio and embeddings from OpenAI models.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-openai'
  version: '0.13.2'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
>
> 1. Go to https://platform.openai.com/api-keys
> 2. Click **Create new secret key** and copy it.
>
> Add credit to your OpenAI account first, or every request fails with a 429 quota error.

## Actions

### `ask_chatgpt`

**Ask ChatGPT.** Sends a prompt to an OpenAI chat model and returns the reply text, with sampling controls (temperature, top P, frequency and presence penalties) and an optional roles array that supplies the system message. Two modes: stateless by default, or, when a memory key is set, loading and re-saving the conversation history in project storage so later runs continue the same thread, trimming it as it approaches the token limit. This is the general-purpose text call of this piece; prefer ask_assistant to route through a pre-built OpenAI Assistant, vision_prompt when an image is part of the question, and extract-structured-data when the answer must come back as named fields. A model, a question, and a maximum token count are required; not idempotent: each call produces a fresh completion and, with a memory key, rewrites the stored history. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"gpt-3.5-turbo"` | Model. The OpenAI model that writes the reply. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Question. What you want the model to answer or do. |
| `maxTokens` | number | yes | `2048` | Maximum Tokens. Longest reply in tokens, about 4 characters each. |
| `memoryKey` | string | no |  | Conversation Memory ID. Runs that share this ID continue one conversation. Empty: no memory. |
| `temperature` | number | no | `1` | Temperature. From 0 to 2. Lower is more focused, higher is more varied. |
| `topP` | number | no | `1` | Top P. From 0 to 1. Adjust this or Temperature, not both. |
| `frequencyPenalty` | number | no | `0` | Frequency Penalty. From -2 to 2. Higher values make the model repeat itself less. |
| `presencePenalty` | number | no |  | Presence Penalty. From -2 to 2. Higher values push the model toward new topics. |
| `roles` | JSON | no | `[{"role":"system","content":"You are a helpful assistant."}]` | Roles. Messages sent before the question, such as a system instruction. |

### `ask_assistant`

**Ask Assistant (Deprecated).** Sends a question to a GPT Assistant that already exists in the connected OpenAI account, selected from the assistant dropdown, and waits for the Assistants run to finish before returning the assistant messages produced after that question. Two modes: with a memory key it reuses one stored thread across runs and flows so the assistant remembers earlier turns, without one it opens a throwaway thread each time. Prefer ask_chatgpt when there is no saved Assistant or when the model and sampling parameters must be chosen per call. Requires an assistant already configured on the OpenAI side; not idempotent: each call creates a thread message and a new run. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `assistant` | string | yes |  | Assistant. An assistant from your OpenAI account. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Question. What you want the assistant to answer or do. |
| `memoryKey` | string | no |  | Conversation Memory ID. Runs that share this ID continue one conversation. Empty: no memory. |

Output fields:

- `[].id`: Message ID
- `[].role`: Role
- `[].created_at`: Created At (Unix Seconds)
- `[].assistant_id`: Assistant ID
- `[].thread_id`: Thread ID
- `[].run_id`: Run ID
- `[].content`: Content
- `[].content[].type`: Type
- `[].content[].text`: Text
- `[].content[].text.value`: Value

### `vision_prompt`

**Vision Prompt.** Answers a question about an image by sending the uploaded picture inline with the prompt to gpt-4o, covering captioning, reading text off an image, and visual question answering. It is the only action here that accepts image input, so pick it over ask_chatgpt whenever a picture is part of the question, and generate_image or edit_image when the goal is producing an image instead. The model is fixed at gpt-4o and the image is embedded as base64 in the request, so keep it small; a detail setting trades cost against fidelity. Not idempotent: each call produces a fresh completion. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `image` | file | yes |  | Image. The picture to ask about. Files are not supported; an action that needs one fails. |
| `prompt` | string | yes |  | Question. What you want to know about the image. |
| `maxTokens` | number | no | `2048` | Maximum Tokens. Longest reply in tokens, about 4 characters each. |
| `detail` | string | no | `"auto"` | Detail. Low is faster and cheaper. High reads small details better. A value the product loads from the provider, such as an id; write the value itself. |
| `temperature` | number | no | `0.9` | Temperature. From 0 to 2. Lower is more focused, higher is more varied. |
| `topP` | number | no | `1` | Top P. From 0 to 1. Adjust this or Temperature, not both. |
| `frequencyPenalty` | number | no | `0` | Frequency Penalty. From -2 to 2. Higher values make the model repeat itself less. |
| `presencePenalty` | number | no | `0.6` | Presence Penalty. From -2 to 2. Higher values push the model toward new topics. |
| `roles` | JSON | no | `[{"role":"system","content":"You are a helpful assistant."}]` | Roles. Messages sent before the question, such as a system instruction. |

### `extract-structured-data`

**Extract Structured Data.** Pulls a caller-defined set of named fields out of one block of unstructured text and returns them as a flat object, with each field declared as text, number, or boolean and optionally marked to fail the step when it is absent. Use it to turn prose, emails, or documents into machine-readable values; prefer analyze_sentiment or classify_text for a judgement about the text and ask_chatgpt for free-form output. Requires the text plus at least one field definition, and the step errors when the model returns no extraction at all. Not idempotent: each call is a fresh model completion and the extracted values can vary between runs. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"gpt-3.5-turbo"` | Model. The OpenAI model that reads the text. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text. The text to pull the fields from. |
| `params` | array | yes |  | Fields. One row per value you want back. Each item: { `propName`, `propDescription`?, `propDataType`, `propIsRequired` }. |

### `classify_text`

**Moderate Text.** Runs the OpenAI moderation endpoint over a block of text and reports whether it breaches OpenAI safety policy, returning one flagged boolean plus per-category verdicts and scores for harassment, hate, self-harm, sexual, and violence. Use it to gate or filter user-generated content; it only scores that fixed safety taxonomy, so use analyze_sentiment for tone and extract-structured-data or ask_chatgpt to sort text into custom labels. Requires the input text and a moderation model. Read-only scoring call with no stored side effect, so repeating the same input is idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"omni-moderation-latest"` | Model. Moderation model. The default suits most uses. One of `"omni-moderation-latest"`, `"text-moderation-latest"`, `"text-moderation-stable"`. |
| `input` | string | yes |  | Text. The text to check. |

Output fields:

- `flagged`: Flagged (boolean)
- `categories`: Categories (an object whose keys vary)
- `category_scores`: Category Scores (an object whose keys vary)
- `model`: Model
- `id`: Moderation ID

### `analyze_sentiment`

**Analyze Text Sentiment.** Judges the emotional tone of a block of text with a chat model at temperature 0, returning a positive, negative, or neutral label plus a confidence score and a short explanation. Pick it for tone or satisfaction scoring; classify_text is the one that checks text against OpenAI safety policies, and extract-structured-data is the one that pulls arbitrary named fields or custom labels out of prose. Requires the text and a chat model; not idempotent: each call is a fresh model completion and the label can shift between runs. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"gpt-4o-mini"` | Model. The model that judges the sentiment. One of `"gpt-4o-mini"`, `"gpt-4o"`, `"gpt-4.1-mini"`, `"gpt-4.1"`, `"gpt-3.5-turbo"`. |
| `text` | string | yes |  | Text. A message, review or any other text. |

Output fields:

- `sentiment`: Sentiment
- `confidence`: Confidence (number)
- `explanation`: Explanation

### `create_embedding`

**Create Embedding.** Converts one block of text into a numeric embedding vector for storage in a vector database or for semantic search, clustering, and RAG pipelines. It handles a single input per call, so batch by looping or by using the custom API call action, and the dimensions option only takes effect on the text-embedding-3 models. Pick search_embeddings instead when the goal is simply ranking a list of candidate strings against a query in one step with no vector persisted. Deterministic stateless inference, so repeat calls with the same model and text return the same vector and are idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"text-embedding-3-small"` | Model. Embedding model. The default suits most uses. One of `"text-embedding-3-small"`, `"text-embedding-3-large"`, `"text-embedding-ada-002"`. |
| `input` | string | yes |  | Text. The text to turn into a vector. |
| `dimensions` | number | no |  | Vector Dimensions. Vector length. Works only with text-embedding-3 models. |
| `user` | string | no |  | User ID. Your own ID for the end user. Helps OpenAI spot abuse. |

Output fields:

- `model`: Model
- `embedding`: Embedding
- `usage`: Usage
- `usage.prompt_tokens`: Prompt Tokens (number)
- `usage.total_tokens`: Total Tokens (number)

### `search_embeddings`

**Search Embeddings.** Embeds a query and a list of document strings passed inline in the same call, then ranks those documents against the query by cosine similarity and returns the best match plus the scored ranking; setting Top K keeps only the leading matches, leaving it empty returns every document ranked. It is self-contained with no vector store, so the documents must be supplied on every run - use create_embedding with an external vector database when the corpus is large or must persist. Requires the query, the document list, and one embedding model used for both sides. Read-only and idempotent: the same inputs produce the same ranking. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"text-embedding-3-small"` | Model. Embedding model used for the query and the documents. One of `"text-embedding-3-small"`, `"text-embedding-3-large"`, `"text-embedding-ada-002"`. |
| `query` | string | yes |  | Query. The text to match the documents against. |
| `documents` | array | yes |  | Documents. The texts to rank. |
| `topK` | number | no |  | Max Results. Empty: every document, best match first. |

Output fields:

- `bestMatch`: Best Match
- `bestMatch.document`: Document
- `bestMatch.index`: Index (number)
- `bestMatch.score`: Score (number)
- `results`: Results
- `results[].document`: Document
- `results[].index`: Index (number)
- `results[].score`: Score (number)
- `usage`: Usage
- `usage.total_tokens`: Total Tokens (number)

### `generate_image`

**Generate Image.** Creates a brand new image from a text prompt using an image model available to the account (gpt-image or dall-e), saving each returned image as a file and reporting its URL. Resolution and quality both default to auto. Pick edit_image instead when an existing image is the starting point, and vision_prompt when the task is reading an image rather than producing one. Requires the prompt and a model id; not idempotent: each call renders a fresh image. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `model` | string | yes | `"gpt-image-2"` | Model. The OpenAI model that draws the image. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Prompt. Describe the image you want. |
| `resolution` | string | no | `"auto"` | Size. Image shape. Auto lets the model choose. One of `"auto"`, `"1024x1024"`, `"1536x1024"`, `"1024x1536"`. |
| `quality` | string | no | `"auto"` | Quality. Higher quality takes longer and costs more. One of `"auto"`, `"low"`, `"medium"`, `"high"`. |

Output fields:

- `created`: Created At (Unix Seconds)
- `background`: Background
- `output_format`: Output Format
- `quality`: Quality
- `size`: Size
- `usage`: Usage
- `usage.input_tokens`: Input Tokens (number)
- `usage.output_tokens`: Output Tokens (number)
- `usage.total_tokens`: Total Tokens (number)
- `images`: Images
- `images[].url`: Image URL (image)
- `images[].fileName`: File Name
- `images[].revised_prompt`: Revised Prompt

### `edit_image`

**Edit Image.** Modifies an existing image supplied as a file, applying the changes described in a text prompt with the gpt-image-2 model, and writes the result out as a new PNG file. An optional mask image confines the edit to its transparent areas and must match the dimensions of the input image; size and quality can be left on auto. Pick generate_image instead when there is no source image to start from, and vision_prompt when the image only needs to be read rather than changed. Not idempotent: each call renders a fresh image. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `image` | file | yes |  | Image. PNG, JPEG or WebP image to edit. Files are not supported; an action that needs one fails. |
| `prompt` | string | yes |  | Prompt. Describe the change you want. |
| `size` | string | no | `"auto"` | Size. Image shape. Auto lets the model choose. One of `"auto"`, `"1024x1024"`, `"1536x1024"`, `"1024x1536"`. |
| `quality` | string | no | `"auto"` | Quality. Higher quality takes longer and costs more. One of `"auto"`, `"low"`, `"medium"`, `"high"`. |
| `mask` | file | no |  | Mask. Transparent areas mark where to edit. Same size as the image. Files are not supported; an action that needs one fails. |

Output fields:

- `created`: Created At (Unix Seconds)
- `background`: Background
- `output_format`: Output Format
- `quality`: Quality
- `size`: Size
- `usage`: Usage
- `usage.input_tokens`: Input Tokens (number)
- `usage.output_tokens`: Output Tokens (number)
- `usage.total_tokens`: Total Tokens (number)
- `images`: Images
- `images[].url`: Image URL (image)
- `images[].fileName`: File Name

### `text_to_speech`

**Text-to-Speech.** Synthesizes spoken audio from text using an OpenAI TTS model and one of six prebuilt voices (alloy, echo, fable, onyx, nova, shimmer), writing the result as an mp3, opus, aac, or flac file at a playback speed between 0.25 and 4. This is the text-to-audio direction of this piece; transcribe and translate go the other way, turning audio into text. Requires the text, a TTS-capable model, a voice, and an output format. Not idempotent: each call renders a new audio file. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. What the voice should say. |
| `model` | string | yes | `"tts-1"` | Model. The OpenAI model that speaks the text. A value the product loads from the provider, such as an id; write the value itself. |
| `voice` | string | yes | `"alloy"` | Voice. The voice that reads the text. One of `"alloy"`, `"echo"`, `"fable"`, `"onyx"`, `"nova"`, `"shimmer"`. |
| `format` | string | yes | `"mp3"` | Audio Format. The audio file type. One of `"mp3"`, `"opus"`, `"aac"`, `"flac"`. |
| `speed` | number | no | `1` | Speed. From 0.25 to 4. 1 is normal speed. |
| `fileName` | string | no | `"audio"` | File Name. Name for the audio file, without the extension. |

### `transcribe`

**Transcribe Audio.** Transcribes an uploaded audio file to text with the whisper-1 model, keeping the words in the language that was spoken, with an optional language hint (defaulting to English, and silently falling back to English when an unsupported code is given) that improves accuracy. Choose the sibling translate action instead whenever the output must be English no matter what language was spoken, and text_to_speech for the opposite direction. Requires an audio file; not idempotent: each call re-runs the model and the wording can vary slightly. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audio` | file | yes |  | Audio. The recording to transcribe. Files are not supported; an action that needs one fails. |
| `language` | string | no | `"en"` | Language. The language spoken in the recording. One of `"af"`, `"ar"`, `"hy"`, `"az"`, `"be"`, `"bs"`, `"bg"`, `"ca"`, `"zh"`, `"hr"`, `"cs"`, `"da"`, `"nl"`, `"en"`, `"et"`, `"fi"`, `"fr"`, `"gl"`, `"de"`, `"el"`, `"he"`, `"hi"`, `"hu"`, `"is"`, `"id"` and 32 more. |

Output fields:

- `text`: Text
- `usage`: Usage
- `usage.type`: Type
- `usage.seconds`: Seconds (number)

### `translate`

**Translate Audio.** Turns an uploaded audio file into English text with the whisper-1 model, translating from whatever language was spoken; there is no target-language option, the output is always English. Pick the sibling transcribe action when the transcript must stay in the original language, and note this handles audio input only - it cannot translate a text string. Requires an audio file; not idempotent: each call re-runs the model and the wording can vary slightly. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audio` | file | yes |  | Audio. The recording to translate. Files are not supported; an action that needs one fails. |

Output fields:

- `text`: Text

### `upload_file`

**Upload File.** Uploads a file to the connected OpenAI account and returns its file id for later use with Assistants, vector stores, batch jobs, fine-tuning, or vision. The purpose is required and decides which file types are accepted; the original filename is kept unless an override including the extension is supplied. Run find_file first to avoid duplicates, and delete_file to remove one afterwards. Not idempotent: every call stores another copy under a new file id, even for identical content. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The file to send to OpenAI. Files are not supported; an action that needs one fails. |
| `purpose` | string | yes | `"assistants"` | Purpose. What OpenAI will use the file for. Each allows different file types. One of `"assistants"`, `"vision"`, `"batch"`, `"fine-tune"`. |
| `fileName` | string | no |  | File Name. Empty: keeps the original name. Include the extension. |

Output fields:

- `id`: File ID
- `filename`: Filename
- `bytes`: Size (filesize)
- `purpose`: Purpose
- `status`: Status
- `status_details`: Status Details
- `created_at`: Created At (Unix Seconds)
- `expires_at`: Expires At (Unix Seconds)

### `list_files`

**List Files.** Returns the files stored in the connected OpenAI account together with their ids, names, sizes, and purposes, either the whole account or, when a purpose filter is supplied, only assistants, vision, batch, or fine-tune files, capped by an optional limit. Use it to browse or audit what has been uploaded and to collect file ids; find_file is the better choice when checking for one exact filename. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `purpose` | string | no |  | Purpose. Only include files with this purpose. One of `"assistants"`, `"vision"`, `"batch"`, `"fine-tune"`. |
| `limit` | number | no | `100` | Max Results. Up to this many files, from 1 to 10,000. |

Output fields:

- `files`: Files
- `files[].id`: File ID
- `files[].filename`: Filename
- `files[].bytes`: Size (filesize)
- `files[].purpose`: Purpose
- `files[].status`: Status
- `files[].status_details`: Status Details
- `files[].created_at`: Created At (Unix Seconds)
- `files[].expires_at`: Expires At (Unix Seconds)
- `count`: Count (number)

### `find_file`

**Find File.** Checks whether a file with an exact filename, matched case-insensitively, already exists in the connected OpenAI account and returns a found flag, a match count, and the matching file records including their ids. Use it before upload_file to avoid duplicates, or to resolve a filename into the file id that delete_file needs; list_files is the one for browsing everything on the account. An optional purpose filter narrows the search to assistants, vision, batch, or fine-tune files. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileName` | string | yes |  | File Name. Exact file name, including the extension. Case does not matter. |
| `purpose` | string | no |  | Purpose. Only include files with this purpose. One of `"assistants"`, `"vision"`, `"batch"`, `"fine-tune"`. |

Output fields:

- `found`: Found (boolean)
- `count`: Match Count (number)
- `file`: File
- `file.id`: File ID
- `file.filename`: Filename
- `file.bytes`: Size (filesize)
- `file.purpose`: Purpose
- `file.status`: Status
- `file.status_details`: Status Details
- `file.created_at`: Created At (Unix Seconds)
- `file.expires_at`: Expires At (Unix Seconds)
- `files`: Files
- `files[].id`: File ID
- `files[].filename`: Filename
- `files[].bytes`: Size (filesize)
- `files[].purpose`: Purpose
- `files[].status`: Status
- `files[].status_details`: Status Details
- `files[].created_at`: Created At (Unix Seconds)
- `files[].expires_at`: Expires At (Unix Seconds)

### `delete_file`

**Delete File.** Permanently removes one file from the connected OpenAI account, identified by the OpenAI file id returned by upload_file (it starts with file-). Use it to clean up assistant, vision, batch, or fine-tune uploads that are no longer needed; find_file resolves a filename to that id first. Deleting converges on the same end state so it counts as idempotent, but a repeat call for an id that is already gone fails with a not-found error. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileId` | string | yes |  | File ID. Starts with file-. Upload, List and Find File return it. |

Output fields:

- `id`: File ID
- `deleted`: Deleted (boolean)

### `list_models`

**List Models.** Returns the model ids the connected API key can use, each with its creation timestamp and owner: the full catalog when no filter is given, or only the ids containing a case-insensitive substring such as gpt-4, embedding, or whisper when one is. Use it to confirm a model id exists on this account before passing it to ask_chatgpt, create_embedding, generate_image, or text_to_speech. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contains` | string | no |  | Name Contains. Only return models whose name includes this text. |

Output fields:

- `count`: Count (number)
- `models`: Models
- `models[].id`: Model ID
- `models[].created`: Created (Unix Seconds)
- `models[].owned_by`: Owned By

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

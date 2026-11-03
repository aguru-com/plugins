# Google Gemini

Generate text, images, video and speech with Google Gemini.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-google-gemini'
  version: '0.5.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API key:
> 1. Open [Google AI Studio](https://aistudio.google.com/app/apikey).
> 2. Click **Create API key** and copy the key.
>
> This piece uses Gemini's beta API, which Google may change at any time.

## Actions

### `generate_content`

**Generate Content.** Runs a single stateless prompt through a Gemini text model and returns the generated text, optionally grounded by one built-in tool: Google Search for live web results, URL Context to fetch pages named in the prompt, Google Maps scoped to a latitude/longitude, or File Search over an uploaded file. Use this as the default Gemini text-generation call; prefer chat_gemini when the exchange needs conversation memory, generate_content_from_image when the input includes an image, and create_video or text-to-speech for non-text output. Not idempotent: each call produces a fresh completion, and the File Search mode additionally creates a new file search store. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. What you want Gemini to write or answer. |
| `model` | string | yes | `"gemini-1.5-flash"` | Model. Gemini model that writes the response. A value the product loads from the provider, such as an id; write the value itself. |
| `toolType` | string | no |  | Built-in Tool. Lets Gemini search Google, read links, use Maps or search a file. One of `"google-search"`, `"file-search"`, `"google-maps"`, `"url-context"`. |
| `toolProperties` | object | no |  | Tool Settings. An object whose fields depend on other inputs; the product shows them. |

### `generate_content_with_filesearch`

**Generate Content with File Search.** Uploads one file to a newly created Gemini File Search store, waits for indexing to finish, then answers the prompt grounded on that document. Use it for one-shot question answering over a document supplied at run time; prefer generate_content when no file grounding is needed or when a different built-in tool such as Google Search or URL Context fits better. Both a file and a store display name are required. Not idempotent: every call creates another file search store and a fresh completion. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. Question or instruction Gemini answers from the file. |
| `model` | string | yes | `"gemini-1.5-flash"` | Model. Gemini model that writes the response. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. File Gemini searches to answer the prompt. Files are not supported; an action that needs one fails. |
| `fileStoreName` | string | yes |  | File Store Name. Name for the search store this step creates on each run. |

### `generate_content_from_image`

**Generate Content from Image.** Sends an image together with a prompt to a vision-capable Gemini model and returns the generated text describing or answering questions about that image, covering captioning, text extraction, and visual question answering. This is the only Gemini action here that accepts image input, so pick it over generate_content whenever a picture is part of the question; the image is required and is sent inline, so keep it small. Not idempotent: each call produces a fresh completion. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. What you want to know about the image. |
| `image` | file | yes |  | Image. The image Gemini looks at. Files are not supported; an action that needs one fails. |
| `model` | string | yes | `"gemini-1.5-flash"` | Model. Gemini model that writes the response. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `text`: Generated Text
- `raw.modelVersion`: Model Version
- `raw.candidates[0].finishReason`: Finish Reason
- `raw.candidates`: Candidates
- `raw.candidates[].content.parts[0].text`: Text
- `raw.candidates[].content.role`: Role
- `raw.candidates[].finishReason`: Finish Reason
- `raw.usageMetadata`: Usage Metadata
- `raw.usageMetadata.promptTokenCount`: Prompt Tokens (number)
- `raw.usageMetadata.candidatesTokenCount`: Candidates Tokens (number)
- `raw.usageMetadata.totalTokenCount`: Total Tokens (number)
- `raw.usageMetadata.serviceTier`: Service Tier

### `chat_gemini`

**Chat with Gemini.** Sends a prompt as one turn of a Gemini chat and returns the reply, with two modes: supply a memory key (max 128 characters) to load and persist the conversation history in project storage so later runs remember earlier turns, or leave it empty for a stateless single turn. Pick it over generate_content when the exchange spans multiple runs and must retain context; generate_content is the better choice for one-shot generation or when a built-in tool such as Google Search or File Search is needed. Not idempotent: each call produces a new reply and, when a memory key is set, rewrites the stored history. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. Your next message in the conversation. |
| `model` | string | yes | `"gemini-1.5-flash"` | Model. Gemini model that writes the response. A value the product loads from the provider, such as an id; write the value itself. |
| `memoryKey` | string | no |  | Memory Key. Reuse a key to continue its conversation. Empty: no memory. |

Output fields:

- `response`: Response
- `history`: Conversation History
- `history[].role`: Role
- `history[].parts[0].text`: Text

### `text-to-speech`

**Text to Speech.** Synthesizes spoken audio from input text using a Gemini TTS model and one of roughly thirty prebuilt named voices, returning a WAV file. This is the audio-output sibling of generate_content: use it when the flow needs speech instead of text, and create_video when it needs video. Requires a TTS-capable model, which the model dropdown restricts to. Not idempotent: each call renders a new audio file. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The words Gemini reads aloud. |
| `model` | string | yes |  | Model. Gemini speech model that reads the text aloud. A value the product loads from the provider, such as an id; write the value itself. |
| `voice` | string | yes |  | Voice. One of `"Zephyr"`, `"Puck"`, `"Charon"`, `"Kore"`, `"Fenrir"`, `"Leda"`, `"Orus"`, `"Aoede"`, `"Callirrhoe"`, `"Autonoe"`, `"Enceladus"`, `"Iapetus"`, `"Umbriel"`, `"Algieba"`, `"Despina"`, `"Erinome"`, `"Algenib"`, `"Rasalgethi"`, `"Laomedeia"`, `"Achernar"`, `"Alnilam"`, `"Schedar"`, `"Gacrux"`, `"Pulcherrima"`, `"Achird"` and 5 more. |

### `create_video`

**Create Video.** Generates a short video with a Google Veo model from a text prompt, optionally seeded by a start image (image-to-video) or by both a start and end image (interpolation between those frames), polling the long-running generation job for up to 10 minutes before returning the finished MP4 as a file. Use it whenever the required output is video; text goes through generate_content and speech through text-to-speech. Note the model-dependent limits: 1080p needs Veo 3.0 or newer, 4K needs Veo 3.1, and both require an 8-second duration. Not idempotent: each call renders a new video. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. Describe the scene, motion, style and lighting you want. |
| `model` | string | yes | `"veo-3.1-generate-preview"` | Model. Veo model that creates the video. A value the product loads from the provider, such as an id; write the value itself. |
| `aspectRatio` | string | yes | `"16:9"` | Aspect Ratio. One of `"16:9"`, `"9:16"`. |
| `durationSeconds` | string | no | `8` | Duration. Video length in seconds. 1080p and 4K need 8 seconds. A value the product loads from the provider, such as an id; write the value itself. |
| `resolution` | string | no | `"720p"` | Resolution. 4K needs Veo 3.1. 1080p and 4K need an 8-second video. A value the product loads from the provider, such as an id; write the value itself. |
| `image` | file | no |  | Start Image. Image to use as the first frame of the video. Files are not supported; an action that needs one fails. |
| `lastFrame` | file | no |  | End Image. Image to use as the last frame. Needs a Start Image. Files are not supported; an action that needs one fails. |
| `personGeneration` | string | no | `"allow_adult"` | People in Video. Whether people can appear in the video. One of `"allow_adult"`, `"allow_all"`, `"dont_allow"`. |

### `generate_image`

**Generate Image.** Generates an image from a text prompt using a Gemini image-generation model (e.g. Nano Banana) and returns it as a downloadable file. Use this for text-to-image; generate_content_from_image goes the other direction (image in, text out), and create_video is for motion output. Not idempotent: each call renders a new image. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. Describe the image you want to generate. |
| `model` | string | yes |  | Model. Gemini image model that creates the picture. A value the product loads from the provider, such as an id; write the value itself. |
| `aspectRatio` | string | no | `"1:1"` | Aspect Ratio. One of `"1:1"`, `"2:3"`, `"3:2"`, `"3:4"`, `"4:3"`, `"9:16"`, `"16:9"`, `"21:9"`. |
| `imageSize` | string | no | `"1K"` | Image Size. One of `"1K"`, `"2K"`, `"4K"`. |

### `list_models`

**List Models.** Lists every Gemini/Veo model available to this API key, with its token limits and supported generation methods. Use this to discover valid model names before calling generate_content, generate_image, create_video, or generate_embeddings, or to check a model's input/output token limits. Safe to retry: read-only. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `[].name`: Model Name
- `[].displayName`: Display Name
- `[].description`: Description
- `[].version`: Version
- `[].inputTokenLimit`: Input Token Limit (number)
- `[].outputTokenLimit`: Output Token Limit (number)
- `[].supportedGenerationMethods`: Supported Methods

### `generate_embeddings`

**Generate Embeddings.** Converts input text into a numerical embedding vector for semantic search, similarity comparison, clustering, or classification. Set Task Type to the intended use (e.g. retrieval_document when indexing content, retrieval_query when searching it) for a better-tuned vector. Idempotent: the same text and settings always produce the same vector. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The text to generate an embedding for. |
| `model` | string | yes | `"gemini-embedding-001"` | Model. Embedding model that turns the text into numbers. A value the product loads from the provider, such as an id; write the value itself. |
| `taskType` | string | no |  | Task Type. Tunes the embedding for how it will be used. One of `"RETRIEVAL_QUERY"`, `"RETRIEVAL_DOCUMENT"`, `"SEMANTIC_SIMILARITY"`, `"CLASSIFICATION"`, `"CLUSTERING"`, `"QUESTION_ANSWERING"`. |
| `title` | string | no |  | Document Title. Only used when Task Type is Retrieval Document. |
| `outputDimensionality` | number | no |  | Vector Dimensions. Shorten the vector to this many numbers. Empty: full length. |

Output fields:

- `embedding`: Embedding Vector
- `dimensions`: Dimensions (number)

### `count_tokens`

**Count Tokens.** Counts the tokens a piece of text will consume for a given Gemini model, without generating any content. Use it before generate_content or chat_gemini to check a prompt fits the model's input limit or to estimate cost. Idempotent: same text and model always return the same count. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The text to count tokens for. |
| `model` | string | yes | `"gemini-1.5-flash"` | Model. Each model counts tokens differently. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `totalTokens`: Total Tokens (number)
- `cachedContentTokenCount`: Cached Content Token Count (number)

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

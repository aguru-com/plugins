# Eden AI

Eden AI is a platform that provides a range of AI services, including text generation, summarization, translation, and more.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-eden-ai'
  version: '0.2.5'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Eden AI API Key

> You can obtain your API key from your [Eden AI dashboard](https://app.edenai.run/admin/api-settings/features-preferences).

## Actions

### `generate_text`

**Generate Text.** Generate a chat/LLM completion from a prompt through Eden AI, routing to a chosen provider (OpenAI, Anthropic, Google, Meta, Mistral, and others) with optional system prompt, model override, temperature, and fallback providers. Choose it for one-shot text generation when you want provider flexibility behind a single call rather than calling a specific LLM piece directly. Requires a provider and prompt; optionally pass an image URL for vision-capable models. Generative and non-deterministic, but stateless — repeating the call creates no extra side effect. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provider` | string | yes |  | Provider. The AI provider to use for text generation. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Prompt. The main prompt or question you want the AI to respond to. |
| `system_prompt` | string | no |  | System Prompt. System message to set the behavior and context for the AI assistant (e.g., "You are a helpful coding assistant"). |
| `model` | string | no |  | Model. Specific model to use (e.g., gpt-4o, claude-3-sonnet-latest, gemini-2.0-flash). Leave empty for provider-specific defaults. |
| `temperature` | number | no | `0.7` | Temperature. Controls randomness (0.0-2.0). Higher values make output more creative. |
| `max_completion_tokens` | number | no | `1000` | Max Completion Tokens. Maximum number of tokens to generate in the response. |
| `reasoning_effort` | string | no |  | Reasoning Effort. Level of reasoning depth for the response. A value the product loads from the provider, such as an id; write the value itself. |
| `fallback_providers` | array | no |  | Fallback Providers. Alternative providers to try if the main provider fails. Values the product loads from the provider, such as ids; write an array of them. |
| `include_image` | boolean | no | `false` | Include Image. Include an image in your prompt (for vision-capable models). |
| `image_url` | string | no |  | Image URL. URL of the image to include in the prompt (only used if "Include Image" is enabled). |

### `summarize_text`

**Summarize Text.** Summarize a block of text into a configurable number of sentences via Eden AI, routed to a chosen provider. Use it to condense articles, documents, or other long-form text. Requires a provider and the text; language defaults to auto-detection. Read-only analysis that produces no persistent resource, so it is safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provider` | string | yes |  | Provider. The AI provider to use for text summarization. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text to Summarize. The text content you want to summarize. Can be articles, documents, or any long-form text. |
| `output_sentences` | number | no | `3` | Number of Summary Sentences. How many sentences should the summary contain (1-20). |
| `language` | string | no | `"auto-detect"` | Text Language. The language of the input text. Choose "Auto Detection" if unsure. A value the product loads from the provider, such as an id; write the value itself. |
| `model` | string | no |  | Specific Model. Specific model to use (e.g., gpt-4, gpt-4o, summarize-xlarge). Leave empty for default. |
| `fallback_providers` | array | no |  | Fallback Providers. Alternative providers to try if the main provider fails (up to 5). Values the product loads from the provider, such as ids; write an array of them. |
| `show_original_response` | boolean | no | `false` | Include Original Response. Include the raw provider response in the output for debugging. |

### `extract_keywords`

**Extract Keywords in Text.** Extract important keywords and their relative importance from a text via Eden AI, routed to a chosen provider. Use it to surface the salient terms of a passage for tagging, indexing, or downstream analysis. Requires a provider and the text; language defaults to auto-detection. Read-only analysis with no side effect, so it is safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provider` | string | yes |  | Provider. The AI provider to use for keyword extraction. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text to Analyze. The text to extract keywords from. |
| `language` | string | no | `"auto-detect"` | Text Language. The language of the input text. Choose "Auto Detection" if unsure. A value the product loads from the provider, such as an id; write the value itself. |
| `model` | string | no |  | Specific Model. Specific model to use (e.g., gpt-4o, gpt-4, grok-2-latest). Leave empty for default. |
| `fallback_providers` | array | no |  | Fallback Providers. Alternative providers to try if the main provider fails (up to 5). Values the product loads from the provider, such as ids; write an array of them. |
| `show_original_response` | boolean | no | `false` | Include Original Response. Include the raw provider response in the output for debugging. |

### `detect_language`

**Detect Language of Text.** Detect the language(s) of a text with confidence scores via Eden AI, routed to a chosen provider. Use it to identify the language of incoming text before branching, translating, or routing. Requires a provider and the text. Read-only analysis with no side effect, so it is safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provider` | string | yes |  | Provider. The AI provider to use for language detection. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text to Analyze. The text to detect language for. |
| `model` | string | no |  | Specific Model. Specific model to use (e.g., gpt-4o, grok-2-latest). Leave empty for default. |
| `fallback_providers` | array | no |  | Fallback Providers. Alternative providers to try if the main provider fails (up to 5). Values the product loads from the provider, such as ids; write an array of them. |
| `show_original_response` | boolean | no | `false` | Include Original Response. Include the raw provider response in the output for debugging. |

### `extract_entities`

**Extract Named Entities in Text.** Run named-entity recognition over a text via Eden AI, routed to a chosen provider, returning detected entities with their category and importance. Use it to pull out people, places, organizations, and similar named items from a passage. Requires a provider and the text; language defaults to auto-detection. Read-only analysis with no side effect, so it is safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provider` | string | yes |  | Provider. The AI provider to use for named entity recognition. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text to Analyze. The text to extract entities from. |
| `language` | string | no | `"auto-detect"` | Text Language. The language of the input text. Choose "Auto Detection" if unsure. A value the product loads from the provider, such as an id; write the value itself. |
| `model` | string | no |  | Specific Model. Specific model to use (e.g., gpt-4o, gemini-1.5-flash, grok-2-latest). Leave empty for default. |
| `fallback_providers` | array | no |  | Fallback Providers. Alternative providers to try if the main provider fails (up to 5). Values the product loads from the provider, such as ids; write an array of them. |
| `show_original_response` | boolean | no | `false` | Include Original Response. Include the raw provider response in the output for debugging. |

### `moderate_text`

**Moderate Text.** Moderate a text for explicit or policy-violating content via Eden AI, routed to a chosen provider, returning an NSFW likelihood plus per-category labels. Use it to screen user-generated or untrusted text before publishing or acting on it. Requires a provider and the text; language defaults to auto-detection. Read-only analysis with no side effect, so it is safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provider` | string | yes |  | Provider. The AI provider to use for text moderation. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text to Moderate. The text to analyze for explicit or policy-violating content. |
| `language` | string | no | `"auto-detect"` | Text Language. The language of the input text. Choose "Auto Detection" if unsure. A value the product loads from the provider, such as an id; write the value itself. |
| `model` | string | no |  | Specific Model. Specific model to use (e.g., text-moderation-latest, text-moderation-stable). Leave empty for default. |
| `fallback_providers` | array | no |  | Fallback Providers. Alternative providers to try if the main provider fails (up to 5). Values the product loads from the provider, such as ids; write an array of them. |
| `show_original_response` | boolean | no | `false` | Include Original Response. Include the raw provider response in the output for debugging. |

### `spell_check`

**Spell Check.** Spell- and grammar-check a text via Eden AI, routed to a chosen provider, returning detected errors with their offsets and suggested corrections. Use it to find and propose fixes for spelling/grammar issues in a passage. Requires a provider and the text; language defaults to auto-detection. Read-only analysis with no side effect, so it is safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provider` | string | yes |  | Provider. The AI provider to use for spell checking and grammar correction. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text to Check. The text to check for spelling or grammar errors. |
| `language` | string | no | `"auto-detect"` | Text Language. The language of the input text. Choose "Auto Detection" if unsure. A value the product loads from the provider, such as an id; write the value itself. |
| `model` | string | no |  | Specific Model. Specific model to use (e.g., gpt-4o, gpt-4, grok-2-latest, command). Leave empty for default. |
| `fallback_providers` | array | no |  | Fallback Providers. Alternative providers to try if the main provider fails (up to 5). Values the product loads from the provider, such as ids; write an array of them. |
| `show_original_response` | boolean | no | `false` | Include Original Response. Include the raw provider response in the output for debugging. |

### `translate_text`

**Translate Text.** Translate a text into a target language via Eden AI, routed to a chosen provider. Use it to convert text between languages; the source language can be set explicitly or left on auto-detection. Requires a provider, the text, and a target language. Read-only transform with no side effect, so it is safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provider` | string | yes |  | Provider. The AI provider to use for text translation. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text to Translate. The text to translate. |
| `source_language` | string | no | `"auto-detect"` | Source Language. The language of the input text. Choose "Auto Detection" to automatically detect the language. A value the product loads from the provider, such as an id; write the value itself. |
| `target_language` | string | yes |  | Target Language. The language to translate the text into. A value the product loads from the provider, such as an id; write the value itself. |
| `model` | string | no |  | Specific Model. Specific model to use (e.g., gpt-4o, grok-2-latest). Leave empty for default. |
| `fallback_providers` | array | no |  | Fallback Providers. Alternative providers to try if the main provider fails (up to 5). Values the product loads from the provider, such as ids; write an array of them. |
| `show_original_response` | boolean | no | `false` | Include Original Response. Include the raw provider response in the output for debugging. |

### `invoice_parser`

**Invoice Parser.** Parse an uploaded financial document (PDF/image) into structured fields via Eden AI financial parser, routed to a chosen provider. The document type can be fixed to invoice or receipt or left on auto-detection. Use it to extract line items, totals, and metadata from invoices or receipts; takes an actual file upload (not a URL) and optionally a password for protected PDFs. Read-only extraction with no side effect, so it is safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provider` | string | yes |  | Provider. The AI provider to use for financial document parsing. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. Provide the financial document file (PDF, image, etc). Files are not supported; an action that needs one fails. |
| `document_type` | string | no | `"invoice"` | Document Type. The type of financial document to parse. A value the product loads from the provider, such as an id; write the value itself. |
| `language` | string | no | `"auto-detect"` | Document Language. The language of the document. Choose "Auto Detection" if unsure. A value the product loads from the provider, such as an id; write the value itself. |
| `model` | string | no |  | Specific Model. Specific model to use (e.g., gpt-4o, gpt-4o-mini, gpt-4-turbo). Leave empty for default. |
| `file_password` | string | no |  | PDF Password. Password for protected PDF files (if applicable). |
| `convert_to_pdf` | boolean | no | `false` | Convert to PDF. Convert DOC/DOCX files to PDF format for better compatibility. |
| `fallback_providers` | array | no |  | Fallback Providers. Alternative providers to try if the main provider fails (up to 5). Values the product loads from the provider, such as ids; write an array of them. |
| `show_original_response` | boolean | no | `false` | Include Original Response. Include the raw provider response in the output for debugging. |

### `receipt_parser`

**Receipt Parser.** Extract structured fields from a document referenced by URL via Eden AI data-extraction (OCR) endpoint, routed to a chosen provider. Use it for general field extraction from receipts and similar documents; unlike the invoice parser this takes a public file URL rather than a file upload. Requires a provider and a valid file URL; optionally a password for protected PDFs. Read-only extraction with no side effect, so it is safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provider` | string | yes |  | Provider. The AI provider to use for data extraction. A value the product loads from the provider, such as an id; write the value itself. |
| `file_url` | string | yes |  | File URL. Public URL to the document file (PDF, image, etc). |
| `file_password` | string | no |  | PDF Password. Password for protected PDF files (if applicable). |
| `convert_to_pdf` | boolean | no | `false` | Convert to PDF. Convert DOC/DOCX files to PDF format for better compatibility. |
| `attributes_as_list` | boolean | no | `false` | Attributes as List. Return extracted data with each attribute as a list instead of list of objects. |
| `fallback_providers` | array | no |  | Fallback Providers. Alternative providers to try if the main provider fails (up to 5). Values the product loads from the provider, such as ids; write an array of them. |
| `show_original_response` | boolean | no | `false` | Include Original Response. Include the raw provider response in the output for debugging. |

### `ocr_image`

**Extract Text in Image (OCR).** Run OCR on an image or document referenced by URL via Eden AI, routed to a chosen provider, returning the extracted text plus bounding-box coordinates. Use it to pull raw text out of an image or scanned file. Requires a provider and a valid file URL; language defaults to auto-detection. Read-only extraction with no side effect, so it is safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provider` | string | yes |  | Provider. The AI provider to use for text extraction. A value the product loads from the provider, such as an id; write the value itself. |
| `file_url` | string | yes |  | File URL. Public URL to the image or document file. |
| `language` | string | no | `"auto-detect"` | Document Language. The language of the text in the image. Choose "Auto Detection" if unsure. A value the product loads from the provider, such as an id; write the value itself. |
| `file_password` | string | no |  | PDF Password. Password for protected PDF files (if applicable). |
| `attributes_as_list` | boolean | no | `false` | Attributes as List. Return extracted data with each attribute as a list instead of list of objects. |
| `fallback_providers` | array | no |  | Fallback Providers. Alternative providers to try if the main provider fails (up to 5). Values the product loads from the provider, such as ids; write an array of them. |
| `show_original_response` | boolean | no | `false` | Include Original Response. Include the raw provider response in the output for debugging. |

### `image_generation`

**Image Generation.** Generate one or more images from a text prompt via Eden AI, routed to a chosen provider (OpenAI/DALL-E, StabilityAI, Replicate, Amazon, Leonardo, and others) at a selected resolution. Use it for text-to-image creation when you want provider/model choice behind a single call. Requires a provider, prompt, and resolution; image count defaults to 1. Generative and non-deterministic, but stateless — repeating the call creates no extra side effect. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provider` | string | yes |  | Provider. The AI provider to use for image generation. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Prompt. Description of the desired image(s). Be specific and descriptive for best results. |
| `resolution` | string | yes | `"1024x1024"` | Resolution. The image resolution (e.g., 512x512, 1024x1024). A value the product loads from the provider, such as an id; write the value itself. |
| `num_images` | number | no | `1` | Number of Images. Number of images to generate (1-10). |
| `model` | string | no |  | Specific Model. Specific model to use for image generation. Leave empty for provider default. A value the product loads from the provider, such as an id; write the value itself. |
| `fallback_providers` | array | no |  | Fallback Providers. Alternative providers to try if the main provider fails (up to 5). Values the product loads from the provider, such as ids; write an array of them. |
| `show_original_response` | boolean | no | `false` | Include Original Response. Include the raw provider response in the output for debugging. |

### `text_to_speech`

**Generate Audio From Text.** Synthesize spoken audio from text via Eden AI text-to-speech, routed to a chosen provider, with optional language/locale, voice gender, and rate/pitch/volume tuning. Use it to turn text into an audio clip. Requires a provider and the text; language defaults to en-US and voice to female. Generative but stateless — repeating the call creates no extra side effect. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provider` | string | yes |  | Provider. The AI provider to use for text-to-speech synthesis. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Text. The text to convert to speech. |
| `language` | string | no |  | Language. The language and locale for the speech synthesis (defaults to en-US if not specified). A value the product loads from the provider, such as an id; write the value itself. |
| `option` | string | no |  | Voice Gender. Choose the voice gender for speech synthesis (defaults to Female if not specified). A value the product loads from the provider, such as an id; write the value itself. |
| `rate` | number | no | `0` | Speaking Rate. Adjust speaking rate (-100 to 100, where 0 is normal speed). |
| `pitch` | number | no | `0` | Voice Pitch. Adjust voice pitch (-100 to 100, where 0 is normal pitch). |
| `volume` | number | no | `0` | Audio Volume. Adjust audio volume (-100 to 100, where 0 is normal volume). |
| `audio_format` | string | no |  | Audio Format. The audio format for the generated speech (default: MP3). A value the product loads from the provider, such as an id; write the value itself. |
| `sampling_rate` | number | no | `0` | Sampling Rate. Audio sampling rate in Hz (0-200000, 0 for provider default). |
| `fallback_providers` | array | no |  | Fallback Providers. Alternative providers to try if the main provider fails (up to 5). Values the product loads from the provider, such as ids; write an array of them. |
| `show_original_response` | boolean | no | `false` | Include Original Response. Include the raw provider response in the output for debugging. |

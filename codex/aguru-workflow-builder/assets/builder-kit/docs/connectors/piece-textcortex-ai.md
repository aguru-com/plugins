# TextCortex AI

AI-powered writing assistant for content creation, code generation, translations, and more using multiple AI models.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-textcortex-ai'
  version: '0.2.1'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your TextCortex API key:
> 1. Sign up for free at https://textcortex.com
> 2. Go to your account settings
> 3. Navigate to the API Key section
> 4. Generate and copy your API key
>
> Your API key should start with 'gAAAAAB...'

## Actions

### `send_prompt`

**Send Prompt.** Send a free-form prompt to TextCortex AI and get back generated text completion(s). Choose this for open-ended generation that does not fit a specialized template (paraphrase, summary, translation, email, code, etc.); selectable model, formality, languages, and number of outputs. Not idempotent: each call generates fresh, non-deterministic text and consumes account credits. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text to Complete. Enter the beginning of your text and AI will complete it (e.g., "The benefits of renewable energy are") |
| `model` | string | no | `"gemini-2-0-flash"` | Model. The language model to use. One of `"gpt-4o"`, `"gpt-4-1"`, `"gpt-5"`, `"gpt-4o-mini"`, `"o1-mini"`, `"o1-preview"`, `"o1"`, `"o3-mini"`, `"o3"`, `"o4-mini"`, `"claude-3-haiku"`, `"claude-3-5-sonnet"`, `"claude-3-7-sonnet"`, `"claude-3-7-sonnet-thinking"`, `"claude-4-sonnet"`, `"claude-4-sonnet-thinking"`, `"claude-3-5-haiku"`, `"mistral-small"`, `"mistral-large"`, `"deepseek-r1"`, `"kimi-k2"`, `"gemini-2-0-flash"`, `"gemini-2-5-pro"`, `"gemini-2-5-flash"`, `"gemini-2-5-flash-thinking"` and 2 more. |
| `formality` | string | no | `"default"` | Formality. The formality of the generated text. One of `"default"`, `"more"`, `"less"`, `"prefer_more"`, `"prefer_less"`. |
| `source_lang` | string | no | `"en"` | Source Language. The language of the source text. One of `"en"`, `"auto"`, `"es"`, `"fr"`, `"de"`, `"it"`, `"pt"`, `"nl"`, `"ro"`, `"uk"`, `"ru"`, `"pl"`, `"tr"`, `"cs"`, `"hu"`, `"bg"`, `"hr"`, `"sr"`, `"sk"`, `"sl"`, `"sv"`, `"no"`, `"da"`, `"fi"`, `"el"` and 10 more. |
| `target_lang` | string | no | `"en"` | Target Language. The language for the generated text. One of `"en"`, `"en-gb"`, `"es"`, `"fr"`, `"de"`, `"pt-br"`, `"pt"`, `"it"`, `"nl"`, `"ro"`, `"uk"`, `"ru"`, `"pl"`, `"tr"`, `"cs"`, `"hu"`, `"bg"`, `"hr"`, `"sr"`, `"sk"`, `"sl"`, `"sv"`, `"no"`, `"da"`, `"fi"` and 11 more. |
| `max_tokens` | number | no | `2048` | Max Tokens. Maximum length of generated text (1-4096 tokens) |
| `temperature` | number | no |  | Temperature. Controls creativity (0.0-2.0). Higher values = more creative, lower = more focused. |
| `n` | number | no | `1` | Number of Outputs. How many completions to generate (1-5) |

### `create_paraphrase`

**Create Paraphrase.** Rewrite text via TextCortex AI to express the same meaning in different wording. Provide the content either as inline text or as a stored file ID (one is required); supports a default or embeddings rewrite mode plus model, formality, and language options. Not idempotent: each call produces fresh, non-deterministic output and consumes account credits. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | no |  | Text to Paraphrase. The text to paraphrase. |
| `file_id` | string | no |  | File ID. ID of the file to paraphrase. |
| `mode` | string | no | `"default"` | Mode. Paraphrase mode. One of `"default"`, `"embeddings"`. |
| `model` | string | no | `"gemini-2-0-flash"` | Model. The language model to use. One of `"gpt-4o"`, `"gpt-4-1"`, `"gpt-5"`, `"gpt-4o-mini"`, `"o1-mini"`, `"o1-preview"`, `"o1"`, `"o3-mini"`, `"o3"`, `"o4-mini"`, `"claude-3-haiku"`, `"claude-3-5-sonnet"`, `"claude-3-7-sonnet"`, `"claude-3-7-sonnet-thinking"`, `"claude-4-sonnet"`, `"claude-4-sonnet-thinking"`, `"claude-3-5-haiku"`, `"mistral-small"`, `"mistral-large"`, `"deepseek-r1"`, `"kimi-k2"`, `"gemini-2-0-flash"`, `"gemini-2-5-pro"`, `"gemini-2-5-flash"`, `"gemini-2-5-flash-thinking"` and 2 more. |
| `formality` | string | no | `"default"` | Formality. The formality of the generated text. One of `"default"`, `"more"`, `"less"`, `"prefer_more"`, `"prefer_less"`. |
| `source_lang` | string | no | `"en"` | Source Language. The language of the source text. One of `"en"`, `"auto"`, `"es"`, `"fr"`, `"de"`, `"it"`, `"pt"`, `"nl"`, `"ro"`, `"uk"`, `"ru"`, `"pl"`, `"tr"`, `"cs"`, `"hu"`, `"bg"`, `"hr"`, `"sr"`, `"sk"`, `"sl"`, `"sv"`, `"no"`, `"da"`, `"fi"`, `"el"` and 10 more. |
| `target_lang` | string | no | `"en"` | Target Language. The language for the paraphrased text. One of `"en"`, `"en-gb"`, `"es"`, `"fr"`, `"de"`, `"pt-br"`, `"pt"`, `"it"`, `"nl"`, `"ro"`, `"uk"`, `"ru"`, `"pl"`, `"tr"`, `"cs"`, `"hu"`, `"bg"`, `"hr"`, `"sr"`, `"sk"`, `"sl"`, `"sv"`, `"no"`, `"da"`, `"fi"` and 11 more. |
| `max_tokens` | number | no | `2048` | Max Tokens. Maximum length of paraphrased text (1-4096 tokens) |
| `temperature` | number | no |  | Temperature. Controls creativity (0.0-2.0). Higher values = more creative, lower = more focused. |
| `n` | number | no | `1` | Number of Outputs. How many paraphrases to generate (1-5) |

### `create_social_media_caption`

**Create Social Media Caption.** Generate a social media caption with TextCortex AI from a description of the post, tuned for a specific platform (Twitter or LinkedIn). Requires the post context and a platform selection; optional comma-separated keywords are woven into the caption. Not idempotent: each call produces fresh, non-deterministic text and consumes account credits. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `context` | string | yes |  | Post Context. Describe what you want to post about (e.g., "Announcing our new product launch with 50% discount") |
| `mode` | string | yes |  | Platform. The platform to generate a post for. One of `"twitter"`, `"linkedin"`. |
| `keywords` | string | no |  | Keywords. Keywords to be included in the post (comma-separated) |
| `model` | string | no | `"gemini-2-0-flash"` | Model. The language model to use. One of `"gpt-4o"`, `"gpt-4-1"`, `"gpt-5"`, `"gpt-4o-mini"`, `"o1-mini"`, `"o1-preview"`, `"o1"`, `"o3-mini"`, `"o3"`, `"o4-mini"`, `"claude-3-haiku"`, `"claude-3-5-sonnet"`, `"claude-3-7-sonnet"`, `"claude-3-7-sonnet-thinking"`, `"claude-4-sonnet"`, `"claude-4-sonnet-thinking"`, `"claude-3-5-haiku"`, `"mistral-small"`, `"mistral-large"`, `"deepseek-r1"`, `"kimi-k2"`, `"gemini-2-0-flash"`, `"gemini-2-5-pro"`, `"gemini-2-5-flash"`, `"gemini-2-5-flash-thinking"` and 2 more. |
| `formality` | string | no | `"default"` | Formality. The formality of the generated text. One of `"default"`, `"more"`, `"less"`, `"prefer_more"`, `"prefer_less"`. |
| `source_lang` | string | no | `"en"` | Source Language. The language of the source text. One of `"en"`, `"auto"`, `"es"`, `"fr"`, `"de"`, `"it"`, `"pt"`, `"nl"`, `"ro"`, `"uk"`, `"ru"`, `"pl"`, `"tr"`, `"cs"`, `"hu"`, `"bg"`, `"hr"`, `"sr"`, `"sk"`, `"sl"`, `"sv"`, `"no"`, `"da"`, `"fi"`, `"el"` and 10 more. |
| `target_lang` | string | no | `"en"` | Target Language. The language for the caption. One of `"en"`, `"en-gb"`, `"es"`, `"fr"`, `"de"`, `"pt-br"`, `"pt"`, `"it"`, `"nl"`, `"ro"`, `"uk"`, `"ru"`, `"pl"`, `"tr"`, `"cs"`, `"hu"`, `"bg"`, `"hr"`, `"sr"`, `"sk"`, `"sl"`, `"sv"`, `"no"`, `"da"`, `"fi"` and 11 more. |
| `max_tokens` | number | no | `2048` | Max Tokens. Maximum length of caption (1-4096 tokens) |
| `temperature` | number | no |  | Temperature. Controls creativity (0.0-2.0). Higher values = more creative, lower = more focused. |
| `n` | number | no | `1` | Number of Outputs. How many captions to generate (1-5) |

### `create_translation`

**Create Translation.** Translate text into a chosen target language using TextCortex AI. Requires the source text and a target language; source language can be auto-detected, and formality can be controlled. Not idempotent: each call invokes the model fresh and consumes account credits. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text to Translate. The text to translate. |
| `target_lang` | string | yes |  | Target Language. The language to translate to. One of `"en"`, `"en-gb"`, `"es"`, `"fr"`, `"de"`, `"pt-br"`, `"pt"`, `"it"`, `"nl"`, `"ro"`, `"uk"`, `"ru"`, `"pl"`, `"tr"`, `"cs"`, `"hu"`, `"bg"`, `"hr"`, `"sr"`, `"sk"`, `"sl"`, `"sv"`, `"no"`, `"da"`, `"fi"` and 11 more. |
| `source_lang` | string | no | `"en"` | Source Language. The language of the text to translate. One of `"en"`, `"auto"`, `"es"`, `"fr"`, `"de"`, `"it"`, `"pt"`, `"nl"`, `"ro"`, `"uk"`, `"ru"`, `"pl"`, `"tr"`, `"cs"`, `"hu"`, `"bg"`, `"hr"`, `"sr"`, `"sk"`, `"sl"`, `"sv"`, `"no"`, `"da"`, `"fi"`, `"el"` and 10 more. |
| `formality` | string | no | `"default"` | Formality. The formality of the generated text. One of `"default"`, `"more"`, `"less"`, `"prefer_more"`, `"prefer_less"`. |

### `create_code`

**Create Code.** Generate a code snippet with TextCortex AI from a natural-language description of what the code should do. Requires the instructions and a target programming language; selectable model and number of outputs. Not idempotent: each call produces fresh, non-deterministic code and consumes account credits. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Code Instructions. Describe what you want the code to do (e.g., "Create a function to sort an array") |
| `mode` | string | yes |  | Programming Language. Select the programming language for code generation. One of `"python"`, `"java"`, `"javascript"`, `"go"`, `"php"`, `"js_regex"`. |
| `model` | string | no | `"gemini-2-0-flash"` | Model. The language model to use. One of `"gpt-4o"`, `"gpt-4-1"`, `"gpt-5"`, `"gpt-4o-mini"`, `"o1-mini"`, `"o1-preview"`, `"o1"`, `"o3-mini"`, `"o3"`, `"o4-mini"`, `"claude-3-haiku"`, `"claude-3-5-sonnet"`, `"claude-3-7-sonnet"`, `"claude-3-7-sonnet-thinking"`, `"claude-4-sonnet"`, `"claude-4-sonnet-thinking"`, `"claude-3-5-haiku"`, `"mistral-small"`, `"mistral-large"`, `"deepseek-r1"`, `"kimi-k2"`, `"gemini-2-0-flash"`, `"gemini-2-5-pro"`, `"gemini-2-5-flash"`, `"gemini-2-5-flash-thinking"` and 2 more. |
| `max_tokens` | number | no | `2048` | Max Tokens. Maximum length of generated code (1-4096 tokens) |
| `temperature` | number | no |  | Temperature. Controls creativity (0.0-2.0). Higher values = more creative, lower = more focused. |
| `n` | number | no | `1` | Number of Outputs. How many code snippets to generate (1-5) |

### `create_email`

**Create Email.** Draft an email with TextCortex AI from supplied context plus optional sender/recipient. Pick an email mode (reply, general, customer support, cold, or from-bullets) which unlocks mode-specific inputs such as the received email and instructions for replies, purpose for cold outreach, or company details for support. Not idempotent: each call produces fresh, non-deterministic text and consumes account credits. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `context` | string | yes |  | Context. Context of the email. For example, a summary, or a bullet point list. |
| `mode` | string | no | `"general"` | Email Mode. The style or tone to be used when writing. One of `"reply"`, `"general"`, `"customer_support"`, `"cold"`, `"from_bullets"`. |
| `to` | string | no |  | To. The recipient of the email. |
| `from` | string | no |  | From. The sender of the email. |
| `instructions` | string | no |  | Instructions. Instructions for the email. Available when mode = reply. |
| `received_email` | string | no |  | Received Email. The email that is being replied to. Available when mode = reply. |
| `purpose` | string | no |  | Purpose. Purpose of the email. Available when mode = cold. |
| `company_details` | string | no |  | Company Details. Details regarding the company. Available when mode = customer_support. |
| `model` | string | no | `"gemini-2-0-flash"` | Model. The language model to use. One of `"gpt-4o"`, `"gpt-4-1"`, `"gpt-5"`, `"gpt-4o-mini"`, `"o1-mini"`, `"o1-preview"`, `"o1"`, `"o3-mini"`, `"o3"`, `"o4-mini"`, `"claude-3-haiku"`, `"claude-3-5-sonnet"`, `"claude-3-7-sonnet"`, `"claude-3-7-sonnet-thinking"`, `"claude-4-sonnet"`, `"claude-4-sonnet-thinking"`, `"claude-3-5-haiku"`, `"mistral-small"`, `"mistral-large"`, `"deepseek-r1"`, `"kimi-k2"`, `"gemini-2-0-flash"`, `"gemini-2-5-pro"`, `"gemini-2-5-flash"`, `"gemini-2-5-flash-thinking"` and 2 more. |
| `formality` | string | no | `"default"` | Formality. The formality of the generated text. One of `"default"`, `"more"`, `"less"`, `"prefer_more"`, `"prefer_less"`. |
| `source_lang` | string | no | `"en"` | Source Language. The language of the source text. One of `"en"`, `"auto"`, `"es"`, `"fr"`, `"de"`, `"it"`, `"pt"`, `"nl"`, `"ro"`, `"uk"`, `"ru"`, `"pl"`, `"tr"`, `"cs"`, `"hu"`, `"bg"`, `"hr"`, `"sr"`, `"sk"`, `"sl"`, `"sv"`, `"no"`, `"da"`, `"fi"`, `"el"` and 10 more. |
| `target_lang` | string | no | `"en"` | Target Language. The language for the email. One of `"en"`, `"en-gb"`, `"es"`, `"fr"`, `"de"`, `"pt-br"`, `"pt"`, `"it"`, `"nl"`, `"ro"`, `"uk"`, `"ru"`, `"pl"`, `"tr"`, `"cs"`, `"hu"`, `"bg"`, `"hr"`, `"sr"`, `"sk"`, `"sl"`, `"sv"`, `"no"`, `"da"`, `"fi"` and 11 more. |
| `max_tokens` | number | no | `2048` | Max Tokens. Maximum length of email (1-4096 tokens) |
| `temperature` | number | no |  | Temperature. Controls creativity (0.0-2.0). Higher values = more creative, lower = more focused. |
| `n` | number | no | `1` | Number of Outputs. How many email drafts to generate (1-5) |

### `create_product_description`

**Create Product Description.** Generate a marketing product description with TextCortex AI from product attributes (name, brand, category, features, and comma-separated keywords). All fields are optional, so supply whatever product details are available; model, formality, and language are configurable. Not idempotent: each call produces fresh, non-deterministic text and consumes account credits. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Product Name. Name of the product. |
| `description` | string | no |  | Product Features. Features of the product. |
| `brand` | string | no |  | Brand. Brand of the product. |
| `category` | string | no |  | Category. Category of the product. |
| `keywords` | string | no |  | Keywords. Keywords to include in the product description (comma-separated) |
| `model` | string | no | `"gemini-2-0-flash"` | Model. The language model to use. One of `"gpt-4o"`, `"gpt-4-1"`, `"gpt-5"`, `"gpt-4o-mini"`, `"o1-mini"`, `"o1-preview"`, `"o1"`, `"o3-mini"`, `"o3"`, `"o4-mini"`, `"claude-3-haiku"`, `"claude-3-5-sonnet"`, `"claude-3-7-sonnet"`, `"claude-3-7-sonnet-thinking"`, `"claude-4-sonnet"`, `"claude-4-sonnet-thinking"`, `"claude-3-5-haiku"`, `"mistral-small"`, `"mistral-large"`, `"deepseek-r1"`, `"kimi-k2"`, `"gemini-2-0-flash"`, `"gemini-2-5-pro"`, `"gemini-2-5-flash"`, `"gemini-2-5-flash-thinking"` and 2 more. |
| `formality` | string | no | `"default"` | Formality. The formality of the generated text. One of `"default"`, `"more"`, `"less"`, `"prefer_more"`, `"prefer_less"`. |
| `source_lang` | string | no | `"en"` | Source Language. The language of the source text. One of `"en"`, `"auto"`, `"es"`, `"fr"`, `"de"`, `"it"`, `"pt"`, `"nl"`, `"ro"`, `"uk"`, `"ru"`, `"pl"`, `"tr"`, `"cs"`, `"hu"`, `"bg"`, `"hr"`, `"sr"`, `"sk"`, `"sl"`, `"sv"`, `"no"`, `"da"`, `"fi"`, `"el"` and 10 more. |
| `target_lang` | string | no | `"en"` | Target Language. The language for the product description. One of `"en"`, `"en-gb"`, `"es"`, `"fr"`, `"de"`, `"pt-br"`, `"pt"`, `"it"`, `"nl"`, `"ro"`, `"uk"`, `"ru"`, `"pl"`, `"tr"`, `"cs"`, `"hu"`, `"bg"`, `"hr"`, `"sr"`, `"sk"`, `"sl"`, `"sv"`, `"no"`, `"da"`, `"fi"` and 11 more. |
| `max_tokens` | number | no | `2048` | Max Tokens. Maximum length of product description (1-4096 tokens) |
| `temperature` | number | no |  | Temperature. Controls creativity (0.0-2.0). Higher values = more creative, lower = more focused. |
| `n` | number | no | `1` | Number of Outputs. How many descriptions to generate (1-5) |

### `create_summary`

**Create Summary.** Condense text into a shorter summary using TextCortex AI. Provide the content either as inline text or as a stored file ID (one is required); supports a default or embeddings summarization mode plus model, formality, and language options. Not idempotent: each call produces fresh, non-deterministic output and consumes account credits. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | no |  | Text to Summarize. The text to summarize. |
| `file_id` | string | no |  | File ID. ID of the file to summarize. |
| `mode` | string | no | `"default"` | Mode. Summarization mode. One of `"default"`, `"embeddings"`. |
| `model` | string | no | `"gemini-2-0-flash"` | Model. The language model to use. One of `"gpt-4o"`, `"gpt-4-1"`, `"gpt-5"`, `"gpt-4o-mini"`, `"o1-mini"`, `"o1-preview"`, `"o1"`, `"o3-mini"`, `"o3"`, `"o4-mini"`, `"claude-3-haiku"`, `"claude-3-5-sonnet"`, `"claude-3-7-sonnet"`, `"claude-3-7-sonnet-thinking"`, `"claude-4-sonnet"`, `"claude-4-sonnet-thinking"`, `"claude-3-5-haiku"`, `"mistral-small"`, `"mistral-large"`, `"deepseek-r1"`, `"kimi-k2"`, `"gemini-2-0-flash"`, `"gemini-2-5-pro"`, `"gemini-2-5-flash"`, `"gemini-2-5-flash-thinking"` and 2 more. |
| `formality` | string | no | `"default"` | Formality. The formality of the generated text. One of `"default"`, `"more"`, `"less"`, `"prefer_more"`, `"prefer_less"`. |
| `source_lang` | string | no | `"en"` | Source Language. The language of the source text. One of `"en"`, `"auto"`, `"es"`, `"fr"`, `"de"`, `"it"`, `"pt"`, `"nl"`, `"ro"`, `"uk"`, `"ru"`, `"pl"`, `"tr"`, `"cs"`, `"hu"`, `"bg"`, `"hr"`, `"sr"`, `"sk"`, `"sl"`, `"sv"`, `"no"`, `"da"`, `"fi"`, `"el"` and 10 more. |
| `target_lang` | string | no | `"en"` | Target Language. The language for the summary. One of `"en"`, `"en-gb"`, `"es"`, `"fr"`, `"de"`, `"pt-br"`, `"pt"`, `"it"`, `"nl"`, `"ro"`, `"uk"`, `"ru"`, `"pl"`, `"tr"`, `"cs"`, `"hu"`, `"bg"`, `"hr"`, `"sr"`, `"sk"`, `"sl"`, `"sv"`, `"no"`, `"da"`, `"fi"` and 11 more. |
| `max_tokens` | number | no | `2048` | Max Tokens. Maximum length of summary (1-4096 tokens) |
| `temperature` | number | no |  | Temperature. Controls creativity (0.0-2.0). Higher values = more creative, lower = more focused. |
| `n` | number | no | `1` | Number of Outputs. How many summaries to generate (1-5) |

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

# Aidbase

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-aidbase'
  version: '0.2.1'
```

Categories: CUSTOMER_SUPPORT, COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your API Key:
> 1. Log in to your Aidbase dashboard.
> 2. Navigate to **Settings** in the sidebar.
> 3. Click on the **API** section.
> 4. Generate and copy your new API Key.

## Actions

### `add_video`

**Add Video.** Registers a YouTube video as a new knowledge source in Aidbase so its content can later be trained on and answered from. Use when ingesting video content into the knowledge base; requires a YouTube video URL. Not idempotent: each call creates a new knowledge source even for the same URL. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `video_url` | string | yes |  | YouTube Video URL. The URL of the YouTube video to add as a knowledge source. |

### `add_website`

**Add Website.** Registers a website URL as a new knowledge source in Aidbase so its content can later be trained on and answered from. Use when ingesting a web page or site into the knowledge base; requires the website URL. Not idempotent: each call creates a new knowledge source even for the same URL. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `website_url` | string | yes |  | Website URL. The URL of the website to add as a knowledge source (e.g., https://www.example.com). |

### `add_faq_item`

**Add FAQ Item.** Appends a question/answer entry to an existing FAQ knowledge base in Aidbase, optionally tagging it with category names (new categories are created on the fly). Use to populate an FAQ already created via Create FAQ; requires the target FAQ id plus question and answer text. Not idempotent: each call appends a new item even if the question/answer is identical. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `faq_id` | string | yes |  | FAQ. Select the FAQ to which the item will be added. A value the product loads from the provider, such as an id; write the value itself. |
| `question` | string | yes |  | Question. |
| `answer` | string | yes |  | Answer. |
| `source_url` | string | no |  | Source URL. An optional URL for the source of the information. |
| `categories` | array | no |  | Categories. A list of category names. New categories will be created if they do not exist. |

### `create_faq`

**Create FAQ.** Creates a new, empty FAQ knowledge base in Aidbase identified by a title (description optional). Use this first to obtain an FAQ id before adding entries with Add FAQ Item. Not idempotent: each call creates a separate FAQ even with the same title. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. The title of the new FAQ knowledge base. |
| `description` | string | no |  | Description. An optional description for the FAQ. |

### `create_chatbot_reply`

**Create Chatbot Reply.** Sends a message to a specified Aidbase chatbot and returns its AI-generated reply. Pass a session id to continue an existing conversation, or omit it to start a new one. Use to get an automated support answer for a user message; requires the chatbot id and the message text. Not idempotent: each call generates a fresh reply and advances the conversation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatbot_id` | string | yes |  | Chatbot. Select the chatbot that will generate the reply. A value the product loads from the provider, such as an id; write the value itself. |
| `message` | string | yes |  | Message. The message or question to send to the chatbot. |
| `session_id` | string | no |  | Session ID. An optional session ID to maintain conversation context. If omitted, a new conversation will start. |

### `start_training`

**Start Training.** Triggers a training job for a single existing Aidbase knowledge base item (FAQ, website, video, etc.) so its content becomes answerable by the chatbot. Use after adding a knowledge source; requires the knowledge item id. Not idempotent: each call enqueues another training run. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `knowledge_id` | string | yes |  | Knowledge Item. Select the knowledge item to train. A value the product loads from the provider, such as an id; write the value itself. |

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

# Presenton

Generate AI-powered presentations using Presenton (https://presenton.ai). Supports templates, themes, images, synchronous and asynchronous generation, status polling, and export to PPTX/PDF.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-presentation'
  version: '0.3.0'
```

Categories: ARTIFICIAL_INTELLIGENCE, CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Presenton API Key

> Your Presenton API key. Create one from your account at https://presenton.ai.

## Actions

### `generate_presentations`

**Generate Presentations (async).** Generate an AI-powered slide presentation in Presenton from a content prompt (or per-slide markdown), then poll until generation completes (up to 120 seconds) and return the finished presentation. Use when an agent needs to produce a deck from a topic or outline, optionally controlling tone, slide count, theme/template, image style (stock vs. AI-generated), web search, and export format (PPTX or PDF). Each call starts a new generation task, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content` | string | no |  | Content. The content for generating the presentation. |
| `instructions` | string | no |  | Instructions. Instruction for generating the presentation (optional). |
| `tone` | string | no | `"default"` | Tone. Tone to use for the text. One of `"default"`, `"casual"`, `"professional"`, `"funny"`, `"educational"`, `"sales_pitch"`. |
| `verbosity` | string | no | `"standard"` | Verbosity. How verbose the text should be. One of `"concise"`, `"standard"`, `"text-heavy"`. |
| `slides_markdown` | array | no | `[]` | Slides markdown. An array of markdown strings for each slide (optional). |
| `markdown_emphasis` | boolean | no | `true` | Markdown emphasis. Whether to emphasize the markdown. |
| `web_search` | boolean | no | `false` | Enable web search. Whether to enable web search. |
| `image_type` | string | no | `"stock"` | Image type. Type of image to generate. One of `"stock"`, `"ai-generated"`. |
| `theme` | string | no |  | Theme. Theme to use for the presentation (e.g. edge-yellow, light-rose) |
| `n_slides` | number | no | `8` | Number of slides. Number of slides to generate. |
| `language` | string | no | `"English"` | Language. Language for the presentation. |
| `template` | string | no | `"general"` | Template. Template to use for the presentation. One of `"general"`, `"modern"`, `"standard"`, `"swift"`. |
| `include_table_of_contents` | boolean | no | `false` | Include table of contents. Whether to include a table of contents. |
| `include_title_slide` | boolean | no | `true` | Include title slide. Whether to include a title slide. |
| `allow_access_to_user_info` | boolean | no | `true` | Allow access to user's info. Whether to allow access to user's info. |
| `files` | array | no | `[]` | Files. Array of file identifiers uploaded via Presenton files API (optional). |
| `export_as` | string | no | `"pptx"` | Export as. Export format. One of `"pptx"`, `"pdf"`. |
| `trigger_webhook` | boolean | no | `false` | Trigger webhook. Whether to trigger subscribed webhooks. |

### `presentation_create_integration_token`

**Create Integration Token.** Creates a scoped integration token and frontend URL for embedding one presentation. Get the presentation id from presentation_list_presentations. Each call issues a new token. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentation` | string | yes |  | Presentation ID. |
| `scopes` | array | yes |  | Scopes. One of `"presentation:read"`, `"presentation:edit"`, `"presentation:export"`. |
| `expires_at` | string | no |  | Expires At. ISO 8601 date-time. |

Output fields:

- `token`: Token
- `frontend_url`: Frontend URL (url)
- `user`: User
- `presentation`: Presentation
- `scopes`: Scopes
- `version`: Version
- `expires_at`: Expires At (datetime)

### `presentation_create_presentation_from_json`

**Create Presentation From JSON.** Builds a presentation synchronously from a list of slides, each with a layout name and a content object. Get the standard_template id from presentation_list_standard_templates and valid layouts and content schemas from presentation_get_standard_template. Each call creates a new presentation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `standard_template` | string | yes |  | Standard Template ID. |
| `slides` | JSON | yes |  | Slides. Array of {"layout": string, "content": object, "speaker_note"?: string}. |
| `title` | string | no |  | Title. |
| `language` | string | no | `"English"` | Language. |
| `export_as` | string | no | `"pptx"` | Export As. One of `"pptx"`, `"pdf"`, `"png"`. |

Output fields:

- `presentation_id`: Presentation ID
- `path`: Path (url)
- `edit_path`: Edit Path (url)
- `credits_consumed`: Credits Consumed (number)

### `presentation_delete_image`

**Delete Image.** Permanently deletes an uploaded image by id; this cannot be undone. Get the id from presentation_list_images or presentation_upload_image. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Image ID. |

Output fields:

- `success`: Success (boolean)
- `id`: ID

### `presentation_export_presentation`

**Export Presentation.** Exports an existing presentation to a downloadable file and returns its path. Get the presentation id from presentation_list_presentations. Consumes credits on every call, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Presentation ID. From presentation_list_presentations. |
| `export_as` | string | yes |  | Export As. One of `"pptx"`, `"pdf"`, `"png"`. |

Output fields:

- `presentation_id`: Presentation ID
- `path`: Path (url)
- `edit_path`: Edit Path (url)
- `credits_consumed`: Credits Consumed (number)

### `presentation_generate_outline`

**Generate Outline.** Generates an array of slide outlines from content using a paid LLM call; no presentation is created. Output differs on every call. Use to draft or review structure before presentation_generate_presentation. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content` | string | yes |  | Content. |
| `instructions` | string | no |  | Instructions. |
| `n_slides` | number | no |  | Number of Slides. |
| `language` | string | no |  | Language. |
| `tone` | string | no |  | Tone. One of `"default"`, `"casual"`, `"professional"`, `"funny"`, `"educational"`, `"sales_pitch"`. |
| `verbosity` | string | no |  | Verbosity. One of `"concise"`, `"standard"`, `"text-heavy"`. |
| `files` | array | no |  | File IDs. Ids returned by presentation_upload_source_files. |

Output fields:

- `count`: Count (number)
- `outlines`: Outlines

### `presentation_generate_presentation`

**Generate Presentation.** Starts a Presenton generation task (v3) from a content prompt, then waits up to 55 seconds for it to finish. If the task is still running when the wait ends, returns its id and status instead of failing: pass that id to presentation_get_task_status to keep polling. Use presentation_upload_source_files to get ids for files, and presentation_list_standard_templates for standard_template ids. Each call starts a new paid task. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content` | string | yes |  | Content. Topic or text the presentation is generated from. |
| `instructions` | string | no |  | Instructions. |
| `n_slides` | number | no |  | Number of Slides. |
| `language` | string | no |  | Language. |
| `tone` | string | no |  | Tone. One of `"default"`, `"casual"`, `"professional"`, `"funny"`, `"educational"`, `"sales_pitch"`. |
| `verbosity` | string | no |  | Verbosity. One of `"concise"`, `"standard"`, `"text-heavy"`. |
| `standard_template` | string | no |  | Standard Template ID. From presentation_list_standard_templates. |
| `smart_design` | string | no |  | Smart Design ID. From presentation_list_smart_designs. |
| `image_type` | string | no |  | Image Type. One of `"stock"`, `"ai-generated"`. |
| `web_search` | boolean | no | `false` | Enable Web Search. |
| `include_title_slide` | boolean | no | `true` | Include Title Slide. |
| `include_table_of_contents` | boolean | no | `false` | Include Table of Contents. |
| `files` | array | no |  | File IDs. Ids returned by presentation_upload_source_files. |
| `reference_urls` | array | no |  | Reference URLs. |
| `export_as` | string | no | `"pptx"` | Export As. One of `"pptx"`, `"pdf"`, `"png"`. |

Output fields:

- `id`: ID
- `status`: Status
- `data`: Data
- `data.presentation_id`: Presentation ID
- `data.path`: Path (url)
- `data.edit_path`: Edit Path (url)
- `data.credits_consumed`: Credits Consumed (number)
- `created_at`: Created At (datetime)
- `user`: User
- `type`: Type
- `message`: Message
- `error`: Error
- `updated_at`: Updated At (datetime)

### `presentation_get_standard_template`

**Get Standard Template.** Reads one standard template, including its slide layouts and the content schema of each layout. Use before presentation_create_presentation_from_json to learn valid layout names and content shapes. Get the template id from presentation_list_standard_templates. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | string | yes |  | Template ID. |

Output fields:

- `id`: ID
- `name`: Name
- `description`: Description
- `layout_count`: Layout Count (number)
- `thumbnail`: Thumbnail (image)
- `is_default`: Is Default (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `layouts`: Layouts
- `fonts`: Fonts (url) (an object whose keys vary)
- `schemas`: Layout Schemas

### `presentation_get_task_status`

**Get Task Status.** Reads the current status of a Presenton async task once, returning status, message, error and result data when completed. Use the id returned by presentation_generate_presentation when it did not finish within its wait window. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Task ID. Task id returned by presentation_generate_presentation. |

Output fields:

- `id`: ID
- `status`: Status
- `data`: Data
- `data.presentation_id`: Presentation ID
- `data.path`: Path (url)
- `data.edit_path`: Edit Path (url)
- `data.credits_consumed`: Credits Consumed (number)
- `created_at`: Created At (datetime)
- `message`: Message
- `user`: User
- `type`: Type
- `error`: Error
- `updated_at`: Updated At (datetime)

### `presentation_get_template_example`

**Get Template Example.** Reads an example set of slides for a standard template, showing populated content for each layout. Use as a model when writing slides for presentation_create_presentation_from_json. Get the template id from presentation_list_standard_templates. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template_id` | string | yes |  | Template ID. |

Output fields:

- `standard_template`: Standard Template
- `slides`: Slides
- `slides[].layout`: Layout
- `slides[].content`: Content

### `presentation_list_images`

**List Images.** Lists uploaded images with their ids and urls. Get the id for presentation_delete_image here. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `count`: Count (number)
- `images`: Images
- `images[].id`: ID
- `images[].path`: Path
- `images[].extras`: Extras
- `images[].is_uploaded`: Is Uploaded (boolean)
- `images[].user`: User
- `images[].created_at`: Created At (datetime)
- `images[].url`: URL (image)

### `presentation_list_presentations`

**List Presentations.** Lists presentations with their ids, titles and creation times, one page at a time. Use to find the presentation id needed by presentation_export_presentation and presentation_create_integration_token. Filter by type to see only standard or smart-design decks. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | no |  | Type. One of `"standard"`, `"smart"`. |
| `page` | number | no |  | Page. |
| `page_size` | number | no |  | Page Size. |

Output fields:

- `total_pages`: Total Pages (number)
- `page`: Page (number)
- `page_size`: Page Size (number)
- `results`: Results
- `results[].id`: ID
- `results[].title`: Title
- `results[].content`: Content
- `results[].n_slides`: Slides (number)
- `results[].language`: Language
- `results[].tone`: Tone
- `results[].verbosity`: Verbosity
- `results[].status`: Status
- `results[].theme`: Theme
- `results[].theme.name`: Name
- `results[].theme.description`: Description
- `results[].created_at`: Created At (datetime)
- `results[].updated_at`: Updated At (datetime)
- `count`: Count (number)

### `presentation_list_smart_designs`

**List Smart Designs.** Lists Smart Designs with their ids, one page at a time. Use the id as smart_design in presentation_generate_presentation. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `default` | boolean | no |  | Default Designs Only. |
| `page` | number | no |  | Page. |
| `page_size` | number | no |  | Page Size. |

Output fields:

- `total_pages`: Total Pages (number)
- `page`: Page (number)
- `page_size`: Page Size (number)
- `results`: Results
- `results[].id`: ID
- `results[].name`: Name
- `results[].thumbnail_url`: Thumbnail URL (image)
- `results[].created_at`: Created At (datetime)
- `count`: Count (number)

### `presentation_list_standard_templates`

**List Standard Templates.** Lists standard templates with their ids and names, one page at a time. Use the id as standard_template in presentation_generate_presentation or presentation_create_presentation_from_json, or in presentation_get_standard_template. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no |  | Page. |
| `page_size` | number | no |  | Page Size. |
| `default` | boolean | no |  | Default Templates Only. |

Output fields:

- `items`: Items
- `items[].id`: ID
- `items[].name`: Name
- `items[].description`: Description
- `items[].layout_count`: Layout Count (number)
- `items[].thumbnail`: Thumbnail (image)
- `items[].is_default`: Is Default (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `total`: Total (number)
- `page`: Page (number)
- `page_size`: Page Size (number)
- `count`: Count (number)

### `presentation_upload_image`

**Upload Image.** Uploads one image and returns its id, path and url. Each call stores a new copy, so it is not idempotent. Remove it later with presentation_delete_image. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | Image. Files are not supported; an action that needs one fails. |

Output fields:

- `user`: User
- `path`: Path
- `is_uploaded`: Is Uploaded (boolean)
- `url`: URL (image)
- `id`: ID
- `extras`: Extras
- `created_at`: Created At (datetime)

### `presentation_upload_source_files`

**Upload Source Files.** Uploads one or more files and returns their ids as file_ids. Pass them as files to presentation_generate_presentation or presentation_generate_outline. Each call stores new copies, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `files` | array | yes |  | Files. Each item: { `file` }. |

Output fields:

- `file_ids`: File IDs
- `count`: Count (number)

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

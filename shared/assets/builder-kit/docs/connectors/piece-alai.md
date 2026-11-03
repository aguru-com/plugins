# Alai

AI-powered presentation generation API. Create, export, and manage professional presentations from text.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-alai'
  version: '0.2.0'
```

Categories: CONTENT_AND_FILES, ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Follow these steps to get your Alai API Key:
>
> 1. Go to [**https://getalai.com/api**](https://getalai.com/api) and sign up or log in.
> 2. Navigate to the **API Keys** section.
> 3. Click **Create API Key** and give it a name (e.g., "Activepieces").
> 4. Copy the key and paste it below.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. Paste your API key here. |

## Actions

### `generatePresentation`

**Generate Presentation.** Generate a brand-new presentation from input text via the Alai AI API, with optional controls for tone, slide count, text density, theme, and AI images. Use this to turn raw text into slides. By default it returns immediately with a generation_id (poll Get Generation for status); set Wait for Completion to block until the deck finishes (up to Max Wait Time). Not idempotent: each call starts a new generation. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `inputText` | string | yes |  | Input Text. The text content to generate a presentation from. |
| `additionalInstructions` | string | no |  | Additional Instructions. Extra instructions for how the presentation should be generated. |
| `exportFormats` | array | no |  | Export Formats. Formats to export the presentation in after generation. One of `"link"`, `"pdf"`, `"ppt"`. |
| `title` | string | no |  | Title. A title for the presentation. If not provided, one will be generated. |
| `themeId` | string | no |  | Theme ID. The ID of the presentation theme to use. If not provided, a default theme will be applied. |
| `slideRange` | string | no |  | Slide Range. Target slide count: auto, 1, 2-5, 6-10, 11-15, 16-20, 21-25, 26-50. |
| `tone` | string | no |  | Tone. The tone of voice for the presentation content. One of `"DEFAULT"`, `"PROFESSIONAL"`, `"CASUAL"`, `"TECHNICAL"`, `"EDUCATIONAL"`, `"INSPIRATIONAL"`, `"NARRATIVE"`, `"PERSUASIVE"`, `"AUTHORITATIVE"`, `"EMPATHETIC"`. |
| `contentMode` | string | no |  | Content Mode. How the input text should be handled. One of `"PRESERVE"`, `"CONDENSE"`, `"ENHANCE"`, `"CUSTOM"`. |
| `amountMode` | string | no |  | Text Density. The amount of text to include per slide. One of `"MINIMAL"`, `"ESSENTIAL"`, `"BALANCED"`, `"DETAILED"`. |
| `includeAiImages` | boolean | no | `true` | Include AI Images. Whether to include AI-generated images in the presentation. |
| `imageStyle` | string | no |  | Image Style. The style for AI-generated images. One of `"auto"`, `"realistic"`, `"artistic"`, `"cartoon"`, `"three_d"`. |
| `waitForCompletion` | boolean | no | `false` | Wait for Completion. Wait for the presentation generation to complete before returning. |
| `maxWaitTime` | number | no | `300` | Max Wait Time (seconds). Maximum time to wait for completion (default 300 seconds / 5 minutes). |

### `getGeneration`

**Get Generation.** Look up the current status and result of an Alai generation job by its generation_id (returned by Generate Presentation or Export Presentation). Use this to poll for completion or retrieve the finished output and export links. Read-only and idempotent. Requires a valid generation_id. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `generationId` | string | yes |  | Generation ID. The ID of the generation job (from the "Generate Presentation" action). |

### `exportPresentation`

**Export Presentation.** Export an existing Alai presentation into one or more formats (link, PDF, and/or PPTX) by its presentation ID. Use this to render a deck for download or sharing. By default it returns immediately with a generation_id (poll Get Generation for status); set Wait for Completion to block until the export finishes (up to Max Wait Time). Not idempotent: each call kicks off a new export job. Requires the presentation ID and at least one export format. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentationId` | string | yes |  | Presentation ID. The ID of the presentation to export. |
| `exportFormats` | array | yes |  | Export Formats. Formats to export the presentation in. One of `"link"`, `"pdf"`, `"ppt"`. |
| `waitForCompletion` | boolean | no | `false` | Wait for Completion. Wait for the presentation generation to complete before returning. |
| `maxWaitTime` | number | no | `300` | Max Wait Time (seconds). Maximum time to wait for completion (default 300 seconds / 5 minutes). |

### `addSlide`

**Add Slide.** Generate and insert a new AI-authored slide into an existing Alai presentation, given the presentation ID and the slide content/topic; optional slide order controls where it lands (a numeric index, or "end" to append). Use this to extend a deck after it has been generated. Not idempotent: each call appends another slide. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentationId` | string | yes |  | Presentation. Select a presentation. A value the product loads from the provider, such as an id; write the value itself. |
| `slide_context` | string | yes |  | Slide Context. The content or topic for the slide to be generated. |
| `additionalInstructions` | string | no |  | Additional Instructions. Extra instructions for how the slide should be generated. |
| `slide_order` | string | no |  | Slide Order. The position to insert the new slide (e.g., "0" for the first slide, "end" to add at the end). |
| `includeAiImages` | boolean | no | `true` | Include AI Images. Whether to include AI-generated images in the slide. |
| `imageStyle` | string | no |  | Image Style. The style for AI-generated images. |

### `deletePresentation`

**Delete Presentation.** Permanently delete an Alai presentation by its ID. Use this to remove a deck the user no longer needs. Destructive but idempotent: once deleted, repeating the call with the same ID leaves the same end state. Requires the presentation ID. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `presentationId` | string | yes |  | Presentation ID. The ID of the presentation to delete. |

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

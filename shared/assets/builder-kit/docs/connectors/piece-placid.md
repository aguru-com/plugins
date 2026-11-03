# Placid

Creative automation engine that generates dynamic images, PDFs, and videos from templates and data.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-placid'
  version: '0.2.0'
```

Categories: CONTENT_AND_FILES, MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> To obtain your Placid API token:
>
> 1. Log in to [placid.app](https://placid.app/login).
> 2. Go to Projects overview.
> 3. Select your desired project.
> 4. Click "API Tokens" in the left menu.
> 5. Copy your API token.
>
> The token is project-specific and will only work with templates from that project.

## Actions

### `create_image`

**Create Image.** Render a dynamic image from a Placid template by filling its layers with provided data; choose this to produce a rendered image asset from a template. Requires a template UUID. By default the render is queued and returns immediately; enabling create_now blocks and polls until the image finishes. Not idempotent — each call queues a new render job. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template` | string | yes |  | Template. Select a Placid template for image generation. A value the product loads from the provider, such as an id; write the value itself. |
| `layers` | object | no |  | Layers. An object whose fields depend on other inputs; the product shows them. |
| `outputDpi` | string | no |  | Output DPI. One of `72`, `150`, `300`. |
| `outputFilename` | string | no |  | Output File Name. |
| `webhook_success` | string | no |  | Webhook URL. Optional webhook URL to receive notification when generation is complete. |
| `create_now` | boolean | no | `false` | Create Now. Whether to create the image immediately (synchronous) or queue it (asynchronous). |
| `passthrough` | string | no |  | Passthrough Text. |

### `create_pdf`

**Create PDF.** Render a PDF document from a Placid template by filling its layers with provided data; choose this to produce a PDF asset from a template. Requires a template UUID. By default the render is queued and returns immediately; enabling create_now blocks and polls until the PDF finishes. Not idempotent — each call queues a new render job. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template` | string | yes |  | Template. Select a Placid template for pdf generation. A value the product loads from the provider, such as an id; write the value itself. |
| `layers` | object | no |  | Layers. An object whose fields depend on other inputs; the product shows them. |
| `outputDpi` | string | no |  | Output DPI. One of `96`, `150`, `300`. |
| `outputFilename` | string | no |  | Output File Name. |
| `webhook_success` | string | no |  | Webhook URL. Optional webhook URL to receive notification when generation is complete. |
| `create_now` | boolean | no | `false` | Create Now. Whether to create the image immediately (synchronous) or queue it (asynchronous). |
| `passthrough` | string | no |  | Passthrough Text. |

### `create_video`

**Create Video.** Render a video from a Placid template by filling its layers with provided data; choose this to produce a rendered video asset from a template. Requires a template UUID. By default the render is queued and returns immediately; enabling create_now blocks and polls until the video finishes. Not idempotent — each call queues a new render job. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template` | string | yes |  | Template. Select a Placid template for video generation. A value the product loads from the provider, such as an id; write the value itself. |
| `layers` | object | no |  | Layers. An object whose fields depend on other inputs; the product shows them. |
| `outputFps` | number | no | `25` | Output FPS. |
| `outputFilename` | string | no |  | Output File Name. |
| `webhook_success` | string | no |  | Webhook URL. Optional webhook URL to receive notification when generation is complete. |
| `create_now` | boolean | no | `false` | Create Now. Whether to create the image immediately (synchronous) or queue it (asynchronous). |
| `passthrough` | string | no |  | Passthrough Text. |

### `convert_file_to_url`

**Convert File to URL.** Upload a file to Placid and get back a hosted media URL that can be passed into template layers (e.g. as an image source). Use this before a create action when you need to reference local file content by URL. Requires a file input; may need a paid Placid plan. Not idempotent — each call uploads the file as a new media object. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The file to convert to a URL. Files are not supported; an action that needs one fails. |
| `filename` | string | no |  | Filename. Optional custom filename for the uploaded file. |

### `get_image`

**Get Image.** Look up a previously created Placid image by its ID to read its current status and download URL. Use this to poll a queued render to completion or fetch the result of an earlier Create Image call. Requires the image ID. Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `imageId` | string | yes |  | Image ID. The ID of the image to retrieve. |

### `get_pdf`

**Get PDF.** Look up a previously created Placid PDF by its ID to read its current status and download URL. Use this to poll a queued render to completion or fetch the result of an earlier Create PDF call. Requires the PDF ID. Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pdfId` | string | yes |  | PDF ID. The ID of the PDF to retrieve. |

### `get_video`

**Get Video.** Look up a previously created Placid video by its ID to read its current status and download URL. Use this to poll a queued render to completion or fetch the result of an earlier Create Video call. Requires the video ID. Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoId` | string | yes |  | Video ID. The ID of the video to retrieve. |

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

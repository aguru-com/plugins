# VLM Run

VLM Run is a visual AI platform that extracts data from images, videos, audio, and documents. It helps automate analysis workflows, such as object detection, transcription, image/audio analysis, and document parsing.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-vlm-run'
  version: '0.2.0'
```

Categories: BUSINESS_INTELLIGENCE, CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your VLM Run API Key

## Actions

### `analyzeAudio`

**Analyze Audio.** Transcribe or extract features from an audio file using VLM Run; uploads the file then runs an audio-transcription prediction. Choose this to get text/transcription from spoken audio. Requires an MP3 audio file as input; each call launches a new prediction job and polls until complete, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `audio` | file | yes |  | Audio File. The audio file to get the transcription from. Only MP3 supported. Files are not supported; an action that needs one fails. |

### `analyzeImage`

**Analyze Image.** Analyze an image (passed as a file or URL) with VLM Run, selecting an analysis domain that switches the task between classification, captioning, TV-news parsing, or visual Q&A. Choose this for any single-image visual understanding need. The domain input is required and determines what is extracted; each call launches a new prediction job and polls until complete, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `image` | string | yes |  | Image File. The image file to be analyzed. |
| `domain` | string | yes |  | Domain. The specific analysis domain for the image. One of `"image.classification"`, `"image.caption"`, `"image.tv-news"`, `"image.q-and-a"`. |

### `analyzeDocument`

**Analyze Document.** Extract structured data or text from a document with VLM Run; uploads the file then runs a prediction in a chosen domain that switches the parsing schema (invoice, receipt, resume, bank statement, utility bill, US driver license, markdown, generic classification, or document Q&A). Choose this to turn PDFs/DOCX and similar files into structured fields. The domain input is required and determines the output fields; each call launches a new prediction job and polls until complete, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `document` | file | yes |  | Document File. The document file to be analyzed. Files are not supported; an action that needs one fails. |
| `domain` | string | yes |  | Domain. The specific analysis domain for the document. One of `"document.bank-statement"`, `"document.classification"`, `"document.invoice"`, `"document.markdown"`, `"document.q-and-a"`, `"document.receipt"`, `"document.resume"`, `"document.us-drivers-license"`, `"document.utility-bill"`. |

### `analyzeVideo`

**Analyze Video.** Analyze a video with VLM Run; uploads the file then runs a prediction in a chosen domain that switches the task between full transcription, various summaries (transcription, product-demo, conferencing, podcast, or general), and dashcam analytics. Choose this for transcription or content understanding of video. The domain input is required and determines the analysis performed; each call launches a new prediction job and polls until complete, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `video` | file | yes |  | Video File. The video file to be analyzed. Files are not supported; an action that needs one fails. |
| `domain` | string | yes |  | Domain. The specific analysis domain for the video. One of `"video.transcription"`, `"video.transcription-summary"`, `"video.product-demo-summary"`, `"video.conferencing-summary"`, `"video.podcast-summary"`, `"video.summary"`, `"video.dashcam-analytics"`. |

### `getFile`

**Get File.** Retrieve the metadata for a previously uploaded VLM Run file by its file ID. Choose this to look up details of a file already stored in the account. Read-only lookup, so it is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileId` | string | yes |  | File. Select a file to retrieve its details. A value the product loads from the provider, such as an id; write the value itself. |

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

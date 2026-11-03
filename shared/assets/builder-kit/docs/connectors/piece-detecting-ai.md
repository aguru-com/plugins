# DETECTING-AI.COM

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-detecting-ai'
  version: '0.1.0'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> You can obtain your API key from the [DETECTING-AI.COM Dashboard](https://detecting-ai.com) in the API section.

## Actions

### `detect_ai_content`

**Detect AI Content.** Analyzes a block of text and scores how likely it was AI-generated, using the DetectingAI detection API. Use to verify whether submitted or scraped content is human-written vs. machine-generated. Requires the text to check; a detection-model version (v1 or v2) can be selected. Read-only analysis — calling it again with the same text returns the same assessment without side effects. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. |
| `version` | string | yes | `"v2"` | Version. One of `"v1"`, `"v2"`. |

### `check_plagiarism`

**Check Plagiarism.** Scans a block of text against the DetectingAI plagiarism API to find matching or copied passages from external sources. Use to verify originality of submitted or generated content. Requires the text to check. Read-only analysis — repeating the call with the same text returns the same result with no side effects. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. |

### `humanize_text`

**Humanize Text.** Rewrites a block of text via the DetectingAI humanize API to read as more natural and less machine-generated, typically to reduce AI-detection scores. Use to transform AI-drafted content into a more human-sounding version. Requires the text and a rewriting model (cognia or lexi). Not idempotent — each call regenerates the text, so repeating it produces a different rewrite. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. |
| `model` | string | yes | `"lexi"` | Model. One of `"cognia"`, `"lexi"`. |

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

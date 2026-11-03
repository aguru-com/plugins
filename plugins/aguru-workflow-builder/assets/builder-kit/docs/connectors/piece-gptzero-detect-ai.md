# GPTZero

Detect AI-generated text with GPTZero API

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-gptzero-detect-ai'
  version: '0.1.8'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: GPTZero API Key

> https://app.gptzero.me/app/api to get your API key

## Actions

### `scanFile`

**Scan File.** Submits a document file to GPTZero to estimate how likely its text was AI-generated, returning per-document and per-sentence detection scores. Choose this over Scan Text when the content lives in a file (the file must be passed as a File input, not a path or URL). Read-only analysis: re-running on the same file is safe and yields the same result. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The file to scan for AI-generated content. Files are not supported; an action that needs one fails. |

### `scanText`

**Scan Text.** Submits a raw text string to GPTZero to estimate how likely it was AI-generated, returning per-document and per-sentence detection scores. Choose this when you already have the text inline; use Scan File instead when the content is in a file. Read-only analysis: re-running with the same text is safe and yields the same result. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. The text content to scan for AI-generated content. |

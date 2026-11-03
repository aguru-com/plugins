# Gistly

YouTube Transcripts

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-gistly'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE, DEVELOPER_TOOLS, CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To obtain your free Gistly API Key, sign up at [Gistly](https://gist.ly/youtube-transcript-api) and then copy the key available in the [dashboard](https://api-portal.gist.ly/).

## Actions

### `get_transcript`

**Get Transcript.** Retrieves the transcript/captions of a YouTube video from its URL via the Gistly API. Use this to get the spoken text of a video for summarizing, searching, or analysis. Set the Merge Text option to return one continuous text block, or leave it off to get timestamped chunks. Read-only and idempotent — fetching the same URL returns the same transcript. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | YouTube URL. |
| `text` | boolean | no | `true` | Merge Text. If true, the transcript will be merged into a single text instead of timestamped chunks. |

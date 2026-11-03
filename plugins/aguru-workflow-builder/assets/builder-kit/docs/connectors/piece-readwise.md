# Readwise

Save and retrieve your highlights from Readwise — your reading notes, all in one place.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-readwise'
  version: '0.2.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Access Token

> Your Readwise access token. Get it at https://readwise.io/access_token

## Actions

### `get_highlights`

**Get Highlights.** Lists highlights from the connected Readwise account. With no filters it returns all highlights (paginated); set book_id to scope to one source or updated_after to fetch only highlights changed since a timestamp. Use when an agent needs to read or search existing highlights. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `book_id` | string | no |  | Book. The book or article to filter highlights by. A value the product loads from the provider, such as an id; write the value itself. |
| `updated_after` | ISO date-time string | no |  | Updated After. Return only highlights updated after this date. |
| `page_size` | number | no | `100` | Page Size. Number of highlights to return per page (max 1000). |
| `page` | number | no |  | Page. Which page of results to return (starts at 1). |

### `create_highlight`

**Create Highlight.** Saves a new highlight to the connected Readwise account, optionally attaching source metadata (title, author, URL, category) and a note. Use when an agent needs to capture a passage or quote into Readwise. Only the highlight text is required; not idempotent — each call appends a new highlight. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Highlight Text. The text you want to save as a highlight. |
| `title` | string | no |  | Source Title. Title of the book, article, or source. |
| `author` | string | no |  | Author. Author of the source. |
| `source_url` | string | no |  | Source URL. URL of the article or webpage. |
| `source_type` | string | no |  | Source Type. An identifier for your app/source, e.g. "my_app" (3–64 chars, no spaces). |
| `category` | string | no | `"articles"` | Category. Type of source. One of `"articles"`, `"books"`, `"tweets"`, `"podcasts"`. |
| `note` | string | no |  | Note. Optional note to attach to the highlight. |
| `location` | number | no |  | Location. Position of the highlight in the source. |
| `location_type` | string | no |  | Location Type. How the location above is measured. One of `"page"`, `"location"`, `"order"`, `"offset"`, `"time_offset"`, `"none"`. |
| `image_url` | string | no |  | Image URL. Cover image for the source. |
| `highlight_url` | string | no |  | Highlight URL. A unique URL that links directly to this highlight. |
| `highlighted_at` | ISO date-time string | no |  | Highlighted At. Date when the highlight was made (defaults to now). |

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

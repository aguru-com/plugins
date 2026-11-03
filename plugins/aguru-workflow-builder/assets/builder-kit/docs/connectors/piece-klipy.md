# Klipy

Search and retrieve GIFs, stickers, and video clips from KLIPY's media library.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-klipy'
  version: '0.1.0'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: App Key

> To get your App Key:
> 1. Sign in to your KLIPY account at https://klipy.com
> 2. Go to your dashboard and open **API Settings**
> 3. Copy your **App Key**
>
> The App Key is a unique identifier issued by KLIPY for your application.

## Actions

### `search_gifs`

**Search GIFs.** Searches KLIPY's GIF library and returns a paginated set of matching GIFs. Use when an agent needs to find GIFs for a topic; leave the search keyword empty to browse trending GIFs instead of filtering to a query. Read-only and idempotent (same input returns the same page). Tune results with paging, locale, content-safety filter, and format filter. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `q` | string | no |  | Search Keyword. The keyword or phrase to search for (e.g. "hello", "happy birthday"). Leave empty to browse trending GIFs. |
| `page` | number | no | `1` | Page Number. Which page of results to return. Starts at 1. |
| `per_page` | number | no | `24` | Results Per Page. Number of GIFs to return per page. Must be between 8 and 50. |
| `locale` | string | no |  | Locale. ISO 3166-1 Alpha-2 country code to boost results for a specific region (e.g. "us", "uk", "de"). Leave empty for global results. |
| `content_filter` | string | no | `"medium"` | Content Filter. Set the content safety level for the results. One of `"high"`, `"medium"`, `"low"`, `"off"`. |
| `format_filter` | string | no |  | Format Filter. Comma-separated list of formats to include in results. Possible values: gif, webp, jpg, mp4, webm. Leave empty to include all formats. |
| `customer_id` | string | no |  | User ID. A unique identifier for the end user in your system. Used to personalize results. Keep this consistent for the same user. |

### `search_stickers`

**Search Stickers.** Searches KLIPY's sticker library and returns a paginated set of matching stickers. Use when an agent needs to find stickers for a topic; leave the search keyword empty to browse trending stickers instead of filtering to a query. Read-only and idempotent (same input returns the same page). Tune results with paging, locale, content-safety filter, and format filter. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `q` | string | no |  | Search Keyword. The keyword or phrase to search for (e.g. "love", "thumbs up"). Leave empty to browse trending stickers. |
| `page` | number | no | `1` | Page Number. Which page of results to return. Starts at 1. |
| `per_page` | number | no | `24` | Results Per Page. Number of stickers to return per page. Must be between 8 and 50. |
| `locale` | string | no |  | Locale. ISO 3166-1 Alpha-2 country code to boost results for a specific region (e.g. "us", "uk", "de"). Leave empty for global results. |
| `content_filter` | string | no | `"medium"` | Content Filter. Set the content safety level for the results. One of `"high"`, `"medium"`, `"low"`, `"off"`. |
| `format_filter` | string | no |  | Format Filter. Comma-separated list of formats to include in results. Possible values: gif, webp, png, webm. Leave empty to include all formats. |
| `customer_id` | string | no |  | User ID. A unique identifier for the end user in your system. Used to personalize results. Keep this consistent for the same user. |

### `search_clips`

**Search Clips.** Searches KLIPY's video clip library and returns a paginated set of matching clips. Use when an agent needs to find short video clips for a topic; leave the search keyword empty to browse trending clips instead of filtering to a query. Read-only and idempotent (same input returns the same page). Tune results with paging, locale, and content-safety filter. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `q` | string | no |  | Search Keyword. The keyword or phrase to search for (e.g. "funny cat", "celebration"). Leave empty to browse trending clips. |
| `page` | number | no | `1` | Page Number. Which page of results to return. Starts at 1. |
| `per_page` | number | no | `24` | Results Per Page. Number of clips to return per page. Must be between 8 and 50. |
| `locale` | string | no |  | Locale. ISO 3166-1 Alpha-2 country code to boost results for a specific region (e.g. "us", "uk", "de"). Leave empty for global results. |
| `content_filter` | string | no | `"medium"` | Content Filter. Set the content safety level for the results. One of `"high"`, `"medium"`, `"low"`, `"off"`. |
| `customer_id` | string | no |  | User ID. A unique identifier for the end user in your system. Used to personalize results. Keep this consistent for the same user. |

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

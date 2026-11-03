# Raindrop

Bookmark manager to save, search, and organize content from the web

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-raindrop'
  version: '0.1.2'
```

Categories: PRODUCTIVITY, CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `create_raindrop`

**Create Bookmark.** Creates a new bookmark (raindrop) in Raindrop.io from a URL, optionally setting title, excerpt, note, tags, target collection, and favourite flag. Use to save a web page to a user's account. The URL is required; if no title is given Raindrop auto-extracts it from the page. Not idempotent: each call adds another bookmark, even for a URL already saved. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `link` | string | yes |  | URL. The URL of the page to bookmark. |
| `title` | string | no |  | Title. Custom title for the bookmark. If left empty, Raindrop will extract it from the URL automatically. |
| `excerpt` | string | no |  | Excerpt. Short description or summary of the page. |
| `note` | string | no |  | Note. Personal note to attach to this bookmark. |
| `collection_id` | string | no |  | Collection. Select the collection to use. Leave empty to use "Unsorted" (default inbox). A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | no |  | Tags. List of tags to organize the bookmark (press Enter to add each tag) |
| `important` | boolean | no | `false` | Mark as Favourite. Mark this bookmark as important / favourite. |

### `get_raindrop`

**Get Bookmark.** Fetches a single Raindrop.io bookmark by its numeric ID. Use when you already have a bookmark ID and need its full details (title, link, tags, collection, etc.); to locate bookmarks by keyword or collection instead, use Find Bookmarks. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `raindrop_id` | string | yes |  | Bookmark ID. The numeric ID of the bookmark. You can find it in the URL when viewing the bookmark in Raindrop.io (e.g. raindrop.io/app/raindrop/123456789). |

### `update_raindrop`

**Update Bookmark.** Updates an existing Raindrop.io bookmark identified by its numeric ID, changing any of title, excerpt, note, tags, collection, or favourite flag. Only supplied fields are changed; supplying tags replaces the existing tag list. Idempotent: repeating the same update yields the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `raindrop_id` | string | yes |  | Bookmark ID. The numeric ID of the bookmark to update. You can find it in the URL when viewing the bookmark in Raindrop.io (e.g. raindrop.io/app/raindrop/123456789). |
| `title` | string | no |  | New Title. Updated title for the bookmark. |
| `excerpt` | string | no |  | New Excerpt. Updated short description or summary of the page. |
| `note` | string | no |  | New Note. Updated personal note attached to the bookmark. |
| `collection_id` | string | no |  | Collection. Select the collection to use. Leave empty to use "Unsorted" (default inbox). A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | no |  | Tags. New list of tags (replaces existing tags). Leave empty to keep existing tags unchanged. |
| `important` | boolean | no |  | Mark as Favourite. Mark or unmark this bookmark as important / favourite. |

### `delete_raindrop`

**Delete Bookmark.** Moves a Raindrop.io bookmark, identified by its numeric ID, to the trash (a soft delete; emptying the trash in Raindrop.io is a separate manual step). Use to remove a bookmark from a user's active collections. Not idempotent: a repeat call on an already-trashed or missing ID errors rather than no-ops. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `raindrop_id` | string | yes |  | Bookmark ID. The numeric ID of the bookmark to delete. You can find it in the URL when viewing the bookmark in Raindrop.io (e.g. raindrop.io/app/raindrop/123456789). |

### `find_raindrops`

**Find Bookmarks.** Lists bookmarks from a Raindrop.io collection, sorted newest-first. Operates in two modes: with an empty search it returns all bookmarks in the collection, and with a search query it filters by keyword (supporting operators like #tag or type:article). Defaults to a collection covering all bookmarks when none is chosen; returns up to 50 per call. Use to discover bookmark IDs or browse saved content. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection_id` | string | no |  | Collection. Select the collection to use. Leave empty to use "Unsorted" (default inbox). A value the product loads from the provider, such as an id; write the value itself. |
| `search` | string | no |  | Search Query. Filter bookmarks by keyword. Supports operators like #tag or type:article. Leave empty to list all bookmarks. |
| `limit` | number | no | `25` | Limit. Maximum number of bookmarks to return (max 50) |

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

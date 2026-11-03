# Hacker News

A social news website

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-hackernews'
  version: '0.5.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `fetch_top_stories`

**Fetch Top Stories.** Retrieves the current top stories from Hacker News, returning the first N stories (N set by the number-of-stories input) with their full item details. Use to surface or summarize what is trending on Hacker News right now. Read-only and idempotent; a larger N simply fetches more of the same ranked list.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `number_of_stories` | number | yes |  | Number of Stories. |

Output fields:

- `[].id`: Item ID (number)
- `[].type`: Type
- `[].title`: Title
- `[].url`: URL (url)
- `[].by`: Author
- `[].score`: Score (number)
- `[].descendants`: Comment Count (number)
- `[].time`: Created (Unix Time) (number)
- `[].kids`: Comment IDs

### `hackernews_list_top_stories`

**List Top Stories.** Returns the current Hacker News front-page ranking (up to 500 ranked stories, including job posts), with full details for the first `limit` stories (default 10, max 100). Use for "what is trending on Hacker News now". Use Get Item with a story id from here to read a single story again later.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. How many stories to return, from the top of the list (1-100). Defaults to 10. |

Output fields:

- `stories`: Stories
- `stories[].id`: Item ID (number)
- `stories[].type`: Type
- `stories[].title`: Title
- `stories[].url`: URL (url)
- `stories[].text`: Text (html)
- `stories[].author`: Author
- `stories[].score`: Score (number)
- `stories[].comment_count`: Comment Count (number)
- `stories[].created_at`: Created At (datetime)
- `stories[].time`: Created (Unix Time) (number)
- `stories[].parent_id`: Parent ID (number)
- `stories[].poll_id`: Poll ID (number)
- `stories[].kid_ids`: Comment IDs
- `stories[].part_ids`: Poll Option IDs
- `stories[].dead`: Dead (boolean)
- `stories[].deleted`: Deleted (boolean)
- `stories[].hn_url`: Hacker News URL (url)
- `count`: Count (number)

### `hackernews_list_new_stories`

**List New Stories.** Returns the newest Hacker News stories, newest first (up to 500), with full details for the first `limit` stories (default 10, max 100). Use to see what was just submitted, before it is ranked. Use Get Item with a story id from here to read a single story again later.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. How many stories to return, from the top of the list (1-100). Defaults to 10. |

Output fields:

- `stories`: Stories
- `stories[].id`: Item ID (number)
- `stories[].type`: Type
- `stories[].title`: Title
- `stories[].url`: URL (url)
- `stories[].text`: Text (html)
- `stories[].author`: Author
- `stories[].score`: Score (number)
- `stories[].comment_count`: Comment Count (number)
- `stories[].created_at`: Created At (datetime)
- `stories[].time`: Created (Unix Time) (number)
- `stories[].parent_id`: Parent ID (number)
- `stories[].poll_id`: Poll ID (number)
- `stories[].kid_ids`: Comment IDs
- `stories[].part_ids`: Poll Option IDs
- `stories[].dead`: Dead (boolean)
- `stories[].deleted`: Deleted (boolean)
- `stories[].hn_url`: Hacker News URL (url)
- `count`: Count (number)

### `hackernews_list_best_stories`

**List Best Stories.** Returns the highest-voted recent Hacker News stories (up to 500), with full details for the first `limit` stories (default 10, max 100). Use for the strongest recent stories rather than the live front page. Use Get Item with a story id from here to read a single story again later.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. How many stories to return, from the top of the list (1-100). Defaults to 10. |

Output fields:

- `stories`: Stories
- `stories[].id`: Item ID (number)
- `stories[].type`: Type
- `stories[].title`: Title
- `stories[].url`: URL (url)
- `stories[].text`: Text (html)
- `stories[].author`: Author
- `stories[].score`: Score (number)
- `stories[].comment_count`: Comment Count (number)
- `stories[].created_at`: Created At (datetime)
- `stories[].time`: Created (Unix Time) (number)
- `stories[].parent_id`: Parent ID (number)
- `stories[].poll_id`: Poll ID (number)
- `stories[].kid_ids`: Comment IDs
- `stories[].part_ids`: Poll Option IDs
- `stories[].dead`: Dead (boolean)
- `stories[].deleted`: Deleted (boolean)
- `stories[].hn_url`: Hacker News URL (url)
- `count`: Count (number)

### `hackernews_list_ask_stories`

**List Ask Stories.** Returns the latest Ask HN posts (up to 200), with full details for the first `limit` stories (default 10, max 100). Use for community questions; the question body is in text. Use Get Item with a story id from here to read a single story again later.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. How many stories to return, from the top of the list (1-100). Defaults to 10. |

Output fields:

- `stories`: Stories
- `stories[].id`: Item ID (number)
- `stories[].type`: Type
- `stories[].title`: Title
- `stories[].url`: URL (url)
- `stories[].text`: Text (html)
- `stories[].author`: Author
- `stories[].score`: Score (number)
- `stories[].comment_count`: Comment Count (number)
- `stories[].created_at`: Created At (datetime)
- `stories[].time`: Created (Unix Time) (number)
- `stories[].parent_id`: Parent ID (number)
- `stories[].poll_id`: Poll ID (number)
- `stories[].kid_ids`: Comment IDs
- `stories[].part_ids`: Poll Option IDs
- `stories[].dead`: Dead (boolean)
- `stories[].deleted`: Deleted (boolean)
- `stories[].hn_url`: Hacker News URL (url)
- `count`: Count (number)

### `hackernews_list_show_stories`

**List Show Stories.** Returns the latest Show HN posts (up to 200), with full details for the first `limit` stories (default 10, max 100). Use for projects people are launching or demoing. Use Get Item with a story id from here to read a single story again later.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. How many stories to return, from the top of the list (1-100). Defaults to 10. |

Output fields:

- `stories`: Stories
- `stories[].id`: Item ID (number)
- `stories[].type`: Type
- `stories[].title`: Title
- `stories[].url`: URL (url)
- `stories[].text`: Text (html)
- `stories[].author`: Author
- `stories[].score`: Score (number)
- `stories[].comment_count`: Comment Count (number)
- `stories[].created_at`: Created At (datetime)
- `stories[].time`: Created (Unix Time) (number)
- `stories[].parent_id`: Parent ID (number)
- `stories[].poll_id`: Poll ID (number)
- `stories[].kid_ids`: Comment IDs
- `stories[].part_ids`: Poll Option IDs
- `stories[].dead`: Dead (boolean)
- `stories[].deleted`: Deleted (boolean)
- `stories[].hn_url`: Hacker News URL (url)
- `count`: Count (number)

### `hackernews_list_job_stories`

**List Job Stories.** Returns the latest job posts from YC companies (up to 200), with full details for the first `limit` stories (default 10, max 100). Use to find hiring posts; most have a url or a text body, not comments. Use Get Item with a story id from here to read a single story again later.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. How many stories to return, from the top of the list (1-100). Defaults to 10. |

Output fields:

- `stories`: Stories
- `stories[].id`: Item ID (number)
- `stories[].type`: Type
- `stories[].title`: Title
- `stories[].url`: URL (url)
- `stories[].text`: Text (html)
- `stories[].author`: Author
- `stories[].score`: Score (number)
- `stories[].comment_count`: Comment Count (number)
- `stories[].created_at`: Created At (datetime)
- `stories[].time`: Created (Unix Time) (number)
- `stories[].parent_id`: Parent ID (number)
- `stories[].poll_id`: Poll ID (number)
- `stories[].kid_ids`: Comment IDs
- `stories[].part_ids`: Poll Option IDs
- `stories[].dead`: Dead (boolean)
- `stories[].deleted`: Deleted (boolean)
- `stories[].hn_url`: Hacker News URL (url)
- `count`: Count (number)

### `hackernews_get_item`

**Get Item.** Fetches one Hacker News item (story, comment, job, poll or poll option) by its numeric id. Ids come from the List … Stories actions, from kid_ids / parent_id of another item, from Get User, or from Get Updates. To read a discussion, call this on the ids in kid_ids; it does not return nested comments.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `itemId` | number | yes |  | Item ID. The numeric id of the item, e.g. 8863. |

Output fields:

- `id`: Item ID (number)
- `type`: Type
- `title`: Title
- `url`: URL (url)
- `text`: Text (html)
- `author`: Author
- `score`: Score (number)
- `comment_count`: Comment Count (number)
- `created_at`: Created At (datetime)
- `time`: Created (Unix Time) (number)
- `parent_id`: Parent ID (number)
- `poll_id`: Poll ID (number)
- `kid_ids`: Comment IDs
- `part_ids`: Poll Option IDs
- `dead`: Dead (boolean)
- `deleted`: Deleted (boolean)
- `hn_url`: Hacker News URL (url)

### `hackernews_get_max_item_id`

**Get Max Item ID.** Returns the largest item id on Hacker News, i.e. the most recently created story, comment or job. Item ids are sequential, so counting down from this id walks every new item; pass an id to Get Item to read it.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `max_item_id`: Max Item ID (number)

### `hackernews_get_updates`

**Get Updates.** Returns the ids of recently changed items and the usernames of recently changed profiles on Hacker News. Use it to monitor activity; pass the ids to Get Item and the usernames to Get User for details.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `item_ids`: Changed Item IDs
- `profiles`: Changed Usernames
- `item_count`: Changed Item Count (number)
- `profile_count`: Changed Profile Count (number)

### `hackernews_get_user`

**Get User.** Fetches a Hacker News user profile: karma, about text, signup date and their most recent submission ids (up to 100, newest first, with the full count). Usernames are case-sensitive and come from the author field of an item. Only users with public activity exist.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Username. The case-sensitive Hacker News username, e.g. "pg". |

Output fields:

- `username`: Username
- `karma`: Karma (number)
- `about`: About (html)
- `created_at`: Created At (datetime)
- `created`: Created (Unix Time) (number)
- `submitted_count`: Submission Count (number)
- `recent_submission_ids`: Recent Submission IDs
- `hn_url`: Hacker News URL (url)

### `custom_api_call`

**Custom API Call.** Make a custom API call to a specific endpoint.

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

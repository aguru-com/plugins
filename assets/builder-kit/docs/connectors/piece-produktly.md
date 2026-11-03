# Produktly

Onboarding, in-app announcements, feedback collection and NPS for SaaS products.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-produktly'
  version: '0.1.1'
```

Categories: PRODUCTIVITY, MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> **How to get your Produktly API key:**
>
> 1. Sign in to your [Produktly dashboard](https://produktly.com).
> 2. Open **Settings → [API keys](https://produktly.com/app/settings/private-keys)**.
> 3. Click **Generate API Key**, give it a name (e.g. "Activepieces") and copy the key.
> 4. Paste the key below.
>
> **Important:** Treat the key like a password — anyone with it can read and write your Produktly data. The same key works for both REST and MCP.

## Actions

### `list_changelogs`

**List Changelogs.** List every changelog in the Produktly account with its name, active state, and creation date, paginated with limit and offset. Pick this to discover changelog IDs before reading or writing posts; use List Changelog Posts for the announcements inside one changelog. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `50` | Limit. Maximum number of changelogs to return (1-100, default 50). |
| `offset` | number | no | `0` | Offset. Number of changelogs to skip for pagination (default 0). |

### `list_changelog_posts`

**List Changelog Posts.** List the posts inside one Produktly changelog, paginated with limit and offset and optionally narrowed to a release-date range. Pick this to read announcements in a known changelog or to resolve a post ID for Update Changelog Post; use List Changelogs first to find the changelog itself. Requires a changelog ID. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `changelog` | string | yes |  | Changelog. The changelog the post belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no | `50` | Limit. Maximum number of posts to return (1-100, default 50). |
| `offset` | number | no | `0` | Offset. Number of posts to skip for pagination (default 0). |
| `start_date` | string | no |  | Start Date. Optional ISO 8601 date (e.g. 2024-01-01) to filter posts from. |
| `end_date` | string | no |  | End Date. Optional ISO 8601 date (e.g. 2024-12-31) to filter posts up to. |

### `create_changelog_post`

**Create Changelog Post.** Create a post inside a specific Produktly changelog, with an optional body, release date, active/hidden state, and a list of tag names that must already exist (resolve them with List Tags). Pick this to announce a release to end users; use Update Changelog Post to revise an announcement that already exists. Requires a changelog ID and a title. Not idempotent: each call creates a new post, even with identical content. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `changelog` | string | yes |  | Changelog. The changelog the post belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. The headline shown to users (e.g. "New: Dark mode is here"). |
| `description` | string | no |  | Description. The body of the post. Supports plain text or HTML. |
| `date` | string | no |  | Date. Optional release date in ISO 8601 format (e.g. 2024-12-15). Defaults to today. |
| `active` | boolean | no | `true` | Active. If enabled, the post is visible to your users immediately. |
| `tag_names` | array | no |  | Tag Names. Optional list of tag names to attach. Must match existing tags (use "List Tags" to find them). |

### `update_changelog_post`

**Update Changelog Post.** Partially update one existing post in a Produktly changelog: any of title, body, release date, active/hidden visibility, or the full tag list, leaving omitted fields untouched. Pick this to revise, publish, or unpublish an announcement that already exists; use Create Changelog Post for a new one. Requires both the changelog ID and the post ID (resolve it with List Changelog Posts), and any supplied tag names must already exist. Idempotent: repeating the same call converges on the same post state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `changelog` | string | yes |  | Changelog. The changelog the post belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `post_id` | string | yes |  | Post ID. The ID of the post to update. Use "List Changelog Posts" to find it. |
| `title` | string | no |  | Title. New title for the post. Leave empty to keep the current one. |
| `description` | string | no |  | Description. New body for the post. Leave empty to keep the current one. |
| `date` | string | no |  | Date. New release date in ISO 8601 format. Leave empty to keep the current one. |
| `active` | boolean | no |  | Active. Toggle whether the post is visible to users. |
| `tag_names` | array | no |  | Tag Names. Replace the list of tags on the post. Must match existing tags (use "List Tags" to find them). |

### `list_feedback_widgets`

**List Feedback Widgets.** List every feedback widget configured in the Produktly account with its name, active state, and creation date, paginated with limit and offset. Pick this to discover widget IDs before pulling submissions with List Feedback Responses; use List NPS Widgets for the rating-based NPS surveys instead. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `50` | Limit. Maximum number of widgets to return (1-100, default 50). |
| `offset` | number | no | `0` | Offset. Number of widgets to skip for pagination (default 0). |

### `list_feedback_responses`

**List Feedback Responses.** List the responses submitted to one Produktly feedback widget, each with its reaction type, chosen option, free-text message, and submitter name, email, and originating page; paginated with limit and offset and optionally narrowed to a submission-date range. Pick this to pull collected feedback on demand; use the New Feedback Response trigger to act as submissions arrive. Requires a feedback widget ID (discover one with List Feedback Widgets). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `widget` | string | yes |  | Feedback Widget. The feedback widget to read responses from. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no | `50` | Limit. Maximum number of responses to return (1-100, default 50). |
| `offset` | number | no | `0` | Offset. Number of responses to skip for pagination (default 0). |
| `start_date` | string | no |  | Start Date. Optional ISO 8601 date to filter responses from (e.g. 2024-01-01). |
| `end_date` | string | no |  | End Date. Optional ISO 8601 date to filter responses up to (e.g. 2024-12-31). |

### `list_roadmaps`

**List Roadmaps.** List every public roadmap in the Produktly account with its internal and public name, active state, custom domain, and section and item counts, paginated with limit and offset. Pick this to discover roadmap IDs or compare roadmaps at a glance; use Get Roadmap when you need the actual sections, items, tags, and vote counts. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `50` | Limit. Maximum number of roadmaps to return (1-100, default 50). |
| `offset` | number | no | `0` | Offset. Number of roadmaps to skip for pagination (default 0). |

### `get_roadmap`

**Get Roadmap.** Fetch one Produktly public roadmap by ID, expanded into its sections and their individual items with vote counts, tags, and last-updated timestamps. Pick this when you need the contents of a known roadmap; use List Roadmaps first to discover roadmap IDs or when section and item counts alone are enough. Requires a roadmap ID. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roadmap` | string | yes |  | Roadmap. The public roadmap to inspect. A value the product loads from the provider, such as an id; write the value itself. |

### `list_nps_widgets`

**List NPS Widgets.** List every NPS widget in the Produktly account with its name, active state, and creation date, paginated with limit and offset. Pick this to discover widget IDs before calling Get NPS Score or List NPS Responses; use List Feedback Widgets for the non-NPS feedback surveys instead. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `50` | Limit. Maximum number of widgets to return (1-100, default 50). |
| `offset` | number | no | `0` | Offset. Number of widgets to skip for pagination (default 0). |

### `get_nps_score`

**Get NPS Score.** Fetch the aggregated Net Promoter Score for one Produktly NPS widget, with promoter, passive, and detractor counts and percentages, optionally restricted to a start/end date window. Pick this when you want the computed score; use List NPS Responses when you need the individual ratings and free-text comments behind it. Requires an NPS widget ID (discover one with List NPS Widgets). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `widget` | string | yes |  | NPS Widget. The NPS widget to read responses from. A value the product loads from the provider, such as an id; write the value itself. |
| `start_date` | string | no |  | Start Date. Optional ISO 8601 date to limit the score to responses from this date onward (e.g. 2024-01-01). |
| `end_date` | string | no |  | End Date. Optional ISO 8601 date to limit the score to responses up to this date (e.g. 2024-12-31). |

### `list_nps_responses`

**List NPS Responses.** List the individual NPS submissions for one Produktly NPS widget, each with its rating, free-text comment, and submitter name, email, user ID, and page URL; paginated with limit and offset and optionally narrowed to a submission-date range. Pick this when you need the raw responses; use Get NPS Score for the aggregated score and promoter/detractor breakdown. Requires an NPS widget ID. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `widget` | string | yes |  | NPS Widget. The NPS widget to read responses from. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no | `50` | Limit. Maximum number of responses to return (1-100, default 50). |
| `offset` | number | no | `0` | Offset. Number of responses to skip for pagination (default 0). |
| `start_date` | string | no |  | Start Date. Optional ISO 8601 date to filter responses from (e.g. 2024-01-01). |
| `end_date` | string | no |  | End Date. Optional ISO 8601 date to filter responses up to (e.g. 2024-12-31). |

### `list_tags`

**List Tags.** List the tags defined in the Produktly account that can label changelog posts, with their display colours, paginated with limit and offset. Pick this to resolve valid tag names before Create Changelog Post or Update Changelog Post, which only accept tags that already exist. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `50` | Limit. Maximum number of tags to return (1-100, default 50). |
| `offset` | number | no | `0` | Offset. Number of tags to skip for pagination (default 0). |

### `get_company_stats`

**Get Company Stats.** Fetch one account-wide statistics summary covering every Produktly feature (tours, checklists, smart tips, announcements, changelogs, NPS widgets, roadmaps), for an optional start/end date window; omit both dates to use the API default period, which also reports the preceding comparison period. Pick this for a cross-feature rollup; use Get Widget Stats when you need per-entity event counts for a single feature type. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `start_date` | string | no |  | Start Date. Optional ISO 8601 date for the start of the period (e.g. 2024-01-01). |
| `end_date` | string | no |  | End Date. Optional ISO 8601 date for the end of the period (e.g. 2024-12-31). |

### `get_widget_stats`

**Get Widget Stats.** Fetch event and unique-user statistics for one Produktly feature type (product tour, checklist, smart tip, announcement, changelog, NPS widget, or roadmap), either across every entity of that type or narrowed to a single entity ID, over an optional start/end date window. Pick this for per-entity engagement numbers; use Get Company Stats for the account-wide rollup across all features. Requires an entity type. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entity_type` | string | yes |  | Entity Type. The Produktly feature to get stats for. One of `"tour"`, `"checklist"`, `"smartTip"`, `"announcement"`, `"changelog"`, `"npsWidget"`, `"roadmap"`. |
| `entity_id` | number | no |  | Entity ID. Optional. Filter stats to a single entity of the chosen type (e.g. a specific changelog ID). |
| `start_date` | string | no |  | Start Date. Optional ISO 8601 date for the start of the period (e.g. 2024-01-01). |
| `end_date` | string | no |  | End Date. Optional ISO 8601 date for the end of the period (e.g. 2024-12-31). |

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

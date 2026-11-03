# Canny

Product feedback management platform. Collect, organize, and prioritize feature requests from your users.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-canny'
  version: '0.2.2'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Canny secret API key. Find it at Settings → API in your Canny admin dashboard.

## Actions

### `create_post`

**Create Post.** Creates a new feedback post (feature request, bug, etc.) on a Canny board. Use to submit feedback captured elsewhere into Canny. Requires a board ID, an author Canny user ID, a title, and details; creates a distinct post on each call (not idempotent). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `boardID` | string | yes |  | Board. The board to use. A value the product loads from the provider, such as an id; write the value itself. |
| `authorID` | string | yes |  | Author ID. The unique identifier of the post author (Canny user ID). |
| `title` | string | yes |  | Title. A brief title describing the post. |
| `details` | string | yes |  | Details. The longer description of the post. |
| `byID` | string | no |  | By ID. The unique identifier of the admin creating the post on behalf of the author. |
| `categoryID` | string | no |  | Category ID. The unique identifier of the category to assign. |
| `ownerID` | string | no |  | Owner ID. The unique identifier of the user responsible for completing the work. |
| `eta` | string | no |  | ETA. The estimated delivery date in MM/YYYY format (e.g. "06/2026"). |
| `etaPublic` | boolean | no |  | ETA Public. Whether the ETA should be visible to all users. |
| `customFields` | object | no |  | Custom Fields. Custom fields as key-value pairs (keys max 30 chars, values max 200 chars). |
| `createdAt` | string | no |  | Created At. Original creation date in ISO 8601 format, for migrating posts from another source. |

### `retrieve_post`

**Retrieve Post.** Looks up a single Canny post by its unique post ID and returns its full details. Use when you already have a post ID and need its current data (status, score, author, board). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Post ID. The unique identifier of the post. |

### `list_posts`

**List Posts.** Lists Canny posts, optionally scoped to one board or queried across all boards when no board is given, with optional search text, status filter, sort order, and pagination (limit/skip). Use to discover or search posts rather than fetch one known post by ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `boardID` | string | no |  | Board. The board to list posts for (optional — omit to list across all boards). A value the product loads from the provider, such as an id; write the value itself. |
| `search` | string | no |  | Search. A search query to filter posts. |
| `sort` | string | no |  | Sort. The order of returned posts. One of `"newest"`, `"oldest"`, `"score"`, `"trending"`, `"statusChanged"`. |
| `status` | string | no |  | Status. Comma-separated list of statuses to filter by (e.g. "open,planned"). |
| `limit` | number | no |  | Limit. Number of posts to fetch (default 10). |
| `skip` | number | no |  | Skip. Number of posts to skip (for pagination). |

### `create_vote`

**Create Vote.** Registers a vote on a Canny post on behalf of a specific user. Use to record support for a feature request when acting as that voter. Requires the post ID and the voter Canny user ID. Effectively idempotent: re-voting the same user on the same post does not add duplicate votes. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `postID` | string | yes |  | Post ID. The unique identifier of the post to vote on. |
| `voterID` | string | yes |  | Voter ID. The unique identifier of the voter (Canny user ID). |

### `delete_vote`

**Delete Vote.** Removes a specific user's vote from a Canny post. Use to retract support previously registered for a post. Requires the post ID and the voter Canny user ID. Idempotent: removing an already-absent vote leaves the post in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `postID` | string | yes |  | Post ID. The unique identifier of the post to remove the vote from. |
| `voterID` | string | yes |  | Voter ID. The unique identifier of the voter (Canny user ID). |

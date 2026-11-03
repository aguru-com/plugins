# Hedy

AI-powered meeting intelligence – be the brightest person in the room.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-hedy'
  version: '0.2.5'
```

Categories: PRODUCTIVITY, ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect your Hedy account using an API key from Settings → API.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. Generate an API key from your Hedy dashboard under Settings → API, then paste the key here (it begins with `hedy_live_`). |
| `region` | string | no | `"us"` | Region. Select EU if your Hedy account uses EU data residency. One of `"us"`, `"eu"`. |

## Actions

### `get-session`

**Get Session.** Fetch a single Hedy meeting session by its ID (must be prefixed with "sess_"). Use when you already have a session ID and need its details. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sessionId` | string | yes |  | Session ID. The session ID as shown in the Hedy dashboard. |

### `list-sessions`

**List Sessions.** List Hedy meeting sessions, optionally filtered to a single topic. Use to discover sessions or find a session ID when you do not already have one; leave the topic filter empty to fetch across all topics. Set Return All to page through every result, otherwise results are capped by the limit. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `returnAll` | boolean | no | `false` | Return All. Return all results instead of using the limit. |
| `limit` | number | no | `50` | Limit. Maximum number of results to return (default 50). |
| `format` | string | no | `"standard"` | Response Format. Select the response format to use. One of `"standard"`, `"zapier"`. |
| `topicId` | string | no |  | Topic. Optionally filter results by a specific topic. A value the product loads from the provider, such as an id; write the value itself. |
| `after` | string | no |  | After Cursor. Pagination cursor used to fetch results after a specific item. |
| `before` | string | no |  | Before Cursor. Pagination cursor used to fetch results before a specific item. |

### `get-highlight`

**Get Highlight.** Fetch a single Hedy highlight by its ID (must be prefixed with "high_"). Use when you already have a highlight ID and need its content. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `highlightId` | string | yes |  | Highlight ID. The highlight ID as shown in the Hedy dashboard. |

### `list-highlights`

**List Highlights.** List highlights across Hedy sessions, optionally filtered to a single topic; leave the topic filter empty to fetch across all topics. Use to browse highlights when you do not have a specific session in mind (use List Session Highlights to scope to one session). Set Return All to page through everything, otherwise results are capped by the limit. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `returnAll` | boolean | no | `false` | Return All. Return all results instead of using the limit. |
| `limit` | number | no | `50` | Limit. Maximum number of results to return (default 50). |
| `format` | string | no | `"standard"` | Response Format. Select the response format to use. One of `"standard"`, `"zapier"`. |
| `topicId` | string | no |  | Topic. Optionally filter results by a specific topic. A value the product loads from the provider, such as an id; write the value itself. |
| `after` | string | no |  | After Cursor. Pagination cursor used to fetch results after a specific item. |
| `before` | string | no |  | Before Cursor. Pagination cursor used to fetch results before a specific item. |

### `list-session-highlights`

**List Session Highlights.** List the highlights captured during one specific Hedy session, identified by a session ID (must be prefixed with "sess_"). Use when you have a session and want only its highlights, rather than browsing all highlights. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sessionId` | string | yes |  | Session ID. The session ID as shown in the Hedy dashboard. |
| `returnAll` | boolean | no | `false` | Return All. Return all results instead of using the limit. |
| `limit` | number | no | `50` | Limit. Maximum number of results to return (default 50). |

### `get-todo`

**Get Todo.** Fetch a single todo from a Hedy session by its ID. Requires both the owning session ID (prefixed "sess_") and the todo ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sessionId` | string | yes |  | Session ID. The session ID as shown in the Hedy dashboard. |
| `todoId` | string | yes |  | Todo ID. The todo ID. |

### `list-todos`

**List Todos.** List the todos assigned to the authenticated Hedy user across all sessions. Use for an account-wide todo view; use List Session Todos to scope to one session. Set Return All to fetch everything, otherwise results are capped by the limit. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `returnAll` | boolean | no | `false` | Return All. Return all results instead of using the limit. |
| `limit` | number | no | `50` | Limit. Maximum number of results to return (default 50). |

### `list-session-todos`

**List Session Todos.** List the todos generated for one specific Hedy session, identified by a session ID (must be prefixed with "sess_"). Use when you have a session and want only its todos, rather than the account-wide list. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sessionId` | string | yes |  | Session ID. The session ID as shown in the Hedy dashboard. |
| `returnAll` | boolean | no | `false` | Return All. Return all results instead of using the limit. |
| `limit` | number | no | `50` | Limit. Maximum number of results to return (default 50). |

### `get-topic`

**Get Topic.** Fetch a single Hedy topic by its ID (must be prefixed with "topic_"). Use when you already have a topic ID and need its details. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topicId` | string | yes |  | Topic ID. The topic ID as shown in the Hedy dashboard. |

### `list-topics`

**List Topics.** List all topics in the Hedy workspace. Use to discover topics or find a topic ID before filtering sessions/highlights or updating a topic. Set Return All to fetch everything, otherwise results are capped by the limit. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `returnAll` | boolean | no | `false` | Return All. Return all results instead of using the limit. |
| `limit` | number | no | `50` | Limit. Maximum number of results to return (default 50). |

### `list-topic-sessions`

**List Topic Sessions.** List the sessions assigned to one specific Hedy topic, identified by a topic ID (must be prefixed with "topic_"). Use when you want sessions scoped to a known topic; use List Sessions for an unscoped or cross-topic view. Set Return All to page through everything, otherwise results are capped by the limit. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topicId` | string | yes |  | Topic ID. The topic ID as shown in the Hedy dashboard. |
| `returnAll` | boolean | no | `false` | Return All. Return all results instead of using the limit. |
| `limit` | number | no | `50` | Limit. Maximum number of results to return (default 50). |

### `create-topic`

**Create Topic.** Create a new Hedy topic for organizing sessions, with a required name plus optional description, color, icon, and AI processing instructions. Not idempotent: each call creates a separate topic even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Name of the topic (max 100 characters). |
| `description` | string | no |  | Description. Description of the topic (max 500 characters). |
| `color` | string | no |  | Color. Hex color code for the topic (e.g. #4A90D9). |
| `iconName` | string | no |  | Icon Name. Material icon name (e.g. groups). |
| `topicContext` | string | no |  | Topic Context. Custom instructions for AI processing of sessions in this topic (max 20,000 characters). |

### `update-topic`

**Update Topic.** Update fields on an existing Hedy topic identified by a topic ID (must be prefixed with "topic_"); only the fields you provide are changed, and at least one must be supplied. Idempotent: repeating the same update leaves the topic in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topicId` | string | yes |  | Topic ID. The topic ID as shown in the Hedy dashboard. |
| `name` | string | no |  | Name. New name for the topic (max 100 characters). |
| `description` | string | no |  | Description. Description of the topic (max 500 characters). |
| `color` | string | no |  | Color. Hex color code for the topic. |
| `iconName` | string | no |  | Icon Name. Material icon name. |
| `topicContext` | string | no |  | Topic Context. Custom instructions for AI processing (max 20,000 characters). Leave empty to clear. |

### `delete-topic`

**Delete Topic.** Permanently delete a Hedy topic identified by a topic ID (must be prefixed with "topic_"). Idempotent in effect: once deleted, repeating the call leaves the topic absent (a repeat may error if the topic no longer exists). Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topicId` | string | yes |  | Topic ID. The topic ID as shown in the Hedy dashboard. |

### `create-context`

**Create Session Context.** Create a new Hedy session context (a reusable set of AI instructions applied to sessions), with a required title plus optional content and a default flag. Not idempotent: each call creates a separate context even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. Title of the session context (max 200 characters). |
| `content` | string | no |  | Content. Instructions or context for AI analysis (max 20,000 characters). |
| `isDefault` | boolean | no | `false` | Is Default. Whether this context should be the default for new sessions. |

### `get-context`

**Get Session Context.** Fetch a single Hedy session context by its ID (must be prefixed with "ctx_"). Use when you already have a context ID and need its details. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contextId` | string | yes |  | Context ID. The session context ID. |

### `list-contexts`

**List Session Contexts.** List all Hedy session contexts in the account. Use to discover contexts or find a context ID before getting, updating, or deleting one. Set Return All to fetch everything, otherwise results are capped by the limit. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `returnAll` | boolean | no | `false` | Return All. Return all results instead of using the limit. |
| `limit` | number | no | `50` | Limit. Maximum number of results to return (default 50). |

### `update-context`

**Update Session Context.** Update fields on an existing Hedy session context identified by a context ID (must be prefixed with "ctx_"); only the fields you provide are changed, and at least one must be supplied. Idempotent: repeating the same update leaves the context in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contextId` | string | yes |  | Context ID. The session context ID. |
| `title` | string | no |  | Title. New title for the session context (max 200 characters). |
| `content` | string | no |  | Content. Instructions or context for AI analysis (max 20,000 characters). |
| `isDefault` | boolean | no |  | Is Default. Whether this context should be the default for new sessions. |

### `delete-context`

**Delete Session Context.** Permanently delete a Hedy session context identified by a context ID (must be prefixed with "ctx_"). Idempotent in effect: once deleted, repeating the call leaves the context absent (a repeat may error if the context no longer exists). Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contextId` | string | yes |  | Context ID. The session context ID. |

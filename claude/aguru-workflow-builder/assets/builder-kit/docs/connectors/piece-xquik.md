# Xquik

Search public X/Twitter posts, users, timelines, and trends for automation workflows.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-xquik'
  version: '0.1.1'
```

Categories: BUSINESS_INTELLIGENCE, MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Xquik API Key

> Create an API key in Xquik, then paste it here. API docs: https://docs.xquik.com/api-reference/overview

## Actions

### `search_tweets`

**Search Tweets.** Searches public X/Twitter posts matching a query, which supports keywords, hashtags, exact phrases, from:user, and X search operators. Use to find posts on a topic; set the result type to fetch the latest posts or top engagement-ranked ones, and optionally bound results by a time window. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Search query. Supports keywords, hashtags, from:user, exact phrases, and X search operators. |
| `queryType` | string | no | `"Latest"` | Result Type. Return latest posts or top engagement-ranked posts. One of `"Latest"`, `"Top"`. |
| `limit` | number | no | `20` | Limit. Maximum posts to return. Use 1-200. |
| `cursor` | string | no |  | Cursor. Pagination cursor from a previous response. |
| `sinceTime` | ISO date-time string | no |  | Since Time. Only return posts after this ISO timestamp. |
| `untilTime` | ISO date-time string | no |  | Until Time. Only return posts before this ISO timestamp. |

### `get_tweet`

**Get Tweet.** Retrieves a single public X/Twitter post by its numeric post ID. Use when you already have a tweet ID and need its full details. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tweetId` | string | yes |  | Tweet ID. Numeric X/Twitter post ID. |

### `search_users`

**Search Users.** Searches public X/Twitter user accounts by name, username, brand, or keyword. Use to discover or disambiguate accounts before fetching a specific user or their posts. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Name, username, brand, or keyword to search for. |
| `cursor` | string | no |  | Cursor. Pagination cursor from a previous response. |

### `get_user`

**Get User.** Retrieves a single public X/Twitter user profile, identified either by username (with or without the @) or by numeric user ID. Use to resolve an account to its profile details. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | string | yes |  | User. Username with or without @, or a numeric user ID. |

### `get_user_tweets`

**Get User Tweets.** Lists a public X/Twitter user's recent timeline posts, identified by username (with or without the @) or numeric user ID. Use to read an account's activity; replies and parent-post context can optionally be included. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | string | yes |  | User. Username with or without @, or a numeric user ID. |
| `cursor` | string | no |  | Cursor. Pagination cursor from a previous response. |
| `includeReplies` | boolean | no | `false` | Include Replies. Include reply posts in the timeline response. |
| `includeParentTweet` | boolean | no | `false` | Include Parent Tweet. Include parent post context when available. |

### `get_trends`

**Get Trends.** Fetches current X/Twitter trending topics for a region, selected via a Yahoo WOEID (default 1 for worldwide). Use to see what is trending in a given location. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `woeid` | number | no | `1` | WOEID. Yahoo Where On Earth ID. Use 1 for worldwide, 23424977 for US, 23424975 for UK, or 23424969 for Turkey. |
| `count` | number | no | `30` | Count. Number of trends to return. Use 1-50. |

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

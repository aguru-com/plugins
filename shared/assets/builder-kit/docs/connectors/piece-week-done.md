# Weekdone

Goal-setting and progress tracking software that helps teams align their objectives and key results (OKRs).

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-week-done'
  version: '0.1.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Weekdone OAuth2 Authentication

## Actions

### `search_items`

**Search Items.** List/search Weekdone items (OKR plans, progress, problems, etc.), optionally narrowing by user, team, and reporting period; leave the filters empty to retrieve all accessible items. Use to find an item or its ID before acting on it. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | no |  | User. A value the product loads from the provider, such as an id; write the value itself. |
| `team_id` | string | no |  | Team. A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | no |  | Period. |

### `create_item`

**Create Item.** Create a new Weekdone item (a progress, plan, problem, or other typed entry) for a user/team within a reporting period. Requires a description and a type ID. Not idempotent; each call adds a distinct item. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `description` | string | yes |  | Description. |
| `team_id` | string | no |  | Team. A value the product loads from the provider, such as an id; write the value itself. |
| `type_id` | string | yes |  | Type. A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | no |  | Period. |
| `user_id` | string | no |  | User. A value the product loads from the provider, such as an id; write the value itself. |
| `priority` | string | no |  | Priority. One of `0`, `1`, `2`, `3`. |
| `source_id` | string | no |  | Source ID. |
| `due_on` | string | no |  | Due Date. |
| `private` | string | no |  | Visibility. One of `0`, `1`. |

### `update_item`

**Update Item.** Update an existing Weekdone item by its ID, changing fields such as description, type, priority, or due date; the user/team/period filters only help locate the item. Note that changing the type requires also supplying the period. Mutates the target item, so not idempotent across differing inputs. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | no |  | User (Filter). A value the product loads from the provider, such as an id; write the value itself. |
| `team_id` | string | no |  | Team (Filter). A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | no |  | Period (Filter). |
| `item_id` | string | yes |  | Item. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. |
| `type_id` | string | no |  | Type. A value the product loads from the provider, such as an id; write the value itself. |
| `update_period` | string | no |  | Period (Required when updating Type). |
| `priority` | string | no |  | Priority. One of `0`, `1`, `2`, `3`. |
| `due_on` | string | no |  | Due Date. |

### `assign_item`

**Assign Item.** Reassign an existing Weekdone item to a different user by item ID; the user/team/period filters only help locate the item. Requires the target item and the assignee user ID. Mutates the item, so not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id_filter` | string | no |  | User (Filter). A value the product loads from the provider, such as an id; write the value itself. |
| `team_id` | string | no |  | Team (Filter). A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | no |  | Period (Filter). |
| `item_id` | string | yes |  | Item. A value the product loads from the provider, such as an id; write the value itself. |
| `assignee_user_id` | string | yes |  | Assign To. A value the product loads from the provider, such as an id; write the value itself. |

### `delete_item`

**Delete Item.** Permanently delete a Weekdone item by its ID; the user/team/period filters only help locate the item. Destructive and not reversible. Not idempotent: a repeat call fails once the item is gone. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id_filter` | string | no |  | User (Filter). A value the product loads from the provider, such as an id; write the value itself. |
| `team_id` | string | no |  | Team (Filter). A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | no |  | Period (Filter). |
| `item_id` | string | yes |  | Item. A value the product loads from the provider, such as an id; write the value itself. |

### `get_item_likes`

**Get Item Likes.** Retrieve the list of likes on a specific Weekdone item by its ID; the user/team/period filters only help locate the item. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id_filter` | string | no |  | User (Filter). A value the product loads from the provider, such as an id; write the value itself. |
| `team_id` | string | no |  | Team (Filter). A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | no |  | Period (Filter). |
| `item_id` | string | yes |  | Item. A value the product loads from the provider, such as an id; write the value itself. |

### `add_item_like`

**Add Item Like.** Add a like (from the authenticated user) to a Weekdone item identified by its ID; the user/team/period filters only help locate the item. Mutates the item, so not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id_filter` | string | no |  | User (Filter). A value the product loads from the provider, such as an id; write the value itself. |
| `team_id` | string | no |  | Team (Filter). A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | no |  | Period (Filter). |
| `item_id` | string | yes |  | Item. A value the product loads from the provider, such as an id; write the value itself. |

### `delete_item_like`

**Delete Item Like.** Remove the authenticated user's like from a Weekdone item identified by its ID; the user/team/period filters only help locate the item. Mutates the item, so not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id_filter` | string | no |  | User (Filter). A value the product loads from the provider, such as an id; write the value itself. |
| `team_id` | string | no |  | Team (Filter). A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | no |  | Period (Filter). |
| `item_id` | string | yes |  | Item. A value the product loads from the provider, such as an id; write the value itself. |

### `get_item_comments`

**Get Item Comments.** Retrieve the comments on a specific Weekdone item by its ID; the user/team/period filters only help locate the item. Use to read discussion or to find a comment ID before deleting one. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id_filter` | string | no |  | User (Filter). A value the product loads from the provider, such as an id; write the value itself. |
| `team_id` | string | no |  | Team (Filter). A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | no |  | Period (Filter). |
| `item_id` | string | yes |  | Item. A value the product loads from the provider, such as an id; write the value itself. |

### `add_item_comment`

**Add Item Comment.** Post a new comment on a Weekdone item identified by its ID; the user/team/period filters only help locate the item. Requires the comment text. Not idempotent; each call appends a distinct comment. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id_filter` | string | no |  | User (Filter). A value the product loads from the provider, such as an id; write the value itself. |
| `team_id` | string | no |  | Team (Filter). A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | no |  | Period (Filter). |
| `item_id` | string | yes |  | Item. A value the product loads from the provider, such as an id; write the value itself. |
| `comment` | string | yes |  | Comment. |

### `delete_item_comment`

**Delete Item Comment.** Delete a specific comment from a Weekdone item, identified by both the item ID and the comment ID; the user/team/period filters only help locate the item. Destructive. Not idempotent: a repeat call fails once the comment is gone. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id_filter` | string | no |  | User (Filter). A value the product loads from the provider, such as an id; write the value itself. |
| `team_id` | string | no |  | Team (Filter). A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | no |  | Period (Filter). |
| `item_id` | string | yes |  | Item. A value the product loads from the provider, such as an id; write the value itself. |
| `comment_id` | string | yes |  | Comment. A value the product loads from the provider, such as an id; write the value itself. |

### `sort_items`

**Sort Items.** Reorder the Weekdone items of a given type within a team and reporting period by supplying the full ordered list of item IDs. Requires type, period, the desired ID order, and any one item ID from the list (used in the request URL). Mutates the stored ordering, so not idempotent across differing inputs. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `team_id` | string | no |  | Team. A value the product loads from the provider, such as an id; write the value itself. |
| `type_id` | string | yes |  | Type. A value the product loads from the provider, such as an id; write the value itself. |
| `period` | string | yes |  | Period. |
| `item_id` | string | yes |  | Any Item From This List. Weekdone requires an item ID in the URL to sort the list. A value the product loads from the provider, such as an id; write the value itself. |
| `list` | array | yes |  | Item IDs (in order). |

### `get_company_info`

**Get Company Info.** Retrieve the authenticated account's Weekdone company configuration and settings. Takes no input. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

No inputs.

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

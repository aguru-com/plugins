# Notion

The all-in-one workspace

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-notion'
  version: '0.7.5'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

### `CUSTOM_AUTH`: Access Token

> 1. Open [My integrations](https://www.notion.so/my-integrations) and create an internal integration.
> 2. Copy its Internal Integration Secret and paste it below.
> 3. In Notion, open each page or database you want to use and share it with the integration.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accessToken` | string | yes |  | Internal Integration Secret. |

## Actions

### `list_databases`

**List Databases.** Lists Notion databases the connected account can access, sorted by last edited time. Use when an agent needs to discover available databases before querying or writing items; supports pagination via cursor. Idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `10` | Limit. How many databases to return, up to 100. |
| `cursor` | string | no |  | Cursor. Next-page cursor from a previous run's output. |

### `create_database_item`

**Create Database Item.** Creates a new row (page) in a specific Notion database, setting its property fields and optionally appending body content. Use when an agent must add a structured record (task, contact, ticket) to a known database; requires the target database_id and field values matching that database schema. Not idempotent: each call creates a separate item, so guard against duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database_id` | string | yes |  | Database. Only databases shared with your integration are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `databaseFields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |
| `content` | string | no |  | Content. Plain text added to the item's page body. |

Output fields:

- `url`: Page URL (url)
- `id`: Page ID
- `created_time`: Created Time (datetime)
- `last_edited_time`: Last Edited Time (datetime)
- `object`: Object
- `parent`: Parent
- `parent.type`: Type
- `parent.database_id`: Database ID
- `properties`: Raw Properties (an object whose keys vary)
- `created_by`: Created By
- `created_by.id`: User ID
- `is_archived`: Is Archived (boolean)

### `update_database_item`

**Update Database Item.** Overwrites property fields on an existing Notion database item identified by its page id. Use when an agent must change values on a known record (status, assignee, dates) rather than create one; requires the database_id and the target item id. Idempotent: re-applying the same field values leaves the item in the same final state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database_id` | string | yes |  | Database. Only databases shared with your integration are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `database_item_id` | string | yes |  | Database Item. Items in the selected database, listed by title. A value the product loads from the provider, such as an id; write the value itself. |
| `databaseFields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `url`: Page URL (url)
- `id`: Page ID
- `last_edited_time`: Last Edited Time (datetime)
- `created_time`: Created Time (datetime)
- `is_archived`: Is Archived (boolean)
- `is_locked`: Is Locked (boolean)
- `properties`: Raw Properties (an object whose keys vary)
- `parent`: Parent
- `parent.database_id`: Database ID
- `parent.type`: Type
- `created_by.id`: Created By User ID
- `last_edited_by.id`: Last Edited By User ID

### `notion-find-database-item`

**Find Database Item.** Queries a Notion database for items whose property values match the given filter fields (combined with AND). Use when an agent needs to look up existing records by field value before reading or updating them; requires the database_id and at least one filter field matching the database schema. Idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database_id` | string | yes |  | Database. Only databases shared with your integration are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `filterDatabaseFields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `success`: Success (boolean)
- `results`: Results
- `results[].id`: Page ID
- `results[].url`: URL (url)
- `results[].created_time`: Created Time (datetime)
- `results[].last_edited_time`: Last Edited Time (datetime)
- `results[].parent.database_id`: Database ID
- `results[].properties`: Raw Properties (an object whose keys vary)

### `list_database_pages`

**List Pages.** Queries pages in a specific Notion database, optionally filtering by property values (combined with AND), and returns paginated results. Use when an agent needs to browse or enumerate database records rather than find a single item; requires database_id. Idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database_id` | string | yes |  | Database. Only databases shared with your integration are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no | `10` | Limit. How many pages to return, up to 100. |
| `cursor` | string | no |  | Cursor. Next-page cursor from a previous run's output. |
| `filterDatabaseFields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

### `createPage`

**Create Page.** Creates a new standalone page nested under an existing parent page, with a title and optional body content. Use when an agent must add free-form document pages (notes, docs) rather than database rows; requires the parent page id. Not idempotent: each call creates a new page even with identical title. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Parent Page. The new page is created inside this page. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. |
| `content` | string | no |  | Content. Plain text body. Markdown is not rendered. |

Output fields:

- `url`: Page URL (url)
- `id`: Page ID
- `object`: Object Type
- `created_time`: Created Time (datetime)
- `last_edited_time`: Last Edited Time (datetime)
- `is_archived`: Is Archived (boolean)
- `is_locked`: Is Locked (boolean)
- `in_trash`: In Trash (boolean)
- `parent`: Parent
- `parent.type`: Parent Type
- `parent.page_id`: Parent Page ID
- `created_by`: Created By
- `created_by.id`: User ID
- `last_edited_by`: Last Edited By
- `last_edited_by.id`: User ID

### `append_to_page`

**Append to Page.** Appends new block content (parsed from markdown) to the end of an existing Notion page or block. Use when an agent must add to a page without altering existing content; requires the target page/block id. Not idempotent: each call appends again, duplicating the content on repeat. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page. Your 100 most recently edited pages shared with the integration. A value the product loads from the provider, such as an id; write the value itself. |
| `content` | string | yes |  | Content. Markdown is rendered into Notion blocks. |

Output fields:

- `results`: Appended Blocks
- `results[].type`: Block Type
- `results[].id`: Block ID
- `results[].has_children`: Has Children (boolean)
- `results[].created_time`: Created Time (datetime)
- `results[].last_edited_time`: Last Edited Time (datetime)
- `results[].parent.page_id`: Parent Page ID
- `results[].archived`: Archived (boolean)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor
- `request_id`: Request ID

### `getPageOrBlockChildren`

**Get Block Content.** Reads the body content of a Notion page or block by recursively listing its child blocks, optionally rendered as markdown. Use when an agent needs to read what is actually written inside a page (text, nested blocks) rather than its metadata; requires the page or parent block id. Idempotent read-only fetch. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parentId` | string | yes |  | Page or Block ID. Paste the ID, or map a page from a previous step. |
| `markdown` | boolean | no | `false` | Markdown. Return the content as Markdown instead of blocks. |
| `dynamic` | object | yes |  | Dynamic Properties. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `[].type`: Type
- `[].paragraph.rich_text[0].plain_text`: Paragraph Text
- `[].heading_2.rich_text[0].plain_text`: Heading 2 Text
- `[].bulleted_list_item.rich_text[0].plain_text`: Bulleted List Item Text
- `[].child_database.title`: Child Database Title
- `[].id`: Block ID
- `[].has_children`: Has Children (boolean)
- `[].parent.page_id`: Parent Page ID
- `[].created_time`: Created Time (datetime)
- `[].last_edited_time`: Last Edited Time (datetime)
- `[].archived`: Archived (boolean)

### `archive_database_item`

**Archive Database Item.** Soft-deletes a Notion database item by setting its archived flag, keeping it recoverable via Restore. Use when an agent must remove a record from active views without permanent deletion; requires the database_id and item id. Idempotent: archiving an already-archived item leaves it archived. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database_id` | string | yes |  | Database. Only databases shared with your integration are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `database_item_id` | string | yes |  | Database Item. Items in the selected database, listed by title. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `archivedItem`: Archived Item
- `archivedItem.title`: Title
- `archivedItem.url`: URL (url)
- `archivedItem.archived_at`: Archived At (datetime)
- `archivedItem.id`: ID
- `fullResponse`: Full Response
- `fullResponse.url`: URL (url)
- `fullResponse.archived`: Archived (boolean)
- `fullResponse.in_trash`: In Trash (boolean)
- `fullResponse.created_time`: Created Time (datetime)
- `fullResponse.last_edited_time`: Last Edited Time (datetime)
- `fullResponse.id`: Page ID
- `fullResponse.parent.database_id`: Database ID

### `restore_database_item`

**Restore Database Item.** Un-archives a previously archived Notion database item, returning it to active status. Use when an agent must recover a record that was archived; requires the database_id and the archived item id. Idempotent: restoring an already-active item leaves it active. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database_id` | string | yes |  | Database. Only databases shared with your integration are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `archived_item_id` | string | yes |  | Archived Item. Archived items in the selected database. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `restoredItem`: Restored Item
- `restoredItem.title`: Title
- `restoredItem.url`: URL (url)
- `restoredItem.id`: Item ID
- `restoredItem.restored_at`: Restored At (datetime)
- `fullResponse`: Full Response
- `fullResponse.id`: Page ID
- `fullResponse.url`: URL (url)
- `fullResponse.is_archived`: Is Archived (boolean)
- `fullResponse.in_trash`: In Trash (boolean)
- `fullResponse.created_time`: Created Time (datetime)
- `fullResponse.last_edited_time`: Last Edited Time (datetime)
- `fullResponse.parent.database_id`: Parent Database ID

### `add_comment`

**Add Comment.** Posts a new comment thread on a Notion page. Use when an agent must leave feedback or a note on a page for collaborators; requires the page id and comment text, and the integration must have comment-insert capability. Not idempotent: each call posts a separate comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_id` | string | yes |  | Page. Your 100 most recently edited pages shared with the integration. A value the product loads from the provider, such as an id; write the value itself. |
| `comment_text` | string | yes |  | Comment Text. Posted as a new comment thread on the page. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `comment`: Comment
- `comment.id`: Comment ID
- `comment.discussion_id`: Discussion ID
- `comment.created_time`: Created Time (datetime)
- `comment.last_edited_time`: Last Edited Time (datetime)
- `comment.parent.page_id`: Parent Page ID
- `comment.created_by.id`: Created By (User ID)
- `comment.display_name.resolved_name`: Display Name
- `comment.rich_text`: Rich Text
- `comment.rich_text[].plain_text`: Plain Text
- `comment.rich_text[].text.content`: Content

### `retrieve_database`

**Retrieve Database Structure.** Retrieves a Notion database schema: its properties, field types, and select/status/relation options. Use when an agent needs to discover what fields exist and their valid values before creating, updating, or filtering items in that database; requires the database_id. Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database_id` | string | yes |  | Database. Only databases shared with your integration are listed. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `summary`: Summary
- `summary.title`: Title
- `summary.totalProperties`: Total Properties (number)
- `formStructure`: Form Structure
- `formStructure.title`: Title
- `formStructure.id`: Database ID
- `formStructure.propertyTypes`: Property Types (an object whose keys vary)
- `formStructure.selectOptions`: Select Options (an object whose keys vary)
- `formStructure.selectOptions[].name`: Name
- `formStructure.selectOptions[].color`: Color
- `formStructure.selectOptions[].id`: ID
- `database`: Database
- `database.title[0].plain_text`: Title
- `database.id`: ID
- `database.url`: URL (url)
- `database.created_time`: Created Time (datetime)
- `database.last_edited_time`: Last Edited Time (datetime)
- `database.is_inline`: Is Inline (boolean)
- `database.archived`: Archived (boolean)
- `database.parent.type`: Parent Type
- `database.properties`: Properties (an object whose keys vary)
- `database.properties.name`: Name
- `database.properties.type`: Type
- `database.properties.id`: ID

### `get_page_comments`

**Get Page Comments.** Lists all comments on a Notion page, grouped into discussion threads. Use when an agent must read existing feedback or review discussions on a page; requires the page id and the integration must have read-comments capability. Idempotent read-only lookup. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_id` | string | yes |  | Page. Your 100 most recently edited pages shared with the integration. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `totalComments`: Total Comments (number)
- `discussionCount`: Discussion Count (number)
- `allComments`: All Comments
- `allComments[].rich_text[0].plain_text`: Text
- `allComments[].display_name.resolved_name`: Author
- `allComments[].id`: Comment ID
- `allComments[].discussion_id`: Discussion ID
- `allComments[].created_time`: Created Time (datetime)
- `allComments[].last_edited_time`: Last Edited Time (datetime)
- `allComments[].created_by.id`: Created By ID
- `allComments[].parent.page_id`: Page ID
- `summary`: Summary
- `summary.totalComments`: Total Comments (number)
- `summary.discussionThreads`: Discussion Threads (number)
- `summary.standaloneComments`: Standalone Comments (number)

### `find_page`

**Find Page.** Searches the workspace for pages whose title matches a query, supporting exact or partial matching. Use when an agent needs to locate a page id by name before reading or modifying it; requires a title query and only searches pages shared with the integration. Idempotent read-only search. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. Full title, or part of it. |
| `exact_match` | boolean | no | `false` | Exact Match. Only return pages whose title equals the search exactly. |
| `limit` | number | no | `10` | Limit. How many pages to return, up to 100. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `searchTerm`: Search Term
- `exactMatch`: Exact Match (boolean)
- `totalFound`: Total Found (number)
- `returned`: Returned (number)
- `pages`: Pages
- `pages[].title`: Title
- `pages[].id`: Page ID
- `pages[].url`: URL (url)
- `pages[].archived`: Archived (boolean)
- `pages[].created_time`: Created Time (datetime)
- `pages[].last_edited_time`: Last Edited Time (datetime)
- `pages[].parent.type`: Parent Type
- `pages[].parent.database_id`: Parent Database ID
- `pages[].properties.Status.status.name`: Status
- `summary`: Summary
- `summary.matchType`: Match Type
- `summary.totalFound`: Total Found (number)
- `summary.returned`: Returned (number)
- `summary.hasMore`: Has More (boolean)

### `notion_create_page`

**Create Page.** Creates a new sub-page under an existing Notion page, with a title and optional markdown body. Use to add a free-form document page; to add a row to a database use notion_create_database_item instead. Resolve parent_page_id via notion_search. Each call creates a new page even with the same title. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent_page_id` | string | yes |  | Parent Page ID. The id of the existing page to create the new page under. Resolve via notion_search. |
| `title` | string | no |  | Title. The title of the new page. |
| `content` | string | no |  | Content. Optional body content for the page. Markdown is supported and converted to Notion blocks. |

Output fields:

- `url`: Page URL (url)
- `id`: Page ID
- `object`: Object Type
- `created_time`: Created Time (datetime)
- `last_edited_time`: Last Edited Time (datetime)
- `is_archived`: Is Archived (boolean)
- `is_locked`: Is Locked (boolean)
- `in_trash`: In Trash (boolean)
- `parent`: Parent
- `parent.type`: Parent Type
- `parent.page_id`: Parent Page ID
- `created_by`: Created By
- `created_by.id`: User ID
- `last_edited_by`: Last Edited By
- `last_edited_by.id`: User ID

### `notion_get_page`

**Get Page.** Fetches a single page's metadata and property values by id (a database row is a page — use this for either). Use when you have a page id (from notion_search) and need its current properties; to read the body blocks use notion_get_block_children. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_id` | string | yes |  | Page ID. The id of the page (or database row) to retrieve. Resolve via notion_search. |

Output fields:

- `url`: Page URL (url)
- `id`: Page ID
- `object`: Object Type
- `created_time`: Created Time (datetime)
- `last_edited_time`: Last Edited Time (datetime)
- `is_archived`: Is Archived (boolean)
- `is_locked`: Is Locked (boolean)
- `in_trash`: In Trash (boolean)
- `parent`: Parent
- `parent.type`: Parent Type
- `parent.page_id`: Parent Page ID
- `created_by`: Created By
- `created_by.id`: User ID
- `last_edited_by`: Last Edited By
- `last_edited_by.id`: User ID

### `notion_archive_page`

**Archive or Restore Page.** Archives (trashes) or restores any page or database row by id via its archived flag — set archived=true to trash, false to restore. Use for the generic "move this page to trash" verb on a raw page id; for database items selected from a dropdown use the human Archive/Restore Database Item actions. Safe to retry — re-applying the same state is a no-op. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_id` | string | yes |  | Page ID. The id of the page (or database row) to archive or restore. Resolve via notion_search. |
| `archived` | boolean | yes |  | Archived. Set to true to archive (trash) the page, false to restore it. |

Output fields:

- `url`: Page URL (url)
- `id`: Page ID
- `object`: Object Type
- `created_time`: Created Time (datetime)
- `last_edited_time`: Last Edited Time (datetime)
- `is_archived`: Is Archived (boolean)
- `is_locked`: Is Locked (boolean)
- `in_trash`: In Trash (boolean)
- `parent`: Parent
- `parent.type`: Parent Type
- `parent.page_id`: Parent Page ID
- `created_by`: Created By
- `created_by.id`: User ID
- `last_edited_by`: Last Edited By
- `last_edited_by.id`: User ID

### `notion_move_page`

**Move Page.** Moves a page under a different parent page (or into a database as a row). Use to reorganize a page by id; supply exactly one of the two parent ids (resolve via notion_search). Safe to retry — re-moving to the same parent is a no-op. Note: the API may reject re-parenting some workspace-level pages, and moving into a database requires the page's properties to match the database schema. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_id` | string | yes |  | Page ID. The id of the page to move. Resolve via notion_search. |
| `new_parent_page_id` | string | no |  | New Parent Page ID. Move the page under this page. Supply exactly one of New Parent Page ID or New Parent Database ID. |
| `new_parent_database_id` | string | no |  | New Parent Database ID. Move the page into this database as a row. Supply exactly one of New Parent Page ID or New Parent Database ID. The page properties must match the database schema. |

Output fields:

- `url`: Page URL (url)
- `id`: Page ID
- `object`: Object Type
- `created_time`: Created Time (datetime)
- `last_edited_time`: Last Edited Time (datetime)
- `is_archived`: Is Archived (boolean)
- `is_locked`: Is Locked (boolean)
- `in_trash`: In Trash (boolean)
- `parent`: Parent
- `parent.type`: Parent Type
- `parent.page_id`: Parent Page ID
- `created_by`: Created By
- `created_by.id`: User ID
- `last_edited_by`: Last Edited By
- `last_edited_by.id`: User ID

### `notion_append_to_page`

**Append Content to Page.** Appends new block content (parsed from markdown) to the end of a page or block. Use to add to a page without altering existing content; to replace a specific block's text use notion_update_block. Each call appends again, so retries duplicate the content. Notion caps each text block at 2000 chars. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `block_id` | string | yes |  | Page or Block ID. The id of the page or block to append content to. Resolve via notion_search (page) or notion_get_block_children (block). |
| `content` | string | yes |  | Content. The content to append. Markdown formatting is supported. Each resulting text block is capped at 2000 characters by Notion. |

Output fields:

- `results`: Appended Blocks
- `results[].type`: Block Type
- `results[].id`: Block ID
- `results[].has_children`: Has Children (boolean)
- `results[].created_time`: Created Time (datetime)
- `results[].last_edited_time`: Last Edited Time (datetime)
- `results[].archived`: Archived (boolean)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `notion_get_block_children`

**Get Page or Block Content.** Reads the body content of a page or block by recursively listing its child blocks, optionally rendered as markdown. Use to read what is actually written inside a page (text, nested blocks) rather than its metadata. The block_id is a page id or parent-block id (from notion_search / notion_get_page). Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `block_id` | string | yes |  | Page or Block ID. The id of the page or parent block whose content to read. Resolve via notion_search (page) or this action (child block ids). |
| `markdown` | boolean | yes | `false` | Markdown. When enabled, return the content rendered as a markdown string. When disabled, return the raw Notion block JSON tree. |
| `depth` | number | no | `1` | Depth. Recursively retrieve nested children up to this depth. Only used when Markdown is disabled. Defaults to 1. |

Output fields:

- `[].type`: Block Type
- `[].id`: Block ID
- `[].has_children`: Has Children (boolean)
- `[].created_time`: Created Time (datetime)
- `[].last_edited_time`: Last Edited Time (datetime)
- `[].archived`: Archived (boolean)

### `notion_update_block`

**Update Block Text.** Replaces the text content of a single existing block by id (resolve via notion_get_block_children). Use to edit one block's text in place; to add new blocks use notion_append_to_page. Safe to retry — re-applying the same content converges. The block_type must match the actual block's type; text is split at Notion's 2000-char-per-object cap. For to_do blocks also set checked; for code blocks set language. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `block_id` | string | yes |  | Block ID. The id of the block to update. Resolve via notion_get_block_children. |
| `content` | string | yes |  | Content. The new plain-text content for the block. Split automatically at Notion's 2000-char-per-rich-text-object cap. |
| `block_type` | string | no | `"paragraph"` | Block Type. The type of the block being updated — must match the block's actual type (see its type in notion_get_block_children). Defaults to paragraph. One of `"paragraph"`, `"heading_1"`, `"heading_2"`, `"heading_3"`, `"bulleted_list_item"`, `"numbered_list_item"`, `"to_do"`, `"quote"`, `"callout"`, `"code"`. |
| `checked` | boolean | no |  | Checked. For to_do blocks only: whether the checkbox is checked. Ignored for other block types. |
| `language` | string | no |  | Language. For code blocks only: the programming language (e.g. javascript, python). Ignored for other block types. |

Output fields:

- `type`: Block Type
- `id`: Block ID
- `has_children`: Has Children (boolean)
- `created_time`: Created Time (datetime)
- `last_edited_time`: Last Edited Time (datetime)
- `archived`: Archived (boolean)

### `notion_delete_block`

**Delete Block.** Deletes (archives) a single block by id, removing it from its page (recoverable from Notion trash). Use to remove one block resolved via notion_get_block_children; to trash a whole page use notion_archive_page. A repeat call on an already-deleted block 404s. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `block_id` | string | yes |  | Block ID. The id of the block to delete. Resolve via notion_get_block_children. |

Output fields:

- `type`: Block Type
- `id`: Block ID
- `has_children`: Has Children (boolean)
- `created_time`: Created Time (datetime)
- `last_edited_time`: Last Edited Time (datetime)
- `archived`: Archived (boolean)

### `notion_add_comment`

**Add Comment.** Posts a new comment thread on a Notion page. Use to leave feedback or a note on a page for collaborators; resolve page_id via notion_search. The integration token must have the "Insert comments" capability and the page must be shared with it. Each call posts a separate comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_id` | string | yes |  | Page ID. The id of the page to comment on. Resolve via notion_search. |
| `comment_text` | string | yes |  | Comment Text. The plain-text comment to post as a new thread on the page. |

Output fields:

- `success`: Success (boolean)
- `comment_id`: Comment ID
- `note`: Note
- `comment`: Comment
- `comment.id`: Comment ID
- `comment.discussion_id`: Discussion ID
- `comment.created_time`: Created Time (datetime)
- `comment.last_edited_time`: Last Edited Time (datetime)
- `comment.parent.page_id`: Parent Page ID
- `comment.created_by.id`: Created By (User ID)
- `comment.display_name.resolved_name`: Display Name
- `comment.rich_text`: Rich Text
- `comment.rich_text[].plain_text`: Plain Text
- `comment.rich_text[].text.content`: Content

### `notion_get_page_comments`

**Get Page Comments.** Lists all comments on a page, grouped into discussion threads. Use to read existing feedback or review discussions. Requires the "Read comments" capability and the page shared with the integration. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_id` | string | yes |  | Page ID. The id of the page whose comments to list. Resolve via notion_search. |

Output fields:

- `totalComments`: Total Comments (number)
- `pageComments`: Page Comments
- `pageComments[].id`: Comment ID
- `pageComments[].discussion_id`: Discussion ID
- `pageComments[].created_time`: Created Time (datetime)
- `pageComments[].last_edited_time`: Last Edited Time (datetime)
- `pageComments[].parent.page_id`: Parent Page ID
- `pageComments[].created_by.id`: Created By (User ID)
- `pageComments[].display_name.resolved_name`: Display Name
- `pageComments[].rich_text`: Rich Text
- `pageComments[].rich_text[].plain_text`: Plain Text
- `pageComments[].rich_text[].text.content`: Content
- `discussionThreads`: Discussion Threads (an object whose keys vary)
- `discussionThreads[].id`: Comment ID
- `discussionThreads[].discussion_id`: Discussion ID
- `discussionThreads[].created_time`: Created Time (datetime)
- `discussionThreads[].last_edited_time`: Last Edited Time (datetime)
- `discussionThreads[].parent.page_id`: Parent Page ID
- `discussionThreads[].created_by.id`: Created By (User ID)
- `discussionThreads[].display_name.resolved_name`: Display Name
- `discussionThreads[].rich_text`: Rich Text
- `discussionThreads[].rich_text[].plain_text`: Plain Text
- `discussionThreads[].rich_text[].text.content`: Content
- `discussionCount`: Discussion Count (number)

### `notion_search`

**Search Pages and Databases.** Searches the workspace by title for pages and/or databases shared with the integration, with exact or partial matching. Use this FIRST to resolve a human-readable name into a page or database id before acting on it. Only returns items shared with the integration. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. The title text (or part of it) to search for. |
| `filter_type` | string | no | `"all"` | Type Filter. Restrict results to pages, databases, or both. Defaults to both (all). One of `"page"`, `"database"`, `"all"`. |
| `exact_match` | boolean | no | `false` | Exact Match. When enabled, only return items whose title exactly equals the query. Disable for partial matching. |
| `limit` | number | no | `10` | Maximum Results. How many items to return at most (between 1 and 100). |

Output fields:

- `results`: Results
- `results[].id`: ID
- `results[].object`: Object Type
- `results[].title`: Title
- `results[].url`: URL (url)
- `results[].created_time`: Created Time (datetime)
- `results[].last_edited_time`: Last Edited Time (datetime)
- `results[].archived`: Archived (boolean)
- `count`: Count (number)

### `notion_list_users`

**List Users.** Lists the people and bots in the workspace, returning each user's id, name, and type. Use to resolve a person's name into a user id before assigning them to a People property. Requires the "Read user information" capability. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page_size` | number | no |  | Page Size. How many users to return per page (1–100). Defaults to 100. |
| `start_cursor` | string | no |  | Start Cursor. Pagination cursor from a previous call's next_cursor to fetch the next page. |

Output fields:

- `users`: Users
- `users[].id`: User ID
- `users[].name`: Name
- `users[].type`: Type
- `users[].avatar_url`: Avatar (image)
- `users[].email`: Email (email)
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `notion_get_user`

**Get User.** Fetches a single workspace user's details by id (resolve via notion_list_users). Use to confirm a user's name/type/email before referencing them. Requires the "Read user information" capability. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. The id of the workspace user to retrieve. Resolve via notion_list_users. |

Output fields:

- `id`: User ID
- `name`: Name
- `type`: Type
- `avatar_url`: Avatar (image)
- `email`: Email (email)

### `notion_get_database`

**Get Database Schema.** Retrieves a Notion database's schema: its property names, field types, and select/status/relation options. Use to discover what fields exist and their valid values before creating, updating, or filtering rows. Resolve database_id via notion_search. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database_id` | string | yes |  | Database ID. The id of the database to inspect. Resolve a database title into its id with notion_search (filter_type=database). |

Output fields:

- `success`: Success (boolean)
- `summary`: Summary
- `summary.title`: Title
- `summary.totalProperties`: Total Properties (number)
- `formStructure`: Form Structure
- `formStructure.id`: Database ID
- `formStructure.title`: Title
- `formStructure.description`: Description
- `formStructure.propertyTypes`: Property Types (an object whose keys vary)

### `notion_query_database`

**Query Database.** Queries a database using Notion's native filter and sort JSON (compound AND/OR, ranges, dates, contains — the full query surface). Use when the match is more than simple field-equals (for which use notion_find_database_item). Call notion_get_database FIRST to learn the property names and types the filter must reference. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database_id` | string | yes |  | Database ID. The id of the database to query. Resolve a database title into its id with notion_search (filter_type=database). |
| `filter` | JSON | no |  | Filter. Optional. A Notion query filter object. A single condition is { "property": "Status", "status": { "equals": "Done" } }; compound is { "and": [ ...conditions ] } or { "or": [ ...conditions ] }. The condition key MUST match the property's type (e.g. status:{equals}, select:{equals}, number:{greater_t… |
| `sorts` | JSON | no |  | Sorts. Optional. An array of Notion sort objects. Sort by a property: [{ "property": "Name", "direction": "ascending" }]; sort by a timestamp: [{ "timestamp": "last_edited_time", "direction": "descending" }]. direction is "ascending" or "descending". |
| `page_size` | number | no |  | Page Size. Maximum number of rows to return (1–100). Defaults to 100. |
| `start_cursor` | string | no |  | Start Cursor. Optional pagination cursor. Pass the next_cursor returned by a previous call to fetch the next page of results. |

Output fields:

- `success`: Success (boolean)
- `results`: Results
- `results[].url`: Page URL (url)
- `results[].id`: Page ID
- `results[].object`: Object Type
- `results[].created_time`: Created Time (datetime)
- `results[].last_edited_time`: Last Edited Time (datetime)
- `results[].is_archived`: Is Archived (boolean)
- `results[].is_locked`: Is Locked (boolean)
- `results[].in_trash`: In Trash (boolean)
- `results[].parent`: Parent
- `results[].parent.type`: Parent Type
- `results[].parent.page_id`: Parent Page ID
- `results[].created_by`: Created By
- `results[].created_by.id`: User ID
- `results[].last_edited_by`: Last Edited By
- `results[].last_edited_by.id`: User ID
- `count`: Count (number)
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `notion_create_database`

**Create Database.** Creates a new inline database under a parent PAGE (not a database), with a title and a property-schema object defining its columns. Use to set up a new structured table; resolve parent_page_id via notion_search. Exactly one property must be of the title type. Not idempotent — each call creates a distinct database. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent_page_id` | string | yes |  | Parent Page ID. The id of the PAGE the new database will live under (must be a page, not a database). Resolve it via notion_search. |
| `title` | string | yes |  | Title. The title of the new database. |
| `properties` | JSON | yes |  | Properties (Schema). A Notion property-schema object: a map of column name to a type-config object. Example: { "Name": { "title": {} }, "Status": { "select": { "options": [ { "name": "Open" }, { "name": "Done" } ] } }, "Estimate": { "number": { "format": "number" } } }. EXACTLY ONE property must be of type "title". Com… |

Output fields:

- `success`: Success (boolean)
- `database`: Database
- `database.title[0].plain_text`: Title
- `database.id`: ID
- `database.url`: URL (url)
- `database.created_time`: Created Time (datetime)
- `database.last_edited_time`: Last Edited Time (datetime)
- `database.is_inline`: Is Inline (boolean)
- `database.archived`: Archived (boolean)
- `database.parent.type`: Parent Type
- `database.properties`: Properties (an object whose keys vary)
- `database.properties.name`: Name
- `database.properties.type`: Type
- `database.properties.id`: ID

### `notion_update_database_schema`

**Update Database Schema.** Updates a database's title or column schema (add/rename/retype/remove properties) by id. Use to edit a database's STRUCTURE; to add a ROW use notion_create_database_item instead. Resolve database_id via notion_search. WARNING: removing or renaming a column is destructive to its existing row data. Safe to retry — re-applying the same schema converges. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database_id` | string | yes |  | Database ID. The id of the database whose schema to update. Resolve it via notion_search (filter_type=database). |
| `title` | string | no |  | Title. Optional. A new title for the database. |
| `properties` | JSON | no |  | Properties (Schema Changes). Optional. A Notion property-schema patch: a map of property name to a type-config object. To ADD or RETYPE a column: { "Priority": { "select": { "options": [ { "name": "High" } ] } } }. To RENAME a column, key by its current name with { "name": "New Name" }. To REMOVE a column, key by its name with… |

Output fields:

- `success`: Success (boolean)
- `database`: Database
- `database.title[0].plain_text`: Title
- `database.id`: ID
- `database.url`: URL (url)
- `database.created_time`: Created Time (datetime)
- `database.last_edited_time`: Last Edited Time (datetime)
- `database.is_inline`: Is Inline (boolean)
- `database.archived`: Archived (boolean)
- `database.parent.type`: Parent Type
- `database.properties`: Properties (an object whose keys vary)
- `database.properties.name`: Name
- `database.properties.type`: Type
- `database.properties.id`: ID

### `notion_create_database_item`

**Create Database Item.** Creates a new row (page) in a database. Supply property values as a raw Notion properties object (the same shape the API expects); call notion_get_database FIRST to learn the property names and types. Resolve database_id via notion_search. Not idempotent — each call creates a separate row, so guard against duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database_id` | string | yes |  | Database ID. The id of the database to add a row to. Resolve a database title into its id with notion_search (filter_type=database). |
| `properties` | JSON | yes |  | Properties. A Notion properties object: a map of property name to a typed value object matching the database schema. Example: { "Name": { "title": [ { "text": { "content": "My task" } } ] }, "Status": { "status": { "name": "In Progress" } }, "Estimate": { "number": 3 }, "Tags": { "multi_select": [ { "name": "u… |
| `content` | string | no |  | Content. Optional plain-text paragraph to append as the body of the new row (page). |

Output fields:

- `success`: Success (boolean)
- `item`: Item
- `item.url`: Page URL (url)
- `item.id`: Page ID
- `item.object`: Object Type
- `item.created_time`: Created Time (datetime)
- `item.last_edited_time`: Last Edited Time (datetime)
- `item.is_archived`: Is Archived (boolean)
- `item.is_locked`: Is Locked (boolean)
- `item.in_trash`: In Trash (boolean)
- `item.parent`: Parent
- `item.parent.type`: Parent Type
- `item.parent.page_id`: Parent Page ID
- `item.created_by`: Created By
- `item.created_by.id`: User ID
- `item.last_edited_by`: Last Edited By
- `item.last_edited_by.id`: User ID

### `notion_update_database_item`

**Update Database Item.** Overwrites property fields on an existing database row identified by its page id. Supply the changed values as a raw Notion properties object (only the properties you include are changed); call notion_get_database to learn names/types. Resolve the row's page id via notion_query_database or notion_find_database_item. Safe to retry — re-applying the same values converges. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item_id` | string | yes |  | Item ID. The page id of the database row to update. Resolve it via notion_query_database or notion_find_database_item. |
| `properties` | JSON | yes |  | Properties. A Notion properties object with the values to set: a map of property name to a typed value object. Only the properties you include are changed; others are left untouched. Example: { "Status": { "status": { "name": "Done" } }, "Estimate": { "number": 5 } }. Run notion_get_database first to confirm p… |

Output fields:

- `success`: Success (boolean)
- `item`: Item
- `item.url`: Page URL (url)
- `item.id`: Page ID
- `item.object`: Object Type
- `item.created_time`: Created Time (datetime)
- `item.last_edited_time`: Last Edited Time (datetime)
- `item.is_archived`: Is Archived (boolean)
- `item.is_locked`: Is Locked (boolean)
- `item.in_trash`: In Trash (boolean)
- `item.parent`: Parent
- `item.parent.type`: Parent Type
- `item.parent.page_id`: Parent Page ID
- `item.created_by`: Created By
- `item.created_by.id`: User ID
- `item.last_edited_by`: Last Edited By
- `item.last_edited_by.id`: User ID

### `notion_find_database_item`

**Find Database Item.** Finds rows in a database matching a Notion filter object and returns the matches (plus the first match for convenience). Use to look up existing records by field value before reading or updating them; for large result sets or pure listing use notion_query_database. Call notion_get_database FIRST to learn property names and types the filter must reference. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `database_id` | string | yes |  | Database ID. The id of the database to search. Resolve a database title into its id with notion_search (filter_type=database). |
| `filter` | JSON | yes |  | Filter. A Notion query filter object. A single condition is { "property": "Email", "email": { "equals": "a@b.com" } }; compound is { "and": [ ...conditions ] } or { "or": [ ...conditions ] }. The condition key MUST match the property's type (e.g. title:{equals}, rich_text:{contains}, select:{equals}, statu… |
| `page_size` | number | no |  | Page Size. Maximum number of rows to return (1–100). Defaults to 100. |

Output fields:

- `success`: Success (boolean)
- `results`: Results
- `results[].url`: Page URL (url)
- `results[].id`: Page ID
- `results[].object`: Object Type
- `results[].created_time`: Created Time (datetime)
- `results[].last_edited_time`: Last Edited Time (datetime)
- `results[].is_archived`: Is Archived (boolean)
- `results[].is_locked`: Is Locked (boolean)
- `results[].in_trash`: In Trash (boolean)
- `results[].parent`: Parent
- `results[].parent.type`: Parent Type
- `results[].parent.page_id`: Parent Page ID
- `results[].created_by`: Created By
- `results[].created_by.id`: User ID
- `results[].last_edited_by`: Last Edited By
- `results[].last_edited_by.id`: User ID
- `count`: Count (number)
- `firstMatch`: First Match
- `firstMatch.url`: Page URL (url)
- `firstMatch.id`: Page ID
- `firstMatch.object`: Object Type
- `firstMatch.created_time`: Created Time (datetime)
- `firstMatch.last_edited_time`: Last Edited Time (datetime)
- `firstMatch.is_archived`: Is Archived (boolean)
- `firstMatch.is_locked`: Is Locked (boolean)
- `firstMatch.in_trash`: In Trash (boolean)
- `firstMatch.parent`: Parent
- `firstMatch.parent.type`: Parent Type
- `firstMatch.parent.page_id`: Parent Page ID
- `firstMatch.created_by`: Created By
- `firstMatch.created_by.id`: User ID
- `firstMatch.last_edited_by`: Last Edited By
- `firstMatch.last_edited_by.id`: User ID
- `has_more`: Has More (boolean)
- `next_cursor`: Next Cursor

### `notion_archive_database_item`

**Archive Database Item.** Soft-deletes a database row by setting its archived flag, keeping it recoverable via notion_restore_database_item. Use to remove a record from active views without permanent deletion; resolve the row's page id via notion_query_database or notion_find_database_item. Safe to retry — re-archiving an already-archived item is a no-op. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item_id` | string | yes |  | Item ID. The page id of the database row to archive. Resolve it via notion_query_database or notion_find_database_item. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `archivedItem`: Archived Item
- `archivedItem.id`: Item ID
- `archivedItem.title`: Title
- `archivedItem.url`: URL (url)
- `archivedItem.archived_at`: Archived At (datetime)

### `notion_restore_database_item`

**Restore Database Item.** Un-archives a previously archived database row, returning it to active status. Use to recover a record archived via notion_archive_database_item; supply the archived row's page id. Safe to retry — restoring an already-active item is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `item_id` | string | yes |  | Item ID. The page id of the archived database row to restore. Resolve it via notion_query_database (with an archived filter) or from the response of notion_archive_database_item. |

Output fields:

- `success`: Success (boolean)
- `message`: Message
- `restoredItem`: Restored Item
- `restoredItem.id`: Item ID
- `restoredItem.title`: Title
- `restoredItem.url`: URL (url)
- `restoredItem.restored_at`: Restored At (datetime)

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

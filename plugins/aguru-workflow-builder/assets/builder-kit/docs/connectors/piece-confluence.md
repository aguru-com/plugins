# Confluence

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-confluence'
  version: '0.3.2'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Please refer to this guide to get your api credentials: https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Account Email. Account email for basic auth. |
| `password` | string | yes |  | API token. API token for basic auth. |
| `confluenceDomain` | string | yes |  | Confluence Domain. Example value - https://your-domain.atlassian.net (without trailing slash) |

## Actions

### `getPageContent`

**Get Page Content.** Fetches a single Confluence page (title and storage-format body) by its page ID; when "include descendants" is enabled it additionally walks the page tree and returns child pages recursively up to a configurable max depth. Use to read the full content of a known page, optionally including its sub-pages. Requires the numeric page ID (from the page URL); read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. Get this from the page URL of your Confluence Cloud. |
| `includeDescendants` | boolean | no | `false` | Include Descendants ?. If checked, will fetch all child pages recursively. |
| `dynamic` | object | yes |  | Dynamic Properties. An object whose fields depend on other inputs; the product shows them. |

### `get-page-by-url`

**Get Page by URL.** Fetches a single Confluence page when you have its web URL rather than its numeric ID, parsing the page ID out of the URL automatically. Use instead of Get Page Content when the agent only has a copy-pasted page link. The body representation (storage, view, atlas doc, or none) is selectable. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | Page URL. Paste any Confluence page URL, e.g. https://your-domain.atlassian.net/wiki/spaces/DOCS/pages/12345/My+Page. |
| `bodyFormat` | string | yes | `"storage"` | Body Format. One of `"storage"`, `"view"`, `"atlas_doc_format"`, `""`. |

### `find-page-by-title`

**Find Page by Title.** Looks up Confluence pages by exact title, optionally restricted to one space, returning matches plus a found flag and count. Use to resolve a page title to its ID before reading or updating it. Match is exact (not fuzzy); for keyword or broader queries use Search Content (CQL) instead. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | no |  | Space. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. Exact title to match. |

### `search-pages`

**Search Content (CQL).** Searches Confluence content using a CQL (Confluence Query Language) expression, paginating until the max-results cap is reached. Use for flexible, multi-criteria or keyword search across pages/blogposts/comments (by type, space, title, label, date, text); use Find Page by Title for exact-title lookups instead. Requires a valid CQL string. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cql` | string | yes | `"type = \"page\" ORDER BY lastmodified DESC"` | CQL. Confluence Query Language expression. See https://developer.atlassian.com/cloud/confluence/advanced-searching-using-cql/. |
| `maxResults` | number | yes | `25` | Max Results. |
| `expand` | string | no |  | Expand. Comma-separated list of properties to expand (e.g. `body.storage,version,space,history`). |

### `create-page`

**Create Page.** Creates a new Confluence page in the given space with a title and body, optionally nested under a parent page, and either published (current) or saved as a draft. The body is interpreted in the chosen format (storage XHTML, wiki markup, or atlas doc format). Use to author a brand-new page. Not idempotent: each call creates another page even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. A value the product loads from the provider, such as an id; write the value itself. |
| `parentId` | string | no |  | Parent Page. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. |
| `bodyFormat` | string | yes | `"storage"` | Body Format. One of `"storage"`, `"wiki"`, `"atlas_doc_format"`. |
| `body` | string | no |  | Body. Page content in the selected format. |
| `status` | string | yes | `"current"` | Status. One of `"current"`, `"draft"`. |

### `create-page-from-template`

**Create Page from Template.** Creates a new Confluence page by fetching a template, substituting its declared variables with the provided values, and posting the rendered content as a page (published or draft) in the given space. Use when a page should follow a predefined template rather than free-form body. Requires the template ID and matching variable names. Not idempotent: each call creates another page. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. A value the product loads from the provider, such as an id; write the value itself. |
| `templateId` | string | yes |  | Template. A value the product loads from the provider, such as an id; write the value itself. |
| `folderId` | string | no |  | Parent Folder. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. |
| `status` | string | yes | `"draft"` | Status. One of `"current"`, `"draft"`. |
| `templateVariables` | object | no |  | Template Variables. An object whose fields depend on other inputs; the product shows them. |

### `update-page`

**Update Page.** Updates an existing Confluence page identified by page ID, changing its title, body, and/or status; blank title or body fields keep the current values. Reads the current version first and bumps the version number on save. Use to edit a known page. Not strictly idempotent: each call increments the page version even when content is unchanged. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. A value the product loads from the provider, such as an id; write the value itself. |
| `pageId` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. Leave blank to keep the current title. |
| `bodyFormat` | string | yes | `"storage"` | Body Format. One of `"storage"`, `"wiki"`, `"atlas_doc_format"`. |
| `body` | string | no |  | Body. New page content. Leave blank to keep existing body. |
| `status` | string | no |  | Status. One of `"current"`, `"draft"`. |

### `delete-page`

**Delete Page.** Deletes a Confluence page by ID; by default it is moved to the trash, or when "purge permanently" is enabled it is removed from the trash for good. Use to remove a page. Not idempotent in practice: it mutates page state and re-running after deletion errors rather than returning the same result, and a purge is irreversible. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. A value the product loads from the provider, such as an id; write the value itself. |
| `pageId` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `purge` | boolean | no | `false` | Purge Permanently. If enabled, the page is removed from the trash permanently. Otherwise it is moved to trash. |

### `move-page`

**Move Page.** Repositions a Confluence page in the content tree relative to a target page: append/insert it as a child of the target, or place it as a sibling after the target. Use to re-parent or reorder a page. Requires the page ID and the target page ID. Effectively idempotent — re-running with the same position and target leaves the page in the same place. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. A value the product loads from the provider, such as an id; write the value itself. |
| `pageId` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `position` | string | yes | `"append"` | Position Relative to Target. One of `"append"`, `"before"`, `"after"`. |
| `targetPageId` | string | yes |  | Target Page ID. The page to move relative to. Use "append" or "before" to nest under it, "after" to place as sibling. |

### `publish-draft`

**Publish Draft.** Publishes an existing draft Confluence page by ID, flipping its status from draft to current while preserving its title and body. Use to make a previously created draft live. Requires the draft page ID. Effectively idempotent once published — re-running on an already-current page leaves it published. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Draft Page ID. ID of the draft page to publish. |

### `add-comment`

**Add Comment to Page.** Posts a new footer comment on a Confluence page, with the comment body given in storage (XHTML) format (plain text is accepted). Use to leave a top-level comment on a page; to respond to an existing comment use Reply to Comment instead. Not idempotent: each call adds another comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. A value the product loads from the provider, such as an id; write the value itself. |
| `pageId` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | string | yes |  | Comment. Comment body in storage (XHTML) format. Plain text works too. |

### `reply-to-comment`

**Reply to Comment.** Posts a reply nested under an existing footer comment, identified by the parent comment ID, with the reply body in storage (XHTML) format. Use to respond in a comment thread; to start a new top-level comment use Add Comment to Page instead. Not idempotent: each call adds another reply. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parentCommentId` | string | yes |  | Parent Comment ID. The ID of the comment to reply to. |
| `body` | string | yes |  | Reply. Reply body in storage (XHTML) format. |

### `list-comments`

**List Comments.** Lists comments on a Confluence page; a comment-type selector controls whether it returns footer comments, inline comments, or both (fetched separately and returned under footer/inline keys). Body representation (storage, view, or atlas doc) is selectable. Use to read or enumerate a page's comments. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. A value the product loads from the provider, such as an id; write the value itself. |
| `pageId` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `commentType` | string | yes | `"footer"` | Comment Type. One of `"footer"`, `"inline"`, `"both"`. |
| `bodyFormat` | string | yes | `"storage"` | Body Format. One of `"storage"`, `"view"`, `"atlas_doc_format"`. |

### `upload-attachment`

**Upload Attachment.** Uploads a file as an attachment on a Confluence page via multipart form upload, with an optional version comment and a minor-edit flag to suppress watcher notifications. Use to attach a document or image to a page. Requires the page ID and the file. Uploading the same filename again creates a new version rather than a duplicate, but each call still mutates state, so treat as not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. A value the product loads from the provider, such as an id; write the value itself. |
| `pageId` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. Files are not supported; an action that needs one fails. |
| `comment` | string | no |  | Version Comment. Optional comment associated with this attachment version. |
| `minorEdit` | boolean | no | `true` | Minor Edit. If enabled, no notifications are sent to page watchers. |

### `download-attachment`

**Download Attachment.** Downloads a Confluence attachment by its attachment ID, resolving the download link from the attachment metadata and returning the binary as a file plus the attachment details. Use to retrieve the actual file contents of an attachment (use List Attachments first to discover IDs). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `attachmentId` | string | yes |  | Attachment ID. ID of the attachment to download. Use "List Attachments" to look up IDs. |

### `list-attachments`

**List Attachments.** Lists the attachments on a Confluence page, returning their metadata including IDs. Use to enumerate a page's files or to find an attachment ID to feed into Download Attachment. Requires the page ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. A value the product loads from the provider, such as an id; write the value itself. |
| `pageId` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |

### `add-label`

**Add Label to Page.** Adds one or more labels to a Confluence page, with a selectable prefix (global, personal/my, or team) applied to all labels in the call. Use to tag or categorize a page. Requires the page ID and at least one label name. Effectively idempotent — re-adding an existing label leaves the page's label set unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. A value the product loads from the provider, such as an id; write the value itself. |
| `pageId` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `labels` | array | yes |  | Labels. Label names to add (one per row). |
| `prefix` | string | yes | `"global"` | Prefix. One of `"global"`, `"my"`, `"team"`. |

### `remove-label`

**Remove Label from Page.** Removes a single label, by name, from a Confluence page. Use to untag a page. Requires the page ID and the label name. Effectively idempotent — re-running after the label is gone leaves the page's label set unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. A value the product loads from the provider, such as an id; write the value itself. |
| `pageId` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `label` | string | yes |  | Label. Label name to remove. |

### `find-user`

**Find User.** Searches Confluence users by a keyword matched against full name and username (via CQL), returning matching user records plus a found flag and count. Use to resolve a person's name or email to a Confluence user/account ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `keyword` | string | yes |  | Keyword. Username, email, or display name to search for. |
| `limit` | number | no | `25` | Limit. |

### `list-spaces`

**List Spaces.** Lists the Confluence spaces the authenticated user can access (paginated through all results), optionally filtered by space type (global, personal, collaboration, knowledge base) and status (current or archived). Use to discover available spaces or resolve a space to its ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | no |  | Type. One of `"global"`, `"personal"`, `"collaboration"`, `"knowledge_base"`. |
| `status` | string | no | `"current"` | Status. One of `"current"`, `"archived"`. |

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

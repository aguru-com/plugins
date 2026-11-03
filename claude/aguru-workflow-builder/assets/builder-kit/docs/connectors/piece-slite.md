# Slite

Slite is a modern knowledge base. Create, search, update, and ask questions about your team docs.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-slite'
  version: '0.1.0'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> **Authenticate with your Slite API key.**
>
> 1. Open your organization menu at the top-left of the Slite app.
> 2. Go to **Settings → API**.
> 3. Click **Create a new key** and follow the steps.
> 4. Copy the key (it is shown only once) and paste it here.

## Actions

### `ask_question`

**Ask Question.** Runs Slite's AskX over the workspace knowledge base, returning a natural-language answer synthesized from indexed docs along with the source docs it drew from. Choose this for question-answering or retrieval over team docs rather than keyword lookup; optionally scope the answer to docs nested under a given parent doc id. Read-only and idempotent: repeating the same question produces the same answer for the current index state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `question` | string | yes |  | Question. The question to ask your Slite knowledge base. |
| `parent_note_id` | string | no |  | Parent Doc. Limit the answer to docs nested under this parent. A value the product loads from the provider, such as an id; write the value itself. |

### `create_doc`

**Create Doc.** Creates a new Slite doc with the given title and optional body, placed under a parent doc id or, if no parent is given, in the caller's private channel. Content may be supplied as Markdown or HTML, and a template can be applied by id. Not idempotent: each call creates a separate doc even with identical input. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. The title of the new doc. |
| `parent_note_id` | string | no |  | Parent Doc. Where to create the new doc. Leave blank to create it in your private channel. A value the product loads from the provider, such as an id; write the value itself. |
| `content` | string | no |  | Content. The body of the doc. |
| `content_format` | string | no | `"markdown"` | Content Format. How the content above is written. One of `"markdown"`, `"html"`. |
| `template_id` | string | no |  | Template ID. Apply a template to the new doc by its ID. |
| `attributes` | array | no |  | Attributes. Attributes for the parent collection, ordered by column. Ignored if they don't match the column type. |

### `fetch_sub_docs`

**Fetch Sub Docs.** Lists the child docs nested directly under a given parent doc id in Slite, paging through all children. Use it to enumerate the contents of a collection or folder doc when you have its id. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `note_id` | string | yes |  | Parent Doc. The doc whose sub docs you want to list. A value the product loads from the provider, such as an id; write the value itself. |

### `replace_doc`

**Replace Doc.** Overwrites an existing Slite doc identified by its note id, replacing the whole body (Markdown or HTML) and/or the title; omitted fields are left untouched. Use this for a full-content rewrite rather than a targeted block edit (see Update Doc for that). Idempotent: applying the same input to the same doc id leaves it in the same final state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `note_id` | string | yes |  | Doc. Start typing to search your docs by title. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. A new title for the doc. |
| `content` | string | no |  | Content. New content that replaces the entire doc body. |
| `content_format` | string | no | `"markdown"` | Content Format. How the content above is written. One of `"markdown"`, `"html"`. |
| `attributes` | array | no |  | Attributes. Attributes for the parent collection, ordered by column. |

### `index_askx_object`

**Index AskX Object.** Upserts a single object (title plus Markdown or HTML content) into a custom AskX data source so it becomes searchable by Ask Question, keyed by the source's root id and the object's own id. Note: Slite has deprecated this endpoint. Idempotent: re-sending the same root id and object id overwrites that indexed entry rather than adding a duplicate. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `root_id` | string | yes |  | Root ID. The root ID of your custom data source (created in Slite). |
| `object_id` | string | yes |  | Object ID. A unique identifier for this object within the source. |
| `title` | string | yes |  | Title. The title of the object. |
| `content` | string | yes |  | Content. The content of the object. |
| `type` | string | yes | `"markdown"` | Content Format. How the content above is written. One of `"markdown"`, `"html"`. |
| `updated_at` | ISO date-time string | yes |  | Updated At. When the object was last modified. |
| `url` | string | yes |  | URL. The redirect URL for the object. |

### `fetch_doc`

**Fetch Doc.** Retrieves a single Slite doc by its note id, returning its content in the requested format (Markdown, HTML, or SliteML). Use it when you already have a doc id and need to read its body. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `note_id` | string | yes |  | Doc. Start typing to search your docs by title. A value the product loads from the provider, such as an id; write the value itself. |
| `format` | string | no | `"md"` | Content Format. The format to return the doc content in. One of `"md"`, `"html"`, `"sliteml"`. |

### `search_docs`

**Search Docs.** Runs a keyword search across the Slite docs the connected account can access, with optional scoping to a parent doc id, inclusion of archived docs, and pagination. Use this for term/title matching to locate docs and their ids; for natural-language question answering use Ask Question instead. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Term. The keywords to search for. |
| `parent_note_id` | string | no |  | Parent Doc. Limit results to docs nested under this parent. A value the product loads from the provider, such as an id; write the value itself. |
| `include_archived` | boolean | no | `false` | Include Archived. Also search archived docs. |
| `hits_per_page` | number | no | `25` | Results Per Page. How many results to return per page (1–100). |
| `page` | number | no | `0` | Page. Which page of results to return (starts at 0). |

### `update_doc`

**Update Doc.** Edits a single tile (content block) within a Slite doc, identified by the note id plus the tile id, optionally setting its header, Markdown content, link, icon, and status badge; omitted fields stay unchanged. Choose this for a targeted block-level edit rather than rewriting the whole doc (see Replace Doc for that); the tile id must be copied from the block in Slite. Idempotent: applying the same input to the same tile yields the same final state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `note_id` | string | yes |  | Doc. Start typing to search your docs by title. A value the product loads from the provider, such as an id; write the value itself. |
| `tile_id` | string | yes |  | Tile ID. The block to update. In Slite, hover an empty line, open its menu, and choose "Copy block id". |
| `title` | string | no |  | Title. New header text for the tile. |
| `content` | string | no |  | Content. New Markdown content for the tile. |
| `url` | string | no |  | URL. An external link for the tile. |
| `icon_url` | string | no |  | Icon URL. An icon to display on the tile. |
| `status_label` | string | no |  | Status Label. Text for the tile status badge. |
| `status_color` | string | no |  | Status Color. Status badge color as a hex code, e.g. #2F80ED. |

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

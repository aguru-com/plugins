# Microsoft OneNote

Microsoft OneNote is a note-taking app that allows you to create, edit, and share notes with others.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-microsoft-onenote'
  version: '0.4.2'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> If you’d like to use your own custom Azure app instead of the default app, follow the [Azure app creation guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application),
> set the **Redirect URI** to {{redirectUrl}} and add the following **Microsoft Graph (Delegated) permissions** under **API permissions**:
> - User.Read
> - Notes.ReadWrite
> - offline_access

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cloud` | string | yes | `"login.microsoftonline.com"` | Cloud Environment. Select your Microsoft cloud environment. One of `"login.microsoftonline.com"`, `"login.microsoftonline.us"`. |

## Actions

### `create_notebook`

**Create Notebook.** Creates a new OneNote notebook for the authenticated user, given a display name. Use as the top-level container before adding sections and pages; the name must be unique, under 128 characters, and avoid characters such as ?*/:<>|'"%~. Not idempotent: each call attempts to create another notebook. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `displayName` | string | yes |  | Notebook Name. The name of the notebook. Must be unique and cannot contain more than 128 characters or the following characters: ?*/:<>\|'"%~. |

### `create_section`

**Create Section.** Creates a new section inside a chosen OneNote notebook, given a display name. Use to organize a notebook before adding pages; the name must be unique within the notebook, under 50 characters, and avoid characters such as ?*/:<>|&#'%~. Not idempotent: each call attempts to create another section. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `notebook_id` | string | yes |  | Notebook. The notebook to create the section in. A value the product loads from the provider, such as an id; write the value itself. |
| `displayName` | string | yes |  | Section Name. The name of the section. Must be unique within the notebook and cannot contain more than 50 characters or the following characters: ?*/:<>\|&#''%~. |

### `create_note_in_section`

**Create Note in Section.** Creates a new OneNote page (note) in a chosen notebook section with a title and optional HTML body content. Use when adding a fresh note; content accepts basic HTML tags. Not idempotent: each call creates a new page even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `notebook_id` | string | yes |  | Notebook. The notebook to create the note in. A value the product loads from the provider, such as an id; write the value itself. |
| `section_id` | string | yes |  | Section. The section to create the note in. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Note Title. The title of the note. |
| `content` | string | no | `"<p>Your note content here...</p>"` | Note Content. The content of the note. Use basic HTML tags like <p>, <h1>, <h2>, <ul>, <li>, etc. |

### `create_page`

**Create Page.** Creates a new OneNote page in a chosen notebook section with a title and optional HTML body content. Functionally similar to Create Note in Section; pick either to add a text page. Content accepts basic HTML tags. Not idempotent: each call creates a new page. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `notebook_id` | string | yes |  | Notebook. The notebook to create the page in. A value the product loads from the provider, such as an id; write the value itself. |
| `section_id` | string | yes |  | Section. The section to create the page in. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Page Title. The title of the page. |
| `content` | string | no | `"<p>Your page content here...</p>"` | Page Content. The HTML content of the page. Use basic HTML tags like <p>, <h1>, <h2>, <ul>, <li>, etc. |

### `create_image_note`

**Create Image Note.** Creates a new OneNote page in a section with an embedded image referenced by a publicly accessible image URL, plus an optional title and description. Choose this over Create Page when the note is primarily an image; the image URL must be reachable by Microsoft Graph. Not idempotent: each call creates a new page. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `notebook_id` | string | yes |  | Notebook. The notebook to create the image note in. A value the product loads from the provider, such as an id; write the value itself. |
| `section_id` | string | yes |  | Section. The section to create the image note in. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Page Title. The title of the image note page. |
| `image_url` | string | yes |  | Image URL. The public URL of the image to embed (must be publicly accessible). |
| `image_width` | number | no | `300` | Image Width. The width of the image in pixels (optional). |
| `image_alt_text` | string | no | `"Embedded image"` | Image Alt Text. Alternative text for the image (for accessibility). |
| `description` | string | no |  | Description. Optional description text to include with the image. |

### `append_note`

**Append Note.** Appends content to the body of an existing OneNote page (note), identified by notebook, section, and page. Use to add to a note rather than replace it; the content type can be a paragraph, list item, heading, or raw HTML. Not idempotent: each call appends again, so repeating duplicates the content. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `notebook_id` | string | yes |  | Notebook. The notebook containing the page to append to. A value the product loads from the provider, such as an id; write the value itself. |
| `section_id` | string | yes |  | Section. The section containing the page to append to. A value the product loads from the provider, such as an id; write the value itself. |
| `page_id` | string | yes |  | Page. The page to append content to. A value the product loads from the provider, such as an id; write the value itself. |
| `content_type` | string | yes | `"paragraph"` | Content Type. The type of content to append. One of `"paragraph"`, `"list_item"`, `"heading"`, `"html"`. |
| `content` | string | yes |  | Content. The content to append to the page. |
| `heading_level` | string | no | `"h2"` | Heading Level. The heading level (only for heading content type). One of `"h1"`, `"h2"`, `"h3"`, `"h4"`, `"h5"`, `"h6"`. |

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

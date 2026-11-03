# Mixmax

Email productivity and automation platform for Gmail — sequences, tracking, templates, and integrations

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mixmax'
  version: '0.1.0'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> Your Mixmax API token (X-API-Token). Find it at Settings > API in Mixmax.

## Actions

### `create_contact`

**Create Contact.** Adds a new contact to the Mixmax contact list, keyed by email (the only required field; name is optional). Optionally enriches the contact with third-party data when enrichment sources are connected. Not idempotent — each call creates/registers the contact again. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. The contact email address. |
| `name` | string | no |  | Name. The contact full name. |
| `enrich` | boolean | no | `false` | Enrich Contact. Merge third-party data for this contact if enrichment sources are connected. |

### `find_contact`

**Find Contact.** Searches Mixmax contacts by a query string (email address or name), which is required. Use to look up an existing contact before acting on it; optionally include Salesforce contacts in the results. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Email address or name to search for. |
| `includeSalesforceContacts` | boolean | no | `false` | Include Salesforce Contacts. Include Salesforce contacts in search results. |

### `list_contacts`

**List Contacts.** Lists Mixmax contacts, optionally filtering by a name/email search term and sorting by name, email, last used, or used count. With no search term it returns all contacts; provide a term to narrow to matches. Use to enumerate or browse contacts rather than to look up a single one. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Filter contacts by name or email. |
| `sort` | string | no |  | Sort By. Field to sort results by. One of `"name"`, `"email"`, `"timestamp"`, `"usedCount"`. |

### `create_code_snippet`

**Create Code Snippet.** Creates a reusable code snippet in Mixmax from required HTML content, with optional title, syntax-highlighting language, background color, and editor theme. Use to save a code block for later insertion into emails. Not idempotent — each call creates a new snippet. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | no |  | Title. The code snippet title. |
| `html` | string | yes |  | HTML. The HTML content of the code snippet (as it appears in the editor) |
| `language` | string | no |  | Language. Programming language for syntax highlighting. One of `"javascript"`, `"python"`, `"html"`, `"css"`, `"typescript"`, `"java"`, `"ruby"`, `"php"`, `"golang"`, `"bash"`, `"sql"`, `"json"`, `"xml"`, `"markdown"`. |
| `background` | string | no | `"rgb(255, 255, 255)"` | Background Color. RGB background color (e.g., rgb(255, 255, 255)) |
| `theme` | string | no |  | Editor Theme. Code editor color theme. One of `"ambiance"`, `"monokai"`, `"github"`, `"solarized_dark"`, `"solarized_light"`, `"tomorrow"`, `"twilight"`. |

### `list_code_snippets`

**List Code Snippets.** Retrieves all code snippets in the Mixmax account. Takes no input. Use to enumerate available snippets or to find a snippet id before reusing it. Read-only and idempotent. Needs authentication.

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

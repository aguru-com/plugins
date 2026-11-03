# Pastefy

Sharing code snippets platform

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-pastefy'
  version: '0.3.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Create an account and obtain the API Key from Pastefy.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `instance_url` | string | no | `"https://pastefy.app"` | Pastefy Instance URL. |
| `token` | string | no |  | API-Token. |

## Actions

### `create_paste`

**Create Paste.** Creates a new paste (code/text snippet) on a Pastefy instance, optionally setting a title, folder, visibility, and expiry. Use to publish a snippet; if an encryption password is supplied, the content (and title) are AES-encrypted client-side before upload. Creates a new paste with a new ID on every call, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content` | string | yes |  | Content. |
| `title` | string | no |  | Title. |
| `password` | string | no |  | Encryption Password. Encrypts the paste with this password. |
| `folder_id` | string | no |  | Folder. A folder. A value the product loads from the provider, such as an id; write the value itself. |
| `visibility` | string | no |  | Visibility. One of `"PUBLIC"`, `"UNLISTED"`, `"PRIVATE"`. |
| `expiry` | ISO date-time string | no |  | Expiry Date. |

### `get_paste`

**Get Paste.** Fetches a single paste by its ID from a Pastefy instance. Use to read the content/metadata of a known paste. If the paste is encrypted and an encryption password is provided, the content (and title) are AES-decrypted client-side. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `paste_id` | string | yes |  | Paste ID. |
| `password` | string | no |  | Encryption Password. Decrypts the paste with this password. |

### `edit_paste`

**Edit Paste.** Updates an existing private paste identified by its ID, replacing fields such as content, title, folder, visibility, and expiry. Use to modify a paste you already know the ID of. If an encryption password is supplied, the provided content/title are AES-encrypted client-side. Idempotent: re-applying the same field values to the same paste yields the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `paste_id` | string | yes |  | Paste ID. |
| `content` | string | no |  | Content. |
| `title` | string | no |  | Title. |
| `password` | string | no |  | Encryption Password. Encrypts the paste with this password. |
| `folder_id` | string | no |  | Folder. A folder. A value the product loads from the provider, such as an id; write the value itself. |
| `visibility` | string | no |  | Visibility. One of `"PUBLIC"`, `"UNLISTED"`, `"PRIVATE"`. |
| `expiry` | ISO date-time string | no |  | Expiry Date. |

### `delete_paste`

**Delete Paste.** Permanently deletes a paste by its ID from a Pastefy instance. Use to remove a snippet you no longer want hosted. Keyed on the stable paste ID, so the end state (paste absent) is the same on repeat calls; idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `paste_id` | string | yes |  | Paste ID. |

### `create_folder`

**Create Folder.** Creates a new folder on a Pastefy instance to organize pastes, optionally nested under a parent folder. Use before placing pastes into a folder. Creates a new folder with a new ID on every call, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `parent_id` | string | no |  | Parent Folder. A folder. A value the product loads from the provider, such as an id; write the value itself. |

### `get_folder`

**Get Folder.** Fetches metadata for a single folder by its ID from a Pastefy instance. Use to read details of a known folder. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder_id` | string | yes |  | Folder. A folder. A value the product loads from the provider, such as an id; write the value itself. |

### `get_folder_hierarchy`

**Get Folder Hierarchy.** Retrieves the nested tree of folders on a Pastefy instance, recursively listing each folder and its children. Pass a start folder ID to scope the tree to that subtree, or omit it to walk from the root. Use to discover folder structure or resolve folder IDs by name. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent_id` | string | no |  | Start Folder. A folder. A value the product loads from the provider, such as an id; write the value itself. |

### `delete_folder`

**Delete Folder.** Permanently deletes a folder by its ID from a Pastefy instance. Use to remove a folder you no longer need. Keyed on the stable folder ID, so the end state (folder absent) is the same on repeat calls; idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder_id` | string | yes |  | Folder. A folder. A value the product loads from the provider, such as an id; write the value itself. |

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

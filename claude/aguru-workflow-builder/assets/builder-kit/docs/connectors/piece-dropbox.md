# Dropbox

Cloud storage and file synchronization

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-dropbox'
  version: '0.9.2'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `search_dropbox`

**Search.** Searches a Dropbox account for files and folders whose name or content matches a query string (minimum 3 characters), optionally scoped to a path and filtered by file status, extensions, categories, or account. Use to locate items and obtain their paths/IDs before acting on them. Read-only; repeating the same search is safe and returns the same matches. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. The search string. Must be at least 3 characters. |
| `path` | string | no |  | Path. The path to search in. If not specified, the search is performed from the root. |
| `max_results` | number | no |  | Max Results. The maximum number of search results to return (up to 1000). Default is 100 if not specified. |
| `order_by` | string | no | `"relevance"` | Order By. Specified property of the order of search results. One of `"relevance"`, `"modified_time"`. |
| `file_status` | string | no | `"active"` | File Status. Restricts search to the given file status. One of `"active"`, `"deleted"`. |
| `filename_only` | boolean | no | `false` | Filename Only. Restricts search to only match on filenames. |
| `file_extensions` | string | no |  | File Extensions. Restricts search to only the extensions specified (comma-separated). |
| `file_categories` | string | no |  | File Categories. Restricts search to only the file categories specified (comma-separated). |
| `account_id` | string | no |  | Account ID. Restricts results to the given account id. |

Output fields:

- `matches`: Matches
- `matches[].metadata.metadata.name`: Name
- `matches[].metadata.metadata.id`: ID
- `matches[].metadata.metadata.path_display`: Path
- `matches[].metadata.metadata.path_lower`: Path (Lowercase)
- `has_more`: Has More (boolean)

### `create_new_dropbox_text_file`

**Create New Text File.** Writes the provided text content to a new file at the given Dropbox path (upload in add mode). Use when an agent needs to persist generated or supplied text directly as a file without first producing a file object. Not idempotent: each call uploads, so repeating it can create autorenamed duplicates rather than overwriting. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Path. The path of the new folder e.g. /Homework/math. |
| `text` | string | yes |  | Text. The text to write into the file. |
| `autorename` | boolean | no |  | Autorename. If there's a conflict, have the Dropbox server try to autorename the folder to avoid the conflict. The default for this field is False. |
| `mute` | boolean | no |  | Mute. Normally, users are made aware of any file modifications in their Dropbox account via notifications in the client software. If true, this tells the clients that this modification shouldn't result in a user notification. |
| `strict_conflict` | boolean | no |  | Strict conflict. Be more strict about how each WriteMode detects conflict. For example, always return a conflict error when mode = WriteMode.update and the given "rev" doesn't match the existing file's "rev", even if the existing file has been deleted. |

Output fields:

- `name`: Name
- `id`: ID
- `path_display`: Path
- `path_lower`: Path (Lowercase)
- `size`: Size (filesize)
- `client_modified`: Client Modified (datetime)
- `server_modified`: Server Modified (datetime)
- `rev`: Revision
- `content_hash`: Content Hash
- `is_downloadable`: Is Downloadable (boolean)

### `upload_dropbox_file`

**Upload file.** Uploads a file (provided as a URL or base64 file object) to the given Dropbox path in add mode. Files over 150 MB are uploaded in chunks automatically. Use to store binary or arbitrary file content; prefer the create-text-file action when the source is plain text. Not idempotent: each call uploads, so repeating it can create autorenamed duplicates rather than overwriting. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Path. The path where the file should be saved (e.g. /folder1/file.txt) |
| `file` | file | yes |  | File. The file URL or base64 to upload. Files are not supported; an action that needs one fails. |
| `autorename` | boolean | no | `false` | Auto Rename. If there's a conflict, as determined by mode, have the Dropbox server try to autorename the file to avoid conflict. |
| `mute` | boolean | no |  | Mute. Normally, users are made aware of any file modifications in their Dropbox account via notifications in the client software. If true, this tells the clients that this modification shouldn't result in a user notification. |
| `strict_conflict` | boolean | no |  | Strict conflict. Be more strict about how each WriteMode detects conflict. For example, always return a conflict error when mode = WriteMode.update and the given "rev" doesn't match the existing file's "rev", even if the existing file has been deleted. |

Output fields:

- `name`: Name
- `id`: ID
- `path_display`: Path
- `path_lower`: Path (Lowercase)
- `size`: Size (filesize)
- `client_modified`: Client Modified (datetime)
- `server_modified`: Server Modified (datetime)
- `rev`: Revision
- `content_hash`: Content Hash
- `is_downloadable`: Is Downloadable (boolean)

### `downloadFile`

**Download File.** Downloads the file at the given Dropbox path and returns it as a file object for use by later steps. Use to retrieve file contents into a flow. Read-only on Dropbox; repeating the call with the same path is safe and yields the same file. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Path. The path of the file (e.g. /folder1/file.txt) |

Output fields:

- `file`: File (url)

### `get_dropbox_file_link`

**Get temporary file link.** Returns a temporary, directly downloadable URL for the file at the given Dropbox path. Use when an agent needs a shareable or fetchable link to file contents rather than downloading the bytes into the flow. Read-only lookup; safe to repeat, though the returned URL is short-lived. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Path. The path of the file (e.g. /folder1/file.txt) |

Output fields:

- `link`: Temporary Link (url)
- `metadata`: File
- `metadata.name`: Name
- `metadata.id`: ID
- `metadata.path_display`: Path
- `metadata.path_lower`: Path (Lowercase)
- `metadata.size`: Size (filesize)
- `metadata.client_modified`: Client Modified (datetime)
- `metadata.server_modified`: Server Modified (datetime)
- `metadata.rev`: Revision
- `metadata.content_hash`: Content Hash
- `metadata.is_downloadable`: Is Downloadable (boolean)

### `delete_dropbox_file`

**Delete file.** Permanently deletes the file at the given Dropbox path. Use to remove a specific file an agent has resolved the path for. Effectively idempotent on the end state once the path is gone, but a repeat call fails because the path no longer exists; treat as a destructive, non-recoverable mutation. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Path. The path of the file to be deleted (e.g. /folder1/file.txt) |

Output fields:

- `metadata`: File
- `metadata.name`: Name
- `metadata.id`: ID
- `metadata.path_display`: Path
- `metadata.path_lower`: Path (Lowercase)
- `metadata.size`: Size (filesize)
- `metadata.client_modified`: Client Modified (datetime)
- `metadata.server_modified`: Server Modified (datetime)
- `metadata.rev`: Revision
- `metadata.content_hash`: Content Hash
- `metadata.is_downloadable`: Is Downloadable (boolean)

### `move_dropbox_file`

**Move file.** Moves (or renames) the file at the source path to a new destination path within Dropbox; optionally autorenames on conflict. Use to relocate or rename a single file. Not idempotent: after a successful move the source no longer exists, so repeating the call fails or, with autorename, can produce a differently named copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from_path` | string | yes |  | From Path. The current path of the file (e.g. /folder1/oldfile.txt) |
| `to_path` | string | yes |  | To Path. The new path for the file (e.g. /folder2/newfile.txt) |
| `autorename` | boolean | no | `false` | Auto Rename. If there's a conflict, have the Dropbox server try to autorename the file to avoid conflict. |
| `allow_ownership_transfer` | boolean | no | `false` | Allow Ownership Transfer. Allows moves by owner even if it would result in an ownership transfer. |

Output fields:

- `metadata`: File
- `metadata.name`: Name
- `metadata.id`: ID
- `metadata.path_display`: Path
- `metadata.path_lower`: Path (Lowercase)
- `metadata.size`: Size (filesize)
- `metadata.client_modified`: Client Modified (datetime)
- `metadata.server_modified`: Server Modified (datetime)
- `metadata.rev`: Revision
- `metadata.content_hash`: Content Hash
- `metadata.is_downloadable`: Is Downloadable (boolean)

### `copy_dropbox_file`

**Copy file.** Copies the file at the source path to a new destination path within Dropbox, leaving the original in place; optionally autorenames on conflict. Use to duplicate a single file. Not idempotent: each call creates a copy, so repeating it errors on conflict or, with autorename, produces additional duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from_path` | string | yes |  | From Path. The source path of the file (e.g. /folder1/sourcefile.txt) |
| `to_path` | string | yes |  | To Path. The destination path for the copied (e.g. /folder2/destinationfile.txt) |
| `autorename` | boolean | no | `false` | Auto Rename. If there's a conflict, have the Dropbox server try to autorename the file to avoid conflict. |
| `allow_ownership_transfer` | boolean | no | `false` | Allow Ownership Transfer. Allows copy by owner even if it would result in an ownership transfer. |

Output fields:

- `metadata`: File
- `metadata.name`: Name
- `metadata.id`: ID
- `metadata.path_display`: Path
- `metadata.path_lower`: Path (Lowercase)
- `metadata.size`: Size (filesize)
- `metadata.client_modified`: Client Modified (datetime)
- `metadata.server_modified`: Server Modified (datetime)
- `metadata.rev`: Revision
- `metadata.content_hash`: Content Hash
- `metadata.is_downloadable`: Is Downloadable (boolean)

### `create_new_dropbox_folder`

**Create New Folder.** Creates a new empty folder at the given Dropbox path; optionally autorenames on conflict. Use to set up a destination directory before placing files. Not idempotent: a repeat call for an existing path errors (or, with autorename, creates a differently named folder). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Path. The path of the new folder e.g. /Homework/math. |
| `autorename` | boolean | no |  | Auto Rename. If there's a conflict, have the Dropbox server try to autorename the folder to avoid the conflict. The default for this field is False. |

Output fields:

- `metadata`: Folder
- `metadata.name`: Name
- `metadata.id`: ID
- `metadata.path_display`: Path
- `metadata.path_lower`: Path (Lowercase)

### `delete_dropbox_folder`

**Delete folder.** Permanently deletes the folder at the given Dropbox path along with all of its contents. Use to remove an entire directory. Effectively idempotent on the end state once the path is gone, but a repeat call fails because the path no longer exists; treat as a destructive, non-recoverable mutation. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Path. The path of the folder to be deleted (e.g. /folder1) |

Output fields:

- `metadata`: Folder
- `metadata.name`: Name
- `metadata.id`: ID
- `metadata.path_display`: Path
- `metadata.path_lower`: Path (Lowercase)

### `move_dropbox_folder`

**Move folder.** Moves (or renames) the folder at the source path, including its contents, to a new destination path within Dropbox; optionally autorenames on conflict. Use to relocate or rename an entire directory. Not idempotent: after a successful move the source no longer exists, so repeating the call fails or, with autorename, produces a differently named folder. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from_path` | string | yes |  | From Path. The current path of the folder (e.g. /folder1/sourceFolder) |
| `to_path` | string | yes |  | To Path. The new path for the folder (e.g. /folder2/destinationFolder) |
| `autorename` | boolean | no | `false` | Auto Rename. If there's a conflict, have the Dropbox server try to autorename the folder to avoid conflict. |
| `allow_ownership_transfer` | boolean | no | `false` | Allow Ownership Transfer. Allows moves by owner even if it would result in an ownership transfer. |

Output fields:

- `metadata`: Folder
- `metadata.name`: Name
- `metadata.id`: ID
- `metadata.path_display`: Path
- `metadata.path_lower`: Path (Lowercase)

### `copy_dropbox_folder`

**Copy folder.** Copies the folder at the source path, including its contents, to a new destination path within Dropbox, leaving the original in place; optionally autorenames on conflict. Use to duplicate an entire directory. Not idempotent: each call creates a copy, so repeating it errors on conflict or, with autorename, produces additional duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from_path` | string | yes |  | From Path. The source path of the folder (e.g. /folder1/sourceFolder) |
| `to_path` | string | yes |  | To Path. The destination path for the copied folder (e.g. /folder2/destinationFolder) |
| `autorename` | boolean | no | `false` | Auto Rename. If there's a conflict, have the Dropbox server try to autorename the folder to avoid conflict. |
| `allow_ownership_transfer` | boolean | no | `false` | Allow Ownership Transfer. Allows copy by owner even if it would result in an ownership transfer. |

Output fields:

- `metadata`: Folder
- `metadata.name`: Name
- `metadata.id`: ID
- `metadata.path_display`: Path
- `metadata.path_lower`: Path (Lowercase)

### `list_dropbox_folder`

**List a folder.** Lists the files and subfolders within the given Dropbox folder path (use an empty string for the root), optionally recursing into all subfolders. Use to enumerate folder contents and discover item paths/IDs. Read-only; safe to repeat and returns the same listing for unchanged folders. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Path. The path of the folder to be listed (e.g. /folder1). Use an empty string for the root folder. |
| `recursive` | boolean | no | `false` | Recursive. If set to true, the list folder operation will be applied recursively to all subfolders and the response will contain contents of all subfolders. |
| `limit` | number | no |  | Limit. The maximum number of results to return (between 1 and 2000). Default is 2000 if not specified. |

Output fields:

- `entries`: Entries
- `entries[].name`: Name
- `entries[].id`: ID
- `entries[].path_display`: Path
- `entries[].path_lower`: Path (Lowercase)
- `has_more`: Has More (boolean)
- `cursor`: Cursor

### `get_dropbox_file_metadata`

**Get File Metadata.** Returns metadata for a single Dropbox file or folder: name, id, path, size, revision and modification times. Use to inspect one known entry, or to resolve a path into the id and rev that other actions require; use Search Dropbox instead when looking for entries by name. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Path. The file or folder to inspect. Accepts a path (/folder/file.txt), an id (id:abc123) or a revision (rev:a1c10ce0dd78). |
| `include_deleted` | boolean | no | `false` | Include Deleted. Return metadata for a deleted entry instead of failing when the path no longer exists. |
| `include_media_info` | boolean | no | `false` | Include Media Info. Include photo and video metadata when available. |
| `include_has_explicit_shared_members` | boolean | no | `false` | Include Shared Members Flag. Include whether the entry has explicit shared members assigned. |

Output fields:

- `['.tag']`: Kind
- `name`: Name
- `id`: ID
- `path_display`: Path
- `path_lower`: Path (Lowercase)
- `size`: Size (filesize)
- `client_modified`: Client Modified (datetime)
- `server_modified`: Server Modified (datetime)
- `rev`: Revision
- `content_hash`: Content Hash
- `is_downloadable`: Is Downloadable (boolean)

### `list_dropbox_file_revisions`

**List File Revisions.** Lists the stored revisions of a Dropbox file, newest first, each with its rev identifier and modification time. Use to inspect a file history, or to obtain the rev value that Restore File requires. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Path. The file whose revisions to list. Accepts a path (/folder/file.txt) or an id (id:abc123). |
| `mode` | string | no | `"path"` | Mode. Path returns revisions of whatever currently sits at the path; ID follows the same file across moves and renames. One of `"path"`, `"id"`. |
| `limit` | number | no | `10` | Limit. Maximum revisions to return, between 1 and 100. |

Output fields:

- `is_deleted`: Is Deleted (boolean)
- `has_more`: Has More (boolean)
- `entries`: Revisions
- `entries[].name`: Name
- `entries[].id`: ID
- `entries[].path_display`: Path
- `entries[].path_lower`: Path (Lowercase)
- `entries[].size`: Size (filesize)
- `entries[].client_modified`: Client Modified (datetime)
- `entries[].server_modified`: Server Modified (datetime)
- `entries[].rev`: Revision
- `entries[].content_hash`: Content Hash
- `entries[].is_downloadable`: Is Downloadable (boolean)

### `restore_dropbox_file`

**Restore File Revision.** Restores a Dropbox file to a previous revision, obtained from List File Revisions. Use to undo an unwanted change while keeping the history intact. Not idempotent: each call writes a new revision, so repeating it adds further revisions rather than converging. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Path. The file to restore, as a path (/folder/file.txt). This endpoint does not accept id: or rev: values. |
| `rev` | string | yes |  | Revision. The revision to restore the file to. Obtain it from List File Revisions. |

Output fields:

- `name`: Name
- `id`: ID
- `path_display`: Path
- `path_lower`: Path (Lowercase)
- `size`: Size (filesize)
- `client_modified`: Client Modified (datetime)
- `server_modified`: Server Modified (datetime)
- `rev`: Revision
- `content_hash`: Content Hash
- `is_downloadable`: Is Downloadable (boolean)

### `create_dropbox_copy_reference`

**Create Copy Reference.** Creates a copy reference for a Dropbox file or folder, which Save Copy Reference can then use to copy it into a different Dropbox account. Use only for cross-account copies; within one account use Copy Dropbox Entry instead. The response carries the reference and its expiry date. Not idempotent: each call mints a new reference. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Path. The file or folder to reference. Accepts a path (/folder/file.txt), an id (id:abc123) or a revision (rev:a1c10ce0dd78). |

Output fields:

- `copy_reference`: Copy Reference
- `expires`: Expires (datetime)
- `metadata`: Entry
- `metadata.name`: Name
- `metadata.id`: ID
- `metadata.path_display`: Path
- `metadata.path_lower`: Path (Lowercase)
- `metadata.size`: Size (filesize)
- `metadata.client_modified`: Client Modified (datetime)
- `metadata.server_modified`: Server Modified (datetime)
- `metadata.rev`: Revision
- `metadata.content_hash`: Content Hash
- `metadata.is_downloadable`: Is Downloadable (boolean)

### `save_dropbox_copy_reference`

**Save Copy Reference.** Saves a copy reference produced by Create Copy Reference into this Dropbox account at the given path. Use to complete a cross-account copy. Not idempotent: each call writes another copy at the destination path. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `copy_reference` | string | yes |  | Copy Reference. The reference string returned by Create Copy Reference. |
| `path` | string | yes |  | Destination Path. Where to save the entry, as a path (/folder/file.txt). This endpoint does not accept id: or ns: values. |

Output fields:

- `metadata`: File
- `metadata.name`: Name
- `metadata.id`: ID
- `metadata.path_display`: Path
- `metadata.path_lower`: Path (Lowercase)
- `metadata.size`: Size (filesize)
- `metadata.client_modified`: Client Modified (datetime)
- `metadata.server_modified`: Server Modified (datetime)
- `metadata.rev`: Revision
- `metadata.content_hash`: Content Hash
- `metadata.is_downloadable`: Is Downloadable (boolean)

### `lock_dropbox_file`

**Lock File.** Locks a Dropbox file so other members cannot edit it until it is unlocked. Use before rewriting a shared file so a concurrent edit cannot be lost; release it with Unlock File. Idempotent: locking an already-locked file leaves it locked. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Path. The file to lock. Accepts a path (/folder/file.txt) or an id (id:abc123), but not a rev: value. |

Output fields:

- `['.tag']`: Outcome
- `lock.content['.tag']`: Lock State
- `metadata`: File
- `metadata.name`: Name
- `metadata.id`: ID
- `metadata.path_display`: Path
- `metadata.path_lower`: Path (Lowercase)
- `metadata.size`: Size (filesize)
- `metadata.client_modified`: Client Modified (datetime)
- `metadata.server_modified`: Server Modified (datetime)
- `metadata.rev`: Revision
- `metadata.content_hash`: Content Hash
- `metadata.is_downloadable`: Is Downloadable (boolean)
- `metadata.file_lock_info`: Lock Details
- `metadata.file_lock_info.is_lockholder`: Is Lock Holder (boolean)
- `metadata.file_lock_info.lockholder_name`: Lock Holder
- `metadata.file_lock_info.created`: Locked At (datetime)

### `unlock_dropbox_file`

**Unlock File.** Releases a lock previously taken on a Dropbox file so other members can edit it again. Use after finishing the write that Lock File protected. Idempotent: unlocking a file that is not locked leaves it unlocked. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Path. The file to unlock. Accepts a path (/folder/file.txt) or an id (id:abc123), but not a rev: value. |

Output fields:

- `['.tag']`: Outcome
- `lock.content['.tag']`: Lock State
- `metadata`: File
- `metadata.name`: Name
- `metadata.id`: ID
- `metadata.path_display`: Path
- `metadata.path_lower`: Path (Lowercase)
- `metadata.size`: Size (filesize)
- `metadata.client_modified`: Client Modified (datetime)
- `metadata.server_modified`: Server Modified (datetime)
- `metadata.rev`: Revision
- `metadata.content_hash`: Content Hash
- `metadata.is_downloadable`: Is Downloadable (boolean)
- `metadata.file_lock_info`: Lock Details
- `metadata.file_lock_info.is_lockholder`: Is Lock Holder (boolean)
- `metadata.file_lock_info.lockholder_name`: Lock Holder
- `metadata.file_lock_info.created`: Locked At (datetime)

### `get_dropbox_file_lock`

**Get File Lock.** Reports whether a Dropbox file is currently locked, who holds the lock and when it was taken. Use to check before editing a shared file rather than attempting a write and handling the failure. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Path. The file to check. Accepts a path (/folder/file.txt) or an id (id:abc123), but not a rev: value. |

Output fields:

- `['.tag']`: Outcome
- `lock.content['.tag']`: Lock State
- `metadata`: File
- `metadata.name`: Name
- `metadata.id`: ID
- `metadata.path_display`: Path
- `metadata.path_lower`: Path (Lowercase)
- `metadata.size`: Size (filesize)
- `metadata.client_modified`: Client Modified (datetime)
- `metadata.server_modified`: Server Modified (datetime)
- `metadata.rev`: Revision
- `metadata.content_hash`: Content Hash
- `metadata.is_downloadable`: Is Downloadable (boolean)
- `metadata.file_lock_info`: Lock Details
- `metadata.file_lock_info.is_lockholder`: Is Lock Holder (boolean)
- `metadata.file_lock_info.lockholder_name`: Lock Holder
- `metadata.file_lock_info.created`: Locked At (datetime)

### `create_dropbox_upload_link`

**Create Upload Link.** Creates a temporary URL that accepts a file upload to a fixed Dropbox path without further authentication. Use to hand an upload destination to an external system; use Upload File instead when the flow already holds the file. Not idempotent: each call mints a new link with its own expiry. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Destination Path. Where the uploaded file will be written (e.g. /folder/file.txt). Accepts a path or an id (id:abc123). |
| `mode` | string | no | `"add"` | Write Mode. Add keeps any existing file and renames on conflict; Overwrite replaces it. One of `"add"`, `"overwrite"`. |
| `autorename` | boolean | no | `false` | Auto Rename. Let Dropbox rename the upload if the path conflicts. |
| `duration` | number | no | `14400` | Duration (seconds). How long the link stays valid, between 60 and 14400 seconds. Defaults to 14400. |

Output fields:

- `link`: Upload Link (url)

### `download_dropbox_folder_as_zip`

**Download Folder as Zip.** Downloads an entire Dropbox folder as a single zip archive and returns it as a file object. Use to retrieve a whole folder in one step instead of listing it and downloading each file. The folder must be under 20 GB and contain fewer than 10,000 files. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Folder Path. The folder to download (e.g. /reports). Accepts a path, an id (id:abc123) or a revision (rev:a1c10ce0dd78). |

Output fields:

- `file`: Zip Archive (url)
- `metadata`: Folder
- `metadata.name`: Name
- `metadata.id`: ID
- `metadata.path_display`: Path
- `metadata.path_lower`: Path (Lowercase)

### `get_dropbox_file_preview`

**Get File Preview.** Returns a PDF or HTML preview of a Dropbox document and its metadata. Supports office and text formats such as doc, docx, xls, xlsx, ppt, pptx, rtf and csv; use Get File Thumbnail for images. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Path. The document to preview. Accepts a path (/folder/report.docx), an id (id:abc123) or a revision (rev:a1c10ce0dd78). |

Output fields:

- `file`: Preview (url)
- `metadata`: File
- `metadata.name`: Name
- `metadata.id`: ID
- `metadata.path_display`: Path
- `metadata.path_lower`: Path (Lowercase)
- `metadata.size`: Size (filesize)
- `metadata.client_modified`: Client Modified (datetime)
- `metadata.server_modified`: Server Modified (datetime)
- `metadata.rev`: Revision
- `metadata.content_hash`: Content Hash
- `metadata.is_downloadable`: Is Downloadable (boolean)

### `get_dropbox_file_thumbnail`

**Get File Thumbnail.** Returns a thumbnail image for a single Dropbox image file as a file object, with its metadata. Supports jpg, jpeg, png, tiff, tif, gif, webp, ppm and bmp under 20 MB; use Get Thumbnails (Batch) for many files at once. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Path. The image file to thumbnail. Accepts a path (/folder/photo.jpg), an id (id:abc123) or a revision (rev:a1c10ce0dd78). |
| `format` | string | no | `"jpeg"` | Format. One of `"jpeg"`, `"png"`, `"webp"`. |
| `size` | string | no | `"w64h64"` | Size. One of `"w32h32"`, `"w64h64"`, `"w128h128"`, `"w256h256"`, `"w480h320"`, `"w640h480"`, `"w960h640"`, `"w1024h768"`, `"w2048h1536"`. |
| `mode` | string | no | `"strict"` | Mode. Strict keeps the requested dimensions exactly; the bestfit modes preserve the aspect ratio. One of `"strict"`, `"bestfit"`, `"fitone_bestfit"`. |

Output fields:

- `file`: Thumbnail (url)
- `metadata.file_metadata`: File
- `metadata.file_metadata.name`: Name
- `metadata.file_metadata.id`: ID
- `metadata.file_metadata.path_display`: Path
- `metadata.file_metadata.path_lower`: Path (Lowercase)
- `metadata.file_metadata.size`: Size (filesize)
- `metadata.file_metadata.client_modified`: Client Modified (datetime)
- `metadata.file_metadata.server_modified`: Server Modified (datetime)
- `metadata.file_metadata.rev`: Revision
- `metadata.file_metadata.content_hash`: Content Hash
- `metadata.file_metadata.is_downloadable`: Is Downloadable (boolean)

### `get_dropbox_thumbnails_batch`

**Get Thumbnails (Batch).** Returns base64-encoded thumbnails for up to 25 Dropbox image files in one call. Use to preview many images at once; use Get File Thumbnail for a single file you want as a downloadable file object. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `paths` | array | yes |  | Paths. The image files to thumbnail, at most 25. Each accepts a path (/folder/photo.jpg), an id (id:abc123) or a revision (rev:a1c10ce0dd78). |
| `format` | string | no | `"jpeg"` | Format. One of `"jpeg"`, `"png"`, `"webp"`. |
| `size` | string | no | `"w64h64"` | Size. One of `"w32h32"`, `"w64h64"`, `"w128h128"`, `"w256h256"`, `"w480h320"`, `"w640h480"`, `"w960h640"`, `"w1024h768"`, `"w2048h1536"`. |

Output fields:

- `entries`: Thumbnails
- `entries[].metadata.name`: Name
- `entries[].metadata.path_display`: Path
- `entries[].thumbnail`: Thumbnail (base64)

### `save_url_to_dropbox`

**Save URL to Dropbox.** Tells Dropbox to fetch a public URL server-side and save it as a file. Small downloads finish immediately and return the file metadata; larger ones return an async job id that Get Save URL Status polls. Not idempotent: each call starts another download and writes another file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Destination Path. Where to save the file, as a path (/folder/file.pdf). This endpoint does not accept id: or ns: values. |
| `url` | string | yes |  | URL. The publicly reachable URL for Dropbox to download. |

Output fields:

- `['.tag']`: Result
- `async_job_id`: Async Job ID
- `name`: Name
- `id`: ID
- `path_display`: Path
- `path_lower`: Path (Lowercase)
- `size`: Size (filesize)
- `client_modified`: Client Modified (datetime)
- `server_modified`: Server Modified (datetime)
- `rev`: Revision
- `content_hash`: Content Hash
- `is_downloadable`: Is Downloadable (boolean)

### `get_dropbox_save_url_status`

**Get Save URL Status.** Reads the status of a Save URL job started by Save URL to Dropbox, returning in_progress, complete with the saved file metadata, or failed. Call it once per check rather than looping; re-run it after a delay while the status is in_progress. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `async_job_id` | string | yes |  | Async Job ID. The job id returned by Save URL to Dropbox. |

Output fields:

- `['.tag']`: Status
- `name`: Name
- `id`: ID
- `path_display`: Path
- `path_lower`: Path (Lowercase)
- `size`: Size (filesize)
- `client_modified`: Client Modified (datetime)
- `server_modified`: Server Modified (datetime)
- `rev`: Revision
- `content_hash`: Content Hash
- `is_downloadable`: Is Downloadable (boolean)

### `start_dropbox_copy_batch`

**Start Copy Batch.** Starts a job copying up to 1000 Dropbox files or folders in one call, leaving the originals in place. Small batches complete immediately; larger ones return an async job id that Get Copy Batch Status polls. Not idempotent: each call copies again, so repeating it duplicates entries. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entries` | array | yes |  | Entries. Each entry needs a From Path and a To Path. Both accept a path (/folder/file.txt) or an id (id:abc123). At most 1000 entries. Each item: { `from_path`, `to_path` }. |
| `autorename` | boolean | no | `false` | Auto Rename. Let Dropbox rename an entry when its destination conflicts. |

Output fields:

- `['.tag']`: Result
- `async_job_id`: Async Job ID
- `entries`: Entries
- `entries[].['.tag']`: Outcome
- `entries[].success.name`: Name
- `entries[].success.id`: ID
- `entries[].success.path_display`: Path
- `entries[].failure['.tag']`: Failure Reason

### `get_dropbox_copy_batch_status`

**Get Copy Batch Status.** Reads the status of a copy batch started by Start Copy Batch, returning in_progress or complete with one result per entry. Dropbox reports no overall failure for this job, so check each entry: a batch where every entry failed still reports complete. Call once per check rather than looping. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `async_job_id` | string | yes |  | Async Job ID. The job id returned by Start Copy Batch. |

Output fields:

- `['.tag']`: Status
- `entries`: Entries
- `entries[].['.tag']`: Outcome
- `entries[].success.name`: Name
- `entries[].success.id`: ID
- `entries[].success.path_display`: Path
- `entries[].failure['.tag']`: Failure Reason

### `start_dropbox_move_batch`

**Start Move Batch.** Starts a job moving up to 1000 Dropbox files or folders in one call. Small batches complete immediately; larger ones return an async job id that Get Move Batch Status polls. Not idempotent: once an entry has moved, repeating the call fails because the source path no longer exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entries` | array | yes |  | Entries. Each entry needs a From Path and a To Path. Both accept a path (/folder/file.txt) or an id (id:abc123). At most 1000 entries. Each item: { `from_path`, `to_path` }. |
| `autorename` | boolean | no | `false` | Auto Rename. Let Dropbox rename an entry when its destination conflicts. |

Output fields:

- `['.tag']`: Result
- `async_job_id`: Async Job ID
- `entries`: Entries
- `entries[].['.tag']`: Outcome
- `entries[].success.name`: Name
- `entries[].success.id`: ID
- `entries[].success.path_display`: Path
- `entries[].failure['.tag']`: Failure Reason

### `get_dropbox_move_batch_status`

**Get Move Batch Status.** Reads the status of a move batch started by Start Move Batch, returning in_progress or complete with one result per entry. Dropbox reports no overall failure for this job, so check each entry: a batch where every entry failed still reports complete. Call once per check rather than looping. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `async_job_id` | string | yes |  | Async Job ID. The job id returned by Start Move Batch. |

Output fields:

- `['.tag']`: Status
- `entries`: Entries
- `entries[].['.tag']`: Outcome
- `entries[].success.name`: Name
- `entries[].success.id`: ID
- `entries[].success.path_display`: Path
- `entries[].failure['.tag']`: Failure Reason

### `start_dropbox_delete_batch`

**Start Delete Batch.** Starts a job deleting up to 1000 Dropbox files or folders in one call. Deleted entries go to trash and remain restorable, they are not erased. Small batches complete immediately; larger ones return an async job id that Get Delete Batch Status polls. Not idempotent: a second call fails on paths already deleted. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `paths` | array | yes |  | Paths. The entries to delete, at most 1000. Each accepts a path (/folder/file.txt) or an id (id:abc123). |

Output fields:

- `['.tag']`: Result
- `async_job_id`: Async Job ID
- `entries`: Entries
- `entries[].['.tag']`: Outcome
- `entries[].metadata.name`: Name
- `entries[].metadata.id`: ID
- `entries[].metadata.path_display`: Path
- `entries[].failure['.tag']`: Failure Reason

### `get_dropbox_delete_batch_status`

**Get Delete Batch Status.** Reads the status of a delete batch started by Start Delete Batch, returning in_progress, complete with one result per entry, or failed. Check each entry as well as the overall status, since individual paths can fail inside a complete job. Call once per check rather than looping. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `async_job_id` | string | yes |  | Async Job ID. The job id returned by Start Delete Batch. |

Output fields:

- `['.tag']`: Status
- `entries`: Entries
- `entries[].['.tag']`: Outcome
- `entries[].metadata.name`: Name
- `entries[].metadata.id`: ID
- `entries[].metadata.path_display`: Path
- `entries[].failure['.tag']`: Failure Reason

### `start_dropbox_create_folder_batch`

**Start Create Folder Batch.** Starts a job creating up to 10000 Dropbox folders in one call. Small batches complete immediately; larger ones return an async job id that Get Create Folder Batch Status polls. Not idempotent: without autorename a second call conflicts on folders that already exist. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `paths` | array | yes |  | Paths. The folders to create, at most 10000. Each must be a path such as /reports/2026; this endpoint does not accept id: values. |
| `autorename` | boolean | no | `false` | Auto Rename. Let Dropbox rename a folder when its path conflicts. |

Output fields:

- `['.tag']`: Result
- `async_job_id`: Async Job ID
- `entries`: Entries
- `entries[].['.tag']`: Outcome
- `entries[].metadata.name`: Name
- `entries[].metadata.id`: ID
- `entries[].metadata.path_display`: Path
- `entries[].failure['.tag']`: Failure Reason

### `get_dropbox_create_folder_batch_status`

**Get Create Folder Batch Status.** Reads the status of a folder batch started by Start Create Folder Batch, returning in_progress, complete with one result per folder, or failed. Check each entry as well as the overall status, since individual folders can fail inside a complete job. Call once per check rather than looping. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `async_job_id` | string | yes |  | Async Job ID. The job id returned by Start Create Folder Batch. |

Output fields:

- `['.tag']`: Status
- `entries`: Entries
- `entries[].['.tag']`: Outcome
- `entries[].metadata.name`: Name
- `entries[].metadata.id`: ID
- `entries[].metadata.path_display`: Path
- `entries[].failure['.tag']`: Failure Reason

### `copy_dropbox_entry`

**Copy Entry.** Copies a Dropbox file or folder to a new path, leaving the original in place. Handles both files and folders, so no separate action is needed for each. Use Start Copy Batch for many entries at once. Not idempotent: each call creates another copy, so repeating it conflicts or, with autorename, produces duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from_path` | string | yes |  | From Path. The file or folder to copy. Accepts a path (/folder/file.txt) or an id (id:abc123). |
| `to_path` | string | yes |  | To Path. The destination path, for example /folder2/file.txt. |
| `autorename` | boolean | no | `false` | Auto Rename. Let Dropbox rename the copy when the destination conflicts. |

Output fields:

- `metadata`: Entry
- `metadata.['.tag']`: Kind
- `metadata.name`: Name
- `metadata.id`: ID
- `metadata.path_display`: Path
- `metadata.path_lower`: Path (Lowercase)
- `metadata.size`: Size (filesize)
- `metadata.client_modified`: Client Modified (datetime)
- `metadata.server_modified`: Server Modified (datetime)
- `metadata.rev`: Revision
- `metadata.content_hash`: Content Hash

### `move_dropbox_entry`

**Move Entry.** Moves a Dropbox file or folder to a new path, which also renames it. Handles both files and folders, so no separate action is needed for each. Use Start Move Batch for many entries at once. Not idempotent: once moved, repeating the call fails because the source path no longer exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from_path` | string | yes |  | From Path. The file or folder to move. Accepts a path (/folder/file.txt) or an id (id:abc123). |
| `to_path` | string | yes |  | To Path. The destination path, for example /folder2/renamed.txt. |
| `autorename` | boolean | no | `false` | Auto Rename. Let Dropbox rename the entry when the destination conflicts. |

Output fields:

- `metadata`: Entry
- `metadata.['.tag']`: Kind
- `metadata.name`: Name
- `metadata.id`: ID
- `metadata.path_display`: Path
- `metadata.path_lower`: Path (Lowercase)
- `metadata.size`: Size (filesize)
- `metadata.client_modified`: Client Modified (datetime)
- `metadata.server_modified`: Server Modified (datetime)
- `metadata.rev`: Revision
- `metadata.content_hash`: Content Hash

### `delete_dropbox_entry`

**Delete Entry.** Deletes a Dropbox file or folder, sending it to trash where it stays restorable rather than erasing it. Deleting a folder also deletes everything inside it. Handles both files and folders, so no separate action is needed for each. Not idempotent: a second call fails because the path is already gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `path` | string | yes |  | Path. The file or folder to delete. Accepts a path (/folder/file.txt) or an id (id:abc123). |

Output fields:

- `metadata`: Entry
- `metadata.['.tag']`: Kind
- `metadata.name`: Name
- `metadata.id`: ID
- `metadata.path_display`: Path
- `metadata.path_lower`: Path (Lowercase)
- `metadata.size`: Size (filesize)
- `metadata.client_modified`: Client Modified (datetime)
- `metadata.server_modified`: Server Modified (datetime)
- `metadata.rev`: Revision
- `metadata.content_hash`: Content Hash

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

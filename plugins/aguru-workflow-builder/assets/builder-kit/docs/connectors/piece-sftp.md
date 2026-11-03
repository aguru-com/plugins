# FTP/SFTP

Connect to FTP, FTPS or SFTP servers

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-sftp'
  version: '0.5.10'
```

Categories: CORE, DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `protocol` | string | no |  | Protocol. The protocol to use. One of `"sftp"`, `"ftp"`, `"ftps"`. |
| `allow_unauthorized_certificates` | boolean | no | `false` | Allow Unauthorized Certificates. Allow connections to servers with self-signed certificates. |
| `allow_anonymous_login` | boolean | no | `false` | Allow Anonymous Login. Allow anonymous login to FTP servers (only applicable for FTP/FTPS) |
| `host` | string | yes |  | Host. The host of the server. |
| `port` | number | yes | `22` | Port. The port of the server. |
| `username` | string | yes |  | Username. The username to authenticate with. |
| `password` | string | no |  | Password. The password to authenticate with. Either this or private key is required. When using a private key, this field is used as the passphrase to decrypt the key. |
| `privateKey` | string | no |  | Private Key. The private key to authenticate with. Either this or password is required. |
| `algorithm` | array | no |  | Host Key Algorithm. The host key algorithm to use for SFTP connection. Only needed if you want to override the default algorithms (e.g., to support ssh-dss). One of `"ssh-rsa"`, `"ssh-dss"`, `"ecdsa-sha2-nistp256"`, `"ecdsa-sha2-nistp384"`, `"ecdsa-sha2-nistp521"`, `"ssh-ed25519"`, `"rsa-sha2-256"`, `"rsa-sha2-512"`. |

## Actions

### `create_file`

**Create File from Text.** Writes a text string to a file at a given path on the connected FTP, FTPS or SFTP server, creating missing parent directories and overwriting any existing file at that path. Choose this when the content is plain text you already hold as a string; prefer Upload File when the content is a binary or file object produced by an earlier step. Requires the full remote path (e.g. ./myfolder/notes.txt); idempotent, since the same path and content always converge on the same stored file, but note it clobbers whatever was there before. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileName` | string | yes |  | File Path. |
| `fileContent` | string | yes |  | File content. |

Output fields:

- `status`: Status
- `error`: Error
- `error.code`: Error Code
- `error.error`: Error Detail

### `upload_file`

**Upload File.** Uploads a file object, typically one produced by an earlier step, to a given path on the connected FTP, FTPS or SFTP server, creating missing parent directories and overwriting any existing file at that path. Use this instead of Create File from Text whenever you have an actual file rather than a string of text. Requires both the file and the destination remote path (e.g. ./myfolder/test.mp3); idempotent, as repeating the upload converges on the same stored file. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileName` | string | yes |  | File Path. The path on the sftp server to store the file. e.g. `./myfolder/test.mp3`. |
| `fileContent` | file | yes |  | File content. Files are not supported; an action that needs one fails. |

Output fields:

- `status`: Status
- `error`: Error
- `error.code`: Error Code
- `error.error`: Error Detail

### `read_file_content`

**Read File Content.** Downloads one file from the connected FTP, FTPS or SFTP server by remote path and returns it as a file reference that later steps can consume. Use it to fetch the content of a file whose path you know; run List Folder Contents first when you still need to discover which paths exist. Requires an exact remote file path - it does not glob, search or recurse; read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filePath` | string | yes |  | File Path. |

Output fields:

- `file`: File (url)
- `status`: Status
- `error`: Error
- `error.code`: Error Code
- `error.error`: Error Detail

### `deleteFile`

**Delete file.** Permanently deletes a single file at a given remote path on the connected FTP, FTPS or SFTP server. Use this for one file; use Delete Folder to remove a directory, optionally with all of its contents. Requires the exact remote path (e.g. ./myfolder/test.mp3) and there is no recycle bin or undo; idempotent in that it converges on the file being absent, though a repeat call on an already-missing path reports an error. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filePath` | string | yes |  | File Path. The path of the file to delete e.g. `./myfolder/test.mp3`. |

Output fields:

- `status`: Status
- `error`: Error
- `error.code`: Error Code
- `error.error`: Error Detail

### `createFolder`

**Create Folder.** Creates a directory at a given remote path on the connected FTP, FTPS or SFTP server; on SFTP an optional recursive mode also creates any missing parent directories, while FTP/FTPS always ensures the whole path. Use it to prepare a destination directory, for example before a rename or move, noting that Create File from Text and Upload File already create parent directories themselves. Requires the folder path (e.g. ./myfolder); idempotent because it converges on that directory existing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderPath` | string | yes |  | Folder Path. The new folder path e.g. `./myfolder`. For FTP/FTPS, it will create nested folders if necessary. |
| `recursive` | boolean | no | `false` | Recursive. For SFTP only: Create parent directories if they do not exist. |

Output fields:

- `status`: Status
- `error`: Error
- `error.code`: Error Code
- `error.error`: Error Detail

### `deleteFolder`

**Delete Folder.** Deletes a directory at a given remote path on the connected FTP, FTPS or SFTP server, either only when it is empty or, with the recursive option enabled, together with every nested subfolder and file. Use this for directories; use Delete File to remove a single file. Recursive deletion is permanent and unrecoverable, so verify the path first; idempotent in that it converges on the folder being absent, and a repeat call on an already-missing path just reports an error. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderPath` | string | yes |  | Folder Path. The path of the folder to delete e.g. `./myfolder`. |
| `recursive` | boolean | no | `false` | Recursive. Enable this option to delete the folder and all its contents, including subfolders and files. |

Output fields:

- `status`: Status
- `error`: Error
- `error.code`: Error Code
- `error.error`: Error Detail

### `listFolderContents`

**List Folder Contents.** Lists the immediate entries of one directory on the connected FTP, FTPS or SFTP server. Use it to discover paths before reading, renaming or deleting, and to walk a tree one level at a time; it is not recursive and offers no filtering or search. Requires the directory path (e.g. ./myfolder); read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `directoryPath` | string | yes |  | Directory Path. The path of the folder to list e.g. `./myfolder`. |

Output fields:

- `contents`: Contents
- `contents[].name`: Name
- `contents[].type`: Type
- `contents[].size`: Size (filesize)
- `contents[].modifyTime`: Modified Time
- `contents[].accessTime`: Accessed Time
- `contents[].rights`: Permissions
- `contents[].rights.user`: Owner
- `contents[].rights.group`: Group
- `contents[].rights.other`: Other
- `contents[].owner`: Owner ID
- `contents[].group`: Group ID
- `status`: Status
- `error`: Error
- `error.code`: Error Code
- `error.error`: Error Detail

### `renameFileOrFolder`

**Rename File or Folder.** Moves a file or folder on the connected FTP, FTPS or SFTP server from an old remote path to a new one, which covers both renaming in place and, on most servers, relocating the entry into a different directory. Prefer it over reading and re-uploading content, and over a delete-then-create pair, when the bytes do not change. The parent directory of the new path must already exist, so create it with Create Folder first; idempotent in that the entry ends up at the new path, though a repeat call errors because the old path is gone. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `oldPath` | string | yes |  | Old Path. The path of the file or folder to rename e.g. `./myfolder/test.mp3`. |
| `newPath` | string | yes |  | New Path. The new path of the file or folder e.g. `./myfolder/new-name.mp3`. |

Output fields:

- `status`: Status
- `error`: Error
- `error.code`: Error Code
- `error.error`: Error Detail

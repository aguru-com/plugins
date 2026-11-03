# Amazon S3

Scalable storage in the cloud

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-amazon-s3'
  version: '0.8.0'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Amazon S3 (Access Key)

> Connect your Amazon S3 account using AWS Access Key credentials.
>
> **How to get your credentials:**
> 1. Open the [AWS IAM Console](https://console.aws.amazon.com/iam/) and go to **Users**.
> 2. Select your user (or create a new one), then go to **Security credentials**.
> 3. Click **Create access key** — copy both the Access Key ID and Secret Access Key.
> 4. Make sure the IAM user has the **AmazonS3FullAccess** policy (or a scoped S3 policy for your bucket).
>
> Using a non-AWS S3-compatible service (MinIO, DigitalOcean Spaces, Backblaze B2, etc.)? Set the **Endpoint** field to your service URL.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accessKeyId` | string | yes |  | Access Key ID. Your AWS access key ID. Found in AWS IAM Console → Users → Security credentials. |
| `secretAccessKey` | string | yes |  | Secret Access Key. Your AWS secret access key. Only shown once when you create the access key. |
| `endpoint` | string | no |  | Endpoint (Optional). Leave blank for Amazon S3. Only set when using MinIO, DigitalOcean Spaces, Backblaze B2, etc. |
| `region` | string | yes |  | Region. One of `"us-east-1"`, `"us-east-1"`, `"us-east-2"`, `"us-west-1"`, `"us-west-2"`, `"af-south-1"`, `"ap-east-1"`, `"ap-south-1"`, `"ap-northeast-3"`, `"ap-northeast-2"`, `"ap-southeast-1"`, `"ap-southeast-2"`, `"ap-northeast-1"`, `"ca-central-1"`, `"eu-central-1"`, `"eu-west-1"`, `"eu-west-2"`, `"eu-south-1"`, `"eu-west-3"`, `"eu-north-1"`, `"me-south-1"`, `"sa-east-1"`, `"eu-south-2"`, `"ap-south-2"`, `"ap-southeast-3"` and 5 more. |
| `bucket` | string | yes |  | Bucket Name. The name of your S3 bucket (e.g. "my-company-files"). |

### `OIDC`: Amazon S3 (IAM Role / OIDC)

> Connect your Amazon S3 account using an IAM Role via OIDC — no permanent keys required.
>
> Activepieces acts as an OIDC identity provider. AWS trusts this provider and issues temporary credentials via `AssumeRoleWithWebIdentity`.
>
> **Setup steps:**
> 1. In AWS IAM → Identity Providers → Create Provider:
> - Provider type: **OpenID Connect**
> - Provider URL: `{{frontendUrl}}`
> - Audience: `sts.amazonaws.com`
>
> > AWS fetches `{{frontendUrl}}/.well-known/openid-configuration` to discover the OIDC metadata. If your frontend and API run on different domains, make sure the API server is reachable at `{{frontendUrl}}` (or that your frontend proxies `/.well-known/*` to the API), otherwise `AssumeRoleWithWebIdentity` will fail.
> 2. Create an IAM Role with this trust policy:
> ```json
> {
> "Version": "2012-10-17",
> "Statement": [{
> "Effect": "Allow",
> "Principal": { "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/{{frontendHost}}" },
> "Action": "sts:AssumeRoleWithWebIdentity",
> "Condition": {
> "StringEquals": {
> "{{frontendHost}}:aud": "sts.amazonaws.com"
> },
> "StringLike": {
> "{{frontendHost}}:sub": "platform:{{platformId}}:project:{{projectId}}"
> }
> }
> }]
> }
> ```
> 3. Attach S3 permissions to the role and paste the **Role ARN** below.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roleArn` | string | yes |  | Role ARN. The ARN of the IAM role to assume (e.g. arn:aws:iam::123456789012:role/MyRole). |
| `region` | string | yes |  | Region. One of `"us-east-1"`, `"us-east-1"`, `"us-east-2"`, `"us-west-1"`, `"us-west-2"`, `"af-south-1"`, `"ap-east-1"`, `"ap-south-1"`, `"ap-northeast-3"`, `"ap-northeast-2"`, `"ap-southeast-1"`, `"ap-southeast-2"`, `"ap-northeast-1"`, `"ca-central-1"`, `"eu-central-1"`, `"eu-west-1"`, `"eu-west-2"`, `"eu-south-1"`, `"eu-west-3"`, `"eu-north-1"`, `"me-south-1"`, `"sa-east-1"`, `"eu-south-2"`, `"ap-south-2"`, `"ap-southeast-3"` and 5 more. |
| `bucket` | string | yes |  | Bucket Name. The name of your S3 bucket (e.g. "my-company-files"). |

## Actions

### `upload-file`

**Upload File.** Uploads a file to the configured S3 bucket, optionally setting a destination filename, content type, and canned ACL (e.g. private vs. public-read). Use to store new content in S3. Not idempotent: when no filename is given a unique timestamp-based key is generated, so each call writes a new object. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The file to upload to S3. Files are not supported; an action that needs one fails. |
| `fileName` | string | no |  | File Name (Optional). The name to save the file as in S3 (e.g. "report-2024.csv"). If left blank, a unique name is generated automatically. |
| `acl` | string | no |  | Access Control (ACL). Who can access this file after upload. Use "Private" for internal files, "Public Read" to make the file publicly accessible via URL. One of `"private"`, `"public-read"`, `"public-read-write"`, `"authenticated-read"`, `"aws-exec-read"`, `"bucket-owner-read"`, `"bucket-owner-full-control"`. |
| `type` | string | no |  | Content Type. Content Type of the uploaded file, if not set the API will try to figure out the content type. |

Output fields:

- `fileName`: File Key
- `etag`: ETag

### `read-file`

**Read File.** Downloads a single object from the configured S3 bucket by its full key (path) and makes its contents available as a file for later steps. Use to fetch a known file when you have its exact key. Reading the same key repeatedly returns the same content with no side effect (idempotent). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | File Path. The full path to the file within your S3 bucket (e.g. "documents/report.csv" or "myfile.txt"). This is also called the S3 "key". |

### `generate-signed-url`

**Generate signed URL.** Generates a time-limited pre-signed download (GET) URL for an existing object in the configured S3 bucket, letting anyone with the link fetch the file without AWS credentials until it expires. Use when you need to share read access to a stored file. Read-only and idempotent (no object is modified), though each call returns a freshly signed URL. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | File Path. The full path to the file within your S3 bucket (e.g. "documents/report.csv" or "myfile.txt"). This is also called the S3 "key". |
| `expiresIn` | number | yes | `10` | Expires In (minutes). How long the URL should remain valid (in minutes). |

### `generate-signed-upload-url`

**Generate Signed Upload URL.** Generates a time-limited pre-signed upload (PUT) URL for a target key in the configured S3 bucket, letting anyone with the link upload a file directly to S3 without AWS credentials until it expires. Use to delegate an upload to an external client. Generating the URL does not itself create or modify any object and is idempotent (each call returns a freshly signed URL). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | File Key. The destination path and filename inside the bucket, e.g. "uploads/photo.jpg". |
| `expiresIn` | number | yes | `10` | Expires In (minutes). How long the upload URL should remain valid (in minutes). |

Output fields:

- `url`: Signed Upload URL (url)

### `moveFile`

**Move File.** Moves an object within the configured S3 bucket by copying it to a new key under the destination folder (keeping the same filename) and then deleting the original. Use to relocate or archive a file. Not idempotent — the source object is deleted on the first successful run, so a repeat call errors because the source key no longer exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fileKey` | string | yes |  | File Path. The full path to the file you want to move (e.g. "old-folder/report.csv"). |
| `folderKey` | string | yes |  | Destination Folder. The folder path to move the file into (e.g. "archive/" or "new-folder"). The file name is kept the same. |

Output fields:

- `CopyObjectResult`: Copy Result
- `CopyObjectResult.ETag`: ETag
- `CopyObjectResult.LastModified`: Last Modified (datetime)
- `CopyObjectResult.ChecksumType`: Checksum Type
- `CopyObjectResult.ChecksumCRC32`: Checksum CRC32
- `ServerSideEncryption`: Server-Side Encryption

### `deleteFile`

**Delete File.** Deletes a single object from the configured S3 bucket by its full key (path). Use to remove a known file. Idempotent: deleting an already-absent key succeeds without error, so repeating the call has no further effect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | File Path. The full path to the file within your S3 bucket (e.g. "documents/report.csv" or "myfile.txt"). This is also called the S3 "key". |

Output fields:

- `$metadata`: Response
- `$metadata.httpStatusCode`: HTTP Status Code (number)
- `$metadata.requestId`: Request ID

### `list-files`

**List Files.** Lists objects in the configured S3 bucket, optionally filtered to a folder prefix (empty prefix lists the whole bucket), capped at a maximum count (1-1000, default 1000) and sorted newest-first. Use to discover files or look up an object key before reading, moving, or deleting it. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prefix` | string | no |  | Folder Path (Optional). Filter results to a specific folder. Enter the folder path including the trailing slash (e.g. "invoices/" or "reports/2024/"). Leave empty to list all files in the bucket. |
| `maxKeys` | number | no | `1000` | Maximum Files. Maximum number of files to return (1–1000). Defaults to 1000. Use a lower number if you only need the most recent files. |

Output fields:

- `files`: Files
- `files[].key`: File Key
- `files[].size`: Size (filesize)
- `files[].lastModified`: Last Modified (datetime)
- `files[].etag`: ETag
- `files[].storageClass`: Storage Class
- `isTruncated`: Has More (boolean)

### `decrypt-pgp-file`

**Decrypt PGP File.** Downloads a PGP-encrypted object from the configured S3 bucket and decrypts it using a private key (and optional passphrase) retrieved from AWS Secrets Manager by ARN, returning the decrypted contents as a file. Use when an S3 file is PGP-encrypted and you have the key stored in Secrets Manager. Requires the secret ARN for the private key; idempotent since it only reads and decrypts without modifying anything. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | S3 File Key. The key (path) of the encrypted file in S3. |
| `secretArn` | string | yes |  | Secret ARN. The ARN of the secret in AWS Secrets Manager containing the PGP private key. |
| `passphraseArn` | string | no |  | Passphrase ARN. Optional ARN of the secret in AWS Secrets Manager containing the passphrase for the private key (if the key is encrypted) |
| `secretsManagerRegion` | string | no |  | Secrets Manager Region. The AWS region where the Secrets Manager secret is stored (defaults to S3 region if not provided) |
| `allowUnauthenticatedMessages` | boolean | no | `false` | Allow Unauthenticated Messages. Allow decryption of messages without integrity protection (no MDC). WARNING: Without MDC, a malicious actor can silently modify the ciphertext, so the decrypted output may have been tampered with. Only enable this when working with legacy files where integrity protection was never used. |
| `allowInsecureDecryptionWithSigningKeys` | boolean | no | `false` | Allow Decryption With Signing Keys. Allow decryption using a key not marked for encryption (e.g. a signing-only key). Enable this if your PGP key was not flagged for encryption use. |

### `amazon_s3_list_files`

**List Files.** Lists files (object keys) in the connected S3 bucket, optionally under a folder prefix, in key order, one page at a time; pass the returned nextContinuationToken to get the next page. Set "List Folders Separately" to see only the immediate files and subfolders of a prefix instead of every nested file. Use it to find the exact key that the read, copy, move, tag and delete actions need. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prefix` | string | no |  | Folder Prefix. Only list keys that start with this prefix, e.g. "invoices/2024/". Leave empty for the whole bucket. |
| `listFoldersSeparately` | boolean | no | `false` | List Folders Separately. Group keys by "/": return the immediate subfolders under the prefix in "folders" and only the files directly in it in "files". |
| `maxResults` | number | no |  | Max Results. Maximum number of files and folders to return in this page (1–1000). Defaults to 100. |
| `continuationToken` | string | no |  | Continuation Token. The nextContinuationToken from a previous call, to get the next page. |
| `startAfter` | string | no |  | Start After Key. Only list keys that sort after this key. Ignored when a continuation token is given. |

Output fields:

- `files`: Files
- `files[].key`: File Key
- `files[].size`: Size (filesize)
- `files[].lastModified`: Last Modified (datetime)
- `files[].etag`: ETag
- `files[].storageClass`: Storage Class
- `folders`: Folders
- `count`: Count (number)
- `isTruncated`: Has More (boolean)
- `nextContinuationToken`: Next Continuation Token

### `amazon_s3_get_file_metadata`

**Get File Metadata.** Gets a file's size, content type, last modified date, ETag, storage class and custom metadata without downloading its content. Use it to check that a key exists or inspect a file before reading it; use Read File for the content. Pass a version id from List File Versions to inspect an older version. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | File Key. The full key (path) of the file, e.g. "reports/2024/q1.csv", as returned by List Files. |
| `versionId` | string | no |  | Version ID. A version id from List File Versions. Leave empty for the current version. |

Output fields:

- `key`: File Key
- `versionId`: Version ID
- `size`: Size (filesize)
- `contentType`: Content Type
- `lastModified`: Last Modified (datetime)
- `etag`: ETag
- `storageClass`: Storage Class
- `contentEncoding`: Content Encoding
- `contentDisposition`: Content Disposition
- `cacheControl`: Cache Control
- `serverSideEncryption`: Server-Side Encryption
- `metadata`: Custom Metadata (an object whose keys vary)

### `amazon_s3_read_file`

**Read File.** Downloads a file by key and returns it as a stored file for later steps. For text files (text/*, JSON, CSV, XML, YAML) up to 10 MB it also returns the text in "content", decoded with the declared charset (UTF-8 when none) and cut at 100,000 characters with "truncated" set; binary files, larger files and unsupported charsets return content null. Pass a version id from List File Versions to read an older version. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | File Key. The full key (path) of the file, e.g. "reports/2024/q1.csv", as returned by List Files. |
| `versionId` | string | no |  | Version ID. A version id from List File Versions. Leave empty for the current version. |

Output fields:

- `key`: File Key
- `versionId`: Version ID
- `contentType`: Content Type
- `size`: Size (filesize)
- `lastModified`: Last Modified (datetime)
- `etag`: ETag
- `content`: Text Content
- `truncated`: Truncated (boolean)
- `file`: File (url)

### `amazon_s3_upload_file`

**Upload File.** Writes a file or text content to an exact key in the connected S3 bucket, replacing any file already at that key unless "Do Not Overwrite" is set. Provide exactly one of File or Text Content. The content type is taken from the input, else guessed from the key's extension. Re-running with the same key and content leaves the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | File Key. The full key (path) to write, including the file name and extension, e.g. "reports/2024/q1.csv". |
| `file` | file | no |  | File. The file to upload. Leave empty when using Text Content. Files are not supported; an action that needs one fails. |
| `textContent` | string | no |  | Text Content. Text to store as the file content, e.g. CSV or JSON. Leave empty when using File. |
| `contentType` | string | no |  | Content Type. MIME type, e.g. "text/csv". Leave empty to guess from the key's extension. |
| `metadata` | object | no |  | Custom Metadata. Key-value pairs stored with the file as user metadata (x-amz-meta-*). |
| `doNotOverwrite` | boolean | no | `false` | Do Not Overwrite. Fail instead of replacing a file that already exists at this key. |

Output fields:

- `key`: File Key
- `contentType`: Content Type
- `etag`: ETag
- `versionId`: Version ID

### `amazon_s3_copy_file`

**Copy File.** Copies a file to a new key in the connected S3 bucket, keeping its content type and metadata; a file already at the destination key is replaced. To restore an old version, pass its version id from List File Versions and the same key as destination. Files over 5 GB cannot be copied in one call and fail with the S3 error. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceKey` | string | yes |  | Source File Key. The full key of the file to copy, as returned by List Files. |
| `destinationKey` | string | yes |  | Destination File Key. The full key to copy to, including the file name, e.g. "archive/q1.csv". |
| `sourceVersionId` | string | no |  | Source Version ID. A version id from List File Versions to copy an older version. Leave empty for the current version. |

Output fields:

- `sourceKey`: Source File Key
- `destinationKey`: Destination File Key
- `sourceVersionId`: Source Version ID
- `versionId`: Version ID
- `etag`: ETag
- `lastModified`: Last Modified (datetime)

### `amazon_s3_move_file`

**Move File.** Moves or renames a file in the connected S3 bucket by copying it to the destination key and then deleting the source key; a file already at the destination is replaced. Not idempotent: after the first run the source key no longer exists, so a repeat fails. Files over 5 GB cannot be moved in one call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sourceKey` | string | yes |  | Source File Key. The full key of the file to move, as returned by List Files. |
| `destinationKey` | string | yes |  | Destination File Key. The new full key, including the file name, e.g. "archive/2024/q1.csv". |

Output fields:

- `sourceKey`: Source File Key
- `destinationKey`: Destination File Key
- `versionId`: Version ID
- `etag`: ETag
- `lastModified`: Last Modified (datetime)

### `amazon_s3_delete_files`

**Delete Files.** Permanently deletes up to 1000 files by key from the connected S3 bucket in one call and reports which keys were deleted and which failed. On a versioned bucket this adds a delete marker and older versions stay restorable. Keys that do not exist count as deleted, so repeating the call is safe. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `keys` | array | yes |  | File Keys. The full keys of the files to delete (1–1000), as returned by List Files. |

Output fields:

- `success`: All Deleted (boolean)
- `deletedCount`: Deleted Count (number)
- `failedCount`: Failed Count (number)
- `deleted`: Deleted Files
- `deleted[].key`: File Key
- `deleted[].versionId`: Version ID
- `deleted[].deleteMarker`: Delete Marker (boolean)
- `failed`: Failed Files

### `amazon_s3_get_file_tags`

**Get File Tags.** Gets the key-value tags on a file in the connected S3 bucket (at most 10 per file); a file with no tags returns an empty list. Read these before Set File Tags when adding a tag, since setting replaces the whole set. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | File Key. The full key (path) of the file, as returned by List Files. |
| `versionId` | string | no |  | Version ID. A version id from List File Versions. Leave empty for the current version. |

Output fields:

- `key`: File Key
- `versionId`: Version ID
- `tags`: Tags
- `tags[].key`: Tag Key
- `tags[].value`: Tag Value
- `count`: Tag Count (number)

### `amazon_s3_set_file_tags`

**Set File Tags.** Replaces the whole tag set on a file in the connected S3 bucket with the given key-value pairs (1–10 tags; keys up to 128 and values up to 256 characters). Tags not in the input are removed, so to add one, read the current tags with Get File Tags and send them all. Use Delete File Tags to clear every tag. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | File Key. The full key (path) of the file, as returned by List Files. |
| `tags` | object | yes |  | Tags. The complete tag set as key-value pairs, e.g. {"project": "alpha", "status": "final"}. |
| `versionId` | string | no |  | Version ID. A version id from List File Versions. Leave empty for the current version. |

Output fields:

- `key`: File Key
- `versionId`: Version ID
- `tags`: Tags
- `tags[].key`: Tag Key
- `tags[].value`: Tag Value
- `count`: Tag Count (number)

### `amazon_s3_delete_file_tags`

**Delete File Tags.** Removes every tag from a file in the connected S3 bucket; the file itself is not changed. To remove only some tags, use Set File Tags with the tags to keep. Running it on a file with no tags succeeds. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | File Key. The full key (path) of the file, as returned by List Files. |
| `versionId` | string | no |  | Version ID. A version id from List File Versions. Leave empty for the current version. |

Output fields:

- `key`: File Key
- `versionId`: Version ID
- `deleted`: Deleted (boolean)

### `amazon_s3_list_file_versions`

**List File Versions.** Lists every stored version and delete marker of files under a key prefix in the connected S3 bucket, newest first per key, one page at a time; pass nextKeyMarker and nextVersionIdMarker to continue. The returned version ids work with Read File, Get File Metadata and Copy File, e.g. to restore a version by copying it over the current key. On a bucket without versioning each file has one version with id "null". Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prefix` | string | no |  | Key Prefix. Only list versions of keys that start with this prefix, e.g. a full file key or "reports/". Leave empty for the whole bucket. |
| `maxResults` | number | no |  | Max Results. Maximum number of versions and delete markers to return in this page (1–1000). Defaults to 100. |
| `keyMarker` | string | no |  | Key Marker. The nextKeyMarker from a previous call, to get the next page. |
| `versionIdMarker` | string | no |  | Version ID Marker. The nextVersionIdMarker from a previous call; use together with Key Marker. |

Output fields:

- `versions`: Versions
- `versions[].key`: File Key
- `versions[].size`: Size (filesize)
- `versions[].lastModified`: Last Modified (datetime)
- `versions[].etag`: ETag
- `versions[].storageClass`: Storage Class
- `versions[].versionId`: Version ID
- `versions[].isLatest`: Is Latest (boolean)
- `deleteMarkers`: Delete Markers
- `count`: Count (number)
- `isTruncated`: Has More (boolean)
- `nextKeyMarker`: Next Key Marker
- `nextVersionIdMarker`: Next Version ID Marker

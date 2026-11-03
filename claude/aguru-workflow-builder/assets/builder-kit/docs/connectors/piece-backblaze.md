# Backblaze

Scalable storage in the cloud

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-backblaze'
  version: '0.1.7'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> This piece allows you to upload files to BackBlaze Bucket compatible services.
>
> BackBlaze Settings:
> Regions: https://www.backblaze.com/apidocs/introduction-to-the-s3-compatible-api
> Endpoint: leave blank

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accessKeyId` | string | yes |  | Access Key ID. |
| `secretAccessKey` | string | yes |  | Secret Access Key. |
| `bucket` | string | yes |  | Bucket. |
| `endpoint` | string | no |  | Endpoint. |
| `region` | string | yes |  | Region. One of `"us-east-1"`, `"us-east-1"`, `"us-east-2"`, `"us-west-1"`, `"us-west-2"`, `"af-south-1"`, `"ap-east-1"`, `"ap-south-1"`, `"ap-northeast-3"`, `"ap-northeast-2"`, `"ap-southeast-1"`, `"ap-southeast-2"`, `"ap-northeast-1"`, `"ca-central-1"`, `"eu-central-1"`, `"eu-west-1"`, `"eu-west-2"`, `"eu-south-1"`, `"eu-west-3"`, `"eu-north-1"`, `"me-south-1"`, `"sa-east-1"`, `"eu-south-2"`, `"ap-south-2"`, `"ap-southeast-3"` and 5 more. |

## Actions

### `upload-backblaze-file`

**Upload File.** Uploads a file to the configured Backblaze B2 (S3-compatible) bucket, returning the stored key and a public URL. Use to persist binary or text content to object storage. Requires the file content and a MIME type; an optional file name may include a full path for sub-directories, and when omitted a timestamped name is generated. Not idempotent: it writes an object on every call, and an omitted name produces a new object each time. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. Files are not supported; an action that needs one fails. |
| `fileName` | string | no |  | File Name. my-file-name (no extension). write full path if you want to store in the directories or sub-directories. |
| `acl` | string | no |  | ACL. One of `"private"`, `"public-read"`, `"public-read-write"`, `"authenticated-read"`, `"aws-exec-read"`, `"bucket-owner-read"`, `"bucket-owner-full-control"`. |
| `type` | string | yes |  | Type. One of `"image/png"`, `"image/jpeg"`, `"image/gif"`, `"audio/mpeg"`, `"audio/wav"`, `"video/mp4"`, `"application/pdf"`, `"application/msword"`, `"text/plain"`, `"application/json"`. |

### `read-backblaze-file`

**Read File.** Fetches an object from the configured Backblaze B2 (S3-compatible) bucket by its key and writes it to a downstream file reference for use in later steps. Use to retrieve previously stored file content. Requires the exact object key including any extension. Idempotent: it only reads, leaving the bucket unchanged. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | Key. The key of the file to read. include extension if file has any extension. |

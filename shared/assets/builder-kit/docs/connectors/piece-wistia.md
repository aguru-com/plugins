# Wistia

Video hosting and analytics for business. Manage your projects and media library.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-wistia'
  version: '0.1.0'
```

Categories: MARKETING, CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Access Token

> To get your Wistia API access token:
> 1. Log in to your Wistia account.
> 2. Go to **Account Settings > API Access** (or visit https://my.wistia.com/account/api).
> 3. Click **Create Token** and give it a name.
> 4. Grant it the permissions you need (read/update/delete) and copy the token — it is only shown once.
> 5. Paste the token below.

## Actions

### `create_project`

**Create Project.** Creates a new Wistia project to hold media, with an optional admin owner email and anonymous-upload/download and public-link visibility flags. Use when an agent needs a new container before adding media. Not idempotent: each call creates a separate project even with the same name. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Project Name. The name of the new project. |
| `adminEmail` | string | no |  | Admin Email. The email of the user who will own the project. Defaults to the owner of the API token if left empty. |
| `anonymousCanUpload` | boolean | no | `false` | Allow Anonymous Uploads. Allow anonymous (logged-out) users to upload media to this project. |
| `anonymousCanDownload` | boolean | no | `false` | Allow Anonymous Downloads. Allow anonymous (logged-out) users to download media from this project. |
| `public` | boolean | no | `false` | Public. Make the project accessible to anyone with the public link. |

### `update_project`

**Update Project.** Updates an existing Wistia project (referenced by its id) — its name and its anonymous-upload/download and public-link visibility flags; omitted fields are left unchanged. Use to rename or change the sharing settings of a known project. Idempotent: repeating with the same values leaves the project in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. The project to use. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Project Name. A new name for the project. Leave empty to keep the current name. |
| `anonymousCanUpload` | boolean | no |  | Allow Anonymous Uploads. Allow anonymous (logged-out) users to upload media to this project. |
| `anonymousCanDownload` | boolean | no |  | Allow Anonymous Downloads. Allow anonymous (logged-out) users to download media from this project. |
| `public` | boolean | no |  | Public. Make the project accessible to anyone with the public link. |

### `get_media`

**Get Media.** Retrieves the full details of a single Wistia media item by its hashed media id. Use when an agent already has a specific media id and needs its current attributes. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mediaId` | string | yes |  | Media. The video or media file to use. A value the product loads from the provider, such as an id; write the value itself. |

### `find_media`

**Find Media.** Lists media in the account, returning the most recent first up to the limit. With no filters set it fetches recent media broadly; supplying a project, an exact name match, or a media type narrows the results. Use to discover media or resolve a name to a hashed media id. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | no |  | Project. Only return media that belong to this project. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. Only return media whose name exactly matches this value. |
| `type` | string | no |  | Type. Only return media of this type. One of `"Video"`, `"Audio"`, `"Image"`, `"PdfDocument"`, `"MicrosoftOfficeDocument"`, `"Swf"`, `"UnknownType"`. |
| `limit` | number | no | `25` | Limit. Maximum number of media to return (up to 100). |

### `update_media`

**Update Media.** Updates the name and/or description of an existing Wistia media item identified by its hashed media id; omitted fields are left unchanged. Use to rename or re-describe a known media. Idempotent: repeating with the same values leaves the media in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mediaId` | string | yes |  | Media. The video or media file to use. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. A new name for the media. Leave empty to keep the current name. |
| `description` | string | no |  | Description. A new description shown next to the media in Wistia. Plain text or Markdown is supported. |

### `copy_media`

**Copy Media.** Duplicates an existing Wistia media item (referenced by its hashed media id), optionally placing the copy in a target project and assigning a new owner by email. Use to clone a video or asset rather than re-uploading. Not idempotent: each call produces a new, distinct copy. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mediaId` | string | yes |  | Media. The video or media file to use. A value the product loads from the provider, such as an id; write the value itself. |
| `projectId` | string | no |  | Project. The project to use. A value the product loads from the provider, such as an id; write the value itself. |
| `owner` | string | no |  | New Owner Email. The email of the user who will own the copy. Defaults to the owner of the original media if left empty. |

### `delete_media`

**Delete Media.** Permanently removes a Wistia media item identified by its hashed media id. Use only when the media should be irreversibly deleted; this cannot be undone. Not idempotent in effect: the first call deletes the media and subsequent calls target a media that no longer exists. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mediaId` | string | yes |  | Media. The video or media file to use. A value the product loads from the provider, such as an id; write the value itself. |

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

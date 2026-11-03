# Vimeo

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-vimeo'
  version: '0.2.1'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> ### To obtain your Vimeo API access token, follow these steps:
>
> 1. Login to your Vimeo account
> 2. Create your app on Vimeo, navigate to https://developer.vimeo.com/apps
> 3. After creating the app, copy **Client identifier** and fill it to **Client ID** field below.
> 4. Scroll down and Copy **Client secrets** and fill it to **Client Secret** field below.
> 5. Scroll down and find "Your callback URLs" section, and add new URL. Make sure you copy the **Redirect URL** from the field below to Vimeo's redirect URL.
> 6. Click **Connect** from below and allow access to your account.
> 7. Save

## Actions

### `upload_video`

**Upload Video.** Uploads a new video to the authenticated user's Vimeo account by pulling it from a public video URL (the file must be reachable via that link; this is a pull-based upload, not a direct file transfer). Use to publish video content programmatically, optionally setting privacy, license, content rating, language, and a destination folder. Not idempotent: each call creates a separate video, so repeating it produces duplicates. Requires a token with the upload scope. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoUrl` | string | yes |  | Video URL. URL of the video file to upload. |
| `name` | string | yes |  | Video Name. Name for the video. |
| `description` | string | no |  | Description. Description for the video. |
| `privacy` | string | no | `"anybody"` | Privacy. Privacy setting for the video. One of `"anybody"`, `"contacts"`, `"disable"`, `"nobody"`, `"password"`, `"unlisted"`, `"users"`. |
| `password` | object | no |  | Privacy. An object whose fields depend on other inputs; the product shows them. |
| `allowEmbed` | boolean | no | `true` | Allow Embedding. Allow others to embed this video. |
| `allowDownload` | boolean | no | `false` | Allow Download. Allow others to download this video (not available for free Vimeo users) |
| `contentRating` | string | no |  | Content Rating. Content rating for the video. A value the product loads from the provider, such as an id; write the value itself. |
| `folderId` | string | no |  | Folder ID. ID of the folder to add the video to. A value the product loads from the provider, such as an id; write the value itself. |
| `language` | string | no |  | Language. Language code for the video. A value the product loads from the provider, such as an id; write the value itself. |
| `license` | string | no | `""` | License. License for the video. One of `""`, `"by"`, `"by-sa"`, `"by-nd"`, `"by-nc"`, `"by-nc-sa"`, `"by-nc-nd"`, `"cc0"`. |

### `delete_video`

**Delete Video.** Permanently deletes a video from the authenticated user's Vimeo account, identified by its video ID. Use to remove content the user owns. This is destructive and not idempotent: the first call removes the video, and repeating it on an already-deleted ID has no further effect or errors. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoId` | string | yes |  | Video ID. A value the product loads from the provider, such as an id; write the value itself. |

### `add_video_to_showcase`

**Add Video to Showcase.** Adds an existing video the user owns to one of their Vimeo showcases (albums), identified by video ID and showcase ID. Use to organize already-uploaded videos into a curated showcase; it does not upload new content. Idempotent: the video is keyed into the showcase by ID, so re-running with the same pair leaves the membership unchanged. Requires a token with the edit scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoId` | string | yes |  | Video ID. A value the product loads from the provider, such as an id; write the value itself. |
| `showcaseId` | string | yes |  | Showcase ID. ID of the showcase to add the video to. A value the product loads from the provider, such as an id; write the value itself. |

### `add_video_to_folder`

**Add Video to Folder.** Adds an existing video the user owns to one of their Vimeo folders (projects), identified by video ID and folder ID. Use to file already-uploaded videos into a folder for organization; it does not upload new content and a folder selection is required. Idempotent: the video is keyed into the folder by ID, so re-running with the same pair leaves the membership unchanged. Requires a token with the interact scope. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoId` | string | yes |  | Video ID. A value the product loads from the provider, such as an id; write the value itself. |
| `folderId` | string | no |  | Folder ID. ID of the folder to add the video to. A value the product loads from the provider, such as an id; write the value itself. |

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

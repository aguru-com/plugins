# Facebook Pages

Manage your Facebook pages to grow your business

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-facebook-pages'
  version: '0.4.2'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> To Obtain a Client ID and Client Secret:
>
> 1. Go to https://developers.facebook.com/
> 2. Register for a Facebook Developer account.
> 3. Once login, click "Make a new app" button.
> 4. Select "Other" for use cases.
> 5. Choose "Business" as the type of app.
> 6. Provide application details: custom name and associated email.
> 7. Once your application is created, you need to add a new "product".
> 8. Configure a new product of type "Facebook Login Settings".
> 9. Default settings should be fine, you only need to provide the Redirect URL in "Valid OAuth Redirect URIs" and your domain name in "Allowed Domains for the JavaScript SDK".
> 10. Finally, get your application ID and application secret from your app dashboard in Settings > Basic.

## Actions

### `create_post`

**Create Page Post.** Publishes a text status update to the feed of a Facebook Page the connected account manages, optionally attaching a link that Facebook will render as a preview card. Choose this for plain-text or link announcements; use the photo or video post actions for media uploads. Requires selecting a managed page (which supplies the page-scoped access token) and a message; not idempotent, as each call publishes a separate post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. Pages you gave access to when connecting your account. A value the product loads from the provider, such as an id; write the value itself. |
| `message` | string | yes |  | Message. |
| `link` | string | no |  | Link. Facebook adds a preview card for this link below the post. |

Output fields:

- `id`: Post ID

### `create_photo_post`

**Create Page Photo.** Publishes a photo post to a Facebook Page the connected account manages by uploading an image from a publicly reachable URL, with an optional caption. Choose this when the post is an image rather than plain text or video. Requires a managed page and a photo URL that Facebook can fetch; not idempotent, as each call creates a new photo post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. Pages you gave access to when connecting your account. A value the product loads from the provider, such as an id; write the value itself. |
| `photo` | string | yes |  | Photo URL. Public URL of the image, so Facebook can download it. |
| `caption` | string | no |  | Caption. Post text shown with the photo. |

Output fields:

- `id`: Photo ID
- `post_id`: Post ID

### `create_video_post`

**Create Page Video.** Publishes a video post to a Facebook Page the connected account manages by uploading a video from a publicly reachable URL, with an optional title and description. Choose this for video content rather than text or photo posts. Requires a managed page and a video URL Facebook can fetch (limit 1GB or 20 minutes); not idempotent, as each call uploads a new video. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. Pages you gave access to when connecting your account. A value the product loads from the provider, such as an id; write the value itself. |
| `video` | string | yes |  | Video URL. Public URL of the video file, up to 1 GB or 20 minutes. |
| `title` | string | no |  | Title. Name of the video, shown on the Page's Videos tab. |
| `description` | string | no |  | Description. Post text shown with the video. |

Output fields:

- `id`: Video ID

### `list_managed_pages`

**List Managed Pages.** List the Facebook Pages the connected account has a role on, with each Page ID, name, category, username, link and the tasks the account can perform on it. The starting point for every other Facebook Pages action, which all need a Page ID. Paginated with After Cursor. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `25` | Limit. Maximum number of items to return in this page (1 to 100). |
| `after` | string | no |  | After Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `items`: Pages
- `items[].id`: Page ID
- `items[].name`: Name
- `items[].category`: Category
- `items[].username`: Username
- `items[].link`: Link (url)
- `items[].tasks`: Tasks
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `get_page_details`

**Get Page Details.** Get the public profile of one Facebook Page the connected account manages: name, username, category, about, description, website, phone, emails, address, follower count, verification status, profile picture and cover photo. Use Fields to request other Graph API Page fields. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. Numeric ID of a Facebook Page the connected account manages. Find it with List Managed Pages. |
| `fields` | array | no |  | Fields. Graph API fields to return instead of the defaults (id,name,username,category,about,description,link,website,phone,emails,single_line_address,followers_count,verification_status,is_published,picture{url},cover{source}). |

Output fields:

- `id`: Page ID
- `name`: Name
- `username`: Username
- `category`: Category
- `about`: About
- `description`: Description
- `link`: Link (url)
- `website`: Website (url)
- `phone`: Phone
- `emails`: Emails
- `single_line_address`: Address
- `followers_count`: Followers (number)
- `verification_status`: Verification Status
- `is_published`: Published (boolean)
- `picture.data.url`: Profile Picture (image)
- `cover.source`: Cover Photo (image)

### `create_page_post`

**Create Page Post.** Publish a text or link post to the feed of a Facebook Page, now or at a scheduled time at least 10 minutes ahead. Returns the post ID in PageID_PostID format for Get Post, Update Post and Delete Post. Use Create Page Photo Post, Create Page Video Post or Create Multi-Photo Post for media. Not idempotent: each call creates a new post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. Numeric ID of a Facebook Page the connected account manages. Find it with List Managed Pages. |
| `message` | string | no |  | Message. The text of the post. Required unless a link is given. |
| `link` | string | no |  | Link. A URL to attach; Facebook renders it as a preview card. |
| `scheduledPublishTime` | ISO date-time string | no |  | Scheduled Publish Time. ISO 8601 date and time to publish the post, at least 10 minutes from now. Leave empty to publish immediately. |

Output fields:

- `id`: Post ID

### `create_page_photo_post`

**Create Page Photo Post.** Publish a single photo to a Facebook Page from a publicly reachable image URL, with an optional caption. Returns both the photo ID and the post_id (PageID_PostID); use post_id for Get Post, Update Post and Delete Post. Use Create Multi-Photo Post for several images in one post. Not idempotent: each call creates a new post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. Numeric ID of a Facebook Page the connected account manages. Find it with List Managed Pages. |
| `photoUrl` | string | yes |  | Photo URL. A public URL of the image that Facebook can download (JPEG, PNG, GIF, BMP or TIFF, up to 4 MB). |
| `caption` | string | no |  | Caption. Text shown with the photo. |

Output fields:

- `post_id`: Post ID
- `id`: Photo ID

### `create_page_video_post`

**Create Page Video Post.** Publish a video to a Facebook Page from a publicly reachable video URL (up to 1 GB or 20 minutes), with an optional title and description. Facebook processes the video after the call returns. Returns the video ID only, which is not a post ID; find the resulting post with Get Page Posts. Not idempotent: each call uploads a new video. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. Numeric ID of a Facebook Page the connected account manages. Find it with List Managed Pages. |
| `videoUrl` | string | yes |  | Video URL. A public URL of the video file that Facebook can download. |
| `title` | string | no |  | Title. |
| `description` | string | no |  | Description. Text shown with the video. |

Output fields:

- `id`: Video ID

### `create_multi_photo_post`

**Create Multi-Photo Post.** Publish one feed post on a Facebook Page that contains 2 to 20 photos from public image URLs, with an optional message. Uploads each photo unpublished, then creates the post with them attached; if an upload fails no post is created, though earlier unpublished uploads can remain. Use Create Page Photo Post for a single photo. Not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. Numeric ID of a Facebook Page the connected account manages. Find it with List Managed Pages. |
| `photoUrls` | array | yes |  | Photo URLs. Public image URLs that Facebook can download, 2 to 20 of them, in display order. |
| `message` | string | no |  | Message. Text of the post. |

Output fields:

- `post_id`: Post ID
- `photo_ids`: Photo IDs

### `get_page_posts`

**Get Page Posts.** List the posts a Facebook Page has published, newest first, with each post ID (PageID_PostID), message, created and updated time, permalink and main picture. Does not include scheduled posts (use Get Scheduled Posts) or posts by other people that tag the Page. Paginated with After Cursor. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. Numeric ID of a Facebook Page the connected account manages. Find it with List Managed Pages. |
| `limit` | number | no | `25` | Limit. Maximum number of items to return in this page (1 to 100). |
| `after` | string | no |  | After Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `items`: Posts
- `items[].id`: Post ID
- `items[].message`: Message
- `items[].created_time`: Created Time (datetime)
- `items[].updated_time`: Updated Time (datetime)
- `items[].permalink_url`: Permalink (url)
- `items[].status_type`: Post Type
- `items[].full_picture`: Picture (image)
- `items[].is_published`: Published (boolean)
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `get_post`

**Get Post.** Get one Facebook Page post by its PageID_PostID: message, created and updated time, permalink, main picture, publish status, scheduled time and attachments. Use Get Post Reactions for reaction counts. Use Fields to request other Graph API post fields. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. Numeric ID of a Facebook Page the connected account manages. Find it with List Managed Pages. |
| `postId` | string | yes |  | Post ID. The post ID in PageID_PostID format, as returned in post_id by Create Page Photo Post, in id by Create Page Post, or by Get Page Posts. A photo or video ID is not a post ID. |
| `fields` | array | no |  | Fields. Graph API fields to return instead of the defaults (id,message,created_time,updated_time,permalink_url,status_type,full_picture,is_published,scheduled_publish_time,attachments{media_type,type,title,description,url,media}). |

Output fields:

- `id`: Post ID
- `message`: Message
- `created_time`: Created Time (datetime)
- `updated_time`: Updated Time (datetime)
- `permalink_url`: Permalink (url)
- `status_type`: Post Type
- `full_picture`: Picture (image)
- `is_published`: Published (boolean)
- `scheduled_publish_time`: Scheduled Publish Time (Unix seconds) (number)
- `attachments.data`: Attachments
- `attachments.data[].type`: Type
- `attachments.data[].media_type`: Media Type
- `attachments.data[].title`: Title
- `attachments.data[].description`: Description
- `attachments.data[].url`: URL (url)
- `attachments.data[].media.image.src`: Image (image)

### `update_post`

**Update Post.** Replace the message text of an existing Facebook Page post. Facebook only allows this on posts created through this same app, such as with Create Page Post; posts made on facebook.com or by other tools cannot be edited here. Photos, videos and links on the post cannot be changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. Numeric ID of a Facebook Page the connected account manages. Find it with List Managed Pages. |
| `postId` | string | yes |  | Post ID. The post ID in PageID_PostID format, as returned in post_id by Create Page Photo Post, in id by Create Page Post, or by Get Page Posts. A photo or video ID is not a post ID. |
| `message` | string | yes |  | Message. The new text of the post. |

Output fields:

- `success`: Success (boolean)
- `post_id`: Post ID

### `delete_post`

**Delete Post.** Permanently delete one Facebook Page post by its PageID_PostID, including a scheduled post. This cannot be undone; confirm with the user first. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. Numeric ID of a Facebook Page the connected account manages. Find it with List Managed Pages. |
| `postId` | string | yes |  | Post ID. The post ID in PageID_PostID format, as returned in post_id by Create Page Photo Post, in id by Create Page Post, or by Get Page Posts. A photo or video ID is not a post ID. |

Output fields:

- `success`: Success (boolean)
- `post_id`: Post ID

### `get_scheduled_posts`

**Get Scheduled Posts.** List the posts on a Facebook Page that are scheduled but not yet published, with each post ID, message, created time and scheduled publish time. Use the IDs with Publish Scheduled Post, Reschedule Post or Delete Post. Paginated with After Cursor. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. Numeric ID of a Facebook Page the connected account manages. Find it with List Managed Pages. |
| `limit` | number | no | `25` | Limit. Maximum number of items to return in this page (1 to 100). |
| `after` | string | no |  | After Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `items`: Scheduled Posts
- `items[].id`: Post ID
- `items[].message`: Message
- `items[].created_time`: Created Time (datetime)
- `items[].scheduled_publish_time`: Scheduled Publish Time (Unix seconds) (number)
- `items[].permalink_url`: Permalink (url)
- `items[].is_published`: Published (boolean)
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `publish_scheduled_post`

**Publish Scheduled Post.** Publish a scheduled or unpublished Facebook Page post right away instead of waiting for its scheduled time. Find scheduled posts with Get Scheduled Posts. Facebook only allows this on posts created through this same app. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. Numeric ID of a Facebook Page the connected account manages. Find it with List Managed Pages. |
| `postId` | string | yes |  | Post ID. The post ID in PageID_PostID format, as returned in post_id by Create Page Photo Post, in id by Create Page Post, or by Get Page Posts. A photo or video ID is not a post ID. |

Output fields:

- `success`: Success (boolean)
- `post_id`: Post ID

### `reschedule_post`

**Reschedule Post.** Move a scheduled, not yet published Facebook Page post to a new publish time at least 10 minutes ahead. Find scheduled posts with Get Scheduled Posts; use Publish Scheduled Post to publish now instead. Facebook only allows this on posts created through this same app. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. Numeric ID of a Facebook Page the connected account manages. Find it with List Managed Pages. |
| `postId` | string | yes |  | Post ID. The post ID in PageID_PostID format, as returned in post_id by Create Page Photo Post, in id by Create Page Post, or by Get Page Posts. A photo or video ID is not a post ID. |
| `scheduledPublishTime` | ISO date-time string | yes |  | Scheduled Publish Time. ISO 8601 date and time to publish the post, at least 10 minutes from now. |

Output fields:

- `success`: Success (boolean)
- `post_id`: Post ID
- `scheduled_publish_time`: Scheduled Publish Time (datetime)

### `get_page_photos`

**Get Page Photos.** List the photos a Facebook Page has uploaded, newest first, with each photo ID, caption, created time, link, album and image sizes. Image URLs are temporary CDN links that expire. A photo ID is not a post ID. Paginated with After Cursor. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. Numeric ID of a Facebook Page the connected account manages. Find it with List Managed Pages. |
| `limit` | number | no | `25` | Limit. Maximum number of items to return in this page (1 to 100). |
| `after` | string | no |  | After Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `items`: Photos
- `items[].id`: Photo ID
- `items[].name`: Caption
- `items[].created_time`: Created Time (datetime)
- `items[].updated_time`: Updated Time (datetime)
- `items[].link`: Link (url)
- `items[].width`: Width (number)
- `items[].height`: Height (number)
- `items[].images`: Image Sizes
- `items[].images[].source`: Image (image)
- `items[].images[].width`: Width (number)
- `items[].images[].height`: Height (number)
- `items[].album`: Album
- `items[].album.id`: Album ID
- `items[].album.name`: Album Name
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `get_page_videos`

**Get Page Videos.** List the videos a Facebook Page has uploaded, newest first, with each video ID, title, description, created time, length in seconds, permalink and thumbnail. A video ID is not a post ID. Paginated with After Cursor. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. Numeric ID of a Facebook Page the connected account manages. Find it with List Managed Pages. |
| `limit` | number | no | `25` | Limit. Maximum number of items to return in this page (1 to 100). |
| `after` | string | no |  | After Cursor. The next_cursor value from a previous call, to fetch the next page. |

Output fields:

- `items`: Videos
- `items[].id`: Video ID
- `items[].title`: Title
- `items[].description`: Description
- `items[].created_time`: Created Time (datetime)
- `items[].updated_time`: Updated Time (datetime)
- `items[].length`: Length (seconds) (number)
- `items[].permalink_url`: Permalink Path
- `items[].picture`: Thumbnail (image)
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `get_post_reactions`

**Get Post Reactions.** Count the reactions on a Facebook Page post, either all reactions or only one type such as LOVE or HAHA. Returns the total count only, not the people who reacted. Very new posts can report partial counts. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageId` | string | yes |  | Page ID. Numeric ID of a Facebook Page the connected account manages. Find it with List Managed Pages. |
| `objectId` | string | yes |  | Post ID. A post ID in PageID_PostID format. |
| `type` | string | no |  | Reaction Type. Only count this reaction type. Leave empty to count all reactions. One of `"LIKE"`, `"LOVE"`, `"CARE"`, `"HAHA"`, `"WOW"`, `"SAD"`, `"ANGRY"`. |

Output fields:

- `object_id`: Post ID
- `type`: Reaction Type
- `total_count`: Total Reactions (number)

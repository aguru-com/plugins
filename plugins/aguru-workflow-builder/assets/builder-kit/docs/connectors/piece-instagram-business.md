# Instagram for Business

Grow your business on Instagram

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-instagram-business'
  version: '1.0.2'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> **Use the Facebook App ID and App Secret — not the Instagram ones.**
>
> 1. Visit https://developers.facebook.com/ and create an app.
> 2. Choose **Other** as the use case, then **Business** as the app type. Any other
> combination leaves the app without the Instagram permissions this piece requests.
> 3. Add the **Facebook Login for Business** product.
> 4. Copy the **App ID** and **App Secret** from **Settings → Basic**.
>
> The Instagram product page shows a separate *Instagram app ID* and *Instagram app secret*.
> Those belong to Instagram Login and will not work here — this piece uses Facebook Login.
>
> Your Instagram account must be a Business or Creator account linked to a Facebook Page.

## Actions

### `upload_photo`

**Upload Photo.** Publishes a single photo post to an Instagram Professional (Business/Creator) account linked to a selected Facebook Page, with an optional caption. Use to post a new image to Instagram; the photo must be supplied as a publicly accessible JPG URL. Not idempotent — each call creates and publishes a new post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `photo` | string | yes |  | Photo. A URL we can access for the photo (JPG only) |
| `caption` | string | no |  | Caption. |

Output fields:

- `id`: Media ID

### `upload_reel`

**Upload Reel.** Publishes a video reel to an Instagram Professional (Business/Creator) account linked to a selected Facebook Page, with an optional caption; it waits for the video to finish processing before publishing. Use to post a new reel to Instagram; the video must be a publicly accessible URL (max 1GB or 15 minutes). Not idempotent — each call creates and publishes a new post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `video` | string | yes |  | Video. A URL we can access for the video (Limit: 1GB or 15 minutes) |
| `caption` | string | no |  | Caption. |

Output fields:

- `id`: Media ID

### `publish_story`

**Publish Story.** Publishes one photo or video as an Instagram story, which expires after 24 hours. Supply exactly one of Photo URL or Video URL, and the media must be reachable at a public URL. Use Publish Photo or Publish Reel instead for permanent feed posts. Not idempotent — each call publishes a new story. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `photo` | string | no |  | Photo URL. Public URL of a JPG image. Leave empty when publishing a video story. |
| `video` | string | no |  | Video URL. Public URL of a video. Leave empty when publishing a photo story. |

Output fields:

- `id`: Media ID

### `publish_carousel`

**Publish Carousel.** Publishes a single Instagram carousel album containing between 2 and 10 photos or videos, given their public URLs, with an optional caption. Every item is uploaded first and processed in parallel, with up to five minutes for the items and two more for the album. A carousel counts as one post against the 100-per-24-hours publishing quota. Not idempotent — each call publishes a new album. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `items` | array | yes |  | Items. Between 2 and 10 photos or videos, in the order they should appear. Each item: { `url`, `is_video`? }. |
| `caption` | string | no |  | Caption. |

Output fields:

- `id`: Media ID

### `get_profile`

**Get Profile.** Reads the profile of one Instagram professional account: username, name, biography, website, profile picture, follower count, follows count and total media count. Use it to identify the connected account or to check follower numbers. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Instagram Account ID
- `username`: Username
- `name`: Display Name
- `biography`: Biography
- `website`: Website (url)
- `profile_picture_url`: Profile Picture (image)
- `followers_count`: Followers (number)
- `follows_count`: Following (number)
- `media_count`: Media Count (number)

### `get_account_insights`

**Get Account Insights.** Reads account-level Instagram metrics such as reach, profile views and accounts engaged, over a chosen period. Metrics cover professional accounts only and lag real time by a few hours, so a very recent post may not be reflected yet. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `metrics` | array | no |  | Metrics. Metric names, for example reach or profile_views. Defaults to reach. |
| `period` | string | no | `"day"` | Period. One of `"day"`, `"week"`, `"days_28"`, `"lifetime"`. |

Output fields:

- `insights`: Insights
- `insights[].id`: Metric ID
- `insights[].name`: Metric
- `insights[].title`: Title
- `insights[].description`: Description
- `insights[].period`: Period
- `insights[].total_value`: Total Value
- `insights[].total_value.value`: Value (number)
- `insights[].values`: Values
- `insights[].values[].value`: Value (number)
- `insights[].values[].end_time`: End Time (datetime)
- `count`: Count (number)

### `get_content_publishing_limit`

**Get Content Publishing Limit.** Reads how much of the Instagram publishing quota the account has consumed in the rolling 24 hour window. Instagram allows 100 API-published posts per 24 hours, and a carousel counts as one. Call this before a batch of posts to avoid hitting the cap mid-run. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `quota_usage`: Quota Used (number)
- `quota_total`: Quota Total (number)
- `quota_remaining`: Quota Remaining (number)
- `quota_duration_seconds`: Window Length (seconds) (number)

### `list_media`

**List Media.** Lists the media (posts, reels and albums) published by the connected Instagram professional account, newest first, with caption, permalink, media type and engagement counts. Use it to find a recent post or its id before reading or commenting on it. Stories are not included — use List Stories for those. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no |  | Limit. Maximum number of posts to return (default 25). |
| `cursor` | string | no |  | Cursor. Next Cursor from a previous run, to fetch the following page. |

Output fields:

- `media`: Media
- `media[].id`: Media ID
- `media[].caption`: Caption
- `media[].media_type`: Media Type
- `media[].media_product_type`: Product Type
- `media[].media_url`: Media URL (image)
- `media[].thumbnail_url`: Thumbnail URL (image)
- `media[].permalink`: Permalink (url)
- `media[].timestamp`: Published At (datetime)
- `media[].username`: Username
- `media[].like_count`: Likes (number)
- `media[].comments_count`: Comments (number)
- `media[].is_comment_enabled`: Comments Enabled (boolean)
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `get_media`

**Get Media.** Reads one Instagram post, reel or album by its media id, returning caption, permalink, media type, media URL, timestamp and engagement counts. Use it after List Media, or when a trigger or earlier step supplied a media id. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `media_id` | string | yes |  | Media ID. The id of the post, as returned by List Media or a publish action. |

Output fields:

- `id`: Media ID
- `caption`: Caption
- `media_type`: Media Type
- `media_product_type`: Product Type
- `media_url`: Media URL (image)
- `thumbnail_url`: Thumbnail URL (image)
- `permalink`: Permalink (url)
- `timestamp`: Published At (datetime)
- `username`: Username
- `like_count`: Likes (number)
- `comments_count`: Comments (number)
- `is_comment_enabled`: Comments Enabled (boolean)

### `get_media_insights`

**Get Media Insights.** Reads per-post Instagram metrics such as reach, likes, comments, saves and shares for one media id. Available metrics differ by media type, since reels and stories expose different ones from feed images, and an unsupported metric returns an error naming it. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `media_id` | string | yes |  | Media ID. |
| `metrics` | array | no |  | Metrics. Metric names. Defaults to reach, likes and comments (reach, replies and shares for stories). |

Output fields:

- `insights`: Insights
- `insights[].id`: Metric ID
- `insights[].name`: Metric
- `insights[].title`: Title
- `insights[].description`: Description
- `insights[].period`: Period
- `insights[].total_value`: Total Value
- `insights[].total_value.value`: Value (number)
- `insights[].values`: Values
- `insights[].values[].value`: Value (number)
- `insights[].values[].end_time`: End Time (datetime)
- `count`: Count (number)

### `list_carousel_children`

**List Carousel Children.** Lists the individual photos and videos inside one Instagram carousel album, given the album media id. Only works on media whose media_type is CAROUSEL_ALBUM; other posts return an empty list. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `media_id` | string | yes |  | Carousel Media ID. The id of a post whose media type is CAROUSEL_ALBUM. |

Output fields:

- `children`: Children
- `children[].id`: Media ID
- `children[].media_type`: Media Type
- `children[].media_url`: Media URL (image)
- `children[].thumbnail_url`: Thumbnail URL (image)
- `children[].permalink`: Permalink (url)
- `children[].timestamp`: Published At (datetime)
- `count`: Count (number)

### `list_stories`

**List Stories.** Lists the stories that are currently live on the connected Instagram professional account. Stories expire after 24 hours and disappear from this list once they do, so an empty result means nothing is live rather than that something failed. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `stories`: Stories
- `stories[].id`: Story ID
- `stories[].media_type`: Media Type
- `stories[].media_url`: Media URL (image)
- `stories[].thumbnail_url`: Thumbnail URL (image)
- `stories[].permalink`: Permalink (url)
- `stories[].timestamp`: Published At (datetime)
- `count`: Count (number)

### `list_tagged_media`

**List Tagged Media.** Lists posts published by other Instagram accounts in which the connected account was tagged. These belong to other people, so they cannot be edited or deleted, and the list is useful for monitoring brand mentions. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no |  | Limit. |
| `cursor` | string | no |  | Cursor. Next Cursor from a previous run, to fetch the following page. |

Output fields:

- `media`: Media
- `media[].id`: Media ID
- `media[].caption`: Caption
- `media[].media_type`: Media Type
- `media[].media_product_type`: Product Type
- `media[].media_url`: Media URL (image)
- `media[].thumbnail_url`: Thumbnail URL (image)
- `media[].permalink`: Permalink (url)
- `media[].timestamp`: Published At (datetime)
- `media[].username`: Username
- `media[].like_count`: Likes (number)
- `media[].comments_count`: Comments (number)
- `media[].is_comment_enabled`: Comments Enabled (boolean)
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `delete_media`

**Delete Media.** Permanently deletes one Instagram post, story, reel or whole carousel album belonging to the connected account. Individual items inside a carousel cannot be deleted, only the album as a whole, and the deletion cannot be undone. Not idempotent, since deleting an already deleted post fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `media_id` | string | yes |  | Media ID. |

Output fields:

- `success`: Success (boolean)
- `id`: ID

### `set_media_comments_enabled`

**Enable or Disable Comments.** Turns commenting on or off for one Instagram post belonging to the connected account. Disabling hides the existing comments from public view and blocks new ones, and re-enabling restores them. Idempotent, since setting the same state twice leaves the post unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `media_id` | string | yes |  | Media ID. |
| `enabled` | boolean | yes | `true` | Comments Enabled. |

Output fields:

- `success`: Success (boolean)
- `id`: ID

### `list_media_comments`

**List Comments.** Lists the top-level comments on one Instagram post, with author, text, timestamp, like count and whether the comment is hidden. Replies are not included — use List Comment Replies for those. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `media_id` | string | yes |  | Media ID. |
| `limit` | number | no |  | Limit. Maximum number of comments to return (default 25). |
| `cursor` | string | no |  | Cursor. Next Cursor from a previous run, to fetch the following page. |

Output fields:

- `comments`: Comments
- `comments[].id`: Comment ID
- `comments[].text`: Text
- `comments[].username`: Author Username
- `comments[].timestamp`: Posted At (datetime)
- `comments[].like_count`: Likes (number)
- `comments[].hidden`: Hidden (boolean)
- `comments[].parent_id`: Parent Comment ID
- `comments[].media`: Media
- `comments[].media.id`: Media ID
- `comments[].media.media_type`: Media Type
- `comments[].media.permalink`: Permalink (url)
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `get_comment`

**Get Comment.** Reads one Instagram comment by its id, returning its text, author, timestamp, like count, hidden state and the media it belongs to. Use it after a New Comment trigger or List Comments. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `comment_id` | string | yes |  | Comment ID. |

Output fields:

- `id`: Comment ID
- `text`: Text
- `username`: Author Username
- `timestamp`: Posted At (datetime)
- `like_count`: Likes (number)
- `hidden`: Hidden (boolean)
- `parent_id`: Parent Comment ID
- `media`: Media
- `media.id`: Media ID
- `media.media_type`: Media Type
- `media.permalink`: Permalink (url)

### `list_comment_replies`

**List Comment Replies.** Lists the replies made to one Instagram comment, given the parent comment id. A comment with no replies returns an empty list. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `comment_id` | string | yes |  | Parent Comment ID. |

Output fields:

- `comments`: Comments
- `comments[].id`: Comment ID
- `comments[].text`: Text
- `comments[].username`: Author Username
- `comments[].timestamp`: Posted At (datetime)
- `comments[].like_count`: Likes (number)
- `comments[].hidden`: Hidden (boolean)
- `comments[].parent_id`: Parent Comment ID
- `comments[].media`: Media
- `comments[].media.id`: Media ID
- `comments[].media.media_type`: Media Type
- `comments[].media.permalink`: Permalink (url)
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `create_comment`

**Create Comment.** Posts a new top-level comment on one of the connected account’s own Instagram posts. To answer an existing comment use Reply To Comment instead, which threads the response. Not idempotent — each call posts another comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `media_id` | string | yes |  | Media ID. |
| `message` | string | yes |  | Comment. |

Output fields:

- `id`: Comment ID
- `media_id`: Media ID
- `parent_id`: Parent Comment ID

### `reply_to_comment`

**Reply To Comment.** Replies to an existing Instagram comment, threading the response underneath it. Instagram supports only one level of threading, so replying to a reply attaches the response to the same parent. Not idempotent — each call posts another reply. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `comment_id` | string | yes |  | Comment ID. |
| `message` | string | yes |  | Reply. |

Output fields:

- `id`: Comment ID
- `media_id`: Media ID
- `parent_id`: Parent Comment ID

### `set_comment_visibility`

**Hide or Unhide Comment.** Hides an Instagram comment from everyone except its author, or unhides a previously hidden one, controlled by the Hidden toggle. Unlike Delete Comment this is reversible and the comment is not destroyed. Idempotent — setting the same state twice leaves the comment unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `comment_id` | string | yes |  | Comment ID. |
| `hidden` | boolean | yes | `true` | Hidden. On hides the comment, off makes it visible again. |

Output fields:

- `success`: Success (boolean)
- `id`: ID

### `delete_comment`

**Delete Comment.** Permanently deletes one Instagram comment by its id. This cannot be undone, and only comments on the connected account’s own media can be deleted. To silence a comment reversibly, use Hide Comment instead. Not idempotent — deleting an already deleted comment fails. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `comment_id` | string | yes |  | Comment ID. |

Output fields:

- `success`: Success (boolean)
- `id`: ID

### `list_conversations`

**List Conversations.** Lists the Instagram direct message threads belonging to the connected professional account, newest activity first, with the participants and the time of the last message. Use it to find a conversation id before reading or replying to a thread. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no |  | Limit. |
| `cursor` | string | no |  | Cursor. Next Cursor from a previous run, to fetch the following page. |

Output fields:

- `conversations`: Conversations
- `conversations[].id`: Conversation ID
- `conversations[].updated_time`: Last Activity (datetime)
- `conversations[].participants`: Participants
- `conversations[].participants.data`: People
- `conversations[].participants.data[].id`: User ID
- `conversations[].participants.data[].username`: Username
- `count`: Count (number)
- `next_cursor`: Next Cursor

### `list_messages`

**List Messages.** Reads the messages inside one Instagram direct message thread, given a conversation id from List Conversations, with sender, recipient, text and timestamp for each. Instagram returns only the most recent messages of a thread rather than its full history. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `conversation_id` | string | yes |  | Conversation ID. From List Conversations. |

Output fields:

- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].message`: Text
- `messages[].created_time`: Sent At (datetime)
- `messages[].from`: From
- `messages[].from.id`: User ID
- `messages[].from.username`: Username
- `messages[].to`: To
- `messages[].to.data`: Recipients
- `messages[].to.data[].id`: User ID
- `messages[].to.data[].username`: Username
- `count`: Count (number)

### `send_message`

**Send Message.** Sends a text direct message to one Instagram user, addressed by their Instagram-scoped user id as supplied by a New Message trigger or List Conversations. Instagram only allows a reply within 24 hours of that user last messaging the account, so an older thread is rejected. Not idempotent, since each call sends another message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `recipient_id` | string | yes |  | Recipient ID. The Instagram-scoped user id of the person to message. |
| `text` | string | yes |  | Message. |

Output fields:

- `message_id`: Message ID
- `recipient_id`: Recipient ID

### `send_media_message`

**Send Media Message.** Sends an image, video or audio file as an Instagram direct message, given a publicly reachable URL and the recipient Instagram-scoped user id. The same 24 hour reply window applies as for a text message. Not idempotent, since each call sends another message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `recipient_id` | string | yes |  | Recipient ID. |
| `media_type` | string | yes | `"image"` | Media Type. One of `"image"`, `"video"`, `"audio"`. |
| `url` | string | yes |  | Media URL. Publicly reachable URL of the file. Instagram fetches it server side and rejects some hosts with an upload error, so prefer a plain static file URL. |

Output fields:

- `message_id`: Message ID
- `recipient_id`: Recipient ID

### `send_private_reply`

**Send Private Reply.** Sends a direct message to the author of a comment, given the comment id rather than a user id, which is how Instagram supports the comment-to-DM pattern. Allowed once per comment and only within 7 days of it, and unlike Send Message it does not need an existing conversation. Not idempotent, and a second private reply to the same comment is rejected. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | string | yes |  | Page. A value the product loads from the provider, such as an id; write the value itself. |
| `comment_id` | string | yes |  | Comment ID. The comment whose author should receive the direct message. |
| `text` | string | yes |  | Message. |

Output fields:

- `message_id`: Message ID
- `recipient_id`: Recipient ID

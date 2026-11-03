# Nuelink

Social media scheduling: create, schedule, edit and track posts across your Nuelink brands and collections.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-nuelink'
  version: '0.2.1'
```

Categories: CONTENT_AND_FILES, MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Automation Token (legacy)

> Works only with **Create Post**, which adds posts to the one collection chosen when the token was made. For every other action, add an **API Key** connection instead.
>
> To get an automation token:
> 1. Sign in to Nuelink and open **Automations**.
> 2. Create a new automation for **Activepieces** and pick the collection the posts should go to.
> 3. Copy the token Nuelink shows and paste it here.

### `CUSTOM_AUTH`: API Key (recommended)

> Works with every Nuelink action: choose the brand and collection, schedule, edit, delete and track posts.
>
> To get an API key:
> 1. Sign in to Nuelink and open **Settings → API**.
> 2. Click **Generate API key**, choose how long it stays valid (up to 1 year) and copy it. Nuelink shows it only once.
> 3. Paste it below. The key acts as your Nuelink user and sees the same brands you do.
>
> To use **Delete Post**, also turn on **Allow AI to perform sensitive actions** on the same page.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. The key from Nuelink Settings → API. |

## Actions

### `create_collection_post`

**Create Post in Collection.** Creates a post in a Nuelink collection; it goes to every channel connected to that collection. DRAFT (the default) saves without publishing, QUEUE takes the collection's next time slot, SCHEDULE needs scheduledAt at least 10 minutes ahead, and IMMEDIATE publishes now. Use IMMEDIATE only when the user explicitly asks to post now. Each call creates a new post, so do not retry after a timeout without checking List Posts first. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brand` | string | yes |  | Brand. The Nuelink brand (workspace) to use. A value the product loads from the provider, such as an id; write the value itself. |
| `collection` | string | yes |  | Collection. The collection to add the post to. The post is published to every channel connected to it. A value the product loads from the provider, such as an id; write the value itself. |
| `publishMode` | string | yes | `"DRAFT"` | Publish Mode. Draft saves the post without publishing it. Queue gives it the collection's next free time slot. Schedule publishes it at Scheduled Time. Publish Now sends it to every channel immediately. One of `"DRAFT"`, `"QUEUE"`, `"SCHEDULE"`, `"IMMEDIATE"`. |
| `scheduledAt` | ISO date-time string | no |  | Scheduled Time. Only for Publish Mode = Schedule, at least 10 minutes ahead. Include a timezone offset; it is converted to the brand's timezone for Nuelink. |
| `caption` | string | yes |  | Caption. The text of the post, up to 3,000 characters. Separating parts with two empty lines turns it into a thread (up to 10 parts). |
| `title` | string | no |  | Title. Title used for videos, Reels and Pinterest pins (up to 255 characters). |
| `media` | array | no |  | Media. Up to 10 images or videos. Each entry is a public http(s) URL that Nuelink downloads (it must open without a login), or a media ID from Upload Media. |
| `alt` | string | no |  | Alt Text. Describes the image or video for screen readers (up to 255 characters). |
| `link` | string | no |  | Link. Destination link for Pinterest pins and the Google Business "Learn more" button. |
| `postAsStory` | boolean | no | `false` | Post as Story. Publish as a story on channels that support stories. |
| `autoThreadText` | boolean | no | `false` | Split Long Text into a Thread. Let Nuelink split text that is too long for a channel into a thread. |
| `firstComment` | string | no |  | First Comment. A comment Nuelink adds under the post after it is published (up to 1,000 characters). Set First Comment Delay too. |
| `firstCommentDelaySeconds` | number | no |  | First Comment Delay (seconds). How many seconds after publishing to post the first comment. Required when First Comment is set. |
| `instagramShareToFeed` | boolean | no | `false` | Instagram: Share Reel to Feed. When on, Instagram Reels also appear in the feed. When off, Nuelink's default applies. |
| `instagramCollab` | string | no |  | Instagram: Collaborator. Instagram username to invite as a collaborator. |
| `tiktokAutoAddMusic` | boolean | no | `false` | TikTok: Add Music Automatically. When on, TikTok adds music to photo posts. When off, Nuelink's default applies. |
| `youtubeTags` | array | no |  | YouTube: Tags. Tags for YouTube videos. |

Output fields:

- `id`: Post ID (number)
- `message`: Message
- `brandId`: Brand ID
- `collectionId`: Collection ID
- `publishMode`: Publish Mode
- `scheduledAt`: Scheduled For (Brand Time)
- `scheduledAtUtc`: Scheduled For (UTC) (datetime)
- `brandTimezone`: Brand Timezone

### `update_post`

**Update Post.** Edits a post that has not been published yet: change its caption, turn it back into a draft, reschedule it, re-queue it, or move it to the front or back of its queue. Published posts (409) and polls cannot be edited. To stop a post from going out, set publishMode DRAFT rather than deleting it. Setting the same values again changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brand` | string | yes |  | Brand. The Nuelink brand (workspace) to use. A value the product loads from the provider, such as an id; write the value itself. |
| `postId` | string | yes |  | Post ID. The numeric ID of the post, from Create Post in Collection or List Posts. |
| `caption` | string | no |  | New Caption. Replaces the post text (up to 3,000 characters). Leave empty to keep the current caption. Media is not changed. |
| `publishMode` | string | no |  | New Publish Mode. Leave empty to keep the current mode. One of `"DRAFT"`, `"QUEUE"`, `"SCHEDULE"`. |
| `scheduledAt` | ISO date-time string | no |  | Scheduled Time. Required when New Publish Mode is Schedule, at least 10 minutes ahead; not allowed otherwise. Include a timezone offset. |
| `queuePosition` | string | no |  | Queue Position. Move a queued post to the front or back of its collection queue. Works on its own or with New Publish Mode = Add to Queue. One of `"FRONT"`, `"BACK"`. |

Output fields:

- `id`: Post ID (number)
- `collectionId`: Collection ID (number)
- `title`: Title
- `body`: Caption
- `media`: Media
- `media[].id`: Media ID
- `postType`: Post Type
- `postingType`: Publish Mode
- `status`: Status
- `postDate`: Scheduled For (UTC)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `poll`: Poll
- `poll.question`: Question
- `poll.options`: Options
- `poll.caption`: Caption
- `poll.period`: Duration
- `poll.correctOptionIndex`: Correct Option Index (number)
- `poll.explanation`: Explanation

### `delete_post`

**Delete Post.** Permanently deletes a post from Nuelink; anything already published on a social network stays there. Nuelink refuses this (403) unless the account owner enabled "Allow AI to perform sensitive actions" in Settings → API. Prefer Update Post with publishMode DRAFT to stop a post. Cannot be undone, and a repeat call fails with 404. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brand` | string | yes |  | Brand. The Nuelink brand (workspace) to use. A value the product loads from the provider, such as an id; write the value itself. |
| `postId` | string | yes |  | Post ID. The numeric ID of the post to delete, from Create Post in Collection or List Posts. |

Output fields:

- `id`: Deleted Post ID (number)
- `message`: Message

### `list_posts`

**List Posts.** Lists a brand's posts (drafts, queued, scheduled, published), optionally for one collection, with type and creation-date filters, one page at a time (hasMore says whether to ask for the next page). Use it to find a post ID or to check what is queued. Use List Published Posts for delivery status and engagement. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brand` | string | yes |  | Brand. The Nuelink brand (workspace) to use. A value the product loads from the provider, such as an id; write the value itself. |
| `collection` | string | no |  | Collection. Only list posts of this collection. Leave empty for all collections. A value the product loads from the provider, such as an id; write the value itself. |
| `view` | string | no |  | Show. Which kind of posts to list. Leave empty for all. One of `"QUEUE"`, `"SCHEDULED"`, `"DRAFT"`, `"PUBLISHED"`. |
| `postType` | string | no |  | Post Type. One of `"TEXT"`, `"IMAGE"`, `"VIDEO"`, `"MULTIMEDIA"`, `"SHORT"`, `"DOCUMENT"`, `"THREAD"`, `"SLIDES"`, `"REEL"`, `"TIKTOK"`, `"STORY"`, `"POLL"`, `"ENGAGE_COMMENT"`. |
| `createdFrom` | ISO date-time string | no |  | Created From. Only posts created at or after this time. A time without a timezone is read as UTC. |
| `createdTo` | ISO date-time string | no |  | Created To. Only posts created at or before this time. A time without a timezone is read as UTC. |
| `sortBy` | string | no | `"id"` | Sort By. One of `"id"`, `"title"`, `"post_date"`, `"created_at"`, `"updated_at"`. |
| `sortOrder` | string | no | `"desc"` | Sort Order. One of `"desc"`, `"asc"`. |
| `page` | number | no | `1` | Page. Which page of results to return, starting at 1. When the output says hasMore is true, run again with the next page number. |
| `perPage` | number | no | `25` | Results per Page. How many results to return per page (1 to 100). |

Output fields:

- `items`: Posts
- `items[].id`: Post ID (number)
- `items[].collectionId`: Collection ID (number)
- `items[].title`: Title
- `items[].body`: Caption
- `items[].media`: Media
- `items[].media[].id`: Media ID
- `items[].postType`: Post Type
- `items[].postingType`: Publish Mode
- `items[].status`: Status
- `items[].postDate`: Scheduled For (UTC)
- `items[].createdAt`: Created At (datetime)
- `items[].updatedAt`: Updated At (datetime)
- `items[].poll`: Poll
- `items[].poll.question`: Question
- `items[].poll.options`: Options
- `items[].poll.caption`: Caption
- `items[].poll.period`: Duration
- `items[].poll.correctOptionIndex`: Correct Option Index (number)
- `items[].poll.explanation`: Explanation
- `page`: Page (number)
- `perPage`: Results per Page (number)
- `total`: Total Matching (number)
- `lastPage`: Last Page (number)
- `hasMore`: Has More Pages (boolean)

### `list_published_posts`

**List Published Posts.** Lists what Nuelink actually sent to each channel, one entry per channel: delivery status (published, failed, retrying, skipped), the platform post URL, and engagement counts (likes, comments, shares, views, saves, clicks, impressions, reach). Filter by collection, channel, source post, text search or publish date; one page per call with hasMore. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brand` | string | yes |  | Brand. The Nuelink brand (workspace) to use. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no | `"PUBLISHED"` | Delivery Status. One of `"PUBLISHED"`, `"FAILED"`, `"RETRYING"`, `"SKIPPED"`, `"SENT"`. |
| `collection` | string | no |  | Collection. Only results from this collection. Leave empty for all collections. A value the product loads from the provider, such as an id; write the value itself. |
| `channel` | string | no |  | Channel. Only return results for this social channel. A value the product loads from the provider, such as an id; write the value itself. |
| `postId` | string | no |  | Post ID. Only results of this Nuelink post (the ID from Create Post in Collection or List Posts). |
| `search` | string | no |  | Search Text. Only results whose published text contains this (not case-sensitive, up to 255 characters). |
| `publishedFrom` | ISO date-time string | no |  | Published From. Only results published at or after this time. A time without a timezone is read as UTC. |
| `publishedTo` | ISO date-time string | no |  | Published To. Only results published at or before this time. A time without a timezone is read as UTC. |
| `sortBy` | string | no | `"id"` | Sort By. One of `"id"`, `"created_at"`, `"likes"`, `"comments"`, `"shares"`. |
| `sortOrder` | string | no | `"desc"` | Sort Order. One of `"desc"`, `"asc"`. |
| `page` | number | no | `1` | Page. Which page of results to return, starting at 1. When the output says hasMore is true, run again with the next page number. |
| `perPage` | number | no | `25` | Results per Page. How many results to return per page (1 to 100). |

Output fields:

- `items`: Published Results
- `items[].id`: Published Result ID (number)
- `items[].postId`: Post ID (number)
- `items[].collectionId`: Collection ID (number)
- `items[].channel`: Channel
- `items[].channel.id`: Channel ID (number)
- `items[].channel.name`: Channel Name
- `items[].channel.type`: Platform
- `items[].postType`: Post Type
- `items[].body`: Published Text
- `items[].url`: Post URL (url)
- `items[].status`: Delivery Status
- `items[].message`: Delivery Message
- `items[].publishedAt`: Published At (datetime)
- `items[].results`: Engagement
- `items[].results.likes`: Likes (number)
- `items[].results.comments`: Comments (number)
- `items[].results.shares`: Shares (number)
- `items[].results.views`: Views (number)
- `items[].results.saves`: Saves (number)
- `items[].results.engagement`: Engagement (number)
- `items[].results.clicks`: Clicks (number)
- `items[].results.impressions`: Impressions (number)
- `items[].results.reach`: Reach (number)
- `page`: Page (number)
- `perPage`: Results per Page (number)
- `total`: Total Matching (number)
- `lastPage`: Last Page (number)
- `hasMore`: Has More Pages (boolean)

### `upload_media`

**Upload Media.** Uploads one image, video or PDF (jpg, jpeg, png, bmp, mp4, mov, pdf; up to 100 MB) to the brand's Nuelink media library and returns its media ID for Create Post in Collection. Not needed when the file already has a public URL, since Create Post in Collection accepts URLs directly. Each call stores a new copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brand` | string | yes |  | Brand. The Nuelink brand (workspace) to use. A value the product loads from the provider, such as an id; write the value itself. |
| `file` | file | yes |  | File. A JPG, PNG, BMP, MP4, MOV or PDF file, up to 100 MB. Files are not supported; an action that needs one fails. |

Output fields:

- `id`: Media ID
- `type`: MIME Type
- `size`: Size (filesize)

### `createPost`

**Create Post.** Adds a post to the single Nuelink collection tied to this connection's automation token; the post then follows that collection's channels and schedule. It cannot choose the collection, publish mode or time, and needs an Automation Token connection; prefer Create Post in Collection. Each call creates a new post, so retries duplicate it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `body` | string | yes |  | Caption. The text of the post. |
| `media` | string | no |  | Media. Public URL of one image or video. Nuelink downloads it, so it must open without a login. |
| `title` | string | no |  | Title. Enter a title to use for your Reels, videos and/or Pinterest posts. |
| `altText` | string | no |  | Alt Text. Enter an alt text for your image or video. |
| `shareToFeed` | boolean | no | `false` | Share Instagram Reel to Feed. Share your Instagram Reel to your feed as well. |
| `postAsShort` | boolean | no | `false` | Treat videos as short-form vertical videos. We will treat the videos imported as short-form vertical videos (Reels, Shorts, Tiktoks etc...). |

### `nuelink_list_brands`

**List Brands.** Lists the Nuelink brands (workspaces) the API key can access, with each brand's timezone, which scheduled times are interpreted in. Call this first to get a brandId; on multi-brand accounts, match the brand by title instead of taking the first one. One page per call with hasMore. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no | `1` | Page. Which page of results to return, starting at 1. When the output says hasMore is true, run again with the next page number. |
| `perPage` | number | no | `25` | Results per Page. How many results to return per page (1 to 100). |

Output fields:

- `items`: Brands
- `items[].id`: Brand ID (number)
- `items[].title`: Name
- `items[].description`: Description
- `items[].timezone`: Timezone
- `items[].queueStatus`: Queue Status
- `items[].createdAt`: Created At (datetime)
- `items[].updatedAt`: Updated At (datetime)
- `page`: Page (number)
- `perPage`: Results per Page (number)
- `total`: Total Matching (number)
- `lastPage`: Last Page (number)
- `hasMore`: Has More Pages (boolean)

### `nuelink_list_collections`

**List Collections.** Lists a brand's collections with their connected channels, weekly queue slots (brand timezone) and post counts. Use it to choose the collectionId for nuelink_create_post, nuelink_move_posts or nuelink_add_collection_channel, and to read queues[].id for nuelink_delete_collection_queue_slot; the collection's channels are where the post will go, and a collection with no channels publishes nowhere. The collection timezone may be an offset such as +03:00; queue slots are in the brand timezone. One page per call with hasMore. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from List Brands. |
| `page` | number | no | `1` | Page. Which page of results to return, starting at 1. When the output says hasMore is true, run again with the next page number. |
| `perPage` | number | no | `25` | Results per Page. How many results to return per page (1 to 100). |

Output fields:

- `items`: Collections
- `items[].id`: Collection ID (number)
- `items[].title`: Name
- `items[].description`: Description
- `items[].status`: Status
- `items[].timezone`: Timezone
- `items[].evergreen`: Evergreen
- `items[].evergreen.enabled`: Enabled (boolean)
- `items[].evergreen.maxRepublish`: Max Republish (number)
- `items[].channels`: Channels
- `items[].channels[].id`: Channel ID (number)
- `items[].channels[].name`: Name
- `items[].channels[].status`: Status
- `items[].channels[].type`: Platform
- `items[].queues`: Queue Slots
- `items[].queues[].id`: Slot ID (number)
- `items[].queues[].day`: Day
- `items[].queues[].time`: Time (Brand Timezone)
- `items[].queues[].date`: Day and Time
- `items[].queues[].status`: Status
- `items[].createdAt`: Created At (datetime)
- `items[].updatedAt`: Updated At (datetime)
- `items[].maxRepublish`: Evergreen Interval (weeks) (number)
- `items[].postsCount`: Post Counts
- `items[].postsCount.queued`: Queued (number)
- `items[].postsCount.scheduled`: Scheduled (number)
- `items[].postsCount.drafts`: Drafts (number)
- `items[].postsCount.published`: Published (number)
- `page`: Page (number)
- `perPage`: Results per Page (number)
- `total`: Total Matching (number)
- `lastPage`: Last Page (number)
- `hasMore`: Has More Pages (boolean)

### `nuelink_get_me`

**Get Profile.** Returns the user the API key acts as (opaque id, name, joinedAt, timezone), to confirm whose account is in use. The user timezone may be null or an internal UUID: never use it for scheduling; scheduled times use the brand timezone from nuelink_list_brands. Read-only. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: User ID
- `name`: Name
- `joinedAt`: Joined At (datetime)
- `timezone`: User Timezone

### `nuelink_get_schedule`

**Get Weekly Queue Schedule.** Returns the brand's whole weekly queue (MON..SUN, each slot with time, queueId, collectionId, collectionTitle, collectionStatus) in the brand timezone. Use it to answer when queued posts will go out, or to find a queueId for nuelink_delete_collection_queue_slot. When queueStatus is PAUSED nothing publishes from the queues. Slots of paused collections are not listed, and timezone may be an offset like +03:00. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |

Output fields:

- `timezone`: Brand Timezone
- `queueStatus`: Queue Status
- `schedule`: Weekly Slots
- `schedule.MON`: Monday
- `schedule.MON[].time`: Time (Brand Timezone)
- `schedule.MON[].queueId`: Slot ID (number)
- `schedule.MON[].collectionId`: Collection ID (number)
- `schedule.MON[].collectionTitle`: Collection
- `schedule.MON[].collectionStatus`: Collection Status
- `schedule.TUE`: Tuesday
- `schedule.TUE[].time`: Time (Brand Timezone)
- `schedule.TUE[].queueId`: Slot ID (number)
- `schedule.TUE[].collectionId`: Collection ID (number)
- `schedule.TUE[].collectionTitle`: Collection
- `schedule.TUE[].collectionStatus`: Collection Status
- `schedule.WED`: Wednesday
- `schedule.WED[].time`: Time (Brand Timezone)
- `schedule.WED[].queueId`: Slot ID (number)
- `schedule.WED[].collectionId`: Collection ID (number)
- `schedule.WED[].collectionTitle`: Collection
- `schedule.WED[].collectionStatus`: Collection Status
- `schedule.THU`: Thursday
- `schedule.THU[].time`: Time (Brand Timezone)
- `schedule.THU[].queueId`: Slot ID (number)
- `schedule.THU[].collectionId`: Collection ID (number)
- `schedule.THU[].collectionTitle`: Collection
- `schedule.THU[].collectionStatus`: Collection Status
- `schedule.FRI`: Friday
- `schedule.FRI[].time`: Time (Brand Timezone)
- `schedule.FRI[].queueId`: Slot ID (number)
- `schedule.FRI[].collectionId`: Collection ID (number)
- `schedule.FRI[].collectionTitle`: Collection
- `schedule.FRI[].collectionStatus`: Collection Status
- `schedule.SAT`: Saturday
- `schedule.SAT[].time`: Time (Brand Timezone)
- `schedule.SAT[].queueId`: Slot ID (number)
- `schedule.SAT[].collectionId`: Collection ID (number)
- `schedule.SAT[].collectionTitle`: Collection
- `schedule.SAT[].collectionStatus`: Collection Status
- `schedule.SUN`: Sunday
- `schedule.SUN[].time`: Time (Brand Timezone)
- `schedule.SUN[].queueId`: Slot ID (number)
- `schedule.SUN[].collectionId`: Collection ID (number)
- `schedule.SUN[].collectionTitle`: Collection
- `schedule.SUN[].collectionStatus`: Collection Status

### `nuelink_list_channels`

**List Channels.** Lists the social channels connected to the brand (id, name, platform type, status), including ones not in any collection yet. Use it to find a channelId for nuelink_add_collection_channel, nuelink_remove_collection_channel or nuelink_list_published_posts. Pages can be short or empty while total is above 0 (Nuelink counts before filtering), so follow hasMore, not the item count. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |
| `page` | number | no | `1` | Page. Which page of results to return, starting at 1. When the output says hasMore is true, run again with the next page number. |
| `perPage` | number | no | `25` | Results per Page. How many results to return per page (1 to 100). |

Output fields:

- `items`: Channels
- `items[].id`: Channel ID (number)
- `items[].name`: Name
- `items[].status`: Status
- `items[].type`: Platform
- `items[].createdAt`: Created At (datetime)
- `items[].updatedAt`: Updated At (datetime)
- `page`: Page (number)
- `perPage`: Results per Page (number)
- `total`: Total Matching (number)
- `lastPage`: Last Page (number)
- `hasMore`: Has More Pages (boolean)

### `nuelink_create_collection`

**Create Collection.** Creates a new collection (a queue of posts with its own channels and weekly time slots). Collections cannot be deleted through the API, so call nuelink_list_collections first and reuse an existing one when it fits. channels are channel IDs from nuelink_list_channels; queues are brand-local weekday slots like "Tue 09:00" (brand timezone from nuelink_list_brands; at most 10 per day, 5 if the account is unverified). maxRepublish is the evergreen republish interval in weeks (0 = off). Each call creates a new collection: after a timeout check nuelink_list_collections before retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |
| `title` | string | yes |  | Title. Collection name, 1 to 255 characters. |
| `description` | string | no |  | Description. Up to 1,000 characters. |
| `maxRepublish` | number | no |  | Evergreen Republish Interval (weeks). Republish posts every N weeks; 0 or empty turns it off. |
| `channels` | array | no |  | Channel IDs. Numeric channel IDs from nuelink_list_channels. Posts in the collection publish to these. |
| `queues` | array | no |  | Queue Slots. Weekly brand-local slots like "Mon 09:30". Duplicates are removed. |

Output fields:

- `id`: Collection ID (number)
- `title`: Name
- `description`: Description
- `status`: Status
- `timezone`: Timezone
- `evergreen`: Evergreen
- `evergreen.enabled`: Enabled (boolean)
- `evergreen.maxRepublish`: Max Republish (number)
- `channels`: Channels
- `channels[].id`: Channel ID (number)
- `channels[].name`: Name
- `channels[].status`: Status
- `channels[].type`: Platform
- `queues`: Queue Slots
- `queues[].id`: Slot ID (number)
- `queues[].day`: Day
- `queues[].time`: Time (Brand Timezone)
- `queues[].date`: Day and Time
- `queues[].status`: Status
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `maxRepublish`: Evergreen Interval (weeks) (number)

### `nuelink_update_collection`

**Update Collection.** Changes only the fields you set on a collection: title, description (or clearDescription to empty it), status ACTIVE/PAUSED, maxRepublish (evergreen interval in weeks, 0 = off). Setting status PAUSED is the safe way to stop a collection from publishing, since collections cannot be deleted through the API. Do not copy a maxRepublish of -1 read from nuelink_list_collections back; it is read-only. The response lists no queue slots while paused, but the slots are kept. Re-sending the same values changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |
| `collectionId` | string | yes |  | Collection ID. The numeric collection ID from nuelink_list_collections. |
| `title` | string | no |  | New Title. 1 to 255 characters. Empty keeps the current title. |
| `description` | string | no |  | New Description. Up to 1,000 characters. Empty keeps the current one. |
| `clearDescription` | boolean | no |  | Clear Description. Remove the description. Do not combine with New Description. |
| `status` | string | no |  | Status. PAUSED stops publishing from this collection; ACTIVE resumes it. Empty keeps it. One of `"ACTIVE"`, `"PAUSED"`. |
| `maxRepublish` | number | no |  | Evergreen Republish Interval (weeks). 0 turns evergreen off. Empty keeps it. |

Output fields:

- `id`: Collection ID (number)
- `title`: Name
- `description`: Description
- `status`: Status
- `timezone`: Timezone
- `evergreen`: Evergreen
- `evergreen.enabled`: Enabled (boolean)
- `evergreen.maxRepublish`: Max Republish (number)
- `channels`: Channels
- `channels[].id`: Channel ID (number)
- `channels[].name`: Name
- `channels[].status`: Status
- `channels[].type`: Platform
- `queues`: Queue Slots
- `queues[].id`: Slot ID (number)
- `queues[].day`: Day
- `queues[].time`: Time (Brand Timezone)
- `queues[].date`: Day and Time
- `queues[].status`: Status
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `maxRepublish`: Evergreen Interval (weeks) (number)

### `nuelink_add_collection_channel`

**Add Channel to Collection.** Adds a brand channel (from nuelink_list_channels) to a collection. The channel then receives ALL of the collection's posts, including ones already queued and scheduled, not only future ones: call nuelink_list_collections first and confirm its postsCount.queued and scheduled with the user. To stage a channel without publishing, pause the collection first with nuelink_update_collection status PAUSED. Adding a channel that is already assigned changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |
| `collectionId` | string | yes |  | Collection ID. The numeric collection ID from nuelink_list_collections. |
| `channelId` | string | yes |  | Channel ID. The numeric channel ID from nuelink_list_channels. |

Output fields:

- `collectionId`: Collection ID (number)
- `channelId`: Channel ID (number)

### `nuelink_remove_collection_channel`

**Remove Channel from Collection.** Removes a channel from a collection so the collection's posts stop going to it; the channel stays connected to the brand and nuelink_add_collection_channel restores it. Ask the user before removing, since queued posts will no longer reach that channel. A repeat call returns 404. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |
| `collectionId` | string | yes |  | Collection ID. The numeric collection ID from nuelink_list_collections. |
| `channelId` | string | yes |  | Channel ID. The numeric channel ID, from the collection's channels in nuelink_list_collections. |

Output fields:

- `collectionId`: Collection ID (number)
- `channelId`: Channel ID (number)

### `nuelink_add_collection_queue_slot`

**Add Queue Time Slot.** Adds one weekly queue slot to a collection, given as weekday plus 24-hour time in the BRAND timezone (from nuelink_list_brands), e.g. "Tue 09:00"; do not convert time zones. Queued posts publish at these slots. Nuelink does not reject duplicates, so check nuelink_get_schedule or nuelink_list_collections first, and after a timeout check again before retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |
| `collectionId` | string | yes |  | Collection ID. The numeric collection ID from nuelink_list_collections. |
| `slot` | string | yes |  | Slot. Weekday and brand-local 24-hour time, e.g. "Tue 09:00". |

Output fields:

- `id`: Slot ID (number)
- `day`: Day
- `time`: Time (Brand Timezone)
- `date`: Day and Time
- `status`: Status

### `nuelink_delete_collection_queue_slot`

**Delete Queue Time Slot.** Deletes one weekly queue slot of a collection; queueId comes from nuelink_get_schedule (queueId) or nuelink_list_collections (queues[].id). Queued posts then wait for the remaining slots. Confirm with the user first. A repeat call returns 404. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |
| `collectionId` | string | yes |  | Collection ID. The numeric collection ID the slot belongs to. |
| `queueId` | string | yes |  | Slot ID. The numeric queue slot ID from nuelink_get_schedule or nuelink_list_collections. |

Output fields:

- `collectionId`: Collection ID (number)
- `queueId`: Deleted Slot ID (number)

### `nuelink_list_automations`

**List Feed Automations.** Lists the brand's feed automations (id, name, collectionId, status, feed type, feedUrl, runCount, lastRun as a Unix timestamp, title/caption templates). Use it to find an automationId for nuelink_update_automation_status. status may read INACTIVE for a paused automation. One page per call with hasMore. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |
| `page` | number | no | `1` | Page. Which page of results to return, starting at 1. When the output says hasMore is true, run again with the next page number. |
| `perPage` | number | no | `25` | Results per Page. How many results to return per page (1 to 100). |

Output fields:

- `items`: Automations
- `items[].id`: Automation ID (number)
- `items[].name`: Name
- `items[].collectionId`: Collection ID (number)
- `items[].status`: Status
- `items[].type`: Feed Type
- `items[].feedUrl`: Feed URL (url)
- `items[].runCount`: Run Count (number)
- `items[].importAsType`: Import As
- `items[].lastRun`: Last Run (Unix Time) (number)
- `items[].title`: Title Template
- `items[].caption`: Caption Template
- `items[].createdAt`: Created At (datetime)
- `items[].updatedAt`: Updated At (datetime)
- `page`: Page (number)
- `perPage`: Results per Page (number)
- `total`: Total Matching (number)
- `lastPage`: Last Page (number)
- `hasMore`: Has More Pages (boolean)

### `nuelink_create_automation`

**Create Feed Automation.** Creates a feed importer (RSS, YouTube, WordPress, Shopify, …) that adds each new feed item as a post in a collection; those posts go to that collection's channels. By default posts are added as drafts and old items are not back-filled; addPostsAsDraft false makes new items publish through the queue, and loadOldPosts true with addPostsAsDraft false is refused. Automations cannot be deleted through the API: to stop one use nuelink_update_automation_status PAUSED. Nuelink fetches the feed first (400 if it cannot). Each call creates a new automation: after a timeout check nuelink_list_automations before retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |
| `collectionId` | string | yes |  | Collection ID. The numeric collection ID (nuelink_list_collections) that receives the posts. |
| `name` | string | yes |  | Name. Automation name, up to 255 characters. |
| `type` | string | yes |  | Feed Type. One of `"RSS"`, `"ATOM"`, `"YOUTUBE"`, `"MEDIUM"`, `"SHOPIFY"`, `"WORDPRESS"`, `"WOOCOMMERCE"`, `"ETSY"`, `"GHOST"`, `"SUBSTACK"`, `"ANCHOR"`, `"TRANSISTOR"`, `"CAPTIVATE"`, `"SOUNDCLOUD"`, `"BLOGGER"`, `"WIX"`, `"SQUARESPACEBLOG"`, `"SQUARESPACESHOP"`, `"WEEBLY"`, `"TUMBLR"`, `"SHOPIFY2"`, `"WOOCOMMERCE2"`, `"PRESTASHOP"`, `"BUZZSPROUT"`, `"RSSCOM"` and 2 more. |
| `feedUrl` | string | yes |  | Feed URL. Public http(s) URL of the feed. |
| `importAsType` | string | yes |  | Import As. One of `"LINK"`, `"IMAGE"`, `"VIDEO"`, `"CAROUSEL"`. |
| `title` | string | no |  | Title Template. Up to 255 characters; placeholders {{title}}, {{description}}, {{link}}. Default {{title}}. |
| `caption` | string | no |  | Caption Template. Up to 255 characters; placeholders {{title}}, {{description}}, {{link}}. |
| `addPostsAsDraft` | boolean | no |  | Add Posts as Drafts. Defaults to true. False lets imported posts publish through the queue. |
| `loadOldPosts` | boolean | no |  | Import Existing Feed Items. Defaults to false. True back-fills the whole feed; only allowed with drafts. |
| `refreshRate` | string | no |  | Refresh Every (hours). One of `1`, `6`, `12`, `24`. |

Output fields:

- `id`: Automation ID (number)
- `name`: Name
- `collectionId`: Collection ID (number)
- `status`: Status
- `type`: Feed Type
- `feedUrl`: Feed URL (url)
- `runCount`: Run Count (number)
- `importAsType`: Import As
- `lastRun`: Last Run (Unix Time) (number)
- `title`: Title Template
- `caption`: Caption Template
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)

### `nuelink_update_automation_status`

**Pause or Activate Feed Automation.** Sets a feed automation (id from nuelink_list_automations) to PAUSED, which stops importing, or ACTIVE, which resumes importing new feed items into its collection. Pausing is the only way to stop an automation through the API. The response may read INACTIVE for a paused automation. Setting the same status again changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |
| `automationId` | string | yes |  | Automation ID. The numeric automation ID from nuelink_list_automations. |
| `status` | string | yes |  | Status. One of `"PAUSED"`, `"ACTIVE"`. |

Output fields:

- `id`: Automation ID (number)
- `name`: Name
- `status`: Status

### `nuelink_list_media`

**List Media.** Lists the brand media library (id, name, MIME type, size, dates), newest first, optionally filtered by type. Reuse an item's id in the media list of nuelink_create_post instead of uploading the file again with nuelink_upload_file. One page per call with hasMore. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |
| `type` | string | no |  | Type. Only this media category. APPLICATION covers every document record; DOCUMENT only office/document MIME types. One of `"IMAGE"`, `"VIDEO"`, `"GIF"`, `"APPLICATION"`, `"DOCUMENT"`, `"CSV"`. |
| `page` | number | no | `1` | Page. Which page of results to return, starting at 1. When the output says hasMore is true, run again with the next page number. |
| `perPage` | number | no | `25` | Results per Page. How many results to return per page (1 to 100). |

Output fields:

- `items`: Media
- `items[].id`: Media ID
- `items[].name`: File Name
- `items[].type`: MIME Type
- `items[].size`: Size (filesize)
- `items[].createdAt`: Created At (datetime)
- `items[].updatedAt`: Updated At (datetime)
- `page`: Page (number)
- `perPage`: Results per Page (number)
- `total`: Total Matching (number)
- `lastPage`: Last Page (number)
- `hasMore`: Has More Pages (boolean)

### `nuelink_upload_file`

**Upload Media File.** Uploads one JPG, PNG, BMP, MP4, MOV or PDF file (up to 100 MB) to the brand media library and returns a media ID for nuelink_create_post. Not needed when the file has a public URL (nuelink_create_post takes URLs) or is already in the library (nuelink_list_media). Each call stores a new copy that cannot be deleted through the API; after a timeout check nuelink_list_media before retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |
| `file` | file | yes |  | File. A JPG, PNG, BMP, MP4, MOV or PDF file (URL or file reference), up to 100 MB. Files are not supported; an action that needs one fails. |

Output fields:

- `id`: Media ID
- `type`: MIME Type
- `size`: Size (filesize)

### `nuelink_create_post`

**Create Post.** Creates a post in a collection; it goes to every channel of that collection (check them with nuelink_list_collections). publishMode defaults to DRAFT; use IMMEDIATE only when the user explicitly asks to post now, and QUEUE or SCHEDULE only on explicit intent to publish. scheduledAt must be ISO-8601 with an offset (e.g. 2026-10-12T09:00:00+03:00), at least 10 minutes ahead; it is converted to the brand timezone from nuelink_list_brands. Needs a caption, a poll, or both; polls cannot be edited later and only reach LinkedIn, X, Telegram, Threads, Mastodon and Bluesky. Each call creates a new post: after a timeout, check nuelink_list_brand_posts before retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |
| `collectionId` | string | yes |  | Collection ID. The numeric collection ID from nuelink_list_collections. The post goes to every channel in it. |
| `publishMode` | string | no |  | Publish Mode. DRAFT (default) saves without publishing, QUEUE takes the next free slot, SCHEDULE publishes at Scheduled Time, IMMEDIATE publishes now. One of `"DRAFT"`, `"QUEUE"`, `"SCHEDULE"`, `"IMMEDIATE"`. |
| `scheduledAt` | string | no |  | Scheduled Time. Only with Publish Mode SCHEDULE. ISO-8601 with an offset or Z, e.g. 2026-10-12T09:00:00+03:00. |
| `caption` | string | no |  | Caption. Post text, up to 3,000 characters. Optional when a poll is set. |
| `title` | string | no |  | Title. Title for videos, Reels and Pinterest pins (up to 255 characters). |
| `media` | array | no |  | Media. Up to 10 entries: public http(s) URLs, or media IDs from nuelink_upload_file or nuelink_list_media. |
| `alt` | string | no |  | Alt Text. Alt text for the media (up to 255 characters). |
| `link` | string | no |  | Link. Destination link for Pinterest pins and the Google Business button. |
| `postAsStory` | boolean | no |  | Post as Story. Publish as a story where supported. |
| `autoThreadText` | boolean | no |  | Split Long Text into a Thread. Let Nuelink split long text into a thread. |
| `firstComment` | string | no |  | First Comment. Comment added after publishing (up to 1,000 characters). Needs First Comment Delay. |
| `firstCommentDelaySeconds` | number | no |  | First Comment Delay (seconds). Seconds after publishing to add the first comment. |
| `pollQuestion` | string | no |  | Poll Question. Up to 280 characters. Setting any poll field requires Question, Options and Duration. |
| `pollOptions` | array | no |  | Poll Options. 2 to 4 answers, each up to 30 characters. |
| `pollPeriod` | string | no |  | Poll Duration. One of `"1d"`, `"3d"`, `"7d"`. |
| `pollCorrectOptionIndex` | number | no |  | Poll Correct Option Index. Zero-based index of the correct answer, for quiz polls. |
| `pollExplanation` | string | no |  | Poll Explanation. Shown with the correct answer (up to 512 characters). |
| `instagramShareToFeed` | boolean | no |  | Instagram: Share Reel to Feed. |
| `instagramCollab` | string | no |  | Instagram: Collaborator. Instagram username to invite as collaborator. |
| `tiktokAutoAddMusic` | boolean | no |  | TikTok: Add Music Automatically. |
| `youtubeTags` | array | no |  | YouTube: Tags. |

Output fields:

- `id`: Post ID (number)
- `message`: Message
- `brandId`: Brand ID
- `collectionId`: Collection ID
- `publishMode`: Publish Mode
- `scheduledAt`: Scheduled For (Brand Time)
- `scheduledAtUtc`: Scheduled For (UTC) (datetime)
- `brandTimezone`: Brand Timezone

### `nuelink_update_post`

**Update Post.** Edits an unpublished post from nuelink_create_post or nuelink_list_brand_posts: new caption (replaces the old one), publishMode DRAFT/QUEUE/SCHEDULE, or queuePosition FRONT/BACK. Setting DRAFT is the safe way to stop a post; prefer it over nuelink_delete_post. Moving a draft to QUEUE or SCHEDULE puts it on track to publish, so only do that on explicit user intent. scheduledAt must be ISO-8601 with an offset, at least 10 minutes ahead. Published posts (409) and polls (400) cannot be edited. Re-sending the same values changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |
| `postId` | string | yes |  | Post ID. The numeric post ID from nuelink_create_post or nuelink_list_brand_posts. |
| `caption` | string | no |  | New Caption. Replaces the post text (up to 3,000 characters). Leave empty to keep it. |
| `publishMode` | string | no |  | New Publish Mode. Leave empty to keep the current mode. One of `"DRAFT"`, `"QUEUE"`, `"SCHEDULE"`. |
| `scheduledAt` | string | no |  | Scheduled Time. Required with New Publish Mode SCHEDULE, not allowed otherwise. ISO-8601 with an offset, e.g. 2026-10-12T09:00:00+03:00. |
| `queuePosition` | string | no |  | Queue Position. Move a queued post to the front or back of its queue. One of `"FRONT"`, `"BACK"`. |

Output fields:

- `id`: Post ID (number)
- `collectionId`: Collection ID (number)
- `title`: Title
- `body`: Caption
- `media`: Media
- `media[].id`: Media ID
- `postType`: Post Type
- `postingType`: Publish Mode
- `status`: Status
- `postDate`: Scheduled For (UTC)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `poll`: Poll
- `poll.question`: Question
- `poll.options`: Options
- `poll.caption`: Caption
- `poll.period`: Duration
- `poll.correctOptionIndex`: Correct Option Index (number)
- `poll.explanation`: Explanation

### `nuelink_move_posts`

**Move Posts to Collection.** Moves 1 to 100 posts (IDs from nuelink_list_brand_posts) from a source collection to a different destination collection. All or nothing: if any post is not in the source, nothing moves. Moved posts go to the destination's channels unless a post has its own channels set in the dashboard, so read the destination's channels with nuelink_list_collections and show them to the user first. A queued post takes the destination's next free slot and can publish sooner; a scheduled post keeps its date. The destination must be active and have capacity (403). A repeat call fails. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |
| `sourceCollectionId` | string | yes |  | Source Collection ID. The collection that currently holds every listed post. |
| `destinationCollectionId` | string | yes |  | Destination Collection ID. A different collection of the same brand. |
| `postIds` | array | yes |  | Post IDs. 1 to 100 numeric post IDs. |

Output fields:

- `moved`: Posts Moved (number)
- `sourceCollectionId`: Source Collection ID (number)
- `destinationCollectionId`: Destination Collection ID (number)
- `message`: Message

### `nuelink_delete_post`

**Delete Post.** Permanently deletes one post from Nuelink (any status, published included); what is already on a social network stays there. To only stop a post from going out, use nuelink_update_post with publishMode DRAFT instead. Nuelink refuses this (403) unless the account owner enabled "Allow AI to perform sensitive actions" in Settings → API. Cannot be undone; a repeat call returns 404. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |
| `postId` | string | yes |  | Post ID. The numeric post ID from nuelink_list_brand_posts. |

Output fields:

- `id`: Deleted Post ID (number)
- `message`: Message

### `nuelink_list_brand_posts`

**List Posts.** Lists a brand's posts across collections, or one collection with collectionId, filtered by view, status, post type, posting type and creation time (createdFrom/createdTo are UTC). Use it to find a post ID or to check whether a create already happened. An unknown collectionId returns 404; get IDs from nuelink_list_collections. For per-channel delivery results use nuelink_list_published_posts. One page per call with hasMore. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |
| `collectionId` | string | no |  | Collection ID. Only posts of this collection (numeric ID from nuelink_list_collections). Empty for all. |
| `view` | string | no |  | View. QUEUE, SCHEDULED, DRAFT or PUBLISHED. One of `"QUEUE"`, `"SCHEDULED"`, `"DRAFT"`, `"PUBLISHED"`. |
| `status` | string | no |  | Status. Lifecycle status. One of `"PENDING"`, `"DRAFT"`, `"PUBLISHED"`. |
| `postType` | string | no |  | Post Type. Content type. One of `"TEXT"`, `"IMAGE"`, `"VIDEO"`, `"MULTIMEDIA"`, `"SHORT"`, `"DOCUMENT"`, `"THREAD"`, `"SLIDES"`, `"REEL"`, `"TIKTOK"`, `"STORY"`, `"POLL"`, `"ENGAGE_COMMENT"`. |
| `postingType` | string | no |  | Posting Type. How the post is published. One of `"NOW"`, `"SCHEDULE"`, `"QUEUE"`, `"DRAFT"`. |
| `createdFrom` | string | no |  | Created From. ISO-8601 time; a value without offset is read as UTC. |
| `createdTo` | string | no |  | Created To. ISO-8601 time; a value without offset is read as UTC. |
| `sortBy` | string | no |  | Sort By. Sort field. One of `"id"`, `"title"`, `"post_date"`, `"created_at"`, `"updated_at"`. |
| `sortOrder` | string | no | `"desc"` | Sort Order. One of `"desc"`, `"asc"`. |
| `page` | number | no | `1` | Page. Which page of results to return, starting at 1. When the output says hasMore is true, run again with the next page number. |
| `perPage` | number | no | `25` | Results per Page. How many results to return per page (1 to 100). |

Output fields:

- `items`: Posts
- `items[].id`: Post ID (number)
- `items[].collectionId`: Collection ID (number)
- `items[].title`: Title
- `items[].body`: Caption
- `items[].media`: Media
- `items[].media[].id`: Media ID
- `items[].postType`: Post Type
- `items[].postingType`: Publish Mode
- `items[].status`: Status
- `items[].postDate`: Scheduled For (UTC)
- `items[].createdAt`: Created At (datetime)
- `items[].updatedAt`: Updated At (datetime)
- `items[].poll`: Poll
- `items[].poll.question`: Question
- `items[].poll.options`: Options
- `items[].poll.caption`: Caption
- `items[].poll.period`: Duration
- `items[].poll.correctOptionIndex`: Correct Option Index (number)
- `items[].poll.explanation`: Explanation
- `page`: Page (number)
- `perPage`: Results per Page (number)
- `total`: Total Matching (number)
- `lastPage`: Last Page (number)
- `hasMore`: Has More Pages (boolean)

### `nuelink_list_published_posts`

**List Published Posts.** Lists per-channel delivery results: status, platform URL, error message and engagement (likes, comments, shares, views, saves, clicks, impressions, reach). status defaults to PUBLISHED, so checking a postId with the defaults only shows the channels where it succeeded; query FAILED, RETRYING or SKIPPED to see failures. Filter by collectionId, channelId (nuelink_list_channels), postId (nuelink_list_brand_posts), postType, text search or publish time (UTC). One page per call with hasMore. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `brandId` | string | yes |  | Brand ID. The numeric brand ID from nuelink_list_brands. |
| `status` | string | no |  | Delivery Status. Defaults to PUBLISHED. One of `"PUBLISHED"`, `"FAILED"`, `"RETRYING"`, `"SKIPPED"`, `"SENT"`. |
| `collectionId` | string | no |  | Collection ID. Only results from this collection. |
| `channelId` | string | no |  | Channel ID. Only results for this channel (from nuelink_list_channels). |
| `postId` | string | no |  | Post ID. Only results of this post. |
| `postType` | string | no |  | Post Type. Only results of this post type, e.g. IMAGE. |
| `search` | string | no |  | Search Text. Text contained in the published body (up to 255 characters). |
| `publishedFrom` | string | no |  | Published From. ISO-8601 time; without offset it is read as UTC. |
| `publishedTo` | string | no |  | Published To. ISO-8601 time; without offset it is read as UTC. |
| `sortBy` | string | no |  | Sort By. One of `"id"`, `"created_at"`, `"likes"`, `"comments"`, `"shares"`. |
| `sortOrder` | string | no | `"desc"` | Sort Order. One of `"desc"`, `"asc"`. |
| `page` | number | no | `1` | Page. Which page of results to return, starting at 1. When the output says hasMore is true, run again with the next page number. |
| `perPage` | number | no | `25` | Results per Page. How many results to return per page (1 to 100). |

Output fields:

- `items`: Published Results
- `items[].id`: Published Result ID (number)
- `items[].postId`: Post ID (number)
- `items[].collectionId`: Collection ID (number)
- `items[].channel`: Channel
- `items[].channel.id`: Channel ID (number)
- `items[].channel.name`: Channel Name
- `items[].channel.type`: Platform
- `items[].postType`: Post Type
- `items[].body`: Published Text
- `items[].url`: Post URL (url)
- `items[].status`: Delivery Status
- `items[].message`: Delivery Message
- `items[].publishedAt`: Published At (datetime)
- `items[].results`: Engagement
- `items[].results.likes`: Likes (number)
- `items[].results.comments`: Comments (number)
- `items[].results.shares`: Shares (number)
- `items[].results.views`: Views (number)
- `items[].results.saves`: Saves (number)
- `items[].results.engagement`: Engagement (number)
- `items[].results.clicks`: Clicks (number)
- `items[].results.impressions`: Impressions (number)
- `items[].results.reach`: Reach (number)
- `page`: Page (number)
- `perPage`: Results per Page (number)
- `total`: Total Matching (number)
- `lastPage`: Last Page (number)
- `hasMore`: Has More Pages (boolean)

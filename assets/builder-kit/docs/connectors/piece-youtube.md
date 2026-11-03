# YouTube

Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-youtube'
  version: '0.8.1'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> 1. Sign in to [Google Cloud Console](https://console.cloud.google.com/).
> 2. Create a new project or you can use existing one.
> 3. Go to **APIs & Services** and click **Enable APIs & Services**.
> 4. Search for **YouTube API** in the search bar and enable it.
> 5. Go to **OAuth consent screen** and select **External** type and click create.
> 6. Fill App Name, User Support Email, and Developer Contact Information. Click on the Save and Continue button.
> 7. Click on **Add or Remove Scopes** and add following scopes and click update.
> - https://www.googleapis.com/auth/youtube
> - https://www.googleapis.com/auth/youtube.readonly
> - https://www.googleapis.com/auth/youtube.upload
> - https://www.googleapis.com/auth/youtube.force-ssl
> 8. Click Save and Continue to finish the Scopes step.
> 9. Click on the Add Users button and add a test email You can add your own email).Then finally click Save and Continue to finish the Test Users portion.
> 10. Go to **Credentials**. Click on the **Create Credentials** button and select the **OAuth client ID** option.
> 11. Select the application type as **Web Application** and fill the Name field.
> 12. Add https://cloud.activepieces.com/redirect in **Authorized redirect URIs** field, and click on the Create button.
> 13. Copy **Client ID** and **Client Secret**.

## Actions

### `download_caption`

**Download Caption.** Downloads the raw text of one YouTube caption track identified by its caption ID, optionally emitting it as SRT, VTT, SBV, SCC, or TTML and machine-translating it into a target language code. Use it after List Captions has supplied the caption ID; the endpoint only serves tracks on videos the authenticated account can edit, and auto-generated (asr) tracks are refused with a 403. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `captionId` | string | yes |  | Caption ID. From List Captions. Auto-generated tracks can't be downloaded. |
| `format` | string | no |  | Format. File format of the captions. Empty: the track's original format. One of `"srt"`, `"vtt"`, `"sbv"`, `"scc"`, `"ttml"`. |
| `targetLanguage` | string | no |  | Target Language. Translate the captions into this language code. |
| `onBehalfOfContentOwner` | string | no |  | On Behalf Of Content Owner. Content owner ID, for YouTube partners who manage many channels. |

### `list_captions`

**List Captions.** Lists the caption tracks attached to a single YouTube video, covering every track on that video or only the ones named by a comma-separated list of caption IDs. Use it to discover which languages a video is captioned in and to obtain the caption ID that the Download Caption action requires. The video ID is mandatory. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoId` | string | yes |  | Video ID. The v= value in the video's URL. |
| `captionIds` | string | no |  | Caption IDs. Only return these tracks. Separate caption IDs with commas. |
| `onBehalfOfContentOwner` | string | no |  | On Behalf Of Content Owner. Content owner ID, for YouTube partners who manage many channels. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `items`: Captions
- `items[].kind`: Kind
- `items[].etag`: ETag
- `items[].id`: Caption ID
- `items[].snippet`: Snippet
- `items[].snippet.videoId`: Video ID
- `items[].snippet.lastUpdated`: Last Updated (datetime)
- `items[].snippet.trackKind`: Track Kind
- `items[].snippet.language`: Language
- `items[].snippet.name`: Name
- `items[].snippet.audioTrackType`: Audio Track Type
- `items[].snippet.isCC`: Closed Captions (boolean)
- `items[].snippet.isLarge`: Large Text (boolean)
- `items[].snippet.isEasyReader`: Easy Reader (boolean)
- `items[].snippet.isDraft`: Draft (boolean)
- `items[].snippet.isAutoSynced`: Auto Synced (boolean)
- `items[].snippet.status`: Status

### `search`

**Search.** Runs a YouTube search.list query across videos, channels, and playlists at once or restricted to a single resource type, and can instead be scoped to uploads owned by the authenticated account (For Mine), a CMS content owner, or the developer project. Use it to turn a free-text query, channel, date range, region, or topic into video, channel, or playlist IDs for later steps; prefer List Playlist Items when the playlist ID is already known. Video-only filters such as duration, definition, caption, event type, and location require Type to be Video, and Location must be paired with Location Radius. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Query. Words to search for. Use \| for OR and - to leave a word out. |
| `type` | string | no | `"any"` | Type. Which kind of result to return. Video-only filters need Video. One of `"any"`, `"video"`, `"channel"`, `"playlist"`. |
| `forContentOwner` | boolean | no |  | For Content Owner. Only videos of the owner set in On Behalf Of Content Owner. |
| `forDeveloper` | boolean | no |  | For Developer. Only videos uploaded through this connection's Google Cloud app. |
| `forMine` | boolean | no |  | For Mine. Only videos on the connected account. Needs Type set to Video. |
| `onBehalfOfContentOwner` | string | no |  | On Behalf Of Content Owner. Content owner ID, for YouTube partners who manage many channels. |
| `channelId` | string | no |  | Channel ID. Only return results from this channel. The ID starts with UC. |
| `channelType` | string | no |  | Channel Type. Show returns only channels that publish TV shows. One of `"any"`, `"show"`. |
| `order` | string | no | `"relevance"` | Order. One of `"relevance"`, `"date"`, `"rating"`, `"title"`, `"videoCount"`, `"viewCount"`. |
| `safeSearch` | string | no | `"moderate"` | Safe Search. Whether to leave out restricted content. One of `"moderate"`, `"none"`, `"strict"`. |
| `publishedAfter` | ISO date-time string | no |  | Published After. Only results published on or after this date. |
| `publishedBefore` | ISO date-time string | no |  | Published Before. Only results published before this date. |
| `maxResults` | number | no | `25` | Max Results. How many results to return, up to 50. |
| `pageToken` | string | no |  | Page Token. The nextPageToken from an earlier run, to get the next page. |
| `regionCode` | string | no |  | Region Code. Two-letter country code. Results must be viewable there. |
| `relevanceLanguage` | string | no |  | Relevance Language. Two-letter language code. Results in it rank higher. |
| `topicId` | string | no |  | Topic ID. Freebase topic ID to limit results to one topic. |
| `eventType` | string | no |  | Event Type. Video only. Limit to live, upcoming or finished broadcasts. One of `"completed"`, `"live"`, `"upcoming"`. |
| `location` | string | no |  | Location. Video only. Latitude,longitude. Needs Location Radius too. |
| `locationRadius` | string | no |  | Location Radius. Video only. Distance from Location in m, km, ft or mi. |
| `videoCategoryId` | string | no |  | Video Category ID. Video only. YouTube's numeric category ID, like 10 for Music. |
| `videoDuration` | string | no |  | Video Duration. Video only. One of `"any"`, `"short"`, `"medium"`, `"long"`. |
| `videoDefinition` | string | no |  | Video Definition. Video only. One of `"any"`, `"high"`, `"standard"`. |
| `videoDimension` | string | no |  | Video Dimension. Video only. One of `"any"`, `"2d"`, `"3d"`. |
| `videoEmbeddable` | string | no |  | Video Embeddable. Video only. True: only videos other sites can embed. One of `"any"`, `"true"`. |
| `videoLicense` | string | no |  | Video License. Video only. One of `"any"`, `"creativeCommon"`, `"youtube"`. |
| `videoPaidProductPlacement` | string | no |  | Video Paid Product Placement. Video only. True: only videos with paid promotions. One of `"any"`, `"true"`. |
| `videoSyndicated` | string | no |  | Video Syndicated. Video only. True: only videos that play outside youtube.com. One of `"any"`, `"true"`. |
| `videoType` | string | no |  | Video Type. Video only. One of `"any"`, `"episode"`, `"movie"`. |
| `videoCaption` | string | no |  | Video Caption. Video only. One of `"any"`, `"closedCaption"`, `"none"`. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `nextPageToken`: Next Page Token
- `prevPageToken`: Previous Page Token
- `regionCode`: Region Code
- `pageInfo`: Page Info
- `pageInfo.totalResults`: Total Results (number)
- `pageInfo.resultsPerPage`: Results Per Page (number)
- `items`: Results
- `items[].kind`: Kind
- `items[].etag`: ETag
- `items[].id`: ID
- `items[].id.kind`: Resource Kind
- `items[].id.videoId`: Video ID
- `items[].id.channelId`: Channel ID
- `items[].id.playlistId`: Playlist ID
- `items[].snippet`: Snippet
- `items[].snippet.publishedAt`: Published At (datetime)
- `items[].snippet.publishTime`: Publish Time (datetime)
- `items[].snippet.channelId`: Channel ID
- `items[].snippet.channelTitle`: Channel Title
- `items[].snippet.title`: Title
- `items[].snippet.description`: Description
- `items[].snippet.liveBroadcastContent`: Live Broadcast Content
- `items[].snippet.thumbnails`: Thumbnails
- `items[].snippet.thumbnails.default`: Default
- `items[].snippet.thumbnails.default.url`: URL (url)
- `items[].snippet.thumbnails.default.width`: Width (number)
- `items[].snippet.thumbnails.default.height`: Height (number)
- `items[].snippet.thumbnails.medium`: Medium
- `items[].snippet.thumbnails.medium.url`: URL (url)
- `items[].snippet.thumbnails.medium.width`: Width (number)
- `items[].snippet.thumbnails.medium.height`: Height (number)
- `items[].snippet.thumbnails.high`: High
- `items[].snippet.thumbnails.high.url`: URL (url)
- `items[].snippet.thumbnails.high.width`: Width (number)
- `items[].snippet.thumbnails.high.height`: Height (number)

### `list_playlist_items`

**List Playlist Items.** Lists the entries of a YouTube playlist in one of two modes: pass a playlist ID to page through that whole playlist (optionally narrowed to entries containing one video ID), or pass a comma-separated list of playlist item IDs to fetch only those entries. Exactly one of the two is required, supplying both or filtering by video without a playlist ID fails validation, and Max Results is capped at 50 with further pages fetched via the page token. Run Search with type Playlist first when the playlist ID is unknown; read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `playlistId` | string | no |  | Playlist ID. The list= value in the playlist's URL. Leave empty to use Item IDs. |
| `itemIds` | string | no |  | Item IDs. Comma-separated playlist item IDs, used instead of Playlist ID. |
| `maxResults` | number | no | `50` | Max Results. How many items to return, up to 50. |
| `pageToken` | string | no |  | Page Token. The nextPageToken from an earlier run, to get the next page. |
| `videoId` | string | no |  | Video ID. Only return entries for this video. Needs a Playlist ID. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `nextPageToken`: Next Page Token
- `prevPageToken`: Previous Page Token
- `pageInfo`: Page Info
- `pageInfo.totalResults`: Total Results (number)
- `pageInfo.resultsPerPage`: Results Per Page (number)
- `items`: Playlist Items
- `items[].kind`: Kind
- `items[].etag`: ETag
- `items[].id`: Playlist Item ID
- `items[].snippet`: Snippet
- `items[].snippet.publishedAt`: Added At (datetime)
- `items[].snippet.channelId`: Channel ID
- `items[].snippet.channelTitle`: Channel Title
- `items[].snippet.title`: Title
- `items[].snippet.description`: Description
- `items[].snippet.playlistId`: Playlist ID
- `items[].snippet.position`: Position (number)
- `items[].snippet.videoOwnerChannelTitle`: Video Owner Channel Title
- `items[].snippet.videoOwnerChannelId`: Video Owner Channel ID
- `items[].snippet.resourceId`: Resource
- `items[].snippet.resourceId.kind`: Resource Kind
- `items[].snippet.resourceId.videoId`: Video ID
- `items[].snippet.thumbnails`: Thumbnails
- `items[].snippet.thumbnails.default`: Default
- `items[].snippet.thumbnails.default.url`: URL (url)
- `items[].snippet.thumbnails.default.width`: Width (number)
- `items[].snippet.thumbnails.default.height`: Height (number)
- `items[].snippet.thumbnails.medium`: Medium
- `items[].snippet.thumbnails.medium.url`: URL (url)
- `items[].snippet.thumbnails.medium.width`: Width (number)
- `items[].snippet.thumbnails.medium.height`: Height (number)
- `items[].snippet.thumbnails.high`: High
- `items[].snippet.thumbnails.high.url`: URL (url)
- `items[].snippet.thumbnails.high.width`: Width (number)
- `items[].snippet.thumbnails.high.height`: Height (number)
- `items[].snippet.thumbnails.standard`: Standard
- `items[].snippet.thumbnails.standard.url`: URL (url)
- `items[].snippet.thumbnails.standard.width`: Width (number)
- `items[].snippet.thumbnails.standard.height`: Height (number)
- `items[].snippet.thumbnails.maxres`: Max Resolution
- `items[].snippet.thumbnails.maxres.url`: URL (url)
- `items[].snippet.thumbnails.maxres.width`: Width (number)
- `items[].snippet.thumbnails.maxres.height`: Height (number)
- `items[].snippet.thumbnails.fhd`: Full HD
- `items[].snippet.thumbnails.fhd.url`: URL (url)
- `items[].snippet.thumbnails.fhd.width`: Width (number)
- `items[].snippet.thumbnails.fhd.height`: Height (number)
- `items[].snippet.thumbnails.qhd`: Quad HD
- `items[].snippet.thumbnails.qhd.url`: URL (url)
- `items[].snippet.thumbnails.qhd.width`: Width (number)
- `items[].snippet.thumbnails.qhd.height`: Height (number)
- `items[].contentDetails`: Content Details
- `items[].contentDetails.videoId`: Video ID
- `items[].contentDetails.videoPublishedAt`: Video Published At (datetime)
- `items[].status`: Status
- `items[].status.privacyStatus`: Privacy Status

### `get_video`

**Get Video.** Fetches full details for one or more YouTube videos by ID using videos.list, returning title, description, tags, duration, view and like counts, and privacy status. Use it after Search or New Video, which give you a video ID but none of these details. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoIds` | string | yes |  | Video ID. A video ID, or several separated by commas: the v= value in the URL. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `pageInfo`: Page Info
- `pageInfo.totalResults`: Total Results (number)
- `pageInfo.resultsPerPage`: Results Per Page (number)
- `items`: Videos
- `items[].kind`: Kind
- `items[].etag`: ETag
- `items[].id`: Video ID
- `items[].snippet`: Snippet
- `items[].snippet.publishedAt`: Published At (datetime)
- `items[].snippet.channelId`: Channel ID
- `items[].snippet.channelTitle`: Channel Title
- `items[].snippet.title`: Title
- `items[].snippet.description`: Description
- `items[].snippet.tags`: Tags
- `items[].snippet.categoryId`: Category ID
- `items[].snippet.liveBroadcastContent`: Live Broadcast Content
- `items[].snippet.defaultLanguage`: Default Language
- `items[].snippet.defaultAudioLanguage`: Default Audio Language
- `items[].snippet.localized`: Localized
- `items[].snippet.localized.title`: Title
- `items[].snippet.localized.description`: Description
- `items[].snippet.thumbnails`: Thumbnails
- `items[].snippet.thumbnails.default`: Default
- `items[].snippet.thumbnails.default.url`: URL (url)
- `items[].snippet.thumbnails.default.width`: Width (number)
- `items[].snippet.thumbnails.default.height`: Height (number)
- `items[].snippet.thumbnails.medium`: Medium
- `items[].snippet.thumbnails.medium.url`: URL (url)
- `items[].snippet.thumbnails.medium.width`: Width (number)
- `items[].snippet.thumbnails.medium.height`: Height (number)
- `items[].snippet.thumbnails.high`: High
- `items[].snippet.thumbnails.high.url`: URL (url)
- `items[].snippet.thumbnails.high.width`: Width (number)
- `items[].snippet.thumbnails.high.height`: Height (number)
- `items[].snippet.thumbnails.standard`: Standard
- `items[].snippet.thumbnails.standard.url`: URL (url)
- `items[].snippet.thumbnails.standard.width`: Width (number)
- `items[].snippet.thumbnails.standard.height`: Height (number)
- `items[].snippet.thumbnails.maxres`: Max Resolution
- `items[].snippet.thumbnails.maxres.url`: URL (url)
- `items[].snippet.thumbnails.maxres.width`: Width (number)
- `items[].snippet.thumbnails.maxres.height`: Height (number)
- `items[].snippet.thumbnails.fhd`: Full HD
- `items[].snippet.thumbnails.fhd.url`: URL (url)
- `items[].snippet.thumbnails.fhd.width`: Width (number)
- `items[].snippet.thumbnails.fhd.height`: Height (number)
- `items[].snippet.thumbnails.qhd`: Quad HD
- `items[].snippet.thumbnails.qhd.url`: URL (url)
- `items[].snippet.thumbnails.qhd.width`: Width (number)
- `items[].snippet.thumbnails.qhd.height`: Height (number)
- `items[].contentDetails`: Content Details
- `items[].contentDetails.duration`: Duration (ISO 8601)
- `items[].contentDetails.dimension`: Dimension
- `items[].contentDetails.definition`: Definition
- `items[].contentDetails.caption`: Has Captions
- `items[].contentDetails.licensedContent`: Licensed Content (boolean)
- `items[].contentDetails.projection`: Projection
- `items[].statistics`: Statistics
- `items[].statistics.viewCount`: View Count
- `items[].statistics.likeCount`: Like Count
- `items[].statistics.favoriteCount`: Favorite Count
- `items[].statistics.commentCount`: Comment Count
- `items[].status`: Status
- `items[].status.uploadStatus`: Upload Status
- `items[].status.privacyStatus`: Privacy Status
- `items[].status.license`: License
- `items[].status.embeddable`: Embeddable (boolean)
- `items[].status.publicStatsViewable`: Public Stats Viewable (boolean)
- `items[].status.madeForKids`: Made For Kids (boolean)
- `items[].status.selfDeclaredMadeForKids`: Self-Declared Made For Kids (boolean)

### `get_channel`

**Get Channel.** Fetches a YouTube channel using channels.list, by channel ID or by @handle, returning title, description, country, subscriber count, view count and video count. Use it to resolve a channel reference into its statistics or its uploads playlist ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channelId` | string | no |  | Channel ID. Starts with UC. Leave empty to look the channel up by Handle. |
| `handle` | string | no |  | Handle. The @name on the channel page. Used only when Channel ID is empty. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `pageInfo`: Page Info
- `pageInfo.totalResults`: Total Results (number)
- `pageInfo.resultsPerPage`: Results Per Page (number)
- `items`: Channels
- `items[].kind`: Kind
- `items[].etag`: ETag
- `items[].id`: Channel ID
- `items[].snippet`: Snippet
- `items[].snippet.title`: Title
- `items[].snippet.description`: Description
- `items[].snippet.customUrl`: Custom URL
- `items[].snippet.publishedAt`: Created At (datetime)
- `items[].snippet.country`: Country
- `items[].snippet.localized`: Localized
- `items[].snippet.localized.title`: Title
- `items[].snippet.localized.description`: Description
- `items[].snippet.thumbnails`: Thumbnails
- `items[].snippet.thumbnails.default`: Default
- `items[].snippet.thumbnails.default.url`: URL (url)
- `items[].snippet.thumbnails.default.width`: Width (number)
- `items[].snippet.thumbnails.default.height`: Height (number)
- `items[].snippet.thumbnails.medium`: Medium
- `items[].snippet.thumbnails.medium.url`: URL (url)
- `items[].snippet.thumbnails.medium.width`: Width (number)
- `items[].snippet.thumbnails.medium.height`: Height (number)
- `items[].snippet.thumbnails.high`: High
- `items[].snippet.thumbnails.high.url`: URL (url)
- `items[].snippet.thumbnails.high.width`: Width (number)
- `items[].snippet.thumbnails.high.height`: Height (number)
- `items[].statistics`: Statistics
- `items[].statistics.viewCount`: View Count
- `items[].statistics.subscriberCount`: Subscriber Count
- `items[].statistics.hiddenSubscriberCount`: Hidden Subscriber Count (boolean)
- `items[].statistics.videoCount`: Video Count
- `items[].contentDetails`: Content Details
- `items[].contentDetails.relatedPlaylists`: Related Playlists
- `items[].contentDetails.relatedPlaylists.uploads`: Uploads Playlist ID
- `items[].contentDetails.relatedPlaylists.likes`: Likes Playlist ID

### `list_playlists`

**List Playlists.** Lists the playlists belonging to a YouTube channel using playlists.list, returning each playlist title, description, item count and privacy status. Use it to discover a playlist ID before calling List Playlist Items. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channelId` | string | yes |  | Channel ID. The channel's ID, which starts with UC. |
| `maxResults` | number | no | `25` | Max Results. How many playlists to return, up to 50. |
| `pageToken` | string | no |  | Page Token. The nextPageToken from an earlier run, to get the next page. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `nextPageToken`: Next Page Token
- `prevPageToken`: Previous Page Token
- `pageInfo`: Page Info
- `pageInfo.totalResults`: Total Results (number)
- `pageInfo.resultsPerPage`: Results Per Page (number)
- `items`: Playlists
- `items[].kind`: Kind
- `items[].etag`: ETag
- `items[].id`: Playlist ID
- `items[].snippet`: Snippet
- `items[].snippet.publishedAt`: Created At (datetime)
- `items[].snippet.channelId`: Channel ID
- `items[].snippet.channelTitle`: Channel Title
- `items[].snippet.title`: Title
- `items[].snippet.description`: Description
- `items[].snippet.localized`: Localized
- `items[].snippet.localized.title`: Title
- `items[].snippet.localized.description`: Description
- `items[].snippet.thumbnails`: Thumbnails
- `items[].snippet.thumbnails.default`: Default
- `items[].snippet.thumbnails.default.url`: URL (url)
- `items[].snippet.thumbnails.default.width`: Width (number)
- `items[].snippet.thumbnails.default.height`: Height (number)
- `items[].snippet.thumbnails.medium`: Medium
- `items[].snippet.thumbnails.medium.url`: URL (url)
- `items[].snippet.thumbnails.medium.width`: Width (number)
- `items[].snippet.thumbnails.medium.height`: Height (number)
- `items[].snippet.thumbnails.high`: High
- `items[].snippet.thumbnails.high.url`: URL (url)
- `items[].snippet.thumbnails.high.width`: Width (number)
- `items[].snippet.thumbnails.high.height`: Height (number)
- `items[].snippet.thumbnails.standard`: Standard
- `items[].snippet.thumbnails.standard.url`: URL (url)
- `items[].snippet.thumbnails.standard.width`: Width (number)
- `items[].snippet.thumbnails.standard.height`: Height (number)
- `items[].snippet.thumbnails.maxres`: Max Resolution
- `items[].snippet.thumbnails.maxres.url`: URL (url)
- `items[].snippet.thumbnails.maxres.width`: Width (number)
- `items[].snippet.thumbnails.maxres.height`: Height (number)
- `items[].snippet.thumbnails.fhd`: Full HD
- `items[].snippet.thumbnails.fhd.url`: URL (url)
- `items[].snippet.thumbnails.fhd.width`: Width (number)
- `items[].snippet.thumbnails.fhd.height`: Height (number)
- `items[].snippet.thumbnails.qhd`: Quad HD
- `items[].snippet.thumbnails.qhd.url`: URL (url)
- `items[].snippet.thumbnails.qhd.width`: Width (number)
- `items[].snippet.thumbnails.qhd.height`: Height (number)
- `items[].status`: Status
- `items[].status.privacyStatus`: Privacy Status
- `items[].contentDetails`: Content Details
- `items[].contentDetails.itemCount`: Item Count (number)

### `list_comments`

**List Comments.** Lists comment threads on a YouTube video using commentThreads.list, returning each top-level comment with its author, text, like count and reply count. Use it to read audience feedback on a video for triage, sentiment or moderation flows. Comments must be enabled on the video, otherwise YouTube answers 403. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoId` | string | yes |  | Video ID. The v= value in the video's URL. |
| `order` | string | no |  | Order. How to sort the comments. Empty: newest first. One of `"relevance"`, `"time"`. |
| `maxResults` | number | no | `20` | Max Results. How many comment threads to return, up to 100. |
| `pageToken` | string | no |  | Page Token. The nextPageToken from an earlier run, to get the next page. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `nextPageToken`: Next Page Token
- `pageInfo`: Page Info
- `pageInfo.totalResults`: Total Results (number)
- `pageInfo.resultsPerPage`: Results Per Page (number)
- `items`: Comment Threads
- `items[].kind`: Kind
- `items[].etag`: ETag
- `items[].id`: Thread ID
- `items[].snippet`: Snippet
- `items[].snippet.channelId`: Channel ID
- `items[].snippet.videoId`: Video ID
- `items[].snippet.canReply`: Can Reply (boolean)
- `items[].snippet.isPublic`: Is Public (boolean)
- `items[].snippet.totalReplyCount`: Reply Count (number)
- `items[].snippet.topLevelComment`: Top Level Comment
- `items[].snippet.topLevelComment.kind`: Kind
- `items[].snippet.topLevelComment.etag`: ETag
- `items[].snippet.topLevelComment.id`: Comment ID
- `items[].snippet.topLevelComment.snippet`: Snippet
- `items[].snippet.topLevelComment.snippet.channelId`: Channel ID
- `items[].snippet.topLevelComment.snippet.videoId`: Video ID
- `items[].snippet.topLevelComment.snippet.textDisplay`: Text (HTML) (html)
- `items[].snippet.topLevelComment.snippet.textOriginal`: Text
- `items[].snippet.topLevelComment.snippet.authorDisplayName`: Author
- `items[].snippet.topLevelComment.snippet.authorProfileImageUrl`: Author Avatar (url)
- `items[].snippet.topLevelComment.snippet.authorChannelUrl`: Author Channel URL (url)
- `items[].snippet.topLevelComment.snippet.authorChannelId`: Author Channel
- `items[].snippet.topLevelComment.snippet.authorChannelId.value`: Channel ID
- `items[].snippet.topLevelComment.snippet.canRate`: Can Rate (boolean)
- `items[].snippet.topLevelComment.snippet.viewerRating`: Viewer Rating
- `items[].snippet.topLevelComment.snippet.likeCount`: Like Count (number)
- `items[].snippet.topLevelComment.snippet.publishedAt`: Published At (datetime)
- `items[].snippet.topLevelComment.snippet.updatedAt`: Updated At (datetime)
- `items[].replies`: Replies
- `items[].replies.comments`: Comments
- `items[].replies.comments[].kind`: Kind
- `items[].replies.comments[].etag`: ETag
- `items[].replies.comments[].id`: Comment ID
- `items[].replies.comments[].snippet`: Snippet
- `items[].replies.comments[].snippet.parentId`: Parent Comment ID
- `items[].replies.comments[].snippet.channelId`: Channel ID
- `items[].replies.comments[].snippet.videoId`: Video ID
- `items[].replies.comments[].snippet.textDisplay`: Text (HTML) (html)
- `items[].replies.comments[].snippet.textOriginal`: Text
- `items[].replies.comments[].snippet.authorDisplayName`: Author
- `items[].replies.comments[].snippet.authorProfileImageUrl`: Author Avatar (url)
- `items[].replies.comments[].snippet.authorChannelUrl`: Author Channel URL (url)
- `items[].replies.comments[].snippet.authorChannelId`: Author Channel
- `items[].replies.comments[].snippet.authorChannelId.value`: Channel ID
- `items[].replies.comments[].snippet.canRate`: Can Rate (boolean)
- `items[].replies.comments[].snippet.viewerRating`: Viewer Rating
- `items[].replies.comments[].snippet.likeCount`: Like Count (number)
- `items[].replies.comments[].snippet.publishedAt`: Published At (datetime)
- `items[].replies.comments[].snippet.updatedAt`: Updated At (datetime)

### `create_playlist`

**Create Playlist.** Creates a playlist on the authenticated YouTube channel via playlists.insert and returns its new playlist ID. Use it before Add Video To Playlist; use Update Playlist to change an existing one instead. Every call creates another playlist, so retries duplicate it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. Playlist title, up to 150 characters. |
| `description` | string | no |  | Description. Playlist description, up to 5000 characters. |
| `privacyStatus` | string | no | `"private"` | Privacy Status. Who can see the playlist. Defaults to private. One of `"private"`, `"unlisted"`, `"public"`. |
| `defaultLanguage` | string | no |  | Default Language. BCP-47 language code of the title and description (for example: en, es, ja). |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `id`: Playlist ID
- `snippet`: Snippet
- `snippet.publishedAt`: Created At (datetime)
- `snippet.channelId`: Channel ID
- `snippet.channelTitle`: Channel Title
- `snippet.title`: Title
- `snippet.description`: Description
- `snippet.localized`: Localized
- `snippet.localized.title`: Title
- `snippet.localized.description`: Description
- `snippet.thumbnails`: Thumbnails
- `snippet.thumbnails.default`: Default
- `snippet.thumbnails.default.url`: URL (url)
- `snippet.thumbnails.default.width`: Width (number)
- `snippet.thumbnails.default.height`: Height (number)
- `snippet.thumbnails.medium`: Medium
- `snippet.thumbnails.medium.url`: URL (url)
- `snippet.thumbnails.medium.width`: Width (number)
- `snippet.thumbnails.medium.height`: Height (number)
- `snippet.thumbnails.high`: High
- `snippet.thumbnails.high.url`: URL (url)
- `snippet.thumbnails.high.width`: Width (number)
- `snippet.thumbnails.high.height`: Height (number)
- `snippet.thumbnails.standard`: Standard
- `snippet.thumbnails.standard.url`: URL (url)
- `snippet.thumbnails.standard.width`: Width (number)
- `snippet.thumbnails.standard.height`: Height (number)
- `snippet.thumbnails.maxres`: Max Resolution
- `snippet.thumbnails.maxres.url`: URL (url)
- `snippet.thumbnails.maxres.width`: Width (number)
- `snippet.thumbnails.maxres.height`: Height (number)
- `snippet.thumbnails.fhd`: Full HD
- `snippet.thumbnails.fhd.url`: URL (url)
- `snippet.thumbnails.fhd.width`: Width (number)
- `snippet.thumbnails.fhd.height`: Height (number)
- `snippet.thumbnails.qhd`: Quad HD
- `snippet.thumbnails.qhd.url`: URL (url)
- `snippet.thumbnails.qhd.width`: Width (number)
- `snippet.thumbnails.qhd.height`: Height (number)
- `status`: Status
- `status.privacyStatus`: Privacy Status

### `update_playlist`

**Update Playlist.** Updates a playlist owned by the authenticated channel via playlists.update, reading the playlist first and merging only the fields you supply so untouched fields survive. Use it to rename or re-describe an existing playlist; use Create Playlist for a new one. The playlist must belong to the connected account, and applying the same values again converges on the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `playlistId` | string | yes |  | Playlist ID. The playlist to update. This is the `list` parameter in a playlist URL (e.g. `PLbpi6ZahtOH6Ar_3GPy3workLYfGa7mGm`). |
| `title` | string | no |  | Title. New title. Leave blank to keep the current title. |
| `description` | string | no |  | Description. New description. Leave blank to keep the current description. |
| `tagsMode` | string | no | `"unchanged"` | Tags Update Mode. How to treat the Tags field. Leave Unchanged keeps the existing tags. One of `"unchanged"`, `"replace"`, `"clear"`. |
| `tags` | array | no |  | Tags. Tags to set when Tags Update Mode is Replace. |
| `privacyStatus` | string | no | `"unchanged"` | Privacy Status. New privacy. Leave Unchanged keeps the current value. One of `"unchanged"`, `"private"`, `"unlisted"`, `"public"`. |
| `defaultLanguage` | string | no |  | Default Language. BCP-47 language code of the title and description. Leave blank to keep the current value. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `id`: Playlist ID
- `snippet`: Snippet
- `snippet.publishedAt`: Created At (datetime)
- `snippet.channelId`: Channel ID
- `snippet.channelTitle`: Channel Title
- `snippet.title`: Title
- `snippet.description`: Description
- `snippet.localized`: Localized
- `snippet.localized.title`: Title
- `snippet.localized.description`: Description
- `snippet.thumbnails`: Thumbnails
- `snippet.thumbnails.default`: Default
- `snippet.thumbnails.default.url`: URL (url)
- `snippet.thumbnails.default.width`: Width (number)
- `snippet.thumbnails.default.height`: Height (number)
- `snippet.thumbnails.medium`: Medium
- `snippet.thumbnails.medium.url`: URL (url)
- `snippet.thumbnails.medium.width`: Width (number)
- `snippet.thumbnails.medium.height`: Height (number)
- `snippet.thumbnails.high`: High
- `snippet.thumbnails.high.url`: URL (url)
- `snippet.thumbnails.high.width`: Width (number)
- `snippet.thumbnails.high.height`: Height (number)
- `snippet.thumbnails.standard`: Standard
- `snippet.thumbnails.standard.url`: URL (url)
- `snippet.thumbnails.standard.width`: Width (number)
- `snippet.thumbnails.standard.height`: Height (number)
- `snippet.thumbnails.maxres`: Max Resolution
- `snippet.thumbnails.maxres.url`: URL (url)
- `snippet.thumbnails.maxres.width`: Width (number)
- `snippet.thumbnails.maxres.height`: Height (number)
- `snippet.thumbnails.fhd`: Full HD
- `snippet.thumbnails.fhd.url`: URL (url)
- `snippet.thumbnails.fhd.width`: Width (number)
- `snippet.thumbnails.fhd.height`: Height (number)
- `snippet.thumbnails.qhd`: Quad HD
- `snippet.thumbnails.qhd.url`: URL (url)
- `snippet.thumbnails.qhd.width`: Width (number)
- `snippet.thumbnails.qhd.height`: Height (number)
- `status`: Status
- `status.privacyStatus`: Privacy Status

### `delete_playlist`

**Delete Playlist.** Permanently deletes a playlist owned by the authenticated channel via playlists.delete. Use Remove Video From Playlist when only one entry should go; this removes the whole playlist and cannot be undone. A repeated call fails because the playlist no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `playlistId` | string | yes |  | Playlist ID. The playlist to delete. This is the `list` parameter in a playlist URL. |

Output fields:

- `success`: Success (boolean)
- `playlistId`: Playlist ID

### `add_video_to_playlist`

**Add Video To Playlist.** Adds one video to a playlist owned by the authenticated channel via playlistItems.insert and returns the new playlist item, whose ID is what Remove Video From Playlist needs. Use Create Playlist first when the playlist does not exist yet. YouTube allows the same video more than once, so retries add duplicate entries. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `playlistId` | string | yes |  | Playlist ID. The playlist to add to. This is the `list` parameter in a playlist URL. |
| `videoId` | string | yes |  | Video ID. The `v` parameter in a YouTube URL (e.g. `dQw4w9WgXcQ`). |
| `position` | number | no |  | Position. Zero-based position in the playlist. Leave blank to append to the end. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `id`: Playlist Item ID
- `snippet`: Snippet
- `snippet.publishedAt`: Added At (datetime)
- `snippet.channelId`: Channel ID
- `snippet.channelTitle`: Channel Title
- `snippet.title`: Title
- `snippet.description`: Description
- `snippet.playlistId`: Playlist ID
- `snippet.position`: Position (number)
- `snippet.videoOwnerChannelTitle`: Video Owner Channel Title
- `snippet.videoOwnerChannelId`: Video Owner Channel ID
- `snippet.resourceId`: Resource
- `snippet.resourceId.kind`: Resource Kind
- `snippet.resourceId.videoId`: Video ID
- `snippet.thumbnails`: Thumbnails
- `snippet.thumbnails.default`: Default
- `snippet.thumbnails.default.url`: URL (url)
- `snippet.thumbnails.default.width`: Width (number)
- `snippet.thumbnails.default.height`: Height (number)
- `snippet.thumbnails.medium`: Medium
- `snippet.thumbnails.medium.url`: URL (url)
- `snippet.thumbnails.medium.width`: Width (number)
- `snippet.thumbnails.medium.height`: Height (number)
- `snippet.thumbnails.high`: High
- `snippet.thumbnails.high.url`: URL (url)
- `snippet.thumbnails.high.width`: Width (number)
- `snippet.thumbnails.high.height`: Height (number)
- `snippet.thumbnails.standard`: Standard
- `snippet.thumbnails.standard.url`: URL (url)
- `snippet.thumbnails.standard.width`: Width (number)
- `snippet.thumbnails.standard.height`: Height (number)
- `snippet.thumbnails.maxres`: Max Resolution
- `snippet.thumbnails.maxres.url`: URL (url)
- `snippet.thumbnails.maxres.width`: Width (number)
- `snippet.thumbnails.maxres.height`: Height (number)
- `snippet.thumbnails.fhd`: Full HD
- `snippet.thumbnails.fhd.url`: URL (url)
- `snippet.thumbnails.fhd.width`: Width (number)
- `snippet.thumbnails.fhd.height`: Height (number)
- `snippet.thumbnails.qhd`: Quad HD
- `snippet.thumbnails.qhd.url`: URL (url)
- `snippet.thumbnails.qhd.width`: Width (number)
- `snippet.thumbnails.qhd.height`: Height (number)

### `remove_video_from_playlist`

**Remove Video From Playlist.** Removes a single entry from a playlist via playlistItems.delete. It takes the playlist item ID, not the video ID — get it from List Playlist Videos or from the output of Add Video To Playlist. Use Delete Playlist to remove the whole playlist; a repeated call fails because the entry is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `playlistItemId` | string | yes |  | Playlist Item ID. The playlist item ID (a long opaque string), not the video ID. Obtain it from List Playlist Videos or Add Video To Playlist. |

Output fields:

- `success`: Success (boolean)
- `playlistItemId`: Playlist Item ID

### `post_video_comment`

**Post Video Comment.** Posts a new top-level comment on a YouTube video via commentThreads.insert, as the authenticated account. Use Reply To Comment to answer an existing comment instead of starting a new thread. Comments must be enabled on the video, otherwise YouTube answers 403, and each call posts another comment so retries duplicate it. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoId` | string | yes |  | Video ID. The `v` parameter in a YouTube URL (e.g. `dQw4w9WgXcQ`). |
| `text` | string | yes |  | Comment Text. The comment body to post. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `id`: Thread ID
- `snippet`: Snippet
- `snippet.channelId`: Channel ID
- `snippet.videoId`: Video ID
- `snippet.canReply`: Can Reply (boolean)
- `snippet.isPublic`: Is Public (boolean)
- `snippet.totalReplyCount`: Reply Count (number)
- `snippet.topLevelComment`: Top Level Comment
- `snippet.topLevelComment.kind`: Kind
- `snippet.topLevelComment.etag`: ETag
- `snippet.topLevelComment.id`: Comment ID
- `snippet.topLevelComment.snippet`: Snippet
- `snippet.topLevelComment.snippet.channelId`: Channel ID
- `snippet.topLevelComment.snippet.videoId`: Video ID
- `snippet.topLevelComment.snippet.textDisplay`: Text (HTML) (html)
- `snippet.topLevelComment.snippet.textOriginal`: Text
- `snippet.topLevelComment.snippet.authorDisplayName`: Author
- `snippet.topLevelComment.snippet.authorProfileImageUrl`: Author Avatar (url)
- `snippet.topLevelComment.snippet.authorChannelUrl`: Author Channel URL (url)
- `snippet.topLevelComment.snippet.authorChannelId`: Author Channel
- `snippet.topLevelComment.snippet.authorChannelId.value`: Channel ID
- `snippet.topLevelComment.snippet.canRate`: Can Rate (boolean)
- `snippet.topLevelComment.snippet.viewerRating`: Viewer Rating
- `snippet.topLevelComment.snippet.likeCount`: Like Count (number)
- `snippet.topLevelComment.snippet.publishedAt`: Published At (datetime)
- `snippet.topLevelComment.snippet.updatedAt`: Updated At (datetime)

### `reply_to_comment`

**Reply To Comment.** Posts a reply to an existing top-level YouTube comment via comments.insert, as the authenticated account. Use Post Video Comment to start a new thread instead. The parent must be a top-level comment ID from List Comment Threads — YouTube has no nested replies, so replying to a reply fails — and each call posts another reply. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parentCommentId` | string | yes |  | Parent Comment ID. The ID of a top-level comment, from `items[].snippet.topLevelComment.id` in List Comment Threads. Reply IDs are not accepted. |
| `text` | string | yes |  | Reply Text. The reply body to post. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `id`: Comment ID
- `snippet`: Snippet
- `snippet.parentId`: Parent Comment ID
- `snippet.channelId`: Channel ID
- `snippet.textDisplay`: Text (HTML) (html)
- `snippet.textOriginal`: Text
- `snippet.authorDisplayName`: Author
- `snippet.authorProfileImageUrl`: Author Avatar (url)
- `snippet.authorChannelUrl`: Author Channel URL (url)
- `snippet.authorChannelId`: Author Channel
- `snippet.authorChannelId.value`: Channel ID
- `snippet.canRate`: Can Rate (boolean)
- `snippet.viewerRating`: Viewer Rating
- `snippet.likeCount`: Like Count (number)
- `snippet.publishedAt`: Published At (datetime)
- `snippet.updatedAt`: Updated At (datetime)

### `delete_comment`

**Delete Comment.** Permanently deletes a YouTube comment or reply via comments.delete. Use Set Comment Moderation Status to hold or reject a comment recoverably instead of destroying it. Only comments the authenticated account authored, or comments on its own videos, can be deleted, and a repeated call fails because the comment is gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `commentId` | string | yes |  | Comment ID. The comment or reply ID, from List Comment Threads or from Post Video Comment. |

Output fields:

- `success`: Success (boolean)
- `commentId`: Comment ID

### `set_comment_moderation_status`

**Set Comment Moderation Status.** Sets the moderation status of one or more comments on videos the authenticated account owns via comments.setModerationStatus. Use it instead of Delete Comment when the comment should be hidden or approved rather than destroyed. Ban Author only applies with the Rejected status and permanently bars that author from the channel, so leave it off unless that is intended; re-applying the same status is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `commentIds` | string | yes |  | Comment IDs. A comment ID, or a comma-separated list of comment IDs, from List Comment Threads. |
| `moderationStatus` | string | yes |  | Moderation Status. The status to apply to every listed comment. One of `"published"`, `"heldForReview"`, `"rejected"`. |
| `banAuthor` | string | no | `"no"` | Ban Author. Permanently ban the comment author from the channel. Only valid with the Rejected status and cannot be undone. One of `"no"`, `"yes"`. |

Output fields:

- `success`: Success (boolean)
- `commentIds`: Comment IDs
- `moderationStatus`: Moderation Status

### `rate_video`

**Rate Video.** Sets the authenticated account rating on a YouTube video via videos.rate, using like, dislike, or none to clear an existing rating. Use Get Video Rating to read the current rating first. The call replaces whatever rating was there, so applying the same value again changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoId` | string | yes |  | Video ID. The `v` parameter in a YouTube URL (e.g. `dQw4w9WgXcQ`). |
| `rating` | string | yes |  | Rating. The rating to apply. None removes any existing rating. One of `"like"`, `"dislike"`, `"none"`. |

Output fields:

- `success`: Success (boolean)
- `videoId`: Video ID
- `rating`: Rating

### `get_video_rating`

**Get Video Rating.** Reads the authenticated account own rating (like, dislike, none, or unspecified) for up to 50 videos via videos.getRating. Use it before Rate Video to avoid re-applying a rating the account already gave. It reports only the connected account rating, never the public like count, which Get Video Details returns. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoIds` | string | yes |  | Video IDs. A video ID, or a comma-separated list of up to 50 IDs (e.g. `dQw4w9WgXcQ,abc123`). |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `items`: Ratings
- `items[].videoId`: Video ID
- `items[].rating`: Rating

### `list_channel_activities`

**List Channel Activities.** Lists recent activity events (uploads, playlist additions and similar) for a channel via activities.list, optionally bounded by a published date range. Use List Channel Videos when only uploads are wanted; this returns the mixed activity feed. Provide a channel ID, or leave it blank to read the authenticated account own activity. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channelId` | string | no |  | Channel ID. Channel ID starting with `UC`. Leave blank to list the authenticated account own activity. |
| `publishedAfter` | ISO date-time string | no |  | Published After. Only include activities created at or after this datetime (RFC 3339). |
| `publishedBefore` | ISO date-time string | no |  | Published Before. Only include activities created before this datetime (RFC 3339). |
| `regionCode` | string | no |  | Region Code. ISO 3166-1 alpha-2 country code (for example: US, DE, JP). |
| `maxResults` | number | no | `25` | Max Results. Number of activities to return (0-50, default 25). |
| `pageToken` | string | no |  | Page Token. Token from a previous response, to fetch the next page. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `nextPageToken`: Next Page Token
- `pageInfo`: Page Info
- `pageInfo.totalResults`: Total Results (number)
- `pageInfo.resultsPerPage`: Results Per Page (number)
- `items`: Activities

### `list_my_subscriptions`

**List My Subscriptions.** Lists the channels the authenticated account subscribes to via subscriptions.list, returning each subscribed channel title and ID. Use it to answer "who do I follow" or to feed channel IDs into List Channel Videos. Set For Channel ID to check whether one specific channel is subscribed. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `order` | string | no |  | Order. Ordering of the subscriptions. One of `"alphabetical"`, `"relevance"`, `"unread"`. |
| `forChannelId` | string | no |  | For Channel ID. Only return the subscription to this channel, if one exists. Returns an empty list otherwise. |
| `maxResults` | number | no | `25` | Max Results. Number of subscriptions to return (0-50, default 25). |
| `pageToken` | string | no |  | Page Token. Token from a previous response, to fetch the next page. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `nextPageToken`: Next Page Token
- `pageInfo`: Page Info
- `pageInfo.totalResults`: Total Results (number)
- `pageInfo.resultsPerPage`: Results Per Page (number)
- `items`: Subscriptions

### `list_trending_videos`

**List Trending Videos.** Lists the currently most popular YouTube videos for a region via videos.list with the mostPopular chart, returning full video details including statistics. Use it for trending discovery; use Search YouTube when a free-text query is needed, which costs far more quota. Region Code is an ISO 3166-1 alpha-2 country code and defaults to US. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `regionCode` | string | no | `"US"` | Region Code. ISO 3166-1 alpha-2 country code (for example: US, DE, JP). Defaults to US. |
| `videoCategoryId` | string | no |  | Video Category ID. Restrict the chart to one video category ID (for example: 10 for Music). Leave blank for all categories. |
| `maxResults` | number | no | `25` | Max Results. Number of videos to return (1-50, default 25). |
| `pageToken` | string | no |  | Page Token. Token from a previous response, to fetch the next page. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `nextPageToken`: Next Page Token
- `pageInfo`: Page Info
- `pageInfo.totalResults`: Total Results (number)
- `pageInfo.resultsPerPage`: Results Per Page (number)
- `items`: Videos
- `items[].kind`: Kind
- `items[].etag`: ETag
- `items[].id`: Video ID
- `items[].snippet`: Snippet
- `items[].snippet.publishedAt`: Published At (datetime)
- `items[].snippet.channelId`: Channel ID
- `items[].snippet.channelTitle`: Channel Title
- `items[].snippet.title`: Title
- `items[].snippet.description`: Description
- `items[].snippet.tags`: Tags
- `items[].snippet.categoryId`: Category ID
- `items[].snippet.liveBroadcastContent`: Live Broadcast Content
- `items[].snippet.defaultLanguage`: Default Language
- `items[].snippet.defaultAudioLanguage`: Default Audio Language
- `items[].snippet.localized`: Localized
- `items[].snippet.localized.title`: Title
- `items[].snippet.localized.description`: Description
- `items[].snippet.thumbnails`: Thumbnails
- `items[].snippet.thumbnails.default`: Default
- `items[].snippet.thumbnails.default.url`: URL (url)
- `items[].snippet.thumbnails.default.width`: Width (number)
- `items[].snippet.thumbnails.default.height`: Height (number)
- `items[].snippet.thumbnails.medium`: Medium
- `items[].snippet.thumbnails.medium.url`: URL (url)
- `items[].snippet.thumbnails.medium.width`: Width (number)
- `items[].snippet.thumbnails.medium.height`: Height (number)
- `items[].snippet.thumbnails.high`: High
- `items[].snippet.thumbnails.high.url`: URL (url)
- `items[].snippet.thumbnails.high.width`: Width (number)
- `items[].snippet.thumbnails.high.height`: Height (number)
- `items[].snippet.thumbnails.standard`: Standard
- `items[].snippet.thumbnails.standard.url`: URL (url)
- `items[].snippet.thumbnails.standard.width`: Width (number)
- `items[].snippet.thumbnails.standard.height`: Height (number)
- `items[].snippet.thumbnails.maxres`: Max Resolution
- `items[].snippet.thumbnails.maxres.url`: URL (url)
- `items[].snippet.thumbnails.maxres.width`: Width (number)
- `items[].snippet.thumbnails.maxres.height`: Height (number)
- `items[].snippet.thumbnails.fhd`: Full HD
- `items[].snippet.thumbnails.fhd.url`: URL (url)
- `items[].snippet.thumbnails.fhd.width`: Width (number)
- `items[].snippet.thumbnails.fhd.height`: Height (number)
- `items[].snippet.thumbnails.qhd`: Quad HD
- `items[].snippet.thumbnails.qhd.url`: URL (url)
- `items[].snippet.thumbnails.qhd.width`: Width (number)
- `items[].snippet.thumbnails.qhd.height`: Height (number)
- `items[].contentDetails`: Content Details
- `items[].contentDetails.duration`: Duration (ISO 8601)
- `items[].contentDetails.dimension`: Dimension
- `items[].contentDetails.definition`: Definition
- `items[].contentDetails.caption`: Has Captions
- `items[].contentDetails.licensedContent`: Licensed Content (boolean)
- `items[].contentDetails.projection`: Projection
- `items[].statistics`: Statistics
- `items[].statistics.viewCount`: View Count
- `items[].statistics.likeCount`: Like Count
- `items[].statistics.favoriteCount`: Favorite Count
- `items[].statistics.commentCount`: Comment Count

### `list_channel_videos`

**List Channel Videos.** Lists a channel uploads by resolving the channel to its uploads playlist and paging through it, accepting either a channel ID starting with UC or an @handle. Prefer it over Search YouTube for "what has this channel posted", which is far cheaper in quota and not capped at 500 results. A channel with no uploads returns an empty item list. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channel` | string | yes |  | Channel ID or Handle. A channel ID starting with `UC`, or a handle such as `@GoogleDevelopers`. |
| `maxResults` | number | no | `25` | Max Results. Number of videos to return (0-50, default 25). |
| `pageToken` | string | no |  | Page Token. Token from a previous response, to fetch the next page. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `nextPageToken`: Next Page Token
- `pageInfo`: Page Info
- `pageInfo.totalResults`: Total Results (number)
- `pageInfo.resultsPerPage`: Results Per Page (number)
- `items`: Channel Videos
- `items[].kind`: Kind
- `items[].etag`: ETag
- `items[].id`: Playlist Item ID
- `items[].snippet`: Snippet
- `items[].snippet.publishedAt`: Added At (datetime)
- `items[].snippet.channelId`: Channel ID
- `items[].snippet.channelTitle`: Channel Title
- `items[].snippet.title`: Title
- `items[].snippet.description`: Description
- `items[].snippet.playlistId`: Playlist ID
- `items[].snippet.position`: Position (number)
- `items[].snippet.videoOwnerChannelTitle`: Video Owner Channel Title
- `items[].snippet.videoOwnerChannelId`: Video Owner Channel ID
- `items[].snippet.resourceId`: Resource
- `items[].snippet.resourceId.kind`: Resource Kind
- `items[].snippet.resourceId.videoId`: Video ID
- `items[].snippet.thumbnails`: Thumbnails
- `items[].snippet.thumbnails.default`: Default
- `items[].snippet.thumbnails.default.url`: URL (url)
- `items[].snippet.thumbnails.default.width`: Width (number)
- `items[].snippet.thumbnails.default.height`: Height (number)
- `items[].snippet.thumbnails.medium`: Medium
- `items[].snippet.thumbnails.medium.url`: URL (url)
- `items[].snippet.thumbnails.medium.width`: Width (number)
- `items[].snippet.thumbnails.medium.height`: Height (number)
- `items[].snippet.thumbnails.high`: High
- `items[].snippet.thumbnails.high.url`: URL (url)
- `items[].snippet.thumbnails.high.width`: Width (number)
- `items[].snippet.thumbnails.high.height`: Height (number)
- `items[].snippet.thumbnails.standard`: Standard
- `items[].snippet.thumbnails.standard.url`: URL (url)
- `items[].snippet.thumbnails.standard.width`: Width (number)
- `items[].snippet.thumbnails.standard.height`: Height (number)
- `items[].snippet.thumbnails.maxres`: Max Resolution
- `items[].snippet.thumbnails.maxres.url`: URL (url)
- `items[].snippet.thumbnails.maxres.width`: Width (number)
- `items[].snippet.thumbnails.maxres.height`: Height (number)
- `items[].snippet.thumbnails.fhd`: Full HD
- `items[].snippet.thumbnails.fhd.url`: URL (url)
- `items[].snippet.thumbnails.fhd.width`: Width (number)
- `items[].snippet.thumbnails.fhd.height`: Height (number)
- `items[].snippet.thumbnails.qhd`: Quad HD
- `items[].snippet.thumbnails.qhd.url`: URL (url)
- `items[].snippet.thumbnails.qhd.width`: Width (number)
- `items[].snippet.thumbnails.qhd.height`: Height (number)
- `items[].contentDetails`: Content Details
- `items[].contentDetails.videoId`: Video ID
- `items[].contentDetails.videoPublishedAt`: Video Published At (datetime)
- `items[].status`: Status
- `items[].status.privacyStatus`: Privacy Status

### `update_video_metadata`

**Update Video Metadata.** Updates metadata on a video owned by the authenticated channel via videos.update, reading the video first and merging only the fields you supply so untouched fields survive. Use it to retitle, re-describe, re-tag or re-categorise an upload; use Rate Video for likes and Set Comment Moderation Status for comments. The video must belong to the connected account, and applying the same values again converges on the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoId` | string | yes |  | Video ID. The `v` parameter in a YouTube URL (e.g. `dQw4w9WgXcQ`). |
| `title` | string | no |  | Title. New title. Leave blank to keep the current title. |
| `description` | string | no |  | Description. New description. Leave blank to keep the current description. |
| `categoryId` | string | no |  | Category ID. New video category ID (for example: 10 for Music). Leave blank to keep the current category. |
| `tagsMode` | string | no | `"unchanged"` | Tags Update Mode. How to treat the Tags field. Leave Unchanged keeps the existing tags. One of `"unchanged"`, `"replace"`, `"clear"`. |
| `tags` | array | no |  | Tags. Tags to set when Tags Update Mode is Replace. |
| `defaultLanguage` | string | no |  | Default Language. BCP-47 language code of the title and description. Leave blank to keep the current value. |
| `privacyStatus` | string | no | `"unchanged"` | Privacy Status. New privacy. Leave Unchanged keeps the current value. One of `"unchanged"`, `"private"`, `"unlisted"`, `"public"`. |
| `license` | string | no | `"unchanged"` | License. New license. Leave Unchanged keeps the current value. One of `"unchanged"`, `"youtube"`, `"creativeCommon"`. |
| `embeddable` | string | no | `"unchanged"` | Embeddable. Whether the video can be embedded on other sites. Leave Unchanged keeps the current value. One of `"unchanged"`, `"yes"`, `"no"`. |
| `publicStatsViewable` | string | no | `"unchanged"` | Public Stats Viewable. Whether the video statistics are publicly visible. Leave Unchanged keeps the current value. One of `"unchanged"`, `"yes"`, `"no"`. |
| `madeForKids` | string | no | `"unchanged"` | Made For Kids. Self-declaration that the video is made for kids. Leave Unchanged keeps the current value. One of `"unchanged"`, `"yes"`, `"no"`. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `id`: Video ID
- `snippet`: Snippet
- `snippet.publishedAt`: Published At (datetime)
- `snippet.channelId`: Channel ID
- `snippet.channelTitle`: Channel Title
- `snippet.title`: Title
- `snippet.description`: Description
- `snippet.tags`: Tags
- `snippet.categoryId`: Category ID
- `snippet.liveBroadcastContent`: Live Broadcast Content
- `snippet.defaultLanguage`: Default Language
- `snippet.defaultAudioLanguage`: Default Audio Language
- `snippet.localized`: Localized
- `snippet.localized.title`: Title
- `snippet.localized.description`: Description
- `snippet.thumbnails`: Thumbnails
- `snippet.thumbnails.default`: Default
- `snippet.thumbnails.default.url`: URL (url)
- `snippet.thumbnails.default.width`: Width (number)
- `snippet.thumbnails.default.height`: Height (number)
- `snippet.thumbnails.medium`: Medium
- `snippet.thumbnails.medium.url`: URL (url)
- `snippet.thumbnails.medium.width`: Width (number)
- `snippet.thumbnails.medium.height`: Height (number)
- `snippet.thumbnails.high`: High
- `snippet.thumbnails.high.url`: URL (url)
- `snippet.thumbnails.high.width`: Width (number)
- `snippet.thumbnails.high.height`: Height (number)
- `snippet.thumbnails.standard`: Standard
- `snippet.thumbnails.standard.url`: URL (url)
- `snippet.thumbnails.standard.width`: Width (number)
- `snippet.thumbnails.standard.height`: Height (number)
- `snippet.thumbnails.maxres`: Max Resolution
- `snippet.thumbnails.maxres.url`: URL (url)
- `snippet.thumbnails.maxres.width`: Width (number)
- `snippet.thumbnails.maxres.height`: Height (number)
- `snippet.thumbnails.fhd`: Full HD
- `snippet.thumbnails.fhd.url`: URL (url)
- `snippet.thumbnails.fhd.width`: Width (number)
- `snippet.thumbnails.fhd.height`: Height (number)
- `snippet.thumbnails.qhd`: Quad HD
- `snippet.thumbnails.qhd.url`: URL (url)
- `snippet.thumbnails.qhd.width`: Width (number)
- `snippet.thumbnails.qhd.height`: Height (number)
- `status`: Status
- `status.uploadStatus`: Upload Status
- `status.privacyStatus`: Privacy Status
- `status.license`: License
- `status.embeddable`: Embeddable (boolean)
- `status.publicStatsViewable`: Public Stats Viewable (boolean)
- `status.madeForKids`: Made For Kids (boolean)
- `status.selfDeclaredMadeForKids`: Self-Declared Made For Kids (boolean)

### `search_youtube`

**Search YouTube.** Runs a free-text YouTube search across videos, channels and playlists, or restricted to one type, returning the matching IDs. Prefer List Channel Videos or List Trending Videos when either fits, because search costs a hundred times more quota and caps at 500 results. Video-only filters such as duration, definition and caption require Type to be Video. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Query. Words to search for. Use \| for OR and - to leave a word out. |
| `type` | string | no | `"any"` | Type. Which kind of result to return. Video-only filters need Video. One of `"any"`, `"video"`, `"channel"`, `"playlist"`. |
| `forContentOwner` | boolean | no |  | For Content Owner. Only videos of the owner set in On Behalf Of Content Owner. |
| `forDeveloper` | boolean | no |  | For Developer. Only videos uploaded through this connection's Google Cloud app. |
| `forMine` | boolean | no |  | For Mine. Only videos on the connected account. Needs Type set to Video. |
| `onBehalfOfContentOwner` | string | no |  | On Behalf Of Content Owner. Content owner ID, for YouTube partners who manage many channels. |
| `channelId` | string | no |  | Channel ID. Only return results from this channel. The ID starts with UC. |
| `channelType` | string | no |  | Channel Type. Show returns only channels that publish TV shows. One of `"any"`, `"show"`. |
| `order` | string | no | `"relevance"` | Order. One of `"relevance"`, `"date"`, `"rating"`, `"title"`, `"videoCount"`, `"viewCount"`. |
| `safeSearch` | string | no | `"moderate"` | Safe Search. Whether to leave out restricted content. One of `"moderate"`, `"none"`, `"strict"`. |
| `publishedAfter` | ISO date-time string | no |  | Published After. Only results published on or after this date. |
| `publishedBefore` | ISO date-time string | no |  | Published Before. Only results published before this date. |
| `maxResults` | number | no | `25` | Max Results. How many results to return, up to 50. |
| `pageToken` | string | no |  | Page Token. The nextPageToken from an earlier run, to get the next page. |
| `regionCode` | string | no |  | Region Code. Two-letter country code. Results must be viewable there. |
| `relevanceLanguage` | string | no |  | Relevance Language. Two-letter language code. Results in it rank higher. |
| `topicId` | string | no |  | Topic ID. Freebase topic ID to limit results to one topic. |
| `eventType` | string | no |  | Event Type. Video only. Limit to live, upcoming or finished broadcasts. One of `"completed"`, `"live"`, `"upcoming"`. |
| `location` | string | no |  | Location. Video only. Latitude,longitude. Needs Location Radius too. |
| `locationRadius` | string | no |  | Location Radius. Video only. Distance from Location in m, km, ft or mi. |
| `videoCategoryId` | string | no |  | Video Category ID. Video only. YouTube's numeric category ID, like 10 for Music. |
| `videoDuration` | string | no |  | Video Duration. Video only. One of `"any"`, `"short"`, `"medium"`, `"long"`. |
| `videoDefinition` | string | no |  | Video Definition. Video only. One of `"any"`, `"high"`, `"standard"`. |
| `videoDimension` | string | no |  | Video Dimension. Video only. One of `"any"`, `"2d"`, `"3d"`. |
| `videoEmbeddable` | string | no |  | Video Embeddable. Video only. True: only videos other sites can embed. One of `"any"`, `"true"`. |
| `videoLicense` | string | no |  | Video License. Video only. One of `"any"`, `"creativeCommon"`, `"youtube"`. |
| `videoPaidProductPlacement` | string | no |  | Video Paid Product Placement. Video only. True: only videos with paid promotions. One of `"any"`, `"true"`. |
| `videoSyndicated` | string | no |  | Video Syndicated. Video only. True: only videos that play outside youtube.com. One of `"any"`, `"true"`. |
| `videoType` | string | no |  | Video Type. Video only. One of `"any"`, `"episode"`, `"movie"`. |
| `videoCaption` | string | no |  | Video Caption. Video only. One of `"any"`, `"closedCaption"`, `"none"`. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `nextPageToken`: Next Page Token
- `prevPageToken`: Previous Page Token
- `regionCode`: Region Code
- `pageInfo`: Page Info
- `pageInfo.totalResults`: Total Results (number)
- `pageInfo.resultsPerPage`: Results Per Page (number)
- `items`: Results
- `items[].kind`: Kind
- `items[].etag`: ETag
- `items[].id`: ID
- `items[].id.kind`: Resource Kind
- `items[].id.videoId`: Video ID
- `items[].id.channelId`: Channel ID
- `items[].id.playlistId`: Playlist ID
- `items[].snippet`: Snippet
- `items[].snippet.publishedAt`: Published At (datetime)
- `items[].snippet.publishTime`: Publish Time (datetime)
- `items[].snippet.channelId`: Channel ID
- `items[].snippet.channelTitle`: Channel Title
- `items[].snippet.title`: Title
- `items[].snippet.description`: Description
- `items[].snippet.liveBroadcastContent`: Live Broadcast Content
- `items[].snippet.thumbnails`: Thumbnails
- `items[].snippet.thumbnails.default`: Default
- `items[].snippet.thumbnails.default.url`: URL (url)
- `items[].snippet.thumbnails.default.width`: Width (number)
- `items[].snippet.thumbnails.default.height`: Height (number)
- `items[].snippet.thumbnails.medium`: Medium
- `items[].snippet.thumbnails.medium.url`: URL (url)
- `items[].snippet.thumbnails.medium.width`: Width (number)
- `items[].snippet.thumbnails.medium.height`: Height (number)
- `items[].snippet.thumbnails.high`: High
- `items[].snippet.thumbnails.high.url`: URL (url)
- `items[].snippet.thumbnails.high.width`: Width (number)
- `items[].snippet.thumbnails.high.height`: Height (number)

### `get_video_details`

**Get Video Details.** Fetches full details for one or more YouTube videos by ID, including title, description, tags, duration, view and like counts, and privacy status. Use it after Search YouTube, List Channel Videos or List Trending Videos hand you a video ID but not its details; use Get Video Rating for the connected account own rating. Up to 50 comma-separated IDs per call. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoIds` | string | yes |  | Video ID. A video ID, or several separated by commas: the v= value in the URL. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `pageInfo`: Page Info
- `pageInfo.totalResults`: Total Results (number)
- `pageInfo.resultsPerPage`: Results Per Page (number)
- `items`: Videos
- `items[].kind`: Kind
- `items[].etag`: ETag
- `items[].id`: Video ID
- `items[].snippet`: Snippet
- `items[].snippet.publishedAt`: Published At (datetime)
- `items[].snippet.channelId`: Channel ID
- `items[].snippet.channelTitle`: Channel Title
- `items[].snippet.title`: Title
- `items[].snippet.description`: Description
- `items[].snippet.tags`: Tags
- `items[].snippet.categoryId`: Category ID
- `items[].snippet.liveBroadcastContent`: Live Broadcast Content
- `items[].snippet.defaultLanguage`: Default Language
- `items[].snippet.defaultAudioLanguage`: Default Audio Language
- `items[].snippet.localized`: Localized
- `items[].snippet.localized.title`: Title
- `items[].snippet.localized.description`: Description
- `items[].snippet.thumbnails`: Thumbnails
- `items[].snippet.thumbnails.default`: Default
- `items[].snippet.thumbnails.default.url`: URL (url)
- `items[].snippet.thumbnails.default.width`: Width (number)
- `items[].snippet.thumbnails.default.height`: Height (number)
- `items[].snippet.thumbnails.medium`: Medium
- `items[].snippet.thumbnails.medium.url`: URL (url)
- `items[].snippet.thumbnails.medium.width`: Width (number)
- `items[].snippet.thumbnails.medium.height`: Height (number)
- `items[].snippet.thumbnails.high`: High
- `items[].snippet.thumbnails.high.url`: URL (url)
- `items[].snippet.thumbnails.high.width`: Width (number)
- `items[].snippet.thumbnails.high.height`: Height (number)
- `items[].snippet.thumbnails.standard`: Standard
- `items[].snippet.thumbnails.standard.url`: URL (url)
- `items[].snippet.thumbnails.standard.width`: Width (number)
- `items[].snippet.thumbnails.standard.height`: Height (number)
- `items[].snippet.thumbnails.maxres`: Max Resolution
- `items[].snippet.thumbnails.maxres.url`: URL (url)
- `items[].snippet.thumbnails.maxres.width`: Width (number)
- `items[].snippet.thumbnails.maxres.height`: Height (number)
- `items[].snippet.thumbnails.fhd`: Full HD
- `items[].snippet.thumbnails.fhd.url`: URL (url)
- `items[].snippet.thumbnails.fhd.width`: Width (number)
- `items[].snippet.thumbnails.fhd.height`: Height (number)
- `items[].snippet.thumbnails.qhd`: Quad HD
- `items[].snippet.thumbnails.qhd.url`: URL (url)
- `items[].snippet.thumbnails.qhd.width`: Width (number)
- `items[].snippet.thumbnails.qhd.height`: Height (number)
- `items[].contentDetails`: Content Details
- `items[].contentDetails.duration`: Duration (ISO 8601)
- `items[].contentDetails.dimension`: Dimension
- `items[].contentDetails.definition`: Definition
- `items[].contentDetails.caption`: Has Captions
- `items[].contentDetails.licensedContent`: Licensed Content (boolean)
- `items[].contentDetails.projection`: Projection
- `items[].statistics`: Statistics
- `items[].statistics.viewCount`: View Count
- `items[].statistics.likeCount`: Like Count
- `items[].statistics.favoriteCount`: Favorite Count
- `items[].statistics.commentCount`: Comment Count
- `items[].status`: Status
- `items[].status.uploadStatus`: Upload Status
- `items[].status.privacyStatus`: Privacy Status
- `items[].status.license`: License
- `items[].status.embeddable`: Embeddable (boolean)
- `items[].status.publicStatsViewable`: Public Stats Viewable (boolean)
- `items[].status.madeForKids`: Made For Kids (boolean)
- `items[].status.selfDeclaredMadeForKids`: Self-Declared Made For Kids (boolean)

### `get_channel_details`

**Get Channel Details.** Fetches a YouTube channel by channel ID or @handle, returning title, description, country, subscriber count, view count and video count. Use it to resolve a channel reference into statistics or an ID; use List Channel Videos when the goal is that channel uploads. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channelId` | string | no |  | Channel ID. Starts with UC. Leave empty to look the channel up by Handle. |
| `handle` | string | no |  | Handle. The @name on the channel page. Used only when Channel ID is empty. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `pageInfo`: Page Info
- `pageInfo.totalResults`: Total Results (number)
- `pageInfo.resultsPerPage`: Results Per Page (number)
- `items`: Channels
- `items[].kind`: Kind
- `items[].etag`: ETag
- `items[].id`: Channel ID
- `items[].snippet`: Snippet
- `items[].snippet.title`: Title
- `items[].snippet.description`: Description
- `items[].snippet.customUrl`: Custom URL
- `items[].snippet.publishedAt`: Created At (datetime)
- `items[].snippet.country`: Country
- `items[].snippet.localized`: Localized
- `items[].snippet.localized.title`: Title
- `items[].snippet.localized.description`: Description
- `items[].snippet.thumbnails`: Thumbnails
- `items[].snippet.thumbnails.default`: Default
- `items[].snippet.thumbnails.default.url`: URL (url)
- `items[].snippet.thumbnails.default.width`: Width (number)
- `items[].snippet.thumbnails.default.height`: Height (number)
- `items[].snippet.thumbnails.medium`: Medium
- `items[].snippet.thumbnails.medium.url`: URL (url)
- `items[].snippet.thumbnails.medium.width`: Width (number)
- `items[].snippet.thumbnails.medium.height`: Height (number)
- `items[].snippet.thumbnails.high`: High
- `items[].snippet.thumbnails.high.url`: URL (url)
- `items[].snippet.thumbnails.high.width`: Width (number)
- `items[].snippet.thumbnails.high.height`: Height (number)
- `items[].statistics`: Statistics
- `items[].statistics.viewCount`: View Count
- `items[].statistics.subscriberCount`: Subscriber Count
- `items[].statistics.hiddenSubscriberCount`: Hidden Subscriber Count (boolean)
- `items[].statistics.videoCount`: Video Count
- `items[].contentDetails`: Content Details
- `items[].contentDetails.relatedPlaylists`: Related Playlists
- `items[].contentDetails.relatedPlaylists.uploads`: Uploads Playlist ID
- `items[].contentDetails.relatedPlaylists.likes`: Likes Playlist ID

### `list_channel_playlists`

**List Channel Playlists.** Lists the playlists belonging to a YouTube channel, returning each playlist title, description, item count and privacy status. Use it to discover a playlist ID before List Playlist Videos, Add Video To Playlist or Update Playlist. A channel ID starting with UC is required; resolve a handle with Get Channel Details first. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channelId` | string | yes |  | Channel ID. The channel's ID, which starts with UC. |
| `maxResults` | number | no | `25` | Max Results. How many playlists to return, up to 50. |
| `pageToken` | string | no |  | Page Token. The nextPageToken from an earlier run, to get the next page. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `nextPageToken`: Next Page Token
- `prevPageToken`: Previous Page Token
- `pageInfo`: Page Info
- `pageInfo.totalResults`: Total Results (number)
- `pageInfo.resultsPerPage`: Results Per Page (number)
- `items`: Playlists
- `items[].kind`: Kind
- `items[].etag`: ETag
- `items[].id`: Playlist ID
- `items[].snippet`: Snippet
- `items[].snippet.publishedAt`: Created At (datetime)
- `items[].snippet.channelId`: Channel ID
- `items[].snippet.channelTitle`: Channel Title
- `items[].snippet.title`: Title
- `items[].snippet.description`: Description
- `items[].snippet.localized`: Localized
- `items[].snippet.localized.title`: Title
- `items[].snippet.localized.description`: Description
- `items[].snippet.thumbnails`: Thumbnails
- `items[].snippet.thumbnails.default`: Default
- `items[].snippet.thumbnails.default.url`: URL (url)
- `items[].snippet.thumbnails.default.width`: Width (number)
- `items[].snippet.thumbnails.default.height`: Height (number)
- `items[].snippet.thumbnails.medium`: Medium
- `items[].snippet.thumbnails.medium.url`: URL (url)
- `items[].snippet.thumbnails.medium.width`: Width (number)
- `items[].snippet.thumbnails.medium.height`: Height (number)
- `items[].snippet.thumbnails.high`: High
- `items[].snippet.thumbnails.high.url`: URL (url)
- `items[].snippet.thumbnails.high.width`: Width (number)
- `items[].snippet.thumbnails.high.height`: Height (number)
- `items[].snippet.thumbnails.standard`: Standard
- `items[].snippet.thumbnails.standard.url`: URL (url)
- `items[].snippet.thumbnails.standard.width`: Width (number)
- `items[].snippet.thumbnails.standard.height`: Height (number)
- `items[].snippet.thumbnails.maxres`: Max Resolution
- `items[].snippet.thumbnails.maxres.url`: URL (url)
- `items[].snippet.thumbnails.maxres.width`: Width (number)
- `items[].snippet.thumbnails.maxres.height`: Height (number)
- `items[].snippet.thumbnails.fhd`: Full HD
- `items[].snippet.thumbnails.fhd.url`: URL (url)
- `items[].snippet.thumbnails.fhd.width`: Width (number)
- `items[].snippet.thumbnails.fhd.height`: Height (number)
- `items[].snippet.thumbnails.qhd`: Quad HD
- `items[].snippet.thumbnails.qhd.url`: URL (url)
- `items[].snippet.thumbnails.qhd.width`: Width (number)
- `items[].snippet.thumbnails.qhd.height`: Height (number)
- `items[].status`: Status
- `items[].status.privacyStatus`: Privacy Status
- `items[].contentDetails`: Content Details
- `items[].contentDetails.itemCount`: Item Count (number)

### `list_playlist_videos`

**List Playlist Videos.** Lists the entries of a YouTube playlist, either by playlist ID or by a comma-separated list of playlist item IDs, and is the source of the playlist item ID that Remove Video From Playlist needs. Use List Channel Playlists first when the playlist ID is unknown. Exactly one of Playlist ID or Item IDs is required and Max Results is capped at 50. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `playlistId` | string | no |  | Playlist ID. The list= value in the playlist's URL. Leave empty to use Item IDs. |
| `itemIds` | string | no |  | Item IDs. Comma-separated playlist item IDs, used instead of Playlist ID. |
| `maxResults` | number | no | `50` | Max Results. How many items to return, up to 50. |
| `pageToken` | string | no |  | Page Token. The nextPageToken from an earlier run, to get the next page. |
| `videoId` | string | no |  | Video ID. Only return entries for this video. Needs a Playlist ID. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `nextPageToken`: Next Page Token
- `prevPageToken`: Previous Page Token
- `pageInfo`: Page Info
- `pageInfo.totalResults`: Total Results (number)
- `pageInfo.resultsPerPage`: Results Per Page (number)
- `items`: Playlist Items
- `items[].kind`: Kind
- `items[].etag`: ETag
- `items[].id`: Playlist Item ID
- `items[].snippet`: Snippet
- `items[].snippet.publishedAt`: Added At (datetime)
- `items[].snippet.channelId`: Channel ID
- `items[].snippet.channelTitle`: Channel Title
- `items[].snippet.title`: Title
- `items[].snippet.description`: Description
- `items[].snippet.playlistId`: Playlist ID
- `items[].snippet.position`: Position (number)
- `items[].snippet.videoOwnerChannelTitle`: Video Owner Channel Title
- `items[].snippet.videoOwnerChannelId`: Video Owner Channel ID
- `items[].snippet.resourceId`: Resource
- `items[].snippet.resourceId.kind`: Resource Kind
- `items[].snippet.resourceId.videoId`: Video ID
- `items[].snippet.thumbnails`: Thumbnails
- `items[].snippet.thumbnails.default`: Default
- `items[].snippet.thumbnails.default.url`: URL (url)
- `items[].snippet.thumbnails.default.width`: Width (number)
- `items[].snippet.thumbnails.default.height`: Height (number)
- `items[].snippet.thumbnails.medium`: Medium
- `items[].snippet.thumbnails.medium.url`: URL (url)
- `items[].snippet.thumbnails.medium.width`: Width (number)
- `items[].snippet.thumbnails.medium.height`: Height (number)
- `items[].snippet.thumbnails.high`: High
- `items[].snippet.thumbnails.high.url`: URL (url)
- `items[].snippet.thumbnails.high.width`: Width (number)
- `items[].snippet.thumbnails.high.height`: Height (number)
- `items[].snippet.thumbnails.standard`: Standard
- `items[].snippet.thumbnails.standard.url`: URL (url)
- `items[].snippet.thumbnails.standard.width`: Width (number)
- `items[].snippet.thumbnails.standard.height`: Height (number)
- `items[].snippet.thumbnails.maxres`: Max Resolution
- `items[].snippet.thumbnails.maxres.url`: URL (url)
- `items[].snippet.thumbnails.maxres.width`: Width (number)
- `items[].snippet.thumbnails.maxres.height`: Height (number)
- `items[].snippet.thumbnails.fhd`: Full HD
- `items[].snippet.thumbnails.fhd.url`: URL (url)
- `items[].snippet.thumbnails.fhd.width`: Width (number)
- `items[].snippet.thumbnails.fhd.height`: Height (number)
- `items[].snippet.thumbnails.qhd`: Quad HD
- `items[].snippet.thumbnails.qhd.url`: URL (url)
- `items[].snippet.thumbnails.qhd.width`: Width (number)
- `items[].snippet.thumbnails.qhd.height`: Height (number)
- `items[].contentDetails`: Content Details
- `items[].contentDetails.videoId`: Video ID
- `items[].contentDetails.videoPublishedAt`: Video Published At (datetime)
- `items[].status`: Status
- `items[].status.privacyStatus`: Privacy Status

### `list_comment_threads`

**List Comment Threads.** Lists top-level comment threads on a YouTube video with each comment author, text, like count and reply count, and is the source of the comment IDs that Reply To Comment, Delete Comment and Set Comment Moderation Status need. Comments must be enabled on the video, otherwise YouTube answers 403. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoId` | string | yes |  | Video ID. The v= value in the video's URL. |
| `order` | string | no |  | Order. How to sort the comments. Empty: newest first. One of `"relevance"`, `"time"`. |
| `maxResults` | number | no | `20` | Max Results. How many comment threads to return, up to 100. |
| `pageToken` | string | no |  | Page Token. The nextPageToken from an earlier run, to get the next page. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `nextPageToken`: Next Page Token
- `pageInfo`: Page Info
- `pageInfo.totalResults`: Total Results (number)
- `pageInfo.resultsPerPage`: Results Per Page (number)
- `items`: Comment Threads
- `items[].kind`: Kind
- `items[].etag`: ETag
- `items[].id`: Thread ID
- `items[].snippet`: Snippet
- `items[].snippet.channelId`: Channel ID
- `items[].snippet.videoId`: Video ID
- `items[].snippet.canReply`: Can Reply (boolean)
- `items[].snippet.isPublic`: Is Public (boolean)
- `items[].snippet.totalReplyCount`: Reply Count (number)
- `items[].snippet.topLevelComment`: Top Level Comment
- `items[].snippet.topLevelComment.kind`: Kind
- `items[].snippet.topLevelComment.etag`: ETag
- `items[].snippet.topLevelComment.id`: Comment ID
- `items[].snippet.topLevelComment.snippet`: Snippet
- `items[].snippet.topLevelComment.snippet.channelId`: Channel ID
- `items[].snippet.topLevelComment.snippet.videoId`: Video ID
- `items[].snippet.topLevelComment.snippet.textDisplay`: Text (HTML) (html)
- `items[].snippet.topLevelComment.snippet.textOriginal`: Text
- `items[].snippet.topLevelComment.snippet.authorDisplayName`: Author
- `items[].snippet.topLevelComment.snippet.authorProfileImageUrl`: Author Avatar (url)
- `items[].snippet.topLevelComment.snippet.authorChannelUrl`: Author Channel URL (url)
- `items[].snippet.topLevelComment.snippet.authorChannelId`: Author Channel
- `items[].snippet.topLevelComment.snippet.authorChannelId.value`: Channel ID
- `items[].snippet.topLevelComment.snippet.canRate`: Can Rate (boolean)
- `items[].snippet.topLevelComment.snippet.viewerRating`: Viewer Rating
- `items[].snippet.topLevelComment.snippet.likeCount`: Like Count (number)
- `items[].snippet.topLevelComment.snippet.publishedAt`: Published At (datetime)
- `items[].snippet.topLevelComment.snippet.updatedAt`: Updated At (datetime)
- `items[].replies`: Replies
- `items[].replies.comments`: Comments
- `items[].replies.comments[].kind`: Kind
- `items[].replies.comments[].etag`: ETag
- `items[].replies.comments[].id`: Comment ID
- `items[].replies.comments[].snippet`: Snippet
- `items[].replies.comments[].snippet.parentId`: Parent Comment ID
- `items[].replies.comments[].snippet.channelId`: Channel ID
- `items[].replies.comments[].snippet.videoId`: Video ID
- `items[].replies.comments[].snippet.textDisplay`: Text (HTML) (html)
- `items[].replies.comments[].snippet.textOriginal`: Text
- `items[].replies.comments[].snippet.authorDisplayName`: Author
- `items[].replies.comments[].snippet.authorProfileImageUrl`: Author Avatar (url)
- `items[].replies.comments[].snippet.authorChannelUrl`: Author Channel URL (url)
- `items[].replies.comments[].snippet.authorChannelId`: Author Channel
- `items[].replies.comments[].snippet.authorChannelId.value`: Channel ID
- `items[].replies.comments[].snippet.canRate`: Can Rate (boolean)
- `items[].replies.comments[].snippet.viewerRating`: Viewer Rating
- `items[].replies.comments[].snippet.likeCount`: Like Count (number)
- `items[].replies.comments[].snippet.publishedAt`: Published At (datetime)
- `items[].replies.comments[].snippet.updatedAt`: Updated At (datetime)

### `list_caption_tracks`

**List Caption Tracks.** Lists the caption tracks attached to a single YouTube video and supplies the caption ID that Download Caption Track requires. Use it to find which languages a video is captioned in. The video ID is mandatory and this call is unusually expensive in YouTube quota, so avoid repeating it. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `videoId` | string | yes |  | Video ID. The v= value in the video's URL. |
| `captionIds` | string | no |  | Caption IDs. Only return these tracks. Separate caption IDs with commas. |
| `onBehalfOfContentOwner` | string | no |  | On Behalf Of Content Owner. Content owner ID, for YouTube partners who manage many channels. |

Output fields:

- `kind`: Kind
- `etag`: ETag
- `items`: Captions
- `items[].kind`: Kind
- `items[].etag`: ETag
- `items[].id`: Caption ID
- `items[].snippet`: Snippet
- `items[].snippet.videoId`: Video ID
- `items[].snippet.lastUpdated`: Last Updated (datetime)
- `items[].snippet.trackKind`: Track Kind
- `items[].snippet.language`: Language
- `items[].snippet.name`: Name
- `items[].snippet.audioTrackType`: Audio Track Type
- `items[].snippet.isCC`: Closed Captions (boolean)
- `items[].snippet.isLarge`: Large Text (boolean)
- `items[].snippet.isEasyReader`: Easy Reader (boolean)
- `items[].snippet.isDraft`: Draft (boolean)
- `items[].snippet.isAutoSynced`: Auto Synced (boolean)
- `items[].snippet.status`: Status

### `download_caption_track`

**Download Caption Track.** Downloads the raw text of one caption track by caption ID, optionally as SRT, VTT, SBV, SCC or TTML and machine-translated into a target language. Use it after List Caption Tracks supplies the caption ID. It only serves tracks on videos the connected account can edit, and auto-generated (asr) tracks are refused with a 403. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `captionId` | string | yes |  | Caption ID. From List Captions. Auto-generated tracks can't be downloaded. |
| `format` | string | no |  | Format. File format of the captions. Empty: the track's original format. One of `"srt"`, `"vtt"`, `"sbv"`, `"scc"`, `"ttml"`. |
| `targetLanguage` | string | no |  | Target Language. Translate the captions into this language code. |
| `onBehalfOfContentOwner` | string | no |  | On Behalf Of Content Owner. Content owner ID, for YouTube partners who manage many channels. |

Output fields:

- `caption`: Caption Text

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

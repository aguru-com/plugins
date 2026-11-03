# Bluesky

Decentralized social network built on the AT Protocol.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-bluesky'
  version: '0.2.0'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To connect Bluesky:
>
> 1. **PDS Host**: Leave the default (https://bsky.social) unless your account lives on a self-hosted Personal Data Server.
> 2. **Identifier**: Your Bluesky handle (for example yourname.bsky.social) or the email address of the account.
> 3. **Password**: An **app password**. In Bluesky open **Settings → Privacy and security → App passwords**, click **Add App Password**, give it a name and paste the generated password here. Your main account password also works, but it grants full account access, so an app password is strongly recommended.
>
> Bluesky limits sign-ins to 30 per 5 minutes and 300 per day per account.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pdsHost` | string | no | `"https://bsky.social"` | PDS Host. The Personal Data Server host. Leave empty for default Bluesky network (https://bsky.social) |
| `identifier` | string | yes |  | Identifier. Your Bluesky handle or email address. |
| `password` | string | yes |  | Password. A Bluesky app password (recommended) or your account password. |

## Actions

### `createPost`

**Create Post.** Publishes a new post to the authenticated Bluesky account, with optional images, video, an external link card, a quoted post, content-warning labels, and chained thread replies. Use to broadcast content on Bluesky, including threads and video; for a single post prefer Create Post (AI). The post text may be at most 300 visible characters after hashtags are appended, and every thread text is checked before anything is posted. Not idempotent: each call creates a brand-new post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `postType` | string | no | `"text"` | Post Type. Informational only. To quote a post, fill in "Quote Post URL"; to reply, fill in "Reply to Post". One of `"text"`, `"photo"`, `"link"`, `"reply"`, `"quote"`. |
| `text` | string | yes |  | Post Text. What do you want to post? (Max 300 characters, counted as visible characters so emoji and non-Latin text count once each) |
| `language` | string | no | `"en"` | Post Language. Language of your post. One of `"en"`, `"es"`, `"fr"`, `"de"`, `"it"`, `"pt"`, `"ja"`, `"ko"`, `"zh"`, `"ru"`, `"ar"`, `"hi"`, `"nl"`, `"sv"`, `"other"`. |
| `imageUrls` | array | no |  | Image URLs. Add up to 4 images by URL (PNG, JPEG, GIF or WebP, max 1 MB each) |
| `imageDescriptions` | array | no |  | Image Descriptions. Describe each image for accessibility. |
| `videoUrl` | string | no |  | Video URL. Link to a video file (MP4, max 50 MB). Bluesky only accepts videos from accounts with a verified email address. |
| `videoAltText` | string | no |  | Video Description. Describe the video for accessibility. |
| `videoCaptions` | array | no |  | Video Captions. Caption file URLs in WebVTT (.vtt) format (optional) |
| `videoCaptionLanguage` | string | no | `"en"` | Video Caption Language. Language code of the caption files, for example en or de. Defaults to en. |
| `linkUrl` | string | no |  | Link to Share. URL to share with your post. |
| `replyToPost` | string | no |  | Reply to Post. URL of post to reply to. |
| `quotePostUrl` | string | no |  | Quote Post URL. Link or at:// URI of a post to quote (embed) in this post. Works together with images, video or a link. |
| `threadContent` | array | no |  | Thread Posts. Create additional connected posts. Each must be 300 characters or fewer. |
| `additionalHashtags` | string | no |  | Hashtags. Add hashtags (e.g., tech,bluesky). At most 8. |
| `contentWarnings` | array | no |  | Content Warnings. Self-labels Bluesky shows as content warnings. "Adult Content" is sent as Bluesky's Adult (porn) label, "Violence" as Graphic Media, "Sensitive Topic" as Suggestive (sexual); "Spam/Promotional" has no Bluesky label and is ignored. One of `"adult"`, `"graphic-media"`, `"sensitive"`, `"violence"`, `"spam"`, `"sexual"`, `"nudity"`, `"porn"`. |
| `audience` | string | no | `"public"` | Audience. Bluesky posts are always public; this setting has no effect and is kept only for older flows. One of `"public"`, `"followers"`, `"unlisted"`. |

Output fields:

- `success`: Success (boolean)
- `mainPost`: Main Post
- `mainPost.uri`: Post URI
- `mainPost.cid`: CID
- `threadPosts`: Thread Posts
- `threadPosts[].uri`: Post URI
- `threadPosts[].cid`: CID
- `failedThreadPosts`: Failed Thread Posts
- `failedThreadPosts[].index`: Position (number)
- `failedThreadPosts[].error`: Error
- `url`: Post Link (url)
- `totalPosts`: Total Posts (number)
- `record`: Post
- `record.text`: Text
- `record.createdAt`: Created At (datetime)
- `record.embed`: Embed
- `record.langs`: Languages
- `record.tags`: Tags
- `record.reply`: Reply Refs

### `likePost`

**Like Post.** Adds a like from the authenticated account to a specific Bluesky post, identified either by an AT-URI / bsky.app post URL or by selecting from the recent timeline. Use to register approval of a post. Not idempotent: each call creates a separate like record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `selectionMethod` | string | yes | `"timeline"` | Select Method. How to choose the post. One of `"timeline"`, `"manual"`. |
| `postSelection` | string | no |  | Select Post. Choose from your 50 most recent timeline posts (only when "From my timeline" is selected above) A value the product loads from the provider, such as an id; write the value itself. |
| `postUrl` | string | no |  | Post URL. Paste the Bluesky post URL. |

Output fields:

- `success`: Success (boolean)
- `likeUri`: Like URI
- `likeCid`: Like CID
- `postUri`: Post URI
- `postCid`: Post CID
- `postUrl`: Post Link (url)
- `postAuthor`: Post Author
- `postText`: Post Text
- `selectionMethod`: Selection Method
- `likedAt`: Liked At (datetime)

### `repostPost`

**Repost Post.** Reposts an existing Bluesky post to the authenticated account's timeline, identified by an AT-URI / bsky.app post URL or selected from the recent timeline. Use to amplify another user's post. Not idempotent: each call creates a separate repost record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `selectionMethod` | string | yes | `"timeline"` | Select Method. How to choose the post. One of `"timeline"`, `"manual"`. |
| `postSelection` | string | no |  | Select Post. Choose from your 50 most recent timeline posts (only when "From my timeline" is selected above) A value the product loads from the provider, such as an id; write the value itself. |
| `postUrl` | string | no |  | Post URL. Paste the Bluesky post URL. |

Output fields:

- `success`: Success (boolean)
- `repostUri`: Repost URI
- `repostCid`: Repost CID
- `originalPost`: Original Post
- `originalPost.uri`: Post URI
- `originalPost.url`: Post Link (url)
- `originalPost.cid`: CID
- `originalPost.author`: Author Handle
- `originalPost.text`: Text
- `originalPost.createdAt`: Created At (datetime)
- `selectionMethod`: Selection Method
- `repostedAt`: Reposted At (datetime)

### `findPost`

**Find Post.** Retrieves a single Bluesky post with its content, author, and engagement counts (likes, reposts, replies, quotes), given a bsky.app post URL or AT-URI (handle or DID form). Use to look up the current state or metadata of a known post; use Get Posts to fetch several at once. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `postUrl` | string | yes |  | Post URL. Paste the Bluesky post URL (e.g., https://bsky.app/profile/username.bsky.social/post/xxx) |

Output fields:

- `success`: Success (boolean)
- `uri`: Post URI
- `url`: Post Link (url)
- `cid`: CID
- `record`: Post
- `record.text`: Text
- `record.createdAt`: Created At (datetime)
- `record.embed`: Embed
- `record.langs`: Languages
- `record.tags`: Tags
- `record.reply`: Reply Refs
- `author`: Author
- `author.did`: Author DID
- `author.handle`: Handle
- `author.displayName`: Display Name
- `author.avatar`: Avatar (image)
- `indexedAt`: Indexed At (datetime)
- `replyCount`: Reply Count (number)
- `repostCount`: Repost Count (number)
- `likeCount`: Like Count (number)
- `quoteCount`: Quote Count (number)
- `embed`: Embed
- `labels`: Labels
- `viewer`: Viewer State
- `threadgate`: Threadgate
- `retrievedAt`: Retrieved At (datetime)

### `findThread`

**Find Thread.** Retrieves the full conversation thread around a Bluesky post (parent posts and nested replies) given a bsky.app post URL or AT-URI, with configurable reply depth (default 10) and parent height (default 3), each 0-1000. Use to read an entire discussion rather than a single post. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `postUrl` | string | yes |  | Post URL. Paste the Bluesky post URL (e.g., https://bsky.app/profile/username.bsky.social/post/xxx) |
| `depth` | string | no | `"10"` | Thread Depth. How many levels deep to retrieve replies. One of `"1"`, `"2"`, `"3"`, `"5"`, `"10"`, `"20"`, `"50"`, `"100"`. |
| `parentHeight` | string | no | `"3"` | Parent Height. How many parent posts to retrieve. One of `"0"`, `"1"`, `"2"`, `"3"`, `"5"`, `"10"`, `"20"`, `"80"`. |

Output fields:

- `success`: Success (boolean)
- `thread`: Thread
- `thread.post`: Root Post
- `thread.post.uri`: Post URI
- `thread.post.cid`: CID
- `thread.post.author`: Author
- `thread.post.author.did`: Author DID
- `thread.post.author.handle`: Handle
- `thread.post.author.displayName`: Display Name
- `thread.post.author.avatar`: Avatar (image)
- `thread.post.record`: Post
- `thread.post.record.text`: Text
- `thread.post.record.createdAt`: Created At (datetime)
- `thread.post.record.embed`: Embed
- `thread.post.record.langs`: Languages
- `thread.post.record.tags`: Tags
- `thread.post.record.reply`: Reply Refs
- `thread.post.indexedAt`: Indexed At (datetime)
- `thread.post.replyCount`: Reply Count (number)
- `thread.post.repostCount`: Repost Count (number)
- `thread.post.likeCount`: Like Count (number)
- `thread.post.quoteCount`: Quote Count (number)
- `thread.post.embed`: Embed
- `thread.post.labels`: Labels
- `thread.post.viewer`: Viewer State
- `thread.parent`: Parent Thread
- `thread.replies`: Replies
- `requestedUri`: Requested URI
- `parameters`: Parameters
- `parameters.depth`: Depth (number)
- `parameters.parentHeight`: Parent Height (number)
- `statistics`: Statistics
- `statistics.totalPosts`: Total Posts (number)
- `statistics.parentPosts`: Parent Posts (number)
- `statistics.replyPosts`: Reply Posts (number)
- `statistics.notFoundPosts`: Not Found Posts (number)
- `statistics.blockedPosts`: Blocked Posts (number)
- `retrievedAt`: Retrieved At (datetime)

### `delete_post`

**Delete Post.** Permanently deletes a post owned by the connected Bluesky account, given its bsky.app link or AT-URI; it refuses posts by other accounts. The deletion cannot be undone. Idempotent: deleting an already-deleted post succeeds and reports existed=false. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post` | string | yes |  | Post. The post link (https://bsky.app/profile/alice.bsky.social/post/3k...) or its at:// URI. |

Output fields:

- `deleted`: Deleted (boolean)
- `existed`: Existed Before (boolean)
- `uri`: Post URI
- `deletedAt`: Deleted At (datetime)

### `unlike_post`

**Unlike Post.** Removes the connected account's like from a Bluesky post given its bsky.app link or AT-URI. Use to undo Like Post. Idempotent: when the post is not liked it changes nothing and returns removed=false. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post` | string | yes |  | Post. The post link (https://bsky.app/profile/alice.bsky.social/post/3k...) or its at:// URI. |

Output fields:

- `removed`: Removed (boolean)
- `postUri`: Post URI
- `likeUri`: Removed Like URI

### `undo_repost`

**Undo Repost.** Removes the connected account's repost of a Bluesky post given the original post's bsky.app link or AT-URI. Use to undo Repost Post. Idempotent: when the post is not reposted it changes nothing and returns removed=false. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post` | string | yes |  | Post. The post link (https://bsky.app/profile/alice.bsky.social/post/3k...) or its at:// URI. |

Output fields:

- `removed`: Removed (boolean)
- `postUri`: Post URI
- `repostUri`: Removed Repost URI

### `get_profile`

**Get Profile.** Returns one Bluesky profile (display name, bio, avatar, follower/following/post counts and the connected account's relationship to it) given a handle, DID or profile link; leave the account empty for the connected account itself. Use Search Users when you only have a name. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `actor` | string | no |  | Account. Handle (alice.bsky.social), DID or profile link. Leave empty for your own profile. |

Output fields:

- `did`: DID
- `handle`: Handle
- `displayName`: Display Name
- `description`: Bio
- `avatar`: Avatar (image)
- `url`: Profile Link (url)
- `createdAt`: Account Created At (datetime)
- `indexedAt`: Indexed At (datetime)
- `viewer`: Viewer State
- `banner`: Banner (image)
- `followersCount`: Followers (number)
- `followsCount`: Following (number)
- `postsCount`: Posts (number)
- `pinnedPost`: Pinned Post
- `pinnedPost.uri`: Post URI

### `search_users`

**Search Users.** Searches Bluesky accounts whose name, handle or bio match a query and returns one page of profiles with a cursor for the next page. Use to find an account when you do not know its exact handle; use Get Profile when you do. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Words to search for, for example a name or company. |
| `limit` | number | no | `25` | Limit. How many results to return per page (1-100, default 25). |
| `cursor` | string | no |  | Cursor. Leave empty for the first page. To get the next page, pass the "cursor" value returned by the previous run. |

Output fields:

- `items`: Accounts
- `items[].did`: DID
- `items[].handle`: Handle
- `items[].displayName`: Display Name
- `items[].description`: Bio
- `items[].avatar`: Avatar (image)
- `items[].url`: Profile Link (url)
- `items[].createdAt`: Account Created At (datetime)
- `items[].indexedAt`: Indexed At (datetime)
- `items[].viewer`: Viewer State
- `cursor`: Next Page Cursor
- `hasMore`: Has More (boolean)

### `search_posts`

**Search Posts.** Searches public Bluesky posts by query, with optional author, mention, language, domain, link, tag and date-range filters, sorted latest or top and paginated with a cursor. Use Get User's Posts to read one account's feed instead. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Words, "exact phrases", #hashtags or from:handle. Use * to match everything when you only filter. |
| `sort` | string | no | `"latest"` | Sort. One of `"latest"`, `"top"`. |
| `author` | string | no |  | Author. Only posts by this handle or DID. |
| `mentions` | string | no |  | Mentions. Only posts that mention this handle or DID. |
| `lang` | string | no |  | Language. Only posts in this language, for example en or ja. |
| `domain` | string | no |  | Link Domain. Only posts linking to this domain, for example activepieces.com. |
| `url` | string | no |  | Link URL. Only posts linking to this exact URL. |
| `tags` | array | no |  | Tags. Only posts with all of these hashtags (without #). |
| `since` | ISO date-time string | no |  | Since. Only posts created at or after this time. |
| `until` | ISO date-time string | no |  | Until. Only posts created before this time. |
| `limit` | number | no | `25` | Limit. How many results to return per page (1-100, default 25). |
| `cursor` | string | no |  | Cursor. Leave empty for the first page. To get the next page, pass the "cursor" value returned by the previous run. |

Output fields:

- `items`: Posts
- `items[].text`: Text
- `items[].url`: Post Link (url)
- `items[].uri`: Post URI
- `items[].cid`: CID
- `items[].author`: Author
- `items[].author.did`: Author DID
- `items[].author.handle`: Handle
- `items[].author.displayName`: Display Name
- `items[].author.avatar`: Avatar (image)
- `items[].record`: Post
- `items[].record.text`: Text
- `items[].record.createdAt`: Created At (datetime)
- `items[].record.embed`: Embed
- `items[].record.langs`: Languages
- `items[].record.tags`: Tags
- `items[].record.reply`: Reply Refs
- `items[].indexedAt`: Indexed At (datetime)
- `items[].replyCount`: Reply Count (number)
- `items[].repostCount`: Repost Count (number)
- `items[].likeCount`: Like Count (number)
- `items[].quoteCount`: Quote Count (number)
- `items[].embed`: Embed
- `items[].labels`: Labels
- `items[].viewer`: Viewer State
- `cursor`: Next Page Cursor
- `hasMore`: Has More (boolean)

### `follow_user`

**Follow User.** Follows a Bluesky account given its handle, DID or profile link, and returns the existing follow when the account is already followed. Use Unfollow User to undo. Idempotent: a repeat call does not create a second follow. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `actor` | string | yes |  | Account. Handle (alice.bsky.social), DID or profile link of the account to follow. |

Output fields:

- `followUri`: Follow URI
- `did`: DID
- `handle`: Handle
- `alreadyFollowing`: Already Following (boolean)

### `unfollow_user`

**Unfollow User.** Stops following a Bluesky account given its handle, DID or profile link. Use to undo Follow User. Idempotent: when the account is not followed it changes nothing and returns removed=false. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `actor` | string | yes |  | Account. Handle (alice.bsky.social), DID or profile link of the account to unfollow. |

Output fields:

- `removed`: Removed (boolean)
- `did`: DID
- `handle`: Handle
- `followUri`: Removed Follow URI

### `block_user`

**Block User.** Blocks a Bluesky account given its handle, DID or profile link, so neither side sees or interacts with the other; blocks are public on Bluesky. Use Mute User for a private alternative and Unblock User to undo. Idempotent: an existing block is returned instead of creating another. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `actor` | string | yes |  | Account. Handle (alice.bsky.social), DID or profile link of the account to block. |

Output fields:

- `blockUri`: Block URI
- `did`: DID
- `handle`: Handle
- `alreadyBlocked`: Already Blocked (boolean)

### `unblock_user`

**Unblock User.** Removes the connected account's block on a Bluesky account given its handle, DID or profile link. Use to undo Block User. Idempotent: when the account is not blocked it changes nothing and returns removed=false. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `actor` | string | yes |  | Account. Handle (alice.bsky.social), DID or profile link of the account to unblock. |

Output fields:

- `removed`: Removed (boolean)
- `did`: DID
- `handle`: Handle
- `blockUri`: Removed Block URI

### `mute_user`

**Mute User.** Mutes a Bluesky account given its handle, DID or profile link, hiding its posts from the connected account's feeds and notifications; mutes are private. Use Unmute User to undo, or Block User for a public block. Idempotent: muting an already-muted account changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `actor` | string | yes |  | Account. Handle (alice.bsky.social), DID or profile link of the account to mute. |

Output fields:

- `muted`: Muted Now (boolean)
- `wasMuted`: Was Muted Before (boolean)
- `did`: DID
- `handle`: Handle

### `unmute_user`

**Unmute User.** Unmutes a Bluesky account given its handle, DID or profile link so its posts show again. Use to undo Mute User. Idempotent: unmuting an account that is not muted changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `actor` | string | yes |  | Account. Handle (alice.bsky.social), DID or profile link of the account to unmute. |

Output fields:

- `muted`: Muted Now (boolean)
- `wasMuted`: Was Muted Before (boolean)
- `did`: DID
- `handle`: Handle

### `get_author_feed`

**Get User's Posts.** Lists one Bluesky account's own feed, newest first (its posts and reposts), filtered to posts without replies (default), with replies, only media, only video, or author threads, with cursor pagination. Use Search Posts to search across all accounts. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `actor` | string | no |  | Account. Handle (alice.bsky.social), DID or profile link. Leave empty for your own posts. |
| `filter` | string | no | `"posts_no_replies"` | Include. One of `"posts_no_replies"`, `"posts_with_replies"`, `"posts_with_media"`, `"posts_with_video"`, `"posts_and_author_threads"`. |
| `includePins` | boolean | no | `false` | Include Pinned Post. Put the pinned post first. |
| `limit` | number | no | `25` | Limit. How many results to return per page (1-100, default 25). |
| `cursor` | string | no |  | Cursor. Leave empty for the first page. To get the next page, pass the "cursor" value returned by the previous run. |

Output fields:

- `items`: Posts
- `items[].text`: Text
- `items[].url`: Post Link (url)
- `items[].uri`: Post URI
- `items[].cid`: CID
- `items[].author`: Author
- `items[].author.did`: Author DID
- `items[].author.handle`: Handle
- `items[].author.displayName`: Display Name
- `items[].author.avatar`: Avatar (image)
- `items[].record`: Post
- `items[].record.text`: Text
- `items[].record.createdAt`: Created At (datetime)
- `items[].record.embed`: Embed
- `items[].record.langs`: Languages
- `items[].record.tags`: Tags
- `items[].record.reply`: Reply Refs
- `items[].indexedAt`: Indexed At (datetime)
- `items[].replyCount`: Reply Count (number)
- `items[].repostCount`: Repost Count (number)
- `items[].likeCount`: Like Count (number)
- `items[].quoteCount`: Quote Count (number)
- `items[].embed`: Embed
- `items[].labels`: Labels
- `items[].viewer`: Viewer State
- `items[].isRepost`: Is Repost (boolean)
- `items[].repostedBy`: Reposted By
- `items[].repostedBy.did`: Author DID
- `items[].repostedBy.handle`: Handle
- `items[].repostedBy.displayName`: Display Name
- `items[].repostedBy.avatar`: Avatar (image)
- `items[].repostedAt`: Reposted At (datetime)
- `items[].isReply`: Is Reply (boolean)
- `items[].replyToUri`: Replied-To Post URI
- `items[].isPinned`: Is Pinned (boolean)
- `cursor`: Next Page Cursor
- `hasMore`: Has More (boolean)

### `get_timeline`

**Get Home Timeline.** Lists the connected account's home timeline (posts and reposts from accounts it follows), newest first, with cursor pagination. Use Get User's Posts for one account or Search Posts for a query. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `25` | Limit. How many results to return per page (1-100, default 25). |
| `cursor` | string | no |  | Cursor. Leave empty for the first page. To get the next page, pass the "cursor" value returned by the previous run. |

Output fields:

- `items`: Posts
- `items[].text`: Text
- `items[].url`: Post Link (url)
- `items[].uri`: Post URI
- `items[].cid`: CID
- `items[].author`: Author
- `items[].author.did`: Author DID
- `items[].author.handle`: Handle
- `items[].author.displayName`: Display Name
- `items[].author.avatar`: Avatar (image)
- `items[].record`: Post
- `items[].record.text`: Text
- `items[].record.createdAt`: Created At (datetime)
- `items[].record.embed`: Embed
- `items[].record.langs`: Languages
- `items[].record.tags`: Tags
- `items[].record.reply`: Reply Refs
- `items[].indexedAt`: Indexed At (datetime)
- `items[].replyCount`: Reply Count (number)
- `items[].repostCount`: Repost Count (number)
- `items[].likeCount`: Like Count (number)
- `items[].quoteCount`: Quote Count (number)
- `items[].embed`: Embed
- `items[].labels`: Labels
- `items[].viewer`: Viewer State
- `items[].isRepost`: Is Repost (boolean)
- `items[].repostedBy`: Reposted By
- `items[].repostedBy.did`: Author DID
- `items[].repostedBy.handle`: Handle
- `items[].repostedBy.displayName`: Display Name
- `items[].repostedBy.avatar`: Avatar (image)
- `items[].repostedAt`: Reposted At (datetime)
- `items[].isReply`: Is Reply (boolean)
- `items[].replyToUri`: Replied-To Post URI
- `items[].isPinned`: Is Pinned (boolean)
- `cursor`: Next Page Cursor
- `hasMore`: Has More (boolean)

### `get_post_likes`

**Get Post Likes.** Lists the accounts that liked a Bluesky post, given its bsky.app link or AT-URI, newest first with cursor pagination. Use Get Post Reposts or Get Post Quotes for other engagement. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post` | string | yes |  | Post. The post link (https://bsky.app/profile/alice.bsky.social/post/3k...) or its at:// URI. |
| `limit` | number | no | `25` | Limit. How many results to return per page (1-100, default 25). |
| `cursor` | string | no |  | Cursor. Leave empty for the first page. To get the next page, pass the "cursor" value returned by the previous run. |

Output fields:

- `items`: Likes
- `items[].did`: DID
- `items[].handle`: Handle
- `items[].displayName`: Display Name
- `items[].description`: Bio
- `items[].avatar`: Avatar (image)
- `items[].url`: Profile Link (url)
- `items[].createdAt`: Account Created At (datetime)
- `items[].indexedAt`: Indexed At (datetime)
- `items[].viewer`: Viewer State
- `items[].likedAt`: Liked At (datetime)
- `cursor`: Next Page Cursor
- `hasMore`: Has More (boolean)

### `get_post_reposts`

**Get Post Reposts.** Lists the accounts that reposted a Bluesky post, given its bsky.app link or AT-URI, with cursor pagination. Use Get Post Quotes for reposts that added a comment. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post` | string | yes |  | Post. The post link (https://bsky.app/profile/alice.bsky.social/post/3k...) or its at:// URI. |
| `limit` | number | no | `25` | Limit. How many results to return per page (1-100, default 25). |
| `cursor` | string | no |  | Cursor. Leave empty for the first page. To get the next page, pass the "cursor" value returned by the previous run. |

Output fields:

- `items`: Accounts
- `items[].did`: DID
- `items[].handle`: Handle
- `items[].displayName`: Display Name
- `items[].description`: Bio
- `items[].avatar`: Avatar (image)
- `items[].url`: Profile Link (url)
- `items[].createdAt`: Account Created At (datetime)
- `items[].indexedAt`: Indexed At (datetime)
- `items[].viewer`: Viewer State
- `cursor`: Next Page Cursor
- `hasMore`: Has More (boolean)

### `get_post_quotes`

**Get Post Quotes.** Lists the posts that quote (repost with a comment) a Bluesky post, given its bsky.app link or AT-URI, with cursor pagination. Use Get Post Reposts for plain reposts. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post` | string | yes |  | Post. The post link (https://bsky.app/profile/alice.bsky.social/post/3k...) or its at:// URI. |
| `limit` | number | no | `25` | Limit. How many results to return per page (1-100, default 25). |
| `cursor` | string | no |  | Cursor. Leave empty for the first page. To get the next page, pass the "cursor" value returned by the previous run. |

Output fields:

- `items`: Posts
- `items[].text`: Text
- `items[].url`: Post Link (url)
- `items[].uri`: Post URI
- `items[].cid`: CID
- `items[].author`: Author
- `items[].author.did`: Author DID
- `items[].author.handle`: Handle
- `items[].author.displayName`: Display Name
- `items[].author.avatar`: Avatar (image)
- `items[].record`: Post
- `items[].record.text`: Text
- `items[].record.createdAt`: Created At (datetime)
- `items[].record.embed`: Embed
- `items[].record.langs`: Languages
- `items[].record.tags`: Tags
- `items[].record.reply`: Reply Refs
- `items[].indexedAt`: Indexed At (datetime)
- `items[].replyCount`: Reply Count (number)
- `items[].repostCount`: Repost Count (number)
- `items[].likeCount`: Like Count (number)
- `items[].quoteCount`: Quote Count (number)
- `items[].embed`: Embed
- `items[].labels`: Labels
- `items[].viewer`: Viewer State
- `cursor`: Next Page Cursor
- `hasMore`: Has More (boolean)

### `list_followers`

**List Followers.** Lists the accounts that follow a Bluesky account (the connected account when left empty), newest follow first, with cursor pagination. Use List Following for the accounts it follows. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `actor` | string | no |  | Account. Handle (alice.bsky.social), DID or profile link. Leave empty for your own account. |
| `limit` | number | no | `25` | Limit. How many results to return per page (1-100, default 25). |
| `cursor` | string | no |  | Cursor. Leave empty for the first page. To get the next page, pass the "cursor" value returned by the previous run. |

Output fields:

- `items`: Accounts
- `items[].did`: DID
- `items[].handle`: Handle
- `items[].displayName`: Display Name
- `items[].description`: Bio
- `items[].avatar`: Avatar (image)
- `items[].url`: Profile Link (url)
- `items[].createdAt`: Account Created At (datetime)
- `items[].indexedAt`: Indexed At (datetime)
- `items[].viewer`: Viewer State
- `cursor`: Next Page Cursor
- `hasMore`: Has More (boolean)

### `list_follows`

**List Following.** Lists the accounts a Bluesky account follows (the connected account when left empty), newest follow first, with cursor pagination. Use List Followers for the accounts following it. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `actor` | string | no |  | Account. Handle (alice.bsky.social), DID or profile link. Leave empty for your own account. |
| `limit` | number | no | `25` | Limit. How many results to return per page (1-100, default 25). |
| `cursor` | string | no |  | Cursor. Leave empty for the first page. To get the next page, pass the "cursor" value returned by the previous run. |

Output fields:

- `items`: Accounts
- `items[].did`: DID
- `items[].handle`: Handle
- `items[].displayName`: Display Name
- `items[].description`: Bio
- `items[].avatar`: Avatar (image)
- `items[].url`: Profile Link (url)
- `items[].createdAt`: Account Created At (datetime)
- `items[].indexedAt`: Indexed At (datetime)
- `items[].viewer`: Viewer State
- `cursor`: Next Page Cursor
- `hasMore`: Has More (boolean)

### `list_notifications`

**List Notifications.** Lists the connected account's notifications (likes, reposts, follows, mentions, replies, quotes and more), newest first, optionally filtered by type or to unread ones, with cursor pagination. Use Get Unread Count for only the number. Read-only and idempotent; it does not mark anything as seen. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reasons` | array | no |  | Notification Types. Only these notification types. Leave empty for all. One of `"like"`, `"repost"`, `"follow"`, `"mention"`, `"reply"`, `"quote"`, `"starterpack-joined"`, `"like-via-repost"`, `"repost-via-repost"`, `"subscribed-post"`, `"verified"`, `"unverified"`. |
| `unreadOnly` | boolean | no | `false` | Unread Only. Only return notifications that are not yet marked as seen. A page can then hold fewer items than the limit. |
| `limit` | number | no | `25` | Limit. How many results to return per page (1-100, default 25). |
| `cursor` | string | no |  | Cursor. Leave empty for the first page. To get the next page, pass the "cursor" value returned by the previous run. |

Output fields:

- `items`: Notifications
- `items[].reason`: Type
- `items[].text`: Text
- `items[].author`: From
- `items[].author.did`: DID
- `items[].author.handle`: Handle
- `items[].author.displayName`: Display Name
- `items[].author.description`: Bio
- `items[].author.avatar`: Avatar (image)
- `items[].author.url`: Profile Link (url)
- `items[].author.createdAt`: Account Created At (datetime)
- `items[].author.indexedAt`: Indexed At (datetime)
- `items[].author.viewer`: Viewer State
- `items[].url`: Post Link (url)
- `items[].reasonSubject`: Subject URI
- `items[].isRead`: Is Read (boolean)
- `items[].indexedAt`: Indexed At (datetime)
- `items[].uri`: Record URI
- `items[].cid`: Record CID
- `cursor`: Next Page Cursor
- `hasMore`: Has More (boolean)
- `seenAt`: Last Seen At (datetime)

### `mark_notifications_seen`

**Mark Notifications as Seen.** Marks every notification of the connected Bluesky account up to a given time (default now) as seen, which resets the unread count in the Bluesky app. Use after processing List Notifications. Idempotent: repeating it with the same time changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `seenAt` | ISO date-time string | no |  | Seen Up To. Notifications up to this time are marked as seen. Leave empty for now. |

Output fields:

- `seenAt`: Seen Up To (datetime)

### `update_profile`

**Update Profile.** Updates the connected Bluesky account's own profile: display name (max 64 characters), bio (max 256) and avatar image URL. Fields left empty keep their current value, every other profile field (banner, pinned post, existing avatar) is kept as it is, and the Clear options blank a field. Idempotent: the same input leaves the profile in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `displayName` | string | no |  | Display Name. New display name. Leave empty to keep the current one. |
| `clearDisplayName` | boolean | no | `false` | Clear Display Name. Remove the display name. |
| `description` | string | no |  | Bio. New bio. Leave empty to keep the current one. |
| `clearDescription` | boolean | no | `false` | Clear Bio. Remove the bio. |
| `avatarUrl` | string | no |  | Avatar Image URL. PNG or JPEG, max 1 MB. Leave empty to keep the current avatar. |

Output fields:

- `did`: DID
- `displayName`: Display Name
- `description`: Bio
- `avatarUpdated`: Avatar Updated (boolean)
- `updatedAt`: Updated At (datetime)

### `list_my_lists`

**List Lists.** Lists the curation and moderation lists created by a Bluesky account (the connected account when left empty), optionally only one kind, with cursor pagination. Use Get List Members to read who is on a list. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `actor` | string | no |  | Account. Handle, DID or profile link of the list owner. Leave empty for your own lists. |
| `purpose` | string | no | `"all"` | Kind. One of `"all"`, `"app.bsky.graph.defs#curatelist"`, `"app.bsky.graph.defs#modlist"`, `"app.bsky.graph.defs#referencelist"`. |
| `limit` | number | no | `25` | Limit. How many results to return per page (1-100, default 25). |
| `cursor` | string | no |  | Cursor. Leave empty for the first page. To get the next page, pass the "cursor" value returned by the previous run. |

Output fields:

- `items`: Lists
- `items[].name`: Name
- `items[].purpose`: Kind
- `items[].description`: Description
- `items[].listItemCount`: Members (number)
- `items[].url`: List Link (url)
- `items[].uri`: List URI
- `items[].avatar`: Avatar (image)
- `items[].indexedAt`: Indexed At (datetime)
- `items[].creator`: Owner
- `items[].creator.did`: DID
- `items[].creator.handle`: Handle
- `items[].creator.displayName`: Display Name
- `items[].creator.description`: Bio
- `items[].creator.avatar`: Avatar (image)
- `items[].creator.url`: Profile Link (url)
- `items[].creator.createdAt`: Account Created At (datetime)
- `items[].creator.indexedAt`: Indexed At (datetime)
- `items[].creator.viewer`: Viewer State
- `cursor`: Next Page Cursor
- `hasMore`: Has More (boolean)

### `get_list_members`

**Get List Members.** Returns a Bluesky list's details and one page of its member accounts, given the list's bsky.app link or AT-URI, with cursor pagination. Use List Lists to find a list first. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. The list link (https://bsky.app/profile/alice.bsky.social/lists/3k...) or its at:// URI. |
| `limit` | number | no | `25` | Limit. How many results to return per page (1-100, default 25). |
| `cursor` | string | no |  | Cursor. Leave empty for the first page. To get the next page, pass the "cursor" value returned by the previous run. |

Output fields:

- `list`: List
- `list.name`: Name
- `list.purpose`: Kind
- `list.description`: Description
- `list.listItemCount`: Members (number)
- `list.url`: List Link (url)
- `list.uri`: List URI
- `list.avatar`: Avatar (image)
- `list.indexedAt`: Indexed At (datetime)
- `list.creator`: Owner
- `list.creator.did`: DID
- `list.creator.handle`: Handle
- `list.creator.displayName`: Display Name
- `list.creator.description`: Bio
- `list.creator.avatar`: Avatar (image)
- `list.creator.url`: Profile Link (url)
- `list.creator.createdAt`: Account Created At (datetime)
- `list.creator.indexedAt`: Indexed At (datetime)
- `list.creator.viewer`: Viewer State
- `items`: Members
- `items[].did`: DID
- `items[].handle`: Handle
- `items[].displayName`: Display Name
- `items[].description`: Bio
- `items[].avatar`: Avatar (image)
- `items[].url`: Profile Link (url)
- `items[].createdAt`: Account Created At (datetime)
- `items[].indexedAt`: Indexed At (datetime)
- `items[].viewer`: Viewer State
- `items[].listItemUri`: Membership URI
- `cursor`: Next Page Cursor
- `hasMore`: Has More (boolean)

### `create_list`

**Create List.** Creates a new list owned by the connected Bluesky account: a user (curation) list for feeds and grouping, or a moderation list for bulk mute/block. Use Add User to List afterwards to fill it. Not idempotent: each call creates another list, even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. List name (max 64 characters). |
| `purpose` | string | yes | `"app.bsky.graph.defs#curatelist"` | Kind. One of `"app.bsky.graph.defs#curatelist"`, `"app.bsky.graph.defs#modlist"`. |
| `description` | string | no |  | Description. Optional (max 300 characters). |

Output fields:

- `uri`: List URI
- `url`: List Link (url)
- `cid`: CID
- `name`: Name
- `purpose`: Kind
- `description`: Description
- `createdAt`: Created At (datetime)

### `delete_list`

**Delete List.** Permanently deletes a list owned by the connected Bluesky account, given its bsky.app link or AT-URI: it first removes every membership record of the list from the account repository, and deletes the list only after all of them are gone; it refuses lists of other accounts. Cannot be undone. Idempotent: running it again finishes any cleanup a failed run left behind, and deleting an already-deleted list succeeds and reports existed=false. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. The list link (https://bsky.app/profile/alice.bsky.social/lists/3k...) or its at:// URI. |

Output fields:

- `deleted`: Deleted (boolean)
- `existed`: Existed Before (boolean)
- `uri`: List URI
- `membersRemoved`: Memberships Removed (number)
- `membersFailed`: Memberships Not Removed (number)
- `membersComplete`: All Memberships Found (boolean)

### `add_user_to_list`

**Add User to List.** Adds a Bluesky account (handle, DID or profile link) to a list owned by the connected account, given the list's link or AT-URI. Use Remove User from List to undo. Not idempotent: calling it twice adds a second membership record for the same account. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. The list link (https://bsky.app/profile/alice.bsky.social/lists/3k...) or its at:// URI. |
| `actor` | string | yes |  | Account. Handle (alice.bsky.social), DID or profile link of the account to add. |

Output fields:

- `listItemUri`: Membership URI
- `listItemCid`: Membership CID
- `listUri`: List URI
- `did`: Member DID

### `remove_user_from_list`

**Remove User from List.** Removes every membership of a Bluesky account (handle, DID or profile link) from a list owned by the connected account, given the list's link or AT-URI. Use to undo Add User to List. Idempotent: when the account is not on the list it changes nothing and returns removed=0. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list` | string | yes |  | List. The list link (https://bsky.app/profile/alice.bsky.social/lists/3k...) or its at:// URI. |
| `actor` | string | yes |  | Account. Handle (alice.bsky.social), DID or profile link of the account to remove. |

Output fields:

- `removed`: Memberships Removed (number)
- `listUri`: List URI
- `did`: Member DID

### `bluesky_create_post`

**Create Post (AI).** Publishes one new post from the connected Bluesky account: text up to 300 visible characters, with an optional reply target, quoted post, up to 4 image URLs with alt text, a link card, self-labels (sexual, nudity, porn, graphic-media), up to 3 language codes and up to 8 tags. Use for a single post or reply; use Delete Post to remove one. Not idempotent: each call creates a new post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. Post text, at most 300 visible characters. Links, @mentions and #hashtags become clickable. |
| `langs` | array | no |  | Languages. Up to 3 BCP-47 language codes, for example en or pt-BR. |
| `replyTo` | string | no |  | Reply To. Link or at:// URI of the post to reply to. |
| `quote` | string | no |  | Quote Post. Link or at:// URI of a post to quote. |
| `imageUrls` | array | no |  | Image URLs. Up to 4 public image URLs (PNG, JPEG, GIF or WebP, max 1 MB each). |
| `imageAlts` | array | no |  | Image Alt Texts. Alt text for each image, in the same order. |
| `linkUrl` | string | no |  | Link Card URL. A URL to show as a link preview card. Ignored when images are given. |
| `selfLabels` | array | no |  | Content Labels. One of `"sexual"`, `"nudity"`, `"porn"`, `"graphic-media"`. |
| `tags` | array | no |  | Tags. Up to 8 extra hashtags stored on the post without appearing in the text (without #). |

Output fields:

- `uri`: Post URI
- `cid`: CID
- `url`: Post Link (url)
- `isReply`: Is Reply (boolean)
- `quotedUri`: Quoted Post URI
- `createdAt`: Created At (datetime)

### `bluesky_like_post`

**Like Post (AI).** Likes a Bluesky post given its bsky.app link or AT-URI, and returns the existing like if the account already liked it. Use Unlike Post to undo. Idempotent: a repeat call does not create a second like. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post` | string | yes |  | Post. The post link (https://bsky.app/profile/alice.bsky.social/post/3k...) or its at:// URI. |

Output fields:

- `likeUri`: Like URI
- `postUri`: Post URI
- `postCid`: Post CID
- `postUrl`: Post Link (url)
- `alreadyLiked`: Already Liked (boolean)

### `bluesky_repost_post`

**Repost Post (AI).** Reposts a Bluesky post to the connected account given its bsky.app link or AT-URI, and returns the existing repost if it was already reposted. Use Undo Repost to undo; use Create Post with a quote to add a comment. Idempotent: a repeat call does not create a second repost. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post` | string | yes |  | Post. The post link (https://bsky.app/profile/alice.bsky.social/post/3k...) or its at:// URI. |

Output fields:

- `repostUri`: Repost URI
- `postUri`: Post URI
- `postCid`: Post CID
- `postUrl`: Post Link (url)
- `alreadyReposted`: Already Reposted (boolean)

### `bluesky_get_posts`

**Get Posts (AI).** Fetches up to 25 Bluesky posts in one call, given their bsky.app links or AT-URIs, with text, author and engagement counts; inputs that are deleted or hidden are listed in notFound. Use Find Thread for replies around a post. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `posts` | array | yes |  | Posts. Up to 25 post links or at:// URIs. |

Output fields:

- `posts`: Posts
- `posts[].text`: Text
- `posts[].url`: Post Link (url)
- `posts[].uri`: Post URI
- `posts[].cid`: CID
- `posts[].author`: Author
- `posts[].author.did`: Author DID
- `posts[].author.handle`: Handle
- `posts[].author.displayName`: Display Name
- `posts[].author.avatar`: Avatar (image)
- `posts[].record`: Post
- `posts[].record.text`: Text
- `posts[].record.createdAt`: Created At (datetime)
- `posts[].record.embed`: Embed
- `posts[].record.langs`: Languages
- `posts[].record.tags`: Tags
- `posts[].record.reply`: Reply Refs
- `posts[].indexedAt`: Indexed At (datetime)
- `posts[].replyCount`: Reply Count (number)
- `posts[].repostCount`: Repost Count (number)
- `posts[].likeCount`: Like Count (number)
- `posts[].quoteCount`: Quote Count (number)
- `posts[].embed`: Embed
- `posts[].labels`: Labels
- `posts[].viewer`: Viewer State
- `notFound`: Not Found

### `bluesky_resolve_handle`

**Resolve Handle (AI).** Resolves a Bluesky handle (or profile link) to the account's permanent DID, which stays the same when the handle changes. Use Get Profile when you also need the name, bio or counts. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `handle` | string | yes |  | Handle. For example alice.bsky.social, @alice or https://bsky.app/profile/alice.bsky.social. |

Output fields:

- `handle`: Handle
- `did`: DID

### `bluesky_get_unread_count`

**Get Unread Notification Count (AI).** Returns how many notifications of the connected Bluesky account are unread. Use List Notifications to read them and Mark Notifications as Seen to reset the count. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `count`: Unread Notifications (number)
- `checkedAt`: Checked At (datetime)

### `custom_api_call`

**Custom API Call.** Make a custom XRPC call to your Bluesky PDS, for example /app.bsky.actor.getProfile?actor=bsky.app. Needs authentication.

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

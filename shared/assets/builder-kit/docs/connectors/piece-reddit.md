# Reddit

Interact with Reddit - fetch and submit posts.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-reddit'
  version: '0.4.0'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> To obtain your Reddit API credentials:
>
> 1. Go to https://www.reddit.com/prefs/apps.
> 2. Click "create another app..." at the bottom.
> 3. Select "script" as the app type.
> 4. Fill in the required information:
> - name: Your app name
> - description: Brief description
> - about url: Can be left blank
> - redirect uri: as shown in Redirect URL field
> 5. Click "create app".
> 6. Note down the client ID (under the app name) and client secret.

## Actions

### `retrieveRedditPost`

**Retrieve Post.** Lists posts from a given subreddit, choosing the listing via a category (hot, new, top, rising, or controversial). Use it to read or monitor a subreddit's feed rather than to look up one known post. Requires the subreddit name; an optional size caps how many posts are returned (max 100). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_category` | string | yes | `"hot"` | Post Category. Select the category of posts to retrieve. One of `"hot"`, `"new"`, `"top"`, `"rising"`, `"controversial"`. |
| `subreddit` | string | yes |  | Subreddit. The subreddit to fetch posts from. |
| `size` | number | no | `10` | Number of Posts. Number of posts to fetch (max 100) |

Output fields:

- `kind`: Kind
- `data`: Listing
- `data.after`: Next Page Cursor
- `data.before`: Previous Page Cursor
- `data.dist`: Count (number)
- `data.children`: Posts
- `data.children[].kind`: Kind
- `data.children[].data`: Post
- `data.children[].data.id`: Post ID
- `data.children[].data.name`: Fullname
- `data.children[].data.title`: Title
- `data.children[].data.author`: Author
- `data.children[].data.subreddit`: Subreddit
- `data.children[].data.selftext`: Body Text
- `data.children[].data.selftext_html`: Body HTML (html)
- `data.children[].data.url`: URL (url)
- `data.children[].data.permalink`: Permalink
- `data.children[].data.domain`: Domain
- `data.children[].data.score`: Score (number)
- `data.children[].data.upvote_ratio`: Upvote Ratio (number)
- `data.children[].data.num_comments`: Comment Count (number)
- `data.children[].data.created_utc`: Created At (Unix Seconds) (number)
- `data.children[].data.is_self`: Is Text Post (boolean)
- `data.children[].data.is_video`: Is Video (boolean)
- `data.children[].data.over_18`: NSFW (boolean)
- `data.children[].data.spoiler`: Spoiler (boolean)
- `data.children[].data.locked`: Locked (boolean)
- `data.children[].data.stickied`: Stickied (boolean)
- `data.children[].data.link_flair_text`: Flair Text

### `getRedditPostDetails`

**Get Post Details.** Looks up one specific Reddit post by its ID and returns its full metadata (title, author, body, score, counts, flags). Use it when you already have a post ID and need details for that single post, not to browse a subreddit. Accepts the ID with or without the t3_ prefix. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Post ID. The ID of the Reddit post (e.g. "t3_abc123" or "abc123") |

Output fields:

- `id`: Post ID
- `title`: Title
- `author`: Author
- `author_fullname`: Author Fullname
- `subreddit`: Subreddit
- `subreddit_id`: Subreddit Fullname
- `selftext`: Body Text
- `selftext_html`: Body HTML (html)
- `score`: Score (number)
- `upvote_ratio`: Upvote Ratio (number)
- `created_utc`: Created At (Unix Seconds) (number)
- `permalink`: Permalink
- `url`: URL (url)
- `domain`: Domain
- `num_comments`: Comment Count (number)
- `is_self`: Is Text Post (boolean)
- `is_video`: Is Video (boolean)
- `is_original_content`: Original Content (boolean)
- `over_18`: NSFW (boolean)
- `spoiler`: Spoiler (boolean)
- `locked`: Locked (boolean)
- `stickied`: Stickied (boolean)

### `createRedditPost`

**Create Post.** Submits a new self (text) post to a subreddit on behalf of the authenticated account. Use it to publish original text content; it cannot post links, images, or media. Requires the target subreddit, a title, and the text body. Not idempotent — each call creates a separate post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subreddit` | string | yes |  | Subreddit. The subreddit to post in (without r/). |
| `title` | string | yes |  | Title. Title of the Reddit post. |
| `content` | string | yes |  | Content. Text content of the post. |

Output fields:

- `json`: Response
- `json.errors`: Errors
- `json.data`: Data
- `json.data.id`: Post ID
- `json.data.name`: Fullname
- `json.data.url`: URL (url)

### `createRedditComment`

**Create Comment.** Posts a comment from the authenticated account, either as a top-level reply to a post or as a nested reply to another comment, determined by the parent ID type (t3_ for a post, t1_ for a comment). Requires the parent ID and the comment text. Not idempotent — each call creates a separate comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent_id` | string | yes |  | Parent ID. ID of the post (t3_*) or comment (t1_*) to reply to. |
| `content` | string | yes |  | Comment Text. Text of the comment. |

Output fields:

- `json`: Response
- `json.errors`: Errors
- `json.data`: Data
- `json.data.things`: Things
- `json.data.things[].kind`: Kind
- `json.data.things[].data`: Data
- `json.data.things[].data.id`: Comment ID
- `json.data.things[].data.name`: Fullname
- `json.data.things[].data.author`: Author
- `json.data.things[].data.body`: Body
- `json.data.things[].data.body_html`: Body HTML (html)
- `json.data.things[].data.parent_id`: Parent Fullname
- `json.data.things[].data.link_id`: Post Fullname
- `json.data.things[].data.subreddit`: Subreddit
- `json.data.things[].data.permalink`: Permalink
- `json.data.things[].data.score`: Score (number)
- `json.data.things[].data.created_utc`: Created At (Unix Seconds) (number)

### `fetchPostComments`

**Fetch Post Comments.** Retrieves the threaded comments of one Reddit post identified by its ID, including nested replies. Use it to read discussion on a known post; the sort option (new, top, hot, best, old, controversial) and a limit on top-level comments are configurable. Accepts the post ID with or without the t3_ prefix. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Post ID. The ID of the Reddit post (e.g. "abc123" or "t3_abc123"). |
| `sort` | string | no | `"new"` | Sort By. Sorting method for comments. One of `"new"`, `"top"`, `"hot"`, `"best"`, `"old"`, `"controversial"`. |
| `limit` | number | no | `10` | Limit. Maximum number of top-level comments to fetch. |

Output fields:

- `[].id`: Comment ID
- `[].author`: Author
- `[].body`: Body
- `[].score`: Score (number)
- `[].created_utc`: Created At (Unix Seconds) (number)
- `[].permalink`: Permalink
- `[].edited`: Edited
- `[].is_submitter`: Is Post Author (boolean)
- `[].stickied`: Stickied (boolean)
- `[].replies`: Replies

### `editRedditPost`

**Edit Post.** Replaces the text body of an existing self post owned by the authenticated account, identified by post ID. Use it to update a post you previously created; it only edits text posts, not link or media posts. Requires the post ID (with or without the t3_ prefix) and the new content. Idempotent — repeating with the same content leaves the post in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Post ID. ID of the Reddit post to edit (e.g., "abc123" or "t3_abc123"). |
| `content` | string | yes |  | New Post Content. Updated text content for the post. |

Output fields:

- `json`: Response
- `json.errors`: Errors
- `json.data`: Data
- `json.data.things`: Things
- `json.data.things[].kind`: Kind
- `json.data.things[].data`: Data
- `json.data.things[].data.id`: Post ID
- `json.data.things[].data.name`: Fullname
- `json.data.things[].data.title`: Title
- `json.data.things[].data.author`: Author
- `json.data.things[].data.subreddit`: Subreddit
- `json.data.things[].data.selftext`: Body Text
- `json.data.things[].data.selftext_html`: Body HTML (html)
- `json.data.things[].data.url`: URL (url)
- `json.data.things[].data.permalink`: Permalink
- `json.data.things[].data.domain`: Domain
- `json.data.things[].data.score`: Score (number)
- `json.data.things[].data.upvote_ratio`: Upvote Ratio (number)
- `json.data.things[].data.num_comments`: Comment Count (number)
- `json.data.things[].data.created_utc`: Created At (Unix Seconds) (number)
- `json.data.things[].data.is_self`: Is Text Post (boolean)
- `json.data.things[].data.is_video`: Is Video (boolean)
- `json.data.things[].data.over_18`: NSFW (boolean)
- `json.data.things[].data.spoiler`: Spoiler (boolean)
- `json.data.things[].data.locked`: Locked (boolean)
- `json.data.things[].data.stickied`: Stickied (boolean)
- `json.data.things[].data.link_flair_text`: Flair Text

### `editRedditComment`

**Edit Comment.** Replaces the text of an existing comment owned by the authenticated account, identified by comment ID. Use it to update a comment you previously posted. Requires the comment ID (with or without the t1_ prefix) and the new content. Idempotent — repeating with the same content leaves the comment in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | string | yes |  | Comment ID. ID of the Reddit comment to edit (e.g., "def456" or "t1_def456"). |
| `content` | string | yes |  | New Comment Content. Updated text content for the comment. |

Output fields:

- `json`: Response
- `json.errors`: Errors
- `json.data`: Data
- `json.data.things`: Things
- `json.data.things[].kind`: Kind
- `json.data.things[].data`: Data
- `json.data.things[].data.id`: Comment ID
- `json.data.things[].data.name`: Fullname
- `json.data.things[].data.author`: Author
- `json.data.things[].data.body`: Body
- `json.data.things[].data.body_html`: Body HTML (html)
- `json.data.things[].data.parent_id`: Parent Fullname
- `json.data.things[].data.link_id`: Post Fullname
- `json.data.things[].data.subreddit`: Subreddit
- `json.data.things[].data.permalink`: Permalink
- `json.data.things[].data.score`: Score (number)
- `json.data.things[].data.created_utc`: Created At (Unix Seconds) (number)

### `deleteRedditPost`

**Delete Post.** Deletes a post owned by the authenticated account, identified by post ID. Use it to permanently remove a post you previously created. Requires the post ID (with or without the t3_ prefix). Idempotent — once deleted, repeating the call leaves the same end state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Post ID. ID of the Reddit post to delete (e.g., "abc123" or "t3_abc123"). |

Output fields:

- `success`: Success (boolean)
- `response`: Response

### `deleteRedditComment`

**Delete Comment.** Deletes a comment owned by the authenticated account, identified by comment ID. Use it to permanently remove a comment you previously posted. Requires the comment ID (with or without the t1_ prefix). Idempotent — once deleted, repeating the call leaves the same end state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | string | yes |  | Comment ID. ID of the Reddit comment to delete (e.g., "def456" or "t1_def456"). |

Output fields:

- `success`: Success (boolean)
- `response`: Response

### `reddit_create_comment`

**Create Comment.** Posts a reply: to a post (t3_ parent), a comment (t1_ parent) or a private message (t4_ parent). The parent id must carry its type prefix; it is the `name` field of the item. Fails on locked or archived threads. Not idempotent: every call posts a new reply. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parent_id` | string | yes |  | Parent Fullname. Fullname to reply to, e.g. "t3_abc123", "t1_def456" or "t4_ghi789". |
| `text` | string | yes |  | Text. Markdown body of the reply. |

Output fields:

- `kind`: Kind
- `id`: Comment ID
- `name`: Fullname
- `author`: Author
- `score`: Score (number)
- `created_utc`: Created At (Unix Seconds) (number)
- `edited`: Edited
- `permalink`: Permalink
- `subreddit`: Subreddit
- `stickied`: Stickied (boolean)
- `body`: Body
- `parent_id`: Parent Fullname
- `link_id`: Post Fullname
- `link_title`: Post Title
- `depth`: Depth (number)
- `is_submitter`: Is Post Author (boolean)
- `distinguished`: Distinguished

### `reddit_create_post`

**Create Post.** Publishes a new post to a subreddit: a text post when Text is given, a link post when URL is given (not both). Publishes immediately and publicly. Check Get Post Requirements first for required flair or title rules; Flair ID comes from List Post Flairs. Not idempotent: every call creates a new post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subreddit` | string | yes |  | Subreddit. Subreddit name without the r/ prefix (e.g. "programming"). |
| `title` | string | yes |  | Title. Post title (max 300 characters). |
| `text` | string | no |  | Text. Markdown body for a text post. Leave empty for a link post. |
| `url` | string | no |  | URL. Link for a link post. Leave empty for a text post. |
| `flair_id` | string | no |  | Flair ID. Flair template id from List Post Flairs. |
| `flair_text` | string | no |  | Flair Text. Custom flair text, when the flair template allows editing. |
| `nsfw` | string | no |  | NSFW. Mark the post as not safe for work. One of `"true"`, `"false"`. |
| `spoiler` | string | no |  | Spoiler. Mark the post as a spoiler. One of `"true"`, `"false"`. |
| `send_replies` | string | no |  | Send Replies to Inbox. Receive inbox notifications for replies (Reddit default: yes). One of `"true"`, `"false"`. |

Output fields:

- `id`: Post ID
- `name`: Fullname
- `url`: URL (url)

### `reddit_crosspost`

**Crosspost.** Crossposts an existing post into another subreddit under a new title, linking back to the original. The target subreddit must allow crossposts. Post ID comes from List Posts or Search Posts. Not idempotent: every call creates a new post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Original Post ID. Post to crosspost, e.g. "abc123" or "t3_abc123". |
| `subreddit` | string | yes |  | Subreddit. Target subreddit without r/. |
| `title` | string | yes |  | Title. Title for the crosspost (max 300 characters). |
| `flair_id` | string | no |  | Flair ID. Flair template id from List Post Flairs for the target subreddit. |
| `nsfw` | string | no |  | NSFW. Mark the crosspost as not safe for work. One of `"true"`, `"false"`. |
| `spoiler` | string | no |  | Spoiler. Mark the crosspost as a spoiler. One of `"true"`, `"false"`. |

Output fields:

- `id`: Post ID
- `name`: Fullname
- `url`: URL (url)

### `reddit_delete_comment`

**Delete Comment.** Permanently deletes a comment you authored; this cannot be undone. Accepts the comment id with or without the t1_ prefix. Reddit reports success even when the comment is not yours or already deleted. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `comment_id` | string | yes |  | Comment ID. Comment id, e.g. "def456" or "t1_def456". |

Output fields:

- `success`: Success (boolean)
- `id`: Fullname

### `reddit_delete_message`

**Delete Message.** Deletes a received private message from your inbox; the other party keeps their copy. Accepts the message id with or without the t4_ prefix, from List Messages. Cannot be undone. Needs the `privatemessages` scope: older connections must reconnect. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message ID. Message id, e.g. "abc123" or "t4_abc123". |

Output fields:

- `success`: Success (boolean)
- `id`: Fullname

### `reddit_delete_post`

**Delete Post.** Permanently deletes a post you authored; this cannot be undone. Accepts the post id with or without the t3_ prefix. Reddit reports success even when the post is not yours or already deleted, so confirm with Get Posts or Comments by ID if it matters. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Post ID. Post id, e.g. "abc123" or "t3_abc123". |

Output fields:

- `success`: Success (boolean)
- `id`: Fullname

### `reddit_edit_text`

**Edit Post or Comment Text.** Replaces the full markdown body of a text post (t3_) or comment (t1_) you authored. Titles and link posts cannot be edited. The id must carry its type prefix; the `name` field of a post or comment is its fullname. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `thing_id` | string | yes |  | Fullname. Fullname of your post or comment, e.g. "t3_abc123" or "t1_def456". |
| `text` | string | yes |  | New Text. New markdown body; replaces the existing text. |

Output fields:

- `kind`: Kind
- `id`: Post ID
- `name`: Fullname
- `title`: Title
- `author`: Author
- `subreddit`: Subreddit
- `subreddit_name_prefixed`: Subreddit (Prefixed)
- `selftext`: Body Text
- `url`: URL (url)
- `permalink`: Permalink
- `domain`: Domain
- `score`: Score (number)
- `upvote_ratio`: Upvote Ratio (number)
- `num_comments`: Comment Count (number)
- `num_crossposts`: Crosspost Count (number)
- `created_utc`: Created At (Unix Seconds) (number)
- `edited`: Edited
- `is_self`: Is Text Post (boolean)
- `over_18`: NSFW (boolean)
- `spoiler`: Spoiler (boolean)
- `stickied`: Stickied (boolean)
- `locked`: Locked (boolean)
- `archived`: Archived (boolean)
- `link_flair_text`: Flair Text
- `link_flair_template_id`: Flair Template ID
- `crosspost_parent`: Crosspost Parent
- `body`: Body
- `parent_id`: Parent Fullname
- `link_id`: Post Fullname
- `link_title`: Post Title
- `depth`: Depth (number)
- `is_submitter`: Is Post Author (boolean)
- `distinguished`: Distinguished

### `reddit_expand_more_comments`

**Expand More Comments.** Loads the comments behind a `more` placeholder returned by List Post Comments: pass the post id and the placeholder's `children` ids (up to 100). Returns the loaded comments flat, plus any further `more` placeholders. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Post ID. Post id, e.g. "abc123" or "t3_abc123". |
| `children` | string | yes |  | Comment IDs. Comma-separated ids from a `more` placeholder's `children`. |
| `sort` | string | no |  | Sort. Comment sort order (default best). One of `"confidence"`, `"top"`, `"new"`, `"controversial"`, `"old"`, `"qa"`. |

Output fields:

- `comments`: Comments
- `comments[].kind`: Kind
- `comments[].id`: Comment ID
- `comments[].name`: Fullname
- `comments[].author`: Author
- `comments[].score`: Score (number)
- `comments[].created_utc`: Created At (Unix Seconds) (number)
- `comments[].edited`: Edited
- `comments[].permalink`: Permalink
- `comments[].subreddit`: Subreddit
- `comments[].stickied`: Stickied (boolean)
- `comments[].body`: Body
- `comments[].parent_id`: Parent Fullname
- `comments[].link_id`: Post Fullname
- `comments[].link_title`: Post Title
- `comments[].depth`: Depth (number)
- `comments[].is_submitter`: Is Post Author (boolean)
- `comments[].distinguished`: Distinguished
- `count`: Count (number)
- `more`: More Placeholders

### `reddit_get_content`

**Get Posts or Comments by ID.** Fetches posts (t3_), comments (t1_) or subreddits (t5_) by fullname, up to 100 at once, without the surrounding thread. Ids must carry their type prefix; the `name` field of any listed item is its fullname. Use List Post Comments to read a whole discussion. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ids` | string | yes |  | Fullnames. Comma-separated fullnames, e.g. "t3_abc123,t1_def456". |

Output fields:

- `items`: Items
- `items[].kind`: Kind
- `items[].id`: Post ID
- `items[].name`: Fullname
- `items[].title`: Title
- `items[].author`: Author
- `items[].subreddit`: Subreddit
- `items[].subreddit_name_prefixed`: Subreddit (Prefixed)
- `items[].selftext`: Body Text
- `items[].url`: URL (url)
- `items[].permalink`: Permalink
- `items[].domain`: Domain
- `items[].score`: Score (number)
- `items[].upvote_ratio`: Upvote Ratio (number)
- `items[].num_comments`: Comment Count (number)
- `items[].num_crossposts`: Crosspost Count (number)
- `items[].created_utc`: Created At (Unix Seconds) (number)
- `items[].edited`: Edited
- `items[].is_self`: Is Text Post (boolean)
- `items[].over_18`: NSFW (boolean)
- `items[].spoiler`: Spoiler (boolean)
- `items[].stickied`: Stickied (boolean)
- `items[].locked`: Locked (boolean)
- `items[].archived`: Archived (boolean)
- `items[].link_flair_text`: Flair Text
- `items[].link_flair_template_id`: Flair Template ID
- `items[].crosspost_parent`: Crosspost Parent
- `items[].body`: Body
- `items[].parent_id`: Parent Fullname
- `items[].link_id`: Post Fullname
- `items[].link_title`: Post Title
- `items[].depth`: Depth (number)
- `items[].is_submitter`: Is Post Author (boolean)
- `items[].distinguished`: Distinguished
- `items[].display_name`: Subreddit Name
- `items[].public_description`: Subreddit Description
- `items[].subscribers`: Subscribers (number)
- `items[].subreddit_type`: Subreddit Type
- `count`: Count (number)

### `reddit_get_me`

**Get My Account.** Returns the connected account's profile: username (`name`), id, karma, account age, verification and unread inbox count. Use it to learn which username the agent acts as, e.g. before List User Content on yourself. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: User ID
- `name`: Username
- `link_karma`: Post Karma (number)
- `comment_karma`: Comment Karma (number)
- `total_karma`: Total Karma (number)
- `created_utc`: Created At (Unix Seconds) (number)
- `is_gold`: Premium (boolean)
- `is_mod`: Is Moderator (boolean)
- `verified`: Verified (boolean)
- `has_verified_email`: Verified Email (boolean)
- `is_employee`: Reddit Employee (boolean)
- `icon_img`: Avatar (image)
- `inbox_count`: Unread Inbox Count (number)
- `has_mail`: Has Unread Mail (boolean)
- `over_18`: NSFW Enabled (boolean)

### `reddit_get_my_karma`

**Get My Karma by Subreddit.** Returns the connected account's post and comment karma per subreddit, useful for checking eligibility in subreddits with karma thresholds. Needs the `mysubreddits` scope: older connections must reconnect. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `karma`: Karma by Subreddit
- `karma[].subreddit`: Subreddit
- `karma[].link_karma`: Post Karma (number)
- `karma[].comment_karma`: Comment Karma (number)
- `count`: Count (number)

### `reddit_get_my_preferences`

**Get My Preferences.** Returns the connected account's settings as one object: language, NSFW visibility, default comment sort, inbox and email notification switches, who can message you, and similar preferences. Read-only. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `accept_pms`: Accept Messages From
- `country_code`: Country Code
- `lang`: Language
- `over_18`: NSFW Enabled (boolean)
- `search_include_over_18`: NSFW in Search (boolean)
- `label_nsfw`: Label NSFW (boolean)
- `default_comment_sort`: Default Comment Sort
- `min_comment_score`: Min Comment Score (number)
- `min_link_score`: Min Post Score (number)
- `num_comments`: Comments per Page (number)
- `media`: Media Display
- `media_preview`: Media Preview
- `video_autoplay`: Video Autoplay (boolean)
- `nightmode`: Night Mode (boolean)
- `enable_followers`: Followers Enabled (boolean)
- `show_presence`: Show Online Status (boolean)
- `hide_from_robots`: Hidden From Search Engines (boolean)
- `public_votes`: Public Votes (boolean)
- `profile_opt_out`: Profile Opt Out (boolean)
- `threaded_messages`: Threaded Messages (boolean)
- `email_messages`: Email on Messages (boolean)
- `email_private_message`: Email on Private Message (boolean)
- `email_digests`: Email Digests (boolean)

### `reddit_get_post_requirements`

**Get Post Requirements.** Returns the machine-checked requirements for posting in a subreddit: title length and required or banned words, body rules, whether flair is required, banned and allowed domains, and link repost rules. Call before Create Post to avoid rejected submissions. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subreddit` | string | yes |  | Subreddit. Subreddit name without the r/ prefix (e.g. "programming"). |

Output fields:

- `is_flair_required`: Flair Required (boolean)
- `title_text_min_length`: Title Min Length (number)
- `title_text_max_length`: Title Max Length (number)
- `title_required_strings`: Title Required Strings
- `title_blacklisted_strings`: Title Banned Strings
- `title_regexes`: Title Regexes
- `body_restriction_policy`: Body Policy
- `body_text_min_length`: Body Min Length (number)
- `body_text_max_length`: Body Max Length (number)
- `body_required_strings`: Body Required Strings
- `body_blacklisted_strings`: Body Banned Strings
- `body_regexes`: Body Regexes
- `link_restriction_policy`: Link Policy
- `domain_whitelist`: Allowed Domains
- `domain_blacklist`: Banned Domains
- `link_repost_age`: Repost Age (Days) (number)
- `gallery_min_items`: Gallery Min Items (number)
- `gallery_max_items`: Gallery Max Items (number)
- `gallery_captions_requirement`: Gallery Captions
- `gallery_urls_requirement`: Gallery URLs
- `guidelines_text`: Guidelines
- `guidelines_display_policy`: Guidelines Display Policy

### `reddit_get_submit_text`

**Get Submission Guidelines.** Returns the free-text submission guidelines moderators show on a subreddit's submit page (often empty). Complements Get Subreddit Rules and Get Post Requirements, which hold the structured rules. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subreddit` | string | yes |  | Subreddit. Subreddit name without the r/ prefix (e.g. "programming"). |

Output fields:

- `subreddit`: Subreddit
- `submit_text`: Submission Guidelines
- `submit_text_html`: Submission Guidelines HTML (html)

### `reddit_get_subreddit_rules`

**Get Subreddit Rules.** Returns a subreddit's rules in priority order (short name, description, and whether each applies to posts, comments or both), plus Reddit's site-wide rules. Check before posting or commenting; rule short names are also valid report reasons. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subreddit` | string | yes |  | Subreddit. Subreddit name without the r/ prefix (e.g. "programming"). |

Output fields:

- `rules`: Rules
- `rules[].short_name`: Rule
- `rules[].description`: Description
- `rules[].kind`: Applies To
- `rules[].priority`: Priority (number)
- `rules[].violation_reason`: Report Reason
- `rules[].created_utc`: Created At (Unix Seconds) (number)
- `count`: Count (number)
- `site_rules`: Site-wide Rules

### `reddit_get_subreddit`

**Get Subreddit.** Returns one subreddit's profile: title, public description, subscriber and active counts, type (public/restricted/private), allowed submission types, NSFW flag, and whether you are subscribed or a moderator. Use Get Subreddit Rules and Get Post Requirements before posting. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subreddit` | string | yes |  | Subreddit. Subreddit name without the r/ prefix (e.g. "programming"). |

Output fields:

- `kind`: Kind
- `id`: Subreddit ID
- `name`: Fullname
- `display_name`: Name
- `display_name_prefixed`: Name (Prefixed)
- `title`: Title
- `public_description`: Public Description
- `subscribers`: Subscribers (number)
- `active_user_count`: Active Users (number)
- `subreddit_type`: Type
- `submission_type`: Allowed Submissions
- `over18`: NSFW (boolean)
- `lang`: Language
- `created_utc`: Created At (Unix Seconds) (number)
- `url`: Path
- `user_is_subscriber`: Subscribed (boolean)
- `user_is_moderator`: Moderator (boolean)

### `reddit_get_user_trophies`

**Get User Trophies.** Lists a user's profile trophies (e.g. account-age milestones, Verified Email), with name, description and grant time. Works for your own username too. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Username. Reddit username without the u/ prefix. |

Output fields:

- `trophies`: Trophies
- `trophies[].id`: Trophy ID
- `trophies[].name`: Name
- `trophies[].description`: Description
- `trophies[].award_id`: Award ID
- `trophies[].granted_at`: Granted At (Unix Seconds) (number)
- `trophies[].url`: URL (url)
- `trophies[].icon_70`: Icon (image)
- `count`: Count (number)

### `reddit_get_user`

**Get User.** Returns a user's public profile: id, karma (post, comment, total), account creation time, and premium, moderator and verified flags. Fails with 404 for deleted or suspended accounts. Use List User Content for their posts and comments. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Username. Reddit username without the u/ prefix. |

Output fields:

- `kind`: Kind
- `id`: User ID
- `name`: Username
- `link_karma`: Post Karma (number)
- `comment_karma`: Comment Karma (number)
- `total_karma`: Total Karma (number)
- `created_utc`: Created At (Unix Seconds) (number)
- `is_gold`: Premium (boolean)
- `is_mod`: Is Moderator (boolean)
- `verified`: Verified (boolean)
- `has_verified_email`: Verified Email (boolean)
- `is_employee`: Reddit Employee (boolean)
- `icon_img`: Avatar (image)

### `reddit_get_wiki_page`

**Get Wiki Page.** Returns a subreddit wiki page's markdown content and its latest revision (author, date, id). Page names come from List Wiki Pages; nested pages use slashes (e.g. "config/sidebar"). Needs the `wikiread` scope: older connections must reconnect. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subreddit` | string | yes |  | Subreddit. Subreddit name without the r/ prefix (e.g. "programming"). |
| `page` | string | yes |  | Page. Wiki page name, e.g. "index" or "faq". |

Output fields:

- `subreddit`: Subreddit
- `page`: Page
- `content_md`: Content (Markdown)
- `revision_id`: Revision ID
- `revision_date`: Revised At (Unix Seconds) (number)
- `revision_by`: Revised By
- `may_revise`: Can Edit (boolean)

### `reddit_hide_post`

**Hide Posts.** Hides posts from your own front page and subreddit listings; nobody else is affected and Unhide Posts reverses it. Accepts comma-separated post ids with or without t3_. Needs the `report` scope: older connections must reconnect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_ids` | string | yes |  | Post IDs. Comma-separated post ids, e.g. "abc123,t3_def456". |

Output fields:

- `success`: Success (boolean)
- `ids`: Fullnames
- `hidden`: Hidden (boolean)

### `reddit_list_duplicates`

**List Duplicates and Crossposts.** Lists where else a post was shared: other submissions of the same link and crossposts of it. Set Crossposts Only to Yes for crossposts alone. Pages with the returned `after` cursor. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Post ID. Post id, e.g. "abc123" or "t3_abc123". |
| `crossposts_only` | string | no |  | Crossposts Only. Only return crossposts of this post. One of `"true"`, `"false"`. |
| `sort` | string | no |  | Sort. Sort order (default most comments). One of `"num_comments"`, `"new"`. |
| `limit` | number | no |  | Limit. Maximum number of items to return (1-100, default 25). |
| `after` | string | no |  | After. Pagination cursor: pass the `after` value from the previous response to get the next page. |

Output fields:

- `post`: Original Post
- `post.kind`: Kind
- `post.id`: Post ID
- `post.name`: Fullname
- `post.title`: Title
- `post.author`: Author
- `post.subreddit`: Subreddit
- `post.subreddit_name_prefixed`: Subreddit (Prefixed)
- `post.selftext`: Body Text
- `post.url`: URL (url)
- `post.permalink`: Permalink
- `post.domain`: Domain
- `post.score`: Score (number)
- `post.upvote_ratio`: Upvote Ratio (number)
- `post.num_comments`: Comment Count (number)
- `post.num_crossposts`: Crosspost Count (number)
- `post.created_utc`: Created At (Unix Seconds) (number)
- `post.edited`: Edited
- `post.is_self`: Is Text Post (boolean)
- `post.over_18`: NSFW (boolean)
- `post.spoiler`: Spoiler (boolean)
- `post.stickied`: Stickied (boolean)
- `post.locked`: Locked (boolean)
- `post.archived`: Archived (boolean)
- `post.link_flair_text`: Flair Text
- `post.link_flair_template_id`: Flair Template ID
- `post.crosspost_parent`: Crosspost Parent
- `duplicates`: Duplicates
- `duplicates[].kind`: Kind
- `duplicates[].id`: Post ID
- `duplicates[].name`: Fullname
- `duplicates[].title`: Title
- `duplicates[].author`: Author
- `duplicates[].subreddit`: Subreddit
- `duplicates[].subreddit_name_prefixed`: Subreddit (Prefixed)
- `duplicates[].selftext`: Body Text
- `duplicates[].url`: URL (url)
- `duplicates[].permalink`: Permalink
- `duplicates[].domain`: Domain
- `duplicates[].score`: Score (number)
- `duplicates[].upvote_ratio`: Upvote Ratio (number)
- `duplicates[].num_comments`: Comment Count (number)
- `duplicates[].num_crossposts`: Crosspost Count (number)
- `duplicates[].created_utc`: Created At (Unix Seconds) (number)
- `duplicates[].edited`: Edited
- `duplicates[].is_self`: Is Text Post (boolean)
- `duplicates[].over_18`: NSFW (boolean)
- `duplicates[].spoiler`: Spoiler (boolean)
- `duplicates[].stickied`: Stickied (boolean)
- `duplicates[].locked`: Locked (boolean)
- `duplicates[].archived`: Archived (boolean)
- `duplicates[].link_flair_text`: Flair Text
- `duplicates[].link_flair_template_id`: Flair Template ID
- `duplicates[].crosspost_parent`: Crosspost Parent
- `count`: Count (number)
- `after`: Next Page Cursor
- `before`: Previous Page Cursor

### `reddit_list_messages`

**List Messages.** Lists items from one inbox folder: everything (inbox), unread, sent, private messages only, comment replies, post replies (selfreply) or username mentions. Items are messages (t4_) or comments (t1_); `new` is true when unread. Listing does not mark items read; use Mark Messages Read. Needs the `privatemessages` scope: older connections must reconnect. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folder` | string | no |  | Folder. Inbox folder (default inbox). One of `"inbox"`, `"unread"`, `"sent"`, `"messages"`, `"comments"`, `"selfreply"`, `"mentions"`. |
| `limit` | number | no |  | Limit. Maximum number of items to return (1-100, default 25). |
| `after` | string | no |  | After. Pagination cursor: pass the `after` value from the previous response to get the next page. |

Output fields:

- `messages`: Messages
- `messages[].kind`: Kind
- `messages[].id`: Message ID
- `messages[].name`: Fullname
- `messages[].author`: From
- `messages[].dest`: To
- `messages[].subject`: Subject
- `messages[].body`: Body
- `messages[].created_utc`: Created At (Unix Seconds) (number)
- `messages[].new`: Unread (boolean)
- `messages[].was_comment`: Is Comment Reply (boolean)
- `messages[].parent_id`: Parent Fullname
- `messages[].first_message_name`: Thread Fullname
- `messages[].context`: Context Path
- `messages[].subreddit`: Subreddit
- `messages[].distinguished`: Distinguished
- `count`: Count (number)
- `after`: Next Page Cursor
- `before`: Previous Page Cursor

### `reddit_list_my_subreddits`

**List My Subreddits.** Lists subreddits tied to your account: the ones you joined (subscriber), moderate, or are an approved contributor in. Pages with the returned `after` cursor. Needs the `mysubreddits` scope: older connections must reconnect. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `where` | string | no |  | Relationship. Which subreddits to list (default subscriber). One of `"subscriber"`, `"moderator"`, `"contributor"`. |
| `limit` | number | no |  | Limit. Maximum number of items to return (1-100, default 25). |
| `after` | string | no |  | After. Pagination cursor: pass the `after` value from the previous response to get the next page. |

Output fields:

- `subreddits`: Subreddits
- `subreddits[].kind`: Kind
- `subreddits[].id`: Subreddit ID
- `subreddits[].name`: Fullname
- `subreddits[].display_name`: Name
- `subreddits[].display_name_prefixed`: Name (Prefixed)
- `subreddits[].title`: Title
- `subreddits[].public_description`: Public Description
- `subreddits[].subscribers`: Subscribers (number)
- `subreddits[].active_user_count`: Active Users (number)
- `subreddits[].subreddit_type`: Type
- `subreddits[].submission_type`: Allowed Submissions
- `subreddits[].over18`: NSFW (boolean)
- `subreddits[].lang`: Language
- `subreddits[].created_utc`: Created At (Unix Seconds) (number)
- `subreddits[].url`: Path
- `subreddits[].user_is_subscriber`: Subscribed (boolean)
- `subreddits[].user_is_moderator`: Moderator (boolean)
- `count`: Count (number)
- `after`: Next Page Cursor
- `before`: Previous Page Cursor

### `reddit_list_post_comments`

**List Post Comments.** Returns a post and its comments as a flat list, each with `depth` and `parent_id` to rebuild the thread. Large threads are truncated: `more` lists placeholders whose `children` ids can be loaded with Expand More Comments. Accepts the post id with or without t3_. Pass Comment ID to focus on one comment's subthread. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_id` | string | yes |  | Post ID. Post id, e.g. "abc123" or "t3_abc123". |
| `sort` | string | no |  | Sort. Comment sort order (default best). One of `"confidence"`, `"top"`, `"new"`, `"controversial"`, `"old"`, `"qa"`. |
| `comment_id` | string | no |  | Comment ID. Only return this comment and its replies (id without t1_). |
| `depth` | number | no |  | Depth. Maximum reply depth to include. |
| `limit` | number | no |  | Limit. Maximum number of comments to load. |

Output fields:

- `post`: Post
- `post.kind`: Kind
- `post.id`: Post ID
- `post.name`: Fullname
- `post.title`: Title
- `post.author`: Author
- `post.subreddit`: Subreddit
- `post.subreddit_name_prefixed`: Subreddit (Prefixed)
- `post.selftext`: Body Text
- `post.url`: URL (url)
- `post.permalink`: Permalink
- `post.domain`: Domain
- `post.score`: Score (number)
- `post.upvote_ratio`: Upvote Ratio (number)
- `post.num_comments`: Comment Count (number)
- `post.num_crossposts`: Crosspost Count (number)
- `post.created_utc`: Created At (Unix Seconds) (number)
- `post.edited`: Edited
- `post.is_self`: Is Text Post (boolean)
- `post.over_18`: NSFW (boolean)
- `post.spoiler`: Spoiler (boolean)
- `post.stickied`: Stickied (boolean)
- `post.locked`: Locked (boolean)
- `post.archived`: Archived (boolean)
- `post.link_flair_text`: Flair Text
- `post.link_flair_template_id`: Flair Template ID
- `post.crosspost_parent`: Crosspost Parent
- `comments`: Comments
- `comments[].kind`: Kind
- `comments[].id`: Comment ID
- `comments[].name`: Fullname
- `comments[].author`: Author
- `comments[].score`: Score (number)
- `comments[].created_utc`: Created At (Unix Seconds) (number)
- `comments[].edited`: Edited
- `comments[].permalink`: Permalink
- `comments[].subreddit`: Subreddit
- `comments[].stickied`: Stickied (boolean)
- `comments[].body`: Body
- `comments[].parent_id`: Parent Fullname
- `comments[].link_id`: Post Fullname
- `comments[].link_title`: Post Title
- `comments[].depth`: Depth (number)
- `comments[].is_submitter`: Is Post Author (boolean)
- `comments[].distinguished`: Distinguished
- `count`: Count (number)
- `more`: More Placeholders

### `reddit_list_post_flairs`

**List Post Flairs.** Lists a subreddit's post flair templates. Each `id` is the Flair ID for Create Post, Crosspost and Set Post Flair; `text_editable` tells whether custom text is allowed and `mod_only` whether only moderators can use it. Fails with 403 when the subreddit does not let users pick flair. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subreddit` | string | yes |  | Subreddit. Subreddit name without the r/ prefix (e.g. "programming"). |

Output fields:

- `flairs`: Flairs
- `flairs[].id`: Flair Template ID
- `flairs[].text`: Text
- `flairs[].text_editable`: Text Editable (boolean)
- `flairs[].type`: Type
- `flairs[].mod_only`: Mod Only (boolean)
- `flairs[].allowable_content`: Allowed Content
- `flairs[].max_emojis`: Max Emojis (number)
- `flairs[].background_color`: Background Color
- `flairs[].text_color`: Text Color
- `count`: Count (number)

### `reddit_list_posts`

**List Posts.** Lists posts from one subreddit, or from the front page when no subreddit is given, in a chosen sort order. Use "top" or "controversial" with a time range for the best or most divisive posts of a period; "best" works only on the front page. Pages with the returned `after` cursor. Use Search Posts instead to find posts by keyword. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subreddit` | string | no |  | Subreddit. Subreddit name without r/. Leave empty for the front page. |
| `sort` | string | no |  | Sort. Sort order (default hot). One of `"hot"`, `"new"`, `"top"`, `"rising"`, `"controversial"`, `"best"`. |
| `time` | string | no |  | Time Range. Time window for "top" and "controversial" sorts. One of `"hour"`, `"day"`, `"week"`, `"month"`, `"year"`, `"all"`. |
| `limit` | number | no |  | Limit. Maximum number of items to return (1-100, default 25). |
| `after` | string | no |  | After. Pagination cursor: pass the `after` value from the previous response to get the next page. |

Output fields:

- `posts`: Posts
- `posts[].kind`: Kind
- `posts[].id`: Post ID
- `posts[].name`: Fullname
- `posts[].title`: Title
- `posts[].author`: Author
- `posts[].subreddit`: Subreddit
- `posts[].subreddit_name_prefixed`: Subreddit (Prefixed)
- `posts[].selftext`: Body Text
- `posts[].url`: URL (url)
- `posts[].permalink`: Permalink
- `posts[].domain`: Domain
- `posts[].score`: Score (number)
- `posts[].upvote_ratio`: Upvote Ratio (number)
- `posts[].num_comments`: Comment Count (number)
- `posts[].num_crossposts`: Crosspost Count (number)
- `posts[].created_utc`: Created At (Unix Seconds) (number)
- `posts[].edited`: Edited
- `posts[].is_self`: Is Text Post (boolean)
- `posts[].over_18`: NSFW (boolean)
- `posts[].spoiler`: Spoiler (boolean)
- `posts[].stickied`: Stickied (boolean)
- `posts[].locked`: Locked (boolean)
- `posts[].archived`: Archived (boolean)
- `posts[].link_flair_text`: Flair Text
- `posts[].link_flair_template_id`: Flair Template ID
- `posts[].crosspost_parent`: Crosspost Parent
- `count`: Count (number)
- `after`: Next Page Cursor
- `before`: Previous Page Cursor

### `reddit_list_saved_categories`

**List Saved Categories.** Lists your saved-item categories, for the Category input of Save Post or Comment. Categories are a Reddit Premium feature, so the list is empty for other accounts. Needs the `save` scope: older connections must reconnect. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `categories`: Categories
- `count`: Count (number)

### `reddit_list_subreddit_comments`

**List Subreddit Comments.** Lists the most recent comments posted anywhere in a subreddit, newest first, each with its post (`link_id`, `link_title`). Use to monitor activity; use List Post Comments for one post's thread. Pages with the returned `after` cursor. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subreddit` | string | yes |  | Subreddit. Subreddit name without the r/ prefix (e.g. "programming"). |
| `limit` | number | no |  | Limit. Maximum number of items to return (1-100, default 25). |
| `after` | string | no |  | After. Pagination cursor: pass the `after` value from the previous response to get the next page. |

Output fields:

- `comments`: Comments
- `comments[].kind`: Kind
- `comments[].id`: Comment ID
- `comments[].name`: Fullname
- `comments[].author`: Author
- `comments[].score`: Score (number)
- `comments[].created_utc`: Created At (Unix Seconds) (number)
- `comments[].edited`: Edited
- `comments[].permalink`: Permalink
- `comments[].subreddit`: Subreddit
- `comments[].stickied`: Stickied (boolean)
- `comments[].body`: Body
- `comments[].parent_id`: Parent Fullname
- `comments[].link_id`: Post Fullname
- `comments[].link_title`: Post Title
- `comments[].depth`: Depth (number)
- `comments[].is_submitter`: Is Post Author (boolean)
- `comments[].distinguished`: Distinguished
- `count`: Count (number)
- `after`: Next Page Cursor
- `before`: Previous Page Cursor

### `reddit_list_subreddit_moderators`

**List Subreddit Moderators.** Lists the moderators of a subreddit with their permissions and the date they were added. To contact them, use Send Private Message with To set to "/r/<subreddit>". Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subreddit` | string | yes |  | Subreddit. Subreddit name without the r/ prefix (e.g. "programming"). |

Output fields:

- `moderators`: Moderators
- `moderators[].name`: Username
- `moderators[].id`: User Fullname
- `moderators[].mod_permissions`: Permissions
- `moderators[].date`: Added At (Unix Seconds) (number)
- `count`: Count (number)

### `reddit_list_subreddits`

**List Subreddits.** Lists subreddits Reddit-wide: the most popular, the newest, or the defaults. Use Search Subreddits to find by topic and List My Subreddits for the ones you joined. Pages with the returned `after` cursor. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `where` | string | no |  | Type. Which subreddits to list (default popular). One of `"popular"`, `"new"`, `"default"`. |
| `limit` | number | no |  | Limit. Maximum number of items to return (1-100, default 25). |
| `after` | string | no |  | After. Pagination cursor: pass the `after` value from the previous response to get the next page. |

Output fields:

- `subreddits`: Subreddits
- `subreddits[].kind`: Kind
- `subreddits[].id`: Subreddit ID
- `subreddits[].name`: Fullname
- `subreddits[].display_name`: Name
- `subreddits[].display_name_prefixed`: Name (Prefixed)
- `subreddits[].title`: Title
- `subreddits[].public_description`: Public Description
- `subreddits[].subscribers`: Subscribers (number)
- `subreddits[].active_user_count`: Active Users (number)
- `subreddits[].subreddit_type`: Type
- `subreddits[].submission_type`: Allowed Submissions
- `subreddits[].over18`: NSFW (boolean)
- `subreddits[].lang`: Language
- `subreddits[].created_utc`: Created At (Unix Seconds) (number)
- `subreddits[].url`: Path
- `subreddits[].user_is_subscriber`: Subscribed (boolean)
- `subreddits[].user_is_moderator`: Moderator (boolean)
- `count`: Count (number)
- `after`: Next Page Cursor
- `before`: Previous Page Cursor

### `reddit_list_user_content`

**List User Content.** Lists a user's activity: everything (overview), posts (submitted) or comments, sorted. For your own account (username from Get My Account) it can also list saved, upvoted, downvoted, hidden and gilded items; those fail with 403 for other users. Items are posts (t3) or comments (t1). Pages with the returned `after` cursor. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Username. Reddit username without the u/ prefix. |
| `where` | string | no |  | Content. What to list (default overview). One of `"overview"`, `"submitted"`, `"comments"`, `"saved"`, `"upvoted"`, `"downvoted"`, `"hidden"`, `"gilded"`. |
| `sort` | string | no |  | Sort. Sort order (default new). One of `"new"`, `"hot"`, `"top"`, `"controversial"`. |
| `time` | string | no |  | Time Range. Time window for "top" and "controversial" sorts. One of `"hour"`, `"day"`, `"week"`, `"month"`, `"year"`, `"all"`. |
| `limit` | number | no |  | Limit. Maximum number of items to return (1-100, default 25). |
| `after` | string | no |  | After. Pagination cursor: pass the `after` value from the previous response to get the next page. |

Output fields:

- `items`: Items
- `items[].kind`: Kind
- `items[].id`: Post ID
- `items[].name`: Fullname
- `items[].title`: Title
- `items[].author`: Author
- `items[].subreddit`: Subreddit
- `items[].subreddit_name_prefixed`: Subreddit (Prefixed)
- `items[].selftext`: Body Text
- `items[].url`: URL (url)
- `items[].permalink`: Permalink
- `items[].domain`: Domain
- `items[].score`: Score (number)
- `items[].upvote_ratio`: Upvote Ratio (number)
- `items[].num_comments`: Comment Count (number)
- `items[].num_crossposts`: Crosspost Count (number)
- `items[].created_utc`: Created At (Unix Seconds) (number)
- `items[].edited`: Edited
- `items[].is_self`: Is Text Post (boolean)
- `items[].over_18`: NSFW (boolean)
- `items[].spoiler`: Spoiler (boolean)
- `items[].stickied`: Stickied (boolean)
- `items[].locked`: Locked (boolean)
- `items[].archived`: Archived (boolean)
- `items[].link_flair_text`: Flair Text
- `items[].link_flair_template_id`: Flair Template ID
- `items[].crosspost_parent`: Crosspost Parent
- `items[].body`: Body
- `items[].parent_id`: Parent Fullname
- `items[].link_id`: Post Fullname
- `items[].link_title`: Post Title
- `items[].depth`: Depth (number)
- `items[].is_submitter`: Is Post Author (boolean)
- `items[].distinguished`: Distinguished
- `count`: Count (number)
- `after`: Next Page Cursor
- `before`: Previous Page Cursor

### `reddit_list_user_flairs`

**List User Flairs.** Lists a subreddit's user flair templates (the badge shown next to usernames there), with id, text, whether the text is editable and whether it is moderator-only. Fails with 403 when the subreddit does not let users pick flair. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subreddit` | string | yes |  | Subreddit. Subreddit name without the r/ prefix (e.g. "programming"). |

Output fields:

- `flairs`: Flairs
- `count`: Count (number)

### `reddit_list_wiki_pages`

**List Wiki Pages.** Lists the names of a subreddit's wiki pages (e.g. "index", "faq"); read one with Get Wiki Page. Fails with 403 or 404 when the wiki is disabled or private. Needs the `wikiread` scope: older connections must reconnect. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subreddit` | string | yes |  | Subreddit. Subreddit name without the r/ prefix (e.g. "programming"). |

Output fields:

- `pages`: Page Names
- `count`: Count (number)

### `reddit_mark_all_messages_read`

**Mark All Messages Read.** Marks every unread inbox item (messages, replies, mentions) as read. Reddit processes it asynchronously, so List Messages may show unread items for a few seconds. Needs the `privatemessages` scope: older connections must reconnect. Needs authentication.

Kind: write, safe to repeat.

No inputs.

Output fields:

- `success`: Success (boolean)

### `reddit_mark_message_read`

**Mark Messages Read.** Marks inbox items as read: private messages (t4_) or comment replies and mentions (t1_), comma-separated with their prefixes, from List Messages. Use Mark All Messages Read to clear the whole inbox. Needs the `privatemessages` scope: older connections must reconnect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ids` | string | yes |  | Fullnames. Comma-separated fullnames, e.g. "t4_abc123,t1_def456". |

Output fields:

- `success`: Success (boolean)
- `ids`: Fullnames
- `read`: Read (boolean)

### `reddit_report_content`

**Report Post, Comment or Message.** Files a report on a post (t3_), comment (t1_) or private message (t4_) for the subreddit's moderators, with a reason (often one of the subreddit's rule names from Get Subreddit Rules). Only report when a human asked to. Not idempotent: each call files a report. Needs the `report` scope: older connections must reconnect. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `thing_id` | string | yes |  | Fullname. Fullname of the item to report, e.g. "t3_abc123". |
| `reason` | string | yes |  | Reason. Report reason, max 100 characters (e.g. a subreddit rule name). |

Output fields:

- `success`: Success (boolean)
- `id`: Fullname
- `reason`: Reason

### `reddit_save_content`

**Save Post or Comment.** Saves a post (t3_) or comment (t1_) to your account's saved items; saving twice is harmless. Category only applies to Reddit Premium accounts (see List Saved Categories). Read saved items with List User Content (where = saved). Needs the `save` scope: older connections must reconnect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `thing_id` | string | yes |  | Fullname. Fullname of the post or comment, e.g. "t3_abc123". |
| `category` | string | no |  | Category. Saved category (Reddit Premium only). |

Output fields:

- `success`: Success (boolean)
- `id`: Fullname
- `saved`: Saved (boolean)

### `reddit_search_posts`

**Search Posts.** Searches posts by keyword across all of Reddit, or only within one subreddit when given. Supports Reddit search syntax (e.g. author:name, title:word, flair:name). Pages with the returned `after` cursor. Use Search Subreddits to find communities instead of posts. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Search terms (Reddit search syntax supported). |
| `subreddit` | string | no |  | Subreddit. Limit the search to this subreddit (without r/). |
| `sort` | string | no |  | Sort. Sort order (default relevance). One of `"relevance"`, `"hot"`, `"top"`, `"new"`, `"comments"`. |
| `time` | string | no |  | Time Range. Time window for "top" and "controversial" sorts. One of `"hour"`, `"day"`, `"week"`, `"month"`, `"year"`, `"all"`. |
| `limit` | number | no |  | Limit. Maximum number of items to return (1-100, default 25). |
| `after` | string | no |  | After. Pagination cursor: pass the `after` value from the previous response to get the next page. |

Output fields:

- `posts`: Posts
- `posts[].kind`: Kind
- `posts[].id`: Post ID
- `posts[].name`: Fullname
- `posts[].title`: Title
- `posts[].author`: Author
- `posts[].subreddit`: Subreddit
- `posts[].subreddit_name_prefixed`: Subreddit (Prefixed)
- `posts[].selftext`: Body Text
- `posts[].url`: URL (url)
- `posts[].permalink`: Permalink
- `posts[].domain`: Domain
- `posts[].score`: Score (number)
- `posts[].upvote_ratio`: Upvote Ratio (number)
- `posts[].num_comments`: Comment Count (number)
- `posts[].num_crossposts`: Crosspost Count (number)
- `posts[].created_utc`: Created At (Unix Seconds) (number)
- `posts[].edited`: Edited
- `posts[].is_self`: Is Text Post (boolean)
- `posts[].over_18`: NSFW (boolean)
- `posts[].spoiler`: Spoiler (boolean)
- `posts[].stickied`: Stickied (boolean)
- `posts[].locked`: Locked (boolean)
- `posts[].archived`: Archived (boolean)
- `posts[].link_flair_text`: Flair Text
- `posts[].link_flair_template_id`: Flair Template ID
- `posts[].crosspost_parent`: Crosspost Parent
- `count`: Count (number)
- `after`: Next Page Cursor
- `before`: Previous Page Cursor

### `reddit_search_subreddits`

**Search Subreddits.** Finds subreddits matching a topic or keyword in their name, title or description. Returns each subreddit's `display_name` (the value other actions take as Subreddit) and subscriber count. Pages with the returned `after` cursor. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Topic or keyword to search for. |
| `sort` | string | no |  | Sort. Sort order (default relevance). One of `"relevance"`, `"activity"`. |
| `limit` | number | no |  | Limit. Maximum number of items to return (1-100, default 25). |
| `after` | string | no |  | After. Pagination cursor: pass the `after` value from the previous response to get the next page. |

Output fields:

- `subreddits`: Subreddits
- `subreddits[].kind`: Kind
- `subreddits[].id`: Subreddit ID
- `subreddits[].name`: Fullname
- `subreddits[].display_name`: Name
- `subreddits[].display_name_prefixed`: Name (Prefixed)
- `subreddits[].title`: Title
- `subreddits[].public_description`: Public Description
- `subreddits[].subscribers`: Subscribers (number)
- `subreddits[].active_user_count`: Active Users (number)
- `subreddits[].subreddit_type`: Type
- `subreddits[].submission_type`: Allowed Submissions
- `subreddits[].over18`: NSFW (boolean)
- `subreddits[].lang`: Language
- `subreddits[].created_utc`: Created At (Unix Seconds) (number)
- `subreddits[].url`: Path
- `subreddits[].user_is_subscriber`: Subscribed (boolean)
- `subreddits[].user_is_moderator`: Moderator (boolean)
- `count`: Count (number)
- `after`: Next Page Cursor
- `before`: Previous Page Cursor

### `reddit_search_users`

**Search Users.** Finds Reddit accounts whose username or profile matches a query, returning each `name` (the Username for Get User and List User Content) with karma. Pages with the returned `after` cursor. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Name or keyword to search for. |
| `limit` | number | no |  | Limit. Maximum number of items to return (1-100, default 25). |
| `after` | string | no |  | After. Pagination cursor: pass the `after` value from the previous response to get the next page. |

Output fields:

- `users`: Users
- `users[].kind`: Kind
- `users[].id`: User ID
- `users[].name`: Username
- `users[].link_karma`: Post Karma (number)
- `users[].comment_karma`: Comment Karma (number)
- `users[].total_karma`: Total Karma (number)
- `users[].created_utc`: Created At (Unix Seconds) (number)
- `users[].is_gold`: Premium (boolean)
- `users[].is_mod`: Is Moderator (boolean)
- `users[].verified`: Verified (boolean)
- `users[].has_verified_email`: Verified Email (boolean)
- `users[].is_employee`: Reddit Employee (boolean)
- `users[].icon_img`: Avatar (image)
- `count`: Count (number)
- `after`: Next Page Cursor
- `before`: Previous Page Cursor

### `reddit_send_message`

**Send Private Message.** Sends a new private message to a user, or to a subreddit's moderators when To is "/r/<subreddit>". To reply within an existing conversation, use Create Comment with the message's t4_ fullname. Reddit does not return the new message id; find it with List Messages (folder = sent). Not idempotent. Needs the `privatemessages` scope: older connections must reconnect. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | string | yes |  | To. Recipient username without u/, or "/r/<subreddit>" for its moderators. |
| `subject` | string | yes |  | Subject. Message subject (max 100 characters). |
| `text` | string | yes |  | Text. Markdown message body. |

Output fields:

- `success`: Success (boolean)
- `to`: To
- `subject`: Subject

### `reddit_set_inbox_replies`

**Set Inbox Replies.** Enables or disables inbox notifications for replies to a post (t3_) or comment (t1_) you authored. The id must carry its type prefix. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `thing_id` | string | yes |  | Fullname. Fullname of your post or comment, e.g. "t3_abc123". |
| `enabled` | string | yes |  | Inbox Replies. Whether replies should notify your inbox. One of `"true"`, `"false"`. |

Output fields:

- `success`: Success (boolean)
- `id`: Fullname
- `inbox_replies`: Inbox Replies Enabled (boolean)

### `reddit_set_post_flair`

**Set Post Flair.** Sets the flair on a post you authored (or any post if you moderate the subreddit). Flair Template ID comes from List Post Flairs; Text overrides the label when the template is editable. Leaving both empty clears the flair. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subreddit` | string | yes |  | Subreddit. Subreddit the post is in, without r/. |
| `post_id` | string | yes |  | Post ID. Post id, e.g. "abc123" or "t3_abc123". |
| `flair_template_id` | string | no |  | Flair Template ID. Flair template id from List Post Flairs. |
| `text` | string | no |  | Text. Flair label (max 64 characters), for editable templates. |

Output fields:

- `success`: Success (boolean)
- `post`: Post Fullname
- `flair_template_id`: Flair Template ID
- `text`: Flair Text

### `reddit_subscribe_subreddit`

**Join Subreddit.** Subscribes (joins) your account to a subreddit; joining one you already follow is harmless. Undo with Leave Subreddit. Needs the `subscribe` scope: older connections must reconnect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subreddit` | string | yes |  | Subreddit. Subreddit name without the r/ prefix (e.g. "programming"). |

Output fields:

- `success`: Success (boolean)
- `subreddit`: Subreddit
- `subscribed`: Subscribed (boolean)

### `reddit_unhide_post`

**Unhide Posts.** Restores posts hidden with Hide Posts to your listings. Accepts comma-separated post ids with or without t3_; List User Content (where = hidden) lists hidden posts. Needs the `report` scope: older connections must reconnect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `post_ids` | string | yes |  | Post IDs. Comma-separated post ids, e.g. "abc123,t3_def456". |

Output fields:

- `success`: Success (boolean)
- `ids`: Fullnames
- `hidden`: Hidden (boolean)

### `reddit_unsave_content`

**Unsave Post or Comment.** Removes a post (t3_) or comment (t1_) from your saved items; harmless when it is not saved. Needs the `save` scope: older connections must reconnect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `thing_id` | string | yes |  | Fullname. Fullname of the post or comment, e.g. "t3_abc123". |

Output fields:

- `success`: Success (boolean)
- `id`: Fullname
- `saved`: Saved (boolean)

### `reddit_unsubscribe_subreddit`

**Leave Subreddit.** Unsubscribes (leaves) your account from a subreddit; harmless when not subscribed. Rejoin with Join Subreddit. Needs the `subscribe` scope: older connections must reconnect. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subreddit` | string | yes |  | Subreddit. Subreddit name without the r/ prefix (e.g. "programming"). |

Output fields:

- `success`: Success (boolean)
- `subreddit`: Subreddit
- `subscribed`: Subscribed (boolean)

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

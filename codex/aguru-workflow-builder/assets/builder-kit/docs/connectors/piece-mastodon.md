# Mastodon

Open-source decentralized social network

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mastodon'
  version: '0.8.2'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> **Base Url**: The base url of your Mastodon instance (e.g `https://mastodon.social`)
>
> **Access Token**: To get your access token, follow the steps below:
>
> 1. Go to your **Profile** -> **Preferences** -> **Development** -> **New Application**
> 2. Fill the Information
> 3. Under **Scopes**, tick **read** and **write** (the form pre-selects only `profile`)
> 4. Click on **Create Application**
> 5. Copy access token from **Your access token**
>
> If an existing connection fails with a missing-scope error, edit the application in Mastodon, tick **read** and **write**, save (this regenerates the token) and paste the new token here.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_url` | string | yes | `"https://mastodon.social/"` | Base URL. The base URL of your Mastodon instance. |
| `access_token` | string | yes |  | Access Token. The access token for your Mastodon account, check the documentation for how to get this. |

## Actions

### `post_status`

**Post Status.** Publishes a new status (toot) to a Mastodon instance from the authenticated account, optionally attaching a media file uploaded alongside the post and media already uploaded with Upload Media, with optional visibility, content warning, reply target and sensitive flag. Use to broadcast a message or share content on Mastodon. Requires status text; not idempotent — each call creates a separate post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | yes |  | Status. The text of your status. |
| `media` | file | no |  | Media URL or File. The media attachment for your status. Files are not supported; an action that needs one fails. |
| `visibility` | string | no |  | Visibility. Who can see the post. Leave empty to use the default posting privacy from your Mastodon preferences. One of `"public"`, `"unlisted"`, `"private"`, `"direct"`. |
| `spoiler_text` | string | no |  | Content Warning. Optional warning shown in place of the post text until the reader chooses to reveal it, for example "Spoilers for episode 3". |
| `in_reply_to_id` | string | no |  | Reply To (Status ID). To post a reply, the ID of the status you are answering: map the Status ID from the New Mention trigger (Related Status > Status ID), from Get Status, or from a previous Post Status step (Status > Status ID). Leave empty for a new post. |
| `media_ids` | array | no |  | Media IDs. IDs of media you already uploaded with the Upload Media action, one per item. Most servers allow 4 attachments in total, including the file above. Leave empty if you have none. |
| `sensitive` | string | no |  | Mark Media as Sensitive. Hide attached media behind a sensitive-content warning. Leave empty to use your account default. One of `true`, `false`. |

Output fields:

- `status`: HTTP Status (number)
- `body`: Status
- `body.id`: Status ID
- `body.created_at`: Created At (datetime)
- `body.url`: URL (url)
- `body.uri`: ActivityPub URI (url)
- `body.content`: Content (html)
- `body.spoiler_text`: Content Warning
- `body.sensitive`: Sensitive (boolean)
- `body.visibility`: Visibility
- `body.language`: Language
- `body.in_reply_to_id`: In Reply To Status ID
- `body.in_reply_to_account_id`: In Reply To Account ID
- `body.replies_count`: Replies (number)
- `body.reblogs_count`: Boosts (number)
- `body.favourites_count`: Favourites (number)
- `body.edited_at`: Edited At (datetime)
- `body.account`: Author
- `body.account.id`: Account ID
- `body.account.username`: Username
- `body.account.acct`: Handle
- `body.account.display_name`: Display Name
- `body.account.url`: Profile URL (url)
- `body.account.avatar`: Avatar (image)
- `body.account.bot`: Bot (boolean)
- `body.media_attachments`: Media Attachments
- `body.media_attachments[].id`: Media ID
- `body.media_attachments[].type`: Type
- `body.media_attachments[].url`: URL (url)
- `body.media_attachments[].preview_url`: Preview (image)
- `body.media_attachments[].remote_url`: Remote URL (url)
- `body.media_attachments[].description`: Alt Text
- `body.media_attachments[].meta`: Metadata
- `body.media_attachments[].meta.original`: Original
- `body.media_attachments[].meta.original.width`: Width (number)
- `body.media_attachments[].meta.original.height`: Height (number)
- `body.media_attachments[].meta.focus`: Focal Point
- `body.media_attachments[].meta.focus.x`: X (number)
- `body.media_attachments[].meta.focus.y`: Y (number)
- `body.mentions`: Mentions
- `body.mentions[].id`: Account ID
- `body.mentions[].username`: Username
- `body.mentions[].acct`: Handle
- `body.mentions[].url`: Profile URL (url)
- `body.tags`: Hashtags
- `body.tags[].name`: Name
- `body.tags[].url`: URL (url)
- `body.poll`: Poll
- `body.poll.id`: Poll ID
- `body.poll.expires_at`: Expires At (datetime)
- `body.poll.expired`: Expired (boolean)
- `body.poll.multiple`: Multiple Choice (boolean)
- `body.poll.votes_count`: Votes (number)
- `body.poll.voters_count`: Voters (number)
- `body.poll.voted`: Voted (boolean)
- `body.poll.own_votes`: Own Votes (Option Indexes)
- `body.poll.options`: Options
- `body.poll.options[].title`: Title
- `body.poll.options[].votes_count`: Votes (number)
- `body.card`: Link Preview
- `body.card.url`: URL (url)
- `body.card.title`: Title
- `body.card.description`: Description
- `body.card.type`: Type
- `body.card.language`: Language
- `body.card.provider_name`: Provider
- `body.card.author_name`: Author
- `body.card.image`: Image (image)
- `body.card.published_at`: Published At (datetime)
- `body.favourited`: Favourited by Me (boolean)
- `body.reblogged`: Boosted by Me (boolean)
- `body.bookmarked`: Bookmarked by Me (boolean)
- `body.muted`: Conversation Muted (boolean)
- `body.pinned`: Pinned to Profile (boolean)
- `body.reblog`: Boosted Status
- `body.reblog.id`: Status ID
- `body.reblog.created_at`: Created At (datetime)
- `body.reblog.url`: URL (url)
- `body.reblog.uri`: ActivityPub URI (url)
- `body.reblog.content`: Content (html)
- `body.reblog.spoiler_text`: Content Warning
- `body.reblog.sensitive`: Sensitive (boolean)
- `body.reblog.visibility`: Visibility
- `body.reblog.language`: Language
- `body.reblog.in_reply_to_id`: In Reply To Status ID
- `body.reblog.in_reply_to_account_id`: In Reply To Account ID
- `body.reblog.replies_count`: Replies (number)
- `body.reblog.reblogs_count`: Boosts (number)
- `body.reblog.favourites_count`: Favourites (number)
- `body.reblog.edited_at`: Edited At (datetime)
- `body.reblog.account`: Author
- `body.reblog.account.id`: Account ID
- `body.reblog.account.username`: Username
- `body.reblog.account.acct`: Handle
- `body.reblog.account.display_name`: Display Name
- `body.reblog.account.url`: Profile URL (url)
- `body.reblog.account.avatar`: Avatar (image)
- `body.reblog.account.bot`: Bot (boolean)
- `body.reblog.media_attachments`: Media Attachments
- `body.reblog.media_attachments[].id`: Media ID
- `body.reblog.media_attachments[].type`: Type
- `body.reblog.media_attachments[].url`: URL (url)
- `body.reblog.media_attachments[].preview_url`: Preview (image)
- `body.reblog.media_attachments[].remote_url`: Remote URL (url)
- `body.reblog.media_attachments[].description`: Alt Text
- `body.reblog.media_attachments[].meta`: Metadata
- `body.reblog.media_attachments[].meta.original`: Original
- `body.reblog.media_attachments[].meta.original.width`: Width (number)
- `body.reblog.media_attachments[].meta.original.height`: Height (number)
- `body.reblog.media_attachments[].meta.focus`: Focal Point
- `body.reblog.media_attachments[].meta.focus.x`: X (number)
- `body.reblog.media_attachments[].meta.focus.y`: Y (number)
- `body.reblog.mentions`: Mentions
- `body.reblog.mentions[].id`: Account ID
- `body.reblog.mentions[].username`: Username
- `body.reblog.mentions[].acct`: Handle
- `body.reblog.mentions[].url`: Profile URL (url)
- `body.reblog.tags`: Hashtags
- `body.reblog.tags[].name`: Name
- `body.reblog.tags[].url`: URL (url)
- `body.reblog.poll`: Poll
- `body.reblog.poll.id`: Poll ID
- `body.reblog.poll.expires_at`: Expires At (datetime)
- `body.reblog.poll.expired`: Expired (boolean)
- `body.reblog.poll.multiple`: Multiple Choice (boolean)
- `body.reblog.poll.votes_count`: Votes (number)
- `body.reblog.poll.voters_count`: Voters (number)
- `body.reblog.poll.voted`: Voted (boolean)
- `body.reblog.poll.own_votes`: Own Votes (Option Indexes)
- `body.reblog.poll.options`: Options
- `body.reblog.poll.options[].title`: Title
- `body.reblog.poll.options[].votes_count`: Votes (number)
- `body.reblog.card`: Link Preview
- `body.reblog.card.url`: URL (url)
- `body.reblog.card.title`: Title
- `body.reblog.card.description`: Description
- `body.reblog.card.type`: Type
- `body.reblog.card.language`: Language
- `body.reblog.card.provider_name`: Provider
- `body.reblog.card.author_name`: Author
- `body.reblog.card.image`: Image (image)
- `body.reblog.card.published_at`: Published At (datetime)
- `body.application`: Posted With
- `body.application.name`: App Name
- `body.application.website`: App Website (url)

### `create_status`

**Create Status.** Publishes a new status from the connected account, with control over visibility, content warning, language, attached media (IDs from Upload Media) or a poll; replies are this action with In Reply To set. Use Schedule Status instead to publish later. Media and a poll cannot be combined. Each call creates a new post; an optional Idempotency Key makes Mastodon ignore a duplicate submitted within about an hour, but retries after that duplicate the post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no |  | Status Text. The text of the post. Mentions (@user@domain), hashtags and links are parsed by Mastodon. Required unless Media IDs are provided. Use Get Instance Info to read the server character limit (500 by default). |
| `visibility` | string | no |  | Visibility. Who can see the post. Leave empty to use the account default posting privacy. One of `"public"`, `"unlisted"`, `"private"`, `"direct"`. |
| `in_reply_to_id` | string | no |  | In Reply To (Status ID). Local ID of the status to reply to, for example 109372843234737004. Obtain it from Get Status, a timeline or Search (with resolve for remote URLs). |
| `spoiler_text` | string | no |  | Content Warning. Optional content warning shown before the post text. |
| `sensitive` | string | no |  | Mark Media as Sensitive. Whether attached media should be hidden behind a sensitive-content warning. Leave empty for the account default. One of `true`, `false`. |
| `language` | string | no |  | Language. ISO 639-1 two-letter language code of the post, for example en or de. |
| `media_ids` | array | no |  | Media IDs. IDs of media returned by Upload Media, one per item (up to the server limit, 4 by default). Cannot be combined with a poll. |
| `poll_options` | array | no |  | Poll Options. Answer choices for a poll, one per item (2 to 4 on most servers). Cannot be combined with media. |
| `poll_expires_in` | number | no |  | Poll Duration (seconds). How long the poll stays open, in seconds. Mastodon accepts 300 (5 minutes) to 2629746 (1 month). Required with Poll Options. |
| `poll_multiple` | string | no |  | Allow Multiple Choices. Whether voters may pick more than one option. Leave empty for single choice. One of `true`, `false`. |
| `idempotency_key` | string | no |  | Idempotency Key. Optional unique string (for example a UUID). Mastodon keeps it for up to 1 hour and returns the original post instead of creating a duplicate when the same key is sent again. |

Output fields:

- `id`: Status ID
- `created_at`: Created At (datetime)
- `url`: URL (url)
- `uri`: ActivityPub URI (url)
- `content`: Content (html)
- `spoiler_text`: Content Warning
- `sensitive`: Sensitive (boolean)
- `visibility`: Visibility
- `language`: Language
- `in_reply_to_id`: In Reply To Status ID
- `in_reply_to_account_id`: In Reply To Account ID
- `replies_count`: Replies (number)
- `reblogs_count`: Boosts (number)
- `favourites_count`: Favourites (number)
- `edited_at`: Edited At (datetime)
- `account`: Author
- `account.id`: Account ID
- `account.username`: Username
- `account.acct`: Handle
- `account.display_name`: Display Name
- `account.url`: Profile URL (url)
- `account.avatar`: Avatar (image)
- `account.bot`: Bot (boolean)
- `media_attachments`: Media Attachments
- `media_attachments[].id`: Media ID
- `media_attachments[].type`: Type
- `media_attachments[].url`: URL (url)
- `media_attachments[].preview_url`: Preview (image)
- `media_attachments[].remote_url`: Remote URL (url)
- `media_attachments[].description`: Alt Text
- `media_attachments[].meta`: Metadata
- `media_attachments[].meta.original`: Original
- `media_attachments[].meta.original.width`: Width (number)
- `media_attachments[].meta.original.height`: Height (number)
- `media_attachments[].meta.focus`: Focal Point
- `media_attachments[].meta.focus.x`: X (number)
- `media_attachments[].meta.focus.y`: Y (number)
- `mentions`: Mentions
- `mentions[].id`: Account ID
- `mentions[].username`: Username
- `mentions[].acct`: Handle
- `mentions[].url`: Profile URL (url)
- `tags`: Hashtags
- `tags[].name`: Name
- `tags[].url`: URL (url)
- `poll`: Poll
- `poll.id`: Poll ID
- `poll.expires_at`: Expires At (datetime)
- `poll.expired`: Expired (boolean)
- `poll.multiple`: Multiple Choice (boolean)
- `poll.votes_count`: Votes (number)
- `poll.voters_count`: Voters (number)
- `poll.voted`: Voted (boolean)
- `poll.own_votes`: Own Votes (Option Indexes)
- `poll.options`: Options
- `poll.options[].title`: Title
- `poll.options[].votes_count`: Votes (number)
- `card`: Link Preview
- `card.url`: URL (url)
- `card.title`: Title
- `card.description`: Description
- `card.type`: Type
- `card.language`: Language
- `card.provider_name`: Provider
- `card.author_name`: Author
- `card.image`: Image (image)
- `card.published_at`: Published At (datetime)
- `favourited`: Favourited by Me (boolean)
- `reblogged`: Boosted by Me (boolean)
- `bookmarked`: Bookmarked by Me (boolean)
- `muted`: Conversation Muted (boolean)
- `pinned`: Pinned to Profile (boolean)
- `reblog`: Boosted Status
- `reblog.id`: Status ID
- `reblog.created_at`: Created At (datetime)
- `reblog.url`: URL (url)
- `reblog.uri`: ActivityPub URI (url)
- `reblog.content`: Content (html)
- `reblog.spoiler_text`: Content Warning
- `reblog.sensitive`: Sensitive (boolean)
- `reblog.visibility`: Visibility
- `reblog.language`: Language
- `reblog.in_reply_to_id`: In Reply To Status ID
- `reblog.in_reply_to_account_id`: In Reply To Account ID
- `reblog.replies_count`: Replies (number)
- `reblog.reblogs_count`: Boosts (number)
- `reblog.favourites_count`: Favourites (number)
- `reblog.edited_at`: Edited At (datetime)
- `reblog.account`: Author
- `reblog.account.id`: Account ID
- `reblog.account.username`: Username
- `reblog.account.acct`: Handle
- `reblog.account.display_name`: Display Name
- `reblog.account.url`: Profile URL (url)
- `reblog.account.avatar`: Avatar (image)
- `reblog.account.bot`: Bot (boolean)
- `reblog.media_attachments`: Media Attachments
- `reblog.media_attachments[].id`: Media ID
- `reblog.media_attachments[].type`: Type
- `reblog.media_attachments[].url`: URL (url)
- `reblog.media_attachments[].preview_url`: Preview (image)
- `reblog.media_attachments[].remote_url`: Remote URL (url)
- `reblog.media_attachments[].description`: Alt Text
- `reblog.media_attachments[].meta`: Metadata
- `reblog.media_attachments[].meta.original`: Original
- `reblog.media_attachments[].meta.original.width`: Width (number)
- `reblog.media_attachments[].meta.original.height`: Height (number)
- `reblog.media_attachments[].meta.focus`: Focal Point
- `reblog.media_attachments[].meta.focus.x`: X (number)
- `reblog.media_attachments[].meta.focus.y`: Y (number)
- `reblog.mentions`: Mentions
- `reblog.mentions[].id`: Account ID
- `reblog.mentions[].username`: Username
- `reblog.mentions[].acct`: Handle
- `reblog.mentions[].url`: Profile URL (url)
- `reblog.tags`: Hashtags
- `reblog.tags[].name`: Name
- `reblog.tags[].url`: URL (url)
- `reblog.poll`: Poll
- `reblog.poll.id`: Poll ID
- `reblog.poll.expires_at`: Expires At (datetime)
- `reblog.poll.expired`: Expired (boolean)
- `reblog.poll.multiple`: Multiple Choice (boolean)
- `reblog.poll.votes_count`: Votes (number)
- `reblog.poll.voters_count`: Voters (number)
- `reblog.poll.voted`: Voted (boolean)
- `reblog.poll.own_votes`: Own Votes (Option Indexes)
- `reblog.poll.options`: Options
- `reblog.poll.options[].title`: Title
- `reblog.poll.options[].votes_count`: Votes (number)
- `reblog.card`: Link Preview
- `reblog.card.url`: URL (url)
- `reblog.card.title`: Title
- `reblog.card.description`: Description
- `reblog.card.type`: Type
- `reblog.card.language`: Language
- `reblog.card.provider_name`: Provider
- `reblog.card.author_name`: Author
- `reblog.card.image`: Image (image)
- `reblog.card.published_at`: Published At (datetime)
- `application`: Posted With
- `application.name`: App Name
- `application.website`: App Website (url)

### `schedule_status`

**Schedule Status.** Schedules a status to be published by Mastodon at a future date-time (at least 5 minutes ahead) and returns the scheduled status, not a published post. Use Create Status to post immediately; manage the result with List Scheduled Statuses, Reschedule Status or Cancel Scheduled Status. Each call schedules another post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `scheduled_at` | ISO date-time string | yes |  | Scheduled At. When to publish, as a date-time such as 2026-10-01T09:30:00Z. Must be at least 6 minutes in the future (Mastodon requires 5, plus a minute for clock drift). |
| `status` | string | no |  | Status Text. The text of the post. Mentions (@user@domain), hashtags and links are parsed by Mastodon. Required unless Media IDs are provided. Use Get Instance Info to read the server character limit (500 by default). |
| `visibility` | string | no |  | Visibility. Who can see the post. Leave empty to use the account default posting privacy. One of `"public"`, `"unlisted"`, `"private"`, `"direct"`. |
| `in_reply_to_id` | string | no |  | In Reply To (Status ID). Local ID of the status to reply to, for example 109372843234737004. Obtain it from Get Status, a timeline or Search (with resolve for remote URLs). |
| `spoiler_text` | string | no |  | Content Warning. Optional content warning shown before the post text. |
| `sensitive` | string | no |  | Mark Media as Sensitive. Whether attached media should be hidden behind a sensitive-content warning. Leave empty for the account default. One of `true`, `false`. |
| `language` | string | no |  | Language. ISO 639-1 two-letter language code of the post, for example en or de. |
| `media_ids` | array | no |  | Media IDs. IDs of media returned by Upload Media, one per item (up to the server limit, 4 by default). Cannot be combined with a poll. |
| `poll_options` | array | no |  | Poll Options. Answer choices for a poll, one per item (2 to 4 on most servers). Cannot be combined with media. |
| `poll_expires_in` | number | no |  | Poll Duration (seconds). How long the poll stays open, in seconds. Mastodon accepts 300 (5 minutes) to 2629746 (1 month). Required with Poll Options. |
| `poll_multiple` | string | no |  | Allow Multiple Choices. Whether voters may pick more than one option. Leave empty for single choice. One of `true`, `false`. |
| `idempotency_key` | string | no |  | Idempotency Key. Optional unique string (for example a UUID). Mastodon keeps it for up to 1 hour and ignores a duplicate submission with the same key. |

Output fields:

- `id`: Scheduled Status ID
- `scheduled_at`: Scheduled At (datetime)
- `params`: Status Parameters
- `params.text`: Text
- `params.visibility`: Visibility
- `params.spoiler_text`: Content Warning
- `params.sensitive`: Sensitive (boolean)
- `params.language`: Language
- `params.in_reply_to_id`: In Reply To Status ID
- `params.media_ids`: Media IDs
- `media_attachments`: Media Attachments
- `media_attachments[].id`: Media ID
- `media_attachments[].type`: Type
- `media_attachments[].url`: URL (url)
- `media_attachments[].preview_url`: Preview (image)
- `media_attachments[].remote_url`: Remote URL (url)
- `media_attachments[].description`: Alt Text
- `media_attachments[].meta`: Metadata
- `media_attachments[].meta.original`: Original
- `media_attachments[].meta.original.width`: Width (number)
- `media_attachments[].meta.original.height`: Height (number)
- `media_attachments[].meta.focus`: Focal Point
- `media_attachments[].meta.focus.x`: X (number)
- `media_attachments[].meta.focus.y`: Y (number)

### `get_status`

**Get Status.** Fetches one status by its local ID, including text, author, counts, media attachments and poll. Use it to read a post before replying, editing or engaging with it; for a status URL from another server, first import it with Search (resolve) to get a local ID. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_id` | string | yes |  | Status ID. ID of the status on your server, for example 109372843234737004. Map it from a trigger such as New Mention (Related Status > Status ID), from Post Status, a timeline or Search. |

Output fields:

- `id`: Status ID
- `created_at`: Created At (datetime)
- `url`: URL (url)
- `uri`: ActivityPub URI (url)
- `content`: Content (html)
- `spoiler_text`: Content Warning
- `sensitive`: Sensitive (boolean)
- `visibility`: Visibility
- `language`: Language
- `in_reply_to_id`: In Reply To Status ID
- `in_reply_to_account_id`: In Reply To Account ID
- `replies_count`: Replies (number)
- `reblogs_count`: Boosts (number)
- `favourites_count`: Favourites (number)
- `edited_at`: Edited At (datetime)
- `account`: Author
- `account.id`: Account ID
- `account.username`: Username
- `account.acct`: Handle
- `account.display_name`: Display Name
- `account.url`: Profile URL (url)
- `account.avatar`: Avatar (image)
- `account.bot`: Bot (boolean)
- `media_attachments`: Media Attachments
- `media_attachments[].id`: Media ID
- `media_attachments[].type`: Type
- `media_attachments[].url`: URL (url)
- `media_attachments[].preview_url`: Preview (image)
- `media_attachments[].remote_url`: Remote URL (url)
- `media_attachments[].description`: Alt Text
- `media_attachments[].meta`: Metadata
- `media_attachments[].meta.original`: Original
- `media_attachments[].meta.original.width`: Width (number)
- `media_attachments[].meta.original.height`: Height (number)
- `media_attachments[].meta.focus`: Focal Point
- `media_attachments[].meta.focus.x`: X (number)
- `media_attachments[].meta.focus.y`: Y (number)
- `mentions`: Mentions
- `mentions[].id`: Account ID
- `mentions[].username`: Username
- `mentions[].acct`: Handle
- `mentions[].url`: Profile URL (url)
- `tags`: Hashtags
- `tags[].name`: Name
- `tags[].url`: URL (url)
- `poll`: Poll
- `poll.id`: Poll ID
- `poll.expires_at`: Expires At (datetime)
- `poll.expired`: Expired (boolean)
- `poll.multiple`: Multiple Choice (boolean)
- `poll.votes_count`: Votes (number)
- `poll.voters_count`: Voters (number)
- `poll.voted`: Voted (boolean)
- `poll.own_votes`: Own Votes (Option Indexes)
- `poll.options`: Options
- `poll.options[].title`: Title
- `poll.options[].votes_count`: Votes (number)
- `card`: Link Preview
- `card.url`: URL (url)
- `card.title`: Title
- `card.description`: Description
- `card.type`: Type
- `card.language`: Language
- `card.provider_name`: Provider
- `card.author_name`: Author
- `card.image`: Image (image)
- `card.published_at`: Published At (datetime)
- `favourited`: Favourited by Me (boolean)
- `reblogged`: Boosted by Me (boolean)
- `bookmarked`: Bookmarked by Me (boolean)
- `muted`: Conversation Muted (boolean)
- `pinned`: Pinned to Profile (boolean)
- `reblog`: Boosted Status
- `reblog.id`: Status ID
- `reblog.created_at`: Created At (datetime)
- `reblog.url`: URL (url)
- `reblog.uri`: ActivityPub URI (url)
- `reblog.content`: Content (html)
- `reblog.spoiler_text`: Content Warning
- `reblog.sensitive`: Sensitive (boolean)
- `reblog.visibility`: Visibility
- `reblog.language`: Language
- `reblog.in_reply_to_id`: In Reply To Status ID
- `reblog.in_reply_to_account_id`: In Reply To Account ID
- `reblog.replies_count`: Replies (number)
- `reblog.reblogs_count`: Boosts (number)
- `reblog.favourites_count`: Favourites (number)
- `reblog.edited_at`: Edited At (datetime)
- `reblog.account`: Author
- `reblog.account.id`: Account ID
- `reblog.account.username`: Username
- `reblog.account.acct`: Handle
- `reblog.account.display_name`: Display Name
- `reblog.account.url`: Profile URL (url)
- `reblog.account.avatar`: Avatar (image)
- `reblog.account.bot`: Bot (boolean)
- `reblog.media_attachments`: Media Attachments
- `reblog.media_attachments[].id`: Media ID
- `reblog.media_attachments[].type`: Type
- `reblog.media_attachments[].url`: URL (url)
- `reblog.media_attachments[].preview_url`: Preview (image)
- `reblog.media_attachments[].remote_url`: Remote URL (url)
- `reblog.media_attachments[].description`: Alt Text
- `reblog.media_attachments[].meta`: Metadata
- `reblog.media_attachments[].meta.original`: Original
- `reblog.media_attachments[].meta.original.width`: Width (number)
- `reblog.media_attachments[].meta.original.height`: Height (number)
- `reblog.media_attachments[].meta.focus`: Focal Point
- `reblog.media_attachments[].meta.focus.x`: X (number)
- `reblog.media_attachments[].meta.focus.y`: Y (number)
- `reblog.mentions`: Mentions
- `reblog.mentions[].id`: Account ID
- `reblog.mentions[].username`: Username
- `reblog.mentions[].acct`: Handle
- `reblog.mentions[].url`: Profile URL (url)
- `reblog.tags`: Hashtags
- `reblog.tags[].name`: Name
- `reblog.tags[].url`: URL (url)
- `reblog.poll`: Poll
- `reblog.poll.id`: Poll ID
- `reblog.poll.expires_at`: Expires At (datetime)
- `reblog.poll.expired`: Expired (boolean)
- `reblog.poll.multiple`: Multiple Choice (boolean)
- `reblog.poll.votes_count`: Votes (number)
- `reblog.poll.voters_count`: Voters (number)
- `reblog.poll.voted`: Voted (boolean)
- `reblog.poll.own_votes`: Own Votes (Option Indexes)
- `reblog.poll.options`: Options
- `reblog.poll.options[].title`: Title
- `reblog.poll.options[].votes_count`: Votes (number)
- `reblog.card`: Link Preview
- `reblog.card.url`: URL (url)
- `reblog.card.title`: Title
- `reblog.card.description`: Description
- `reblog.card.type`: Type
- `reblog.card.language`: Language
- `reblog.card.provider_name`: Provider
- `reblog.card.author_name`: Author
- `reblog.card.image`: Image (image)
- `reblog.card.published_at`: Published At (datetime)
- `application`: Posted With
- `application.name`: App Name
- `application.website`: App Website (url)

### `edit_status`

**Edit Status.** Edits a status posted by the connected account; only the fields you set change, everything else (text, content warning, sensitivity, media, poll) is carried over from the current post. An existing poll keeps its votes when you leave the poll fields empty, but its hidden-totals setting is reset to visible, and the edit is refused if the poll has ended or closes in under 5 minutes. Setting Poll Options or Allow Multiple Choices to different values resets all votes. Media IDs replace the attached media set. It cannot remove an existing content warning or detach all media; to do that, delete the status and create it again. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_id` | string | yes |  | Status ID. ID of your own status to edit. Map it from a previous Post Status step (Status > Status ID), Create Status, Get Status or List Account Statuses. |
| `status` | string | no |  | Status Text. New text of the post. Leave empty to keep the current text. |
| `spoiler_text` | string | no |  | Content Warning. New content warning. Leave empty to keep the current one; an existing content warning cannot be removed here. |
| `sensitive` | string | no |  | Mark Media as Sensitive. Leave empty to keep the current setting. One of `true`, `false`. |
| `language` | string | no |  | Language. New ISO 639-1 language code, for example en. Leave empty to keep the current language. |
| `media_ids` | array | no |  | Media IDs. Replaces the attached media with these IDs (from Upload Media or the current media_attachments). Leave empty to keep the current media; all media cannot be detached here. |
| `poll_options` | array | no |  | Poll Options. New poll choices, one per item. Changing them resets all votes. Leave empty to keep the current poll. |
| `poll_expires_in` | number | no |  | Poll Duration (seconds). New poll duration from now, in seconds (300 to 2629746). Leave empty to keep the current closing time. |
| `poll_multiple` | string | no |  | Allow Multiple Choices. Changing this resets all votes. Leave empty to keep the current setting. One of `true`, `false`. |

Output fields:

- `id`: Status ID
- `created_at`: Created At (datetime)
- `url`: URL (url)
- `uri`: ActivityPub URI (url)
- `content`: Content (html)
- `spoiler_text`: Content Warning
- `sensitive`: Sensitive (boolean)
- `visibility`: Visibility
- `language`: Language
- `in_reply_to_id`: In Reply To Status ID
- `in_reply_to_account_id`: In Reply To Account ID
- `replies_count`: Replies (number)
- `reblogs_count`: Boosts (number)
- `favourites_count`: Favourites (number)
- `edited_at`: Edited At (datetime)
- `account`: Author
- `account.id`: Account ID
- `account.username`: Username
- `account.acct`: Handle
- `account.display_name`: Display Name
- `account.url`: Profile URL (url)
- `account.avatar`: Avatar (image)
- `account.bot`: Bot (boolean)
- `media_attachments`: Media Attachments
- `media_attachments[].id`: Media ID
- `media_attachments[].type`: Type
- `media_attachments[].url`: URL (url)
- `media_attachments[].preview_url`: Preview (image)
- `media_attachments[].remote_url`: Remote URL (url)
- `media_attachments[].description`: Alt Text
- `media_attachments[].meta`: Metadata
- `media_attachments[].meta.original`: Original
- `media_attachments[].meta.original.width`: Width (number)
- `media_attachments[].meta.original.height`: Height (number)
- `media_attachments[].meta.focus`: Focal Point
- `media_attachments[].meta.focus.x`: X (number)
- `media_attachments[].meta.focus.y`: Y (number)
- `mentions`: Mentions
- `mentions[].id`: Account ID
- `mentions[].username`: Username
- `mentions[].acct`: Handle
- `mentions[].url`: Profile URL (url)
- `tags`: Hashtags
- `tags[].name`: Name
- `tags[].url`: URL (url)
- `poll`: Poll
- `poll.id`: Poll ID
- `poll.expires_at`: Expires At (datetime)
- `poll.expired`: Expired (boolean)
- `poll.multiple`: Multiple Choice (boolean)
- `poll.votes_count`: Votes (number)
- `poll.voters_count`: Voters (number)
- `poll.voted`: Voted (boolean)
- `poll.own_votes`: Own Votes (Option Indexes)
- `poll.options`: Options
- `poll.options[].title`: Title
- `poll.options[].votes_count`: Votes (number)
- `card`: Link Preview
- `card.url`: URL (url)
- `card.title`: Title
- `card.description`: Description
- `card.type`: Type
- `card.language`: Language
- `card.provider_name`: Provider
- `card.author_name`: Author
- `card.image`: Image (image)
- `card.published_at`: Published At (datetime)
- `favourited`: Favourited by Me (boolean)
- `reblogged`: Boosted by Me (boolean)
- `bookmarked`: Bookmarked by Me (boolean)
- `muted`: Conversation Muted (boolean)
- `pinned`: Pinned to Profile (boolean)
- `reblog`: Boosted Status
- `reblog.id`: Status ID
- `reblog.created_at`: Created At (datetime)
- `reblog.url`: URL (url)
- `reblog.uri`: ActivityPub URI (url)
- `reblog.content`: Content (html)
- `reblog.spoiler_text`: Content Warning
- `reblog.sensitive`: Sensitive (boolean)
- `reblog.visibility`: Visibility
- `reblog.language`: Language
- `reblog.in_reply_to_id`: In Reply To Status ID
- `reblog.in_reply_to_account_id`: In Reply To Account ID
- `reblog.replies_count`: Replies (number)
- `reblog.reblogs_count`: Boosts (number)
- `reblog.favourites_count`: Favourites (number)
- `reblog.edited_at`: Edited At (datetime)
- `reblog.account`: Author
- `reblog.account.id`: Account ID
- `reblog.account.username`: Username
- `reblog.account.acct`: Handle
- `reblog.account.display_name`: Display Name
- `reblog.account.url`: Profile URL (url)
- `reblog.account.avatar`: Avatar (image)
- `reblog.account.bot`: Bot (boolean)
- `reblog.media_attachments`: Media Attachments
- `reblog.media_attachments[].id`: Media ID
- `reblog.media_attachments[].type`: Type
- `reblog.media_attachments[].url`: URL (url)
- `reblog.media_attachments[].preview_url`: Preview (image)
- `reblog.media_attachments[].remote_url`: Remote URL (url)
- `reblog.media_attachments[].description`: Alt Text
- `reblog.media_attachments[].meta`: Metadata
- `reblog.media_attachments[].meta.original`: Original
- `reblog.media_attachments[].meta.original.width`: Width (number)
- `reblog.media_attachments[].meta.original.height`: Height (number)
- `reblog.media_attachments[].meta.focus`: Focal Point
- `reblog.media_attachments[].meta.focus.x`: X (number)
- `reblog.media_attachments[].meta.focus.y`: Y (number)
- `reblog.mentions`: Mentions
- `reblog.mentions[].id`: Account ID
- `reblog.mentions[].username`: Username
- `reblog.mentions[].acct`: Handle
- `reblog.mentions[].url`: Profile URL (url)
- `reblog.tags`: Hashtags
- `reblog.tags[].name`: Name
- `reblog.tags[].url`: URL (url)
- `reblog.poll`: Poll
- `reblog.poll.id`: Poll ID
- `reblog.poll.expires_at`: Expires At (datetime)
- `reblog.poll.expired`: Expired (boolean)
- `reblog.poll.multiple`: Multiple Choice (boolean)
- `reblog.poll.votes_count`: Votes (number)
- `reblog.poll.voters_count`: Voters (number)
- `reblog.poll.voted`: Voted (boolean)
- `reblog.poll.own_votes`: Own Votes (Option Indexes)
- `reblog.poll.options`: Options
- `reblog.poll.options[].title`: Title
- `reblog.poll.options[].votes_count`: Votes (number)
- `reblog.card`: Link Preview
- `reblog.card.url`: URL (url)
- `reblog.card.title`: Title
- `reblog.card.description`: Description
- `reblog.card.type`: Type
- `reblog.card.language`: Language
- `reblog.card.provider_name`: Provider
- `reblog.card.author_name`: Author
- `reblog.card.image`: Image (image)
- `reblog.card.published_at`: Published At (datetime)
- `application`: Posted With
- `application.name`: App Name
- `application.website`: App Website (url)

### `delete_status`

**Delete Status.** Permanently deletes a status posted by the connected account and returns the deleted status including its source text (useful to redraft). Followers and remote servers may already have received it, so deletion cannot recall copies. Only works on your own posts; repeating the call fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_id` | string | yes |  | Status ID. ID of your own status to delete. Map it from a previous Post Status step (Status > Status ID), Create Status, Get Status or List Account Statuses. |
| `delete_media` | boolean | no | `false` | Delete Media Immediately. Delete the attached media right away instead of keeping it for about 24 hours for reuse. Requires Mastodon 4.4 or later; older servers ignore it. |

Output fields:

- `id`: Status ID
- `created_at`: Created At (datetime)
- `url`: URL (url)
- `uri`: ActivityPub URI (url)
- `spoiler_text`: Content Warning
- `sensitive`: Sensitive (boolean)
- `visibility`: Visibility
- `language`: Language
- `in_reply_to_id`: In Reply To Status ID
- `in_reply_to_account_id`: In Reply To Account ID
- `replies_count`: Replies (number)
- `reblogs_count`: Boosts (number)
- `favourites_count`: Favourites (number)
- `edited_at`: Edited At (datetime)
- `account`: Author
- `account.id`: Account ID
- `account.username`: Username
- `account.acct`: Handle
- `account.display_name`: Display Name
- `account.url`: Profile URL (url)
- `account.avatar`: Avatar (image)
- `account.bot`: Bot (boolean)
- `media_attachments`: Media Attachments
- `media_attachments[].id`: Media ID
- `media_attachments[].type`: Type
- `media_attachments[].url`: URL (url)
- `media_attachments[].preview_url`: Preview (image)
- `media_attachments[].remote_url`: Remote URL (url)
- `media_attachments[].description`: Alt Text
- `media_attachments[].meta`: Metadata
- `media_attachments[].meta.original`: Original
- `media_attachments[].meta.original.width`: Width (number)
- `media_attachments[].meta.original.height`: Height (number)
- `media_attachments[].meta.focus`: Focal Point
- `media_attachments[].meta.focus.x`: X (number)
- `media_attachments[].meta.focus.y`: Y (number)
- `mentions`: Mentions
- `mentions[].id`: Account ID
- `mentions[].username`: Username
- `mentions[].acct`: Handle
- `mentions[].url`: Profile URL (url)
- `tags`: Hashtags
- `tags[].name`: Name
- `tags[].url`: URL (url)
- `poll`: Poll
- `poll.id`: Poll ID
- `poll.expires_at`: Expires At (datetime)
- `poll.expired`: Expired (boolean)
- `poll.multiple`: Multiple Choice (boolean)
- `poll.votes_count`: Votes (number)
- `poll.voters_count`: Voters (number)
- `poll.voted`: Voted (boolean)
- `poll.own_votes`: Own Votes (Option Indexes)
- `poll.options`: Options
- `poll.options[].title`: Title
- `poll.options[].votes_count`: Votes (number)
- `card`: Link Preview
- `card.url`: URL (url)
- `card.title`: Title
- `card.description`: Description
- `card.type`: Type
- `card.language`: Language
- `card.provider_name`: Provider
- `card.author_name`: Author
- `card.image`: Image (image)
- `card.published_at`: Published At (datetime)
- `favourited`: Favourited by Me (boolean)
- `reblogged`: Boosted by Me (boolean)
- `bookmarked`: Bookmarked by Me (boolean)
- `muted`: Conversation Muted (boolean)
- `pinned`: Pinned to Profile (boolean)
- `reblog`: Boosted Status
- `reblog.id`: Status ID
- `reblog.created_at`: Created At (datetime)
- `reblog.url`: URL (url)
- `reblog.uri`: ActivityPub URI (url)
- `reblog.content`: Content (html)
- `reblog.spoiler_text`: Content Warning
- `reblog.sensitive`: Sensitive (boolean)
- `reblog.visibility`: Visibility
- `reblog.language`: Language
- `reblog.in_reply_to_id`: In Reply To Status ID
- `reblog.in_reply_to_account_id`: In Reply To Account ID
- `reblog.replies_count`: Replies (number)
- `reblog.reblogs_count`: Boosts (number)
- `reblog.favourites_count`: Favourites (number)
- `reblog.edited_at`: Edited At (datetime)
- `reblog.account`: Author
- `reblog.account.id`: Account ID
- `reblog.account.username`: Username
- `reblog.account.acct`: Handle
- `reblog.account.display_name`: Display Name
- `reblog.account.url`: Profile URL (url)
- `reblog.account.avatar`: Avatar (image)
- `reblog.account.bot`: Bot (boolean)
- `reblog.media_attachments`: Media Attachments
- `reblog.media_attachments[].id`: Media ID
- `reblog.media_attachments[].type`: Type
- `reblog.media_attachments[].url`: URL (url)
- `reblog.media_attachments[].preview_url`: Preview (image)
- `reblog.media_attachments[].remote_url`: Remote URL (url)
- `reblog.media_attachments[].description`: Alt Text
- `reblog.media_attachments[].meta`: Metadata
- `reblog.media_attachments[].meta.original`: Original
- `reblog.media_attachments[].meta.original.width`: Width (number)
- `reblog.media_attachments[].meta.original.height`: Height (number)
- `reblog.media_attachments[].meta.focus`: Focal Point
- `reblog.media_attachments[].meta.focus.x`: X (number)
- `reblog.media_attachments[].meta.focus.y`: Y (number)
- `reblog.mentions`: Mentions
- `reblog.mentions[].id`: Account ID
- `reblog.mentions[].username`: Username
- `reblog.mentions[].acct`: Handle
- `reblog.mentions[].url`: Profile URL (url)
- `reblog.tags`: Hashtags
- `reblog.tags[].name`: Name
- `reblog.tags[].url`: URL (url)
- `reblog.poll`: Poll
- `reblog.poll.id`: Poll ID
- `reblog.poll.expires_at`: Expires At (datetime)
- `reblog.poll.expired`: Expired (boolean)
- `reblog.poll.multiple`: Multiple Choice (boolean)
- `reblog.poll.votes_count`: Votes (number)
- `reblog.poll.voters_count`: Voters (number)
- `reblog.poll.voted`: Voted (boolean)
- `reblog.poll.own_votes`: Own Votes (Option Indexes)
- `reblog.poll.options`: Options
- `reblog.poll.options[].title`: Title
- `reblog.poll.options[].votes_count`: Votes (number)
- `reblog.card`: Link Preview
- `reblog.card.url`: URL (url)
- `reblog.card.title`: Title
- `reblog.card.description`: Description
- `reblog.card.type`: Type
- `reblog.card.language`: Language
- `reblog.card.provider_name`: Provider
- `reblog.card.author_name`: Author
- `reblog.card.image`: Image (image)
- `reblog.card.published_at`: Published At (datetime)
- `application`: Posted With
- `application.name`: App Name
- `application.website`: App Website (url)
- `text`: Source Text (for Redraft)

### `get_status_context`

**Get Status Thread.** Returns the conversation thread around a status: its ancestors (the posts it replies to) and descendants (replies). Use it to read a whole discussion before replying; use Get Status for just the one post. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_id` | string | yes |  | Status ID. Local ID of the status whose thread to read. Obtain it from a timeline, Get Status or Search. |

Output fields:

- `ancestors`: Ancestors
- `ancestors[].id`: Status ID
- `ancestors[].created_at`: Created At (datetime)
- `ancestors[].url`: URL (url)
- `ancestors[].uri`: ActivityPub URI (url)
- `ancestors[].content`: Content (html)
- `ancestors[].spoiler_text`: Content Warning
- `ancestors[].sensitive`: Sensitive (boolean)
- `ancestors[].visibility`: Visibility
- `ancestors[].language`: Language
- `ancestors[].in_reply_to_id`: In Reply To Status ID
- `ancestors[].in_reply_to_account_id`: In Reply To Account ID
- `ancestors[].replies_count`: Replies (number)
- `ancestors[].reblogs_count`: Boosts (number)
- `ancestors[].favourites_count`: Favourites (number)
- `ancestors[].edited_at`: Edited At (datetime)
- `ancestors[].account`: Author
- `ancestors[].account.id`: Account ID
- `ancestors[].account.username`: Username
- `ancestors[].account.acct`: Handle
- `ancestors[].account.display_name`: Display Name
- `ancestors[].account.url`: Profile URL (url)
- `ancestors[].account.avatar`: Avatar (image)
- `ancestors[].account.bot`: Bot (boolean)
- `ancestors[].media_attachments`: Media Attachments
- `ancestors[].media_attachments[].id`: Media ID
- `ancestors[].media_attachments[].type`: Type
- `ancestors[].media_attachments[].url`: URL (url)
- `ancestors[].media_attachments[].preview_url`: Preview (image)
- `ancestors[].media_attachments[].remote_url`: Remote URL (url)
- `ancestors[].media_attachments[].description`: Alt Text
- `ancestors[].media_attachments[].meta`: Metadata
- `ancestors[].media_attachments[].meta.original`: Original
- `ancestors[].media_attachments[].meta.original.width`: Width (number)
- `ancestors[].media_attachments[].meta.original.height`: Height (number)
- `ancestors[].media_attachments[].meta.focus`: Focal Point
- `ancestors[].media_attachments[].meta.focus.x`: X (number)
- `ancestors[].media_attachments[].meta.focus.y`: Y (number)
- `ancestors[].mentions`: Mentions
- `ancestors[].mentions[].id`: Account ID
- `ancestors[].mentions[].username`: Username
- `ancestors[].mentions[].acct`: Handle
- `ancestors[].mentions[].url`: Profile URL (url)
- `ancestors[].tags`: Hashtags
- `ancestors[].tags[].name`: Name
- `ancestors[].tags[].url`: URL (url)
- `ancestors[].poll`: Poll
- `ancestors[].poll.id`: Poll ID
- `ancestors[].poll.expires_at`: Expires At (datetime)
- `ancestors[].poll.expired`: Expired (boolean)
- `ancestors[].poll.multiple`: Multiple Choice (boolean)
- `ancestors[].poll.votes_count`: Votes (number)
- `ancestors[].poll.voters_count`: Voters (number)
- `ancestors[].poll.voted`: Voted (boolean)
- `ancestors[].poll.own_votes`: Own Votes (Option Indexes)
- `ancestors[].poll.options`: Options
- `ancestors[].poll.options[].title`: Title
- `ancestors[].poll.options[].votes_count`: Votes (number)
- `ancestors[].card`: Link Preview
- `ancestors[].card.url`: URL (url)
- `ancestors[].card.title`: Title
- `ancestors[].card.description`: Description
- `ancestors[].card.type`: Type
- `ancestors[].card.language`: Language
- `ancestors[].card.provider_name`: Provider
- `ancestors[].card.author_name`: Author
- `ancestors[].card.image`: Image (image)
- `ancestors[].card.published_at`: Published At (datetime)
- `ancestors[].favourited`: Favourited by Me (boolean)
- `ancestors[].reblogged`: Boosted by Me (boolean)
- `ancestors[].bookmarked`: Bookmarked by Me (boolean)
- `ancestors[].muted`: Conversation Muted (boolean)
- `ancestors[].pinned`: Pinned to Profile (boolean)
- `ancestors[].reblog`: Boosted Status
- `ancestors[].reblog.id`: Status ID
- `ancestors[].reblog.created_at`: Created At (datetime)
- `ancestors[].reblog.url`: URL (url)
- `ancestors[].reblog.uri`: ActivityPub URI (url)
- `ancestors[].reblog.content`: Content (html)
- `ancestors[].reblog.spoiler_text`: Content Warning
- `ancestors[].reblog.sensitive`: Sensitive (boolean)
- `ancestors[].reblog.visibility`: Visibility
- `ancestors[].reblog.language`: Language
- `ancestors[].reblog.in_reply_to_id`: In Reply To Status ID
- `ancestors[].reblog.in_reply_to_account_id`: In Reply To Account ID
- `ancestors[].reblog.replies_count`: Replies (number)
- `ancestors[].reblog.reblogs_count`: Boosts (number)
- `ancestors[].reblog.favourites_count`: Favourites (number)
- `ancestors[].reblog.edited_at`: Edited At (datetime)
- `ancestors[].reblog.account`: Author
- `ancestors[].reblog.account.id`: Account ID
- `ancestors[].reblog.account.username`: Username
- `ancestors[].reblog.account.acct`: Handle
- `ancestors[].reblog.account.display_name`: Display Name
- `ancestors[].reblog.account.url`: Profile URL (url)
- `ancestors[].reblog.account.avatar`: Avatar (image)
- `ancestors[].reblog.account.bot`: Bot (boolean)
- `ancestors[].reblog.media_attachments`: Media Attachments
- `ancestors[].reblog.media_attachments[].id`: Media ID
- `ancestors[].reblog.media_attachments[].type`: Type
- `ancestors[].reblog.media_attachments[].url`: URL (url)
- `ancestors[].reblog.media_attachments[].preview_url`: Preview (image)
- `ancestors[].reblog.media_attachments[].remote_url`: Remote URL (url)
- `ancestors[].reblog.media_attachments[].description`: Alt Text
- `ancestors[].reblog.media_attachments[].meta`: Metadata
- `ancestors[].reblog.media_attachments[].meta.original`: Original
- `ancestors[].reblog.media_attachments[].meta.original.width`: Width (number)
- `ancestors[].reblog.media_attachments[].meta.original.height`: Height (number)
- `ancestors[].reblog.media_attachments[].meta.focus`: Focal Point
- `ancestors[].reblog.media_attachments[].meta.focus.x`: X (number)
- `ancestors[].reblog.media_attachments[].meta.focus.y`: Y (number)
- `ancestors[].reblog.mentions`: Mentions
- `ancestors[].reblog.mentions[].id`: Account ID
- `ancestors[].reblog.mentions[].username`: Username
- `ancestors[].reblog.mentions[].acct`: Handle
- `ancestors[].reblog.mentions[].url`: Profile URL (url)
- `ancestors[].reblog.tags`: Hashtags
- `ancestors[].reblog.tags[].name`: Name
- `ancestors[].reblog.tags[].url`: URL (url)
- `ancestors[].reblog.poll`: Poll
- `ancestors[].reblog.poll.id`: Poll ID
- `ancestors[].reblog.poll.expires_at`: Expires At (datetime)
- `ancestors[].reblog.poll.expired`: Expired (boolean)
- `ancestors[].reblog.poll.multiple`: Multiple Choice (boolean)
- `ancestors[].reblog.poll.votes_count`: Votes (number)
- `ancestors[].reblog.poll.voters_count`: Voters (number)
- `ancestors[].reblog.poll.voted`: Voted (boolean)
- `ancestors[].reblog.poll.own_votes`: Own Votes (Option Indexes)
- `ancestors[].reblog.poll.options`: Options
- `ancestors[].reblog.poll.options[].title`: Title
- `ancestors[].reblog.poll.options[].votes_count`: Votes (number)
- `ancestors[].reblog.card`: Link Preview
- `ancestors[].reblog.card.url`: URL (url)
- `ancestors[].reblog.card.title`: Title
- `ancestors[].reblog.card.description`: Description
- `ancestors[].reblog.card.type`: Type
- `ancestors[].reblog.card.language`: Language
- `ancestors[].reblog.card.provider_name`: Provider
- `ancestors[].reblog.card.author_name`: Author
- `ancestors[].reblog.card.image`: Image (image)
- `ancestors[].reblog.card.published_at`: Published At (datetime)
- `ancestors[].application`: Posted With
- `ancestors[].application.name`: App Name
- `ancestors[].application.website`: App Website (url)
- `descendants`: Replies
- `descendants[].id`: Status ID
- `descendants[].created_at`: Created At (datetime)
- `descendants[].url`: URL (url)
- `descendants[].uri`: ActivityPub URI (url)
- `descendants[].content`: Content (html)
- `descendants[].spoiler_text`: Content Warning
- `descendants[].sensitive`: Sensitive (boolean)
- `descendants[].visibility`: Visibility
- `descendants[].language`: Language
- `descendants[].in_reply_to_id`: In Reply To Status ID
- `descendants[].in_reply_to_account_id`: In Reply To Account ID
- `descendants[].replies_count`: Replies (number)
- `descendants[].reblogs_count`: Boosts (number)
- `descendants[].favourites_count`: Favourites (number)
- `descendants[].edited_at`: Edited At (datetime)
- `descendants[].account`: Author
- `descendants[].account.id`: Account ID
- `descendants[].account.username`: Username
- `descendants[].account.acct`: Handle
- `descendants[].account.display_name`: Display Name
- `descendants[].account.url`: Profile URL (url)
- `descendants[].account.avatar`: Avatar (image)
- `descendants[].account.bot`: Bot (boolean)
- `descendants[].media_attachments`: Media Attachments
- `descendants[].media_attachments[].id`: Media ID
- `descendants[].media_attachments[].type`: Type
- `descendants[].media_attachments[].url`: URL (url)
- `descendants[].media_attachments[].preview_url`: Preview (image)
- `descendants[].media_attachments[].remote_url`: Remote URL (url)
- `descendants[].media_attachments[].description`: Alt Text
- `descendants[].media_attachments[].meta`: Metadata
- `descendants[].media_attachments[].meta.original`: Original
- `descendants[].media_attachments[].meta.original.width`: Width (number)
- `descendants[].media_attachments[].meta.original.height`: Height (number)
- `descendants[].media_attachments[].meta.focus`: Focal Point
- `descendants[].media_attachments[].meta.focus.x`: X (number)
- `descendants[].media_attachments[].meta.focus.y`: Y (number)
- `descendants[].mentions`: Mentions
- `descendants[].mentions[].id`: Account ID
- `descendants[].mentions[].username`: Username
- `descendants[].mentions[].acct`: Handle
- `descendants[].mentions[].url`: Profile URL (url)
- `descendants[].tags`: Hashtags
- `descendants[].tags[].name`: Name
- `descendants[].tags[].url`: URL (url)
- `descendants[].poll`: Poll
- `descendants[].poll.id`: Poll ID
- `descendants[].poll.expires_at`: Expires At (datetime)
- `descendants[].poll.expired`: Expired (boolean)
- `descendants[].poll.multiple`: Multiple Choice (boolean)
- `descendants[].poll.votes_count`: Votes (number)
- `descendants[].poll.voters_count`: Voters (number)
- `descendants[].poll.voted`: Voted (boolean)
- `descendants[].poll.own_votes`: Own Votes (Option Indexes)
- `descendants[].poll.options`: Options
- `descendants[].poll.options[].title`: Title
- `descendants[].poll.options[].votes_count`: Votes (number)
- `descendants[].card`: Link Preview
- `descendants[].card.url`: URL (url)
- `descendants[].card.title`: Title
- `descendants[].card.description`: Description
- `descendants[].card.type`: Type
- `descendants[].card.language`: Language
- `descendants[].card.provider_name`: Provider
- `descendants[].card.author_name`: Author
- `descendants[].card.image`: Image (image)
- `descendants[].card.published_at`: Published At (datetime)
- `descendants[].favourited`: Favourited by Me (boolean)
- `descendants[].reblogged`: Boosted by Me (boolean)
- `descendants[].bookmarked`: Bookmarked by Me (boolean)
- `descendants[].muted`: Conversation Muted (boolean)
- `descendants[].pinned`: Pinned to Profile (boolean)
- `descendants[].reblog`: Boosted Status
- `descendants[].reblog.id`: Status ID
- `descendants[].reblog.created_at`: Created At (datetime)
- `descendants[].reblog.url`: URL (url)
- `descendants[].reblog.uri`: ActivityPub URI (url)
- `descendants[].reblog.content`: Content (html)
- `descendants[].reblog.spoiler_text`: Content Warning
- `descendants[].reblog.sensitive`: Sensitive (boolean)
- `descendants[].reblog.visibility`: Visibility
- `descendants[].reblog.language`: Language
- `descendants[].reblog.in_reply_to_id`: In Reply To Status ID
- `descendants[].reblog.in_reply_to_account_id`: In Reply To Account ID
- `descendants[].reblog.replies_count`: Replies (number)
- `descendants[].reblog.reblogs_count`: Boosts (number)
- `descendants[].reblog.favourites_count`: Favourites (number)
- `descendants[].reblog.edited_at`: Edited At (datetime)
- `descendants[].reblog.account`: Author
- `descendants[].reblog.account.id`: Account ID
- `descendants[].reblog.account.username`: Username
- `descendants[].reblog.account.acct`: Handle
- `descendants[].reblog.account.display_name`: Display Name
- `descendants[].reblog.account.url`: Profile URL (url)
- `descendants[].reblog.account.avatar`: Avatar (image)
- `descendants[].reblog.account.bot`: Bot (boolean)
- `descendants[].reblog.media_attachments`: Media Attachments
- `descendants[].reblog.media_attachments[].id`: Media ID
- `descendants[].reblog.media_attachments[].type`: Type
- `descendants[].reblog.media_attachments[].url`: URL (url)
- `descendants[].reblog.media_attachments[].preview_url`: Preview (image)
- `descendants[].reblog.media_attachments[].remote_url`: Remote URL (url)
- `descendants[].reblog.media_attachments[].description`: Alt Text
- `descendants[].reblog.media_attachments[].meta`: Metadata
- `descendants[].reblog.media_attachments[].meta.original`: Original
- `descendants[].reblog.media_attachments[].meta.original.width`: Width (number)
- `descendants[].reblog.media_attachments[].meta.original.height`: Height (number)
- `descendants[].reblog.media_attachments[].meta.focus`: Focal Point
- `descendants[].reblog.media_attachments[].meta.focus.x`: X (number)
- `descendants[].reblog.media_attachments[].meta.focus.y`: Y (number)
- `descendants[].reblog.mentions`: Mentions
- `descendants[].reblog.mentions[].id`: Account ID
- `descendants[].reblog.mentions[].username`: Username
- `descendants[].reblog.mentions[].acct`: Handle
- `descendants[].reblog.mentions[].url`: Profile URL (url)
- `descendants[].reblog.tags`: Hashtags
- `descendants[].reblog.tags[].name`: Name
- `descendants[].reblog.tags[].url`: URL (url)
- `descendants[].reblog.poll`: Poll
- `descendants[].reblog.poll.id`: Poll ID
- `descendants[].reblog.poll.expires_at`: Expires At (datetime)
- `descendants[].reblog.poll.expired`: Expired (boolean)
- `descendants[].reblog.poll.multiple`: Multiple Choice (boolean)
- `descendants[].reblog.poll.votes_count`: Votes (number)
- `descendants[].reblog.poll.voters_count`: Voters (number)
- `descendants[].reblog.poll.voted`: Voted (boolean)
- `descendants[].reblog.poll.own_votes`: Own Votes (Option Indexes)
- `descendants[].reblog.poll.options`: Options
- `descendants[].reblog.poll.options[].title`: Title
- `descendants[].reblog.poll.options[].votes_count`: Votes (number)
- `descendants[].reblog.card`: Link Preview
- `descendants[].reblog.card.url`: URL (url)
- `descendants[].reblog.card.title`: Title
- `descendants[].reblog.card.description`: Description
- `descendants[].reblog.card.type`: Type
- `descendants[].reblog.card.language`: Language
- `descendants[].reblog.card.provider_name`: Provider
- `descendants[].reblog.card.author_name`: Author
- `descendants[].reblog.card.image`: Image (image)
- `descendants[].reblog.card.published_at`: Published At (datetime)
- `descendants[].application`: Posted With
- `descendants[].application.name`: App Name
- `descendants[].application.website`: App Website (url)

### `list_status_boosted_by`

**List Accounts That Boosted a Status.** Returns one page of accounts that boosted a given status, with cursors for further pages (pass next_max_id as Max ID, prev_since_id as Since ID). Use List Accounts That Favourited a Status for favourites. Needs the read:accounts scope. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_id` | string | yes |  | Status ID. Local ID of the status. Obtain it from a timeline, Get Status or Search. |
| `limit` | number | no |  | Limit. Maximum number of accounts to return in this page. Defaults to 40, maximum 80. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |

Output fields:

- `accounts`: Accounts
- `accounts[].id`: Account ID
- `accounts[].username`: Username
- `accounts[].acct`: Handle
- `accounts[].display_name`: Display Name
- `accounts[].note`: Bio (html)
- `accounts[].url`: Profile URL (url)
- `accounts[].uri`: ActivityPub URI (url)
- `accounts[].avatar`: Avatar (image)
- `accounts[].header`: Header Image (image)
- `accounts[].locked`: Requires Follow Approval (boolean)
- `accounts[].bot`: Bot (boolean)
- `accounts[].group`: Group (boolean)
- `accounts[].discoverable`: Discoverable (boolean)
- `accounts[].indexable`: Indexable (boolean)
- `accounts[].created_at`: Created At (datetime)
- `accounts[].last_status_at`: Last Status Date (date)
- `accounts[].followers_count`: Followers (number)
- `accounts[].following_count`: Following (number)
- `accounts[].statuses_count`: Statuses (number)
- `accounts[].fields`: Profile Fields
- `accounts[].fields[].name`: Name
- `accounts[].fields[].value`: Value (html)
- `accounts[].fields[].verified_at`: Verified At (datetime)
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `list_status_favourited_by`

**List Accounts That Favourited a Status.** Returns one page of accounts that favourited a given status, with cursors for further pages (pass next_max_id as Max ID, prev_since_id as Since ID). Use List Accounts That Boosted a Status for boosts. Needs the read:accounts scope. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_id` | string | yes |  | Status ID. Local ID of the status. Obtain it from a timeline, Get Status or Search. |
| `limit` | number | no |  | Limit. Maximum number of accounts to return in this page. Defaults to 40, maximum 80. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |

Output fields:

- `accounts`: Accounts
- `accounts[].id`: Account ID
- `accounts[].username`: Username
- `accounts[].acct`: Handle
- `accounts[].display_name`: Display Name
- `accounts[].note`: Bio (html)
- `accounts[].url`: Profile URL (url)
- `accounts[].uri`: ActivityPub URI (url)
- `accounts[].avatar`: Avatar (image)
- `accounts[].header`: Header Image (image)
- `accounts[].locked`: Requires Follow Approval (boolean)
- `accounts[].bot`: Bot (boolean)
- `accounts[].group`: Group (boolean)
- `accounts[].discoverable`: Discoverable (boolean)
- `accounts[].indexable`: Indexable (boolean)
- `accounts[].created_at`: Created At (datetime)
- `accounts[].last_status_at`: Last Status Date (date)
- `accounts[].followers_count`: Followers (number)
- `accounts[].following_count`: Following (number)
- `accounts[].statuses_count`: Statuses (number)
- `accounts[].fields`: Profile Fields
- `accounts[].fields[].name`: Name
- `accounts[].fields[].value`: Value (html)
- `accounts[].fields[].verified_at`: Verified At (datetime)
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `favourite_status`

**Favourite Status.** Favourites (likes) a status as the connected account; the author is notified. Use Bookmark Status to save privately instead. Favouriting an already-favourited status changes nothing, so it is safe to retry. Returns the updated status. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_id` | string | yes |  | Status ID. ID of the status to favourite, for example 109372843234737004. Map it from a trigger such as New Mention (Related Status > Status ID), a timeline, Get Status or Search (Search turns a status URL from another server into an ID). |

Output fields:

- `id`: Status ID
- `created_at`: Created At (datetime)
- `url`: URL (url)
- `uri`: ActivityPub URI (url)
- `content`: Content (html)
- `spoiler_text`: Content Warning
- `sensitive`: Sensitive (boolean)
- `visibility`: Visibility
- `language`: Language
- `in_reply_to_id`: In Reply To Status ID
- `in_reply_to_account_id`: In Reply To Account ID
- `replies_count`: Replies (number)
- `reblogs_count`: Boosts (number)
- `favourites_count`: Favourites (number)
- `edited_at`: Edited At (datetime)
- `account`: Author
- `account.id`: Account ID
- `account.username`: Username
- `account.acct`: Handle
- `account.display_name`: Display Name
- `account.url`: Profile URL (url)
- `account.avatar`: Avatar (image)
- `account.bot`: Bot (boolean)
- `media_attachments`: Media Attachments
- `media_attachments[].id`: Media ID
- `media_attachments[].type`: Type
- `media_attachments[].url`: URL (url)
- `media_attachments[].preview_url`: Preview (image)
- `media_attachments[].remote_url`: Remote URL (url)
- `media_attachments[].description`: Alt Text
- `media_attachments[].meta`: Metadata
- `media_attachments[].meta.original`: Original
- `media_attachments[].meta.original.width`: Width (number)
- `media_attachments[].meta.original.height`: Height (number)
- `media_attachments[].meta.focus`: Focal Point
- `media_attachments[].meta.focus.x`: X (number)
- `media_attachments[].meta.focus.y`: Y (number)
- `mentions`: Mentions
- `mentions[].id`: Account ID
- `mentions[].username`: Username
- `mentions[].acct`: Handle
- `mentions[].url`: Profile URL (url)
- `tags`: Hashtags
- `tags[].name`: Name
- `tags[].url`: URL (url)
- `poll`: Poll
- `poll.id`: Poll ID
- `poll.expires_at`: Expires At (datetime)
- `poll.expired`: Expired (boolean)
- `poll.multiple`: Multiple Choice (boolean)
- `poll.votes_count`: Votes (number)
- `poll.voters_count`: Voters (number)
- `poll.voted`: Voted (boolean)
- `poll.own_votes`: Own Votes (Option Indexes)
- `poll.options`: Options
- `poll.options[].title`: Title
- `poll.options[].votes_count`: Votes (number)
- `card`: Link Preview
- `card.url`: URL (url)
- `card.title`: Title
- `card.description`: Description
- `card.type`: Type
- `card.language`: Language
- `card.provider_name`: Provider
- `card.author_name`: Author
- `card.image`: Image (image)
- `card.published_at`: Published At (datetime)
- `favourited`: Favourited by Me (boolean)
- `reblogged`: Boosted by Me (boolean)
- `bookmarked`: Bookmarked by Me (boolean)
- `muted`: Conversation Muted (boolean)
- `pinned`: Pinned to Profile (boolean)
- `reblog`: Boosted Status
- `reblog.id`: Status ID
- `reblog.created_at`: Created At (datetime)
- `reblog.url`: URL (url)
- `reblog.uri`: ActivityPub URI (url)
- `reblog.content`: Content (html)
- `reblog.spoiler_text`: Content Warning
- `reblog.sensitive`: Sensitive (boolean)
- `reblog.visibility`: Visibility
- `reblog.language`: Language
- `reblog.in_reply_to_id`: In Reply To Status ID
- `reblog.in_reply_to_account_id`: In Reply To Account ID
- `reblog.replies_count`: Replies (number)
- `reblog.reblogs_count`: Boosts (number)
- `reblog.favourites_count`: Favourites (number)
- `reblog.edited_at`: Edited At (datetime)
- `reblog.account`: Author
- `reblog.account.id`: Account ID
- `reblog.account.username`: Username
- `reblog.account.acct`: Handle
- `reblog.account.display_name`: Display Name
- `reblog.account.url`: Profile URL (url)
- `reblog.account.avatar`: Avatar (image)
- `reblog.account.bot`: Bot (boolean)
- `reblog.media_attachments`: Media Attachments
- `reblog.media_attachments[].id`: Media ID
- `reblog.media_attachments[].type`: Type
- `reblog.media_attachments[].url`: URL (url)
- `reblog.media_attachments[].preview_url`: Preview (image)
- `reblog.media_attachments[].remote_url`: Remote URL (url)
- `reblog.media_attachments[].description`: Alt Text
- `reblog.media_attachments[].meta`: Metadata
- `reblog.media_attachments[].meta.original`: Original
- `reblog.media_attachments[].meta.original.width`: Width (number)
- `reblog.media_attachments[].meta.original.height`: Height (number)
- `reblog.media_attachments[].meta.focus`: Focal Point
- `reblog.media_attachments[].meta.focus.x`: X (number)
- `reblog.media_attachments[].meta.focus.y`: Y (number)
- `reblog.mentions`: Mentions
- `reblog.mentions[].id`: Account ID
- `reblog.mentions[].username`: Username
- `reblog.mentions[].acct`: Handle
- `reblog.mentions[].url`: Profile URL (url)
- `reblog.tags`: Hashtags
- `reblog.tags[].name`: Name
- `reblog.tags[].url`: URL (url)
- `reblog.poll`: Poll
- `reblog.poll.id`: Poll ID
- `reblog.poll.expires_at`: Expires At (datetime)
- `reblog.poll.expired`: Expired (boolean)
- `reblog.poll.multiple`: Multiple Choice (boolean)
- `reblog.poll.votes_count`: Votes (number)
- `reblog.poll.voters_count`: Voters (number)
- `reblog.poll.voted`: Voted (boolean)
- `reblog.poll.own_votes`: Own Votes (Option Indexes)
- `reblog.poll.options`: Options
- `reblog.poll.options[].title`: Title
- `reblog.poll.options[].votes_count`: Votes (number)
- `reblog.card`: Link Preview
- `reblog.card.url`: URL (url)
- `reblog.card.title`: Title
- `reblog.card.description`: Description
- `reblog.card.type`: Type
- `reblog.card.language`: Language
- `reblog.card.provider_name`: Provider
- `reblog.card.author_name`: Author
- `reblog.card.image`: Image (image)
- `reblog.card.published_at`: Published At (datetime)
- `application`: Posted With
- `application.name`: App Name
- `application.website`: App Website (url)

### `unfavourite_status`

**Unfavourite Status.** Removes the connected account's favourite from a status. Safe to retry; unfavouriting a status that is not favourited changes nothing. Returns the updated status. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_id` | string | yes |  | Status ID. Local ID of the status on this server, for example 109372843234737004. Obtain it from a timeline, Get Status or Search (use resolve for a status URL from another server). |

Output fields:

- `id`: Status ID
- `created_at`: Created At (datetime)
- `url`: URL (url)
- `uri`: ActivityPub URI (url)
- `content`: Content (html)
- `spoiler_text`: Content Warning
- `sensitive`: Sensitive (boolean)
- `visibility`: Visibility
- `language`: Language
- `in_reply_to_id`: In Reply To Status ID
- `in_reply_to_account_id`: In Reply To Account ID
- `replies_count`: Replies (number)
- `reblogs_count`: Boosts (number)
- `favourites_count`: Favourites (number)
- `edited_at`: Edited At (datetime)
- `account`: Author
- `account.id`: Account ID
- `account.username`: Username
- `account.acct`: Handle
- `account.display_name`: Display Name
- `account.url`: Profile URL (url)
- `account.avatar`: Avatar (image)
- `account.bot`: Bot (boolean)
- `media_attachments`: Media Attachments
- `media_attachments[].id`: Media ID
- `media_attachments[].type`: Type
- `media_attachments[].url`: URL (url)
- `media_attachments[].preview_url`: Preview (image)
- `media_attachments[].remote_url`: Remote URL (url)
- `media_attachments[].description`: Alt Text
- `media_attachments[].meta`: Metadata
- `media_attachments[].meta.original`: Original
- `media_attachments[].meta.original.width`: Width (number)
- `media_attachments[].meta.original.height`: Height (number)
- `media_attachments[].meta.focus`: Focal Point
- `media_attachments[].meta.focus.x`: X (number)
- `media_attachments[].meta.focus.y`: Y (number)
- `mentions`: Mentions
- `mentions[].id`: Account ID
- `mentions[].username`: Username
- `mentions[].acct`: Handle
- `mentions[].url`: Profile URL (url)
- `tags`: Hashtags
- `tags[].name`: Name
- `tags[].url`: URL (url)
- `poll`: Poll
- `poll.id`: Poll ID
- `poll.expires_at`: Expires At (datetime)
- `poll.expired`: Expired (boolean)
- `poll.multiple`: Multiple Choice (boolean)
- `poll.votes_count`: Votes (number)
- `poll.voters_count`: Voters (number)
- `poll.voted`: Voted (boolean)
- `poll.own_votes`: Own Votes (Option Indexes)
- `poll.options`: Options
- `poll.options[].title`: Title
- `poll.options[].votes_count`: Votes (number)
- `card`: Link Preview
- `card.url`: URL (url)
- `card.title`: Title
- `card.description`: Description
- `card.type`: Type
- `card.language`: Language
- `card.provider_name`: Provider
- `card.author_name`: Author
- `card.image`: Image (image)
- `card.published_at`: Published At (datetime)
- `favourited`: Favourited by Me (boolean)
- `reblogged`: Boosted by Me (boolean)
- `bookmarked`: Bookmarked by Me (boolean)
- `muted`: Conversation Muted (boolean)
- `pinned`: Pinned to Profile (boolean)
- `reblog`: Boosted Status
- `reblog.id`: Status ID
- `reblog.created_at`: Created At (datetime)
- `reblog.url`: URL (url)
- `reblog.uri`: ActivityPub URI (url)
- `reblog.content`: Content (html)
- `reblog.spoiler_text`: Content Warning
- `reblog.sensitive`: Sensitive (boolean)
- `reblog.visibility`: Visibility
- `reblog.language`: Language
- `reblog.in_reply_to_id`: In Reply To Status ID
- `reblog.in_reply_to_account_id`: In Reply To Account ID
- `reblog.replies_count`: Replies (number)
- `reblog.reblogs_count`: Boosts (number)
- `reblog.favourites_count`: Favourites (number)
- `reblog.edited_at`: Edited At (datetime)
- `reblog.account`: Author
- `reblog.account.id`: Account ID
- `reblog.account.username`: Username
- `reblog.account.acct`: Handle
- `reblog.account.display_name`: Display Name
- `reblog.account.url`: Profile URL (url)
- `reblog.account.avatar`: Avatar (image)
- `reblog.account.bot`: Bot (boolean)
- `reblog.media_attachments`: Media Attachments
- `reblog.media_attachments[].id`: Media ID
- `reblog.media_attachments[].type`: Type
- `reblog.media_attachments[].url`: URL (url)
- `reblog.media_attachments[].preview_url`: Preview (image)
- `reblog.media_attachments[].remote_url`: Remote URL (url)
- `reblog.media_attachments[].description`: Alt Text
- `reblog.media_attachments[].meta`: Metadata
- `reblog.media_attachments[].meta.original`: Original
- `reblog.media_attachments[].meta.original.width`: Width (number)
- `reblog.media_attachments[].meta.original.height`: Height (number)
- `reblog.media_attachments[].meta.focus`: Focal Point
- `reblog.media_attachments[].meta.focus.x`: X (number)
- `reblog.media_attachments[].meta.focus.y`: Y (number)
- `reblog.mentions`: Mentions
- `reblog.mentions[].id`: Account ID
- `reblog.mentions[].username`: Username
- `reblog.mentions[].acct`: Handle
- `reblog.mentions[].url`: Profile URL (url)
- `reblog.tags`: Hashtags
- `reblog.tags[].name`: Name
- `reblog.tags[].url`: URL (url)
- `reblog.poll`: Poll
- `reblog.poll.id`: Poll ID
- `reblog.poll.expires_at`: Expires At (datetime)
- `reblog.poll.expired`: Expired (boolean)
- `reblog.poll.multiple`: Multiple Choice (boolean)
- `reblog.poll.votes_count`: Votes (number)
- `reblog.poll.voters_count`: Voters (number)
- `reblog.poll.voted`: Voted (boolean)
- `reblog.poll.own_votes`: Own Votes (Option Indexes)
- `reblog.poll.options`: Options
- `reblog.poll.options[].title`: Title
- `reblog.poll.options[].votes_count`: Votes (number)
- `reblog.card`: Link Preview
- `reblog.card.url`: URL (url)
- `reblog.card.title`: Title
- `reblog.card.description`: Description
- `reblog.card.type`: Type
- `reblog.card.language`: Language
- `reblog.card.provider_name`: Provider
- `reblog.card.author_name`: Author
- `reblog.card.image`: Image (image)
- `reblog.card.published_at`: Published At (datetime)
- `application`: Posted With
- `application.name`: App Name
- `application.website`: App Website (url)

### `boost_status`

**Boost Status.** Boosts (reblogs) a status so it appears to the connected account's followers and the author is notified. Visibility defaults to the account's default posting privacy, not public; set it explicitly to control reach. Boosting an already-boosted status returns the existing boost, so it is safe to retry. Use Unboost Status to undo. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_id` | string | yes |  | Status ID. ID of the status to boost, for example 109372843234737004. Map it from a trigger such as New Status with Hashtag (Status ID), a timeline, Get Status or Search (Search turns a status URL from another server into an ID). |
| `visibility` | string | no |  | Visibility. Who sees the boost. Leave empty to use the account default posting privacy. One of `"public"`, `"unlisted"`, `"private"`. |

Output fields:

- `id`: Status ID
- `created_at`: Created At (datetime)
- `url`: URL (url)
- `uri`: ActivityPub URI (url)
- `content`: Content (html)
- `spoiler_text`: Content Warning
- `sensitive`: Sensitive (boolean)
- `visibility`: Visibility
- `language`: Language
- `in_reply_to_id`: In Reply To Status ID
- `in_reply_to_account_id`: In Reply To Account ID
- `replies_count`: Replies (number)
- `reblogs_count`: Boosts (number)
- `favourites_count`: Favourites (number)
- `edited_at`: Edited At (datetime)
- `account`: Author
- `account.id`: Account ID
- `account.username`: Username
- `account.acct`: Handle
- `account.display_name`: Display Name
- `account.url`: Profile URL (url)
- `account.avatar`: Avatar (image)
- `account.bot`: Bot (boolean)
- `media_attachments`: Media Attachments
- `media_attachments[].id`: Media ID
- `media_attachments[].type`: Type
- `media_attachments[].url`: URL (url)
- `media_attachments[].preview_url`: Preview (image)
- `media_attachments[].remote_url`: Remote URL (url)
- `media_attachments[].description`: Alt Text
- `media_attachments[].meta`: Metadata
- `media_attachments[].meta.original`: Original
- `media_attachments[].meta.original.width`: Width (number)
- `media_attachments[].meta.original.height`: Height (number)
- `media_attachments[].meta.focus`: Focal Point
- `media_attachments[].meta.focus.x`: X (number)
- `media_attachments[].meta.focus.y`: Y (number)
- `mentions`: Mentions
- `mentions[].id`: Account ID
- `mentions[].username`: Username
- `mentions[].acct`: Handle
- `mentions[].url`: Profile URL (url)
- `tags`: Hashtags
- `tags[].name`: Name
- `tags[].url`: URL (url)
- `poll`: Poll
- `poll.id`: Poll ID
- `poll.expires_at`: Expires At (datetime)
- `poll.expired`: Expired (boolean)
- `poll.multiple`: Multiple Choice (boolean)
- `poll.votes_count`: Votes (number)
- `poll.voters_count`: Voters (number)
- `poll.voted`: Voted (boolean)
- `poll.own_votes`: Own Votes (Option Indexes)
- `poll.options`: Options
- `poll.options[].title`: Title
- `poll.options[].votes_count`: Votes (number)
- `card`: Link Preview
- `card.url`: URL (url)
- `card.title`: Title
- `card.description`: Description
- `card.type`: Type
- `card.language`: Language
- `card.provider_name`: Provider
- `card.author_name`: Author
- `card.image`: Image (image)
- `card.published_at`: Published At (datetime)
- `favourited`: Favourited by Me (boolean)
- `reblogged`: Boosted by Me (boolean)
- `bookmarked`: Bookmarked by Me (boolean)
- `muted`: Conversation Muted (boolean)
- `pinned`: Pinned to Profile (boolean)
- `reblog`: Boosted Status
- `reblog.id`: Status ID
- `reblog.created_at`: Created At (datetime)
- `reblog.url`: URL (url)
- `reblog.uri`: ActivityPub URI (url)
- `reblog.content`: Content (html)
- `reblog.spoiler_text`: Content Warning
- `reblog.sensitive`: Sensitive (boolean)
- `reblog.visibility`: Visibility
- `reblog.language`: Language
- `reblog.in_reply_to_id`: In Reply To Status ID
- `reblog.in_reply_to_account_id`: In Reply To Account ID
- `reblog.replies_count`: Replies (number)
- `reblog.reblogs_count`: Boosts (number)
- `reblog.favourites_count`: Favourites (number)
- `reblog.edited_at`: Edited At (datetime)
- `reblog.account`: Author
- `reblog.account.id`: Account ID
- `reblog.account.username`: Username
- `reblog.account.acct`: Handle
- `reblog.account.display_name`: Display Name
- `reblog.account.url`: Profile URL (url)
- `reblog.account.avatar`: Avatar (image)
- `reblog.account.bot`: Bot (boolean)
- `reblog.media_attachments`: Media Attachments
- `reblog.media_attachments[].id`: Media ID
- `reblog.media_attachments[].type`: Type
- `reblog.media_attachments[].url`: URL (url)
- `reblog.media_attachments[].preview_url`: Preview (image)
- `reblog.media_attachments[].remote_url`: Remote URL (url)
- `reblog.media_attachments[].description`: Alt Text
- `reblog.media_attachments[].meta`: Metadata
- `reblog.media_attachments[].meta.original`: Original
- `reblog.media_attachments[].meta.original.width`: Width (number)
- `reblog.media_attachments[].meta.original.height`: Height (number)
- `reblog.media_attachments[].meta.focus`: Focal Point
- `reblog.media_attachments[].meta.focus.x`: X (number)
- `reblog.media_attachments[].meta.focus.y`: Y (number)
- `reblog.mentions`: Mentions
- `reblog.mentions[].id`: Account ID
- `reblog.mentions[].username`: Username
- `reblog.mentions[].acct`: Handle
- `reblog.mentions[].url`: Profile URL (url)
- `reblog.tags`: Hashtags
- `reblog.tags[].name`: Name
- `reblog.tags[].url`: URL (url)
- `reblog.poll`: Poll
- `reblog.poll.id`: Poll ID
- `reblog.poll.expires_at`: Expires At (datetime)
- `reblog.poll.expired`: Expired (boolean)
- `reblog.poll.multiple`: Multiple Choice (boolean)
- `reblog.poll.votes_count`: Votes (number)
- `reblog.poll.voters_count`: Voters (number)
- `reblog.poll.voted`: Voted (boolean)
- `reblog.poll.own_votes`: Own Votes (Option Indexes)
- `reblog.poll.options`: Options
- `reblog.poll.options[].title`: Title
- `reblog.poll.options[].votes_count`: Votes (number)
- `reblog.card`: Link Preview
- `reblog.card.url`: URL (url)
- `reblog.card.title`: Title
- `reblog.card.description`: Description
- `reblog.card.type`: Type
- `reblog.card.language`: Language
- `reblog.card.provider_name`: Provider
- `reblog.card.author_name`: Author
- `reblog.card.image`: Image (image)
- `reblog.card.published_at`: Published At (datetime)
- `application`: Posted With
- `application.name`: App Name
- `application.website`: App Website (url)

### `unboost_status`

**Unboost Status.** Removes the connected account's boost of a status. Pass the original status ID, not the ID of the boost itself. Safe to retry; counts against the rate limit of 30 deletes and unboosts per 30 minutes. Returns the original status. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_id` | string | yes |  | Status ID. Local ID of the status on this server, for example 109372843234737004. Obtain it from a timeline, Get Status or Search (use resolve for a status URL from another server). |

Output fields:

- `id`: Status ID
- `created_at`: Created At (datetime)
- `url`: URL (url)
- `uri`: ActivityPub URI (url)
- `content`: Content (html)
- `spoiler_text`: Content Warning
- `sensitive`: Sensitive (boolean)
- `visibility`: Visibility
- `language`: Language
- `in_reply_to_id`: In Reply To Status ID
- `in_reply_to_account_id`: In Reply To Account ID
- `replies_count`: Replies (number)
- `reblogs_count`: Boosts (number)
- `favourites_count`: Favourites (number)
- `edited_at`: Edited At (datetime)
- `account`: Author
- `account.id`: Account ID
- `account.username`: Username
- `account.acct`: Handle
- `account.display_name`: Display Name
- `account.url`: Profile URL (url)
- `account.avatar`: Avatar (image)
- `account.bot`: Bot (boolean)
- `media_attachments`: Media Attachments
- `media_attachments[].id`: Media ID
- `media_attachments[].type`: Type
- `media_attachments[].url`: URL (url)
- `media_attachments[].preview_url`: Preview (image)
- `media_attachments[].remote_url`: Remote URL (url)
- `media_attachments[].description`: Alt Text
- `media_attachments[].meta`: Metadata
- `media_attachments[].meta.original`: Original
- `media_attachments[].meta.original.width`: Width (number)
- `media_attachments[].meta.original.height`: Height (number)
- `media_attachments[].meta.focus`: Focal Point
- `media_attachments[].meta.focus.x`: X (number)
- `media_attachments[].meta.focus.y`: Y (number)
- `mentions`: Mentions
- `mentions[].id`: Account ID
- `mentions[].username`: Username
- `mentions[].acct`: Handle
- `mentions[].url`: Profile URL (url)
- `tags`: Hashtags
- `tags[].name`: Name
- `tags[].url`: URL (url)
- `poll`: Poll
- `poll.id`: Poll ID
- `poll.expires_at`: Expires At (datetime)
- `poll.expired`: Expired (boolean)
- `poll.multiple`: Multiple Choice (boolean)
- `poll.votes_count`: Votes (number)
- `poll.voters_count`: Voters (number)
- `poll.voted`: Voted (boolean)
- `poll.own_votes`: Own Votes (Option Indexes)
- `poll.options`: Options
- `poll.options[].title`: Title
- `poll.options[].votes_count`: Votes (number)
- `card`: Link Preview
- `card.url`: URL (url)
- `card.title`: Title
- `card.description`: Description
- `card.type`: Type
- `card.language`: Language
- `card.provider_name`: Provider
- `card.author_name`: Author
- `card.image`: Image (image)
- `card.published_at`: Published At (datetime)
- `favourited`: Favourited by Me (boolean)
- `reblogged`: Boosted by Me (boolean)
- `bookmarked`: Bookmarked by Me (boolean)
- `muted`: Conversation Muted (boolean)
- `pinned`: Pinned to Profile (boolean)
- `reblog`: Boosted Status
- `reblog.id`: Status ID
- `reblog.created_at`: Created At (datetime)
- `reblog.url`: URL (url)
- `reblog.uri`: ActivityPub URI (url)
- `reblog.content`: Content (html)
- `reblog.spoiler_text`: Content Warning
- `reblog.sensitive`: Sensitive (boolean)
- `reblog.visibility`: Visibility
- `reblog.language`: Language
- `reblog.in_reply_to_id`: In Reply To Status ID
- `reblog.in_reply_to_account_id`: In Reply To Account ID
- `reblog.replies_count`: Replies (number)
- `reblog.reblogs_count`: Boosts (number)
- `reblog.favourites_count`: Favourites (number)
- `reblog.edited_at`: Edited At (datetime)
- `reblog.account`: Author
- `reblog.account.id`: Account ID
- `reblog.account.username`: Username
- `reblog.account.acct`: Handle
- `reblog.account.display_name`: Display Name
- `reblog.account.url`: Profile URL (url)
- `reblog.account.avatar`: Avatar (image)
- `reblog.account.bot`: Bot (boolean)
- `reblog.media_attachments`: Media Attachments
- `reblog.media_attachments[].id`: Media ID
- `reblog.media_attachments[].type`: Type
- `reblog.media_attachments[].url`: URL (url)
- `reblog.media_attachments[].preview_url`: Preview (image)
- `reblog.media_attachments[].remote_url`: Remote URL (url)
- `reblog.media_attachments[].description`: Alt Text
- `reblog.media_attachments[].meta`: Metadata
- `reblog.media_attachments[].meta.original`: Original
- `reblog.media_attachments[].meta.original.width`: Width (number)
- `reblog.media_attachments[].meta.original.height`: Height (number)
- `reblog.media_attachments[].meta.focus`: Focal Point
- `reblog.media_attachments[].meta.focus.x`: X (number)
- `reblog.media_attachments[].meta.focus.y`: Y (number)
- `reblog.mentions`: Mentions
- `reblog.mentions[].id`: Account ID
- `reblog.mentions[].username`: Username
- `reblog.mentions[].acct`: Handle
- `reblog.mentions[].url`: Profile URL (url)
- `reblog.tags`: Hashtags
- `reblog.tags[].name`: Name
- `reblog.tags[].url`: URL (url)
- `reblog.poll`: Poll
- `reblog.poll.id`: Poll ID
- `reblog.poll.expires_at`: Expires At (datetime)
- `reblog.poll.expired`: Expired (boolean)
- `reblog.poll.multiple`: Multiple Choice (boolean)
- `reblog.poll.votes_count`: Votes (number)
- `reblog.poll.voters_count`: Voters (number)
- `reblog.poll.voted`: Voted (boolean)
- `reblog.poll.own_votes`: Own Votes (Option Indexes)
- `reblog.poll.options`: Options
- `reblog.poll.options[].title`: Title
- `reblog.poll.options[].votes_count`: Votes (number)
- `reblog.card`: Link Preview
- `reblog.card.url`: URL (url)
- `reblog.card.title`: Title
- `reblog.card.description`: Description
- `reblog.card.type`: Type
- `reblog.card.language`: Language
- `reblog.card.provider_name`: Provider
- `reblog.card.author_name`: Author
- `reblog.card.image`: Image (image)
- `reblog.card.published_at`: Published At (datetime)
- `application`: Posted With
- `application.name`: App Name
- `application.website`: App Website (url)

### `bookmark_status`

**Bookmark Status.** Bookmarks a status privately for the connected account (the author is not notified); read bookmarks back with List Bookmarks. Use Favourite Status for a public like. Safe to retry. Returns the updated status. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_id` | string | yes |  | Status ID. Local ID of the status on this server, for example 109372843234737004. Obtain it from a timeline, Get Status or Search (use resolve for a status URL from another server). |

Output fields:

- `id`: Status ID
- `created_at`: Created At (datetime)
- `url`: URL (url)
- `uri`: ActivityPub URI (url)
- `content`: Content (html)
- `spoiler_text`: Content Warning
- `sensitive`: Sensitive (boolean)
- `visibility`: Visibility
- `language`: Language
- `in_reply_to_id`: In Reply To Status ID
- `in_reply_to_account_id`: In Reply To Account ID
- `replies_count`: Replies (number)
- `reblogs_count`: Boosts (number)
- `favourites_count`: Favourites (number)
- `edited_at`: Edited At (datetime)
- `account`: Author
- `account.id`: Account ID
- `account.username`: Username
- `account.acct`: Handle
- `account.display_name`: Display Name
- `account.url`: Profile URL (url)
- `account.avatar`: Avatar (image)
- `account.bot`: Bot (boolean)
- `media_attachments`: Media Attachments
- `media_attachments[].id`: Media ID
- `media_attachments[].type`: Type
- `media_attachments[].url`: URL (url)
- `media_attachments[].preview_url`: Preview (image)
- `media_attachments[].remote_url`: Remote URL (url)
- `media_attachments[].description`: Alt Text
- `media_attachments[].meta`: Metadata
- `media_attachments[].meta.original`: Original
- `media_attachments[].meta.original.width`: Width (number)
- `media_attachments[].meta.original.height`: Height (number)
- `media_attachments[].meta.focus`: Focal Point
- `media_attachments[].meta.focus.x`: X (number)
- `media_attachments[].meta.focus.y`: Y (number)
- `mentions`: Mentions
- `mentions[].id`: Account ID
- `mentions[].username`: Username
- `mentions[].acct`: Handle
- `mentions[].url`: Profile URL (url)
- `tags`: Hashtags
- `tags[].name`: Name
- `tags[].url`: URL (url)
- `poll`: Poll
- `poll.id`: Poll ID
- `poll.expires_at`: Expires At (datetime)
- `poll.expired`: Expired (boolean)
- `poll.multiple`: Multiple Choice (boolean)
- `poll.votes_count`: Votes (number)
- `poll.voters_count`: Voters (number)
- `poll.voted`: Voted (boolean)
- `poll.own_votes`: Own Votes (Option Indexes)
- `poll.options`: Options
- `poll.options[].title`: Title
- `poll.options[].votes_count`: Votes (number)
- `card`: Link Preview
- `card.url`: URL (url)
- `card.title`: Title
- `card.description`: Description
- `card.type`: Type
- `card.language`: Language
- `card.provider_name`: Provider
- `card.author_name`: Author
- `card.image`: Image (image)
- `card.published_at`: Published At (datetime)
- `favourited`: Favourited by Me (boolean)
- `reblogged`: Boosted by Me (boolean)
- `bookmarked`: Bookmarked by Me (boolean)
- `muted`: Conversation Muted (boolean)
- `pinned`: Pinned to Profile (boolean)
- `reblog`: Boosted Status
- `reblog.id`: Status ID
- `reblog.created_at`: Created At (datetime)
- `reblog.url`: URL (url)
- `reblog.uri`: ActivityPub URI (url)
- `reblog.content`: Content (html)
- `reblog.spoiler_text`: Content Warning
- `reblog.sensitive`: Sensitive (boolean)
- `reblog.visibility`: Visibility
- `reblog.language`: Language
- `reblog.in_reply_to_id`: In Reply To Status ID
- `reblog.in_reply_to_account_id`: In Reply To Account ID
- `reblog.replies_count`: Replies (number)
- `reblog.reblogs_count`: Boosts (number)
- `reblog.favourites_count`: Favourites (number)
- `reblog.edited_at`: Edited At (datetime)
- `reblog.account`: Author
- `reblog.account.id`: Account ID
- `reblog.account.username`: Username
- `reblog.account.acct`: Handle
- `reblog.account.display_name`: Display Name
- `reblog.account.url`: Profile URL (url)
- `reblog.account.avatar`: Avatar (image)
- `reblog.account.bot`: Bot (boolean)
- `reblog.media_attachments`: Media Attachments
- `reblog.media_attachments[].id`: Media ID
- `reblog.media_attachments[].type`: Type
- `reblog.media_attachments[].url`: URL (url)
- `reblog.media_attachments[].preview_url`: Preview (image)
- `reblog.media_attachments[].remote_url`: Remote URL (url)
- `reblog.media_attachments[].description`: Alt Text
- `reblog.media_attachments[].meta`: Metadata
- `reblog.media_attachments[].meta.original`: Original
- `reblog.media_attachments[].meta.original.width`: Width (number)
- `reblog.media_attachments[].meta.original.height`: Height (number)
- `reblog.media_attachments[].meta.focus`: Focal Point
- `reblog.media_attachments[].meta.focus.x`: X (number)
- `reblog.media_attachments[].meta.focus.y`: Y (number)
- `reblog.mentions`: Mentions
- `reblog.mentions[].id`: Account ID
- `reblog.mentions[].username`: Username
- `reblog.mentions[].acct`: Handle
- `reblog.mentions[].url`: Profile URL (url)
- `reblog.tags`: Hashtags
- `reblog.tags[].name`: Name
- `reblog.tags[].url`: URL (url)
- `reblog.poll`: Poll
- `reblog.poll.id`: Poll ID
- `reblog.poll.expires_at`: Expires At (datetime)
- `reblog.poll.expired`: Expired (boolean)
- `reblog.poll.multiple`: Multiple Choice (boolean)
- `reblog.poll.votes_count`: Votes (number)
- `reblog.poll.voters_count`: Voters (number)
- `reblog.poll.voted`: Voted (boolean)
- `reblog.poll.own_votes`: Own Votes (Option Indexes)
- `reblog.poll.options`: Options
- `reblog.poll.options[].title`: Title
- `reblog.poll.options[].votes_count`: Votes (number)
- `reblog.card`: Link Preview
- `reblog.card.url`: URL (url)
- `reblog.card.title`: Title
- `reblog.card.description`: Description
- `reblog.card.type`: Type
- `reblog.card.language`: Language
- `reblog.card.provider_name`: Provider
- `reblog.card.author_name`: Author
- `reblog.card.image`: Image (image)
- `reblog.card.published_at`: Published At (datetime)
- `application`: Posted With
- `application.name`: App Name
- `application.website`: App Website (url)

### `unbookmark_status`

**Remove Bookmark.** Removes a status from the connected account's bookmarks. Safe to retry. Returns the updated status. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_id` | string | yes |  | Status ID. Local ID of the status on this server, for example 109372843234737004. Obtain it from a timeline, Get Status or Search (use resolve for a status URL from another server). |

Output fields:

- `id`: Status ID
- `created_at`: Created At (datetime)
- `url`: URL (url)
- `uri`: ActivityPub URI (url)
- `content`: Content (html)
- `spoiler_text`: Content Warning
- `sensitive`: Sensitive (boolean)
- `visibility`: Visibility
- `language`: Language
- `in_reply_to_id`: In Reply To Status ID
- `in_reply_to_account_id`: In Reply To Account ID
- `replies_count`: Replies (number)
- `reblogs_count`: Boosts (number)
- `favourites_count`: Favourites (number)
- `edited_at`: Edited At (datetime)
- `account`: Author
- `account.id`: Account ID
- `account.username`: Username
- `account.acct`: Handle
- `account.display_name`: Display Name
- `account.url`: Profile URL (url)
- `account.avatar`: Avatar (image)
- `account.bot`: Bot (boolean)
- `media_attachments`: Media Attachments
- `media_attachments[].id`: Media ID
- `media_attachments[].type`: Type
- `media_attachments[].url`: URL (url)
- `media_attachments[].preview_url`: Preview (image)
- `media_attachments[].remote_url`: Remote URL (url)
- `media_attachments[].description`: Alt Text
- `media_attachments[].meta`: Metadata
- `media_attachments[].meta.original`: Original
- `media_attachments[].meta.original.width`: Width (number)
- `media_attachments[].meta.original.height`: Height (number)
- `media_attachments[].meta.focus`: Focal Point
- `media_attachments[].meta.focus.x`: X (number)
- `media_attachments[].meta.focus.y`: Y (number)
- `mentions`: Mentions
- `mentions[].id`: Account ID
- `mentions[].username`: Username
- `mentions[].acct`: Handle
- `mentions[].url`: Profile URL (url)
- `tags`: Hashtags
- `tags[].name`: Name
- `tags[].url`: URL (url)
- `poll`: Poll
- `poll.id`: Poll ID
- `poll.expires_at`: Expires At (datetime)
- `poll.expired`: Expired (boolean)
- `poll.multiple`: Multiple Choice (boolean)
- `poll.votes_count`: Votes (number)
- `poll.voters_count`: Voters (number)
- `poll.voted`: Voted (boolean)
- `poll.own_votes`: Own Votes (Option Indexes)
- `poll.options`: Options
- `poll.options[].title`: Title
- `poll.options[].votes_count`: Votes (number)
- `card`: Link Preview
- `card.url`: URL (url)
- `card.title`: Title
- `card.description`: Description
- `card.type`: Type
- `card.language`: Language
- `card.provider_name`: Provider
- `card.author_name`: Author
- `card.image`: Image (image)
- `card.published_at`: Published At (datetime)
- `favourited`: Favourited by Me (boolean)
- `reblogged`: Boosted by Me (boolean)
- `bookmarked`: Bookmarked by Me (boolean)
- `muted`: Conversation Muted (boolean)
- `pinned`: Pinned to Profile (boolean)
- `reblog`: Boosted Status
- `reblog.id`: Status ID
- `reblog.created_at`: Created At (datetime)
- `reblog.url`: URL (url)
- `reblog.uri`: ActivityPub URI (url)
- `reblog.content`: Content (html)
- `reblog.spoiler_text`: Content Warning
- `reblog.sensitive`: Sensitive (boolean)
- `reblog.visibility`: Visibility
- `reblog.language`: Language
- `reblog.in_reply_to_id`: In Reply To Status ID
- `reblog.in_reply_to_account_id`: In Reply To Account ID
- `reblog.replies_count`: Replies (number)
- `reblog.reblogs_count`: Boosts (number)
- `reblog.favourites_count`: Favourites (number)
- `reblog.edited_at`: Edited At (datetime)
- `reblog.account`: Author
- `reblog.account.id`: Account ID
- `reblog.account.username`: Username
- `reblog.account.acct`: Handle
- `reblog.account.display_name`: Display Name
- `reblog.account.url`: Profile URL (url)
- `reblog.account.avatar`: Avatar (image)
- `reblog.account.bot`: Bot (boolean)
- `reblog.media_attachments`: Media Attachments
- `reblog.media_attachments[].id`: Media ID
- `reblog.media_attachments[].type`: Type
- `reblog.media_attachments[].url`: URL (url)
- `reblog.media_attachments[].preview_url`: Preview (image)
- `reblog.media_attachments[].remote_url`: Remote URL (url)
- `reblog.media_attachments[].description`: Alt Text
- `reblog.media_attachments[].meta`: Metadata
- `reblog.media_attachments[].meta.original`: Original
- `reblog.media_attachments[].meta.original.width`: Width (number)
- `reblog.media_attachments[].meta.original.height`: Height (number)
- `reblog.media_attachments[].meta.focus`: Focal Point
- `reblog.media_attachments[].meta.focus.x`: X (number)
- `reblog.media_attachments[].meta.focus.y`: Y (number)
- `reblog.mentions`: Mentions
- `reblog.mentions[].id`: Account ID
- `reblog.mentions[].username`: Username
- `reblog.mentions[].acct`: Handle
- `reblog.mentions[].url`: Profile URL (url)
- `reblog.tags`: Hashtags
- `reblog.tags[].name`: Name
- `reblog.tags[].url`: URL (url)
- `reblog.poll`: Poll
- `reblog.poll.id`: Poll ID
- `reblog.poll.expires_at`: Expires At (datetime)
- `reblog.poll.expired`: Expired (boolean)
- `reblog.poll.multiple`: Multiple Choice (boolean)
- `reblog.poll.votes_count`: Votes (number)
- `reblog.poll.voters_count`: Voters (number)
- `reblog.poll.voted`: Voted (boolean)
- `reblog.poll.own_votes`: Own Votes (Option Indexes)
- `reblog.poll.options`: Options
- `reblog.poll.options[].title`: Title
- `reblog.poll.options[].votes_count`: Votes (number)
- `reblog.card`: Link Preview
- `reblog.card.url`: URL (url)
- `reblog.card.title`: Title
- `reblog.card.description`: Description
- `reblog.card.type`: Type
- `reblog.card.language`: Language
- `reblog.card.provider_name`: Provider
- `reblog.card.author_name`: Author
- `reblog.card.image`: Image (image)
- `reblog.card.published_at`: Published At (datetime)
- `application`: Posted With
- `application.name`: App Name
- `application.website`: App Website (url)

### `mute_conversation`

**Mute Conversation.** Mutes notifications from the conversation thread a status belongs to, for a thread the connected account participates in. Use Mute Account to silence a person instead. Safe to retry. Returns the updated status. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_id` | string | yes |  | Status ID. Local ID of the status on this server, for example 109372843234737004. Obtain it from a timeline, Get Status or Search (use resolve for a status URL from another server). |

Output fields:

- `id`: Status ID
- `created_at`: Created At (datetime)
- `url`: URL (url)
- `uri`: ActivityPub URI (url)
- `content`: Content (html)
- `spoiler_text`: Content Warning
- `sensitive`: Sensitive (boolean)
- `visibility`: Visibility
- `language`: Language
- `in_reply_to_id`: In Reply To Status ID
- `in_reply_to_account_id`: In Reply To Account ID
- `replies_count`: Replies (number)
- `reblogs_count`: Boosts (number)
- `favourites_count`: Favourites (number)
- `edited_at`: Edited At (datetime)
- `account`: Author
- `account.id`: Account ID
- `account.username`: Username
- `account.acct`: Handle
- `account.display_name`: Display Name
- `account.url`: Profile URL (url)
- `account.avatar`: Avatar (image)
- `account.bot`: Bot (boolean)
- `media_attachments`: Media Attachments
- `media_attachments[].id`: Media ID
- `media_attachments[].type`: Type
- `media_attachments[].url`: URL (url)
- `media_attachments[].preview_url`: Preview (image)
- `media_attachments[].remote_url`: Remote URL (url)
- `media_attachments[].description`: Alt Text
- `media_attachments[].meta`: Metadata
- `media_attachments[].meta.original`: Original
- `media_attachments[].meta.original.width`: Width (number)
- `media_attachments[].meta.original.height`: Height (number)
- `media_attachments[].meta.focus`: Focal Point
- `media_attachments[].meta.focus.x`: X (number)
- `media_attachments[].meta.focus.y`: Y (number)
- `mentions`: Mentions
- `mentions[].id`: Account ID
- `mentions[].username`: Username
- `mentions[].acct`: Handle
- `mentions[].url`: Profile URL (url)
- `tags`: Hashtags
- `tags[].name`: Name
- `tags[].url`: URL (url)
- `poll`: Poll
- `poll.id`: Poll ID
- `poll.expires_at`: Expires At (datetime)
- `poll.expired`: Expired (boolean)
- `poll.multiple`: Multiple Choice (boolean)
- `poll.votes_count`: Votes (number)
- `poll.voters_count`: Voters (number)
- `poll.voted`: Voted (boolean)
- `poll.own_votes`: Own Votes (Option Indexes)
- `poll.options`: Options
- `poll.options[].title`: Title
- `poll.options[].votes_count`: Votes (number)
- `card`: Link Preview
- `card.url`: URL (url)
- `card.title`: Title
- `card.description`: Description
- `card.type`: Type
- `card.language`: Language
- `card.provider_name`: Provider
- `card.author_name`: Author
- `card.image`: Image (image)
- `card.published_at`: Published At (datetime)
- `favourited`: Favourited by Me (boolean)
- `reblogged`: Boosted by Me (boolean)
- `bookmarked`: Bookmarked by Me (boolean)
- `muted`: Conversation Muted (boolean)
- `pinned`: Pinned to Profile (boolean)
- `reblog`: Boosted Status
- `reblog.id`: Status ID
- `reblog.created_at`: Created At (datetime)
- `reblog.url`: URL (url)
- `reblog.uri`: ActivityPub URI (url)
- `reblog.content`: Content (html)
- `reblog.spoiler_text`: Content Warning
- `reblog.sensitive`: Sensitive (boolean)
- `reblog.visibility`: Visibility
- `reblog.language`: Language
- `reblog.in_reply_to_id`: In Reply To Status ID
- `reblog.in_reply_to_account_id`: In Reply To Account ID
- `reblog.replies_count`: Replies (number)
- `reblog.reblogs_count`: Boosts (number)
- `reblog.favourites_count`: Favourites (number)
- `reblog.edited_at`: Edited At (datetime)
- `reblog.account`: Author
- `reblog.account.id`: Account ID
- `reblog.account.username`: Username
- `reblog.account.acct`: Handle
- `reblog.account.display_name`: Display Name
- `reblog.account.url`: Profile URL (url)
- `reblog.account.avatar`: Avatar (image)
- `reblog.account.bot`: Bot (boolean)
- `reblog.media_attachments`: Media Attachments
- `reblog.media_attachments[].id`: Media ID
- `reblog.media_attachments[].type`: Type
- `reblog.media_attachments[].url`: URL (url)
- `reblog.media_attachments[].preview_url`: Preview (image)
- `reblog.media_attachments[].remote_url`: Remote URL (url)
- `reblog.media_attachments[].description`: Alt Text
- `reblog.media_attachments[].meta`: Metadata
- `reblog.media_attachments[].meta.original`: Original
- `reblog.media_attachments[].meta.original.width`: Width (number)
- `reblog.media_attachments[].meta.original.height`: Height (number)
- `reblog.media_attachments[].meta.focus`: Focal Point
- `reblog.media_attachments[].meta.focus.x`: X (number)
- `reblog.media_attachments[].meta.focus.y`: Y (number)
- `reblog.mentions`: Mentions
- `reblog.mentions[].id`: Account ID
- `reblog.mentions[].username`: Username
- `reblog.mentions[].acct`: Handle
- `reblog.mentions[].url`: Profile URL (url)
- `reblog.tags`: Hashtags
- `reblog.tags[].name`: Name
- `reblog.tags[].url`: URL (url)
- `reblog.poll`: Poll
- `reblog.poll.id`: Poll ID
- `reblog.poll.expires_at`: Expires At (datetime)
- `reblog.poll.expired`: Expired (boolean)
- `reblog.poll.multiple`: Multiple Choice (boolean)
- `reblog.poll.votes_count`: Votes (number)
- `reblog.poll.voters_count`: Voters (number)
- `reblog.poll.voted`: Voted (boolean)
- `reblog.poll.own_votes`: Own Votes (Option Indexes)
- `reblog.poll.options`: Options
- `reblog.poll.options[].title`: Title
- `reblog.poll.options[].votes_count`: Votes (number)
- `reblog.card`: Link Preview
- `reblog.card.url`: URL (url)
- `reblog.card.title`: Title
- `reblog.card.description`: Description
- `reblog.card.type`: Type
- `reblog.card.language`: Language
- `reblog.card.provider_name`: Provider
- `reblog.card.author_name`: Author
- `reblog.card.image`: Image (image)
- `reblog.card.published_at`: Published At (datetime)
- `application`: Posted With
- `application.name`: App Name
- `application.website`: App Website (url)

### `unmute_conversation`

**Unmute Conversation.** Unmutes notifications for the conversation thread a status belongs to. Safe to retry. Returns the updated status. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_id` | string | yes |  | Status ID. Local ID of the status on this server, for example 109372843234737004. Obtain it from a timeline, Get Status or Search (use resolve for a status URL from another server). |

Output fields:

- `id`: Status ID
- `created_at`: Created At (datetime)
- `url`: URL (url)
- `uri`: ActivityPub URI (url)
- `content`: Content (html)
- `spoiler_text`: Content Warning
- `sensitive`: Sensitive (boolean)
- `visibility`: Visibility
- `language`: Language
- `in_reply_to_id`: In Reply To Status ID
- `in_reply_to_account_id`: In Reply To Account ID
- `replies_count`: Replies (number)
- `reblogs_count`: Boosts (number)
- `favourites_count`: Favourites (number)
- `edited_at`: Edited At (datetime)
- `account`: Author
- `account.id`: Account ID
- `account.username`: Username
- `account.acct`: Handle
- `account.display_name`: Display Name
- `account.url`: Profile URL (url)
- `account.avatar`: Avatar (image)
- `account.bot`: Bot (boolean)
- `media_attachments`: Media Attachments
- `media_attachments[].id`: Media ID
- `media_attachments[].type`: Type
- `media_attachments[].url`: URL (url)
- `media_attachments[].preview_url`: Preview (image)
- `media_attachments[].remote_url`: Remote URL (url)
- `media_attachments[].description`: Alt Text
- `media_attachments[].meta`: Metadata
- `media_attachments[].meta.original`: Original
- `media_attachments[].meta.original.width`: Width (number)
- `media_attachments[].meta.original.height`: Height (number)
- `media_attachments[].meta.focus`: Focal Point
- `media_attachments[].meta.focus.x`: X (number)
- `media_attachments[].meta.focus.y`: Y (number)
- `mentions`: Mentions
- `mentions[].id`: Account ID
- `mentions[].username`: Username
- `mentions[].acct`: Handle
- `mentions[].url`: Profile URL (url)
- `tags`: Hashtags
- `tags[].name`: Name
- `tags[].url`: URL (url)
- `poll`: Poll
- `poll.id`: Poll ID
- `poll.expires_at`: Expires At (datetime)
- `poll.expired`: Expired (boolean)
- `poll.multiple`: Multiple Choice (boolean)
- `poll.votes_count`: Votes (number)
- `poll.voters_count`: Voters (number)
- `poll.voted`: Voted (boolean)
- `poll.own_votes`: Own Votes (Option Indexes)
- `poll.options`: Options
- `poll.options[].title`: Title
- `poll.options[].votes_count`: Votes (number)
- `card`: Link Preview
- `card.url`: URL (url)
- `card.title`: Title
- `card.description`: Description
- `card.type`: Type
- `card.language`: Language
- `card.provider_name`: Provider
- `card.author_name`: Author
- `card.image`: Image (image)
- `card.published_at`: Published At (datetime)
- `favourited`: Favourited by Me (boolean)
- `reblogged`: Boosted by Me (boolean)
- `bookmarked`: Bookmarked by Me (boolean)
- `muted`: Conversation Muted (boolean)
- `pinned`: Pinned to Profile (boolean)
- `reblog`: Boosted Status
- `reblog.id`: Status ID
- `reblog.created_at`: Created At (datetime)
- `reblog.url`: URL (url)
- `reblog.uri`: ActivityPub URI (url)
- `reblog.content`: Content (html)
- `reblog.spoiler_text`: Content Warning
- `reblog.sensitive`: Sensitive (boolean)
- `reblog.visibility`: Visibility
- `reblog.language`: Language
- `reblog.in_reply_to_id`: In Reply To Status ID
- `reblog.in_reply_to_account_id`: In Reply To Account ID
- `reblog.replies_count`: Replies (number)
- `reblog.reblogs_count`: Boosts (number)
- `reblog.favourites_count`: Favourites (number)
- `reblog.edited_at`: Edited At (datetime)
- `reblog.account`: Author
- `reblog.account.id`: Account ID
- `reblog.account.username`: Username
- `reblog.account.acct`: Handle
- `reblog.account.display_name`: Display Name
- `reblog.account.url`: Profile URL (url)
- `reblog.account.avatar`: Avatar (image)
- `reblog.account.bot`: Bot (boolean)
- `reblog.media_attachments`: Media Attachments
- `reblog.media_attachments[].id`: Media ID
- `reblog.media_attachments[].type`: Type
- `reblog.media_attachments[].url`: URL (url)
- `reblog.media_attachments[].preview_url`: Preview (image)
- `reblog.media_attachments[].remote_url`: Remote URL (url)
- `reblog.media_attachments[].description`: Alt Text
- `reblog.media_attachments[].meta`: Metadata
- `reblog.media_attachments[].meta.original`: Original
- `reblog.media_attachments[].meta.original.width`: Width (number)
- `reblog.media_attachments[].meta.original.height`: Height (number)
- `reblog.media_attachments[].meta.focus`: Focal Point
- `reblog.media_attachments[].meta.focus.x`: X (number)
- `reblog.media_attachments[].meta.focus.y`: Y (number)
- `reblog.mentions`: Mentions
- `reblog.mentions[].id`: Account ID
- `reblog.mentions[].username`: Username
- `reblog.mentions[].acct`: Handle
- `reblog.mentions[].url`: Profile URL (url)
- `reblog.tags`: Hashtags
- `reblog.tags[].name`: Name
- `reblog.tags[].url`: URL (url)
- `reblog.poll`: Poll
- `reblog.poll.id`: Poll ID
- `reblog.poll.expires_at`: Expires At (datetime)
- `reblog.poll.expired`: Expired (boolean)
- `reblog.poll.multiple`: Multiple Choice (boolean)
- `reblog.poll.votes_count`: Votes (number)
- `reblog.poll.voters_count`: Voters (number)
- `reblog.poll.voted`: Voted (boolean)
- `reblog.poll.own_votes`: Own Votes (Option Indexes)
- `reblog.poll.options`: Options
- `reblog.poll.options[].title`: Title
- `reblog.poll.options[].votes_count`: Votes (number)
- `reblog.card`: Link Preview
- `reblog.card.url`: URL (url)
- `reblog.card.title`: Title
- `reblog.card.description`: Description
- `reblog.card.type`: Type
- `reblog.card.language`: Language
- `reblog.card.provider_name`: Provider
- `reblog.card.author_name`: Author
- `reblog.card.image`: Image (image)
- `reblog.card.published_at`: Published At (datetime)
- `application`: Posted With
- `application.name`: App Name
- `application.website`: App Website (url)

### `pin_status`

**Pin Status to Profile.** Pins one of the connected account's own public, unlisted or (Mastodon 3.5+) followers-only statuses to the top of its profile, visible to profile visitors; direct messages cannot be pinned and servers cap the number of pins. Pinning an already-pinned status may be rejected, so do not blindly retry. Returns the updated status. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_id` | string | yes |  | Status ID. Local ID of your own status. Obtain it from Create Status, Get Status or List Account Statuses. |

Output fields:

- `id`: Status ID
- `created_at`: Created At (datetime)
- `url`: URL (url)
- `uri`: ActivityPub URI (url)
- `content`: Content (html)
- `spoiler_text`: Content Warning
- `sensitive`: Sensitive (boolean)
- `visibility`: Visibility
- `language`: Language
- `in_reply_to_id`: In Reply To Status ID
- `in_reply_to_account_id`: In Reply To Account ID
- `replies_count`: Replies (number)
- `reblogs_count`: Boosts (number)
- `favourites_count`: Favourites (number)
- `edited_at`: Edited At (datetime)
- `account`: Author
- `account.id`: Account ID
- `account.username`: Username
- `account.acct`: Handle
- `account.display_name`: Display Name
- `account.url`: Profile URL (url)
- `account.avatar`: Avatar (image)
- `account.bot`: Bot (boolean)
- `media_attachments`: Media Attachments
- `media_attachments[].id`: Media ID
- `media_attachments[].type`: Type
- `media_attachments[].url`: URL (url)
- `media_attachments[].preview_url`: Preview (image)
- `media_attachments[].remote_url`: Remote URL (url)
- `media_attachments[].description`: Alt Text
- `media_attachments[].meta`: Metadata
- `media_attachments[].meta.original`: Original
- `media_attachments[].meta.original.width`: Width (number)
- `media_attachments[].meta.original.height`: Height (number)
- `media_attachments[].meta.focus`: Focal Point
- `media_attachments[].meta.focus.x`: X (number)
- `media_attachments[].meta.focus.y`: Y (number)
- `mentions`: Mentions
- `mentions[].id`: Account ID
- `mentions[].username`: Username
- `mentions[].acct`: Handle
- `mentions[].url`: Profile URL (url)
- `tags`: Hashtags
- `tags[].name`: Name
- `tags[].url`: URL (url)
- `poll`: Poll
- `poll.id`: Poll ID
- `poll.expires_at`: Expires At (datetime)
- `poll.expired`: Expired (boolean)
- `poll.multiple`: Multiple Choice (boolean)
- `poll.votes_count`: Votes (number)
- `poll.voters_count`: Voters (number)
- `poll.voted`: Voted (boolean)
- `poll.own_votes`: Own Votes (Option Indexes)
- `poll.options`: Options
- `poll.options[].title`: Title
- `poll.options[].votes_count`: Votes (number)
- `card`: Link Preview
- `card.url`: URL (url)
- `card.title`: Title
- `card.description`: Description
- `card.type`: Type
- `card.language`: Language
- `card.provider_name`: Provider
- `card.author_name`: Author
- `card.image`: Image (image)
- `card.published_at`: Published At (datetime)
- `favourited`: Favourited by Me (boolean)
- `reblogged`: Boosted by Me (boolean)
- `bookmarked`: Bookmarked by Me (boolean)
- `muted`: Conversation Muted (boolean)
- `pinned`: Pinned to Profile (boolean)
- `reblog`: Boosted Status
- `reblog.id`: Status ID
- `reblog.created_at`: Created At (datetime)
- `reblog.url`: URL (url)
- `reblog.uri`: ActivityPub URI (url)
- `reblog.content`: Content (html)
- `reblog.spoiler_text`: Content Warning
- `reblog.sensitive`: Sensitive (boolean)
- `reblog.visibility`: Visibility
- `reblog.language`: Language
- `reblog.in_reply_to_id`: In Reply To Status ID
- `reblog.in_reply_to_account_id`: In Reply To Account ID
- `reblog.replies_count`: Replies (number)
- `reblog.reblogs_count`: Boosts (number)
- `reblog.favourites_count`: Favourites (number)
- `reblog.edited_at`: Edited At (datetime)
- `reblog.account`: Author
- `reblog.account.id`: Account ID
- `reblog.account.username`: Username
- `reblog.account.acct`: Handle
- `reblog.account.display_name`: Display Name
- `reblog.account.url`: Profile URL (url)
- `reblog.account.avatar`: Avatar (image)
- `reblog.account.bot`: Bot (boolean)
- `reblog.media_attachments`: Media Attachments
- `reblog.media_attachments[].id`: Media ID
- `reblog.media_attachments[].type`: Type
- `reblog.media_attachments[].url`: URL (url)
- `reblog.media_attachments[].preview_url`: Preview (image)
- `reblog.media_attachments[].remote_url`: Remote URL (url)
- `reblog.media_attachments[].description`: Alt Text
- `reblog.media_attachments[].meta`: Metadata
- `reblog.media_attachments[].meta.original`: Original
- `reblog.media_attachments[].meta.original.width`: Width (number)
- `reblog.media_attachments[].meta.original.height`: Height (number)
- `reblog.media_attachments[].meta.focus`: Focal Point
- `reblog.media_attachments[].meta.focus.x`: X (number)
- `reblog.media_attachments[].meta.focus.y`: Y (number)
- `reblog.mentions`: Mentions
- `reblog.mentions[].id`: Account ID
- `reblog.mentions[].username`: Username
- `reblog.mentions[].acct`: Handle
- `reblog.mentions[].url`: Profile URL (url)
- `reblog.tags`: Hashtags
- `reblog.tags[].name`: Name
- `reblog.tags[].url`: URL (url)
- `reblog.poll`: Poll
- `reblog.poll.id`: Poll ID
- `reblog.poll.expires_at`: Expires At (datetime)
- `reblog.poll.expired`: Expired (boolean)
- `reblog.poll.multiple`: Multiple Choice (boolean)
- `reblog.poll.votes_count`: Votes (number)
- `reblog.poll.voters_count`: Voters (number)
- `reblog.poll.voted`: Voted (boolean)
- `reblog.poll.own_votes`: Own Votes (Option Indexes)
- `reblog.poll.options`: Options
- `reblog.poll.options[].title`: Title
- `reblog.poll.options[].votes_count`: Votes (number)
- `reblog.card`: Link Preview
- `reblog.card.url`: URL (url)
- `reblog.card.title`: Title
- `reblog.card.description`: Description
- `reblog.card.type`: Type
- `reblog.card.language`: Language
- `reblog.card.provider_name`: Provider
- `reblog.card.author_name`: Author
- `reblog.card.image`: Image (image)
- `reblog.card.published_at`: Published At (datetime)
- `application`: Posted With
- `application.name`: App Name
- `application.website`: App Website (url)

### `unpin_status`

**Unpin Status from Profile.** Unpins one of the connected account's statuses from its profile. Safe to retry. Returns the updated status. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status_id` | string | yes |  | Status ID. Local ID of your own status. Obtain it from Create Status, Get Status or List Account Statuses. |

Output fields:

- `id`: Status ID
- `created_at`: Created At (datetime)
- `url`: URL (url)
- `uri`: ActivityPub URI (url)
- `content`: Content (html)
- `spoiler_text`: Content Warning
- `sensitive`: Sensitive (boolean)
- `visibility`: Visibility
- `language`: Language
- `in_reply_to_id`: In Reply To Status ID
- `in_reply_to_account_id`: In Reply To Account ID
- `replies_count`: Replies (number)
- `reblogs_count`: Boosts (number)
- `favourites_count`: Favourites (number)
- `edited_at`: Edited At (datetime)
- `account`: Author
- `account.id`: Account ID
- `account.username`: Username
- `account.acct`: Handle
- `account.display_name`: Display Name
- `account.url`: Profile URL (url)
- `account.avatar`: Avatar (image)
- `account.bot`: Bot (boolean)
- `media_attachments`: Media Attachments
- `media_attachments[].id`: Media ID
- `media_attachments[].type`: Type
- `media_attachments[].url`: URL (url)
- `media_attachments[].preview_url`: Preview (image)
- `media_attachments[].remote_url`: Remote URL (url)
- `media_attachments[].description`: Alt Text
- `media_attachments[].meta`: Metadata
- `media_attachments[].meta.original`: Original
- `media_attachments[].meta.original.width`: Width (number)
- `media_attachments[].meta.original.height`: Height (number)
- `media_attachments[].meta.focus`: Focal Point
- `media_attachments[].meta.focus.x`: X (number)
- `media_attachments[].meta.focus.y`: Y (number)
- `mentions`: Mentions
- `mentions[].id`: Account ID
- `mentions[].username`: Username
- `mentions[].acct`: Handle
- `mentions[].url`: Profile URL (url)
- `tags`: Hashtags
- `tags[].name`: Name
- `tags[].url`: URL (url)
- `poll`: Poll
- `poll.id`: Poll ID
- `poll.expires_at`: Expires At (datetime)
- `poll.expired`: Expired (boolean)
- `poll.multiple`: Multiple Choice (boolean)
- `poll.votes_count`: Votes (number)
- `poll.voters_count`: Voters (number)
- `poll.voted`: Voted (boolean)
- `poll.own_votes`: Own Votes (Option Indexes)
- `poll.options`: Options
- `poll.options[].title`: Title
- `poll.options[].votes_count`: Votes (number)
- `card`: Link Preview
- `card.url`: URL (url)
- `card.title`: Title
- `card.description`: Description
- `card.type`: Type
- `card.language`: Language
- `card.provider_name`: Provider
- `card.author_name`: Author
- `card.image`: Image (image)
- `card.published_at`: Published At (datetime)
- `favourited`: Favourited by Me (boolean)
- `reblogged`: Boosted by Me (boolean)
- `bookmarked`: Bookmarked by Me (boolean)
- `muted`: Conversation Muted (boolean)
- `pinned`: Pinned to Profile (boolean)
- `reblog`: Boosted Status
- `reblog.id`: Status ID
- `reblog.created_at`: Created At (datetime)
- `reblog.url`: URL (url)
- `reblog.uri`: ActivityPub URI (url)
- `reblog.content`: Content (html)
- `reblog.spoiler_text`: Content Warning
- `reblog.sensitive`: Sensitive (boolean)
- `reblog.visibility`: Visibility
- `reblog.language`: Language
- `reblog.in_reply_to_id`: In Reply To Status ID
- `reblog.in_reply_to_account_id`: In Reply To Account ID
- `reblog.replies_count`: Replies (number)
- `reblog.reblogs_count`: Boosts (number)
- `reblog.favourites_count`: Favourites (number)
- `reblog.edited_at`: Edited At (datetime)
- `reblog.account`: Author
- `reblog.account.id`: Account ID
- `reblog.account.username`: Username
- `reblog.account.acct`: Handle
- `reblog.account.display_name`: Display Name
- `reblog.account.url`: Profile URL (url)
- `reblog.account.avatar`: Avatar (image)
- `reblog.account.bot`: Bot (boolean)
- `reblog.media_attachments`: Media Attachments
- `reblog.media_attachments[].id`: Media ID
- `reblog.media_attachments[].type`: Type
- `reblog.media_attachments[].url`: URL (url)
- `reblog.media_attachments[].preview_url`: Preview (image)
- `reblog.media_attachments[].remote_url`: Remote URL (url)
- `reblog.media_attachments[].description`: Alt Text
- `reblog.media_attachments[].meta`: Metadata
- `reblog.media_attachments[].meta.original`: Original
- `reblog.media_attachments[].meta.original.width`: Width (number)
- `reblog.media_attachments[].meta.original.height`: Height (number)
- `reblog.media_attachments[].meta.focus`: Focal Point
- `reblog.media_attachments[].meta.focus.x`: X (number)
- `reblog.media_attachments[].meta.focus.y`: Y (number)
- `reblog.mentions`: Mentions
- `reblog.mentions[].id`: Account ID
- `reblog.mentions[].username`: Username
- `reblog.mentions[].acct`: Handle
- `reblog.mentions[].url`: Profile URL (url)
- `reblog.tags`: Hashtags
- `reblog.tags[].name`: Name
- `reblog.tags[].url`: URL (url)
- `reblog.poll`: Poll
- `reblog.poll.id`: Poll ID
- `reblog.poll.expires_at`: Expires At (datetime)
- `reblog.poll.expired`: Expired (boolean)
- `reblog.poll.multiple`: Multiple Choice (boolean)
- `reblog.poll.votes_count`: Votes (number)
- `reblog.poll.voters_count`: Voters (number)
- `reblog.poll.voted`: Voted (boolean)
- `reblog.poll.own_votes`: Own Votes (Option Indexes)
- `reblog.poll.options`: Options
- `reblog.poll.options[].title`: Title
- `reblog.poll.options[].votes_count`: Votes (number)
- `reblog.card`: Link Preview
- `reblog.card.url`: URL (url)
- `reblog.card.title`: Title
- `reblog.card.description`: Description
- `reblog.card.type`: Type
- `reblog.card.language`: Language
- `reblog.card.provider_name`: Provider
- `reblog.card.author_name`: Author
- `reblog.card.image`: Image (image)
- `reblog.card.published_at`: Published At (datetime)
- `application`: Posted With
- `application.name`: App Name
- `application.website`: App Website (url)

### `list_scheduled_statuses`

**List Scheduled Statuses.** Returns one page of the connected account's scheduled (not yet published) statuses with cursors for further pages. Use Get Scheduled Status for one item. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of scheduled statuses to return in this page. Defaults to 20, maximum 40. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |
| `min_id` | string | no |  | Min ID (newer page). Cursor for the page immediately newer than a previous page. Pass the `prev_min_id` value from a previous page of this same action. |

Output fields:

- `scheduled_statuses`: Scheduled Statuses
- `scheduled_statuses[].id`: Scheduled Status ID
- `scheduled_statuses[].scheduled_at`: Scheduled At (datetime)
- `scheduled_statuses[].params`: Status Parameters
- `scheduled_statuses[].params.text`: Text
- `scheduled_statuses[].params.visibility`: Visibility
- `scheduled_statuses[].params.spoiler_text`: Content Warning
- `scheduled_statuses[].params.sensitive`: Sensitive (boolean)
- `scheduled_statuses[].params.language`: Language
- `scheduled_statuses[].params.in_reply_to_id`: In Reply To Status ID
- `scheduled_statuses[].params.media_ids`: Media IDs
- `scheduled_statuses[].media_attachments`: Media Attachments
- `scheduled_statuses[].media_attachments[].id`: Media ID
- `scheduled_statuses[].media_attachments[].type`: Type
- `scheduled_statuses[].media_attachments[].url`: URL (url)
- `scheduled_statuses[].media_attachments[].preview_url`: Preview (image)
- `scheduled_statuses[].media_attachments[].remote_url`: Remote URL (url)
- `scheduled_statuses[].media_attachments[].description`: Alt Text
- `scheduled_statuses[].media_attachments[].meta`: Metadata
- `scheduled_statuses[].media_attachments[].meta.original`: Original
- `scheduled_statuses[].media_attachments[].meta.original.width`: Width (number)
- `scheduled_statuses[].media_attachments[].meta.original.height`: Height (number)
- `scheduled_statuses[].media_attachments[].meta.focus`: Focal Point
- `scheduled_statuses[].media_attachments[].meta.focus.x`: X (number)
- `scheduled_statuses[].media_attachments[].meta.focus.y`: Y (number)
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `get_scheduled_status`

**Get Scheduled Status.** Fetches one scheduled (not yet published) status by ID, including its scheduled time and parameters. Use List Scheduled Statuses to find IDs. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `scheduled_status_id` | string | yes |  | Scheduled Status ID. ID of the scheduled status. Obtain it from Schedule Status or List Scheduled Statuses. |

Output fields:

- `id`: Scheduled Status ID
- `scheduled_at`: Scheduled At (datetime)
- `params`: Status Parameters
- `params.text`: Text
- `params.visibility`: Visibility
- `params.spoiler_text`: Content Warning
- `params.sensitive`: Sensitive (boolean)
- `params.language`: Language
- `params.in_reply_to_id`: In Reply To Status ID
- `params.media_ids`: Media IDs
- `media_attachments`: Media Attachments
- `media_attachments[].id`: Media ID
- `media_attachments[].type`: Type
- `media_attachments[].url`: URL (url)
- `media_attachments[].preview_url`: Preview (image)
- `media_attachments[].remote_url`: Remote URL (url)
- `media_attachments[].description`: Alt Text
- `media_attachments[].meta`: Metadata
- `media_attachments[].meta.original`: Original
- `media_attachments[].meta.original.width`: Width (number)
- `media_attachments[].meta.original.height`: Height (number)
- `media_attachments[].meta.focus`: Focal Point
- `media_attachments[].meta.focus.x`: X (number)
- `media_attachments[].meta.focus.y`: Y (number)

### `reschedule_status`

**Reschedule Status.** Moves a scheduled status to a new publication time (at least 6 minutes ahead); its content cannot be changed here. Use Cancel Scheduled Status to drop it instead. Setting the same time again converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `scheduled_status_id` | string | yes |  | Scheduled Status ID. ID of the scheduled status. Obtain it from Schedule Status or List Scheduled Statuses. |
| `scheduled_at` | ISO date-time string | yes |  | Scheduled At. New publication time as an ISO 8601 date-time such as 2026-10-01T09:30:00Z. Must be at least 6 minutes in the future. |

Output fields:

- `id`: Scheduled Status ID
- `scheduled_at`: Scheduled At (datetime)
- `params`: Status Parameters
- `params.text`: Text
- `params.visibility`: Visibility
- `params.spoiler_text`: Content Warning
- `params.sensitive`: Sensitive (boolean)
- `params.language`: Language
- `params.in_reply_to_id`: In Reply To Status ID
- `params.media_ids`: Media IDs
- `media_attachments`: Media Attachments
- `media_attachments[].id`: Media ID
- `media_attachments[].type`: Type
- `media_attachments[].url`: URL (url)
- `media_attachments[].preview_url`: Preview (image)
- `media_attachments[].remote_url`: Remote URL (url)
- `media_attachments[].description`: Alt Text
- `media_attachments[].meta`: Metadata
- `media_attachments[].meta.original`: Original
- `media_attachments[].meta.original.width`: Width (number)
- `media_attachments[].meta.original.height`: Height (number)
- `media_attachments[].meta.focus`: Focal Point
- `media_attachments[].meta.focus.x`: X (number)
- `media_attachments[].meta.focus.y`: Y (number)

### `cancel_scheduled_status`

**Cancel Scheduled Status.** Cancels and deletes a scheduled status so it is never published. Use Reschedule Status to move it instead. Irreversible; repeating the call fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `scheduled_status_id` | string | yes |  | Scheduled Status ID. ID of the scheduled status. Obtain it from Schedule Status or List Scheduled Statuses. |

Output fields:

- `success`: Success (boolean)
- `scheduled_status_id`: Cancelled Scheduled Status ID

### `upload_media`

**Upload Media.** Uploads a media file and returns its ID to pass as Media IDs to Create Status, Schedule Status or Edit Status. Large video and audio are processed asynchronously: when processing is true the url is still null, so call Get Media until url is non-null before attaching it. Unattached uploads expire after a while. Each call uploads a new file. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | File. The image, video or audio file to upload. Files are not supported; an action that needs one fails. |
| `description` | string | no |  | Alt Text. Describe the media for people using screen readers (alt text), for example "A cat asleep on a keyboard". |
| `focus` | string | no |  | Focal Point. Focal point for thumbnail cropping as two comma-separated numbers from -1.0 to 1.0, for example 0.0,0.5. |

Output fields:

- `id`: Media ID
- `type`: Type
- `url`: URL (url)
- `preview_url`: Preview (image)
- `description`: Alt Text
- `processing`: Still Processing (boolean)

### `get_media`

**Get Media.** Reads an uploaded media attachment to check whether processing has finished (processing false and url non-null); poll it after Upload Media before attaching large video or audio. Only works for media not yet attached to a status; to read attached media use Get Status (media_attachments). Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `media_id` | string | yes |  | Media ID. ID of the unattached media. Obtain it from Upload Media. |

Output fields:

- `id`: Media ID
- `type`: Type
- `url`: URL (url)
- `preview_url`: Preview (image)
- `description`: Alt Text
- `processing`: Still Processing (boolean)

### `update_media`

**Update Media.** Updates the alt text and/or focal point of an uploaded media attachment before it is posted; only the fields you set are sent. Only works for media not yet attached to a status; to change media on a published post use Edit Status. Setting the same values again converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `media_id` | string | yes |  | Media ID. ID of the unattached media. Obtain it from Upload Media. |
| `description` | string | no |  | Alt Text. New plain-text description of the media for accessibility. |
| `focus` | string | no |  | Focal Point. New focal point as two comma-separated numbers from -1.0 to 1.0, for example 0.0,0.5. |

Output fields:

- `id`: Media ID
- `type`: Type
- `url`: URL (url)
- `preview_url`: Preview (image)
- `remote_url`: Remote URL (url)
- `description`: Alt Text
- `meta`: Metadata
- `meta.original`: Original
- `meta.original.width`: Width (number)
- `meta.original.height`: Height (number)
- `meta.focus`: Focal Point
- `meta.focus.x`: X (number)
- `meta.focus.y`: Y (number)

### `delete_media`

**Delete Media.** Deletes an uploaded media attachment that has not been attached to a status yet (attached media is removed by deleting the status). Requires Mastodon 4.4 or later. Irreversible; repeating the call fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `media_id` | string | yes |  | Media ID. ID of the media attachment. Obtain it from Upload Media. |

Output fields:

- `success`: Success (boolean)
- `media_id`: Deleted Media ID

### `get_my_account`

**Get My Account.** Returns the connected account's own profile, including its ID, username, counts and default posting settings. Call it first to learn the account ID for actions like List Account Statuses. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: Account ID
- `username`: Username
- `acct`: Handle
- `display_name`: Display Name
- `note`: Bio (html)
- `url`: Profile URL (url)
- `uri`: ActivityPub URI (url)
- `avatar`: Avatar (image)
- `header`: Header Image (image)
- `locked`: Requires Follow Approval (boolean)
- `bot`: Bot (boolean)
- `group`: Group (boolean)
- `discoverable`: Discoverable (boolean)
- `indexable`: Indexable (boolean)
- `created_at`: Created At (datetime)
- `last_status_at`: Last Status Date (date)
- `followers_count`: Followers (number)
- `following_count`: Following (number)
- `statuses_count`: Statuses (number)
- `fields`: Profile Fields
- `fields[].name`: Name
- `fields[].value`: Value (html)
- `fields[].verified_at`: Verified At (datetime)
- `source`: Posting Defaults
- `source.privacy`: Default Visibility
- `source.sensitive`: Mark Media Sensitive by Default (boolean)
- `source.language`: Default Language
- `source.note`: Bio (Plain Text)
- `source.follow_requests_count`: Pending Follow Requests (number)

### `update_my_profile`

**Update My Profile.** Updates the connected account's public profile and posting defaults; only the fields you set change, the rest stay as they are. Profile metadata fields, avatar and header are not handled here. Changes are visible to everyone who views the profile. Setting the same values again converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `display_name` | string | no |  | Display Name. New display name shown on the profile. Leave empty to keep the current display name. |
| `note` | string | no |  | Bio. New profile bio text. Leave empty to keep the current bio. |
| `locked` | string | no |  | Require Follow Approval. Whether new followers must be approved manually. Leave empty to keep the current setting. One of `true`, `false`. |
| `bot` | string | no |  | Bot Account. Whether the profile is flagged as an automated (bot) account. Leave empty to keep the current setting. One of `true`, `false`. |
| `discoverable` | string | no |  | Discoverable. Whether the account is featured in the profile directory. Leave empty to keep the current setting. One of `true`, `false`. |
| `default_visibility` | string | no |  | Default Post Visibility. Default privacy for new posts. Leave empty to keep the current setting. One of `"public"`, `"unlisted"`, `"private"`. |
| `default_language` | string | no |  | Default Post Language. Default ISO 639-1 language code for new posts, for example en. |

Output fields:

- `id`: Account ID
- `username`: Username
- `acct`: Handle
- `display_name`: Display Name
- `note`: Bio (html)
- `url`: Profile URL (url)
- `uri`: ActivityPub URI (url)
- `avatar`: Avatar (image)
- `header`: Header Image (image)
- `locked`: Requires Follow Approval (boolean)
- `bot`: Bot (boolean)
- `group`: Group (boolean)
- `discoverable`: Discoverable (boolean)
- `indexable`: Indexable (boolean)
- `created_at`: Created At (datetime)
- `last_status_at`: Last Status Date (date)
- `followers_count`: Followers (number)
- `following_count`: Following (number)
- `statuses_count`: Statuses (number)
- `fields`: Profile Fields
- `fields[].name`: Name
- `fields[].value`: Value (html)
- `fields[].verified_at`: Verified At (datetime)
- `source`: Posting Defaults
- `source.privacy`: Default Visibility
- `source.sensitive`: Mark Media Sensitive by Default (boolean)
- `source.language`: Default Language
- `source.note`: Bio (Plain Text)
- `source.follow_requests_count`: Pending Follow Requests (number)

### `get_account`

**Get Account.** Fetches an account profile by its local ID. If you only have a handle, use Lookup Account (known accounts) or Search with resolve (remote accounts) to get the ID first. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. Local ID of the account on this server, for example 109302436954721982. Obtain it from Lookup Account, Search Accounts, Get Account or Search (use resolve for a remote user@domain). |

Output fields:

- `id`: Account ID
- `username`: Username
- `acct`: Handle
- `display_name`: Display Name
- `note`: Bio (html)
- `url`: Profile URL (url)
- `uri`: ActivityPub URI (url)
- `avatar`: Avatar (image)
- `header`: Header Image (image)
- `locked`: Requires Follow Approval (boolean)
- `bot`: Bot (boolean)
- `group`: Group (boolean)
- `discoverable`: Discoverable (boolean)
- `indexable`: Indexable (boolean)
- `created_at`: Created At (datetime)
- `last_status_at`: Last Status Date (date)
- `followers_count`: Followers (number)
- `following_count`: Following (number)
- `statuses_count`: Statuses (number)
- `fields`: Profile Fields
- `fields[].name`: Name
- `fields[].value`: Value (html)
- `fields[].verified_at`: Verified At (datetime)

### `lookup_account`

**Lookup Account.** Resolves a handle such as Gargron or Gargron@mastodon.social to the account profile and local ID, without a fuzzy search. Only finds accounts already known to this server; for a remote user@domain that 404s, use Search with resolve=true (type accounts). Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `acct` | string | yes |  | Handle. Username for a local account (for example Gargron) or user@domain for a remote one (for example Gargron@mastodon.social). A leading @ is removed automatically. |

Output fields:

- `id`: Account ID
- `username`: Username
- `acct`: Handle
- `display_name`: Display Name
- `note`: Bio (html)
- `url`: Profile URL (url)
- `uri`: ActivityPub URI (url)
- `avatar`: Avatar (image)
- `header`: Header Image (image)
- `locked`: Requires Follow Approval (boolean)
- `bot`: Bot (boolean)
- `group`: Group (boolean)
- `discoverable`: Discoverable (boolean)
- `indexable`: Indexable (boolean)
- `created_at`: Created At (datetime)
- `last_status_at`: Last Status Date (date)
- `followers_count`: Followers (number)
- `following_count`: Following (number)
- `statuses_count`: Statuses (number)
- `fields`: Profile Fields
- `fields[].name`: Name
- `fields[].value`: Value (html)
- `fields[].verified_at`: Verified At (datetime)

### `search_accounts`

**Search Accounts.** Searches accounts by display name, username or handle and returns matching profiles with their local IDs. Use Lookup Account for an exact handle, or Search to find statuses and hashtags too. Set Resolve to fetch an unknown remote user@domain via WebFinger. Page with Offset. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `q` | string | yes |  | Query. Text to search for, for example a name, username or user@domain. |
| `limit` | number | no |  | Limit. Maximum number of accounts to return in this page. Defaults to 40, maximum 80. |
| `offset` | number | no |  | Offset. Number of results to skip, for paging. Defaults to 0. |
| `resolve` | string | no |  | Resolve Remote Accounts. Look up unknown remote accounts via WebFinger (slower). Leave empty for the server default (no). One of `true`, `false`. |
| `following` | string | no |  | Only Accounts I Follow. Limit results to accounts the connected account follows. Leave empty for no restriction. One of `true`, `false`. |

Output fields:

- `accounts`: Accounts
- `accounts[].id`: Account ID
- `accounts[].username`: Username
- `accounts[].acct`: Handle
- `accounts[].display_name`: Display Name
- `accounts[].note`: Bio (html)
- `accounts[].url`: Profile URL (url)
- `accounts[].uri`: ActivityPub URI (url)
- `accounts[].avatar`: Avatar (image)
- `accounts[].header`: Header Image (image)
- `accounts[].locked`: Requires Follow Approval (boolean)
- `accounts[].bot`: Bot (boolean)
- `accounts[].group`: Group (boolean)
- `accounts[].discoverable`: Discoverable (boolean)
- `accounts[].indexable`: Indexable (boolean)
- `accounts[].created_at`: Created At (datetime)
- `accounts[].last_status_at`: Last Status Date (date)
- `accounts[].followers_count`: Followers (number)
- `accounts[].following_count`: Following (number)
- `accounts[].statuses_count`: Statuses (number)
- `accounts[].fields`: Profile Fields
- `accounts[].fields[].name`: Name
- `accounts[].fields[].value`: Value (html)
- `accounts[].fields[].verified_at`: Verified At (datetime)
- `count`: Count (number)

### `list_account_statuses`

**List Account Statuses.** Returns one page of statuses posted or boosted by an account, newest first, with cursors for further pages; filter to media, pinned posts, a hashtag, or exclude replies and boosts. For your own posts, get your account ID from Get My Account. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. Local ID of the account. Obtain it from Get My Account, Lookup Account, Search Accounts or Search (use resolve for a remote user@domain). |
| `only_media` | boolean | no | `false` | Only Statuses With Media. |
| `exclude_replies` | boolean | no | `false` | Exclude Replies. |
| `exclude_reblogs` | boolean | no | `false` | Exclude Boosts. |
| `pinned` | boolean | no | `false` | Only Pinned Statuses. |
| `tagged` | string | no |  | Hashtag Filter. Only statuses using this hashtag, without the # sign, for example mastodon. |
| `limit` | number | no |  | Limit. Maximum number of statuses to return in this page. Defaults to 20, maximum 40. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |
| `min_id` | string | no |  | Min ID (newer page). Cursor for the page immediately newer than a previous page. Pass the `prev_min_id` value from a previous page of this same action. |

Output fields:

- `statuses`: Statuses
- `statuses[].id`: Status ID
- `statuses[].created_at`: Created At (datetime)
- `statuses[].url`: URL (url)
- `statuses[].uri`: ActivityPub URI (url)
- `statuses[].content`: Content (html)
- `statuses[].spoiler_text`: Content Warning
- `statuses[].sensitive`: Sensitive (boolean)
- `statuses[].visibility`: Visibility
- `statuses[].language`: Language
- `statuses[].in_reply_to_id`: In Reply To Status ID
- `statuses[].in_reply_to_account_id`: In Reply To Account ID
- `statuses[].replies_count`: Replies (number)
- `statuses[].reblogs_count`: Boosts (number)
- `statuses[].favourites_count`: Favourites (number)
- `statuses[].edited_at`: Edited At (datetime)
- `statuses[].account`: Author
- `statuses[].account.id`: Account ID
- `statuses[].account.username`: Username
- `statuses[].account.acct`: Handle
- `statuses[].account.display_name`: Display Name
- `statuses[].account.url`: Profile URL (url)
- `statuses[].account.avatar`: Avatar (image)
- `statuses[].account.bot`: Bot (boolean)
- `statuses[].media_attachments`: Media Attachments
- `statuses[].media_attachments[].id`: Media ID
- `statuses[].media_attachments[].type`: Type
- `statuses[].media_attachments[].url`: URL (url)
- `statuses[].media_attachments[].preview_url`: Preview (image)
- `statuses[].media_attachments[].remote_url`: Remote URL (url)
- `statuses[].media_attachments[].description`: Alt Text
- `statuses[].media_attachments[].meta`: Metadata
- `statuses[].media_attachments[].meta.original`: Original
- `statuses[].media_attachments[].meta.original.width`: Width (number)
- `statuses[].media_attachments[].meta.original.height`: Height (number)
- `statuses[].media_attachments[].meta.focus`: Focal Point
- `statuses[].media_attachments[].meta.focus.x`: X (number)
- `statuses[].media_attachments[].meta.focus.y`: Y (number)
- `statuses[].mentions`: Mentions
- `statuses[].mentions[].id`: Account ID
- `statuses[].mentions[].username`: Username
- `statuses[].mentions[].acct`: Handle
- `statuses[].mentions[].url`: Profile URL (url)
- `statuses[].tags`: Hashtags
- `statuses[].tags[].name`: Name
- `statuses[].tags[].url`: URL (url)
- `statuses[].poll`: Poll
- `statuses[].poll.id`: Poll ID
- `statuses[].poll.expires_at`: Expires At (datetime)
- `statuses[].poll.expired`: Expired (boolean)
- `statuses[].poll.multiple`: Multiple Choice (boolean)
- `statuses[].poll.votes_count`: Votes (number)
- `statuses[].poll.voters_count`: Voters (number)
- `statuses[].poll.voted`: Voted (boolean)
- `statuses[].poll.own_votes`: Own Votes (Option Indexes)
- `statuses[].poll.options`: Options
- `statuses[].poll.options[].title`: Title
- `statuses[].poll.options[].votes_count`: Votes (number)
- `statuses[].card`: Link Preview
- `statuses[].card.url`: URL (url)
- `statuses[].card.title`: Title
- `statuses[].card.description`: Description
- `statuses[].card.type`: Type
- `statuses[].card.language`: Language
- `statuses[].card.provider_name`: Provider
- `statuses[].card.author_name`: Author
- `statuses[].card.image`: Image (image)
- `statuses[].card.published_at`: Published At (datetime)
- `statuses[].favourited`: Favourited by Me (boolean)
- `statuses[].reblogged`: Boosted by Me (boolean)
- `statuses[].bookmarked`: Bookmarked by Me (boolean)
- `statuses[].muted`: Conversation Muted (boolean)
- `statuses[].pinned`: Pinned to Profile (boolean)
- `statuses[].reblog`: Boosted Status
- `statuses[].reblog.id`: Status ID
- `statuses[].reblog.created_at`: Created At (datetime)
- `statuses[].reblog.url`: URL (url)
- `statuses[].reblog.uri`: ActivityPub URI (url)
- `statuses[].reblog.content`: Content (html)
- `statuses[].reblog.spoiler_text`: Content Warning
- `statuses[].reblog.sensitive`: Sensitive (boolean)
- `statuses[].reblog.visibility`: Visibility
- `statuses[].reblog.language`: Language
- `statuses[].reblog.in_reply_to_id`: In Reply To Status ID
- `statuses[].reblog.in_reply_to_account_id`: In Reply To Account ID
- `statuses[].reblog.replies_count`: Replies (number)
- `statuses[].reblog.reblogs_count`: Boosts (number)
- `statuses[].reblog.favourites_count`: Favourites (number)
- `statuses[].reblog.edited_at`: Edited At (datetime)
- `statuses[].reblog.account`: Author
- `statuses[].reblog.account.id`: Account ID
- `statuses[].reblog.account.username`: Username
- `statuses[].reblog.account.acct`: Handle
- `statuses[].reblog.account.display_name`: Display Name
- `statuses[].reblog.account.url`: Profile URL (url)
- `statuses[].reblog.account.avatar`: Avatar (image)
- `statuses[].reblog.account.bot`: Bot (boolean)
- `statuses[].reblog.media_attachments`: Media Attachments
- `statuses[].reblog.media_attachments[].id`: Media ID
- `statuses[].reblog.media_attachments[].type`: Type
- `statuses[].reblog.media_attachments[].url`: URL (url)
- `statuses[].reblog.media_attachments[].preview_url`: Preview (image)
- `statuses[].reblog.media_attachments[].remote_url`: Remote URL (url)
- `statuses[].reblog.media_attachments[].description`: Alt Text
- `statuses[].reblog.media_attachments[].meta`: Metadata
- `statuses[].reblog.media_attachments[].meta.original`: Original
- `statuses[].reblog.media_attachments[].meta.original.width`: Width (number)
- `statuses[].reblog.media_attachments[].meta.original.height`: Height (number)
- `statuses[].reblog.media_attachments[].meta.focus`: Focal Point
- `statuses[].reblog.media_attachments[].meta.focus.x`: X (number)
- `statuses[].reblog.media_attachments[].meta.focus.y`: Y (number)
- `statuses[].reblog.mentions`: Mentions
- `statuses[].reblog.mentions[].id`: Account ID
- `statuses[].reblog.mentions[].username`: Username
- `statuses[].reblog.mentions[].acct`: Handle
- `statuses[].reblog.mentions[].url`: Profile URL (url)
- `statuses[].reblog.tags`: Hashtags
- `statuses[].reblog.tags[].name`: Name
- `statuses[].reblog.tags[].url`: URL (url)
- `statuses[].reblog.poll`: Poll
- `statuses[].reblog.poll.id`: Poll ID
- `statuses[].reblog.poll.expires_at`: Expires At (datetime)
- `statuses[].reblog.poll.expired`: Expired (boolean)
- `statuses[].reblog.poll.multiple`: Multiple Choice (boolean)
- `statuses[].reblog.poll.votes_count`: Votes (number)
- `statuses[].reblog.poll.voters_count`: Voters (number)
- `statuses[].reblog.poll.voted`: Voted (boolean)
- `statuses[].reblog.poll.own_votes`: Own Votes (Option Indexes)
- `statuses[].reblog.poll.options`: Options
- `statuses[].reblog.poll.options[].title`: Title
- `statuses[].reblog.poll.options[].votes_count`: Votes (number)
- `statuses[].reblog.card`: Link Preview
- `statuses[].reblog.card.url`: URL (url)
- `statuses[].reblog.card.title`: Title
- `statuses[].reblog.card.description`: Description
- `statuses[].reblog.card.type`: Type
- `statuses[].reblog.card.language`: Language
- `statuses[].reblog.card.provider_name`: Provider
- `statuses[].reblog.card.author_name`: Author
- `statuses[].reblog.card.image`: Image (image)
- `statuses[].reblog.card.published_at`: Published At (datetime)
- `statuses[].application`: Posted With
- `statuses[].application.name`: App Name
- `statuses[].application.website`: App Website (url)
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `list_account_followers`

**List Account Followers.** Returns one page of accounts following the given account, with Link-header cursors for further pages. Empty when the account hides its social graph. Use List Account Following for the reverse direction. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. Local ID of the account on this server, for example 109302436954721982. Obtain it from Lookup Account, Search Accounts, Get Account or Search (use resolve for a remote user@domain). |
| `limit` | number | no |  | Limit. Maximum number of accounts to return in this page. Defaults to 40, maximum 80. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |
| `min_id` | string | no |  | Min ID (newer page). Cursor for the page immediately newer than a previous page. Pass the `prev_min_id` value from a previous page of this same action. |

Output fields:

- `accounts`: Accounts
- `accounts[].id`: Account ID
- `accounts[].username`: Username
- `accounts[].acct`: Handle
- `accounts[].display_name`: Display Name
- `accounts[].note`: Bio (html)
- `accounts[].url`: Profile URL (url)
- `accounts[].uri`: ActivityPub URI (url)
- `accounts[].avatar`: Avatar (image)
- `accounts[].header`: Header Image (image)
- `accounts[].locked`: Requires Follow Approval (boolean)
- `accounts[].bot`: Bot (boolean)
- `accounts[].group`: Group (boolean)
- `accounts[].discoverable`: Discoverable (boolean)
- `accounts[].indexable`: Indexable (boolean)
- `accounts[].created_at`: Created At (datetime)
- `accounts[].last_status_at`: Last Status Date (date)
- `accounts[].followers_count`: Followers (number)
- `accounts[].following_count`: Following (number)
- `accounts[].statuses_count`: Statuses (number)
- `accounts[].fields`: Profile Fields
- `accounts[].fields[].name`: Name
- `accounts[].fields[].value`: Value (html)
- `accounts[].fields[].verified_at`: Verified At (datetime)
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `list_account_following`

**List Account Following.** Returns one page of accounts the given account follows, with Link-header cursors for further pages. Empty when the account hides its social graph. Use List Account Followers for the reverse direction. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. Local ID of the account on this server, for example 109302436954721982. Obtain it from Lookup Account, Search Accounts, Get Account or Search (use resolve for a remote user@domain). |
| `limit` | number | no |  | Limit. Maximum number of accounts to return in this page. Defaults to 40, maximum 80. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |
| `min_id` | string | no |  | Min ID (newer page). Cursor for the page immediately newer than a previous page. Pass the `prev_min_id` value from a previous page of this same action. |

Output fields:

- `accounts`: Accounts
- `accounts[].id`: Account ID
- `accounts[].username`: Username
- `accounts[].acct`: Handle
- `accounts[].display_name`: Display Name
- `accounts[].note`: Bio (html)
- `accounts[].url`: Profile URL (url)
- `accounts[].uri`: ActivityPub URI (url)
- `accounts[].avatar`: Avatar (image)
- `accounts[].header`: Header Image (image)
- `accounts[].locked`: Requires Follow Approval (boolean)
- `accounts[].bot`: Bot (boolean)
- `accounts[].group`: Group (boolean)
- `accounts[].discoverable`: Discoverable (boolean)
- `accounts[].indexable`: Indexable (boolean)
- `accounts[].created_at`: Created At (datetime)
- `accounts[].last_status_at`: Last Status Date (date)
- `accounts[].followers_count`: Followers (number)
- `accounts[].following_count`: Following (number)
- `accounts[].statuses_count`: Statuses (number)
- `accounts[].fields`: Profile Fields
- `accounts[].fields[].name`: Name
- `accounts[].fields[].value`: Value (html)
- `accounts[].fields[].verified_at`: Verified At (datetime)
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `get_relationships`

**Get Relationships.** Returns the connected account's relationship with each given account: following, followed by, requested, blocking, muting and more. Use it to check state before Follow Account, Block Account or Mute Account. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_ids` | array | yes |  | Account IDs. Local account IDs to check, one per item. Obtain them from Lookup Account, Search Accounts or Get Account. |

Output fields:

- `relationships`: Relationships
- `relationships[].id`: Account ID
- `relationships[].following`: Following (boolean)
- `relationships[].followed_by`: Follows You (boolean)
- `relationships[].requested`: Follow Request Pending (boolean)
- `relationships[].requested_by`: Has Requested to Follow You (boolean)
- `relationships[].showing_reblogs`: Showing Their Boosts (boolean)
- `relationships[].notifying`: Notified of Their Posts (boolean)
- `relationships[].languages`: Language Filter
- `relationships[].blocking`: Blocking (boolean)
- `relationships[].blocked_by`: Blocked by Them (boolean)
- `relationships[].muting`: Muting (boolean)
- `relationships[].muting_notifications`: Muting Their Notifications (boolean)
- `relationships[].muting_expires_at`: Mute Expires At (datetime)
- `relationships[].domain_blocking`: Blocking Their Domain (boolean)
- `relationships[].endorsed`: Featured on Profile (boolean)
- `relationships[].note`: Private Note
- `count`: Count (number)

### `follow_account`

**Follow Account.** Follows an account as the connected account (for a locked account this sends a follow request); the target is notified. Calling it again on an account you already follow does not error and just updates the boost, notification and language options. Returns the relationship. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. ID of the account to follow, for example 109302436954721982 (not the @handle). Map it from Lookup Account (Account ID), from the New Follower trigger (From Account > Account ID) to follow back, or from Search for a user@domain on another server. |
| `reblogs` | string | no |  | Show Their Boosts. Whether their boosts appear in your home timeline. Leave empty for the default (yes). One of `true`, `false`. |
| `notify` | string | no |  | Notify When They Post. Whether to get a notification for each of their posts. Leave empty for the default (no). One of `true`, `false`. |
| `languages` | array | no |  | Languages. Only show their posts in these ISO 639-1 languages, one code per item (for example en). Leave empty for all languages. |

Output fields:

- `id`: Account ID
- `following`: Following (boolean)
- `followed_by`: Follows You (boolean)
- `requested`: Follow Request Pending (boolean)
- `requested_by`: Has Requested to Follow You (boolean)
- `showing_reblogs`: Showing Their Boosts (boolean)
- `notifying`: Notified of Their Posts (boolean)
- `languages`: Language Filter
- `blocking`: Blocking (boolean)
- `blocked_by`: Blocked by Them (boolean)
- `muting`: Muting (boolean)
- `muting_notifications`: Muting Their Notifications (boolean)
- `muting_expires_at`: Mute Expires At (datetime)
- `domain_blocking`: Blocking Their Domain (boolean)
- `endorsed`: Featured on Profile (boolean)
- `note`: Private Note

### `unfollow_account`

**Unfollow Account.** Unfollows an account (or withdraws a pending follow request) as the connected account. Safe to retry. Returns the updated relationship. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. ID of the account to unfollow, for example 109302436954721982 (not the @handle). Map it from Lookup Account (Account ID), Search Accounts, Get Account or Search for a user@domain on another server. |

Output fields:

- `id`: Account ID
- `following`: Following (boolean)
- `followed_by`: Follows You (boolean)
- `requested`: Follow Request Pending (boolean)
- `requested_by`: Has Requested to Follow You (boolean)
- `showing_reblogs`: Showing Their Boosts (boolean)
- `notifying`: Notified of Their Posts (boolean)
- `languages`: Language Filter
- `blocking`: Blocking (boolean)
- `blocked_by`: Blocked by Them (boolean)
- `muting`: Muting (boolean)
- `muting_notifications`: Muting Their Notifications (boolean)
- `muting_expires_at`: Mute Expires At (datetime)
- `domain_blocking`: Blocking Their Domain (boolean)
- `endorsed`: Featured on Profile (boolean)
- `note`: Private Note

### `block_account`

**Block Account.** Blocks an account: it can no longer see or interact with the connected account, and any follow in either direction is removed (re-following is needed after an unblock). Use Mute Account to hide someone without them noticing. Safe to retry. Returns the updated relationship. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. Local ID of the account on this server, for example 109302436954721982. Obtain it from Lookup Account, Search Accounts, Get Account or Search (use resolve for a remote user@domain). |

Output fields:

- `id`: Account ID
- `following`: Following (boolean)
- `followed_by`: Follows You (boolean)
- `requested`: Follow Request Pending (boolean)
- `requested_by`: Has Requested to Follow You (boolean)
- `showing_reblogs`: Showing Their Boosts (boolean)
- `notifying`: Notified of Their Posts (boolean)
- `languages`: Language Filter
- `blocking`: Blocking (boolean)
- `blocked_by`: Blocked by Them (boolean)
- `muting`: Muting (boolean)
- `muting_notifications`: Muting Their Notifications (boolean)
- `muting_expires_at`: Mute Expires At (datetime)
- `domain_blocking`: Blocking Their Domain (boolean)
- `endorsed`: Featured on Profile (boolean)
- `note`: Private Note

### `unblock_account`

**Unblock Account.** Removes a block on an account. Follows removed by the block are not restored. Safe to retry. Returns the updated relationship. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. Local ID of the account on this server, for example 109302436954721982. Obtain it from Lookup Account, Search Accounts, Get Account or Search (use resolve for a remote user@domain). |

Output fields:

- `id`: Account ID
- `following`: Following (boolean)
- `followed_by`: Follows You (boolean)
- `requested`: Follow Request Pending (boolean)
- `requested_by`: Has Requested to Follow You (boolean)
- `showing_reblogs`: Showing Their Boosts (boolean)
- `notifying`: Notified of Their Posts (boolean)
- `languages`: Language Filter
- `blocking`: Blocking (boolean)
- `blocked_by`: Blocked by Them (boolean)
- `muting`: Muting (boolean)
- `muting_notifications`: Muting Their Notifications (boolean)
- `muting_expires_at`: Mute Expires At (datetime)
- `domain_blocking`: Blocking Their Domain (boolean)
- `endorsed`: Featured on Profile (boolean)
- `note`: Private Note

### `mute_account`

**Mute Account.** Mutes an account so its posts are hidden from the connected account (the muted account is not told). Unset Mute Notifications also hides their notifications; unset Duration mutes indefinitely. Calling it on an already-muted account overwrites the existing mute's duration and notification setting, so pass both to keep them. Use Block Account to also stop them seeing you. Returns the relationship. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. Local ID of the account to mute. Obtain it from Lookup Account, Search Accounts or Search (use resolve for a remote user@domain). |
| `notifications` | string | no |  | Mute Notifications. Also hide notifications from this account. Leave empty for the default (yes). One of `true`, `false`. |
| `duration` | number | no |  | Duration (seconds). How long the mute lasts, in seconds, for example 86400 for one day. Leave empty or 0 to mute indefinitely. |

Output fields:

- `id`: Account ID
- `following`: Following (boolean)
- `followed_by`: Follows You (boolean)
- `requested`: Follow Request Pending (boolean)
- `requested_by`: Has Requested to Follow You (boolean)
- `showing_reblogs`: Showing Their Boosts (boolean)
- `notifying`: Notified of Their Posts (boolean)
- `languages`: Language Filter
- `blocking`: Blocking (boolean)
- `blocked_by`: Blocked by Them (boolean)
- `muting`: Muting (boolean)
- `muting_notifications`: Muting Their Notifications (boolean)
- `muting_expires_at`: Mute Expires At (datetime)
- `domain_blocking`: Blocking Their Domain (boolean)
- `endorsed`: Featured on Profile (boolean)
- `note`: Private Note

### `unmute_account`

**Unmute Account.** Removes a mute on an account so its posts and notifications show again. Safe to retry. Returns the updated relationship. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. Local ID of the account on this server, for example 109302436954721982. Obtain it from Lookup Account, Search Accounts, Get Account or Search (use resolve for a remote user@domain). |

Output fields:

- `id`: Account ID
- `following`: Following (boolean)
- `followed_by`: Follows You (boolean)
- `requested`: Follow Request Pending (boolean)
- `requested_by`: Has Requested to Follow You (boolean)
- `showing_reblogs`: Showing Their Boosts (boolean)
- `notifying`: Notified of Their Posts (boolean)
- `languages`: Language Filter
- `blocking`: Blocking (boolean)
- `blocked_by`: Blocked by Them (boolean)
- `muting`: Muting (boolean)
- `muting_notifications`: Muting Their Notifications (boolean)
- `muting_expires_at`: Mute Expires At (datetime)
- `domain_blocking`: Blocking Their Domain (boolean)
- `endorsed`: Featured on Profile (boolean)
- `note`: Private Note

### `list_blocked_accounts`

**List Blocked Accounts.** Returns one page of accounts blocked by the connected account, with Link-header cursors for further pages. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of accounts to return in this page. Defaults to 40, maximum 80. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |
| `min_id` | string | no |  | Min ID (newer page). Cursor for the page immediately newer than a previous page. Pass the `prev_min_id` value from a previous page of this same action. |

Output fields:

- `accounts`: Accounts
- `accounts[].id`: Account ID
- `accounts[].username`: Username
- `accounts[].acct`: Handle
- `accounts[].display_name`: Display Name
- `accounts[].note`: Bio (html)
- `accounts[].url`: Profile URL (url)
- `accounts[].uri`: ActivityPub URI (url)
- `accounts[].avatar`: Avatar (image)
- `accounts[].header`: Header Image (image)
- `accounts[].locked`: Requires Follow Approval (boolean)
- `accounts[].bot`: Bot (boolean)
- `accounts[].group`: Group (boolean)
- `accounts[].discoverable`: Discoverable (boolean)
- `accounts[].indexable`: Indexable (boolean)
- `accounts[].created_at`: Created At (datetime)
- `accounts[].last_status_at`: Last Status Date (date)
- `accounts[].followers_count`: Followers (number)
- `accounts[].following_count`: Following (number)
- `accounts[].statuses_count`: Statuses (number)
- `accounts[].fields`: Profile Fields
- `accounts[].fields[].name`: Name
- `accounts[].fields[].value`: Value (html)
- `accounts[].fields[].verified_at`: Verified At (datetime)
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `list_muted_accounts`

**List Muted Accounts.** Returns one page of accounts muted by the connected account (each with mute_expires_at for timed mutes), with Link-header cursors for further pages. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of accounts to return in this page. Defaults to 40, maximum 80. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |

Output fields:

- `accounts`: Muted Accounts
- `accounts[].id`: Account ID
- `accounts[].username`: Username
- `accounts[].acct`: Handle
- `accounts[].display_name`: Display Name
- `accounts[].note`: Bio (html)
- `accounts[].url`: Profile URL (url)
- `accounts[].uri`: ActivityPub URI (url)
- `accounts[].avatar`: Avatar (image)
- `accounts[].header`: Header Image (image)
- `accounts[].locked`: Requires Follow Approval (boolean)
- `accounts[].bot`: Bot (boolean)
- `accounts[].group`: Group (boolean)
- `accounts[].discoverable`: Discoverable (boolean)
- `accounts[].indexable`: Indexable (boolean)
- `accounts[].created_at`: Created At (datetime)
- `accounts[].last_status_at`: Last Status Date (date)
- `accounts[].followers_count`: Followers (number)
- `accounts[].following_count`: Following (number)
- `accounts[].statuses_count`: Statuses (number)
- `accounts[].fields`: Profile Fields
- `accounts[].fields[].name`: Name
- `accounts[].fields[].value`: Value (html)
- `accounts[].fields[].verified_at`: Verified At (datetime)
- `accounts[].mute_expires_at`: Mute Expires At (datetime)
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `list_follow_requests`

**List Follow Requests.** Returns one page of accounts with a pending request to follow the connected (locked) account, with Link-header cursors for further pages. Handle them with Accept Follow Request or Reject Follow Request. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of accounts to return in this page. Defaults to 40, maximum 80. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |

Output fields:

- `accounts`: Accounts
- `accounts[].id`: Account ID
- `accounts[].username`: Username
- `accounts[].acct`: Handle
- `accounts[].display_name`: Display Name
- `accounts[].note`: Bio (html)
- `accounts[].url`: Profile URL (url)
- `accounts[].uri`: ActivityPub URI (url)
- `accounts[].avatar`: Avatar (image)
- `accounts[].header`: Header Image (image)
- `accounts[].locked`: Requires Follow Approval (boolean)
- `accounts[].bot`: Bot (boolean)
- `accounts[].group`: Group (boolean)
- `accounts[].discoverable`: Discoverable (boolean)
- `accounts[].indexable`: Indexable (boolean)
- `accounts[].created_at`: Created At (datetime)
- `accounts[].last_status_at`: Last Status Date (date)
- `accounts[].followers_count`: Followers (number)
- `accounts[].following_count`: Following (number)
- `accounts[].statuses_count`: Statuses (number)
- `accounts[].fields`: Profile Fields
- `accounts[].fields[].name`: Name
- `accounts[].fields[].value`: Value (html)
- `accounts[].fields[].verified_at`: Verified At (datetime)
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `accept_follow_request`

**Accept Follow Request.** Accepts a pending follow request so the requesting account becomes a follower of the connected (locked) account. Get the account ID from List Follow Requests. Repeating the call fails with not found once the request is handled. Returns the updated relationship. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. Local ID of the account that requested to follow you. Obtain it from List Follow Requests. |

Output fields:

- `id`: Account ID
- `following`: Following (boolean)
- `followed_by`: Follows You (boolean)
- `requested`: Follow Request Pending (boolean)
- `requested_by`: Has Requested to Follow You (boolean)
- `showing_reblogs`: Showing Their Boosts (boolean)
- `notifying`: Notified of Their Posts (boolean)
- `languages`: Language Filter
- `blocking`: Blocking (boolean)
- `blocked_by`: Blocked by Them (boolean)
- `muting`: Muting (boolean)
- `muting_notifications`: Muting Their Notifications (boolean)
- `muting_expires_at`: Mute Expires At (datetime)
- `domain_blocking`: Blocking Their Domain (boolean)
- `endorsed`: Featured on Profile (boolean)
- `note`: Private Note

### `reject_follow_request`

**Reject Follow Request.** Rejects a pending follow request to the connected (locked) account. Get the account ID from List Follow Requests. Repeating the call fails with not found once the request is handled. Returns the updated relationship. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. Local ID of the account that requested to follow you. Obtain it from List Follow Requests. |

Output fields:

- `id`: Account ID
- `following`: Following (boolean)
- `followed_by`: Follows You (boolean)
- `requested`: Follow Request Pending (boolean)
- `requested_by`: Has Requested to Follow You (boolean)
- `showing_reblogs`: Showing Their Boosts (boolean)
- `notifying`: Notified of Their Posts (boolean)
- `languages`: Language Filter
- `blocking`: Blocking (boolean)
- `blocked_by`: Blocked by Them (boolean)
- `muting`: Muting (boolean)
- `muting_notifications`: Muting Their Notifications (boolean)
- `muting_expires_at`: Mute Expires At (datetime)
- `domain_blocking`: Blocking Their Domain (boolean)
- `endorsed`: Featured on Profile (boolean)
- `note`: Private Note

### `list_bookmarks`

**List Bookmarks.** Returns one page of statuses bookmarked by the connected account, newest bookmark first, with Link-header cursors for further pages. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of statuses to return in this page. Defaults to 20, maximum 40. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |
| `min_id` | string | no |  | Min ID (newer page). Cursor for the page immediately newer than a previous page. Pass the `prev_min_id` value from a previous page of this same action. |

Output fields:

- `statuses`: Statuses
- `statuses[].id`: Status ID
- `statuses[].created_at`: Created At (datetime)
- `statuses[].url`: URL (url)
- `statuses[].uri`: ActivityPub URI (url)
- `statuses[].content`: Content (html)
- `statuses[].spoiler_text`: Content Warning
- `statuses[].sensitive`: Sensitive (boolean)
- `statuses[].visibility`: Visibility
- `statuses[].language`: Language
- `statuses[].in_reply_to_id`: In Reply To Status ID
- `statuses[].in_reply_to_account_id`: In Reply To Account ID
- `statuses[].replies_count`: Replies (number)
- `statuses[].reblogs_count`: Boosts (number)
- `statuses[].favourites_count`: Favourites (number)
- `statuses[].edited_at`: Edited At (datetime)
- `statuses[].account`: Author
- `statuses[].account.id`: Account ID
- `statuses[].account.username`: Username
- `statuses[].account.acct`: Handle
- `statuses[].account.display_name`: Display Name
- `statuses[].account.url`: Profile URL (url)
- `statuses[].account.avatar`: Avatar (image)
- `statuses[].account.bot`: Bot (boolean)
- `statuses[].media_attachments`: Media Attachments
- `statuses[].media_attachments[].id`: Media ID
- `statuses[].media_attachments[].type`: Type
- `statuses[].media_attachments[].url`: URL (url)
- `statuses[].media_attachments[].preview_url`: Preview (image)
- `statuses[].media_attachments[].remote_url`: Remote URL (url)
- `statuses[].media_attachments[].description`: Alt Text
- `statuses[].media_attachments[].meta`: Metadata
- `statuses[].media_attachments[].meta.original`: Original
- `statuses[].media_attachments[].meta.original.width`: Width (number)
- `statuses[].media_attachments[].meta.original.height`: Height (number)
- `statuses[].media_attachments[].meta.focus`: Focal Point
- `statuses[].media_attachments[].meta.focus.x`: X (number)
- `statuses[].media_attachments[].meta.focus.y`: Y (number)
- `statuses[].mentions`: Mentions
- `statuses[].mentions[].id`: Account ID
- `statuses[].mentions[].username`: Username
- `statuses[].mentions[].acct`: Handle
- `statuses[].mentions[].url`: Profile URL (url)
- `statuses[].tags`: Hashtags
- `statuses[].tags[].name`: Name
- `statuses[].tags[].url`: URL (url)
- `statuses[].poll`: Poll
- `statuses[].poll.id`: Poll ID
- `statuses[].poll.expires_at`: Expires At (datetime)
- `statuses[].poll.expired`: Expired (boolean)
- `statuses[].poll.multiple`: Multiple Choice (boolean)
- `statuses[].poll.votes_count`: Votes (number)
- `statuses[].poll.voters_count`: Voters (number)
- `statuses[].poll.voted`: Voted (boolean)
- `statuses[].poll.own_votes`: Own Votes (Option Indexes)
- `statuses[].poll.options`: Options
- `statuses[].poll.options[].title`: Title
- `statuses[].poll.options[].votes_count`: Votes (number)
- `statuses[].card`: Link Preview
- `statuses[].card.url`: URL (url)
- `statuses[].card.title`: Title
- `statuses[].card.description`: Description
- `statuses[].card.type`: Type
- `statuses[].card.language`: Language
- `statuses[].card.provider_name`: Provider
- `statuses[].card.author_name`: Author
- `statuses[].card.image`: Image (image)
- `statuses[].card.published_at`: Published At (datetime)
- `statuses[].favourited`: Favourited by Me (boolean)
- `statuses[].reblogged`: Boosted by Me (boolean)
- `statuses[].bookmarked`: Bookmarked by Me (boolean)
- `statuses[].muted`: Conversation Muted (boolean)
- `statuses[].pinned`: Pinned to Profile (boolean)
- `statuses[].reblog`: Boosted Status
- `statuses[].reblog.id`: Status ID
- `statuses[].reblog.created_at`: Created At (datetime)
- `statuses[].reblog.url`: URL (url)
- `statuses[].reblog.uri`: ActivityPub URI (url)
- `statuses[].reblog.content`: Content (html)
- `statuses[].reblog.spoiler_text`: Content Warning
- `statuses[].reblog.sensitive`: Sensitive (boolean)
- `statuses[].reblog.visibility`: Visibility
- `statuses[].reblog.language`: Language
- `statuses[].reblog.in_reply_to_id`: In Reply To Status ID
- `statuses[].reblog.in_reply_to_account_id`: In Reply To Account ID
- `statuses[].reblog.replies_count`: Replies (number)
- `statuses[].reblog.reblogs_count`: Boosts (number)
- `statuses[].reblog.favourites_count`: Favourites (number)
- `statuses[].reblog.edited_at`: Edited At (datetime)
- `statuses[].reblog.account`: Author
- `statuses[].reblog.account.id`: Account ID
- `statuses[].reblog.account.username`: Username
- `statuses[].reblog.account.acct`: Handle
- `statuses[].reblog.account.display_name`: Display Name
- `statuses[].reblog.account.url`: Profile URL (url)
- `statuses[].reblog.account.avatar`: Avatar (image)
- `statuses[].reblog.account.bot`: Bot (boolean)
- `statuses[].reblog.media_attachments`: Media Attachments
- `statuses[].reblog.media_attachments[].id`: Media ID
- `statuses[].reblog.media_attachments[].type`: Type
- `statuses[].reblog.media_attachments[].url`: URL (url)
- `statuses[].reblog.media_attachments[].preview_url`: Preview (image)
- `statuses[].reblog.media_attachments[].remote_url`: Remote URL (url)
- `statuses[].reblog.media_attachments[].description`: Alt Text
- `statuses[].reblog.media_attachments[].meta`: Metadata
- `statuses[].reblog.media_attachments[].meta.original`: Original
- `statuses[].reblog.media_attachments[].meta.original.width`: Width (number)
- `statuses[].reblog.media_attachments[].meta.original.height`: Height (number)
- `statuses[].reblog.media_attachments[].meta.focus`: Focal Point
- `statuses[].reblog.media_attachments[].meta.focus.x`: X (number)
- `statuses[].reblog.media_attachments[].meta.focus.y`: Y (number)
- `statuses[].reblog.mentions`: Mentions
- `statuses[].reblog.mentions[].id`: Account ID
- `statuses[].reblog.mentions[].username`: Username
- `statuses[].reblog.mentions[].acct`: Handle
- `statuses[].reblog.mentions[].url`: Profile URL (url)
- `statuses[].reblog.tags`: Hashtags
- `statuses[].reblog.tags[].name`: Name
- `statuses[].reblog.tags[].url`: URL (url)
- `statuses[].reblog.poll`: Poll
- `statuses[].reblog.poll.id`: Poll ID
- `statuses[].reblog.poll.expires_at`: Expires At (datetime)
- `statuses[].reblog.poll.expired`: Expired (boolean)
- `statuses[].reblog.poll.multiple`: Multiple Choice (boolean)
- `statuses[].reblog.poll.votes_count`: Votes (number)
- `statuses[].reblog.poll.voters_count`: Voters (number)
- `statuses[].reblog.poll.voted`: Voted (boolean)
- `statuses[].reblog.poll.own_votes`: Own Votes (Option Indexes)
- `statuses[].reblog.poll.options`: Options
- `statuses[].reblog.poll.options[].title`: Title
- `statuses[].reblog.poll.options[].votes_count`: Votes (number)
- `statuses[].reblog.card`: Link Preview
- `statuses[].reblog.card.url`: URL (url)
- `statuses[].reblog.card.title`: Title
- `statuses[].reblog.card.description`: Description
- `statuses[].reblog.card.type`: Type
- `statuses[].reblog.card.language`: Language
- `statuses[].reblog.card.provider_name`: Provider
- `statuses[].reblog.card.author_name`: Author
- `statuses[].reblog.card.image`: Image (image)
- `statuses[].reblog.card.published_at`: Published At (datetime)
- `statuses[].application`: Posted With
- `statuses[].application.name`: App Name
- `statuses[].application.website`: App Website (url)
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `list_favourites`

**List Favourites.** Returns one page of statuses favourited by the connected account, newest favourite first, with Link-header cursors for further pages. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of statuses to return in this page. Defaults to 20, maximum 40. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |
| `min_id` | string | no |  | Min ID (newer page). Cursor for the page immediately newer than a previous page. Pass the `prev_min_id` value from a previous page of this same action. |

Output fields:

- `statuses`: Statuses
- `statuses[].id`: Status ID
- `statuses[].created_at`: Created At (datetime)
- `statuses[].url`: URL (url)
- `statuses[].uri`: ActivityPub URI (url)
- `statuses[].content`: Content (html)
- `statuses[].spoiler_text`: Content Warning
- `statuses[].sensitive`: Sensitive (boolean)
- `statuses[].visibility`: Visibility
- `statuses[].language`: Language
- `statuses[].in_reply_to_id`: In Reply To Status ID
- `statuses[].in_reply_to_account_id`: In Reply To Account ID
- `statuses[].replies_count`: Replies (number)
- `statuses[].reblogs_count`: Boosts (number)
- `statuses[].favourites_count`: Favourites (number)
- `statuses[].edited_at`: Edited At (datetime)
- `statuses[].account`: Author
- `statuses[].account.id`: Account ID
- `statuses[].account.username`: Username
- `statuses[].account.acct`: Handle
- `statuses[].account.display_name`: Display Name
- `statuses[].account.url`: Profile URL (url)
- `statuses[].account.avatar`: Avatar (image)
- `statuses[].account.bot`: Bot (boolean)
- `statuses[].media_attachments`: Media Attachments
- `statuses[].media_attachments[].id`: Media ID
- `statuses[].media_attachments[].type`: Type
- `statuses[].media_attachments[].url`: URL (url)
- `statuses[].media_attachments[].preview_url`: Preview (image)
- `statuses[].media_attachments[].remote_url`: Remote URL (url)
- `statuses[].media_attachments[].description`: Alt Text
- `statuses[].media_attachments[].meta`: Metadata
- `statuses[].media_attachments[].meta.original`: Original
- `statuses[].media_attachments[].meta.original.width`: Width (number)
- `statuses[].media_attachments[].meta.original.height`: Height (number)
- `statuses[].media_attachments[].meta.focus`: Focal Point
- `statuses[].media_attachments[].meta.focus.x`: X (number)
- `statuses[].media_attachments[].meta.focus.y`: Y (number)
- `statuses[].mentions`: Mentions
- `statuses[].mentions[].id`: Account ID
- `statuses[].mentions[].username`: Username
- `statuses[].mentions[].acct`: Handle
- `statuses[].mentions[].url`: Profile URL (url)
- `statuses[].tags`: Hashtags
- `statuses[].tags[].name`: Name
- `statuses[].tags[].url`: URL (url)
- `statuses[].poll`: Poll
- `statuses[].poll.id`: Poll ID
- `statuses[].poll.expires_at`: Expires At (datetime)
- `statuses[].poll.expired`: Expired (boolean)
- `statuses[].poll.multiple`: Multiple Choice (boolean)
- `statuses[].poll.votes_count`: Votes (number)
- `statuses[].poll.voters_count`: Voters (number)
- `statuses[].poll.voted`: Voted (boolean)
- `statuses[].poll.own_votes`: Own Votes (Option Indexes)
- `statuses[].poll.options`: Options
- `statuses[].poll.options[].title`: Title
- `statuses[].poll.options[].votes_count`: Votes (number)
- `statuses[].card`: Link Preview
- `statuses[].card.url`: URL (url)
- `statuses[].card.title`: Title
- `statuses[].card.description`: Description
- `statuses[].card.type`: Type
- `statuses[].card.language`: Language
- `statuses[].card.provider_name`: Provider
- `statuses[].card.author_name`: Author
- `statuses[].card.image`: Image (image)
- `statuses[].card.published_at`: Published At (datetime)
- `statuses[].favourited`: Favourited by Me (boolean)
- `statuses[].reblogged`: Boosted by Me (boolean)
- `statuses[].bookmarked`: Bookmarked by Me (boolean)
- `statuses[].muted`: Conversation Muted (boolean)
- `statuses[].pinned`: Pinned to Profile (boolean)
- `statuses[].reblog`: Boosted Status
- `statuses[].reblog.id`: Status ID
- `statuses[].reblog.created_at`: Created At (datetime)
- `statuses[].reblog.url`: URL (url)
- `statuses[].reblog.uri`: ActivityPub URI (url)
- `statuses[].reblog.content`: Content (html)
- `statuses[].reblog.spoiler_text`: Content Warning
- `statuses[].reblog.sensitive`: Sensitive (boolean)
- `statuses[].reblog.visibility`: Visibility
- `statuses[].reblog.language`: Language
- `statuses[].reblog.in_reply_to_id`: In Reply To Status ID
- `statuses[].reblog.in_reply_to_account_id`: In Reply To Account ID
- `statuses[].reblog.replies_count`: Replies (number)
- `statuses[].reblog.reblogs_count`: Boosts (number)
- `statuses[].reblog.favourites_count`: Favourites (number)
- `statuses[].reblog.edited_at`: Edited At (datetime)
- `statuses[].reblog.account`: Author
- `statuses[].reblog.account.id`: Account ID
- `statuses[].reblog.account.username`: Username
- `statuses[].reblog.account.acct`: Handle
- `statuses[].reblog.account.display_name`: Display Name
- `statuses[].reblog.account.url`: Profile URL (url)
- `statuses[].reblog.account.avatar`: Avatar (image)
- `statuses[].reblog.account.bot`: Bot (boolean)
- `statuses[].reblog.media_attachments`: Media Attachments
- `statuses[].reblog.media_attachments[].id`: Media ID
- `statuses[].reblog.media_attachments[].type`: Type
- `statuses[].reblog.media_attachments[].url`: URL (url)
- `statuses[].reblog.media_attachments[].preview_url`: Preview (image)
- `statuses[].reblog.media_attachments[].remote_url`: Remote URL (url)
- `statuses[].reblog.media_attachments[].description`: Alt Text
- `statuses[].reblog.media_attachments[].meta`: Metadata
- `statuses[].reblog.media_attachments[].meta.original`: Original
- `statuses[].reblog.media_attachments[].meta.original.width`: Width (number)
- `statuses[].reblog.media_attachments[].meta.original.height`: Height (number)
- `statuses[].reblog.media_attachments[].meta.focus`: Focal Point
- `statuses[].reblog.media_attachments[].meta.focus.x`: X (number)
- `statuses[].reblog.media_attachments[].meta.focus.y`: Y (number)
- `statuses[].reblog.mentions`: Mentions
- `statuses[].reblog.mentions[].id`: Account ID
- `statuses[].reblog.mentions[].username`: Username
- `statuses[].reblog.mentions[].acct`: Handle
- `statuses[].reblog.mentions[].url`: Profile URL (url)
- `statuses[].reblog.tags`: Hashtags
- `statuses[].reblog.tags[].name`: Name
- `statuses[].reblog.tags[].url`: URL (url)
- `statuses[].reblog.poll`: Poll
- `statuses[].reblog.poll.id`: Poll ID
- `statuses[].reblog.poll.expires_at`: Expires At (datetime)
- `statuses[].reblog.poll.expired`: Expired (boolean)
- `statuses[].reblog.poll.multiple`: Multiple Choice (boolean)
- `statuses[].reblog.poll.votes_count`: Votes (number)
- `statuses[].reblog.poll.voters_count`: Voters (number)
- `statuses[].reblog.poll.voted`: Voted (boolean)
- `statuses[].reblog.poll.own_votes`: Own Votes (Option Indexes)
- `statuses[].reblog.poll.options`: Options
- `statuses[].reblog.poll.options[].title`: Title
- `statuses[].reblog.poll.options[].votes_count`: Votes (number)
- `statuses[].reblog.card`: Link Preview
- `statuses[].reblog.card.url`: URL (url)
- `statuses[].reblog.card.title`: Title
- `statuses[].reblog.card.description`: Description
- `statuses[].reblog.card.type`: Type
- `statuses[].reblog.card.language`: Language
- `statuses[].reblog.card.provider_name`: Provider
- `statuses[].reblog.card.author_name`: Author
- `statuses[].reblog.card.image`: Image (image)
- `statuses[].reblog.card.published_at`: Published At (datetime)
- `statuses[].application`: Posted With
- `statuses[].application.name`: App Name
- `statuses[].application.website`: App Website (url)
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `get_home_timeline`

**Get Home Timeline.** Returns one page of the connected account's home timeline (posts and boosts from followed accounts and hashtags), newest first, with cursors for older or newer pages. Use Get Public Timeline for posts from everyone. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of statuses to return in this page. Defaults to 20, maximum 40. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |
| `min_id` | string | no |  | Min ID (newer page). Cursor for the page immediately newer than a previous page. Pass the `prev_min_id` value from a previous page of this same action. |

Output fields:

- `statuses`: Statuses
- `statuses[].id`: Status ID
- `statuses[].created_at`: Created At (datetime)
- `statuses[].url`: URL (url)
- `statuses[].uri`: ActivityPub URI (url)
- `statuses[].content`: Content (html)
- `statuses[].spoiler_text`: Content Warning
- `statuses[].sensitive`: Sensitive (boolean)
- `statuses[].visibility`: Visibility
- `statuses[].language`: Language
- `statuses[].in_reply_to_id`: In Reply To Status ID
- `statuses[].in_reply_to_account_id`: In Reply To Account ID
- `statuses[].replies_count`: Replies (number)
- `statuses[].reblogs_count`: Boosts (number)
- `statuses[].favourites_count`: Favourites (number)
- `statuses[].edited_at`: Edited At (datetime)
- `statuses[].account`: Author
- `statuses[].account.id`: Account ID
- `statuses[].account.username`: Username
- `statuses[].account.acct`: Handle
- `statuses[].account.display_name`: Display Name
- `statuses[].account.url`: Profile URL (url)
- `statuses[].account.avatar`: Avatar (image)
- `statuses[].account.bot`: Bot (boolean)
- `statuses[].media_attachments`: Media Attachments
- `statuses[].media_attachments[].id`: Media ID
- `statuses[].media_attachments[].type`: Type
- `statuses[].media_attachments[].url`: URL (url)
- `statuses[].media_attachments[].preview_url`: Preview (image)
- `statuses[].media_attachments[].remote_url`: Remote URL (url)
- `statuses[].media_attachments[].description`: Alt Text
- `statuses[].media_attachments[].meta`: Metadata
- `statuses[].media_attachments[].meta.original`: Original
- `statuses[].media_attachments[].meta.original.width`: Width (number)
- `statuses[].media_attachments[].meta.original.height`: Height (number)
- `statuses[].media_attachments[].meta.focus`: Focal Point
- `statuses[].media_attachments[].meta.focus.x`: X (number)
- `statuses[].media_attachments[].meta.focus.y`: Y (number)
- `statuses[].mentions`: Mentions
- `statuses[].mentions[].id`: Account ID
- `statuses[].mentions[].username`: Username
- `statuses[].mentions[].acct`: Handle
- `statuses[].mentions[].url`: Profile URL (url)
- `statuses[].tags`: Hashtags
- `statuses[].tags[].name`: Name
- `statuses[].tags[].url`: URL (url)
- `statuses[].poll`: Poll
- `statuses[].poll.id`: Poll ID
- `statuses[].poll.expires_at`: Expires At (datetime)
- `statuses[].poll.expired`: Expired (boolean)
- `statuses[].poll.multiple`: Multiple Choice (boolean)
- `statuses[].poll.votes_count`: Votes (number)
- `statuses[].poll.voters_count`: Voters (number)
- `statuses[].poll.voted`: Voted (boolean)
- `statuses[].poll.own_votes`: Own Votes (Option Indexes)
- `statuses[].poll.options`: Options
- `statuses[].poll.options[].title`: Title
- `statuses[].poll.options[].votes_count`: Votes (number)
- `statuses[].card`: Link Preview
- `statuses[].card.url`: URL (url)
- `statuses[].card.title`: Title
- `statuses[].card.description`: Description
- `statuses[].card.type`: Type
- `statuses[].card.language`: Language
- `statuses[].card.provider_name`: Provider
- `statuses[].card.author_name`: Author
- `statuses[].card.image`: Image (image)
- `statuses[].card.published_at`: Published At (datetime)
- `statuses[].favourited`: Favourited by Me (boolean)
- `statuses[].reblogged`: Boosted by Me (boolean)
- `statuses[].bookmarked`: Bookmarked by Me (boolean)
- `statuses[].muted`: Conversation Muted (boolean)
- `statuses[].pinned`: Pinned to Profile (boolean)
- `statuses[].reblog`: Boosted Status
- `statuses[].reblog.id`: Status ID
- `statuses[].reblog.created_at`: Created At (datetime)
- `statuses[].reblog.url`: URL (url)
- `statuses[].reblog.uri`: ActivityPub URI (url)
- `statuses[].reblog.content`: Content (html)
- `statuses[].reblog.spoiler_text`: Content Warning
- `statuses[].reblog.sensitive`: Sensitive (boolean)
- `statuses[].reblog.visibility`: Visibility
- `statuses[].reblog.language`: Language
- `statuses[].reblog.in_reply_to_id`: In Reply To Status ID
- `statuses[].reblog.in_reply_to_account_id`: In Reply To Account ID
- `statuses[].reblog.replies_count`: Replies (number)
- `statuses[].reblog.reblogs_count`: Boosts (number)
- `statuses[].reblog.favourites_count`: Favourites (number)
- `statuses[].reblog.edited_at`: Edited At (datetime)
- `statuses[].reblog.account`: Author
- `statuses[].reblog.account.id`: Account ID
- `statuses[].reblog.account.username`: Username
- `statuses[].reblog.account.acct`: Handle
- `statuses[].reblog.account.display_name`: Display Name
- `statuses[].reblog.account.url`: Profile URL (url)
- `statuses[].reblog.account.avatar`: Avatar (image)
- `statuses[].reblog.account.bot`: Bot (boolean)
- `statuses[].reblog.media_attachments`: Media Attachments
- `statuses[].reblog.media_attachments[].id`: Media ID
- `statuses[].reblog.media_attachments[].type`: Type
- `statuses[].reblog.media_attachments[].url`: URL (url)
- `statuses[].reblog.media_attachments[].preview_url`: Preview (image)
- `statuses[].reblog.media_attachments[].remote_url`: Remote URL (url)
- `statuses[].reblog.media_attachments[].description`: Alt Text
- `statuses[].reblog.media_attachments[].meta`: Metadata
- `statuses[].reblog.media_attachments[].meta.original`: Original
- `statuses[].reblog.media_attachments[].meta.original.width`: Width (number)
- `statuses[].reblog.media_attachments[].meta.original.height`: Height (number)
- `statuses[].reblog.media_attachments[].meta.focus`: Focal Point
- `statuses[].reblog.media_attachments[].meta.focus.x`: X (number)
- `statuses[].reblog.media_attachments[].meta.focus.y`: Y (number)
- `statuses[].reblog.mentions`: Mentions
- `statuses[].reblog.mentions[].id`: Account ID
- `statuses[].reblog.mentions[].username`: Username
- `statuses[].reblog.mentions[].acct`: Handle
- `statuses[].reblog.mentions[].url`: Profile URL (url)
- `statuses[].reblog.tags`: Hashtags
- `statuses[].reblog.tags[].name`: Name
- `statuses[].reblog.tags[].url`: URL (url)
- `statuses[].reblog.poll`: Poll
- `statuses[].reblog.poll.id`: Poll ID
- `statuses[].reblog.poll.expires_at`: Expires At (datetime)
- `statuses[].reblog.poll.expired`: Expired (boolean)
- `statuses[].reblog.poll.multiple`: Multiple Choice (boolean)
- `statuses[].reblog.poll.votes_count`: Votes (number)
- `statuses[].reblog.poll.voters_count`: Voters (number)
- `statuses[].reblog.poll.voted`: Voted (boolean)
- `statuses[].reblog.poll.own_votes`: Own Votes (Option Indexes)
- `statuses[].reblog.poll.options`: Options
- `statuses[].reblog.poll.options[].title`: Title
- `statuses[].reblog.poll.options[].votes_count`: Votes (number)
- `statuses[].reblog.card`: Link Preview
- `statuses[].reblog.card.url`: URL (url)
- `statuses[].reblog.card.title`: Title
- `statuses[].reblog.card.description`: Description
- `statuses[].reblog.card.type`: Type
- `statuses[].reblog.card.language`: Language
- `statuses[].reblog.card.provider_name`: Provider
- `statuses[].reblog.card.author_name`: Author
- `statuses[].reblog.card.image`: Image (image)
- `statuses[].reblog.card.published_at`: Published At (datetime)
- `statuses[].application`: Posted With
- `statuses[].application.name`: App Name
- `statuses[].application.website`: App Website (url)
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `get_public_timeline`

**Get Public Timeline.** Returns one page of recent public statuses known to the connected server (optionally only local or only remote, or only with media), newest first, with cursors for further pages. Use Get Hashtag Timeline for a topic or Get Home Timeline for followed accounts. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `local` | boolean | no | `false` | Only Local Statuses. Only statuses posted on this server. |
| `remote` | boolean | no | `false` | Only Remote Statuses. Only statuses from other servers. |
| `only_media` | boolean | no | `false` | Only Statuses With Media. |
| `limit` | number | no |  | Limit. Maximum number of statuses to return in this page. Defaults to 20, maximum 40. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |
| `min_id` | string | no |  | Min ID (newer page). Cursor for the page immediately newer than a previous page. Pass the `prev_min_id` value from a previous page of this same action. |

Output fields:

- `statuses`: Statuses
- `statuses[].id`: Status ID
- `statuses[].created_at`: Created At (datetime)
- `statuses[].url`: URL (url)
- `statuses[].uri`: ActivityPub URI (url)
- `statuses[].content`: Content (html)
- `statuses[].spoiler_text`: Content Warning
- `statuses[].sensitive`: Sensitive (boolean)
- `statuses[].visibility`: Visibility
- `statuses[].language`: Language
- `statuses[].in_reply_to_id`: In Reply To Status ID
- `statuses[].in_reply_to_account_id`: In Reply To Account ID
- `statuses[].replies_count`: Replies (number)
- `statuses[].reblogs_count`: Boosts (number)
- `statuses[].favourites_count`: Favourites (number)
- `statuses[].edited_at`: Edited At (datetime)
- `statuses[].account`: Author
- `statuses[].account.id`: Account ID
- `statuses[].account.username`: Username
- `statuses[].account.acct`: Handle
- `statuses[].account.display_name`: Display Name
- `statuses[].account.url`: Profile URL (url)
- `statuses[].account.avatar`: Avatar (image)
- `statuses[].account.bot`: Bot (boolean)
- `statuses[].media_attachments`: Media Attachments
- `statuses[].media_attachments[].id`: Media ID
- `statuses[].media_attachments[].type`: Type
- `statuses[].media_attachments[].url`: URL (url)
- `statuses[].media_attachments[].preview_url`: Preview (image)
- `statuses[].media_attachments[].remote_url`: Remote URL (url)
- `statuses[].media_attachments[].description`: Alt Text
- `statuses[].media_attachments[].meta`: Metadata
- `statuses[].media_attachments[].meta.original`: Original
- `statuses[].media_attachments[].meta.original.width`: Width (number)
- `statuses[].media_attachments[].meta.original.height`: Height (number)
- `statuses[].media_attachments[].meta.focus`: Focal Point
- `statuses[].media_attachments[].meta.focus.x`: X (number)
- `statuses[].media_attachments[].meta.focus.y`: Y (number)
- `statuses[].mentions`: Mentions
- `statuses[].mentions[].id`: Account ID
- `statuses[].mentions[].username`: Username
- `statuses[].mentions[].acct`: Handle
- `statuses[].mentions[].url`: Profile URL (url)
- `statuses[].tags`: Hashtags
- `statuses[].tags[].name`: Name
- `statuses[].tags[].url`: URL (url)
- `statuses[].poll`: Poll
- `statuses[].poll.id`: Poll ID
- `statuses[].poll.expires_at`: Expires At (datetime)
- `statuses[].poll.expired`: Expired (boolean)
- `statuses[].poll.multiple`: Multiple Choice (boolean)
- `statuses[].poll.votes_count`: Votes (number)
- `statuses[].poll.voters_count`: Voters (number)
- `statuses[].poll.voted`: Voted (boolean)
- `statuses[].poll.own_votes`: Own Votes (Option Indexes)
- `statuses[].poll.options`: Options
- `statuses[].poll.options[].title`: Title
- `statuses[].poll.options[].votes_count`: Votes (number)
- `statuses[].card`: Link Preview
- `statuses[].card.url`: URL (url)
- `statuses[].card.title`: Title
- `statuses[].card.description`: Description
- `statuses[].card.type`: Type
- `statuses[].card.language`: Language
- `statuses[].card.provider_name`: Provider
- `statuses[].card.author_name`: Author
- `statuses[].card.image`: Image (image)
- `statuses[].card.published_at`: Published At (datetime)
- `statuses[].favourited`: Favourited by Me (boolean)
- `statuses[].reblogged`: Boosted by Me (boolean)
- `statuses[].bookmarked`: Bookmarked by Me (boolean)
- `statuses[].muted`: Conversation Muted (boolean)
- `statuses[].pinned`: Pinned to Profile (boolean)
- `statuses[].reblog`: Boosted Status
- `statuses[].reblog.id`: Status ID
- `statuses[].reblog.created_at`: Created At (datetime)
- `statuses[].reblog.url`: URL (url)
- `statuses[].reblog.uri`: ActivityPub URI (url)
- `statuses[].reblog.content`: Content (html)
- `statuses[].reblog.spoiler_text`: Content Warning
- `statuses[].reblog.sensitive`: Sensitive (boolean)
- `statuses[].reblog.visibility`: Visibility
- `statuses[].reblog.language`: Language
- `statuses[].reblog.in_reply_to_id`: In Reply To Status ID
- `statuses[].reblog.in_reply_to_account_id`: In Reply To Account ID
- `statuses[].reblog.replies_count`: Replies (number)
- `statuses[].reblog.reblogs_count`: Boosts (number)
- `statuses[].reblog.favourites_count`: Favourites (number)
- `statuses[].reblog.edited_at`: Edited At (datetime)
- `statuses[].reblog.account`: Author
- `statuses[].reblog.account.id`: Account ID
- `statuses[].reblog.account.username`: Username
- `statuses[].reblog.account.acct`: Handle
- `statuses[].reblog.account.display_name`: Display Name
- `statuses[].reblog.account.url`: Profile URL (url)
- `statuses[].reblog.account.avatar`: Avatar (image)
- `statuses[].reblog.account.bot`: Bot (boolean)
- `statuses[].reblog.media_attachments`: Media Attachments
- `statuses[].reblog.media_attachments[].id`: Media ID
- `statuses[].reblog.media_attachments[].type`: Type
- `statuses[].reblog.media_attachments[].url`: URL (url)
- `statuses[].reblog.media_attachments[].preview_url`: Preview (image)
- `statuses[].reblog.media_attachments[].remote_url`: Remote URL (url)
- `statuses[].reblog.media_attachments[].description`: Alt Text
- `statuses[].reblog.media_attachments[].meta`: Metadata
- `statuses[].reblog.media_attachments[].meta.original`: Original
- `statuses[].reblog.media_attachments[].meta.original.width`: Width (number)
- `statuses[].reblog.media_attachments[].meta.original.height`: Height (number)
- `statuses[].reblog.media_attachments[].meta.focus`: Focal Point
- `statuses[].reblog.media_attachments[].meta.focus.x`: X (number)
- `statuses[].reblog.media_attachments[].meta.focus.y`: Y (number)
- `statuses[].reblog.mentions`: Mentions
- `statuses[].reblog.mentions[].id`: Account ID
- `statuses[].reblog.mentions[].username`: Username
- `statuses[].reblog.mentions[].acct`: Handle
- `statuses[].reblog.mentions[].url`: Profile URL (url)
- `statuses[].reblog.tags`: Hashtags
- `statuses[].reblog.tags[].name`: Name
- `statuses[].reblog.tags[].url`: URL (url)
- `statuses[].reblog.poll`: Poll
- `statuses[].reblog.poll.id`: Poll ID
- `statuses[].reblog.poll.expires_at`: Expires At (datetime)
- `statuses[].reblog.poll.expired`: Expired (boolean)
- `statuses[].reblog.poll.multiple`: Multiple Choice (boolean)
- `statuses[].reblog.poll.votes_count`: Votes (number)
- `statuses[].reblog.poll.voters_count`: Voters (number)
- `statuses[].reblog.poll.voted`: Voted (boolean)
- `statuses[].reblog.poll.own_votes`: Own Votes (Option Indexes)
- `statuses[].reblog.poll.options`: Options
- `statuses[].reblog.poll.options[].title`: Title
- `statuses[].reblog.poll.options[].votes_count`: Votes (number)
- `statuses[].reblog.card`: Link Preview
- `statuses[].reblog.card.url`: URL (url)
- `statuses[].reblog.card.title`: Title
- `statuses[].reblog.card.description`: Description
- `statuses[].reblog.card.type`: Type
- `statuses[].reblog.card.language`: Language
- `statuses[].reblog.card.provider_name`: Provider
- `statuses[].reblog.card.author_name`: Author
- `statuses[].reblog.card.image`: Image (image)
- `statuses[].reblog.card.published_at`: Published At (datetime)
- `statuses[].application`: Posted With
- `statuses[].application.name`: App Name
- `statuses[].application.website`: App Website (url)
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `get_hashtag_timeline`

**Get Hashtag Timeline.** Returns one page of recent public statuses using a hashtag, newest first, with cursors for further pages; combine extra tags with any, all or none. Use Search for free-text queries. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `hashtag` | string | yes |  | Hashtag. Hashtag without the # sign, for example mastodon. A leading # is removed automatically. |
| `any` | array | no |  | Any of These Tags. Also include statuses using any of these additional hashtags, one per item, without #. |
| `all` | array | no |  | All of These Tags. Only statuses that also use all of these hashtags, one per item, without #. |
| `none` | array | no |  | None of These Tags. Exclude statuses using any of these hashtags, one per item, without #. |
| `local` | boolean | no | `false` | Only Local Statuses. Only include statuses posted by accounts on your own server. |
| `remote` | boolean | no | `false` | Only Remote Statuses. Only include statuses posted by accounts on other servers. |
| `only_media` | boolean | no | `false` | Only Statuses With Media. Only include statuses that have images, video or audio attached. |
| `limit` | number | no |  | Limit. Maximum number of statuses to return in this page. Defaults to 20, maximum 40. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |
| `min_id` | string | no |  | Min ID (newer page). Cursor for the page immediately newer than a previous page. Pass the `prev_min_id` value from a previous page of this same action. |

Output fields:

- `statuses`: Statuses
- `statuses[].id`: Status ID
- `statuses[].created_at`: Created At (datetime)
- `statuses[].url`: URL (url)
- `statuses[].uri`: ActivityPub URI (url)
- `statuses[].content`: Content (html)
- `statuses[].spoiler_text`: Content Warning
- `statuses[].sensitive`: Sensitive (boolean)
- `statuses[].visibility`: Visibility
- `statuses[].language`: Language
- `statuses[].in_reply_to_id`: In Reply To Status ID
- `statuses[].in_reply_to_account_id`: In Reply To Account ID
- `statuses[].replies_count`: Replies (number)
- `statuses[].reblogs_count`: Boosts (number)
- `statuses[].favourites_count`: Favourites (number)
- `statuses[].edited_at`: Edited At (datetime)
- `statuses[].account`: Author
- `statuses[].account.id`: Account ID
- `statuses[].account.username`: Username
- `statuses[].account.acct`: Handle
- `statuses[].account.display_name`: Display Name
- `statuses[].account.url`: Profile URL (url)
- `statuses[].account.avatar`: Avatar (image)
- `statuses[].account.bot`: Bot (boolean)
- `statuses[].media_attachments`: Media Attachments
- `statuses[].media_attachments[].id`: Media ID
- `statuses[].media_attachments[].type`: Type
- `statuses[].media_attachments[].url`: URL (url)
- `statuses[].media_attachments[].preview_url`: Preview (image)
- `statuses[].media_attachments[].remote_url`: Remote URL (url)
- `statuses[].media_attachments[].description`: Alt Text
- `statuses[].media_attachments[].meta`: Metadata
- `statuses[].media_attachments[].meta.original`: Original
- `statuses[].media_attachments[].meta.original.width`: Width (number)
- `statuses[].media_attachments[].meta.original.height`: Height (number)
- `statuses[].media_attachments[].meta.focus`: Focal Point
- `statuses[].media_attachments[].meta.focus.x`: X (number)
- `statuses[].media_attachments[].meta.focus.y`: Y (number)
- `statuses[].mentions`: Mentions
- `statuses[].mentions[].id`: Account ID
- `statuses[].mentions[].username`: Username
- `statuses[].mentions[].acct`: Handle
- `statuses[].mentions[].url`: Profile URL (url)
- `statuses[].tags`: Hashtags
- `statuses[].tags[].name`: Name
- `statuses[].tags[].url`: URL (url)
- `statuses[].poll`: Poll
- `statuses[].poll.id`: Poll ID
- `statuses[].poll.expires_at`: Expires At (datetime)
- `statuses[].poll.expired`: Expired (boolean)
- `statuses[].poll.multiple`: Multiple Choice (boolean)
- `statuses[].poll.votes_count`: Votes (number)
- `statuses[].poll.voters_count`: Voters (number)
- `statuses[].poll.voted`: Voted (boolean)
- `statuses[].poll.own_votes`: Own Votes (Option Indexes)
- `statuses[].poll.options`: Options
- `statuses[].poll.options[].title`: Title
- `statuses[].poll.options[].votes_count`: Votes (number)
- `statuses[].card`: Link Preview
- `statuses[].card.url`: URL (url)
- `statuses[].card.title`: Title
- `statuses[].card.description`: Description
- `statuses[].card.type`: Type
- `statuses[].card.language`: Language
- `statuses[].card.provider_name`: Provider
- `statuses[].card.author_name`: Author
- `statuses[].card.image`: Image (image)
- `statuses[].card.published_at`: Published At (datetime)
- `statuses[].favourited`: Favourited by Me (boolean)
- `statuses[].reblogged`: Boosted by Me (boolean)
- `statuses[].bookmarked`: Bookmarked by Me (boolean)
- `statuses[].muted`: Conversation Muted (boolean)
- `statuses[].pinned`: Pinned to Profile (boolean)
- `statuses[].reblog`: Boosted Status
- `statuses[].reblog.id`: Status ID
- `statuses[].reblog.created_at`: Created At (datetime)
- `statuses[].reblog.url`: URL (url)
- `statuses[].reblog.uri`: ActivityPub URI (url)
- `statuses[].reblog.content`: Content (html)
- `statuses[].reblog.spoiler_text`: Content Warning
- `statuses[].reblog.sensitive`: Sensitive (boolean)
- `statuses[].reblog.visibility`: Visibility
- `statuses[].reblog.language`: Language
- `statuses[].reblog.in_reply_to_id`: In Reply To Status ID
- `statuses[].reblog.in_reply_to_account_id`: In Reply To Account ID
- `statuses[].reblog.replies_count`: Replies (number)
- `statuses[].reblog.reblogs_count`: Boosts (number)
- `statuses[].reblog.favourites_count`: Favourites (number)
- `statuses[].reblog.edited_at`: Edited At (datetime)
- `statuses[].reblog.account`: Author
- `statuses[].reblog.account.id`: Account ID
- `statuses[].reblog.account.username`: Username
- `statuses[].reblog.account.acct`: Handle
- `statuses[].reblog.account.display_name`: Display Name
- `statuses[].reblog.account.url`: Profile URL (url)
- `statuses[].reblog.account.avatar`: Avatar (image)
- `statuses[].reblog.account.bot`: Bot (boolean)
- `statuses[].reblog.media_attachments`: Media Attachments
- `statuses[].reblog.media_attachments[].id`: Media ID
- `statuses[].reblog.media_attachments[].type`: Type
- `statuses[].reblog.media_attachments[].url`: URL (url)
- `statuses[].reblog.media_attachments[].preview_url`: Preview (image)
- `statuses[].reblog.media_attachments[].remote_url`: Remote URL (url)
- `statuses[].reblog.media_attachments[].description`: Alt Text
- `statuses[].reblog.media_attachments[].meta`: Metadata
- `statuses[].reblog.media_attachments[].meta.original`: Original
- `statuses[].reblog.media_attachments[].meta.original.width`: Width (number)
- `statuses[].reblog.media_attachments[].meta.original.height`: Height (number)
- `statuses[].reblog.media_attachments[].meta.focus`: Focal Point
- `statuses[].reblog.media_attachments[].meta.focus.x`: X (number)
- `statuses[].reblog.media_attachments[].meta.focus.y`: Y (number)
- `statuses[].reblog.mentions`: Mentions
- `statuses[].reblog.mentions[].id`: Account ID
- `statuses[].reblog.mentions[].username`: Username
- `statuses[].reblog.mentions[].acct`: Handle
- `statuses[].reblog.mentions[].url`: Profile URL (url)
- `statuses[].reblog.tags`: Hashtags
- `statuses[].reblog.tags[].name`: Name
- `statuses[].reblog.tags[].url`: URL (url)
- `statuses[].reblog.poll`: Poll
- `statuses[].reblog.poll.id`: Poll ID
- `statuses[].reblog.poll.expires_at`: Expires At (datetime)
- `statuses[].reblog.poll.expired`: Expired (boolean)
- `statuses[].reblog.poll.multiple`: Multiple Choice (boolean)
- `statuses[].reblog.poll.votes_count`: Votes (number)
- `statuses[].reblog.poll.voters_count`: Voters (number)
- `statuses[].reblog.poll.voted`: Voted (boolean)
- `statuses[].reblog.poll.own_votes`: Own Votes (Option Indexes)
- `statuses[].reblog.poll.options`: Options
- `statuses[].reblog.poll.options[].title`: Title
- `statuses[].reblog.poll.options[].votes_count`: Votes (number)
- `statuses[].reblog.card`: Link Preview
- `statuses[].reblog.card.url`: URL (url)
- `statuses[].reblog.card.title`: Title
- `statuses[].reblog.card.description`: Description
- `statuses[].reblog.card.type`: Type
- `statuses[].reblog.card.language`: Language
- `statuses[].reblog.card.provider_name`: Provider
- `statuses[].reblog.card.author_name`: Author
- `statuses[].reblog.card.image`: Image (image)
- `statuses[].reblog.card.published_at`: Published At (datetime)
- `statuses[].application`: Posted With
- `statuses[].application.name`: App Name
- `statuses[].application.website`: App Website (url)
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `get_list_timeline`

**Get List Timeline.** Returns one page of statuses from the members of one of the connected account's lists, newest first, with cursors for further pages. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. ID of one of your lists. Obtain it from List Lists or Create List. |
| `limit` | number | no |  | Limit. Maximum number of statuses to return in this page. Defaults to 20, maximum 40. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |
| `min_id` | string | no |  | Min ID (newer page). Cursor for the page immediately newer than a previous page. Pass the `prev_min_id` value from a previous page of this same action. |

Output fields:

- `statuses`: Statuses
- `statuses[].id`: Status ID
- `statuses[].created_at`: Created At (datetime)
- `statuses[].url`: URL (url)
- `statuses[].uri`: ActivityPub URI (url)
- `statuses[].content`: Content (html)
- `statuses[].spoiler_text`: Content Warning
- `statuses[].sensitive`: Sensitive (boolean)
- `statuses[].visibility`: Visibility
- `statuses[].language`: Language
- `statuses[].in_reply_to_id`: In Reply To Status ID
- `statuses[].in_reply_to_account_id`: In Reply To Account ID
- `statuses[].replies_count`: Replies (number)
- `statuses[].reblogs_count`: Boosts (number)
- `statuses[].favourites_count`: Favourites (number)
- `statuses[].edited_at`: Edited At (datetime)
- `statuses[].account`: Author
- `statuses[].account.id`: Account ID
- `statuses[].account.username`: Username
- `statuses[].account.acct`: Handle
- `statuses[].account.display_name`: Display Name
- `statuses[].account.url`: Profile URL (url)
- `statuses[].account.avatar`: Avatar (image)
- `statuses[].account.bot`: Bot (boolean)
- `statuses[].media_attachments`: Media Attachments
- `statuses[].media_attachments[].id`: Media ID
- `statuses[].media_attachments[].type`: Type
- `statuses[].media_attachments[].url`: URL (url)
- `statuses[].media_attachments[].preview_url`: Preview (image)
- `statuses[].media_attachments[].remote_url`: Remote URL (url)
- `statuses[].media_attachments[].description`: Alt Text
- `statuses[].media_attachments[].meta`: Metadata
- `statuses[].media_attachments[].meta.original`: Original
- `statuses[].media_attachments[].meta.original.width`: Width (number)
- `statuses[].media_attachments[].meta.original.height`: Height (number)
- `statuses[].media_attachments[].meta.focus`: Focal Point
- `statuses[].media_attachments[].meta.focus.x`: X (number)
- `statuses[].media_attachments[].meta.focus.y`: Y (number)
- `statuses[].mentions`: Mentions
- `statuses[].mentions[].id`: Account ID
- `statuses[].mentions[].username`: Username
- `statuses[].mentions[].acct`: Handle
- `statuses[].mentions[].url`: Profile URL (url)
- `statuses[].tags`: Hashtags
- `statuses[].tags[].name`: Name
- `statuses[].tags[].url`: URL (url)
- `statuses[].poll`: Poll
- `statuses[].poll.id`: Poll ID
- `statuses[].poll.expires_at`: Expires At (datetime)
- `statuses[].poll.expired`: Expired (boolean)
- `statuses[].poll.multiple`: Multiple Choice (boolean)
- `statuses[].poll.votes_count`: Votes (number)
- `statuses[].poll.voters_count`: Voters (number)
- `statuses[].poll.voted`: Voted (boolean)
- `statuses[].poll.own_votes`: Own Votes (Option Indexes)
- `statuses[].poll.options`: Options
- `statuses[].poll.options[].title`: Title
- `statuses[].poll.options[].votes_count`: Votes (number)
- `statuses[].card`: Link Preview
- `statuses[].card.url`: URL (url)
- `statuses[].card.title`: Title
- `statuses[].card.description`: Description
- `statuses[].card.type`: Type
- `statuses[].card.language`: Language
- `statuses[].card.provider_name`: Provider
- `statuses[].card.author_name`: Author
- `statuses[].card.image`: Image (image)
- `statuses[].card.published_at`: Published At (datetime)
- `statuses[].favourited`: Favourited by Me (boolean)
- `statuses[].reblogged`: Boosted by Me (boolean)
- `statuses[].bookmarked`: Bookmarked by Me (boolean)
- `statuses[].muted`: Conversation Muted (boolean)
- `statuses[].pinned`: Pinned to Profile (boolean)
- `statuses[].reblog`: Boosted Status
- `statuses[].reblog.id`: Status ID
- `statuses[].reblog.created_at`: Created At (datetime)
- `statuses[].reblog.url`: URL (url)
- `statuses[].reblog.uri`: ActivityPub URI (url)
- `statuses[].reblog.content`: Content (html)
- `statuses[].reblog.spoiler_text`: Content Warning
- `statuses[].reblog.sensitive`: Sensitive (boolean)
- `statuses[].reblog.visibility`: Visibility
- `statuses[].reblog.language`: Language
- `statuses[].reblog.in_reply_to_id`: In Reply To Status ID
- `statuses[].reblog.in_reply_to_account_id`: In Reply To Account ID
- `statuses[].reblog.replies_count`: Replies (number)
- `statuses[].reblog.reblogs_count`: Boosts (number)
- `statuses[].reblog.favourites_count`: Favourites (number)
- `statuses[].reblog.edited_at`: Edited At (datetime)
- `statuses[].reblog.account`: Author
- `statuses[].reblog.account.id`: Account ID
- `statuses[].reblog.account.username`: Username
- `statuses[].reblog.account.acct`: Handle
- `statuses[].reblog.account.display_name`: Display Name
- `statuses[].reblog.account.url`: Profile URL (url)
- `statuses[].reblog.account.avatar`: Avatar (image)
- `statuses[].reblog.account.bot`: Bot (boolean)
- `statuses[].reblog.media_attachments`: Media Attachments
- `statuses[].reblog.media_attachments[].id`: Media ID
- `statuses[].reblog.media_attachments[].type`: Type
- `statuses[].reblog.media_attachments[].url`: URL (url)
- `statuses[].reblog.media_attachments[].preview_url`: Preview (image)
- `statuses[].reblog.media_attachments[].remote_url`: Remote URL (url)
- `statuses[].reblog.media_attachments[].description`: Alt Text
- `statuses[].reblog.media_attachments[].meta`: Metadata
- `statuses[].reblog.media_attachments[].meta.original`: Original
- `statuses[].reblog.media_attachments[].meta.original.width`: Width (number)
- `statuses[].reblog.media_attachments[].meta.original.height`: Height (number)
- `statuses[].reblog.media_attachments[].meta.focus`: Focal Point
- `statuses[].reblog.media_attachments[].meta.focus.x`: X (number)
- `statuses[].reblog.media_attachments[].meta.focus.y`: Y (number)
- `statuses[].reblog.mentions`: Mentions
- `statuses[].reblog.mentions[].id`: Account ID
- `statuses[].reblog.mentions[].username`: Username
- `statuses[].reblog.mentions[].acct`: Handle
- `statuses[].reblog.mentions[].url`: Profile URL (url)
- `statuses[].reblog.tags`: Hashtags
- `statuses[].reblog.tags[].name`: Name
- `statuses[].reblog.tags[].url`: URL (url)
- `statuses[].reblog.poll`: Poll
- `statuses[].reblog.poll.id`: Poll ID
- `statuses[].reblog.poll.expires_at`: Expires At (datetime)
- `statuses[].reblog.poll.expired`: Expired (boolean)
- `statuses[].reblog.poll.multiple`: Multiple Choice (boolean)
- `statuses[].reblog.poll.votes_count`: Votes (number)
- `statuses[].reblog.poll.voters_count`: Voters (number)
- `statuses[].reblog.poll.voted`: Voted (boolean)
- `statuses[].reblog.poll.own_votes`: Own Votes (Option Indexes)
- `statuses[].reblog.poll.options`: Options
- `statuses[].reblog.poll.options[].title`: Title
- `statuses[].reblog.poll.options[].votes_count`: Votes (number)
- `statuses[].reblog.card`: Link Preview
- `statuses[].reblog.card.url`: URL (url)
- `statuses[].reblog.card.title`: Title
- `statuses[].reblog.card.description`: Description
- `statuses[].reblog.card.type`: Type
- `statuses[].reblog.card.language`: Language
- `statuses[].reblog.card.provider_name`: Provider
- `statuses[].reblog.card.author_name`: Author
- `statuses[].reblog.card.image`: Image (image)
- `statuses[].reblog.card.published_at`: Published At (datetime)
- `statuses[].application`: Posted With
- `statuses[].application.name`: App Name
- `statuses[].application.website`: App Website (url)
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `list_notifications`

**List Notifications.** Returns one page of the connected account's notifications (mentions, follows, favourites, boosts, polls and more), newest first, with cursors for further pages; filter by type or by the account that caused them. Use Get Unread Notification Count for just a number. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `types` | array | no |  | Include Types. Only return these notification types. Leave empty for all types. One of `"mention"`, `"status"`, `"reblog"`, `"follow"`, `"follow_request"`, `"favourite"`, `"poll"`, `"update"`, `"quote"`, `"quoted_update"`, `"severed_relationships"`, `"moderation_warning"`, `"admin.sign_up"`, `"admin.report"`. |
| `exclude_types` | array | no |  | Exclude Types. Leave out these notification types. One of `"mention"`, `"status"`, `"reblog"`, `"follow"`, `"follow_request"`, `"favourite"`, `"poll"`, `"update"`, `"quote"`, `"quoted_update"`, `"severed_relationships"`, `"moderation_warning"`, `"admin.sign_up"`, `"admin.report"`. |
| `account_id` | string | no |  | From Account ID. Only notifications caused by this account (local ID from Lookup Account or Search Accounts). |
| `limit` | number | no |  | Limit. Maximum number of notifications to return in this page. Defaults to 40, maximum 80. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |
| `min_id` | string | no |  | Min ID (newer page). Cursor for the page immediately newer than a previous page. Pass the `prev_min_id` value from a previous page of this same action. |

Output fields:

- `notifications`: Notifications
- `notifications[].id`: Notification ID
- `notifications[].type`: Type
- `notifications[].created_at`: Created At (datetime)
- `notifications[].group_key`: Group Key
- `notifications[].account`: From Account
- `notifications[].account.id`: Account ID
- `notifications[].account.username`: Username
- `notifications[].account.acct`: Handle
- `notifications[].account.display_name`: Display Name
- `notifications[].account.url`: Profile URL (url)
- `notifications[].account.avatar`: Avatar (image)
- `notifications[].account.bot`: Bot (boolean)
- `notifications[].status`: Related Status
- `notifications[].status.id`: Status ID
- `notifications[].status.created_at`: Created At (datetime)
- `notifications[].status.url`: URL (url)
- `notifications[].status.uri`: ActivityPub URI (url)
- `notifications[].status.content`: Content (html)
- `notifications[].status.spoiler_text`: Content Warning
- `notifications[].status.sensitive`: Sensitive (boolean)
- `notifications[].status.visibility`: Visibility
- `notifications[].status.language`: Language
- `notifications[].status.in_reply_to_id`: In Reply To Status ID
- `notifications[].status.in_reply_to_account_id`: In Reply To Account ID
- `notifications[].status.replies_count`: Replies (number)
- `notifications[].status.reblogs_count`: Boosts (number)
- `notifications[].status.favourites_count`: Favourites (number)
- `notifications[].status.edited_at`: Edited At (datetime)
- `notifications[].status.account`: Author
- `notifications[].status.account.id`: Account ID
- `notifications[].status.account.username`: Username
- `notifications[].status.account.acct`: Handle
- `notifications[].status.account.display_name`: Display Name
- `notifications[].status.account.url`: Profile URL (url)
- `notifications[].status.account.avatar`: Avatar (image)
- `notifications[].status.account.bot`: Bot (boolean)
- `notifications[].status.media_attachments`: Media Attachments
- `notifications[].status.media_attachments[].id`: Media ID
- `notifications[].status.media_attachments[].type`: Type
- `notifications[].status.media_attachments[].url`: URL (url)
- `notifications[].status.media_attachments[].preview_url`: Preview (image)
- `notifications[].status.media_attachments[].remote_url`: Remote URL (url)
- `notifications[].status.media_attachments[].description`: Alt Text
- `notifications[].status.media_attachments[].meta`: Metadata
- `notifications[].status.media_attachments[].meta.original`: Original
- `notifications[].status.media_attachments[].meta.original.width`: Width (number)
- `notifications[].status.media_attachments[].meta.original.height`: Height (number)
- `notifications[].status.media_attachments[].meta.focus`: Focal Point
- `notifications[].status.media_attachments[].meta.focus.x`: X (number)
- `notifications[].status.media_attachments[].meta.focus.y`: Y (number)
- `notifications[].status.mentions`: Mentions
- `notifications[].status.mentions[].id`: Account ID
- `notifications[].status.mentions[].username`: Username
- `notifications[].status.mentions[].acct`: Handle
- `notifications[].status.mentions[].url`: Profile URL (url)
- `notifications[].status.tags`: Hashtags
- `notifications[].status.tags[].name`: Name
- `notifications[].status.tags[].url`: URL (url)
- `notifications[].status.poll`: Poll
- `notifications[].status.poll.id`: Poll ID
- `notifications[].status.poll.expires_at`: Expires At (datetime)
- `notifications[].status.poll.expired`: Expired (boolean)
- `notifications[].status.poll.multiple`: Multiple Choice (boolean)
- `notifications[].status.poll.votes_count`: Votes (number)
- `notifications[].status.poll.voters_count`: Voters (number)
- `notifications[].status.poll.voted`: Voted (boolean)
- `notifications[].status.poll.own_votes`: Own Votes (Option Indexes)
- `notifications[].status.poll.options`: Options
- `notifications[].status.poll.options[].title`: Title
- `notifications[].status.poll.options[].votes_count`: Votes (number)
- `notifications[].status.card`: Link Preview
- `notifications[].status.card.url`: URL (url)
- `notifications[].status.card.title`: Title
- `notifications[].status.card.description`: Description
- `notifications[].status.card.type`: Type
- `notifications[].status.card.language`: Language
- `notifications[].status.card.provider_name`: Provider
- `notifications[].status.card.author_name`: Author
- `notifications[].status.card.image`: Image (image)
- `notifications[].status.card.published_at`: Published At (datetime)
- `notifications[].status.favourited`: Favourited by Me (boolean)
- `notifications[].status.reblogged`: Boosted by Me (boolean)
- `notifications[].status.bookmarked`: Bookmarked by Me (boolean)
- `notifications[].status.muted`: Conversation Muted (boolean)
- `notifications[].status.pinned`: Pinned to Profile (boolean)
- `notifications[].status.reblog`: Boosted Status
- `notifications[].status.reblog.id`: Status ID
- `notifications[].status.reblog.created_at`: Created At (datetime)
- `notifications[].status.reblog.url`: URL (url)
- `notifications[].status.reblog.uri`: ActivityPub URI (url)
- `notifications[].status.reblog.content`: Content (html)
- `notifications[].status.reblog.spoiler_text`: Content Warning
- `notifications[].status.reblog.sensitive`: Sensitive (boolean)
- `notifications[].status.reblog.visibility`: Visibility
- `notifications[].status.reblog.language`: Language
- `notifications[].status.reblog.in_reply_to_id`: In Reply To Status ID
- `notifications[].status.reblog.in_reply_to_account_id`: In Reply To Account ID
- `notifications[].status.reblog.replies_count`: Replies (number)
- `notifications[].status.reblog.reblogs_count`: Boosts (number)
- `notifications[].status.reblog.favourites_count`: Favourites (number)
- `notifications[].status.reblog.edited_at`: Edited At (datetime)
- `notifications[].status.reblog.account`: Author
- `notifications[].status.reblog.account.id`: Account ID
- `notifications[].status.reblog.account.username`: Username
- `notifications[].status.reblog.account.acct`: Handle
- `notifications[].status.reblog.account.display_name`: Display Name
- `notifications[].status.reblog.account.url`: Profile URL (url)
- `notifications[].status.reblog.account.avatar`: Avatar (image)
- `notifications[].status.reblog.account.bot`: Bot (boolean)
- `notifications[].status.reblog.media_attachments`: Media Attachments
- `notifications[].status.reblog.media_attachments[].id`: Media ID
- `notifications[].status.reblog.media_attachments[].type`: Type
- `notifications[].status.reblog.media_attachments[].url`: URL (url)
- `notifications[].status.reblog.media_attachments[].preview_url`: Preview (image)
- `notifications[].status.reblog.media_attachments[].remote_url`: Remote URL (url)
- `notifications[].status.reblog.media_attachments[].description`: Alt Text
- `notifications[].status.reblog.media_attachments[].meta`: Metadata
- `notifications[].status.reblog.media_attachments[].meta.original`: Original
- `notifications[].status.reblog.media_attachments[].meta.original.width`: Width (number)
- `notifications[].status.reblog.media_attachments[].meta.original.height`: Height (number)
- `notifications[].status.reblog.media_attachments[].meta.focus`: Focal Point
- `notifications[].status.reblog.media_attachments[].meta.focus.x`: X (number)
- `notifications[].status.reblog.media_attachments[].meta.focus.y`: Y (number)
- `notifications[].status.reblog.mentions`: Mentions
- `notifications[].status.reblog.mentions[].id`: Account ID
- `notifications[].status.reblog.mentions[].username`: Username
- `notifications[].status.reblog.mentions[].acct`: Handle
- `notifications[].status.reblog.mentions[].url`: Profile URL (url)
- `notifications[].status.reblog.tags`: Hashtags
- `notifications[].status.reblog.tags[].name`: Name
- `notifications[].status.reblog.tags[].url`: URL (url)
- `notifications[].status.reblog.poll`: Poll
- `notifications[].status.reblog.poll.id`: Poll ID
- `notifications[].status.reblog.poll.expires_at`: Expires At (datetime)
- `notifications[].status.reblog.poll.expired`: Expired (boolean)
- `notifications[].status.reblog.poll.multiple`: Multiple Choice (boolean)
- `notifications[].status.reblog.poll.votes_count`: Votes (number)
- `notifications[].status.reblog.poll.voters_count`: Voters (number)
- `notifications[].status.reblog.poll.voted`: Voted (boolean)
- `notifications[].status.reblog.poll.own_votes`: Own Votes (Option Indexes)
- `notifications[].status.reblog.poll.options`: Options
- `notifications[].status.reblog.poll.options[].title`: Title
- `notifications[].status.reblog.poll.options[].votes_count`: Votes (number)
- `notifications[].status.reblog.card`: Link Preview
- `notifications[].status.reblog.card.url`: URL (url)
- `notifications[].status.reblog.card.title`: Title
- `notifications[].status.reblog.card.description`: Description
- `notifications[].status.reblog.card.type`: Type
- `notifications[].status.reblog.card.language`: Language
- `notifications[].status.reblog.card.provider_name`: Provider
- `notifications[].status.reblog.card.author_name`: Author
- `notifications[].status.reblog.card.image`: Image (image)
- `notifications[].status.reblog.card.published_at`: Published At (datetime)
- `notifications[].status.application`: Posted With
- `notifications[].status.application.name`: App Name
- `notifications[].status.application.website`: App Website (url)
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `get_notification`

**Get Notification.** Fetches one notification of the connected account by ID, including its type, the account that triggered it and the related status. Use List Notifications to find IDs. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `notification_id` | string | yes |  | Notification ID. ID of the notification. Obtain it from List Notifications. |

Output fields:

- `id`: Notification ID
- `type`: Type
- `created_at`: Created At (datetime)
- `group_key`: Group Key
- `account`: From Account
- `account.id`: Account ID
- `account.username`: Username
- `account.acct`: Handle
- `account.display_name`: Display Name
- `account.url`: Profile URL (url)
- `account.avatar`: Avatar (image)
- `account.bot`: Bot (boolean)
- `status`: Related Status
- `status.id`: Status ID
- `status.created_at`: Created At (datetime)
- `status.url`: URL (url)
- `status.uri`: ActivityPub URI (url)
- `status.content`: Content (html)
- `status.spoiler_text`: Content Warning
- `status.sensitive`: Sensitive (boolean)
- `status.visibility`: Visibility
- `status.language`: Language
- `status.in_reply_to_id`: In Reply To Status ID
- `status.in_reply_to_account_id`: In Reply To Account ID
- `status.replies_count`: Replies (number)
- `status.reblogs_count`: Boosts (number)
- `status.favourites_count`: Favourites (number)
- `status.edited_at`: Edited At (datetime)
- `status.account`: Author
- `status.account.id`: Account ID
- `status.account.username`: Username
- `status.account.acct`: Handle
- `status.account.display_name`: Display Name
- `status.account.url`: Profile URL (url)
- `status.account.avatar`: Avatar (image)
- `status.account.bot`: Bot (boolean)
- `status.media_attachments`: Media Attachments
- `status.media_attachments[].id`: Media ID
- `status.media_attachments[].type`: Type
- `status.media_attachments[].url`: URL (url)
- `status.media_attachments[].preview_url`: Preview (image)
- `status.media_attachments[].remote_url`: Remote URL (url)
- `status.media_attachments[].description`: Alt Text
- `status.media_attachments[].meta`: Metadata
- `status.media_attachments[].meta.original`: Original
- `status.media_attachments[].meta.original.width`: Width (number)
- `status.media_attachments[].meta.original.height`: Height (number)
- `status.media_attachments[].meta.focus`: Focal Point
- `status.media_attachments[].meta.focus.x`: X (number)
- `status.media_attachments[].meta.focus.y`: Y (number)
- `status.mentions`: Mentions
- `status.mentions[].id`: Account ID
- `status.mentions[].username`: Username
- `status.mentions[].acct`: Handle
- `status.mentions[].url`: Profile URL (url)
- `status.tags`: Hashtags
- `status.tags[].name`: Name
- `status.tags[].url`: URL (url)
- `status.poll`: Poll
- `status.poll.id`: Poll ID
- `status.poll.expires_at`: Expires At (datetime)
- `status.poll.expired`: Expired (boolean)
- `status.poll.multiple`: Multiple Choice (boolean)
- `status.poll.votes_count`: Votes (number)
- `status.poll.voters_count`: Voters (number)
- `status.poll.voted`: Voted (boolean)
- `status.poll.own_votes`: Own Votes (Option Indexes)
- `status.poll.options`: Options
- `status.poll.options[].title`: Title
- `status.poll.options[].votes_count`: Votes (number)
- `status.card`: Link Preview
- `status.card.url`: URL (url)
- `status.card.title`: Title
- `status.card.description`: Description
- `status.card.type`: Type
- `status.card.language`: Language
- `status.card.provider_name`: Provider
- `status.card.author_name`: Author
- `status.card.image`: Image (image)
- `status.card.published_at`: Published At (datetime)
- `status.favourited`: Favourited by Me (boolean)
- `status.reblogged`: Boosted by Me (boolean)
- `status.bookmarked`: Bookmarked by Me (boolean)
- `status.muted`: Conversation Muted (boolean)
- `status.pinned`: Pinned to Profile (boolean)
- `status.reblog`: Boosted Status
- `status.reblog.id`: Status ID
- `status.reblog.created_at`: Created At (datetime)
- `status.reblog.url`: URL (url)
- `status.reblog.uri`: ActivityPub URI (url)
- `status.reblog.content`: Content (html)
- `status.reblog.spoiler_text`: Content Warning
- `status.reblog.sensitive`: Sensitive (boolean)
- `status.reblog.visibility`: Visibility
- `status.reblog.language`: Language
- `status.reblog.in_reply_to_id`: In Reply To Status ID
- `status.reblog.in_reply_to_account_id`: In Reply To Account ID
- `status.reblog.replies_count`: Replies (number)
- `status.reblog.reblogs_count`: Boosts (number)
- `status.reblog.favourites_count`: Favourites (number)
- `status.reblog.edited_at`: Edited At (datetime)
- `status.reblog.account`: Author
- `status.reblog.account.id`: Account ID
- `status.reblog.account.username`: Username
- `status.reblog.account.acct`: Handle
- `status.reblog.account.display_name`: Display Name
- `status.reblog.account.url`: Profile URL (url)
- `status.reblog.account.avatar`: Avatar (image)
- `status.reblog.account.bot`: Bot (boolean)
- `status.reblog.media_attachments`: Media Attachments
- `status.reblog.media_attachments[].id`: Media ID
- `status.reblog.media_attachments[].type`: Type
- `status.reblog.media_attachments[].url`: URL (url)
- `status.reblog.media_attachments[].preview_url`: Preview (image)
- `status.reblog.media_attachments[].remote_url`: Remote URL (url)
- `status.reblog.media_attachments[].description`: Alt Text
- `status.reblog.media_attachments[].meta`: Metadata
- `status.reblog.media_attachments[].meta.original`: Original
- `status.reblog.media_attachments[].meta.original.width`: Width (number)
- `status.reblog.media_attachments[].meta.original.height`: Height (number)
- `status.reblog.media_attachments[].meta.focus`: Focal Point
- `status.reblog.media_attachments[].meta.focus.x`: X (number)
- `status.reblog.media_attachments[].meta.focus.y`: Y (number)
- `status.reblog.mentions`: Mentions
- `status.reblog.mentions[].id`: Account ID
- `status.reblog.mentions[].username`: Username
- `status.reblog.mentions[].acct`: Handle
- `status.reblog.mentions[].url`: Profile URL (url)
- `status.reblog.tags`: Hashtags
- `status.reblog.tags[].name`: Name
- `status.reblog.tags[].url`: URL (url)
- `status.reblog.poll`: Poll
- `status.reblog.poll.id`: Poll ID
- `status.reblog.poll.expires_at`: Expires At (datetime)
- `status.reblog.poll.expired`: Expired (boolean)
- `status.reblog.poll.multiple`: Multiple Choice (boolean)
- `status.reblog.poll.votes_count`: Votes (number)
- `status.reblog.poll.voters_count`: Voters (number)
- `status.reblog.poll.voted`: Voted (boolean)
- `status.reblog.poll.own_votes`: Own Votes (Option Indexes)
- `status.reblog.poll.options`: Options
- `status.reblog.poll.options[].title`: Title
- `status.reblog.poll.options[].votes_count`: Votes (number)
- `status.reblog.card`: Link Preview
- `status.reblog.card.url`: URL (url)
- `status.reblog.card.title`: Title
- `status.reblog.card.description`: Description
- `status.reblog.card.type`: Type
- `status.reblog.card.language`: Language
- `status.reblog.card.provider_name`: Provider
- `status.reblog.card.author_name`: Author
- `status.reblog.card.image`: Image (image)
- `status.reblog.card.published_at`: Published At (datetime)
- `status.application`: Posted With
- `status.application.name`: App Name
- `status.application.website`: App Website (url)

### `dismiss_notification`

**Dismiss Notification.** Dismisses (removes) one notification of the connected account. Use Clear Notifications to remove all of them. Irreversible; repeating the call fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `notification_id` | string | yes |  | Notification ID. ID of the notification. Obtain it from List Notifications. |

Output fields:

- `success`: Success (boolean)
- `notification_id`: Dismissed Notification ID

### `clear_notifications`

**Clear All Notifications.** Permanently removes ALL notifications of the connected account in one call; this cannot be undone. Prefer Dismiss Notification to remove a single one. Repeating it is harmless. Needs authentication.

Kind: destructive, safe to repeat.

No inputs.

Output fields:

- `success`: Success (boolean)

### `get_unread_notification_count`

**Get Unread Notification Count.** Returns how many unread notifications the connected account has (capped by Limit), optionally counting only some types or one account. Use List Notifications to read them. Requires Mastodon 4.3 or later. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `types` | array | no |  | Count Only Types. Only count these notification types. Leave empty for all types. One of `"mention"`, `"status"`, `"reblog"`, `"follow"`, `"follow_request"`, `"favourite"`, `"poll"`, `"update"`, `"quote"`, `"quoted_update"`, `"severed_relationships"`, `"moderation_warning"`, `"admin.sign_up"`, `"admin.report"`. |
| `exclude_types` | array | no |  | Exclude Types. Do not count these notification types. One of `"mention"`, `"status"`, `"reblog"`, `"follow"`, `"follow_request"`, `"favourite"`, `"poll"`, `"update"`, `"quote"`, `"quoted_update"`, `"severed_relationships"`, `"moderation_warning"`, `"admin.sign_up"`, `"admin.report"`. |
| `account_id` | string | no |  | From Account ID. Only count notifications caused by this account (local account ID). |
| `limit` | number | no |  | Maximum Count. Stop counting at this number. Defaults to 100, maximum 1000. |

Output fields:

- `count`: Unread Notifications (number)

### `search`

**Search.** Searches accounts, statuses and hashtags on the connected server. It is also how to import remote content: a status URL or a user@domain handle with resolve=true fetches it from the other server and returns its local ID for other actions; resolve is turned on automatically for such queries unless you set it. Full-text status search depends on the server and may only match your own posts. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `q` | string | yes |  | Query. Search text, a hashtag, a handle such as Gargron@mastodon.social, or a status or profile URL such as https://mastodon.social/@Gargron/109372843234737004. |
| `type` | string | no |  | Result Type. Only return one kind of result. Leave empty for all three. One of `"accounts"`, `"statuses"`, `"hashtags"`. |
| `resolve` | string | no |  | Resolve Remote Content. Fetch unknown remote accounts or URLs from their server. Leave empty to resolve automatically when the query is a URL or user@domain handle. One of `true`, `false`. |
| `following` | string | no |  | Only Accounts I Follow. Only include accounts the connected account follows. Leave empty for no restriction. One of `true`, `false`. |
| `account_id` | string | no |  | Statuses By Account ID. Only return statuses written by this account. Use the Account ID from Lookup Account, not the @handle. |
| `exclude_unreviewed` | string | no |  | Exclude Unreviewed Hashtags. Leave out hashtags not yet reviewed by moderators. Leave empty for the default (no). One of `true`, `false`. |
| `limit` | number | no |  | Limit. Maximum number of results per type to return in this page. Defaults to 20, maximum 40. |
| `offset` | number | no |  | Offset. Number of results to skip, for paging. Only applies when Result Type is set. |
| `max_id` | string | no |  | Max ID. Only return results with an ID lower than this. |
| `min_id` | string | no |  | Min ID. Only return results with an ID immediately higher than this. |

Output fields:

- `accounts`: Accounts
- `accounts[].id`: Account ID
- `accounts[].username`: Username
- `accounts[].acct`: Handle
- `accounts[].display_name`: Display Name
- `accounts[].note`: Bio (html)
- `accounts[].url`: Profile URL (url)
- `accounts[].uri`: ActivityPub URI (url)
- `accounts[].avatar`: Avatar (image)
- `accounts[].header`: Header Image (image)
- `accounts[].locked`: Requires Follow Approval (boolean)
- `accounts[].bot`: Bot (boolean)
- `accounts[].group`: Group (boolean)
- `accounts[].discoverable`: Discoverable (boolean)
- `accounts[].indexable`: Indexable (boolean)
- `accounts[].created_at`: Created At (datetime)
- `accounts[].last_status_at`: Last Status Date (date)
- `accounts[].followers_count`: Followers (number)
- `accounts[].following_count`: Following (number)
- `accounts[].statuses_count`: Statuses (number)
- `accounts[].fields`: Profile Fields
- `accounts[].fields[].name`: Name
- `accounts[].fields[].value`: Value (html)
- `accounts[].fields[].verified_at`: Verified At (datetime)
- `statuses`: Statuses
- `statuses[].id`: Status ID
- `statuses[].created_at`: Created At (datetime)
- `statuses[].url`: URL (url)
- `statuses[].uri`: ActivityPub URI (url)
- `statuses[].content`: Content (html)
- `statuses[].spoiler_text`: Content Warning
- `statuses[].sensitive`: Sensitive (boolean)
- `statuses[].visibility`: Visibility
- `statuses[].language`: Language
- `statuses[].in_reply_to_id`: In Reply To Status ID
- `statuses[].in_reply_to_account_id`: In Reply To Account ID
- `statuses[].replies_count`: Replies (number)
- `statuses[].reblogs_count`: Boosts (number)
- `statuses[].favourites_count`: Favourites (number)
- `statuses[].edited_at`: Edited At (datetime)
- `statuses[].account`: Author
- `statuses[].account.id`: Account ID
- `statuses[].account.username`: Username
- `statuses[].account.acct`: Handle
- `statuses[].account.display_name`: Display Name
- `statuses[].account.url`: Profile URL (url)
- `statuses[].account.avatar`: Avatar (image)
- `statuses[].account.bot`: Bot (boolean)
- `statuses[].media_attachments`: Media Attachments
- `statuses[].media_attachments[].id`: Media ID
- `statuses[].media_attachments[].type`: Type
- `statuses[].media_attachments[].url`: URL (url)
- `statuses[].media_attachments[].preview_url`: Preview (image)
- `statuses[].media_attachments[].remote_url`: Remote URL (url)
- `statuses[].media_attachments[].description`: Alt Text
- `statuses[].media_attachments[].meta`: Metadata
- `statuses[].media_attachments[].meta.original`: Original
- `statuses[].media_attachments[].meta.original.width`: Width (number)
- `statuses[].media_attachments[].meta.original.height`: Height (number)
- `statuses[].media_attachments[].meta.focus`: Focal Point
- `statuses[].media_attachments[].meta.focus.x`: X (number)
- `statuses[].media_attachments[].meta.focus.y`: Y (number)
- `statuses[].mentions`: Mentions
- `statuses[].mentions[].id`: Account ID
- `statuses[].mentions[].username`: Username
- `statuses[].mentions[].acct`: Handle
- `statuses[].mentions[].url`: Profile URL (url)
- `statuses[].tags`: Hashtags
- `statuses[].tags[].name`: Name
- `statuses[].tags[].url`: URL (url)
- `statuses[].poll`: Poll
- `statuses[].poll.id`: Poll ID
- `statuses[].poll.expires_at`: Expires At (datetime)
- `statuses[].poll.expired`: Expired (boolean)
- `statuses[].poll.multiple`: Multiple Choice (boolean)
- `statuses[].poll.votes_count`: Votes (number)
- `statuses[].poll.voters_count`: Voters (number)
- `statuses[].poll.voted`: Voted (boolean)
- `statuses[].poll.own_votes`: Own Votes (Option Indexes)
- `statuses[].poll.options`: Options
- `statuses[].poll.options[].title`: Title
- `statuses[].poll.options[].votes_count`: Votes (number)
- `statuses[].card`: Link Preview
- `statuses[].card.url`: URL (url)
- `statuses[].card.title`: Title
- `statuses[].card.description`: Description
- `statuses[].card.type`: Type
- `statuses[].card.language`: Language
- `statuses[].card.provider_name`: Provider
- `statuses[].card.author_name`: Author
- `statuses[].card.image`: Image (image)
- `statuses[].card.published_at`: Published At (datetime)
- `statuses[].favourited`: Favourited by Me (boolean)
- `statuses[].reblogged`: Boosted by Me (boolean)
- `statuses[].bookmarked`: Bookmarked by Me (boolean)
- `statuses[].muted`: Conversation Muted (boolean)
- `statuses[].pinned`: Pinned to Profile (boolean)
- `statuses[].reblog`: Boosted Status
- `statuses[].reblog.id`: Status ID
- `statuses[].reblog.created_at`: Created At (datetime)
- `statuses[].reblog.url`: URL (url)
- `statuses[].reblog.uri`: ActivityPub URI (url)
- `statuses[].reblog.content`: Content (html)
- `statuses[].reblog.spoiler_text`: Content Warning
- `statuses[].reblog.sensitive`: Sensitive (boolean)
- `statuses[].reblog.visibility`: Visibility
- `statuses[].reblog.language`: Language
- `statuses[].reblog.in_reply_to_id`: In Reply To Status ID
- `statuses[].reblog.in_reply_to_account_id`: In Reply To Account ID
- `statuses[].reblog.replies_count`: Replies (number)
- `statuses[].reblog.reblogs_count`: Boosts (number)
- `statuses[].reblog.favourites_count`: Favourites (number)
- `statuses[].reblog.edited_at`: Edited At (datetime)
- `statuses[].reblog.account`: Author
- `statuses[].reblog.account.id`: Account ID
- `statuses[].reblog.account.username`: Username
- `statuses[].reblog.account.acct`: Handle
- `statuses[].reblog.account.display_name`: Display Name
- `statuses[].reblog.account.url`: Profile URL (url)
- `statuses[].reblog.account.avatar`: Avatar (image)
- `statuses[].reblog.account.bot`: Bot (boolean)
- `statuses[].reblog.media_attachments`: Media Attachments
- `statuses[].reblog.media_attachments[].id`: Media ID
- `statuses[].reblog.media_attachments[].type`: Type
- `statuses[].reblog.media_attachments[].url`: URL (url)
- `statuses[].reblog.media_attachments[].preview_url`: Preview (image)
- `statuses[].reblog.media_attachments[].remote_url`: Remote URL (url)
- `statuses[].reblog.media_attachments[].description`: Alt Text
- `statuses[].reblog.media_attachments[].meta`: Metadata
- `statuses[].reblog.media_attachments[].meta.original`: Original
- `statuses[].reblog.media_attachments[].meta.original.width`: Width (number)
- `statuses[].reblog.media_attachments[].meta.original.height`: Height (number)
- `statuses[].reblog.media_attachments[].meta.focus`: Focal Point
- `statuses[].reblog.media_attachments[].meta.focus.x`: X (number)
- `statuses[].reblog.media_attachments[].meta.focus.y`: Y (number)
- `statuses[].reblog.mentions`: Mentions
- `statuses[].reblog.mentions[].id`: Account ID
- `statuses[].reblog.mentions[].username`: Username
- `statuses[].reblog.mentions[].acct`: Handle
- `statuses[].reblog.mentions[].url`: Profile URL (url)
- `statuses[].reblog.tags`: Hashtags
- `statuses[].reblog.tags[].name`: Name
- `statuses[].reblog.tags[].url`: URL (url)
- `statuses[].reblog.poll`: Poll
- `statuses[].reblog.poll.id`: Poll ID
- `statuses[].reblog.poll.expires_at`: Expires At (datetime)
- `statuses[].reblog.poll.expired`: Expired (boolean)
- `statuses[].reblog.poll.multiple`: Multiple Choice (boolean)
- `statuses[].reblog.poll.votes_count`: Votes (number)
- `statuses[].reblog.poll.voters_count`: Voters (number)
- `statuses[].reblog.poll.voted`: Voted (boolean)
- `statuses[].reblog.poll.own_votes`: Own Votes (Option Indexes)
- `statuses[].reblog.poll.options`: Options
- `statuses[].reblog.poll.options[].title`: Title
- `statuses[].reblog.poll.options[].votes_count`: Votes (number)
- `statuses[].reblog.card`: Link Preview
- `statuses[].reblog.card.url`: URL (url)
- `statuses[].reblog.card.title`: Title
- `statuses[].reblog.card.description`: Description
- `statuses[].reblog.card.type`: Type
- `statuses[].reblog.card.language`: Language
- `statuses[].reblog.card.provider_name`: Provider
- `statuses[].reblog.card.author_name`: Author
- `statuses[].reblog.card.image`: Image (image)
- `statuses[].reblog.card.published_at`: Published At (datetime)
- `statuses[].application`: Posted With
- `statuses[].application.name`: App Name
- `statuses[].application.website`: App Website (url)
- `hashtags`: Hashtags
- `hashtags[].id`: Tag ID
- `hashtags[].name`: Name
- `hashtags[].url`: URL (url)
- `hashtags[].following`: Followed by Me (boolean)
- `hashtags[].featuring`: Featured on Profile (boolean)
- `hashtags[].history`: Daily Usage
- `hashtags[].history[].day`: Day (Unix Time)
- `hashtags[].history[].uses`: Uses
- `hashtags[].history[].accounts`: Accounts

### `list_lists`

**List Lists.** Returns all lists owned by the connected account with their IDs, titles and settings; use it to resolve a list name to the List ID other list actions need. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `lists`: Lists
- `lists[].id`: List ID
- `lists[].title`: Title
- `lists[].replies_policy`: Replies Policy
- `lists[].exclusive`: Exclusive (boolean)
- `count`: Count (number)

### `get_list`

**Get List.** Fetches one of the connected account's lists by ID (title, replies policy, exclusive flag). Use List Lists to find IDs and List Accounts in List for its members. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. ID of one of your lists. Obtain it from List Lists or Create List. |

Output fields:

- `id`: List ID
- `title`: Title
- `replies_policy`: Replies Policy
- `exclusive`: Exclusive (boolean)

### `create_list`

**Create List.** Creates a private list owned by the connected account, used to group followed accounts into a separate timeline. Add members with Add Accounts to List (they must already be followed). Each call creates a new list, even with the same title; check List Lists first to avoid duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. Name of the list, for example News. |
| `replies_policy` | string | no |  | Show Replies To. Which replies appear in the list timeline. Leave empty for the default (list members). One of `"followed"`, `"list"`, `"none"`. |
| `exclusive` | string | no |  | Hide Members From Home Timeline. Whether posts from list members are removed from the home timeline. Leave empty for the default (no). One of `true`, `false`. |

Output fields:

- `id`: List ID
- `title`: Title
- `replies_policy`: Replies Policy
- `exclusive`: Exclusive (boolean)

### `update_list`

**Update List.** Changes the title, replies policy or exclusive setting of one of the connected account's lists; only the fields you set change. Use Add Accounts to List or Remove Accounts from List to change members. Setting the same values again converges, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. ID of one of your lists. Obtain it from List Lists or Create List. |
| `title` | string | no |  | Title. New name of the list. Leave empty to keep the current title. |
| `replies_policy` | string | no |  | Show Replies To. Which replies appear in the list timeline. Leave empty to keep the current setting. One of `"followed"`, `"list"`, `"none"`. |
| `exclusive` | string | no |  | Hide Members From Home Timeline. Whether posts from list members are removed from the home timeline. Leave empty to keep the current setting. One of `true`, `false`. |

Output fields:

- `id`: List ID
- `title`: Title
- `replies_policy`: Replies Policy
- `exclusive`: Exclusive (boolean)

### `delete_list`

**Delete List.** Permanently deletes one of the connected account's lists (the accounts in it are not affected). Irreversible; repeating the call fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. ID of one of your lists. Obtain it from List Lists or Create List. |

Output fields:

- `success`: Success (boolean)
- `list_id`: List ID

### `list_list_accounts`

**List Accounts in List.** Returns one page of accounts in one of the connected account's lists, with Link-header cursors for further pages (the previous-page cursor comes back as prev_since_id). Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. ID of one of your lists. Obtain it from List Lists or Create List. |
| `limit` | number | no |  | Limit. Maximum number of accounts to return in this page. Defaults to 40, maximum 80. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |
| `min_id` | string | no |  | Min ID (newer page). Cursor for the page immediately newer than a previous page. Pass the `prev_min_id` value from a previous page of this same action. |

Output fields:

- `accounts`: Accounts
- `accounts[].id`: Account ID
- `accounts[].username`: Username
- `accounts[].acct`: Handle
- `accounts[].display_name`: Display Name
- `accounts[].note`: Bio (html)
- `accounts[].url`: Profile URL (url)
- `accounts[].uri`: ActivityPub URI (url)
- `accounts[].avatar`: Avatar (image)
- `accounts[].header`: Header Image (image)
- `accounts[].locked`: Requires Follow Approval (boolean)
- `accounts[].bot`: Bot (boolean)
- `accounts[].group`: Group (boolean)
- `accounts[].discoverable`: Discoverable (boolean)
- `accounts[].indexable`: Indexable (boolean)
- `accounts[].created_at`: Created At (datetime)
- `accounts[].last_status_at`: Last Status Date (date)
- `accounts[].followers_count`: Followers (number)
- `accounts[].following_count`: Following (number)
- `accounts[].statuses_count`: Statuses (number)
- `accounts[].fields`: Profile Fields
- `accounts[].fields[].name`: Name
- `accounts[].fields[].value`: Value (html)
- `accounts[].fields[].verified_at`: Verified At (datetime)
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `add_accounts_to_list`

**Add Accounts to List.** Adds one or more accounts to one of the connected account's lists. The connected account must already follow each of them (use Follow Account first), otherwise Mastodon rejects the call. Adding an account that is already in the list may be rejected, so check List Accounts in List before retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. ID of one of your lists. Obtain it from List Lists or Create List. |
| `account_ids` | array | yes |  | Account IDs. Local IDs of followed accounts to add, one per item. Obtain them from List Account Following, Lookup Account or Search Accounts. |

Output fields:

- `success`: Success (boolean)
- `list_id`: List ID

### `remove_accounts_from_list`

**Remove Accounts from List.** Removes one or more accounts from one of the connected account's lists; it does not unfollow them. Removing an account that is not in the list changes nothing, so it is safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `list_id` | string | yes |  | List ID. ID of one of your lists. Obtain it from List Lists or Create List. |
| `account_ids` | array | yes |  | Account IDs. Local IDs of the accounts to remove, one per item. Obtain them from List Accounts in List. |

Output fields:

- `success`: Success (boolean)
- `list_id`: List ID

### `get_poll`

**Get Poll.** Fetches a poll by ID with its options, vote counts, expiry and whether the connected account has voted. Use Vote in Poll to vote. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `poll_id` | string | yes |  | Poll ID. ID of the poll (the poll.id field of a status). Obtain it from Get Status or a timeline. |

Output fields:

- `id`: Poll ID
- `expires_at`: Expires At (datetime)
- `expired`: Expired (boolean)
- `multiple`: Multiple Choice (boolean)
- `votes_count`: Votes (number)
- `voters_count`: Voters (number)
- `voted`: Voted (boolean)
- `own_votes`: Own Votes (Option Indexes)
- `options`: Options
- `options[].title`: Title
- `options[].votes_count`: Votes (number)

### `vote_in_poll`

**Vote in Poll.** Casts the connected account's vote in a poll using 0-based option indexes (read the options with Get Poll or Get Status). Pass several indexes only when the poll allows multiple choices. A vote cannot be changed: voting again or voting in an expired poll is rejected, so do not retry. Returns the updated poll. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `poll_id` | string | yes |  | Poll ID. ID of the poll (the poll.id field of a status). Obtain it from Get Status or a timeline. |
| `choices` | array | yes |  | Choices. 0-based index of each option to vote for, one per item; for example 0 for the first option. |

Output fields:

- `id`: Poll ID
- `expires_at`: Expires At (datetime)
- `expired`: Expired (boolean)
- `multiple`: Multiple Choice (boolean)
- `votes_count`: Votes (number)
- `voters_count`: Voters (number)
- `voted`: Voted (boolean)
- `own_votes`: Own Votes (Option Indexes)
- `options`: Options
- `options[].title`: Title
- `options[].votes_count`: Votes (number)

### `list_conversations`

**List Conversations.** Returns one page of the connected account's direct-message conversations (participants, last status, unread flag), with cursors for further pages. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of conversations to return in this page. Defaults to 20, maximum 40. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |
| `min_id` | string | no |  | Min ID (newer page). Cursor for the page immediately newer than a previous page. Pass the `prev_min_id` value from a previous page of this same action. |

Output fields:

- `conversations`: Conversations
- `conversations[].id`: Conversation ID
- `conversations[].unread`: Unread (boolean)
- `conversations[].accounts`: Participants
- `conversations[].accounts[].id`: Account ID
- `conversations[].accounts[].username`: Username
- `conversations[].accounts[].acct`: Handle
- `conversations[].accounts[].display_name`: Display Name
- `conversations[].accounts[].url`: Profile URL (url)
- `conversations[].accounts[].avatar`: Avatar (image)
- `conversations[].accounts[].bot`: Bot (boolean)
- `conversations[].last_status`: Last Status
- `conversations[].last_status.id`: Status ID
- `conversations[].last_status.created_at`: Created At (datetime)
- `conversations[].last_status.url`: URL (url)
- `conversations[].last_status.uri`: ActivityPub URI (url)
- `conversations[].last_status.content`: Content (html)
- `conversations[].last_status.spoiler_text`: Content Warning
- `conversations[].last_status.sensitive`: Sensitive (boolean)
- `conversations[].last_status.visibility`: Visibility
- `conversations[].last_status.language`: Language
- `conversations[].last_status.in_reply_to_id`: In Reply To Status ID
- `conversations[].last_status.in_reply_to_account_id`: In Reply To Account ID
- `conversations[].last_status.replies_count`: Replies (number)
- `conversations[].last_status.reblogs_count`: Boosts (number)
- `conversations[].last_status.favourites_count`: Favourites (number)
- `conversations[].last_status.edited_at`: Edited At (datetime)
- `conversations[].last_status.account`: Author
- `conversations[].last_status.account.id`: Account ID
- `conversations[].last_status.account.username`: Username
- `conversations[].last_status.account.acct`: Handle
- `conversations[].last_status.account.display_name`: Display Name
- `conversations[].last_status.account.url`: Profile URL (url)
- `conversations[].last_status.account.avatar`: Avatar (image)
- `conversations[].last_status.account.bot`: Bot (boolean)
- `conversations[].last_status.media_attachments`: Media Attachments
- `conversations[].last_status.media_attachments[].id`: Media ID
- `conversations[].last_status.media_attachments[].type`: Type
- `conversations[].last_status.media_attachments[].url`: URL (url)
- `conversations[].last_status.media_attachments[].preview_url`: Preview (image)
- `conversations[].last_status.media_attachments[].remote_url`: Remote URL (url)
- `conversations[].last_status.media_attachments[].description`: Alt Text
- `conversations[].last_status.media_attachments[].meta`: Metadata
- `conversations[].last_status.media_attachments[].meta.original`: Original
- `conversations[].last_status.media_attachments[].meta.original.width`: Width (number)
- `conversations[].last_status.media_attachments[].meta.original.height`: Height (number)
- `conversations[].last_status.media_attachments[].meta.focus`: Focal Point
- `conversations[].last_status.media_attachments[].meta.focus.x`: X (number)
- `conversations[].last_status.media_attachments[].meta.focus.y`: Y (number)
- `conversations[].last_status.mentions`: Mentions
- `conversations[].last_status.mentions[].id`: Account ID
- `conversations[].last_status.mentions[].username`: Username
- `conversations[].last_status.mentions[].acct`: Handle
- `conversations[].last_status.mentions[].url`: Profile URL (url)
- `conversations[].last_status.tags`: Hashtags
- `conversations[].last_status.tags[].name`: Name
- `conversations[].last_status.tags[].url`: URL (url)
- `conversations[].last_status.poll`: Poll
- `conversations[].last_status.poll.id`: Poll ID
- `conversations[].last_status.poll.expires_at`: Expires At (datetime)
- `conversations[].last_status.poll.expired`: Expired (boolean)
- `conversations[].last_status.poll.multiple`: Multiple Choice (boolean)
- `conversations[].last_status.poll.votes_count`: Votes (number)
- `conversations[].last_status.poll.voters_count`: Voters (number)
- `conversations[].last_status.poll.voted`: Voted (boolean)
- `conversations[].last_status.poll.own_votes`: Own Votes (Option Indexes)
- `conversations[].last_status.poll.options`: Options
- `conversations[].last_status.poll.options[].title`: Title
- `conversations[].last_status.poll.options[].votes_count`: Votes (number)
- `conversations[].last_status.card`: Link Preview
- `conversations[].last_status.card.url`: URL (url)
- `conversations[].last_status.card.title`: Title
- `conversations[].last_status.card.description`: Description
- `conversations[].last_status.card.type`: Type
- `conversations[].last_status.card.language`: Language
- `conversations[].last_status.card.provider_name`: Provider
- `conversations[].last_status.card.author_name`: Author
- `conversations[].last_status.card.image`: Image (image)
- `conversations[].last_status.card.published_at`: Published At (datetime)
- `conversations[].last_status.favourited`: Favourited by Me (boolean)
- `conversations[].last_status.reblogged`: Boosted by Me (boolean)
- `conversations[].last_status.bookmarked`: Bookmarked by Me (boolean)
- `conversations[].last_status.muted`: Conversation Muted (boolean)
- `conversations[].last_status.pinned`: Pinned to Profile (boolean)
- `conversations[].last_status.reblog`: Boosted Status
- `conversations[].last_status.reblog.id`: Status ID
- `conversations[].last_status.reblog.created_at`: Created At (datetime)
- `conversations[].last_status.reblog.url`: URL (url)
- `conversations[].last_status.reblog.uri`: ActivityPub URI (url)
- `conversations[].last_status.reblog.content`: Content (html)
- `conversations[].last_status.reblog.spoiler_text`: Content Warning
- `conversations[].last_status.reblog.sensitive`: Sensitive (boolean)
- `conversations[].last_status.reblog.visibility`: Visibility
- `conversations[].last_status.reblog.language`: Language
- `conversations[].last_status.reblog.in_reply_to_id`: In Reply To Status ID
- `conversations[].last_status.reblog.in_reply_to_account_id`: In Reply To Account ID
- `conversations[].last_status.reblog.replies_count`: Replies (number)
- `conversations[].last_status.reblog.reblogs_count`: Boosts (number)
- `conversations[].last_status.reblog.favourites_count`: Favourites (number)
- `conversations[].last_status.reblog.edited_at`: Edited At (datetime)
- `conversations[].last_status.reblog.account`: Author
- `conversations[].last_status.reblog.account.id`: Account ID
- `conversations[].last_status.reblog.account.username`: Username
- `conversations[].last_status.reblog.account.acct`: Handle
- `conversations[].last_status.reblog.account.display_name`: Display Name
- `conversations[].last_status.reblog.account.url`: Profile URL (url)
- `conversations[].last_status.reblog.account.avatar`: Avatar (image)
- `conversations[].last_status.reblog.account.bot`: Bot (boolean)
- `conversations[].last_status.reblog.media_attachments`: Media Attachments
- `conversations[].last_status.reblog.media_attachments[].id`: Media ID
- `conversations[].last_status.reblog.media_attachments[].type`: Type
- `conversations[].last_status.reblog.media_attachments[].url`: URL (url)
- `conversations[].last_status.reblog.media_attachments[].preview_url`: Preview (image)
- `conversations[].last_status.reblog.media_attachments[].remote_url`: Remote URL (url)
- `conversations[].last_status.reblog.media_attachments[].description`: Alt Text
- `conversations[].last_status.reblog.media_attachments[].meta`: Metadata
- `conversations[].last_status.reblog.media_attachments[].meta.original`: Original
- `conversations[].last_status.reblog.media_attachments[].meta.original.width`: Width (number)
- `conversations[].last_status.reblog.media_attachments[].meta.original.height`: Height (number)
- `conversations[].last_status.reblog.media_attachments[].meta.focus`: Focal Point
- `conversations[].last_status.reblog.media_attachments[].meta.focus.x`: X (number)
- `conversations[].last_status.reblog.media_attachments[].meta.focus.y`: Y (number)
- `conversations[].last_status.reblog.mentions`: Mentions
- `conversations[].last_status.reblog.mentions[].id`: Account ID
- `conversations[].last_status.reblog.mentions[].username`: Username
- `conversations[].last_status.reblog.mentions[].acct`: Handle
- `conversations[].last_status.reblog.mentions[].url`: Profile URL (url)
- `conversations[].last_status.reblog.tags`: Hashtags
- `conversations[].last_status.reblog.tags[].name`: Name
- `conversations[].last_status.reblog.tags[].url`: URL (url)
- `conversations[].last_status.reblog.poll`: Poll
- `conversations[].last_status.reblog.poll.id`: Poll ID
- `conversations[].last_status.reblog.poll.expires_at`: Expires At (datetime)
- `conversations[].last_status.reblog.poll.expired`: Expired (boolean)
- `conversations[].last_status.reblog.poll.multiple`: Multiple Choice (boolean)
- `conversations[].last_status.reblog.poll.votes_count`: Votes (number)
- `conversations[].last_status.reblog.poll.voters_count`: Voters (number)
- `conversations[].last_status.reblog.poll.voted`: Voted (boolean)
- `conversations[].last_status.reblog.poll.own_votes`: Own Votes (Option Indexes)
- `conversations[].last_status.reblog.poll.options`: Options
- `conversations[].last_status.reblog.poll.options[].title`: Title
- `conversations[].last_status.reblog.poll.options[].votes_count`: Votes (number)
- `conversations[].last_status.reblog.card`: Link Preview
- `conversations[].last_status.reblog.card.url`: URL (url)
- `conversations[].last_status.reblog.card.title`: Title
- `conversations[].last_status.reblog.card.description`: Description
- `conversations[].last_status.reblog.card.type`: Type
- `conversations[].last_status.reblog.card.language`: Language
- `conversations[].last_status.reblog.card.provider_name`: Provider
- `conversations[].last_status.reblog.card.author_name`: Author
- `conversations[].last_status.reblog.card.image`: Image (image)
- `conversations[].last_status.reblog.card.published_at`: Published At (datetime)
- `conversations[].last_status.application`: Posted With
- `conversations[].last_status.application.name`: App Name
- `conversations[].last_status.application.website`: App Website (url)
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `mark_conversation_read`

**Mark Conversation as Read.** Marks a direct-message conversation of the connected account as read. Get the conversation ID from List Conversations. Safe to retry. Returns the updated conversation. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. ID of the direct-message conversation. Obtain it from List Conversations. |

Output fields:

- `id`: Conversation ID
- `unread`: Unread (boolean)
- `accounts`: Participants
- `accounts[].id`: Account ID
- `accounts[].username`: Username
- `accounts[].acct`: Handle
- `accounts[].display_name`: Display Name
- `accounts[].url`: Profile URL (url)
- `accounts[].avatar`: Avatar (image)
- `accounts[].bot`: Bot (boolean)
- `last_status`: Last Status
- `last_status.id`: Status ID
- `last_status.created_at`: Created At (datetime)
- `last_status.url`: URL (url)
- `last_status.uri`: ActivityPub URI (url)
- `last_status.content`: Content (html)
- `last_status.spoiler_text`: Content Warning
- `last_status.sensitive`: Sensitive (boolean)
- `last_status.visibility`: Visibility
- `last_status.language`: Language
- `last_status.in_reply_to_id`: In Reply To Status ID
- `last_status.in_reply_to_account_id`: In Reply To Account ID
- `last_status.replies_count`: Replies (number)
- `last_status.reblogs_count`: Boosts (number)
- `last_status.favourites_count`: Favourites (number)
- `last_status.edited_at`: Edited At (datetime)
- `last_status.account`: Author
- `last_status.account.id`: Account ID
- `last_status.account.username`: Username
- `last_status.account.acct`: Handle
- `last_status.account.display_name`: Display Name
- `last_status.account.url`: Profile URL (url)
- `last_status.account.avatar`: Avatar (image)
- `last_status.account.bot`: Bot (boolean)
- `last_status.media_attachments`: Media Attachments
- `last_status.media_attachments[].id`: Media ID
- `last_status.media_attachments[].type`: Type
- `last_status.media_attachments[].url`: URL (url)
- `last_status.media_attachments[].preview_url`: Preview (image)
- `last_status.media_attachments[].remote_url`: Remote URL (url)
- `last_status.media_attachments[].description`: Alt Text
- `last_status.media_attachments[].meta`: Metadata
- `last_status.media_attachments[].meta.original`: Original
- `last_status.media_attachments[].meta.original.width`: Width (number)
- `last_status.media_attachments[].meta.original.height`: Height (number)
- `last_status.media_attachments[].meta.focus`: Focal Point
- `last_status.media_attachments[].meta.focus.x`: X (number)
- `last_status.media_attachments[].meta.focus.y`: Y (number)
- `last_status.mentions`: Mentions
- `last_status.mentions[].id`: Account ID
- `last_status.mentions[].username`: Username
- `last_status.mentions[].acct`: Handle
- `last_status.mentions[].url`: Profile URL (url)
- `last_status.tags`: Hashtags
- `last_status.tags[].name`: Name
- `last_status.tags[].url`: URL (url)
- `last_status.poll`: Poll
- `last_status.poll.id`: Poll ID
- `last_status.poll.expires_at`: Expires At (datetime)
- `last_status.poll.expired`: Expired (boolean)
- `last_status.poll.multiple`: Multiple Choice (boolean)
- `last_status.poll.votes_count`: Votes (number)
- `last_status.poll.voters_count`: Voters (number)
- `last_status.poll.voted`: Voted (boolean)
- `last_status.poll.own_votes`: Own Votes (Option Indexes)
- `last_status.poll.options`: Options
- `last_status.poll.options[].title`: Title
- `last_status.poll.options[].votes_count`: Votes (number)
- `last_status.card`: Link Preview
- `last_status.card.url`: URL (url)
- `last_status.card.title`: Title
- `last_status.card.description`: Description
- `last_status.card.type`: Type
- `last_status.card.language`: Language
- `last_status.card.provider_name`: Provider
- `last_status.card.author_name`: Author
- `last_status.card.image`: Image (image)
- `last_status.card.published_at`: Published At (datetime)
- `last_status.favourited`: Favourited by Me (boolean)
- `last_status.reblogged`: Boosted by Me (boolean)
- `last_status.bookmarked`: Bookmarked by Me (boolean)
- `last_status.muted`: Conversation Muted (boolean)
- `last_status.pinned`: Pinned to Profile (boolean)
- `last_status.reblog`: Boosted Status
- `last_status.reblog.id`: Status ID
- `last_status.reblog.created_at`: Created At (datetime)
- `last_status.reblog.url`: URL (url)
- `last_status.reblog.uri`: ActivityPub URI (url)
- `last_status.reblog.content`: Content (html)
- `last_status.reblog.spoiler_text`: Content Warning
- `last_status.reblog.sensitive`: Sensitive (boolean)
- `last_status.reblog.visibility`: Visibility
- `last_status.reblog.language`: Language
- `last_status.reblog.in_reply_to_id`: In Reply To Status ID
- `last_status.reblog.in_reply_to_account_id`: In Reply To Account ID
- `last_status.reblog.replies_count`: Replies (number)
- `last_status.reblog.reblogs_count`: Boosts (number)
- `last_status.reblog.favourites_count`: Favourites (number)
- `last_status.reblog.edited_at`: Edited At (datetime)
- `last_status.reblog.account`: Author
- `last_status.reblog.account.id`: Account ID
- `last_status.reblog.account.username`: Username
- `last_status.reblog.account.acct`: Handle
- `last_status.reblog.account.display_name`: Display Name
- `last_status.reblog.account.url`: Profile URL (url)
- `last_status.reblog.account.avatar`: Avatar (image)
- `last_status.reblog.account.bot`: Bot (boolean)
- `last_status.reblog.media_attachments`: Media Attachments
- `last_status.reblog.media_attachments[].id`: Media ID
- `last_status.reblog.media_attachments[].type`: Type
- `last_status.reblog.media_attachments[].url`: URL (url)
- `last_status.reblog.media_attachments[].preview_url`: Preview (image)
- `last_status.reblog.media_attachments[].remote_url`: Remote URL (url)
- `last_status.reblog.media_attachments[].description`: Alt Text
- `last_status.reblog.media_attachments[].meta`: Metadata
- `last_status.reblog.media_attachments[].meta.original`: Original
- `last_status.reblog.media_attachments[].meta.original.width`: Width (number)
- `last_status.reblog.media_attachments[].meta.original.height`: Height (number)
- `last_status.reblog.media_attachments[].meta.focus`: Focal Point
- `last_status.reblog.media_attachments[].meta.focus.x`: X (number)
- `last_status.reblog.media_attachments[].meta.focus.y`: Y (number)
- `last_status.reblog.mentions`: Mentions
- `last_status.reblog.mentions[].id`: Account ID
- `last_status.reblog.mentions[].username`: Username
- `last_status.reblog.mentions[].acct`: Handle
- `last_status.reblog.mentions[].url`: Profile URL (url)
- `last_status.reblog.tags`: Hashtags
- `last_status.reblog.tags[].name`: Name
- `last_status.reblog.tags[].url`: URL (url)
- `last_status.reblog.poll`: Poll
- `last_status.reblog.poll.id`: Poll ID
- `last_status.reblog.poll.expires_at`: Expires At (datetime)
- `last_status.reblog.poll.expired`: Expired (boolean)
- `last_status.reblog.poll.multiple`: Multiple Choice (boolean)
- `last_status.reblog.poll.votes_count`: Votes (number)
- `last_status.reblog.poll.voters_count`: Voters (number)
- `last_status.reblog.poll.voted`: Voted (boolean)
- `last_status.reblog.poll.own_votes`: Own Votes (Option Indexes)
- `last_status.reblog.poll.options`: Options
- `last_status.reblog.poll.options[].title`: Title
- `last_status.reblog.poll.options[].votes_count`: Votes (number)
- `last_status.reblog.card`: Link Preview
- `last_status.reblog.card.url`: URL (url)
- `last_status.reblog.card.title`: Title
- `last_status.reblog.card.description`: Description
- `last_status.reblog.card.type`: Type
- `last_status.reblog.card.language`: Language
- `last_status.reblog.card.provider_name`: Provider
- `last_status.reblog.card.author_name`: Author
- `last_status.reblog.card.image`: Image (image)
- `last_status.reblog.card.published_at`: Published At (datetime)
- `last_status.application`: Posted With
- `last_status.application.name`: App Name
- `last_status.application.website`: App Website (url)

### `delete_conversation`

**Remove Conversation.** Removes a direct-message conversation from the connected account's conversation list only; the statuses themselves are not deleted and other participants keep it. Repeating the call fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `conversation_id` | string | yes |  | Conversation ID. ID of the direct-message conversation. Obtain it from List Conversations. |

Output fields:

- `success`: Success (boolean)
- `conversation_id`: Removed Conversation ID

### `get_tag`

**Get Hashtag.** Fetches a hashtag with its recent usage history and whether the connected account follows it. Use Get Hashtag Timeline for posts using it. Requires Mastodon 4.0 or later. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag_name` | string | yes |  | Hashtag. Hashtag name without the # sign, for example mastodon. A leading # is removed automatically. |

Output fields:

- `id`: Tag ID
- `name`: Name
- `url`: URL (url)
- `following`: Followed by Me (boolean)
- `featuring`: Featured on Profile (boolean)
- `history`: Daily Usage
- `history[].day`: Day (Unix Time)
- `history[].uses`: Uses
- `history[].accounts`: Accounts

### `follow_tag`

**Follow Hashtag.** Follows a hashtag so posts using it appear in the connected account's home timeline. Requires Mastodon 4.0 or later; repeating it is harmless on 4.1 and later. Returns the hashtag. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag_name` | string | yes |  | Hashtag. Hashtag name without the # sign, for example mastodon. A leading # is removed automatically. |

Output fields:

- `id`: Tag ID
- `name`: Name
- `url`: URL (url)
- `following`: Followed by Me (boolean)
- `featuring`: Featured on Profile (boolean)
- `history`: Daily Usage
- `history[].day`: Day (Unix Time)
- `history[].uses`: Uses
- `history[].accounts`: Accounts

### `unfollow_tag`

**Unfollow Hashtag.** Stops following a hashtag. Requires Mastodon 4.0 or later. Safe to retry. Returns the hashtag. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag_name` | string | yes |  | Hashtag. Hashtag name without the # sign, for example mastodon. A leading # is removed automatically. |

Output fields:

- `id`: Tag ID
- `name`: Name
- `url`: URL (url)
- `following`: Followed by Me (boolean)
- `featuring`: Featured on Profile (boolean)
- `history`: Daily Usage
- `history[].day`: Day (Unix Time)
- `history[].uses`: Uses
- `history[].accounts`: Accounts

### `list_followed_tags`

**List Followed Hashtags.** Returns one page of hashtags followed by the connected account. Cursors come from Link headers, which servers before 4.1 do not send (then everything is returned in one page with null cursors). Requires Mastodon 4.0 or later. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of hashtags to return in this page. Defaults to 100, maximum 200. |
| `max_id` | string | no |  | Max ID (older page). Cursor for the next (older) page. Pass the `next_max_id` value from the previous page of this same action. Leave empty for the newest page. |
| `since_id` | string | no |  | Since ID (newer results). Cursor for newer results. Pass the `prev_since_id` value from a previous page of this same action to page back towards newer items. |
| `min_id` | string | no |  | Min ID (newer page). Cursor for the page immediately newer than a previous page. Pass the `prev_min_id` value from a previous page of this same action. |

Output fields:

- `tags`: Hashtags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].url`: URL (url)
- `tags[].following`: Followed by Me (boolean)
- `tags[].featuring`: Featured on Profile (boolean)
- `tags[].history`: Daily Usage
- `tags[].history[].day`: Day (Unix Time)
- `tags[].history[].uses`: Uses
- `tags[].history[].accounts`: Accounts
- `count`: Count (number)
- `next_max_id`: Next Page Cursor (max_id)
- `prev_min_id`: Previous Page Cursor (min_id)
- `prev_since_id`: Previous Page Cursor (since_id)

### `list_filters`

**List Filters.** Returns all content filters of the connected account with their keywords, contexts and actions. Requires Mastodon 4.0 or later. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `filters`: Filters
- `filters[].id`: Filter ID
- `filters[].title`: Title
- `filters[].context`: Contexts
- `filters[].filter_action`: Action
- `filters[].expires_at`: Expires At (datetime)
- `filters[].keywords`: Keywords
- `filters[].keywords[].id`: Keyword ID
- `filters[].keywords[].keyword`: Keyword
- `filters[].keywords[].whole_word`: Whole Word (boolean)
- `count`: Count (number)

### `get_filter`

**Get Filter.** Fetches one of the connected account's content filters by ID, with its keywords, contexts and action. Use List Filters to find IDs. Requires Mastodon 4.0 or later. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter_id` | string | yes |  | Filter ID. ID of the filter. Obtain it from List Filters or Create Filter. |

Output fields:

- `id`: Filter ID
- `title`: Title
- `context`: Contexts
- `filter_action`: Action
- `expires_at`: Expires At (datetime)
- `keywords`: Keywords
- `keywords[].id`: Keyword ID
- `keywords[].keyword`: Keyword
- `keywords[].whole_word`: Whole Word (boolean)

### `create_filter`

**Create Filter.** Creates a content filter for the connected account that warns about, hides or blurs posts matching the given keywords in the chosen contexts, optionally expiring after a duration. Each call creates a new filter; check List Filters first to avoid duplicates. Requires Mastodon 4.0 or later. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. Name of the filter, for example Spoilers. |
| `context` | array | yes |  | Apply In. Where the filter applies. Choose at least one. One of `"home"`, `"notifications"`, `"public"`, `"thread"`, `"account"`. |
| `keywords` | array | no |  | Keywords. Words or phrases to filter, one per item. |
| `whole_word` | string | no |  | Match Whole Words Only. Applies to every keyword above. Leave empty for the default (no, match inside words too). One of `true`, `false`. |
| `filter_action` | string | no |  | Action. What happens to matching posts. Leave empty for the default (warn). One of `"warn"`, `"hide"`, `"blur"`. |
| `expires_in` | number | no |  | Expires In (seconds). Seconds from now until the filter expires, for example 86400 for one day. Leave empty to never expire. |

Output fields:

- `id`: Filter ID
- `title`: Title
- `context`: Contexts
- `filter_action`: Action
- `expires_at`: Expires At (datetime)
- `keywords`: Keywords
- `keywords[].id`: Keyword ID
- `keywords[].keyword`: Keyword
- `keywords[].whole_word`: Whole Word (boolean)

### `update_filter`

**Update Filter.** Updates one of the connected account's content filters; only the fields you set are sent. Apply In replaces the whole context list when set. Keywords are not changed here. Setting the same values again converges, so it is safe to retry. Requires Mastodon 4.0 or later. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter_id` | string | yes |  | Filter ID. ID of the filter. Obtain it from List Filters or Create Filter. |
| `title` | string | no |  | Title. New name of the filter. Leave empty to keep the current title. |
| `context` | array | no |  | Apply In. Replaces where the filter applies. Leave empty to keep the current contexts. One of `"home"`, `"notifications"`, `"public"`, `"thread"`, `"account"`. |
| `filter_action` | string | no |  | Action. What happens to matching posts. Leave empty to keep the current action. One of `"warn"`, `"hide"`, `"blur"`. |
| `expires_in` | number | no |  | Expires In (seconds). New expiry, in seconds from now. Leave empty to keep the current expiry. |

Output fields:

- `id`: Filter ID
- `title`: Title
- `context`: Contexts
- `filter_action`: Action
- `expires_at`: Expires At (datetime)
- `keywords`: Keywords
- `keywords[].id`: Keyword ID
- `keywords[].keyword`: Keyword
- `keywords[].whole_word`: Whole Word (boolean)

### `delete_filter`

**Delete Filter.** Permanently deletes one of the connected account's content filters with all its keywords. Requires Mastodon 4.0 or later. Irreversible; repeating the call fails with not found. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter_id` | string | yes |  | Filter ID. ID of the filter. Obtain it from List Filters or Create Filter. |

Output fields:

- `success`: Success (boolean)
- `filter_id`: Deleted Filter ID

### `get_trending_tags`

**Get Trending Hashtags.** Returns hashtags currently trending on the connected server, with usage history. Servers can disable trends, in which case the list is empty. Use offset to page. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of hashtags to return in this page. Defaults to 10, maximum 20. |
| `offset` | number | no |  | Offset. Number of results to skip, for paging through the trend list. Defaults to 0. |

Output fields:

- `tags`: Trending Hashtags
- `tags[].id`: Tag ID
- `tags[].name`: Name
- `tags[].url`: URL (url)
- `tags[].following`: Followed by Me (boolean)
- `tags[].featuring`: Featured on Profile (boolean)
- `tags[].history`: Daily Usage
- `tags[].history[].day`: Day (Unix Time)
- `tags[].history[].uses`: Uses
- `tags[].history[].accounts`: Accounts
- `count`: Count (number)

### `get_trending_statuses`

**Get Trending Statuses.** Returns statuses currently trending on the connected server (most interacted-with). Servers can disable trends, in which case the list is empty. Use offset to page. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of statuses to return in this page. Defaults to 20, maximum 40. |
| `offset` | number | no |  | Offset. Number of results to skip, for paging through the trend list. Defaults to 0. |

Output fields:

- `statuses`: Trending Statuses
- `statuses[].id`: Status ID
- `statuses[].created_at`: Created At (datetime)
- `statuses[].url`: URL (url)
- `statuses[].uri`: ActivityPub URI (url)
- `statuses[].content`: Content (html)
- `statuses[].spoiler_text`: Content Warning
- `statuses[].sensitive`: Sensitive (boolean)
- `statuses[].visibility`: Visibility
- `statuses[].language`: Language
- `statuses[].in_reply_to_id`: In Reply To Status ID
- `statuses[].in_reply_to_account_id`: In Reply To Account ID
- `statuses[].replies_count`: Replies (number)
- `statuses[].reblogs_count`: Boosts (number)
- `statuses[].favourites_count`: Favourites (number)
- `statuses[].edited_at`: Edited At (datetime)
- `statuses[].account`: Author
- `statuses[].account.id`: Account ID
- `statuses[].account.username`: Username
- `statuses[].account.acct`: Handle
- `statuses[].account.display_name`: Display Name
- `statuses[].account.url`: Profile URL (url)
- `statuses[].account.avatar`: Avatar (image)
- `statuses[].account.bot`: Bot (boolean)
- `statuses[].media_attachments`: Media Attachments
- `statuses[].media_attachments[].id`: Media ID
- `statuses[].media_attachments[].type`: Type
- `statuses[].media_attachments[].url`: URL (url)
- `statuses[].media_attachments[].preview_url`: Preview (image)
- `statuses[].media_attachments[].remote_url`: Remote URL (url)
- `statuses[].media_attachments[].description`: Alt Text
- `statuses[].media_attachments[].meta`: Metadata
- `statuses[].media_attachments[].meta.original`: Original
- `statuses[].media_attachments[].meta.original.width`: Width (number)
- `statuses[].media_attachments[].meta.original.height`: Height (number)
- `statuses[].media_attachments[].meta.focus`: Focal Point
- `statuses[].media_attachments[].meta.focus.x`: X (number)
- `statuses[].media_attachments[].meta.focus.y`: Y (number)
- `statuses[].mentions`: Mentions
- `statuses[].mentions[].id`: Account ID
- `statuses[].mentions[].username`: Username
- `statuses[].mentions[].acct`: Handle
- `statuses[].mentions[].url`: Profile URL (url)
- `statuses[].tags`: Hashtags
- `statuses[].tags[].name`: Name
- `statuses[].tags[].url`: URL (url)
- `statuses[].poll`: Poll
- `statuses[].poll.id`: Poll ID
- `statuses[].poll.expires_at`: Expires At (datetime)
- `statuses[].poll.expired`: Expired (boolean)
- `statuses[].poll.multiple`: Multiple Choice (boolean)
- `statuses[].poll.votes_count`: Votes (number)
- `statuses[].poll.voters_count`: Voters (number)
- `statuses[].poll.voted`: Voted (boolean)
- `statuses[].poll.own_votes`: Own Votes (Option Indexes)
- `statuses[].poll.options`: Options
- `statuses[].poll.options[].title`: Title
- `statuses[].poll.options[].votes_count`: Votes (number)
- `statuses[].card`: Link Preview
- `statuses[].card.url`: URL (url)
- `statuses[].card.title`: Title
- `statuses[].card.description`: Description
- `statuses[].card.type`: Type
- `statuses[].card.language`: Language
- `statuses[].card.provider_name`: Provider
- `statuses[].card.author_name`: Author
- `statuses[].card.image`: Image (image)
- `statuses[].card.published_at`: Published At (datetime)
- `statuses[].favourited`: Favourited by Me (boolean)
- `statuses[].reblogged`: Boosted by Me (boolean)
- `statuses[].bookmarked`: Bookmarked by Me (boolean)
- `statuses[].muted`: Conversation Muted (boolean)
- `statuses[].pinned`: Pinned to Profile (boolean)
- `statuses[].reblog`: Boosted Status
- `statuses[].reblog.id`: Status ID
- `statuses[].reblog.created_at`: Created At (datetime)
- `statuses[].reblog.url`: URL (url)
- `statuses[].reblog.uri`: ActivityPub URI (url)
- `statuses[].reblog.content`: Content (html)
- `statuses[].reblog.spoiler_text`: Content Warning
- `statuses[].reblog.sensitive`: Sensitive (boolean)
- `statuses[].reblog.visibility`: Visibility
- `statuses[].reblog.language`: Language
- `statuses[].reblog.in_reply_to_id`: In Reply To Status ID
- `statuses[].reblog.in_reply_to_account_id`: In Reply To Account ID
- `statuses[].reblog.replies_count`: Replies (number)
- `statuses[].reblog.reblogs_count`: Boosts (number)
- `statuses[].reblog.favourites_count`: Favourites (number)
- `statuses[].reblog.edited_at`: Edited At (datetime)
- `statuses[].reblog.account`: Author
- `statuses[].reblog.account.id`: Account ID
- `statuses[].reblog.account.username`: Username
- `statuses[].reblog.account.acct`: Handle
- `statuses[].reblog.account.display_name`: Display Name
- `statuses[].reblog.account.url`: Profile URL (url)
- `statuses[].reblog.account.avatar`: Avatar (image)
- `statuses[].reblog.account.bot`: Bot (boolean)
- `statuses[].reblog.media_attachments`: Media Attachments
- `statuses[].reblog.media_attachments[].id`: Media ID
- `statuses[].reblog.media_attachments[].type`: Type
- `statuses[].reblog.media_attachments[].url`: URL (url)
- `statuses[].reblog.media_attachments[].preview_url`: Preview (image)
- `statuses[].reblog.media_attachments[].remote_url`: Remote URL (url)
- `statuses[].reblog.media_attachments[].description`: Alt Text
- `statuses[].reblog.media_attachments[].meta`: Metadata
- `statuses[].reblog.media_attachments[].meta.original`: Original
- `statuses[].reblog.media_attachments[].meta.original.width`: Width (number)
- `statuses[].reblog.media_attachments[].meta.original.height`: Height (number)
- `statuses[].reblog.media_attachments[].meta.focus`: Focal Point
- `statuses[].reblog.media_attachments[].meta.focus.x`: X (number)
- `statuses[].reblog.media_attachments[].meta.focus.y`: Y (number)
- `statuses[].reblog.mentions`: Mentions
- `statuses[].reblog.mentions[].id`: Account ID
- `statuses[].reblog.mentions[].username`: Username
- `statuses[].reblog.mentions[].acct`: Handle
- `statuses[].reblog.mentions[].url`: Profile URL (url)
- `statuses[].reblog.tags`: Hashtags
- `statuses[].reblog.tags[].name`: Name
- `statuses[].reblog.tags[].url`: URL (url)
- `statuses[].reblog.poll`: Poll
- `statuses[].reblog.poll.id`: Poll ID
- `statuses[].reblog.poll.expires_at`: Expires At (datetime)
- `statuses[].reblog.poll.expired`: Expired (boolean)
- `statuses[].reblog.poll.multiple`: Multiple Choice (boolean)
- `statuses[].reblog.poll.votes_count`: Votes (number)
- `statuses[].reblog.poll.voters_count`: Voters (number)
- `statuses[].reblog.poll.voted`: Voted (boolean)
- `statuses[].reblog.poll.own_votes`: Own Votes (Option Indexes)
- `statuses[].reblog.poll.options`: Options
- `statuses[].reblog.poll.options[].title`: Title
- `statuses[].reblog.poll.options[].votes_count`: Votes (number)
- `statuses[].reblog.card`: Link Preview
- `statuses[].reblog.card.url`: URL (url)
- `statuses[].reblog.card.title`: Title
- `statuses[].reblog.card.description`: Description
- `statuses[].reblog.card.type`: Type
- `statuses[].reblog.card.language`: Language
- `statuses[].reblog.card.provider_name`: Provider
- `statuses[].reblog.card.author_name`: Author
- `statuses[].reblog.card.image`: Image (image)
- `statuses[].reblog.card.published_at`: Published At (datetime)
- `statuses[].application`: Posted With
- `statuses[].application.name`: App Name
- `statuses[].application.website`: App Website (url)
- `count`: Count (number)

### `get_trending_links`

**Get Trending Links.** Returns links (news articles and pages) currently shared the most on the connected server, with preview card details. Servers can disable trends, in which case the list is empty. Use offset to page. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of links to return in this page. Defaults to 10, maximum 20. |
| `offset` | number | no |  | Offset. Number of results to skip, for paging through the trend list. Defaults to 0. |

Output fields:

- `links`: Trending Links
- `links[].url`: URL (url)
- `links[].title`: Title
- `links[].description`: Description
- `links[].type`: Type
- `links[].language`: Language
- `links[].provider_name`: Provider
- `links[].author_name`: Author
- `links[].image`: Image (image)
- `links[].published_at`: Published At (datetime)
- `links[].history`: Daily Usage
- `links[].history[].day`: Day (Unix Time)
- `links[].history[].uses`: Uses
- `links[].history[].accounts`: Accounts
- `count`: Count (number)

### `get_instance_info`

**Get Instance Info.** Returns information about the connected Mastodon server: version, API versions, character limit, media and poll limits, registration and contact details. Use it to check limits before posting or to see whether a newer endpoint is supported. Requires Mastodon 4.0 or later. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `domain`: Domain
- `title`: Title
- `version`: Mastodon Version
- `description`: Description
- `source_url`: Source Code URL (url)
- `languages`: Languages
- `usage`: Usage
- `usage.users`: Users
- `usage.users.active_month`: Monthly Active Users (number)
- `thumbnail`: Thumbnail
- `thumbnail.url`: URL (image)
- `configuration`: Configuration
- `configuration.statuses`: Statuses
- `configuration.statuses.max_characters`: Max Characters (number)
- `configuration.statuses.max_media_attachments`: Max Media Attachments (number)
- `configuration.statuses.characters_reserved_per_url`: Characters per URL (number)
- `configuration.media_attachments`: Media Attachments
- `configuration.media_attachments.image_size_limit`: Image Size Limit (filesize)
- `configuration.media_attachments.video_size_limit`: Video Size Limit (filesize)
- `configuration.media_attachments.description_limit`: Alt Text Limit (number)
- `configuration.media_attachments.supported_mime_types`: Supported MIME Types
- `configuration.polls`: Polls
- `configuration.polls.max_options`: Max Options (number)
- `configuration.polls.max_characters_per_option`: Max Characters per Option (number)
- `configuration.polls.min_expiration`: Min Duration (Seconds) (number)
- `configuration.polls.max_expiration`: Max Duration (Seconds) (number)
- `configuration.translation`: Translation
- `configuration.translation.enabled`: Enabled (boolean)
- `registrations`: Registrations
- `registrations.enabled`: Open (boolean)
- `registrations.approval_required`: Approval Required (boolean)
- `registrations.min_age`: Minimum Age (number)
- `contact`: Contact
- `contact.email`: Email (email)
- `contact.account`: Account
- `contact.account.id`: Account ID
- `contact.account.username`: Username
- `contact.account.acct`: Handle
- `contact.account.display_name`: Display Name
- `contact.account.url`: Profile URL (url)
- `contact.account.avatar`: Avatar (image)
- `contact.account.bot`: Bot (boolean)
- `rules`: Rules
- `rules[].id`: Rule ID
- `rules[].text`: Text
- `rules[].hint`: Hint

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

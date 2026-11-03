# Twitter

Post tweets and replies on X, formerly Twitter.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-twitter'
  version: '0.5.1'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To connect, create keys for your app in the X Developer Portal:
>
> 1. Open the [X Developer Portal](https://developer.x.com/en/portal/projects-and-apps) and select your app. It must belong to a Project.
> 2. On the **Settings** tab, under **User authentication settings**, click **Set up**. Choose **Read and write** for App permissions and **Native App** for Type of App, enter your website URL, and set the Callback URI to that URL followed by `/redirect`.
> 3. On the **Keys and tokens** tab, regenerate **API Key and Secret** and **Access Token and Secret**, and paste the four values below.
>
> Do step 2 before step 3: an Access Token generated earlier keeps the old permission level.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `consumerKey` | string | yes |  | API Key. Found under Keys and tokens, next to API Key and Secret. |
| `consumerSecret` | string | yes |  | API Key Secret. Found under Keys and tokens, next to API Key and Secret. |
| `accessToken` | string | yes |  | Access Token. Found under Keys and tokens, next to Access Token and Secret. |
| `accessTokenSecret` | string | yes |  | Access Token Secret. Found under Keys and tokens, next to Access Token and Secret. |

## Actions

### `create-tweet`

**Create Tweet.** Posts a new tweet to the authenticated X/Twitter account, optionally attaching up to three images. Use this to publish a standalone post (not a reply). Tweet text is required and must be non-empty; this is not idempotent, so each call publishes a separate new tweet. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `text` | string | yes |  | Text. Up to 280 characters, or more with X Premium. |
| `image_1` | file | no |  | Media 1. An image, GIF or video. Add more images under Advanced. Files are not supported; an action that needs one fails. |
| `image_2` | file | no |  | Media 2. Another image. GIFs and videos must be posted alone. Files are not supported; an action that needs one fails. |
| `image_3` | file | no |  | Media 3. Another image. GIFs and videos must be posted alone. Files are not supported; an action that needs one fails. |

### `create-reply`

**Create Reply.** Posts a reply to an existing tweet on X/Twitter, optionally attaching up to three images. Use this when responding to a specific tweet rather than creating a standalone post; requires the target tweet ID and non-empty reply text. Not idempotent — each call publishes a separate new reply. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tweet_id` | string | yes |  | Tweet ID. The number at the end of the tweet's link, after /status/. |
| `text` | string | yes |  | Text. Up to 280 characters, or more with X Premium. |
| `image_1` | file | no |  | Media 1. An image, GIF or video. Add more images under Advanced. Files are not supported; an action that needs one fails. |
| `image_2` | file | no |  | Media 2. Another image. GIFs and videos must be posted alone. Files are not supported; an action that needs one fails. |
| `image_3` | file | no |  | Media 3. Another image. GIFs and videos must be posted alone. Files are not supported; an action that needs one fails. |

### `x_get_authenticated_user`

**Get Authenticated User.** Retrieve the profile of the X account this connection authenticates as, including its numeric id, @handle, bio and follower counts. Use it to confirm which X account a connection belongs to, or to read the follower, following and post counts for that account. It only ever returns the connected account and takes no input, so it cannot look up any other user. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `data`: Account
- `data.id`: User ID
- `data.username`: Username
- `data.name`: Display Name
- `data.description`: Bio
- `data.created_at`: Created At (datetime)
- `data.profile_image_url`: Profile Image (image)
- `data.verified`: Verified (boolean)
- `data.public_metrics`: Public Metrics
- `data.public_metrics.followers_count`: Followers (number)
- `data.public_metrics.following_count`: Following (number)
- `data.public_metrics.tweet_count`: Posts (number)
- `data.public_metrics.listed_count`: Listed In (number)
- `data.public_metrics.like_count`: Likes Given (number)
- `data.public_metrics.media_count`: Media Posted (number)

# Beamer

Engage users with targeted announcements

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-beamer'
  version: '0.2.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> API key acquired from your Beamer settings

## Actions

### `create_beamer_post`

**Create Beamer Post .** Publishes a new announcement post to a Beamer account, attributed to a user by email and tagged with a category (new, fix, coming soon, announcement, or improvement). Use to broadcast product news or changelog entries to users. Creates a distinct post on each call (not idempotent). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes | `"Post name"` | Title. Enter the Title of the post. |
| `description` | string | yes | `"desc..."` | Description. Enter the description of the post. |
| `category` | string | yes |  | Category. Set Category. One of `"new"`, `"fix"`, `"coming_soon"`, `"announcement"`, `"improvement"`. |
| `showInWidget` | string | no |  | Show In Widget . Check to enable widget. One of `true`, `false`. |
| `showInStandalone` | string | no |  | Show In Standalone  . Check to enable Standalone. One of `true`, `false`. |
| `enableFeedback` | boolean | no | `false` | Enable Feedback. Check to enable feedback. |
| `enableReactions` | boolean | no | `false` | Enable Reactions. Check to enable feedback. |
| `enableSocialShare` | boolean | no | `false` | Enable Social share. Check to enable social share. |
| `autoOpen` | boolean | no | `false` | Enable Auto open. Check to enable auto open. |
| `sendPushNotification` | boolean | no | `false` | Enable Push Notifications. Check to enable Push Notifications. |
| `userEmail` | string | yes |  | User Email. Enter user email. |

### `create_new_feature_request`

**Create New Feature Request .** Creates a feature request on a Beamer feedback board, attributed to a user by email, with a category (bug, feature request, or improvement), a status (under review, planned, in progress, or completed), and public or internal visibility. Use to log product feedback or roadmap items. Creates a new request on each call (not idempotent). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. Enter the Title of the post. |
| `content` | string | yes |  | Description. Enter the description of the post. |
| `visible` | string | yes |  | Visibility. Set visiblisty. One of `true`, `false`. |
| `category` | string | yes |  | Category. Set Category. One of `"bug"`, `"feature_request"`, `"improvement"`. |
| `status` | string | yes |  | Status. Set status. One of `"under_review"`, `"planned"`, `"in_progress"`, `"completed"`. |
| `requestedby` | string | yes |  | User Email. Feature requested by.. |

### `create_new_comment`

**Create a new comment.** Posts a comment on an existing Beamer feature request, identified by its numeric feature request ID. Optionally attributes the comment to a user via user ID or email. Use to add discussion or replies to a feedback item. Appends a new comment on each call (not idempotent). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `featureRequestId` | number | yes |  | ID. ID of the feature request. |
| `userId` | number | no |  | User ID. id of the user making the comment. |
| `text` | string | yes |  | Text. Content of your comment. |
| `userEmail` | string | no |  | User Email. Feature requested by.. |

### `create_vote`

**Create a new vote .** Casts a vote on an existing Beamer feature request, identified by its numeric feature request ID, optionally attributed to a voter by first name and email. Use to register user support for a feedback item. Records a vote on each call (not idempotent). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `featureRequestId` | number | yes |  | Feature ID. ID of the feature request to create a comment for. |
| `userFirstname` | string | no |  | User Firstname. Feature requested by.. |
| `userEmail` | string | no |  | User Email. Feature requested by.. |

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

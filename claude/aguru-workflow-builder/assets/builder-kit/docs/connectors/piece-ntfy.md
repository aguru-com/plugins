# ntfy

Notification management made easy

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-ntfy'
  version: '0.4.1'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To obtain a token:
>
> 1. Log in to your Ntfy instance.
> 2. Click on Account
> 3. Go under, on Access tokens and click on the button icon to copy your Token or CREATE ACCESS TOKEN if you do not have
> 4. Please pay attention to the expiration time when copying/creating a Token.
> 4. Copy your access token & and paste them into the fields below.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_url` | string | yes |  | Server URL. Ntfy Instance URL. |
| `access_token` | string | no |  | Access Token. Ntfy Access Token. |

## Actions

### `send_notification`

**Send Notification.** Publishes a push notification to a ntfy topic using ntfy's header format, optionally with a title, priority, tags, icon, click URL, action buttons, attachment URL, Markdown, email, sequence ID or scheduled delay. Agents should prefer Publish Message (ntfy_publish_message), which takes typed fields. Not idempotent: each call sends a new notification. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topic` | string | yes |  | Topic. The topic/channel to send the notification to, e.g. test1. |
| `title` | string | no |  | Title. The title of the notification. |
| `message` | string | yes |  | Message. The message to send. |
| `priority` | string | no |  | Priority. The priority of the notification (1-5). 1 is lowest priority. |
| `tags` | array | no |  | Tags. The tags for the notification. |
| `icon` | string | no |  | Icon. The absolute URL to your icon, e.g. https://example.com/communityIcon_xnt6chtnr2j21.png. |
| `actions` | string | no |  | Actions. Add Action buttons to notifications, see https://docs.ntfy.sh/publish/#action-buttons. |
| `click` | string | no |  | Click. You can define which URL to open when a notification is clicked, see https://docs.ntfy.sh/publish/#click-action. |
| `delay` | string | no |  | Delay. Let ntfy send messages at a later date, e.g. 'tomorrow, 10am', see https://docs.ntfy.sh/publish/#scheduled-delivery. |
| `attach` | string | no |  | Attachment URL. Public URL of a file to attach, e.g. https://example.com/report.pdf. ntfy does not download it; the apps link to it. |
| `filename` | string | no |  | Attachment File Name. Name shown for the attachment, e.g. report.pdf. Only used together with an attachment. |
| `markdown` | boolean | no | `false` | Markdown. Render the message as Markdown (supported in the web app and on Android). |
| `email` | string | no |  | Email To. Also send the notification to this email address, e.g. jane@example.com. ntfy.sh allows 5 emails a day without an account; with an access token, ntfy.sh only sends to addresses verified in the account settings. |
| `call` | string | no |  | Phone Call To. Also read the message out in a phone call to this number, e.g. +12223334444, or "yes" for your first verified number. Needs a paid ntfy.sh plan (or a self-hosted server with Twilio) and a verified number. |
| `sequence_id` | string | no |  | Sequence ID. Your own ID for this notification, e.g. backup-job-42, so later steps can update, clear or delete it. Letters, digits, "-" and "_". Needs ntfy server v2.16.0+. |
| `cache` | string | no |  | Server Cache. Leave empty to let the server cache the message (default), so it can be fetched later. "Do not cache" delivers it only to clients connected right now. One of `"no"`. |
| `firebase` | string | no |  | Firebase. Leave empty to also push through Firebase (default, needed for instant delivery on Google Play Android apps). "Do not forward" skips Firebase. One of `"no"`. |

Output fields:

- `body.id`: Message ID
- `body.topic`: Topic
- `body.title`: Title
- `body.message`: Message
- `body.time`: Delivery Time
- `body.expires`: Expires
- `body.event`: Event
- `body.priority`: Priority (number)
- `body.tags`: Tags
- `body.click`: Click URL (url)
- `body.icon`: Icon (image)
- `body.actions`: Action Buttons
- `body.actions[].id`: Action ID
- `body.actions[].action`: Type
- `body.actions[].label`: Label
- `body.actions[].url`: URL (url)
- `body.actions[].clear`: Clear Notification (boolean)
- `body.sequence_id`: Sequence ID
- `body.content_type`: Content Type
- `body.attachment`: Attachment
- `body.attachment.name`: File Name
- `body.attachment.url`: URL (url)

### `send_file`

**Send File.** Uploads a file from the flow to the ntfy server and publishes it as a notification attachment, with an optional message, title, priority, tags and click URL. Agents attaching a file by URL should use Publish Message with an attachment URL instead. Not idempotent: each call uploads the file again and sends a new notification. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topic` | string | yes |  | Topic. The topic name, e.g. backups_home. 1-64 characters: letters, digits, "-" and "_". Anyone who knows a public topic name can read it, so pick a hard-to-guess name. |
| `file` | file | yes |  | File. The file to attach, e.g. the output of a previous step. Files are not supported; an action that needs one fails. |
| `filename` | string | no |  | File Name. Name shown for the file, e.g. report.pdf. Defaults to the file's own name. |
| `message` | string | no |  | Message. Notification body, up to 4,096 bytes. Leave empty and ntfy shows "You received a file: <file name>". |
| `title` | string | no |  | Title. Optional notification title, e.g. "Backup finished". Defaults to the topic URL in the apps. |
| `priority` | string | no |  | Priority. How urgently the phone should alert. Leave empty for the default (3). One of `1`, `2`, `3`, `4`, `5`. |
| `tags` | array | no |  | Tags. Tags shown with the notification. Tags that match an emoji short code (e.g. warning, white_check_mark, rotating_light) are shown as that emoji. |
| `click` | string | no |  | Click URL. Web page or app link opened when the notification is tapped, e.g. https://example.com/orders/42. |
| `delay` | string | no |  | Delay. Schedule delivery for later: a duration (30m, 2h, 1 day), a Unix timestamp or natural language like 'tomorrow, 10am'. Between 10 seconds and 3 days on default servers. |

Output fields:

- `id`: Message ID
- `topic`: Topic
- `title`: Title
- `message`: Message
- `time`: Delivery Time
- `expires`: Expires
- `event`: Event
- `priority`: Priority (number)
- `tags`: Tags
- `click`: Click URL (url)
- `attachment`: Attachment
- `attachment.name`: File Name
- `attachment.url`: URL (url)
- `attachment.type`: MIME Type
- `attachment.size`: Size (filesize)
- `attachment.expires`: Expires

### `update_notification`

**Update Notification.** Replaces an earlier notification on subscribed phones and web apps by publishing a new message with the same sequence ID; if the original is still scheduled, the server deletes it and schedules this one instead. The new message fully replaces the old one, so resend every field that should stay (title, tags, priority). Use for progress or status updates; use Publish Message for a new alert. Needs ntfy server v2.16.0+. Not idempotent: each call appends a new message to the topic. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topic` | string | yes |  | Topic. The topic name, e.g. backups_home. 1-64 characters: letters, digits, "-" and "_". Anyone who knows a public topic name can read it, so pick a hard-to-guess name. |
| `sequence_id` | string | yes |  | Sequence ID. The notification to replace: the Message ID returned when it was sent, or the Sequence ID you gave it, e.g. backup-job-42. |
| `message` | string | yes |  | Message. The new notification body, up to 4,096 bytes, e.g. "Download 50% done". |
| `title` | string | no |  | Title. Optional notification title, e.g. "Backup finished". Defaults to the topic URL in the apps. |
| `priority` | string | no |  | Priority. How urgently the phone should alert. Leave empty for the default (3). One of `1`, `2`, `3`, `4`, `5`. |
| `tags` | array | no |  | Tags. Tags shown with the notification. Tags that match an emoji short code (e.g. warning, white_check_mark, rotating_light) are shown as that emoji. |
| `click` | string | no |  | Click URL. Web page or app link opened when the notification is tapped, e.g. https://example.com/orders/42. |
| `icon` | string | no |  | Icon URL. URL of a JPEG or PNG image used as the notification icon, e.g. https://example.com/icon.png. |
| `attach` | string | no |  | Attachment URL. Public URL of a file to attach, e.g. https://example.com/report.pdf. ntfy does not download it; the apps link to it. |
| `filename` | string | no |  | Attachment File Name. Name shown for the attachment, e.g. report.pdf. Only used together with an attachment. |
| `markdown` | boolean | no | `false` | Markdown. Render the message as Markdown (supported in the web app and on Android). |
| `actions` | JSON | no |  | Action Buttons. Up to 3 buttons as a JSON array, e.g. [{"action":"view","label":"Open","url":"https://example.com"}]. Types: view, http, broadcast, copy. See https://docs.ntfy.sh/publish/#action-buttons. |
| `delay` | string | no |  | Delay. Schedule delivery for later: a duration (30m, 2h, 1 day), a Unix timestamp or natural language like 'tomorrow, 10am'. Between 10 seconds and 3 days on default servers. |

Output fields:

- `id`: Message ID
- `topic`: Topic
- `title`: Title
- `message`: Message
- `time`: Delivery Time
- `expires`: Expires
- `event`: Event
- `priority`: Priority (number)
- `tags`: Tags
- `click`: Click URL (url)
- `icon`: Icon (image)
- `actions`: Action Buttons
- `actions[].id`: Action ID
- `actions[].action`: Type
- `actions[].label`: Label
- `actions[].url`: URL (url)
- `actions[].clear`: Clear Notification (boolean)
- `sequence_id`: Sequence ID
- `content_type`: Content Type
- `attachment`: Attachment
- `attachment.name`: File Name
- `attachment.url`: URL (url)

### `clear_notification`

**Clear Notification.** Marks a delivered notification as read and dismisses it from the notification drawer on subscribed clients, keeping it in their history. Use Delete Notification to remove it entirely or cancel a scheduled one. Needs ntfy server v2.16.0+; ntfy accepts any valid sequence ID, so a wrong ID is not reported. Idempotent: repeating it leaves the notification cleared. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topic` | string | yes |  | Topic. The topic name, e.g. backups_home. 1-64 characters: letters, digits, "-" and "_". Anyone who knows a public topic name can read it, so pick a hard-to-guess name. |
| `sequence_id` | string | yes |  | Sequence ID. The notification to clear: the Message ID returned when it was sent, or the Sequence ID you gave it, e.g. backup-job-42. |

Output fields:

- `id`: Event ID
- `sequence_id`: Sequence ID
- `topic`: Topic
- `event`: Event
- `time`: Time
- `expires`: Expires

### `delete_notification`

**Delete Notification.** Deletes a notification by sequence ID: a scheduled message is removed from the server and never delivered, and a delivered one is removed from subscribed clients. Use Clear Notification to only mark it read. Needs ntfy server v2.16.0+; ntfy accepts any valid sequence ID, so a wrong ID is not reported. Idempotent: repeating it leaves the notification deleted. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topic` | string | yes |  | Topic. The topic name, e.g. backups_home. 1-64 characters: letters, digits, "-" and "_". Anyone who knows a public topic name can read it, so pick a hard-to-guess name. |
| `sequence_id` | string | yes |  | Sequence ID. The notification to delete or cancel: the Message ID returned when it was sent, or the Sequence ID you gave it, e.g. reminder-42. |

Output fields:

- `id`: Event ID
- `sequence_id`: Sequence ID
- `topic`: Topic
- `event`: Event
- `time`: Time
- `expires`: Expires

### `fetch_messages`

**Fetch Messages.** Reads cached messages from one or more ntfy topics, newest first, optionally only since a duration, Unix timestamp or message ID, and filtered by priority, tags, exact title or exact message. "latest" returns only the newest entry, which is dropped when it is a clear/delete event and those are not included. Use to look back at what was sent; use List Scheduled Messages for pending ones. Only works while the server caches messages (12 hours on ntfy.sh); ntfy.sh writes its cache in batches, so a message published 1-3 seconds earlier may not be returned yet. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topics` | string | yes |  | Topics. One topic, or several separated by commas, e.g. alerts,backups_home. Letters, digits, "-" and "_" only. |
| `since` | string | no | `"12h"` | Since. How far back to read: a duration (2h), a Unix timestamp, a message ID (messages after it), "latest" or "all". Defaults to 12h. |
| `priority` | array | no |  | Priority Filter. Only return messages with any of these priorities. Leave empty for all. One of `1`, `2`, `3`, `4`, `5`. |
| `tags` | array | no |  | Tags Filter. Only return messages that have all of these tags, e.g. backup. |
| `title` | string | no |  | Title Filter. Only return messages whose title is exactly this text. |
| `message` | string | no |  | Message Filter. Only return messages whose body is exactly this text. |
| `include_events` | boolean | no | `false` | Include Clear/Delete Events. Also return the message_clear and message_delete events created by Clear/Delete Notification. |
| `limit` | number | no | `100` | Limit. Maximum number of messages to return (newest first), 1-1000. Defaults to 100. |

Output fields:

- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].topic`: Topic
- `messages[].title`: Title
- `messages[].message`: Message
- `messages[].time`: Delivery Time
- `messages[].expires`: Expires
- `messages[].event`: Event
- `messages[].priority`: Priority (number)
- `messages[].tags`: Tags
- `messages[].click`: Click URL (url)
- `messages[].icon`: Icon (image)
- `messages[].actions`: Action Buttons
- `messages[].actions[].id`: Action ID
- `messages[].actions[].action`: Type
- `messages[].actions[].label`: Label
- `messages[].actions[].url`: URL (url)
- `messages[].actions[].clear`: Clear Notification (boolean)
- `messages[].sequence_id`: Sequence ID
- `messages[].content_type`: Content Type
- `messages[].attachment`: Attachment
- `messages[].attachment.name`: File Name
- `messages[].attachment.url`: URL (url)
- `messages[].attachment.type`: MIME Type
- `messages[].attachment.size`: Size (filesize)
- `messages[].attachment.expires`: Expires
- `count`: Count (number)
- `total_matched`: Total Matched (number)
- `has_more`: Has More (boolean)
- `server_truncated`: Server Truncated (boolean)

### `list_scheduled_messages`

**List Scheduled Messages.** Lists the messages on one or more ntfy topics that were published with a delay and are still waiting to be delivered, soonest first. Use before cancelling one with Delete Notification or replacing it with Update Notification; use Fetch Messages for delivered ones. ntfy.sh writes its cache in batches, so a message scheduled 1-3 seconds earlier may not be listed yet. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topics` | string | yes |  | Topics. One topic, or several separated by commas, e.g. alerts,backups_home. Letters, digits, "-" and "_" only. |

Output fields:

- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].topic`: Topic
- `messages[].title`: Title
- `messages[].message`: Message
- `messages[].time`: Delivery Time
- `messages[].expires`: Expires
- `messages[].event`: Event
- `messages[].priority`: Priority (number)
- `messages[].tags`: Tags
- `messages[].click`: Click URL (url)
- `messages[].icon`: Icon (image)
- `messages[].actions`: Action Buttons
- `messages[].actions[].id`: Action ID
- `messages[].actions[].action`: Type
- `messages[].actions[].label`: Label
- `messages[].actions[].url`: URL (url)
- `messages[].actions[].clear`: Clear Notification (boolean)
- `messages[].sequence_id`: Sequence ID
- `messages[].content_type`: Content Type
- `messages[].attachment`: Attachment
- `messages[].attachment.name`: File Name
- `messages[].attachment.url`: URL (url)
- `messages[].attachment.type`: MIME Type
- `messages[].attachment.size`: Size (filesize)
- `messages[].attachment.expires`: Expires
- `count`: Count (number)
- `server_truncated`: Server Truncated (boolean)

### `ntfy_publish_message`

**Publish Message.** Publishes a push notification to one ntfy topic as JSON: message, title, priority 1-5, tags, click URL, icon, attachment URL, Markdown, up to 3 action buttons, email or phone-call forwarding, a scheduled delay (not combinable with email or disable_cache), and an optional sequence_id for later update/clear/delete. Use this to alert someone; use Update Notification to change one already sent. Not idempotent: each call publishes a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topic` | string | yes |  | Topic. The topic name, e.g. backups_home. 1-64 characters: letters, digits, "-" and "_". Anyone who knows a public topic name can read it, so pick a hard-to-guess name. |
| `message` | string | no |  | Message. Notification body, up to 4,096 bytes, e.g. "Backup finished in 4m 12s". ntfy uses "triggered" when empty (or "You received a file: <name>" with an attachment). |
| `title` | string | no |  | Title. Optional notification title, e.g. "Backup finished". Defaults to the topic URL in the apps. |
| `priority` | number | no |  | Priority. Whole number 1 (min) to 5 (max, urgent). Leave empty for the default 3. |
| `tags` | array | no |  | Tags. Tags shown with the notification. Tags that match an emoji short code (e.g. warning, white_check_mark, rotating_light) are shown as that emoji. |
| `click` | string | no |  | Click URL. Web page or app link opened when the notification is tapped, e.g. https://example.com/orders/42. |
| `icon` | string | no |  | Icon URL. URL of a JPEG or PNG image used as the notification icon, e.g. https://example.com/icon.png. |
| `attach` | string | no |  | Attachment URL. Public URL of a file to attach, e.g. https://example.com/report.pdf. ntfy does not download it; the apps link to it. |
| `filename` | string | no |  | Attachment File Name. Name shown for the attachment, e.g. report.pdf. Only used together with an attachment. |
| `markdown` | boolean | no | `false` | Markdown. Render the message as Markdown (supported in the web app and on Android). |
| `actions` | JSON | no |  | Action Buttons. Up to 3 buttons as a JSON array, e.g. [{"action":"view","label":"Open","url":"https://example.com"}]. Types: view, http, broadcast, copy. See https://docs.ntfy.sh/publish/#action-buttons. |
| `delay` | string | no |  | Delay. Schedule delivery for later: a duration (30m, 2h, 1 day), a Unix timestamp or natural language like 'tomorrow, 10am'. Between 10 seconds and 3 days on default servers. |
| `email` | string | no |  | Email To. Also send the notification to this email address, e.g. jane@example.com. ntfy.sh allows 5 emails a day without an account; with an access token, ntfy.sh only sends to addresses verified in the account settings. |
| `call` | string | no |  | Phone Call To. Also read the message out in a phone call to this number, e.g. +12223334444, or "yes" for your first verified number. Needs a paid ntfy.sh plan (or a self-hosted server with Twilio) and a verified number. |
| `sequence_id` | string | no |  | Sequence ID. Your own ID for this notification, e.g. backup-job-42, so later steps can update, clear or delete it. Letters, digits, "-" and "_". Needs ntfy server v2.16.0+. |
| `disable_cache` | boolean | no | `false` | Do Not Cache. Deliver only to clients connected right now; the message cannot be fetched later. Cannot be combined with Delay. |
| `disable_firebase` | boolean | no | `false` | Do Not Forward to Firebase. Skip Firebase push (Google Play Android apps then only get it while connected). |

Output fields:

- `id`: Message ID
- `topic`: Topic
- `title`: Title
- `message`: Message
- `time`: Delivery Time
- `expires`: Expires
- `event`: Event
- `priority`: Priority (number)
- `tags`: Tags
- `click`: Click URL (url)
- `icon`: Icon (image)
- `actions`: Action Buttons
- `actions[].id`: Action ID
- `actions[].action`: Type
- `actions[].label`: Label
- `actions[].url`: URL (url)
- `actions[].clear`: Clear Notification (boolean)
- `sequence_id`: Sequence ID
- `content_type`: Content Type
- `attachment`: Attachment
- `attachment.name`: File Name
- `attachment.url`: URL (url)

### `ntfy_get_account`

**Get Account.** Returns the ntfy account the connection uses (or the anonymous visitor when there is no token): username, role, tier, daily limits and how much of each was used today, plus reserved topic names. Use to check remaining message/email quota or attachment size limits before publishing. Never returns tokens, emails or phone numbers. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `username`: Username
- `role`: Role
- `tier_code`: Tier Code
- `tier_name`: Tier Name
- `limits_basis`: Limits Based On
- `limits_messages`: Daily Message Limit (number)
- `limits_messages_expiry_duration`: Message Cache Duration (number)
- `limits_emails`: Daily Email Limit (number)
- `limits_calls`: Daily Call Limit (number)
- `limits_reservations`: Reserved Topic Limit (number)
- `limits_attachment_file_size`: Max Attachment Size (filesize)
- `limits_attachment_total_size`: Attachment Storage Limit (filesize)
- `limits_attachment_expiry_duration`: Attachment Expiry (number)
- `limits_attachment_bandwidth`: Daily Attachment Bandwidth (filesize)
- `stats_messages`: Messages Sent Today (number)
- `stats_messages_remaining`: Messages Remaining Today (number)
- `stats_emails`: Emails Sent Today (number)
- `stats_emails_remaining`: Emails Remaining Today (number)
- `stats_calls`: Calls Made Today (number)
- `stats_calls_remaining`: Calls Remaining Today (number)
- `stats_reservations`: Reserved Topics (number)
- `stats_reservations_remaining`: Reserved Topics Remaining (number)
- `stats_attachment_total_size`: Attachment Storage Used (filesize)
- `stats_attachment_total_size_remaining`: Attachment Storage Remaining (filesize)
- `reserved_topics`: Reserved Topics

### `ntfy_get_server_stats`

**Get Server Stats.** Returns server-wide statistics for the ntfy server on the connection: total messages published and the recent average messages per second. Use to gauge server load; use Get Account for this account's own quota. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `messages`: Messages Published (number)
- `messages_rate`: Messages per Second (number)

### `ntfy_check_server_health`

**Check Server Health.** Calls the ntfy server's health endpoint with the connection's credentials and reports whether it is healthy. Use to confirm a self-hosted server is reachable before publishing; an invalid access token makes it fail with HTTP 401. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `healthy`: Healthy (boolean)
- `server_url`: Server URL (url)

### `ntfy_get_attachment_info`

**Get Attachment Info.** Checks a file attachment that was uploaded to the ntfy server with a message (not attachment URLs) without downloading it, returning whether it still exists, its size and its download URL. Use before sharing an attachment link; uploaded files expire (3 hours by default). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_id` | string | yes |  | Message ID. ID of the message the file was uploaded with, e.g. TCZJOKUErDsd (the "id" returned by Send File). A trailing file extension such as .txt is ignored. |

Output fields:

- `message_id`: Message ID
- `exists`: Exists (boolean)
- `size_bytes`: Size (filesize)
- `content_type`: Content Type
- `url`: Download URL (url)

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

# Telegram Bot

Build chatbots for Telegram

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-telegram-bot'
  version: '0.9.1'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Bot Token

> **Authentication**:
>
> 1. Begin a conversation with the [Botfather](https://telegram.me/BotFather).
> 2. Type in "/newbot"
> 3. Choose a name for your bot
> 4. Choose a username for your bot.
> 5. Copy the token BotFather sends and paste it here.

## Actions

### `send_text_message`

**Send Text Message.** Posts a text message to a Telegram chat, group, or channel via the bot, addressed by chat_id (numeric id or @channelusername the bot can reach). Use to deliver notifications, replies, or alerts; supports Markdown/HTML formatting and inline keyboards. Not idempotent: each call sends a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat ID. Numeric chat ID, or @username for a public channel. |
| `format` | string | no | `"MarkdownV2"` | Format. How Telegram styles the text. One of `"MarkdownV2"`, `"HTML"`, `"None"`. |
| `message` | string | yes |  | Message. Up to 4096 characters. |
| `message_thread_id` | string | no |  | Topic ID. Post inside a topic of a forum group. Empty posts to the main chat. |
| `web_page_preview` | boolean | no | `false` | Disable Link Preview. Don't show a preview card for links in the message. |
| `disable_notification` | boolean | no | `false` | Disable Notification. Deliver without a sound. The message still arrives. |
| `protect_content` | boolean | no | `false` | Protect Content. Stop recipients from forwarding or saving the message. |
| `reply_to_message_id` | number | no |  | Reply To Message ID. Send as a reply to this message in the same chat. |
| `reply_markup` | JSON | no |  | Buttons. reply_markup JSON: an inline keyboard, reply keyboard or forced reply. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result.text`: Message Text
- `body.result.message_id`: Message ID
- `body.result.date`: Date (datetime)
- `body.result.chat`: Chat
- `body.result.chat.id`: Chat ID
- `body.result.chat.username`: Username
- `body.result.chat.first_name`: First Name
- `body.result.chat.last_name`: Last Name
- `body.result.chat.type`: Chat Type
- `body.result.from`: From
- `body.result.from.id`: Bot ID
- `body.result.from.username`: Username
- `body.result.from.first_name`: First Name
- `body.result.from.is_bot`: Is Bot (boolean)
- `status`: Status Code

### `send_media`

**Send Media.** Sends a single photo, video, sticker, or animated GIF to a Telegram chat, supplied either as an uploaded file or a previously uploaded Telegram file_id. Use when delivering one rich-media item with an optional caption; for multiple items in one album use Send Media Group. Not idempotent: each call posts a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat ID. Numeric chat ID, or @username for a public channel. |
| `media_type` | string | yes |  | Media Type. One of `"photo"`, `"video"`, `"sticker"`, `"animation"`. |
| `media` | object | no |  | File. An object whose fields depend on other inputs; the product shows them. |
| `format` | string | no | `"MarkdownV2"` | Format. How Telegram styles the text. One of `"MarkdownV2"`, `"HTML"`, `"None"`. |
| `message` | string | no |  | Caption. Up to 1024 characters. Not shown on stickers. |
| `message_thread_id` | string | no |  | Topic ID. Post inside a topic of a forum group. Empty posts to the main chat. |
| `disable_notification` | boolean | no | `false` | Disable Notification. Deliver without a sound. The message still arrives. |
| `protect_content` | boolean | no | `false` | Protect Content. Stop recipients from forwarding or saving the message. |
| `reply_markup` | JSON | no |  | Buttons. reply_markup JSON: an inline keyboard, reply keyboard or forced reply. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result.message_id`: Message ID
- `body.result.date`: Date (datetime)
- `body.result.from`: From
- `body.result.from.first_name`: First Name
- `body.result.from.username`: Username
- `body.result.from.is_bot`: Is Bot (boolean)
- `body.result.from.id`: ID
- `body.result.chat`: Chat
- `body.result.chat.first_name`: First Name
- `body.result.chat.last_name`: Last Name
- `body.result.chat.username`: Username
- `body.result.chat.type`: Type
- `body.result.chat.id`: Chat ID
- `body.result.photo`: Photo
- `body.result.photo[].file_id`: File ID
- `body.result.photo[].file_unique_id`: File Unique ID
- `body.result.photo[].width`: Width (number)
- `body.result.photo[].height`: Height (number)
- `body.result.photo[].file_size`: File Size (filesize)

### `send_document`

**Send Document.** Uploads and sends a generic file (up to 50 MB) as a document to a Telegram chat, supplied as a file or a previously uploaded Telegram file_id. Use for arbitrary attachments (PDFs, archives, spreadsheets) rather than media shown inline. Not idempotent: each call sends a new document. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat ID. Numeric chat ID, or @username for a public channel. |
| `document` | file | no |  | Document. Any file type, up to 50 MB. Files are not supported; an action that needs one fails. |
| `document_id` | string | no |  | Document ID. file_id of a document already on Telegram, to send it again. |
| `format` | string | no | `"MarkdownV2"` | Format. How Telegram styles the text. One of `"MarkdownV2"`, `"HTML"`, `"None"`. |
| `caption` | string | no |  | Caption. Up to 1024 characters. |
| `message_thread_id` | string | no |  | Topic ID. Post inside a topic of a forum group. Empty posts to the main chat. |
| `disable_notification` | boolean | no | `false` | Disable Notification. Deliver without a sound. The message still arrives. |
| `protect_content` | boolean | no | `false` | Protect Content. Stop recipients from forwarding or saving the message. |
| `reply_to_message_id` | number | no |  | Reply To Message ID. Send as a reply to this message in the same chat. |
| `reply_markup` | JSON | no |  | Buttons. reply_markup JSON: an inline keyboard, reply keyboard or forced reply. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result.message_id`: Message ID
- `body.result.date`: Date (datetime)
- `body.result.chat`: Chat
- `body.result.chat.id`: Chat ID
- `body.result.chat.first_name`: First Name
- `body.result.chat.last_name`: Last Name
- `body.result.chat.username`: Username
- `body.result.chat.type`: Type
- `body.result.from`: From
- `body.result.from.id`: Bot ID
- `body.result.from.first_name`: First Name
- `body.result.from.username`: Username
- `body.result.from.is_bot`: Is Bot (boolean)
- `body.result.document`: Document
- `body.result.document.file_name`: File Name
- `body.result.document.mime_type`: MIME Type
- `body.result.document.file_size`: File Size (filesize)
- `body.result.document.file_id`: File ID
- `body.result.document.file_unique_id`: File Unique ID

### `send_audio`

**Send Audio.** Sends an audio file (.MP3/.M4A) to a Telegram chat where it appears in the music player, supplied as a file or a previously uploaded file_id, with optional performer and track title. Use for music or audio tracks; for raw file attachments use Send Document. Not idempotent: each call sends a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat ID. Numeric chat ID, or @username for a public channel. |
| `audio` | file | no |  | Audio. An MP3 or M4A file. Files are not supported; an action that needs one fails. |
| `audio_id` | string | no |  | Audio ID. file_id of audio already on Telegram, to send it again. |
| `format` | string | no | `"MarkdownV2"` | Format. How Telegram styles the text. One of `"MarkdownV2"`, `"HTML"`, `"None"`. |
| `caption` | string | no |  | Caption. Up to 1024 characters. |
| `title` | string | no |  | Title. Track name shown in the player. |
| `performer` | string | no |  | Performer. Artist name shown in the player. |
| `duration` | number | no |  | Duration. Length in seconds. |
| `message_thread_id` | string | no |  | Topic ID. Post inside a topic of a forum group. Empty posts to the main chat. |
| `disable_notification` | boolean | no | `false` | Disable Notification. Deliver without a sound. The message still arrives. |
| `protect_content` | boolean | no | `false` | Protect Content. Stop recipients from forwarding or saving the message. |
| `reply_to_message_id` | number | no |  | Reply To Message ID. Send as a reply to this message in the same chat. |
| `reply_markup` | JSON | no |  | Buttons. reply_markup JSON: an inline keyboard, reply keyboard or forced reply. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result.message_id`: Message ID
- `body.result.date`: Sent Date (datetime)
- `body.result.audio`: Audio
- `body.result.audio.file_name`: File Name
- `body.result.audio.duration`: Duration (duration)
- `body.result.audio.mime_type`: MIME Type
- `body.result.audio.file_size`: File Size (filesize)
- `body.result.audio.file_id`: File ID
- `body.result.audio.file_unique_id`: File Unique ID
- `body.result.chat`: Chat
- `body.result.chat.id`: Chat ID
- `body.result.chat.first_name`: First Name
- `body.result.chat.last_name`: Last Name
- `body.result.chat.username`: Username
- `body.result.chat.type`: Type
- `body.result.from`: From
- `body.result.from.id`: Bot ID
- `body.result.from.first_name`: First Name
- `body.result.from.username`: Username
- `body.result.from.is_bot`: Is Bot (boolean)

### `send_location`

**Send Location.** Sends a point location given as latitude and longitude to a Telegram chat, optionally as a live location that updates for a set period. Use to share a place or track a moving position; both coordinates are required. Not idempotent: each call posts a new location message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat ID. Numeric chat ID, or @username for a public channel. |
| `latitude` | number | yes |  | Latitude. Between -90 and 90. |
| `longitude` | number | yes |  | Longitude. Between -180 and 180. |
| `horizontal_accuracy` | number | no |  | Horizontal Accuracy. Uncertainty radius in meters, 0 to 1500. |
| `live_period` | number | no |  | Live Period. Seconds, 60 to 86400. |
| `heading` | number | no |  | Heading. Degrees, 1 to 360. |
| `proximity_alert_radius` | number | no |  | Proximity Alert Radius. Alert distance in meters, 1 to 100000. |
| `message_thread_id` | string | no |  | Topic ID. Post inside a topic of a forum group. Empty posts to the main chat. |
| `disable_notification` | boolean | no | `false` | Disable Notification. Deliver without a sound. The message still arrives. |
| `protect_content` | boolean | no | `false` | Protect Content. Stop recipients from forwarding or saving the message. |
| `reply_to_message_id` | number | no |  | Reply To Message ID. Send as a reply to this message in the same chat. |
| `reply_markup` | JSON | no |  | Buttons. reply_markup JSON: an inline keyboard, reply keyboard or forced reply. |

Output fields:

- `body.ok`: Success (boolean)
- `body.result.message_id`: Message ID
- `body.result.date`: Sent Date (datetime)
- `body.result.location`: Location
- `body.result.location.latitude`: Latitude (number)
- `body.result.location.longitude`: Longitude (number)
- `body.result.chat`: Chat
- `body.result.chat.id`: Chat ID
- `body.result.chat.first_name`: First Name
- `body.result.chat.last_name`: Last Name
- `body.result.chat.username`: Username
- `body.result.chat.type`: Type
- `body.result.from`: From
- `body.result.from.id`: Bot ID
- `body.result.from.first_name`: First Name
- `body.result.from.username`: Username
- `body.result.from.is_bot`: Is Bot (boolean)

### `send_media_group`

**Send Media Group.** Sends 2–10 media items (each a public URL or a Telegram file_id) as a single grouped album to a chat. Use to post several photos/videos together; photo and video may be mixed, but audio-only and document-only groups cannot be combined with other types. Not idempotent: each call posts a new album. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat ID. Numeric chat ID, or @username for a public channel. |
| `media` | array | yes |  | Media. Photos and videos can mix. Audio and files go in albums of their own. Each item: { `type`, `media`, `caption`? }. |
| `parse_mode` | string | no | `"MarkdownV2"` | Caption Format. How Telegram styles the captions. One of `"MarkdownV2"`, `"HTML"`, `"None"`. |
| `message_thread_id` | string | no |  | Topic ID. Post inside a topic of a forum group. Empty posts to the main chat. |
| `disable_notification` | boolean | no | `false` | Disable Notification. Deliver without a sound. The message still arrives. |
| `protect_content` | boolean | no | `false` | Protect Content. Stop recipients from forwarding or saving the message. |
| `reply_to_message_id` | number | no |  | Reply To Message ID. Send as a reply to this message in the same chat. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result`: Messages
- `body.result[].message_id`: Message ID
- `body.result[].caption`: Caption
- `body.result[].media_group_id`: Media Group ID
- `body.result[].date`: Date (datetime)
- `body.result[].chat`: Chat
- `body.result[].chat.id`: Chat ID
- `body.result[].chat.first_name`: First Name
- `body.result[].chat.last_name`: Last Name
- `body.result[].chat.username`: Username
- `body.result[].chat.type`: Type
- `body.result[].from`: From
- `body.result[].from.id`: Bot ID
- `body.result[].from.first_name`: First Name
- `body.result[].from.username`: Username
- `body.result[].from.is_bot`: Is Bot (boolean)
- `body.result[].photo`: Photo Sizes
- `body.result[].photo[].file_id`: File ID
- `body.result[].photo[].file_unique_id`: File Unique ID
- `body.result[].photo[].width`: Width (number)
- `body.result[].photo[].height`: Height (number)
- `body.result[].photo[].file_size`: File Size (filesize)

### `send_poll`

**Send Poll.** Posts a native Telegram poll (regular or quiz) to a chat with 2–10 answer options. Use to collect votes or run a quiz; quiz polls require a correct_option_id and cannot allow multiple answers, and open_period and close_date are mutually exclusive. Not idempotent: each call creates a new poll. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat ID. Numeric chat ID, or @username for a public channel. |
| `question` | string | yes |  | Question. Up to 300 characters. |
| `options` | array | yes |  | Options. 2 to 10 answers, each up to 100 characters. |
| `type` | string | no | `"regular"` | Poll Type. One of `"regular"`, `"quiz"`. |
| `is_anonymous` | boolean | no | `true` | Anonymous. Hide who voted for what. |
| `allows_multiple_answers` | boolean | no | `false` | Allow Multiple Answers. Regular polls only. |
| `correct_option_id` | number | no |  | Correct Option. Position of the right answer, counting from 0. |
| `explanation` | string | no |  | Explanation. Shown after a wrong answer, up to 200 characters. |
| `explanation_parse_mode` | string | no | `"MarkdownV2"` | Explanation Format. How Telegram styles the explanation. One of `"MarkdownV2"`, `"HTML"`, `"None"`. |
| `open_period` | number | no |  | Open Period. Seconds the poll stays open, 5 to 600. |
| `close_date` | ISO date-time string | no |  | Close Date. When the poll closes, 5 to 600 seconds from now. |
| `is_closed` | boolean | no | `false` | Closed. Post the poll already closed, to show results. |
| `message_thread_id` | string | no |  | Topic ID. Post inside a topic of a forum group. Empty posts to the main chat. |
| `disable_notification` | boolean | no | `false` | Disable Notification. Deliver without a sound. The message still arrives. |
| `protect_content` | boolean | no | `false` | Protect Content. Stop recipients from forwarding or saving the message. |
| `reply_to_message_id` | number | no |  | Reply To Message ID. Send as a reply to this message in the same chat. |
| `reply_markup` | JSON | no |  | Buttons. reply_markup JSON: an inline keyboard, reply keyboard or forced reply. |

Output fields:

- `body.ok`: Success (boolean)
- `body.result`: Result
- `body.result.message_id`: Message ID
- `body.result.date`: Date (datetime)
- `body.result.chat`: Chat
- `body.result.chat.id`: Chat ID
- `body.result.chat.first_name`: First Name
- `body.result.chat.last_name`: Last Name
- `body.result.chat.username`: Username
- `body.result.chat.type`: Type
- `body.result.from`: From
- `body.result.from.id`: Bot ID
- `body.result.from.first_name`: First Name
- `body.result.from.username`: Username
- `body.result.from.is_bot`: Is Bot (boolean)
- `body.result.poll`: Poll
- `body.result.poll.question`: Question
- `body.result.poll.id`: Poll ID
- `body.result.poll.type`: Type
- `body.result.poll.total_voter_count`: Total Voter Count (number)
- `body.result.poll.is_closed`: Is Closed (boolean)
- `body.result.poll.is_anonymous`: Is Anonymous (boolean)
- `body.result.poll.allows_multiple_answers`: Allows Multiple Answers (boolean)
- `body.result.poll.allows_revoting`: Allows Revoting (boolean)
- `body.result.poll.options`: Options
- `body.result.poll.options[].text`: Text
- `body.result.poll.options[].persistent_id`: Option ID
- `body.result.poll.options[].voter_count`: Voter Count (number)

### `send_chat_action`

**Send Chat Action.** Broadcasts a transient activity status (such as typing or uploading photo) in a chat, shown for up to 5 seconds. Use just before a slower action to signal the bot is working; it sends no message and produces no persistent content. Not idempotent: each call re-broadcasts the status. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat ID. Numeric chat ID, or @username for a public channel. |
| `action` | string | yes | `"typing"` | Action. What the chat shows, e.g. typing or uploading a photo. One of `"typing"`, `"upload_photo"`, `"record_video"`, `"upload_video"`, `"record_voice"`, `"upload_voice"`, `"upload_document"`, `"choose_sticker"`, `"find_location"`, `"record_video_note"`, `"upload_video_note"`. |
| `message_thread_id` | string | no |  | Topic ID. Post inside a topic of a forum group. Empty posts to the main chat. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result`: Result (boolean)
- `status`: Status Code

### `edit_message_text`

**Edit Message Text.** Replaces the text of a message the bot already sent, identified either by chat_id + message_id or by inline_message_id (the two targeting modes are mutually exclusive). Use to update a status or correct a message in place rather than sending a new one. Not idempotent: Telegram rejects an edit whose text matches the current content. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | no |  | Chat ID. Numeric chat ID, or @username for a public channel. |
| `message_id` | number | no |  | Message ID. From the output of the step that sent it, or the trigger. |
| `inline_message_id` | string | no |  | Inline Message ID. For messages sent in inline mode. Replaces Chat ID and Message ID. |
| `format` | string | no | `"MarkdownV2"` | Format. How Telegram styles the text. One of `"MarkdownV2"`, `"HTML"`, `"None"`. |
| `text` | string | yes |  | New Text. Up to 4096 characters. Replaces the whole message. |
| `disable_web_page_preview` | boolean | no | `false` | Disable Link Preview. Don't show a preview card for links in the message. |
| `reply_markup` | JSON | no |  | Buttons. reply_markup JSON: an inline keyboard, reply keyboard or forced reply. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result`: Result
- `body.result.text`: Message Text
- `body.result.message_id`: Message ID
- `body.result.date`: Sent Date (datetime)
- `body.result.edit_date`: Edit Date (datetime)
- `body.result.from`: From
- `body.result.from.first_name`: First Name
- `body.result.from.username`: Username
- `body.result.from.id`: User ID
- `body.result.from.is_bot`: Is Bot (boolean)
- `body.result.chat`: Chat
- `body.result.chat.first_name`: First Name
- `body.result.chat.last_name`: Last Name
- `body.result.chat.username`: Username
- `body.result.chat.type`: Chat Type
- `body.result.chat.id`: Chat ID
- `status`: Status Code

### `delete_message`

**Delete Message.** Permanently removes a message from a chat, identified by chat_id and message_id. Use to clean up or retract content; the bot can only delete its own messages or any message in groups where it is an administrator. Idempotent in effect: the message ends up deleted regardless of how many times this runs with the same input. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat ID. Numeric chat ID, or @username for a public channel. |
| `message_id` | number | yes |  | Message ID. From the output of the step that sent it, or the trigger. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result`: Result (boolean)
- `status`: Status

### `forward_message`

**Forward Message.** Forwards an existing message from a source chat (from_chat_id) to a target chat (chat_id), preserving its original sender attribution. Use to relay content the bot can access between chats. Not idempotent: each call creates a new forwarded message in the target chat. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from_chat_id` | string | yes |  | From Chat ID. Chat the message is in, by ID or @username. |
| `message_id` | number | yes |  | Message ID. ID of the message in that chat. |
| `chat_id` | string | yes |  | Chat ID. Numeric chat ID, or @username for a public channel. |
| `message_thread_id` | string | no |  | Topic ID. Post inside a topic of a forum group. Empty posts to the main chat. |
| `disable_notification` | boolean | no | `false` | Disable Notification. Deliver without a sound. The message still arrives. |
| `protect_content` | boolean | no | `false` | Protect Content. Stop recipients from forwarding or saving the message. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result.text`: Message Text
- `body.result.message_id`: Message ID
- `body.result.date`: Date (datetime)
- `body.result.forward_date`: Forward Date (datetime)
- `body.result.chat`: Chat
- `body.result.chat.id`: Chat ID
- `body.result.chat.type`: Type
- `body.result.chat.username`: Username
- `body.result.chat.first_name`: First Name
- `body.result.chat.last_name`: Last Name
- `body.result.from`: From
- `body.result.from.id`: User ID
- `body.result.from.first_name`: First Name
- `body.result.from.username`: Username
- `body.result.from.is_bot`: Is Bot (boolean)
- `body.result.forward_from`: Forward From
- `body.result.forward_from.id`: User ID
- `body.result.forward_from.first_name`: First Name
- `body.result.forward_from.username`: Username
- `body.result.forward_from.is_bot`: Is Bot (boolean)
- `body.result.forward_origin`: Forward Origin
- `body.result.forward_origin.type`: Type
- `body.result.forward_origin.date`: Date (datetime)
- `body.result.forward_origin.sender_user`: Sender User
- `body.result.forward_origin.sender_user.id`: User ID
- `body.result.forward_origin.sender_user.first_name`: First Name
- `body.result.forward_origin.sender_user.username`: Username

### `pin_message`

**Pin Message.** Pins an existing message in a chat, identified by chat_id and message_id; the bot must be an administrator with pin rights. Use to highlight an announcement or important message. Idempotent: pinning an already-pinned message leaves it pinned with the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat ID. Numeric chat ID, or @username for a public channel. |
| `message_id` | number | yes |  | Message ID. From the output of the step that sent it, or the trigger. |
| `disable_notification` | boolean | no | `false` | Disable Notification. Pin without notifying chat members. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result`: Result (boolean)
- `status`: Status Code

### `unpin_message`

**Unpin Message.** Unpins a message in a chat; supply message_id to unpin a specific message, or leave it empty to unpin the most recent pinned message. The bot must be an administrator with pin rights. Idempotent: a message that is already unpinned stays unpinned. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat ID. Numeric chat ID, or @username for a public channel. |
| `message_id` | number | no |  | Message ID. Empty unpins the most recent pinned message. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result`: Result (boolean)
- `status`: Status Code

### `get_chat`

**Get Chat.** Looks up current details about a chat (title, description, type, photo, member count, etc.) by chat_id. Use to resolve or inspect a chat before acting on it; the bot must be a member of or have access to the chat. Idempotent: read-only lookup with no side effects. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat ID. Numeric chat ID, or @username for a public channel. |

Output fields:

- `ok`: Success (boolean)
- `result`: Chat
- `result.username`: Username
- `result.first_name`: First Name
- `result.last_name`: Last Name
- `result.type`: Chat Type
- `result.id`: Chat ID
- `result.max_reaction_count`: Max Reaction Count (number)
- `result.can_send_gift`: Can Send Gift (boolean)
- `result.active_usernames`: Active Usernames
- `result.accepted_gift_types`: Accepted Gift Types
- `result.accepted_gift_types.unlimited_gifts`: Unlimited Gifts (boolean)
- `result.accepted_gift_types.limited_gifts`: Limited Gifts (boolean)
- `result.accepted_gift_types.unique_gifts`: Unique Gifts (boolean)
- `result.accepted_gift_types.premium_subscription`: Premium Subscription (boolean)
- `result.accepted_gift_types.gifts_from_channels`: Gifts From Channels (boolean)

### `get_chat_member`

**Get Chat Member.** Looks up a specific user's membership in a chat by chat_id and user_id, returning their role and status (member, administrator, left, kicked, etc.). Use to check whether a user belongs to a chat or what permissions they hold before acting. Idempotent: read-only lookup with no side effects. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat ID. Numeric chat ID, or @username for a public channel. |
| `user_id` | string | yes |  | User ID. Numeric user ID, found in the trigger as message.from.id. |

Output fields:

- `ok`: OK (boolean)
- `result`: Member
- `result.status`: Status
- `result.user`: User
- `result.user.first_name`: First Name
- `result.user.last_name`: Last Name
- `result.user.username`: Username
- `result.user.id`: User ID
- `result.user.is_bot`: Is Bot (boolean)
- `result.user.language_code`: Language Code

### `get_file`

**Get File.** Resolves a Telegram file_id to its file metadata, and optionally downloads the file content as base64 when download is enabled. Use to retrieve files attached to messages the bot received. Idempotent: read/download with no side effects. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. The file_id of a photo, document or audio in a message. |
| `download` | boolean | no | `false` | Download File. Also return the content as base64. Telegram caps this at 20 MB. |

Output fields:

- `file_content_base64`: File Content (Base64)
- `file_info`: File Info
- `file_info.file_path`: File Path
- `file_info.file_size`: File Size (filesize)
- `file_info.file_id`: File ID
- `file_info.file_unique_id`: File Unique ID

### `create_invite_link`

**Create Invite Link.** Creates a new invite link for a chat by chat_id, optionally with a name, expiry, member limit, or join-request approval. Use to generate a shareable join link; the bot must be an administrator with invite rights. Not idempotent: each call mints a distinct new invite link. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat ID. Numeric chat ID, or @username for a public channel. |
| `name` | string | no |  | Link Name. Up to 32 characters, shown only to admins. |
| `expire_date` | ISO date-time string | no |  | Expiry Date. Empty means the link never expires. |
| `member_limit` | number | no |  | Member Limit. How many people can join with this link, 1 to 99999. |
| `creates_join_request` | boolean | no | `false` | Require Admin Approval. Admins approve each person who joins with the link. |

Output fields:

- `ok`: OK (boolean)
- `result.invite_link`: Invite Link (url)
- `result.name`: Name
- `result.creates_join_request`: Creates Join Request (boolean)
- `result.is_primary`: Is Primary (boolean)
- `result.is_revoked`: Is Revoked (boolean)
- `result.creator`: Creator
- `result.creator.first_name`: First Name
- `result.creator.username`: Username
- `result.creator.id`: Creator ID
- `result.creator.is_bot`: Is Bot (boolean)

### `answer_callback_query`

**Answer Callback Query.** Acknowledges a callback query raised when a user taps an inline keyboard button, identified by callback_query_id (from the trigger payload), optionally showing a toast or alert. Use to stop the button spinner and give feedback; a given query can only be answered once. Not idempotent: each call is a one-time response to that query. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `callback_query_id` | string | yes |  | Callback Query ID. callback_query.id from the New Update trigger. |
| `text` | string | no |  | Text. Up to 200 characters. Empty just stops the loading spinner. |
| `show_alert` | boolean | no | `false` | Show Alert. Show a pop-up the user must close, instead of a banner. |
| `url` | string | no |  | URL. Only a t.me link to your bot, or a game URL. |
| `cache_time` | number | no |  | Cache Time. Seconds Telegram may reuse this answer. Default 0. |

### `request_approval_message`

**Request Approval Message.** Sends a message with a single button linking to a confirmation page where the recipient chooses Approve or Disapprove, then pauses the flow until they respond and resumes with the decision. Use as a human approval gate before a sensitive downstream step. Not idempotent: each call sends a new message and opens a new pause/wait. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat ID. Numeric chat ID, or @username for a public channel. |
| `message` | string | yes |  | Message. Sent with a Review & Respond button that opens the approval page. |
| `parse_mode` | string | no | `"MarkdownV2"` | Format. How Telegram styles the text. One of `"MarkdownV2"`, `"HTML"`, `"None"`. |

Output fields:

- `approved`: Approved (boolean)
- `chatId`: Chat ID

### `telegram_answer_callback_query`

**Answer Callback Query.** Acknowledges a callback query raised when a user taps an inline keyboard button, identified by callback_query_id (from the callback-query trigger payload), optionally showing a toast or alert. Use to stop the button spinner and give feedback; a given query can be answered only once. Not idempotent: it is a one-time response to that query. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `callback_query_id` | string | yes |  | Callback Query Id. Unique identifier of the callback query. Available on callback_query.id in the New Callback Query trigger payload. |
| `text` | string | no |  | Text. Text shown to the user. If not specified, nothing is shown (the spinner is just stopped). |
| `show_alert` | boolean | no | `false` | Show Alert. If True, an alert dialog is shown instead of a notification at the top of the screen. |
| `url` | string | no |  | URL. URL that will be opened by the user. |
| `cache_time` | number | no |  | Cache Time (seconds). The maximum amount of time in seconds the result of the callback query may be cached client-side. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result`: Result (boolean)
- `status`: Status Code

### `telegram_create_invite_link`

**Create Invite Link.** Creates a new invite link for a chat by chat_id (a numeric id or @channelusername the bot can reach), optionally with a name, expiry, member limit, or join-request approval. Use to generate a shareable join link; the bot must be an administrator with invite rights. Not idempotent: each call mints a distinct new link (it does not reuse or revoke prior links). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat Id. Unique identifier for the target chat or username of the target channel (e.g. @channelusername). |
| `name` | string | no |  | Name. Name of the invite link (max 32 chars). |
| `expire_date` | ISO date-time string | no |  | Expire Date. Point in time when the link will expire. |
| `member_limit` | number | no |  | Member Limit. Maximum number of users that can be members of the chat simultaneously after joining via this invite link; 1-99999. |
| `creates_join_request` | boolean | no | `false` | Creates Join Request. If True, users joining the chat via the link need to be approved by chat administrators. |

Output fields:

- `ok`: OK (boolean)
- `result`: Invite Link
- `result.invite_link`: Invite Link (url)
- `result.name`: Name
- `result.creator`: Creator
- `result.creator.id`: User ID
- `result.creator.first_name`: First Name
- `result.creator.username`: Username
- `result.creates_join_request`: Creates Join Request (boolean)
- `result.is_primary`: Is Primary (boolean)
- `result.is_revoked`: Is Revoked (boolean)

### `telegram_delete_message`

**Delete Message.** Permanently removes a message from a chat, targeted by chat_id (a numeric id or @channelusername the bot can reach) and message_id (from a prior send action's return or the New Message trigger payload). Use to clean up or retract content; the bot can delete only its own messages, or any message in groups where it is an administrator. Idempotent in effect: the message ends up gone regardless of how many times this runs. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat Id. Unique identifier for the target chat or username of the target channel (e.g. @channelusername). |
| `message_id` | string | yes |  | Message Id. Identifier of the message to delete. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result`: Result (boolean)
- `status`: Status Code

### `telegram_edit_message_text`

**Edit Message Text.** Replaces the text of a message the bot already sent, targeted by chat_id + message_id OR by inline_message_id (the two modes are mutually exclusive — resolve message_id from the send action's return or the New Message trigger payload). Use to update a status or correct a message in place instead of sending a new one. Text is sent as plain text unless format is set; if you set MarkdownV2 or HTML the text must be correctly escaped or Telegram rejects it. Idempotent in effect (the message ends at the given text), but Telegram rejects an edit whose new text matches the current content. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | no |  | Chat Id. Numeric id or @channelusername of the chat holding the message. Required together with Message Id; leave empty when editing an inline message (use Inline Message Id instead). |
| `message_id` | string | no |  | Message Id. Identifier of the message to edit (used together with Chat Id). |
| `inline_message_id` | string | no |  | Inline Message Id. Identifier of the inline message (mutually exclusive with Chat Id + Message Id). |
| `text` | string | yes |  | New Text. New text of the message (1–4096 chars). |
| `format` | string | no | `"None"` | Format. How the message text should be parsed by Telegram. Defaults to plain text; only set MarkdownV2 or HTML when the text is correctly escaped/tagged. One of `"None"`, `"MarkdownV2"`, `"HTML"`. |
| `disable_web_page_preview` | boolean | no | `false` | Disable Web Page Preview. Disable link previews for links in this message. |
| `reply_markup` | JSON | no |  | Reply Markup. Advanced/optional. A raw JSON-serialized inline keyboard, e.g. {"inline_keyboard":[[{"text":"Open","url":"https://example.com"}]]}. Malformed markup is rejected by Telegram. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result.message_id`: Message ID
- `body.result.text`: Message Text
- `body.result.date`: Date (datetime)
- `body.result.edit_date`: Edit Date (datetime)
- `body.result.chat`: Chat
- `body.result.chat.id`: Chat ID
- `body.result.chat.type`: Chat Type
- `body.result.chat.title`: Title
- `body.result.from`: From
- `body.result.from.id`: Bot ID
- `body.result.from.username`: Username
- `body.result.from.is_bot`: Is Bot (boolean)
- `status`: Status Code

### `telegram_forward_message`

**Forward Message.** Forwards an existing message from a source chat (from_chat_id) to a target chat (chat_id), preserving original sender attribution. chat_id and from_chat_id are each a numeric id or @channelusername the bot can reach; message_id comes from the New Message trigger or a prior send action. Use to relay content the bot can access between chats; the bot must be able to read the source and post to the target. Not idempotent: each call creates a new forwarded message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Target Chat Id. Chat the message will be forwarded to (a numeric id or @channelusername the bot can reach). |
| `from_chat_id` | string | yes |  | From Chat Id. Chat the original message came from. |
| `message_id` | string | yes |  | Message Id. Identifier of the message to forward. |
| `message_thread_id` | string | no |  | Message Thread Id. Unique identifier for the target message thread of the forum; supergroup forums only. |
| `disable_notification` | boolean | no | `false` | Disable Notification. Send the message silently. Users will receive a notification with no sound. |
| `protect_content` | boolean | no | `false` | Protect Content. Protects the contents of the sent message from forwarding and saving. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result.message_id`: Message ID
- `body.result.date`: Date (datetime)
- `body.result.forward_date`: Forward Date (datetime)
- `body.result.chat`: Chat
- `body.result.chat.id`: Chat ID
- `body.result.chat.type`: Chat Type
- `body.result.chat.title`: Title
- `body.result.from`: From
- `body.result.from.id`: Bot ID
- `body.result.from.username`: Username
- `body.result.from.is_bot`: Is Bot (boolean)
- `status`: Status Code

### `telegram_get_bot_info`

**Get Bot Info.** Returns the authenticated bot's own identity and capabilities (id, username, name, and which features such as inline mode or group joins are enabled). Use to confirm which bot the connection points at or to read the bot's @username before building an invite or mention. Read-only and takes no input. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `ok`: OK (boolean)
- `result`: Bot
- `result.id`: Bot ID
- `result.is_bot`: Is Bot (boolean)
- `result.first_name`: First Name
- `result.username`: Username
- `result.can_join_groups`: Can Join Groups (boolean)
- `result.can_read_all_group_messages`: Can Read All Group Messages (boolean)
- `result.supports_inline_queries`: Supports Inline Queries (boolean)

### `telegram_get_chat_administrators`

**Get Chat Administrators.** Lists the administrators of a chat by chat_id (a numeric id or @channelusername) — each admin's user, status (creator/administrator), and granted rights. Use to discover who can moderate a chat, or to find a user_id before checking one member with telegram_get_chat_member. Returns an empty list for private chats. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat Id. Unique identifier for the target chat or username of the target channel (e.g. @channelusername). |

Output fields:

- `ok`: OK (boolean)
- `result`: Administrators
- `result[].status`: Status
- `result[].user`: User
- `result[].user.id`: User ID
- `result[].user.is_bot`: Is Bot (boolean)
- `result[].user.first_name`: First Name
- `result[].user.username`: Username
- `result[].is_anonymous`: Is Anonymous (boolean)
- `result[].can_pin_messages`: Can Pin Messages (boolean)
- `result[].can_invite_users`: Can Invite Users (boolean)
- `result[].can_delete_messages`: Can Delete Messages (boolean)

### `telegram_get_chat_member_count`

**Get Chat Member Count.** Returns the number of members in a chat by chat_id (a numeric id or @channelusername). Use to size a group or channel before posting or to monitor membership; for per-user details use telegram_get_chat_member. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat Id. Unique identifier for the target chat or username of the target channel (e.g. @channelusername). |

Output fields:

- `ok`: OK (boolean)
- `result`: Member Count (number)

### `telegram_get_chat_member`

**Get Chat Member.** Looks up one user's membership in a chat by chat_id (a numeric id or @channelusername) and user_id, returning their status (member, administrator, creator, restricted, left, kicked) and permissions. Use to check whether a user belongs to a chat or what rights they hold before acting; to list all admins use telegram_get_chat_administrators. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat Id. Unique identifier for the target chat or username of the target channel (e.g. @channelusername). |
| `user_id` | string | yes |  | User Id. Unique identifier for the user (e.g. from the New Message trigger payload). |

Output fields:

- `ok`: OK (boolean)
- `result`: Member
- `result.status`: Status
- `result.user`: User
- `result.user.id`: User ID
- `result.user.is_bot`: Is Bot (boolean)
- `result.user.first_name`: First Name
- `result.user.username`: Username
- `result.is_anonymous`: Is Anonymous (boolean)
- `result.can_pin_messages`: Can Pin Messages (boolean)
- `result.can_invite_users`: Can Invite Users (boolean)
- `result.can_delete_messages`: Can Delete Messages (boolean)

### `telegram_get_chat`

**Get Chat.** Looks up current details about a chat (title, description, type, photo, member count) by chat_id (a numeric id or @channelusername). Use to resolve or inspect a chat before acting on it, or to confirm the bot can reach it; the bot must be a member of or have access to the chat. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat Id. Unique identifier for the target chat or username of the target channel (e.g. @channelusername). |

Output fields:

- `ok`: OK (boolean)
- `result`: Chat
- `result.id`: Chat ID
- `result.type`: Chat Type
- `result.title`: Title
- `result.username`: Username
- `result.first_name`: First Name
- `result.last_name`: Last Name
- `result.description`: Description
- `result.invite_link`: Invite Link (url)

### `telegram_get_file`

**Get File.** Resolves a Telegram file_id (from a message the bot received) to its file metadata (size and Telegram file path), and optionally downloads the content as base64 when download is enabled. Use to retrieve a file attached to an incoming message. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file_id` | string | yes |  | File ID. File identifier to get information about (from a received message). |
| `download` | boolean | no | `false` | Download File. If enabled, the file is downloaded and returned as base64. |

Output fields:

- `file_info`: File Info
- `file_info.file_id`: File ID
- `file_info.file_unique_id`: File Unique ID
- `file_info.file_size`: File Size (filesize)
- `file_info.file_path`: File Path
- `file_content_base64`: File Content (Base64)

### `telegram_pin_message`

**Pin Message.** Pins an existing message in a chat, targeted by chat_id (a numeric id or @channelusername the bot can reach) and message_id (from a prior send action or the New Message trigger); the bot must be an administrator with pin rights. Use to highlight an announcement or important message; to remove the pin use telegram_unpin_message. Idempotent: pinning an already-pinned message leaves it pinned. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat Id. Unique identifier for the target chat or username of the target channel (e.g. @channelusername). |
| `message_id` | string | yes |  | Message Id. Identifier of the message to pin. |
| `disable_notification` | boolean | no | `false` | Disable Notification. Pass True if it is not necessary to send a notification to all chat members. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result`: Result (boolean)
- `status`: Status Code

### `telegram_send_audio`

**Send Audio.** Sends an audio file (.MP3/.M4A) that appears in the chat's music player (chat_id is a numeric id or @channelusername the bot can reach), supplied as an uploaded file OR a previously uploaded file_id, with optional performer and track title. Provide exactly one of audio or audio_id. Use for music or audio tracks; for a raw file attachment use telegram_send_document. Caption format defaults to plain text. Not idempotent: each call sends a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat Id. Unique identifier for the target chat or username of the target channel (e.g. @channelusername). |
| `audio` | file | no |  | Audio. The audio file to send (.MP3 or .M4A). Provide this or an audio_id. Files are not supported; an action that needs one fails. |
| `audio_id` | string | no |  | Audio Id. Reuse an audio file previously uploaded to Telegram by passing its file_id. Provide this or an audio file. |
| `caption` | string | no |  | Caption. Optional caption (0–1024 chars). |
| `format` | string | no | `"None"` | Caption Format. How the caption should be parsed by Telegram. Defaults to plain text; only set MarkdownV2 or HTML when the caption is correctly escaped/tagged. One of `"None"`, `"MarkdownV2"`, `"HTML"`. |
| `duration` | number | no |  | Duration. Duration of the audio in seconds. |
| `performer` | string | no |  | Performer. Performer / artist name. |
| `title` | string | no |  | Track Title. Track title. |
| `message_thread_id` | string | no |  | Message Thread Id. Unique identifier for the target message thread of the forum; supergroup forums only. |
| `disable_notification` | boolean | no | `false` | Disable Notification. Send the message silently. Users will receive a notification with no sound. |
| `protect_content` | boolean | no | `false` | Protect Content. Protects the contents of the sent message from forwarding and saving. |
| `reply_to_message_id` | number | no |  | Reply To Message Id. If the message is a reply, ID of the original message. |
| `reply_markup` | JSON | no |  | Reply Markup. Advanced/optional. A raw JSON-serialized inline keyboard, e.g. {"inline_keyboard":[[{"text":"Open","url":"https://example.com"}]]}. Malformed markup is rejected by Telegram. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result.message_id`: Message ID
- `body.result.caption`: Caption
- `body.result.date`: Date (datetime)
- `body.result.audio`: Audio
- `body.result.audio.file_id`: File ID
- `body.result.audio.file_unique_id`: File Unique ID
- `body.result.audio.duration`: Duration (s) (number)
- `body.result.audio.performer`: Performer
- `body.result.audio.title`: Track Title
- `body.result.audio.file_name`: File Name
- `body.result.audio.mime_type`: MIME Type
- `body.result.audio.file_size`: File Size (filesize)
- `body.result.chat`: Chat
- `body.result.chat.id`: Chat ID
- `body.result.chat.type`: Chat Type
- `body.result.chat.title`: Title
- `body.result.from`: From
- `body.result.from.id`: Bot ID
- `body.result.from.username`: Username
- `body.result.from.is_bot`: Is Bot (boolean)
- `status`: Status Code

### `telegram_send_chat_action`

**Send Chat Action.** Broadcasts a transient activity status (such as typing or uploading photo) in a chat addressed by chat_id (a numeric id or @channelusername the bot can reach), shown for up to 5 seconds. Use just before a slower action to signal the bot is working; it sends no message and produces no persistent content. Not idempotent: each call re-broadcasts the status. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat Id. Unique identifier for the target chat or username of the target channel (e.g. @channelusername). |
| `action` | string | yes | `"typing"` | Action. Type of action to broadcast. One of `"typing"`, `"upload_photo"`, `"record_video"`, `"upload_video"`, `"record_voice"`, `"upload_voice"`, `"upload_document"`, `"choose_sticker"`, `"find_location"`, `"record_video_note"`, `"upload_video_note"`. |
| `message_thread_id` | string | no |  | Message Thread Id. Unique identifier for the target message thread of the forum; supergroup forums only. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result`: Result (boolean)
- `status`: Status Code

### `telegram_send_document`

**Send Document.** Uploads and sends a generic file (up to 50 MB) as a document to a chat (chat_id is a numeric id or @channelusername the bot can reach), supplied as an uploaded file OR a previously uploaded file_id. Provide exactly one of document or document_id. Use for arbitrary attachments (PDF, archive, spreadsheet); for media shown inline use telegram_send_photo_or_video, for music use telegram_send_audio. Caption format defaults to plain text. Not idempotent: each call sends a new document. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat Id. Unique identifier for the target chat or username of the target channel (e.g. @channelusername). |
| `document` | file | no |  | Document. The document file to send. Telegram supports any file up to 50 MB. Provide this or a document_id. Files are not supported; an action that needs one fails. |
| `document_id` | string | no |  | Document Id. Reuse a document previously uploaded to Telegram by passing its file_id. Provide this or a document file. |
| `caption` | string | no |  | Caption. Optional caption to display below the document (0–1024 chars). |
| `format` | string | no | `"None"` | Caption Format. How the caption should be parsed by Telegram. Defaults to plain text; only set MarkdownV2 or HTML when the caption is correctly escaped/tagged. One of `"None"`, `"MarkdownV2"`, `"HTML"`. |
| `message_thread_id` | string | no |  | Message Thread Id. Unique identifier for the target message thread of the forum; supergroup forums only. |
| `disable_notification` | boolean | no | `false` | Disable Notification. Send the message silently. Users will receive a notification with no sound. |
| `protect_content` | boolean | no | `false` | Protect Content. Protects the contents of the sent message from forwarding and saving. |
| `reply_to_message_id` | number | no |  | Reply To Message Id. If the message is a reply, ID of the original message. |
| `reply_markup` | JSON | no |  | Reply Markup. Advanced/optional. A raw JSON-serialized inline keyboard, e.g. {"inline_keyboard":[[{"text":"Open","url":"https://example.com"}]]}. Malformed markup is rejected by Telegram. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result.message_id`: Message ID
- `body.result.caption`: Caption
- `body.result.date`: Date (datetime)
- `body.result.document`: Document
- `body.result.document.file_id`: File ID
- `body.result.document.file_unique_id`: File Unique ID
- `body.result.document.file_name`: File Name
- `body.result.document.mime_type`: MIME Type
- `body.result.document.file_size`: File Size (filesize)
- `body.result.chat`: Chat
- `body.result.chat.id`: Chat ID
- `body.result.chat.type`: Chat Type
- `body.result.chat.title`: Title
- `body.result.from`: From
- `body.result.from.id`: Bot ID
- `body.result.from.username`: Username
- `body.result.from.is_bot`: Is Bot (boolean)
- `status`: Status Code

### `telegram_send_location`

**Send Location.** Sends a point location (latitude + longitude) to a chat addressed by chat_id (a numeric id or @channelusername the bot can reach), optionally as a live location that updates for a set period. Use to share a place or track a moving position; both coordinates are required. Not idempotent: each call posts a new location message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat Id. Unique identifier for the target chat or username of the target channel (e.g. @channelusername). |
| `latitude` | number | yes |  | Latitude. Latitude of the location. |
| `longitude` | number | yes |  | Longitude. Longitude of the location. |
| `horizontal_accuracy` | number | no |  | Horizontal Accuracy. Radius of uncertainty for the location, in meters (0–1500). |
| `live_period` | number | no |  | Live Period. Number of seconds the location will be updated (60–86400). Use for live locations. |
| `heading` | number | no |  | Heading. For live locations, direction the user is moving in degrees (1–360). |
| `proximity_alert_radius` | number | no |  | Proximity Alert Radius. For live locations, the max distance (1–100000 m) for proximity alerts about approaching another chat member. |
| `message_thread_id` | string | no |  | Message Thread Id. Unique identifier for the target message thread of the forum; supergroup forums only. |
| `disable_notification` | boolean | no | `false` | Disable Notification. Send the message silently. Users will receive a notification with no sound. |
| `protect_content` | boolean | no | `false` | Protect Content. Protects the contents of the sent message from forwarding and saving. |
| `reply_to_message_id` | number | no |  | Reply To Message Id. If the message is a reply, ID of the original message. |
| `reply_markup` | JSON | no |  | Reply Markup. Advanced/optional. A raw JSON-serialized inline keyboard, e.g. {"inline_keyboard":[[{"text":"Open","url":"https://example.com"}]]}. Malformed markup is rejected by Telegram. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result.message_id`: Message ID
- `body.result.date`: Date (datetime)
- `body.result.location`: Location
- `body.result.location.latitude`: Latitude (number)
- `body.result.location.longitude`: Longitude (number)
- `body.result.chat`: Chat
- `body.result.chat.id`: Chat ID
- `body.result.chat.type`: Chat Type
- `body.result.chat.title`: Title
- `body.result.from`: From
- `body.result.from.id`: Bot ID
- `body.result.from.username`: Username
- `body.result.from.is_bot`: Is Bot (boolean)
- `status`: Status Code

### `telegram_send_media_group`

**Send Media Group (Album).** Sends 2–10 media items (each a public URL or a Telegram file_id) as one grouped album to a chat addressed by chat_id (a numeric id or @channelusername the bot can reach). Use to post several photos/videos together; photo and video may be mixed, but audio-only and document-only groups cannot be combined with other types. Item captions default to plain text. For a single item use telegram_send_photo_or_video. Not idempotent: each call posts a new album. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat Id. Unique identifier for the target chat or username of the target channel (e.g. @channelusername). |
| `media` | array | yes |  | Media. Media items to send. Each must be a URL or a Telegram file_id. Mixing photo/video is allowed; audio and document groups cannot be mixed with other types. Each item: { `type`, `media`, `caption`? }. |
| `parse_mode` | string | no | `"None"` | Caption Format. How item captions should be parsed by Telegram. Defaults to plain text; only set MarkdownV2 or HTML when captions are correctly escaped/tagged. One of `"None"`, `"MarkdownV2"`, `"HTML"`. |
| `message_thread_id` | string | no |  | Message Thread Id. Unique identifier for the target message thread of the forum; supergroup forums only. |
| `disable_notification` | boolean | no | `false` | Disable Notification. Send the message silently. Users will receive a notification with no sound. |
| `protect_content` | boolean | no | `false` | Protect Content. Protects the contents of the sent message from forwarding and saving. |
| `reply_to_message_id` | number | no |  | Reply To Message Id. If the message is a reply, ID of the original message. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result`: Messages
- `body.result[].message_id`: Message ID
- `body.result[].caption`: Caption
- `body.result[].media_group_id`: Media Group ID
- `body.result[].photo`: Photo Sizes
- `body.result[].photo[].file_id`: File ID
- `body.result[].photo[].file_unique_id`: File Unique ID
- `body.result[].photo[].width`: Width (number)
- `body.result[].photo[].height`: Height (number)
- `body.result[].photo[].file_size`: File Size (filesize)
- `body.result[].video`: Video
- `body.result[].video.file_id`: File ID
- `body.result[].video.file_unique_id`: File Unique ID
- `body.result[].video.width`: Width (number)
- `body.result[].video.height`: Height (number)
- `body.result[].video.duration`: Duration (s) (number)
- `body.result[].video.file_name`: File Name
- `body.result[].video.mime_type`: MIME Type
- `body.result[].video.file_size`: File Size (filesize)
- `body.result[].audio`: Audio
- `body.result[].audio.file_id`: File ID
- `body.result[].audio.file_unique_id`: File Unique ID
- `body.result[].audio.duration`: Duration (s) (number)
- `body.result[].audio.performer`: Performer
- `body.result[].audio.title`: Track Title
- `body.result[].audio.file_name`: File Name
- `body.result[].audio.mime_type`: MIME Type
- `body.result[].audio.file_size`: File Size (filesize)
- `body.result[].document`: Document
- `body.result[].document.file_id`: File ID
- `body.result[].document.file_unique_id`: File Unique ID
- `body.result[].document.file_name`: File Name
- `body.result[].document.mime_type`: MIME Type
- `body.result[].document.file_size`: File Size (filesize)
- `body.result[].chat`: Chat
- `body.result[].chat.id`: Chat ID
- `body.result[].chat.type`: Chat Type
- `body.result[].chat.title`: Title
- `body.result[].from`: From
- `body.result[].from.id`: Bot ID
- `body.result[].from.username`: Username
- `body.result[].from.is_bot`: Is Bot (boolean)
- `status`: Status Code

### `telegram_send_message`

**Send Message.** Posts a text message to a Telegram chat, group, or channel addressed by chat_id (a numeric id or @channelusername the bot can reach — resolve via the New Message trigger payload's chat.id or telegram_get_chat). Use to deliver a notification, reply, or alert; for an attachment use telegram_send_document, for a photo/video use telegram_send_photo_or_video. Text is sent as plain text unless format is set; if you set MarkdownV2 or HTML the text must be correctly escaped or Telegram rejects it. reply_markup is an advanced raw inline-keyboard JSON object. Not idempotent: each call sends a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat Id. Unique identifier for the target chat or username of the target channel (e.g. @channelusername). |
| `message` | string | yes |  | Message. The text message to send. |
| `format` | string | no | `"None"` | Format. How the message text should be parsed by Telegram. Defaults to plain text; only set MarkdownV2 or HTML when the text is correctly escaped/tagged. One of `"None"`, `"MarkdownV2"`, `"HTML"`. |
| `message_thread_id` | string | no |  | Message Thread Id. Unique identifier for the target message thread of the forum; supergroup forums only. |
| `web_page_preview` | boolean | no | `false` | Disable Web Page Preview. Disable link previews for links in this message. |
| `disable_notification` | boolean | no | `false` | Disable Notification. Send the message silently. Users will receive a notification with no sound. |
| `protect_content` | boolean | no | `false` | Protect Content. Protects the contents of the sent message from forwarding and saving. |
| `reply_to_message_id` | number | no |  | Reply To Message Id. If the message is a reply, ID of the original message. |
| `reply_markup` | JSON | no |  | Reply Markup. Advanced/optional. A raw JSON-serialized inline keyboard or reply keyboard, e.g. {"inline_keyboard":[[{"text":"Open","url":"https://example.com"}]]}. Malformed markup is rejected by Telegram. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result.message_id`: Message ID
- `body.result.text`: Message Text
- `body.result.date`: Date (datetime)
- `body.result.chat`: Chat
- `body.result.chat.id`: Chat ID
- `body.result.chat.type`: Chat Type
- `body.result.chat.title`: Title
- `body.result.from`: From
- `body.result.from.id`: Bot ID
- `body.result.from.username`: Username
- `body.result.from.is_bot`: Is Bot (boolean)
- `status`: Status Code

### `telegram_send_photo_or_video`

**Send Photo, Video, Sticker or GIF.** Sends a single photo, video, sticker, or animated GIF to a chat (chat_id is a numeric id or @channelusername the bot can reach), supplied as an uploaded file OR a previously uploaded Telegram file_id, with an optional caption. Pick the media_type, then provide either the file or its file_id for that type. Use for one inline media item; for several in one album use telegram_send_media_group, for an arbitrary attachment use telegram_send_document. Caption format defaults to plain text. Not idempotent: each call posts a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat Id. Unique identifier for the target chat or username of the target channel (e.g. @channelusername). |
| `media_type` | string | yes |  | Media Type. One of `"photo"`, `"video"`, `"sticker"`, `"animation"`. |
| `media` | object | no |  | Media Properties. An object whose fields depend on other inputs; the product shows them. |
| `format` | string | no | `"None"` | Caption Format. How the caption should be parsed by Telegram. Defaults to plain text; only set MarkdownV2 or HTML when the caption is correctly escaped/tagged. One of `"None"`, `"MarkdownV2"`, `"HTML"`. |
| `message` | string | no |  | Caption. The caption to send with the media. |
| `message_thread_id` | string | no |  | Message Thread Id. Unique identifier for the target message thread of the forum; supergroup forums only. |
| `disable_notification` | boolean | no | `false` | Disable Notification. Send the message silently. Users will receive a notification with no sound. |
| `protect_content` | boolean | no | `false` | Protect Content. Protects the contents of the sent message from forwarding and saving. |
| `reply_markup` | JSON | no |  | Reply Markup. Advanced/optional. A raw JSON-serialized inline keyboard, e.g. {"inline_keyboard":[[{"text":"Open","url":"https://example.com"}]]}. Malformed markup is rejected by Telegram. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result.message_id`: Message ID
- `body.result.caption`: Caption
- `body.result.date`: Date (datetime)
- `body.result.photo`: Photo Sizes
- `body.result.photo[].file_id`: File ID
- `body.result.photo[].file_unique_id`: File Unique ID
- `body.result.photo[].width`: Width (number)
- `body.result.photo[].height`: Height (number)
- `body.result.photo[].file_size`: File Size (filesize)
- `body.result.video`: Video
- `body.result.video.file_id`: File ID
- `body.result.video.file_unique_id`: File Unique ID
- `body.result.video.width`: Width (number)
- `body.result.video.height`: Height (number)
- `body.result.video.duration`: Duration (s) (number)
- `body.result.video.file_name`: File Name
- `body.result.video.mime_type`: MIME Type
- `body.result.video.file_size`: File Size (filesize)
- `body.result.sticker`: Sticker
- `body.result.sticker.file_id`: File ID
- `body.result.sticker.file_unique_id`: File Unique ID
- `body.result.sticker.width`: Width (number)
- `body.result.sticker.height`: Height (number)
- `body.result.sticker.emoji`: Emoji
- `body.result.sticker.set_name`: Sticker Set Name
- `body.result.sticker.file_size`: File Size (filesize)
- `body.result.animation`: Animation
- `body.result.animation.file_id`: File ID
- `body.result.animation.file_unique_id`: File Unique ID
- `body.result.animation.width`: Width (number)
- `body.result.animation.height`: Height (number)
- `body.result.animation.duration`: Duration (s) (number)
- `body.result.animation.file_name`: File Name
- `body.result.animation.mime_type`: MIME Type
- `body.result.animation.file_size`: File Size (filesize)
- `body.result.chat`: Chat
- `body.result.chat.id`: Chat ID
- `body.result.chat.type`: Chat Type
- `body.result.chat.title`: Title
- `body.result.from`: From
- `body.result.from.id`: Bot ID
- `body.result.from.username`: Username
- `body.result.from.is_bot`: Is Bot (boolean)
- `status`: Status Code

### `telegram_send_poll`

**Send Poll.** Posts a native poll (regular or quiz) to a chat addressed by chat_id (a numeric id or @channelusername the bot can reach) with 2–10 answer options. Use to collect votes or run a quiz; quiz polls require correct_option_id (a 0-based index) and cannot allow multiple answers, and open_period and close_date are mutually exclusive. Not idempotent: each call creates a new poll. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat Id. Unique identifier for the target chat or username of the target channel (e.g. @channelusername). |
| `question` | string | yes |  | Question. Poll question, 1–300 characters. |
| `options` | array | yes |  | Options. List of answer options (2–10 options, each 1–100 characters). |
| `is_anonymous` | boolean | no | `true` | Anonymous. True, if the poll needs to be anonymous. Default true. |
| `type` | string | no | `"regular"` | Poll Type. Poll type. Defaults to "regular". One of `"regular"`, `"quiz"`. |
| `allows_multiple_answers` | boolean | no | `false` | Allow Multiple Answers. True if the poll allows multiple answers (regular polls only). |
| `correct_option_id` | number | no |  | Correct Option Id (Quiz). 0-based index of the correct answer option (required for quizzes). |
| `explanation` | string | no |  | Explanation (Quiz). Explanation shown when a user picks an incorrect answer (0–200 chars). |
| `explanation_parse_mode` | string | no | `"None"` | Explanation Format. How the quiz explanation should be parsed by Telegram. Defaults to plain text; only set MarkdownV2 or HTML when the explanation is correctly escaped/tagged. One of `"None"`, `"MarkdownV2"`, `"HTML"`. |
| `open_period` | number | no |  | Open Period (seconds). Amount of time in seconds the poll will be active (5–600). |
| `close_date` | ISO date-time string | no |  | Close Date. Point in time when the poll will be automatically closed. |
| `is_closed` | boolean | no | `false` | Closed. Pass True if the poll should be immediately closed. Useful for previews. |
| `message_thread_id` | string | no |  | Message Thread Id. Unique identifier for the target message thread of the forum; supergroup forums only. |
| `disable_notification` | boolean | no | `false` | Disable Notification. Send the message silently. Users will receive a notification with no sound. |
| `protect_content` | boolean | no | `false` | Protect Content. Protects the contents of the sent message from forwarding and saving. |
| `reply_to_message_id` | number | no |  | Reply To Message Id. If the message is a reply, ID of the original message. |
| `reply_markup` | JSON | no |  | Reply Markup. Advanced/optional. A raw JSON-serialized inline keyboard, e.g. {"inline_keyboard":[[{"text":"Open","url":"https://example.com"}]]}. Malformed markup is rejected by Telegram. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result.message_id`: Message ID
- `body.result.date`: Date (datetime)
- `body.result.poll`: Poll
- `body.result.poll.id`: Poll ID
- `body.result.poll.question`: Question
- `body.result.poll.options`: Options
- `body.result.poll.options[].text`: Text
- `body.result.poll.options[].voter_count`: Voter Count (number)
- `body.result.poll.total_voter_count`: Total Voter Count (number)
- `body.result.poll.is_closed`: Is Closed (boolean)
- `body.result.poll.is_anonymous`: Is Anonymous (boolean)
- `body.result.poll.type`: Poll Type
- `body.result.poll.allows_multiple_answers`: Allows Multiple Answers (boolean)
- `body.result.chat`: Chat
- `body.result.chat.id`: Chat ID
- `body.result.chat.type`: Chat Type
- `body.result.chat.title`: Title
- `body.result.from`: From
- `body.result.from.id`: Bot ID
- `body.result.from.username`: Username
- `body.result.from.is_bot`: Is Bot (boolean)
- `status`: Status Code

### `telegram_unpin_message`

**Unpin Message.** Unpins a message in a chat addressed by chat_id (a numeric id or @channelusername the bot can reach) — supply message_id to unpin a specific message, or omit it to unpin the most recent pinned message; the bot must be an administrator with pin rights. Use to clear a pin set by telegram_pin_message. Idempotent: an already-unpinned message stays unpinned. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chat_id` | string | yes |  | Chat Id. Unique identifier for the target chat or username of the target channel (e.g. @channelusername). |
| `message_id` | string | no |  | Message Id. Identifier of the pinned message to unpin. Leave empty to unpin the most recent pinned message. |

Output fields:

- `body.ok`: OK (boolean)
- `body.result`: Result (boolean)
- `status`: Status Code

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

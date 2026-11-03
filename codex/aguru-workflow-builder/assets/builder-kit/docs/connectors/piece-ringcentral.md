# RingCentral

Cloud business communications: send SMS, place calls, manage messages, and post to Team Messaging.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-ringcentral'
  version: '0.1.2'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> In the [RingCentral Developer Console](https://developers.ringcentral.com/), create a REST API app using **OAuth 2.0 (Authorization Code Flow)** for a server/web app. Add the redirect URI shown here to the app, then enable the app scopes you need (for example: SMS, RingOut, Read Messages, Read Call Log, Read Accounts, TeamMessaging, Webhook Subscriptions). Copy the app's Client ID and Client Secret below, and pick the Environment that matches your app.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `environment` | string | yes | `"platform.ringcentral.com"` | Environment. The RingCentral server your app is registered on. One of `"platform.ringcentral.com"`, `"platform.devtest.ringcentral.com"`. |

## Actions

### `send_sms`

**Send SMS.** Send an SMS text message from one of your RingCentral numbers. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From. The SMS-enabled RingCentral number to send from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | array | yes |  | To. Recipient phone number(s) in E.164 format (e.g. +14155550123). |
| `text` | string | yes |  | Message. The text content of the SMS message. |

### `make_call`

**Make Call (RingOut).** Start a two-legged RingOut call: RingCentral calls the "from" number first, then connects it to the "to" number. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From. The number RingCentral calls first, in E.164 format (e.g. +14155550100). Usually one of your RingCentral numbers. |
| `to` | string | yes |  | To. The number to connect the call to, in E.164 format (e.g. +14155550123). |
| `callerId` | string | no |  | Caller ID. Optional number shown to the callee, in E.164 format. Must be one of your RingCentral numbers. |
| `playPrompt` | boolean | no | `false` | Play Prompt. Play a "please hold" prompt to the "from" party before connecting the call. |

### `send_team_message`

**Send Team Messaging Post.** Post a message to a RingCentral Team Messaging chat, group, or team. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatId` | string | yes |  | Chat. The direct message, group or team to post to. A value the product loads from the provider, such as an id; write the value itself. |
| `text` | string | yes |  | Message. The text content of the post. Supports Markdown. |

### `get_call_log`

**Get Call Log.** Retrieve call log records for the authenticated user's extension. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `direction` | string | no |  | Direction. Filter records by call direction. One of `"Inbound"`, `"Outbound"`. |
| `type` | string | no |  | Type. Filter records by call type. One of `"Voice"`, `"Fax"`. |
| `dateFrom` | string | no |  | Date From. The start of the time range in ISO 8601 format (e.g. 2024-01-01T00:00:00Z). |
| `dateTo` | string | no |  | Date To. The end of the time range in ISO 8601 format (e.g. 2024-01-31T23:59:59Z). |
| `perPage` | number | no |  | Records Per Page. Maximum number of records to return (1-1000). |

### `get_extension_info`

**Get Extension Info.** Get profile information for the authenticated user's extension. Needs authentication.

No inputs.

### `get_message`

**Get Message.** Retrieve a single SMS, MMS or voicemail message, including the list of attachments it carries. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. The message to read. The New Inbound SMS or MMS trigger emits this as `id`. |

### `download_message_attachment`

**Download Message Attachment.** Download the content of a message attachment, such as an MMS photo or a voicemail recording, and return it as a file. Needs authentication.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `messageId` | string | yes |  | Message ID. The message the attachment belongs to. |
| `attachmentId` | string | no |  | Attachment ID. Which attachment to download. Leave blank to take the first one that is not the message text, which is the usual case for an MMS carrying a single photo. |
| `fileName` | string | no |  | File Name. Overrides the name RingCentral reports. Worth setting when the name matters downstream, e.g. naming a POD after the load number. |

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

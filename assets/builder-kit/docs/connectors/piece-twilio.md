# Twilio

Cloud communications platform for building SMS, Voice & Messaging applications

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-twilio'
  version: '0.7.0'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `BASIC_AUTH`: Connection

> To find your credentials:
> 1. Sign in to the [Twilio Console](https://console.twilio.com).
> 2. On the home page, find **Account Info**.
> 3. Copy the **Account SID** and the **Auth Token** (click **Show** to reveal it).

## Actions

### `send_sms`

**Send SMS.** Sends an SMS text message from a Twilio phone number to a recipient. Use to notify or message a person by text. Requires the destination number, message body, and a Twilio-owned sender number; sending costs money and delivers a separate message on every call, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From. Your Twilio number the text is sent from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | To. Phone number with country code, starting with +. |
| `body` | string | yes |  | Message. Up to 1,600 characters. Long texts are split and billed per part. |

### `phone_number_lookup`

**Phone Number Lookup.** Looks up carrier and line-type intelligence for a single phone number via the Twilio Lookup API. Use to validate or enrich a number (e.g. detect mobile vs landline, carrier) before messaging or calling it. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `phone_number` | string | yes |  | Phone Number. Phone number with country code, starting with +. |

### `make_call`

**Call Phone.** Places an outbound voice call from a Twilio number that reads a text-to-speech message to the recipient. Use to deliver a spoken notification or alert by phone. Requires both numbers in E.164 format and the message text; each call places a real, billable phone call, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From. Your Twilio number the call comes from. A value the product loads from the provider, such as an id; write the value itself. |
| `to` | string | yes |  | To. Phone number with country code, starting with +. |
| `message` | string | yes |  | Message. Text read aloud to the person who answers. |
| `voice` | string | no |  | Voice. Empty: your Twilio account's default voice. One of `"alice"`, `"man"`, `"woman"`. |
| `language` | string | no |  | Language. Language the message is read in. Empty: English (US). One of `"en-US"`, `"en-GB"`, `"es-ES"`, `"fr-FR"`, `"de-DE"`. |
| `sendDigits` | string | no |  | Keys to Dial. Keys pressed once the call connects. w pauses 0.5 s, W pauses 1 s. |
| `timeout` | number | no | `60` | Ring Timeout. Seconds to ring before giving up, up to 600. Empty: 60. |

### `get_message`

**Get Message.** Fetches the full details and status of a single Twilio message by its SID. Use to check delivery status or inspect a known message; requires the message SID (starting with "SM" or "MM"). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message_sid` | string | yes |  | Message SID. Starts with SM or MM. Shown in the Send SMS output and Twilio logs. |

### `download_recording_media`

**Download Recording Media.** Downloads the audio file for a specific Twilio call recording by its SID, returning it as a file (MP3 or WAV). Use to retrieve recorded call audio for storage or further processing; requires the recording SID (starting with "RE"). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `recording_sid` | string | yes |  | Recording SID. Starts with RE. Shown in the New Recording trigger output. |
| `format` | string | no | `"mp3"` | Format. MP3 files are smaller. WAV keeps full quality. One of `"mp3"`, `"wav"`. |
| `channels` | string | no |  | Channels. Dual keeps each caller on a separate channel, if recorded that way. One of `1`, `2`. |

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

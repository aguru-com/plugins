# Telnyx

Telecom API platform for SMS messaging, voice calls, and messaging webhooks.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-telnyx'
  version: '0.1.0'
```

Categories: COMMUNICATION, DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Telnyx API key.

## Actions

### `send_sms`

**Send SMS.** Sends an outbound SMS via Telnyx from a sender number/ID to a destination phone number (E.164) with the given message body; optionally scope it to a specific messaging profile. Use to deliver a text message to a recipient. Not idempotent: each call sends a new message, so repeating it sends duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from` | string | yes |  | From. The sending number or sender ID. |
| `to` | string | yes |  | To. The destination phone number in E.164 format. |
| `text` | string | yes |  | Text. The message body to send. |
| `messaging_profile_id` | string | no |  | Messaging Profile ID. Optional Telnyx messaging profile ID. |

### `make_call`

**Make Call.** Places an outbound voice call via the Telnyx Call Control API from a caller ID (E.164) to a destination number or SIP URI, using a required Call Control Application (connection) ID; can optionally play an audio file (WAV/MP3) on answer and override the webhook destination and ring timeout. Use to dial a recipient programmatically. Not idempotent: each call initiates a new call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `connection_id` | string | yes |  | Connection ID. The Telnyx Call Control Application ID (formerly connection ID) used to place the call. |
| `from` | string | yes |  | From. The caller ID number in E.164 format. |
| `to` | string | yes |  | To. The destination number or SIP URI. |
| `audio_url` | string | no |  | Audio URL. Optional WAV or MP3 URL to play when the call is answered. |
| `webhook_url` | string | no |  | Webhook URL. Optional URL that overrides the default Telnyx webhook destination for this call. |
| `timeout_secs` | number | no | `30` | Timeout (seconds). How long to let the destination ring before timing out. |

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

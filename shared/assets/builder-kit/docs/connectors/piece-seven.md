# seven

Business Messaging Gateway

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-seven'
  version: '0.1.8'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API key

> You can find your API key in [Developer Menu](https://app.seven.io/developer).

## Actions

### `send-sms`

**Send SMS.** Sends an SMS text message via the seven gateway to one or more recipient phone numbers. Use to deliver a text notification or alert; supports optional scheduled dispatch (delay), flash SMS, and a custom sender. Each call dispatches a new message, so it is not idempotent — repeating sends another SMS. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | array | yes |  | To. Recipient numbers of the SMS. |
| `delay` | ISO date-time string | no |  | Delay. |
| `flash` | boolean | no |  | Flash SMS ?. |
| `from` | string | no |  | From. |
| `text` | string | yes |  | Message Body. The body of the message to send. |

### `send-voice-call`

**Send Voice Call.** Places an automated Text-To-Speech voice call via the seven gateway to one or more recipient numbers, reading out the provided message text. Use to deliver a spoken notification rather than a text message; an optional custom sender can be set. Each call initiates a new outbound call, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | string | yes |  | To. Recipient number(s) of the voice calls. |
| `from` | string | no |  | From. |
| `text` | string | yes |  | Message Body. Text message to be read out. |

### `lookup`

**Lookup Phone Numbers.** Looks up information about one or more phone numbers via the seven gateway. The lookup type selects what is returned — CNAM (caller name), HLR (network/status), MNP (number portability), RCS capability, or number format validation. Use to validate or enrich phone numbers before messaging. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Type. One of `"cnam"`, `"hlr"`, `"format"`, `"mnp"`, `"rcs"`. |
| `numbers` | array | yes |  | Numbers. The phone numbers to look up. |

### `send-rcs`

**Send RCS.** Sends a Rich Communication Services (RCS) message via the seven gateway to a single recipient phone number, optionally falling back to SMS or webview if RCS is unavailable. Use when sending a rich messaging payload rather than plain SMS; supports scheduled dispatch (delay), TTL, and performance tracking. Each call dispatches a new message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `to` | string | yes |  | To. Recipient phone number for the RCS message (e.g., 49176123456789). |
| `text` | string | yes |  | Message Body. The body of the message to send. |
| `from` | string | no |  | From. The unique ID of your RCS agent. If not specified, the first RCS-capable sender will be used. |
| `delay` | ISO date-time string | no |  | Delay. Date/time for delayed dispatch. Format: yyyy-mm-dd hh:ii or Unix timestamp. |
| `fallback` | string | no |  | Fallback. Alternative channel if RCS is not available. If not specified, fallback is disabled. One of `"sms"`, `"webview"`. |
| `ttl` | number | no |  | TTL (Time to Live). Validity period of the RCS in minutes. Default is 2880 (48 hours). |
| `label` | string | no |  | Label. Label for statistics tracking. Max 100 characters (a-z, A-Z, 0-9, .-_@). |
| `performance_tracking` | boolean | no |  | Performance Tracking. Activate click and performance tracking for URLs (also enables URL shortener). |
| `foreign_id` | string | no |  | Foreign ID. Your own ID for this message (used in callbacks). Max 64 characters (a-z, A-Z, 0-9, .-_@). |

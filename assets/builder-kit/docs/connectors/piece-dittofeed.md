# Dittofeed

Customer data platform for user analytics and tracking

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-dittofeed'
  version: '0.1.6'
```

Categories: MARKETING, BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API Key. Your API key of Dittofeed. |
| `baseUrl` | string | yes | `"http://localhost:3200"` | Base URL. The base URL of your Dittofeed instance. |

## Actions

### `identify`

**Identify User.** Sends an identify event to Dittofeed that links a userId to a set of traits (e.g. email, name, attributes), creating or updating that user profile in the customer data platform. Use to register a new user or attach/refresh trait data before tracking activity. Requires a userId; each call posts a new event with a unique messageId, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User ID. |
| `traits` | object | no |  | User Traits. |

### `track`

**Track Event.** Sends a track event to Dittofeed recording a named action a user performed (e.g. "Purchase Completed", "Signup"), optionally with event properties. Use to log user behavior that can drive segmentation and messaging campaigns. Requires a userId and event name; each call appends a new event with a unique messageId, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User ID. |
| `event` | string | yes |  | Event Name. |
| `properties` | object | no |  | Event Properties. |

### `screen`

**Screen Event.** Sends a screen event to Dittofeed recording that a user viewed a named screen or page, optionally with properties. Use to capture in-app screen-view activity for a user (the screen-specific counterpart to a track event). Requires a userId and screen name; each call appends a new event with a unique messageId, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User ID. |
| `name` | string | yes |  | Screen Name. |
| `properties` | object | no |  | Screen Properties. |

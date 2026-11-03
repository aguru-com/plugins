# LogRocket

Get AI-generated summaries of user sessions to understand customer behavior and troubleshoot issues faster.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-logrocket'
  version: '0.1.7'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> To get your LogRocket API key:
>
> 1. **Login to your LogRocket Dashboard**
> 2. **Go to Settings > General Settings**
> 3. **Copy your API key** from the API Key section
> 4. **Paste it here**
>
> Your API key is used to authenticate requests to the LogRocket API.

## Actions

### `requestHighlights`

**Request Highlights.** Kicks off an asynchronous LogRocket job that generates AI summaries of a user's recorded sessions; the results are not returned inline but POSTed to the given webhook URL once ready (pair with the "Highlights Ready" trigger). Identify the user by either email or user ID (one is required), and optionally scope to a time range (both start and end must be set together). Not idempotent: each call enqueues a new highlights request. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orgId` | string | yes |  | Organization ID. Your LogRocket organization ID (found in Settings > General Settings, or in your App ID before the slash) |
| `projectId` | string | yes |  | Project ID. Your LogRocket project ID (found in Settings > General Settings, or in your App ID after the slash) |
| `userEmail` | string | no |  | User Email. The email of the user to get highlights for. |
| `userId` | string | no |  | User ID. The ID of the user from LogRocket.identify() calls. |
| `timeRangeStart` | ISO date-time string | no |  | Start Time. Start of the time range for sessions (optional) |
| `timeRangeEnd` | ISO date-time string | no |  | End Time. End of the time range for sessions (optional) |
| `webhookUrl` | string | yes |  | Webhook URL. URL where highlights results will be posted when ready. You can get this from the "Highlights Ready" trigger. |

### `identifyUser`

**Identify User.** Upserts a LogRocket user record keyed by user ID, attaching identity fields (name, email) and arbitrary custom traits so sessions can be attributed and filtered. Use when enriching who a user is before or alongside session tracking. At least one of name, email, timestamp, or traits must be provided. Idempotent: it overwrites the same user record via PUT, so repeating with identical input yields the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `orgId` | string | yes |  | Organization ID. Your LogRocket organization ID (found in Settings > General Settings, or in your App ID before the slash) |
| `appId` | string | yes |  | App ID. Your LogRocket app/project ID (found in Settings > General Settings, or in your App ID after the slash) |
| `userId` | string | yes |  | User ID. The unique identifier for the user. |
| `name` | string | no |  | Name. The user's name (max 1024 characters) |
| `email` | string | no |  | Email. The user's email address (max 1024 characters) |
| `timestamp` | ISO date-time string | no |  | Timestamp. Unix timestamp in milliseconds indicating when this data was collected (optional) |
| `traits` | object | no |  | Traits. User traits as key-value pairs (e.g., {"plan": "free", "age": 43}). Values will be converted to strings. |

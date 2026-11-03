# Gotify

Self-hosted push notification service

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-gotify'
  version: '0.4.7'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To obtain a token:
>
> 1. Log in to your Gotify instance.
> 2. Click on Apps
> 3. Select the Eye icon in the same row as your App to copy your token, or CREATE APPLICATION if you do not have one app yet.
> 4. Copy your access token & and paste them into the fields below.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_url` | string | yes |  | Server URL. Gotify Instance URL. |
| `app_token` | string | yes |  | App Token. Gotify App Token. |

## Actions

### `send_notification`

**Send Notification.** Sends a push notification (title, message, optional 0-10 priority) to a self-hosted Gotify server via its message API. Choose this to alert a user or channel through their Gotify instance configured in the connection. Not idempotent: each call posts a new message, so repeating it delivers duplicate notifications. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. The title of the notification. |
| `message` | string | yes |  | Message. The message to send. |
| `priority` | number | no |  | Priority. The priority of the notification (0-10). 0 is lowest priority. |

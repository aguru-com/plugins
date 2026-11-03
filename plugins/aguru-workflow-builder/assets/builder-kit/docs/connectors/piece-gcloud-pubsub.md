# GCloud Pub/Sub

Google Cloud's event streaming service

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-gcloud-pubsub'
  version: '0.1.8'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> You can get it from the [Google Cloud Console](https://console.cloud.google.com/apis/credentials/serviceaccountkey).

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `json` | string | yes |  | Service Key (JSON). |

## Actions

### `publish_to_topic`

**Publish to topic.** Publishes a message to a Google Cloud Pub/Sub topic, base64-encoding the provided JSON object as the message payload. Use to emit an event or hand data to downstream Pub/Sub subscribers. The topic must already exist (selected from the project), and each call delivers a new message, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `message` | object | yes |  | Message. |
| `topic` | string | yes |  | Topic. A value the product loads from the provider, such as an id; write the value itself. |

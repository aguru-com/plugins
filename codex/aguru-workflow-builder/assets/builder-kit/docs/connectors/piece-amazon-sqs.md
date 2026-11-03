# Amazon SQS

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-amazon-sqs'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accessKeyId` | string | yes |  | Access Key ID. |
| `secretAccessKey` | string | yes |  | Secret Access Key. |
| `region` | string | yes |  | Region. One of `"us-east-1"`, `"us-east-1"`, `"us-east-2"`, `"us-west-1"`, `"us-west-2"`, `"af-south-1"`, `"ap-east-1"`, `"ap-south-1"`, `"ap-northeast-3"`, `"ap-northeast-2"`, `"ap-southeast-1"`, `"ap-southeast-2"`, `"ap-northeast-1"`, `"ca-central-1"`, `"eu-central-1"`, `"eu-west-1"`, `"eu-west-2"`, `"eu-south-1"`, `"eu-west-3"`, `"eu-north-1"`, `"me-south-1"`, `"sa-east-1"`, `"eu-south-2"`, `"ap-south-2"`, `"ap-southeast-3"` and 5 more. |

## Actions

### `sendMessage`

**Send Message.** Sends a single message to an Amazon SQS queue identified by its full queue URL, with the message body as plain text. Use to enqueue work or events for downstream consumers polling the queue. Not idempotent: each call enqueues a separate message, so retrying will produce duplicate messages. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `queueUrl` | string | yes |  | Queue URL. The URL of the SQS queue. |
| `messageBody` | string | yes |  | Message Body. The body of the message. |

# Amazon SNS

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-amazon-sns'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> This piece allows you to send messages to Amazon SNS topics.
>
> Refer to [this](https://docs.aws.amazon.com/general/latest/gr/sns.html) for **Region**. Leave the **Endpoint** blank.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accessKeyId` | string | yes |  | Access Key ID. |
| `secretAccessKey` | string | yes |  | Secret Access Key. |
| `region` | string | yes |  | Region. One of `"us-east-1"`, `"us-east-1"`, `"us-east-2"`, `"us-west-1"`, `"us-west-2"`, `"af-south-1"`, `"ap-east-1"`, `"ap-south-1"`, `"ap-northeast-3"`, `"ap-northeast-2"`, `"ap-southeast-1"`, `"ap-southeast-2"`, `"ap-northeast-1"`, `"ca-central-1"`, `"eu-central-1"`, `"eu-west-1"`, `"eu-west-2"`, `"eu-south-1"`, `"eu-west-3"`, `"eu-north-1"`, `"me-south-1"`, `"sa-east-1"`, `"eu-south-2"`, `"ap-south-2"`, `"ap-southeast-3"` and 5 more. |
| `endpoint` | string | no |  | Endpoint. |

## Actions

### `send-message`

**Send Message.** Publishes a message to an Amazon SNS topic, fanning it out to that topic's subscribers (email, SMS, HTTP/S, SQS, Lambda, etc.). Use to send a notification or alert through a pre-existing SNS topic; you must supply the target topic's ARN and the message body. Not idempotent — each call publishes a new message and delivers it again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topic` | string | yes |  | Topic. Select a topic. A value the product loads from the provider, such as an id; write the value itself. |
| `message` | string | yes |  | Message. |

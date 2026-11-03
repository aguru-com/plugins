# RabbitMQ

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-rabbitmq'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Rabbitmq Auth

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `host` | string | yes |  | Host. Host. |
| `username` | string | yes |  | Username. Username. |
| `password` | string | yes |  | Password. Password. |
| `port` | number | yes |  | Port. Port. |
| `vhost` | string | no |  | Virtual Host. Virtual Host. |

## Actions

### `sendMessageToExchange`

**sendMessageToExchange.** Publishes a JSON message to a named RabbitMQ exchange, optionally with a routing key that the exchange uses to route the message to bound queues. Choose this to emit an event into a pub/sub or topic-style topology where one exchange fans out to multiple consumers; use the send-to-queue action instead to push directly onto a specific queue. The target exchange must already exist (the call verifies it first). Not idempotent: each call publishes a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `exchange` | string | yes |  | Exchange. The name of the exchange to send the message to. |
| `routingKey` | string | no | `""` | Routing Key (Optional). The routing key to use when sending the message. |
| `data` | JSON | yes | `{"key":"value","nested":{"key":"value"},"array":["value1","value2"]}` | Data. The data to send. |

### `sendMessageToQueue`

**sendMessageToQueue.** Publishes a JSON message directly to a named RabbitMQ queue (default exchange), bypassing exchange-based routing. Choose this to enqueue work onto one specific queue for its consumers; use the send-to-exchange action when you need routing-key-based fan-out across multiple queues. The target queue must already exist (the call verifies it first). Not idempotent: each call enqueues a new message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `queue` | string | yes |  | Queue. The name of the exchange to send the message to. |
| `data` | JSON | yes | `{"key":"value","nested":{"key":"value"},"array":["value1","value2"]}` | Data. The data to send. |

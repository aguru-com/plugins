# `whatsapp` block

Same `with` shape as `sms`; the connector decides the wire protocol.

```yaml
- id: notify-whatsapp
  type: whatsapp
  with:
    connector-id: twilio-whatsapp
    to: '${ctx.params.phone}'
    body: 'Your code is ${ctx.code}'
  out: sendReceipt
```

## Output

The send record, as for `email`. `null` when an operator suppresses a `confirm`.

## On failure

Retried 5 times without sending twice. A number not on WhatsApp, or a closed 24-hour window, is an ordinary error: retried, then fails the run. There is no soft-failure result.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `connector-id` | string | yes |  |
| `to` | string | yes |  |
| `body` | string | yes |  |
| `signal` | string | no |  |
| `confirm` | boolean \| string | no |  |

## In wftest

It calls out, so wftest guards it: a test that reaches it fails unless a mock, an `expect-in` event or a post-run `called` assertion approves it. See [testing.md](../testing.md#mocks).

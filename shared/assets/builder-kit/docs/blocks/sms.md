# `sms` block

```yaml
- id: notify-phone
  type: sms
  with:
    connector-id: twilio-sms
    to: '${ctx.params.phone}'
    body: 'Your code is ${ctx.code}'
    signal: sms-replied # optional reply hook
  out: sendReceipt
```

`confirm`: see [operator confirmation](../yaml.md#operator-confirmation).

## Output

The send record, as for `email`. `null` when an operator suppresses a `confirm`.

## On failure

Retried 5 times without sending twice. There is no `fail-on-error`: a send the provider refuses fails the run after the retries.

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

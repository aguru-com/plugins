# `scm-attribute-message` block

Files an inbound email under a stakeholder its sender is not a contact of: a
third party (an invoicing system, a portal) delivering their document.

```yaml
- id: attribute-invoice
  type: scm-attribute-message
  with:
    message-id: '${ctx.email.messageId}'
    stakeholder: { emails: [{ value: '${ctx.supplierEmail}', is-primary: true }] }
  out: attribution # { stakeholderId }
```

- `stakeholder` takes the [`scm`](../yaml.md#scm) block's shape but is only looked up,
  never created: no match fails the block.
- The stakeholder's conversation keeps the email as document evidence only. It
  fills attachment slots; it cannot answer, consent, set reply channels or
  count as the stakeholder engaging.
- A live SCM run is signalled; none is started. The next run reads the email
  from history.

## Output

`{ stakeholderId }`, the stakeholder the email was filed under.

## On failure

Fails at once when no stakeholder matches, the message is not an inbound email in the run's org, or `message-id` is not a UUID. Backend outages are retried 5 times.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `message-id` | string | yes |  |
| `stakeholder` | object \| string | yes |  |

## In wftest

It calls out, so wftest guards it: a test that reaches it fails unless a mock, an `expect-in` event or a post-run `called` assertion approves it. See [testing.md](../testing.md#mocks).

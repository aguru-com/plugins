# `hitl` block

Human-in-the-loop pause: records an operator form and parks until the signal
fires.

```yaml
- id: review
  type: hitl
  with:
    signal: review-decision
    reason: Confirm the customer's address
    fields:
      - { name: address, type: text, label: Address, required: true }
      - { name: notes, type: textarea, label: Notes }
      - { name: count, type: number, default: 0 }
      - name: priority
        type: select
        label: Priority
        options:
          - { value: high, label: High }
          - { value: low, label: Low }
        default: low
    timeout: 7d
  out: decision
```

| `with` field | Required | Notes                                                                                                    |
| ------------ | -------- | -------------------------------------------------------------------------------------------------------- |
| `signal`     | yes      | The signal the operator's submission fires.                                                              |
| `reason`     | no       | Shown to the operator. Any length.                                                                       |
| `fields`     | no       | `text`, `textarea`, `number`, `select` (needs `options`); `label`, `required`, `placeholder`, `default`. |
| `timeout`    | no       | `ms` duration; on timeout `out` is `null` and the run continues.                                         |

`ctx[out]` receives the submitted payload, or `null` on timeout.

## Output

The submitted form values, or `null` on timeout.

## On failure

An invalid field, duration or reserved signal name fails the block. Without `timeout`, it waits until someone answers.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `signal` | string | yes |  |
| `reason` | string | no |  |
| `fields` | object[] \| string | no |  |
| `timeout` | string | no |  |

## In wftest

It runs for real in wftest; test it with a unit test rather than a mock.


## Used in

[04-scm-follow-up-escalation](../../templates/04-scm-follow-up-escalation/README.md), [05-record-request](../../templates/05-record-request/README.md), [09-document-intake](../../templates/09-document-intake/README.md)

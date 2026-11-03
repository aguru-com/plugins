# `billing` block

Subscription gating and Stripe meter events, placed explicitly in the flow.

```yaml
- id: gate
  type: billing
  with: { action: check-subscription }
  out: subscription

- id: enforce
  type: js
  with: { code: "if (!ctx.subscription.active) throw new Error('inactive subscription')" }

# ... main flow ...

- id: charge
  type: billing
  with:
    action: record-usage
    event: certificate.completion
    stripe-customer-id: '${ctx.subscription.stripeCustomerId}'
    metadata: { propertyId: '${ctx.params.propertyId}' }
  out: billed
```

| `with.action`        | Required                      | Optional                                                   | Output                                                                                                                                  |
| -------------------- | ----------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `check-subscription` | —                             | —                                                          | `{ active, status, stripeCustomerId }`. `active` is true for Stripe `active`/`trialing`; `status: none` when no Stripe customer exists. |
| `record-usage`       | `event`, `stripe-customer-id` | `description`, `event-id`, `stripe-secret-key`, `metadata` | `{ success, billingEventId, meterEventId?, meterValue, alreadyRecorded }`                                                               |

Without `event-id`, the idempotency key is `<runId>.<blockPath>`: activity
retries reuse it, and each loop iteration gets its own.

## Output

`check-subscription`: `{ active, status, stripeCustomerId }`. `record-usage`: `{ success, billingEventId, meterEventId, meterValue, alreadyRecorded }`.

## On failure

Retried 5 times. Usage is recorded once per `event-id` (default: the run and block path), so a retry never meters twice.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `action` | "check-subscription" \| "record-usage" | yes |  |
| `event` | string | no |  |
| `description` | string | no |  |
| `event-id` | string | no |  |
| `stripe-customer-id` | string | no |  |
| `stripe-secret-key` | string | no |  |
| `metadata` | object \| string | no |  |

## In wftest

It calls out, so wftest guards it: a test that reaches it fails unless a mock, an `expect-in` event or a post-run `called` assertion approves it. See [testing.md](../testing.md#mocks).


## Used in

[06-scheduled-sweep](../../templates/06-scheduled-sweep/README.md)

# `scm` block

Registers a typed need with the stakeholder communication workflow. This is
the field reference; concepts, conversation behaviour and authoring advice
are in the [SCM guide](../scm.md).

```yaml
- id: collect-certificate
  type: scm
  wait: true
  events: [message:outbound]
  with:
    stakeholder: { id: '${ctx.supplier.id}' }
    goal: Collect the signed gas safety certificate
    email:
      subject:
        template: '${ctx.params.supplierEmailSubject}'
        vars: { certificateName: '${ctx.certificate.name}' }
    impersonate:
      id: '${ctx.propertyManager.id}'
      from-name: '${ctx.params.emailFromName}'
      email-footer: '${ctx.params.emailFooter}'
      email-footer-vars:
        propertyManagerFirstName: "${ctx.propertyManager.firstName || ''}"
    slots:
      - name: certificate
        kind: attachment
        description: Once the inspection is complete, please reply with the signed certificate attached.
    outcomes: [[certificate]]
    timeout: 30d
  out: result
  do:
    - id: record-sent-message
      type: log
      with:
        message: '${ctx.event.data.subject}: ${ctx.event.data.bodyText}'
```

Block-level fields:

| Field          | Notes                                                                                                                                                    |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wait`         | `true` parks until the need ends and writes the result to `out`. Default `false`: `do` runs per event in the background.                                 |
| `one-need-per` | Expression appended to the need id (`<ref>.<id>#<value>`) so coexisting registrations are separate needs. Key on something stable across restarts.       |
| `events`       | Progress events delivered to `do`: omitted/`[]` none, `true` all, or a list of `need:buffered`, `need:activated`, `message:inbound`, `message:outbound`. |
| `do`           | Runs per event, sequentially in FIFO order, with the event at `ctx.event`. Terminal events always run.                                                   |
| `out` / `as`   | One or the other: `out` writes the result to the enclosing scope (with `wait: true`); `as` only names the binding inside `do`.                           |

`cancel-listeners: { when-filled: [slot, ...], blocks: ["ref.id", ...] }`
cancels matching active listening fibers at fulfilled callback delivery, including
their pending approvals. See [listener lifetimes](../scm.md#ending-listeners-when-a-result-arrives).

A non-waiting `scm` block inside a `loop` or another `scm` block's `do`
without `one-need-per` is rejected at import (`unkeyed-repeated-scm-need`).

`with` fields:

| Field           | Notes                                                                                                                                                                                                                                    |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `stakeholder`   | `{ id }`, `{ emails: [...] }` or `{ phones: [...] }`, plus optional name fields. Contacts are `{ value, is-primary }`.                                                                                                                   |
| `goal`          | Model-facing context; never shown to the recipient.                                                                                                                                                                                      |
| `label`         | How the recipient knows the request, at most 100 characters. Heads its section when one email covers several needs; defaults to `email.subject`, else a generated label.                                                                 |
| `slots`         | What to collect; see below.                                                                                                                                                                                                              |
| `outcomes`      | Alternative completion sets: non-empty arrays of declared slot names. Fulfilled when every gating slot in any one set is filled.                                                                                                         |
| `briefs`        | `{ name, value, description? }` said unprompted; hold the need open until conveyed.                                                                                                                                                      |
| `references`    | `{ name, value, description? }` used only to answer a question.                                                                                                                                                                          |
| `email`         | `{ subject, body?, must? }`. `subject`/`body` are a final string or `{ template, vars }`, where `vars` is a map or one expression yielding it; `must: true` needs `body`.                                                                |
| `whatsapp`      | Accepted and ignored: SCM conversations are email only.                                                                                                                                                                                  |
| `impersonate`   | `{ id, from-name?, email-footer?, email-footer-vars? }`: sender presentation only. There is no `from-email`; the connector's sender is always used.                                                                                      |
| `timeout`       | Duration until the need is abandoned.                                                                                                                                                                                                    |
| `deadline`      | Absolute deadline, alternative to `timeout`.                                                                                                                                                                                             |
| `follow-up`     | Reminder budget, geometric or `sequence` (not both), with `on-exhaustion: abandon \| hold \| escalate` and optional `weekdays`.                                                                                                          |
| `mode`          | `listen`: hear the stakeholder without conversing. `slots: []`, nothing to ask or tell, no `impersonate`, `events` including `message:inbound`, and a `timeout` or `deadline`; see the [SCM guide](../scm.md#listening-without-conversing). |
| `escalation`    | `{ mode: notify, steps: [{ after, email: { to, subject, body } }] }`. See below.                                                                                                                                                         |
| `history-scope` | `since-registration` admits only messages and files after registration.                                                                                                                                                                  |

**`email.subject` templates** resolve flat `${name}` placeholders from `vars`
(scalars) before registration; a missing variable fails registration. With
one active need its subject is used exactly; with several, the composer
merges them into one subject of at most 100 characters. Without one, SCM
writes its own.

**`escalation`** requires `follow-up.on-exhaustion: escalate` and a `timeout`
or `deadline` (an escalated need waits out its deadline). `escalate` without
`escalation` abandons at exhaustion. Each step's `after` is the gap from the
previous notification (the first from exhaustion); `body` is required, since
no composer writes it. Escalations are never parked for approval.

```yaml
timeout: 30d
follow-up:
  maximum-attempts: 5
  initial-interval: 2d
  backoff-coefficient: 1
  on-exhaustion: escalate
escalation:
  mode: notify
  steps:
    - after: 0d
      email:
        to: '${ctx.params.propertyManager.email}'
        subject: Work-order decision needed
        body: <p>The supplier has not responded. Please help resolve this.</p>
```

## Slots

| Field                  | Notes                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `name`                 | Key in the result's `slots` map.                                                                                          |
| `kind`                 | `string`, `number`, `boolean`, `date`, `enum`, `attachment`.                                                              |
| `description`          | **Recipient-facing**: the slot is asked for, and reminded about, in these words.                                          |
| `required`             | `false` asks without gating on the answer, chasing it, or abandoning over it. Without `outcomes`, `true` slots are ANDed. |
| `options`              | `enum` values.                                                                                                            |
| `default`              | See [SCM slot defaults](../yaml.md#scm-slot-defaults).                                                                              |
| `self-checks`          | Yes/no questions the extractor answers per proposed value; an unclear or negative answer becomes a clarification.         |
| `validate`             | wfexpr predicate over `value`. Requires `validate-description`.                                                           |
| `validate-description` | The sentence a refusal is built from — never the expression.                                                              |
| `must-be-future`       | `date` slots: reject past dates in replies.                                                                               |
| `mime-types`           | `attachment` slots. Default `application/pdf`, `image/*`.                                                                 |
| `quick-actions`        | `boolean`/`enum` one-click choices; see [Quick actions](../yaml.md#quick-actions).                                                  |

**Slot values are typed.** A `boolean` slot resolves to a real boolean, a
`number` to a number, `string`/`date` (ISO-8601)/`enum` to strings, and an
`attachment` to inbox metadata `{ id, filename, mimeType, size }` (never
model-supplied names). Compare with `=== true` and do arithmetic directly;
the same holds in wftest mocks. A proposed value of the wrong kind is
refused, never coerced.

**`validate` is fail-closed and model-blind.** A value the expression
rejects, a value of the wrong kind, or an expression that errors becomes a
clarification instead of a write. A `validate` that does not parse fails at
registration. The extractor never sees the expression; `self-checks` remain
the way to make the model weigh a judgement call. `validate-description` is
required because the refusal is worded from it, and only the author knows
whether an expression holds something internal (an allow-list of codes).

```yaml
slots:
  - name: epcUrl
    kind: string
    description: The official gov.uk EPC certificate URL
    validate: "value.startsWith('https://www.gov.uk/')"
    validate-description: the link must be on the official gov.uk register
```

**Optional slots in an outcome.** Mark a slot `required: false` to ask for it
alongside the gating ones without waiting on it. An outcome whose members are
all `required: false` gates nothing: the need is fulfilled at registration
and nobody is contacted.

```yaml
slots:
  - name: agencyArrangementAccepted
    kind: boolean
    description: Please confirm you are happy for us to arrange the inspection.
  - name: selectedService
    kind: enum
    required: false
    description: Please let us know which of the offered service options you would like.
    options: ['${ctx.services[0]}', '${ctx.services[1]}']
    default: '${ctx.services[0]}'
outcomes:
  - [agencyArrangementAccepted, selectedService]
```

**Result.** With `wait: true`, `ctx[out]` and the block's output marker hold
`{ needId, outcome, slots }`; the terminal event runs `do` first, after any
progress events queued ahead of it. Shape and outcomes: [SCM guide](../scm.md).

## SCM slot defaults

A default fills an unanswered slot **in the returned result only**. While the
need runs, the slot stays unanswered, so a required slot still needs an answer
for its outcome to complete.

- Any non-attachment slot may declare one, required or not.
- It must match the slot's `kind`, be one of an `enum`'s `options`, and pass
  the slot's `validate` — checked at registration. `must-be-future` checks
  replies, not defaults.
- A stakeholder answer always wins; the default applies wherever nothing was
  captured, including a slot asked about and given up on.
- With `outcomes: [[appointmentDate, selectedService], [certificate]]`, a
  certificate completes the second set and the result's `selectedService`
  takes its default. An abandoned need stays abandoned with defaults filled;
  a canceled need gets none.
- For a slot no outcome requires, the opening message asks for it and says
  what will be assumed. Required slots' defaults are never advertised as
  permission to skip.
- A defaulted slot arrives as `{ status: "filled", value, isDefaulted: true }`;
  check `isDefaulted` where assumed and stated must differ.

## Quick actions

```yaml
slots:
  - name: accepted
    kind: boolean
    description: Please confirm whether you are able to accept the work order.
    self-checks:
      - Did the supplier explicitly accept or decline the work order?
    quick-actions:
      heading: Do you accept the ${ctx.certificate.name} work order for ${ctx.address}?
      choices:
        - { value: true, label: Accept work order }
        - { value: false, label: Decline work order }
```

- A nonblank `heading` and at least one choice, each with a nonblank `label`.
  `boolean` values are real YAML booleans; `enum` values are strings from
  `options`.
- The heading is recipient-facing: it titles a single decision, heads each
  slot's buttons when an email carries several, and is the confirmation
  page's context — so name the subject in it.
- Buttons accelerate; the prose still asks and a free-text reply still works.
  A subset of values is allowed, but buttons read as the whole answer space,
  so offer every real answer unless steering is intended.
- **One declaration, two surfaces**: the email links and the stakeholder
  portal buttons come from the same declaration, retire together when the
  slot settles, and a press racing a click on the other surface is rejected
  as a duplicate.
- A decision answerable from the portal belongs here, not in a `stakeholder`
  block's `action`, which is wired to nothing.
- The email footer adds a "See all open requests" portal link when the
  stakeholder's party has a valid case grant. That is backend policy; the
  block cannot enable, word or scope it.

## Output

With `wait: true`: `{ needId, outcome, slots }`, each slot `{ status: filled|missing, value, isDefaulted }`. Without `wait`, nothing reaches the enclosing scope; `out` only names the event inside `do`.

## On failure

Fails without retry when the org's SCM is not configured (`ScmNotConfigured`), the stakeholder cannot be found, the same need is already live (`ScmDuplicateLiveNeed`), or a subject, body, default or escalation step is invalid. An error inside `do` fails the run with `wait: true`; **without `wait`, it is recorded and the run carries on.**

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

Block fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `cancel-listeners` | object | no |  |
| `wait` | boolean \| string | no |  |
| `one-need-per` | string | no |  |
| `events` | true \| ("need:buffered" \| "need:activated" \| "message:inbound" \| "message:outbound")[] | no |  |
| `as` | string | no |  |
| `do` | object[] | no |  |

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `stakeholder` | object \| string | yes |  |
| `goal` | string | yes |  |
| `label` | string | no |  |
| `history-scope` | "since-registration" | no |  |
| `email` | object \| string | no |  |
| `whatsapp` | object \| string | no |  |
| `slots` | object[] \| string | yes |  |
| `outcomes` | string[][] \| string | no |  |
| `briefs` | object[] \| string | no |  |
| `references` | object[] \| string | no |  |
| `timeout` | string | no |  |
| `deadline` | string | no |  |
| `follow-up` | object \| string | no |  |
| `escalation` | object \| string | no |  |
| `impersonate` | object \| string | no |  |
| `mode` | "listen" | no |  |

## In wftest

Always mock it. It is not guarded, so an unmocked `scm` block registers a real need. A mocked block writes the mock to `out` and skips `do`. See [scm.md](../scm.md).


## Used in

[03-scm-collect-info](../../templates/03-scm-collect-info/README.md), [04-scm-follow-up-escalation](../../templates/04-scm-follow-up-escalation/README.md), [05-record-request](../../templates/05-record-request/README.md), [06-scheduled-sweep](../../templates/06-scheduled-sweep/README.md), [09-document-intake](../../templates/09-document-intake/README.md)

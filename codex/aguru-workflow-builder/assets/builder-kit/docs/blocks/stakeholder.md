# `stakeholder` block

Records a stakeholder-facing business event on a case: the
`block:stakeholder` timeline marker, plus the case facts projected to the
read-model the portal and support console read. Concepts, audiences, access
and writing guidance: the cases guide.

```yaml
- id: notify-supplier
  type: stakeholder
  with:
    to:
      - { email: '${ctx.propertyManager?.email}', role: Property manager }
      - { id: '${ctx.supplierPartyId}', role: Supplier }
    case: '${ctx.caseRef}'
    type: '${ctx.certificate.name}'
    status: waiting-for-appointment-confirmation
    message: Agency requested appointment confirmation
    title: '${ctx.address} (renewal)'
    subject: property
    dueDate: '${ctx.params.dueDate}'
    next:
      - when: The supplier confirms
        result: The supplier books the inspection and sends the certificate when it is done.
  out: emitted
```

| `with` field    | Required     | Notes                                                                                                                          |
| --------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `to`            | yes          | A party id, `{ id, role? }`, `{ email, role? }`, or a list for a broadcast. See below.                                         |
| `case`          | yes          | Case ref. Mint once in the root workflow and thread everywhere; a divergent ref splits one item into two cases.                |
| `type`          | yes          | Case type. Latest-wins.                                                                                                        |
| `status`        | at case open | Business status; omitted on later updates preserves status and next.                                                           |
| `message`       | yes          | One sentence under the status headline.                                                                                        |
| `detail`        | no           | Second, fainter line.                                                                                                          |
| `title`         | no           | Case label. Preserve-when-absent.                                                                                              |
| `subject`       | no           | Singular noun the portal labels cases with ("Properties"). Preserve-when-absent; set it on the case-open emit. Unset: "Cases". |
| `dueDate`       | no           | ISO date or date-time the case should be resolved by. Preserve-when-absent; a later value reschedules.                         |
| `outcome`       | no           | `succeeded`, `failed` or `withdrawn`, on the emit that closes the case. See below.                                             |
| `outcomeReason` | no           | Why, in one sentence (≤ 500 chars). Read only beside `outcome`.                                                                |
| `next`          | no           | What happens next: a sentence, or `{ when?, result }` entries; `[]` says nothing follows. Latest-wins; see cases.  |
| `scmMessage`    | no           | `{ stakeholderId, messageId }` of the SCM message this row projects. See below.                                                |
| `action`        | no           | `{ id, label, signal }`. Recorded only; nothing wires it. Requires exactly one recipient.                                      |

**`to`.** Email entries are resolved to stable party ids by the block's own
trusted activity before the marker is recorded, so the marker and `out` carry
only ids; no `http` call is needed (the resolve endpoint is internal-only).
Address by email at case open, then read the ids off that emit's `out` and
thread them. Empty recipients are dropped; an emit addressing nobody records
nothing. `role` labels the party for support, is stripped from the portal,
and the first role per party wins.

**`status` and `next`.** A case-opening update requires non-empty `status`.
Later updates can omit it to add a timeline row without changing the case's
status or next steps. Such an update must omit `next` too. With status present,
next remains latest-wins: omitting it clears the stage's predictions. A missing
key or `undefined` counts as absent; empty strings and `null` are invalid
statuses. Timeline-only markers and `out` omit status; the timeline shows the
case's effective status at that point in history.

**`outcome`.** Without one, a case's outcome is read off the engine lifecycle
(completed → succeeded, cancelled/terminated → withdrawn, else failed), which
is wrong at both ends. So every exit that closes a case must say which:

- A run that _completes_ after the need went away (opt-out, source event
  cancelled) emits `withdrawn` — closed, rated neither success nor failure.
- A run that _completes_ having given up (handed to a human, ended without
  the thing it was opened for) emits `failed`.

`outcome` is preserve-when-absent; an operator can overrule it from the
console or the executions page.

**`outcomeReason`** is the only account of a failure a member sees (engine
errors are admin-only), so a closing `failed` emit should always carry one,
in the language of the work: "The supplier did not return the certificate
after three reminders." It is stored with its `outcome`, including as none: a
later `succeeded` never inherits an earlier failure's reason.

**`scmMessage`** links a case row to its SCM message: an emit inside an `scm`
block's `do` passes `ctx.event.data` of a `message:inbound`/`message:outbound`
event (extra fields ignored). The support timeline renders a "View in SCM"
link from it. Empty or absent records nothing; a half-filled value fails the
block. Portal-stripped.

Bounds on `next` and `outcome` values mirror the backend's and fail the block
at resolve time rather than at projection.

## Output

The recorded event, with every recipient resolved to a party id. When no recipient remains, nothing is recorded and `out` is not written.

## On failure

An `action` with more than one recipient fails the run. Resolving parties and projecting the case are retried 5 times.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `to` | string \| object \| one of several shapes[] | yes |  |
| `case` | string | yes |  |
| `type` | string | yes |  |
| `status` | string | no |  |
| `message` | string | yes |  |
| `detail` | string | no |  |
| `title` | string | no |  |
| `subject` | string | no |  |
| `dueDate` | string | no |  |
| `outcome` | string | no |  |
| `outcomeReason` | string | no |  |
| `next` | string \| object[] | no |  |
| `scmMessage` | object \| string | no |  |
| `action` | object \| string | no |  |

## In wftest

It runs for real in wftest; test it with a unit test rather than a mock.

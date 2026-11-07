# SCM — a workflow author's guide

The Stakeholder Communication Module (SCM) holds a conversation with one
external person on a workflow's behalf. It is an engine capability, like
`http`; the examples below are one project's choices. Schema: the
[YAML reference](yaml.md#scm). Internals: the engine README.

There is **one conversation per stakeholder**. Every workflow wanting
something from that person registers a **need** with it, and all open needs
share one thread: one message asks for everything, one reply can answer
several needs, one reminder chases them all. A need declares what to learn
(**slots**), tell (**briefs**) and say only when asked (**references**), what
counts as done (**outcomes**), and when to give up (**deadline**,
**follow-up**). The SCM writes and times every message and returns one
result.

## Before you start

An `scm` block fails with `ScmNotConfigured` unless the organization's SCM
configuration (Conversations page, Settings tab) names an **LLM connector** and an
**email connector**. Other settings, each overridable per stakeholder:

| Setting                                | Default        | Effect                                                     |
| -------------------------------------- | -------------- | ---------------------------------------------------------- |
| Require approval for composed messages | **on**         | Composed asks, replies and reminders wait for an operator. |
| SMS connector                          | none           | None: SCM conversations are email only.                    |
| WhatsApp connector, preferred channel  | none / email   | None: SCM conversations are email only.                    |
| Need buffer (quiet / maximum)          | 5 s / 30 s     | New needs wait this long so one message carries them all.  |
| Reply buffer (quiet / maximum)         | 5 min / 15 min | Inbound messages wait this long to be read as one turn.    |
| Conversation message limit             | 50             | How much stored history a fresh conversation reads.        |

**Approval is the usual reason a new workflow "does nothing":** the message
waits in the Approvals queue, and so does every reminder. Configured bodies and
escalations are never held. Buffers delay the first email and the
reading of each reply; shorten them when latency matters more than batching.

## The `scm` block

```yaml
- id: wait-for-decision
  type: scm
  wait: true # park until the need ends; default false
  with:
    stakeholder: { emails: [{ value: 'supplier@example.test', is-primary: true }] }
    goal: Obtain the supplier's decision on work order WO-2026-3101
    email:
      subject: { template: '${ctx.params.subjectTemplate}', vars: { ref: WO-2026-3101 } }
    impersonate: '${ctx.senderProfile}' # one profile, built in the root workflow
    slots:
      - name: workOrderAccepted
        kind: boolean
        description: Please confirm whether you can accept work order WO-2026-3101 for 34 Example Road.
        self-checks:
          - Did the supplier explicitly accept or decline work order WO-2026-3101?
          - Is the value true for acceptance and false for refusal?
          - Is this a decision rather than an acknowledgement or a question?
        quick-actions:
          heading: Do you accept work order WO-2026-3101 for 34 Example Road?
          choices:
            - { label: Accept work order, value: true }
            - { label: Decline work order, value: false }
    outcomes: [[workOrderAccepted]]
    timeout: 30d
  out: decision
```

- Keep subject and body templates in params or configuration. Their
  `${name}` placeholders are filled from `vars`; written inline in YAML they
  would be evaluated as workflow expressions first.
- Any `with` value may be a whole-string `${...}` expression, so a
  stakeholder, briefs array or sender profile can be built once and passed in.

## Authoring a need

### Stakeholder and contacts

A stakeholder is an organization-scoped record shared by every project. The
block resolves or creates it and re-syncs the contacts you author each run.
Creating one needs at least one email.

- **The sender address decides who is talking.** Mail from an unregistered
  address never reaches a conversation, and every registered one, a shared
  mailbox included, speaks as the stakeholder. Register every address and
  phone the person may reply from, as non-primary contacts. One added later
  brings its stored mail, understood only then.
- A contact another stakeholder owns is left off and listed as
  `contactsOwnedElsewhere` on the block's timeline marker.

### Outbound email recipients

`email.recipient-policy` defaults to `latest-reply`: the newest replying registered
address, otherwise primary, otherwise first. `primary-only` always uses the
explicitly primary contact and holds delivery when none exists. All registered
addresses remain valid inbound senders. A combined email applies `primary-only`
if any need it speaks for requires it; templates and reminders apply only the
needs they address. Copies exclude that stakeholder's secondary addresses under
this policy, while explicit third-party CCs and escalation destinations remain.

A missing-primary delivery uses the outbound approval hold, including templates
and reminders. Set the primary on the stakeholder, then approve to retry. Approval
refreshes contacts and cannot bypass the policy. No delivery or reminder attempt
is recorded until the send succeeds. Inbound evidence can supersede a held draft
and settle the request; its original deadline still applies.

### Need identity and `one-need-per`

A need's id is the block's durable name, `<definition ref>.<block id>`. It
survives re-nesting the block within its definition, so a restarted caller
re-registers the same need; moving it to another definition makes a new one.

The id does not vary per loop iteration. A `wait: true` block settles each
pass before the next registers. A non-waiting block in a `loop` or another
`scm` block's `do` keeps several passes live, so they need `one-need-per`:

```yaml
- id: wait-supplier-decision
  type: scm
  one-need-per: '${ctx.supplier.id}' # → <ref>.wait-supplier-decision#sup-42
```

If you cannot finish "one need per \_\_\_", you do not need it.

- **Key on the thing, not the position.** The value must survive a restart:
  `params` or ctx derived from them, never a uuid, timestamp or model output.
  A loop index is right only when position is the identity.
- Import rejects an unkeyed repeated block (`unkeyed-repeated-scm-need`);
  wftest also flags one whose _caller_ repeats it, such as a subflow called
  twice. Both flag a safe fan-out over distinct stakeholders too; declare
  `one-need-per` there. A run-time collision fails with `ScmDuplicateLiveNeed`.
- It separates **coexisting** needs only; asking again later needs nothing.

### Goal and descriptions

`goal` is context for the model: what the need is about and what "done"
means. The recipient never sees it, and facts folded into it may go unsaid;
put those in briefs. A slot's `description` defines the request the writer
phrases naturally, avoiding redundant summaries of the facts rendered from briefs.
A request may reuse a fact when it explains the new information required, such
as the next inspection date that must appear on a certificate. Write the
polite request you would send yourself, rather than instructions to the writer.
Without one, the name is used and reads as a form field.

A brief renders as `label: value`. Its `description` is the label only when it
is a short phrase (32 characters at most, no full stop), such as `Due date` or
`Landlord (name on certificate)`; anything longer is treated as guidance for the
models, and the label comes from the brief's `name` (`inspectionTiming` →
"Inspection timing"). A brief's value goes to the recipient verbatim, so it must
never be an instruction to the writer; say what is needed in the slot
description instead. The only markup a value may carry is `<strong>`, which
renders bold in email and is dropped elsewhere.

### Self-checks and `validate`

A `self-check` is a yes/no question the extractor must answer, with a
rationale, before filling the slot; a "no" becomes a clarification to the
stakeholder. Extraction rules live here, not in the description. A vague
check gets a vague answer.

- **Name the subject in three places**: the distinguishing reference (order
  number, case id, address, date range) in the `description`, a `self-check`
  ("Is that decision about work order WO-001?") and the quick-action
  `heading`. [Catch-up](#catch-up) reads all history, so otherwise "I
  accept" from last year's renewal satisfies this year's need.
- **Reject politeness.** "Thanks, received", "we'll take a look", a question,
  or a date without agreement fits any answer. Say it is not an answer.
- **Pin the value mapping**: "true for acceptance and false for refusal".

`validate` is a [wfexpr](wfexpr.md) predicate over `value`, checked by the
engine with no model. Use it for mechanical rules (prefixes, ranges, formats)
and `must-be-future` for dates (one hour of tolerance); keep `self-checks`
for judgement. A `date`
slot is text: only `must-be-future` parses it, so add `validate` if you need
the format guaranteed.

`validate-description` is required with `validate` and is the only wording a
refusal is built from. Write it to the person: "the code must be one already
on file for this property", not "checks the code against the approved list".

### Caller-owned document validation

Use `document-validation: caller` on an attachment slot when the calling
workflow validates the original before its business effects. SCM collects a
candidate of the requested kind for the property using inspected content
metadata. A filled slot means received, not accepted. Omit SCM `self-checks`
and `validate` on that slot; dates, inspection verdicts, amounts and correction
success belong to the caller. Detected MIME, inbound ownership, registration
windows, operator precedence and shared safety checks still apply. Original
file input remains available to registrations that retain SCM content validation.

### Outcomes

The need is fulfilled when every slot in any one `outcomes` set is filled.
Without `outcomes`, every `required: true` slot must be.

- **Only gating slots are asked**: those in an outcome (or `required: true`
  without outcomes) plus slots with a `default`. Reminders chase only required
  answers; other slots are recorded only if volunteered. Mark a slot
  `required: false` to ask without waiting on it.
- **List genuine alternatives as separate outcomes**
  (`[[appointmentDate], [declined]]`); reminders then ask for "a date or a
  decision" instead of everything.
- **Prefer one decisive slot to one per possibility.** Mutually exclusive
  answers go in one `boolean` or `enum`. Separate "accepted" and "date"
  outcomes let a date without agreement settle the need.
- **An outcome fires on any value**, `false` included, so "if they accept,
  also get a date" is a second need registered after the first resolves. It
  joins the same conversation.
- Defaults fill the result, never completion ([defaults](yaml.md#scm-slot-defaults)).

### Briefs and references

Both are `{ name, value, description? }`. Choose by asking: **do I want this
said unprompted?**

|              | Goes out unasked | Holds the need open | Answers a question |
| ------------ | ---------------- | ------------------- | ------------------ |
| `briefs`     | yes              | yes                 | yes                |
| `references` | no               | no                  | yes                |

**Briefs** go in the first message. A brief-only need completes once every
brief is conveyed. Once an outcome is met, even by a click on the first email,
unconveyed briefs are waived: a fact needed before answering belongs with the
question; a fact needed whatever the answer belongs in a brief-only need.

**References** may answer a question but are never raised; a question nothing
in the needs covers is held for an operator. A price list, for example, is a brief
on needs asking the landlord to decide and a reference elsewhere: owed to a
landlord who asks, an invitation to object otherwise. The guards are
deterministic (details):

- **Write the value as a complete answer.** It is quoted verbatim or the turn
  is held. A paraphrase that rounds a figure slips past the guards.
- **Only a question the stakeholder wrote unlocks it.** An outgoing message
  containing an unasked value is held.
- **A value also declared as a brief is exempt**, since it is owed.
- **Make same-named references distinguishable.** A question that does not
  single out one need's `price` is held, not answered from the wrong one.
- **Only your workflow's wording.** References are trusted context;
  stakeholder text in one bypasses the untrusted-input fence.

### Quick actions

`boolean` and `enum` slots may offer `quick-actions`, one-click choices in the
email and the portal. The prose still asks and a reply still works.

- **Offer every real answer, or none.** Buttons read as the whole answer
  space; only "Accept" steers. A deliberately partial set is fine (one project's
  objection window offers only "I'll arrange it myself"), but write
  `self-checks` for every value, or the omitted one cannot be given in words.
- **Buttons expire** after seven days or at the need's deadline, whichever is
  sooner. A `timeout` shorter than the follow-up ladder leaves later reminders
  without buttons.
- **Open the case first.** The portal link appears only once the stakeholder
  has an open case, so emit the [`stakeholder` block](yaml.md) before the
  need. A decision answerable from the portal belongs in `quick-actions`, not
  a `stakeholder` block's `action`.

### Configured body

`email.body` (string or `{ template, vars }`) is sent verbatim as the opening
email instead of a composed one, under the declared `email.subject`, which a
`body` therefore requires. `must: true` gives the need an email of its own and
requires `body`.

- Verbatim only in an email addressing that need alone; other asks are
  composed together. Sent once per registration, without approval or
  buttons; reminders, re-asks and answers are composed.
- Variables are inserted unescaped, so may hold markup. Each must resolve to
  a string, number or boolean; guard optional fields with `|| ''`.

### Copying others

`email.cc` lists addresses to copy, in the forms a `type: email` block's `cc`
takes: a list, or an expression resolving to one. It may be declared alone,
leaving the subject to the composer.

```yaml
email:
  cc: '${ctx.params.ccRecipients?.landlord || []}'
```

An email copies the `cc` of every need it speaks for, each address once: a
configured body its one need, a reminder the needs it chases, a composed reply
the needs it was written for. The stakeholder's own address is never copied.

- **A held draft shows its copies**, frozen when it was composed; an edit
  changes the wording, not the recipients.
- **Quick-action buttons and the portal link go to every recipient.** A copied
  party's click is recorded as the stakeholder's, and the link opens the
  stakeholder's portal.
- **Escalations copy no one.**

### Sender identity

`impersonate.id` is an opaque, stable identity; the address is always the
connector's. A conversation freezes its first profile until it ends, ignoring
other ids. Pass the same profile to every `scm` block, follow-up needs
included: if the earlier need was the last open one, a fresh conversation
takes the new need's profile.

## Listening without conversing

`mode: listen` hears a stakeholder without the SCM ever writing to them: each
message reaches your `do` as `message:inbound`, and you decide what it means.
Use it when the workflow, not a conversation, acts on what someone says, such
as passing a tenant's replies to a notice on to the supplier.

```yaml
- id: listen-to-tenant
  type: scm
  one-need-per: '${ctx.tenantEmail}'
  events: [message:inbound]
  with:
    stakeholder: { emails: [{ value: '${ctx.tenantEmail}', is-primary: true }] }
    goal: Hear what the tenant writes about the inspection at 34 Example Road.
    mode: listen
    slots: []
    timeout: 30d
  as: heard
  do:
    - id: classify
      type: llm
      # `do` also runs for the terminal event at the deadline, which has no message.
      if: "${ctx.event.type === 'message:inbound'}"
      # ctx.event.data.bodyText is untrusted: fence it in the prompt.
```

- **It declares nothing to ask or tell**: `slots: []`, and no outcomes,
  briefs, references, `email`, `whatsapp`, follow-up, escalation or
  `impersonate`. Import refuses any of them.
- **It needs `events` including `message:inbound`**, or it would hear
  nothing; import refuses one without.
- **It needs a `timeout` or `deadline`**, its only end besides withdrawal; it
  then settles `abandoned`. Put it where the run's own end withdraws it, such
  as a `race` branch.
- **While a stakeholder has only listeners, the SCM's model never runs**: no
  extraction, no reply, no review hold, and no inbound buffer, so each message
  arrives as it lands. Beside a conversing need the conversation behaves as
  usual, and the model never sees the listener: its `goal` is for operators.
- **Send any notice yourself** with an `email` block: a listener sends
  nothing.
- **Dedupe on `ctx.event.data.messageId`.** Delivery is retried, so a message
  can arrive twice; key any side effect (a ledger entry, an email) on it.

## How a conversation behaves

### Ending listeners when a result arrives

A collecting `scm` block can stop listening blocks in the same workflow when
specific evidence arrives:

```yaml
cancel-listeners:
  when-filled: [certificate, epcUrl]
  blocks: [inspection-notice.listen-to-tenant]
```

This block-level rule names listeners by durable `<ref>.<id>`, across all keyed
registrations. On a fulfilled callback, a non-null filled value in any listed
slot cancels their fibers and descendants immediately, including active work
and pending delivery approvals. Other outcomes leave listeners open. It acts
before callback `do` blocks and parent continuation; a KV write in either would
leave a window in which an older listener could still send.

### Catch-up

On first contact and whenever a need arrives, one model pass reads the whole
conversation, stored history included, and works out which slots are already
answered, which asks went out and which briefs were conveyed. It is skipped
when the stakeholder has never written. A need can therefore resolve without
sending anything, and an unpinned need can be satisfied by a reply to an
earlier request: [name the subject](#self-checks-and-validate). Set
`history-scope: since-registration` to admit only later messages and files,
for a replacement request whose earlier submission was rejected. Only files
the stakeholder sent are ever read.

### Asking and reading replies

If anything is owed, the SCM sends **one** message covering every active
need's unasked gating slots and briefs. One need's subject is used exactly;
several are merged into one of at most 100 characters.

Each proposed value passes deterministic guards: kind, `options`,
`must-be-future`, `mime-types`, `validate`, every `self-check`, and evidence
checks. A failure becomes a clarification. After three on one slot it is
marked unavailable, and a need whose every outcome needs an unavailable slot
is abandoned. A value from a click or an operator is never overwritten by the
model alone: a stakeholder value that conflicts with it holds the turn for an
operator.

A need settles as soon as an outcome is met, before any reply is composed, so
the last answer gets no closing acknowledgement. When the last need settles
the conversation ends; the next starts fresh, with the inbox as its memory.

### Follow-ups

Each need chases silence on its own `follow-up` budget; one reminder may
speak for several. Declare exactly one form:

- **Geometric**: `initial-interval` after the unanswered ask, times
  `backoff-coefficient` each time, capped at `maximum-interval`, for
  `maximum-attempts` nudges. Default with no policy: 1d, 2d, 4d, abandon.
- **Sequence**: one nudge per item, for chases tied to a date ("three days
  before the certificate is due, then every three days"). A duration
  ([`ms`](https://github.com/vercel/ms)) counts from the previous nudge, the first from the ask.

```yaml
follow-up:
  sequence: [2026-09-07, 3d, 3d] # date: 00:00 UTC; date-time needs an offset
  weekdays: [mon, tue, wed, thu, fri] # other days slip forward (UTC)
  on-exhaustion: hold
```

When the budget is spent, `on-exhaustion` applies: `abandon` (default) ends
the need, `hold` waits for the deadline, `escalate` [escalates](#escalation)
and waits. A geometric ladder is spent one interval after its last nudge
(`5 × 2d`: last reminder day ten, spent day twelve); a sequence right after
its last. An empty sequence never nudges: with `hold` the need listens until
its deadline, with `abandon` it ends once its ask is sent.

- An engaged reply resets the ladder; an automatic reply does not.
- "Stop contacting me" halts reminders and new asks until they engage again
  or an operator writes.

**Give every need a `timeout` or `deadline` you mean.** It abandons the need
whatever the ladder does, once the conversation is free of holds and
buffers. Without one or a policy, a need ends after about eleven silent days.
Pair a long deadline with `hold` when the workflow wants the full window
(a certificate chase, for example: 45 days, five nudges two weekdays apart); use
`abandon` when silence should end the branch soon. For a demo, use minutes
and seconds, as the overload example does. Clock details:
follow-ups.

### Escalation

`on-exhaustion: escalate` emails the `escalation` steps ([schema](yaml.md#scm))
once the budget is spent. The need then ends only at its required `timeout`
or `deadline`, so give the contacts a window you mean.

- **`after` is a gap.** The first step counts from the budget running out,
  each later one from when the previous went out. `5 × 2d` with steps `0d`
  and `7d`: last reminder day ten, first escalation day twelve, second day
  nineteen.
- **A need escalates once.** After the first step a reply does not restart
  reminders and the remaining steps still go out. An answer still settles the
  need and drops them.
- It is outside the stakeholder conversation and raises no
  `message:outbound`, so a `do` filing outbound mail never files a third
  party's. Operators see the need as **Escalated**.

### Channels

Conversations are email only. An SMS or WhatsApp reply is read like any other
and answered by email; a need's `whatsapp` templates are accepted and ignored.

## Getting the answer back

```yaml
needId: example-workflow.wait-for-decision
outcome: fulfilled # fulfilled | abandoned | canceled
slots:
  workOrderAccepted: { status: filled, value: true }
  accessNotes: { status: missing } # no `value` key
  parkingBay: { status: filled, value: visitor, isDefaulted: true }
```

- `fulfilled`: an outcome was met, or a brief-only need conveyed every brief.
- `abandoned`: the deadline passed, the budget ran out with `abandon`, or the
  stakeholder cannot provide a slot every remaining outcome needs. Slots
  filled before then are still reported.
- `canceled`: an operator withdrew it or the conversation was cancelled.
- Check `isDefaulted` where an assumed value must not pass for a stated one.
- Values are [typed](yaml.md#scm): compare booleans with `=== true`. Guard
  every slot with `?.`.

**Normalize once, right after the block**, so outcome branching lives in one
place:

```yaml
- id: read-decision
  type: js
  with:
    code: |
      const r = ctx.decision;
      return { accepted: r.outcome === 'fulfilled' && r.slots.workOrderAccepted?.value === true };
  out: supplier
```

With `wait: true` the workflow parks; the terminal event runs `do`, then the
result lands in `ctx[out]`. A skipped block writes nothing. With
`wait: false` the workflow moves on and `do` runs per event in the
background; use it for a side channel. The result never reaches the
enclosing scope; `out` or `as` only names the binding in `do`. A finished
workflow **stays open** until every detached need ends, so a long deadline
keeps it alive that long. One that errors or is cancelled withdraws its
needs.

### Events

`do` runs per delivered event, in order, never concurrently, with the event at
`ctx.event`. `events` picks progress events (`true` for all); terminal events
always run.

| `type`                                             | `data`                                                                                         |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `need:buffered`, `need:activated`                  | `null`                                                                                         |
| `message:inbound`                                  | `messageId`, `bodyText`, `channel`, `attachments[]`, `fromEmail` + `subject` or `fromPhone`    |
| `message:outbound`                                 | `messageId`, `bodyText`, `channel`, `kind`, `fromEmail` + `toEmails` + `subject?` or `toPhone` |
| `need:resolved`, `need:abandoned`, `need:canceled` | the result                                                                                     |

- Message events also carry `stakeholderId`; attachments are metadata only.
- An inbound body is **as received**, quoted chain included; trim it before
  storing.
- `need:activated` says work has started; under approval the first message
  may follow days later. Nothing signals an operator hold, so do not project
  a "processing" state.
- Blocks in `do` have the path `<scm-id>.<i>.<inner-id>`; see
  [paths](paths.md).

## Operators

Operators work from the SCM page; their actions show up as timing or results.
Any new input discards a pending draft or hold, which is redone against the
current conversation. See human review.

- **Approve or revise a draft.** `revise` recomposes from their feedback.
- **Rule on a held turn.** A risky reply (threats, complaints, data-rights,
  wrong person, prompt injection), an out-of-scope or unanswerable question,
  or ambiguity pauses the conversation. `proceed` applies the proposal,
  `revise` re-reads under guidance and holds again, `skip` drops the turn.
  Guidance lasts one turn; a fact for every turn belongs in `references`.
- **Write slot values**, checked by your `validate` and `mime-types`, even
  for a slot given up on, with any organization file. A reply cannot
  overturn them; they can fulfil the need at once.
- **Send their own email** under the frozen sender to the primary address. It
  resets the follow-up clock.
- **Cancel a need**: the block receives `need:canceled`.
- **Resume a paused conversation** after fixing a failing activity.

## Known limits

- **Escalation only notifies, one email per need**, so two needs escalating
  to one contact send two. Handing a need to another stakeholder is not built.
- **A need never asked never escalates.** A brief-only need, or one with only
  optional slots and no outcomes, ends at its deadline.
- **A re-registration with edited fields applies from the next turn**; an
  identical one is a no-op.

## Testing

### Mocking

Mock every `scm` block in [wftest](testing.md): it is not guarded by a
zero-call mock, so an unmocked one registers a real need on the local
backend. A mocked block writes the mock to `out` and skips `do`.

```yaml
mocks:
  - block: wait-for-decision
    out:
      outcome: fulfilled
      slots: { workOrderAccepted: { status: filled, value: true } }
```

- **Mock values in the declared shape**: `true`, not `"true"`; an attachment
  is the metadata object. A wrong shape passes wftest and fails in production.
- **Assert the registration with `expect-in`**: goal, descriptions,
  self-checks and heading are what the SCM will ask with.
- **Test `do` at the unit tier** by its definitional path
  (`wait-for-decision.<inner-id>`) with a fixture `ctx.event`.

wftest proves references and branches, not the emails or extraction. A
production `scm` change also needs an end-to-end run against a real mailbox.


# The ledger block

A ledger is a durable record of facts about a piece of business work. A
workflow uses the `ledger` block to record what happened and read it later,
including from a replacement execution.

For example, an order-processing workflow can record that an order was
approved, which warehouse accepted it, and the external reference returned
when it was dispatched. A later execution can recover those facts instead
of asking for the decision again or losing the dispatch reference.

Entries are **append-only**: once recorded, a fact cannot be edited. A
correction or a later decision gets a new entry. Repeating the same entry
with the same content returns the original record; using its key for
different content fails rather than overwriting it.

Your project chooses what the facts mean and what JSON they contain. The
ledger works equally well for orders, inspections or another business process.
Its storage is independent of any external destination.

You can also use those facts to update another system. For example, the ledger
records an order approval and a **projection** updates the order service's
view of that approval. Your project defines the projection as an ordinary YAML
subflow: read the facts, build the destination's request and check its response.
See [YAML projections](#yaml-projections) for a complete subflow and how to call it.

Most workflows need only `open`, `append` and reads. **You do not need to
claim a ledger to use it.** Claims are an advanced, optional way to restrict
writes when different workflow IDs or platform callers share the same work.

## Choose which work and which fact you are recording

Two names make a record recoverable:

- **Scope** identifies one piece of business work, such as `order-42`.
  Reuse it when retrying or replacing that work. A genuinely new order or
  inspection needs a different scope.
- **Entry key** identifies one fact within that scope, such as
  `order-approved`. Reuse it when recording the same fact again. A later
  approval revision needs a new key, such as `order-approved-v2`.

The organisation and project are supplied by the running workflow's trusted
installation context. The same scope name in another organisation or project
addresses a different ledger. You do not put organisation or project IDs in
ledger block inputs.

Choose a scope the business process can recover. A run ID or replacement
execution suffix changes when the workflow changes, so it is unsuitable for
identifying the same piece of work across executions.

## Basic use cases

### Record a decision

Open the scope explicitly, then append a fact. Opening the same scope again
is safe and returns the existing ledger. It does not clear its contents.

This complete workflow records an order approval:

```yaml
ref: approve-order
kind: workflow
params:
  orderId: string
  warehouseRef: string
blocks:
  - id: open-ledger
    type: ledger
    with:
      action: open
      scope: '${params.orderId}'

  - id: record-approval
    type: ledger
    with:
      action: append
      scope: '${params.orderId}'
      key: order-approved
      payload:
        status: approved
        warehouseRef: '${params.warehouseRef}'
    out: approval
return: '${ctx.approval.entry.payload}'
```

`payload` is the project's fact. `out: approval` makes the ledger response
available as `ctx.approval`; its `entry.payload` holds the recorded value.

If the workflow repeats the append with the same warehouse reference, it
gets the original entry with `duplicate: true`. If it repeats `order-approved`
with a different warehouse reference, it gets a conflict. To record a real
change, append a new entry describing that change. Existing facts stay intact.

Keep the content of a retried fact stable. Adding the current time or a
random value to each attempt makes those attempts different facts.

### Recover facts in another execution

A replacement workflow opens the same scope and reads the keys it needs.
These blocks can run in a workflow with the same `orderId` parameter:

```yaml
- id: open-ledger
  type: ledger
  with: { action: open, scope: '${params.orderId}' }

- id: recover-approval
  type: ledger
  with:
    action: get
    scope: '${params.orderId}'
    keys: [order-approved]
  out: saved

- id: show-approval
  type: log
  if: '${ctx.saved.missing.length === 0}'
  with:
    message: 'Approved warehouse: ${ctx.saved.entries["order-approved"].payload.warehouseRef}'
```

`get` returns an `entries` map indexed by ledger key and a `missing` list
for keys it did not find. Each map value is the full entry, including its
`payload`, ID and revision. Repeated requested keys produce one map entry;
if no keys are found, `entries` is `{}`. The `missing` list contains each
absent key once, in first-request order. Check it before using an entry. A failed read is an error; it must not be interpreted
as an absent fact.

Use `check` when you only need to know whether facts exist:

```yaml
- id: check-milestones
  type: ledger
  with:
    action: check
    scope: '${params.orderId}'
    keys: [order-approved, dispatch-confirmed]
  out: milestones
```

`ctx.milestones.checks` contains one `{ key, has }` result per requested key,
in request order. It does not load the payloads.

### Keep a result from an external action

An external service might return a document ID, message ID or dispatch
reference. Append that result so another execution can recover it:

```yaml
- id: record-dispatch
  type: ledger
  with:
    action: append
    scope: '${params.orderId}'
    key: dispatch-confirmed
    payload:
      dispatchRef: '${ctx.dispatch.body.id}'
  out: receipt
```

Here `ctx.dispatch` is the output of an earlier successful HTTP block, and
the scope has already been opened. Check the service's response before
recording confirmation. Store document references rather than document bytes.

The ledger does not send the request or prevent it being repeated. If the
external action succeeds and the workflow crashes before this append, a
missing receipt does not prove that the action failed. Use the connector or
provider's duplicate protection or result lookup to recover safely. The
ledger's duplicate-key protection applies to recording the fact itself.

### Mark the business work complete

Record completion just like any other business fact:

```yaml
- id: complete-order
  type: ledger
  with:
    action: append
    scope: '${params.orderId}'
    key: order-completed
    payload:
      status: complete
      reason: Order fulfilled
```

The project defines what completion means. Recording it preserves all earlier
facts and allows later facts, such as a correction or follow-up, to be appended.
A workflow finishing, failing or being cancelled does not change the ledger.

### Handle a failed ledger call

By default, a ledger error fails the block. To handle it in your workflow, set
`with.fail-on-error: false` and name an `out-error` variable beside `out`:

```yaml
- id: record-approval
  type: ledger
  out: approval
  out-error: approvalError
  with:
    action: append
    scope: '${params.orderId}'
    key: order-approved
    payload:
      status: approved
    fail-on-error: false

- id: handle-conflict
  type: log
  if: '${ctx.approvalError != null}'
  with:
    level: warn
    message: 'Approval was not recorded: ${ctx.approvalError.message}'
```

If the entry key already contains different content, the call fails without
changing the original fact. The workflow receives `null` in `ctx.approval`
and `{ message }` in `ctx.approvalError`, then continues. The same mechanism
handles other ledger call errors. Use the error branch to recover, read the
existing fact or ask for review; do not treat a failed read as an empty ledger.

On success, `out-error` is set to `null`. An equivalent duplicate is a success
with `duplicate: true`; missing entry keys are normal read results. A block
skipped by `if` leaves both variables untouched, so consider stale errors in
repeating contexts. Give `out` and `out-error` different names.

Suppression happens after activity retries finish. Cancellation, invalid
block parameters and failures to record workflow history still propagate.
Suppressed call failures retain an error marker in execution history.

## YAML projections

A projection reads ledger facts and presents them in another system: for
example, an order status page or an asset register. The ledger block provides
the storage and reads; it does not run or schedule projections. Your project
implements a projection as an ordinary YAML subflow using blocks such as
`ledger` and `http`, and calls that subflow explicitly.

The `parallel` block is optional. It lets a projection run alongside other
work; it does not provide the projection itself. The direct-call example below
works without it. The ledger remains the record of facts even if updating the
external view fails.

The ledger stores your project's payload; the projection interprets it. An
order project might send an approval to an order service, while an inspection
project turns sensor observations into an asset-register update. Each project
chooses its own fields, destination, configuration and credentials. A project
can use the ledger without any projection, or define several projections of
the same facts for different destinations.

### Declare a projection subflow

Save this as a separate project file, `project-order-approval.yaml`. It reads
the approval recorded in the basic example and sends it to an approvals API:

```yaml
ref: project-order-approval
kind: subflow
params:
  scope: string
  entryKey: string
blocks:
  - id: read-approval
    type: ledger
    with:
      action: get
      scope: '${params.scope}'
      keys: ['${params.entryKey}']
    out: facts

  - id: update-approval
    type: http
    if: '${ctx.facts.missing.length === 0}'
    with:
      method: POST
      url: '${config.approvalsBaseUrl}/approvals'
      headers:
        Idempotency-Key: '${ctx.facts.entries[params.entryKey].id}'
      body:
        orderId: '${params.scope}'
        status: '${ctx.facts.entries[params.entryKey].payload.status}'
        warehouseRef: '${ctx.facts.entries[params.entryKey].payload.warehouseRef}'
    out: response
return:
  projected: '${ctx.response?.success === true && ctx.response?.body?.stored === true}'
  destinationId: '${ctx.response?.body?.id ?? null}'
```

Declare `approvalsBaseUrl` in the project's environment configuration and set
it to your destination's base URL. Credentials use normal project secret
references. The projection reads configuration from the same installation as
its caller.

This example assumes the API honours `Idempotency-Key` and acknowledges a
saved approval with `{ stored: true, id: "..." }`. The immutable ledger entry
ID provides the same key on every retry. Match the request and acknowledgement
to your actual destination's contract; sending a header alone does not make
an API idempotent. Here the order ID travels in the body. If your destination
puts an ID in the URL path, validate or encode the value read from the ledger
before constructing that URL.

A missing fact skips the HTTP call and returns `projected: false`. A successful
HTTP response without `stored: true` also returns `projected: false`. An HTTP
error fails the subflow under the HTTP block's normal error and retry policy.

### Call it after recording a fact

Add this block after `record-approval` in the basic `approve-order` workflow:

```yaml
- id: project-approval
  type: subflow
  ref: project-order-approval
  params:
    scope: '${params.orderId}'
    entryKey: order-approved
  out: projection

- id: report-unconfirmed-projection
  type: log
  if: '${ctx.projection.projected !== true}'
  with:
    level: warn
    message: 'Approval view needs attention for ${params.orderId}'
```

The append commits first. The subflow then reads that committed entry, updates
the destination and returns its result in `ctx.projection`. Pass stable scopes
and entry keys rather than copying the ledger into the subflow's arguments.
Set the calling workflow's `return` to `'${ctx.projection}'` if its caller
needs that result.
You can call the same projection again to repair a missing external view using
the saved fact.

### Run it alongside other work

Use `parallel` when other work can continue during the projection. Replace the
direct call above with a projection branch and a business-work branch, keeping
the append **before** the parallel block:

```yaml
- id: after-record
  type: parallel
  branches:
    - id: projection
      do:
        - id: project
          type: subflow
          ref: project-order-approval
          params: { scope: '${params.orderId}', entryKey: order-approved }
          out: result
      return: '${ctx.result}'
    - id: business
      do:
        - id: acknowledge
          type: log
          with: { message: 'Order recorded: ${params.orderId}' }
  out: results
```

Ordinary leaf activities such as HTTP, LLM and email can overlap across
branches. Each branch remains sequential. `parallel` waits for every branch
and returns their values in declaration order: in this example, the projection
result is `ctx.results[0]`. A branch failure cancels its siblings and fails
the caller, while the earlier ledger append stays committed.

If the projection needs an independent lifetime, an existing `workflow` block
can start a separate child instead. That block returns a start handle, not
the child's eventual projection result.

### Failure and recovery

Appending does not automatically trigger a projection. There is no background
delivery queue or destination locking. A crash between append and projection
invocation can leave a fact whose external view has not been updated.
Explicit invocation can repair that view when safe. Retrying an external
write still needs the destination's duplicate protection or conditional writes;
independent workflows and late older requests are not ordered by the ledger.

The order and inspection examples
contain complete project bundles and tests using different payloads and
destinations, plus a run that records facts without any projection.

## Advanced usage

### Read a long ledger in pages

Use `get` for known keys. When you need the record in revision order, use
`list` with a bounded page size:

```yaml
- id: read-page
  type: ledger
  with:
    action: list
    scope: '${params.orderId}'
    after: 0
    limit: 20
  out: page
```

Process `ctx.page.entries`. If `ctx.page.next` is present, pass it as `after`
to the next read. Continue until `next` is absent. The revision cursor is
assigned by the database; caller timestamps do not determine entry order.
Keep pages bounded instead of accumulating the whole ledger in workflow state.

### Optional ownership with `claim`

Use a claim only when **different workflow IDs or other platform callers
share a business scope and you need one active ledger writer**. Most workflows
should leave the ledger unclaimed. Ordinary retries, restarts and projections
need no additional claim.

A claim prevents an outdated writer from adding new facts after ownership
passes to another workflow. For example:

1. Workflow `order-original` claims scope `order-42`.
2. An administrator transfers it to `order-replacement`, which has a different
   workflow ID.
3. If the original resumes and appends another decision, the ledger rejects
   that write, even if it uses a fresh entry key.

The claim assigns a workflow ID as owner. It also returns a **generation**:
an ownership version that changes on transfer. The owner supplies this version
on new appends, so writes using outdated ownership are rejected.
Generation is separate from the ledger's entry revision.

For the first claim on an already-open, unclaimed ledger:

```yaml
- id: take-ownership
  type: ledger
  with:
    action: claim
    scope: '${params.orderId}'
    key: initial-owner
    expectedGeneration: 0
  out: ownership

- id: record-owned-decision
  type: ledger
  with:
    action: append
    scope: '${params.orderId}'
    key: order-approved
    generation: '${ctx.ownership.ledger.generation}'
    payload:
      status: approved
      warehouseRef: '${params.warehouseRef}'
```

The first claim advances generation from 0 to 1. Only an organisation
administrator/owner can transfer ownership, using the administrator API with
the current generation, new workflow ID, a fresh transition key and a reason.
A replacement with a different workflow ID needs that transfer before making
new writes to a claimed ledger. Reads and equivalent duplicate retries remain
available.

A claim restricts ledger mutations. It cannot stop an external HTTP request or
email already being sent, and it does not change organisation/project access.

## Reference

### Actions

Every action requires `scope`. The engine derives organisation and project
from trusted installation context; neither is an authored input. Action-specific
fields are required unless marked optional. Unknown input fields are rejected.

All actions accept optional `with.fail-on-error` (a boolean or template,
default `true`). `out-error`, beside `out`, names the context variable holding
`{ message }` on a suppressed failure or `null` on success. A suppressed failure
sets `out` to `null`. These options affect workflow handling only; they are not
sent to the ledger service.

| Action             | Other inputs                            | Output besides `ledger`                            |
| ------------------ | --------------------------------------- | -------------------------------------------------- |
| `open`             | None                                    | `duplicate`                                        |
| `append`           | `key`, `payload`, optional `generation` | `entry`, `duplicate`                               |
| `get`              | `keys`                                  | `entries` map keyed by ledger key, `missing` keys  |
| `check`            | `keys`                                  | `checks`, one `{ key, has }` per requested key     |
| `list`             | Optional `after` revision and `limit`   | Revision-ordered `entries`, optional `next` cursor |
| `claim` (optional) | `key`, `expectedGeneration`             | Transition `entry`, `duplicate`                    |

For a claimed ledger, `generation` is required on new appends and must match
the current owner/version. Ownership transfer is an administrator operation,
not an additional YAML action.

### Returned records

`ledger` contains `id`, owning `orgId`, `projectId`, retained `projectName`,
`scope`, `revision`, optional ownership as
`owner` (null when unclaimed), and `generation`.

An entry contains `id`, `key`, `revision`, `kind`, `payload`, `createdAt` and
`provenance`. Provenance records the execution/run/block or administrator
context. Duplicate equivalence excludes generated timestamps and provenance.

### Duplicate and read semantics

- Same action, scope/key and equivalent content returns the original entry.
- Different content for that key is a conflict; it never overwrites the entry.
- Object key order is ignored; array order matters. An absent property differs
  from explicit null.
- Reads and equivalent duplicate retries remain available after ownership transfer.
- Reads capture a ledger revision without taking its write lock. Entries in
  that response are bounded by the captured revision.
- Other actions never implicitly open a scope. A read of an unknown scope
  fails; a read of an existing scope can explicitly report missing entry keys.

### Limits and JSON handling

| Input or response    | Limit                                         |
| -------------------- | --------------------------------------------- |
| Scope and entry keys | 512 UTF-8 bytes each                          |
| Payload              | 64 KiB of encoded JSON                        |
| `get` / `check`      | 1–100 keys                                    |
| `get` entries        | 1 MiB encoded map, including its keys         |
| `list` page          | At most 100 entries and 1 MiB encoded entries |

`list` defaults to `after: 0` and `limit: 100`.

Oversized writes fail rather than truncate. An oversized `get` fails with
413; request fewer keys or use `list`. List returns a continuation cursor
when more entries remain. `check` reads key existence without loading payloads.
Use durable object-store references for large evidence; never store credentials,
PDFs or expiring signed URLs as durable results.

JSON text must be well-formed Unicode without NUL, as required by PostgreSQL.
Ledger JSON parsing removes object properties named `__proto__`, `constructor`
and `prototype` at every nesting level, including inside arrays. These
properties are absent from stored payloads and returned JSON. Entry names
`__proto__`, `constructor` and `prototype` are rejected by append, claim, get
and check, so a fact cannot be written under a name that workflows cannot
read. This restriction does not apply to scope names. Ordinary string values, including
strings equal to these names, are preserved. Duplicate comparison
uses the parsed payload. Unsupported JSON values are rejected.

### Access and retention

Normal organisation/project permissions apply. Users read according to their
existing access; administrator recovery operations require an organisation
administrator/owner. A project tag does not grant its owner access to another
organisation's ledger.

There is no automatic expiry. Uninstall or project deletion stops worker
access but retains the organisation's facts and project identity. Reinstalling
the same project can reuse its scopes under normal authorisation. Users can
still read retained records. Organisation erasure removes the ledgers.

### Errors, tests and engine requirements

HTTP errors 400, 403, 404, 409 and 413 from the ledger activity are
non-retryable. Network failures, 408, 429 and server failures retain the normal
activity retry policy. Never turn a failed read into an empty-state result.

In wftest, every ledger action is an external boundary, including reads.
Provide a mock or an appropriate assertion; an unapproved call receives an
implicit zero-call guard. Only `allow-real` permits real ledger activity calls.

This contract requires engine build 0.153.0 or later, which also supports
concurrent ordinary leaf activities in parallel branches. Deploy the ledger
migrations and matching backend contracts before enabling workflows using
this build. Existing histories and resets replay on their writing build; see
engine build IDs.

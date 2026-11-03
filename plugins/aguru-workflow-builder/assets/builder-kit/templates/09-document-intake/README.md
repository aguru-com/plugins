# 09 Document intake

Asks a job's site contact for its safety certificate, reads the PDF they
email back with a model, sends anything the model could not read to an
operator, and records the certificate on the job. Start here for any
workflow that collects a document and acts on what it says.

- **The file arrives in an `attachment` slot.** Its value is
  `{ id, filename, mimeType, size }`, and that `id` is what `llm` loads:
  `url: 'attachment:${ctx.reply.slots.certificate.value.id}'`, with the
  slot's `mimeType` as `media-type`. A slot holds one file; declare a slot
  per file you need.
- **The model returns a schema, with `null` for what it cannot read.** Each
  field that may be unreadable is a nullable union (`[string, 'null']`), and
  the prompt says to use `null` rather than guess. A non-nullable field would
  make the model invent a value or burn a retry.
- **A person decides what the model could not.** `review-certificate` runs
  only when a field came back `null`. Its `select` makes the decision
  explicit; its text fields carry the values the operator read. On timeout
  `out` is `null`, and nothing is recorded.
- **One write, two sources, checked first.** `record-certificate` takes each
  value from the operator, or from the model when the operator left it blank
  (`||`), and runs only when both are present: a `record` decision missing a
  value records nothing, so the API never receives a null.

**Change first:** the slot (`mime-types`, `description`, `self-checks`), the
schema and prompt for your document, and the review fields.

**Before a live run:**

Follow [template 10's LLM setup](../10-llm-classification/README.md) for the
provider credential and model. Here the field is `certificateReaderModel`;
pick a model that accepts PDFs and a `max-tokens` suited to the document.

- a `certificateReaderModel` whose `api-key` names a saved credential;
- an email connector for stakeholder email;
- an `acme-api-token` secret;
- a reachable Acme API;
- a job whose contact is your own address, so you can reply with a sample
  PDF.

Run it three times: with a clear certificate, with one whose expiry date is
unreadable (an operator answers on the Approvals page), and with no reply.

`deadline` and `follow-up.sequence` are not used here. When you need them,
`deadline` is an ISO date-time with an offset, and each `sequence` item may be
an expression that resolves to an ISO date-time or a duration such as `3d`.

**Tests**

| Test              | Proves                                                                       |
| ----------------- | ---------------------------------------------------------------------------- |
| clear certificate | The attachment reaches the model by id; the values are recorded; no operator |
| unreadable field  | The operator is asked, and their values are the ones recorded                |
| operator rejects  | Nothing is recorded                                                          |
| incomplete record | A `record` decision still missing the expiry date writes nothing             |
| no reply          | The model is never called and nothing is recorded                            |

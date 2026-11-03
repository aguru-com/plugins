# `email` block

Sends through one of the org's email connectors.

```yaml
- id: notify
  type: email
  with:
    connector-id: postmark-default
    to: ['${ctx.params.userEmail}'] # string or string[]
    subject: '${ctx.composedSubject}'
    body: '${ctx.composedBody}'
    html: true # default false; required with `footer`
    cc: ['ops@example.com']
    from: 'noreply@example.com'
    from-name: '${ctx.params.fromNameTemplate}' # e.g. "${senderName}"
    signal: customer-replied # replies on this connector fire it
    attachments:
      - url: '${ctx.reportUrl}'
        file-name: report.pdf
    template-vars:
      senderName: "${ctx.params.fromName || ''}"
    footer: '${ctx.params.footerConfig}'
    footer-vars:
      propertyManagerFirstName: "${ctx.propertyManager.firstName || ''}"
  out: sendReceipt
```

- `signal`: an inbound reply on the same connector fires it, so a later
  `wait` can resume on the reply.
- `to`, `cc`, `bcc`, `attachments` take their literal shape or a template
  resolving to it. Attachments are downloaded and sent inline.
- `confirm`: see [operator confirmation](../yaml.md#operator-confirmation).
- `recipient-policy: primary-only`: refresh registered recipients and send only
  to each stakeholder's explicit primary. A missing primary retains the existing
  confirmation hold even when `confirm` is false; confirming rechecks contacts
  and cannot bypass it. Secondary stakeholder addresses are excluded from CC
  and BCC. Unregistered recipients retain the explicitly supplied primary `to`.
  Omission or `latest-reply` preserves the native email block's supplied addresses.
- `scm-record: true`: once sent, the email joins the SCM conversation of each
  stakeholder whose address is in `to` (not `cc`/`bcc`), as something we
  said. Nothing else changes for that conversation. Use it to tell a
  stakeholder something whose wording must not pass through the SCM composer,
  such as text derived from untrusted input, while the SCM still knows it was
  said. A stakeholder with no live run records nothing.

## Send-time `${name}` substitution

Two layers run:

- `${ctx.X}` — resolved by the engine like any block field.
- `${name}` — filled by the email handler afterwards, from `template-vars`
  (in `subject`, `body`, `from-name`; scalar values; escaped in HTML bodies)
  and `footer-vars` (in every string field of `footer`).

A bare `${name}` cannot be written inline: the engine evaluates every `${...}`
as wfexpr first, and a bare identifier throws `InvalidExpression`. Source the
template from ctx with a whole-template reference
(`from-name: '${ctx.params.fromNameTemplate}'`); a whole-template returns its
value verbatim, so the inner `${name}` tokens survive to the handler.

Any `${...}` left after substitution fails the block non-retryably rather than
mailing a placeholder. That includes footer fields with no `footer-vars`.

## Footer

`footer` is rendered by the shared footer renderer and
spliced before the last `</body>` (or appended). Whitespace-only fields are
dropped after substitution. `html: true` is required with `footer`;
otherwise the block fails non-retryably rather than mail literal tags.

Subflows that send email take the footer and sender-name template as params,
pass them through with placeholders intact, and supply `footer-vars` /
`template-vars` at each email block.

## Output

The send record: `{ success, messageId, fromEmail, toEmails, subject, bodyText, sentAt, ... }`. `null` when an operator suppresses a `confirm`.

## On failure

Retried 5 times without sending twice. A `${name}` left unfilled (`UnresolvedTemplateVar`) or a `footer` without `html: true` (`EmailFooterRequiresHtml`) fails at once. Errors from the platform are retried whatever their status, so a bad connector id takes five attempts to fail.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `recipient-policy` | "latest-reply" \| "primary-only" \| string | no |  |
| `connector-id` | string | yes |  |
| `to` | string \| string[] | yes |  |
| `subject` | string | yes |  |
| `body` | string | yes |  |
| `html` | boolean \| string | no |  |
| `cc` | string[] \| string | no |  |
| `bcc` | string[] \| string | no |  |
| `from` | string | no |  |
| `from-name` | string | no |  |
| `signal` | string | no |  |
| `attachments` | object[] \| string | no |  |
| `footer` | object \| string | no |  |
| `template-vars` | object \| string | no |  |
| `footer-vars` | object \| string | no |  |
| `confirm` | boolean \| string | no |  |
| `scm-record` | boolean \| string | no |  |

## In wftest

It calls out, so wftest guards it: a test that reaches it fails unless a mock, an `expect-in` event or a post-run `called` assertion approves it. See [testing.md](../testing.md#mocks).

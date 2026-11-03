---
name: add-scm-need
description: Design an Aguru scm block (a stakeholder conversation need). Use when an Aguru workflow must ask a person outside the org for information, a decision or a file, or tell them something.
---

Resolve the Aguru workspace before following this procedure. It is the folder
containing the builder kit's AGENTS.md, docs/, schema/, templates/, and
scripts/check-definitions.mjs. Read that AGENTS.md explicitly and run commands
from that folder. Use absolute paths for project folders outside the workspace.
If no workspace exists, use the setup skill bundled with this plugin first.
Do not copy the kit over an existing repository or edit the installed plugin.

Run `pnpm check <changed-yaml-files>` after writing definitions and before deploying.
Explicit user instructions take precedence over this procedure. Reuse existing
authorization for deployment or live runs when it covers the target and effects.
Connectivity is required for live operations; missing credentials do not block
local authoring and validation. Template tests are maintained by Aguru; follow
AGENTS.md's live-run verification rule for the workflows you author.


# Add an SCM need

Read `docs/scm.md` and templates 03 and 04 first.

1. **Finish the sentence** "we need ___ from ___ about ___". The second blank
   is the stakeholder; the third is the subject you will name everywhere.
2. **Slots: what to learn.** One slot per fact, typed (`string`, `number`,
   `boolean`, `date`, `enum`, `attachment`). Mutually exclusive answers go in
   one `boolean` or `enum`, never one slot per answer.
3. **Descriptions are the questions** the person reads. Write each as the
   polite sentence you would send, naming the subject (a reference, an
   address, a date).
4. **Self-checks** for every judgement call: "Did they name one specific
   date?", "Is this a decision, not an acknowledgement?". Pin the value
   mapping for booleans ("true for yes").
5. **`validate`** for mechanical rules (formats, ranges), with a
   `validate-description` written to the person.
6. **Outcomes:** each list is one way the need can be done. List real
   alternatives separately (`[[date], [declined]]`).
7. **Briefs** for facts to say unprompted; **references** for facts to give
   only when asked.
8. **When to stop:** always a `timeout` or `deadline`, and a `follow-up`
   ladder with `on-exhaustion` (`abandon`, `hold` or `escalate`).
9. **Wait or not:** `wait: true` parks the workflow until the need ends.
   `wait: false` lets it move on; then, if the block can run several times at
   once, add `one-need-per` keyed on the thing (a job id).
10. **Templates for subject and body** go in config or params, never inline.
11. **Validate:** run `pnpm check <changed-yaml-files>` and fix every schema
    error before deployment.
12. **Live runs** (`$run`) to your own address: verify each configured ending,
    including abandonment, and inspect the block's input and output. Expect
    the first email to wait on the Approvals page: approval is on by default.

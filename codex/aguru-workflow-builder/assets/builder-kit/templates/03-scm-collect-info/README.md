# 03 SCM: collect information

Asks a site contact by email for a visit date, a time of day and any access
notes. Start here when a workflow needs an answer from a person outside your
team.

The `scm` block declares **what** to collect; the platform writes, sends,
reads and chases the emails. Read [the SCM guide](../../docs/scm.md) first.

- **Slots** are what to learn. `description` is the question the contact
  sees. `self-checks` stop a vague reply ("maybe next week") from counting.
- **Quick actions** add one-click buttons for the `enum` slot.
- `accessNotes` is `required: false`: asked, never chased.
- **Outcomes** say when the need is done: a date and a time of day.
- `timeout` and `follow-up` say when to give up.
- The subject template sits in config, because `${name}` written inline would
  be read as an expression.

**Before a live run:** your org needs an LLM connector and an email connector
on the SCM page, and approval is on by default. A first run that "does
nothing" is usually a draft waiting on the Approvals page.

**Change first:** the goal, the slot descriptions and the self-checks. Name
the job in each, so an old reply about another job cannot answer this one.

**Tests**

| Test                    | Proves                                                       |
| ----------------------- | ------------------------------------------------------------ |
| "registers the need"    | What the SCM will ask, through `expect-in` on a mocked block |
| "optional access notes" | An optional slot reaches the result when given               |
| "never answered"        | An abandoned need returns nulls, and config sets the timeout |

Always mock `scm` in tests: an unmocked one registers a real need.

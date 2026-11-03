# Aguru workflow project

This repo holds workflows for the Aguru platform: YAML definitions run by a
durable workflow engine. You cannot see the platform's source. What you know
about it comes from `docs/`, `schema/`, the templates, and running things: the
schema check and the platform itself. When those disagree with your expectations, they win.

## Read before you write

| Task                                          | Read                                                         |
| --------------------------------------------- | ------------------------------------------------------------ |
| Any workflow change                           | `docs/platform-rules.md`, then `docs/yaml.md` for the blocks |
| Choosing or using a block                     | `docs/blocks/README.md` and the block's page                 |
| Expressions (`${...}`)                        | `docs/wfexpr.md`                                             |
| Calling a third-party service (Slack, a CRM)  | `docs/connectors/README.md`, templates 07 and 08             |
| Talking to a person outside the org           | `docs/scm.md`, template 03 or 04                             |
| Reading a document someone sends              | `docs/blocks/llm.md`, template 09                            |
| Calling an LLM; configuring its model and key | `docs/blocks/llm.md`, template 10 (including org setup)      |
| Named stages, rework, several endings         | `docs/state-machine.md`, template 05                         |
| Configuration, installations, how runs behave | `docs/concepts.md`                                           |
| Configuration fields, setup wizard, schedules | `docs/manifest.md`                                           |
| Deploying, starting and reading runs          | `docs/deploy.md`                                             |

## Start from a template

`templates/` holds ten tested projects in the fictional Acme Jobs domain,
each adding one idea. Copy the nearest one, then change it.

| Template                      | Start here for                                        |
| ----------------------------- | ----------------------------------------------------- |
| `01-http-basics`              | Calling an API; subflows and `return`                 |
| `02-http-sync`                | Paginated reads, loops, write-back, error branches    |
| `03-scm-collect-info`         | Asking a person for information                       |
| `04-scm-follow-up-escalation` | Reminders, escalation, operator decisions             |
| `05-record-request`           | A full application as a state machine                 |
| `06-scheduled-sweep`          | Schedules, idempotent child runs, billing             |
| `07-connector-actions`        | Third-party connector actions and credentials         |
| `08-connector-chain`          | Chained connector actions, dates, no credentials      |
| `09-document-intake`          | A document by email, read by a model, reviewed        |
| `10-llm-classification`       | A complete LLM project, including model and key setup |

## How to work here, in order

1. **Connect, once per machine.** `AGURU_API_URL` and `AGURU_API_KEY` must be
   set (see `README.md`). Check with `pnpm exec aguru project ls`; on an error, stop
   and tell the user what is missing. Never print the key.
2. **One folder per project.** Each project is a folder with a
   `manifest.yaml`; its `ref` is the project's alias on the platform. Start
   it by copying the nearest template (`/new-workflow`).
3. **Create the project, once per folder:** `pnpm exec aguru project create
   <folder>`. It creates the project the manifest names, with a GitHub
   repository Aguru hosts, installs it on your org, and returns the existing
   one if it is already there.
4. **Write the YAML.** Run `pnpm check <changed-yaml-files>` after edits and
   fix what it reports.
5. **Deploy** the folder into its project with `pnpm exec aguru project deploy
   <folder>` (`/deploy`): the manifest's config and every workflow in it,
   committed to the project's repository as its next version. A project on
   your own GitHub takes a push to that repository instead.
6. **Run** each ending on the platform and read what every block did
   (`/run`). A workflow is not done until a real run of each of its endings
   has passed. An ending is a path that runs blocks; a guard that skips
   every block on blank or missing params is not one, so never start a run
   with blank or placeholder params.

The templates' `test/` folders are how we test them; you write no tests.
Every check of your workflow is a live run.

## Rules

- **Native blocks first.** Use `if`, `router`, `loop`, `wait`, `return`
  projections and small expressions. Use `js` only for multi-step logic.
- **A connector before hand-written `http`.** For a third-party service, look
  it up in `docs/connectors/README.md` first; copy `piece`, `version` and
  `action` exactly from its page, and read its result by the output fields
  listed there. Use `http` for your own API and for
  services with no connector.
- **Never delete a workflow definition.** It deletes every run it had.
  Redeploy with update-existing.
- **Secrets by name only**: `{{ secret("name") }}`. Never write a credential
  into YAML, a test or a fixture.
- **Every project has at least one `kind: workflow`.** Only those can be
  started; a subflow runs only when another definition calls it.
- **Every subflow** declares `kind: subflow`, declares every param it reads,
  and shapes its output with `return`.
- **Test runs use your own org and your own addresses.** A live run sends
  real email and calls real APIs: point the workflow at your own API or the
  mock (`pnpm mock-api`).
- **Debug from the run history.** On a wrong result, read each block's input
  and output in the history before changing anything.
- **Naming:** kebab-case for refs, block ids, signals and enum values;
  camelCase for `out`, params and anything else that becomes a ctx key.

## When the docs are not enough

Do not guess platform behaviour from how other systems work. Check it: the
schema check for structure, a live run for behaviour, with a small workflow
of its own when you need to see one expression or block. If you still cannot tell, write the
question down in `QUESTIONS.md` with what you tried, and tell the user to send
it to their Aguru contact. Every answer comes back as a doc line or a
template, so the next builder does not have to ask.

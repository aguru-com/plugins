# Concepts

What the platform is made of, as a workflow builder sees it.

## Organizations, projects and installations

- **Organization (org).** A tenant. Your team works in your own org; each
  customer you serve has an org of its own under yours.
- **Project.** A bundle of workflow definitions plus one `manifest.yaml`. You
  build and own it.
- **Installation.** A project installed on an org. Runs always belong to an
  installation, which decides the configuration they read. Installing your
  project on your own org is how you test it.
- **Workflow definition.** One YAML file with `kind: workflow` (startable) or
  `kind: subflow` (callable only from another definition). Refs are flat
  across the org: every `ref` must be unique in it, whatever its project. An
  import with `--update-existing` replaces the definition holding a ref and
  moves it into the importing project, so prefix each ref with the project's
  name.

## Configuration

The manifest declares configuration fields in three tiers, and a run reads
the folded result as `config.<field>`:

| Tier      | Set by                                 | Typical fields                    |
| --------- | -------------------------------------- | --------------------------------- |
| `env`     | You, in the project's settings         | Values every installation shares  |
| `install` | Whoever installs the project on an org | API base URLs, account references |
| `setup`   | The installed org, in the setup wizard | Sender names, timings, contacts   |

What the installed org chooses belongs in `setup`; what differs per
installation but is not theirs, in `install`. Nothing passes config around: every workflow
and subflow in a run reads it directly. An unset field reads as `undefined`.

## Credentials and connectors

- **Secrets** are stored in the org's credential store and named in YAML as
  `{{ secret("name") }}`. The engine never sees their values.
- **Model settings** (`model` on an `llm` block) name a provider, a model
  and the credential holding its API key, usually from an `LLM_MODEL` field
  in the `env` tier.
  [Template 10](../templates/10-llm-classification/README.md) walks through
  storing the key, declaring the field, deploying and checking a real run.
  The manifest does not provision the credential.
- **Connectors** send and receive email, SMS and WhatsApp. A send block names
  one with `connector-id`; the SCM uses the ones set on its configuration
  page. The sender address is always the connector's.
- **Third-party connectors** call other services (Slack, CRMs, spreadsheets
  and hundreds more) with the `activepiece` block. Each is a package
  installed on the platform at one exact version, listed with its actions in
  [connectors/README.md](connectors/README.md). An action that needs
  authentication names an **API & HTTP credential** saved in the org that
  runs it, by key, or builds one from secret references.

## Runs

A **run** (execution) is one start of a workflow. Runs are durable: a run can
park for weeks on a `wait`, a `hitl` or an `scm` need, survive deploys and
restarts, and continue where it stopped. Every block's input and output is
recorded, which is what the `run` skill reads back.

- **A run keeps the definitions it started with.** Importing a new version
  changes only runs started afterwards. A run still going, parked ones
  included, keeps its version. A run that failed, was cancelled, terminated
  or timed out can be restarted on the new version; it starts again from the
  top, with its params. To move a parked run, cancel it first.
- **Config is read live**, between blocks, so an installation edit reaches
  running runs.
- **A run ends** completed, failed, cancelled or terminated. A failed block
  fails the run unless the block says otherwise (`fail-on-error: false`).
- Some failures **hold** instead of failing: an `llm` block whose API key is
  revoked or out of credit waits on the Approvals page until an operator
  retries or fails it.

## People in the loop

- **Operators** are your users in the product. They answer `hitl` forms,
  approve SCM drafts, confirm blocks marked `confirm`, and resolve held
  failures, all from the Approvals page.
- **Stakeholders** are people outside the org: a site contact, a contractor,
  a customer. Workflows reach them through the SCM, which holds one
  conversation per stakeholder for every workflow that needs something from
  them. See [scm.md](scm.md).
- **Cases** give a stakeholder a portal view of the work that concerns them,
  written with the `stakeholder` block.

## Schedules and starts

A run starts from the product, the API, a schedule, an inbound email bound to
a `trigger` block, or another run's `workflow` block. Completing the setup
wizard starts its workflow once with no params and creates the schedule the
wizard declares; see [manifest.md](manifest.md).

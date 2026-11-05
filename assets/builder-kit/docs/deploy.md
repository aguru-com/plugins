# Deploying and running

How a workflow gets from this repo onto the platform, and how to start a run
and read what it did.

## Install the CLI

From your workflow workspace, install the public CLI before the first
deployment or live run:

```sh
pnpm add -D @aguru-com/cli
pnpm exec aguru --help
```

Use Node.js 24.22.1 or later and pnpm. This installs the `aguru` command in
this workspace; run it through `pnpm exec aguru`. The npm builder kit and
Claude Code/Codex plugin do not include the CLI. Local authoring and schema
checks work without it. Update it with `pnpm update @aguru-com/cli`.

After configuring the access token below, verify the connection with
`pnpm exec aguru project ls`. Installing the CLI grants no platform access.

## API keys

Create a key in the product under Settings → Access Tokens, in your own org. Give
it the scopes the job needs and nothing more:

| Scope                | Allows                                               |
| -------------------- | ---------------------------------------------------- |
| `workflows:read`     | Reading definitions, versions and validation results |
| `workflows:write`    | Importing, publishing and versioning definitions     |
| `executions:read`    | Reading runs: status, history, pending approvals     |
| `executions:write`   | Starting, signalling, restarting, cancelling runs    |
| `projects:read`      | Finding a project by its alias                       |
| `projects:write`     | Creating a project                                   |
| `installations:read` | Finding the installation a run starts on             |

Keep the key out of the repo. The skills read it from the environment:

```sh
export AGURU_API_URL=https://api.aguru.com   # the environment you deploy to
export AGURU_API_KEY=aguru_...
```

Every request sends it as `Authorization: Bearer $AGURU_API_KEY`. Routes sit
under `$AGURU_API_URL/api`.

## Create the project

Each folder with a `manifest.yaml` is one project, and the manifest's `ref` is
its alias. Create it once, before the first deploy:

```sh
pnpm exec aguru project create <folder>
```

It returns the project (with its id) and its installation, creating the
project when no project has that alias. A new project gets a GitHub
repository that Aguru hosts, and is installed on your org, so runs can start
on it at once. It reads only `ref`, `label` and `description`; the deploy
below brings the rest.

## Deploy

```sh
pnpm exec aguru project deploy <folder>
```

It sends `manifest.yaml` and every YAML under the folder to
`POST /api/projects/import-manifest?projectId=<id>`, one multipart part per
file, each named with its path in the folder.

A project lives in a GitHub repository, and a deploy is a commit to it. The
folder becomes one commit, which the platform imports as the project's next
version; the output reports it as `version: { sha, number }`. A deploy that
changes nothing makes no commit and reports the current version. The
project's **Versions** tab in the product shows every version.

A project whose repository is on your own GitHub takes a push to that
repository instead: the deploy is refused with a message naming it.

A deploy is all or nothing for runs: the platform imports the commit only if
every definition passes, so nothing half-imported reaches a run. The manifest
is checked before committing; the workflows are checked when the commit is
imported. A refused import is undone by a second commit that restores the
previous files, so the repository's history and the Versions tab show both
the refused commit and its revert. If that revert fails, the refused files
stay on the branch until the next deploy replaces them. On success:

- each workflow and subflow replaces its definition in place;
- the manifest's `config` declaration replaces the project's, and an
  installation reads a field's `defaultValue` until a value is set;
- a project workflow the folder no longer holds is archived;
- tests and fixtures come back as `excluded`.

**Never delete a definition to replace it**; that deletes its run history.
Redeploy instead.

## Start a run

```sh
POST /api/executions/start-enhanced
{ "workflowDefinitionId": "<id>", "installationId": "<installation id>",
  "params": { "jobId": "42" } }
```

The installation decides which configuration the run reads. Start test runs
on your own org's installation, with your own addresses as stakeholders.

## Read a run

| Route                                                  | Returns                                                                                 |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| `GET /api/executions/:id`                              | The run: `status`, `currentAttemptNumber`, and `activeWaitPoints`, what it is parked on |
| `GET /api/executions/:id/history`                      | Every block's input, output and failure, and once completed, `result`: what it returned |
| `POST /api/executions/:id/resolve`                     | A block's stored input or output, when the history holds a `ref`                        |
| `GET /api/executions/pending-approvals`                | Drafts and forms waiting for an operator                                                |
| `POST /api/executions/:id/signals`                     | Sends a signal, such as a `hitl` answer                                                 |
| `POST /api/executions/:id/cancel`                      | Cancels a run                                                                           |
| `POST /api/executions/:id/restart-with-new-definition` | Restarts an ended run on the latest definition                                          |

A run's `status` stays `running` while it is parked. `activeWaitPoints`
lists the signals and forms it waits on, but not an SCM reply or a plain
`wait` duration: for those, the history shows the block started with no
output.

**Restarting** on the latest definition works only for a run that failed,
was cancelled, terminated or timed out. Send
`{ "attemptNumber": <currentAttemptNumber> }`, which keeps a repeated
request from restarting twice. A parked run must be cancelled first.

## Coming with the platform's builder release

These are planned and not yet available. The skills already describe them,
and fall back to the routes above until they ship.

- `aguru workflow validate <dir>`: the platform's own loader and analysis,
  without importing.
- Running one block live, with real side effects.

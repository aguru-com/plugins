# Aguru Workflow Builder demo

This walkthrough creates a workflow, runs it on Aguru, and extends it in the
same session, in Claude Code or in a local Codex chat. Follow the
[README](README.md) first to register the marketplace and install the plugin.
Already installed? Start with a new session.

## Prepare a workspace

Start the agent in a folder where you can create files. In Codex, select
**Aguru Workflow Builder** or name it in your request. Send:

```text
Use Aguru Workflow Builder to set up a workspace at ~/aguru-demo.
If that is already a builder workspace, use it. Check that its local tools
are ready. Do not deploy or run anything yet.
```

Keep using this session for the demo. Choose a new path if the folder
contains something other than a builder workspace.

## Optional local-only trial

To try authoring without an Aguru connection, send:

```text
Create a project named greeting-demo with a manually started workflow that
accepts a name parameter and logs a greeting. Save it as greeting.yaml inside
the project folder. Validate it locally and explain its blocks.
Do not deploy it or start a live run.
```

Expect `greeting-demo/manifest.yaml`, `greeting-demo/greeting.yaml` and a
passing schema check. You can repeat the check from the workspace with
`pnpm check greeting-demo/greeting.yaml`. This verifies local authoring;
it does not verify execution on Aguru. Stop here for a local-only trial.

## Prepare the live demo

Connect the workspace using the [README's Aguru connection steps](README.md#connect-to-aguru).
Those steps cover the CLI, access token, scopes and environment variables.
In the demo org, also save a Google AI Studio API key under
**Settings → HTTP Credentials** with the key `gemini`. This credential is
specific to the GitHub/Gemini scenario below.

## Check the connection before the demo

In the same session, send:

```text
Use Aguru Workflow Builder in ~/aguru-demo. Read its AGENTS.md and
check the Aguru connection by listing the available projects. Tell me which
environment we will use. Never print credentials. Do not deploy or start
anything yet.
```

Continue once the agent can list the demo org's projects. If something is
missing, resolve the reported CLI or connection requirement before the
presentation. Variables set after the agent started do not reach it: quit,
set them in the terminal and start it again. This preparation check does not
create or run a workflow.

## A sentence becomes a workflow

In the same session, send:

```text
Use Aguru Workflow Builder to create a project named github-pitch.
Build a manually started workflow that takes a GitHub owner and repository
name, fetches the repository from the public GitHub REST API at
https://api.github.com without authentication, and asks Google Gemini, using
the org's credential named gemini, for a two-sentence pitch based on its
description and topics. Return the repository's full name, stars and pitch.
A missing repository is a normal ending that skips Gemini. Validate it,
deploy to my configured demo environment, and run it for octocat/Hello-World
and a repository that does not exist. Inspect both execution histories and
report the results and execution IDs.
```

While it works, point out the skills it loads (new-workflow, deploy, run), the
connector and action chosen from the packaged docs, the local validation
result, and the environment targeted for deployment. When it finishes, open
the generated YAML.

In Aguru's web app, open the project and its executions. The successful run
should show the GitHub lookup and Gemini call with their inputs and outputs.
The missing-repository run should complete through its normal ending without
calling Gemini. Verify these outcomes in the history rather than relying on
the agent's completion message alone.

## Extend it in the same session

```text
Extend github-pitch so it also translates the pitch into Spanish with
Gemini and returns both versions. Keep the missing-repository ending.
Validate, deploy the updated project, and run it for facebook/react. Inspect
the execution history and report the English and Spanish pitches and the
execution ID.
```

Show the YAML change, the extra Gemini step in the new Aguru execution, and
both workflow versions in **Versions**. This demonstrates authoring and
iteration entirely through the agent.

## Rehearse and troubleshoot

Rehearse in a separate workspace and use a distinct project name. A new
workspace does not clear platform projects, versions or executions. Record a
successful run before presenting the demo.

| Symptom                                            | Check                                                                                      |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Plugin skills are unavailable                      | Install the plugin, then start a new session.                                              |
| Workspace or linked CLI is missing                 | Ask the agent to check the workspace path and local tools using the setup skill.           |
| Credentials are missing or the CLI returns 401/403 | Quit, set both variables in the terminal, start the agent again; verify target and scopes. |
| CLI is unavailable                                 | Provision or link it into this workspace; installing the plugin does not install the CLI.  |
| Gemini authentication fails                        | Check the `gemini` credential in the org that runs the workflow.                           |
| Local validation passes but execution fails        | Read the failed block's input, output and error before changing the workflow.              |

Passing packaging and schema checks does not establish that this whole demo
works. Record the outcome of the live GitHub/Gemini run, missing-repository
run, and Spanish extension during rehearsal.

# Aguru plugins

Build, validate, deploy and debug Aguru workflows in **Claude Code** or **Codex / ChatGPT desktop**. Aguru Workflow Builder bundles documentation, JSON Schemas, tested templates and guided authoring skills; its setup skill copies them into a new workspace of your own.

## Install Aguru Workflow Builder

You need Node.js 24, pnpm and Git. Local authoring and validation work without an Aguru account. Your workspace administrator may restrict custom marketplaces or plugins.

### Claude Code

```sh
claude plugin marketplace add aguru-com/plugins
claude plugin install aguru-workflow-builder@aguru-builder
```

Without a GitHub SSH key, set `CLAUDE_CODE_PLUGIN_PREFER_HTTPS=1` before registering or updating. Inside a session, `/plugin marketplace add aguru-com/plugins` registers the marketplace and `/plugin` installs **Aguru Workflow Builder**.

### Codex / ChatGPT desktop

Use a current desktop app with local execution and a current Codex CLI:

```sh
codex plugin marketplace add aguru-com/plugins
codex plugin add aguru-workflow-builder@aguru-builder
```

You can also install from **Plugins → Aguru** in the desktop app after registering; restart the app if Aguru is missing. If your terminal cannot find `codex` on macOS, run `/Applications/ChatGPT.app/Contents/Resources/codex-cli/CodexCLI.app/Contents/MacOS/codex` in its place.

### From a download

Extract a marketplace ZIP from [Releases](https://github.com/aguru-com/plugins/releases) and register its root folder in place of `aguru-com/plugins`, for example `claude plugin marketplace add /absolute/path/to/extracted-marketplace`. Keep the folder in place; a download is a snapshot.

## Start

Start a new session and ask:

> Set up an Aguru workflow workspace in a new folder named aguru-workflows. Help me build my first workflow and validate it locally. Do not deploy it or start a live run yet.

Setup creates the folder, installs its validation dependencies with pnpm and refuses to overwrite an existing folder. Start later sessions from the workspace so the agent loads its rules; in Claude Code, the workspace also checks every YAML edit against the schemas. The [guided demo](DEMO.md) walks through a first workflow and an optional live run.

## Connect to Aguru

Live deployment and execution require separately provisioned Aguru CLI access and an organization access token; the plugin includes neither. Contact your Aguru administrator for CLI access and provision it on the same host. Repository contributors can link a locally built CLI from the workspace:

```sh
chmod +x "<absolute-repository-path>/packages/cli/dist/index.js"
ln -s "<absolute-repository-path>/packages/cli/dist/index.js" node_modules/.bin/aguru
```

Create an org access token in **Settings → Access Tokens**. For the demo, give it `projects:read`, `projects:write`, `workflows:read`, `workflows:write`, `executions:read`, `executions:write` and `installations:read`.

Set `AGURU_API_URL` and `AGURU_API_KEY` in the environment the agent's commands run in, before starting the agent; an already running Claude Code session or desktop app does not see later exports. Never paste the token into chat or commit it. In Bash, a hidden prompt keeps it out of shell history:

```sh
export AGURU_API_URL=https://api.aguru.com
read -r -s -p 'Aguru API key: ' AGURU_API_KEY
printf '\n'
export AGURU_API_KEY
```

Verify the connection from the same session with `pnpm exec aguru project ls` in the workspace.

## Update

| Agent                   | Command                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Claude Code             | `claude plugin marketplace update aguru-builder`, then `claude plugin update aguru-workflow-builder@aguru-builder` |
| Codex / ChatGPT desktop | `codex plugin marketplace upgrade aguru-builder`, then refresh or reinstall through **Plugins**                    |

Start a new session afterwards. Existing workspaces keep their copied documentation, schemas and templates; create a fresh workspace to adopt updated copies.

## Troubleshooting

| Problem                                     | Action                                                                                  |
| ------------------------------------------- | --------------------------------------------------------------------------------------- |
| Registration fails over SSH in Claude Code  | Set `CLAUDE_CODE_PLUGIN_PREFER_HTTPS=1`, then retry.                                    |
| Aguru is missing from Codex **Plugins**     | Run `codex plugin marketplace list`, then restart the desktop app.                      |
| Skills are missing                          | Start a new session; in Claude Code, `/aguru-workflow-builder:` should autocomplete.    |
| Setup reports an existing folder            | Choose a new folder or use your existing builder workspace.                             |
| Node.js or pnpm is missing                  | Install Node.js 24 and pnpm, and check the agent can run them.                          |
| Local validation works but deployment fails | Verify the separately supplied CLI access, environment variables and token permissions. |

## Layout

This repository is one plugin for both agents. `.claude-plugin/` holds the Claude Code manifest and marketplace; `.codex-plugin/` and `.agents/plugins/` hold Codex's. Both load the same `skills/`, `scripts/` and `assets/`. The one behavioural difference: in Claude Code, setup leaves the workspace's `.claude/skills` out, because the installed plugin already provides them; elsewhere they are copied so the workspace also works in Claude Code without the plugin.

## Support and license

Report installation problems through [GitHub issues](https://github.com/aguru-com/plugins/issues). Keep credentials and confidential workflows out of public reports.

Distributed under [MIT](https://github.com/aguru-com/plugins/blob/main/LICENSE), including the Activepieces notice for connector reference material. This repository distributes built plugin resources; Aguru's private application source is not included.

[Website installation copy](https://github.com/aguru-com/plugins/blob/main/WEBSITE-INSTALLATION.md) · [Maintainer release instructions](https://github.com/aguru-com/plugins/blob/main/MAINTAINING.md)

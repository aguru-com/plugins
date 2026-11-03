# Aguru Workflow Builder for Claude Code

Build and validate Aguru workflows with bundled documentation, schemas, templates and skills. Requires Claude Code, Node.js 24 and pnpm.

## Install

```sh
claude plugin marketplace add aguru-com/plugins
claude plugin install aguru-workflow-builder@aguru-builder
```

Start a new session and run `/aguru-workflow-builder:setup` to create a workspace in a new folder. Setup refuses to overwrite existing folders. Start later sessions from that workspace so its rules and schema-check hook load.

The installed bundle includes `claude/`, `codex/` and `shared/`. Register the repository or an extracted marketplace root, rather than this client subfolder.

## Other installation options

Without a GitHub SSH key, set `CLAUDE_CODE_PLUGIN_PREFER_HTTPS=1` before registering or updating. Inside a session, `/plugin marketplace add aguru-com/plugins` registers the marketplace; use `/plugin` to install **Aguru Workflow Builder**.

To use a downloadable marketplace, extract a ZIP from [Releases](https://github.com/aguru-com/plugins/releases) that includes the Claude Code plugin, then register its root folder:

```sh
claude plugin marketplace add /absolute/path/to/extracted-marketplace
```

Keep that folder in place. Downloaded releases are snapshots; check their release notes for included clients and versions.

## Update

```sh
claude plugin marketplace update aguru-builder
claude plugin update aguru-workflow-builder@aguru-builder
```

Start a new session after updating. You can also enable auto-update for **aguru-builder** under **Marketplaces** in `/plugin`. Existing workspaces keep their copied docs, schemas and templates; create a fresh workspace to adopt updated copies.

## Troubleshooting

| Problem                                     | Action                                                                              |
| ------------------------------------------- | ----------------------------------------------------------------------------------- |
| Marketplace registration fails over SSH     | Set `CLAUDE_CODE_PLUGIN_PREFER_HTTPS=1`, then retry.                                |
| Skills are missing                          | Start a new session; `/aguru-workflow-builder:` should autocomplete.                |
| Custom marketplaces are unavailable         | Ask your workspace administrator whether custom plugins are permitted.              |
| Setup reports an existing folder            | Choose a new folder or use your existing builder workspace.                         |
| Node.js or pnpm is missing                  | Install Node.js 24 and pnpm and check they are available in the session.            |
| Local validation works but deployment fails | Verify separately supplied CLI access, environment variables and token permissions. |

## Connect to Aguru

Deployment and live runs require separately provisioned Aguru CLI access and an organization access token. Contact your Aguru administrator for CLI access. Set AGURU_API_URL and AGURU_API_KEY in the terminal before starting Claude Code; variables set after it starts do not reach it. Never paste tokens into the session or commit them.

Verify connectivity in the session with `pnpm exec aguru project ls` in the generated workspace. Local authoring and validation work without credentials.

## What it runs

The plugin declares no hooks, MCP servers or background processes. Its skills are instructions; setup runs the bundled `scripts/create-workspace.mjs` through Claude Code's normal Bash permission prompt.

See the [public installation guide](https://github.com/aguru-com/plugins#claude-code) for the client overview and support. The [guided demo](DEMO.md) includes a local authoring trial and an optional live scenario.

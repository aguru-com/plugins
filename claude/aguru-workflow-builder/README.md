# Aguru Workflow Builder for Claude Code

Build and validate Aguru workflows with bundled documentation, schemas, templates and skills. Requires Claude Code, Node.js 24 and pnpm.

## Install

```sh
claude plugin marketplace add aguru-com/plugins
claude plugin install aguru-workflow-builder@aguru-builder
```

Start a new session and run `/aguru-workflow-builder:setup` to create a workspace in a new folder. Setup refuses to overwrite existing folders. Start later sessions from that workspace so its rules and schema-check hook load.

## Connect to Aguru

Deployment and live runs require separately provisioned Aguru CLI access and an organization access token. Contact your Aguru administrator for CLI access. Set AGURU_API_URL and AGURU_API_KEY in the terminal before starting Claude Code; variables set after it starts do not reach it. Never paste tokens into the session or commit them.

Verify connectivity in the session with `pnpm exec aguru project ls` in the generated workspace. Local authoring and validation work without credentials.

## What it runs

The plugin declares no hooks, MCP servers or background processes. Its skills are instructions; setup runs the bundled `scripts/create-workspace.mjs` through Claude Code's normal Bash permission prompt.

See the [public installation guide](https://github.com/aguru-com/plugins#claude-code) for updates, troubleshooting and support. The [guided demo](DEMO.md) includes a local authoring trial and an optional live scenario.

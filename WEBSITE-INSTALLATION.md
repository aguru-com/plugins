# Build Aguru workflows with your coding agent

Install Aguru Workflow Builder in **Claude Code** or **Codex / ChatGPT desktop** to create and validate workflows using Aguru documentation, schemas and tested templates.

Both options need Node.js 24, pnpm and Git. Local authoring and validation do not require an Aguru account.

## Claude Code

Run in your terminal:

```sh
claude plugin marketplace add aguru-com/plugins
claude plugin install aguru-workflow-builder@aguru-builder
```

Start a new Claude Code session and ask:

> Use /aguru-workflow-builder:setup to create a workflow workspace in a new folder named aguru-workflows. Help me build a workflow and validate it locally. Do not deploy it or start a live run yet.

Start later sessions from your workspace. See the [Claude Code installation guide](https://github.com/aguru-com/plugins#claude-code) for updates and troubleshooting.

## Codex / ChatGPT desktop

Use a current desktop app with local execution and a current Codex CLI. Run in your terminal:

```sh
codex plugin marketplace add aguru-com/plugins
```

Open **Plugins → Aguru** and install **Aguru Workflow Builder**. Restart the app if Aguru does not appear. Start a new local chat, select the plugin, and ask:

> Set up an Aguru workflow workspace in a new folder named aguru-workflows. Help me build a workflow and validate it locally. Do not deploy it or start a live run yet.

See the [Codex installation guide](https://github.com/aguru-com/plugins#codex--chatgpt-desktop) for the macOS command fallback, updates and troubleshooting.

## Connect to Aguru

Both plugins create a new workspace and install its validation dependencies. They refuse to overwrite an existing folder.

When you are ready to deploy or run a workflow, use Node.js 24.22.1 or later and install the Aguru CLI inside the workflow workspace:

```sh
pnpm add -D @aguru-com/cli
```

Create an organization access token in Aguru under **Settings → Access Tokens**. Follow the [connection guide](https://github.com/aguru-com/plugins#connect-to-aguru) to configure the token in your agent's environment.

Need help? See the [Aguru marketplace](https://github.com/aguru-com/plugins#install-aguru-workflow-builder).

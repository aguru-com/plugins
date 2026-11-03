# Aguru plugins

Build and validate Aguru workflows in **Claude Code** or **Codex / ChatGPT desktop** with bundled documentation, schemas, tested templates and guided authoring skills.

## Install Aguru Workflow Builder

Choose your coding agent. Both plugins need Node.js 24, pnpm and Git. Local authoring and validation work without an Aguru account.

| Agent                   | Installation guide                     | Guided demo                               |
| ----------------------- | -------------------------------------- | ----------------------------------------- |
| Claude Code             | [Install and set up](claude/README.md) | [Claude Code walkthrough](claude/DEMO.md) |
| Codex / ChatGPT desktop | [Install and set up](codex/README.md)  | [Codex walkthrough](codex/DEMO.md)        |

## Claude Code

Run in your terminal:

```sh
claude plugin marketplace add aguru-com/plugins
claude plugin install aguru-workflow-builder@aguru-builder
```

Start a new session and ask:

> Use /aguru-workflow-builder:setup to create a workflow workspace in a new folder named aguru-workflows. Help me build my first workflow and validate it locally. Do not deploy it or start a live run yet.

Start later sessions from the workspace so its rules and schema-check hook load. See the [Claude Code guide](claude/README.md) for updates and troubleshooting.

## Codex / ChatGPT desktop

Use a current desktop app with local execution and a current Codex CLI. Run in your terminal:

```sh
codex plugin marketplace add aguru-com/plugins
```

Open **Plugins → Aguru** and install **Aguru Workflow Builder**. Restart the app if Aguru is missing. Start a new local chat, select the plugin, and ask:

> Set up an Aguru workflow workspace in a new folder named aguru-workflows. Help me build my first workflow and validate it locally. Do not deploy it or start a live run yet.

See the [Codex guide](codex/README.md) for terminal-only installation, the macOS command fallback, updates and troubleshooting. This GitHub marketplace is separate from OpenAI's public Plugins Directory; workspace administrators may restrict custom marketplaces.

## Your workspace

Both plugins create a new folder and install its validation dependencies with pnpm. Setup refuses to overwrite an existing folder. Existing workspaces keep their copied documentation, schemas and templates when a plugin updates.

After setup, try:

> Create a manually started workflow that accepts a name and logs a greeting. Validate it locally and explain its blocks. Do not deploy or run it.

## Connect to Aguru

Live deployment and execution require separately provisioned Aguru CLI access and an organization access token. Neither plugin includes them. Contact your Aguru administrator for access.

Configure `AGURU_API_URL` and `AGURU_API_KEY` in the environment used by the agent's commands. Never paste access tokens into chat or commit them. Verify access from the same session with `pnpm exec aguru project ls` in the generated workspace. Terminal exports do not update an already running desktop app or Claude Code session.

## Repository layout

The repository is one self-contained plugin bundle with three peer folders:

- `claude/`: Claude Code guide, demo, skills and setup entry point.
- `codex/`: Codex guide, demo, skills and setup entry point.
- `shared/`: one copy of the workspace assets, icon, generator and common deploy skill.

Both marketplace catalogs install the repository root. The hidden client manifests select only their own skills plus shared skills; neither client loads the other's setup instructions. Shared files stay inside the installed bundle, so setup needs no extra download or sibling checkout.

Claude setup leaves workspace skills to the installed plugin; Codex setup also copies the workspace's standalone Claude skills for handoff. Both preserve the existing workspace output. Plugin updates do not replace existing workspaces.

## Support and license

Report installation problems through [GitHub issues](https://github.com/aguru-com/plugins/issues). Keep credentials and confidential workflows out of public reports.

Distributed under [MIT](LICENSE), including the Activepieces notice for connector reference material. This repository distributes built plugin resources; Aguru's private application source is not included.

[Website installation copy](WEBSITE-INSTALLATION.md) · [Maintainer release instructions](MAINTAINING.md)

# Aguru Workflow Builder for Codex / ChatGPT desktop

Build and validate Aguru workflows with bundled documentation, schemas, templates and skills. Requires a local ChatGPT desktop or Codex environment with Node.js 24 and pnpm.

## Install

```sh
codex plugin marketplace add aguru-com/plugins
```

Open Plugins, select Aguru and install Aguru Workflow Builder. Start a new local chat and ask it to set up a new workflow workspace. Setup refuses to overwrite existing folders.

## Other installation options

With a recent Codex CLI, install after registering the marketplace:

```sh
codex plugin add aguru-workflow-builder@aguru-builder
```

If your terminal cannot find `codex` on macOS and ChatGPT is installed in `/Applications/ChatGPT.app`, register with the bundled command:

```sh
/Applications/ChatGPT.app/Contents/Resources/codex-cli/CodexCLI.app/Contents/MacOS/codex plugin marketplace add aguru-com/plugins
```

Then install from **Plugins → Aguru**. If that executable is missing, install the current Codex CLI using OpenAI's official instructions.

To use a downloadable marketplace, extract a ZIP from [Releases](https://github.com/aguru-com/plugins/releases) and register its root folder:

```sh
codex plugin marketplace add /absolute/path/to/extracted-marketplace
```

Keep that folder in place. Downloaded releases are snapshots; check their release notes for included clients and versions.

## Update

```sh
codex plugin marketplace upgrade aguru-builder
```

Refresh or reinstall through **Plugins**, then start a new local chat. Create a fresh workspace to adopt updated documentation, schemas and templates.

## Troubleshooting

| Problem | Action |
| --- | --- |
| Aguru is missing from Plugins | Run `codex plugin marketplace list`, then restart the desktop app. |
| The CLI does not recognize plugin commands | Update the desktop app or Codex CLI. |
| Custom marketplaces are unavailable | Ask your workspace administrator whether custom plugins are permitted. |
| Setup reports an existing folder | Choose a new folder or use your existing builder workspace. |
| Node.js or pnpm is missing | Install Node.js 24 and pnpm and check they are available to the local chat. |
| Local validation works but deployment fails | Verify separately supplied CLI access, environment variables and token permissions. |

## Connect to Aguru

Deployment and live runs require separately provisioned Aguru CLI access and an organization access token. Contact your Aguru administrator for CLI access. Configure AGURU_API_URL and AGURU_API_KEY in the environment used by the agent. Never paste tokens into chat or commit them.

Verify connectivity from the same chat with `pnpm exec aguru project ls` in the generated workspace. Local authoring and validation work without credentials.

See the [public installation guide](https://github.com/aguru-com/plugins#install-aguru-workflow-builder) for prerequisites, updates, troubleshooting and support. The [guided demo](DEMO.md) includes a local authoring trial and an optional live scenario.

Licensed under MIT; see LICENSE, including the Activepieces notice for connector reference material.

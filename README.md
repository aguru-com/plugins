# Aguru plugins

Official Aguru marketplace for the ChatGPT desktop app and Codex. Build Aguru workflows with documentation, schemas, tested templates and guided authoring skills.

## Install Aguru Workflow Builder

You need a current ChatGPT desktop app with local execution, Node.js 24, pnpm and Git. The `codex` command must be available in your terminal. Your workspace administrator may restrict custom marketplaces or plugins.

1. Add the Aguru marketplace:

   ```sh
   codex plugin marketplace add aguru-com/plugins
   ```

2. Open **Plugins** in the desktop app, choose the **Aguru** marketplace, and install **Aguru Workflow Builder**. Restart the app if the marketplace is missing.
3. Start a new local chat, select the plugin, and send:

   > Set up an Aguru workflow workspace in a new folder named aguru-workflows. Then help me build my first workflow and validate it locally. Do not deploy it or start a live run yet.

Setup creates a new folder and installs its local validation dependencies with pnpm. It refuses to overwrite an existing folder. No Aguru account is needed for local authoring and validation.

This is a public GitHub marketplace. It is separate from OpenAI's public Plugins Directory and requires a desktop environment with local execution.

### Install entirely from the terminal

With a recent Codex CLI:

```sh
codex plugin marketplace add aguru-com/plugins
codex plugin add aguru-workflow-builder@aguru-builder
```

Start a new local chat after installation.

### If the terminal cannot find codex

On macOS, if ChatGPT is installed in `/Applications/ChatGPT.app`, run:

```sh
/Applications/ChatGPT.app/Contents/Resources/codex-cli/CodexCLI.app/Contents/MacOS/codex plugin marketplace add aguru-com/plugins
```

Then install from **Plugins → Aguru**. If that executable is missing, install the current Codex CLI using OpenAI's official installation instructions.

### Download instead of using GitHub registration

Download the marketplace ZIP from [Releases](https://github.com/aguru-com/plugins/releases/latest), extract it, and register the extracted folder:

```sh
codex plugin marketplace add /absolute/path/to/aguru-plugins-1.0.1
```

Keep that folder in place, then install from **Plugins → Aguru**. This is a local snapshot; download a newer release to update it.

## Try it

After setup, ask:

> Create a manually started workflow that accepts a name and logs a greeting. Validate it locally and explain its blocks. Do not deploy or run it.

See the [guided walkthrough](plugins/aguru-workflow-builder/DEMO.md) for more examples.

## Connect to Aguru

Live deployment and execution require separately provisioned Aguru CLI access and an organization access token. Installing this plugin supplies neither. Contact your Aguru administrator for CLI access before attempting a live deployment.

Configure `AGURU_API_URL` and `AGURU_API_KEY` in the environment used by the agent's commands. Never paste access tokens into chat or commit them. Verify access from that same chat using `pnpm exec aguru project ls` in the generated workspace. Terminal exports do not automatically reach an already running desktop app.

## Update

```sh
codex plugin marketplace upgrade aguru-builder
```

Refresh or reinstall the plugin through **Plugins**, then start a new chat. Existing workflow workspaces retain their copied documentation, schemas and templates; create a fresh workspace to use updated copies.

## Troubleshooting

| Problem | Action |
| --- | --- |
| Aguru is missing from Plugins | Confirm registration with `codex plugin marketplace list`, then restart the desktop app. |
| The CLI does not recognize plugin commands | Update the desktop app or Codex CLI. |
| Setup reports an existing folder | Choose a new folder or reuse an existing builder workspace. Setup does not overwrite files. |
| Node.js or pnpm is missing | Install Node.js 24 and pnpm, then check they are available to the local chat. |
| Local validation works but deployment fails | Verify separately supplied CLI access, environment variables and token permissions. |
| Custom marketplaces are unavailable | Ask your workspace administrator whether custom plugins are permitted. |

## Support and license

Report installation problems through [GitHub issues](https://github.com/aguru-com/plugins/issues). Keep credentials and confidential workflows out of public reports.

Distributed under [MIT](LICENSE), including the Activepieces notice for connector reference material. This repository distributes built plugin resources; Aguru's private application source is not included.

[Website installation copy](WEBSITE-INSTALLATION.md) · [Maintainer release instructions](MAINTAINING.md) · [Official marketplace documentation](https://developers.openai.com/plugins/build/plugins)

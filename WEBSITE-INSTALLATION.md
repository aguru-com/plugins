# Build Aguru workflows with ChatGPT

Install Aguru Workflow Builder to create and validate workflows using Aguru documentation, schemas and tested templates.

## What you need

The ChatGPT desktop app with local execution, Node.js 24, pnpm, Git and the Codex CLI. Local authoring and validation do not require an Aguru account.

## 1. Add the Aguru marketplace

Run this in your terminal:

```sh
codex plugin marketplace add aguru-com/plugins
```

## 2. Install the plugin

Open **Plugins** in the ChatGPT desktop app, select **Aguru**, and install **Aguru Workflow Builder**. Restart the app if Aguru does not appear.

## 3. Build your first workflow

Start a new local chat, select the plugin, and ask:

> Set up an Aguru workflow workspace in a new folder named aguru-workflows. Help me build a workflow and validate it locally. Do not deploy it or start a live run yet.

The plugin creates a new workspace and installs its validation dependencies. It will not overwrite an existing folder.

Deployment and live runs require separately provisioned Aguru CLI access and an organization access token. Contact your Aguru administrator for access.

Need help? See the [installation guide and troubleshooting](https://github.com/aguru-com/plugins#install-aguru-workflow-builder).

This plugin installs from Aguru's public GitHub marketplace and runs locally in the desktop app.

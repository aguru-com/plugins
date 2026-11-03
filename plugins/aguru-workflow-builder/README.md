# Aguru Workflow Builder

Build and validate Aguru workflows with bundled documentation, schemas, templates and skills. Requires a local ChatGPT desktop or Codex environment with Node.js 24 and pnpm.

## Install

```sh
codex plugin marketplace add aguru-com/plugins
```

Open Plugins, select Aguru and install Aguru Workflow Builder. Start a new local chat and ask it to set up a new workflow workspace. Setup refuses to overwrite existing folders.

## Connect to Aguru

Deployment and live runs require separately provisioned Aguru CLI access and an organization access token. Contact your Aguru administrator for CLI access. Configure AGURU_API_URL and AGURU_API_KEY in the environment used by the agent. Never paste tokens into chat or commit them.

Verify connectivity from the same chat with `pnpm exec aguru project ls` in the generated workspace. Local authoring and validation work without credentials.

See the [public installation guide](https://github.com/aguru-com/plugins#install-aguru-workflow-builder) for prerequisites, updates, troubleshooting and support. The [guided demo](DEMO.md) includes a local authoring trial and an optional live scenario.

Licensed under MIT; see LICENSE, including the Activepieces notice for connector reference material.

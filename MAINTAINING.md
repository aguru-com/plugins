# Maintain the marketplace

This repository is one plugin that Claude Code and Codex both install from its root. `.claude-plugin/` holds the Claude Code manifest and marketplace catalog; `.codex-plugin/plugin.json` and `.agents/plugins/marketplace.json` hold Codex's. Both catalogs point to `./`, and both agents load the same `skills/`, `scripts/` and `assets/`. Keep `aguru-builder` and `aguru-workflow-builder` as the marketplace and plugin names.

The builder-kit build generates the workspace, skills, guides and plugin manifests. Change workspace content at its source and rebuild. Apply the marketplace release version to both generated manifests and keep listing metadata aligned with the installation guide.

## Publish an update

1. Build with `pnpm --filter @aguru/builder-kit build` in an authorized Aguru checkout. The standalone npm package and this marketplace are separate distributions; publishing one does not update the other.
2. Replace every file in this repository except `.gitignore`, `MAINTAINING.md` and `WEBSITE-INSTALLATION.md` with the contents of the generated `builder-kit/build/dist/aguru-plugin/`, including hidden files.
3. Increment the plugin version when its contents change. The build defaults both manifests to the kit version. If that version is already used by the marketplace, set both manifests to the next plugin version and record the bundled kit version in the release notes.
4. Validate Claude Code with `claude plugin validate --strict .`, then register and install using a temporary `CLAUDE_CONFIG_DIR`. `claude plugin details aguru-workflow-builder@aguru-builder` must list five skills. Check the same inventory and the setup onboarding skill with Codex's local plugin details.
5. Run `scripts/create-workspace.mjs` outside the repository, once with `CLAUDECODE=1` (no `.claude/skills` in the workspace) and once without (skills copied). Verify nested destinations are created and existing ones are rejected without changes. Install workspace dependencies and validate the shipped templates. Check source leaks, credentials and local links.
6. Commit using Conventional Commits and test registration from GitHub after pushing. Tag the version and publish a release with a ZIP of the complete repository, including the hidden manifest and catalog folders, plus its SHA-256 checksum. Release archives are immutable snapshots; older releases can have a different layout.

This GitHub marketplace does not imply approval or listing in OpenAI's or Anthropic's public directories.

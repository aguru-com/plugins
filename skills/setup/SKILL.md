---
name: setup
description: Set up an Aguru workflow builder workspace with docs, schemas, templates and validation tools. Use after installing the Aguru plugin or when starting Aguru work without a builder workspace.
---

Create a local workspace for authoring Aguru workflows. It needs Node.js and
pnpm on this machine.

1. If the user already has a builder workspace, read its `AGENTS.md` and use
   it. Do not overwrite it with the packaged kit. An existing workflow project
   without builder tooling can remain where it is; create a separate builder
   workspace and use absolute paths to its definitions for validation and CLI
   commands.
2. Resolve the plugin root from this skill's location: two directories above
   the directory containing this `SKILL.md`. The packaged workspace is at
   `assets/builder-kit/` and its scaffold script is at
   `scripts/create-workspace.mjs`, both relative to that root. Resolve absolute
   paths before invoking the script; the shell's current directory is the
   user's folder, not the plugin root.
3. Check that Node.js and pnpm are available. Choose a new folder at the user's
   requested location, or `aguru-workflows` beneath the current folder. Any
   missing parent folders are created. Run:

   ```sh
   node "<absolute-plugin-root>/scripts/create-workspace.mjs" "<new-workspace-directory>"
   ```

   The script refuses every existing destination. On a collision, use the
   existing builder workspace or choose a new folder; do not remove files to
   make setup succeed.

4. From the new workspace, run `pnpm install` and read `AGENTS.md`. Docs,
   schemas and templates are local copies; keep workflow edits in the user's
   workspace and leave the installed plugin untouched. Run
   `pnpm check <changed-yaml-files>` after edits and before deployment.
5. For deployment and live runs, use `AGURU_API_URL` and `AGURU_API_KEY`
   supplied in the environment. Never print or write the key into project
   files. Check the connection with `pnpm exec aguru project ls` only when
   credentials are configured. Missing credentials do not block local
   authoring and schema checks; report that live verification is still
   outstanding. If the Aguru CLI is unavailable, report the missing tool
   rather than inventing commands.
6. Report the workspace path and whether local tooling and the platform
   connection are ready. Tell the user to start later sessions from the
   workspace folder so the agent loads its rules. Continue with the requested
   workflow using this plugin's new-workflow skill when setup is part of an
   authoring request.

Explicit user instructions take precedence over this procedure. Setup does not
authorize deployment, starting runs or sending messages.

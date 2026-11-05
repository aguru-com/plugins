---
name: deploy
description: Import workflow definitions into the user's Aguru org. Use when the user asks to deploy, import or publish a workflow, or before a live run.
---

Resolve the Aguru workspace before following this procedure. It is the folder
containing the builder kit's AGENTS.md, docs/, schema/, templates/, and
scripts/check-definitions.mjs. Read that AGENTS.md explicitly and run commands
from that folder. Use absolute paths for project folders outside the workspace.
If no workspace exists, use the setup skill bundled with this plugin first.
Do not copy the kit over an existing repository or edit the installed plugin.

Run `pnpm check <changed-yaml-files>` after writing definitions and before deploying.
Explicit user instructions take precedence over this procedure. Reuse existing
authorization for deployment or live runs when it covers the target and effects.
Connectivity is required for live operations; missing credentials do not block
local authoring and validation. Template tests are maintained by Aguru; follow
AGENTS.md's live-run verification rule for the workflows you author.


# Deploy

Read `docs/deploy.md`. Needs `AGURU_API_URL` and `AGURU_API_KEY` in the
environment; never print the key. If `pnpm exec aguru --help` reports that
`aguru` is missing, install it in the workflow workspace with
`pnpm add -D @aguru-com/cli`, then verify access with
`pnpm exec aguru project ls` before continuing.

1. **Check first:** the schema check must pass on every definition
   (`pnpm check <files>`).
2. **Confirm the target.** Say which environment (`AGURU_API_URL`) and which
   project you are importing into, and get a yes before the first import of
   the session.
3. **Get the project id:**

   ```sh
   pnpm exec aguru project create <dir>
   ```

   It reads `<dir>/manifest.yaml` and returns the project whose alias is the
   manifest's `ref`, creating and installing it first if it does not exist.

4. **Import the whole project**, manifest and workflows together:

   ```sh
   pnpm exec aguru project deploy <dir>
   ```

   It sends `manifest.yaml` and every YAML under the folder in one request
   and commits them to the project's repository as its next version.
   Workflows and subflows are imported in place, the manifest's config
   declaration replaces the project's, and a project workflow the folder no
   longer holds is archived. Tests and fixtures come back as `excluded`.

5. **Read the result.** Report the `version` number; the project's Versions
   tab shows it. A deploy is all or nothing: on refusal, report every error
   with its ref and field, fix, and deploy again. The refused commit and its
   revert stay in the project's history; that is expected. A refusal that
   names a GitHub repository means the project lives on the user's own
   GitHub: tell them to push to it instead, and do not retry.
6. **Never delete a definition**, even to "start clean". Deleting deletes its
   run history. If a definition must go, tell the user and let them decide.
7. **Config values.** The import declares the config fields; the values an
   installation uses come from each field's `defaultValue` until someone sets
   them. Say which fields have no default, so the user can set them on the
   installation before a run.

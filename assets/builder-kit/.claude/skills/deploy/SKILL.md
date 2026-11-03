---
name: deploy
description: Import workflow definitions into the user's Aguru org. Use when the user asks to deploy, import or publish a workflow, or before a live run.
---

# Deploy

Read `docs/deploy.md`. Needs `AGURU_API_URL` and `AGURU_API_KEY` in the
environment; never print the key.

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

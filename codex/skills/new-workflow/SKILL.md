---
name: new-workflow
description: Start a new Aguru workflow or subflow from the nearest tested template and verify it with live runs. Use when the user asks to build an Aguru workflow.
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


# New workflow

1. **Restate the use case** in three lines: what starts it, what it does,
   how it ends. List every outside system and person it touches. Ask the user
   only about what you cannot infer.

   **Every result must be startable.** Only a `kind: workflow` can be
   started; a `kind: subflow` runs only when another definition calls it.
   What starts the use case decides the entry: a person or an API call with
   params, a schedule, or an incoming event. When the user asks for a
   subflow, or the logic belongs in one, also write a thin `kind: workflow`
   that calls it and returns its result, as template 01's
   `acme-show-job.yaml` does. A subflow alone can be deployed but never run.

2. **Pick the nearest template** from `templates/` (the table in
   `AGENTS.md`). Read its README and YAML in full.
3. **Copy the template's folder**, entry workflow included and `test/` left
   out, into a new folder named after the workflow. Rename every `ref`, and
   every reference to it, with a prefix of your project's own
   (`<project>-...`). Refs are unique across the whole org: importing with
   `--update-existing` replaces the definition that holds a ref, even one in
   another project.
4. **Sketch the blocks** before writing YAML: one line per block with its
   type and what it reads and writes. Check each type's page in
   `docs/blocks/`. Prefer native blocks; a `js` block needs a reason. For a
   third-party service, find its connector in `docs/connectors/README.md`
   and pick the action from its page (template 07).
5. **Write the YAML.** Run `pnpm check <changed-yaml-files>` after edits and
   fix what it reports. Re-read `docs/platform-rules.md` against what you wrote.
6. **Declare configuration** in `manifest.yaml`: per-org values the setup
   wizard asks for go in `setup`, everything else in `install`. Never make a
   config value a param. Concluding setup starts `activates` once with no
   params, so a workflow started per record, with params, gets no wizard: its
   fields go in `install`. See `docs/manifest.md`.
   For an `llm` block, follow template 10's complete setup example: declare
   an `LLM_MODEL` field in `env` and pass it whole to `model`; its `api-key`
   names a provider-key credential the org stores. Check that the credential
   exists before a live run. Deployment does not provision it. If settings
   access is unavailable, give the user the exact fields to create in the
   product.
7. **Finish with `$deploy` and `$run`.** The workflow is done when a live run
   of each of its endings passes.

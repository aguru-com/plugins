---
name: new-workflow
description: Start a new Aguru workflow or subflow from the nearest tested template and verify it with live runs. Use when the user asks to build an Aguru workflow.
---

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
   For each API you call with `http`, find how it authenticates (its OpenAPI
   `securitySchemes` or its authentication docs) and pick the credential and
   header from the table in `docs/credentials.md`. An API that hands out a
   client id and secret takes a refreshing Bearer Token (template 11), never
   a token request written in YAML.
5. **Write the YAML.** Run `pnpm check <changed-yaml-files>` after edits and
   fix what it reports. Re-read `docs/platform-rules.md` against what you wrote.
6. **Declare configuration** in `manifest.yaml`: per-org values the setup
   wizard asks for go in `setup`, everything else in `install`. Never make a
   config value a param. Concluding setup starts `activates` once with no
   params, so a workflow started per record, with params, gets no wizard: its
   fields go in `install`. See `docs/manifest.md`.
   For an `llm` block, follow template 10's complete setup example: declare
   an `LLM_MODEL` field in `env` and pass it whole to `model`; its `api-key`
   names a provider-key credential the org stores.
   Deployment provisions no credential. Before a live run, give the user a
   setup table for every credential the project needs, including those a
   refreshing credential's token request names, as `docs/credentials.md`
   describes, and wait for them to confirm it is saved
   (and, for a refreshing one, that **Test Connection** passed).
7. **Finish with the `deploy` and `run` skills.** The workflow is done when a live run
   of each of its endings passes.

---
name: run
description: Run a workflow on the Aguru platform and read what every block did. Use to verify a change for real, to debug a run, or when the user asks to run or test a workflow live.
---

# Run

This is how you test a workflow: on the platform's engine, against the real
API (or the mock), a real model and real email. Read
`docs/deploy.md` for the routes.

## Before starting

- **Start a `kind: workflow` ref.** The platform refuses a subflow as a
  run's entry. To run a subflow, start the workflow that calls it; if none
  exists, write one first (`/new-workflow`).
- **Deploy first** (`/deploy`), so the run uses the current YAML.
- **Own org, own addresses.** Runs go to the user's own installation. Every
  email address, phone number and stakeholder in the params must belong to
  the user's team. Ask before any run that would message anyone else.
- **Ask before any block that sends a message** (`email`, `sms`,
  `whatsapp`, `scm`) on the first run of a session, naming the recipients.
- **Realistic params.** Fill every param with a value from the user's use
  case, so the run executes the blocks you are checking. Never start a run
  with blank or placeholder params.
- **Say what you expect** before you start: the path through the workflow
  and the result. You will compare against it.

## Run a workflow

1. Start it with the params:
   `pnpm exec aguru execution start <ref> --params '<json>'`, or
   `POST /api/executions/start-enhanced` until the CLI is available.
2. Follow it until it completes, fails or parks: `GET /api/executions/:id`
   every few seconds, backing off to a minute, for at most 10 minutes. A
   parked run still reads `status: running`. A non-empty `activeWaitPoints`
   shows it parked, but an empty one does not show it moving: a run waiting
   on an SCM reply or a plain `wait` duration lists nothing there. So when
   it is still `running` after a minute, read the history (step 3) and look
   for a started `scm`, `wait` or `hitl` block with no output; that run is
   parked. Stop polling once it is, and when the 10 minutes are up.
3. Read the history (`pnpm exec aguru execution show <id>`, or `GET
   /api/executions/:id/history`). Report each block in order: its input, its
   output, how long it took, and any failure. Keep long values to their
   first lines. Over HTTP, each block's `input` and `output` is a wrapper:
   `{ kind: "inline", value }` holds the value, and `{ kind: "ref", ... }`
   means it is stored apart. Fetch a stored one with `POST
   /api/executions/:id/resolve` and `{ "path": "<block path>", "slot":
   "output" }` (or `"input"`), adding the history's `runId` when you read a
   specific attempt.
4. Compare with what you expected and say where it differs. Once the run
   has completed, `result` in `execution show` (`result` in the history over
   HTTP) is what it returned: the `return` projection. A result over 1 MiB
   reads `{ kind: "ref" }` and cannot be fetched; keep `return` to what the
   caller needs.

## When the run parks

Each entry in `activeWaitPoints` names the block and signal it waits on; an
SCM reply or a `wait` duration shows only in the history, as an unfinished
block. Say what it waits on and what moves it:

| Waiting on         | Moves it                                                     |
| ------------------ | ------------------------------------------------------------ |
| An SCM draft       | An operator approves it on the Approvals page                |
| An SCM reply       | The stakeholder replies; tell the user which inbox to answer |
| A `hitl` form      | An operator answers, or `POST /api/executions/:id/signals`   |
| A `wait` signal    | `POST /api/executions/:id/signals` with that signal          |
| A `wait` duration  | Time; say when it ends                                       |
| A held `llm` block | Fix the API key or model, then Retry on the Approvals page   |

Send a signal yourself only when it is a test of the workflow's own logic and
the user agreed. Never approve a draft or answer for a person.

## Fixing and re-running

- After a fix, import again and start a new run. That is almost always
  right for a test run.
- A run that failed, was cancelled, terminated or timed out can instead be
  restarted on the new definition: `POST
  /api/executions/:id/restart-with-new-definition` with
  `{ "attemptNumber": <currentAttemptNumber from GET /api/executions/:id> }`.
  It starts from the top.
- A parked run cannot be restarted. Cancelling it (`POST
  /api/executions/:id/cancel`) withdraws its SCM needs and ends it, so ask
  the user first.
- Never delete a definition or a run to clean up.

## Run one block

Running a single block live, with real side effects, needs the platform's
block-run route, which is not available yet. Until then, isolate the block in
a small workflow of its own, deploy it, and run that.

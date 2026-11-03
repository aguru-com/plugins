# Aguru workflow project

Workflows for the Aguru platform, built with Claude Code. Open this folder in
Claude Code and describe the workflow you need; `AGENTS.md` and the skills in
`.claude/` tell it how to work here.

## Setup

```sh
pnpm install                       # or npm install
export AGURU_API_URL=https://api.aguru.com
export AGURU_API_KEY=aguru_...     # Settings → Access Tokens, in your own org
```

## What is here

| Path         | Holds                                                                                  |
| ------------ | -------------------------------------------------------------------------------------- |
| `AGENTS.md`  | The rules your coding agent follows in this repo                                       |
| `CLAUDE.md`  | Imports `AGENTS.md` for Claude Code                                                    |
| `.claude/`   | Skills (`/new-workflow`, `/add-scm-need`, `/deploy`, `/run`) and the schema-check hook |
| `docs/`      | The platform reference: concepts, rules, blocks, expressions                           |
| `schema/`    | JSON Schemas for workflow, subflow and test files                                      |
| `templates/` | Tested workflows to copy                                                               |
| `mock-api/`  | The fictional Acme Jobs API the templates call                                         |
| `scripts/`   | The schema check                                                                       |

Check any YAML against the schemas with `pnpm check <files>`. Serve the mock
API locally with `pnpm mock-api`.

# Devin AI

AI-powered engineering assistant for automating development tasks, code generation, and technical conversations.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-devin'
  version: '0.1.6'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Devin API key (used in the Authorization header).

## Actions

### `create_session`

**Create Session.** Starts a new Devin AI engineering session from a prompt, kicking off an autonomous coding/technical task. Use this to begin work; capture the returned session id for follow-up actions. Optionally seed the session from a snapshot or playbook, mark it unlisted, or set the idempotent flag so repeat calls reuse an existing session instead of spawning a new one. By default each call creates a new session. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `prompt` | string | yes |  | Prompt. |
| `snapshotId` | string | no |  | Snapshot ID. |
| `playbookId` | string | no |  | Playbook ID. |
| `unlisted` | boolean | no |  | Unlisted. |
| `idempotent` | boolean | no |  | Idempotent. |

### `get_session_details`

**Get Session Details.** Fetches the current details and status of an existing Devin session by its session id. Use this to check progress, read results, or poll the outcome of a previously created session. Read-only and idempotent; requires a valid session id. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sessionId` | string | yes |  | Session ID. The ID of the session to retrieve details for. |

### `send_message`

**Send Message.** Posts a message into an existing Devin session to give it further instructions, context, or follow-up requests. Use this to continue a conversation with an already-running session rather than starting a new one. Requires the target session id and message text; not idempotent, as each call appends a new message. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sessionId` | string | yes |  | Session ID. The ID of the session to send the message to. |
| `message` | string | yes |  | Message. The message to send to the session. |

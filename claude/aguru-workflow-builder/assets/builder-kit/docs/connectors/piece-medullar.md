# Medullar

AI-powered discovery & insight platform that acts as your extended digital mind

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-medullar'
  version: '0.3.7'
```

Categories: ARTIFICIAL_INTELLIGENCE, PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Please use your personal **API KEY**. You can generate one in your [Medullar account profile](https://my.medullar.com/my-account), under the **API Keys** section.

## Actions

### `createSpace`

**Create new Space.** Creates a new Medullar Space (a knowledge container scoped to the authenticated user's company) with the given name. Use to set up a fresh Space before adding records or asking questions. Not idempotent: each call creates a separate Space even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `space_name` | string | yes |  | Space Name. |

### `listSpaces`

**List Spaces.** Retrieves all Medullar Spaces belonging to the authenticated user. Use to discover available Spaces and their UUIDs before targeting one in another action (add record, ask, rename, delete). Read-only and idempotent; takes no input. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `addSpaceRecord`

**Add Space Record.** Ingests a new content record into a Medullar Space identified by its UUID, so the content becomes part of that Space's knowledge base. The source type selects what kind of content is added (url, text, image, or file), with content and/or url supplied accordingly. Use to feed material into a Space before asking questions about it. Not idempotent: each call appends a new record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. Select an Space. A value the product loads from the provider, such as an id; write the value itself. |
| `sourceType` | string | yes |  | Source Type. Select source type. One of `"url"`, `"text"`, `"image"`, `"file"`. |
| `content` | string | no |  | Content. Optional. Content of the record. |
| `url` | string | no |  | URL. Optional. URL of the record. |

### `askSpace`

**Ask Space.** Sends a question or message to a Medullar Space identified by its UUID and returns the AI agent's response grounded in that Space. The chat mode selects which agent answers (general agent, Grok-backed agent, fact-check, researcher, sales researcher, or search), and an optional deep-analysis flag trades speed for accuracy. If no chat UUID is given a new chat is created automatically; supplying one continues that conversation. Not idempotent: each call posts a message and generates a fresh response. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. Select an Space. A value the product loads from the provider, such as an id; write the value itself. |
| `chatId` | string | no |  | Chat. Optional. Select a Chat where messages will be stored, if not selected, a default chat will be created with the name `automated`. A value the product loads from the provider, such as an id; write the value itself. |
| `selectedMode` | string | yes |  | Chat Mode. Select chat mode. One of `"single_agent"`, `"single_agent_xai"`, `"fact_check_agent"`, `"research_agent"`, `"sales_research_agent"`, `"`search_agent`"`. |
| `isReasoning` | boolean | no | `false` | Deep Analysis. Optional. Enable Deep Analysis to get more accurate results but slower response time. |
| `text` | string | yes |  | Message. Message to send to the Space. |

### `deleteSpace`

**Delete Space.** Permanently deletes a Medullar Space identified by its UUID, along with its associated content. Use to remove a Space the user no longer needs. Destructive and not safely repeatable: a second call for the same UUID targets an already-removed Space. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. Select an Space. A value the product loads from the provider, such as an id; write the value itself. |

### `renameSpace`

**Rename Space.** Updates the name of an existing Medullar Space identified by its UUID. Use to relabel a Space without affecting its records or chats. Idempotent: repeating with the same UUID and name leaves the Space at that name. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. Select an Space. A value the product loads from the provider, such as an id; write the value itself. |
| `space_name` | string | yes |  | Space Name. |

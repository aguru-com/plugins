# Letta

Letta is the platform for building stateful agents: open AI with advanced memory that can learn and self-improve over time.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-letta'
  version: '0.1.8'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To authenticate with Letta:
>
> 1. **For Letta Cloud**: Get your API key from [Letta Cloud](https://cloud.letta.ai)
> 2. **For Self-hosted**: Leave API key empty and provide your server URL (e.g., http://localhost:8283)

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | no |  | API Key. Your Letta API key (required for Letta Cloud, leave empty for self-hosted) |
| `baseUrl` | string | no |  | Base URL. Server URL for self-hosted instances (e.g., http://localhost:8283). Leave empty to use Letta Cloud. |

## Actions

### `createAgentFromTemplate`

**Create Agent From Template.** Deploys a new stateful Letta agent from an existing template version (identified by its template version ID), optionally seeding it with a name, identities, tags, memory/tool variables, and an initial message sequence. Use to provision a fresh agent instance from a reusable blueprint. Not idempotent: each call creates a new agent (or deployment) even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `templateVersion` | string | yes |  | Template Version. The template version ID to create the agent from. |
| `agentName` | string | no |  | Agent Name. The name of the agent (optional, a random name will be assigned if not provided) |
| `identityIds` | array | no |  | Identities. Select identities to assign to the agent. Values the product loads from the provider, such as ids; write an array of them. |
| `tags` | array | no |  | Tags. Tags to assign to the agent. Each item: { `tag` }. |
| `memoryVariables` | object | no |  | Memory Variables. Memory variables to assign to the agent (key-value pairs) |
| `toolVariables` | object | no |  | Tool Variables. Tool variables to assign to the agent (key-value pairs) |
| `initialMessageSequence` | array | no |  | Initial Message Sequence. Initial sequence of messages to start the agent with. Each item: { `content`, `role`, `name`? }. |

### `createIdentity`

**Create Identity.** Creates a Letta identity (representing an org, user, or other entity) with a required external identifier key and name, plus optional project scoping and typed key/value properties. Use to register a new addressable identity that agents can be associated with. Not idempotent: each call creates a new identity record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifierKey` | string | yes |  | Identifier Key. External, user-generated identifier key of the identity. |
| `name` | string | yes |  | Name. The name of the identity. |
| `identityType` | string | yes |  | Identity Type. The type of the identity. One of `"org"`, `"user"`, `"other"`. |
| `projectId` | string | no |  | Project ID. The project ID of the identity (optional) |
| `properties` | array | no |  | Properties. List of properties associated with the identity. Each item: { `key`, `type`, `value` }. |

### `sendMessageToAgent`

**Send Message to Agent.** Sends a message to a specific Letta agent (by agent ID) and returns the agent's non-streaming response, optionally capping how many reasoning steps it may take. Use to converse with or prompt an existing agent. Not idempotent: each call appends a new message and advances the agent's stateful memory. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent. Select the agent to send a message to. A value the product loads from the provider, such as an id; write the value itself. |
| `input` | string | yes |  | Message. The message content to send to the agent. |
| `maxSteps` | number | no |  | Max Steps. Maximum number of steps the agent should take to process the request. |

### `getIdentities`

**Get Identities.** Lists identities in the Letta project, optionally filtering by identifier key, name, identity type, or project ID and capping the result count; with no filters it returns all identities (up to the limit). Use to look up identity IDs or check whether an identity already exists. Idempotent: read-only query with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `identifierKey` | string | no |  | Identifier Key. Filter by identifier key. |
| `name` | string | no |  | Name. Filter by identity name. |
| `identityType` | string | no |  | Identity Type. Filter by identity type. One of `"org"`, `"user"`, `"other"`. |
| `projectId` | string | no |  | Project ID. Filter by project ID. |
| `limit` | number | no | `100` | Limit. Maximum number of identities to return. |

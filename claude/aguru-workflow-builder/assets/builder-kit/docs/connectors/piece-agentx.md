# AgentX

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-agentx'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: AgentX API Key

> **Enter your AgentX API Key**
> ---
> ### How to obtain your API key
> 1. Visit [AgentX](https://www.agentx.so/) and log in.
> 2. Click on your avatar (bottom-left corner).
> 3. Copy your API Key from the popup window.
> 4. Paste it here.

## Actions

### `createConversationWithSingleAgent`

**Create Conversation With Single Agent.** Opens a new conversation thread with a specific AgentX agent (identified by agent ID), choosing the conversation type (chat, search, or ecommerce). Use this to begin an interaction before sending messages; it does not send any message itself. Each call starts a fresh conversation, so calling it repeatedly creates multiple separate conversations (not idempotent). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent. Select an AgentX agent. A value the product loads from the provider, such as an id; write the value itself. |
| `type` | string | yes |  | Conversation Type. Choose the type of conversation. One of `"chat"`, `"search"`, `"ecommerce"`. |

### `sendMessageToExistingConversation`

**Send Message to Existing Conversation.** Posts a message into an existing AgentX conversation (by conversation ID) and gets the agent reply, with a selectable response mode (chat or search) and an optional memory-context window controlling how many prior messages the agent considers. Use this to continue an already-created conversation; create the conversation first to obtain its ID. Each call appends a new message and produces a new reply (not idempotent). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent. Select an AgentX agent. A value the product loads from the provider, such as an id; write the value itself. |
| `conversationId` | string | no |  | Conversation. Select a conversation for the chosen Agent. A value the product loads from the provider, such as an id; write the value itself. |
| `agentMode` | string | yes |  | Agent Mode. Choose how the agent should respond. One of `"chat"`, `"search"`. |
| `message` | string | yes |  | Message. The message you want to send to the agent. |
| `context` | number | no |  | Memory Context. Number of previous messages to include. 0 = as much as possible, 1 = only last message, etc. |

### `find_message`

**Find Message.** Retrieves messages from a specific AgentX conversation (by agent ID and conversation ID): leave the search term blank to return all messages in the conversation, or provide a search term to return only messages whose text contains it (case-insensitive). Use this to inspect or find content within a conversation. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent. Select an AgentX agent. A value the product loads from the provider, such as an id; write the value itself. |
| `conversationId` | string | no |  | Conversation. Select a conversation for the chosen Agent. A value the product loads from the provider, such as an id; write the value itself. |
| `searchTerm` | string | no |  | Search Term. Text to search for in message content. Leave blank if searching by Message ID. |

### `search_agents`

**Search Agents.** Lists AgentX agents on the account, optionally narrowing the results by partial name match and/or exact agent ID; leave both filters blank to return all agents. Use this to discover available agents or resolve an agent ID before starting a conversation. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Agent Name. Search by agent name (partial matches allowed). |
| `id` | string | no |  | Agent ID. Search by exact Agent ID. |

### `find_conversation`

**Find Conversation.** Lists conversations belonging to a specific AgentX agent (by agent ID); optionally filter to a single conversation by exact conversation ID, or by name (a partial, case-insensitive match against the name derived from the conversation's first message). Leave both filters blank to return all of the agent's conversations. Use this to resolve a conversation ID before sending or finding messages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `agentId` | string | yes |  | Agent. Select an AgentX agent. A value the product loads from the provider, such as an id; write the value itself. |
| `conversationId` | string | no |  | Conversation ID. Search by exact Conversation ID. |
| `conversationName` | string | no |  | Conversation Name,tittle or ID. Search conversation by its name (derived from the first message). |

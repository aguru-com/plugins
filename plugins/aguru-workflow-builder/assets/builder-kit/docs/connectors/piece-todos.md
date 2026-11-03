# Todos

Create tasks for project members to take actions, useful for approvals, reviews, and manual actions performed by humans

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-todos'
  version: '0.0.17'
```

Categories: CORE, FLOW_CONTROL. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `createTodo`

**Create Todo.** Creates a todo for a user, requiring them to respond or take action.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `description` | string | no |  | Description. These details will be displayed for the assignee. Add the full context so they can take proper action, You can also use markdown formatting. |
| `assigneeId` | string | no |  | Assignee. A value the product loads from the provider, such as an id; write the value itself. |
| `statusOptions` | array | yes | `[{"name":"Accepted","variant":"Positive (Green)","continueFlow":true},{"name":"Rejected","variant":"Negative (Red)","continueFlow":true}]` | Status Options. Each item: { `name`, `variant`, `continueFlow` }. |

### `wait_for_approval`

**Wait for Approval.** Pauses the flow and wait for the approval from the user.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task ID. The ID of the task to wait for approval. |

### `createTodoAndWait`

**Create Todo and Wait.** Creates a todo for a user and wait for their response or take action.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `description` | string | no |  | Description. These details will be displayed for the assignee. Add the full context so they can take proper action, You can also use markdown formatting. |
| `assigneeId` | string | no |  | Assignee. A value the product loads from the provider, such as an id; write the value itself. |
| `statusOptions` | array | yes | `[{"name":"Accepted","variant":"Positive (Green)","continueFlow":true},{"name":"Rejected","variant":"Negative (Red)","continueFlow":true}]` | Status Options. Each item: { `name`, `variant`, `continueFlow` }. |

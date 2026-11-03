# Queue

A piece that allows you to push items into a queue, providing a way to throttle requests or process data in a First-In-First-Out (FIFO) manner.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-queue'
  version: '0.2.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `push-to-queue`

**Push to Queue.** Appends one or more items to the end of a named project-scoped FIFO queue, creating the queue on first use; any flow using the same queue name writes to the same queue. Use it to buffer or throttle work for later consumption with Pull items from queue; use Get Queue Size or Peek at Queue to check the backlog without changing it. Not idempotent: each call appends the items again; the write fails once the queue would exceed 512 KB, and parallel runs pushing the same queue can lose items.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `queueName` | string | yes |  | Queue Name. The name of the queue. Every flow in the project that uses the same name shares the same queue. Up to 110 characters in flow runs, or 102 when testing this step on its own. |
| `items` | array | yes |  | Items. |

### `pull-from-queue`

**Pull items from queue.** Removes and returns the first N items of a named project-scoped FIFO queue and writes the remainder back, so it is a destructive consume - the returned items are gone from the queue, and fewer than requested come back when the queue holds less. Use it to drain work buffered by Push to Queue; prefer Peek at Queue to read items without removing them, and Clear queue to empty the queue without reading it. The number of items must be a whole number of 0 or more. Not idempotent: every call consumes a further batch, and parallel runs pulling the same queue can receive the same items.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `queueName` | string | yes |  | Queue Name. The name of the queue. Every flow in the project that uses the same name shares the same queue. Up to 110 characters in flow runs, or 102 when testing this step on its own. |
| `numOfItems` | number | yes |  | Number of items. How many items to take from the front of the queue (a whole number, 0 or more). |

### `peek-queue`

**Peek at Queue.** Reads the first N items of a named project-scoped FIFO queue without removing them. Use it to inspect pending work or decide whether to pull; use Pull items from queue to consume items, or Get Queue Size when only the count matters. Requires the exact queue name used by Push to Queue; the number of items defaults to 1 and must be a whole number of 0 or more. Read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `queueName` | string | yes |  | Queue Name. The name of the queue. Every flow in the project that uses the same name shares the same queue. Up to 110 characters in flow runs, or 102 when testing this step on its own. |
| `numOfItems` | number | no | `1` | Number of items. How many items to read from the front of the queue (a whole number, 0 or more). Defaults to 1. |

Output fields:

- `items`: Item
- `itemCount`: Items Returned (number)
- `queueSize`: Total Items in Queue (number)

### `get-queue-size`

**Get Queue Size.** Counts the items currently waiting in a named project-scoped FIFO queue without reading or removing them. Use it as a guard before Pull items from queue or to branch on backlog size; use Peek at Queue when the items themselves are needed. Requires the exact queue name used by Push to Queue. Read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `queueName` | string | yes |  | Queue Name. The name of the queue. Every flow in the project that uses the same name shares the same queue. Up to 110 characters in flow runs, or 102 when testing this step on its own. |

Output fields:

- `queueName`: Queue Name
- `size`: Items in Queue (number)
- `isEmpty`: Is Empty (boolean)

### `clear-queue`

**Clear queue.** Permanently deletes a named project-scoped queue and every item stored in it, keyed by the exact queue name. Use it to reset a queue wholesale; prefer Pull items from queue when the buffered items still need to be read and processed. Idempotent: the queue ends up empty however many times it runs, and clearing an already-empty or never-created queue still succeeds.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `queueName` | string | yes |  | Queue Name. The name of the queue. Every flow in the project that uses the same name shares the same queue. Up to 110 characters in flow runs, or 102 when testing this step on its own. |

Output fields:

- `success`: Cleared (boolean)

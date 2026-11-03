# Delay

Pause your flow for a set duration or until a specific time

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-delay'
  version: '0.4.0'
```

Categories: CORE, FLOW_CONTROL. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `delayFor`

**Delay For.** Pauses the flow for a fixed relative duration before the next step runs, given as an amount plus a unit (seconds, minutes, hours or days); short waits sleep in-process while longer ones suspend the run and resume it later. Pick this when the wait is known relative to now, and prefer Delay Until when you have an absolute target date/time. The amount must be non-negative and the wait cannot exceed the instance paused-flow timeout; idempotent, nothing is created or mutated.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `delayFor` | number | yes | `5` | Amount. |
| `unit` | string | yes | `"seconds"` | Unit. One of `"seconds"`, `"minutes"`, `"hours"`, `"days"`. |

Output fields:

- `delayForInMs`: Delayed For (duration)
- `success`: Success (boolean)

### `delay_until`

**Delay Until.** Suspends the flow until one absolute date/time (ISO and other parseable formats) and then continues with the next step; a timestamp already in the past resumes immediately, and waits longer than a minute suspend the run rather than sleeping in-process. Choose this when the resume point is a known calendar instant, and prefer Delay For when you only know a relative duration. Requires the target timestamp, which must be parseable - an unparseable value throws instead of continuing - and the wait cannot exceed the instance paused-flow timeout; idempotent, it changes no data.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `delayUntilTimestamp` | ISO date-time string | yes |  | Date and Time. A time without a timezone is read as UTC. |

Output fields:

- `delayTill`: Delayed Until (datetime)
- `success`: Success (boolean)

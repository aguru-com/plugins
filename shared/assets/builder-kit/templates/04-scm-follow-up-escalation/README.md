# 04 SCM: follow-up and escalation

Chases a contractor for a signed completion report. Reminds them on a fixed
schedule, emails an escalation contact when reminders run out, and hands the
job to an operator if the report never comes.

- `follow-up.sequence` sets each reminder's gap; `weekdays` moves a reminder
  off the weekend.
- `on-exhaustion: escalate` with `escalation.steps` emails your team, then
  waits out the `timeout`. A reply still settles the need.
- An `attachment` slot resolves to file metadata (`id`, `filename`,
  `mimeType`, `size`), never the file.
- When the need is abandoned, a `hitl` block asks an operator on the
  Approvals page, with a short reason and a select field.
- A `hitl` with a `timeout` returns `null` when nobody decides, which the
  template treats as "leave it open".

**Change first:** the slot, the reminder sequence and the escalation email.

**Tests**

| Test                     | Proves                                                   |
| ------------------------ | -------------------------------------------------------- |
| "registers reminders"    | The follow-up and escalation the SCM is given            |
| "closes the job"         | A received report is written back with its attachment id |
| "operator decides"       | A signal answers the `hitl`                              |
| "operator never decides" | `skip-time` past the `hitl` timeout                      |

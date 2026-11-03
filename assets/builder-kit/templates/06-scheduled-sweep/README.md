# 06 Scheduled sweep

Runs once a day. Finds tomorrow's visits and reminds each site contact once.
Start here for anything that runs on a schedule over many records.

- **The schedule** is `config.setup.schedule` in `manifest.yaml`.
  When an org completes the setup wizard, the platform creates a schedule
  that runs `config.setup.activates` every `every` (an interval, not a time of day) and
  starts its first run at once. The workflow takes no required params,
  since neither start passes any.
- **One child run per job.** The sweep starts `acme-remind-contact` with a
  `workflow` block and moves on; it does not wait for the reminder.
- **The child is idempotent.** Its `idempotency.key` is the job and visit
  date, so a second start for the same visit joins the existing run, running
  or ended, instead of reminding twice.
- **`billing`** checks the subscription first. The child meters a reminder
  only when its need is fulfilled, so one that expires unsent costs nothing.
  The `event-id` makes the meter idempotent across retries.
- The need has only a brief, so it is fulfilled once the reminder is sent.

**Change first:** the listing query, the brief and the schedule.

**Tests**

| Test                       | Proves                                      |
| -------------------------- | ------------------------------------------- |
| `tomorrow` unit            | The date arithmetic across a month end      |
| "one reminder run per job" | Each job starts a child with its params     |
| "no active subscription"   | Nothing is listed or started                |
| "metered once it is sent"  | The need's stakeholder and brief, and meter |
| "expired unsent"           | An unsent reminder is not metered           |

The join on a repeated start is the platform's; wftest cannot show it.

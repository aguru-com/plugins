# 02 HTTP sync

Lists every scheduled job, finds the overdue ones and puts each on hold. Start
here for a batch job that reads a list and writes back.

- `http` **pagination** walks the cursor for you, one activity per page.
  Check `pagination.completed`: `false` means the page cap stopped the walk.
- One `js` block does the filtering, the only logic that needs a program.
  It is unit-tested like a pure function.
- The `loop` writes back with `fail-on-error: false`, so one refused update
  is logged and counted instead of failing the run. Without it, any non-2xx
  answer fails the block and the run.

**Change first:** the query, the filter in `find-overdue`, and the PATCH body.

**Tests**

| Test                       | Proves                                                  |
| -------------------------- | ------------------------------------------------------- |
| `find-overdue` units       | The filter on every edge: before, on and without a date |
| `list-scheduled-jobs` unit | The query and the cursor wiring                         |
| e2e "holds every"          | The happy path and the PATCH request                    |
| e2e "refuses"              | A failed write is logged, counted, and the loop goes on |
| e2e "page cap"             | An incomplete listing is reported                       |

A mocked `http` block never fails, whatever `success` the mock says. Test an
error path by reading `success` with `fail-on-error: false`, as here.

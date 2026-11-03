# 08 Connector chain

Lists the items a feed published in the last 24 hours using only connector
actions: no `http`, no `js`. Start here when one connector action needs
another's result, or for dates and times. It needs no credential and no
config, so it runs live as soon as it is deployed: start it with any public
feed, such as `https://hnrss.org/frontpage`.

- **One action's output is the next one's input.** `get-now` writes
  `{ result }` to `ctx.now`; `get-cutoff` reads `${ctx.now.result}`. A
  connector block's `out` holds the action's output itself, with no wrapper:
  the feed's items are `ctx.feed.items`, not `ctx.feed.data.items`. The
  output shape is on no connector page, so read it from a run's history or a
  unit test before you build on it.
- **Dates come from Date Helper**, not from expressions, which cannot parse
  or do arithmetic on dates. `X` is Unix seconds; `YYYY-MM-DDTHH:mm:ss` with
  `timeZone: UTC` is ISO without the zone, so `Z` is added where an ISO
  date-time is expected.
- **Filter in the action when it can.** `published_after` keeps only newer
  items before `limit` applies. Filtering the list afterwards in an
  expression gives a different answer: the newest 10, then the recent ones.
- **The `return` projection shapes the result** with `map`, so nothing else
  in the feed reaches the caller.

**Change first:** the feed and the window. `expression` takes `+` or `-`
with `year`, `month`, `day`, `hour`, `minute` or `second`.

**Tests**

| Test               | Proves                                                               |
| ------------------ | -------------------------------------------------------------------- |
| `get-cutoff` unit  | The real Date Helper output for a fixed time, `{ result }` included  |
| reads recent items | The cutoff the feed is asked with, and the titles and links returned |
| nothing recent     | An empty feed returns an empty list and the run completes            |

`get-now` and `read-feed` are mocked: one reads the clock and the other the
network. `get-cutoff` runs for real, because Date Helper works offline.

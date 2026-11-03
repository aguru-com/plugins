# Sub Flows

Trigger and call another sub flow.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-subflows'
  version: '0.7.0'
```

Categories: CORE, FLOW_CONTROL. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `callFlow`

**Call Flow.** Dispatches a run of another flow in this project that starts with a "Callable Flow" trigger, passing a payload entered as key-value pairs or raw JSON, and can optionally wait for that subflow to send back a "Return Response". Pick it to reuse a flow as a subroutine; prefer Stream CSV to Subflows for large CSV input. The target flow must be published and enabled, and when Wait for Response is on, a subflow failure also fails this run; not idempotent, since every call starts a new subflow run.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `flowId` | string | yes |  | Flow. The flow to execute. Published flows with a "Callable Flow" trigger appear here; disabled flows are marked "(inactive)" and cannot be executed until they are enabled. A value the product loads from the provider, such as an id; write the value itself. |
| `mode` | string | yes | `"simple"` | Mode. Choose Simple for key-value or Advanced for JSON. One of `"simple"`, `"advanced"`. |
| `flowProps` | object | yes |  | . An object whose fields depend on other inputs; the product shows them. |
| `waitForResponse` | boolean | no | `false` | Wait for Response. |

### `streamCsvToSubflows`

**Stream CSV to Subflows.** Streams a CSV (a URL, an uploaded file, or a file from a previous step) and dispatches one subflow run per batch of rows. Pick it over Call Flow when the CSV is too large to hold in memory, since it is parsed as a stream and batches are fanned out with bounded concurrency. Rows per batch must be an integer between 1 and 10000 and the target subflow must be published with a "Callable Flow" trigger; not idempotent, since every batch dispatches a new subflow run.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | CSV File. The CSV to stream. Accepts a URL, an uploaded file, or a file from a previous step. It is streamed, not loaded into memory. Files are not supported; an action that needs one fails. |
| `subflow` | string | yes |  | Subflow. The subflow to call for each batch. Published flows with a "Callable Flow" trigger appear here; disabled flows are marked "(inactive)". A value the product loads from the provider, such as an id; write the value itself. |
| `batchSize` | number | yes | `100` | Rows per batch. How many CSV rows to send in each subflow call. Between 1 and 10000. |
| `delimiter` | string | yes | `","` | Delimiter. One of `","`, `"\t"`. |
| `extraData` | JSON | no |  | Extra Data. Optional data sent to every subflow call alongside the batch rows. Reference the output of a previous step. |

### `returnResponse`

**Return Response.** Sends a result payload back to the flow that invoked this one through Call Flow, releasing the caller from its wait; the body is entered as key-value pairs (Simple mode) or as raw JSON (Advanced mode). Use it only inside a flow whose trigger is "Callable Flow", and only when the caller ran with Wait for Response enabled - it silently does nothing when no callback URL was stored for the run. Not idempotent: each call posts a fresh response to the callback URL of the caller.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mode` | string | yes | `"simple"` | Mode. Choose Simple for key-value or Advanced for JSON. One of `"simple"`, `"advanced"`. |
| `response` | object | yes |  | Response. An object whose fields depend on other inputs; the product shows them. |

# Jungle Grid

Submit async compute jobs, monitor status and logs, and retrieve artifacts from Jungle Grid.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-jungle-grid'
  version: '0.2.1'
```

Categories: ARTIFICIAL_INTELLIGENCE, DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Connect with a scoped Jungle Grid API key. Use the default API base URL unless your workspace provides a custom endpoint.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `api_base_url` | string | yes | `"https://api.junglegrid.dev"` | API Base URL. Base URL for the Jungle Grid API. Keep the default unless Jungle Grid provides a specific endpoint for your workspace. |
| `api_key` | string | yes |  | API Key. Paste a scoped Jungle Grid API key from the Jungle Grid portal. |

## Actions

### `estimate_job`

**Estimate Job.** Compute a cost, duration, and resource estimate for a prospective Jungle Grid job from the same specification used by Submit Job, without actually running anything. Pick this to preview or budget-check a job before submission; it is a safe, idempotent calculation with no side effects. Use Submit Job afterwards to actually execute. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Job Name. Optional human-readable label for this Jungle Grid job. |
| `workload_type` | string | yes | `"inference"` | Workload Type. The workload class Jungle Grid should route. One of `"inference"`, `"batch"`, `"training"`. |
| `image` | string | yes |  | Container Image. Public container image reference, for example `python:3.11` or `pytorch/pytorch:2.4.0-cuda12.1-cudnn9-runtime`. |
| `model_size_gb` | number | no |  | Model Size (GB). Approximate model size in GB. Jungle Grid uses this for routing and cost estimation. |
| `command` | string | no |  | Command. Container command to run. Leave blank to use the image default entrypoint or command. |
| `args` | array | no |  | Arguments. Optional command arguments, one item per argument. |
| `optimize_for` | string | no | `"balanced"` | Optimize For. Placement preference for cost, speed, or balanced routing. One of `"balanced"`, `"cost"`, `"speed"`. |
| `max_price_per_hour` | number | no |  | Max Price Per Hour. Optional maximum hourly price in USD. |
| `preferred_gpu_family` | string | no |  | Preferred GPU Family. Optional GPU family preference, for example `l4`. |
| `avoid_gpu_families` | array | no |  | Avoid GPU Families. Optional GPU families to avoid, one item per family, for example `a100`. |
| `region_preference` | string | no |  | Region Preference. Optional region preference, for example `us-east`. |
| `latency_priority` | string | no |  | Latency Priority. Optional latency priority for routing. One of `"low"`, `"balanced"`, `"high"`. |
| `cost_priority` | string | no |  | Cost Priority. Optional cost priority for routing. One of `"low"`, `"balanced"`, `"high"`. |

### `submit_job`

**Submit Job.** Submit a new Jungle Grid job for asynchronous execution; it returns immediately with job metadata and does not wait for completion, so poll with Get Job Status afterwards. Pick this to actually run a workload (use Estimate Job first to preview cost). Not idempotent: each call creates a new job, so retries can launch duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Job Name. Optional human-readable label for this Jungle Grid job. |
| `workload_type` | string | yes | `"inference"` | Workload Type. The workload class Jungle Grid should route. One of `"inference"`, `"batch"`, `"training"`. |
| `image` | string | yes |  | Container Image. Public container image reference, for example `python:3.11` or `pytorch/pytorch:2.4.0-cuda12.1-cudnn9-runtime`. |
| `model_size_gb` | number | no |  | Model Size (GB). Approximate model size in GB. Jungle Grid uses this for routing and cost estimation. |
| `command` | string | no |  | Command. Container command to run. Leave blank to use the image default entrypoint or command. |
| `args` | array | no |  | Arguments. Optional command arguments, one item per argument. |
| `optimize_for` | string | no | `"balanced"` | Optimize For. Placement preference for cost, speed, or balanced routing. One of `"balanced"`, `"cost"`, `"speed"`. |
| `max_price_per_hour` | number | no |  | Max Price Per Hour. Optional maximum hourly price in USD. |
| `preferred_gpu_family` | string | no |  | Preferred GPU Family. Optional GPU family preference, for example `l4`. |
| `avoid_gpu_families` | array | no |  | Avoid GPU Families. Optional GPU families to avoid, one item per family, for example `a100`. |
| `region_preference` | string | no |  | Region Preference. Optional region preference, for example `us-east`. |
| `latency_priority` | string | no |  | Latency Priority. Optional latency priority for routing. One of `"low"`, `"balanced"`, `"high"`. |
| `cost_priority` | string | no |  | Cost Priority. Optional cost priority for routing. One of `"low"`, `"balanced"`, `"high"`. |
| `callback_url` | string | no |  | Callback URL. Optional HTTPS callback URL for terminal job lifecycle events. |
| `callback_metadata` | object | no |  | Callback Metadata. Optional key-value metadata Jungle Grid should include with callback events. |

### `list_jobs`

**List Jobs.** List jobs in the authenticated Jungle Grid workspace, optionally filtered by status, with cursor-based pagination up to 100 per page. Pick this to find a job ID when none is known or to survey recent activity; if you already have a job ID, Get Job Status is more direct. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `20` | Limit. Maximum number of jobs to return. Jungle Grid accepts 1 to 100. |
| `cursor` | string | no |  | Cursor. Optional cursor from a previous List Jobs response. |
| `status` | string | no |  | Status. Optional job status filter. One of `"pending"`, `"queued"`, `"assigned"`, `"provisioning"`, `"starting"`, `"running"`, `"completed"`, `"failed"`, `"rejected"`, `"cancelled"`. |

### `get_job_status`

**Get Job Status.** Look up the current lifecycle status and metadata of a Jungle Grid job by job ID. Pick this as the standard poll after Submit Job to check whether a job is queued, running, or finished; for exit codes and log tails use Get Job Runtime, and for output files use List Job Artifacts. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The `job_id` returned by Submit Job or List Jobs. |

### `get_job_runtime`

**Get Job Runtime.** Retrieve runtime execution details for a Jungle Grid job by job ID, including log tails, exit code, and whether runtime data is available. Pick this to diagnose how a job actually ran; use Get Job Status for lifecycle state only, or Get Job Logs for fuller paginated log output. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The `job_id` returned by Submit Job or List Jobs. |

### `get_job_logs`

**Get Job Logs.** Fetch recent log lines for a Jungle Grid job by job ID, choosing stdout, stderr, or both, with a tail of up to 500 lines and cursor-based paging for more. Pick this to debug a failing job or inspect output text; for structured status or exit-code details use Get Job Status or Get Job Runtime instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The `job_id` returned by Submit Job or List Jobs. |
| `tail_lines` | number | no | `100` | Tail Lines. Number of recent log lines to fetch. Jungle Grid accepts 1 to 500. |
| `cursor` | string | no |  | Cursor. Optional `next_cursor` from a previous logs response. |
| `stream` | string | no | `"all"` | Stream. Choose which log stream to fetch. One of `"all"`, `"stdout"`, `"stderr"`. |

### `list_artifacts`

**List Job Artifacts.** List the output files (artifacts) produced by a Jungle Grid job, by job ID. Pick this after a job completes to discover what it produced, then use Get Artifact Download URL to fetch a specific file; only works when the workspace has managed artifact storage. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The `job_id` returned by Submit Job or List Jobs. |

### `get_artifact_download_url`

**Get Artifact Download URL.** Generate a short-lived signed download URL for one artifact of a Jungle Grid job, given the job ID and artifact ID. Pick this after List Job Artifacts when a file actually needs to be downloaded; calling it is safe to repeat (each call just issues a fresh temporary URL), but the URL expires and must be treated as a secret. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The `job_id` returned by Submit Job or List Jobs. |
| `artifact_id` | string | yes |  | Artifact ID. The artifact ID returned by List Job Artifacts. |

### `cancel_job`

**Cancel Job.** Request cancellation of a running or queued Jungle Grid job by job ID, optionally recording a reason. Pick this to stop a job that is no longer needed; it mutates job state and only applies to jobs that have not already reached a terminal status. Not idempotent: retrying against an already-cancelled or finished job may fail. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The `job_id` returned by Submit Job or List Jobs. |
| `reason` | string | no | `"Cancelled from Activepieces"` | Reason. Optional cancellation reason stored with the Jungle Grid job status. |

### `custom_api_call`

**Custom API Call.** Make a custom API call to a specific endpoint. Needs authentication.

Kind: write.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | object | yes |  | . An object whose fields depend on other inputs; the product shows them. |
| `method` | string | yes | `"GET"` | Method. One of `"GET"`, `"POST"`, `"PATCH"`, `"PUT"`, `"DELETE"`, `"HEAD"`. |
| `headers` | object | no |  | Headers. Authorization headers are injected automatically from your connection. |
| `queryParams` | object | no |  | Query Parameters. Appended to the URL as ?key=value. |
| `body_type` | string | no | `"none"` | Body Type. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | object | no |  | Body. An object whose fields depend on other inputs; the product shows them. |
| `response_is_binary` | boolean | no | `false` | Response is Binary. Enable for files like PDFs, images, etc. |
| `failsafe` | boolean | no |  | Return Error as Output. On a failed request, output the error instead of failing the step. |
| `timeout` | number | no |  | Timeout. Seconds to wait for a response. Empty: up to the flow limit (10 min). |
| `followRedirects` | boolean | no | `false` | Follow redirects. Follow 3xx redirects instead of returning them as the response. |

# Apify

Access Apify tools for web scraping, data extraction, and automation.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-apify'
  version: '0.3.1'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Enter API key authentication details

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apikey` | string | yes |  | API Key. Find your API key on Apify in the settings, API & Integrations section. |

## Actions

### `getDatasetItems`

**Get Dataset Items.** Reads the stored result rows from an Apify dataset by dataset ID, with optional offset/limit paging. Use this to fetch the scraped/extracted output of an actor or task run once you know its dataset ID. Read-only and idempotent; it returns existing items without modifying them. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `datasetId` | string | yes |  | Dataset. Select the dataset to get items from. A value the product loads from the provider, such as an id; write the value itself. |
| `offset` | number | no | `0` | Offset. Number of items that should be skipped at the start. The default value is `0`. |
| `limit` | number | no | `50` | Limit. Maximum number of results to return. Must be greater than 0. |

Output fields:

- `items`: Items
- `count`: Count (number)
- `total`: Total (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `datasetId`: Dataset ID

### `runActor`

**Run Actor.** Starts an Apify Actor (a hosted scraper/automation program) by actor ID, passing a JSON input body and optional build/memory/timeout settings. Use this to execute a specific Actor for scraping or data extraction; set waitForFinish to block until the run completes and fetch its dataset items. Not idempotent — each call launches a new actor run. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `actorSource` | string | yes | `"recent"` | Actor Source. One of `"recent"`, `"store"`. |
| `actorid` | string | yes |  | Actor. Select an Actor from the list. A value the product loads from the provider, such as an id; write the value itself. |
| `input` | object | yes |  | Input. An object whose fields depend on other inputs; the product shows them. |
| `build` | string | no |  | Build. Build to run. It can be either a build tag or build number. By default, the run uses the build specified in the default run configuration (typically `latest`). |
| `memory` | string | no |  | Memory (MB). Memory limit for the run, in megabytes. The amount of memory can be set to one of the available options. By default, the run uses a memory limit specified in the default run configuration for the Actor. One of `128`, `256`, `512`, `1024`, `2048`, `4096`, `8192`, `16384`, `32768`. |
| `timeout` | number | no |  | Timeout (seconds). Optional timeout for the run, in seconds. By default, the run uses a timeout specified in the default run configuration for the Actor. |
| `waitForFinish` | boolean | no | `true` | Wait for finish. If enabled, the step waits for the Actor run to finish and returns the run’s dataset items as the step output. |

Output fields:

- `run`: Run
- `run.id`: Run ID
- `run.actId`: Actor ID
- `run.status`: Status
- `run.startedAt`: Started At (datetime)
- `run.finishedAt`: Finished At (datetime)
- `run.buildNumber`: Build Number
- `run.exitCode`: Exit Code
- `run.defaultDatasetId`: Dataset ID
- `run.defaultKeyValueStoreId`: Key-Value Store ID
- `run.defaultRequestQueueId`: Request Queue ID
- `run.usageTotalUsd`: Usage (USD) (currency)
- `run.containerUrl`: Container URL (url)
- `run.consoleUrl`: Console URL (url)
- `datasetItems`: Dataset Items

### `runTask`

**Run Task.** Runs a saved Apify Actor task (an Actor pre-configured with stored input) by task ID, optionally overriding the input body and build/memory/timeout. Use this instead of Run Actor when the user has an existing configured task to execute; set waitForFinish to block until completion and retrieve dataset items. Not idempotent — each call launches a new task run. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskid` | string | yes |  | Actor Task. Select a task from the list. A value the product loads from the provider, such as an id; write the value itself. |
| `input` | object | yes |  | Input. An object whose fields depend on other inputs; the product shows them. |
| `build` | string | no |  | Build. Build to run. It can be either a build tag or build number. By default, the run uses the build specified in the default run configuration (typically `latest`). |
| `memory` | string | no |  | Memory (MB). Memory limit for the run, in megabytes. The amount of memory can be set to one of the available options. By default, the run uses a memory limit specified in the task settings. One of `128`, `256`, `512`, `1024`, `2048`, `4096`, `8192`, `16384`, `32768`. |
| `timeout` | number | no |  | Timeout (seconds). Optional timeout for the run, in seconds. By default, the run uses a timeout specified in the task settings. |
| `waitForFinish` | boolean | no | `true` | Wait for finish. If enabled, the step waits for the task run to finish and returns the run’s dataset items as the step output. |

Output fields:

- `run`: Run
- `run.actorTaskId`: Task ID
- `run.id`: Run ID
- `run.actId`: Actor ID
- `run.status`: Status
- `run.startedAt`: Started At (datetime)
- `run.finishedAt`: Finished At (datetime)
- `run.buildNumber`: Build Number
- `run.exitCode`: Exit Code
- `run.defaultDatasetId`: Dataset ID
- `run.defaultKeyValueStoreId`: Key-Value Store ID
- `run.defaultRequestQueueId`: Request Queue ID
- `run.usageTotalUsd`: Usage (USD) (currency)
- `run.containerUrl`: Container URL (url)
- `run.consoleUrl`: Console URL (url)
- `datasetItems`: Dataset Items

### `getKeyValueStoreRecord`

**Get Key-Value Store Record.** Fetches a single record from an Apify key-value store by store ID and record key, returning JSON/text values inline or binary values as a file reference. Use this to read named outputs an actor saved (e.g. screenshots, structured results, or status keys) rather than dataset rows. Read-only and idempotent; errors if the key does not exist. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `store` | string | yes |  | Key-Value Store ID. The ID of the Key-Value Store. A value the product loads from the provider, such as an id; write the value itself. |
| `recordKey` | string | yes |  | Key-Value Store Record Key. The key of the record to be retrieved. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `key`: Record Key
- `value`: Value
- `file`: File URL (url)
- `fileName`: File Name
- `size`: File Size (filesize)
- `contentType`: Content Type
- `dataType`: Data Type

### `scrapeSingleUrl`

**Scrape Single URL.** Scrapes the content of one web page via the Apify Website Content Crawler Actor and returns its text as markdown and HTML. Use this for a quick single-page extraction without configuring a full Actor run; the URL must be a valid http/https address and crawler type (Cheerio or Playwright) selects the rendering engine. Not idempotent — each call launches a new crawler run. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes | `"https://docs.apify.com/academy/web-scraping-for-beginners"` | URL. URL to be scraped. Must start with http:// or https:// and be a valid URL. |
| `crawlerType` | string | yes | `"cheerio"` | Crawler Type. The type of crawler to use. One of `"cheerio"`, `"playwright:adaptive"`, `"playwright:firefox"`. |

Output fields:

- `url`: URL (url)
- `markdown`: Markdown
- `html`: HTML (html)

### `apify_run_actor`

**Run Actor.** Run an Apify Actor (a hosted scraper/automation program) by its actor ID, passing a JSON input body. Resolve the actor ID with Find Actor (public store) or List Actors (your own), and build the input body from Get Actor Input Schema. Prefer Run Task when the user has a saved, pre-configured task. Set waitForFinish=true only for short runs (it blocks server-side up to ~60s); for long scrapes leave it false and poll with Get Actor Run. Not idempotent — each call launches a new run. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `actorId` | string | yes |  | Actor ID. The ID (or "username~actor-name") of the Actor to run. Obtain it from Find Actor (public Apify Store search) or List Actors (your account's own actors). |
| `input` | JSON | no |  | Input JSON. JSON input body for the run. Get the field names/types/required from Get Actor Input Schema for this actor. If omitted, the Actor uses the input from its default run configuration. |
| `build` | string | no |  | Build. Build to run — a build tag or build number. Defaults to the build in the Actor's default run configuration (typically "latest"). |
| `memory` | number | no |  | Memory (MB). Memory limit for the run in megabytes (e.g. 256, 1024, 4096). Defaults to the Actor's default run configuration. |
| `timeout` | number | no |  | Timeout (seconds). Optional timeout for the run in seconds. Defaults to the Actor's default run configuration. |
| `waitForFinish` | boolean | no | `false` | Wait for finish. If true, block until the run finishes (server-side, capped ~60s) and return its dataset items. For long runs leave false and poll with Get Actor Run. |

Output fields:

- `run`: Run
- `run.id`: Run ID
- `run.actId`: Actor ID
- `run.status`: Status
- `run.startedAt`: Started At (datetime)
- `run.finishedAt`: Finished At (datetime)
- `run.buildNumber`: Build Number
- `run.exitCode`: Exit Code
- `run.defaultDatasetId`: Dataset ID
- `run.defaultKeyValueStoreId`: Key-Value Store ID
- `run.defaultRequestQueueId`: Request Queue ID
- `run.usageTotalUsd`: Usage (USD) (currency)
- `run.containerUrl`: Container URL (url)
- `run.consoleUrl`: Console URL (url)
- `datasetItems`: Dataset Items

### `apify_run_task`

**Run Task.** Run a saved Apify Actor task (an Actor pre-configured with stored input) by its task ID, optionally overriding the stored input. Resolve the task ID with List Tasks; inspect its stored input with Get Task Input. Prefer this over Run Actor when the user already has a configured task. Set waitForFinish=true only for short runs (blocks server-side ~60s); for long runs leave false and poll with Get Actor Run. Not idempotent — each call launches a new run. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task ID. The ID of the saved task to run. Obtain it from List Tasks. |
| `input` | JSON | no |  | Override Input JSON. Optional JSON to override the task's stored input for this run only. If omitted, the task runs with its saved input (see Get Task Input). |
| `build` | string | no |  | Build. Build to run — a build tag or build number. Defaults to the build in the task settings. |
| `memory` | number | no |  | Memory (MB). Memory limit for the run in megabytes. Defaults to the task settings. |
| `timeout` | number | no |  | Timeout (seconds). Optional timeout for the run in seconds. Defaults to the task settings. |
| `waitForFinish` | boolean | no | `false` | Wait for finish. If true, block until the run finishes (server-side, capped ~60s) and return its dataset items. For long runs leave false and poll with Get Actor Run. |

Output fields:

- `run`: Run
- `run.actorTaskId`: Task ID
- `run.id`: Run ID
- `run.actId`: Actor ID
- `run.status`: Status
- `run.startedAt`: Started At (datetime)
- `run.finishedAt`: Finished At (datetime)
- `run.buildNumber`: Build Number
- `run.exitCode`: Exit Code
- `run.defaultDatasetId`: Dataset ID
- `run.defaultKeyValueStoreId`: Key-Value Store ID
- `run.defaultRequestQueueId`: Request Queue ID
- `run.usageTotalUsd`: Usage (USD) (currency)
- `run.containerUrl`: Container URL (url)
- `run.consoleUrl`: Console URL (url)
- `datasetItems`: Dataset Items

### `apify_get_dataset_items`

**Get Dataset Items.** Read the stored result rows of an Apify dataset by its dataset ID, with optional offset/limit paging. Obtain the dataset ID from a run's output (defaultDatasetId, via Get Actor Run) or from List Datasets. Use Get Run Dataset Items if you have a runId instead of a datasetId. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `datasetId` | string | yes |  | Dataset ID. The ID of the dataset to read. Obtain it from a run's defaultDatasetId (Get Actor Run) or from List Datasets. |
| `offset` | number | no | `0` | Offset. Number of items to skip at the start. Default 0. |
| `limit` | number | no | `50` | Limit. Maximum number of items to return. Must be greater than 0. |

Output fields:

- `items`: Items
- `count`: Count (number)
- `total`: Total (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `datasetId`: Dataset ID

### `apify_get_key_value_store_record`

**Get Key-Value Store Record.** Fetch one named record from an Apify key-value store by store ID and record key, returning JSON/text inline or binary content as a file. Use this for named outputs an Actor saved (e.g. OUTPUT, screenshots) rather than dataset rows (use Get Dataset Items for those). Resolve the store ID via List Key-Value Stores and the record key via List Key-Value Store Keys. Read-only and idempotent; errors if the key does not exist. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | yes |  | Key-Value Store ID. The ID of the key-value store. Obtain it from List Key-Value Stores or a run's defaultKeyValueStoreId (Get Actor Run). |
| `recordKey` | string | yes |  | Record Key. The key of the record to retrieve (e.g. "OUTPUT"). Obtain available keys from List Key-Value Store Keys. |

Output fields:

- `key`: Record Key
- `value`: Value
- `file`: File URL (url)
- `fileName`: File Name
- `size`: File Size (filesize)
- `contentType`: Content Type
- `dataType`: Data Type

### `apify_scrape_url`

**Scrape URL.** Scrape the content of one web page using the Apify Website Content Crawler Actor and return its text as markdown and HTML. Use this for a quick single-page extraction without configuring a full Actor run; for multi-page crawls or other actors use Run Actor instead. The URL must be a valid http/https address; crawlerType selects the rendering engine (cheerio for static HTML, playwright variants for JS-heavy pages). Not idempotent — each call launches a new crawler run. Needs authentication.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | string | yes |  | URL. The page URL to scrape. Must start with http:// or https://. |
| `crawlerType` | string | yes | `"cheerio"` | Crawler Type. The rendering engine to use. One of `"cheerio"`, `"playwright:adaptive"`, `"playwright:firefox"`. |

Output fields:

- `url`: URL (url)
- `markdown`: Markdown
- `html`: HTML (html)

### `apify_find_actor`

**Find Actor.** Search the public Apify Store by name/keyword and return matching Actors with their IDs. This is the primary resolver: use it to turn an actor name into the actor ID required by Run Actor, Get Actor Input Schema, and other actor operations. Use List Actors instead to list your account's OWN actors. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search Query. Name or keyword to search the Apify Store for (e.g. "instagram scraper"). Leave empty to list popular store actors. |
| `limit` | number | no | `50` | Limit. Maximum number of actors to return. Default 50. |
| `offset` | number | no | `0` | Offset. Number of actors to skip at the start. Default 0. |

Output fields:

- `actors`: Actors
- `actors[].id`: Actor ID
- `actors[].name`: Name
- `actors[].username`: Username
- `actors[].title`: Title
- `actors[].fullName`: Full Name
- `actors[].description`: Description
- `actors[].stats`: Stats
- `actors[].stats.totalRuns`: Total Runs (number)
- `actors[].stats.totalUsers`: Total Users (number)
- `actors[].stats.actorReviewRating`: Rating (number)
- `actors[].stats.bookmarkCount`: Bookmarks (number)
- `count`: Count (number)
- `total`: Total (number)

### `apify_get_actor`

**Get Actor.** Get metadata for one Actor by its ID (name, default run options, stats, versions). Use after Find Actor to inspect an actor's details before running it. To discover an actor by name use Find Actor; to get its input fields use Get Actor Input Schema. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `actorId` | string | yes |  | Actor ID. The ID (or "username~actor-name") of the Actor. Obtain it from Find Actor or List Actors. |

Output fields:

- `id`: Actor ID
- `name`: Name
- `username`: Username
- `title`: Title
- `description`: Description
- `isPublic`: Is Public (boolean)
- `isDeprecated`: Is Deprecated (boolean)
- `createdAt`: Created At (datetime)
- `modifiedAt`: Modified At (datetime)
- `stats`: Stats
- `stats.totalRuns`: Total Runs (number)
- `stats.totalUsers`: Total Users (number)
- `defaultRunOptions`: Default Run Options
- `defaultRunOptions.build`: Build
- `defaultRunOptions.memoryMbytes`: Memory (MB) (number)
- `defaultRunOptions.timeoutSecs`: Timeout (s) (number)
- `categories`: Categories
- `pictureUrl`: Picture (image)

### `apify_list_actors`

**List Actors.** List the account's OWN Actors (id, name, username) so you can resolve an actor ID without a dropdown. Use this for actors the account owns; use Find Actor to search the PUBLIC Apify Store. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `50` | Limit. Maximum number of actors to return. Default 50. |
| `offset` | number | no | `0` | Offset. Number of actors to skip at the start. Default 0. |

Output fields:

- `actors`: Actors
- `actors[].id`: Actor ID
- `actors[].name`: Name
- `actors[].username`: Username
- `actors[].fullName`: Full Name
- `actors[].createdAt`: Created At (datetime)
- `actors[].modifiedAt`: Modified At (datetime)
- `count`: Count (number)
- `total`: Total (number)

### `apify_get_actor_input_schema`

**Get Actor Input Schema.** Get the raw input schema of an Actor's default build — field names, types, required flags, enums and prefill defaults. Use this before Run Actor to build a correct input JSON body and avoid HTTP 400 errors from guessed field names. Resolve the actor ID with Find Actor first. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `actorId` | string | yes |  | Actor ID. The ID (or "username~actor-name") of the Actor. Obtain it from Find Actor or List Actors. |

Output fields:

- `actorId`: Actor ID
- `buildId`: Build ID
- `buildNumber`: Build Number
- `input`: Input Schema

### `apify_get_actor_run`

**Get Actor Run.** Read the current status and details of one Actor run by its run ID (status, defaultDatasetId, defaultKeyValueStoreId, exit fields). This is the poll primitive: call it repeatedly to check whether an async run from Run Actor has finished, then read results with Get Run Dataset Items. Optionally set waitForFinish (seconds, max 60) to block server-side. Obtain the run ID from Run Actor or Get Last Actor Run. Read-only and idempotent; this performs a single status read, not an unbounded wait. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `runId` | string | yes |  | Run ID. The ID of the run to read. Obtain it from Run Actor, List Actor Runs, or Get Last Actor Run. |
| `waitForFinish` | number | no |  | Wait For Finish (seconds). Optional. Block server-side up to this many seconds (max 60) waiting for the run to reach a terminal state before returning. Leave empty for an immediate status read. |

Output fields:

- `id`: Run ID
- `actId`: Actor ID
- `status`: Status
- `startedAt`: Started At (datetime)
- `finishedAt`: Finished At (datetime)
- `buildNumber`: Build Number
- `exitCode`: Exit Code
- `defaultDatasetId`: Dataset ID
- `defaultKeyValueStoreId`: Key-Value Store ID
- `defaultRequestQueueId`: Request Queue ID
- `usageTotalUsd`: Usage (USD) (currency)
- `containerUrl`: Container URL (url)
- `consoleUrl`: Console URL (url)

### `apify_abort_actor_run`

**Abort Actor Run.** Stop an in-progress Actor run by its run ID. Use this to cancel a run started by Run Actor (e.g. one that is taking too long or is no longer needed). Set gracefully=true to let the actor finish its current cycle and persist state; otherwise it is killed immediately. Obtain the run ID from Run Actor or List Actor Runs. Not idempotent — aborting an already-finished run errors. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `runId` | string | yes |  | Run ID. The ID of the run to abort. Obtain it from Run Actor or List Actor Runs. |
| `gracefully` | boolean | no | `false` | Gracefully. If true, send a graceful abort so the actor can finish its current cycle and persist state before stopping. If false, the run is killed immediately. |

Output fields:

- `id`: Run ID
- `actId`: Actor ID
- `status`: Status
- `startedAt`: Started At (datetime)
- `finishedAt`: Finished At (datetime)
- `buildNumber`: Build Number
- `exitCode`: Exit Code
- `defaultDatasetId`: Dataset ID
- `defaultKeyValueStoreId`: Key-Value Store ID
- `defaultRequestQueueId`: Request Queue ID
- `usageTotalUsd`: Usage (USD) (currency)
- `containerUrl`: Container URL (url)
- `consoleUrl`: Console URL (url)

### `apify_list_actor_runs`

**List Actor Runs.** List the run history of one Actor by its actor ID, newest first, optionally filtered by status. Use this to recover a lost run ID or review past runs of a specific actor; use List Runs for runs across the whole account, or Get Last Actor Run for just the most recent. Resolve the actor ID with Find Actor or List Actors. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `actorId` | string | yes |  | Actor ID. The ID (or "username~actor-name") of the Actor. Obtain it from Find Actor or List Actors. |
| `status` | string | no |  | Status. Optionally filter runs by status. One of `"READY"`, `"RUNNING"`, `"SUCCEEDED"`, `"FAILED"`, `"TIMING-OUT"`, `"TIMED-OUT"`, `"ABORTING"`, `"ABORTED"`. |
| `limit` | number | no | `50` | Limit. Maximum number of runs to return. Default 50. |
| `offset` | number | no | `0` | Offset. Number of runs to skip at the start. Default 0. |

Output fields:

- `runs`: Runs
- `runs[].id`: Run ID
- `runs[].actId`: Actor ID
- `runs[].actorTaskId`: Task ID
- `runs[].status`: Status
- `runs[].startedAt`: Started At (datetime)
- `runs[].finishedAt`: Finished At (datetime)
- `runs[].buildNumber`: Build Number
- `runs[].defaultDatasetId`: Dataset ID
- `runs[].defaultKeyValueStoreId`: Key-Value Store ID
- `runs[].usageTotalUsd`: Usage (USD) (currency)
- `count`: Count (number)
- `total`: Total (number)
- `actorId`: Actor ID

### `apify_list_runs`

**List Runs.** List Actor runs across the entire account, newest first, optionally filtered by status. Use this when you do not know which actor produced a run; use List Actor Runs to scope to a single actor. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `status` | string | no |  | Status. Optionally filter runs by status. One of `"READY"`, `"RUNNING"`, `"SUCCEEDED"`, `"FAILED"`, `"TIMING-OUT"`, `"TIMED-OUT"`, `"ABORTING"`, `"ABORTED"`. |
| `limit` | number | no | `50` | Limit. Maximum number of runs to return. Default 50. |
| `offset` | number | no | `0` | Offset. Number of runs to skip at the start. Default 0. |

Output fields:

- `runs`: Runs
- `runs[].id`: Run ID
- `runs[].actId`: Actor ID
- `runs[].actorTaskId`: Task ID
- `runs[].status`: Status
- `runs[].startedAt`: Started At (datetime)
- `runs[].finishedAt`: Finished At (datetime)
- `runs[].buildNumber`: Build Number
- `runs[].defaultDatasetId`: Dataset ID
- `runs[].defaultKeyValueStoreId`: Key-Value Store ID
- `runs[].usageTotalUsd`: Usage (USD) (currency)
- `count`: Count (number)
- `total`: Total (number)

### `apify_get_last_actor_run`

**Get Last Actor Run.** Get the most recent run of an Actor by its actor ID, optionally restricted to a status (e.g. SUCCEEDED). Use this when you have the actor ID but not a run ID — for example to find the run to poll with Get Actor Run or to read results from. Use Get Actor Last Run Dataset Items to jump straight to that run's results. Resolve the actor ID with Find Actor or List Actors. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `actorId` | string | yes |  | Actor ID. The ID (or "username~actor-name") of the Actor. Obtain it from Find Actor or List Actors. |
| `status` | string | no |  | Status. Optionally restrict to the last run with this status. One of `"READY"`, `"RUNNING"`, `"SUCCEEDED"`, `"FAILED"`, `"TIMING-OUT"`, `"TIMED-OUT"`, `"ABORTING"`, `"ABORTED"`. |

Output fields:

- `id`: Run ID
- `actId`: Actor ID
- `status`: Status
- `startedAt`: Started At (datetime)
- `finishedAt`: Finished At (datetime)
- `buildNumber`: Build Number
- `exitCode`: Exit Code
- `defaultDatasetId`: Dataset ID
- `defaultKeyValueStoreId`: Key-Value Store ID
- `defaultRequestQueueId`: Request Queue ID
- `usageTotalUsd`: Usage (USD) (currency)
- `containerUrl`: Container URL (url)
- `consoleUrl`: Console URL (url)

### `apify_get_run_log`

**Get Run Log.** Get the plain-text log of an Actor run (or build) by its ID. Use this to diagnose why a run failed or what it did, after Get Actor Run reports a FAILED/ABORTED status. Pass a run ID (from Run Actor) or a build ID (from Get Build). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `runId` | string | yes |  | Run or Build ID. The run ID (from Run Actor / List Actor Runs) or build ID (from Get Build) whose log to fetch. |

Output fields:

- `id`: Run/Build ID
- `log`: Log

### `apify_get_build`

**Get Build.** Read the status and metadata of one Actor build by its build ID. Use this to poll a build (e.g. one triggered elsewhere) until it reaches a terminal state. Optionally set waitForFinish (seconds, max 60) to block server-side. Read the build's log with Get Run Log. Read-only and idempotent; this performs a single status read, not an unbounded wait. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `buildId` | string | yes |  | Build ID. The ID of the build to read. Obtain it from an actor's build list or a run's buildId. |
| `waitForFinish` | number | no |  | Wait For Finish (seconds). Optional. Block server-side up to this many seconds (max 60) waiting for the build to finish before returning. Leave empty for an immediate status read. |

Output fields:

- `id`: Build ID
- `actId`: Actor ID
- `status`: Status
- `startedAt`: Started At (datetime)
- `finishedAt`: Finished At (datetime)
- `buildNumber`: Build Number
- `exitCode`: Exit Code
- `usageTotalUsd`: Usage (USD) (currency)

### `apify_get_run_dataset_items`

**Get Run Dataset Items.** Read the result rows of a run's default dataset directly by run ID, with optional offset/limit paging. Use this when you have a run ID (from Run Actor) but not a dataset ID — it saves a Get Actor Run call. If you already have the dataset ID, use Get Dataset Items. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `runId` | string | yes |  | Run ID. The ID of the run whose dataset items to read. Obtain it from Run Actor, List Actor Runs, or Get Last Actor Run. |
| `offset` | number | no | `0` | Offset. Number of items to skip at the start. Default 0. |
| `limit` | number | no | `50` | Limit. Maximum number of items to return. Must be greater than 0. |

Output fields:

- `items`: Items
- `count`: Count (number)
- `total`: Total (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `runId`: Run ID

### `apify_get_actor_last_run_dataset_items`

**Get Actor Last Run Dataset Items.** Read the result rows of an Actor's most recent run directly by actor ID, with optional offset/limit paging. Use this one-shot shortcut to get "the latest results of this actor" without chaining run/dataset IDs. Optionally restrict to a status (e.g. SUCCEEDED) so you only read a completed run. Resolve the actor ID with Find Actor or List Actors. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `actorId` | string | yes |  | Actor ID. The ID (or "username~actor-name") of the Actor. Obtain it from Find Actor or List Actors. |
| `status` | string | no |  | Status. Optionally restrict to the last run with this status (e.g. SUCCEEDED). One of `"SUCCEEDED"`, `"FAILED"`, `"RUNNING"`, `"ABORTED"`, `"TIMED-OUT"`. |
| `offset` | number | no | `0` | Offset. Number of items to skip at the start. Default 0. |
| `limit` | number | no | `50` | Limit. Maximum number of items to return. Must be greater than 0. |

Output fields:

- `items`: Items
- `count`: Count (number)
- `total`: Total (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `actorId`: Actor ID

### `apify_get_task_last_run_dataset_items`

**Get Task Last Run Dataset Items.** Read the result rows of a saved task's most recent run directly by task ID, with optional offset/limit paging. Use this one-shot shortcut to get "the latest results of this task" without chaining run/dataset IDs (the task analogue of Get Actor Last Run Dataset Items). Optionally restrict to a status. Resolve the task ID with List Tasks. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task ID. The ID of the saved task. Obtain it from List Tasks. |
| `status` | string | no |  | Status. Optionally restrict to the last run with this status (e.g. SUCCEEDED). One of `"SUCCEEDED"`, `"FAILED"`, `"RUNNING"`, `"ABORTED"`, `"TIMED-OUT"`. |
| `offset` | number | no | `0` | Offset. Number of items to skip at the start. Default 0. |
| `limit` | number | no | `50` | Limit. Maximum number of items to return. Must be greater than 0. |

Output fields:

- `items`: Items
- `count`: Count (number)
- `total`: Total (number)
- `offset`: Offset (number)
- `limit`: Limit (number)
- `taskId`: Task ID

### `apify_get_dataset`

**Get Dataset.** Get metadata for one dataset by its dataset ID (name, itemCount, stats) — distinct from reading its rows. Use this to check how many items a dataset holds before paging through it with Get Dataset Items. Obtain the dataset ID from List Datasets or a run's defaultDatasetId. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `datasetId` | string | yes |  | Dataset ID. The ID of the dataset. Obtain it from List Datasets or a run's defaultDatasetId (Get Actor Run). |

Output fields:

- `id`: Dataset ID
- `name`: Name
- `itemCount`: Item Count (number)
- `cleanItemCount`: Clean Item Count (number)
- `createdAt`: Created At (datetime)
- `modifiedAt`: Modified At (datetime)
- `actId`: Actor ID
- `actRunId`: Run ID
- `fields`: Fields
- `consoleUrl`: Console URL (url)

### `apify_list_datasets`

**List Datasets.** List the account's datasets (id, name, itemCount), newest first, so you can resolve a dataset ID without a dropdown. Use this to find the dataset to read with Get Dataset Items. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `50` | Limit. Maximum number of datasets to return. Default 50. |
| `offset` | number | no | `0` | Offset. Number of datasets to skip at the start. Default 0. |

Output fields:

- `datasets`: Datasets
- `datasets[].id`: Dataset ID
- `datasets[].name`: Name
- `datasets[].title`: Title
- `datasets[].itemCount`: Item Count (number)
- `datasets[].createdAt`: Created At (datetime)
- `datasets[].modifiedAt`: Modified At (datetime)
- `count`: Count (number)
- `total`: Total (number)

### `apify_list_key_value_stores`

**List Key-Value Stores.** List the account's key-value stores (id, name), newest first, so you can resolve a store ID without a dropdown. Use this to find the store to read with Get Key-Value Store Record (after listing its keys with List Key-Value Store Keys). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `50` | Limit. Maximum number of stores to return. Default 50. |
| `offset` | number | no | `0` | Offset. Number of stores to skip at the start. Default 0. |

Output fields:

- `stores`: Key-Value Stores
- `stores[].id`: Store ID
- `stores[].name`: Name
- `stores[].title`: Title
- `stores[].createdAt`: Created At (datetime)
- `stores[].modifiedAt`: Modified At (datetime)
- `count`: Count (number)
- `total`: Total (number)

### `apify_get_key_value_store`

**Get Key-Value Store.** Get metadata for one key-value store by its store ID (name, stats) — distinct from reading its records. Use this to inspect a store before listing its keys (List Key-Value Store Keys) or reading a record (Get Key-Value Store Record). Obtain the store ID from List Key-Value Stores. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | yes |  | Key-Value Store ID. The ID of the key-value store. Obtain it from List Key-Value Stores or a run's defaultKeyValueStoreId. |

Output fields:

- `id`: Key-Value Store ID
- `name`: Name
- `createdAt`: Created At (datetime)
- `modifiedAt`: Modified At (datetime)
- `actId`: Actor ID
- `actRunId`: Run ID
- `consoleUrl`: Console URL (url)

### `apify_list_key_value_store_keys`

**List Key-Value Store Keys.** List the record keys (and sizes) in a key-value store by its store ID, optionally filtered by key prefix. This is the prerequisite to reading a record: use it to discover which key to pass to Get Key-Value Store Record. Obtain the store ID from List Key-Value Stores. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `storeId` | string | yes |  | Key-Value Store ID. The ID of the key-value store. Obtain it from List Key-Value Stores or a run's defaultKeyValueStoreId. |
| `prefix` | string | no |  | Key Prefix. Optional. Only return keys starting with this prefix. |
| `limit` | number | no |  | Limit. Maximum number of keys to return. |

Output fields:

- `keys`: Keys
- `keys[].key`: Key
- `keys[].size`: Size (filesize)
- `count`: Count (number)
- `isTruncated`: Is Truncated (boolean)
- `nextExclusiveStartKey`: Next Start Key
- `storeId`: Store ID

### `apify_list_tasks`

**List Tasks.** List the account's saved Actor tasks (id, name, actId) so you can resolve a task ID without a dropdown. Use this to find the task to run with Run Task or inspect with Get Task / Get Task Input. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `50` | Limit. Maximum number of tasks to return. Default 50. |
| `offset` | number | no | `0` | Offset. Number of tasks to skip at the start. Default 0. |

Output fields:

- `tasks`: Tasks
- `tasks[].id`: Task ID
- `tasks[].name`: Name
- `tasks[].title`: Title
- `tasks[].actId`: Actor ID
- `tasks[].username`: Username
- `tasks[].createdAt`: Created At (datetime)
- `tasks[].modifiedAt`: Modified At (datetime)
- `count`: Count (number)
- `total`: Total (number)

### `apify_get_task`

**Get Task.** Get metadata for one saved task by its task ID (name, actId, run options). Use this to inspect which Actor a task wraps before running it; use Get Task Input to see its stored input. Obtain the task ID from List Tasks. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task ID. The ID of the saved task. Obtain it from List Tasks. |

Output fields:

- `id`: Task ID
- `name`: Name
- `title`: Title
- `actId`: Actor ID
- `username`: Username
- `createdAt`: Created At (datetime)
- `modifiedAt`: Modified At (datetime)
- `stats`: Stats
- `stats.totalRuns`: Total Runs (number)
- `options`: Options
- `options.memoryMbytes`: Memory (MB) (number)
- `input`: Input

### `apify_get_task_input`

**Get Task Input.** Get the saved input body of a task by its task ID. Use this to inspect a task's current configuration before running it (Run Task) or before overwriting it (Update Task Input). Obtain the task ID from List Tasks. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task ID. The ID of the saved task. Obtain it from List Tasks. |

Output fields:

- `taskId`: Task ID
- `input`: Input

### `apify_get_task_last_run`

**Get Task Last Run.** Get the most recent run of a saved task by its task ID, optionally restricted to a status (e.g. SUCCEEDED). Use this when you have the task ID but not a run ID — for example to find the run to poll with Get Actor Run (task analogue of Get Last Actor Run). Use Get Task Last Run Dataset Items to jump straight to its results. Obtain the task ID from List Tasks. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task ID. The ID of the saved task. Obtain it from List Tasks. |
| `status` | string | no |  | Status. Optionally restrict to the last run with this status. One of `"READY"`, `"RUNNING"`, `"SUCCEEDED"`, `"FAILED"`, `"TIMING-OUT"`, `"TIMED-OUT"`, `"ABORTING"`, `"ABORTED"`. |

Output fields:

- `actorTaskId`: Task ID
- `id`: Run ID
- `actId`: Actor ID
- `status`: Status
- `startedAt`: Started At (datetime)
- `finishedAt`: Finished At (datetime)
- `buildNumber`: Build Number
- `exitCode`: Exit Code
- `defaultDatasetId`: Dataset ID
- `defaultKeyValueStoreId`: Key-Value Store ID
- `defaultRequestQueueId`: Request Queue ID
- `usageTotalUsd`: Usage (USD) (currency)
- `containerUrl`: Container URL (url)
- `consoleUrl`: Console URL (url)

### `apify_update_task_input`

**Update Task Input.** Overwrite the entire stored input of a saved task with a new JSON body. Use this to reconfigure a task before running it (reconfigure-then-run); to override input for a single run only, pass it to Run Task instead of changing the task. Inspect the current input first with Get Task Input. Obtain the task ID from List Tasks. Idempotent — it sets the task input to the given state, so repeating the same call has the same effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taskId` | string | yes |  | Task ID. The ID of the saved task to reconfigure. Obtain it from List Tasks. |
| `input` | JSON | yes |  | Input JSON. The full JSON input body to store on the task. This replaces the existing input entirely. Match the Actor's input schema (see Get Actor Input Schema for the task's actor). |

Output fields:

- `taskId`: Task ID
- `input`: Input

### `apify_create_task`

**Create Task.** Create a new saved Actor task — a reusable, named Actor configuration with stored input. Use this to set up a task an agent or flow can run repeatedly with Run Task. Resolve the actor ID with Find Actor or List Actors, and build the input from Get Actor Input Schema. Not idempotent — each call creates a new task and a duplicate name errors. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Unique name for the task (within your account). Creation fails if the name is already taken. |
| `actorId` | string | yes |  | Actor ID. The ID (or "username~actor-name") of the Actor this task wraps. Obtain it from Find Actor or List Actors. |
| `input` | JSON | no |  | Input JSON. The JSON input body to store on the task. Match the Actor's input schema (see Get Actor Input Schema). |

Output fields:

- `id`: Task ID
- `name`: Name
- `title`: Title
- `actId`: Actor ID
- `username`: Username
- `createdAt`: Created At (datetime)
- `modifiedAt`: Modified At (datetime)
- `stats`: Stats
- `stats.totalRuns`: Total Runs (number)
- `options`: Options
- `options.memoryMbytes`: Memory (MB) (number)
- `input`: Input

### `apify_get_account`

**Get Account.** Get the authenticated account profile (username, plan, ids). Use this to confirm which account the connection belongs to or to read the username needed to build a "username~actor-name" actor reference. Use Get Account Limits for plan limits and usage. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `id`: User ID
- `username`: Username
- `email`: Email (email)
- `profile`: Profile
- `profile.name`: Name
- `plan`: Plan
- `plan.id`: Plan ID
- `plan.tier`: Tier
- `createdAt`: Created At (datetime)
- `isPaying`: Is Paying (boolean)

### `apify_get_account_limits`

**Get Account Limits.** Get the account's plan limits and current usage (e.g. max concurrent runs, monthly compute). Use this to decide whether a run will fit the plan before starting it with Run Actor, or to explain a usage-limit error. Use Get Account for the profile. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `monthlyUsageCycle`: Monthly Usage Cycle
- `monthlyUsageCycle.startAt`: Start At (datetime)
- `monthlyUsageCycle.endAt`: End At (datetime)
- `limits`: Plan Limits
- `limits.maxMonthlyUsageUsd`: Max Monthly Usage (USD) (currency)
- `limits.maxMonthlyActorComputeUnits`: Max Monthly Compute Units (number)
- `limits.maxActorMemoryGbytes`: Max Actor Memory (GB) (number)
- `limits.maxActorCount`: Max Actor Count (number)
- `limits.maxActorTaskCount`: Max Task Count (number)
- `limits.maxConcurrentActorJobs`: Max Concurrent Runs (number)
- `limits.dataRetentionDays`: Data Retention (Days) (number)
- `current`: Current Usage
- `current.monthlyUsageUsd`: Monthly Usage (USD) (currency)
- `current.monthlyActorComputeUnits`: Monthly Compute Units (number)
- `current.actorCount`: Actor Count (number)
- `current.actorTaskCount`: Task Count (number)
- `current.activeActorJobCount`: Active Runs (number)

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

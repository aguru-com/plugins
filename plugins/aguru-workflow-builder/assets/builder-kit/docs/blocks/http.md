# `http` block

```yaml
- id: fetch-user
  type: http
  with:
    method: GET
    url: 'https://api.example.com/users/${ctx.id}'
    headers:
      Authorization: 'Bearer {{ secret("api-token") }}'
    query:
      status: open
      tag: ['a', 'b'] # repeated keys
    body: { x: 1 }
    fail-on-error: false
  out: response
```

| `with` field    | Required | Notes                                                                                               |
| --------------- | -------- | --------------------------------------------------------------------------------------------------- |
| `method`        | no       | `GET` (default), `POST`, `PUT`, `PATCH`, `DELETE`.                                                  |
| `url`           | yes      | Absolute URL.                                                                                       |
| `headers`       | no       | Header map; secret references resolve at activity time.                                             |
| `query`         | no       | Arrays repeat the key; `null`/`undefined` are skipped; objects are sent as JSON.                    |
| `body`          | no       | JSON by default (`content-type: application/json` unless set).                                      |
| `body-type`     | no       | `json` (default) or `form-data`.                                                                    |
| `response-type` | no       | `auto` (default), `json`, `text` or `attachment`. Use an explicit mode for incorrect server labels. |
| `attach-to`     | no       | Inbox message id a stored attachment response is filed under, e.g. the trigger email's.             |
| `redirect`      | no       | `error` (default) or `manual`; automatic following is forbidden.                                    |
| `files`         | no       | `form-data` file parts: `{ name, file-name, url, type? }`; `url` may be `attachment:<id>`.          |
| `fail-on-error` | no       | Default `true`: non-2xx fails the block. `false` returns the response with `success: false`.        |
| `pagination`    | no       | See [Pagination](../yaml.md#pagination).                                                                      |
| `confirm`       | no       | See [operator confirmation](../yaml.md#operator-confirmation).                                                |

Output: `{ success, statusCode, statusText, headers, body }`. In `auto`, the
normalized `application/json` and `application/*+json` types parse as JSON.
`text/*`, XML (including `application/*+xml`), JavaScript, form-urlencoded,
GraphQL and SQL decode as UTF-8 text. Other types, including missing or unknown
MIME, persist as inbox attachments inside the activity, unlinked unless
`attach-to` names a message. Their result
adds `bodyType: attachment` and `body: { attachmentId, filename, mimeType, size,
sha256 }`; document bytes and signed URLs never enter workflow state. A caller
expecting text from an unlabelled server must set `response-type: text`.
Bodyless 204/205/304 replies have `body: null`, as does an empty `auto` success
outside JSON and text; an empty success with `response-type: attachment` is an
error. Non-2xx binary replies have no file or body excerpt. Pagination accepts
only `auto` or `json`, and rejects binary pages before uploading anything.

With `redirect: manual` and `fail-on-error: false`, a redirect returns its
status and `headers.location`. A subsequent HTTP block is a new gated request;
credentials are never carried automatically to the next origin. Host allowlists,
hop limits and provider parsing belong in the calling workflow.

- **URLs pass an SSRF gate**: no localhost, private ranges or cloud
  metadata hosts, checked again at socket open.
- **Response limits.** Bodies are capped (`WORKFLOW_HTTP_MAX_RESPONSE_BYTES`,
  8 MiB default; `WORKFLOW_ATTACHMENT_MAX_BYTES` per `files` download). Over
  the cap fails non-retryably as `HTTP_RESPONSE_TOO_LARGE`. See the engine
  activities README's response limits.

```yaml
- id: upload
  type: http
  with:
    method: POST
    url: https://api.example.com/uploads
    body-type: form-data
    body: { LinkedId: '${ctx.params.propertyId}' } # scalars → string parts
    files:
      - name: FileToUpload
        file-name: report.pdf
        url: 'attachment:${ctx.params.attachmentId}'
        type: application/pdf
  out: uploaded
```

## Pagination

Cursor-token paging: each response carries a cursor the next request sends
back as a query param. The engine runs **one activity per page**, so a
retry repeats one page, not the walk.

```yaml
pagination:
  style: token # only style
  items: items # dot-path into body — array merged across pages
  cursor: meta.nextToken # dot-path into body — stops when null/undefined
  cursor-param: nextToken # query param carrying the cursor
  max-pages: 100 # default 100
```

The output adds `pagination: { pagesFetched, totalItems, completed,
stopReason }`; `body` is the last page's with `items` replaced by the merged
array. `completed: false` with `stopReason: max-pages` means more may remain.
A failed page (under `fail-on-error: false`) stops the walk and is returned
with partial metadata.

## Output

`{ success, statusCode, statusText, headers, body }`. `body` is parsed JSON when the response says it is JSON, otherwise text. With `pagination`, also `pagination: { pagesFetched, totalItems, completed, stopReason }`, and `body` is the last page with its items replaced by all pages' items. `null` when an operator suppresses a `confirm`.

## On failure

5xx, 408, 429 and network errors are retried (5 attempts, backing off to 30 s); other 4xx fail at once. `fail-on-error: false` turns only a non-2xx answer into `success: false`: a blocked address (`HTTP_URL_BLOCKED`), a body over 8 MiB (`HTTP_RESPONSE_TOO_LARGE`), a network error or unparseable JSON still fail the block. `method` must be uppercase.

## Fields accepted by the engine

Generated from the engine schema. The common fields `id`, `type`, `label`, `out` and `if` are in [the index](README.md). A `string` alternative on a structured field is a whole `${...}` expression that resolves to that structure.

`with` fields:

| Field | Type | Required | Default |
| --- | --- | --- | --- |
| `method` | string | no |  |
| `url` | string | yes |  |
| `headers` | object \| string | no |  |
| `query` | object \| string | no |  |
| `body` | any | no |  |
| `body-type` | string | no |  |
| `response-type` | string | no |  |
| `attach-to` | string | no |  |
| `redirect` | string | no |  |
| `files` | object[] \| string | no |  |
| `fail-on-error` | boolean \| string | no |  |
| `pagination` | object \| string | no |  |
| `confirm` | boolean \| string | no |  |

## In wftest

It calls out, so wftest guards it: a test that reaches it fails unless a mock, an `expect-in` event or a post-run `called` assertion approves it. See [testing.md](../testing.md#mocks).


## Used in

[01-http-basics](../../templates/01-http-basics/README.md), [02-http-sync](../../templates/02-http-sync/README.md), [04-scm-follow-up-escalation](../../templates/04-scm-follow-up-escalation/README.md), [05-record-request](../../templates/05-record-request/README.md), [06-scheduled-sweep](../../templates/06-scheduled-sweep/README.md), [07-connector-actions](../../templates/07-connector-actions/README.md), [09-document-intake](../../templates/09-document-intake/README.md)

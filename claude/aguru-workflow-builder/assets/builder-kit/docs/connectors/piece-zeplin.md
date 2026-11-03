# Zeplin

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-zeplin'
  version: '0.1.0'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Zeplin Personal Access Token

> Zeplin Personal Access Token

## Actions

### `createNote`

**Create Note.** Add a comment/annotation note pinned to a specific position on a Zeplin screen, identified by project ID and screen ID. Use to leave design feedback or markup at given X/Y coordinates with a chosen highlight color. Not idempotent: each call creates a new note even with identical content. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the Zeplin project. A value the product loads from the provider, such as an id; write the value itself. |
| `screenId` | string | yes |  | Screen. Select the Zeplin screen. A value the product loads from the provider, such as an id; write the value itself. |
| `content` | string | yes |  | Note content. The content of the note. |
| `color` | string | yes |  | Color. The color of the note. One of `"orange"`, `"peach"`, `"green"`, `"yellow"`, `"turquoise"`, `"cornflower_blue"`, `"deep_purple"`. |
| `x` | number | yes |  | X Coordinate. The x coordinate position of the note on the screen. |
| `y` | number | yes |  | Y Coordinate. The y coordinate position of the note on the screen. |
| `x_start` | number | no |  | X Start Coordinate. The starting x coordinate for range selection (optional) |
| `y_start` | number | no |  | Y Start Coordinate. The starting y coordinate for range selection (optional) |

### `findProject`

**Find Project.** Look up Zeplin projects accessible to the authenticated user. With a project name it filters to partial (case-insensitive) name matches; with the name left empty it returns all projects. Use to resolve a project ID before screen or note operations. Read-only and idempotent. Note: if the name filter matches nothing, it falls back to returning all projects. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectName` | string | no |  | Project Name. Optional project name to search for (partial match) |

### `findScreen`

**Find Screen.** List screens within a given Zeplin project (by project ID). With a screen name it filters to partial (case-insensitive) title matches; with the name left empty it returns all screens in the project. Use to resolve a screen ID before creating notes or updating a screen. Read-only and idempotent. Note: if the name filter matches nothing, it falls back to returning all screens. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the Zeplin project. A value the product loads from the provider, such as an id; write the value itself. |
| `screenName` | string | no |  | Screen Name. Optional screen name to search for (partial match) |

### `updateProject`

**Update Project.** Update a Zeplin project's name and/or description, identified by project ID. Only the fields you supply are changed; omitted fields are left untouched. Use to rename a project or revise its description. Idempotent: repeating the call with the same values leaves the project in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the Zeplin project. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Project Name. The new name for the project. |
| `description` | string | no |  | Description. The new description for the project. |

### `updateScreen`

**Update Screen.** Set the description of a specific Zeplin screen, identified by project ID and screen ID. Use to revise the textual description shown for a screen. Idempotent: repeating the call with the same description leaves the screen in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the Zeplin project. A value the product loads from the provider, such as an id; write the value itself. |
| `screenId` | string | yes |  | Screen. Select the Zeplin screen. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | yes |  | Description. The new description for the screen. |

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

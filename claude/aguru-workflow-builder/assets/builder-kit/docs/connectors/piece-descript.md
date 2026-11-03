# Descript

AI-powered video and podcast editor. Import media, run AI edits with Underlord, and publish.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-descript'
  version: '0.1.2'
```

Categories: CONTENT_AND_FILES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> To create an API token:
> 1. Open **Settings** in Descript.
> 2. Select **API tokens** from the sidebar.
> 3. Click **Create token**, give it a name, select a Drive, and click **Create token**.
> 4. Copy the token and paste it here — you can only view it once.

## Actions

### `import_media`

**Import Media.** Starts an asynchronous Descript job that imports a media file from a public URL into either a newly created project or an existing one (selected via the project mode), optionally building a composition/timeline from it. Use to bring audio/video into Descript before editing or publishing; the URL must be reachable by Descript servers and support HTTP Range requests. Not idempotent: each call queues a new import job and returns a job_id to poll for completion. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mode` | string | yes | `"new"` | Project. Create a new project or import into an existing one. One of `"new"`, `"existing"`. |
| `project_id` | string | no |  | Existing Project. Select the project to import media into. A value the product loads from the provider, such as an id; write the value itself. |
| `project_name` | string | no |  | New Project Name. Name for the new project. Only used when creating a new project. |
| `folder_name` | string | no |  | Project Folder. Folder path for the new project (e.g. "Clients/Acme"). Supports nested paths using "/". Missing folders are created automatically. Only applies when creating a new project. |
| `team_access` | string | no | `"none"` | Team Access. Access level for Drive members on the new project. Only applies when creating a new project. One of `"none"`, `"view"`, `"comment"`, `"edit"`. |
| `media_name` | string | yes |  | Media File Name. Display name for the media file (e.g. "intro.mp4" or "Recordings/interview.mp4"). Use "/" to organize into sub-folders. Must not conflict with existing file names when importing into an existing project. |
| `media_url` | string | yes |  | Media URL. Public URL of the media file. Must be accessible by Descript servers and support HTTP Range requests. Sign URLs for 12–48 hours if they expire. |
| `language` | string | no |  | Transcription Language. ISO 639-1 language code for transcription (e.g. "en", "es", "fr"). Leave blank to auto-detect from the audio. |
| `composition_name` | string | no |  | Composition Name. Name for the composition (timeline) to create from the imported media. Leave blank to skip composition creation. |
| `composition_width` | number | no | `1920` | Composition Width (px). Width of the composition in pixels. Defaults to 1920. Only used when a Composition Name is provided. |
| `composition_height` | number | no | `1080` | Composition Height (px). Height of the composition in pixels. Defaults to 1080. Only used when a Composition Name is provided. |
| `callback_url` | string | no |  | Callback URL. Optional webhook URL. When the import finishes or fails, Descript will POST the job status to this URL (same payload as Get Job Status). |

### `agent_edit`

**Agent Edit (Underlord).** Starts an asynchronous Descript Underlord AI editing job driven by a natural-language prompt, operating in one of two modes: editing an existing project (optionally targeting a specific composition) or creating a new project from the prompt. Use to apply AI edits like removing filler words, adding studio sound, or assembling highlight reels. Frame the prompt as a single one-shot instruction. Not idempotent: each call queues a new job and returns a job_id to poll for completion. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `mode` | string | yes | `"existing"` | Mode. Choose whether to edit an existing project or create a brand new one. One of `"existing"`, `"new"`. |
| `project_id` | string | no |  | Project. Select the project for the agent to edit. A value the product loads from the provider, such as an id; write the value itself. |
| `project_name` | string | no |  | New Project Name. Name for the new project (only used when creating a new project). |
| `team_access` | string | no | `"none"` | Team Access. Access level for team members on the new project. Only applies when creating a new project. One of `"none"`, `"view"`, `"comment"`, `"edit"`. |
| `composition_id` | string | no |  | Composition. Select the composition (timeline) within the project. If omitted, the agent chooses automatically. A value the product loads from the provider, such as an id; write the value itself. |
| `prompt` | string | yes |  | Prompt. Natural language instruction for Underlord. Examples: "Add studio sound to every clip", "Remove all filler words", "Create a 30-second highlight reel with the best moments". Be specific — frame edits as a single one-shot instruction. |
| `model` | string | no |  | AI Model. AI model to use for editing. Leave blank to use the Descript default. |
| `callback_url` | string | no |  | Callback URL. Optional webhook URL. When the job finishes or fails, Descript will POST the job status to this URL (same payload as Get Job Status). |

### `publish_project`

**Publish Project.** Starts an asynchronous Descript publish/export job for a project composition, producing a shareable link and a downloadable file as video or audio at a chosen resolution and share access level. Use to render and distribute a finished project. Requesting a share access level the Drive disallows returns an error. Not idempotent: each call queues a new export job and returns a job_id to poll for the share_url and download_url. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project. Select the Descript project to use. A value the product loads from the provider, such as an id; write the value itself. |
| `composition_id` | string | no |  | Composition. Select the composition (timeline) within the project. If omitted, the agent chooses automatically. A value the product loads from the provider, such as an id; write the value itself. |
| `media_type` | string | no | `"Video"` | Output Type. Choose whether to export the project as a video or audio file. One of `"Video"`, `"Audio"`. |
| `resolution` | string | no | `"1080p"` | Video Resolution. Resolution for the exported video. Only applies when Output Type is Video. One of `"480p"`, `"720p"`, `"1080p"`, `"1440p"`, `"4K"`. |
| `access_level` | string | no |  | Share Access Level. Who can view the published share page. Leave blank to use your Drive's default. Note: requesting a level your Drive disallows (e.g. Public when search-engine indexing is off) will return an error. One of `"public"`, `"unlisted"`, `"drive"`, `"private"`. |
| `callback_url` | string | no |  | Callback URL. Optional webhook URL. When the publish job finishes or fails, Descript will POST the job status to this URL (same payload as Get Job Status). The result includes share_url and download_url once complete. |

### `get_job_status`

**Get Job Status.** Looks up the current state and result of a single Descript background job (import, agent edit, or publish) by its job_id. Use to poll for completion after starting an asynchronous job and to read outputs such as share/download URLs or error messages. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `job_id` | string | yes |  | Job ID. The job ID returned when you created the job (e.g. from "Import Media", "Agent Edit", or "Publish Project" actions). |

### `list_projects`

**List Projects.** Lists projects in the connected Descript Drive, auto-paginating through all matches. Optional filters narrow by name substring, creator (me vs anyone), and created/updated date ranges, with configurable sort field and direction; leaving filters blank returns all projects. Use to discover project IDs for other actions. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | no |  | Name Filter. Return only projects whose name contains this string (case-insensitive). |
| `created_by` | string | no |  | Created By. Filter projects by creator. One of `""`, `"me"`. |
| `sort` | string | no | `"created_at"` | Sort By. Field to sort results by. One of `"created_at"`, `"updated_at"`, `"name"`, `"last_viewed_at"`. |
| `direction` | string | no | `"desc"` | Sort Direction. Sort order for results. One of `"desc"`, `"asc"`. |
| `created_after` | string | no |  | Created After. Return only projects created after this date (ISO 8601, e.g. 2025-01-01T00:00:00Z). |
| `created_before` | string | no |  | Created Before. Return only projects created before this date (ISO 8601, e.g. 2025-12-31T23:59:59Z). |
| `updated_after` | string | no |  | Updated After. Return only projects updated after this date (ISO 8601, e.g. 2025-01-01T00:00:00Z). |
| `updated_before` | string | no |  | Updated Before. Return only projects updated before this date (ISO 8601, e.g. 2025-12-31T23:59:59Z). |

### `get_project`

**Get Project.** Fetches full details for a single Descript project by ID, including its compositions and media files. Use to resolve composition IDs or inspect project contents before editing or publishing. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project. Select the Descript project to use. A value the product loads from the provider, such as an id; write the value itself. |

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

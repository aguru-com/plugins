# Vercel

Deploy projects and manage environment variables on Vercel.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-vercel'
  version: '0.1.1'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Authenticate with a Vercel personal access token. Optionally provide a team ID or team slug to operate on team-owned resources.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `token` | string | yes |  | Vercel Access Token. Create a token in Vercel Settings → Tokens. |
| `teamId` | string | no |  | Team ID. Optional. Use this to target a specific Vercel team. |
| `slug` | string | no |  | Team Slug. Optional. Team slug. Ignored when Team ID is provided. |

## Actions

### `list_projects`

**List Projects.** List Vercel projects for the authenticated account or team, paging through all results. Leave the search value empty to fetch every project, or set it to filter projects by name. Use this to discover project IDs/names before deploying or managing env vars. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Filter projects by name. |

### `create_deployment`

**Create Deployment.** Trigger a new deployment for an existing Vercel project. Operates in one of two modes: redeploy an existing deployment by its ID (optionally using the latest commit), or deploy from a connected Git source (GitHub, GitLab, or Bitbucket) by branch/ref plus repo identifiers. Requires a target project; for Git mode a branch/ref and either a repo ID or org+repo name are mandatory. Not idempotent: each call starts a separate deployment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. Select a Vercel project. A value the product loads from the provider, such as an id; write the value itself. |
| `deployment_source` | string | yes | `"redeploy"` | Deployment Source. Choose whether to redeploy a previous deployment or deploy from a connected Git source. One of `"redeploy"`, `"git_source"`. |
| `source_fields` | object | no |  | Source Configuration. An object whose fields depend on other inputs; the product shows them. |
| `force_new` | boolean | no | `false` | Force New Deployment. Create a new deployment even if a previous similar deployment exists. |
| `skip_auto_detection_confirmation` | boolean | no | `true` | Skip Auto Detection Confirmation. Automatically confirm framework detection without prompting. |

### `get_deployment_status`

**Get Deployment Status.** Fetch a single Vercel deployment by ID and inspect its current state (e.g. building, ready, error), optionally including Git repository info. Use this to poll or check the outcome of a deployment. Requires the deployment ID, scoped to a chosen project. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. Select a Vercel project. A value the product loads from the provider, such as an id; write the value itself. |
| `deployment` | string | yes |  | Deployment. Select the deployment to inspect. A value the product loads from the provider, such as an id; write the value itself. |
| `with_git_repo_info` | boolean | no | `true` | Include Git Repository Info. Adds gitRepo information when available. |

### `list_environment_variables`

**List Environment Variables.** List the environment variables configured on a Vercel project, optionally filtered to a specific Git branch (preview-scoped vars only) and optionally requesting decrypted values where permitted. Use this to discover existing keys before reading or upserting a variable. Requires the target project. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. Select a Vercel project. A value the product loads from the provider, such as an id; write the value itself. |
| `decrypt` | boolean | no | `false` | Decrypt Values. Deprecated by Vercel. If enabled, Vercel will attempt to return decrypted values when allowed. |
| `git_branch` | string | no |  | Git Branch. Optional branch filter. Only valid for preview-scoped variables. |

### `upsert_environment_variable`

**Upsert Environment Variable.** Create or update an environment variable on a Vercel project via Vercel's upsert endpoint, keyed by the variable name. Choose the variable type (plain, sensitive, or encrypted) and one or more target environments (production, preview, development); a Git branch may only be set when preview is among the targets. Use when you need a specific key set to a known value. Idempotent: repeating with the same key and value yields the same stored variable. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project` | string | yes |  | Project. Select a Vercel project. A value the product loads from the provider, such as an id; write the value itself. |
| `key` | string | yes |  | Key. Environment variable key. |
| `value` | string | yes |  | Value. Environment variable value. |
| `type` | string | yes | `"plain"` | Variable Type. Vercel environment variable type. One of `"plain"`, `"sensitive"`, `"encrypted"`. |
| `target` | array | yes | `["production","preview","development"]` | Target Environments. Environment(s) where this variable should apply. One of `"production"`, `"preview"`, `"development"`. |
| `git_branch` | string | no |  | Git Branch. Optional branch. Only valid when Preview is one of the selected targets. |
| `comment` | string | no |  | Comment. Optional note describing the variable usage. |

### `custom_api_call`

**Custom API Call.** Make a custom API call to Vercel. The Authorization header is injected automatically. If your connection uses Team ID or Team Slug, add `teamId` or `slug` manually in the URL or Query Parameters for team-scoped requests. Needs authentication.

Kind: write.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `url` | object | yes |  | . An object whose fields depend on other inputs; the product shows them. |
| `method` | string | yes | `"GET"` | Method. One of `"GET"`, `"POST"`, `"PATCH"`, `"PUT"`, `"DELETE"`, `"HEAD"`. |
| `headers` | object | no |  | Headers. Authorization headers are injected automatically from your connection. |
| `queryParams` | object | no |  | Query Parameters. Optional query parameters. For team-scoped requests, manually include `teamId` or `slug` here when needed. |
| `body_type` | string | no | `"none"` | Body Type. A value the product loads from the provider, such as an id; write the value itself. |
| `body` | object | no |  | Body. An object whose fields depend on other inputs; the product shows them. |
| `response_is_binary` | boolean | no | `false` | Response is Binary. Enable for files like PDFs, images, etc. |
| `failsafe` | boolean | no |  | Return Error as Output. On a failed request, output the error instead of failing the step. |
| `timeout` | number | no |  | Timeout. Seconds to wait for a response. Empty: up to the flow limit (10 min). |
| `followRedirects` | boolean | no | `false` | Follow redirects. Follow 3xx redirects instead of returning them as the response. |

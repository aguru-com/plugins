# Lokalise

Lokalise is a collaborative translation platform.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-lokalise'
  version: '0.1.0'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Token

> Lokalise API Token. You can generate one from your Lokalise account.

## Actions

### `createComment`

**Create Comment.** Post a new comment on a specific translation key in a Lokalise project. Requires the project ID and key ID. Not idempotent: each call appends another comment. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the Lokalise project. A value the product loads from the provider, such as an id; write the value itself. |
| `keyId` | string | yes |  | Key. Select the key. A value the product loads from the provider, such as an id; write the value itself. |
| `comment` | string | yes |  | Comment. The comment text to add to the key. |

### `createKey`

**Create Key.** Create a new translation key in a Lokalise project, tagged to one or more platforms (iOS, Android, web, etc.). Requires the project ID and key name; platforms are mandatory. Not idempotent: each call adds a key even if the name repeats. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the Lokalise project. A value the product loads from the provider, such as an id; write the value itself. |
| `keyName` | string | yes |  | Key Name. The name/identifier for the key (e.g., "index.welcome") |
| `description` | string | no |  | Description. Optional description for the key. |
| `platforms` | array | yes |  | Platforms. Select the platforms this key applies to. One of `"ios"`, `"android"`, `"web"`, `"flutter"`, `"react_native"`, `"other"`. |
| `tags` | array | no |  | Tags. Comma-separated tags for the key (e.g., "urgent,ui") |
| `useAutomations` | boolean | no | `false` | Use Automations. Whether to run automations on the new key translations. |

### `createProject`

**Create Project.** Create a new localization project in your Lokalise team, optionally setting its type, base language, and target team. Use when starting a new translation workspace. Not idempotent: repeating the call creates duplicate projects. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectName` | string | yes |  | Project Name. Name of the project. |
| `description` | string | no |  | Description. Description of the project. |
| `projectType` | string | no |  | Project Type. Type of the project. One of `"localization_files"`, `"paged_documents"`, `"content_integration"`, `"marketing"`, `"marketing_integrations"`. |
| `baseLangIso` | string | no |  | Base Language ISO. Language/locale code of the project base language (e.g., "en", "en-us") |
| `teamId` | string | no |  | Team ID. ID of the team to create a project in (numerical ID or UUID). If omitted, the project will be created in your current team. |
| `isSegmentationEnabled` | boolean | no | `false` | Enable Segmentation. Enable Segmentation feature for project. |

### `createTask`

**Create Task.** Create a workflow task (translation, automatic translation, LQA by AI, or review) in a Lokalise project, scoped to specific keys and target languages. Use to assign translation or review work. Not idempotent: each call creates a separate task. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the Lokalise project. A value the product loads from the provider, such as an id; write the value itself. |
| `taskTitle` | string | yes |  | Task Title. Title of the task. |
| `description` | string | no |  | Description. Brief task description. Used as instructions for AI in automatic_translation and lqa_by_ai task types. |
| `taskType` | string | no |  | Task Type. Type of the task. One of `"translation"`, `"automatic_translation"`, `"lqa_by_ai"`, `"review"`. |
| `keys` | array | no |  | Key. Comma-separated list of key IDs to include in the task (required unless parent_task_id is specified) |
| `languages` | array | no |  | Languages. Comma-separated language ISO codes for the task (e.g., "fr,de,es") Each item: { `languageIso` }. |
| `sourceLanguageIso` | string | no |  | Source Language ISO. Source language code for the task. |
| `dueDate` | string | no |  | Due Date. Due date in format: Y-m-d H:i:s (e.g., "2024-12-31 23:59:59") |
| `autoCloseLanguages` | boolean | no | `true` | Auto Close Languages. Whether languages should be closed automatically upon completion. Default is true. |
| `autoCloseTask` | boolean | no | `true` | Auto Close Task. Whether the task should be automatically closed upon all language completion. Default is true. |
| `closingTags` | array | no |  | Closing Tags. Comma-separated tags to be added to keys when task is closed. |
| `doLockTranslations` | boolean | no | `false` | Lock Translations. If set to true, will lock translations for non-assigned project members. |
| `markVerified` | boolean | no | `true` | Mark Verified. Mark translations as verified. Only for automatic_translation tasks. Default is true. |
| `saveAiTranslationToTm` | boolean | no | `false` | Save AI Translation to TM. Save AI translations to Translation Memory. Only for automatic_translation tasks. |
| `applyAiTm100Matches` | boolean | no | `false` | Apply AI TM 100% Matches. Apply 100% translation memory matches. Only for automatic_translation tasks. |

### `deleteKey`

**Delete Key.** Permanently delete a translation key (and its translations) from a Lokalise project, identified by project ID and key ID. Only works for software and marketing project types. Idempotent in effect: once deleted, re-running has no further effect, though the key must currently exist. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the Lokalise project. A value the product loads from the provider, such as an id; write the value itself. |
| `keyId` | string | yes |  | Key. Select the key. A value the product loads from the provider, such as an id; write the value itself. |

### `retrieveAComment`

**Retrieve a comment.** Fetch a single comment on a translation key, identified by project ID, key ID, and comment ID. Use to read one comment's text and metadata. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the Lokalise project. A value the product loads from the provider, such as an id; write the value itself. |
| `keyId` | string | yes |  | Key. Select the key. A value the product loads from the provider, such as an id; write the value itself. |
| `commentId` | string | yes |  | Comment ID. Unique identifier of the comment. |

### `retrieveAKey`

**Retrieve a key.** Fetch the details of a single translation key, including its translations and metadata, by project ID and key ID. Use to inspect a key before updating or referencing it. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the Lokalise project. A value the product loads from the provider, such as an id; write the value itself. |
| `keyId` | string | yes |  | Key. Select the key. A value the product loads from the provider, such as an id; write the value itself. |
| `disableReferences` | boolean | no | `false` | Disable References. Disable key references in the response. |

### `retrieveAProject`

**Retrieve a project.** Fetch the details and settings of a single Lokalise project by its project ID. Use to inspect project configuration or confirm a project exists. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the Lokalise project. A value the product loads from the provider, such as an id; write the value itself. |

### `retrieveTranslation`

**Retrieve Translation.** Fetch a single translation by its translation ID from a Lokalise project. Use to read the current value, status, and metadata of one translation. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the Lokalise project. A value the product loads from the provider, such as an id; write the value itself. |
| `translationId` | string | yes |  | Translation ID. Unique translation identifier. |
| `disableReferences` | boolean | no | `false` | Disable References. Disable key references in the translation. |

### `updateKey`

**Update Key.** Update properties of an existing translation key (name, description, platforms, tags, plural/hidden/archived flags, context, character limit) identified by project ID and key ID. Idempotent: re-sending the same field values leaves the key in the same state, though enabling Merge Tags appends tags rather than replacing them. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the Lokalise project. A value the product loads from the provider, such as an id; write the value itself. |
| `keyId` | string | yes |  | Key. Select the key. A value the product loads from the provider, such as an id; write the value itself. |
| `keyName` | string | no |  | Key Name. Key identifier (or JSON with ios, android, web, other for per-platform names) |
| `description` | string | no |  | Description. Description of the key. |
| `platforms` | array | no |  | Platforms. List of platforms enabled for this key. One of `"ios"`, `"android"`, `"web"`, `"other"`. |
| `tags` | array | no |  | Tags. Comma-separated tags for the key. |
| `mergeTags` | boolean | no | `false` | Merge Tags. Enable to merge specified tags with current tags. |
| `isPlural` | boolean | no | `false` | Is Plural. Whether this key is plural. |
| `pluralName` | string | no |  | Plural Name. Optional custom plural name. |
| `isHidden` | boolean | no | `false` | Is Hidden. Whether this key is hidden from non-admins. |
| `isArchived` | boolean | no | `false` | Is Archived. Whether this key is archived. |
| `context` | string | no |  | Context. Optional context of the key (used with some file formats) |
| `charLimit` | string | no |  | Character Limit. Maximum allowed number of characters in translations. |

### `updateTranslation`

**Update Translation.** Set the content and review flags of an existing translation, identified by project ID and translation ID. Use to write or correct a translation value. Idempotent: re-sending the same content and flags yields the same final state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project. Select the Lokalise project. A value the product loads from the provider, such as an id; write the value itself. |
| `translationId` | string | yes |  | Translation ID. Unique translation identifier. |
| `translation` | string | yes |  | Translation. The actual translation content. Use JSON object format for plural keys. |
| `isUnverified` | boolean | no | `false` | Mark as Unverified. Whether the Unverified flag is enabled. |
| `isReviewed` | boolean | no | `false` | Mark as Reviewed. Whether the Reviewed flag is enabled. |
| `custom_translation_status_ids` | array | no |  | Custom Translation Status IDs. Comma-separated custom translation status IDs to assign (existing statuses will be replaced) |

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

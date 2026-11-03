# Typeform

Create beautiful online forms and surveys

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-typeform'
  version: '0.6.2'
```

Categories: FORMS_AND_SURVEYS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `get_me`

**Get Account.** Get the connected Typeform account: alias, email and language. Use it to confirm which account is connected. It does not return the account ID; use List Workspaces for that. Read-only. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `user_id`: User ID
- `alias`: Name
- `email`: Email (email)
- `language`: Language

### `list_forms`

**List Forms.** List Typeform forms with each ID, title, public status, created and updated time and share link. Filter by title text and workspace, sort by created or updated time. Paginated with Page and Page Size (up to 200); total_items and page_count show how many pages exist. Use Get Form for the questions. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Only forms whose title contains this text. |
| `workspace` | string | no |  | Workspace ID. Workspace ID, from List Workspaces. |
| `sortBy` | string | no |  | Sort By. One of `"created_at"`, `"last_updated_at"`. |
| `orderBy` | string | no |  | Order. One of `"asc"`, `"desc"`. |
| `page` | number | no |  | Page. Page number, starting at 1. |
| `pageSize` | number | no |  | Page Size. How many items to return per page, from 1 to 200. |

Output fields:

- `items`: Forms
- `items[].id`: Form ID
- `items[].title`: Title
- `items[].type`: Type
- `items[]._links.display`: Share Link (url)
- `items[].settings.is_public`: Public (boolean)
- `items[].theme.href`: Theme (url)
- `items[].created_at`: Created At (datetime)
- `items[].last_updated_at`: Last Updated At (datetime)
- `total_items`: Total Items (number)
- `page_count`: Page Count (number)

### `get_form`

**Get Form.** Get one Typeform form by ID with its questions (fields, with IDs, refs, types and choices), welcome and thank-you screens, logic, hidden fields, settings, theme and workspace. Use it before Replace Form or Update Choice Options, and to read field IDs for response answers. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form ID. Form ID, from List Forms. |

Output fields:

- `id`: Form ID
- `title`: Title
- `type`: Type
- `_links.display`: Share Link (url)
- `settings.is_public`: Public (boolean)
- `settings.language`: Language
- `workspace.href`: Workspace (url)
- `theme.href`: Theme (url)
- `fields`: Questions
- `fields[].id`: Field ID
- `fields[].ref`: Ref
- `fields[].title`: Question
- `fields[].type`: Type
- `fields[].validations.required`: Required (boolean)
- `fields[].properties.choices`: Choices
- `fields[].properties.choices[].id`: Choice ID
- `fields[].properties.choices[].ref`: Choice Ref
- `fields[].properties.choices[].label`: Label
- `fields[].properties.fields`: Group Questions
- `fields[].properties.fields[].id`: Field ID
- `fields[].properties.fields[].ref`: Ref
- `fields[].properties.fields[].title`: Question
- `fields[].properties.fields[].type`: Type
- `fields[].properties.fields[].validations.required`: Required (boolean)
- `fields[].properties.fields[].properties.choices`: Choices
- `fields[].properties.fields[].properties.choices[].id`: Choice ID
- `fields[].properties.fields[].properties.choices[].ref`: Choice Ref
- `fields[].properties.fields[].properties.choices[].label`: Label
- `hidden`: Hidden Fields
- `thankyou_screens`: Thank-you Screens
- `thankyou_screens[].ref`: Ref
- `thankyou_screens[].title`: Title
- `created_at`: Created At (datetime)
- `last_updated_at`: Last Updated At (datetime)
- `published_at`: Published At (datetime)

### `create_form`

**Create Form.** Create a new Typeform form with a title, optionally in a workspace, with a theme and with questions. Questions are a JSON array of Typeform field objects, for example [{"title":"Your email?","type":"email","validations":{"required":true}}]; leave empty for an empty form. Returns the new form with its ID and share link. Each call creates another form. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `workspace` | string | no |  | Workspace. Workspace ID, from List Workspaces. A value the product loads from the provider, such as an id; write the value itself. |
| `theme` | string | no |  | Theme. Theme ID, from List Themes. A value the product loads from the provider, such as an id; write the value itself. |
| `fields` | JSON | no |  | Questions. JSON array of Typeform field objects, as documented in the Typeform Create API. Leave empty for an empty form. |

Output fields:

- `id`: Form ID
- `title`: Title
- `type`: Type
- `_links.display`: Share Link (url)
- `settings.is_public`: Public (boolean)
- `settings.language`: Language
- `workspace.href`: Workspace (url)
- `theme.href`: Theme (url)
- `fields`: Questions
- `fields[].id`: Field ID
- `fields[].ref`: Ref
- `fields[].title`: Question
- `fields[].type`: Type
- `fields[].validations.required`: Required (boolean)
- `fields[].properties.choices`: Choices
- `fields[].properties.choices[].id`: Choice ID
- `fields[].properties.choices[].ref`: Choice Ref
- `fields[].properties.choices[].label`: Label
- `fields[].properties.fields`: Group Questions
- `fields[].properties.fields[].id`: Field ID
- `fields[].properties.fields[].ref`: Ref
- `fields[].properties.fields[].title`: Question
- `fields[].properties.fields[].type`: Type
- `fields[].properties.fields[].validations.required`: Required (boolean)
- `fields[].properties.fields[].properties.choices`: Choices
- `fields[].properties.fields[].properties.choices[].id`: Choice ID
- `fields[].properties.fields[].properties.choices[].ref`: Choice Ref
- `fields[].properties.fields[].properties.choices[].label`: Label
- `hidden`: Hidden Fields
- `thankyou_screens`: Thank-you Screens
- `thankyou_screens[].ref`: Ref
- `thankyou_screens[].title`: Title
- `created_at`: Created At (datetime)
- `last_updated_at`: Last Updated At (datetime)
- `published_at`: Published At (datetime)

### `update_form`

**Update Form.** Change a Typeform form's title, public status (whether it accepts responses), theme or workspace. Only the fields you set change; questions are untouched. To change questions use Replace Form or Update Choice Options. Returns the updated form. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form ID. Form ID, from List Forms. |
| `title` | string | no |  | Title. |
| `isPublic` | string | no |  | Public. Whether the form is open and accepts responses. One of `"true"`, `"false"`. |
| `theme` | string | no |  | Theme ID. Theme ID, from List Themes. |
| `workspace` | string | no |  | Workspace ID. Workspace ID, from List Workspaces. |

Output fields:

- `id`: Form ID
- `title`: Title
- `type`: Type
- `_links.display`: Share Link (url)
- `settings.is_public`: Public (boolean)
- `settings.language`: Language
- `workspace.href`: Workspace (url)
- `theme.href`: Theme (url)
- `fields`: Questions
- `fields[].id`: Field ID
- `fields[].ref`: Ref
- `fields[].title`: Question
- `fields[].type`: Type
- `fields[].validations.required`: Required (boolean)
- `fields[].properties.choices`: Choices
- `fields[].properties.choices[].id`: Choice ID
- `fields[].properties.choices[].ref`: Choice Ref
- `fields[].properties.choices[].label`: Label
- `fields[].properties.fields`: Group Questions
- `fields[].properties.fields[].id`: Field ID
- `fields[].properties.fields[].ref`: Ref
- `fields[].properties.fields[].title`: Question
- `fields[].properties.fields[].type`: Type
- `fields[].properties.fields[].validations.required`: Required (boolean)
- `fields[].properties.fields[].properties.choices`: Choices
- `fields[].properties.fields[].properties.choices[].id`: Choice ID
- `fields[].properties.fields[].properties.choices[].ref`: Choice Ref
- `fields[].properties.fields[].properties.choices[].label`: Label
- `hidden`: Hidden Fields
- `thankyou_screens`: Thank-you Screens
- `thankyou_screens[].ref`: Ref
- `thankyou_screens[].title`: Title
- `created_at`: Created At (datetime)
- `last_updated_at`: Last Updated At (datetime)
- `published_at`: Published At (datetime)

### `replace_form`

**Replace Form.** Replace a Typeform form's whole definition (title, fields, screens, logic, settings) with the JSON you send. Call Get Form first and edit that result: any existing field missing from the definition, or sent without its original id, is deleted together with all its answers. The action refuses to delete fields unless Allow Field Deletion is on. The current theme is kept when the definition has none. For title, theme, workspace or public status use Update Form instead. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form ID. Form ID, from List Forms. |
| `definition` | JSON | yes |  | Form Definition. The full form JSON from Get Form, with your changes. Must include title. |
| `allowFieldDeletion` | boolean | no | `false` | Allow Field Deletion. Allow removing existing questions. Their responses are deleted too. |

Output fields:

- `id`: Form ID
- `title`: Title
- `type`: Type
- `_links.display`: Share Link (url)
- `settings.is_public`: Public (boolean)
- `settings.language`: Language
- `workspace.href`: Workspace (url)
- `theme.href`: Theme (url)
- `fields`: Questions
- `fields[].id`: Field ID
- `fields[].ref`: Ref
- `fields[].title`: Question
- `fields[].type`: Type
- `fields[].validations.required`: Required (boolean)
- `fields[].properties.choices`: Choices
- `fields[].properties.choices[].id`: Choice ID
- `fields[].properties.choices[].ref`: Choice Ref
- `fields[].properties.choices[].label`: Label
- `fields[].properties.fields`: Group Questions
- `fields[].properties.fields[].id`: Field ID
- `fields[].properties.fields[].ref`: Ref
- `fields[].properties.fields[].title`: Question
- `fields[].properties.fields[].type`: Type
- `fields[].properties.fields[].validations.required`: Required (boolean)
- `fields[].properties.fields[].properties.choices`: Choices
- `fields[].properties.fields[].properties.choices[].id`: Choice ID
- `fields[].properties.fields[].properties.choices[].ref`: Choice Ref
- `fields[].properties.fields[].properties.choices[].label`: Label
- `hidden`: Hidden Fields
- `thankyou_screens`: Thank-you Screens
- `thankyou_screens[].ref`: Ref
- `thankyou_screens[].title`: Title
- `created_at`: Created At (datetime)
- `last_updated_at`: Last Updated At (datetime)
- `published_at`: Published At (datetime)

### `duplicate_form`

**Duplicate Form.** Create a copy of a Typeform form with the same questions, screens, logic, settings and theme, optionally with a new title and in another workspace. Responses, translations and webhooks are not copied. Returns the new form. Each call creates another copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Form Name. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | New Title. Defaults to "Copy of" and the original title. |
| `workspace` | string | no |  | Workspace. Workspace ID, from List Workspaces. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `id`: Form ID
- `title`: Title
- `type`: Type
- `_links.display`: Share Link (url)
- `settings.is_public`: Public (boolean)
- `settings.language`: Language
- `workspace.href`: Workspace (url)
- `theme.href`: Theme (url)
- `fields`: Questions
- `fields[].id`: Field ID
- `fields[].ref`: Ref
- `fields[].title`: Question
- `fields[].type`: Type
- `fields[].validations.required`: Required (boolean)
- `fields[].properties.choices`: Choices
- `fields[].properties.choices[].id`: Choice ID
- `fields[].properties.choices[].ref`: Choice Ref
- `fields[].properties.choices[].label`: Label
- `fields[].properties.fields`: Group Questions
- `fields[].properties.fields[].id`: Field ID
- `fields[].properties.fields[].ref`: Ref
- `fields[].properties.fields[].title`: Question
- `fields[].properties.fields[].type`: Type
- `fields[].properties.fields[].validations.required`: Required (boolean)
- `fields[].properties.fields[].properties.choices`: Choices
- `fields[].properties.fields[].properties.choices[].id`: Choice ID
- `fields[].properties.fields[].properties.choices[].ref`: Choice Ref
- `fields[].properties.fields[].properties.choices[].label`: Label
- `hidden`: Hidden Fields
- `thankyou_screens`: Thank-you Screens
- `thankyou_screens[].ref`: Ref
- `thankyou_screens[].title`: Title
- `created_at`: Created At (datetime)
- `last_updated_at`: Last Updated At (datetime)
- `published_at`: Published At (datetime)

### `update_choice_options`

**Update Choice Options.** Replace the list of options of one dropdown, multiple choice, ranking or picture choice question in a Typeform form; the question is found by field ID or ref from Get Form, including inside question groups. Options whose label already exists keep their id, so their past answers stay linked. The rest of the form is unchanged, but an edit made in Typeform at the same moment can be lost. Returns the updated form. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Form Name. A value the product loads from the provider, such as an id; write the value itself. |
| `field` | string | yes |  | Question. Dropdown, multiple choice, ranking or picture choice question. Field ID or ref, from Get Form. A value the product loads from the provider, such as an id; write the value itself. |
| `choices` | array | yes |  | Options. The full new list of option labels, in order. |

Output fields:

- `id`: Form ID
- `title`: Title
- `type`: Type
- `_links.display`: Share Link (url)
- `settings.is_public`: Public (boolean)
- `settings.language`: Language
- `workspace.href`: Workspace (url)
- `theme.href`: Theme (url)
- `fields`: Questions
- `fields[].id`: Field ID
- `fields[].ref`: Ref
- `fields[].title`: Question
- `fields[].type`: Type
- `fields[].validations.required`: Required (boolean)
- `fields[].properties.choices`: Choices
- `fields[].properties.choices[].id`: Choice ID
- `fields[].properties.choices[].ref`: Choice Ref
- `fields[].properties.choices[].label`: Label
- `fields[].properties.fields`: Group Questions
- `fields[].properties.fields[].id`: Field ID
- `fields[].properties.fields[].ref`: Ref
- `fields[].properties.fields[].title`: Question
- `fields[].properties.fields[].type`: Type
- `fields[].properties.fields[].validations.required`: Required (boolean)
- `fields[].properties.fields[].properties.choices`: Choices
- `fields[].properties.fields[].properties.choices[].id`: Choice ID
- `fields[].properties.fields[].properties.choices[].ref`: Choice Ref
- `fields[].properties.fields[].properties.choices[].label`: Label
- `hidden`: Hidden Fields
- `thankyou_screens`: Thank-you Screens
- `thankyou_screens[].ref`: Ref
- `thankyou_screens[].title`: Title
- `created_at`: Created At (datetime)
- `last_updated_at`: Last Updated At (datetime)
- `published_at`: Published At (datetime)

### `delete_form`

**Delete Form.** Permanently delete a Typeform form together with all of its responses. Cannot be undone; confirm with the user first. To stop new responses without losing data, use Update Form with Public set to Closed instead. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form ID. Form ID, from List Forms. |

Output fields:

- `deleted`: Deleted (boolean)
- `form_id`: Form ID

### `get_form_messages`

**Get Form Messages.** Get the custom interface texts of a Typeform form (button labels, error messages, placeholders), keyed like "label.buttonHint.default". Use it to see the keys before Update Form Messages. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form ID. Form ID, from List Forms. |

### `update_form_messages`

**Update Form Messages.** Change some of the interface texts of a Typeform form. Send only the keys to change, as a JSON object like {"label.button.submit":"Send"}; keys come from Get Form Messages and the other texts stay as they are. Plain text only, no HTML. Returns all messages after the change. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form ID. Form ID, from List Forms. |
| `messages` | JSON | yes |  | Messages. JSON object of message keys and their new text. |

### `list_responses`

**Find Responses.** List responses to one Typeform form, newest first by default, with answers (each tied to a field ID from Get Form), hidden fields, score, submitted and landed time. Filter by text in the answers, a submitted time range, response type and response IDs. Responses from the last ~30 minutes may be missing; use the New Submission trigger for real-time data. Page Size up to 1000; for the next page pass the last token as Before. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Form Name. A value the product loads from the provider, such as an id; write the value itself. |
| `query` | string | no |  | Search. Only responses containing this text in any answer or hidden field. |
| `since` | ISO date-time string | no |  | Submitted After. |
| `until` | ISO date-time string | no |  | Submitted Before. |
| `responseType` | string | no |  | Response Type. One of `"completed"`, `"partial"`, `"started"`. |
| `includedResponseIds` | array | no |  | Response IDs. Only these responses. |
| `sort` | string | no |  | Sort. One of `"submitted_at,desc"`, `"submitted_at,asc"`. |
| `pageSize` | number | no |  | Page Size. How many responses to return, from 1 to 1000. Default 25. |
| `before` | string | no |  | Before. Token of a response. Returns responses older than it, for the next page. |
| `after` | string | no |  | After. Token of a response. Returns responses newer than it. |

Output fields:

- `items`: Responses
- `items[].response_id`: Response ID
- `items[].token`: Token
- `items[].response_type`: Response Type
- `items[].submitted_at`: Submitted At (datetime)
- `items[].landed_at`: Landed At (datetime)
- `items[].answers`: Answers
- `items[].answers[].field.id`: Field ID
- `items[].answers[].field.ref`: Field Ref
- `items[].answers[].field.type`: Question Type
- `items[].answers[].type`: Answer Type
- `items[].answers[].text`: Text
- `items[].answers[].email`: Email (email)
- `items[].answers[].number`: Number (number)
- `items[].answers[].boolean`: Yes/No (boolean)
- `items[].answers[].date`: Date (date)
- `items[].answers[].url`: URL (url)
- `items[].answers[].phone_number`: Phone Number
- `items[].answers[].file_url`: File (url)
- `items[].answers[].choice.label`: Choice
- `items[].answers[].choices.labels`: Choices
- `items[].hidden`: Hidden Fields
- `items[].calculated.score`: Score (number)
- `items[].metadata.referer`: Referrer (url)
- `items[].metadata.platform`: Platform
- `items[].thankyou_screen_ref`: Thank-you Screen Ref
- `total_items`: Total Items (number)
- `page_count`: Page Count (number)

### `delete_responses`

**Delete Responses.** Permanently delete up to 1000 responses from a Typeform form by response ID (the response_id or token from Find Responses). Typeform deletes them in the background, so the result only means the request was accepted; unknown IDs are ignored. Check with Find Responses afterwards. Cannot be undone; confirm with the user first. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form ID. Form ID, from List Forms. |
| `responseIds` | array | yes |  | Response IDs. |

Output fields:

- `registered`: Deletion Requested (boolean)
- `form_id`: Form ID
- `response_ids`: Response IDs
- `count`: Count (number)

### `list_workspaces`

**List Workspaces.** List Typeform workspaces with each ID, name, account ID, whether it is the default or shared workspace, and its form count. This is where the account ID for Create Workspace comes from. Filter by name, or by Account ID to list one account. Paginated with Page and Page Size (up to 200). Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Only workspaces whose name contains this text. |
| `accountId` | string | no |  | Account ID. Only workspaces of this account (account_id from a workspace). |
| `page` | number | no |  | Page. Page number, starting at 1. |
| `pageSize` | number | no |  | Page Size. How many items to return per page, from 1 to 200. |

Output fields:

- `items`: Workspaces
- `items[].id`: Workspace ID
- `items[].name`: Name
- `items[].account_id`: Account ID
- `items[].default`: Default (boolean)
- `items[].shared`: Shared (boolean)
- `items[].forms.count`: Form Count (number)
- `total_items`: Total Items (number)
- `page_count`: Page Count (number)

### `get_workspace`

**Get Workspace.** Get one Typeform workspace by ID with its name, account ID, default and shared flags, form count and members with their roles. Use List Forms with this workspace to see its forms. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace ID. Workspace ID, from List Workspaces. |

Output fields:

- `id`: Workspace ID
- `name`: Name
- `account_id`: Account ID
- `default`: Default (boolean)
- `shared`: Shared (boolean)
- `forms.count`: Form Count (number)
- `members`: Members
- `members[].name`: Name
- `members[].email`: Email (email)
- `members[].role`: Role

### `create_workspace`

**Create Workspace.** Create a Typeform workspace to group forms. By default it goes in the account the connected user owns; set Account ID (account_id from List Workspaces) to create it in another account the user belongs to. Returns the new workspace with its ID. Each call creates another workspace. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `accountId` | string | no |  | Account ID. account_id from List Workspaces. Leave empty for your own account. |

Output fields:

- `id`: Workspace ID
- `name`: Name
- `account_id`: Account ID
- `default`: Default (boolean)
- `shared`: Shared (boolean)
- `forms.count`: Form Count (number)
- `members`: Members
- `members[].name`: Name
- `members[].email`: Email (email)
- `members[].role`: Role

### `update_workspace`

**Rename Workspace.** Rename a Typeform workspace. Its forms and members are unchanged. Returns the updated workspace. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace ID. Workspace ID, from List Workspaces. |
| `name` | string | yes |  | Name. |

Output fields:

- `id`: Workspace ID
- `name`: Name
- `account_id`: Account ID
- `default`: Default (boolean)
- `shared`: Shared (boolean)
- `forms.count`: Form Count (number)
- `members`: Members
- `members[].name`: Name
- `members[].email`: Email (email)
- `members[].role`: Role

### `delete_workspace`

**Delete Workspace.** Delete an empty Typeform workspace. Typeform would delete every form in a workspace and all their responses along with it, so this action refuses workspaces that still contain forms; move them with Update Form or delete them first. The default workspace cannot be deleted. Cannot be undone; confirm with the user first. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace` | string | yes |  | Workspace ID. Workspace ID, from List Workspaces. |

Output fields:

- `deleted`: Deleted (boolean)
- `workspace_id`: Workspace ID

### `list_themes`

**List Themes.** List Typeform themes with each ID, name, font, colors and visibility: private themes belong to the account and can be edited, public ones are Typeform presets. Paginated with Page and Page Size (up to 200). Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no |  | Page. Page number, starting at 1. |
| `pageSize` | number | no |  | Page Size. How many items to return per page, from 1 to 200. |

Output fields:

- `items`: Themes
- `items[].id`: Theme ID
- `items[].name`: Name
- `items[].visibility`: Visibility
- `items[].font`: Font
- `items[].colors.question`: Question Color
- `items[].colors.answer`: Answer Color
- `items[].colors.button`: Button Color
- `items[].colors.background`: Background Color
- `items[].fields.alignment`: Question Alignment
- `items[].fields.font_size`: Question Font Size
- `items[].screens.alignment`: Screen Alignment
- `items[].screens.font_size`: Screen Font Size
- `items[].has_transparent_button`: Transparent Button (boolean)
- `items[].rounded_corners`: Rounded Corners
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `total_items`: Total Items (number)
- `page_count`: Page Count (number)

### `get_theme`

**Get Theme.** Get one Typeform theme by ID with its name, font, colors, question and screen alignment and font size, background and visibility. Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `themeId` | string | yes |  | Theme ID. Theme ID, from List Themes. |

Output fields:

- `id`: Theme ID
- `name`: Name
- `visibility`: Visibility
- `font`: Font
- `colors.question`: Question Color
- `colors.answer`: Answer Color
- `colors.button`: Button Color
- `colors.background`: Background Color
- `fields.alignment`: Question Alignment
- `fields.font_size`: Question Font Size
- `screens.alignment`: Screen Alignment
- `screens.font_size`: Screen Font Size
- `has_transparent_button`: Transparent Button (boolean)
- `rounded_corners`: Rounded Corners
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `create_theme`

**Create Theme.** Create a private Typeform theme with a name, font, the four colors (question, answer, button, background, as hex like #3D3D3D) and alignment and font size for questions and screens. Alignment defaults to left and font size to medium. Apply it to a form with Update Form. Each call creates another theme. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `font` | string | no |  | Font. One of `"Acme"`, `"Arial"`, `"Arvo"`, `"Avenir Next"`, `"Bangers"`, `"Cabin"`, `"Cabin Condensed"`, `"Courier"`, `"Crete Round"`, `"Dancing Script"`, `"Exo"`, `"Georgia"`, `"Handlee"`, `"Helvetica Neue"`, `"Karla"`, `"Lato"`, `"Lekton"`, `"Lobster"`, `"Lora"`, `"McLaren"`, `"Montserrat"`, `"Nixie One"`, `"Old Standard TT"`, `"Open Sans"`, `"Oswald"` and 7 more. |
| `questionColor` | string | yes |  | Question Color. Hex color, for example #3D3D3D. |
| `answerColor` | string | yes |  | Answer Color. Hex color. |
| `buttonColor` | string | yes |  | Button Color. Hex color. |
| `backgroundColor` | string | yes |  | Background Color. Hex color. |
| `fieldAlignment` | string | no |  | Question Alignment. One of `"left"`, `"center"`. |
| `fieldFontSize` | string | no |  | Question Font Size. One of `"small"`, `"medium"`, `"large"`. |
| `screenAlignment` | string | no |  | Screen Alignment. Alignment of welcome and thank-you screens. One of `"left"`, `"center"`. |
| `screenFontSize` | string | no |  | Screen Font Size. One of `"small"`, `"medium"`, `"large"`. |

Output fields:

- `id`: Theme ID
- `name`: Name
- `visibility`: Visibility
- `font`: Font
- `colors.question`: Question Color
- `colors.answer`: Answer Color
- `colors.button`: Button Color
- `colors.background`: Background Color
- `fields.alignment`: Question Alignment
- `fields.font_size`: Question Font Size
- `screens.alignment`: Screen Alignment
- `screens.font_size`: Screen Font Size
- `has_transparent_button`: Transparent Button (boolean)
- `rounded_corners`: Rounded Corners
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `update_theme`

**Update Theme.** Change a private Typeform theme's name, font, colors, alignment or font sizes; only the settings you set change. Typeform's public preset themes cannot be edited. All forms using the theme change with it. Returns the updated theme. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `themeId` | string | yes |  | Theme ID. Theme ID, from List Themes. |
| `name` | string | no |  | Name. |
| `font` | string | no |  | Font. One of `"Acme"`, `"Arial"`, `"Arvo"`, `"Avenir Next"`, `"Bangers"`, `"Cabin"`, `"Cabin Condensed"`, `"Courier"`, `"Crete Round"`, `"Dancing Script"`, `"Exo"`, `"Georgia"`, `"Handlee"`, `"Helvetica Neue"`, `"Karla"`, `"Lato"`, `"Lekton"`, `"Lobster"`, `"Lora"`, `"McLaren"`, `"Montserrat"`, `"Nixie One"`, `"Old Standard TT"`, `"Open Sans"`, `"Oswald"` and 7 more. |
| `questionColor` | string | no |  | Question Color. Hex color, for example #3D3D3D. |
| `answerColor` | string | no |  | Answer Color. Hex color. |
| `buttonColor` | string | no |  | Button Color. Hex color. |
| `backgroundColor` | string | no |  | Background Color. Hex color. |
| `fieldAlignment` | string | no |  | Question Alignment. One of `"left"`, `"center"`. |
| `fieldFontSize` | string | no |  | Question Font Size. One of `"small"`, `"medium"`, `"large"`. |
| `screenAlignment` | string | no |  | Screen Alignment. Alignment of welcome and thank-you screens. One of `"left"`, `"center"`. |
| `screenFontSize` | string | no |  | Screen Font Size. One of `"small"`, `"medium"`, `"large"`. |

Output fields:

- `id`: Theme ID
- `name`: Name
- `visibility`: Visibility
- `font`: Font
- `colors.question`: Question Color
- `colors.answer`: Answer Color
- `colors.button`: Button Color
- `colors.background`: Background Color
- `fields.alignment`: Question Alignment
- `fields.font_size`: Question Font Size
- `screens.alignment`: Screen Alignment
- `screens.font_size`: Screen Font Size
- `has_transparent_button`: Transparent Button (boolean)
- `rounded_corners`: Rounded Corners
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `delete_theme`

**Delete Theme.** Delete a private Typeform theme. Typeform's public preset themes cannot be deleted. Cannot be undone; confirm with the user first. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `themeId` | string | yes |  | Theme ID. Theme ID, from List Themes. |

Output fields:

- `deleted`: Deleted (boolean)
- `theme_id`: Theme ID

### `list_images`

**List Images.** List images uploaded to the Typeform account, newest first, with each ID, file name and link. Typeform returns them all at once; Limit caps how many are returned. Read-only. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no |  | Limit. Maximum number of images to return. Default 50. |

Output fields:

- `items`: Images
- `items[].id`: Image ID
- `items[].file_name`: File Name
- `items[].src`: Image (image)
- `items[].media_type`: Media Type
- `items[].width`: Width (number)
- `items[].height`: Height (number)
- `count`: Count (number)
- `total_items`: Total Images (number)

### `get_image`

**Get Image.** Get one Typeform image by ID with its file name, media type, width, height and link (src). Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `imageId` | string | yes |  | Image ID. Image ID, from List Images. |

Output fields:

- `id`: Image ID
- `file_name`: File Name
- `src`: Image (image)
- `media_type`: Media Type
- `width`: Width (number)
- `height`: Height (number)

### `upload_image`

**Upload Image.** Upload an image to the Typeform account from a file or a public URL, to use in forms and themes. Returns the new image with its ID and link. Each call uploads another copy. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `image` | file | yes |  | Image. The image file, or a public URL to it. Files are not supported; an action that needs one fails. |
| `fileName` | string | no |  | File Name. Defaults to the file's own name. |

Output fields:

- `id`: Image ID
- `file_name`: File Name
- `src`: Image (image)
- `media_type`: Media Type
- `width`: Width (number)
- `height`: Height (number)

### `delete_image`

**Delete Image.** Delete an image from the Typeform account by ID. Forms and themes that use it may show it missing. Cannot be undone; confirm with the user first. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `imageId` | string | yes |  | Image ID. Image ID, from List Images. |

Output fields:

- `deleted`: Deleted (boolean)
- `image_id`: Image ID

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

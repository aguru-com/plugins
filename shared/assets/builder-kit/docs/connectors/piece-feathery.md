# Feathery

Build powerful forms, workflows, and document automation.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-feathery'
  version: '0.1.7'
```

Categories: FORMS_AND_SURVEYS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Feathery admin API key. You can get an API key by creating an account.

## Actions

### `create_form`

**Create Form.** Creates a new Feathery form by cloning an existing template form and applying step/element overrides (images, videos, texts, buttons, fields, navigation rules, logic rules). Use to provision a new form programmatically from a template; requires a unique form name and the template form ID. Not idempotent — each call creates a separate form. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_name` | string | yes |  | Form Name. The name of the new form (must be unique). |
| `template_form_id` | string | yes |  | Template Form. Select the template form to copy from. A value the product loads from the provider, such as an id; write the value itself. |
| `enabled` | boolean | no |  | Enabled. Whether the created form should be enabled. If not set, inherits from template. |
| `steps` | array | yes |  | Steps. Define the steps for your form. Each item: { `step_id`, `template_step_id`?, `origin`? }. |
| `step_images` | array | no |  | Step Images. Edit image elements on steps. Each item: { `step_id`, `id`, `source_url`?, `asset`? }. |
| `step_videos` | array | no |  | Step Videos. Edit video elements on steps. Each item: { `step_id`, `id`, `source_url`?, `asset`? }. |
| `step_texts` | array | no |  | Step Texts. Edit text elements on steps. Each item: { `step_id`, `id`, `text`?, `asset`? }. |
| `step_buttons` | array | no |  | Step Buttons. Edit button elements on steps. Each item: { `step_id`, `id`, `text`?, `asset`? }. |
| `step_progress_bars` | array | no |  | Step Progress Bars. Edit progress bar elements on steps. Each item: { `step_id`, `id`, `progress`?, `asset`? }. |
| `step_fields` | array | no |  | Step Fields. Edit field elements on steps. Each item: { `step_id`, `id`, `field_id`?, `type`?, `description`?, `required`?, `placeholder`?, `tooltipText`?, `max_length`?, `min_length`?, `submit_trigger`?, `asset`? }. |
| `navigation_rules` | array | no |  | Navigation Rules. Define how users navigate between steps. Each item: { `previous_step_id`, `next_step_id`, `trigger`, `element_type`, `element_id` }. |
| `navigation_conditions` | array | no |  | Navigation Conditions. Conditions for navigation rules. Reference the navigation rule by its index (0-based). Each item: { `rule_index`, `comparison`, `field_key`, `value` }. |
| `logic_rules` | array | no |  | Logic Rules. Advanced logic rules for the form. Each item: { `name`, `code`, `trigger_event`, `description`?, `index`?, `steps_csv`?, `elements_csv`? }. |

### `update_form`

**Update Form.** Updates an existing Feathery form identified by its form ID, optionally setting a new name, enabled/disabled status, and text translations. Use to rename, enable/disable, or localize a form. Note that supplied translations overwrite the form's existing translation set. Idempotent: re-running with the same input leaves the form in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Select the form to update. A value the product loads from the provider, such as an id; write the value itself. |
| `form_name` | string | no |  | Form Name. New name for the form. |
| `enabled` | boolean | no |  | Enabled. Whether the form should be enabled or disabled. |
| `translations` | array | no |  | Translations. Add translations for form text. Note: This will override existing translations. Each item: { `default_text`, `language_code`, `translation` }. |

### `delete_form`

**Delete Form.** Permanently deletes a Feathery form identified by its form ID; this cannot be undone. Use when an agent must remove a form entirely. Requires the confirm-delete flag to be set or the call errors. Not idempotent — the form is removed once and subsequent calls target a non-existent form. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Select the form to delete. A value the product loads from the provider, such as an id; write the value itself. |
| `confirm_delete` | boolean | yes | `false` | Confirm Delete. Check to confirm deletion. This action cannot be undone. |

### `list_form_submissions`

**List Form Submissions.** Retrieves submission records for a given Feathery form, with optional filters for creation/update time windows, completion status, specific field IDs, exact field-value matches, and fuzzy search across weighted fields. Use to read or search existing form submissions; the form ID is required and all filters are optional (omitting them returns all submissions). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Select the form to get submissions for. A value the product loads from the provider, such as an id; write the value itself. |
| `start_time` | ISO date-time string | no |  | Start Time. Limit submissions to after this update time. |
| `end_time` | ISO date-time string | no |  | End Time. Limit submissions to before this update time. |
| `created_after` | ISO date-time string | no |  | Created After. Limit submissions to after this creation time. |
| `created_before` | ISO date-time string | no |  | Created Before. Limit submissions to before this creation time. |
| `count` | number | no |  | Count. Limit the number of returned submissions. |
| `completed` | string | no |  | Completion Status. Filter by completion status. One of `""`, `"true"`, `"false"`. |
| `fields` | string | no |  | Fields. Comma-separated list of field IDs to return. |
| `no_field_values` | boolean | no |  | Exclude Field Values. Don't return field data. More performant for large datasets. |
| `sort` | string | no |  | Sort. How to sort the returned field values. One of `""`, `"layout"`. |
| `page_size` | number | no |  | Page Size. Number of results per page (default 500, max 1000). |
| `use_cache` | boolean | no |  | Use Cache. Use cached data for faster response (may be a few minutes old). |
| `field_search` | array | no |  | Field Search. Search for submissions with specific field values. Each item: { `field_id`, `value` }. |
| `fuzzy_search_threshold` | number | no |  | Fuzzy Search Threshold. Score threshold between 0 and 1 for fuzzy search. |
| `fuzzy_search_parameters` | array | no |  | Fuzzy Search Parameters. Fields and terms for fuzzy search. Weights must sum to 1. Each item: { `field_id`, `term`, `weight` }. |

### `export_submission_pdf`

**Export Form Submission PDF.** Generates a PDF export of one user's submission for a specific Feathery form, identified by form ID and user ID. Use to produce a downloadable PDF of a completed submission. Not idempotent — each call triggers a new export generation. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `form_id` | string | yes |  | Form. Select the form to export submission from. A value the product loads from the provider, such as an id; write the value itself. |
| `user_id` | string | yes |  | User. Select the user whose submission to export. A value the product loads from the provider, such as an id; write the value itself. |

# Metatext

AI content moderation and safety guard API

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-metatext'
  version: '0.1.7'
```

Categories: ARTIFICIAL_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Contact support@metatext.io to get your API key.

## Actions

### `extract_text`

**Extract Text.** Run a Metatext extraction project against a block of text to pull out structured information such as entities or keywords. Use when you have a configured extraction project (referenced by its project ID) and want to extract fields from raw text; optionally target a specific model and version. Requires the project ID and the text; this is a read-only analysis call that returns the same result for the same input, so it is safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. The ID of your extraction project. |
| `text` | string | yes |  | Text. The text to extract information from. |
| `model` | string | no |  | Model. The model to use for extraction. |
| `refresh` | boolean | no | `false` | Refresh. Force refresh the extraction. |
| `version` | string | no |  | Version. Model version to use. |

### `classify_text`

**Classify Text.** Run a Metatext classification project against a block of text to assign it to categories such as sentiment, intent, or topic. Use when you have a configured classification project (referenced by its project ID) and want predicted labels for raw text; optionally tune which model/version to use, a minimum confidence threshold, and how many top labels to return. Requires the project ID and the text; this is a read-only analysis call that returns the same result for the same input, so it is safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. The ID of your classification project. |
| `text` | string | yes |  | Text. The text to classify. |
| `model` | string | no |  | Model. The model to use for classification. |
| `threshold` | number | no |  | Threshold. Minimum confidence score for predictions. |
| `top_labels` | number | no |  | Top Labels. Maximum number of labels to return. |
| `refresh` | boolean | no | `false` | Refresh. Force refresh the classification. |
| `version` | string | no |  | Version. Model version to use. |

### `finetune_model`

**Fine-tune Model.** Start a new Metatext fine-tuning job for a project, training a base model on the project data for a chosen task type (classification, extraction, or generation). Use when you want to kick off model training rather than run inference. Requires the project ID, task type, and base model name; optional hyperparameters tune the run. Not idempotent: each call launches a separate training job. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `project_id` | string | yes |  | Project ID. The ID of your project. |
| `taskType` | string | yes |  | Task Type. The type of task for fine-tuning. One of `"classification"`, `"extraction"`, `"generation"`. |
| `modelBase` | string | yes |  | Base Model. The base model to fine-tune (e.g., BERT) |
| `hyperparameters` | object | no |  | Hyperparameters. Custom hyperparameters for fine-tuning. |

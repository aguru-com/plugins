# Productboard

Productboard is a product management tool that helps you manage your product roadmap and features.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-productboard'
  version: '0.1.8'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Productboard API Key.
>
> To obtain your API Key:
> 1. Go to https://app.productboard.com/
> 2. Log in to your account
> 3. Go to Settings → Integrations → Public API
> 4. Generate a new API Key
> 5. Copy the Key and paste it here

## Actions

### `create_feature`

**Create Feature.** Creates a new feature (or subfeature) in Productboard under a chosen parent (a product/component for a feature, or another feature for a subfeature). Use to add roadmap items programmatically; requires a name, description, status, and a valid parent id matching the selected parent type. Not idempotent: each call creates a distinct feature. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Feature Name. Name of the feature. |
| `description` | string | yes |  | Description. Description of the feature. |
| `type` | string | yes |  | Type. Type of the feature. One of `"feature"`, `"subfeature"`. |
| `status` | string | yes |  | Status. Current status of the feature. A value the product loads from the provider, such as an id; write the value itself. |
| `parent_type` | object | yes |  | Parent Type. An object whose fields depend on other inputs; the product shows them. |
| `parent_id` | string | yes |  | Parent. A value the product loads from the provider, such as an id; write the value itself. |
| `archived` | boolean | no |  | Archived. A flag denoting if the feature is archived. If null, it will default to `false`. |

### `create_note`

**Create Note.** Creates a new feedback note in Productboard from a title and HTML content, optionally attaching it to a user (by email) or a company (by domain) — these two attachments are mutually exclusive — plus optional source/display-url metadata and tags. Use to capture customer feedback or external input into the inbox. Not idempotent: each call creates a separate note. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Note Title. Title of the feedback note. |
| `content` | string | yes |  | Content. HTML-encoded rich text content of the feedback note. |
| `user_email` | string | no |  | User Email. Email address of a user to be attached to the note. This field can't be combined with `Company Domain`. |
| `company_domain` | string | no |  | Company Domain. Domain of a company the note should be linked to. This field can't be combined with `User Email`. |
| `display_url` | string | no |  | Display URL. URL where the external entity can be accessed. |
| `source_origin` | string | no |  | Source Origin. A unique string identifying the external system from which the data came. |
| `source_record_id` | string | no |  | Source Record ID. The unique id of the record in the origin system. |
| `tags` | array | no |  | Tags. A set of tags for categorizing the note. Each item: { `tag` }. |

### `update_feature`

**Update Feature.** Updates an existing Productboard feature identified by its feature id, setting only the supplied fields (name, description, status, or archived flag) and leaving others unchanged. Use to edit a known feature; if no fields are provided it makes no change. Idempotent: re-applying the same field values leaves the feature in the same state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `feature_id` | string | yes |  | Feature. The feature to select. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Feature Name. New name for the feature. |
| `description` | string | no |  | Description. New description for the feature. |
| `status` | string | no |  | Status. Current status of the feature. A value the product loads from the provider, such as an id; write the value itself. |
| `archived` | boolean | no |  | Archived. Whether the feature is archived. |

### `get_feature`

**Get Feature.** Retrieves a single Productboard feature by its feature id. Use to look up a feature's current details before acting on it or to confirm it exists. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `feature_id` | string | yes |  | Feature. The feature to select. A value the product loads from the provider, such as an id; write the value itself. |

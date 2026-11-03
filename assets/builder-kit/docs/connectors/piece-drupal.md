# Drupal

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-drupal'
  version: '1.1.11'
```

Categories: BUSINESS_INTELLIGENCE, COMMERCE, CONTENT_AND_FILES, FORMS_AND_SURVEYS, MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> **Using Drupal's JSON:API**
>
> Your Drupal site comes with JSON:API built-in. Authentication to access relevant parts requires the HTTP Basic Authentication module, which is also part of your Drupal site. Just ensure both are enabled and configure user authentication:
>
> 1. Enable the JSON:API and the HTTP Basic Authentication modules
> 2. Create a user account and give it the permissions you want Activepieces to have
> 3. Use that account's credentials for authentication
>
> Provide the website URL in the format https://www.example.com.
>
> For extra functionality, you can use the [Drupal Orchestration](https://www.drupal.org/project/orchestration) module.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `website_url` | string | yes |  | Website URL. URL of your Drupal site without a trailing "/" character. |
| `username` | string | yes |  | Username. |
| `password` | string | yes |  | Password. |

## Actions

### `drupal-call-service`

**Call Service.** Executes a named server-side service (e.g. an ECA/orchestration action) exposed by the Drupal site, passing a dynamic configuration object whose fields are defined by the chosen service. Use to invoke custom Drupal-side logic that has no dedicated action here. The service must be discoverable via the site's orchestration endpoint; because it runs arbitrary server logic, treat each call as potentially side-effecting and not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `service` | string | yes |  | Service. The service to call. A value the product loads from the provider, such as an id; write the value itself. |
| `config` | object | yes |  | Service configuration. An object whose fields depend on other inputs; the product shows them. |

### `drupal-create-entity`

**Create Entity.** Creates a new content entity (node, taxonomy term, user, etc.) of a chosen entity type and bundle in Drupal via JSON:API. Available fields are discovered from the selected entity type, and at least one field value must be supplied. Use when adding new content; each call creates a distinct entity, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entity_type` | string | yes |  | Entity Type. Choose the type of content to create. A value the product loads from the provider, such as an id; write the value itself. |
| `entity_fields` | object | no |  | Entity Fields. Fill in the content fields. Available fields depend on the entity type selected above. An object whose fields depend on other inputs; the product shows them. |

### `drupal-list-entities`

**List Entities.** Lists/retrieves entities of a chosen type and bundle from Drupal via JSON:API, with optional filtering by published status, sorting, and a result limit (limit 0 returns all entities, following pagination). Use to query or scan existing content rather than fetch one known item. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entity_type` | string | yes |  | Entity Type. Choose what type of content to list. A value the product loads from the provider, such as an id; write the value itself. |
| `published_status` | string | no | `"all"` | Published Status. Filter by publication status. One of `"all"`, `"published"`, `"unpublished"`. |
| `sort_by` | object | no |  | Sort Options. Choose how to sort the entities. An object whose fields depend on other inputs; the product shows them. |
| `sort_direction` | string | no | `"DESC"` | Sort Direction. One of `"DESC"`, `"ASC"`. |
| `limit` | number | yes | `50` | Limit. Maximum number of entities to retrieve (0 = all entities) |
| `output_options` | object | no |  | Output Options. An object whose fields depend on other inputs; the product shows them. |

### `drupal-get-entity`

**Get Entity.** Retrieves a single Drupal entity by its entity type, bundle, and UUID via JSON:API. Use when the exact UUID is known; to find entities by criteria use List Entities instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entity_type` | string | yes |  | Entity Type. Choose the type of content to retrieve. A value the product loads from the provider, such as an id; write the value itself. |
| `entity_uuid` | string | yes |  | Entity UUID. The unique identifier (UUID) of the specific content item to retrieve. |

### `drupal-update-entity`

**Update Entity.** Updates an existing Drupal entity identified by its entity type, bundle, and UUID via a JSON:API PATCH, changing only the fields you provide (empty fields are left untouched); at least one field value is required. Use to modify known content. Idempotent: re-applying the same field values to the same UUID yields the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entity_type` | string | yes |  | Entity Type. Select the entity type and bundle. A value the product loads from the provider, such as an id; write the value itself. |
| `entity_uuid` | string | yes |  | Entity UUID. The UUID of the entity to update. |
| `entity_fields` | object | no |  | Entity Fields. Update the values for the entity fields (only provide values for fields you want to change) An object whose fields depend on other inputs; the product shows them. |

### `drupal-delete-entity`

**Delete Entity.** Permanently deletes a Drupal entity identified by its entity type, bundle, and UUID via JSON:API. Use to remove known content. Not idempotent: the first call deletes the entity and a repeat call for the same UUID fails because the resource no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `entity_type` | string | yes |  | Entity Type. Choose the type of content to delete. A value the product loads from the provider, such as an id; write the value itself. |
| `entity_uuid` | string | yes |  | Entity UUID. The unique identifier (UUID) of the specific content item to delete. |

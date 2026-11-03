# Instasent

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-instasent'
  version: '0.1.7'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> ## Obtain your auth data
> 1. Go to https://dashboard.instasent.com
> 2. Access to your project
> 3. Create an Activepieces data source
> 4. Copy the auth parameters and paste them in the fields below

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `projectId` | string | yes |  | Project ID. Your Instasent Project ID. |
| `datasourceId` | string | yes |  | Datasource ID. Your Instasent Datasource ID. |
| `apiKey` | string | yes |  | API Key. Your Instasent API Bearer Token. |

## Actions

### `add_or_update_contact`

**Add/Update contact.** Upserts one contact in an Instasent datasource, keyed on the contact User ID (mandatory) — creates it if new, updates it otherwise. Use to push or sync contact attributes; the available attribute fields are loaded dynamically from the datasource. Enable the Instant option only when a following step must add an event for this contact (it processes synchronously instead of queuing). Idempotent: re-running with the same User ID and data converges to the same contact. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact` | object | yes |  | Contact Properties. Enter the contact properties, the User ID is mandatory. An object whose fields depend on other inputs; the product shows them. |
| `instant` | boolean | no | `false` | Instant. Process contact immediately instead of queuing. Only enable this when you need to add an event for this contact in the next step. Not recommended for high-volume operations. |

### `delete_contact`

**Delete Contact.** Deletes one contact from an Instasent datasource by its User ID. Use to remove a contact you can identify by stable User ID. Idempotent: deleting an already-removed contact leaves the same end state. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User ID. Unique identifier of the contact to delete. |

### `add_event`

**Add Event.** Records a contact event in Instasent for a given User ID and event type (selected from the datasource event specs), with event-type-specific parameters loaded dynamically. Use to track an activity or behavior against a contact. Requires an Event ID, which the platform uses to deduplicate — sending the same Event ID again will not create a duplicate, so the call is idempotent on Event ID. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User ID. Unique identifier of the user. |
| `event_id` | string | yes |  | Event ID. Unique identifier for this event. Used for deduplication. |
| `event_date` | string | no |  | Event Date. Date and time when the event occurred, will default to now (ISO 8601 format YYYY-MM-DDTHH:MM:SS.SSSZ) |
| `event_type` | string | yes |  | Event Type. Select the type of event to create. A value the product loads from the provider, such as an id; write the value itself. |
| `event_parameters` | object | yes |  | Event Parameters. Parameters for the selected event type. An object whose fields depend on other inputs; the product shows them. |

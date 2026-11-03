# Capsule CRM

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-capsule-crm'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> To authenticate with Capsule CRM:
> 1. Go to your Capsule CRM user settings.
> 2. Navigate to "My Preferences" > "API Authentication Tokens".
> 3. Register a new application to get a Client ID and Client Secret.
> 4. Add https://cloud.activepieces.com/redirect to the authorized redirect URIs.
> 5. Use the OAuth2 flow below.

## Actions

### `create_contact`

**Create Contact.** Creates a new contact record in Capsule CRM. Set the contact type to either a person (requires first and last name, optional linked organisation) or an organisation (requires organisation name); the type selection switches which name fields apply. Use to add a fresh contact you have confirmed does not already exist. Not idempotent: each call creates a separate record, so repeating it produces duplicate contacts. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Contact Type. The type of contact to create. One of `"person"`, `"organisation"`. |
| `contactFields` | object | yes |  | Details. An object whose fields depend on other inputs; the product shows them. |
| `about` | string | no |  | About. |
| `ownerId` | string | no |  | Owner. A value the product loads from the provider, such as an id; write the value itself. |
| `teamId` | string | no |  | Team. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | no |  | Tags. Values the product loads from the provider, such as ids; write an array of them. |
| `customFields` | object | yes |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |
| `emailAddresses` | array | no |  | Email Addresses. Each item: { `type`?, `address` }. |
| `phoneNumbers` | array | no |  | Phone Numbers. Each item: { `type`?, `number` }. |
| `addresses` | array | no |  | Addresses. Each item: { `type`?, `street`?, `city`?, `state`?, `country`?, `zip`? }. |
| `websites` | array | no |  | Websites. Each item: { `type`?, `service`, `address` }. |

### `update_contact`

**Update Contact.** Updates fields on an existing Capsule CRM contact identified by its contact ID. Editable fields depend on whether the contact is a person or an organisation, and nested email, phone, address, and website entries can be added or removed (each supports a delete flag). Use when you already know the target contact ID; only provided fields are changed. Not idempotent because it issues a mutating update on each call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contact_id` | string | yes |  | Contact. The contact (Person or Organisation) to select. A value the product loads from the provider, such as an id; write the value itself. |
| `contactFields` | object | yes |  | Details. An object whose fields depend on other inputs; the product shows them. |
| `ownerId` | string | no |  | Owner. The user to assign the task to. A value the product loads from the provider, such as an id; write the value itself. |
| `teamId` | string | no |  | Team. The team to assign the contact to. A value the product loads from the provider, such as an id; write the value itself. |
| `about` | string | no |  | About. Update the biography or description for the contact. |
| `addresses` | object | no |  | Addresses. An object whose fields depend on other inputs; the product shows them. |
| `websites` | object | no |  | Websites. An object whose fields depend on other inputs; the product shows them. |
| `emailAddresses` | object | no |  | Email Addresses. An object whose fields depend on other inputs; the product shows them. |
| `phoneNumbers` | object | no |  | Phone Numbers. An object whose fields depend on other inputs; the product shows them. |

### `create_opportunity`

**Create Opportunity.** Creates a new sales opportunity in Capsule CRM linked to a party (contact) and a pipeline milestone, both required. Use to log a new deal once you have the target party and milestone IDs. Not idempotent: each call creates a separate opportunity, so repeating it produces duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partyId` | string | yes |  | Party. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. A short description of the opportunity. |
| `description` | string | no |  | Description. More details about the opportunity. |
| `milestoneId` | string | yes |  | Milestone. A value the product loads from the provider, such as an id; write the value itself. |
| `currency` | string | no |  | Currency. The currency for the opportunity value (e.g., USD, GBP). |
| `amount` | number | no |  | Amount. The numerical value of the opportunity. |
| `expectedCloseOn` | ISO date-time string | no |  | Expected Close Date. The expected closing date for the opportunity. |
| `probability` | number | no |  | Probability. The probability of winning the opportunity. |
| `durationBasis` | string | no |  | Duration Basis. The basis of the duration of the opportunity. One of `"FIXED"`, `"HOUR"`, `"DAY"`, `"WEEK"`, `"MONTH"`, `"QUARTER"`, `"YEAR"`. |
| `duration` | number | no |  | Duration. The duration of the opportunity. |
| `ownerId` | string | no |  | Owner. The user the opportunity is assigned to. A value the product loads from the provider, such as an id; write the value itself. |
| `teamId` | string | no |  | Team. The team the opportunity is assigned to. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | no |  | Tags. Values the product loads from the provider, such as ids; write an array of them. |
| `customFields` | object | yes |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

### `create_project`

**Create Project.** Creates a new project (case) in Capsule CRM tied to a required party (contact), with optional links to an opportunity, stage, owner, team, tags, and custom fields. Use to open a new piece of work for a contact. Not idempotent: each call creates a separate project, so repeating it produces duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partyId` | string | yes |  | Party. The main contact for this project. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Name. The name of this project. |
| `description` | string | no |  | Description. The description of this project. |
| `opportunityId` | string | no |  | Opportunity. An optional link to the opportunity that this project was created to support. A value the product loads from the provider, such as an id; write the value itself. |
| `stageId` | string | no |  | Stage. The stage that this project is on. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Status. The status of the project. One of `"OPEN"`, `"CLOSED"`. |
| `expectedCloseOn` | ISO date-time string | no |  | Expected Close Date. The expected close date of this project. |
| `ownerId` | string | no |  | Owner. The user this project is assigned to. A value the product loads from the provider, such as an id; write the value itself. |
| `teamId` | string | no |  | Team. The team this project is assigned to. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | array | no |  | Tags. An array of tags that are added to this project. Values the product loads from the provider, such as ids; write an array of them. |
| `customFields` | object | no |  | Custom Fields. An array of custom fields that are defined for this project. An object whose fields depend on other inputs; the product shows them. |

### `create_task`

**Create Task.** Creates a new task in Capsule CRM with a description and due date, optionally linked to exactly one entity chosen via the Link To selector (a party/contact, an opportunity, or a project). Use to schedule a to-do or follow-up. Not idempotent: each call creates a separate task, so repeating it produces duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `description` | string | yes |  | Description. A short description of the task. |
| `dueOn` | ISO date-time string | yes |  | Due Date. The date when this task is due. |
| `detail` | string | no |  | Details. More details about the task. |
| `dueTime` | string | no |  | Due Time. The time when this task is due (e.g., 18:00:00). Note: The time is in the user's timezone. |
| `linkTo` | string | no |  | Link To. The entity this task is linked to. Only one can be selected. One of `"party"`, `"opportunity"`, `"project"`. |
| `linkedEntityId` | object | no |  | Linked Entity. An object whose fields depend on other inputs; the product shows them. |
| `categoryId` | string | no |  | Category. The category of this task. A value the product loads from the provider, such as an id; write the value itself. |
| `ownerId` | string | no |  | Owner. The user this task is assigned to. A value the product loads from the provider, such as an id; write the value itself. |

### `update_opportunity`

**Update Opportunity.** Updates an existing Capsule CRM opportunity identified by its opportunity ID, changing fields such as name, milestone, value, probability, duration, owner, team, tags, and custom fields. Tags and custom-field entries each support a delete flag for removal. Use when you already know the target opportunity ID; only provided fields are changed. Not idempotent because it issues a mutating update on each call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `opportunityId` | string | yes |  | Opportunity. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `milestoneId` | string | no |  | Milestone. A value the product loads from the provider, such as an id; write the value itself. |
| `currency` | string | no |  | Currency. |
| `amount` | number | no |  | Amount. |
| `expectedCloseOn` | ISO date-time string | no |  | Expected Close Date. |
| `probability` | number | no |  | Probability. |
| `durationBasis` | string | no |  | Duration Basis. One of `"FIXED"`, `"HOUR"`, `"DAY"`, `"WEEK"`, `"MONTH"`, `"QUARTER"`, `"YEAR"`. |
| `duration` | number | no |  | Duration. |
| `ownerId` | string | no |  | Owner. A value the product loads from the provider, such as an id; write the value itself. |
| `teamId` | string | no |  | Team. A value the product loads from the provider, such as an id; write the value itself. |
| `tags` | object | no |  | Tags. An object whose fields depend on other inputs; the product shows them. |
| `customFields` | object | no |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

### `add_note_to_entity`

**Add Note to Entity.** Appends a note entry to one Capsule CRM record, where the entity type selector chooses whether the note attaches to a party (contact), an opportunity, or a project. Use to log a comment or activity against a known record. Not idempotent: each call appends a new note, so repeating it adds duplicate notes. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `content` | string | yes |  | Note Content. The body of the note. |
| `entityType` | string | yes |  | Entity Type. The type of entity to add the note to. One of `"party"`, `"opportunity"`, `"project"`. |
| `entityId` | object | yes |  | Entity. An object whose fields depend on other inputs; the product shows them. |
| `activityTypeId` | string | no |  | Activity Type. The activity type for this entry. Defaults to "Note". A value the product loads from the provider, such as an id; write the value itself. |

### `find_contact`

**Find Contact.** Searches Capsule CRM contacts by a free-text term (such as a name or email) and returns only matches of type person, filtering out organisations. Use to look up an existing person before creating or referencing one. Idempotent: it is a read-only search that does not modify any data. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `term` | string | yes |  | Search Term. The value to search for (e.g., a name or email). |

### `find_project`

**Find Project.** Finds Capsule CRM projects (cases) matching a structured filter query (a conditions array of field/operator/value clauses, per Capsule's filter API). Use to locate projects by field criteria rather than a free-text term. Idempotent: it is a read-only filter that does not modify any data. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter` | JSON | yes | `{"conditions":[{"field":"name","operator":"is","value":"example"}]}` | Filter. The structured filter query. See the [documentation](https://capsulecrm.com/developer/api-v2/filters/) for examples. |

### `find_opportunity`

**Find Opportunity.** Finds Capsule CRM opportunities matching a structured filter query (a conditions array of field/operator/value clauses, per Capsule's filter API). Use to locate opportunities by field criteria rather than a free-text term. Idempotent: it is a read-only filter that does not modify any data. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter` | JSON | yes | `{"conditions":[{"field":"name","operator":"is","value":"example"}]}` | Filter. The structured filter query. See the [documentation](https://capsulecrm.com/developer/api-v2/filters/) for examples. |

# Smoove

Smoove is a platform for creating and managing your email list and sending emails to your subscribers.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-smoove'
  version: '0.1.7'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: smoove API Key

## Actions

### `addOrUpdateSubscriber`

**Add or Update Subscriber.** Create or update a Smoove contact by email and optionally link it to lists, set profile/custom fields, and email/SMS consent. The Operation prop switches the upsert behavior: create-only, create-or-update-if-exists (default), restore-if-deleted, restore-if-unsubscribed, or override-nullable-values. Use to push a subscriber into Smoove. Email is required; not idempotent since it creates or mutates the contact on each call. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email Address. Select an existing contact email or type a new one. A value the product loads from the provider, such as an id; write the value itself. |
| `firstName` | string | no |  | First Name. The first name of the contact. |
| `lastName` | string | no |  | Last Name. The last name of the contact. |
| `dateOfBirth` | ISO date-time string | no |  | Date of Birth. The date of birth of the contact. |
| `phone` | string | no |  | Phone Number. The primary phone number of the contact. |
| `cellPhone` | string | no |  | Cell Phone. The cell phone number of the contact. |
| `address` | string | no |  | Address. The street address of the contact. |
| `city` | string | no |  | City. The city of the contact. |
| `country` | string | no |  | Country. The country of the contact. |
| `company` | string | no |  | Company. The company name of the contact. |
| `position` | string | no |  | Position. The job title or position of the contact. |
| `externalId` | string | no |  | External ID. External identifier for the contact (useful for syncing with other systems) |
| `campaignSource` | string | no |  | Campaign Source. The campaign source that brought this contact. |
| `canReceiveEmails` | boolean | no | `true` | Can Receive Emails. Whether the contact can receive email communications. |
| `canReceiveSmsMessages` | boolean | no | `true` | Can Receive SMS. Whether the contact can receive SMS messages. |
| `lists` | array | no |  | Lists. Select lists to subscribe the contact to. Values the product loads from the provider, such as ids; write an array of them. |
| `customFields` | object | no |  | Custom Fields. Custom fields data (JSON object with field IDs as keys) |
| `operation` | string | yes | `"updateIfExists"` | Operation. Choose the contact operation type. One of `"create"`, `"updateIfExists"`, `"restoreIfDeleted"`, `"restoreIfUnsubscribed"`, `"overrideNullableValue"`. |

### `createAList`

**Create a List.** Create a new mailing list in Smoove with names, descriptions, and subscribe/unsubscribe/portal/visibility permissions. Use when a new list must exist before linking subscribers to it. Requires a list name; not idempotent — each call creates a separate list even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | List Name. The name of the list to be created. |
| `description` | string | no | `"This list is a list for new subscribers"` | Description. Internal description of the list for your reference. |
| `publicName` | string | no | `"My subscribers public name list"` | Public Name. The public-facing name of the list visible to subscribers. |
| `publicDescription` | string | no | `"Public name - This list is a list for new subscribers"` | Public Description. Public description of the list visible to subscribers. |
| `isPublic` | boolean | yes | `true` | Is Public. Make this list publicly visible. |
| `allowsUsersToSubscribe` | boolean | yes | `true` | Allow Users to Subscribe. Allow users to subscribe to this list themselves. |
| `allowsUsersToUnsubscribe` | boolean | yes | `true` | Allow Users to Unsubscribe. Allow users to unsubscribe from this list themselves. |
| `isPortal` | boolean | yes | `false` | Is Portal. Enable portal access for this list. |

### `findSubscriber`

**Find Subscriber.** Look up Smoove contacts via the Search Type prop, which selects one of three modes: by identifier (contact ID, email, phone, or external ID), by name (first/last name), or all active contacts with pagination. Use to resolve a contact ID or confirm a subscriber exists before acting on them. Identifier search requires at least one identifier and name search requires a name; idempotent read-only lookup. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchType` | string | yes | `"identifier"` | Search Type. Choose how to search for subscribers. One of `"identifier"`, `"name"`, `"all"`. |
| `id` | string | no |  | Contact ID. The unique ID of the contact. |
| `email` | string | no |  | Email Address. The email address of the contact. |
| `cellphone` | string | no |  | Phone Number. The phone number of the contact (cellphone) |
| `externalId` | string | no |  | External ID. The external ID of the contact. |
| `firstName` | string | no |  | First Name. Search by first name. |
| `lastName` | string | no |  | Last Name. Search by last name. |
| `fields` | string | no |  | Fields to Return. Comma-separated list of fields to return (e.g., id,email,firstName,lastName). Leave empty for all fields. |
| `includeCustomFields` | boolean | no | `false` | Include Custom Fields. Include custom fields in the response. |
| `includeLinkedLists` | boolean | no | `false` | Include Linked Lists. Include linked lists in the response. |
| `skip` | number | no | `0` | Skip Records. Number of records to skip (for pagination, default: 0) |
| `take` | number | no | `100` | Max Records. Maximum number of records to return (default: 100, max: 100) |
| `sort` | string | no | `"-id"` | Sort By. Sort the results by a specific field. One of `"-id"`, `"id"`, `"email"`, `"-email"`, `"firstName"`, `"-firstName"`, `"-lastChanged"`, `"lastChanged"`, `"-timestampSignup"`, `"timestampSignup"`. |

### `unsubscribe`

**Unsubscribe Subscriber.** Unsubscribe a Smoove contact from all lists and move them to the Unsubscribed list, recording a reason. Use to opt a subscriber out of all communications. Requires a contact ID; not idempotent — it posts a state-changing unsubscribe with a reason on each call. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact. Select the contact to unsubscribe. A value the product loads from the provider, such as an id; write the value itself. |
| `reason` | string | yes | `"Unsubscribed via automation"` | Unsubscribe Reason. Reason for unsubscribing the contact. |

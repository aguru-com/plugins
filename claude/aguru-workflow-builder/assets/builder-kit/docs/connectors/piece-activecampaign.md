# ActiveCampaign

Email marketing, marketing automation, and CRM tools you need to create incredible customer experiences.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-activecampaign'
  version: '0.1.9'
```

Categories: MARKETING, SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> To obtain your ActiveCampaign API URL and Key, follow these steps:
>
> 1. Log in to your ActiveCampaign account.
> 2. Navigate to **Settings->Developer** section.
> 3. Under **API Access** ,you'll find your API URL and Key.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiUrl` | string | yes |  | API URL. |
| `apiKey` | string | yes |  | API Key. |

## Actions

### `activecampaign_add_contact_to_account`

**Add Contact to Account.** Associates an existing contact with an existing account (CRM organization), optionally recording the contact's job title at that account. Use when linking a person to a company already in the CRM. Requires both the contact ID and account ID; not idempotent, as each call creates a new association record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. A value the product loads from the provider, such as an id; write the value itself. |
| `accountId` | string | yes |  | Account ID. A value the product loads from the provider, such as an id; write the value itself. |
| `jobTitle` | string | no |  | Job Title. |

### `activecampaign_add_tag_to_contact`

**Add Tag to Contact.** Attaches an existing tag to a contact for segmentation or automation triggering. Use when you have the contact ID and tag ID and want to label that contact. Not idempotent: each call creates a new contact-tag association record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. A value the product loads from the provider, such as an id; write the value itself. |
| `tagId` | string | yes |  | Tag ID. A value the product loads from the provider, such as an id; write the value itself. |

### `activecampaign_create_account`

**Create Account.** Creates a new ActiveCampaign account (CRM organization/company record) with a name and optional URL and custom field values. Use when you need to register a company in the CRM before associating contacts or deals with it. Not idempotent: each call creates a separate account even with identical input, so it can produce duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Account Name. |
| `accountUrl` | string | no |  | Account URL. |
| `accountCustomFields` | object | yes |  | Account Custom Fields. An object whose fields depend on other inputs; the product shows them. |

### `activecampaign_create_contact`

**Create Contact.** Creates a new ActiveCampaign contact from an email (required) plus optional first name, last name, phone, and custom field values. Use when adding a new person to the CRM. Not idempotent: each call creates a contact and does not look up or merge by email, so repeated calls can create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `phone` | string | no |  | Phone. |
| `contactCustomFields` | object | yes |  | Contact Custom Fields. An object whose fields depend on other inputs; the product shows them. |

### `activecampaign_update_account`

**Update Account.** Updates an existing ActiveCampaign account identified by account ID, changing its name, URL, and/or custom field values. Use when you already have the target account ID and want to modify its details. Idempotent: re-running with the same input leaves the account in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Account Name. |
| `accountUrl` | string | no |  | Account URL. |
| `accountCustomFields` | object | yes |  | Account Custom Fields. An object whose fields depend on other inputs; the product shows them. |

### `activecampaign_update_contact`

**Update Contact.** Updates an existing ActiveCampaign contact identified by contact ID, changing its email, name, phone, and/or custom field values. Use when you already have the contact ID and want to modify its details. Idempotent: re-running with the same input leaves the contact in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | no |  | Email. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `phone` | string | no |  | Phone. |
| `contactCustomFields` | object | yes |  | Contact Custom Fields. An object whose fields depend on other inputs; the product shows them. |

### `activecampaign_subscribe_or_unsubscribe_contact_from_list`

**Subscribe or Unsubscribe Contact From List.** Sets a contact's subscription status on a mailing list, toggling between Subscribe and Unsubscribe via the Action field. Use to add a contact to a list or remove them from one for email marketing. Requires a list ID and the contact ID; idempotent because re-applying the same status leaves the membership unchanged. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | List. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | yes |  | Action. One of `"1"`, `"2"`. |
| `contactId` | string | yes |  | Contact ID. |

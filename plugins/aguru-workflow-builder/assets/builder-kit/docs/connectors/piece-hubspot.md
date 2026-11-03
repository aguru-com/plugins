# HubSpot

Powerful CRM that offers tools for sales, customer service, and marketing automation.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-hubspot'
  version: '0.12.1'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

### `CUSTOM_AUTH`: Private App Access Token

> In HubSpot, go to **Development > Legacy Apps** in the left sidebar, create (or open) a private app, and on the **Scopes** tab grant the scopes for the actions you plan to use. They group roughly as:
> - **Contacts, companies & deals** — `crm.objects.contacts.read`, `crm.objects.contacts.write`, `crm.objects.companies.read`, `crm.objects.companies.write`, `crm.objects.deals.read`, `crm.objects.deals.write`, `crm.objects.line_items.read`, `crm.schemas.contacts.read`, `crm.schemas.companies.read`, `crm.schemas.deals.read`, `crm.schemas.line_items.read`
> - **Lists & custom objects** — `crm.lists.read`, `crm.lists.write`, `crm.objects.custom.read`, `crm.objects.custom.write`, `crm.schemas.custom.read`
> - **Leads & owners** — `crm.objects.leads.read`, `crm.objects.leads.write`, `crm.objects.owners.read`
> - **Tickets & e-commerce** — `tickets`, `e-commerce`
> - **Content, files & forms** — `content`, `files`, `forms`
> - **Workflows & meeting links** — `automation`, `scheduler.meetings.meeting-link.read`
> - **Account settings** — `settings.currencies.read`, `settings.users.read`, `settings.users.teams.read`
>
> Then copy the **Access Token** from the **Auth** tab and paste it below. Private app tokens never expire.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `access_token` | string | yes |  | Private App Access Token. The access token generated for your HubSpot private app. |

## Actions

### `add_contact_to_list`

**Add Contact to List.** Adds a contact, identified by email, to a chosen HubSpot static contact list. Use to enroll a known contact into a list for segmentation or workflow targeting; the list must be static (not dynamic/active). Idempotent: a contact already on the list stays a single member. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | Contact List. Only static lists are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Contact Email. |

### `add-contact-to-workflow`

**Add Contact to Workflow.** Enroll a contact (identified by email) into a specific HubSpot automation workflow. Only works with API-enrollable workflows. Re-enrolling an already-enrolled contact does not duplicate the enrollment, so it is effectively idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workflowId` | string | yes |  | Workflow. Only workflows that are turned on are listed. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Contact Email. |

### `create-associations`

**Create Associations.** Link one source HubSpot object (e.g. a company) to one or more target objects using a specific association type, batching the targets. Re-running with the same inputs re-applies the same association without creating duplicates. Use Remove Associations to undo a link. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fromObjectId` | string | yes |  | From Object ID. Map it from an earlier Find or Get step. |
| `fromObjectType` | string | yes |  | From Object Type. The object type of that record. A value the product loads from the provider, such as an id; write the value itself. |
| `toObjectType` | string | yes |  | To Object Type. The object type of the records to link to. A value the product loads from the provider, such as an id; write the value itself. |
| `associationType` | string | yes |  | Association Type. A value the product loads from the provider, such as an id; write the value itself. |
| `toObjectIds` | array | yes |  | To Records. The records to link to. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `totalAssociations`: Total Associations (number)
- `batchCount`: Batch Count (number)
- `responses`: Batch Responses
- `responses[].status`: Status
- `responses[].startedAt`: Started At (datetime)
- `responses[].completedAt`: Completed At (datetime)
- `responses[].results`: Results
- `responses[].results[].fromObjectId`: From Object ID
- `responses[].results[].fromObjectTypeId`: From Object Type ID
- `responses[].results[].toObjectId`: To Object ID
- `responses[].results[].toObjectTypeId`: To Object Type ID
- `responses[].results[].labels`: Labels

### `create-company`

**Create Company.** Create a new HubSpot company record from the supplied properties (name, domain, industry, etc.). Always inserts a new company even if one with the same domain already exists, so it is not idempotent; to change an existing record use Update Company, and to locate one first use a find action. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectProperties` | object | no |  | Object Properties. An object whose fields depend on other inputs; the product shows them. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `create-contact`

**Create Contact.** Creates a new contact record in HubSpot from the supplied property values, then returns the created contact. Use when you specifically need a new contact; to avoid duplicates when a contact may already exist, prefer Create or Update Contact, which upserts on email. Not idempotent: each call creates a separate contact. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectProperties` | object | no |  | Object Properties. An object whose fields depend on other inputs; the product shows them. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `create-blog-post`

**Create Blog Post.** Create a post in a HubSpot CMS (COS) blog with title, slug, body, and featured image, then optionally publish it immediately when Status is set to publish rather than draft. Each call creates a new post, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contentGroupId` | string | yes |  | Blog URL. A value the product loads from the provider, such as an id; write the value itself. |
| `authorId` | string | yes |  | Blog Author. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | yes |  | Status. One of `"DRAFT"`, `"PUBLISHED"`. |
| `slug` | string | yes |  | Slug. The last part of the post's URL. |
| `title` | string | yes |  | Title. |
| `body` | string | yes |  | Content. |
| `meta` | string | yes |  | Meta Description. |
| `imageUrl` | string | yes |  | Featured Image URL. |

Output fields:

- `id`: Post ID
- `name`: Name
- `title`: Title
- `slug`: Slug
- `url`: URL (url)
- `absolute_url`: Absolute URL (url)
- `state`: State
- `currently_published`: Currently Published (boolean)
- `content_group_id`: Blog ID
- `blog_author_id`: Author ID
- `author_name`: Author Name
- `meta_description`: Meta Description
- `post_body`: Body (html)
- `featured_image`: Featured Image (image)
- `created`: Created At (datetime)
- `updated`: Updated At (datetime)
- `publish_date`: Publish Date (datetime)

### `create-custome-object`

**Create Custom Object.** Create a new record of a selected HubSpot custom object type from the supplied properties. Each call inserts a new record, so it is not idempotent. Requires choosing the custom object type; use Find Custom Object to locate an existing record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customObjectType` | string | yes |  | Custom Object Type. A value the product loads from the provider, such as an id; write the value itself. |
| `objectProperties` | object | no |  | Object Properties. An object whose fields depend on other inputs; the product shows them. |
| `additionalPropertiesToRetrieve` | object | no |  | Additional Properties to Retrieve. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `create-deal`

**Create Deal.** Creates a new deal in HubSpot, requiring a deal name plus a pipeline and stage, and returns the created deal. Use to open a new opportunity; use Update Deal to modify an existing one. Not idempotent: each call creates a separate deal, so guard against duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dealname` | string | yes |  | Deal Name. |
| `pipelineId` | string | yes |  | Deal Pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `pipelineStageId` | string | yes |  | Deal Stage. A value the product loads from the provider, such as an id; write the value itself. |
| `objectProperties` | object | no |  | Object Properties. An object whose fields depend on other inputs; the product shows them. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `create-line-item`

**Create Line Item.** Creates a new standalone line item in HubSpot from a required product plus optional property values (quantity, price, discount), and returns the created line item. Use when building out a quote or deal's line items. Not idempotent: each call creates a separate line item. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | string | yes |  | Product. A value the product loads from the provider, such as an id; write the value itself. |
| `objectProperties` | object | no |  | Object Properties. An object whose fields depend on other inputs; the product shows them. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `create-page`

**Create Page.** Create a new HubSpot CMS landing page or site page (choose via Page Type) from a template, then optionally publish it when State is set to publish rather than leaving it as a draft. Each call creates a distinct page, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageType` | string | yes | `"landing_page"` | Page Type. One of `"landing_page"`, `"site_page"`. |
| `pageTitle` | string | yes |  | Page Title. |
| `internalPageName` | string | yes |  | Internal Page Name. |
| `templatePath` | string | yes |  | Template Path. The theme template to use, without a leading slash. |
| `slug` | string | yes |  | Slug. |
| `language` | string | no | `"en-us"` | Language. A language code such as en-us or de-de. |
| `metaDescription` | string | no |  | Meta Description. |
| `state` | string | no | `"DRAFT"` | Status. One of `"DRAFT"`, `"PUBLISHED_OR_SCHEDULED"`. |
| `headHtml` | string | no |  | Additional Head HTML. |
| `footerHtml` | string | no |  | Additional Footer HTML. |

Output fields:

- `id`: Page ID
- `name`: Internal Page Name
- `htmlTitle`: Page Title
- `slug`: Slug
- `url`: URL (url)
- `domain`: Domain
- `state`: State
- `published`: Published (boolean)
- `templatePath`: Template Path
- `language`: Language
- `authorName`: Author Name
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archivedAt`: Archived At (datetime)

### `create-or-update-contact`

**Create or Update Contact.** Upserts a contact keyed on email: searches for a contact with the given email and updates it if found, otherwise creates a new one with the provided properties. Use this safe-to-retry path when you want to set a contact by email without risking duplicates; use Create Contact when you specifically need a new record. Idempotent on the email key. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Contact Email. Used to find the contact; a new one is created if none matches. |
| `objectProperties` | object | no |  | Object Properties. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `create-product`

**Create Product.** Create a new product record in the HubSpot product library from the supplied properties (such as name, price, and description). Use when adding a catalog item; each call always creates a separate product, so repeated calls produce duplicates rather than updating an existing one. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectProperties` | object | no |  | Object Properties. An object whose fields depend on other inputs; the product shows them. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `create-ticket`

**Create Ticket.** Create a new HubSpot support ticket with a name, pipeline, and pipeline stage plus optional properties. Each call creates a separate ticket even for identical input, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticketName` | string | yes |  | Ticket Name. Shown as the ticket's subject in HubSpot. |
| `pipelineId` | string | yes |  | Ticket Pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `pipelineStageId` | string | yes |  | Ticket Stage. A value the product loads from the provider, such as an id; write the value itself. |
| `objectProperties` | object | no |  | Object Properties. An object whose fields depend on other inputs; the product shows them. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `get-company`

**Get Company.** Fetches a single company by its HubSpot company ID, returning default and any requested additional properties. Use when you already have the company ID; use Find Company to look one up by domain or another property first. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company ID. Map it from an earlier step like Find Company. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `get-contact`

**Get Contact.** Fetches a single contact by its HubSpot contact ID, returning default and any requested additional properties. Use when you already have the contact ID; to look one up by email instead, use a search-based action. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. Map it from an earlier step like Find Contact. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `get-custom-object`

**Get Custom Object.** Fetches a single custom-object record by its ID for a chosen custom object type, returning the requested properties. Use when you already have the record ID and the custom object type; for standard CRM objects use the dedicated Get Contact / Deal / Company / Ticket actions instead. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customObjectType` | string | yes |  | Custom Object Type. A value the product loads from the provider, such as an id; write the value itself. |
| `customObjectId` | string | yes |  | Custom Object ID. Map it from an earlier step like Find Custom Object. |
| `additionalPropertiesToRetrieve` | object | no |  | Additional Properties to Retrieve. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `get-deal`

**Get Deal.** Fetches a single deal by its HubSpot deal ID, returning default and any requested additional properties such as amount, stage, and close date. Use when you already have the deal ID. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dealId` | string | yes |  | Deal ID. Map it from an earlier step like Find Deal. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `get-line-item`

**Get Line Item.** Fetches a single line item by its HubSpot line item ID, returning default and any requested additional properties. Use when you already have the line item ID and need its details (price, quantity, product). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lineItemId` | string | yes |  | Line Item ID. Map it from an earlier step like Find Line Item. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `get-product`

**Get Product.** Fetch a single HubSpot product by its product ID, returning its default and any requested additional properties. Read-only and repeatable. Use Find Product when you only know property values rather than the ID. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | string | yes |  | Product ID. Map it from an earlier step like Find Product. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `get-page`

**Get Page.** Fetch the details of a single HubSpot CMS page by its ID. Use when you already have a page ID and need its current data; the page type input selects whether to read a site page or a landing page. Read-only and repeatable. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageType` | string | yes | `"landing_page"` | Page Type. One of `"landing_page"`, `"site_page"`. |
| `pageId` | string | yes |  | Page ID. Map it from an earlier step like Create Page. |

Output fields:

- `id`: Page ID
- `name`: Internal Page Name
- `htmlTitle`: Page Title
- `slug`: Slug
- `url`: URL (url)
- `domain`: Domain
- `state`: State
- `published`: Published (boolean)
- `templatePath`: Template Path
- `language`: Language
- `authorName`: Author Name
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archivedAt`: Archived At (datetime)

### `get-ticket`

**Get Ticket.** Fetches a single support ticket by its HubSpot ticket ID, returning default and any requested additional properties. Use when you already have the ticket ID; use Find Ticket to look one up by another property first. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticketId` | string | yes |  | Ticket ID. Map it from an earlier step like Find Ticket. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `delete-page`

**Delete Page.** Archive (delete) a HubSpot CMS landing page or site page by its ID; select the matching Page Type. Deleting an already-deleted page is harmless, so the operation is effectively idempotent on the end state. This is destructive and cannot be undone here. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pageType` | string | yes | `"landing_page"` | Page Type. One of `"landing_page"`, `"site_page"`. |
| `pageId` | string | yes |  | Page ID. Map it from an earlier step like Create Page. |

### `remove-associations`

**Remove Associations.** Remove the labeled association of a specific type between one source HubSpot object and one or more target objects, batching the targets. Removing an already-absent association is harmless, so it is idempotent on the end state. Use Create Associations to add links. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fromObjectId` | string | yes |  | From Object ID. Map it from an earlier Find or Get step. |
| `fromObjectType` | string | yes |  | From Object Type. The object type of that record. A value the product loads from the provider, such as an id; write the value itself. |
| `toObjectType` | string | yes |  | To Object Type. The object type of the linked records. A value the product loads from the provider, such as an id; write the value itself. |
| `associationType` | string | yes |  | Association Type. A value the product loads from the provider, such as an id; write the value itself. |
| `toObjectIds` | array | yes |  | To Records. The linked records to unlink. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `success`: Success (boolean)
- `totalAssociations`: Total Associations (number)
- `batchCount`: Batch Count (number)
- `responses`: Batch Responses

### `remove-contact-from-list`

**Remove Contact from List.** Remove a contact, identified by email, from a specific static HubSpot list (this only works on static lists, not active/dynamic ones). Use to revoke list membership; it first resolves the email to a contact and errors if no such contact exists or if the contact was not a member of the list. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `listId` | string | yes |  | Contact List. Only static lists are shown. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Contact Email. |

### `remove-email-subscription`

**Remove Email Subscription.** Unsubscribe an email address from all HubSpot marketing email subscriptions (opt the contact out of every subscription type). Re-running leaves the address in the same unsubscribed state, so it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Contact Email. |

### `update-company`

**Update Company.** Update properties on an existing HubSpot company identified by Company ID; only the supplied fields are changed. Applying the same field values repeatedly leaves the record in the same state, so it is idempotent. Use Create Company to add a new record, or a find action to obtain the ID first. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company ID. Map it from an earlier step like Find Company. |
| `objectProperties` | object | no |  | Object Properties. An object whose fields depend on other inputs; the product shows them. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `update-contact`

**Update Contact.** Update properties on an existing HubSpot contact identified by Contact ID; only the supplied fields are changed. Applying the same values repeatedly is idempotent. Use a find action to resolve the contact ID first, or a create action to add a new contact. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact ID. Map it from an earlier step like Find Contact. |
| `objectProperties` | object | no |  | Object Properties. An object whose fields depend on other inputs; the product shows them. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `update-custome-object`

**Update Custom Object.** Updates properties on an existing custom-object record identified by its custom object type and record ID, then returns the refreshed record. Use to modify a known custom-object record; for standard CRM objects use the dedicated update actions instead. Idempotent: applying the same property values converges to the same record state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customObjectType` | string | yes |  | Custom Object Type. A value the product loads from the provider, such as an id; write the value itself. |
| `customObjectId` | string | yes |  | Custom Object ID. Map it from an earlier step like Find Custom Object. |
| `objectProperties` | object | no |  | Object Properties. An object whose fields depend on other inputs; the product shows them. |
| `additionalPropertiesToRetrieve` | object | no |  | Additional Properties to Retrieve. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `update-deal`

**Update Deal.** Updates properties on an existing deal identified by its deal ID, such as name, pipeline, stage, or custom fields, then returns the refreshed deal. Use to modify a known deal; use Create Deal to make a new one. Idempotent: applying the same property values converges to the same deal state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dealId` | string | yes |  | Deal ID. Map it from an earlier step like Find Deal. |
| `dealname` | string | no |  | Deal Name. Leave empty to keep the current name. |
| `pipelineId` | string | no |  | Deal Pipeline. Leave empty to keep the current pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `pipelineStageId` | string | no |  | Deal Stage. Leave empty to keep the current stage. A value the product loads from the provider, such as an id; write the value itself. |
| `objectProperties` | object | no |  | Object Properties. An object whose fields depend on other inputs; the product shows them. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `update-line-item`

**Update Line Item.** Update properties (product, quantity, price, etc.) on an existing HubSpot line item identified by Line Item ID; only supplied fields change. Applying the same values repeatedly is idempotent. Use a find action to obtain the line item ID first. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lineItemId` | string | yes |  | Line Item ID. Map it from an earlier step like Find Line Item. |
| `productId` | string | no |  | Product. Leave empty to keep the current product. A value the product loads from the provider, such as an id; write the value itself. |
| `objectProperties` | object | no |  | Object Properties. An object whose fields depend on other inputs; the product shows them. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `update-product`

**Update Product.** Updates properties on an existing product identified by its product ID, such as name, price, description, or tax, then returns the refreshed product. Use to modify a known product in the product library. Idempotent: applying the same property values converges to the same product state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productId` | string | yes |  | Product ID. Map it from an earlier step like Find Product. |
| `objectProperties` | object | no |  | Object Properties. An object whose fields depend on other inputs; the product shows them. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `update-ticket`

**Update Ticket.** Updates properties on an existing support ticket identified by its ticket ID, such as subject, pipeline, stage, or custom fields, then returns the refreshed ticket. Use to modify a known ticket. Idempotent: applying the same property values converges to the same ticket state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ticketId` | string | yes |  | Ticket ID. Map it from an earlier step like Find Ticket. |
| `ticketName` | string | no |  | Ticket Name. Leave empty to keep the current name. |
| `pipelineId` | string | no |  | Ticket Pipeline. Leave empty to keep the current pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `pipelineStageId` | string | no |  | Ticket Stage. Leave empty to keep the current stage. A value the product loads from the provider, such as an id; write the value itself. |
| `objectProperties` | object | no |  | Object Properties. An object whose fields depend on other inputs; the product shows them. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `upload-file`

**Upload File.** Upload a file into a chosen folder in the HubSpot File Manager with a given name and access level. Each call uploads a new file rather than replacing an existing one, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `folderId` | string | yes |  | Folder. A value the product loads from the provider, such as an id; write the value itself. |
| `fileName` | string | yes |  | File Name. |
| `accessLevel` | string | yes |  | Access Level. Indexable files can appear in search engine results. One of `"PUBLIC_INDEXABLE"`, `"PUBLIC_NOT_INDEXABLE"`, `"PRIVATE"`. |
| `file` | file | yes |  | File. Files are not supported; an action that needs one fails. |

Output fields:

- `id`: File ID
- `name`: Name
- `path`: Path
- `parentFolderId`: Parent Folder ID
- `size`: Size (filesize)
- `type`: Type
- `extension`: Extension
- `url`: URL (url)
- `defaultHostingUrl`: Default Hosting URL (url)
- `access`: Access Level
- `isUsableInContent`: Usable In Content (boolean)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)

### `find-associations`

**Find Associations.** Lists all associations from one CRM object to objects of another type (e.g. a company to its contacts or deals), paging through every result. Use to discover what records are linked to a known object given its ID and the from/to object types. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fromObjectId` | string | yes |  | From Object ID. Map it from an earlier Find or Get step. |
| `fromObjectType` | string | yes |  | From Object Type. The object type of that record. A value the product loads from the provider, such as an id; write the value itself. |
| `toObjectType` | string | yes |  | To Object Type. The object type of the linked records to list. A value the product loads from the provider, such as an id; write the value itself. |

Output fields:

- `[].toObjectId`: To Object ID
- `[].associationTypes`: Association Types
- `[].associationTypes[].typeId`: Type ID (number)
- `[].associationTypes[].label`: Label
- `[].associationTypes[].category`: Category

### `find-company`

**Find Company.** Searches companies via the HubSpot CRM search API, matching on one or two property name/value pairs (exact match, combined as AND), and returns matching companies. Use to locate a company by domain, name, or another property before reading or updating it; prefer Get Company when you already have the company ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstSearchPropertyName` | string | yes |  | Search Property. The property to compare, such as the company domain. A value the product loads from the provider, such as an id; write the value itself. |
| `firstSearchPropertyValue` | string | yes |  | Search Value. Only exact matches are returned. |
| `secondSearchPropertyName` | string | no |  | Second Search Property. Optional second condition; records must match both. A value the product loads from the provider, such as an id; write the value itself. |
| `secondSearchPropertyValue` | string | no |  | Second Search Value. Ignored unless a second property is also chosen. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `total`: Total Matches (number)
- `results`: Companies
- `results[].id`: Record ID
- `results[].properties`: Properties (an object whose keys vary)
- `results[].createdAt`: Created At (datetime)
- `results[].updatedAt`: Updated At (datetime)
- `results[].archived`: Archived (boolean)
- `results[].archivedAt`: Archived At (datetime)
- `paging`: Paging
- `paging.next`: Next Page
- `paging.next.after`: After Cursor
- `paging.next.link`: Link (url)

### `find-contact`

**Find Contact.** Search HubSpot contacts by one or two property/value pairs (matched with equality) and return the matching contacts. Read-only and repeatable. Use this to resolve a contact before updating or enrolling it; pick a create action instead when no match should exist. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstSearchPropertyName` | string | yes |  | Search Property. The property to compare, such as the email address. A value the product loads from the provider, such as an id; write the value itself. |
| `firstSearchPropertyValue` | string | yes |  | Search Value. Only exact matches are returned. |
| `secondSearchPropertyName` | string | no |  | Second Search Property. Optional second condition; records must match both. A value the product loads from the provider, such as an id; write the value itself. |
| `secondSearchPropertyValue` | string | no |  | Second Search Value. Ignored unless a second property is also chosen. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `total`: Total Matches (number)
- `results`: Contacts
- `results[].id`: Record ID
- `results[].properties`: Properties (an object whose keys vary)
- `results[].createdAt`: Created At (datetime)
- `results[].updatedAt`: Updated At (datetime)
- `results[].archived`: Archived (boolean)
- `results[].archivedAt`: Archived At (datetime)
- `paging`: Paging
- `paging.next`: Next Page
- `paging.next.after`: After Cursor
- `paging.next.link`: Link (url)

### `find-custom-object`

**Find Custom Object.** Search records of a selected HubSpot custom object type by one or two property/value pairs (matched with equality) and return the matches. Read-only and repeatable. Requires choosing the custom object type; use Create Custom Object to add a new record. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customObjectType` | string | yes |  | Custom Object Type. A value the product loads from the provider, such as an id; write the value itself. |
| `firstSearchPropertyName` | object | yes |  | Search Property. An object whose fields depend on other inputs; the product shows them. |
| `firstSearchPropertyValue` | string | yes |  | Search Value. Only exact matches are returned. |
| `secondSearchPropertyName` | object | no |  | Second Search Property. An object whose fields depend on other inputs; the product shows them. |
| `secondSearchPropertyValue` | string | no |  | Second Search Value. Ignored unless a second property is also chosen. |
| `additionalPropertiesToRetrieve` | object | no |  | Additional Properties to Retrieve. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `total`: Total Matches (number)
- `results`: Records
- `results[].id`: Record ID
- `results[].properties`: Properties (an object whose keys vary)
- `results[].createdAt`: Created At (datetime)
- `results[].updatedAt`: Updated At (datetime)
- `results[].archived`: Archived (boolean)
- `results[].archivedAt`: Archived At (datetime)
- `paging`: Paging
- `paging.next`: Next Page
- `paging.next.after`: After Cursor
- `paging.next.link`: Link (url)

### `find-deal`

**Find Deal.** Search HubSpot deals by one or two property/value pairs (matched with equality) and return the matching deals. Read-only and repeatable. Use this to look up an existing deal before updating or associating it; pick a create action instead when no matching deal should exist. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstSearchPropertyName` | string | yes |  | Search Property. The property to compare, such as the deal name. A value the product loads from the provider, such as an id; write the value itself. |
| `firstSearchPropertyValue` | string | yes |  | Search Value. Only exact matches are returned. |
| `secondSearchPropertyName` | string | no |  | Second Search Property. Optional second condition; records must match both. A value the product loads from the provider, such as an id; write the value itself. |
| `secondSearchPropertyValue` | string | no |  | Second Search Value. Ignored unless a second property is also chosen. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `total`: Total Matches (number)
- `results`: Deals
- `results[].id`: Record ID
- `results[].properties`: Properties (an object whose keys vary)
- `results[].createdAt`: Created At (datetime)
- `results[].updatedAt`: Updated At (datetime)
- `results[].archived`: Archived (boolean)
- `results[].archivedAt`: Archived At (datetime)
- `paging`: Paging
- `paging.next`: Next Page
- `paging.next.after`: After Cursor
- `paging.next.link`: Link (url)

### `find-line-item`

**Find Line Item.** Search HubSpot line items by one or two property/value pairs (matched with equality) and return the matches. Read-only and repeatable. Use this to locate an existing line item before updating it. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstSearchPropertyName` | string | yes |  | Search Property. The property to compare, such as the line item name. A value the product loads from the provider, such as an id; write the value itself. |
| `firstSearchPropertyValue` | string | yes |  | Search Value. Only exact matches are returned. |
| `secondSearchPropertyName` | string | no |  | Second Search Property. Optional second condition; records must match both. A value the product loads from the provider, such as an id; write the value itself. |
| `secondSearchPropertyValue` | string | no |  | Second Search Value. Ignored unless a second property is also chosen. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `total`: Total Matches (number)
- `results`: Line Items
- `results[].id`: Record ID
- `results[].properties`: Properties (an object whose keys vary)
- `results[].createdAt`: Created At (datetime)
- `results[].updatedAt`: Updated At (datetime)
- `results[].archived`: Archived (boolean)
- `results[].archivedAt`: Archived At (datetime)
- `paging`: Paging
- `paging.next`: Next Page
- `paging.next.after`: After Cursor
- `paging.next.link`: Link (url)

### `find-product`

**Find Product.** Search the HubSpot product library by one or two property/value pairs (matched with equality) and return the matching products. Read-only and repeatable. Use Get Product instead when you already have the product ID. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstSearchPropertyName` | string | yes |  | Search Property. The property to compare, such as the SKU. A value the product loads from the provider, such as an id; write the value itself. |
| `firstSearchPropertyValue` | string | yes |  | Search Value. Only exact matches are returned. |
| `secondSearchPropertyName` | string | no |  | Second Search Property. Optional second condition; records must match both. A value the product loads from the provider, such as an id; write the value itself. |
| `secondSearchPropertyValue` | string | no |  | Second Search Value. Ignored unless a second property is also chosen. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `total`: Total Matches (number)
- `results`: Products
- `results[].id`: Record ID
- `results[].properties`: Properties (an object whose keys vary)
- `results[].createdAt`: Created At (datetime)
- `results[].updatedAt`: Updated At (datetime)
- `results[].archived`: Archived (boolean)
- `results[].archivedAt`: Archived At (datetime)
- `paging`: Paging
- `paging.next`: Next Page
- `paging.next.after`: After Cursor
- `paging.next.link`: Link (url)

### `find-ticket`

**Find Ticket.** Searches support tickets via the HubSpot CRM search API, matching on one or two property name/value pairs (exact match, combined as AND), and returns matching tickets. Use to locate a ticket by subject or another property before reading or updating it; prefer Get Ticket when you already have the ticket ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstSearchPropertyName` | string | yes |  | Search Property. The property to compare, such as the subject. A value the product loads from the provider, such as an id; write the value itself. |
| `firstSearchPropertyValue` | string | yes |  | Search Value. Only exact matches are returned. |
| `secondSearchPropertyName` | string | no |  | Second Search Property. Optional second condition; records must match both. A value the product loads from the provider, such as an id; write the value itself. |
| `secondSearchPropertyValue` | string | no |  | Second Search Value. Ignored unless a second property is also chosen. |
| `additionalPropertiesToRetrieve` | array | no |  | Additional Properties to Retrieve. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `total`: Total Matches (number)
- `results`: Tickets
- `results[].id`: Record ID
- `results[].properties`: Properties (an object whose keys vary)
- `results[].createdAt`: Created At (datetime)
- `results[].updatedAt`: Updated At (datetime)
- `results[].archived`: Archived (boolean)
- `results[].archivedAt`: Archived At (datetime)
- `paging`: Paging
- `paging.next`: Next Page
- `paging.next.after`: After Cursor
- `paging.next.link`: Link (url)

### `get-owner-by-email`

**Get Owner by Email.** Look up a single HubSpot CRM owner (user) by their email address; use to resolve an email into an owner identity before assigning records to that owner. Read-only and repeatable. Fails if no owner matches the given email. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Owner Email. The email of the HubSpot user who owns records. |

Output fields:

- `results`: Owners
- `results[].id`: Owner ID
- `results[].email`: Email (email)
- `results[].firstName`: First Name
- `results[].lastName`: Last Name
- `results[].type`: Type
- `results[].userId`: User ID
- `results[].userIdIncludingInactive`: User ID (Including Inactive)
- `results[].createdAt`: Created At (datetime)
- `results[].updatedAt`: Updated At (datetime)
- `results[].archived`: Archived (boolean)

### `list_pipelines`

**List Pipelines.** Lists the pipelines defined for deals or tickets, returning each pipeline id and label together with its stages. Use it to turn a pipeline name such as "Sales Pipeline" into the pipeline id that creating or updating a deal or ticket requires; the stages come back inline, so a separate lookup is usually unnecessary. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes | `"deals"` | Object Type. Which kind of pipeline to list. One of `"deals"`, `"tickets"`. |

Output fields:

- `pipelines`: Pipelines
- `pipelines[].id`: Pipeline ID
- `pipelines[].label`: Label
- `pipelines[].displayOrder`: Display Order (number)
- `pipelines[].archived`: Archived (boolean)
- `pipelines[].stages`: Stages
- `pipelines[].stages[].id`: Stage ID
- `pipelines[].stages[].label`: Label
- `pipelines[].stages[].displayOrder`: Display Order (number)
- `pipelines[].stages[].archived`: Archived (boolean)
- `pipelines[].stages[].metadata`: Metadata (an object whose keys vary)
- `pipelines[].stages[].createdAt`: Created At (datetime)
- `pipelines[].stages[].updatedAt`: Updated At (datetime)
- `pipelines[].createdAt`: Created At (datetime)
- `pipelines[].updatedAt`: Updated At (datetime)
- `count`: Count (number)

### `list_pipeline_stages`

**List Pipeline Stages.** Lists the stages of a single pipeline, returning each stage id and label in display order. Use it to turn a stage name such as "Closed Won" into the stage id that creating or moving a deal requires. List Pipelines already returns these stages inline, so prefer this only when the pipeline id is already known and refetching every pipeline would be wasteful. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes | `"deals"` | Object Type. Which kind of pipeline the stages belong to. One of `"deals"`, `"tickets"`. |
| `pipelineId` | string | yes |  | Pipeline ID. The pipeline id, as returned by List Pipelines. |

Output fields:

- `stages`: Stages
- `stages[].id`: Stage ID
- `stages[].label`: Label
- `stages[].displayOrder`: Display Order (number)
- `stages[].archived`: Archived (boolean)
- `stages[].metadata`: Metadata (an object whose keys vary)
- `stages[].createdAt`: Created At (datetime)
- `stages[].updatedAt`: Updated At (datetime)
- `count`: Count (number)

### `list_static_lists`

**List Lists.** Lists the contact lists in the account, returning each list id and name. Use it to turn a list name such as "Newsletter" into the list id that Add Contact To List and Remove Contact From List require, which is otherwise impossible to discover. An optional query filters by name. Note that each entry identifies the list as listId rather than id. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | no |  | Name Contains. Filter lists whose name contains this text. Omit to list all. |
| `count` | number | no |  | Limit. Maximum number of lists to return (HubSpot defaults to 20). |
| `offset` | number | no |  | Offset. Offset returned by a previous call; omit for the first page. |

Output fields:

- `lists`: Lists
- `lists[].listId`: List ID
- `lists[].name`: Name
- `lists[].processingType`: Processing Type
- `lists[].processingStatus`: Processing Status
- `lists[].objectTypeId`: Object Type ID
- `lists[].listVersion`: List Version (number)
- `lists[].createdAt`: Created At (datetime)
- `lists[].updatedAt`: Updated At (datetime)
- `total`: Total (number)
- `offset`: Next Offset (number)
- `hasMore`: Has More (boolean)

### `list_association_types`

**List Association Types.** Lists the ways two CRM object types can be linked, returning each numeric typeId with its label and its category of HUBSPOT_DEFINED or USER_DEFINED. Use it before Create Associations or Remove Associations, which need the type id: a label such as "Billing Contact" corresponds to a number that cannot be guessed. Both the typeId and the category are needed to write an association. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fromObjectType` | string | yes |  | From Object Type. The object type the association starts at, such as contact, company, deal or ticket. |
| `toObjectType` | string | yes |  | To Object Type. The object type the association points at, such as company or deal. |

Output fields:

- `associationTypes`: Association Types
- `associationTypes[].typeId`: Type ID (number)
- `associationTypes[].label`: Label
- `associationTypes[].category`: Category
- `associationTypes[].fromObjectTypeId`: From Object Type ID
- `associationTypes[].toObjectTypeId`: To Object Type ID
- `count`: Count (number)

### `list_owners`

**List Owners.** Lists the CRM owners (users records can be assigned to), returning each owner id, email and name. Use it to resolve an owner id when only a person name is known, or to enumerate who exists; use Get Owner by Email when the email is already known, which is the cheaper lookup. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. Return only the owner with this email. Omit to list all owners. |
| `limit` | number | no |  | Limit. Maximum number of owners to return per page. |
| `after` | string | no |  | After. Paging cursor returned by a previous call; omit for the first page. |

Output fields:

- `owners`: Owners
- `owners[].id`: Owner ID
- `owners[].email`: Email
- `owners[].firstName`: First Name
- `owners[].lastName`: Last Name
- `owners[].userId`: User ID (number)
- `owners[].type`: Type
- `owners[].archived`: Archived (boolean)
- `owners[].createdAt`: Created At (datetime)
- `owners[].updatedAt`: Updated At (datetime)
- `count`: Count (number)
- `paging`: Paging
- `paging.next`: Next Page
- `paging.next.after`: After Cursor
- `paging.next.link`: Link (url)

### `list_object_properties`

**List Object Properties.** Lists the properties defined on a CRM object type, returning each internal name with its label, type and, for enumerations, its allowed options. Use it to discover custom property names before writing them, since a write needs the internal name rather than the label shown in the UI. Standard names such as email or firstname are already well known, so this matters most for custom fields; the contact object alone has hundreds of properties, so use Custom Only to cut the noise. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes |  | Object Type. The object type, such as contacts, companies, deals, tickets, notes or tasks. |
| `customOnly` | boolean | no | `false` | Custom Only. Return only properties defined by this account, hiding HubSpot built-ins. |

Output fields:

- `properties`: Properties
- `properties[].name`: Internal Name
- `properties[].label`: Label
- `properties[].type`: Type
- `properties[].fieldType`: Field Type
- `properties[].groupName`: Group
- `properties[].description`: Description
- `properties[].hasUniqueValue`: Unique (boolean)
- `properties[].hidden`: Hidden (boolean)
- `properties[].calculated`: Calculated (boolean)
- `properties[].options`: Options
- `properties[].options[].label`: Label
- `properties[].options[].value`: Value
- `properties[].options[].displayOrder`: Display Order (number)
- `properties[].options[].hidden`: Hidden (boolean)
- `count`: Count (number)

### `create_note`

**Create Note.** Logs a note on the timeline of a contact, company, deal or ticket. Use it to record what happened, such as the summary of a call or an email thread, against the record it concerns. The note body accepts HTML, and the record it attaches to is given by its id and object type. When no timestamp is supplied the note is dated now; supply an ISO 8601 timestamp to backdate it. Each call creates another note, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `noteBody` | string | yes |  | Note Body. The note text. Basic HTML such as <b> and <br> is preserved. |
| `associatedObjectType` | string | yes | `"contact"` | Attach To Object Type. The kind of record the note belongs to. One of `"contact"`, `"company"`, `"deal"`, `"ticket"`. |
| `associatedObjectId` | string | yes |  | Attach To Object ID. The id of the record, as returned by the matching Find or Get action. |
| `timestamp` | string | no |  | Timestamp. ISO 8601 timestamp for the note, such as 2026-09-14T12:00:00Z. Defaults to now. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `create_task`

**Create Task.** Creates a task attached to a contact, company, deal or ticket, with a subject, an optional body, a due date and an owner. Use it to schedule follow-up work; use Create Note to record something that already happened. The due date is an ISO 8601 timestamp and defaults to now if omitted, and the owner id comes from List Owners. Each call creates another task, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subject` | string | yes |  | Subject. The task title shown in HubSpot. |
| `associatedObjectType` | string | yes | `"contact"` | Attach To Object Type. The kind of record the task belongs to. One of `"contact"`, `"company"`, `"deal"`, `"ticket"`. |
| `associatedObjectId` | string | yes |  | Attach To Object ID. The id of the record, as returned by the matching Find or Get action. |
| `dueDate` | string | no |  | Due Date. ISO 8601 timestamp for when the task is due, such as 2026-09-20T09:00:00Z. Defaults to now. |
| `body` | string | no |  | Body. Optional detail shown on the task. |
| `status` | string | no | `"NOT_STARTED"` | Status. One of `"NOT_STARTED"`, `"IN_PROGRESS"`, `"WAITING"`, `"COMPLETED"`, `"DEFERRED"`. |
| `priority` | string | no | `"MEDIUM"` | Priority. One of `"LOW"`, `"MEDIUM"`, `"HIGH"`. |
| `ownerId` | string | no |  | Owner ID. The owner the task is assigned to, as returned by List Owners. |

Output fields:

- `id`: Record ID
- `properties`: Properties (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)
- `archivedAt`: Archived At (datetime)

### `search_objects`

**Search Objects.** Searches any CRM object type using HubSpot's full filter syntax, which the Find actions cannot express. Filter Groups are OR-ed together and the filters inside one group are AND-ed, so "deals over 10000 OR closing this month" is two groups while "over 10000 AND closing this month" is one group with two filters. HubSpot allows at most 5 groups, 6 filters per group and 18 filters overall. Each operator takes a specific key and sending the wrong one is rejected: EQ, NEQ, LT, LTE, GT, GTE and CONTAINS_TOKEN take a single "value"; IN and NOT_IN take an array called "values"; BETWEEN takes "value" as the lower bound together with "highValue" as the upper bound; HAS_PROPERTY and NOT_HAS_PROPERTY take neither. EQ alone is what the Find actions already do, so prefer them for a simple lookup. Results are paged with a cursor returned as paging.next.after and capped at 200 per page, dates are ISO 8601 or epoch milliseconds, and only the properties asked for come back. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes |  | Object Type. The object type to search, such as contacts, companies, deals, tickets, notes or tasks. |
| `filterGroups` | JSON | no |  | Filter Groups. HubSpot filterGroups array. Groups are OR-ed, filters within a group are AND-ed. Max 5 groups, 6 filters per group, 18 filters overall. Each operator takes a different key: EQ, NEQ, LT, LTE, GT, GTE and CONTAINS_TOKEN use "value", for example {"propertyName":"amount","operator":"GT","value":"10000"… |
| `query` | string | no |  | Text Query. Free-text search across the object default searchable properties. |
| `properties` | array | no |  | Properties To Return. Internal property names to include. Omit for HubSpot defaults; resolve names with List Object Properties. |
| `sortPropertyName` | string | no |  | Sort By Property. Internal property name to sort on, such as createdate. |
| `sortDirection` | string | no | `"DESCENDING"` | Sort Direction. One of `"DESCENDING"`, `"ASCENDING"`. |
| `limit` | number | no |  | Limit. Results per page, up to 200. HubSpot defaults to 10. |
| `after` | string | no |  | After. Paging cursor from a previous call (paging.next.after). Omit for the first page. |

Output fields:

- `total`: Total Matches (number)
- `results`: Results
- `results[].id`: Record ID
- `results[].properties`: Properties (an object whose keys vary)
- `results[].createdAt`: Created At (datetime)
- `results[].updatedAt`: Updated At (datetime)
- `results[].archived`: Archived (boolean)
- `results[].archivedAt`: Archived At (datetime)
- `paging`: Paging
- `paging.next`: Next Page
- `paging.next.after`: After Cursor
- `paging.next.link`: Link (url)

### `get-owner-by-id`

**Get Owner by ID.** Fetches a single HubSpot owner (user) by their numeric owner ID, returning their identity details such as name and email. Use to resolve an owner ID into a person before assigning records or displaying who owns a deal, contact, or ticket. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ownerId` | string | yes |  | Owner ID. Find it in a record's hubspot_owner_id property. |

Output fields:

- `id`: Owner ID
- `email`: Email (email)
- `firstName`: First Name
- `lastName`: Last Name
- `type`: Type
- `userId`: User ID
- `userIdIncludingInactive`: User ID (Including Inactive)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)

### `get-pipeline-stage-details`

**Get Pipeline Stage Details.** Retrieves the configuration of a single pipeline stage (label, order, metadata) for a ticket or deal pipeline, given the object type, pipeline ID, and stage ID. Use to resolve or validate a stage ID before setting a deal or ticket stage. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `objectType` | string | yes |  | Object Type. One of `"ticket"`, `"deal"`. |
| `pipelineId` | string | yes |  | Pipeline ID. The pipeline's ID, found in a deal or ticket's pipeline property. |
| `stageId` | string | yes |  | Stage ID. The stage's ID, found in a deal or ticket's stage property. |

Output fields:

- `id`: Stage ID
- `label`: Label
- `displayOrder`: Display Order (number)
- `writePermissions`: Write Permissions
- `metadata`: Metadata (an object whose keys vary)
- `createdAt`: Created At (datetime)
- `updatedAt`: Updated At (datetime)
- `archived`: Archived (boolean)

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

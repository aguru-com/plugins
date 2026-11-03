# Mautic

Open-source marketing automation software

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-mautic'
  version: '0.7.0'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Follow these steps:
>
> 1. **Enter the Base URL:** Open your Mautic instance and copy the URL from the address bar. If your dashboard link is "https://mautic.ddev.site/s/dashboard", set your base URL as "https://mautic.ddev.site/".
>
> 2. **Enable Basic Authentication:** Log in to Mautic, go to **Settings** > **Configuration** > **API Settings**, and ensure that Basic Authentication is enabled.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_url` | string | yes |  | Base URL. |
| `username` | string | yes |  | Username. |
| `password` | string | yes |  | Password. |

## Actions

### `create_mautic_contact`

**Create Contact.** Create a new contact (lead) in Mautic from the provided field values (name, email, phone, custom fields, etc.). Use when adding a person to Mautic; to modify an existing contact use Update Contact instead, and to avoid duplicates check first with Search Contact. Not idempotent: each call inserts a new contact, so repeating it produces duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fields` | object | yes |  | All Fields. List of all possible fields present. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `status`: Status (number)
- `body`: Body
- `body.contact`: Contact
- `body.contact.isPublished`: Published (boolean)
- `body.contact.dateAdded`: Date Added (datetime)
- `body.contact.dateModified`: Date Modified
- `body.contact.id`: ID (number)
- `body.contact.points`: Points (number)
- `body.contact.color`: Color
- `body.contact.fields`: Fields
- `body.contact.fields.all`: All
- `body.contact.fields.all.id`: ID
- `body.contact.fields.all.title`: Title
- `body.contact.fields.all.firstname`: First Name
- `body.contact.fields.all.lastname`: Last Name
- `body.contact.fields.all.company`: Company
- `body.contact.fields.all.position`: Position
- `body.contact.fields.all.email`: Email (email)
- `body.contact.fields.all.mobile`: Mobile
- `body.contact.fields.all.phone`: Phone
- `body.contact.fields.all.points`: Points (number)
- `body.contact.fields.all.fax`: Fax
- `body.contact.fields.all.address1`: Address 1
- `body.contact.fields.all.address2`: Address 2
- `body.contact.fields.all.city`: City
- `body.contact.fields.all.state`: State
- `body.contact.fields.all.zipcode`: Zip Code
- `body.contact.fields.all.country`: Country
- `body.contact.fields.all.preferred_locale`: Preferred Locale
- `body.contact.fields.all.timezone`: Timezone
- `body.contact.fields.all.last_active`: Last Active
- `body.contact.fields.all.attribution_date`: Attribution Date
- `body.contact.fields.all.attribution`: Attribution
- `body.contact.fields.all.website`: Website
- `body.contact.fields.all.facebook`: Facebook
- `body.contact.fields.all.foursquare`: Foursquare
- `body.contact.fields.all.instagram`: Instagram
- `body.contact.fields.all.linkedin`: LinkedIn
- `body.contact.fields.all.skype`: Skype
- `body.contact.fields.all.twitter`: Twitter
- `body.contact.lastActive`: Last Active
- `body.contact.owner`: Owner
- `body.contact.ipAddresses`: IP Addresses
- `body.contact.tags`: Tags
- `body.contact.utmtags`: UTM Tags
- `body.contact.stage`: Stage
- `body.contact.dateIdentified`: Date Identified (datetime)
- `body.contact.preferredProfileImage`: Preferred Profile Image
- `body.contact.doNotContact`: Do Not Contact
- `body.contact.frequencyRules`: Frequency Rules

### `search_mautic_contact`

**Search Contact.** Look up a contact in Mautic by matching the supplied field values (each provided field becomes an exact-equality filter), returning the first matching contact. Use to find a contact or resolve its id before updating, or to verify whether someone already exists before creating one. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fields` | object | yes |  | All Fields. List of all possible fields present. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `isPublished`: Published (boolean)
- `dateAdded`: Date Added (datetime)
- `dateModified`: Date Modified
- `id`: ID (number)
- `points`: Points (number)
- `color`: Color
- `fields`: Fields
- `fields.all`: All
- `fields.all.id`: ID
- `fields.all.points`: Points (number)
- `fields.all.last_active`: Last Active
- `fields.all.title`: Title
- `fields.all.firstname`: First Name
- `fields.all.lastname`: Last Name
- `fields.all.company`: Company
- `fields.all.position`: Position
- `fields.all.email`: Email (email)
- `fields.all.phone`: Phone
- `fields.all.mobile`: Mobile
- `fields.all.address1`: Address 1
- `fields.all.address2`: Address 2
- `fields.all.city`: City
- `fields.all.state`: State
- `fields.all.zipcode`: Zip Code
- `fields.all.timezone`: Timezone
- `fields.all.country`: Country
- `fields.all.fax`: Fax
- `fields.all.preferred_locale`: Preferred Locale
- `fields.all.attribution_date`: Attribution Date
- `fields.all.attribution`: Attribution
- `fields.all.website`: Website
- `fields.all.facebook`: Facebook
- `fields.all.foursquare`: Foursquare
- `fields.all.instagram`: Instagram
- `fields.all.linkedin`: LinkedIn
- `fields.all.skype`: Skype
- `fields.all.twitter`: Twitter
- `lastActive`: Last Active
- `owner`: Owner
- `ipAddresses`: IP Addresses
- `tags`: Tags
- `utmtags`: UTM Tags
- `stage`: Stage
- `dateIdentified`: Date Identified (datetime)
- `preferredProfileImage`: Preferred Profile Image
- `doNotContact`: Do Not Contact
- `frequencyRules`: Frequency Rules

### `update_mautic_contact`

**Update Contact With Contact Id.** Update an existing Mautic contact, identified by its numeric contact id, with the provided field values. Use when you already know the contact id (resolve it first with Search Contact if you only have an email or name). Idempotent: applying the same field values to the same id repeatedly leaves the contact in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Id of the entity. |
| `fields` | object | yes |  | All Fields. List of all possible fields present. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `status`: Status (number)
- `body`: Body
- `body.contact`: Contact
- `body.contact.isPublished`: Published (boolean)
- `body.contact.dateAdded`: Date Added (datetime)
- `body.contact.dateModified`: Date Modified (datetime)
- `body.contact.id`: ID (number)
- `body.contact.points`: Points (number)
- `body.contact.color`: Color
- `body.contact.fields`: Fields
- `body.contact.fields.all`: All
- `body.contact.fields.all.id`: ID
- `body.contact.fields.all.title`: Title
- `body.contact.fields.all.firstname`: First Name
- `body.contact.fields.all.lastname`: Last Name
- `body.contact.fields.all.company`: Company
- `body.contact.fields.all.position`: Position
- `body.contact.fields.all.email`: Email (email)
- `body.contact.fields.all.mobile`: Mobile
- `body.contact.fields.all.phone`: Phone
- `body.contact.fields.all.points`: Points (number)
- `body.contact.fields.all.fax`: Fax
- `body.contact.fields.all.address1`: Address 1
- `body.contact.fields.all.address2`: Address 2
- `body.contact.fields.all.city`: City
- `body.contact.fields.all.state`: State
- `body.contact.fields.all.zipcode`: Zip Code
- `body.contact.fields.all.country`: Country
- `body.contact.fields.all.preferred_locale`: Preferred Locale
- `body.contact.fields.all.timezone`: Timezone
- `body.contact.fields.all.last_active`: Last Active
- `body.contact.fields.all.attribution_date`: Attribution Date
- `body.contact.fields.all.attribution`: Attribution
- `body.contact.fields.all.website`: Website
- `body.contact.fields.all.facebook`: Facebook
- `body.contact.fields.all.foursquare`: Foursquare
- `body.contact.fields.all.instagram`: Instagram
- `body.contact.fields.all.linkedin`: LinkedIn
- `body.contact.fields.all.skype`: Skype
- `body.contact.fields.all.twitter`: Twitter
- `body.contact.lastActive`: Last Active
- `body.contact.owner`: Owner
- `body.contact.ipAddresses`: IP Addresses
- `body.contact.tags`: Tags
- `body.contact.utmtags`: UTM Tags
- `body.contact.stage`: Stage
- `body.contact.dateIdentified`: Date Identified (datetime)
- `body.contact.preferredProfileImage`: Preferred Profile Image
- `body.contact.doNotContact`: Do Not Contact
- `body.contact.frequencyRules`: Frequency Rules

### `create_mautic_company`

**Create Company.** Create a new company in Mautic from the provided field values (company name, address, custom fields, etc.). Use when adding an organization to Mautic; to modify an existing company use Update Company, and check Search Company first to avoid duplicates. Not idempotent: each call inserts a new company record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fields` | object | yes |  | All Fields. List of all possible fields present. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `status`: Status (number)
- `body`: Body
- `body.company`: Company
- `body.company.id`: ID (number)
- `body.company.score`: Score (number)
- `body.company.fields`: Fields
- `body.company.fields.all`: All
- `body.company.fields.all.id`: ID (number)
- `body.company.fields.all.companyaddress1`: Company Address 1
- `body.company.fields.all.companyaddress2`: Company Address 2
- `body.company.fields.all.companyemail`: Company Email
- `body.company.fields.all.companyphone`: Company Phone
- `body.company.fields.all.companycity`: Company City
- `body.company.fields.all.companystate`: Company State
- `body.company.fields.all.companyzipcode`: Company Zip Code
- `body.company.fields.all.companycountry`: Company Country
- `body.company.fields.all.companyname`: Company Name
- `body.company.fields.all.companywebsite`: Company Website
- `body.company.fields.all.companynumber_of_employees`: Company Number of Employees
- `body.company.fields.all.companyfax`: Company Fax
- `body.company.fields.all.companyannual_revenue`: Company Annual Revenue
- `body.company.fields.all.companyindustry`: Company Industry
- `body.company.fields.all.companydescription`: Company Description

### `search_mautic_company`

**Search Company.** Look up a company in Mautic by matching the supplied field values (combined into a search query), returning the first matching company. Use to find a company or resolve its id before updating, or to verify whether an organization already exists before creating one. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fields` | object | yes |  | All Fields. List of all possible fields present. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `id`: ID (number)
- `score`: Score (number)
- `fields`: Fields
- `fields.other`: Other
- `fields.all`: All
- `fields.all.id`: ID (number)
- `fields.all.companyemail`: Company Email
- `fields.all.companyaddress1`: Company Address 1
- `fields.all.companyaddress2`: Company Address 2
- `fields.all.companyphone`: Company Phone
- `fields.all.companycity`: Company City
- `fields.all.companystate`: Company State
- `fields.all.companyzipcode`: Company Zip Code
- `fields.all.companycountry`: Company Country
- `fields.all.companyname`: Company Name
- `fields.all.companywebsite`: Company Website
- `fields.all.companyindustry`: Company Industry
- `fields.all.companydescription`: Company Description
- `fields.all.companynumber_of_employees`: Company Number of Employees
- `fields.all.companyfax`: Company Fax
- `fields.all.companyannual_revenue`: Company Annual Revenue

### `update_mautic_company`

**Update Company With Contact Id.** Update an existing Mautic company, identified by its numeric company id, with the provided field values (empty fields are dropped so they are left unchanged). Use when you already know the company id (resolve it first with Search Company if you only have a name). Idempotent: applying the same field values to the same id repeatedly leaves the company in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Id of the entity. |
| `fields` | object | yes |  | All Fields. List of all possible fields present. An object whose fields depend on other inputs; the product shows them. |

Output fields:

- `status`: Status (number)
- `body`: Body
- `body.company`: Company
- `body.company.id`: ID (number)
- `body.company.score`: Score (number)
- `body.company.fields`: Fields
- `body.company.fields.other`: Other
- `body.company.fields.all`: All
- `body.company.fields.all.id`: ID (number)
- `body.company.fields.all.companyaddress1`: Company Address 1
- `body.company.fields.all.companyaddress2`: Company Address 2
- `body.company.fields.all.companyemail`: Company Email
- `body.company.fields.all.companyphone`: Company Phone
- `body.company.fields.all.companycity`: Company City
- `body.company.fields.all.companystate`: Company State
- `body.company.fields.all.companyzipcode`: Company Zip Code
- `body.company.fields.all.companycountry`: Company Country
- `body.company.fields.all.companyname`: Company Name
- `body.company.fields.all.companywebsite`: Company Website
- `body.company.fields.all.companynumber_of_employees`: Company Number of Employees
- `body.company.fields.all.companyfax`: Company Fax
- `body.company.fields.all.companyannual_revenue`: Company Annual Revenue
- `body.company.fields.all.companyindustry`: Company Industry
- `body.company.fields.all.companydescription`: Company Description

### `mautic_list_contacts`

**List Contacts.** Lists contacts with paging, sorting and filters. Use Search for free text or commands like "email:jane@example.com", or Where for exact column conditions such as email eq a value. Returns the matching contacts and the total count; page with Start and Limit. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total
- `contacts`: Contacts
- `contacts[].isPublished`: Published (boolean)
- `contacts[].dateAdded`: Date Added (datetime)
- `contacts[].dateModified`: Date Modified
- `contacts[].id`: ID (number)
- `contacts[].points`: Points (number)
- `contacts[].color`: Color
- `contacts[].fields`: Fields
- `contacts[].fields.all`: All
- `contacts[].fields.all.id`: ID
- `contacts[].fields.all.points`: Points (number)
- `contacts[].fields.all.last_active`: Last Active
- `contacts[].fields.all.title`: Title
- `contacts[].fields.all.firstname`: First Name
- `contacts[].fields.all.lastname`: Last Name
- `contacts[].fields.all.company`: Company
- `contacts[].fields.all.position`: Position
- `contacts[].fields.all.email`: Email (email)
- `contacts[].fields.all.phone`: Phone
- `contacts[].fields.all.mobile`: Mobile
- `contacts[].fields.all.address1`: Address 1
- `contacts[].fields.all.address2`: Address 2
- `contacts[].fields.all.city`: City
- `contacts[].fields.all.state`: State
- `contacts[].fields.all.zipcode`: Zip Code
- `contacts[].fields.all.timezone`: Timezone
- `contacts[].fields.all.country`: Country
- `contacts[].fields.all.fax`: Fax
- `contacts[].fields.all.preferred_locale`: Preferred Locale
- `contacts[].fields.all.attribution_date`: Attribution Date
- `contacts[].fields.all.attribution`: Attribution
- `contacts[].fields.all.website`: Website
- `contacts[].fields.all.facebook`: Facebook
- `contacts[].fields.all.foursquare`: Foursquare
- `contacts[].fields.all.instagram`: Instagram
- `contacts[].fields.all.linkedin`: LinkedIn
- `contacts[].fields.all.skype`: Skype
- `contacts[].fields.all.twitter`: Twitter
- `contacts[].lastActive`: Last Active
- `contacts[].owner`: Owner
- `contacts[].owner.id`: ID (number)
- `contacts[].owner.username`: Username
- `contacts[].owner.firstName`: First Name
- `contacts[].owner.lastName`: Last Name
- `contacts[].ipAddresses`: IP Addresses
- `contacts[].tags`: Tags
- `contacts[].tags[].id`: ID (number)
- `contacts[].tags[].tag`: Tag
- `contacts[].tags[].description`: Description
- `contacts[].utmtags`: UTM Tags
- `contacts[].stage`: Stage
- `contacts[].dateIdentified`: Date Identified (datetime)
- `contacts[].preferredProfileImage`: Preferred Profile Image
- `contacts[].doNotContact`: Do Not Contact
- `contacts[].frequencyRules`: Frequency Rules

### `mautic_get_contact`

**Get Contact.** Gets a single contact by its numeric id, with all field values, tags, UTM tags, points, owner and do-not-contact entries. Get the id from List Contacts. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact Id. Numeric contact id, from List Contacts or Create Contact. |

Output fields:

- `contact`: Contact
- `contact.isPublished`: Published (boolean)
- `contact.dateAdded`: Date Added (datetime)
- `contact.dateModified`: Date Modified (datetime)
- `contact.id`: ID (number)
- `contact.points`: Points (number)
- `contact.color`: Color
- `contact.fields`: Fields
- `contact.fields.all`: All
- `contact.fields.all.id`: ID
- `contact.fields.all.title`: Title
- `contact.fields.all.firstname`: First Name
- `contact.fields.all.lastname`: Last Name
- `contact.fields.all.company`: Company
- `contact.fields.all.position`: Position
- `contact.fields.all.email`: Email (email)
- `contact.fields.all.mobile`: Mobile
- `contact.fields.all.phone`: Phone
- `contact.fields.all.points`: Points (number)
- `contact.fields.all.fax`: Fax
- `contact.fields.all.address1`: Address 1
- `contact.fields.all.address2`: Address 2
- `contact.fields.all.city`: City
- `contact.fields.all.state`: State
- `contact.fields.all.zipcode`: Zip Code
- `contact.fields.all.country`: Country
- `contact.fields.all.preferred_locale`: Preferred Locale
- `contact.fields.all.timezone`: Timezone
- `contact.fields.all.last_active`: Last Active
- `contact.fields.all.attribution_date`: Attribution Date
- `contact.fields.all.attribution`: Attribution
- `contact.fields.all.website`: Website
- `contact.fields.all.facebook`: Facebook
- `contact.fields.all.foursquare`: Foursquare
- `contact.fields.all.instagram`: Instagram
- `contact.fields.all.linkedin`: LinkedIn
- `contact.fields.all.skype`: Skype
- `contact.fields.all.twitter`: Twitter
- `contact.lastActive`: Last Active
- `contact.owner`: Owner
- `contact.owner.id`: ID (number)
- `contact.owner.username`: Username
- `contact.owner.firstName`: First Name
- `contact.owner.lastName`: Last Name
- `contact.ipAddresses`: IP Addresses
- `contact.tags`: Tags
- `contact.tags[].id`: ID (number)
- `contact.tags[].tag`: Tag
- `contact.tags[].description`: Description
- `contact.utmtags`: UTM Tags
- `contact.stage`: Stage
- `contact.dateIdentified`: Date Identified (datetime)
- `contact.preferredProfileImage`: Preferred Profile Image
- `contact.doNotContact`: Do Not Contact
- `contact.frequencyRules`: Frequency Rules

### `mautic_create_contact`

**Create Contact.** Creates a contact from the given field values. Mautic merges into an existing contact when a unique identifier field (email by default) matches, so the returned contact may be an existing one with updated fields. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | no |  | Email. |
| `firstname` | string | no |  | First Name. |
| `lastname` | string | no |  | Last Name. |
| `owner` | number | no |  | Owner Id. Id of the Mautic user who owns the contact, from List Contact Owners. |
| `tags` | array | no |  | Tags. Tag names to add. Prefix a name with "-" to remove that tag. |
| `additionalFields` | JSON | no |  | Additional Fields. Other contact fields keyed by field alias, e.g. {"phone": "+15550100", "city": "Berlin"}. Aliases come from List Contact Fields. The dedicated props above win over the same keys here. |

Output fields:

- `contact`: Contact
- `contact.isPublished`: Published (boolean)
- `contact.dateAdded`: Date Added (datetime)
- `contact.dateModified`: Date Modified
- `contact.id`: ID (number)
- `contact.points`: Points (number)
- `contact.color`: Color
- `contact.fields`: Fields
- `contact.fields.all`: All
- `contact.fields.all.id`: ID
- `contact.fields.all.title`: Title
- `contact.fields.all.firstname`: First Name
- `contact.fields.all.lastname`: Last Name
- `contact.fields.all.company`: Company
- `contact.fields.all.position`: Position
- `contact.fields.all.email`: Email (email)
- `contact.fields.all.mobile`: Mobile
- `contact.fields.all.phone`: Phone
- `contact.fields.all.points`: Points (number)
- `contact.fields.all.fax`: Fax
- `contact.fields.all.address1`: Address 1
- `contact.fields.all.address2`: Address 2
- `contact.fields.all.city`: City
- `contact.fields.all.state`: State
- `contact.fields.all.zipcode`: Zip Code
- `contact.fields.all.country`: Country
- `contact.fields.all.preferred_locale`: Preferred Locale
- `contact.fields.all.timezone`: Timezone
- `contact.fields.all.last_active`: Last Active
- `contact.fields.all.attribution_date`: Attribution Date
- `contact.fields.all.attribution`: Attribution
- `contact.fields.all.website`: Website
- `contact.fields.all.facebook`: Facebook
- `contact.fields.all.foursquare`: Foursquare
- `contact.fields.all.instagram`: Instagram
- `contact.fields.all.linkedin`: LinkedIn
- `contact.fields.all.skype`: Skype
- `contact.fields.all.twitter`: Twitter
- `contact.lastActive`: Last Active
- `contact.owner`: Owner
- `contact.owner.id`: ID (number)
- `contact.owner.username`: Username
- `contact.owner.firstName`: First Name
- `contact.owner.lastName`: Last Name
- `contact.ipAddresses`: IP Addresses
- `contact.tags`: Tags
- `contact.tags[].id`: ID (number)
- `contact.tags[].tag`: Tag
- `contact.tags[].description`: Description
- `contact.utmtags`: UTM Tags
- `contact.stage`: Stage
- `contact.dateIdentified`: Date Identified (datetime)
- `contact.preferredProfileImage`: Preferred Profile Image
- `contact.doNotContact`: Do Not Contact
- `contact.frequencyRules`: Frequency Rules

### `mautic_update_contact`

**Update Contact.** Updates only the fields given on an existing contact; fields left empty are not changed. Fails if the contact id does not exist. Tags are added, and a tag prefixed with "-" is removed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact Id. Numeric contact id, from List Contacts or Create Contact. |
| `email` | string | no |  | Email. |
| `firstname` | string | no |  | First Name. |
| `lastname` | string | no |  | Last Name. |
| `owner` | number | no |  | Owner Id. Id of the Mautic user who owns the contact, from List Contact Owners. |
| `tags` | array | no |  | Tags. Tag names to add. Prefix a name with "-" to remove that tag. |
| `additionalFields` | JSON | no |  | Additional Fields. Other contact fields keyed by field alias, e.g. {"phone": "+15550100", "city": "Berlin"}. Aliases come from List Contact Fields. The dedicated props above win over the same keys here. |

Output fields:

- `contact`: Contact
- `contact.isPublished`: Published (boolean)
- `contact.dateAdded`: Date Added (datetime)
- `contact.dateModified`: Date Modified (datetime)
- `contact.id`: ID (number)
- `contact.points`: Points (number)
- `contact.color`: Color
- `contact.fields`: Fields
- `contact.fields.all`: All
- `contact.fields.all.id`: ID
- `contact.fields.all.title`: Title
- `contact.fields.all.firstname`: First Name
- `contact.fields.all.lastname`: Last Name
- `contact.fields.all.company`: Company
- `contact.fields.all.position`: Position
- `contact.fields.all.email`: Email (email)
- `contact.fields.all.mobile`: Mobile
- `contact.fields.all.phone`: Phone
- `contact.fields.all.points`: Points (number)
- `contact.fields.all.fax`: Fax
- `contact.fields.all.address1`: Address 1
- `contact.fields.all.address2`: Address 2
- `contact.fields.all.city`: City
- `contact.fields.all.state`: State
- `contact.fields.all.zipcode`: Zip Code
- `contact.fields.all.country`: Country
- `contact.fields.all.preferred_locale`: Preferred Locale
- `contact.fields.all.timezone`: Timezone
- `contact.fields.all.last_active`: Last Active
- `contact.fields.all.attribution_date`: Attribution Date
- `contact.fields.all.attribution`: Attribution
- `contact.fields.all.website`: Website
- `contact.fields.all.facebook`: Facebook
- `contact.fields.all.foursquare`: Foursquare
- `contact.fields.all.instagram`: Instagram
- `contact.fields.all.linkedin`: LinkedIn
- `contact.fields.all.skype`: Skype
- `contact.fields.all.twitter`: Twitter
- `contact.lastActive`: Last Active
- `contact.owner`: Owner
- `contact.owner.id`: ID (number)
- `contact.owner.username`: Username
- `contact.owner.firstName`: First Name
- `contact.owner.lastName`: Last Name
- `contact.ipAddresses`: IP Addresses
- `contact.tags`: Tags
- `contact.tags[].id`: ID (number)
- `contact.tags[].tag`: Tag
- `contact.tags[].description`: Description
- `contact.utmtags`: UTM Tags
- `contact.stage`: Stage
- `contact.dateIdentified`: Date Identified (datetime)
- `contact.preferredProfileImage`: Preferred Profile Image
- `contact.doNotContact`: Do Not Contact
- `contact.frequencyRules`: Frequency Rules

### `mautic_delete_contact`

**Delete Contact.** Permanently deletes a contact and its history. Cannot be undone. Get the id from List Contacts. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact Id. Numeric contact id, from List Contacts or Create Contact. |

Output fields:

- `contact`: Contact
- `contact.isPublished`: Published (boolean)
- `contact.dateAdded`: Date Added (datetime)
- `contact.dateModified`: Date Modified (datetime)
- `contact.id`: ID
- `contact.points`: Points (number)
- `contact.color`: Color
- `contact.fields`: Fields
- `contact.fields.all`: All
- `contact.fields.all.id`: ID
- `contact.fields.all.title`: Title
- `contact.fields.all.firstname`: First Name
- `contact.fields.all.lastname`: Last Name
- `contact.fields.all.company`: Company
- `contact.fields.all.position`: Position
- `contact.fields.all.email`: Email (email)
- `contact.fields.all.mobile`: Mobile
- `contact.fields.all.phone`: Phone
- `contact.fields.all.points`: Points (number)
- `contact.fields.all.fax`: Fax
- `contact.fields.all.address1`: Address 1
- `contact.fields.all.address2`: Address 2
- `contact.fields.all.city`: City
- `contact.fields.all.state`: State
- `contact.fields.all.zipcode`: Zip Code
- `contact.fields.all.country`: Country
- `contact.fields.all.preferred_locale`: Preferred Locale
- `contact.fields.all.timezone`: Timezone
- `contact.fields.all.last_active`: Last Active (datetime)
- `contact.fields.all.attribution_date`: Attribution Date
- `contact.fields.all.attribution`: Attribution
- `contact.fields.all.website`: Website
- `contact.fields.all.facebook`: Facebook
- `contact.fields.all.foursquare`: Foursquare
- `contact.fields.all.instagram`: Instagram
- `contact.fields.all.linkedin`: LinkedIn
- `contact.fields.all.skype`: Skype
- `contact.fields.all.twitter`: Twitter
- `contact.lastActive`: Last Active (datetime)
- `contact.owner`: Owner
- `contact.owner.id`: ID (number)
- `contact.owner.username`: Username
- `contact.owner.firstName`: First Name
- `contact.owner.lastName`: Last Name
- `contact.ipAddresses`: IP Addresses
- `contact.tags`: Tags
- `contact.utmtags`: UTM Tags
- `contact.stage`: Stage
- `contact.dateIdentified`: Date Identified (datetime)
- `contact.preferredProfileImage`: Preferred Profile Image
- `contact.doNotContact`: Do Not Contact
- `contact.doNotContact[].id`: ID
- `contact.doNotContact[].reason`: Reason (number)
- `contact.doNotContact[].comments`: Comments
- `contact.doNotContact[].channel`: Channel
- `contact.doNotContact[].channelId`: Channel ID
- `contact.frequencyRules`: Frequency Rules

### `mautic_list_activity`

**List Activity.** Lists timeline events (page hits, email opens, form submissions, point changes and more) across all contacts, newest first by default. Filter by event type and date range; page with Page and Limit. Use List Contact Activity for a single contact. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Text to filter events by. |
| `includeEvents` | array | no |  | Include Event Types. Event type ids to include, e.g. "page.hit", "email.read", "form.submitted". Taken from the "types" field of a previous response. |
| `excludeEvents` | array | no |  | Exclude Event Types. Event type ids to exclude. |
| `dateFrom` | string | no |  | Date From. Earliest event time, format "YYYY-MM-DD HH:MM:SS". |
| `dateTo` | string | no |  | Date To. Latest event time, format "YYYY-MM-DD HH:MM:SS". |
| `orderBy` | string | no |  | Order By. Column to sort by, e.g. "timestamp". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `page` | number | no |  | Page. Page number, starting at 1. |
| `limit` | number | no | `25` | Limit. Events per page. |

Output fields:

- `events`: Events
- `events[].event`: Event
- `events[].eventId`: Event ID
- `events[].eventType`: Event Type
- `events[].eventLabel`: Event Label
- `events[].eventLabel.href`: Href (url)
- `events[].timestamp`: Timestamp (datetime)
- `events[].contactId`: Contact ID
- `events[].details`: Details
- `events[].details.objectDescription`: Object Description
- `events[].details.asset`: Asset
- `events[].details.assetDownloadUrl`: Asset Download URL (url)
- `filters`: Filters
- `filters.search`: Search
- `filters.includeEvents`: Include Events
- `filters.excludeEvents`: Exclude Events
- `filters.dateFrom`: Date From (datetime)
- `filters.dateTo`: Date To (datetime)
- `order`: Order
- `types`: Types
- `types.['asset.download']`: Asset Download
- `types.['campaign.event']`: Campaign Event
- `types.['campaign.event.scheduled']`: Campaign Event Scheduled
- `types.campaign_membership`: Campaign Membership
- `types.['lead.source.created']`: Lead Source Created
- `types.['lead.source.identified']`: Lead Source Identified
- `types.['lead.donotcontact']`: Lead Donotcontact
- `types.['dynamic.content.sent']`: Dynamic Content Sent
- `types.['email.failed']`: Email Failed
- `types.['email.read']`: Email Read
- `types.['email.replied']`: Email Replied
- `types.['email.sent']`: Email Sent
- `types.['sms.failed']`: Sms Failed
- `types.['focus.on_click']`: Focus On Click
- `types.['focus.on_view']`: Focus On View
- `types.['form.submitted']`: Form Submitted
- `types.['lead.imported']`: Lead Imported
- `types.integration_sync_issues`: Integration Sync Issues
- `types.['message.queue']`: Message Queue
- `types.['page.hit']`: Page Hit
- `types.['point.gained']`: Point Gained
- `types.segment_membership`: Segment Membership
- `types.['sms.sent']`: Sms Sent
- `types.['stage.changed']`: Stage Changed
- `types.sms_reply`: Sms Reply
- `types.['lead.utmtagsadded']`: Lead Utmtagsadded
- `types.['page.videohit']`: Page Videohit
- `total`: Total (number)
- `page`: Page (number)
- `limit`: Limit (number)
- `maxPages`: Max Pages (number)

### `mautic_list_contact_activity`

**List Contact Activity.** Lists the timeline events of one contact (page hits, email opens, form submissions, point changes and more). Filter by event type and date range; page with Page and Limit. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact Id. Numeric contact id, from List Contacts or Create Contact. |
| `search` | string | no |  | Search. Text to filter events by. |
| `includeEvents` | array | no |  | Include Event Types. Event type ids to include, e.g. "page.hit", "email.read", "form.submitted". Taken from the "types" field of a previous response. |
| `excludeEvents` | array | no |  | Exclude Event Types. Event type ids to exclude. |
| `dateFrom` | string | no |  | Date From. Earliest event time, format "YYYY-MM-DD HH:MM:SS". |
| `dateTo` | string | no |  | Date To. Latest event time, format "YYYY-MM-DD HH:MM:SS". |
| `orderBy` | string | no |  | Order By. Column to sort by, e.g. "timestamp". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `page` | number | no |  | Page. Page number, starting at 1. |
| `limit` | number | no | `25` | Limit. Events per page. |

Output fields:

- `events`: Events
- `events[].event`: Event
- `events[].eventId`: Event ID
- `events[].eventLabel`: Event Label
- `events[].eventType`: Event Type
- `events[].timestamp`: Timestamp (datetime)
- `events[].contactId`: Contact ID
- `events[].details`: Details
- `events[].details.log`: Log
- `events[].details.log.eventName`: Event Name
- `events[].details.log.actionName`: Action Name
- `events[].details.log.dateAdded`: Date Added (datetime)
- `events[].details.log.type`: Type
- `events[].details.log.delta`: Delta
- `events[].details.log.id`: ID
- `events[].details.log.lead_id`: Lead ID
- `events[].details.objectDescription`: Object Description
- `filters`: Filters
- `filters.search`: Search
- `filters.includeEvents`: Include Events
- `filters.excludeEvents`: Exclude Events
- `filters.dateFrom`: Date From (datetime)
- `filters.dateTo`: Date To (datetime)
- `order`: Order
- `types`: Types
- `types.['asset.download']`: Asset Download
- `types.['campaign.event']`: Campaign Event
- `types.['campaign.event.scheduled']`: Campaign Event Scheduled
- `types.campaign_membership`: Campaign Membership
- `types.['lead.source.created']`: Lead Source Created
- `types.['lead.source.identified']`: Lead Source Identified
- `types.['lead.donotcontact']`: Lead Donotcontact
- `types.['dynamic.content.sent']`: Dynamic Content Sent
- `types.['email.failed']`: Email Failed
- `types.['email.read']`: Email Read
- `types.['email.replied']`: Email Replied
- `types.['email.sent']`: Email Sent
- `types.['sms.failed']`: Sms Failed
- `types.['focus.on_click']`: Focus On Click
- `types.['focus.on_view']`: Focus On View
- `types.['form.submitted']`: Form Submitted
- `types.['lead.imported']`: Lead Imported
- `types.integration_sync_issues`: Integration Sync Issues
- `types.['message.queue']`: Message Queue
- `types.['page.hit']`: Page Hit
- `types.['point.gained']`: Point Gained
- `types.segment_membership`: Segment Membership
- `types.['sms.sent']`: Sms Sent
- `types.['stage.changed']`: Stage Changed
- `types.sms_reply`: Sms Reply
- `types.['lead.utmtagsadded']`: Lead Utmtagsadded
- `types.['page.videohit']`: Page Videohit
- `total`: Total (number)
- `page`: Page (number)
- `limit`: Limit (number)
- `maxPages`: Max Pages (number)

### `mautic_list_contact_fields`

**List Contact Fields.** Lists every contact field, including custom ones, with its alias. Use the aliases as keys in Additional Fields of Create Contact and Update Contact, and as columns in List Contacts filters. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `fields`: Fields (an object whose keys vary)

### `mautic_list_contact_owners`

**List Contact Owners.** Lists users that can be set as a contact owner, with their ids. Use an id as Owner Id in Create Contact or Update Contact. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter` | string | no |  | Filter. Part of the user name to match. |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |

Output fields:

- `owners`: Owners
- `owners[].id`: ID (number)
- `owners[].firstName`: First Name
- `owners[].lastName`: Last Name

### `mautic_list_available_segments`

**List Available Segments.** Lists the segments the connected user can assign contacts to, with id, name and alias. Use List Contact Segments for the segments one contact belongs to. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `segments`: Segments

### `mautic_list_contact_campaigns`

**List Contact Campaigns.** Lists the campaigns a contact is a member of, with the date added and whether membership was manual. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact Id. Numeric contact id, from List Contacts or Create Contact. |

Output fields:

- `total`: Total (number)
- `campaigns`: Campaigns
- `campaigns[].id`: ID (number)
- `campaigns[].name`: Name
- `campaigns[].listMembership`: List Membership
- `campaigns[].dateAdded`: Date Added (datetime)
- `campaigns[].manuallyRemoved`: Manually Removed (boolean)
- `campaigns[].manuallyAdded`: Manually Added (boolean)

### `mautic_list_contact_companies`

**List Contact Companies.** Lists the companies a contact is linked to, including which one is primary. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact Id. Numeric contact id, from List Contacts or Create Contact. |

Output fields:

- `total`: Total (number)
- `companies`: Companies
- `companies[].company_id`: Company ID
- `companies[].date_associated`: Date Associated (datetime)
- `companies[].is_primary`: Is Primary
- `companies[].id`: ID
- `companies[].owner_id`: Owner ID
- `companies[].is_published`: Published
- `companies[].date_added`: Date Added (datetime)
- `companies[].created_by`: Created By
- `companies[].created_by_user`: Created By User
- `companies[].date_modified`: Date Modified (datetime)
- `companies[].modified_by`: Modified By
- `companies[].modified_by_user`: Modified By User
- `companies[].social_cache`: Social Cache
- `companies[].score`: Score
- `companies[].companyemail`: Company Email (email)
- `companies[].companyphone`: Company Phone
- `companies[].companycity`: Company City
- `companies[].companycountry`: Company Country
- `companies[].companyname`: Company Name
- `companies[].companywebsite`: Company Website (url)
- `companies[].companydescription`: Company Description
- `companies[].companynumber_of_employees`: Company Number of Employees

### `mautic_list_contact_notes`

**List Contact Notes.** Lists the notes on a contact, newest first by default; page with Start and Limit. Order By takes a column with the "n." prefix, e.g. "n.dateAdded"; a bare column name fails. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact Id. Numeric contact id, from List Contacts or Create Contact. |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |

Output fields:

- `total`: Total (number)
- `notes`: Notes
- `notes[].id`: ID (number)
- `notes[].text`: Text
- `notes[].type`: Type
- `notes[].dateTime`: Date Time (datetime)
- `notes[].lead`: Lead

### `mautic_list_contact_segments`

**List Contact Segments.** Lists the segments a contact belongs to. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact Id. Numeric contact id, from List Contacts or Create Contact. |

Output fields:

- `total`: Total (number)
- `lists`: Lists
- `lists[].id`: ID (number)
- `lists[].name`: Name
- `lists[].alias`: Alias
- `lists[].dateAdded`: Date Added (datetime)
- `lists[].manuallyRemoved`: Manually Removed (boolean)
- `lists[].manuallyAdded`: Manually Added (boolean)

### `mautic_list_contact_devices`

**List Contact Devices.** Lists the devices (browser, OS, device type) a contact has used; page with Start and Limit. Order By takes a column with the "d." prefix, e.g. "d.dateAdded"; a bare column name fails. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact Id. Numeric contact id, from List Contacts or Create Contact. |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |

Output fields:

- `total`: Total (number)
- `devices`: Devices
- `devices[].id`: ID (number)
- `devices[].lead`: Lead
- `devices[].clientInfo`: Client Info
- `devices[].device`: Device
- `devices[].deviceBrand`: Device Brand
- `devices[].deviceModel`: Device Model
- `devices[].deviceOsName`: Device Os Name
- `devices[].deviceOsShortName`: Device Os Short Name
- `devices[].deviceOsVersion`: Device Os Version
- `devices[].deviceOsPlatform`: Device Os Platform

### `mautic_add_do_not_contact`

**Add Do Not Contact.** Adds a do-not-contact entry for a contact on the email or SMS channel, so Mautic stops sending on that channel. Remove it with Remove Do Not Contact. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact Id. Numeric contact id, from List Contacts or Create Contact. |
| `channel` | string | yes |  | Channel. One of `"email"`, `"sms"`. |
| `reason` | string | no |  | Reason. Defaults to Manual. One of `1`, `2`, `3`. |
| `channelId` | number | no |  | Channel Id. Id of the email or text message that caused the entry. |
| `comments` | string | no |  | Comments. |

Output fields:

- `contact`: Contact
- `contact.isPublished`: Published (boolean)
- `contact.dateAdded`: Date Added (datetime)
- `contact.id`: ID (number)
- `contact.points`: Points (number)
- `contact.fields`: Fields
- `contact.ipAddresses`: IP Addresses
- `contact.tags`: Tags
- `contact.utmtags`: UTM Tags
- `contact.doNotContact`: Do Not Contact
- `contact.doNotContact[].id`: ID (number)
- `contact.doNotContact[].dateAdded`: Date Added (datetime)
- `contact.doNotContact[].reason`: Reason (number)
- `contact.doNotContact[].comments`: Comments
- `contact.doNotContact[].channel`: Channel
- `contact.frequencyRules`: Frequency Rules
- `contact.dateModified`: Date Modified (datetime)
- `contact.company`: Company
- `contact.dateIdentified`: Date Identified (datetime)

### `mautic_remove_do_not_contact`

**Remove Do Not Contact.** Removes the do-not-contact entry of a contact on the email or SMS channel, so Mautic can send on it again. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact Id. Numeric contact id, from List Contacts or Create Contact. |
| `channel` | string | yes |  | Channel. One of `"email"`, `"sms"`. |

Output fields:

- `recordFound`: Record Found (boolean)
- `contact`: Contact
- `contact.isPublished`: Published (boolean)
- `contact.dateAdded`: Date Added (datetime)
- `contact.id`: ID (number)
- `contact.points`: Points (number)
- `contact.fields`: Fields
- `contact.ipAddresses`: IP Addresses
- `contact.tags`: Tags
- `contact.utmtags`: UTM Tags
- `contact.doNotContact`: Do Not Contact
- `contact.doNotContact[].id`: ID (number)
- `contact.doNotContact[].dateAdded`: Date Added (datetime)
- `contact.doNotContact[].reason`: Reason (number)
- `contact.doNotContact[].comments`: Comments
- `contact.doNotContact[].channel`: Channel
- `contact.frequencyRules`: Frequency Rules

### `mautic_add_contact_utm_tags`

**Add Contact UTM Tags.** Records one UTM tag entry (campaign, source, medium, content, term, URL, referrer) on a contact. Each call adds a new entry. Returns the contact with its UTM tags; each entry id is what Remove Contact UTM Tags takes. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact Id. Numeric contact id, from List Contacts or Create Contact. |
| `utm_campaign` | string | no |  | UTM Campaign. |
| `utm_source` | string | no |  | UTM Source. |
| `utm_medium` | string | no |  | UTM Medium. |
| `utm_content` | string | no |  | UTM Content. |
| `utm_term` | string | no |  | UTM Term. |
| `url` | string | no |  | Page URL. |
| `referer` | string | no |  | Referrer URL. |
| `query` | string | no |  | Query. Extra query parameters as a query string, e.g. "cid=abc&cond=new". |
| `userAgent` | string | no |  | User Agent. Browser user agent; Mautic records a device for it. |
| `remotehost` | string | no |  | Remote Host. |
| `lastActive` | string | no |  | Last Active. When the visit happened, e.g. "2026-01-17T00:30:08+00:00". Also updates the contact's last active date. |

Output fields:

- `contact`: Contact
- `contact.isPublished`: Published (boolean)
- `contact.dateAdded`: Date Added (datetime)
- `contact.dateModified`: Date Modified (datetime)
- `contact.id`: ID (number)
- `contact.points`: Points (number)
- `contact.firstname`: First Name
- `contact.lastname`: Last Name
- `contact.position`: Position
- `contact.email`: Email (email)
- `contact.phone`: Phone
- `contact.city`: City
- `contact.fields`: Fields
- `contact.lastActive`: Last Active (datetime)
- `contact.owner`: Owner
- `contact.owner.isPublished`: Published (boolean)
- `contact.owner.id`: ID (number)
- `contact.owner.username`: Username
- `contact.owner.firstName`: First Name
- `contact.owner.lastName`: Last Name
- `contact.owner.email`: Email (email)
- `contact.owner.role`: Role
- `contact.owner.role.isPublished`: Published (boolean)
- `contact.owner.role.id`: ID (number)
- `contact.owner.role.name`: Name
- `contact.owner.role.description`: Description
- `contact.owner.role.isAdmin`: Is Admin (boolean)
- `contact.owner.timezone`: Timezone
- `contact.owner.locale`: Locale
- `contact.owner.lastLogin`: Last Login (datetime)
- `contact.owner.lastActive`: Last Active (datetime)
- `contact.ipAddresses`: IP Addresses
- `contact.tags`: Tags
- `contact.tags[].id`: ID (number)
- `contact.tags[].tag`: Tag
- `contact.utmtags`: UTM Tags
- `contact.utmtags[].id`: ID (number)
- `contact.utmtags[].query`: Query
- `contact.utmtags[].query.x`: X
- `contact.utmtags[].referer`: Referer (url)
- `contact.utmtags[].remoteHost`: Remote Host
- `contact.utmtags[].url`: URL (url)
- `contact.utmtags[].utmCampaign`: Utm Campaign
- `contact.utmtags[].utmContent`: Utm Content
- `contact.utmtags[].utmMedium`: Utm Medium
- `contact.utmtags[].utmSource`: Utm Source
- `contact.utmtags[].utmTerm`: Utm Term
- `contact.dateIdentified`: Date Identified (datetime)
- `contact.doNotContact`: Do Not Contact
- `contact.frequencyRules`: Frequency Rules

### `mautic_remove_contact_utm_tags`

**Remove Contact UTM Tags.** Removes one UTM tag entry from a contact. The UTM id is the id of an entry in the contact's utmtags, from Get Contact. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact Id. Numeric contact id, from List Contacts or Create Contact. |
| `utmId` | string | yes |  | UTM Id. Id of the UTM tag entry, from the utmtags of Get Contact. |

Output fields:

- `recordFound`: Record Found (boolean)
- `contact`: Contact
- `contact.isPublished`: Published (boolean)
- `contact.dateAdded`: Date Added (datetime)
- `contact.dateModified`: Date Modified (datetime)
- `contact.id`: ID (number)
- `contact.points`: Points (number)
- `contact.firstname`: First Name
- `contact.lastname`: Last Name
- `contact.position`: Position
- `contact.email`: Email (email)
- `contact.phone`: Phone
- `contact.city`: City
- `contact.fields`: Fields
- `contact.lastActive`: Last Active (datetime)
- `contact.owner`: Owner
- `contact.owner.isPublished`: Published (boolean)
- `contact.owner.id`: ID (number)
- `contact.owner.username`: Username
- `contact.owner.firstName`: First Name
- `contact.owner.lastName`: Last Name
- `contact.owner.email`: Email (email)
- `contact.owner.role`: Role
- `contact.owner.role.isPublished`: Published (boolean)
- `contact.owner.role.id`: ID (number)
- `contact.owner.role.name`: Name
- `contact.owner.role.description`: Description
- `contact.owner.role.isAdmin`: Is Admin (boolean)
- `contact.owner.timezone`: Timezone
- `contact.owner.locale`: Locale
- `contact.owner.lastLogin`: Last Login (datetime)
- `contact.owner.lastActive`: Last Active (datetime)
- `contact.ipAddresses`: IP Addresses
- `contact.tags`: Tags
- `contact.tags[].id`: ID (number)
- `contact.tags[].tag`: Tag
- `contact.utmtags`: UTM Tags
- `contact.dateIdentified`: Date Identified (datetime)
- `contact.doNotContact`: Do Not Contact
- `contact.frequencyRules`: Frequency Rules

### `mautic_adjust_contact_points`

**Adjust Contact Points.** Changes a contact's total points by applying the operator with the value, e.g. Add 10. Each call applies again, so repeating it changes the score again. Use Adjust Contact Group Points for a point group score. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact Id. Numeric contact id, from List Contacts or Create Contact. |
| `operator` | string | yes |  | Operator. One of `"plus"`, `"minus"`, `"times"`, `"divide"`. |
| `value` | number | yes |  | Value. |
| `eventName` | string | no |  | Event Name. Label shown in the contact points history. |
| `actionName` | string | no |  | Action Name. Action label shown in the contact points history. |

Output fields:

- `success`: Success (number)

### `mautic_list_contact_point_groups`

**List Contact Point Groups.** Lists the contact's score in every point group, with group id and name. Needs Mautic 5.1 or later. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact Id. Numeric contact id, from List Contacts or Create Contact. |

Output fields:

- `total`: Total (number)
- `groupScores`: Group Scores
- `groupScores[].score`: Score (number)
- `groupScores[].group`: Group
- `groupScores[].group.id`: ID (number)
- `groupScores[].group.name`: Name
- `groupScores[].group.description`: Description

### `mautic_get_contact_point_group`

**Get Contact Point Group.** Gets the contact's score in one point group. The group id comes from List Contact Point Groups. Needs Mautic 5.1 or later. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact Id. Numeric contact id, from List Contacts or Create Contact. |
| `groupId` | string | yes |  | Point Group Id. Point group id, from List Contact Point Groups. |

Output fields:

- `groupScore`: Group Score
- `groupScore.score`: Score (number)
- `groupScore.group`: Group
- `groupScore.group.id`: ID (number)
- `groupScore.group.name`: Name
- `groupScore.group.description`: Description

### `mautic_adjust_contact_group_points`

**Adjust Contact Group Points.** Changes the contact's score in one point group by the operator and value, or sets it with Set. Add, Subtract, Multiply and Divide apply again on every call; Set is the only repeatable choice. Needs Mautic 5.1 or later. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Contact Id. Numeric contact id, from List Contacts or Create Contact. |
| `groupId` | string | yes |  | Point Group Id. Point group id, from List Contact Point Groups. |
| `operator` | string | yes |  | Operator. One of `"plus"`, `"minus"`, `"times"`, `"divide"`, `"set"`. |
| `value` | number | yes |  | Value. |
| `eventName` | string | no |  | Event Name. Label shown in the contact points history. |
| `actionName` | string | no |  | Action Name. Action label shown in the contact points history. |

Output fields:

- `groupScore`: Group Score
- `groupScore.score`: Score (number)
- `groupScore.group`: Group
- `groupScore.group.id`: ID (number)
- `groupScore.group.name`: Name
- `groupScore.group.description`: Description

### `mautic_batch_create_contacts`

**Batch Create Contacts.** Creates up to 200 contacts in one request. Each record is an object of field values keyed by alias, e.g. {"email": "jane@example.com", "firstname": "Jane"}. Mautic merges records whose unique identifier (email by default) matches an existing contact. Per-record errors are in the response. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `records` | array | yes |  | Records. Contacts to create, each an object of field values keyed by field alias. |

Output fields:

- `contacts`: Contacts
- `contacts[].isPublished`: Published (boolean)
- `contacts[].dateAdded`: Date Added (datetime)
- `contacts[].dateModified`: Date Modified
- `contacts[].id`: ID (number)
- `contacts[].points`: Points (number)
- `contacts[].color`: Color
- `contacts[].fields`: Fields
- `contacts[].fields.all`: All
- `contacts[].fields.all.id`: ID
- `contacts[].fields.all.title`: Title
- `contacts[].fields.all.firstname`: First Name
- `contacts[].fields.all.lastname`: Last Name
- `contacts[].fields.all.company`: Company
- `contacts[].fields.all.position`: Position
- `contacts[].fields.all.email`: Email (email)
- `contacts[].fields.all.mobile`: Mobile
- `contacts[].fields.all.phone`: Phone
- `contacts[].fields.all.points`: Points (number)
- `contacts[].fields.all.fax`: Fax
- `contacts[].fields.all.address1`: Address 1
- `contacts[].fields.all.address2`: Address 2
- `contacts[].fields.all.city`: City
- `contacts[].fields.all.state`: State
- `contacts[].fields.all.zipcode`: Zip Code
- `contacts[].fields.all.country`: Country
- `contacts[].fields.all.preferred_locale`: Preferred Locale
- `contacts[].fields.all.timezone`: Timezone
- `contacts[].fields.all.last_active`: Last Active
- `contacts[].fields.all.attribution_date`: Attribution Date
- `contacts[].fields.all.attribution`: Attribution
- `contacts[].fields.all.website`: Website
- `contacts[].fields.all.facebook`: Facebook
- `contacts[].fields.all.foursquare`: Foursquare
- `contacts[].fields.all.instagram`: Instagram
- `contacts[].fields.all.linkedin`: LinkedIn
- `contacts[].fields.all.skype`: Skype
- `contacts[].fields.all.twitter`: Twitter
- `contacts[].lastActive`: Last Active
- `contacts[].owner`: Owner
- `contacts[].ipAddresses`: IP Addresses
- `contacts[].tags`: Tags
- `contacts[].utmtags`: UTM Tags
- `contacts[].stage`: Stage
- `contacts[].dateIdentified`: Date Identified (datetime)
- `contacts[].preferredProfileImage`: Preferred Profile Image
- `contacts[].doNotContact`: Do Not Contact
- `contacts[].frequencyRules`: Frequency Rules
- `statusCodes`: Status Codes

### `mautic_batch_update_contacts`

**Batch Update Contacts.** Updates up to 200 contacts in one request. Each record has the contact "id" plus only the fields to change; other fields are left alone. Per-record errors are in the response. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `records` | array | yes |  | Records. Contacts to update, each an object with "id" and the field values to change, keyed by field alias. |

Output fields:

- `contacts`: Contacts
- `contacts[].isPublished`: Published (boolean)
- `contacts[].dateAdded`: Date Added (datetime)
- `contacts[].dateModified`: Date Modified (datetime)
- `contacts[].id`: ID (number)
- `contacts[].points`: Points (number)
- `contacts[].color`: Color
- `contacts[].fields`: Fields
- `contacts[].fields.all`: All
- `contacts[].fields.all.id`: ID
- `contacts[].fields.all.points`: Points (number)
- `contacts[].fields.all.last_active`: Last Active
- `contacts[].fields.all.title`: Title
- `contacts[].fields.all.firstname`: First Name
- `contacts[].fields.all.lastname`: Last Name
- `contacts[].fields.all.company`: Company
- `contacts[].fields.all.position`: Position
- `contacts[].fields.all.email`: Email (email)
- `contacts[].fields.all.phone`: Phone
- `contacts[].fields.all.mobile`: Mobile
- `contacts[].fields.all.address1`: Address 1
- `contacts[].fields.all.address2`: Address 2
- `contacts[].fields.all.city`: City
- `contacts[].fields.all.state`: State
- `contacts[].fields.all.zipcode`: Zip Code
- `contacts[].fields.all.timezone`: Timezone
- `contacts[].fields.all.country`: Country
- `contacts[].fields.all.fax`: Fax
- `contacts[].fields.all.preferred_locale`: Preferred Locale
- `contacts[].fields.all.attribution_date`: Attribution Date
- `contacts[].fields.all.attribution`: Attribution
- `contacts[].fields.all.website`: Website
- `contacts[].fields.all.facebook`: Facebook
- `contacts[].fields.all.foursquare`: Foursquare
- `contacts[].fields.all.instagram`: Instagram
- `contacts[].fields.all.linkedin`: LinkedIn
- `contacts[].fields.all.skype`: Skype
- `contacts[].fields.all.twitter`: Twitter
- `contacts[].lastActive`: Last Active
- `contacts[].owner`: Owner
- `contacts[].ipAddresses`: IP Addresses
- `contacts[].tags`: Tags
- `contacts[].utmtags`: UTM Tags
- `contacts[].stage`: Stage
- `contacts[].dateIdentified`: Date Identified (datetime)
- `contacts[].preferredProfileImage`: Preferred Profile Image
- `contacts[].doNotContact`: Do Not Contact
- `contacts[].frequencyRules`: Frequency Rules
- `statusCodes`: Status Codes

### `mautic_batch_delete_contacts`

**Batch Delete Contacts.** Permanently deletes up to 200 contacts by id in one request. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ids` | array | yes |  | Contact Ids. Numeric contact ids, from List Contacts. |

Output fields:

- `contacts`: Contacts
- `contacts[].isPublished`: Published (boolean)
- `contacts[].dateAdded`: Date Added (datetime)
- `contacts[].dateModified`: Date Modified (datetime)
- `contacts[].id`: ID (number)
- `contacts[].points`: Points (number)
- `contacts[].color`: Color
- `contacts[].fields`: Fields
- `contacts[].fields.all`: All
- `contacts[].fields.all.id`: ID
- `contacts[].fields.all.points`: Points (number)
- `contacts[].fields.all.last_active`: Last Active
- `contacts[].fields.all.title`: Title
- `contacts[].fields.all.firstname`: First Name
- `contacts[].fields.all.lastname`: Last Name
- `contacts[].fields.all.company`: Company
- `contacts[].fields.all.position`: Position
- `contacts[].fields.all.email`: Email (email)
- `contacts[].fields.all.phone`: Phone
- `contacts[].fields.all.mobile`: Mobile
- `contacts[].fields.all.address1`: Address 1
- `contacts[].fields.all.address2`: Address 2
- `contacts[].fields.all.city`: City
- `contacts[].fields.all.state`: State
- `contacts[].fields.all.zipcode`: Zip Code
- `contacts[].fields.all.timezone`: Timezone
- `contacts[].fields.all.country`: Country
- `contacts[].fields.all.fax`: Fax
- `contacts[].fields.all.preferred_locale`: Preferred Locale
- `contacts[].fields.all.attribution_date`: Attribution Date
- `contacts[].fields.all.attribution`: Attribution
- `contacts[].fields.all.website`: Website
- `contacts[].fields.all.facebook`: Facebook
- `contacts[].fields.all.foursquare`: Foursquare
- `contacts[].fields.all.instagram`: Instagram
- `contacts[].fields.all.linkedin`: LinkedIn
- `contacts[].fields.all.skype`: Skype
- `contacts[].fields.all.twitter`: Twitter
- `contacts[].lastActive`: Last Active
- `contacts[].owner`: Owner
- `contacts[].ipAddresses`: IP Addresses
- `contacts[].tags`: Tags
- `contacts[].utmtags`: UTM Tags
- `contacts[].stage`: Stage
- `contacts[].dateIdentified`: Date Identified (datetime)
- `contacts[].preferredProfileImage`: Preferred Profile Image
- `contacts[].doNotContact`: Do Not Contact
- `contacts[].frequencyRules`: Frequency Rules

### `mautic_list_companies`

**List Companies.** Lists companies with paging, sorting and filters. Use Search for free text or commands like "companyname:Acme", or Where for exact column conditions. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total
- `companies`: Companies
- `companies[].id`: ID (number)
- `companies[].score`: Score (number)
- `companies[].fields`: Fields
- `companies[].fields.other`: Other
- `companies[].fields.all`: All
- `companies[].fields.all.id`: ID (number)
- `companies[].fields.all.companyemail`: Company Email (email)
- `companies[].fields.all.companyaddress1`: Company Address 1
- `companies[].fields.all.companyaddress2`: Company Address 2
- `companies[].fields.all.companyphone`: Company Phone
- `companies[].fields.all.companycity`: Company City
- `companies[].fields.all.companystate`: Company State
- `companies[].fields.all.companyzipcode`: Company Zip Code
- `companies[].fields.all.companycountry`: Company Country
- `companies[].fields.all.companyname`: Company Name
- `companies[].fields.all.companywebsite`: Company Website (url)
- `companies[].fields.all.companyindustry`: Company Industry
- `companies[].fields.all.companydescription`: Company Description
- `companies[].fields.all.companynumber_of_employees`: Company Number of Employees
- `companies[].fields.all.companyfax`: Company Fax
- `companies[].fields.all.companyannual_revenue`: Company Annual Revenue

### `mautic_get_company`

**Get Company.** Gets a single company by its numeric id, with all field values. Get the id from List Companies. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Company Id. Numeric company id, from List Companies or Create Company. |

Output fields:

- `company`: Company
- `company.id`: ID (number)
- `company.score`: Score (number)
- `company.fields`: Fields
- `company.fields.other`: Other
- `company.fields.all`: All
- `company.fields.all.id`: ID (number)
- `company.fields.all.companyaddress1`: Company Address 1
- `company.fields.all.companyaddress2`: Company Address 2
- `company.fields.all.companyemail`: Company Email (email)
- `company.fields.all.companyphone`: Company Phone
- `company.fields.all.companycity`: Company City
- `company.fields.all.companystate`: Company State
- `company.fields.all.companyzipcode`: Company Zip Code
- `company.fields.all.companycountry`: Company Country
- `company.fields.all.companyname`: Company Name
- `company.fields.all.companywebsite`: Company Website (url)
- `company.fields.all.companynumber_of_employees`: Company Number of Employees (number)
- `company.fields.all.companyfax`: Company Fax
- `company.fields.all.companyannual_revenue`: Company Annual Revenue
- `company.fields.all.companyindustry`: Company Industry
- `company.fields.all.companydescription`: Company Description

### `mautic_create_company`

**Create Company.** Creates a company from the given field values. Company Name is required. Mautic may merge into an existing company with the same unique identifier fields. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyname` | string | yes |  | Company Name. |
| `companyemail` | string | no |  | Email. |
| `companyphone` | string | no |  | Phone. |
| `companywebsite` | string | no |  | Website. |
| `companycity` | string | no |  | City. |
| `companycountry` | string | no |  | Country. |
| `owner` | number | no |  | Owner Id. Id of the Mautic user who owns the company, from List Contact Owners. |
| `additionalFields` | JSON | no |  | Additional Fields. Other company fields keyed by field alias, e.g. {"companyindustry": "Software", "companyaddress1": "1 Main St"}. Aliases come from List Fields with object "company". The dedicated props above win over the same keys here. |

Output fields:

- `company`: Company
- `company.id`: ID (number)
- `company.score`: Score (number)
- `company.fields`: Fields
- `company.fields.all`: All
- `company.fields.all.id`: ID (number)
- `company.fields.all.companyaddress1`: Company Address 1
- `company.fields.all.companyaddress2`: Company Address 2
- `company.fields.all.companyemail`: Company Email (email)
- `company.fields.all.companyphone`: Company Phone
- `company.fields.all.companycity`: Company City
- `company.fields.all.companystate`: Company State
- `company.fields.all.companyzipcode`: Company Zip Code
- `company.fields.all.companycountry`: Company Country
- `company.fields.all.companyname`: Company Name
- `company.fields.all.companywebsite`: Company Website (url)
- `company.fields.all.companynumber_of_employees`: Company Number of Employees
- `company.fields.all.companyfax`: Company Fax
- `company.fields.all.companyannual_revenue`: Company Annual Revenue
- `company.fields.all.companyindustry`: Company Industry
- `company.fields.all.companydescription`: Company Description

### `mautic_update_company`

**Update Company.** Updates an existing company. Fails if the company id does not exist. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Company Id. Numeric company id, from List Companies or Create Company. |
| `companyname` | string | no |  | Company Name. |
| `companyemail` | string | no |  | Email. |
| `companyphone` | string | no |  | Phone. |
| `companywebsite` | string | no |  | Website. |
| `companycity` | string | no |  | City. |
| `companycountry` | string | no |  | Country. |
| `owner` | number | no |  | Owner Id. Id of the Mautic user who owns the company, from List Contact Owners. |
| `additionalFields` | JSON | no |  | Additional Fields. Other company fields keyed by field alias, e.g. {"companyindustry": "Software", "companyaddress1": "1 Main St"}. Aliases come from List Fields with object "company". The dedicated props above win over the same keys here. |

Output fields:

- `company`: Company
- `company.id`: ID (number)
- `company.score`: Score (number)
- `company.fields`: Fields
- `company.fields.other`: Other
- `company.fields.all`: All
- `company.fields.all.id`: ID (number)
- `company.fields.all.companyaddress1`: Company Address 1
- `company.fields.all.companyaddress2`: Company Address 2
- `company.fields.all.companyemail`: Company Email (email)
- `company.fields.all.companyphone`: Company Phone
- `company.fields.all.companycity`: Company City
- `company.fields.all.companystate`: Company State
- `company.fields.all.companyzipcode`: Company Zip Code
- `company.fields.all.companycountry`: Company Country
- `company.fields.all.companyname`: Company Name
- `company.fields.all.companywebsite`: Company Website (url)
- `company.fields.all.companynumber_of_employees`: Company Number of Employees (number)
- `company.fields.all.companyfax`: Company Fax
- `company.fields.all.companyannual_revenue`: Company Annual Revenue
- `company.fields.all.companyindustry`: Company Industry
- `company.fields.all.companydescription`: Company Description

### `mautic_delete_company`

**Delete Company.** Permanently deletes a company. Its contacts are kept but unlinked. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Company Id. Numeric company id, from List Companies or Create Company. |

Output fields:

- `company`: Company
- `company.id`: ID
- `company.score`: Score (number)
- `company.fields`: Fields
- `company.fields.other`: Other
- `company.fields.all`: All
- `company.fields.all.id`: ID
- `company.fields.all.companyaddress1`: Company Address 1
- `company.fields.all.companyaddress2`: Company Address 2
- `company.fields.all.companyemail`: Company Email (email)
- `company.fields.all.companyphone`: Company Phone
- `company.fields.all.companycity`: Company City
- `company.fields.all.companystate`: Company State
- `company.fields.all.companyzipcode`: Company Zip Code
- `company.fields.all.companycountry`: Company Country
- `company.fields.all.companyname`: Company Name
- `company.fields.all.companywebsite`: Company Website (url)
- `company.fields.all.companynumber_of_employees`: Company Number of Employees (number)
- `company.fields.all.companyfax`: Company Fax
- `company.fields.all.companyannual_revenue`: Company Annual Revenue
- `company.fields.all.companyindustry`: Company Industry
- `company.fields.all.companydescription`: Company Description

### `mautic_add_contact_to_company`

**Add Contact to Company.** Links a contact to a company. Repeating it leaves the link as is. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Company Id. Numeric company id, from List Companies or Create Company. |
| `contactId` | string | yes |  | Contact Id. Numeric contact id, from List Contacts. |

Output fields:

- `success`: Success (number)

### `mautic_remove_contact_from_company`

**Remove Contact from Company.** Unlinks a contact from a company. Repeating it leaves the contact unlinked. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Company Id. Numeric company id, from List Companies or Create Company. |
| `contactId` | string | yes |  | Contact Id. Numeric contact id, from List Contacts. |

Output fields:

- `success`: Success (number)

### `mautic_batch_create_companies`

**Batch Create Companies.** Creates up to 200 companies in one request. Each record is an object of field values keyed by alias and needs "companyname", e.g. {"companyname": "Acme", "companywebsite": "https://acme.com"}. Per-record errors are in the response. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `records` | array | yes |  | Records. Companies to create, each an object of field values keyed by field alias. |

Output fields:

- `companies`: Companies
- `companies[].id`: ID (number)
- `companies[].score`: Score (number)
- `companies[].fields`: Fields
- `companies[].fields.all`: All
- `companies[].fields.all.id`: ID (number)
- `companies[].fields.all.companyaddress1`: Company Address 1
- `companies[].fields.all.companyaddress2`: Company Address 2
- `companies[].fields.all.companyemail`: Company Email
- `companies[].fields.all.companyphone`: Company Phone
- `companies[].fields.all.companycity`: Company City
- `companies[].fields.all.companystate`: Company State
- `companies[].fields.all.companyzipcode`: Company Zip Code
- `companies[].fields.all.companycountry`: Company Country
- `companies[].fields.all.companyname`: Company Name
- `companies[].fields.all.companywebsite`: Company Website
- `companies[].fields.all.companynumber_of_employees`: Company Number of Employees
- `companies[].fields.all.companyfax`: Company Fax
- `companies[].fields.all.companyannual_revenue`: Company Annual Revenue
- `companies[].fields.all.companyindustry`: Company Industry
- `companies[].fields.all.companydescription`: Company Description
- `statusCodes`: Status Codes

### `mautic_batch_update_companies`

**Batch Update Companies.** Updates up to 200 companies in one request. Each record has the company "id" plus only the fields to change; other fields are left alone. Per-record errors are in the response. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `records` | array | yes |  | Records. Companies to update, each an object with "id" and the field values to change, keyed by field alias. |

Output fields:

- `companies`: Companies
- `companies[].id`: ID (number)
- `companies[].score`: Score (number)
- `companies[].fields`: Fields
- `companies[].fields.other`: Other
- `companies[].fields.all`: All
- `companies[].fields.all.id`: ID (number)
- `companies[].fields.all.companyemail`: Company Email
- `companies[].fields.all.companyaddress1`: Company Address 1
- `companies[].fields.all.companyaddress2`: Company Address 2
- `companies[].fields.all.companyphone`: Company Phone
- `companies[].fields.all.companycity`: Company City
- `companies[].fields.all.companystate`: Company State
- `companies[].fields.all.companyzipcode`: Company Zip Code
- `companies[].fields.all.companycountry`: Company Country
- `companies[].fields.all.companyname`: Company Name
- `companies[].fields.all.companywebsite`: Company Website
- `companies[].fields.all.companyindustry`: Company Industry
- `companies[].fields.all.companydescription`: Company Description
- `companies[].fields.all.companynumber_of_employees`: Company Number of Employees
- `companies[].fields.all.companyfax`: Company Fax
- `companies[].fields.all.companyannual_revenue`: Company Annual Revenue
- `statusCodes`: Status Codes

### `mautic_batch_delete_companies`

**Batch Delete Companies.** Permanently deletes up to 200 companies by id in one request. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ids` | array | yes |  | Company Ids. Numeric company ids, from List Companies. |

Output fields:

- `companies`: Companies
- `companies[].id`: ID (number)
- `companies[].score`: Score (number)
- `companies[].fields`: Fields
- `companies[].fields.other`: Other
- `companies[].fields.all`: All
- `companies[].fields.all.id`: ID (number)
- `companies[].fields.all.companyemail`: Company Email
- `companies[].fields.all.companyaddress1`: Company Address 1
- `companies[].fields.all.companyaddress2`: Company Address 2
- `companies[].fields.all.companyphone`: Company Phone
- `companies[].fields.all.companycity`: Company City
- `companies[].fields.all.companystate`: Company State
- `companies[].fields.all.companyzipcode`: Company Zip Code
- `companies[].fields.all.companycountry`: Company Country
- `companies[].fields.all.companyname`: Company Name
- `companies[].fields.all.companywebsite`: Company Website
- `companies[].fields.all.companyindustry`: Company Industry
- `companies[].fields.all.companydescription`: Company Description
- `companies[].fields.all.companynumber_of_employees`: Company Number of Employees
- `companies[].fields.all.companyfax`: Company Fax
- `companies[].fields.all.companyannual_revenue`: Company Annual Revenue

### `mautic_list_segments`

**List Segments.** Lists segments (contact lists) with their filters. Use Search for free text or Where for exact column conditions. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `lists`: Lists
- `lists[].isPublished`: Published (boolean)
- `lists[].dateAdded`: Date Added (datetime)
- `lists[].dateModified`: Date Modified
- `lists[].id`: ID (number)
- `lists[].name`: Name
- `lists[].publicName`: Public Name
- `lists[].alias`: Alias
- `lists[].description`: Description
- `lists[].category`: Category
- `lists[].category.id`: ID (number)
- `lists[].category.title`: Title
- `lists[].category.alias`: Alias
- `lists[].category.description`: Description
- `lists[].category.color`: Color
- `lists[].category.bundle`: Bundle
- `lists[].filters`: Filters
- `lists[].filters[].glue`: Glue
- `lists[].filters[].field`: Field
- `lists[].filters[].object`: Object
- `lists[].filters[].type`: Type
- `lists[].filters[].operator`: Operator
- `lists[].filters[].properties`: Properties
- `lists[].filters[].properties.filter`: Filter
- `lists[].isGlobal`: Is Global (boolean)
- `lists[].isPreferenceCenter`: Is Preference Center (boolean)

### `mautic_get_segment`

**Get Segment.** Gets a single segment by its numeric id, with its filters. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Segment Id. Numeric segment id, from List Segments or Create Segment. |

Output fields:

- `list`: List
- `list.isPublished`: Published (boolean)
- `list.dateAdded`: Date Added (datetime)
- `list.dateModified`: Date Modified (datetime)
- `list.id`: ID (number)
- `list.name`: Name
- `list.publicName`: Public Name
- `list.alias`: Alias
- `list.description`: Description
- `list.category`: Category
- `list.category.id`: ID (number)
- `list.category.title`: Title
- `list.category.alias`: Alias
- `list.category.description`: Description
- `list.category.color`: Color
- `list.category.bundle`: Bundle
- `list.filters`: Filters
- `list.filters[].glue`: Glue
- `list.filters[].field`: Field
- `list.filters[].object`: Object
- `list.filters[].type`: Type
- `list.filters[].operator`: Operator
- `list.filters[].properties`: Properties
- `list.filters[].properties.filter`: Filter
- `list.isGlobal`: Is Global (boolean)
- `list.isPreferenceCenter`: Is Preference Center (boolean)

### `mautic_create_segment`

**Create Segment.** Creates a segment. Name is required. Add Filters to make it dynamic, or leave them out and add contacts with Add Contact to Segment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `alias` | string | no |  | Alias. Unique alias; generated from the name when empty. |
| `publicName` | string | no |  | Public Name. Name shown to contacts in the preference center. |
| `description` | string | no |  | Description. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `isGlobal` | string | no |  | Global. Whether other users can use the segment. One of `true`, `false`. |
| `isPreferenceCenter` | string | no |  | Preference Center. Whether contacts can join or leave it in the preference center. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `filters` | array | no |  | Filters. Segment filters, each an object such as {"glue": "and", "field": "email", "object": "lead", "type": "email", "operator": "like", "properties": {"filter": "%@example.com"}}. Without filters the segment has only manually added contacts. |
| `additionalFields` | JSON | no |  | Additional Fields. Other segment properties from the Mautic segment API. The dedicated props above win over the same keys here. |

Output fields:

- `list`: List
- `list.isPublished`: Published (boolean)
- `list.dateAdded`: Date Added (datetime)
- `list.dateModified`: Date Modified
- `list.id`: ID (number)
- `list.name`: Name
- `list.publicName`: Public Name
- `list.alias`: Alias
- `list.description`: Description
- `list.category`: Category
- `list.category.id`: ID (number)
- `list.category.title`: Title
- `list.category.alias`: Alias
- `list.category.description`: Description
- `list.category.color`: Color
- `list.category.bundle`: Bundle
- `list.filters`: Filters
- `list.filters[].glue`: Glue
- `list.filters[].field`: Field
- `list.filters[].object`: Object
- `list.filters[].type`: Type
- `list.filters[].operator`: Operator
- `list.filters[].properties`: Properties
- `list.filters[].properties.filter`: Filter
- `list.isGlobal`: Is Global (boolean)
- `list.isPreferenceCenter`: Is Preference Center (boolean)

### `mautic_update_segment`

**Update Segment.** Updates an existing segment. Filters, when given, replace the existing filters. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Segment Id. Numeric segment id, from List Segments or Create Segment. |
| `name` | string | no |  | Name. |
| `alias` | string | no |  | Alias. Unique alias; generated from the name when empty. |
| `publicName` | string | no |  | Public Name. Name shown to contacts in the preference center. |
| `description` | string | no |  | Description. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `isGlobal` | string | no |  | Global. Whether other users can use the segment. One of `true`, `false`. |
| `isPreferenceCenter` | string | no |  | Preference Center. Whether contacts can join or leave it in the preference center. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `filters` | array | no |  | Filters. Segment filters, each an object such as {"glue": "and", "field": "email", "object": "lead", "type": "email", "operator": "like", "properties": {"filter": "%@example.com"}}. Without filters the segment has only manually added contacts. |
| `additionalFields` | JSON | no |  | Additional Fields. Other segment properties from the Mautic segment API. The dedicated props above win over the same keys here. |

Output fields:

- `list`: List
- `list.isPublished`: Published (boolean)
- `list.dateAdded`: Date Added (datetime)
- `list.dateModified`: Date Modified (datetime)
- `list.id`: ID (number)
- `list.name`: Name
- `list.publicName`: Public Name
- `list.alias`: Alias
- `list.description`: Description
- `list.category`: Category
- `list.category.id`: ID (number)
- `list.category.title`: Title
- `list.category.alias`: Alias
- `list.category.description`: Description
- `list.category.color`: Color
- `list.category.bundle`: Bundle
- `list.filters`: Filters
- `list.filters[].object`: Object
- `list.filters[].glue`: Glue
- `list.filters[].field`: Field
- `list.filters[].type`: Type
- `list.filters[].operator`: Operator
- `list.filters[].properties`: Properties
- `list.filters[].properties.filter`: Filter
- `list.filters[].filter`: Filter
- `list.filters[].display`: Display
- `list.isGlobal`: Is Global (boolean)
- `list.isPreferenceCenter`: Is Preference Center (boolean)

### `mautic_delete_segment`

**Delete Segment.** Permanently deletes a segment. Its contacts are kept. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Segment Id. Numeric segment id, from List Segments or Create Segment. |

Output fields:

- `list`: List
- `list.isPublished`: Published (boolean)
- `list.dateAdded`: Date Added (datetime)
- `list.dateModified`: Date Modified (datetime)
- `list.id`: ID
- `list.name`: Name
- `list.publicName`: Public Name
- `list.alias`: Alias
- `list.description`: Description
- `list.category`: Category
- `list.category.id`: ID (number)
- `list.category.title`: Title
- `list.category.alias`: Alias
- `list.category.description`: Description
- `list.category.color`: Color
- `list.category.bundle`: Bundle
- `list.filters`: Filters
- `list.filters[].object`: Object
- `list.filters[].glue`: Glue
- `list.filters[].field`: Field
- `list.filters[].type`: Type
- `list.filters[].operator`: Operator
- `list.filters[].properties`: Properties
- `list.filters[].properties.filter`: Filter
- `list.filters[].filter`: Filter
- `list.filters[].display`: Display
- `list.isGlobal`: Is Global (boolean)
- `list.isPreferenceCenter`: Is Preference Center (boolean)

### `mautic_add_contact_to_segment`

**Add Contact to Segment.** Adds one contact to a segment manually. Repeating it leaves the contact in the segment. Use Add Contacts to Segment for many. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Segment Id. Numeric segment id, from List Segments or Create Segment. |
| `contactId` | string | yes |  | Contact Id. Numeric contact id, from List Contacts. |

Output fields:

- `success`: Success (number)

### `mautic_remove_contact_from_segment`

**Remove Contact from Segment.** Removes a contact from a segment manually; a filter-based segment will not add it back. Repeating it leaves the contact out. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Segment Id. Numeric segment id, from List Segments or Create Segment. |
| `contactId` | string | yes |  | Contact Id. Numeric contact id, from List Contacts. |

Output fields:

- `success`: Success (number)

### `mautic_add_contacts_to_segment`

**Add Contacts to Segment.** Adds many contacts to a segment in one request. The response reports success per contact id. Repeating it leaves the contacts in the segment. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Segment Id. Numeric segment id, from List Segments or Create Segment. |
| `contactIds` | array | yes |  | Contact Ids. Numeric contact ids, from List Contacts. |

Output fields:

- `success`: Success (number)
- `details`: Details (an object whose keys vary)

### `mautic_list_campaigns`

**List Campaigns.** Lists campaigns with their events. Use Search for free text or Where for exact column conditions. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `campaigns`: Campaigns
- `campaigns[].isPublished`: Published (boolean)
- `campaigns[].dateAdded`: Date Added (datetime)
- `campaigns[].dateModified`: Date Modified
- `campaigns[].id`: ID (number)
- `campaigns[].name`: Name
- `campaigns[].category`: Category
- `campaigns[].category.id`: ID (number)
- `campaigns[].category.title`: Title
- `campaigns[].category.alias`: Alias
- `campaigns[].category.description`: Description
- `campaigns[].category.color`: Color
- `campaigns[].category.bundle`: Bundle
- `campaigns[].description`: Description
- `campaigns[].allowRestart`: Allow Restart (boolean)
- `campaigns[].publishUp`: Publish Up (datetime)
- `campaigns[].publishDown`: Publish Down (datetime)
- `campaigns[].events`: Events
- `campaigns[].events[].id`: ID (number)
- `campaigns[].events[].name`: Name
- `campaigns[].events[].description`: Description
- `campaigns[].events[].type`: Type
- `campaigns[].events[].eventType`: Event Type
- `campaigns[].events[].channel`: Channel
- `campaigns[].events[].channelId`: Channel ID
- `campaigns[].events[].order`: Order (number)
- `campaigns[].events[].properties`: Properties
- `campaigns[].events[].properties.points`: Points (number)
- `campaigns[].events[].triggerDate`: Trigger Date
- `campaigns[].events[].triggerInterval`: Trigger Interval (number)
- `campaigns[].events[].triggerIntervalUnit`: Trigger Interval Unit
- `campaigns[].events[].triggerHour`: Trigger Hour
- `campaigns[].events[].triggerRestrictedStartHour`: Trigger Restricted Start Hour
- `campaigns[].events[].triggerRestrictedStopHour`: Trigger Restricted Stop Hour
- `campaigns[].events[].triggerRestrictedDaysOfWeek`: Trigger Restricted Days Of Week
- `campaigns[].events[].triggerMode`: Trigger Mode
- `campaigns[].events[].decisionPath`: Decision Path
- `campaigns[].events[].parent`: Parent
- `campaigns[].events[].children`: Children
- `campaigns[].forms`: Forms
- `campaigns[].lists`: Lists
- `campaigns[].lists[].id`: ID (number)
- `campaigns[].lists[].name`: Name
- `campaigns[].lists[].publicName`: Public Name
- `campaigns[].lists[].alias`: Alias
- `campaigns[].lists[].description`: Description
- `campaigns[].lists[].category`: Category
- `campaigns[].lists[].category.id`: ID (number)
- `campaigns[].lists[].category.title`: Title
- `campaigns[].lists[].category.alias`: Alias
- `campaigns[].lists[].category.description`: Description
- `campaigns[].lists[].category.color`: Color
- `campaigns[].lists[].category.bundle`: Bundle
- `campaigns[].canvasSettings`: Canvas Settings
- `campaigns[].canvasSettings.nodes`: Nodes
- `campaigns[].canvasSettings.nodes[].id`: ID
- `campaigns[].canvasSettings.nodes[].positionX`: Position X
- `campaigns[].canvasSettings.nodes[].positionY`: Position Y
- `campaigns[].canvasSettings.connections`: Connections
- `campaigns[].canvasSettings.connections[].anchors`: Anchors
- `campaigns[].canvasSettings.connections[].anchors.source`: Source
- `campaigns[].canvasSettings.connections[].anchors.target`: Target
- `campaigns[].canvasSettings.connections[].sourceId`: Source ID
- `campaigns[].canvasSettings.connections[].targetId`: Target ID

### `mautic_get_campaign`

**Get Campaign.** Gets a single campaign by its numeric id, with its events, segments and forms. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Campaign Id. Numeric campaign id, from List Campaigns or Create Campaign. |

Output fields:

- `campaign`: Campaign
- `campaign.isPublished`: Published (boolean)
- `campaign.dateAdded`: Date Added (datetime)
- `campaign.dateModified`: Date Modified (datetime)
- `campaign.id`: ID (number)
- `campaign.name`: Name
- `campaign.category`: Category
- `campaign.category.id`: ID (number)
- `campaign.category.title`: Title
- `campaign.category.alias`: Alias
- `campaign.category.description`: Description
- `campaign.category.color`: Color
- `campaign.category.bundle`: Bundle
- `campaign.description`: Description
- `campaign.allowRestart`: Allow Restart (boolean)
- `campaign.publishUp`: Publish Up (datetime)
- `campaign.publishDown`: Publish Down (datetime)
- `campaign.events`: Events
- `campaign.events[].id`: ID (number)
- `campaign.events[].name`: Name
- `campaign.events[].description`: Description
- `campaign.events[].type`: Type
- `campaign.events[].eventType`: Event Type
- `campaign.events[].channel`: Channel
- `campaign.events[].channelId`: Channel ID
- `campaign.events[].order`: Order (number)
- `campaign.events[].properties`: Properties
- `campaign.events[].properties.points`: Points (number)
- `campaign.events[].triggerDate`: Trigger Date
- `campaign.events[].triggerInterval`: Trigger Interval (number)
- `campaign.events[].triggerIntervalUnit`: Trigger Interval Unit
- `campaign.events[].triggerHour`: Trigger Hour
- `campaign.events[].triggerRestrictedStartHour`: Trigger Restricted Start Hour
- `campaign.events[].triggerRestrictedStopHour`: Trigger Restricted Stop Hour
- `campaign.events[].triggerRestrictedDaysOfWeek`: Trigger Restricted Days Of Week
- `campaign.events[].triggerMode`: Trigger Mode
- `campaign.events[].decisionPath`: Decision Path
- `campaign.events[].parent`: Parent
- `campaign.events[].children`: Children
- `campaign.forms`: Forms
- `campaign.lists`: Lists
- `campaign.lists[].id`: ID (number)
- `campaign.lists[].name`: Name
- `campaign.lists[].publicName`: Public Name
- `campaign.lists[].alias`: Alias
- `campaign.lists[].description`: Description
- `campaign.lists[].category`: Category
- `campaign.lists[].category.id`: ID (number)
- `campaign.lists[].category.title`: Title
- `campaign.lists[].category.alias`: Alias
- `campaign.lists[].category.description`: Description
- `campaign.lists[].category.color`: Color
- `campaign.lists[].category.bundle`: Bundle
- `campaign.canvasSettings`: Canvas Settings
- `campaign.canvasSettings.nodes`: Nodes
- `campaign.canvasSettings.nodes[].id`: ID
- `campaign.canvasSettings.nodes[].positionX`: Position X
- `campaign.canvasSettings.nodes[].positionY`: Position Y
- `campaign.canvasSettings.connections`: Connections
- `campaign.canvasSettings.connections[].anchors`: Anchors
- `campaign.canvasSettings.connections[].anchors.source`: Source
- `campaign.canvasSettings.connections[].anchors.target`: Target
- `campaign.canvasSettings.connections[].sourceId`: Source ID
- `campaign.canvasSettings.connections[].targetId`: Target ID

### `mautic_create_campaign`

**Create Campaign.** Creates a campaign. Name, at least one event and a contact source (a segment in "lists" or a form in "forms") are required; Mautic rejects a campaign without them. Events, source segments and forms go in Additional Fields, e.g. {"events": [{"id": "new1", "name": "Add points", "type": "lead.changepoints", "eventType": "action", "order": 1, "properties": {"points": 1}, "triggerMode": "immediate"}], "lists": [{"id": 1}], "canvasSettings": {"nodes": [...], "connections": [...]}}. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `allowRestart` | string | no |  | Allow Restart. Whether contacts can go through the campaign more than once. One of `true`, `false`. |
| `publishUp` | string | no |  | Publish Up. Start date/time, e.g. "2026-01-01 09:00:00". |
| `publishDown` | string | no |  | Publish Down. End date/time, e.g. "2026-12-31 18:00:00". |
| `additionalFields` | JSON | no |  | Additional Fields. Other campaign properties, such as "events", "lists" (segment ids as [{"id": 1}]), "forms" and "canvasSettings", in the shape Get Campaign returns. The dedicated props above win over the same keys here. |

Output fields:

- `campaign`: Campaign
- `campaign.isPublished`: Published (boolean)
- `campaign.dateAdded`: Date Added (datetime)
- `campaign.dateModified`: Date Modified
- `campaign.id`: ID (number)
- `campaign.name`: Name
- `campaign.category`: Category
- `campaign.category.id`: ID (number)
- `campaign.category.title`: Title
- `campaign.category.alias`: Alias
- `campaign.category.description`: Description
- `campaign.category.color`: Color
- `campaign.category.bundle`: Bundle
- `campaign.description`: Description
- `campaign.allowRestart`: Allow Restart (boolean)
- `campaign.publishUp`: Publish Up (datetime)
- `campaign.publishDown`: Publish Down (datetime)
- `campaign.events`: Events
- `campaign.events[].id`: ID (number)
- `campaign.events[].name`: Name
- `campaign.events[].description`: Description
- `campaign.events[].type`: Type
- `campaign.events[].eventType`: Event Type
- `campaign.events[].channel`: Channel
- `campaign.events[].channelId`: Channel ID
- `campaign.events[].order`: Order (number)
- `campaign.events[].properties`: Properties
- `campaign.events[].properties.points`: Points (number)
- `campaign.events[].triggerDate`: Trigger Date
- `campaign.events[].triggerInterval`: Trigger Interval (number)
- `campaign.events[].triggerIntervalUnit`: Trigger Interval Unit
- `campaign.events[].triggerHour`: Trigger Hour
- `campaign.events[].triggerRestrictedStartHour`: Trigger Restricted Start Hour
- `campaign.events[].triggerRestrictedStopHour`: Trigger Restricted Stop Hour
- `campaign.events[].triggerRestrictedDaysOfWeek`: Trigger Restricted Days Of Week
- `campaign.events[].triggerMode`: Trigger Mode
- `campaign.events[].decisionPath`: Decision Path
- `campaign.events[].parent`: Parent
- `campaign.events[].children`: Children
- `campaign.forms`: Forms
- `campaign.lists`: Lists
- `campaign.lists[].id`: ID (number)
- `campaign.lists[].name`: Name
- `campaign.lists[].publicName`: Public Name
- `campaign.lists[].alias`: Alias
- `campaign.lists[].description`: Description
- `campaign.lists[].category`: Category
- `campaign.lists[].category.id`: ID (number)
- `campaign.lists[].category.title`: Title
- `campaign.lists[].category.alias`: Alias
- `campaign.lists[].category.description`: Description
- `campaign.lists[].category.color`: Color
- `campaign.lists[].category.bundle`: Bundle
- `campaign.canvasSettings`: Canvas Settings
- `campaign.canvasSettings.nodes`: Nodes
- `campaign.canvasSettings.nodes[].id`: ID
- `campaign.canvasSettings.nodes[].positionX`: Position X
- `campaign.canvasSettings.nodes[].positionY`: Position Y
- `campaign.canvasSettings.connections`: Connections
- `campaign.canvasSettings.connections[].anchors`: Anchors
- `campaign.canvasSettings.connections[].anchors.source`: Source
- `campaign.canvasSettings.connections[].anchors.target`: Target
- `campaign.canvasSettings.connections[].sourceId`: Source ID
- `campaign.canvasSettings.connections[].targetId`: Target ID

### `mautic_update_campaign`

**Update Campaign.** Updates an existing campaign, e.g. to publish or unpublish it. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Campaign Id. Numeric campaign id, from List Campaigns or Create Campaign. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `allowRestart` | string | no |  | Allow Restart. Whether contacts can go through the campaign more than once. One of `true`, `false`. |
| `publishUp` | string | no |  | Publish Up. Start date/time, e.g. "2026-01-01 09:00:00". |
| `publishDown` | string | no |  | Publish Down. End date/time, e.g. "2026-12-31 18:00:00". |
| `additionalFields` | JSON | no |  | Additional Fields. Other campaign properties, such as "events", "lists" (segment ids as [{"id": 1}]), "forms" and "canvasSettings", in the shape Get Campaign returns. The dedicated props above win over the same keys here. |

Output fields:

- `campaign`: Campaign
- `campaign.isPublished`: Published (boolean)
- `campaign.dateAdded`: Date Added (datetime)
- `campaign.dateModified`: Date Modified (datetime)
- `campaign.id`: ID (number)
- `campaign.name`: Name
- `campaign.category`: Category
- `campaign.category.id`: ID (number)
- `campaign.category.title`: Title
- `campaign.category.alias`: Alias
- `campaign.category.description`: Description
- `campaign.category.color`: Color
- `campaign.category.bundle`: Bundle
- `campaign.description`: Description
- `campaign.allowRestart`: Allow Restart (boolean)
- `campaign.publishUp`: Publish Up (datetime)
- `campaign.publishDown`: Publish Down (datetime)
- `campaign.events`: Events
- `campaign.events[].id`: ID (number)
- `campaign.events[].name`: Name
- `campaign.events[].description`: Description
- `campaign.events[].type`: Type
- `campaign.events[].eventType`: Event Type
- `campaign.events[].channel`: Channel
- `campaign.events[].channelId`: Channel ID
- `campaign.events[].order`: Order (number)
- `campaign.events[].properties`: Properties
- `campaign.events[].properties.points`: Points (number)
- `campaign.events[].triggerDate`: Trigger Date
- `campaign.events[].triggerInterval`: Trigger Interval (number)
- `campaign.events[].triggerIntervalUnit`: Trigger Interval Unit
- `campaign.events[].triggerHour`: Trigger Hour
- `campaign.events[].triggerRestrictedStartHour`: Trigger Restricted Start Hour
- `campaign.events[].triggerRestrictedStopHour`: Trigger Restricted Stop Hour
- `campaign.events[].triggerRestrictedDaysOfWeek`: Trigger Restricted Days Of Week
- `campaign.events[].triggerMode`: Trigger Mode
- `campaign.events[].decisionPath`: Decision Path
- `campaign.events[].parent`: Parent
- `campaign.events[].children`: Children
- `campaign.forms`: Forms
- `campaign.lists`: Lists
- `campaign.lists[].id`: ID (number)
- `campaign.lists[].name`: Name
- `campaign.lists[].publicName`: Public Name
- `campaign.lists[].alias`: Alias
- `campaign.lists[].description`: Description
- `campaign.lists[].category`: Category
- `campaign.lists[].category.id`: ID (number)
- `campaign.lists[].category.title`: Title
- `campaign.lists[].category.alias`: Alias
- `campaign.lists[].category.description`: Description
- `campaign.lists[].category.color`: Color
- `campaign.lists[].category.bundle`: Bundle
- `campaign.canvasSettings`: Canvas Settings
- `campaign.canvasSettings.nodes`: Nodes
- `campaign.canvasSettings.nodes[].id`: ID
- `campaign.canvasSettings.nodes[].positionX`: Position X
- `campaign.canvasSettings.nodes[].positionY`: Position Y
- `campaign.canvasSettings.connections`: Connections
- `campaign.canvasSettings.connections[].anchors`: Anchors
- `campaign.canvasSettings.connections[].anchors.source`: Source
- `campaign.canvasSettings.connections[].anchors.target`: Target
- `campaign.canvasSettings.connections[].sourceId`: Source ID
- `campaign.canvasSettings.connections[].targetId`: Target ID

### `mautic_delete_campaign`

**Delete Campaign.** Permanently deletes a campaign and its event history. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Campaign Id. Numeric campaign id, from List Campaigns or Create Campaign. |

Output fields:

- `campaign`: Campaign
- `campaign.isPublished`: Published (boolean)
- `campaign.dateAdded`: Date Added (datetime)
- `campaign.dateModified`: Date Modified (datetime)
- `campaign.id`: ID
- `campaign.name`: Name
- `campaign.category`: Category
- `campaign.category.id`: ID (number)
- `campaign.category.title`: Title
- `campaign.category.alias`: Alias
- `campaign.category.description`: Description
- `campaign.category.color`: Color
- `campaign.category.bundle`: Bundle
- `campaign.description`: Description
- `campaign.allowRestart`: Allow Restart (boolean)
- `campaign.publishUp`: Publish Up (datetime)
- `campaign.publishDown`: Publish Down (datetime)
- `campaign.events`: Events
- `campaign.forms`: Forms
- `campaign.lists`: Lists
- `campaign.canvasSettings`: Canvas Settings
- `campaign.canvasSettings.nodes`: Nodes
- `campaign.canvasSettings.nodes[].id`: ID
- `campaign.canvasSettings.nodes[].positionX`: Position X
- `campaign.canvasSettings.nodes[].positionY`: Position Y
- `campaign.canvasSettings.connections`: Connections
- `campaign.canvasSettings.connections[].anchors`: Anchors
- `campaign.canvasSettings.connections[].anchors.source`: Source
- `campaign.canvasSettings.connections[].anchors.target`: Target
- `campaign.canvasSettings.connections[].sourceId`: Source ID
- `campaign.canvasSettings.connections[].targetId`: Target ID

### `mautic_clone_campaign`

**Clone Campaign.** Creates an unpublished copy of a campaign with the same events. Each call makes another copy. Returns the new campaign. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Campaign Id. Numeric campaign id, from List Campaigns or Create Campaign. |

Output fields:

- `campaign`: Campaign
- `campaign.isPublished`: Published (boolean)
- `campaign.dateAdded`: Date Added (datetime)
- `campaign.dateModified`: Date Modified (datetime)
- `campaign.id`: ID (number)
- `campaign.name`: Name
- `campaign.category`: Category
- `campaign.category.id`: ID (number)
- `campaign.category.title`: Title
- `campaign.category.alias`: Alias
- `campaign.category.description`: Description
- `campaign.category.color`: Color
- `campaign.category.bundle`: Bundle
- `campaign.description`: Description
- `campaign.allowRestart`: Allow Restart (boolean)
- `campaign.publishUp`: Publish Up (datetime)
- `campaign.publishDown`: Publish Down (datetime)
- `campaign.events`: Events
- `campaign.forms`: Forms
- `campaign.lists`: Lists
- `campaign.canvasSettings`: Canvas Settings
- `campaign.canvasSettings.nodes`: Nodes
- `campaign.canvasSettings.nodes[].id`: ID
- `campaign.canvasSettings.nodes[].positionX`: Position X
- `campaign.canvasSettings.nodes[].positionY`: Position Y
- `campaign.canvasSettings.connections`: Connections
- `campaign.canvasSettings.connections[].anchors`: Anchors
- `campaign.canvasSettings.connections[].anchors.source`: Source
- `campaign.canvasSettings.connections[].anchors.target`: Target
- `campaign.canvasSettings.connections[].sourceId`: Source ID
- `campaign.canvasSettings.connections[].targetId`: Target ID

### `mautic_add_contact_to_campaign`

**Add Contact to Campaign.** Adds a contact to a campaign manually, so it starts receiving the campaign events. Repeating it leaves the contact in the campaign. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Campaign Id. Numeric campaign id, from List Campaigns or Create Campaign. |
| `contactId` | string | yes |  | Contact Id. Numeric contact id, from List Contacts. |

Output fields:

- `success`: Success (number)

### `mautic_remove_contact_from_campaign`

**Remove Contact from Campaign.** Removes a contact from a campaign manually; it stops receiving the campaign events. Repeating it leaves the contact out. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Campaign Id. Numeric campaign id, from List Campaigns or Create Campaign. |
| `contactId` | string | yes |  | Contact Id. Numeric contact id, from List Contacts. |

Output fields:

- `success`: Success (number)

### `mautic_list_campaign_contacts`

**List Campaign Contacts.** Lists the contacts in a campaign with their membership dates (contact ids, not full records; use Get Contact for details). Page with Start and Limit. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Campaign Id. Numeric campaign id, from List Campaigns or Create Campaign. |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |

Output fields:

- `total`: Total
- `contacts`: Contacts
- `contacts[].campaign_id`: Campaign ID
- `contacts[].lead_id`: Lead ID
- `contacts[].date_added`: Date Added (datetime)
- `contacts[].manually_removed`: Manually Removed
- `contacts[].manually_added`: Manually Added
- `contacts[].rotation`: Rotation

### `mautic_list_campaign_events`

**List Campaign Events.** Lists the events (actions, decisions and conditions) across all campaigns, with their campaign. Use Where on "campaign" to narrow to one campaign. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |

Output fields:

- `total`: Total (number)
- `events`: Events
- `events[].id`: ID (number)
- `events[].name`: Name
- `events[].description`: Description
- `events[].type`: Type
- `events[].eventType`: Event Type
- `events[].channel`: Channel
- `events[].channelId`: Channel ID
- `events[].order`: Order (number)
- `events[].properties`: Properties
- `events[].properties.points`: Points (number)
- `events[].triggerDate`: Trigger Date
- `events[].triggerInterval`: Trigger Interval (number)
- `events[].triggerIntervalUnit`: Trigger Interval Unit
- `events[].triggerHour`: Trigger Hour
- `events[].triggerRestrictedStartHour`: Trigger Restricted Start Hour
- `events[].triggerRestrictedStopHour`: Trigger Restricted Stop Hour
- `events[].triggerRestrictedDaysOfWeek`: Trigger Restricted Days Of Week
- `events[].triggerMode`: Trigger Mode
- `events[].decisionPath`: Decision Path
- `events[].parent`: Parent
- `events[].children`: Children
- `events[].campaign`: Campaign
- `events[].campaign.id`: ID (number)
- `events[].campaign.name`: Name
- `events[].campaign.category`: Category
- `events[].campaign.description`: Description

### `mautic_get_campaign_event`

**Get Campaign Event.** Gets a single campaign event by id, with its type, trigger settings and properties. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Event Id. Numeric event id, from List Campaign Events or Get Campaign. |

Output fields:

- `event`: Event
- `event.id`: ID (number)
- `event.name`: Name
- `event.description`: Description
- `event.type`: Type
- `event.eventType`: Event Type
- `event.channel`: Channel
- `event.channelId`: Channel ID
- `event.order`: Order (number)
- `event.properties`: Properties
- `event.properties.points`: Points (number)
- `event.triggerDate`: Trigger Date
- `event.triggerInterval`: Trigger Interval (number)
- `event.triggerIntervalUnit`: Trigger Interval Unit
- `event.triggerHour`: Trigger Hour
- `event.triggerRestrictedStartHour`: Trigger Restricted Start Hour
- `event.triggerRestrictedStopHour`: Trigger Restricted Stop Hour
- `event.triggerRestrictedDaysOfWeek`: Trigger Restricted Days Of Week
- `event.triggerMode`: Trigger Mode
- `event.decisionPath`: Decision Path
- `event.parent`: Parent
- `event.children`: Children
- `event.campaign`: Campaign
- `event.campaign.id`: ID (number)
- `event.campaign.name`: Name
- `event.campaign.category`: Category
- `event.campaign.description`: Description

### `mautic_list_contact_campaign_events`

**List Contact Campaign Events.** Lists every campaign event a contact has been through or is scheduled for, across all campaigns, with the log of each. Use List Campaign Contact Events for one campaign. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact Id. Numeric contact id, from List Contacts. |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |

Output fields:

- `total`: Total (number)
- `events`: Events

### `mautic_list_campaign_contact_events`

**List Campaign Contact Events.** Lists the events of one campaign that a contact has been through or is scheduled for, with the log of each and the contact's membership. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Campaign Id. Numeric campaign id, from List Campaigns or Create Campaign. |
| `contactId` | string | yes |  | Contact Id. Numeric contact id, from List Contacts. |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |

Output fields:

- `total`: Total (number)
- `events`: Events
- `events[].id`: ID (number)
- `events[].name`: Name
- `events[].description`: Description
- `events[].type`: Type
- `events[].eventType`: Event Type
- `events[].channel`: Channel
- `events[].channelId`: Channel ID
- `events[].order`: Order (number)
- `events[].triggerDate`: Trigger Date
- `events[].triggerInterval`: Trigger Interval (number)
- `events[].triggerIntervalUnit`: Trigger Interval Unit
- `events[].triggerHour`: Trigger Hour
- `events[].triggerRestrictedStartHour`: Trigger Restricted Start Hour
- `events[].triggerRestrictedStopHour`: Trigger Restricted Stop Hour
- `events[].triggerRestrictedDaysOfWeek`: Trigger Restricted Days Of Week
- `events[].triggerMode`: Trigger Mode
- `events[].decisionPath`: Decision Path
- `events[].parent`: Parent
- `events[].contactLog`: Contact Log
- `campaign`: Campaign
- `campaign.id`: ID (number)
- `campaign.name`: Name
- `campaign.category`: Category
- `campaign.description`: Description
- `membership`: Membership
- `membership[].dateAdded`: Date Added (datetime)
- `membership[].manuallyRemoved`: Manually Removed (boolean)
- `membership[].manuallyAdded`: Manually Added (boolean)
- `membership[].rotation`: Rotation (number)
- `membership[].dateLastExited`: Date Last Exited

### `mautic_reschedule_contact_campaign_event`

**Reschedule Contact Campaign Event.** Sets when a campaign action runs for a contact who is in the campaign, or marks it as already run with Date Triggered. Fails if the event already ran for the contact or is a decision. Setting the same date again changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `eventId` | string | yes |  | Event Id. Numeric campaign event id, from List Campaign Events or Get Campaign. |
| `contactId` | string | yes |  | Contact Id. Numeric contact id, from List Contacts. |
| `triggerDate` | string | no |  | Trigger Date. When the event should run, e.g. "2026-05-01 09:00:00". |
| `dateTriggered` | string | no |  | Date Triggered. Marks the event as run at this date/time instead of scheduling it. |

Output fields:

- `event`: Event
- `event.id`: ID (number)
- `event.name`: Name
- `event.description`: Description
- `event.type`: Type
- `event.eventType`: Event Type
- `event.channel`: Channel
- `event.channelId`: Channel ID
- `event.order`: Order (number)
- `event.triggerDate`: Trigger Date
- `event.triggerInterval`: Trigger Interval (number)
- `event.triggerIntervalUnit`: Trigger Interval Unit
- `event.triggerHour`: Trigger Hour
- `event.triggerRestrictedStartHour`: Trigger Restricted Start Hour
- `event.triggerRestrictedStopHour`: Trigger Restricted Stop Hour
- `event.triggerRestrictedDaysOfWeek`: Trigger Restricted Days Of Week
- `event.triggerMode`: Trigger Mode
- `event.decisionPath`: Decision Path
- `event.parent`: Parent
- `event.campaign`: Campaign
- `event.campaign.id`: ID (number)
- `event.campaign.name`: Name
- `event.campaign.category`: Category
- `event.campaign.description`: Description
- `event.campaign.allowRestart`: Allow Restart (boolean)
- `event.campaign.publishUp`: Publish Up (datetime)
- `event.campaign.publishDown`: Publish Down (datetime)
- `event.campaign.events`: Events
- `event.campaign.deleted`: Deleted
- `event.contactLog`: Contact Log
- `event.contactLog[].ipAddress`: IP Address
- `event.contactLog[].dateTriggered`: Date Triggered (datetime)
- `event.contactLog[].isScheduled`: Is Scheduled (boolean)
- `event.contactLog[].triggerDate`: Trigger Date (datetime)
- `event.contactLog[].metadata`: Metadata
- `event.contactLog[].nonActionPathTaken`: Non Action Path Taken (boolean)
- `event.contactLog[].channel`: Channel
- `event.contactLog[].channelId`: Channel ID
- `event.contactLog[].rotation`: Rotation (number)

### `mautic_batch_reschedule_contact_campaign_events`

**Batch Reschedule Contact Campaign Events.** Reschedules many contact campaign events in one request. Each record has "eventId", "contactId" and "triggerDate" (or "dateTriggered"). Per-record errors are in the response. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `records` | array | yes |  | Records. Each an object like {"eventId": 3, "contactId": 12, "triggerDate": "2026-05-01 09:00:00"}. |

Output fields:

- `events`: Events (an object whose keys vary)
- `errors`: Errors
- `errors[].code`: Code (number)
- `errors[].message`: Message
- `errors[].details`: Details
- `errors[].type`: Type

### `mautic_list_emails`

**List Emails.** Lists emails with their type, subject and sent counts. Use Search for free text or Where for exact column conditions. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `emails`: Emails
- `emails[].isPublished`: Published (boolean)
- `emails[].dateAdded`: Date Added (datetime)
- `emails[].dateModified`: Date Modified (datetime)
- `emails[].id`: ID (number)
- `emails[].name`: Name
- `emails[].subject`: Subject
- `emails[].language`: Language
- `emails[].category`: Category
- `emails[].category.id`: ID (number)
- `emails[].category.title`: Title
- `emails[].category.alias`: Alias
- `emails[].category.description`: Description
- `emails[].category.color`: Color
- `emails[].category.bundle`: Bundle
- `emails[].fromAddress`: From Address (email)
- `emails[].fromName`: From Name
- `emails[].replyToAddress`: Reply To Address (email)
- `emails[].bccAddress`: Bcc Address
- `emails[].useOwnerAsMailer`: Use Owner As Mailer
- `emails[].utmTags`: Utm Tags
- `emails[].utmTags.utmSource`: Utm Source
- `emails[].utmTags.utmMedium`: Utm Medium
- `emails[].utmTags.utmCampaign`: Utm Campaign
- `emails[].utmTags.utmContent`: Utm Content
- `emails[].preheaderText`: Preheader Text
- `emails[].customHtml`: Custom HTML
- `emails[].plainText`: Plain Text
- `emails[].template`: Template
- `emails[].emailType`: Email Type
- `emails[].publishUp`: Publish Up
- `emails[].publishDown`: Publish Down
- `emails[].publicPreview`: Public Preview (boolean)
- `emails[].readCount`: Read Count (number)
- `emails[].sentCount`: Sent Count (number)
- `emails[].revision`: Revision (number)
- `emails[].assetAttachments`: Asset Attachments
- `emails[].variantStartDate`: Variant Start Date
- `emails[].variantSentCount`: Variant Sent Count (number)
- `emails[].variantReadCount`: Variant Read Count (number)
- `emails[].variantParent`: Variant Parent
- `emails[].variantChildren`: Variant Children
- `emails[].translationParent`: Translation Parent
- `emails[].translationChildren`: Translation Children
- `emails[].unsubscribeForm`: Unsubscribe Form
- `emails[].dynamicContent`: Dynamic Content
- `emails[].dynamicContent[].tokenName`: Token Name
- `emails[].dynamicContent[].content`: Content
- `emails[].dynamicContent[].filters`: Filters
- `emails[].dynamicContent[].filters[].content`: Content
- `emails[].dynamicContent[].filters[].filters`: Filters
- `emails[].dynamicContent[].filters[].filters[].glue`: Glue
- `emails[].dynamicContent[].filters[].filters[].field`: Field
- `emails[].dynamicContent[].filters[].filters[].object`: Object
- `emails[].dynamicContent[].filters[].filters[].type`: Type
- `emails[].dynamicContent[].filters[].filters[].operator`: Operator
- `emails[].dynamicContent[].filters[].filters[].display`: Display
- `emails[].dynamicContent[].filters[].filters[].filter`: Filter
- `emails[].lists`: Lists

### `mautic_get_email`

**Get Email.** Gets a single email by its numeric id, with content, segments and sent/read counts. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Email Id. Numeric email id, from List Emails or Create Email. |

Output fields:

- `email`: Email
- `email.isPublished`: Published (boolean)
- `email.dateAdded`: Date Added (datetime)
- `email.dateModified`: Date Modified (datetime)
- `email.id`: ID (number)
- `email.name`: Name
- `email.subject`: Subject
- `email.language`: Language
- `email.category`: Category
- `email.category.id`: ID (number)
- `email.category.title`: Title
- `email.category.alias`: Alias
- `email.category.description`: Description
- `email.category.color`: Color
- `email.category.bundle`: Bundle
- `email.fromAddress`: From Address (email)
- `email.fromName`: From Name
- `email.replyToAddress`: Reply To Address (email)
- `email.bccAddress`: Bcc Address
- `email.useOwnerAsMailer`: Use Owner As Mailer
- `email.utmTags`: Utm Tags
- `email.utmTags.utmSource`: Utm Source
- `email.utmTags.utmMedium`: Utm Medium
- `email.utmTags.utmCampaign`: Utm Campaign
- `email.utmTags.utmContent`: Utm Content
- `email.preheaderText`: Preheader Text
- `email.customHtml`: Custom HTML
- `email.plainText`: Plain Text
- `email.template`: Template
- `email.emailType`: Email Type
- `email.publishUp`: Publish Up
- `email.publishDown`: Publish Down
- `email.publicPreview`: Public Preview (boolean)
- `email.readCount`: Read Count (number)
- `email.sentCount`: Sent Count (number)
- `email.revision`: Revision (number)
- `email.assetAttachments`: Asset Attachments
- `email.variantStartDate`: Variant Start Date
- `email.variantSentCount`: Variant Sent Count (number)
- `email.variantReadCount`: Variant Read Count (number)
- `email.variantParent`: Variant Parent
- `email.variantChildren`: Variant Children
- `email.translationParent`: Translation Parent
- `email.translationChildren`: Translation Children
- `email.unsubscribeForm`: Unsubscribe Form
- `email.dynamicContent`: Dynamic Content
- `email.dynamicContent[].tokenName`: Token Name
- `email.dynamicContent[].content`: Content
- `email.dynamicContent[].filters`: Filters
- `email.dynamicContent[].filters[].content`: Content
- `email.dynamicContent[].filters[].filters`: Filters
- `email.dynamicContent[].filters[].filters[].glue`: Glue
- `email.dynamicContent[].filters[].filters[].field`: Field
- `email.dynamicContent[].filters[].filters[].object`: Object
- `email.dynamicContent[].filters[].filters[].type`: Type
- `email.dynamicContent[].filters[].filters[].operator`: Operator
- `email.dynamicContent[].filters[].filters[].display`: Display
- `email.dynamicContent[].filters[].filters[].filter`: Filter
- `email.lists`: Lists

### `mautic_create_email`

**Create Email.** Creates an email. Name and Subject are required; set Email Type to "list" with Segment Ids for a segment email. Mautic sends it from campaigns, or as a segment email from the Mautic app. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Internal name of the email. |
| `subject` | string | yes |  | Subject. |
| `customHtml` | string | no |  | HTML Body. Full HTML content. Tokens like {contactfield=firstname} are replaced per contact. |
| `plainText` | string | no |  | Plain Text Body. |
| `emailType` | string | no |  | Email Type. Template emails go to single contacts and from campaigns; segment emails go to their segments. One of `"template"`, `"list"`. |
| `lists` | array | no |  | Segment Ids. Segment ids a segment email is sent to, from List Segments. |
| `fromAddress` | string | no |  | From Address. |
| `fromName` | string | no |  | From Name. |
| `replyToAddress` | string | no |  | Reply-To Address. |
| `preheaderText` | string | no |  | Preheader Text. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `language` | string | no |  | Language. Locale code, e.g. "en". |
| `additionalFields` | JSON | no |  | Additional Fields. Other email properties, e.g. "bccAddress", "utmTags", "publishUp", "assetAttachments", "headers", "template". The dedicated props above win over the same keys here. |

Output fields:

- `email`: Email
- `email.isPublished`: Published (boolean)
- `email.dateAdded`: Date Added (datetime)
- `email.dateModified`: Date Modified (datetime)
- `email.id`: ID (number)
- `email.name`: Name
- `email.subject`: Subject
- `email.language`: Language
- `email.category`: Category
- `email.category.id`: ID (number)
- `email.category.title`: Title
- `email.category.alias`: Alias
- `email.category.description`: Description
- `email.category.color`: Color
- `email.category.bundle`: Bundle
- `email.fromAddress`: From Address (email)
- `email.fromName`: From Name
- `email.replyToAddress`: Reply To Address (email)
- `email.bccAddress`: Bcc Address
- `email.useOwnerAsMailer`: Use Owner As Mailer
- `email.utmTags`: Utm Tags
- `email.utmTags.utmSource`: Utm Source
- `email.utmTags.utmMedium`: Utm Medium
- `email.utmTags.utmCampaign`: Utm Campaign
- `email.utmTags.utmContent`: Utm Content
- `email.preheaderText`: Preheader Text
- `email.customHtml`: Custom HTML
- `email.plainText`: Plain Text
- `email.template`: Template
- `email.emailType`: Email Type
- `email.publishUp`: Publish Up
- `email.publishDown`: Publish Down
- `email.publicPreview`: Public Preview (boolean)
- `email.readCount`: Read Count (number)
- `email.sentCount`: Sent Count (number)
- `email.revision`: Revision (number)
- `email.assetAttachments`: Asset Attachments
- `email.variantStartDate`: Variant Start Date
- `email.variantSentCount`: Variant Sent Count (number)
- `email.variantReadCount`: Variant Read Count (number)
- `email.variantParent`: Variant Parent
- `email.variantChildren`: Variant Children
- `email.translationParent`: Translation Parent
- `email.translationChildren`: Translation Children
- `email.unsubscribeForm`: Unsubscribe Form
- `email.dynamicContent`: Dynamic Content
- `email.dynamicContent[].tokenName`: Token Name
- `email.dynamicContent[].content`: Content
- `email.dynamicContent[].filters`: Filters
- `email.dynamicContent[].filters[].content`: Content
- `email.dynamicContent[].filters[].filters`: Filters
- `email.dynamicContent[].filters[].filters[].glue`: Glue
- `email.dynamicContent[].filters[].filters[].field`: Field
- `email.dynamicContent[].filters[].filters[].object`: Object
- `email.dynamicContent[].filters[].filters[].type`: Type
- `email.dynamicContent[].filters[].filters[].operator`: Operator
- `email.dynamicContent[].filters[].filters[].display`: Display
- `email.dynamicContent[].filters[].filters[].filter`: Filter
- `email.lists`: Lists

### `mautic_update_email`

**Update Email.** Updates an existing email. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Email Id. Numeric email id, from List Emails or Create Email. |
| `name` | string | no |  | Name. Internal name of the email. |
| `subject` | string | no |  | Subject. |
| `customHtml` | string | no |  | HTML Body. Full HTML content. Tokens like {contactfield=firstname} are replaced per contact. |
| `plainText` | string | no |  | Plain Text Body. |
| `emailType` | string | no |  | Email Type. Template emails go to single contacts and from campaigns; segment emails go to their segments. One of `"template"`, `"list"`. |
| `lists` | array | no |  | Segment Ids. Segment ids a segment email is sent to, from List Segments. |
| `fromAddress` | string | no |  | From Address. |
| `fromName` | string | no |  | From Name. |
| `replyToAddress` | string | no |  | Reply-To Address. |
| `preheaderText` | string | no |  | Preheader Text. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `language` | string | no |  | Language. Locale code, e.g. "en". |
| `additionalFields` | JSON | no |  | Additional Fields. Other email properties, e.g. "bccAddress", "utmTags", "publishUp", "assetAttachments", "headers", "template". The dedicated props above win over the same keys here. |

Output fields:

- `email`: Email
- `email.isPublished`: Published (boolean)
- `email.dateAdded`: Date Added (datetime)
- `email.dateModified`: Date Modified (datetime)
- `email.id`: ID (number)
- `email.name`: Name
- `email.subject`: Subject
- `email.language`: Language
- `email.category`: Category
- `email.category.id`: ID (number)
- `email.category.title`: Title
- `email.category.alias`: Alias
- `email.category.description`: Description
- `email.category.color`: Color
- `email.category.bundle`: Bundle
- `email.fromAddress`: From Address (email)
- `email.fromName`: From Name
- `email.replyToAddress`: Reply To Address (email)
- `email.bccAddress`: Bcc Address
- `email.useOwnerAsMailer`: Use Owner As Mailer
- `email.utmTags`: Utm Tags
- `email.utmTags.utmSource`: Utm Source
- `email.utmTags.utmMedium`: Utm Medium
- `email.utmTags.utmCampaign`: Utm Campaign
- `email.utmTags.utmContent`: Utm Content
- `email.preheaderText`: Preheader Text
- `email.customHtml`: Custom HTML
- `email.plainText`: Plain Text
- `email.template`: Template
- `email.emailType`: Email Type
- `email.publishUp`: Publish Up
- `email.publishDown`: Publish Down
- `email.publicPreview`: Public Preview (boolean)
- `email.readCount`: Read Count (number)
- `email.sentCount`: Sent Count (number)
- `email.revision`: Revision (number)
- `email.assetAttachments`: Asset Attachments
- `email.variantStartDate`: Variant Start Date
- `email.variantSentCount`: Variant Sent Count (number)
- `email.variantReadCount`: Variant Read Count (number)
- `email.variantParent`: Variant Parent
- `email.variantChildren`: Variant Children
- `email.translationParent`: Translation Parent
- `email.translationChildren`: Translation Children
- `email.unsubscribeForm`: Unsubscribe Form
- `email.dynamicContent`: Dynamic Content
- `email.dynamicContent[].tokenName`: Token Name
- `email.dynamicContent[].content`: Content
- `email.dynamicContent[].filters`: Filters
- `email.dynamicContent[].filters[].content`: Content
- `email.dynamicContent[].filters[].filters`: Filters
- `email.dynamicContent[].filters[].filters[].glue`: Glue
- `email.dynamicContent[].filters[].filters[].field`: Field
- `email.dynamicContent[].filters[].filters[].object`: Object
- `email.dynamicContent[].filters[].filters[].type`: Type
- `email.dynamicContent[].filters[].filters[].operator`: Operator
- `email.dynamicContent[].filters[].filters[].display`: Display
- `email.dynamicContent[].filters[].filters[].filter`: Filter
- `email.lists`: Lists
- `email.lists[].id`: ID (number)
- `email.lists[].name`: Name
- `email.lists[].publicName`: Public Name
- `email.lists[].alias`: Alias
- `email.lists[].description`: Description
- `email.lists[].category`: Category
- `email.lists[].category.id`: ID (number)
- `email.lists[].category.title`: Title
- `email.lists[].category.alias`: Alias
- `email.lists[].category.description`: Description
- `email.lists[].category.color`: Color
- `email.lists[].category.bundle`: Bundle

### `mautic_delete_email`

**Delete Email.** Permanently deletes an email and its stats. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Email Id. Numeric email id, from List Emails or Create Email. |

Output fields:

- `email`: Email
- `email.isPublished`: Published (boolean)
- `email.dateAdded`: Date Added (datetime)
- `email.dateModified`: Date Modified (datetime)
- `email.id`: ID
- `email.name`: Name
- `email.subject`: Subject
- `email.language`: Language
- `email.category`: Category
- `email.category.id`: ID (number)
- `email.category.title`: Title
- `email.category.alias`: Alias
- `email.category.description`: Description
- `email.category.color`: Color
- `email.category.bundle`: Bundle
- `email.fromAddress`: From Address (email)
- `email.fromName`: From Name
- `email.replyToAddress`: Reply To Address (email)
- `email.bccAddress`: Bcc Address
- `email.useOwnerAsMailer`: Use Owner As Mailer
- `email.utmTags`: Utm Tags
- `email.utmTags.utmSource`: Utm Source
- `email.utmTags.utmMedium`: Utm Medium
- `email.utmTags.utmCampaign`: Utm Campaign
- `email.utmTags.utmContent`: Utm Content
- `email.preheaderText`: Preheader Text
- `email.customHtml`: Custom HTML
- `email.plainText`: Plain Text
- `email.template`: Template
- `email.emailType`: Email Type
- `email.publishUp`: Publish Up
- `email.publishDown`: Publish Down
- `email.publicPreview`: Public Preview (boolean)
- `email.readCount`: Read Count (number)
- `email.sentCount`: Sent Count (number)
- `email.revision`: Revision (number)
- `email.assetAttachments`: Asset Attachments
- `email.variantStartDate`: Variant Start Date
- `email.variantSentCount`: Variant Sent Count (number)
- `email.variantReadCount`: Variant Read Count (number)
- `email.variantParent`: Variant Parent
- `email.variantChildren`: Variant Children
- `email.translationParent`: Translation Parent
- `email.translationChildren`: Translation Children
- `email.translationChildren[].id`: ID (number)
- `email.translationChildren[].name`: Name
- `email.translationChildren[].subject`: Subject
- `email.translationChildren[].language`: Language
- `email.translationChildren[].category`: Category
- `email.translationChildren[].category.id`: ID (number)
- `email.translationChildren[].category.title`: Title
- `email.translationChildren[].category.alias`: Alias
- `email.translationChildren[].category.description`: Description
- `email.translationChildren[].category.color`: Color
- `email.translationChildren[].category.bundle`: Bundle
- `email.translationChildren[].fromAddress`: From Address (email)
- `email.translationChildren[].fromName`: From Name
- `email.translationChildren[].replyToAddress`: Reply To Address (email)
- `email.translationChildren[].bccAddress`: Bcc Address
- `email.translationChildren[].useOwnerAsMailer`: Use Owner As Mailer
- `email.translationChildren[].utmTags`: Utm Tags
- `email.translationChildren[].utmTags.utmSource`: Utm Source
- `email.translationChildren[].utmTags.utmMedium`: Utm Medium
- `email.translationChildren[].utmTags.utmCampaign`: Utm Campaign
- `email.translationChildren[].utmTags.utmContent`: Utm Content
- `email.translationChildren[].preheaderText`: Preheader Text
- `email.translationChildren[].customHtml`: Custom HTML
- `email.translationChildren[].plainText`: Plain Text
- `email.translationChildren[].template`: Template
- `email.translationChildren[].emailType`: Email Type
- `email.translationChildren[].publishUp`: Publish Up
- `email.translationChildren[].publishDown`: Publish Down
- `email.translationChildren[].publicPreview`: Public Preview (boolean)
- `email.translationChildren[].readCount`: Read Count (number)
- `email.translationChildren[].sentCount`: Sent Count (number)
- `email.translationChildren[].revision`: Revision (number)
- `email.translationChildren[].assetAttachments`: Asset Attachments
- `email.translationChildren[].variantStartDate`: Variant Start Date
- `email.translationChildren[].variantSentCount`: Variant Sent Count (number)
- `email.translationChildren[].variantReadCount`: Variant Read Count (number)
- `email.translationChildren[].variantParent`: Variant Parent
- `email.translationChildren[].variantChildren`: Variant Children
- `email.translationChildren[].translationChildren`: Translation Children
- `email.translationChildren[].unsubscribeForm`: Unsubscribe Form
- `email.translationChildren[].dynamicContent`: Dynamic Content
- `email.translationChildren[].dynamicContent[].tokenName`: Token Name
- `email.translationChildren[].dynamicContent[].content`: Content
- `email.translationChildren[].dynamicContent[].filters`: Filters
- `email.translationChildren[].dynamicContent[].filters[].content`: Content
- `email.translationChildren[].dynamicContent[].filters[].filters`: Filters
- `email.translationChildren[].lists`: Lists
- `email.unsubscribeForm`: Unsubscribe Form
- `email.dynamicContent`: Dynamic Content
- `email.dynamicContent[].tokenName`: Token Name
- `email.dynamicContent[].content`: Content
- `email.dynamicContent[].filters`: Filters
- `email.dynamicContent[].filters[].content`: Content
- `email.dynamicContent[].filters[].filters`: Filters
- `email.dynamicContent[].filters[].filters[].glue`: Glue
- `email.dynamicContent[].filters[].filters[].field`: Field
- `email.dynamicContent[].filters[].filters[].object`: Object
- `email.dynamicContent[].filters[].filters[].type`: Type
- `email.dynamicContent[].filters[].filters[].operator`: Operator
- `email.dynamicContent[].filters[].filters[].display`: Display
- `email.dynamicContent[].filters[].filters[].filter`: Filter
- `email.lists`: Lists

### `mautic_list_smses`

**List Text Messages.** Lists text messages (SMS templates) with their sent counts. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `smses`: Smses
- `smses[].isPublished`: Published (boolean)
- `smses[].dateAdded`: Date Added (datetime)
- `smses[].dateModified`: Date Modified
- `smses[].id`: ID (number)
- `smses[].name`: Name
- `smses[].message`: Message
- `smses[].language`: Language
- `smses[].category`: Category
- `smses[].category.id`: ID (number)
- `smses[].category.title`: Title
- `smses[].category.alias`: Alias
- `smses[].category.description`: Description
- `smses[].category.color`: Color
- `smses[].category.bundle`: Bundle
- `smses[].publishUp`: Publish Up
- `smses[].publishDown`: Publish Down
- `smses[].sentCount`: Sent Count (number)

### `mautic_get_sms`

**Get Text Message.** Gets a single text message by its numeric id. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Text Message Id. Numeric text message id, from List Text Messages or Create Text Message. |

Output fields:

- `sms`: Sms
- `sms.isPublished`: Published (boolean)
- `sms.dateAdded`: Date Added (datetime)
- `sms.dateModified`: Date Modified (datetime)
- `sms.id`: ID (number)
- `sms.name`: Name
- `sms.message`: Message
- `sms.language`: Language
- `sms.category`: Category
- `sms.category.id`: ID (number)
- `sms.category.title`: Title
- `sms.category.alias`: Alias
- `sms.category.description`: Description
- `sms.category.color`: Color
- `sms.category.bundle`: Bundle
- `sms.publishUp`: Publish Up (datetime)
- `sms.publishDown`: Publish Down
- `sms.sentCount`: Sent Count (number)

### `mautic_create_sms`

**Create Text Message.** Creates a text message template. Name and Message are required. Mautic sends it from campaigns. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Internal name of the text message. |
| `message` | string | yes |  | Message. Text to send. Tokens like {contactfield=firstname} are replaced per contact. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `language` | string | no |  | Language. Locale code, e.g. "en". |
| `additionalFields` | JSON | no |  | Additional Fields. Other text message properties, e.g. "publishUp", "publishDown", "smsType". The dedicated props above win over the same keys here. |

Output fields:

- `sms`: Sms
- `sms.isPublished`: Published (boolean)
- `sms.dateAdded`: Date Added (datetime)
- `sms.dateModified`: Date Modified
- `sms.id`: ID (number)
- `sms.name`: Name
- `sms.message`: Message
- `sms.language`: Language
- `sms.category`: Category
- `sms.category.id`: ID (number)
- `sms.category.title`: Title
- `sms.category.alias`: Alias
- `sms.category.description`: Description
- `sms.category.color`: Color
- `sms.category.bundle`: Bundle
- `sms.publishUp`: Publish Up (datetime)
- `sms.publishDown`: Publish Down
- `sms.sentCount`: Sent Count (number)

### `mautic_update_sms`

**Update Text Message.** Updates an existing text message. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Text Message Id. Numeric text message id, from List Text Messages or Create Text Message. |
| `name` | string | no |  | Name. Internal name of the text message. |
| `message` | string | no |  | Message. Text to send. Tokens like {contactfield=firstname} are replaced per contact. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `language` | string | no |  | Language. Locale code, e.g. "en". |
| `additionalFields` | JSON | no |  | Additional Fields. Other text message properties, e.g. "publishUp", "publishDown", "smsType". The dedicated props above win over the same keys here. |

Output fields:

- `sms`: Sms
- `sms.isPublished`: Published (boolean)
- `sms.dateAdded`: Date Added (datetime)
- `sms.dateModified`: Date Modified (datetime)
- `sms.id`: ID (number)
- `sms.name`: Name
- `sms.message`: Message
- `sms.language`: Language
- `sms.category`: Category
- `sms.category.id`: ID (number)
- `sms.category.title`: Title
- `sms.category.alias`: Alias
- `sms.category.description`: Description
- `sms.category.color`: Color
- `sms.category.bundle`: Bundle
- `sms.publishUp`: Publish Up (datetime)
- `sms.publishDown`: Publish Down
- `sms.sentCount`: Sent Count (number)

### `mautic_delete_sms`

**Delete Text Message.** Permanently deletes a text message and its stats. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Text Message Id. Numeric text message id, from List Text Messages or Create Text Message. |

Output fields:

- `sms`: Sms
- `sms.isPublished`: Published (boolean)
- `sms.dateAdded`: Date Added (datetime)
- `sms.dateModified`: Date Modified
- `sms.id`: ID
- `sms.name`: Name
- `sms.message`: Message
- `sms.language`: Language
- `sms.category`: Category
- `sms.category.id`: ID (number)
- `sms.category.title`: Title
- `sms.category.alias`: Alias
- `sms.category.description`: Description
- `sms.category.color`: Color
- `sms.category.bundle`: Bundle
- `sms.publishUp`: Publish Up (datetime)
- `sms.publishDown`: Publish Down
- `sms.sentCount`: Sent Count (number)

### `mautic_list_notes`

**List Notes.** Lists notes across all contacts. Use Where with col "lead" to narrow to one contact, or List Contact Notes. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `notes`: Notes
- `notes[].id`: ID (number)
- `notes[].text`: Text
- `notes[].type`: Type
- `notes[].dateTime`: Date Time (datetime)
- `notes[].lead`: Lead
- `notes[].lead.id`: ID (number)
- `notes[].lead.points`: Points (number)
- `notes[].lead.color`: Color
- `notes[].lead.fields`: Fields

### `mautic_get_note`

**Get Note.** Gets a single note by its numeric id. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Note Id. Numeric note id, from List Notes or Create Note. |

Output fields:

- `note`: Note
- `note.id`: ID (number)
- `note.text`: Text
- `note.type`: Type
- `note.dateTime`: Date Time (datetime)
- `note.lead`: Lead
- `note.lead.id`: ID (number)
- `note.lead.points`: Points (number)
- `note.lead.color`: Color
- `note.lead.fields`: Fields

### `mautic_create_note`

**Create Note.** Adds a note to a contact. Contact Id and Text are required. Each call adds another note. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead` | string | yes |  | Contact Id. Numeric id of the contact the note belongs to, from List Contacts. |
| `text` | string | yes |  | Text. |
| `type` | string | no |  | Type. Defaults to General. One of `"general"`, `"email"`, `"call"`, `"meeting"`. |
| `dateTime` | string | no |  | Date. When the note happened, e.g. "2026-05-01 09:00:00". |
| `additionalFields` | JSON | no |  | Additional Fields. Other note properties. The dedicated props above win over the same keys here. |

Output fields:

- `note`: Note
- `note.id`: ID (number)
- `note.text`: Text
- `note.type`: Type
- `note.dateTime`: Date Time (datetime)
- `note.lead`: Lead
- `note.lead.id`: ID (number)
- `note.lead.points`: Points (number)
- `note.lead.color`: Color
- `note.lead.fields`: Fields

### `mautic_update_note`

**Update Note.** Updates an existing note. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Note Id. Numeric note id, from List Notes or Create Note. |
| `lead` | string | no |  | Contact Id. Numeric id of the contact the note belongs to, from List Contacts. |
| `text` | string | no |  | Text. |
| `type` | string | no |  | Type. Defaults to General. One of `"general"`, `"email"`, `"call"`, `"meeting"`. |
| `dateTime` | string | no |  | Date. When the note happened, e.g. "2026-05-01 09:00:00". |
| `additionalFields` | JSON | no |  | Additional Fields. Other note properties. The dedicated props above win over the same keys here. |

Output fields:

- `note`: Note
- `note.id`: ID (number)
- `note.text`: Text
- `note.type`: Type
- `note.dateTime`: Date Time (datetime)
- `note.lead`: Lead
- `note.lead.id`: ID (number)
- `note.lead.points`: Points (number)
- `note.lead.color`: Color
- `note.lead.fields`: Fields

### `mautic_delete_note`

**Delete Note.** Permanently deletes a note. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Note Id. Numeric note id, from List Notes or Create Note. |

Output fields:

- `note`: Note
- `note.id`: ID
- `note.text`: Text
- `note.type`: Type
- `note.dateTime`: Date Time (datetime)
- `note.lead`: Lead
- `note.lead.id`: ID (number)
- `note.lead.points`: Points (number)
- `note.lead.color`: Color
- `note.lead.fields`: Fields

### `mautic_list_tags`

**List Tags.** Lists contact tags. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |

Output fields:

- `total`: Total (number)
- `tags`: Tags
- `tags[].id`: ID (number)
- `tags[].tag`: Tag
- `tags[].description`: Description

### `mautic_get_tag`

**Get Tag.** Gets a single tag by its numeric id. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Tag Id. Numeric tag id, from List Tags or Create Tag. |

Output fields:

- `tag`: Tag
- `tag.id`: ID (number)
- `tag.tag`: Tag
- `tag.description`: Description

### `mautic_create_tag`

**Create Tag.** Creates a tag. Tag is required; the Mautic tag API accepts only the name. To tag a contact, use Update Contact with Tags instead. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tag` | string | yes |  | Tag. Tag name. |

Output fields:

- `tag`: Tag
- `tag.id`: ID (number)
- `tag.tag`: Tag
- `tag.description`: Description

### `mautic_update_tag`

**Update Tag.** Updates an existing tag, e.g. to rename it. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Tag Id. Numeric tag id, from List Tags or Create Tag. |
| `tag` | string | no |  | Tag. Tag name. |

Output fields:

- `tag`: Tag
- `tag.id`: ID (number)
- `tag.tag`: Tag
- `tag.description`: Description

### `mautic_delete_tag`

**Delete Tag.** Permanently deletes a tag and removes it from every contact. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Tag Id. Numeric tag id, from List Tags or Create Tag. |

Output fields:

- `tag`: Tag
- `tag.id`: ID
- `tag.tag`: Tag
- `tag.description`: Description

### `mautic_list_stages`

**List Stages.** Lists contact lifecycle stages with their weight. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `stages`: Stages
- `stages[].isPublished`: Published (boolean)
- `stages[].dateAdded`: Date Added (datetime)
- `stages[].dateModified`: Date Modified
- `stages[].id`: ID (number)
- `stages[].name`: Name
- `stages[].category`: Category
- `stages[].category.id`: ID (number)
- `stages[].category.title`: Title
- `stages[].category.alias`: Alias
- `stages[].category.description`: Description
- `stages[].category.color`: Color
- `stages[].category.bundle`: Bundle
- `stages[].weight`: Weight (number)
- `stages[].description`: Description
- `stages[].publishUp`: Publish Up
- `stages[].publishDown`: Publish Down

### `mautic_get_stage`

**Get Stage.** Gets a single stage by its numeric id. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Stage Id. Numeric stage id, from List Stages or Create Stage. |

Output fields:

- `stage`: Stage
- `stage.isPublished`: Published (boolean)
- `stage.dateAdded`: Date Added (datetime)
- `stage.dateModified`: Date Modified (datetime)
- `stage.id`: ID (number)
- `stage.name`: Name
- `stage.category`: Category
- `stage.category.id`: ID (number)
- `stage.category.title`: Title
- `stage.category.alias`: Alias
- `stage.category.description`: Description
- `stage.category.color`: Color
- `stage.category.bundle`: Bundle
- `stage.weight`: Weight (number)
- `stage.description`: Description
- `stage.publishUp`: Publish Up
- `stage.publishDown`: Publish Down

### `mautic_create_stage`

**Create Stage.** Creates a lifecycle stage. Name is required. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `weight` | number | no |  | Weight. Order of the stage in the lifecycle; higher is further along. |
| `description` | string | no |  | Description. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `additionalFields` | JSON | no |  | Additional Fields. Other stage properties, e.g. "publishUp", "publishDown". The dedicated props above win over the same keys here. |

Output fields:

- `stage`: Stage
- `stage.isPublished`: Published (boolean)
- `stage.dateAdded`: Date Added (datetime)
- `stage.dateModified`: Date Modified
- `stage.id`: ID (number)
- `stage.name`: Name
- `stage.category`: Category
- `stage.category.id`: ID (number)
- `stage.category.title`: Title
- `stage.category.alias`: Alias
- `stage.category.description`: Description
- `stage.category.color`: Color
- `stage.category.bundle`: Bundle
- `stage.weight`: Weight (number)
- `stage.description`: Description
- `stage.publishUp`: Publish Up
- `stage.publishDown`: Publish Down

### `mautic_update_stage`

**Update Stage.** Updates an existing stage. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Stage Id. Numeric stage id, from List Stages or Create Stage. |
| `name` | string | no |  | Name. |
| `weight` | number | no |  | Weight. Order of the stage in the lifecycle; higher is further along. |
| `description` | string | no |  | Description. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `additionalFields` | JSON | no |  | Additional Fields. Other stage properties, e.g. "publishUp", "publishDown". The dedicated props above win over the same keys here. |

Output fields:

- `stage`: Stage
- `stage.isPublished`: Published (boolean)
- `stage.dateAdded`: Date Added (datetime)
- `stage.dateModified`: Date Modified (datetime)
- `stage.id`: ID (number)
- `stage.name`: Name
- `stage.category`: Category
- `stage.category.id`: ID (number)
- `stage.category.title`: Title
- `stage.category.alias`: Alias
- `stage.category.description`: Description
- `stage.category.color`: Color
- `stage.category.bundle`: Bundle
- `stage.weight`: Weight (number)
- `stage.description`: Description
- `stage.publishUp`: Publish Up
- `stage.publishDown`: Publish Down

### `mautic_delete_stage`

**Delete Stage.** Permanently deletes a stage; contacts in it are left without a stage. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Stage Id. Numeric stage id, from List Stages or Create Stage. |

Output fields:

- `stage`: Stage
- `stage.isPublished`: Published (boolean)
- `stage.dateAdded`: Date Added (datetime)
- `stage.dateModified`: Date Modified
- `stage.id`: ID
- `stage.name`: Name
- `stage.category`: Category
- `stage.category.id`: ID (number)
- `stage.category.title`: Title
- `stage.category.alias`: Alias
- `stage.category.description`: Description
- `stage.category.color`: Color
- `stage.category.bundle`: Bundle
- `stage.weight`: Weight (number)
- `stage.description`: Description
- `stage.publishUp`: Publish Up
- `stage.publishDown`: Publish Down

### `mautic_add_contact_to_stage`

**Add Contact to Stage.** Moves a contact into a stage, replacing its current stage. Repeating it leaves the contact in the stage. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Stage Id. Numeric stage id, from List Stages or Create Stage. |
| `contactId` | string | yes |  | Contact Id. Numeric contact id, from List Contacts. |

Output fields:

- `success`: Success (number)

### `mautic_remove_contact_from_stage`

**Remove Contact from Stage.** Takes a contact out of a stage, leaving it without a stage. Repeating it changes nothing. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Stage Id. Numeric stage id, from List Stages or Create Stage. |
| `contactId` | string | yes |  | Contact Id. Numeric contact id, from List Contacts. |

Output fields:

- `success`: Success (number)

### `mautic_list_categories`

**List Categories.** Lists categories with the bundle each one applies to. Category ids are used by emails, segments, campaigns, assets and more. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `categories`: Categories
- `categories[].id`: ID (number)
- `categories[].title`: Title
- `categories[].alias`: Alias
- `categories[].description`: Description
- `categories[].color`: Color
- `categories[].bundle`: Bundle

### `mautic_get_category`

**Get Category.** Gets a single category by its numeric id. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Category Id. Numeric category id, from List Categories or Create Category. |

Output fields:

- `category`: Category
- `category.id`: ID (number)
- `category.title`: Title
- `category.alias`: Alias
- `category.description`: Description
- `category.color`: Color
- `category.bundle`: Bundle

### `mautic_create_category`

**Create Category.** Creates a category. Title and Bundle are required. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `bundle` | string | yes |  | Bundle. Where the category can be used. Global works everywhere. One of `"global"`, `"asset"`, `"campaign"`, `"email"`, `"form"`, `"page"`, `"point"`, `"segment"`, `"stage"`, `"sms"`, `"dynamicContent"`, `"plugin:focus"`, `"messages"`, `"notification"`. |
| `description` | string | no |  | Description. |
| `color` | string | no |  | Color. Hex color without "#", e.g. "4e5d9d". |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `additionalFields` | JSON | no |  | Additional Fields. Other category properties, e.g. "alias". The dedicated props above win over the same keys here. |

Output fields:

- `category`: Category
- `category.id`: ID (number)
- `category.title`: Title
- `category.alias`: Alias
- `category.description`: Description
- `category.color`: Color
- `category.bundle`: Bundle

### `mautic_update_category`

**Update Category.** Updates an existing category. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Category Id. Numeric category id, from List Categories or Create Category. |
| `title` | string | no |  | Title. |
| `bundle` | string | no |  | Bundle. Where the category can be used. Global works everywhere. One of `"global"`, `"asset"`, `"campaign"`, `"email"`, `"form"`, `"page"`, `"point"`, `"segment"`, `"stage"`, `"sms"`, `"dynamicContent"`, `"plugin:focus"`, `"messages"`, `"notification"`. |
| `description` | string | no |  | Description. |
| `color` | string | no |  | Color. Hex color without "#", e.g. "4e5d9d". |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `additionalFields` | JSON | no |  | Additional Fields. Other category properties, e.g. "alias". The dedicated props above win over the same keys here. |

Output fields:

- `category`: Category
- `category.id`: ID (number)
- `category.title`: Title
- `category.alias`: Alias
- `category.description`: Description
- `category.color`: Color
- `category.bundle`: Bundle

### `mautic_delete_category`

**Delete Category.** Permanently deletes a category; items in it become uncategorized. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Category Id. Numeric category id, from List Categories or Create Category. |

Output fields:

- `category`: Category
- `category.id`: ID
- `category.title`: Title
- `category.alias`: Alias
- `category.description`: Description
- `category.color`: Color
- `category.bundle`: Bundle

### `mautic_list_fields`

**List Fields.** Lists the custom and core fields of contacts or companies with alias, type and options. The aliases are the keys for contact and company field values. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. One of `"contact"`, `"company"`. |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `fields`: Fields
- `fields[].isPublished`: Published (boolean)
- `fields[].dateAdded`: Date Added (datetime)
- `fields[].dateModified`: Date Modified
- `fields[].id`: ID (number)
- `fields[].label`: Label
- `fields[].alias`: Alias
- `fields[].type`: Type
- `fields[].group`: Group
- `fields[].order`: Order (number)
- `fields[].object`: Object
- `fields[].defaultValue`: Default Value
- `fields[].isRequired`: Is Required (boolean)
- `fields[].isFixed`: Is Fixed (boolean)
- `fields[].isListable`: Is Listable (boolean)
- `fields[].isVisible`: Is Visible (boolean)
- `fields[].isShortVisible`: Is Short Visible (boolean)
- `fields[].isUniqueIdentifier`: Is Unique Identifier (boolean)
- `fields[].isPubliclyUpdatable`: Is Publicly Updatable (boolean)
- `fields[].properties`: Properties
- `fields[].properties.list`: List
- `fields[].properties.list[].label`: Label
- `fields[].properties.list[].value`: Value
- `fields[].isIndex`: Is Index (boolean)
- `fields[].charLengthLimit`: Char Length Limit (number)

### `mautic_get_field`

**Get Field.** Gets a single contact or company field by its numeric id. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. One of `"contact"`, `"company"`. |
| `id` | string | yes |  | Field Id. Numeric field id, from List Fields or Create Field. |

Output fields:

- `field`: Field
- `field.isPublished`: Published (boolean)
- `field.dateAdded`: Date Added (datetime)
- `field.dateModified`: Date Modified (datetime)
- `field.id`: ID (number)
- `field.label`: Label
- `field.alias`: Alias
- `field.type`: Type
- `field.group`: Group
- `field.order`: Order (number)
- `field.object`: Object
- `field.defaultValue`: Default Value
- `field.isRequired`: Is Required (boolean)
- `field.isFixed`: Is Fixed (boolean)
- `field.isListable`: Is Listable (boolean)
- `field.isVisible`: Is Visible (boolean)
- `field.isShortVisible`: Is Short Visible (boolean)
- `field.isUniqueIdentifier`: Is Unique Identifier (boolean)
- `field.isPubliclyUpdatable`: Is Publicly Updatable (boolean)
- `field.properties`: Properties
- `field.properties.list`: List
- `field.properties.list[].label`: Label
- `field.properties.list[].value`: Value
- `field.isIndex`: Is Index (boolean)
- `field.charLengthLimit`: Char Length Limit (number)

### `mautic_create_field`

**Create Field.** Creates a custom contact or company field. Label is required. Needs an administrator account. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. One of `"contact"`, `"company"`. |
| `label` | string | yes |  | Label. |
| `alias` | string | no |  | Alias. Unique alias used as the field key; generated from the label when empty. |
| `type` | string | no |  | Type. Defaults to text. One of `"text"`, `"textarea"`, `"email"`, `"number"`, `"boolean"`, `"select"`, `"multiselect"`, `"date"`, `"datetime"`, `"time"`, `"url"`, `"tel"`, `"country"`, `"region"`, `"timezone"`, `"locale"`, `"lookup"`, `"html"`. |
| `group` | string | no |  | Group. Defaults to core. One of `"core"`, `"social"`, `"personal"`, `"professional"`. |
| `defaultValue` | string | no |  | Default Value. |
| `isRequired` | string | no |  | Required. One of `true`, `false`. |
| `isUniqueIdentifier` | string | no |  | Unique Identifier. Whether contacts are merged on this field. One of `true`, `false`. |
| `isPubliclyUpdatable` | string | no |  | Publicly Updatable. Whether tracking requests and forms can set it. One of `true`, `false`. |
| `properties` | JSON | no |  | Properties. Type settings, e.g. {"list": [{"label": "Small", "value": "s"}]} for select fields. |
| `additionalFields` | JSON | no |  | Additional Fields. Other field properties, e.g. "order", "description", "isVisible". The dedicated props above win over the same keys here. |

Output fields:

- `field`: Field
- `field.isPublished`: Published (boolean)
- `field.dateAdded`: Date Added (datetime)
- `field.dateModified`: Date Modified
- `field.id`: ID (number)
- `field.label`: Label
- `field.alias`: Alias
- `field.type`: Type
- `field.group`: Group
- `field.order`: Order (number)
- `field.object`: Object
- `field.defaultValue`: Default Value
- `field.isRequired`: Is Required (boolean)
- `field.isFixed`: Is Fixed (boolean)
- `field.isListable`: Is Listable (boolean)
- `field.isVisible`: Is Visible (boolean)
- `field.isShortVisible`: Is Short Visible (boolean)
- `field.isUniqueIdentifier`: Is Unique Identifier (boolean)
- `field.isPubliclyUpdatable`: Is Publicly Updatable (boolean)
- `field.properties`: Properties
- `field.properties.list`: List
- `field.properties.list[].label`: Label
- `field.properties.list[].value`: Value
- `field.isIndex`: Is Index (boolean)
- `field.charLengthLimit`: Char Length Limit (number)

### `mautic_update_field`

**Update Field.** Updates an existing contact or company field. The type of an existing field cannot change. Needs an administrator account. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. One of `"contact"`, `"company"`. |
| `id` | string | yes |  | Field Id. Numeric field id, from List Fields or Create Field. |
| `label` | string | no |  | Label. |
| `alias` | string | no |  | Alias. Unique alias used as the field key; generated from the label when empty. |
| `type` | string | no |  | Type. Defaults to text. One of `"text"`, `"textarea"`, `"email"`, `"number"`, `"boolean"`, `"select"`, `"multiselect"`, `"date"`, `"datetime"`, `"time"`, `"url"`, `"tel"`, `"country"`, `"region"`, `"timezone"`, `"locale"`, `"lookup"`, `"html"`. |
| `group` | string | no |  | Group. Defaults to core. One of `"core"`, `"social"`, `"personal"`, `"professional"`. |
| `defaultValue` | string | no |  | Default Value. |
| `isRequired` | string | no |  | Required. One of `true`, `false`. |
| `isUniqueIdentifier` | string | no |  | Unique Identifier. Whether contacts are merged on this field. One of `true`, `false`. |
| `isPubliclyUpdatable` | string | no |  | Publicly Updatable. Whether tracking requests and forms can set it. One of `true`, `false`. |
| `properties` | JSON | no |  | Properties. Type settings, e.g. {"list": [{"label": "Small", "value": "s"}]} for select fields. |
| `additionalFields` | JSON | no |  | Additional Fields. Other field properties, e.g. "order", "description", "isVisible". The dedicated props above win over the same keys here. |

Output fields:

- `field`: Field
- `field.isPublished`: Published (boolean)
- `field.dateAdded`: Date Added (datetime)
- `field.dateModified`: Date Modified (datetime)
- `field.id`: ID (number)
- `field.label`: Label
- `field.alias`: Alias
- `field.type`: Type
- `field.group`: Group
- `field.order`: Order (number)
- `field.object`: Object
- `field.defaultValue`: Default Value
- `field.isRequired`: Is Required (boolean)
- `field.isFixed`: Is Fixed (boolean)
- `field.isListable`: Is Listable (boolean)
- `field.isVisible`: Is Visible (boolean)
- `field.isShortVisible`: Is Short Visible (boolean)
- `field.isUniqueIdentifier`: Is Unique Identifier (boolean)
- `field.isPubliclyUpdatable`: Is Publicly Updatable (boolean)
- `field.properties`: Properties
- `field.properties.list`: List
- `field.properties.list[].label`: Label
- `field.properties.list[].value`: Value
- `field.isIndex`: Is Index (boolean)
- `field.charLengthLimit`: Char Length Limit (number)

### `mautic_delete_field`

**Delete Field.** Permanently deletes a custom field and the value it holds on every contact or company. Needs an administrator account. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `object` | string | yes |  | Object. One of `"contact"`, `"company"`. |
| `id` | string | yes |  | Field Id. Numeric field id, from List Fields or Create Field. |

Output fields:

- `field`: Field
- `field.isPublished`: Published (boolean)
- `field.dateAdded`: Date Added (datetime)
- `field.dateModified`: Date Modified
- `field.id`: ID
- `field.label`: Label
- `field.alias`: Alias
- `field.type`: Type
- `field.group`: Group
- `field.order`: Order (number)
- `field.object`: Object
- `field.defaultValue`: Default Value
- `field.isRequired`: Is Required (boolean)
- `field.isFixed`: Is Fixed (boolean)
- `field.isListable`: Is Listable (boolean)
- `field.isVisible`: Is Visible (boolean)
- `field.isShortVisible`: Is Short Visible (boolean)
- `field.isUniqueIdentifier`: Is Unique Identifier (boolean)
- `field.isPubliclyUpdatable`: Is Publicly Updatable (boolean)
- `field.properties`: Properties
- `field.properties.list`: List
- `field.properties.list[].label`: Label
- `field.properties.list[].value`: Value
- `field.isIndex`: Is Index (boolean)
- `field.charLengthLimit`: Char Length Limit (number)

### `mautic_list_forms`

**List Forms.** Lists forms with their fields and submit actions. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `forms`: Forms
- `forms[].isPublished`: Published (boolean)
- `forms[].dateAdded`: Date Added (datetime)
- `forms[].dateModified`: Date Modified (datetime)
- `forms[].id`: ID (number)
- `forms[].name`: Name
- `forms[].alias`: Alias
- `forms[].category`: Category
- `forms[].category.id`: ID (number)
- `forms[].category.title`: Title
- `forms[].category.alias`: Alias
- `forms[].category.description`: Description
- `forms[].category.color`: Color
- `forms[].category.bundle`: Bundle
- `forms[].description`: Description
- `forms[].cachedHtml`: Cached HTML
- `forms[].publishUp`: Publish Up
- `forms[].publishDown`: Publish Down
- `forms[].fields`: Fields
- `forms[].fields[].id`: ID (number)
- `forms[].fields[].label`: Label
- `forms[].fields[].showLabel`: Show Label (boolean)
- `forms[].fields[].alias`: Alias
- `forms[].fields[].type`: Type
- `forms[].fields[].defaultValue`: Default Value
- `forms[].fields[].isRequired`: Is Required (boolean)
- `forms[].fields[].validationMessage`: Validation Message
- `forms[].fields[].helpMessage`: Help Message
- `forms[].fields[].order`: Order (number)
- `forms[].fields[].properties`: Properties
- `forms[].fields[].validation`: Validation
- `forms[].fields[].parent`: Parent
- `forms[].fields[].conditions`: Conditions
- `forms[].fields[].labelAttributes`: Label Attributes
- `forms[].fields[].inputAttributes`: Input Attributes
- `forms[].fields[].containerAttributes`: Container Attributes
- `forms[].fields[].leadField`: Lead Field
- `forms[].fields[].saveResult`: Save Result (boolean)
- `forms[].fields[].isAutoFill`: Is Auto Fill (boolean)
- `forms[].fields[].mappedObject`: Mapped Object
- `forms[].fields[].mappedField`: Mapped Field
- `forms[].actions`: Actions
- `forms[].actions[].id`: ID (number)
- `forms[].actions[].name`: Name
- `forms[].actions[].description`: Description
- `forms[].actions[].type`: Type
- `forms[].actions[].order`: Order (number)
- `forms[].actions[].properties`: Properties
- `forms[].actions[].properties.operator`: Operator
- `forms[].actions[].properties.points`: Points (number)
- `forms[].actions[].properties.group`: Group
- `forms[].template`: Template
- `forms[].inKioskMode`: In Kiosk Mode (boolean)
- `forms[].renderStyle`: Render Style (boolean)
- `forms[].formType`: Form Type
- `forms[].postAction`: Post Action
- `forms[].postActionProperty`: Post Action Property
- `forms[].noIndex`: No Index
- `forms[].formAttributes`: Form Attributes
- `forms[].language`: Language

### `mautic_get_form`

**Get Form.** Gets a single form by its numeric id, with its fields and submit actions. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Form Id. Numeric form id, from List Forms or Create Form. |

Output fields:

- `form`: Form
- `form.isPublished`: Published (boolean)
- `form.dateAdded`: Date Added (datetime)
- `form.dateModified`: Date Modified (datetime)
- `form.id`: ID (number)
- `form.name`: Name
- `form.alias`: Alias
- `form.category`: Category
- `form.category.id`: ID (number)
- `form.category.title`: Title
- `form.category.alias`: Alias
- `form.category.description`: Description
- `form.category.color`: Color
- `form.category.bundle`: Bundle
- `form.description`: Description
- `form.cachedHtml`: Cached HTML
- `form.publishUp`: Publish Up
- `form.publishDown`: Publish Down
- `form.fields`: Fields
- `form.fields[].id`: ID (number)
- `form.fields[].label`: Label
- `form.fields[].showLabel`: Show Label (boolean)
- `form.fields[].alias`: Alias
- `form.fields[].type`: Type
- `form.fields[].defaultValue`: Default Value
- `form.fields[].isRequired`: Is Required (boolean)
- `form.fields[].validationMessage`: Validation Message
- `form.fields[].helpMessage`: Help Message
- `form.fields[].order`: Order (number)
- `form.fields[].properties`: Properties
- `form.fields[].validation`: Validation
- `form.fields[].parent`: Parent
- `form.fields[].conditions`: Conditions
- `form.fields[].labelAttributes`: Label Attributes
- `form.fields[].inputAttributes`: Input Attributes
- `form.fields[].containerAttributes`: Container Attributes
- `form.fields[].leadField`: Lead Field
- `form.fields[].saveResult`: Save Result (boolean)
- `form.fields[].isAutoFill`: Is Auto Fill (boolean)
- `form.fields[].mappedObject`: Mapped Object
- `form.fields[].mappedField`: Mapped Field
- `form.actions`: Actions
- `form.actions[].id`: ID (number)
- `form.actions[].name`: Name
- `form.actions[].description`: Description
- `form.actions[].type`: Type
- `form.actions[].order`: Order (number)
- `form.actions[].properties`: Properties
- `form.actions[].properties.operator`: Operator
- `form.actions[].properties.points`: Points (number)
- `form.actions[].properties.group`: Group
- `form.template`: Template
- `form.inKioskMode`: In Kiosk Mode (boolean)
- `form.renderStyle`: Render Style (boolean)
- `form.formType`: Form Type
- `form.postAction`: Post Action
- `form.postActionProperty`: Post Action Property (url)
- `form.noIndex`: No Index
- `form.formAttributes`: Form Attributes
- `form.language`: Language

### `mautic_create_form`

**Create Form.** Creates a form with its fields and submit actions. Name is required. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `alias` | string | no |  | Alias. Form alias; Mautic shortens it to 10 characters and replaces spaces with underscores. |
| `description` | string | no |  | Description. |
| `formType` | string | no |  | Form Type. Defaults to standalone. One of `"standalone"`, `"campaign"`. |
| `postAction` | string | no |  | After Submit. One of `"message"`, `"redirect"`, `"return"`. |
| `postActionProperty` | string | no |  | After Submit Value. Message to show or URL to redirect to. |
| `fields` | array | no |  | Fields. Form fields, each like {"label": "Email", "type": "email", "alias": "email", "leadField": "email", "isRequired": true}. Include a {"label": "Submit", "type": "button"} field. On update, fields with an "id" are edited and others added. |
| `actions` | array | no |  | Actions. Submit actions, each like {"name": "Add to segment", "type": "lead.changelist", "properties": {"addToLists": [1]}}. On update, actions with an "id" are edited and others added. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `additionalFields` | JSON | no |  | Additional Fields. Other form properties, e.g. "cachedHtml", "template", "inKioskMode", "renderStyle". The dedicated props above win over the same keys here. |

Output fields:

- `form`: Form
- `form.isPublished`: Published (boolean)
- `form.dateAdded`: Date Added (datetime)
- `form.dateModified`: Date Modified (datetime)
- `form.id`: ID (number)
- `form.name`: Name
- `form.alias`: Alias
- `form.category`: Category
- `form.category.id`: ID (number)
- `form.category.title`: Title
- `form.category.alias`: Alias
- `form.category.description`: Description
- `form.category.color`: Color
- `form.category.bundle`: Bundle
- `form.description`: Description
- `form.cachedHtml`: Cached HTML
- `form.publishUp`: Publish Up
- `form.publishDown`: Publish Down
- `form.fields`: Fields
- `form.fields[].id`: ID (number)
- `form.fields[].label`: Label
- `form.fields[].showLabel`: Show Label (boolean)
- `form.fields[].alias`: Alias
- `form.fields[].type`: Type
- `form.fields[].defaultValue`: Default Value
- `form.fields[].isRequired`: Is Required (boolean)
- `form.fields[].validationMessage`: Validation Message
- `form.fields[].helpMessage`: Help Message
- `form.fields[].order`: Order (number)
- `form.fields[].properties`: Properties
- `form.fields[].validation`: Validation
- `form.fields[].parent`: Parent
- `form.fields[].conditions`: Conditions
- `form.fields[].labelAttributes`: Label Attributes
- `form.fields[].inputAttributes`: Input Attributes
- `form.fields[].containerAttributes`: Container Attributes
- `form.fields[].leadField`: Lead Field
- `form.fields[].saveResult`: Save Result (boolean)
- `form.fields[].isAutoFill`: Is Auto Fill (boolean)
- `form.fields[].mappedObject`: Mapped Object
- `form.fields[].mappedField`: Mapped Field
- `form.actions`: Actions
- `form.actions[].id`: ID (number)
- `form.actions[].name`: Name
- `form.actions[].description`: Description
- `form.actions[].type`: Type
- `form.actions[].order`: Order (number)
- `form.actions[].properties`: Properties
- `form.actions[].properties.operator`: Operator
- `form.actions[].properties.points`: Points (number)
- `form.actions[].properties.group`: Group
- `form.template`: Template
- `form.inKioskMode`: In Kiosk Mode (boolean)
- `form.renderStyle`: Render Style (boolean)
- `form.formType`: Form Type
- `form.postAction`: Post Action
- `form.postActionProperty`: Post Action Property (url)
- `form.noIndex`: No Index
- `form.formAttributes`: Form Attributes
- `form.language`: Language

### `mautic_update_form`

**Update Form.** Updates an existing form. Send After Submit on every update: Mautic resets it to "return" when it is left out. Remove fields or actions with Delete Form Fields or Delete Form Actions. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Form Id. Numeric form id, from List Forms or Create Form. |
| `name` | string | no |  | Name. |
| `alias` | string | no |  | Alias. Form alias; Mautic shortens it to 10 characters and replaces spaces with underscores. |
| `description` | string | no |  | Description. |
| `formType` | string | no |  | Form Type. Defaults to standalone. One of `"standalone"`, `"campaign"`. |
| `postAction` | string | no |  | After Submit. One of `"message"`, `"redirect"`, `"return"`. |
| `postActionProperty` | string | no |  | After Submit Value. Message to show or URL to redirect to. |
| `fields` | array | no |  | Fields. Form fields, each like {"label": "Email", "type": "email", "alias": "email", "leadField": "email", "isRequired": true}. Include a {"label": "Submit", "type": "button"} field. On update, fields with an "id" are edited and others added. |
| `actions` | array | no |  | Actions. Submit actions, each like {"name": "Add to segment", "type": "lead.changelist", "properties": {"addToLists": [1]}}. On update, actions with an "id" are edited and others added. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `additionalFields` | JSON | no |  | Additional Fields. Other form properties, e.g. "cachedHtml", "template", "inKioskMode", "renderStyle". The dedicated props above win over the same keys here. |

Output fields:

- `form`: Form
- `form.isPublished`: Published (boolean)
- `form.dateAdded`: Date Added (datetime)
- `form.dateModified`: Date Modified (datetime)
- `form.id`: ID (number)
- `form.name`: Name
- `form.alias`: Alias
- `form.category`: Category
- `form.category.id`: ID (number)
- `form.category.title`: Title
- `form.category.alias`: Alias
- `form.category.description`: Description
- `form.category.color`: Color
- `form.category.bundle`: Bundle
- `form.description`: Description
- `form.cachedHtml`: Cached HTML
- `form.publishUp`: Publish Up
- `form.publishDown`: Publish Down
- `form.fields`: Fields
- `form.fields[].id`: ID (number)
- `form.fields[].label`: Label
- `form.fields[].showLabel`: Show Label (boolean)
- `form.fields[].alias`: Alias
- `form.fields[].type`: Type
- `form.fields[].defaultValue`: Default Value
- `form.fields[].isRequired`: Is Required (boolean)
- `form.fields[].validationMessage`: Validation Message
- `form.fields[].helpMessage`: Help Message
- `form.fields[].order`: Order (number)
- `form.fields[].properties`: Properties
- `form.fields[].validation`: Validation
- `form.fields[].parent`: Parent
- `form.fields[].conditions`: Conditions
- `form.fields[].labelAttributes`: Label Attributes
- `form.fields[].inputAttributes`: Input Attributes
- `form.fields[].containerAttributes`: Container Attributes
- `form.fields[].leadField`: Lead Field
- `form.fields[].saveResult`: Save Result (boolean)
- `form.fields[].isAutoFill`: Is Auto Fill (boolean)
- `form.fields[].mappedObject`: Mapped Object
- `form.fields[].mappedField`: Mapped Field
- `form.actions`: Actions
- `form.actions[].id`: ID (number)
- `form.actions[].name`: Name
- `form.actions[].description`: Description
- `form.actions[].type`: Type
- `form.actions[].order`: Order (number)
- `form.actions[].properties`: Properties
- `form.actions[].properties.operator`: Operator
- `form.actions[].properties.points`: Points (number)
- `form.actions[].properties.group`: Group
- `form.template`: Template
- `form.inKioskMode`: In Kiosk Mode (boolean)
- `form.renderStyle`: Render Style (boolean)
- `form.formType`: Form Type
- `form.postAction`: Post Action
- `form.postActionProperty`: Post Action Property (url)
- `form.noIndex`: No Index
- `form.formAttributes`: Form Attributes
- `form.language`: Language

### `mautic_delete_form`

**Delete Form.** Permanently deletes a form and its submissions. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Form Id. Numeric form id, from List Forms or Create Form. |

Output fields:

- `form`: Form
- `form.isPublished`: Published (boolean)
- `form.dateAdded`: Date Added (datetime)
- `form.dateModified`: Date Modified (datetime)
- `form.id`: ID
- `form.name`: Name
- `form.alias`: Alias
- `form.category`: Category
- `form.category.id`: ID (number)
- `form.category.title`: Title
- `form.category.alias`: Alias
- `form.category.description`: Description
- `form.category.color`: Color
- `form.category.bundle`: Bundle
- `form.description`: Description
- `form.cachedHtml`: Cached HTML
- `form.publishUp`: Publish Up
- `form.publishDown`: Publish Down
- `form.fields`: Fields
- `form.fields[].id`: ID
- `form.fields[].label`: Label
- `form.fields[].showLabel`: Show Label (boolean)
- `form.fields[].alias`: Alias
- `form.fields[].type`: Type
- `form.fields[].defaultValue`: Default Value
- `form.fields[].isRequired`: Is Required (boolean)
- `form.fields[].validationMessage`: Validation Message
- `form.fields[].helpMessage`: Help Message
- `form.fields[].order`: Order (number)
- `form.fields[].properties`: Properties
- `form.fields[].validation`: Validation
- `form.fields[].parent`: Parent
- `form.fields[].conditions`: Conditions
- `form.fields[].labelAttributes`: Label Attributes
- `form.fields[].inputAttributes`: Input Attributes
- `form.fields[].containerAttributes`: Container Attributes
- `form.fields[].leadField`: Lead Field
- `form.fields[].saveResult`: Save Result (boolean)
- `form.fields[].isAutoFill`: Is Auto Fill (boolean)
- `form.fields[].mappedObject`: Mapped Object
- `form.fields[].mappedField`: Mapped Field
- `form.actions`: Actions
- `form.actions[].id`: ID
- `form.actions[].name`: Name
- `form.actions[].description`: Description
- `form.actions[].type`: Type
- `form.actions[].order`: Order (number)
- `form.actions[].properties`: Properties
- `form.actions[].properties.operator`: Operator
- `form.actions[].properties.points`: Points (number)
- `form.actions[].properties.group`: Group
- `form.template`: Template
- `form.inKioskMode`: In Kiosk Mode (boolean)
- `form.renderStyle`: Render Style (boolean)
- `form.formType`: Form Type
- `form.postAction`: Post Action
- `form.postActionProperty`: Post Action Property (url)
- `form.noIndex`: No Index
- `form.formAttributes`: Form Attributes
- `form.language`: Language

### `mautic_list_form_submissions`

**List Form Submissions.** Lists the submissions of a form with the submitted values, the contact and the page. Page with Start and Limit; the response has the total count. Order By and Where columns take the "s." prefix, e.g. "s.date_submitted"; a bare column name fails. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form Id. Numeric form id, from List Forms. |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |

Output fields:

- `total`: Total
- `submissions`: Submissions
- `submissions[].id`: ID (number)
- `submissions[].ipAddress`: IP Address
- `submissions[].ipAddress.ipAddress`: IP Address
- `submissions[].form`: Form
- `submissions[].form.id`: ID (number)
- `submissions[].form.name`: Name
- `submissions[].form.alias`: Alias
- `submissions[].form.category`: Category
- `submissions[].lead`: Lead
- `submissions[].lead.id`: ID (number)
- `submissions[].lead.points`: Points (number)
- `submissions[].lead.color`: Color
- `submissions[].lead.title`: Title
- `submissions[].lead.firstname`: First Name
- `submissions[].lead.lastname`: Last Name
- `submissions[].lead.company`: Company
- `submissions[].lead.position`: Position
- `submissions[].lead.email`: Email (email)
- `submissions[].lead.phone`: Phone
- `submissions[].lead.mobile`: Mobile
- `submissions[].lead.address1`: Address 1
- `submissions[].lead.address2`: Address 2
- `submissions[].lead.city`: City
- `submissions[].lead.state`: State
- `submissions[].lead.zipcode`: Zip Code
- `submissions[].lead.timezone`: Timezone
- `submissions[].lead.country`: Country
- `submissions[].trackingId`: Tracking ID
- `submissions[].dateSubmitted`: Date Submitted (datetime)
- `submissions[].referer`: Referer
- `submissions[].page`: Page
- `submissions[].results`: Results
- `submissions[].results.email`: Email (email)

### `mautic_get_form_submission`

**Get Form Submission.** Gets a single form submission by id with the submitted values. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form Id. Numeric form id, from List Forms. |
| `submissionId` | string | yes |  | Submission Id. Numeric submission id, from List Form Submissions. |

Output fields:

- `submission`: Submission
- `submission.id`: ID (number)
- `submission.ipAddress`: IP Address
- `submission.ipAddress.ipAddress`: IP Address
- `submission.form`: Form
- `submission.form.id`: ID (number)
- `submission.form.name`: Name
- `submission.form.alias`: Alias
- `submission.form.category`: Category
- `submission.lead`: Lead
- `submission.lead.id`: ID (number)
- `submission.lead.points`: Points (number)
- `submission.lead.color`: Color
- `submission.lead.title`: Title
- `submission.lead.firstname`: First Name
- `submission.lead.lastname`: Last Name
- `submission.lead.company`: Company
- `submission.lead.position`: Position
- `submission.lead.email`: Email (email)
- `submission.lead.phone`: Phone
- `submission.lead.mobile`: Mobile
- `submission.lead.address1`: Address 1
- `submission.lead.address2`: Address 2
- `submission.lead.city`: City
- `submission.lead.state`: State
- `submission.lead.zipcode`: Zip Code
- `submission.lead.timezone`: Timezone
- `submission.lead.country`: Country
- `submission.trackingId`: Tracking ID
- `submission.dateSubmitted`: Date Submitted (datetime)
- `submission.referer`: Referer
- `submission.page`: Page
- `submission.results`: Results
- `submission.results.form_id`: Form ID
- `submission.results.email`: Email (email)

### `mautic_list_contact_form_submissions`

**List Contact Form Submissions.** Lists the submissions one contact made on a form, with the submitted values. Order By and Where columns take the "s." prefix, e.g. "s.date_submitted". Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form Id. Numeric form id, from List Forms. |
| `contactId` | string | yes |  | Contact Id. Numeric contact id, from List Contacts. |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |

Output fields:

- `total`: Total
- `submissions`: Submissions
- `submissions[].id`: ID (number)
- `submissions[].ipAddress`: IP Address
- `submissions[].ipAddress.ipAddress`: IP Address
- `submissions[].form`: Form
- `submissions[].form.id`: ID (number)
- `submissions[].form.name`: Name
- `submissions[].form.alias`: Alias
- `submissions[].form.category`: Category
- `submissions[].lead`: Lead
- `submissions[].lead.id`: ID (number)
- `submissions[].lead.points`: Points (number)
- `submissions[].lead.color`: Color
- `submissions[].lead.title`: Title
- `submissions[].lead.firstname`: First Name
- `submissions[].lead.lastname`: Last Name
- `submissions[].lead.company`: Company
- `submissions[].lead.position`: Position
- `submissions[].lead.email`: Email (email)
- `submissions[].lead.phone`: Phone
- `submissions[].lead.mobile`: Mobile
- `submissions[].lead.address1`: Address 1
- `submissions[].lead.address2`: Address 2
- `submissions[].lead.city`: City
- `submissions[].lead.state`: State
- `submissions[].lead.zipcode`: Zip Code
- `submissions[].lead.timezone`: Timezone
- `submissions[].lead.country`: Country
- `submissions[].trackingId`: Tracking ID
- `submissions[].dateSubmitted`: Date Submitted (datetime)
- `submissions[].referer`: Referer
- `submissions[].page`: Page
- `submissions[].results`: Results
- `submissions[].results.email`: Email (email)

### `mautic_delete_form_actions`

**Delete Form Actions.** Removes submit actions from a form by id. Repeating it with the same ids changes nothing. Returns the form. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form Id. Numeric form id, from List Forms. |
| `ids` | array | yes |  | Action Ids. Action ids to delete, from the actions of Get Form. |

Output fields:

- `form`: Form
- `form.isPublished`: Published (boolean)
- `form.dateAdded`: Date Added (datetime)
- `form.dateModified`: Date Modified (datetime)
- `form.id`: ID (number)
- `form.name`: Name
- `form.alias`: Alias
- `form.category`: Category
- `form.category.isPublished`: Published (boolean)
- `form.category.dateAdded`: Date Added (datetime)
- `form.category.id`: ID (number)
- `form.category.title`: Title
- `form.category.alias`: Alias
- `form.category.description`: Description
- `form.category.color`: Color
- `form.category.bundle`: Bundle
- `form.description`: Description
- `form.cachedHtml`: Cached HTML
- `form.fields`: Fields
- `form.fields[].id`: ID (number)
- `form.fields[].label`: Label
- `form.fields[].showLabel`: Show Label (boolean)
- `form.fields[].alias`: Alias
- `form.fields[].type`: Type
- `form.fields[].isRequired`: Is Required (boolean)
- `form.fields[].order`: Order (number)
- `form.fields[].properties`: Properties
- `form.fields[].validation`: Validation
- `form.fields[].conditions`: Conditions
- `form.fields[].leadField`: Lead Field
- `form.fields[].saveResult`: Save Result (boolean)
- `form.fields[].isAutoFill`: Is Auto Fill (boolean)
- `form.fields[].mappedObject`: Mapped Object
- `form.fields[].mappedField`: Mapped Field
- `form.actions`: Actions
- `form.actions[].id`: ID (number)
- `form.actions[].name`: Name
- `form.actions[].type`: Type
- `form.actions[].order`: Order (number)
- `form.actions[].properties`: Properties
- `form.actions[].properties.operator`: Operator
- `form.actions[].properties.points`: Points (number)
- `form.inKioskMode`: In Kiosk Mode (boolean)
- `form.renderStyle`: Render Style (boolean)
- `form.formType`: Form Type
- `form.postAction`: Post Action
- `form.postActionProperty`: Post Action Property (url)

### `mautic_delete_form_fields`

**Delete Form Fields.** Removes fields from a form by id; past submissions lose those values. Repeating it with the same ids changes nothing. Returns the form. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form Id. Numeric form id, from List Forms. |
| `ids` | array | yes |  | Field Ids. Field ids to delete, from the fields of Get Form. |

Output fields:

- `form`: Form
- `form.isPublished`: Published (boolean)
- `form.dateAdded`: Date Added (datetime)
- `form.dateModified`: Date Modified (datetime)
- `form.id`: ID (number)
- `form.name`: Name
- `form.alias`: Alias
- `form.category`: Category
- `form.category.isPublished`: Published (boolean)
- `form.category.dateAdded`: Date Added (datetime)
- `form.category.id`: ID (number)
- `form.category.title`: Title
- `form.category.alias`: Alias
- `form.category.description`: Description
- `form.category.color`: Color
- `form.category.bundle`: Bundle
- `form.description`: Description
- `form.cachedHtml`: Cached HTML
- `form.fields`: Fields
- `form.fields[].id`: ID (number)
- `form.fields[].label`: Label
- `form.fields[].showLabel`: Show Label (boolean)
- `form.fields[].alias`: Alias
- `form.fields[].type`: Type
- `form.fields[].isRequired`: Is Required (boolean)
- `form.fields[].order`: Order (number)
- `form.fields[].properties`: Properties
- `form.fields[].validation`: Validation
- `form.fields[].conditions`: Conditions
- `form.fields[].leadField`: Lead Field
- `form.fields[].saveResult`: Save Result (boolean)
- `form.fields[].isAutoFill`: Is Auto Fill (boolean)
- `form.fields[].mappedObject`: Mapped Object
- `form.fields[].mappedField`: Mapped Field
- `form.actions`: Actions
- `form.actions[].id`: ID (number)
- `form.actions[].name`: Name
- `form.actions[].type`: Type
- `form.actions[].order`: Order (number)
- `form.actions[].properties`: Properties
- `form.actions[].properties.operator`: Operator
- `form.actions[].properties.points`: Points (number)
- `form.inKioskMode`: In Kiosk Mode (boolean)
- `form.renderStyle`: Render Style (boolean)
- `form.formType`: Form Type
- `form.postAction`: Post Action
- `form.postActionProperty`: Post Action Property (url)

### `mautic_list_assets`

**List Assets.** Lists assets (downloadable files) with their download counts. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `assets`: Assets
- `assets[].isPublished`: Published (boolean)
- `assets[].dateAdded`: Date Added (datetime)
- `assets[].dateModified`: Date Modified
- `assets[].id`: ID (number)
- `assets[].title`: Title
- `assets[].alias`: Alias
- `assets[].category`: Category
- `assets[].category.id`: ID (number)
- `assets[].category.title`: Title
- `assets[].category.alias`: Alias
- `assets[].category.description`: Description
- `assets[].category.color`: Color
- `assets[].category.bundle`: Bundle
- `assets[].description`: Description
- `assets[].language`: Language
- `assets[].publishUp`: Publish Up
- `assets[].publishDown`: Publish Down
- `assets[].downloadCount`: Download Count (number)
- `assets[].uniqueDownloadCount`: Unique Download Count (number)
- `assets[].revision`: Revision (number)
- `assets[].extension`: Extension
- `assets[].mime`: Mime
- `assets[].size`: Size (filesize)
- `assets[].downloadUrl`: Download URL (url)
- `assets[].storageLocation`: Storage Location
- `assets[].disallow`: Disallow (boolean)

### `mautic_get_asset`

**Get Asset.** Gets a single asset by its numeric id, with its download URL. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Asset Id. Numeric asset id, from List Assets or Create Asset. |

Output fields:

- `asset`: Asset
- `asset.isPublished`: Published (boolean)
- `asset.dateAdded`: Date Added (datetime)
- `asset.dateModified`: Date Modified (datetime)
- `asset.id`: ID (number)
- `asset.title`: Title
- `asset.alias`: Alias
- `asset.category`: Category
- `asset.category.id`: ID (number)
- `asset.category.title`: Title
- `asset.category.alias`: Alias
- `asset.category.description`: Description
- `asset.category.color`: Color
- `asset.category.bundle`: Bundle
- `asset.description`: Description
- `asset.language`: Language
- `asset.publishUp`: Publish Up
- `asset.publishDown`: Publish Down
- `asset.downloadCount`: Download Count (number)
- `asset.uniqueDownloadCount`: Unique Download Count (number)
- `asset.revision`: Revision (number)
- `asset.extension`: Extension
- `asset.mime`: Mime
- `asset.size`: Size (filesize)
- `asset.downloadUrl`: Download URL (url)
- `asset.storageLocation`: Storage Location
- `asset.disallow`: Disallow (boolean)

### `mautic_create_asset`

**Create Asset.** Creates an asset that points to a file at a remote URL. Title and Remote URL are required. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `file` | string | yes |  | Remote URL. Public URL of the file, e.g. "https://example.com/guide.pdf". Mautic links to it rather than storing a copy. |
| `alias` | string | no |  | Alias. |
| `description` | string | no |  | Description. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `language` | string | no |  | Language. Locale code, e.g. "en". |
| `additionalFields` | JSON | no |  | Additional Fields. Other asset properties, e.g. "publishUp", "publishDown". The dedicated props above win over the same keys here. |

Output fields:

- `asset`: Asset
- `asset.isPublished`: Published (boolean)
- `asset.dateAdded`: Date Added (datetime)
- `asset.dateModified`: Date Modified
- `asset.id`: ID (number)
- `asset.title`: Title
- `asset.alias`: Alias
- `asset.category`: Category
- `asset.category.id`: ID (number)
- `asset.category.title`: Title
- `asset.category.alias`: Alias
- `asset.category.description`: Description
- `asset.category.color`: Color
- `asset.category.bundle`: Bundle
- `asset.description`: Description
- `asset.language`: Language
- `asset.publishUp`: Publish Up
- `asset.publishDown`: Publish Down
- `asset.downloadCount`: Download Count (number)
- `asset.uniqueDownloadCount`: Unique Download Count (number)
- `asset.revision`: Revision (number)
- `asset.extension`: Extension
- `asset.mime`: Mime
- `asset.size`: Size (filesize)
- `asset.downloadUrl`: Download URL (url)
- `asset.storageLocation`: Storage Location
- `asset.disallow`: Disallow (boolean)

### `mautic_update_asset`

**Update Asset.** Updates an existing asset; a new Remote URL replaces the file. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Asset Id. Numeric asset id, from List Assets or Create Asset. |
| `title` | string | no |  | Title. |
| `file` | string | no |  | Remote URL. Public URL of the file, e.g. "https://example.com/guide.pdf". Mautic links to it rather than storing a copy. |
| `alias` | string | no |  | Alias. |
| `description` | string | no |  | Description. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `language` | string | no |  | Language. Locale code, e.g. "en". |
| `additionalFields` | JSON | no |  | Additional Fields. Other asset properties, e.g. "publishUp", "publishDown". The dedicated props above win over the same keys here. |

Output fields:

- `asset`: Asset
- `asset.isPublished`: Published (boolean)
- `asset.dateAdded`: Date Added (datetime)
- `asset.dateModified`: Date Modified (datetime)
- `asset.id`: ID (number)
- `asset.title`: Title
- `asset.alias`: Alias
- `asset.category`: Category
- `asset.category.id`: ID (number)
- `asset.category.title`: Title
- `asset.category.alias`: Alias
- `asset.category.description`: Description
- `asset.category.color`: Color
- `asset.category.bundle`: Bundle
- `asset.description`: Description
- `asset.language`: Language
- `asset.publishUp`: Publish Up
- `asset.publishDown`: Publish Down
- `asset.downloadCount`: Download Count (number)
- `asset.uniqueDownloadCount`: Unique Download Count (number)
- `asset.revision`: Revision (number)
- `asset.extension`: Extension
- `asset.mime`: Mime
- `asset.size`: Size (filesize)
- `asset.downloadUrl`: Download URL (url)
- `asset.storageLocation`: Storage Location
- `asset.disallow`: Disallow (boolean)

### `mautic_delete_asset`

**Delete Asset.** Permanently deletes an asset and its download stats. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Asset Id. Numeric asset id, from List Assets or Create Asset. |

Output fields:

- `asset`: Asset
- `asset.isPublished`: Published (boolean)
- `asset.dateAdded`: Date Added (datetime)
- `asset.dateModified`: Date Modified
- `asset.id`: ID
- `asset.title`: Title
- `asset.alias`: Alias
- `asset.category`: Category
- `asset.category.id`: ID (number)
- `asset.category.title`: Title
- `asset.category.alias`: Alias
- `asset.category.description`: Description
- `asset.category.color`: Color
- `asset.category.bundle`: Bundle
- `asset.description`: Description
- `asset.language`: Language
- `asset.publishUp`: Publish Up
- `asset.publishDown`: Publish Down
- `asset.downloadCount`: Download Count (number)
- `asset.uniqueDownloadCount`: Unique Download Count (number)
- `asset.revision`: Revision (number)
- `asset.extension`: Extension
- `asset.mime`: Mime
- `asset.size`: Size (filesize)
- `asset.downloadUrl`: Download URL (url)
- `asset.storageLocation`: Storage Location
- `asset.disallow`: Disallow (boolean)

### `mautic_list_pages`

**List Landing Pages.** Lists landing pages with their hit counts. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `pages`: Pages
- `pages[].isPublished`: Published (boolean)
- `pages[].dateAdded`: Date Added (datetime)
- `pages[].dateModified`: Date Modified
- `pages[].id`: ID (number)
- `pages[].title`: Title
- `pages[].alias`: Alias
- `pages[].category`: Category
- `pages[].category.id`: ID (number)
- `pages[].category.title`: Title
- `pages[].category.alias`: Alias
- `pages[].category.description`: Description
- `pages[].category.color`: Color
- `pages[].category.bundle`: Bundle
- `pages[].language`: Language
- `pages[].publishUp`: Publish Up
- `pages[].publishDown`: Publish Down
- `pages[].hits`: Hits (number)
- `pages[].uniqueHits`: Unique Hits (number)
- `pages[].variantHits`: Variant Hits (number)
- `pages[].revision`: Revision (number)
- `pages[].metaDescription`: Meta Description
- `pages[].redirectType`: Redirect Type
- `pages[].redirectUrl`: Redirect URL (url)
- `pages[].isPreferenceCenter`: Is Preference Center
- `pages[].noIndex`: No Index
- `pages[].variantSettings`: Variant Settings
- `pages[].variantStartDate`: Variant Start Date
- `pages[].variantParent`: Variant Parent
- `pages[].variantChildren`: Variant Children
- `pages[].translationParent`: Translation Parent
- `pages[].translationChildren`: Translation Children
- `pages[].template`: Template
- `pages[].customHtml`: Custom HTML

### `mautic_get_page`

**Get Landing Page.** Gets a single landing page by its numeric id, with its HTML and URL. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Landing Page Id. Numeric landing page id, from List Landing Pages or Create Landing Page. |

Output fields:

- `page`: Page
- `page.isPublished`: Published (boolean)
- `page.dateAdded`: Date Added (datetime)
- `page.dateModified`: Date Modified (datetime)
- `page.id`: ID (number)
- `page.title`: Title
- `page.alias`: Alias
- `page.category`: Category
- `page.category.id`: ID (number)
- `page.category.title`: Title
- `page.category.alias`: Alias
- `page.category.description`: Description
- `page.category.color`: Color
- `page.category.bundle`: Bundle
- `page.language`: Language
- `page.publishUp`: Publish Up
- `page.publishDown`: Publish Down
- `page.hits`: Hits (number)
- `page.uniqueHits`: Unique Hits (number)
- `page.variantHits`: Variant Hits (number)
- `page.revision`: Revision (number)
- `page.metaDescription`: Meta Description
- `page.redirectType`: Redirect Type
- `page.redirectUrl`: Redirect URL (url)
- `page.isPreferenceCenter`: Is Preference Center
- `page.noIndex`: No Index
- `page.variantSettings`: Variant Settings
- `page.variantStartDate`: Variant Start Date
- `page.variantParent`: Variant Parent
- `page.variantChildren`: Variant Children
- `page.translationParent`: Translation Parent
- `page.translationChildren`: Translation Children
- `page.template`: Template
- `page.customHtml`: Custom HTML

### `mautic_create_page`

**Create Landing Page.** Creates a landing page. Title is required. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `alias` | string | no |  | Alias. Used in the page URL; generated from the title when empty. |
| `customHtml` | string | no |  | HTML. Full HTML of the page. |
| `template` | string | no |  | Theme. Theme name to build the page from, e.g. "blank". |
| `metaDescription` | string | no |  | Meta Description. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `language` | string | no |  | Language. Locale code, e.g. "en". |
| `redirectType` | string | no |  | Redirect Type. Redirect used when the page is unpublished. One of `"301"`, `"302"`. |
| `redirectUrl` | string | no |  | Redirect URL. |
| `additionalFields` | JSON | no |  | Additional Fields. Other page properties, e.g. "publishUp", "publishDown", "isPreferenceCenter", "noIndex". The dedicated props above win over the same keys here. |

Output fields:

- `page`: Page
- `page.isPublished`: Published (boolean)
- `page.dateAdded`: Date Added (datetime)
- `page.dateModified`: Date Modified
- `page.id`: ID (number)
- `page.title`: Title
- `page.alias`: Alias
- `page.category`: Category
- `page.category.id`: ID (number)
- `page.category.title`: Title
- `page.category.alias`: Alias
- `page.category.description`: Description
- `page.category.color`: Color
- `page.category.bundle`: Bundle
- `page.language`: Language
- `page.publishUp`: Publish Up
- `page.publishDown`: Publish Down
- `page.hits`: Hits (number)
- `page.uniqueHits`: Unique Hits (number)
- `page.variantHits`: Variant Hits (number)
- `page.revision`: Revision (number)
- `page.metaDescription`: Meta Description
- `page.redirectType`: Redirect Type
- `page.redirectUrl`: Redirect URL (url)
- `page.isPreferenceCenter`: Is Preference Center
- `page.noIndex`: No Index
- `page.variantSettings`: Variant Settings
- `page.variantStartDate`: Variant Start Date
- `page.variantParent`: Variant Parent
- `page.variantChildren`: Variant Children
- `page.translationParent`: Translation Parent
- `page.translationChildren`: Translation Children
- `page.template`: Template
- `page.customHtml`: Custom HTML

### `mautic_update_page`

**Update Landing Page.** Updates an existing landing page. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Landing Page Id. Numeric landing page id, from List Landing Pages or Create Landing Page. |
| `title` | string | no |  | Title. |
| `alias` | string | no |  | Alias. Used in the page URL; generated from the title when empty. |
| `customHtml` | string | no |  | HTML. Full HTML of the page. |
| `template` | string | no |  | Theme. Theme name to build the page from, e.g. "blank". |
| `metaDescription` | string | no |  | Meta Description. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `language` | string | no |  | Language. Locale code, e.g. "en". |
| `redirectType` | string | no |  | Redirect Type. Redirect used when the page is unpublished. One of `"301"`, `"302"`. |
| `redirectUrl` | string | no |  | Redirect URL. |
| `additionalFields` | JSON | no |  | Additional Fields. Other page properties, e.g. "publishUp", "publishDown", "isPreferenceCenter", "noIndex". The dedicated props above win over the same keys here. |

Output fields:

- `page`: Page
- `page.isPublished`: Published (boolean)
- `page.dateAdded`: Date Added (datetime)
- `page.dateModified`: Date Modified (datetime)
- `page.id`: ID (number)
- `page.title`: Title
- `page.alias`: Alias
- `page.category`: Category
- `page.category.id`: ID (number)
- `page.category.title`: Title
- `page.category.alias`: Alias
- `page.category.description`: Description
- `page.category.color`: Color
- `page.category.bundle`: Bundle
- `page.language`: Language
- `page.publishUp`: Publish Up
- `page.publishDown`: Publish Down
- `page.hits`: Hits (number)
- `page.uniqueHits`: Unique Hits (number)
- `page.variantHits`: Variant Hits (number)
- `page.revision`: Revision (number)
- `page.metaDescription`: Meta Description
- `page.redirectType`: Redirect Type
- `page.redirectUrl`: Redirect URL (url)
- `page.isPreferenceCenter`: Is Preference Center
- `page.noIndex`: No Index
- `page.variantSettings`: Variant Settings
- `page.variantStartDate`: Variant Start Date
- `page.variantParent`: Variant Parent
- `page.variantChildren`: Variant Children
- `page.translationParent`: Translation Parent
- `page.translationChildren`: Translation Children
- `page.template`: Template
- `page.customHtml`: Custom HTML

### `mautic_delete_page`

**Delete Landing Page.** Permanently deletes a landing page and its hit stats. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Landing Page Id. Numeric landing page id, from List Landing Pages or Create Landing Page. |

Output fields:

- `page`: Page
- `page.isPublished`: Published (boolean)
- `page.dateAdded`: Date Added (datetime)
- `page.dateModified`: Date Modified
- `page.id`: ID
- `page.title`: Title
- `page.alias`: Alias
- `page.category`: Category
- `page.category.id`: ID (number)
- `page.category.title`: Title
- `page.category.alias`: Alias
- `page.category.description`: Description
- `page.category.color`: Color
- `page.category.bundle`: Bundle
- `page.language`: Language
- `page.publishUp`: Publish Up
- `page.publishDown`: Publish Down
- `page.hits`: Hits (number)
- `page.uniqueHits`: Unique Hits (number)
- `page.variantHits`: Variant Hits (number)
- `page.revision`: Revision (number)
- `page.metaDescription`: Meta Description
- `page.redirectType`: Redirect Type
- `page.redirectUrl`: Redirect URL (url)
- `page.isPreferenceCenter`: Is Preference Center
- `page.noIndex`: No Index
- `page.variantSettings`: Variant Settings
- `page.variantStartDate`: Variant Start Date
- `page.variantParent`: Variant Parent
- `page.variantChildren`: Variant Children
- `page.translationParent`: Translation Parent
- `page.translationChildren`: Translation Children
- `page.translationChildren[].id`: ID (number)
- `page.translationChildren[].title`: Title
- `page.translationChildren[].alias`: Alias
- `page.translationChildren[].category`: Category
- `page.translationChildren[].language`: Language
- `page.translationChildren[].publishUp`: Publish Up
- `page.translationChildren[].publishDown`: Publish Down
- `page.translationChildren[].hits`: Hits (number)
- `page.translationChildren[].uniqueHits`: Unique Hits (number)
- `page.translationChildren[].variantHits`: Variant Hits (number)
- `page.translationChildren[].revision`: Revision (number)
- `page.translationChildren[].metaDescription`: Meta Description
- `page.translationChildren[].redirectType`: Redirect Type
- `page.translationChildren[].redirectUrl`: Redirect URL
- `page.translationChildren[].isPreferenceCenter`: Is Preference Center
- `page.translationChildren[].noIndex`: No Index
- `page.translationChildren[].variantSettings`: Variant Settings
- `page.translationChildren[].variantStartDate`: Variant Start Date
- `page.translationChildren[].variantParent`: Variant Parent
- `page.translationChildren[].variantChildren`: Variant Children
- `page.translationChildren[].translationChildren`: Translation Children
- `page.translationChildren[].template`: Template
- `page.translationChildren[].customHtml`: Custom HTML
- `page.template`: Template
- `page.customHtml`: Custom HTML

### `mautic_list_users`

**List Users.** Lists Mautic users with their role. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `users`: Users
- `users[].isPublished`: Published (boolean)
- `users[].dateAdded`: Date Added (datetime)
- `users[].dateModified`: Date Modified
- `users[].id`: ID (number)
- `users[].username`: Username
- `users[].firstName`: First Name
- `users[].lastName`: Last Name
- `users[].email`: Email (email)
- `users[].position`: Position
- `users[].role`: Role
- `users[].role.id`: ID (number)
- `users[].role.name`: Name
- `users[].role.description`: Description
- `users[].role.isAdmin`: Is Admin (boolean)
- `users[].role.rawPermissions`: Raw Permissions
- `users[].role.rawPermissions.lead:leads`: Lead Leads
- `users[].timezone`: Timezone
- `users[].locale`: Locale
- `users[].lastLogin`: Last Login
- `users[].lastActive`: Last Active
- `users[].signature`: Signature

### `mautic_get_user`

**Get User.** Gets a single user by its numeric id, with role and permissions. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | User Id. Numeric user id, from List Users or Create User. |

Output fields:

- `user`: User
- `user.isPublished`: Published (boolean)
- `user.dateAdded`: Date Added (datetime)
- `user.dateModified`: Date Modified (datetime)
- `user.id`: ID (number)
- `user.username`: Username
- `user.firstName`: First Name
- `user.lastName`: Last Name
- `user.email`: Email (email)
- `user.position`: Position
- `user.role`: Role
- `user.role.id`: ID (number)
- `user.role.name`: Name
- `user.role.description`: Description
- `user.role.isAdmin`: Is Admin (boolean)
- `user.role.rawPermissions`: Raw Permissions
- `user.role.rawPermissions.lead:leads`: Lead Leads
- `user.timezone`: Timezone
- `user.locale`: Locale
- `user.lastLogin`: Last Login
- `user.lastActive`: Last Active
- `user.signature`: Signature

### `mautic_create_user`

**Create User.** Creates a Mautic user. Username, Email, First Name, Last Name, Role Id and Password are required. Needs an administrator account. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Username. |
| `email` | string | yes |  | Email. |
| `firstName` | string | yes |  | First Name. |
| `lastName` | string | yes |  | Last Name. |
| `role` | number | yes |  | Role Id. Role id, from List Assignable Roles. |
| `position` | string | no |  | Position. |
| `timezone` | string | no |  | Timezone. e.g. "Europe/Berlin". |
| `locale` | string | no |  | Locale. e.g. "en_US". |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `password` | string | yes |  | Password. Password for the user to sign in with. |
| `additionalFields` | JSON | no |  | Additional Fields. Other user properties, e.g. "signature". The dedicated props above win over the same keys here. |

Output fields:

- `user`: User
- `user.isPublished`: Published (boolean)
- `user.dateAdded`: Date Added (datetime)
- `user.dateModified`: Date Modified
- `user.id`: ID (number)
- `user.username`: Username
- `user.firstName`: First Name
- `user.lastName`: Last Name
- `user.email`: Email (email)
- `user.position`: Position
- `user.role`: Role
- `user.role.id`: ID (number)
- `user.role.name`: Name
- `user.role.description`: Description
- `user.role.isAdmin`: Is Admin (boolean)
- `user.role.rawPermissions`: Raw Permissions
- `user.role.rawPermissions.lead:leads`: Lead Leads
- `user.role.rawPermissions.email:emails`: Email Emails
- `user.timezone`: Timezone
- `user.locale`: Locale
- `user.lastLogin`: Last Login
- `user.lastActive`: Last Active
- `user.signature`: Signature

### `mautic_update_user`

**Update User.** Updates an existing user; give Password only to change it. Needs an administrator account. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | User Id. Numeric user id, from List Users or Create User. |
| `username` | string | no |  | Username. |
| `email` | string | no |  | Email. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `role` | number | no |  | Role Id. Role id, from List Assignable Roles. |
| `position` | string | no |  | Position. |
| `timezone` | string | no |  | Timezone. e.g. "Europe/Berlin". |
| `locale` | string | no |  | Locale. e.g. "en_US". |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `password` | string | no |  | Password. Password for the user to sign in with. |
| `additionalFields` | JSON | no |  | Additional Fields. Other user properties, e.g. "signature". The dedicated props above win over the same keys here. |

Output fields:

- `user`: User
- `user.isPublished`: Published (boolean)
- `user.dateAdded`: Date Added (datetime)
- `user.dateModified`: Date Modified (datetime)
- `user.id`: ID (number)
- `user.username`: Username
- `user.firstName`: First Name
- `user.lastName`: Last Name
- `user.email`: Email (email)
- `user.position`: Position
- `user.role`: Role
- `user.role.id`: ID (number)
- `user.role.name`: Name
- `user.role.description`: Description
- `user.role.isAdmin`: Is Admin (boolean)
- `user.role.rawPermissions`: Raw Permissions
- `user.role.rawPermissions.lead:leads`: Lead Leads
- `user.timezone`: Timezone
- `user.locale`: Locale
- `user.lastLogin`: Last Login
- `user.lastActive`: Last Active
- `user.signature`: Signature

### `mautic_delete_user`

**Delete User.** Permanently deletes a user. Needs an administrator account. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | User Id. Numeric user id, from List Users or Create User. |

Output fields:

- `user`: User
- `user.isPublished`: Published (boolean)
- `user.dateAdded`: Date Added (datetime)
- `user.dateModified`: Date Modified
- `user.id`: ID
- `user.username`: Username
- `user.firstName`: First Name
- `user.lastName`: Last Name
- `user.email`: Email (email)
- `user.position`: Position
- `user.role`: Role
- `user.role.id`: ID (number)
- `user.role.name`: Name
- `user.role.description`: Description
- `user.role.isAdmin`: Is Admin (boolean)
- `user.role.rawPermissions`: Raw Permissions
- `user.role.rawPermissions.lead:leads`: Lead Leads
- `user.role.rawPermissions.email:emails`: Email Emails
- `user.timezone`: Timezone
- `user.locale`: Locale
- `user.lastLogin`: Last Login
- `user.lastActive`: Last Active
- `user.signature`: Signature

### `mautic_get_current_user`

**Get Current User.** Gets the user this connection signs in as, with role and permissions. Use it to find your own user id. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `isPublished`: Published (boolean)
- `id`: ID (number)
- `username`: Username
- `firstName`: First Name
- `lastName`: Last Name
- `email`: Email (email)
- `role`: Role
- `role.isPublished`: Published (boolean)
- `role.id`: ID (number)
- `role.name`: Name
- `role.description`: Description
- `role.isAdmin`: Is Admin (boolean)
- `timezone`: Timezone
- `locale`: Locale
- `lastLogin`: Last Login (datetime)
- `lastActive`: Last Active (datetime)

### `mautic_list_assignable_roles`

**List Assignable Roles.** Lists role ids and names to use as Role Id in Create User or Update User. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `roles`: Roles
- `roles[].id`: ID (number)
- `roles[].name`: Name

### `mautic_check_user_permissions`

**Check User Permissions.** Checks permission strings for a user and returns true or false for each, e.g. "email:emails:send". Read-only. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | User Id. Numeric user id, from List Users or Get Current User. |
| `permissions` | array | yes |  | Permissions. Permission strings, e.g. "lead:leads:viewother", "email:emails:send". |

### `mautic_list_roles`

**List Roles.** Lists user roles with their permissions. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `roles`: Roles
- `roles[].isPublished`: Published (boolean)
- `roles[].dateAdded`: Date Added (datetime)
- `roles[].dateModified`: Date Modified
- `roles[].id`: ID (number)
- `roles[].name`: Name
- `roles[].description`: Description
- `roles[].isAdmin`: Is Admin (boolean)
- `roles[].rawPermissions`: Raw Permissions
- `roles[].rawPermissions.lead:leads`: Lead Leads
- `roles[].rawPermissions.email:emails`: Email Emails

### `mautic_get_role`

**Get Role.** Gets a single role by its numeric id, with its permissions. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Role Id. Numeric role id, from List Roles or Create Role. |

Output fields:

- `role`: Role
- `role.isPublished`: Published (boolean)
- `role.dateAdded`: Date Added (datetime)
- `role.dateModified`: Date Modified (datetime)
- `role.id`: ID (number)
- `role.name`: Name
- `role.description`: Description
- `role.isAdmin`: Is Admin (boolean)
- `role.rawPermissions`: Raw Permissions
- `role.rawPermissions.lead:leads`: Lead Leads
- `role.rawPermissions.email:emails`: Email Emails

### `mautic_create_role`

**Create Role.** Creates a role. Name is required; give Administrator or Permissions. Needs an administrator account. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. |
| `isAdmin` | string | no |  | Administrator. Full access to everything; permissions are ignored. One of `true`, `false`. |
| `rawPermissions` | JSON | no |  | Permissions. Permissions by bundle, e.g. {"email:emails": ["viewown", "editown", "create"], "lead:leads": ["full"]}. |
| `additionalFields` | JSON | no |  | Additional Fields. Other role properties. The dedicated props above win over the same keys here. |

Output fields:

- `role`: Role
- `role.isPublished`: Published (boolean)
- `role.dateAdded`: Date Added (datetime)
- `role.dateModified`: Date Modified
- `role.id`: ID (number)
- `role.name`: Name
- `role.description`: Description
- `role.isAdmin`: Is Admin (boolean)
- `role.rawPermissions`: Raw Permissions
- `role.rawPermissions.lead:leads`: Lead Leads
- `role.rawPermissions.email:emails`: Email Emails

### `mautic_update_role`

**Update Role.** Updates an existing role; Permissions, when given, replace the existing ones. Needs an administrator account. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Role Id. Numeric role id, from List Roles or Create Role. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `isAdmin` | string | no |  | Administrator. Full access to everything; permissions are ignored. One of `true`, `false`. |
| `rawPermissions` | JSON | no |  | Permissions. Permissions by bundle, e.g. {"email:emails": ["viewown", "editown", "create"], "lead:leads": ["full"]}. |
| `additionalFields` | JSON | no |  | Additional Fields. Other role properties. The dedicated props above win over the same keys here. |

Output fields:

- `role`: Role
- `role.isPublished`: Published (boolean)
- `role.dateAdded`: Date Added (datetime)
- `role.dateModified`: Date Modified (datetime)
- `role.id`: ID (number)
- `role.name`: Name
- `role.description`: Description
- `role.isAdmin`: Is Admin (boolean)
- `role.rawPermissions`: Raw Permissions
- `role.rawPermissions.lead:leads`: Lead Leads

### `mautic_delete_role`

**Delete Role.** Permanently deletes a role; it must have no users. Needs an administrator account. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Role Id. Numeric role id, from List Roles or Create Role. |

Output fields:

- `role`: Role
- `role.isPublished`: Published (boolean)
- `role.dateAdded`: Date Added (datetime)
- `role.dateModified`: Date Modified
- `role.id`: ID
- `role.name`: Name
- `role.description`: Description
- `role.isAdmin`: Is Admin (boolean)
- `role.rawPermissions`: Raw Permissions
- `role.rawPermissions.lead:leads`: Lead Leads
- `role.rawPermissions.email:emails`: Email Emails

### `mautic_list_point_groups`

**List Point Groups.** Lists point groups, which keep separate scores per contact. Needs Mautic 5.1 or later. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `pointGroups`: Point Groups
- `pointGroups[].isPublished`: Published (boolean)
- `pointGroups[].dateAdded`: Date Added (datetime)
- `pointGroups[].dateModified`: Date Modified
- `pointGroups[].id`: ID (number)
- `pointGroups[].name`: Name
- `pointGroups[].description`: Description

### `mautic_get_point_group`

**Get Point Group.** Gets a single point group by its numeric id. Needs Mautic 5.1 or later. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Point Group Id. Numeric point group id, from List Point Groups or Create Point Group. |

Output fields:

- `pointGroup`: Point Group
- `pointGroup.isPublished`: Published (boolean)
- `pointGroup.dateAdded`: Date Added (datetime)
- `pointGroup.dateModified`: Date Modified (datetime)
- `pointGroup.id`: ID (number)
- `pointGroup.name`: Name
- `pointGroup.description`: Description

### `mautic_create_point_group`

**Create Point Group.** Creates a point group. Name is required. Adjust a contact's score in it with Adjust Contact Group Points. Needs Mautic 5.1 or later. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `additionalFields` | JSON | no |  | Additional Fields. Other point group properties. The dedicated props above win over the same keys here. |

Output fields:

- `pointGroup`: Point Group
- `pointGroup.isPublished`: Published (boolean)
- `pointGroup.dateAdded`: Date Added (datetime)
- `pointGroup.dateModified`: Date Modified
- `pointGroup.id`: ID (number)
- `pointGroup.name`: Name
- `pointGroup.description`: Description

### `mautic_update_point_group`

**Update Point Group.** Updates an existing point group. Needs Mautic 5.1 or later. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Point Group Id. Numeric point group id, from List Point Groups or Create Point Group. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `additionalFields` | JSON | no |  | Additional Fields. Other point group properties. The dedicated props above win over the same keys here. |

Output fields:

- `pointGroup`: Point Group
- `pointGroup.isPublished`: Published (boolean)
- `pointGroup.dateAdded`: Date Added (datetime)
- `pointGroup.dateModified`: Date Modified (datetime)
- `pointGroup.id`: ID (number)
- `pointGroup.name`: Name
- `pointGroup.description`: Description

### `mautic_delete_point_group`

**Delete Point Group.** Permanently deletes a point group and every contact score in it. Needs Mautic 5.1 or later. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Point Group Id. Numeric point group id, from List Point Groups or Create Point Group. |

Output fields:

- `pointGroup`: Point Group
- `pointGroup.isPublished`: Published (boolean)
- `pointGroup.dateAdded`: Date Added (datetime)
- `pointGroup.dateModified`: Date Modified
- `pointGroup.id`: ID
- `pointGroup.name`: Name
- `pointGroup.description`: Description

### `mautic_list_reports`

**List Reports.** Lists saved reports with their source, columns and filters. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `reports`: Reports
- `reports[].id`: ID (number)
- `reports[].name`: Name
- `reports[].description`: Description
- `reports[].system`: System (boolean)
- `reports[].isScheduled`: Is Scheduled (boolean)
- `reports[].source`: Source
- `reports[].columns`: Columns
- `reports[].filters`: Filters
- `reports[].filters[].column`: Column
- `reports[].filters[].glue`: Glue
- `reports[].filters[].dynamic`: Dynamic
- `reports[].filters[].condition`: Condition
- `reports[].filters[].value`: Value
- `reports[].tableOrder`: Table Order
- `reports[].graphs`: Graphs
- `reports[].groupBy`: Group By
- `reports[].settings`: Settings
- `reports[].settings.showDynamicFilters`: Show Dynamic Filters
- `reports[].settings.hideDateRangeFilter`: Hide Date Range Filter
- `reports[].settings.showGraphsAboveTable`: Show Graphs Above Table
- `reports[].aggregators`: Aggregators
- `reports[].scheduleUnit`: Schedule Unit
- `reports[].toAddress`: To Address
- `reports[].scheduleDay`: Schedule Day
- `reports[].scheduleMonthFrequency`: Schedule Month Frequency

### `mautic_get_report`

**Get Report.** Runs a saved report and returns its rows for a date range, with the total count. Page with Page and Limit. Defaults to the report's own date range. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Report Id. Numeric report id, from List Reports or Create Report. |
| `dateFrom` | string | no |  | Date From. Date in UTC, e.g. "2026-01-31". |
| `dateTo` | string | no |  | Date To. Date in UTC, e.g. "2026-01-31". |
| `page` | number | no |  | Page. Page number, starting at 1. |
| `limit` | number | no |  | Limit. Rows per page. |

Output fields:

- `totalResults`: Total Results (number)
- `data`: Data
- `dataColumns`: Data Columns (an object whose keys vary)
- `limit`: Limit (number)
- `page`: Page (number)
- `debug`: Debug
- `aggregatorColumns`: Aggregator Columns
- `report`: Report
- `report.isPublished`: Published (boolean)
- `report.dateAdded`: Date Added (datetime)
- `report.id`: ID (number)
- `report.name`: Name
- `report.description`: Description
- `report.system`: System (boolean)
- `report.isScheduled`: Is Scheduled (boolean)
- `report.source`: Source
- `report.columns`: Columns
- `report.filters`: Filters
- `report.filters[].column`: Column
- `report.filters[].condition`: Condition
- `report.filters[].value`: Value
- `report.tableOrder`: Table Order
- `report.tableOrder[].column`: Column
- `report.tableOrder[].direction`: Direction
- `report.graphs`: Graphs
- `report.groupBy`: Group By
- `report.settings`: Settings
- `report.aggregators`: Aggregators
- `report.dateModified`: Date Modified (datetime)
- `dateFrom`: Date From (datetime)
- `dateTo`: Date To (datetime)

### `mautic_create_report`

**Create Report.** Creates a report. Name and Source are required, with the columns to show. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `source` | string | yes |  | Source. Data source, e.g. "leads", "companies", "email.stats", "page.hits", "form.submissions", "asset.downloads", "campaign_lead_event_log". |
| `columns` | array | no |  | Columns. Column keys to include, e.g. ["l.id", "l.email", "l.firstname"]. Get Report on an existing report shows valid keys. |
| `filters` | array | no |  | Filters. Filters, each like {"column": "l.email", "condition": "like", "value": "%@example.com", "glue": "and"}. |
| `description` | string | no |  | Description. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `system` | string | no |  | Visible to Everyone. Whether all users can see the report. One of `true`, `false`. |
| `additionalFields` | JSON | no |  | Additional Fields. Other report properties, e.g. "tableOrder", "graphs", "groupBy", "aggregators", "isScheduled", "scheduleUnit", "toAddress". The dedicated props above win over the same keys here. |

Output fields:

- `report`: Report
- `report.id`: ID (number)
- `report.name`: Name
- `report.description`: Description
- `report.system`: System (boolean)
- `report.isScheduled`: Is Scheduled (boolean)
- `report.source`: Source
- `report.columns`: Columns
- `report.filters`: Filters
- `report.filters[].column`: Column
- `report.filters[].glue`: Glue
- `report.filters[].dynamic`: Dynamic
- `report.filters[].condition`: Condition
- `report.filters[].value`: Value
- `report.tableOrder`: Table Order
- `report.graphs`: Graphs
- `report.groupBy`: Group By
- `report.settings`: Settings
- `report.settings.showGraphsAboveTable`: Show Graphs Above Table
- `report.settings.showDynamicFilters`: Show Dynamic Filters
- `report.settings.hideDateRangeFilter`: Hide Date Range Filter
- `report.aggregators`: Aggregators
- `report.scheduleUnit`: Schedule Unit
- `report.toAddress`: To Address
- `report.scheduleDay`: Schedule Day
- `report.scheduleMonthFrequency`: Schedule Month Frequency

### `mautic_update_report`

**Update Report.** Updates an existing report. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Report Id. Numeric report id, from List Reports or Create Report. |
| `name` | string | no |  | Name. |
| `source` | string | no |  | Source. Data source, e.g. "leads", "companies", "email.stats", "page.hits", "form.submissions", "asset.downloads", "campaign_lead_event_log". |
| `columns` | array | no |  | Columns. Column keys to include, e.g. ["l.id", "l.email", "l.firstname"]. Get Report on an existing report shows valid keys. |
| `filters` | array | no |  | Filters. Filters, each like {"column": "l.email", "condition": "like", "value": "%@example.com", "glue": "and"}. |
| `description` | string | no |  | Description. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `system` | string | no |  | Visible to Everyone. Whether all users can see the report. One of `true`, `false`. |
| `additionalFields` | JSON | no |  | Additional Fields. Other report properties, e.g. "tableOrder", "graphs", "groupBy", "aggregators", "isScheduled", "scheduleUnit", "toAddress". The dedicated props above win over the same keys here. |

Output fields:

- `report`: Report
- `report.id`: ID (number)
- `report.name`: Name
- `report.description`: Description
- `report.system`: System (boolean)
- `report.isScheduled`: Is Scheduled (boolean)
- `report.source`: Source
- `report.columns`: Columns
- `report.filters`: Filters
- `report.filters[].column`: Column
- `report.filters[].glue`: Glue
- `report.filters[].dynamic`: Dynamic
- `report.filters[].condition`: Condition
- `report.filters[].value`: Value
- `report.tableOrder`: Table Order
- `report.graphs`: Graphs
- `report.groupBy`: Group By
- `report.settings`: Settings
- `report.settings.showDynamicFilters`: Show Dynamic Filters
- `report.settings.hideDateRangeFilter`: Hide Date Range Filter
- `report.settings.showGraphsAboveTable`: Show Graphs Above Table
- `report.aggregators`: Aggregators
- `report.scheduleUnit`: Schedule Unit
- `report.toAddress`: To Address
- `report.scheduleDay`: Schedule Day
- `report.scheduleMonthFrequency`: Schedule Month Frequency

### `mautic_delete_report`

**Delete Report.** Permanently deletes a report. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Report Id. Numeric report id, from List Reports or Create Report. |

Output fields:

- `report`: Report
- `report.id`: ID
- `report.name`: Name
- `report.description`: Description
- `report.system`: System (boolean)
- `report.isScheduled`: Is Scheduled (boolean)
- `report.source`: Source
- `report.columns`: Columns
- `report.filters`: Filters
- `report.filters[].column`: Column
- `report.filters[].glue`: Glue
- `report.filters[].dynamic`: Dynamic
- `report.filters[].condition`: Condition
- `report.filters[].value`: Value
- `report.tableOrder`: Table Order
- `report.graphs`: Graphs
- `report.groupBy`: Group By
- `report.settings`: Settings
- `report.settings.showDynamicFilters`: Show Dynamic Filters
- `report.settings.hideDateRangeFilter`: Hide Date Range Filter
- `report.settings.showGraphsAboveTable`: Show Graphs Above Table
- `report.aggregators`: Aggregators
- `report.scheduleUnit`: Schedule Unit
- `report.toAddress`: To Address
- `report.scheduleDay`: Schedule Day
- `report.scheduleMonthFrequency`: Schedule Month Frequency

### `mautic_get_stats`

**Get Stats.** Reads raw rows from a Mautic stats table, e.g. "email_stats", "page_hits", "form_submissions", "lead_points_change_log", "campaign_lead_event_log". Leave Table empty to list the available tables and their columns. Filter with Where; page with Start and Limit. Each table needs its own view permission. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `table` | string | no |  | Table. Stats table name; leave empty to list the tables. |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |

Output fields:

- `total`: Total
- `stats`: Stats
- `availableTables`: Available Tables
- `tableColumns`: Table Columns
- `tableColumns.asset_downloads`: Asset Downloads
- `tableColumns.audit_log`: Audit Log
- `tableColumns.campaign_lead_event_log`: Campaign Lead Event Log
- `tableColumns.campaign_leads`: Campaign Leads
- `tableColumns.channel_url_trackables`: Channel URL Trackables
- `tableColumns.companies_leads`: Companies Leads
- `tableColumns.dynamic_content_lead_data`: Dynamic Content Lead Data
- `tableColumns.dynamic_content_stats`: Dynamic Content Stats
- `tableColumns.email_stat_replies`: Email Stat Replies
- `tableColumns.email_stats`: Email Stats
- `tableColumns.email_stats_devices`: Email Stats Devices
- `tableColumns.focus_stats`: Focus Stats
- `tableColumns.form_submissions`: Form Submissions
- `tableColumns.ip_addresses`: IP Addresses
- `tableColumns.lead_categories`: Lead Categories
- `tableColumns.lead_companies_change_log`: Lead Companies Change Log
- `tableColumns.lead_devices`: Lead Devices
- `tableColumns.lead_donotcontact`: Lead Donotcontact
- `tableColumns.lead_event_log`: Lead Event Log
- `tableColumns.lead_frequencyrules`: Lead Frequencyrules
- `tableColumns.lead_lists_leads`: Lead Lists Leads
- `tableColumns.lead_points_change_log`: Lead Points Change Log
- `tableColumns.lead_stages_change_log`: Lead Stages Change Log
- `tableColumns.lead_utmtags`: Lead Utmtags
- `tableColumns.page_hits`: Page Hits
- `tableColumns.page_redirects`: Page Redirects
- `tableColumns.point_lead_action_log`: Point Lead Action Log
- `tableColumns.point_lead_event_log`: Point Lead Event Log
- `tableColumns.push_notification_stats`: Push Notification Stats
- `tableColumns.sms_message_stats`: Sms Message Stats
- `tableColumns.stage_lead_action_log`: Stage Lead Action Log
- `tableColumns.tweet_stats`: Tweet Stats
- `tableColumns.video_hits`: Video Hits
- `tableColumns.webhook_logs`: Webhook Logs

### `mautic_list_dashboard_widget_types`

**List Dashboard Widget Types.** Lists the dashboard widget types (e.g. "created.leads.in.time", "emails.in.time", "page.hits.in.time") whose data Get Dashboard Widget Data returns. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `success`: Success (number)
- `types`: Types (an object whose keys vary)

### `mautic_get_dashboard_widget_data`

**Get Dashboard Widget Data.** Gets the chart or table data of one dashboard widget type for a date range, e.g. contacts created per day. Widget types come from List Dashboard Widget Types. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Widget Type. Widget type key, from List Dashboard Widget Types. |
| `dateFrom` | string | no |  | Date From. Date in UTC, e.g. "2026-01-31". |
| `dateTo` | string | no |  | Date To. Date in UTC, e.g. "2026-01-31". |
| `timeUnit` | string | no |  | Time Unit. Grouping of time charts. Defaults to Year. One of `"Y"`, `"m"`, `"W"`, `"d"`, `"H"`. |
| `timezone` | string | no |  | Timezone. e.g. "Europe/Berlin". Defaults to UTC. |
| `limit` | number | no |  | Limit. Maximum rows for table widgets. |

Output fields:

- `success`: Success (number)
- `cached`: Cached (boolean)
- `execution_time`: Execution Time (number)
- `data`: Data

### `mautic_list_devices`

**List Devices.** Lists the devices tracked for contacts. Use List Contact Devices for one contact. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |

Output fields:

- `total`: Total (number)
- `devices`: Devices
- `devices[].id`: ID (number)
- `devices[].lead`: Lead
- `devices[].lead.id`: ID (number)
- `devices[].lead.points`: Points (number)
- `devices[].lead.color`: Color
- `devices[].lead.title`: Title
- `devices[].lead.firstname`: First Name
- `devices[].lead.lastname`: Last Name
- `devices[].lead.company`: Company
- `devices[].lead.position`: Position
- `devices[].lead.email`: Email (email)
- `devices[].lead.phone`: Phone
- `devices[].lead.mobile`: Mobile
- `devices[].lead.address1`: Address 1
- `devices[].lead.address2`: Address 2
- `devices[].lead.city`: City
- `devices[].lead.state`: State
- `devices[].lead.zipcode`: Zip Code
- `devices[].lead.timezone`: Timezone
- `devices[].lead.country`: Country
- `devices[].lead.fields`: Fields
- `devices[].lead.lastActive`: Last Active
- `devices[].lead.owner`: Owner
- `devices[].lead.owner.id`: ID (number)
- `devices[].lead.owner.username`: Username
- `devices[].lead.owner.firstName`: First Name
- `devices[].lead.owner.lastName`: Last Name
- `devices[].lead.owner.email`: Email (email)
- `devices[].lead.owner.position`: Position
- `devices[].lead.owner.role`: Role
- `devices[].lead.owner.role.id`: ID (number)
- `devices[].lead.owner.role.name`: Name
- `devices[].lead.owner.role.description`: Description
- `devices[].lead.owner.role.isAdmin`: Is Admin (boolean)
- `devices[].lead.owner.role.rawPermissions`: Raw Permissions
- `devices[].lead.owner.timezone`: Timezone
- `devices[].lead.owner.locale`: Locale
- `devices[].lead.owner.lastLogin`: Last Login (datetime)
- `devices[].lead.owner.lastActive`: Last Active (datetime)
- `devices[].lead.owner.signature`: Signature
- `devices[].lead.ipAddresses`: IP Addresses
- `devices[].lead.tags`: Tags
- `devices[].lead.tags[].id`: ID (number)
- `devices[].lead.tags[].tag`: Tag
- `devices[].lead.tags[].description`: Description
- `devices[].lead.utmtags`: UTM Tags
- `devices[].lead.stage`: Stage
- `devices[].lead.dateIdentified`: Date Identified (datetime)
- `devices[].lead.preferredProfileImage`: Preferred Profile Image
- `devices[].lead.doNotContact`: Do Not Contact
- `devices[].lead.frequencyRules`: Frequency Rules
- `devices[].clientInfo`: Client Info
- `devices[].device`: Device
- `devices[].deviceBrand`: Device Brand
- `devices[].deviceModel`: Device Model
- `devices[].deviceOsName`: Device Os Name
- `devices[].deviceOsShortName`: Device Os Short Name
- `devices[].deviceOsVersion`: Device Os Version
- `devices[].deviceOsPlatform`: Device Os Platform

### `mautic_get_device`

**Get Device.** Gets a single device by its numeric id, with its contact. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Device Id. Numeric device id, from List Devices or Create Device. |

Output fields:

- `device`: Device
- `device.id`: ID (number)
- `device.lead`: Lead
- `device.lead.id`: ID (number)
- `device.lead.points`: Points (number)
- `device.lead.color`: Color
- `device.lead.title`: Title
- `device.lead.firstname`: First Name
- `device.lead.lastname`: Last Name
- `device.lead.company`: Company
- `device.lead.position`: Position
- `device.lead.email`: Email (email)
- `device.lead.phone`: Phone
- `device.lead.mobile`: Mobile
- `device.lead.address1`: Address 1
- `device.lead.address2`: Address 2
- `device.lead.city`: City
- `device.lead.state`: State
- `device.lead.zipcode`: Zip Code
- `device.lead.timezone`: Timezone
- `device.lead.country`: Country
- `device.lead.fields`: Fields
- `device.lead.lastActive`: Last Active (datetime)
- `device.lead.owner`: Owner
- `device.lead.owner.id`: ID (number)
- `device.lead.owner.username`: Username
- `device.lead.owner.firstName`: First Name
- `device.lead.owner.lastName`: Last Name
- `device.lead.owner.email`: Email (email)
- `device.lead.owner.position`: Position
- `device.lead.owner.role`: Role
- `device.lead.owner.role.id`: ID (number)
- `device.lead.owner.role.name`: Name
- `device.lead.owner.role.description`: Description
- `device.lead.owner.role.isAdmin`: Is Admin (boolean)
- `device.lead.owner.role.rawPermissions`: Raw Permissions
- `device.lead.owner.timezone`: Timezone
- `device.lead.owner.locale`: Locale
- `device.lead.owner.lastLogin`: Last Login (datetime)
- `device.lead.owner.lastActive`: Last Active (datetime)
- `device.lead.owner.signature`: Signature
- `device.lead.ipAddresses`: IP Addresses
- `device.lead.tags`: Tags
- `device.lead.tags[].id`: ID (number)
- `device.lead.tags[].tag`: Tag
- `device.lead.tags[].description`: Description
- `device.lead.utmtags`: UTM Tags
- `device.lead.stage`: Stage
- `device.lead.dateIdentified`: Date Identified (datetime)
- `device.lead.preferredProfileImage`: Preferred Profile Image
- `device.lead.doNotContact`: Do Not Contact
- `device.lead.frequencyRules`: Frequency Rules
- `device.clientInfo`: Client Info
- `device.device`: Device
- `device.deviceBrand`: Device Brand
- `device.deviceModel`: Device Model
- `device.deviceOsName`: Device Os Name
- `device.deviceOsShortName`: Device Os Short Name
- `device.deviceOsVersion`: Device Os Version
- `device.deviceOsPlatform`: Device Os Platform

### `mautic_create_device`

**Create Device.** Records a device for a contact. Contact Id and Device Type are required. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lead` | string | yes |  | Contact Id. Numeric id of the contact who uses the device, from List Contacts. |
| `device` | string | yes |  | Device Type. One of `"desktop"`, `"smartphone"`, `"tablet"`, `"phablet"`, `"tv"`, `"console"`, `"car browser"`, `"camera"`, `"portable media player"`, `"feature phone"`. |
| `deviceBrand` | string | no |  | Brand. e.g. "AP" for Apple. |
| `deviceModel` | string | no |  | Model. |
| `deviceOsName` | string | no |  | OS Name. e.g. "Mac". |
| `deviceOsShortName` | string | no |  | OS Short Name. e.g. "MAC". |
| `deviceOsVersion` | string | no |  | OS Version. |
| `deviceOsPlatform` | string | no |  | OS Platform. e.g. "x64". |
| `additionalFields` | JSON | no |  | Additional Fields. Other device properties, e.g. "clientInfo" as {"type": "browser", "name": "Chrome", "version": "120.0"}. The dedicated props above win over the same keys here. |

Output fields:

- `device`: Device
- `device.id`: ID (number)
- `device.lead`: Lead
- `device.lead.id`: ID (number)
- `device.lead.points`: Points (number)
- `device.lead.color`: Color
- `device.lead.title`: Title
- `device.lead.firstname`: First Name
- `device.lead.lastname`: Last Name
- `device.lead.company`: Company
- `device.lead.position`: Position
- `device.lead.email`: Email (email)
- `device.lead.phone`: Phone
- `device.lead.mobile`: Mobile
- `device.lead.address1`: Address 1
- `device.lead.address2`: Address 2
- `device.lead.city`: City
- `device.lead.state`: State
- `device.lead.zipcode`: Zip Code
- `device.lead.timezone`: Timezone
- `device.lead.country`: Country
- `device.lead.fields`: Fields
- `device.lead.lastActive`: Last Active
- `device.lead.owner`: Owner
- `device.lead.owner.id`: ID (number)
- `device.lead.owner.username`: Username
- `device.lead.owner.firstName`: First Name
- `device.lead.owner.lastName`: Last Name
- `device.lead.owner.email`: Email (email)
- `device.lead.owner.position`: Position
- `device.lead.owner.role`: Role
- `device.lead.owner.role.id`: ID (number)
- `device.lead.owner.role.name`: Name
- `device.lead.owner.role.description`: Description
- `device.lead.owner.role.isAdmin`: Is Admin (boolean)
- `device.lead.owner.role.rawPermissions`: Raw Permissions
- `device.lead.owner.timezone`: Timezone
- `device.lead.owner.locale`: Locale
- `device.lead.owner.lastLogin`: Last Login (datetime)
- `device.lead.owner.lastActive`: Last Active (datetime)
- `device.lead.owner.signature`: Signature
- `device.lead.ipAddresses`: IP Addresses
- `device.lead.tags`: Tags
- `device.lead.tags[].id`: ID (number)
- `device.lead.tags[].tag`: Tag
- `device.lead.tags[].description`: Description
- `device.lead.utmtags`: UTM Tags
- `device.lead.stage`: Stage
- `device.lead.dateIdentified`: Date Identified (datetime)
- `device.lead.preferredProfileImage`: Preferred Profile Image
- `device.lead.doNotContact`: Do Not Contact
- `device.lead.frequencyRules`: Frequency Rules
- `device.clientInfo`: Client Info
- `device.device`: Device
- `device.deviceBrand`: Device Brand
- `device.deviceModel`: Device Model
- `device.deviceOsName`: Device Os Name
- `device.deviceOsShortName`: Device Os Short Name
- `device.deviceOsVersion`: Device Os Version
- `device.deviceOsPlatform`: Device Os Platform

### `mautic_update_device`

**Update Device.** Updates an existing device. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Device Id. Numeric device id, from List Devices or Create Device. |
| `lead` | string | no |  | Contact Id. Numeric id of the contact who uses the device, from List Contacts. |
| `device` | string | no |  | Device Type. One of `"desktop"`, `"smartphone"`, `"tablet"`, `"phablet"`, `"tv"`, `"console"`, `"car browser"`, `"camera"`, `"portable media player"`, `"feature phone"`. |
| `deviceBrand` | string | no |  | Brand. e.g. "AP" for Apple. |
| `deviceModel` | string | no |  | Model. |
| `deviceOsName` | string | no |  | OS Name. e.g. "Mac". |
| `deviceOsShortName` | string | no |  | OS Short Name. e.g. "MAC". |
| `deviceOsVersion` | string | no |  | OS Version. |
| `deviceOsPlatform` | string | no |  | OS Platform. e.g. "x64". |
| `additionalFields` | JSON | no |  | Additional Fields. Other device properties, e.g. "clientInfo" as {"type": "browser", "name": "Chrome", "version": "120.0"}. The dedicated props above win over the same keys here. |

Output fields:

- `device`: Device
- `device.id`: ID (number)
- `device.lead`: Lead
- `device.lead.id`: ID (number)
- `device.lead.points`: Points (number)
- `device.lead.color`: Color
- `device.lead.title`: Title
- `device.lead.firstname`: First Name
- `device.lead.lastname`: Last Name
- `device.lead.company`: Company
- `device.lead.position`: Position
- `device.lead.email`: Email (email)
- `device.lead.phone`: Phone
- `device.lead.mobile`: Mobile
- `device.lead.address1`: Address 1
- `device.lead.address2`: Address 2
- `device.lead.city`: City
- `device.lead.state`: State
- `device.lead.zipcode`: Zip Code
- `device.lead.timezone`: Timezone
- `device.lead.country`: Country
- `device.lead.fields`: Fields
- `device.lead.lastActive`: Last Active (datetime)
- `device.lead.owner`: Owner
- `device.lead.owner.id`: ID (number)
- `device.lead.owner.username`: Username
- `device.lead.owner.firstName`: First Name
- `device.lead.owner.lastName`: Last Name
- `device.lead.owner.email`: Email (email)
- `device.lead.owner.position`: Position
- `device.lead.owner.role`: Role
- `device.lead.owner.role.id`: ID (number)
- `device.lead.owner.role.name`: Name
- `device.lead.owner.role.description`: Description
- `device.lead.owner.role.isAdmin`: Is Admin (boolean)
- `device.lead.owner.role.rawPermissions`: Raw Permissions
- `device.lead.owner.timezone`: Timezone
- `device.lead.owner.locale`: Locale
- `device.lead.owner.lastLogin`: Last Login (datetime)
- `device.lead.owner.lastActive`: Last Active (datetime)
- `device.lead.owner.signature`: Signature
- `device.lead.ipAddresses`: IP Addresses
- `device.lead.tags`: Tags
- `device.lead.tags[].id`: ID (number)
- `device.lead.tags[].tag`: Tag
- `device.lead.tags[].description`: Description
- `device.lead.utmtags`: UTM Tags
- `device.lead.stage`: Stage
- `device.lead.dateIdentified`: Date Identified (datetime)
- `device.lead.preferredProfileImage`: Preferred Profile Image
- `device.lead.doNotContact`: Do Not Contact
- `device.lead.frequencyRules`: Frequency Rules
- `device.clientInfo`: Client Info
- `device.device`: Device
- `device.deviceBrand`: Device Brand
- `device.deviceModel`: Device Model
- `device.deviceOsName`: Device Os Name
- `device.deviceOsShortName`: Device Os Short Name
- `device.deviceOsVersion`: Device Os Version
- `device.deviceOsPlatform`: Device Os Platform

### `mautic_delete_device`

**Delete Device.** Permanently deletes a device record. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Device Id. Numeric device id, from List Devices or Create Device. |

Output fields:

- `device`: Device
- `device.id`: ID
- `device.lead`: Lead
- `device.lead.id`: ID (number)
- `device.lead.points`: Points (number)
- `device.lead.color`: Color
- `device.lead.title`: Title
- `device.lead.firstname`: First Name
- `device.lead.lastname`: Last Name
- `device.lead.company`: Company
- `device.lead.position`: Position
- `device.lead.email`: Email (email)
- `device.lead.phone`: Phone
- `device.lead.mobile`: Mobile
- `device.lead.address1`: Address 1
- `device.lead.address2`: Address 2
- `device.lead.city`: City
- `device.lead.state`: State
- `device.lead.zipcode`: Zip Code
- `device.lead.timezone`: Timezone
- `device.lead.country`: Country
- `device.lead.fields`: Fields
- `device.lead.lastActive`: Last Active
- `device.lead.owner`: Owner
- `device.lead.owner.id`: ID (number)
- `device.lead.owner.username`: Username
- `device.lead.owner.firstName`: First Name
- `device.lead.owner.lastName`: Last Name
- `device.lead.owner.email`: Email (email)
- `device.lead.owner.position`: Position
- `device.lead.owner.role`: Role
- `device.lead.owner.role.id`: ID (number)
- `device.lead.owner.role.name`: Name
- `device.lead.owner.role.description`: Description
- `device.lead.owner.role.isAdmin`: Is Admin (boolean)
- `device.lead.owner.role.rawPermissions`: Raw Permissions
- `device.lead.owner.timezone`: Timezone
- `device.lead.owner.locale`: Locale
- `device.lead.owner.lastLogin`: Last Login (datetime)
- `device.lead.owner.lastActive`: Last Active (datetime)
- `device.lead.owner.signature`: Signature
- `device.lead.ipAddresses`: IP Addresses
- `device.lead.tags`: Tags
- `device.lead.tags[].id`: ID (number)
- `device.lead.tags[].tag`: Tag
- `device.lead.tags[].description`: Description
- `device.lead.utmtags`: UTM Tags
- `device.lead.stage`: Stage
- `device.lead.dateIdentified`: Date Identified (datetime)
- `device.lead.preferredProfileImage`: Preferred Profile Image
- `device.lead.doNotContact`: Do Not Contact
- `device.lead.frequencyRules`: Frequency Rules
- `device.clientInfo`: Client Info
- `device.device`: Device
- `device.deviceBrand`: Device Brand
- `device.deviceModel`: Device Model
- `device.deviceOsName`: Device Os Name
- `device.deviceOsShortName`: Device Os Short Name
- `device.deviceOsVersion`: Device Os Version
- `device.deviceOsPlatform`: Device Os Platform

### `mautic_list_dynamic_contents`

**List Dynamic Contents.** Lists dynamic content items, the personalized HTML blocks for websites and emails. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `dynamicContents`: Dynamic Contents
- `dynamicContents[].isPublished`: Published (boolean)
- `dynamicContents[].dateAdded`: Date Added (datetime)
- `dynamicContents[].dateModified`: Date Modified
- `dynamicContents[].id`: ID (number)
- `dynamicContents[].name`: Name
- `dynamicContents[].category`: Category
- `dynamicContents[].category.id`: ID (number)
- `dynamicContents[].category.title`: Title
- `dynamicContents[].category.alias`: Alias
- `dynamicContents[].category.description`: Description
- `dynamicContents[].category.color`: Color
- `dynamicContents[].category.bundle`: Bundle
- `dynamicContents[].publishUp`: Publish Up
- `dynamicContents[].publishDown`: Publish Down
- `dynamicContents[].sentCount`: Sent Count (number)
- `dynamicContents[].variantParent`: Variant Parent
- `dynamicContents[].variantChildren`: Variant Children
- `dynamicContents[].content`: Content
- `dynamicContents[].utmTags`: Utm Tags
- `dynamicContents[].utmTags.utmMedium`: Utm Medium
- `dynamicContents[].utmTags.utmSource`: Utm Source
- `dynamicContents[].utmTags.utmContent`: Utm Content
- `dynamicContents[].utmTags.utmCampaign`: Utm Campaign
- `dynamicContents[].filters`: Filters
- `dynamicContents[].filters[].glue`: Glue
- `dynamicContents[].filters[].field`: Field
- `dynamicContents[].filters[].object`: Object
- `dynamicContents[].filters[].type`: Type
- `dynamicContents[].filters[].filter`: Filter
- `dynamicContents[].filters[].display`: Display
- `dynamicContents[].filters[].operator`: Operator
- `dynamicContents[].isCampaignBased`: Is Campaign Based (boolean)
- `dynamicContents[].slotName`: Slot Name

### `mautic_get_dynamic_content`

**Get Dynamic Content.** Gets a single dynamic content item by its numeric id. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Dynamic Content Id. Numeric dynamic content id, from List Dynamic Contents or Create Dynamic Content. |

Output fields:

- `dynamicContent`: Dynamic Content
- `dynamicContent.isPublished`: Published (boolean)
- `dynamicContent.dateAdded`: Date Added (datetime)
- `dynamicContent.dateModified`: Date Modified (datetime)
- `dynamicContent.id`: ID (number)
- `dynamicContent.name`: Name
- `dynamicContent.category`: Category
- `dynamicContent.category.id`: ID (number)
- `dynamicContent.category.title`: Title
- `dynamicContent.category.alias`: Alias
- `dynamicContent.category.description`: Description
- `dynamicContent.category.color`: Color
- `dynamicContent.category.bundle`: Bundle
- `dynamicContent.publishUp`: Publish Up
- `dynamicContent.publishDown`: Publish Down
- `dynamicContent.sentCount`: Sent Count (number)
- `dynamicContent.variantParent`: Variant Parent
- `dynamicContent.variantChildren`: Variant Children
- `dynamicContent.content`: Content
- `dynamicContent.utmTags`: Utm Tags
- `dynamicContent.utmTags.utmMedium`: Utm Medium
- `dynamicContent.utmTags.utmSource`: Utm Source
- `dynamicContent.utmTags.utmContent`: Utm Content
- `dynamicContent.utmTags.utmCampaign`: Utm Campaign
- `dynamicContent.filters`: Filters
- `dynamicContent.filters[].glue`: Glue
- `dynamicContent.filters[].field`: Field
- `dynamicContent.filters[].object`: Object
- `dynamicContent.filters[].type`: Type
- `dynamicContent.filters[].filter`: Filter
- `dynamicContent.filters[].display`: Display
- `dynamicContent.filters[].operator`: Operator
- `dynamicContent.isCampaignBased`: Is Campaign Based (boolean)
- `dynamicContent.slotName`: Slot Name

### `mautic_create_dynamic_content`

**Create Dynamic Content.** Creates a dynamic content item. Name is required. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `content` | string | no |  | Content. HTML shown to matching contacts. |
| `description` | string | no |  | Description. |
| `isCampaignBased` | string | no |  | Campaign Based. Yes when a campaign decides who sees it; No to use Slot Name and Filters. One of `true`, `false`. |
| `slotName` | string | no |  | Slot Name. Name of the slot on your site the content fills, when not campaign based. |
| `filters` | array | no |  | Filters. Contact filters that decide who sees it, in the segment filter shape. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `language` | string | no |  | Language. Locale code, e.g. "en". |
| `additionalFields` | JSON | no |  | Additional Fields. Other dynamic content properties, e.g. "publishUp", "publishDown", "utmTags". The dedicated props above win over the same keys here. |

Output fields:

- `dynamicContent`: Dynamic Content
- `dynamicContent.isPublished`: Published (boolean)
- `dynamicContent.dateAdded`: Date Added (datetime)
- `dynamicContent.dateModified`: Date Modified
- `dynamicContent.id`: ID (number)
- `dynamicContent.name`: Name
- `dynamicContent.category`: Category
- `dynamicContent.category.id`: ID (number)
- `dynamicContent.category.title`: Title
- `dynamicContent.category.alias`: Alias
- `dynamicContent.category.description`: Description
- `dynamicContent.category.color`: Color
- `dynamicContent.category.bundle`: Bundle
- `dynamicContent.publishUp`: Publish Up
- `dynamicContent.publishDown`: Publish Down
- `dynamicContent.sentCount`: Sent Count (number)
- `dynamicContent.variantParent`: Variant Parent
- `dynamicContent.variantChildren`: Variant Children
- `dynamicContent.content`: Content
- `dynamicContent.utmTags`: Utm Tags
- `dynamicContent.utmTags.utmSource`: Utm Source
- `dynamicContent.utmTags.utmMedium`: Utm Medium
- `dynamicContent.utmTags.utmCampaign`: Utm Campaign
- `dynamicContent.utmTags.utmContent`: Utm Content
- `dynamicContent.filters`: Filters
- `dynamicContent.filters[].glue`: Glue
- `dynamicContent.filters[].field`: Field
- `dynamicContent.filters[].object`: Object
- `dynamicContent.filters[].type`: Type
- `dynamicContent.filters[].filter`: Filter
- `dynamicContent.filters[].display`: Display
- `dynamicContent.filters[].operator`: Operator
- `dynamicContent.isCampaignBased`: Is Campaign Based (boolean)
- `dynamicContent.slotName`: Slot Name

### `mautic_update_dynamic_content`

**Update Dynamic Content.** Updates an existing dynamic content item. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Dynamic Content Id. Numeric dynamic content id, from List Dynamic Contents or Create Dynamic Content. |
| `name` | string | no |  | Name. |
| `content` | string | no |  | Content. HTML shown to matching contacts. |
| `description` | string | no |  | Description. |
| `isCampaignBased` | string | no |  | Campaign Based. Yes when a campaign decides who sees it; No to use Slot Name and Filters. One of `true`, `false`. |
| `slotName` | string | no |  | Slot Name. Name of the slot on your site the content fills, when not campaign based. |
| `filters` | array | no |  | Filters. Contact filters that decide who sees it, in the segment filter shape. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `language` | string | no |  | Language. Locale code, e.g. "en". |
| `additionalFields` | JSON | no |  | Additional Fields. Other dynamic content properties, e.g. "publishUp", "publishDown", "utmTags". The dedicated props above win over the same keys here. |

Output fields:

- `dynamicContent`: Dynamic Content
- `dynamicContent.isPublished`: Published (boolean)
- `dynamicContent.dateAdded`: Date Added (datetime)
- `dynamicContent.dateModified`: Date Modified (datetime)
- `dynamicContent.id`: ID (number)
- `dynamicContent.name`: Name
- `dynamicContent.category`: Category
- `dynamicContent.category.id`: ID (number)
- `dynamicContent.category.title`: Title
- `dynamicContent.category.alias`: Alias
- `dynamicContent.category.description`: Description
- `dynamicContent.category.color`: Color
- `dynamicContent.category.bundle`: Bundle
- `dynamicContent.publishUp`: Publish Up
- `dynamicContent.publishDown`: Publish Down
- `dynamicContent.sentCount`: Sent Count (number)
- `dynamicContent.variantParent`: Variant Parent
- `dynamicContent.variantChildren`: Variant Children
- `dynamicContent.content`: Content
- `dynamicContent.utmTags`: Utm Tags
- `dynamicContent.utmTags.utmMedium`: Utm Medium
- `dynamicContent.utmTags.utmSource`: Utm Source
- `dynamicContent.utmTags.utmContent`: Utm Content
- `dynamicContent.utmTags.utmCampaign`: Utm Campaign
- `dynamicContent.filters`: Filters
- `dynamicContent.filters[].glue`: Glue
- `dynamicContent.filters[].field`: Field
- `dynamicContent.filters[].object`: Object
- `dynamicContent.filters[].type`: Type
- `dynamicContent.filters[].filter`: Filter
- `dynamicContent.filters[].display`: Display
- `dynamicContent.filters[].operator`: Operator
- `dynamicContent.isCampaignBased`: Is Campaign Based (boolean)
- `dynamicContent.slotName`: Slot Name

### `mautic_delete_dynamic_content`

**Delete Dynamic Content.** Permanently deletes a dynamic content item. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Dynamic Content Id. Numeric dynamic content id, from List Dynamic Contents or Create Dynamic Content. |

Output fields:

- `dynamicContent`: Dynamic Content
- `dynamicContent.isPublished`: Published (boolean)
- `dynamicContent.dateAdded`: Date Added (datetime)
- `dynamicContent.dateModified`: Date Modified
- `dynamicContent.id`: ID
- `dynamicContent.name`: Name
- `dynamicContent.category`: Category
- `dynamicContent.category.id`: ID (number)
- `dynamicContent.category.title`: Title
- `dynamicContent.category.alias`: Alias
- `dynamicContent.category.description`: Description
- `dynamicContent.category.color`: Color
- `dynamicContent.category.bundle`: Bundle
- `dynamicContent.publishUp`: Publish Up
- `dynamicContent.publishDown`: Publish Down
- `dynamicContent.sentCount`: Sent Count (number)
- `dynamicContent.variantParent`: Variant Parent
- `dynamicContent.variantChildren`: Variant Children
- `dynamicContent.variantChildren[].id`: ID (number)
- `dynamicContent.variantChildren[].name`: Name
- `dynamicContent.variantChildren[].category`: Category
- `dynamicContent.variantChildren[].publishUp`: Publish Up
- `dynamicContent.variantChildren[].publishDown`: Publish Down
- `dynamicContent.variantChildren[].sentCount`: Sent Count (number)
- `dynamicContent.variantChildren[].variantChildren`: Variant Children
- `dynamicContent.variantChildren[].content`: Content
- `dynamicContent.variantChildren[].utmTags`: Utm Tags
- `dynamicContent.variantChildren[].utmTags.utmMedium`: Utm Medium
- `dynamicContent.variantChildren[].utmTags.utmSource`: Utm Source
- `dynamicContent.variantChildren[].utmTags.utmContent`: Utm Content
- `dynamicContent.variantChildren[].utmTags.utmCampaign`: Utm Campaign
- `dynamicContent.variantChildren[].filters`: Filters
- `dynamicContent.variantChildren[].isCampaignBased`: Is Campaign Based (boolean)
- `dynamicContent.variantChildren[].slotName`: Slot Name
- `dynamicContent.content`: Content
- `dynamicContent.utmTags`: Utm Tags
- `dynamicContent.utmTags.utmMedium`: Utm Medium
- `dynamicContent.utmTags.utmSource`: Utm Source
- `dynamicContent.utmTags.utmContent`: Utm Content
- `dynamicContent.utmTags.utmCampaign`: Utm Campaign
- `dynamicContent.filters`: Filters
- `dynamicContent.filters[].glue`: Glue
- `dynamicContent.filters[].field`: Field
- `dynamicContent.filters[].object`: Object
- `dynamicContent.filters[].type`: Type
- `dynamicContent.filters[].filter`: Filter
- `dynamicContent.filters[].display`: Display
- `dynamicContent.filters[].operator`: Operator
- `dynamicContent.isCampaignBased`: Is Campaign Based (boolean)
- `dynamicContent.slotName`: Slot Name

### `mautic_list_focus_items`

**List Focus Items.** Lists focus items (website pop-ups, bars and notices). Needs the Focus plugin. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `focus`: Focus
- `focus[].isPublished`: Published (boolean)
- `focus[].dateAdded`: Date Added (datetime)
- `focus[].dateModified`: Date Modified
- `focus[].id`: ID (number)
- `focus[].name`: Name
- `focus[].category`: Category
- `focus[].category.id`: ID (number)
- `focus[].category.title`: Title
- `focus[].category.alias`: Alias
- `focus[].category.description`: Description
- `focus[].category.color`: Color
- `focus[].category.bundle`: Bundle
- `focus[].description`: Description
- `focus[].type`: Type
- `focus[].website`: Website (url)
- `focus[].style`: Style
- `focus[].publishUp`: Publish Up
- `focus[].publishDown`: Publish Down
- `focus[].properties`: Properties
- `focus[].properties.bar`: Bar
- `focus[].properties.bar.allow_hide`: Allow Hide (number)
- `focus[].properties.bar.push_page`: Push Page (number)
- `focus[].properties.bar.sticky`: Sticky (number)
- `focus[].properties.bar.size`: Size
- `focus[].properties.bar.placement`: Placement
- `focus[].properties.modal`: Modal
- `focus[].properties.modal.placement`: Placement
- `focus[].properties.notification`: Notification
- `focus[].properties.notification.placement`: Placement
- `focus[].properties.page`: Page
- `focus[].properties.animate`: Animate (number)
- `focus[].properties.link_activation`: Link Activation
- `focus[].properties.colors`: Colors
- `focus[].properties.colors.primary`: Primary
- `focus[].properties.colors.text`: Text
- `focus[].properties.colors.button`: Button
- `focus[].properties.colors.button_text`: Button Text
- `focus[].properties.content`: Content
- `focus[].properties.content.headline`: Headline
- `focus[].properties.content.tagline`: Tagline
- `focus[].properties.content.link_text`: Link Text
- `focus[].properties.content.link_url`: Link URL (url)
- `focus[].properties.content.link_new_window`: Link New Window
- `focus[].properties.content.font`: Font
- `focus[].properties.content.css`: Css
- `focus[].properties.when`: When
- `focus[].properties.timeout`: Timeout
- `focus[].properties.frequency`: Frequency
- `focus[].properties.stop_after_conversion`: Stop After Conversion
- `focus[].properties.stop_after_close`: Stop After Close
- `focus[].utmTags`: Utm Tags
- `focus[].utmTags.utmSource`: Utm Source
- `focus[].utmTags.utmMedium`: Utm Medium
- `focus[].utmTags.utmCampaign`: Utm Campaign
- `focus[].utmTags.utmContent`: Utm Content
- `focus[].form`: Form
- `focus[].htmlMode`: HTML Mode
- `focus[].html`: HTML
- `focus[].editor`: Editor
- `focus[].cache`: Cache

### `mautic_get_focus_item`

**Get Focus Item.** Gets a single focus item by its numeric id. Needs the Focus plugin. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Focus Item Id. Numeric focus item id, from List Focus Items or Create Focus Item. |

Output fields:

- `focus`: Focus
- `focus.isPublished`: Published (boolean)
- `focus.dateAdded`: Date Added (datetime)
- `focus.dateModified`: Date Modified (datetime)
- `focus.id`: ID (number)
- `focus.name`: Name
- `focus.category`: Category
- `focus.category.id`: ID (number)
- `focus.category.title`: Title
- `focus.category.alias`: Alias
- `focus.category.description`: Description
- `focus.category.color`: Color
- `focus.category.bundle`: Bundle
- `focus.description`: Description
- `focus.type`: Type
- `focus.website`: Website (url)
- `focus.style`: Style
- `focus.publishUp`: Publish Up
- `focus.publishDown`: Publish Down
- `focus.properties`: Properties
- `focus.properties.bar`: Bar
- `focus.properties.bar.allow_hide`: Allow Hide (number)
- `focus.properties.bar.push_page`: Push Page (number)
- `focus.properties.bar.sticky`: Sticky (number)
- `focus.properties.bar.size`: Size
- `focus.properties.bar.placement`: Placement
- `focus.properties.modal`: Modal
- `focus.properties.modal.placement`: Placement
- `focus.properties.notification`: Notification
- `focus.properties.notification.placement`: Placement
- `focus.properties.page`: Page
- `focus.properties.animate`: Animate (number)
- `focus.properties.link_activation`: Link Activation
- `focus.properties.colors`: Colors
- `focus.properties.colors.primary`: Primary
- `focus.properties.colors.text`: Text
- `focus.properties.colors.button`: Button
- `focus.properties.colors.button_text`: Button Text
- `focus.properties.content`: Content
- `focus.properties.content.headline`: Headline
- `focus.properties.content.tagline`: Tagline
- `focus.properties.content.link_text`: Link Text
- `focus.properties.content.link_url`: Link URL (url)
- `focus.properties.content.link_new_window`: Link New Window
- `focus.properties.content.font`: Font
- `focus.properties.content.css`: Css
- `focus.properties.when`: When
- `focus.properties.timeout`: Timeout
- `focus.properties.frequency`: Frequency
- `focus.properties.stop_after_conversion`: Stop After Conversion
- `focus.properties.stop_after_close`: Stop After Close
- `focus.utmTags`: Utm Tags
- `focus.utmTags.utmSource`: Utm Source
- `focus.utmTags.utmMedium`: Utm Medium
- `focus.utmTags.utmCampaign`: Utm Campaign
- `focus.utmTags.utmContent`: Utm Content
- `focus.form`: Form (number)
- `focus.htmlMode`: HTML Mode
- `focus.html`: HTML
- `focus.editor`: Editor
- `focus.cache`: Cache

### `mautic_create_focus_item`

**Create Focus Item.** Creates a focus item. Name, Type and Style are required. Needs the Focus plugin. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `type` | string | yes |  | Type. One of `"form"`, `"notice"`, `"link"`. |
| `style` | string | yes |  | Style. One of `"bar"`, `"modal"`, `"notification"`, `"page"`. |
| `website` | string | no |  | Website. URL of the site the focus item runs on. |
| `form` | number | no |  | Form Id. Form to show for the "form" type, from List Forms. |
| `description` | string | no |  | Description. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `properties` | JSON | no |  | Properties. Display settings, e.g. {"bar": {"size": "large", "placement": "top"}, "content": {"headline": "Hi", "link_text": "Go", "link_url": "https://example.com"}, "when": "immediately"}. |
| `additionalFields` | JSON | no |  | Additional Fields. Other focus item properties, e.g. "publishUp", "publishDown", "utmTags", "html". The dedicated props above win over the same keys here. |

Output fields:

- `focus`: Focus
- `focus.isPublished`: Published (boolean)
- `focus.dateAdded`: Date Added (datetime)
- `focus.dateModified`: Date Modified
- `focus.id`: ID (number)
- `focus.name`: Name
- `focus.category`: Category
- `focus.category.id`: ID (number)
- `focus.category.title`: Title
- `focus.category.alias`: Alias
- `focus.category.description`: Description
- `focus.category.color`: Color
- `focus.category.bundle`: Bundle
- `focus.description`: Description
- `focus.type`: Type
- `focus.website`: Website (url)
- `focus.style`: Style
- `focus.publishUp`: Publish Up
- `focus.publishDown`: Publish Down
- `focus.properties`: Properties
- `focus.properties.bar`: Bar
- `focus.properties.bar.allow_hide`: Allow Hide (number)
- `focus.properties.bar.push_page`: Push Page (number)
- `focus.properties.bar.sticky`: Sticky (number)
- `focus.properties.bar.size`: Size
- `focus.properties.bar.placement`: Placement
- `focus.properties.modal`: Modal
- `focus.properties.modal.placement`: Placement
- `focus.properties.notification`: Notification
- `focus.properties.notification.placement`: Placement
- `focus.properties.page`: Page
- `focus.properties.animate`: Animate (number)
- `focus.properties.link_activation`: Link Activation
- `focus.properties.colors`: Colors
- `focus.properties.colors.primary`: Primary
- `focus.properties.colors.text`: Text
- `focus.properties.colors.button`: Button
- `focus.properties.colors.button_text`: Button Text
- `focus.properties.content`: Content
- `focus.properties.content.headline`: Headline
- `focus.properties.content.tagline`: Tagline
- `focus.properties.content.link_text`: Link Text
- `focus.properties.content.link_url`: Link URL (url)
- `focus.properties.content.link_new_window`: Link New Window
- `focus.properties.content.font`: Font
- `focus.properties.content.css`: Css
- `focus.properties.when`: When
- `focus.properties.timeout`: Timeout
- `focus.properties.frequency`: Frequency
- `focus.properties.stop_after_conversion`: Stop After Conversion
- `focus.properties.stop_after_close`: Stop After Close
- `focus.utmTags`: Utm Tags
- `focus.utmTags.utmSource`: Utm Source
- `focus.utmTags.utmMedium`: Utm Medium
- `focus.utmTags.utmCampaign`: Utm Campaign
- `focus.utmTags.utmContent`: Utm Content
- `focus.form`: Form (number)
- `focus.htmlMode`: HTML Mode
- `focus.html`: HTML
- `focus.editor`: Editor
- `focus.cache`: Cache

### `mautic_update_focus_item`

**Update Focus Item.** Updates an existing focus item. Needs the Focus plugin. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Focus Item Id. Numeric focus item id, from List Focus Items or Create Focus Item. |
| `name` | string | no |  | Name. |
| `type` | string | no |  | Type. One of `"form"`, `"notice"`, `"link"`. |
| `style` | string | no |  | Style. One of `"bar"`, `"modal"`, `"notification"`, `"page"`. |
| `website` | string | no |  | Website. URL of the site the focus item runs on. |
| `form` | number | no |  | Form Id. Form to show for the "form" type, from List Forms. |
| `description` | string | no |  | Description. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `properties` | JSON | no |  | Properties. Display settings, e.g. {"bar": {"size": "large", "placement": "top"}, "content": {"headline": "Hi", "link_text": "Go", "link_url": "https://example.com"}, "when": "immediately"}. |
| `additionalFields` | JSON | no |  | Additional Fields. Other focus item properties, e.g. "publishUp", "publishDown", "utmTags", "html". The dedicated props above win over the same keys here. |

Output fields:

- `focus`: Focus
- `focus.isPublished`: Published (boolean)
- `focus.dateAdded`: Date Added (datetime)
- `focus.dateModified`: Date Modified (datetime)
- `focus.id`: ID (number)
- `focus.name`: Name
- `focus.category`: Category
- `focus.category.id`: ID (number)
- `focus.category.title`: Title
- `focus.category.alias`: Alias
- `focus.category.description`: Description
- `focus.category.color`: Color
- `focus.category.bundle`: Bundle
- `focus.description`: Description
- `focus.type`: Type
- `focus.website`: Website (url)
- `focus.style`: Style
- `focus.publishUp`: Publish Up
- `focus.publishDown`: Publish Down
- `focus.properties`: Properties
- `focus.properties.bar`: Bar
- `focus.properties.bar.allow_hide`: Allow Hide (number)
- `focus.properties.bar.push_page`: Push Page (number)
- `focus.properties.bar.sticky`: Sticky (number)
- `focus.properties.bar.size`: Size
- `focus.properties.bar.placement`: Placement
- `focus.properties.modal`: Modal
- `focus.properties.modal.placement`: Placement
- `focus.properties.notification`: Notification
- `focus.properties.notification.placement`: Placement
- `focus.properties.page`: Page
- `focus.properties.animate`: Animate (number)
- `focus.properties.link_activation`: Link Activation
- `focus.properties.colors`: Colors
- `focus.properties.colors.primary`: Primary
- `focus.properties.colors.text`: Text
- `focus.properties.colors.button`: Button
- `focus.properties.colors.button_text`: Button Text
- `focus.properties.content`: Content
- `focus.properties.content.headline`: Headline
- `focus.properties.content.tagline`: Tagline
- `focus.properties.content.link_text`: Link Text
- `focus.properties.content.link_url`: Link URL (url)
- `focus.properties.content.link_new_window`: Link New Window
- `focus.properties.content.font`: Font
- `focus.properties.content.css`: Css
- `focus.properties.when`: When
- `focus.properties.timeout`: Timeout
- `focus.properties.frequency`: Frequency
- `focus.properties.stop_after_conversion`: Stop After Conversion
- `focus.properties.stop_after_close`: Stop After Close
- `focus.utmTags`: Utm Tags
- `focus.utmTags.utmSource`: Utm Source
- `focus.utmTags.utmMedium`: Utm Medium
- `focus.utmTags.utmCampaign`: Utm Campaign
- `focus.utmTags.utmContent`: Utm Content
- `focus.form`: Form (number)
- `focus.htmlMode`: HTML Mode
- `focus.html`: HTML
- `focus.editor`: Editor
- `focus.cache`: Cache

### `mautic_delete_focus_item`

**Delete Focus Item.** Permanently deletes a focus item. Needs the Focus plugin. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Focus Item Id. Numeric focus item id, from List Focus Items or Create Focus Item. |

Output fields:

- `focus`: Focus
- `focus.isPublished`: Published (boolean)
- `focus.dateAdded`: Date Added (datetime)
- `focus.dateModified`: Date Modified
- `focus.id`: ID
- `focus.name`: Name
- `focus.category`: Category
- `focus.category.id`: ID (number)
- `focus.category.title`: Title
- `focus.category.alias`: Alias
- `focus.category.description`: Description
- `focus.category.color`: Color
- `focus.category.bundle`: Bundle
- `focus.description`: Description
- `focus.type`: Type
- `focus.website`: Website (url)
- `focus.style`: Style
- `focus.publishUp`: Publish Up
- `focus.publishDown`: Publish Down
- `focus.properties`: Properties
- `focus.properties.bar`: Bar
- `focus.properties.bar.allow_hide`: Allow Hide (number)
- `focus.properties.bar.push_page`: Push Page (number)
- `focus.properties.bar.sticky`: Sticky (number)
- `focus.properties.bar.size`: Size
- `focus.properties.bar.placement`: Placement
- `focus.properties.modal`: Modal
- `focus.properties.modal.placement`: Placement
- `focus.properties.notification`: Notification
- `focus.properties.notification.placement`: Placement
- `focus.properties.page`: Page
- `focus.properties.animate`: Animate (number)
- `focus.properties.link_activation`: Link Activation
- `focus.properties.colors`: Colors
- `focus.properties.colors.primary`: Primary
- `focus.properties.colors.text`: Text
- `focus.properties.colors.button`: Button
- `focus.properties.colors.button_text`: Button Text
- `focus.properties.content`: Content
- `focus.properties.content.headline`: Headline
- `focus.properties.content.tagline`: Tagline
- `focus.properties.content.link_text`: Link Text
- `focus.properties.content.link_url`: Link URL (url)
- `focus.properties.content.link_new_window`: Link New Window
- `focus.properties.content.font`: Font
- `focus.properties.content.css`: Css
- `focus.properties.when`: When
- `focus.properties.timeout`: Timeout
- `focus.properties.frequency`: Frequency
- `focus.properties.stop_after_conversion`: Stop After Conversion
- `focus.properties.stop_after_close`: Stop After Close
- `focus.utmTags`: Utm Tags
- `focus.utmTags.utmSource`: Utm Source
- `focus.utmTags.utmMedium`: Utm Medium
- `focus.utmTags.utmCampaign`: Utm Campaign
- `focus.utmTags.utmContent`: Utm Content
- `focus.form`: Form (number)
- `focus.htmlMode`: HTML Mode
- `focus.html`: HTML
- `focus.editor`: Editor
- `focus.cache`: Cache

### `mautic_generate_focus_item_js`

**Generate Focus Item JS.** Returns the JavaScript that shows a focus item on a website. Read-only. Needs the Focus plugin. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Focus Item Id. Numeric focus item id, from List Focus Items or Create Focus Item. |

Output fields:

- `js`: Js

### `mautic_list_marketing_messages`

**List Marketing Messages.** Lists marketing messages, which send through the channel each contact prefers. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `messages`: Messages
- `messages[].isPublished`: Published (boolean)
- `messages[].dateAdded`: Date Added (datetime)
- `messages[].dateModified`: Date Modified
- `messages[].id`: ID (number)
- `messages[].name`: Name
- `messages[].description`: Description
- `messages[].publishUp`: Publish Up
- `messages[].publishDown`: Publish Down
- `messages[].channels`: Channels
- `messages[].channels[].id`: ID (number)
- `messages[].channels[].channel`: Channel
- `messages[].channels[].channelId`: Channel ID (number)
- `messages[].channels[].channelName`: Channel Name
- `messages[].channels[].isEnabled`: Is Enabled (boolean)
- `messages[].category`: Category
- `messages[].category.id`: ID (number)
- `messages[].category.title`: Title
- `messages[].category.alias`: Alias
- `messages[].category.description`: Description
- `messages[].category.color`: Color
- `messages[].category.bundle`: Bundle

### `mautic_get_marketing_message`

**Get Marketing Message.** Gets a single marketing message by its numeric id, with its channels. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Marketing Message Id. Numeric marketing message id, from List Marketing Messages or Create Marketing Message. |

Output fields:

- `message`: Message
- `message.isPublished`: Published (boolean)
- `message.dateAdded`: Date Added (datetime)
- `message.dateModified`: Date Modified (datetime)
- `message.id`: ID (number)
- `message.name`: Name
- `message.description`: Description
- `message.publishUp`: Publish Up (datetime)
- `message.publishDown`: Publish Down
- `message.channels`: Channels
- `message.channels[].id`: ID (number)
- `message.channels[].channel`: Channel
- `message.channels[].channelId`: Channel ID (number)
- `message.channels[].channelName`: Channel Name
- `message.channels[].isEnabled`: Is Enabled (boolean)
- `message.category`: Category
- `message.category.id`: ID (number)
- `message.category.title`: Title
- `message.category.alias`: Alias
- `message.category.description`: Description
- `message.category.color`: Color
- `message.category.bundle`: Bundle

### `mautic_create_marketing_message`

**Create Marketing Message.** Creates a marketing message. Name is required; link an email, text message or web push per channel. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. |
| `channels` | JSON | no |  | Channels. Channel settings keyed by channel, e.g. {"email": {"channel": "email", "channelId": 12, "isEnabled": true}, "sms": {"channel": "sms", "channelId": 3, "isEnabled": false}}. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `additionalFields` | JSON | no |  | Additional Fields. Other marketing message properties, e.g. "publishUp", "publishDown". The dedicated props above win over the same keys here. |

Output fields:

- `message`: Message
- `message.isPublished`: Published (boolean)
- `message.dateAdded`: Date Added (datetime)
- `message.dateModified`: Date Modified
- `message.id`: ID (number)
- `message.name`: Name
- `message.description`: Description
- `message.publishUp`: Publish Up (datetime)
- `message.publishDown`: Publish Down
- `message.channels`: Channels
- `message.channels[].id`: ID (number)
- `message.channels[].channel`: Channel
- `message.channels[].channelId`: Channel ID (number)
- `message.channels[].channelName`: Channel Name
- `message.channels[].isEnabled`: Is Enabled (boolean)
- `message.category`: Category
- `message.category.id`: ID (number)
- `message.category.title`: Title
- `message.category.alias`: Alias
- `message.category.description`: Description
- `message.category.color`: Color
- `message.category.bundle`: Bundle

### `mautic_update_marketing_message`

**Update Marketing Message.** Updates an existing marketing message. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Marketing Message Id. Numeric marketing message id, from List Marketing Messages or Create Marketing Message. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `channels` | JSON | no |  | Channels. Channel settings keyed by channel, e.g. {"email": {"channel": "email", "channelId": 12, "isEnabled": true}, "sms": {"channel": "sms", "channelId": 3, "isEnabled": false}}. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `additionalFields` | JSON | no |  | Additional Fields. Other marketing message properties, e.g. "publishUp", "publishDown". The dedicated props above win over the same keys here. |

Output fields:

- `message`: Message
- `message.isPublished`: Published (boolean)
- `message.dateAdded`: Date Added (datetime)
- `message.dateModified`: Date Modified (datetime)
- `message.id`: ID (number)
- `message.name`: Name
- `message.description`: Description
- `message.publishUp`: Publish Up (datetime)
- `message.publishDown`: Publish Down
- `message.channels`: Channels
- `message.channels[].id`: ID (number)
- `message.channels[].channel`: Channel
- `message.channels[].channelId`: Channel ID (number)
- `message.channels[].channelName`: Channel Name
- `message.channels[].isEnabled`: Is Enabled (boolean)
- `message.category`: Category
- `message.category.id`: ID (number)
- `message.category.title`: Title
- `message.category.alias`: Alias
- `message.category.description`: Description
- `message.category.color`: Color
- `message.category.bundle`: Bundle

### `mautic_delete_marketing_message`

**Delete Marketing Message.** Permanently deletes a marketing message. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Marketing Message Id. Numeric marketing message id, from List Marketing Messages or Create Marketing Message. |

Output fields:

- `message`: Message
- `message.isPublished`: Published (boolean)
- `message.dateAdded`: Date Added (datetime)
- `message.dateModified`: Date Modified
- `message.id`: ID
- `message.name`: Name
- `message.description`: Description
- `message.publishUp`: Publish Up (datetime)
- `message.publishDown`: Publish Down
- `message.channels`: Channels
- `message.channels[].id`: ID
- `message.channels[].channel`: Channel
- `message.channels[].channelId`: Channel ID (number)
- `message.channels[].channelName`: Channel Name
- `message.channels[].isEnabled`: Is Enabled (boolean)
- `message.category`: Category
- `message.category.id`: ID (number)
- `message.category.title`: Title
- `message.category.alias`: Alias
- `message.category.description`: Description
- `message.category.color`: Color
- `message.category.bundle`: Bundle

### `mautic_list_push_notifications`

**List Push Notifications.** Lists web push notifications with their sent counts. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `notifications`: Notifications
- `notifications[].isPublished`: Published (boolean)
- `notifications[].dateAdded`: Date Added (datetime)
- `notifications[].dateModified`: Date Modified
- `notifications[].id`: ID (number)
- `notifications[].name`: Name
- `notifications[].heading`: Heading
- `notifications[].message`: Message
- `notifications[].url`: URL (url)
- `notifications[].language`: Language
- `notifications[].category`: Category
- `notifications[].category.id`: ID (number)
- `notifications[].category.title`: Title
- `notifications[].category.alias`: Alias
- `notifications[].category.description`: Description
- `notifications[].category.color`: Color
- `notifications[].category.bundle`: Bundle
- `notifications[].button`: Button
- `notifications[].utmTags`: Utm Tags
- `notifications[].utmTags.utmSource`: Utm Source
- `notifications[].utmTags.utmMedium`: Utm Medium
- `notifications[].utmTags.utmCampaign`: Utm Campaign
- `notifications[].utmTags.utmContent`: Utm Content
- `notifications[].publishUp`: Publish Up
- `notifications[].publishDown`: Publish Down
- `notifications[].readCount`: Read Count (number)
- `notifications[].sentCount`: Sent Count (number)

### `mautic_get_push_notification`

**Get Push Notification.** Gets a single web push notification by its numeric id. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Push Notification Id. Numeric push notification id, from List Push Notifications or Create Push Notification. |

Output fields:

- `notification`: Notification
- `notification.isPublished`: Published (boolean)
- `notification.dateAdded`: Date Added (datetime)
- `notification.dateModified`: Date Modified (datetime)
- `notification.id`: ID (number)
- `notification.name`: Name
- `notification.heading`: Heading
- `notification.message`: Message
- `notification.url`: URL (url)
- `notification.language`: Language
- `notification.category`: Category
- `notification.category.id`: ID (number)
- `notification.category.title`: Title
- `notification.category.alias`: Alias
- `notification.category.description`: Description
- `notification.category.color`: Color
- `notification.category.bundle`: Bundle
- `notification.button`: Button
- `notification.utmTags`: Utm Tags
- `notification.utmTags.utmSource`: Utm Source
- `notification.utmTags.utmMedium`: Utm Medium
- `notification.utmTags.utmCampaign`: Utm Campaign
- `notification.utmTags.utmContent`: Utm Content
- `notification.publishUp`: Publish Up
- `notification.publishDown`: Publish Down
- `notification.readCount`: Read Count (number)
- `notification.sentCount`: Sent Count (number)

### `mautic_create_push_notification`

**Create Push Notification.** Creates a web push notification. Name, Heading and Message are required. Sending needs a push provider configured in Mautic. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `heading` | string | yes |  | Heading. |
| `message` | string | yes |  | Message. |
| `url` | string | no |  | URL. Page opened when the notification is clicked. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `language` | string | no |  | Language. Locale code, e.g. "en". |
| `additionalFields` | JSON | no |  | Additional Fields. Other web push properties, e.g. "button", "utmTags", "publishUp", "publishDown". The dedicated props above win over the same keys here. |

Output fields:

- `notification`: Notification
- `notification.isPublished`: Published (boolean)
- `notification.dateAdded`: Date Added (datetime)
- `notification.dateModified`: Date Modified
- `notification.id`: ID (number)
- `notification.name`: Name
- `notification.heading`: Heading
- `notification.message`: Message
- `notification.url`: URL (url)
- `notification.language`: Language
- `notification.category`: Category
- `notification.category.id`: ID (number)
- `notification.category.title`: Title
- `notification.category.alias`: Alias
- `notification.category.description`: Description
- `notification.category.color`: Color
- `notification.category.bundle`: Bundle
- `notification.button`: Button
- `notification.utmTags`: Utm Tags
- `notification.utmTags.utmSource`: Utm Source
- `notification.utmTags.utmMedium`: Utm Medium
- `notification.utmTags.utmCampaign`: Utm Campaign
- `notification.utmTags.utmContent`: Utm Content
- `notification.publishUp`: Publish Up
- `notification.publishDown`: Publish Down
- `notification.readCount`: Read Count (number)
- `notification.sentCount`: Sent Count (number)

### `mautic_update_push_notification`

**Update Push Notification.** Updates an existing web push notification. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Push Notification Id. Numeric push notification id, from List Push Notifications or Create Push Notification. |
| `name` | string | no |  | Name. |
| `heading` | string | no |  | Heading. |
| `message` | string | no |  | Message. |
| `url` | string | no |  | URL. Page opened when the notification is clicked. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `language` | string | no |  | Language. Locale code, e.g. "en". |
| `additionalFields` | JSON | no |  | Additional Fields. Other web push properties, e.g. "button", "utmTags", "publishUp", "publishDown". The dedicated props above win over the same keys here. |

Output fields:

- `notification`: Notification
- `notification.isPublished`: Published (boolean)
- `notification.dateAdded`: Date Added (datetime)
- `notification.dateModified`: Date Modified (datetime)
- `notification.id`: ID (number)
- `notification.name`: Name
- `notification.heading`: Heading
- `notification.message`: Message
- `notification.url`: URL (url)
- `notification.language`: Language
- `notification.category`: Category
- `notification.category.id`: ID (number)
- `notification.category.title`: Title
- `notification.category.alias`: Alias
- `notification.category.description`: Description
- `notification.category.color`: Color
- `notification.category.bundle`: Bundle
- `notification.button`: Button
- `notification.utmTags`: Utm Tags
- `notification.utmTags.utmSource`: Utm Source
- `notification.utmTags.utmMedium`: Utm Medium
- `notification.utmTags.utmCampaign`: Utm Campaign
- `notification.utmTags.utmContent`: Utm Content
- `notification.publishUp`: Publish Up
- `notification.publishDown`: Publish Down
- `notification.readCount`: Read Count (number)
- `notification.sentCount`: Sent Count (number)

### `mautic_delete_push_notification`

**Delete Push Notification.** Permanently deletes a web push notification. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Push Notification Id. Numeric push notification id, from List Push Notifications or Create Push Notification. |

Output fields:

- `notification`: Notification
- `notification.isPublished`: Published (boolean)
- `notification.dateAdded`: Date Added (datetime)
- `notification.dateModified`: Date Modified
- `notification.id`: ID
- `notification.name`: Name
- `notification.heading`: Heading
- `notification.message`: Message
- `notification.url`: URL (url)
- `notification.language`: Language
- `notification.category`: Category
- `notification.category.id`: ID (number)
- `notification.category.title`: Title
- `notification.category.alias`: Alias
- `notification.category.description`: Description
- `notification.category.color`: Color
- `notification.category.bundle`: Bundle
- `notification.button`: Button
- `notification.utmTags`: Utm Tags
- `notification.utmTags.utmSource`: Utm Source
- `notification.utmTags.utmMedium`: Utm Medium
- `notification.utmTags.utmCampaign`: Utm Campaign
- `notification.utmTags.utmContent`: Utm Content
- `notification.publishUp`: Publish Up
- `notification.publishDown`: Publish Down
- `notification.readCount`: Read Count (number)
- `notification.sentCount`: Sent Count (number)

### `mautic_list_tweets`

**List Tweets.** Lists tweet templates used by campaigns. Needs the Social plugin with Twitter configured. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `tweets`: Tweets
- `tweets[].isPublished`: Published (boolean)
- `tweets[].dateAdded`: Date Added (datetime)
- `tweets[].dateModified`: Date Modified
- `tweets[].id`: ID (number)
- `tweets[].name`: Name
- `tweets[].text`: Text
- `tweets[].language`: Language
- `tweets[].category`: Category
- `tweets[].category.id`: ID (number)
- `tweets[].category.title`: Title
- `tweets[].category.alias`: Alias
- `tweets[].category.description`: Description
- `tweets[].category.color`: Color
- `tweets[].category.bundle`: Bundle
- `tweets[].mediaId`: Media ID
- `tweets[].mediaPath`: Media Path
- `tweets[].sentCount`: Sent Count (number)
- `tweets[].favoriteCount`: Favorite Count (number)
- `tweets[].retweetCount`: Retweet Count (number)
- `tweets[].description`: Description

### `mautic_get_tweet`

**Get Tweet.** Gets a single tweet template by its numeric id. Needs the Social plugin. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Tweet Id. Numeric tweet id, from List Tweets or Create Tweet. |

Output fields:

- `tweet`: Tweet
- `tweet.isPublished`: Published (boolean)
- `tweet.dateAdded`: Date Added (datetime)
- `tweet.dateModified`: Date Modified (datetime)
- `tweet.id`: ID (number)
- `tweet.name`: Name
- `tweet.text`: Text
- `tweet.language`: Language
- `tweet.category`: Category
- `tweet.category.id`: ID (number)
- `tweet.category.title`: Title
- `tweet.category.alias`: Alias
- `tweet.category.description`: Description
- `tweet.category.color`: Color
- `tweet.category.bundle`: Bundle
- `tweet.mediaId`: Media ID
- `tweet.mediaPath`: Media Path
- `tweet.sentCount`: Sent Count (number)
- `tweet.favoriteCount`: Favorite Count (number)
- `tweet.retweetCount`: Retweet Count (number)
- `tweet.description`: Description

### `mautic_create_tweet`

**Create Tweet.** Creates a tweet template that campaigns can post. Name and Text are required. Needs the Social plugin. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `text` | string | yes |  | Text. Tweet text, up to 280 characters. |
| `description` | string | no |  | Description. |
| `asset` | number | no |  | Asset Id. Asset to link, from List Assets. |
| `page` | number | no |  | Landing Page Id. Landing page to link, from List Landing Pages. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `language` | string | no |  | Language. Locale code, e.g. "en". |
| `additionalFields` | JSON | no |  | Additional Fields. Other tweet properties, e.g. "publishUp", "publishDown". The dedicated props above win over the same keys here. |

Output fields:

- `tweet`: Tweet
- `tweet.isPublished`: Published (boolean)
- `tweet.dateAdded`: Date Added (datetime)
- `tweet.dateModified`: Date Modified
- `tweet.id`: ID (number)
- `tweet.name`: Name
- `tweet.text`: Text
- `tweet.language`: Language
- `tweet.category`: Category
- `tweet.category.id`: ID (number)
- `tweet.category.title`: Title
- `tweet.category.alias`: Alias
- `tweet.category.description`: Description
- `tweet.category.color`: Color
- `tweet.category.bundle`: Bundle
- `tweet.mediaId`: Media ID
- `tweet.mediaPath`: Media Path
- `tweet.sentCount`: Sent Count (number)
- `tweet.favoriteCount`: Favorite Count (number)
- `tweet.retweetCount`: Retweet Count (number)
- `tweet.description`: Description

### `mautic_update_tweet`

**Update Tweet.** Updates an existing tweet template. Needs the Social plugin. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Tweet Id. Numeric tweet id, from List Tweets or Create Tweet. |
| `name` | string | no |  | Name. |
| `text` | string | no |  | Text. Tweet text, up to 280 characters. |
| `description` | string | no |  | Description. |
| `asset` | number | no |  | Asset Id. Asset to link, from List Assets. |
| `page` | number | no |  | Landing Page Id. Landing page to link, from List Landing Pages. |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `language` | string | no |  | Language. Locale code, e.g. "en". |
| `additionalFields` | JSON | no |  | Additional Fields. Other tweet properties, e.g. "publishUp", "publishDown". The dedicated props above win over the same keys here. |

Output fields:

- `tweet`: Tweet
- `tweet.isPublished`: Published (boolean)
- `tweet.dateAdded`: Date Added (datetime)
- `tweet.dateModified`: Date Modified (datetime)
- `tweet.id`: ID (number)
- `tweet.name`: Name
- `tweet.text`: Text
- `tweet.language`: Language
- `tweet.category`: Category
- `tweet.category.id`: ID (number)
- `tweet.category.title`: Title
- `tweet.category.alias`: Alias
- `tweet.category.description`: Description
- `tweet.category.color`: Color
- `tweet.category.bundle`: Bundle
- `tweet.mediaId`: Media ID
- `tweet.mediaPath`: Media Path
- `tweet.sentCount`: Sent Count (number)
- `tweet.favoriteCount`: Favorite Count (number)
- `tweet.retweetCount`: Retweet Count (number)
- `tweet.description`: Description

### `mautic_delete_tweet`

**Delete Tweet.** Permanently deletes a tweet template. Needs the Social plugin. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Tweet Id. Numeric tweet id, from List Tweets or Create Tweet. |

Output fields:

- `tweet`: Tweet
- `tweet.isPublished`: Published (boolean)
- `tweet.dateAdded`: Date Added (datetime)
- `tweet.dateModified`: Date Modified
- `tweet.id`: ID
- `tweet.name`: Name
- `tweet.text`: Text
- `tweet.language`: Language
- `tweet.category`: Category
- `tweet.category.id`: ID (number)
- `tweet.category.title`: Title
- `tweet.category.alias`: Alias
- `tweet.category.description`: Description
- `tweet.category.color`: Color
- `tweet.category.bundle`: Bundle
- `tweet.mediaId`: Media ID
- `tweet.mediaPath`: Media Path
- `tweet.sentCount`: Sent Count (number)
- `tweet.favoriteCount`: Favorite Count (number)
- `tweet.retweetCount`: Retweet Count (number)
- `tweet.description`: Description

### `mautic_list_point_actions`

**List Point Actions.** Lists point actions, the rules that give contacts points for what they do. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `points`: Points
- `points[].isPublished`: Published (boolean)
- `points[].dateAdded`: Date Added (datetime)
- `points[].dateModified`: Date Modified
- `points[].id`: ID (number)
- `points[].name`: Name
- `points[].category`: Category
- `points[].category.id`: ID (number)
- `points[].category.title`: Title
- `points[].category.alias`: Alias
- `points[].category.description`: Description
- `points[].category.color`: Color
- `points[].category.bundle`: Bundle
- `points[].type`: Type
- `points[].description`: Description
- `points[].publishUp`: Publish Up
- `points[].publishDown`: Publish Down
- `points[].delta`: Delta (number)
- `points[].properties`: Properties
- `points[].repeatable`: Repeatable (boolean)

### `mautic_get_point_action`

**Get Point Action.** Gets a single point action by its numeric id. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Point Action Id. Numeric point action id, from List Point Actions or Create Point Action. |

Output fields:

- `point`: Point
- `point.isPublished`: Published (boolean)
- `point.dateAdded`: Date Added (datetime)
- `point.dateModified`: Date Modified (datetime)
- `point.id`: ID (number)
- `point.name`: Name
- `point.category`: Category
- `point.category.id`: ID (number)
- `point.category.title`: Title
- `point.category.alias`: Alias
- `point.category.description`: Description
- `point.category.color`: Color
- `point.category.bundle`: Bundle
- `point.type`: Type
- `point.description`: Description
- `point.publishUp`: Publish Up
- `point.publishDown`: Publish Down
- `point.delta`: Delta (number)
- `point.properties`: Properties
- `point.properties.page_url`: Page URL (url)
- `point.repeatable`: Repeatable (boolean)

### `mautic_create_point_action`

**Create Point Action.** Creates a point action. Name, Type and Points are required. Mautic ignores Properties on create, so set them afterwards with Update Point Action. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `type` | string | yes |  | Type. Action type key, e.g. "email.open", "form.submit", "page.hit", "url.hit", "asset.download", from List Point Action Types. |
| `delta` | number | yes |  | Points. Points to add when the action happens; negative to subtract. |
| `description` | string | no |  | Description. |
| `properties` | JSON | no |  | Properties. Type settings, e.g. {"emails": [12]} for email.open or {"page_url": "https://example.com/pricing"} for url.hit. |
| `group` | number | no |  | Point Group Id. Point group to score in instead of the total, from List Point Groups (Mautic 5.1+). |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `additionalFields` | JSON | no |  | Additional Fields. Other point action properties, e.g. "repeatable", "publishUp", "publishDown". The dedicated props above win over the same keys here. |

Output fields:

- `point`: Point
- `point.isPublished`: Published (boolean)
- `point.dateAdded`: Date Added (datetime)
- `point.dateModified`: Date Modified
- `point.id`: ID (number)
- `point.name`: Name
- `point.category`: Category
- `point.category.id`: ID (number)
- `point.category.title`: Title
- `point.category.alias`: Alias
- `point.category.description`: Description
- `point.category.color`: Color
- `point.category.bundle`: Bundle
- `point.type`: Type
- `point.description`: Description
- `point.publishUp`: Publish Up
- `point.publishDown`: Publish Down
- `point.delta`: Delta (number)
- `point.properties`: Properties
- `point.repeatable`: Repeatable (boolean)

### `mautic_update_point_action`

**Update Point Action.** Updates an existing point action. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Point Action Id. Numeric point action id, from List Point Actions or Create Point Action. |
| `name` | string | no |  | Name. |
| `type` | string | no |  | Type. Action type key, e.g. "email.open", "form.submit", "page.hit", "url.hit", "asset.download", from List Point Action Types. |
| `delta` | number | no |  | Points. Points to add when the action happens; negative to subtract. |
| `description` | string | no |  | Description. |
| `properties` | JSON | no |  | Properties. Type settings, e.g. {"emails": [12]} for email.open or {"page_url": "https://example.com/pricing"} for url.hit. |
| `group` | number | no |  | Point Group Id. Point group to score in instead of the total, from List Point Groups (Mautic 5.1+). |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `additionalFields` | JSON | no |  | Additional Fields. Other point action properties, e.g. "repeatable", "publishUp", "publishDown". The dedicated props above win over the same keys here. |

Output fields:

- `point`: Point
- `point.isPublished`: Published (boolean)
- `point.dateAdded`: Date Added (datetime)
- `point.dateModified`: Date Modified (datetime)
- `point.id`: ID (number)
- `point.name`: Name
- `point.category`: Category
- `point.category.id`: ID (number)
- `point.category.title`: Title
- `point.category.alias`: Alias
- `point.category.description`: Description
- `point.category.color`: Color
- `point.category.bundle`: Bundle
- `point.type`: Type
- `point.description`: Description
- `point.publishUp`: Publish Up
- `point.publishDown`: Publish Down
- `point.delta`: Delta (number)
- `point.properties`: Properties
- `point.properties.page_url`: Page URL (url)
- `point.repeatable`: Repeatable (boolean)

### `mautic_delete_point_action`

**Delete Point Action.** Permanently deletes a point action; points already given stay. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Point Action Id. Numeric point action id, from List Point Actions or Create Point Action. |

Output fields:

- `point`: Point
- `point.isPublished`: Published (boolean)
- `point.dateAdded`: Date Added (datetime)
- `point.dateModified`: Date Modified
- `point.id`: ID
- `point.name`: Name
- `point.category`: Category
- `point.category.id`: ID (number)
- `point.category.title`: Title
- `point.category.alias`: Alias
- `point.category.description`: Description
- `point.category.color`: Color
- `point.category.bundle`: Bundle
- `point.type`: Type
- `point.description`: Description
- `point.publishUp`: Publish Up
- `point.publishDown`: Publish Down
- `point.delta`: Delta (number)
- `point.properties`: Properties
- `point.repeatable`: Repeatable (boolean)

### `mautic_list_point_action_types`

**List Point Action Types.** Lists the action type keys and labels that Create Point Action takes as Type. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `pointActionTypes`: Point Action Types (an object whose keys vary)

### `mautic_list_point_triggers`

**List Point Triggers.** Lists point triggers, which act when a contact reaches a score. Page with Start and Limit; the response has the total count. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Search. Search string or Mautic search command, e.g. "jane" or "email:jane@example.com". |
| `start` | number | no |  | Start. Zero-based offset of the first record. Add the limit to it to fetch the next page. |
| `limit` | number | no | `30` | Limit. Maximum number of records to return. |
| `orderBy` | string | no |  | Order By. Column to sort by, in snake_case, e.g. "date_added" or "id". |
| `orderByDir` | string | no |  | Order Direction. One of `"ASC"`, `"DESC"`. |
| `where` | array | no |  | Where. Conditions that must all match. "col" is a column name such as "email" or "id", "expr" a Doctrine expression, "val" the value (comma-separated for in/notIn). Each item: { `col`, `expr`, `val`? }. |
| `publishedOnly` | boolean | no |  | Published Only. Return only published records. |

Output fields:

- `total`: Total (number)
- `triggers`: Triggers
- `triggers[].isPublished`: Published (boolean)
- `triggers[].dateAdded`: Date Added (datetime)
- `triggers[].dateModified`: Date Modified (datetime)
- `triggers[].id`: ID (number)
- `triggers[].name`: Name
- `triggers[].category`: Category
- `triggers[].category.id`: ID (number)
- `triggers[].category.title`: Title
- `triggers[].category.alias`: Alias
- `triggers[].category.description`: Description
- `triggers[].category.color`: Color
- `triggers[].category.bundle`: Bundle
- `triggers[].description`: Description
- `triggers[].publishUp`: Publish Up
- `triggers[].publishDown`: Publish Down
- `triggers[].points`: Points (number)
- `triggers[].color`: Color
- `triggers[].events`: Events
- `triggers[].events[].id`: ID (number)
- `triggers[].events[].name`: Name
- `triggers[].events[].description`: Description
- `triggers[].events[].type`: Type
- `triggers[].events[].order`: Order (number)
- `triggers[].events[].properties`: Properties
- `triggers[].events[].properties.add_tags`: Add Tags
- `triggers[].events[].properties.remove_tags`: Remove Tags
- `triggers[].triggerExistingLeads`: Trigger Existing Leads (boolean)

### `mautic_get_point_trigger`

**Get Point Trigger.** Gets a single point trigger by its numeric id, with its events. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Point Trigger Id. Numeric point trigger id, from List Point Triggers or Create Point Trigger. |

Output fields:

- `trigger`: Trigger
- `trigger.isPublished`: Published (boolean)
- `trigger.dateAdded`: Date Added (datetime)
- `trigger.dateModified`: Date Modified (datetime)
- `trigger.id`: ID (number)
- `trigger.name`: Name
- `trigger.category`: Category
- `trigger.category.id`: ID (number)
- `trigger.category.title`: Title
- `trigger.category.alias`: Alias
- `trigger.category.description`: Description
- `trigger.category.color`: Color
- `trigger.category.bundle`: Bundle
- `trigger.description`: Description
- `trigger.publishUp`: Publish Up
- `trigger.publishDown`: Publish Down
- `trigger.points`: Points (number)
- `trigger.color`: Color
- `trigger.events`: Events
- `trigger.events[].id`: ID (number)
- `trigger.events[].name`: Name
- `trigger.events[].description`: Description
- `trigger.events[].type`: Type
- `trigger.events[].order`: Order (number)
- `trigger.events[].properties`: Properties
- `trigger.events[].properties.add_tags`: Add Tags
- `trigger.events[].properties.remove_tags`: Remove Tags
- `trigger.triggerExistingLeads`: Trigger Existing Leads (boolean)

### `mautic_create_point_trigger`

**Create Point Trigger.** Creates a point trigger. Name and Points are required. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `points` | number | yes |  | Points. Score at which the trigger fires. |
| `events` | array | no |  | Events. What happens when it fires, each like {"name": "Add tag", "type": "lead.changetags", "properties": {"add_tags": ["hot"]}}. Types come from List Point Trigger Event Types. On update, events with an "id" are edited and others added. |
| `triggerExistingLeads` | string | no |  | Apply to Existing Contacts. Whether contacts already at the score get the events. One of `true`, `false`. |
| `color` | string | no |  | Color. Hex color without "#", e.g. "a0acb8". |
| `description` | string | no |  | Description. |
| `group` | number | no |  | Point Group Id. Point group whose score is watched instead of the total, from List Point Groups (Mautic 5.1+). |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `additionalFields` | JSON | no |  | Additional Fields. Other point trigger properties, e.g. "publishUp", "publishDown". The dedicated props above win over the same keys here. |

Output fields:

- `trigger`: Trigger
- `trigger.isPublished`: Published (boolean)
- `trigger.dateAdded`: Date Added (datetime)
- `trigger.dateModified`: Date Modified (datetime)
- `trigger.id`: ID (number)
- `trigger.name`: Name
- `trigger.category`: Category
- `trigger.category.id`: ID (number)
- `trigger.category.title`: Title
- `trigger.category.alias`: Alias
- `trigger.category.description`: Description
- `trigger.category.color`: Color
- `trigger.category.bundle`: Bundle
- `trigger.description`: Description
- `trigger.publishUp`: Publish Up
- `trigger.publishDown`: Publish Down
- `trigger.points`: Points (number)
- `trigger.color`: Color
- `trigger.events`: Events
- `trigger.events[].id`: ID (number)
- `trigger.events[].name`: Name
- `trigger.events[].description`: Description
- `trigger.events[].type`: Type
- `trigger.events[].order`: Order (number)
- `trigger.events[].properties`: Properties
- `trigger.events[].properties.add_tags`: Add Tags
- `trigger.events[].properties.remove_tags`: Remove Tags
- `trigger.triggerExistingLeads`: Trigger Existing Leads (boolean)

### `mautic_update_point_trigger`

**Update Point Trigger.** Updates an existing point trigger. Remove events with Delete Point Trigger Events. Only the fields given are changed. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Point Trigger Id. Numeric point trigger id, from List Point Triggers or Create Point Trigger. |
| `name` | string | no |  | Name. |
| `points` | number | no |  | Points. Score at which the trigger fires. |
| `events` | array | no |  | Events. What happens when it fires, each like {"name": "Add tag", "type": "lead.changetags", "properties": {"add_tags": ["hot"]}}. Types come from List Point Trigger Event Types. On update, events with an "id" are edited and others added. |
| `triggerExistingLeads` | string | no |  | Apply to Existing Contacts. Whether contacts already at the score get the events. One of `true`, `false`. |
| `color` | string | no |  | Color. Hex color without "#", e.g. "a0acb8". |
| `description` | string | no |  | Description. |
| `group` | number | no |  | Point Group Id. Point group whose score is watched instead of the total, from List Point Groups (Mautic 5.1+). |
| `isPublished` | string | no |  | Published. One of `true`, `false`. |
| `category` | number | no |  | Category Id. Category id, from List Categories. |
| `additionalFields` | JSON | no |  | Additional Fields. Other point trigger properties, e.g. "publishUp", "publishDown". The dedicated props above win over the same keys here. |

Output fields:

- `trigger`: Trigger
- `trigger.isPublished`: Published (boolean)
- `trigger.dateAdded`: Date Added (datetime)
- `trigger.dateModified`: Date Modified (datetime)
- `trigger.id`: ID (number)
- `trigger.name`: Name
- `trigger.category`: Category
- `trigger.category.id`: ID (number)
- `trigger.category.title`: Title
- `trigger.category.alias`: Alias
- `trigger.category.description`: Description
- `trigger.category.color`: Color
- `trigger.category.bundle`: Bundle
- `trigger.description`: Description
- `trigger.publishUp`: Publish Up
- `trigger.publishDown`: Publish Down
- `trigger.points`: Points (number)
- `trigger.color`: Color
- `trigger.events`: Events
- `trigger.events[].id`: ID (number)
- `trigger.events[].name`: Name
- `trigger.events[].description`: Description
- `trigger.events[].type`: Type
- `trigger.events[].order`: Order (number)
- `trigger.events[].properties`: Properties
- `trigger.events[].properties.add_tags`: Add Tags
- `trigger.events[].properties.remove_tags`: Remove Tags
- `trigger.triggerExistingLeads`: Trigger Existing Leads (boolean)

### `mautic_delete_point_trigger`

**Delete Point Trigger.** Permanently deletes a point trigger and its events. Cannot be undone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | string | yes |  | Point Trigger Id. Numeric point trigger id, from List Point Triggers or Create Point Trigger. |

Output fields:

- `trigger`: Trigger
- `trigger.isPublished`: Published (boolean)
- `trigger.dateAdded`: Date Added (datetime)
- `trigger.dateModified`: Date Modified (datetime)
- `trigger.id`: ID
- `trigger.name`: Name
- `trigger.category`: Category
- `trigger.category.id`: ID (number)
- `trigger.category.title`: Title
- `trigger.category.alias`: Alias
- `trigger.category.description`: Description
- `trigger.category.color`: Color
- `trigger.category.bundle`: Bundle
- `trigger.description`: Description
- `trigger.publishUp`: Publish Up
- `trigger.publishDown`: Publish Down
- `trigger.points`: Points (number)
- `trigger.color`: Color
- `trigger.events`: Events
- `trigger.events[].id`: ID
- `trigger.events[].name`: Name
- `trigger.events[].description`: Description
- `trigger.events[].type`: Type
- `trigger.events[].order`: Order (number)
- `trigger.events[].properties`: Properties
- `trigger.events[].properties.add_tags`: Add Tags
- `trigger.events[].properties.remove_tags`: Remove Tags
- `trigger.triggerExistingLeads`: Trigger Existing Leads (boolean)

### `mautic_list_point_trigger_event_types`

**List Point Trigger Event Types.** Lists the event type keys and labels that point trigger events take as "type". Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `eventTypes`: Event Types (an object whose keys vary)

### `mautic_delete_point_trigger_events`

**Delete Point Trigger Events.** Removes events from a point trigger by id. Repeating it with the same ids changes nothing. Returns the trigger. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `triggerId` | string | yes |  | Point Trigger Id. Numeric point trigger id, from List Point Triggers. |
| `ids` | array | yes |  | Event Ids. Event ids to delete, from the events of Get Point Trigger. |

Output fields:

- `trigger`: Trigger
- `trigger.isPublished`: Published (boolean)
- `trigger.dateAdded`: Date Added (datetime)
- `trigger.dateModified`: Date Modified (datetime)
- `trigger.id`: ID (number)
- `trigger.name`: Name
- `trigger.category`: Category
- `trigger.category.isPublished`: Published (boolean)
- `trigger.category.dateAdded`: Date Added (datetime)
- `trigger.category.dateModified`: Date Modified (datetime)
- `trigger.category.id`: ID (number)
- `trigger.category.title`: Title
- `trigger.category.alias`: Alias
- `trigger.category.description`: Description
- `trigger.category.color`: Color
- `trigger.category.bundle`: Bundle
- `trigger.description`: Description
- `trigger.points`: Points (number)
- `trigger.color`: Color
- `trigger.events`: Events
- `trigger.events[].id`: ID (number)
- `trigger.events[].name`: Name
- `trigger.events[].type`: Type
- `trigger.events[].order`: Order (number)
- `trigger.events[].properties`: Properties
- `trigger.events[].properties.add_tags`: Add Tags
- `trigger.events[].properties.remove_tags`: Remove Tags
- `trigger.triggerExistingLeads`: Trigger Existing Leads (boolean)

### `mautic_list_files`

**List Files.** Lists the file names in the images or media (asset uploads) folder, or a subfolder of it. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dir` | string | yes |  | Folder. One of `"images"`, `"media"`. |
| `subdir` | string | no |  | Subfolder. Optional subfolder inside the folder, e.g. "banners". |

Output fields:

- `files`: Files
- `files.2`: 2

### `mautic_upload_file`

**Upload File.** Uploads a file to the images or media (asset uploads) folder. Mautic stores it under a new random name and returns that name, plus a public link for images, e.g. for use in email or page HTML. Only extensions allowed in Mautic settings are accepted. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dir` | string | yes |  | Folder. One of `"images"`, `"media"`. |
| `file` | file | yes |  | File. Files are not supported; an action that needs one fails. |
| `subdir` | string | no |  | Subfolder. Optional subfolder inside the folder, e.g. "banners". |

Output fields:

- `file`: File
- `file.link`: Link (image)
- `file.name`: Name

### `mautic_delete_file`

**Delete File.** Permanently deletes a file from the images or media folder; emails and pages linking to it break. File names come from List Files. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dir` | string | yes |  | Folder. One of `"images"`, `"media"`. |
| `file` | string | yes |  | File Name. File name with extension, from List Files. |
| `subdir` | string | no |  | Subfolder. Optional subfolder inside the folder, e.g. "banners". |

Output fields:

- `success`: Success (boolean)

### `mautic_list_themes`

**List Themes.** Lists the installed themes for emails, landing pages and forms, keyed by theme folder name. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `themes`: Themes (an object whose keys vary)

### `mautic_get_theme`

**Get Theme.** Downloads an installed theme as a zip file and returns the file. Theme names come from List Themes. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `theme` | string | yes |  | Theme. Theme folder name, from List Themes. |

Output fields:

- `theme`: Theme
- `file`: File (url)

### `mautic_upload_theme`

**Upload Theme.** Installs a theme from a zip file with the theme folder inside; an existing theme with the same name is replaced. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `file` | file | yes |  | Theme Zip. Files are not supported; an action that needs one fails. |

Output fields:

- `success`: Success (boolean)

### `mautic_delete_theme`

**Delete Theme.** Permanently deletes an installed theme; emails and pages built on it lose their layout. Default themes cannot be deleted. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `theme` | string | yes |  | Theme. Theme folder name, from List Themes. |

Output fields:

- `success`: Success (boolean)

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

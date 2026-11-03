# Google Contacts

Stay connected and organized

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-google-contacts'
  version: '0.5.4'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `add_contact`

**Add Contact.** Creates a new person in the authenticated Google Contacts account from name, email, phone, company, and job title fields. Use when an agent needs to add someone to address book contacts; first and last name are required. Not idempotent — each call creates a separate contact even with identical input, so guard against duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | yes |  | First Name. The first name of the contact. |
| `middleName` | string | no |  | Middle Name. The middle name of the contact. |
| `lastName` | string | yes |  | Last Name. The last name of the contact. |
| `jobTitle` | string | no |  | Job Title. The job title of the contact. |
| `company` | string | no |  | Company. The company of the contact. |
| `email` | string | no |  | Email. The email address of the contact. |
| `phoneNumber` | string | no |  | Phone Number. The phone number of the contact. |

Output fields:

- `resourceName`: Resource Name
- `etag`: ETag
- `names`: Names
- `names[].displayName`: Display Name
- `names[].givenName`: First Name
- `names[].middleName`: Middle Name
- `names[].familyName`: Last Name
- `names[].displayNameLastFirst`: Display Name (Last, First)
- `names[].unstructuredName`: Unstructured Name
- `names[].metadata.primary`: Primary (boolean)
- `emailAddresses`: Email Addresses
- `emailAddresses[].value`: Email Address (email)
- `emailAddresses[].metadata.primary`: Primary (boolean)
- `phoneNumbers`: Phone Numbers
- `phoneNumbers[].value`: Phone Number
- `phoneNumbers[].canonicalForm`: Canonical Form
- `phoneNumbers[].metadata.primary`: Primary (boolean)
- `nicknames`: Nicknames
- `nicknames[].value`: Nickname
- `nicknames[].metadata.primary`: Primary (boolean)
- `biographies`: Notes
- `biographies[].value`: Notes
- `biographies[].contentType`: Content Type
- `biographies[].metadata.primary`: Primary (boolean)
- `organizations`: Organizations
- `organizations[].name`: Company
- `organizations[].title`: Job Title
- `organizations[].metadata.primary`: Primary (boolean)
- `photos`: Photos
- `photos[].url`: Photo URL (image)
- `photos[].default`: Is Placeholder (boolean)
- `photos[].metadata.primary`: Primary (boolean)
- `memberships`: Group Memberships
- `memberships[].contactGroupMembership.contactGroupId`: Contact Group ID
- `memberships[].contactGroupMembership.contactGroupResourceName`: Contact Group Resource Name
- `metadata`: Metadata
- `metadata.objectType`: Object Type
- `metadata.sources`: Sources
- `metadata.sources[].type`: Source Type
- `metadata.sources[].id`: Source ID
- `metadata.sources[].updateTime`: Last Updated (datetime)

### `update_contact`

**Update Contact.** Updates fields (name, email, phone, company, job title) on an existing Google Contacts person identified by its resourceName (people/{id}). Use when an agent needs to modify a known contact; requires both the resourceName and the current etag, and a field mask listing which fields to update — the call is rejected if the contact changed since the etag was fetched. Repeating the same update with the same etag/values is safe and yields the same result. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resourceName` | string | yes |  | Resource Name. The resource name for the person, assigned by the server. An ASCII string in the form of people/{person_id}. |
| `etag` | string | yes |  | Etag. The `etag` ensures contact updates only apply if the contact hasn't changed since last retrieved. |
| `updatePersonFields` | array | yes | `["names","emailAddresses"]` | Update Field Mask. A field mask to restrict which fields on the person are updated. One of `"names"`, `"emailAddresses"`, `"phoneNumbers"`, `"organizations"`. |
| `firstName` | string | no |  | First Name. The first name of the contact. |
| `middleName` | string | no |  | Middle Name. The middle name of the contact. |
| `lastName` | string | no |  | Last Name. The last name of the contact. |
| `jobTitle` | string | no |  | Job Title. The job title of the contact. |
| `company` | string | no |  | Company. The company of the contact. |
| `email` | string | no |  | Email. The email address of the contact. |
| `phoneNumber` | string | no |  | Phone Number. The phone number of the contact. |

Output fields:

- `resourceName`: Resource Name
- `etag`: ETag
- `names`: Names
- `names[].displayName`: Display Name
- `names[].givenName`: First Name
- `names[].middleName`: Middle Name
- `names[].familyName`: Last Name
- `names[].displayNameLastFirst`: Display Name (Last, First)
- `names[].unstructuredName`: Unstructured Name
- `names[].metadata.primary`: Primary (boolean)
- `emailAddresses`: Email Addresses
- `emailAddresses[].value`: Email Address (email)
- `emailAddresses[].metadata.primary`: Primary (boolean)
- `phoneNumbers`: Phone Numbers
- `phoneNumbers[].value`: Phone Number
- `phoneNumbers[].canonicalForm`: Canonical Form
- `phoneNumbers[].metadata.primary`: Primary (boolean)
- `nicknames`: Nicknames
- `nicknames[].value`: Nickname
- `nicknames[].metadata.primary`: Primary (boolean)
- `biographies`: Notes
- `biographies[].value`: Notes
- `biographies[].contentType`: Content Type
- `biographies[].metadata.primary`: Primary (boolean)
- `organizations`: Organizations
- `organizations[].name`: Company
- `organizations[].title`: Job Title
- `organizations[].metadata.primary`: Primary (boolean)
- `photos`: Photos
- `photos[].url`: Photo URL (image)
- `photos[].default`: Is Placeholder (boolean)
- `photos[].metadata.primary`: Primary (boolean)
- `memberships`: Group Memberships
- `memberships[].contactGroupMembership.contactGroupId`: Contact Group ID
- `memberships[].contactGroupMembership.contactGroupResourceName`: Contact Group Resource Name
- `metadata`: Metadata
- `metadata.objectType`: Object Type
- `metadata.sources`: Sources
- `metadata.sources[].type`: Source Type
- `metadata.sources[].id`: Source ID
- `metadata.sources[].updateTime`: Last Updated (datetime)

### `search_contact`

**Search Contacts.** Searches the authenticated Google Contacts account for people matching a plain-text query, which prefix-matches against contact fields. Use when an agent needs to find a contact or its resourceName before updating it; the query is required and a read mask selects which fields come back (max 30 results). Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. The plain-text query for the request.The query is used to match prefix phrases of the fields on a person. For example, a person with name "foo name" matches queries such as "f", "fo", "foo", "foo n", "nam", etc., but not "oo n". |
| `readMask` | array | yes | `["names","emailAddresses"]` | Read Mask. A field mask to restrict which fields on each person are returned. One of `"addresses"`, `"ageRanges"`, `"biographies"`, `"birthdays"`, `"calendarUrls"`, `"clientData"`, `"coverPhotos"`, `"emailAddresses"`, `"events"`, `"externalIds"`, `"genders"`, `"imClients"`, `"interests"`, `"locales"`, `"locations"`, `"memberships"`, `"metadata"`, `"miscKeywords"`, `"names"`, `"nicknames"`, `"occupations"`, `"organizations"`, `"phoneNumbers"`, `"photos"`, `"relations"` and 4 more. |
| `pageSize` | number | no |  | Page Size. The number of results to return. Maximum 30. |

Output fields:

- `results`: Matching Contacts
- `results[].person`: Contact
- `results[].person.resourceName`: Resource Name
- `results[].person.etag`: ETag
- `results[].person.names`: Names
- `results[].person.names[].displayName`: Display Name
- `results[].person.names[].givenName`: First Name
- `results[].person.names[].middleName`: Middle Name
- `results[].person.names[].familyName`: Last Name
- `results[].person.names[].displayNameLastFirst`: Display Name (Last, First)
- `results[].person.names[].unstructuredName`: Unstructured Name
- `results[].person.names[].metadata.primary`: Primary (boolean)
- `results[].person.emailAddresses`: Email Addresses
- `results[].person.emailAddresses[].value`: Email Address (email)
- `results[].person.emailAddresses[].metadata.primary`: Primary (boolean)
- `results[].person.phoneNumbers`: Phone Numbers
- `results[].person.phoneNumbers[].value`: Phone Number
- `results[].person.phoneNumbers[].canonicalForm`: Canonical Form
- `results[].person.phoneNumbers[].metadata.primary`: Primary (boolean)
- `results[].person.nicknames`: Nicknames
- `results[].person.nicknames[].value`: Nickname
- `results[].person.nicknames[].metadata.primary`: Primary (boolean)
- `results[].person.biographies`: Notes
- `results[].person.biographies[].value`: Notes
- `results[].person.biographies[].contentType`: Content Type
- `results[].person.biographies[].metadata.primary`: Primary (boolean)
- `results[].person.organizations`: Organizations
- `results[].person.organizations[].name`: Company
- `results[].person.organizations[].title`: Job Title
- `results[].person.organizations[].metadata.primary`: Primary (boolean)
- `results[].person.photos`: Photos
- `results[].person.photos[].url`: Photo URL (image)
- `results[].person.photos[].default`: Is Placeholder (boolean)
- `results[].person.photos[].metadata.primary`: Primary (boolean)
- `results[].person.memberships`: Group Memberships
- `results[].person.memberships[].contactGroupMembership.contactGroupId`: Contact Group ID
- `results[].person.memberships[].contactGroupMembership.contactGroupResourceName`: Contact Group Resource Name
- `results[].person.metadata`: Metadata
- `results[].person.metadata.objectType`: Object Type
- `results[].person.metadata.sources`: Sources
- `results[].person.metadata.sources[].type`: Source Type
- `results[].person.metadata.sources[].id`: Source ID
- `results[].person.metadata.sources[].updateTime`: Last Updated (datetime)

### `create_contact`

**Create Contact.** Creates one new person in the connected Google Contacts account from name, nickname, email, phone, organization and notes fields. Supply at least one of name, email or phone; email addresses and phone numbers are arrays of strings, so pass ["ada@example.com"] rather than a bare string. Use Batch Create Contacts for many at once, and Update Contact Fields to change someone who already exists. Not idempotent — every call creates a separate person, so check with Search Contacts first if duplicates matter. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | no |  | First Name. |
| `middleName` | string | no |  | Middle Name. |
| `lastName` | string | no |  | Last Name. |
| `nickname` | string | no |  | Nickname. |
| `emails` | array | no |  | Email Addresses. Array of email address strings, for example ["ada@example.com"]. A single address still has to be wrapped in an array. |
| `phoneNumbers` | array | no |  | Phone Numbers. Array of phone number strings, for example ["+1 555 0100"]. A single number still has to be wrapped in an array. |
| `company` | string | no |  | Company. |
| `jobTitle` | string | no |  | Job Title. |
| `biography` | string | no |  | Notes. Free-text notes stored on the contact biography. |

Output fields:

- `resourceName`: Resource Name
- `etag`: ETag
- `names`: Names
- `names[].displayName`: Display Name
- `names[].givenName`: First Name
- `names[].middleName`: Middle Name
- `names[].familyName`: Last Name
- `names[].displayNameLastFirst`: Display Name (Last, First)
- `names[].unstructuredName`: Unstructured Name
- `names[].metadata.primary`: Primary (boolean)
- `emailAddresses`: Email Addresses
- `emailAddresses[].value`: Email Address (email)
- `emailAddresses[].metadata.primary`: Primary (boolean)
- `phoneNumbers`: Phone Numbers
- `phoneNumbers[].value`: Phone Number
- `phoneNumbers[].canonicalForm`: Canonical Form
- `phoneNumbers[].metadata.primary`: Primary (boolean)
- `nicknames`: Nicknames
- `nicknames[].value`: Nickname
- `nicknames[].metadata.primary`: Primary (boolean)
- `biographies`: Notes
- `biographies[].value`: Notes
- `biographies[].contentType`: Content Type
- `biographies[].metadata.primary`: Primary (boolean)
- `organizations`: Organizations
- `organizations[].name`: Company
- `organizations[].title`: Job Title
- `organizations[].metadata.primary`: Primary (boolean)
- `photos`: Photos
- `photos[].url`: Photo URL (image)
- `photos[].default`: Is Placeholder (boolean)
- `photos[].metadata.primary`: Primary (boolean)
- `memberships`: Group Memberships
- `memberships[].contactGroupMembership.contactGroupId`: Contact Group ID
- `memberships[].contactGroupMembership.contactGroupResourceName`: Contact Group Resource Name
- `metadata`: Metadata
- `metadata.objectType`: Object Type
- `metadata.sources`: Sources
- `metadata.sources[].type`: Source Type
- `metadata.sources[].id`: Source ID
- `metadata.sources[].updateTime`: Last Updated (datetime)

### `update_contact_fields`

**Update Contact Fields.** Updates an existing Google Contacts person, changing only the fields you supply and leaving every other field untouched. It reads the contact first, so it resolves the required etag and field mask itself — you never pass them. Supply the opaque resourceName from List Contacts or Search Contacts. A non-empty email or phone list replaces the stored list for that field wholesale; first/middle/last name and company/job title are merged over the current values. Leaving a list empty does NOT clear it, because the platform cannot distinguish an untouched list from an emptied one: to remove every email address or every phone number, including the last one, set clearEmails or clearPhoneNumbers to true. Setting a clear flag while also supplying a non-empty list for the same field is rejected. Safe to retry: re-applying the same values converges, and a concurrent edit surfaces as a re-read-and-retry error. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resourceName` | string | yes |  | Resource Name. Opaque contact resource name such as people/c12345. Resolve it with List Contacts or Search Contacts. |
| `firstName` | string | no |  | First Name. |
| `middleName` | string | no |  | Middle Name. |
| `lastName` | string | no |  | Last Name. |
| `nickname` | string | no |  | Nickname. |
| `emails` | array | no |  | Email Addresses. Array of email address strings, for example ["ada@example.com"]. Replaces every email address stored on the contact. Leaving it empty keeps the stored addresses; it does not clear them, because an untouched list and an emptied one cannot be told apart. Use Clear Email Addresses to remove them. |
| `clearEmails` | boolean | no | `false` | Clear Email Addresses. Remove every email address from the contact, including the last one. This is the only way to clear them. Cannot be combined with a non-empty Email Addresses list. |
| `phoneNumbers` | array | no |  | Phone Numbers. Array of phone number strings, for example ["+1 555 0100"]. Replaces every phone number stored on the contact. Leaving it empty keeps the stored numbers; it does not clear them, because an untouched list and an emptied one cannot be told apart. Use Clear Phone Numbers to remove them. |
| `clearPhoneNumbers` | boolean | no | `false` | Clear Phone Numbers. Remove every phone number from the contact, including the last one. This is the only way to clear them. Cannot be combined with a non-empty Phone Numbers list. |
| `company` | string | no |  | Company. |
| `jobTitle` | string | no |  | Job Title. |
| `biography` | string | no |  | Notes. |

Output fields:

- `resourceName`: Resource Name
- `etag`: ETag
- `names`: Names
- `names[].displayName`: Display Name
- `names[].givenName`: First Name
- `names[].middleName`: Middle Name
- `names[].familyName`: Last Name
- `names[].displayNameLastFirst`: Display Name (Last, First)
- `names[].unstructuredName`: Unstructured Name
- `names[].metadata.primary`: Primary (boolean)
- `emailAddresses`: Email Addresses
- `emailAddresses[].value`: Email Address (email)
- `emailAddresses[].metadata.primary`: Primary (boolean)
- `phoneNumbers`: Phone Numbers
- `phoneNumbers[].value`: Phone Number
- `phoneNumbers[].canonicalForm`: Canonical Form
- `phoneNumbers[].metadata.primary`: Primary (boolean)
- `nicknames`: Nicknames
- `nicknames[].value`: Nickname
- `nicknames[].metadata.primary`: Primary (boolean)
- `biographies`: Notes
- `biographies[].value`: Notes
- `biographies[].contentType`: Content Type
- `biographies[].metadata.primary`: Primary (boolean)
- `organizations`: Organizations
- `organizations[].name`: Company
- `organizations[].title`: Job Title
- `organizations[].metadata.primary`: Primary (boolean)
- `photos`: Photos
- `photos[].url`: Photo URL (image)
- `photos[].default`: Is Placeholder (boolean)
- `photos[].metadata.primary`: Primary (boolean)
- `memberships`: Group Memberships
- `memberships[].contactGroupMembership.contactGroupId`: Contact Group ID
- `memberships[].contactGroupMembership.contactGroupResourceName`: Contact Group Resource Name
- `metadata`: Metadata
- `metadata.objectType`: Object Type
- `metadata.sources`: Sources
- `metadata.sources[].type`: Source Type
- `metadata.sources[].id`: Source ID
- `metadata.sources[].updateTime`: Last Updated (datetime)

### `search_contacts`

**Search Contacts.** Searches the connected Google Contacts account for people whose fields prefix-match a plain-text query and returns each match with its resourceName and etag. Use it to resolve a name, email or phone fragment into a resourceName before an update or delete; use List Contacts to enumerate everything instead. Matching is prefix-only ("foo n" matches "foo name", "oo n" does not) and capped at 30 results. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Plain-text query prefix-matched against contact fields such as name, email and phone number. |
| `pageSize` | number | no |  | Page Size. Number of results to return, maximum 30. Defaults to 30. |

Output fields:

- `results`: Matching Contacts
- `results[].resourceName`: Resource Name
- `results[].etag`: ETag
- `results[].displayName`: Display Name
- `results[].givenName`: First Name
- `results[].familyName`: Last Name
- `results[].emails`: Email Addresses
- `results[].phoneNumbers`: Phone Numbers
- `results[].company`: Company
- `results[].jobTitle`: Job Title
- `results[].updateTime`: Last Updated (datetime)
- `count`: Count (number)

### `get_contact`

**Get Contact.** Reads one Google Contacts person by its opaque resourceName (people/{id}) and returns names, emails, phone numbers, organizations, memberships and the current etag. Obtain the resourceName from List Contacts or Search Contacts; do not construct or parse it. Use Batch Get Contacts for more than one contact. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resourceName` | string | yes |  | Resource Name. Opaque contact resource name such as people/c12345. Resolve it with List Contacts or Search Contacts. |

Output fields:

- `resourceName`: Resource Name
- `etag`: ETag
- `names`: Names
- `names[].displayName`: Display Name
- `names[].givenName`: First Name
- `names[].middleName`: Middle Name
- `names[].familyName`: Last Name
- `names[].displayNameLastFirst`: Display Name (Last, First)
- `names[].unstructuredName`: Unstructured Name
- `names[].metadata.primary`: Primary (boolean)
- `emailAddresses`: Email Addresses
- `emailAddresses[].value`: Email Address (email)
- `emailAddresses[].metadata.primary`: Primary (boolean)
- `phoneNumbers`: Phone Numbers
- `phoneNumbers[].value`: Phone Number
- `phoneNumbers[].canonicalForm`: Canonical Form
- `phoneNumbers[].metadata.primary`: Primary (boolean)
- `nicknames`: Nicknames
- `nicknames[].value`: Nickname
- `nicknames[].metadata.primary`: Primary (boolean)
- `biographies`: Notes
- `biographies[].value`: Notes
- `biographies[].contentType`: Content Type
- `biographies[].metadata.primary`: Primary (boolean)
- `organizations`: Organizations
- `organizations[].name`: Company
- `organizations[].title`: Job Title
- `organizations[].metadata.primary`: Primary (boolean)
- `photos`: Photos
- `photos[].url`: Photo URL (image)
- `photos[].default`: Is Placeholder (boolean)
- `photos[].metadata.primary`: Primary (boolean)
- `memberships`: Group Memberships
- `memberships[].contactGroupMembership.contactGroupId`: Contact Group ID
- `memberships[].contactGroupMembership.contactGroupResourceName`: Contact Group Resource Name
- `metadata`: Metadata
- `metadata.objectType`: Object Type
- `metadata.sources`: Sources
- `metadata.sources[].type`: Source Type
- `metadata.sources[].id`: Source ID
- `metadata.sources[].updateTime`: Last Updated (datetime)

### `list_contacts`

**List Contacts.** Lists the connected account contacts with the resourceName and etag every write action needs, plus display name, emails, phone numbers and organization. Use this to resolve a person name to a resourceName before Update Contact Fields, Delete Contact or group membership changes; use Search Contacts when you already have a query string. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `maxResults` | number | no |  | Max Results. Maximum number of contacts to return. Defaults to 200. |

Output fields:

- `contacts`: Contacts
- `contacts[].resourceName`: Resource Name
- `contacts[].etag`: ETag
- `contacts[].displayName`: Display Name
- `contacts[].givenName`: First Name
- `contacts[].familyName`: Last Name
- `contacts[].emails`: Email Addresses
- `contacts[].phoneNumbers`: Phone Numbers
- `contacts[].company`: Company
- `contacts[].jobTitle`: Job Title
- `contacts[].updateTime`: Last Updated (datetime)
- `count`: Count (number)
- `hasMore`: Has More (boolean)

### `delete_contact`

**Delete Contact.** Permanently deletes one Google Contacts person by its opaque resourceName (people/{id}). Irreversible — the People API has no trash, so confirm the contact with Get Contact or List Contacts first; use Batch Delete Contacts for many at once. Not idempotent: a repeat call fails because the contact is already gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resourceName` | string | yes |  | Resource Name. Opaque contact resource name such as people/c12345. Resolve it with List Contacts or Search Contacts. Deletion cannot be undone. |

Output fields:

- `deleted`: Deleted (boolean)
- `resourceName`: Resource Name

### `batch_get_contacts`

**Batch Get Contacts.** Reads up to 200 Google Contacts people in one call from a list of opaque resourceNames and returns each full contact with its current etag, split into succeeded and failed collections. Use it instead of repeated Get Contact calls, and as the input source for Batch Update Contacts. A whole-call success can still contain per-contact failures, so always read the failed collection. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resourceNames` | array | yes |  | Resource Names. Up to 200 opaque contact resource names such as people/c12345, resolved with List Contacts or Search Contacts. |

Output fields:

- `succeeded`: Contacts Read
- `succeeded[].resourceName`: Resource Name
- `succeeded[].contact`: Contact
- `succeeded[].contact.resourceName`: Resource Name
- `succeeded[].contact.etag`: ETag
- `succeeded[].contact.displayName`: Display Name
- `succeeded[].contact.givenName`: First Name
- `succeeded[].contact.familyName`: Last Name
- `succeeded[].contact.emails`: Email Addresses
- `succeeded[].contact.phoneNumbers`: Phone Numbers
- `succeeded[].contact.company`: Company
- `succeeded[].contact.jobTitle`: Job Title
- `succeeded[].contact.updateTime`: Last Updated (datetime)
- `succeeded[].person`: Full Person
- `succeeded[].person.resourceName`: Resource Name
- `succeeded[].person.etag`: ETag
- `succeeded[].person.names`: Names
- `succeeded[].person.names[].displayName`: Display Name
- `succeeded[].person.names[].givenName`: First Name
- `succeeded[].person.names[].middleName`: Middle Name
- `succeeded[].person.names[].familyName`: Last Name
- `succeeded[].person.names[].displayNameLastFirst`: Display Name (Last, First)
- `succeeded[].person.names[].unstructuredName`: Unstructured Name
- `succeeded[].person.names[].metadata.primary`: Primary (boolean)
- `succeeded[].person.emailAddresses`: Email Addresses
- `succeeded[].person.emailAddresses[].value`: Email Address (email)
- `succeeded[].person.emailAddresses[].metadata.primary`: Primary (boolean)
- `succeeded[].person.phoneNumbers`: Phone Numbers
- `succeeded[].person.phoneNumbers[].value`: Phone Number
- `succeeded[].person.phoneNumbers[].canonicalForm`: Canonical Form
- `succeeded[].person.phoneNumbers[].metadata.primary`: Primary (boolean)
- `succeeded[].person.nicknames`: Nicknames
- `succeeded[].person.nicknames[].value`: Nickname
- `succeeded[].person.nicknames[].metadata.primary`: Primary (boolean)
- `succeeded[].person.biographies`: Notes
- `succeeded[].person.biographies[].value`: Notes
- `succeeded[].person.biographies[].contentType`: Content Type
- `succeeded[].person.biographies[].metadata.primary`: Primary (boolean)
- `succeeded[].person.organizations`: Organizations
- `succeeded[].person.organizations[].name`: Company
- `succeeded[].person.organizations[].title`: Job Title
- `succeeded[].person.organizations[].metadata.primary`: Primary (boolean)
- `succeeded[].person.photos`: Photos
- `succeeded[].person.photos[].url`: Photo URL (image)
- `succeeded[].person.photos[].default`: Is Placeholder (boolean)
- `succeeded[].person.photos[].metadata.primary`: Primary (boolean)
- `succeeded[].person.memberships`: Group Memberships
- `succeeded[].person.memberships[].contactGroupMembership.contactGroupId`: Contact Group ID
- `succeeded[].person.memberships[].contactGroupMembership.contactGroupResourceName`: Contact Group Resource Name
- `succeeded[].person.metadata`: Metadata
- `succeeded[].person.metadata.objectType`: Object Type
- `succeeded[].person.metadata.sources`: Sources
- `succeeded[].person.metadata.sources[].type`: Source Type
- `succeeded[].person.metadata.sources[].id`: Source ID
- `succeeded[].person.metadata.sources[].updateTime`: Last Updated (datetime)
- `failed`: Failures
- `failed[].resourceName`: Resource Name
- `failed[].status`: Failure Reason
- `succeededCount`: Succeeded Count (number)
- `failedCount`: Failed Count (number)

### `batch_create_contacts`

**Batch Create Contacts.** Creates up to 200 new Google Contacts people in one call and returns the created contacts split into succeeded and failed collections. Use it instead of repeated Create Contact calls when importing a list; a whole-call success can still contain per-contact failures, so always read the failed collection. Not idempotent — every call creates new people, so a retry after a partial failure duplicates the ones that already succeeded. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contacts` | array | yes |  | Contacts. Up to 200 contacts to create. Each needs at least a name, an email or a phone number. Each item: { `firstName`?, `middleName`?, `lastName`?, `email`?, `phoneNumber`?, `company`?, `jobTitle`? }. |

Output fields:

- `succeeded`: Contacts Created
- `succeeded[].requestIndex`: Request Index (number)
- `succeeded[].resourceName`: Resource Name
- `succeeded[].contact`: Contact
- `succeeded[].contact.resourceName`: Resource Name
- `succeeded[].contact.etag`: ETag
- `succeeded[].contact.displayName`: Display Name
- `succeeded[].contact.givenName`: First Name
- `succeeded[].contact.familyName`: Last Name
- `succeeded[].contact.emails`: Email Addresses
- `succeeded[].contact.phoneNumbers`: Phone Numbers
- `succeeded[].contact.company`: Company
- `succeeded[].contact.jobTitle`: Job Title
- `succeeded[].contact.updateTime`: Last Updated (datetime)
- `failed`: Failures
- `failed[].requestIndex`: Request Index (number)
- `failed[].status`: Failure Reason
- `succeededCount`: Succeeded Count (number)
- `failedCount`: Failed Count (number)
- `requestedCount`: Requested Count (number)

### `batch_update_contacts`

**Batch Update Contacts.** Updates up to 200 Google Contacts people in one call. Feed it the full Person objects returned by Batch Get Contacts, each still carrying its own resourceName and etag, with the values you want changed edited in place. The people are grouped by which field groups they carry and one request is issued per group, so a person carrying only a phone number and a person carrying only an email can be updated together; each request uses the field mask of its own group. Within a group the mask is applied to every person in it, so never hand-build partial Person objects here — a group a person no longer carries is erased on that person. Prefer Update Contact Fields for a single contact. Because the work is split across requests, this action can partially apply: one group can be written while another is rejected outright. It therefore does not throw when a request fails — it records every contact in that request under failed and carries on. Never treat a returned result as wholesale success and never assume an absent error means everything applied; always read failed and failedCount, which also cover per-contact rejections such as stale etags. Every submitted person must carry at least one updatable field group. Before retrying, re-read the people so the already-updated ones carry fresh etags. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contacts` | JSON | yes |  | Contacts. JSON array of up to 200 full Person objects taken from Batch Get Contacts, each keeping its resourceName and etag, with the fields to change edited in place. |

Output fields:

- `succeeded`: Contacts Updated
- `succeeded[].resourceName`: Resource Name
- `succeeded[].contact`: Contact
- `succeeded[].contact.resourceName`: Resource Name
- `succeeded[].contact.etag`: ETag
- `succeeded[].contact.displayName`: Display Name
- `succeeded[].contact.givenName`: First Name
- `succeeded[].contact.familyName`: Last Name
- `succeeded[].contact.emails`: Email Addresses
- `succeeded[].contact.phoneNumbers`: Phone Numbers
- `succeeded[].contact.company`: Company
- `succeeded[].contact.jobTitle`: Job Title
- `succeeded[].contact.updateTime`: Last Updated (datetime)
- `succeeded[].person`: Full Person
- `succeeded[].person.resourceName`: Resource Name
- `succeeded[].person.etag`: ETag
- `succeeded[].person.names`: Names
- `succeeded[].person.names[].displayName`: Display Name
- `succeeded[].person.names[].givenName`: First Name
- `succeeded[].person.names[].middleName`: Middle Name
- `succeeded[].person.names[].familyName`: Last Name
- `succeeded[].person.names[].displayNameLastFirst`: Display Name (Last, First)
- `succeeded[].person.names[].unstructuredName`: Unstructured Name
- `succeeded[].person.names[].metadata.primary`: Primary (boolean)
- `succeeded[].person.emailAddresses`: Email Addresses
- `succeeded[].person.emailAddresses[].value`: Email Address (email)
- `succeeded[].person.emailAddresses[].metadata.primary`: Primary (boolean)
- `succeeded[].person.phoneNumbers`: Phone Numbers
- `succeeded[].person.phoneNumbers[].value`: Phone Number
- `succeeded[].person.phoneNumbers[].canonicalForm`: Canonical Form
- `succeeded[].person.phoneNumbers[].metadata.primary`: Primary (boolean)
- `succeeded[].person.nicknames`: Nicknames
- `succeeded[].person.nicknames[].value`: Nickname
- `succeeded[].person.nicknames[].metadata.primary`: Primary (boolean)
- `succeeded[].person.biographies`: Notes
- `succeeded[].person.biographies[].value`: Notes
- `succeeded[].person.biographies[].contentType`: Content Type
- `succeeded[].person.biographies[].metadata.primary`: Primary (boolean)
- `succeeded[].person.organizations`: Organizations
- `succeeded[].person.organizations[].name`: Company
- `succeeded[].person.organizations[].title`: Job Title
- `succeeded[].person.organizations[].metadata.primary`: Primary (boolean)
- `succeeded[].person.photos`: Photos
- `succeeded[].person.photos[].url`: Photo URL (image)
- `succeeded[].person.photos[].default`: Is Placeholder (boolean)
- `succeeded[].person.photos[].metadata.primary`: Primary (boolean)
- `succeeded[].person.memberships`: Group Memberships
- `succeeded[].person.memberships[].contactGroupMembership.contactGroupId`: Contact Group ID
- `succeeded[].person.memberships[].contactGroupMembership.contactGroupResourceName`: Contact Group Resource Name
- `succeeded[].person.metadata`: Metadata
- `succeeded[].person.metadata.objectType`: Object Type
- `succeeded[].person.metadata.sources`: Sources
- `succeeded[].person.metadata.sources[].type`: Source Type
- `succeeded[].person.metadata.sources[].id`: Source ID
- `succeeded[].person.metadata.sources[].updateTime`: Last Updated (datetime)
- `failed`: Failures
- `failed[].resourceName`: Resource Name
- `failed[].status`: Failure Reason
- `failed[].updateMask`: Field Groups Not Applied
- `succeededCount`: Succeeded Count (number)
- `failedCount`: Failed Count (number)
- `updateMasks`: Update Masks

### `batch_delete_contacts`

**Batch Delete Contacts.** Permanently deletes up to 500 Google Contacts people in one call from a list of opaque resourceNames. Irreversible and unrecoverable — the People API has no trash and there is no per-contact confirmation in the response, so verify every resourceName with Batch Get Contacts or List Contacts before calling and prefer Delete Contact when removing a single person. Not idempotent: a repeat call fails on contacts that are already gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resourceNames` | array | yes |  | Resource Names. Up to 500 opaque contact resource names such as people/c12345. Every listed contact is deleted permanently and cannot be restored. |

Output fields:

- `deleted`: Deleted (boolean)
- `resourceNames`: Resource Names
- `count`: Count (number)

### `update_contact_photo`

**Update Contact Photo.** Replaces the photo of one Google Contacts person with the supplied base64-encoded JPEG, PNG or WebP image. Supply the opaque resourceName from List Contacts or Search Contacts; use Delete Contact Photo to remove a photo instead. Safe to retry — re-sending the same bytes converges on the same photo. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resourceName` | string | yes |  | Resource Name. Opaque contact resource name such as people/c12345. Resolve it with List Contacts or Search Contacts. |
| `photoBytes` | string | yes |  | Photo Bytes. Base64-encoded JPEG, PNG or WebP image. A data URL prefix is accepted and stripped. |

Output fields:

- `resourceName`: Resource Name
- `etag`: ETag
- `names`: Names
- `names[].displayName`: Display Name
- `names[].givenName`: First Name
- `names[].middleName`: Middle Name
- `names[].familyName`: Last Name
- `names[].displayNameLastFirst`: Display Name (Last, First)
- `names[].unstructuredName`: Unstructured Name
- `names[].metadata.primary`: Primary (boolean)
- `emailAddresses`: Email Addresses
- `emailAddresses[].value`: Email Address (email)
- `emailAddresses[].metadata.primary`: Primary (boolean)
- `phoneNumbers`: Phone Numbers
- `phoneNumbers[].value`: Phone Number
- `phoneNumbers[].canonicalForm`: Canonical Form
- `phoneNumbers[].metadata.primary`: Primary (boolean)
- `nicknames`: Nicknames
- `nicknames[].value`: Nickname
- `nicknames[].metadata.primary`: Primary (boolean)
- `biographies`: Notes
- `biographies[].value`: Notes
- `biographies[].contentType`: Content Type
- `biographies[].metadata.primary`: Primary (boolean)
- `organizations`: Organizations
- `organizations[].name`: Company
- `organizations[].title`: Job Title
- `organizations[].metadata.primary`: Primary (boolean)
- `photos`: Photos
- `photos[].url`: Photo URL (image)
- `photos[].default`: Is Placeholder (boolean)
- `photos[].metadata.primary`: Primary (boolean)
- `memberships`: Group Memberships
- `memberships[].contactGroupMembership.contactGroupId`: Contact Group ID
- `memberships[].contactGroupMembership.contactGroupResourceName`: Contact Group Resource Name
- `metadata`: Metadata
- `metadata.objectType`: Object Type
- `metadata.sources`: Sources
- `metadata.sources[].type`: Source Type
- `metadata.sources[].id`: Source ID
- `metadata.sources[].updateTime`: Last Updated (datetime)

### `delete_contact_photo`

**Delete Contact Photo.** Removes the photo from one Google Contacts person, leaving the rest of the contact untouched. Supply the opaque resourceName from List Contacts or Search Contacts; use Update Contact Photo to set a new image instead. The removed image is not recoverable through this API. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resourceName` | string | yes |  | Resource Name. Opaque contact resource name such as people/c12345. Resolve it with List Contacts or Search Contacts. |

Output fields:

- `resourceName`: Resource Name
- `etag`: ETag
- `names`: Names
- `names[].displayName`: Display Name
- `names[].givenName`: First Name
- `names[].middleName`: Middle Name
- `names[].familyName`: Last Name
- `names[].displayNameLastFirst`: Display Name (Last, First)
- `names[].unstructuredName`: Unstructured Name
- `names[].metadata.primary`: Primary (boolean)
- `emailAddresses`: Email Addresses
- `emailAddresses[].value`: Email Address (email)
- `emailAddresses[].metadata.primary`: Primary (boolean)
- `phoneNumbers`: Phone Numbers
- `phoneNumbers[].value`: Phone Number
- `phoneNumbers[].canonicalForm`: Canonical Form
- `phoneNumbers[].metadata.primary`: Primary (boolean)
- `nicknames`: Nicknames
- `nicknames[].value`: Nickname
- `nicknames[].metadata.primary`: Primary (boolean)
- `biographies`: Notes
- `biographies[].value`: Notes
- `biographies[].contentType`: Content Type
- `biographies[].metadata.primary`: Primary (boolean)
- `organizations`: Organizations
- `organizations[].name`: Company
- `organizations[].title`: Job Title
- `organizations[].metadata.primary`: Primary (boolean)
- `photos`: Photos
- `photos[].url`: Photo URL (image)
- `photos[].default`: Is Placeholder (boolean)
- `photos[].metadata.primary`: Primary (boolean)
- `memberships`: Group Memberships
- `memberships[].contactGroupMembership.contactGroupId`: Contact Group ID
- `memberships[].contactGroupMembership.contactGroupResourceName`: Contact Group Resource Name
- `metadata`: Metadata
- `metadata.objectType`: Object Type
- `metadata.sources`: Sources
- `metadata.sources[].type`: Source Type
- `metadata.sources[].id`: Source ID
- `metadata.sources[].updateTime`: Last Updated (datetime)

### `list_contact_groups`

**List Contact Groups.** Lists the contact groups (labels) of the connected Google account with the opaque resourceName, name, type and member count of each. Use it to resolve a group name to its resourceName before Get Contact Group, Update Contact Group, Delete Contact Group or Add Or Remove Contact Group Members. Member resource names are not included here — read a single group with Get Contact Group for those. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `contactGroups`: Contact Groups
- `contactGroups[].resourceName`: Resource Name
- `contactGroups[].etag`: ETag
- `contactGroups[].name`: Name
- `contactGroups[].formattedName`: Formatted Name
- `contactGroups[].groupType`: Group Type
- `contactGroups[].memberCount`: Member Count (number)
- `contactGroups[].memberResourceNames`: Member Resource Names
- `count`: Count (number)
- `hasMore`: Has More (boolean)

### `get_contact_group`

**Get Contact Group.** Reads one Google Contacts group by its opaque resourceName (contactGroups/{id}) and returns its name, type, member count and, when Max Members is above zero, the resource names of its members. Resolve the resourceName with List Contact Groups; use Batch Get Contact Groups for several groups. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resourceName` | string | yes |  | Resource Name. Opaque contact group resource name such as contactGroups/abc123, or a system group like contactGroups/myContacts. Resolve it with List Contact Groups. |
| `maxMembers` | number | no |  | Max Members. How many member resource names to return. Defaults to 0, which returns none. |

Output fields:

- `resourceName`: Resource Name
- `etag`: ETag
- `name`: Name
- `formattedName`: Formatted Name
- `groupType`: Group Type
- `memberCount`: Member Count (number)
- `memberResourceNames`: Member Resource Names

### `batch_get_contact_groups`

**Batch Get Contact Groups.** Reads up to 200 Google Contacts groups in one call from a list of opaque resourceNames, returning succeeded and failed collections. Use it instead of repeated Get Contact Group calls; a whole-call success can still contain per-group failures, so always read the failed collection. Resolve the resource names with List Contact Groups. Read-only and safe to retry. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resourceNames` | array | yes |  | Resource Names. Up to 200 opaque contact group resource names such as contactGroups/abc123, resolved with List Contact Groups. |
| `maxMembers` | number | no |  | Max Members. How many member resource names to return per group. Defaults to 0, which returns none. |

Output fields:

- `succeeded`: Contact Groups Read
- `succeeded[].resourceName`: Resource Name
- `succeeded[].etag`: ETag
- `succeeded[].name`: Name
- `succeeded[].formattedName`: Formatted Name
- `succeeded[].groupType`: Group Type
- `succeeded[].memberCount`: Member Count (number)
- `succeeded[].memberResourceNames`: Member Resource Names
- `failed`: Failures
- `failed[].resourceName`: Resource Name
- `failed[].status`: Failure Reason
- `succeededCount`: Succeeded Count (number)
- `failedCount`: Failed Count (number)

### `create_contact_group`

**Create Contact Group.** Creates a contact group (label) with the given name in the connected Google account, or returns the existing group when one already carries that name, reporting which happened through the created flag. Use it before Add Or Remove Contact Group Members when the target group may not exist yet. Safe to retry: the lookup runs first and a duplicate-name rejection is resolved by returning the existing group. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Group Name. Name of the contact group to find or create. |

Output fields:

- `created`: Created (boolean)
- `contactGroup`: Contact Group
- `contactGroup.resourceName`: Resource Name
- `contactGroup.etag`: ETag
- `contactGroup.name`: Name
- `contactGroup.formattedName`: Formatted Name
- `contactGroup.groupType`: Group Type
- `contactGroup.memberCount`: Member Count (number)
- `contactGroup.memberResourceNames`: Member Resource Names

### `update_contact_group`

**Update Contact Group.** Renames one user-created Google Contacts group identified by its opaque resourceName (contactGroups/{id}). It reads the group first to resolve the required etag and sends an explicit name-only field mask, so members and other group data are untouched. Resolve the resourceName with List Contact Groups; Google-managed system groups cannot be renamed. Safe to retry: re-applying the same name converges, and a concurrent edit surfaces as a re-read-and-retry error. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resourceName` | string | yes |  | Resource Name. Opaque contact group resource name such as contactGroups/abc123. Resolve it with List Contact Groups. |
| `name` | string | yes |  | New Group Name. |

Output fields:

- `resourceName`: Resource Name
- `etag`: ETag
- `name`: Name
- `formattedName`: Formatted Name
- `groupType`: Group Type
- `memberCount`: Member Count (number)
- `memberResourceNames`: Member Resource Names

### `delete_contact_group`

**Delete Contact Group.** Deletes one user-created Google Contacts group by its opaque resourceName (contactGroups/{id}). By default only the group is removed and its members stay in the address book; turning on Delete Contacts also permanently deletes every contact in the group, which cannot be undone. Resolve the resourceName with List Contact Groups; Google-managed system groups cannot be deleted. Not idempotent: a repeat call fails because the group is already gone. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resourceName` | string | yes |  | Resource Name. Opaque contact group resource name such as contactGroups/abc123. Resolve it with List Contact Groups. |
| `deleteContacts` | boolean | no | `false` | Also Delete Contacts. When enabled, every contact in the group is permanently deleted as well. Leave off to remove only the group. |

Output fields:

- `deleted`: Deleted (boolean)
- `resourceName`: Resource Name
- `deletedContacts`: Contacts Also Deleted (boolean)

### `modify_contact_group_members`

**Add Or Remove Contact Group Members.** Adds contacts to a Google Contacts group and removes contacts from it in one call, taking opaque people/{id} resource names resolved with List Contacts or Search Contacts and a contactGroups/{id} group resolved with List Contact Groups. Additions are accepted by user-created groups and by the system groups contactGroups/myContacts and contactGroups/starred only; other system groups accept removals only. Combined additions and removals are capped at 1000, and the response reports contacts that were not found. Safe to retry — re-applying the same membership changes converges. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `resourceName` | string | yes |  | Contact Group Resource Name. Opaque contact group resource name such as contactGroups/abc123, contactGroups/myContacts or contactGroups/starred. Resolve it with List Contact Groups. |
| `resourceNamesToAdd` | array | no |  | Contacts To Add. Opaque contact resource names such as people/c12345 to add to the group. |
| `resourceNamesToRemove` | array | no |  | Contacts To Remove. Opaque contact resource names such as people/c12345 to remove from the group. |

Output fields:

- `resourceName`: Contact Group Resource Name
- `added`: Added Contacts
- `removed`: Removed Contacts
- `notFoundResourceNames`: Not Found Contacts
- `canNotRemoveLastContactGroupResourceNames`: Cannot Remove Last Group

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

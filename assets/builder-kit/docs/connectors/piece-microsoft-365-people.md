# Microsoft 365 People

Manage contacts in Microsoft 365 People

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-microsoft-365-people'
  version: '0.3.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> If you’d like to use your own custom Azure app instead of the default app, follow the [Azure app creation guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app#register-an-application),
> set the **Redirect URI** to {{redirectUrl}} and add the following **Microsoft Graph (Delegated) permissions** under **API permissions**:
> - Contacts.ReadWrite
> - offline_access

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cloud` | string | yes | `"login.microsoftonline.com"` | Cloud Environment. Select your Microsoft cloud environment. One of `"login.microsoftonline.com"`, `"login.microsoftonline.us"`. |

## Actions

### `createContact`

**Create a Contact.** Creates a new contact in the authenticated user's Microsoft 365 People (Outlook) address book, optionally placed in a chosen contact folder. Use when adding a person record with details like name, emails, phones, addresses, or company. Not idempotent: each call creates a separate contact even with identical input, so it can produce duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `displayName` | string | no |  | Display Name. |
| `givenName` | string | no |  | Given Name. |
| `middleName` | string | no |  | Middle Name. |
| `surname` | string | no |  | Surname. |
| `emailAddresses` | array | no |  | Email Addresses. Each item: { `address`, `name`? }. |
| `mobilePhone` | string | no |  | Mobile Phone. |
| `assistantName` | string | no |  | Assistant Name. |
| `birthday` | ISO date-time string | no |  | Birthday. |
| `businessStreet` | string | no |  | Business Street. |
| `businessCity` | string | no |  | Business City. |
| `businessState` | string | no |  | Business State. |
| `businessPostalCode` | string | no |  | Business Postal Code. |
| `businessCountryOrRegion` | string | no |  | Business Country or Region. |
| `children` | array | no |  | Children. Each item: { `name` }. |
| `companyName` | string | no |  | Company Name. |
| `department` | string | no |  | Department. |
| `homeStreet` | string | no |  | Home Street. |
| `homeCity` | string | no |  | Home City. |
| `homeState` | string | no |  | Home State. |
| `homePostalCode` | string | no |  | Home Postal Code. |
| `homeCountryOrRegion` | string | no |  | Home Country or Region. |
| `imAddresses` | array | no |  | Instant Messaging Addresses. Each item: { `address` }. |
| `initials` | string | no |  | Initials. |
| `jobTitle` | string | no |  | Job Title. |
| `manager` | string | no |  | Manager. |
| `nickName` | string | no |  | Nick Name. |
| `officeLocation` | string | no |  | Office Location. |
| `otherStreet` | string | no |  | Other Street. |
| `otherCity` | string | no |  | Other City. |
| `otherState` | string | no |  | Other State. |
| `otherPostalCode` | string | no |  | Other Postal Code. |
| `otherCountryOrRegion` | string | no |  | Other Country or Region. |
| `parentFolder` | string | no |  | Parent Folder. Select a parent folder. A value the product loads from the provider, such as an id; write the value itself. |
| `personalNotes` | string | no |  | Personal Notes. |
| `profession` | string | no |  | Profession. |
| `spouseName` | string | no |  | Spouse Name. |
| `title` | string | no |  | Title. |

### `deleteContact`

**Delete a Contact.** Permanently deletes a single contact from the authenticated user's Microsoft 365 People (Outlook) address book, identified by its contact ID. Use when removing a person record. The deletion is irreversible; repeating it for the same ID has no further effect since the contact no longer exists. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact. Select a Contact. A value the product loads from the provider, such as an id; write the value itself. |

### `updateContact`

**Update a Contact.** Updates fields of an existing Microsoft 365 People (Outlook) contact identified by its contact ID; only the properties you supply are changed (omitted fields are left untouched). Use to edit a known contact rather than create a new one. Not strictly idempotent because each call issues a fresh server-side write, though repeating with the same values yields the same end state. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | string | yes |  | Contact. Select a Contact. A value the product loads from the provider, such as an id; write the value itself. |
| `displayName` | string | no |  | Display Name. |
| `givenName` | string | no |  | Given Name. |
| `middleName` | string | no |  | Middle Name. |
| `surname` | string | no |  | Surname. |
| `emailAddresses` | array | no |  | Email Addresses. Each item: { `address`, `name`? }. |
| `mobilePhone` | string | no |  | Mobile Phone. |
| `assistantName` | string | no |  | Assistant Name. |
| `birthday` | ISO date-time string | no |  | Birthday. |
| `businessStreet` | string | no |  | Business Street. |
| `businessCity` | string | no |  | Business City. |
| `businessState` | string | no |  | Business State. |
| `businessPostalCode` | string | no |  | Business Postal Code. |
| `businessCountryOrRegion` | string | no |  | Business Country or Region. |
| `children` | array | no |  | Children. Each item: { `name` }. |
| `companyName` | string | no |  | Company Name. |
| `department` | string | no |  | Department. |
| `homeStreet` | string | no |  | Home Street. |
| `homeCity` | string | no |  | Home City. |
| `homeState` | string | no |  | Home State. |
| `homePostalCode` | string | no |  | Home Postal Code. |
| `homeCountryOrRegion` | string | no |  | Home Country or Region. |
| `imAddresses` | array | no |  | Instant Messaging Addresses. Each item: { `address` }. |
| `initials` | string | no |  | Initials. |
| `jobTitle` | string | no |  | Job Title. |
| `manager` | string | no |  | Manager. |
| `nickName` | string | no |  | Nick Name. |
| `officeLocation` | string | no |  | Office Location. |
| `otherStreet` | string | no |  | Other Street. |
| `otherCity` | string | no |  | Other City. |
| `otherState` | string | no |  | Other State. |
| `otherPostalCode` | string | no |  | Other Postal Code. |
| `otherCountryOrRegion` | string | no |  | Other Country or Region. |
| `parentFolder` | string | no |  | Parent Folder. Select a parent folder. A value the product loads from the provider, such as an id; write the value itself. |
| `personalNotes` | string | no |  | Personal Notes. |
| `profession` | string | no |  | Profession. |
| `spouseName` | string | no |  | Spouse Name. |
| `title` | string | no |  | Title. |

### `createContactFolder`

**Create a Contact Folder.** Creates a new contact folder in the authenticated user's Microsoft 365 People (Outlook) account, optionally nested under a chosen parent folder. Use when organizing contacts into a new grouping. Not idempotent: each call creates another folder even if one with the same name already exists. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `displayName` | string | yes |  | Contact Folder Name. |
| `parentFolder` | string | no |  | Parent Folder. Select a parent folder. A value the product loads from the provider, such as an id; write the value itself. |

### `getContactFolder`

**Get a Contact Folder.** Retrieves metadata for a single contact folder in the authenticated user's Microsoft 365 People (Outlook) account, identified by its folder ID. Use to look up a folder's details (such as its name) by ID. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactFolder` | string | yes |  | Contact Folder. Select a contact folder. A value the product loads from the provider, such as an id; write the value itself. |

### `searchContacts`

**Search Contacts.** Searches the authenticated user's Microsoft 365 People (Outlook) contacts and returns those matching a free-text search term across fields like name and email. Use to find a contact (e.g. to obtain its ID) before updating or deleting it; the search term is required. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchValue` | string | yes |  | Search Value. Find contacts by name, email, or other properties. |

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

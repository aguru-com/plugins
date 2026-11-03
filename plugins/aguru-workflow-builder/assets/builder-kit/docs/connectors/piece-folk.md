# Folk

Folk is a CRM for building relationships at scale. Manage your contacts, companies, and relationships in one place.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-folk'
  version: '0.1.8'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Folk API key. You can view and manage your API keys in your workspace settings under the "API" section at https://app.folk.app/apps/contacts/network/settings/api-keys

## Actions

### `createCompany`

**Create Company.** Creates a new company record in the Folk CRM, optionally attaching addresses, emails, phone numbers, URLs, an industry, and a group assignment. Use when a company does not yet exist in Folk; only the company name is required. Not idempotent: each call creates a separate company even with identical input, so guard against duplicates (e.g. search with Find Company first). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Company Name. The name of the company. |
| `description` | string | no |  | Description. A short description of the company. |
| `industry` | string | no |  | Industry. The industry the company operates in. |
| `addresses` | array | no |  | Addresses. Physical addresses for the company. The first address is primary. Each item: { `value` }. |
| `emails` | array | no |  | Emails. Email addresses for the company. The first email is primary. Each item: { `value` }. |
| `phones` | array | no |  | Phone Numbers. Phone numbers for the company. The first phone is primary. Each item: { `value` }. |
| `urls` | array | no |  | URLs. Website URLs for the company. The first URL is primary. Each item: { `value` }. |
| `groupId` | string | no |  | Group ID. Enter a Folk group ID (e.g., grp_abc123). Groups help you organize your contacts. A value the product loads from the provider, such as an id; write the value itself. |

### `updateCompany`

**Update Company.** Updates fields on an existing Folk company identified by its company ID; only the fields you supply are changed. Use when you already know the target company ID (look it up first with Find Company or Get Company). Not idempotent in general: re-running mutates the record on each call and supplied arrays such as emails or groups replace prior values, so resubmitting the same input is not guaranteed to be a no-op. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company. Select a company from your Folk workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Company Name. The name of the company. |
| `description` | string | no |  | Description. A short description of the company. |
| `industry` | string | no |  | Industry. The industry the company operates in. |
| `addresses` | array | no |  | Addresses. Physical addresses for the company. The first address is primary. Each item: { `value` }. |
| `emails` | array | no |  | Emails. Email addresses for the company. The first email is primary. Each item: { `value` }. |
| `phones` | array | no |  | Phone Numbers. Phone numbers for the company. The first phone is primary. Each item: { `value` }. |
| `urls` | array | no |  | URLs. Website URLs for the company. The first URL is primary. Each item: { `value` }. |
| `groupId` | string | no |  | Group ID. Enter a Folk group ID (e.g., grp_abc123). Groups help you organize your contacts. A value the product loads from the provider, such as an id; write the value itself. |

### `createPerson`

**Create Person.** Creates a new person (contact) record in the Folk CRM, optionally linking them to companies by ID or name, setting a job title and birthday, and adding emails, phones, addresses, URLs, and a group. Use to add a new contact when none exists; provide a name via first/last or full name. Not idempotent: each call creates a separate person, so check for existing contacts first to avoid duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | no |  | First Name. The first name of the person. |
| `lastName` | string | no |  | Last Name. The last name of the person. |
| `fullName` | string | no |  | Full Name. The full name of the person (alternative to first/last) |
| `description` | string | no |  | Description. A short description of the person. |
| `birthday` | string | no |  | Birthday. The birthday in YYYY-MM-DD format. |
| `jobTitle` | string | no |  | Job Title. The job title of the person. |
| `companyNames` | array | no |  | Company Names. The names of companies to associate with the person. The first company will be primary. Each item: { `value` }. |
| `companyIds` | array | no |  | Companies. Select companies to associate with the person. Values the product loads from the provider, such as ids; write an array of them. |
| `addresses` | array | no |  | Addresses. Physical addresses for the person. The first address is primary. Each item: { `value` }. |
| `emails` | array | no |  | Emails. Email addresses for the person. The first email is primary. Each item: { `value` }. |
| `phones` | array | no |  | Phone Numbers. Phone numbers for the person. The first phone is primary. Each item: { `value` }. |
| `urls` | array | no |  | URLs. Website URLs for the person. The first URL is primary. Each item: { `value` }. |
| `groupId` | string | no |  | Group ID. Enter a Folk group ID (e.g., grp_abc123). Groups help you organize your contacts. A value the product loads from the provider, such as an id; write the value itself. |

### `updatePerson`

**Update Person.** Updates fields on an existing Folk person identified by their person ID; only the fields you supply are changed, and supplied company names that do not yet exist are created. Use when you already know the target person ID (look it up first with List People or Get Person). Not idempotent in general: re-running mutates the record each call and supplied arrays replace prior values, so resubmitting the same input is not guaranteed to be a no-op. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `personId` | string | yes |  | Person. Select a person from your Folk workspace. A value the product loads from the provider, such as an id; write the value itself. |
| `firstName` | string | no |  | First Name. The first name of the person. |
| `lastName` | string | no |  | Last Name. The last name of the person. |
| `fullName` | string | no |  | Full Name. The full name of the person (alternative to first/last) |
| `description` | string | no |  | Description. A short description of the person. |
| `birthday` | string | no |  | Birthday. The birthday in YYYY-MM-DD format. |
| `jobTitle` | string | no |  | Job Title. The job title of the person. |
| `companyIds` | array | no |  | Companies. Select companies to associate with the person. Values the product loads from the provider, such as ids; write an array of them. |
| `companyNames` | array | no |  | Company Names. Company names to create or associate with. Companies will be created if they don't exist. Each item: { `value` }. |
| `addresses` | array | no |  | Addresses. Physical addresses for the person. The first address is primary. Each item: { `value` }. |
| `emails` | array | no |  | Emails. Email addresses for the person. The first email is primary. Each item: { `value` }. |
| `phones` | array | no |  | Phone Numbers. Phone numbers for the person. The first phone is primary. Each item: { `value` }. |
| `urls` | array | no |  | URLs. Website URLs for the person. The first URL is primary. Each item: { `value` }. |
| `groupId` | string | no |  | Group ID. Enter a Folk group ID (e.g., grp_abc123). Groups help you organize your contacts. A value the product loads from the provider, such as an id; write the value itself. |

### `findCompany`

**Find Company.** Searches the Folk CRM for companies matching a query string against company name or email, returning the matching companies. Use to resolve a company name or email into a company ID before updating or linking it. The search query is required. Read-only and idempotent: repeating the same query returns the same matches without side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Search Query. Enter company name or email to search for. |

### `getCompany`

**Get Company.** Fetches the full record of a single Folk company by its company ID. Use when you already have the company ID and need its current details; if you only have a name or email, find the ID first with Find Company. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyId` | string | yes |  | Company. Select a company from your Folk workspace. A value the product loads from the provider, such as an id; write the value itself. |

### `findPerson`

**List People.** Lists people (contacts) in the Folk CRM, returning a single cursor-paginated page. With no filters it returns all people; optional name and email filters (contains-match) combined by AND or OR narrow the results. Use to browse contacts or resolve a name/email into a person ID; pass the cursor to page through additional results. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `20` | Limit. The number of items to return (1-100) |
| `cursor` | string | no |  | Cursor. A cursor for pagination. Use the nextLink value from a previous response. |
| `combinator` | string | no | `"and"` | Filter Combinator. The logical operator to combine multiple filters. One of `"and"`, `"or"`. |
| `nameFilter` | string | no |  | Name Filter. Filter by person name (contains) |
| `emailFilter` | string | no |  | Email Filter. Filter by email address (contains) |

### `getPerson`

**Get Person.** Fetches the full record of a single Folk person (contact) by their person ID. Use when you already have the person ID and need their current details; if you only have a name or email, find the ID first with List People. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `personId` | string | yes |  | Person. Select a person from your Folk workspace. A value the product loads from the provider, such as an id; write the value itself. |

# SimplyBook.me

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-simplybookme'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Enter your Simplybook admin credentials to access the Admin API.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `companyLogin` | string | yes |  | Company Login. Your Simplybook company login (e.g., "yourcompany" from yourcompany.simplybook.me) |
| `userLogin` | string | yes |  | User Login. Your admin user login associated with the company. |
| `userPassword` | string | yes |  | User Password. Your admin user password. |

## Actions

### `create_booking`

**Create Booking.** Books a new appointment in SimplyBook.me for a given service, provider, and client across a start/end date-time window. Use to schedule a single appointment, a group batch (via count), or to append to an existing batch (via batchId) — count and batchId are mutually exclusive. The requested slot must be available and aligned to the company timeframe or the call throws. Not idempotent: each call creates a new booking. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `eventId` | string | yes |  | Service. Select a service. A value the product loads from the provider, such as an id; write the value itself. |
| `unitId` | string | yes |  | Provider. Select a service provider. A value the product loads from the provider, such as an id; write the value itself. |
| `clientId` | string | yes |  | Client. Select a client. A value the product loads from the provider, such as an id; write the value itself. |
| `startDate` | string | yes |  | Start Date. Booking start date (format: YYYY-MM-DD, e.g., 2024-03-01) |
| `startTime` | string | yes |  | Start Time. Booking start time (format: HH:MM:SS, e.g., 09:00:00). Must be multiple of company timeframe. |
| `endDate` | string | yes |  | End Date. Booking end date (format: YYYY-MM-DD, e.g., 2024-03-01). Should be later than start date. |
| `endTime` | string | yes |  | End Time. Booking end time (format: HH:MM:SS, e.g., 10:00:00). Should be later than start time. |
| `clientTimeOffset` | number | no | `0` | Client Time Offset (seconds). Difference between company and client time zone in seconds (e.g., -3600 for GMT+3 client with GMT+2 company) |
| `additionalFields` | JSON | no |  | Additional Fields. Additional params and fields as object (e.g., {"promocode": "CODE123", "location_id": "1"}). Use for promo codes, location ID, intake forms. |
| `count` | number | no | `1` | Count. Number of bookings for group booking batch (min. 1). Cannot be used with Batch ID. |
| `batchId` | number | no |  | Batch ID. Add booking to existing group bookings batch. Cannot be used with Count > 1. |
| `recurringData` | JSON | no |  | Recurring Data. Make booking recurrent (optional, array format) |

### `create_booking_comment`

**Set Booking Comment.** Sets (overwrites) the admin comment text on an existing booking in SimplyBook.me, identified by its booking ID. Use to attach or update an internal note on an appointment. Idempotent: re-sending the same booking ID and comment leaves the comment in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bookingId` | string | yes |  | Booking. Select a booking. A value the product loads from the provider, such as an id; write the value itself. |
| `comment` | string | yes |  | Comment. The comment text to set for the booking. |

### `create_client`

**Add Client.** Creates a new client record in SimplyBook.me from a name plus optional contact and address fields. Use when an agent needs a client to attach to a booking and the person does not yet exist (look them up with Get Client List first). Email, phone, or both may be required by company settings. Not idempotent: each call adds a new client even with identical data. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Client name. |
| `email` | string | no |  | Email. Client email address. |
| `phone` | string | no |  | Phone. Client phone number (e.g., +1502-810-4521) |
| `address1` | string | no |  | Address Line 1. Client address line 1. |
| `address2` | string | no |  | Address Line 2. Client address line 2. |
| `city` | string | no |  | City. Client city. |
| `zip` | string | no |  | ZIP Code. Client ZIP/postal code. |
| `countryId` | string | no |  | Country ID. Client country ID. |

### `create_note`

**Create Note.** Creates a calendar note in SimplyBook.me over a start/end date-time window, scoped by mode (service, provider, or all) and an optional provider and service, and can optionally block that time. Use to add an admin annotation or to reserve/block time on the calendar. Not idempotent: each call adds a new note. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `startDateTime` | string | yes |  | Start Date Time. Note start date and time (format: YYYY-MM-DD HH:MM:SS) |
| `endDateTime` | string | yes |  | End Date Time. Note end date and time (format: YYYY-MM-DD HH:MM:SS) |
| `noteTypeId` | string | yes |  | Note Type. Select a note type. A value the product loads from the provider, such as an id; write the value itself. |
| `note` | string | yes |  | Note. Note body/content. |
| `mode` | string | yes |  | Mode. Note mode - determines visibility scope. One of `"service"`, `"provider"`, `"all"`. |
| `timeBlocked` | boolean | no | `true` | Time Blocked. Whether the time should be blocked. |
| `providerId` | string | no |  | Provider. Select a provider (optional) A value the product loads from the provider, such as an id; write the value itself. |
| `serviceId` | string | no |  | Service. Select a service (optional) A value the product loads from the provider, such as an id; write the value itself. |

### `create_detailed_report`

**Create Detailed Report.** Generates a detailed admin report of bookings, metrics, and revenue in SimplyBook.me over an optional date range, with filters for service, provider, client, booking code, and cancelled vs. non-cancelled bookings. Use to pull analytics or export selected columns; leaving filters empty returns the broadest result set. Idempotent: it only reads and aggregates existing data, so repeating the same query returns the same report without side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `createdDateFrom` | string | no |  | Created Date From. Filter by booking creation date from (format: YYYY-MM-DD) |
| `createdDateTo` | string | no |  | Created Date To. Filter by booking creation date to (format: YYYY-MM-DD) |
| `dateFrom` | string | no |  | Date From. Filter by booking date from (format: YYYY-MM-DD) |
| `dateTo` | string | no |  | Date To. Filter by booking date to (format: YYYY-MM-DD) |
| `code` | string | no |  | Booking Code. Filter by booking code. |
| `eventId` | number | no |  | Service ID. Filter by service ID. |
| `unitGroupId` | number | no |  | Service Provider ID. Filter by service provider ID. |
| `clientId` | number | no |  | Client ID. Filter by client ID. |
| `bookingType` | string | no |  | Booking Type. Filter by booking type. One of `"non_cancelled"`, `"cancelled"`. |
| `orderField` | string | no | `"record_date"` | Order Field. Field to order results by (e.g., record_date) |
| `orderDirection` | string | no | `"asc"` | Order Direction. Sort order direction. One of `"asc"`, `"desc"`. |
| `exportColumns` | JSON | no |  | Export Columns. Array of columns to export (leave empty for all columns) |

### `cancel_booking`

**Cancel Booking.** Cancels a single existing booking in SimplyBook.me, identified by its booking ID. Use to call off an appointment an agent or client no longer needs. Not idempotent: the underlying cancelBooking call changes booking state, and cancelling an already-cancelled or missing booking may fail. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bookingId` | string | yes |  | Booking. Select a booking. A value the product loads from the provider, such as an id; write the value itself. |

### `delete_client`

**Delete Client.** Permanently deletes a client record in SimplyBook.me, identified by its client ID. Use to remove a client an agent no longer needs; this is destructive and cannot be undone. Not idempotent: a repeat call on the same ID has no client left to delete and may error. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientId` | string | yes |  | Client. Select a client. A value the product loads from the provider, such as an id; write the value itself. |

### `find_booking`

**Get Bookings.** Lists bookings in SimplyBook.me, optionally narrowed by date/time range, provider, service, client, confirmation status, and booking type (e.g. all, cancelled, approved). Use to look up appointments or retrieve a booking ID for a follow-up action; leaving all filters empty returns the broadest list. Idempotent: read-only with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dateFrom` | string | no |  | Date From. Start date (format: YYYY-MM-DD, e.g., 2024-03-01) |
| `timeFrom` | string | no |  | Time From. Start time (format: HH:MM:SS, e.g., 09:00:00) |
| `dateTo` | string | no |  | Date To. End date (format: YYYY-MM-DD, e.g., 2024-03-31) |
| `timeTo` | string | no |  | Time To. End time (format: HH:MM:SS, e.g., 18:00:00) |
| `createdDateFrom` | string | no |  | Created Date From. Filter by creation date from (format: YYYY-MM-DD) |
| `createdDateTo` | string | no |  | Created Date To. Filter by creation date to (format: YYYY-MM-DD) |
| `unitGroupId` | string | no |  | Provider. Get bookings for a specific service provider (optional) A value the product loads from the provider, such as an id; write the value itself. |
| `eventId` | string | no |  | Service. Get bookings for a specific service (optional) A value the product loads from the provider, such as an id; write the value itself. |
| `isConfirmed` | string | no |  | Is Confirmed. Filter by confirmation status. One of `1`, `0`. |
| `clientId` | string | no |  | Client. Get bookings for a specific client (optional) A value the product loads from the provider, such as an id; write the value itself. |
| `order` | string | no |  | Order By. Sort order for results. One of `"date_start"`, `"date_start_asc"`, `"record_date"`. |
| `bookingType` | string | no |  | Booking Type. Filter by booking type (depends on Approve booking plugin status) One of `"all"`, `"cancelled"`, `"non_cancelled"`, `"cancelled_by_client"`, `"cancelled_by_admin"`, `"non_approved_yet"`, `"approved"`. |

### `find_client`

**Get Client List.** Lists clients of the SimplyBook.me company; an empty search string fetches all clients, while a non-empty value filters by phone, email, or name. Use to find a client or retrieve a client ID before booking, deleting, or filtering reports. Idempotent: read-only search with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `searchString` | string | no |  | Search String. Search by phone number, email address, or name. Leave empty to get all clients. |
| `limit` | number | no |  | Limit. Maximum number of clients to return. Leave empty for no limit. |

### `find_invoice`

**Find Invoice.** Lists invoices/orders in SimplyBook.me with pagination and optional filters for client, date-time range, status, and booking code. Use to look up billing records or retrieve an invoice for a client or appointment; leaving filters empty returns the broadest paged list. Idempotent: read-only with no side effects. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `page` | number | no | `1` | Page. Page number in the list. |
| `onPage` | number | no | `25` | Items Per Page. Number of items per page. |
| `clientId` | string | no |  | Client. Filter by client (optional) A value the product loads from the provider, such as an id; write the value itself. |
| `datetimeFrom` | string | no |  | Date Time From. Order/invoice date and time from (format: YYYY-MM-DD HH:MM:SS) |
| `datetimeTo` | string | no |  | Date Time To. Order/invoice date and time to (format: YYYY-MM-DD HH:MM:SS) |
| `status` | string | no |  | Status. Order/invoice status. |
| `bookingCode` | string | no |  | Booking Code. Filter by booking code. |

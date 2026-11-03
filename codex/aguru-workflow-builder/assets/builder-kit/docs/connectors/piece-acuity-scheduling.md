# Acuity Scheduling

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-acuity-scheduling'
  version: '0.2.1'
```

Categories: PRODUCTIVITY, SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `add_blocked_time`

**Add Blocked Off Time.** Marks a time range on a specific Acuity calendar as unavailable for booking, optionally with notes. Use to reserve or hold off slots (e.g. breaks, holidays). Requires start time, end time, and a numeric calendar ID; end must be after start. Not idempotent — each call creates a new block. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `start` | ISO date-time string | yes |  | Start Time. The start date and time for the block (ISO 8601 format). |
| `end` | ISO date-time string | yes |  | End Time. The end date and time for the block (ISO 8601 format). |
| `calendarID` | string | yes |  | Calendar ID. The numeric ID of the calendar to add this block to. A value the product loads from the provider, such as an id; write the value itself. |
| `notes` | string | no |  | Notes. Optional notes for the blocked off time. |

### `create_appointment`

**Create Appointment.** Books a new appointment for a client on Acuity given a datetime, appointment type, and client name. Operates in two modes: standard booking enforces availability/attribute checks and auto-assigns a calendar, while admin booking (enable Book as Admin) bypasses those checks, allows setting notes, and requires a calendar ID. Use to schedule a client; not idempotent — each call creates a separate appointment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `datetime` | ISO date-time string | yes |  | DateTime. Date and time of the appointment. |
| `appointmentTypeID` | string | yes |  | Appointment Type. Select the type of appointment. A value the product loads from the provider, such as an id; write the value itself. |
| `firstName` | string | yes |  | First Name. Client's first name. |
| `lastName` | string | yes |  | Last Name. Client's last name. |
| `email` | string | no |  | Email. Client's email address. (Optional if booking as admin). |
| `phone` | string | no |  | Phone. Client's phone number. |
| `timezone` | string | yes | `"UTC"` | Timezone. Client's timezone (e.g., America/New_York). Required for accurate availability checking. |
| `adminBooking` | boolean | no | `false` | Book as Admin. Set to true to book as an admin. Disables availability/attribute validations, allows setting notes, and makes Calendar ID required. |
| `calendarID` | string | no |  | Calendar ID. Numeric ID of the calendar. Required if booking as admin. If not provided, Acuity tries to find an available calendar automatically for non-admin bookings. A value the product loads from the provider, such as an id; write the value itself. |
| `noEmail` | boolean | no | `false` | Suppress Confirmation Email/SMS. If true, confirmation emails or SMS will not be sent. |
| `certificate` | string | no |  | Certificate Code. Package or coupon certificate code. |
| `notes` | string | no |  | Notes. Appointment notes. Only settable if booking as admin. |
| `smsOptIn` | boolean | no | `false` | SMS Opt-In. Indicates whether the client has explicitly given permission to receive SMS messages. |
| `addonIDs` | array | no |  | Addons. Select addons for the appointment. Addons are filtered by selected Appointment Type if available. Values the product loads from the provider, such as ids; write an array of them. |
| `labelId` | string | no |  | Label. Apply a label to the appointment. The API currently supports one label. A value the product loads from the provider, such as an id; write the value itself. |

### `create_client`

**Create Client.** Creates a new client record in Acuity from a first and last name, with optional phone, email, and notes. Use to add a contact to the client list before or independent of booking. Not idempotent — repeating creates duplicate client records since there is no dedupe on identity. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | yes |  | First Name. Client's first name. |
| `lastName` | string | yes |  | Last Name. Client's last name. |
| `phone` | string | no |  | Phone. Client's phone number. |
| `email` | string | no |  | Email. Client's email address. |
| `notes` | string | no |  | Notes. Notes about the client. |

### `reschedule_appointment`

**Reschedule Appointment.** Moves an existing Acuity appointment (by numeric appointment ID) to a new datetime and timezone, optionally onto a different calendar. Admin reschedule bypasses availability checks. Use to change the time of an already-booked appointment rather than creating a new one. Treated as non-idempotent — repeating may resend rescheduling notifications and revalidate availability. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `id` | number | yes |  | Appointment ID. The ID of the appointment to reschedule. |
| `appointmentTypeID` | string | yes |  | Appointment Type. Select the type of appointment (used for finding new available slots). A value the product loads from the provider, such as an id; write the value itself. |
| `datetime` | ISO date-time string | yes |  | DateTime. New Date and time of the appointment. |
| `timezone` | string | yes | `"UTC"` | Timezone. Client's timezone (e.g., America/New_York). |
| `calendarID` | string | no |  | New Calendar ID. Numeric ID of the new calendar to reschedule to. If blank, stays on current calendar. Submit 0 to auto-assign. A value the product loads from the provider, such as an id; write the value itself. |
| `adminReschedule` | boolean | no | `false` | Reschedule as Admin. Set to true to reschedule as an admin. Disables availability validations. |
| `noEmail` | boolean | no | `false` | Suppress Rescheduling Email/SMS. If true, rescheduling emails or SMS will not be sent. |

### `update_client`

**Update Client.** Updates an existing Acuity client's details (name, email, phone, notes), identifying the client by their current first and last name (and optionally current phone to disambiguate). At least one new field must be supplied. Use to edit a known client rather than create one. Idempotent — applying the same field overwrites repeatedly yields the same client state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `currentFirstName` | string | yes |  | Current First Name (Identifier). The current first name of the client to update. |
| `currentLastName` | string | yes |  | Current Last Name (Identifier). The current last name of the client to update. |
| `currentPhone` | string | no |  | Current Phone (Identifier, Optional). The current phone number of the client to update. Helps identify the client if names are not unique. |
| `newFirstName` | string | no |  | New First Name. Client's new first name. Leave blank to keep current. |
| `newLastName` | string | no |  | New Last Name. Client's new last name. Leave blank to keep current. |
| `newEmail` | string | no |  | New Email. Client's new email address. Leave blank to keep current. |
| `newPhone` | string | no |  | New Phone. Client's new phone number. Leave blank to keep current. |
| `newNotes` | string | no |  | New Notes. New notes about the client. Leave blank to keep current. |

### `find_appointment`

**Find Appointment(s).** Searches Acuity appointments and returns matches with a found flag. Filter by client name/email/phone, date range, calendar, appointment type, and status (scheduled, canceled, or all); providing no filters fetches all appointments up to the result limit rather than a targeted match. Use to look up existing appointments or resolve an appointment ID. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | no |  | Client First Name. Filter appointments by client first name. |
| `lastName` | string | no |  | Client Last Name. Filter appointments by client last name. |
| `email` | string | no |  | Client Email. Filter appointments by client e-mail address. |
| `phone` | string | no |  | Client Phone. Filter appointments by client phone number. URL encode '+' if using country codes (e.g., %2B1234567890). |
| `minDate` | ISO date-time string | no |  | Min Date. Only get appointments on or after this date. |
| `maxDate` | ISO date-time string | no |  | Max Date. Only get appointments on or before this date. |
| `calendarID` | string | no |  | Calendar ID. Show only appointments on the calendar with this ID. A value the product loads from the provider, such as an id; write the value itself. |
| `appointmentTypeID` | string | no |  | Appointment Type. Show only appointments of this type. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no | `"scheduled"` | Appointment Status. Filter by appointment status. One of `"scheduled"`, `"canceled"`, `"all"`. |
| `maxResults` | number | no |  | Max Results. Maximum number of results to return (default 100). |
| `direction` | string | no | `"DESC"` | Sort Direction. Sort direction for the results. One of `"DESC"`, `"ASC"`. |

### `find_client`

**Find Client.** Searches the Acuity client list by a required search term matched against first name, last name, or phone number, returning matches with a found flag. Use to look up an existing client before booking or updating. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | yes |  | Search Term. Filter client list by first name, last name, or phone number. |

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

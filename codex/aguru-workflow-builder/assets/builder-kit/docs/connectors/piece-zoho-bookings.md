# Zoho Bookings

Zoho Bookings is an appointment scheduling software for managing bookings, services, and customer appointments.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-zoho-bookings'
  version: '0.1.8'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Connect your Zoho Bookings account using OAuth2

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location` | string | yes |  | Data Center. The data center location of your Zoho Bookings account. One of `"zoho.com"`, `"zoho.eu"`, `"zoho.in"`, `"zoho.com.au"`, `"zoho.jp"`, `"zoho.com.cn"`. |

## Actions

### `bookAppointment`

**Book Appointment.** Create a new appointment in a Zoho Bookings workspace for a given service, customer (name/email/phone), and start time. Assign the booking to exactly one of staff, resource, or group (the call fails if none is supplied). Not idempotent: each call books a separate appointment. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. Select the workspace for the appointment. A value the product loads from the provider, such as an id; write the value itself. |
| `service_id` | string | yes |  | Service. Select the service for which the appointment is booked. A value the product loads from the provider, such as an id; write the value itself. |
| `staff_id` | string | no |  | Staff. Select the staff member (use this OR resource_id OR group_id) A value the product loads from the provider, such as an id; write the value itself. |
| `resource_id` | string | no |  | Resource. Select the resource (use this OR staff_id OR group_id) A value the product loads from the provider, such as an id; write the value itself. |
| `group_id` | string | no |  | Group ID. The unique ID of the staff group for collective booking (use this OR staff_id OR resource_id) |
| `from_time` | ISO date-time string | yes |  | From Time. The starting time for the appointment (format: mm-dd-yyyy HH:mm:ss) |
| `to_time` | ISO date-time string | no |  | To Time. End time for resource booking (optional, format: dd-MMM-yyyy HH:mm:ss) |
| `timezone` | string | no |  | Timezone. The timezone for the appointment (optional) |
| `customer_name` | string | yes |  | Customer Name. Name of the customer. |
| `customer_email` | string | yes |  | Customer Email. Email address of the customer. |
| `customer_phone` | string | yes |  | Customer Phone. Phone number of the customer. |
| `notes` | string | no |  | Notes. Additional information about the appointment (optional) |
| `additional_fields` | JSON | no |  | Additional Fields. Additional customer details as JSON object (optional) |
| `cost_paid` | number | no |  | Cost Paid. Amount paid for the booking (optional) |

### `rescheduleAppointment`

**Reschedule Appointment.** Move an existing Zoho Bookings appointment, identified by its booking ID, to a new start time and/or reassign it to a different staff member or group. Supply at least one of new start time, staff, or group. Use the from/to time range only to look up the booking ID to act on. Not idempotent: it mutates the booking each time, though repeating with the same target is effectively a no-op once applied. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from_time` | ISO date-time string | yes |  | From Time. Start of the date range used to fetch existing bookings (to help you select the Booking ID to reschedule). Not sent to the reschedule API. Format: dd-MMM-yyyy HH:mm:ss. |
| `to_time` | ISO date-time string | no |  | To Time. End of the date range used to fetch existing bookings (optional). Not sent to the reschedule API. Format: dd-MMM-yyyy HH:mm:ss. |
| `booking_id` | string | yes |  | Appointment. Select the appointment to get details for. A value the product loads from the provider, such as an id; write the value itself. |
| `service_id` | string | no |  | Service (Optional). Select service to filter staff options. A value the product loads from the provider, such as an id; write the value itself. |
| `staff_id` | string | no |  | Staff. Select the staff to reschedule to (use this OR group_id OR start_time) A value the product loads from the provider, such as an id; write the value itself. |
| `group_id` | string | no |  | Group ID. The unique ID of the staff group to reschedule to (use this OR staff_id OR start_time) |
| `start_time` | ISO date-time string | yes |  | New Start Time. The new time to reschedule the appointment to (format: dd-MMM-yyyy HH:mm:ss, use this OR staff_id OR group_id) |

### `fetchAvailability`

**Fetch Availability.** Look up open appointment slots for a service in a Zoho Bookings workspace on a given date. Scope the lookup to exactly one of staff, group, or resource (the call fails if none is supplied). Use this before booking to find valid times. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `workspace_id` | string | yes |  | Workspace. Select the workspace to fetch availability for. A value the product loads from the provider, such as an id; write the value itself. |
| `service_id` | string | yes |  | Service. Select the service for which availability is to be fetched. A value the product loads from the provider, such as an id; write the value itself. |
| `staff_id` | string | no |  | Staff. Select the staff member (use this OR group_id OR resource_id) A value the product loads from the provider, such as an id; write the value itself. |
| `group_id` | string | no |  | Group ID. The unique ID of the staff group associated with the service (use this OR staff_id OR resource_id) |
| `resource_id` | string | no |  | Resource. Select the resource (use this OR staff_id OR group_id) A value the product loads from the provider, such as an id; write the value itself. |
| `selected_date` | ISO date-time string | yes |  | Selected Date. The date on which services are checked for availability (format: mm-dd-yyyy) |

### `getAppointmentDetails`

**Get Appointment Details.** Retrieve the full details of a single Zoho Bookings appointment by its booking ID. Use the from/to time range to locate the booking ID first. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from_time` | ISO date-time string | yes |  | From Time. The start time of the appointment (in ISO 8601 format) |
| `to_time` | ISO date-time string | no |  | To Time. The end time of the appointment (in ISO 8601 format) |
| `booking_id` | string | yes |  | Appointment. Select the appointment to get details for. A value the product loads from the provider, such as an id; write the value itself. |

### `cancelAppointment`

**Cancel Appointment.** Cancel an existing Zoho Bookings appointment identified by its booking ID. Use the from/to time range to locate the booking ID first. Not idempotent: it submits a status-change request each call, though re-cancelling an already-cancelled booking has no further effect. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `from_time` | ISO date-time string | yes |  | From Time. The starting time for the appointment (format: mm-dd-yyyy HH:mm:ss) |
| `to_time` | ISO date-time string | no |  | To Time. The ending time for the appointment (format: mm-dd-yyyy HH:mm:ss) |
| `booking_id` | string | yes |  | Appointment. Select the appointment to get details for. A value the product loads from the provider, such as an id; write the value itself. |

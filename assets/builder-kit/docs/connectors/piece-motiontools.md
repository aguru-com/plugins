# MotionTools

Digitize processes, boost efficiency and excite users with MotionTools, the operating system for fleet-based service providers.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-motiontools'
  version: '0.1.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Motiontools API Key

> API Key for authenticating with Motiontools. Refer https://help.motiontools.io/en/articles/10476909-create-an-api-key

## Actions

### `create1stopBooking`

**Create 1-stop Booking.** Creates a MotionTools hailing booking with a single stop (e.g. a one-off pickup or dropoff). Use when an agent needs to place a ride/delivery request at one location; supply the payment method (required) and optionally a scheduled time and the stop's coordinates/address/contact details. Not idempotent — each call submits a new booking. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `scheduled_at` | string | no |  | Scheduled At. Scheduled datetime (ISO 8601) for the booking (optional) |
| `payment_method` | string | yes |  | Payment Method. Payment method (e.g. cash, card) |
| `stop_type` | string | no |  | Stop Type. Type of stop (e.g. pickup, dropoff) |
| `stop_lat` | number | no |  | Latitude. Latitude for the stop (optional) |
| `stop_lng` | number | no |  | Longitude. Longitude for the stop (optional) |
| `stop_street` | string | no |  | Street. Street name for the stop (optional) |
| `stop_number` | string | no |  | Street Number. Street number for the stop (optional) |
| `stop_city` | string | no |  | City. City for the stop (optional) |
| `stop_country` | string | no |  | Country. Country for the stop (optional) |
| `stop_zip_code` | string | no |  | Postal Code. Postal code for the stop (optional) |
| `stop_additional_line` | string | no |  | Address Additional Line. Additional address line for the stop (optional) |
| `stop_location_name` | string | no |  | Location Name. Location name for the stop (optional) |
| `stop_first_name` | string | no |  | Contact First Name. Contact's first name at the stop (optional) |
| `stop_last_name` | string | no |  | Contact Last Name. Contact's last name at the stop (optional) |
| `stop_phone_number` | string | no |  | Contact Phone Number. Contact's phone number (optional) |
| `stop_email` | string | no |  | Contact Email. Contact's email (optional) |

### `create2stopBooking`

**Create 2-stop Booking.** Creates a MotionTools hailing booking with two stops, a pickup and a dropoff. Use when an agent needs a point-to-point ride or delivery (e.g. courier from origin to destination); supply the payment method (required) and optionally each stop's coordinates/address/contact details, a scheduled time, and metadata. Not idempotent — each call submits a new booking. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `scheduled_at` | string | no |  | Scheduled At. Scheduled datetime (ISO 8601) for the booking (optional) |
| `payment_method` | string | yes |  | Payment Method. Payment method (e.g. cash, card) |
| `additional_information` | string | no |  | Additional Information. Any extra notes for the booking (optional) |
| `metadata` | JSON | no |  | Metadata. Additional metadata for the booking (optional) |
| `stop1_type` | string | no |  | Stop 1 Type. |
| `stop1_metadata` | JSON | no |  | Stop 1 Metadata. |
| `stop1_lat` | number | no |  | Stop 1 Latitude. |
| `stop1_lng` | number | no |  | Stop 1 Longitude. |
| `stop1_street` | string | no |  | Stop 1 Street. |
| `stop1_number` | string | no |  | Stop 1 Street Number. |
| `stop1_city` | string | no |  | Stop 1 City. |
| `stop1_country` | string | no |  | Stop 1 Country. |
| `stop1_zip_code` | string | no |  | Stop 1 Postal Code. |
| `stop1_additional_line` | string | no |  | Stop 1 Address Additional Line. |
| `stop1_location_name` | string | no |  | Stop 1 Location Name. |
| `stop1_first_name` | string | no |  | Stop 1 Contact First Name. |
| `stop1_last_name` | string | no |  | Stop 1 Contact Last Name. |
| `stop1_phone_number` | string | no |  | Stop 1 Contact Phone. |
| `stop1_email` | string | no |  | Stop 1 Contact Email. |
| `stop2_type` | string | no |  | Stop 2 Type. |
| `stop2_metadata` | JSON | no |  | Stop 2 Metadata. |
| `stop2_lat` | number | no |  | Stop 2 Latitude. |
| `stop2_lng` | number | no |  | Stop 2 Longitude. |
| `stop2_street` | string | no |  | Stop 2 Street. |
| `stop2_number` | string | no |  | Stop 2 Street Number. |
| `stop2_city` | string | no |  | Stop 2 City. |
| `stop2_country` | string | no |  | Stop 2 Country. |
| `stop2_zip_code` | string | no |  | Stop 2 Postal Code. |
| `stop2_additional_line` | string | no |  | Stop 2 Address Additional Line. |
| `stop2_location_name` | string | no |  | Stop 2 Location Name. |
| `stop2_first_name` | string | no |  | Stop 2 Contact First Name. |
| `stop2_last_name` | string | no |  | Stop 2 Contact Last Name. |
| `stop2_phone_number` | string | no |  | Stop 2 Contact Phone. |
| `stop2_email` | string | no |  | Stop 2 Contact Email. |

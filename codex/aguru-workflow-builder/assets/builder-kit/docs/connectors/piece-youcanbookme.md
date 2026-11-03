# YouCanBookMe

YouCanBookMe is an online scheduling tool that helps you manage appointments and bookings efficiently.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-youcanbookme'
  version: '0.2.0'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: YouCanBookMe API Key

> Go to [app.youcanbookme.com](https://app.youcanbook.me/#/account/security/)

## Actions

### `create-profile`

**Create Profile.** Creates a new YouCanBookMe booking profile under a given account, setting properties such as title, subdomain, time zone, locale, and logo. Use when an agent needs to provision a fresh scheduling page. Requires the account ID and a profile title; not idempotent — each call creates a new profile. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountId` | string | yes |  | Account ID. |
| `title` | string | yes |  | Profile Title. The title of the profile. |
| `description` | string | no |  | Description. A description of the profile. |
| `subdomain` | string | no |  | Subdomain. The subdomain for the profile. |
| `timeZone` | string | no |  | Time Zone. The time zone for the profile (e.g., America/New_York) |
| `locale` | string | no |  | Locale. The locale for the profile (e.g., en-US) |
| `logo` | string | no |  | Logo URL. URL to the profile logo. |
| `accessCode` | string | no |  | Access Code. An access code for the profile. |

### `retrieveBookingById`

**Retrieve Booking by ID.** Looks up a single YouCanBookMe booking by its booking ID, optionally restricting the returned fields and the time zone times are displayed in. Use when an agent already has a booking ID and needs its details. Read-only and idempotent — repeating the call returns the same booking without side effects. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bookingId` | string | yes |  | Booking ID. The ID of the booking to retrieve. |
| `displayTimeZone` | string | no |  | Display Time Zone. The time zone to display times in (e.g., America/New_York) |
| `fields` | string | no |  | Fields. Comma-separated list of fields to return. Default: id,title,accountId,profileId,createdAt,startsAt,endsAt,location,tentative,timeZone,cancelled,numberOfSlots. |

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

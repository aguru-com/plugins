# Cloutly

Review Management Tool

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-cloutly'
  version: '0.2.0'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Please enter the API Key obtained from Cloutly.

## Actions

### `sendReviewInvite`

**Send Review Invite.** Sends a Cloutly review-invitation to a customer via email and/or SMS, scoped to a specific business and review campaign. Use to solicit a review from a customer after a purchase or interaction. Requires businessId and campaignId, plus at least one of email or phone number to deliver the invite; an optional delay defers sending by N days. Not idempotent — each call dispatches a new invite. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firstName` | string | yes |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `email` | string | no |  | Email. The email of the customer to send the invite to (required if Phone Number is empty) |
| `phoneNumber` | string | no |  | Phone Number. The phone number of the customer to send the invite to (required if Email is empty) |
| `sourceCustomerId` | string | no |  | Source Customer ID. |
| `businessId` | string | yes |  | Business ID. |
| `campaignId` | string | yes |  | Campaign ID. |
| `inviteDelayDays` | number | no |  | Invite Delay Days. The number of days to delay the invite (i.e send after X days) |
| `salesRepEmail` | string | no |  | Sales Rep Email. The email of the sales rep to associate the review and customer. |

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

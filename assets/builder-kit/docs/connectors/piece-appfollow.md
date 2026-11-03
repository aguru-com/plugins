# AppFollow

Appfollow helps to manage and improve app reviews and ratings.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-appfollow'
  version: '0.2.1'
```

Categories: BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Appfollow API Key

> To get your API Key:
>
> 1. Go to [Appfollow platform](https://watch.appfollow.io/apps/)
> 2. Sign up or log in to your account
> 3. Click on the "Integrations" from  the left sidebar
> 4. Navigate to the "API Dashboard" section
> 5. Create a new API token or the use existing one
> 6. Copy and save your API token

## Actions

### `addUser`

**Add user.** Creates a new user in the AppFollow account with a name, email, and role. Use to grant someone access to the account. Not idempotent: each call adds another user, so repeating it may create duplicates. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. Name of the user to be added. |
| `email` | string | yes |  | Email. Email of the user to be added. |
| `role` | string | yes |  | Role. Role of the user to be added. |

### `replyToReview`

**Reply to Review.** Posts a public reply to a specific app store review, identified by its review ID, for the selected application. Use to respond to user feedback in store reviews. Not idempotent: each call submits another reply. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `collection_id` | string | yes |  | Collection Name. Select the collection name. A value the product loads from the provider, such as an id; write the value itself. |
| `app_ext_id` | string | yes |  | Application. Select the application. A value the product loads from the provider, such as an id; write the value itself. |
| `fromDate` | ISO date-time string | yes |  | From Date. Start date for the reviews to reply to (eg. YYYY-MM-DD) |
| `toDate` | ISO date-time string | no |  | To Date. End date for the reviews to reply to (eg. YYYY-MM-DD) |
| `review_id` | string | yes |  | Review ID. Select the Review ID. A value the product loads from the provider, such as an id; write the value itself. |
| `answer_text` | string | yes |  | Answer Text. Text of the reply to the review. |

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

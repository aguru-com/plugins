# Beehiiv

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-beehiiv'
  version: '0.4.1'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your can obtain API key by naviating to **Settings->Workspace Settings-> API**.

## Actions

### `create_subscription`

**Create Subscription.** Adds a new subscriber (by email) to a beehiiv publication, optionally setting tier, UTM attribution, custom fields, and enrolling them into automations on creation. Use to subscribe someone to a newsletter. Requires the publication ID and email; not idempotent — each call creates a subscription, and re-running may produce duplicate or reactivated subscribers. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `publicationId` | string | yes |  | Publication. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. The email address of the new subscription. |
| `reactivate_existing` | boolean | no | `false` | Reactivate Existing. Whether to reactivate the subscription if they have already unsubscribed. Use only if the subscription is knowingly resubscribing. |
| `send_welcome_email` | boolean | no | `false` | Send Welcome Email. Whether to send the default welcome email to the subscription. |
| `utm_source` | string | no |  | UTM Source. The source of the subscription. |
| `utm_medium` | string | no |  | UTM Medium. The medium of the subscription. |
| `utm_campaign` | string | no |  | UTM Campaign. The acquisition campaign of the subscription. |
| `referring_site` | string | no |  | Referring Site. The website that the subscription was referred from. |
| `referral_code` | string | no |  | Referral Code. A subscription's referral_code to give them credit for the new subscription. |
| `tier` | string | no |  | Subscription Tier. The tier for this subscription. One of `"free"`, `"premium"`. |
| `custom_fields` | object | no |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |
| `stripe_customer_id` | string | no |  | Stripe Customer ID. The Stripe customer ID for this subscription. |
| `double_opt_override` | string | no |  | Double Opt-in Override. Override publication double-opt settings for this subscription. |
| `premium_tier_ids` | array | no |  | Premium Tier IDs. The IDs of the premium tiers this subscription is associated with. |
| `automation_ids` | string | no |  | Automation IDs. Enroll the subscription into automations after their subscription has been created. A value the product loads from the provider, such as an id; write the value itself. |

### `update_subscription`

**Update Subscription.** Updates an existing beehiiv subscription identified by publication ID and subscription ID — change its tier, Stripe customer ID, custom fields, or unsubscribe it from the publication. Use to modify or unsubscribe a known subscriber. Idempotent: repeating with the same fields yields the same end state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `publicationId` | string | yes |  | Publication. A value the product loads from the provider, such as an id; write the value itself. |
| `subscriptionId` | string | yes |  | Subscription ID. A value the product loads from the provider, such as an id; write the value itself. |
| `tier` | string | no |  | Subscription Tier. Set the tier for this subscription. One of `"free"`, `"premium"`. |
| `stripe_customer_id` | string | no |  | Stripe Customer ID. The Stripe Customer ID of the subscription. |
| `unsubscribe` | boolean | no |  | Unsubscribe. Whether to unsubscribe this subscription from the publication. |
| `custom_fields` | object | no |  | Custom Fields. An object whose fields depend on other inputs; the product shows them. |

### `delete_subscription`

**Delete Subscription.** Permanently deletes a subscription from a beehiiv publication, identified by publication ID and subscription ID. Use to remove a subscriber entirely (distinct from unsubscribing, which Update Subscription handles). Idempotent in effect — once deleted, repeating the call leaves the subscriber absent, though a subsequent call may error on the missing ID. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `publicationId` | string | yes |  | Publication. A value the product loads from the provider, such as an id; write the value itself. |
| `subscriptionId` | string | yes |  | Subscription ID. A value the product loads from the provider, such as an id; write the value itself. |

### `list_subscriptions`

**List Subscriptions.** Lists subscriptions for a beehiiv publication, optionally filtered by status (active, inactive, pending, etc.). Operates in two modes: when neither limit nor cursor is set it auto-paginates and returns every matching subscription; when a limit or cursor is provided it returns a single page with a next-cursor for manual pagination. Use to look up or enumerate subscribers. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `publicationId` | string | yes |  | Publication. A value the product loads from the provider, such as an id; write the value itself. |
| `status` | string | no |  | Status. Filter subscriptions by status. One of `"all"`, `"active"`, `"inactive"`, `"pending"`, `"validating"`, `"invalid"`. |
| `limit` | number | no |  | Limit. Number of subscriptions to return per page (1-100). |
| `cursor` | string | no |  | Cursor. Cursor token for fetching the next page of results. Leave empty to start from the beginning. |

### `add_subscription_to_automation`

**Add Subscription to Automation.** Enrolls an existing subscriber into a beehiiv automation journey for the given publication and automation ID. The subscriber can be identified either by email or by subscription ID — provide exactly one. Use to start a subscriber on an automation. Not idempotent: each call creates a new journey enrollment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `publicationId` | string | yes |  | Publication. A value the product loads from the provider, such as an id; write the value itself. |
| `automationId` | string | yes |  | Automation ID. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | no |  | Subscription Email. The email address of the subscription. Provide either Email or Subscription ID. |
| `subscription_id` | string | no |  | Subscription ID. A value the product loads from the provider, such as an id; write the value itself. |
| `double_opt_override` | string | no |  | Double Opt-in Override. Override publication double-opt settings for this subscription (e.g., "on"). |

### `list_automations`

**List Automations.** Lists the automations configured for a beehiiv publication. When neither page nor limit is set it auto-paginates and returns all automations; otherwise it returns the requested page. Use to discover automation IDs before enrolling subscribers. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `publicationId` | string | yes |  | Publication. A value the product loads from the provider, such as an id; write the value itself. |
| `limit` | number | no |  | Limit. A limit on the number of automations to be returned (1-100, default 10). |
| `page` | number | no |  | Page. The page number for pagination (default 1). |

### `list_posts`

**List Posts.** Lists posts for a beehiiv publication, filterable by audience (free/premium), platform (web/email), status (draft/confirmed/archived), and content tags, with optional expanded fields like stats or content. When neither page nor limit is set it auto-paginates and returns all matching posts; otherwise it returns the requested page. Use to find or enumerate newsletter posts. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `publicationId` | string | yes |  | Publication. A value the product loads from the provider, such as an id; write the value itself. |
| `expand` | array | no |  | Expand Results. Optionally expand the results by adding additional information. One of `"stats"`, `"free_web_content"`, `"free_email_content"`, `"free_rss_content"`, `"premium_web_content"`, `"premium_email_content"`. |
| `audience` | string | yes |  | Audience. One of `"all"`, `"free"`, `"premium"`. |
| `platform` | string | yes |  | Platform. One of `"all"`, `"web"`, `"email"`, `"both"`. |
| `status` | string | yes |  | Status. One of `"all"`, `"draft"`, `"confirmed"`, `"archived"`. |
| `content_tags` | array | no |  | Content Tags. Filter posts by content tags. Returns posts with ANY of the specified tags. |
| `limit` | number | no |  | Limit. Number of posts to return (1-100, default 10). |
| `page` | number | no |  | Page. Page number for pagination (default 1). |

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

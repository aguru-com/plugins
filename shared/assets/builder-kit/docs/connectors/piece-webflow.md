# Webflow

Design, build, and launch responsive websites visually

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-webflow'
  version: '0.3.0'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `create_collection_item`

**Create Collection Item.** Creates a new item in a Webflow CMS collection. Provide the collection ID and the field values (keyed by field slug); optionally mark the item as archived or draft. Use to add CMS content like blog posts or products. Each call creates a distinct item, so it is not idempotent. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `collection_id` | string | yes |  | Collection. A value the product loads from the provider, such as an id; write the value itself. |
| `collection_fields` | object | yes |  | Collection Fields. An object whose fields depend on other inputs; the product shows them. |
| `is_archived` | boolean | no |  | Is Archived. Whether the item is archived or not. |
| `is_draft` | boolean | no |  | Is Draft. Whether the item is a draft or not. |

### `delete_collection_item`

**Delete an item in a collection.** Permanently deletes a single item from a Webflow CMS collection, identified by collection ID and item ID. Use when an agent needs to remove existing CMS content. Repeating the call after the item is gone has no further effect, so it is effectively idempotent on the same item ID. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `collection_id` | string | yes |  | Collection. A value the product loads from the provider, such as an id; write the value itself. |
| `collection_item_id` | string | yes |  | Collection Item. A value the product loads from the provider, such as an id; write the value itself. |

### `update_collection_item`

**Update an item in a collection.** Updates an existing Webflow CMS collection item, identified by collection ID and item ID, overwriting the supplied field values (keyed by field slug) and the archived/draft flags. Use to edit existing CMS content. Idempotent: applying the same field values repeatedly yields the same item state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `collection_id` | string | yes |  | Collection. A value the product loads from the provider, such as an id; write the value itself. |
| `collection_item_id` | string | yes |  | Collection Item. A value the product loads from the provider, such as an id; write the value itself. |
| `collection_fields` | object | yes |  | Collection Fields. An object whose fields depend on other inputs; the product shows them. |
| `is_archived` | boolean | no |  | Is Archived. Whether the item is archived or not. |
| `is_draft` | boolean | no |  | Is Draft. Whether the item is a draft or not. |

### `find_collection_item`

**Find a Collection Item by Field.** Searches a Webflow CMS collection for items whose given field name exactly matches the supplied value, optionally capped by a max-results limit. Use to look up an item by a known field value (e.g. slug or name) before reading or updating it. Read-only and idempotent. Note: matching is an exact equality filter applied client-side over the fetched items, not a fuzzy or paginated server search. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `collection_id` | string | yes |  | Collection. A value the product loads from the provider, such as an id; write the value itself. |
| `field_name` | string | yes |  | Field Name. The name of the field to search by. |
| `field_value` | string | yes |  | Field Value. The value of the field to search for. |
| `max_results` | number | no |  | Max Results. The maximum number of results to return. |

### `get_collection_item`

**Get a Collection Item by ID.** Retrieves a single Webflow CMS collection item by its collection ID and item ID. Use when the agent already knows the item ID and needs its full field data; if the ID is unknown, find it first with Find a Collection Item by Field. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `collection_id` | string | yes |  | Collection. A value the product loads from the provider, such as an id; write the value itself. |
| `collection_item_id` | string | yes |  | Collection Item. A value the product loads from the provider, such as an id; write the value itself. |

### `fulfill_order`

**Fulfill an order.** Marks an existing Webflow Ecommerce order as fulfilled, identified by site ID and order ID, optionally sending the customer a fulfillment email. Use after shipping or completing an order. Setting fulfilled state is idempotent, but enabling the email may resend a notification, so prefer leaving it off when retrying. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `order_id` | string | yes |  | Order. A value the product loads from the provider, such as an id; write the value itself. |
| `send_order_fulfilled_email` | boolean | no |  | Send Order Fulfilled Email. Send an email to the customer that their order has been fulfilled. |

### `unfulfill_order`

**Unfulfill an order.** Reverts an existing Webflow Ecommerce order back to an unfulfilled state, identified by site ID and order ID. Use to undo a fulfillment marking. Idempotent: re-running on an already-unfulfilled order leaves it unfulfilled. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `order_id` | string | yes |  | Order. A value the product loads from the provider, such as an id; write the value itself. |

### `refund_order`

**Refund an order.** Issues a refund for an existing Webflow Ecommerce order, identified by site ID and order ID. Use to reverse a customer payment. This moves money and is not idempotent — repeating it risks duplicate refund attempts, so call it once per order. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `order_id` | string | yes |  | Order. A value the product loads from the provider, such as an id; write the value itself. |

### `find_order`

**Find an order.** Retrieves a single Webflow Ecommerce order by its site ID and order ID. Use to look up order details before fulfilling, refunding, or unfulfilling it. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `order_id` | string | yes |  | Order. A value the product loads from the provider, such as an id; write the value itself. |

### `publish_collection_item`

**Publish a Collection Item.** Publishes a Webflow CMS collection item live, identified by collection ID and item ID, so its current content goes to the live site. Use after creating or updating a draft item to make it public. Idempotent: re-publishing the same item again leaves it published. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |
| `collection_id` | string | yes |  | Collection. A value the product loads from the provider, such as an id; write the value itself. |
| `collection_item_id` | string | yes |  | Collection Item. A value the product loads from the provider, such as an id; write the value itself. |

### `list_sites`

**List Sites.** Lists all Webflow sites accessible to the authenticated account, returning their IDs and metadata. Use to discover a site ID needed by other actions (collections, orders, form-submission trigger). Read-only and idempotent; takes no input. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `list_collections`

**List Collections.** Lists all CMS collections within a given Webflow site, identified by site ID, returning their IDs and metadata. Use to discover a collection ID before reading, creating, or updating collection items. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `site_id` | string | yes |  | Site. A value the product loads from the provider, such as an id; write the value itself. |

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

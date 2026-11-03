# Paperform

No description.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-paperform'
  version: '0.2.0'
```

Categories: FORMS_AND_SURVEYS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your Paperform API key. You can find this in your Paperform dashboard under Settings > Developer.

## Actions

### `deleteFormSubmission`

**Delete Form Submission.** Permanently deletes a completed Paperform submission, identified by its submission ID, from the given form. Use to remove a finished response; the deletion is destructive and not idempotent since the record no longer exists on repeat calls. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `submissionId` | string | yes |  | Form Submission ID. |

### `deletePartialFormSubmission`

**Delete Partial Form Submission.** Permanently deletes a partial (in-progress, not yet completed) Paperform submission by its ID from the given form. Use to discard an abandoned draft response; this is destructive and not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `partialSubmissionId` | string | yes |  | Partial Submission ID. A value the product loads from the provider, such as an id; write the value itself. |

### `createFormCoupon`

**Create Form Coupon.** Creates a new discount coupon on a specified Paperform form, configured as either a fixed amount or a percentage discount (the discount type prop selects the mode and the matching amount/percentage is required). Use to add a promotional code to a form; each call creates a separate coupon, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `code` | string | yes |  | Coupon Code. |
| `enabled` | boolean | no | `true` | Enabled. Whether the coupon is enabled or not. |
| `target` | string | no |  | Target. The target of the coupon. One of `"price"`, `"subscription"`. |
| `discountType` | string | yes |  | Discount Type. Choose between amount or percentage discount. One of `"amount"`, `"percentage"`. |
| `discountAmount` | number | no |  | Discount Amount. |
| `discountPercentage` | number | no |  | Discount Percentage. |
| `expiresAt` | ISO date-time string | no |  | Expires At. The date and time when the coupon expires. |

### `updateFormCoupon`

**Update Form Coupon.** Updates an existing discount coupon on a Paperform form, identified by its coupon code, modifying only the supplied fields (enabled state, target, discount amount or percentage, expiry). Use to change coupon terms; repeating with the same input yields the same end state, so it is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `couponCode` | string | yes |  | Coupon. A value the product loads from the provider, such as an id; write the value itself. |
| `enabled` | boolean | no |  | Enabled. Whether the coupon is enabled or not. |
| `target` | string | no |  | Target. The target of the coupon. One of `"price"`, `"subscription"`. |
| `discountType` | string | no |  | Discount Type. Choose between amount or percentage discount. One of `"amount"`, `"percentage"`. |
| `discountAmount` | number | no |  | Discount Amount. |
| `discountPercentage` | number | no |  | Discount Percentage. |
| `expiresAt` | ISO date-time string | no |  | Expires At. The date and time when the coupon expires. |

### `deleteFormCoupon`

**Delete Form Coupon.** Permanently deletes a discount coupon, identified by its coupon code, from the specified Paperform form. Use to remove a promotional code; this is destructive and not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `couponCode` | string | yes |  | Coupon. A value the product loads from the provider, such as an id; write the value itself. |

### `createFormProduct`

**Create Form Product.** Creates a new purchasable product (name, SKU, price, optional quantity/min/max and image) on a product field of a specified Paperform form. Use to add an item to a form-based store; each call creates a separate product, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `productFieldKey` | string | yes |  | Product Field. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Product Name. |
| `sku` | string | yes |  | Product SKU. |
| `price` | number | yes |  | Product Price. |
| `quantity` | number | no |  | Quantity. Product quantity. |
| `minimum` | number | no |  | Minimum Quantity. |
| `maximum` | number | no |  | Maximum Quantity. |
| `discountable` | boolean | no | `false` | Discountable ?. |
| `imageUrl` | string | no |  | Image URL. URL of the product image. |
| `imageWidth` | number | no |  | Image Width. Width of the product image in pixels. |
| `imageHeight` | number | no |  | Image Height. Height of the product image in pixels (optional) |

### `updateFormProduct`

**Update Form Product.** Updates an existing product on a Paperform form, identified by its SKU, changing only the supplied fields (name, price, quantity, min/max, discountable, image). Use to modify a store item; repeating with the same input yields the same end state, so it is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `productSku` | string | yes |  | Product. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | no |  | Product Name. |
| `price` | number | no |  | Product Price. |
| `quantity` | number | no |  | Quantity. Product quantity. |
| `minimum` | number | no |  | Minimum Quantity. |
| `maximum` | number | no |  | Maximum Quantity. |
| `discountable` | boolean | no |  | Discountable ?. |
| `imageUrl` | string | no |  | Image URL. URL of the product image. |
| `imageWidth` | number | no |  | Image Width. Width of the product image in pixels. |
| `imageHeight` | number | no |  | Image Height. Height of the product image in pixels (optional). |

### `deleteFormProduct`

**Delete Form Product.** Permanently deletes a product, identified by its SKU, from the specified Paperform form. Use to remove a store item; this is destructive and not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. A value the product loads from the provider, such as an id; write the value itself. |
| `productSku` | string | yes |  | Product. A value the product loads from the provider, such as an id; write the value itself. |

### `createSpace`

**Create Space.** Creates a new Paperform space (a workspace/folder for organizing forms) with the given name. Use to set up a new container for forms; each call creates a separate space, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Space Name. |

### `updateSpace`

**Update Space.** Renames an existing Paperform space, identified by its space ID, to the supplied name. Use to update a workspace label; repeating with the same input yields the same end state, so it is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `spaceId` | string | yes |  | Space. A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Space Name. |

### `findFormProduct`

**Find Form Product.** Searches the products of a selected Paperform form by product name and returns matching products. Use to look up a product (e.g. to get its SKU) before updating or deleting it; this is a read-only search and is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `formId` | string | yes |  | Form. Select the form to search products in. A value the product loads from the provider, such as an id; write the value itself. |
| `search` | string | yes |  | Form Product Name. |

### `findForm`

**Find Form.** Searches the account's Paperform forms by title and returns matching forms. Use to resolve a form ID from its title before acting on it; this is a read-only search and is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | yes |  | Form Title. |

### `findSpace`

**Find Space.** Searches the account's Paperform spaces by name and returns matching spaces. Use to resolve a space ID from its name before updating it; this is a read-only search and is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | yes |  | Space Name. |

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

# Outseta

Triggers and actions for Outseta CRM and Billing

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-outseta'
  version: '0.3.2'
```

Categories: SALES_AND_CRM. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Outseta Admin API

> Connect Activepieces to your Outseta account using the Admin API.
>
> **To get your credentials:**
> 1. Log in to your Outseta account
> 2. Go to **Settings → Integrations → API**
> 3. Copy your **API Key** and **API Secret**
> 4. Your domain is your Outseta subdomain, e.g. `https://yourcompany.outseta.com`
>
> Need help? See [Outseta API docs](https://documenter.getpostman.com/view/3613332/outseta-rest-api-v1).

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `domain` | string | yes |  | Outseta Domain. Your full Outseta domain URL, e.g. https://yourcompany.outseta.com. |
| `apiKey` | string | yes |  | API Key. Found in Outseta → Settings → Integrations → API. |
| `apiSecret` | string | yes |  | API Secret. Found alongside your API Key in Outseta → Settings → Integrations → API. |

## Actions

### `get_account`

**Retrieve Account.** Fetches a single Outseta CRM account by its UID or by its primary contact email, returning core fields plus billing address, primary contact, and current subscription/plan/add-on details. Use to read an account by either identifier. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lookupBy` | string | yes | `"uid"` | Lookup by. How to find the account to retrieve. One of `"uid"`, `"email"`. |
| `accountUid` | string | no |  | Account UID. Used when "Lookup by" is set to Account UID. |
| `primaryContactEmail` | string | no |  | Primary contact email. Used when "Lookup by" is set to Primary contact email. The action will resolve the email to the linked account. |

### `get_person`

**Retrieve Person.** Fetches a single Outseta CRM person (contact) by email or by UID, returning identity, contact, and mailing-address fields plus the linked account. Use to read a person by either identifier. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lookupBy` | string | yes | `"email"` | Lookup by. How to find the person to retrieve. One of `"email"`, `"uid"`. |
| `email` | string | no |  | Email. Used when "Lookup by" is set to Email. |
| `personUid` | string | no |  | Person UID. Used when "Lookup by" is set to Person UID. |

### `get_deal`

**Retrieve Deal.** Fetches a single Outseta CRM deal by its UID, or by the contact email plus pipeline, returning amount, due date, pipeline stage, and the associated account. Use to read a deal by either identifier. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lookupBy` | string | yes | `"uid"` | Lookup by. How to find the deal to retrieve. One of `"uid"`, `"email"`. |
| `dealUid` | string | no |  | Deal UID. Used when "Lookup by" is set to Deal UID. |
| `contactEmail` | string | no |  | Contact Email. Used when "Lookup by" is set to Contact email + pipeline. |
| `pipelineUid` | string | no |  | Pipeline. Used when "Lookup by" is set to Contact email + pipeline. Required in that mode. A value the product loads from the provider, such as an id; write the value itself. |

### `get_subscription`

**Retrieve Subscription.** Fetches a subscription by its UID, or an account's current subscription by account UID, returning plan, billing term, renewal dates, discount, and add-ons. Use to read subscription/billing state; for account-level fields use Retrieve Account. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lookupBy` | string | yes | `"subscriptionUid"` | Lookup by. How to find the subscription to retrieve. One of `"subscriptionUid"`, `"accountUid"`. |
| `subscriptionUid` | string | no |  | Subscription UID. Used when "Lookup by" is set to Subscription UID. |
| `accountUid` | string | no |  | Account UID. Used when "Lookup by" is set to Account UID. Resolves to the account's current subscription. |

### `get_last_payment`

**Get Last Payment for Account.** Returns the single most recent payment transaction for an account, or found=false if none exists. Use for the latest payment only; for the full payment/refund/invoice history use List Account Transactions. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountUid` | string | yes |  | Account UID. The UID of the account to retrieve the last payment for. |

### `create_account`

**Create Account.** Creates a new CRM account, optionally with a primary contact person and an initial subscription on a plan. Use to onboard a new customer; to attach a person to an existing account use Manage Account Membership, and to start a subscription on an existing account use Change Account Plan. Not idempotent: each call creates a new account. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `accountStage` | string | no |  | Account Stage. One of `1`, `2`, `3`, `4`, `5`, `6`, `7`. |
| `clientIdentifier` | string | no |  | Client Identifier. A custom identifier you assign to this account (e.g. your internal customer ID). |
| `invoiceNotes` | string | no |  | Invoice Notes. Notes that appear on invoices sent to this account. |
| `addressLine1` | string | no |  | Address Line 1. |
| `addressLine2` | string | no |  | Address Line 2. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State/Region. |
| `postalCode` | string | no |  | Postal Code. |
| `country` | string | no |  | Country. |
| `primaryContactPersonUid` | string | no |  | Primary Contact Person UID. Optional. UID of an existing person to set as primary contact on the new account. Required by Outseta when starting a subscription with a paid plan. |
| `planUid` | string | no |  | Starting Plan. Optional. If set, the account is created with an active subscription on this plan. A value the product loads from the provider, such as an id; write the value itself. |
| `billingRenewalTerm` | string | no | `1` | Billing Renewal Term. Used only when Starting Plan is set. Defaults to Monthly. One of `1`, `2`, `3`, `4`. |
| `customProperties` | object | no |  | Custom Properties. Custom properties defined on Account in your Outseta workspace. The widget for each field is automatically inferred from the property's ControlType (text, date, single-select, multi-select). An object whose fields depend on other inputs; the product shows them. |

### `create_deal`

**Create Deal.** Creates a new CRM deal in a pipeline stage, optionally linked to a person and account. Use when you always want a new deal; to avoid duplicates keyed on contact email use Find or Add Deal instead. Not idempotent: each call creates a new deal. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Deal Name. |
| `pipelineUid` | string | yes |  | Pipeline. Select the deal pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `pipelineStageUid` | string | yes |  | Pipeline Stage. Pipeline stage for the deal. A value the product loads from the provider, such as an id; write the value itself. |
| `contactEmail` | string | no |  | Contact Email. Email of the person to associate with this deal. |
| `amount` | number | no |  | Amount. |
| `accountUid` | string | no |  | Account UID. UID of the account to associate with this deal. |
| `customProperties` | object | no |  | Custom Properties. Custom properties defined on Deal in your Outseta workspace. The widget for each field is automatically inferred from the property's ControlType (text, date, single-select, multi-select). An object whose fields depend on other inputs; the product shows them. |

### `find_or_add_person`

**Find or Add Person.** Looks up an Outseta CRM person by exact (case-insensitive) email match and returns it; if no match exists, creates a new person with that email plus optional name, phone, and mailing address. Use to ensure a contact exists without creating a duplicate. Email is the dedup key, so reusing the same email is safe; supplying a different email creates a new person. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Email to search for. If no match is found, a new person is created with this email. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `phoneMobile` | string | no |  | Mobile #. |
| `phoneWork` | string | no |  | Work #. |
| `addressLine1` | string | no |  | Address Line 1. |
| `addressLine2` | string | no |  | Address Line 2. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State/Region. |
| `postalCode` | string | no |  | Postal Code. |
| `country` | string | no |  | Country. |
| `customProperties` | object | no |  | Custom Properties. Custom properties defined on Person in your Outseta workspace. The widget for each field is automatically inferred from the property's ControlType (text, date, single-select, multi-select). An object whose fields depend on other inputs; the product shows them. |

### `find_or_add_deal`

**Find or Add Deal.** Looks up a deal by contact email within a pipeline and returns it, creating one only if none exists. Use to upsert a deal without duplicating; to always create use Create Deal. Pipeline stage is required only on the create path. Idempotent: a repeat call returns the same deal rather than creating another. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactEmail` | string | yes |  | Contact Email. Email of the contact associated with the deal. Used to search for existing deals. |
| `pipelineUid` | string | yes |  | Pipeline. Select the deal pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `pipelineStageUid` | string | no |  | Pipeline Stage. Pipeline stage for the deal (only required when creating a new one). A value the product loads from the provider, such as an id; write the value itself. |
| `name` | string | yes |  | Deal Name. Name of the deal (used when creating a new deal). |
| `amount` | number | no |  | Amount. Deal amount. |
| `accountUid` | string | no |  | Account UID. UID of the account to associate with the deal. |
| `assignedToPersonClientIdentifier` | string | no |  | Assigned To (Person Client Identifier). Client identifier of the person to assign the deal to. |
| `customProperties` | object | no |  | Custom Properties. Custom properties defined on Deal in your Outseta workspace. The widget for each field is automatically inferred from the property's ControlType (text, date, single-select, multi-select). An object whose fields depend on other inputs; the product shows them. |

### `update_account`

**Update Account.** Updates an existing Outseta CRM account identified by UID, setting only the provided fields (name, stage, client identifier, invoice notes, billing address) via a PUT. Use to change account details when you have its UID; requires at least one field. Idempotent: re-running with the same input leaves the account in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountUid` | string | yes |  | Account UID. The UID of the account to update. |
| `name` | string | no |  | Name. |
| `accountStage` | string | no |  | Account Stage. One of `1`, `2`, `3`, `4`, `5`, `6`, `7`. |
| `clientIdentifier` | string | no |  | Client Identifier. A custom identifier you assign to this account (e.g. your internal customer ID). |
| `invoiceNotes` | string | no |  | Invoice Notes. Notes that appear on invoices sent to this account. |
| `addressLine1` | string | no |  | Address Line 1. |
| `addressLine2` | string | no |  | Address Line 2. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State/Region. |
| `postalCode` | string | no |  | Postal Code. |
| `country` | string | no |  | Country. |
| `customProperties` | object | no |  | Custom Properties. Custom properties defined on Account in your Outseta workspace. The widget for each field is automatically inferred from the property's ControlType (text, date, single-select, multi-select). An object whose fields depend on other inputs; the product shows them. |

### `update_person`

**Update Person.** Updates an existing Outseta CRM person identified by UID, setting only the provided fields (email, name, phone, title, mailing address) via a PUT. Use to change a contact when you have its UID; requires at least one field. Idempotent: re-running with the same input leaves the person in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `personUid` | string | yes |  | Person UID. The UID of the person to update. |
| `email` | string | no |  | Email. |
| `firstName` | string | no |  | First Name. |
| `lastName` | string | no |  | Last Name. |
| `phoneMobile` | string | no |  | Mobile #. |
| `phoneWork` | string | no |  | Work #. |
| `title` | string | no |  | Title. Job title (e.g. CEO, Engineer). |
| `addressLine1` | string | no |  | Address Line 1. |
| `addressLine2` | string | no |  | Address Line 2. |
| `city` | string | no |  | City. |
| `state` | string | no |  | State/Region. |
| `postalCode` | string | no |  | Postal Code. |
| `country` | string | no |  | Country. |
| `customProperties` | object | no |  | Custom Properties. Custom properties defined on Person in your Outseta workspace. The widget for each field is automatically inferred from the property's ControlType (text, date, single-select, multi-select). An object whose fields depend on other inputs; the product shows them. |

### `update_deal`

**Update Deal.** Updates an existing Outseta CRM deal identified by UID, setting only the provided fields (name, pipeline stage, amount, assignee, due date, linked account/person) via a PUT. Use to advance a deal stage or edit its details when you have its UID. Idempotent: re-running with the same input leaves the deal in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dealUid` | string | yes |  | Deal UID. The UID of the deal to update. |
| `name` | string | no |  | Name. |
| `pipelineUid` | string | no |  | Pipeline. Select the deal pipeline. A value the product loads from the provider, such as an id; write the value itself. |
| `dealPipelineStageUid` | string | no |  | Pipeline Stage. Select the pipeline stage. A value the product loads from the provider, such as an id; write the value itself. |
| `amount` | number | no |  | Amount. The monetary value of the deal. |
| `assignedToPersonClientIdentifier` | string | no |  | Assigned To (Client Identifier). The client identifier of the team member this deal is assigned to. Found in the person's Outseta profile. |
| `dueDate` | ISO date-time string | no |  | Due Date. |
| `accountUid` | string | no |  | Account UID. The UID of the account to associate with this deal. |
| `personUid` | string | no |  | Person UID. UID of a person to add as a contact on this deal. Existing contacts are preserved. |
| `customProperties` | object | no |  | Custom Properties. Custom properties defined on Deal in your Outseta workspace. The widget for each field is automatically inferred from the property's ControlType (text, date, single-select, multi-select). An object whose fields depend on other inputs; the product shows them. |

### `delete_account`

**Delete Account.** Permanently deletes a CRM account by its UID. Use to remove an account entirely; to only end billing while keeping the record use Cancel Subscription. Destructive. Not idempotent: a repeat call errors because the account no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountUid` | string | yes |  | Account UID. The UID of the account to delete. |

### `delete_person`

**Delete Person.** Permanently deletes a CRM person (contact) by its UID. Use to remove a contact entirely; to only detach them from an account use Manage Account Membership. Destructive. Not idempotent: a repeat call errors because the person no longer exists. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `personUid` | string | yes |  | Person UID. The UID of the person to delete. |

### `delete_deal`

**Delete Deal.** Permanently deletes an Outseta CRM deal by its UID. Use to remove a deal you have the UID for. Destructive; repeating the call after the deal is gone will error rather than succeed silently. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dealUid` | string | yes |  | Deal UID. The UID of the deal to delete. |

### `list_accounts`

**List Accounts.** Returns a paginated list of CRM accounts. Use to browse or scan accounts; to fetch one known account use Retrieve Account. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `100` | Limit. Maximum number of accounts to return (default 100). |
| `offset` | number | no | `0` | Page. Page number to fetch (0 = first page, 1 = second page, ...). Outseta uses page-based pagination, not record-based. |

### `list_persons`

**List Persons.** Returns a paginated list of CRM persons (contacts). Use to browse or scan contacts; to fetch one known person use Retrieve Person. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `100` | Limit. Maximum number of persons to return (default 100). |
| `offset` | number | no | `0` | Page. Page number to fetch (0 = first page, 1 = second page, ...). Outseta uses page-based pagination, not record-based. |

### `list_deals`

**List Deals.** Returns a paginated list of CRM deals. Use to browse or scan deals; to fetch one known deal use Retrieve Deal. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `100` | Limit. Maximum number of deals to return (default 100). |
| `offset` | number | no | `0` | Page. Page number to fetch (0 = first page, 1 = second page, ...). Outseta uses page-based pagination, not record-based. |

### `list_plans`

**List Plans.** Returns a paginated list of subscription plans from the billing catalog. Use to discover available plan UIDs, e.g. before Change Account Plan or Create Account. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `100` | Limit. Maximum number of plans to return (default 100). |
| `offset` | number | no | `0` | Page. Page number to fetch (0 = first page, 1 = second page, ...). Outseta uses page-based pagination, not record-based. |

### `list_addons`

**List Add-Ons.** Returns a paginated list of add-ons from the billing catalog. Use to discover available add-on UIDs, e.g. before Add Add-on to Subscription. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `100` | Limit. Maximum number of add-ons to return (default 100). |
| `offset` | number | no | `0` | Page. Page number to fetch (0 = first page, 1 = second page, ...). Outseta uses page-based pagination, not record-based. |

### `list_discounts`

**List Discounts.** Returns a paginated list of discount coupons from the billing catalog. Use to discover existing coupon UIDs, e.g. before Apply Discount to Account. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `100` | Limit. Maximum number of discounts to return (default 100). |
| `offset` | number | no | `0` | Page. Page number to fetch (0 = first page, 1 = second page, ...). Outseta uses page-based pagination, not record-based. |

### `list_cases`

**List Cases.** Returns a paginated list of support tickets, optionally filtered by the submitting person's UID or email. Use to scan or find tickets; to open one use Create Ticket. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `fromPersonUid` | string | no |  | From Person UID. Optional. Only return cases submitted by this person. |
| `fromPersonEmail` | string | no |  | From Person Email. Optional. Only return cases submitted by the person with this email. |
| `limit` | number | no | `100` | Limit. Maximum number of cases to return (default 100). |
| `offset` | number | no | `0` | Page. Page number to fetch (0 = first page, 1 = second page, ...). Outseta uses page-based pagination, not record-based. |

### `list_transactions`

**List Account Transactions.** Returns a paginated list of all billing transactions (payments, refunds, invoices) for an account, by account UID. Use for full history; for just the latest payment use Get Last Payment for Account. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountUid` | string | yes |  | Account UID. The UID of the account to retrieve transactions for. |
| `limit` | number | no | `100` | Limit. Maximum number of transactions to return (default 100). |
| `offset` | number | no | `0` | Page. Page number to fetch (0 = first page, 1 = second page, ...). Outseta uses page-based pagination, not record-based. |

### `change_account_plan`

**Change Account Plan.** Changes the plan on an account's current subscription (upgrade, downgrade, or switch to free) and sets the billing renewal term, identified by account UID. Use to move an account between plans. Requires the account to already have an active subscription, otherwise it errors. Not idempotent: it is a billing mutation that can prorate/charge, so repeating may have further effect. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountUid` | string | yes |  | Account UID. The UID of the account whose plan to change. |
| `planUid` | string | yes |  | New Plan. Select the subscription plan. A value the product loads from the provider, such as an id; write the value itself. |
| `billingRenewalTerm` | string | yes | `1` | Billing Renewal Term. One of `1`, `2`, `3`, `4`. |

### `cancel_subscription`

**Cancel Subscription.** Requests cancellation of an account's current subscription, identified by account UID. Defaults to expiring at the end of the current billing term; with cancel-immediately enabled it also forces the account to the Expired stage right away. Use to churn or downgrade an account. Optional cancellation reason and comment can be recorded. Not idempotent: it mutates subscription/account state. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountUid` | string | yes |  | Account UID. The UID of the account whose subscription to cancel. |
| `cancelImmediately` | boolean | no | `false` | Cancel Immediately. If checked, the subscription is cancelled immediately. Otherwise it expires at the end of the current billing term. |
| `cancellationReason` | string | no |  | Cancellation Reason. Reason for the cancellation (e.g. "Too expensive"). |
| `comment` | string | no |  | Comment. Additional comment about the cancellation. |

### `remove_cancellation`

**Remove Cancellation.** Removes a pending cancellation on an account's subscription, keeping it active, by account UID. Use to reverse a scheduled cancellation; to schedule one use Cancel Subscription. Idempotent: calling it on a subscription that is not cancelling leaves it active. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountUid` | string | yes |  | Account UID. The UID of the account whose cancellation should be removed. |

### `add_discount_to_subscription`

**Apply Discount to Account.** Applies a discount coupon to an account's current subscription, by account UID and discount UID. Use to grant a promotion to an existing subscriber; to create the coupon itself first use Create Discount. Requires an active subscription. Not idempotent: re-applying re-adds the discount. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountUid` | string | yes |  | Account UID. The UID of the account whose subscription will receive the discount. |
| `discountUid` | string | yes |  | Discount. Select the discount coupon to apply. A value the product loads from the provider, such as an id; write the value itself. |

### `add_addon_usage`

**Add Usage for Add-on.** Records a usage amount for a metered (usage-based) add-on on an account's current subscription, resolving the add-on UID against that subscription's active add-ons. Use to report consumption for billing. Requires an active subscription that already includes the chosen add-on, otherwise it errors. Not idempotent: each call appends a usage record that accumulates toward billing. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountUid` | string | yes |  | Account UID. The UID of the account to record usage for. |
| `addOnUid` | string | yes |  | Add-On. Select the metered add-on. A value the product loads from the provider, such as an id; write the value itself. |
| `amount` | number | yes |  | Amount. The usage amount to record. |
| `usageDate` | ISO date-time string | no |  | Usage Date. The date of usage. Defaults to now if not provided. |

### `add_addon_to_subscription`

**Add Add-on to Subscription.** Attaches a recurring add-on to an account's current subscription, by account UID and add-on UID. Use to add an ongoing add-on charge; to report metered consumption on an add-on that is already attached use Add Usage for Add-on instead. Requires an active subscription. Not idempotent: each call adds another add-on instance. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountUid` | string | yes |  | Account UID. The UID of the account whose subscription will receive the add-on. |
| `addOnUid` | string | yes |  | Add-On. Select the metered add-on. A value the product loads from the provider, such as an id; write the value itself. |
| `quantity` | number | no | `1` | Quantity. Number of add-on units to attach. Defaults to 1. |
| `billingRenewalTerm` | string | no | `1` | Billing Renewal Term. How often the add-on is billed. Defaults to Monthly. One of `1`, `2`, `3`, `4`. |

### `extend_trial_subscription`

**Extend Trial Subscription.** Sets a new trial end date on an account's subscription, by account UID. Use to prolong a trial; the date must be in the future and is applied as an absolute target (yyyy-MM-dd). Idempotent: setting the same end date again has no further effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountUid` | string | yes |  | Account UID. The UID of the account whose trial to extend. |
| `trialEndDate` | ISO date-time string | yes |  | New Trial End Date. The new date when the trial should end. Must be in the future. Time-of-day is ignored — Outseta uses date only (yyyy-MM-dd). |

### `update_payment_information`

**Update Payment Information.** Sets the payment method on an account from processor tokens (CustomerToken/PaymentToken), by account UID. Use to attach or replace a card; the tokens must come from your payment processor (e.g. Stripe), not Outseta. Idempotent: re-sending the same tokens yields the same stored method. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountUid` | string | yes |  | Account UID. The UID of the account to update payment information for. |
| `customerToken` | string | yes |  | Customer Token. The customer ID issued by the payment processor (e.g. Stripe customer ID, "cust_…"). |
| `paymentToken` | string | yes |  | Payment Token. The payment method ID issued by the payment processor (e.g. Stripe payment method, "pm_…"). |
| `nameOnCard` | string | no |  | Name on Card. Cardholder name as it appears on the card. |

### `create_discount`

**Create Discount.** Creates a discount coupon in the billing catalog (fixed amount or percentage, with a duration). Use to define a new promotion code; to apply an existing coupon to a subscriber use Apply Discount to Account. Set either Amount Off or Percent Off, not both. Not idempotent: each call creates a new coupon. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `uniqueIdentifier` | string | yes |  | Coupon Code. The public code customers enter to redeem the discount (e.g. "RENTREE2026"). |
| `name` | string | yes |  | Name. Display name of the discount (e.g. "Rentrée -10%"). |
| `isActive` | boolean | no | `true` | Is Active. |
| `duration` | string | yes | `1` | Duration. One of `1`, `2`, `3`. |
| `durationInMonths` | number | no |  | Duration in Months. Required when Duration is set to Repeating. Ignored otherwise. |
| `amountOff` | number | no |  | Amount Off. Fixed amount discount (in your account currency). Set this OR Percent Off, not both. |
| `percentOff` | number | no |  | Percent Off. Percentage discount (0-100). Set this OR Amount Off, not both. |
| `maxRedemptions` | number | no |  | Max Redemptions. Maximum number of times the coupon can be redeemed across all customers. |
| `redeemBy` | ISO date-time string | no |  | Redeem By. Coupon expiration date. |

### `add_invoice`

**Create Invoice.** Creates an ad-hoc invoice on an account's current subscription with a line item. Use to bill a one-off charge; to record a payment against it use Add Invoice Payment. Requires an active subscription. Not idempotent: each call creates a new invoice. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountUid` | string | yes |  | Account UID. The UID of the account to invoice. |
| `description` | string | yes |  | Description. Description for the invoice line item. |
| `amount` | number | yes |  | Amount. Amount for the invoice line item. |

### `add_invoice_payment`

**Add Invoice Payment.** Records a payment transaction against a specific invoice, by account and invoice UID. Use to log a payment on an invoice; to (re)trigger automatic collection of a recorded payment use Process Payment instead. Amount must be negative per the Outseta API. Not idempotent: each call appends a payment transaction. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountUid` | string | yes |  | Account UID. The UID of the account that owns the invoice. |
| `invoiceUid` | string | yes |  | Invoice UID. The UID of the invoice to apply the payment to. |
| `amount` | number | yes |  | Amount. Payment amount as a negative number (e.g. -49.00), as required by the Outseta API. |

### `send_invoice_email`

**Send Invoice Email.** Sends (or resends) the invoice email to the customer for a given invoice UID. Use to deliver a copy of an invoice. Not idempotent: each call sends another email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoiceUid` | string | yes |  | Invoice UID. The UID of the invoice whose email should be sent. |

### `process_payment`

**Process Payment.** Triggers (re)processing of an existing payment by its payment UID, e.g. to retry a declined charge after a card update. Use to collect a previously recorded payment; to log a manual payment against an invoice use Add Invoice Payment. Not idempotent: a successful retry can capture funds, so repeating may charge again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `paymentUid` | string | yes |  | Payment UID. The UID of the payment to process. You can get it from a 'Subscription Payment Declined' webhook payload, or from the 'List Account Transactions' / 'Get Last Payment for Account' actions. |

### `manage_account_membership`

**Manage Account Membership.** Adds or removes a person on an account (membership), by account and person UID. Use to attach or detach a contact; to change an existing member's primary-contact flag use Update Account Membership. Idempotent: re-adding an existing member or removing a non-member is a no-op. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `action` | string | yes |  | Action. One of `"add"`, `"remove"`. |
| `accountUid` | string | yes |  | Account UID. The UID of the account. |
| `personUid` | string | yes |  | Person UID. The UID of the person to add or remove. |
| `isPrimary` | boolean | no | `false` | Is Primary Contact. Only used when adding: whether this person should be the primary contact for the account. |

### `update_account_membership`

**Update Account Membership.** Updates an existing person's membership on an account — typically to set them as the primary contact — by account and person UID. Use to change a member's role; to add or remove the member entirely use Manage Account Membership. Idempotent: setting the same primary-contact state again has no further effect. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountUid` | string | yes |  | Account UID. The UID of the account. |
| `personUid` | string | yes |  | Person UID. The UID of the person whose membership to update. |
| `isPrimary` | boolean | yes | `true` | Is Primary Contact. Whether this person should be the primary contact for the account. |

### `add_custom_activity`

**Add Custom Activity.** Records a custom activity entry on an account, person, or deal (entity type selects which, then its UID), appearing in the activity feed and able to start/stop drip campaigns. Use to log a custom event or drive automation; the title must match the drip-campaign start/stop value when used for automation. Not idempotent: each call appends a new activity record. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. The activity title. Must match the start/stop value in drip campaigns if used for automation. |
| `entityType` | string | yes |  | Entity Type. One of `1`, `2`, `3`. |
| `entityUid` | string | yes |  | Entity. Select the account, person, or deal to record the activity on. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. |
| `activityData` | string | no |  | Data. Optional string to store serialized JSON or other metadata with this activity. |

### `manage_email_list_subscription`

**Manage Email List Subscription.** Subscribes or unsubscribes a person on an email list, by email and list. Use to manage list membership in a single action. Idempotent: re-subscribing an existing subscriber or unsubscribing a non-subscriber is a no-op. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `action` | string | yes |  | Action. One of `"subscribe"`, `"unsubscribe"`. |
| `emailListUid` | string | yes |  | Email List. Select the email list. A value the product loads from the provider, such as an id; write the value itself. |
| `email` | string | yes |  | Email. The email address to subscribe or unsubscribe. |
| `firstName` | string | no |  | First Name. Only used when subscribing. |
| `lastName` | string | no |  | Last Name. Only used when subscribing. |
| `sendWelcomeEmail` | boolean | no | `false` | Send Welcome Email. Only used when subscribing. If checked, Outseta will send the list welcome email. |

### `send_confirmation_email`

**Send Confirmation Email.** Sends the account confirmation/activation email to the primary contact, a specific person, or all members of an account. Use to (re)deliver activation emails. Not idempotent: each call sends another email. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `accountUid` | string | yes |  | Account UID. The UID of the account. |
| `personUid` | string | no |  | Person UID. Leave empty for primary contact, or use * for all members. |

### `add_case`

**Create Ticket.** Opens a new support ticket (case) from a person, with subject and body. Use to file a customer support request; to respond within an existing ticket use Reply to Ticket. Not idempotent: each call creates a new case. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `personUid` | string | yes |  | Person UID. The UID of the person submitting the ticket. |
| `subject` | string | yes |  | Subject. Subject line of the ticket. |
| `body` | string | yes |  | Body. Body content of the ticket. |
| `source` | string | yes |  | Source. The source channel of the ticket. One of `1`, `2`, `3`, `4`. |
| `sendAutoResponder` | boolean | no | `true` | Send Auto Responder. Whether to send an auto-responder email to the person. |

### `add_reply`

**Reply to Ticket.** Posts an agent reply onto an existing support ticket, by case UID. Use to respond within a ticket thread; to open a new ticket use Create Ticket. Not idempotent: each call appends a new reply. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `caseUid` | string | yes |  | Case UID. The UID of the support ticket to reply to. |
| `agentName` | string | yes |  | Agent Name. Name of the agent sending the reply. |
| `comment` | string | yes |  | Comment. The reply content. |

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

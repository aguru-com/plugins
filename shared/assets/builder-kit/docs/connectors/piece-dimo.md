# DIMO

DIMO is an open protocol using blockchain to establish universal digital vehicle identity, permissions, data transmission, vehicle control, and payments. Developers use DIMO to build apps based on connected vehicles around the world while the vehicle owners benefit from monetizing their vehicle dat…

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-dimo'
  version: '0.3.7'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> You can obtain following credentials by creating Developer License at [Developer Console](https://console.dimo.org/).

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clientId` | string | yes |  | Client ID. |
| `redirectUri` | string | yes |  | Redirect URI. |
| `apiKey` | string | yes |  | API Key. |

## Actions

### `attestation-create-vin-vc`

**Attestation : Create VIN VC.** Generate a VIN Verifiable Credential (VIN VC) for a DIMO vehicle, identified by its numeric vehicle token ID. This is a minting/attestation call that produces a fresh signed credential each time, so it is not idempotent; use it when an agent needs an on-chain-verifiable attestation of a vehicle's VIN rather than just reading current VIN data. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vehicleTokenId` | number | yes |  | Vehicle Token ID. The ID of the vehicle for generating VIN Verifiable Credential for. |

### `device-definitions-decode-vin`

**Device Definitions : Decode VIN.** Decode a VIN (plus its 3-letter ISO country code) into a DIMO device definition ID identifying the make/model/year. A pure lookup that returns the same definition for the same VIN, so it is idempotent; pick it when you have a concrete VIN and need its canonical device definition, versus the Lookup action when you only have free-text make/model/year search terms. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `countryCode` | string | yes |  | Country Code. 3-letter ISO 3166-1 alpha-3 country code (e.g. USA) |
| `vin` | string | yes |  | VIN. Vehicle Identification Number. |

### `device-definitions-lookup-device-definitions`

**Device Definitions : Lookup.** Search the DIMO device-definition catalog by free-text query plus optional make/model/year filters, with pagination. Read-only search; pick it when you only have descriptive terms (e.g. "Lexus gx 2023") rather than a concrete VIN, in which case use Decode VIN instead. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. Query filter (e.g. Lexus gx 2023) |
| `makeSlug` | string | no |  | Vehicle Make. Make of the vehicle (e.g. audi, lexus, etc) |
| `modelSlug` | string | no |  | Vehicle Model. Model of the vehicle (e.g. Tacoma, Accord, etc) |
| `year` | number | no |  | Vehicle Year. Year of the vehicle (e.g. 2024) |
| `page` | number | no |  | Page. Page number (for pagination, defaults to 1) |
| `pageSize` | number | no |  | Page Size. Page size (items per page) |

### `token-exchange-get-vehicle-jwt`

**Token Exchange : Get Vehicle JWT.** Exchange the developer credentials for a short-lived Vehicle JWT scoped to a single vehicle token ID, which other DIMO calls need to read that vehicle's privileged data. Read-only token exchange with no side effects; pick it when you must obtain a vehicle-scoped access token directly rather than letting a higher-level action fetch one internally. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vehicleTokenId` | number | yes |  | Vehicle Token ID. The ID of the vehicle for getting Vehicle JWT. |

### `identity-custom-query`

**Identity : Custom Query.** Run an arbitrary GraphQL query against the public DIMO Identity API (no auth required), passing the raw query string and optional variables. Read-only escape hatch for identity/ownership data not covered by the purpose-built Identity actions; prefer a specific Identity action when one fits and use this only for custom query shapes.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customQuery` | string | yes |  | Custom GraphQL Query. |
| `variables` | JSON | no |  | Variables. |

### `identity-total-vehicle-count`

**Identity : Total Vehicle Count.** Get the total number of vehicles registered network-wide on DIMO. Read-only, no parameters, no auth; pick this for a global vehicle count, versus Get Total Vehicle Count For Owner when you need the count for one specific owner address.

Kind: read, safe to repeat.

No inputs.

### `identity-get-developer-license-info`

**Identity : Get Developer License Info.** Look up details of a DIMO developer license by its numeric license token ID. Read-only and idempotent (no auth required); pick this when you have the license token ID, versus Get Vehicle By Dev License which queries by the license 0x address.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `devLicenseTokenId` | number | yes |  | Developer License Token ID. Token ID of the developer license. |

### `identity-get-vehicle-by-dev-license`

**Identity : Get Vehicle By Dev License.** List vehicles associated with a developer license, identified by its 0x address. Read-only and idempotent (no auth required); pick this when you have the license 0x address, versus Get Developer License Info which looks up the license itself by token ID.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `devLicense0x` | string | yes |  | Dev License 0x. 0x address for developer license. |

### `identity-get-total-vehicle-count-for-owner`

**Identity : Get Total Vehicle Count For Owner..** Get the number of vehicles owned by a specific 0x Ethereum address on DIMO. Read-only and idempotent (no auth required); pick this for a per-owner count, versus Total Vehicle Count for the network-wide total or Get Owner Vehicles for the actual vehicle list.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ownerAddress` | string | yes |  | Owner Address. 0x Ethereum address of the owner. |

### `identity-get-vehicle-mmy-by-owner`

**Identity : Get Vehicle MMY By Owner.** List the make/model/year (MMY) of every vehicle owned by a given 0x Ethereum address. Read-only and idempotent (no auth required); pick this when you have an owner address, versus Get Vehicle MMY By TokenId when you have a single vehicle token ID.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ownerAddress` | string | yes |  | Owner Address. 0x Ethereum address of the owner. |

### `identity-get-vehicle-mmy-by-tokenid`

**Identity : Get Vehicle MMY By TokenId.** Get the make/model/year (MMY) for a single vehicle by its ERC-721 token ID. Read-only and idempotent (no auth required); pick this when you have one vehicle token ID, versus Get Vehicle MMY By Owner to list MMY for all of an owner's vehicles.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vehicleTokenId` | number | yes |  | Vehicle Token ID. The ERC-721 token ID of the vehicle. |

### `identity-get-sacd-for-vehicle`

**Identity : Get SACD For Vehicle.** Get the SACD permission grants (Service Access Contract Document, i.e. what data access has been shared) for a vehicle by its ERC-721 token ID. Read-only and idempotent (no auth required); pick this to inspect a vehicle's data-sharing permissions for a given vehicle token ID.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vehicleTokenId` | number | yes |  | Vehicle Token ID. The ERC-721 token ID of the vehicle. |

### `identity-get-rewards-by-owner`

**Identity : Get Rewards By Owner.** Get the current DIMO rewards for a given 0x Ethereum owner address. Read-only and idempotent (no auth required); pick this for current/aggregate reward state, versus Get Reward History By Owner for the historical breakdown over time.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ownerAddress` | string | yes |  | Owner Address. 0x Ethereum address of the owner. |

### `identity-get-reward-history-by-owner`

**Identity : Get Reward History By Owner.** Get the historical DIMO reward records for a given 0x Ethereum owner address. Read-only and idempotent (no auth required); pick this for the time-series reward history, versus Get Rewards By Owner for the current reward summary.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ownerAddress` | string | yes |  | Owner Address. 0x Ethereum address of the owner. |

### `identity-get-device-definition-by-tokenid`

**Identity : Get Device Definition.** Get the device definition (make/model/year specification) for a vehicle by its ERC-721 token ID. Read-only and idempotent (no auth required); pick this when you have a vehicle token ID, versus Get Device Definition By DefinitionId when you already hold a device definition ID string.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vehicleTokenId` | number | yes |  | Vehicle Token ID. The ERC-721 token ID of the vehicle. |

### `identity-get-device-definition-by-definitionid`

**Identity : Get Device Definition By DefinitionId.** Get a device definition directly by its device definition ID string. Read-only and idempotent (no auth required); pick this when you already have a definition ID (e.g. from Decode VIN or a Lookup), versus Get Device Definition which resolves it from a vehicle token ID.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `deviceDefinitionId` | string | yes |  | Device Definition ID. ID of the device definition. |

### `identity-get-owner-vehicles`

**Identity : Get Owner Vehicles.** List the vehicles owned by a given 0x Ethereum address, including their token IDs. Read-only and idempotent (no auth required); pick this to enumerate an owner's actual vehicles, versus Get Total Vehicle Count For Owner if you only need the count.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ownerAddress` | string | yes |  | Owner Address. 0x Ethereum address of the owner. |

### `identity-get-developer-shared-vehicles-from-owner`

**Identity : Get Developer Shared Vehicles From Owner.** List the vehicles a given owner (0x address) has shared with a specific developer license (0x address), taking both addresses. Read-only and idempotent (no auth required); pick this to see the intersection of one owner's vehicles granted to one developer, versus Get Owner Vehicles (all of an owner's vehicles) or Get Vehicle By Dev License (all vehicles on a license).

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `devLicense0x` | string | yes |  | Dev License 0x. 0x address for developer license. |
| `ownerAddress` | string | yes |  | Owner Address. 0x Ethereum address of the owner. |

### `identity-get-dcns-by-owner`

**Identity : Get DCNs By Owner.** List the DIMO Canonical Names (DCNs, human-readable vehicle name records) owned by a given 0x Ethereum address. Read-only and idempotent (no auth required); pick this to enumerate an owner's DCN name registrations by owner address.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ownerAddress` | string | yes |  | Owner Address. 0x Ethereum address of the owner. |

### `telemetry-custom-query`

**Telemetry : Custom Query.** Run an arbitrary GraphQL query against the DIMO Telemetry API for one vehicle (by token ID), passing the raw query string and optional variables. Read-only escape hatch for telemetry data not covered by the purpose-built telemetry actions; pick a specific action (Signals, Daily Avg Speed, Max Speed, Events, VIN VC Latest) when one fits, and use this only for custom shapes. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customQuery` | string | yes |  | Custom GraphQL Query.. |
| `variables` | JSON | no |  | Variables. |
| `vehicleTokenId` | number | yes |  | Vehicle Token ID.. |

### `telemetry-available-signals`

**Telemetry : Available Signals.** List which telemetry signals are available for a specific vehicle (by token ID), so an agent can discover what data the vehicle reports before querying values. Read-only and idempotent; pick this to enumerate signal names, not to retrieve their time-series values (use Signals for that). Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vehicleTokenId` | number | yes |  | Vehicle Token ID. |

### `telemetry-signals`

**Telemetry : Signals.** Retrieve telemetry signal values for a specific vehicle (by token ID) over a UTC start/end window, aggregated at a given interval (e.g. 1s, 1m, 1h). Read-only historical read; pick this for the vehicle's actual signal data over time, and use Available Signals first if you need to know which signals exist. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vehicleTokenId` | number | yes |  | Vehicle Token ID. |
| `startDate` | ISO date-time string | yes |  | Start Date. Start date for the query in UTC, formatted as 2025-07-07T12:00:00Z. |
| `endDate` | ISO date-time string | yes |  | End Date. End date for the query in UTC, formatted as 2025-07-09T12:00:00Z. |
| `interval` | string | yes |  | Interval. Interval (e.g. 1s, 1m, 1h). |

### `telemetry-daily-avg-speed`

**Telemetry : Daily Avg Speed.** Get a vehicle's daily average speed over a UTC start/end window (by token ID). Read-only aggregate computed by DIMO, so it is idempotent; pick this for average-speed analytics, versus Max Speed for the peak value over the same period. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vehicleTokenId` | number | yes |  | Vehicle Token ID. |
| `startDate` | ISO date-time string | yes |  | Start Date. Start date for the query in UTC, formatted as 2025-07-07T12:00:00Z. |
| `endDate` | ISO date-time string | yes |  | End Date. End date for the query in UTC, formatted as 2025-07-09T12:00:00Z. |

### `telemetry-event`

**Telemetry: Events.** Retrieve discrete vehicle events (e.g. trips, status changes) for a specific vehicle (by token ID) over a UTC start/end window. Read-only and idempotent; pick this for event records over a period rather than continuous signal samples (Signals) or speed aggregates (Daily Avg Speed / Max Speed). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vehicleTokenId` | number | yes |  | Vehicle Token ID. |
| `startDate` | ISO date-time string | yes |  | Start Date. Start date for the query in UTC, formatted as 2025-07-07T12:00:00Z. |
| `endDate` | ISO date-time string | yes |  | End Date. End date for the query in UTC, formatted as 2025-07-09T12:00:00Z. |

### `telemetry-max-speed`

**Telemetry : Max Speed.** Get a vehicle's maximum speed over a UTC start/end window at a given sampling interval (by token ID). Read-only aggregate, so it is idempotent; pick this for the peak speed reached, versus Daily Avg Speed for the average over the same period. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vehicleTokenId` | number | yes |  | Vehicle Token ID. |
| `startDate` | ISO date-time string | yes |  | Start Date. Start date for the query in UTC, formatted as 2025-07-07T12:00:00Z. |
| `endDate` | ISO date-time string | yes |  | End Date. End date for the query in UTC, formatted as 2025-07-09T12:00:00Z. |
| `interval` | string | yes |  | Interval. Interval (e.g. 1s, 1m, 1h). |

### `telemetry-vin-vc-latest`

**Telemetry : VIN VC Latest.** Read the most recent VIN Verifiable Credential and vehicle configuration already on record for a specific vehicle (by token ID). Read-only and idempotent; pick this to fetch the existing latest VIN VC, versus the Attestation Create VIN VC action which mints a new credential. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vehicleTokenId` | number | yes |  | Vehicle Token ID. |

### `vehicle-events-list-webhooks-action`

**Vehicle Events: List Webhooks.** List all DIMO Vehicle Events webhooks configured under the developer account. Read-only and idempotent; pick this to discover existing webhook IDs and their configuration before creating, updating, subscribing, or deleting. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `vehicle-events-upsert-webhook-numeric-action`

**Vehicle Events: Create/Update Webhook (Numeric).** Create or update a Vehicle Events webhook that fires when a numeric signal (speed, fuel level, battery state of charge, tire pressure, etc.) crosses a threshold via an operator and trigger value. Supplying a Webhook ID updates that webhook (idempotent); omitting it creates a new one each call (not idempotent). Use the Boolean variant for on/off signals and the Events variant for driving events like harsh braking. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhookId` | string | no |  | Webhook ID (Optional). ID of the webhook to update. Leave empty to create a new webhook. |
| `data` | string | yes |  | Signal/Data. Which numeric vehicle signal to monitor. One of `"speed"`, `"powertrainTransmissionTravelledDistance"`, `"powertrainFuelSystemRelativeLevel"`, `"powertrainFuelSystemAbsoluteLevel"`, `"powertrainTractionBatteryCurrentPower"`, `"powertrainTractionBatteryStateOfChargeCurrent"`, `"chassisAxleRow1WheelLeftTirePressure"`, `"chassisAxleRow1WheelRightTirePressure"`, `"chassisAxleRow2WheelLeftTirePressure"`, `"chassisAxleRow2WheelRightTirePressure"`. |
| `operator` | string | yes | `"greater_than"` | Comparison Type. How to compare the battery power in watts. One of `"less_than"`, `"less_or_equal"`, `"equal"`, `"greater_or_equal"`, `"greater_than"`. |
| `triggerNumber` | number | yes |  | Trigger Value. Numeric value to compare against (e.g., speed in km/h, fuel percentage, battery watts, tire pressure in PSI) |
| `coolDownPeriod` | number | yes | `30` | Cool Down Period (seconds). Minimum number of seconds between successive webhook firings. |
| `targetURL` | string | yes |  | Target URL. HTTPS endpoint URL that will receive webhook callbacks. |
| `status` | string | yes | `"enabled"` | Status. Webhook status. One of `"enabled"`, `"disabled"`. |
| `verificationToken` | string | yes | `"token"` | Verification Token. Token for webhook verification. |
| `displayName` | string | no |  | Display Name. Optional name to easily identify your webhook (defaults to webhook ID if not provided) |
| `description` | string | no |  | Description. Brief description of the webhook conditions for your reference (optional) |

### `vehicle-events-upsert-webhook-boolean-action`

**Vehicle Events: Create/Update Webhook (Boolean).** Create or update a Vehicle Events webhook that fires on a boolean signal state (battery charging on/off, ignition on/off). Supplying a Webhook ID updates that webhook (idempotent); omitting it creates a new one each call (not idempotent). Use the Numeric variant for threshold signals and the Events variant for driving events. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhookId` | string | no |  | Webhook ID (Optional). ID of the webhook to update. Leave empty to create a new webhook. |
| `data` | string | yes |  | Signal/Data. Which boolean vehicle signal to monitor. One of `"powertrainTractionBatteryChargingIsCharging"`, `"isIgnitionOn"`. |
| `operator` | string | yes | `"equal"` | Operator. Comparison operator. One of `"equal"`. |
| `triggerExpression` | boolean | yes |  | Trigger Value. Boolean value to compare against (checked = true/charging, unchecked = false/not charging) |
| `coolDownPeriod` | number | yes | `30` | Cool Down Period (seconds). Minimum number of seconds between successive webhook firings. |
| `targetURL` | string | yes |  | Target URL. HTTPS endpoint URL that will receive webhook callbacks. |
| `status` | string | yes | `"enabled"` | Status. Webhook status. One of `"enabled"`, `"disabled"`. |
| `verificationToken` | string | yes | `"token"` | Verification Token. Token for webhook verification. |
| `displayName` | string | no |  | Display Name. Optional name to easily identify your webhook (defaults to webhook ID if not provided) |
| `description` | string | no |  | Description. Brief description of the webhook conditions for your reference (optional) |

### `vehicle-events-upsert-webhook-event-action`

**Vehicle Events: Create/Update Webhook (Events).** Create or update a Vehicle Events webhook that fires on discrete driving events (extreme/harsh braking, harsh acceleration, harsh cornering). Supplying a Webhook ID updates that webhook (idempotent); omitting it creates a new one each call (not idempotent). Use the Numeric or Boolean variants instead when monitoring signal values rather than driving events. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhookId` | string | no |  | Webhook ID (Optional). ID of the webhook to update. Leave empty to create a new webhook. |
| `eventType` | string | yes |  | Event Type. Which vehicle event to monitor. One of `"ExtremeBraking"`, `"HarshAcceleration"`, `"HarshBraking"`, `"HarshCornering"`. |
| `coolDownPeriod` | number | yes | `30` | Cool Down Period (seconds). Minimum number of seconds between successive webhook firings. |
| `targetURL` | string | yes |  | Target URL. HTTPS endpoint URL that will receive webhook callbacks. |
| `status` | string | yes | `"enabled"` | Status. Webhook status. One of `"enabled"`, `"disabled"`. |
| `verificationToken` | string | yes | `"token"` | Verification Token. Token for webhook verification. |
| `displayName` | string | no |  | Display Name. Optional name to easily identify your webhook (defaults to webhook ID if not provided) |
| `description` | string | no |  | Description. Brief description of the webhook conditions for your reference (optional) |

### `vehicle-events-delete-webhook-action`

**Vehicle Events: Delete Webhook.** Permanently delete a Vehicle Events webhook by its Webhook ID, removing it and its vehicle subscriptions. Destructive and not idempotent (deleting an already-removed webhook errors); pick this to tear down a webhook rather than disabling it via the Status field on a Create/Update action. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhookId` | string | yes |  | Webhook ID. ID of the webhook. |

### `vehicle-events-list-signals-action`

**Vehicle Events: List Signals.** List the signal names available for use in Vehicle Events webhook conditions. Read-only and idempotent; pick this to discover valid signals before creating or updating a numeric/boolean webhook. Needs authentication.

Kind: search, safe to repeat.

No inputs.

### `vehicle-events-list-subscribed-vehicles-action`

**Vehicle Events: List Subscribed Vehicles.** List the vehicles currently subscribed to a given webhook, taking the Webhook ID. Read-only and idempotent; pick this to see which vehicles a webhook covers, versus List Vehicle Subscriptions which goes the other direction (all webhooks a single vehicle is subscribed to). Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhookId` | string | yes |  | Webhook ID. ID of the webhook. |

### `vehicle-events-list-vehicle-subscriptions-action`

**Vehicle Events: List Vehicle Subscriptions.** List all webhook subscriptions for a single vehicle, taking the vehicle Token ID. Read-only and idempotent; pick this to see which webhooks one vehicle is subscribed to, versus List Subscribed Vehicles which lists all vehicles on a given webhook. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tokenId` | number | yes |  | Vehicle Token ID. Token ID of the vehicle. |

### `vehicle-events-subscribe-vehicle-action`

**Vehicle Events: Subscribe Vehicle.** Subscribe one vehicle (by Token ID) to a specific webhook (by Webhook ID) so it begins firing for that vehicle. A targeted mutation; pick this for a single vehicle, versus Subscribe All Vehicles to enroll every eligible vehicle on the developer license at once. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhookId` | string | yes |  | Webhook ID. ID of the webhook. |
| `tokenId` | number | yes |  | Vehicle Token ID. Token ID of the vehicle. |

### `vehicle-events-subscribe-all-vehicles-action`

**Vehicle Events: Subscribe All Vehicles.** Subscribe every eligible vehicle on the developer license to a given webhook (by Webhook ID) in one call. A bulk mutation that affects all vehicles; pick Subscribe Vehicle instead when you only need a single vehicle enrolled. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhookId` | string | yes |  | Webhook ID. ID of the webhook. |

### `vehicle-events-unsubscribe-vehicle-action`

**Vehicle Events: Unsubscribe Vehicle.** Remove one vehicle (by Token ID) from a specific webhook (by Webhook ID) so it stops firing for that vehicle. A targeted mutation; pick this for a single vehicle, versus Unsubscribe All Vehicles to detach every vehicle from the webhook at once. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhookId` | string | yes |  | Webhook ID. ID of the webhook. |
| `tokenId` | number | yes |  | Vehicle Token ID. Token ID of the vehicle. |

### `vehicle-events-unsubscribe-all-vehicles-action`

**Vehicle Events: Unsubscribe All Vehicles.** Remove every subscribed vehicle from a given webhook (by Webhook ID) in one call, leaving the webhook itself intact. A bulk mutation; pick Unsubscribe Vehicle instead when you only need to detach a single vehicle. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `webhookId` | string | yes |  | Webhook ID. ID of the webhook. |

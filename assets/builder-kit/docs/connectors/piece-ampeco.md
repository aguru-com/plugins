# AMPECO

AMPECO piece provides integrations of APIs and webhook notifications of the AMPECO platform for managing EV charging infrastructure and operations.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-ampeco'
  version: '0.3.1'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Ampeco Platform

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `baseApiUrl` | string | yes |  | Base URL. |
| `token` | string | yes |  | API Token. Navigate to the API Access Tokens menu within your account.Click the Create API Access Token button to initiate the token creation process. |

## Actions

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

### `chargePointChangeAvailability`

**Actions - Charge Point - Change Availability.** Set a charge point (or a single connector via evseNetworkId) to Operative (charging allowed) or Inoperative (charging blocked). Idempotent: it sets an absolute availability state, so re-running with the same type leaves the same end state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `evseNetworkId` | number | no |  | Evse Network Id. The id of the connector for which availability needs to change. If missing the availability of the Charge Point and all its connectors needs to change. |
| `type` | string | yes |  | Type. The type of availability change that the Charge Point should perform * `Inoperative` Charge point is not available for charging. * `Operative` Charge point is available for charging. One of `"Inoperative"`, `"Operative"`. |

### `chargePointChangeOwner`

**Actions - Charge Point - Change Owner.** Reassign ownership of a personal charge point to the given user, or remove the owner when no user id is supplied. Use for transferring a home/personal charger between accounts. Setting the same owner twice yields the same end state, so it is effectively idempotent for a fixed user id. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `userId` | number | no |  | User ID. This User would become the owner of the personal charge point. If left empty - no Owner would be assigned. |

### `chargePointClearChargingProfile`

**Actions - Charge Point - Clear Charging Profile.** Send an OCPP ClearChargingProfile command to a charge point to remove charging profiles matching the supplied filters (profile id, connector/EVSE network id, purpose, stack level); omit filters to clear the overall ChargePointMaxProfile. This is a remote control command, not a local config change, and clears whatever currently matches, so repeating it with the same filters is effectively a no-op once profiles are gone. Use to lift charging limits or schedules previously set on a station. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `id` | number | no |  | Id. The ID of the charging profile to clear. |
| `evseNetworkId` | string | no |  | Evse Network Id. Specifies the ID of the connector for which to clear charging profiles. A connectorId of zero (0) specifies the charging profile for the overall Charge Point. Absence of this parameter means the clearing applies to all charging profiles that match the other criteria in the request. |
| `chargingProfilePurpose` | string | no |  | Charging Profile Purpose. Specifies to purpose of the charging profiles that will be cleared, if they meet the other criteria in the request. |
| `stackLevel` | number | no |  | Stack Level. Specifies the stackLevel for which charging profiles will be cleared, if they meet the other criteria in the request. |

### `chargePointGetDiagnostics`

**Actions - Charge Point - Get Diagnostics.** Send an OCPP GetDiagnostics command instructing a charge point to upload its diagnostics file to the given FTP location, optionally bounded by a start/stop date-time window. Use to collect device diagnostics for troubleshooting. Each call triggers a fresh upload, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `location` | string | yes |  | Location. FTP address to upload the diagnostics to. |
| `start` | ISO date-time string | no |  | Start. Only get diagnostics that are created after this date-time. |
| `stop` | ISO date-time string | no |  | Stop. Only get diagnostics that are created before that date-time. |

### `chargePointGetSecurityLog`

**Actions - Charge Point - Get Security Log.** Send an OCPP GetLog (security log) command instructing a charge point to upload its security log to the given remote URL, optionally bounded by a start/stop time window and with retry settings. Use to collect security/audit logs from a station for investigation. Each call triggers a fresh upload, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `url` | string | yes |  | URL. The URL of the location at the remote system where the log should be stored. |
| `reason` | string | yes |  | Reason. Reason kept in the action logs for future reference. |
| `retries` | number | no |  | Retries. This specifies how many times the Charge Point must try to upload the log before giving up. If this field is not present, it is left to Charge Point to decide how many times it wants to retry. |
| `interval` | number | no |  | Interval. The interval in seconds after which a retry may be attempted. If this field is not present, it is left to Charge Point to decide how long to wait between attempts. |
| `startTime` | string | no |  | Start Time. This contains the date and time of the oldest logging information to include in the diagnostics. Please provide the value in the following format `Y-m-d H:i:s`. |
| `stopTime` | string | no |  | Stop Time. This contains the date and time of the latest logging information to include in the diagnostics. Please provide the value in the following format `Y-m-d H:i:s`. |

### `chargePointMoveEvsesToSatellite`

**Actions - Charge Point - Move EVSEs To Satellite.** Reassign one or more EVSEs from this charge point to a specified satellite charge point. Use when restructuring how connectors are grouped across a master/satellite station topology. Once the EVSEs are moved, repeating the call for the same target is effectively a no-op, but mid-state retries can fail if an EVSE no longer belongs here, so treat it as a mutating operation. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `satelliteChargePointId` | number | yes |  | Satellite Charge Point Id. |
| `evseIds` | array | yes |  | EVSE Ids. |

### `chargePointReserve`

**Actions - Charge Point - Reserve.** Reserve a specific EVSE (connector) on a charge point for a given user so it is held for their upcoming session. Use when a driver wants to guarantee a connector before arriving. Each call creates a new reservation rather than reusing one, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `evse` | number | yes |  | Evse. |
| `userId` | number | yes |  | User Id. |
| `reason` | string | no |  | Reason. In case reason is empty, following text "Activated via API" will be added automatically. |

### `chargePointResetSecurityProfile`

**Actions - Charge Point - Reset Security Profile.** Clear the backend-stored OCPP security profile for a charge point so the next connection is accepted and the profile is re-learned from the actual connection used. Use to recover when a station can no longer connect because its security profile drifted from what the backend expects. Resetting an already-reset profile is effectively a no-op, so it is safe to retry. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |

### `chargePointReset`

**Actions - Charge Point - Reset.** Reboot a charge point, either a soft reset (restart the application) or a hard reset (full power cycle). Not idempotent: each call issues a new reboot command to the device. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `type` | string | yes |  | Type. One of `"hard"`, `"soft"`. |

### `chargePointSendDataTransfer`

**Actions - Charge Point - Send Data Transfer.** Send an OCPP DataTransfer message to a charge point carrying vendor-specific data, identified by a vendor id and optional message id and free-form data payload. Use to invoke proprietary/vendor extensions not covered by standard OCPP actions. Effects depend on the vendor implementation, so treat it as a non-idempotent command. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `vendorId` | string | yes |  | Vendor Id. The identifier of the vendor specific implementation. |
| `messageId` | string | no |  | Message Id. Additional identification field. |
| `data` | string | no |  | Data. Data without specified length or format. |

### `chargePointSetChargingProfile`

**Actions - Charge Point - Set Charging Profile.** Apply an OCPP smart-charging profile (purpose, kind, charging schedule with rate limits) to a charge point connector, optionally bound to a transaction. Effectively idempotent at a given stack level: re-sending the same profile at the same stackLevel overwrites it rather than stacking duplicates. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `evseNetworkId` | number | yes |  | Evse Network Id. |
| `chargePoint` | number | yes |  | Charge Point. |
| `transactionId` | number | no |  | Transaction Id. |
| `stackLevel` | number | yes |  | Stack Level. |
| `chargingProfilePurpose` | string | yes |  | Charging Profile Purpose. One of `"ChargePointMaxProfile"`, `"TxDefaultProfile"`, `"TxProfile"`. |
| `chargingProfileKind` | string | yes |  | Charging Profile Kind. One of `"Absolute"`, `"Recurring"`, `"Relative"`. |
| `recurrencyKind` | string | no |  | Recurrency Kind. One of `"Daily"`, `"Weekly"`. |
| `validFrom` | ISO date-time string | no |  | Valid From. |
| `validTo` | ISO date-time string | no |  | Valid To. |
| `chargingSchedule__id` | number | no |  | Charging Schedule - Id. |
| `chargingSchedule__duration` | number | no |  | Charging Schedule - Duration. |
| `chargingSchedule__startSchedule` | ISO date-time string | no |  | Charging Schedule - Start Schedule. |
| `chargingSchedule__chargingRateUnit` | string | yes |  | Charging Schedule - Charging Rate Unit. One of `"A"`, `"W"`. |
| `chargingSchedule__chargingSchedulePeriod` | array | yes |  | Charging Schedule - Charging Schedule Period. Each item: { `startPeriod`, `limit`, `numberPhases`? }. |
| `chargingSchedule__minChargingRate` | number | no |  | Charging Schedule - Min Charging Rate. |

### `chargePointStartChargingSessionWithoutEvse`

**Actions - Charge Point -  Start Charging Session Without EVSE.** Remotely start a charging session on a charge point without targeting a specific EVSE, letting the station pick the connector (an optional connectorId can be supplied). Use for single-connector stations or when the EVSE is not known in advance; prefer the start-charging-session action when you need to target a specific EVSE. Each call begins a new session, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `userId` | number | no |  | User Id. |
| `paymentMethodId` | string | no |  | Payment Method Id. The ID of the payment method, as returned by the payment method listing (User / Payment Method / Listing). When left empty or null, it would be determined by the system - either "balance" or "subscription" (in case the the user has an active post-paid subscription for home charging sessions and the… |
| `externalSessionId` | string | no |  | External Session Id. |
| `connectorId` | number | no |  | Connector Id. |
| `bookingId` | number | no |  | Booking Id. The ID of the booking to link the session to. Returns a 422 error if the booking does not exist or if its status is not Accepted or Reserved. |

### `chargePointStartChargingSession`

**Actions - Charge Point - Start Charging Session.** Remotely start a charging session on a specific EVSE of a charge point, optionally for a given user/payment method and with a full OCPP charging profile (schedule, limits, recurrence). Use when you need to target a particular connector; use start-charging-session-without-evse when the station should pick the connector. Each call begins a new session, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `evse` | number | yes |  | Evse. |
| `userId` | number | no |  | User Id. |
| `paymentMethodId` | string | no |  | Payment Method Id. The ID of the payment method, as returned by the payment method listing (User / Payment Method / Listing). When left empty or null, it would be determined by the system - either "balance" or "subscription" (in case the the user has an active post-paid subscription for home charging sessions and the… |
| `externalSessionId` | string | no |  | External Session Id. |
| `connectorId` | number | no |  | Connector Id. |
| `bookingId` | number | no |  | Booking Id. The ID of the booking to link the session to. Returns a 422 error if the booking does not exist or if its status is not Accepted or Reserved. |
| `chargingProfile__transactionId` | number | no |  | Charging Profile - Transaction Id. |
| `chargingProfile__stackLevel` | number | yes |  | Charging Profile - Stack Level. |
| `chargingProfile__chargingProfilePurpose` | string | yes |  | Charging Profile - Charging Profile Purpose. One of `"ChargePointMaxProfile"`, `"TxDefaultProfile"`, `"TxProfile"`. |
| `chargingProfile__chargingProfileKind` | string | yes |  | Charging Profile - Charging Profile Kind. One of `"Absolute"`, `"Recurring"`, `"Relative"`. |
| `chargingProfile__recurrencyKind` | string | no |  | Charging Profile - Recurrency Kind. One of `"Daily"`, `"Weekly"`. |
| `chargingProfile__validFrom` | ISO date-time string | no |  | Charging Profile - Valid From. |
| `chargingProfile__validTo` | ISO date-time string | no |  | Charging Profile - Valid To. |
| `chargingProfile__chargingSchedule__id` | number | no |  | Charging Profile - Charging Schedule - Id. |
| `chargingProfile__chargingSchedule__duration` | number | no |  | Charging Profile - Charging Schedule - Duration. |
| `chargingProfile__chargingSchedule__startSchedule` | ISO date-time string | no |  | Charging Profile - Charging Schedule - Start Schedule. |
| `chargingProfile__chargingSchedule__chargingRateUnit` | string | yes |  | Charging Profile - Charging Schedule - Charging Rate Unit. One of `"A"`, `"W"`. |
| `chargingProfile__chargingSchedule__chargingSchedulePeriod` | array | yes |  | Charging Profile - Charging Schedule - Charging Schedule Period. Each item: { `startPeriod`, `limit`, `numberPhases`? }. |
| `chargingProfile__chargingSchedule__minChargingRate` | number | no |  | Charging Profile - Charging Schedule - Min Charging Rate. |

### `chargePointStopChargingSession`

**Actions - Charge Point - Stop Charging Session.** Remotely stop an active charging session on a charge point by session id; set force=true to end it in the backend regardless of the charge point response. Use to terminate an in-progress charge. Stopping an already-stopped session is effectively a no-op, so it is safe to retry for a given session id. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `session` | number | yes |  | Session. |
| `force` | string | no |  | Force. Use force=true when you want to end the session reguardless of the CP response. One of `"true"`, `"false"`. |

### `chargePointSyncConfiguration`

**Actions - Charge Point - Sync Configuration.** Request the charge point to report its OCPP configuration, either for specific keys or all keys when none are listed, returning a request id you track via the sync-configuration notification. This is a read/sync query and does not change device settings (use set-configuration to write a key), so it is safe to repeat. Rarely needed since config syncs automatically on boot. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `keys` | array | no |  | Keys. List of keys to request a get configuration for. Omit or pass empty array to request all available configuration keys. |

### `chargePointTriggerMessageChargePoint`

**Actions - Charge Point - Trigger Message Charge Point.** Send an OCPP TriggerMessage command asking a charge point to immediately emit a chosen message such as BootNotification, StatusNotification, Heartbeat, MeterValues, or a certificate-signing request (several types apply only to OCPP 2.0.1 stations). Use to force an on-demand status/diagnostic report from a station. Each call prompts a fresh emission, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `type` | string | yes |  | Type. The type of the message to be triggered. Messages available only for 2.0.1 chargers - LogStatusNotification, PublishFirmwareStatusNotification, SignChargingStationCertificate, SignCombinedCertificate, TransactionEvent. One of `"BootNotification"`, `"DiagnosticsStatusNotification"`, `"LogStatusNotification"`, `"FirmwareStatusNotification"`, `"PublishFirmwareStatusNotification"`, `"Heartbeat"`, `"MeterValues"`, `"StatusNotification"`, `"SignV2GCertificate"`, `"SignChargingStationCertificate"`, `"SignCombinedCertificate"`, `"TransactionEvent"`. |

### `chargePointEvseUnlock`

**Actions - Charge Point - EVSE Unlock.** Send an OCPP UnlockConnector command to release the cable lock on a specific EVSE (connector) of a charge point. Use when a driver cannot remove their cable and the connector needs to be unlocked remotely. Unlocking an already-unlocked connector is harmless, so it is safe to retry. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `evse` | number | yes |  | Evse. |

### `chargePointChangeSharingCode`

**Actions - Charge Point - Change Sharing Code.** Set or clear the sharing code that grants non-owner users access to a personal charge point; passing an empty code deletes the current one. Use to manage guest access on a home/personal charger. Setting the same code repeatedly yields the same end state, so it is effectively idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `sharingCode` | string | no |  | Sharing Code. The sharing code which provides access to the personal charge point for other users aside from the owner. If left empty the current code will be deleted. |

### `chargePointDeleteCertificate`

**Actions - Charge Point - Delete Certificate.** Send an OCPP DeleteCertificate command to remove a certificate of the chosen type (e.g. V2GRootCertificate, CSMSRootCertificate, ManufacturerRootCertificate) from a charge point. Use to revoke or clean up PKI/ISO 15118 certificates on a station. Deleting an already-absent certificate is a no-op, so repeating it is effectively idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `certificateType` | string | yes |  | Certificate Type. Indicates the type of certificate that is to be installed on the CP. One of `"ChargingStationCertificate"`, `"V2GCertificate"`, `"V2GRootCertificate"`, `"MORootCertificate"`, `"CSMSRootCertificate"`, `"ManufacturerRootCertificate"`, `"V2GCertificateChain"`. |

### `chargePointInstallCertificate`

**Actions - Charge Point - Install Certificate.** Send an OCPP InstallCertificate command to install a root certificate of the chosen type (V2GRootCertificate, MORootCertificate, CSMSRootCertificate, or ManufacturerRootCertificate) onto a charge point. Use to provision PKI/ISO 15118 trust anchors on a station. Pair with the delete-certificate action to remove one. Re-installing the same certificate is not guaranteed safe to repeat, so treat as non-idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `certificateType` | string | yes |  | Certificate Type. Indicates the type of certificate that is to be installed on the CP. One of `"V2GRootCertificate"`, `"MORootCertificate"`, `"CSMSRootCertificate"`, `"ManufacturerRootCertificate"`. |

### `chargePointSetConfiguration`

**Actions - Charge Point - Set Configuration.** Send an OCPP ChangeConfiguration/SetVariables command writing a single configuration key (name) to a value on a charge point; OCPP 2.0.1 stations also accept component name, instance, and EVSE id. Use to change a station setting; use sync-configuration to read keys instead. Writing the same value yields the same end state, so it is effectively idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `value` | string | yes |  | Value. Value to be assigned to specific configuration key. |
| `name` | string | yes |  | Name. Name of the variable of the configuration key. |
| `instance` | string | no |  | Instance. Specify instance for OCPP 2.0.1 configuration keys. |
| `componentName` | string | no |  | Component Name. Required in order to specify component name for OCPP 2.0.1 configuration keys. |
| `evseId` | number | no |  | Evse Id. ID of the EVSE. Only for OCPP 2.0.1 configuration keys. |

### `chargePointGetInstalledCertificateIds`

**Actions - Charge Point - Get Installed Certificate Ids.** Send an OCPP GetInstalledCertificateIds request to a charge point to sync and retrieve the certificates currently installed, optionally filtered by certificate type (leave the type empty for all types). This is a read/sync query that does not change device state, so it is safe to repeat. Use to audit which PKI/ISO 15118 certificates a station holds. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `certificateType` | string | no |  | Certificate Type. Indicates the type of certificates requested. Default value to be empty - the system should interpret the Null/empty value that all certificate types are requested. One of `"V2GRootCertificate"`, `"MORootCertificate"`, `"CSMSRootCertificate"`, `"V2GCertificateChain"`, `"ManufacturerRootCertificate"`. |

### `chargePointUpdateFirmware`

**Actions - Charge Point - Update Firmware.** Send an OCPP UpdateFirmware command instructing a charge point to download and install firmware, from either a direct URL or a stored firmware version id (provide exactly one), with optional retrieve-after time, retry count/interval, and signed-update fields. This triggers a real firmware flash on the device, so it is not idempotent and should be sequenced carefully. Use to roll out firmware to a station. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `url` | string | no |  | URL. Location (URL) from which to retrieve the firmware. Either this or `firmwareVersionId` must be provided. |
| `firmwareVersionId` | number | no |  | Firmware Version Id. ID of a Firmware Version. Either this or `url` must be provided. |
| `retrieveAfter` | ISO date-time string | no |  | Retrieve After. Specifies the date and time after which the Charge Point should retrieve the new firmware. If not provided, the current *datetime* will be used. |
| `retries` | number | no |  | Retries. Specifies how many times the Charge Point must try to retrieve the (new) firmware before giving up. |
| `interval` | number | no |  | Interval. The interval in seconds between each retry. |
| `signed` | string | yes |  | Signed. Indicates a Signed Firmware Update. One of `"true"`, `"false"`. |
| `signingCertificate` | string | no |  | Signing Certificate. Required if "signed" is true. |
| `signature` | string | no |  | Signature. Required if "signed" is true. |
| `downloadUrlProtocol` | string | no |  | Download Url Protocol. Protocol to use for the firmware download URL when using firmware repository. Use HTTP only if the charge point does not support encrypted connections. One of `"http"`, `"https"`. |

### `chargePointDowntimePeriodsListing`

**Resources - Charge Point Downtime Periods - Listing.** List charge-point downtime periods, optionally filtered by charge point, location, entry mode (manual/automatic), type (downtime/exempt), duration, or start/stop/last-updated date ranges. Read-only and idempotent; enable Paginate Results to fetch all pages. To fetch one period by its ID use the downtime period read action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__chargePointId` | number | no |  | Filter - Charge Point Id. |
| `filter__locationId` | number | no |  | Filter - Location Id. |
| `filter__entryMode` | string | no |  | Filter - Entry Mode. One of `"manual"`, `"automatic"`. |
| `filter__type` | string | no |  | Filter - Type. One of `"downtime"`, `"exempt"`. |
| `filter__startedAfter` | ISO date-time string | no |  | Filter - Started After. ISO 8601 formatted date. Resources with `startedAt >= startedAfter`. |
| `filter__stoppedBefore` | ISO date-time string | no |  | Filter - Stopped Before. ISO 8601 formatted date. Resources with `stoppedAt <= stoppedBefore`. |
| `filter__durationLessThan` | number | no |  | Filter - Duration Less Than. Resources with duration in minutes less than or equal given value. |
| `filter__durationGreaterThan` | number | no |  | Filter - Duration Greater Than. Resources with duration in minutes greater than or equal given value. |
| `filter__lastUpdatedAfter` | ISO date-time string | no |  | Filter - Last Updated After. ISO 8601 formatted date. Lists only the specific resource that was last updated on and after this datetime. |
| `filter__lastUpdatedBefore` | ISO date-time string | no |  | Filter - Last Updated Before. ISO 8601 formatted date. Lists only the specific resource that was last updated on and before this datetime. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `chargePointDowntimePeriodCreate`

**Resources - Charge Point Downtime Periods - Create.** Create a manual exempt downtime period for a charge point over a given start/end window, referencing a notice. Not idempotent: each call creates another period, so re-running produces duplicates. The supplied notice must be of type exempt. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePointId` | number | yes |  | Charge Point Id. |
| `noticeId` | number | yes |  | Notice Id. Allowed only notice with `type = exempt`! |
| `startedAt` | ISO date-time string | yes |  | Started At. |
| `endedAt` | ISO date-time string | yes |  | Ended At. |

### `chargePointDowntimePeriodRead`

**Resources - Charge Point Downtime Periods - Read.** Retrieve a single charge-point downtime period by its numeric ID. Read-only and idempotent; use it when you already know the period ID. To search or enumerate periods (e.g. by charge point, type, or date range) use the downtime periods listing action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePointDowntimePeriod` | number | yes |  | Charge Point Downtime Period. |

### `chargePointDowntimePeriodUpdate`

**Resources - Charge Point Downtime Periods - Update.** Update an existing charge-point downtime period identified by its numeric ID, changing its notice and optionally its start/end times. Idempotent: re-applying the same values yields the same state. Editing startedAt/endedAt is only allowed for manual exempt periods (type = exempt and entryMode = manual). Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePointDowntimePeriod` | number | yes |  | Charge Point Downtime Period. |
| `noticeId` | number | no |  | Notice Id. |
| `startedAt` | ISO date-time string | no |  | Started At. Allowed only for downtime period with `type = exempt AND entryMode = manual`. |
| `endedAt` | ISO date-time string | no |  | Ended At. Allowed only for downtime period with `type = exempt AND entryMode = manual`. |

### `chargePointDowntimePeriodDelete`

**Resources - Charge Point Downtime Periods - Delete.** Delete a manually created charge-point downtime period by its numeric ID. Only manually created periods can be removed (automatically generated ones cannot). Effectively idempotent on the target but destructive and irreversible, so confirm the ID first. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePointDowntimePeriod` | number | yes |  | Charge Point Downtime Period. |

### `chargePointModelsListing`

**Resources - Charge Point Models - Listing.** List charge point models, optionally filtered by vendor ID. Read-only and idempotent. Enable the pagination option to fetch all models across pages; otherwise one page (up to per_page) is returned. Use this to discover a model ID before reading, updating, or deleting a specific model. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__vendorId` | string | no |  | Filter - Vendor Id. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `chargePointModelCreate`

**Resources - Charge Point Models - Create.** Create a new charge point model with a name and vendor ID (optional user/installer manual links). Not idempotent: each call creates a separate model, so re-running produces duplicates. Use Listing first to check for an existing model, and Update to modify one. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `vendorId` | number | yes |  | Vendor Id. |
| `userManual` | string | no |  | User Manual. A download link for the user manual. Shown in the mobile app for home chargers. |
| `installerManual` | string | no |  | Installer Manual. URL to an externally-hosted installer manual. The system stores this URL reference only (does not download or cache the document) and provides it to installers for viewing/downloading through the installer app interface. |

### `chargePointModelRead`

**Resources - Charge Point Models - Read.** Fetch a single charge point model by its numeric model ID. Read-only and idempotent. Use when you already know the model ID; otherwise use Listing to find it first. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `modelId` | number | yes |  | Model Id. |

### `chargePointModelUpdate`

**Resources - Charge Point Models - Update.** Partially update an existing charge point model (by model ID), changing only the fields you supply (name, vendor ID, user/installer manual links). Idempotent: applying the same values repeatedly leaves the model unchanged. Use this to modify an existing model rather than Create (which would make a duplicate). Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `modelId` | number | yes |  | Model Id. |
| `name` | string | no |  | Name. |
| `vendorId` | number | no |  | Vendor Id. |
| `userManual` | string | no |  | User Manual. A download link for the user manual. Shown in the mobile app for home chargers. |
| `installerManual` | string | no |  | Installer Manual. URL to an externally-hosted installer manual. The system stores this URL reference only (does not download or cache the document) and provides it to installers for viewing/downloading through the installer app interface. |

### `chargePointModelDelete`

**Resources - Charge Point Models - Delete.** Permanently delete a charge point model by its numeric model ID. Destructive: the first call removes the model, later calls for the same ID fail because it no longer exists. Use only when the model should be fully removed. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `modelId` | number | yes |  | Model Id. |

### `chargePointVendorsListing`

**Resources - Charge Point Vendors - Listing.** List charge-point vendor (manufacturer) reference records from the AMPECO catalog. Read-only and idempotent; use it to look up or enumerate available vendors, optionally auto-paginating across all pages when Paginate Results is enabled. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `chargePointVendorCreate`

**Resources - Charge Point Vendors - Create.** Create a new AMPECO charge-point vendor (manufacturer) with the given name. Not idempotent: each call creates a separate vendor record, so guard against duplicate names. Use the update action to rename an existing vendor. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |

### `chargePointVendorRead`

**Resources - Charge Point Vendors - Read.** Fetch a single AMPECO charge-point vendor (manufacturer) by its numeric vendor ID. Use when you already know the vendor ID. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vendorId` | number | yes |  | Vendor Id. |

### `chargePointVendorUpdate`

**Resources - Charge Point Vendors - Update.** Update an existing AMPECO charge-point vendor identified by its numeric vendor ID, currently to change its name. Idempotent: repeating the same payload leaves the vendor in the same final state. Use the create action to add a new vendor. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vendorId` | number | yes |  | Vendor Id. |
| `name` | string | no |  | Name. |

### `chargePointVendorDelete`

**Resources - Charge Point Vendors - Delete.** Permanently delete an AMPECO charge-point vendor by its numeric vendor ID. Destructive and cannot be undone; deleting an already-removed vendor will error. Confirm the vendor is no longer referenced before calling. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vendorId` | number | yes |  | Vendor Id. |

### `chargePointStatusRead`

**Resources - Charge Points - Charge Point Status Read.** Read the live operational status of one AMPECO charge point by its numeric ID. Read-only and safe to repeat; use this to check availability/connectivity rather than charge-point-read, which returns full configuration instead of status. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |

### `chargePointCreate`

**Resources - Charge Points - Charge Point Create.** Register a new charge point (public, private, or personal) with its name, status, location, and communication/network configuration. Not idempotent: each call creates a separate charge point, so guard against duplicates. Required fields vary by type (e.g. locationId for commercial chargers, pin for personal); to change an existing charge point use a dedicated update action instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `type` | string | yes |  | Type. `public` - a charge point visible on the map to everybody </br> `private` - by default hidden from the map and for private usage only - company and their employees for example. The visibility of the charge point could be managed in partner object, with the different options for accessType. </br> `p… One of `"private"`, `"public"`, `"personal"`. |
| `pin` | string | no |  | Pin. Required for personal charge points. The PIN should be provided in the mobile app when the charge point is claimed by a user. Should contain only numbers. |
| `locationId` | number | no |  | Location Id. locationId is always a REQUIRED field for commercial public and commercial private charge points. It is NOT a required field only for personal charge points. |
| `chargingZoneId` | number | no |  | Charging Zone Id. |
| `electricityRateId` | number | no |  | Electricity Rate Id. If there is Electricity rate set to the Charge point the electricity cost for each charging session would be tracked. Dynamic electricity rates could not be selected, only ones created in the resource / electricity-rate. |
| `subscription__required` | string | no |  | Subscription - Required. Only for personal charge points. Require an active subscription to use the charge point. One of `"true"`, `"false"`. |
| `subscription__planIds` | array | no |  | Subscription - Plan Ids. Only for personal charge points. List of subscription plans for any of which the user should have an active subscription, to be able to use the charge point. |
| `networkType` | string | no |  | Network Type. One of `"cellular"`, `"ethernet"`, `"wlan"`. |
| `status` | string | yes |  | Status. Shows the system status of the Charge Point. </br> `enabled` - the charge point is fully operative. `disabled` - the charge point would not be shown on the map if it is a commercial public or commercial private with the relevant option for visibility nor could be claimed or found by ID if it is per… One of `"enabled"`, `"disabled"`, `"out of order"`, `"demo"`. |
| `managedByOperator` | string | no |  | Managed By Operator. This flag indicates whether the operator can actively manage the charge point. If the flag is set to false' the charge point can still be shown to users, but they can't request to start a session on it. Deprecated. Please use 'communicationMode' instead. One of `"true"`, `"false"`. |
| `externalId` | string | no |  | External Id. |
| `network__id` | string | no |  | Network - Id. OCPP Identifier. |
| `network__protocol` | string | no |  | Network - Protocol. One of `"ocpp 1.5"`, `"ocpp 1.6"`, `"ocpp 1.6 soap"`, `"ocpp 2.0.1"`. |
| `network__password` | string | no |  | Network - Password. |
| `network__ip` | string | no |  | Network - Ip. Required for ocpp 1.5 (SOAP). |
| `network__port` | number | no |  | Network - Port. Required for ocpp 1.5 (SOAP). |
| `capabilities` | array | no |  | Capabilities. `remote_start_stop_capable` - whether Remote start/stop is possible for the Charge Point </br> `meter_values` - whether the Charge Point should send meter updates to the system </br> `stop_transaction_on_ev_disconnect` - for ongoing sessions, when the cable is unplugged this should stop the session… One of `"remote_start_stop_capable"`, `"meter_values"`, `"stop_transaction_on_ev_disconnect"`, `"disregard_the_heartbeats"`, `"display_messages"`. |
| `autoStartWithoutAuthorization` | string | no |  | Auto Start Without Authorization. One of `"true"`, `"false"`. |
| `disableAutoStartEmulation` | string | no |  | Disable Auto Start Emulation. One of `"true"`, `"false"`. |
| `security__desiredProfile` | number | no |  | Security - Desired Profile. The backend will try to set it 3 times at boot notification. If the charge point does not support it, the backend will use the highest security profile the charge point could use. </br> The following security profiles are supported: </br> 0: `No Authentication` </br> 1: `Unsecured Trasport with Bas… |
| `modelId` | number | no |  | Model Id. The ID of the CP Model, if one is associated with the Charge Point. Can be set to null to remove the current CP Model associated with the Charge Point. Mind that on boot the charger reports the hardware model and it is automatically updated. |
| `enableAutoFaultRecovery` | string | no |  | Enable Auto Fault Recovery. One of `"true"`, `"false"`. |
| `user__id` | number | no |  | User - Id. |
| `user__automaticFirmwareUpdatesEnabled` | string | no |  | User - Automatic Firmware Updates Enabled. One of `"true"`, `"false"`. |
| `partner__id` | number | no |  | Partner - Id. |
| `partner__contractId` | number | no |  | Partner - Contract Id. |
| `partner__contactId` | number | no |  | Partner - Contact Id. |
| `partner__corporateBillingAsDefault` | string | no |  | Partner - Corporate Billing As Default. The partner's corporate billing would be used as a payment method by default, when a user who is invited to use the partner's corporate billing starts a session on the charge point. One of `"true"`, `"false"`. |
| `partner__accessType` | string | no |  | Partner - Access Type. `private_view_private_use` - only users invited by the partner with the option to access private charge points could view this charge point on the map and use it. One of `"private_view_private_use"`, `"private_view_public_use"`, `"public_view_private_use"`. |
| `partner__notice` | array | no |  | Partner - Notice. The notice is only available if the charge point is of type `private` and the accessType is `public_view_private_use`. Each item: { `locale`?, `translation`? }. |
| `utilityId` | number | no |  | Utility Id. |
| `tags` | array | no |  | Tags. Tags can be used for filtering and grouping chargers by tag. When doing a PATCH input all tags that should be associated with the charge point. Omitting a tag would remove it from the charge point. |
| `sharingCode` | string | no |  | Sharing Code. |
| `enabledRandomisedDelay` | string | no |  | Enabled Randomised Delay. Applicable only for personal charge points. For `public` and `private` charge points will be omitted. One of `"true"`, `"false"`. |
| `noticeId` | number | no |  | Notice Id. If both noticeId and partner.notice object are provided in the request the noticeId will be used to complete the request NOT the partner.notice object! |
| `usesRenewableEnergy` | string | no |  | Uses Renewable Energy. When enabled, if no electricity rate is assigned to the charge point any roaming session will be marked as using renewable energy. The actual energy mix can be specified in an electricity rate, which can then be assigned to the charge point. In that case the energy mix will be provided for roaming … One of `"true"`, `"false"`. |
| `ocppConnectedChargePointId` | number | no |  | Ocpp Connected Charge Point Id. The ID of the charge point that is connected to the backend and used by this charge point for OCPP communication. Required when the `communicationMode` is `via_ocpp_connected_charge_point`. |
| `communicationMode` | string | no |  | Communication Mode. This property is required!</br> It obsoletes the `managedByOperator` property, which can still be used by older implementations, so neither is marked as required.</br> Indicates how the charge point communicates with the backend.</br> `none` - the charge point is not connected to the backend. The c… One of `"none"`, `"direct_ocpp"`, `"via_ocpp_connected_charge_point"`. |

### `chargePointsListing`

**Resources - Charge Points - Charge Points Listing.** List charge points across the account, with optional filters by type, network, location, user, partner, tag, model, external ID, and update window. Read-only and safe to repeat. Enable Paginate Results to fetch every match; to look up a single known charge point by ID use charge-point-read instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__desiredSecurityProfileStatus` | string | no |  | Filter - Desired Security Profile Status. The value of the desiredSecurityProfileStatus by which to filter. One of `"applied"`, `"pending"`, `"rejected"`. |
| `filter__evsePhysicalReference` | string | no |  | Filter - Evse Physical Reference. Only list charge point, identified by evse identifier. |
| `filter__networkId` | string | no |  | Filter - Network Id. Only list charge point, identified by the NetworkId. |
| `filter__bootNotificationSerialNumber` | string | no |  | Filter - Boot Notification Serial Number. Only list charge points with last boot notification that had this charge_point_serial_number. |
| `filter__modelId` | string | no |  | Filter - Model Id. Only list charge points, identified by modelId. |
| `filter__vendorId` | string | no |  | Filter - Vendor Id. Only list charge points, identified by vendorId. |
| `filter__userId` | string | no |  | Filter - User Id. Only list charge points owned by a certain user. |
| `filter__partnerId` | string | no |  | Filter - Partner Id. Only list charge points owned by a certain partner. |
| `filter__type` | string | no |  | Filter - Type. Only list charge points with this access type. One of `"public"`, `"private"`, `"personal"`. |
| `filter__subOperatorId` | string | no |  | Filter - Sub Operator Id. Only list charge point for a given subOperator. |
| `filter__roaming` | string | no |  | Filter - Roaming. When true - returns only roaming charge points. When false - returns only local charge points. |
| `filter__name` | string | no |  | Filter - Name. Exact charge point name. |
| `filter__locationId` | string | no |  | Filter - Location Id. Only list charge points assigned to the location. |
| `filter__circuitId` | number | no |  | Filter - Circuit Id. Only list charge points added to a certain DLM Circuit. |
| `filter__chargingZoneId` | string | no |  | Filter - Charging Zone Id. Only list charge point for a given Charging Zone. |
| `filter__managedByOperator` | string | no |  | Filter - Managed By Operator. Only list charge points that are managed by operator or not. |
| `filter__externalId` | string | no |  | Filter - External Id. Only list charge point, identified by the External ID of the charge point. |
| `filter__utilityId` | number | no |  | Filter - Utility Id. |
| `filter__tag` | string | no |  | Filter - Tag. Only list charge points that have the specific tag assigned. |
| `filter__sharingCode` | string | no |  | Filter - Sharing Code. Only list personal charge point with certain sharing code. |
| `filter__lastUpdatedAfter` | ISO date-time string | no |  | Filter - Last Updated After. ISO 8601 formatted date. Lists only the specific resource that was last updated on and after this datetime. |
| `filter__lastUpdatedBefore` | ISO date-time string | no |  | Filter - Last Updated Before. ISO 8601 formatted date. Lists only the specific resource that was last updated on and before this datetime. |
| `include` | array | no |  | Include. One of `"lastBootNotification"`, `"chargingProfile"`, `"smartCharging"`, `"smartChargingPreferences"`, `"personalSmartChargingPreferences"`, `"availablePersonalSmartChargingModes"`. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `chargePointUpdate`

**Resources - Charge Points - Charge Point Update.** Update an existing charge point by its numeric ID, changing fields such as name, type (public/private/personal), status, location, network, capabilities, partner, and smart-charging settings. Only the fields you supply are modified. Note tags are replaced wholesale on PATCH: any tag you omit is removed from the charge point. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `include` | array | no |  | Include. One of `"lastBootNotification"`, `"chargingProfile"`, `"smartCharging"`, `"smartChargingPreferences"`, `"personalSmartChargingPreferences"`, `"availablePersonalSmartChargingModes"`. |
| `name` | string | no |  | Name. |
| `type` | string | no |  | Type. `public` - a charge point visible on the map to everybody </br> `private` - by default hidden from the map and for private usage only - company and their employees for example. The visibility of the charge point could be managed in partner object, with the different options for accessType. </br> `p… One of `"private"`, `"public"`, `"personal"`. |
| `pin` | string | no |  | Pin. Required if `accessType` is `personal`. The PIN should be provided in the mobile app when the charge point is claimed by a user. Should contain only numbers. |
| `locationId` | number | no |  | Location Id. Required if `accessType` is `public` or `private`. NOT required if `accessType` is `personal`. |
| `chargingZoneId` | number | no |  | Charging Zone Id. |
| `electricityRateId` | number | no |  | Electricity Rate Id. If there is Electricity rate set to the Charge point the electricity cost for each charging session would be tracked. Dynamic electricity rates could not be selected, only ones created in the resource / electricity-rate. |
| `subscription__required` | string | no |  | Subscription - Required. Only for personal charge points. Require an active subscription to use the charge point. One of `"true"`, `"false"`. |
| `subscription__planIds` | array | no |  | Subscription - Plan Ids. Only for personal charge points. List of subscription plans for any of which the user should have an active subscription, to be able to use the charge point. |
| `networkType` | string | no |  | Network Type. One of `"cellular"`, `"ethernet"`, `"wlan"`. |
| `status` | string | no |  | Status. Shows the system status of the Charge Point. * `enabled` - the charge point is fully operative. * `disabled` - the charge point would not be shown on the map if it is a commercial public or commercial private with the relevant option for visibility nor could be claimed or found by ID if it is perso… One of `"enabled"`, `"disabled"`, `"out of order"`, `"demo"`. |
| `managedByOperator` | string | no |  | Managed By Operator. This flag indicates whether the operator can actively manage the charge point. If the flag is set to 'false' the charge point can still be shown to users, but they can't request to start a session on it. Deprecated. Please use `communicationMode` instead. The `communicationMode` can only be set whe… One of `"true"`, `"false"`. |
| `externalId` | string | no |  | External Id. |
| `network__id` | string | no |  | Network - Id. OCPP Identifier. |
| `network__protocol` | string | no |  | Network - Protocol. One of `"ocpp 1.5"`, `"ocpp 1.6"`, `"ocpp 1.6 soap"`, `"ocpp 2.0.1"`. |
| `network__password` | string | no |  | Network - Password. |
| `network__ip` | string | no |  | Network - Ip. Required for ocpp 1.5 (SOAP). |
| `network__port` | number | no |  | Network - Port. Required for ocpp 1.5 (SOAP). |
| `capabilities` | array | no |  | Capabilities. `remote_start_stop_capable` - whether Remote start/stop is possible for the Charge Point </br> `meter_values` - whether the Charge Point should send meter updates to the system </br> `stop_transaction_on_ev_disconnect` - for ongoing sessions, when the cable is unplugged this should stop the session… One of `"remote_start_stop_capable"`, `"meter_values"`, `"stop_transaction_on_ev_disconnect"`, `"disregard_the_heartbeats"`, `"display_messages"`. |
| `autoStartWithoutAuthorization` | string | no |  | Auto Start Without Authorization. When enabled the system would allow charging sessions initiated </br> locally by the charge point assuming it is setup to work in auto-start / </br> plug-and-charge mode. It would also automatically start a </br> session with a remote start command if one is not already started by the charging stat… One of `"true"`, `"false"`. |
| `disableAutoStartEmulation` | string | no |  | Disable Auto Start Emulation. The Auto-start option above does 2 things: (1) it allows charging </br> sessions started by the charge point assuming that it may be set up locally </br> to auto-start charging when a vehicle is connected and (2) if the charging </br> station doesnt start the session within a few seconds after the … One of `"true"`, `"false"`. |
| `security__desiredProfile` | number | no |  | Security - Desired Profile. The backend will try to set it 3 times at boot notification. If the charge point does not support it, the backend will use the highest security profile the charge point could use. </br> The following security profiles are supported: </br> 0: `No Authentication` </br> 1: `Unsecured Trasport with Bas… |
| `modelId` | number | no |  | Model Id. The ID of the CP Model, if one is associated with the Charge Point. Can be set to null to remove the current CP Model associated with the Charge Point. Mind that on boot the charger reports the hardware model and it is automatically updated. |
| `enableAutoFaultRecovery` | string | no |  | Enable Auto Fault Recovery. One of `"true"`, `"false"`. |
| `user__id` | number | no |  | User - Id. |
| `user__automaticFirmwareUpdatesEnabled` | string | no |  | User - Automatic Firmware Updates Enabled. One of `"true"`, `"false"`. |
| `partner__id` | number | no |  | Partner - Id. |
| `partner__contractId` | number | no |  | Partner - Contract Id. |
| `partner__contactId` | number | no |  | Partner - Contact Id. |
| `partner__corporateBillingAsDefault` | string | no |  | Partner - Corporate Billing As Default. The partner's corporate billing would be used as a payment method by default, when a user who is invited to use the partner's corporate billing starts a session on the charge point. One of `"true"`, `"false"`. |
| `partner__accessType` | string | no |  | Partner - Access Type. `private_view_private_use` - only users invited by the partner with the option to access private charge points could view this charge point on the map and use it. One of `"private_view_private_use"`, `"private_view_public_use"`, `"public_view_private_use"`. |
| `partner__notice` | array | no |  | Partner - Notice. The notice is only available if the charge point is of type `private` and the accessType is `public_view_private_use`. Each item: { `locale`?, `translation`? }. |
| `utilityId` | number | no |  | Utility Id. |
| `tags` | array | no |  | Tags. Tags can be used for filtering and grouping chargers by tag. When doing a PATCH input all tags that should be associated with the charge point. Omitting a tag would remove it from the charge point. |
| `enabledRandomisedDelay` | string | no |  | Enabled Randomised Delay. Applicable only for personal charge points. For `public` and `private` charge points will be omitted. One of `"true"`, `"false"`. |
| `noticeId` | number | no |  | Notice Id. If both noticeId and partner.notice object are provided in the request the noticeId will be used to complete the request NOT the partner.notice object! |
| `usesRenewableEnergy` | string | no |  | Uses Renewable Energy. When enabled, if no electricity rate is assigned to the charge point any roaming session will be marked as using renewable energy. The actual energy mix can be specified in an electricity rate, which can then be assigned to the charge point. In that case the energy mix will be provided for roaming … One of `"true"`, `"false"`. |
| `integratedAt` | ISO date-time string | no |  | Integrated At. ISO 8601 formatted date. |
| `manufacturedAt` | ISO date-time string | no |  | Manufactured At. ISO 8601 formatted date. |

### `chargePointRead`

**Resources - Charge Points - Charge Point Read.** Fetch the full configuration of a single charge point by its numeric ID, optionally expanding related data such as smart charging or last boot notification via Include. Read-only and safe to repeat. For just the live availability use charge-point-status-read; to scan or filter many charge points use charge-points-listing. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `include` | array | no |  | Include. One of `"lastBootNotification"`, `"chargingProfile"`, `"smartCharging"`, `"smartChargingPreferences"`, `"personalSmartChargingPreferences"`, `"availablePersonalSmartChargingModes"`. |

### `chargePointDelete`

**Resources - Charge Points - Charge Point Delete.** Permanently delete a charge point by its numeric ID. Destructive and irreversible; once removed a repeat call will fail because the charge point no longer exists. Confirm the correct ID first, e.g. via charge-point-read. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `include` | array | no |  | Include. One of `"lastBootNotification"`, `"chargingProfile"`, `"smartCharging"`, `"smartChargingPreferences"`, `"personalSmartChargingPreferences"`, `"availablePersonalSmartChargingModes"`. |

### `chargePointAvailablePersonalSmartChargingModesListing`

**Resources - Charge Points - Available Personal Smart Charging Modes Listing.** List the personal smart-charging modes that a given charge point supports, by charge point ID. Read-only and safe to retry. Use this to discover valid modes before setting them with the personal-smart-charging-preferences update action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |

### `chargePointConfigurationsListing`

**Resources - Charge Points - Charge Point Configurations Listing.** List the cached OCPP configuration keys for a charge point (by charge point ID), with optional filters by name, instance, component name, or EVSE ID. Read-only and safe to retry; returns the values already cached by the platform rather than re-reading the device. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `filter__name` | string | no |  | Filter - Name. Only list configuration keys identified by variable name. |
| `filter__instance` | string | no |  | Filter - Instance. Only list configuration keys identified by instance. |
| `filter__componentName` | string | no |  | Filter - Component Name. Only list configuration keys identified by component name. |
| `filter__evseId` | number | no |  | Filter - Evse Id. Only list configuration keys identified by EVSE ID. |

### `chargePointConfigurationRead`

**Resources - Charge Points - Charge Point Configuration Read.** Read a single cached OCPP configuration value from a charge point by its ID and the configuration key name. Read-only and idempotent; returns the cached value rather than querying the device live. Use when you need one specific configuration setting for a known charge point. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `key` | string | yes |  | Key. |

### `chargePointConfigurationUpdate`

**Resources - Charge Points - Charge Point Configuration Update.** Set a single OCPP configuration key on a charge point, identified by charge point ID and configuration key. The new value is pushed live to the hardware, so this is a real mutation (not idempotent-safe to blindly retry) and fails with 406 if the device rejects it. A value is required for standard OCPP keys. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `key` | string | yes |  | Key. |
| `value` | string | no |  | Value. This field is required when the configuration key is one of the standard OCPP keys, as defined in the OCPP documentation under "Standard Configuration Key Names & Values". |

### `chargePointEvseCreate`

**Resources - Charge Points - Charge Point Evse Create.** Add a new EVSE to a charge point, given the charge point ID, a physical reference, current type (AC/DC), network ID, and status, plus optional power and tariff settings. This is a mutating create that adds an EVSE each call, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `physicalReference` | string | yes |  | Physical Reference. The identifier that is presented to the users, so they can identify the EVSE at the location. |
| `currentType` | string | yes |  | Current Type. Type of current available on the EVSE: - **ac**: Alternating Current (AC) charging - **dc**: Direct Current (DC) fast charging. One of `"ac"`, `"dc"`. |
| `label` | string | no |  | Label. The EVSE label will be exposed and visualized in the mobile application. |
| `networkId` | string | yes |  | Network Id. The OCPP evse identifier (should be consecutive numbers starting from 1) |
| `status` | string | yes |  | Status. For roaming EVSEs the status can only be updated if the option for manual management of EVSEs is enabled for the roaming CPO. One of `"enabled"`, `"disabled"`, `"out of order"`. |
| `midMeterCertificationEndYear` | number | no |  | Mid Meter Certification End Year. The mid meter certification end year. |
| `tariffGroupId` | number | no |  | Tariff Group Id. The ID of the tariff group attached to the EVSE. If the EVSE is not roaming and tariffGroupId is not specified, the default (free) tariff will be assigned. For roaming EVSEs the Tariff Group can only be updated if the option for manual management of EVSEs is enabled for the roaming CPO. |
| `allowsReservation` | string | no |  | Allows Reservation. Manages whether reservations are allowed on this EVSE. Requires the Reservations to be activated for the system in order to enable for the EVSE. One of `"true"`, `"false"`. |
| `bookingEnabled` | string | no |  | Booking Enabled. Indicates if the EVSE can be booked. Requires the Bookings to be activated for the operator and automatically enables allowsReservation when set to true. One of `"true"`, `"false"`. |
| `powerOptions__maxPower` | number | no |  | Power Options - Max Power. in Wh. |
| `powerOptions__maxVoltage` | string | no |  | Power Options - Max Voltage. The maxVoltage of a charge point can fluctuate. Hence, when creating a charge point in the system, the maxVoltage is given as a range. For OCPI purposes it maps as follows: 220-240 = 230 110-130 = 120 400 = 400 380 = 380. One of `"230"`, `"380"`, `"400"`, `"480"`, `"120"`, `"208"`, `"240"`, `"110-130"`, `"220-240"`. |
| `powerOptions__maxAmperage` | number | no |  | Power Options - Max Amperage. |
| `powerOptions__phases` | string | no |  | Power Options - Phases. One of `"single_phase"`, `"three_phase"`, `"split_phase"`. |
| `powerOptions__phaseRotation` | string | no |  | Power Options - Phase Rotation. `R` stands for `L1`, </br> `S` - for `L2` </br> `T` - for `L3` </br> So for example `RST` = `L1`, `L2`, `L3`, while `RTS` = `L1`, `L3`, `L2`, etc. One of `"RST"`, `"RTS"`, `"SRT"`, `"STR"`, `"TRS"`, `"TSR"`. |
| `powerOptions__connectedPhase` | string | no |  | Power Options - Connected Phase. Specifies the active line conductors used in the circuit. - `L1_L2` - Valid when `phases` = `split_phase` in electrical configuration `star` or `phases` = `single_phase` in electrical configuration `delta` - `L2_L3` - Valid when `phases` = `split_phase` in electrical configuration `star` or `phases… One of `"L1"`, `"L2"`, `"L3"`, `"L1_L2"`, `"L1_L3"`, `"L2_L3"`. |
| `externalId` | string | no |  | External Id. |

### `chargePointEvsesListing`

**Resources - Charge Points - Charge Point Evses Listing.** List the EVSEs (charging units) belonging to a given charge point, optionally including related charging profile or connector data. Read-only and idempotent; enable Paginate Results to fetch every page, or leave it off for a single page (up to per_page, max 100). Use to discover an EVSE ID before updating it. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `include` | array | no |  | Include. One of `"chargingProfile"`, `"connectors"`. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `chargePointEvseUpdate`

**Resources - Charge Points - Charge Point Evse Update.** Update an individual EVSE within a charge point (by charge point ID and EVSE ID), changing fields such as physical reference, current type, label, status, tariff group, reservation/booking flags, and power options. Only supplied fields change; idempotent on the given values. Note roaming EVSEs only accept status/tariff changes when manual EVSE management is enabled for the CPO. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `evse` | number | yes |  | Evse. |
| `include` | array | no |  | Include. One of `"chargingProfile"`, `"connectors"`. |
| `physicalReference` | string | no |  | Physical Reference. The identifier that is presented to the users, so they can identify the EVSE at the location. |
| `currentType` | string | no |  | Current Type. Type of current available on the EVSE: - **ac**: Alternating Current (AC) charging - **dc**: Direct Current (DC) fast charging. One of `"ac"`, `"dc"`. |
| `label` | string | no |  | Label. The EVSE label will be exposed and visualized in the mobile application. |
| `networkId` | string | no |  | Network Id. The OCPP evse identifier (should be consecutive numbers starting from 1) |
| `status` | string | no |  | Status. For roaming EVSEs the status can only be updated if the option for manual management of EVSEs is enabled for the roaming CPO. One of `"enabled"`, `"disabled"`, `"out of order"`. |
| `midMeterCertificationEndYear` | number | no |  | Mid Meter Certification End Year. The mid meter certification end year. |
| `tariffGroupId` | number | no |  | Tariff Group Id. The ID of the tariff group attached to the EVSE. If the EVSE is not roaming and tariffGroupId is not specified, the default (free) tariff will be assigned. For roaming EVSEs the Tariff Group can only be updated if the option for manual management of EVSEs is enabled for the roaming CPO. |
| `allowsReservation` | string | no |  | Allows Reservation. Manages whether reservations are allowed on this EVSE. Requires the Reservations to be activated for the system in order to enable for the EVSE. One of `"true"`, `"false"`. |
| `bookingEnabled` | string | no |  | Booking Enabled. Indicates if the EVSE can be booked. Requires the Bookings to be activated for the operator and automatically enables allowsReservation when set to true. One of `"true"`, `"false"`. |
| `powerOptions__maxPower` | number | no |  | Power Options - Max Power. in Wh. |
| `powerOptions__maxVoltage` | string | no |  | Power Options - Max Voltage. The maxVoltage of a charge point can fluctuate. Hence, when creating a charge point in the system, the maxVoltage is given as a range. For OCPI purposes it maps as follows: 220-240 = 230 110-130 = 120 400 = 400 380 = 380. One of `"230"`, `"380"`, `"400"`, `"480"`, `"120"`, `"208"`, `"240"`, `"110-130"`, `"220-240"`. |
| `powerOptions__maxAmperage` | number | no |  | Power Options - Max Amperage. |
| `powerOptions__phases` | string | no |  | Power Options - Phases. One of `"single_phase"`, `"three_phase"`, `"split_phase"`. |
| `powerOptions__phaseRotation` | string | no |  | Power Options - Phase Rotation. `R` stands for `L1`, </br> `S` - for `L2` </br> `T` - for `L3` </br> So for example `RST` = `L1`, `L2`, `L3`, while `RTS` = `L1`, `L3`, `L2`, etc. One of `"RST"`, `"RTS"`, `"SRT"`, `"STR"`, `"TRS"`, `"TSR"`. |
| `powerOptions__connectedPhase` | string | no |  | Power Options - Connected Phase. Specifies the active line conductors used in the circuit. - `L1_L2` - Valid when `phases` = `split_phase` in electrical configuration `star` or `phases` = `single_phase` in electrical configuration `delta` - `L2_L3` - Valid when `phases` = `split_phase` in electrical configuration `star` or `phases… One of `"L1"`, `"L2"`, `"L3"`, `"L1_L2"`, `"L1_L3"`, `"L2_L3"`. |
| `externalId` | string | no |  | External Id. |

### `chargePointEvseRead`

**Resources - Charge Points - Charge Point Evse Read.** Fetch a single EVSE on a charge point by charge point ID and EVSE ID, optionally including its charging profile and connectors. Read-only and safe to retry. Use when you already know the EVSE ID rather than listing all EVSEs. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `evse` | number | yes |  | Evse. |
| `include` | array | no |  | Include. One of `"chargingProfile"`, `"connectors"`. |

### `chargePointEvseDelete`

**Resources - Charge Points - Charge Point Evse Delete.** Permanently delete an EVSE from a charge point, identified by charge point ID and EVSE ID. Destructive and not reversible; a repeat call on an already-deleted EVSE will fail rather than succeed silently. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `evse` | number | yes |  | Evse. |
| `include` | array | no |  | Include. One of `"chargingProfile"`, `"connectors"`. |

### `chargePointEvseConnectorsListing`

**Resources - Charge Points - Charge Point Evse Connectors Listing.** List all connectors belonging to a specific charge point EVSE, identified by charge point ID and EVSE ID. Read-only and safe to retry. Use the connector-read action when you already know a single connector ID. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `evse` | number | yes |  | Evse. |

### `chargePointEvseConnectorCreate`

**Resources - Charge Points - Charge Point Evse Connector Create.** Add a new connector to a charge point EVSE, given the charge point ID, EVSE ID, and a required connector type (plus optional format and status). This is a mutating create that adds a connector each call, so it is not idempotent; use the connector-update action to change an existing connector. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `evse` | number | yes |  | Evse. |
| `type` | string | yes |  | Type. Type of connector available on the EVSE: - **type1**: Type 1 connector (SAE J1772 AC) - **type2**: Type 2 connector (IEC 62196-2 AC) - **type3**: Type 3 connector (IEC 62196-2 AC) - **chademo**: CHAdeMO DC fast charging - **ccs1**: Combined Charging System 1 (CCS1/Combo 1) - **ccs2**: Combined Char… One of `"type1"`, `"type2"`, `"type3"`, `"chademo"`, `"ccs1"`, `"ccs2"`, `"schuko"`, `"nacs"`, `"cee16"`, `"cee32"`, `"j1772"`, `"inductive"`, `"nema-5-20"`, `"type-e-french"`, `"type-g-british"`, `"type-j-swiss"`, `"avcon"`, `"gb-t-ac"`, `"gb-t-dc"`, `"chaoji"`, `"nema-6-30"`, `"nema-6-50"`. |
| `format` | string | no |  | Format. One of `"socket"`, `"cable"`. |
| `status` | string | no |  | Status. One of `"enabled"`, `"disabled"`. |

### `chargePointEvseConnectorRead`

**Resources - Charge Points - Charge Point Evse Connector Read.** Fetch a single connector on a charge point EVSE by charge point ID, EVSE ID, and connector ID. Read-only and safe to retry. Use when you already know the connector ID; to enumerate all connectors of an EVSE use the connectors listing action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `evse` | number | yes |  | Evse. |
| `connector` | number | yes |  | Connector. |

### `chargePointEvseConnectorUpdate`

**Resources - Charge Points - Charge Point Evse Connector Update.** Update an existing connector on a charge point EVSE (by charge point ID, EVSE ID, and connector ID), changing its type, format, or status. Only the fields you supply are changed. Use the connector-create action to add a new connector rather than to modify one. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `evse` | number | yes |  | Evse. |
| `connector` | number | yes |  | Connector. |
| `type` | string | no |  | Type. Type of connector available on the EVSE: - **type1**: Type 1 connector (SAE J1772 AC) - **type2**: Type 2 connector (IEC 62196-2 AC) - **type3**: Type 3 connector (IEC 62196-2 AC) - **chademo**: CHAdeMO DC fast charging - **ccs1**: Combined Charging System 1 (CCS1/Combo 1) - **ccs2**: Combined Char… One of `"type1"`, `"type2"`, `"type3"`, `"chademo"`, `"ccs1"`, `"ccs2"`, `"schuko"`, `"nacs"`, `"cee16"`, `"cee32"`, `"j1772"`, `"inductive"`, `"nema-5-20"`, `"type-e-french"`, `"type-g-british"`, `"type-j-swiss"`, `"avcon"`, `"gb-t-ac"`, `"gb-t-dc"`, `"chaoji"`, `"nema-6-30"`, `"nema-6-50"`. |
| `format` | string | no |  | Format. One of `"socket"`, `"cable"`. |
| `status` | string | no |  | Status. One of `"enabled"`, `"disabled"`. |

### `chargePointEvseConnectorDelete`

**Resources - Charge Points - Charge Point Evse Connector Delete.** Permanently delete a connector from a charge point EVSE, identified by charge point ID, EVSE ID, and connector ID. Destructive and not reversible; repeating on an already-deleted connector will fail. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `evse` | number | yes |  | Evse. |
| `connector` | number | yes |  | Connector. |

### `listChargePointHardwareStatusLogs`

**Resources - Charge Points - List Charge Point Hardware Status Logs.** Retrieve historical hardware status log entries for a charge point, optionally filtered to a created-after/created-before window. Read-only and safe to retry. Use this for a time range or full history; for only the single most recent entry use the latest-hardware-status-log action instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `filter__createdAfter` | ISO date-time string | no |  | Filter - Created After. ISO 8601 formatted date. Only list status logs created after this datetime. |
| `filter__createdBefore` | ISO date-time string | no |  | Filter - Created Before. ISO 8601 formatted date. Only list status logs created before this datetime. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `getChargePointLatestHardwareStatusLog`

**Resources - Charge Points - Get Charge Point Latest Hardware Status Log.** Fetch only the single most recent hardware status log entry for a charge point, by charge point ID. Read-only and safe to retry. Use this for a current-state snapshot; to get a time range or full history use the hardware-status-logs listing action instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |

### `getChargePointLatestNetworkStatusLog`

**Resources - Charge Points - Get Charge Point Latest Network Status Log.** Fetch the single most recent network (connectivity) status log entry for a charge point, by charge point ID. Read-only and safe to retry. This covers network/online status; use the latest-hardware-status-log action for the hardware/OCPP status snapshot. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |

### `listChargePointNetworkStatusLogs`

**Resources - Charge Points - List Charge Point Network Status Logs.** List the network (online/offline) status log entries for a given charge point, optionally bounded by a created-after/created-before date range. Read-only and idempotent; enable Paginate Results to fetch every page, or leave it off for a single page (up to per_page, max 100). Use to audit connectivity history for one charge point. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `filter__createdAfter` | ISO date-time string | no |  | Filter - Created After. ISO 8601 formatted date. Only list status logs created after this datetime. |
| `filter__createdBefore` | ISO date-time string | no |  | Filter - Created Before. ISO 8601 formatted date. Only list status logs created before this datetime. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `chargePointPersonalSmartChargingPreferencesRead`

**Resources - Charge Points - Charge Point Personal Smart Charging Preferences Read.** Read the currently configured personal smart-charging preferences for a charge point, by charge point ID. Read-only and safe to retry. Use the matching update action to change these preferences, and the available-modes listing to see which modes can be set. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |

### `personalSmartChargingPreferencesUpdate`

**Resources - Charge Points - Personal Smart Charging Preferences Update.** Set the personal smart-charging preferences for a charge point (by charge point ID). Pick the variant type first (e.g. user-controlled schedule, solar, Octopus Agile/Go, NordPool, electricity rate, or disabled), which determines the required preference fields. This overwrites the current preferences and applies them to the device, so it is a mutating call. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `requestBody_VariantType` | string | yes |  | Request Body Variant Type. Select the type of the variant. One of `"1"`, `"2"`, `"3"`, `"4"`, `"5"`, `"6"`, `"7"`, `"8"`. |
| `requestBody` | object | yes |  | Request Body. An object whose fields depend on other inputs; the product shows them. |

### `chargePointSharedPartnersListing`

**Resources - Charge Points - Charge Point Shared Partners Listing.** List the partners a specific charge point is shared with, identified by its numeric charge point ID. Read-only and safe to retry; enable pagination to fetch all results across pages rather than a single page. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `chargePointSharedPartnersSync`

**Resources - Charge Points - Charge Point Shared Partners Sync.** Replace the full set of shared partners on a private charge point with the provided partner IDs (a sync, not an append). The charge point must already have an owner and access_type "private". Repeating the same partner list is idempotent, but omitted partners are removed, so always send the complete desired list. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `partnerIds` | array | yes |  | Partner Ids. |

### `chargePointShareCreate`

**Resources - Charge Points - Charge Point Share Create.** Grant a user access to a charge point by creating a new share, given the charge point ID and the user ID. This is a mutating create that adds a new share each call, so it is not idempotent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `userId` | number | yes |  | User Id. |

### `chargePointSharesListing`

**Resources - Charge Points - Charge Point Shares Listing.** List the shares (shared-access grants) for a given charge point. Read-only and idempotent; enable Paginate Results to fetch every page, or leave it off for a single page (up to per_page, max 100). Use to discover a share ID before deleting a specific share. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `chargePointShareRead`

**Resources - Charge Points - Charge Point Share Read.** Fetch a single charge point share by its charge point ID and share ID. Read-only and safe to retry. Use when you already know the share ID; to enumerate who a charge point is shared with use the shared-partners listing action instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `share` | number | yes |  | Share. |

### `charegPointShareDelete`

**Resources - Charge Points - Chareg Point Share Delete.** Permanently remove a share from a charge point, identified by the charge point ID and the share ID, revoking that shared access. Destructive and irreversible; effectively idempotent since deleting an already-removed share has no further effect, though it may return a not-found error. Confirm both IDs before calling. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `share` | number | yes |  | Share. |

### `chargePointSmartChargingUpdate`

**Resources - Charge Points - Charge Point Smart Charging Update.** Configure a charge point's smart charging settings, selecting a mode (tod time-of-day, dynamic, user_schedule, or disabled) that determines which electrical and scheduling fields apply. Replaces the existing smart charging configuration for the charge point, so re-sending the same payload is idempotent; required fields differ per mode. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePoint` | number | yes |  | Charge Point. |
| `mode` | string | yes |  | Mode. Select the mode. One of `"tod"`, `"dynamic"`, `"user_schedule"`, `"disabled"`. |
| `requestBody` | object | yes |  | Request Body. An object whose fields depend on other inputs; the product shows them. |

### `circuitAttachChargePoint`

**Actions - Circuit - Attach Charge Point.** Attach a charge point to a circuit for dynamic load management, optionally with an initial priority. Only charge points whose electrical configuration matches the circuit can be attached, otherwise the call is rejected. Use circuit-detach-charge-point to reverse. Idempotent: attaching an already-attached charge point leaves it on the circuit. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `circuit` | number | yes |  | Circuit. |
| `chargePointId` | number | yes |  | Charge Point Id. |
| `priority` | number | no |  | Priority. |

### `circuitDetachChargePoint`

**Actions - Circuit - Detach Charge Point.** Remove a charge point from a circuit's dynamic load management, addressed by circuit and charge point IDs. Inverse of circuit-attach-charge-point. Idempotent: detaching a charge point that is not on the circuit has no further effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `circuit` | number | yes |  | Circuit. |
| `chargePoint` | number | yes |  | Charge Point. |

### `circuitSetChargePointPriority`

**Actions - Circuit - Set Charge Point Priority.** Set the dynamic-load-management priority for an entire charge point within a circuit, addressed by circuit and charge point IDs. Use this for charge-point-level load bias; for a single connector use circuit-set-charge-point-evse-priority, and for an in-progress session use circuit-set-session-priority. Idempotent: writes the priority to a fixed value. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `circuit` | number | yes |  | Circuit. |
| `chargePoint` | number | yes |  | Charge Point. |
| `priority` | number | yes |  | Priority. |

### `circuitSetChargePointEvsePriority`

**Actions - Circuit - Set Charge Point EVSE Priority.** Set the dynamic-load-management (DLM) priority for one specific EVSE of a charge point within a circuit, addressed by circuit, charge point, and EVSE IDs. Use to bias load allocation at the individual connector level rather than for a whole charge point (circuit-set-charge-point-priority) or session (circuit-set-session-priority). Idempotent: writes the priority to a fixed value. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `circuit` | number | yes |  | Circuit. |
| `chargePoint` | number | yes |  | Charge Point. |
| `evse` | number | yes |  | Evse. |
| `priority` | number | yes |  | Priority. |

### `circuitSetCircuitSocPriority`

**Actions - Circuit - Set Circuit SoC Priority.** Configure state-of-charge-based dynamic-load-management priorities for a circuit: sets upper/lower SoC thresholds and the priority applied above/below each. Upper and lower thresholds must differ by at least 5 percentage points; passing null for a threshold removes that branch. Idempotent: overwrites the circuit's SoC priority configuration with the supplied values. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `circuit` | number | yes |  | Circuit. |
| `upperThresholdPercent` | number | no |  | Upper Threshold Percent. The state of charge (SoC) percentage above which the `highSoCPriority` will be applied. Must have a 5% offset from the `lowerThresholdPercent` (if provided). For example if `lowerThresholdPercent` is set to 50, this can have a value of 55 or higher. Setting this to `null` will remove the usage of t… |
| `highSoCPriority` | number | no |  | High SoC Priority. |
| `lowerThresholdPercent` | number | no |  | Lower Threshold Percent. The state of charge (SoC) percentage below which the `lowSoCPriority` will be applied. Must have a 5% offset from the `upperThresholdPercent` (if provided). For example if `upperThresholdPercent ` is set to 50, this can have a value of 45 or lower. Setting this to `null` will remove the usage of th… |
| `lowSoCPriority` | number | no |  | Low SoC Priority. |

### `circuitSetSessionPriority`

**Actions - Circuit - Set Session Priority.** Set the dynamic-load-management priority for a specific active charging session within a circuit, addressed by circuit and session IDs. Use to bias load for one ongoing session rather than a whole charge point (circuit-set-charge-point-priority) or connector (circuit-set-charge-point-evse-priority). Idempotent: writes the priority to a fixed value. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `circuit` | number | yes |  | Circuit. |
| `session` | number | yes |  | Session. |
| `priority` | number | yes |  | Priority. |

### `configurationTemplateApplyToChargePoints`

**Actions - Configuration Template - Apply To Charge Points.** Push a configuration template to a set of charge points by id. Set shouldPersist=true to re-enforce the template on every charge point boot. Effectively idempotent: applying the same template to the same charge points converges them to the template's configuration. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template` | number | yes |  | Template. |
| `chargePointIds` | array | no |  | Charge Point Ids. Array of charge point IDs the template will be applied to. |
| `shouldPersist` | string | no |  | Should Persist. Specifies whether the configuration template will be enforced each time the charge point boots. One of `"true"`, `"false"`. |

### `configurationTemplateBulkCreateVariables`

**Actions - Configuration Template - Bulk Create Variables.** Add several variables in one call to a configuration template, appending to its existing keys and rejecting duplicates. Not idempotent: re-running with keys that now already exist will fail the duplicate validation rather than no-op. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template` | number | yes |  | Template. |

### `listConfigurationTemplates`

**Resources - Configuration Templates - List Configuration Templates.** List OCPP configuration templates, optionally filtered by OCPP version (ocpp1.6 or ocpp2.0.1). Read-only and idempotent; use this to discover templates or find one by version, then use Get for a single known template id. Enable pagination to fetch all results. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__ocppVersion` | string | no |  | Filter - Ocpp Version. The OCPP version to filter by. One of `"ocpp1.6"`, `"ocpp2.0.1"`. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `createConfigurationTemplate`

**Resources - Configuration Templates - Create Configuration Template.** Create a new OCPP configuration template, requiring a name and an OCPP version (ocpp 1.6 or ocpp 2.0.1). Not idempotent: each call creates a separate template. Add variables afterward with the Configuration Template Variable Create action; use Update to rename an existing template. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `ocppVersion` | string | yes |  | Ocpp Version. One of `"ocpp 1.6"`, `"ocpp 2.0.1"`. |

### `updateConfigurationTemplate`

**Resources - Configuration Templates - Update Configuration Template.** Update an existing OCPP configuration template (currently its name) identified by its numeric id. Not idempotent in general since it mutates live state; use to rename a template. To change the variables within a template, use the Configuration Template Variable actions instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template` | number | yes |  | Template. |
| `name` | string | no |  | Name. |

### `getConfigurationTemplate`

**Resources - Configuration Templates - Get Configuration Template.** Retrieve a single OCPP configuration template by its numeric id. Read-only and idempotent; use this when you already know the template id, and use List Configuration Templates to search across templates. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template` | number | yes |  | Template. |

### `deleteConfigurationTemplate`

**Resources - Configuration Templates - Delete Configuration Template.** Permanently delete an OCPP configuration template by its numeric id, removing the template and its variables. Destructive and not idempotent: deleting an already-removed template will fail. Confirm the template with Get or List before deleting. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template` | number | yes |  | Template. |

### `configurationTemplateVariableListing`

**Resources - Configuration Templates - Configuration Template Variable Listing.** List all configuration variables belonging to one OCPP configuration template, identified by template id. Read-only and idempotent; use this to inspect a template contents or to find a variable id before updating or deleting it. Enable pagination to fetch all results. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template` | number | yes |  | Template. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `configurationTemplateVariableCreate`

**Resources - Configuration Templates - Configuration Template Variable Create.** Add a configuration variable to an OCPP configuration template, identified by template id. Choose the variant matching the template OCPP version: 1.6 uses keyName/value, while 2.0.1 uses component/variableName/value plus optional instance and EVSE/connector scoping. Not idempotent: each call adds another variable. Use the Update variant action to change an existing variable. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template` | number | yes |  | Template. |
| `requestBody_VariantType` | string | yes |  | Request Body Variant Type. Select the type of the variant. One of `"1"`, `"2"`. |
| `requestBody` | object | yes |  | Request Body. An object whose fields depend on other inputs; the product shows them. |

### `configurationTemplateVariableUpdate`

**Resources - Configuration Templates - Configuration Template Variable Update.** Modify an existing configuration variable within an OCPP configuration template, identified by template id and variable id, supplying only the fields to change. Choose the variant matching the template OCPP version (1.6: keyName/value; 2.0.1: component/variableName/value plus optional scoping). Not idempotent: each call mutates live state. Use the Create variant action to add a new variable. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template` | number | yes |  | Template. |
| `variable` | number | yes |  | Variable. |
| `requestBody_VariantType` | string | yes |  | Request Body Variant Type. Select the type of the variant. One of `"1"`, `"2"`. |
| `requestBody` | object | yes |  | Request Body. An object whose fields depend on other inputs; the product shows them. |

### `configurationTemplateVariableDelete`

**Resources - Configuration Templates - Configuration Template Variable Delete.** Permanently delete a single configuration variable from an OCPP configuration template, identified by template id and variable id. Destructive and not idempotent: deleting an already-removed variable will fail. Use the variable Listing action first to confirm the variable id. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `template` | number | yes |  | Template. |
| `variable` | number | yes |  | Variable. |

### `electricityMeterReportConsumption`

**Actions - Electricity Meter - Report Consumption.** Record a consumption reading for an electricity meter, capturing per-phase current (L1/L2/L3, in milliamperes) at an optional ISO 8601 timestamp (defaults to now). Not idempotent: each call appends a new meter report. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `electricityMeter` | number | yes |  | Electricity Meter. |
| `timestamp` | ISO date-time string | no |  | Timestamp. The timestamp of the measurements. ISO 8601 formatted date. |
| `currentL1` | number | no |  | Current L1. The current on L1 in milliamperes (mA) |
| `currentL2` | number | no |  | Current L2. The current on L2 in milliamperes (mA) |
| `currentL3` | number | no |  | Current L3. The current on L3 in milliamperes (mA) |

### `electricityMetersLising`

**Resources - Electricity Meters - Lising.** List all AMPECO electricity meters on the platform. Read-only and idempotent. Enable pagination to fetch every meter across pages; otherwise a single page (up to per_page results) is returned. Use this to discover meter IDs before reading, updating, or deleting a specific meter. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `electricityMeterCreate`

**Resources - Electricity Meters - Create.** Create a new AMPECO electricity meter with a name and integration ID. Not idempotent: each call adds a separate meter, so re-running duplicates it. To change an existing meter, use the electricity meter update action instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `integrationId` | number | yes |  | Integration Id. |

### `electricityMeterRead`

**Resources - Electricity Meters - Read.** Fetch the details of a single AMPECO electricity meter by its numeric ID. Read-only and idempotent. Pick this when you already have a meter ID; to browse all meters, use the electricity meters listing action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `electricityMeter` | number | yes |  | Electricity Meter. |

### `electricityMeterUpdate`

**Resources - Electricity Meters - Update.** Update an existing AMPECO electricity meter (its name and/or integration ID) identified by numeric ID, sending only the fields provided as a partial PATCH. Idempotent: applying the same values repeatedly leaves the meter in the same state. Use the create action to add a new meter instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `electricityMeter` | number | yes |  | Electricity Meter. |
| `name` | string | no |  | Name. |
| `integrationId` | number | no |  | Integration Id. |

### `electricityMeterDelete`

**Resources - Electricity Meters - Delete.** Permanently delete an AMPECO electricity meter by its numeric ID. Destructive; deleting an already-removed meter returns an error rather than succeeding silently. Confirm the meter ID via the listing action first. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `electricityMeter` | number | yes |  | Electricity Meter. |

### `electricityRatesListing`

**Resources - Electricity Rates - Electricity Rates Listing.** List electricity rates configured in AMPECO, optionally filtered by utility id or rate type (e.g. admin_defined, octopus_go, agile_octopus). Read-only and safe to repeat. Enable pagination to retrieve all matching rates; otherwise one page is returned. Use to discover rate ids before reading or updating a specific rate. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__utilityId` | number | no |  | Filter - Utility Id. |
| `filter__type` | string | no |  | Filter - Type. One of `"admin_defined"`, `"octopus_go"`, `"agile_octopus"`, `"elspot"`, `"nord_pool"`. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `electricityRateCreate`

**Resources - Electricity Rates - Create.** Create a new electricity rate in AMPECO with a name, default per-kWh price (tax included) and tax percentage. Not idempotent: each call creates another distinct rate, so guard against duplicates. To change an existing rate use the update action instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `utilityId` | number | no |  | Utility Id. The id of the utility providing the electricity. Configured in the Ampeco admin panel. |
| `defaultPrice` | number | yes |  | Default Price. The default price per kWh, which will be applied if there is no pricing supplied for a time interval. Prices of all electricity rates created through the Public API or tha Ampeco admin panel must include the tax in the price. Price per kWh. |
| `taxPercentage` | number | yes |  | Tax Percentage. This field is used only to indicate the applied tax. All Electricity Rate prices should be provided with the tax included in the price. |

### `electricityRateRead`

**Resources - Electricity Rates - Read.** Retrieve one electricity rate from AMPECO by its numeric id, including its name, default price, tax and utility. Read-only and safe to repeat. Use when you have a specific rate id; to discover ids, list rates instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `electricityRate` | number | yes |  | Electricity Rate. |

### `electricityRateUpdate`

**Resources - Electricity Rates - Update.** Partially update an existing electricity rate in AMPECO, identified by its numeric id; only the supplied fields (name, utility, default price, tax) change. Targets a stable id and applying the same values repeatedly yields the same state. Use the create action to add a new rate instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `electricityRate` | number | yes |  | Electricity Rate. |
| `name` | string | no |  | Name. |
| `utilityId` | number | no |  | Utility Id. The id of the utility providing the electricity. Configured in the Ampeco admin panel. |
| `defaultPrice` | number | no |  | Default Price. The default price per kWh, which will be applied if there is no pricing supplied for a time interval. Prices of all electricity rates created through the Public API or tha Ampeco admin panel must include the tax in the price. Price per kWh. |
| `taxPercentage` | number | no |  | Tax Percentage. This field is used only to indicate the applied tax. All Electricity Rate prices should be provided with the tax included in the price. |

### `electricityRateDelete`

**Resources - Electricity Rates - Delete.** Permanently delete an electricity rate from AMPECO by its numeric id. Destructive and cannot be undone; repeating after success fails because the rate no longer exists. Confirm the correct id before calling. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `electricityRate` | number | yes |  | Electricity Rate. |

### `electricityRateEnergyMixRead`

**Resources - Electricity Rates - Electricity Rate Energy Mix Read.** Retrieve the energy-source mix (percentages for solar, wind, hydro, nuclear, coal, gas and other sources) of a given electricity rate in AMPECO. Read-only and safe to repeat. Use the energy-mix update action to change these percentages. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `electricityRate` | number | yes |  | Electricity Rate. |

### `electricityRateEnergyMixUpdate`

**Resources - Electricity Rates - Energy Mix Update.** Set the energy-source mix percentages (solar, wind, hydro, nuclear, coal, natural gas, other renewable/non-renewable) for an electricity rate in AMPECO. Replaces the stored mix, so submitting the same values repeatedly leaves the rate in the same state; unspecified sources default to 0. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `electricityRate` | number | yes |  | Electricity Rate. |
| `solar` | number | no |  | Solar. Represents what percent of the energy is generated from solar power. |
| `wind` | number | no |  | Wind. Represents what percent of the energy is generated from wind turbines. |
| `hydro` | number | no |  | Hydro. Represents what percent of the energy is generated from hydropower. |
| `nuclear` | number | no |  | Nuclear. Represents what percent of the energy is generated from nuclear power plants. |
| `coal` | number | no |  | Coal. Represents what percent of the energy is generated from burning coal. |
| `naturalGas` | number | no |  | Natural Gas. Represents what percent of the energy is generated from natural gas. |
| `otherRenewable` | number | no |  | Other Renewable. Represents what percent of the energy is generated from any other type of renewable energy source. This could include any other renewable source not specifically listed. |
| `otherNonRenewable` | number | no |  | Other Non Renewable. Represents what percent of the energy is generated from any other type of non-renewable energy source. This could include any other non-renewable source not specifically listed. |

### `electricityRatePricePeriodsListing`

**Resources - Electricity Rates - Price Periods Listing.** List every configured price-period day for an electricity rate in AMPECO, covering both recurring week days and specific calendar dates. Read-only and safe to repeat. Use this for the full overview; the week-day and date listing actions return only one of the two kinds. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `electricityRate` | number | yes |  | Electricity Rate. |

### `electricityRatePricePeriodsDateListing`

**Resources - Electricity Rates - Price Periods Date Listing.** List the configured one-off, calendar-date price periods for an electricity rate in AMPECO. Read-only and safe to repeat. Use the week-day listing action for recurring weekly periods, or the combined listing for both kinds. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `electricityRate` | number | yes |  | Electricity Rate. |

### `electricityRatePricePeriodsDateRead`

**Resources - Electricity Rates - Price Periods Date Read.** Retrieve the configured time-of-day price periods for one specific calendar date (YYYY-MM-DD) of an electricity rate in AMPECO. Read-only and safe to repeat. Use the week-day read action for recurring weekly periods instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `electricityRate` | number | yes |  | Electricity Rate. |
| `date` | ISO date-time string | yes |  | Date. Uses the YYYY-MM-DD date format. |

### `electricityRatePricePeriodsDateCreateOrUpdate`

**Resources - Electricity Rates - Price Periods Date Create Or Update.** Set the full list of time-of-day price periods for one specific calendar date (YYYY-MM-DD) of an electricity rate in AMPECO. This replaces all existing periods for that date, so always send the complete list; resending the same list leaves the date in the same state. Use the week-day variant to set recurring weekly pricing. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `electricityRate` | number | yes |  | Electricity Rate. |
| `date` | ISO date-time string | yes |  | Date. Uses the YYYY-MM-DD date format. |
| `periods` | array | yes |  | Periods. Each item: { `startsAt`, `endsAt`, `price` }. |

### `electricityRatePricePeriodsDateDelete`

**Resources - Electricity Rates - Price Periods Date Delete.** Remove all configured price periods for one specific calendar date (YYYY-MM-DD) of an electricity rate in AMPECO, reverting that date to the rate default pricing. Destructive write; confirm the rate id and date first. Use the week-day delete action to clear a recurring week day instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `electricityRate` | number | yes |  | Electricity Rate. |
| `date` | ISO date-time string | yes |  | Date. Uses the YYYY-MM-DD date format. |

### `electricityRatePricePeriodsWeekDayListing`

**Resources - Electricity Rates - Price Periods Week Day Listing.** List the configured recurring week-day price periods for an electricity rate in AMPECO (e.g. Monday, weekend, or any). Read-only and safe to repeat. Use the date listing action for one-off calendar-date periods, or the combined listing for both. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `electricityRate` | number | yes |  | Electricity Rate. |

### `electricityRatePricePeriodsWeekDayRead`

**Resources - Electricity Rates - Price Periods Week Day Read.** Retrieve the configured time-of-day price periods for one recurring week day (mon-sun or any) of an electricity rate in AMPECO. Read-only and safe to repeat. Use the date read action for a specific calendar date instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `electricityRate` | number | yes |  | Electricity Rate. |
| `weekDay` | string | yes |  | Week Day. Can be one of the listed days of the week or `any`. One of `"mon"`, `"tue"`, `"wed"`, `"thu"`, `"fri"`, `"sat"`, `"sun"`, `"any"`. |

### `electricityRatePricePeriodsWeekDayCreateaOrUpdate`

**Resources - Electricity Rates - Price Periods Week Day Createa Or Update.** Set the full list of time-of-day price periods for one recurring week day (mon-sun or any) of an electricity rate in AMPECO. This replaces all existing periods for that day, so always send the complete list; resending the same list leaves the day in the same state. Use the date variant to set pricing for a specific calendar date. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `electricityRate` | number | yes |  | Electricity Rate. |
| `weekDay` | string | yes |  | Week Day. Can be one of the listed days of the week or `any`. One of `"mon"`, `"tue"`, `"wed"`, `"thu"`, `"fri"`, `"sat"`, `"sun"`, `"any"`. |
| `periods` | array | yes |  | Periods. Each item: { `startsAt`, `endsAt`, `price` }. |

### `electricityRatePricePeriodsWeekDayDelete`

**Resources - Electricity Rates - Price Periods Week Day Delete.** Remove all configured price periods for one recurring week day (mon-sun or any) of an electricity rate in AMPECO, reverting that day to the rate default pricing. Destructive write; confirm the rate id and day first. Use the date delete action to clear a specific calendar date instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `electricityRate` | number | yes |  | Electricity Rate. |
| `weekDay` | string | yes |  | Week Day. Can be one of the listed days of the week or `any`. One of `"mon"`, `"tue"`, `"wed"`, `"thu"`, `"fri"`, `"sat"`, `"sun"`, `"any"`. |

### `evseStartChargingWithEvseId`

**Actions - EVSE - Start Charging With EVSE Id.** Remotely start a charging session on a given EVSE, optionally on behalf of a user with a chosen payment method, linked booking, and an OCPP charging profile. If a payment method ID is supplied, a user ID is required. Not idempotent: each call initiates a new charging session. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `evse` | number | yes |  | EVSE. |
| `userId` | number | no |  | User Id. |
| `paymentMethodId` | string | no |  | Payment Method Id. The ID of the payment method, as returned by the payment method listing (User / Payment Method / Listing). When left empty or null, it would be determined by the system - either "balance" or "subscription" (in case the the user has an active post-paid subscription for home charging sessions and the… |
| `externalSessionId` | string | no |  | External Session Id. |
| `connectorId` | number | no |  | Connector Id. |
| `bookingId` | number | no |  | Booking Id. The ID of the booking to link the session to. Returns a 422 error if the booking does not exist or if its status is not Accepted or Reserved. |
| `chargingProfile__transactionId` | number | no |  | Charging Profile - Transaction Id. |
| `chargingProfile__stackLevel` | number | yes |  | Charging Profile - Stack Level. |
| `chargingProfile__chargingProfilePurpose` | string | yes |  | Charging Profile - Charging Profile Purpose. One of `"ChargePointMaxProfile"`, `"TxDefaultProfile"`, `"TxProfile"`. |
| `chargingProfile__chargingProfileKind` | string | yes |  | Charging Profile - Charging Profile Kind. One of `"Absolute"`, `"Recurring"`, `"Relative"`. |
| `chargingProfile__recurrencyKind` | string | no |  | Charging Profile - Recurrency Kind. One of `"Daily"`, `"Weekly"`. |
| `chargingProfile__validFrom` | ISO date-time string | no |  | Charging Profile - Valid From. |
| `chargingProfile__validTo` | ISO date-time string | no |  | Charging Profile - Valid To. |
| `chargingProfile__chargingSchedule__id` | number | no |  | Charging Profile - Charging Schedule - Id. |
| `chargingProfile__chargingSchedule__duration` | number | no |  | Charging Profile - Charging Schedule - Duration. |
| `chargingProfile__chargingSchedule__startSchedule` | ISO date-time string | no |  | Charging Profile - Charging Schedule - Start Schedule. |
| `chargingProfile__chargingSchedule__chargingRateUnit` | string | yes |  | Charging Profile - Charging Schedule - Charging Rate Unit. One of `"A"`, `"W"`. |
| `chargingProfile__chargingSchedule__chargingSchedulePeriod` | array | yes |  | Charging Profile - Charging Schedule - Charging Schedule Period. Each item: { `startPeriod`, `limit`, `numberPhases`? }. |
| `chargingProfile__chargingSchedule__minChargingRate` | number | no |  | Charging Profile - Charging Schedule - Min Charging Rate. |

### `evseTriggerMessage`

**Actions - EVSE - Trigger Message.** Send an OCPP TriggerMessage to an EVSE, asking the charger to emit a specific message such as BootNotification, StatusNotification, MeterValues, or Heartbeat. Some message types (e.g. LogStatusNotification, TransactionEvent) are only valid for OCPP 2.0.1 chargers. Not idempotent: each call issues a fresh trigger to the device. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `evse` | number | yes |  | EVSE. |
| `type` | string | yes |  | Type. The type of the message to be triggered. Messages available only for 2.0.1 chargers - LogStatusNotification, PublishFirmwareStatusNotification, SignChargingStationCertificate, SignCombinedCertificate, TransactionEvent. One of `"BootNotification"`, `"DiagnosticsStatusNotification"`, `"LogStatusNotification"`, `"FirmwareStatusNotification"`, `"PublishFirmwareStatusNotification"`, `"Heartbeat"`, `"MeterValues"`, `"StatusNotification"`, `"SignV2GCertificate"`, `"SignChargingStationCertificate"`, `"SignCombinedCertificate"`, `"TransactionEvent"`. |

### `evseDowntimePeriodsListing`

**Resources - Evse Downtime Periods - Listing.** List EVSE downtime periods with optional filters by EVSE, charge point, location, entry mode (manual/automatic), type (downtime/exempt), duration, and time windows. Read-only and safe to repeat. Enable Paginate Results to fetch all matches; to read one known period by ID use evse-downtime-period-read. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__evseId` | number | no |  | Filter - Evse Id. |
| `filter__chargePointId` | number | no |  | Filter - Charge Point Id. Filter the periods in which the evses belong to the charge point. |
| `filter__locationId` | number | no |  | Filter - Location Id. |
| `filter__entryMode` | string | no |  | Filter - Entry Mode. One of `"manual"`, `"automatic"`. |
| `filter__type` | string | no |  | Filter - Type. One of `"downtime"`, `"exempt"`. |
| `filter__startedAfter` | ISO date-time string | no |  | Filter - Started After. ISO 8601 formatted date. Resources with `startedAt >= startedAfter`. |
| `filter__stoppedBefore` | ISO date-time string | no |  | Filter - Stopped Before. ISO 8601 formatted date. Resources with `stoppedAt <= stoppedBefore`. |
| `filter__durationLessThan` | number | no |  | Filter - Duration Less Than. Resources with duration in minutes less than or equal given value. |
| `filter__durationGreaterThan` | number | no |  | Filter - Duration Greater Than. Resources with duration in minutes greater than or equal given value. |
| `filter__lastUpdatedAfter` | ISO date-time string | no |  | Filter - Last Updated After. ISO 8601 formatted date. Lists only the specific resource that was last updated on and after this datetime. |
| `filter__lastUpdatedBefore` | ISO date-time string | no |  | Filter - Last Updated Before. ISO 8601 formatted date. Lists only the specific resource that was last updated on and before this datetime. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `evseDowntimePeriodCreate`

**Resources - Evse Downtime Periods - Create.** Create a manual exempt downtime period for an EVSE, specifying the EVSE ID, an exempt-type notice ID, and start/end times. Not idempotent: each call creates a new period, so avoid duplicate calls for the same window. Use evse-downtime-period-update to adjust an existing period instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `evseId` | number | yes |  | Evse Id. |
| `noticeId` | number | yes |  | Notice Id. Allowed only notice with `type = exempt`! |
| `startedAt` | ISO date-time string | yes |  | Started At. |
| `endedAt` | ISO date-time string | yes |  | Ended At. |

### `evseDowntimePeriodRead`

**Resources - Evse Downtime Periods - Read.** Fetch a single EVSE downtime period by its numeric ID. Read-only and safe to repeat. To search across periods by EVSE, type, or time window use evse-downtime-periods-listing. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `evseDowntimePeriod` | number | yes |  | Evse Downtime Period. |

### `evseDowntimePeriodUpdate`

**Resources - Evse Downtime Periods - Update.** Update an existing EVSE downtime period by its numeric ID, changing its notice, start, or end time. Editing start/end is only allowed for periods with type "exempt" and entryMode "manual". Idempotent: re-applying the same values yields the same end state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `evseDowntimePeriod` | number | yes |  | Evse Downtime Period. |
| `noticeId` | number | no |  | Notice Id. |
| `startedAt` | ISO date-time string | no |  | Started At. Allowed only for downtime period with `type = exempt AND entryMode = manual`. |
| `endedAt` | ISO date-time string | no |  | Ended At. Allowed only for downtime period with `type = exempt AND entryMode = manual`. |

### `evseDowntimePeriodDelete`

**Resources - Evse Downtime Periods - Delete.** Permanently delete a manually created EVSE downtime period by its numeric ID. Destructive and irreversible; a repeat call fails once the period is gone. Only manually created periods can be removed. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `evseDowntimePeriod` | number | yes |  | Evse Downtime Period. |

### `changeFlexibilityAssetStatus`

**Actions - Flexibility Asset - Change Flexibility Asset Status.** Enable or disable a flexibility asset by its identifier, optionally with an end date after which it is automatically disabled. While ended, no historical time series or forecasts are generated. Idempotent: sets the asset to the chosen status. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `flexibilityAsset` | string | yes |  | Flexibility Asset. |
| `status` | string | yes |  | Status. One of `"enabled"`, `"disabled"`. |
| `endsAt` | ISO date-time string | no |  | Ends At. ISO 8601 formatted date. If an end date is set the asset will be automatically disabled at that time. Historical time series and forecasts are not generated after the end date. |

### `flexibilityAssetCreateActivationRequest`

**Actions - Flexibility Asset - Create Activation Request.** Create a flexibility activation request for a specific asset, scheduling one or more activation periods to flex its energy use. Not idempotent: each call creates a new activation request. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `flexibilityAsset` | string | yes |  | Flexibility Asset. |
| `periods` | array | no |  | Periods. |

### `listFlexibilityActivationRequests`

**Resources - Flexibility Activation Requests - List.** List flexibility activation requests, optionally filtered by flexibility asset id. Read-only and idempotent. Enable the Paginate Results option to fetch across pages up to Per page total; otherwise a single page (max 100) is returned. Use getFlexibilityActivationRequest when you already know a request id. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__assetId` | string | no |  | Filter - Asset Id. The ID of the Flexibility Asset to filter requests by. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `getFlexibilityActivationRequest`

**Resources - Flexibility Activation Requests - Get Flexibility Activation Request.** Fetch a single flexibility activation request by its numeric id. Read-only and idempotent. Use when you already know the request id; to browse requests or filter by flexibility asset use listFlexibilityActivationRequests. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `flexibilityActivationRequest` | number | yes |  | Flexibility Activation Request. |

### `createFlexibilityAsset`

**Resources - Flexibility Assets - Create.** Create a new flexibility asset bound to exactly one source - a DLM circuit, a charge point, or an EVSE (only one of these IDs may be set). Not idempotent: each call creates a separate asset, so re-running produces duplicates. Use List/Get first to check whether a suitable asset already exists, and use Update to change an existing one. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `dlmCircuitId` | number | yes |  | Dlm Circuit Id. ID of the DLM circuit. Only one of dlmCircuitId, chargePointId or evseId can have value. |
| `chargePointId` | number | yes |  | Charge Point Id. ID of the Charge Point. Only one of dlmCircuitId, chargePointId or evseId can have value. |
| `evseId` | number | yes |  | Evse Id. ID of the EVSE. Only one of dlmCircuitId, chargePointId or evseId can have value. |
| `description` | string | no |  | Description. Short description of the flexibility asset. |
| `integrationId` | number | yes |  | Integration Id. Flexibility integration. |
| `status` | string | yes |  | Status. One of `"enabled"`, `"disabled"`. |
| `endsAt` | ISO date-time string | no |  | Ends At. ISO 8601 formatted date. If an end date is set the asset will be automatically disabled at that time. Historical time series and forecasts are not generated after the end date. |

### `listFlexibilityAssets`

**Resources - Flexibility Assets - List.** List flexibility assets, optionally filtered to those updated since a given timestamp. Read-only and idempotent. Enable the pagination option to fetch all matching assets across pages; otherwise a single page (up to per_page) is returned. Use this to discover asset IDs before reading, updating, or pulling time-series data for a specific asset. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__updatedSince` | ISO date-time string | no |  | Filter - Updated Since. Filter for the assets updated since the given timestamp. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `updateFlexibilityAsset`

**Resources - Flexibility Assets - Update.** Partially update an existing flexibility asset (by ID), changing only its description and/or flexibility integration. Idempotent: applying the same values repeatedly leaves the asset in the same state. Use this to modify an existing asset rather than Create (which would make a duplicate). Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `flexibilityAsset` | number | yes |  | Flexibility Asset. |
| `description` | string | no |  | Description. Short description of the flexibility asset. |
| `integrationId` | number | no |  | Integration Id. Flexibility integration. |

### `getFlexibilityAsset`

**Resources - Flexibility Assets - Get.** Fetch a single flexibility asset by its numeric ID. Read-only and idempotent. Use when you already know the asset ID; if you only have a charge point, EVSE, or circuit reference, use List Flexibility Assets first to find the matching asset ID. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `flexibilityAsset` | number | yes |  | Flexibility Asset. |

### `deleteFlexibilityAsset`

**Resources - Flexibility Assets - Delete.** Permanently delete a flexibility asset by its numeric ID. Destructive and not idempotent in effect: the first call removes the asset, subsequent calls for the same ID fail because it no longer exists. Use only when the asset should be fully removed; to merely take it offline, update its status to disabled instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `flexibilityAsset` | number | yes |  | Flexibility Asset. |

### `getHistoricalTimeSeries`

**Resources - Flexibility Assets - Get Historical Time Series.** Retrieve past measured time-series for one flexibility asset (by ID), optionally bounded by a start/end time window. Read-only and idempotent. Pick this for historical/recorded values; use Get Time Series Forecast for predicted future values of the same asset. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `flexibilityAsset` | number | yes |  | Flexibility Asset. |
| `filter__startTime` | ISO date-time string | no |  | Filter - Start Time. |
| `filter__endTime` | ISO date-time string | no |  | Filter - End Time. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `getTimeSeriesForecast`

**Resources - Flexibility Assets - Get Time Series Forecast.** Retrieve forward-looking forecast time-series for one flexibility asset (by ID), optionally bounded by a start/end time window. Read-only and idempotent. Pick this for predicted/future values; use Get Historical Time Series for past measured values of the same asset. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `flexibilityAsset` | number | yes |  | Flexibility Asset. |
| `filter__startTime` | ISO date-time string | no |  | Filter - Start Time. |
| `filter__endTime` | ISO date-time string | no |  | Filter - End Time. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `certificateReissueAnEmaid`

**Actions - Id Tag - Certificate Reissue An EMAID.** Reissue the e-mobility account identifier (EMAID) certificate for an existing id tag, addressed by its numeric ID. Use to refresh a Plug & Charge contract certificate already associated with a tag; to mint a brand-new EMAID for a provisioning certificate, use certificate-issue-an-emaid instead. Not idempotent: each call issues a new certificate. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `idTag` | number | yes |  | Id Tag. |

### `idTagsListing`

**Resources - Id Tags - Listing.** List id tags with optional filters (UID, label, user, status, type, partner, expiry, last-updated window) and optional auto-pagination to retrieve all matching results. Read-only lookup, safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__idTagUid` | number | no |  | Filter - Id Tag Uid. Only list Id tags with a certain UID. |
| `filter__idLabel` | string | no |  | Filter - Id Label. Only list Id tags with a certain label. |
| `filter__userId` | number | no |  | Filter - User Id. Only list Id tags with a certain user id. |
| `filter__expireAt` | ISO date-time string | no |  | Filter - Expire At. Only list Id tags that have an expiration date grater or equal to the supplied date. |
| `filter__status` | string | no |  | Filter - Status. Only list Id tags in this status. One of `"enabled"`, `"disabled"`, `"suspended"`. |
| `filter__type` | string | no |  | Filter - Type. Only list Id tags in this type. One of `"rfid"`, `"mac_address"`, `"emaid"`. |
| `filter__partnerId` | number | no |  | Filter - Partner Id. Only list ID tags assigned to the specified Partner ID. Pass null to list ID tags without a Partner assigned. |
| `filter__lastUpdatedAfter` | ISO date-time string | no |  | Filter - Last Updated After. ISO 8601 formatted date. Lists only the id tags that were last updated on and after this datetime. |
| `filter__lastUpdatedBefore` | ISO date-time string | no |  | Filter - Last Updated Before. ISO 8601 formatted date. Lists only the id tags that were last updated on and before this datetime. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `idTagCreate`

**Resources - Id Tags - Create.** Register a new ID tag (RFID card or MAC address) in AMPECO that authorizes charging sessions, optionally linking it to a user, payment method, and partner. Not idempotent: each call creates a separate tag, so calling twice yields duplicates. Use idTagUpdate to modify an existing tag instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `idTagUid` | string | yes |  | Id Tag Uid. Token used for authorization. |
| `idLabel` | string | no |  | Id Label. Visual or other label that could be associated with the ID Tag. |
| `expireAt` | ISO date-time string | no |  | Expire At. |
| `status` | string | yes |  | Status. The status of the ID tag. Use it to disable or suspend a tag * `enabled` The tag is enabled and is accepted as authentication method * `disabled` The tag is disabled by the admin user and is not acceptable as authorization method * `suspended` The tag is suspended by the owner of the tag and is not… One of `"enabled"`, `"disabled"`, `"suspended"`. |
| `type` | string | yes |  | Type. One of `"rfid"`, `"mac_address"`. |
| `vehicleType` | string | no |  | Vehicle Type. One of `"company_car"`, `"private_car"`. |
| `paymentMethodId` | string | no |  | Payment Method Id. The payment method that will be associated with the ID Tag. * For **credit/debit cards** the `paymentMethodId` should be provided * For **Corporate billing** - `corporate:{id}` * For **last used** the value should be `null`. |
| `userId` | number | no |  | User Id. Associate the ID tag with a user account. If the user is not presented, the tag will not be authorized! It makes sense to prepare the tags in advance, in case there is another process/entity is going to later assign them! |
| `externalId` | string | no |  | External Id. |
| `partnerId` | number | no |  | Partner Id. The administrator accounts of the selected Partner will be able to edit and delete the specified ID tag. |

### `idTagRead`

**Resources - Id Tags - Read.** Fetch a single ID tag by its numeric id, returning its status, type, associated user and payment method. Read-only and idempotent. Use when you already know the tag id; to find tags by other criteria, list them through another action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `idTag` | number | yes |  | Id Tag. |

### `idTagUpdate`

**Resources - Id Tags - Update.** Modify an existing ID tag identified by its numeric id, for example to enable, disable, or suspend it, reassign its user or payment method, or change its expiry. Idempotent: applies the supplied fields to that one tag, so repeating the same call leaves the same result. Requires the tag to already exist; use idTagCreate to register a new one. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `idTag` | number | yes |  | Id Tag. |
| `idTagUid` | string | no |  | Id Tag Uid. Token used for authorization. |
| `idLabel` | string | no |  | Id Label. Visual or other label that could be associated with the ID Tag. |
| `expireAt` | ISO date-time string | no |  | Expire At. |
| `status` | string | no |  | Status. The status of the ID tag. Use it to disable or suspend a tag * `enabled` The tag is enabled and is accepted as authentication method * `disabled` The tag is disabled by the admin user and is not acceptable as authorization method * `suspended` The tag is suspended by the owner of the tag and is not… One of `"enabled"`, `"disabled"`, `"suspended"`. |
| `type` | string | no |  | Type. One of `"rfid"`, `"mac_address"`. |
| `vehicleType` | string | no |  | Vehicle Type. One of `"company_car"`, `"private_car"`. |
| `paymentMethodId` | string | no |  | Payment Method Id. The payment method that will be associated with the ID Tag. * For **credit/debit cards** the `paymentMethodId` should be provided * For **Corporate billing** - `corporate:{id}` * For **Auto selection** - use `"auto"` (recommended) or `null` (deprecated) * The "last used" concept has been replaced w… |
| `userId` | number | no |  | User Id. Associate the ID tag with a user account. If the user is not presented, the tag will not be authorized! It makes sense to prepare the tags in advance, in case there is another process/entity is going to later assign them! |
| `externalId` | string | no |  | External Id. |
| `partnerId` | number | no |  | Partner Id. The administrator accounts of the selected Partner will be able to edit and delete the specified ID tag. |

### `idTagDelete`

**Resources - Id Tags - Delete.** Permanently delete an id tag by its numeric ID. Idempotent: deleting an already-removed id tag leaves it absent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `idTag` | number | yes |  | Id Tag. |

### `locationCheckBookingAvailability`

**Actions - Locations - Check Booking Availability.** Look up bookable EVSE availability at a location across a start/end time window before reserving. The time frame is limited to 7 days. Read-only query: it reports open slots without changing any booking, so it is safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location` | number | yes |  | Location. |
| `startAfter` | ISO date-time string | yes |  | Start After. Start of the time frame to check. |
| `endBefore` | ISO date-time string | yes |  | End Before. End of the time frame to check. Time-frame is limited to 7 days. |

### `locationCreate`

**Resources - Locations - Create.** Creates a new charging location in AMPECO; requires a localized name, geoposition latitude/longitude, an address, and a country, with optional working hours, timezone, tags, and external/roaming IDs. Use to add a location; to edit an existing one use the Update action instead. Not idempotent: each call creates a separate location, so guard against duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | array | yes |  | Name. Each item: { `locale`?, `translation`? }. |
| `shortDescription` | array | no |  | Short Description. Each item: { `locale`?, `translation`? }. |
| `description` | array | no |  | Description. Each item: { `locale`?, `translation`? }. |
| `additionalDescription` | array | no |  | Additional Description. Each item: { `locale`?, `translation`? }. |
| `geoposition__latitude` | number | yes |  | Geoposition - Latitude. |
| `geoposition__longitude` | number | yes |  | Geoposition - Longitude. |
| `address` | array | yes |  | Address. The full address of the location. Each item: { `locale`?, `translation`? }. |
| `streetAddress` | array | no |  | Street Address. The street address of the location. Each item: { `locale`?, `translation`? }. |
| `city` | string | no |  | City. |
| `region` | string | no |  | Region. When country is not in US, AU, CA, UM or RO, you can provide the region. |
| `state` | string | no |  | State. A value the product loads from the provider, such as an id; write the value itself. |
| `country` | string | yes |  | Country. One of `"AF"`, `"AX"`, `"AL"`, `"DZ"`, `"AS"`, `"AD"`, `"AO"`, `"AI"`, `"AQ"`, `"AG"`, `"AR"`, `"AM"`, `"AW"`, `"AU"`, `"AT"`, `"AZ"`, `"BS"`, `"BH"`, `"BD"`, `"BB"`, `"BY"`, `"BE"`, `"BZ"`, `"BJ"`, `"BM"` and 225 more. |
| `postCode` | string | no |  | Post Code. |
| `workingHours__isAlwaysOpen` | string | no |  | Working Hours - Is Always Open. Indicates that the location is always open for charging. If set to false, the `hours` field is required, otherwise it should be ignored. One of `"true"`, `"false"`. |
| `workingHours__stopSessionOutsideWorkingHours` | string | no |  | Working Hours - Stop Session Outside Working Hours. If a User has initiated a charging session during Working hours but it is already outside of the Working hours, the session will be terminated by the system. One of `"true"`, `"false"`. |
| `workingHours__alwaysOpenForUserGroupIds` | array | no |  | Working Hours - Always Open For User Group Ids. |
| `workingHours__hours__monday` | array | no |  | Working Hours - Hours - Monday. Working hours interval for single day. Each item: { `start`, `end` }. |
| `workingHours__hours__tuesday` | array | no |  | Working Hours - Hours - Tuesday. Working hours interval for single day. Each item: { `start`, `end` }. |
| `workingHours__hours__wednesday` | array | no |  | Working Hours - Hours - Wednesday. Working hours interval for single day. Each item: { `start`, `end` }. |
| `workingHours__hours__thursday` | array | no |  | Working Hours - Hours - Thursday. Working hours interval for single day. Each item: { `start`, `end` }. |
| `workingHours__hours__friday` | array | no |  | Working Hours - Hours - Friday. Working hours interval for single day. Each item: { `start`, `end` }. |
| `workingHours__hours__saturday` | array | no |  | Working Hours - Hours - Saturday. Working hours interval for single day. Each item: { `start`, `end` }. |
| `workingHours__hours__sunday` | array | no |  | Working Hours - Hours - Sunday. Working hours interval for single day. Each item: { `start`, `end` }. |
| `timezone` | string | no |  | Timezone. A valid timezone in the form of Area/Location, required when `Allow Multiple Time Zones` option is turned on in the Timezone Setting. |
| `externalId` | string | no |  | External Id. |
| `roamingOperatorId` | number | no |  | Roaming Operator Id. For roaming Locations, the ID of the roaming operator is provided. |
| `tags` | array | no |  | Tags. |

### `locationsListing`

**Resources - Locations - Listing.** Lists charging locations in AMPECO, optionally narrowing by country/state/region/city, partner or external ID, tag, or last-updated window. Use to discover locations or find a location ID before reading or editing it; with no filters it returns all locations, and enabling Paginate Results walks every page instead of a single capped page. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__country` | string | no |  | Filter - Country. One of `"AF"`, `"AX"`, `"AL"`, `"DZ"`, `"AS"`, `"AD"`, `"AO"`, `"AI"`, `"AQ"`, `"AG"`, `"AR"`, `"AM"`, `"AW"`, `"AU"`, `"AT"`, `"AZ"`, `"BS"`, `"BH"`, `"BD"`, `"BB"`, `"BY"`, `"BE"`, `"BZ"`, `"BJ"`, `"BM"` and 225 more. |
| `filter__state` | string | no |  | State. A value the product loads from the provider, such as an id; write the value itself. |
| `filter__region` | string | no |  | Filter - Region. |
| `filter__city` | string | no |  | Filter - City. |
| `filter__partnerId` | number | no |  | Filter - Partner Id. |
| `filter__externalId` | string | no |  | Filter - External Id. |
| `filter__tag` | string | no |  | Filter - Tag. Only list Locations that have the specific tag assigned. |
| `filter__lastUpdatedAfter` | ISO date-time string | no |  | Filter - Last Updated After. ISO 8601 formatted date. Lists only the locations that were last updated on and after this datetime. |
| `filter__lastUpdatedBefore` | ISO date-time string | no |  | Filter - Last Updated Before. ISO 8601 formatted date. Lists only the locations that were last updated on and before this datetime. |
| `include` | array | no |  | Include. One of `"chargingZones"`, `"locationImage"`, `"images"`, `"externalAppData"`. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `locationUpdate`

**Resources - Locations - Update.** Updates an existing AMPECO charging location by its numeric ID, covering localized names/descriptions, geoposition, address, working hours, timezone, tags, and roaming/external IDs. Use to edit a known location; to add a new one use the Create action instead. Geoposition latitude and longitude are always required; setting fields to supplied values converges to the same state, so it is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location` | number | yes |  | Location. |
| `include` | array | no |  | Include. One of `"chargingZones"`, `"locationImage"`, `"images"`, `"externalAppData"`. |
| `name` | array | no |  | Name. Each item: { `locale`?, `translation`? }. |
| `shortDescription` | array | no |  | Short Description. Each item: { `locale`?, `translation`? }. |
| `description` | array | no |  | Description. Each item: { `locale`?, `translation`? }. |
| `additionalDescription` | array | no |  | Additional Description. Each item: { `locale`?, `translation`? }. |
| `geoposition__latitude` | number | yes |  | Geoposition - Latitude. |
| `geoposition__longitude` | number | yes |  | Geoposition - Longitude. |
| `address` | array | no |  | Address. The full address of the location. Each item: { `locale`?, `translation`? }. |
| `streetAddress` | array | no |  | Street Address. The street address of the location. Each item: { `locale`?, `translation`? }. |
| `city` | string | no |  | City. |
| `region` | string | no |  | Region. When country is not in US, AU, CA, UM or RO, you can provide the region. |
| `state` | string | no |  | State. A value the product loads from the provider, such as an id; write the value itself. |
| `country` | string | no |  | Country. One of `"AF"`, `"AX"`, `"AL"`, `"DZ"`, `"AS"`, `"AD"`, `"AO"`, `"AI"`, `"AQ"`, `"AG"`, `"AR"`, `"AM"`, `"AW"`, `"AU"`, `"AT"`, `"AZ"`, `"BS"`, `"BH"`, `"BD"`, `"BB"`, `"BY"`, `"BE"`, `"BZ"`, `"BJ"`, `"BM"` and 225 more. |
| `postCode` | string | no |  | Post Code. |
| `workingHours__isAlwaysOpen` | string | no |  | Working Hours - Is Always Open. Indicates that the location is always open for charging. If set to false, the `hours` field is required, otherwise it should be ignored. One of `"true"`, `"false"`. |
| `workingHours__stopSessionOutsideWorkingHours` | string | no |  | Working Hours - Stop Session Outside Working Hours. If a User has initiated a charging session during Working hours but it is already outside of the Working hours, the session will be terminated by the system. One of `"true"`, `"false"`. |
| `workingHours__alwaysOpenForUserGroupIds` | array | no |  | Working Hours - Always Open For User Group Ids. |
| `workingHours__hours__monday` | array | no |  | Working Hours - Hours - Monday. Working hours interval for single day. Each item: { `start`, `end` }. |
| `workingHours__hours__tuesday` | array | no |  | Working Hours - Hours - Tuesday. Working hours interval for single day. Each item: { `start`, `end` }. |
| `workingHours__hours__wednesday` | array | no |  | Working Hours - Hours - Wednesday. Working hours interval for single day. Each item: { `start`, `end` }. |
| `workingHours__hours__thursday` | array | no |  | Working Hours - Hours - Thursday. Working hours interval for single day. Each item: { `start`, `end` }. |
| `workingHours__hours__friday` | array | no |  | Working Hours - Hours - Friday. Working hours interval for single day. Each item: { `start`, `end` }. |
| `workingHours__hours__saturday` | array | no |  | Working Hours - Hours - Saturday. Working hours interval for single day. Each item: { `start`, `end` }. |
| `workingHours__hours__sunday` | array | no |  | Working Hours - Hours - Sunday. Working hours interval for single day. Each item: { `start`, `end` }. |
| `timezone` | string | no |  | Timezone. A valid timezone in the form of Area/Location, required when `Allow Multiple Time Zones` option is turned on in the Timezone Setting. |
| `externalId` | string | no |  | External Id. |
| `roamingOperatorId` | number | no |  | Roaming Operator Id. For roaming Locations, the ID of the roaming operator is provided. |
| `tags` | array | no |  | Tags. |

### `locationRead`

**Resources - Locations - Read.** Fetches a single charging location from AMPECO by its numeric ID, optionally expanding related data such as charging zones or images via the Include option. Use to retrieve one known location; to search or discover location IDs use the Listing action instead. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location` | number | yes |  | Location. |
| `include` | array | no |  | Include. One of `"chargingZones"`, `"locationImage"`, `"images"`, `"externalAppData"`. |

### `locationDelete`

**Resources - Locations - Delete.** Permanently deletes one AMPECO charging location by its numeric ID. Use only when the location should be removed entirely; requires the location ID. Idempotent in effect: repeating the call converges to the same removed state, though a second call may report the location as already gone. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location` | number | yes |  | Location. |
| `include` | array | no |  | Include. One of `"chargingZones"`, `"locationImage"`, `"images"`, `"externalAppData"`. |

### `locationChargingZonesListing`

**Resources - Locations - Listing Charging Zones.** Lists the charging zones belonging to one AMPECO location, identified by its numeric location ID. Use to enumerate or discover zone IDs within a known location before reading or editing them; enable Paginate Results to fetch every zone across pages rather than a single capped page. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location` | number | yes |  | Location. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `locationChargingZoneCreate`

**Resources - Locations - Create Charging Zone.** Creates a new charging zone under a given AMPECO location; requires the location ID, a zone name, and a status (enabled/disabled). Use to add a zone to an existing location; to change an existing zone use the Update Charging Zone action. Not idempotent: each call creates a separate zone, so guard against duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location` | number | yes |  | Location. |
| `name` | string | yes |  | Name. Internal name of the Charging Zone. This isn't visible to end-users in the app. |
| `status` | string | yes |  | Status. One of `"enabled"`, `"disabled"`. |
| `additionalInfo__enabled` | string | no |  | Additional Info - Enabled. One of `"true"`, `"false"`. |
| `additionalInfo__title` | array | no |  | Additional Info - Title. Each item: { `locale`?, `translation`? }. |
| `additionalInfo__description` | array | no |  | Additional Info - Description. Each item: { `locale`?, `translation`? }. |

### `locationChargingZoneRead`

**Resources - Locations - Read Charging Zone.** Fetches a single charging zone within an AMPECO location; requires both the location ID and the charging zone ID. Use to retrieve one known zone; to enumerate the zones of a location use the Listing Charging Zones action. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location` | number | yes |  | Location. |
| `chargingZone` | number | yes |  | Charging Zone. |

### `locationChargingZoneUpdate`

**Resources - Locations - Update Charging Zone.** Updates editable fields (name, status, localized additional info) of an existing charging zone, identified by its location ID and charging zone ID. Use to modify a known zone; to add a new one use the Create Charging Zone action. Only the fields you supply are changed, so repeating the same call converges to the same state and is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location` | number | yes |  | Location. |
| `chargingZone` | number | yes |  | Charging Zone. |
| `name` | string | no |  | Name. Internal name of the Charging Zone. This isn't visible to end-users in the app. |
| `status` | string | no |  | Status. One of `"enabled"`, `"disabled"`. |
| `additionalInfo__enabled` | string | no |  | Additional Info - Enabled. One of `"true"`, `"false"`. |
| `additionalInfo__title` | array | no |  | Additional Info - Title. Each item: { `locale`?, `translation`? }. |
| `additionalInfo__description` | array | no |  | Additional Info - Description. Each item: { `locale`?, `translation`? }. |

### `locationChargingZoneDelete`

**Resources - Locations - Delete Charging Zone.** Permanently deletes one charging zone from a given AMPECO location; requires both the location ID and the charging zone ID. Use to remove a single zone. Idempotent in effect: the end state is the zone being gone, though repeating may report it as already removed. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location` | number | yes |  | Location. |
| `chargingZone` | number | yes |  | Charging Zone. |

### `notificationsResendFailed`

**Actions - Notifications - Resend Failed.** Re-deliver previously failed webhook notifications for a given notification endpoint, filtered by notification types and an optional start/end time window. Subject to rate limiting (one resend per notification ID every 15 minutes), and disabled notifications cannot be resent. Not idempotent: each call dispatches the matching notifications again. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `notification` | number | yes |  | Notification. |
| `notifications` | array | yes |  | Notifications. One of `"AuthorizationNotification"`, `"authorization.changed"`, `"BootNotification"`, `"ChargePointChangedNotification"`, `"chargePoint.changed"`, `"evse.changed"`, `"ChargePointSyncConfigurationNotification"`, `"CircuitConsumptionNotification"`, `"circuit.changed"`, `"DiagnosticsStatusNotification"`, `"HardwareStatusNotification"`, `"LocationChangedNotification"`, `"NetworkStatusNotification"`, `"SecurityEventNotification"`, `"SessionMeterValuesNotification"`, `"SessionStartStopNotification"`, `"session.start.stop.notification"`, `"SessionUpdateNotification"`, `"UserChangedNotification"`, `"SubOperatorChangedNotification"`, `"TariffChangedNotification"`, `"user.subscriptionChanged"`, `"user.subscription.changed"`, `"ReservationChangedNotification"`, `"PaymentMethodChangedNotification"` and 17 more. |
| `startTime` | string | no |  | Start Time. Resend all failed notifications from this date onwards. |
| `endTime` | string | no |  | End Time. Resend all failed notifications up to this date. |

### `parkingSpaceUpdateOccupancyStatus`

**Actions - Parking Spaces - Update Occupancy Status.** Set a parking space's occupancy status to "available" or "occupied" by its numeric ID. Use to report whether an EV parking bay is currently free or taken. Idempotent: re-applying the same status is a no-op. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parkingSpace` | number | yes |  | Parking Space. |
| `status` | string | yes |  | Status. One of `"available"`, `"occupied"`. |

### `createParkingSpace`

**Resources - Parking Spaces - Create.** Create a new parking space in AMPECO, tied to a location and optionally linked to EVSEs in the same charging zone. Not idempotent: calling it repeatedly produces duplicate spaces, so pass a stable externalId and check via the list action first if you need dedup. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label` | string | yes |  | Label. |
| `locationId` | number | yes |  | Location Id. |
| `externalId` | string | no |  | External Id. |
| `status` | string | no |  | Status. One of `"enabled"`, `"disabled"`. |
| `occupancyStatus` | string | no |  | Occupancy Status. One of `"unknown"`, `"available"`, `"occupied"`. |
| `disabilitiesAccessible` | string | no |  | Disabilities Accessible. One of `"true"`, `"false"`. |
| `evses` | array | no |  | Evses. The list of Evses at the same Parking Space. The Evses should belongs to same charging zone. |

### `listParkingSpace`

**Resources - Parking Spaces - List.** List parking spaces, optionally filtered by externalId or restricted to a single EVSE. Read-only and idempotent. Enable Paginate Results to walk every page when you need the full set rather than a single page. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__externalId` | string | no |  | Filter - External Id. |
| `filter__evseId` | number | no |  | Filter - Evse Id. Only list Parking spaces on a certain EVSE. |
| `include` | array | no |  | Include. One of `"evses"`. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `updateParkingSpace`

**Resources - Parking Spaces - Update.** Update a parking space by its numeric ID, replacing fields such as label, location, status, occupancy status, accessibility, external ID, and associated EVSEs. Uses a full PUT replacement, so re-running with the same values is safe. Use to modify a known parking space. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parkingSpace` | number | yes |  | Parking Space. |
| `label` | string | yes |  | Label. |
| `locationId` | number | yes |  | Location Id. |
| `externalId` | string | no |  | External Id. |
| `status` | string | no |  | Status. One of `"enabled"`, `"disabled"`. |
| `occupancyStatus` | string | no |  | Occupancy Status. One of `"unknown"`, `"available"`, `"occupied"`. |
| `disabilitiesAccessible` | string | no |  | Disabilities Accessible. One of `"true"`, `"false"`. |
| `evses` | array | no |  | Evses. The list of Evses at the same Parking Space. The Evses should belongs to same charging zone. |

### `getParkingSpace`

**Resources - Parking Spaces - Get.** Retrieve a single parking space by its numeric ID, optionally including its related EVSEs. Use when you already know the ID and need its details; read-only and safe to retry. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parkingSpace` | number | yes |  | Parking Space. |
| `include` | array | no |  | Include. One of `"evses"`. |

### `deleteParkingSpace`

**Resources - Parking Spaces - Delete.** Permanently delete a parking space by its numeric id. Destructive and not reversible; deleting an already-removed id will error. Naturally idempotent in effect (the space ends up gone) but treat as unsafe to retry blindly. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `parkingSpace` | number | yes |  | Parking Space. |

### `certificateIssueAnEmaid`

**Actions - Provisioning Certificate - Certificate Issue An EMAID.** Issue a new e-mobility account identifier (EMAID) from a provisioning certificate, optionally binding a payment method (a card payment-method ID, "corporate:{id}" for corporate billing, or null for last-used). Use this to mint a fresh EMAID; to refresh the certificate on an existing id tag use certificate-reissue-an-emaid. Not idempotent: each call issues a new EMAID. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provisioningCertificate` | number | yes |  | Provisioning Certificate. |
| `paymentMethod` | string | no |  | Payment Method. The payment method that will be associated with the EMAID Tag. * For **credit/debit cards** the `paymentMethodId` should be provided * For **Corporate billing** - `corporate:{id}` * For **last used** the value should be `null`. |

### `createPcId`

**Resources - Provisioning Certificates - Create Pc Id.** Register a new AMPECO provisioning certificate (Plug & Charge) with a PC ID, name, vehicle type, owning user, and optional ID tags. Not idempotent: each call creates a new certificate. Use update pc id to modify an existing certificate. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `pcId` | string | yes |  | Pc Id. |
| `name` | string | yes |  | Name. |
| `vehicleType` | string | yes |  | Vehicle Type. One of `"company"`, `"private"`. |
| `userId` | number | yes |  | User Id. |
| `idTags` | array | no |  | Id Tags. Each item: { `id`?, `type`?, `name`?, `paymentMethod`?, `status`?, `expireAt`? }. |

### `listPcIds`

**Resources - Provisioning Certificates - List Pc Ids.** List all AMPECO provisioning certificates (Plug & Charge), with Paginate Results to auto-fetch every page. Read-only and idempotent; use this to discover certificate IDs before getting, updating, or deleting a specific one. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `updatePcId`

**Resources - Provisioning Certificates - Update Pc Id.** Update an existing AMPECO provisioning certificate identified by its numeric ID, changing fields such as PC ID, name, vehicle type, user, or ID tags. A partial PATCH that applies only the fields you supply. Use create pc id to register a new certificate instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provisioningCertificate` | number | yes |  | Provisioning Certificate. |
| `pcId` | string | no |  | Pc Id. |
| `name` | string | no |  | Name. |
| `vehicleType` | string | no |  | Vehicle Type. One of `"company"`, `"private"`. |
| `userId` | number | no |  | User Id. |
| `idTags` | array | no |  | Id Tags. Each item: { `id`?, `type`?, `name`?, `paymentMethod`?, `status`?, `expireAt`? }. |

### `getPcId`

**Resources - Provisioning Certificates - Get Pc Id.** Fetch a single AMPECO provisioning certificate by its numeric ID. Read-only and idempotent; use when you already have the certificate ID. To find IDs first, use the list pc ids action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provisioningCertificate` | number | yes |  | Provisioning Certificate. |

### `deletePcId`

**Resources - Provisioning Certificates - Delete Pc Id.** Permanently delete an AMPECO provisioning certificate by its numeric ID. Destructive and not reversible; a repeat call on an already-deleted certificate will fail. Verify the ID via get or list pc ids before deleting. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `provisioningCertificate` | number | yes |  | Provisioning Certificate. |

### `reservationCancel`

**Actions - Reservation - Reservation Cancel.** Cancel an existing charge-point reservation by id, optionally with a reason. Set force=true to end the reservation regardless of the charge point response. Effectively idempotent: once cancelled the reservation stays cancelled, though cancelling a non-cancellable reservation may error. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reservation` | number | yes |  | Reservation. |
| `force` | string | no |  | Force. Use force=true when you want to end the reservation regardless of the CP response. One of `"true"`, `"false"`. |
| `reason` | string | no |  | Reason. In case reason is empty, following text "Activated via API" will be added automatically. |

### `updateCustomTariffFilterTariff`

**Actions - Roaming Operator - Update Custom Tariff Filter Tariff.** Set the full pricing data (OCPI-style tariff: currency, price components, restrictions, energy mix) for a roaming operator custom tariff filter, updating the underlying roaming tariff. Idempotent: it replaces the tariff filter's pricing with the supplied definition, so re-sending the same payload yields the same end state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roamingOperator` | number | yes |  | Roaming Operator. |
| `customTariffFilter` | number | yes |  | Custom Tariff Filter. |
| `country_code` | string | no |  | Country Code. ISO-3166 alpha-2 country code of the CPO that owns this Tariff. |
| `party_id` | string | no |  | Party Id. ID of the CPO that owns this Tariff (following the ISO-15118 standard). |
| `id` | string | yes |  | Id. Uniquely identifies the tariff within the CPO's platform. |
| `currency` | string | yes |  | Currency. ISO 4217 code of the currency of this tariff. |
| `type` | string | no |  | Type. Type of this tariff. One of `"AD_HOC_PAYMENT"`, `"PROFILE_CHEAP"`, `"PROFILE_FAST"`, `"PROFILE_GREEN"`, `"REGULAR"`. |
| `tariff_alt_text` | array | no |  | Tariff Alt Text. List of multi-language alternative texts for this tariff. Each item: { `language`, `text` }. |
| `tariff_alt_url` | string | no |  | Tariff Alt Url. URL to a web page that contains an explanation of the tariff information. |
| `min_price__excl_vat` | number | no |  | Min Price - Excl Vat. Price excluding VAT. |
| `min_price__incl_vat` | number | no |  | Min Price - Incl Vat. Price including VAT. |
| `max_price__excl_vat` | number | no |  | Max Price - Excl Vat. Price excluding VAT. |
| `max_price__incl_vat` | number | no |  | Max Price - Incl Vat. Price including VAT. |
| `elements` | array | yes |  | Elements. List of Tariff Elements. Each item: { `price_components`, `restrictions__start_time`?, `restrictions__end_time`?, `restrictions__start_date`?, `restrictions__end_date`?, `restrictions__min_kwh`?, `restrictions__max_kwh`?, `restrictions__min_current`?, `restrictions__max_current`?, `restrictions__min_power`?, `restrictions__max_power`?, `restrictions__min_duration`?, `restrictions__max_duration`?, `restrictions__day_of_week`?, `restrictions__reservation`? }. |
| `start_date_time` | ISO date-time string | no |  | Start Date Time. The time when this tariff becomes active. Format ISO 8601 UTC. |
| `end_date_time` | ISO date-time string | no |  | End Date Time. The time after which this tariff is no longer valid. Format ISO 8601 UTC. |
| `energy_mix__is_green_energy` | string | no |  | Energy Mix - Is Green Energy. True if 100% from regenerative sources. One of `"true"`, `"false"`. |
| `energy_mix__energy_sources` | array | no |  | Energy Mix - Energy Sources. Energy sources of this energy mix. Each item: { `source`, `percentage` }. |
| `energy_mix__environ_impact` | array | no |  | Energy Mix - Environ Impact. Environmental impact of this energy mix. Each item: { `category`, `amount` }. |
| `energy_mix__supplier_name` | string | no |  | Energy Mix - Supplier Name. Name of the energy supplier. |
| `energy_mix__energy_product_name` | string | no |  | Energy Mix - Energy Product Name. Name of the energy product. |
| `last_updated` | ISO date-time string | yes |  | Last Updated. Timestamp when this Tariff was last updated. Format ISO 8601 UTC. |

### `listRoamingConnections`

**Resources - Roaming Connections - List Roaming Connections.** List all roaming connections on the account. Read-only and safe to repeat. Enable Paginate Results to fetch every connection; to retrieve one known connection by ID use get-roaming-connection. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `getRoamingConnection`

**Resources - Roaming Connections - Get Roaming Connection.** Fetch a single roaming connection by its numeric ID. Read-only and safe to repeat. To enumerate all roaming connections use list-roaming-connections instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roamingConnection` | number | yes |  | Roaming Connection. |

### `roamingOperatorsListing`

**Resources - Roaming Operators - Roaming Operators Listing.** List all roaming operators in AMPECO. Read-only and idempotent; enable Paginate Results to fetch every page, or leave it off for a single page (up to per_page, max 100). Use to discover a roaming operator ID before reading, updating, or managing its custom tariff filters. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `roamingOperatorRead`

**Resources - Roaming Operators - Roaming Operator Read.** Retrieve a single roaming operator by its numeric ID. Read-only and idempotent. Pick this when you already know the roaming operator ID; otherwise use the roaming operators listing action to find it first. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roamingOperator` | number | yes |  | Roaming Operator. |

### `roamingOperatorUpdate`

**Resources - Roaming Operators - Roaming Operator Update.** Update an existing roaming operator (identified by its numeric ID), changing business name, partner linkage/enabled state, and CPO settings such as QR-code prefix, manual EVSE management, and tariff-integration options. Only supplied fields change; idempotent on the given values. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roamingOperator` | number | yes |  | Roaming Operator. |
| `businessName` | string | no |  | Business Name. |
| `partnerId` | number | no |  | Partner Id. If a non-null value is provided, it will set enabled to true. If null is provided, it will set enabled to false. |
| `enabled` | string | no |  | Enabled. One of `"true"`, `"false"`. |
| `cpoSettings__cpoQrcodePrefix` | string | no |  | Cpo Settings - Cpo Qrcode Prefix. Example - "http://m.intercharge.eu/qr?evseid=" if the URL in the QR Code is http://m.intercharge.eu/qr?evseid=CH*ION*E213604. |
| `cpoSettings__manualEvseManagement` | string | no |  | Cpo Settings - Manual Evse Management. One of `"true"`, `"false"`. |
| `cpoSettings__applyCustomTariffsToEvsesWithRoamingTariff` | string | no |  | Cpo Settings - Apply Custom Tariffs To Evses With Roaming Tariff. One of `"true"`, `"false"`. |
| `cpoSettings__sendsPeriodicMeterUpdates` | string | no |  | Cpo Settings - Sends Periodic Meter Updates. One of `"true"`, `"false"`. |
| `cpoSettings__externalTariffIntegration` | string | no |  | Cpo Settings - External Tariff Integration. Only possible value is `has.to.be`. |
| `cpoSettings__threatEvseStatusUnknownAs` | string | no |  | Cpo Settings - Threat Evse Status Unknown As. One of `"available"`, `"unavailable"`. |
| `cpoSettings__phaseAcPowerFormula` | string | no |  | Cpo Settings - Phase Ac Power Formula. One of `"amperage_voltage_3"`, `"amperage_voltage_sqr3"`. |

### `listRoamingCustomTariffFilters`

**Resources - Roaming Operators - List Roaming Custom Tariff Filters.** List the custom tariff filters belonging to a given roaming operator, optionally filtered by status or creation date. Read-only and idempotent; enable Paginate Results to fetch every page, or leave it off for a single page (up to per_page, max 100). Use to discover a filter ID before reading, updating, deleting, or reordering filters. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roamingOperator` | number | yes |  | Roaming Operator. |
| `filter__status` | string | no |  | Filter - Status. Filter by status (enabled or disabled) One of `"enabled"`, `"disabled"`. |
| `filter__createdAfter` | ISO date-time string | no |  | Filter - Created After. Filter by creation date (greater than or equal to) |
| `filter__createdBefore` | ISO date-time string | no |  | Filter - Created Before. Filter by creation date (less than or equal to) |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `createRoamingCustomTariffFilter`

**Resources - Roaming Operators - Create Roaming Custom Tariff Filter.** Create a new custom tariff filter under a roaming operator, with a name, status, and optional matching criteria (country code, current types, power-below threshold, EVSE ID prefix, order). Not idempotent: each call adds another filter, so check existing filters first. To change one instead, use the update action. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roamingOperator` | number | yes |  | Roaming Operator. |
| `name` | string | yes |  | Name. |
| `status` | string | yes |  | Status. One of `"enabled"`, `"disabled"`. |
| `countryCode` | string | no |  | Country Code. ISO 3166-1 alpha-2 country code. |
| `applicableCurrentTypes` | array | no |  | Applicable Current Types. Array of current types (AC, DC) that this filter applies to, pass an empty array to clear all current type restrictions. One of `"AC"`, `"DC"`. |
| `powerBelowKw` | number | no |  | Power Below Kw. Filter EVSEs with power below specified kW value. |
| `evseIdPrefix` | string | no |  | Evse Id Prefix. Filter EVSEs whose IDs start with specified prefix(es). Multiple prefixes separated by newlines. |
| `order` | number | no |  | Order. Position of the tariff filter in the ordering sequence. When not provided during creation, it will go last. If an already existing order number is provided, it will reorder the other tariff filters to take their place in the sequence. |

### `reorderRoamingCustomTariffFilters`

**Resources - Roaming Operators - Reorder Roaming Custom Tariff Filters.** Reposition custom tariff filters within a roaming operator by supplying filter IDs paired with their new order positions. Supports partial reordering: only listed filters move, the rest keep their relative order. Idempotent for a given target arrangement. Use the list action first to obtain current filter IDs and positions. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roamingOperator` | number | yes |  | Roaming Operator. |
| `filters` | array | yes |  | Filters. Array of custom tariff filter IDs with their new positions. Only include filters that need to be moved - others will maintain their relative positions. Each item: { `id`, `order` }. |

### `getRoamingCustomTariffFilter`

**Resources - Roaming Operators - Get Roaming Custom Tariff Filter.** Retrieve a single custom tariff filter for a roaming operator by the roaming operator ID and the filter ID. Read-only and idempotent. Pick this when you already have both IDs; otherwise list the filters first to find the filter ID. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roamingOperator` | number | yes |  | Roaming Operator. |
| `customTariffFilter` | number | yes |  | Custom Tariff Filter. |

### `updateRoamingCustomTariffFilter`

**Resources - Roaming Operators - Update Roaming Custom Tariff Filter.** Update fields of an existing custom tariff filter for a roaming operator, identified by the roaming operator ID and filter ID. Only the fields you supply are changed. Idempotent on the supplied values; note that setting an already-used order value reshuffles the other filters in the sequence. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roamingOperator` | number | yes |  | Roaming Operator. |
| `customTariffFilter` | number | yes |  | Custom Tariff Filter. |
| `name` | string | no |  | Name. |
| `status` | string | no |  | Status. One of `"enabled"`, `"disabled"`. |
| `countryCode` | string | no |  | Country Code. ISO 3166-1 alpha-2 country code. |
| `applicableCurrentTypes` | array | no |  | Applicable Current Types. Array of current types (AC, DC) that this filter applies to. One of `"AC"`, `"DC"`. |
| `powerBelowKw` | number | no |  | Power Below Kw. Filter EVSEs with power below specified kW value. |
| `evseIdPrefix` | string | no |  | Evse Id Prefix. Filter EVSEs whose IDs start with specified prefix(es). Multiple prefixes separated by newlines. |
| `order` | number | no |  | Order. Position of the tariff filter in the ordering sequence. If an already existing order number is provided, it will reorder the other tariff filters to take their place in the sequence. |

### `deleteRoamingCustomTariffFilter`

**Resources - Roaming Operators - Delete Roaming Custom Tariff Filter.** Permanently delete a custom tariff filter from a roaming operator, identified by the roaming operator ID and filter ID. Destructive and irreversible; effectively idempotent since deleting an already-removed filter has no further effect, though it may return a not-found error. Confirm both IDs before calling. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roamingOperator` | number | yes |  | Roaming Operator. |
| `customTariffFilter` | number | yes |  | Custom Tariff Filter. |

### `roamingProvidersListing`

**Resources - Roaming Providers - Listing.** List AMPECO roaming providers (external EV charging network partners), optionally filtered by platform ID, country code, or party ID. Read-only and idempotent. Enable pagination to fetch all matches across pages. Use this to discover roaming provider IDs before reading, updating, or deleting one. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__platformId` | number | no |  | Filter - Platform Id. |
| `filter__countryCode` | string | no |  | Filter - Country Code. |
| `filter__partyId` | string | no |  | Filter - Party Id. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `roamingProviderCreate`

**Resources - Roaming Providers - Create.** Create a new AMPECO roaming provider for an EMSP roaming connection. Only applicable for Hubject, Gireve 2.2.1, and OCPI connections with a missing credentials module; choose the matching variant (Hubject or OCPI/Gireve 2.2.1) and supply business name and platform ID. Not idempotent: each call creates a separate provider. To modify an existing provider, use the roaming provider update action. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `requestBody_VariantType` | string | yes |  | Request Body Variant Type. Select the type of the variant. One of `"1"`, `"2"`. |
| `requestBody` | object | yes |  | Request Body. An object whose fields depend on other inputs; the product shows them. |

### `roamingProviderRead`

**Resources - Roaming Providers - Read.** Fetch the details of a single AMPECO roaming provider by its numeric ID. Read-only and idempotent. Pick this when you already have a provider ID; to search or browse providers, use the roaming providers listing action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roamingProvider` | number | yes |  | Roaming Provider. |

### `roamingProviderUpdate`

**Resources - Roaming Providers - Update.** Update an existing AMPECO roaming provider identified by numeric ID, sending only the provided fields as a partial PATCH. The request body shape depends on the selected variant: Hubject (hubjectId) or OCPI/Gireve 2.2.1 (countryCode, partyId). Idempotent: applying the same values repeatedly leaves the provider unchanged. Use the create action to add a new provider instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roamingProvider` | number | yes |  | Roaming Provider. |
| `requestBody_VariantType` | string | yes |  | Request Body Variant Type. Select the type of the variant. One of `"1"`, `"2"`. |
| `requestBody` | object | yes |  | Request Body. An object whose fields depend on other inputs; the product shows them. |

### `roamingProviderDelete`

**Resources - Roaming Providers - Delete.** Permanently delete an AMPECO roaming provider by its numeric ID. Destructive; deleting an already-removed provider returns an error rather than succeeding silently. Confirm the provider ID via the listing action first. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roamingProvider` | number | yes |  | Roaming Provider. |

### `roamingTariffsListing`

**Resources - Roaming Tariffs - Listing.** List roaming tariffs, optionally auto-paginating across all pages to gather every record. Use to browse or find a roaming tariff; read-only and safe to retry. To fetch one known tariff by ID use the read action instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `roamingTariffRead`

**Resources - Roaming Tariffs - Read.** Retrieve a single roaming tariff by its numeric ID. Use when you already know the ID and need its details; read-only and safe to retry. To search or browse multiple tariffs use the listing action instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roamingTariff` | number | yes |  | Roaming Tariff. |

### `roamingTariffUpdate`

**Resources - Roaming Tariffs - Update.** Update an existing roaming tariff by its numeric ID, assigning the local tariff group applied to its EVSEs. Use to modify a known roaming tariff; targets a specific record so re-running with the same values is safe. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roamingTariff` | number | yes |  | Roaming Tariff. |
| `tariffGroupId` | number | no |  | Tariff Group Id. The ID of the local Tariff Group assigned to the EVSEs with this roaming tariff(s). |

### `sessionAssignToUser`

**Actions - Session - Assign To User.** Attach a user to a charging session that currently has no user. Only works on sessions with Completed billing status and no existing user. Not idempotent: the assignment is permanent and irreversible, and a second call (after the session already has a user) will fail. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | number | yes |  | Session. |
| `userId` | number | yes |  | User Id. |

### `sessionRetryPayment`

**Actions - Session - Retry Payment.** Re-attempt a failed payment for a charging session, optionally against a specific payment method. Not idempotent: each call triggers a new charge attempt, so repeated calls can result in multiple charges if a prior attempt actually succeeded. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | number | yes |  | Session. |
| `paymentMethodId` | number | no |  | Payment Method Id. |

### `subscriptionPlanReplace`

**Actions - Subscription Plans - Replace.** Replace one subscription plan with a different plan across all tariff restrictions and charge points that reference the old plan, optionally scheduled for a future date (immediate if left empty). A reason note is required for change tracking. Not idempotent: each call records a new replacement and applies the swap. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriptionPlan` | number | yes |  | Subscription Plan. |
| `planId` | number | yes |  | Plan Id. The ID of the subscription plan that replaces the current one. The new Subscription plan will be added to the Subscription plans Restrictions for the Tariffs, where the old plan is present. Also it will be added to all Charge points that require the current Subscription plan. |
| `replaceAt` | ISO date-time string | no |  | Replace At. The date from which the new Subscription Plan replaces the current one. If left empty, it is replaced immediately. |
| `reason` | string | yes |  | Reason. Internal note for tracking changes and the reasons for those changes. |

### `subscriptionPlansListing`

**Resources - Subscription Plans - Listing.** List all AMPECO subscription plans configured on the platform. Read-only and idempotent. Enable the pagination option to fetch every plan across pages; otherwise a single page (up to per_page results) is returned. Use this to discover plan IDs before reading, updating, or deleting a specific plan. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `subscriptionPlanCreate`

**Resources - Subscription Plans -  Create.** Create a new AMPECO subscription plan (pre-paid or post-paid) defining renewal cycle, fees, kWh allowances, and visibility restrictions for EV charging subscribers. Not idempotent: each call creates a separate plan, so re-running duplicates it. To change an existing plan, use a subscription-plan update action instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | array | yes |  | Name. Locales that have been created and are not provided on an update will be deleted. Please provide values in all locales that you wish to keep. Each item: { `locale`?, `translation`? }. |
| `description` | array | yes |  | Description. Locales that have been created and are not provided on an update will be deleted. Please provide values in all locales that you wish to keep. Each item: { `locale`?, `translation`? }. |
| `renewalCycle` | string | yes |  | Renewal Cycle. One of `"monthly"`, `"annually"`. |
| `freeRenewalPeriods` | number | no |  | Free Renewal Periods. The number of renewal periods that are free of charge. This is only applicable for pre-paid plans. |
| `type` | string | yes |  | Type. One of `"pre-paid"`, `"post-paid"`. |
| `baseFee` | number | no |  | Base Fee. For pre-paid plans this is the price, for post-paid plans this is the base fee. |
| `baseFeeAppliesPerEachHomeCharger` | string | no |  | Base Fee Applies Per Each Home Charger. Makes the base fee apply per each home charger owned by the subscriber. One of `"true"`, `"false"`. |
| `postPaidChargingSessionsAccumulation` | string | no |  | Post Paid Charging Sessions Accumulation. Indicates if charging sessions at personal, commercial+personal charge points are included in the post-paid subscription and would be billed at the end of the billing cycle or when a threshold is met, if there is such. One of `"none"`, `"personal"`, `"personal_commercial"`. |
| `billingUsageThreshold` | number | no |  | Billing Usage Threshold. If this threshold is reached, the amount due for the subscription would be billed immediately instead of waiting for the end of the billing period. |
| `billingType` | string | no |  | Billing Type. Applicable only for post-paid subscription plans when external billing is enabled. Controls the billing method used for this subscription plan. One of `"default"`, `"internal"`, `"external"`. |
| `status` | string | yes |  | Status. One of `"enabled"`, `"disabled"`. |
| `allowance__resetCycle` | string | no |  | Allowance - Reset Cycle. One of `"as_renewal_cycle"`, `"after_each_session"`, `"after_24_hours"`, `"after_each_week"`, `"after_each_month"`, `"after_each_year"`. |
| `allowance__type` | string | no |  | Allowance - Type. One of `"none"`, `"combined"`, `"separate"`. |
| `allowance__homeChargersOnly` | string | no |  | Allowance - Home Chargers Only. When true the allowance can only be used on the home charge points owned by the user. In that case all other allowance restrictions have no effect. One of `"true"`, `"false"`. |
| `allowance__includedCountries` | array | no |  | Allowance - Included Countries. The allowance can only be used on charge points in countries in this list. When empty the allowance is valid for charge points in all countries, except the ones explicitly listed in the excludedCountries. One of `"AF"`, `"AX"`, `"AL"`, `"DZ"`, `"AS"`, `"AD"`, `"AO"`, `"AI"`, `"AQ"`, `"AG"`, `"AR"`, `"AM"`, `"AW"`, `"AU"`, `"AT"`, `"AZ"`, `"BS"`, `"BH"`, `"BD"`, `"BB"`, `"BY"`, `"BE"`, `"BZ"`, `"BJ"`, `"BM"` and 225 more. |
| `allowance__excludedCountries` | array | no |  | Allowance - Excluded Countries. The allowance cannot be used on charge points in the countries in this list. One of `"AF"`, `"AX"`, `"AL"`, `"DZ"`, `"AS"`, `"AD"`, `"AO"`, `"AI"`, `"AQ"`, `"AG"`, `"AR"`, `"AM"`, `"AW"`, `"AU"`, `"AT"`, `"AZ"`, `"BS"`, `"BH"`, `"BD"`, `"BB"`, `"BY"`, `"BE"`, `"BZ"`, `"BJ"`, `"BM"` and 225 more. |
| `allowance__excludeRoaming` | string | no |  | Allowance - Exclude Roaming. When true the allowance cannot be used on roaming charge points. One of `"true"`, `"false"`. |
| `allowance__includedPartnerChargePoints` | array | no |  | Allowance - Included Partner Charge Points. An array of Partner IDs. The allowance can only be used on charge points of Partners in this list. When empty the allowance is valid for charge points of any Partner, except the ones explicitly listed in the excludedPartnerChargePoints. |
| `allowance__excludedPartnerChargePoints` | array | no |  | Allowance - Excluded Partner Charge Points. An array of Partner IDs. The allowance cannot be used on charge points of Partners in this list. |
| `allowance__combined` | number | no |  | Allowance - Combined. The amount of kWh included - combined for AC and DC, should be provided if the type is combined. |
| `allowance__ac` | number | no |  | Allowance - Ac. The amount of kWh included for AC, should be provided if the type is separate. |
| `allowance__dc` | number | no |  | Allowance - Dc. The amount of kWh included for DC, should be provided if the type is separate. |
| `visibilityRestrictions__includedPartnerUsers` | array | no |  | Visibility Restrictions - Included Partner Users. An array of Partner IDs. The Subscription plan is available only to users invited (and accepted) or created by one of the Partners in this list. When empty the plan is available to all users, except the ones of Partners listed in excludedPartnerUsers. |
| `visibilityRestrictions__excludedPartnerUsers` | array | no |  | Visibility Restrictions - Excluded Partner Users. An array of Partner IDs. The Subscription plan is not available to users of the Partners in this list. |
| `visibilityRestrictions__includedUserGroups` | array | no |  | Visibility Restrictions - Included User Groups. An array of User Group IDs. The Subscription plan is available only to users with a User Group that is in this list. When empty the plan is available to all users, except the ones with a User Group listed in excludedUserGroups. |
| `visibilityRestrictions__excludedUserGroups` | array | no |  | Visibility Restrictions - Excluded User Groups. An array of User Group IDs. The Subscription plan is not available to users with a User Group that is in this list. |

### `subscriptionPlanRead`

**Resources - Subscription Plans - Read.** Fetch the full details of one AMPECO subscription plan by its numeric ID. Read-only and idempotent. Pick this when you already have a plan ID; to find plans by name or browse all of them, use the subscription plans listing action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriptionPlan` | number | yes |  | Subscription Plan. |

### `subscriptionPlanUpdate`

**Resources - Subscription Plans - Update.** Modify an existing AMPECO subscription plan by its numeric ID, changing localized name/description, renewal cycle, pre-paid/post-paid type, fees, allowance (kWh and country/partner restrictions), visibility restrictions, and enabled/disabled status. Not idempotent: it edits a plan that must already exist, and localized name/description entries omitted on update are deleted, so always send all locales you want to keep. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriptionPlan` | number | yes |  | Subscription Plan. |
| `name` | array | no |  | Name. Locales that have been created and are not provided on an update will be deleted. Please provide values in all locales that you wish to keep. Each item: { `locale`?, `translation`? }. |
| `description` | array | no |  | Description. Locales that have been created and are not provided on an update will be deleted. Please provide values in all locales that you wish to keep. Each item: { `locale`?, `translation`? }. |
| `renewalCycle` | string | no |  | Renewal Cycle. One of `"monthly"`, `"annually"`. |
| `freeRenewalPeriods` | number | no |  | Free Renewal Periods. The number of renewal periods that are free of charge. This is only applicable for pre-paid plans. |
| `type` | string | no |  | Type. Required when Post-paid Subscription plans has been enabled for the system. One of `"pre-paid"`, `"post-paid"`. |
| `baseFee` | number | no |  | Base Fee. For pre-paid plans this is the price, for post-paid plans this is the base fee. |
| `feePerEachPersonalChargePoint` | number | no |  | Fee Per Each Personal Charge Point. Applies separately per each personal charge point owned by the subscriber that requires this Subscription plan. |
| `postPaidChargingSessionsAccumulation` | string | no |  | Post Paid Charging Sessions Accumulation. Indicates if charging sessions at personal, commercial+personal charge points are included in the post-paid subscription and would be billed at the end of the billing cycle or when a threshold is met, if there is such. One of `"none"`, `"personal"`, `"personal_commercial"`. |
| `billingUsageThreshold` | number | no |  | Billing Usage Threshold. If this threshold is reached, the amount due for the subscription would be billed immediately instead of waiting for the end of the billing period. |
| `billingType` | string | no |  | Billing Type. Applicable only for post-paid subscription plans when external billing is enabled. Controls the billing method used for this subscription plan. One of `"default"`, `"internal"`, `"external"`. |
| `status` | string | no |  | Status. A change from disabled to enabled is only possible for Subscription plans that are not replaced with another plan. One of `"enabled"`, `"disabled"`. |
| `allowance__resetCycle` | string | no |  | Allowance - Reset Cycle. One of `"as_renewal_cycle"`, `"after_each_session"`, `"after_24_hours"`, `"after_each_week"`, `"after_each_month"`, `"after_each_year"`. |
| `allowance__type` | string | no |  | Allowance - Type. One of `"none"`, `"combined"`, `"separate"`. |
| `allowance__homeChargersOnly` | string | no |  | Allowance - Home Chargers Only. When true the allowance can only be used on the home charge points owned by the user. In that case all other allowance restrictions have no effect. One of `"true"`, `"false"`. |
| `allowance__includedCountries` | array | no |  | Allowance - Included Countries. The allowance can only be used on charge points in countries in this list. When empty the allowance is valid for charge points in all countries, except the ones explicitly listed in the excludedCountries. One of `"AF"`, `"AX"`, `"AL"`, `"DZ"`, `"AS"`, `"AD"`, `"AO"`, `"AI"`, `"AQ"`, `"AG"`, `"AR"`, `"AM"`, `"AW"`, `"AU"`, `"AT"`, `"AZ"`, `"BS"`, `"BH"`, `"BD"`, `"BB"`, `"BY"`, `"BE"`, `"BZ"`, `"BJ"`, `"BM"` and 225 more. |
| `allowance__excludedCountries` | array | no |  | Allowance - Excluded Countries. The allowance cannot be used on charge points in the countries in this list. One of `"AF"`, `"AX"`, `"AL"`, `"DZ"`, `"AS"`, `"AD"`, `"AO"`, `"AI"`, `"AQ"`, `"AG"`, `"AR"`, `"AM"`, `"AW"`, `"AU"`, `"AT"`, `"AZ"`, `"BS"`, `"BH"`, `"BD"`, `"BB"`, `"BY"`, `"BE"`, `"BZ"`, `"BJ"`, `"BM"` and 225 more. |
| `allowance__excludeRoaming` | string | no |  | Allowance - Exclude Roaming. When true the allowance cannot be used on roaming charge points. One of `"true"`, `"false"`. |
| `allowance__includedPartnerChargePoints` | array | no |  | Allowance - Included Partner Charge Points. An array of Partner IDs. The allowance can only be used on charge points of Partners in this list. When empty the allowance is valid for charge points of any Partner, except the ones explicitly listed in the excludedPartnerChargePoints. |
| `allowance__excludedPartnerChargePoints` | array | no |  | Allowance - Excluded Partner Charge Points. An array of Partner IDs. The allowance cannot be used on charge points of Partners in this list. |
| `allowance__combined` | number | no |  | Allowance - Combined. The amount of kWh included - combined for AC and DC, should be provided if the type is combined. |
| `allowance__ac` | number | no |  | Allowance - Ac. The amount of kWh included for AC, should be provided if the type is separate. |
| `allowance__dc` | number | no |  | Allowance - Dc. The amount of kWh included for DC, should be provided if the type is separate. |
| `visibilityRestrictions__includedPartnerUsers` | array | no |  | Visibility Restrictions - Included Partner Users. An array of Partner IDs. The Subscription plan is available only to users invited (and accepted) or created by one of the Partners in this list. When empty the plan is available to all users, except the ones of Partners listed in excludedPartnerUsers. |
| `visibilityRestrictions__excludedPartnerUsers` | array | no |  | Visibility Restrictions - Excluded Partner Users. An array of Partner IDs. The Subscription plan is not available to users of the Partners in this list. |
| `visibilityRestrictions__includedUserGroups` | array | no |  | Visibility Restrictions - Included User Groups. An array of User Group IDs. The Subscription plan is available only to users with a User Group that is in this list. When empty the plan is available to all users, except the ones with a User Group listed in excludedUserGroups. |
| `visibilityRestrictions__excludedUserGroups` | array | no |  | Visibility Restrictions - Excluded User Groups. An array of User Group IDs. The Subscription plan is not available to users with a User Group that is in this list. |

### `subscriptionPlanDelete`

**Resources - Subscription Plans - Delete.** Permanently delete an AMPECO subscription plan by its numeric ID. Destructive; deleting an already-removed plan returns an error rather than succeeding silently. Use the listing action first to confirm the correct plan ID. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscriptionPlan` | number | yes |  | Subscription Plan. |

### `tariffSetDisplayInformation`

**Actions - Tariffs - Set Display Information.** Set the text shown on a charge point's display for a tariff, covering the eligible-user price, total-cost summary, and (base tariffs only) default and offline default price information. Idempotent: overwrites the tariff's display fields with the supplied values. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tariff` | number | yes |  | Tariff. |
| `defaultPriceInformation` | string | no |  | Default Price Information. It could be set only for base tariff. The default information that would be shown on the display of the charge point without the user having authorized themselves. The default price information from the base tariff of the first EVSE would be used for the display, when the charge point has more than… |
| `defaultPriceInformationOffline` | string | no |  | Default Price Information Offline. It could be set only for base tariff. The information that would be shown on the display of the charge point when offline. |
| `priceInformation` | string | no |  | Price Information. The information that would be shown on the display of the charge point for users that are eligible for this tariff. |
| `totalCostInformation` | string | no |  | Total Cost Information. Additional information that would be displayed on the charge point when the session ends, along with the total fees for energy, duration and idle. |

### `tariffsListing`

**Resources - Tariffs - Listing.** List AMPECO tariffs, optionally filtered by tariff group, type, or managing partner, with auto-pagination available. A distinct resolve mode: pass a tariff group ID together with a user ID to return the single concrete tariff that would apply when that user charges (omit the user for the anonymous-charging tariff). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__tariffGroupId` | number | no |  | Filter - Tariff Group Id. Only list tariffs in a certain group. |
| `filter__userId` | number | no |  | Filter - User Id. Can only be used with `tariffGroupId`. When set, a single tariff of the group will be returned (no meta or link props will be included), that will be applied to the when the given user is charging. Note that when you set it to empty (null) then the tariff for anonymous charging will be returned. |
| `filter__type` | string | no |  | Filter - Type. Only list tariff of this specific type. |
| `filter__partnerId` | number | no |  | Filter - Partner Id. Only list tariffs managed by certain partner. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `tariffCreate`

**Resources - Tariffs - Create.** Create a new AMPECO charging tariff, defining its pricing model (e.g. free, flat rate, duration+energy, time-of-day, peak/average power levels, or optimised dynamic pricing) along with fees, idle rules, restrictions, and display text. Not idempotent: each call creates a distinct tariff. The chosen type governs which pricing fields apply; to change an existing tariff use the update action instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `type` | string | yes |  | Type. Setting the type to `charging not allowed` or `free` is enough for creating the particular type of tariff. One of `"free"`, `"flat rate"`, `"duration+energy"`, `"duration+energy time of day"`, `"energy tou"`, `"standard"`, `"charging not allowed"`, `"average power levels"`, `"peak power levels"`, `"standard_tod"`, `"optimised dynamic pricing"`. |
| `dayTariffStart` | string | no |  | Day Tariff Start. A time when the day begins. |
| `nightTariffStart` | string | no |  | Night Tariff Start. A time when the night begins. |
| `pricing__pricePerSession` | number | no |  | Pricing - Price Per Session. Price per session. Only applicable with flat rate tariffs. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__connectionFee` | number | no |  | Pricing - Connection Fee. Connection fee. A fixed fee that is applied at the start of the charging session. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__pricePerKwh` | number | no |  | Pricing - Price Per Kwh. Price per kWh. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__dayPricePerKwh` | number | no |  | Pricing - Day Price Per Kwh. Price per kWh during the day. Applicable for duration+energy time of day. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__nightPricePerKwh` | number | no |  | Pricing - Night Price Per Kwh. Price per kWh during the night. Applicable for duration+energy time of day. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__pricePeriodInMinutes` | string | no |  | Pricing - Price Period In Minutes. Charging period. In minutes. It defines the time-period for charging a fee. One of `"1"`, `"15"`, `"30"`, `"60"`, `"240"`, `"360"`. |
| `pricing__pricePerPeriod` | number | no |  | Pricing - Price Per Period. Charging fee per period. Applicable for duration+energy. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__durationFeeLimit` | number | no |  | Pricing - Duration Fee Limit. Duration fee limit for the whole session if fee is applied. |
| `pricing__dayPricePerPeriod` | number | no |  | Pricing - Day Price Per Period. Charging fee per period during the day. Applicable for duration+energy time of day. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__nightPricePerPeriod` | number | no |  | Pricing - Night Price Per Period. Charging fee per period during the night. Applicable for duration+energy time of day. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__dayIdleFeePerMinute` | number | no |  | Pricing - Day Idle Fee Per Minute. Charging fee per minute during the day. Applicable for duration+energy time of day. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__nightIdleFeePerMinute` | number | no |  | Pricing - Night Idle Fee Per Minute. Charging fee per minute during the night. Applicable for duration+energy time of day. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__idleFeePerMinute` | number | no |  | Pricing - Idle Fee Per Minute. Idle fee per minute. A fee per minute that is applied during idle period (no charging). Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__idleFeeGracePeriodMinutes` | number | no |  | Pricing - Idle Fee Grace Period Minutes. Idle fee grace period (min). Optional. When idle period (no charging) is detected during a session the user is given this grace period to remove the vehicle, before idle fee starts applying. |
| `pricing__idlePricingPeriodInMinutes` | string | no |  | Pricing - Idle Pricing Period In Minutes. Idle fee per minute. A fee per minute that is applied during idle period (no charging). One of `"1"`, `"15"`, `"30"`, `"60"`, `"240"`, `"360"`. |
| `pricing__idleFeePeriodStart` | string | no |  | Pricing - Idle Fee Period Start. Defined start time for the application of idle fee. |
| `pricing__idleFeePeriodEnd` | string | no |  | Pricing - Idle Fee Period End. Defined end time for the application of idle fee. |
| `pricing__idleFeeLimit` | number | no |  | Pricing - Idle Fee Limit. Idle fee limit for the whole session if fee is applied. |
| `pricing__connectionFeeMinimumSessionDuration` | number | no |  | Pricing - Connection Fee Minimum Session Duration. Connection Fee Minimum Session Duration (min). Optional. |
| `pricing__connectionFeeMinimumSessionEnergy` | number | no |  | Pricing - Connection Fee Minimum Session Energy. Connection Fee Minimum Session Energy (kWh). Optional. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__durationFeeGracePeriod` | number | no |  | Pricing - Duration Fee Grace Period. Duration Fee Grace Period (min). Optional. |
| `pricing__minPrice` | number | no |  | Pricing - Min Price. Min. price. Sets a minimum total amount per session. |
| `pricing__preAuthorizeAmount` | number | no |  | Pricing - Pre Authorize Amount. Pre-authorize amount. The amount to pre-authorize before starting a session. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__taxID` | number | no |  | Pricing - Tax I D. If Multi-tax Support has been enabled in the Ampeco.CHARGE settings, you can provide the taxId for the tariff here. |
| `pricing__chargePointElectricityRate` | string | no |  | Pricing - Charge Point Electricity Rate. Use the Electricity Rate of the Charge Point that is already attached and aims to track the electricity costs. One of `"true"`, `"false"`. |
| `pricing__fallbackElectricityRateId` | number | no |  | Pricing - Fallback Electricity Rate Id. When ChargePointElectricityRate is set to *false*, the Electricity Rate ID MUST be supplied in order the electricity rates for the tariff to be known. |
| `pricing__markupPercentagePerKwh` | number | no |  | Pricing - Markup Percentage Per Kwh. |
| `pricing__markupFixedFeePerKwh` | number | no |  | Pricing - Markup Fixed Fee Per Kwh. |
| `pricing__flexibleMarkUpAsFixedPerKwh__defaultPrice` | number | no |  | Pricing - Flexible Mark Up As Fixed Per Kwh - Default Price. Set price for the intervals not specified in `intervalPricing` field. |
| `pricing__flexibleMarkUpAsFixedPerKwh__intervalPricing` | array | no |  | Pricing - Flexible Mark Up As Fixed Per Kwh - Interval Pricing. The time interval must be always the same and should not exceed the 24-hour mark. It could be either 15 min, 30 min or 60 min. The startAt and endAt must comply with this restriction. Each item: { `startsAt`, `endsAt`, `price` }. |
| `pricing__multiPricePerKwh` | array | no |  | Pricing - Multi Price Per Kwh. Create the price levels according to the kWh. <br /> The first level must have zero value for **firstKwh**. <br /> The last level must have an infinity value for **lastKwh**. Each item: { `firstKwh`, `lastKwh`?, `feePerKwh`?, `flatFee`? }. |
| `pricing__multiPricePerDuration` | array | no |  | Pricing - Multi Price Per Duration. Create the price levels according to the duration of the session from the time the charging started. <br /> The first level must have zero value for **firstUnit**. <br /> The last level must have an infinity value for **lastUnit**. Each item: { `firstUnit`, `lastUnit`?, `feePerUnit`?, `flatFee`? }. |
| `pricing__multiIdleFee` | array | no |  | Pricing - Multi Idle Fee. Different price levels could be created depending on the duration of the idle period. <br /> The first level must have zero value for **firstUnit**. <br /> The last level must have an infinity value for **lastUnit**. Each item: { `firstUnit`, `lastUnit`?, `feePerUnit`?, `flatFee`? }. |
| `pricing__regularUsePeriod` | number | no |  | Pricing - Regular Use Period. In minutes. Only for the Peak power level tariff. |
| `pricing__averagePowerLevels` | array | no |  | Pricing - Average Power Levels. Each item: { `averagePowerUpToKw`, `pricePerMinute` }. |
| `pricing__peakPowerLevels` | array | no |  | Pricing - Peak Power Levels. Each item: { `peakPowerUpToKw`, `regularPricePerMinute`, `excessUsePricePerMin` }. |
| `pricing__timePeriods` | array | no |  | Pricing - Time Periods. Each item: { `startTime`, `endTime` }. |
| `pricing__pricePeriods__connectionFeePeriods__fee` | array | no |  | Pricing - Price Periods - Connection Fee Periods - Fee. |
| `pricing__pricePeriods__energyFeePeriods__fee` | array | no |  | Pricing - Price Periods - Energy Fee Periods - Fee. |
| `pricing__pricePeriods__durationFeePeriods__fee` | array | no |  | Pricing - Price Periods - Duration Fee Periods - Fee. |
| `pricing__pricePeriods__idleFeePeriods__fee` | array | no |  | Pricing - Price Periods - Idle Fee Periods - Fee. |
| `pricing__daysWhenApplied` | array | no |  | Pricing - Days When Applied. When left empty, this means that this is the standard pricing that would be applied in general without taking into consideration the day. Each item: { `name`?, `specialDates`?, `idleFeeGracePeriodMinutes`?, `idlePricingPeriodInMinutes`?, `connectionFeeMinimumSessionDuration`?, `connectionFeeMinimumSessionEnergy`?, `durationFeeGracePeriod`?, `pricePeriodInMinutes`?, `pricePeriods__connectionFeePeriods__fee`?, `pricePeriods__energyFeePeriods__fee`?, `pricePeriods__durationFeePeriods__fee`?, `pricePeriods__idleFeePeriods__fee`? }. |
| `pricing__thresholdPriceForEnergy` | number | no |  | Pricing - Threshold Price For Energy. Price for kWh to be considered by Optimised charging for setting the charging periods. |
| `pricing__priceForEnergyWhenOptimized` | number | no |  | Pricing - Price For Energy When Optimized. |
| `pricing__optimisedLabel` | string | no |  | Pricing - Optimised Label. |
| `pricing__durationFeeFrom` | string | no |  | Pricing - Duration Fee From. Defined start time for the application of duration fees. |
| `pricing__durationFeeTo` | string | no |  | Pricing - Duration Fee To. Defined end time for the application of duration fees. |
| `pricing__subsidyIntegrationId` | number | no |  | Pricing - Subsidy Integration Id. The subsidy integration id that should be applied for this tariff. Only valid for Energy ToU tariffs. Please use the AMPECO.CHARGE backend for the specific integration id. |
| `pricing__lockPriceOnSessionStart` | string | no |  | Pricing - Lock Price On Session Start. When enabled the tariff of the charger will be saved using the pricing interval when the user starts the charging session. One of `"true"`, `"false"`. |
| `pricing__lockEnergyPriceOnSessionStart` | string | no |  | Pricing - Lock Energy Price On Session Start. When enabled the tariff of the charger will be saved using the pricing interval when the user starts the charging session. One of `"true"`, `"false"`. |
| `pricing__lockDurationPriceOnSessionStart` | string | no |  | Pricing - Lock Duration Price On Session Start. When enabled, the energy fee component of the tariff will be saved using the pricing interval when the user starts the charging session. One of `"true"`, `"false"`. |
| `pricing__lockIdlePriceOnSessionStart` | string | no |  | Pricing - Lock Idle Price On Session Start. When enabled, the duration fee component of the tariff will be saved using the pricing interval when the user starts the charging session. One of `"true"`, `"false"`. |
| `pricing__stateOfChargeIdleThreshold` | string | no |  | Pricing - State Of Charge Idle Threshold. Switches the session to idle when the SoC (%) exceeds the selected value. Leave empty to use the system wide setting. This option will take effect only if `Allow custom SoC (%) threshold per Tariff` is set in `Idle period detection` setting. One of `"75"`, `"80"`, `"85"`, `"90"`, `"95"`, `"100"`. |
| `pricing__averagePowerIdleThreshold` | number | no |  | Pricing - Average Power Idle Threshold. Sets the session to idle state when the average kW for the past 5 minutes is below the set threshold. This option will take effect only if `Allow custom power threshold per Tariff` is set in `Idle period detection` setting. |
| `stopSession__timeLimitMinutes` | number | no |  | Stop Session - Time Limit Minutes. Session max time. The maximum minutes a session is allowed to run. Skip for no time limit. |
| `stopSession__stopWhenEnergyExceedsKwh` | number | no |  | Stop Session - Stop When Energy Exceeds Kwh. The maximum energy (kWh) allowed per session. Skip for no limit. |
| `restrictions__applyToUsersOfChargePointOwner` | string | no |  | Restrictions - Apply To Users Of Charge Point Owner. Makes the tariff apply to users of the partner, who is set as owner of the charge point. One of `"true"`, `"false"`. |
| `restrictions__applyToUsersOfChargePointPartner` | string | no |  | Restrictions - Apply To Users Of Charge Point Partner. Makes the tariff apply to users of the partner, who is set as owner of the charge point. One of `"true"`, `"false"`. |
| `restrictions__applyToUsersOfAllRoamingEmsps` | string | no |  | Restrictions - Apply To Users Of All Roaming Emsps. Makes the tariff apply to users of all eMSPs, which are roaming partners. One of `"true"`, `"false"`. |
| `restrictions__applyToAdHocUsers` | string | no |  | Restrictions - Apply To Ad Hoc Users. Makes the tariff valid for non-registered users(ad-hoc charging). One of `"true"`, `"false"`. |
| `restrictions__adHocPreAuthorizeAmount` | number | no |  | Restrictions - Ad Hoc Pre Authorize Amount. Sets the amount that would be blocked on the user's card at the start of the session. Required if applyToAdHocUsers is true and one of the following billing strategies is chosen: `Require payment method and authorize certain amount before starting session` or `Require payment method OR minimum amou… |
| `restrictions__adHocStopWhenPreAuthorizedAmountFallsBelow` | number | no |  | Restrictions - Ad Hoc Stop When Pre Authorized Amount Falls Below. Set the minimum pre-authorized amount threshold. When the remaining ad hoc pre-authorized amount falls below this value, the charging session will automatically stop to prevent revenue loss. |
| `restrictions__applyToUsersOfPartners` | array | no |  | Restrictions - Apply To Users Of Partners. Users of specific Partners. Provide a list of partner IDs. Matches if the user is a invited to at least one of the partners. |
| `restrictions__applyToUsersWithGroups` | array | no |  | Restrictions - Apply To Users With Groups. Users with a specific group. Provide a list of user groups. Matches if the user is a member of at least one of the groups. |
| `restrictions__applyToUserGroupIds` | array | no |  | Restrictions - Apply To User Group Ids. An array of user group IDs. Users with a specific group. Provide a list of user group IDs. |
| `restrictions__applyToUsersWithSubscriptions` | array | no |  | Restrictions - Apply To Users With Subscriptions. Users with a specific subscription plan. Provide a list of subscription plan IDs. Matches if the user has active one of the subscription plans. |
| `restrictions__startDate` | ISO date-time string | no |  | Restrictions - Start Date. The date from which the tariff becomes valid. |
| `restrictions__endDate` | ISO date-time string | no |  | Restrictions - End Date. The expiry date of the tariff. The tariff is valid until this date inclusive. |
| `partner__id` | number | no |  | Partner - Id. The assigned Partner will have access to make changes to the tariff. |
| `display__defaultPriceInformation` | string | no |  | Display - Default Price Information. The default information that would be shown on the display of the charge point without the user having authorized themselves. |
| `display__defaultPriceInformationOffline` | string | no |  | Display - Default Price Information Offline. The information that would be shown on the display of the charge point when offline. |
| `display__priceInformation` | string | no |  | Display - Price Information. The information that would be shown on the display of the charge point for users that are eligible for this tariff. |
| `display__totalCostInformation` | string | no |  | Display - Total Cost Information. Additional information that would be displayed on the charge point when the session ends, along with the total fees for energy, duration and idle. |
| `integrationId` | number | no |  | Integration Id. References the internal integration configuration that enables this tariff type. |

### `tariffRead`

**Resources - Tariffs - Read.** Fetch a single AMPECO tariff by its numeric ID, returning its full pricing definition and settings. Use when you already know the tariff ID; to search or browse tariffs (including resolving the tariff that applies to a user within a group) use the tariffs listing action. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tariff` | number | yes |  | Tariff. |

### `tariffUpdate`

**Resources - Tariffs - Update.** Replace the full configuration of an existing AMPECO tariff identified by its numeric ID, including its type, pricing model, fees, restrictions, and display text. This is a full-replacement PUT, so supply all fields you want to keep; idempotent in that repeating the same payload yields the same final state. Use the create action to add a new tariff instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tariff` | number | yes |  | Tariff. |
| `name` | string | yes |  | Name. |
| `type` | string | yes |  | Type. Setting the type to `charging not allowed` or `free` is enough for creating the particular type of tariff. One of `"free"`, `"flat rate"`, `"duration+energy"`, `"duration+energy time of day"`, `"energy tou"`, `"standard"`, `"charging not allowed"`, `"average power levels"`, `"peak power levels"`, `"standard_tod"`, `"optimised dynamic pricing"`. |
| `dayTariffStart` | string | no |  | Day Tariff Start. A time when the day begins. |
| `nightTariffStart` | string | no |  | Night Tariff Start. A time when the night begins. |
| `pricing__pricePerSession` | number | no |  | Pricing - Price Per Session. Price per session. Only applicable with flat rate tariffs. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__connectionFee` | number | no |  | Pricing - Connection Fee. Connection fee. A fixed fee that is applied at the start of the charging session. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__pricePerKwh` | number | no |  | Pricing - Price Per Kwh. Price per kWh. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__dayPricePerKwh` | number | no |  | Pricing - Day Price Per Kwh. Price per kWh during the day. Applicable for duration+energy time of day. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__nightPricePerKwh` | number | no |  | Pricing - Night Price Per Kwh. Price per kWh during the night. Applicable for duration+energy time of day. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__pricePeriodInMinutes` | string | no |  | Pricing - Price Period In Minutes. Charging period. In minutes. It defines the time-period for charging a fee. One of `"1"`, `"15"`, `"30"`, `"60"`, `"240"`, `"360"`. |
| `pricing__pricePerPeriod` | number | no |  | Pricing - Price Per Period. Charging fee per period. Applicable for duration+energy. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__durationFeeLimit` | number | no |  | Pricing - Duration Fee Limit. Duration fee limit for the whole session if fee is applied. |
| `pricing__dayPricePerPeriod` | number | no |  | Pricing - Day Price Per Period. Charging fee per period during the day. Applicable for duration+energy time of day. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__nightPricePerPeriod` | number | no |  | Pricing - Night Price Per Period. Charging fee per period during the night. Applicable for duration+energy time of day. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__dayIdleFeePerMinute` | number | no |  | Pricing - Day Idle Fee Per Minute. Charging fee per minute during the day. Applicable for duration+energy time of day. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__nightIdleFeePerMinute` | number | no |  | Pricing - Night Idle Fee Per Minute. Charging fee per minute during the night. Applicable for duration+energy time of day. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__idleFeePerMinute` | number | no |  | Pricing - Idle Fee Per Minute. Idle fee per minute. A fee per minute that is applied during idle period (no charging). Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__idleFeeGracePeriodMinutes` | number | no |  | Pricing - Idle Fee Grace Period Minutes. Idle fee grace period (min). Optional. When idle period (no charging) is detected during a session the user is given this grace period to remove the vehicle, before idle fee starts applying. |
| `pricing__idlePricingPeriodInMinutes` | string | no |  | Pricing - Idle Pricing Period In Minutes. Idle fee per minute. A fee per minute that is applied during idle period (no charging). One of `"1"`, `"15"`, `"30"`, `"60"`, `"240"`, `"360"`. |
| `pricing__idleFeePeriodStart` | string | no |  | Pricing - Idle Fee Period Start. Defined start time for the application of idle fee. |
| `pricing__idleFeePeriodEnd` | string | no |  | Pricing - Idle Fee Period End. Defined end time for the application of idle fee. |
| `pricing__idleFeeLimit` | number | no |  | Pricing - Idle Fee Limit. Idle fee limit for the whole session if fee is applied. |
| `pricing__connectionFeeMinimumSessionDuration` | number | no |  | Pricing - Connection Fee Minimum Session Duration. Connection Fee Minimum Session Duration (min). Optional. |
| `pricing__connectionFeeMinimumSessionEnergy` | number | no |  | Pricing - Connection Fee Minimum Session Energy. Connection Fee Minimum Session Energy (kWh). Optional. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__durationFeeGracePeriod` | number | no |  | Pricing - Duration Fee Grace Period. Duration Fee Grace Period (min). Optional. |
| `pricing__minPrice` | number | no |  | Pricing - Min Price. Min. price. Sets a minimum total amount per session. |
| `pricing__preAuthorizeAmount` | number | no |  | Pricing - Pre Authorize Amount. Pre-authorize amount. The amount to pre-authorize before starting a session. Up to 5 digits after the decimal point depending on the currency precision. |
| `pricing__taxID` | number | no |  | Pricing - Tax I D. If Multi-tax Support has been enabled in the Ampeco.CHARGE settings, you can provide the taxId for the tariff here. |
| `pricing__chargePointElectricityRate` | string | no |  | Pricing - Charge Point Electricity Rate. Use the Electricity Rate of the Charge Point that is already attached and aims to track the electricity costs. One of `"true"`, `"false"`. |
| `pricing__fallbackElectricityRateId` | number | no |  | Pricing - Fallback Electricity Rate Id. When ChargePointElectricityRate is set to *false*, the Electricity Rate ID MUST be supplied in order the electricity rates for the tariff to be known. |
| `pricing__markupPercentagePerKwh` | number | no |  | Pricing - Markup Percentage Per Kwh. |
| `pricing__markupFixedFeePerKwh` | number | no |  | Pricing - Markup Fixed Fee Per Kwh. |
| `pricing__flexibleMarkUpAsFixedPerKwh__defaultPrice` | number | no |  | Pricing - Flexible Mark Up As Fixed Per Kwh - Default Price. Set price for the intervals not specified in `intervalPricing` field. |
| `pricing__flexibleMarkUpAsFixedPerKwh__intervalPricing` | array | no |  | Pricing - Flexible Mark Up As Fixed Per Kwh - Interval Pricing. The time interval must be always the same and should not exceed the 24-hour mark. It could be either 15 min, 30 min or 60 min. The startAt and endAt must comply with this restriction. Each item: { `startsAt`, `endsAt`, `price` }. |
| `pricing__multiPricePerKwh` | array | no |  | Pricing - Multi Price Per Kwh. Create the price levels according to the kWh. <br /> The first level must have zero value for **firstKwh**. <br /> The last level must have an infinity value for **lastKwh**. Each item: { `firstKwh`, `lastKwh`?, `feePerKwh`?, `flatFee`? }. |
| `pricing__multiPricePerDuration` | array | no |  | Pricing - Multi Price Per Duration. Create the price levels according to the duration of the session from the time the charging started. <br /> The first level must have zero value for **firstUnit**. <br /> The last level must have an infinity value for **lastUnit**. Each item: { `firstUnit`, `lastUnit`?, `feePerUnit`?, `flatFee`? }. |
| `pricing__multiIdleFee` | array | no |  | Pricing - Multi Idle Fee. Different price levels could be created depending on the duration of the idle period. <br /> The first level must have zero value for **firstUnit**. <br /> The last level must have an infinity value for **lastUnit**. Each item: { `firstUnit`, `lastUnit`?, `feePerUnit`?, `flatFee`? }. |
| `pricing__regularUsePeriod` | number | no |  | Pricing - Regular Use Period. In minutes. Only for the Peak power level tariff. |
| `pricing__averagePowerLevels` | array | no |  | Pricing - Average Power Levels. Each item: { `averagePowerUpToKw`, `pricePerMinute` }. |
| `pricing__peakPowerLevels` | array | no |  | Pricing - Peak Power Levels. Each item: { `peakPowerUpToKw`, `regularPricePerMinute`, `excessUsePricePerMin` }. |
| `pricing__timePeriods` | array | no |  | Pricing - Time Periods. Each item: { `startTime`, `endTime` }. |
| `pricing__pricePeriods__connectionFeePeriods__fee` | array | no |  | Pricing - Price Periods - Connection Fee Periods - Fee. |
| `pricing__pricePeriods__energyFeePeriods__fee` | array | no |  | Pricing - Price Periods - Energy Fee Periods - Fee. |
| `pricing__pricePeriods__durationFeePeriods__fee` | array | no |  | Pricing - Price Periods - Duration Fee Periods - Fee. |
| `pricing__pricePeriods__idleFeePeriods__fee` | array | no |  | Pricing - Price Periods - Idle Fee Periods - Fee. |
| `pricing__daysWhenApplied` | array | no |  | Pricing - Days When Applied. When left empty, this means that this is the standard pricing that would be applied in general without taking into consideration the day. Each item: { `name`?, `specialDates`?, `idleFeeGracePeriodMinutes`?, `idlePricingPeriodInMinutes`?, `connectionFeeMinimumSessionDuration`?, `connectionFeeMinimumSessionEnergy`?, `durationFeeGracePeriod`?, `pricePeriodInMinutes`?, `pricePeriods__connectionFeePeriods__fee`?, `pricePeriods__energyFeePeriods__fee`?, `pricePeriods__durationFeePeriods__fee`?, `pricePeriods__idleFeePeriods__fee`? }. |
| `pricing__thresholdPriceForEnergy` | number | no |  | Pricing - Threshold Price For Energy. Price for kWh to be considered by Optimised charging for setting the charging periods. |
| `pricing__priceForEnergyWhenOptimized` | number | no |  | Pricing - Price For Energy When Optimized. |
| `pricing__optimisedLabel` | string | no |  | Pricing - Optimised Label. |
| `pricing__durationFeeFrom` | string | no |  | Pricing - Duration Fee From. Defined start time for the application of duration fees. |
| `pricing__durationFeeTo` | string | no |  | Pricing - Duration Fee To. Defined end time for the application of duration fees. |
| `pricing__subsidyIntegrationId` | number | no |  | Pricing - Subsidy Integration Id. The subsidy integration id that should be applied for this tariff. Only valid for Energy ToU tariffs. Please use the AMPECO.CHARGE backend for the specific integration id. |
| `pricing__lockPriceOnSessionStart` | string | no |  | Pricing - Lock Price On Session Start. When enabled the tariff of the charger will be saved using the pricing interval when the user starts the charging session. One of `"true"`, `"false"`. |
| `pricing__lockEnergyPriceOnSessionStart` | string | no |  | Pricing - Lock Energy Price On Session Start. When enabled the tariff of the charger will be saved using the pricing interval when the user starts the charging session. One of `"true"`, `"false"`. |
| `pricing__lockDurationPriceOnSessionStart` | string | no |  | Pricing - Lock Duration Price On Session Start. When enabled, the energy fee component of the tariff will be saved using the pricing interval when the user starts the charging session. One of `"true"`, `"false"`. |
| `pricing__lockIdlePriceOnSessionStart` | string | no |  | Pricing - Lock Idle Price On Session Start. When enabled, the duration fee component of the tariff will be saved using the pricing interval when the user starts the charging session. One of `"true"`, `"false"`. |
| `pricing__stateOfChargeIdleThreshold` | string | no |  | Pricing - State Of Charge Idle Threshold. Switches the session to idle when the SoC (%) exceeds the selected value. Leave empty to use the system wide setting. This option will take effect only if `Allow custom SoC (%) threshold per Tariff` is set in `Idle period detection` setting. One of `"75"`, `"80"`, `"85"`, `"90"`, `"95"`, `"100"`. |
| `pricing__averagePowerIdleThreshold` | number | no |  | Pricing - Average Power Idle Threshold. Sets the session to idle state when the average kW for the past 5 minutes is below the set threshold. This option will take effect only if `Allow custom power threshold per Tariff` is set in `Idle period detection` setting. |
| `stopSession__timeLimitMinutes` | number | no |  | Stop Session - Time Limit Minutes. Session max time. The maximum minutes a session is allowed to run. Skip for no time limit. |
| `stopSession__stopWhenEnergyExceedsKwh` | number | no |  | Stop Session - Stop When Energy Exceeds Kwh. The maximum energy (kWh) allowed per session. Skip for no limit. |
| `restrictions__applyToUsersOfChargePointOwner` | string | no |  | Restrictions - Apply To Users Of Charge Point Owner. Makes the tariff apply to users of the partner, who is set as owner of the charge point. One of `"true"`, `"false"`. |
| `restrictions__applyToUsersOfChargePointPartner` | string | no |  | Restrictions - Apply To Users Of Charge Point Partner. Makes the tariff apply to users of the partner, who is set as owner of the charge point. One of `"true"`, `"false"`. |
| `restrictions__applyToUsersOfAllRoamingEmsps` | string | no |  | Restrictions - Apply To Users Of All Roaming Emsps. Makes the tariff apply to users of all eMSPs, which are roaming partners. One of `"true"`, `"false"`. |
| `restrictions__applyToAdHocUsers` | string | no |  | Restrictions - Apply To Ad Hoc Users. Makes the tariff valid for non-registered users(ad-hoc charging). One of `"true"`, `"false"`. |
| `restrictions__adHocPreAuthorizeAmount` | number | no |  | Restrictions - Ad Hoc Pre Authorize Amount. Sets the amount that would be blocked on the user's card at the start of the session. Required if applyToAdHocUsers is true and one of the following billing strategies is chosen: `Require payment method and authorize certain amount before starting session` or `Require payment method OR minimum amou… |
| `restrictions__adHocStopWhenPreAuthorizedAmountFallsBelow` | number | no |  | Restrictions - Ad Hoc Stop When Pre Authorized Amount Falls Below. Set the minimum pre-authorized amount threshold. When the remaining ad hoc pre-authorized amount falls below this value, the charging session will automatically stop to prevent revenue loss. |
| `restrictions__applyToUsersOfPartners` | array | no |  | Restrictions - Apply To Users Of Partners. Users of specific Partners. Provide a list of partner IDs. Matches if the user is a invited to at least one of the partners. |
| `restrictions__applyToUsersWithGroups` | array | no |  | Restrictions - Apply To Users With Groups. Users with a specific group. Provide a list of user groups. Matches if the user is a member of at least one of the groups. |
| `restrictions__applyToUserGroupIds` | array | no |  | Restrictions - Apply To User Group Ids. An array of user group IDs. Users with a specific group. Provide a list of user group IDs. |
| `restrictions__applyToUsersWithSubscriptions` | array | no |  | Restrictions - Apply To Users With Subscriptions. Users with a specific subscription plan. Provide a list of subscription plan IDs. Matches if the user has active one of the subscription plans. |
| `restrictions__startDate` | ISO date-time string | no |  | Restrictions - Start Date. The date from which the tariff becomes valid. |
| `restrictions__endDate` | ISO date-time string | no |  | Restrictions - End Date. The expiry date of the tariff. The tariff is valid until this date inclusive. |
| `partner__id` | number | no |  | Partner - Id. The assigned Partner will have access to make changes to the tariff. |
| `display__defaultPriceInformation` | string | no |  | Display - Default Price Information. The default information that would be shown on the display of the charge point without the user having authorized themselves. |
| `display__defaultPriceInformationOffline` | string | no |  | Display - Default Price Information Offline. The information that would be shown on the display of the charge point when offline. |
| `display__priceInformation` | string | no |  | Display - Price Information. The information that would be shown on the display of the charge point for users that are eligible for this tariff. |
| `display__totalCostInformation` | string | no |  | Display - Total Cost Information. Additional information that would be displayed on the charge point when the session ends, along with the total fees for energy, duration and idle. |
| `integrationId` | number | no |  | Integration Id. References the internal integration configuration that enables this tariff type. |

### `tariffDelete`

**Resources - Tariffs - Delete.** Permanently delete an AMPECO tariff by its numeric ID. Destructive: removes the pricing definition and cannot be undone, so confirm the tariff is no longer assigned before calling. Deleting an already-removed tariff will error rather than succeed silently. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tariff` | number | yes |  | Tariff. |

### `transactionIssueInvoice`

**Actions - Transactions - Issue Invoice.** Generate a new ad-hoc invoice for a transaction and send it to the given email, supplying individual or company billing details. Requires the AMPECO invoice integration to be enabled. To re-send an invoice that already exists, use the resend-invoice action instead. Not idempotent: each call issues a fresh invoice document. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transaction` | number | yes |  | Transaction. |
| `email` | string | yes |  | Email. Email address to send the invoice. |
| `invoiceDetails__invoiceType` | string | yes |  | Invoice Details - Invoice Type. One of `"individual"`, `"company"`. |
| `invoiceDetails__individualName` | string | no |  | Invoice Details - Individual Name. |
| `invoiceDetails__individualPersonalId` | string | no |  | Invoice Details - Individual Personal Id. |
| `invoiceDetails__individualTaxId` | string | no |  | Invoice Details - Individual Tax Id. |
| `invoiceDetails__companyName` | string | no |  | Invoice Details - Company Name. |
| `invoiceDetails__companyRegNo` | string | no |  | Invoice Details - Company Reg No. |
| `invoiceDetails__companyTaxId` | string | no |  | Invoice Details - Company Tax Id. |
| `invoiceDetails__companyTaxAdministrationOfficeName` | string | no |  | Invoice Details - Company Tax Administration Office Name. |
| `invoiceDetails__country` | string | no |  | Invoice Details - Country. One of `"AF"`, `"AX"`, `"AL"`, `"DZ"`, `"AS"`, `"AD"`, `"AO"`, `"AI"`, `"AQ"`, `"AG"`, `"AR"`, `"AM"`, `"AW"`, `"AU"`, `"AT"`, `"AZ"`, `"BS"`, `"BH"`, `"BD"`, `"BB"`, `"BY"`, `"BE"`, `"BZ"`, `"BJ"`, `"BM"` and 225 more. |
| `invoiceDetails__city` | string | no |  | Invoice Details - City. |
| `invoiceDetails__postCode` | string | no |  | Invoice Details - Post Code. |
| `invoiceDetails__address` | string | no |  | Invoice Details - Address. |

### `transactionResendInvoice`

**Actions - Transactions - Resend Invoice.** Re-send the invoice already issued for a transaction to the customer. Use only when an invoice exists (use the issue-invoice action first if one does not). Not idempotent: each call dispatches the email/document again, so repeated calls send duplicate copies. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transaction` | number | yes |  | Transaction. |

### `transactionUpdatePaymentReference`

**Actions - Transactions - Update Payment Reference.** Attach an external payment reference (e.g. a payment processor or terminal identifier) to a transaction so the payment can later be traced. Idempotent: it overwrites the reference field on the transaction, so re-running with the same value leaves the same end state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transaction` | number | yes |  | Transaction. |
| `ref` | string | yes |  | Ref. Reference to the payment processor or payment terminal where more information about the transaction could be checked. |

### `transactionsListing`

**Resources - Transactions - Listing.** List payment transactions, with optional filters by user, status, payment method, date ranges, invoice, session, voucher, terminal, billing type, or purchase type. Read-only and idempotent. Enable the Paginate Results option to fetch across pages up to Per page total; otherwise a single page (max 100) is returned. Use transactionRead when you already know a transaction id. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__createdAfter` | ISO date-time string | no |  | Filter - Created After. ISO 8601 formatted date. Lists only the transactions created after this datetime. |
| `filter__createdBefore` | ISO date-time string | no |  | Filter - Created Before. ISO 8601 formatted date. Lists only the transactions created before this datetime. |
| `filter__lastUpdatedAfter` | ISO date-time string | no |  | Filter - Last Updated After. ISO 8601 formatted date. Lists only the transactions that were last updated after this datetime. |
| `filter__lastUpdatedBefore` | ISO date-time string | no |  | Filter - Last Updated Before. ISO 8601 formatted date. Lists only the transactions that were last updated before this datetime. |
| `filter__paymentMethod` | string | no |  | Filter - Payment Method. Only list transactions by type of payment method. One of `"visa"`, `"mastercard"`, `"paypal"`, `"maestro"`, `"amex"`, `"unknown"`, `"applepay"`, `"googlepay"`, `"twint"`, `"other"`. |
| `filter__userId` | number | no |  | Filter - User Id. Only list transactions by a certain user. |
| `filter__invoiceNumber` | number | no |  | Filter - Invoice Number. Only list transaction by invoice number. |
| `filter__status` | string | no |  | Filter - Status. Only list transaction in this status. One of `"pending"`, `"finalized"`, `"failed"`, `"reserved"`, `"refunded"`, `"authorized"`, `"initialized"`. |
| `filter__sessionId` | number | no |  | Filter - Session Id. Only list transaction with this session id. |
| `filter__ref` | string | no |  | Filter - Ref. Only list transactions with specific ref number. |
| `filter__billingType` | string | no |  | Filter - Billing Type. Only list transactions with the selected billing type. One of `"internal"`, `"external"`. |
| `filter__terminalId` | number | no |  | Filter - Terminal Id. Only list transactions with specific payment terminal id. |
| `filter__finalizedBefore` | ISO date-time string | no |  | Filter - Finalized Before. ISO 8601 formatted date. Lists only the transactions finalized before this datetime. |
| `filter__finalizedAfter` | ISO date-time string | no |  | Filter - Finalized After. ISO 8601 formatted date. Lists only the transactions finalized after this datetime. |
| `filter__voucherId` | number | no |  | Filter - Voucher Id. Only list transactions paid with this specific voucher id. |
| `filter__purchaseType` | array | no |  | Filter - Purchase Type. Only list transactions with the specified purchase type(s). Determines what the transaction was for based on its associated entity. One of `"session"`, `"subscription_plan"`, `"topup_package"`, `"custom_fee"`, `"payment_terminal_authorisation"`, `"payment_authorisation"`. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `transactionsCreate`

**Resources - Transactions - Create.** Record a new payment transaction in AMPECO with a total amount, status, and optional payment method and session linkage. Not idempotent: each call creates a distinct transaction, so repeating it produces duplicate records. Use transactionUpdate to amend a non-finalised transaction. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `sessionId` | number | no |  | Session Id. |
| `paymentMethod__methodType` | string | no |  | Payment Method - Method Type. One of `"card"`, `"bank_transfer"`, `"wallet"`. |
| `paymentMethod__cardNetwork` | string | no |  | Payment Method - Card Network. Required when `methodType` is `card`. One of `"visa"`, `"mastercard"`, `"paypal"`, `"maestro"`, `"amex"`, `"unknown"`. |
| `paymentMethod__bankTransferType` | string | no |  | Payment Method - Bank Transfer Type. Required when `methodType` is `bank_transfer`. One of `"pse"`, `"sepa"`. |
| `paymentMethod__walletType` | string | no |  | Payment Method - Wallet Type. Required when `methodType` is `wallet`. One of `"applepay"`, `"googlepay"`, `"twint"`, `"other"`. |
| `paymentMethod__type` | string | no |  | Payment Method - Type. Deprecated, please use `methodType` and `cardNetwork` instead. One of `"visa"`, `"mastercard"`, `"paypal"`, `"maestro"`, `"amex"`, `"unknown"`. |
| `paymentMethod__last4` | string | no |  | Payment Method - Last4. |
| `paymentMethod__expMonth` | string | no |  | Payment Method - Exp Month. |
| `paymentMethod__expYear` | string | no |  | Payment Method - Exp Year. |
| `totalAmount` | number | yes |  | Total Amount. |
| `status` | string | yes |  | Status. One of `"pending"`, `"finalized"`, `"failed"`, `"reversed"`, `"refunded"`, `"authorized"`, `"initialized"`. |
| `ref` | string | no |  | Ref. |
| `failureReason` | string | no |  | Failure Reason. |

### `transactionRead`

**Resources - Transactions - Read.** Fetch a single payment transaction by its id, returning its amount, status, payment method and references. Read-only and idempotent. Use when you already have the transaction id; to search by user, status, or date use transactionsListing. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transaction` | string | yes |  | Transaction. |

### `transactionUpdate`

**Resources - Transactions - Update.** Modify an existing transaction identified by its id, changing its status, amount, payment method, or references. Idempotent: applies the supplied fields to that one transaction. Only works on non-finalised transactions; finalised ones cannot be edited. Use transactionsCreate to record a new transaction. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `transaction` | string | yes |  | Transaction. |
| `paymentMethod__methodType` | string | no |  | Payment Method - Method Type. One of `"card"`, `"bank_transfer"`. |
| `paymentMethod__cardNetwork` | string | no |  | Payment Method - Card Network. Required when `methodType` is `card`. One of `"visa"`, `"mastercard"`, `"paypal"`, `"maestro"`, `"amex"`, `"unknown"`. |
| `paymentMethod__bankTransferType` | string | no |  | Payment Method - Bank Transfer Type. Required when `methodType` is `bank_transfer`. One of `"pse"`, `"sepa"`. |
| `paymentMethod__type` | string | no |  | Payment Method - Type. Deprecated, please use `methodType` and `cardNetwork` instead. One of `"visa"`, `"mastercard"`, `"paypal"`, `"maestro"`, `"amex"`, `"unknown"`. |
| `paymentMethod__last4` | string | no |  | Payment Method - Last4. |
| `paymentMethod__expMonth` | string | no |  | Payment Method - Exp Month. |
| `paymentMethod__expYear` | string | no |  | Payment Method - Exp Year. |
| `status` | string | yes |  | Status. One of `"pending"`, `"finalized"`, `"failed"`, `"reversed"`, `"refunded"`, `"authorized"`, `"initialized"`. |
| `totalAmount` | number | yes |  | Total Amount. |
| `ref` | string | no |  | Ref. |
| `failureReason` | string | no |  | Failure Reason. |

### `userActivateSubscription`

**Actions - Users - Activate Subscription.** Activate a subscription plan for a user, optionally setting an end date, auto-renewal, and a reason recorded in the audit log. Use cancel-subscription to end one instead. Not idempotent: each call activates a subscription, so re-running can create another or conflict with an existing active one. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | number | yes |  | User. |
| `planId` | number | yes |  | Plan Id. |
| `endDate` | ISO date-time string | no |  | End Date. The subscription will be valid until this end date. |
| `autoRenewal` | string | no |  | Auto Renewal. Enable the auto-renewal of the subscription after the end date. One of `"true"`, `"false"`. |
| `reason` | string | no |  | Reason. In case reason is empty, following text "Activated via API" will be added automatically. |

### `userAddBalance`

**Actions - Users - Add Balance.** Credit (or debit, with a negative amount) a user's account balance by the given amount, recording the required reason. Not idempotent: this adds to the existing balance, so each call shifts it further rather than setting an absolute value. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | number | yes |  | User. |
| `amount` | number | yes |  | Amount. |
| `reason` | string | yes |  | Reason. |
| `app_info` | string | no |  | App Info. |

### `userApplyCustomFee`

**Actions - Users - Apply Custom Fee.** Charge an ad-hoc custom fee of the given amount to a user, optionally against a specific payment method (defaults to balance, rejecting if insufficient; corporate billing is not supported). The description is shown to the user and on their bank statement. Not idempotent: each call creates and charges a new fee. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | number | yes |  | User. |
| `amount` | number | yes |  | Amount. |
| `description` | string | yes |  | Description. Shown to the user and also added to the user's bank statement (if the payment method is a bank card). |
| `paymentMethodId` | string | no |  | Payment Method Id. The ID of the payment method, as returned by the payment method listing (User / Payment Method / Listing). When left empty or null, it would take the balance and if the balance is insufficient, would reject the action. Corporate billing is not supported as a payment method. |

### `userCancelSubscription`

**Actions - Users - Cancel Subscription.** Cancel a user's active subscription, recording the supplied reason in the audit log. Use activate-subscription to grant one instead. Effectively idempotent on the end state (subscription ends up cancelled), but cancelling when there is no active subscription may error. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | number | yes |  | User. |
| `reason` | string | yes |  | Reason. The reason for the cancellation. It would be included in the Audit logs. |

### `userChangeStatus`

**Actions - Users - Change Status.** Enable or disable a user account (enabled = allowed to use the system, disabled = blocked), recording the required reason. Idempotent: it sets the account to the chosen status, so re-running with the same status leaves the same end state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | number | yes |  | User. |
| `status` | string | yes |  | Status. * `enabled` Enabled - the user is allowed to use the system * `disabled` Disabled - the user is NOT allowed to use the system. One of `"enabled"`, `"disabled"`. |
| `reason` | string | yes |  | Reason. |

### `userClearSubscriptionAmountDue`

**Actions - Users - Clear Subscription Amount Due.** Zero out all unsettled amounts due (fees and charging sessions) on a user's current subscription. This is irreversible and only affects the user's current subscription. Effectively idempotent: once cleared the amount due is 0, so re-running has no further effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | number | yes |  | User. |

### `userExportAllPrivateData`

**Actions - Users - Export All Private Data.** Retrieve a full export of a user's stored private/personal data (read-only, for GDPR-style data-access requests). Idempotent: it only reads and returns data without changing anything. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | number | yes |  | User. |

### `userRedeemVoucher`

**Actions - Users - Redeem Voucher.** Redeem a voucher code on behalf of a user, granting whatever benefit the voucher carries. Not idempotent: each call consumes a redemption, so re-running may redeem again or fail if the code is single-use or already spent. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | number | yes |  | User. |
| `code` | string | yes |  | Code. The code of the voucher that should be redeemed. |

### `usersListing`

**Resources - Users - Users Listing.** List AMPECO users, optionally filtered by user group, partner, external id, email, external app data, or last-updated date range. Read-only and idempotent. Filtering by email or external id is the way to look a user up when you do not have their numeric id. Enable Paginate Results to fetch every page up to the Per page cap. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__userGroupId` | number | no |  | Filter - User Group Id. Only list users that belong to a certain user group. |
| `filter__partnerId` | number | no |  | Filter - Partner Id. Only list users attached to the partner. |
| `filter__externalId` | string | no |  | Filter - External Id. Only list users with specific external id. |
| `filter__email` | string | no |  | Filter - Email. Only list user with specific email. |
| `filter__externalAppData` | string | no |  | Filter - External App Data. Only list records with specific external application data. You can use a dot notation to search for nested properties. For example, `filter[externalAppData.property1.property2]=value`. |
| `filter__lastUpdatedAfter` | ISO date-time string | no |  | Filter - Last Updated After. ISO 8601 formatted date. Lists only the users that were last updated on and after this datetime. |
| `filter__lastUpdatedBefore` | ISO date-time string | no |  | Filter - Last Updated Before. ISO 8601 formatted date. Lists only the users that were last updated on and before this datetime. |
| `include` | array | no |  | Include. One of `"partnerInvites"`, `"externalAppData"`. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `userCreate`

**Resources - Users - User Create.** Create a new AMPECO user from an email and password, with optional profile, contact, address, group, and session-option fields. Use to register an account that does not yet exist; to modify an existing one use User Update. Not idempotent: repeated calls attempt to create duplicate users (and will fail if the email is already taken). Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `emailVerified` | string | no |  | Email Verified. ISO 8601 formatted date. |
| `password` | string | yes |  | Password. |
| `requirePasswordReset` | string | no |  | Require Password Reset. Sets a requirement for the user to set a new password when they next open the app. After a new password is set, this option resets automatically. One of `"true"`, `"false"`. |
| `first_name` | string | no |  | First Name. |
| `middle_name` | string | no |  | Middle Name. |
| `last_name` | string | no |  | Last Name. |
| `phone` | string | no |  | Phone. |
| `country` | string | no |  | Country. One of `"AF"`, `"AX"`, `"AL"`, `"DZ"`, `"AS"`, `"AD"`, `"AO"`, `"AI"`, `"AQ"`, `"AG"`, `"AR"`, `"AM"`, `"AW"`, `"AU"`, `"AT"`, `"AZ"`, `"BS"`, `"BH"`, `"BD"`, `"BB"`, `"BY"`, `"BE"`, `"BZ"`, `"BJ"`, `"BM"` and 225 more. |
| `state` | string | no |  | State. A value the product loads from the provider, such as an id; write the value itself. |
| `city` | string | no |  | City. |
| `post_code` | string | no |  | Post Code. |
| `address` | string | no |  | Address. |
| `vehicle_no` | string | no |  | Vehicle No. |
| `personal_id` | string | no |  | Personal Id. |
| `locale` | string | no |  | Locale. The language and regional settings to use in the app. **Only available** if the option to update the user locale has been enabled for the operator. |
| `userGroupIds` | array | no |  | User Group Ids. |
| `externalId` | string | no |  | External Id. Third party identifier of the user. |
| `options__sessionsAllowed` | string | no |  | Options - Sessions Allowed. Determine the number of sessions a user could start - single or multiple simultaneous sessions, or whether the user could start simultaneous sessions with several Id Tags. One of `"single_session"`, `"multiple_simultaneous_sessions_per_idtag"`, `"simultaneous_use_of_idtags"`, `"multiple_simultaneous_sessions_remotely_and_idtags"`. |
| `receiveNewsAndPromotions` | string | no |  | Receive News And Promotions. Indicates whether the user has opted into receiving news and promotions. To opt in, set this field to 'true'; otherwise, set it to 'false'. One of `"true"`, `"false"`. |
| `bankDetails__bankIban` | string | no |  | Bank Details - Bank Iban. IBAN that is provided for the user. |
| `bankDetails__bankName` | string | no |  | Bank Details - Bank Name. Name of the Bank for which the user has provided IBAN. |
| `bankDetails__bankAddress` | string | no |  | Bank Details - Bank Address. Address of the user's Bank. |
| `bankDetails__bankCode` | string | no |  | Bank Details - Bank Code. Bank code assigned by a central bank, a bank supervisory body or a Bankers Association in the country. |
| `bankDetails__bankAccountNumber` | string | no |  | Bank Details - Bank Account Number. Bank account ID provided by the user. |
| `bankDetails__bankAccountType` | string | no |  | Bank Details - Bank Account Type. Type of account the user has provided. |
| `nonce` | string | no |  | Nonce. A optional unique string that is used to prevent replay attacks. It's generated by the server, the client should pass it if the user is being created from an external sign up embedded web app and needs to automatically log in the user in the mobile app after creation. |

### `userRead`

**Resources - Users - User Read.** Fetch a single AMPECO user by numeric user id, optionally including partner invites or external app data and the current amount due. Read-only and idempotent. Use when you already have the id; to find a user by email or external id use Users Listing instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | number | yes |  | User. |
| `include` | array | no |  | Include. One of `"partnerInvites"`, `"externalAppData"`. |
| `withAmountDue` | string | no |  | With Amount Due. One of `"true"`, `"false"`. |

### `userUpdate`

**Resources - Users - User Update.** Update an existing AMPECO user, identified by numeric user id, changing profile, contact, address, credentials, group membership, session options, or bank details. Only the fields you supply are modified. Re-running with the same values is safe, but provided values overwrite the current ones. Use User Create to add a new user. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | number | yes |  | User. |
| `include` | array | no |  | Include. One of `"partnerInvites"`, `"externalAppData"`. |
| `email` | string | no |  | Email. |
| `emailVerified` | string | no |  | Email Verified. ISO 8601 formatted date. |
| `password` | string | no |  | Password. |
| `requirePasswordReset` | string | no |  | Require Password Reset. Sets a requirement for the user to set a new password when they next open the app. After a new password is set, this option resets automatically. One of `"true"`, `"false"`. |
| `first_name` | string | no |  | First Name. |
| `middle_name` | string | no |  | Middle Name. |
| `last_name` | string | no |  | Last Name. |
| `phone` | string | no |  | Phone. |
| `country` | string | no |  | Country. One of `"AF"`, `"AX"`, `"AL"`, `"DZ"`, `"AS"`, `"AD"`, `"AO"`, `"AI"`, `"AQ"`, `"AG"`, `"AR"`, `"AM"`, `"AW"`, `"AU"`, `"AT"`, `"AZ"`, `"BS"`, `"BH"`, `"BD"`, `"BB"`, `"BY"`, `"BE"`, `"BZ"`, `"BJ"`, `"BM"` and 225 more. |
| `state` | string | no |  | State. A value the product loads from the provider, such as an id; write the value itself. |
| `city` | string | no |  | City. |
| `post_code` | string | no |  | Post Code. |
| `address` | string | no |  | Address. |
| `vehicle_no` | string | no |  | Vehicle No. |
| `userGroupIds` | array | no |  | User Group Ids. |
| `externalId` | string | no |  | External Id. Third party identifier of the user. |
| `options__sessionsAllowed` | string | no |  | Options - Sessions Allowed. Determine the number of sessions a user could start - single or multiple simultaneous sessions, or whether the user could start simultaneous sessions with several Id Tags. One of `"single_session"`, `"multiple_simultaneous_sessions_per_idtag"`, `"simultaneous_use_of_idtags"`, `"multiple_simultaneous_sessions_remotely_and_idtags"`. |
| `receiveNewsAndPromotions` | string | no |  | Receive News And Promotions. Updates the user's preference for receiving news and promotions. To change their preference, update this field to 'true' to opt in, or 'false' to opt out. One of `"true"`, `"false"`. |
| `bankDetails__bankIban` | string | no |  | Bank Details - Bank Iban. IBAN that is provided for the user. |
| `bankDetails__bankName` | string | no |  | Bank Details - Bank Name. Name of the Bank for which the user has provided IBAN. |
| `bankDetails__bankAddress` | string | no |  | Bank Details - Bank Address. Address of the user's Bank. |
| `bankDetails__bankCode` | string | no |  | Bank Details - Bank Code. Bank code assigned by a central bank, a bank supervisory body or a Bankers Association in the country. |
| `bankDetails__bankAccountNumber` | string | no |  | Bank Details - Bank Account Number. Bank account ID provided by the user. |
| `bankDetails__bankAccountType` | string | no |  | Bank Details - Bank Account Type. Type of account the user has provided. |

### `userDelete`

**Resources - Users - User Delete.** Permanently delete a single AMPECO user by numeric user id. Destructive and irreversible; confirm the id (e.g. via User Read or Users Listing) before calling. Not a safe retry against an arbitrary id. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | number | yes |  | User. |
| `include` | array | no |  | Include. One of `"partnerInvites"`, `"externalAppData"`. |

### `invoiceDetailsRead`

**Resources - Users - Invoice Details Read.** Fetch the stored billing/invoice details for a single AMPECO user, identified by user id. Read-only and idempotent. Use to inspect current invoice settings before changing them with Invoice Details Create Or Update. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | number | yes |  | User. |

### `invoiceDetailsCreateOrUpdate`

**Resources - Users - Invoice Details Create Or Update.** Upsert the billing/invoice details for a single AMPECO user, keyed by user id. The required fields depend on the selected invoice-manager variant (Ampeco, Cardcom, SoftOne, or Ecpay). Idempotent: it overwrites any existing invoice details for that user rather than creating duplicates. Use Invoice Details Read to inspect the current values first. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | number | yes |  | User. |
| `requestBody_VariantType` | string | yes |  | Request Body Variant Type. Select the type of the variant. One of `"1"`, `"2"`, `"3"`, `"4"`. |
| `requestBody` | object | yes |  | Request Body. An object whose fields depend on other inputs; the product shows them. |

### `paymentMethodsListing`

**Resources - Users - Payment Methods Listing.** List all payment methods registered to a single AMPECO user, identified by user id. Read-only and idempotent. Enable Paginate Results to fetch every page up to the Per page cap. Use to discover payment method ids before Payment Method Read, Update, or Delete. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | number | yes |  | User. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `paymentMethodCreate`

**Resources - Users - Payment Method Create.** Register a payment method for an AMPECO user via a two-step flow: call with only the user id to initiate a registration request, then call again with the returned transaction id to finalize. Optionally specify a tokenized type (card or bank transfer/SEPA). Not idempotent: each initiation starts a fresh registration. Use Payment Method Update to change an existing method. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | number | yes |  | User. |
| `tokenizedType` | string | no |  | Tokenized Type. The type of the tokenized payment method. If not provided - defaults to card. One of `"card"`, `"bank_transfer"`. |
| `bankTransferType` | string | no |  | Bank Transfer Type. The type of the bank transfer. Required if `tokenizedType` is `bank_transfer`. One of `"sepa"`. |
| `transactionId` | number | no |  | Transaction Id. The ID of the Transaction object, created when you initiated the request. |

### `paymentMethodRead`

**Resources - Users - Payment Method Read.** Fetch a single payment method for an AMPECO user, identified by user id and payment method id. Read-only and idempotent. Use Payment Methods Listing to discover the ids first. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | number | yes |  | User. |
| `paymentMethodId` | string | yes |  | Payment Method Id. |

### `paymentMethodUpdate`

**Resources - Users - Payment Method Update.** Update a payment method for an AMPECO user, identified by user id and payment method id; primarily toggles whether it is the user's default. Re-running with the same value is safe. Built-in 'balance' and 'corporate' methods cannot be set as default. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | number | yes |  | User. |
| `paymentMethodId` | string | yes |  | Payment Method Id. |
| `default` | string | no |  | Default. One of `"true"`, `"false"`. |

### `paymentMethodDelete`

**Resources - Users - Payment Method Delete.** Remove a single payment method from an AMPECO user, identified by user id and payment method id. Destructive and irreversible. Built-in 'balance' and 'corporate' payment methods cannot be deleted here. Idempotent in effect once the method is gone, but it does not silently succeed on an unknown id. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user` | number | yes |  | User. |
| `paymentMethodId` | string | yes |  | Payment Method Id. |

### `notificationsSubscribe`

**Notifications - V2.0 - Notifications Subscribe.** Create a new AMPECO notification subscription that pushes selected event types to either a webhook callback URL or a Kafka topic. Not idempotent: each call registers another subscription. Choose delivery with the Via field (webhook vs kafka) and supply the matching delivery config; to change an existing subscription use the notification update action. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `via` | string | yes |  | Via. One of `"webhook"`, `"kafka"`. |
| `notifications` | array | yes |  | Notifications. One of `"AuthorizationNotification"`, `"authorization.changed"`, `"BootNotification"`, `"ChargePointChangedNotification"`, `"chargePoint.changed"`, `"evse.changed"`, `"ChargePointSyncConfigurationNotification"`, `"CircuitConsumptionNotification"`, `"circuit.changed"`, `"DiagnosticsStatusNotification"`, `"HardwareStatusNotification"`, `"LocationChangedNotification"`, `"NetworkStatusNotification"`, `"SecurityEventNotification"`, `"SessionMeterValuesNotification"`, `"SessionStartStopNotification"`, `"session.start.stop.notification"`, `"SessionUpdateNotification"`, `"UserChangedNotification"`, `"SubOperatorChangedNotification"`, `"TariffChangedNotification"`, `"user.subscriptionChanged"`, `"user.subscription.changed"`, `"ReservationChangedNotification"`, `"PaymentMethodChangedNotification"` and 17 more. |
| `webhook__callbackUrl` | string | yes |  | Webhook - Callback Url. |
| `kafka__topic` | string | yes |  | Kafka - Topic. |
| `kafka__brokers` | array | yes |  | Kafka - Brokers. |
| `kafka__compressionCodec` | string | no |  | Kafka - Compression Codec. One of `"none"`, `"gzip"`, `"snappy"`, `"lz4"`. |
| `kafka__securityProtocol` | string | no |  | Kafka - Security Protocol. One of `"PLAINTEXT"`, `"SASL_SSL"`. |
| `kafka__saslMechanism` | string | no |  | Kafka - Sasl Mechanism. One of `"PLAIN"`, `"SCRAM-SHA-256"`, `"SCRAM-SHA-512"`. |
| `kafka__saslUsername` | string | no |  | Kafka - Sasl Username. |
| `kafka__saslPassword` | string | no |  | Kafka - Sasl Password. |

### `notificationsListing`

**Notifications - V2.0 - Notifications Listing.** List all AMPECO notification subscriptions (webhook and kafka), optionally auto-paginating across pages when Paginate Results is enabled. Read-only and idempotent. To fetch one subscription by its ID use the notification read action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `notificationRead`

**Notifications - V2.0 - Notification Read.** Retrieve a single AMPECO notification subscription by its identifier. Read-only and idempotent; use it when you already know the subscription ID. To enumerate all subscriptions use the notifications listing action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `notification` | string | yes |  | Notification. |

### `notificationsCreate`

**Notifications - V2.0 - Notifications Create.** Replace the configuration of an existing AMPECO notification subscription identified by its ID, setting its delivery method (webhook or kafka), the subscribed event types, and the matching delivery config. Idempotent: applying the same values repeatedly yields the same subscription state. To register a brand-new subscription use the notifications subscribe action instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `notification` | string | yes |  | Notification. |
| `via` | string | yes |  | Via. One of `"webhook"`, `"kafka"`. |
| `notifications` | array | yes |  | Notifications. One of `"AuthorizationNotification"`, `"authorization.changed"`, `"BootNotification"`, `"ChargePointChangedNotification"`, `"chargePoint.changed"`, `"evse.changed"`, `"ChargePointSyncConfigurationNotification"`, `"CircuitConsumptionNotification"`, `"circuit.changed"`, `"DiagnosticsStatusNotification"`, `"HardwareStatusNotification"`, `"LocationChangedNotification"`, `"NetworkStatusNotification"`, `"SecurityEventNotification"`, `"SessionMeterValuesNotification"`, `"SessionStartStopNotification"`, `"session.start.stop.notification"`, `"SessionUpdateNotification"`, `"UserChangedNotification"`, `"SubOperatorChangedNotification"`, `"TariffChangedNotification"`, `"user.subscriptionChanged"`, `"user.subscription.changed"`, `"ReservationChangedNotification"`, `"PaymentMethodChangedNotification"` and 17 more. |
| `webhook__callbackUrl` | string | yes |  | Webhook - Callback Url. |
| `kafka__topic` | string | yes |  | Kafka - Topic. |
| `kafka__brokers` | array | yes |  | Kafka - Brokers. |
| `kafka__compressionCodec` | string | no |  | Kafka - Compression Codec. One of `"none"`, `"gzip"`, `"snappy"`, `"lz4"`. |
| `kafka__securityProtocol` | string | no |  | Kafka - Security Protocol. One of `"PLAINTEXT"`, `"SASL_SSL"`. |
| `kafka__saslMechanism` | string | no |  | Kafka - Sasl Mechanism. One of `"PLAIN"`, `"SCRAM-SHA-256"`, `"SCRAM-SHA-512"`. |
| `kafka__saslUsername` | string | no |  | Kafka - Sasl Username. |
| `kafka__saslPassword` | string | no |  | Kafka - Sasl Password. |

### `notificationsUnsubscribe`

**Notifications - V2.0 - Notifications Unsubscribe.** Delete (unsubscribe) an AMPECO notification subscription by its identifier, stopping further webhook/kafka delivery. Effectively idempotent on the target but destructive, so confirm the subscription ID before running. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `notification` | string | yes |  | Notification. |

### `authorizationsListing`

**Resources - Authorizations - Authorizations Listing.** List AMPECO authorization records (EV charging access requests), optionally filtered by status (accepted/rejected/pending), method, partner, or created/updated date range. Read-only and idempotent. Enable pagination to retrieve all matches across pages. Use this to discover authorizations before reading one by ID. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__createdAfter` | ISO date-time string | no |  | Filter - Created After. ISO 8601 formatted date. Lists only the authorizations created after this datetime. |
| `filter__createdBefore` | ISO date-time string | no |  | Filter - Created Before. ISO 8601 formatted date. Lists only the authorizations created before this datetime. |
| `filter__lastUpdatedAfter` | ISO date-time string | no |  | Filter - Last Updated After. ISO 8601 formatted date. Lists only the authorizations that were last updated after this datetime. |
| `filter__lastUpdatedBefore` | ISO date-time string | no |  | Filter - Last Updated Before. ISO 8601 formatted date. Lists only the authorizations that were last updated before this datetime. |
| `filter__status` | string | no |  | Filter - Status. Lists only authorizations with one of the following statuses: "accepted", "rejected", "pending". |
| `filter__method` | string | no |  | Filter - Method. Lists only authorizations with one of the following methods: "mobile_device", "rfid_tag", "admin_account", "plug_and_charge", "plug_and_charge_iso15118", "roaming", "payment_terminal". |
| `filter__partnerId` | number | no |  | Filter - Partner Id. Lists only authorizations of users who are associated to a particular partner. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `authorizationRead`

**Resources - Authorizations - Authorization Read.** Fetch a single AMPECO authorization record (an EV charging access request, e.g. via RFID tag, mobile device, or plug-and-charge) by its ID, including its status and method. Read-only and idempotent. To search authorizations by status, method, or date instead of a known ID, use the authorizations listing action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `authorization` | string | yes |  | Authorization. |

### `bookingRequestsListing`

**Resources - Booking Requests - Booking Requests Listing.** List booking requests with optional filters by status, user, location, and start/end/created date ranges. Read-only and idempotent. Enable the pagination option to fetch all matching requests across pages; otherwise one page (up to per_page) is returned. Use this to find a booking request ID before reading one. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__status` | string | no |  | Filter - Status. Filter by booking request status. One of `"pending"`, `"approved"`, `"rejected"`. |
| `filter__userId` | number | no |  | Filter - User Id. Filter by user ID. |
| `filter__locationId` | number | no |  | Filter - Location Id. Filter by location ID. |
| `filter__startAfter` | ISO date-time string | no |  | Filter - Start After. Filter requests with start time after this date. |
| `filter__startBefore` | ISO date-time string | no |  | Filter - Start Before. Filter requests with start time before this date. |
| `filter__endAfter` | ISO date-time string | no |  | Filter - End After. Filter requests with end time after this date. |
| `filter__endBefore` | ISO date-time string | no |  | Filter - End Before. Filter requests with end time before this date. |
| `filter__createdAfter` | ISO date-time string | no |  | Filter - Created After. Filter requests that were created after this date. |
| `filter__createdBefore` | ISO date-time string | no |  | Filter - Created Before. Filter requests that were created before this date. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `bookingRequestCreate`

**Resources - Booking Requests - Create.** Submit a booking request to the chargepoint scheduling system. The request body variant selects the operation: create a new booking, update an existing booking, or cancel a booking - update and cancel target an existing booking by ID. Not idempotent: a create variant call queues a new request each time. To discover available slots first, use the Location Check Booking Availability action. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `requestBody_VariantType` | string | yes |  | Request Body Variant Type. Select the type of the variant. One of `"1"`, `"2"`, `"3"`. |
| `requestBody` | object | yes |  | Request Body. An object whose fields depend on other inputs; the product shows them. |

### `bookingRequestRead`

**Resources - Booking Requests - Read.** Fetch a single booking request by its numeric ID. Read-only and idempotent. Use when you already know the booking request ID; otherwise use the Booking Requests Listing to find it first. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `bookingRequest` | number | yes |  | Booking Request. |

### `bookingsListing`

**Resources - Bookings - Listing.** List AMPECO charger/EVSE bookings, optionally filtered by status (accepted, reserved, completed, cancelled, no-show, failed), user, location, or start/end time window. Read-only and idempotent. Enable pagination to fetch all matches across pages. Use this to find booking IDs before reading a single booking. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__status` | string | no |  | Filter - Status. Filter by booking status. One of `"accepted"`, `"reserved"`, `"completed"`, `"cancelled"`, `"no-show"`, `"failed"`. |
| `filter__userId` | number | no |  | Filter - User Id. Filter by user ID. |
| `filter__locationId` | number | no |  | Filter - Location Id. Filter by location ID. |
| `filter__startAfter` | ISO date-time string | no |  | Filter - Start After. Filter bookings with start time after this date. |
| `filter__startBefore` | ISO date-time string | no |  | Filter - Start Before. Filter bookings with start time before this date. |
| `filter__endAfter` | ISO date-time string | no |  | Filter - End After. Filter bookings with end time after this date. |
| `filter__endBefore` | ISO date-time string | no |  | Filter - End Before. Filter bookings with end time before this date. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `bookingRead`

**Resources - Bookings - Read.** Fetch the details of one AMPECO charger booking by its numeric ID; optionally include linked EVSE information. Read-only and idempotent. Pick this when you already have a booking ID; to search or browse bookings, use the bookings listing action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `booking` | number | yes |  | Booking. |
| `include` | array | no |  | Include. Include additional information in the response. The following options are available: - **bookedEvses**: Include information about the EVSEs linked to this booking. One of `"bookedEvses"`. |

### `cdrsListing`

**Resources - Cdrs - Listing.** List charge detail records (CDRs), with optional filters by start/end time, received/sent time, roaming operator or platform, credit, local vs received, and delivery response. Read-only and idempotent. Enable the Paginate Results option to fetch across pages up to Per page total; otherwise a single page (max 100) is returned. Use cdrRead when you already know a CDR id. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__startDateTimeFrom` | ISO date-time string | no |  | Filter - Start Date Time From. Filters CDRs by the start time, selecting records with a start time equal to or later than the specified value. The date-time should be formatted according to ISO 8601 standards. |
| `filter__startDateTimeTo` | ISO date-time string | no |  | Filter - Start Date Time To. Filters CDRs by the start time, selecting records with a start time equal to or earlier than the specified value. This filter helps in selecting records up to a certain start time. The provided date-time should be in ISO 8601 format. |
| `filter__endDateTimeFrom` | ISO date-time string | no |  | Filter - End Date Time From. This filter retrieves CDRs with an end time equal to or later than the specified value. It helps filter records based on the end of a timeframe, ensuring that only records ending after a certain point are selected. The date-time format should adhere to ISO 8601 standards. |
| `filter__endDateTimeTo` | ISO date-time string | no |  | Filter - End Date Time To. Filters CDRs based on their end time, selecting those with an end time equal to or earlier than the provided value. This filter limits the selection to records that conclude by a certain time. The date-time should be in ISO 8601 format. |
| `filter__operatorId` | number | no |  | Filter - Operator Id. Only CDRs associated with a specific Roaming Operator/Provider. |
| `filter__platformId` | number | no |  | Filter - Platform Id. Only CDRs linked to a specific Roaming Platform. |
| `filter__roamingId` | string | no |  | Filter - Roaming Id. Filters CDRs by the unique identifier within the CPO’s platform (and sub-operator platforms). If you use this filter, it will return a single result. |
| `filter__credit` | string | no |  | Filter - Credit. Only Credit CDRs. |
| `filter__isLocal` | string | no |  | Filter - Is Local. If true only CDRs that we issued as CPO will be returned, if false only CDRs that we received as eMSP will be returned. |
| `filter__receivedAfter` | ISO date-time string | no |  | Filter - Received After. Filters CDRs by the time when received from CPOs, selecting records with a received time equal to or later than the specified value. This filter helps in selecting received records from a certain time and works for non local CDRs. The provided date-time should be following the ISO 8601 standard. |
| `filter__receivedBefore` | ISO date-time string | no |  | Filter - Received Before. Filters CDRs by the time when received from CPOs, selecting records with a start time equal to or earlier than the specified value. This filter helps in selecting received records up to a certain time and works for non local CDRs. The provided date-time should be following the ISO 8601 standard. |
| `filter__sentAfter` | ISO date-time string | no |  | Filter - Sent After. Filters CDRs by the time when sent to EMSP, selecting records with a sent time equal to or later than the specified value. This filter helps in selecting sent records from a certain time and works for local CDRs. The provided date-time should be following the ISO 8601 standard. |
| `filter__sentBefore` | ISO date-time string | no |  | Filter - Sent Before. Filters CDRs by the time when sent to EMSP, selecting records with a sent time equal to or earlier than the specified value. This filter helps in selecting sent records from a certain time and works for local CDRs. The provided date-time should be following the ISO 8601 standard. |
| `filter__deliveryResponse` | string | no |  | Filter - Delivery Response. Filters CDRs that were sent to the EMSP based on their delivery status. Use this dropdown filter to retrieve CDRs with one of the following statuses: - `success`: CDRs successfully **accepted** by the EMSP. - `fail`: CDRs that were **rejected** (not accepted) by the EMSP. One of `"success"`, `"fail"`. |
| `include` | array | no |  | Include. One of `"externalAppData"`. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `cdrRead`

**Resources - Cdrs - Read.** Fetch a single charge detail record (CDR) by its numeric id, optionally including external app data. Read-only and idempotent. Use when you already know the CDR id; to browse or filter CDRs by time, operator, or platform use cdrsListing. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `cdr` | number | yes |  | Cdr. |
| `include` | array | no |  | Include. One of `"externalAppData"`. |

### `circuitsListing`

**Resources - Circuits - Circuits Listing.** List all AMPECO load-management circuits, optionally embedding related data (charge-point/user/SoC priorities, consumption, unmanaged load) via the include option. Read-only and safe to repeat. Supports automatic pagination to fetch every circuit across pages. Use to discover circuit IDs or survey circuits; use the circuit read action when you already know a single circuit ID. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `include` | array | no |  | Include. One of `"chargePointPriorities"`, `"userPriorities"`, `"socPriorities"`, `"consumption"`, `"unmanagedLoad"`. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `circuitCreate`

**Resources - Circuits - Create.** Create a new AMPECO load-management circuit with a name, phase configuration, and max current, plus optional parent circuit (multi-level DLM), electrical configuration, and load-balancing integration. Not idempotent: each call adds another circuit, so re-running creates duplicates. Use the circuit update action to change an existing circuit instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `parentCircuitId` | number | no |  | Parent Circuit Id. Specify parent circuit in Multi-level DLM. Circuits used in flexibility assets or using load balancing integration can not be used in Multi-level DLM. |
| `phases` | string | yes |  | Phases. One of `"single_phase"`, `"three_phase"`, `"split_phase"`. |
| `phaseRotation` | string | no |  | Phase Rotation. `R` stands for `L1`, </br> `S` - for `L2` </br> `T` - for `L3` </br> So for example `RST` = `L1`, `L2`, `L3`, while `RTS` = `L1`, `L3`, `L2`, etc. </br> The field is mandatory for Multi-level DLM when the `phases` value is `three_phase`. One of `"RST"`, `"RTS"`, `"SRT"`, `"STR"`, `"TRS"`, `"TSR"`. |
| `connectedPhase` | string | no |  | Connected Phase. Specifies the active line conductors used in the circuit. </br> Single phase values (`phases` = `single_phase`): `L1`, `L2`, `L3` - Valid in `star` electrical configuration </br> Split phase values (`phases` = `split_phase`): `L1_L2`, `L2_L3`, `L1_L3` - Valid in `star` electrical configuration </br… One of `"L1"`, `"L2"`, `"L3"`, `"L1_L2"`, `"L1_L3"`, `"L2_L3"`. |
| `electricalConfiguration` | string | no |  | Electrical Configuration. Defines the type of electrical configuration of the circuit. A circuit must have the same electrical configuration as its parent circuit. To maintain safety and compatibility, only charge points with an identical electrical configuration to the circuit can be added. To modify a circuit's electrical… One of `"star"`, `"delta"`. |
| `maxVoltage` | string | no |  | Max Voltage. One of `"230"`, `"380"`, `"400"`, `"480"`, `"120"`, `"208"`, `"240"`, `"110-130"`, `"220-240"`. |
| `maxCurrent` | number | yes |  | Max Current. The current (A) limit for the whole circuit. This would usually be the circuit breaker rated current. |
| `minChargePointCurrent` | number | no |  | Min Charge Point Current. Defines what is the lowest current (A) allowed per charge point. New sessions cannot start if any of the existing ones has to be lowered to less than the set minimum rate. This is to ensure that a connected car vehicle actually charge because the vehicles have a minimum charging rate below which th… |
| `setSessionLimitToZeroOnIdle` | string | no |  | Set Session Limit To Zero On Idle. Sets the limit to 0 when the session enters an idle period. One of `"true"`, `"false"`. |
| `electricityMeterId` | number | no |  | Electricity Meter Id. The ID of the Electricity Meter linked to the circuit (if any). |
| `offlineReservedCurrent` | number | no |  | Offline Reserved Current. The current (A) reserved for other loads on the circuit (non-managed loads) when the Electricity Meter is offline. |
| `loadBalancingIntegration__id` | number | no |  | Load Balancing Integration - Id. The id of the load balancing integration (can be found in the Ampeco backend). Provide `null` if you want to disable any load balancing integration and revert back to the Ampeco built-in load balancing. |
| `loadBalancingIntegration__fields_VariantType` | string | yes |  | Load Balancing Integration - Fields Variant Type. Select the type of the variant. One of `"1"`, `"2"`. |
| `loadBalancingIntegration__fields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

### `circuitRead`

**Resources - Circuits - Read.** Fetch a single AMPECO load-management circuit by its numeric ID, optionally embedding related data (charge-point/user/SoC priorities, consumption, unmanaged load) via the include option. Read-only and safe to repeat. Use when you already know the circuit ID; use the circuits listing action to search across all circuits. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `circuit` | number | yes |  | Circuit. |
| `include` | array | no |  | Include. One of `"chargePointPriorities"`, `"userPriorities"`, `"socPriorities"`, `"consumption"`, `"unmanagedLoad"`. |

### `circuitUpdate`

**Resources - Circuits - Update.** Modify an existing AMPECO load-management circuit (identified by circuit ID), changing properties such as name, phases, max/min current, electrical configuration, parent circuit for multi-level DLM, or load-balancing integration. Only the fields you supply are changed. Not idempotent in the create sense: it edits a circuit that must already exist; use the circuit create action to add a new one. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `circuit` | number | yes |  | Circuit. |
| `name` | string | no |  | Name. |
| `parentCircuitId` | number | no |  | Parent Circuit Id. Specify parent circuit in Multi-level DLM. Circuits used in flexibility assets or using load balancing integration can not be used in Multi-level DLM. |
| `phases` | string | no |  | Phases. One of `"single_phase"`, `"three_phase"`, `"split_phase"`. |
| `phaseRotation` | string | no |  | Phase Rotation. `R` stands for `L1`, </br> `S` - for `L2` </br> `T` - for `L3` </br> So for example `RST` = `L1`, `L2`, `L3`, while `RTS` = `L1`, `L3`, `L2`, etc. </br> The field is mandatory for Multi-level DLM when the `phases` value is `three_phase`. One of `"RST"`, `"RTS"`, `"SRT"`, `"STR"`, `"TRS"`, `"TSR"`. |
| `connectedPhase` | string | no |  | Connected Phase. Specifies the active line conductors used in the circuit. </br> Single phase values (`phases` = `single_phase`): `L1`, `L2`, `L3` - Valid in `star` electrical configuration </br> Split phase values (`phases` = `split_phase`): `L1_L2`, `L2_L3`, `L1_L3` - Valid in `star` electrical configuration </br… One of `"L1"`, `"L2"`, `"L3"`, `"L1_L2"`, `"L1_L3"`, `"L2_L3"`. |
| `electricalConfiguration` | string | no |  | Electrical Configuration. Defines the type of electrical configuration of the circuit. A circuit must have the same electrical configuration as its parent circuit. To maintain safety and compatibility, only charge points with an identical electrical configuration to the circuit can be added. To modify a circuit's electrical… One of `"star"`, `"delta"`. |
| `maxVoltage` | string | no |  | Max Voltage. One of `"230"`, `"380"`, `"400"`, `"480"`, `"120"`, `"208"`, `"240"`, `"110-130"`, `"220-240"`. |
| `maxCurrent` | number | no |  | Max Current. The current (A) limit for the whole circuit. This would usually be the circuit breaker rated current. |
| `minChargePointCurrent` | number | no |  | Min Charge Point Current. Defines what is the lowest current (A) allowed per charge point. New sessions cannot start if any of the existing ones has to be lowered to less than the set minimum rate. This is to ensure that a connected car vehicle actually charge because the vehicles have a minimum charging rate below which th… |
| `setSessionLimitToZeroOnIdle` | string | no |  | Set Session Limit To Zero On Idle. Sets the limit to 0 when the session enters an idle period. One of `"true"`, `"false"`. |
| `electricityMeterId` | number | no |  | Electricity Meter Id. The ID of the Electricity Meter linked to the circuit (if any). |
| `offlineReservedCurrent` | number | no |  | Offline Reserved Current. The current (A) reserved for other loads on the circuit (non-managed loads) when the Electricity Meter is offline. |
| `loadBalancingIntegration__id` | number | no |  | Load Balancing Integration - Id. The id of the load balancing integration (can be found in the Ampeco backend). Provide `null` if you want to disable any load balancing integration and revert back to the Ampeco built-in load balancing. |
| `loadBalancingIntegration__fields_VariantType` | string | yes |  | Load Balancing Integration - Fields Variant Type. Select the type of the variant. One of `"1"`, `"2"`. |
| `loadBalancingIntegration__fields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

### `circuitDelete`

**Resources - Circuits - Delete.** Permanently delete an AMPECO load-balancing circuit by its numeric ID. Destructive and not reversible; re-running on an already-deleted circuit will fail. Confirm the correct circuit ID before deleting. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `circuit` | number | yes |  | Circuit. |

### `circuitChargePointPrioritiesListing`

**Resources - Circuits - Circuit Charge Point Priorities Listing.** List the charge-point priority rules configured on a single AMPECO circuit, identified by numeric circuit ID. Read-only and safe to repeat; supports automatic pagination across pages. Use to enumerate which charge points are prioritized on one circuit, distinct from the user-priority and SoC-priority listings on the same circuit. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `circuit` | number | yes |  | Circuit. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `circuitConsumption`

**Resources - Circuits - Circuit Consumption.** Read the current electrical consumption of a single AMPECO circuit broken down per phase, identified by numeric circuit ID. Read-only lookup with no side effects. Use when you need live or recent per-phase load figures for one circuit, distinct from its static configuration returned by the circuit read action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `circuit` | number | yes |  | Circuit. |

### `circuitSocPrioritiesListing`

**Resources - Circuits - Circuit Soc Priorities Listing.** Read the state-of-charge (SoC) priority configuration for a single AMPECO load-management circuit, identified by numeric circuit ID. Read-only lookup with no side effects. Use when you need the SoC-based priority rules for one specific circuit; for the broader circuit record use the circuit read action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `circuit` | number | yes |  | Circuit. |

### `circuitUnmanagedLoadRead`

**Resources - Circuits - Circuit Unmanaged Load Read.** Fetch the unmanaged-load reading for an AMPECO load-balancing circuit by its numeric ID (the load consumed by devices outside AMPECO's control). Read-only and idempotent; use when monitoring available capacity for a known circuit. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `circuit` | number | yes |  | Circuit. |

### `circuitUserPrioritiesListing`

**Resources - Circuits - Circuit User Priorities Listing.** List all user-priority rules configured on a given AMPECO load-balancing circuit, with Paginate Results to fetch every page. Read-only and idempotent; use this to discover priority IDs before reading or creating priority rules. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `circuit` | number | yes |  | Circuit. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `circuitUserPriorityCreate`

**Resources - Circuits - Circuit User Priority Create.** Add a user-priority rule to an AMPECO load-balancing circuit, weighting how much power a user group or partner gets during charging (priority 1 = baseline, 2 = twice as important, 0.5 = half). Not idempotent: each call creates a new priority rule. Use the circuit user priorities listing to inspect existing rules. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `circuit` | number | yes |  | Circuit. |
| `targetId` | number | yes |  | Target Id. The ID of the User Group the user must be part of or the ID of the Partner from which the user must have an invite from, for the set priority apply for the session. |
| `type` | string | yes |  | Type. One of `"partner"`, `"userGroup"`. |
| `priority` | number | yes |  | Priority. The priority where 1 is equal to anyone else, 2 is twice as important, 0.5 is half as important. |

### `circuitUserPriorityRead`

**Resources - Circuits - Circuit User Priority Read.** Fetch a single user-priority rule on an AMPECO load-balancing circuit, given the circuit ID and the user-priority ID. Read-only and idempotent; use the circuit user priorities listing action first to discover priority IDs. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `circuit` | number | yes |  | Circuit. |
| `userPriority` | number | yes |  | User Priority. |

### `circuitUserPriorityUpdate`

**Resources - Circuits - Circuit User Priority Update.** Modify an existing user-priority rule on an AMPECO circuit, identified by circuit ID plus user-priority ID, adjusting its priority weight (1 = baseline, 2 = twice as important, 0.5 = half) and optional partner/userGroup target. Not idempotent: it mutates the targeted priority record, so it requires a pre-existing user priority. Use to retune an existing rule, not to create one. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `circuit` | number | yes |  | Circuit. |
| `userPriority` | number | yes |  | User Priority. |
| `targetId` | number | no |  | Target Id. The ID of the User Group the user must be part of or the ID of the Partner from which the user must have an invite from, for the set priority apply for the session. |
| `type` | string | no |  | Type. One of `"partner"`, `"userGroup"`. |
| `priority` | number | no |  | Priority. The priority where 1 is equal to anyone else, 2 is twice as important, 0.5 is half as important. |

### `circuitUserPriorityDelete`

**Resources - Circuits - Circuit User Priority Delete.** Permanently remove a user-priority rule from an AMPECO circuit, identified by circuit ID plus user-priority ID. Destructive and not reversible. Idempotent in effect once removed (repeat calls target an already-deleted record), but the first call removes the rule, so confirm the IDs before running. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `circuit` | number | yes |  | Circuit. |
| `userPriority` | number | yes |  | User Priority. |

### `contactDetailsRead`

**Resources - Contact Details - Contact Details Read.** Read the account-level contact details (email and phone) for the authenticated account. Takes no parameters and is read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

No inputs.

### `contactDetailsUpdate`

**Resources - Contact Details - Contact Details Update.** Set the account-level contact email (required) and optional phone, replacing the current contact record. Idempotent: re-sending the same values leaves the same end state. To clear the contact details entirely use contact-details-delete instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `phone` | string | no |  | Phone. |

### `contactDetailsDelete`

**Resources - Contact Details - Contact Details Delete.** Delete the account-level contact details (no parameters; operates on the authenticated account's single contact record). Destructive: clears the stored email/phone. Safe to repeat in effect since the end state is "no contact details", but use contact-details-update to set values instead of removing them. Needs authentication.

Kind: not safe to repeat.

No inputs.

### `currenciesListing`

**Resources - Currencies - Listing.** List the currencies supported by the AMPECO instance. Read-only and safe to repeat; takes no input. Use to discover valid currency codes before configuring rates or other currency-dependent resources. Needs authentication.

Kind: safe to repeat.

No inputs.

### `currencyCreate`

**Resources - Currencies - Create.** Add a new currency to AMPECO by its 3-letter alphabetic code, with optional display prefix/suffix, decimal precision, and minor-unit settings. Use to register a currency the platform does not yet support; to change an existing one use Update Currency instead. Not idempotent: repeated calls create duplicate currency records. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `alphabeticCode` | string | yes |  | Alphabetic Code. The currency 3-letter code. One of `"AED"`, `"AFN"`, `"ALL"`, `"AMD"`, `"ANG"`, `"AOA"`, `"ARS"`, `"AUD"`, `"AWG"`, `"AZN"`, `"BAM"`, `"BBD"`, `"BDT"`, `"BGN"`, `"BHD"`, `"BIF"`, `"BMD"`, `"BND"`, `"BOB"`, `"BOV"`, `"BRL"`, `"BSD"`, `"BTN"`, `"BWP"`, `"BYN"` and 154 more. |
| `prefix` | string | no |  | Prefix. When displaying amounts in this currency, the prefix is added in front of the amount. This could be symbols, for example $ or £. |
| `suffix` | string | no |  | Suffix. When displaying amounts in this currency, the suffix is added after the amount. |
| `decimal` | number | no |  | Decimal. The actual precision of the currency. This is used when charging a payment method or calculating totals. |
| `unitPriceAndCalculationsDecimal` | number | no |  | Unit Price And Calculations Decimal. Used when setting price per kWh and per minute in tariffs. |
| `enableUseOfMinorCurrencyUnit` | string | no |  | Enable Use Of Minor Currency Unit. When enabled, the minor currency unit is used to set electricity price threshold for flexible tariffs and to set electricity cost tracking in the home charging app. The minor currency unit for the US dollar, for example, is the cent. One of `"true"`, `"false"`. |
| `minorUnitSign` | string | no |  | Minor Unit Sign. The sign or letter for the minor currency unit. For US dollar, for example, this could be "¢" or "c" for cents. |

### `currencyRead`

**Resources - Currencies - Read.** Fetch a single currency from AMPECO by its numeric currency id, returning its code and display/precision configuration. Read-only and idempotent. Use when you already know the id; there is no list-currencies counterpart here. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `currency` | number | yes |  | Currency. |

### `currencyUpdate`

**Resources - Currencies - Update.** Update an existing currency in AMPECO, identified by its numeric currency id, changing its display prefix/suffix, decimal precision, or minor-unit settings. Requires the currency to already exist; use Create Currency to add a new one. Re-running with the same values is safe, but supplied fields overwrite the current configuration. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `currency` | number | yes |  | Currency. |
| `alphabeticCode` | string | yes |  | Alphabetic Code. The currency 3-letter code. One of `"AED"`, `"AFN"`, `"ALL"`, `"AMD"`, `"ANG"`, `"AOA"`, `"ARS"`, `"AUD"`, `"AWG"`, `"AZN"`, `"BAM"`, `"BBD"`, `"BDT"`, `"BGN"`, `"BHD"`, `"BIF"`, `"BMD"`, `"BND"`, `"BOB"`, `"BOV"`, `"BRL"`, `"BSD"`, `"BTN"`, `"BWP"`, `"BYN"` and 154 more. |
| `prefix` | string | no |  | Prefix. When displaying amounts in this currency, the prefix is added in front of the amount. This could be symbols, for example $ or £. |
| `suffix` | string | no |  | Suffix. When displaying amounts in this currency, the suffix is added after the amount. |
| `decimal` | number | no |  | Decimal. The actual precision of the currency. This is used when charging a payment method or calculating totals. |
| `unitPriceAndCalculationsDecimal` | number | no |  | Unit Price And Calculations Decimal. Used when setting price per kWh and per minute in tariffs. |
| `enableUseOfMinorCurrencyUnit` | string | no |  | Enable Use Of Minor Currency Unit. When enabled, the minor currency unit is used to set electricity price threshold for flexible tariffs and to set electricity cost tracking in the home charging app. The minor currency unit for the US dollar, for example, is the cent. One of `"true"`, `"false"`. |
| `minorUnitSign` | string | no |  | Minor Unit Sign. The sign or letter for the minor currency unit. For US dollar, for example, this could be "¢" or "c" for cents. |

### `createCurrencyRate`

**Resources - Currency Rates - Create.** Create a new AMPECO currency-rate record defining the exchange rate from a base currency to a target currency (ISO 4217 codes). Not idempotent: each call adds another rate record, so re-running can create duplicate base/target pairs. Use the update currency rate action to change the rate of an existing record. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base` | string | yes |  | Base. Base currency code (ISO 4217) |
| `target` | string | yes |  | Target. Target currency code (ISO 4217) |
| `rate` | number | yes |  | Rate. The exchange rate from base to target currency. |

### `listCurrencyRates`

**Resources - Currency Rates - List.** List AMPECO currency-rate records, optionally filtered by base currency, target currency, or an updated-before/after datetime window. Read-only and safe to repeat; supports automatic pagination across pages. Use to discover currency-rate IDs or survey configured exchange rates; use the get currency rate action when you already know a single ID. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__base` | string | no |  | Filter - Base. Filter by base currency code. |
| `filter__target` | string | no |  | Filter - Target. Filter by target currency code. |
| `filter__updatedBefore` | ISO date-time string | no |  | Filter - Updated Before. Filter by records updated before a specific datetime. |
| `filter__updatedAfter` | ISO date-time string | no |  | Filter - Updated After. Filter by records updated after a specific datetime. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `updateCurrencyRate`

**Resources - Currency Rates - Update.** Update the exchange rate value of an existing AMPECO currency-rate record, identified by numeric currency-rate ID. Only the rate (base-to-target multiplier) is changed; the base and target currencies are fixed. Not idempotent in the create sense: the record must already exist. Use the create currency rate action to add a new base/target pair. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `currencyRate` | number | yes |  | Currency Rate. |
| `rate` | number | yes |  | Rate. The exchange rate from base to target currency. |

### `getCurrencyRate`

**Resources - Currency Rates - Get.** Fetch a single AMPECO currency-rate record by its numeric ID. Read-only and safe to repeat. Use when you already know the currency-rate ID; use the list currency rates action to browse or filter by base/target currency. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `currencyRate` | number | yes |  | Currency Rate. |

### `deleteCurrencyRate`

**Resources - Currency Rates - Delete.** Permanently delete an AMPECO currency-rate record by its numeric ID. Destructive and not reversible. Effectively idempotent once removed, but the first call removes the rate, so confirm the ID before running. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `currencyRate` | number | yes |  | Currency Rate. |

### `customFeesListing`

**Resources - Custom Fees - Listing.** List custom fees, optionally filtered by created-after and created-before dates. Read-only and idempotent. Enable the Paginate Results option to fetch across pages up to Per page total; otherwise a single page (max 100) is returned. Use customFeeRead when you already know a fee id. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__createdAfter` | ISO date-time string | no |  | Filter - Created After. ISO 8601 formatted date. |
| `filter__createdBefore` | ISO date-time string | no |  | Filter - Created Before. ISO 8601 formatted date. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `customFeeRead`

**Resources - Custom Fees - Read.** Fetch a single custom fee by its numeric id. Read-only and idempotent. Use when you already know the fee id; to browse fees or filter by creation date use customFeesListing. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `customFee` | number | yes |  | Custom Fee. |

### `getDowntimePeriodNotices`

**Resources - Downtime Period Notices - Get Downtime Period Notices.** List downtime period notices, optionally filtered by type (downtime or exempt) and auto-paginated across all pages. Use to browse or find notices; read-only and safe to retry. To fetch one known notice by ID use the get action instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__type` | string | no |  | Filter - Type. One of `"downtime"`, `"exempt"`. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `postDowntimePeriodNotice`

**Resources - Downtime Period Notices - Post Downtime Period Notice.** Create a new downtime period notice of a given type (downtime or exempt) with a notice value and optional description. Use to register a new notice; to change an existing one use the patch action. Not idempotent — each call creates a new notice. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | yes |  | Type. One of `"downtime"`, `"exempt"`. |
| `notice` | string | yes |  | Notice. |
| `description` | string | no |  | Description. |

### `getDowntimePeriodNotice`

**Resources - Downtime Period Notices - Get.** Retrieve a single downtime period notice by its numeric ID. Use when you already know the ID and need its details; read-only and safe to retry. To search or browse multiple notices use the list action instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `notice` | number | yes |  | Notice. |

### `patchDowntimePeriodNotice`

**Resources - Downtime Period Notices - Patch Downtime Period Notice.** Update an existing downtime period notice by its numeric ID, changing its type or description. Use to modify a known notice rather than creating one; targets a specific record so re-running with the same values is safe. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `notice` | number | yes |  | Notice. |
| `type` | string | no |  | Type. One of `"downtime"`, `"exempt"`. |
| `description` | string | no |  | Description. |

### `deleteDowntimePeriodNotice`

**Resources - Downtime Period Notices - Delete.** Permanently delete a downtime period notice by its numeric ID. Use when removing a notice; this is destructive and cannot be undone, so confirm the ID first. Re-running after the notice is gone will error. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `notice` | number | yes |  | Notice. |

### `listEvseHardwareStatusLogs`

**Resources - Evses - List Evse Hardware Status Logs.** Retrieve the history of hardware status log entries for one EVSE (charging connector), identified by its numeric id, optionally narrowed to a created-after/created-before window. Read-only and idempotent; pick this when you need the full timeline of status changes rather than only the most recent one. Enable pagination to walk all pages. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `evse` | number | yes |  | Evse. |
| `filter__createdAfter` | ISO date-time string | no |  | Filter - Created After. ISO 8601 formatted date. Only list status logs created after this datetime. |
| `filter__createdBefore` | ISO date-time string | no |  | Filter - Created Before. ISO 8601 formatted date. Only list status logs created before this datetime. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `getEvseLatestHardwareStatusLog`

**Resources - Evses - Get Evse Latest Hardware Status Log.** Fetch only the most recent hardware status log entry for one EVSE (charging connector), identified by its numeric id. Read-only and idempotent; pick this for a quick current-status check, as opposed to List Evse Hardware Status Logs which returns the full history. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `evse` | number | yes |  | Evse. |

### `evseCreate`

**Resources - Evses - Create.** Create a new EVSE (charging connector) under a charge point, requiring charge point id, physical reference, current type (ac/dc), network id, and status. Not idempotent: each call creates a separate EVSE. Use Update to change an existing EVSE instead of recreating it. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chargePointId` | number | yes |  | Charge Point Id. The ID of the charge point. |
| `physicalReference` | string | yes |  | Physical Reference. The identifier that is presented to the users, so they can identify the EVSE at the location. |
| `currentType` | string | yes |  | Current Type. Type of current available on the EVSE: - **ac**: Alternating Current (AC) charging - **dc**: Direct Current (DC) fast charging. One of `"ac"`, `"dc"`. |
| `label` | string | no |  | Label. The EVSE label will be exposed and visualized in the mobile application. |
| `networkId` | string | yes |  | Network Id. The OCPP evse identifier (should be consecutive numbers starting from 1) |
| `status` | string | yes |  | Status. For roaming EVSEs the status can only be updated if the option for manual management of EVSEs is enabled for the roaming CPO. One of `"enabled"`, `"disabled"`, `"out of order"`. |
| `midMeterCertificationEndYear` | number | no |  | Mid Meter Certification End Year. The mid meter certification end year. |
| `tariffGroupId` | number | no |  | Tariff Group Id. The ID of the tariff group attached to the EVSE. If the EVSE is not roaming and tariffGroupId is not specified, the default (free) tariff will be assigned. For roaming EVSEs the Tariff Group can only be updated if the option for manual management of EVSEs is enabled for the roaming CPO. |
| `allowsReservation` | string | no |  | Allows Reservation. Manages whether reservations are allowed on this EVSE. Requires the Reservations to be activated for the system in order to enable for the EVSE. One of `"true"`, `"false"`. |
| `bookingEnabled` | string | no |  | Booking Enabled. Indicates if the EVSE can be booked. Requires the Bookings to be activated for the operator and automatically enables allowsReservation when set to true. One of `"true"`, `"false"`. |
| `powerOptions__maxPower` | number | no |  | Power Options - Max Power. in Wh. |
| `powerOptions__maxVoltage` | string | no |  | Power Options - Max Voltage. The maxVoltage of a charge point can fluctuate. Hence, when creating a charge point in the system, the maxVoltage is given as a range. For OCPI purposes it maps as follows: 220-240 = 230 110-130 = 120 400 = 400 380 = 380. One of `"230"`, `"380"`, `"400"`, `"480"`, `"120"`, `"208"`, `"240"`, `"110-130"`, `"220-240"`. |
| `powerOptions__maxAmperage` | number | no |  | Power Options - Max Amperage. |
| `powerOptions__phases` | string | no |  | Power Options - Phases. One of `"single_phase"`, `"three_phase"`, `"split_phase"`. |
| `powerOptions__phaseRotation` | string | no |  | Power Options - Phase Rotation. `R` stands for `L1`, </br> `S` - for `L2` </br> `T` - for `L3` </br> So for example `RST` = `L1`, `L2`, `L3`, while `RTS` = `L1`, `L3`, `L2`, etc. One of `"RST"`, `"RTS"`, `"SRT"`, `"STR"`, `"TRS"`, `"TSR"`. |
| `powerOptions__connectedPhase` | string | no |  | Power Options - Connected Phase. Specifies the active line conductors used in the circuit. - `L1_L2` - Valid when `phases` = `split_phase` in electrical configuration `star` or `phases` = `single_phase` in electrical configuration `delta` - `L2_L3` - Valid when `phases` = `split_phase` in electrical configuration `star` or `phases… One of `"L1"`, `"L2"`, `"L3"`, `"L1_L2"`, `"L1_L3"`, `"L2_L3"`. |
| `externalId` | string | no |  | External Id. |

### `evsesListing`

**Resources - Evses - Listing.** List EVSEs (charging connectors) across the network, optionally filtered by charge point, physical reference (QR code), external id, roaming flag, or last-updated window. Read-only and idempotent; use this to discover or search for EVSEs when you do not already have a specific id, and use Read for a single known EVSE. Enable pagination to fetch all results. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__chargePointId` | number | no |  | Filter - Charge Point Id. Only list EVSEs on a certain charge point. |
| `filter__physicalReference` | string | no |  | Filter - Physical Reference. Only list EVSEs, identified by id (QR Code) |
| `filter__externalId` | string | no |  | Filter - External Id. Only list EVSEs, identified by externalId. |
| `filter__roaming` | string | no |  | Filter - Roaming. If true, only roaming EVSEs will be returned. If false, only local EVSEs will be returned. If not passing, all EVSEs will be returned. One of `"true"`, `"false"`. |
| `filter__lastUpdatedAfter` | ISO date-time string | no |  | Filter - Last Updated After. ISO 8601 formatted date. Lists only the specific resource that was last updated on and after this datetime. |
| `filter__lastUpdatedBefore` | ISO date-time string | no |  | Filter - Last Updated Before. ISO 8601 formatted date. Lists only the specific resource that was last updated on and before this datetime. |
| `include` | array | no |  | Include. One of `"chargingProfile"`, `"connectors"`, `"externalAppData"`. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `evseUpdate`

**Resources - Evses - Update.** Modify an existing EVSE (charging connector), identified by its numeric id, applying only the fields you supply (physical reference, label, current type, status, tariff group, power options, reservation/booking flags, etc.). Not idempotent: each call mutates live state. For roaming EVSEs, status and tariff group can only change when manual management is enabled for the roaming CPO. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `evse` | number | yes |  | Evse. |
| `include` | array | no |  | Include. One of `"chargingProfile"`, `"connectors"`, `"externalAppData"`. |
| `physicalReference` | string | no |  | Physical Reference. The identifier that is presented to the users, so they can identify the EVSE at the location. |
| `currentType` | string | no |  | Current Type. Type of current available on the EVSE: - **ac**: Alternating Current (AC) charging - **dc**: Direct Current (DC) fast charging. One of `"ac"`, `"dc"`. |
| `label` | string | no |  | Label. The EVSE label will be exposed and visualized in the mobile application. |
| `networkId` | string | no |  | Network Id. The OCPP evse identifier (should be consecutive numbers starting from 1) |
| `status` | string | no |  | Status. For roaming EVSEs the status can only be updated if the option for manual management of EVSEs is enabled for the roaming CPO. One of `"enabled"`, `"disabled"`, `"out of order"`. |
| `midMeterCertificationEndYear` | number | no |  | Mid Meter Certification End Year. The mid meter certification end year. |
| `tariffGroupId` | number | no |  | Tariff Group Id. The ID of the tariff group attached to the EVSE. If the EVSE is not roaming and tariffGroupId is not specified, the default (free) tariff will be assigned. For roaming EVSEs the Tariff Group can only be updated if the option for manual management of EVSEs is enabled for the roaming CPO. |
| `allowsReservation` | string | no |  | Allows Reservation. Manages whether reservations are allowed on this EVSE. Requires the Reservations to be activated for the system in order to enable for the EVSE. One of `"true"`, `"false"`. |
| `bookingEnabled` | string | no |  | Booking Enabled. Indicates if the EVSE can be booked. Requires the Bookings to be activated for the operator and automatically enables allowsReservation when set to true. One of `"true"`, `"false"`. |
| `powerOptions__maxPower` | number | no |  | Power Options - Max Power. in Wh. |
| `powerOptions__maxVoltage` | string | no |  | Power Options - Max Voltage. The maxVoltage of a charge point can fluctuate. Hence, when creating a charge point in the system, the maxVoltage is given as a range. For OCPI purposes it maps as follows: 220-240 = 230 110-130 = 120 400 = 400 380 = 380. One of `"230"`, `"380"`, `"400"`, `"480"`, `"120"`, `"208"`, `"240"`, `"110-130"`, `"220-240"`. |
| `powerOptions__maxAmperage` | number | no |  | Power Options - Max Amperage. |
| `powerOptions__phases` | string | no |  | Power Options - Phases. One of `"single_phase"`, `"three_phase"`, `"split_phase"`. |
| `powerOptions__phaseRotation` | string | no |  | Power Options - Phase Rotation. `R` stands for `L1`, </br> `S` - for `L2` </br> `T` - for `L3` </br> So for example `RST` = `L1`, `L2`, `L3`, while `RTS` = `L1`, `L3`, `L2`, etc. One of `"RST"`, `"RTS"`, `"SRT"`, `"STR"`, `"TRS"`, `"TSR"`. |
| `powerOptions__connectedPhase` | string | no |  | Power Options - Connected Phase. Specifies the active line conductors used in the circuit. - `L1_L2` - Valid when `phases` = `split_phase` in electrical configuration `star` or `phases` = `single_phase` in electrical configuration `delta` - `L2_L3` - Valid when `phases` = `split_phase` in electrical configuration `star` or `phases… One of `"L1"`, `"L2"`, `"L3"`, `"L1_L2"`, `"L1_L3"`, `"L2_L3"`. |
| `externalId` | string | no |  | External Id. |

### `evseRead`

**Resources - Evses - Read.** Retrieve a single EVSE (charging connector) by its numeric id, optionally including related charging profile, connectors, or external app data. Read-only and idempotent; use this when you already know the EVSE id, and use Listing to search across many EVSEs. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `evse` | number | yes |  | Evse. |
| `include` | array | no |  | Include. One of `"chargingProfile"`, `"connectors"`, `"externalAppData"`. |

### `evseDelete`

**Resources - Evses - Evse Delete.** Permanently delete an EVSE (charging connector) identified by its numeric id. Destructive and not idempotent: deleting an already-removed id will fail. Use Listing or Read first to confirm the correct EVSE before deleting. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `evse` | number | yes |  | Evse. |
| `include` | array | no |  | Include. One of `"chargingProfile"`, `"connectors"`, `"externalAppData"`. |

### `faqsListing`

**Resources - Faqs - Listing.** List all FAQ entries. Read-only and idempotent. Use this to browse or count FAQs; to fetch one known entry prefer Faq Read. Enable Paginate Results to walk every page. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `faqCreate`

**Resources - Faqs - Create.** Create a new FAQ entry with localized question and answer text (one entry per locale). Not idempotent: each call adds a new FAQ, so retrying can create duplicates. To change an existing entry use Faq Update instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `question` | array | yes |  | Question. Each item: { `locale`?, `translation`? }. |
| `answer` | array | yes |  | Answer. Each item: { `locale`?, `translation`? }. |

### `faqRead`

**Resources - Faqs - Faq Read.** Fetch a single FAQ entry by its numeric id. Read-only and idempotent. Use this when you already know the id; to browse all FAQs use Faqs Listing instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `faq` | number | yes |  | Faq. |

### `faqUpdate`

**Resources - Faqs - Update.** Update an existing FAQ entry identified by its numeric id, replacing its localized question and/or answer text. Targets one known entry (it does not create); idempotent when sending the same values. To add a new FAQ use Faq Create instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `faq` | number | yes |  | Faq. |
| `question` | array | no |  | Question. Each item: { `locale`?, `translation`? }. |
| `answer` | array | no |  | Answer. Each item: { `locale`?, `translation`? }. |

### `faqDelete`

**Resources - Faqs - Faq Delete.** Permanently delete a FAQ entry by its numeric id. Destructive and not reversible; deleting an already-removed id will error. Do not retry blindly. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `faq` | number | yes |  | Faq. |

### `firmwareVersionsListing`

**Resources - Firmware Versions - Listing.** List AMPECO charge-point firmware versions, optionally filtered by vendor ID, model ID, or version string (prefix match), with auto-pagination available. Use to discover firmware version IDs or survey available firmware; for a known version use the firmware version read action. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__vendorId` | array | no |  | Filter - Vendor Id. Filter by charge point vendor IDs. |
| `filter__modelId` | array | no |  | Filter - Model Id. Filter by charge point model IDs. |
| `filter__firmwareVersion` | string | no |  | Filter - Firmware Version. Filter by firmware version string. Matches both exact versions and versions that begin with the search string (e.g., "1.2" will match exactly "1.2" as well as versions like "1.2.0", "1.2.3", etc.). |
| `include` | array | no |  | Include. One of `"models"`. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `firmwareVersionRead`

**Resources - Firmware Versions - Read.** Fetch a single AMPECO firmware version by its numeric ID, optionally including its attached charge-point models. Use when you already know the firmware version ID; to discover IDs use the firmware versions listing action. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firmwareVersion` | number | yes |  | Firmware Version. |
| `include` | array | no |  | Include. One of `"models"`. |

### `firmwareVersionAttachedModels`

**Resources - Firmware Versions - Get Attached Models.** List the charge-point models attached to a specific AMPECO firmware version, identified by the firmware version ID, with auto-pagination available. Use to check which hardware models a firmware build supports. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `firmwareVersion` | number | yes |  | Firmware Version. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `getInstallerJobsList`

**Resources - Installer Jobs - Get Installer Jobs List.** List installer jobs, with optional filters by company, location, charge point, status, installer admin, and created/updated date ranges, plus auto-pagination. Use to find or browse jobs; read-only and safe to retry. To fetch one known job by ID use the get action instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__installationAndMaintenanceCompanyId` | number | no |  | Filter - Installation And Maintenance Company Id. |
| `filter__locationId` | number | no |  | Filter - Location Id. |
| `filter__chargePointId` | number | no |  | Filter - Charge Point Id. |
| `filter__status` | string | no |  | Filter - Status. The status of the installer job. One of `"new"`, `"in_progress"`, `"completed"`, `"failed"`. |
| `filter__installerAdminId` | number | no |  | Filter - Installer Admin Id. |
| `filter__createdAfter` | ISO date-time string | no |  | Filter - Created After. Lists the installer jobs that have been created after the specified date and time, please provide the value as an ISO 8601 formatted date. |
| `filter__createdBefore` | ISO date-time string | no |  | Filter - Created Before. Lists the installer jobs that have been created before the specified date and time, please provide the value as an ISO 8601 formatted date. |
| `filter__lastUpdatedAfter` | ISO date-time string | no |  | Filter - Last Updated After. Lists the installer jobs that have been last updated after the specified date and time, please provide the value as an ISO 8601 formatted date. |
| `filter__lastUpdatedBefore` | ISO date-time string | no |  | Filter - Last Updated Before. Lists the installer jobs that have been last updated before the specified date and time, please provide the value as an ISO 8601 formatted date. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `createInstallerJob`

**Resources - Installer Jobs - Create.** Create a new installer job assigned to an installation and maintenance company, with a description and optional installer admin or access PIN. Use to dispatch a new job; to change an existing one use the update action. Not idempotent — each call creates a new job. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `installationAndMaintenanceCompanyId` | number | yes |  | Installation And Maintenance Company Id. The ID of the installation and maintenance company which the installer job is assigned to. |
| `installerAdminId` | number | no |  | Installer Admin Id. The ID of the installer admin if such is assigned to the installer job, if passed pin will be ignored. |
| `pin` | string | no |  | Pin. The PIN of the installer job, it is used to verify access rights to execute the installer job, if passed and no installerAdminId is provided, the pin will be assigned to the installer job. |
| `description` | string | yes |  | Description. |

### `getInstallerJob`

**Resources - Installer Jobs - Get.** Retrieve a single installer job by its numeric ID, optionally including related charge points. Use when you already know the ID and need its details; read-only and safe to retry. To find jobs by filter use the list action instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `installerJob` | number | yes |  | Installer Job. |
| `include` | array | no |  | Include. One of `"chargePoints"`. |

### `updateInstallerJob`

**Resources - Installer Jobs - Update.** Update an existing installer job by its numeric ID, changing its description, installer admin, or access PIN. Use to modify a known job rather than creating one; targets a specific record so re-running with the same values is safe. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `installerJob` | number | yes |  | Installer Job. |
| `installerAdminId` | number | no |  | Installer Admin Id. The ID of the installer admin if such is assigned to the installer job, if passed pin will be ignored. |
| `pin` | string | no |  | Pin. The PIN of the installer job, it is used to verify access rights to execute the installer job, if passed and no installerAdminId is provided, the pin will be assigned to the installer job. |
| `description` | string | no |  | Description. |

### `deleteInstallerJob`

**Resources - Installer Jobs - Delete.** Permanently delete an installer job by its numeric ID. Use when removing a job; this is destructive and cannot be undone, so confirm the ID first. Re-running after the job is gone will error. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `installerJob` | number | yes |  | Installer Job. |

### `invoicesListing`

**Resources - Invoices - Listing.** List AMPECO invoices, optionally filtered by an issued-from/issued-to date range. Read-only and idempotent. Enable pagination to fetch all matching invoices across pages. Use this to discover invoice IDs before reading a single invoice. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__issuedFrom` | string | no |  | Filter - Issued From. Only list invoices issued after this time. |
| `filter__issuedTo` | string | no |  | Filter - Issued To. Only list invoices issued before this time. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `invoiceRead`

**Resources - Invoices - Read.** Fetch the details of a single AMPECO invoice by its ID. Read-only and idempotent. Pick this when you already have an invoice ID; to search invoices by issue date or browse them, use the invoices listing action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invoice` | string | yes |  | Invoice. |

### `partnerContractsListing`

**Resources - Partner Contracts - Listing.** List all AMPECO partner contracts, optionally auto-paginating across pages to gather every result. Use to discover contract IDs or survey existing partner agreements before reading or creating one; for a known single contract use the partner contract read action. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `partnerContractCreate`

**Resources - Partner Contracts -Create.** Create a new AMPECO partner contract, setting its effective period, auto-renewal, access permissions, revenue-sharing percentages, and monthly platform fees for a given partner. Not idempotent: each call creates a separate contract, so guard against duplicates. Requires a valid partner ID and a start date (contract takes effect from the first of the selected month). Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. |
| `partnerId` | number | yes |  | Partner Id. |
| `startDate` | ISO date-time string | yes |  | Start Date. The contract is effective from the first of the selected month. |
| `endDate` | ISO date-time string | no |  | End Date. The contract expires at the last day of the selected month. If nothing is selected, there is no expiration date. |
| `autoRenewal` | string | no |  | Auto Renewal. One of `"true"`, `"false"`. |
| `accessAndPermissions__sessionsRemoteControl` | string | no |  | Access And Permissions - Sessions Remote Control. Allows the partner to start/stop session, unlock connector, trigger message, set a charging profile and get the composite schedule. One of `"true"`, `"false"`. |
| `accessAndPermissions__startReservation` | string | no |  | Access And Permissions - Start Reservation. Allows the partner to make reservations. One of `"true"`, `"false"`. |
| `accessAndPermissions__stopReservation` | string | no |  | Access And Permissions - Stop Reservation. Allows the partner to cancel reservations. One of `"true"`, `"false"`. |
| `accessAndPermissions__resetChargePoint` | string | no |  | Access And Permissions - Reset Charge Point. Allows the partner to reset charge points. One of `"true"`, `"false"`. |
| `accessAndPermissions__firmwareUpdate` | string | no |  | Access And Permissions - Firmware Update. Allows the partner to make firmware updates to the charge points. One of `"true"`, `"false"`. |
| `revenueSharing__partnerSharePercentageAcEvse` | number | no |  | Revenue Sharing - Partner Share Percentage Ac Evse. |
| `revenueSharing__partnerSharePercentageDcEvse` | number | no |  | Revenue Sharing - Partner Share Percentage Dc Evse. |
| `revenueSharing__excludeConnectionFee` | string | no |  | Revenue Sharing - Exclude Connection Fee. If the tariff has a Connection fee, this fee would not be included in the revenue sharing with the Partner and will remain entirely for the Operator. One of `"true"`, `"false"`. |
| `revenueSharing__deductElectricityCost` | string | no |  | Revenue Sharing - Deduct Electricity Cost. The cost of the electricity would first be deducted from the collected revenue and then the Revenue sharing rules will be applied. One of `"true"`, `"false"`. |
| `revenueSharing__reimburseForElectricityCost` | string | no |  | Revenue Sharing - Reimburse For Electricity Cost. If set to true, the Partner would receive not only their share of the revenue but also a reimbursement for the cost of the electricity. One of `"true"`, `"false"`. |
| `revenueSharing__fixedFeePerSessionAc` | number | no |  | Revenue Sharing - Fixed Fee Per Session Ac. Additional flat fee that is applied for every billed session and subtracted from the Partner’s share of the revenue for each session on AC Charging Station. |
| `revenueSharing__fixedFeePerSessionDc` | number | no |  | Revenue Sharing - Fixed Fee Per Session Dc. Additional flat fee that is applied for every billed session and subtracted from the Partner’s share of the revenue for each session on DC Charging Station. |
| `revenueSharing__feePerKwhAc` | number | no |  | Revenue Sharing - Fee Per Kwh Ac. Additional flat fee that is applied for every billed kWh and subtracted from the Partner's share of the revenue for each kWh billed on AC Charging Station. |
| `revenueSharing__feePerKwhDc` | number | no |  | Revenue Sharing - Fee Per Kwh Dc. Additional flat fee that is applied for every billed kWh and subtracted from the Partner's share of the revenue for each kWh billed on DC Charging Station. |
| `revenueSharing__handlingFee` | number | no |  | Revenue Sharing - Handling Fee. Additional percentage fee to be applied on the total amount paid by the user for the session. This fee is then subtracted from the Partner's share of the revenue. This fee is available only if the feature "Additional Platform Fees" is enabled for the system. |
| `monthlyPlatformFees__perChargePoint` | number | no |  | Monthly Platform Fees - Per Charge Point. The provided amount should be excluding VAT. |
| `monthlyPlatformFees__perAcEvse` | number | no |  | Monthly Platform Fees - Per Ac Evse. The provided amount should be excluding VAT. |
| `monthlyPlatformFees__perDcEvse` | number | no |  | Monthly Platform Fees - Per Dc Evse. The provided amount should be excluding VAT. |

### `partnerContractRead`

**Resources - Partner Contracts - Read.** Fetch a single AMPECO partner contract by its numeric ID, returning its terms such as revenue-sharing rules, access permissions, and platform fees. Use when you already know the contract ID; to discover IDs or browse contracts, use the partner contracts listing action instead. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partnerContract` | number | yes |  | Partner Contract. |

### `partnerContractUpdate`

**Resources - Partner Contracts - Update.** Replaces an existing partner contract in AMPECO by its numeric ID, setting title, partner, start/end dates, auto-renewal, access permissions, revenue-sharing terms, and monthly platform fees. Use to edit a known contract; title, partner ID, and start date are always required. This is a full PUT replace, so sending the same payload converges to the same state and is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partnerContract` | number | yes |  | Partner Contract. |
| `title` | string | yes |  | Title. |
| `partnerId` | number | yes |  | Partner Id. |
| `startDate` | ISO date-time string | yes |  | Start Date. The contract is effective from the first of the selected month. |
| `endDate` | ISO date-time string | no |  | End Date. The contract expires at the last day of the selected month. If nothing is selected, there is no expiration date. |
| `autoRenewal` | string | no |  | Auto Renewal. One of `"true"`, `"false"`. |
| `accessAndPermissions__sessionsRemoteControl` | string | no |  | Access And Permissions - Sessions Remote Control. Allows the partner to start/stop session, unlock connector, trigger message, set a charging profile and get the composite schedule. One of `"true"`, `"false"`. |
| `accessAndPermissions__startReservation` | string | no |  | Access And Permissions - Start Reservation. Allows the partner to make reservations. One of `"true"`, `"false"`. |
| `accessAndPermissions__stopReservation` | string | no |  | Access And Permissions - Stop Reservation. Allows the partner to cancel reservations. One of `"true"`, `"false"`. |
| `accessAndPermissions__resetChargePoint` | string | no |  | Access And Permissions - Reset Charge Point. Allows the partner to reset charge points. One of `"true"`, `"false"`. |
| `accessAndPermissions__firmwareUpdate` | string | no |  | Access And Permissions - Firmware Update. Allows the partner to make firmware updates to the charge points. One of `"true"`, `"false"`. |
| `revenueSharing__partnerSharePercentageAcEvse` | number | no |  | Revenue Sharing - Partner Share Percentage Ac Evse. |
| `revenueSharing__partnerSharePercentageDcEvse` | number | no |  | Revenue Sharing - Partner Share Percentage Dc Evse. |
| `revenueSharing__excludeConnectionFee` | string | no |  | Revenue Sharing - Exclude Connection Fee. If the tariff has a Connection fee, this fee would not be included in the revenue sharing with the Partner and will remain entirely for the Operator. One of `"true"`, `"false"`. |
| `revenueSharing__deductElectricityCost` | string | no |  | Revenue Sharing - Deduct Electricity Cost. The cost of the electricity would first be deducted from the collected revenue and then the Revenue sharing rules will be applied. One of `"true"`, `"false"`. |
| `revenueSharing__reimburseForElectricityCost` | string | no |  | Revenue Sharing - Reimburse For Electricity Cost. If set to true, the Partner would receive not only their share of the revenue but also a reimbursement for the cost of the electricity. One of `"true"`, `"false"`. |
| `revenueSharing__fixedFeePerSessionAc` | number | no |  | Revenue Sharing - Fixed Fee Per Session Ac. Additional flat fee that is applied for every billed session and subtracted from the Partner’s share of the revenue for each session on AC Charging Station. |
| `revenueSharing__fixedFeePerSessionDc` | number | no |  | Revenue Sharing - Fixed Fee Per Session Dc. Additional flat fee that is applied for every billed session and subtracted from the Partner’s share of the revenue for each session on DC Charging Station. |
| `revenueSharing__feePerKwhAc` | number | no |  | Revenue Sharing - Fee Per Kwh Ac. Additional flat fee that is applied for every billed kWh and subtracted from the Partner's share of the revenue for each kWh billed on AC Charging Station. |
| `revenueSharing__feePerKwhDc` | number | no |  | Revenue Sharing - Fee Per Kwh Dc. Additional flat fee that is applied for every billed kWh and subtracted from the Partner's share of the revenue for each kWh billed on DC Charging Station. |
| `revenueSharing__handlingFee` | number | no |  | Revenue Sharing - Handling Fee. Additional percentage fee to be applied on the total amount paid by the user for the session. This fee is then subtracted from the Partner's share of the revenue. This fee is available only if the feature "Additional Platform Fees" is enabled for the system. |
| `monthlyPlatformFees__perChargePoint` | number | no |  | Monthly Platform Fees - Per Charge Point. The provided amount should be excluding VAT. |
| `monthlyPlatformFees__perAcEvse` | number | no |  | Monthly Platform Fees - Per Ac Evse. The provided amount should be excluding VAT. |
| `monthlyPlatformFees__perDcEvse` | number | no |  | Monthly Platform Fees - Per Dc Evse. The provided amount should be excluding VAT. |

### `partnerContractDelete`

**Resources - Partner Contracts - Delete.** Deletes one partner contract in AMPECO by its numeric ID. Use to remove a contract; requires the partner contract ID. Idempotent in effect: the end state is the contract being gone, though a repeat call may report it as already removed. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partnerContract` | number | yes |  | Partner Contract. |

### `expensesListing`

**Resources - Partner Expenses - Expenses Listing.** List partner expense records in AMPECO, optionally filtered by partner, settlement report, date range, origin, or currency code, and optionally with a per-record breakdown. Read-only and idempotent. Enable Paginate Results to walk every page up to the Per page cap. For the income side use Partner Revenues Listing instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__partnerId` | number | no |  | Filter - Partner Id. Only list expenses associated with a certain partner. |
| `filter__settlementReportId` | number | no |  | Filter - Settlement Report Id. Only list expenses associated with a certain settlement report. |
| `filter__dateBefore` | ISO date-time string | no |  | Filter - Date Before. |
| `filter__dateAfter` | ISO date-time string | no |  | Filter - Date After. |
| `filter__origin` | string | no |  | Filter - Origin. Only list revenue by origin. One of `"platform-fee-emsp"`, `"platform-fee-cpo"`, `"user-custom-fee"`, `"session-emsp"`. |
| `filter__currencyCode` | string | no |  | Filter - Currency Code. 3-letter currency code (ISO 4217). Only list expenses by currency. |
| `withBreakdown` | string | no |  | With Breakdown. One of `"true"`, `"false"`. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `partnerInvitesListing`

**Resources - Partner Invites - Listing.** Lists partner invites in AMPECO, optionally filtered by partner, status (pending/sent/accepted), accepting user, invite email, or a creation date range. Use to find an invite ID or audit invite status; with no filters it returns all invites, and enabling Paginate Results walks every page rather than a single capped page. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__partnerId` | number | no |  | Filter - Partner Id. Only list expenses associated with a certain partner. |
| `filter__status` | string | no |  | Filter - Status. Only list invites in this status. One of `"pending"`, `"sent"`, `"accepted"`. |
| `filter__createdFrom` | ISO date-time string | no |  | Filter - Created From. |
| `filter__createdTo` | ISO date-time string | no |  | Filter - Created To. |
| `filter__userId` | number | no |  | Filter - User Id. Only list partner invite records accepted by a certain user. |
| `filter__inviteEmail` | string | no |  | Filter - Invite Email. Only list partner invite records sent to a particular email address. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `partnerInviteCreate`

**Resources - Partner Invites - Create.** Creates a new partner invite in AMPECO for a given partner ID, optionally emailing it to an invitee (email is required unless Send Via Email is false) and setting billing/access option flags. Use to invite someone to a partner; to change an existing invite use the Update action. Not idempotent: each call issues a separate invite (and may send an email), so guard against duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partnerId` | number | yes |  | Partner Id. |
| `sendViaEmail` | string | no |  | Send Via Email. One of `"true"`, `"false"`. |
| `email` | string | no |  | Email. Required by default. Prohibited if sendViaEmail is false. |
| `language` | string | no |  | Language. The language of the e-mail sent to the invitee. If none selected, the default end-users language will be used. Prohibited if `sendViaEmail` is false. |
| `options__allowCorporateAccountBilling` | string | no |  | Options - Allow Corporate Account Billing. One of `"true"`, `"false"`. |
| `options__limitCorporateAccountBillingToPartnerChargePoints` | string | no |  | Options - Limit Corporate Account Billing To Partner Charge Points. Required if allowCorporateAccountBilling is true. One of `"true"`, `"false"`. |
| `options__allowAccessToPrivateChargePoints` | string | no |  | Options - Allow Access To Private Charge Points. One of `"true"`, `"false"`. |

### `partnerInviteRead`

**Resources - Partner Invites - Read.** Fetches a single partner invite from AMPECO by its numeric ID. Use to retrieve one known invite; to search or discover invite IDs use the Listing action. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partnerInvite` | number | yes |  | Partner Invite. |

### `partnerInviteUpdate`

**Resources - Partner Invites - Update.** Updates an existing partner invite in AMPECO by its numeric ID, changing the partner association and billing/access option flags. Use to amend an outstanding invite; to issue a new one use the Create action. Only supplied fields change, so repeating the same call converges to the same state and is idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partnerInvite` | number | yes |  | Partner Invite. |
| `partnerId` | number | no |  | Partner Id. |
| `options__allowCorporateAccountBilling` | string | no |  | Options - Allow Corporate Account Billing. One of `"true"`, `"false"`. |
| `options__limitCorporateAccountBillingToPartnerChargePoints` | string | no |  | Options - Limit Corporate Account Billing To Partner Charge Points. Required if allowCorporateAccountBilling is true. One of `"true"`, `"false"`. |
| `options__allowAccessToPrivateChargePoints` | string | no |  | Options - Allow Access To Private Charge Points. One of `"true"`, `"false"`. |

### `partnerInviteDelete`

**Resources - Partner Invites - Partner Invite Delete.** Deletes one partner invite in AMPECO by its numeric ID. Use to revoke or remove an outstanding invite; requires the partner invite ID. Idempotent in effect: the end state is the invite being gone, though a repeat call may report it as already removed. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partnerInvite` | number | yes |  | Partner Invite. |

### `revenuesListing`

**Resources - Partner Revenues - Revenues Listing.** List partner revenue records in AMPECO, optionally filtered by partner, settlement report, date range, origin, or currency code. Read-only and idempotent. Enable Paginate Results to walk every page up to the Per page cap; leave it off to fetch a single page. For the cost side use Partner Expenses Listing instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__partnerId` | number | no |  | Filter - Partner Id. Only list revenue associated with a certain partner. |
| `filter__settlementReportId` | number | no |  | Filter - Settlement Report Id. Only list revenue associated with a certain settlement report. |
| `filter__dateBefore` | ISO date-time string | no |  | Filter - Date Before. |
| `filter__dateAfter` | ISO date-time string | no |  | Filter - Date After. |
| `filter__origin` | string | no |  | Filter - Origin. Only list revenue by origin. One of `"electricity-tax-reimbursement"`, `"session-cpo"`. |
| `filter__currencyCode` | string | no |  | Filter - Currency Code. 3-letter currency code (ISO 4217). Only list revenue by currency. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `partnerSettlementReportsListing`

**Resources - Partner Settlement Reports - Listing.** List partner settlement reports, optionally filtered by partner id and a settlement-period date range. Read-only and idempotent. Use to discover reports; for the individual records within a report use the record listing actions. Enable Paginate Results to walk every page. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__partnerId` | number | no |  | Filter - Partner Id. |
| `filter__periodAfter` | ISO date-time string | no |  | Filter - Period After. |
| `filter__periodBefore` | ISO date-time string | no |  | Filter - Period Before. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `partnerSettlementReportRead`

**Resources - Partner Settlement Reports - Read.** Fetch a single partner settlement report by its numeric id. Read-only and idempotent. Use when you know the report id; to discover reports by partner or period use the Listing action, and for the records inside a report use the records listing/read actions. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partnerSettlementReport` | number | yes |  | Partner Settlement Report. |

### `partnerSettlementReportPartnerSettlementRecordsListing`

**Resources - Partner Settlement Reports - Listing Partner Settlement Records.** List the settlement records belonging to a given partner settlement report (identified by report id). Read-only and idempotent. Use to enumerate the payment records inside a report; to read one known record use Read Partner Settlement Record. Enable Paginate Results to walk every page. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partnerSettlementReport` | number | yes |  | Partner Settlement Report. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `partnerSettlementReportPartnerSettlementRecordCreate`

**Resources - Partner Settlement Reports - Create Partner Settlement Record.** Add a settlement record (date, paid amount, note) to an existing partner settlement report. Not idempotent: each call appends a new record, so retrying can create duplicate payment entries. To change an existing record use Update Partner Settlement Record. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partnerSettlementReport` | number | yes |  | Partner Settlement Report. |
| `date` | ISO date-time string | yes |  | Date. |
| `paidAmount` | number | yes |  | Paid Amount. |
| `note` | string | yes |  | Note. |

### `partnertSettlementReportPartnerSettlementRecordRead`

**Resources - Partner Settlement Reports - Read Partner Settlement Record.** Fetch a single settlement record from a partner settlement report, identified by the report id plus the record id. Read-only and idempotent. Use when you know both ids; to enumerate records use Listing Partner Settlement Records. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partnerSettlementReport` | number | yes |  | Partner Settlement Report. |
| `PartnerSettlementRecord` | number | yes |  | Partner Settlement Record. |

### `partnerSettlementReportPartnerSettlementRecordUpdate`

**Resources - Partner Settlement Reports - Update Partner Settlement Record.** Update an existing settlement record (date, paid amount, note) within a partner settlement report, identified by the report id plus the record id. This is a full replace of the supplied fields, so it is idempotent - repeating it with the same values yields the same result. To add a new record use Create Partner Settlement Record. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partnerSettlementReport` | number | yes |  | Partner Settlement Report. |
| `PartnerSettlementRecord` | number | yes |  | Partner Settlement Record. |
| `date` | ISO date-time string | yes |  | Date. |
| `paidAmount` | number | yes |  | Paid Amount. |
| `note` | string | yes |  | Note. |

### `partnerSettlementReportPartnerSettlementRecordDelete`

**Resources - Partner Settlement Reports - Delete Partner Settlement Record.** Permanently delete one settlement record from a partner settlement report, identified by the report id plus the record id. Destructive and not reversible; deleting an already-removed record will error. Do not retry blindly. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partnerSettlementReport` | number | yes |  | Partner Settlement Report. |
| `PartnerSettlementRecord` | number | yes |  | Partner Settlement Record. |

### `partnersListing`

**Resources - Partners - Listing.** List AMPECO partners, optionally filtered by country, registration number, or external ID, with Paginate Results to fetch every page. Read-only and idempotent; use this to discover partner IDs before reading, updating, or deleting a specific partner. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__country` | string | no |  | Filter - Country. Lists partners from the specified country. One of `"AF"`, `"AX"`, `"AL"`, `"DZ"`, `"AS"`, `"AD"`, `"AO"`, `"AI"`, `"AQ"`, `"AG"`, `"AR"`, `"AM"`, `"AW"`, `"AU"`, `"AT"`, `"AZ"`, `"BS"`, `"BH"`, `"BD"`, `"BB"`, `"BY"`, `"BE"`, `"BZ"`, `"BJ"`, `"BM"` and 225 more. |
| `filter__regNo` | string | no |  | Filter - Reg No. Lists partners with the specified regNo. |
| `filter__externalId` | string | no |  | Filter - External Id. Only list partner, identified by the externalId. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `partnerCreate`

**Resources - Partners - Create.** Create a new AMPECO partner (B2B company) with company name plus optional address, contact details, billing, bank, and permission options. Not idempotent: each call creates a separate partner even with the same name. Use partner update to change an existing partner. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `businessName` | string | no |  | Business Name. The Partner's business name is used when showing the name of the Partner to EV drivers and admin users. If not provided, the `name` will be used instead. |
| `name` | string | yes |  | Name. Company name of the Partner. |
| `regNo` | string | no |  | Reg No. |
| `vatNo` | string | no |  | Vat No. |
| `address` | string | no |  | Address. |
| `postcode` | string | no |  | Postcode. |
| `city` | string | no |  | City. |
| `country` | string | no |  | Country. One of `"AF"`, `"AX"`, `"AL"`, `"DZ"`, `"AS"`, `"AD"`, `"AO"`, `"AI"`, `"AQ"`, `"AG"`, `"AR"`, `"AM"`, `"AW"`, `"AU"`, `"AT"`, `"AZ"`, `"BS"`, `"BH"`, `"BD"`, `"BB"`, `"BY"`, `"BE"`, `"BZ"`, `"BJ"`, `"BM"` and 225 more. |
| `region` | string | no |  | Region. When country is not in US, AU, CA, UM or RO, you can provide the region. |
| `state` | string | no |  | State. A value the product loads from the provider, such as an id; write the value itself. |
| `contactDetails__administrative__contactPerson` | string | no |  | Contact Details - Administrative - Contact Person. |
| `contactDetails__administrative__email` | string | no |  | Contact Details - Administrative - Email. |
| `contactDetails__administrative__phone` | string | no |  | Contact Details - Administrative - Phone. |
| `contactDetails__technical__contactPerson` | string | no |  | Contact Details - Technical - Contact Person. |
| `contactDetails__technical__email` | string | no |  | Contact Details - Technical - Email. |
| `contactDetails__technical__phone` | string | no |  | Contact Details - Technical - Phone. |
| `contactDetails__billing__contactPerson` | string | no |  | Contact Details - Billing - Contact Person. |
| `contactDetails__billing__email` | string | no |  | Contact Details - Billing - Email. |
| `contactDetails__billing__phone` | string | no |  | Contact Details - Billing - Phone. |
| `notifications__technical__chargePointFaults` | string | no |  | Notifications - Technical - Charge Point Faults. One of `"true"`, `"false"`. |
| `notifications__billing__settlementReports` | string | no |  | Notifications - Billing - Settlement Reports. One of `"true"`, `"false"`. |
| `monthlyPlatformFee` | number | no |  | Monthly Platform Fee. |
| `options__createUsers` | string | no |  | Options - Create Users. One of `"true"`, `"false"`. |
| `options__addUserBalance` | string | no |  | Options - Add User Balance. When set to false the API tokens related to this partner would not receive the users' balance in the response. One of `"true"`, `"false"`. |
| `options__supplierOnReceipts` | string | no |  | Options - Supplier On Receipts. One of `"true"`, `"false"`. |
| `options__allowToControlTariffs` | string | no |  | Options - Allow To Control Tariffs. Allows the Partner to update the tariff pricing. One of `"true"`, `"false"`. |
| `options__allowToControlTariffGroups` | string | no |  | Options - Allow To Control Tariff Groups. In addition to `allowToControlTariffs`, the Partner would also be able to manage Tariff Groups - attach and remove Tariffs, change Tariffs order in the Tariff Group. One of `"true"`, `"false"`. |
| `corporateBilling__enabled` | string | no |  | Corporate Billing - Enabled. One of `"true"`, `"false"`. |
| `corporateBilling__monthlyLimit` | number | no |  | Corporate Billing - Monthly Limit. |
| `corporateBilling__discount` | number | no |  | Corporate Billing - Discount. |
| `externalId` | string | no |  | External Id. Third party identifier of the partner. |
| `bankDetails__bankIban` | string | no |  | Bank Details - Bank Iban. IBAN that is provided for the partner. |
| `bankDetails__bankName` | string | no |  | Bank Details - Bank Name. Name of the Bank for which the partner has provided IBAN. |
| `bankDetails__bankAddress` | string | no |  | Bank Details - Bank Address. Address of the partner's Bank. |
| `bankDetails__bankCode` | string | no |  | Bank Details - Bank Code. Bank code assigned by a central bank, a bank supervisory body or a Bankers Association in the country. |
| `bankDetails__bankAccountNumber` | string | no |  | Bank Details - Bank Account Number. Bank account ID provided by the partner. |
| `bankDetails__bankAccountType` | string | no |  | Bank Details - Bank Account Type. Type of account the Partner has provided. |

### `partnerRead`

**Resources - Partners - Read.** Fetch a single AMPECO partner by its numeric ID. Read-only and idempotent; use when you already have the partner ID. To discover IDs or look up by country, regNo, or externalId, use the partners listing action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partner` | number | yes |  | Partner. |

### `partnerUpdate`

**Resources - Partners - Update.** Update an existing AMPECO partner identified by its numeric ID, changing fields such as name, address, contact details, billing, bank details, or permission options. A partial PATCH that applies only the fields you supply. Use partner create for a new partner. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partner` | number | yes |  | Partner. |
| `name` | string | no |  | Name. Company name of the Partner. |
| `regNo` | string | no |  | Reg No. |
| `vatNo` | string | no |  | Vat No. |
| `address` | string | no |  | Address. |
| `postcode` | string | no |  | Postcode. |
| `city` | string | no |  | City. |
| `country` | string | no |  | Country. One of `"AF"`, `"AX"`, `"AL"`, `"DZ"`, `"AS"`, `"AD"`, `"AO"`, `"AI"`, `"AQ"`, `"AG"`, `"AR"`, `"AM"`, `"AW"`, `"AU"`, `"AT"`, `"AZ"`, `"BS"`, `"BH"`, `"BD"`, `"BB"`, `"BY"`, `"BE"`, `"BZ"`, `"BJ"`, `"BM"` and 225 more. |
| `region` | string | no |  | Region. When country is not in US, AU, CA, UM or RO, you can provide the region. |
| `state` | string | no |  | State. A value the product loads from the provider, such as an id; write the value itself. |
| `contactDetails__administrative__contactPerson` | string | no |  | Contact Details - Administrative - Contact Person. |
| `contactDetails__administrative__email` | string | no |  | Contact Details - Administrative - Email. |
| `contactDetails__administrative__phone` | string | no |  | Contact Details - Administrative - Phone. |
| `contactDetails__technical__contactPerson` | string | no |  | Contact Details - Technical - Contact Person. |
| `contactDetails__technical__email` | string | no |  | Contact Details - Technical - Email. |
| `contactDetails__technical__phone` | string | no |  | Contact Details - Technical - Phone. |
| `contactDetails__billing__contactPerson` | string | no |  | Contact Details - Billing - Contact Person. |
| `contactDetails__billing__email` | string | no |  | Contact Details - Billing - Email. |
| `contactDetails__billing__phone` | string | no |  | Contact Details - Billing - Phone. |
| `notifications__technical__chargePointFaults` | string | no |  | Notifications - Technical - Charge Point Faults. One of `"true"`, `"false"`. |
| `notifications__billing__settlementReports` | string | no |  | Notifications - Billing - Settlement Reports. One of `"true"`, `"false"`. |
| `monthlyPlatformFee` | number | no |  | Monthly Platform Fee. |
| `options__createUsers` | string | no |  | Options - Create Users. One of `"true"`, `"false"`. |
| `options__addUserBalance` | string | no |  | Options - Add User Balance. When set to false the API tokens related to this partner would not receive the users' balance in the response. One of `"true"`, `"false"`. |
| `options__supplierOnReceipts` | string | no |  | Options - Supplier On Receipts. One of `"true"`, `"false"`. |
| `options__allowToControlTariffs` | string | no |  | Options - Allow To Control Tariffs. Allows the Partner to update the tariff pricing. One of `"true"`, `"false"`. |
| `options__allowToControlTariffGroups` | string | no |  | Options - Allow To Control Tariff Groups. In addition to `allowToControlTariffs`, the Partner would also be able to manage Tariff Groups - attach and remove Tariffs, change Tariffs order in the Tariff Group. One of `"true"`, `"false"`. |
| `corporateBilling__enabled` | string | no |  | Corporate Billing - Enabled. One of `"true"`, `"false"`. |
| `corporateBilling__monthlyLimit` | number | no |  | Corporate Billing - Monthly Limit. |
| `corporateBilling__discount` | number | no |  | Corporate Billing - Discount. |
| `externalId` | string | no |  | External Id. Third party identifier of the partner. |
| `bankDetails__bankIban` | string | no |  | Bank Details - Bank Iban. IBAN that is provided for the partner. |
| `bankDetails__bankName` | string | no |  | Bank Details - Bank Name. Name of the Bank for which the partner has provided IBAN. |
| `bankDetails__bankAddress` | string | no |  | Bank Details - Bank Address. Address of the partner's Bank. |
| `bankDetails__bankCode` | string | no |  | Bank Details - Bank Code. Bank code assigned by a central bank, a bank supervisory body or a Bankers Association in the country. |
| `bankDetails__bankAccountNumber` | string | no |  | Bank Details - Bank Account Number. Bank account ID provided by the partner. |
| `bankDetails__bankAccountType` | string | no |  | Bank Details - Bank Account Type. Type of account the Partner has provided. |

### `partnerDelete`

**Resources - Partners - Delete.** Permanently delete an AMPECO partner by its numeric ID. Destructive and not reversible; re-running on an already-deleted partner will fail. Confirm the partner ID via the read or listing action first. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `partner` | number | yes |  | Partner. |

### `getPaymentTerminals`

**Resources - Payment Terminals - Get Payment Terminals.** List payment terminals, optionally filtered by serial number. Read-only and idempotent. Enable the Paginate Results option to fetch across pages up to Per page total; otherwise a single page (max 100) is returned. Use getPaymentTerminal when you already know a terminal id. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__serialNumber` | string | no |  | Filter - Serial Number. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `createPaymentTerminal`

**Resources - Payment Terminals - Create Payment Terminal.** Register a new payment terminal in AMPECO, supplying fields specific to the selected terminal variant (Payter, Valina, Nayax, Adyen, etc.). Not idempotent: each call creates a separate terminal, so calling twice yields duplicates. Use updatePaymentTerminal to modify an existing terminal instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `requestBody_VariantType` | string | yes |  | Request Body Variant Type. Select the type of the variant. One of `"1"`, `"2"`, `"3"`, `"4"`, `"5"`, `"6"`, `"7"`, `"8"`, `"9"`, `"10"`. |
| `requestBody` | object | yes |  | Request Body. An object whose fields depend on other inputs; the product shows them. |

### `getPaymentTerminal`

**Resources - Payment Terminals - Get Payment Terminal.** Fetch a single payment terminal by its id, returning its configuration and status. Read-only and idempotent. Use when you already know the terminal id; to browse terminals or filter by serial number use getPaymentTerminals. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `paymentTerminal` | string | yes |  | Payment Terminal. |

### `updatePaymentTerminal`

**Resources - Payment Terminals - Update Payment Terminal.** Modify an existing payment terminal identified by its id, supplying fields specific to the selected terminal variant (Payter, Valina, Nayax, Adyen, etc.). Idempotent: applies the supplied fields to that one terminal. Use createPaymentTerminal to register a new terminal, or deletePaymentTerminal to remove one. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `paymentTerminal` | string | yes |  | Payment Terminal. |
| `requestBody_VariantType` | string | yes |  | Request Body Variant Type. Select the type of the variant. One of `"1"`, `"2"`, `"3"`, `"4"`, `"5"`, `"6"`, `"7"`, `"8"`, `"9"`, `"10"`. |
| `requestBody` | object | yes |  | Request Body. An object whose fields depend on other inputs; the product shows them. |

### `deletePaymentTerminal`

**Resources - Payment Terminals - Delete Payment Terminal.** Permanently remove a payment terminal identified by its id. Destructive but idempotent: once deleted, repeating the call has no further effect (the terminal is already gone). Use getPaymentTerminal first to confirm you have the right terminal. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `paymentTerminal` | string | yes |  | Payment Terminal. |

### `receiptsListing`

**Resources - Receipts - Receipts Listing.** List receipts with optional filters by user, tax ID, payment status, and billing period. Read-only and safe to repeat. Enable Paginate Results to retrieve all matches; to fetch one known receipt by ID use receipt-read instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__userId` | number | no |  | Filter - User Id. Only list Receipts with a certain user id. |
| `filter__taxId` | number | no |  | Filter - Tax Id. Only list Receipts with specific VAT id. |
| `filter__paymentStatus` | string | no |  | Filter - Payment Status. One of `"pending"`, `"paid"`, `"partially_paid"`. |
| `filter__periodStart` | ISO date-time string | no |  | Filter - Period Start. ISO 8601 formatted date. |
| `filter__periodEnd` | ISO date-time string | no |  | Filter - Period End. ISO 8601 formatted date. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `receiptRead`

**Resources - Receipts - Receipt Read.** Fetch one receipt by its numeric ID. Read-only and safe to repeat. To find receipts when you do not know the ID (e.g. by user, tax ID, payment status, or period) use receipts-listing instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `receipt` | number | yes |  | Receipt. |

### `reservationsListing`

**Resources - Reservations - Reservations Listing.** List AMPECO EVSE reservations, optionally filtered by EVSE ID, user ID, status (active/expired/canceled/done), or reserved-at date range, with auto-pagination available. Use to discover reservation IDs or survey bookings; for a known reservation use the reservation read action. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__evseId` | number | no |  | Filter - Evse Id. Only list reservations for specific EVSE by ID. |
| `filter__userId` | number | no |  | Filter - User Id. Only list reservations for a specific user by ID. |
| `filter__status` | string | no |  | Filter - Status. Only list reservations with this status. One of `"active"`, `"expired"`, `"canceled"`, `"done"`. |
| `filter__reservedFrom` | ISO date-time string | no |  | Filter - Reserved From. Date from based on reserved at attribute. |
| `filter__reservedTo` | ISO date-time string | no |  | Filter - Reserved To. Date to based on reserved at attribute. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `reservationRead`

**Resources - Reservations - Reservation Read.** Fetch a single AMPECO EVSE reservation by its numeric ID, returning its status and details. Use when you already know the reservation ID; to find reservations by EVSE, user, status, or date range use the reservations listing action. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reservation` | number | yes |  | Reservation. |

### `securityEventsListing`

**Resources - Security Events - Security Events Listing.** Lists charge-point security events (firmware updates, reboots, tamper detection, etc.) in AMPECO, optionally filtered by event type, charge point, or a timestamp range. Use to audit or monitor device security activity; with no filters it returns all events, and enabling Paginate Results walks every page rather than a single capped page. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__type` | string | no |  | Filter - Type. Type of critical security events that are pushed from the Charge Point to the backend. One of `"FirmwareUpdated"`, `"SettingSystemTime"`, `"StartupOfTheDevice"`, `"ResetOrReboot"`, `"SecurityLogWasCleared"`, `"MemoryExhaustion"`, `"TamperDetectionActivated"`. |
| `filter__chargePoint` | number | no |  | Filter - Charge Point. |
| `filter__timestampFrom` | string | no |  | Filter - Timestamp From. |
| `filter__timestampTo` | string | no |  | Filter - Timestamp To. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `securityEventRead`

**Resources - Security Events - Security Event Read.** Fetches a single charge-point security event from AMPECO by its numeric ID. Use to inspect one known event; to discover event IDs or scan by type/charge point/time use the Security Events Listing action. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `securityEvent` | number | yes |  | Security Event. |

### `sessionsListing`

**Resources - Sessions - Listing.** List AMPECO charging sessions with extensive filters (EVSE, charge point, user, status, stop reason, payment type/status, time windows, partner, and more) and optional embeds for authorization, price breakdown, and charging periods; auto-pagination is available. Use to find sessions or build usage/billing reports; for a single known session use the session read action. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `withClockAlignedEnergyConsumption` | string | no |  | With Clock Aligned Energy Consumption. One of `"true"`, `"false"`. |
| `clockAlignedInterval` | string | no |  | Clock Aligned Interval. One of `"15"`, `"30"`, `"60"`. |
| `withAuthorization` | string | no |  | With Authorization. One of `"true"`, `"false"`. |
| `withPriceBreakdown` | string | no |  | With Price Breakdown. One of `"true"`, `"false"`. |
| `withChargingPeriods` | string | no |  | With Charging Periods. One of `"true"`, `"false"`. |
| `withChargingPeriodsPriceBreakdown` | string | no |  | With Charging Periods Price Breakdown. One of `"true"`, `"false"`. |
| `filter__evseId` | number | no |  | Filter - Evse Id. Only list sessions on a certain EVSE. |
| `filter__chargePointId` | number | no |  | Filter - Charge Point Id. Only list sessions on a certain Charge Point. |
| `filter__evsePhysicalReference` | string | no |  | Filter - Evse Physical Reference. Only list sessions on a certain EVSE, identified by the phisicalReference. |
| `filter__chargePointNetworkId` | string | no |  | Filter - Charge Point Network Id. Only list sessions on a certain Charge Point, identified by the NetworkId. |
| `filter__reason` | string | no |  | Filter - Reason. One of `"working_hours_exceeded"`, `"timeout"`, `"authorization_amount_reached"`, `"new_start_transaction_received"`, `"force_stop"`, `"standard_stop"`, `"energy_exceeded"`, `"schedule_completed"`, `"pre_authorization_failed"`, `"system_force_stop"`, `"time_limit"`, `"balance_exceeded"`, `"deauthorized"`, `"emergencystop"`, `"energylimitreached"`, `"evdisconnected"`, `"groundfault"`, `"immediatereset"`, `"hardreset"`, `"local"`, `"localoutofcredit"`, `"masterpass"`, `"other"`, `"overcurrentfault"`, `"powerloss"` and 24 more. |
| `filter__chargePointBootNotificationSerialNumber` | string | no |  | Filter - Charge Point Boot Notification Serial Number. Only list sessions on Charge Points with last boot notification that had this charge_point_serial_number. |
| `filter__chargePointBootNotificationVendor` | string | no |  | Filter - Charge Point Boot Notification Vendor. Only list sessions on Charge Points with last boot notification that had this vendor. |
| `filter__startedAfter` | ISO date-time string | no |  | Filter - Started After. Only list sessions identified by the start time being after this datetime. |
| `filter__startedBefore` | ISO date-time string | no |  | Filter - Started Before. Only list sessions identified by the start time being before this datetime. |
| `filter__userId` | number | no |  | Filter - User Id. Only list sessions by a certain user. |
| `filter__status` | string | no |  | Filter - Status. Only list session in this status. One of `"unknown"`, `"pending"`, `"active"`, `"finished"`, `"expired"`, `"failed"`. |
| `filter__endedAfter` | ISO date-time string | no |  | Filter - Ended After. Only list sessions identified by the end time being after this datetime. |
| `filter__endedBefore` | ISO date-time string | no |  | Filter - Ended Before. Only list sessions identified by the end time being before this datetime. |
| `filter__partnerId` | number | no |  | Filter - Partner Id. Only list sessions associated with a certain partner. |
| `filter__subOperatorId` | number | no |  | Filter - Sub Operator Id. Only list sessions associated with partners, assigned to certain sub-operator. |
| `filter__idTag` | string | no |  | Filter - Id Tag. Only list sessions started with a specific idTag (RFID identifier or remote start identifier) A remote start identifier has the format `*XXXXXXX` where the `XXXXXXX` is the session id padded with `0`s on the left. |
| `filter__paymentType` | string | no |  | Filter - Payment Type. `bank_transfer` is used for one-time bank transfers, for saved (tokenized) bank transfers use `tokenized`. One of `"tokenized"`, `"subscription"`, `"balance"`, `"corporate"`, `"terminal"`, `"bank_transfer"`. |
| `filter__paymentStatus` | string | no |  | Filter - Payment Status. One of `"pending"`, `"paid"`, `"partially"`, `"failed"`. |
| `filter__taxId` | number | no |  | Filter - Tax Id. Only list sessions with specific VAT id. |
| `filter__paymentStatusUpdatedBefore` | ISO date-time string | no |  | Filter - Payment Status Updated Before. Only list sessions with payment status updated before the specified date and time. Please provide the value in ISO 8601 formatted date. |
| `filter__paymentStatusUpdatedAfter` | ISO date-time string | no |  | Filter - Payment Status Updated After. Only list sessions with payment status updated after the specified date and time. Please provide the value in ISO 8601 formatted date. |
| `filter__externalAppData` | string | no |  | Filter - External App Data. Only list records with specific external application data. You can use a dot notation to search for nested properties. For example, `filter[externalAppData.property1.property2]=value`. |
| `filter__receiptId` | number | no |  | Filter - Receipt Id. Only list sessions with specific receipt id. |
| `filter__authorizationSource` | string | no |  | Filter - Authorization Source. Filter sessions based on authorization source. One of `"roaming"`, `"local"`, `"third_party"`. |
| `filter__billingStatus` | string | no |  | Filter - Billing Status. Only list sessions in this billing status. One of `"pending"`, `"suspended"`, `"completed"`, `"null"`. |
| `filter__terminalId` | number | no |  | Filter - Terminal Id. Only list sessions with transaction(s) with specific payment terminal id. |
| `filter__lastUpdatedAfter` | ISO date-time string | no |  | Filter - Last Updated After. ISO 8601 formatted date. Lists only the specific resource that was last updated on and after this datetime. |
| `filter__lastUpdatedBefore` | ISO date-time string | no |  | Filter - Last Updated Before. ISO 8601 formatted date. Lists only the specific resource that was last updated on and before this datetime. |
| `filter__roaming__roamingOperatorCpoIds` | array | no |  | Filter - Roaming - Roaming Operator Cpo Ids. Only list sessions initiated on the EVSEs of a specific Roaming operator with a CPO role. |
| `include` | array | no |  | Include. One of `"externalAppData"`. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `sessionRead`

**Resources - Sessions - Read.** Fetch a single AMPECO charging session by its session ID, with optional embeds for authorization, price breakdown, charging periods, and clock-aligned energy consumption. Use when you already know the session ID; to search across sessions use the sessions listing action. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | Session. |
| `withClockAlignedEnergyConsumption` | string | no |  | With Clock Aligned Energy Consumption. One of `"true"`, `"false"`. |
| `clockAlignedInterval` | string | no |  | Clock Aligned Interval. One of `"15"`, `"30"`, `"60"`. |
| `withAuthorization` | string | no |  | With Authorization. One of `"true"`, `"false"`. |
| `withChargingPeriods` | string | no |  | With Charging Periods. One of `"true"`, `"false"`. |
| `withChargingPeriodsPriceBreakdown` | string | no |  | With Charging Periods Price Breakdown. One of `"true"`, `"false"`. |
| `withPriceBreakdown` | string | no |  | With Price Breakdown. One of `"true"`, `"false"`. |
| `include` | array | no |  | Include. One of `"externalAppData"`. |

### `sessionsConsumptionStatsRead`

**Resources - Sessions - Read Sessions Consumption Stats.** Fetch the energy-consumption statistics time series for a single AMPECO charging session by its session ID. Note that results differ by session state: active sessions return live data points, while finished sessions return aggregated final data capped at 300 items. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `session` | string | yes |  | Session. |

### `settingsListing`

**Resources - Settings - Settings Listing.** Retrieve all account/platform settings. Read-only and idempotent; takes no input. Use to inspect the current configuration values exposed by the AMPECO instance. Needs authentication.

Kind: safe to repeat.

No inputs.

### `subOperatorsListing`

**Resources - Sub Operators - Listing.** List all sub operators on the AMPECO platform. Read-only and idempotent. Enable Paginate Results to retrieve every page up to the Per page cap; leave it off for a single page. Use to discover sub operator ids, then Sub Operator Read for one record. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `subOperatorRead`

**Resources - Sub Operators - Read.** Fetch a single sub operator from AMPECO by its numeric id. Read-only and idempotent. Use when you already have the sub operator id; to discover ids first use Sub Operators Listing. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subOperator` | number | yes |  | Sub Operator. |

### `subscriptionsListing`

**Resources - Subscriptions - Subscriptions Listing.** List subscriptions with optional filters by plan ID, status, end-date range, and external-billing flag. Read-only and idempotent. Enable the pagination option to fetch all matching subscriptions across pages; otherwise one page (up to per_page) is returned. Use this to find a subscription ID before reading one. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__planId` | string | no |  | Filter - Plan Id. |
| `filter__endDateFrom` | ISO date-time string | no |  | Filter - End Date From. ISO 8601 formatted date. |
| `filter__endDateTo` | ISO date-time string | no |  | Filter - End Date To. ISO 8601 formatted date. |
| `filter__status` | string | no |  | Filter - Status. One of `"active"`, `"canceled"`, `"expired"`, `"suspended"`, `"pending"`. |
| `filter__billedExternally` | string | no |  | Filter - Billed Externally. Applicable only when the system uses both payment processor and external billing mode simultaneously. Show or hide subscriptions where users have enabled "External billing" (if allowed by the Billing settings). |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `subscriptionRead`

**Resources - Subscriptions - Subscription Read.** Fetch a single subscription by its numeric ID. Read-only and idempotent. Use when you already know the subscription ID; otherwise use the Subscriptions Listing to find it first. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `subscription` | number | yes |  | Subscription. |

### `tariffGroupsListing`

**Resources - Tariff Groups - Listing.** List AMPECO tariff groups, optionally filtered by managing partner ID, and enable Paginate Results to auto-fetch across pages. Read-only and idempotent; use this to discover group IDs before reading, updating, or deleting a specific group. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__partnerId` | number | no |  | Filter - Partner Id. Only list tariffs managed by certan partner. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `tariffGroupCreate`

**Resources - Tariff Groups - Create.** Create a new AMPECO tariff group with a name and optional ordered tariff list and partner assignment. Not idempotent: each call creates a separate group (and auto-adds a free base tariff, since empty groups are disallowed). Use tariff group update to change an existing group instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `tariffIds` | array | no |  | Tariff Ids. Ordered list of tariff ids in the group. Please note that the order is checked from bottom to top, meaning that the tariff with the largest index in that list (in other words that is the lowest in the list), that matches the requirements will apply. |
| `partnerId` | number | no |  | Partner Id. The assigned Partner will have access to make changes to the tariff group. |

### `tariffGroupRead`

**Resources - Tariff Groups - Read.** Fetch a single AMPECO tariff group by its numeric ID, returning its name and ordered tariff list. Read-only and idempotent; use when you already have the group ID. To discover IDs first, use the tariff groups listing action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tariffGroup` | number | yes |  | Tariff Group. |

### `tariffGroupUpdate`

**Resources - Tariff Groups - Update.** Update an existing AMPECO tariff group identified by its numeric ID, replacing its name, ordered tariff list, or assigned partner. Not idempotent in effect since it overwrites the current tariff ordering (which is evaluated bottom-to-top); send the full intended tariff list rather than a partial set. Use tariff group create for a new group. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tariffGroup` | number | yes |  | Tariff Group. |
| `name` | string | yes |  | Name. |
| `tariffIds` | array | no |  | Tariff Ids. Ordered list of tariff ids in the group. Please note that the order is checked from bottom to top, meaning that the tariff with the largest index in that list (in other words that is the lowest in the list), that matches the requirements will apply. |
| `partnerId` | number | no |  | Partner Id. The assigned Partner will have access to make changes to the tariff group. |

### `tariffGroupDelete`

**Resources - Tariff Groups - Delete.** Permanently delete an AMPECO tariff group by its numeric ID. Destructive and not reversible; re-running on an already-deleted group will fail. Confirm the correct group ID first via the read or listing action. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tariffGroup` | number | yes |  | Tariff Group. |

### `tariffSnapshotRead`

**Resources - Tariff Snapshots - Read Tariff Snapshot.** Fetch a single tariff snapshot (a point-in-time record of tariff terms) by its numeric ID. Read-only and safe to repeat. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tariffSnapshot` | number | yes |  | Tariff Snapshot. |

### `taxIdentificationNumbersListing`

**Resources - Tax Identification Numbers - Listing.** List tax identification numbers, optionally auto-paginating across all pages to gather every record. Use to browse or find a TIN; read-only and safe to retry. To fetch one known record by ID use the read action instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `taxIdentificationNumberCreate`

**Resources - Tax Identification Numbers - Create.** Create a new tax identification number record with the given name. Use when registering a new TIN; to change an existing one use the update action instead. Not idempotent — each call creates a new record. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |

### `taxIdentificationNumberRead`

**Resources - Tax Identification Numbers - Read.** Retrieve a single tax identification number by its numeric ID. Use when you already know the ID and need its details; read-only and safe to retry. To search or browse multiple records use the listing action instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taxIdentificationNumber` | number | yes |  | Tax Identification Number. |

### `taxIdentificationNumberUpdate`

**Resources - Tax Identification Numbers - Update.** Update an existing tax identification number by its numeric ID, changing its name. Use when modifying a known TIN record rather than creating one; targets a specific record so re-running with the same values is safe. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taxIdentificationNumber` | number | yes |  | Tax Identification Number. |
| `name` | string | no |  | Name. |

### `taxIdentificationNumberDelete`

**Resources - Tax Identification Numbers - Delete.** Permanently delete a tax identification number by its numeric ID. Use when removing a TIN record; this is destructive and cannot be undone, so confirm the ID first. Re-running after the record is gone will error. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `taxIdentificationNumber` | number | yes |  | Tax Identification Number. |

### `taxesListing`

**Resources - Taxes - Listing.** List all tax rates configured in AMPECO. Read-only and idempotent; enable Paginate Results to fetch every page in one call, or leave it off to return a single page (up to per_page, max 100). Use to discover a tax ID before reading, applying, or deleting a specific tax. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `taxCreate`

**Resources - Taxes - Create.** Create a new tax rate in AMPECO, supplying a name and percentage (optionally localized display names and a linked tax identification number). Not idempotent: each call adds another tax record even with identical inputs, so check existing taxes first to avoid duplicates. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `displayName` | array | no |  | Display Name. Each item: { `locale`?, `translation`? }. |
| `percentage` | number | yes |  | Percentage. |
| `taxIdentificationNumberId` | number | no |  | Tax Identification Number Id. |

### `taxRead`

**Resources - Taxes - Read.** Retrieve a single tax rate by its numeric ID. Read-only and idempotent. Pick this when you already know the tax ID; otherwise use the taxes listing action to find it first. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tax` | number | yes |  | Tax. |

### `taxUpdate`

**Resources - Taxes - Update.** Update an existing tax in AMPECO, identified by its numeric tax id, changing its name, localized display names, percentage rate, or linked tax identification number. Only the fields you supply are changed. Re-running with the same values is safe, but supplied values overwrite the current configuration. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tax` | number | yes |  | Tax. |
| `name` | string | no |  | Name. |
| `displayName` | array | no |  | Display Name. Each item: { `locale`?, `translation`? }. |
| `percentage` | number | no |  | Percentage. |
| `taxIdentificationNumberId` | number | no |  | Tax Identification Number Id. |

### `taxDelete`

**Resources - Taxes - Delete.** Permanently delete a tax rate by its numeric ID. Destructive and irreversible; effectively idempotent since deleting an already-removed tax has no further effect, though it may return a not-found error. Confirm the ID before calling. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `tax` | number | yes |  | Tax. |

### `templatesListing`

**Resources - Templates - Templates Listing.** List all charge point templates defined in AMPECO. Read-only and idempotent; enable Paginate Results to fetch every page, or leave it off for a single page (up to per_page, max 100). Use to find a template before applying it when creating or configuring charge points. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `termsAndPoliciesListing`

**Resources - Terms And Policies - Listing.** List terms-and-policies document versions, optionally filtered by document id and valid-from date. Read-only and idempotent. Use termsAndPoliciesRead when you already know a specific term version id. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__documentId` | number | no |  | Filter - Document Id. |
| `filter__validFrom` | ISO date-time string | no |  | Filter - Valid From. ISO 8601 formatted date. |

### `termsAndPoliciesRead`

**Resources - Terms And Policies - Read.** Fetch a single terms-and-policies document version by its numeric term version id. Read-only and idempotent. Use when you already know the term version id; to browse versions or filter by document use termsAndPoliciesListing. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `termVersion` | number | yes |  | Term Version. |

### `topUpPackagesListing`

**Resources - Top Up Packages - Listing.** List top-up packages, optionally filtered to only enabled or disabled ones. Read-only and idempotent; use this to discover packages or find a package id before updating or deleting. Enable pagination to fetch all results. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__enabled` | string | no |  | Filter - Enabled. Only list enabled or disabled Top-Up Packages. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `topUpPackagCreate`

**Resources - Top Up Packages - Create.** Create a new top-up package, requiring a price and bonus amount; the package is disabled by default unless enabled is set to true. Not idempotent: each call creates a separate package. Use Update to change an existing package instead of recreating it. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `price` | number | yes |  | Price. |
| `bonus` | number | yes |  | Bonus. |
| `enabled` | string | no |  | Enabled. By default is set to `false`. One of `"true"`, `"false"`. |

### `topUpPackageRead`

**Resources - Top Up Packages - Read.** Fetches a single top-up package from AMPECO by its numeric ID. Use to look up the details of one known package; requires the package ID. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topUpPackage` | number | yes |  | Top Up Package. |

### `topUpPackageUpdate`

**Resources - Top Up Packages - Update.** Update an existing top-up package, identified by its numeric id, changing only the fields you supply (price, bonus, enabled flag). Not idempotent: each call mutates live state. Use Create to add a new package and Listing to find the package id. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topUpPackage` | number | yes |  | Top Up Package. |
| `price` | number | no |  | Price. |
| `bonus` | number | no |  | Bonus. |
| `enabled` | string | no |  | Enabled. One of `"true"`, `"false"`. |

### `topUpPackageDelete`

**Resources - Top Up Packages - Delete.** Permanently delete a top-up package by its numeric id. Destructive and not idempotent: deleting an already-removed package will fail. Confirm the package with Listing before deleting; consider disabling via Update instead if you only need to take it offline. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `topUpPackage` | number | yes |  | Top Up Package. |

### `userGroupsListing`

**Resources - User Groups - Listing.** List AMPECO user groups, optionally filtered by partner (a specific partner ID, or only groups with/without a partner). Read-only and idempotent; enable Paginate Results to fetch all pages. To retrieve one group by its ID use the user group read action instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__noPartner` | string | no |  | Filter - No Partner. True returns User Groups that have no Partner associated, false returns User Groups that have a Partner associated. |
| `filter__partnerId` | number | no |  | Filter - Partner Id. User Groups of a specific Partner. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `userGroupCreate`

**Resources - User Groups - Create.** Create a new AMPECO user group with a name and optional description and partner association. Not idempotent: each call adds another group, so re-running creates duplicates. Note that partnerId can only be set while the group has no users; use the update action to modify an existing group. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `partnerId` | number | no |  | Partner Id. The partnerId can be updated only if there are no users added to the user group. |
| `description` | string | no |  | Description. |

### `userGroupRead`

**Resources - User Groups - Read.** Retrieve a single AMPECO user group by its numeric ID. Read-only and idempotent; pick this when you already know the group ID. To search or enumerate groups instead, use the user groups listing action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userGroup` | number | yes |  | User Group. |

### `userGroupUpdate`

**Resources - User Groups - Update.** Update an existing AMPECO user group identified by its numeric ID, setting its name and optional description and partner. Idempotent: applying the same field values repeatedly yields the same state. partnerId can only be changed while the group has no users assigned. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userGroup` | number | yes |  | User Group. |
| `name` | string | yes |  | Name. |
| `partnerId` | number | no |  | Partner Id. The partnerId can be updated only if there are no users added to the user group. |
| `description` | string | no |  | Description. |

### `userGroupDelete`

**Resources - User Groups - Delete.** Permanently delete an AMPECO user group by its numeric ID. Effectively idempotent on the target (re-deleting an already-removed group leaves no group), but destructive and irreversible, so confirm the ID before running. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userGroup` | number | yes |  | User Group. |

### `listUtilities`

**Resources - Utilities - List Utilities.** List all AMPECO utility (electricity provider) records. Read-only and safe to repeat; supports automatic pagination to fetch every utility across pages. Use to discover utility IDs and names; use the get utility action when you already know a single utility ID. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `createUtility`

**Resources - Utilities - Create Utility.** Create a new AMPECO utility (electricity provider) record with a name. Not idempotent: each call adds another utility, so re-running creates duplicates. Use the update utility action to rename an existing one. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |

### `getUtility`

**Resources - Utilities - Get Utility.** Fetch a single AMPECO utility (electricity provider) record by its numeric ID. Read-only and safe to repeat. Use when you already know the utility ID; use the list utilities action to browse or find IDs. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `utility` | number | yes |  | Utility. |

### `updateUtility`

**Resources - Utilities - Update Utility.** Update an existing AMPECO utility (electricity provider) record by its numeric ID, setting its name. Not idempotent in the create sense: the utility must already exist and this overwrites its name. Use the create utility action to add a new utility. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `utility` | number | yes |  | Utility. |
| `name` | string | yes |  | Name. |

### `deleteUtility`

**Resources - Utilities - Delete Utility.** Permanently delete a single AMPECO utility (electricity provider) record by its numeric ID. Destructive and not reversible. Effectively idempotent once removed, but the first call deletes the utility, so confirm the ID first. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `utility` | number | yes |  | Utility. |

### `vendorErrorCodesListing`

**Resources - Vendor Error Codes - Vendor Error Codes Listing.** List all vendor error codes configured in AMPECO. Read-only and safe to repeat. Enable the pagination option to fetch every page in one call; otherwise a single page (up to per_page, max 100) is returned. Use to discover available codes when you do not have a specific identifier. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `vendorErrorCodeCreate`

**Resources - Vendor Error Codes - Vendor Error Code Create.** Create a new vendor error code mapping from a vendor ID and error code, with optional description and recommended customer action. Not idempotent: each call adds a separate entry, so re-running produces duplicates. Use Update to change an existing mapping. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vendorId` | string | yes |  | Vendor Id. Unique identifier of the Vendor, reported from the Charge point. |
| `errorCode` | string | yes |  | Error Code. The code reported from the charge point when the hardwareStatus is faulted. |
| `errorCodeDescription` | string | no |  | Error Code Description. Description of the error provided by the vendor. |
| `errorCodeCustomerAction` | string | no |  | Error Code Customer Action. Recommended actions by the customer when this error occurs. |

### `vendorErrorCodeRead`

**Resources - Vendor Error Codes - Vendor Error Code Read.** Retrieve a single vendor error code from AMPECO by its numeric identifier. Read-only lookup, safe to repeat; returns the same record on each call. Use when you already know the specific code and want its full detail rather than scanning the full list. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vendorErrorCode` | number | yes |  | Vendor Error Code. |

### `vendorErrorCodeUpdate`

**Resources - Vendor Error Codes - Vendor Error Code Update.** Update an existing vendor error code entry (by its numeric ID), setting the vendor ID, error code, and optional description/customer-action text. Idempotent: applying the same values repeatedly leaves the entry unchanged. Use this to modify an existing mapping rather than Create (which would add a duplicate). Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vendorErrorCode` | number | yes |  | Vendor Error Code. |
| `vendorId` | string | yes |  | Vendor Id. Unique identifier of the Vendor, reported from the Charge point. |
| `errorCode` | string | yes |  | Error Code. The code reported from the charge point when the hardwareStatus is faulted. |
| `errorCodeDescription` | string | no |  | Error Code Description. Description of the error provided by the vendor. |
| `errorCodeCustomerAction` | string | no |  | Error Code Customer Action. Recommended actions by the customer when this error occurs. |

### `vendorErrorCodeDelete`

**Resources - Vendor Error Codes - Vendor Error Code Delete.** Permanently delete a vendor error code from AMPECO by its numeric identifier. This destructive write cannot be undone; repeating it after success will fail because the record no longer exists. Confirm the correct code before calling. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vendorErrorCode` | number | yes |  | Vendor Error Code. |

### `vouchersListing`

**Resources - Vouchers - Vouchers Listing.** List vouchers, with optional filters by type, status, code substring, redeeming user, and creation/redemption/expiry date ranges. Read-only and idempotent. Use this to search or count vouchers; to fetch one known voucher prefer Voucher Read. Enable Paginate Results for the full set across pages. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `filter__type` | string | no |  | Filter - Type. Lists only vouchers that are with one of these types `voucher`, `manual_top_up`, `top_up_auto`, `auto_top_up`, `top_up_by_operator`, `api_top_up`, `promo_code`, `subscribe_to_plan`. One of `"voucher"`, `"manual_top_up"`, `"auto_top_up"`, `"top_up_by_operator"`, `"api_top_up"`, `"promo_code"`, `"subscribe_to_plan"`. |
| `filter__status` | string | no |  | Filter - Status. Lists only the vouchers that are with one of these statuses `enabled`, `disabled`. One of `"enabled"`, `"disabled"`. |
| `filter__createdAt` | ISO date-time string | no |  | Filter - Created At. Lists only vouchers that are created on a particular date. Please provide the value in the following format `YYYY-MM-DD`. |
| `filter__redeemedAfter` | ISO date-time string | no |  | Filter - Redeemed After. Lists only vouchers that are redeemed after the specified date and time. Please provide the value in ISO 8601 formatted date. |
| `filter__redeemedBefore` | ISO date-time string | no |  | Filter - Redeemed Before. Lists only vouchers that were redeemed before the specified date and time. Please provide the value in ISO 8601 formatted date. |
| `filter__userId` | number | no |  | Filter - User Id. Lists only vouchers that were redeemed by a particular user. |
| `filter__expireDateAfter` | ISO date-time string | no |  | Filter - Expire Date After. Lists only vouchers with expiration date after the specified date. Please provide the value in RFC 3339 formatted date `YYYY-MM-DD`. |
| `filter__expireDateBefore` | ISO date-time string | no |  | Filter - Expire Date Before. Lists only vouchers with expiration date before the specified date. Please provide the value in RFC 3339 formatted date `YYYY-MM-DD`. |
| `filter__code` | string | no |  | Filter - Code. Lists only vouchers with code which contains the specified string. Please provide min 3 chars value. |
| `per_page` | number | no | `100` | Per page. When pagination is enabled: maximum total results across all pages. When pagination is disabled: number of results per API request (max 100). |
| `usePagination` | boolean | no | `false` | Paginate Results. Whether to automatically paginate to fetch all results. |

### `voucherCreate`

**Resources - Vouchers - Voucher Create.** Create a new voucher with an amount and optional expiry/validity period, assign-before date, code prefix, description, and localized titles. Not idempotent: each call mints a distinct voucher, so avoid retrying on uncertain failures. To change an existing voucher use Voucher Update instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `amount` | number | yes |  | Amount. |
| `expireDate` | ISO date-time string | no |  | Expire Date. RFC 3339 formatted date. Defines the date on which the voucher expires. The field can be calculated based on the `redeemedAt` timestamp and the `validityPeriod` field if the `validityPeriod` is set and the `expireDate` is not. |
| `validityPeriod` | string | no |  | Validity Period. Defines the validity period for the voucher. When a user redeems the voucher, this period is added to the `redeemedAt` timestamp to calculate the voucher's `expireDate`. This field is only used when `expireDate` is not already set - if `expireDate` has a value, this period is ignored and the define… One of `"1 month"`, `"3 months"`, `"6 months"`, `"1 year"`, `"2 years"`, `"3 years"`, `"5 years"`. |
| `assignBeforeDate` | ISO date-time string | no |  | Assign Before Date. The date before which the voucher should be assigned to user in order to be valid. RFC 3339 formatted date. |
| `description` | string | no |  | Description. |
| `prefix` | string | no |  | Prefix. The prefix of the voucher's code. |
| `title` | array | no |  | Title. The title of the voucher. Each item: { `locale`?, `translation`? }. |

### `voucherRead`

**Resources - Vouchers - Voucher Read.** Fetch a single voucher by its numeric id. Read-only and idempotent. Use this when you already know the id; to discover vouchers by code, status, or date use Vouchers Listing instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `voucher` | number | yes |  | Voucher. |

### `voucherUpdate`

**Resources - Vouchers - Voucher Update.** Update an existing voucher identified by its numeric id - status, amount, expiry/validity period, assign-before date, prefix, and localized titles. Targets one known voucher (it does not create); idempotent when sending the same values, since it sets fields to the supplied state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `voucher` | number | yes |  | Voucher. |
| `status` | string | no |  | Status. One of `"enabled"`, `"disabled"`. |
| `expireDate` | ISO date-time string | no |  | Expire Date. RFC 3339 formatted date. Defines the date on which the voucher expires. The field can be calculated based on the `redeemedAt` timestamp and the `validityPeriod` field if the `validityPeriod` is set and the `expireDate` is not. |
| `validityPeriod` | string | no |  | Validity Period. Defines the validity period for the voucher. When a user redeems the voucher, this period is added to the `redeemedAt` timestamp to calculate the voucher's `expireDate`. This field is only used when `expireDate` is not already set - if `expireDate` has a value, this period is ignored and the define… One of `"1 month"`, `"3 months"`, `"6 months"`, `"1 year"`, `"2 years"`, `"3 years"`, `"5 years"`. |
| `assignBeforeDate` | ISO date-time string | no |  | Assign Before Date. The date before which the voucher should be assigned to user in order to be valid. RFC 3339 formatted date. |
| `amount` | number | yes |  | Amount. |
| `prefix` | string | no |  | Prefix. The prefix of the voucher's code. |
| `title` | array | no |  | Title. The title of the voucher. Each item: { `locale`?, `translation`? }. |

### `voucherDelete`

**Resources - Vouchers - Voucher Delete.** Permanently delete a voucher by its numeric id. Destructive and not reversible; deleting an already-removed id will error. Do not retry blindly. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `voucher` | number | yes |  | Voucher. |

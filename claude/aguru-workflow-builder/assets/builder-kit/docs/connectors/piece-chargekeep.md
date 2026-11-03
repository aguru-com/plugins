# ChargeKeep

Easy-to-use recurring and one-time payments software for Stripe & PayPal

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-chargekeep'
  version: '0.3.7'
```

Categories: COMMERCE, PAYMENT_PROCESSING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

> Follow these instructions to get your Chargekeep API Key:
>
> 1. Visit the following website: https://crm.chargekeep.com/ or the beta website: https://beta.chargekeep.com
> 2. Once on the website, locate and click on the admin to obtain your chargekeep API Key.

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `base_url` | string | yes |  | Base URL. Select the base environment URL. One of `"https://crm.chargekeep.com"`, `"https://beta.chargekeep.com"`. |
| `api_key` | string | yes |  | Secret API Key. Enter the API Key. |

## Actions

### `addOrUpdateContact`

**Add or Update Contact.** Imports a contact (Lead, Client, or Partner) into the ChargeKeep/Sperse CRM, creating it or updating an existing record. When Match Existing is enabled it upserts by matching on email and full name (or the supplied Contact ID); otherwise it always creates a new record. Use to add or sync a person; requires First Name or Last Name (or Company Name if both are empty). Repeating with the same identifying input upserts the same contact rather than duplicating. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `importType` | string | yes | `"Lead"` | Contact Type. One of `"Lead"`, `"Client"`, `"Partner"`. |
| `matchExisting` | string | no | `true` | Match Existing Contact. If "Yes", will try to find an existing record using Email and Full Name and update it. One of `true`, `false`. |
| `contactId` | number | no | `0` | Contact ID. Sperse Contact ID. Will be used for looking a client. |
| `fullName` | string | no |  | Full Name. The contact's full name. |
| `namePrefix` | string | no |  | Prefix. The title used to address the contact. |
| `firstName` | string | yes |  | First Name. Required if Last Name and Company Name fields are empty. |
| `middleName` | string | no |  | Middle Name. The contact's middle name. |
| `lastName` | string | yes |  | Last Name. Required if First Name and Company Name fields are empty. |
| `nickName` | string | no |  | Nick Name. The contact's nick name. |
| `nameSuffix` | string | no |  | Suffix. Additional information about the contact e.g PhD. |
| `gender` | string | no |  | Gender. One of `"Male"`, `"Female"`. |
| `dob` | string | no |  | Date of Birth. Valid date format YYYY-MM-DD or MM-DD-YYYY. |
| `bankCode` | string | no |  | Bank Code. The contact's 4-letter personality code. |
| `ssn` | string | no |  | SSN. The contact's social security number. |
| `companyName` | string | no |  | Company Name. Name of the contact's company (This field is mandatory if the First Name and Last Name fields are empty). |
| `jobTitle` | string | no |  | Job Title. The contact's job title. |
| `industry` | string | no |  | Industry. The company's industry. |
| `workEmail1` | string | no |  | Work Email. The contact's work email. |
| `email1` | string | no |  | Personal Email. The contact's personal email. |
| `email2` | string | no |  | Other email. The contact's additional email. |
| `workPhone1` | string | no |  | Work Phone. The contact's work/primary phone number. |
| `homePhone` | string | no |  | Home Phone. The contact's home phone number. |
| `mobilePhone` | string | no |  | Mobile Phone. The contact's mobile phone number. |
| `webSiteUrl` | string | no |  | Website. The contact's company website URL. |
| `linkedInUrl` | string | no |  | LinkedIn. The contact's LinkedIn profile id. |
| `photoUrl` | string | no |  | Photo URL. The contact's person photo URL. |
| `street` | string | no |  | Street. The contact's full street address (can include apartment or unit number). |
| `addressLine2` | string | no |  | Address 2. |
| `city` | string | no |  | City. The contact's city of residence. |
| `stateName` | string | no |  | State Name. The contact's state of residence. |
| `stateId` | string | no |  | State Code. The contact's state code. |
| `zip` | string | no |  | Zip Code. The contact's zip/postal code. |
| `countryName` | string | no |  | Country Name. The contact's country of residence. |
| `countryId` | string | no |  | Country Code. The contact's country code. |
| `experience` | string | no |  | Content. The contact's professional experience. |
| `profileSummary` | string | no |  | Profile Summary. The contact's profile summary. |
| `notes` | string | no |  | notes. Additional notes about the contact. |
| `followUpDate` | string | no |  | Follow Up Date. Valid date format YYYY-MM-DD HH:MM:SS. If date is defined then new Follow Up Task will be created for this contact. |
| `assignedUser` | string | no |  | Assigned User. Preferably, Sperse User Email should be passed as it is unique within Sperse account but User Name can be also passed. |
| `leadDealAmount` | number | no |  | Deal Amount. Estimated deal/opportunity amount. |
| `leadSource` | string | no |  | Source Code. The first known source the contact used to find your website. You can set this automatically and update manually later. |
| `channelId` | string | no |  | Channel Code. The channel/medium the contact used to find your website. |
| `affiliateCode` | string | no |  | Affiliate Code. The affiliate/referer partner through which the contact signed up. |
| `refererURL` | string | no |  | Referer URL. The webpage where the contact clicked a link that sent them to your website. |
| `entryUrl` | string | no |  | Entry URL. The first page of visit through which the contact visited your website. |

### `addOrUpdateContact(extended)`

**Add or Update Contact (Extended).** Imports a contact into the ChargeKeep/Sperse CRM with the full field set (driving license, military/citizenship flags, company details, tracking/UTM data, custom fields, and up to three inline subscriptions), upserting by Contact ID, Contact XREF, or email/name match. Prefer this over the basic Add or Update Contact when you need those extra fields. Can also provision a portal user and send a welcome email when Create User / Send Welcome Email are enabled (that email is a one-time side effect); otherwise repeating with the same identifying input upserts the same contact. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `matchExisting` | string | no | `true` | Match Existing Contact. If "Yes", will try to find an existing record using Email and Full Name and update it. One of `true`, `false`. |
| `overrideLists` | string | no | `false` | Override Lists. If "Yes", will override lists of contact details in update mode instead of merging them - lists, tags, emails, phones, links, addresses, photos. One of `true`, `false`. |
| `ignoreInvalidValues` | string | no | `true` | Ignore Invalid Values. If "Yes", will save the record even if there are some validation errors. One of `true`, `false`. |
| `contactId` | number | no | `0` | Contact ID. Sperse Contact ID. Will be used for looking a client. |
| `contactXref` | string | no |  | Contact XREF. This is string external reference that can be passed during creation and then if sent again it will update the record. |
| `importType` | string | yes | `"Lead"` | Contact Type. One of `"Lead"`, `"Client"`, `"Partner"`. |
| `createUser` | string | no | `true` | Create User. If "Yes" then User will be created. Personal email will be used as User Name. One of `true`, `false`. |
| `sendWelcomeEmail` | string | no | `true` | Send Welcome Email. If "Yes" then Welcome Email will be sent to the newly created user. One of `true`, `false`. |
| `userPassword` | string | no |  | User Password. If password is not passed then it will be automatically generated. |
| `namePrefix` | string | no |  | Prefix. The title used to address the contact. |
| `firstName` | string | yes |  | First Name. Required if Last Name and Company Name fields are empty. |
| `middleName` | string | no |  | Middle Name. The contact's middle name. |
| `lastName` | string | yes |  | Last Name. Required if First Name and Company Name fields are empty. |
| `nickName` | string | no |  | Nick Name. The contact's nick name. |
| `nameSuffix` | string | no |  | Suffix. Additional information about the contact e.g PhD. |
| `gender` | string | no |  | Gender. One of `"Male"`, `"Female"`. |
| `dob` | string | no |  | Date of Birth. Valid date format YYYY-MM-DD or MM-DD-YYYY. |
| `bankCode` | string | no |  | Bank Code. The contact's 4-letter personality code. |
| `ssn` | string | no |  | SSN. The contact's social security number. |
| `drivingLicense` | string | no |  | Driving License. |
| `drivingLicenseState` | string | no |  | Driving License State. |
| `isActiveMilitaryDuty` | string | no |  | Is Active Military Duty. Possible values are: Yes, No. If nothing is chosen that means "Unknown". One of `true`, `false`. |
| `isUSCitizen` | string | no |  | Is US Citizen. Possible values are: Yes, No. If nothing is chosen that means "Unknown". One of `true`, `false`. |
| `preferredToD` | string | no |  | Preferred Time of Day. Preferred Time of Day to contact with Client. One of `"Morning"`, `"Afternoon"`, `"Evening"`, `"Anytime"`. |
| `personAffiliateCode` | string | no |  | Person Affiliate Code. Affiliate Code is used for the current person detection as a source of new leads. Alphanumeric characters, underscore and hyphen are allowed. |
| `email1` | string | no |  | Personal Email. The contact's personal email. |
| `email2` | string | no |  | Alternative Personal email. The contact's alternative personal email. |
| `email3` | string | no |  | Other Personal email. The contact's additional email. |
| `workEmail1` | string | no |  | Work Email. The contact's work email. |
| `workEmail2` | string | no |  | Alternative Work Email. The contact's alternative work email. |
| `workEmail3` | string | no |  | Other Work Email. The contact's other work email. |
| `mobilePhone` | string | no |  | Mobile Phone. The contact's primary phone number. |
| `mobilePhoneExt` | string | no |  | Mobile Phone Ext. The contact's primary phone number extension. |
| `homePhone` | string | no |  | Home Phone. The contact's home phone number. |
| `homePhoneExt` | string | no |  | Home Phone Ext. The contact's home phone number extension. |
| `workPhone1` | string | no |  | Work Phone. The contact's work phone number. |
| `workPhone1Ext` | string | no |  | Work Phone Ext. The contact's work phone number extension. |
| `workPhone2` | string | no |  | Work Phone 2. The contact's alternative work phone number. |
| `workPhone2Ext` | string | no |  | Work Phone 2 Ext. The contact's alternative work phone number extension. |
| `home_street` | string | no |  | Home Street. The contact's full street address (can include apartment or unit number). |
| `home_addressLine2` | string | no |  | Address 2. |
| `home_city` | string | no |  | City. The contact's city of residence. |
| `home_stateName` | string | no |  | State Name. The contact's state of residence. |
| `home_stateId` | string | no |  | State Code. The contact's state code. |
| `home_zip` | string | no |  | ZIP Code. The contact's zip/postal code. |
| `home_countryName` | string | no |  | Country Name. The contact's country of residence. |
| `home_countryId` | string | no |  | Country Code. The contact's country code. |
| `work_street` | string | no |  | Work Street. The contact's work address. |
| `work_addressLine2` | string | no |  | Address 2. |
| `work_city` | string | no |  | City. The contact's work city. |
| `work_stateName` | string | no |  | State Name. The contact's work state. |
| `work_stateId` | string | no |  | State Code. The contact's work state code. |
| `work_zip` | string | no |  | ZIP Code. The contact's work zip code. |
| `work_countryName` | string | no |  | Country Name. The contact's work country. |
| `work_countryId` | string | no |  | Country Code. The contact's work country code. |
| `webSiteUrl` | string | no |  | Website. The contact's company website URL. |
| `linkedInUrl` | string | no |  | LinkedIn. The contact's LinkedIn profile id. |
| `photoUrl` | string | no |  | Photo URL. The contact's person photo URL. |
| `facebookUrl` | string | no |  | Facebook. The contact's Facebook profile id. |
| `instagramUrl` | string | no |  | Instagram. The contact's Instagram profile id. |
| `twitterUrl` | string | no |  | Twitter. The contact's Twitter profile id. |
| `googlePlusUrl` | string | no |  | Google Reviews. The contact's Google reviews. |
| `angelListUrl` | string | no |  | AngelList. The contact's AngelList profile id. |
| `zoomUrl` | string | no |  | Zoom. The contact's Zoom id. |
| `experience` | string | no |  | Content. The contact's professional experience. |
| `profileSummary` | string | no |  | Profile Summary. The contact's profile summary. |
| `notes` | string | no |  | Notes. Additional notes about the contact. |
| `followUpDate` | string | no |  | Follow Up Date. Valid date format YYYY-MM-DD HH:MM:SS. If date is defined then new Follow Up Task will be created for this contact. |
| `assignedUser` | string | no |  | Assigned User. Preferably, Sperse User Email should be passed as it is unique within Sperse account but User Name can be also passed. |
| `leadDealAmount` | number | no |  | Deal Amount. Estimated deal/opportunity amount. |
| `customField1` | string | no |  | Custom Field 1. Additional custom data for the contact record. |
| `customField2` | string | no |  | Custom Field 2. |
| `customField3` | string | no |  | Custom Field 3. |
| `customField4` | string | no |  | Custom Field 4. |
| `customField5` | string | no |  | Custom Field 5. |
| `companyName` | string | no |  | Company Name. Name of the contact's company (This field is mandatory if the First Name and Last Name fields are empty). |
| `organizationType` | string | no |  | Organization Type. One of `"LLP"`, `"LLC"`, `"Inc"`, `"LP"`, `"Partnership"`, `"Sole Proprietership"`, `"Trust"`, `"LLLP"`, `"Other"`. |
| `isEmployed` | string | no |  | Is Employed. Pass yes if the client is employed in this Organization. One of `true`, `false`. |
| `jobTitle` | string | no |  | Job Title. The contact's job title. |
| `employmentStartDate` | string | no |  | Employment Start Date. Valid date format YYYY-MM-DD or MM-DD-YYYY. |
| `employeeCount` | string | no |  | Employee Count. |
| `dateFounded` | string | no |  | Date Founded. Valid date format YYYY-MM-DD or MM-DD-YYYY. |
| `ein` | string | no |  | EIN. |
| `annualRevenue` | number | no |  | Annual Revenue. |
| `industry` | string | no |  | Industry. The company's industry. |
| `companyPhone` | string | no |  | Company Phone. |
| `companyPhoneExt` | string | no |  | Company Phone Extension. |
| `companyFaxNumber` | string | no |  | Company Fax Number. |
| `companyEmail` | string | no |  | Company Email. |
| `companyWebSiteUrl` | string | no |  | Company Website. |
| `companyFacebookUrl` | string | no |  | Company Facebook. |
| `companyLinkedInUrl` | string | no |  | Company LinkedIn. |
| `companyInstagramUrl` | string | no |  | Company Instagram. |
| `companyTwitterUrl` | string | no |  | Company Twitter. |
| `companyGooglePlusUrl` | string | no |  | Company Google Reviews. |
| `companyCrunchbaseUrl` | string | no |  | Company Crunchbase. |
| `companyBBBUrl` | string | no |  | Company BBB URL. |
| `companyZoomUrl` | string | no |  | Company Zoom. |
| `companyCalendlyUrl` | string | no |  | Company Calendly. |
| `companyLogoUrl` | string | no |  | Company Logo URL. |
| `companyAffiliateCode` | string | no |  | Company Affiliate Code. |
| `company_street` | string | no |  | Company Street. |
| `company_addressLine2` | string | no |  | Address 2. |
| `company_city` | string | no |  | City. |
| `company_stateName` | string | no |  | State Name. |
| `company_stateId` | string | no |  | State Code. |
| `company_zip` | string | no |  | Company Zip Code. |
| `company_countryName` | string | no |  | Company Country Name. |
| `company_countryId` | string | no |  | Company Country Code. |
| `leadSource` | string | no |  | Source Code. The first known source the contact used to find your website. You can set this automatically and update manually later. |
| `channelId` | string | no |  | Channel Code. The channel/medium the contact used to find your website. |
| `affiliateCode` | string | no |  | Affiliate Code. The affiliate/referer partner through which the contact signed up. |
| `campaignId` | string | no |  | Campaign ID. |
| `gclId` | string | no |  | Google Click ID. |
| `refererURL` | string | no |  | Referer URL. The webpage where the contact clicked a link that sent them to your website. |
| `applicantId` | string | no |  | Applicant ID. |
| `applicationId` | string | no |  | Application ID. |
| `ipAddress` | string | no |  | IP Address. |
| `userAgent` | string | no |  | User Agent. |
| `siteId` | string | no |  | Site ID. |
| `siteUrl` | string | no |  | Site URL. |
| `dateCreated` | string | no |  | Date Created. Valid date format YYYY-MM-DD HH:MM:SS. |
| `entryUrl` | string | no |  | Entry URL. The first page of visit through which the contact visited your website. |
| `leadStageName` | string | no |  | Lead Stage Name. The first page of visit through which the contact visited your website. |
| `star` | string | no |  | Star. String Value. Supports the following items: Yellow, Blue, Green, Purple, Red. Other values will be skipped. |
| `rating` | string | no |  | Rating. This is the static array from 1 to 10. |
| `utmSource` | string | no |  | UTM Source. |
| `utmMedium` | string | no |  | UTM Medium. |
| `utmCampaign` | string | no |  | UTM Campaign. |
| `utmTerm` | string | no |  | UTM Term. |
| `utmContent` | string | no |  | UTM Content. |
| `utmKeyword` | string | no |  | UTM Keyword. |
| `utmAdGroup` | string | no |  | UTM AdGroup. |
| `utmName` | string | no |  | UTM Name. |
| `requestCustomField1` | string | no |  | Request Custom Field 1. |
| `requestCustomField2` | string | no |  | Request Custom Field 2. |
| `requestCustomField3` | string | no |  | Request Custom Field 3. |
| `requestCustomField4` | string | no |  | Request Custom Field 4. |
| `requestCustomField5` | string | no |  | Request Custom Field 5. |
| `sub1_productCode` | string | no |  | Product Code. Product Code from the Sperse CRM. Either Product Code and Payment Period Type or System Type and Code are required fields within Subscription 1. |
| `sub1_paymentPeriodType` | string | no |  | Product Payment Period Type. The chosen Period Type has to be set for the Product on Sperse side. One of `"Monthly"`, `"Annual"`, `"LifeTime"`. |
| `sub1_systemType` | string | no |  | System Type. Either Product Code and Payment Period Type or System Type and Code are required fields within Subscription 1. |
| `sub1_code` | string | no |  | Code. Code of subscription service from the Sperse CRM. Either Product Code and Payment Period Type or System Type and Code are required fields within Subscription 1. |
| `sub1_name` | string | no |  | Name. |
| `sub1_level` | string | no |  | Level. Code of subscription service level from the Sperse CRM. |
| `sub1_startDate` | string | no |  | Start Date. Valid date format YYYY-MM-DD HH:MM:SS. |
| `sub1_endDate` | string | no |  | End Date. Valid date format YYYY-MM-DD HH:MM:SS. |
| `sub1_amount` | number | no |  | Amount. |
| `sub2_productCode` | string | no |  | Product Code. Product Code from the Sperse CRM. Either Product Code and Payment Period Type or System Type and Code are required fields within Subscription 2. |
| `sub2_paymentPeriodType` | string | no |  | Product Payment Period Type. The chosen Period Type has to be set for the Product on Sperse side. One of `"Monthly"`, `"Annual"`, `"LifeTime"`. |
| `sub2_systemType` | string | no |  | System Type. Either Product Code and Payment Period Type or System Type and Code are required fields within Subscription 2. |
| `sub2_code` | string | no |  | Code. Code of subscription service from the Sperse CRM. Either Product Code and Payment Period Type or System Type and Code are required fields within Subscription 2. |
| `sub2_name` | string | no |  | Name. |
| `sub2_level` | string | no |  | Level. Code of subscription service level from the Sperse CRM. |
| `sub2_startDate` | string | no |  | Start Date. Valid date format YYYY-MM-DD HH:MM:SS. |
| `sub2_endDate` | string | no |  | End Date. Valid date format YYYY-MM-DD HH:MM:SS. |
| `sub2_amount` | number | no |  | Amount. |
| `sub3_productCode` | string | no |  | Product Code. Product Code from the Sperse CRM. Either Product Code and Payment Period Type or System Type and Code are required fields within Subscription 3. |
| `sub3_paymentPeriodType` | string | no |  | Product Payment Period Type. The chosen Period Type has to be set for the Product on Sperse side. One of `"Monthly"`, `"Annual"`, `"LifeTime"`. |
| `sub3_systemType` | string | no |  | System Type. Either Product Code and Payment Period Type or System Type and Code are required fields within Subscription 3. |
| `sub3_code` | string | no |  | Code. Code of subscription service from the Sperse CRM. Either Product Code and Payment Period Type or System Type and Code are required fields within Subscription 3. |
| `sub3_name` | string | no |  | Name. |
| `sub3_level` | string | no |  | Level. Code of subscription service level from the Sperse CRM. |
| `sub3_startDate` | string | no |  | Start Date. Valid date format YYYY-MM-DD HH:MM:SS. |
| `sub3_endDate` | string | no |  | End Date. Valid date format YYYY-MM-DD HH:MM:SS. |
| `sub3_amount` | number | no |  | Amount. |

### `addOrUpdateSubscription`

**Add or Update Subscription.** Creates or updates a product subscription for a contact in the ChargeKeep/Sperse CRM. Identifies the contact by Contact ID or External Contact ID (Contact XREF) and requires a Product Code and Payment Period Type (Monthly, Annual, or LifeTime) that already exist on the product. Use to enroll or change a contact in a subscription plan; repeating the same input updates the same subscription rather than creating a duplicate. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | number | no | `0` | Contact ID. |
| `productId` | number | no |  | Product ID. |
| `contactXref` | string | no |  | External Contact ID. ContactXref have to be specified and correct to look up the correct contact. |
| `productCode` | string | yes |  | Product Code. Product Code (Unique product identifier). ProductCode have to be specified and correct to look up the correct product. |
| `paymentPeriodType` | string | yes | `"Monthly"` | Payment Period Type. The chosen Period Type has to be set for the Product on Sperse side. One of `"Monthly"`, `"Annual"`, `"LifeTime"`. |
| `hasRecurringBilling` | string | no | `false` | Is it Recurring Billing. One of `true`, `false`. |

### `createInvoice`

**Create Invoice.** Imports an invoice into the ChargeKeep/Sperse CRM for a contact (identified by Contact ID or External Contact ID), with billing/shipping addresses, a single line item, and an optional transaction record. Use to record or bill an invoice; requires an Invoice No., status, currency, date, due date, a description, line quantity, and a transaction date. Because the import is keyed on the Invoice No., reusing the same number updates that invoice rather than creating a duplicate; set Historical Data to true when recording a past (non-live) transaction. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | number | no | `0` | Contact ID. Sperse Contact ID. Will be used for looking a client. |
| `contactXref` | string | no |  | External Contact ID. External Contact Reference (ID) . Will be used for looking a client. |
| `status` | string | yes | `"Draft"` | Status. One of `"Draft"`, `"Final"`, `"Paid"`, `"Sent"`. |
| `invoiceNo` | number | yes | `0` | Invoice No.. |
| `date` | ISO date-time string | yes | `"2026-10-26T18:20:01.983Z"` | Date of the Invoice. should be like this: 2024-06-11T11:11:41Z. |
| `dueDate` | ISO date-time string | yes |  | Due Date of the Invoice. should be like this: 2024-06-11T11:11:41Z. |
| `currencyId` | string | yes | `"USD"` | Currency Id. One of `"USD"`, `"JPY"`, `"IND"`, `"EUR"`, `"GBP"`, `"AUD"`, `"CAD"`, `"CHF"`, `"CNY"`, `"SEK"`, `"NZD"`. |
| `grandTotal` | number | no | `0` | Grand Total. |
| `discountTotal` | number | no | `0` | Discount Total. |
| `shippingTotal` | number | no | `0` | Shipping Total. |
| `taxTotal` | number | no | `0` | Tax Total. |
| `bCompany` | string | no |  | Billing Company. |
| `bFirstName` | string | no |  | First Name. |
| `bLastName` | string | no |  | Last Name. |
| `bPhone` | string | no |  | Phone. |
| `bEmail` | string | no |  | Email. |
| `bCountryId` | string | no |  | Country Id. |
| `bStateId` | string | no |  | State Id. |
| `bStateName` | string | no |  | State Name. |
| `bCity` | string | no |  | City. |
| `bZip` | string | no |  | Zip. |
| `bAddress1` | string | no |  | Billing Address 1. |
| `bAddress2` | string | no |  | Billing Address 2. |
| `sCompany` | string | no |  | Shipping Company. |
| `sFirstName` | string | no |  | First Name. |
| `sLastName` | string | no |  | Last Name. |
| `sPhone` | string | no |  | Phone. |
| `sEmail` | string | no |  | Email. |
| `sCountryId` | string | no |  | Country Id. |
| `sStateId` | string | no |  | State Id. |
| `sStateName` | string | no |  | State Name. |
| `sCity` | string | no |  | City. |
| `sZip` | string | no |  | Zip. |
| `sAddress1` | string | no |  | Shipping Address 1. |
| `sAddress2` | string | no |  | Shipping Address 2. |
| `note` | string | no |  | Invoice Note. |
| `invoiceDescription` | string | yes |  | Invoice Description. |
| `quantity` | number | yes | `0` | Quantity. |
| `rate` | number | no | `0` | Rate. |
| `itemTotal` | number | no | `0` | Total Item Price. |
| `commissionableAmount` | number | no | `0` | Commissionable Amount. |
| `unitId` | string | no | `"Unit"` | Unit Id. One of `"Unit"`, `"Day"`, `"Month"`, `"Year"`, `"Hour"`, `"Kilogram"`, `"Zone"`, `"Package"`, `"Pound"`, `"Piece"`, `"Feet"`, `"Custom"`. |
| `productCode` | string | no |  | Product Code. Product Code. We will look up the product. |
| `itemDescription` | string | no |  | Description. |
| `sortOrder` | number | no | `0` | Sort Order. |
| `transactionDate` | ISO date-time string | yes | `"2026-10-26T18:20:01.986Z"` | Transaction Date. should be like this: 2024-06-11T11:11:41Z. |
| `transactionDescription` | string | no |  | Transaction Description. |
| `amount` | number | no | `0` | Amount. |
| `gatewayName` | string | no |  | Gateway Name. |
| `gatewayTransactionId` | string | no |  | Gateway Transaction Id. |
| `historicalData` | string | yes | `false` | Historical Data. Pass true if this is not actual transaction. Should be False by default. One of `true`, `false`. |

### `createProduct`

**Create Product.** Imports a product (General, Event, Subscription, or Digital) into the ChargeKeep/Sperse CRM along with a subscription/pricing option. Use to add a sellable product or plan; requires a product Type, Name, and SKU (the unique product Code), with price/unit/payment-cycle fields needed depending on the type. Because the import is keyed on the SKU, reusing the same code updates that product rather than creating a duplicate. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `productType` | string | yes | `"General"` | Product Type. One of `"General"`, `"Event"`, `"Subscription"`, `"Digital"`. |
| `name` | string | yes |  | Product Name. |
| `code` | string | yes |  | SKU. Sku is the product code. |
| `description` | string | no |  | Description. |
| `descriptionHTML` | string | no |  | Description HTML. Javascript and media tags are not allowed. |
| `logoURL` | string | no |  | Logo Url. |
| `groupName` | string | no |  | Group Name. |
| `price` | number | no | `0` | Price. Required for General , Digital and Event Product Type. |
| `currencyId` | string | no | `"USD"` | Currency Id. One of `"USD"`, `"JPY"`, `"IND"`, `"EUR"`, `"GBP"`, `"AUD"`, `"CAD"`, `"CHF"`, `"CNY"`, `"SEK"`, `"NZD"`. |
| `unit` | string | no | `"Day"` | Unit. Required for General and Digital Product Type. One of `"Day"`, `"Feet"`, `"Hour"`, `"Kilogram"`, `"Pound"`, `"Month"`, `"Package"`, `"Piece"`, `"Unit"`, `"Year"`, `"Zone"`, `"Custom"`. |
| `frequency` | string | no | `"Monthly"` | Payment Cycle. Required for General and Digital Product Type. One of `"Monthly"`, `"Annual"`, `"LifeTime"`, `"OneTime"`, `"Custom"`. |
| `fee` | number | no | `0` | Subscription fee. |
| `cycles` | number | no | `0` | No of cycles. Required for all except LifeTime or OneTime plan. |
| `signupFee` | number | no | `0` | Signup fee. Required for all except LifeTime or OneTime plan. |
| `customPeriodType` | string | no | `"Days"` | Custom Period Type. Required for Custom or OneTime Plan. One of `"Days"`, `"Weeks"`, `"Months"`, `"Years"`. |
| `customPeriodCount` | number | no | `0` | Custom No of Period. Required for Custom or OneTime Plan. |
| `trialDayCount` | number | no | `0` | Custom No of Period. Required for OneTime plan. |
| `gracePeriodDayCount` | number | no | `0` | Grace Period Count. |

### `getContactDetails`

**Get Contact Details.** Looks up and returns a single contact record from the ChargeKeep/Sperse CRM. Identify the contact by any of Contact ID, Contact Xref, Affiliate Code, User ID, or User Email (all optional, so pass whichever identifier you have). Use to fetch contact details before acting on them; read-only and safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `contactId` | number | no |  | Contact Id. |
| `xref` | string | no |  | Contact Xref. |
| `affiliateCode` | string | no |  | Affiliate Code. |
| `userId` | number | no |  | User Id. Id of the logged in user (not contact id) |
| `userEmail` | string | no |  | User Email. Email of the logged in user. |

# Google My Business

Publish posts and reply to reviews on Google Business Profile.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-google-my-business'
  version: '0.5.2'
```

Categories: MARKETING. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `create-post`

**Create Post.** Publishes a local post to a Google Business Profile location, so it appears on the business listing in Search and Maps. Choose the Post Type: Standard is a plain update, Event and Offer both require a title and a start and end date, and Alert requires an alert type. A call to action button is optional, and needs a URL for every action except Call. Not idempotent: each call publishes a separate post. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account` | string | yes |  | Account. The Business Profile account that manages the location. A value the product loads from the provider, such as an id; write the value itself. |
| `location` | string | yes |  | Location. The business listing on Google Search and Maps. A value the product loads from the provider, such as an id; write the value itself. |
| `topicType` | string | yes | `"STANDARD"` | Post Type. One of `"STANDARD"`, `"EVENT"`, `"OFFER"`, `"ALERT"`. |
| `summary` | string | yes |  | Post Text. |
| `mediaSourceUrl` | string | no |  | Photo URL. A public image link. Google must open it without a login. |
| `languageCode` | string | yes | `"en"` | Language Code. Language of the post text, like en or en-GB. |
| `alertType` | string | no |  | Alert Type. Required for Alert posts. One of `"COVID_19"`. |
| `eventTitle` | string | no |  | Title. Required for Event and Offer posts, with both dates. |
| `eventStartDate` | string | no |  | Start Date. |
| `eventStartTime` | string | no |  | Start Time. 24-hour clock, location time zone. |
| `eventEndDate` | string | no |  | End Date. |
| `eventEndTime` | string | no |  | End Time. 24-hour clock, location time zone. |
| `offerCouponCode` | string | no |  | Coupon Code. |
| `offerRedeemOnlineUrl` | string | no |  | Redeem Online URL. |
| `offerTermsConditions` | string | no |  | Terms and Conditions. |
| `callToActionType` | string | no |  | Button Type. One of `"BOOK"`, `"ORDER"`, `"SHOP"`, `"LEARN_MORE"`, `"SIGN_UP"`, `"CALL"`. |
| `callToActionUrl` | string | no |  | Button Link. Required for every button except Call Now, which dials the location. |
| `scheduledTime` | ISO date-time string | no |  | Publish At. Leave empty to publish now. |

Output fields:

- `name`: Post Name
- `summary`: Summary
- `topicType`: Post Type
- `alertType`: Alert Type
- `state`: State
- `languageCode`: Language Code
- `scheduledTime`: Publish At (datetime)
- `createTime`: Created At (datetime)
- `updateTime`: Updated At (datetime)
- `callToAction`: Call To Action
- `callToAction.actionType`: Action Type
- `callToAction.url`: URL (url)
- `event`: Event
- `event.title`: Title
- `event.schedule`: Schedule
- `event.schedule.startDate`: Start Date
- `event.schedule.startDate.year`: Year (number)
- `event.schedule.startDate.month`: Month (number)
- `event.schedule.startDate.day`: Day (number)
- `event.schedule.startTime`: Start Time
- `event.schedule.startTime.hours`: Hours (number)
- `event.schedule.startTime.minutes`: Minutes (number)
- `event.schedule.endDate`: End Date
- `event.schedule.endDate.year`: Year (number)
- `event.schedule.endDate.month`: Month (number)
- `event.schedule.endDate.day`: Day (number)
- `event.schedule.endTime`: End Time
- `event.schedule.endTime.hours`: Hours (number)
- `event.schedule.endTime.minutes`: Minutes (number)
- `media`: Media
- `media[].name`: Media Name
- `media[].mediaFormat`: Media Format
- `media[].googleUrl`: Google URL (url)

### `list-posts`

**List Posts.** Returns the local posts published to a Google Business Profile location, newest first, following pagination up to Maximum Results. Use to read existing posts or to find a post name for Get, Update or Delete Post. Read-only and safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account` | string | yes |  | Account. The Business Profile account that manages the location. A value the product loads from the provider, such as an id; write the value itself. |
| `location` | string | yes |  | Location. The business listing on Google Search and Maps. A value the product loads from the provider, such as an id; write the value itself. |
| `maxResults` | number | no | `100` | Maximum Results. Stop after this many posts. Default 100. |

Output fields:

- `localPosts`: Posts
- `localPosts[].name`: Post Name
- `localPosts[].summary`: Summary
- `localPosts[].topicType`: Post Type
- `localPosts[].alertType`: Alert Type
- `localPosts[].state`: State
- `localPosts[].languageCode`: Language Code
- `localPosts[].scheduledTime`: Publish At (datetime)
- `localPosts[].createTime`: Created At (datetime)
- `localPosts[].updateTime`: Updated At (datetime)
- `localPosts[].callToAction`: Call To Action
- `localPosts[].callToAction.actionType`: Action Type
- `localPosts[].callToAction.url`: URL (url)
- `localPosts[].event`: Event
- `localPosts[].event.title`: Title
- `localPosts[].event.schedule`: Schedule
- `localPosts[].event.schedule.startDate`: Start Date
- `localPosts[].event.schedule.startDate.year`: Year (number)
- `localPosts[].event.schedule.startDate.month`: Month (number)
- `localPosts[].event.schedule.startDate.day`: Day (number)
- `localPosts[].event.schedule.startTime`: Start Time
- `localPosts[].event.schedule.startTime.hours`: Hours (number)
- `localPosts[].event.schedule.startTime.minutes`: Minutes (number)
- `localPosts[].event.schedule.endDate`: End Date
- `localPosts[].event.schedule.endDate.year`: Year (number)
- `localPosts[].event.schedule.endDate.month`: Month (number)
- `localPosts[].event.schedule.endDate.day`: Day (number)
- `localPosts[].event.schedule.endTime`: End Time
- `localPosts[].event.schedule.endTime.hours`: Hours (number)
- `localPosts[].event.schedule.endTime.minutes`: Minutes (number)
- `localPosts[].media`: Media
- `localPosts[].media[].name`: Media Name
- `localPosts[].media[].mediaFormat`: Media Format
- `localPosts[].media[].googleUrl`: Google URL (url)
- `nextPageToken`: Next Page Token

### `get-post`

**Get Post.** Fetches one local post from a Google Business Profile location by its full resource name, in the form accounts/{account}/locations/{location}/localPosts/{post}. Use List Posts or Create Post to obtain that name. Read-only and safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `postName` | string | yes |  | Post ID. Paste the whole name field from Create Post or List Posts. |

Output fields:

- `name`: Post Name
- `summary`: Summary
- `topicType`: Post Type
- `alertType`: Alert Type
- `state`: State
- `languageCode`: Language Code
- `scheduledTime`: Publish At (datetime)
- `createTime`: Created At (datetime)
- `updateTime`: Updated At (datetime)
- `callToAction`: Call To Action
- `callToAction.actionType`: Action Type
- `callToAction.url`: URL (url)
- `event`: Event
- `event.title`: Title
- `event.schedule`: Schedule
- `event.schedule.startDate`: Start Date
- `event.schedule.startDate.year`: Year (number)
- `event.schedule.startDate.month`: Month (number)
- `event.schedule.startDate.day`: Day (number)
- `event.schedule.startTime`: Start Time
- `event.schedule.startTime.hours`: Hours (number)
- `event.schedule.startTime.minutes`: Minutes (number)
- `event.schedule.endDate`: End Date
- `event.schedule.endDate.year`: Year (number)
- `event.schedule.endDate.month`: Month (number)
- `event.schedule.endDate.day`: Day (number)
- `event.schedule.endTime`: End Time
- `event.schedule.endTime.hours`: Hours (number)
- `event.schedule.endTime.minutes`: Minutes (number)
- `media`: Media
- `media[].name`: Media Name
- `media[].mediaFormat`: Media Format
- `media[].googleUrl`: Google URL (url)

### `update-post`

**Update Post.** Updates an existing local post on a Google Business Profile location, identified by its full resource name. Only the fields you set are sent, and Google replaces each of those fields wholesale. Leave a field empty to keep it as it is. Idempotent: sending the same values again leaves the post in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `postName` | string | yes |  | Post ID. Paste the whole name field from Create Post or List Posts. |
| `summary` | string | no |  | Post Text. Leave empty to keep the current text. |
| `mediaSourceUrl` | string | no |  | Photo URL. Replaces every photo on the post. Must open without a login. |
| `languageCode` | string | no |  | Language Code. Language of the post text, like en or en-GB. |
| `eventTitle` | string | no |  | Title. Replaces the whole event, so fill in every field you want kept. |
| `eventStartDate` | string | no |  | Start Date. |
| `eventStartTime` | string | no |  | Start Time. 24-hour clock, location time zone. |
| `eventEndDate` | string | no |  | End Date. |
| `eventEndTime` | string | no |  | End Time. 24-hour clock, location time zone. |
| `offerCouponCode` | string | no |  | Coupon Code. Replaces the whole offer, so fill in every field you want kept. |
| `offerRedeemOnlineUrl` | string | no |  | Redeem Online URL. |
| `offerTermsConditions` | string | no |  | Terms and Conditions. |
| `callToActionType` | string | no |  | Button Type. Choosing a type replaces the current button. One of `"BOOK"`, `"ORDER"`, `"SHOP"`, `"LEARN_MORE"`, `"SIGN_UP"`, `"CALL"`. |
| `callToActionUrl` | string | no |  | Button Link. Required for every button except Call Now, which dials the location. |
| `scheduledTime` | ISO date-time string | no |  | Publish At. Reschedule the post to a future time. |

Output fields:

- `name`: Post Name
- `summary`: Summary
- `topicType`: Post Type
- `alertType`: Alert Type
- `state`: State
- `languageCode`: Language Code
- `scheduledTime`: Publish At (datetime)
- `createTime`: Created At (datetime)
- `updateTime`: Updated At (datetime)
- `callToAction`: Call To Action
- `callToAction.actionType`: Action Type
- `callToAction.url`: URL (url)
- `event`: Event
- `event.title`: Title
- `event.schedule`: Schedule
- `event.schedule.startDate`: Start Date
- `event.schedule.startDate.year`: Year (number)
- `event.schedule.startDate.month`: Month (number)
- `event.schedule.startDate.day`: Day (number)
- `event.schedule.startTime`: Start Time
- `event.schedule.startTime.hours`: Hours (number)
- `event.schedule.startTime.minutes`: Minutes (number)
- `event.schedule.endDate`: End Date
- `event.schedule.endDate.year`: Year (number)
- `event.schedule.endDate.month`: Month (number)
- `event.schedule.endDate.day`: Day (number)
- `event.schedule.endTime`: End Time
- `event.schedule.endTime.hours`: Hours (number)
- `event.schedule.endTime.minutes`: Minutes (number)
- `media`: Media
- `media[].name`: Media Name
- `media[].mediaFormat`: Media Format
- `media[].googleUrl`: Google URL (url)

### `delete-post`

**Delete Post.** Permanently deletes one local post from a Google Business Profile location, identified by its full resource name. The post stops appearing on the listing and cannot be restored. Idempotent in effect: deleting an already deleted post leaves nothing further to remove, though Google answers with an error. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `postName` | string | yes |  | Post ID. Paste the whole name field from Create Post or List Posts. |

### `create-reply`

**Create or Update Reply.** Posts the business owner's reply to a specific Google Business Profile review, or overwrites the existing reply if one is already present. Use to respond to customer reviews; safe to repeat since it upserts on the review name. Requires the full review resource name in the form accounts/{account}/locations/{location}/reviews/{review}. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `reviewName` | string | yes |  | Review ID. Paste the whole name field from the New Review trigger. |
| `comment` | string | yes |  | Comment. Shown publicly under the review. |

### `list-accounts`

**List Accounts.** Lists the Google Business Profile accounts the connected Google user can manage. Each account name has the form accounts/{id}; pass it (or the bare id) as Account ID to List Locations and the review or media actions. Call this first when no account id is known. Read-only and safe to repeat. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `max_results` | number | no | `100` | Maximum Results. Stop after this many items. Larger values are fetched over several requests. |

Output fields:

- `accounts`: Accounts
- `accounts[].name`: Account Name
- `accounts[].accountName`: Display Name
- `accounts[].type`: Account Type
- `accounts[].role`: Role
- `accounts[].verificationState`: Verification State
- `accounts[].vettedState`: Vetted State
- `count`: Count (number)
- `next_page_token`: Next Page Token

### `list-locations`

**List Locations.** Lists the business locations under a Google Business Profile account, with title, address, phone, website, hours, categories, description and placeId. Each location name has the form locations/{id}; pass it (or the bare id) as Location ID to the location, review, media and post actions. Read-only and safe to repeat. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. The account id, e.g. 123 or accounts/123. Get it from the name field returned by List Accounts (list-accounts). |
| `max_results` | number | no | `100` | Maximum Results. Stop after this many items. Larger values are fetched over several requests. |

Output fields:

- `locations`: Locations
- `locations[].name`: Location Name
- `locations[].title`: Title
- `locations[].storeCode`: Store Code
- `locations[].languageCode`: Language Code
- `locations[].websiteUri`: Website (url)
- `locations[].labels`: Labels
- `locations[].regularHours`: Regular Hours
- `locations[].regularHours.periods`: Periods
- `locations[].regularHours.periods[].openDay`: Open Day
- `locations[].regularHours.periods[].openTime`: Open Time
- `locations[].regularHours.periods[].openTime.hours`: Hours (number)
- `locations[].regularHours.periods[].closeDay`: Close Day
- `locations[].regularHours.periods[].closeTime`: Close Time
- `locations[].regularHours.periods[].closeTime.hours`: Hours (number)
- `locations[].phoneNumbers`: Phone Numbers
- `locations[].phoneNumbers.primaryPhone`: Primary Phone
- `locations[].categories`: Categories
- `locations[].categories.primaryCategory`: Primary Category
- `locations[].categories.primaryCategory.name`: Category Id
- `locations[].categories.primaryCategory.displayName`: Category
- `locations[].categories.primaryCategory.serviceTypes`: Service Types
- `locations[].categories.primaryCategory.serviceTypes[].serviceTypeId`: Service Type Id
- `locations[].categories.primaryCategory.serviceTypes[].displayName`: Service Type
- `locations[].storefrontAddress`: Address
- `locations[].storefrontAddress.regionCode`: Region Code
- `locations[].storefrontAddress.languageCode`: Language Code
- `locations[].storefrontAddress.addressLines`: Address Lines
- `locations[].storefrontAddress.postalCode`: Postal Code
- `locations[].storefrontAddress.administrativeArea`: Administrative Area
- `locations[].storefrontAddress.locality`: Locality
- `locations[].latlng`: Coordinates
- `locations[].latlng.latitude`: Latitude (number)
- `locations[].latlng.longitude`: Longitude (number)
- `locations[].openInfo`: Open Info
- `locations[].openInfo.status`: Status
- `locations[].openInfo.canReopen`: Can Reopen (boolean)
- `locations[].metadata`: Metadata
- `locations[].metadata.placeId`: Place Id
- `locations[].metadata.mapsUri`: Maps URL (url)
- `locations[].metadata.newReviewUri`: New Review URL (url)
- `locations[].metadata.hasVoiceOfMerchant`: Has Voice Of Merchant (boolean)
- `locations[].metadata.canDelete`: Can Delete (boolean)
- `locations[].metadata.canModifyServiceList`: Can Modify Service List (boolean)
- `locations[].profile`: Profile
- `locations[].profile.description`: Description
- `count`: Count (number)
- `next_page_token`: Next Page Token

### `get-location`

**Get Location.** Returns one Google Business Profile location: title, store code, address, phone numbers, website, regular and special hours, categories, labels, description and metadata (placeId, Maps URL). Use to read the current listing before editing it. Read-only and safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location_id` | string | yes |  | Location ID. The location id, e.g. 456 or locations/456. Get it from the name field returned by List Locations (list-locations). |

Output fields:

- `name`: Location Name
- `title`: Title
- `storeCode`: Store Code
- `languageCode`: Language Code
- `websiteUri`: Website (url)
- `labels`: Labels
- `regularHours`: Regular Hours
- `regularHours.periods`: Periods
- `regularHours.periods[].openDay`: Open Day
- `regularHours.periods[].openTime`: Open Time
- `regularHours.periods[].openTime.hours`: Hours (number)
- `regularHours.periods[].closeDay`: Close Day
- `regularHours.periods[].closeTime`: Close Time
- `regularHours.periods[].closeTime.hours`: Hours (number)
- `phoneNumbers`: Phone Numbers
- `phoneNumbers.primaryPhone`: Primary Phone
- `categories`: Categories
- `categories.primaryCategory`: Primary Category
- `categories.primaryCategory.name`: Category Id
- `categories.primaryCategory.displayName`: Category
- `categories.primaryCategory.serviceTypes`: Service Types
- `categories.primaryCategory.serviceTypes[].serviceTypeId`: Service Type Id
- `categories.primaryCategory.serviceTypes[].displayName`: Service Type
- `storefrontAddress`: Address
- `storefrontAddress.regionCode`: Region Code
- `storefrontAddress.languageCode`: Language Code
- `storefrontAddress.addressLines`: Address Lines
- `storefrontAddress.postalCode`: Postal Code
- `storefrontAddress.administrativeArea`: Administrative Area
- `storefrontAddress.locality`: Locality
- `latlng`: Coordinates
- `latlng.latitude`: Latitude (number)
- `latlng.longitude`: Longitude (number)
- `openInfo`: Open Info
- `openInfo.status`: Status
- `openInfo.canReopen`: Can Reopen (boolean)
- `metadata`: Metadata
- `metadata.placeId`: Place Id
- `metadata.mapsUri`: Maps URL (url)
- `metadata.newReviewUri`: New Review URL (url)
- `metadata.hasVoiceOfMerchant`: Has Voice Of Merchant (boolean)
- `metadata.canDelete`: Can Delete (boolean)
- `metadata.canModifyServiceList`: Can Modify Service List (boolean)
- `profile`: Profile
- `profile.description`: Description

### `update-location`

**Update Location.** Updates selected fields of a Google Business Profile location; only the fields you supply are changed and everything else is left untouched. Website is public and appears on Google Maps and Search, so change it only when the user explicitly asks. Labels replaces the whole label set, so include every label you want to keep; an empty list is ignored and cannot clear them. Store Code is internal. Empty text fields are ignored. Description, phone, hours, address and categories cannot be edited here. Safe to repeat with the same values. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location_id` | string | yes |  | Location ID. The location id, e.g. 456 or locations/456. Get it from the name field returned by List Locations (list-locations). |
| `website_uri` | string | no |  | Website. The public website URL of the business. |
| `labels` | array | no |  | Labels. Internal labels for the location. Replaces the existing labels. Leave empty to keep the current labels; this action cannot clear them. |
| `store_code` | string | no |  | Store Code. Your internal identifier for the location. |

Output fields:

- `name`: Location Name
- `title`: Title
- `storeCode`: Store Code
- `languageCode`: Language Code
- `websiteUri`: Website (url)
- `labels`: Labels
- `regularHours`: Regular Hours
- `regularHours.periods`: Periods
- `regularHours.periods[].openDay`: Open Day
- `regularHours.periods[].openTime`: Open Time
- `regularHours.periods[].openTime.hours`: Hours (number)
- `regularHours.periods[].closeDay`: Close Day
- `regularHours.periods[].closeTime`: Close Time
- `regularHours.periods[].closeTime.hours`: Hours (number)
- `phoneNumbers`: Phone Numbers
- `phoneNumbers.primaryPhone`: Primary Phone
- `categories`: Categories
- `categories.primaryCategory`: Primary Category
- `categories.primaryCategory.name`: Category Id
- `categories.primaryCategory.displayName`: Category
- `categories.primaryCategory.serviceTypes`: Service Types
- `categories.primaryCategory.serviceTypes[].serviceTypeId`: Service Type Id
- `categories.primaryCategory.serviceTypes[].displayName`: Service Type
- `storefrontAddress`: Address
- `storefrontAddress.regionCode`: Region Code
- `storefrontAddress.languageCode`: Language Code
- `storefrontAddress.addressLines`: Address Lines
- `storefrontAddress.postalCode`: Postal Code
- `storefrontAddress.administrativeArea`: Administrative Area
- `storefrontAddress.locality`: Locality
- `latlng`: Coordinates
- `latlng.latitude`: Latitude (number)
- `latlng.longitude`: Longitude (number)
- `openInfo`: Open Info
- `openInfo.status`: Status
- `openInfo.canReopen`: Can Reopen (boolean)
- `metadata`: Metadata
- `metadata.placeId`: Place Id
- `metadata.mapsUri`: Maps URL (url)
- `metadata.newReviewUri`: New Review URL (url)
- `metadata.hasVoiceOfMerchant`: Has Voice Of Merchant (boolean)
- `metadata.canDelete`: Can Delete (boolean)
- `metadata.canModifyServiceList`: Can Modify Service List (boolean)
- `profile`: Profile
- `profile.description`: Description

### `list-reviews`

**List Reviews.** Lists customer reviews of a Google Business Profile location with reviewer, star rating (ONE to FIVE), comment, timestamps and any existing owner reply, plus the location average rating and total review count. Each review has a reviewId to pass to Get Review, Reply to Review or Delete Review Reply. Read-only and safe to repeat. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. The account id, e.g. 123 or accounts/123. Get it from the name field returned by List Accounts (list-accounts). |
| `location_id` | string | yes |  | Location ID. The location id, e.g. 456 or locations/456. Get it from the name field returned by List Locations (list-locations). |
| `order_by` | string | no |  | Order By. Sort order. Google defaults to newest first when unset. One of `"updateTime desc"`, `"rating"`, `"rating desc"`. |
| `max_results` | number | no | `100` | Maximum Results. Stop after this many items. Larger values are fetched over several requests. |

Output fields:

- `reviews`: Reviews
- `reviews[].name`: Review Name
- `reviews[].reviewId`: Review Id
- `reviews[].reviewReplyUrl`: Review Reply URL (url)
- `reviews[].reviewer`: Reviewer
- `reviews[].reviewer.displayName`: Display Name
- `reviews[].reviewer.profilePhotoUrl`: Profile Photo (url)
- `reviews[].starRating`: Star Rating
- `reviews[].comment`: Comment
- `reviews[].createTime`: Created At (datetime)
- `reviews[].updateTime`: Updated At (datetime)
- `reviews[].reviewReply`: Reply
- `reviews[].reviewReply.comment`: Reply Comment
- `reviews[].reviewReply.updateTime`: Reply Updated At (datetime)
- `count`: Count (number)
- `average_rating`: Average Rating (number)
- `total_review_count`: Total Review Count (number)
- `next_page_token`: Next Page Token

### `get-location-verification-state`

**Get Location Verification State.** Returns the Voice of Merchant state of a Google Business Profile location: whether the owner has control (hasVoiceOfMerchant), whether a verification is pending, and what to do otherwise. Use to explain why edits, posts or metrics fail on an unverified location. Read-only and safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `location_id` | string | yes |  | Location ID. The location id, e.g. 456 or locations/456. Get it from the name field returned by List Locations (list-locations). |

Output fields:

- `hasVoiceOfMerchant`: Has Voice Of Merchant (boolean)
- `hasBusinessAuthority`: Has Business Authority (boolean)
- `verify`: Verify
- `verify.hasPendingVerification`: Has Pending Verification (boolean)
- `complyWithGuidelines`: Comply With Guidelines
- `complyWithGuidelines.recommendationReason`: Recommendation Reason

### `list-media`

**List Media.** Lists the photos and videos attached to a Google Business Profile location with format, Google URL, category and view count, plus the total media count. The last segment of each media name is the Media ID for Get Media. Read-only and safe to repeat. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. The account id, e.g. 123 or accounts/123. Get it from the name field returned by List Accounts (list-accounts). |
| `location_id` | string | yes |  | Location ID. The location id, e.g. 456 or locations/456. Get it from the name field returned by List Locations (list-locations). |
| `max_results` | number | no | `100` | Maximum Results. Stop after this many items. Larger values are fetched over several requests. |

Output fields:

- `media_items`: Media Items
- `media_items[].name`: Media Name
- `media_items[].mediaFormat`: Media Format
- `media_items[].googleUrl`: Google URL (url)
- `media_items[].thumbnailUrl`: Thumbnail URL (url)
- `media_items[].dimensions`: Dimensions
- `media_items[].dimensions.widthPixels`: Width Pixels (number)
- `media_items[].dimensions.heightPixels`: Height Pixels (number)
- `media_items[].createTime`: Created At (datetime)
- `media_items[].description`: Description
- `media_items[].locationAssociation`: Location Association
- `media_items[].locationAssociation.category`: Category
- `media_items[].insights`: Insights
- `media_items[].insights.viewCount`: View Count
- `count`: Count (number)
- `total_media_item_count`: Total Media Item Count (number)
- `next_page_token`: Next Page Token

### `get-media`

**Get Media.** Returns one photo or video of a Google Business Profile location with its format, Google URL, thumbnail, category and view count. Read-only and safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. The account id, e.g. 123 or accounts/123. Get it from the name field returned by List Accounts (list-accounts). |
| `location_id` | string | yes |  | Location ID. The location id, e.g. 456 or locations/456. Get it from the name field returned by List Locations (list-locations). |
| `media_id` | string | yes |  | Media ID. The media key: the last segment of the name field returned by List Media (list-media). |

Output fields:

- `name`: Media Name
- `mediaFormat`: Media Format
- `googleUrl`: Google URL (url)
- `thumbnailUrl`: Thumbnail URL (url)
- `dimensions`: Dimensions
- `dimensions.widthPixels`: Width Pixels (number)
- `dimensions.heightPixels`: Height Pixels (number)
- `createTime`: Created At (datetime)
- `description`: Description
- `locationAssociation`: Location Association
- `locationAssociation.category`: Category
- `insights`: Insights
- `insights.viewCount`: View Count

### `get-review`

**Get Review.** Returns one customer review of a Google Business Profile location with reviewer, star rating, comment, timestamps and the current owner reply if any. Use to check a review before or after replying. Read-only and safe to repeat. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. The account id, e.g. 123 or accounts/123. Get it from the name field returned by List Accounts (list-accounts). |
| `location_id` | string | yes |  | Location ID. The location id, e.g. 456 or locations/456. Get it from the name field returned by List Locations (list-locations). |
| `review_id` | string | yes |  | Review ID. The reviewId field returned by List Reviews (list-reviews), or the full review name. |

Output fields:

- `name`: Review Name
- `reviewId`: Review Id
- `reviewReplyUrl`: Review Reply URL (url)
- `reviewer`: Reviewer
- `reviewer.displayName`: Display Name
- `reviewer.profilePhotoUrl`: Profile Photo (url)
- `starRating`: Star Rating
- `comment`: Comment
- `createTime`: Created At (datetime)
- `updateTime`: Updated At (datetime)
- `reviewReply`: Reply
- `reviewReply.comment`: Reply Comment
- `reviewReply.updateTime`: Reply Updated At (datetime)

### `reply-to-review`

**Reply to Review.** Posts the business owner reply to a customer review of a Google Business Profile location, replacing any existing reply. The reply is public on Google Maps and Search. Safe to repeat with the same comment since it upserts. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. The account id, e.g. 123 or accounts/123. Get it from the name field returned by List Accounts (list-accounts). |
| `location_id` | string | yes |  | Location ID. The location id, e.g. 456 or locations/456. Get it from the name field returned by List Locations (list-locations). |
| `review_id` | string | yes |  | Review ID. The reviewId field returned by List Reviews (list-reviews), or the full review name. |
| `comment` | string | yes |  | Comment. The reply text. |

Output fields:

- `comment`: Reply Comment
- `updateTime`: Updated At (datetime)

### `delete-review-reply`

**Delete Review Reply.** Removes the business owner reply from a customer review of a Google Business Profile location. The review itself is not deleted. Use only when the user asks to take a reply down. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `account_id` | string | yes |  | Account ID. The account id, e.g. 123 or accounts/123. Get it from the name field returned by List Accounts (list-accounts). |
| `location_id` | string | yes |  | Location ID. The location id, e.g. 456 or locations/456. Get it from the name field returned by List Locations (list-locations). |
| `review_id` | string | yes |  | Review ID. The reviewId field returned by List Reviews (list-reviews), or the full review name. |

Output fields:

- `success`: Success (boolean)

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

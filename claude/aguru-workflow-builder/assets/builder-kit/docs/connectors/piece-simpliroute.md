# SimpliRoute

Connect with SimpliRoute, the last-mile delivery optimization platform. Manage clients, vehicles, visits, routes, and optimize your delivery operations.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-simpliroute'
  version: '0.2.0'
```

Categories: PRODUCTIVITY, BUSINESS_INTELLIGENCE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Your SimpliRoute API token. You can find this in your SimpliRoute account settings under API section.

## Actions

### `get_me`

**Get Account Details.** Return the account/profile of the user owning the API token. Read-only and idempotent; takes no input. Use to confirm credentials or discover the current account context before other operations. Needs authentication.

Kind: safe to repeat.

No inputs.

### `get_clients`

**Get Clients.** Look up account clients, filtered to the given unique client key. Use to find a client and its stored details (id, address, coordinates, contacts) before creating visits or routes. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `key` | string | yes |  | Client Key. Unique client key to filter results. |

### `create_clients`

**Create Clients.** Add one or many client (delivery destination) records, each with title, address, coordinates, time windows and contact details, in a single call. Use when registering new clients to later schedule visits against; not idempotent, so each call inserts new records even if a similar client exists. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `clients` | array | yes |  | Clients. Array of client objects to create. Each item: { `key`?, `title`, `address`?, `latitude`?, `longitude`?, `load`?, `load_2`?, `load_3`?, `window_start`?, `window_end`?, `window_start_2`?, `window_end_2`?, `duration`?, `contact_name`?, `contact_phone`?, `contact_email`?, `notes`?, `priority_level`? }. |

### `bulk_delete_clients`

**Bulk Delete Clients.** Permanently remove several clients at once by passing a list of their numeric client IDs. Use for batch cleanup rather than deleting one at a time; destructive and irreversible. Re-running with already-deleted IDs has no further effect. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `ids` | array | yes |  | IDs. List of client IDs to delete. Each item: { `id` }. |

### `create_client_property`

**Create Client Custom Property.** Define a new custom property (str, int, float or bool) on the client schema so subsequent client records can store that attribute. Use when an attribute you need does not yet exist on clients; not idempotent (each call adds another property definition). Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `label` | string | yes |  | label. Label of the new custom property. |
| `type` | string | yes |  | type. Property type (str, int, float or bool). |

### `get_vehicles`

**Get Vehicles.** List all vehicles registered in the account. Read-only and idempotent; takes no input. Use to discover vehicle IDs or check the fleet before creating, fetching, or deleting a specific vehicle. Needs authentication.

Kind: safe to repeat.

No inputs.

### `create_vehicle`

**Create Vehicle.** Register a new vehicle, requiring name, capacity, and start/end location coordinates. Not idempotent: each call creates another vehicle, so avoid retrying. Use the get-vehicles action first if you need to check whether a vehicle already exists. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | name. The name of the vehicle. |
| `capacity` | number | yes |  | capacity. The maximum capacity of the vehicle. |
| `default_driver` | string | no |  | default_driver. The assigned driver ID or null if not assigned. |
| `location_start_address` | string | yes |  | location_start_address. The starting address of the vehicle. |
| `location_start_latitude` | number | yes |  | location_start_latitude. The latitude of the starting location. |
| `location_start_longitude` | number | yes |  | location_start_longitude. The longitude of the starting location. |
| `location_end_address` | string | yes |  | location_end_address. The ending address of the vehicle. |
| `location_end_latitude` | number | yes |  | location_end_latitude. The latitude of the ending location. |
| `location_end_longitude` | number | yes |  | location_end_longitude. The longitude of the ending location. |
| `skills` | JSON | no |  | skills. a list of skill IDs (JSON format [1, 2]). |
| `capacity2` | string | no |  | capacity2. Secondary vehicle capacity. |
| `capacity3` | string | no |  | capacity3. Third vehicle capacity. |
| `cost` | string | no |  | cost. Operational cost of the vehicle. |
| `shift_start` | string | no |  | shift_start. Start time of the vehicle shift. |
| `shift_end` | string | no |  | shift_end. End time of the vehicle shift. |
| `reference_id` | string | no |  | reference_id. External reference ID of the vehicle. |
| `license_plate` | string | no |  | license_plate. License plate or registration of the vehicle. |
| `min_load` | number | no |  | min_load. Minimum load (unit 1) required to dispatch. |
| `min_load_2` | number | no |  | min_load_2. Minimum load (unit 2) required. |
| `min_load_3` | number | no |  | min_load_3. Minimum load (unit 3) required. |
| `max_visit` | number | no |  | max_visit. Maximum number of visits that the vehicle can perform. |
| `max_time` | number | no |  | max_time. Maximum duration of route (in seconds). |
| `rest_time_start` | string | no |  | rest_time_start. Start time of rest. |
| `rest_time_end` | string | no |  | rest_time_end. End time of rest. |
| `rest_time_duration` | string | no |  | rest_time_duration. Duration of rest. |

### `get_vehicle`

**Get Vehicle.** Retrieve a single vehicle by its ID. Read-only and idempotent. Use when you already know the vehicle ID; to list all vehicles use the get-vehicles action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vehicle_id` | number | yes |  | vehicle_id. Vehicle ID. |

### `delete_vehicle`

**Delete Vehicle.** Permanently delete a vehicle by its ID. Destructive and not safely repeatable: a repeat call fails once the vehicle is gone, so confirm the ID first. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vehicle_id` | number | yes |  | vehicle_id. Vehicle ID to delete. |

### `get_visits`

**Get Visits.** List registered visits filtered by planned date. Read-only and idempotent; use to enumerate the visits scheduled for a day. For a single visit by ID use the get-visit or get-visit-detail action instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `planned_date` | string | yes |  | planned_date. Filter visits by planned date (YYYY-MM-DD format). |

### `create_visits`

**Create Visits.** Create one or more delivery visits (stops) in a single batch request, each requiring a title, address, planned date, and load. Not idempotent: re-running creates duplicate visits, so do not retry blindly. To change an existing visit use the update actions instead. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `visits` | array | yes |  | visits. Array of visit objects to create. Each item: { `title`, `address`, `planned_date`, `latitude`?, `longitude`?, `load`, `load_2`?, `load_3`?, `window_start`?, `window_end`?, `window_start_2`?, `window_end_2`?, `duration`?, `order`?, `skills_required`?, `skills_optional`?, `tags`?, `contact_name`?, `contact_phone`?, `contact_email`?, `reference`?, `notes`?, `priority_level`?, `visit_type`?, `fleet`? }. |

### `get_visit`

**Get Visit.** Retrieve a single visit record by its ID. Read-only and idempotent; use for the basic visit fields. For the richer plan-level breakdown use get-visit-detail instead. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `visit_id` | number | yes |  | visit_id. Visit ID. |

### `update_visit_partial`

**Update Visit (Partial).** Patch only the supplied fields of an existing visit by ID, leaving other fields untouched. Idempotent for a fixed payload. Prefer this over the complete-update action when changing just a few fields; only visit_id is required. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `visit_id` | number | yes |  | visit_id. ID of the visit to update. |
| `title` | string | no |  | title. Visit title (if you want to change it). |
| `address` | string | no |  | address. Visit address (if you want to change it). |
| `load` | number | no |  | load. Visit load (main unit). |
| `load_2` | number | no |  | load_2. Visit load (unit 2). |
| `load_3` | number | no |  | load_3. Visit load (unit 3). |
| `duration` | string | no |  | duration. Visit duration (HH:MM:SS). |
| `contact_name` | string | no |  | contact_name. Visit contact name. |
| `contact_phone` | string | no |  | contact_phone. Visit contact phone. |
| `notes` | string | no |  | notes. Visit notes. |
| `planned_date` | string | no |  | planned_date. Visit planned date (YYYY-MM-DD). |

### `update_visit`

**Update Visit (Complete).** Fully replace an existing visit (PUT) by ID, requiring title, address, and planned date even for unchanged fields. Idempotent for a fixed payload. Pick this when overwriting the whole visit; use the partial-update action to change only a few fields without resending the rest. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `visit_id` | number | yes |  | visit_id. ID of the visit to update. |
| `title` | string | yes |  | title. Visit title. |
| `address` | string | yes |  | address. Visit address. |
| `latitude` | number | no |  | latitude. Visit latitude. |
| `longitude` | number | no |  | longitude. Visit longitude. |
| `load` | number | no |  | load. Visit load (main unit). |
| `load_2` | number | no |  | load_2. Visit load (unit 2). |
| `load_3` | number | no |  | load_3. Visit load (unit 3). |
| `duration` | string | no |  | duration. Visit duration (HH:MM:SS). |
| `contact_name` | string | no |  | contact_name. Visit contact name. |
| `contact_phone` | string | no |  | contact_phone. Visit contact phone. |
| `notes` | string | no |  | notes. Visit notes. |
| `planned_date` | string | yes |  | planned_date. Visit planned date (YYYY-MM-DD). |

### `delete_visit`

**Delete Visit.** Permanently delete a single visit by its ID. Destructive and not safely repeatable: once deleted the visit is gone and a repeat call will fail, so confirm the ID before calling. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `visit_id` | number | yes |  | visit_id. ID of the visit to delete. |

### `add_visit_items`

**Add Visit Items.** Append one or more line items (products/cargo) to an existing visit identified by visit_id. Not idempotent: each call adds items, so re-running duplicates them. Use only after the visit exists. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `visit_id` | number | yes |  | visit_id. ID of the visit to add items to. |
| `items` | array | yes |  | items. Array of items to add to the visit. Each item: { `title`, `load`?, `load_2`?, `load_3`?, `reference`?, `notes`?, `quantity_planned`?, `quantity_delivered`? }. |

### `get_routes`

**Get Routes.** List all routes planned for a given date (YYYY-MM-DD), returning each route with its assigned vehicle, driver and stops. Use to review or pick routes for a specific day; for a single known route id use Get Route instead. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `planned_date` | string | yes |  | planned_date. Visit planned date (YYYY-MM-DD). |

### `create_route`

**Create Route.** Manually create a route under an existing plan, assigning a vehicle, driver, planned date, estimated time window and start/end locations. Use to build a route by hand rather than via automatic planning; not idempotent, so each call creates another route. Requires the parent plan UUID and the vehicle/driver ids. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `vehicle` | number | yes |  | vehicle. Vehicle ID for the route. |
| `driver` | number | yes |  | driver. Driver ID for the route. |
| `planned_date` | string | yes |  | planned_date. Planned route date (YYYY-MM-DD). |
| `estimated_time_start` | string | yes |  | estimated_time_start. Estimated start time (HH:MM:SS). |
| `estimated_time_end` | string | yes |  | estimated_time_end. Estimated end time (HH:MM:SS). |
| `location_start_address` | string | yes |  | location_start_address. Route start address. |
| `location_start_latitude` | string | yes |  | location_start_latitude. Route start latitude. |
| `location_start_longitude` | string | yes |  | location_start_longitude. Route start longitude. |
| `location_end_address` | string | yes |  | location_end_address. Route end address. |
| `location_end_latitude` | string | yes |  | location_end_latitude. Route end latitude. |
| `location_end_longitude` | string | yes |  | location_end_longitude. Route end longitude. |
| `plan` | string | yes |  | plan. Plan (execution) ID to associate the route (UUID). |

### `get_route`

**Get Route.** Fetch the full details of one route by its UUID, including assigned vehicle, driver and stops. Use when you already have a route id; to find routes by date use Get Routes instead. Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `route_id` | string | yes |  | route_id. Route ID (UUID). |

### `delete_route`

**Delete Route.** Permanently delete a single route identified by its UUID. Use to remove an unwanted or mistaken route; destructive and irreversible. Deleting an already-removed route id simply has no further effect. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `route_id` | string | yes |  | route_id. Route ID to delete (UUID). |

### `get_plans`

**Get Plans.** Retrieve the saved routing plans (executions) for a given date. Read-only and idempotent; the date is required, so use it to inspect what plans exist for a specific day. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `date` | string | yes |  | date. Planned date (YYYY-MM-DD). |

### `create_plan`

**Create an empty plan.** Create a new empty routing plan (execution) for a given date range, reserving a planning day before routes are added. Not idempotent: each call creates a separate plan, so guard against duplicate plans for the same date. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | name. Plan name. |
| `start_date` | string | yes |  | start_date. Start date (YYYY-MM-DD). |
| `end_date` | string | yes |  | end_date. End date (YYYY-MM-DD). |

### `get_plan_vehicles`

**Get vehicles with routes on date.** Look up which vehicles have planned routes on a specific date. Read-only and idempotent; use when you need the routed-vehicle subset for a day rather than the full plan or the entire vehicle fleet. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `planned_date` | string | yes |  | planned_date. Planned date (YYYY-MM-DD). |

### `get_visit_detail`

**Get Visit Detail.** Fetch the extended detail view of one visit by ID. Read-only and idempotent; pick this over get-visit when you need the fuller plan-level detail payload rather than the basic visit record. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `visit_id` | number | yes |  | visit_id. ID of the visit to get details for. |

### `get_drivers`

**Get Drivers.** List all drivers/users registered in the account. Read-only and idempotent; takes no input. Use to discover user IDs before fetching, updating, or assigning a specific driver. Needs authentication.

Kind: safe to repeat.

No inputs.

### `create_users`

**Create User.** Create a new user/driver, requiring username, password, and the is_driver flag. Not idempotent: each call creates another account, so do not retry blindly. To change an existing user use the update-user action. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | username. Nombre de usuario (login). |
| `name` | string | no |  | name. Nombre completo del usuario. |
| `phone` | string | no |  | phone. Número de teléfono. |
| `email` | string | no |  | email. Correo electrónico. |
| `is_admin` | boolean | no | `false` | is_admin. Whether the user is an administrator. |
| `password` | string | yes |  | password. User password. |
| `is_driver` | boolean | yes | `false` | is_driver. Whether the user is a driver. |
| `is_router_jr` | boolean | no | `false` | is_router_jr. Whether the user is a router junior. |
| `is_router` | boolean | no | `false` | is_router. Whether the user is a router. |
| `is_monitor` | boolean | no | `false` | is_monitor. Whether the user is a monitor. |
| `is_coordinator` | boolean | no | `false` | is_coordinator. Whether the user is a coordinator. |

### `get_user`

**Get User.** Retrieve a single user/driver by its ID. Read-only and idempotent. Use when you already know the user ID; to list all drivers use the get-drivers action. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | number | yes |  | user_id. User ID. |

### `update_user`

**Update User.** Fully update an existing user/driver (PUT) by ID, requiring username and name along with the user_id. Idempotent for a fixed payload since it overwrites the user record. Use the get-drivers action to find the user_id first. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | number | yes |  | user_id. User ID to update. |
| `username` | string | yes |  | username. Username (login). |
| `name` | string | yes |  | name. Full name of the user. |
| `phone` | string | no |  | phone. User phone number. |
| `email` | string | no |  | email. User email address. |
| `is_admin` | boolean | no | `false` | is_admin. Whether the user is an administrator. |
| `password` | string | no |  | password. User password. |
| `is_driver` | boolean | no | `false` | is_driver. Whether the user is a driver. |
| `is_router_jr` | boolean | no | `false` | is_router_jr. Whether the user is a router junior. |
| `is_router` | boolean | no | `false` | is_router. Whether the user is a router. |
| `is_monitor` | boolean | no | `false` | is_monitor. Whether the user is a monitor. |
| `is_coordinator` | boolean | no | `false` | is_coordinator. Whether the user is a coordinator. |

### `get_skills`

**Get Skills.** List all driver/vehicle skills defined in the account, returning their ids and names. Use to resolve a valid skill reference before requiring it on visits or assigning it to resources. Read-only and idempotent; takes no inputs. Needs authentication.

Kind: safe to repeat.

No inputs.

### `get_observations`

**Get Observations.** List the route observation types defined in the account, returning their ids and labels. Use to resolve a valid observation reference before applying it to a route or visit. Read-only and idempotent; takes no inputs. Needs authentication.

Kind: safe to repeat.

No inputs.

### `get_tags`

**Get Tags.** List all route tags defined in the account, returning their ids and names. Use to resolve a valid tag reference before applying tags to routes or visits. Read-only and idempotent; takes no inputs. Needs authentication.

Kind: safe to repeat.

No inputs.

### `get_zones`

**Get Zones.** List all geographic zones defined in the account, returning their ids and names. Use to resolve a zone reference before assigning it to clients or visits. Read-only and idempotent; takes no inputs. Needs authentication.

Kind: safe to repeat.

No inputs.

### `get_fleets`

**Get Fleets.** List all fleets configured in the account, returning their ids and names. Use to resolve a valid fleet reference before grouping vehicles or filtering planning by fleet. Read-only and idempotent; takes no inputs. Needs authentication.

Kind: safe to repeat.

No inputs.

### `get_sellers`

**Get Sellers.** List all sellers configured in the account, returning their ids and names. Use to resolve a seller reference before tagging clients or visits with one. Read-only and idempotent; takes no inputs. Needs authentication.

Kind: safe to repeat.

No inputs.

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

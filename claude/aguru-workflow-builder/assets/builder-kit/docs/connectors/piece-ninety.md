# Ninety

Run the EOS operating system in Ninety: to-dos, issues, rocks, milestones and the scorecard

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-ninety'
  version: '0.1.1'
```

Categories: PRODUCTIVITY. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: Personal Access Token

> Generate a token in Ninety under **Settings > Developer Settings**.
>
> The public API is part of Ninety's Thrive plan, and the token carries its owner's permissions — every step only ever sees the teams and records that user can see.

## Actions

### `create_todo`

**Create To-Do.** Creates one Ninety to-do. Leaving the team empty makes it a personal to-do rather than a team one. Use Update To-Do to complete or edit an existing to-do. Each call creates a new to-do, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. What needs doing. |
| `teamId` | string | no |  | Team. Leave empty to create a personal to-do instead of a team one. A value the product loads from the provider, such as an id; write the value itself. |
| `userId` | string | no |  | Owner. Defaults to the token owner when left empty. A value the product loads from the provider, such as an id; write the value itself. |
| `dueDate` | ISO date-time string | no |  | Due Date. Ninety stores a to-do due date as a day, so the time is dropped. |
| `description` | string | no |  | Description. |
| `repeat` | string | no |  | Repeat. A Ninety recurrence pattern such as weekly or monthly. Leave empty for a one-off to-do. |

Output fields:

- `_id`: To-Do ID
- `title`: Title
- `description`: Description
- `dueDate`: Due Date (date)
- `isPersonal`: Is Personal (boolean)
- `completed`: Completed (boolean)
- `archived`: Archived (boolean)
- `teamId`: Team ID
- `teamName`: Team Name
- `userId`: Owner User ID
- `companyId`: Company ID
- `createdDate`: Created Date (datetime)

### `update_todo`

**Update To-Do.** Updates one Ninety to-do by id. Only the fields you set are sent, so the rest are left as they are. This is how a to-do gets completed or archived. Safe to retry, since it sets the to-do to the state you give. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `todoId` | string | yes |  | To-Do ID. The id of the to-do to update. |
| `title` | string | no |  | Title. |
| `description` | string | no |  | Description. |
| `dueDate` | ISO date-time string | no |  | Due Date. Ninety stores a to-do due date as a day, so the time is dropped. |
| `teamId` | string | no |  | Team. Move the record to this team. Leave empty to keep it where it is. A value the product loads from the provider, such as an id; write the value itself. |
| `userId` | string | no |  | Owner. Hand the record to this person. Leave empty to keep the current owner. A value the product loads from the provider, such as an id; write the value itself. |
| `completed` | string | no |  | Completed. Marking this Yes is how a record is finished in Ninety. One of `"any"`, `"yes"`, `"no"`. |
| `archived` | string | no |  | Archived. Archiving takes the record off the active list. One of `"any"`, `"yes"`, `"no"`. |
| `repeat` | string | no |  | Repeat. A Ninety recurrence pattern such as weekly or monthly. |

Output fields:

- `_id`: To-Do ID
- `title`: Title
- `description`: Description
- `dueDate`: Due Date (date)
- `isPersonal`: Is Personal (boolean)
- `completed`: Completed (boolean)
- `archived`: Archived (boolean)
- `teamId`: Team ID
- `teamName`: Team Name
- `userId`: Owner User ID
- `companyId`: Company ID
- `createdDate`: Created Date (datetime)

### `find_todos`

**Find To-Dos.** Searches Ninety to-dos and returns the matching page. A single call returns either team to-dos or personal ones, never both, so set Scope accordingly. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | no |  | Team. Leave empty to cover every team the token can see. A value the product loads from the provider, such as an id; write the value itself. |
| `scope` | string | no |  | Scope. Ninety cannot return personal and team to-dos in one call. Leave empty to let Ninety apply its own default. One of `"team"`, `"personal"`. |
| `userIds` | array | no |  | Owners. Only return records owned by these people. Values the product loads from the provider, such as ids; write an array of them. |
| `completed` | string | no |  | Completed. Leave on Any to return both completed and open records. One of `"any"`, `"yes"`, `"no"`. |
| `archived` | string | no |  | Archived. Leave on Any to let Ninety apply its own default. One of `"any"`, `"yes"`, `"no"`. |
| `searchText` | string | no |  | Search Text. Matches the title and description. |
| `title` | string | no |  | Exact Title. Matches the whole title only. |
| `dueDateFrom` | ISO date-time string | no |  | Due On Or After. |
| `dueDateTo` | ISO date-time string | no |  | Due On Or Before. |
| `sort` | string | no |  | Sort By. Ninety sorts to-dos by these fields only. Creation date is not one of them, so leave this empty to take the order Ninety returns. One of `"dueDate"`, `"title"`, `"completedDate"`. |
| `order` | string | no |  | Order. Ignored unless Sort By is set. One of `"desc"`, `"asc"`. |
| `page` | number | no |  | Page. One based. Leave empty for the first page. |
| `pageSize` | number | no |  | Page Size. How many to-dos to return. Ninety allows up to 100. |

Output fields:

- `todos`: To-Dos
- `todos[]._id`: To-Do ID
- `todos[].title`: Title
- `todos[].description`: Description
- `todos[].dueDate`: Due Date (date)
- `todos[].isPersonal`: Is Personal (boolean)
- `todos[].completed`: Completed (boolean)
- `todos[].archived`: Archived (boolean)
- `todos[].teamId`: Team ID
- `todos[].teamName`: Team Name
- `todos[].userId`: Owner User ID
- `todos[].companyId`: Company ID
- `todos[].createdDate`: Created Date (datetime)
- `count`: Count (number)
- `totalCount`: Total Count (number)

### `create_issue`

**Create Issue.** Creates one Ninety issue on a team. A team is required, unlike a to-do, and short term issues go to the weekly list while long term ones go to the parking lot. Each call creates a new issue, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. The issue headline. |
| `teamId` | string | yes |  | Team. The Ninety team this record belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `interval` | string | no |  | Term. Short term issues sit on the weekly list, long term on the parking lot. One of `"SHORT_TERM"`, `"LONG_TERM"`. |
| `priority` | string | no |  | Priority. Ninety rates issues 0 to 5, where 0 is unrated and 5 is highest. One of `"0"`, `"1"`, `"2"`, `"3"`, `"4"`, `"5"`. |
| `userId` | string | no |  | Owner. Defaults to the token owner when left empty. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. Ninety renders this as HTML. |

Output fields:

- `_id`: Issue ID
- `title`: Title
- `description`: Description (html)
- `intervalCode`: Term
- `priority`: Priority (number)
- `completed`: Completed (boolean)
- `archived`: Archived (boolean)
- `teamId`: Team ID
- `userId`: Owner User ID
- `companyId`: Company ID
- `createdDate`: Created Date (datetime)

### `update_issue`

**Update Issue.** Updates one Ninety issue by id. Only the fields you set are sent. Marking it completed is how an issue is solved, and changing the term moves it between the weekly list and the parking lot. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `issueId` | string | yes |  | Issue ID. The id of the issue to update. |
| `title` | string | no |  | Title. |
| `teamId` | string | no |  | Team. Move the record to this team. Leave empty to keep it where it is. A value the product loads from the provider, such as an id; write the value itself. |
| `interval` | string | no |  | Term. Short term issues sit on the weekly list, long term on the parking lot. One of `"SHORT_TERM"`, `"LONG_TERM"`. |
| `priority` | string | no |  | Priority. Ninety rates issues 0 to 5, where 0 is unrated and 5 is highest. One of `"0"`, `"1"`, `"2"`, `"3"`, `"4"`, `"5"`. |
| `completed` | string | no |  | Completed. Marking this Yes is how a record is finished in Ninety. One of `"any"`, `"yes"`, `"no"`. |
| `description` | string | no |  | Description. Ninety renders this as HTML. |

Output fields:

- `_id`: Issue ID
- `title`: Title
- `description`: Description (html)
- `intervalCode`: Term
- `priority`: Priority (number)
- `completed`: Completed (boolean)
- `archived`: Archived (boolean)
- `teamId`: Team ID
- `userId`: Owner User ID
- `companyId`: Company ID
- `createdDate`: Created Date (datetime)

### `find_issues`

**Find Issues.** Searches Ninety issues and returns the matching page, newest first by default. Filter by team and by term to separate the weekly list from the parking lot. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | no |  | Team. Leave empty to cover every team the token can see. A value the product loads from the provider, such as an id; write the value itself. |
| `intervalCode` | string | no |  | Term. Short term issues sit on the weekly list, long term on the parking lot. One of `"SHORT_TERM"`, `"LONG_TERM"`. |
| `searchText` | string | no |  | Search Text. Matches the title, description and comments. |
| `sortField` | string | no | `"createdDate"` | Sort By. One of `"createdDate"`, `"completedDate"`, `"archivedDate"`, `"dueDate"`, `"title"`, `"priority"`, `"intervalCode"`, `"numOfLikes"`, `"team"`, `"user"`. |
| `sortDirection` | string | no | `"DESC"` | Order. One of `"DESC"`, `"ASC"`. |
| `pageIndex` | number | no |  | Page. Zero based. Leave empty for the first page. |
| `pageSize` | number | no |  | Page Size. How many issues to return. Ninety defaults to 10. |

Output fields:

- `issues`: Issues
- `issues[]._id`: Issue ID
- `issues[].title`: Title
- `issues[].description`: Description (html)
- `issues[].intervalCode`: Term
- `issues[].priority`: Priority (number)
- `issues[].completed`: Completed (boolean)
- `issues[].archived`: Archived (boolean)
- `issues[].teamId`: Team ID
- `issues[].userId`: Owner User ID
- `issues[].companyId`: Company ID
- `issues[].createdDate`: Created Date (datetime)
- `count`: Count (number)
- `totalCount`: Total Count (number)

### `create_rock`

**Create Rock.** Creates one Ninety rock, the quarterly goal of the EOS model. Team, title, due date, status, level and quarter are all required. Use Create Milestone afterwards to break the rock into steps. Each call creates a new rock, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `title` | string | yes |  | Title. What the rock commits to. |
| `teamId` | string | yes |  | Team. The Ninety team this record belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `dueDate` | ISO date-time string | yes |  | Due Date. When the rock is due, usually the end of the quarter. |
| `statusCode` | string | yes | `"ON_TRACK"` | Status. One of `"ON_TRACK"`, `"OFF_TRACK"`, `"DONE"`, `"CANCELED"`, `"DRAFT"`. |
| `levelCode` | string | yes | `"USER"` | Level. Who the rock belongs to. One of `"USER"`, `"DEPARTMENT"`, `"COMPANY"`, `"COMPANY_AND_DEPARTMENT"`. |
| `quarter` | string | yes | `"Q1"` | Quarter. One of `"Q1"`, `"Q2"`, `"Q3"`, `"Q4"`, `"None"`. |
| `description` | string | no |  | Description. |
| `futureScope` | string | no |  | Planning Horizon. One of `"Current"`, `"Next"`, `"Later"`, `"Future"`. |
| `additionalTeamIds` | array | no |  | Additional Teams. Other teams that should see this rock. Values the product loads from the provider, such as ids; write an array of them. |
| `addCreatorToFollowersList` | boolean | no |  | Follow This Rock. Add the token owner to the rock followers. |

Output fields:

- `_id`: Rock ID
- `title`: Title
- `description`: Description
- `teamId`: Team ID
- `userId`: Owner User ID
- `companyId`: Company ID
- `statusCode`: Status
- `levelCode`: Level
- `quarter`: Quarter
- `dueDate`: Due Date (datetime)
- `futureScope`: Planning Horizon
- `archived`: Archived (boolean)
- `completed`: Completed (boolean)
- `createdDate`: Created Date (datetime)
- `updatedAt`: Updated At (datetime)

### `update_rock`

**Update Rock.** Updates one Ninety rock by id. Only the fields you set are sent. Setting the status to DONE is how a rock is completed, and On track or Off track is what a weekly meeting reports. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `rockId` | string | yes |  | Rock ID. The id of the rock to update. |
| `title` | string | no |  | Title. |
| `statusCode` | string | no |  | Status. One of `"ON_TRACK"`, `"OFF_TRACK"`, `"DONE"`, `"CANCELED"`, `"DRAFT"`. |
| `levelCode` | string | no |  | Level. One of `"USER"`, `"DEPARTMENT"`, `"COMPANY"`, `"COMPANY_AND_DEPARTMENT"`. |
| `quarter` | string | no |  | Quarter. One of `"Q1"`, `"Q2"`, `"Q3"`, `"Q4"`, `"None"`. |
| `dueDate` | ISO date-time string | no |  | Due Date. |
| `teamId` | string | no |  | Team. Move the record to this team. Leave empty to keep it where it is. A value the product loads from the provider, such as an id; write the value itself. |
| `userId` | string | no |  | Owner. Hand the record to this person. Leave empty to keep the current owner. A value the product loads from the provider, such as an id; write the value itself. |
| `description` | string | no |  | Description. |
| `futureScope` | string | no |  | Planning Horizon. One of `"Current"`, `"Next"`, `"Later"`, `"Future"`. |
| `additionalTeamIds` | array | no |  | Additional Teams. Other teams that should see this rock. Values the product loads from the provider, such as ids; write an array of them. |
| `clearAdditionalTeams` | boolean | no |  | Unshare From Additional Teams. Removes every additional team from the rock. An empty selection above leaves them as they are, so this is the only way to clear them. |
| `archived` | string | no |  | Archived. Archiving takes the record off the active list. One of `"any"`, `"yes"`, `"no"`. |

Output fields:

- `_id`: Rock ID
- `title`: Title
- `description`: Description
- `teamId`: Team ID
- `userId`: Owner User ID
- `companyId`: Company ID
- `statusCode`: Status
- `levelCode`: Level
- `quarter`: Quarter
- `dueDate`: Due Date (datetime)
- `futureScope`: Planning Horizon
- `archived`: Archived (boolean)
- `completed`: Completed (boolean)
- `createdDate`: Created Date (datetime)
- `updatedAt`: Updated At (datetime)

### `find_rocks`

**Find Rocks.** Searches Ninety rocks and returns the matching page. Ninety cannot sort rocks by creation date, so this orders by due date by default. Non-archived rocks only unless you ask otherwise. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | no |  | Team. Leave empty to cover every team the token can see. A value the product loads from the provider, such as an id; write the value itself. |
| `userId` | string | no |  | Owner. Only return records owned by this person. A value the product loads from the provider, such as an id; write the value itself. |
| `statusCode` | string | no |  | Status. One of `"ON_TRACK"`, `"OFF_TRACK"`, `"DONE"`, `"CANCELED"`, `"DRAFT"`. |
| `levelCode` | string | no |  | Level. One of `"USER"`, `"DEPARTMENT"`, `"COMPANY"`, `"COMPANY_AND_DEPARTMENT"`. |
| `futureScope` | string | no |  | Planning Horizon. One of `"Current"`, `"Next"`, `"Later"`, `"Future"`, `"all"`. |
| `archived` | string | no |  | Archived. Leave on Any to let Ninety apply its own default. One of `"any"`, `"yes"`, `"no"`. |
| `searchText` | string | no |  | Search Text. Matches the title and description. |
| `sortField` | string | no | `"dueDate"` | Sort By. Ninety does not offer a created-date sort for rocks. One of `"dueDate"`, `"dueDateQuarter"`, `"completedDate"`, `"title"`, `"statusCode"`, `"owner"`, `"team"`. |
| `sortDirection` | string | no | `"DESC"` | Order. One of `"DESC"`, `"ASC"`. |
| `pageIndex` | number | no |  | Page. Zero based. Leave empty for the first page. |
| `pageSize` | number | no |  | Page Size. How many rocks to return. Ninety allows up to 200. |

Output fields:

- `rocks`: Rocks
- `rocks[]._id`: Rock ID
- `rocks[].title`: Title
- `rocks[].description`: Description
- `rocks[].teamId`: Team ID
- `rocks[].userId`: Owner User ID
- `rocks[].companyId`: Company ID
- `rocks[].statusCode`: Status
- `rocks[].levelCode`: Level
- `rocks[].quarter`: Quarter
- `rocks[].dueDate`: Due Date (datetime)
- `rocks[].futureScope`: Planning Horizon
- `rocks[].archived`: Archived (boolean)
- `rocks[].completed`: Completed (boolean)
- `rocks[].createdDate`: Created Date (datetime)
- `count`: Count (number)
- `totalCount`: Total Count (number)

### `create_milestone`

**Create Milestone.** Creates one milestone under a Ninety rock, the smaller step a quarterly goal is broken into. It needs the parent rock and its team, so create the rock first. Ninety always creates a milestone as not done, so there is no way to record a completed one here. Each call creates a new milestone, so retries duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | yes |  | Team. The Ninety team this record belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `rockId` | string | yes |  | Rock. The rock this milestone belongs to. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. The step this milestone represents. |
| `dueDate` | ISO date-time string | yes |  | Due Date. |
| `description` | string | no |  | Description. |

Output fields:

- `_id`: Milestone ID
- `rockId`: Rock ID
- `teamId`: Team ID
- `ownedByUserId`: Owner User ID
- `title`: Title
- `description`: Description
- `dueDate`: Due Date (datetime)
- `isDone`: Is Done (boolean)
- `createdDate`: Created Date (datetime)

### `find_measurables`

**Find Measurables.** Searches Ninety scorecard measurables, the tracked weekly or monthly numbers of the EOS model. Use it to find the measurable id that Set Measurable Score needs. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | no |  | Team. Leave empty to cover every team the token can see. A value the product loads from the provider, such as an id; write the value itself. |
| `userIds` | array | no |  | Owners. Only return records owned by these people. Values the product loads from the provider, such as ids; write an array of them. |
| `periodInterval` | string | no |  | Cadence. How often the measurable is scored. One of `"weekly"`, `"monthly"`, `"quarterly"`, `"annual"`. |
| `searchTitle` | string | no |  | Title Contains. |
| `searchOwner` | string | no |  | Owner Name Contains. |
| `searchText` | string | no |  | Search Text. Matches the title and description. |
| `unassignedOnly` | boolean | no |  | Unowned Only. Only return measurables with nobody accountable for them. |
| `sortField` | string | no |  | Sort By. One of `"title"`, `"owner"`, `"id"`. |
| `sortDirection` | string | no |  | Order. One of `"ASC"`, `"DESC"`. |
| `pageIndex` | number | no |  | Page. Zero based. Leave empty for the first page. |
| `pageSize` | number | no |  | Page Size. How many measurables to return. Ninety defaults to 25. |

Output fields:

- `measurables`: Measurables
- `measurables[]._id`: Measurable ID
- `measurables[].title`: Title
- `measurables[].unit`: Unit
- `measurables[].currency`: Currency
- `measurables[].periodInterval`: Cadence
- `measurables[].userFullName`: Owner Name
- `measurables[].type`: Type
- `measurables[].isSmart`: Is Smart (boolean)
- `count`: Count (number)
- `totalCount`: Total Count (number)

### `set_measurable_score`

**Set Measurable Score.** Writes the score for one Ninety measurable in one period. The period start date identifies the cell, so calling it again with the same date overwrites that score rather than adding another. Use Find Measurables to get the measurable id. Safe to retry. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `teamId` | string | no |  | Team. Leave empty to cover every team the token can see. A value the product loads from the provider, such as an id; write the value itself. |
| `measurableId` | string | yes |  | Measurable. The scorecard measurable to score. A value the product loads from the provider, such as an id; write the value itself. |
| `value` | number | yes |  | Value. The number to record for this period. |
| `periodStartDate` | ISO date-time string | yes |  | Period Start Date. The first day of the period being scored. Ninety keys the score on this, so the same date overwrites. |

Output fields:

- `measurableId`: Measurable ID
- `value`: Value (number)
- `periodStartDate`: Period Start Date (datetime)
- `response`: Ninety Response

### `list_teams`

**List Teams.** Lists the Ninety teams the connected token can see, with their ids. Use it first when another step needs a team id and none is known. The list is limited to the token owner permissions. Read-only and safe to retry. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `teams`: Teams
- `teams[]._id`: Team ID
- `teams[].name`: Name
- `count`: Count (number)

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

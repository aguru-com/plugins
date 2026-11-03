# Heartbeat

Community platform for members, groups, channels, threads, events and courses

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-heartbeat'
  version: '0.3.1'
```

Categories: COMMUNICATION. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> API access is included in Heartbeat's Scale plan. To create a key:
> 1. Log in to your Heartbeat community as an admin.
> 2. Open **Settings**, then **Automation**, then **API Keys**.
> 3. Click **Create API Key** and give it a label.
> 4. Copy the key and paste it here.
>
> Actions run as the admin who created the key.

## Actions

### `heartbeat_create_user`

**Create User.** Creates a member in a Heartbeat community, assigning a role and optionally groups and profile fields (bio, social links, status). Use to onboard a new person; the email must be unique to the community. Not idempotent: a second call with the same email is rejected, and with the introduction-thread option on and a bio set it also posts an introduction thread. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The user's full name. |
| `email` | string | yes |  | Email. The user's email. Must be unique to the community. |
| `role_id` | string | yes |  | Roles. The role the user should have. A value the product loads from the provider, such as an id; write the value itself. |
| `group_ids` | array | no |  | Groups. A list of the ids of the groups that the user should belong to. Values the product loads from the provider, such as ids; write an array of them. |
| `profile_picture` | string | no |  | Profile Picture. A Data URI scheme in the JPG, GIF, or PNG format. Ensure you use the proper content type (image/jpeg, image/png, image/gif) that matches the image data being provided. |
| `bio` | string | no |  | Bio. The user's bio. |
| `status` | string | no |  | Status. The user's status. |
| `linkedin` | string | no |  | LinkedIn. A link to the user's LinkedIn profile (full URL including https://) |
| `twitter` | string | no |  | Twitter. A link to the user's Twitter profile (full URL including https://) |
| `instagram` | string | no |  | Instagram. A link to the user's Instagram profile (full URL including https://) |
| `website` | string | no |  | Website. A link to the user's website (full URL including https://) |
| `create_introduction_thread` | boolean | no |  | Create introduction thread. If true and a value for bio is provided, an introduction thread for the user will be created in the channel designated for introductions in your community settings. |

Output fields:

- `userID`: User ID
- `email`: Email (email)
- `name`: Name
- `firstName`: First Name
- `lastName`: Last Name
- `role`: Role
- `isAdmin`: Is Admin (boolean)
- `groups`: Groups
- `groups[].id`: ID
- `groups[].name`: Name
- `bio`: Bio
- `avatar`: Avatar (image)
- `createdAt`: Joined At (datetime)
- `lastLogin`: Last Login (datetime)
- `socialLinks`: Social Links
- `socialLinks.linkedin`: LinkedIn (url)
- `socialLinks.twitter`: Twitter (url)
- `socialLinks.instagram`: Instagram (url)
- `socialLinks.calendar`: Calendar (url)
- `socialLinks.personalWebsite`: Website (url)
- `socialLinks.community`: Community (url)
- `linkedInSummary`: LinkedIn Summary
- `linkedInData`: LinkedIn Data
- `linkedInData.profileUrl`: Profile URL (url)
- `linkedInData.headline`: Headline
- `linkedInData.company`: Company
- `linkedInData.location`: Location
- `onboardingResponses`: Onboarding Answers
- `onboardingResponses[].question`: Question
- `onboardingResponses[].answer`: Answer
- `onboardingResponses[].isPrivate`: Private (boolean)
- `lookupError`: Read-Back Error

### `heartbeat_create_member`

**Create Member (by Role ID).** Creates a member in the Heartbeat community from a name, unique email and role ID (get role IDs from List Roles, group IDs from List Groups), optionally with groups, bio, status and social links, and returns the new member. Use Find Member by Email first to avoid duplicates. Not idempotent: a second call with the same email is rejected as a duplicate. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The member's full name. |
| `email` | string | yes |  | Email. Must be unique in the community. |
| `roleId` | string | yes |  | Role ID. Use List Roles to find the ID. |
| `groupIds` | array | no |  | Group IDs. Groups the member joins. Use List Groups to find IDs. |
| `bio` | string | no |  | Bio. |
| `status` | string | no |  | Status. |
| `linkedin` | string | no |  | LinkedIn URL. Full URL including https://. |
| `twitter` | string | no |  | Twitter URL. Full URL including https://. |
| `instagram` | string | no |  | Instagram URL. Full URL including https://. |
| `website` | string | no |  | Website URL. Full URL including https://. |
| `createIntroductionThread` | boolean | no | `false` | Post Introduction Thread. When on and a bio is given, posts an introduction thread for the member in the community introductions channel. |

Output fields:

- `userID`: User ID
- `email`: Email (email)
- `name`: Name
- `firstName`: First Name
- `lastName`: Last Name
- `role`: Role
- `isAdmin`: Is Admin (boolean)
- `groups`: Groups
- `groups[].id`: ID
- `groups[].name`: Name
- `bio`: Bio
- `avatar`: Avatar (image)
- `createdAt`: Joined At (datetime)
- `lastLogin`: Last Login (datetime)
- `socialLinks`: Social Links
- `socialLinks.linkedin`: LinkedIn (url)
- `socialLinks.twitter`: Twitter (url)
- `socialLinks.instagram`: Instagram (url)
- `socialLinks.calendar`: Calendar (url)
- `socialLinks.personalWebsite`: Website (url)
- `socialLinks.community`: Community (url)
- `linkedInSummary`: LinkedIn Summary
- `linkedInData`: LinkedIn Data
- `linkedInData.profileUrl`: Profile URL (url)
- `linkedInData.headline`: Headline
- `linkedInData.company`: Company
- `linkedInData.location`: Location
- `onboardingResponses`: Onboarding Answers
- `onboardingResponses[].question`: Question
- `onboardingResponses[].answer`: Answer
- `onboardingResponses[].isPrivate`: Private (boolean)
- `lookupError`: Read-Back Error

### `heartbeat_list_users`

**List Members.** Lists community members with name, email, role, groups and last login, optionally filtered by name/email text, group ID, role name or admin flag. Use to find a member ID or email before updating, messaging or grouping them. totalMatching counts every match even when the list is cut at the limit. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `search` | string | no |  | Name or Email Contains. Case-insensitive text to match in the name or email. |
| `groupId` | string | no |  | Group ID. Only members of this group. Use List Groups to find the ID. |
| `role` | string | no |  | Role Name. Only members with this role, for example Administrator, Moderator or User (see List Roles). |
| `adminsOnly` | boolean | no | `false` | Admins Only. |
| `includeProfileDetails` | boolean | no | `false` | Include Profile Details. Also return LinkedIn data and onboarding answers (larger output). |
| `limit` | number | no | `100` | Limit. How many items to return (1-1000, default 100). |

Output fields:

- `users`: Members
- `users[].id`: User ID
- `users[].email`: Email (email)
- `users[].name`: Name
- `users[].firstName`: First Name
- `users[].lastName`: Last Name
- `users[].role`: Role
- `users[].isAdmin`: Is Admin (boolean)
- `users[].groups`: Groups
- `users[].groups[].id`: ID
- `users[].groups[].name`: Name
- `users[].bio`: Bio
- `users[].avatar`: Avatar (image)
- `users[].createdAt`: Joined At (datetime)
- `users[].lastLogin`: Last Login (datetime)
- `users[].socialLinks`: Social Links
- `users[].socialLinks.linkedin`: LinkedIn (url)
- `users[].socialLinks.twitter`: Twitter (url)
- `users[].socialLinks.instagram`: Instagram (url)
- `users[].socialLinks.calendar`: Calendar (url)
- `users[].socialLinks.personalWebsite`: Website (url)
- `users[].socialLinks.community`: Community (url)
- `count`: Count (number)
- `totalMatching`: Total Matching (number)
- `truncated`: Truncated (boolean)

### `heartbeat_get_user`

**Get Member.** Returns one member by user ID with email, role, groups, bio, social links, LinkedIn data and onboarding answers. Use when you have the ID (from List Members or a trigger); use Find Member by Email when you only have the email. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User ID. Use List Members to find the ID. |

Output fields:

- `id`: User ID
- `email`: Email (email)
- `name`: Name
- `firstName`: First Name
- `lastName`: Last Name
- `role`: Role
- `isAdmin`: Is Admin (boolean)
- `groups`: Groups
- `groups[].id`: ID
- `groups[].name`: Name
- `bio`: Bio
- `avatar`: Avatar (image)
- `createdAt`: Joined At (datetime)
- `lastLogin`: Last Login (datetime)
- `socialLinks`: Social Links
- `socialLinks.linkedin`: LinkedIn (url)
- `socialLinks.twitter`: Twitter (url)
- `socialLinks.instagram`: Instagram (url)
- `socialLinks.calendar`: Calendar (url)
- `socialLinks.personalWebsite`: Website (url)
- `socialLinks.community`: Community (url)
- `linkedInSummary`: LinkedIn Summary
- `linkedInData`: LinkedIn Data
- `linkedInData.profileUrl`: Profile URL (url)
- `linkedInData.headline`: Headline
- `linkedInData.company`: Company
- `linkedInData.location`: Location
- `onboardingResponses`: Onboarding Answers
- `onboardingResponses[].question`: Question
- `onboardingResponses[].answer`: Answer
- `onboardingResponses[].isPrivate`: Private (boolean)

### `heartbeat_find_user_by_email`

**Find Member by Email.** Looks up one member by exact email and returns found=false (not an error) when nobody in the community has it. Use before Create Member to avoid duplicates, or to get a member ID for messaging and groups. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |

Output fields:

- `found`: Found (boolean)
- `user`: Member
- `user.id`: User ID
- `user.email`: Email (email)
- `user.name`: Name
- `user.firstName`: First Name
- `user.lastName`: Last Name
- `user.role`: Role
- `user.isAdmin`: Is Admin (boolean)
- `user.groups`: Groups
- `user.groups[].id`: ID
- `user.groups[].name`: Name
- `user.bio`: Bio
- `user.avatar`: Avatar (image)
- `user.createdAt`: Joined At (datetime)
- `user.lastLogin`: Last Login (datetime)
- `user.socialLinks`: Social Links
- `user.socialLinks.linkedin`: LinkedIn (url)
- `user.socialLinks.twitter`: Twitter (url)
- `user.socialLinks.instagram`: Instagram (url)
- `user.socialLinks.calendar`: Calendar (url)
- `user.socialLinks.personalWebsite`: Website (url)
- `user.socialLinks.community`: Community (url)
- `user.linkedInSummary`: LinkedIn Summary
- `user.linkedInData`: LinkedIn Data
- `user.linkedInData.profileUrl`: Profile URL (url)
- `user.linkedInData.headline`: Headline
- `user.linkedInData.company`: Company
- `user.linkedInData.location`: Location
- `user.onboardingResponses`: Onboarding Answers
- `user.onboardingResponses[].question`: Question
- `user.onboardingResponses[].answer`: Answer
- `user.onboardingResponses[].isPrivate`: Private (boolean)

### `heartbeat_update_user`

**Update Member.** Changes a member's profile (name, bio, status, social links) identified by email; fields you omit stay as they are, and Fields to Clear blanks the chosen ones. Use after Find Member by Email. Setting the same values again changes nothing, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Email of the member to update. |
| `name` | string | no |  | Name. |
| `bio` | string | no |  | Bio. |
| `status` | string | no |  | Status. |
| `linkedin` | string | no |  | LinkedIn URL. Full URL including https://. |
| `twitter` | string | no |  | Twitter URL. Full URL including https://. |
| `instagram` | string | no |  | Instagram URL. Full URL including https://. |
| `fieldsToClear` | array | no |  | Fields to Clear. Blank these fields. A field cannot be both set and cleared. One of `"bio"`, `"status"`, `"linkedin"`, `"twitter"`, `"instagram"`. |

Output fields:

- `email`: Email (email)
- `updated`: Updated (boolean)
- `updatedFields`: Updated Fields
- `user`: Member
- `user.id`: User ID
- `user.email`: Email (email)
- `user.name`: Name
- `user.firstName`: First Name
- `user.lastName`: Last Name
- `user.role`: Role
- `user.isAdmin`: Is Admin (boolean)
- `user.groups`: Groups
- `user.groups[].id`: ID
- `user.groups[].name`: Name
- `user.bio`: Bio
- `user.avatar`: Avatar (image)
- `user.createdAt`: Joined At (datetime)
- `user.lastLogin`: Last Login (datetime)
- `user.socialLinks`: Social Links
- `user.socialLinks.linkedin`: LinkedIn (url)
- `user.socialLinks.twitter`: Twitter (url)
- `user.socialLinks.instagram`: Instagram (url)
- `user.socialLinks.calendar`: Calendar (url)
- `user.socialLinks.personalWebsite`: Website (url)
- `user.socialLinks.community`: Community (url)
- `lookupError`: Read-Back Error

### `heartbeat_remove_user`

**Remove Member (Deactivate).** Deactivates a member by email so they can no longer access the community; their threads, comments and messages stay, and Reactivate Member undoes it. Use only when asked to remove someone. Fails if no member has that email. Repeating it on a deactivated member succeeds again, so it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Email of the member to deactivate. |

Output fields:

- `email`: Email (email)
- `removed`: Removed (boolean)

### `heartbeat_reactivate_user`

**Reactivate Member.** Restores community access for a member who was removed (deactivated), identified by email. Use to undo Remove Member. If the member is already active it reports alreadyActive=true instead of failing, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. Email of the member to reactivate. |

Output fields:

- `email`: Email (email)
- `reactivated`: Reactivated (boolean)
- `alreadyActive`: Already Active (boolean)

### `heartbeat_create_pending_user`

**Pre-register Member.** Pre-registers a person by email with a role ID and optional group IDs; they become a member the first time they log in. Use when someone should get a set role and groups on their first login. Fails if the email is already a member. Calling again for the same pending email updates the pre-registration, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Email. |
| `name` | string | yes |  | Name. The person's full name. |
| `roleId` | string | yes |  | Role ID. Use List Roles to find the ID. |
| `groupIds` | array | no |  | Group IDs. Use List Groups to find IDs. |
| `bio` | string | no |  | Bio. |

Output fields:

- `email`: Email (email)
- `success`: Success (boolean)

### `heartbeat_list_user_completed_lessons`

**List Completed Lessons.** Lists the course lessons a member has completed (lesson ID and completion time), newest first, one page at a time. Use to check course progress; pass nextCursor as Starting After for the next page. hasMore can be true on an exactly full last page. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId` | string | yes |  | User ID. Use List Members to find the ID. |
| `limit` | number | no | `50` | Limit. How many items to return (1-100, default 50). |
| `startingAfter` | string | no |  | Starting After (Cursor). Leave empty for the first page. To get the next page, pass the Next Cursor value from the previous run. |

Output fields:

- `items`: Completed Lessons
- `items[].lessonID`: Lesson ID
- `items[].completedAt`: Completed At (datetime)
- `nextCursor`: Next Cursor
- `hasMore`: Has More (boolean)

### `heartbeat_mark_lessons_completed`

**Mark Lessons Completed.** Marks one or more course lessons (by lesson ID, from List Courses) as completed for a member identified by email, at the given time or now. Use to sync progress from another learning tool. Heartbeat silently ignores unknown lesson IDs, so the result lists them in notConfirmed. If the read-back could not finish (more than 500 completions to scan, or a read error), the unchecked lessons are listed in unverified and checkComplete is false. It only adds completions and never removes any; marking an already completed lesson again changes nothing, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `email` | string | yes |  | Member Email. |
| `lessonIds` | array | yes |  | Lesson IDs. 1-100 lesson IDs. Use List Courses to find them. |
| `completedAt` | ISO date-time string | no |  | Completed At. When the lessons were completed. Defaults to now. |

Output fields:

- `email`: Email (email)
- `lessonIds`: Lesson IDs
- `completedAt`: Completed At (datetime)
- `confirmed`: Confirmed Lesson IDs
- `notConfirmed`: Not Confirmed Lesson IDs
- `unverified`: Unverified Lesson IDs
- `checkComplete`: Check Complete (boolean)
- `lookupError`: Read-Back Error

### `heartbeat_list_roles`

**List Roles.** Lists every role in the community (ID and name, for example Administrator, Moderator, User). Use to get a role ID for Create Member, Pre-register Member or Create Invitation Link. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `roles`: Roles
- `roles[].id`: ID
- `roles[].name`: Name
- `count`: Count (number)

### `heartbeat_list_groups`

**List Groups.** Lists all groups (ID, name, description, parent group, archived flag), optionally with their members. Use to get group IDs for membership, events, channels and invitations. Archived groups are left out unless Include Archived is on. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `includeArchived` | boolean | no | `false` | Include Archived. |
| `includeMembers` | boolean | no | `false` | Include Members. Also return each group member (ID, name, email). |

Output fields:

- `groups`: Groups
- `groups[].id`: Group ID
- `groups[].name`: Name
- `groups[].description`: Description (html)
- `groups[].color`: Color
- `groups[].parentGroupID`: Parent Group ID
- `groups[].archived`: Archived (boolean)
- `groups[].users`: Members
- `groups[].users[].id`: User ID
- `groups[].users[].name`: Name
- `groups[].users[].email`: Email (email)
- `count`: Count (number)

### `heartbeat_get_group`

**Get Group.** Returns one group by ID with name, description, color, parent group, archived flag and its members (ID, name, email). Use to check who is in a group. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group ID. Use List Groups to find the ID. |

Output fields:

- `id`: Group ID
- `name`: Name
- `description`: Description (html)
- `color`: Color
- `parentGroupID`: Parent Group ID
- `archived`: Archived (boolean)
- `users`: Members
- `users[].id`: User ID
- `users[].name`: Name
- `users[].email`: Email (email)

### `heartbeat_create_group`

**Create Group.** Creates a group with a name and optional description, parent group ID, initial member emails and isolated/joinable settings, and returns the new group. Use for cohorts, stages or access control. Not idempotent: each call creates another group even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. |
| `memberEmails` | array | no |  | Member Emails. Emails of existing members to add (up to 100). |
| `parentGroupId` | string | no |  | Parent Group ID. Makes this a sub-group. Use List Groups to find the ID. |
| `isIsolated` | boolean | no |  | Isolated. Members of an isolated group only see content shared with the group (see Heartbeat docs). |
| `isJoinable` | boolean | no |  | Joinable. Members can join the group themselves. |

Output fields:

- `id`: Group ID
- `name`: Name
- `description`: Description (html)
- `color`: Color
- `parentGroupID`: Parent Group ID
- `archived`: Archived (boolean)
- `users`: Members
- `users[].id`: User ID
- `users[].name`: Name
- `users[].email`: Email (email)
- `lookupError`: Read-Back Error

### `heartbeat_update_group`

**Update Group.** Changes a group's name, description, isolated or joinable setting; omitted fields (and 'unchanged') stay as they are, and a call with nothing to change is refused. Use after List Groups. Applying the same values again changes nothing, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group ID. Use List Groups to find the ID. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `isIsolated` | string | no | `"unchanged"` | Isolated. Members of an isolated group only see content shared with the group. One of `"unchanged"`, `"yes"`, `"no"`. |
| `isJoinable` | string | no | `"unchanged"` | Joinable. Members can join the group themselves. One of `"unchanged"`, `"yes"`, `"no"`. |

Output fields:

- `id`: Group ID
- `updated`: Updated (boolean)
- `updatedFields`: Updated Fields
- `group`: Group
- `group.id`: Group ID
- `group.name`: Name
- `group.description`: Description (html)
- `group.color`: Color
- `group.parentGroupID`: Parent Group ID
- `group.archived`: Archived (boolean)
- `group.users`: Members
- `group.users[].id`: User ID
- `group.users[].name`: Name
- `group.users[].email`: Email (email)
- `lookupError`: Read-Back Error

### `heartbeat_delete_group`

**Delete Group.** Permanently deletes a group by ID; its members stay in the community but lose the group. Use only when explicitly asked. Heartbeat refuses some deletions and the reason is returned as the error. A repeat call finds it gone and reports alreadyDeleted=true, so it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group ID. Use List Groups to find the ID. |

Output fields:

- `id`: ID
- `deleted`: Deleted (boolean)
- `alreadyDeleted`: Already Deleted (boolean)

### `heartbeat_add_users_to_group`

**Add Members to Group.** Adds existing members (by email) to a group, optionally removing them from sibling groups under the same parent to move them between stages. Heartbeat silently ignores emails that are not members, so they are listed in notAdded (if the read-back fails, all emails are listed in unverified with lookupError set). Adding existing group members changes nothing, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group ID. Use List Groups to find the ID. |
| `emails` | array | yes |  | Member Emails. 1-100 emails of existing members. |
| `removeFromSiblingGroups` | boolean | no | `false` | Remove from Sibling Groups. Also remove these members from other groups with the same parent group (moves them between stages). |

Output fields:

- `groupId`: Group ID
- `emails`: Requested Emails
- `added`: In Group Now
- `notAdded`: Not Added
- `unverified`: Unverified
- `lookupError`: Read-Back Error

### `heartbeat_remove_users_from_group`

**Remove Members from Group.** Removes members (by email) from a group; they stay in the community and keep their other groups. Use for offboarding from a cohort or stage. Removing someone who is not in the group changes nothing, so it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | yes |  | Group ID. Use List Groups to find the ID. |
| `emails` | array | yes |  | Member Emails. 1-100 member emails. |

Output fields:

- `groupId`: Group ID
- `emails`: Emails
- `removed`: Removed (boolean)

### `heartbeat_list_channels`

**List Channels.** Lists every channel (ID, name, emoji and type: POSTS for threads, CHAT for chat, VOICE for voice), optionally only one type. Use to get a channel ID for Create Thread, Send Channel Chat Message or List Threads. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `type` | string | no |  | Type. One of `"POSTS"`, `"CHAT"`, `"VOICE"`. |

Output fields:

- `channels`: Channels
- `channels[].id`: Channel ID
- `channels[].name`: Name
- `channels[].emoji`: Emoji
- `channels[].type`: Type
- `count`: Count (number)

### `heartbeat_list_channel_categories`

**List Channel Categories.** Lists every channel category (sidebar section) with ID and name. Use to get the category ID that Create Channel requires. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `categories`: Categories
- `categories[].id`: ID
- `categories[].name`: Name
- `count`: Count (number)

### `heartbeat_create_channel_category`

**Create Channel Category.** Creates a channel category (a sidebar section that groups channels) and returns its ID and name. Use before Create Channel when no suitable category exists. Not idempotent: each call creates another category even with the same name. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |

Output fields:

- `id`: ID
- `name`: Name

### `heartbeat_create_channel`

**Create Channel.** Creates a posts (threads) or chat channel in a channel category, public or private (private: only the invited emails and group IDs can see it), and returns its ID. Get the category ID from List Channel Categories. Not idempotent: each call creates another channel. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `channelCategoryId` | string | yes |  | Channel Category ID. Use List Channel Categories to find the ID. |
| `channelType` | string | yes | `"POSTS"` | Channel Type. One of `"POSTS"`, `"CHAT"`. |
| `visibility` | string | yes |  | Visibility. Private channels are only visible to the invited members and groups. One of `"public"`, `"private"`. |
| `description` | string | no |  | Description. |
| `invitedEmails` | array | no |  | Invited Member Emails. Who can access a private channel. |
| `invitedGroupIds` | array | no |  | Invited Group IDs. Groups that can access a private channel. Use List Groups to find IDs. |
| `isReadOnly` | boolean | no |  | Read Only. Only admins and moderators can post threads. Not available for chat channels. |

Output fields:

- `id`: Channel ID
- `name`: Name
- `emoji`: Emoji
- `type`: Type
- `lookupError`: Read-Back Error

### `heartbeat_update_channel`

**Update Channel.** Changes a channel's name, description, read-only setting or access: 'public' opens it to everyone, 'restricted' limits it to the given emails and group IDs (replacing the previous list). Omitted fields stay as they are; a call with nothing to change is refused. Applying the same values again changes nothing, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channelId` | string | yes |  | Channel ID. Use List Channels to find the ID. |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `isReadOnly` | string | no | `"unchanged"` | Read Only. Only admins and moderators can post threads. Not available for chat channels. One of `"unchanged"`, `"yes"`, `"no"`. |
| `access` | string | no | `"unchanged"` | Access. One of `"unchanged"`, `"public"`, `"restricted"`. |
| `invitedEmails` | array | no |  | Allowed Member Emails. Used when Access is Restricted. Replaces the current list. |
| `invitedGroupIds` | array | no |  | Allowed Group IDs. Used when Access is Restricted. Replaces the current list. |

Output fields:

- `id`: Channel ID
- `updated`: Updated (boolean)
- `updatedFields`: Updated Fields
- `channel`: Channel
- `channel.id`: Channel ID
- `channel.name`: Name
- `channel.emoji`: Emoji
- `channel.type`: Type
- `lookupError`: Read-Back Error

### `heartbeat_delete_channel`

**Delete Channel.** Permanently deletes a channel together with its threads or chat messages. Use only when the user explicitly asks; this cannot be undone. A repeat call finds it gone and reports alreadyDeleted=true, so it is idempotent. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channelId` | string | yes |  | Channel ID. Use List Channels to find the ID. |

Output fields:

- `id`: ID
- `deleted`: Deleted (boolean)
- `alreadyDeleted`: Already Deleted (boolean)

### `heartbeat_list_channel_threads`

**List Threads.** Lists threads in a posts channel, newest first, with author ID, HTML content, link and comment count (full comments only when Include Comments is on). Use to read recent posts or find a thread ID; pass nextCursor as Starting After for older threads. hasMore can be true on an exactly full last page. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channelId` | string | yes |  | Channel ID. A posts channel. Use List Channels to find the ID. |
| `includeComments` | boolean | no | `false` | Include Comments. Also return each thread's comments (larger output). |
| `limit` | number | no | `20` | Limit. How many items to return (1-100, default 20). |
| `startingAfter` | string | no |  | Starting After (Cursor). Leave empty for the first page. To get the next page, pass the Next Cursor value from the previous run. |

Output fields:

- `threads`: Threads
- `threads[].id`: Thread ID
- `threads[].channelID`: Channel ID
- `threads[].userID`: Author User ID
- `threads[].content`: Content (html)
- `threads[].createdAt`: Created At (datetime)
- `threads[].url`: Thread URL (url)
- `threads[].files`: Files
- `threads[].commentCount`: Comment Count (number)
- `threads[].comments`: Comments
- `threads[].comments[].id`: Comment ID
- `threads[].comments[].userID`: Author User ID
- `threads[].comments[].content`: Content (html)
- `threads[].comments[].createdAt`: Created At (datetime)
- `threads[].comments[].images`: Images
- `threads[].comments[].files`: Files
- `threads[].comments[].children`: Replies
- `threads[].comments[].children[].id`: Comment ID
- `threads[].comments[].children[].userID`: Author User ID
- `threads[].comments[].children[].content`: Content (html)
- `threads[].comments[].children[].createdAt`: Created At (datetime)
- `nextCursor`: Next Cursor
- `hasMore`: Has More (boolean)

### `heartbeat_get_thread`

**Get Thread.** Returns one thread by ID with its HTML content, author ID, channel, link and all comments with their replies (two levels). Use to read a discussion before replying. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `threadId` | string | yes |  | Thread ID. Use List Threads to find the ID. |

Output fields:

- `id`: Thread ID
- `channelID`: Channel ID
- `userID`: Author User ID
- `content`: Content (html)
- `createdAt`: Created At (datetime)
- `url`: Thread URL (url)
- `files`: Files
- `user`: Author
- `user.id`: User ID
- `user.name`: Name
- `user.email`: Email (email)
- `comments`: Comments
- `comments[].id`: Comment ID
- `comments[].userID`: Author User ID
- `comments[].content`: Content (html)
- `comments[].createdAt`: Created At (datetime)
- `comments[].images`: Images
- `comments[].files`: Files
- `comments[].children`: Replies
- `comments[].children[].id`: Comment ID
- `comments[].children[].userID`: Author User ID
- `comments[].children[].content`: Content (html)
- `comments[].children[].createdAt`: Created At (datetime)

### `heartbeat_create_thread`

**Create Thread.** Posts a new thread in a posts channel as the API-key admin or another admin, with HTML-subset text; @<user or group ID> mentions notify those people. Use for announcements; get the channel ID from List Channels (type POSTS). Not idempotent: each call posts again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channelId` | string | yes |  | Channel ID. A posts channel. Use List Channels to find the ID. |
| `text` | string | yes |  | Text. Plain text is sent as paragraphs (one per line). HTML is also supported: p, a, b, h1, h2, h3, ul, li and br (other tags are removed; text outside p, h1-h3 or ul blocks is dropped by Heartbeat). Mention a member or group with @ followed by their ID, for example @3f2b6c1e-8d4a-4f6b-9c1d-2e5a7b8c9d0e;… |
| `authorUserId` | string | no |  | Author (Admin User ID). User ID of an admin to post as. Leave empty to post as the admin who created the API key. Use List Members to find admin IDs. |
| `createdAt` | ISO date-time string | no |  | Created At. Optional backdated creation time, for example when migrating posts. Defaults to now. |

Output fields:

- `id`: Thread ID
- `channelID`: Channel ID
- `userID`: Author User ID
- `content`: Content (html)
- `createdAt`: Created At (datetime)
- `url`: Thread URL (url)
- `files`: Files
- `comments`: Comments
- `comments[].id`: Comment ID
- `comments[].userID`: Author User ID
- `comments[].content`: Content (html)
- `comments[].createdAt`: Created At (datetime)
- `comments[].images`: Images
- `comments[].files`: Files
- `comments[].children`: Replies
- `comments[].children[].id`: Comment ID
- `comments[].children[].userID`: Author User ID
- `comments[].children[].content`: Content (html)
- `comments[].children[].createdAt`: Created At (datetime)

### `heartbeat_create_comment`

**Reply to Thread.** Adds a comment to a thread, or a reply under an existing top-level comment when Parent Comment ID is given (Heartbeat has two levels), as the API-key admin or another admin; @<ID> mentions notify people. Get IDs from Get Thread. Not idempotent: each call posts another comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `threadId` | string | yes |  | Thread ID. Use List Threads to find the ID. |
| `text` | string | yes |  | Text. Plain text is sent as paragraphs (one per line). HTML is also supported: p, a, b, h1, h2, h3, ul, li and br (other tags are removed; text outside p, h1-h3 or ul blocks is dropped by Heartbeat). Mention a member or group with @ followed by their ID, for example @3f2b6c1e-8d4a-4f6b-9c1d-2e5a7b8c9d0e;… |
| `parentCommentId` | string | no |  | Parent Comment ID. Reply under this top-level comment. Leave empty to comment on the thread itself. |
| `authorUserId` | string | no |  | Author (Admin User ID). User ID of an admin to post as. Leave empty to post as the admin who created the API key. Use List Members to find admin IDs. |
| `createdAt` | ISO date-time string | no |  | Created At. Optional backdated creation time. Defaults to now. |

Output fields:

- `id`: Comment ID
- `userID`: Author User ID
- `content`: Content (html)
- `createdAt`: Created At (datetime)
- `images`: Images
- `files`: Files
- `children`: Replies
- `children[].id`: Comment ID
- `children[].userID`: Author User ID
- `children[].content`: Content (html)
- `children[].createdAt`: Created At (datetime)
- `threadId`: Thread ID
- `parentCommentId`: Parent Comment ID

### `heartbeat_send_chat_message`

**Send Channel Chat Message.** Sends a message to a chat channel (type CHAT from List Channels) as the API-key admin or another admin; members of the channel can be notified. Returns the message ID when it can be matched right after sending, otherwise null. Not idempotent: each call sends another message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channelId` | string | yes |  | Channel ID. A chat channel. Use List Channels to find the ID. |
| `text` | string | yes |  | Text. Plain text is sent as paragraphs (one per line). HTML is also supported: p, a, b, h1, h2, h3, ul, li and br (other tags are removed; text outside p, h1-h3 or ul blocks is dropped by Heartbeat). Mention a member or group with @ followed by their ID, for example @3f2b6c1e-8d4a-4f6b-9c1d-2e5a7b8c9d0e;… |
| `fromUserId` | string | no |  | Sender (Admin User ID). User ID of an admin to post as. Leave empty to post as the admin who created the API key. Use List Members to find admin IDs. |

Output fields:

- `channelId`: Channel ID
- `sent`: Sent (boolean)
- `messageId`: Message ID
- `message`: Message
- `message.id`: Message ID
- `message.userID`: Sender User ID
- `message.content`: Content (html)
- `message.createdAt`: Sent At (datetime)
- `message.images`: Images
- `message.files`: Files
- `lookupError`: Read-Back Error

### `heartbeat_list_chat_messages`

**List Channel Chat Messages.** Lists messages in a chat channel, newest first, with sender ID, HTML content, attachments and time. Use to read recent chat; pass nextCursor as Starting After for older messages while hasMore is true. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `channelId` | string | yes |  | Channel ID. A chat channel. Use List Channels to find the ID. |
| `limit` | number | no | `50` | Limit. How many items to return (1-100, default 50). |
| `startingAfter` | string | no |  | Starting After (Cursor). Leave empty for the first page. To get the next page, pass the Next Cursor value from the previous run. |

Output fields:

- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].userID`: Sender User ID
- `messages[].content`: Content (html)
- `messages[].createdAt`: Sent At (datetime)
- `messages[].images`: Images
- `messages[].files`: Files
- `nextCursor`: Next Cursor
- `hasMore`: Has More (boolean)

### `heartbeat_send_direct_message`

**Send Direct Message.** Sends a direct message from an admin (the API-key admin, or the admin in Sender) to one member by user ID; the member is notified. Get IDs from List Members. When Sender is set it also returns the chat ID, link and message ID. Not idempotent: each call sends another message. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `toUserId` | string | yes |  | Recipient User ID. Use List Members or Find Member by Email to find the ID. |
| `text` | string | yes |  | Text. Plain text is sent as paragraphs (one per line). HTML is also supported: p, a, b, h1, h2, h3, ul, li and br (other tags are removed; text outside p, h1-h3 or ul blocks is dropped by Heartbeat). Mention a member or group with @ followed by their ID, for example @3f2b6c1e-8d4a-4f6b-9c1d-2e5a7b8c9d0e;… |
| `fromUserId` | string | no |  | Sender (Admin User ID). User ID of an admin to post as. Leave empty to post as the admin who created the API key. Use List Members to find admin IDs. |

Output fields:

- `to`: Recipient User ID
- `from`: Sender User ID
- `sent`: Sent (boolean)
- `chatId`: Chat ID
- `chatUrl`: Chat URL (url)
- `messageId`: Message ID
- `lookupError`: Read-Back Error

### `heartbeat_get_or_create_direct_chat`

**Get Direct Chat.** Returns the chat ID and link of the direct chat between two users, creating an empty chat if they have none (no message is sent). Use to get a chat ID for List Direct Messages or a link to share. Calling again returns the same chat, so it is idempotent. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `userId1` | string | yes |  | First User ID. Use List Members to find the ID. |
| `userId2` | string | yes |  | Second User ID. Use List Members to find the ID. |

Output fields:

- `chatID`: Chat ID
- `url`: Chat URL (url)

### `heartbeat_list_direct_messages`

**List Direct Messages.** Returns the 100 most recent messages (sender ID, HTML content, time) of a direct chat by chat ID. Only chats that include at least one admin can be read. Get the chat ID from Get Direct Chat or the New Direct Message trigger. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `chatId` | string | yes |  | Chat ID. Use Get Direct Chat to find the ID. |

Output fields:

- `chatId`: Chat ID
- `messages`: Messages
- `messages[].id`: Message ID
- `messages[].userID`: Sender User ID
- `messages[].content`: Content (html)
- `messages[].createdAt`: Sent At (datetime)
- `messages[].images`: Images
- `messages[].files`: Files
- `count`: Count (number)

### `heartbeat_list_events`

**List Events.** Lists community events (ID, name, description, start/end time, recurring flag, invited users and groups), optionally only those for a group ID or starting within a time range. Use to find upcoming events or an event ID. Recurring events show their original start time. totalMatching counts all matches even when the list is cut at the limit. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `groupId` | string | no |  | Group ID. Only events assigned to this group. Use List Groups to find the ID. |
| `startsAfter` | ISO date-time string | no |  | Starts After. Only events whose start time is at or after this time. |
| `startsBefore` | ISO date-time string | no |  | Starts Before. Only events whose start time is before this time. |
| `limit` | number | no | `100` | Limit. How many items to return (1-1000, default 100). |

Output fields:

- `events`: Events
- `events[].id`: Event ID
- `events[].name`: Name
- `events[].description`: Description (html)
- `events[].startTime`: Start Time (datetime)
- `events[].endTime`: End Time (datetime)
- `events[].recurring`: Recurring (boolean)
- `events[].createdAt`: Created At (datetime)
- `events[].createdBy`: Created By (User ID)
- `events[].invitedUsers`: Invited User IDs
- `events[].invitedGroups`: Invited Group IDs
- `events[].coverImage`: Cover Image (image)
- `count`: Count (number)
- `totalMatching`: Total Matching (number)
- `truncated`: Truncated (boolean)

### `heartbeat_get_event`

**Get Event.** Returns one event by ID with name, description, start/end time, recurring flag, creator, invited users and groups; with Include Occurrences it also lists every occurrence of a recurring event. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `eventId` | string | yes |  | Event ID. Use List Events to find the ID. |
| `includeInstances` | boolean | no | `false` | Include Occurrences. Also list the start and end time of each occurrence (for recurring events). |

Output fields:

- `id`: Event ID
- `name`: Name
- `description`: Description (html)
- `startTime`: Start Time (datetime)
- `endTime`: End Time (datetime)
- `recurring`: Recurring (boolean)
- `createdAt`: Created At (datetime)
- `createdBy`: Created By (User ID)
- `invitedUsers`: Invited User IDs
- `invitedGroups`: Invited Group IDs
- `coverImage`: Cover Image (image)
- `instances`: Occurrences
- `instances[].startTime`: Start Time (datetime)
- `instances[].endTime`: End Time (datetime)

### `heartbeat_get_event_attendance`

**Get Event Attendance.** Returns attendance for the last 10 occurrences of an event (one for a one-off event): start/end time and attendees with name, email and whether they are a member. For an event that has not happened yet it returns happened=false with no occurrences instead of failing. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `eventId` | string | yes |  | Event ID. Use List Events to find the ID. |

Output fields:

- `eventId`: Event ID
- `happened`: Has Happened (boolean)
- `instances`: Occurrences
- `instances[].startTime`: Start Time (datetime)
- `instances[].endTime`: End Time (datetime)
- `instances[].attendees`: Attendees
- `instances[].attendees[].id`: User ID
- `instances[].attendees[].name`: Name
- `instances[].attendees[].email`: Email (email)
- `instances[].attendees[].isUser`: Is Member (boolean)

### `heartbeat_create_event`

**Create Event.** Creates a community event with a start time, duration in minutes and location (a new Heartbeat voice channel, Zoom if the community has the Zoom integration, or custom text), inviting members or guests by email and groups by ID. Emails that are not members get an external invite. Always pass invitees: with none, Heartbeat limited the event to the Administrator group in testing (the API docs say it is open to everyone). Invitees are notified. Not idempotent: each call creates another event. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. |
| `description` | string | no |  | Description. |
| `startTime` | ISO date-time string | yes |  | Start Time. ISO 8601, for example 2026-10-13T15:00:00Z. |
| `durationMinutes` | number | yes |  | Duration (Minutes). |
| `location` | string | yes | `"HEARTBEAT"` | Location. Heartbeat creates a voice channel for the event. Zoom needs the Zoom integration connected in your Heartbeat settings. One of `"HEARTBEAT"`, `"ZOOM"`, `"CUSTOM"`. |
| `customLocation` | string | no |  | Custom Location. Used when Location is Custom, for example an address or a meeting link. |
| `invitedEmails` | array | no |  | Invited Emails. Members are invited in Heartbeat; other emails get an external invitation. |
| `invitedGroupIds` | array | no |  | Invited Group IDs. Use List Groups to find IDs. Add invitees: with none, Heartbeat may limit the event to admins. |

Output fields:

- `id`: Event ID
- `name`: Name
- `description`: Description (html)
- `startTime`: Start Time (datetime)
- `endTime`: End Time (datetime)
- `recurring`: Recurring (boolean)
- `createdAt`: Created At (datetime)
- `createdBy`: Created By (User ID)
- `invitedUsers`: Invited User IDs
- `invitedGroups`: Invited Group IDs
- `coverImage`: Cover Image (image)
- `location`: Location
- `location.type`: Type
- `location.voiceChannelID`: Voice Channel ID
- `location.locationStr`: Custom Location
- `lookupError`: Read-Back Error

### `heartbeat_list_invitations`

**List Invitation Links.** Lists every invitation link (ID, 6-character code, role and groups new members get). Use to find an invitation ID for Invite Emails to Invitation Link. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `invitations`: Invitation Links
- `invitations[].id`: Invitation Link ID
- `invitations[].code`: Code
- `invitations[].role`: Role
- `invitations[].role.id`: ID
- `invitations[].role.name`: Name
- `invitations[].groups`: Groups
- `invitations[].groups[].id`: ID
- `invitations[].groups[].name`: Name
- `count`: Count (number)

### `heartbeat_create_invitation_link`

**Create Invitation Link.** Creates an invitation link; people who join through it get the given role ID and group IDs. Returns the link ID and its 6-character code. No email is sent. Not idempotent: each call creates another link. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `roleId` | string | yes |  | Role ID. Use List Roles to find the ID. |
| `groupIds` | array | no |  | Group IDs. Groups new members join. Use List Groups to find IDs. |

Output fields:

- `id`: Invitation Link ID
- `code`: Code
- `role`: Role
- `role.id`: ID
- `role.name`: Name
- `groups`: Groups
- `groups[].id`: ID
- `groups[].name`: Name

### `heartbeat_add_emails_to_invitation`

**Invite Emails to Invitation Link.** Adds emails to an invitation link so those people can sign up with its role and groups; when Send Invitation Email is Yes, Heartbeat emails each of them an invitation. Get the ID from List Invitation Links. Not idempotent when emails are sent: repeating sends them again. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `invitationId` | string | yes |  | Invitation Link ID. Use List Invitation Links to find the ID. |
| `emails` | array | yes |  | Emails. 1-100 email addresses. |
| `sendEmail` | string | yes |  | Send Invitation Email. Yes emails each person an invitation now. No only allows them to sign up through the link. One of `"yes"`, `"no"`. |

Output fields:

- `invitationId`: Invitation Link ID
- `emails`: Emails
- `emailSent`: Invitation Email Sent (boolean)

### `heartbeat_list_courses`

**List Courses.** Lists every course with its cohorts, modules and lessons (IDs and names). Use to find lesson IDs for Get Lesson or Mark Lessons Completed. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `courses`: Courses
- `courses[].id`: Course ID
- `courses[].name`: Name
- `courses[].description`: Description
- `courses[].thumbnail`: Thumbnail (image)
- `courses[].cohorts`: Cohorts
- `courses[].cohorts[].id`: ID
- `courses[].cohorts[].name`: Name
- `courses[].cohorts[].modules`: Modules
- `courses[].cohorts[].modules[].id`: ID
- `courses[].cohorts[].modules[].name`: Name
- `courses[].cohorts[].modules[].lessons`: Lessons
- `courses[].cohorts[].modules[].lessons[].id`: ID
- `courses[].cohorts[].modules[].lessons[].name`: Name
- `count`: Count (number)

### `heartbeat_get_lesson`

**Get Lesson.** Returns one course lesson by ID with title, Markdown content, author and embedded cards. Use to read or summarise lesson material; get the ID from List Courses. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `lessonId` | string | yes |  | Lesson ID. Use List Courses to find the ID. |

Output fields:

- `id`: Lesson ID
- `title`: Title
- `content`: Content (Markdown)
- `createdAt`: Created At (datetime)
- `createdBy`: Created By (User ID)
- `communityEmbedCards`: Embedded Cards
- `communityEmbedCards[].id`: Card ID
- `communityEmbedCards[].title`: Title
- `communityEmbedCards[].description`: Description

### `heartbeat_list_documents`

**List Documents.** Lists community documents (wiki pages) with ID, title and link, one page at a time. Use to find a document ID for Get Document; pass nextCursor as Starting After for the next page. hasMore can be true on an exactly full last page. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `limit` | number | no | `50` | Limit. How many items to return (1-100, default 50). |
| `startingAfter` | string | no |  | Starting After (Cursor). Leave empty for the first page. To get the next page, pass the Next Cursor value from the previous run. |

Output fields:

- `documents`: Documents
- `documents[].id`: Document ID
- `documents[].name`: Title
- `documents[].link`: Link (url)
- `nextCursor`: Next Cursor
- `hasMore`: Has More (boolean)

### `heartbeat_get_document`

**Get Document.** Returns a wiki document's title, link and full Markdown content by ID. Use to read or summarise community knowledge after List Documents. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `documentId` | string | yes |  | Document ID. Use List Documents to find the ID. |

Output fields:

- `id`: Document ID
- `name`: Title
- `link`: Link (url)
- `content`: Content (Markdown)

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

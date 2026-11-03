# SkyPrep

SkyPrep is a powerful Learning Management System (LMS) designed to help businesses and organizations deliver effective training and educational content to their employees and users.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-skyprep'
  version: '0.0.9'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `SECRET_TEXT`: API Key

> Skyprep API Key

## Actions

### `enrollAUserIntoACource`

**Enroll a User Into a Course.** Enrolls a SkyPrep user into a specific course, identifying the user by their user ID and targeting the course by its course ID. Use to grant a learner access to course content. Not idempotent: each call registers an enrollment as a side effect. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_id` | string | yes |  | User. Select the user. A value the product loads from the provider, such as an id; write the value itself. |
| `course_id` | string | yes |  | Course. Select the course. A value the product loads from the provider, such as an id; write the value itself. |

### `enrollAUserIntoAUserGroup`

**Enroll a User Into a User Group.** Enrolls a SkyPrep user into a user group, identifying the user either by email or by user ID (selectable via the identifier type), with an optional enrollment expiration date. Use to add a learner to a group so they inherit its course assignments. Not idempotent: each call registers a group enrollment as a side effect. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_identifier` | string | yes |  | User Identifier Type. Choose whether to identify the user by email or ID. One of `"email"`, `"user_id"`. |
| `user_email` | string | no |  | User Email. The email address of the user to enroll. |
| `user_id` | string | yes |  | User. Select the user. A value the product loads from the provider, such as an id; write the value itself. |
| `user_group_id` | number | yes |  | User Group ID. The ID of the user group to enroll the user into. |
| `user_group_enrollment_expiration_date` | string | no |  | Enrollment Expiration Date. Optional: The date when the enrollment will expire (e.g., "2024-12-31") |

### `updateUser`

**Update User.** Updates an existing SkyPrep user's profile fields (name, role, title, contact details, notification preferences, access and password-expiration dates), keyed on the required user email; omitted fields are left unchanged. Use to modify a known user's attributes. Idempotent: repeating with the same input yields the same end state. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `user_email` | string | yes |  | User Email. The email address of the user to update (required) |
| `first_name` | string | no |  | First Name. The first name of the user. |
| `last_name` | string | no |  | Last Name. The last name of the user. |
| `role` | string | no |  | Role. The role of the user. One of `"email"`, `"user_id"`. |
| `title` | string | no |  | Title. The title/position of the user. |
| `cell` | string | no |  | Cell Phone. The cell phone number of the user. |
| `work_phone` | string | no |  | Work Phone. The work phone number of the user. |
| `address` | string | no |  | Address. The address of the user. |
| `card_no` | string | no |  | Card/ID Number. The unique user identifier (e.g. student #, badge #) |
| `email_notifications` | boolean | no |  | Email Notifications. Whether the user receives email notifications. |
| `sms_notifications` | boolean | no |  | SMS Notifications. Whether the user receives SMS notifications (requires Twilio integration) |
| `access_start_date` | string | no |  | Access Start Date. The date when the user can start accessing content (e.g., "July 31, 2015") |
| `access_end_date` | string | no |  | Access End Date. The date when the user can no longer access content (e.g., "July 30, 2017") |
| `password_expiration_date` | string | no |  | Password Expiration Date. The date when the user password expires (e.g., "July 19, 2022") |

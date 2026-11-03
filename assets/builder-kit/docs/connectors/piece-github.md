# GitHub

Developer platform that allows developers to create, store, manage and share their code

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-github'
  version: '0.10.1'
```

Categories: DEVELOPER_TOOLS. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

> Authenticate to GitHub. Platform admins can configure this with either OAuth App credentials or GitHub App credentials (Apps use the same authorize/token endpoints — only the client_id differs). When using a GitHub App, the listed scopes are ignored and the App's installation permissions apply instead.

### `CUSTOM_AUTH`: GitHub App

> Authenticate as a GitHub App installation. Calls are made by the App's bot identity (e.g. `app-name[bot]`). The App must be installed on the target repos with the permissions required by the actions you intend to run (e.g. Issues: Read & write, Contents: Read & write, Administration: Read & write for webhook triggers).

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `appId` | string | yes |  | App ID or Client ID. Either the numeric App ID (e.g. `12345`) or the Client ID (e.g. `Iv23li...`) of your GitHub App. The Client ID is recommended for new Apps. Found at Settings → Developer settings → GitHub Apps → your app. |
| `installationId` | string | yes |  | Installation ID. The installation ID for the org/user where the App is installed. Visible in the installation URL: `…/installations/{id}`. |
| `privateKey` | string | yes |  | Private Key. The PEM-encoded RSA private key generated for your GitHub App (paste the contents of the `.pem` file). |

### `SECRET_TEXT`: Personal Access Token

> Authenticate with a GitHub personal access token (classic or fine-grained). Generate one at Settings → Developer settings → Personal access tokens. Grant it the scopes/permissions required by the actions and triggers you intend to run (e.g. `repo` and `admin:repo_hook` for a classic token).

## Actions

### `github_create_issue`

**Create Issue.** Opens a new issue in a GitHub repository with a title and optional body, labels, and assignees. Use to file a bug, task, or request in a specified repo. Not idempotent: each call creates a separate issue even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository` | string | yes |  | Repository. Repositories your connection can access. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. |
| `description` | string | no |  | Description. Markdown is supported. |
| `labels` | array | no |  | Labels. The repository's existing labels. Values the product loads from the provider, such as ids; write an array of them. |
| `assignees` | array | no |  | Assignees. People who can be assigned in this repository. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `body`: Issue
- `body.number`: Issue Number (number)
- `body.title`: Title
- `body.state`: State
- `body.state_reason`: State Reason
- `body.body`: Body
- `body.html_url`: URL (url)
- `body.locked`: Locked (boolean)
- `body.comments`: Comment Count (number)
- `body.author_association`: Author Association
- `body.created_at`: Created At (datetime)
- `body.updated_at`: Updated At (datetime)
- `body.closed_at`: Closed At (datetime)
- `body.user`: Author
- `body.user.login`: Username
- `body.user.id`: User ID (number)
- `body.user.html_url`: Profile URL (url)
- `body.user.avatar_url`: Avatar (image)
- `body.user.type`: Type
- `body.assignees`: Assignees
- `body.assignees[].login`: Username
- `body.assignees[].id`: User ID (number)
- `body.assignees[].html_url`: Profile URL (url)
- `body.assignees[].avatar_url`: Avatar (image)
- `body.assignees[].type`: Type
- `body.labels`: Labels
- `body.labels[].name`: Name
- `body.labels[].color`: Color
- `body.labels[].description`: Description
- `body.labels[].default`: Default (boolean)
- `body.milestone`: Milestone
- `body.milestone.number`: Number (number)
- `body.milestone.title`: Title
- `body.milestone.description`: Description
- `body.milestone.state`: State
- `body.milestone.open_issues`: Open Issues (number)
- `body.milestone.closed_issues`: Closed Issues (number)
- `body.milestone.due_on`: Due On (datetime)
- `body.milestone.html_url`: URL (url)
- `body.milestone.creator`: Creator
- `body.milestone.creator.login`: Username
- `body.milestone.creator.id`: User ID (number)
- `body.milestone.creator.html_url`: Profile URL (url)
- `body.milestone.creator.avatar_url`: Avatar (image)
- `body.milestone.creator.type`: Type

### `getIssueInformation`

**Get Issue Information.** Fetches the full details of a single issue in a repository by its issue number. Use when you already know the issue number and need its current state, title, body, labels, or assignees. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository` | string | yes |  | Repository. Repositories your connection can access. A value the product loads from the provider, such as an id; write the value itself. |
| `issue_number` | number | yes |  | Issue Number. The number shown after # on GitHub. |

Output fields:

- `body`: Issue
- `body.number`: Issue Number (number)
- `body.title`: Title
- `body.state`: State
- `body.state_reason`: State Reason
- `body.body`: Body
- `body.html_url`: URL (url)
- `body.locked`: Locked (boolean)
- `body.comments`: Comment Count (number)
- `body.author_association`: Author Association
- `body.created_at`: Created At (datetime)
- `body.updated_at`: Updated At (datetime)
- `body.closed_at`: Closed At (datetime)
- `body.user`: Author
- `body.user.login`: Username
- `body.user.id`: User ID (number)
- `body.user.html_url`: Profile URL (url)
- `body.user.avatar_url`: Avatar (image)
- `body.user.type`: Type
- `body.assignees`: Assignees
- `body.assignees[].login`: Username
- `body.assignees[].id`: User ID (number)
- `body.assignees[].html_url`: Profile URL (url)
- `body.assignees[].avatar_url`: Avatar (image)
- `body.assignees[].type`: Type
- `body.labels`: Labels
- `body.labels[].name`: Name
- `body.labels[].color`: Color
- `body.labels[].description`: Description
- `body.labels[].default`: Default (boolean)
- `body.milestone`: Milestone
- `body.milestone.number`: Number (number)
- `body.milestone.title`: Title
- `body.milestone.description`: Description
- `body.milestone.state`: State
- `body.milestone.open_issues`: Open Issues (number)
- `body.milestone.closed_issues`: Closed Issues (number)
- `body.milestone.due_on`: Due On (datetime)
- `body.milestone.html_url`: URL (url)
- `body.milestone.creator`: Creator
- `body.milestone.creator.login`: Username
- `body.milestone.creator.id`: User ID (number)
- `body.milestone.creator.html_url`: Profile URL (url)
- `body.milestone.creator.avatar_url`: Avatar (image)
- `body.milestone.creator.type`: Type

### `createCommentOnAIssue`

**Create Comment on Issue.** Posts a comment on an issue (or pull request, which shares the issue number space) in a repository. Use to add a reply or note to an existing issue/PR identified by its number. Not idempotent: each call appends a new comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository` | string | yes |  | Repository. Repositories your connection can access. A value the product loads from the provider, such as an id; write the value itself. |
| `issue_number` | number | yes |  | Issue Number. Pull request numbers work too. |
| `comment` | string | yes |  | Comment. Markdown is supported. |

Output fields:

- `body`: Comment
- `body.id`: Comment ID (number)
- `body.body`: Body
- `body.html_url`: URL (url)
- `body.author_association`: Author Association
- `body.created_at`: Created At (datetime)
- `body.updated_at`: Updated At (datetime)
- `body.user`: Author
- `body.user.login`: Username
- `body.user.id`: User ID (number)
- `body.user.html_url`: Profile URL (url)
- `body.user.avatar_url`: Avatar (image)
- `body.user.type`: Type

### `lockIssue`

**Lock Issue.** Locks an issue (by number) so only collaborators can comment, optionally recording a lock reason (off-topic, too heated, resolved, or spam). Use to freeze discussion on an issue or pull request. Idempotent: re-locking an already-locked issue leaves it locked. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository` | string | yes |  | Repository. Repositories your connection can access. A value the product loads from the provider, such as an id; write the value itself. |
| `issue_number` | number | yes |  | Issue Number. The number shown after # on GitHub. |
| `lock_reason` | string | no |  | Lock Reason. Shown on the issue's timeline. A value the product loads from the provider, such as an id; write the value itself. |

### `unlockIssue`

**Unlock Issue.** Removes the conversation lock from an issue (by number) so anyone can comment again. Use to re-open discussion on a previously locked issue or pull request. Idempotent: unlocking an already-unlocked issue leaves it unlocked. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository` | string | yes |  | Repository. Repositories your connection can access. A value the product loads from the provider, such as an id; write the value itself. |
| `issue_number` | number | yes |  | Issue Number. The number shown after # on GitHub. |

### `rawGraphqlQuery`

**Raw GraphQL Query.** Sends an arbitrary GraphQL query or mutation to GitHub's GraphQL API with optional variables. Use as an escape hatch when no dedicated action covers the needed operation. Idempotency depends entirely on the query you pass — a read query is safe to repeat, a mutation is not. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `query` | string | yes |  | Query. A query or mutation in GraphQL syntax. |
| `variables` | object | no |  | Variables. Values for the $variables your query declares. |

### `github_create_pull_request_review_comment`

**Create Pull Request Review Comment.** Posts an inline review comment on a pull request, anchored to a specific commit SHA, file path, and diff position. Use to comment on a particular line of changed code in a PR (not a general PR comment — use Create Comment on a Issue for that). Not idempotent: each call adds a new review comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository` | string | yes |  | Repository. Repositories your connection can access. A value the product loads from the provider, such as an id; write the value itself. |
| `pull_number` | number | yes |  | Pull Request Number. The number shown after # on GitHub. |
| `commit_id` | string | yes |  | Commit SHA. Use the pull request's latest commit. |
| `path` | string | yes |  | File Path. Relative to the repository root. |
| `body` | string | yes |  | Comment. Markdown is supported. |
| `position` | number | yes |  | Position. Lines down from the first @@ hunk header in this file. |

Output fields:

- `body`: Comment
- `body.id`: Comment ID (number)
- `body.body`: Body
- `body.html_url`: URL (url)
- `body.path`: File Path
- `body.line`: Line (number)
- `body.side`: Side
- `body.start_line`: Start Line (number)
- `body.position`: Position (number)
- `body.commit_id`: Commit SHA
- `body.diff_hunk`: Diff Hunk
- `body.pull_request_url`: Pull Request URL (url)
- `body.author_association`: Author Association
- `body.created_at`: Created At (datetime)
- `body.updated_at`: Updated At (datetime)
- `body.user`: Author
- `body.user.login`: Username
- `body.user.id`: User ID (number)
- `body.user.html_url`: Profile URL (url)
- `body.user.avatar_url`: Avatar (image)
- `body.user.type`: Type

### `github_create_commit_comment`

**Create Commit Comment.** Posts a comment on a specific commit identified by its SHA, optionally anchored to a file path and diff position. Use to leave feedback on a committed change directly on the commit. Not idempotent: each call adds a new comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository` | string | yes |  | Repository. Repositories your connection can access. A value the product loads from the provider, such as an id; write the value itself. |
| `sha` | string | yes |  | Commit SHA. The full or short commit hash. |
| `body` | string | yes |  | Comment. Markdown is supported. |
| `path` | string | no |  | File Path. Relative to the repository root. |
| `position` | number | no |  | Position. Lines down from the first @@ hunk header. Needs a file path. |

Output fields:

- `body`: Comment
- `body.id`: Comment ID (number)
- `body.body`: Body
- `body.html_url`: URL (url)
- `body.path`: File Path
- `body.position`: Position (number)
- `body.line`: Line (number)
- `body.commit_id`: Commit SHA
- `body.author_association`: Author Association
- `body.created_at`: Created At (datetime)
- `body.updated_at`: Updated At (datetime)
- `body.user`: Author
- `body.user.login`: Username
- `body.user.id`: User ID (number)
- `body.user.html_url`: Profile URL (url)
- `body.user.avatar_url`: Avatar (image)
- `body.user.type`: Type

### `github_create_discussion_comment`

**Create Discussion Comment.** Posts a comment on a GitHub Discussion (via the GraphQL API) identified by its discussion ID. Use to reply to a repository discussion thread. Not idempotent: each call adds a new comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository` | string | yes |  | Repository. Repositories your connection can access. A value the product loads from the provider, such as an id; write the value itself. |
| `discussion_number` | number | yes |  | Discussion Number. The number shown after # on GitHub. |
| `body` | string | yes |  | Comment. Markdown is supported. |

### `add_labels_to_issue`

**Add Labels to Issue.** Adds one or more labels to an existing issue (by number) in a repository, leaving any labels already on the issue in place. Use to tag or categorize an issue. Idempotent in effect: re-adding a label the issue already has does not duplicate it. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository` | string | yes |  | Repository. Repositories your connection can access. A value the product loads from the provider, such as an id; write the value itself. |
| `issue_number` | string | yes |  | Issue. Open issues only. A value the product loads from the provider, such as an id; write the value itself. |
| `labels` | array | yes |  | Labels. The repository's existing labels. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `body`: Labels
- `body[].name`: Name
- `body[].color`: Color
- `body[].description`: Description
- `body[].default`: Default (boolean)

### `create_branch`

**Create Branch.** Creates a new branch in a repository pointing at the tip of a chosen source branch. Use to start a feature or working branch from an existing one. Not idempotent: a second call with the same branch name fails because the ref already exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository` | string | yes |  | Repository. Repositories your connection can access. A value the product loads from the provider, such as an id; write the value itself. |
| `source_branch` | string | yes |  | Source Branch. The new branch starts from this branch's latest commit. A value the product loads from the provider, such as an id; write the value itself. |
| `new_branch_name` | string | yes |  | New Branch Name. |

Output fields:

- `body`: Reference
- `body.ref`: Reference
- `body.url`: API URL (url)
- `body.object`: Object
- `body.object.sha`: SHA
- `body.object.type`: Type
- `body.object.url`: URL (url)

### `delete_branch`

**Delete Branch.** Permanently deletes a branch (git ref under heads/) from a repository. Use to clean up a merged or stale branch. Effectively idempotent for the end state (the branch ends up gone), but a repeat call on an already-deleted branch returns a not-found error. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository` | string | yes |  | Repository. Repositories your connection can access. A value the product loads from the provider, such as an id; write the value itself. |
| `branch` | string | yes |  | Branch. A value the product loads from the provider, such as an id; write the value itself. |

### `update_issue`

**Update Issue.** Edits an existing issue (by number) in a repository, setting only the fields you provide — title, body, state (open/closed) and state reason, milestone, labels, or assignees. Use to modify, close, or reopen an issue. Idempotent: applying the same field values again leaves the issue in the same state. Note that labels and assignees here replace the existing set rather than append. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository` | string | yes |  | Repository. Repositories your connection can access. A value the product loads from the provider, such as an id; write the value itself. |
| `issue_number` | string | yes |  | Issue. Open issues only. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | no |  | Title. |
| `body` | string | no |  | Description. Markdown is supported. |
| `state` | string | no |  | State. One of `"open"`, `"closed"`. |
| `state_reason` | string | no |  | State Reason. Why the issue was closed or reopened. Ignored unless State changes. One of `"completed"`, `"not_planned"`, `"reopened"`, `"duplicate"`. |
| `milestone` | string | no |  | Milestone. Open milestones only. A value the product loads from the provider, such as an id; write the value itself. |
| `labels` | array | no |  | Labels. The repository's existing labels. Values the product loads from the provider, such as ids; write an array of them. |
| `assignees` | array | no |  | Assignees. People who can be assigned in this repository. Values the product loads from the provider, such as ids; write an array of them. |

Output fields:

- `body`: Issue
- `body.number`: Issue Number (number)
- `body.title`: Title
- `body.state`: State
- `body.state_reason`: State Reason
- `body.body`: Body
- `body.html_url`: URL (url)
- `body.locked`: Locked (boolean)
- `body.comments`: Comment Count (number)
- `body.author_association`: Author Association
- `body.created_at`: Created At (datetime)
- `body.updated_at`: Updated At (datetime)
- `body.closed_at`: Closed At (datetime)
- `body.user`: Author
- `body.user.login`: Username
- `body.user.id`: User ID (number)
- `body.user.html_url`: Profile URL (url)
- `body.user.avatar_url`: Avatar (image)
- `body.user.type`: Type
- `body.assignees`: Assignees
- `body.assignees[].login`: Username
- `body.assignees[].id`: User ID (number)
- `body.assignees[].html_url`: Profile URL (url)
- `body.assignees[].avatar_url`: Avatar (image)
- `body.assignees[].type`: Type
- `body.labels`: Labels
- `body.labels[].name`: Name
- `body.labels[].color`: Color
- `body.labels[].description`: Description
- `body.labels[].default`: Default (boolean)
- `body.milestone`: Milestone
- `body.milestone.number`: Number (number)
- `body.milestone.title`: Title
- `body.milestone.description`: Description
- `body.milestone.state`: State
- `body.milestone.open_issues`: Open Issues (number)
- `body.milestone.closed_issues`: Closed Issues (number)
- `body.milestone.due_on`: Due On (datetime)
- `body.milestone.html_url`: URL (url)
- `body.milestone.creator`: Creator
- `body.milestone.creator.login`: Username
- `body.milestone.creator.id`: User ID (number)
- `body.milestone.creator.html_url`: Profile URL (url)
- `body.milestone.creator.avatar_url`: Avatar (image)
- `body.milestone.creator.type`: Type

### `find_branch`

**Find Branch.** Looks up a branch in a repository by its exact name and reports whether it exists along with its details. Use to check for a branch or fetch its tip before acting on it; a missing branch is reported as not-found rather than raising an error. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository` | string | yes |  | Repository. Repositories your connection can access. A value the product loads from the provider, such as an id; write the value itself. |
| `branch` | string | yes |  | Branch Name. Case-sensitive. |

Output fields:

- `found`: Found (boolean)
- `result`: Branch
- `result.name`: Name
- `result.protected`: Protected (boolean)
- `result.commit`: Commit
- `result.commit.sha`: SHA
- `result.commit.html_url`: URL (url)
- `result.commit.commit`: Details
- `result.commit.commit.message`: Message
- `result.commit.commit.author`: Author
- `result.commit.commit.author.name`: Name
- `result.commit.commit.author.email`: Email (email)
- `result.commit.commit.author.date`: Date (datetime)

### `find_issue`

**Find Issue.** Searches a repository for an issue whose title matches the given text, filtered by state (open, closed, or all), and returns the top match plus whether any was found. Use to locate an issue by title when you do not have its number. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository` | string | yes |  | Repository. Repositories your connection can access. A value the product loads from the provider, such as an id; write the value itself. |
| `title` | string | yes |  | Title. Words to look for in issue titles. |
| `state` | string | yes |  | State. Which issues to search. One of `"open"`, `"closed"`, `"all"`. |

Output fields:

- `found`: Found (boolean)
- `result`: Matching Issues
- `result[].number`: Issue Number (number)
- `result[].title`: Title
- `result[].state`: State
- `result[].state_reason`: State Reason
- `result[].body`: Body
- `result[].html_url`: URL (url)
- `result[].locked`: Locked (boolean)
- `result[].comments`: Comment Count (number)
- `result[].author_association`: Author Association
- `result[].created_at`: Created At (datetime)
- `result[].updated_at`: Updated At (datetime)
- `result[].closed_at`: Closed At (datetime)
- `result[].user`: Author
- `result[].user.login`: Username
- `result[].user.id`: User ID (number)
- `result[].user.html_url`: Profile URL (url)
- `result[].user.avatar_url`: Avatar (image)
- `result[].user.type`: Type
- `result[].assignees`: Assignees
- `result[].assignees[].login`: Username
- `result[].assignees[].id`: User ID (number)
- `result[].assignees[].html_url`: Profile URL (url)
- `result[].assignees[].avatar_url`: Avatar (image)
- `result[].assignees[].type`: Type
- `result[].labels`: Labels
- `result[].labels[].name`: Name
- `result[].labels[].color`: Color
- `result[].labels[].description`: Description
- `result[].labels[].default`: Default (boolean)
- `result[].milestone`: Milestone
- `result[].milestone.number`: Number (number)
- `result[].milestone.title`: Title
- `result[].milestone.description`: Description
- `result[].milestone.state`: State
- `result[].milestone.open_issues`: Open Issues (number)
- `result[].milestone.closed_issues`: Closed Issues (number)
- `result[].milestone.due_on`: Due On (datetime)
- `result[].milestone.html_url`: URL (url)
- `result[].milestone.creator`: Creator
- `result[].milestone.creator.login`: Username
- `result[].milestone.creator.id`: User ID (number)
- `result[].milestone.creator.html_url`: Profile URL (url)
- `result[].milestone.creator.avatar_url`: Avatar (image)
- `result[].milestone.creator.type`: Type

### `find_user`

**Find User.** Looks up a GitHub user by their login (username) and reports whether they exist along with their public profile. Use to verify a username or fetch a user profile; an unknown username is reported as not-found rather than raising an error. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Username. The name after github.com/ in their profile URL. |

Output fields:

- `found`: Found (boolean)
- `result`: User
- `result.login`: Username
- `result.id`: User ID (number)
- `result.name`: Name
- `result.html_url`: Profile URL (url)
- `result.avatar_url`: Avatar (image)
- `result.type`: Type
- `result.company`: Company
- `result.blog`: Blog (url)
- `result.location`: Location
- `result.email`: Email (email)
- `result.bio`: Bio
- `result.twitter_username`: Twitter Username
- `result.public_repos`: Public Repos (number)
- `result.public_gists`: Public Gists (number)
- `result.followers`: Followers (number)
- `result.following`: Following (number)
- `result.created_at`: Created At (datetime)
- `result.updated_at`: Updated At (datetime)

### `github_create_gist`

**Create Gist.** Creates a GitHub Gist (a standalone code/text snippet) containing a single named file with the given content, public or secret. Use to share a snippet outside any repository. Requires an OAuth or personal access token connection — it throws an error under GitHub App authentication. Not idempotent: each call creates a new gist. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `description` | string | no |  | Description. Shown above the file on the gist page. |
| `public` | boolean | no | `true` | Public. Turn off for a secret gist. Anyone with the link can still open it. |
| `filename` | string | yes |  | Filename. Include the extension so GitHub highlights the code. |
| `content` | string | yes |  | File Content. |

Output fields:

- `body`: Gist
- `body.id`: Gist ID
- `body.html_url`: URL (url)
- `body.description`: Description
- `body.public`: Public (boolean)
- `body.comments`: Comment Count (number)
- `body.created_at`: Created At (datetime)
- `body.updated_at`: Updated At (datetime)
- `body.files`: Files (an object whose keys vary)
- `body.files.filename`: Filename
- `body.files.type`: Type
- `body.files.language`: Language
- `body.files.raw_url`: Raw URL (url)
- `body.files.size`: Size (filesize)
- `body.owner`: Owner
- `body.owner.login`: Username
- `body.owner.id`: User ID (number)
- `body.owner.html_url`: Profile URL (url)
- `body.owner.avatar_url`: Avatar (image)
- `body.owner.type`: Type

### `trigger_workflow_dispatch`

**Trigger Workflow Dispatch.** Triggers a GitHub Actions workflow run on a given branch/tag, optionally passing inputs. The target workflow's YAML must declare an `on: workflow_dispatch` trigger, or the call fails. Not idempotent: every call starts a new, separate workflow run. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `repository` | string | yes |  | Repository. Repositories your connection can access. A value the product loads from the provider, such as an id; write the value itself. |
| `workflow` | string | yes |  | Workflow. Only workflows with a workflow_dispatch trigger can run. A value the product loads from the provider, such as an id; write the value itself. |
| `ref` | string | yes |  | Branch or Tag. If a branch and a tag share a name, GitHub uses the tag. A value the product loads from the provider, such as an id; write the value itself. |
| `inputs` | object | no |  | Workflow Inputs. Read from the workflow file on the chosen branch or tag. An object whose fields depend on other inputs; the product shows them. |
| `waitForCompletion` | boolean | no | `false` | Wait for Completion. Pause the flow until the run finishes or the timeout passes. |
| `waitSettings` | object | no |  | Wait Settings. Used only when Wait for Completion is on. An object whose fields depend on other inputs; the product shows them. |

### `create_issue_ai`

**Create Issue (Agent).** Opens a new issue in a GitHub repository (POST /repos/{owner}/{repo}/issues) with a title and optional body, labels, and assignees. Resolve owner/repo via List My Repositories or Search Repositories. Not idempotent: each call creates a separate issue even with identical input. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories or Search Repositories. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `title` | string | yes |  | Title. The title of the issue. |
| `body` | string | no |  | Body. The body/description of the issue. |
| `labels` | array | no |  | Labels. Label names to attach. Resolve via List Repository Labels. |
| `assignees` | array | no |  | Assignees. User logins to assign. Resolve via List Assignees. |

Output fields:

- `number`: Issue Number (number)
- `title`: Title
- `state`: State
- `state_reason`: State Reason
- `body`: Body
- `html_url`: URL (url)
- `locked`: Locked (boolean)
- `comments`: Comment Count (number)
- `author_association`: Author Association
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `closed_at`: Closed At (datetime)
- `user`: Author
- `user.login`: Username
- `user.id`: User ID (number)
- `user.html_url`: Profile URL (url)
- `user.avatar_url`: Avatar (image)
- `user.type`: Type
- `assignees`: Assignees
- `assignees[].login`: Username
- `assignees[].id`: User ID (number)
- `assignees[].html_url`: Profile URL (url)
- `assignees[].avatar_url`: Avatar (image)
- `assignees[].type`: Type
- `labels`: Labels
- `labels[].name`: Name
- `labels[].color`: Color
- `labels[].description`: Description
- `labels[].default`: Default (boolean)
- `milestone`: Milestone
- `milestone.number`: Number (number)
- `milestone.title`: Title
- `milestone.description`: Description
- `milestone.state`: State
- `milestone.open_issues`: Open Issues (number)
- `milestone.closed_issues`: Closed Issues (number)
- `milestone.due_on`: Due On (datetime)
- `milestone.html_url`: URL (url)
- `milestone.creator`: Creator
- `milestone.creator.login`: Username
- `milestone.creator.id`: User ID (number)
- `milestone.creator.html_url`: Profile URL (url)
- `milestone.creator.avatar_url`: Avatar (image)
- `milestone.creator.type`: Type

### `get_issue_ai`

**Get Issue (Agent).** Fetches a single issue (GET /repos/{owner}/{repo}/issues/{issue_number}) by its number, returning its current state, title, body, labels, and assignees. Works on pull request numbers too (issues and PRs share the number space). Resolve issue numbers via List Repository Issues or Search Issues and Pull Requests. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories or Search Repositories. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `issue_number` | number | yes |  | Issue Number. The issue (or pull request) number. Resolve via List Repository Issues or Search Issues and Pull Requests. |

Output fields:

- `number`: Issue Number (number)
- `title`: Title
- `state`: State
- `state_reason`: State Reason
- `body`: Body
- `html_url`: URL (url)
- `locked`: Locked (boolean)
- `comments`: Comment Count (number)
- `author_association`: Author Association
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `closed_at`: Closed At (datetime)
- `user`: Author
- `user.login`: Username
- `user.id`: User ID (number)
- `user.html_url`: Profile URL (url)
- `user.avatar_url`: Avatar (image)
- `user.type`: Type
- `assignees`: Assignees
- `assignees[].login`: Username
- `assignees[].id`: User ID (number)
- `assignees[].html_url`: Profile URL (url)
- `assignees[].avatar_url`: Avatar (image)
- `assignees[].type`: Type
- `labels`: Labels
- `labels[].name`: Name
- `labels[].color`: Color
- `labels[].description`: Description
- `labels[].default`: Default (boolean)
- `milestone`: Milestone
- `milestone.number`: Number (number)
- `milestone.title`: Title
- `milestone.description`: Description
- `milestone.state`: State
- `milestone.open_issues`: Open Issues (number)
- `milestone.closed_issues`: Closed Issues (number)
- `milestone.due_on`: Due On (datetime)
- `milestone.html_url`: URL (url)
- `milestone.creator`: Creator
- `milestone.creator.login`: Username
- `milestone.creator.id`: User ID (number)
- `milestone.creator.html_url`: Profile URL (url)
- `milestone.creator.avatar_url`: Avatar (image)
- `milestone.creator.type`: Type

### `list_repository_issues`

**List Repository Issues (Agent).** Lists issues in a repository (GET /repos/{owner}/{repo}/issues) with filters for state, labels, assignee, creator, milestone, since, and sort. NOTE: GitHub REST returns pull requests as issues too — items with a non-null pull_request field are PRs; filter them out if you only want issues. Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `state` | string | no |  | State. One of `"open"`, `"closed"`, `"all"`. |
| `labels` | string | no |  | Labels. Comma-separated list of label names to filter by. |
| `assignee` | string | no |  | Assignee. Filter by assignee login (or "none" / "*"). |
| `creator` | string | no |  | Creator. Filter by the login of the issue creator. |
| `milestone` | string | no |  | Milestone. Milestone number, "none", or "*". |
| `since` | string | no |  | Since. Only issues updated at or after this ISO 8601 timestamp. |
| `sort` | string | no |  | Sort. One of `"created"`, `"updated"`, `"comments"`. |
| `direction` | string | no |  | Direction. One of `"desc"`, `"asc"`. |

Output fields:

- `items`: Items
- `items[].number`: Issue Number (number)
- `items[].title`: Title
- `items[].state`: State
- `items[].state_reason`: State Reason
- `items[].body`: Body
- `items[].html_url`: URL (url)
- `items[].locked`: Locked (boolean)
- `items[].comments`: Comment Count (number)
- `items[].author_association`: Author Association
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].closed_at`: Closed At (datetime)
- `items[].user`: Author
- `items[].user.login`: Username
- `items[].user.id`: User ID (number)
- `items[].user.html_url`: Profile URL (url)
- `items[].user.avatar_url`: Avatar (image)
- `items[].user.type`: Type
- `items[].assignees`: Assignees
- `items[].assignees[].login`: Username
- `items[].assignees[].id`: User ID (number)
- `items[].assignees[].html_url`: Profile URL (url)
- `items[].assignees[].avatar_url`: Avatar (image)
- `items[].assignees[].type`: Type
- `items[].labels`: Labels
- `items[].labels[].name`: Name
- `items[].labels[].color`: Color
- `items[].labels[].description`: Description
- `items[].labels[].default`: Default (boolean)
- `items[].milestone`: Milestone
- `items[].milestone.number`: Number (number)
- `items[].milestone.title`: Title
- `items[].milestone.description`: Description
- `items[].milestone.state`: State
- `items[].milestone.open_issues`: Open Issues (number)
- `items[].milestone.closed_issues`: Closed Issues (number)
- `items[].milestone.due_on`: Due On (datetime)
- `items[].milestone.html_url`: URL (url)
- `items[].milestone.creator`: Creator
- `items[].milestone.creator.login`: Username
- `items[].milestone.creator.id`: User ID (number)
- `items[].milestone.creator.html_url`: Profile URL (url)
- `items[].milestone.creator.avatar_url`: Avatar (image)
- `items[].milestone.creator.type`: Type
- `count`: Count (number)

### `update_issue_ai`

**Update Issue (Agent).** Edits an existing issue (PATCH /repos/{owner}/{repo}/issues/{issue_number}), setting only the fields you provide — title, body, state (open/closed) with state_reason, milestone (set Clear Milestone to remove it), labels, or assignees. Use to modify, close, or reopen an issue (no separate close action). Labels and assignees here REPLACE the existing set; use Add Labels to Issue / Add Assignees to Issue to append. Idempotent: applying the same field values again leaves the issue in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories or Search Repositories. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `issue_number` | number | yes |  | Issue Number. The issue number to update. Resolve via List Repository Issues. |
| `title` | string | no |  | Title. |
| `body` | string | no |  | Body. |
| `state` | string | no |  | State. The new state of the issue (open or closed). One of `"open"`, `"closed"`. |
| `state_reason` | string | no |  | State Reason. The reason for the state change (only used if State is set). One of `"completed"`, `"not_planned"`, `"reopened"`, `"duplicate"`. |
| `milestone` | number | no |  | Milestone Number. Milestone number to associate. Resolve via List Milestones. To remove the issue's milestone instead, set Clear Milestone. |
| `clear_milestone` | boolean | no |  | Clear Milestone. Set to true to remove the issue's current milestone. Overrides Milestone Number. |
| `labels` | array | no |  | Labels. Replaces the full label set. Resolve names via List Repository Labels. |
| `assignees` | array | no |  | Assignees. Replaces the full assignee set (logins). Resolve via List Assignees. |

Output fields:

- `number`: Issue Number (number)
- `title`: Title
- `state`: State
- `state_reason`: State Reason
- `body`: Body
- `html_url`: URL (url)
- `locked`: Locked (boolean)
- `comments`: Comment Count (number)
- `author_association`: Author Association
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `closed_at`: Closed At (datetime)
- `user`: Author
- `user.login`: Username
- `user.id`: User ID (number)
- `user.html_url`: Profile URL (url)
- `user.avatar_url`: Avatar (image)
- `user.type`: Type
- `assignees`: Assignees
- `assignees[].login`: Username
- `assignees[].id`: User ID (number)
- `assignees[].html_url`: Profile URL (url)
- `assignees[].avatar_url`: Avatar (image)
- `assignees[].type`: Type
- `labels`: Labels
- `labels[].name`: Name
- `labels[].color`: Color
- `labels[].description`: Description
- `labels[].default`: Default (boolean)
- `milestone`: Milestone
- `milestone.number`: Number (number)
- `milestone.title`: Title
- `milestone.description`: Description
- `milestone.state`: State
- `milestone.open_issues`: Open Issues (number)
- `milestone.closed_issues`: Closed Issues (number)
- `milestone.due_on`: Due On (datetime)
- `milestone.html_url`: URL (url)
- `milestone.creator`: Creator
- `milestone.creator.login`: Username
- `milestone.creator.id`: User ID (number)
- `milestone.creator.html_url`: Profile URL (url)
- `milestone.creator.avatar_url`: Avatar (image)
- `milestone.creator.type`: Type

### `create_issue_comment_ai`

**Create Issue Comment (Agent).** Posts a comment on an issue (POST /repos/{owner}/{repo}/issues/{issue_number}/comments). Pull requests share the issue number space, so this also adds a general PR comment (for an inline code-review comment use Create Pull Request Review Comment instead). Not idempotent: each call appends a new comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories or Search Repositories. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `issue_number` | number | yes |  | Issue Number. The issue or pull request number to comment on. Resolve via List Repository Issues / List Pull Requests. |
| `body` | string | yes |  | Comment Body. The comment text to add. |

Output fields:

- `id`: Comment ID (number)
- `body`: Body
- `html_url`: URL (url)
- `author_association`: Author Association
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `user`: Author
- `user.login`: Username
- `user.id`: User ID (number)
- `user.html_url`: Profile URL (url)
- `user.avatar_url`: Avatar (image)
- `user.type`: Type

### `list_issue_comments`

**List Issue Comments (Agent).** Lists the comment thread on an issue (GET /repos/{owner}/{repo}/issues/{issue_number}/comments). Works on pull request numbers too (issues and PRs share the number space). Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `issue_number` | number | yes |  | Issue Number. The issue or pull request number. Resolve via List Repository Issues. |

Output fields:

- `items`: Items
- `items[].id`: Comment ID (number)
- `items[].body`: Body
- `items[].html_url`: URL (url)
- `items[].author_association`: Author Association
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].user`: Author
- `items[].user.login`: Username
- `items[].user.id`: User ID (number)
- `items[].user.html_url`: Profile URL (url)
- `items[].user.avatar_url`: Avatar (image)
- `items[].user.type`: Type
- `count`: Count (number)

### `lock_issue_ai`

**Lock Issue (Agent).** Locks an issue (PUT /repos/{owner}/{repo}/issues/{issue_number}/lock) so only collaborators can comment, optionally recording a lock reason (off-topic, too heated, resolved, or spam). Works on pull request numbers too. Use Unlock Issue to reverse. Idempotent: re-locking an already-locked issue leaves it locked. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories or Search Repositories. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `issue_number` | number | yes |  | Issue Number. The issue or pull request number to lock. Resolve via List Repository Issues. |
| `lock_reason` | string | no |  | Lock Reason. The reason for locking the issue. One of `"off-topic"`, `"too heated"`, `"resolved"`, `"spam"`. |

### `unlock_issue_ai`

**Unlock Issue (Agent).** Removes the conversation lock from an issue (DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock) so anyone can comment again. Works on pull request numbers too. Idempotent: unlocking an already-unlocked issue leaves it unlocked. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories or Search Repositories. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `issue_number` | number | yes |  | Issue Number. The issue or pull request number to unlock. Resolve via List Repository Issues. |

### `add_labels_to_issue_ai`

**Add Labels to Issue (Agent).** Adds one or more labels to an existing issue (POST /repos/{owner}/{repo}/issues/{issue_number}/labels), leaving any labels already on the issue in place (ADDITIVE). To replace the whole set use Set Issue Labels; to remove one use Remove Label from Issue. Works on pull request numbers too. Resolve label names via List Repository Labels. Idempotent in effect: re-adding a label already present does not duplicate it. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories or Search Repositories. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `issue_number` | number | yes |  | Issue Number. The issue or pull request number. Resolve via List Repository Issues. |
| `labels` | array | yes |  | Labels. Label names to add. Resolve via List Repository Labels. |

Output fields:

- `[].name`: Name
- `[].color`: Color
- `[].description`: Description
- `[].default`: Default (boolean)

### `remove_label_from_issue`

**Remove Label from Issue (Agent).** Removes one label by name from an issue (DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}). Use Add Labels to Issue to attach or Set Issue Labels to replace the whole set. Works on pull request numbers too. Resolve current labels via List Issue Labels. Idempotent: a label that is already absent ends up absent (404 if it was never present). Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `issue_number` | number | yes |  | Issue Number. The issue or pull request number. Resolve via List Repository Issues. |
| `name` | string | yes |  | Label Name. The label to remove. Resolve current labels via List Issue Labels. |

Output fields:

- `[].name`: Name
- `[].color`: Color
- `[].description`: Description
- `[].default`: Default (boolean)

### `set_issue_labels`

**Set Issue Labels (Agent).** Replaces ALL labels on an issue with the provided set (PUT /repos/{owner}/{repo}/issues/{issue_number}/labels). Differs from Add Labels to Issue (additive): any label not in the list is removed. Pass an empty array to clear all labels. Works on pull request numbers too. Resolve names via List Repository Labels. Idempotent: re-applying the same set converges to that exact set. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `issue_number` | number | yes |  | Issue Number. The issue or pull request number. Resolve via List Repository Issues. |
| `labels` | array | yes |  | Labels. The complete label set to apply (replaces existing). Empty clears all. Resolve names via List Repository Labels. |

Output fields:

- `[].name`: Name
- `[].color`: Color
- `[].description`: Description
- `[].default`: Default (boolean)

### `list_issue_labels`

**List Issue Labels (Agent).** Lists the labels currently attached to an issue (GET /repos/{owner}/{repo}/issues/{issue_number}/labels). Use this to resolve which label names to pass to Remove Label from Issue. Works on pull request numbers too. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `issue_number` | number | yes |  | Issue Number. The issue or pull request number. Resolve via List Repository Issues. |

Output fields:

- `items`: Items
- `items[].name`: Name
- `items[].color`: Color
- `items[].description`: Description
- `items[].default`: Default (boolean)
- `count`: Count (number)

### `add_assignees_to_issue`

**Add Assignees to Issue (Agent).** Assigns up to 10 users to an issue (POST /repos/{owner}/{repo}/issues/{issue_number}/assignees), keeping existing assignees (ADDITIVE). Works on pull request numbers too. Resolve assignable logins via List Assignees. Idempotent: re-adding an existing assignee is a no-op. Note: logins that cannot be assigned are silently ignored by GitHub. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `issue_number` | number | yes |  | Issue Number. The issue or pull request number. Resolve via List Repository Issues. |
| `assignees` | array | yes |  | Assignees. User logins to assign (max 10). Resolve via List Assignees. |

Output fields:

- `number`: Issue Number (number)
- `title`: Title
- `state`: State
- `state_reason`: State Reason
- `body`: Body
- `html_url`: URL (url)
- `locked`: Locked (boolean)
- `comments`: Comment Count (number)
- `author_association`: Author Association
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `closed_at`: Closed At (datetime)
- `user`: Author
- `user.login`: Username
- `user.id`: User ID (number)
- `user.html_url`: Profile URL (url)
- `user.avatar_url`: Avatar (image)
- `user.type`: Type
- `assignees`: Assignees
- `assignees[].login`: Username
- `assignees[].id`: User ID (number)
- `assignees[].html_url`: Profile URL (url)
- `assignees[].avatar_url`: Avatar (image)
- `assignees[].type`: Type
- `labels`: Labels
- `labels[].name`: Name
- `labels[].color`: Color
- `labels[].description`: Description
- `labels[].default`: Default (boolean)
- `milestone`: Milestone
- `milestone.number`: Number (number)
- `milestone.title`: Title
- `milestone.description`: Description
- `milestone.state`: State
- `milestone.open_issues`: Open Issues (number)
- `milestone.closed_issues`: Closed Issues (number)
- `milestone.due_on`: Due On (datetime)
- `milestone.html_url`: URL (url)
- `milestone.creator`: Creator
- `milestone.creator.login`: Username
- `milestone.creator.id`: User ID (number)
- `milestone.creator.html_url`: Profile URL (url)
- `milestone.creator.avatar_url`: Avatar (image)
- `milestone.creator.type`: Type

### `remove_assignees_from_issue`

**Remove Assignees from Issue (Agent).** Removes the given users from an issue (DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees). Works on pull request numbers too. Idempotent: removing a user who is not assigned ends in the same state. Get current assignees via Get Issue. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `issue_number` | number | yes |  | Issue Number. The issue or pull request number. Resolve via List Repository Issues. |
| `assignees` | array | yes |  | Assignees. User logins to unassign. |

Output fields:

- `number`: Issue Number (number)
- `title`: Title
- `state`: State
- `state_reason`: State Reason
- `body`: Body
- `html_url`: URL (url)
- `locked`: Locked (boolean)
- `comments`: Comment Count (number)
- `author_association`: Author Association
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `closed_at`: Closed At (datetime)
- `user`: Author
- `user.login`: Username
- `user.id`: User ID (number)
- `user.html_url`: Profile URL (url)
- `user.avatar_url`: Avatar (image)
- `user.type`: Type
- `assignees`: Assignees
- `assignees[].login`: Username
- `assignees[].id`: User ID (number)
- `assignees[].html_url`: Profile URL (url)
- `assignees[].avatar_url`: Avatar (image)
- `assignees[].type`: Type
- `labels`: Labels
- `labels[].name`: Name
- `labels[].color`: Color
- `labels[].description`: Description
- `labels[].default`: Default (boolean)
- `milestone`: Milestone
- `milestone.number`: Number (number)
- `milestone.title`: Title
- `milestone.description`: Description
- `milestone.state`: State
- `milestone.open_issues`: Open Issues (number)
- `milestone.closed_issues`: Closed Issues (number)
- `milestone.due_on`: Due On (datetime)
- `milestone.html_url`: URL (url)
- `milestone.creator`: Creator
- `milestone.creator.login`: Username
- `milestone.creator.id`: User ID (number)
- `milestone.creator.html_url`: Profile URL (url)
- `milestone.creator.avatar_url`: Avatar (image)
- `milestone.creator.type`: Type

### `list_assignees`

**List Assignees (Agent).** Lists the users assignable to issues and pull requests in a repository (GET /repos/{owner}/{repo}/assignees). Use to resolve valid logins for Add Assignees to Issue. Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |

Output fields:

- `items`: Items
- `items[].login`: Username
- `items[].id`: User ID (number)
- `items[].html_url`: Profile URL (url)
- `items[].avatar_url`: Avatar (image)
- `items[].type`: Type
- `count`: Count (number)

### `list_repository_labels`

**List Repository Labels (Agent).** Lists all labels defined in a repository (GET /repos/{owner}/{repo}/labels). Use to resolve valid label names for Add Labels to Issue, Set Issue Labels, and Remove Label from Issue. Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |

Output fields:

- `items`: Items
- `items[].name`: Name
- `items[].color`: Color
- `items[].description`: Description
- `items[].default`: Default (boolean)
- `count`: Count (number)

### `create_label`

**Create Label (Agent).** Creates a new label in a repository (POST /repos/{owner}/{repo}/labels) with a name, hex color, and optional description. To change an existing label use Update Label. Not idempotent: a second call with the same name returns 422 (already exists). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `name` | string | yes |  | Name. The label name. |
| `color` | string | no |  | Color. Six-character hex color code without the leading "#" (e.g. "f29513"). |
| `description` | string | no |  | Description. Short description of the label. |

Output fields:

- `name`: Name
- `color`: Color
- `description`: Description
- `default`: Default (boolean)

### `update_label`

**Update Label (Agent).** Updates an existing repository label by its current name (PATCH /repos/{owner}/{repo}/labels/{name}) — set a new name, color, or description. Resolve label names via List Repository Labels. Idempotent: applying the same values again leaves the label in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `name` | string | yes |  | Current Name. The current label name to update. Resolve via List Repository Labels. |
| `new_name` | string | no |  | New Name. New label name (leave empty to keep the current name). |
| `color` | string | no |  | Color. Six-character hex color code without the leading "#" (e.g. "f29513"). |
| `description` | string | no |  | Description. |

Output fields:

- `name`: Name
- `color`: Color
- `description`: Description
- `default`: Default (boolean)

### `create_pull_request`

**Create Pull Request (Agent).** Opens a pull request (POST /repos/{owner}/{repo}/pulls) from the head branch into the base branch, with a title and optional body. Set draft=true for a draft PR. For cross-fork PRs prefix head with the fork owner ("owner:branch"). Resolve branch names via List Branches. Not idempotent: each call opens a new PR. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `title` | string | yes |  | Title. |
| `head` | string | yes |  | Head Branch. The branch with your changes (e.g. "feature/x"). For a fork use "fork-owner:branch". |
| `base` | string | yes |  | Base Branch. The branch to merge into (e.g. "main"). |
| `body` | string | no |  | Body. |
| `draft` | boolean | no |  | Draft. Open as a draft pull request. |
| `maintainer_can_modify` | boolean | no |  | Maintainer Can Modify. Allow maintainers to edit the head branch. |

Output fields:

- `number`: Number (number)
- `title`: Title
- `state`: State
- `html_url`: URL (url)
- `body`: Body
- `draft`: Draft (boolean)
- `merge_commit_sha`: Merge Commit SHA
- `author_association`: Author Association
- `merged_at`: Merged At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `closed_at`: Closed At (datetime)
- `user`: Author
- `user.login`: Username
- `user.id`: User ID (number)
- `user.html_url`: Profile URL (url)
- `user.avatar_url`: Avatar (image)
- `user.type`: Type
- `assignees`: Assignees
- `assignees[].login`: Username
- `assignees[].id`: User ID (number)
- `assignees[].html_url`: Profile URL (url)
- `assignees[].avatar_url`: Avatar (image)
- `assignees[].type`: Type
- `requested_reviewers`: Requested Reviewers
- `requested_reviewers[].login`: Username
- `requested_reviewers[].id`: User ID (number)
- `requested_reviewers[].html_url`: Profile URL (url)
- `requested_reviewers[].avatar_url`: Avatar (image)
- `requested_reviewers[].type`: Type
- `labels`: Labels
- `labels[].name`: Name
- `labels[].color`: Color
- `labels[].description`: Description
- `labels[].default`: Default (boolean)
- `milestone`: Milestone
- `milestone.number`: Number (number)
- `milestone.title`: Title
- `milestone.description`: Description
- `milestone.state`: State
- `milestone.open_issues`: Open Issues (number)
- `milestone.closed_issues`: Closed Issues (number)
- `milestone.due_on`: Due On (datetime)
- `milestone.html_url`: URL (url)
- `milestone.creator`: Creator
- `milestone.creator.login`: Username
- `milestone.creator.id`: User ID (number)
- `milestone.creator.html_url`: Profile URL (url)
- `milestone.creator.avatar_url`: Avatar (image)
- `milestone.creator.type`: Type
- `head`: Head
- `head.label`: Label
- `head.ref`: Ref
- `head.sha`: SHA
- `head.user`: User
- `head.user.login`: Username
- `head.user.id`: User ID (number)
- `head.user.html_url`: Profile URL (url)
- `head.user.avatar_url`: Avatar (image)
- `head.user.type`: Type
- `base`: Base
- `base.label`: Label
- `base.ref`: Ref
- `base.sha`: SHA
- `base.user`: User
- `base.user.login`: Username
- `base.user.id`: User ID (number)
- `base.user.html_url`: Profile URL (url)
- `base.user.avatar_url`: Avatar (image)
- `base.user.type`: Type
- `merged`: Merged (boolean)
- `mergeable`: Mergeable (boolean)
- `comments`: Comment Count (number)
- `review_comments`: Review Comment Count (number)
- `commits`: Commit Count (number)
- `additions`: Additions (number)
- `deletions`: Deletions (number)
- `changed_files`: Changed Files (number)
- `merged_by`: Merged By
- `merged_by.login`: Username
- `merged_by.id`: User ID (number)
- `merged_by.html_url`: Profile URL (url)
- `merged_by.avatar_url`: Avatar (image)
- `merged_by.type`: Type

### `get_pull_request`

**Get Pull Request (Agent).** Fetches a single pull request (GET /repos/{owner}/{repo}/pulls/{pull_number}), including its mergeable state and head/base commit SHAs (head.sha feeds Create Pull Request Review Comment). Resolve PR numbers via List Pull Requests. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `pull_number` | number | yes |  | Pull Request Number. The pull request number. Resolve via List Pull Requests. |

Output fields:

- `number`: Number (number)
- `title`: Title
- `state`: State
- `html_url`: URL (url)
- `body`: Body
- `draft`: Draft (boolean)
- `merge_commit_sha`: Merge Commit SHA
- `author_association`: Author Association
- `merged_at`: Merged At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `closed_at`: Closed At (datetime)
- `user`: Author
- `user.login`: Username
- `user.id`: User ID (number)
- `user.html_url`: Profile URL (url)
- `user.avatar_url`: Avatar (image)
- `user.type`: Type
- `assignees`: Assignees
- `assignees[].login`: Username
- `assignees[].id`: User ID (number)
- `assignees[].html_url`: Profile URL (url)
- `assignees[].avatar_url`: Avatar (image)
- `assignees[].type`: Type
- `requested_reviewers`: Requested Reviewers
- `requested_reviewers[].login`: Username
- `requested_reviewers[].id`: User ID (number)
- `requested_reviewers[].html_url`: Profile URL (url)
- `requested_reviewers[].avatar_url`: Avatar (image)
- `requested_reviewers[].type`: Type
- `labels`: Labels
- `labels[].name`: Name
- `labels[].color`: Color
- `labels[].description`: Description
- `labels[].default`: Default (boolean)
- `milestone`: Milestone
- `milestone.number`: Number (number)
- `milestone.title`: Title
- `milestone.description`: Description
- `milestone.state`: State
- `milestone.open_issues`: Open Issues (number)
- `milestone.closed_issues`: Closed Issues (number)
- `milestone.due_on`: Due On (datetime)
- `milestone.html_url`: URL (url)
- `milestone.creator`: Creator
- `milestone.creator.login`: Username
- `milestone.creator.id`: User ID (number)
- `milestone.creator.html_url`: Profile URL (url)
- `milestone.creator.avatar_url`: Avatar (image)
- `milestone.creator.type`: Type
- `head`: Head
- `head.label`: Label
- `head.ref`: Ref
- `head.sha`: SHA
- `head.user`: User
- `head.user.login`: Username
- `head.user.id`: User ID (number)
- `head.user.html_url`: Profile URL (url)
- `head.user.avatar_url`: Avatar (image)
- `head.user.type`: Type
- `base`: Base
- `base.label`: Label
- `base.ref`: Ref
- `base.sha`: SHA
- `base.user`: User
- `base.user.login`: Username
- `base.user.id`: User ID (number)
- `base.user.html_url`: Profile URL (url)
- `base.user.avatar_url`: Avatar (image)
- `base.user.type`: Type
- `merged`: Merged (boolean)
- `mergeable`: Mergeable (boolean)
- `comments`: Comment Count (number)
- `review_comments`: Review Comment Count (number)
- `commits`: Commit Count (number)
- `additions`: Additions (number)
- `deletions`: Deletions (number)
- `changed_files`: Changed Files (number)
- `merged_by`: Merged By
- `merged_by.login`: Username
- `merged_by.id`: User ID (number)
- `merged_by.html_url`: Profile URL (url)
- `merged_by.avatar_url`: Avatar (image)
- `merged_by.type`: Type

### `list_pull_requests`

**List Pull Requests (Agent).** Lists pull requests in a repository (GET /repos/{owner}/{repo}/pulls) filtered by state, head (user:branch), base branch, and sort. Returns all pages. For cross-repo or qualifier-based search use Search Issues and Pull Requests. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `state` | string | no |  | State. One of `"open"`, `"closed"`, `"all"`. |
| `head` | string | no |  | Head. Filter by head branch in the form "user:branch". |
| `base` | string | no |  | Base. Filter by base branch name. |
| `sort` | string | no |  | Sort. One of `"created"`, `"updated"`, `"popularity"`, `"long-running"`. |
| `direction` | string | no |  | Direction. One of `"desc"`, `"asc"`. |

Output fields:

- `items`: Items
- `items[].number`: Number (number)
- `items[].title`: Title
- `items[].state`: State
- `items[].html_url`: URL (url)
- `items[].body`: Body
- `items[].draft`: Draft (boolean)
- `items[].merge_commit_sha`: Merge Commit SHA
- `items[].author_association`: Author Association
- `items[].merged_at`: Merged At (datetime)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].closed_at`: Closed At (datetime)
- `items[].user`: Author
- `items[].user.login`: Username
- `items[].user.id`: User ID (number)
- `items[].user.html_url`: Profile URL (url)
- `items[].user.avatar_url`: Avatar (image)
- `items[].user.type`: Type
- `items[].assignees`: Assignees
- `items[].assignees[].login`: Username
- `items[].assignees[].id`: User ID (number)
- `items[].assignees[].html_url`: Profile URL (url)
- `items[].assignees[].avatar_url`: Avatar (image)
- `items[].assignees[].type`: Type
- `items[].requested_reviewers`: Requested Reviewers
- `items[].requested_reviewers[].login`: Username
- `items[].requested_reviewers[].id`: User ID (number)
- `items[].requested_reviewers[].html_url`: Profile URL (url)
- `items[].requested_reviewers[].avatar_url`: Avatar (image)
- `items[].requested_reviewers[].type`: Type
- `items[].labels`: Labels
- `items[].labels[].name`: Name
- `items[].labels[].color`: Color
- `items[].labels[].description`: Description
- `items[].labels[].default`: Default (boolean)
- `items[].milestone`: Milestone
- `items[].milestone.number`: Number (number)
- `items[].milestone.title`: Title
- `items[].milestone.description`: Description
- `items[].milestone.state`: State
- `items[].milestone.open_issues`: Open Issues (number)
- `items[].milestone.closed_issues`: Closed Issues (number)
- `items[].milestone.due_on`: Due On (datetime)
- `items[].milestone.html_url`: URL (url)
- `items[].milestone.creator`: Creator
- `items[].milestone.creator.login`: Username
- `items[].milestone.creator.id`: User ID (number)
- `items[].milestone.creator.html_url`: Profile URL (url)
- `items[].milestone.creator.avatar_url`: Avatar (image)
- `items[].milestone.creator.type`: Type
- `items[].head`: Head
- `items[].head.label`: Label
- `items[].head.ref`: Ref
- `items[].head.sha`: SHA
- `items[].head.user`: User
- `items[].head.user.login`: Username
- `items[].head.user.id`: User ID (number)
- `items[].head.user.html_url`: Profile URL (url)
- `items[].head.user.avatar_url`: Avatar (image)
- `items[].head.user.type`: Type
- `items[].base`: Base
- `items[].base.label`: Label
- `items[].base.ref`: Ref
- `items[].base.sha`: SHA
- `items[].base.user`: User
- `items[].base.user.login`: Username
- `items[].base.user.id`: User ID (number)
- `items[].base.user.html_url`: Profile URL (url)
- `items[].base.user.avatar_url`: Avatar (image)
- `items[].base.user.type`: Type
- `count`: Count (number)

### `update_pull_request`

**Update Pull Request (Agent).** Edits a pull request (PATCH /repos/{owner}/{repo}/pulls/{pull_number}), setting only the fields you provide — title, body, state (open/closed), or base branch. Use to modify, close, or reopen a PR (no separate close action). Idempotent: applying the same values again leaves the PR in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `pull_number` | number | yes |  | Pull Request Number. The pull request number. Resolve via List Pull Requests. |
| `title` | string | no |  | Title. |
| `body` | string | no |  | Body. |
| `state` | string | no |  | State. Open or close the pull request. One of `"open"`, `"closed"`. |
| `base` | string | no |  | Base Branch. Change the base branch the PR targets. |

Output fields:

- `number`: Number (number)
- `title`: Title
- `state`: State
- `html_url`: URL (url)
- `body`: Body
- `draft`: Draft (boolean)
- `merge_commit_sha`: Merge Commit SHA
- `author_association`: Author Association
- `merged_at`: Merged At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `closed_at`: Closed At (datetime)
- `user`: Author
- `user.login`: Username
- `user.id`: User ID (number)
- `user.html_url`: Profile URL (url)
- `user.avatar_url`: Avatar (image)
- `user.type`: Type
- `assignees`: Assignees
- `assignees[].login`: Username
- `assignees[].id`: User ID (number)
- `assignees[].html_url`: Profile URL (url)
- `assignees[].avatar_url`: Avatar (image)
- `assignees[].type`: Type
- `requested_reviewers`: Requested Reviewers
- `requested_reviewers[].login`: Username
- `requested_reviewers[].id`: User ID (number)
- `requested_reviewers[].html_url`: Profile URL (url)
- `requested_reviewers[].avatar_url`: Avatar (image)
- `requested_reviewers[].type`: Type
- `labels`: Labels
- `labels[].name`: Name
- `labels[].color`: Color
- `labels[].description`: Description
- `labels[].default`: Default (boolean)
- `milestone`: Milestone
- `milestone.number`: Number (number)
- `milestone.title`: Title
- `milestone.description`: Description
- `milestone.state`: State
- `milestone.open_issues`: Open Issues (number)
- `milestone.closed_issues`: Closed Issues (number)
- `milestone.due_on`: Due On (datetime)
- `milestone.html_url`: URL (url)
- `milestone.creator`: Creator
- `milestone.creator.login`: Username
- `milestone.creator.id`: User ID (number)
- `milestone.creator.html_url`: Profile URL (url)
- `milestone.creator.avatar_url`: Avatar (image)
- `milestone.creator.type`: Type
- `head`: Head
- `head.label`: Label
- `head.ref`: Ref
- `head.sha`: SHA
- `head.user`: User
- `head.user.login`: Username
- `head.user.id`: User ID (number)
- `head.user.html_url`: Profile URL (url)
- `head.user.avatar_url`: Avatar (image)
- `head.user.type`: Type
- `base`: Base
- `base.label`: Label
- `base.ref`: Ref
- `base.sha`: SHA
- `base.user`: User
- `base.user.login`: Username
- `base.user.id`: User ID (number)
- `base.user.html_url`: Profile URL (url)
- `base.user.avatar_url`: Avatar (image)
- `base.user.type`: Type
- `merged`: Merged (boolean)
- `mergeable`: Mergeable (boolean)
- `comments`: Comment Count (number)
- `review_comments`: Review Comment Count (number)
- `commits`: Commit Count (number)
- `additions`: Additions (number)
- `deletions`: Deletions (number)
- `changed_files`: Changed Files (number)
- `merged_by`: Merged By
- `merged_by.login`: Username
- `merged_by.id`: User ID (number)
- `merged_by.html_url`: Profile URL (url)
- `merged_by.avatar_url`: Avatar (image)
- `merged_by.type`: Type

### `merge_pull_request`

**Merge Pull Request (Agent).** Merges an open pull request into its base branch (PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge) using merge, squash, or rebase. DESTRUCTIVE and irreversible — it writes commits to the base branch. Optionally pin to a head sha so it only merges if the PR has not changed. Not idempotent: re-merging an already-merged PR returns 405. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `pull_number` | number | yes |  | Pull Request Number. The pull request number. Resolve via List Pull Requests. |
| `merge_method` | string | no |  | Merge Method. One of `"merge"`, `"squash"`, `"rebase"`. |
| `commit_title` | string | no |  | Commit Title. |
| `commit_message` | string | no |  | Commit Message. |
| `sha` | string | no |  | Head SHA. If set, the merge only proceeds when the PR head still matches this SHA (get via Get Pull Request). |

### `list_pull_request_files`

**List Pull Request Files (Agent).** Lists the files changed in a pull request (GET /repos/{owner}/{repo}/pulls/{pull_number}/files), with each file's status, additions/deletions, and patch. Use to find file paths for Create Pull Request Review Comment. Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `pull_number` | number | yes |  | Pull Request Number. The pull request number. Resolve via List Pull Requests. |

Output fields:

- `items`: Items
- `items[].filename`: Filename
- `items[].status`: Status
- `items[].additions`: Additions (number)
- `items[].deletions`: Deletions (number)
- `items[].changes`: Changes (number)
- `items[].sha`: SHA
- `items[].blob_url`: Blob URL (url)
- `items[].raw_url`: Raw URL (url)
- `items[].patch`: Patch
- `count`: Count (number)

### `list_pull_request_commits`

**List Pull Request Commits (Agent).** Lists the commits contained in a pull request (GET /repos/{owner}/{repo}/pulls/{pull_number}/commits). Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `pull_number` | number | yes |  | Pull Request Number. The pull request number. Resolve via List Pull Requests. |

Output fields:

- `items`: Items
- `items[].sha`: SHA
- `items[].html_url`: URL (url)
- `items[].author`: Author
- `items[].author.login`: Username
- `items[].author.id`: User ID (number)
- `items[].author.html_url`: Profile URL (url)
- `items[].author.avatar_url`: Avatar (image)
- `items[].author.type`: Type
- `items[].committer`: Committer
- `items[].committer.login`: Username
- `items[].committer.id`: User ID (number)
- `items[].committer.html_url`: Profile URL (url)
- `items[].committer.avatar_url`: Avatar (image)
- `items[].committer.type`: Type
- `items[].commit`: Commit
- `items[].commit.message`: Message
- `items[].commit.author`: Author
- `items[].commit.author.name`: Name
- `items[].commit.author.email`: Email (email)
- `items[].commit.author.date`: Date (datetime)
- `items[].commit.committer`: Committer
- `items[].commit.committer.name`: Name
- `items[].commit.committer.email`: Email (email)
- `items[].commit.committer.date`: Date (datetime)
- `items[].commit.comment_count`: Comment Count (number)
- `count`: Count (number)

### `create_pull_request_review`

**Create Pull Request Review (Agent).** Submits a review on a pull request (POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews) with an event of APPROVE, REQUEST_CHANGES, or COMMENT and an optional summary body. Omit the event to create a PENDING review. Optional inline comments array each needs path + position/line. For a single inline comment use Create Pull Request Review Comment instead. Not idempotent: each call adds a new review. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `pull_number` | number | yes |  | Pull Request Number. The pull request number. Resolve via List Pull Requests. |
| `event` | string | no |  | Event. The review action. Omit to leave the review pending. One of `"APPROVE"`, `"REQUEST_CHANGES"`, `"COMMENT"`. |
| `body` | string | no |  | Body. The review summary text (required for REQUEST_CHANGES/COMMENT). |
| `commit_id` | string | no |  | Commit SHA. The SHA the review applies to (defaults to the latest). Get via Get Pull Request. |
| `comments` | JSON | no |  | Inline Comments. Optional array of inline comments, e.g. [{"path":"file.ts","position":5,"body":"..."}]. |

Output fields:

- `id`: Review ID (number)
- `state`: State
- `body`: Body
- `html_url`: URL (url)
- `submitted_at`: Submitted At (datetime)
- `commit_id`: Commit SHA
- `author_association`: Author Association
- `user`: Reviewer
- `user.login`: Username
- `user.id`: User ID (number)
- `user.html_url`: Profile URL (url)
- `user.avatar_url`: Avatar (image)
- `user.type`: Type

### `request_pull_request_reviewers`

**Request Pull Request Reviewers (Agent).** Requests reviews on a pull request (POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers) from user logins and/or team slugs. Provide at least one of reviewers or team_reviewers. Resolve logins via List Collaborators or Search Users. Idempotent: re-requesting an already-requested reviewer leaves the request in place. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `pull_number` | number | yes |  | Pull Request Number. The pull request number. Resolve via List Pull Requests. |
| `reviewers` | array | no |  | Reviewers. User logins to request a review from. |
| `team_reviewers` | array | no |  | Team Reviewers. Team slugs to request a review from. |

Output fields:

- `number`: Number (number)
- `title`: Title
- `state`: State
- `html_url`: URL (url)
- `body`: Body
- `draft`: Draft (boolean)
- `merge_commit_sha`: Merge Commit SHA
- `author_association`: Author Association
- `merged_at`: Merged At (datetime)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `closed_at`: Closed At (datetime)
- `user`: Author
- `user.login`: Username
- `user.id`: User ID (number)
- `user.html_url`: Profile URL (url)
- `user.avatar_url`: Avatar (image)
- `user.type`: Type
- `assignees`: Assignees
- `assignees[].login`: Username
- `assignees[].id`: User ID (number)
- `assignees[].html_url`: Profile URL (url)
- `assignees[].avatar_url`: Avatar (image)
- `assignees[].type`: Type
- `requested_reviewers`: Requested Reviewers
- `requested_reviewers[].login`: Username
- `requested_reviewers[].id`: User ID (number)
- `requested_reviewers[].html_url`: Profile URL (url)
- `requested_reviewers[].avatar_url`: Avatar (image)
- `requested_reviewers[].type`: Type
- `labels`: Labels
- `labels[].name`: Name
- `labels[].color`: Color
- `labels[].description`: Description
- `labels[].default`: Default (boolean)
- `milestone`: Milestone
- `milestone.number`: Number (number)
- `milestone.title`: Title
- `milestone.description`: Description
- `milestone.state`: State
- `milestone.open_issues`: Open Issues (number)
- `milestone.closed_issues`: Closed Issues (number)
- `milestone.due_on`: Due On (datetime)
- `milestone.html_url`: URL (url)
- `milestone.creator`: Creator
- `milestone.creator.login`: Username
- `milestone.creator.id`: User ID (number)
- `milestone.creator.html_url`: Profile URL (url)
- `milestone.creator.avatar_url`: Avatar (image)
- `milestone.creator.type`: Type
- `head`: Head
- `head.label`: Label
- `head.ref`: Ref
- `head.sha`: SHA
- `head.user`: User
- `head.user.login`: Username
- `head.user.id`: User ID (number)
- `head.user.html_url`: Profile URL (url)
- `head.user.avatar_url`: Avatar (image)
- `head.user.type`: Type
- `base`: Base
- `base.label`: Label
- `base.ref`: Ref
- `base.sha`: SHA
- `base.user`: User
- `base.user.login`: Username
- `base.user.id`: User ID (number)
- `base.user.html_url`: Profile URL (url)
- `base.user.avatar_url`: Avatar (image)
- `base.user.type`: Type
- `merged`: Merged (boolean)
- `mergeable`: Mergeable (boolean)
- `comments`: Comment Count (number)
- `review_comments`: Review Comment Count (number)
- `commits`: Commit Count (number)
- `additions`: Additions (number)
- `deletions`: Deletions (number)
- `changed_files`: Changed Files (number)
- `merged_by`: Merged By
- `merged_by.login`: Username
- `merged_by.id`: User ID (number)
- `merged_by.html_url`: Profile URL (url)
- `merged_by.avatar_url`: Avatar (image)
- `merged_by.type`: Type

### `create_pull_request_review_comment_ai`

**Create Pull Request Review Comment (Agent).** Posts an inline review comment on a pull request (POST /repos/{owner}/{repo}/pulls/{pull_number}/comments), anchored to a commit SHA, file path, and diff position. Use to comment on a specific line of changed code (for a general PR comment use Create Issue Comment instead). Get commit_id/path via List Pull Request Files or Get Pull Request. Not idempotent: each call adds a new review comment. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories or Search Repositories. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `pull_number` | number | yes |  | Pull Request Number. The pull request number. Resolve via List Pull Requests. |
| `commit_id` | string | yes |  | Commit SHA. The SHA of the commit to comment on. Get via Get Pull Request (head.sha) or List Pull Request Commits. |
| `path` | string | yes |  | File Path. The relative path of the file to comment on. Get via List Pull Request Files. |
| `body` | string | yes |  | Comment Body. The content of the review comment. |
| `position` | number | yes |  | Position. The line index in the diff (counting from the first @@ hunk header) where the comment is placed. |

Output fields:

- `id`: Comment ID (number)
- `body`: Body
- `html_url`: URL (url)
- `path`: File Path
- `line`: Line (number)
- `side`: Side
- `start_line`: Start Line (number)
- `position`: Position (number)
- `commit_id`: Commit SHA
- `diff_hunk`: Diff Hunk
- `pull_request_url`: Pull Request URL (url)
- `author_association`: Author Association
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `user`: Author
- `user.login`: Username
- `user.id`: User ID (number)
- `user.html_url`: Profile URL (url)
- `user.avatar_url`: Avatar (image)
- `user.type`: Type

### `list_pull_request_review_comments`

**List Pull Request Review Comments (Agent).** Lists the inline (code-anchored) review comments on a pull request (GET /repos/{owner}/{repo}/pulls/{pull_number}/comments). For general PR comments use List Issue Comments; for review summaries use List Pull Request Reviews. Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `pull_number` | number | yes |  | Pull Request Number. The pull request number. Resolve via List Pull Requests. |

Output fields:

- `items`: Items
- `items[].id`: Comment ID (number)
- `items[].body`: Body
- `items[].html_url`: URL (url)
- `items[].path`: File Path
- `items[].line`: Line (number)
- `items[].side`: Side
- `items[].start_line`: Start Line (number)
- `items[].position`: Position (number)
- `items[].commit_id`: Commit SHA
- `items[].diff_hunk`: Diff Hunk
- `items[].pull_request_url`: Pull Request URL (url)
- `items[].author_association`: Author Association
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].user`: Author
- `items[].user.login`: Username
- `items[].user.id`: User ID (number)
- `items[].user.html_url`: Profile URL (url)
- `items[].user.avatar_url`: Avatar (image)
- `items[].user.type`: Type
- `count`: Count (number)

### `list_pull_request_reviews`

**List Pull Request Reviews (Agent).** Lists the reviews on a pull request (GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews), each with its state (APPROVED, CHANGES_REQUESTED, COMMENTED), body, and reviewer. For the inline code comments use List Pull Request Review Comments. Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `pull_number` | number | yes |  | Pull Request Number. The pull request number. Resolve via List Pull Requests. |

Output fields:

- `items`: Items
- `items[].id`: Review ID (number)
- `items[].state`: State
- `items[].body`: Body
- `items[].html_url`: URL (url)
- `items[].submitted_at`: Submitted At (datetime)
- `items[].commit_id`: Commit SHA
- `items[].author_association`: Author Association
- `items[].user`: Reviewer
- `items[].user.login`: Username
- `items[].user.id`: User ID (number)
- `items[].user.html_url`: Profile URL (url)
- `items[].user.avatar_url`: Avatar (image)
- `items[].user.type`: Type
- `count`: Count (number)

### `get_repository`

**Get Repository (Agent).** Fetches a single repository (GET /repos/{owner}/{repo}) including its default_branch, visibility, and your permissions. Use to discover the default branch before file or branch operations. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |

Output fields:

- `id`: Repository ID (number)
- `name`: Name
- `full_name`: Full Name
- `private`: Private (boolean)
- `html_url`: URL (url)
- `description`: Description
- `fork`: Fork (boolean)
- `owner`: Owner
- `owner.login`: Username
- `owner.id`: User ID (number)
- `owner.html_url`: Profile URL (url)
- `owner.avatar_url`: Avatar (image)
- `owner.type`: Type
- `homepage`: Homepage (url)
- `language`: Language
- `default_branch`: Default Branch
- `visibility`: Visibility
- `topics`: Topics
- `stargazers_count`: Stars (number)
- `watchers_count`: Watchers (number)
- `forks_count`: Forks (number)
- `open_issues_count`: Open Issues (number)
- `size`: Size (number)
- `archived`: Archived (boolean)
- `disabled`: Disabled (boolean)
- `has_issues`: Has Issues (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `pushed_at`: Pushed At (datetime)
- `license`: License
- `license.key`: Key
- `license.name`: Name
- `license.spdx_id`: SPDX ID

### `list_my_repositories`

**List My Repositories (Agent).** Lists the repositories the connected user can access (GET /user/repos) — the top-level resolver for owner/repo used by most other GitHub atomics. Filter by visibility, affiliation, and sort. Returns all pages. Under GitHub App auth the token is a bot, so this reflects the installation, not a user. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `visibility` | string | no |  | Visibility. One of `"all"`, `"public"`, `"private"`. |
| `affiliation` | string | no |  | Affiliation. Comma-separated: owner, collaborator, organization_member. |
| `sort` | string | no |  | Sort. One of `"created"`, `"updated"`, `"pushed"`, `"full_name"`. |

Output fields:

- `items`: Items
- `items[].id`: Repository ID (number)
- `items[].name`: Name
- `items[].full_name`: Full Name
- `items[].private`: Private (boolean)
- `items[].html_url`: URL (url)
- `items[].description`: Description
- `items[].fork`: Fork (boolean)
- `items[].owner`: Owner
- `items[].owner.login`: Username
- `items[].owner.id`: User ID (number)
- `items[].owner.html_url`: Profile URL (url)
- `items[].owner.avatar_url`: Avatar (image)
- `items[].owner.type`: Type
- `items[].homepage`: Homepage (url)
- `items[].language`: Language
- `items[].default_branch`: Default Branch
- `items[].visibility`: Visibility
- `items[].topics`: Topics
- `items[].stargazers_count`: Stars (number)
- `items[].watchers_count`: Watchers (number)
- `items[].forks_count`: Forks (number)
- `items[].open_issues_count`: Open Issues (number)
- `items[].size`: Size (number)
- `items[].archived`: Archived (boolean)
- `items[].disabled`: Disabled (boolean)
- `items[].has_issues`: Has Issues (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].pushed_at`: Pushed At (datetime)
- `items[].license`: License
- `items[].license.key`: Key
- `items[].license.name`: Name
- `items[].license.spdx_id`: SPDX ID
- `count`: Count (number)

### `list_user_repositories`

**List User Repositories (Agent).** Lists the public repositories owned by a specific user (GET /users/{username}/repos). For the connected account's own repos (including private) use List My Repositories. Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Username. The user login whose repositories to list. |

Output fields:

- `items`: Items
- `items[].id`: Repository ID (number)
- `items[].name`: Name
- `items[].full_name`: Full Name
- `items[].private`: Private (boolean)
- `items[].html_url`: URL (url)
- `items[].description`: Description
- `items[].fork`: Fork (boolean)
- `items[].owner`: Owner
- `items[].owner.login`: Username
- `items[].owner.id`: User ID (number)
- `items[].owner.html_url`: Profile URL (url)
- `items[].owner.avatar_url`: Avatar (image)
- `items[].owner.type`: Type
- `items[].homepage`: Homepage (url)
- `items[].language`: Language
- `items[].default_branch`: Default Branch
- `items[].visibility`: Visibility
- `items[].topics`: Topics
- `items[].stargazers_count`: Stars (number)
- `items[].watchers_count`: Watchers (number)
- `items[].forks_count`: Forks (number)
- `items[].open_issues_count`: Open Issues (number)
- `items[].size`: Size (number)
- `items[].archived`: Archived (boolean)
- `items[].disabled`: Disabled (boolean)
- `items[].has_issues`: Has Issues (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].pushed_at`: Pushed At (datetime)
- `items[].license`: License
- `items[].license.key`: Key
- `items[].license.name`: Name
- `items[].license.spdx_id`: SPDX ID
- `count`: Count (number)

### `list_organization_repositories`

**List Organization Repositories (Agent).** Lists the repositories in an organization (GET /orgs/{org}/repos). Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `org` | string | yes |  | Organization. The organization login. |

Output fields:

- `items`: Items
- `items[].id`: Repository ID (number)
- `items[].name`: Name
- `items[].full_name`: Full Name
- `items[].private`: Private (boolean)
- `items[].html_url`: URL (url)
- `items[].description`: Description
- `items[].fork`: Fork (boolean)
- `items[].owner`: Owner
- `items[].owner.login`: Username
- `items[].owner.id`: User ID (number)
- `items[].owner.html_url`: Profile URL (url)
- `items[].owner.avatar_url`: Avatar (image)
- `items[].owner.type`: Type
- `items[].homepage`: Homepage (url)
- `items[].language`: Language
- `items[].default_branch`: Default Branch
- `items[].visibility`: Visibility
- `items[].topics`: Topics
- `items[].stargazers_count`: Stars (number)
- `items[].watchers_count`: Watchers (number)
- `items[].forks_count`: Forks (number)
- `items[].open_issues_count`: Open Issues (number)
- `items[].size`: Size (number)
- `items[].archived`: Archived (boolean)
- `items[].disabled`: Disabled (boolean)
- `items[].has_issues`: Has Issues (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].pushed_at`: Pushed At (datetime)
- `items[].license`: License
- `items[].license.key`: Key
- `items[].license.name`: Name
- `items[].license.spdx_id`: SPDX ID
- `count`: Count (number)

### `create_repository`

**Create Repository (Agent).** Creates a new repository under the connected user account (POST /user/repos). Set private and auto_init (adds an initial README) as needed. For an org-owned repo use Create Organization Repository. Not idempotent: a second call with the same name returns 422 (name already exists). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `name` | string | yes |  | Name. The repository name. |
| `description` | string | no |  | Description. |
| `private` | boolean | no |  | Private. Create as a private repository. |
| `auto_init` | boolean | no |  | Auto Init. Initialize with an empty README so the repo has a default branch. |

Output fields:

- `id`: Repository ID (number)
- `name`: Name
- `full_name`: Full Name
- `private`: Private (boolean)
- `html_url`: URL (url)
- `description`: Description
- `fork`: Fork (boolean)
- `owner`: Owner
- `owner.login`: Username
- `owner.id`: User ID (number)
- `owner.html_url`: Profile URL (url)
- `owner.avatar_url`: Avatar (image)
- `owner.type`: Type
- `homepage`: Homepage (url)
- `language`: Language
- `default_branch`: Default Branch
- `visibility`: Visibility
- `topics`: Topics
- `stargazers_count`: Stars (number)
- `watchers_count`: Watchers (number)
- `forks_count`: Forks (number)
- `open_issues_count`: Open Issues (number)
- `size`: Size (number)
- `archived`: Archived (boolean)
- `disabled`: Disabled (boolean)
- `has_issues`: Has Issues (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `pushed_at`: Pushed At (datetime)
- `license`: License
- `license.key`: Key
- `license.name`: Name
- `license.spdx_id`: SPDX ID

### `create_organization_repository`

**Create Organization Repository (Agent).** Creates a new repository owned by an organization (POST /orgs/{org}/repos). Requires organization write permission. Not idempotent: a second call with the same name returns 422 (name already exists). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `org` | string | yes |  | Organization. The organization login that will own the repository. |
| `name` | string | yes |  | Name. The repository name. |
| `description` | string | no |  | Description. |
| `private` | boolean | no |  | Private. Create as a private repository. |

Output fields:

- `id`: Repository ID (number)
- `name`: Name
- `full_name`: Full Name
- `private`: Private (boolean)
- `html_url`: URL (url)
- `description`: Description
- `fork`: Fork (boolean)
- `owner`: Owner
- `owner.login`: Username
- `owner.id`: User ID (number)
- `owner.html_url`: Profile URL (url)
- `owner.avatar_url`: Avatar (image)
- `owner.type`: Type
- `homepage`: Homepage (url)
- `language`: Language
- `default_branch`: Default Branch
- `visibility`: Visibility
- `topics`: Topics
- `stargazers_count`: Stars (number)
- `watchers_count`: Watchers (number)
- `forks_count`: Forks (number)
- `open_issues_count`: Open Issues (number)
- `size`: Size (number)
- `archived`: Archived (boolean)
- `disabled`: Disabled (boolean)
- `has_issues`: Has Issues (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `pushed_at`: Pushed At (datetime)
- `license`: License
- `license.key`: Key
- `license.name`: Name
- `license.spdx_id`: SPDX ID

### `update_repository`

**Update Repository (Agent).** Updates a repository (PATCH /repos/{owner}/{repo}), setting only the fields you provide — name, description, private, default_branch, has_issues, or archived. Idempotent: applying the same values again leaves the repo in the same state. Archiving is reversible only via the GitHub UI/API by un-setting archived. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `name` | string | no |  | Name. |
| `description` | string | no |  | Description. |
| `private` | boolean | no |  | Private. |
| `default_branch` | string | no |  | Default Branch. Resolve via List Branches. |
| `has_issues` | boolean | no |  | Has Issues. |
| `archived` | boolean | no |  | Archived. Set true to archive the repository (read-only state). |

Output fields:

- `id`: Repository ID (number)
- `name`: Name
- `full_name`: Full Name
- `private`: Private (boolean)
- `html_url`: URL (url)
- `description`: Description
- `fork`: Fork (boolean)
- `owner`: Owner
- `owner.login`: Username
- `owner.id`: User ID (number)
- `owner.html_url`: Profile URL (url)
- `owner.avatar_url`: Avatar (image)
- `owner.type`: Type
- `homepage`: Homepage (url)
- `language`: Language
- `default_branch`: Default Branch
- `visibility`: Visibility
- `topics`: Topics
- `stargazers_count`: Stars (number)
- `watchers_count`: Watchers (number)
- `forks_count`: Forks (number)
- `open_issues_count`: Open Issues (number)
- `size`: Size (number)
- `archived`: Archived (boolean)
- `disabled`: Disabled (boolean)
- `has_issues`: Has Issues (boolean)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `pushed_at`: Pushed At (datetime)
- `license`: License
- `license.key`: Key
- `license.name`: Name
- `license.spdx_id`: SPDX ID

### `list_branches`

**List Branches (Agent).** Lists the branches in a repository (GET /repos/{owner}/{repo}/branches), each with its tip commit and protection flag. Use to resolve branch names for Create Branch, Create Pull Request, and file operations. Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |

Output fields:

- `items`: Items
- `items[].name`: Name
- `items[].protected`: Protected (boolean)
- `items[].commit`: Commit
- `items[].commit.sha`: SHA
- `items[].commit.html_url`: URL (url)
- `items[].commit.commit`: Details
- `items[].commit.commit.message`: Message
- `items[].commit.commit.author`: Author
- `items[].commit.commit.author.name`: Name
- `items[].commit.commit.author.email`: Email (email)
- `items[].commit.commit.author.date`: Date (datetime)
- `count`: Count (number)

### `get_branch`

**Get Branch (Agent).** Fetches a single branch (GET /repos/{owner}/{repo}/branches/{branch}), including its tip commit SHA and protection settings. Use to read the head SHA before creating a branch or comparing. Resolve branch names via List Branches. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `branch` | string | yes |  | Branch. The branch name. Resolve via List Branches. |

Output fields:

- `name`: Name
- `protected`: Protected (boolean)
- `commit`: Commit
- `commit.sha`: SHA
- `commit.html_url`: URL (url)
- `commit.commit`: Details
- `commit.commit.message`: Message
- `commit.commit.author`: Author
- `commit.commit.author.name`: Name
- `commit.commit.author.email`: Email (email)
- `commit.commit.author.date`: Date (datetime)

### `list_commits`

**List Commits (Agent).** Lists commits in a repository (GET /repos/{owner}/{repo}/commits) filtered by sha (branch or ref to start from), path, author, and since/until ISO 8601 timestamps. Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `sha` | string | no |  | SHA or Branch. Branch name or commit SHA to start listing from. |
| `path` | string | no |  | Path. Only commits touching this file path. |
| `author` | string | no |  | Author. Filter by author login or email. |
| `since` | string | no |  | Since. ISO 8601 timestamp lower bound. |
| `until` | string | no |  | Until. ISO 8601 timestamp upper bound. |

Output fields:

- `items`: Items
- `items[].sha`: SHA
- `items[].html_url`: URL (url)
- `items[].author`: Author
- `items[].author.login`: Username
- `items[].author.id`: User ID (number)
- `items[].author.html_url`: Profile URL (url)
- `items[].author.avatar_url`: Avatar (image)
- `items[].author.type`: Type
- `items[].committer`: Committer
- `items[].committer.login`: Username
- `items[].committer.id`: User ID (number)
- `items[].committer.html_url`: Profile URL (url)
- `items[].committer.avatar_url`: Avatar (image)
- `items[].committer.type`: Type
- `items[].commit`: Commit
- `items[].commit.message`: Message
- `items[].commit.author`: Author
- `items[].commit.author.name`: Name
- `items[].commit.author.email`: Email (email)
- `items[].commit.author.date`: Date (datetime)
- `items[].commit.committer`: Committer
- `items[].commit.committer.name`: Name
- `items[].commit.committer.email`: Email (email)
- `items[].commit.committer.date`: Date (datetime)
- `items[].commit.comment_count`: Comment Count (number)
- `count`: Count (number)

### `get_commit`

**Get Commit (Agent).** Fetches a single commit (GET /repos/{owner}/{repo}/commits/{ref}) by SHA, branch, or tag, including its files, stats, and parents. Resolve refs via List Commits or List Branches. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `ref` | string | yes |  | Ref. Commit SHA, branch name, or tag. Resolve via List Commits. |

Output fields:

- `sha`: SHA
- `html_url`: URL (url)
- `author`: Author
- `author.login`: Username
- `author.id`: User ID (number)
- `author.html_url`: Profile URL (url)
- `author.avatar_url`: Avatar (image)
- `author.type`: Type
- `committer`: Committer
- `committer.login`: Username
- `committer.id`: User ID (number)
- `committer.html_url`: Profile URL (url)
- `committer.avatar_url`: Avatar (image)
- `committer.type`: Type
- `commit`: Commit
- `commit.message`: Message
- `commit.author`: Author
- `commit.author.name`: Name
- `commit.author.email`: Email (email)
- `commit.author.date`: Date (datetime)
- `commit.committer`: Committer
- `commit.committer.name`: Name
- `commit.committer.email`: Email (email)
- `commit.committer.date`: Date (datetime)
- `commit.comment_count`: Comment Count (number)
- `stats`: Stats
- `stats.total`: Total (number)
- `stats.additions`: Additions (number)
- `stats.deletions`: Deletions (number)
- `files`: Files
- `files[].filename`: Filename
- `files[].status`: Status
- `files[].additions`: Additions (number)
- `files[].deletions`: Deletions (number)
- `files[].changes`: Changes (number)
- `files[].sha`: SHA
- `files[].blob_url`: Blob URL (url)
- `files[].raw_url`: Raw URL (url)
- `files[].patch`: Patch

### `compare_commits`

**Compare Commits (Agent).** Compares two refs (GET /repos/{owner}/{repo}/compare/{base}...{head}) and returns how far ahead/behind head is plus the changed files. Base and head can each be a branch, tag, or commit SHA. Resolve refs via List Branches or List Commits. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `base` | string | yes |  | Base. The base ref (branch, tag, or SHA). |
| `head` | string | yes |  | Head. The head ref to compare against the base. |

Output fields:

- `status`: Status
- `ahead_by`: Ahead By (number)
- `behind_by`: Behind By (number)
- `total_commits`: Total Commits (number)
- `html_url`: URL (url)
- `base_commit`: Base Commit
- `base_commit.sha`: SHA
- `base_commit.html_url`: URL (url)
- `base_commit.author`: Author
- `base_commit.author.login`: Username
- `base_commit.author.id`: User ID (number)
- `base_commit.author.html_url`: Profile URL (url)
- `base_commit.author.avatar_url`: Avatar (image)
- `base_commit.author.type`: Type
- `base_commit.committer`: Committer
- `base_commit.committer.login`: Username
- `base_commit.committer.id`: User ID (number)
- `base_commit.committer.html_url`: Profile URL (url)
- `base_commit.committer.avatar_url`: Avatar (image)
- `base_commit.committer.type`: Type
- `base_commit.commit`: Commit
- `base_commit.commit.message`: Message
- `base_commit.commit.author`: Author
- `base_commit.commit.author.name`: Name
- `base_commit.commit.author.email`: Email (email)
- `base_commit.commit.author.date`: Date (datetime)
- `base_commit.commit.committer`: Committer
- `base_commit.commit.committer.name`: Name
- `base_commit.commit.committer.email`: Email (email)
- `base_commit.commit.committer.date`: Date (datetime)
- `base_commit.commit.comment_count`: Comment Count (number)
- `commits`: Commits
- `commits[].sha`: SHA
- `commits[].html_url`: URL (url)
- `commits[].author`: Author
- `commits[].author.login`: Username
- `commits[].author.id`: User ID (number)
- `commits[].author.html_url`: Profile URL (url)
- `commits[].author.avatar_url`: Avatar (image)
- `commits[].author.type`: Type
- `commits[].committer`: Committer
- `commits[].committer.login`: Username
- `commits[].committer.id`: User ID (number)
- `commits[].committer.html_url`: Profile URL (url)
- `commits[].committer.avatar_url`: Avatar (image)
- `commits[].committer.type`: Type
- `commits[].commit`: Commit
- `commits[].commit.message`: Message
- `commits[].commit.author`: Author
- `commits[].commit.author.name`: Name
- `commits[].commit.author.email`: Email (email)
- `commits[].commit.author.date`: Date (datetime)
- `commits[].commit.committer`: Committer
- `commits[].commit.committer.name`: Name
- `commits[].commit.committer.email`: Email (email)
- `commits[].commit.committer.date`: Date (datetime)
- `commits[].commit.comment_count`: Comment Count (number)
- `files`: Files
- `files[].filename`: Filename
- `files[].status`: Status
- `files[].additions`: Additions (number)
- `files[].deletions`: Deletions (number)
- `files[].changes`: Changes (number)
- `files[].sha`: SHA
- `files[].blob_url`: Blob URL (url)
- `files[].raw_url`: Raw URL (url)
- `files[].patch`: Patch

### `list_contributors`

**List Contributors (Agent).** Lists the contributors to a repository (GET /repos/{owner}/{repo}/contributors) with each contributor's commit count. Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |

Output fields:

- `items`: Items
- `items[].login`: Username
- `items[].id`: User ID (number)
- `items[].html_url`: Profile URL (url)
- `items[].avatar_url`: Avatar (image)
- `items[].type`: Type
- `items[].contributions`: Contributions (number)
- `count`: Count (number)

### `list_languages`

**List Languages (Agent).** Returns the languages detected in a repository (GET /repos/{owner}/{repo}/languages) as a map of language name to byte count. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |

### `list_tags`

**List Tags (Agent).** Lists the git tags in a repository (GET /repos/{owner}/{repo}/tags), each with the commit it points at. Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |

Output fields:

- `items`: Items
- `items[].name`: Name
- `items[].zipball_url`: Zipball URL (url)
- `items[].tarball_url`: Tarball URL (url)
- `items[].commit`: Commit
- `items[].commit.sha`: SHA
- `items[].commit.url`: URL (url)
- `count`: Count (number)

### `get_file_content`

**Get File Content (Agent).** Reads repository contents at a path (GET /repos/{owner}/{repo}/contents/{path}). For a file it returns base64 content plus the blob "sha" — that sha is REQUIRED to update an existing file (Create or Update File) or to delete it (Delete File). For a directory path it returns the listing. Optionally pin to a ref (branch/tag/SHA). Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `path` | string | yes |  | Path. File or directory path within the repo (e.g. "src/index.ts"). |
| `ref` | string | no |  | Ref. Optional branch, tag, or commit SHA (defaults to the default branch). |

Output fields:

- `name`: Name
- `path`: Path
- `sha`: SHA
- `size`: Size (filesize)
- `type`: Type
- `encoding`: Encoding
- `content`: Content
- `html_url`: URL (url)
- `download_url`: Download URL (url)

### `create_or_update_file`

**Create or Update File (Agent).** Creates or updates a file (PUT /repos/{owner}/{repo}/contents/{path}) by committing base64 content with a commit message. To UPDATE an existing file you MUST pass its current blob "sha" (obtain it via Get File Content) — without the sha GitHub returns 422. To create a new file, omit the sha. Optionally target a branch (defaults to the default branch). Idempotent: writing the same content/sha converges to the same file state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `path` | string | yes |  | Path. File path within the repo (e.g. "docs/readme.md"). |
| `message` | string | yes |  | Commit Message. |
| `content` | string | yes |  | Content (base64). The new file content, base64-encoded. |
| `sha` | string | no |  | Blob SHA. REQUIRED when updating an existing file — its current blob sha from Get File Content. Omit to create a new file. |
| `branch` | string | no |  | Branch. Branch to commit to (defaults to the default branch). |

Output fields:

- `content`: Content
- `content.name`: Name
- `content.path`: Path
- `content.sha`: SHA
- `content.size`: Size (filesize)
- `content.type`: Type
- `content.html_url`: URL (url)
- `content.download_url`: Download URL (url)
- `commit`: Commit
- `commit.sha`: SHA
- `commit.html_url`: URL (url)
- `commit.message`: Message
- `commit.author`: Author
- `commit.author.name`: Name
- `commit.author.email`: Email (email)
- `commit.author.date`: Date (datetime)
- `commit.committer`: Committer
- `commit.committer.name`: Name
- `commit.committer.email`: Email (email)
- `commit.committer.date`: Date (datetime)

### `delete_file`

**Delete File (Agent).** Deletes a file (DELETE /repos/{owner}/{repo}/contents/{path}) by committing the removal. COMPOSITE: you must first call Get File Content on the same path to obtain the file's current blob "sha" and pass it here — the API rejects a delete without the correct sha. Optionally target a branch (defaults to the default branch). Destructive. Not idempotent: re-deleting a removed file returns 404. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `path` | string | yes |  | Path. File path to delete (e.g. "docs/old.md"). |
| `message` | string | yes |  | Commit Message. |
| `sha` | string | yes |  | Blob SHA. The file's current blob sha — obtain it via Get File Content first. |
| `branch` | string | no |  | Branch. Branch to commit to (defaults to the default branch). |

Output fields:

- `content`: Content
- `content.name`: Name
- `content.path`: Path
- `content.sha`: SHA
- `content.size`: Size (filesize)
- `content.type`: Type
- `content.html_url`: URL (url)
- `content.download_url`: Download URL (url)
- `commit`: Commit
- `commit.sha`: SHA
- `commit.html_url`: URL (url)
- `commit.message`: Message
- `commit.author`: Author
- `commit.author.name`: Name
- `commit.author.email`: Email (email)
- `commit.author.date`: Date (datetime)
- `commit.committer`: Committer
- `commit.committer.name`: Name
- `commit.committer.email`: Email (email)
- `commit.committer.date`: Date (datetime)

### `get_repository_tree`

**Get Repository Tree (Agent).** Returns the git tree at a tree SHA or branch name (GET /repos/{owner}/{repo}/git/trees/{tree_sha}). Set recursive=true for the full nested file inventory. Complements Get File Content (single path/dir). The tree_sha can be a branch name like "main". Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `tree_sha` | string | yes |  | Tree SHA or Branch. A tree SHA or branch name (e.g. "main"). |
| `recursive` | boolean | no |  | Recursive. Return the full nested tree instead of just the top level. |

Output fields:

- `sha`: SHA
- `url`: URL (url)
- `truncated`: Truncated (boolean)
- `tree`: Tree
- `tree[].path`: Path
- `tree[].mode`: Mode
- `tree[].type`: Type
- `tree[].sha`: SHA
- `tree[].size`: Size (number)
- `tree[].url`: URL (url)

### `create_branch_ai`

**Create Branch (Agent).** Creates a new branch pointing at the tip of a source branch. It first reads the source branch tip (GET /repos/{owner}/{repo}/branches/{source}) then creates the ref (POST /repos/{owner}/{repo}/git/refs with ref=refs/heads/<new_branch_name>). Resolve branch names via List Branches. Not idempotent: a second call with the same branch name fails because the ref already exists. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories or Search Repositories. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `source_branch` | string | yes |  | Source Branch. The branch whose tip the new branch starts from (e.g. "main"). Resolve via List Branches. |
| `new_branch_name` | string | yes |  | New Branch Name. The name for the new branch (e.g. 'feature/new-design'). |

Output fields:

- `ref`: Reference
- `url`: API URL (url)
- `object`: Object
- `object.sha`: SHA
- `object.type`: Type
- `object.url`: URL (url)

### `get_reference`

**Get Reference (Agent).** Resolves a git reference (GET /repos/{owner}/{repo}/git/ref/{ref}) such as "heads/main" or "tags/v1.0.0" to its object SHA. Use to obtain a commit sha for creating a branch. The ref must NOT include the leading "refs/". Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `ref` | string | yes |  | Ref. The ref without the "refs/" prefix, e.g. "heads/main". |

Output fields:

- `ref`: Reference
- `url`: API URL (url)
- `object`: Object
- `object.sha`: SHA
- `object.type`: Type
- `object.url`: URL (url)

### `delete_branch_ai`

**Delete Branch (Agent).** Permanently deletes a branch ref (DELETE /repos/{owner}/{repo}/git/refs/heads/{branch}). Use to clean up a merged or stale branch. Resolve branch names via List Branches. Not idempotent: a repeat call on an already-deleted branch returns a not-found error. Needs authentication.

Kind: destructive, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories or Search Repositories. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `branch` | string | yes |  | Branch. The name of the branch to delete (e.g. "feature/old"). Resolve via List Branches. |

### `search_repositories`

**Search Repositories (Agent).** Searches repositories (GET /search/repositories?q=) using GitHub query qualifiers like "language:", "stars:", "user:", "org:". Use to resolve owner/repo from a description. Returns a search result (total_count + items) capped at 1000 matches; pass page/per_page to page through. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `q` | string | yes |  | Query. Search query with optional qualifiers, e.g. "topic:cli language:go stars:>100". |
| `sort` | string | no |  | Sort. One of `"stars"`, `"forks"`, `"help-wanted-issues"`, `"updated"`. |
| `order` | string | no |  | Order. One of `"desc"`, `"asc"`. |
| `per_page` | number | no |  | Per Page. Results per page (max 100). |
| `page` | number | no |  | Page. |

Output fields:

- `total_count`: Total Count (number)
- `incomplete_results`: Incomplete Results (boolean)
- `items`: Items
- `items[].id`: Repository ID (number)
- `items[].name`: Name
- `items[].full_name`: Full Name
- `items[].private`: Private (boolean)
- `items[].html_url`: URL (url)
- `items[].description`: Description
- `items[].fork`: Fork (boolean)
- `items[].owner`: Owner
- `items[].owner.login`: Username
- `items[].owner.id`: User ID (number)
- `items[].owner.html_url`: Profile URL (url)
- `items[].owner.avatar_url`: Avatar (image)
- `items[].owner.type`: Type
- `items[].homepage`: Homepage (url)
- `items[].language`: Language
- `items[].default_branch`: Default Branch
- `items[].visibility`: Visibility
- `items[].topics`: Topics
- `items[].stargazers_count`: Stars (number)
- `items[].watchers_count`: Watchers (number)
- `items[].forks_count`: Forks (number)
- `items[].open_issues_count`: Open Issues (number)
- `items[].size`: Size (number)
- `items[].archived`: Archived (boolean)
- `items[].disabled`: Disabled (boolean)
- `items[].has_issues`: Has Issues (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].pushed_at`: Pushed At (datetime)
- `items[].license`: License
- `items[].license.key`: Key
- `items[].license.name`: Name
- `items[].license.spdx_id`: SPDX ID

### `search_issues_and_pull_requests`

**Search Issues and Pull Requests (Agent).** Searches issues and pull requests (GET /search/issues?q=) using qualifiers like "repo:owner/name", "is:issue", "is:pr", "state:open", "author:", "label:", "assignee:". The primary cross-repo issue/PR finder. Returns a search result (total_count + items) capped at 1000. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `q` | string | yes |  | Query. Search query, e.g. "repo:octocat/Hello-World is:issue is:open label:bug". |
| `sort` | string | no |  | Sort. Sort field (e.g. comments, created, updated, reactions). |
| `order` | string | no |  | Order. One of `"desc"`, `"asc"`. |
| `per_page` | number | no |  | Per Page. Results per page (max 100). |
| `page` | number | no |  | Page. |

Output fields:

- `total_count`: Total Count (number)
- `incomplete_results`: Incomplete Results (boolean)
- `items`: Items
- `items[].number`: Issue Number (number)
- `items[].title`: Title
- `items[].state`: State
- `items[].state_reason`: State Reason
- `items[].body`: Body
- `items[].html_url`: URL (url)
- `items[].locked`: Locked (boolean)
- `items[].comments`: Comment Count (number)
- `items[].author_association`: Author Association
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].closed_at`: Closed At (datetime)
- `items[].user`: Author
- `items[].user.login`: Username
- `items[].user.id`: User ID (number)
- `items[].user.html_url`: Profile URL (url)
- `items[].user.avatar_url`: Avatar (image)
- `items[].user.type`: Type
- `items[].assignees`: Assignees
- `items[].assignees[].login`: Username
- `items[].assignees[].id`: User ID (number)
- `items[].assignees[].html_url`: Profile URL (url)
- `items[].assignees[].avatar_url`: Avatar (image)
- `items[].assignees[].type`: Type
- `items[].labels`: Labels
- `items[].labels[].name`: Name
- `items[].labels[].color`: Color
- `items[].labels[].description`: Description
- `items[].labels[].default`: Default (boolean)
- `items[].milestone`: Milestone
- `items[].milestone.number`: Number (number)
- `items[].milestone.title`: Title
- `items[].milestone.description`: Description
- `items[].milestone.state`: State
- `items[].milestone.open_issues`: Open Issues (number)
- `items[].milestone.closed_issues`: Closed Issues (number)
- `items[].milestone.due_on`: Due On (datetime)
- `items[].milestone.html_url`: URL (url)
- `items[].milestone.creator`: Creator
- `items[].milestone.creator.login`: Username
- `items[].milestone.creator.id`: User ID (number)
- `items[].milestone.creator.html_url`: Profile URL (url)
- `items[].milestone.creator.avatar_url`: Avatar (image)
- `items[].milestone.creator.type`: Type

### `search_code`

**Search Code (Agent).** Searches code (GET /search/code?q=) using qualifiers like "in:file", "repo:owner/name", "language:", "path:", "filename:". The query must include at least one search term. Returns a search result (total_count + items) capped at 1000. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `q` | string | yes |  | Query. Code search query, e.g. "addClass in:file language:js repo:jquery/jquery". |
| `per_page` | number | no |  | Per Page. Results per page (max 100). |
| `page` | number | no |  | Page. |

Output fields:

- `total_count`: Total Count (number)
- `incomplete_results`: Incomplete Results (boolean)
- `items`: Items
- `items[].name`: Name
- `items[].path`: Path
- `items[].sha`: SHA
- `items[].html_url`: URL (url)
- `items[].url`: API URL (url)
- `items[].score`: Score (number)
- `items[].repository`: Repository
- `items[].repository.full_name`: Full Name
- `items[].repository.html_url`: URL (url)
- `items[].repository.description`: Description

### `search_users`

**Search Users (Agent).** Searches users and organizations (GET /search/users?q=) using qualifiers like "type:user", "type:org", "location:", "language:". Use to resolve a login from a name. Returns a search result (total_count + items) capped at 1000. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `q` | string | yes |  | Query. User search query, e.g. "tom repos:>10 location:london". |
| `per_page` | number | no |  | Per Page. Results per page (max 100). |
| `page` | number | no |  | Page. |

Output fields:

- `total_count`: Total Count (number)
- `incomplete_results`: Incomplete Results (boolean)
- `items`: Items
- `items[].login`: Username
- `items[].id`: User ID (number)
- `items[].html_url`: Profile URL (url)
- `items[].avatar_url`: Avatar (image)
- `items[].type`: Type

### `get_authenticated_user`

**Get Authenticated User (Agent).** Returns the profile of the connected account (GET /user) — the "who am I" call whose login feeds self-scoped operations. Under GitHub App auth this reflects the bot identity (e.g. "app-name[bot]"), not a human user. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

No inputs.

Output fields:

- `login`: Username
- `id`: User ID (number)
- `name`: Name
- `html_url`: Profile URL (url)
- `avatar_url`: Avatar (image)
- `type`: Type
- `company`: Company
- `blog`: Blog (url)
- `location`: Location
- `email`: Email (email)
- `bio`: Bio
- `twitter_username`: Twitter Username
- `public_repos`: Public Repos (number)
- `public_gists`: Public Gists (number)
- `followers`: Followers (number)
- `following`: Following (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)
- `total_private_repos`: Total Private Repos (number)
- `owned_private_repos`: Owned Private Repos (number)
- `private_gists`: Private Gists (number)
- `disk_usage`: Disk Usage (number)
- `collaborators`: Collaborators (number)
- `two_factor_authentication`: Two-Factor Auth (boolean)
- `plan`: Plan
- `plan.name`: Name
- `plan.space`: Space (number)
- `plan.private_repos`: Private Repos (number)
- `plan.collaborators`: Collaborators (number)

### `get_user`

**Get User (Agent).** Fetches a user's public profile (GET /users/{username}) — name, bio, public repo/follower counts, type (User or Organization). Resolve logins via Search Users. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `username` | string | yes |  | Username. The user or organization login. |

Output fields:

- `login`: Username
- `id`: User ID (number)
- `name`: Name
- `html_url`: Profile URL (url)
- `avatar_url`: Avatar (image)
- `type`: Type
- `company`: Company
- `blog`: Blog (url)
- `location`: Location
- `email`: Email (email)
- `bio`: Bio
- `twitter_username`: Twitter Username
- `public_repos`: Public Repos (number)
- `public_gists`: Public Gists (number)
- `followers`: Followers (number)
- `following`: Following (number)
- `created_at`: Created At (datetime)
- `updated_at`: Updated At (datetime)

### `list_organization_members`

**List Organization Members (Agent).** Lists the members of an organization (GET /orgs/{org}/members). Visibility is gated: private members appear only with org-read access (OAuth has it via admin:org); under GitHub App auth the bot lacks user-org context and may see a limited or empty list. Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `org` | string | yes |  | Organization. The organization login. |

Output fields:

- `items`: Items
- `items[].login`: Username
- `items[].id`: User ID (number)
- `items[].html_url`: Profile URL (url)
- `items[].avatar_url`: Avatar (image)
- `items[].type`: Type
- `count`: Count (number)

### `create_release`

**Create Release (Agent).** Creates a release (POST /repos/{owner}/{repo}/releases) for a tag. If the tag does not exist it is created from target_commitish (a branch or SHA, defaults to the default branch). Set draft/prerelease as needed. Not idempotent: each call creates a new release (and 422s if a release for the tag already exists). Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `tag_name` | string | yes |  | Tag Name. The git tag for this release (e.g. "v1.2.0"). |
| `name` | string | no |  | Release Name. |
| `body` | string | no |  | Body. Release notes. |
| `target_commitish` | string | no |  | Target Commitish. Branch or SHA the tag is created from if it does not exist. |
| `draft` | boolean | no |  | Draft. |
| `prerelease` | boolean | no |  | Prerelease. |

Output fields:

- `id`: Release ID (number)
- `tag_name`: Tag Name
- `name`: Name
- `body`: Body
- `draft`: Draft (boolean)
- `prerelease`: Prerelease (boolean)
- `target_commitish`: Target Commitish
- `html_url`: URL (url)
- `tarball_url`: Tarball URL (url)
- `zipball_url`: Zipball URL (url)
- `created_at`: Created At (datetime)
- `published_at`: Published At (datetime)
- `author`: Author
- `author.login`: Username
- `author.id`: User ID (number)
- `author.html_url`: Profile URL (url)
- `author.avatar_url`: Avatar (image)
- `author.type`: Type
- `assets`: Assets
- `assets[].name`: Name
- `assets[].label`: Label
- `assets[].content_type`: Content Type
- `assets[].state`: State
- `assets[].size`: Size (filesize)
- `assets[].download_count`: Download Count (number)
- `assets[].browser_download_url`: Download URL (url)
- `assets[].created_at`: Created At (datetime)
- `assets[].updated_at`: Updated At (datetime)
- `assets[].uploader`: Uploader
- `assets[].uploader.login`: Username
- `assets[].uploader.id`: User ID (number)
- `assets[].uploader.html_url`: Profile URL (url)
- `assets[].uploader.avatar_url`: Avatar (image)
- `assets[].uploader.type`: Type

### `list_releases`

**List Releases (Agent).** Lists the releases in a repository (GET /repos/{owner}/{repo}/releases), newest first, including drafts and prereleases. For just the latest published one use Get Latest Release. Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |

Output fields:

- `items`: Items
- `items[].id`: Release ID (number)
- `items[].tag_name`: Tag Name
- `items[].name`: Name
- `items[].body`: Body
- `items[].draft`: Draft (boolean)
- `items[].prerelease`: Prerelease (boolean)
- `items[].target_commitish`: Target Commitish
- `items[].html_url`: URL (url)
- `items[].tarball_url`: Tarball URL (url)
- `items[].zipball_url`: Zipball URL (url)
- `items[].created_at`: Created At (datetime)
- `items[].published_at`: Published At (datetime)
- `items[].author`: Author
- `items[].author.login`: Username
- `items[].author.id`: User ID (number)
- `items[].author.html_url`: Profile URL (url)
- `items[].author.avatar_url`: Avatar (image)
- `items[].author.type`: Type
- `items[].assets`: Assets
- `items[].assets[].name`: Name
- `items[].assets[].label`: Label
- `items[].assets[].content_type`: Content Type
- `items[].assets[].state`: State
- `items[].assets[].size`: Size (filesize)
- `items[].assets[].download_count`: Download Count (number)
- `items[].assets[].browser_download_url`: Download URL (url)
- `items[].assets[].created_at`: Created At (datetime)
- `items[].assets[].updated_at`: Updated At (datetime)
- `items[].assets[].uploader`: Uploader
- `items[].assets[].uploader.login`: Username
- `items[].assets[].uploader.id`: User ID (number)
- `items[].assets[].uploader.html_url`: Profile URL (url)
- `items[].assets[].uploader.avatar_url`: Avatar (image)
- `items[].assets[].uploader.type`: Type
- `count`: Count (number)

### `get_release`

**Get Release (Agent).** Fetches a single release by its numeric id (GET /repos/{owner}/{repo}/releases/{release_id}). Resolve the id via List Releases. For the latest published release use Get Latest Release. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `release_id` | number | yes |  | Release ID. The numeric release id. Resolve via List Releases. |

Output fields:

- `id`: Release ID (number)
- `tag_name`: Tag Name
- `name`: Name
- `body`: Body
- `draft`: Draft (boolean)
- `prerelease`: Prerelease (boolean)
- `target_commitish`: Target Commitish
- `html_url`: URL (url)
- `tarball_url`: Tarball URL (url)
- `zipball_url`: Zipball URL (url)
- `created_at`: Created At (datetime)
- `published_at`: Published At (datetime)
- `author`: Author
- `author.login`: Username
- `author.id`: User ID (number)
- `author.html_url`: Profile URL (url)
- `author.avatar_url`: Avatar (image)
- `author.type`: Type
- `assets`: Assets
- `assets[].name`: Name
- `assets[].label`: Label
- `assets[].content_type`: Content Type
- `assets[].state`: State
- `assets[].size`: Size (filesize)
- `assets[].download_count`: Download Count (number)
- `assets[].browser_download_url`: Download URL (url)
- `assets[].created_at`: Created At (datetime)
- `assets[].updated_at`: Updated At (datetime)
- `assets[].uploader`: Uploader
- `assets[].uploader.login`: Username
- `assets[].uploader.id`: User ID (number)
- `assets[].uploader.html_url`: Profile URL (url)
- `assets[].uploader.avatar_url`: Avatar (image)
- `assets[].uploader.type`: Type

### `get_latest_release`

**Get Latest Release (Agent).** Fetches the latest published release (GET /repos/{owner}/{repo}/releases/latest) — the most recent non-draft, non-prerelease release by date. Returns 404 if the repo has no published release. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |

Output fields:

- `id`: Release ID (number)
- `tag_name`: Tag Name
- `name`: Name
- `body`: Body
- `draft`: Draft (boolean)
- `prerelease`: Prerelease (boolean)
- `target_commitish`: Target Commitish
- `html_url`: URL (url)
- `tarball_url`: Tarball URL (url)
- `zipball_url`: Zipball URL (url)
- `created_at`: Created At (datetime)
- `published_at`: Published At (datetime)
- `author`: Author
- `author.login`: Username
- `author.id`: User ID (number)
- `author.html_url`: Profile URL (url)
- `author.avatar_url`: Avatar (image)
- `author.type`: Type
- `assets`: Assets
- `assets[].name`: Name
- `assets[].label`: Label
- `assets[].content_type`: Content Type
- `assets[].state`: State
- `assets[].size`: Size (filesize)
- `assets[].download_count`: Download Count (number)
- `assets[].browser_download_url`: Download URL (url)
- `assets[].created_at`: Created At (datetime)
- `assets[].updated_at`: Updated At (datetime)
- `assets[].uploader`: Uploader
- `assets[].uploader.login`: Username
- `assets[].uploader.id`: User ID (number)
- `assets[].uploader.html_url`: Profile URL (url)
- `assets[].uploader.avatar_url`: Avatar (image)
- `assets[].uploader.type`: Type

### `list_collaborators`

**List Collaborators (Agent).** Lists the collaborators on a repository (GET /repos/{owner}/{repo}/collaborators) with each one's permission level. Use to resolve logins for Request Pull Request Reviewers or Remove Collaborator. Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |

Output fields:

- `items`: Items
- `items[].login`: Username
- `items[].id`: User ID (number)
- `items[].html_url`: Profile URL (url)
- `items[].avatar_url`: Avatar (image)
- `items[].type`: Type
- `items[].role_name`: Role
- `items[].permissions`: Permissions
- `items[].permissions.admin`: Admin (boolean)
- `items[].permissions.maintain`: Maintain (boolean)
- `items[].permissions.push`: Push (boolean)
- `items[].permissions.triage`: Triage (boolean)
- `items[].permissions.pull`: Pull (boolean)
- `count`: Count (number)

### `add_collaborator`

**Add Collaborator (Agent).** Adds (or invites) a user as a collaborator on a repository (PUT /repos/{owner}/{repo}/collaborators/{username}) with a permission level (pull, triage, push, maintain, admin). GRANTS ACCESS — requires repo-admin. Idempotent: re-adding with the same permission converges (a pending invite is created if the user must accept). Resolve logins via Search Users. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `username` | string | yes |  | Username. The user login to add. Resolve via Search Users. |
| `permission` | string | no |  | Permission. One of `"pull"`, `"triage"`, `"push"`, `"maintain"`, `"admin"`. |

Output fields:

- `id`: Invitation ID (number)
- `permissions`: Permissions
- `created_at`: Created At (datetime)
- `html_url`: URL (url)
- `invitee`: Invitee
- `invitee.login`: Username
- `invitee.id`: User ID (number)
- `invitee.html_url`: Profile URL (url)
- `invitee.avatar_url`: Avatar (image)
- `invitee.type`: Type
- `inviter`: Inviter
- `inviter.login`: Username
- `inviter.id`: User ID (number)
- `inviter.html_url`: Profile URL (url)
- `inviter.avatar_url`: Avatar (image)
- `inviter.type`: Type
- `repository`: Repository
- `repository.full_name`: Full Name
- `repository.html_url`: URL (url)
- `repository.private`: Private (boolean)

### `remove_collaborator`

**Remove Collaborator (Agent).** Removes a collaborator from a repository (DELETE /repos/{owner}/{repo}/collaborators/{username}). REVOKES ACCESS — requires repo-admin. Idempotent: removing a user who is not a collaborator ends in the same state. Resolve current collaborators via List Collaborators. Needs authentication.

Kind: destructive, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `username` | string | yes |  | Username. The user login to remove. Resolve via List Collaborators. |

### `create_milestone`

**Create Milestone (Agent).** Creates a milestone (POST /repos/{owner}/{repo}/milestones) with a title and optional description, state, and due_on date. Not idempotent: each call creates a new milestone even with an identical title. Needs authentication.

Kind: write, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `title` | string | yes |  | Title. |
| `description` | string | no |  | Description. |
| `state` | string | no |  | State. One of `"open"`, `"closed"`. |
| `due_on` | string | no |  | Due On. ISO 8601 timestamp for the due date. |

Output fields:

- `number`: Number (number)
- `title`: Title
- `description`: Description
- `state`: State
- `open_issues`: Open Issues (number)
- `closed_issues`: Closed Issues (number)
- `due_on`: Due On (datetime)
- `html_url`: URL (url)
- `creator`: Creator
- `creator.login`: Username
- `creator.id`: User ID (number)
- `creator.html_url`: Profile URL (url)
- `creator.avatar_url`: Avatar (image)
- `creator.type`: Type

### `list_milestones`

**List Milestones (Agent).** Lists the milestones in a repository (GET /repos/{owner}/{repo}/milestones) filtered by state. Use to resolve a milestone number for Update Issue. Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `state` | string | no |  | State. One of `"open"`, `"closed"`, `"all"`. |

Output fields:

- `items`: Items
- `items[].number`: Number (number)
- `items[].title`: Title
- `items[].description`: Description
- `items[].state`: State
- `items[].open_issues`: Open Issues (number)
- `items[].closed_issues`: Closed Issues (number)
- `items[].due_on`: Due On (datetime)
- `items[].html_url`: URL (url)
- `items[].creator`: Creator
- `items[].creator.login`: Username
- `items[].creator.id`: User ID (number)
- `items[].creator.html_url`: Profile URL (url)
- `items[].creator.avatar_url`: Avatar (image)
- `items[].creator.type`: Type
- `count`: Count (number)

### `get_milestone`

**Get Milestone (Agent).** Fetches a single milestone (GET /repos/{owner}/{repo}/milestones/{milestone_number}) including its open/closed issue counts. Resolve the number via List Milestones. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `milestone_number` | number | yes |  | Milestone Number. The milestone number. Resolve via List Milestones. |

Output fields:

- `number`: Number (number)
- `title`: Title
- `description`: Description
- `state`: State
- `open_issues`: Open Issues (number)
- `closed_issues`: Closed Issues (number)
- `due_on`: Due On (datetime)
- `html_url`: URL (url)
- `creator`: Creator
- `creator.login`: Username
- `creator.id`: User ID (number)
- `creator.html_url`: Profile URL (url)
- `creator.avatar_url`: Avatar (image)
- `creator.type`: Type

### `update_milestone`

**Update Milestone (Agent).** Updates a milestone (PATCH /repos/{owner}/{repo}/milestones/{milestone_number}), setting only the fields you provide — title, state (open/closed), description, or due_on. Resolve the number via List Milestones. Idempotent: applying the same values again leaves the milestone in the same state. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |
| `milestone_number` | number | yes |  | Milestone Number. The milestone number. Resolve via List Milestones. |
| `title` | string | no |  | Title. |
| `state` | string | no |  | State. One of `"open"`, `"closed"`. |
| `description` | string | no |  | Description. |
| `due_on` | string | no |  | Due On. ISO 8601 timestamp for the due date. |

Output fields:

- `number`: Number (number)
- `title`: Title
- `description`: Description
- `state`: State
- `open_issues`: Open Issues (number)
- `closed_issues`: Closed Issues (number)
- `due_on`: Due On (datetime)
- `html_url`: URL (url)
- `creator`: Creator
- `creator.login`: Username
- `creator.id`: User ID (number)
- `creator.html_url`: Profile URL (url)
- `creator.avatar_url`: Avatar (image)
- `creator.type`: Type

### `star_repository`

**Star Repository (Agent).** Stars a repository for the connected user (PUT /user/starred/{owner}/{repo}). User-context — not available under GitHub App auth (a bot has no stars). Idempotent: re-starring an already-starred repo keeps it starred. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |

### `unstar_repository`

**Unstar Repository (Agent).** Removes the connected user's star from a repository (DELETE /user/starred/{owner}/{repo}). User-context — not available under GitHub App auth. Idempotent: unstarring an already-unstarred repo leaves it unstarred. Needs authentication.

Kind: write, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |

### `list_starred_repositories`

**List Starred Repositories (Agent).** Lists the repositories the connected user has starred (GET /user/starred). User-context — under GitHub App auth there is no user, so it is empty/unavailable. Returns all pages. Read-only and idempotent. Needs authentication.

Kind: search, safe to repeat.

No inputs.

Output fields:

- `items`: Items
- `items[].id`: Repository ID (number)
- `items[].name`: Name
- `items[].full_name`: Full Name
- `items[].private`: Private (boolean)
- `items[].html_url`: URL (url)
- `items[].description`: Description
- `items[].fork`: Fork (boolean)
- `items[].owner`: Owner
- `items[].owner.login`: Username
- `items[].owner.id`: User ID (number)
- `items[].owner.html_url`: Profile URL (url)
- `items[].owner.avatar_url`: Avatar (image)
- `items[].owner.type`: Type
- `items[].homepage`: Homepage (url)
- `items[].language`: Language
- `items[].default_branch`: Default Branch
- `items[].visibility`: Visibility
- `items[].topics`: Topics
- `items[].stargazers_count`: Stars (number)
- `items[].watchers_count`: Watchers (number)
- `items[].forks_count`: Forks (number)
- `items[].open_issues_count`: Open Issues (number)
- `items[].size`: Size (number)
- `items[].archived`: Archived (boolean)
- `items[].disabled`: Disabled (boolean)
- `items[].has_issues`: Has Issues (boolean)
- `items[].created_at`: Created At (datetime)
- `items[].updated_at`: Updated At (datetime)
- `items[].pushed_at`: Pushed At (datetime)
- `items[].license`: License
- `items[].license.key`: Key
- `items[].license.name`: Name
- `items[].license.spdx_id`: SPDX ID
- `count`: Count (number)

### `check_repository_starred`

**Check Repository Starred (Agent).** Checks whether the connected user has starred a repository (GET /user/starred/{owner}/{repo}; 204 = starred, 404 = not starred). Returns { starred: boolean }. User-context — unavailable under GitHub App auth. Read-only and idempotent. Needs authentication.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `owner` | string | yes |  | Owner. Repository owner login (user or org). Resolve via List My Repositories, Search Repositories, or Get Authenticated User. |
| `repo` | string | yes |  | Repository. Repository name (without the owner prefix). |

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

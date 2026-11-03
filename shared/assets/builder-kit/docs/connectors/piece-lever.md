# Lever

Lever is a modern, collaborative recruiting platform that powers a more human approach to hiring.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-lever'
  version: '0.2.0'
```

Categories: HUMAN_RESOURCES. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `CUSTOM_AUTH`: Connection

| Field | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `apiKey` | string | yes |  | API key. |

## Actions

### `getOpportunity`

**Get opportunity.** Fetch one Lever opportunity (a candidate's candidacy for a specific job) by its opportunity ID. Use to look up a known candidacy's details; an optional expand list pulls in related resources (e.g. applications, contact) in the same call. Read-only and idempotent; requires the opportunity ID. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `opportunityId` | string | yes |  | Opportunity ID. |
| `expand` | array | no |  | Expand. |

### `updateOpportunityStage`

**Update opportunity stage.** Move a Lever opportunity to a specific pipeline stage. Use to advance or reassign a candidate's stage in the hiring pipeline; requires the opportunity ID and the target stage ID. Idempotent: setting the same stage again leaves the opportunity in that stage with no additional effect. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `opportunityId` | string | yes |  | Opportunity ID. |
| `stage` | string | yes |  | Stage. A value the product loads from the provider, such as an id; write the value itself. |

### `listOpportunityForms`

**List opportunity forms.** Retrieve the completed forms attached to a Lever opportunity, identified by opportunity ID. Returns all of the opportunity's forms by default, or only forms matching a chosen form template when one is supplied (filtered client-side by base template). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `opportunityId` | string | yes |  | Opportunity ID. |
| `template` | string | no |  | Form template. A value the product loads from the provider, such as an id; write the value itself. |

### `listOpportunityFeedback`

**List opportunity feedback.** Retrieve the interview feedback forms recorded against a Lever opportunity, identified by opportunity ID. Returns all feedback by default, or only feedback matching a chosen feedback template when one is supplied (filtered client-side by base template). Read-only and idempotent. Needs authentication.

Kind: safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `opportunityId` | string | yes |  | Opportunity ID. |
| `template` | string | no |  | Feedback template. A value the product loads from the provider, such as an id; write the value itself. |

### `addFeedbackToOpportunity`

**Add feedback to opportunity.** Submit a completed interview feedback form against a Lever opportunity, authored on behalf of a chosen user. The form's fields are derived either from a selected interview (panel plus interview) or from a standalone feedback template; requires the opportunity ID, the author, and the resolved field values. Not idempotent: each call creates a new feedback entry. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `performAs` | string | yes |  | Feedback author. A value the product loads from the provider, such as an id; write the value itself. |
| `opportunityId` | string | yes |  | Opportunity ID. |
| `panelId` | string | no |  | Interview panel. If you select one, you must select an interview too. A value the product loads from the provider, such as an id; write the value itself. |
| `interviewId` | string | no |  | Interview. Mandatory is you select an interview panel. A value the product loads from the provider, such as an id; write the value itself. |
| `feedbackTemplateId` | string | no |  | Feedback template. Ignored if you select an interview panel and an interview. A value the product loads from the provider, such as an id; write the value itself. |
| `feedbackFields` | object | yes |  | Fields. An object whose fields depend on other inputs; the product shows them. |

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

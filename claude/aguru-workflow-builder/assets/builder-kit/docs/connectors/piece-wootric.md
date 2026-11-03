# Wootric

Measure and boost customer happiness

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-wootric'
  version: '0.1.6'
```

Categories: integration. See [the connector list](README.md) for how authentication and limits work.

## Authentication

### `OAUTH2`: Connection

## Actions

### `trigger_wootric_survey`

**Trigger Wootric Survey.** Dispatches a Wootric (InMoment) NPS email survey to a list of end-user email addresses. Use this to send/send-out customer satisfaction surveys to specific recipients. Set survey-immediately to true to bypass Wootric eligibility/throttle checks and send right away, or false to respect them. Not idempotent: each call sends new survey emails, so repeating it re-sends to the same recipients. Needs authentication.

Kind: not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `emails` | array | yes | `[]` | Emails. End user emails, where you want the survey to be received. |
| `surveyImmediately` | boolean | yes |  | Survey Immediately. Enter "true" to survey immediately to bypass checks, otherwise "false". |

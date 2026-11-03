# 07 Connector actions

Reads a job and posts its status to Slack through the installed Slack
connector. Start here for any workflow that calls a third-party service the
platform has a connector for; see [the connector list](../../docs/connectors/README.md).

- `format-update` runs a connector action that needs no credential: it turns
  Markdown into Slack mrkdwn on the worker, with no network call.
- `post-update` sends the message. `credential` names a saved API & HTTP
  credential of the org that runs it, read from config so each installation
  picks its own. The value never appears in YAML.
- Both pin the connector package and its exact installed `version`, and the
  `action` name from the connector's page. `input` keys are the action's
  inputs as that page lists them. A channel is an id, entered as is.
- `get-job` has `fail-on-error: false`, so a missing job skips both connector
  blocks instead of failing the run.

**Change first:** the action and its `input`. Copy the `piece`, `version` and
`action` from the connector's page, then run the schema check, which rejects
an uninstalled version, an unknown action or a missing required input.

**Before a live run:** save the Slack bot token as an API & HTTP credential
under the key in `slackCredential`, and invite the bot to the channel.

**Tests**

| Test                 | Proves                                                                     |
| -------------------- | -------------------------------------------------------------------------- |
| `format-update` unit | The real connector output, zero-width spaces and trailing newline included |
| posts the update     | The channel, the credential key and the exact text sent                    |
| job cannot be read   | Nothing is posted                                                          |

Connector blocks are not guarded in wftest: an unmocked one runs the real
action. That is right for an offline one like `format-update`, and wrong for
anything that reaches a provider, so mock every such block, as the tests do
with `post-update`.

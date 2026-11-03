# Blocks

The engine accepts exactly these block types and rejects any other at load time. Each page has the reference prose, the fields the engine accepts (generated from its schema), how to handle the block in wftest and the templates that use it.

Every block takes `id` (kebab-case, unique in the definition), `type`, and optionally `label`, `out` (the camelCase ctx key its result lands under) and `if` (skip the block when falsy). See [yaml.md](../yaml.md#common-block-fields).

## Integration

| Block | Calls out | Templates |
| --- | --- | --- |
| [`http`](http.md) | yes | 01-http-basics, 02-http-sync, 04-scm-follow-up-escalation, 05-record-request, 06-scheduled-sweep, 07-connector-actions, 09-document-intake |
| [`activepiece`](activepiece.md) | yes | 07-connector-actions, 08-connector-chain |
| [`llm`](llm.md) | yes | 09-document-intake, 10-llm-classification |
| [`email`](email.md) | yes |  |
| [`sms`](sms.md) | yes |  |
| [`whatsapp`](whatsapp.md) | yes |  |
| [`messages`](messages.md) | yes |  |

## Data

| Block | Calls out | Templates |
| --- | --- | --- |
| [`js`](js.md) | no | 02-http-sync, 05-record-request, 06-scheduled-sweep |
| [`kv`](kv.md) | no |  |
| [`ledger`](ledger.md) | yes |  |
| [`log`](log.md) | no | 01-http-basics, 02-http-sync, 06-scheduled-sweep |

## People

| Block | Calls out | Templates |
| --- | --- | --- |
| [`scm`](scm.md) | yes | 03-scm-collect-info, 04-scm-follow-up-escalation, 05-record-request, 06-scheduled-sweep, 09-document-intake |
| [`scm-attribute-message`](scm-attribute-message.md) | yes |  |
| [`stakeholder`](stakeholder.md) | no |  |
| [`hitl`](hitl.md) | no | 04-scm-follow-up-escalation, 05-record-request, 09-document-intake |

## Control flow

| Block | Calls out | Templates |
| --- | --- | --- |
| [`router`](router.md) | no | 04-scm-follow-up-escalation |
| [`loop`](loop.md) | no | 02-http-sync, 06-scheduled-sweep |
| [`parallel`](parallel.md) | no |  |
| [`race`](race.md) | no |  |
| [`state-machine`](state-machine.md) | no | 05-record-request |
| [`subflow`](subflow.md) | no | 01-http-basics |
| [`workflow`](workflow.md) | yes | 06-scheduled-sweep |
| [`wait`](wait.md) | no |  |

## Run-to-run

| Block | Calls out | Templates |
| --- | --- | --- |
| [`signal`](signal.md) | yes |  |
| [`find-waiters`](find-waiters.md) | yes |  |
| [`trigger`](trigger.md) | no |  |

## Platform

| Block | Calls out | Templates |
| --- | --- | --- |
| [`billing`](billing.md) | yes | 06-scheduled-sweep |

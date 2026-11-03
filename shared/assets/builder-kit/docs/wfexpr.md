# wfexpr — workflow expression reference

`wfexpr` is the expression language inside workflow YAML: interpolation,
conditions, loop inputs, `return` projections and block parameters. It is
deterministic workflow code with no side effects, apart from the KV calls
below.

Use it to read `ctx`, select values, build small arrays or objects, compare,
and map or filter data already in hand. Multi-step logic belongs in a `js`
block and external operations in native effect blocks; follow the
[native authoring decision table](yaml.md#native-features-first) before reaching for JS. The
surrounding file and block shapes are in the [YAML reference](yaml.md).

## Where expressions appear

```yaml
return: '${ctx.result}'

blocks:
  - id: route-by-status
    type: router
    branches:
      - when: "${ctx.status === 'ready'}"
        do:
          - id: log-ready
            type: log
            with:
              level: info
              message: 'ready for ${params.userEmail}'

  - id: loop-users
    type: loop
    over: '${ctx.users.filter(user => user.active)}'
    as: user
    blocks:
      - id: log-user
        type: log
        with:
          level: info
          message: 'active user: ${ctx.user.email}'
```

A string that is exactly one expression keeps the expression's type:

```yaml
with:
  payload: '${ctx.payload}' # object stays an object
  enabled: '${ctx.enabled}' # boolean stays a boolean
```

A string mixing text and expressions becomes a string. Objects render as JSON;
`null` and `undefined` render as empty strings.

```yaml
with:
  message: 'invoice ${ctx.invoiceId} for ${ctx.customer.name}'
```

## Bindings

| Name     | Holds                                                                                                                         |
| -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `ctx`    | Everything the run accumulates: `params`, the `trigger` payload, each block's output under its `out` name, and `as` bindings. |
| `params` | The run's inputs; the same object as `ctx.params`. Prefer `params.<field>`.                                                   |
| `config` | The installation's resolved project configuration. Not part of `ctx`; see [Configuration](yaml.md#configuration).             |
| `gkv`    | Installation-global KV. See [Workflow KV](#workflow-kv).                                                                      |
| `skv`    | KV scoped to the current workflow ID.                                                                                         |

Callback parameters of array methods are local to the callback. The only other
global names are the [primitive casts](#primitive-casts).

```
"${ctx.fetchUser.email}"
"${ctx.waitForReply?.message?.bodyText}"
"${config.apiBaseUrl}"
"${params.propertyId}"
"${ctx.users.map(user => user.email)}"
```

`idempotency.key` is **not** a wfexpr: it takes dotted paths under `params`,
`ctx` and `trigger` only, with no `config`, operators or calls. See the
[`workflow` block](yaml.md#workflow).

## Workflow KV

`gkv` and `skv` support `get(key)`, `has(key)` and `set(key, value)`:

```yaml
blocks:
  - id: notify-landlord
    type: email
    if: "${!gkv.has('landlord-notified')}"

  - id: remember-notification
    type: log
    with:
      message: "${gkv.set('landlord-notified', true)}"
```

- `has` returns a boolean, `get` throws when the key is missing, and `set`
  takes a JSON value and evaluates to `null`.
- Each call runs as its own Temporal activity; the rest of the expression stays
  deterministic workflow code.
- "Global" means global to **this org's installation** of the project. Each org
  a project is installed on has its own `gkv` namespace, so one tenant's
  `landlord-notified` never suppresses another's send.
- In an SCM slot `validate` expression, both key on the **need's**
  installation, not the run's: one SCM run serves needs from callers on
  different installations. A need with no installation fails closed — the
  backend refuses it and the slot is refused.

## Values and operators

Expressions produce strings, numbers, booleans, `null`, `undefined`, arrays and
plain objects.

| Kind        | Operators                |
| ----------- | ------------------------ |
| Unary       | `!`, `+`, `-`            |
| Equality    | `==`, `!=`, `===`, `!==` |
| Comparison  | `<`, `<=`, `>`, `>=`     |
| Arithmetic  | `+`, `-`, `*`, `/`, `%`  |
| Logical     | `&&`, `\|\|`, `??`       |
| Conditional | `condition ? a : b`      |

```
"${Number(ctx.attempts) < Number(params.maxRetries || 5)}"
"${ctx.status === 'approved' && ctx.score >= 80}"
"${ctx.user.name ?? 'Anonymous'}"
"${[ctx.primaryEmail, ctx.secondaryEmail]}"
"${{ id: ctx.id, [ctx.key]: ctx.value }}"
```

## Property access

Dot and bracket access, including `length` on strings and arrays:

```
"${ctx['user'].email}"
"${ctx.items[0]}"
"${ctx.items.length}"
```

Optional chaining short-circuits only at the segment marked optional:

```
"${ctx.user?.email}"         # ok when user is missing
"${ctx.user?.email.domain}"  # ok when user is missing
"${ctx.user.email?.domain}"  # user must exist; only email is optional
```

Use it for values that are legitimately absent, never to hide required data.

## Methods

| String        | Example                                   |
| ------------- | ----------------------------------------- |
| `includes`    | `"${ctx.email.includes('@')}"`            |
| `startsWith`  | `"${ctx.ref.startsWith('cert-')}"`        |
| `endsWith`    | `"${ctx.email.endsWith('@example.com')}"` |
| `toLowerCase` | `"${ctx.email.toLowerCase()}"`            |
| `toUpperCase` | `"${ctx.code.toUpperCase()}"`             |
| `trim`        | `"${ctx.name.trim()}"`                    |

| Array      | Example                                                      |
| ---------- | ------------------------------------------------------------ |
| `includes` | `"${ctx.roles.includes('admin')}"`                           |
| `map`      | `"${ctx.users.map(user => user.email)}"`                     |
| `filter`   | `"${ctx.users.filter((user, index) => index < 5)}"`          |
| `some`     | `"${ctx.users.some(user => user.active)}"`                   |
| `every`    | `"${ctx.users.every(user => user.active)}"`                  |
| `find`     | `"${ctx.users.find(user => user.email === ctx.ownerEmail)}"` |

Callbacks must be expression arrows; `user => { return user.email }` is
rejected.

## Primitive casts

`Number(...)`, `String(...)` and `Boolean(...)` are the only global calls. Use
them when an input may arrive as a string but the condition needs numeric or
boolean semantics.

## Secrets

`{{secret("NAME")}}` references can sit in the literal chunks of an
interpolated string and stay references until the consuming block resolves
them. See [Secret references](yaml.md#secret-references).

```yaml
message: '${ctx.kind} {{secret("TOKEN")}}'
```

## Not supported

- globals such as `process`, `JSON`, `Date` or `Math`
- `function` expressions and callback block bodies
- assignments, mutations, statements and loops
- spreads (`[...a]`, `{ ...o }`, `f(...args)`)
- backtick template literals — YAML interpolation already does this
- regular expressions and BigInt literals
- the keys `constructor`, `prototype` and `__proto__`
- very large expressions: evaluation stops with "Expression is too complex"

Move such work into a `js` block or compute the value earlier.

## Authoring rules

- Prefer an expression over a `js` block that only copies, renames, defaults
  or selects values; shape simple subflow results with `return`.
- Keep expressions small and local to the block that needs them.
- Cast with `Number`, `String` or `Boolean` when the input type is ambiguous.
- Keep callbacks side-effect free.
- Use camelCase for values that become `ctx` keys, so dot access stays
  readable.

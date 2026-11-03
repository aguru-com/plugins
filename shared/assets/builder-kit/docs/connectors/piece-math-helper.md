# Math Helper

Add, subtract, multiply, divide, or pick a random number.

```yaml
type: activepiece
with:
  piece: '@activepieces/piece-math-helper'
  version: '0.1.0'
```

Categories: CORE. See [the connector list](README.md) for how authentication and limits work.

## Authentication

None.

## Actions

### `addition_math`

**Addition.** Compute the sum of exactly two numbers, returning first_number + second_number. Pick this only for a two-operand addition; use the sibling Subtraction, Multiplication, Division, or Modulo actions for other operations, and the Code piece for summing a list or evaluating any multi-term formula. Both operands are required and must be numeric; read-only and idempotent, with no external side effects.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_number` | number | yes |  | First Number. |
| `second_number` | number | yes |  | Second Number. |

### `subtraction_math`

**Subtraction.** Compute the difference of two numbers. It returns second_number - first_number: first_number is the amount being subtracted (labelled "Number to Subtract") and second_number is the value it is subtracted from (labelled "Starting Number"). Pick this for a two-operand subtraction only, using the sibling Addition, Multiplication, Division, or Modulo actions for other operations and the Code piece for multi-term formulas; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_number` | number | yes |  | Number to Subtract. This amount is taken away from the starting number. |
| `second_number` | number | yes |  | Starting Number. The result is this number minus the number above. |

### `multiplication_math`

**Multiplication.** Compute the product of exactly two numbers, returning first_number * second_number. Pick this for a two-operand multiplication, including percentage or unit-rate scaling (e.g. an amount times 0.15); use the sibling Addition, Subtraction, Division, or Modulo actions for other operations, and the Code piece for exponents or multi-term formulas. Both operands are required and must be numeric; read-only and idempotent, with no external side effects.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_number` | number | yes |  | First Number. |
| `second_number` | number | yes |  | Second Number. |

### `division_math`

**Division.** Compute the quotient of two numbers, returning first_number / second_number as a floating-point value rather than integer division. Pick this for a two-operand division such as an average, ratio, or unit price; use the sibling Modulo action when you need the remainder instead, or the other Math Helper siblings for the remaining operations. Critical constraint: second_number is validated and must not be zero, or the step fails before computing; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_number` | number | yes |  | First Number. The number to divide. |
| `second_number` | number | yes |  | Second Number. The number to divide by. Cannot be zero. |

### `modulo_math`

**Modulo.** Compute the remainder of first_number divided by second_number using JavaScript % semantics, so the sign of the result follows the dividend (-7 with divisor 3 yields -1, not 2). Pick this for divisibility or every-Nth checks and for cycling an index over a fixed range; use the sibling Division action when you want the quotient instead. Like Division, second_number is validated and must not be zero, or the step fails before computing; read-only and idempotent.

Kind: read, safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_number` | number | yes |  | First Number. The number to divide. |
| `second_number` | number | yes |  | Second Number. The number to divide by. Cannot be zero. |

### `generateRandom_math`

**Random Number.** Draw a pseudo-random integer uniformly from the inclusive range between first_number (the minimum) and second_number (the maximum). Pick this for sampling, jitter, or picking an arbitrary index; it is not cryptographically secure, so use the Crypto piece for tokens, secrets, or IDs, and the arithmetic siblings for deterministic math. It returns whole numbers only; decimal bounds are rounded inward and reversed bounds are swapped, so the result always lies inside the range, and the step fails when the range holds no whole number at all (1.2 to 1.8); not idempotent, since each call returns a different value for identical inputs.

Kind: read, not safe to repeat.

| Input | Type | Required | Default | Notes |
| --- | --- | --- | --- | --- |
| `first_number` | number | yes |  | Minimum. Lowest whole number that can be returned. |
| `second_number` | number | yes |  | Maximum. Highest whole number that can be returned. |

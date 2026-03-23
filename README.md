# SmarterTechnology – Package Sorting

A `sort` function for a robotic arm that dispatches packages to the correct stack based on their volume and mass.

## Rules

| Condition | Label |
|-----------|-------|
| Volume (W × H × L) ≥ 1,000,000 cm³ **or** any dimension ≥ 150 cm | **bulky** |
| Mass ≥ 20 kg | **heavy** |

| Stack | Criteria |
|-------|----------|
| `STANDARD` | Neither bulky nor heavy |
| `SPECIAL` | Bulky **or** heavy (but not both) |
| `REJECTED` | Both bulky **and** heavy |

## Usage

```js
const { sort } = require("./sort");

sort(10, 10, 10, 5);     // "STANDARD"
sort(100, 100, 100, 5);  // "SPECIAL"  – bulky (volume = 1,000,000)
sort(10, 10, 10, 20);    // "SPECIAL"  – heavy
sort(100, 100, 100, 20); // "REJECTED" – bulky and heavy
```

## Running Tests

```bash
npm install
npm test
```
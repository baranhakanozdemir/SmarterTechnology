# Smarter Technology Technical Screen

This repository contains a React implementation of the Smarter Technology package sorting challenge.

## Challenge Summary

Implement a function named `sort(width, height, length, mass)` that routes a package to the correct stack:

- `STANDARD` when the package is neither bulky nor heavy
- `SPECIAL` when the package is bulky or heavy
- `REJECTED` when the package is both bulky and heavy

Rules:

- A package is `bulky` when its volume is greater than or equal to `1,000,000 cm^3`
- A package is also `bulky` when any single dimension is greater than or equal to `150 cm`
- A package is `heavy` when its mass is greater than or equal to `20 kg`

## Implementation Notes

- The reusable sorting logic lives in `src/lib/sort.js`
- The React UI in `src/App.jsx` lets you enter package measurements and see the dispatch result immediately
- The solution includes unit tests for the core logic and a UI test for the React interface
- Input validation rejects negative and non-numeric values with clear errors

## Scripts

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run the test suite:

```bash
npm test
```

Build for production:

```bash
npm run build
```

## Project Structure

```text
.
|-- index.html
|-- package.json
|-- src
|   |-- App.jsx
|   |-- App.test.jsx
|   |-- lib
|   |   |-- sort.js
|   |   `-- sort.test.js
|   |-- main.jsx
|   |-- styles.css
|   `-- test
|       `-- setup.js
`-- vite.config.js
```

## Function Contract

```js
import { sort } from "./src/lib/sort";

sort(100, 100, 100, 10); // "SPECIAL"
sort(50, 40, 30, 10); // "STANDARD"
sort(200, 100, 100, 30); // "REJECTED"
```

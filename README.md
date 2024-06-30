# Smelly test

Smelly test is an extension that helps developers mitigate test smells in their test suites. Smelly test is focused on the javascript ecosystem

## Features

- server side javascript/typescript
  - Identify **if** statements in the test code
  - Identify **for of** loops in the test code
- client side javascript/typescript
  - jsx/tsx
    - Identify **if** statements in the test code
    - Identify **for of** loops in the test code

## Available at

- [vscode market place](https://marketplace.visualstudio.com/items?itemName=marabesi.smelly-test) or [see source code](./vscode/)

## Stand alone

This extension comes with a CLI that executes the same smell detector as the extension:

```
npm run cli -- path/to/file/test.js typescript
```

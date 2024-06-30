[![Coverage Status](https://coveralls.io/repos/github/marabesi/smelly-test-extension/badge.svg?branch=master)](https://coveralls.io/github/marabesi/smelly-test-extension?branch=master)

# Smelly test

Smelly test is an extension that helps developers mitigate test smells in their test suites. Smelly test is focused on the javascript ecosystem

<video width="720" src="https://github.com/marabesi/smelly-test-extension/assets/2129872/026e36ff-4328-42e6-9155-ddd0c194acce" type="video/mp4" autoplay loop controls muted title="Smelly in action">
  Sorry, your browser doesn't support HTML 5 video.
</video>

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
npm run cli -- path/to/file/test.js
```

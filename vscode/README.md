[![Coverage Status](https://coveralls.io/repos/github/marabesi/smelly-test-extension/badge.svg?branch=master)](https://coveralls.io/github/marabesi/smelly-test-extension?branch=master)

# Smelly test

Smelly test is an extension that helps developers mitigate test smells in their test suites. Smelly test is focused on the
javascript/typescript ecosystem, for the backend and frontend.

<video width="720" src="https://github.com/marabesi/smelly-test/assets/2129872/026e36ff-4328-42e6-9155-ddd0c194acce" type="video/mp4" autoplay loop controls muted title="Smelly in action">
  Sorry, your browser doesn't support HTML 5 video.
</video>

## Why?

Test smells have been researched and are known for their negative impact on test code understanding and making maintenance
difficult. You might be wondering why another extension that focuses on test smells in the era of AI. This is a fair thought and
I had the same question while building the extension. However, the javascript/typescript ecosystem lacks such a tool to
help mitigate test smells in code bases out there. If we compare the Java ecosystem there are tools developed for that
for years in academic settings. If we start to dig into the frontend technologies for mitigating test smells it is even
worse. This extension provides an aid for that.

## How?

Smelly works automatically whenever a javascript/typescript test is opened. The extension detects files that have **test** or **spec** in their name. The video above depicts the smells being detected when the file is opened.

## Features

- server-side javascript/typescript
  - Identify **if** statements in the test code
  - Identify **for of** loops in the test code
  - Identify **setTimeout** in the test code
  - detect console logs as a reference to the loudmouth
  - excessive usage of jest mocks
- client-side javascript/typescript
  - jsx/tsx
    - Identify **if** statements in the test code
    - Identify **for of** loops in the test code
    - Identify **setTimeout** in the test code
    - excessive usage of jest mocks

## Configuration

Smelly allows you to customize its configuration and fine-tune the smell detection to better suit your needs. The table below outlines the available options and their functions:

| Configuration Option       | Description                                                                                  | Default Value | Accepted Values                                                          |
|----------------------------|----------------------------------------------------------------------------------------------|---------------|--------------------------------------------------------------------------|
| `smelly.color`             | Highlights the problematic code snippet in your test file that Smelly identifies as a smell. By default, this highlight is red. You can change the color by providing an RGB value. | `#ff0000`     | Any valid RGBA format. Use [Rapid Tables](https://www.rapidtables.com/web/color/RGB_Color.html) to find one. |
| `smelly.fileTestIdentifier` | Determines whether Smelly should run on a file by matching the file name.                    | Smelly automatically detects files with `.test` or `.spec` in their names. | Any valid regex.                                                        |
| `smelly.debug`             | Enables more detailed output when running Smelly. To view these messages, ensure that the developer tools in VS Code are open. | `false`       | `true` or `false`                                                        |

## Planned smells

- heuristics regarding test size
- heuristics regarding 1 test file for 1 production file

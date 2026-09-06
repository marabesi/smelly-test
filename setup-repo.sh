#!/bin/bash

npm i && \
npm run clean && \
npm i --workspaces && \
npm run compile --workspaces && \
npm run test --workspaces
npm i -g vsce && npm run vscode:prepublish --workspace=vscode
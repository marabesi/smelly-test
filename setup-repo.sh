#!/bin/bash

npm i
npm run clean
npm run compile --workspaces
npm i --workspaces
npm run test --workspaces

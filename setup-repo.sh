#!/bin/bash

npm i
npm run clean
npm i --workspaces
npm run test --workspaces
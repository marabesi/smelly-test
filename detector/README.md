# @smelly/detector

[![Continuous Integration Workflow](https://github.com/marabesi/smelly-test/actions/workflows/nodejs.yml/badge.svg)](https://github.com/marabesi/smelly-test/actions/workflows/nodejs.yml)

[![https://nodei.co/npm/smelly-cli.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/smelly-cli.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/smelly-cli)

This package is part of the smelly package and containers the egine that detects test smells on javascript/typescript
files. It provides an interface eacy of comsuption for different ends.

## Installation

```sh
npm install --save smelly-detector
```

## Programmatically using detector

The detector package can be used as a standalone package.

```typescript
import { SmellDetector } from 'smelly-detector';

const detector = new SmellDetector("my source code", "javascript");

console.log(detector.findAll());
```

# @smelly/cli

[![Continuous Integration Workflow](https://github.com/marabesi/smelly-test/actions/workflows/nodejs.yml/badge.svg)](https://github.com/marabesi/smelly-test/actions/workflows/nodejs.yml)

[![https://nodei.co/npm/smelly-cli.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/smelly-cli.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/smelly-cli)

Smelly is a command line tool application that helps javascript/typescript developers to keep their test
suite away from test smells.

## Installation

### docker

```sh
g clone https://github.com/marabesi/smelly-test.git
cd smelly-test/cli
docker build . -t smelly-cli
```

Running the report

```sh
docker run --rm smelly-cli
```

## Command Line Interface

Single file

```sh
npx smelly-cli /smells/my-test.ts
```

Report (must be a path with tests in it)

```sh
npx smelly-cli /smells/ --report=html $(pwd)
```

## Resources

- [Tailwind CSS Table - Flowbite](https://flowbite.com/docs/components/tables)
- [Handlebars](https://handlebarsjs.com/guide/#what-is-handlebars)

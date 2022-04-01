# Silvermine ESLint Plugin

[![NPM Version](https://img.shields.io/npm/v/@silvermine/eslint-plugin-silvermine.svg)](https://www.npmjs.com/package/@silvermine/eslint-plugin-silvermine)
[![License](https://img.shields.io/github/license/silvermine/eslint-plugin-silvermine.svg)](./LICENSE)
[![Build Status](https://travis-ci.org/silvermine/eslint-plugin-silvermine.svg?branch=master)](https://travis-ci.org/silvermine/eslint-plugin-silvermine)
[![Coverage Status](https://coveralls.io/repos/github/silvermine/eslint-plugin-silvermine/badge.svg?branch=master)](https://coveralls.io/github/silvermine/eslint-plugin-silvermine?branch=master)
[![Dependency Status](https://david-dm.org/silvermine/eslint-plugin-silvermine.svg)](https://david-dm.org/silvermine/eslint-plugin-silvermine)
[![Dev Dependency Status](https://david-dm.org/silvermine/eslint-plugin-silvermine/dev-status.svg)](https://david-dm.org/silvermine/eslint-plugin-silvermine#info=devDependencies&view=table)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## What?

Shareable [ESLint](http://eslint.org/) plugins that are used by our shareable
config rules. See [eslint-config-silvermine](https://github.com/silvermine/eslint-config-silvermine/)
for more details.

## Why?

Because we need it. Whitespace errors are evil. As are the other hundreds of
types of errors this protects us from.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```bash
npm install eslint --save-dev
```

Next, install `@silvermine/eslint-plugin-silvermine`:

```bash
npm install @silvermine/eslint-plugin-silvermine --save-dev
```

## Usage

Add `silvermine` to the plugins section of your `.eslintrc` configuration file.
You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "@silvermine/eslint-plugin-silvermine"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@silvermine/silvermine/fluent-chaining": 2
    }
}
```

## Supported Rules

* [fluent-chaining](docs/rules/fluent-chaining.md)
* [call-indentation](docs/rules/call-indentation.md)
* [array-indentation](docs/rules/array-indentation.md)
* [no-multiple-inline-functions](docs/rules/no-multiple-inline-functions.md)

## Note on Semantic Versioning

There are some unusual concepts with this repo that we have to deal with when
versioning it. For example, this repo is the set of plugins that are required by
our eslint config, but this repo is itself linted by our eslint config - a
cyclical dependency. Also, what is a "breaking change" in this repo? Definitely
a major change to our coding standards (e.g. changing how many spaces we use for
indents, or changing to tabs) would be a major, breaking change because every
code file would need to be changed. But there are many smaller changes that can
be made (introducing a new rule that we've basically followed by convention, for
example) that are not really breaking, but may require some minor codebase
changes when you upgrade to the newer rule config. Even fixing a bug
(a patch version) could require changes to your codebase if the rule
implementation was not finding violations previously.

Thus, we've decided that on this particular repo we will not strictly follow
semantic versioning. Instead, new rules can be added with a minor version bump.
Something that's strictly a bug fix of an existing rule (not changing the
principle of the rule) can be done in a patch version. Major versions will be
reserved for massive, sweeping changes in rules - in other words, primarily big
policy changes rather than simply technical changes.

## License

This software is released under the MIT license. See [the license file](LICENSE)
for more details.

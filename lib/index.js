/**
 * @fileoverview Shareable eslint plugin for use by eslint-config-silvermine
 */

'use strict';

var fluentChaining = require('./rules/fluent-chaining'),
    arrayIndentation = require('./rules/array-indentation'),
    callIndentation = require('./rules/call-indentation'),
    noMultipleInlineFunctions = require('./rules/no-multiple-inline-functions'),
    noMultilineVarDeclaration = require('./rules/no-multiline-var-declaration'),
    noMultilineConditionals = require('./rules/no-multiline-conditionals'),
    emptyObjectSpacing = require('./rules/empty-object-spacing'),
    emptyArraySpacing = require('./rules/empty-array-spacing'),
    uninitializedLast = require('./rules/uninitialized-last'),
    indent = require('./rules/indent');

module.exports.rules = {
   'fluent-chaining': fluentChaining,
   'array-indentation': arrayIndentation,
   'call-indentation': callIndentation,
   'no-multiple-inline-functions': noMultipleInlineFunctions,
   'no-multiline-var-declarations': noMultilineVarDeclaration,
   'indent': indent,
   'no-multiline-conditionals': noMultilineConditionals,
   'empty-object-spacing': emptyObjectSpacing,
   'empty-array-spacing': emptyArraySpacing,
   'uninitialized-last': uninitializedLast,
};

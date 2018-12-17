/**
* @fileoverview Check indentation at the beginning and end of a function call
*/
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/indent'),
    formatCode = require('../../code-helper'),
    ruleTester = require('../../ruleTesters').es6(),
    validExample, varOnlyExample, switchTest, constExample, flatTernaryValid,
    invalidExample, invalidExample2, invalidExample3, constInvalid,
    classInvalid;

validExample = formatCode(
   'var a = 1,',
   '    b = 2,',
   '    c = 3;',
   '',
   'function test() {',
   '   a()',
   '      .b(function() {',
   '         var a = 1,',
   '             b = 2;',
   '',
   '         return a()',
   '            .b(function() {});',
   '      });',
   '}',
   '',
   'function test2() {',
   '   var arr = [ 1, 2, 3 ],',
   '       noInit, andAgain;',
   '',
   '   // This comment should be indented with the if statement',
   '   if (noInit) {',
   '      var a = 1,',
   '          b = 2;',
   '   }',
   '}',
   '',
   'class MyClass {',
   '   /**',
   '    * This should be indented with the function.',
   '    *',
   '    * @param {number} num base number to add',
   '    */',
   '   constructor(num) {',
   '      this.a = num;',
   '   }',
   '',
   '   add(b) {',
   '      return this.a + b;',
   '   }',
   '}',
   '',
   'const myClass = new MyClass();',
   '',
   'for (let i = 1; i < 10; i++) {',
   '   console.log(i);',
   '}',
   '',
   'myFunc().then((var1) => {',
   '   return doSomething(var1);',
   '});',
   '',
   'myFunc(',
   '   myClass,',
   '   a,',
   '   b,',
   '   c',
   ');',
   '',
   'try {',
   '   myFunc();',
   '} catch (err) {',
   '   console.error(err);',
   '}',
   '',
   '(function() {',
   '   doSomethingNow();',
   '})();'
);

varOnlyExample = formatCode(
   'var a = 1,',
   '    b = 2,',
   '    c = 3;'
);

flatTernaryValid = formatCode(
   'var a =',
   '    foo > 0 ? bar :',
   '    foo < 0 ? baz :',
   '    qiz;'
);

invalidExample = formatCode(
   'function test() {',
   '   var a = 1,',
   '      b = 2;',
   '',
   '   return a + b;',
   '}',
   '',
   'myFunc(',
   'myClass,',
   'a',
   ');',
   '',
   'var foo = {',
   '   bar: 1,',
   '  baz: 2,',
   '};'
);

invalidExample2 = formatCode(
   'var a = 1,',
   '    b = 2;',
   '',
   'function badIndent() {',
   '  a = b;',
   '}'
);

invalidExample3 = formatCode(
   'function test() {',
   'notindented();',
   '}'
);

switchTest = formatCode(
   'switch (a) {',
   '   case 1:',
   '      break;',
   '   default:',
   '      c = a + b',
   '}'
);

constExample = formatCode(
   'const A = 1,',
   '      B = 2;',
   '',
   'const myArr = [',
   '   {',
   '      a: 1,',
   '      b: 2,',
   '   },',
   '];'
);

constInvalid = formatCode(
   'const A = 1,',
   '   B = 2;',
   '',
   'const C = 3,',
   '    D = 4;'
);

classInvalid = formatCode(
   'class MyClass {',
   'constructor(num) {',
   '   this.a = num;',
   '}',
   '',
   'add(b) {',
   '   return this.a + b;',
   '}',
   '}'
);

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

ruleTester.run('indent', rule, {
   valid: [
      {
         code: validExample,
         options: [ 3, { 'VariableDeclaratorOffset': { 'var': 1, 'let': 1, 'const': 3 }, 'SwitchCase': 1 } ],
      },
      {
         code: switchTest,
         options: [ 3, { 'VariableDeclaratorOffset': { 'var': 1, 'let': 1, 'const': 3 }, 'SwitchCase': 1 } ],
      },
      {
         code: constExample,
         options: [ 3, { 'VariableDeclaratorOffset': { 'var': 1, 'let': 1, 'const': 3 }, 'SwitchCase': 1 } ],
         parserOptions: { ecmaVersion: 6 },
      },
      {
         code: varOnlyExample,
         options: [ 3, { 'VariableDeclaratorOffset': 1 } ],
      },
      {
         code: flatTernaryValid,
         options: [ 3, { 'flatTernaryExpressions': true } ],
      },
   ],

   invalid: [
      {
         code: invalidExample,
         errors: [
            {
               message: 'Expected indentation of 7 spaces but found 6.',
               type: 'Identifier',
            },
            {
               message: 'Expected indentation of 3 spaces but found 0.',
               type: 'Identifier',
            },
            {
               message: 'Expected indentation of 3 spaces but found 0.',
               type: 'Identifier',
            },
            {
               message: 'Expected indentation of 3 spaces but found 2.',
               type: 'Identifier',
            },
         ],
         options: [ 3, { 'VariableDeclaratorOffset': { 'var': 1, 'let': 1, 'const': 3 }, 'SwitchCase': 1 } ],
      },
      {
         code: invalidExample2,
         errors: [
            {
               message: 'Expected indentation of 3 spaces but found 2.',
               type: 'Identifier',
            },
         ],
         options: [ 3, { 'VariableDeclaratorOffset': { 'var': 1, 'let': 1, 'const': 3 }, 'SwitchCase': 1 } ],
      },
      {
         code: invalidExample3,
         errors: [
            {
               message: 'Expected indentation of 3 spaces but found 0.',
               type: 'Identifier',
            },
         ],
         options: [ 3, { 'VariableDeclaratorOffset': { 'var': 1, 'let': 1, 'const': 3 }, 'SwitchCase': 1 } ],
      },
      {
         code: switchTest,
         errors: [
            {
               message: 'Expected indentation of 0 spaces but found 3.',
               type: 'Keyword',
            },
            {
               message: 'Expected indentation of 3 spaces but found 6.',
               type: 'Keyword',
            },
            {
               message: 'Expected indentation of 0 spaces but found 3.',
               type: 'Keyword',
            },
            {
               message: 'Expected indentation of 3 spaces but found 6.',
               type: 'Identifier',
            },
         ],
         options: [ 3, { 'VariableDeclaratorOffset': { 'var': 1, 'let': 1, 'const': 3 } } ],
      },
      {
         code: constInvalid,
         errors: [
            {
               message: 'Expected indentation of 6 spaces but found 3.',
               type: 'Identifier',
            },
            {
               message: 'Expected indentation of 6 spaces but found 4.',
               type: 'Identifier',
            },
         ],
         options: [ 3, { 'VariableDeclaratorOffset': { 'var': 1, 'let': 1, 'const': 3 }, 'SwitchCase': 1 } ],
         parserOptions: { ecmaVersion: 6 },
      },
      {
         code: classInvalid,
         errors: [
            {
               message: 'Expected indentation of 3 spaces but found 0.',
               type: 'Identifier',
            },
            {
               message: 'Expected indentation of 6 spaces but found 3.',
               type: 'Keyword',
            },
            {
               message: 'Expected indentation of 3 spaces but found 0.',
               type: 'Punctuator',
            },
            {
               message: 'Expected indentation of 3 spaces but found 0.',
               type: 'Identifier',
            },
            {
               message: 'Expected indentation of 6 spaces but found 3.',
               type: 'Keyword',
            },
            {
               message: 'Expected indentation of 3 spaces but found 0.',
               type: 'Punctuator',
            },
         ],
         options: [ 3, { 'VariableDeclaratorOffset': { 'var': 1, 'let': 1, 'const': 3 }, 'SwitchCase': 1 } ],
         parserOptions: { ecmaVersion: 6 },
      },
   ],
});

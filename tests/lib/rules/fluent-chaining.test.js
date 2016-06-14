/**
 * @fileoverview Enforce spacing for chained calls
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var fluentChaining = require('../../../lib/rules/fluent-chaining'),
    formatCode = require('../../code-helper'),
    RuleTester = require('eslint').RuleTester,
    fs = require('fs'),
    path = require('path'),
    ruleTester = new RuleTester();

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

// member expression spanning multiple lines
function checkManyLinesError() {
   return {
      code: formatCode(
         'a()',
         '',
         '   .b();'
      ),
      errors: [
         {
            message: 'Member expression should not span more than 2 lines',
            type: 'MemberExpression'
         }
      ]
   };
}

// once statement is broken into multiple lines
// each member expression should be on it's own line
function checkNewLineError() {
   return {
      code: formatCode(
         'a()',
         '   .b().c;'
      ),
      errors: [
         {
            message: 'Identifier c should be on a new line',
            type: 'Identifier'
         }
      ],
      output: formatCode(
         'a()',
         '   .b()',
         '   .c;'
      )
   };
}

function checkNewLineErrorWithTabOption() {
   return {
      code: formatCode(
         'a()',
         '\t.b().c;'
      ),
      errors: [
         {
            message: 'Identifier c should be on a new line',
            type: 'Identifier'
         }
      ],
      options: [ 1 /* indent */, 'tab' ],
      output: formatCode(
         'a()',
         '\t.b()',
         '\t.c;'
      )
   };
}

function spacingErrorMessage(identifier, spacing) {
   return {
      message: 'Identifier ' + identifier + ' should be indented ' + spacing + ' spaces',
      type: 'Identifier'
   };
}

function checkSpacingError() {
   return {
      code: formatCode(
         'a()',
         '.b();'
      ),
      errors: [
         spacingErrorMessage('b', 3)
      ],
      output: formatCode(
         'a()',
         '   .b();'
      )
   };
}

function checkSpacingErrorWithIndentOption() {
   return {
      code: formatCode(
         'a()',
         '.b();'
      ),
      errors: [
         spacingErrorMessage('b', 4)
      ],
      options: [ 4 /* indent */ ],
      output: formatCode(
         'a()',
         '    .b();'
      )
   };
}

function checkSpacingErrorWithTabOption() {
   return {
      code: formatCode(
         'a()',
         '.b();'
      ),
      errors: [
         spacingErrorMessage('b', 1)
      ],
      options: [ 1 /* indent */, 'tab' ],
      output: formatCode(
         'a()',
         '\t.b();'
      )
   };
}

function checkSpacingErrorWhenCallHasFunctionArguments() {
   var code = formatCode(
      'previous.then(function(val) {',
      '   return val.something;',
      '})',
      '.then(function(something) {',
      '   return something.else;',
      '});'
   );

   return {
      code: code,
      errors: [
         spacingErrorMessage('then', 3)
      ],
      output: code // output should be unchanged
   };
}

function checkSpacingErrorWhenNested() {
   return {
      code: formatCode(
         '_.reduce(workQueue, function(previous, toCheck) {',
         '   return previous',
         '   .then(function(val) {',
         '      return val.something;',
         '   })',
         '   .then(function(something) {',
         '      return something.else;',
         '   });',
         '}, Q());'
      ),
      errors: [
         spacingErrorMessage('then', 6),
         spacingErrorMessage('then', 6)
      ]
   };
}

function chainingIndentationMatchErrorMessage() {
   return {
      message: 'Call expression should be on a new line and indented',
      type: 'CallExpression'
   };
}

// Successive calls should not be indented at different levels
function checkChainingIndentationError1() {
   return {
      code: formatCode(
         'Q.all([',
         '   \'abc\',',
         '   \'def\',',
         '])',
         '   .spread(function(settings, category) {',
         '      return doSomething(settings, category);',
         '   })',
         '   .then(done)',
         '   .done();'
      ),
      errors: [
         chainingIndentationMatchErrorMessage(),
      ]
   };
}

// wrong indentation
function checkChainingIndentationError2() {
   return {
      code: formatCode(
         'previous.then(function(val) {',
         '   return val.something;',
         '})',
         '   .then(function(something) {',
         '      return something.else;',
         '   });'
      ),
      errors: [
         chainingIndentationMatchErrorMessage(),
      ]
   };
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

ruleTester.run('fluent-chaining', fluentChaining, {
   valid: [
      fs.readFileSync(path.join(__dirname, '/fluent-chaining.valid.js'), 'utf8') // eslint-disable-line no-sync
   ],
   invalid: [
      checkManyLinesError(),
      checkNewLineError(),
      checkNewLineErrorWithTabOption(),
      checkSpacingError(),
      checkSpacingErrorWithIndentOption(),
      checkSpacingErrorWithTabOption(),
      checkSpacingErrorWhenCallHasFunctionArguments(),
      checkSpacingErrorWhenNested(),
      checkChainingIndentationError1(),
      checkChainingIndentationError2()
   ]
});

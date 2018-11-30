/**
* @fileoverview Check that all case statements are block scoped.
*/
'use strict';

var rule = require('../../../lib/rules/block-scope-case'),
    formatCode = require('../../code-helper'),
    RuleTester = require('eslint').RuleTester,
    ruleTester = new RuleTester(),
    invalidExample1, invalidExample2, validExample;


validExample = formatCode(
   'switch (x) {',
   '   case 2: {',
   '      doSomethingWith2(x);',
   '      break;',
   '   }',
   '   default: {',
   '      doSomethingWithEverythingElse(x);',
   '   }',
   '}'
);

invalidExample1 = formatCode(
   'switch (x) {',
   '   case 2: ',
   '      doSomethingWith2(x);',
   '      break;',
   '   default:',
   '      doSomethingWithEverythingElse(x);',
   '}'
);

invalidExample2 = formatCode(
   'switch (x) {',
   '   case 2: {',
   '      doSomethingWith2(x);',
   '      break;',
   '   }',
   '   default:',
   '      doSomethingWithEverythingElse(x);',
   '}'
);


ruleTester.run('block-scope-case', rule, {
   valid: [
      validExample,
   ],

   invalid: [
      {
         code: invalidExample1,
         errors: [
            {
               message: 'Case statements must be block scoped.',
               type: 'SwitchCase',
            },
            {
               message: 'Case statements must be block scoped.',
               type: 'SwitchCase',
            },
         ],
      },
      {
         code: invalidExample2,
         errors: [
            {
               message: 'Case statements must be block scoped.',
               type: 'SwitchCase',
            },
         ],
      },
   ],
});

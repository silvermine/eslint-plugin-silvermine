/**
 * @fileoverview Ensures uninitialized variables come last in the variable declaration
 * chain
 */

'use strict';

var _ = require('underscore');

module.exports = {

   create: function(context) {

      function validateVar(node) {
         var initialized, uninitialized, firstUninitialized, lastInitialized;

         if (node.declarations && node.declarations.length > 1) {
            initialized = _.filter(node.declarations, function(decl) {
               return decl.init !== null;
            });

            uninitialized = _.filter(node.declarations, function(decl) {
               return decl.init === null;
            });

            if (initialized.length > 0 && uninitialized.length > 0) {
               lastInitialized = _.indexOf(node.declarations, _.last(initialized));
               firstUninitialized = _.indexOf(node.declarations, _.first(uninitialized));

               if (firstUninitialized < lastInitialized) {
                  context.report({
                     node: node,
                     message: 'Uninitialized variables should come last in the declaration.',
                  });
               }
            }
         }

      }

      return {
         'VariableDeclaration': validateVar,
      };
   },

};

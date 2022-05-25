/**
 * @fileoverview Enforce formatting for chained calls
 */

'use strict';

var RuleHelper = require('../helpers/rule-helper'),
    _ = require('underscore');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {

   meta: {
      type: 'layout',

      fixable: 'whitespace',
   },

   create: function(context) {
      var helper = new RuleHelper(context);

      // --------------------------------------------------------------------------
      // Helpers
      // --------------------------------------------------------------------------

      function validateSingleLineMemberExpression(node) {
         if (node.object.loc.start.line !== node.property.loc.start.line) {
            context.report({
               node: node.property,
               message: 'Identifier "{{ identifier }}" should be on a new line',
               data: {
                  identifier: node.property.name,
               },
               fix: function(fixer) {
                  var firstLineIndent = helper.lineIndent(node.object.loc.end.line),
                      fixString = '\n' + helper.indentChar.repeat(firstLineIndent) + '.';

                  return fixer.replaceTextRange([ node.object.range[1], node.property.range[0] ], fixString);
               },
            });
         }
      }

      function validateMultiLineMemberExpression(node) {
         var firstLineIndent = helper.lineIndent(node.object.loc.start.line),
             lastLineIndent = helper.lineIndent(node.object.loc.end.line),
             expectedIndent = firstLineIndent + helper.indent,
             propertyLineIndent = helper.lineIndent(node.property.loc.start.line),
             sameLine = node.object.loc.start.line === node.object.loc.end.line;

         if (propertyLineIndent !== expectedIndent) {
            context.report({
               node: node.property,
               message: 'Expected identifier "{{ identifier }}" to be indented {{ expectedIndent }} chars (char: "{{ indentChar }}")',
               data: {
                  identifier: node.property.name,
                  expectedIndent: expectedIndent,
                  indentChar: (helper.indentChar === '\t' ? 'tab' : helper.indentChar),
               },
               fix: function(fixer) {
                  var fixString = '\n' + helper.indentChar.repeat(expectedIndent) + '.';

                  if (node.property.loc.start.line === node.parent.loc.end.line) {
                     return fixer.replaceTextRange([ node.object.range[1], node.property.range[0] ], fixString);
                  }
               },
            });
         }


         if (node.object.type === 'CallExpression' && !sameLine && lastLineIndent !== propertyLineIndent) {
            context.report({
               node: node.object,
               message: 'Call expression should be on a new line and indented',
            });
         }
      }

      function checkMemberExpression(node) {
         var numberOfLines = node.property.loc.start.line - node.object.loc.end.line + 1,
             objectComments = helper.sourceCode.getCommentsAfter(node.object);

         if (node.object.type === 'FunctionExpression') {
            return;
         }

         // if there are leading comments, we need to subtract their lines from the number
         // of lines of the expression or we will not be able to put comments between
         // calls. Note: trailing comments of the `node.object` are leading comments for
         // this property
         _.each(objectComments, function(comment) {
            var commentLines = comment.loc.end.line - comment.loc.start.line + 1;

            // make sure the comment is not on the ending line of the previous call
            if (comment.loc.start.line > node.object.loc.end.line) {
               numberOfLines = numberOfLines - commentLines;
            }
         });

         // check to see if member expression spans multiple lines
         if (numberOfLines === 1) {
            validateSingleLineMemberExpression(node);
         } else if (numberOfLines === 2) {
            validateMultiLineMemberExpression(node);
         } else {
            context.report({
               node: node,
               message: 'Member expression should not span more than 2 lines',
            });
         }
      }

      // --------------------------------------------------------------------------
      // Public
      // --------------------------------------------------------------------------

      return {
         'MemberExpression': checkMemberExpression,
      };

   },
};

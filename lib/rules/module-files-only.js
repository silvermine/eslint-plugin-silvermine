/**
 * @fileoverview Ensures that all files are modules (either import or export)
 */

'use strict';

var _ = require('underscore');

module.exports = {

   create: function(context) {
      return {
         Program: function(node) {
            var importExportRegex = /^(TS)?(Exp|Imp).*(Declaration|Assignment)$/,
                hasImportExport;

            hasImportExport = _.some(node.body, function(subNode) {
               return importExportRegex.test(subNode.type);
            });

            if (!hasImportExport) {
               context.report({
                  node: node,
                  message: 'All files must be modules (contain an import or export statement).',
               });
            }
         },
      };
   },

};

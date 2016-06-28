/**
 * @fileoverview Base for all rules
 */
'use strict';

function RuleHelper(context) {
   var self = this;

   function getIndent() {
      if (context.options.length > 0) {
         return context.options[0];
      }

      return 3;
   }

   function getIndentChar() {
      if (context.options.length > 1) {
         switch (context.options[1]) {
            case 'tab':
               return '\t';
            case 'space':
               return ' ';
            default:
               return context.options[1];
         }
      }

      return ' ';
   }

   this.sourceCode = context.getSourceCode();
   this.lines = self.sourceCode.getLines();
   this.indent = getIndent();
   this.indentChar = getIndentChar();

   this.lineIndent = function(lineNumber) {
      var line = self.lines[lineNumber - 1],
          regex = new RegExp('[^ ' + self.indentChar + ']');

      if (line === undefined) {
         throw new Error('Invalid lineNumber ' + lineNumber + ' supplied to lineIndent');
      }

      return line[0] === self.indentChar ? line.match(regex).index : 0;
   };

   this.lineIndentationMatches = function(lineA, lineB) {
      return self.lineIndent(lineA) === self.lineIndent(lineB);
   };
}

module.exports = RuleHelper;

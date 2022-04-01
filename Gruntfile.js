'use strict';

module.exports = function(grunt) {

   grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      eslint: {
         target: [ '*.js', 'lib/**/*.js', 'tests/**/*.js', '!**/*.valid.js', '!**/*.invalid.js' ],
      },

      markdownlint: {
         all: {
            src: [
               'README.md',
               'docs/*/*.md',
            ],
            options: {
               config: grunt.file.readJSON('.markdownlint.json'),
            },
         },
      },

   });

   grunt.loadNpmTasks('grunt-eslint');
   grunt.loadNpmTasks('grunt-markdownlint');

   grunt.registerTask('standards', [ 'eslint', 'markdownlint' ]);
   grunt.registerTask('default', [ 'standards' ]);

};

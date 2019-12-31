/*
* Rules that we fork from eslint often use the ast-utils module. This module is not made
* public on the API, so we cannot count on it being in a certain place. In fact, the file
* was moved in the upgrade from eslint v5 to eslint v6. In order to keep this plugin
* compatible with both versions and prevent having to fork the entire module, this file
* attempts to safely require the plugin from one of the two locations.
*/

/* eslint-disable global-require */
'use strict';

try {
   module.exports = require('eslint/lib/rules/utils/ast-utils');
} catch(e) {
   module.exports = require('eslint/lib/util/ast-utils');
}

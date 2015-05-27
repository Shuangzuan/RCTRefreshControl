/**
 * @providesModule RCTRefreshControl
 * @flow
 */
'use strict';

var NativeRCTRefreshControl = require('NativeModules').RefreshControl;
var invariant = require('invariant');

/**
 * High-level docs for the RCTRefreshControl iOS API can be written here.
 */

var RCTRefreshControl = {
  test: function() {
    NativeRCTRefreshControl.test();
  }
};

module.exports = RCTRefreshControl;

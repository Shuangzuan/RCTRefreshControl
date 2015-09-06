/**
 * @providesModule RCTRefreshControl
 * @flow-weak
 */
'use strict';

var React = require('react-native');
var {
  DeviceEventEmitter,
  NativeModules: {
    RefreshControl,
  }
} = React;

/**
 * A pull down to refresh control like the one in Apple's iOS6 Mail App.
 */

var DROP_VIEW_DID_BEGIN_REFRESHING_EVENT = 'dropViewDidBeginRefreshing';

var callbacks = {};

var subscription = DeviceEventEmitter.addListener(
  DROP_VIEW_DID_BEGIN_REFRESHING_EVENT,
  (reactTag) => callbacks[reactTag]()
);
// subscription.remove();

var RCTRefreshControl = {
  configure: function(configs, callback) {
    var nodeHandle = React.findNodeHandle(configs.node);
    var options = {
      tintColor: configs.tintColor,
      activityIndicatorViewColor: configs.activityIndicatorViewColor
    };
    
    RefreshControl.configure(nodeHandle, options, (error) => {
      if (!error) {
        callbacks[nodeHandle] = callback;
      }
    });
  },
  endRefreshing: function(node) {
    var nodeHandle = React.findNodeHandle(node);
    RefreshControl.endRefreshing(nodeHandle);
  }
};

module.exports = RCTRefreshControl;

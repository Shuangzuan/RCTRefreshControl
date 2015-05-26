# RCTRefreshControl

A pull to refresh control for react native.

## Installation

1. Run `npm install react-refresh-control --save`
2. Open your project in Xcode, right click on `Libraries` and click `Add Files to "Your Project Name"` then choose the `RCTAnimationExperimental.xcodeproj`.
3. Add `libRCTAnimationExperimental.a` to `Build Phases -> Link Binary With Libraries`.
3. `var RefreshControl = require('react-refresh-control');`
4. Add `mixins: [RefreshControl.Mixin]`.

## Usage

```javascript
'use strict';

var React = require('react-native');
var TimerMixin = require('react-timer-mixin');
var RefreshControl = require('react-refresh-control');
var {
  AppRegistry,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;

var AwesomeProject = React.createClass({
  mixins: [TimerMixin, RefreshControl.Mixin],
  componentDidMount: function() {
    this.configureRefreshControl({
      beginRefreshing: () => {
        this.setTimeout(() => {
          this.endRefreshing();
        }, 3000);
      }
    });
  },
  render: function() {
    return (
      <ScrollView style={{marginTop: 20}} {...this.refreshControlProps()}>
        {this.refreshControl()}
        <View style={{backgroundColor: 'orange', height: 100}} />
        <View style={{backgroundColor: 'blue', height: 100}} />
        <View style={{backgroundColor: 'gray', height: 100}} />
        <View style={{backgroundColor: 'white', height: 100}} />
        <View style={{backgroundColor: 'black', height: 100}} />
        <View style={{backgroundColor: 'purple', height: 100}} />
        <View style={{backgroundColor: 'orange', height: 100}} />
        <View style={{backgroundColor: 'blue', height: 100}} />
        <View style={{backgroundColor: 'gray', height: 100}} />
        <View style={{backgroundColor: 'white', height: 100}} />
        <View style={{backgroundColor: 'black', height: 100}} />
        <View style={{backgroundColor: 'purple', height: 100}} />
      </ScrollView>
    );
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
```

## Props

The following properties are used:

- **`pullToRefreshText`** _(String)_
- **`releaseToRefreshingText`** _(String)_
- **`refreshingText`** _(String)_

---

## License

Available under the MIT license. See the LICENSE file for more informatiion.
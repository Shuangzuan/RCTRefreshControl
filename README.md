# RCTRefreshControl
[![npm version](https://badge.fury.io/js/react-native-refresh-control.svg)](https://badge.fury.io/js/react-native-refresh-control)

A pull down to refresh control for react native. This project use a native-bridging way to implement the Pull-To-Refresh, absolutely **NO** jitter and lagging compared with those package which implemented using Javascript.

This is a **forked** project from [Shuangzuan/RCTRefreshControl](https://github.com/Shuangzuan/RCTRefreshControl).
This project added a more user-friendly way to use this package, and I also fix some bugs of the original project.

![react-refreshcontrol](https://cloud.githubusercontent.com/assets/4535844/11009604/9845be08-84ae-11e5-8fe0-1037c057ce05.gif)

## Installation

1. Run `npm install react-native-refresh-control --save` in your project directory.
2. Drag `RCTRefreshControl.xcodeproj` to your project on Xcode.
3. Click on your main project file (the one that represents the .xcodeproj) select Build Phases and drag `libRCTRefreshControl.a` from the Products folder inside the `RCTRefreshControl.xcodeproj`.
4. Add `var RCTRefreshControl = require('react-native-refresh-control');` to your code.

__I will yield the package name once [Shuangzuan](https://github.com/Shuangzuan)requests __.

## Usage
It is very easy to use, just use `RCTRefreshControl.ListView` as the `React.ListView`
or use `RCTRefreshControl.ScrollView` as the `React.ScrollView`

The simple difference between the `ListView` and `ScrollView` in React Native is that you can pass your `onRefresh` event handler into `RCTRefreshControl.ListView` and `RCTRefreshControl.ScrollView`.

The event handler below stop the refreshing state of the `ListView` in 2 seconds once the user pull down the `ListView` and triggered the refresh.

```jsx
var onRefreshHandler = (stopRefreshAnimation) => {
  setTimeout(stopRefreshAnimation, 2000);
};
```

And use like this
```jsx
<RCTRefreshControl.ListView
  // another props here
  onRefresh={onRefreshHandler}
/>
```

## Sample Code

**Using fewer lines to implement a Pull-To-Refresh**

```jsx
'use strict';

import React from 'react-native';
const {
  View,
  ListView
} = React;

import RCTRefreshControl from 'react-refresh-control';

class MyApp extends React.Component {
  constructor(props) {
    super(props);

    var dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: dataSource.cloneWithRows(['#484848', '#2F9C0A', '#05A5D1'])
    };
  }
  onRefresh(stopRefresh) {
    console.log(this.state);
    setTimeout(stopRefresh, 2000);
  }
  renderRow(data) {
    return (
      <View style={{backgroundColor: data, height: 200}} />
    );
  }
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', borderTopWidth: 20, borderTopColor: 'black'}}>
        <RCTRefreshControl.ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          onRefresh={this.onRefresh.bind(this)}
          />
        <RCTRefreshControl.ScrollView
          onRefresh={this.onRefresh.bind(this)}>
          <View style={{backgroundColor: '#05A5D1', height: 200}} />
          <View style={{backgroundColor: '#FDF3E7', height: 200}} />
          <View style={{backgroundColor: '#484848', height: 200}} />
        </RCTRefreshControl.ScrollView>
      </View>
    );
  }
}

React.AppRegistry.registerComponent('RCTRefreshControlDemo', () => RCTRefreshControlDemo);
```

## License

Available under the MIT license. See the LICENSE file for more informatiion.

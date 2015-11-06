'use strict';

import React from 'react-native';
const {
  Component,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView
} = React;

import RCTRefreshControl from './RCTRefreshControl';

let randId = () => (Math.random() + 1).toString(36).substring(7);

const ELEMENT_ID = randId();

var style = StyleSheet.create({
  rootView: {
    flex: 1
  }
});

let RCTRefreshControlView = {};

class RCTRefreshControlScrollView extends Component {
  componentDidMount() {
    RCTRefreshControl.configure({
      node: this.refs[ELEMENT_ID],
      tintColor: this.props.tintColor,
      activityIndicatorViewColor: this.props.activityIndicatorViewColor
    }, () => {
      if (this.props.onRefresh) {
        this.props.onRefresh(() => {
          RCTRefreshControl.endRefreshing(this.refs[ELEMENT_ID]);
        });
      }
    });
  }
  render() {
    return (
      <ScrollView {...this.props} ref={ELEMENT_ID}>
        {this.props.children}
      </ScrollView>
    );
  }
}

class RCTRefreshControlViewListView extends Component {
  componentDidMount() {
    RCTRefreshControl.configure({
      node: this.refs[ELEMENT_ID],
      tintColor: this.props.tintColor,
      activityIndicatorViewColor: this.props.activityIndicatorViewColor
    }, () => {
      if (this.props.onRefresh) {
        this.props.onRefresh(() => {
          RCTRefreshControl.endRefreshing(this.refs[ELEMENT_ID]);
        });
      }
    });
  }
  render() {
    return (
      <ListView {...this.props} ref={ELEMENT_ID}/>
    );
  }
}
RCTRefreshControl.ScrollView = RCTRefreshControlScrollView;
RCTRefreshControl.ListView = RCTRefreshControlViewListView;

module.exports = RCTRefreshControl;
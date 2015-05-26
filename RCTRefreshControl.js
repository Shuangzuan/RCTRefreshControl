'use strict';

var React = require('react-native');
var Animation = require('AnimationExperimental');
var TweenState = require('react-tween-state');

var {
  ActivityIndicatorIOS,
  StyleSheet,
  Text,
  View,
} = React;

var RefreshControlState = {
  PullToRefresh: 0,
  ReleaseToRefreshing: 1,
  Refreshing: 2
};

var RefreshControlMixin = {
  mixins: [TweenState.Mixin],
  getDefaultProps: function() {
    return {
      distance: 40
    };
  },
  refreshControlProps: function() {
    return {
      ref: 'scrollView',
      scrollEventThrottle: 200,
      onScroll: this._onScroll,
      onResponderRelease: this._onResponderRelease
    };
  },
  getInitialState: function() {
    return {
      // Parameters
      pullToRefreshText: 'Pull down',
      releaseToRefreshingText: 'Release',
      refreshingText: 'Loading...',
      beginRefreshing: function() {},

      // State
      refresh: RefreshControlState.PullToRefresh,
      marginTop: -this.props.distance,
      distance: 0,
      arrowOrientation: 'Down'
    };
  },
  configureRefreshControl: function(options) {
    this.setState(options);
  },
  endRefreshing: function() {
    this.setState({
      refresh: RefreshControlState.PullToRefresh,
      arrowOrientation: 'Down'
    });

    this.tweenState('marginTop', {
      easing: TweenState.easingTypes.linear,
      duration: 200,
      endValue: -this.props.distance
    });
  },
  _onResponderRelease: function(event) {
    if (this.state.refresh !== RefreshControlState.Refreshing) {
      if (this.state.distance >= this.props.distance) {
        this.setState({
          refresh: RefreshControlState.Refreshing,
          marginTop: 0
        });

        this.state.beginRefreshing();
      }
    }
  },
  _animateArrow: function(orientation) {
    if (orientation === this.state.arrowOrientation) return;

    this.setState({arrowOrientation: orientation});

    Animation.startAnimation({
      node: this.refs.arrow ? this.refs.arrow : this.refs.scrollView.refs.arrow,
      duration: 200,
      easing: 'easeInQuad',
      property: 'rotation',
      toValue: orientation === 'Up' ? Math.PI : 2 * Math.PI,
    });
  },
  _onScroll: function(event) {
    var distance = -event.nativeEvent.contentOffset.y - event.nativeEvent.contentInset.top;
    this.state.distance = distance;

    if (this.state.refresh !== RefreshControlState.Refreshing) {
      if (distance >= this.props.distance) {
        this.setState({
          refresh: RefreshControlState.ReleaseToRefreshing
        });

        this._animateArrow('Up');
      } else {
        this.setState({
          refresh: RefreshControlState.PullToRefresh
        });

        this._animateArrow('Down');
      }
    }
  },
  refreshControl: function() {
    var style = {
      height: this.props.distance, 
      marginTop: this.getTweeningValue('marginTop') // this.state.marginTop
    };

    return (
      <View style={[styles.refreshControlContainer, style]}>
        <View style={{flex: 1.3}} />
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          {this._iconView(this.state.refresh)}
          {this._titleView(this.state.refresh)}
        </View>
        <View style={{flex: 1}} />
      </View>
    );
  },
  _titleView: function(state) {
    switch (state) {
      case RefreshControlState.PullToRefresh: {
        return (
          <Text style={[styles.title]}>{this.state.pullToRefreshText}</Text>
        );
      }
      case RefreshControlState.ReleaseToRefreshing: {
        return (
          <Text style={[styles.title]}>{this.state.releaseToRefreshingText}</Text>
        );
      }
      case RefreshControlState.Refreshing: {
        return (
          <Text style={[styles.title]}>{this.state.refreshingText}</Text>
        );
      }
    }
  },
  _iconView: function(state) {
    switch (state) {
      case RefreshControlState.PullToRefresh:
      case RefreshControlState.ReleaseToRefreshing: {
        return (
          <Text
            ref='arrow'
            style={{
              transform: this.state.arrowOrientation === 'Down' ? [{rotate: '0deg'}] : [{rotate: '180deg'}]
            }}>
            ↓
          </Text>
        );
      }
      case RefreshControlState.Refreshing: {
        return (
          <ActivityIndicatorIOS style={{height: 20, width: 20}} animating={true} size='small' />
        );
      }
    }
  }
};

var RCTRefreshControl = React.createClass({
  render: function() {
    return null;
  }
});

RCTRefreshControl.Mixin = RefreshControlMixin;

var styles = StyleSheet.create({
  refreshControlContainer: {
    flexDirection: 'row'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginLeft: 8
  }
});

module.exports = RCTRefreshControl;
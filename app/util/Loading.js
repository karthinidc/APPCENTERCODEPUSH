/*************************************************
 * InnovaZones
 * @exports
 * @class Loading.js
 * @extends Component
 * Created by KARTHI NALLIYAPPAN on JULY 13. 2022
 * Copyright © 2022 InnovaZones. All rights reserved.
 *************************************************/

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';

import PropTypes from 'prop-types';

import Utility from './Utility';
import Constants from './Constants';
import Spinner from 'react-native-spinkit';

class LoadingScreen extends Component {
  static propTypes = {
    isLoading: PropTypes.bool,
    message: PropTypes.string.isRequired,
    onReloadPress: PropTypes.func,
    isRefreshing: PropTypes.bool,
  };

  static defaultProps = {
    isLoading: true,
    isRefreshing: false,
    message: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      height: 100,
    };
  }

  /**
   * Renders the Loading spinner or no data message with reload option
   */
  _renderContent() {
    if (this.props.isLoading) {
      return (
        <View
          style={{
            paddingTop: this.state.height * (2 / 5),
            alignItems: 'center',
          }}>
          <Spinner
            isVisible={this.props.isLoading}
            size={40}
            type={'Wave'}
            color={Constants.COLOR.BUTTON_COLOR}
          />
          <Text
            style={{
              textAlign: 'center',
              marginTop: 40,
              fontSize: Constants.FONT_SIZE.M,
              color: Constants.COLOR.FONT_COLOR,
            }}>
            Loading...
          </Text>
        </View>
      );
    } else {
      return (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl
              refreshing={this.props.isRefreshing}
              onRefresh={() => this.props.onReloadPress(true)}
            />
          }>
          {this._renderSpinnerOrMessage()}
        </ScrollView>
      );
    }
  }

  /**
   * Renders the given message or empty screen based on pull to refresh status
   */
  _renderSpinnerOrMessage() {
    if (this.props.isRefreshing) {
      return null;
    } else {
      return (
        <View
          style={{
            paddingTop: this.state.height * (2 / 5),
            alignItems: 'center',
          }}>
          <Text
            key={'0001'}
            style={{
              textAlign: 'center',
              fontSize: Constants.FONT_SIZE.M,
            }}>
            {this.props.message}
          </Text>
          <TouchableOpacity
            style={{marginTop: 50}}
            key={'0002'}
            onPress={() => this.props.onReloadPress(false)}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: Constants.FONT_SIZE.L,
                color: Constants.COLOR.THEME_COLOR,
              }}>
              Tap to Reload
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  measureView(event) {
    this.setState({
      width: event.nativeEvent.layout.width,
      height: event.nativeEvent.layout.height,
    });
  }

  /**
   * Renders the Loading spinner or no data message with reload option
   */
  render() {
    return (
      <View
        style={{flex: 1, backgroundColor: '#FFFFFFB3'}}
        onLayout={event => this.measureView(event)}>
        {this._renderContent()}
      </View>
    );
  }
}

export default LoadingScreen;

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

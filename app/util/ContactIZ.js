/*************************************************
 * InnovaZones
 * @exports
 * @class ContactIZ.js
 * @extends Component
 * Created by KARTHI NALLIYAPPAN on JULY 11. 2022
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
  Linking,
} from 'react-native';
import PropTypes from 'prop-types';

import Utility from './Utility';
import Constants, { COLOR, FONT_SIZE, SCREEN_SIZE } from './Constants';
import Spinner from 'react-native-spinkit';

const deviceHeight = Utility.isiPhoneX()
  ? SCREEN_SIZE.PLUS_SIZE
  : Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;


class ContactIZ extends Component {
  static propTypes = {
    isIpadDevice: PropTypes.bool,
  };

  static defaultProps = {
    isIpadDevice: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      height: 100,
    };
  }

  /**
   * Renders the view
   */
  _renderContent() {
    const { isIpadDevice } = this.props;
      return (
        <View style={{justifyContent:'center', alignItems:'center', marginBottom : 7}}>
          <TouchableOpacity
           onPress={() => {
            Linking.openURL(`tel://${8334494357}`)
          }}
          >
            <Text
                style={{
                color: COLOR.FONT_COLOR,
                fontSize: deviceHeight/50,
                backgroundColor: COLOR.WHITE,
                padding:5,
                paddingHorizontal: (isIpadDevice) ? 20 : 5,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLOR.FONT_COLOR,
                overflow: 'hidden',
                }}>
                Contact Innova Zones IT Support
            </Text>
            </TouchableOpacity>
        </View>
      );
  
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
        style={{}}
        onLayout={event => this.measureView(event)}>
        {this._renderContent()}
      </View>
    );
  }
}

export default ContactIZ;

const styles = StyleSheet.create({
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

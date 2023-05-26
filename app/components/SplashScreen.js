/*************************************************
 * InnovaZones
 * @exports
 * @class SplashScreen.js
 * @extends Component
 *  * Created by KARTHI NALLIYAPPAN on JULY 11. 2022
 * Copyright © 2022 InnovaZones. All rights reserved.
 *************************************************/

'use strict';
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  checkNetworkConnection,
  updateBaseURLVer,
  updateBaseURL,
} from '../actions/NetworkAction';

import Constants from '../util/Constants';
import Utility from '../util/Utility';
import Spinner from 'react-native-spinkit';
import URL from '../util/URL';
import TouchID from 'react-native-touch-id';
import codePush from 'react-native-code-push';
import DeviceInfo from 'react-native-device-info';
import {Actions} from 'react-native-router-flux';
import { checkForCodePushNewUpdate, checkCodePush } from '../actions/CodePushUpdateActions';
import { isAppCenterBuild } from '../util/URL';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class SplashScreen extends Component {
  static propTypes = {
    checkNetworkConnection: PropTypes.func,
    showSpinner: PropTypes.func,
    isLoading: PropTypes.bool,
    errorMessage: PropTypes.string,
    checkForCodePushNewUpdate: PropTypes.func,
    checkCodePush : PropTypes.func,
    updateMessage : PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.disableYellowBox = true;
    if (
      DeviceInfo.getVersion() + ' ' + DeviceInfo.getBuildNumber() !==
      this.props.baseURLVer
    ) {
      // if (URL.BASE_URL !== this.props.baseURL) {
      //   this.props.updateBaseURL(URL.BASE_URL);
      // }
      this.props.updateBaseURLVer(
        DeviceInfo.getVersion() + ' ' + DeviceInfo.getBuildNumber(),
      );
    } else {
      URL.BASE_URL = this.props.baseURL;
    }
    this.props.checkForCodePushNewUpdate();
    if (isAppCenterBuild) {
      this._checkCodePush();
    }
    // this._checkCodePush();
    // this._checkTouchIdAndNetwork();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }

  _checkCodePush() {
    this.props.checkCodePush();
  }

  _checkTouchIdAndNetwork() {
    TouchID.isSupported()
      .then(biometryType => {
        console.log(' biometryType ===', biometryType);
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
          this.props.checkNetworkConnection(false, true);
      } else if (biometryType === 'TouchID'){
          console.log('TouchID is supported.');
          this.props.checkNetworkConnection(true, false);
      }else {
        this.props.checkNetworkConnection(false, false);
      }
      })
      .catch(error => {
        this.props.checkNetworkConnection(false, false);
      });
  }

  /**
   * Renders activity indicator when version api is being invoked
   */
  _renderAcitvityIndicator = () => {
    const {isLoading, updateMessage} = this.props;

    if (isLoading) {
      return (
        <View>
           <Spinner
           style={{marginTop: deviceWidth / 15}}
           isVisible={true}
           size={60}
           type={'ChasingDots'}
           color={Constants.COLOR.THEME_COLOR}
         />

          <Text style={{ marginTop: 40, fontSize: deviceHeight / 50 }}>
            {updateMessage}
          </Text>
        </View>

       
      );
    } else {
      return (
        <TouchableOpacity style={[styles.buttonView, { width: deviceWidth / 2, height: deviceHeight / 18, marginTop: deviceHeight / 4 }]}
          onPress={() => this._checkCodePush()}
        >
          <Text style={[styles.buttonText, { fontSize: deviceHeight / 40 }]}>
            Retry
          </Text>
        </TouchableOpacity>
      );
      // return (
      //   <View style={{paddingTop: 100 * (2 / 5), alignItems: 'center'}}>
      //     <Text
      //       key={'0001'}
      //       style={{
      //         textAlign: 'center',
      //         fontSize: Constants.FONT_SIZE.M,
      //         fontFamily: 'Lato-Medium',
      //       }}>
      //       {this.props.errorMessage}
      //     </Text>
      //     <TouchableOpacity
      //       style={{marginTop: deviceWidth / 10}}
      //       key={'0002'}
      //       onPress={() => {}}>
      //       <Text
      //         style={{
      //           textAlign: 'center',
      //           fontSize: Constants.FONT_SIZE.L,
      //           fontFamily: 'Lato-Bold',
      //           color: Constants.COLOR.THEME_COLOR,
      //         }}>
      //         Tap to Reload
      //       </Text>
      //     </TouchableOpacity>
      //   </View>
      // );
    }
  };

  /**
   * Renders Splash Screen Design
   */
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            source={require('../images/FireDepartment.png')}
            style={styles.image}
          />

          <Image
            resizeMode="contain"
            source={require('../images/Poweredby.png')}
            style={styles.image}
          />
        </View>

        {this._renderAcitvityIndicator()}
      </View>
    );
  }
}

const mapStateToProps = (state, props) => {
  //props can be called as ownProps
  const {
    splashState: {isLoading, errorMessage},
    deviceState: {baseURL, baseURLVer},
    codePushUpdateState : {updateMessage},
  } = state;

  return {
    isLoading,
    errorMessage,
    baseURL,
    baseURLVer,
    updateMessage, 
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      checkNetworkConnection,
      updateBaseURLVer,
      updateBaseURL,
      checkForCodePushNewUpdate,
      checkCodePush,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScreen);

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E5E5E5',
  },
  image: {
    width: deviceHeight/3,
    height: deviceHeight/3,
  },
});

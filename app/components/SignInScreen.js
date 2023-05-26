/*************************************************
 * InnovaZones
 * @exports
 * @class SignInScreen.js
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
  TextInput,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import Constants, { COLOR } from '../util/Constants';
import Utility from '../util/Utility';
import Spinner from 'react-native-spinkit';
import DeviceInfo from 'react-native-device-info';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Actions} from 'react-native-router-flux';
import {loginButtonSubmit} from '../actions/SignInAction';
import {updateBaseURL} from '../actions/NetworkAction';
// import {trackViewedScreen} from '../actions/AnalyticsAction';
import URL, { HOST_NAME, PROTOCAL } from '../util/URL';
import TouchID from 'react-native-touch-id';
import moment from 'moment';
import ContactIZ from '../util/ContactIZ';
import CodePushUpdateView from './CodePushUpdateView';
import { isDisplayBuildNo, isProduction, APP_DISPLAY_VERSION, APP_BUILD_NO } from '../util/URL';
import codePush from 'react-native-code-push';
import {updateHostName, updateAPIVersion } from '../actions/NetworkAction';

const deviceHeight = Utility.isiPhoneX()
  ? Constants.SCREEN_SIZE.PLUS_SIZE
  : Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class SignInScreen extends Component {
  static propTypes = {
    isPageLoading: PropTypes.bool,
    isLoginLoading: PropTypes.bool,
    isIpadDevice: PropTypes.bool,
    deviceHeight: PropTypes.number, 
    deviceWidth: PropTypes.number,
    hostName : PropTypes.string,
    apiVersion : PropTypes.string,


    updateHostName : PropTypes.func, 
    updateAPIVersion : PropTypes.func, 
    loginButtonSubmit: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '', // qademo@gmail.com 
      password: '', // admin
      passwordSecure: true,
      baseURLTxt: URL.BASE_URL,
      showURLAlert: false,
      deviceHeight: Dimensions.get('window').height,
      bundleVersion :'',
      hostName: '',
    };
  }

  componentDidMount() {
    // this.props.trackViewedScreen('Signin');
    const { hostName, apiVersion } = this.props;
    this.setState({ hostName, apiVersion });
    this._showTouchId();
    codePush.getUpdateMetadata().then((metadata) => {
      this.setState({ bundleVersion: metadata.label, version: metadata.appVersion });
    });
  }
  

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState;
  }

  _showTouchId() { 
    if (
      this.props.loggedInUserDetails &&
      !this.props.loggedInUserDetails.token.revoked &&
      moment(this.props.loggedInUserDetails.token.expires_at).isAfter(
        moment().add(1, 'days'),
      )
    ) {
      if ((this.props.isTouchIdAvailable && this.props.useTouchID) || (this.props.isFaceIdAvailable && this.props.useFaceID)) {
        const optionalConfigObject = {
          title: 'Login to Sanitizit App', // Android
          imageColor: Constants.COLOR.THEME_COLOR, // Android
          imageErrorColor: '#ff0000', // Android
          sensorDescription: 'Touch sensor', // Android
          sensorErrorDescription: 'Failed', // Android
          cancelText: 'Cancel', // Android
          unifiedErrors: false, // use unified error messages (default false)
          passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
        };

        TouchID.authenticate(
          'Authentication is needed to login to the app.',
          optionalConfigObject,
        )
          .then(success => {
            console.log('==========isTouchIdAvailable success=========');

            Actions.homeScreen();
          })
          .catch(error => {
            //
          });
      } else {
        console.log('==========homeScreen success=========');
        Actions.homeScreen();
      }
    }
  }

  _validateInputs() {
    if (this.state.username.trim().length === 0) {
      Utility.showAlert(
        Constants.ALERT.TITLE.ERROR,
        Constants.VALIDATION_MSG.NO_USERNAME,
      );
    } else if (this.state.password.trim().length === 0) {
      Utility.showAlert(
        Constants.ALERT.TITLE.ERROR,
        Constants.VALIDATION_MSG.NO_PASSWORD,
      );
    } else {
      this.props.loginButtonSubmit(
        this.state.username.trim(),
        this.state.password.trim(),
      );
    }
  }

  _settingSaveButtonTouched() {
    const { hostName } = this.state;
    if(hostName.trim() ==='') {
      Utility.showAlert(
        Constants.ALERT.TITLE.INFO,
        Constants.VALIDATION_MSG.HOST_NAME,
      );
      return;
    }
    this.setState({ showURLAlert: false});
    this.props.updateHostName(hostName.trim());
  }

  _renderLoginButton() {
    const { isIpadDevice, deviceHeight } = this.props;
    if (this.props.isLoginLoading) {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Spinner
            isVisible={this.props.isLoginLoading}
            size={(isIpadDevice) ? deviceHeight/26 : deviceHeight/26}
            type={'Wave'}
            color={'white'}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={[styles.loginText, {fontSize: (isIpadDevice) ?  deviceHeight/30 : deviceHeight/30}]}>Login</Text>
        </View>
      );
    }
  }

  _renderURLInfo() {
    const { hostName} = this.props;
    let fullURL = PROTOCAL + hostName;
    if (!isProduction) {
      return (
        <Text>
          <Text style={{fontWeight: 'bold'}}>URL: </Text>
          <Text>{fullURL}</Text>
        </Text>
      );
    } else {
      return null;
    }
  }

  _renderTouchId() {
    if (
      this.props.loggedInUserDetails &&
      !this.props.loggedInUserDetails.token.revoked &&
      moment(this.props.loggedInUserDetails.token.expires_at).isAfter(
        moment().add(1, 'days'),
      ) &&
      this.props.isTouchIdAvailable &&
      this.props.useTouchID
    ) {
      return (
        <TouchableOpacity
          style={styles.touchableTouchId}
          onPress={() => this._showTouchId()}>
          <Image
            resizeMode="contain"
            source={require('../images/TouchID.png')}
            style={[styles.imageTouchId]}
          />
        </TouchableOpacity>
      );
    }
   else if(this.props.loggedInUserDetails &&
      !this.props.loggedInUserDetails.token.revoked &&
      moment(this.props.loggedInUserDetails.token.expires_at).isAfter(
        moment().add(1, 'days'),
      ) && this.props.isFaceIdAvailable &&  this.props.useFaceID) {
      return (
        <TouchableOpacity
          style={styles.touchableFaceId}
          onPress={() => this._showTouchId()}>
          <Image
            resizeMode="contain"
            source={require('../images/FaceId.png')}
            style={[styles.imageTouchId]}
          />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  /**
   * Method is called when view size changed due to screen orientation changed.
   */
  onLayout(e) {
    this.setState({deviceHeight: e.nativeEvent.layout.height});
  }

  /**
   * Renders activity indicator when version api is being invoked
   */
  _renderScreen = () => {
    const {isPageLoading, isIpadDevice, deviceHeight} = this.props;
    const { hostName , apiVersion} = this.state;
      console.log('this.state.deviceHeight ', this.state.deviceHeight, deviceHeight);
      let version = APP_DISPLAY_VERSION;
      let buildNo = APP_BUILD_NO;
      let appVersion = `${version}.${ buildNo}`;
      if (isProduction && !isDisplayBuildNo) {
        appVersion = version;
      }
    if (isPageLoading) {
      return (
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              source={require('../images/FireDepartment.png')}
              style={styles.image}
            />
          </View>

          <Spinner
            style={{marginTop: deviceHeight / 10}}
            isVisible={true}
            size={40}
            type={'Wave'}
            color={Constants.COLOR.THEME_COLOR_2}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container} onLayout={this.onLayout.bind(this)}>
          <KeyboardAwareScrollView>
            <View
              style={{
                paddingHorizontal: deviceHeight * (1 / 35),
                height: this.state.deviceHeight + 25,
                justifyContent: 'center',
              }}>

                <View style={{justifyContent: 'center', alignItems:'center'}}>
                <Image
                style={{
                  width: (isIpadDevice) ? deviceWidth/3 : deviceWidth/2,
                  height: (isIpadDevice) ? deviceWidth/3 : deviceWidth/2,
                  marginTop: deviceHeight * (1 / 10),
                }}
                resizeMode="contain"
                source={require('../images/FireDepartment.png')}
              />

                </View>
             

              <Text
                style={{
                  color: Constants.COLOR.FONT_COLOR,
                  fontSize: (isIpadDevice) ? deviceHeight/32 : deviceHeight/32,
                  marginTop: deviceHeight * (1 / 20),
                  fontWeight: 'bold',
                }}>
                Welcome to Fire Department App - CODE PUSH TESTING
              </Text>

              <Text
                style={{
                  color: Constants.COLOR.FONT_COLOR,
                  fontSize:(isIpadDevice) ? deviceHeight/38 : deviceHeight/38,
                }}>
                Sign in to continue
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: deviceHeight / 30,
                }}>
                <Image
                  style={{width: deviceHeight / 40, height: deviceHeight / 40}}
                  resizeMode="contain"
                  source={require('../images/username.png')}
                />

                <TextInput
                  style={[styles.textinput, {fontSize: deviceHeight/35}]}
                  underlineColorAndroid={'transparent'}
                  placeholder={'Username'}
                  value={this.state.username}
                  onChangeText={username => {
                    this.setState({username});
                  }}
                  placeholderTextColor={Constants.COLOR.FONT_HINT}
                  autoCapitalize={'none'}
                  returnKeyType={'next'}
                  onSubmitEditing={() => this.passwordInputText.focus()}
                />
              </View>

              <View
                style={{backgroundColor: Constants.COLOR.FONT_COLOR, height: 1}}
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: deviceHeight / 30,
                }}>
                <Image
                  style={{width: deviceHeight / 40, height: deviceHeight / 40}}
                  resizeMode="contain"
                  source={require('../images/password.png')}
                />

                <TextInput
                  ref={input => (this.passwordInputText = input)}
                  style={[styles.textinput, {fontSize: deviceHeight/35}]}
                  underlineColorAndroid={'transparent'}
                  placeholder={'Password'}
                  value={this.state.password}
                  onChangeText={password => {
                    this.setState({password});
                  }}
                  placeholderTextColor={Constants.COLOR.FONT_HINT}
                  autoCapitalize={'none'}
                  returnKeyType={'done'}
                  onSubmitEditing={() => {
                    this._validateInputs();
                  }}
                  secureTextEntry={this.state.passwordSecure}
                />
                <TouchableOpacity
                  style={{paddingVertical: 10}}
                  onPress={() => {
                    this.setState({
                      passwordSecure: !this.state.passwordSecure,
                    });
                  }}>
                  <Image
                    source={
                      this.state.passwordSecure
                        ? require('../images/EyeHidden.png')
                        : require('../images/EyeView.png')
                    }
                    resizeMode={'contain'}
                    style={{
                      width: deviceHeight / 30,
                      height: deviceHeight / 30,
                      marginRight: 10,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{backgroundColor: Constants.COLOR.FONT_COLOR, height: 1}}
              />

              <View
                style={{flexDirection: 'row', marginTop: deviceHeight / 18}}>
                <View style={{flex: 1}} />

                <TouchableOpacity
                  style={{
                    flex: 5,
                    backgroundColor: COLOR.BUTTON_COLOR,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 10,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    this._validateInputs();
                  }}>
                  {this._renderLoginButton()}
                </TouchableOpacity>

                <View style={{flex: 1}} />
              </View>

              {/* <View
                style={{
                  flexDirection: 'row',
                  marginTop: deviceHeight / 50,
                  justifyContent: 'center',
                }}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </View> */}

              <View style={{flex: 1}} />
              {this._renderTouchId()}             

              <View style={{marginTop: 10}}/>
              <ContactIZ
              isIpadDevice={this.props.isIpadDevice}
              />

              <Image
                style={{
                  width: deviceWidth * (9 / 10),
                  height: deviceWidth / 15,
                  marginTop: 10,
                }}
                resizeMode="contain"
                source={require('../images/Poweredby.png')}
              />
              <View style={{flexDirection: 'row', padding: 5}}>
                <Text style={[styles.versionText, {flex: 1, marginRight: 10}]}>
                  {this._renderURLInfo()}
                </Text>
                <TouchableHighlight
                  underlayColor="transparent"
                  onLongPress={() => {
                    this.setState({
                      baseURLTxt: this.props.baseURL,
                      showURLAlert: true,
                    });
                  }}>
                  <Text style={styles.versionText}>
                  Version: {appVersion} 
                    {/* Version: {DeviceInfo.getVersion()} (
                    {DeviceInfo.getBuildNumber()}) */}
                  </Text>
                </TouchableHighlight>

                {
              (this.state.bundleVersion) ?
                <Text style={styles.versionText}>
                  Bundle {this.state.bundleVersion}
                </Text>
                :
                null
            }
              </View>
            </View>
          </KeyboardAwareScrollView>
          {
            //URL popup starts
          }

          <Modal
            animationType={'fade'}
            transparent={true}
            visible={this.state.showURLAlert}
            onRequestClose={() => {
              this.setState({baseURLTxt: URL.BASE_URL, showURLAlert: false});
            }}>
            <SafeAreaView style={styles.modalFullContainer}>
              <View style={styles.modalMainContainer}>
                <View style={styles.modalInnerContainer}>
                  <Text style={[styles.modalTitleText, {fontSize: deviceHeight/40}]}>Current Base URL</Text>

                  <View style={styles.modalTitleBottomLine} />

                  <Text style={{marginTop: 15}}>
                    <Text
                      style={{
                        fontSize: deviceHeight/40,
                        color: Constants.COLOR.FONT_COLOR,
                      }}>
                      Enter Host Name
                    </Text>
                    <Text
                      style={{
                        fontSize: deviceHeight/50,
                        color: Constants.COLOR.FONT_HINT,
                      }}>
                      {'\n'}ie: {PROTOCAL + hostName}/{apiVersion}
                    </Text>
                  </Text>

                  <TextInput
                    style={{
                      fontSize: deviceHeight/40,
                      paddingLeft: 5,
                      marginTop: 5,
                      marginBottom: 5,
                      color: '#000',
                    }}
                    placeholder="Base URL"
                    returnKeyType="go"
                    autoCapitalize="none"
                    multiline={true}
                    autoCorrect={false}
                    onChangeText={hostName => this.setState({hostName})}
                    value={hostName}
                    onSubmitEditing={() => {
                      URL.BASE_URL = this.state.baseURLTxt;
                      this.setState({
                        baseURLTxt: URL.BASE_URL,
                        showURLAlert: false,
                      });
                      this._settingSaveButtonTouched();
                    }}
                  />

                  <TouchableOpacity
                    style={styles.modalDoneButton}
                    onPress={() => {
                      URL.BASE_URL = this.state.baseURLTxt;
                      this.setState({
                        baseURLTxt: URL.BASE_URL,
                       
                      });
                      this._settingSaveButtonTouched();
                    }}>
                    <Text style={[styles.modalDoneButtonText, {fontSize: deviceHeight/40}]}>Apply</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.modalCloseTouchable}
                  onPress={() => {
                    this.setState({
                      baseURLTxt: URL.BASE_URL,
                      showURLAlert: false,
                    });
                  }}>
                  <Image
                    resizeMode="contain"
                    source={require('../images/ClosePopup.png')}
                    style={styles.modalCloseImage}
                  />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </Modal>
          {
            //URL popup ends
          }
        </View>
      );
    }
  };

  /**
   * Renders Splash Screen Design
   */
  render() {
    return this._renderScreen();
  }
}

const mapStateToProps = (state, props) => {
  //props can be called as ownProps
  const {
    signInState: {isPageLoading, isLoginLoading},
    loggedInUserDetailsState: {loggedInUserDetails, scope},
    deviceState: {
      isTouchIdAvailable, 
      useTouchID, 
      useFaceID,
      baseURL, 
      isIpadDevice,
      deviceHeight, 
      deviceWidth,
      isFaceIdAvailable,
    },
    serverHostURLState: {hostName, apiVersion},

  } = state;

  return {
    isPageLoading,
    isLoginLoading,
    loggedInUserDetails,
    scope,
    isTouchIdAvailable,
    isFaceIdAvailable,
    useTouchID,
    useFaceID,
    baseURL,
    isIpadDevice,
    deviceHeight, 
    deviceWidth,
    hostName, 
    apiVersion,
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      // trackViewedScreen,
      loginButtonSubmit,
      updateBaseURL,
      updateHostName, 
      updateAPIVersion,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInScreen);

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  image: {
    width: deviceHeight * (5 / 12),
    height: deviceHeight * (3 / 20),
  },
  textinput: {
    flex: 1,
    color: Constants.COLOR.FONT_COLOR,
    padding: 10,
    fontSize: Constants.FONT_SIZE.L,
  },
  loginText: {
    color: 'white',
    fontSize: Constants.FONT_SIZE.XL,
    fontWeight: '500',
  },
  forgotText: {
    color: Constants.COLOR.FONT_COLOR,
    fontSize: Constants.FONT_SIZE.M,
    paddingLeft: 10,
    paddingVertical: 10,
  },
  versionText: {
    color: Constants.COLOR.FONT_COLOR,
    fontSize: Constants.FONT_SIZE.S,
    padding: 5,
  },
  imageTouchId: {
    width: 60,
    height: 60,
    tintColor: Constants.COLOR.THEME_COLOR,
  },
  touchableTouchId: {
    width: 60,
    height: 60,
    alignSelf: 'flex-end',
  },
  touchableFaceId: {
    width: 60,
    height: 60,
    alignSelf: 'flex-start',
  },
  modalFullContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.60)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMainContainer: {
    width: deviceWidth / 1.1,
  },
  modalInnerContainer: {
    margin: 10,
    backgroundColor: 'white',
    padding: 3,
    borderRadius: 5,
  },
  modalCloseTouchable: {
    height: deviceHeight / 25,
    width: deviceHeight / 25,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
  },
  modalCloseImage: {
    height: deviceHeight / 25,
    width: deviceHeight / 25,
  },
  modalTitleText: {
    backgroundColor: 'white',
    padding: 10,
    fontSize: Constants.FONT_SIZE.L,
    textAlign: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowOffset: {
      height: 1,
      width: 0.3,
    },
  },
  modalTitleBottomLine: {
    height: 1,
    backgroundColor: Constants.COLOR.THEME_COLOR,
    marginBottom: 10,
  },
  modalDoneButton: {
    backgroundColor: Constants.COLOR.BUTTON_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    padding: 7,
    borderRadius: 2,
  },
  modalDoneButtonText: {
    fontSize: Constants.FONT_SIZE.L,
    color: 'white',
    fontWeight:'bold',
  },
  bottomLine: {
    height: 1,
    backgroundColor: '#CDCDCD',
  },
});

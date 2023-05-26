/*************************************************
 * InnovaZone
 * CodePushUpdateView.js
 * Created by Karthi Nalliyappan on 26 NOVEMBER 2020
 * Copyright © 2019 InnovaZone. All rights reserved.
 *************************************************/

'use strict';

import React, { Component } from 'react';
import { 
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types'; 
import { COLOR } from '../util/Constants';
import BlinkView from 'react-native-blink-view';
import codePush from 'react-native-code-push';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { installCodePush, checkForNewUpdate } from '../actions/CodePushUpdateActions';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

class CodePushUpdateView extends Component {

  static propTypes = {
    installCodePush : PropTypes.func,
    checkForNewUpdate: PropTypes.func,

    isNetworkConnectivityAvailable: PropTypes.bool,
    isLoginLoading :PropTypes.bool,
    isLandscape : PropTypes.bool,
    deviceWidth: PropTypes.number,
    deviceHeight: PropTypes.number,

    codePushUpdateAvailable : PropTypes.bool, 
    codePushBundleRestartAvailable: PropTypes.bool,
    message: PropTypes.string,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.checkForNewUpdate(); 
  }

  /**
   * Get triggered when the view is unmounted on the window
   * Put off the EventBus
   */
  componentWillUnmount() {
    //
  }


  /**
   * Button action
   * Download the code push bundle
   * If Restart available -- App will restart
   */
  
  onPressAction() {
    const {codePushUpdateAvailable, codePushBundleRestartAvailable } = this.props;
    console.log('onPressAction ', codePushUpdateAvailable, codePushBundleRestartAvailable);
    if (codePushUpdateAvailable) {
      this.props.installCodePush();
    } else if (codePushBundleRestartAvailable) {
      codePush.restartApp();
    }
  }

  /**
   * Method is called when the code push update available.
   */
  render() {
    const { codePushUpdateAvailable, codePushBundleRestartAvailable, message, isLandscape } = this.props;
    if (codePushUpdateAvailable || codePushBundleRestartAvailable) {
      return (
        <View style={{ position:'absolute', alignItems:'center', justifyContent:'center', marginHorizontal:Platform.OS === 'ios' ? 93 : 105}}>
          <BlinkView blinking={true} delay={1000}>
            <TouchableOpacity
              onPress={()=>{
                this.onPressAction();
              }}
            >
              <View style={styles.containerView}>
                <Text style={styles.messageText}>
                  {message}
                </Text>
              </View>
            </TouchableOpacity>
          </BlinkView>
        </View>
      ); 
    }else{
      return(
        <View/>
      );
    }
  }
}

const styles=StyleSheet.create({
  containerView: {
    marginTop: Platform.OS === 'ios' ? 40 : 0,
    backgroundColor: COLOR.GREEN,
    alignItems:'center', 
    justifyContent:'center', 
    borderRadius: 10,
  },
  messageText:{
    fontSize: deviceHeight/56.88, 
    color: COLOR.WHITE, 
    textAlign:'center', 
    paddingHorizontal:10,
    paddingVertical:10,
  },
  
});


// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state, props) => {
  //props can be called as ownProps
  const {
    codePushUpdateState: {    
      codePushUpdateAvailable, 
      codePushBundleRestartAvailable,
      message,
    },
    deviceState: { isNetworkConnectivityAvailable, deviceHeight, deviceWidth},
  } = state;

  return {
    codePushUpdateAvailable, 
    codePushBundleRestartAvailable,
    message,

    deviceWidth,
    deviceHeight,
    isNetworkConnectivityAvailable,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      installCodePush, 
      checkForNewUpdate,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodePushUpdateView);
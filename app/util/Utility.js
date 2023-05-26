/*************************************************
 * InnovaZones
 * Utility.js
 *  * Created by KARTHI NALLIYAPPAN on JULY 11. 2022
 * Copyright © 2022 InnovaZones. All rights reserved.
 *************************************************/

import {Alert, Dimensions} from 'react-native';

import {Actions} from 'react-native-router-flux';

export let userTokenRenewalTimer;
import {ALERT, COLOR} from './Constants';
const {height} = Dimensions.get('window');
import Snackbar from 'react-native-snackbar';

export default class Utility {
  static showAlert(title, message) {
    Alert.alert(title, message), [{text: 'OK'}];
  }

  static showSnackBar(message, isSuccess) {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: (isSuccess) ? COLOR.BUTTON_GREEN : COLOR.THEME_COLOR
    });
  }

  static showAlertWithPopAction(title, message) {
    Alert.alert(
      title,
      message,
      [{text: ALERT.BTN.OK, onPress: () => Actions.pop()}],
      {cancelable: false},
    );
  }

  static validateQRCode(qrcode) {
    let re = /^[0-9]+$/;
    return re.test(String(qrcode));
  }

  static validateEmail(email) {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  static myLog(...params) {
    console.log(...params);
  }


  

  /**
   * Finds the device
   * @returns boolean value
   */
  static isiPhoneX() {
    if (height === 812) {
      // iPhone X / iPhone XS
      return true;
    } else if (height === 896) {
      // iPhone XS Max / iPhone XR
      return true;
    } else {
      return false;
    }
  }
}

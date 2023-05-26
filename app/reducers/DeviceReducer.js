/*************************************************
 * InnovaZones
 * @exports
 * @class DeviceReducer.js
 *  * Created by KARTHI NALLIYAPPAN on JULY 11. 2022
 * Copyright © 2022 InnovaZones. All rights reserved.
 *************************************************/

'use strict';

import Constants, { SCREEN_SIZE, SCREEN_TITLE } from '../util/Constants';
import {BASE_URL} from '../util/URL';
import DeviceInfo from 'react-native-device-info';
import { Dimensions } from 'react-native';
import Utility from '../util/Utility';

let initialState = {
  isNetworkConnectivityAvailable: undefined, //Used to check whether internet is connected or not
  isTouchIdAvailable: false, //Used to check whether touch id support available in device or not
  useTouchID: true, //Used to check whether touch id support enabled from user preference in settings option
  useFaceID : true, //Used to check whether face id support enabled from user preference in settings option
  isSystemAlertShowing: false, //used to check whether system alert is showing or not
  isTransparentLoading: false, //used to check whether show loading or not
  baseURL: BASE_URL,
  baseURLVer: '',
  isIpadDevice: DeviceInfo.isTablet() ? true : false, //Used to check whether iPad or iPhone
  deviceHeight: Utility.isiPhoneX() ? SCREEN_SIZE.PLUS_SIZE : Dimensions.get('window').height,
  deviceWidth: Dimensions.get('window').width,
  isFaceIdAvailable: false, //Used to check whether face id support available in device or not

};

const {
  ACTIONS: {
    NETWORK_STATUS_CHANGED,
    UPDATE_DEVICE_TOUCH_ID_AVAILABLE,
    UPDATE_DEVICE_FACE_ID_AVAILABLE,
    UPDATE_BASE_URL,
    UPDATE_BASE_URL_VER,
    UPDATE_TOUCH_ID_STATUS,
    UPDATE_GOOGLE_ANALYTICS_STATUS,
    DEVICE_ALERT_DISPLAYED,
    DEVICE_ALERT_CLOSED,
    DEVICE_ALERT_UPDATE,
    UPDATE_FACE_ID_STATUS,
  },
} = Constants;

export const deviceState = (state = initialState, action) => {
  const {
    type,
    baseURL,
    baseURLVer,
    useTouchID,
    useFaceID,
    useGoogleAnalytics,
    isTouchIdAvailable,
    isFaceIdAvailable,
    isNetworkConnectivityAvailable,
    isSystemAlertShowing,
  } = action;
  switch (type) {
    case NETWORK_STATUS_CHANGED:
      return {...state, isNetworkConnectivityAvailable};
    case UPDATE_TOUCH_ID_STATUS:
      return {...state, useTouchID};
      case UPDATE_FACE_ID_STATUS:
        return {...state, useFaceID};
      
    case UPDATE_BASE_URL:
      return {...state, baseURL};
    case UPDATE_BASE_URL_VER:
      return {...state, baseURLVer};
    case UPDATE_GOOGLE_ANALYTICS_STATUS:
      return {...state, useGoogleAnalytics};
    case UPDATE_DEVICE_TOUCH_ID_AVAILABLE:
      return {...state, isTouchIdAvailable};
      case UPDATE_DEVICE_FACE_ID_AVAILABLE:
        return {...state, isFaceIdAvailable};
      
    case DEVICE_ALERT_DISPLAYED:
      return {...state, isSystemAlertShowing: true};
    case DEVICE_ALERT_CLOSED:
      return {...state, isSystemAlertShowing: false};
    case DEVICE_ALERT_UPDATE:
      return {...state, isSystemAlertShowing};
    default:
      return state;
  }
};


let initialServerHostState = {
  hostName: 'qaizfire.com', // Production host name
  apiVersion: 'v2', // API Version
};

const {
  ACTIONS: {
    SERVER_HOST_NAME,
    SERVER_API_VERSION,
    SERVER_URL_RESET,
  },
} = Constants;


export const serverHostURLState = (state = initialServerHostState, action) => {
  const {
    type,
  } = action;
  switch (type) {
    case SERVER_HOST_NAME:
      return {...state, hostName: action.payload};
    case SERVER_API_VERSION:
      return {...state, apiVersion: action.payload};
    case SERVER_URL_RESET:
      return {...initialServerHostState };
    default:
      return state;
  }
};
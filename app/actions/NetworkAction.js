/*************************************************
 * InnovaZones
 * @exports
 * @class NetworkAction.js
 *  * Created by KARTHI NALLIYAPPAN on JULY 11. 2022
 * Copyright © 2022 InnovaZones. All rights reserved.
 *************************************************/
'use strict';

import {Alert} from 'react-native';

import NetInfo from '@react-native-community/netinfo';

import Constants from '../util/Constants';
import Utility from '../util/Utility';
import {Actions} from 'react-native-router-flux';
import {logoutUser} from './SignInAction';

/**
 * Checks the internet connection and sets the status in the state of the store
 */
export const checkNetworkConnection = (isTouchIdAvailable = false, isFaceIdAvailable = false) => {
  return (dispatch, getState) => {
    dispatch({
      type: Constants.ACTIONS.UPDATE_DEVICE_TOUCH_ID_AVAILABLE,
      isTouchIdAvailable,
    });

    dispatch({
      type: Constants.ACTIONS.UPDATE_DEVICE_FACE_ID_AVAILABLE,
      isFaceIdAvailable,
    });
    

    NetInfo.addEventListener(state => {
      const {
        ACTIONS: {NETWORK_STATUS_CHANGED},
      } = Constants;
      if (getState().deviceState.isNetworkConnectivityAvailable === undefined) {
        dispatch({
          type: NETWORK_STATUS_CHANGED,
          isNetworkConnectivityAvailable: state.isConnected,
        });
        console.log('******* state.isConnected *********:', state.isConnected );
        Actions.signInScreen();
      } else {
        dispatch({
          type: NETWORK_STATUS_CHANGED,
          isNetworkConnectivityAvailable: state.isConnected,
        });
      }
    });
  };
};

/**
 * Checks the internet connection and sets the status in the state of the store
 */
export const handleError = (error, showAlert = true) => {
  return (dispatch, getState) => {
    try {
      if (error) {
        if (
          error.status === Constants.HTTP_CODE.AUTHENTICATION_FAILURE ||
          error.status === Constants.HTTP_CODE.REQUIRED_MISSING
        ) {
          Alert.alert(
            Constants.ALERT.TITLE.EXPIRED,
            Constants.VALIDATION_MSG.EXPIRED,
            [
              {
                text: Constants.ALERT.BTN.OK,
                onPress: () => {
                  dispatch(logoutUser());
                },
              },
            ],
            {cancelable: false},
          );
        } else {
          if (showAlert) {
            if (!getState().deviceState.isNetworkConnectivityAvailable) {
              Utility.showAlert(
                Constants.ALERT.TITLE.FAILED,
                Constants.VALIDATION_MSG.NO_INTERNET,
              );
            } else if (error.status && error.status === 422) {
              Utility.showAlert(
                Constants.ALERT.TITLE.FAILED,
                'Permission denied.',
              );
            } else if (error.message) {
              if (error.message.includes('Network Error')) {
                Utility.showAlert(
                  Constants.ALERT.TITLE.FAILED,
                  Constants.VALIDATION_MSG.NO_INTERNET,
                );
              } else if (error.message.includes('timeout of')) {
                Utility.showAlert(
                  Constants.ALERT.TITLE.FAILED,
                  Constants.VALIDATION_MSG.TIME_OUT_ERROR_MESSAGE,
                );
              } else {
                Utility.showAlert(
                  Constants.ALERT.TITLE.FAILED,
                  Constants.VALIDATION_MSG.REQ_FAILED,
                );
              }
            } else {
              Utility.showAlert(
                Constants.ALERT.TITLE.FAILED,
                Constants.VALIDATION_MSG.REQ_FAILED,
              );
            }
          }
        }
      } else {
        Utility.showAlert(
          Constants.ALERT.TITLE.FAILED,
          Constants.VALIDATION_MSG.NO_INTERNET,
        );
      }
    } catch (e) {
      Utility.showAlert(
        Constants.ALERT.TITLE.WENT_WRONG,
        Constants.VALIDATION_MSG.WENT_WRONG,
      );
    }
  };
};

export const updateBaseURL = baseURL => {
  return dispatch => {
    dispatch(logoutUser(false));
    dispatch({
      type: Constants.ACTIONS.UPDATE_BASE_URL,
      baseURL,
    });
  };
};

export const updateBaseURLVer = baseURLVer => {
  return dispatch => {
    dispatch({
      type: Constants.ACTIONS.UPDATE_BASE_URL_VER,
      baseURLVer,
    });
  };
};


/**
* Update the server host name.
*/
export const updateHostName = (hostName) => {
  return (dispatch, getState) => {
    dispatch({
      type: Constants.ACTIONS.SERVER_HOST_NAME,
      payload: hostName,
    });
  };
};

/**
* Update the server API version.
*/
export const updateAPIVersion = (apiVersion) => {
  return (dispatch, getState) => {
    dispatch({
      type: Constants.ACTIONS.SERVER_API_VERSION,
      payload: apiVersion,
    });
  };
};
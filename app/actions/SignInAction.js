/*************************************************
 * InnovaZones
 * @exports
 * @class SignInAction.js
 *  * Created by KARTHI NALLIYAPPAN on JULY 11. 2022
 * Copyright © 2022 InnovaZones. All rights reserved.
 *************************************************/
'use strict';

import Constants, { ALERT, VALIDATION_MSG } from '../util/Constants';
import Utility from '../util/Utility';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import {OAUTH, CHANGE_PASSWORD, PROTOCAL, PATH} from '../util/URL';
import {Alert} from 'react-native';
  
  

export const loginButtonSubmit = (email, password) => {
  return (dispatch, getState) => {
    if (!getState().deviceState.isNetworkConnectivityAvailable) {
      Utility.showAlert(
        ALERT.TITLE.INFO,
        VALIDATION_MSG.NO_INTERNET,
      );
      return;
    }
    console.log('********* email, password ***********:', email, password);
   
  };
};

export const changePasswordSubmit = (
  current_password,
  new_password,
  c_new_password,
  fromLoginPage,
  loggedInUserDetails,
  scope,
) => {
  return (dispatch, getState) => {
    dispatch(showTransLoading());

    let email = '';
    if (fromLoginPage) {
      email = loggedInUserDetails.token.name.split('  ')[
        loggedInUserDetails.token.name.split('  ').length - 1
      ];
    } else {
      email = getState().loggedInUserDetailsState.loggedInUserDetails.token.name.split(
        '  ',
      )[
        getState().loggedInUserDetailsState.loggedInUserDetails.token.name.split(
          '  ',
        ).length - 1
      ];
    }
    HttpBaseClient.post(
      CHANGE_PASSWORD,
      {email, current_password, new_password, c_new_password},
      1,
    )
      .then(response => {
        dispatch(hideTransLoading());
        Utility.showSnackBar('Password changed successfully');
        if (fromLoginPage) {
          dispatch({
            type: Constants.ACTIONS.LOGGEDIN_USER_DETAILS_UPDATE,
            loggedInUserDetails,
            scope,
          });
          Actions.homeScreen();
        } else {
          Actions.pop();
        }
      })
      .catch(error => {
        dispatch(hideTransLoading());
        Utility.showAlert(
          Constants.ALERT.TITLE.ERROR,
          'Unable to reset password',
        );
      });
  };
};

export const showLogoutAlert = () => {
  return dispatch => {
    Alert.alert(
      ALERT.TITLE.TITLE,
      VALIDATION_MSG.LOGOUT_MSG,
      [
        {
          text: ALERT.BTN.LOGOUT,
          onPress: () => {
            dispatch(logoutUser());
          },
        },
        {
          text: ALERT.BTN.CANCEL,
        },
      ],
      {cancelable: false},
    );
  };
};

export const logoutUser = (isNav = true) => {
  return dispatch => {
    dispatch({
      type: Constants.ACTIONS.LOGGEDIN_USER_DETAILS_RESET,
    });
    if (isNav) {
      Actions.signInScreen();
    }
  };
};

export const showLoginLoading = () => {
  return dispatch => {
    dispatch({
      type: Constants.ACTIONS.LOGIN_SHOW_LOADING,
    });
  };
};

export const hideLoginLoading = () => {
  return dispatch => {
    dispatch({
      type: Constants.ACTIONS.LOGIN_HIDE_LOADING,
    });
  };
};

export const showPageLoading = () => {
  return dispatch => {
    dispatch({
      type: Constants.ACTIONS.LOGIN_SHOW_PAGE_LOADING,
    });
  };
};

export const hidePageLoading = () => {
  return dispatch => {
    dispatch({
      type: Constants.ACTIONS.LOGIN_HIDE_PAGE_LOADING,
    });
  };
};

export const showTransLoading = () => {
  return dispatch => {
    dispatch({
      type: Constants.ACTIONS.LOGIN_SHOW_TRAN_LOADING,
    });
  };
};

export const hideTransLoading = () => {
  return dispatch => {
    dispatch({
      type: Constants.ACTIONS.LOGIN_HIDE_TRAN_LOADING,
    });
  };
};

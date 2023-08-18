/*************************************************
 * InnovaZones
 * @exports
 * Constants.js
 *  * Created by KARTHI NALLIYAPPAN on JULY 11. 2022
 * Copyright © 2022 InnovaZones. All rights reserved.
 *************************************************/

'use strict';

/**
 * Returns all the constants used in the application
 * Separate constants according to the category and usage
 */
module.exports = {
  IS_BETA: true,
  SCREEN_SIZE: {
    PLUS_SIZE: 667,
  },
  CODE_PUSH : {
    ANDROID: {
      DEVELOPMENT: 'HkrDuFSa1aWw7iNQVp1YoffVMHDYnVnAmKNA1',
    },
    IOS: {
      DEVELOPMENT: '2bA33bIiMcUlmw4eSKlUiOUiOntS9D0KLF1pF',
    },
    PRODUCTION_UPDATE_CHECK_TIMEOUT :12*1,  // hours-day
    DEVELOPMENT_UPDATE_CHECK_TIMEOUT : 0.5*1,  // hours-day  
    // 0.084 --> 5mins
    // 0.25 --> 15mins
    // 0.5  --> 30mins
  },

  ACTIONS: {
    //Common Actions
    NETWORK_STATUS_CHANGED: 'NETWORK_STATUS_CHANGED',
    UPDATE_DEVICE_TOUCH_ID_AVAILABLE: 'UPDATE_DEVICE_TOUCH_ID_AVAILABLE',
    UPDATE_DEVICE_FACE_ID_AVAILABLE: 'UPDATE_DEVICE_FACE_ID_AVAILABLE',
    APP_GOES_TO_BACKGROUND: 'APP_GOES_TO_BACKGROUND',
    UPDATE_BASE_URL: 'UPDATE_BASE_URL',
    UPDATE_BASE_URL_VER: 'UPDATE_BASE_URL_VER',
    UPDATE_OFFLINE_VALVE: 'UPDATE_OFFLINE_VALVE',
    SCANNER_SHOW_TRANS_LOADING: 'SCANNER_SHOW_TRANS_LOADING',
    SCANNER_HIDE_TRANS_LOADING: 'SCANNER_HIDE_TRANS_LOADING',
    UPDATE_SCANNED_EQUIPMENT_RESPONSE: 'UPDATE_SCANNED_EQUIPMENT_RESPONSE',
    OFFLINE_DATA_SYNC_START: 'OFFLINE_DATA_SYNC_START',
    OFFLINE_DATA_SYNC_STOP: 'OFFLINE_DATA_SYNC_STOP',
    SYNC_RESPONSE_VIEW_SHOW: 'SYNC_RESPONSE_VIEW_SHOW',
    SYNC_RESPONSE_VIEW_HIDE: 'SYNC_RESPONSE_VIEW_HIDE',
    IS_IPAD_DEVICE:'IS_IPAD_DEVICE',
    UPDATE_FACE_ID_STATUS : 'UPDATE_FACE_ID_STATUS',


    //Splash Screen Actions
    SPLASH_SHOW_LOADING: 'SPLASH_SHOW_LOADING',
    SPLASH_HIDE_LOADING: 'SPLASH_HIDE_LOADING',
    SPLASH_ERROR_UPDATE: 'SPLASH_ERROR_UPDATE',

    //Login Screen Actions
    LOGIN_SHOW_PAGE_LOADING: 'LOGIN_SHOW_PAGE_LOADING',
    LOGIN_HIDE_PAGE_LOADING: 'LOGIN_HIDE_PAGE_LOADING',
    LOGIN_SHOW_LOADING: 'LOGIN_SHOW_LOADING',
    LOGIN_HIDE_LOADING: 'LOGIN_HIDE_LOADING',
    LOGIN_SHOW_TRAN_LOADING: 'LOGIN_SHOW_TRAN_LOADING',
    LOGIN_HIDE_TRAN_LOADING: 'LOGIN_HIDE_TRAN_LOADING',
    LOGGEDIN_USER_DETAILS_UPDATE: 'LOGGEDIN_USER_DETAILS_UPDATE',
    LOGGEDIN_USER_DETAILS_RESET: 'LOGGEDIN_USER_DETAILS_RESET',


    NEW_UPDATE_AVAILABLE: 'NEW_UPDATE_AVAILABLE',
    RESTART_AVAILABLE: 'RESTART_AVAILABLE',
    DOWNLOAD_PROGRESS: 'DOWNLOAD_PROGRESS',
    UPDATE_MESSAGE: 'UPDATE_MESSAGE',

    SERVER_HOST_NAME: 'SERVER_HOST_NAME',
    SERVER_API_VERSION: 'SERVER_API_VERSION',
    SERVER_URL_RESET: 'SERVER_URL_RESET',
  },
  SCREEN_TITLE: {
    SCHEDULE: 'Schedule',
  },
  COLOR: {
    THEME_COLOR: '#e11f26',
    THEME_COLOR_2: '#F6461A',
    FONT_COLOR: '#3F3F3F',
    BORDER_COLOR :'#666666',
    FONT_HINT: '#A19B9B',
    SCREEN_BG: '#F2F2F2',
    WHITE: '#FFFFFF',
    BUTTON_COLOR: '#2273d9',
    LIGHT_TEXT_COLOR:'#b5b5b5',
    BACKGROUND_COLOR: '#E5E5E5',
    BUTTON_GREEN: '#134C35',
    RED_COLOR:'#C01926',
    GREEN: '#008000',
    WHITE: '#FFFFFF',
    BLACK: '#000000'
  },
  FONT_SIZE: {
    BIG: 30,
    XXXXL: 28,
    XXXL: 26,
    XXL: 23,
    XL: 20,
    L: 18,
    M: 16,
    SM: 14,
    S: 12,
    XS: 10,
  },
  ALERT: {
    TITLE: {
      TITLE: 'Fire Department',
      INFO: 'Fire Department',
      ERROR: 'Error',
      FAILED: 'Failed',
      SUCCESS: 'Success',
      AUTH_FAILED: 'Authentication Failure',
      WENT_WRONG: 'Sorry, something went wrong',
      EXPIRED: 'Logout',
      CONFIRMATION:'Confirmation',
      CONFIRMATION_MESSGAE:'Are you sure want to delete this item?',
    },
    BTN: {
      OK: 'Ok',
      CANCEL: 'Cancel',
      DELETE: 'Delete',
      YES: 'Yes',
      NO: 'No',
      LOGOUT: 'Logout',
    },
  },
  VALIDATION_MSG: {
    NO_INTERNET: 'Please check your internet connectivity.',
    WENT_WRONG: "We're working on it and we'll get it fixed as soon as we can.",
    NO_USERNAME: 'Valid User Name is required.',
    NO_EMP_ID: 'Empolyee ID is required.',
    NO_PASSWORD: 'Password is required.',
    EXPIRED: 'Session Expired.',

    AUTH_FAILED: 'The username and password you entered does not match.',
    REQ_FAILED: 'Request failed.',
    NO_DATA_FOUND: 'No data found',
    LOGOUT_MSG: 'Do you want to logout?',
    VEHICLE_ID_EMPTY: 'Vehicle ID is empty',
    NOPRODUCT_INTO_CART: 'No product in cart.',
    CHECK_LIST_VALIDATION:'Answer Required For Each Field',
    ALREADY_EXISTS : 'Scanned data already exists',
    HOST_NAME: 'Host Name is required',

  },

};

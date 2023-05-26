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
      DEVELOPMENT: 'mRtadAL5BeEDW90-PXgHOcn4x8EwqEubofyOK',
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

    SCANNER_SHOW_TRANS_LOADING: 'SCANNER_SHOW_TRANS_LOADING',
    SCANNER_HIDE_TRANS_LOADING: 'SCANNER_HIDE_TRANS_LOADING',

    INSTALLATION_EQUIPMENT_DETAILS: 'INSTALLATION_EQUIPMENT_DETAILS',
    INSTALLATION_SHOW_TRANS_LOADING: 'INSTALLATION_SHOW_TRANS_LOADING',
    INSTALLATION_HIDE_TRANS_LOADING: 'INSTALLATION_HIDE_TRANS_LOADING',
    INSTALLATION_RESET_TO_INITIAL: 'INSTALLATION_RESET_TO_INITIAL',

    MAINTENANCE_EQUIPMENT_DETAILS: 'MAINTENANCE_EQUIPMENT_DETAILS',
    MAINTENANCE_SHOW_TRANS_LOADING: 'MAINTENANCE_SHOW_TRANS_LOADING',
    MAINTENANCE_HIDE_TRANS_LOADING: 'MAINTENANCE_HIDE_TRANS_LOADING',
    MAINTENANCE_RESET_TO_INITIAL: 'MAINTENANCE_RESET_TO_INITIAL',

    ADMIN_EQIP_LIST_SHOW_LOAD_MORE: 'ADMIN_EQIP_LIST_SHOW_LOAD_MORE',
    ADMIN_EQIP_LIST_SHOW_LOADING: 'ADMIN_EQIP_LIST_SHOW_LOADING',
    ADMIN_EQIP_LIST_HIDE_LOADING: 'ADMIN_EQIP_LIST_HIDE_LOADING',
    ADMIN_EQIP_LIST_UPDATE: 'ADMIN_EQIP_LIST_UPDATE',
    ADMIN_EQIP_DETAILS_SHOW_LOADING: 'ADMIN_EQIP_DETAILS_SHOW_LOADING',
    ADMIN_EQIP_DETAILS_HIDE_LOADING: 'ADMIN_EQIP_DETAILS_HIDE_LOADING',
    ADMIN_EQIP_SERVICE_INFO_UPDATE: 'ADMIN_EQIP_SERVICE_INFO_UPDATE',
    ADMIN_EQIP_INSTALL_INFO_UPDATE: 'ADMIN_EQIP_INSTALL_INFO_UPDATE',
    ADMIN_RESET_SERVICE_INFO_TO_INITIAL: 'ADMIN_RESET_SERVICE_INFO_TO_INITIAL',
    ADMIN_RESET_INSTALL_INFO_TO_INITIAL: 'ADMIN_RESET_INSTALL_INFO_TO_INITIAL',
    ADMIN_EQIP_LIST_RESET_TO_INITIAL: 'ADMIN_EQIP_LIST_RESET_TO_INITIAL',

    ADMIN_USERS_LIST_SHOW_LOAD_MORE: 'ADMIN_USERS_LIST_SHOW_LOAD_MORE',
    ADMIN_USERS_LIST_SHOW_LOADING: 'ADMIN_USERS_LIST_SHOW_LOADING',
    ADMIN_USERS_LIST_HIDE_LOADING: 'ADMIN_USERS_LIST_HIDE_LOADING',
    ADMIN_USERS_LIST_UPDATE: 'ADMIN_USERS_LIST_UPDATE',
    ADMIN_USERS_TRANS_SHOW_LOADING: 'ADMIN_USERS_TRANS_SHOW_LOADING',
    ADMIN_USERS_TRANS_HIDE_LOADING: 'ADMIN_USERS_TRANS_HIDE_LOADING',
    ADMIN_USERS_ADD_SHOW_TRANS_LOADING: 'ADMIN_USERS_ADD_SHOW_TRANS_LOADING',
    ADMIN_USERS_ADD_HIDE_TRANS_LOADING: 'ADMIN_USERS_ADD_HIDE_TRANS_LOADING',
    ADMIN_USERS_LIST_RESET_TO_INITIAL: 'ADMIN_USERS_LIST_RESET_TO_INITIAL',

    EQUIPMENT_COMMENT_UPDATE : 'EQUIPMENT_COMMENT_UPDATE',
    MEDICAL_KIT_COMMENT_UPDATE : 'MEDICAL_KIT_COMMENT_UPDATE',

    SHOW_TRANSPARENT_LOADING : 'SHOW_TRANSPARENT_LOADING',
    HIDE_TRANSPARENT_LOADING : 'HIDE_TRANSPARENT_LOADING',
    SELECTED_EQUIPMENT_DATA: 'SELECTED_EQUIPMENT_DATA',

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
  HTTP_CODE: {
    SUCCESS: 200,
    INSERT_SUCESS: 201,
    AUTHENTICATION_FAILURE: 401,
    REQUIRED_MISSING: 403,
    REQUEST_TIMED_OUT_FAILURE: 500,
    INPUT_VALIDATION_ERROR: 400,
    NO_DATA_FOUND: 404,
    NO_INTERNET: 503,
    UNPROCESSABLE_ENTITY: 422,
  },
};

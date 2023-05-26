/*************************************************
 * InnovaZones
 * URL.js
 *  * Created by KARTHI NALLIYAPPAN on JULY 11. 2022
 * Copyright © 2020 InnovaZones. All rights reserved.
 *************************************************/

'use strict';
//Returns all the urls of the web service
const baseUrlMain = 'https://qaizfire.com/api/'; //Prod URL
// const baseUrlMain = 'https://sanitizit.qaizhips.com/api/';
const baseUrlVersion = 'v2/';
const baseUrl = baseUrlMain + baseUrlVersion;

const HOST_NAME =  'qaizfire.com';
const PROTOCAL = 'https://';
const PATH = '/api';

module.exports = {
  // Don't command or duplicate this below 3 key with in this file. Key validation enabled in shell script
  isProduction: true,  // To point the production App to App center (production) development key with bundle.
  isDevelopment: false, // To show log if only isDevelopment is true and set development server App center key
      
  //Code push deployment target
  IS_DEVELOPMENT_CODEPUSH_TARGET: true,  // Development - Live user code push deployment target

  APP_VERSION : '1.0.4', // Production App version
  isDisplayBuildNo: true, // 4 digit in the build will enable / disable
  isAppCenterBuild: true,  // If true - App Store version check will be disabled
  APP_DISPLAY_VERSION: '1.0.4',
  APP_BUILD_NO : '5',

  baseUrlMain,
  baseUrlVersion,
  BASE_URL_CONST: baseUrl,
  BASE_URL: baseUrl,

  HOST_NAME,
  PROTOCAL,
  PATH,

};

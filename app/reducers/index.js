/*************************************************
 * InnovaZones
 * @exports
 * index.js
 *  * Created by KARTHI NALLIYAPPAN on JULY 11. 2022
 * Copyright © 2022 InnovaZones. All rights reserved.
 *************************************************/

'use strict';

import {combineReducers} from 'redux';

import storage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';

import {deviceState, serverHostURLState} from './DeviceReducer';
import {splashState} from './SplashReducer';
import {signInState, loggedInUserDetailsState} from './SignInReducer';
import { codePushUpdateState } from './CodePushUpdateReducer';

const devicePersistConfig = {
  key: 'device',
  storage: storage,
  whitelist: ['useTouchID', 'useFaceID','baseURL', 'baseURLVer'],
};

const loggedInUserPersistConfig = {
  key: 'loggedInUser',
  storage: storage,
};

const addCameraProductStatePersistConfig = {
  key: 'addCameraProductState',
  storage: storage,
};

const serverHostURLPersistConfig = {
  key: 'serverHostURL',
  storage: storage,
  whitelist: ['hostName', 'apiVersion'],
};

//Combines all the reducer for the store and exports to it
const rootReducer = combineReducers({
  deviceState: persistReducer(devicePersistConfig, deviceState),
  serverHostURLState: persistReducer(serverHostURLPersistConfig, serverHostURLState),
  splashState,
  signInState,
  loggedInUserDetailsState: persistReducer(
    loggedInUserPersistConfig,
    loggedInUserDetailsState,
  ),
  codePushUpdateState,
});

export default rootReducer;

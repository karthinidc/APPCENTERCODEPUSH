/*************************************************
 * InnovaZone
 * @exports
 * CodePushUpdateReducer.js
 * Created by KARTHI on FEBUAURY 16, 2021
 * Copyright © 2020 InnovaZone. All rights reserved.
 *************************************************/

 import { Actions } from 'react-native-router-flux';
import Constants from '../util/Constants';

let initialState = {
  codePushUpdateAvailable: false, // New code push update available boolean
  codePushBundleRestartAvailable: false, // After code push install - Restart available.
  message: '',
  updateMessage : '',
};
 
const {
  ACTIONS: {
  NEW_UPDATE_AVAILABLE,
  RESTART_AVAILABLE,
  DOWNLOAD_PROGRESS,
  UPDATE_MESSAGE,
  },
} = Constants;
 
export const codePushUpdateState = (state = initialState, action) => {
  const {
    type,
  } = action;
  switch (type) {
    case NEW_UPDATE_AVAILABLE:
      return { 
        ...state, 
        codePushUpdateAvailable : true, 
        codePushBundleRestartAvailable: false,
        message: 'Update Available - Click here',
      };
    case RESTART_AVAILABLE:
      return {
        ...state, 
        codePushUpdateAvailable : false, 
        codePushBundleRestartAvailable: true,
        message: 'Restart Available - Click here',   
      };
    case DOWNLOAD_PROGRESS:
      return {...state, message: action.payload};

      case UPDATE_MESSAGE:
        return {...state, updateMessage: action.payload};
    default:
      return state;
  }
};
 
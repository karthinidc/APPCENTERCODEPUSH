

/*************************************************
 * InnovaZone
 * CodePushUpdateActions.js
 * Created by Karthi Nalliyappan on 16/02/2021
 * Copyright © 2021 InnovaZone. All rights reserved.
 *************************************************/


import { Platform } from 'react-native';
import Constants ,{ ALERT, CODE_PUSH}  from '../util/Constants';

import { IS_PRODUCTION_CODEPUSH_TARGET,  IS_DEVELOPMENT_CODEPUSH_TARGET } from '../util/URL';
import codePush from 'react-native-code-push';
import { myLog } from '../util/Utility';
import {
  checkNetworkConnection,
} from '../actions/NetworkAction';
import TouchID from 'react-native-touch-id';


let appCenterUpdateCheckTimer = undefined;
let appCenterDownloadCompleted = false;

let deploymentKey = '';

if (Platform.OS === 'ios') {
 if (IS_DEVELOPMENT_CODEPUSH_TARGET){
    deploymentKey = CODE_PUSH.IOS.DEVELOPMENT;
  }
  console.log('======', deploymentKey);

} else {
if (IS_DEVELOPMENT_CODEPUSH_TARGET){
    deploymentKey = CODE_PUSH.ANDROID.DEVELOPMENT;
  }
}




/**
* Reset the App access token.
*/
export const checkForCodePushNewUpdate = () => {
  return (dispatch, getState) => {
    
    console.log();
    // set timer to refresh token
    if(appCenterUpdateCheckTimer !== undefined) {
      return;
    }
    appCenterUpdateCheckTimer = setInterval(()=>{
      codePush.checkForUpdate(
        deploymentKey
      ).then((update) => {
        console.log('$$$$$$$$$$$  onCodePushUpdateAvailable update $$$$$$$$$$$$$$$$$:', update);
        if (!update) {
          codePush.getUpdateMetadata(codePush.UpdateState.PENDING).then((data) => {
            if (data) {
              console.log('$$$$$$$$$$$  onCodePushBundleRestart  $$$$$$$$$$$$$$$$$');
              // Events.trigger('onCodePushBundleRestart', {});
              dispatch(restartAvailable());
            }
          });
        }else{
          console.log('$$$$$$$$$$$  onCodePushUpdateAvailable  $$$$$$$$$$$$$$$$$');
          // Events.trigger('onCodePushUpdateAvailable', {});
          dispatch(newUpdateAvailable());
        }
      }).catch((e) => {
        console.log('*********** Error **********:', e.message);
      });
    },  1000*60*60*((IS_PRODUCTION_CODEPUSH_TARGET) ? CODE_PUSH.PRODUCTION_UPDATE_CHECK_TIMEOUT : (IS_DEVELOPMENT_CODEPUSH_TARGET) ? CODE_PUSH.DEVELOPMENT_UPDATE_CHECK_TIMEOUT : CODE_PUSH.DEVELOPMENT_UPDATE_CHECK_TIMEOUT));  
  };
};


/**
* Update the transaction sync date.
*/
export const checkForNewUpdate = () => {
  return (dispatch, getState) => {
    codePush.checkForUpdate(
      deploymentKey
    ).then((update) => {
      console.log('$$$$$$$$$$$  checkForNewUpdate update 1111 $$$$$$$$$$$$$$$$$:', update);
      if (!update) {
        codePush.getUpdateMetadata(codePush.UpdateState.PENDING).then((data) => {
          console.log('$$$$$$$$$$$  data $$$$$$$$$$$$$$$$$', data);
          if (data) {
            // Events.trigger('onCodePushBundleRestart', {});
            dispatch(restartAvailable());
          }
        });
      }else{
        // Events.trigger('onCodePushUpdateAvailable', {});
        dispatch(newUpdateAvailable());
      }
    }).catch((e) => {
      console.log('*********** Error **********:', e.message);
    });
  };
};


export const checkCodePush = () => {
  return (dispatch, getState) => {
    codePush.sync({
      deploymentKey,
      // checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,

      /**
      * Active update, which lets the end user know
      * about each update, and displays it to them
      * immediately after downloading it
      */
      installMode: codePush.InstallMode.IMMEDIATE,
      updateDialog: true,
      // updateDialog: {
      //   appendReleaseDescription: true,
      //   descriptionPrefix: "\n\nChange log:\n"
      //  },

      /**
      * Download the update silently, and install optional updates
      * on the next restart, but install mandatory updates on the next resume.
      */ 
      // installMode: codePush.InstallMode.ON_NEXT_RESUME,

      // installMode: codePush.InstallMode.ON_NEXT_SUSPEND,

      // installMode: codePush.InstallMode.ON_NEXT_RESTART,
    },
    (status) => {
      console.log('*********** Code push status 11 **********:', status);
      switch (status) {
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
          console.log('$$$$$$$$$$$  Checking for updates...  $$$$$$$$$$$$$$$$$');
          dispatch({
            type:  Constants.ACTIONS.UPDATE_MESSAGE,
            payload: 'Checking for updates...',
          });
          break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          console.log('$$$$$$$$$$$  Downloading packages...  $$$$$$$$$$$$$$$$$');
          dispatch({
            type:  Constants.ACTIONS.UPDATE_MESSAGE,
            payload: 'Downloading packages...',
          });
          break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          console.log('$$$$$$$$$$$  Installing updates...  $$$$$$$$$$$$$$$$$');
          dispatch({
            type:  Constants.ACTIONS.UPDATE_MESSAGE,
            payload: 'Installing updates...',
          });
          break;
        case codePush.SyncStatus.UP_TO_DATE:
          console.log('$$$$$$$$$$$  UP_TO_DATE...  $$$$$$$$$$$$$$$$$');
          dispatch({
            type:  Constants.ACTIONS.UPDATE_MESSAGE,
            payload: '',
          });
          break;
        case codePush.SyncStatus.UPDATE_INSTALLED:
          console.log('$$$$$$$$$$$  Update Installed  $$$$$$$$$$$$$$$$$');
          dispatch({
            type:  Constants.ACTIONS.UPDATE_MESSAGE,
            payload: '',
          });
          break;
        case codePush.SyncStatus.UNKNOWN_ERROR:
          console.log('$$$$$$$$$$$  UNKNOWN_ERROR  $$$$$$$$$$$$$$$$$');
          dispatch({
            type:  Constants.ACTIONS.UPDATE_MESSAGE,
            payload: '',
          });
          break;
      }
    },
    ({ receivedBytes, totalBytes }) => {
      /* Update download modal progress */
      dispatch({
        type:  Constants.ACTIONS.UPDATE_MESSAGE,
        payload: `${Math.round(((receivedBytes / totalBytes) * 100))}% downloaded...`,
      });
    }).then((val) => {
      // this._getUsernameFromKeychain();
      dispatch(checkTouchIdAndNetwork());
    }).catch((e) => {
      dispatch(checkTouchIdAndNetwork());
    });

  };
};

export const checkTouchIdAndNetwork = () => {
  return (dispatch, getState) => {
  TouchID.isSupported()
    .then(biometryType => {
      console.log(' biometryType ===', biometryType);
      if (biometryType === 'FaceID') {
        console.log('FaceID is supported.');
        dispatch(checkNetworkConnection(false, true));
    } else if (biometryType === 'TouchID'){
        console.log('TouchID is supported.');
        dispatch(checkNetworkConnection(true, false));
    }else
      dispatch(checkNetworkConnection(false, false));
    })
    .catch(error => {
      dispatch(checkNetworkConnection(false, false));
    });
  };
  };
/**
* Update the transaction sync date.
*/
export const installCodePush = () => {
  return (dispatch, getState) => {
    console.log('$$$$$$$$$$$  @@@ installCodePush @@@  $$$$$$$$$$$$$$$$$');

    codePush.sync({
      deploymentKey,
      checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
      /**
      * Active update, which lets the end user know
      * about each update, and displays it to them
      * immediately after downloading it
      */
      installMode: codePush.InstallMode.ON_NEXT_RESTART,
      updateDialog: false,
    },
    (status) => {
      console.log('*********** Code push status 22 **********:', status);
      switch (status) {
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
          console.log('$$$$$$$$$$$  Checking for updates...  $$$$$$$$$$$$$$$$$');
          break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          console.log('$$$$$$$$$$$  Downloading packages...  $$$$$$$$$$$$$$$$$');
          break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          console.log('$$$$$$$$$$$  Installing updates...  $$$$$$$$$$$$$$$$$');
          break;
        case codePush.SyncStatus.UP_TO_DATE:
          console.log('$$$$$$$$$$$  UP_TO_DATE...  $$$$$$$$$$$$$$$$$');
          break;
        case codePush.SyncStatus.UPDATE_INSTALLED:
          console.log('$$$$$$$$$$$  Update Installed  $$$$$$$$$$$$$$$$$');
          // Events.trigger('onCodePushBundleRestart', {});
          dispatch(restartAvailable());
          break;
        case codePush.SyncStatus.UNKNOWN_ERROR:
          console.log('$$$$$$$$$$$  UNKNOWN_ERROR  $$$$$$$$$$$$$$$$$');
          break;
      }
    },
    ({ receivedBytes, totalBytes }) => {
      /* Update download modal progress */
      // Events.trigger('onCodePushBundleDownloadProgress', Math.round(((receivedBytes / totalBytes) * 100)));
      dispatch(downloadProgressUpdate( Math.round(((receivedBytes / totalBytes) * 100))));
      console.log('$$$$$$$$$$$  Downloading Progress... 1122  $$$$$$$$$$$$$$$$$', `${Math.round(((receivedBytes / totalBytes) * 100))}% downloaded...`);
    }).then((val) => {
      console.log('$$$$$$$$$$$  Start the App val $$$$$$$$$$$$$$$$$', val);
    }).catch((e) => {
      console.log('$$$$$$$$$$$  Start the App error $$$$$$$$$$$$$$$$$', e.message);
    });
  };
};


/**
 * Event will trigger if the code push update available
 */
export const newUpdateAvailable = () => {
  return (dispatch, getState) => {
    dispatch({
      type:  Constants.ACTIONS.NEW_UPDATE_AVAILABLE,
    });

  };
};

/**
 * Event will trigger if the code push bundel restart available
 */
export const restartAvailable = () => {
  return (dispatch, getState) => {
    dispatch({
      type:  Constants.ACTIONS.RESTART_AVAILABLE,
    });

  };
};



/**
 * Event will trigger if the code push bundle download progress value update to UI 
 */
export const downloadProgressUpdate = (progressValue) => {
  let message = `${Math.floor(progressValue)}% downloaded...`;
  return (dispatch, getState) => {
    dispatch({
      type:  Constants.ACTIONS.DOWNLOAD_PROGRESS,
      payload: message,
    });

  };
};
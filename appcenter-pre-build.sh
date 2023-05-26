#!/usr/bin/env bash

echo "************ Files replace started ************"

## Replace the react-native-router-flux --> Router.js file
cp -v $APPCENTER_SOURCE_DIRECTORY/app/replaceFilesToCorrespondingLibrary/Router.js $APPCENTER_SOURCE_DIRECTORY/node_modules/react-native-router-flux/src/Router.js

## Replace the react-native-camera --> RNCamera.js file
cp -v $APPCENTER_SOURCE_DIRECTORY/app/replaceFilesToCorrespondingLibrary/RNCamera.js $APPCENTER_SOURCE_DIRECTORY/node_modules/react-native-camera/src/RNCamera.js

echo "************ Files replaced successfully ************"

# fi

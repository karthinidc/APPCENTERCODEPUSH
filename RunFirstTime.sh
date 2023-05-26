#!/bin/sh

##install node modules
echo "********** INSTALLING NODE MODULE AND STARTING PACKAGE MANAGER ***********";

npm install

echo "********** NODE MODULE INSTALL COMPLETED ***********";

## Replace the react-native-router-flux --> Router.js file
cp -v $PWD/app/replaceFilesToCorrespondingLibrary/Router.js $PWD/node_modules/react-native-router-flux/src/Router.js

## Replace the react-native-camera --> RNCamera.js file
cp -v $PWD/app/replaceFilesToCorrespondingLibrary/RNCamera.js $PWD/node_modules/react-native-camera/src/RNCamera.js

echo "********** FILE REPLACEMENT COMPLETED ***********";

echo "********** CHECK AND KILL ALREADY RUNNING NODE ***********";

killall node

npm start --reset-cache
echo "********** METRO BUNDLER STARTING ***********";



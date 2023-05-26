/*************************************************
 * InnovaZones
 * @exports
 * @class index.js
 * @extends Component
 *  * Created by KARTHI NALLIYAPPAN on JULY 11. 2022
 * Copyright © 2022 InnovaZones. All rights reserved.
 *************************************************/

'use strict';

import React, {Component} from 'react';

import {SafeAreaView, StatusBar} from 'react-native';

import {Router, Scene, ActionConst} from 'react-native-router-flux';

import SplashScreen from './components/SplashScreen';
import SignInScreen from './components/SignInScreen';
import CodePushUpdateView from './components/CodePushUpdateView';


/**
 * Registeres all the components used in the application for navigation
 */
class Main extends Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#E5E5E5'}}>
        <StatusBar backgroundColor={'#E5E5E5'} barStyle={'dark-content'} />
        <Router>
          <Scene key="root" hideNavBar>
            <Scene key={'splashScreen'} component={SplashScreen} initial />
           
           <Scene
              key={'signInScreen'}
              component={SignInScreen}
              type={ActionConst.RESET}
            />            
          </Scene>
        </Router>
        <CodePushUpdateView/>
      </SafeAreaView>
    );
  }
}

export default Main;

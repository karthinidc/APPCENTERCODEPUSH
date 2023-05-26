/*************************************************
 * InnovaZones
 * @exports
 * @class App.js
 * @extends Component
 *  * Created by KARTHI NALLIYAPPAN on JULY 11. 2022
 * Copyright © 2020 InnovaZones. All rights reserved.
 *************************************************/

'use strict';

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persist, store} from './app/store';
import LoadingScreen from './app/components/LoadingScreen';
import RouteNavigator from './app/index';
import SplashScreen from './app/components/SplashScreen';
import SignInScreen from './app/components/SignInScreen';

/**
 * Gets the store and registered scenes and sets that to provider
 */
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<SplashScreen />} persistor={persist}>
          <RouteNavigator />
        </PersistGate> 
      </Provider>
    );
  }
}

export default App;

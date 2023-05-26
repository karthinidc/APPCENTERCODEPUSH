/*************************************************
 * InnovaZones
 * @exports
 * @class SplashReducer.js
 *  * Created by KARTHI NALLIYAPPAN on JULY 11. 2022
 * Copyright © 2022 InnovaZones. All rights reserved.
 *************************************************/

'use strict';

import Constants from '../util/Constants';

let initialState = {
  isLoading: true, //Shows spinner when the version api is being called.
  errorMessage: '', //Error message of the intenret check and version api failure error
};
const {
  ACTIONS: {SPLASH_SHOW_LOADING, SPLASH_HIDE_LOADING, SPLASH_ERROR_UPDATE},
} = Constants;

export const splashState = (state = initialState, action) => {
  const {type} = action;
  switch (type) {
    case SPLASH_SHOW_LOADING:
      return {...state, isLoading: true};
    case SPLASH_HIDE_LOADING:
      return {...state, isLoading: false};
    case SPLASH_ERROR_UPDATE:
      return {...state, isLoading: false, errorMessage: error.message};
    default:
      return state;
  }
};


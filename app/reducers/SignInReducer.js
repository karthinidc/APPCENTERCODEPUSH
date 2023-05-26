/*************************************************
 * InnovaZones
 * SignInReducer.js
 *  * Created by KARTHI NALLIYAPPAN on JULY 12. 2022
 * Copyright © 2022 InnovaZones. All rights reserved.
 *************************************************/

import Constants from '../util/Constants';

const {ACTIONS} = Constants;

let initialState = {
  isPageLoading: false, // Used to show loading when the auto login invoked.
  isTransLoading: false, // Used to show loading when the auto login invoked.
  isLoginLoading: false, // Used to show loading when the login api invoked.
};

export const signInState = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_SHOW_PAGE_LOADING:
      return {...state, isPageLoading: true};
    case ACTIONS.LOGIN_HIDE_PAGE_LOADING:
      return {...state, isPageLoading: false};
    case ACTIONS.LOGIN_SHOW_TRAN_LOADING:
      return {...state, isTransLoading: true};
    case ACTIONS.LOGIN_HIDE_TRAN_LOADING:
      return {...state, isTransLoading: false};
    case ACTIONS.LOGIN_SHOW_LOADING:
      return {...state, isLoginLoading: true};
    case ACTIONS.LOGIN_HIDE_LOADING:
      return {...state, isLoginLoading: false};
    default:
      return state;
  }
};

let loggedInUserInitialState = {
  loggedInUserDetails: undefined, // Login user details from login api response.
  scope: undefined,
  companyDetails: undefined,
};

export const loggedInUserDetailsState = (
  state = loggedInUserInitialState,
  action,
) => {
  switch (action.type) {
    case ACTIONS.LOGGEDIN_USER_DETAILS_UPDATE:
      return {
        ...state,
        loggedInUserDetails: action.loggedInUserDetails,
        scope: action.scope,
        companyDetails: action.companyDetails,
      };

    case ACTIONS.LOGGEDIN_USER_DETAILS_RESET:
      return {...loggedInUserInitialState};

    default:
      return state;
  }
};

/*************************************************
 * InnovaZones
 * @exports
 * store.js
 *  * Created by KARTHI NALLIYAPPAN on JULY 11. 2022
 * Copyright © 2022 InnovaZones. All rights reserved.
 *************************************************/

'use strict';

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';
import {createLogger} from 'redux-logger';

import rootReducer from './reducers/index';

const logger = createLogger();
let middleware;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  middleware = applyMiddleware(thunk, logger);
} else {
  middleware = applyMiddleware(thunk);
}
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, undefined, middleware);

export const persist = persistStore(store);

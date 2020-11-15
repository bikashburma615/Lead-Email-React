import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './auth';
import content from './content';

/**
 * Persist Auth Reducer.
 */
const authPersistConfig = {
  key: 'auth',
  storage: storage,
};

export default combineReducers({
	content,
	auth: persistReducer(authPersistConfig, auth)
});
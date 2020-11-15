import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import promise from 'redux-promise-middleware';
import { compose, createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers';

const enhancers = [applyMiddleware(thunk, promise)];

if(process.env.REACT_APP_ENV !== 'production' && window['__REDUX_DEVTOOLS_EXTENSION__']) {
	enhancers.push(window['__REDUX_DEVTOOLS_EXTENSION__']());
}

const store = createStore(rootReducer, compose(...enhancers));
const persistor = persistStore(store);

export { store, persistor };
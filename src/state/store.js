import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import customersReducer from './reducers/customers';
var store = null;

export function getStore() {
	return store;
}

export function getState() {
	return store.getState();
}

export function dispatch(action) {
	return store.dispatch(action);
}

export function initializeStore() {
	const reducers = combineReducers({
		customers: customersReducer
	});

	var middlewares = [ thunkMiddleware ];
	var devToolHook = f => f;
	if (process.env.NODE_ENV === 'development') {
		// enable this for console logging
		const createLogger = require('redux-logger');
		const logger = createLogger({ duration: true });
		middlewares.push(logger);
		if (window.devToolsExtension) {
			devToolHook = window.devToolsExtension({});
		}
	}

	store = createStore(reducers, compose(applyMiddleware(...middlewares), devToolHook));

	return store;
}

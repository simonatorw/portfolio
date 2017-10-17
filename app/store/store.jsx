import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import dataReducer from './reducers/dataReducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
	dataReducer
});

export default createStore(
	reducer,
	applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
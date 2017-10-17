import { all } from 'redux-saga/effects';

import watchFetchData from './fetchData';
import subscribeDataSource from './subscribeDataSource';
import watchSaveTheme from './saveTheme';

export default function* rootSaga() {
	yield all([
		watchFetchData()
	]);
}
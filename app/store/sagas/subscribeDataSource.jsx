import { call, put, take, fork } from 'redux-saga/effects';

import actionTypes from '../actions/actionTypes';
import { setSSE } from '../../utils/async';
import { dataUrls } from '../../constants';

function* watchMessages(msgSource) {
	let data = yield call(msgSource.nextMessage);

	while(data) {
		yield put({ type: actionTypes.DAILY_PERFORMANCE_DATA.MSG, data });
		data = yield call(msgSource.nextMessage);
	} 
}

export default function* subscribeDataSource() {
	yield take(actionTypes.DAILY_PERFORMANCE_DATA.SUBSCRIBE);
	const msgSource = yield call(setSSE, dataUrls.DAILY_PERFORMANCE_DATA_RT);
	yield fork(watchMessages, msgSource);
}
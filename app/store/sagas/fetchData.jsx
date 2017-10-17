import { all, call, put, takeEvery } from 'redux-saga/effects';

import actionTypes from '../actions/actionTypes';
import { fetchGet } from '../../utils/async';
import { dataUrls } from '../../constants';

export function* fetchData(actionType) {
	try {
		const data = yield call(fetchGet, dataUrls[actionType]);
		//console.log(actionTypes[actionType]['SUCCEEDED'], data);
		yield put({ type: actionTypes[actionType]['SUCCEEDED'], data });
	} catch (err) {
		console.log(err);
		yield put({ type: actionTypes[actionType]['FAILED'], err });
	}
}

export default function* watchFetchData() {	
	yield all([
		takeEvery(actionTypes.PORTFOLIO_DATA.GET, fetchData, actionTypes.PORTFOLIO_DATA.GET.split('GET_')[1])
	]);
}
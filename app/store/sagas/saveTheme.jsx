import { call, put, takeEvery } from 'redux-saga/effects';

import actionTypes from '../actions/actionTypes';
import { themeSaved } from '../actions/actionCreators';
import { saveThemeToStorage } from '../../utils/utils';

function* saveTheme(action) {
	yield call(saveThemeToStorage, action.theme);
	yield put(themeSaved(action.theme));
}

export default function* watchSaveTheme() {
	yield takeEvery(actionTypes.CHANGE_THEME, saveTheme);
}
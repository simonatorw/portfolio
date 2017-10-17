import actionTypes from './actionTypes';

export function changeTheme(theme) {
	return {
		type: actionTypes.CHANGE_THEME,
		theme
	};
}

export function themeSaved(theme) {
	return {
		type: actionTypes.THEME_SAVED,
		theme
	};
}
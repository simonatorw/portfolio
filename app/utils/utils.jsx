import React from 'react';

import actionTypes from '../store/actions/actionTypes';
import { chartTypes, theming, locale } from '../constants';
import themes from '../components/ThemePicker/themes';
import BarChart from '../components/charts/BarChart/BarChart';
import LineChart from '../components/charts/LineChart/LineChart';

export const getDataActions = () => (Object.keys(actionTypes)).filter(item => item.includes('_DATA'));

export function getChart(chartType, data) {
	switch(chartType) {
		case chartTypes.LINE:
			return (
				<LineChart data={data} />
			);
		case chartTypes.BAR:
			return (
				<BarChart data={data} />
			);
		default:
			return '<chart>';
	}
}

export function saveThemeToStorage(theme) {
	localStorage[theming.STORAGE_KEY] = theme;
}

export const retreiveTheme = theme => localStorage[theming.STORAGE_KEY] ? localStorage[theming.STORAGE_KEY] : Object.keys(themes)[0];

export const formatCurrency = (num, localeStr = locale.US) => num.toLocaleString(localeStr, { minimumFractionDigits: 2 });
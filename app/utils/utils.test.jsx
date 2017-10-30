import React from 'react';
import { shallow } from 'enzyme';

import LineChart from '../components/charts/LineChart/LineChart';
import BarChart from '../components/charts/BarChart/BarChart';
import { getChart, saveThemeToStorage, retreiveTheme, formatCurrency } from './utils';

describe('Test getChart function', () => {
	const data = {};;
	
    test('It will return placeholder if it is not a line or bar chart', () => {
        const chartType = 'foo';
		const result = getChart(chartType, data);
		const expected = '<chart>';
		
        expect(result).toEqual(expected);
    });	
	
    test('It will return a line chart if chartType is line', () => {
        const chartType = 'line';
		const result = shallow(getChart(chartType, data));
		const expected = shallow(
			<LineChart data={data} />
		);
		
        expect(result.name()).toEqual(expected.name());
    });
	
    test('It will return a bar chart if chartType is bar', () => {
        const chartType = 'bar';
		const result = shallow(getChart(chartType, data));
		const expected = shallow(
			<BarChart data={data} />
		);
		
        expect(result.name()).toEqual(expected.name());
    });	
});

describe('Test theme save/retrieve', () => {
	let theme;
	
	beforeAll(() => {
			theme = 'Bloomie';
			
			saveThemeToStorage(theme);
	});

	describe('Test saveThemeToStorage function', () => {
		test('It will save the theme to local storage', () => {
			const result = localStorage.getItem('dashboard_theme');
			const expected = theme;
			
			expect(result).toEqual(expected);
		});
	});

	describe('Test retreiveTheme function', () => {
		test('It will retreive the theme from local storage', () => {
			const result = retreiveTheme();
			const expected = theme;
			
			expect(result).toEqual(expected);
		});
		
		test('It will use Simple theme if there is nothing in local storage', () => {
			localStorage.clear();
			
			const result = retreiveTheme();
			const expected = 'Simple';
			
			expect(result).toEqual(expected);
		});		
	});	
});	

describe('Test formatCurrency function', () => {
	test('It will format num to hundredths place', () => {
		const result = formatCurrency(100);
		const expected = '100.00';
		
		expect(result).toEqual(expected);
	});
	
	test('It will format num to hundredths place on a different locale', () => {
		const result = formatCurrency(100, 'en-UK');
		const expected = '100.00';
		
		expect(result).toEqual(expected);
	});	
});
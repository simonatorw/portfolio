import { getTodaysDate, getShortMonthDay } from './date';

describe('Test getTodaysDate function', () => {
    test('It will return a formatted date', () => {
		const result = getTodaysDate('1/1/1990');
		const expected = 'January 1, 1990';
		
        expect(result).toEqual(expected);
    });

    test('It will return a string', () => {
		const result = getTodaysDate();
		const expected = jasmine.any(String);
		
        expect(result).toEqual(expected);
    });	
});

describe('Test getShortMonthDay function', () => {
    test('It will return a formatted short month-day', () => {
		const result = getShortMonthDay('1990-10-01');
		const expected = 'Oct 01';
		
        expect(result).toEqual(expected);
    });

    test('It will return a string', () => {
		const result = getTodaysDate();
		const expected = jasmine.any(String);
		
        expect(result).toEqual(expected);
    });	
});
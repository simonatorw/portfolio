import React from 'react';
import { connect } from 'react-redux';

import themes from './themes';
import { changeTheme } from '../../store/actions/actionCreators';

import './ThemePicker.css';

export function ThemePickerTpl({ selectTheme, theme }) {
	const keys = Object.keys(themes);
	
	return (
		<div className="themePicker">
			<label className="themeLabel">Theme</label>
			<select className="themeSelect" onChange={selectTheme} defaultValue={theme}>
				{ keys.map(themeOption => (<option key={themeOption}>{themeOption}</option>)) }
			</select>
			<div>
				<style>
					{ themes[theme] }
				</style>
			</div>
		</div>
	);
}

function mapStateToProps(store) {
	return {
		theme: store.appReducer.theme
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		selectTheme: function(e) {
			const theme = e.target.value;
			
			dispatch(changeTheme(theme));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ThemePickerTpl);
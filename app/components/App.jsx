import React, { Component } from 'react';

import actionTypes from '../store/actions/actionTypes';
import store from '../store/store';
import Portfolio from './Portfolio/Portfolio';

import './App.css';

function AppTpl() {
	return (
		<div className="container">
			<header className="panel header">
				<h1>Open Point</h1>
			</header>
			<Portfolio />
		</div>
	);
}

export default class App extends Component {
	componentWillMount() {
		store.dispatch({ type: actionTypes.PORTFOLIO_DATA.GET });
	}
	render() {
		return (
			<AppTpl />
		);
	}
}
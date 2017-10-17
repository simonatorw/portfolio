import React from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';

import DataGrid from '../DataGrid/DataGrid';

import './Portfolio.css';

export function PortfolioTpl({ data }) {
    return (
        <div id="portfolio" className="panel">
            <h2>Portfolio Home</h2>
            <DataGrid data={data} />
        </div>
    );
}

PortfolioTpl.propTypes = {
	data: object.isRequired 
};

function mapStateToProps(store) {
	return {
		data: store.dataReducer.portfolio
	};
}

export default connect(mapStateToProps)(PortfolioTpl);
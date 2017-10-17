import React from 'react';
import { connect } from 'react-redux';
import { object } from 'prop-types';

import LineChart from '../charts/LineChart/LineChart';

export function EquityPositionsNavTpl({ data }) {
    return (
        <div className="panel chartSmall">
            <h2>Equity Positions by NAV bps bins, 4-Week Trend</h2>
			{ data.data.length && 
			<LineChart data={data.data[0].data} />
			}			
        </div>
    );
}

EquityPositionsNavTpl.propTypes = {
	data: object
};

function mapStateToProps(store) {
	return {
		data: store.dataReducer.equityPositionsNav
	};
}

export default connect(mapStateToProps)(EquityPositionsNavTpl);
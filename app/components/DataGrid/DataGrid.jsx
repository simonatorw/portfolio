import React, { Component } from 'react';

import { getChart, formatCurrency } from '../../utils/utils';

import './DataGrid.css';

export default class DataGrid extends Component {

    render() {
        return(
            <table className="dataGrid">
                <thead>
                    <tr>
                    { this.props.data.headers.map((headerName, i) => 
                        <th className="gridHead" key={`header_${i}`}>{headerName}</th>
                    )}
                    </tr>
                </thead>
                <tbody>
                { this.props.data.data.map((row, i) => 
                    <tr key={`row_${i}`} className="gridRow">
                    { Object.keys(row).map((key, i) =>
                        !key.toLowerCase().includes('id') && <td className={ `gridCell ${(row[key] || typeof row[key] === 'number') && typeof row[key] !== 'object'  ? (!isNaN(parseFloat(row[key])) || (row[key].includes('$') && row[key].includes('M')) ? 'amt' : '') : 
							(typeof row[key] === 'object' ? 'chart' : 'empty')}` } key={`col_${i}`}>
                            { typeof row[key] === 'object' ? getChart(row[key].chartType, row[key].data) : (row[key] || typeof row[key] === 'number' ? formatCurrency(row[key]) : '-') }
                        </td>
                    )}
                    </tr>
                )}
                </tbody>
            </table>
        );
    }
}
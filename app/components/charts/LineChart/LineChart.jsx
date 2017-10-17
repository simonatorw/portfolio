import React, { Component } from 'react';
import { object } from 'prop-types';
import Chartist from 'chartist';
import 'chartist-plugin-legend';

import '../../../utils/chartist-plugin-axistitle';
import { getShortMonthDay } from '../../../utils/date';

import '../charts.css';

export default class LineChart extends Component {
	static propTypes = {
		data: object.isRequired
	};
	componentDidMount() {
		let options = {
			height: '28px',
			showGridBackground: false,
			showPoint: false,
			fullWidth: true,
			chartPadding: {
				top: 2,
				right: 0,
				bottom: 2,
				left: 0
			},
			axisX: {
				offset: 0,
				showLabel: false,
				showGrid: false
			},
			axisY: {
				offset: 0,
				showLabel: false,
				showGrid: false
			}
		};
		if (this.props.data.params && this.props.data.params.detailed) {
			options = {
				height: '230px',
				showGridBackground: false,
				showPoint: false,
				fullWidth: true,
				low: 0,
				high: 200,
				chartPadding: {
					top: 0,
					right: 0,
					bottom: 18,
					left: 10
				},			
				axisX: {
					showGrid: true,
					position: 'end',
					labelInterpolationFnc: function(label, cnt) {
						if (typeof label === 'string' && label.includes('-')) {
							if (!(cnt % 2)) {
								cnt++;
								return getShortMonthDay(label);
							} else {
								cnt++;
								return '';
							}
						}
						return label;
					}
				},
				axisY: {
					showGrid: true,
					position: 'start'
				},
				plugins: [
					Chartist.plugins.legend(),
                    Chartist.plugins.ctAxisTitle({
                        axisX: {
                            axisTitle: this.props.data.params.xTitle || ' ',
                            axisClass: 'ct-axis-title',
                            offset: {
                                x: 0,
                                y: 45
                            },
                            textAnchor: 'middle'
                        },
                        axisY: {
                            axisTitle: this.props.data.params.yTitle || ' ',
                            axisClass: 'ct-axis-title',
                            offset: {
                                x: 0,
                                y: 12
                            },
							textAnchor: 'middle',
                            flipTitle: true
                        }
                    })
				]
			};
		}
		new Chartist.Line(this.el, {
			labels: this.props.data.labels,
			series: this.props.data.series
		}, options);		
	}
	render() {
		return (
			<div>
				<div className="lineChart" ref={el => this.el = el}></div>
			</div>
		);
	}
}

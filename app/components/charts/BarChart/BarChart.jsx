import React, { Component } from 'react';
import { object } from 'prop-types';
import Chartist from 'chartist';

import { chartClasses } from '../../../constants';

export default class BarChart extends Component {
	static propTypes = {
		data: object.isRequired
	};
	state = {
		chartClass: chartClasses.BAR
	};
	componentDidMount() {
		const options = {
			height: '28px',
			showGridBackground: false,
			chartPadding: {
				top: 0,
				right: 0,
				bottom: 0,
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
		if (this.props.data.params) {
			if (this.props.data.params.horizontalBars) {
				options.horizontalBars = this.props.data.params.horizontalBars;
				options.reverseData = true;
				this.setState({ chartClass: chartClasses.BAR_HORIZONTAL });
			}
			if (this.props.data.params.stackBars) {
				options.stackBars = this.props.data.params.stackBars;
				if (this.props.data.params.low && this.props.data.params.high) {
					this.props.data.series.length && this.props.data.series[0][0] > 0 ? this.setState({ chartClass: chartClasses.STACK_BAR_UP }) : this.setState({ chartClass: chartClasses.STACK_BAR_DOWN });
				}
			}
			if (this.props.data.params.low) {
				options.axisX.low = this.props.data.params.low;
			}
			if (this.props.data.params.high) {
				options.axisX.high = this.props.data.params.high;
			}
		}
		new Chartist.Bar(this.el, {
			labels: this.props.data.labels,
			series: this.props.data.series
			
		}, options);		
	}
	render() {
		return (
			<div>
				<div className={this.state.chartClass} ref={el => this.el = el}></div>
			</div>
		);
	}
}

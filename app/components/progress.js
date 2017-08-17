/*
* @Author: lenovo
* @Date:   2017-08-16 11:55:33
* @Last Modified by:   lenovo
* @Last Modified time: 2017-08-16 20:01:56
*/
import React from 'react';
import './progress.less';

let Progress = React.createClass({
	getDefaultProps()   {
		return {
			barColor: '#2f9842'
		};
	},
	changeProgress(e) {
		//获取到真实的节点
		let progressBar = this.refs.progressBar;
		let progress = (e.clientX - progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
		//要先判断progressChangeHandler存不存在
		this.props.onProgressChange && this.props.onProgressChange(progress);
	},
	render() {
		return (
			<div className="components-progress" ref="progressBar" onClick={this.changeProgress}>
				<div className="progress" style={{width: `${this.props.progress}%`,background: this.props.barColor}}></div>
			</div>
		);
	}
});

export default Progress;
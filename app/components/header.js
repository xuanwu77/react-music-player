/*
* @Author: lenovo
* @Date:   2017-08-16 10:11:49
* @Last Modified by:   lenovo
* @Last Modified time: 2017-08-16 16:46:05
*/
import React from 'react';
import './header.less';

let Header = React.createClass({
	render() {
		return (
			<div className="components-header row">
				<img src="/static/images/logo.png" width="40" alt="" className="-col-auto"/>
				<h1 className="caption">React Music Player</h1>
			</div>
		);
	}
});

export default Header;
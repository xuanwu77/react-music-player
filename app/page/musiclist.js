/*
* @Author: lenovo
* @Date:   2017-08-17 11:00:24
* @Last Modified by:   lenovo
* @Last Modified time: 2017-08-17 15:32:52
*/
import React from 'react';
import MusicListItem from '../components/musiclistitem';

let MusicList = React.createClass({
	render(){
		let listEle = null;
		listEle = this.props.musicList.map((item)=>{
			return <MusicListItem 
						focus={item == this.props.currentMusicItem}
						key={item.id}
						musicItem={item}
						>
						{item.title}
				   </MusicListItem>
		});
		return (
			<ul>
				{listEle}
			</ul>
			);
	}
});

export default MusicList;
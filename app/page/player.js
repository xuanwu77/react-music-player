/*
* @Author: lenovo
* @Date:   2017-08-16 20:08:26
* @Last Modified by:   lenovo
* @Last Modified time: 2017-08-17 18:59:41
*/
import React from 'react';
import Progress from '../components/progress';
import './player.less';
import {Link} from 'react-router';
import Pubsub from 'pubsub-js';

let duration = null;
let Player = React.createClass({
	getInitialState() {
		return {
			progress: 0,
			volume: 0,
			isPlay: true,
			leftTime: ''

		};
	},
	playPrev() {
		Pubsub.publish('PLAY_PREV');
	},
	playNext() {
		Pubsub.publish('PLAY_NEXT');
	},
	formatTime(time){
		time = Math.floor(time);
		let minutes = Math.floor(time / 60),
			seconds = Math.floor(time % 60);
		second = seconds < 10 ? `0${seconds}` : seconds;
		return `${minutes}:${seconds}`;
	},	
	componentDidMount() {
		//音乐播放进度的更新触发progress的改变
		$('#player').bind($.jPlayer.event.timeupdate,(e)=>{
			//获取到音频的总时长
			duration = e.jPlayer.status.duration;
			this.setState({
				volume: e.jPlayer.options.volume * 100,
				progress: e.jPlayer.status.currentPercentAbsolute,
				leftTime: duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100)
			});
		});
	},
	componentWillMount() {
		//将上面绑定的事件解绑，放在componentWillMount中
		$('#player').unbind($.jPlayer.event.timeupdate);
	},
	progressChangeHandler(progress) {
		//让音乐播放到指定进度
		$('#player').jPlayer('play',duration * progress);
	},
	changeVolumeHandler(progress) {
		$('#player').jPlayer('volume',progress);
	},
	play() {
		if(this.state.isPlay){
			$('#player').jPlayer('pause');
		}else{
			$('#player').jPlayer('play');
		}
		this.setState({
			isPlay: !this.state.isPlay
		});
	},
	render() {
		return (
			<div className="player-page">
                <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row">
                	<div className="controll-wrapper">
                		<h2 className="music-title">{this.props.currentMusitItem.title}</h2>
                		<h3 className="music-artist mt10">{this.props.currentMusitItem.artist}</h3>
                		<div className="row mt20">
                			<div className="left-time -col-auto">-{this.state.leftTime}</div>
                			<div className="volume-container">
                				<i className="icon-volume rt" style={{top: 5, left: -5}}></i>
                				<div className="volume-wrapper">
									<Progress
										progress={this.state.volume}
										onProgressChange={this.changeVolumeHandler}
										barColor="#aaa"
									>
									</Progress>
                				</div>
                			</div>
                		</div>
                		<div style={{height: 10, lineHeight: '10px',marginTop:10}}>
			                <Progress
								progress={this.state.progress}
								onProgressChange={this.changeProgressHandler}
			                >
			                </Progress>
                		</div>
                		<div className="mt35 row">
                			<div>
	                			<i className="icon prev" onClick={this.playPrev}></i>
	                			<i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}></i>
	                			<i className="icon next ml20" onClick={this.playNext}></i>
                			</div>
                			<div className="-col-auto">
                				<i className={`icon repeat-${this.props.repeatType}`} onClick={this.changeRepeat}></i>
                			</div>
                		</div>
                	</div>
                	<div className="-col-auto cover">
                		<img src={this.props.currentMusitItem.cover} alt={this.props.currentMusitItem.title}/>
                	</div>
                </div>
            </div>
			);
	}
});

export default Player;
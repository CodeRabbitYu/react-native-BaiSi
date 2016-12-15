/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    AlertIOS,
    ActivityIndicator,
    InteractionManager,
    TouchableOpacity,
    ListView,
    TextInput,
    Modal,
    PixelRatio
} from "react-native";
import Video from "react-native-video";
import Dimensions from "Dimensions";
const {width, height} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

export default class Detail extends Component {
    static defaultProps = {
        videoUrl: '',
        videoData: React.PropTypes.string,
    };
    constructor(props){
        super(props);

        let imageHeight = width * this.props.videoData.height / this.props.videoData.width;
        if (imageHeight > height-150){
            imageHeight = 300;
        }
        let videoTime = this.props.videoData.videotime / 60;
        videoTime = videoTime.toFixed(1);
        videoTime = videoTime.substring(0,videoTime.lastIndexOf('.'));
        let videoLastTime = this.props.videoData.videotime % 60;
        if (videoTime == 0){
            videoTime = '0' + videoTime;
        }
        if (videoTime >= 1 && videoTime <= 9){
            videoTime = '0' + videoTime;
        }
        if (videoLastTime<=9 && videoLastTime>=0){
            videoLastTime = '0' + videoLastTime;
        }

        this.state = {
            imageHeight:imageHeight,
            videoTime:videoTime,
            videoLastTime:videoLastTime,
            videoNormalTime:'00:00',

            videoMinTime:'00',
            videoSecTime:'00',

            rate: 1,
            volume: 1,
            // 声音
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            controls: false,
            // 暂停
            paused: true,
            skin: 'custom',
            isVideoLoad:false,
            // 是否播放
            isPlay:true,
            // 是否有声音
            isVolume:true,

            isVideoOk:false,

            //底部ToolBar隐藏
            isToolHidden:false,

        };
        this.onLoadStart = this.onLoadStart.bind(this);
        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onEnd = this.onEnd.bind(this);
        this.onError = this.onError.bind(this);
        this.onPlay = this.onPlay.bind(this);
        // 暂停播放
        this.onPause = this.onPause.bind(this);
        // 恢复播放
        this.resumePlayer = this.resumePlayer.bind(this);
    }
    // 恢复播放
    resumePlayer(){
        if (this.state.paused) {
            this.setState({
                paused:false
            })
        }
    }
    // 暂停播放
    onPause(){
        if (!this.state.paused) {
            this.setState({
                paused:true
            })
        }
    }
    // 重新播放
    onPlay(){
        this.refs.videoPlayer.seek(0);
        // this.refs.videoPlayer.presentFullscreenPlayer()
    }
    // 开始加载
    onLoadStart(){
        console.log('onLoadStart');
    }
    // 正在加载
    onLoad(data){
        this.setState({duration: data.duration});
    }
    // 进度条
    onProgress(data) {

        if(!this.state.isVideoLoad){
            this.setState({
                isVideoLoad:true
            });
        }
        if(!this.state.isPlay){
            this.setState({
                isPlay:true
            });
        }
        this.setState({currentTime: data.currentTime});
    }
    // 视频结束
    onEnd(){
        console.log('onEnd');
        // 当结束的时候暂停播放
        this.setState({
            currentTime:this.state.duration,
            isPlay:false,
        });
    }
    // 视频出错
    onError(error){
        console.log(error);
        this.setState({
            isVideoOk:true
        });
    }
    // 进度条调用的方法
    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        } else {
            return 0;
        }
    }

    // 关闭定时器
    stopTimer(){
        this.setIntervar && clearInterval(this.setIntervar);
    }

    // 开启定时器
    startBegin(){
        // 1.添加定时器
        this.setIntervar = setInterval(()=>{
            let secTime = ++this.state.videoSecTime;
            // console.log(this.state.videoMinTime);
            let minTime = this.state.videoMinTime;

            if(secTime < 10){
                secTime = '0' + secTime;
            }

            if (secTime > 59){
                minTime++;
                if (minTime < 9){
                    minTime = '0' + minTime++;
                } else {
                    minTime = minTime++;
                }
                secTime = '00';
            }

            let videoTime = minTime + ':' + secTime;
            let videoAllTime = this.state.videoTime + ':' + this.state.videoLastTime;

            if (videoTime == videoAllTime){
                this.stopTimer();
            }

            //2.3更新状态机
            this.setState({
                videoSecTime:secTime,
                videoMinTime:minTime,
            });
        },1000);
    }

    // 视频全屏
    renderScreen(){
        this.refs.videoPlayer.presentFullscreenPlayer();
    }

    // 打开声音
    renderYESVolume(){
        console.log(this.state.volume);

        if (!this.state.volume) {
            this.setState({
                isVolume:true,
                volume:1,
            })
        }
    }
    // 关闭声音
    renderNOVolume(){
        console.log(this.state.volume);

        if (this.state.volume) {
            this.setState({
                isVolume:false,
                volume:0,
            })
        }
    }

    // 恢复播放
    renderPlay(){
        console.log(this.state.paused);

        if (this.state.paused) {
            this.setState({
                paused:false,
            })
        }
    }
    // 暂停播放
    renderPause(){
        console.log(this.state.paused);
        if (!this.state.paused) {
            this.setState({
                paused:true,
            })
        }
    }

    renderVideoViewPress(){
        this.setState({
            isToolHidden:!this.state.isToolHidden,
        })
    }

    renderPlayVideo(){
        return(
            <View style={{backgroundColor:'black'}}>
                <TouchableOpacity style={styles.videoViewStyle} onPress={()=>this.renderVideoViewPress()} activeOpacity={1}>
                    <Video
                        source={{uri:this.props.videoData.videouri}}
                        style={{width:width-20,height:this.state.imageHeight}}
                        // 速率
                        rate={this.state.rate}
                        // 开始暂停
                        paused={false}
                        // 声音大小
                        volume={this.state.volume}
                        // 静音
                        muted={this.state.muted}
                        // 屏幕
                        resizeMode={this.state.resizeMode}
                        // 重复播放
                        repeat={false}

                        onLoadStart={this.onLoadStart}
                        onLoad={this.onLoad}
                        onProgress={this.onProgress}
                        onEnd={this.onEnd}
                        onError={this.onError}
                        ref="videoPlayer"
                    />
                </TouchableOpacity>
                {
                    this.state.isToolHidden ?
                        <View style={styles.videoToolBarViewStyle}>
                            {this.state.paused ?
                                <Icon
                                    name="ios-pause"
                                    size={25}
                                    color='white'
                                    style={styles.videoToolPlayStyle}
                                    onPress={()=>this.renderPlay()}
                                />
                                :
                                <Icon
                                    name="ios-play"
                                    size={25}
                                    color='white'
                                    style={styles.videoToolPlayStyle}
                                    onPress={()=>this.renderPause()}
                                />
                            }

                            <View style={styles.videoToolTextViewStyle}>
                                <Text
                                    style={styles.videoToolTextStyle}>{this.state.videoMinTime + ':' + this.state.videoSecTime}</Text>
                                <Text
                                    style={styles.videoToolTextStyle}>{this.state.videoTime + ':' + this.state.videoLastTime}</Text>
                            </View>

                            {this.state.isVolume ?
                                <Icon
                                    name="ios-volume-up"
                                    size={25}
                                    color='white'
                                    style={styles.videoVolumeStyle}
                                    onPress={()=>this.renderNOVolume()}
                                />
                                :
                                <Icon
                                    name="ios-volume-off"
                                    size={25}
                                    color='white'
                                    style={styles.videoVolumeStyle}
                                    onPress={()=>this.renderYESVolume()}
                                />
                            }

                            <Icon
                                name="ios-expand"
                                size={25}
                                color='white'
                                style={styles.videoToolExpandStyle}
                                onPress={()=>this.renderScreen()}
                            />
                        </View>
                        : null
                }
            </View>
        )
    }

    renderVideo(){
        return(
                <Image source={{uri:this.props.videoData.cdn_img}} style={{width:width-20,height:this.state.imageHeight}}
                       indicator={ProgressBar} resizeMode='contain'>
                    <Icon
                        name="ios-play"
                        size={45}
                        color='white'
                        style={[styles.playStyle,{position:'absolute',top:this.state.imageHeight/2-20,left:width/2-30,
                        }]}
                    />
                    <View style={styles.videoBottomStyle}>
                        <Text style={styles.videoPlayStyle}>{this.props.videoData.playcount + '播放'}</Text>
                        <Text style={styles.videoTimeStyle}>{this.state.videoTime + ':' + this.state.videoLastTime}</Text>
                    </View>
                </Image>
        )
    }

    videoPress(){
        this.startBegin();
        this.setState({
            isPlay:false,
            paused:false,
        })
    }

    render() {
        return (
            this.state.isPlay ?
                <TouchableOpacity activeOpacity={1} style={styles.videoViewStyle} onPress={()=>this.videoPress()}>
                    {this.renderVideo()}
                </TouchableOpacity>
                :
                this.renderPlayVideo()


        );
    }
}

const styles = StyleSheet.create({
    videoBottomStyle:{
        flexDirection:'row',
        position:'absolute',
        bottom:5,
        width:width-20,
    },
    videoPlayStyle:{
        position:'relative',
        left:0,
        backgroundColor:'rgba(88, 87, 86, 0.6)',
        color:'white',
    },
    videoTimeStyle:{
        position:'absolute',
        right:0,
        backgroundColor:'rgba(88, 87, 86, 0.6)',
        color:'white'
    },
    playStyle:{
        height:60,
        width:60,
        backgroundColor:'transparent',
        borderColor:'white',
        borderWidth:2,
        borderRadius:30,
        paddingTop:8,
        paddingLeft:22,
    },
    videoViewStyle: {
        marginBottom:5,
        marginLeft:10,
        marginRight:10,
    },
    videoToolBarViewStyle:{
        flexDirection:'row',
        height:30,
        width:width -20,
        backgroundColor:'rgba(00, 00, 00, 0.4)',
        marginLeft:10,
        position:'absolute',
        bottom:0
    },
    videoToolPlayStyle: {
        position:'absolute',
        left:10,
        top:2,
    },
    videoToolTextViewStyle:{
        flexDirection:'row',
        height:30,
        marginLeft:30
    },
    videoToolTextStyle:{
        marginLeft:10,
        fontSize:16,
        marginTop:6,
        color:'white'
    },
    videoVolumeStyle:{
        position:'absolute',
        right:35,
        bottom:2
    },
    videoToolExpandStyle:{
        position:'absolute',
        top:2,
        right:5
    },
});
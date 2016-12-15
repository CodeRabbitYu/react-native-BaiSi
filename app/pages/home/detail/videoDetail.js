/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    InteractionManager,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

let {width, height} = Dimensions.get('window');

import NavBar from 'react-native-navbar';
import LeftNavBtn from '../../../common/leftNavBtn'
import VideoItem from '../component/videoItem'

import Video from "react-native-video";


export default class satinDetail extends Component {
    static defaultProps = {
        videoData: React.PropTypes.string,
    };
    constructor(props) {
        super(props);
        console.log(this.props.videoData.text);
        this.state = {

            rate: 1,
            volume: 1,
            // 声音
            muted: false,
            resizeMode: 'stretch',
            duration: 0.0,
            currentTime: 0.0,
            controls: false,
            // 暂停
            paused: false,
            skin: 'custom',
            isVideoLoad: false,
            isPlay: false,
            isVideoOk: false,

        };
    }
    popToHome(){
        let {navigator} = this.props;
        if (navigator) {
            InteractionManager.runAfterInteractions(()=> {
                navigator.pop();
            });
        }
    }

    videoPress(){

    }

    render() {
        let titleConfig = {
            title: '知识详情',
            style: {color: 'black', fontSize: 18, fontWeight: '500'}
        };

        return (
            <View style={styles.videoViewStyle}>
                <Video
                    source={{uri:this.props.videoData.videouri}}
                    style={styles.videoStyle}
                    // 速率
                    rate={this.state.rate}
                    // 开始暂停
                    paused={this.state.paused}
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    videoViewStyle:{
        width:width,
        height:240,
        backgroundColor:'white',

    },
    videoStyle:{
        width:width,
        height:230,
        backgroundColor:'black'
    },
    loadStyle: {
        marginVertical:20,
        position:'absolute',
        left:0,
        width:width,
        top:90,
        backgroundColor:'transparent',
        alignSelf:'center'
    },

});

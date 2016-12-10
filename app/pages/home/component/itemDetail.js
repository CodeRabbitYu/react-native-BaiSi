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
    Dimensions,
    TouchableOpacity,
    InteractionManager,
    ActivityIndicator,
} from 'react-native';

let {width, height} = Dimensions.get('window');

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

import Icon from 'react-native-vector-icons/Ionicons';


export default class itemDetail extends Component {
    static defaultProps = {
        itemData: React.PropTypes.string,
        picturePress:null,
        satinPress:null,
    };

    render() {
        // 图片
        if (this.props.itemData.type == '10'){
            return(
                <PictureItem pictureData={this.props.itemData}
                             picturePress={this.props.picturePress}
                             satinPress={this.props.satinPress}
                />
            )
        }
        // 段子
        if (this.props.itemData.type == '29'){
            return(
                <SatinItem satinData={this.props.itemData.text}
                           satinPress={this.props.satinPress}
                />
            )
        }
        // 声音
        if (this.props.itemData.type == '31'){
            return(
                <View>
                    <Text>{this.props.itemData.text}</Text>
                </View>
            )
        }
        // 视频
        if (this.props.itemData.type == '41'){
            return(
                <View>
                    <VideoItem videoData={this.props.itemData}/>
                </View>
            )
        }

    }
}

// 视频
class VideoItem extends Component{
    static defaultProps = {
        videoData: React.PropTypes.string,
        satinPress:null,
    };
    constructor(props){
        super(props);
        let imageHeight = (width - 20) * this.props.videoData.height / this.props.videoData.width;
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
        this.state={
            imageHeight:imageHeight,
            videoTime:videoTime,
            videoLastTime:videoLastTime,
        };
    }
    render(){
        return(
            <View style={styles.imageViewStyle}>
                <SatinItem satinData={this.props.videoData.text} />
                <Image source={{uri:this.props.videoData.cdn_img}} style={{width:width-20,height:this.state.imageHeight}}
                       indicator={ProgressBar}>
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

            </View>
        )
    }
}

// 段子
class SatinItem extends Component{
    static defaultProps = {
        satinData: React.PropTypes.string,
        satinPress:null,
    };

    render(){
        return(
            <TouchableOpacity activeOpacity={0.8} onPress={this.props.satinPress}>
                <View style={styles.satinViewStyle}>
                    <Text style={styles.satinStyle}>
                        {this.props.satinData}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

// 图片
class PictureItem extends Component{
    static defaultProps = {
        pictureData: React.PropTypes.string,
        picturePress: null,
        satinPress: null,
    };

    constructor(props){
        super(props);
        let imageHeight = (width - 20) * this.props.pictureData.height / this.props.pictureData.width;
        this.state={
            imageHeight:imageHeight
        };
        // console.log('屏幕高度' + height);
        // console.log('图片展示高度'+this.state.imageHeight);
    }
    renderPicture(){
        // gif图
        if (this.props.pictureData.is_gif == '1'){
            // console.log('gif图' + this.props.pictureData.height);
            return(
                <Image source={{uri:this.props.pictureData.cdn_img}} style={{width:width-20,height:this.state.imageHeight}}
                       indicator={ProgressBar} resizeMode='contain'
                />
            )
        }
        // 长图
        if (this.state.imageHeight > height){
            // console.log('长图'+this.props.pictureData.height);
            return(
                <Image source={{uri:this.props.pictureData.image0}} style={{width:width-20,height:height}}
                       resizeMode='contain' indicator={ProgressBar}
                >
                    <View style={styles.longImageViewStyle}>
                        <Text style={styles.longImageTextStyle}>点击查看全图</Text>
                    </View>
                </Image>
            )
        }
        return(
            <Image source={{uri:this.props.pictureData.cdn_img}} style={{width:width-20,height:this.state.imageHeight}}
                   indicator={ProgressBar}
            />
        )
    }
    // 普通图片
    render(){
        return(
                <View style={styles.imageViewStyle}>
                    <SatinItem satinData={this.props.pictureData.text} satinPress={this.props.satinPress}/>
                    <TouchableOpacity onPress={this.props.picturePress} activeOpacity={0.8}>
                        {this.renderPicture()}
                    </TouchableOpacity>

                </View>
        )
    }
}

const styles = StyleSheet.create({
    satinViewStyle:{
        margin:10,
    },
    satinStyle:{
        fontSize:16,
    },
    imageViewStyle:{
        marginBottom:10,
        marginLeft:10,
        marginRight:10,
    },
    longImageViewStyle:{
        position:'absolute',
        bottom:0,

        height:40,
        width:width,
        backgroundColor:'rgba(88, 87, 86, 0.3)',
    },
    longImageTextStyle: {
        fontSize: 18,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    loadDataStyle: {
        marginVertical:20
    },
    videoBottomStyle:{
        flexDirection:'row',
        position:'absolute',
        bottom:0,
        width:width-20,
    },
    videoPlayStyle:{
        position:'relative',
        left:0,
        backgroundColor:'rgba(88, 87, 86, 0.6)',
        color:'white'

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

    }

});

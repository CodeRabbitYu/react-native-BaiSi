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
                    <Text>{this.props.itemData.text}</Text>
                </View>
            )
        }

    }
}

// 视频
class VideoItem extends Component{
    render(){

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
        if (this.props.pictureData.is_gif == '1'){
            // console.log('gif图' + this.props.pictureData.height);
            return(
                <Image source={{uri:this.props.pictureData.cdn_img}} style={{width:width-20,height:this.state.imageHeight}}
                       indicator={ProgressBar}
                />
            )
        }
        if (this.state.imageHeight > height){
            // console.log('长图'+this.props.pictureData.height);
            return(
                <Image source={{uri:this.props.pictureData.image0}} style={{width:width-20,height:height}} resizeMode='contain'
                       indicator={ProgressBar}
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

});

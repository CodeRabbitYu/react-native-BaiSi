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

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

let {width, height} = Dimensions.get('window');

export default class pictureItem extends Component {
    static defaultProps = {
        pictureData: React.PropTypes.string,
        picturePress: null,
        isPicDetail: false,
        popPress: null,
    };

    constructor(props){
        super(props);
        let imageHeight = width * this.props.pictureData.height / this.props.pictureData.width;
        this.state={
            imageHeight:imageHeight,
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
                <Image source={{uri:this.props.pictureData.cdn_img}} style={{width:width-20,height:300}}
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

    renderLongPic(){
        // 长图
        if (this.state.imageHeight > height){
            // console.log('长图'+this.props.pictureData.height);
            return(
                <Image source={{uri:this.props.pictureData.cdn_img}}
                       style={[styles.imageStyle,{height:this.state.imageHeight}]}
                       resizeMode='contain'
                />
            )
        }
        return(
            <Image source={{uri:this.props.pictureData.cdn_img}}
                   style={ {height:this.state.imageHeight,marginTop:(height-this.state.imageHeight) / 2}}
                   indicator={ProgressBar}
            />
        )
    }

    render(){
        return(
            this.props.isPicDetail ?
                <TouchableOpacity onPress={this.props.popPress} activeOpacity={0.9}>
                    {this.renderLongPic()}
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={this.props.picturePress} activeOpacity={0.9} style={styles.imageViewStyle}>
                    {this.renderPicture()}
                </TouchableOpacity>
        )

    }
}

const styles = StyleSheet.create({
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
});

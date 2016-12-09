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
    ScrollView,
    Dimensions,
    TouchableOpacity,
    InteractionManager,
    ActivityIndicator
} from 'react-native';

let {width, height} = Dimensions.get('window');

import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';


export default class pictureDetail extends Component {
    static defaultProps = {
        pictureData: React.PropTypes.string,
        picturePress:null
    };

    constructor(props){
        super(props);
        let imageHeight = width * this.props.pictureData.height / this.props.pictureData.width;
        console.log(imageHeight);
        this.state={
            imageHeight:imageHeight,
        };
        // console.log('屏幕高度' + height);
        // console.log('图片展示高度'+this.state.imageHeight);
    }

    popPress(){
        let {navigator} = this.props;
        if (navigator) {
            InteractionManager.runAfterInteractions(()=> {
                navigator.pop();
            });
        }
    }

    renderPicture(){
        if (this.state.imageHeight > height){
            // console.log('长图'+this.props.pictureData.height);
            return(
                <TouchableOpacity onPress={()=>{this.popPress()}} activeOpacity={0.9}>
                    <Image source={{uri:this.props.pictureData.cdn_img}}
                           style={[styles.imageStyle,{height:this.state.imageHeight}]}
                           resizeMode='contain'
                           indicator={ProgressBar}
                    />
                </TouchableOpacity>
            )
        }
        return(
            <TouchableOpacity onPress={()=>{this.popPress()}} activeOpacity={0.9}>
                <Image source={{uri:this.props.pictureData.image0}}
                       style={[styles.imageNormalStyle,
                             {height:this.state.imageHeight,marginTop:(height-this.state.imageHeight) / 2}]}
                       indicator={ProgressBar}
                />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <ScrollView
                // 横向滚动
                horizontal={false}
                // 隐藏滚动条
                showsHorizontalScrollIndicator={false}
                // 弹簧效果
                alwaysBounceHorizontal={false}
                alwaysBounceVertical={false}
                // 滚动效果
                scrollEnabled={true}
                style={styles.container}
            >
                {this.renderPicture()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    loadDataStyle: {
        marginVertical:20
    },
});

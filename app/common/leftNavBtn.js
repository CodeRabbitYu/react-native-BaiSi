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
    TouchableOpacity,
    Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class leftNavBtn extends Component {
    static defaultProps = {
        // 回调函数
        popToHome: null
    };

    render() {
        return (
            <TouchableOpacity onPress={this.props.popToHome}>
                <Icon
                    name="ios-arrow-back-outline"   //图片名连接,可以到这个网址搜索:http://ionicons.com/, 使用时:去掉前面的 "icon-" !!!!
                    size={30}   //图片大小
                    color="black"  //图片颜色
                    style={{marginLeft:10,marginTop:7,height:30}}
                />
            </TouchableOpacity>
        );
    }
}
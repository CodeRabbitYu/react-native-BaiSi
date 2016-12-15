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
    Image
} from 'react-native';

let {width, height} = Dimensions.get('window');

export default class userInfoItem extends Component {
    static defaultProps = {
        userInfoData: React.PropTypes.string,
        userInfoPress: null,
    };
    render(){
        return(
            <View style={styles.userInfoStyle}>
                <TouchableOpacity activeOpacity={0.7} onPress={this.props.userInfoPress} style={{flexDirection:'row'}}>
                <Image source={{uri:this.props.userInfoData.profile_image}} style={styles.iconStyle}/>
                <View style={styles.userDetailStyle}>
                    <Text style={styles.userTextStyle}>{this.props.userInfoData.name}</Text>
                    <Text style={styles.userTimeStyle}>{this.props.userInfoData.passtime}</Text>
                </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    userInfoStyle:{
        flexDirection:'row',
    },
    iconStyle: {
        width:50,
        height:50,
        borderRadius:25,
        marginTop:5,
        marginLeft:10,
    },
    userDetailStyle:{
        alignSelf:'center',
        marginLeft:8,
        marginTop:5,
    },
    userTextStyle:{
        fontSize:15,
        marginBottom:3,
        color:'#9596a8',
    },
    userTimeStyle:{
        fontSize:13,
        color:'#9596a8',
    },
});
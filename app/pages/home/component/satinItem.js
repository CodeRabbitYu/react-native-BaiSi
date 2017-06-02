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
export default class satinItem extends Component {
    static defaultProps = {
        satinData: React.PropTypes.string,
        satinPress:null,
    };

    render(){
        console.log(this.props.satinData);
        return(
            <TouchableOpacity activeOpacity={0.8} onPress={this.props.satinPress}>
                <View style={styles.satinViewStyle}>
                    <Text style={styles.satinStyle} adjustsFontSizeToFit={true}>
                        {this.props.satinData}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    satinViewStyle:{
        margin:10,
    },
    satinStyle:{
        fontSize:16,
        textAlign:'left'

    },
});

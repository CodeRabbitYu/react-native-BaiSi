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
import Icon from 'react-native-vector-icons/Ionicons';

export default class toolBarItem extends Component {
    static defaultProps = {
        toolBarData: React.PropTypes.string,
        toolBarPress: null,
    };

    constructor(props){
        super(props);
        this.state = {
            btnData : [
                {'icon':'ios-thumbs-up-outline','title':this.props.toolBarData.love,'selected':false},
                {'icon':'ios-thumbs-down-outline','title':this.props.toolBarData.hate,'selected':false},
                {'icon':'ios-open-outline','title':this.props.toolBarData.repost,'selected':false},
                {'icon':'ios-text-outline','title':this.props.toolBarData.comment,'selected':false}
            ]
        }
    };

    btnPress(i){
        alert(i);

        // let newBtnData = this.state.btnData;
        //
        // newBtnData[i].selected = true;
        //
        // this.setState({
        //     btnData:newBtnData
        // });

        let newBtnData = this.state.btnData;

        newBtnData.forEach((e)=>{
            if(e.selected){
                e.selected=false
            }
        });
        newBtnData[i].selected=true;
        this.setState({
            btnData:newBtnData
        });
    };

    createBtn(){
        let btnArr = [];
        for(let i = 0 ; i < this.state.btnData.length ; i ++){
            let btnData = this.state.btnData;
            btnArr.push(
                <TouchableOpacity key={i} onPress={()=>{this.btnPress(i)}} activeOpacity={1}>
                    <View style={styles.btnStyle}>
                        {
                            btnData[i].selected ?
                                <Icon name={btnData[i].icon} size={20} color='red'/>
                                :
                                <Icon name={btnData[i].icon} size={20} color='orange'/>
                        }
                        <Text style={styles.btnTextStyle}>{btnData[i].title}</Text>
                        <View style={styles.btnLineStyle} />
                    </View>
                </TouchableOpacity>
            );
        }
        return btnArr;
    }
    render(){
        return(
            <View style={styles.bottomStyle}>
                {this.createBtn()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bottomStyle:{
        height:30,
        flexDirection:'row',
        borderTopWidth:0.5,
        borderTopColor:'#ddd'
    },
    btnStyle:{
        width:width/4,
        height:30,
        flexDirection:'row',
        alignItems :'center',
        justifyContent:'center',
    },
    btnTextStyle:{
        marginLeft:3,
        fontSize:15
    },
    btnLineStyle:{
        position:'absolute',
        right:0,
        top:5,
        width:0.5,
        height:20,
        backgroundColor:'#ddd'
    }
});


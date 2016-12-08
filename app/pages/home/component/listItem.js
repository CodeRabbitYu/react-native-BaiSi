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
    Image,
    TouchableOpacity
} from 'react-native';

let {width, height} = Dimensions.get('window');

import Icon from 'react-native-vector-icons/Ionicons';

export default class listItem extends Component {
    static defaultProps = {
        itemData: {},
    };
    constructor(props){
        super(props);
        this.state = {
            btnData : [
                {'icon':'ios-thumbs-up-outline','title':this.props.itemData.love,'selected':false},
                {'icon':'ios-thumbs-down-outline','title':this.props.itemData.hate,'selected':false},
                {'icon':'ios-open-outline','title':this.props.itemData.repost,'selected':false},
                {'icon':'ios-text-outline','title':this.props.itemData.comment,'selected':false}
            ]
        }
    }

    userInfo(){
        return(
            <View style={styles.userInfoStyle}>
                <Image source={{uri:this.props.itemData.profile_image}} style={styles.iconStyle}/>
                <View style={styles.userDetailStyle}>
                    <Text style={styles.userTextStyle}>{this.props.itemData.name}</Text>
                    <Text style={styles.userTimeStyle}>{this.props.itemData.passtime}</Text>
                </View>
            </View>
        )
    }

    detailInfo(){
        return(
            <View>
                <Text>{this.props.itemData.text}</Text>
            </View>
        )
    }

    btnPress(i){

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
    }

    createBtn(){
        let btnArr = [];
        for(let i = 0 ; i < this.state.btnData.length ; i ++){
            let btnData = this.state.btnData;
            btnArr.push(
                <TouchableOpacity key={i} onPress={()=>{this.btnPress(i)}} >

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

    bottomInfo(){
        return(
            <View style={styles.bottomStyle}>
                {this.createBtn()}
            </View>
        )
    }

    renderItem(){
        return(
            <View>
                {this.userInfo()}
                {this.detailInfo()}
                {this.bottomInfo()}
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderItem()}
                <View style={styles.placeViewStyle} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width:width,
        backgroundColor: 'white',

    },
    placeViewStyle: {
        backgroundColor:'#ddd',
        height:10,

    },
    userInfoStyle:{
      flexDirection:'row',
    },
    iconStyle: {
        width:50,
        height:50,
        borderRadius:25,
        marginTop:5,
        marginLeft:5,
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



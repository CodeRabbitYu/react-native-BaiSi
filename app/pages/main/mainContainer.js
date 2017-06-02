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
    View
} from 'react-native';

import NavBar from 'react-native-navbar';

export default class mainContainer extends Component {
<<<<<<< HEAD
    constructor(props) {
        super(props);
        let nowTime = (new Date()).valueOf();
        this.state = {
            text:React.PropTypes.string,
        };
    }

    componentDidMount(){
        console.log('componentDidMount');
        this.loadData();
    }

    loadData(){
        let config = {
            authDomain: wilddogID + '.wilddog.com',
            syncURL : wilddogUrl,
        };
        wilddog.initializeApp(config);
        let ref = wilddog.sync().ref('/home');
        ref.on("value", (a)=>{
            console.log(a.val().news.text);
            let text = a.val().news.text;

            let realm = new Realm({schema:[DetailInfo]});

            realm.write(()=>{
                let Detail = realm.create('Detail',{text: text,img:'111'});
                // let Sams = realm.objects('Dog');
                // realm.delete(Sams);
            });

            // console.log(realm.objects('Detail'));

            this.setState({
                text: text
            });
        });



        //


        // let dogArr = realm.objects('Dog');
        // for (let i = 0; i< dogArr.length;i ++){
        //     let dogName = dogArr[i];
        //     console.log(dogName.name);
        // }

    }

=======
>>>>>>> origin/master
    render() {
        let titleConfig = {
            title: '我的',
            style: {color:'black',fontSize:20,fontWeight:'600'}
        };
        return (
            <View style={styles.container}>
                <NavBar
                    title={titleConfig}
                    style={{height:44,borderBottomWidth:1,borderBottomColor:'#dddddd'}}
                />
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('BaiSi', () => BaiSi);
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Navigator,
    View
} from 'react-native';

import TabBar from './tabBar';
import Login from '../pages/login/loginContainer';

export default class root extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLogin:false,
        }
    }
    render() {
        return (
            this.state.isLogin ?
                <Login />
                :
            <View style={{ flex: 1 }}>
                <Navigator
                    initialRoute={{ name: 'TabBar', component: TabBar }}
                    configureScene={(route) => {
                        if (route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return Navigator.SceneConfigs.PushFromRight;
                    } }
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component navigator = {navigator} route = {route} {...route.passProps} />
                        )
                    } }
                />
            </View>
        );
    }
};



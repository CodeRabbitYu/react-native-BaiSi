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

export default class root extends Component {
    render() {
        return (
<<<<<<< HEAD
            this.state.isLogin ?
                <Login />
                :
=======
>>>>>>> origin/master
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



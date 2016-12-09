/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from '../pages/home/homeContainer';
import Main from '../pages/main/mainContainer';
import Middle from '../pages/middle/middleContainer';

const tabBarItems = [
    { title: '精华', icon: () =>  <Icon name="ios-home" size={30} color='#333' style={{marginTop:20}}/>,
        selectedIcon: () => <Icon name="ios-home" size={30} color='#d81e06' style={{marginTop:20}}/>
        ,component: Home },
    { title: null, icon: () => <Icon name="md-add-circle" size={48} color='#d81e06' />,
       selectedIcon: () => <Icon name="md-add-circle" size={48} color='#d81e06' />,
        component: Middle },
    // { title: '发现', icon: () => <Icon name="md-paper-plane" size={30} color='#333' style={{marginTop:20}}/>,
    //  selectedIcon: () => <Icon name="md-paper-plane" size={30} color='#d81e06' style={{marginTop:20}}/>,
    // component: Main },
    // { title: '收藏', icon: () => <Icon name="ios-star-outline" size={30} color='#333' style={{marginTop:20}}/>,
    //     selectedIcon: () => <Icon name="md-star" size={30} color='#d81e06' style={{marginTop:20}}/>,
    //     component: Main },
    { title: '我的', icon: () => <Icon name="md-contact" size={30} color='#333' style={{marginTop:20}}/>,
        selectedIcon: () => <Icon name="md-contact" size={30} color='#d81e06' style={{marginTop:20}}/>,
        component: Main },
];

export default class tabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: tabBarItems[0].title,
        };
    }
    render(){
        return(
            <TabNavigator tabBarStyle={{height:49}}>
                {
                    tabBarItems.map((controller,i) => {
                        let Component = controller.component;
                        return(
                            <TabNavigator.Item
                                key={i}
                                selected = {this.state.selectedTab === controller.title}
                                title = {controller.title}
                                renderIcon = {controller.icon}
                                renderSelectedIcon = {controller.selectedIcon}
                                onPress={() => this.setState({selectedTab:controller.title})}
                                titleStyle={{color:'#333',fontSize:12}}
                                selectedTitleStyle={{color:'rgb(251,33,33)'}}
                                allowFontScaling={true}
                            >
                                <Component navigator = {this.props.navigator} {...this.props} />
                            </TabNavigator.Item>
                        )
                    })
                }
            </TabNavigator>
        )
    }
}


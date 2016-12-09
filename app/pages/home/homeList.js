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
    ListView,
    InteractionManager,
    ActivityIndicator,
    RefreshControl
} from 'react-native';

import Config from '../../common/config';
import Request from '../../common/request';

import ListItem from './component/listItem';

import PictureDetail from './detail/pictureDetail';
import SatinDetail from './detail/satinDetail';

let cacheResults = {
    items:[],
    allPage:0,
    maxId:'',
};
export default class homeList extends Component {

    constructor(props){
        super(props);
        let dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
        this.state = {
            dataSource : dataSource,
            isRefreshing : false,
            isLoad: false,
            isLoadingMore:false,
            maxId: '',
        };
        this.renderRow = this.renderRow.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.onEndReached = this.onEndReached.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
    }

    renderFooter(){

        if (!this.isMore()){
            console.log('1');
            return (
                <View style={styles.loadMoreStyle}>
                    <Text style={styles.loadMoreTextStyle} >没有更多数据了</Text>
                </View>
            )
        }

        if (!this.state.isLoadingMore){
            return <View style={styles.loadMoreStyle} />
        }
        return(
            <ActivityIndicator
                style={styles.loadMoreStyle}
            />
        )
    }

    // 服务器有没有更多数据
    isMore(){
        // 全部count等于整体count,那就说明结束了
        return cacheResults.items.count !== 2000;
    }

    // 加载更多数据
    onEndReached(){
        if (!this.isMore() || this.state.isLoadingMore ){
            return;
        }

        console.log(this.state.maxId);
        this.loadData(this.state.maxId);
    }

    // 下拉刷新
    onRefresh(){
        console.log(this.state.maxId);
        this.loadData(0);
    }
    // 跳转页面
    pushPage(rowData){
        let {navigator} = this.props;
        if (navigator) {
            InteractionManager.runAfterInteractions(()=> {
                navigator.push({
                    component: NewsDetail,
                    passProps:{
                        link:rowData.link,
                    }
                })
            });
        }
    }

    componentDidMount() {
        this.loadData(0);
    }

    loadData(maxtime){
        if (maxtime !== 0){
            this.setState({
                isLoadingMore:true
            });
        }else {
            this.setState({
                isRefreshing :true
            });
        }

        Request.get(Config.api.homeList + '&type='+ this.props.type +'&maxtime=' + maxtime ,(data)=>{
            console.log(data);
            let items = cacheResults.items.slice();
            let contentlist = data.list;

            if (maxtime !== 0){
                items = items.concat(contentlist);
                cacheResults.items = items;

            } else {
                items = contentlist;
                cacheResults.items = items;
            }
            cacheResults.allPage = data.info.page;

            this.setState({
                maxId:data.info.maxid
            });

            setTimeout(()=>{
                if (maxtime !== 0){
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(items),
                        isRefreshing:false,
                        isLoad:true,
                        isLoadingMore:false,
                    });
                } else {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(items),
                        isLoad :true,
                        isRefreshing:false,
                        isLoadingMore:false,
                    });
                }
            },0);
        },(error)=>{
            console.log(error);
        });
    }

    satinPress(rowData){
        let {navigator} = this.props;
        if (navigator) {
            InteractionManager.runAfterInteractions(()=> {
                navigator.push({
                    component: SatinDetail,
                    passProps:{
                        pictureData:rowData
                    }
                })
            });
        }
    }

    picturePress(rowData){
        let {navigator} = this.props;
        if (navigator) {
            InteractionManager.runAfterInteractions(()=> {
                navigator.push({
                    component: PictureDetail,
                    passProps:{
                        pictureData:rowData
                    }
                })
            });
        }
    }
    renderRow(rowData){
        return(
            <ListItem itemData={rowData}
                      picturePress={this.picturePress.bind(this,rowData)}
                      satinPress={this.satinPress.bind(this,rowData)}
            />
        )
    }
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.isLoad ?
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                            enableEmptySections={true}
                            onEndReached={this.onEndReached}
                            onEndReachedThreshold={40}
                            renderFooter={this.renderFooter}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={this.onRefresh}
                                />
                            }
                        />
                        :
                        <ActivityIndicator
                            style={styles.loadDataStyle}
                        />
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    loadDataStyle: {
        marginVertical:20
    },
    loadMoreStyle:{
        marginVertical:20
    },
});
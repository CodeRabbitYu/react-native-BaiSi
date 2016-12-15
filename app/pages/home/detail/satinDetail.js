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
    InteractionManager,
    Image,
    Dimensions
} from 'react-native';

let {width, height} = Dimensions.get('window');

import NavBar from 'react-native-navbar';
import LeftNavBtn from '../../../common/leftNavBtn';

export default class satinDetail extends Component {
    popToHome(){
        let {navigator} = this.props;
        if (navigator) {
            InteractionManager.runAfterInteractions(()=> {
                navigator.pop();
            });
        }
    }
    render() {
        let titleConfig = {
            title: '知识详情',
            style: {color: 'black', fontSize: 18, fontWeight: '500'}
        };
        return (
            <View style={styles.container}>
                <NavBar
                    title={titleConfig}
                    style={{height:44,borderBottomWidth:1,borderBottomColor:'#dddddd'}}
                    leftButton={
                        <LeftNavBtn
                            popToHome={()=>this.popToHome()}
                        />
                    }
                />
                <Image source={{uri:'http://img3.gao7.com/files/appleimage/255/255FEB0B-F1D1-4574-BE84-304DDF5703E3.jpg'}} style={{width:width,height:100}} />
                <Text style={styles.welcome}>
                    SQLite，是一款轻型的数据库，是遵守ACID的关系型数据库管理系统，它包含在一个相对小的C库中。它是D.RichardHipp建立的公有领域项目。它的设计目标是嵌入式的，而且目前已经在很多嵌入式产品中使用了它，它占用资源非常的低，在嵌入式设备中，可能只需要几百K的内存就够了。它能够支持Windows/Linux/Unix等等主流的操作系统，同时能够跟很多程序语言相结合，比如 Tcl、C#、PHP、Java等，还有ODBC接口，同样比起Mysql、PostgreSQL这两款开源的世界著名数据库管理系统来讲，它的处理速度比他们都快。SQLite第一个Alpha版本诞生于2000年5月。 至2015年已经有15个年头，SQLite也迎来了一个版本 SQLite 3已经发布。
                </Text>
                <Text>
                    功能特性
                    1. ACID事务[1]
                    2. 零配置 – 无需安装和管理配置
                    3.储存在单一磁盘文件中的一个完整的数据库
                    4.数据库文件可以在不同字节顺序的机器间自由的共享
                    5.支持数据库大小至2TB
                    6. 足够小, 大致13万行C代码, 4.43M
                    7. 比一些流行的数据库在大部分普通数据库操作要快
                    8. 简单, 轻松的API
                    9. 包含TCL绑定, 同时通过Wrapper支持其他语言的绑定
                    10. 良好注释的源代码, 并且有着90%以上的测试覆盖率
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
        fontSize: 16,
        margin: 10,
    },

});

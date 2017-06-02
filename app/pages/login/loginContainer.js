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
    TextInput,
    TouchableOpacity
} from 'react-native';

import NavBar from 'react-native-navbar';

import wilddog from 'wilddog';
import {sha256_digest} from '../../common/sha256';
import Request from '../../common/request';

const APPID = 'wild-ox-7218';

const BASE_URL = 'https://api.wilddog.com/sms/v1/' + APPID;
// 发送验证码短信
const SENDCODE_URL = BASE_URL + '/sendCode';
// 发送通知类短信
const SEND_URL = BASE_URL + '/send';
// 校验验证码
const CHECKCODE_URL = BASE_URL + '/checkCode';
// 查询发送状态
const QUERY_URL = BASE_URL + '/status';
// 验证号码
const templateId = '100000';
// 重置密码
const templateId1 = '10001';

export default class loginContainer extends Component {
    constructor(props) {
        super(props);
        let nowTime = (new Date()).valueOf();
        this.state = {
            phoneText: '',
            isMessage:false,
            text:'',
            codeText:'',
            nowTime:nowTime,
        };
    }

    componentDidMount(){
        console.log('componentDidMount');
        // this.loadData();
    }

    // 获取短信
    loadData(){
        // 第一步，排序
        let signature = 'mobile=13522840224&templateId='+templateId+'&timestamp=' + this.state.nowTime;
        // 第二步 拼接参数
        let param_str = 'mobile=13522840224&templateId='+templateId+'&timestamp='+this.state.nowTime;
        // 第三步 拼接SMS_KEY
        let sign_str = param_str + '&';
        // 第四步 sha256加密
        signature = sha256_digest(sign_str);
        console.log(signature);
        console.log(sign_str);

        let url = SENDCODE_URL + '?signature='+signature+'&mobile=13522840224'+'&templateId='+templateId+'&timestamp='+this.state.nowTime;
        // url = encodeURI(SENDCODE_URL);
        console.log(url);
        Request.post(url,null,(data)=>{
            console.log(data);
        },(error)=>{
            console.log(error);
        })

    }



    submitPress(){
        console.log(this.state.codeText);
        console.log(this.state.nowTime);
        this.setState({
            isMessage:true,
        })
    }

    getCodePress(){
        console.log(this.state.phoneText);
    }

    onPress(){
        alert('11111')
    }
    render(){
        let titleConfig = {
            title: '登录',
            // title:'云知识库',
            style: {color:'red',fontSize:20,fontWeight:'600'}
        };
        return (
            <View style={styles.container}>
                <NavBar
                    title={titleConfig}
                    style={{height:44,borderBottomWidth:1,borderBottomColor:'#dddddd'}}
                />

                {this.state.isMessage ?
                    <View>
                        <CustomTextInput
                            onChangeText={(text) => this.setState({text})}
                            placeholder={'请输入密码'}
                            value={this.state.text}
                            autoCorrect={false}
                            style={styles.textInputStyle}
                        />
                        <TouchableOpacity onPress={()=>this.submitPress()} style={styles.submitButtonStyle}>
                            <Text style={styles.codeTextStyle}>提交</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View>
                        <CustomTextInput
                            onChangeText={(phoneText) => this.setState({phoneText})}
                            placeholder={'请输入手机号'}
                            value={this.state.phoneText}
                            autoCorrect={false}
                            style={styles.textInputStyle}

                        />
                        <View style={{flexDirection:'row'}}>
                            <CustomTextInput
                                onChangeText={(codeText) => this.setState({codeText})}
                                placeholder={'请输入验证码'}
                                value={this.state.codeText}
                                autoCorrect={false}
                                style={styles.codeInputStyle}
                            />
                            <TouchableOpacity onPress={()=>this.getCodePress()} style={styles.codeButtonStyle}>
                                <Text style={styles.codeTextStyle}>获取验证码</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={()=>this.submitPress()} style={styles.submitButtonStyle}>
                            <Text style={styles.codeTextStyle}>提交</Text>
                        </TouchableOpacity>
                    </View>
                }

            </View>
        )
    }
}

class CustomTextInput extends Component{
    render(){
        return(
            <View>
                <TextInput
                    {...this.props}
                    autoCorrect={false}
                    clearButtonMode={'always'}
                    underlineColorAndroid={'transparent'}
                />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textInputStyle:{
        marginTop:20,
        height: 40,
        borderColor: 'gray',
        borderWidth:1,
        marginLeft:10,
        marginRight:10,
        paddingLeft:5,
        borderRadius:10
    },
    codeButtonStyle:{
        marginTop:20,
        marginLeft:5,
        height:40,
        backgroundColor:'orange',

        justifyContent:'center',
        alignItems: 'center',
        borderRadius:10
    },
    codeTextStyle:{
        fontSize:16,
        paddingLeft:5,
        paddingRight:5
    },
    codeInputStyle:{
        width:260,
        height:40,
        borderRadius:10,
        marginTop:20,
        borderColor: 'gray',
        borderWidth:1,
        marginLeft:10,
        paddingLeft:5
    },
    submitButtonStyle:{
        marginTop:20,
        marginLeft:10,
        marginRight:10,
        height:40,
        backgroundColor:'red',
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:10
    }
});




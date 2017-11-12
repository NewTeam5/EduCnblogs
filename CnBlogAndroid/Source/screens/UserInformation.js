import Config from '../config';
import api from '../api/api.js';
import {authData,StorageKey} from '../config'
import * as Service from '../request/request.js'
import MyAdapter from './MyAdapter.js';
import React, { Component} from 'react';
//关于cookie包的配置方法，请看https://github.com/joeferraro/react-native-cookies
import CookieManager from 'react-native-cookies'
import * as storage from '../Storage/storage.js'
import {
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    Button,
    TouchableHighlight
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,
    NavigationActions
} from 'react-navigation';
const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;
const titleFontSize= MyAdapter.titleFontSize;
const abstractFontSize= MyAdapter.abstractFontSize;
const informationFontSize= MyAdapter.informationFontSize;
const btnFontSize= MyAdapter.btnFontSize;   

export default class UserInformation extends Component{
    constructor(props){
        super(props);
        this.state={
            faceurl:'',
            DisplayName: '',
            BlogApp: '',
            Seniority: ''
        }
    }
    _logout=()=>{
		storage.removeItem(StorageKey.USER_TOKEN).then((res)=>{
			CookieManager.clearAll()
			.then((res)=>{
//                this.props.navigation.navigate('Loginer');
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Loginer'}),
                    ]
                });
                this.props.navigation.dispatch(resetAction);
			})
		})
    }
    _isMounted;
    componentWillUnmount=()=>{
        this._isMounted=false;
    }
	componentWillMount=()=>{
        this._isMounted=true;
        let user_url = Config.apiDomain + api.user.info;
		Service.Get(user_url)
		.then((jsonData)=>{
			global.user_information = {
				userId : jsonData.UserId,
				SpaceUserId : jsonData.SpaceUserId,
				BlogId : jsonData.BlogId,
				DisplayName : jsonData.DisplayName,
				face : jsonData.Face,
				Seniority : jsonData.Seniority,  //园龄
				BlogApp : jsonData.BlogApp
            }
        }).then(()=>{
            if(this._isMounted){
            this.setState({
                faceurl: global.user_information.face,
                DisplayName: global.user_information.DisplayName,
                BlogApp: global.user_information.BlogApp,
                Seniority: global.user_information.Seniority,
            })}
        }).catch((error)=>{ToastAndroid.show("网络请求失败，请检查连接状态！",ToastAndroid.SHORT)})
    }
    render() {
    return (
        <View
            style= {{
                flexDirection: 'column',
                flex: 1,
            }}
        >
            <View style= {{        
                flexDirection: 'row',  
                justifyContent:'flex-start',
                alignItems: 'center',  
                marginBottom: 0.03*screenHeight,
                backgroundColor: '#1C86EE',
                height: screenHeight/12,
                paddingLeft: 0.05*screenWidth,
            }}>
                <Text style = {{fontSize: 18, fontWeight: 'bold', color:'white'}}>个人信息</Text>
            </View>
            <View style= {{        
                flexDirection: 'row',  
                justifyContent:'flex-start',
                alignItems: 'center',  
                marginBottom: 0.05*screenHeight,
                backgroundColor: 'white',
                height: 0.15*screenHeight,
                paddingLeft: 0.05*screenWidth,
            }}
            >
                <Image
                    style= {{
                        width: 0.1*screenHeight,
                        height: 0.1*screenHeight,
                    }}
                    source={{uri: this.state.faceurl?this.state.faceurl:'../images/defaultface.png'}}
                />
                <View style = {{justifyContent: 'center',paddingLeft: 0.05*screenWidth,}}>
                <Text style = {{fontSize: 18, fontWeight: 'bold', color:'rgb(51,51,51)'}}>用户昵称:</Text>
                <Text style = {{fontSize: 15}}>{this.state.DisplayName}</Text>
                </View>
            </View>
            <View style = {{
                justifyContent:'center',
                alignItems: 'flex-start',
                height: 0.1*screenHeight,
                marginBottom: 0.05*screenHeight,
                backgroundColor: 'white',
                paddingLeft: 0.05*screenWidth,
            }}>
                <Text style = {{fontSize: 18, fontWeight: 'bold', color:'rgb(51,51,51)'}}>博客地址:</Text>
                <Text style = {{fontSize: 15}}>https://www.cnblogs.com/{this.state.BlogApp}/</Text>
            </View>
            <View style = {{
                justifyContent:'center',
                alignItems: 'flex-start',
                height: 0.1*screenHeight,
                marginBottom: 0.05*screenHeight,
                backgroundColor: 'white',
                paddingLeft: 0.05*screenWidth,
            }}>
                <Text style = {{fontSize: 18, fontWeight: 'bold', color:'rgb(51,51,51)'}}>园龄:</Text>
                <Text style = {{fontSize: 15}}>{this.state.Seniority}</Text>
            </View>
            <TouchableHighlight 
                underlayColor="white"
                activeOpacity={0.5}
                onPress={()=>{this.props.navigation.navigate('AppInformation');}}//关联函数
                style = {{
                    justifyContent:'center',
                    alignItems: 'flex-start',
                    height: 0.07*screenHeight,
                    marginBottom: 0.05*screenHeight,
                    backgroundColor: 'white',
                    paddingLeft: 0.05*screenWidth,
            }}>
                <Text style = {{fontSize: 18, fontWeight: 'bold', color:'rgb(51,51,51)'}}>关于App</Text>
            </TouchableHighlight>
            <TouchableOpacity style = {{
                justifyContent:'center',
                alignItems: 'flex-start',
                height: 0.07*screenHeight,
                backgroundColor: 'rgb(204,255,255)',
                paddingLeft: 0.05*screenWidth,
            }}
                onPress = {this._logout.bind(this)}
            >
                <Text style = {{fontSize: 18, fontWeight: 'bold', color:'rgb(51,51,51)'}}>退出登录</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});
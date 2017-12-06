import Config from '../config';
import api from '../api/api.js';
import {authData,err_info} from '../config'
import * as Service from '../request/request.js'
import MyAdapter from './MyAdapter.js';
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    AppRegistry,
    TouchableOpacity,
    FlatList,
    Dimensions,
    WebView,
    Image,
    Alert
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
const { height, width } = Dimensions.get('window');
const head = '<!DOCTYPE html><head>'+
'<meta charset="utf-8"/>'+
'<meta name="viewport" content="width=device-width, initial-scale=1" />'+
'<link type="text/css" rel="stylesheet" href="/bundles/blog-common.css?v=ChDk9h03-S75WEqNhGvXkWireJ5cCWdK1xRM9NIXfnM1"/>'+
'<link id="mobile-style" media="only screen and (max-width: 768px)" type="text/css" rel="stylesheet"'+
'href="https://www.cnblogs.com/skins/UnlimitedSunlight/bundle-UnlimitedSunlight-mobile.css"/>'+
'<link type="text/css" rel="stylesheet" href="/bundles/blog-common.css?v=ChDk9h03-S75WEqNhGvXkWireJ5cCWdK1xRM9NIXfnM1"/>'+
'<style type="text/css"> * {word-wrap:break-word; word-break:break-all;}</style>'+
'<script src="//common.cnblogs.com/script/jquery.js" type="text/javascript"></script>'+
'<script src="/bundles/blog-common.js?v=hm0KZwWzsEv1qy3Vf9Vq9zW3uMF7kiGWJjjCrkS4nJY1" type="text/javascript"></script>'+
'</head>';
const tail = '</head>';
// 传入博客Id和blogApp和CommentCount作为参数
export default class BlogDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            content: '',
            isRequestSuccess: false,
        }
    }
    _isMounted;
    componentWillMount = ()=>{
        this._isMounted=true;
        //let contenturl = 'https://api.cnblogs.com/api/blogposts/'+this.props.navigation.state.params.Id+'/body';
		let contenturl = Config.BlogDetail+this.props.navigation.state.params.Id+'/body';
        Service.Get(contenturl).then((jsonData)=>{
            if(jsonData!=='rejected'){
                this.setState({
                    isRequestSuccess: true,
                })
                if(this._isMounted){
                    this.setState({
                        content: jsonData,
                    })
                }
            }
            else{
                ToastAndroid.show("网络异常！请稍后重试！",ToastAndroid.SHORT);
            }
        }).catch((error) => {
            ToastAndroid.show(err_info.NO_INTERNET,ToastAndroid.SHORT);
        });
    }
    componentWillUnmount = ()=>{
        this._isMounted=false;
    }
    _onPress = ()=>{
        this.props.navigation.navigate('BlogComment',{
            blogApp: this.props.navigation.state.params.blogApp,
            CommentCount: this.props.navigation.state.params.CommentCount+100,
            Id: this.props.navigation.state.params.Id,
        });
    }
    render(){
        return(
            this.state.isRequestSuccess===false?null:
            <View style = {styles.container}>
                <WebView
                    source={{html: head+this.state.content+tail, baseUrl: this.props.navigation.state.params.Url}}
                    //source = {{uri: this.props.navigation.state.params.Url}}
                    style={{height: height-70, width: width}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    scalesPageToFit={true}
                    onError = {()=>Alert.alert('网络异常，请稍后再试！')}
                />
                <View style = {{height: 1, backgroundColor: 'rgb(204,204,204)', width: width}}/>
                <View style = {styles.bottom}>
                    <TouchableOpacity style = {styles.touchbutton} onPress = {this._onPress}>
                        <Image source = {require('../images/comment.png')} style = {styles.imagestyle} accessibilityLabel = 'BlogDetail_commentImage'/>
                        {/*<Text style = {{fontSize: 12}}>{this.props.navigation.state.params.CommentCount}</Text>*/}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        flex:1,
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: height/14,
        width: width,
        backgroundColor: 'white'
    },
    touchbutton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: height/14,
        height: height/14,
    },
    imagestyle: {
        width: height/18,
        height: height/22,
        resizeMode: 'stretch',
    }
})
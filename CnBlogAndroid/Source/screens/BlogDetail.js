import Config from '../config';
import api from '../api/api.js';
import {authData} from '../config'
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
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
const { height, width } = Dimensions.get('window');
const head = '<!DOCTYPE html><head>'+
'<meta charset="utf-8"/>'+
'<meta name="viewport" content="width=device-width, initial-scale=1" />'+
'<link type="text/css" rel="stylesheet" href="/bundles/blog-common.css?v=ChDk9h03-S75WEqNhGvXkWireJ5cCWdK1xRM9NIXfnM1"/>'+
'<link id="MainCss" type="text/css" rel="stylesheet" href="/skins/AnotherEon001/bundle-AnotherEon001.css?v=dNz80TfH9-81kuLR86t4JWgT2tb_J0B779DQM4kw0WU1"/>'+
'<link id="mobile-style" media="only screen and (max-width: 768px)" type="text/css" rel="stylesheet"'+
'href="https://www.cnblogs.com/skins/UnlimitedSunlight/bundle-UnlimitedSunlight-mobile.css"/>'+
'<script src="//common.cnblogs.com/script/jquery.js" type="text/javascript"></script>'+
'<script src="/bundles/blog-common.js?v=hm0KZwWzsEv1qy3Vf9Vq9zW3uMF7kiGWJjjCrkS4nJY1" type="text/javascript"></script>'+
'</head>';
// 传入博客Id和blogApp和CommentCount作为参数
export default class BlogDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            content: '',
        }
    }
    componentDidMount = ()=>{
        let contenturl = 'https://api.cnblogs.com/api/blogposts/'+this.props.navigation.state.params.Id+'/body';
        Service.Get(contenturl).then((jsonData)=>{
            this.setState({
                content: jsonData,
            })
        })
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
            <View style = {styles.container}>
                <WebView
                    source={{html: head + this.state.content}}
                    style={{height: height-70, width: width}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    scalesPageToFit={true}
                />
                <View style = {{height: 1, backgroundColor: 'rgb(204,204,204)', width: width}}/>
                <View style = {styles.bottom}>
                    <TouchableOpacity style = {styles.touchbutton} onPress = {this._onPress}>
                        <Image source = {require('../images/comment.png')} style = {styles.imagestyle} accessibilityLabel = 'BlogDetail_commentImage'/>
                        <Text style = {{fontSize: 12}}>{this.props.navigation.state.params.CommentCount}</Text>
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
        height: height/13,
        width: width,
        backgroundColor: 'white'
    },
    touchbutton: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        width: height/13,
        height: height/13,
    },
    imagestyle: {
        width: height/13-10,
        height: height/13-18,
        resizeMode: 'stretch',
    }
})
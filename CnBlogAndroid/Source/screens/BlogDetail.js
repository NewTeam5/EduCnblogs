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
        if(this.props.navigation.state.params.CommentCount===0)
        {
            ToastAndroid.show("没有评论哦",ToastAndroid.SHORT);
        }
        else
        {
            this.props.navigation.navigate('BlogComment',{
                blogApp: this.props.navigation.state.params.blogApp,
                CommentCount: this.props.navigation.state.params.CommentCount,
                Id: this.props.navigation.state.params.Id,
            });
        }
    }
    render(){
        return(
            <View style = {styles.container}>
                <WebView
                    source={{html: this.state.content}}
                    style={{height: height-70, width: width}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    scalesPageToFit={true}
                />
                <View style = {{height: 1, backgroundColor: 'rgb(204,204,204)', width: width}}/>
                <View style = {styles.bottom}>
                    <TouchableOpacity style = {styles.touchbutton} onPress = {this._onPress}>
                        <Image source = {require('../images/comment.png')} style = {styles.imagestyle}/>
                        <Text style = {{fontSize: 10}}>{this.props.navigation.state.params.CommentCount}</Text>
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
        height: 35,
        width: width,
        backgroundColor: 'white'
    },
    touchbutton: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        width: 50,
        height: 35,
    },
    imagestyle: {
        width: 30,
        height: 20,
        resizeMode: 'stretch',
    }
})
import Config from '../config';
import api from '../api/api.js';
import {authData,err_info,StorageKey} from '../config'
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
import { Icon, Fab } from 'native-base';
const { height, width } = Dimensions.get('window');
const ContentHandler = require('../DataHandler/BlogDetail/ContentHandler');
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
        }).then(()=>{
			global.storage.save({key:StorageKey.BLOGDETAIL+this.props.navigation.state.params.Id,data:this.state.content})
			.catch((err)=>{
				ToastAndroid.show("error",ToastAndroid.SHORT);
			})
		})
		.catch((error) => {
            ToastAndroid.show(err_info.NO_INTERNET,ToastAndroid.SHORT);
			global.storage.load({key:StorageKey.BLOGDETAIL+this.props.navigation.state.params.Id})
			.then((ret)=>{
				this.setState({
					content: ret,
				})
			})
			.catch((err)=>{
				ToastAndroid.show(err_info.TIME_OUT,ToastAndroid.SHORT)
			})
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
        let content = ContentHandler(this.state);
        return(
            //this.state.isRequestSuccess===false?null:
            <View style = {styles.container}>
                <View
                    style= {{
                        alignSelf: 'stretch',
                        flex:1,
                    }}
                >
                <WebView
                    source={{html: content, baseUrl: this.props.navigation.state.params.Url}}
                    //source = {{uri: this.props.navigation.state.params.Url}}
                    style={{height: height-70}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    scalesPageToFit={true}
                    onError = {()=>Alert.alert('网络异常，请稍后再试！')}
                />
                </View>
                <View style = {{height: 1, backgroundColor: 'rgb(204,204,204)', alignSelf:'stretch'}}/>
                <View style = {styles.bottom}>
                    <TouchableOpacity style = {styles.touchbutton} onPress = {this._onPress}>
                        <Image source = {require('../images/comment.png')} style = {styles.imagestyle} 
                        accessibilityLabel = 'BlogDetail_commentImage'/>
                        
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
        alignSelf: 'stretch',
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
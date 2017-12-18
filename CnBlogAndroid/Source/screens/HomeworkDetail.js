import Config from '../config';
import api from '../api/api.js';
import {authData,err_info,StorageKey} from '../config';
import * as Service from '../request/request.js';
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    TouchableOpacity,
    Dimensions,
    WebView,
    Alert,
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
const { height, width } = Dimensions.get('window');
const head = '<!DOCTYPE html><html><head>'+
'<meta charset="utf-8"/>'+
'<meta name="viewport" content="width=device-width, initial-scale=1" />'+
'<style type="text/css">  * {word-wrap:break-word; word-break:break-all;}</style>'+
'</head>';
const tail = '</html>';
HtmlDecode = (str)=>{
    if(str == null) return '';
    var s = "";
    if(str.length == 0) return "";
    s = str.replace(/&amp;/g,"&");
    s = s.replace(/&lt;/g,"<");
    s = s.replace(/&gt;/g,">");
    s = s.replace(/&nbsp;/g," ");
    s = s.replace(/&#39;/g,"\'");
    s = s.replace(/&quot;/g,"\"");
    return s;
}
export default class HomeWorkDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            content: '',
            convertedContent: '',
            title: '',
            formatTyle: 1,
            answerCount: 0,
        }
    }
    _isMounted;
    componentWillUnmount = ()=>{
        this._isMounted = false;
    };
    componentWillMount = ()=>{
        this._isMounted = true;
        let {Id, classId} = this.props.navigation.state.params;
		let url = Config.HomeWorkDetail + Id;
        Service.Get(url).then((jsonData)=>{
            if(jsonData !== 'rejected' && this._isMounted)
            {
                this.setState({
                    content: jsonData.content,
                    convertedContent: jsonData.convertedContent,
                    title: jsonData.title,
					formatTyle: jsonData.formatTyle,
                    answerCount: jsonData.answerCount,
                })
            }
        })
		.then(()=>{
			global.storage.save({key : StorageKey.HOMEWORKDETAIL+Id,data : this.state});
		})
		.catch((err)=>{
			ToastAndroid.show(err_info.NO_INTERNET, ToastAndroid.SHORT);
			global.storage.load({key:StorageKey.HOMEWORKDETAIL+Id})
			.then((ret)=>{
				this.setState({
                    content: ret.content,
                    convertedContent: ret.convertedContent,
                    title: ret.title,
					formatTyle: ret.formatTyle,
                    answerCount: ret.answerCount,
                })
			})
		})
    }
	
    render(){
        let {url, Id, classId, isFinished} = this.props.navigation.state.params;
        let {content, convertedContent, title, formatTyle, answerCount} = this.state;
        return(
            <View style = {styles.container}>
                <View
                    style= {{
                        alignSelf: 'stretch',
                        flex:1,
                    }}
                >
                <WebView
                    source={{html: head + (convertedContent==null?HtmlDecode(content):HtmlDecode(convertedContent)) + tail, baseUrl: ''}}
                    style={{height: height-40}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    scalesPageToFit={true}
                    onError = {()=>Alert.alert('网络异常，请稍后再试！')}
                />
                </View>
                <View style = {{height: 1, backgroundColor: 'rgb(204,204,204)', alignSelf:'stretch'}}/>
                <View style = {styles.bottom}>
                    <TouchableOpacity
                    onPress = {()=>this.props.navigation.navigate('Submitted',{Id: Id})}
                    style = {styles.button}
                    >
                        <Text style = {{fontSize: 15, textAlign: 'center', color: 'white'}}>
                            已提交列表({answerCount}人)
                        </Text>
                    </TouchableOpacity>
                    <View style = {{backgroundColor: 'white', width: width/6}}/>
                    <TouchableOpacity
                    onPress = {isFinished == true ? ()=>ToastAndroid.show("此作业已经结束！", ToastAndroid.SHORT) : 
                            ()=>this.props.navigation.navigate('HomeworkSubmit',{homeworkId: Id, classId: classId})}
                    style = {styles.button}
                    >
                        <Text style = {{fontSize: 15, textAlign: 'center', color: 'white'}}>
                            选择并提交作业
                        </Text>
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
        justifyContent: 'center',
        alignItems: 'center',
        height: height/16,
        alignSelf: 'stretch',
        backgroundColor: 'white'
    },
    button:{
        width: width/2.8,
        height: height/18,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0588fe',
        borderRadius: 8,
    }
})
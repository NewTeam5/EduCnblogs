import Config from '../config';
import api from '../api/api.js';
import {authData} from '../config';
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
HtmlDecode = (str)=>{
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
        let url = 'https://api.cnblogs.com/api/edu/homework/'+Id;
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
            else{
                ToastAndroid.show("网络请求失败，请检查连接状态！", ToastAndroid.SHORT);
            }
        })
    }
    render(){
        let {url, Id, classId} = this.props.navigation.state.params;
        let {content, convertedContent, title, formatTyle, answerCount} = this.state;
        return(
            <View style = {styles.container}>
                {<WebView
                    source={{html: formatTyle===1?content:HtmlDecode(convertedContent),
                        baseUrl: 'https://edu.cnblogs.com'+url}}
                    style={{height: height-40, width: width}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    scalesPageToFit={true}
                    onError = {()=>Alert.alert('网络异常，请稍后再试！')}
                />}
                <View style = {{height: 1, backgroundColor: 'rgb(204,204,204)', width: width}}/>
                <View style = {styles.bottom}>
                    <TouchableOpacity
                    onPress = {()=>this.props.navigation.navigate('Submitted',{Id: Id})}
                    style = {styles.button}
                    >
                        <Text style = {{fontSize: 18, textAlign: 'center'}}>
                            已提交({answerCount}人)列表
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
    },
    bottom: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: height/16,
        width: width,
        backgroundColor: 'white'
    },
    button:{
        width: width,
        height: height/16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(51,204,255)'
    }
})
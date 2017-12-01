import Config from '../config';
import api from '../api/api.js';
import {authData} from '../config';
import * as Service from '../request/request.js';
import MyAdapter from './MyAdapter.js';
import React, { Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';
import { String } from 'core-js/library/web/timers';

const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;

export default class HomeworkSubmit extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageSize: 0,
            postCount: 0,
            blogs: []
        }
    }
    _isMounted;
    componentWillUnmount= () => {
        this._isMounted = false;
    }
    componentDidMount = () => {
        this._isMounted = true;
        let blogApp = global.user_information.BlogApp;
        let url = Config.apiDomain+'api/blogs/'+blogApp;
        Service.Get(url)
        .then((jsonData)=>{
            if(this._isMounted)
            {
                this.setState({
                    pageSize: jsonData.pageSize,
                    postCount: jsonData.postCount,
                });
            }
        })
        .then(()=>{
            let {pageSize, postCount} = this.state;
            let pageCount  = Math.ceil(postCount/pageSize);
            var pageIndexes = [];
            for(var pageIndex = 1; pageIndex <= pageCount; pageIndex++)
            {
                pageIndexes.push(pageIndex);
            }
            return promises = pageIndexes.map((pageIndex)=>{
                return Service.Get(Config.apiDomain+'api/blogs/'+blogApp+'/posts?pageIndex='+pageIndex)
            })
        })
        .then((promises)=>{
            Promise.all(promises).then((posts)=>{
                for(var i in posts)
                {
                    if(this._isMounted)
                    {
                        this.setState({
                            blogs: this.state.blogs.concat(posts[i]),
                        })
                    }
                }
            })
        })
        .catch((error) => {
            ToastAndroid.show("网络请求失败，请检查连接状态！",ToastAndroid.SHORT);
        })
    }
    onSubmit = (postId, title, url, homeworkId, classId)=>{
        let submitUrl = 'https://api.cnblogs.com/api/edu/answer/commit';
        let postBody = {
            schoolClassId: Number(classId),
            homeworkId: Number(homeworkId),
            title: title,
            url: url,
            postId: Number(postId),
            remark: '',
        };
        let body = JSON.stringify(postBody);
        Alert.alert(
            '请确认您要提交的博文为：',
            title,
            [
                {text: '取消'},
                {text: '确认提交', onPress: ()=>{
                    ToastAndroid.show(submitUrl, ToastAndroid.SHORT);
                    ToastAndroid.show(body, ToastAndroid.SHORT);
                    Service.UserAction(submitUrl, body, 'POST')
                    .then((response)=>{
                        ToastAndroid.show(response.status.toString(), ToastAndroid.SHORT);
                        if(response.status !== 200)
                            return null;
                        else
                            return response.json();
                    })
                    .then((jsonData)=>{
                        if(jsonData==null)
                            ToastAndroid.show("请求失败！",ToastAndroid.SHORT);
                        else if(jsonData.isSuccess)
                        {
                            ToastAndroid.show('添加成功，请刷新查看！',ToastAndroid.SHORT);
                            this.props.navigation.goBack();
                        }
                        else if(jsonData.isWarning)
                            ToastAndroid.show(jsonData.message,ToastAndroid.SHORT);
                        else
                            ToastAndroid.show('发生错误，请稍后重试！',ToastAndroid.SHORT);
                    }).catch((error)=>{ToastAndroid.show("网络请求失败，请检查连接状态！",ToastAndroid.SHORT)})
                }},
            ]
        )
    }
    _renderItem = (item) => {
        let {postId, title, url} = item.item;
        let {homeworkId, classId} = this.props.navigation.state.params;
        return (
            <View>
            <TouchableOpacity
                style = {styles.listcontainer}
                onPress = {()=>this.onSubmit(postId, title, url, homeworkId, classId)}
            >
                <Text style = {{
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginTop: 10,
                    marginBottom: 10,
                    textAlign: 'left',
                    color: 'black',
                    fontFamily : 'serif',
                }}>
                    {title}
                </Text>
            </TouchableOpacity>
            </View>
        )
    }
    _separator = () => {
        return (
            <View style={{ height: 1, backgroundColor: 'rgb(200,200,200)'}}/>
        );
    }
    render(){
        var data = [];
        for(var i in this.state.blogs)
        {
            data.push({
                key: i,
                postId: this.state.blogs[i].Id,
                title: this.state.blogs[i].Title,
                url: this.state.blogs[i].Url,
            })
        }
        return(
            <View style = {styles.container}>
                <View style = {styles.content}>
                    <FlatList
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        data={data}
                        refreshing= {false}
                        ListFooterComponent={this._separator}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    content: {
        flex: 11,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: screenWidth,
    },
    listcontainer: {
        justifyContent:'flex-start',
        alignItems: 'flex-start',
        flex:1,
        width: screenWidth,
        backgroundColor: 'white',
        paddingLeft: 0.03*screenWidth,
        paddingRight: 0.04*screenWidth,
    }
});
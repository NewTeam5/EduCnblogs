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
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;
// 接受博客Id作为参数
export default class MemberBlog extends Component{
    constructor(props){
        super(props);
        this.state = {
            blogs: [],//博客随笔信息列表
            blogTitle: '',//博客标题
            pageSize: 0,//博客页容量
            postCount: 0,//随笔总数
        };
    }
    _isMounted;
    UpdateData = ()=>{
        this.setState({
            blogs: [],//博客随笔信息列表
            blogTitle: '',//博客标题
            pageSize: 0,//博客页容量
            postCount: 0,//随笔总数
        });
        this.componentWillMount();
    }
    componentWillMount=()=>{
        this._isMounted=true;
        let blogUrl = this.props.navigation.state.params.blogUrl;
        let blogId = this.props.navigation.state.params.blogId;
        let blogApp = blogUrl.split('/')[3];
        let url = Config.apiDomain+'api/blogs/'+blogApp;
        Service.Get(url)
        .then((jsonData)=>{
            if(this._isMounted){
                this.setState({
                    blogTitle: jsonData.title,
                    pageSize: jsonData.pageSize,
                    postCount: jsonData.postCount,
                });
            }
        })
        // 然后利用获取到的博客文章数量获取文章列表，因为获取方式是分页的
        .then(()=>{
            // 计算页数
            let {pageSize, postCount} = this.state;
            let pageCount  = Math.ceil(postCount/pageSize);
            var pageIndexes = [];
            for(var pageIndex = 1; pageIndex <= pageCount; pageIndex++)
            {
                pageIndexes.push(pageIndex);
            }
            // 这里需要使用promise数组保证获取内容的顺序(不可在for循环中进行异步操作，顺序会乱)
            return promises = pageIndexes.map((pageIndex)=>{
                return Service.Get(Config.apiDomain+'api/blogs/'+blogApp+'/posts?pageIndex='+pageIndex)
            })
        })
        // 使用promise.all按顺序获取数组中的信息
        .then((promises)=>{
            Promise.all(promises).then((posts)=>{
                for(var i in posts)
                {
                    if(this._isMounted){
                        this.setState({
                            blogs: this.state.blogs.concat(posts[i]),
                        })
                    }
                }
            })
        }).catch((error)=>{ToastAndroid.show(err_info.NO_INTERNET,ToastAndroid.SHORT)})
    }
    componentWillUnmount=()=>{
        this._isMounted=false;
    }
    _separator = () => {
        return (
            <View style={{ height: 9.75, justifyContent: 'center'}}>
            <View style={{ height: 0.75, backgroundColor: 'rgb(100,100,100)'}}/>
            <View style={{ height: 9, backgroundColor: 'rgb(235,235,235)'}}/>
            </View>
        );
    }
    _renderItem = (item)=>{
        let item1 = item;
        var Title = item1.item.Title;
        var Url = item1.item.Url;
        var Description = item1.item.Description;
        var PostDate = item1.item.PostDate;
        var ViewCount = item1.item.ViewCount;
        var CommentCount = item1.item.CommentCount;
        var Id = item1.item.key;
        let arr = Url.split('/');
        let blogApp = arr[3];
        return(
            <View>
                <TouchableOpacity 
                    style = {styles.listcontainer}
                    onPress = {()=>{
                        this.props.navigation.navigate('BlogDetail',{Url: Url, Id:Id, blogApp: blogApp, CommentCount: CommentCount})}
                    }
                >  
                    <Text style = {{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginTop: 10,
                        marginBottom: 2,
                        textAlign: 'left',
                        color: 'black',
                        fontFamily : 'serif',
                    }}>
                        {Title}
                    </Text>
                    <Text  numberOfLines={3} style = {{lineHeight: 25,fontSize: 14, marginBottom: 8, textAlign: 'left', color:'rgb(70,70,70)'}}>
                        {Description+'...'}
                    </Text>
                    <View style = {{
                        flexDirection: 'row',
                        marginBottom: 8,
                        justifyContent: 'space-around',
                        alignItems: 'flex-start'
                    }}>
                        <Text style = {{fontSize: 10, textAlign: 'left', color: 'black', flex: 1}}>
                            {ViewCount+' 阅读'+'  '+CommentCount+' 评论'}
                        </Text>
                        <Text style = {{fontSize: 10, textAlign: 'right', color: 'black', flex: 1}}>
                            {'发布于: '+PostDate.split('T')[0]+' '+PostDate.split('T')[1]}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };
    render(){
        var data = [];
        for (var i in this.state.blogs)
        {
            data.push({
                key: this.state.blogs[i].Id,
                Title: this.state.blogs[i].Title,
                Url: this.state.blogs[i].Url,
                Description: this.state.blogs[i].Description,
                PostDate: this.state.blogs[i].PostDate,
                ViewCount: this.state.blogs[i].ViewCount,
                CommentCount: this.state.blogs[i].CommentCount,
            })
        }
        return(
            <View style = {styles.container}>
                <View style = {styles.content}>
                    <FlatList
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        data={data}
                        onRefresh = {this.UpdateData}
                        refreshing= {false}
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        alignSelf: 'stretch',
    },
    listcontainer: {
        justifyContent:'flex-start',
        alignItems: 'flex-start',
        flex:1,
        backgroundColor: 'white',
        alignSelf: 'stretch',
        paddingLeft: 0.03*screenWidth,
        paddingRight: 0.04*screenWidth,
    }
});
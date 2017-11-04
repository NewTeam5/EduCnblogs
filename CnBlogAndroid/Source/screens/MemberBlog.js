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
            blogs: [],
        };
    }
    componentDidMount=()=>{
        let url = 'https://api.cnblogs.com/api/edu/answer/posts/'+this.props.navigation.state.params.blogId;
        Service.Get(url).then((jsonData)=>{
            this.setState({
                blogs: jsonData,
            });
        });
    }
    _separator = () => {
        return (
            <View style={{ height: 7, justifyContent: 'center'}}>
            <View style={{ height: 0.75, backgroundColor: 'rgb(100,100,100)' ,marginTop:0.25}}/>
            <View style={{ height: 5, backgroundColor: 'rgb(235,235,235)'}}/>
            <View style={{ height: 0.75, backgroundColor: 'rgb(180,180,180)',marginBottom:0.25}}/>
            </View>
        );
    }
    _renderItem = (item)=>{
        let item1 = item;
        var Title = item1.item.title;
        var Url = item1.item.url;
        var Description = item1.item.description;
        var PostDate = item1.item.dateAdded;
        var ViewCount = item1.item.viewCount;
        var CommentCount = item1.item.commentCount;
        var Id = item1.item.key;
        let arr = Url.split('/');
        let blogApp = arr[3];
        return(
            <View>
                <TouchableOpacity 
                    style = {styles.listcontainer}
                    onPress = {()=>{
                        ToastAndroid.show(blogApp,ToastAndroid.SHORT);
                        this.props.navigation.navigate('BlogDetail',{Id:Id, blogApp: blogApp, CommentCount: CommentCount})}
                    }
                >  
                    <Text style = {{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginTop: 3,
                        marginBottom: 3,
                        textAlign: 'left',
                        color: 'black'
                    }}>
                        {Title}
                    </Text>
                    <Text  numberOfLines={3} style = {{fontSize: 14, marginBottom: 3, textAlign: 'left', color:'rgb(70,70,70)'}}>
                        {Description+'...'}
                    </Text>
                    <View style = {{
                        flexDirection: 'row',
                        marginBottom: 3,
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
                key: this.state.blogs[i].id,
                title: this.state.blogs[i].title,
                url: this.state.blogs[i].url,
                description: this.state.blogs[i].description,
                dateAdded: this.state.blogs[i].dateAdded,
                viewCount: this.state.blogs[i].viewCount,
                commentCount: this.state.blogs[i].commentCount,
            })
        }
        return(
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <Text style = {styles.headertext}>{this.state.blogTitle}</Text>
                </View>
                <View style = {styles.content}>
                    <FlatList
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        data={data}
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
        backgroundColor: 'white',
        marginLeft: 8,
        marginRight: 12,
    }
});
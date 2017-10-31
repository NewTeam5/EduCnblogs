import Config from '../config';
import api from '../api/api.js';
import {authData} from '../config'
import * as Service from '../request/request.js'
import MyAdapter from './MyAdapter.js';
import React, { Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    FlatList,
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';
const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;
// 博客评论页面
// 接受评论数量 CommentCount 和 博客名 blogApp 以及博文Id作为参数
export default class BlogComment extends Component{
    constructor(props){
        super(props);
        this.state = {
            comments: [],
        }
    }
    componentDidMount=()=>{
        let url = 'https://api.cnblogs.com/api/blogs/'+this.props.navigation.state.params.blogApp
                +'/posts/'+this.props.navigation.state.params.Id+'/comments?pageIndex=1&pageSize='
                +this.props.navigation.state.params.CommentCount;
        Service.Get(url).then((jsonData)=>{
            this.setState({
                comments: jsonData,
            })
        })
    }
    _separator = () => {
        return <View style={{ height: 2, backgroundColor: 'rgb(204,204,204)' }}/>;
    }
    _renderItem = (item)=>{
        let item1 = item;
        let {key,Body,Author,DateAdded,AuthorUrl,FaceUrl} = item1.item;
        return(
            <View style = {styles.listcontainer}>
                <View style = {{flex:1}}>
                    <Image source = {FaceUrl?{uri:FaceUrl}:require('../images/defaultface.png')} style = {styles.facestyle}/>
                </View>
                <View style = {styles.textcontainer}>
                    <Text style = {{fontSize: 15, fontWeight: 'bold', color: 'black'}}>{Author}</Text>
                    <Text style = {{color: 'black', fontSize: 12}}>{Body}</Text>
                    <View style = {{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'flex-start'
                    }}>
                        <Text style = {{fontSize: 10, color: 'black',textAlign:'right',flex:1}}>
                            {'评论于: '+DateAdded.split('T')[0]+' '+DateAdded.split('T')[1].substring(0,8)}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }
    render(){
        var data = [];
        for(var i in this.state.comments)
        {
            data.push({
                key: this.state.comments[i].Id,
                Body: this.state.comments[i].Body,
                Author: this.state.comments[i].Author,
                DateAdded: this.state.comments[i].DateAdded,
                AuthorUrl: this.state.comments[i].AuthorUrl,
                FaceUrl: this.state.comments[i].FaceUrl,
            })
        }
        return (
            <View style = {styles.container}>
                <FlatList
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    data={data}
                />
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
    listcontainer: {
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'flex-start',  
        flex:1,
        backgroundColor: 'white',
        width: screenWidth-20,
        marginLeft: 8,
        marginRight: 12,
        marginBottom: 5,
    },
    facestyle: {
        width: 40,
        height: 40,
        marginTop: 5,
    },
    textcontainer: {
        justifyContent:'flex-start',
        alignItems: 'flex-start',  
        flex: 6,
        backgroundColor: 'white',
    }
});
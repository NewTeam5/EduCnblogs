import Config from '../config';
import api from '../api/api.js';
import {authData,err_info} from '../config';
import * as Service from '../request/request.js';
import MyAdapter from './MyAdapter.js';
import React, { Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    ToastAndroid,
    TouchableHighlight,    
    TextInput,
    FlatList,
    TouchableOpacity,
    Dimensions,
    PixelRatio,
    Alert
} from 'react-native';

const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;
const titleFontSize= MyAdapter.titleFontSize;
const abstractFontSize= MyAdapter.abstractFontSize;
const informationFontSize= MyAdapter.informationFontSize;
const btnFontSize= MyAdapter.btnFontSize;
GetBlogApp = (url)=>{
    let ret = '';
    for(var i = 23; i < url.length; i++)
    {
        if(url[i] == '/')
            break;
        ret += url[i];
    }
    return ret;
}
export default class Submitted extends Component {
    constructor(props){
        super(props);
        this.state = {
            Answers:[]
        }
    }
    _isMounted;
    componentWillUnmount = ()=>{
        this._isMounted = false;
    }
    componentWillMount = ()=>{
        _isMounted = true;
        let url = Config.HomeWorkAnswer + this.props.navigation.state.params.Id;
        Service.Get(url).then((jsonData)=>{
            if(jsonData!=='rejected' && _isMounted)
            {
                this.setState({
                    Answers: jsonData
                })
            }
            else{
                ToastAndroid.show(err_info.NO_INTERNET,ToastAndroid.SHORT);
            }
        })
    }
    _renderItem = (item) => {
        let item1 = item;
        let {key, url, title, answerer, realName, blogUrl, dateAdded} = item1.item;
        let blogApp = GetBlogApp(blogUrl);
        return (
            <View>
                <TouchableOpacity
                    style = {styles.listcontainer}
                    onPress = {()=>{
                        this.props.navigation.navigate('BlogDetail',
                        {Id:key, blogApp: blogApp, CommentCount: 100, Url: blogUrl})
                    }}
                >
                    <Text style = {{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginTop: 8,
                        marginBottom: 3,
                        textAlign: 'left',
                        color: 'black',
                        fontFamily : 'serif',
                    }}>
                        {realName}
                    </Text>
                    <Text style = {{
                        fontSize: 16,
                        marginBottom: 3,
                        textAlign: 'left',
                        color: 'black',
                        fontFamily : 'serif',
                    }}>
                        {title}
                    </Text>
                    <View style = {{
                        flexDirection: 'row',
                        marginBottom: 8,
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                    }}>
                        <Text style = {{fontSize: 13, textAlign: 'right', color: 'black', flex: 1}}>
                            提交于:{' '+dateAdded.split('T')[0]+' '+dateAdded.split('T')[1].substring(0,8)}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    _separator = () => {
        return (
            <View style={{ height: 9.75, justifyContent: 'center'}}>
            <View style={{ height: 0.75, backgroundColor: 'rgb(100,100,100)'}}/>
            <View style={{ height: 9, backgroundColor: 'rgb(235,235,235)'}}/>
            </View>
        );
    }
    render(){
        let data = [];
        for(var i in this.state.Answers)
        {
            data.push({
                key: this.state.Answers[i].entryId,
                url: this.state.Answers[i].url,
                title: this.state.Answers[i].title,
                answerer: this.state.Answers[i].answerer,
                realName: this.state.Answers[i].realName,
                blogUrl: this.state.Answers[i].blogUrl,
                dateAdded: this.state.Answers[i].dateAdded
            });
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
       // backgroundColor: 'white',
    },
    content: {
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        flex:1,
    },
    listcontainer: {
        justifyContent:'flex-start',
        alignItems: 'flex-start',
        flex:1,
        alignSelf: 'stretch',
        backgroundColor: 'white',
        paddingLeft: 0.03*screenWidth,
        paddingRight: 0.04*screenWidth,
    }
});
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
    TouchableHighlight,
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';
const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;
const titleFontSize= MyAdapter.titleFontSize;
const abstractFontSize= MyAdapter.abstractFontSize;
const informationFontSize= MyAdapter.informationFontSize;
const btnFontSize= MyAdapter.btnFontSize;   
// 传入classId作为参数
export default class ClassMember extends Component{
    constructor(props){
        super(props);
        this.state = {
            members: [],
            membership: 1,
            isRequestSuccess: false,//初始认为请求未成功，不进行渲染，以防App崩溃
        }
    }
    _isMounted;
    componentWillMount = ()=>{
        this._isMounted=true;
        let url = 'https://api.cnblogs.com/api/edu/schoolclass/members/'+this.props.navigation.state.params.classId;
        Service.Get(url).then((jsonData)=>{
            if(jsonData!=='rejected')
            {
                this.setState({
                    isRequestSuccess: true,
                })
                if(this._isMounted){
                    this.setState({
                        members: jsonData,
                    })
                }
            }
        }).catch((error) => {
            ToastAndroid.show("网络请求失败，请检查连接状态！",ToastAndroid.SHORT);
        });
        //是否有添加成员的权限
        let url1 = Config.apiDomain + api.user.info;
        Service.Get(url1).then((jsonData)=>{
            let url2= Config.apiDomain+"api/edu/member/"+jsonData.BlogId+"/"+this.props.navigation.state.params.classId; 
            Service.Get(url2).then((jsonData)=>{
                if(this._isMounted){
                    this.setState({
                        membership: jsonData.membership,
                    })
                }
            })
        }).catch((error) => {
            ToastAndroid.show("网络请求失败，请检查连接状态！",ToastAndroid.SHORT);
        });
    }
    UpdateData = ()=>{
        this.setState({
            isRequestSuccess: false,
        })
        this.componentWillMount();
    }
    componentWillUnmount=()=>{
        this._isMounted=false;
    }
    _renderItem = (item)=>{
        let item1 = item;
        let {blogUrl,displayName,avatarUrl,membership,realName,blogId} = item1.item;
        realName = realName===null?'':'('+realName+')';
        return(
            <View>
                <TouchableOpacity
                    onPress = {()=>this.props.navigation.navigate('MemberBlog',{blogId:blogId,blogUrl: blogUrl})}
                    style = {styles.listcontainer}
                >
                    <View style = {{flex:1}}>
                        <Image source = {avatarUrl?{uri:avatarUrl}:require('../images/defaultface.png')} style = {styles.avatarstyle}/>
                    </View>
                    <View style = {styles.textcontainer}>
                        <Text style = {{fontSize: 20, fontWeight: 'bold', color: 'black',flex:2}}>{displayName+realName}</Text>
                        <Text style = {{fontSize: 15,flex:3}}>{membership===1?'学生':membership===2?'老师':'助教'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    _separator = () => {
        return <View style={{ height: 1, backgroundColor: 'rgb(225,225,225)' }}/>;
    }
    _onPress = ()=>{
        if(this.state.membership===1)
        {
            ToastAndroid.show("您没有权限，只有老师和助教才能添加班级成员哦！",ToastAndroid.SHORT);
        }
        else
        {
            this.props.navigation.navigate('ClassMemberAdd',
            {classId: this.props.navigation.state.params.classId})
        }
    }
    render(){
        var data = [];
        // 在请求成功的情况下渲染列表
        if(this.state.isRequestSuccess){
        for(var i in this.state.members)
        {
            data.push({
                key: this.state.members[i].memberId,//成员Id
                blogUrl: this.state.members[i].blogUrl,//博客地址
                displayName: this.state.members[i].displayName,//昵称
                avatarUrl: this.state.members[i].avatarUrl,//头像链接
                membership: this.state.members[i].membership,//1：学生 2：老师 3: 助教
                realName: this.state.members[i].realName,//真实姓名
                blogId: this.state.members[i].blogId,
            })
        }}
        return(
            <View style = {styles.container}>
	            <View style= {{        
	                flexDirection: 'column',           
	                justifyContent:'center',
	                alignItems: 'flex-end',  
	                alignSelf: 'stretch',    
	                marginTop: 0.005*screenHeight,
                    marginHorizontal:0.01*screenWidth,
	            }}
	            >
	                <TouchableHighlight
	                    underlayColor="#0588fe"
	                    activeOpacity={0.5}
	                    style= {{
	                    	width:0.35*screenWidth,
	                        alignSelf: 'flex-end',
	                        borderRadius: 0.01*screenHeight,
	                        padding: 0.01*screenHeight,
	                        backgroundColor:"#0588fe"
	                    }}
                        onPress={this._onPress}
	                >
	                    <Text
	                        style= {{
	                            fontSize: btnFontSize,  
	                            color: '#ffffff',  
	                            textAlign: 'center',  
	                            fontWeight: 'bold',
	                        }}   
	                    >
	                        添加成员
	                    </Text>
	                </TouchableHighlight>

                    <View style={{ height: 1, backgroundColor: 'rgb(225,225,225)', width: screenWidth, marginTop: 0.005*screenHeight,}} />  

	            </View>
                <FlatList
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    data={data}
                    onRefresh = {this.UpdateData}
                    refreshing= {false}
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
        marginLeft: 8,
        marginRight: 12,
        width: screenWidth-20,
    },
    avatarstyle: {
        width: 0.15*screenWidth,
        height: 0.15*screenWidth,
        marginBottom: 5,
        marginTop: 5,
    },
    textcontainer: {
        justifyContent:'flex-start',
        alignItems: 'flex-start',  
        flex: 4,
        backgroundColor: 'white',
    }
});
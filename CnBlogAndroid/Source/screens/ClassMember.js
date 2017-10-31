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
// 传入classId作为参数
export default class ClassMember extends Component{
    constructor(props){
        super(props);
        this.state = {
            members: []
        }
    }
    componentDidMount = ()=>{
        let url = 'https://api.cnblogs.com/api/edu/schoolclass/members/'+this.props.navigation.state.params.classId;
        Service.Get(url).then((jsonData)=>{
            this.setState({
                members: jsonData,
            })
        })
    }
    _renderItem = (item)=>{
        let item1 = item;
        let {blogUrl,displayName,avatarUrl,membership,realName} = item1.item;
        return(
            <View>
                <TouchableOpacity
                    onPress = {()=>this.props.navigation.navigate('MemberBlog',{blogUrl:blogUrl})}
                    style = {styles.listcontainer}
                >
                    <View style = {{flex:1}}>
                        <Image source = {avatarUrl?{uri:avatarUrl}:require('../images/defaultface.png')} style = {styles.avatarstyle}/>
                    </View>
                    <View style = {styles.textcontainer}>
                        <Text style = {{fontSize: 20, fontWeight: 'bold', color: 'black',flex:2}}>{displayName+'('+realName+')'}</Text>
                        <Text style = {{fontSize: 15,flex:3}}>{membership===1?'学生':membership===2?'老师':'助教'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
    _separator = () => {
        return <View style={{ height: 2, backgroundColor: 'rgb(204,204,204)' }}/>;
    }
    render(){
        var data = [];
        for(var i in this.state.members)
        {
            data.push({
                key: this.state.members[i].memberId,//成员Id
                blogUrl: this.state.members[i].blogUrl,//博客地址
                displayName: this.state.members[i].displayName,//昵称
                avatarUrl: this.state.members[i].avatarUrl,//头像链接
                membership: this.state.members[i].membership,//1：学生 2：老师 3: 助教
                realName: this.state.members[i].realName,//真实姓名
            })
        }
        return(
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
        flex: 3,
        backgroundColor: 'white',
    }
});
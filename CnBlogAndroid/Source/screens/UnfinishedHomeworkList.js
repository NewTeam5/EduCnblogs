import Config from '../config';
import api from '../api/api.js';
import {authData} from '../config';
import * as Service from '../request/request.js';
import MyAdapter from './MyAdapter.js';
import HeaderNoBackComponent from './HeaderNoBackComponent.js'
import React, { Component} from 'react';
import {StorageKey} from '../config'
import {err_info} from '../config'

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
import Toast from 'teaset/components/Toast/Toast';

const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;
const titleFontSize= MyAdapter.titleFontSize;
const abstractFontSize= MyAdapter.abstractFontSize;
const informationFontSize= MyAdapter.informationFontSize;
const btnFontSize= MyAdapter.btnFontSize;

export default class HomeworkLists extends Component {
    constructor(props){
        super(props);
        this.state = {
            homeworks: [],
            counts: 0,      //作业数量
            membership: 1,
            finishedcount: 0,
            isRequestSuccess: false,
        }
    }
    _renderItem = (item)=>{
        let item1 = item;
        var title = item1.item.title;//作业标题
        var description = item1.item.description;//作业描述
        var deadline = (item1.item.deadline != null ? item1.item.deadline :"Tundefine");//作业截止日期
        var url = item1.item.url;//作业地址
        var Id = item1.item.key;//作业Id
        var isFinished = item1.item.isFinished;
        var classId = item1.item.classId;
        return (
            <View>
                <TouchableOpacity
                    onPress = {()=>this.props.navigation.navigate('HomeworkDetail',{url: url, Id: Id,
                                            classId: classId, isFinished: isFinished})}
                    style = {HomeworkStyles.container}
                >
                    <Text style= {HomeworkStyles.titleTextStyle}>
                        {title}
                    </Text>
                    <Text numberOfLines={3} style= {HomeworkStyles.abstractTextStyle}>
                        {description}
                    </Text>
                    <Text style= {HomeworkStyles.informationTextStyle}>
                        截止于:{deadline.split('T')[0]+' '+deadline.split('T')[1].substring(0,8)}
                    </Text>
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
    StringToDate = (day)=>{
        // YYYY-MM-DDTHH:MM:SS
        if(day == null)
            return new Date();
        let s1 = day.split('T')[0];
        let s2 = day.split('T')[1];
        let YMD = s1.split('-');
        let HMS = s2.split(':');
        return new Date(Number(YMD[0]),Number(YMD[1])-1,Number(YMD[2]),Number(HMS[0]),Number(HMS[1]),Number(HMS[2].substring(0,2)));
    }
    render() {
        return (
        <View
            style= {{
                flexDirection: 'column',
                flex: 1,
                backgroundColor: 'white'
            }}
        >
            <View
                style= {{
                    flexDirection: 'row',
                    justifyContent:'flex-start',
                    alignItems: 'flex-start',
                    alignSelf: 'stretch',
                    flex:1,
                }}
            >
                <FlatList
                    data={this.props.navigation.state.params.data}
                    ItemSeparatorComponent = {this._separator}
                    renderItem={this._renderItem}
                />
            </View>
      </View>
    );
  }
}

const HomeworkStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent:'flex-start',
        alignItems: 'flex-start',
        flex:1,
        alignSelf: 'stretch',
        marginLeft: 0.03*screenWidth,
        marginRight: 0.04*screenWidth,
    },
    titleTextStyle:{
        fontSize: 18,
        color: '#000000',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 2,
        fontWeight: 'bold',
        fontFamily : 'serif',
    },
    abstractTextStyle:{
        fontSize: 14,
        color:'rgb(70,70,70)',
        textAlign: 'left',
        marginBottom: 8,
        lineHeight: 25
    },
    informationTextStyle:{
        alignSelf: "flex-end",
        fontSize: 10,
        color: '#000000',
        textAlign: 'center',
        marginBottom: 8
    }
});

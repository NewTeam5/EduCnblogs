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
    // 标志位
    _isMounted;
    componentWillUnmount = ()=>{
        this._isMounted = false;
    }
    //应该传进来班级ID作为属性
    componentWillMount = ()=>{
        // 先设标志位为true，表示组件未卸载
        this._isMounted = true;
        let classId = this.props.navigation.state.params.classId;
        let url = Config.apiDomain + api.ClassGet.homeworkList + "/false/"+classId+"/1-12";
        // 先获取作业数量，再按作业数量获取作业信息列表
        Service.Get(url).then((jsonData)=>{
            if(jsonData!=='rejected')
            {
                this.setState({
                    isRequestSuccess: true,
                })
                if(this._isMounted)
                {
                    this.setState({
                        counts: jsonData.totalCount,
                    });
                }
            }
        }).then(()=>{
            global.storage.save({key:StorageKey.HOMEWORK_COUNT,data:this.state.counts});
        })
        .then(()=>{
            let url = Config.apiDomain + api.ClassGet.homeworkList + "/false/"+classId+"/"+1+"-"+this.state.counts;
            Service.Get(url).then((jsonData)=>{
                if(this._isMounted&&this.state.isRequestSuccess){
                    this.setState({
                        homeworks: jsonData.homeworks,
                    });
                }
            })
            .then(()=>{
                var c = 0;
                for(var i in this.state.homeworks)
                {
                    let today = new Date(); // 当前日期
                    let _startday = this.state.homeworks[i].startTime; // 作业开始日期
                    let startday = this.StringToDate(_startday);
                    if(this.state.homeworks[i].isFinished===false && today >= startday)
                        c++;
                }
                if(this._isMounted)
                {
                    this.setState({
                        finishedcount: c,
                    })
                }
            })
            .then(()=>{
                global.storage.save({key:StorageKey.CLASS_HOMEWORK,data:this.state.homeworks});
            })
            .then(()=>{
                let url1 = Config.apiDomain + api.user.info;
                Service.Get(url1).then((jsonData)=>{
                    let url2= Config.apiDomain+"api/edu/member/"+jsonData.BlogId+"/"+this.props.navigation.state.params.classId;
                    Service.Get(url2).then((jsonData)=>{
                        if(this._isMounted && jsonData!=='rejected'){
                            this.setState({
                                membership: jsonData.membership,
                            })
                        }
                    })
                })
                .then(()=>{
                    global.storage.save({key : StorageKey.MEMBER_SHIP,data : this.state.membership});
                })
            })
        })
        .catch((error)=>{
            global.storage.load({key : StorageKey.HOMEWORK_COUNT})
            .then((ret)=>{
                this.setState({
                    counts : ret,
                })
            })
            .then(()=>{
                global.storage.load({key : StorageKey.CLASS_HOMEWORK})
                .then((ret)=>{
                    this.setState({
                        homeworks: ret,
                    })
                })
            })
            .then(()=>{
                global.storage.load({key : StorageKey.MEMBER_SHIP})
                .then((ret)=>{
                    this.setState({
                        membership: ret,
                    })
                })
            })
        })
    };
    UpdateData=()=>{

        this.componentWillMount();
    };
    _onPress = ()=>{
        let url = Config.apiDomain + api.user.info;
        if (this.state.membership==2||this.state.membership==3)
            this.props.navigation.navigate('HomeworkPost',{classId: this.props.navigation.state.params.classId});
        else
        {
            ToastAndroid.show("您没有权限，只有老师和助教才能发布作业哦！",ToastAndroid.SHORT);
        }
    };
    _renderItem = (item)=>{
        let item1 = item;
        var title = item1.item.title;//作业标题
        var description = item1.item.description;//作业描述
        var deadline = (item1.item.deadline != null ? item1.item.deadline :"Tundefine");//作业截止日期
        var url = item1.item.url;//作业地址
        var Id = item1.item.key;//作业Id
        var isFinished = item1.item.isFinished;
        return (
            <View>
                <TouchableOpacity
                    onPress = {()=>this.props.navigation.navigate('HomeworkDetail',{url: url, Id: Id,
                                            classId: this.props.navigation.state.params.classId, isFinished: isFinished})}
                    style = {HomeworkStyles.container}
                >
                    <Text style= {HomeworkStyles.titleTextStyle}>
                        {title}
                    </Text>
                    <Text numberOfLines={3} style= {HomeworkStyles.abstractTextStyle}>
                        {description}...
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
        var data = [];
        for(var i in this.state.homeworks)
        {
            let today = new Date(); // 当前日期
            let _startday = this.state.homeworks[i].startTime; // 作业开始日期
            let startday = this.StringToDate(_startday);
            if(today >= startday)//只显示已开始的作业
            {
                data.push({
                    key: this.state.homeworks[i].homeworkId,//作业ID
                    title: this.state.homeworks[i].title,//作业标题
                    url: this.state.homeworks[i].url,//作业网址
                    description: this.state.homeworks[i].description,//作业描述
                    deadline: this.state.homeworks[i].deadline,//作业截止日期
                    isFinished: this.state.homeworks[i].isFinished,// 作业是否结束
                })
            }
        }
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
                justifyContent:'space-between',
                alignItems: 'center',
                marginTop: 0.005*screenHeight,
                marginLeft: 0.03*screenWidth,
                marginRight: 0.04*screenWidth,
                marginBottom: 0.005*screenHeight,
                alignSelf: 'stretch',
            }}
            >
                <Text
                    style= {{
                        alignSelf: 'center',
                        fontSize: btnFontSize,
                        textAlign: 'center',
                        color: 'rgb(51,51,51)'
                    }}
                >
                    未结束：{this.state.finishedcount}
                </Text>
                <TouchableHighlight
                    underlayColor="#0588fe"
                    activeOpacity={0.5}
                    style= {{
                        alignSelf: 'flex-end',
                        borderRadius: 0.01*screenHeight,
                        padding: 0.01*screenHeight,
                        backgroundColor:"#0588fe"
                    }}
                    onPress={this._onPress}//关联函数
                >
                    <Text
                        style= {{
                            fontSize: btnFontSize,
                            color: '#ffffff',
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}
                    >
                        发布作业
                    </Text>
                </TouchableHighlight>
            </View>
            <View style={{ height: 1, backgroundColor: 'rgb(204,204,204)', }}/>
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
                    data={data}
                    ItemSeparatorComponent = {this._separator}
                    renderItem={this._renderItem}
                    onRefresh = {this.UpdateData}
                    refreshing= {false}
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

import Config from '../config';
import api from '../api/api.js';
import {authData} from '../config';
import * as Service from '../request/request.js';
import MyAdapter from './MyAdapter.js';
import HeaderNoBackComponent from './HeaderNoBackComponent.js'
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

export default class HomeworkLists extends Component {
    constructor(props){
        super(props);
        this.state = {
            homeworks: [],
            counts: 0,
            membership: 1,
            finishedcount: '',
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
        })
        .then(()=>{
            let url = Config.apiDomain + api.ClassGet.homeworkList + "/false/"+classId+"/"+1+"-"+this.state.counts;
            Service.Get(url).then((jsonData)=>{
                if(this._isMounted&&this.state.isRequestSuccess){
                    this.setState({
                        homeworks: jsonData.homeworks,
                    });
                }
            }).then(()=>{
                var c = 0;
                for(var i in this.state.homeworks)
                {
                    if(this.state.homeworks[i].isFinished===false)
                        c++;
                }
                if(this._isMounted)
                {
                    this.setState({
                        finishedcount: c,
                    })
                }
            })
        }).catch((error)=>{ToastAndroid.show("网络请求失败，请检查连接状态！",ToastAndroid.SHORT)})
        // 获取身份信息，判断是否可以发布作业
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
        }).catch((error)=>{ToastAndroid.show("网络请求失败，请检查连接状态！",ToastAndroid.SHORT)})
    };
    UpdateData=()=>{
        this.setState({
            isRequestSuccess: false,
        });
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
        var deadline = item1.item.deadline;//作业截止日期
        var url = item1.item.url;//作业地址
        return (
            <View>
                <TouchableOpacity
                    onPress = {()=>this.props.navigation.navigate('HomeworkDetail',{url: url})}
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
    render() {
        var data = [];
        if(this.state.isRequestSuccess){
        for(var i in this.state.homeworks)
        {
            data.push({
                key: this.state.homeworks[i].homeworkId,//作业ID
                title: this.state.homeworks[i].title,//作业标题
                url: this.state.homeworks[i].url,//作业网址
                description: this.state.homeworks[i].description,//作业描述
                deadline: this.state.homeworks[i].deadline,//作业截止日期
            })
        }}
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
            <View style={{ height: 1, backgroundColor: 'rgb(204,204,204)'}}/>
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
        fontSize: titleFontSize-5,
        color: '#000000',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 2,
        fontWeight: 'bold',
        fontFamily : 'serif',
    },
    abstractTextStyle:{
        fontSize: abstractFontSize+2,
        color:'rgb(70,70,70)',
        textAlign: 'left',
        marginBottom: 8,
        lineHeight: 25
    },
    informationTextStyle:{
        alignSelf: "flex-end",
        fontSize: informationFontSize-2,
        color: '#000000',
        textAlign: 'center',
        marginBottom: 8
    }
});  

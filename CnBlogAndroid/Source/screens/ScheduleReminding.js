import Config from '../config';
import api from '../api/api.js';
import {authData} from '../config'
import * as Service from '../request/request.js'
import MyAdapter from './MyAdapter.js';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {
    Stepper,
    Wheel
} from 'teaset';
import React, { Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TextInput,
    Picker,
    ToastAndroid,
    Modal,
    FlatList,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;
const titleFontSize= MyAdapter.titleFontSize;
const abstractFontSize= MyAdapter.abstractFontSize;
const informationFontSize= MyAdapter.informationFontSize;
const btnFontSize= MyAdapter.btnFontSize;
const marginHorizontalNum= 0.07*screenWidth;
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            myMarkedDates:{},
            data:[],
            classes: [],
            isEmpty: true,
            homeworks: [],
            unsubmitHomeworks: [],
            counts: 0,
            isRequestSuccess: false,  
            answers: {}      
        };                
    }
    componentWillMount = () => {
        var memberId;
        this._isMounted = true;
        this.state.myMarkedDates={};
        var unfinishedHomework = [];
        var unsubmitted = [];
        let url = 'https://api.cnblogs.com/api/edu/member/schoolclasses';
        Service.Get(url).then((jsonData) => {
            if(this._isMounted){
                this.setState({
                    classes: jsonData,
                })
                if(jsonData!=='rejected')
                {
                    this.setState({
                        isEmpty: false,
                    })
                }
            }    
        }).then(() => { 
            for (let i in this.state.classes) {
                let classId = this.state.classes[i].schoolClassId;
                url = Config.BlogInClassId + global.user_information.BlogId + '/'+ classId;               
                Service.Get(url).
                then((jsonData)=>{
                    memberId = jsonData.memberId;
                })
                url = Config.apiDomain + api.ClassGet.homeworkList + "/false/" + classId + "/1-12";
                Service.Get(url).then((jsonData) => {
                    if (jsonData !== 'rejected') {
                        this.setState({
                            isRequestSuccess: true,
                        })
                        if (this._isMounted) {
                            this.setState({
                                counts: jsonData.totalCount,
                            });
                        }
                    }
                }).then(() => {
                    url = Config.apiDomain + api.ClassGet.homeworkList + "/false/"+classId+"/"+1+"-"+this.state.counts;
                    Service.Get(url).then((jsonData) => {
                        let homeworks = jsonData.homeworks;                            
                        if (this._isMounted && this.state.isRequestSuccess){
                            for (let j in homeworks) {
                                if(homeworks[j].isFinished === false){
                                    url = Config.SubmitJudge + memberId + '/'+ homeworks[j].homeworkId;
                                    Service.Get(url).then((data)=>{
                                        if(data === false){ 
                                            unsubmitted.push(homeworks[j]);
                                            this.setState({
                                                unsubmitHomeworks: unsubmitted
                                            })                  
                                        }
                                    })
                                }
                            }         
                        }    
                    })
                })  
            }        
        }).catch((error)=>{ToastAndroid.show("网络请求失败，请检查连接状态！",ToastAndroid.SHORT)})    
    }  
    UpdateData = ()=>{
        this.componentWillMount();
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
        this.state.myMarkedDates={};
        for(let i in this.state.unsubmitHomeworks) {
            let t = this.state.unsubmitHomeworks[i].deadline;
            t = t === null ?"undefineT":t;
            t = t.split('T');
            this.state.myMarkedDates[t[0]]={
                selected: true                                        
            };
        }
    return (
        <ScrollView>
        <View
            style= {{
                flexDirection: 'column',
                flex: 1,
                backgroundColor: 'white'
            }}
        >       
            <Calendar
                markedDates={this.state.myMarkedDates}                  
                onDayPress={(day) => {
                    if (day.dateString in this.state.myMarkedDates){
                        this.state.data=[];
                        for(var i in this.state.unsubmitHomeworks)
                        {          
                                let t = this.state.unsubmitHomeworks[i].deadline;
                                t = t.split('T');
                                if (t[0]===day.dateString){
                                    this.state.data.push({
                                        key: this.state.unsubmitHomeworks[i].homeworkId,//作业ID
                                        title: this.state.unsubmitHomeworks[i].title,//作业标题
                                        url: this.state.unsubmitHomeworks[i].url,//作业网址
                                        description: this.state.unsubmitHomeworks[i].description,//作业描述
                                        deadline: this.state.unsubmitHomeworks[i].deadline,//作业截止日期
                                        isFinished: this.state.unsubmitHomeworks[i].isFinished,// 作业是否结束
                                        classId: this.state.unsubmitHomeworks[i].schoolClassId//班级Id
                                    })
                                }
                        }
                        this.props.navigation.navigate('UnfinishedHomeworkList',{data:this.state.data});
                    }
                }}     
                theme={{
                    selectedDayBackgroundColor: '#3b50ce',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: 'red'
                  }}                                      
            />        
        </View>
        </ScrollView>
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
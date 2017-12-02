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
    TouchableOpacity
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
            modalVisible: false,
            myMarkedDates:{
                '2017-11-16': {selected: true,title:"title",description:"description",deadline:"deadline",url:"url"},
                '2017-11-17': {selected: true,title:"ggg",description:"description",deadline:"deadline",url:"url"},
                '2017-11-18': {selected: true,title:"bbb",description:"description",deadline:"deadline",url:"url"},
                '2017-11-19': {selected: true,title:"aaa",description:"description",deadline:"deadline",url:"url"}, 
                '2017-11-20': {selected: true,title:"ccc",description:"description",deadline:"deadline",url:"url"},
                '2017-11-21': {selected: true,title:"ddd",description:"description",deadline:"deadline",url:"url"},
                '2017-11-22': {selected: true,title:"nnn",description:"description",deadline:"deadline",url:"url"}
            },
            classes: [],
            isEmpty: true,
            homeworks: [],
            counts: 0,
            isRequestSuccess: false,
        };
    }
    componentWillMount = () => {
        this._isMounted = true;
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
        })
        .then(() => {
            for (let i in this.state.classes) {
                let classId = this.state.classes[i].schoolClassId;
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
                })
                .then(() => {
                    url = Config.apiDomain + api.ClassGet.homeworkList + "/false/"+classId+"/"+1+"-"+this.state.counts;
                    Service.Get(url).then((jsonData) => {
                        if (this._isMounted && this.state.isRequestSuccess){
                            this.setState({
                                homeworks: jsonData.homeworks,
                            });
                        }
                    })
                    .then(() => {
                        let c = {};
                        for(let i in this.state.homeworks) {
                            if(this.state.homeworks[i].isFinished !== false) {
                                let t = this.state.homeworks[i].deadline;
                                t = t.split('T');
                                c[t[0]] = {
                                    title: this.state.homeworks[i].title,
                                    description: this.state.homeworks[i].description,
                                    url : this.state.homeworks[i].url,
                                    class: this.state.homeworks[i].schoolClassId
                                };
                            }
                        }
                        // alert(JSON.stringify(c));
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
    _renderItem = (item)=>{
        let item1 = item;
        // var title = item1.item.title;//作业标题
        // var description = item1.item.description;//作业描述
        // var deadline = (item1.item.deadline != null ? item1.item.deadline :"Tundefine");//作业截止日期
        //var url = item1.item.url;//作业地址
        var title= item1.item.title
        var description=item1.item.description
        var deadline=item1.item.deadline
        var url = item1.item.url;//作业地址
        return (
            <View>
                <TouchableOpacity
                    onPress = {()=>{}}
                    style = {HomeworkStyles.container}
                >
                    <Text style= {HomeworkStyles.titleTextStyle}>
                        {title}
                    </Text>
                    <Text numberOfLines={3} style= {HomeworkStyles.abstractTextStyle}>
                        {description}...
                    </Text>             
                    <Text style= {HomeworkStyles.informationTextStyle}>
                        截止于:{deadline}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }    
    render() {  
    var data = [];
    for(var i in this.state.myMarkedDates)
    {
        //ToastAndroid.show(this.state.myMarkedDates[i].title,ToastAndroid.SHORT);
        data.push({
            key: i,//日期
            title: this.state.myMarkedDates[i].title,//作业标题
            url: this.state.myMarkedDates[i].url,//作业网址
            description: this.state.myMarkedDates[i].description,//作业描述
            deadline: this.state.myMarkedDates[i].deadline,//作业截止日期
        })
    }
    return (
        <View
            style= {{
                flexDirection: 'column',
                flex: 1,
                backgroundColor: 'white'
            }}
        >
            <Modal
              animationType={"slide"}
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {this.setState({modalVisible:false});}}
              >
                 <View style={{
                     flex: 1,
                     marginTop: 22
                 }}>
                    <FlatList
                        data={data}
                        ItemSeparatorComponent = {this._separator}
                        renderItem={this._renderItem}
                    />

                 </View>
            </Modal>        
            <Calendar
                markedDates={this.state.myMarkedDates} 
                onDayPress={(day) => {
                    if (day.dateString in this.state.myMarkedDates){
                        this.setState({modalVisible:true});
                    }
                }}                           
            />        
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

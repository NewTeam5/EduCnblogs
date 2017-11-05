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
            newDisplay: 0
        }        
        let url = Config.apiDomain + api.user.info;
        Service.Get(url).then((jsonData)=>{
            let url2= Config.apiDomain+"api/edu/member/"+jsonData.BlogId+"/"+this.props.navigation.state.params.classId; 
            Service.Get(url2).then((jsonData)=>{
                if (jsonData.membership==2||jsonData.membership==3)
                    this.setState({
                        newDisplay: 1
                    });
                else {
                    this.setState({
                        newDisplay: 0
                    });
                }                
            })                   
        })                        
    }
    //暂定班级ID为111,应该传进来班级ID作为属性
    componentDidMount = ()=>{
        let classId = this.props.navigation.state.params.classId;
        let url = Config.apiDomain + api.ClassGet.homeworkList + "/false/"+classId+"/1-12";
        // 先获取作业数量，再按作业数量获取作业信息列表
        Service.Get(url).then((jsonData)=>{
            this.setState({
                counts: jsonData.totalCount,
            });
        })
        .then(()=>{
            let url = Config.apiDomain + api.ClassGet.homeworkList + "/false/"+classId+"/"+1+"-"+this.state.counts;
            Service.Get(url).then((jsonData)=>{
                this.setState({
                    homeworks: jsonData.homeworks,
                });
            })
        })
    };
    _onPress = ()=>{
        let url = Config.apiDomain + api.user.info;
        Service.Get(url).then((jsonData)=>{
            let url2= Config.apiDomain+"api/edu/member/"+jsonData.BlogId+"/"+this.props.navigation.state.params.classId; 
            Service.Get(url2).then((jsonData)=>{
                if (jsonData.membership==2||jsonData.membership==3)
                    this.props.navigation.navigate('HomeworkPost');
                else {
                    Alert.alert(
                      'Warning',
                      '学生不能创建作业！',
                      [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ],
                      { cancelable: false }
                    )            
                }                
            })                   
        })                
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
            <View style={{ height: 10.5, justifyContent: 'center'}}>
            <View style={{ height: 0.75, backgroundColor: 'rgb(100,100,100)'}}/>
            <View style={{ height: 9, backgroundColor: 'rgb(235,235,235)'}}/>
            <View style={{ height: 0.75, backgroundColor: 'rgb(100,100,100)'}}/>
            </View>
        );
    }
    render() {
        var data = [];
        for(var i in this.state.homeworks)
        {
            data.push({
                key: this.state.homeworks[i].homeworkId,//作业ID
                title: this.state.homeworks[i].title,//作业标题
                url: this.state.homeworks[i].url,//作业网址
                description: this.state.homeworks[i].description,//作业描述
                deadline: this.state.homeworks[i].deadline,//作业截止日期
            })
        }
        //let display= this.state.newDisplay?"New HomeWork":"";
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
                marginTop: 0.008*screenHeight,
                marginHorizontal: 0.02*screenWidth,
                marginBottom: 0.008*screenHeight,
                alignSelf: 'stretch',          
            }}
            >
                <Text
                    style= {{  
                        alignSelf: 'flex-start',
                        fontSize: titleFontSize,  
                        color: '#000000',  
                        textAlign: 'center',  
                        fontWeight: 'bold',
                    }}  		
                >
                    Homeworks
                </Text>
                {this.state.newDisplay?(
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
                      New HomeWork
                    </Text>
                </TouchableHighlight>
                ):(null)
                }
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
        marginLeft: 0.02*screenWidth,
        marginRight: 0.04*screenWidth,
    },
    titleTextStyle:{
        fontSize: titleFontSize-5,  
        color: '#000000',  
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 8,
        fontWeight: 'bold',
    },
    abstractTextStyle:{
        fontSize: abstractFontSize+2,  
        color:'rgb(70,70,70)',  
        textAlign: 'left',
        marginBottom: 8,         
    },
    informationTextStyle:{
        alignSelf: "flex-end",
        fontSize: informationFontSize,  
        color: '#000000',  
        textAlign: 'center',
        marginBottom: 8      
    }
});  

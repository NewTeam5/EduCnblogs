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
} from 'react-native';
const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;
const titleFontSize= MyAdapter.titleFontSize;
const abstractFontSize= MyAdapter.abstractFontSize;
const informationFontSize= MyAdapter.informationFontSize;
const btnFontSize= MyAdapter.btnFontSize;
const marginHorizontalNum= 0.07*screenWidth;
export default class App extends Component {
      constructor(props){
        super(props);
          this.state={
            formatType: 1,//1: TintMce 2: Markdown
            title: 'default title',
            content: 'default content',
            IsShowInHome: true,// true or false

            startModalVisible: false,
            endModalVisible: false,
            startDate: "",
            endDate: "",
            startHour:"0",
            startMinute:"0",
            endHour:"0",
            endMinute:"0"
          };
      }
    _onPress=()=>{
        let url = 'https://api.cnblogs.com/api/edu/homework/publish';
        let classId = Number(this.props.navigation.state.params.classId);
        let postBody = {
            schoolClassId: classId,
            title: this.state.title,
            startTime: this.state.startDate+" "+this.state.startHour+":"+this.state.startMinute,
            deadline: this.state.endDate+" "+this.state.endHour+":"+this.state.endMinute,
            content: this.state.content,
            formatType: Number(this.state.formatType),
            IsShowInHome: this.state.IsShowInHome,
        }
        let body = JSON.stringify(postBody);
        Service.UserAction(url,body,'POST').then((response)=>{
            if(response.status !== 200)
            {
                return null;
            }
            else
            {
                return response.json();
            }
        }).then((jsonData)=>{
            if(jsonData===null)
            {
                ToastAndroid.show('请求失败！',ToastAndroid.SHORT);
            }
            else if(jsonData.isSuccess)
            {
                ToastAndroid.show('添加成功，请刷新查看！',ToastAndroid.SHORT);
                this.props.navigation.goBack();
            }
            else if(jsonData.isWarning)
            {
                ToastAndroid.show(jsonData.message,ToastAndroid.SHORT);
            }
            else
            {
                ToastAndroid.show('发生错误，请稍后重试！',ToastAndroid.SHORT);
            }
        }).catch((error)=>{ToastAndroid.show("网络请求失败，请检查连接状态！",ToastAndroid.SHORT)})
    }
    setStartModalVisible(visible) {
        this.setState({startModalVisible: visible});
    }
    setEndModalVisible(visible) {
        this.setState({endModalVisible: visible});
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
            <Modal
              animationType={"slide"}
              transparent={false}
              visible={this.state.startModalVisible}
              onRequestClose={() => {alert("选择一个日期")}}
              >
             <View style={{
                 flex: 1,
                 marginTop: 22
             }}>
                <View
                    style= {{
                        flex: 1,
                    }}
                >
                <Calendar
                  onDayPress={(day) => {
                      this.setState({startDate:day.dateString});
                      this.setStartModalVisible(!this.state.startModalVisible);
                  }}
                />    	
                </View>
             </View>
            </Modal>
            <Modal
              animationType={"slide"}
              transparent={false}
              visible={this.state.endModalVisible}
              onRequestClose={() => {alert("选择一个日期")}}
              >
             <View style={{
                 flex: 1,
                 marginTop: 22
             }}>
                <View
                    style= {{
                        flex: 1,
                    }}
                >
                <Calendar
                  onDayPress={(day) => {
                      this.setState({endDate:day.dateString});
                    this.setEndModalVisible(!this.state.endModalVisible);			  	
                  }}
                />    	
                </View>
             </View>
            </Modal>    

            <View style= {{        
                flexDirection: 'row',  
                justifyContent:'flex-start',
                alignItems: 'center',  
                alignSelf: 'stretch',    
                marginTop:0.02*screenHeight,
                marginHorizontal:marginHorizontalNum
            }}      	
            >
                <Text
                    style= {{
                        width:0.2*screenWidth,
                        fontSize: btnFontSize,  
                        color: 'black',  
                        textAlign: 'right',  	                    
                    }}   
                >
                    标题
                </Text>       
                <TextInput
                    //onFocus= {this._onPress}
                    placeholder= ""
                    style={{
                        flex:1, 
                        marginLeft:0.04*screenWidth,
                        height: 0.06*screenHeight, 
                        borderColor: 'gray', 
                        borderWidth: 1
                    }}
                    underlineColorAndroid="transparent"//设置下划线背景色透明 达到去掉下划线的效果 	                
                    onChangeText= {(text)=>{this.setState({title:text});}}
                />      	
            </View>		

            <MyBar 
                title= "起始时间" 
                onPress={()=>{this.setStartModalVisible(true);}} 
                placeholder={this.state.startDate}
                myThis= {this}
                myPrefix= "start"
            />        	
            <MyBar 
                title= "截止时间" 
                onPress={()=>{this.setEndModalVisible(true);}} 
                placeholder={this.state.endDate}
                myThis= {this}
                myPrefix= "end"
            />
            <View style= {{        
                flexDirection: 'row',           
                justifyContent:'flex-start',
                alignItems: 'center',  
                alignSelf: 'stretch',    
                marginTop:0.02*screenHeight,
                marginHorizontal:marginHorizontalNum
            }}
            >
                <Text
                    style= {{
                        width:0.2*screenWidth,
                        fontSize: btnFontSize,  
                        color: 'black',  
                        textAlign: 'right',  	                    
                    }}   
                >
                    格式类型
                </Text>   
                <View
                    style= {{
                        flexDirection: 'row',           
                        justifyContent:'flex-start',
                        alignItems: 'center',  
                        alignSelf: 'stretch',    						
                        flex:1,
                        marginLeft:0.04*screenWidth,
                        borderColor: 'gray', 
                        borderWidth: 1	                    
                    }}
                >                     
                    <Picker
                        style= {{
                            flex:1,
                            height: 0.06*screenHeight, 							
                            color:'#000000',
                        }}
                        mode= 'dropdown'
                          selectedValue={this.state.formatType}
                          onValueChange={(type) => this.setState({formatType: type})}>
                          <Picker.Item label="TinyMce" value="1" />
                          <Picker.Item label="Markdown" value="2" />
                    </Picker>   
                </View>         	
            </View>        	
            <View style= {{        
                flexDirection: 'row',           
                justifyContent:'flex-start',
                alignItems: 'center',  
                alignSelf: 'stretch',    
                marginTop:0.02*screenHeight,
                marginHorizontal:marginHorizontalNum
            }}
            >
                <Text
                    style= {{
                        width:0.2*screenWidth,
                        fontSize: btnFontSize,  
                        color: 'black',  
                        textAlign: 'right',  	                    
                    }}   
                >
                    首页显示
                </Text>   
                <View
                    style= {{
                        flexDirection: 'row',           
                        justifyContent:'flex-start',
                        alignItems: 'center',  
                        alignSelf: 'stretch',    						
                        flex:1,
                        marginLeft:0.04*screenWidth,
                        borderColor: 'gray', 
                        borderWidth: 1	                    
                    }}
                >                     
                    <Picker
                        style= {{
                            flex:1,
                            height: 0.06*screenHeight, 							
                            color:'#000000',
                        }}
                        mode= 'dropdown'
                          selectedValue={this.state.isShowInHome}
                          onValueChange={(type) => this.setState({isShowInHome: type})}>
                          <Picker.Item label="是" value="true" />
                          <Picker.Item label="否" value="false" />
                    </Picker>   
                </View>         	
            </View>        	
            <View style= {{        
                flexDirection: 'row',           
                justifyContent:'flex-start',
                alignItems: 'center',  
                alignSelf: 'stretch',    
                marginTop:0.02*screenHeight,
                marginHorizontal:marginHorizontalNum
            }}
            >
                <Text
                    style= {{
                        width:0.2*screenWidth,
                        fontSize: btnFontSize,  
                        color: 'black',  
                        textAlign: 'right',  	                    
                    }}   
                >
                    内容
                </Text>   
            </View>
            <View style= {{        
                flexDirection: 'row',           
                justifyContent:'flex-start',
                alignItems: 'center',  
                alignSelf: 'stretch',    
                marginTop:0.02*screenHeight,
                marginHorizontal:marginHorizontalNum
            }}
            >
                <TextInput
                    style={{
                        flexDirection:'column',
                        alignItems:'flex-start',
                        flex:1, 
                        height: 0.33*screenHeight, 
                        borderColor: 'gray', 
                        borderWidth: 1
                    }}
                    textAlignVertical= "top"
                    placeholder="请输入内容"
                    multiline={true}
                    underlineColorAndroid="transparent"//设置下划线背景色透明 达到去掉下划线的效果 
                    onChangeText= {(text)=>{this.setState({content:text});}}
                />      	
            </View>
            <View style= {{
                flexDirection: 'row',
                justifyContent:'center',
                alignItems: 'center',
                alignSelf: 'stretch',
                marginTop:0.02*screenHeight,
                marginHorizontal:marginHorizontalNum
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
                    onPress={()=>{
                        this._onPress();
                    }}//关联函数
                >
                    <Text
                        style= {{
                            fontSize: btnFontSize,  
                            color: '#ffffff',  
                            textAlign: 'center',  
                            fontWeight: 'bold',
                        }}   
                    >
                        发布
                    </Text>
                </TouchableHighlight>  
            </View>
        </View>
    );
  }
}

class MyBar extends Component{
    hours;
    minutes;	
    constructor(props){
        super(props);
        this.hours= [];
        this.minutes= [];		
          for (var i= 0;i<24;i++)
              this.hours.push((i<10?'0':'')+i);
          for (var i= 0;i<60;i++)

              this.minutes.push((i<10?'0':'')+i);

    }
    render(){
        return(
            <View style= {{        
                flexDirection: 'row',  
                justifyContent:'flex-start',
                alignItems: 'center',  
                alignSelf: 'stretch',    
                marginTop:0.02*screenHeight,
                marginHorizontal:marginHorizontalNum
            }}      	
            >
                <Text
                    style= {{
                        width:0.2*screenWidth,
                        fontSize: btnFontSize,  
                        color: 'black',  
                        textAlign: 'right',  	                    
                    }}   
                >
                    {this.props.title}
                </Text>            
                <TextInput
                    onFocus= {this.props.onPress}
                    placeholder= {this.props.placeholder}
                    style={{
                        flex:1, 
                        marginLeft:0.04*screenWidth,
                        height: 0.06*screenHeight, 
                        borderColor: 'gray', 
                        borderWidth: 1
                    }}
                    underlineColorAndroid="transparent"//设置下划线背景色透明 达到去掉下划线的效果    		
                />
                <View style= {{        
                    flexDirection: 'row',  
                    justifyContent:'flex-start',
                    alignItems: 'center',  
                    alignSelf: 'stretch',    
                    marginLeft:0.02*screenWidth
                }}>      	
                    <Wheel
                      style={{height: 0.06*screenHeight, width: 0.05*screenWidth}}
                      itemStyle={{textAlign: 'center'}}
                      items={this.hours}
                      onChange= {(index)=>{
                          if (this.props.myPrefix==="start"){
                              this.props.myThis.setState({startHour:""+index});
                          }else if (this.props.myPrefix==="end"){
                              this.props.myThis.setState({endHour:""+index});
                          }
                      }}
                    />
                    <Text>:</Text>
                    <Wheel
                      style={{height: 0.06*screenHeight, width: 0.05*screenWidth}}
                      itemStyle={{textAlign: 'center'}}
                      items={this.minutes}
                      onChange= {(index)=>{
                          if (this.props.myPrefix==="start"){
                              this.props.myThis.setState({startMinute:""+index});
                          }else if (this.props.myPrefix==="end"){
                              this.props.myThis.setState({endMinute:""+index});
                          }
                      }}
                    />
                  </View>
            </View>			
        );
    }
}
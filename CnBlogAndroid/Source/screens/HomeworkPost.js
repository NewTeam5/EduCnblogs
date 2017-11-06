import Config from '../config';
import api from '../api/api.js';
import {authData} from '../config'
import * as Service from '../request/request.js'
import MyAdapter from './MyAdapter.js';
import React, { Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TextInput,  
    Picker
} from 'react-native';
const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;
const titleFontSize= MyAdapter.titleFontSize;
const abstractFontSize= MyAdapter.abstractFontSize;
const informationFontSize= MyAdapter.informationFontSize;
const btnFontSize= MyAdapter.btnFontSize;

export default class App extends Component {
  	constructor(props){
        super(props);
  		this.state={
            formatType: 1,//1: TintMce 2: Markdown
            title: '',
            startTime: '',
            deadline: '',
            content: '',
            IsShowInHome: true,// true or false
  		};
  	}
    _onPress(){
        let url = 'https://api.cnblogs.com/api/edu/homework/publish';
        let classId = Number(this.props.navigation.state.params.classId);
        let postBody = {
            schoolClassId: classId,
            title: this.state.title,
            startTime: this.state.startTime,
            deadline: this.state.deadline,
            content: this.state.content,
            formatType: this.state.formatType,
            IsShowInHome: this.state.IsShowInHome,
        }
        let body = JSON.stringify(postBody);
        Service.UserAction(url,body,'POST').then((response)=>{
            if(response.status !== 200)
            {
                ToastAndroid.show('请求失败！',ToastAndroid.SHORT);
            }
            else
            {
                return response.json();
            }
        }).then((jsonData)=>{
            if(jsonData.isSuccess)
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
        })
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
            <View style= {{        
                flexDirection: 'row',  
                justifyContent:'flex-start',
                alignItems: 'center',  
                alignSelf: 'stretch',    
                marginTop:0.05*screenHeight,
                marginHorizontal:0.07*screenWidth
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
	                作业标题
	            </Text>            
	            <TextInput
	                style={{
	                    flex:1, 
	                    marginLeft:0.04*screenWidth,
	                    height: 0.06*screenHeight, 
	                    borderColor: 'gray', 
	                    borderWidth: 1
	                }}
	                underlineColorAndroid="transparent"//设置下划线背景色透明 达到去掉下划线的效果 	                
	                //onChangeText= 关联函数        		
	            />      	
            </View>
            <View style= {{        
                flexDirection: 'row',           
                justifyContent:'flex-start',
                alignItems: 'center',  
                alignSelf: 'stretch',    
                marginTop:0.05*screenHeight,
                marginHorizontal:0.07*screenWidth
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
	                内容格式
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
					  	selectedValue={this.state.language}
					  	onValueChange={(value) => this.setState({formatType: value})}>
					  	<Picker.Item label="TinyMce" value={1} />
					  	<Picker.Item label="Markdown" value={2} />
					</Picker>   
				</View>         	
            </View>
            <View style= {{        
                flexDirection: 'row',           
                justifyContent:'flex-start',
                alignItems: 'center',  
                alignSelf: 'stretch',    
                marginTop:0.05*screenHeight,
                marginHorizontal:0.07*screenWidth
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
	                Content
	            </Text>   
            </View>
            <View style= {{        
                flexDirection: 'row',
                justifyContent:'flex-start',
                alignItems: 'center',  
                alignSelf: 'stretch',    
                marginTop:0.05*screenHeight,
                marginHorizontal:0.07*screenWidth
            }}
            >
	            <TextInput
	                style={{
	                	flexDirection:'column',
	                	alignItems:'flex-start',
	                    flex:1, 
	                    height: 0.375*screenHeight, 
	                    borderColor: 'gray', 
	                    borderWidth: 1
	                }}
	                textAlignVertical= "top"
	                placeholder="请输入内容"
	                multiline={true}
	                underlineColorAndroid="transparent"//设置下划线背景色透明 达到去掉下划线的效果 
	                //onChangeText= 关联函数        		
	            />      	
            </View>
            <View style= {{        
                flexDirection: 'row',           
                justifyContent:'center',
                alignItems: 'center',  
                alignSelf: 'stretch',    
                marginTop:0.05*screenHeight,
                marginHorizontal:0.07*screenWidth
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
                      Post
                    </Text>
                </TouchableHighlight>            
            </View>
        </View>
    );
  }
}
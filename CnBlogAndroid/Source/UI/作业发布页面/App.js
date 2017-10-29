/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import MyAdapter from './MyAdapter.js';
import HeaderNoBackComponent from './HeaderNoBackComponent.js';
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

export default class App extends Component<{}> {
  	constructor(props){
        super(props);  		
  		this.state={
  			language:"Java"
  		};
  	}
  _onPress(){

  }
  render() {
    return (
        <View
            style= {{
            	flexDirection: 'column',
            	flex: 1,
            }}
        >
            <HeaderNoBackComponent
              text= "Classes"
            />        
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
	                Title
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
	                DueTime
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
					  	onValueChange={(lang) => this.setState({language: lang})}>
					  	<Picker.Item label="Java" value="java" />
					  	<Picker.Item label="JavaScript" value="js" />
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
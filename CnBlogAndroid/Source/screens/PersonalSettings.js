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
  Picker,
  FlatList
} from 'react-native';
const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;
const titleFontSize= MyAdapter.titleFontSize;
const abstractFontSize= MyAdapter.abstractFontSize;
const informationFontSize= MyAdapter.informationFontSize;
const btnFontSize= MyAdapter.btnFontSize;   

export default class PersonalSettings extends Component {  
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
            	backgroundColor: 'white'
            }}
        >
            <View style= {{        
                flexDirection: 'row',  
                justifyContent:'center',
                alignItems: 'center',  
                marginTop:0.05*screenHeight,
            }}      	
            >
                <Image
                    style= {{
                        width: 0.3*screenHeight,
                        height: 0.3*screenHeight
                    }}
                    source={{uri: 'https://i.loli.net/2017/10/30/59f7235c222ae.png'}}
                />
            </View>
            <View style= {{        
                flexDirection: 'row',  
                justifyContent:'center',
                alignItems: 'center',  
                marginTop:0.04*screenHeight,
            }}      	
            >                
                <TouchableHighlight
                    underlayColor="#00bfff"
                    activeOpacity={0.5}
                    style= {{
                        borderRadius: 0.01*screenHeight,
                        padding: 0.01*screenHeight,                    	
                        alignSelf:'flex-start',
                        backgroundColor:"#00bfff",
                    }}
                    onPress={this._onPress}//关联函数                   
                >
	            <Text style= {{      
	                fontSize: btnFontSize,  
	                color: 'white',  
	                textAlign: 'center',  	                
	            }}
	            >
	                New Avatar
	            </Text>                 
                </TouchableHighlight>
            </View>
            <View style= {{        
                flexDirection: 'row',  
                justifyContent:'flex-start',
                alignItems: 'center',  
                alignSelf: 'stretch',    
                marginTop:0.05*screenHeight,
                marginHorizontal:0.05*screenWidth
            }}      	
            >
	            <Text
	                style= {{
	                	width:0.3*screenWidth,
	                    fontSize: btnFontSize,  
	                    color: 'black',  
	                    textAlign: 'right',  	                    
	                }}   
	            >
	                New Password
	            </Text>            
	            <TextInput
	                style={{
	                    flex:1, 
	                    marginLeft:0.04*screenWidth,
	                    height: 0.06*screenHeight, 
	                    borderColor: 'gray', 
	                    borderWidth: 1
	                }}
	                secureTextEntry={true}
	                underlineColorAndroid="transparent"//设置下划线背景色透明 达到去掉下划线的效果 	                
	                //onChangeText= 关联函数        		
	            />      	
            </View>            
            <View style= {{        
                flexDirection: 'row',  
                justifyContent:'flex-start',
                alignItems: 'center',  
                alignSelf: 'stretch',    
                marginTop:0.02*screenHeight,
                marginHorizontal:0.05*screenWidth
            }}      	
            >
	            <Text
	                style= {{
	                	width:0.3*screenWidth,
	                    fontSize: btnFontSize,  
	                    color: 'black',  
	                    textAlign: 'right',  	                    
	                }}   
	            >
	                Password Again
	            </Text>            
	            <TextInput
	                style={{
	                    flex:1, 
	                    marginLeft:0.04*screenWidth,
	                    height: 0.06*screenHeight, 
	                    borderColor: 'gray', 
	                    borderWidth: 1
	                }}
	                secureTextEntry={true}
	                underlineColorAndroid="transparent"//设置下划线背景色透明 达到去掉下划线的效果 	                
	                //onChangeText= 关联函数        		
	            />      	
            </View>   
            <View style= {{        
                flexDirection: 'row',  
                justifyContent:'flex-start',
                alignItems: 'center',  
                alignSelf: 'stretch',    
                marginTop:0.02*screenHeight,
                marginHorizontal:0.05*screenWidth
            }}      	
            >
	            <Text
	                style= {{
	                	width:0.3*screenWidth,
	                    fontSize: btnFontSize,  
	                    color: 'black',  
	                    textAlign: 'right',  	                    
	                }}   
	            >
	                Email Address
	            </Text>            
	            <TextInput
	                style={{
	                    flex:1, 
	                    marginLeft:0.04*screenWidth,
	                    height: 0.06*screenHeight, 
	                    borderColor: 'gray', 
	                    borderWidth: 1
	                }}
	                secureTextEntry={true}
	                underlineColorAndroid="transparent"//设置下划线背景色透明 达到去掉下划线的效果 	                
	                //onChangeText= 关联函数        		
	            />      	
            </View>            
            <View style= {{        
                flexDirection: 'row',           
                justifyContent:'flex-start',
                alignItems: 'center',  
                alignSelf: 'stretch',    
                marginTop:0.02*screenHeight,
                marginHorizontal:0.05*screenWidth
            }}
            >
	            <Text
	                style= {{
	                	width:0.3*screenWidth,
	                    fontSize: btnFontSize,  
	                    color: 'black',  
	                    textAlign: 'right',  	                    
	                }}   
	            >
	                Type
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
                justifyContent:'center',
                alignItems: 'center',  
                marginTop:0.04*screenHeight,
            }}      	
            >                
                <TouchableHighlight
                    underlayColor="#00bfff"
                    activeOpacity={0.5}                    
                    style= {{
                    	width:0.248*screenWidth,
                        borderRadius: 0.01*screenHeight,
                        padding: 0.01*screenHeight,                    	
                        alignSelf:'flex-start',
                        backgroundColor:"#00bfff",
                    }}
                    onPress={this._onPress}//关联函数                   
                >
	            <Text style= {{      
	                fontSize: btnFontSize,  
	                color: 'white',  
	                textAlign: 'center',  	                
	            }}
	            >
	                Save
	            </Text>                 
                </TouchableHighlight>
            </View>            
        </View>
    );
  }
}
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

export default class App extends Component {
  	constructor(props){
        super(props);  		
  		this.state={
  			identity:"学生",
  		};
  	}
    _onPress(){

    }
    render() {
    return (
        <View
            style= {{
            	flexDirection: 'column',
            	justifyContent:'flex-start',
            	flex: 1,
            	backgroundColor: 'white',
            	paddingTop: 0.1*screenHeight,
            	paddingBottom: 0.02*screenHeight
            }}
        >         
            <View style= {{        
                flexDirection: 'row',  
                justifyContent:'flex-start',
                alignItems: 'center',  
                alignSelf: 'stretch',    
                marginTop:0.02*screenHeight,
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
	                园子昵称
	            </Text>            
	            <TextInput
	            	placeholder="使用博客园显示昵称添加"	            
	                style={{
	                    flex:1, 
	                    marginLeft:0.04*screenWidth,
	                    height: 0.07*screenHeight, 
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
                marginTop:0.02*screenHeight,
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
	                真实姓名
	            </Text>            
	            <TextInput
	                style={{
	                    flex:1, 
	                    marginLeft:0.04*screenWidth,
	                    height: 0.07*screenHeight, 
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
                marginTop:0.02*screenHeight,
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
	                身份
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
	                    	height: 0.07*screenHeight, 							
		                    color:'#000000',
						}}
						mode= 'dropdown'
					  	selectedValue={this.state.identity}
					  	onValueChange={(ident) => this.setState({identity: ident})}>
					  	<Picker.Item label="学生" value="学生" />
					  	<Picker.Item label="老师" value="老师" />
					  	<Picker.Item label="助教" value="助教" />
					</Picker>   
				</View>         	
            </View>
            {this.state.identity==="学生"?(<View style= {{        
                flexDirection: 'row',  
                justifyContent:'flex-start',
                alignItems: 'center',  
                alignSelf: 'stretch',    
                marginTop:0.02*screenHeight,
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
	                学号
	            </Text>            
	            <TextInput
	                style={{
	                    flex:1, 
	                    marginLeft:0.04*screenWidth,
	                    height: 0.07*screenHeight, 
	                    borderColor: 'gray', 
	                    borderWidth: 1
	                }}
	                underlineColorAndroid="transparent"//设置下划线背景色透明 达到去掉下划线的效果 	                
	                //onChangeText= 关联函数        		
	            />      	
            </View>):(null)
        	}            
            <View style= {{        
                flexDirection: 'row',           
                justifyContent:'center',
                alignItems: 'center',  
                alignSelf: 'stretch',    
                marginTop: 0.05*screenHeight,
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
                      添加
                    </Text>
                </TouchableHighlight>            
            </View>
        </View>
    );
  }
}
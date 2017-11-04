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
  			language:"Java",
  			language2:"Java"
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
                marginHorizontal:0.05*screenWidth
            }}      	
            >
	            <TextInput
	            	placeholder= "请输入用户名或博客地址"
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
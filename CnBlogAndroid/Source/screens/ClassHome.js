import Config from '../config';
import api from '../api/api.js';
import {authData} from '../config'
import * as Service from '../request/request.js'
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
    FlatList,
    TouchableOpacity,
    Dimensions,
    PixelRatio,
    Button,
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;
const titleFontSize= MyAdapter.titleFontSize;
const abstractFontSize= MyAdapter.abstractFontSize;
const informationFontSize= MyAdapter.informationFontSize;
const btnFontSize= MyAdapter.btnFontSize;   
// 此页面应该传入classId作为属性
// 现在暂时Id为238(BUAA软工的ID)
export default class ClassHome extends Component{
  	_onPress(){

  	}	
  render() {
	let classId = 238;//this.props.classId  	
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
	            <Text style= {{      
	            	alignSelf:'center',
	                fontSize: btnFontSize,  
	                color: '#00bfff',  
	                textAlign: 'center',  
	            }}
	            >
	                School
	            </Text>                 
                <TouchableHighlight
                    underlayColor="transparent"
                    activeOpacity={0.5}
                    style= {{
                    	marginLeft: 0.07*screenWidth,
                        alignSelf:'flex-start',
                        backgroundColor:"transparent",
                    }}
                    onPress={this._onPress}//关联函数                   
                >
	                <Image
	                    style= {{
	                        width: 0.0625*screenHeight,
	                        height: 0.0625*screenHeight
	                    }}
	                    source={require('../images/heart.png')}
	                />
                </TouchableHighlight>
            </View>
            <View style= {{        
                flexDirection: 'row',  
                justifyContent:'space-between',
                alignItems: 'center',  
                marginTop:0.083*screenHeight,
                marginHorizontal:0.084*screenWidth,
            }}      	
            >
                <TouchableHighlight
                    underlayColor="transparent"
                    activeOpacity={0.5}
                    style= {{
                        alignSelf:'flex-start',
                        backgroundColor:"transparent",
                    }}
                    onPress={()=>this.props.navigation.navigate('HomeworkLists',{classId:classId})}//关联函数                   
                >
	                <Image
	                    style= {{
	                        width: 0.1*screenHeight,
	                        height: 0.1*screenHeight
	                    }}
	                    source={require('../images/home.png')}
	                />
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor="transparent"
                    activeOpacity={0.5}
                    style= {{
                        alignSelf:'flex-start',
                        backgroundColor:"transparent",
                    }}
                    onPress={()=>this.props.navigation.navigate('HomeworkLists',{classId:classId})}//关联函数                   
                >
	                <Image
	                    style= {{
	                        width: 0.1*screenHeight,
	                        height: 0.1*screenHeight
	                    }}
	                    source={require('../images/people.png')}
	                />
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor="transparent"
                    activeOpacity={0.5}
                    style= {{
                        alignSelf:'flex-start',
                        backgroundColor:"transparent",
                    }}
                    onPress={()=>this.props.navigation.navigate('HomeworkLists',{classId:classId})}//关联函数                   
                >
	                <Image
	                    style= {{
	                        width: 0.1*screenHeight,
	                        height: 0.1*screenHeight
	                    }}
	                    source={require('../images/edit.png')}
	                />
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor="transparent"
                    activeOpacity={0.5}
                    style= {{
                        alignSelf:'flex-start',
                        backgroundColor:"transparent",
                    }}
                    onPress={()=>this.props.navigation.navigate('HomeworkLists',{classId:classId})}//关联函数                   
                >
	                <Image
	                    style= {{
	                        width: 0.1*screenHeight,
	                        height: 0.1*screenHeight
	                    }}
	                    source={require('../images/save.png')}
	                />
                </TouchableHighlight>

            </View>
            <View style= {{        
                flexDirection: 'row',  
                justifyContent:'space-between',
                alignItems: 'center',  
                marginTop:0.03*screenHeight,
                marginHorizontal:0.084*screenWidth,
            }}      	
            >
                <TouchableHighlight
                    underlayColor="transparent"
                    activeOpacity={0.5}
                    style= {{
                        alignSelf:'flex-start',
                        backgroundColor:"transparent",
                    }}
                    onPress={()=>this.props.navigation.navigate('HomeworkLists',{classId:classId})}//关联函数                   
                >
	                <Image
	                    style= {{
	                        width: 0.1*screenHeight,
	                        height: 0.1*screenHeight
	                    }}
	                    source={require('../images/message.png')}
	                />
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor="transparent"
                    activeOpacity={0.5}
                    style= {{
                        alignSelf:'flex-start',
                        backgroundColor:"transparent",
                    }}
                    onPress={()=>this.props.navigation.navigate('HomeworkLists',{classId:classId})}//关联函数                   
                >
	                <Image
	                    style= {{
	                        width: 0.1*screenHeight,
	                        height: 0.1*screenHeight
	                    }}
	                    source={require('../images/calendar.png')}
	                />
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor="transparent"
                    activeOpacity={0.5}
                    style= {{
                        alignSelf:'flex-start',
                        backgroundColor:"transparent",
                    }}
                    onPress={()=>this.props.navigation.navigate('HomeworkLists',{classId:classId})}//关联函数                   
                >
	                <Image
	                    style= {{
	                        width: 0.1*screenHeight,
	                        height: 0.1*screenHeight
	                    }}
	                    source={require('../images/ring.png')}
	                />
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor="transparent"
                    activeOpacity={0.5}
                    style= {{
                        alignSelf:'flex-start',
                        backgroundColor:"transparent",
                    }}
                    onPress={()=>this.props.navigation.navigate('HomeworkLists',{classId:classId})}//关联函数                   
                >
	                <Image
	                    style= {{
	                        width: 0.1*screenHeight,
	                        height: 0.1*screenHeight
	                    }}
	                    source={require('../images/setting.png')}
	                />
                </TouchableHighlight>

            </View>

        </View>
    );
  }

    // render(){
    //     let classId = 238;//this.props.classId
    //     return(
    //         <View style = {styles.container}>
    //             <Text>假装是班级博客</Text>
    //             {/*将classId传入作业界面*/}
    //             <Button title = '进入班级作业列表' onPress = {()=>this.props.navigation.navigate('HomeworkLists',{classId:classId})}/>
    //         </View>
    //     )
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});
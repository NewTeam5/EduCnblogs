import Config from '../config';
import api from '../api/api.js';
import {authData} from '../config'
import * as Service from '../request/request.js'
import MyAdapter from './MyAdapter.js';
import HeaderNoBackComponent from './HeaderNoBackComponent.js';
import React, { Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    Button,
    FlatList,
    TouchableHighlight
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';
const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;
const titleFontSize= MyAdapter.titleFontSize;
const abstractFontSize= MyAdapter.abstractFontSize;
const informationFontSize= MyAdapter.informationFontSize;
const btnFontSize= MyAdapter.btnFontSize;   

export default class ClassLists extends Component{
    _onPress(){

    }    

    render(){
    var data= [];   
    for(var i= 1;i<=10;i++)
    {
        data.push({
            key: i//班级ID
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
            <View
            style= {{
                flexDirection: 'row',  
                justifyContent:'space-between',
                alignItems: 'center',  
                marginTop: 0.02*screenHeight,
                marginHorizontal: 0.02*screenWidth,
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
                    Classes
                </Text>
                <TouchableHighlight
                    underlayColor="#0588fe"
                    activeOpacity={0.5}
                    style= {{
                        width:0.271*screenWidth,
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
                      Create
                    </Text>
                </TouchableHighlight>
            </View>       
            <View style= {{        
                flexDirection: 'row',  
                justifyContent:'flex-end',
                alignItems: 'center',  
                height: 0.032*screenHeight,  
                alignSelf: 'stretch',    
                marginTop: 0.01*screenHeight,  
                marginRight: 0.06*screenWidth,
            }}
            >
                <Text style= {{
                    fontSize: btnFontSize,  
                    color: '#00bfff',  
                    textAlign: 'center',  
                    marginRight: 0.02*screenWidth, 
                }}                  
                >
                    Time
                </Text>
                <Text style= {{
                    fontSize: btnFontSize,  
                    color: '#00bfff',  
                    textAlign: 'center',  
                    marginRight: 0.02*screenWidth,   
                }}                  
                >
                    Activities
                </Text>
                <Text style= {{
                    fontSize: btnFontSize,  
                    color: '#00bfff',  
                    textAlign: 'center',
                    marginRight: 0.02*screenWidth,   
                }}                  
                >
                    Members
                </Text>
                <Text style= {{
                    fontSize: btnFontSize,  
                    color: '#00bfff',  
                    textAlign: 'center',
                    marginRight: 0.02*screenWidth,   
                }}                  
                >
                    Name
                </Text>
                <Text style= {{
                    fontSize: btnFontSize,  
                    color: '#00bfff',  
                    textAlign: 'center',  
                }}                  
                >
                  Blogs
                </Text>             
            </View>
            <View style= {{        
                flexDirection: 'row',  
                justifyContent:'flex-end',
                alignItems: 'center',  
                height: 0.042*screenHeight,  
                alignSelf: 'stretch',    
                marginTop:0.02*screenHeight,
                marginHorizontal:0.02*screenWidth
            }}          
            >
            <TextInput
                style={{
                    flex:1, 
                    marginRight:0.02*screenWidth,
                    height: 0.06*screenHeight, 
                    borderColor: 'gray', 
                    borderWidth: 1
                }}
                //onChangeText= 关联函数                
            />          
            <TouchableHighlight
                underlayColor="white"
                activeOpacity={0.5}
                style= {{
                    borderRadius: 0.01*screenHeight,
                    padding: 0.01*screenHeight,
                    backgroundColor:"white",
                    borderWidth:1
                }}
                onPress={this._onPress}//关联函数                   
            >
                <Text
                    style= {{
                        fontSize: btnFontSize,  
                        color: 'black',  
                        textAlign: 'center',  
                        fontWeight: 'bold',
                    }}   
                >
                    Search
                </Text>
            </TouchableHighlight>
            </View>
            <View 
                style= {{        
                    flexDirection: 'row',  
                    justifyContent:'flex-start',
                    alignItems: 'flex-start',  
                    alignSelf: 'stretch',    
                    marginTop: 0.02*screenHeight,
                    marginLeft: 0.02*screenWidth,
                    marginRight: 0.04*screenWidth,
                    flex:1,
                }}          

            >
                <FlatList
                  data={data}
                  renderItem={
                  ({item}) => 
                  <View
                    style= {{        
                        flexDirection: 'row',  
                        justifyContent:'flex-start',
                        alignItems: 'flex-start',  
                        alignSelf: 'stretch',    
                        marginTop: 0.02*screenHeight,
                        marginLeft: 0.02*screenWidth,
                        marginRight: 0.04*screenWidth,
                        flex:1,
                    }}                            
                  >
                    <Image
                        style= {{
                            width: 0.1*screenHeight,
                            height: 0.1*screenHeight
                        }}
                        source={{uri: 'https://i.loli.net/2017/10/30/59f7235c222ae.png'}}
                    />
                    <View
                        style= {{        
                            flexDirection: 'column',  
                            justifyContent:'space-between',
                            alignItems: 'flex-start',  
                            alignSelf: 'stretch',                                
                            marginLeft: 0.02*screenWidth,
                            height: 0.1*screenHeight,
                            flex:1,
                        }}                            
                    >
                        <TouchableHighlight
                            underlayColor="transparent"
                            activeOpacity={0.5}
                            style= {{
                                alignSelf:'flex-start',
                                backgroundColor:"transparent",
                            }}
                            onPress={()=>this.props.navigation.navigate('ClassHome')}//关联函数                   
                        >
                            <Text style= {{        
                                fontSize: btnFontSize,  
                                color: '#00bfff',  
                                textAlign: 'center',  
                            }}
                            >
                                Class {item.key}
                            </Text>                 
                        </TouchableHighlight>
                        <View style= {{        
                            flexDirection: 'row',  
                            justifyContent:'flex-start',
                            alignItems: 'flex-start',  
                        }}
                        >
                            <Text style= {{
                                fontSize: btnFontSize,  
                                color: '#00bfff',  
                                textAlign: 'center',
                                marginRight: 0.02*screenWidth,   
                            }}                  
                            >
                                Info
                            </Text>
                            <Text style= {{
                                fontSize: btnFontSize,  
                                color: '#00bfff',  
                                textAlign: 'center',
                                marginRight: 0.02*screenWidth,   
                            }}                  
                            >
                                School
                            </Text>
                            <Text style= {{
                                fontSize: btnFontSize,  
                                color: '#00bfff',  
                                textAlign: 'center',  
                            }}                  
                            >
                              Tag
                            </Text>                                         
                        </View>
                    </View>                 
                  </View>
                }
                />        
            </View>    
        </View>
    );        
        // return(
        //     // <View style = {styles.container}>
        //     //     <Text>假装是班级列表</Text>
        //     //     <Button onPress = {()=>this.props.navigation.navigate('ClassHome')} title = '进入班级页面' color="#841584"/>
        //     // </View>
        // )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});
import MyAdapter from './MyAdapter.js';
import HeaderNoBackComponent from './HeaderNoBackComponent.js';
import Config from '../config';
import api from '../api/api.js';
import {authData} from '../config'
import * as Service from '../request/request.js'
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
    TouchableOpacity,
    FlatList
} from 'react-native';
const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;
const titleFontSize= MyAdapter.titleFontSize;
const abstractFontSize= MyAdapter.abstractFontSize;
const informationFontSize= MyAdapter.informationFontSize;
const btnFontSize= MyAdapter.btnFontSize;   
// 该页面使用navigate参数为classId
export default class AppInformation extends Component {
    constructor(props){
        super(props);
      }
    _onPress=()=>{
    };
    _renderItem = (item)=>{
        let item1 = item;
        var title = item1.item.title;//作业标题
        var description = item1.item.description;//作业描述
        return (
            <View>
                <TouchableOpacity
                    onPress = {()=>{}}
                    style = {styles.container}
                >
                    <Text style= {styles.titleTextStyle}>
                        {title}
                    </Text>
                    <Text style= {styles.abstractTextStyle}>
                        {description}
                    </Text>             
                </TouchableOpacity>
            </View>
        )
    }    
    _separator = () => {
        return (
            <View style={{ height: 9.75, justifyContent: 'center'}}>
            <View style={{ height: 0.75, backgroundColor: 'rgb(100,100,100)'}}/>
            <View style={{ height: 9, backgroundColor: 'rgb(235,235,235)'}}/>
            </View>
        );
    }    
    render() {
        var fills=[
            {
                title:"当前版本",
                description: "alpha"
            },
            {
                title: "意见反馈",
                description: "https://www.wjx.cn/jq/18034457.aspx"
            },
            {
                title: "项目地址",
                description: "https://github.com/NewTeam5/EduCnblogs"
            },
            {
                title: "关于博客园",
                description: "博客园创立于2004年1月，是一个面向开发者的知识分享社区。自创建以来，博客园一直致力并专注于为开发者打造一个纯净的技术交流社区，推动并帮助开发者通过互联网分享知识，从而让更多开发者从中收益。博客园的使命是帮助开发者用代码改变世界。"
            },
        ];
        var data = [];
        for (var i= 0;i<fills.length;i++){
            data.push({
                    key: i,//ID
                    title: fills[i].title,//标题
                    description: fills[i].description,//描述
            });            
        }
        return (
            <View
                style= {{
                    flexDirection: 'column',
                    justifyContent:'flex-start',
                    flex: 1,
                    backgroundColor: 'white',
                    paddingTop: 0.02*screenHeight,
                    paddingBottom: 0.02*screenHeight
                }}
            >         
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
const styles = StyleSheet.create({  
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

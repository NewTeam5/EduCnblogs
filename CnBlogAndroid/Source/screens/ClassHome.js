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
    constructor(props){
        super(props);
        this.state = {
            classname: '', // 班级名称
            universityname: '', // 大学名称
            iconurl: 'https://i.loli.net/2017/10/30/59f7235c222ae.png', // 图标地址
            bulletinCount: 0, // 公告数目
        }
    }
    _isMounted;
    componentWillMount = ()=>{
        this._isMounted = true;
        let classId = this.props.navigation.state.params.classId;
        let url = 'https://api.cnblogs.com/api/edu/schoolclass/'+classId;
        Service.Get(url).then((jsonData)=>{
            if(this._isMounted){
                this.setState({
                    classname: jsonData.nameCn,
                    universityname: jsonData.universityNameCn,
                    iconurl: jsonData.icon,
                    bulletinCount: jsonData.bulletinCount,
                })
            }
        }).catch((error) => {
            ToastAndroid.show("网络请求失败，请检查连接状态！",ToastAndroid.SHORT);
        });
    }
    componentWillUnmount=()=>{
        this._isMounted = false;
    }
    render() {
	let classId = this.props.navigation.state.params.classId;	
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
                    source={{uri: this.state.iconurl}}
                />
            </View>
            <View style= {{        
                flexDirection: 'column',
                justifyContent:'center',
                alignItems: 'center',
                marginTop:0.04*screenHeight,
            }}
            >
                <Text style= {{      
	            	alignSelf:'center',
                    fontSize: titleFontSize+10,
                    fontWeight: 'bold',
	                color: 'rgb(51,51,51)',
                    textAlign: 'center',
                    marginBottom: 0.03*screenHeight,
                }}>
                    {this.state.universityname}
                </Text>
                <Text style= {{      
	            	alignSelf:'center',
	                fontSize: titleFontSize,  
	                color: 'rgb(51,51,51)',
                    textAlign: 'center',
                    marginLeft: 0.15*screenWidth,
                    marginRight: 0.15*screenWidth,
                    marginBottom: 0.02*screenHeight
                }}>
                    {this.state.classname}
                </Text>
            </View>
            <View style= {{        
                flexDirection: 'column',
                justifyContent:'center',
                alignItems: 'center',
                flex: 1
            }}      	
            >
                <TouchableOpacity
                    style= {styles.button}
                    onPress={()=>this.props.navigation.navigate('HomeworkLists',{classId:classId})}//关联函数                   
                >
	                <Text style = {{fontSize: 20, color: 'rgb(51,51,51)'}}>所有作业</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style= {styles.button}
                    onPress={()=>this.props.navigation.navigate('ClassMember',{classId:classId})}//关联函数                   
                >
                    <Text style = {{fontSize: 20, color: 'rgb(51,51,51)'}}>班级成员</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    button: {
        height: 0.2*0.618*screenWidth,
        width: 0.618*screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: 'rgb(51,204,255)',  
        marginBottom: 20,
    }
});
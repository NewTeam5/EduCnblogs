import Config from '../config';
import api from '../api/api.js';
import {authData} from '../config';
import * as Service from '../request/request.js';
import MyAdapter from './MyAdapter.js';
import HeaderNoBackComponent from './HeaderNoBackComponent.js'
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
} from 'react-native';

const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;
const titleFontSize= MyAdapter.titleFontSize;
const abstractFontSize= MyAdapter.abstractFontSize;
const informationFontSize= MyAdapter.informationFontSize;
const btnFontSize= MyAdapter.btnFontSize;   

export default class HomeworkLists extends Component {
    constructor(props){
        super(props);
        this.state = {
            homeworks: [],
            counts: 0,
        }
    }
    //暂定班级ID为111,应该传进来班级ID作为属性
    componentDidMount = ()=>{
        let classId = this.props.navigation.state.params.classId;
        let url = Config.apiDomain + api.ClassGet.homeworkList + "/false/"+classId+"/1-12";
        // 先获取作业数量，再按作业数量获取作业信息列表
        Service.Get(url).then((jsonData)=>{
            this.setState({
                counts: jsonData.totalCount,
            });
        })
        .then(()=>{
            let url = Config.apiDomain + api.ClassGet.homeworkList + "/false/"+classId+"/"+1+"-"+this.state.counts;
            Service.Get(url).then((jsonData)=>{
                this.setState({
                    homeworks: jsonData.homeworks,
                });
            })
        })
    };
    _onPress = ()=>{
        this.props.navigation.navigate('HomeworkPost');
    };
    _renderItem = (item)=>{
        let item1 = item;
        var title = item1.item.title;//作业标题
        var description = item1.item.description;//作业描述
        var deadline = item1.item.deadline;//作业截止日期
        var url = item1.item.url;//作业地址
        return (
            <View>
                <TouchableOpacity
                    onPress = {()=>this.props.navigation.navigate('HomeworkDetail',{url: url})}
                    style = {HomeworkStyles.container}
                >
                    <Text style= {HomeworkStyles.titleTextStyle}>
                        {title}
                    </Text>
                    <Text style= {HomeworkStyles.abstractTextStyle}>
                        {description}...
                    </Text>				
                    <Text style= {HomeworkStyles.informationTextStyle}>
                        截止于:{deadline.split('T')[0]+' '+deadline.split('T')[1].substring(0,8)}
                    </Text>
                </TouchableOpacity>
                <View
                    style= {{height:1,backgroundColor:'gray'}}
                >
                </View>
            </View>
        )
    }
    render() {
        var data = [];
        for(var i in this.state.homeworks)
        {
            data.push({
                key: this.state.homeworks[i].homeworkId,//作业ID
                title: this.state.homeworks[i].title,//作业标题
                url: this.state.homeworks[i].url,//作业网址
                description: this.state.homeworks[i].description,//作业描述
                deadline: this.state.homeworks[i].deadline,//作业截止日期
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
            {/*<HeaderNoBackComponent
              text= "ClassName"
            />*/}
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
                    Homeworks
                </Text>
                <TouchableHighlight
                    underlayColor="#0588fe"
                    activeOpacity={0.5}
                    style= {{
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
                      New HomeWork
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
                    NoReply
                </Text>
                <Text style= {{
                    fontSize: btnFontSize,  
                    color: '#00bfff',  
                    textAlign: 'center',  
                    marginRight: 0.02*screenWidth,   
                }}      			
                >
                    Rank
                </Text>
                <Text style= {{
                    fontSize: btnFontSize,  
                    color: '#00bfff',  
                    textAlign: 'center',
                    marginRight: 0.02*screenWidth,   
                }}      			
                >
                    Essense
                </Text>
                <Text style= {{
                    fontSize: btnFontSize,  
                    color: '#00bfff',  
                    textAlign: 'center',  
                }}      			
                >
                  All
                </Text>      		
            </View>
            <View style= {{        
                flexDirection: 'row',  
                justifyContent:'flex-end',
                alignItems: 'center',  
                height: 0.042*screenHeight,  
                alignSelf: 'stretch',    
                marginTop:0.01*screenHeight,
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
              //renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
                renderItem={this._renderItem}
            />
          </View>
      </View>
    );
  }
}


const HomeworkStyles = StyleSheet.create({  
    container: {  
        flexDirection: 'column',  
        justifyContent:'flex-start',
        alignItems: 'flex-start',  
        flex:1,
        alignSelf: 'stretch',          
    },
    titleTextStyle:{
        fontSize: titleFontSize,  
        color: '#000000',  
        textAlign: 'center',  
        fontWeight: 'bold',
    },
    abstractTextStyle:{
        fontSize: abstractFontSize,  
        color: '#000000',  
        textAlign: 'left',          
    },
    informationTextStyle:{
        alignSelf: "flex-end",
        fontSize: informationFontSize,  
        color: '#000000',  
        textAlign: 'center',          
    }
});  

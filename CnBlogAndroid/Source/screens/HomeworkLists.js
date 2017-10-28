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
    FlatList,
    TouchableOpacity
} from 'react-native';

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
        let url = Config.apiDomain + api.ClassGet.homeworkList + "/false/111/1-12";
        // 先获取作业数量，再按作业数量获取作业信息列表
        Service.Get(url).then((jsonData)=>{
            this.setState({
                counts: jsonData.totalCount,
            });
        })
        .then(()=>{
            let url = Config.apiDomain + api.ClassGet.homeworkList + "/false/111/"+1+"-"+this.state.counts;
            Service.Get(url).then((jsonData)=>{
                this.setState({
                    homeworks: jsonData.homeworks,
                });
            })
        })
    };
    _onPress(){

    }
    _renderItem = (item)=>{
        let item1 = item;
        var title = item1.item.title;//作业标题
        var description = item1.item.description;//作业描述
        var deadline = item1.item.deadline;//作业截止日期
        var url = item1.item.url;//作业地址
        return (
            <TouchableOpacity
                onPress = {()=>this.props.navigation.navigate('HomeworkDetail',{url: url})}
                style = {HomeworkStyles.container}
            >
                <Text style= {HomeworkStyles.titleTextStyle}>
                    {title}
                </Text>
                <Text style= {HomeworkStyles.abstractTextStyle}>
                    {description}
                </Text>				
                <Text style= {HomeworkStyles.informationTextStyle}>
                    截止于:{deadline}
                </Text>
            </TouchableOpacity>
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
            style= {{flexDirection: 'column',flex: 1}}
        >
            <HeaderNoBack
              text= "ClassName"
            />
            <View
              style= {{height:2,backgroundColor:'#000000'}}  		
            >
            </View>
            <View
            style= {{
                flexDirection: 'row',  
                justifyContent:'space-between',
                alignItems: 'center',  
                height: 40,  
                alignSelf: 'stretch',          
            }}  		
            >
                <Text
                    style= {{  
                        width: 200,
                        height: 40,  
                        //alignSelf: 'flex-start',
                        marginTop: 10,
                        fontSize: 30,  
                        color: '#000000',  
                        textAlign: 'center',  
                        fontWeight: 'bold',
                    }}  		
                >
                    HomeWorks
                </Text>
                <View
                    style= {{        
                    width: 200,
                    height: 40,  	      			
                      //alignSelf: 'flex-end',      				
                    marginTop: 20,
                    alignItems: 'center',
                }}
                >
                    <TouchableHighlight
                        underlayColor="#0588fe"
                        activeOpacity={0.5}
                        style= {{
                            borderRadius: 8,padding: 8,backgroundColor:"#0588fe"
                        }}
                        onPress={this._onPress}//关联函数
                    >
                        <Text
                            style= {{
                                fontSize: 20,  
                                color: '#ffffff',  
                                textAlign: 'center',  
                                fontWeight: 'bold',
                            }}   
                        >
                          New HomeWork
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
            <View style= {{        
                flexDirection: 'row',  
                justifyContent:'flex-end',
                alignItems: 'center',  
                height: 40,  
                alignSelf: 'stretch',    
                marginTop:10,  
                marginRight: 100
            }}
            >
                <Text style= {{
                    fontSize: 20,  
                    color: '#00bfff',  
                    textAlign: 'center',  
                    marginRight:10
                }}      			
                >
                    NoReply
                </Text>
                <Text style= {{
                    fontSize: 20,  
                    color: '#00bfff',  
                    textAlign: 'center',  
                    marginRight:10  
                }}      			
                >
                    Rank
                </Text>
                <Text style= {{
                    fontSize: 20,  
                    color: '#00bfff',  
                    textAlign: 'center',
                    marginRight:10  
                }}      			
                >
                    Essense
                </Text>
                <Text style= {{
                    fontSize: 20,  
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
                height: 40,  
                alignSelf: 'stretch',    
                marginTop:10,
                marginHorizontal:30
            }}      	
            >
            <TextInput
                style={{flex:1, marginRight:20,height: 40, borderColor: 'gray', borderWidth: 1}}
                //onChangeText= 关联函数        		
            />      	
            <TouchableHighlight
                underlayColor="white"
                activeOpacity={0.5}
                style= {{
                    borderRadius: 8,
                    padding: 8,
                    backgroundColor:"white",
                    borderWidth:1
                }}
                onPress={this._onPress}//关联函数      				
            >
                <Text
                    style= {{
                        fontSize: 20,  
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
                marginTop:10,
                marginHorizontal:30,
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

/*class Homework extends Component{//每一项作业
    render(){
        return (
            <View
                  style= {HomeworkStyles.container}      	
            >
                <Text
                    style= {HomeworkStyles.titleTextStyle}
                >
                {this.props.title}
                </Text>
                <Text
                    style= {HomeworkStyles.abstractTextStyle}
                >
                {this.props.abstract}
                </Text>				
                <Text
                    style= {HomeworkStyles.informationTextStyle}
                >
                {this.props.information}
                </Text>								
            </View>
        );
    }
}*/
const HomeworkStyles = StyleSheet.create({  
    container: {  
        flexDirection: 'column',  
        justifyContent:'flex-start',
        alignItems: 'flex-start',  
        flex:1,
        alignSelf: 'stretch',          
    },
    titleTextStyle:{
        fontSize: 30,  
        color: '#000000',  
        textAlign: 'center',  
        fontWeight: 'bold',
    },
    abstractTextStyle:{
        fontSize: 20,  
        color: '#000000',  
        textAlign: 'center',          
    },
    informationTextStyle:{
        alignSelf: "flex-end",
        fontSize: 20,  
        color: '#000000',  
        textAlign: 'center',          
    }
});  
class HeaderNoBack extends Component {//标题栏  
    render() {  
        return (  
                <View style={HeaderNoBackStyles.container}> 
                    <View style= {HeaderNoBackStyles.imageStyle}>
                        <Image                 			
                            source= {require('../images/1.png')}//头像
                        />
                    </View> 
                    <View style={HeaderNoBackStyles.textview}>  
                        <Text style={HeaderNoBackStyles.textstyle}>{this.props.text || "标题头"}</Text>  
                    </View>  
                </View>  
        );  
    }  
}  
  
const HeaderNoBackStyles = StyleSheet.create({  
    container: {  
        flexDirection: 'row',  
        alignItems: 'center',  
        height: 60,  
        alignSelf: 'stretch',          
    },
    imageView:{
        flex: 1,
        alignSelf: 'flex-start'
    },
    imageStyle:{

    }, 
    textview: {  
        flex: 1,  
        alignSelf: 'center',  
    },  
    textstyle: {  
        fontSize: 30,  
        color: '#000000',  
        textAlign: 'center',  
        fontWeight: 'bold',
    },  
});  
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
    TouchableOpacity,
    Dimensions,
    PixelRatio,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;      //设备的宽度
const screenHeight = Dimensions.get('window').height;    //设备的高度
const defaultPixel = 3;                           //开发设备的像素密度
const fontRatio= PixelRatio.get()/PixelRatio.getFontScale(); //字体缩放比率
const scale = Math.min( screenWidth / 360*defaultPixel,screenHeight / 592*defaultPixel);   //获取缩放比例
function setSpText(size: number) {
    size = Math.round((size * scale + 0.5) * fontRatio);
    //size= size*fontRatio;
    return size/defaultPixel;
}
const titleFontSize= setSpText(8);
const abstractFontSize= setSpText(4);
const informationFontSize= setSpText(4);
const btnFontSize= setSpText(4);

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
            <View>
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
            style= {{flexDirection: 'column',flex: 1}}
        >
            <HeaderNoBack
              text= "ClassName"
            />
            <View
              style= {{height:1,backgroundColor:'#000000'}}  		
            >
            </View>
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
                    height: 0.041*screenHeight, 
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
                marginHorizontal: 0.02*screenWidth,
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
        fontSize: titleFontSize,  
        color: '#000000',  
        textAlign: 'center',  
        fontWeight: 'bold',
    },
    abstractTextStyle:{
        fontSize: abstractFontSize,  
        color: '#000000',  
        textAlign: 'center',          
    },
    informationTextStyle:{
        alignSelf: "flex-end",
        fontSize: informationFontSize,  
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
        height: screenHeight/12,  
        alignSelf: 'stretch',          
    },
    imageView:{
        flex: 1,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 0.2*screenWidth
    },
    imageStyle:{

    }, 
    textview: {  
        flex: 1,  
        alignSelf: 'center',  
    },  
    textstyle: {  
        fontSize: titleFontSize,  
        color: '#000000',  
        textAlign: 'center',  
        fontWeight: 'bold',
    },  
});  
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
    constructor(props){
        super(props);
        this.state={
            classes: [],
            imgs: [],
        }
    }
    _separator = () => {
        return <View style={{ height: 1, backgroundColor: 'rgb(204,204,204)' }}/>;
    }
    componentDidMount=()=>{
        let url = 'https://api.cnblogs.com/api/edu/member/schoolclasses';
        Service.Get(url).then((jsonData)=>{
            this.setState({
                classes: jsonData,
            })
        }).then(()=>{
            for(var i in this.state.classes)
            {
                let url2 = 'https://api.cnblogs.com/api/edu/schoolclass/'+this.state.classes[i].schoolClassId;
                Service.Get(url2).then((jsonData)=>{
                    this.setState({
                        imgs: this.state.imgs.concat(jsonData.icon),
                    })
                })
            }
        })    }
    render(){
    var data= [];   
    for(var i in this.state.classes)
    {
        data.push({
            key: this.state.classes[i].schoolClassId,
            nameCn: this.state.classes[i].nameCn,
            universityNameCn: this.state.classes[i].universityNameCn,
            imgurl: this.state.imgs[i],
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

        <View style= {{        
            flexDirection: 'row',  
            justifyContent:'flex-start',
            alignItems: 'center',  
            backgroundColor: '#1C86EE',
            height: screenHeight/12,
            paddingLeft: 0.05*screenWidth,
        }}>
            <Text style = {{fontSize: 18, fontWeight: 'bold', color:'white'}}>班级列表</Text>
        </View>

            <View 
                style= {{        
                    flexDirection: 'row', 
                    justifyContent:'flex-start',
                    alignItems: 'flex-start',  
                    alignSelf: 'stretch',
                    marginLeft: 0.02*screenWidth,
                    marginRight: 0.04*screenWidth,
                    flex:1,
                }}          

            >
                <FlatList
                    data={data}
                    ItemSeparatorComponent={this._separator}
                    renderItem={
                        ({item}) => 
                            <TouchableOpacity style= {{        
                                flexDirection: 'row',  
                                justifyContent:'flex-start',
                                alignItems: 'flex-start',  
                                alignSelf: 'stretch',    
                                marginTop: 0.02*screenHeight,
                                marginLeft: 0.02*screenWidth,
                                marginRight: 0.04*screenWidth,
                                flex:1,
                            }}
                                onPress={()=>this.props.navigation.navigate('ClassHome',{classId:item.key})}
                            >
                            <Image style= {{
                                width: 0.1*screenHeight,
                                height: 0.1*screenHeight
                            }}
                                source={{uri: item.imgurl}}
                            />
                            <View style= {{        
                                flexDirection: 'column',  
                                justifyContent:'center',
                                alignItems: 'flex-start',  
                                alignSelf: 'stretch',                                
                                marginLeft: 0.02*screenWidth,
                                height: 0.1*screenHeight,
                                flex:1,
                            }}>
                                <View
                                    style= {{
                                        alignSelf:'flex-start',
                                        backgroundColor:"transparent",
                                    }}             
                                >
                                    <Text style= {{
                                        fontSize: titleFontSize-5,  
                                        color: 'rgb(51,51,51)',  
                                        textAlign: 'center',
                                    }}>
                                        {item.universityNameCn}
                                    </Text>                 
                                </View>
                                <View style= {{        
                                    flexDirection: 'row',
                                    justifyContent:'flex-start',
                                    alignItems: 'flex-start',
                                }}>
                                    <Text style= {{
                                        fontSize: btnFontSize+2,
                                        color: 'rgb(51,51,51)',  
                                        textAlign: 'center',
                                        marginRight: 0.02*screenWidth,   
                                    }}>
                                        {item.nameCn}
                                    </Text>                             
                                </View>
                            </View>
                        </TouchableOpacity>
                    }/>
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
});
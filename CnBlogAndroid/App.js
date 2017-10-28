import Config from './Source/config';
import api from './Source/api/api.js';
import {authData} from './Source/config'
import * as Service from './Source/request/request.js'

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  AppRegistry,
  TouchableHighlight
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
import HomeworkDetail from './Source/screens/HomeworkDetail'
import HomeworkLists from './Source/screens/HomeworkLists'
//var token;

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            title : '',
            count : '',
        };
    }
    
    render() {
    const {navigate} = this.props.navigation;
    return (
        <View style={styles.container}>		
        <TouchableHighlight 
            underlayColor="rgb(181, 136, 254)"
            activeOpacity={0.5}  
            style={{ borderRadius: 8,padding: 8,marginTop:5,backgroundColor:"#0588fe"}}
//          onPress={this.getInfo.bind(this)}
            onPress = {()=>navigate('HomeworkLists')}
        >
        <Text style={{fontSize:20}}>班级111的作业</Text>
        </TouchableHighlight>
        </View>
    );
    }
   
    getInfo(){	  
        //在这里需要把url包装好，如何包装，具体请看博客园api帮助
        //这里一定要注意网络请求的同步异步问题！！！！
        let url = Config.apiDomain + api.ClassGet.info + "/111";
        Service.Get(url).then((jsonData)=>{ToastAndroid.show(jsonData.nameEn,ToastAndroid.LONG)});	  
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

const SimpleNavigation = StackNavigator({
    Home: {
        screen: App,
        navigationOptions: {
            header: null,
        },
    },
    HomeworkLists: {
        screen: HomeworkLists,
        navigationOptions: {
            header: null,/*
            headerTitle: '作业列表',
            headerStyle: {
                height: 40,
                backgroundColor: 'rgb(51,204,255)',
            }*/
        },
    },
    HomeworkDetail: {
        screen: HomeworkDetail,
        navigationOptions: {
            headerTitle: '作业详情',
            headerStyle: {
                height: 40,
                backgroundColor: 'rgb(51,204,255)',
            }
        },
    }
},{
    initialRouteName: 'Home',
});
export default SimpleNavigation;
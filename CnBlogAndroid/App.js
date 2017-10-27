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

//var token;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
var token = "";
export default class App extends Component<{}> {
	constructor(props){
		super(props)
		this.state = {
			title : '',
			count : '',
		};
	}
	
  render() {
    return (
      <View style={styles.container}>		
		<TouchableHighlight 
          underlayColor="rgb(181, 136, 254)"
          activeOpacity={0.5}  
          style={{ borderRadius: 8,padding: 8,marginTop:5,backgroundColor:"#0588fe"}}
          onPress={this.getInfo.bind(this)}
          >
             <Text style={{fontSize:20}}>GetInfo</Text>
        </TouchableHighlight>
        <Text>title：{this.state.title}</Text>
        <Text>releaseYear：{this.state.year}</Text>
      </View>
    );
  }
   
  getInfo(){	  
  //在这里需要把url包装好，如何包装，具体请看博客园api帮助
  //这里一定要注意网络请求的同步异步问题！！！！
	  let url = Config.apiDomain + api.ClassGet.info + "/111";
	  Service.get(url);	  
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

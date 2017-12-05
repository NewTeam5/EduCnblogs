import Config from '../config';
import api from '../api/api.js';
import {authData,err_info} from '../config'
import * as Service from '../request/request.js'
import MyAdapter from './MyAdapter.js';
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
    FlatList,
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';
const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;
// 本页面接受博客名blogApp和博文编号Id,原评论数量CommentCount作为参数
export default class CommentAdd extends Component{
    constructor(props){
        super(props);
        this.state = {
            text : '',
        }
    }  
    onSubmit = ()=>{
        let blogApp = this.props.navigation.state.params.blogApp;
        let Id = this.props.navigation.state.params.Id;
		let add_url = Config.apiDomain + "api/blogs/" + blogApp + "/posts/" + Id + "/comments"
        let content1 = this.state.text;
        let content = JSON.stringify({body: content1});
		Service.UserAction(add_url,content,"POST").then((result)=>{
			if(result.status == 200){
				ToastAndroid.show("添加成功，请刷新查看！",ToastAndroid.SHORT);
                this.refs.commentRef.clear();
                this.props.navigation.goBack();
			}
			else{
				ToastAndroid.show("添加失败，请稍后重试！",ToastAndroid.SHORT);
			}
		}).catch((error) => {
            ToastAndroid.show(err_info.NO_INTERNET,ToastAndroid.SHORT);
        });
    }
	
    render(){
        return(
            <View style = {styles.container}>
                <TextInput ref="commentRef"
                    style={styles.textcontainer}
                    onChangeText={(text) => this.setState({text: text})}
                    value={this.state.text}
                    multiline={true}
                    underlineColorAndroid="transparent"
					accessibilityLabel = "CommentAdd_inputBox"
                />
                <View style={{flex:1}}>
                <Text style = {{color: 'rgb(51,51,51)',fontSize: 15}}>回复请在评论第一行写上:@用户昵称</Text>
                </View>
                <TouchableOpacity
                    style= {styles.button}
                    onPress = {this.onSubmit.bind(this)}
                >
                    <Text style = {{fontSize: 20, color: 'rgb(51,51,51)'}} accessibilityLabel = 'CommentAdd_submit'>提交</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    textcontainer: {
        color: 'black',
        flex: 5,
        backgroundColor: 'rgb(225,225,225)',
        height: 0.5*screenHeight,
        width: 0.8*screenWidth,
        textAlignVertical: 'top',
        marginTop: 0.1*screenHeight,
        marginBottom: 0.01*screenHeight,
    },
    button: {
        height: 0.2*0.618*screenWidth,
        width: 0.618*screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: 'rgb(51,204,255)',  
        marginTop: 0.05*screenHeight,
        marginBottom: 0.05*screenHeight,
    }
});
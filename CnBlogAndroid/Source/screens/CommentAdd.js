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
    Modal
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
            modalVisible: false,
            length: 0,
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
    
    _separator = () => {
        return <View style={{ height: 1, backgroundColor: 'rgb(204,204,204)' }}/>;
    }
    _renderItem = (item)=>{
        let item1 = item;
        let {Author,FaceUrl} = item1.item;
        return(
            <TouchableOpacity
                 style = {styles.listcontainer}
                 onPress = {()=>{
                     this.setState({modalVisible:false, text: this.state.text + ' ' + Author})}}
            >
                <View style = {{flex:1}}>
                    <Image source = {FaceUrl?{uri:FaceUrl}:require('../images/defaultface.png')} style = {styles.facestyle}/>
                </View>
                <View style = {styles.textcontainer1}>
                    <Text style = {{fontSize: 15, fontWeight: 'bold', color: 'black'}}>{Author}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    onShow(text){
        this.setState({text: text});
        var Authors = this.props.navigation.state.params.Authors;
        if(text.length >this.state.length && text[text.length - 1] == '@' && Authors.length != 0){
            this.setState({modalVisible:true});
        }
        this.setState({length:text.length});
    }
    
    render(){
        return(
            <View style = {styles.container}>
                <Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setState({modalVisible:false})}
                >
                    <View style = {styles.container}>
                    <FlatList
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        data={this.props.navigation.state.params.Authors}
                        onRefresh = {this.UpdateData}
                        refreshing= {false}
                    />
                
                    </View>
                </Modal>
                <TextInput ref="commentRef"
                    style={styles.textcontainer}
                    onChangeText={(text) => this.onShow(text)}
                    defaultValue={
                        this.state.text != ''? this.state.text :
                        (this.props.navigation.state.params.Author!=''?'@'+' '+this.props.navigation.state.params.Author+'\n':'')}
                    multiline={true}
                    underlineColorAndroid="transparent"
                    accessibilityLabel = "CommentAdd_inputBox"
                    autoCorrect = {false}
                    blurOnSubmit={false}
                />
                <View style={{flex:1}}>
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
    listcontainer: {
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems: 'flex-start',  
        flex:1,
        backgroundColor: 'white',
        width: screenWidth-20,
        marginLeft: 8,
        marginRight: 12,
        marginBottom: 5,
    },
    facestyle: {
        width: 40,
        height: 40,
        marginTop: 5,
    },
    textcontainer1: {
        justifyContent:'flex-start',
        alignItems: 'flex-start',  
        flex: 6,
        backgroundColor: 'white',
    },
    button: {
        height: screenHeight/14,
        width: screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        backgroundColor: '#1C86EE',  
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
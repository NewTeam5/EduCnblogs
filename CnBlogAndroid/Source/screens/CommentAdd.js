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
import {ListItem, Thumbnail, Button, Item} from 'native-base';
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
                     this.setState({modalVisible:false, text: this.state.text + ' ' + Author + '\n'})}}
            >
                <ListItem
                onPress = {()=>{
                     this.setState({modalVisible:false, text: this.state.text + ' ' + Author + '\n'})}}
                >
                    <Thumbnail source={FaceUrl?{uri:FaceUrl}:require('../images/defaultface.png')} />
                    <Text style = {{fontWeight:'Medium', fontSize:18, color: 'black', marginLeft:8}}>{Author}</Text>                    
                </ListItem>
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
                <Item regular style = {{marginTop: 0.05*screenHeight,width: 0.95*screenWidth, borderColor: 'gray'}}>
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
                </Item>
                <TouchableOpacity
                    style= {styles.button}
                    onPress = {this.onSubmit.bind(this)}
                >
                    <Text style = {{fontSize: 18, color: 'white'}} accessibilityLabel = 'CommentAdd_submit'>提交</Text>
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
    textcontainer: {
        color: 'black',
        flex: 5,
        height: 250,
        width: 0.95*screenWidth,
        textAlignVertical: 'top',
        //borderColor: 'rgb(225,225,225)',
        //borderWidth: 1,
    },
    button: {
        height: 0.18*0.618*screenWidth,
        width: 0.2 * screenWidth,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'flex-end',
        borderRadius: 4,
        backgroundColor: '#1C86EE',  
        marginTop: 0.05*screenHeight,
        marginBottom: 0.05*screenHeight,
        marginRight: 0.025*screenWidth,
    }
});
import Config from '../config';
import api from '../api/api.js';
import {authData} from '../config'
import * as Service from '../request/request.js'
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
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

export default class UserInformation extends Component{
    render(){
        return(
            <View style = {styles.container}>
                <Text>假装是用户信息</Text>
                <Button title = '退出登录' onPress = {()=>this.props.navigation.navigate('Home')}/>
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
});
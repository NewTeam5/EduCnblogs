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
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

export default class Notice extends Component{
    render(){
        return(
            <View style = {styles.container}>
                <Text>假装是消息提示</Text>
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
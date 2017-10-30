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

export default class ClassLists extends Component{
    render(){
        return(
            <View style = {styles.container}>
                <Text>假装是班级列表</Text>
                <Button onPress = {()=>this.props.navigation.navigate('ClassHome')} title = '进入班级页面' color="#841584"/>
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
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
    Button,
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
// 此页面应该传入classId作为属性
// 现在暂时Id为238(BUAA软工的ID)
export default class ClassHome extends Component{
    render(){
        let classId = 238;//this.props.classId
        return(
            <View style = {styles.container}>
                <Text>假装是班级博客</Text>
                {/*将classId传入作业界面*/}
                <Button title = '进入班级作业列表' onPress = {()=>this.props.navigation.navigate('HomeworkLists',{classId:classId})}/>
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
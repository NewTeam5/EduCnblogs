import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    AppRegistry,
    TouchableOpacity,
    FlatList,
    Dimensions,
    WebView,
    Alert
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
const { height, width } = Dimensions.get('window');
export default class ContactPage extends Component{
    render(){
        return(
            <View style = {{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                flex:1
            }}>
                <WebView
                    source={{uri: this.props.navigation.state.params.url}}
                    style={{height: height-40, width: width}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    onError = {()=>{console.disableYellowBox = true;Alert.alert('网络异常，请稍后再试！')}}
                    
                />
            </View>
        )
    }
}
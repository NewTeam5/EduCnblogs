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
} from 'react-native';
import {
    StackNavigator,
} from 'react-navigation';
const { height, width } = Dimensions.get('window');
export default class HomeWorkDetail extends Component{
    render(){
        return(
            <View style = {{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF',
                flex:1}}
            >
                <WebView
                    source={{uri: 'https://edu.cnblogs.com'+this.props.navigation.state.params.url}}
                    style={{height: height-40, width: width}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                />
            </View>
        )
    }
}
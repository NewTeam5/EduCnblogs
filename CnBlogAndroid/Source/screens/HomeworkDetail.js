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
export default class HomeWorkDetail extends Component{
    render(){
        return(
            <View style = {{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                flex:1
            }}>
                <WebView
                    source={{uri: 'https://edu.cnblogs.com'+this.props.navigation.state.params.url}}
                            //'https://oauth.cnblogs.com/connect/authorize?client_id=FAA81E2E-3982-4830-8F32-629E2695D0EE&scope=openid profile CnBlogsApi&response_type=code id_token&redirect_uri=https://oauth.cnblogs.com/auth/callback&state=abc&nonce=xyz'}}
                    style={{height: height-40, width: width}}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    onError = {()=>Alert.alert('网络异常，请稍后再试！')}
                />
            </View>
        )
    }
}
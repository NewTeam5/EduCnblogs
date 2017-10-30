import Config from './Source/config';
import api from './Source/api/api.js';
import {authData} from './Source/config'
import * as Service from './Source/request/request.js'
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    AppRegistry,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';
import HomeworkDetail from './Source/screens/HomeworkDetail'
import HomeworkLists from './Source/screens/HomeworkLists'
import PersonalBlog from './Source/screens/PersonalBlog'
import ClassLists from './Source/screens/ClassLists'
import Notice from './Source/screens/Notice'
import UserInformation from './Source/screens/UserInformation'
import ClassHome from './Source/screens/ClassHome'

const { height, width } = Dimensions.get('window');
class App extends Component {
    render() {
    const {navigate} = this.props.navigation;
    return (
        <View style={styles.container}>		
            <Loginer loginSuccess = {() => navigate('AfterloginTab')}/>
        </View>
    );
    }
}
// 在App中调用的登录界面组件
class Loginer extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }
    OnUsnChanged = (newusn)=>{
        this.setState({
            username: newusn,
        });
    };
    OnPwdChanged = (newpwd)=>{
        this.setState({
            password: newpwd,
        });
    };
    mylogin = () => {
        if (this.state.username === 'admin' && this.state.password === '123456') {
            ToastAndroid.show('登录成功',ToastAndroid.SHORT);
            this.props.loginSuccess();
        } 
        else
        {
            ToastAndroid.show('登录失败',ToastAndroid.SHORT);
        }
    };
    render(){
        return(
            <View style = {styles.container}>
                <Image source = {require('./Source/images/logo.png')} style = {styles.image}/>
                <View style = {{height: 30}}></View>
                <View style = {styles.inputBox}>
                    <Image source = {require('./Source/images/usn.png')} style = {styles.inputimg}/>
                    <TextInput 
                        style = {styles.input}
                        placeholderTextColor={'rgb(204,204,204)'}
                        placeholder={'username'}
                        underlineColorAndroid={'transparent'}
                        onChangeText = {this.OnUsnChanged}
                    />
                </View>
                <View style = {styles.inputBox}>
                    <Image source = {require('./Source/images/pwd.png')} style = {styles.inputimg}/>
                    <TextInput 
                        style = {styles.input}
                        secureTextEntry={true}
                        placeholderTextColor={'rgb(204,204,204)'}//提示文本的颜色
                        placeholder={'password'}//提示文本内容
                        underlineColorAndroid={'transparent'}
                        onChangeText = {this.OnPwdChanged}
                    />
                </View>
                <TouchableOpacity style={styles.loginbutton} onPress = {this.mylogin}>
                    <Text style={styles.btText}>登 录</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    item: {
        padding: 2,
        fontSize: 18,
        height: 30,
    },
    input: {
        width: 200,
        height: 40,
        color: 'white',
    },
    inputBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 280,
        height: 50,
        borderRadius: 8,
        backgroundColor: 'rgb(51,153,255)',
        marginBottom: 8,
    },
    loginbutton: {
        height: 50,
        width: 280,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: 'rgb(51,153,255)',    
        marginBottom: 8,
    },
    inputimg: {
        width: 30,
        height: 30,
    },
    btText: {
        color: '#fff',
    },
    image: {
        height: height/9,
        width: width/2,
        resizeMode: 'stretch',
    }
});
const HomeTab = TabNavigator({
    PersonalBlog: {
        screen: PersonalBlog,
        navigationOptions: {
            tabBarLabel: '我的博客'
        }
    },
    ClassLists: {
        screen: ClassLists,
        navigationOptions: {
            tabBarLabel: '我的班级',

        }
    },
    Notice: {
        screen: Notice,
        navigationOptions: {
            tabBarLabel: '消息'
        }
    },
    UserInformation: {
        screen: UserInformation,
        navigationOptions: {
            tabBarLabel: '我'
        }
    },
},{
    tabBarPosition: 'bottom',
    initialRouteName: 'PersonalBlog',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
//        showIcon: true,
        showLabel: true,
        style: {
//            height: 30,
        },
        labelStyle: {
            //fontSize: 14
        }
    },
})

const SimpleNavigation = StackNavigator({
    Home: {
        screen: App,
        navigationOptions: {
            header: null,
        },
    },
    HomeworkLists: {
        screen: HomeworkLists,
        navigationOptions: {
            headerTitle: '作业列表',
            headerStyle: {
                height: 40,
                backgroundColor: 'rgb(51,204,255)',
            }
        },
    },
    HomeworkDetail: {
        screen: HomeworkDetail,
        navigationOptions: {
            headerTitle: '作业详情',
            headerStyle: {
                height: 40,
                backgroundColor: 'rgb(51,204,255)',
            }
        },
    },
    PersonalBlog: {
        screen: PersonalBlog,
        navigationOptions: {
            header: null,
        }
    },
    ClassLists: {
        screen: ClassLists,
        navigationOptions: {
            header: null,
        }
    },
    Notice: {
        screen: Notice,
        navigationOptions: {
            header: null,
        }
    },
    UserInformation: {
        screen: UserInformation,
        navigationOptions: {
            header: null,
        }
    },
    AfterloginTab: {
        screen: HomeTab,
        navigationOptions: {
            header: null,
        }
    },
    ClassHome: {
        screen: ClassHome,
        navigationOptions: {
            headerTitle: '班级博客',
            headerStyle: {
                height: 40,
                backgroundColor: 'rgb(51,204,255)',
            }
        }
    }
},{
    initialRouteName: 'Home',
});
export default SimpleNavigation;
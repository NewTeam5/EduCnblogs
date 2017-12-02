import {url} from 'url'
import Config from './Source/config';
import api from './Source/api/api.js';
import {authData} from './Source/config'
import {StorageKey} from './Source/config'
import * as Service from './Source/request/request.js'
import * as storage from './Source/Storage/storage.js'
import fetch from 'react-native-fetch-polyfill'
import React, { Component,} from 'react';
import CookieManager from 'react-native-cookies'

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
    WebView,
    AsyncStorage,
    Alert,
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,
    NavigationActions
} from 'react-navigation';

import HomeworkDetail from './Source/screens/HomeworkDetail'
import HomeworkLists from './Source/screens/HomeworkLists'
import PersonalBlog from './Source/screens/PersonalBlog'
import ClassLists from './Source/screens/ClassLists'
import Notice from './Source/screens/Notice'
import UserInformation from './Source/screens/UserInformation'
import ClassHome from './Source/screens/ClassHome'
import HomeworkPost from './Source/screens/HomeworkPost'
import BlogDetail from './Source/screens/BlogDetail'
import BlogComment from './Source/screens/BlogComment'
import ClassMember from './Source/screens/ClassMember'
import ClassMemberAdd from './Source/screens/ClassMemberAdd'
import MemberBlog from './Source/screens/MemberBlog'
import ClassCreate from './Source/screens/ClassCreate'
import PersonalSettings from './Source/screens/PersonalSettings'
import CommentAdd from './Source/screens/CommentAdd'
import AppInformation from './Source/screens/AppInformation'
import ScheduleReminding from './Source/screens/ScheduleReminding'

import ContactPage from './Source/screens/ContactPage'
import Submitted from './Source/screens/Submitted';
import HomeworkSubmit from './Source/screens/HomeworkSubmit'
const { height, width } = Dimensions.get('window');
const CODE_URL = [
  'https://oauth.cnblogs.com/connect/authorize',
  '?client_id=' + authData.clientId,
  '&scope=openid profile CnBlogsApi',
  '&response_type=code id_token',
  '&redirect_uri=' + Config.CallBack,
  '&state=abc',
  '&nonce=xyz'
].join('');

//首先使用上次的token来获取用户信息，如果失败那么重新登陆
//用户退出之后一定要清空token
class App extends Component {
    render() {
        //这里一定要测试一下，如果是刚刚下载的软件，一开始打开是不是会显示登陆界面
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Welcome/>
            </View>
        );
    }
}

// 在App中调用的登录界面组件
class Welcome extends Component{
    render(){
        return (
            <View style = {styles.container}>
                <Image style = {{width: width, height: height, resizeMode: 'stretch'}}
                source = {require('./Source/images/start.jpg')}/>
            </View>
        )
    }

    toPersonalBlog()
    {
        this.reset();
        this.props.navigation.navigate('PersonalBlog');
    }

    toHome()
    {
        this.props.navigation.navigate('Loginer');
    }
    reset = ()=>{
        // 重置路由：使得无法返回登录界面
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'AfterloginTab'}),
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }
    componentDidMount(){
        this.timer = setTimeout(
            ()=>{
                storage.getItem(StorageKey.USER_TOKEN).then((token)=>{
                    if(token === null)
                    {
                        this.toHome();
                    }
                    else{
                        if(token.access_token !== 'undefined')
                        {
                            let url = Config.apiDomain+'api/users/';
                            Service.GetInfo(url,token.access_token)
                            .then((jsonData)=>{
                                if(jsonData !== "rejected")
                                {
                                    this.toPersonalBlog();
                                }
                                else
                                {
                                    storage.removeItem(StorageKey.USER_TOKEN).then((res)=>{
                                        CookieManager.clearAll()
                                        .then((res)=>{
                                            this.props.navigation.navigate('Loginer')
                                        })
                                    })
                                }
                            })
                            .catch((error) => {
                                ToastAndroid.show("网络请求失败，请检查连接状态！",ToastAndroid.SHORT);
                            });
                        }
                        else
                        {
                            this.toHome();
                        }
                    }
                })
            }
            ,1000)
    }
}

class Loginer extends Component{
    mylogin = () => {
        this.props.navigation.navigate('LoginPage')
    };
    render(){
        return(
            <View style = {styles.container}>
                <Image source = {require('./Source/images/logo.png')} style = {styles.image}/>
                <View style = {{height: 40}}></View>
                <TouchableOpacity style={styles.loginbutton} onPress = {this.mylogin}>
                    <Text style={styles.btText} accessibilityLabel = 'App_signin'>登   录</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

class UrlLogin extends Component{
    constructor(props){
        super(props);
        this.state = {
            code : '',
        };
    }

    toPerson()
    {
        // 这里重置路由，阻止用户返回登录界面
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'AfterloginTab'}),
            ]
        });
        this.props.navigation.dispatch(resetAction);
        this.props.navigation.navigate('PersonalBlog');
    }
    getTokenFromApi(Code)
    {
        fetch(Config.AccessToken,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'client_id=' + authData.clientId + '&client_secret=' + authData.clientSecret + '&grant_type=authorization_code' + '&code=' + Code + '&redirect_uri=' + Config.CallBack,
            timeout: 5*1000
        })
        .then((response)=>response.json())//还没有对返回状态进行判断，所以还不完整
        .then((responseJson)=>{
            //let data = {access_token : responseJson.access_token};
            storage.setItem(StorageKey.USER_TOKEN,responseJson);
            this.toPerson();
        })
        .catch((error)=>{
            ToastAndroid.show("网络请求失败，请检查连接状态！",ToastAndroid.SHORT);
        })
    }
    render()
    {
        return (
            <View style={styles.container}>
                <WebView
                    onNavigationStateChange = {(event)=>{
                    var first_sta = event.url.indexOf('#');
                    if(event.url.substring(0,first_sta) === Config.CallBack)
                    {
                        var sta = event.url.indexOf('=');
                        var end = event.url.indexOf('&');
                        this.setState({
                            code : event.url.substring(sta+1,end)
                        })
                        if(this.state.code != '')
                        {
                            this.getTokenFromApi(this.state.code);
                        }
                    }
                }}
                source={{uri: CODE_URL}}
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
        width: 250,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: 'rgb(51,153,255)',
        marginTop: height/10,
    },
    btText: {
        color: '#fff',
        fontSize: 25,
    },
    image: {
        height: height/7,
        width: width/1.5,
        resizeMode: 'stretch',
    },
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
        showLabel: true,
        style: {
//            height: 30,
        },
        labelStyle: {
            //fontSize: 10
        },
        tabStyle: {
			backgroundColor: '#1C86EE',
            height: height/13,
        },
    },
})

const SimpleNavigation = StackNavigator({
    Welcome: {
        screen: Welcome,
        navigationOptions: {
            header: null,
        },
    },
    Loginer: {
        screen: Loginer,
        navigationOptions: {
            header: null,
        },
    },
    LoginPage: {
        screen: UrlLogin,
        navigationOptions: {
            header: null,
        },
    },
    HomeworkLists: {
        screen: HomeworkLists,
        navigationOptions: {
            //header: null,
            headerTintColor:'white',
            headerTitle: '作业列表',
            headerStyle: {
                height: 40,
                backgroundColor: '#1C86EE',
            },
            headerTitleStyle: {
                fontSize: 18,
            }
        },
    },
    HomeworkDetail: {
        screen: HomeworkDetail,
        navigationOptions: {
            headerTintColor:'white',
            headerTitle: '作业详情',
            headerStyle: {
                height: 40,
                backgroundColor: '#1C86EE',
            },
            headerTitleStyle: {
                fontSize: 18,
            }
        },
    },
    ClassLists: {
        screen: ClassLists,
        navigationOptions: {
            header: null,
        }
    },
    ClassCreate: {
        screen: ClassCreate,
        navigationOptions: {
            headerTintColor:'white',
            headerTitle: '创建班级',
            headerStyle: {
                height: 40,
                backgroundColor: '#1C86EE',
            },
            headerTitleStyle: {
                fontSize: 18,
            }
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
    PersonalSettings:{
        screen: PersonalSettings,
        navigationOptions: {
            headerTintColor:'white',
            headerTitle: '个人设置',
            headerStyle: {
                height: 40,
                backgroundColor:'#1C86EE',
            },
            headerTitleStyle: {
               fontSize: 18,
            }
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
            headerTintColor:'white',
            headerTitle: '班级博客',
            headerStyle: {
                height: 40,
                backgroundColor: '#1C86EE',
            },
            headerTitleStyle: {
                fontSize: 18,
            }
        }
    },
    HomeworkPost: {
        screen: HomeworkPost,
        navigationOptions: {
            headerTintColor:'white',
            headerTitle: '作业发布',
            headerStyle: {
                height: 40,
                backgroundColor: '#1C86EE',
            },
            headerTitleStyle: {
                fontSize: 18,
            }
        }
    },
    ScheduleReminding: {
        screen: ScheduleReminding,
        navigationOptions: {
            headerTintColor:'white',
            headerTitle: '日程提醒',
            headerStyle: {
                height: 40,
                backgroundColor: '#1C86EE',
            },
            headerTitleStyle: {
                fontSize: 18,
            }
        }
    },
    BlogDetail: {
        screen: BlogDetail,
        navigationOptions: {
            headerTintColor:'white',
            headerTitle: '博文详情',
            headerStyle: {
                height: 40,
                backgroundColor: '#1C86EE',
            },
            headerTitleStyle: {
                fontSize: 18,
            },
        }
    },
    BlogComment: {
        screen: BlogComment,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle: '评论',
            headerStyle:{
                height: 40,
                backgroundColor: '#1C86EE',
            },
            headerTitleStyle: {
                fontSize: 18,
            }
        }
    },
    ClassMember: {
        screen: ClassMember,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle: '班级成员',
            headerStyle: {
                height:40,
                backgroundColor: '#1C86EE',
            },
            headerTitleStyle: {
                fontSize: 18,
            }
        }
    },
    ClassMemberAdd: {
        screen: ClassMemberAdd,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle: '添加班级成员',
            headerStyle: {
                height:40,
                backgroundColor: '#1C86EE',
            },
            headerTitleStyle: {
                fontSize: 18,
            }
        }
    },
    MemberBlog: {
        screen: MemberBlog,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle: '他的博客',
            headerStyle: {
                height:40,
                backgroundColor: '#1C86EE',
            },
            headerTitleStyle: {
                fontSize: 18,
            }
        }
    },
    CommentAdd: {
        screen: CommentAdd,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle: '添加评论',
            headerStyle: {
                height:40,
                backgroundColor:'#1C86EE',
            },
            headerTitleStyle: {
                fontSize: 18,
            }
        }
    },
    AppInformation: {
        screen: AppInformation,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle: '关于app',
            headerStyle: {
                height:40,
                backgroundColor:'#1C86EE',
            },
            headerTitleStyle: {
                fontSize: 18,
            }
        }

    },
    ContactPage: {
        screen: ContactPage,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle: '联系开发者',
            headerStyle: {
                height:40,
                backgroundColor:'#1C86EE',
            },
            headerTitleStyle: {
                fontSize: 18,
            }
        }
    },
    Submitted: {
        screen: Submitted,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle: '提交列表',
            headerStyle: {
                height:40,
                backgroundColor:'#1C86EE',
            },
            headerTitleStyle: {
                fontSize: 18,
            }
        }
    },
    HomeworkSubmit: {
        screen: HomeworkSubmit,
        navigationOptions:{
            headerTintColor:'white',
            headerTitle: '请选择你要提交的博文',
            headerStyle: {
                height:40,
                backgroundColor:'#1C86EE',
            },
            headerTitleStyle: {
                fontSize: 18,
            }
        }
    }
},{
    initialRouteName: 'Welcome',
});
export default SimpleNavigation;
import MyAdapter from './MyAdapter.js';
import HeaderNoBackComponent from './HeaderNoBackComponent.js';
import Config from '../config';
import api from '../api/api.js';
import {authData,err_info} from '../config'
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
    Picker,
    ToastAndroid,
} from 'react-native';
const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;
const titleFontSize= MyAdapter.titleFontSize;
const abstractFontSize= MyAdapter.abstractFontSize;
const informationFontSize= MyAdapter.informationFontSize;
const btnFontSize= 16;   
// 该页面使用navigate参数为classId
export default class ClassMemberAdd extends Component {
    constructor(props){
        super(props);
        this.state={
            displayName: '',//昵称
            realName: '',//真实姓名
            role: 1,//班级身份 1.学生、2.老师、3.助教
            studentNo: '',//学号
        };
      }
    _onPress=()=>{
        let postBody = {
            schoolClassId:Number(this.props.navigation.state.params.classId),
            displayName:this.state.displayName,
            realName: this.state.realName,
            role: Number(this.state.role),
            studentNo: this.state.studentNo,
        }
        let body = JSON.stringify(postBody);
        //let url = 'https://api.cnblogs.com/api/edu/member/register/displayName';
		let url = Config.AddMember;
        Service.UserAction(url, body, 'POST').then((response)=>{
            if(response.status!==200)
            {
                return null;
            }
            else{
                return response.json();
            }
        }).then((jsonData)=>{
            if(jsonData===null)
            {
                ToastAndroid.show('请求失败！',ToastAndroid.SHORT);
            }
            else if(jsonData.isSuccess)
            {
                ToastAndroid.show('添加成功，请刷新查看！',ToastAndroid.SHORT);
                this.props.navigation.goBack();
            }
            else if(jsonData.isWarning)
            {
                ToastAndroid.show(jsonData.message,ToastAndroid.SHORT);
            }
            else
            {
                ToastAndroid.show('发生错误，请稍后重试！',ToastAndroid.SHORT);
            }
        }).catch((error) => {
            ToastAndroid.show(err_info.NO_INTERNET ,ToastAndroid.SHORT);
        });
    };
    render() {
    return (
        <View
            style= {{
                flexDirection: 'column',
                justifyContent:'flex-start',
                flex: 1,
                backgroundColor: 'white',
                //paddingTop: 0.1*screenHeight,
                //paddingBottom: 0.02*screenHeight
            }}
        >         
            <View style= {styles.container}
            >
                <Text
                    style= {styles.text}
                >
                    园子昵称
                </Text>            
                <TextInput
                    placeholder="使用博客园显示昵称添加"	            
                    style={styles.textInput}
                    underlineColorAndroid="transparent"//设置下划线背景色透明 达到去掉下划线的效果 	                
                    onChangeText={(text)=>{
                        this.setState({
                            displayName: text,
                        })
                    }}
                />      	
            </View>
            <View style= {styles.container}      	
            >
                <Text
                    style= {styles.text}   
                >
                    真实姓名
                </Text>            
                <TextInput
                    style={styles.textInput}
					accessibilityLabel = 'ClassMemberAdd_realName'
                    underlineColorAndroid="transparent"//设置下划线背景色透明 达到去掉下划线的效果 	                
                    onChangeText= {(text)=>{
                        this.setState({
                            realName: text,
                        })
                    }}
                />      	
            </View>
            <View style= {styles.container}
            >
                <Text
                    style= {styles.text}
                >
                    身份
                </Text>   
                <View
                    style= {styles.textInput}
                >                     
                    <Picker
                        style= {styles.picker}
                        mode= 'dropdown'
                          selectedValue={this.state.role}
                          onValueChange={(ident) => this.setState({role: ident})}>
                          <Picker.Item label="学生" value={1} />
                          <Picker.Item label="老师" value={2} />
                          <Picker.Item label="助教" value={3} />
                    </Picker>
                </View>         	
            </View>
            {this.state.role===1?(<View style= {styles.container}      	
            >
                <Text
                    style= {styles.text}   
                >
                    学号
                </Text> 
                <TextInput
                    style={styles.textInput}
					accessibilityLabel = 'ClassMemberAdd_studentID'
                    underlineColorAndroid="transparent"//设置下划线背景色透明 达到去掉下划线的效果              
                    onChangeText={(text)=>{
                        this.setState({
                            studentNo: text,
                        })
                    }}
                />      	
            </View>):(null)
            }            
            <View style= {styles.container}
            >
                <TouchableHighlight
                    underlayColor="#3b50ce"
                    activeOpacity={0.5}
                    style= {{
                        width:0.35*screenWidth,
                        alignSelf: 'flex-end',
                        borderRadius: 0.01*screenHeight,
                        padding: 0.01*screenHeight,
                        backgroundColor:"#3b50ce"
                    }}
                    onPress={this._onPress}//关联函数
                >
                    <Text
                        style= {{
                            fontSize: btnFontSize,  
                            color: '#ffffff',  
                            textAlign: 'center',  
                            fontWeight: 'bold',
                        }}   
                    >
                      添加
                    </Text>
                </TouchableHighlight>            
            </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        marginTop:16,
        marginHorizontal:16
    },
    text:{
        width:0.2*screenWidth,
        fontSize: 16,
        color: 'black',
        textAlign: 'left',
    },
    textInput:{
        flex:1,
        marginLeft:8,
        height: 48,
        borderColor: 'gray',
        borderWidth: 1        
    },
    picker:{
        flex:1,
        height: 48,
        color:'#000000',
    }
});
import {ToastAndroid}from 'react-native';

import * as service from './action';
import api from '../api/api.js';
import * as storage from '../Storage'

import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';


class loginPage extends Component{
	constructor(props){
		super(props);
		this.state = {
			username : '',
			password : ''
		}
	}
	
	//先确保输入一定是有效的情况下
	handleLogin(){
		service.login({
			username : this.username,
			password : this.password,
			resolved : (data)=>{
				data.username = this.username;
				data.password = this.password;
				this.handleLoginResolved(data);
			},
			rejected:(data)=>{
				this.handleLoginRejected(data);
			}
		});
	}
	
	handleLoginResolved(data){
		service.updateConfig({
			key : storage.USER_TOKEN,
			value : data
		})
		Toast.show("Success");
	}
	
	handleLoginRejected(data){
		Toast.show("Fail");
	}
	
	renderFormPanel(){
		return (
				<View style={ [ CommonStyles.m_a_4 ] }>
				{ this.renderUserName() }
				{ this.renderPassword() }
				{ this.renderButtons() }
				</View>
			);
	}
	
	renderUserName(){
		return (
			<View style={ [ComponentStyles.input_control ] }>
				<TextInput 
					ref="txtUserName"
					maxLength = { 40 }
					blurOnSubmit= {true}
					style={ [ComponentStyles.input ] }
					placeholder={'请输入用户名'}
					placeholderTextColor={ StyleConfig.color_gray }
					underlineColorAndroid = { 'transparent' }
					onChangeText = {(val)=>this.setState({username: val})}
					value={ this.state.username } />
			</View>
		)
	}

	renderPassword(){
		return (
			<View style={ [ComponentStyles.input_control ] }>
				<TextInput 
					ref="txtPassword"
					maxLength = { 40 }
					style={ [ComponentStyles.input ] }
					blurOnSubmit= { true }
					secureTextEntry = { true }
					placeholder={'请输入密码'}
					placeholderTextColor={ StyleConfig.color_gray }
					underlineColorAndroid = { 'transparent' }
					onChangeText = {(val)=>this.setState({password: val})}
					value={ this.state.password } />
			</View>
		)
	}
	  
	renderLoginButton(){
		return (
         <TouchableOpacity
            activeOpacity={ StyleConfig.touchable_press_opacity }
            style={ [ComponentStyles.btn, ComponentStyles.btn_primary] }
            onPress={()=>this.handleLogin()}>
            <Text style={ ComponentStyles.btn_text }>
                登录
            </Text>
         </TouchableOpacity>
		)
	}
}
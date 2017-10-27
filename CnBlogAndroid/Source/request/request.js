import Config from '../config';
import api from '../api/api.js';
import {authData} from '../config'
import {
	ToastAndroid
}from 'react-native';

export function get(url){
	//先获取token，然后再获取信息
	var Body = "client_id=" + authData.clientId + "&client_secret=" + authData.clientSecret + "&grant_type=client_credentials";
	fetch(Config.AccessToken,{
			method : 'POST',
			headers:{
				'Content-Type' : 'application/x-www-form-urlencoded',
			},
			body : Body
			}).then((response)=>response.json())
			.then((responseJson)=>{
				var auth = "Bearer" + " " + responseJson.access_token;
				return getInfo(url,auth);
			})
			.catch((error) => {
				throw error;
			});
}

function getInfo(url,token){
	//因为现在的请求都是没有变化的，所以headers还没有变化
	fetch(url,{
			method : 'GET',
			headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': token,
			},
			}).then((response) => response.json())
			.then((responseJson)=>{
				var name = responseJson.nameEn;
				ToastAndroid.show(name,ToastAndroid.LONG);
				return name;  //这里是需要返回的东西
			})
			.catch((error) => {
			console.error(error);
		});
}
/**
var info = responseJson;
				ToastAndroid.show(info.nameEn, ToastAndroid.LONG);
				return info;*/
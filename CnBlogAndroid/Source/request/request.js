import Config from '../config';
import api from '../api/api.js';
import {authData} from '../config'
import {StorageKey} from '../config'
import {err_info} from '../config'
import * as storage from '../Storage/storage.js'
import fetch from 'react-native-fetch-polyfill'
import {
    ToastAndroid,
	AsyncStorage,
}from 'react-native';

//这里修改为返回Promise对象(by ZiJiaW)
export function GetInfo(url, token){
    return new Promise((resolve,reject)=>{
        fetch(url,{
            method : 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer' + ' ' + token,
            },timeout: 5*1000
        })
        .then((response)=>{
            if(response.status!=200)
            {
                resolve("rejected");
            }
            else{
                return response.json();
			}
        })
        .then((jsonData)=>{
            resolve(jsonData);
        })
        .catch((error) => {
            ToastAndroid.show(err_info.NO_INTERNET,ToastAndroid.SHORT);
            reject("rejected");   //如果失败了，那么就返回rejected
        });
    });
}

//异步依赖异步回调的Primise用法 参考https://segmentfault.com/a/1190000005894077?_ea=943171
//这里将上面两个异步作了进一步封装(by ZiJiaW)，promise返回值为该url的json对象
export function Get(url){
	return new Promise((resolve,reject)=>{
		storage.getItem(StorageKey.USER_TOKEN).then((token)=>{
			return GetInfo(url, token.access_token);
		})
		.then((jsonData)=>{
			resolve(jsonData)
		})
		.catch((error) => {
			ToastAndroid.show(err_info.NO_INTERNET,ToastAndroid.SHORT);
			reject("rejected");
		});
	})
}

export function UserAction(url,content,type){  //此处的body为修改的内容
	return new Promise((resolve,reject)=>{
		storage.getItem(StorageKey.USER_TOKEN).then((token)=>{
			return PostInfo(url,token.access_token,content,type);
		})
		.then((response)=>{
			resolve(response);
		})
		.catch((error) => {
		    //ToastAndroid.show(err_info.NO_INTERNET,ToastAndroid.SHORT);
			reject("rejected");
		});   
	})
}
//这个函数是涉及到操作的request
//传入的内容要是json化的
function PostInfo(url,token,content,type){        
	return new Promise((resolve,reject)=>{
        fetch(url,{
            method : type,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Authorization': 'Bearer' + ' ' + token,
            },
			body : content,timeout: 5*1000
        })
        .then((response)=>{
            resolve(response);
        })
        .catch((error) => {
            ToastAndroid.show(err_info.NO_INTERNET,ToastAndroid.SHORT);
            reject("rejected");     //如果失败了，那么就返回一个rejected
        });
    });
}
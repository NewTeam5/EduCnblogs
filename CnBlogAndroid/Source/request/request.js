import Config from '../config';
import api from '../api/api.js';
import {authData} from '../config'
import {
    ToastAndroid
}from 'react-native';

function GetToken(){
    //先获取token，然后再获取信息
    var Body = "client_id=" + authData.clientId + "&client_secret=" + authData.clientSecret + "&grant_type=client_credentials";
    /*fetch(Config.AccessToken,{
        method : 'POST',
        headers:{
            'Content-Type' : 'application/x-www-form-urlencoded',
        },
        body : Body
    })
    .then((response)=>response.json())
    .then((responseJson)=>{
        var auth = "Bearer" + " " + responseJson.access_token;
        token = auth;
//        return getInfo(url,auth);
    })
    .catch((error) => {
        throw error;
    });*/
    return new Promise((resolve,reject)=>{
        fetch(Config.AccessToken,{
            method : 'POST',
            headers:{
                'Content-Type' : 'application/x-www-form-urlencoded',
            },
            body : Body
        })
        .then((response)=>response.json())
        .then((responseJson)=>{
//            ToastAndroid.show('调用完成1',ToastAndroid.LONG);
            resolve("Bearer" + " " + responseJson.access_token);
//            return getInfo(url,auth);
        })
        .catch((error) => {
            throw error;
            reject();
        });
    });
}

//function getInfo(url,token){
    //因为现在的请求都是没有变化的，所以headers还没有变化
    /*fetch(url,{
        method : 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token,
        },
    })
    .then((response) => response.json())
    .then((responseJson)=>{
        var name = responseJson.nameEn;
//        ToastAndroid.show(name,ToastAndroid.LONG);
        return name;  //这里是需要返回的东西
    })
    .catch((error) => {
        console.error(error);
    });*/
//注释的部分为原来的函数
//这里修改为返回Promise对象(by ZiJiaW)
function GetInfo(url, token){
    //get();
    return new Promise((resolve,reject)=>{
        fetch(url,{
            method : 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': token,
            },
        }).then((response) => response.json())
        .then((responseJson)=>{
//            ToastAndroid.show('调用完成2',ToastAndroid.LONG);
            resolve(responseJson);
        })
        .catch((error) => {
            console.error(error);
            reject();
        });
    });
}
//异步依赖异步回调的Primise用法 参考https://segmentfault.com/a/1190000005894077?_ea=943171
//这里将上面两个异步作了进一步封装(by ZiJiaW)，promise返回值为该url的json对象
export function Get(url){
    return new Promise((resolve,reject)=>{
        GetToken()
        .then((token)=>{
            return GetInfo(url, token);
        })
        .then((jsonData)=>{
//            ToastAndroid.show('调用完成3',ToastAndroid.SHORT);
            resolve(jsonData);
        })
        .catch((error) => {
            console.error(error);
            reject();
        });
    })
}

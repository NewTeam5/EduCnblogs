import React, { Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,    
    TextInput,
    FlatList,
    TouchableOpacity,
    Dimensions,
    PixelRatio,
} from 'react-native';
const screenWidth = Dimensions.get('window').width;      //设备的宽度
const screenHeight = Dimensions.get('window').height;    //设备的高度
const defaultPixel = 3;                           //开发设备的像素密度
const fontRatio= PixelRatio.get()/PixelRatio.getFontScale(); //字体缩放比率
const scale = Math.min( screenWidth / 360*defaultPixel,screenHeight / 592*defaultPixel);   //获取缩放比例
function setSpText(size: number) {
    size = Math.round((size * scale + 0.5) * fontRatio);
    //size= size*fontRatio;
    return size/defaultPixel;
}
export default class MyAdapter{
	static screenWidth = Dimensions.get('window').width;      //设备的宽度
	static screenHeight = Dimensions.get('window').height;    //设备的高度	
	static titleFontSize= setSpText(8);
	static abstractFontSize= setSpText(4);
	static informationFontSize= setSpText(4);
	static btnFontSize= setSpText(4);	
}
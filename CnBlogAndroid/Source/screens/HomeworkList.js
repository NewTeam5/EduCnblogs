import Config from '../config';
import api from '../api/api.js';
import {authData} from '../config'
import * as Service from '../request/request.js'
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
} from 'react-native';
// 获取屏幕尺寸
const { height, width } = Dimensions.get('window');
export default class HomeworkList extends Component{
    constructor(props){
        super(props);
        this.state = {
            homeworks: [],
            counts: 0,
        }
    }
    //暂定班级ID为111,应该传进来班级ID作为属性
    componentDidMount = ()=>{
        let url = Config.apiDomain + api.ClassGet.homeworkList + "/false/111/1-12";
        // 先获取作业数量，再按作业数量获取作业信息列表
        Service.Get(url).then((jsonData)=>{
            this.setState({
                counts: jsonData.totalCount,
            });
        })
        .then(()=>{
            let url = Config.apiDomain + api.ClassGet.homeworkList + "/false/111/"+1+"-"+this.state.counts;
            Service.Get(url).then((jsonData)=>{
                this.setState({
                    homeworks: jsonData.homeworks,
                });
            })
        })
    };
    _separator = () => {
        return <View style={{ height: 2, backgroundColor: 'blue' }}/>;
    }
    _renderItem = (item)=>{
        let item1 = item;
        var title = item1.item.title;//作业标题
        var description = item1.item.description;//作业描述
        var deadline = item1.item.deadline;//作业截止日期
        var url = item1.item.url;//作业地址
        var bgColor = '#F5FCFF';//每个section的背景色
        
        return (
            <TouchableOpacity
                onPress = {()=>this.props.navigation.navigate('HomeworkDetail',{url: url})}
                style = {styles.item}
            >
                <Text style = {[{
                    flex: 1,
                    width: width,
                    backgroundColor: bgColor
                },styles.homeworktitle]}
                >
                    {title}
                </Text>
                <Text style = {[{
                    flex: 2,
                    width: width,
                    backgroundColor: bgColor
                },styles.text]}
                >
                    {description+'\n'} [deadline: {deadline}]
                </Text>
            </TouchableOpacity>
        )
    };
    render(){
        // 获取显示的列表信息
        var data = [];
        for(var i in this.state.homeworks)
        {
            data.push({
                key: this.state.homeworks[i].homeworkId,//作业ID
                title: this.state.homeworks[i].title,//作业标题
                url: this.state.homeworks[i].url,//作业网址
                description: this.state.homeworks[i].description,//作业描述
                deadline: this.state.homeworks[i].deadline,//作业截止日期
            })
        }
        return(
            <View style = {{
                flex: 1,
            }}>
                <FlatList
                    ItemSeparatorComponent={this._separator}
                    renderItem={this._renderItem}
                    data={data}
                >
                </FlatList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'left',
        textAlignVertical: 'center',
        color: 'black',
        fontSize: 12,
    },
    homeworktitle: {
        textAlign: 'left',
        textAlignVertical: 'center',
        color: 'black',
        fontSize: 25,
    },
    item: {
//        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }
});
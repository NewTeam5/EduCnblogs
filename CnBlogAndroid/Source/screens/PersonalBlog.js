import Config from '../config';
import api from '../api/api.js';
import {authData} from '../config'
import * as Service from '../request/request.js'
import MyAdapter from './MyAdapter.js';
import React, { Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ToastAndroid,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    FlatList,
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';
const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;
// 此页面传入的参数为blogApp(即个人博客名)
export default class PersonalBlog extends Component{
    constructor(props){
        super(props);
        this.state = {
            blogs: [],//博客随笔信息列表
            blogTitle: '',//博客标题
            pageSize: 0,//博客页容量
            postCount: 0,//随笔总数
        };
    }
    // 更新博客显示数据
    UpdateData = ()=>{
        componentDidMount();
    };
    componentDidMount = ()=>{
        let blogApp = 'StonesA';//对于传入的参数，应为 this.props.blogApp，这里暂时使用团队博客的内容
        // 首先获取博客信息
        let url = Config.apiDomain+'api/blogs/'+blogApp;
        Service.Get(url)
        .then((jsonData)=>{
            this.setState({
                blogTitle: jsonData.title,
                pageSize: jsonData.pageSize,
                postCount: jsonData.postCount,
            });
        })
        // 然后利用获取到的博客文章数量获取文章列表，因为获取方式是分页的
        .then(()=>{
            // 计算页数
            let {pageSize, postCount} = this.state;

			
            //let pageCount  = pageSize * (postCount/pageSize) < postCount ? postCount/pageSize + 1 : postCount/pageSize;
			let pageCount = Math.ceil(postCount/pageSize);
			//alert(pageCount)
            // 遍历所有页获得博文列表
			//下面好像还有问题
            for(var pageIndex = 1; pageIndex <= pageCount; pageIndex++)
            {
                let url = Config.apiDomain+'api/blogs/'+blogApp+'/posts?pageIndex='+pageIndex;
                Service.Get(url).then((jsonData)=>{
					ToastAndroid.show(jsonData,ToastAndroid.SHORT)
                    this.setState({
                        blogs: this.state.blogs.concat(jsonData),
                    })
                })
            }
        })
    };
	
    _renderItem = (item)=>{
        let item1 = item;
        var Title = item1.item.Title;
        var Url = item1.item.Url;
        var Description = item1.item.Description;
		//var Description = '';
        var PostDate = item1.item.PostDate;
        var ViewCount = item1.item.ViewCount;
        var CommentCount = item1.item.CommentCount;
        var Id = item1.item.key;
        return(
            <View>
                <TouchableOpacity 
                    style = {styles.listcontainer} 
                    onPress = {()=>this.props.navigation.navigate('BlogDetail',{Id:Id, blogApp: 'NewTeam',CommentCount: CommentCount})}
                >  
                    <Text style = {{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginTop: 3,
                        marginBottom: 3,
                        textAlign: 'left',
                        color: 'black'
                    }}>
                        {Title}
                    </Text>
                    <Text style = {{fontSize: 14, marginBottom: 3, textAlign: 'left', color: 'black'}}>
             
						{Description + '...'}
                    </Text>
                    <View style = {{
                        flexDirection: 'row',
                        marginBottom: 3,
                        justifyContent: 'space-around',
                        alignItems: 'flex-start'
                    }}>
                        <Text style = {{fontSize: 10, textAlign: 'left', color: 'black', flex: 1}}>
                            {ViewCount+' 阅读'+'  '+CommentCount+' 评论'}
                        </Text>
                        <Text style = {{fontSize: 10, textAlign: 'right', color: 'black', flex: 1}}>
                            {'发布于: '+PostDate.split('T')[0]+' '+PostDate.split('T')[1]}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };
	
    _separator = () => {
        return <View style={{ height: 3, backgroundColor: 'rgb(204,204,204)' }}/>;
    }
    render(){
        var data = [];
        for(var i in this.state.blogs)
        {
            data.push({
                key: this.state.blogs[i].Id,
                Title: this.state.blogs[i].Title,
                Url: this.state.blogs[i].Url,
                Description: this.state.blogs[i].Description,
                PostDate: this.state.blogs[i].PostDate,
                ViewCount: this.state.blogs[i].ViewCount,
                CommentCount: this.state.blogs[i].CommentCount,
            })
        }
        return(
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <Text style = {styles.headertext}>{this.state.blogTitle}</Text>
                </View>
                <View style = {styles.content}>
                    <FlatList
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        data={data}
                    />
                </View>
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
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(51,153,255)',
        width: screenWidth,
    },
    headertext: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black'
    },
    content: {
        flex: 11,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: screenWidth,
    },
    listcontainer: {
        justifyContent:'flex-start',
        alignItems: 'flex-start',  
        flex:1,
        backgroundColor: 'white',
        marginLeft: 8,
        marginRight: 12,
    }
});
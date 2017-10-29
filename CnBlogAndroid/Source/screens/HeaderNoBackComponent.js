import MyAdapter from './MyAdapter.js';
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
const screenWidth= MyAdapter.screenWidth;
const screenHeight= MyAdapter.screenHeight;
const titleFontSize= MyAdapter.titleFontSize;
const abstractFontSize= MyAdapter.abstractFontSize;
const informationFontSize= MyAdapter.informationFontSize;
const btnFontSize= MyAdapter.btnFontSize;   
export default class HeaderNoBackComponent extends Component {//标题栏  
    render() {  
        return (  
            <View
                style= {{
                    flexDirection:"column"
                }}
            >
                <View style={Styles.container}> 
                    <View style= {Styles.imageStyle}>
                        <Image                          
                            source= {require('../images/1.png')}//头像
                        />
                    </View> 
                    <View style={Styles.textview}>  
                        <Text style={Styles.textstyle}>{this.props.text || "标题头"}</Text>  
                    </View>  
                </View>  
                <View
                  style= {{
                    height:1,
                    backgroundColor:'gray',
                    marginTop:0.005*screenHeight,
                }}         
                >
                </View>
            </View>
        );  
    }  
}  
  
const Styles = StyleSheet.create({  
    container: {  
        flexDirection: 'row',  
        alignItems: 'center',  
        //height: screenHeight/12,  
        alignSelf: 'stretch',          
    },
    imageView:{
        flex: 1,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 0.2*screenWidth
    },
    imageStyle:{

    }, 
    textview: {  
        flex: 1,  
        alignSelf: 'center',  
    },  
    textstyle: {  
        fontSize: titleFontSize,  
        color: '#000000',  
        textAlign: 'center',  
        fontWeight: 'bold',
    },  
});  
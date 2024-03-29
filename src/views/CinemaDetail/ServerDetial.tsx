import React, { useState,useEffect, useCallback,useImperativeHandle,forwardRef } from 'react';
 import { useNavigation } from '@react-navigation/core';
 import { observer, inject } from 'mobx-react'
 import Ionicons from 'react-native-vector-icons/Ionicons';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   useColorScheme,
   Platform,
   ActivityIndicator,
   Image,
   TouchableOpacity,
   TouchableHighlight,
   View as Viw,
   Text as Txt,
   Dimensions,
   Modal,
 } from 'react-native';
 
 import { 
   NavigationContainer,
   DarkTheme,
   DefaultTheme, 
 } from '@react-navigation/native';
 import { 
   View,
   Text
 } from '../../component/Themed';
 import { 
   Button,
   Carousel,
   NavigationBar,
   Theme,
   Label,
   Overlay,
   Input,
   Toast
} from '../../component/teaset/index';

var ScreenHeight = Dimensions.get('window').height;

type TypeProps = {
   
}
const ServerDetialModal = ({
  commentlist=[],
  replySuccess,
  app
}:any,ref:any) => {
  const colorScheme = useColorScheme();
  const [isShow,setShow] = useState(false);
  const [server,setServer] = useState<any>([]);
  
  useEffect(()=>{
  })

  const open = useCallback((_server)=>{
    // setServer(_server)
    // setShow(true);
    // overlay_pullview(_server)

    let ol = Overlay.show(overlay_pullview(_server||[],()=>{
      Overlay.hide(ol);
    }));
  },[]);
  const close = useCallback(()=>{
    setShow(false)
  },[])

  // 把父组件需要调用的方法暴露出来
  useImperativeHandle(ref, () => ({
    open,
    close
  }));

  // return <Modal
  // animationType={"slide"}//'none', 'slide', 'fade'
  // transparent={true}
  // visible={isShow}
  // onRequestClose={()=>{
  //   close()
  // }}
  // >

  const overlay_pullview = useCallback((server,callBack)=>{
    return <Overlay.PullView 
    side='bottom'
    modal={false}
    containerStyle={{
      borderTopLeftRadius:10,
      borderTopRightRadius:10,
      backgroundColor: colorScheme=='dark'?'#1a1b1c':'#fff',
    }}>
      <SafeAreaView style={styles.container}>
        {/* <StatusBar 
        hidden={true} 
        translucent={false}
        backgroundColor={Theme.primaryColor} //状态栏的背景色  
        barStyle={'light-content'}
        /> */}
        <StatusBar 
        hidden={false} 
        translucent={true}
        backgroundColor={'transparent'} //状态栏的背景色  
        barStyle={'dark-content'}
        />
          {/* <View 
          style={{
            flex:1,
            backgroundColor:'#000',
            opacity:0.5,
            marginBottom:-30,
            paddingBottom:30
          }}>
            <TouchableOpacity 
            activeOpacity={1}
            onPress={()=>{
              // close();
              callBack && callBack()
            }}
            style={{flex:1}}>
            </TouchableOpacity>
          </View> */}
        
          
            <View style={{
              backgroundColor:colorScheme=='dark'?'#1a1b1c':'#fff',
              ...styles.contentWrapper
            }}>
              <Ionicons 
              name={'ios-close-circle-outline'} 
              style={styles.closeIcon}
              size={40} 
              color={colorScheme === 'dark' ? '#ccc' : '#fff'}
              onPress={()=>{
                // close()
                callBack && callBack()
              }}/>
              <ScrollView style={styles.scrollViewContainer}>
                {
                  server.map((item:any,index:number)=>{
                    return <Viw style={styles.serverItemWrapper} key={index+'server-'}>
                      <Viw style={styles.serverLabelWrapper}>
                        <Txt style={styles.serverLabel}>
                          {item.label}
                        </Txt>
                      </Viw>
                      
                      <Txt style={styles.serverContent}>
                        {item.content}
                      </Txt>
                  </Viw>
                  })
                }
              </ScrollView>
            </View>
      </SafeAreaView>
    </Overlay.PullView>
  },[])


  return null;
 };
 
 const styles = StyleSheet.create({
  container:{
    // height:'100%',
    backgroundColor:'transparent',
    position:'relative',
  },
  contentWrapper:{
    maxHeight:ScreenHeight/2,
    paddingBottom:10,
    position:'relative',
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    paddingTop:10
  },
  scrollViewContainer:{
    borderTopLeftRadius:30,
    borderTopRightRadius:30
  },
  closeIcon:{
    position:'absolute',
    top:-50,
    right:0
  },
  serverItemWrapper:{
    flexDirection:'row',
    marginTop:15
  },
  serverLabelWrapper:{
    width:80,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
    paddingRight:10
  },
  serverLabel:{
    paddingHorizontal:3,
    borderColor:'#ffb232',
    borderWidth:1,
    marginBottom:2,
    position:'relative',
    marginRight:3,
    fontSize:13,
    height:20,
    color:'#ffb232'
  },
  serverContent:{
    flex:1
  }
 });
 
 export default forwardRef(ServerDetialModal);
 
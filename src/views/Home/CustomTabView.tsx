import React, { useState } from 'react';
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
  //  View,
  //  Text
 } from 'react-native';

 import { 
  Button,
  Carousel,
  TabView,
  TransformView,
  Theme
} from '../../component/teaset/index';
import { 
  View,
  Text
} from '../../component/Themed';
 
 const CustomTabView = ({onChange}:{onChange:(val:any)=>void})=>{
   let navigation:any = useNavigation();
   const colorScheme = useColorScheme();
   const [activeTab, setActiveTab] = React.useState(0);
   return <TabView 
   barStyle={{
    backgroundColor:colorScheme=='dark'?'#000':'#fff',
    fontSize:40,
    borderBottomColor:colorScheme=='dark'?'#1a1b1c':'#f4f4f4',
    borderBottomWidth:1
  }} 
   style={{flex: 1}} 
   type='sheet'//carousel,carousel
   activeIndex={activeTab}
   onChange={(val:any)=>{
     setActiveTab(val);
     onChange(val)
   }}>
     <TabView.Sheet
       title={<Text style={{
         ...styles.tabBtn,
         color:activeTab===0?Theme.primaryColor:colorScheme=='dark'?'#fff':'#000'
       }}>正在热映</Text>}
     >
     </TabView.Sheet>
     <TabView.Sheet
       title={<Text style={{...styles.tabBtn,color:activeTab===1?Theme.primaryColor:colorScheme=='dark'?'#fff':'#000'}}>即将上映</Text>}
     >
     </TabView.Sheet>
   </TabView>
 }
 export default inject('AppStore')(observer(CustomTabView));


 const styles = StyleSheet.create({
  tabBtn:{
    width:80,
    fontSize:15,
    textAlign:'center'
  }
 });
 

 
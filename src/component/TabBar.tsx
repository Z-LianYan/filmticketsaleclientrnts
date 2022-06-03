/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState,useEffect } from 'react';
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
  TouchableHighlight
} from 'react-native';

import { 
  NavigationContainer,
  DarkTheme,
  DefaultTheme, 
} from '@react-navigation/native';
import { 
  View,
  Text
} from '../component/Themed';
import { 
  Button,
  Carousel,
  NavigationBar,
  Theme
} from '../component/teaset/index';
import PropTypes, { number } from 'prop-types';
import { 
  FIlM_ICON,
  FIlM_ACTIVE_ICON, 
  CINEMA_ICON,
  CINEMA_ACTIVE_ICON,
  MINE_ICON,
  MINE_ACTIVE_ICON,
} from '../assets/image/index';

import { get_film_hot } from '../api/film';
// type TypeProps = {
//   index?: number
// }
const TabBar = ({
   state, descriptors, navigation,app
}:any) => {
    
  const colorScheme = useColorScheme();
  // let navigation:any = useNavigation();
  // let currentRoute = navigation.getCurrentRoute();
  // const [groupValues, setGroupValues] = useState(['0']);
  // const whiteList = ['HomePage','CineamPage','MinePage'];
  // const [currentRoute,setCurrentRoute] = useState('')
  useEffect(()=>{
  })

  return <View style={{ flexDirection: 'row',height:50 }}>
  {state.routes.map((route:any, index:any) => {
    const { options } = descriptors[route.key];
    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : route.name;

    const isFocused = state.index === index;


    let iconName; 
    if (route.name === 'HomePage') {
      iconName = isFocused
        ? FIlM_ACTIVE_ICON
        : FIlM_ICON;
    } else if (route.name === 'CineamPage') {
      iconName = isFocused ? CINEMA_ACTIVE_ICON : CINEMA_ICON;
    }else if (route.name === 'MinePage') {
      iconName = isFocused ? MINE_ACTIVE_ICON : MINE_ICON;
    }

    const onPress = () => {
      // console.log(12345,route,app)
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        // The `merge: true` option makes sure that the params inside the tab screen are preserved
        
        if(route.name=='MinePage' && !app.userInfo){
          navigation.navigate({ name: 'LoginPage', merge: true });
          // app.setUserInfo({
          //   name:'张三',
          //   sex:'男',
          //   age:18
          // })
          
          return;
        }
        navigation.navigate({ name: route.name, merge: true });
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityState={isFocused ? { selected: true } : {}}
        accessibilityLabel={options.tabBarAccessibilityLabel}
        testID={options.tabBarTestID}
        onPress={onPress}
        onLongPress={onLongPress}
        key={route.name}
        style={{ flex: 1,alignItems:'center',justifyContent:'center' }}
      >
        <Image
          style={{width:20,height:20}}
          source={iconName}
        />
        <Text style={{ color: isFocused ? Theme.primaryColor : colorScheme=='dark'?'#797d82':'#000' }}>
          {label}
        </Text>
        
      </TouchableOpacity>
    );
  })}
</View>;
};

const styles = StyleSheet.create({
  // container:{
  //   flexDirection:'row',
  // },
  // tabItem:{
  //   flex:1
  // },
  // tabItemContent:{

  // }
});

export default inject("app")(observer(TabBar));

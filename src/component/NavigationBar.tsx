/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

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
  TouchableOpacity
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
  NavigationBar
} from '../component/teaset/index';
import PropTypes from 'prop-types';


import { get_film_hot } from '../api/film';

const _NavigationBar = ({
  title,
  style,
  backgroundColor,
  position,
  leftView
  }:{
    title?:string,
    style?:object,
    backgroundColor?:string,
    position?:string,
    leftView?: Element
  }) => {
    
  const colorScheme = useColorScheme();
  let navigation:any = useNavigation();
  const [groupValues, setGroupValues] = useState(['0']);

  return (<View style={{...style}}>
    <NavigationBar 
    statusBarInsets={true} 
    title={<Text>{title}</Text>}
    style={{
      backgroundColor:backgroundColor?backgroundColor:colorScheme === 'dark' ? '#000' : '#fff',
      position:position?position:'relative',
    }}
    leftView={ leftView?(typeof leftView === 'number'||'string'?<Text>{leftView}</Text>:leftView):<View 
    style={{flexDirection:'row',alignItems:'center'}}>
      <Ionicons 
      name={'chevron-back'} 
      size={25} 
      color={colorScheme === 'dark' ? '#fff' : '#000'} 
      onPress={()=>{
          navigation.goBack()
      }}/>
      {/* <Ionicons 
      name={'home'} 
      size={25} 
      color={colorScheme === 'dark' ? '#fff' : '#000'} 
      onPress={()=>{
          navigation.goBack()
      }}/> */}
    </View>
    }
    type={'ios'}/>

  </View>);
};

const styles = StyleSheet.create({
  _text:{
  }
});

export default inject("home")(observer(_NavigationBar));
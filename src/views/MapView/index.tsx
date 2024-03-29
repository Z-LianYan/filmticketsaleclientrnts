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
  TouchableHighlight,
  Alert,
  Dimensions
} from 'react-native';

import WebView from 'react-native-webview';
import { useHeaderHeight } from '@react-navigation/elements';
import config from '../../config/index';

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
  // NavigationBar,
  Theme,
  ListRow,
  Toast,
  Input
} from '../../component/teaset/index';
import PropTypes, { number } from 'prop-types';
import { get_film_hot } from '../../api/film';
import CustomListRow from '../../component/CustomListRow';
import NavigationBar from '../../component/NavigationBar';
import { login_out } from "../../api/user";
import { edit_user_info, get_user_info } from "../../api/user";
var ScreenObj = Dimensions.get('window');
// import { AMapSdk, MapView, MapType } from "react-native-amap3d";

const MapViewComponent = ({app,navigation,route}:any) => {
  let [submiting,setSubmiting] = useState(false);
  const headerHeight = useHeaderHeight();
  useEffect(()=>{
    // AMapSdk.init(
    //   Platform.select({
    //     ios: "9bd6c82e77583020a73ef1af59d0c759",
    //     android: "4aebbdd0faddd3134a5f60a955c928ff",
    //   })
    // );

  },[]);
  

  return <View style={styles.container}>
    {/* <NavigationBar 
      style={{
        zIndex:1
      }}
      title={route.params.cinema_name}
      position=''/> */}
      <StatusBar 
      hidden={false} 
      translucent={true}//指定状态栏是否透明
      // backgroundColor={"transparent"} //状态栏的背景色  
      barStyle={'dark-content'}
            /> 
    <View style={{height: config.STATUS_BAR_HEIGHT}}></View>
    <WebView
      source={{uri: `https://uri.amap.com/marker?position=${route.params.lng},${route.params.lat}&name=${route.params.cinema_name}&callnative=1`}}
      style={{marginTop: Platform.OS === 'ios'?0:0}}
    />
    
    {/* <MapView
      mapType={MapType.Satellite}
      initialCameraPosition={{
        target: {
          latitude: route.params.lat,
          longitude: route.params.lng,
        },
        zoom: 8,
      }}
    /> */}
  </View>;
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  
});

export default inject("AppStore")(observer(MapViewComponent));

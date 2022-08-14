import React,{useState,useEffect,useRef, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  FlatList,
  RefreshControl,
  TouchableHighlight,
  Dimensions,
  Platform
} from 'react-native';
import { observer, inject } from 'mobx-react'
import { useNavigation } from '@react-navigation/core';
import { View,Text} from '../../component/Themed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  Button,
  Carousel,
  Theme,
  Label,
  Drawer,
  ActionSheet,
  Input,
  Toast
} from '../../component/teaset/index';

import NavigationBar from '../../component/NavigationBar';
import { get_cinema_list } from '../../api/cinema';
import { get_order_list } from "../../api/order";

var ScreenWidth = Dimensions.get('window').width;
import { get_city_list } from "../../api/citys";
import CustomListRow from '../../component/CustomListRow';


const CitysPage = ({app,navigation,route}:any) => {
  const refDropdownMenu:{current:any} = useRef()
  const colorScheme = useColorScheme();
  let [list,setList] = useState<any>([])
  let [isLoading,setLoading] = useState(false);
  let [keywords,setKeywords] = useState('');
  let [fetchOptions,setFetchOptions] = useState({
    page: 1,
    limit: 5,
    status: "",
    keywords: "",
  })
  let [searchValue,setSearchValue] = useState('');
  let [letter,setLetter] = useState({
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [],
    I: [],
    J: [],
    K: [],
    L: [],
    M: [],
    N: [],
    O: [],
    P: [],
    Q: [],
    R: [],
    S: [],
    T: [],
    U: [],
    V: [],
    W: [],
    X: [],
    Y: [],
    Z: [],
  });
  let [stickyHeaderIndices,setStickyHeaderIndices] = useState<any>([0]);

  
  const onSetOptions = useCallback((title)=>{
    navigation.setOptions({
      title: '当前城市-'+title,
    });
  },[])

  
  

  useEffect(()=>{
    getCityList();
    onSetOptions(app.locationInfo.city_name)
  },[])
  

  const getCityList = useCallback(async ()=>{
    let result = await get_city_list({});
    let citys = result.rows;
    // let hotList = result.hotList;
    for (let i = 0; i < citys.length; i++) {
      if (citys[i].id === 110100 || citys[i].id === 120100) {
        //110100北京 120100天津
        delete citys[i].children;
        letter[citys[i].first_letter].push(citys[i]);
      } else {
        let children = citys[i].children;
        for (let j = 0; j < children.length; j++) {
          delete children[j].children;
          letter[children[j].first_letter].push(children[j]);
        }
      }
    }
    setLetter({
      ...letter
    });
  },[]);


  function setLocationInfo(item:any, type?:string) {
    // let { history, locationInfo } = this.props;
    let { realLocation } = app.locationInfo;
    // if (!item.name) return;
    // Cookies.set(
    //   "locationInfo",
    //   JSON.stringify({
    //     city_id: item.id,
    //     city_name: item.name,
    //   }),
    //   {
    //     expires: 1,
    //   }
    // );
    app.setLocationInfo(
      {
        city_id: item.id,
        city_name: item.name,
        lng: realLocation && realLocation.lng,
        lat: realLocation && realLocation.lat,
        // isShowSwitchLocationModal: false, //关闭首页（film）banner 里的，切换城市的模态框
      },
      () => {
        console.log('app',app.locationInfo);
        navigation.goBack();
      }
    );
  }

  function renderList(){
    let domArr:any = [];
    let letterArr:any = Object.keys(letter);
    letterArr.map((key:string,idx:number)=>{
      if (letter[key].length){
        stickyHeaderIndices.push(stickyHeaderIndices[stickyHeaderIndices.length-1]+letter[key].length+1);
        domArr.push(<Text 
          style={{
            backgroundColor:colorScheme=='dark'?'#141313':'#eee',
            paddingHorizontal:13
          }}
          key={idx+'letter'}
        >{key}</Text>);
        letter[key].map((item:any,index:number)=>{
          domArr.push( <CustomListRow 
            key={idx+'-'+index+'cityname'}
            accessory="none"
            bottomSeparator={(index+1==letter[key].length)?'none':"full"} 
            backgroundColor={colorScheme=='dark'?'#1a1b1c':'#fff'}
            title={item.name} 
            detail={""} 
            onPress={()=>{
              setLocationInfo(item);
            }}/>
          )
        })
      };
    })
    return domArr;
  }
  

  return (<View style={{
    ...styles.container,
    backgroundColor:colorScheme=='dark'?'#000':'#f4f4f4'
  }}> 
      <View style={{
        flexDirection:'row',
        padding:10
      }}>
        <Input 
        placeholder={`搜索城市名称或拼音`} 
        autoFocus={true}
        style={{
          backgroundColor:colorScheme=='dark'?'#1a1b1c':'#f4f4f4',
          color:colorScheme=='dark'?'#fff':'#000',
          flex:1,
          marginRight:10,
          borderRadius:20
        }}
        editable={true}//是否可编辑
        showsHorizontalScrollIndicator={false}//上下拖动回弹效果
        size='lg'
        // multiline={true}
        value={searchValue}
        onSubmitEditing={(e:any)=>{
        }}
        onChangeText={(text:any) => {
          setSearchValue(text);
        }}
        />
        <Button 
        style={{
          width:80,
          borderRadius:20,
          backgroundColor:Theme.primaryColor,
          borderColor:Theme.primaryColor
        }} 
        titleStyle={{color:'#fff'}} 
        title="搜索" 
        size="md"
        onPress={()=>{
          // onRefresh()
        }}/>
      </View>
      
      <ScrollView
      bounces={false}//设置ios 上下拉回弹
      stickyHeaderIndices={stickyHeaderIndices}
      onMomentumScrollEnd={(event:any)=>{}}>
        {renderList()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  
});

export default inject("app")(observer(CitysPage));
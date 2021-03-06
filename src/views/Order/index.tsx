import React,{useState,useEffect,useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  FlatList,
  RefreshControl,
  TouchableHighlight,
  Dimensions
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
import BottomLoading from '../../component/BottomLoading';
import OrderListItem from './OrderListItem';

import { get_cinema_list } from '../../api/cinema';

import { get_order_list } from "../../api/order";
import { Left } from '../../component/teaset/react-native-legacy-components/src/NavigatorBreadcrumbNavigationBarStyles.android';
var ScreenWidth = Dimensions.get('window').width;
// import DropdownMenu from '../../component/DropdownMenu';
import TabViews from './Tabs';

const OrderPage = ({navigation}:any) => {
  const refDropdownMenu:{current:any} = useRef()
  const colorScheme = useColorScheme();
  // let navigation = useNavigation();
  const [refreshing, setRefreshing] = React.useState(false);
  let [list,setList] = useState([])
  let [isLoading,setLoading] = useState(false);
  let [isFinallyPage,setFinallyPage] = useState(false);
  let [keywords,setKeywords] = useState('');
  let [fetchOptions,setFetchOptions] = useState({
    page: 1,
    limit: 5,
    status: "",
    keywords: "",
  })
  

  useEffect(()=>{
    getList(true);
  },[])

  const onLoadMore = ()=>{
    if(isLoading || isFinallyPage) return;
    fetchOptions.page += 1;
    setFetchOptions(fetchOptions);
    getList(true)
  }
  const onRefresh = ()=>{
    fetchOptions.page = 1;
    setFetchOptions(fetchOptions);
    getList(false)
  }

  async function getList(isLoading:boolean){
    try{
      isLoading && setLoading(true);
      let result:any = await get_order_list({
        ...fetchOptions,
        keywords,
        navigation
      },'');
      console.log('????????????-----????????????',result);
      let _list = [];
      if(fetchOptions.page==1){
        _list = result.rows;
        setRefreshing(false)
      }else{
        _list = list.concat(result.rows);
      }
      setList(_list);
      if(_list.length>=result.count){
        setFinallyPage(true);
      }else{
        setFinallyPage(false);
      }
      setLoading(false);
      _list = [];
    }catch(err:any){
      console.log('err',err.message);
    }
    
  }
  

  return (<View style={styles.container}>
    {/* <NavigationBar 
      style={{
        zIndex:1
      }}
      position=''
      title={<View style={{backgroundColor:Theme.primaryColor}}>
        <Input 
        placeholder="?????????????????????????????????"
        value={keywords} 
        onChangeText={(text:any)=>{
          setKeywords(text)
        }}
        keyboardType="default"
        style={{
          width: ScreenWidth/1.5,
          borderWidth:1,
          backgroundColor:colorScheme=='dark'?'#eee':'#fff',
          color:colorScheme=='dark'?'#000':'#000',
          borderRadius:20
        }}/>
        </View>
      }
      rightView={
        <Button
        style={{backgroundColor:'transparent',borderRadius:15}}
        title={'??????'}
        type="primary"
        onPress={() => {
          fetchOptions.page = 1;
          setFetchOptions(fetchOptions);
          getList(true);
        }}
      />
      }/> */}
      <TabViews active='1' onChange={(status)=>{
        fetchOptions.page = 1;
        fetchOptions.status = status;
        setFetchOptions(fetchOptions);
        getList(true);
      }}/>
    
      <ScrollView
      stickyHeaderIndices={[]}
      refreshControl={
        <RefreshControl 
        tintColor={Theme.primaryColor}//ios
        colors={[Theme.primaryColor]}//android
        refreshing={refreshing} 
        title="????????????"//ios
        onRefresh={()=>{
          onRefresh();
        }} />
      }
      onMomentumScrollEnd={(event:any)=>{
        const offSetY = event.nativeEvent.contentOffset.y; // ?????????????????????
        const contentSizeHeight = event.nativeEvent.contentSize.height; // scrollView  contentSize ??????
        const oriageScrollHeight = event.nativeEvent.layoutMeasurement.height; // scrollView??????
        
        if (offSetY + oriageScrollHeight >= contentSizeHeight - 300) {
          onLoadMore();
        }
      }}>
        {
          list.map((item:any,index)=>{
            return <OrderListItem item={item} key={index}/>
          })
        }
        <BottomLoading
        isLoading={isLoading}
        isFinallyPage={isFinallyPage}
        hasContent={list.length?true:false}/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  statusWrapper:{
    // flex:1,
    flexDirection:'row',
    borderBottomWidth:1
  },
  statusItem:{
    flex:1,
    // flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  statusItemWrapper:{
    width:'100%',
    flex:1,
    // flexDirection:'row',
    position:'relative',
    // backgroundColor:'red',
    alignItems:'center',
    justifyContent:'center'
  },
  statusItemLine:{
    position:'absolute',
    left:'25%',
    bottom:-1,
    height:2,
    width:'50%'
  }
});

export default inject("app")(observer(OrderPage));

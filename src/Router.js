import React, { Component } from 'react';
import { DrawerNavigator, StackNavigator } from 'react-navigation';
import { ScrollView } from 'react-native';
import Home from './component/home/home';
import DetailPage from './component/home/detail';
import Login from './component/login/Login';
import Register from './component/register/Register';
import SideMenu from './component/sidemenu/SideMenu';
import ContactList from './component/contacts/contacts';
import Contact from './component/profile/profile';
import editUser from './component/register/editUser';



 const sidemenu = DrawerNavigator({    
     Home: { screen: Home },    
     Login: { screen: Login },
     Register: { screen: Register },
     ContactList:{ screen:ContactList },
     Contact:{screen:Contact},
     DetailPage:{screen:DetailPage},
     editUser:{screen:editUser}
 },{contentComponent:props =><SideMenu {...props}/>})

 const FeedBack = StackNavigator({
     Home: { screen: sidemenu },
     DetailPage: { screen: DetailPage }  
 },{
    headerMode: 'none',
    navigationOptions: {
    headerVisible: false,
  }
 })

 
 
 export default FeedBack;


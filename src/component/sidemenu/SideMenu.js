import React , { Component }from 'react';
import { Dimensions,  StyleSheet,  ScrollView,  View,  Image,  Text,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const DEVICE_WIDTH = Dimensions.get('window').width;
import { StackNavigator } from 'react-navigation';
import firebaseApp from '../firebase';
import Login from '../login/Login';

let pic = {
  uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
};




export default class SideMenu extends Component{
 
  logout() {

    try {

        firebaseApp.auth().signOut();
        this.props.navigation.navigate('Login');     
        

    } catch (error) {
        console.log(error);
    }

  }
  
  render(){

    const { navigate } = this.props.navigation;

    return(
      <ScrollView scrollsToTop={false} style={styles.menu}>
    
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={ pic } />
        <Text style={styles.name}>Kamal Kishore</Text>
      </View>
      
      <Text onPress={() => navigate("Home")}  style={styles.item} > <Image source={ require('../../assets/img/home.png') }    style={{ width: 50, height: 50}}/>   Home</Text>
      <Text onPress={() => navigate("ContactList")} style={styles.item}> <Image source={ require('../../assets/img/contact.png') } style={{ width: 50, height: 50}}/>   Contacts</Text>
      <Text onPress={() => navigate("Register")} style={styles.item}> <Image source={ require('../../assets/img/mangers.png') } style={{ width: 50, height: 50}}/>   Mangers</Text>
      <Text onPress={() => navigate("Contact")} style={styles.item}> <Image source={ require('../../assets/img/profile.png') } style={{ width: 50, height: 50}}/>   Profile</Text>
      <Text style={styles.item}> <Image source={ require('../../assets/img/setting.png') } style={{ width: 50, height: 50}}/>   Setting</Text>
      <Text onPress={this.logout.bind(this)} style={styles.item}> <Image source={ require('../../assets/img/logout.png') }  style={{ width: 50, height: 50}}/>   Logout</Text>
    
      </ScrollView>
    )
    
  } 
} 



const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: DEVICE_WIDTH,
    height: DEVICE_WIDTH.height,
    backgroundColor: '#9c27b0',
   
  },
  avatarContainer: {
    marginBottom: 20,  
    marginRight:50,
    backgroundColor: '#9c27b0',
    width:DEVICE_WIDTH,
    
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 20,  
    marginLeft:80,    
    flex: 1,
  },
  name: {
    position: 'absolute',
    alignItems: 'center',
    top: 120,      
    marginLeft:70,
    //textAlign: "center",
    fontWeight:'bold', 
    color:'#fff',
    fontSize:18,
    fontFamily: "Arial",  
  },
  item: {
    fontSize: 16,
    color:'#fff',
    fontFamily: "Arial",
    fontWeight: '300',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: "Arial",       
    fontWeight:'bold',
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
});


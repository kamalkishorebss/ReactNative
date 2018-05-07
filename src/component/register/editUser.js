import React, { Component } from 'react';
import {StyleSheet,Text,Image, View,StatusBar,Dimensions,TextInput,TouchableOpacity,ToastAndroid, onButtonPress,Picker} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from '../login/Login';
import firebaseApp from '../firebase';
import Geocoder from 'react-native-geocoder';


const DEVICE_WIDTH = Dimensions.get('window').width-20;
export default class editUser extends Component{
    constructor(props , context) {
     super(props , context);
     this.state={
         
             
        username:'',
        email: '',       
        phone:'',
        
         
      }
    
    }
  
   
  componentDidMount(){
      console.log(this.props.navigation.state.params.param)
      let detail = this.props.navigation.state.params.param;
      this.setState({username : detail.data.username})
      this.setState({email : detail.data.email})
      this.setState({phone : detail.data.phone})
  }
    
  updateUser(){
  
   console.log(this.state.username)
      console.log(this.state.email)
         console.log(this.state.phone)
   let detail = this.props.navigation.state.params.param;
   let users = firebaseApp.database().ref('/users/' + detail.key); 
   users.update({ 
             
       username:this.state.username,
       email:this.state.email,
       phone:this.state.phone
    
   }) 
   alert("hahah")
    
  }
      

    
 render(){ 
    
    const { navigate } = this.props.navigation;
   
      
   
     return(
        <View style={styles.container}>             
            <Text style = {styles.headerContent}>E d i t   U s e r</Text>
            <TextInput style = {styles.input} 
               autoCapitalize="none" 
               underlineColorAndroid='transparent'
               onChangeText={(username)=>  this.setState({username})}
               autoCorrect={false}                
               returnKeyType="next"               
               value = {this.state.username}
               placeholderTextColor='#666'/>

            <TextInput style = {styles.input} 
               autoCapitalize="none" 
               underlineColorAndroid='transparent'
               onChangeText={(email)=> this.setState({email})} 
               autoCorrect={false}                
               returnKeyType="next"               
               value = {this.state.email}
               editable={false}
               placeholderTextColor='#666'/>

           

           <TextInput style = {styles.input} 
               autoCapitalize="none" 
               underlineColorAndroid='transparent'
               onChangeText={(phone)=> this.setState({phone}) }
               autoCorrect={false}                
               returnKeyType="next"
               value = {this.state.phone}
               placeholderTextColor='#666'/>
            
                 
            

            <TouchableOpacity style={styles.buttonContainer}  onPress={this.updateUser.bind(this)}>
             <Text  style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            
            </View> 
     )
     
}
}

const styles = StyleSheet.create({
    container:{
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center', 
    },  
    headerContent:{
            
	    fontWeight:'bold', 
        color:'#9c27b0',
        fontSize:26,
        fontFamily: "Arial",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20
        

    },
    input:{
        height: 50,
        paddingVertical: 15,
        backgroundColor: '#fff',          
        marginTop:10,
        marginBottom:15, 
        color: '#9c27b0',
        width:DEVICE_WIDTH,
        borderRadius: 5,          
        borderTopColor: '#9c27b0',
        borderTopWidth: 2,

        borderLeftColor: '#9c27b0',
        borderLeftWidth: 2,

        borderRightColor: '#9c27b0',
        borderRightWidth: 2,

        borderBottomColor: '#9c27b0',
        borderBottomWidth: 2,
        
      
 },
 Picker:{
    height: 50,
    paddingVertical: 15,
    backgroundColor: '#fff',          
    marginTop:10,
    marginBottom:15, 
    color: '#9c27b0',
    width:DEVICE_WIDTH,
    borderRadius: 5,          
    borderTopColor: '#9c27b0',
    borderTopWidth: 2,

    borderLeftColor: '#9c27b0',
    borderLeftWidth: 2,

    borderRightColor: '#9c27b0',
    borderRightWidth: 2,

    borderBottomColor: '#9c27b0',
    borderBottomWidth: 2,
    
 },
 buttonContainer:{
        backgroundColor: '#9c27b0',        
        paddingVertical: 15,
        width:DEVICE_WIDTH,
        padding: 20,
        marginTop:20,
        borderRadius: 5,
        
      
        
 },
 buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700',
        width:DEVICE_WIDTH,
        fontSize:18
         
                  
 }
   
})


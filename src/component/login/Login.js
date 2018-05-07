import React, { Component } from 'react';
import {StyleSheet,Text,Image, View, StatusBar,Dimensions,TextInput,ToastAndroid, TouchableOpacity,onButtonPress} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from '../home/home';
import firebaseApp from '../firebase';
const DEVICE_WIDTH = Dimensions.get('window').width-20;


export default class Login extends Component{
    constructor(props , context) {
     super(props , context);
     this.state={          
        
        email: '',
        password: ''
         
      }
    }
    
    login() {
        
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(result=>{            
             if (result) {               
               //console.log(result)
               ToastAndroid.show('you logged in successfully', ToastAndroid.BOTTOM)
                this.props.navigation.navigate('Home');           
             }
        })
       .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Invalid credientails");
        });
      }
      
    
 render(){  
      
    const { navigate } = this.props.navigation
    let pic = {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
      };
     return(
       
        <View style={styles.container}>              
           
            <TextInput style = {styles.input} 
               autoCapitalize="none" 
               underlineColorAndroid='transparent'
               onChangeText={(email)=> this.state.email = email} 
               autoCorrect={false} 
               keyboardType='email-address' 
               returnKeyType="next" 
               placeholder='Email' 
               placeholderTextColor='#666'/>

            <TextInput style = {styles.input}   
                returnKeyType="go" 
                onChangeText={(password)=> this.state.password = password}
                underlineColorAndroid='transparent'
                ref={(input)=> this.passwordInput = input} 
                placeholder='Password' 
                placeholderTextColor='#666' 
                secureTextEntry/>

            <TouchableOpacity style={styles.buttonContainer}   onPress={this.login.bind(this)}>
                        <Text  style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
           
                <Text>Forget Password</Text>
                <Text onPress={() => navigate("Register")}>Don't have account?SIGNUP</Text>
               
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
            
                     
    },
    linkContainer :{
    
    }
   
})


import React, { Component } from 'react';
import {StyleSheet,Text,Image, View,StatusBar,Dimensions,TextInput,TouchableOpacity,ToastAndroid, onButtonPress,Picker} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from '../login/Login';
import firebaseApp from '../firebase';
import Geocoder from 'react-native-geocoder';


const DEVICE_WIDTH = Dimensions.get('window').width-20;
export default class Register extends Component{
    constructor(props , context) {
     super(props , context);
     this.state={
         
        PickerValueHolder : '',      
        username:'',
        email: '',
        password: '',
        phone:'',
        location:'',
        latitude: '',
        longitude: ''
         
      }
    
    }
  
   
       
 Register(){
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({latitude:position.coords.latitude});
        this.setState({longitude:position.coords.longitude});
        let NY = {
          lat: this.state.latitude,
          lng: this.state.longitude
        }
        Geocoder.geocodePosition(NY).then(res => {
         this.setState({location : res[0].formattedAddress});
          if(this.state.email && this.state.username && this.state.password){
                firebaseApp.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(res =>{  
                    //console.log("register response",res);         
                    if(res.uid){
                        let users = firebaseApp.database().ref('/users'); 
                        users.push({    
                            "uid" : res.uid,               
                            "username":this.state.username,
                            "email":this.state.email,
                            "phone":this.state.phone,
                            "location":this.state.location,
                            "latitude":this.state.latitude,
                            "longitude":this.state.longitude
                        })
                        ToastAndroid.show('Register successfully', ToastAndroid.BOTTOM)
                        this.props.navigation.navigate('Login')
                    }
                    
                }).catch((error)=>{
                    alert(error.message)
                })  
                 
             }
             else{
                alert("All field are mandatory") 
            }
        })
     
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true },
  );

    
    
 }
      

    
 render(){ 
    
    const { navigate } = this.props.navigation;
   
      
    // let pic = {
    //     uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    //<Image source={pic} style={{ width: 300, height: 200}}/>
    //   };
     return(
        <View style={styles.container}>             
         
            <TextInput style = {styles.input} 
               autoCapitalize="none" 
               underlineColorAndroid='transparent'
               onChangeText={(username)=> this.state.username = username}
               autoCorrect={false}                
               returnKeyType="next" 
               placeholder='Username' 
               placeholderTextColor='#666'/>

            <TextInput style = {styles.input} 
               autoCapitalize="none" 
               underlineColorAndroid='transparent'
               onChangeText={(email)=> this.state.email = email} 
               autoCorrect={false}                
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

           <TextInput style = {styles.input} 
               autoCapitalize="none" 
               underlineColorAndroid='transparent'
               onChangeText={(phone)=> this.state.phone = phone}
               autoCorrect={false}                
               returnKeyType="next" 
               placeholder='Mobile' 
               placeholderTextColor='#666'/>
            
                 
            {/* <Picker style = {styles.Picker} selectedValue={this.state.PickerValueHolder}   
                onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
        
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                
   
            </Picker> */}

            <TouchableOpacity style={styles.buttonContainer}  onPress={this.Register.bind(this)}>
             <Text  style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>

            <Text onPress={() => navigate("Login")}>Already have account?Login</Text>
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


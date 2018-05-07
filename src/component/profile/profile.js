import React , { Component }from 'react';
import { Dimensions,  StyleSheet,Platform,  ScrollView,ToastAndroid,  View,  Image,  Text,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import editUser from '../register/editUser';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebaseApp from '../firebase';

const DEVICE_WIDTH = Dimensions.get('window').width;
const midWidth = DEVICE_WIDTH-DEVICE_WIDTH/2;
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  }, 
  content1: {
    width: '100%',
    height: 50,   
    backgroundColor: '#9c27b0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContainer:{
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor:'#9c27b0',
    width:DEVICE_WIDTH,
    position: 'absolute',
    top: 0,
    flex: 1,      
    right: 0,
    left: 0,
    
    
},
headerContainer:{
    flexDirection: 'row',
    alignItems:'center',
    width:'100%'
},
memuIcon:{       
    width:'10%',
    paddingLeft:5,
    paddingRight:5
},
searchIcon:{             
    paddingLeft:5,
    width:'10%',
    paddingRight:5
},
title:{     
    fontWeight:'bold',
    color:'#fff',
    textAlign: 'center',
    fontSize:20,
    fontFamily: "Arial",
    width:'80%'
    
},
  
  content2: {
    width: '100%',
    height: '100%',   
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
    menu: {
        flex: 1,
        width: DEVICE_WIDTH,
        height: DEVICE_WIDTH.height,
        top:0,
        backgroundColor: '#fff',
       
        
       
      }, avatarContainer: {        
        backgroundColor: '#fff',
        width:DEVICE_WIDTH,
        alignItems: 'center',               
        flex: 1,
        
      },
      
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',              
        flex: 1,
      },
      camera:{
        flex: 1,
        width:DEVICE_WIDTH,       
        textAlign: 'center',
      },
      name: {       
        textAlign: 'center',              
        fontWeight:'bold', 
        color:'#9c27b0',
        fontSize:18,
        fontFamily: "Arial",
        marginBottom: 40,  
      },
      item: {
        flex: 1, 
        flexDirection: 'row',
        width:DEVICE_WIDTH,  
        fontSize: 16,
        color:'#9c27b0',
        fontFamily: "Arial",
        fontWeight: '300',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        fontFamily: "Arial",       
        fontWeight:'bold',
        borderBottomColor: '#9c27b0',
        borderBottomWidth: 1,
      },
     
     

})
class Contact extends Component {
  constructor(props){
    super(props);
     
    
    this.state = {   
     
        image_uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg',
        profile_pic:'',
        recordId :'',
        userDetail:''
    
    };
}
 
  componentDidMount(){
   
    let email = firebaseApp.auth().currentUser.email; 
    let users = firebaseApp.database().ref('/users'); 
    users.orderByChild("email").equalTo(email).on('value', snap => {
      let obj  = snap.val();       
      for(var i in obj){
        let image_uri = obj[i].profile_pic;
        var info = [];
        info.push({'username': obj[i].username, 'email':obj[i].email, 'phone':obj[i].phone ,'location':obj[i].location})
                
        if(image_uri){
          this.setState({image_uri:image_uri})
        }
       
      }
      console.log(info)
      
      this.componentWillReceiveProps(info);
      let z = Object.keys(obj)[0];      
      this.setState({recordId:z})
     
      
      

    });
  }
  
  componentWillReceiveProps(nextProps){
   // console.log(nextProps)
    this.setState({userDetail:nextProps[0]})
  }
  
  selectPhotoTapped() {
      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true
        }

      };
  
      ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);
  
        if (response.didCancel) {
          console.log('User cancelled photo picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {            
           this.uploadImage(response.uri).then(url => { 
            ToastAndroid.show('Image uploaded to firebase', ToastAndroid.BOTTOM)
             this.setState({image_uri: url})             
             let users = firebaseApp.database().ref('/users/'+this.state.recordId).update({"profile_pic":this.state.image_uri});
             
              }).catch(error => console.log(error))  
         
        }
      });
    }
    

    uploadImage(uri, mime = 'application/octet-stream') {
      return new Promise((resolve, reject) => {
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        let uploadBlob = null
  
        const imageRef = firebaseApp.storage().ref('picture').child('image_001')
  
        fs.readFile(uploadUri, 'base64')
          .then((data) => {
            return Blob.build(data, { type: `${mime};BASE64` })
          })
          .then((blob) => {
            uploadBlob = blob
            return imageRef.put(blob, { contentType: mime })
          })
          .then(() => {
            uploadBlob.close()
            return imageRef.getDownloadURL()
           // let users = firebaseApp.database().ref('/users/'+this.state.recordId).update({"profile_pic":imageRef.getDownloadURL()});
            
            
            

          })
          .then((url) => {
            resolve(url)
          })
          .catch((error) => {
            reject(error)
        })
      })
    }
    
    goToEditUser(e){
      let data = {"key" :this.state.recordId , data : e}
      this.props.navigation.navigate('editUser',{param : data});
    }
    render(){

        const { navigate } = this.props.navigation;
        console.log(this.state.userDetail)

        
        return(
          
       
          
          <View style={styles.container}>
            <View style={styles.content1}>
                <View style={styles.topContainer}>
                 <View style={styles.headerContainer}>
                     <TouchableOpacity style={styles.memuIcon} onPress={() => { navigate('Home'); } }>
                       <Icon name="arrow-left" color="#fff" size={20} />

                     </TouchableOpacity>
                     <Text style={styles.title}>Profile</Text>
                     <TouchableOpacity style={styles.searchIcon}>
                       <Icon name="edit" size={20} color="#fff" onPress= {this.goToEditUser.bind(this,this.state.userDetail)}/>
                     </TouchableOpacity>                  
                 </View>
                </View >          
               
            </View>   

            <View style={styles.content2}>
              <ScrollView scrollsToTop={false} style={styles.menu}>         
          
                  <View style={styles.avatarContainer}>
                   <Image style={styles.avatar} source={{uri: this.state.image_uri}} />
                               
                  </View> 
                 
                  <Text style={styles.camera} ><Icon name="camera" size={15} color="#9c27b0" onPress={this.selectPhotoTapped.bind(this)}/></Text>         
                  <Text style={styles.name}> {this.state.userDetail.username}</Text>
                  <View>
                      <Text  style={styles.item}><Icon name="user" size={20} color="#9c27b0"/><Text>  {this.state.userDetail.username}</Text></Text>                                       
                      <Text  style={styles.item}><Icon name="envelope" size={20} color="#9c27b0"/>   {this.state.userDetail.email}</Text>
                      <Text  style={styles.item}><Icon name="phone" size={20} color="#9c27b0"/>   {this.state.userDetail.phone}</Text>
                      <Text  style={styles.item}><Icon name="map-marker" size={20} color="#9c27b0"/>   {this.state.userDetail.location}</Text>   
                  </View>             
              
                </ScrollView>
            </View>
          </View>
        )
        
    } 
   
 
}





export default Contact;
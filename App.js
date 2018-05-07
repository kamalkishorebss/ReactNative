/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {StyleSheet,Text,  View, StatusBar} from 'react-native';
import FeedBack from './src/Router';

export default class App extends Component{
  render() {
    return (
        
        <FeedBack/>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  }
 
});

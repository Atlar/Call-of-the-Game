import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MainButton} from './components/MainButton.js';

export class MainView extends Component{
 
 let Anim1;
 
 doCall = () =>{
 
 //pass all animation to children
 
} 
 registerAnimation =(animationCall) =>{
 
 this.Anim1 = animationCall;
 
} 
 render(){
 return(
 <View style={styles.buttonContainer}>
 <Text>
 Hello, World! 
 </Text>
 <MainButton callOnPress={this.doCall} />
 </View>
 );
} 
 
} 

const styles=StyleSheet.create({
 
 buttonContainer:{
  flex:0.3,
  flexDirection: 'row', 
  justifyContent: 'center', 
  
}, 
 
});

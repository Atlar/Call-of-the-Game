import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MainButton} from 'MainButton.js';

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
 <View>
 <Text>
 Hello, World! 
 </Text>
 <MainButton callOnPress={this.doCall} />
 </View>
 );
} 
 
} 
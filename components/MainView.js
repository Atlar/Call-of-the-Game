import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MainButton} from './MainButton.js';

export class MainView extends Component{
 
 Anim1;
 constructor(props){
   super(props);
   this.state={text:'not' };
 }
 
 doCall = () =>{
 
 this.setState({text:'Press'});
 //pass all animation to children
 
} 
 registerAnimation =(animationCall) =>{
 
 this.Anim1 = animationCall;
 
} 
 render(){
 return(
 <View style={styles.buttonContainer}>
 <Text>
 Hello, World! {this.state.text}
 </Text>
 <MainButton callOnPress={this.doCall} />
 </View>
 );
} 
 
} 

const styles=StyleSheet.create({
 
 buttonContainer:{
  flex:1,
  flexDirection: 'row', 
  justifyContent: 'center', 
  alignItems:'center', 
  backgroundColor:'#301000',
  
}, 
 
});
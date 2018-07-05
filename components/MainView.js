import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MainButton} from './MainButton.js';
import {RippleEffect} from './RippleEffect.js';
import {RippleSpawner} from './RippleSpawner.js';

export class MainView extends Component{
 
 Anim1;
 SpawnRipples;
 constructor(props){
   super(props);
   this.state={text:'not' };
 }
 
 doCall = () =>{
 
 this.setState({text:'Press'});
 //pass all animation to children
 //this.Anim1();
 
 //Spawn Ripples
 //setupe array of ripples to spawn
 RipplesSeed = [ 10, 15,20,25,30,35];
 
 this.SpawnRipples(
 	RipplesSeed.map( //init array of ripplesand feed it to spawn
 		(item) => {
 			return { positionX: item, positionY: 50, strength: 1 }
 			}
 					)
 				);
 
} 
 registerAnimation =(animationCall) =>{
 
 this.Anim1 = animationCall;
 
} 
registerSpawn =(spawnFunction) => {
	//function to be called on button or message
	this.SpawnRipples = spawnFunction;
} 
 render(){
 return(
 <View style={styles.buttonContainer}>
 <Text style={styles.headline} >
 Hello, World! {this.state.text}
 </Text>
 <RippleSpawner style={{flex:1}} registerFunction={}/>
 <MainButton callOnPress={this.doCall} />
 </View>
 );
}
 
} 

const styles=StyleSheet.create({
 
 buttonContainer:{
  flex:1,
  flexDirection: 'column', 
  justifyContent: 'center', 
  alignItems:'center', 
  backgroundColor:'#301000',
  
}, 
headline:{
 color:'#f0f0f0',
 fontSize:23,
}, 
 
});
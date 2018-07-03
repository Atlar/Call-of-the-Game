import React, {Component} from 'react';
import {View, Text, StyleSheet,TouchableHighlight} from 'react-native';

export class RippleEffect extends Component{
 
 //create state to animate ripple
 constructor(props){
 super(props);
 
 this.state={animOpacity:0,animSize:0};
} 
 
 componentDidMount=() =>{
 
 //register animation
 this.props.registerAnim(startAnimation);
 
} 
 startAnimation = () => {} 

 render(){
 return(
 <View >
 <View style={styles.button}>
 </View>
 </Vie>
 );
} 
 
} 

const underlay='#004010';

const styles=StyleSheet.create({
 
 button:{
  justifyContent: 'center', 
  alignItems:'center', 
  backgroundColor:'#f013000',
  width:100,
  heigth:100,
},
 
 
});
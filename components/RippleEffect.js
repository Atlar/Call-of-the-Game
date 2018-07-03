import React, {Component} from 'react';
import {View, Text, StyleSheet,TouchableHighlight, Animated} from 'react-native';

export class RippleEffect extends Component{
 
 //create state to animate ripple
 constructor(props){
 super(props);
 
 this.state={
 //set opacity animation
 animOpacity:new Animated.Value(0.5),
 //set size animation
 animSize:new Animated.Value(0)};
} 
 
 componentDidMount=() =>{
 
 //register animation
 this.props.registerAnim(this.startAnimation);
 
} 
 startAnimation = () => {
 
 //animate opacity
 
 Animated.timing(                  // Animate over time
 this.state.animOpacity,            // The animated value to drive
 {
 toValue: 0,                   // Animate to opacity: 1 (opaque)
 duration: 1000,              // Make it take a while
 }
 ).start();
 
 //animate size
 
 Animated.timing(                  // Animate over time
 this.state.animSize,            // The animated value to drive
 {
 toValue: 100,                   // Animate to opacity: 1 (opaque)
 duration: 1000,              // Make it take a while
 }
 ).start();
 
 } 

 render(){
 return(
 <Animated.View style={{position:absolute,opacity:[{this.animOpacity}], height:[{this.state.animSize}] ,width:[{this.animSize}],} }>
 <View>
 </View>
 </Animated.View>
 );
} 
 
} 

const underlay='#004010';

const styles=StyleSheet.create({
 
 ripple:{
  justifyContent: 'center', 
  alignItems:'center', 
  backgroundColor:'#f013000',
  heigth:100,
},
 
 
});
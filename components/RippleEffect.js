import React, {Component} from 'react';
import {View, Text, StyleSheet,TouchableHighlight, Animated} from 'react-native';

export class RippleEffect extends Component{
 
 //create state to animate ripple
 constructor(props){
 super(props);
 
 const maxOpacity=0.5;
 
 this.state={
 
 //set start size from props
 startSize: props.startingSize,
 
 maxOpacity: maxOpacity, 
 //set opacity animation
 animOpacity:new Animated.Value(maxOpacity),
 //set size animation
 animSize:new Animated.Value(0)};
} 
 
 componentDidMount=() =>{
 
 //register animation
 this.props.registerAnim(this.startAnimation);
 
} 
resetAnimation = () => {

this.state.animOpacity.setValue(this.state.maxOpacity);
this.state.animSize.setValue(this.state.startSize);

} 

 startAnimation = () => {
 
 //restart animations
 this.resetAnimation();
 
 //animate opacity
 
 Animated.timing(                  // Animate over time
 this.state.animOpacity,            // The animated value to drive
 {
 toValue: 0,                   // Animate to opacity: 1 (opaque)
 duration: 300,              // Make it take a while
 }
 ).start();
 
 //animate size
 
 Animated.timing(                  // Animate over time
 this.state.animSize,            // The animated value to drive
 {
 toValue: 500,                   // Animate to opacity: 1 (opaque)
 duration: 300,              // Make it take a while
 }
 ).start(this.resetAnimation);
 
 } 

 render(){
 return(
 <Animated.View style={[styles.ripple, {opacity:this.state.animOpacity, height:this.state.animSize ,width:this.state.animSize}]  }>
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
  backgroundColor:'#ff1300',
  position:'absolute', 
},
 
 
});
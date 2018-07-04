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
 animSize:new Animated.Value(0), 
 
 positionX: 0,
 positionY: 0,
 strength: 1,
 
 };
} 
 
 componentDidMount=() =>{
 
 //register animation
 //this.props.registerAnim(this.startAnimation);
 this.props.registerAnim(this.animateOnLocation, this.props.id);
 
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
 toValue: 20,                   // Animate to opacity: 1 (opaque)
 duration: 300,              // Make it take a while
 }
 ).start(
 	 () => {this.resetAnimation;
 	 		this.props.onFinish(this.props.id);
 	} );
 
 } 

//setup new location and strength and start animation
animateOnLocation=(rippleData) =>{
this.changeRippleState(rippleData);
this.startAnimation();
} 

//change location and strength
changeRippleState=(rippleData) ={

//change location and strength
this.setState({positionX: rippleData.positionX,
 positionY:rippleData.positionY,
  strength: rippleData.strength} );

} 


 render(){
 return(
 <Animated.View style={[styles.ripple, {opacity:this.state.animOpacity, height:this.state.animSize ,width:this.state.animSize, top:100, right: this.state.positionX}]  }>
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
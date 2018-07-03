import React, {Component} from 'react';
import {View, Text, StyleSheet,TouchableHighlight} from 'react-native';

export class MainButton extends Component{
 
 //This just touchable zone 
 //all animations are defined by parent
 handleTouch=() =>{
 
 //call parent function activate animations
 this.props.callOnTouchthis.props.callOnPress();
 
 } 
 
 render(){
 return(
 <TouchableHighlight style={styles.button} underlayColor={underlay}   onPress={this.handleTouch}>
 <View>
 </View>
 </TouchableHighlight>
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
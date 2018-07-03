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
 <TouchableHighlight onPress={this.handleTouch}>
 <View>
 </View>
 </TouchableHighlight>
 );
} 
 
} 
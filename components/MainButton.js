import React, {Component} from 'react';
import {View, Text, StyleSheet,TouchableHighlight} from 'react-native';

export class MainButton extends Component{
 
 //This just touchable zone 
 //all animations are defined by parent
 handleTouch=() =>{
 
 //call parent function activate animations
 this.props.callOnPress();
 
 } 
 
 render(){
 return(
 <TouchableHighlight underlayColor={underlay}   onPress={this.handleTouch}>
 <View style={styles.button}>
 <Text>Press</Text>
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
  backgroundColor:'#f01300',
  width:100,
  height:100,
},
 
 
});
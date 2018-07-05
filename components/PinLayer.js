import React, {Component} from 'react';
import {View, Text, PanResponder, StyleSheet } from 'react-native';

export default class PinField extends Component{

	render(){
		return(
			<View style={styles.pinField}>
			{this.props.children}
			</View>
		); 
	} 
} 

const styles=StyleSheet.create(
	{
		
	},  
);
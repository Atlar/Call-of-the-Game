import React, {Component} from 'react';
import {View, Animated, PanResponder, StyleSheet} from 'react-native' ;

export class PinCross extends Component{

	render() {
		<Animated.View style={styles.host, this.props.style}>
			<View style={[styles.common,styles.vertical]} />
			<View style={[styles.common,styles.horizontal]} />
		</Animated.View>
	
	} 

} 

const LINE_WIDTH = 1;
const LINE_COLOR = '#ffffff';

const styles={
		//
		common:
		{
			flex:1, 
			backgroundColor:LINE_COLOR, 
		}, 
		vertical:
		{
			flexDirection: 'column', 
			width:LINE_WIDTH,
		} 
		horizontal:
		{
			flexDirection: 'row', 
			height:LINE_WIDTH, 
		} 
		host:
		{
			position:'absolute';
		} 
} 
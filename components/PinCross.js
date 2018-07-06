import React, {Component} from 'react';
import {View, Animated, PanResponder, StyleSheet} from 'react-native' ;

export class PinCross extends Component{

	render() {
		return(
			<Animated.View style={styles.host, this.props.style}>
				<Animated.View style={[styles.common,styles.vertical,{opacity :this.props.style.opacity} ]} />
				<Animated.View style={[styles.common,styles.horizontal, {opacity :this.props.style.opacity}]} />
			</Animated.View>
	);
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
		}, 
		horizontal:
		{
			flexDirection: 'row', 
			height:LINE_WIDTH, 
		}, 
		host:
		{
			flex: 1,
			position:'absolute', 
		}, 
} 
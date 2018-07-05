import React, { Component } from 'react';
import { View, Text, PanResponder, StyleSheet, Animated } from 'react-native';
import { PinCircle } from './PinCircle.js';

export class PinField extends Component{
	constructor(){
        //create pan animated Value to track the pin
        this.state = {
            pinXY: new Animated.ValueXY()
        };
    } 
    onComponentWillMount() {
        this.panRespond = PanResponder.create({
            
            //respond to move
            
            //respond to touch
            onStartShouldSetPanResponder: (e, gesture) => true,
            //on Move
            onPanResponderMove: Animated.event([
                null,//ignore event?
                { dx: this.state.pinXY.x, dy: this.state.pinXY.y }
            ])

        });

        // adjusting delta value
        this.state.pinXY.setValue({ x: 0, y: 0 });


    }

    render(){
        const PinMoveStyle = {
            transform: this.state.pinXY.getTranslateTransform()
        } 
		return(
            <View style={styles.pinField} {...this.panRespond.panHandlers}>
                <PinCircle style={PinMoveStyle} />
			{this.props.children}
			</View>
		); 
	} 
} 

const styles=StyleSheet.create(
	{
		pinField:{
			flex:1,
		} 
	},  
);
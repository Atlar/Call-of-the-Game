import React, { Component } from 'react';
import { View, Text, PanResponder, StyleSheet, Animated } from 'react-native';
import {PinCross} from './PinCross.js';

export class PinLayerCross extends Component {
    // PinLayerCross
    
    constructor(props) {
        super(props);
        //create pan animated Value to track the pin
        this.state = {
            pinXY: new Animated.ValueXY(),
            ready: new Animated.Value(),

        };
        this.pinPos = { x: 0, y: 0 };
        this.pinFix = true;
        this.pull = false;
    }
    componentWillMount() {
        // Add a listener for the delta value change
        this._val = { x: 0, y: 0 };
        this.state.pinXY.addListener((value) => this._val = value);

		this.state.ready.setValue(0);

        this.panRespond = PanResponder.create({
		
            //respond to move
            onPanResponderGrant: (e, gestureState) => {
                this.pull = true;
                this.state.pinXY.setValue({ x: -gestureState.dx, y: -gestureState.dy });
                this.state.pinXY.setOffset({ x: this.pinPos.x, y: this.pinPos.y });
                setTimeout(() => {
                    if (this.pull) {
                        this.pinFix = false;
                        //this.state.pinXY.setOffset({ x: 0, y: 0 });
                        //this.state.pinXY.setValue({ x: this.pinPos.x, y: this.pinPos.y });
                        //place for ready-to-move animation
                    }
                }, 300);
                //starting animation
                //starts immediately
                Animated.timing(
                  this.state.ready,{
                      toValue: 0.5,
                      duration: 300,}).start();
                                                                    
            },
            //respond to touch
            onStartShouldSetPanResponder: (e, gesture) => true,
            //on Move
            onPanResponderMove: (e, gesture) => {
                this.pull = true;
                if (!this.pinFix) {
                    //this.state.pinXY.setOffset({ x: 0, y: 0 });
                    //move with fingers
                    Animated.spring(this.state.pinXY, {
                        toValue: { x: gesture.dx, y: gesture.dy},
                        friction: 5
                    }).start();
                }},
                //on release
            onPanResponderRelease: (e, gesture) => {
                //this.state.pinXY.setOffset({ x: 0, y: 0 });
                //if changed pos
                if (!this.pinFix) {
                	//calculate new pos
                    this.pinPos = { x:this._val.x, y: this._val.y };
                    //send new pose
                    this.sendPinData(this.pinPos);
                    //confirmation animation
                    //flash to 100 opacity and back
                    Animated.sequence([Animated.timing(
                    	this.state.ready,{
                   		toValue: 1,
                    duration: 50,}),
                     Animated.timing(
                     this.state.ready,{
                     toValue: 0.5,
                     duration: 100,})
                     ]).start();
                }
                this.pinFix = true;
                this.pull = false;
                //this.state.pinXY.setValue({ x: this.pinPos.x, y: this.pinPos.y });
                //return to position animation
                /*Animated.timing(this.state.pinXY, {
                    toValue: { x: 0, y: 0 },
                    duration: 50,
                }, ).start();*/
                //fade back
              	Animated.timing(
                	this.state.ready,{
                	toValue: 0,
                	duration: 1000,
                	delay:300,}).start();
                //this.state.pinXY.setOffset({x: this.state.pinXY.x._value, y: this.state.pinXY.y._value});
            }

        });

        // adjusting delta value
        //this.state.pinXY.setValue({ x: 0, y: 0 });


    }
    sendPinData = () => {
        if (this.props.pinListener !== undefined) {
            this.props.pinListener(this.pinPos);
        }
    }

    render() {
        
        const PinStyle = {
            position: 'absolute',
            transform: this.state.pinXY.getTranslateTransform(),
            opacity: this.state.ready, 
        }
       
        return (
            <View style={styles.pinField} {...this.panRespond.panHandlers}>
            <PinCross style={PinStyle} />
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create(
    {
        pinField: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: '#ffffff10',
        }
    },
);
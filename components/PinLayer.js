import React, { Component } from 'react';
import { View, Text, PanResponder, StyleSheet, Animated } from 'react-native';
import { PinCircle } from './PinCircle.js';

export class PinLayer extends Component {
    constructor(props) {
        super(props);
        //create pan animated Value to track the pin
        this.state = {
            pinXY: new Animated.ValueXY(),
            shake: new Animated.Value(),

        };
        this.pinPos = { x: 0, y: 0 };
        this.pinFix = true;
        this.pull = false;
    }
    componentWillMount() {
        // Add a listener for the delta value change
        this._val = { x: 0, y: 0 };
        this.state.pinXY.addListener((value) => this._val = value);

        this.panRespond = PanResponder.create({

            //respond to move
            onPanResponderGrant: (e, gestureState) => {
                this.pull = true;
                setTimeout(() => {
                    if (this.pull) {
                        this.pinFix = false;
                        this.state.pinXY.setOffset({ x: 0, y: 0 });
                        this.state.pinXY.setValue({ x: this.pinPos.x, y: this.pinPos.y });
                        Animated.spring(this.state.pinXY, {
                            toValue: { x: gestureState.x0 - 40 * 0, y: gestureState.y0 - 40 * 0 },
                            friction: 3
                        }).start();
                    }
                }, 300);
                /*Animated.timing(
                  this.state.shake,{
                      toValue: 100,
                      duration: 2000,}).start(
                                              ()=>{ 
                                                  //callback
                                                  Animated.spring(this.state.pinXY, {
                                                  toValue: { x: gestureState.x0, y: gestureState.y0 },
                                                  friction: 3,
                                              }).start();
                                                  this.pinFix = false;
                                              }
                );*/
                this.state.pinXY.setOffset({ x: this.pinPos.x, y: this.pinPos.y });
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(this.state.pinXY, {
                            toValue: { x: 3, y: -2 },
                            duration: 50,
                        }, ),
                        Animated.timing(this.state.pinXY, {
                            toValue: { x: -3, y: 1 },
                            duration: 50,
                        }, )
                    ])
                ).start();
                //stop
                /*Animated.add(Animated.spring(this.state.pinXY, {
                                                  toValue: { x: gestureState.x0, y: gestureState.y0 },
                                                  friction: 3,
                                              }),Animated.spring(this.state.pinXY, {
                                                  toValue: { x: gestureState.x0, y: gestureState.y0 },
                                                  friction: 3,
                                              }));*/
                // Set the initial value to the current state
                //this.state.pinXY.setOffset({x: this.state.pinXY.x._value, y: this.state.pinXY.y._value});
                //this.state.pinXY.setValue({x: 0, y: 0});
            },
            //respond to touch
            onStartShouldSetPanResponder: (e, gesture) => true,
            //on Move
            onPanResponderMove: (e, gesture) => {
                this.pull = true;
                if (!this.pinFix) {
                    this.state.pinXY.setOffset({ x: 0, y: 0 });
                    Animated.spring(this.state.pinXY, {
                        toValue: { x: gesture.moveX - 40 * 0, y: gesture.moveY - 40 * 0 },
                        friction: 3
                    }).start();
                }/*Animated.event([
                null,//ignore event?
                { moveX: this.state.pinXY.x, moveY: this.state.pinXY.y }
            ])*/},
            onPanResponderRelease: (e, gesture) => {
                this.state.pinXY.setOffset({ x: 0, y: 0 });
                //if changed pos
                if (!this.pinFix) {
                    this.pinPos = { x: gesture.moveX, y: gesture.moveY };
                    this.sendPinData(this.pinPos);
                }
                this.pinFix = true;
                this.pull = false;
                this.state.pinXY.setValue({ x: this.pinPos.x, y: this.pinPos.y });
                Animated.timing(this.state.pinXY, {
                    toValue: { x: this.pinPos.x, y: this.pinPos.y },
                    duration: 50,
                }, ).start();
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
        const animX = Math.max(10, this.state.pinXY.x - 10);
        const animY = Math.max(10, this.state.pinXY.y - 10);
        //const anim = Animated.add(this.state.shake,this.state.pinXY.x);
        const PinMoveStyle = {
            position: 'absolute',
            //left: 0, right: 0, top: 0, bottom: 0,
            //transform:[{translateX: this.state.pinXY.x},{translateY: this.state.pinXY.y},], 
            /*transform:Animated.add(this.state.pinXY,this.state.shake.interpolate(
                   {
                        inputRange: [0,20,40,70,100],
                        outputRange: [0,10,0,20,0],
                    })).getTranslateTransform(),*/
            //transform:{translateX: Animated.add(this.state.shake, this.state.pinXY.x) },
            transform: this.state.pinXY.getTranslateTransform(),
        }
        return (
            <View style={styles.pinField} {...this.panRespond.panHandlers}>
                <PinCircle style={PinMoveStyle} />
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
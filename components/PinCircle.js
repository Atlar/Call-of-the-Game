import React, { Component } from 'react';
import { View, Text, PanResponder, StyleSheet, Animated } from 'react-native';

export class PinCircle extends Component {

    render(){
        return (
                <Animated.View style={[this.props.style, styles.circle]}>
                {//maybe some icon will be there
                }
                </Animated.View>
            );
    }


}

const CIRCLE_RADIUS = 40;
const COLOR = '#ffffff';

const styles = StyleSheet.create({
    circle: {
            backgroundColor: COLOR,
            width: CIRCLE_RADIUS,
            height: CIRCLE_RADIUS,
            borderRadius: CIRCLE_RADIUS / 2,
        },
        });
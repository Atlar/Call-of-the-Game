import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { MainButton } from './MainButton.js';
import { RippleEffect } from './RippleEffect.js';
import { RippleSpawner } from './RippleSpawner.js';
import { PinLayer } from './PinLayer.js';
import { Gridder } from './Gridder.js';
import { PinLayerCross}  from './PinLayerCross.js';
import SocketIO from 'socket.io-client';

export class MainView extends Component {

    Anim1;
    SpawnRipples;
    constructor(props) {
        super(props);
        this.state = { text: 'not' };
        this.pinPos = { x: 0, y: 0 };
        this.grid = new Gridder;
        //init connection
        this.ioConnection = SocketIO('https://obscure-journey-22772.herokuapp.com/');
        this.imageDimensions = { offset: { x: 0, y: 0 }, width: 0, height: 0 };
    }
    componentDidMount() {

        this.ioConnection.on('presses', this.messageHandler);
        this.ioConnection.on('callMap', this.messageMapHandler);
    }

    doCall = () => {

        this.setState({ text: 'Press' });
        //pass all animation to children
        //this.Anim1();
        //form message
        var message = { loc: this.pinPos, strength: 1 };
        //send
        this.ioConnection.emit('press', message);


        //Spawn Ripples
        //setupe array of ripples to spawn
        let RipplesSeed = [10, 15, 20, 25, 30, 35];

        this.SpawnRipples(
            RipplesSeed.map( //init array of ripplesand feed it to spawn
                (item) => {
                    return { positionX: item, positionY: 50, strength: 1 }
                }
            )
        );

    }
    //relative pos calculation

    registerAnimation = (animationCall) => {

        this.Anim1 = animationCall;

    }
    registerSpawn = (spawnFunction) => {
        //function to be called on button or message
        this.SpawnRipples = spawnFunction;
    }

    handlePinPos = (pos) => {
        //calculate relative to image

        this.pinPos = pos - this.imageDimensions.offset;


    }
    messageMapHandler = (message) => {
        //message structure {calls: [ { loc:{x:,y:}, strength:, time: }...]}
        this.SpawnRipples(
            message.calls.map((item) => { return { positionX: item.loc.x, positionY: item.loc.y, strength: item.strength } })
        );

    }
    messageHandler = (message) => {

        //do nothing

    }
    saveImageDimensions = (event) => {
        //{nativeEvent: { layout: {x, y, width, height}}}
        this.imageDimensions = { offset: { x: event.nativeEvent.layout.x, y: event.nativeEvent.layout.y }, width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height };

    }
    render() {
        return (
            <View style={styles.buttonContainer}>
                <Text style={styles.headline} >
                    Hello, World! {this.state.text}
                </Text>
                <ImageBackground onLayout={this.saveImageDimensions} source={"../resources/RusMap.png"} resizeMode="contain" style={{ width: '100%', height: '100%', /*backgroundColor:'#fab0a1'*/ }} >
                <PinLayerCross pinListener={this.handlePinPos}>
                <RippleSpawner style={{ flex: 1 }} registerFunction={this.registerSpawn}>
                        </RippleSpawner>
                    </PinLayerCross>
                </ImageBackground>
                <MainButton callOnPress={this.doCall} />
            </View>
        );
    }

}

const styles = StyleSheet.create({

    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#301000',

    },
    headline: {
        color: '#f0f0f0',
        fontSize: 23,
    },

});
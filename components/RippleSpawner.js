import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {RippleEffect} from './RippleEffect.js';

export class RippleSpawner extends Component {

    //buffer contains all faded ripples. 
    buffer = [];
    bufferSize = 0;

    //create state to animate ripple
    constructor(props) {
        super(props);

        this.state = {
            //array of ripples
            ripples: [{positionX:0, positionY:0, strength:1}],
            //ripples {id, startAnimFunction} 
            ready: false,
            text: '',
        };
        this.rippleCount = 0;

    }

    //create New ripple, not from buffer
    createRippleEntry = (initialRipple, index) => {

        this.rippleCount++;
        return {
            id: this.rippleCount,
            initialData: initialRipple,
        }

    }

    spawnRipples = (ripples) => {
        //ripples {strength,positionX, positionY}

        //get num to spawn
        var spawnNum = ripples.length;

        

        var bufferedNum = Math.min(this.bufferSize, spawnNum);

        for (var i = 0; i < bufferedNum; i++) {
            //remove last from buffer 
            var newRipple = this.buffer.pop();
            this.bufferSize = Math.max(0, this.bufferSize - 1);

            //buffer has only registered ripples bu check
            if (newRipple.hasOwnProperty('startAnimFunction')) {
                //buffer had this function ready
                newRipple.startAnimFunction(ripples[i]);
            }

        }
        //add rest to the spawnqueu
        var spawnQueue = ripples.slice(bufferedNum).map((item,i) => this.createRippleEntry(item, i));

        //sl = ripples.slice(bufferedNum);
        //qu = sl.map((item, i) => this.createRippleEntry(item, i));

        //this.setState({ text: spawnQueue[1].initialData.positionX });

        //update spawner state thus spawning new ripples
        if (this.state.hasOwnProperty('ripples')) {
            this.setState({ text: 'has prop' });
            if (this.state.ripples !== undefined) {
                if (this.state.ripples.length > 0) {
                    this.setState({ ripples: this.state.ripples.concat(spawnQueue)} );
                    this.setState({ text: 'not undef - concat' });
                } else {
                    this.setState({ ripples: spawnQueue });   
                    this.setState({ text: 'not undef - len = 0' });
                }

            } else {
                this.setState({ ripples: spawnQueue });
                this.setState({ text: 'undef - set' });
            }
        }else{
            this.setState({ ripples: spawnQueue });
            this.setState({ text: 'no prop - set' });
        }
        /*
        rippleCount;
        ripples.map( (item, i)=>{
        //for each ripple
        //check if buffer can help
        if(this.bufferSize > 0){
        newRip = this.buffer.pop();
        this.bufferSize = max(0,this.bufferSize - 1);
       } else{
        newRip = createRippleEntry();
 
       } 
        }  );
        */
        /*
        newRipple;
 
        //get num to spawn
        spawnNum = ripples.length;
 
        //check if can use buffer
        if(this.bufferSize > 0)
        {
 
        //how many to take
        bufferedNum = min(this.bufferSize, spawnNum); 
        for(i = 0; i<bufferedNum; i++){
        //remove last from buffer 
        newRipple = this.buffer.pop();
        this.bufferSize = max(0,this.bufferSize - 1);
        //buffer has only registered ripples bu check
        if(newRipple.startAnimFunction!=undefined){
       //buffer had this function ready
       newRipple.startAnimFunction(ripples);
       } 
 
       } 
        Array(bufferedNum).full();
 
 
        }else
        */
    }

    //find id in array of ripples and set anim function
    registerAnimationById = (animFunction, id) => {
        
        var ripplesUpdated = this.state.ripples;
        ripplesUpdated.forEach(
        		(item, i) => {
        			if (item.id == id) {
       					 item.startAnimFunction = animFunction;
       				 }
     			   }
      		  	)
        //state must be new array 
        this.setState({ripples: ripplesUpdated});

    }
    //add ripple to buffer until next call
    addToBuffer = (id) => {

        //find ripple by id and add to buffer
       
        this.buffer.push(
            this.state.ripples.find(
                (item) => item.id == id)
        );
        this.bufferSize = this.buffer.length;
    }

    //register ripple spawn function

    componentDidMount = () => {

        //register ripple funcion so that parent could call for ripples to spawn
        this.props.registerFunction(this.spawnRipples);

    }
    /*
resetAnimation = () => {

    this.state.animOpacity.setValue(this.state.maxOpacity);
    this.state.animSize.setValue(this.state.startSize);

} 

 startAnimation = () => {
 
     //restart animations
     this.resetAnimation();
 
     //animate opacity
 
     Animated.timing(                  // Animate over time
     this.state.animOpacity,            // The animated value to drive
     {
     toValue: 0,                   // Animate to opacity: 1 (opaque)
     duration: 300,              // Make it take a while
     }
     ).start();
 
     //animate size
 
     Animated.timing(                  // Animate over time
     this.state.animSize,            // The animated value to drive
     {
     toValue: 500,                   // Animate to opacity: 1 (opaque)
     duration: 300,              // Make it take a while
     }
     ).start(this.resetAnimation);
 
 }  
*/
    handleOnLayout = (e) => {
        this.setState({ ready: 1 });
    }

    render() {
        return (
            <View style={{ flex: 1, }} onLayout={this.handleOnLayout}>
                <Text style={{ color: '#ffffff', }}>{this.state.ripples.length +' ' + this.state.text}</Text>
                {/*this.state.hasOwnProperty('ripples') &&*/ this.state.ripples.map(({ id, initialData }) =>
                    <RippleEffect key={id} id={id} onFinish={this.addToBuffer} registerAnim={this.registerAnimationById} initialData={initialData} startingSize={0} />
                )}
                {/*this.props.children*/}
            </View>);
    }
}
const underlay='#004010';

const styles=StyleSheet.create({
 
 ripple:{
  justifyContent: 'center', 
  alignItems:'center', 
  backgroundColor:'#ff1300',
  position:'absolute', 
},
 
 
});
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, StyleSheet } from 'react-native';
import colour from '../helpers/colors';

export default class Chart extends Component {
    static propTypes = {
    };
    
    state = {
        height: new Animated.Value(0),
    }

    componentDidMount(){
        const {value} = this.props;

        Animated.timing(
            //Animate over time
            this.state.height,
            {
                toValue: value,
                duration: 1000 //Make it take a while
            }
        ).start();
    }
    
    render() {
        const {padding, color} = this.props;
        const {height} = this.state;
        
        const container = {
            paddingLeft: padding.left,
            paddingRight: padding.right
        };
        const animatedBlock = {
            backgroundColor: color,
            borderColor: colour.shade(color, -0.5),
            paddingTop: height  // Bind opacity to animated value
        };

        return (
            <View style={[styles.view, container]}>
                <Animated.View
                    style={[styles.highlight, animatedBlock]}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    highlight:{
        "borderColor": "#cdcdcd",
        "borderWidth": 1,
        "width": 10 ,
    },
    view: {
        "backgroundColor": 'white',
        "borderBottomWidth": 1,
        "borderColor": "#cdcdcd",
        "borderTopWidth": 1,
        "flex": 1,
        "flexDirection": "column",
        "justifyContent": "flex-end",
        "paddingHorizontal": 1,
        "paddingVertical": 2,
    }
});

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Animated, StyleSheet } from 'react-native';

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
        const {padding} = this.props;
        const {height} = this.state;
        
        const container = {
            paddingLeft: padding.left,
            paddingRight: padding.right
        };
        const animatedBlock = {
            backgroundColor: 'black',
            borderColor: 'border 1px solid white',
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
        "backgroundColor": "#f9f9f9",
        "borderColor": "#cdcdcd",
        "borderRadius": 5,
        "borderWidth": 1,
        "width": 10,
    },
    view: {
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

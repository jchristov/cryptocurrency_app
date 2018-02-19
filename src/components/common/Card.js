import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native';

export default class Card extends Component {
    render() {
        const {children, style} = this.props;
        return (
            <View style={[styles.container, style]}>
                {children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowOffset: {
            height: 2,
            width: 0
        },
        backgroundColor: '#FDFDFD'
    }
});

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Back extends Component {
    static propTypes = {
    };

    render() {
        return (
            <TouchableOpacity onPress={this.props.onBackPress} style={styles.control}>
                <Ionicons name='ios-arrow-back-outline' size='28' color='white'/>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    control: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20
    }
})
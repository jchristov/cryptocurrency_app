import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class SearchIcon extends Component {
    static propTypes = {

    };

    render() {
        return (
            <TouchableOpacity style={styles.icon}>
                <Ionicons name="ios-search-outline" size={24} color="black"/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    icon : {
        marginHorizontal 	: 15
    } 
})

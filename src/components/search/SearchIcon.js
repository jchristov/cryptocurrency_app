import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {observer, inject} from 'mobx-react';

@inject('search')
@observer
export default class SearchIcon extends Component {
    static propTypes = {
        
    };

    handlePress = () => {
        if(this.props.search.toggleOpen){
            this.props.search.toggleOpen();
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.icon} onPress={this.handlePress}>
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

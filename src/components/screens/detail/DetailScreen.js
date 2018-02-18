import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Tree from '../../tree';

export default class DetailScreen extends Component {
    
    static propTypes = {
    };

    static navigationOptions = ({ navigation }) => ({
        title: `Event ${navigation.state.params.uid}`
    });
       
    render() {
        const { navigation } = this.props;
        const uid = navigation.state.params.uid;

        return <Tree uid={uid} /> 
    }
}
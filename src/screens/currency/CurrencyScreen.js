import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native';
import Currency from '../../components/currency/Currency';

class CurrencyScreen extends Component {
    
    static navigationOptions = ({ navigation }) => ({
        title: `Currency ${navigation.state.params.uid}`
    });

    render() {
        return <Currency/>
    }
}

const styles = StyleSheet.create({

});

export default CurrencyScreen;
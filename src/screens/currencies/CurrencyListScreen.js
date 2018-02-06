import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native';
import CurrencyList from '../../components/currency/CurrencyList'

class CurrencyListScreen extends Component {
    
    static navigationOptions = {
        title: 'Currency List '
    }

    render() {
        return <CurrencyList onCurrencyPress={this.handleCurrencyPress}/>
    }

    handleCurrencyPress = (uid) => {
        console.log('----', uid);
        this.props.navigation.navigate('currency', {uid});
    }
}

const styles = StyleSheet.create({

});

export default CurrencyListScreen;
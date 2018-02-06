import React, { Component } from 'react'
import {View} from 'react-native';
import CurrencyList from '../../components/currency/CurrencyList'

class CurrencyListScreen extends Component {
    
    static navigationOptions = {
        title: '123'
    }

    render() {
        return <CurrencyList onCurrencyPress={this.handleCurrencyPress}/>
    }

    handleCurrencyPress = (id) => {
        console.log('----', id);
    }
}

const styles = StyleSheet.create({

});

export default CurrencyListScreen;
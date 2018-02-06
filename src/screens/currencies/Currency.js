import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native';
import Currency from '../../components/currency/Currency';

class CurrencyScreen extends Component {
    
    render() {
        return (
            <View>
                <Currency/>
            </View>
        )
    }
}

const styles = StyleSheet.create({

});

export default CurrencyScreen;
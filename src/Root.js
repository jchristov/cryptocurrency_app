import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Hello from './components/Hello';
import CurrencyList from './components/currency/CurrencyList';
import Currency from './components/currency/Currency';

class Root extends Component{
    render(){
        return(
            <View>
                <Currency/>
            </View>
        );
    }
}


const style = StyleSheet.create({
    image: {
        width: '100%',
        height: 40,
        marginTop: 10
    }
});

export default Root;
import React, { Component } from 'react'
import {observer, inject} from 'mobx-react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import CurrencyList from '../../currency/CurrencyList'

@inject('currency')
@observer 
class CurrencyListScreen extends Component {
    
    static navigationOptions = {
        title: 'Currency List '
    };

    componentDidMount(){
        this.props.currency.loadAll();
    }

    render() {
        const {currency} = this.props;
        if(currency.loading){
            return this.getLoader();
        }
        return <CurrencyList onCurrencyPress={this.handleCurrencyPress} events = {currency.list}/>
    }

    getLoader = () => {
        return <View><ActivityIndicator size='large'/></View>
    }

    handleCurrencyPress = (uid) => {
        this.props.navigation.navigate('currency', {uid});
    }
}

const styles = StyleSheet.create({
});

export default CurrencyListScreen;
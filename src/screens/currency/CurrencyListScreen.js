import React, { Component } from 'react'
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import CurrencyList from '../../components/currency/CurrencyList'
import currencyStore from '../../stores/currency';
import {observer} from 'mobx-react';

@observer
class CurrencyListScreen extends Component {
    
    static navigationOptions = {
        title: 'Currency List '
    }

    componentDidMount(){
        currencyStore.loadAll();
    }

    render() {
        if(currencyStore.loading){
            return this.getLoader();
        }
        return <CurrencyList onCurrencyPress={this.handleCurrencyPress} events = {currencyStore.list}/>
    }

    getLoader = () => {
        return <View><ActivityIndicator size='large'/></View>
    }

    handleCurrencyPress = (uid) => {
        console.log('----', uid);
        this.props.navigation.navigate('currency', {uid});
    }
}

const styles = StyleSheet.create({
});

export default CurrencyListScreen;
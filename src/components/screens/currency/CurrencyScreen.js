import React, { Component } from 'react'
import {View, StyleSheet, Text} from 'react-native';
import Currency from '../../currency/Currency';
import {observer, inject} from 'mobx-react';

@inject('currency')
@observer
class CurrencyScreen extends Component {
    static propTypes = {
    };

    static navigationOptions = ({ navigation }) => ({
        title: `Currency ${navigation.state.params.uid}`
    });

    render() {
        const {currency, navigation} = this.props;
        const coin = currency.entities[navigation.state.params.uid];
        return(
            <View>
                <Text>{coin.title}</Text>
                <Currency coin = {coin} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
});

export default CurrencyScreen;
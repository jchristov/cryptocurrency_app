import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {SectionList, TouchableOpacity} from 'react-native';
import CoinCard from './CoinCard';
import groupBy from 'lodash/groupBy'

export default class CoinList extends Component {
    static propTypes = {
    };

    render() {
        const {coins, onCoinPress} = this.props;

        const grouped = groupBy(coins, coin => coin.id.charAt(0));
        const sections = Object.entries(grouped).map(([letter, list]) => ({
            title: `${letter}, ${list.length} events`,
            data: list.map(coin => ({key: coin.id, coin}))
        }));
        
        return (
            <SectionList
                sections={sections}
                renderItem = {({item}) => <TouchableOpacity onPress={onCoinPress.bind(null, item.key)}>
                    <CoinCard coin={item.coin}/>
                </TouchableOpacity>}
            />
        );
    }
}

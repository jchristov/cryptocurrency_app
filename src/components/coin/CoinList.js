import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {SectionList, TouchableOpacity, VirtualizedList, View} from 'react-native';
import CoinCard from './CoinCard';

export default class CoinList extends Component {
    static propTypes = {
    };

    render() {
        const { coins, onCoinPress } = this.props;
        const data = coins.map(coin=>({key: coin.id, coin}))
      
        return <VirtualizedList
                    data={data}
                    getItemCount={this.coins.length}
                    getItem={this._getItem}
                    keyExtractor={(item, index)=>{
                        return item.key;
                    }}
                    renderItem = {({item}) => <TouchableOpacity onPress={console.log(123)}>
                        <CoinCard coin={item}/>
                    </TouchableOpacity>}
                />
    }

    _getItem = (data, index) => {
        return this.props.coins[index];     
    }
    
}

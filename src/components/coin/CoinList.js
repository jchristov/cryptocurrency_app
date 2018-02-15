import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {SectionList, TouchableOpacity, VirtualizedList, View, ActivityIndicator} from 'react-native';
import {SearchBar} from 'react-native-elements';
import CoinCard from './CoinCard';

export default class CoinList extends Component {
    static propTypes = {
    };

    render() {
        const { coins, onCoinPress } = this.props;
        const data = coins.map(coin => ({key: coin.id, coin}))
      
        return <VirtualizedList
                    data={data}
                    getItemCount={this._getItemCount}
                    getItem={this._getItem}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    renderItem = {({item}) => <TouchableOpacity >
                        <CoinCard coin={item}/>
                    </TouchableOpacity>}
                />
    }

    _getItemCount = () => {
        return this.props.coins.length;
    }

    _getItem = (data, index) => {
        return this.props.coins[index];    
    }

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round />
    }
    
    renderFooter = () => {
        return (
            <View style={{
                paddingVertical: 20,
                borderTopWidth: 1,
                borderColor: "#CED0CE"
              }}
            >
              <ActivityIndicator animating size="large" />
            </View>
        )
    }
}

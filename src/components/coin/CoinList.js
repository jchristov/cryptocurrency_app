import React, { Component } from 'react';
import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';
import {SectionList, TouchableOpacity, VirtualizedList, View, ActivityIndicator} from 'react-native';
import {SearchBar} from 'react-native-elements';
import CoinCard from './CoinCard';

@inject('coins')
@observer
export default class CoinList extends Component {
    static propTypes = {
    };

    componentDidMount(){
        const {coins} = this.props;
        if(!coins.loaded) coins.loadApi();
    }

    render() {
        const { coins, onCoinPress } = this.props;
        if(!coins.loaded) return <ActivityIndicator size='large'/>
        
        
        return <VirtualizedList
                    data={coins.arr}
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

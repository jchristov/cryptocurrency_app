import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';
import {SectionList, TouchableOpacity, VirtualizedList, FlatList, View, ActivityIndicator} from 'react-native';
import {SearchBar} from 'react-native-elements';
import CoinCard from './CoinCard';

@inject('coins')
@observer
export default class CoinList extends Component {
    static propTypes = {
        coins: PropTypes.object
    };

    componentWillMount() {
        const {coins} = this.props
        if (!coins.loaded && !coins.loading) coins.loadApi();
    }

    _getItemCount = () => {
        return this.props.coins.entities.length;
    }

    _getItem = (data, index) => {
        return this.props.coins.entities[index];    
    }

    renderHeader = () => {
        return <SearchBar placeholder="Enter Currency Name..." lightTheme round />
    }
    
    handleLoadMore = () => {
        console.log('load more')
        this.props.coins.lazyLoadApi();
    }

    handleRefresh = () => {
        this.props.coins.refreshEntities();
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
        );
    }

    renderSeparator = () => {
        return(
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    }

    render() {
        const {coins, onCoinPress} = this.props;
        if(coins.loading) return <ActivityIndicator size='large'/>

        const data = coins.entities.map(item => ({key: item.id, coin: item}));

        return <FlatList 
                    data={data}
                    renderItem = {({item}) => <TouchableOpacity onPress={onCoinPress.bind(null, item.coin.id)}>
                        <CoinCard coin={item.coin}/>
                    </TouchableOpacity>}
                    keyExtractor={item => item.key}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
    
                    refreshing={coins.refreshing}
                    onRefresh={this.handleRefresh}

                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0}                 
                />
    }
}

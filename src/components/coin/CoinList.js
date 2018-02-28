import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';
import {
    SectionList,
    ActivityIndicator, 
    TouchableOpacity, 
    VirtualizedList, 
    FlatList, 
    View, 
    StyleSheet
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import CoinCard from './CoinCard';
import Loader from '../common/Loader';
import Colors from '../common/Colors';

@inject('coins')
@inject('search')
@observer
class CoinList extends Component {
    static propTypes = {
        coins: PropTypes.object
    };

    componentWillMount() {
        const {coins} = this.props
        if (!coins.loaded && !coins.loading) coins.loadApi();
    }

    getItemCount = () => {
        return this.props.coins.entities.length;
    }

    getItem = (data, index) => {
        return this.props.coins.entities[index];    
    }

    renderHeader = () => {
        return <SearchBar   containerStyle={styles.search} 
                            placeholder="Enter Currency Name..." 
                            lightTheme round 
                />
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

    _renderItem = ({index, item}) => {
        const {onCoinPress} = this.props;
        return(
            <TouchableOpacity onPress={onCoinPress.bind(null, item.coin.id)}>
                <CoinCard coin={item.coin}/>
            </TouchableOpacity>
        );
    }

    render() {
        const {coins, search} = this.props;

        if(coins.loading) return <Loader/>

        const data = search.value ? coins.entities.filter(item => {
                    return item.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1 || item.symbol.toLowerCase().indexOf(search.value.toLowerCase()) > -1;
                }).map(item => ({key: item.id, coin: item})) : coins.entities.map(item => ({key: item.id, coin: item}));

        return <FlatList 
                    data={data}
                    style={styles.container}
                    renderItem = {this._renderItem}
                    keyExtractor={item => item.key}
                    ListFooterComponent={this.renderFooter}
                    
                    refreshing={coins.refreshing}
                    onRefresh={this.handleRefresh}

                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0}                 
                />
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.lightBackground
    },
    search: {
        backgroundColor: Colors.lightBackground
    }
});

export default CoinList;
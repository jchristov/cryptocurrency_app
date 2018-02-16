import React, { Component } from 'react';
import {observer, inject} from 'mobx-react';
import PropTypes from 'prop-types';
import {SectionList, TouchableOpacity, VirtualizedList, View, ActivityIndicator} from 'react-native';
import {SearchBar} from 'react-native-elements';
import CoinCard from './CoinCard';

@inject('coins')
@observer
export default class CoinList extends Component {
    static propTypes = {
    };

    componentDidMount() {
        const {coins} = this.props
        if (!coins.loaded) coins.loadApi()
    }

    render() {
        const { coins, onCoinPress } = this.props;
        if(!coins.loaded) return <ActivityIndicator size='large'/>
        const data = coins.entities.map(item => ({key: item.id, item}));
        
        return <VirtualizedList 
                    data={data}
                    getItemCount={this._getItemCount}
                    getItem={this._getItem}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={this.renderHeader}
                    renderItem = {({item}) => <TouchableOpacity >
                        <CoinCard coin={item}/>
                    </TouchableOpacity>}
                />
    }

    _getItemCount = () => {
        return this.props.coins.entities.length;
    }

    _getItem = (data, index) => {
        console.log(this.props.coins.entities[index]);
        return this.props.coins.entities[index];    
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

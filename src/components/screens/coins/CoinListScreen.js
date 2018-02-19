import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CoinList from '../../coin/CoinList';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {observer, inject} from 'mobx-react';
import Loader from '../../common/Loader';

@inject('coins')
@observer
export default class CoinListScreen extends Component {
    static propTypes = {
    };

    static navigationOptions = {
        title: 'Cryptocurrency List'
    };
    
    componentDidMount(){
        const {coins} = this.props;
        if(!coins.loaded && !coins.loading) coins.loadApi();
    }

    render() {
        const {coins} = this.props;
        if(coins.loading) return <Loader/>
        return <CoinList onCoinPress = {this.handleCoinPress}/>
    }

    handleCoinPress = (uid) => {
        this.props.navigation.navigate('detail', {uid});
    }
}

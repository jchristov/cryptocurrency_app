import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CoinList from '../../coin/CoinList';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {observer, inject} from 'mobx-react';
import Loader from '../../common/Loader';
import Header from '../../common/Header';
import SearchIcon from '../../search/SearchIcon';
import SearchInput from '../../search/SearchInput';

@inject('coins')
@observer
class CoinListScreen extends Component {
    static propTypes = {
        coins: PropTypes.object
    };

    static navigationOptions = ({navigation, screenProps}) => {
        return { 
            headerTitle: <Header style={styles.title} value='Cryptocurrency List'/>,
            headerRight: <SearchIcon />,    
            title: 'Cryptocurrency List' 
        }
    };
    
    componentDidMount(){
        const {coins} = this.props;
        if(!coins.loaded && !coins.loading) coins.loadApi();
    }

    render() {
        const {coins} = this.props;
        
        if(coins.loading) return <Loader/>
        
        return  <View>
                    <SearchInput/>
                    <CoinList onCoinPress = {this.handleCoinPress}/>
                </View>
    }

    handleCoinPress = (uid) => {
        this.props.navigation.navigate('detail', {uid});
    }
}

const styles = StyleSheet.create({
    title:{
        fontWeight: "300"
    }
});

export default CoinListScreen;
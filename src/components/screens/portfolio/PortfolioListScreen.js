import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PortfolioList from '../../portfolio/PortfolioList';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {observer, inject} from 'mobx-react';
import {Ionicons} 	from '@expo/vector-icons';
import Loader from '../../common/Loader';
import Header from '../../common/Header';
import SearchIcon from '../../search/SearchIcon';
import SearchInput from '../../search/SearchInput';

@inject('coins')
@observer
class PortfolioListScreen extends Component {
    static propTypes = {
        coins: PropTypes.object
    };

    static navigationOptions = ({navigation, screenProps}) => {
        return { 
            headerTitle: <Header styleText={styles.title} value='Портфель'/>,
            headerRight: <SearchIcon />,    
            tabBarIcon: ({ focused }) => {
                return <Ionicons
                    name="ios-briefcase-outline"
                    size={32}
                    color={ focused ? '#444' : '#176ced'}
                />
			},
            title: 'Портфель' 
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
                    <PortfolioList onCoinPress = {this.handleCoinPress}/>
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

export default PortfolioListScreen;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CoinList from '../../coin/CoinList';
import {View, StyleSheet, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import {observer, inject} from 'mobx-react';
import Loader from '../../common/Loader';
import Header from '../../common/Header';
import SearchIcon from '../../search/SearchIcon';
import SearchInput from '../../search/SearchInput';
import {Ionicons} 	from '@expo/vector-icons';
import Colors from '../../common/Colors';

@inject('coins')
@observer
class CoinListScreen extends Component {
    static propTypes = {
        coins: PropTypes.object
    };

    static navigationOptions = ({navigation, screenProps}) => {
        return { 
            headerTitle: <Header styleText={styles.title} value='Криптовалюты'/>,
            headerRight: <SearchIcon />, 
            tabBarIcon: ({ focused }) => {
                return <Ionicons
                            name="ios-stats-outline"
                            size={32}
                            color={ focused ? '#444' : '#176ced'}
                        />
            },   
            title: 'Монеты',
            headerStyle: { 
                backgroundColor: Colors.palatinateBlue 
            }
        }
    };
    
    componentDidMount(){
        const {coins} = this.props;
        if(!coins.loaded && !coins.loading) coins.loadApi();
    }
    
    renderHeader = () => {
        return (
            <View style={styles.header}>
                <TouchableOpacity style={[styles.cell, styles.head]}>
                    <Text numberOfLines={1} style={[styles.text, styles.textCenter]}>Rank</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.cell}>
                    <Text numberOfLines={1} style={[styles.text, styles.textRight]}>24H</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cell}>
                    <Text numberOfLines={1} style={[styles.text, styles.textRight]}>7D</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cell}>
                    <Text numberOfLines={1} style={[styles.text, styles.textRight]}>Price</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        const {coins} = this.props;
        if(coins.loading) return <Loader/>
        return (
            <View style={styles.container}>
                <SearchInput/>
                {this.renderHeader()}
                <CoinList onCoinPress = {this.handleCoinPress}/>
            </View>
        );
    }

    handleCoinPress = (cryptocurrency) => {
        this.props.navigation.navigate('detail', {cryptocurrency});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header:{
        backgroundColor: Colors.lightBackground,
        borderBottomColor: Colors.border,
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingHorizontal: 10  
    },
    head: {
        alignItems: 'center',
        flex: 2,
        flexDirection : 'row'   
    },
    cell: {
        flex: 1,
        paddingHorizontal: 2,
        paddingVertical: 10     
    },
    title:{
        fontWeight: '300'
    },
    text:{
        fontSize: 16,
        flex: 1,
        color: Colors.actionText
    },
    textRight: {
        textAlign: 'right'
    },
    textCenter: {
        textAlign: 'center'
    }
});

export default CoinListScreen;
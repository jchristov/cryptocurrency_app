import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {SectionList, TouchableOpacity} from 'react-native';
import CoinCard from './CoinCard';

export default class CoinList extends Component {
    static propTypes = {
    };

    render() {
        const {coins, onEventPress} = this.props;

       
        const sections = coins.map(([letter, list]) => {
            return {
                title: `${letter}, ${list.length} events`,
                data: list    
            }
        })
        
        console.log('---', sections)
   
        return (
            <SectionList
                sections={sections}
                renderItem = {({item}) => <TouchableOpacity onPress = {onEventPress.bind(null, item.key)}>
                    <CoinCard coin={item}/>
                </TouchableOpacity>}
            />
        );
    }
}

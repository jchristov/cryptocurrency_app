import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {View,  SectionList, TouchableOpacity} from 'react-native';
import CurrencyCard from './CurrencyCard';
import groupBy from 'lodash/groupBy'

class CurrencyList extends Component {
    static propTypes = {

    };

    render() {
        const {events, onCurrencyPress} = this.props;

        const grouped = groupBy(this.props.events, event => event.title.charAt(0))
        const sections = Object.entries(grouped).map(([letter, list]) => ({
            title: `${letter}, ${list.length} events`,
            data: list.map(event => ({key: event.uid, event}))
        }))
        return (
            <SectionList
                sections={sections}
                renderItem = {({item}) => <TouchableOpacity onPress = {onCurrencyPress.bind(null, item.key)}>
                    <CurrencyCard  event={item.event}/>
                </TouchableOpacity>}
            />
        )
    }
}

export default CurrencyList;

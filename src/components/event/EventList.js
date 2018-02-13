import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {View,  SectionList, TouchableOpacity} from 'react-native';
import EventCard from './EventCard';
import groupBy from 'lodash/groupBy'

export default class EventList extends Component {
    static propTypes = {

    };

    render() {
        const {events, onEventPress} = this.props;

        const grouped = groupBy(this.props.events, event => event.title.charAt(0));
        const sections = Object.entries(grouped).map(([letter, list]) => ({
            title: `${letter}, ${list.length} events`,
            data: list.map(event => ({key: event.uid, event}))
        }));

        return (
            <SectionList
                sections={sections}
                renderItem = {({item}) => <TouchableOpacity onPress = {onEventPress.bind(null, item.key)}>
                    <EventCard  event={item.event}/>
                </TouchableOpacity>}
            />
        );
    }
}
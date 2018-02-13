import React, { Component } from 'react'
import {View, StyleSheet, Text} from 'react-native';
import Event from '../../event/Event';
import {observer, inject} from 'mobx-react';

@inject('events')
@observer
export default class EventScreen extends Component {
    static propTypes = {
    };

    static navigationOptions = ({ navigation }) => ({
        title: `Event ${navigation.state.params.uid}`
    });

    render() {
        const {events, navigation} = this.props;
        const event = events.entities[navigation.state.params.uid];
        return(
            <View>
                <Text>{event.title}</Text>
                <Event event = {event} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
});
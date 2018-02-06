import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, Text, Image} from 'react-native';
import Card from '../common/Card';

class EventCard extends Component {
    static propTypes = {

    }

    render() {
        const {event} = this.props;
        return (
            <Card>
                <Image source={{uri: 'http://lorempixel.com/200/100/technics'}} style={styles.image}/>
                <View>
                    <Text>{event.title}</Text>
                    <Text>{event.url}</Text>
                </View>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 100
    }
});

export default EventCard;
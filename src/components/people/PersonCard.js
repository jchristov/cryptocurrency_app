import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {View, Image, StyleSheet, Text} from 'react-native';
import Card from '../common/Card';

export default class PersonCard extends Component {
    static propTypes = {
        person: PropTypes.object.isRequired
    };
    
    render() {
        const {person:{email, firstName, lastName, avatar}} = this.props;
        
        return (
            <Card style={styles.container}>
                <Image source={{uri: avatar || 'http://lorempixel.com/200/100/people/'}} style = {styles.avatar}/>
                <View>
                    <Text style={styles.email}>{email}</Text>
                    <Text>{firstName} {lastName}</Text>
                </View>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    avatar: {
        width: 200,
        height: 100,
        margin: 5
    },
    content: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    email: {
        fontWeight: 'bold'
    }
});

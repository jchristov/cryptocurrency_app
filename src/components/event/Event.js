import React, { Component } from 'react'
import {View, StyleSheet, Image, Text, Button} from 'react-native';
import ConfirmModal from '../common/ConfirmModal';
import {observer, inject} from 'mobx-react';

@inject('navigation')
@observer
export default class Event extends Component {

    static propTypes = {

    };

    state = {
        confirmModal: false
    }

    render() {
        const {event} = this.props;
        return (
            <View style={styles.container}>
                <Text style={[styles.text, styles.header]}>{event.title}</Text>
                <View>
                    <Image source={{uri: 'http://lorempixel.com/200/100/technics'}} style={styles.image}/>
                    <Text>{event.when}</Text>
                    <Text>{event.where}</Text>
                </View>
                <Text style={styles.text}>{event.url}</Text>
                <View>
                    <Button
                        onPress={this.handleDelete}
                        title="Delete event"
                        color="#F55"
                        />
                    <Button 
                        onPress={this.goTo}
                        title="Show Map"
                        color="#F55"
                    />
                </View>
                <ConfirmModal visible = {this.state.confirmModal}
                              onConfirm = {this.confirmDelete}
                              onCancel = {this.cancelDelete}
                >
                    Are you sure you want to delete "{event.title}"
                </ConfirmModal>
            </View>
        )
    }
    
    handleDelete = () => {
        /*this.props.event.title = 'Bitevent';*/
        this.setState({
            confirmModal: true
        })
    }

    goTo = () => {
        this.props.navigation.goTo('map', {uid: this.props.event.uid});
    }


    confirmDelete = () => this.setState({ confirmModal: false })
    cancelDelete = () => this.setState({ confirmModal: false })
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#F2F2F2',
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowOffset: {
            height: 2,
            width: 0
        },
        elevation: 5
    },
    text: {
        width: '100%',
        height: 100,
        marginBottom: 20,
        textAlign: 'center'
    },
    image: {
        width: 200,
        height: 100
    },
    button: {
        width: '100%',
        height: 100,
        marginBottom: 30
    }
});
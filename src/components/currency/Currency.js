import React, { Component } from 'react'
import {View, StyleSheet, Image, Text, Button} from 'react-native';
import ConfirmModal from '../common/ConfirmModal';
import {observer, inject} from 'mobx-react';

@inject('navigation')
@observer
class Currency extends Component {

    static propTypes = {

    };

    state = {
        confirmModal: false
    }

    render() {
        const {coin} = this.props;
        return (
            <View style={styles.container}>
                <Text style={[styles.text, styles.header]}>{coin.title}</Text>
                <View>
                    <Image source={{uri: 'http://lorempixel.com/200/100/technics'}} style={styles.image}/>
                    <Text>{coin.when}</Text>
                    <Text>{coin.where}</Text>
                </View>
                <Text style={styles.text}>{coin.url}</Text>
                <View>
                    <Button
                        onPress={this.handleDelete}
                        title="Delete Coin"
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
                    Are you sure you want to delete "{coin.title}"
                </ConfirmModal>
            </View>
        )
    }
    
    handleDelete = () => {
        /*this.props.coin.title = 'Bitcoin';*/
        this.setState({
            confirmModal: true
        })
    }

    goTo = () => {
        this.props.navigation.goTo('map', {uid: this.props.coin.uid});
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


export default Currency;
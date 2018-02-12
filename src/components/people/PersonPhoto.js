import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, TouchableOpacity, Text, Image, Modal, ActivityIndicator} from 'react-native';
import {Camera} from 'expo';
import {observable, action} from 'mobx';
import {observer, inject} from 'mobx-react';
import firebase from 'firebase';
import {decode} from 'base64-arraybuffer';
import Photo from '../common/Photo';

@inject('people')
@inject('navigation')
@observer
export default class PersonPhoto extends Component {
    static propTypes = {
        uid: PropTypes.string,
    };

    @observable uri = null;
    @action setUri = uri => this.uri = uri;

    getPreview = () => {
        return (
            <View style={styles.container}>
                <Image style={styles.preview} source = {{uri: this.uri}} /> 
                <Modal transparent key='loader'>
                    <View style={styles.modal}>
                        <ActivityIndicator size='large'/>
                    </View>
                </Modal>
            </View>
        );
    }
    
    getPhoto = async({uri, width, height, exif, base64}) => {
        const {uid, people, navigation} = this.props;
        
        this.setUri(uri);

        console.log('---', this.uri, base64);
        
        const buf = decode(base64);
        const ref = firebase.storage().ref(`/avatars/${uid}.jpg`)

        await ref.put(buf);
        const avatar = await ref.getDownloadURL();

        people.updatePerson(uid, {avatar});
        navigation.goBack();
    }
    
    render() {
        if(this.uri) return this.getPreview();
        return <Photo base64 getPhoto={this.getPhoto} />
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    preview: {
        width: '100%',
        height: '100%'
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)'
    }
});
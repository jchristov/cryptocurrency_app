import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Camera, Permissions} from 'expo';
import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

@observer
export default class Photo extends Component {
    static propTypes = {

    };

    @observable permitted = false;
    @observable errorMessage = null;
    @observable type = Camera.Constants.Type.back;

    async componentWillMount(){
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setPermission(status);
    }

    @action setPermission = (status) => {
        if(status === 'granted') this.permitted = true;
        else this.errorMessage = 'permission denied';
    }

    @action setType = (type) => {
        this.type = type;
    }

    render() {
        if(this.errorMessage) return <Text>{this.errorMessage}</Text>
        if(!this.permitted) return <Text>No access to camera</Text>
        return (
            <View style={styles.container}>
                <Camera style={styles.camera}  type={this.type} ref={this.getCameraRef}>
                    <View style={styles.controls}>
                        <TouchableOpacity style={styles.flip} onPress={this.flip}>
                            <Text style={styles.text}>Flip</Text>    
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.shot} onPress={this.takePhoto}/>
                    </View>
                </Camera>
            </View>
        );
    }

    getCameraRef = (ref) => {
        this.camera = ref;
        setTimeout(() => this.setType(Camera.Constants.Type.front), 0)
    }   

    flip = () => {
        this.setType(this.type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        )
    }

    takePhoto = async() => {
        const {base64, getPhoto} = this.props;
        const photo = await this.camera.takePictureAsync({base64});
        getPhoto(photo);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center'
    },
    camera: {
        flex: 1
    },
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end'
    },
    flip: {
        alignSelf: 'flex-start',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
    },
    shot: {
        width: 50,
        height: 50,
        backgroundColor: '#F00',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#FFF',
        alignSelf: 'center'
    },
    controls: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
});
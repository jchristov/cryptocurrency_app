import React, { Component } from 'react'
import {Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'
import Colors from '../common/Colors';

const { width } = Dimensions.get('window');

export default class ConfirmModal extends Component {
    static propTypes = {

    };

    render() {
        const {visible, children, onConfirm, onCancel} = this.props
        return (
            <Modal visible={visible} animationType="slide" transparent>
                <View style={styles.container}>
                    <View style={styles.wrap}>
                        <View style={styles.content}>
                            {children}
                        </View>
                        <View style={styles.buttons}>
                            <TouchableOpacity style={[styles.button, styles.buttonBorder]} onPress={onCancel} >
                                <Text style={styles.text}>Отмена</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={onConfirm}>
                                <Text style={styles.text}>Добавить</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrap: {
        maxWidth: '80%',
        width: width,
        backgroundColor: '#FFF',
        borderRadius: 12
    },
    content: {
        padding: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopColor: Colors.border,
        borderTopWidth: 1,
    },
    button: {
        width: '50%',
        padding: 10
    },
    buttonBorder: {
        borderRightWidth: 1,
        borderRightColor: Colors.border    
    },
    text:{
        color: Colors.facebookBlue,
        textAlign: 'center'
    },
})
